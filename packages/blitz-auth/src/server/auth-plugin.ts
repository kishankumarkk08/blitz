import {RequestMiddleware, Ctx, createServerPlugin} from "blitz"
import {assert} from "blitz"
import type {IncomingMessage, ServerResponse} from "http"
import {PublicData, SessionModel, SessionConfigMethods} from "../shared/types"
import {getBlitzContext, getSession, useAuthenticatedBlitzContext} from "./auth-sessions"

interface SessionConfigOptions {
  cookiePrefix?: string
  sessionExpiryMinutes?: number
  anonSessionExpiryMinutes?: number
  method?: "essential" | "advanced"
  sameSite?: "none" | "lax" | "strict"
  secureCookies?: boolean
  domain?: string
  publicDataKeysToSyncAcrossSessions?: string[]
}

interface IsAuthorized {
  isAuthorized: (data: {ctx: Ctx; args: any}) => boolean
}

interface PrismaClientWithSession {
  session: {
    findFirst(args?: {where?: {handle?: SessionModel["handle"]}}): Promise<SessionModel | null>
    findMany(args?: {
      where?: {userId?: PublicData["userId"]; expiresAt?: {gt?: Date}}
    }): Promise<SessionModel[]>
    create(args: {
      data: SessionModel & {
        userId?: any
        user?: {connect: {id: any}}
      }
    }): Promise<SessionModel>
    update(args: {
      data: Partial<SessionModel>
      where: {handle: SessionModel["handle"]}
    }): Promise<SessionModel>
    delete(args: {where: {handle?: SessionModel["handle"]}}): Promise<SessionModel>
  }
}

export const PrismaStorage = <Client extends PrismaClientWithSession>(
  db: Client,
): SessionConfigMethods => {
  return {
    getSession: (handle) => db.session.findFirst({where: {handle}}),
    getSessions: (userId) => db.session.findMany({where: {userId, expiresAt: {gt: new Date()}}}),
    createSession: (session) => {
      let user
      if (session.userId) {
        user = {connect: {id: session.userId}}
      }
      return db.session.create({
        data: {...session, userId: undefined, user},
      })
    },
    updateSession: async (handle, session) => {
      try {
        return await db.session.update({where: {handle}, data: session})
      } catch (error: any) {
        // Session doesn't exist in DB for some reason, so create it
        if (error.code === "P2016") {
          console.warn("Could not update session because it's not in the DB")
        } else {
          throw error
        }
      }
    },
    deleteSession: (handle) => db.session.delete({where: {handle}}),
  }
}

const defaultConfig_: SessionConfigOptions = {
  sessionExpiryMinutes: 30 * 24 * 60, // Sessions expire after 30 days of being idle
  anonSessionExpiryMinutes: 5 * 365 * 24 * 60, // Sessions expire after 5 years of being idle
  method: "essential",
  sameSite: "lax",
  publicDataKeysToSyncAcrossSessions: ["role", "roles"],
  secureCookies: !process.env.DISABLE_SECURE_COOKIES && process.env.NODE_ENV === "production",
}

export interface AuthPluginOptions extends Partial<SessionConfigOptions>, IsAuthorized {
  storage: SessionConfigMethods
}

export const AuthServerPlugin = createServerPlugin((options: AuthPluginOptions) => {
  // pass types
  globalThis.__BLITZ_SESSION_COOKIE_PREFIX = options.cookiePrefix || "blitz"

  globalThis.sessionConfig = {
    ...defaultConfig_,
    ...options.storage,
    ...options,
  }

  function authPluginSessionMiddleware() {
    assert(
      options.isAuthorized,
      "You must provide an authorization implementation to sessionMiddleware as isAuthorized(userRoles, input)",
    )

    global.sessionConfig = {
      ...defaultConfig_,
      ...options.storage,
      ...options,
    }

    const cookiePrefix = global.sessionConfig.cookiePrefix ?? "blitz"
    assert(
      cookiePrefix.match(/^[a-zA-Z0-9-_]+$/),
      `The cookie prefix used has invalid characters. Only alphanumeric characters, "-"  and "_" character are supported`,
    )

    const blitzSessionMiddleware: RequestMiddleware<
      IncomingMessage,
      ServerResponse & {blitzCtx: Ctx}
    > = async (req, res, next) => {
      if (!res.blitzCtx?.session) {
        await getSession(req, res)
      }
      return next()
    }

    blitzSessionMiddleware.config = {
      name: "blitzSessionMiddleware",
      cookiePrefix,
    }
    return blitzSessionMiddleware
  }
  if (!globalThis.__BLITZ_GET_RSC_CONTEXT) {
    globalThis.__BLITZ_GET_RSC_CONTEXT = getBlitzContext
  }

  type Handler = (request: Request, params: unknown, ctx: Ctx) => Promise<Response> | Response

  function withBlitzAuth(fn: Handler): Response | Promise<Response>
  function withBlitzAuth<T extends {[method: string]: Handler}>(fn: T): T
  function withBlitzAuth<T extends {[method: string]: Handler}>(fn: Handler | T): unknown {
    return async (request: Request, params: unknown) => {
      const session = await getSession(request)
      if (typeof fn === "function") {
        const response = await fn(request, params, {session})
        ;(session as any).setSession(response)
        return response
      }
      const wrappedFn = Object.fromEntries(
        Object.entries(fn).map(([method, handler]) => [
          method,
          async (request: Request, params: unknown) => {
            const response = await handler(request, params, {session})
            ;(session as any).setSession(response)
            return response
          },
        ]),
      )
      return wrappedFn
    }
  }

  return {
    requestMiddlewares: [authPluginSessionMiddleware()],
    exports: () => ({
      getBlitzContext,
      useAuthenticatedBlitzContext,
      withBlitzAuth,
    }),
  }
})
