module.exports=function(){var e={939:function(e,t,s){"use strict";const n=s(437).y;const i=s(437).P;class CodeNode{constructor(e){this.generatedCode=e}clone(){return new CodeNode(this.generatedCode)}getGeneratedCode(){return this.generatedCode}getMappings(e){const t=n(this.generatedCode);const s=Array(t+1).join(";");if(t>0){e.unfinishedGeneratedLine=i(this.generatedCode);if(e.unfinishedGeneratedLine>0){return s+"A"}else{return s}}else{const t=e.unfinishedGeneratedLine;e.unfinishedGeneratedLine+=i(this.generatedCode);if(t===0&&e.unfinishedGeneratedLine>0){return"A"}else{return""}}}addGeneratedCode(e){this.generatedCode+=e}mapGeneratedCode(e){const t=e(this.generatedCode);return new CodeNode(t)}getNormalizedNodes(){return[this]}merge(e){if(e instanceof CodeNode){this.generatedCode+=e.generatedCode;return this}return false}}e.exports=CodeNode},300:function(e){"use strict";class MappingsContext{constructor(){this.sourcesIndices=new Map;this.sourcesContent=new Map;this.hasSourceContent=false;this.currentOriginalLine=1;this.currentSource=0;this.unfinishedGeneratedLine=false}ensureSource(e,t){let s=this.sourcesIndices.get(e);if(typeof s==="number"){return s}s=this.sourcesIndices.size;this.sourcesIndices.set(e,s);this.sourcesContent.set(e,t);if(typeof t==="string")this.hasSourceContent=true;return s}getArrays(){const e=[];const t=[];for(const s of this.sourcesContent){e.push(s[0]);t.push(s[1])}return{sources:e,sourcesContent:t}}}e.exports=MappingsContext},57:function(e,t,s){"use strict";const n=s(207);const i=s(437).y;const r=s(437).P;const u=";AAAA";class SingleLineNode{constructor(e,t,s,n){this.generatedCode=e;this.originalSource=s;this.source=t;this.line=n||1;this._numberOfLines=i(this.generatedCode);this._endsWithNewLine=e[e.length-1]==="\n"}clone(){return new SingleLineNode(this.generatedCode,this.source,this.originalSource,this.line)}getGeneratedCode(){return this.generatedCode}getMappings(e){if(!this.generatedCode)return"";const t=this._numberOfLines;const s=e.ensureSource(this.source,this.originalSource);let i="A";if(e.unfinishedGeneratedLine)i=","+n.encode(e.unfinishedGeneratedLine);i+=n.encode(s-e.currentSource);i+=n.encode(this.line-e.currentOriginalLine);i+="A";e.currentSource=s;e.currentOriginalLine=this.line;const o=e.unfinishedGeneratedLine=r(this.generatedCode);i+=Array(t).join(u);if(o===0){i+=";"}else{if(t!==0)i+=u}return i}getNormalizedNodes(){return[this]}mapGeneratedCode(e){const t=e(this.generatedCode);return new SingleLineNode(t,this.source,this.originalSource,this.line)}merge(e){if(e instanceof SingleLineNode){return this.mergeSingleLineNode(e)}return false}mergeSingleLineNode(e){if(this.source===e.source&&this.originalSource===e.originalSource){if(this.line===e.line){this.generatedCode+=e.generatedCode;this._numberOfLines+=e._numberOfLines;this._endsWithNewLine=e._endsWithNewLine;return this}else if(this.line+1===e.line&&this._endsWithNewLine&&this._numberOfLines===1&&e._numberOfLines<=1){return new o(this.generatedCode+e.generatedCode,this.source,this.originalSource,this.line)}}return false}}e.exports=SingleLineNode;const o=s(478)},805:function(e,t,s){"use strict";const n=s(939);const i=s(478);const r=s(300);const u=s(437).y;class SourceListMap{constructor(e,t,s){if(Array.isArray(e)){this.children=e}else{this.children=[];if(e||t)this.add(e,t,s)}}add(e,t,s){if(typeof e==="string"){if(t){this.children.push(new i(e,t,s))}else if(this.children.length>0&&this.children[this.children.length-1]instanceof n){this.children[this.children.length-1].addGeneratedCode(e)}else{this.children.push(new n(e))}}else if(e.getMappings&&e.getGeneratedCode){this.children.push(e)}else if(e.children){e.children.forEach(function(e){this.children.push(e)},this)}else{throw new Error("Invalid arguments to SourceListMap.protfotype.add: Expected string, Node or SourceListMap")}}preprend(e,t,s){if(typeof e==="string"){if(t){this.children.unshift(new i(e,t,s))}else if(this.children.length>0&&this.children[this.children.length-1].preprendGeneratedCode){this.children[this.children.length-1].preprendGeneratedCode(e)}else{this.children.unshift(new n(e))}}else if(e.getMappings&&e.getGeneratedCode){this.children.unshift(e)}else if(e.children){e.children.slice().reverse().forEach(function(e){this.children.unshift(e)},this)}else{throw new Error("Invalid arguments to SourceListMap.protfotype.prerend: Expected string, Node or SourceListMap")}}mapGeneratedCode(e){const t=[];this.children.forEach(function(e){e.getNormalizedNodes().forEach(function(e){t.push(e)})});const s=[];t.forEach(function(t){t=t.mapGeneratedCode(e);if(s.length===0){s.push(t)}else{const e=s[s.length-1];const n=e.merge(t);if(n){s[s.length-1]=n}else{s.push(t)}}});return new SourceListMap(s)}toString(){return this.children.map(function(e){return e.getGeneratedCode()}).join("")}toStringWithSourceMap(e){const t=new r;const s=this.children.map(function(e){return e.getGeneratedCode()}).join("");const n=this.children.map(function(e){return e.getMappings(t)}).join("");const i=t.getArrays();return{source:s,map:{version:3,file:e&&e.file,sources:i.sources,sourcesContent:t.hasSourceContent?i.sourcesContent:undefined,mappings:n}}}}e.exports=SourceListMap},478:function(e,t,s){"use strict";const n=s(207);const i=s(437).y;const r=s(437).P;const u=";AACA";class SourceNode{constructor(e,t,s,n){this.generatedCode=e;this.originalSource=s;this.source=t;this.startingLine=n||1;this._numberOfLines=i(this.generatedCode);this._endsWithNewLine=e[e.length-1]==="\n"}clone(){return new SourceNode(this.generatedCode,this.source,this.originalSource,this.startingLine)}getGeneratedCode(){return this.generatedCode}addGeneratedCode(e){this.generatedCode+=e;this._numberOfLines+=i(e);this._endsWithNewLine=e[e.length-1]==="\n"}getMappings(e){if(!this.generatedCode)return"";const t=this._numberOfLines;const s=e.ensureSource(this.source,this.originalSource);let i="A";if(e.unfinishedGeneratedLine)i=","+n.encode(e.unfinishedGeneratedLine);i+=n.encode(s-e.currentSource);i+=n.encode(this.startingLine-e.currentOriginalLine);i+="A";e.currentSource=s;e.currentOriginalLine=this.startingLine+t-1;const o=e.unfinishedGeneratedLine=r(this.generatedCode);i+=Array(t).join(u);if(o===0){i+=";"}else{if(t!==0){i+=u}e.currentOriginalLine++}return i}mapGeneratedCode(e){throw new Error("Cannot map generated code on a SourceMap. Normalize to SingleLineNode first.")}getNormalizedNodes(){var e=[];var t=this.startingLine;var s=this.generatedCode;var n=0;var i=s.length;while(n<i){var r=s.indexOf("\n",n)+1;if(r===0)r=i;var u=s.substr(n,r-n);e.push(new o(u,this.source,this.originalSource,t));n=r;t++}return e}merge(e){if(e instanceof SourceNode){return this.mergeSourceNode(e)}else if(e instanceof o){return this.mergeSingleLineNode(e)}return false}mergeSourceNode(e){if(this.source===e.source&&this._endsWithNewLine&&this.startingLine+this._numberOfLines===e.startingLine){this.generatedCode+=e.generatedCode;this._numberOfLines+=e._numberOfLines;this._endsWithNewLine=e._endsWithNewLine;return this}return false}mergeSingleLineNode(e){if(this.source===e.source&&this._endsWithNewLine&&this.startingLine+this._numberOfLines===e.line&&e._numberOfLines<=1){this.addSingleLineNode(e);return this}return false}addSingleLineNode(e){this.generatedCode+=e.generatedCode;this._numberOfLines+=e._numberOfLines;this._endsWithNewLine=e._endsWithNewLine}}e.exports=SourceNode;const o=s(57)},207:function(e,t){var s={};var n={};"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("").forEach(function(e,t){s[e]=t;n[t]=e});var i={};i.encode=function base64_encode(e){if(e in n){return n[e]}throw new TypeError("Must be between 0 and 63: "+e)};i.decode=function base64_decode(e){if(e in s){return s[e]}throw new TypeError("Not a valid base 64 digit: "+e)};var r=5;var u=1<<r;var o=u-1;var f=u;function toVLQSigned(e){return e<0?(-e<<1)+1:(e<<1)+0}function fromVLQSigned(e){var t=(e&1)===1;var s=e>>1;return t?-s:s}t.encode=function base64VLQ_encode(e){var t="";var s;var n=toVLQSigned(e);do{s=n&o;n>>>=r;if(n>0){s|=f}t+=i.encode(s)}while(n>0);return t};t.decode=function base64VLQ_decode(e,t){var s=0;var n=e.length;var u=0;var c=0;var h,a;do{if(s>=n){throw new Error("Expected more digits in base 64 VLQ value.")}a=i.decode(e.charAt(s++));h=!!(a&f);a&=o;u=u+(a<<c);c+=r}while(h);t.value=fromVLQSigned(u);t.rest=e.slice(s)}},234:function(e,t,s){"use strict";const n=s(207);const i=s(478);const r=s(939);const u=s(805);e.exports=function fromStringWithSourceMap(e,t){const s=t.sources;const o=t.sourcesContent;const f=t.mappings.split(";");const c=e.split("\n");const h=[];let a=null;let l=1;let d=0;let p;function addCode(e){if(a&&a instanceof r){a.addGeneratedCode(e)}else if(a&&a instanceof i&&!e.trim()){a.addGeneratedCode(e);p++}else{a=new r(e);h.push(a)}}function addSource(e,t,s,n){if(a&&a instanceof i&&a.source===t&&p===n){a.addGeneratedCode(e);p++}else{a=new i(e,t,s,n);p=n+1;h.push(a)}}f.forEach(function(e,t){let s=c[t];if(typeof s==="undefined")return;if(t!==c.length-1)s+="\n";if(!e)return addCode(s);e={value:0,rest:e};let n=false;while(e.rest)n=processMapping(e,s,n)||n;if(!n)addCode(s)});if(f.length<c.length){let e=f.length;while(!c[e].trim()&&e<c.length-1){addCode(c[e]+"\n");e++}addCode(c.slice(e).join("\n"))}return new u(h);function processMapping(e,t,i){if(e.rest&&e.rest[0]!==","){n.decode(e.rest,e)}if(!e.rest)return false;if(e.rest[0]===","){e.rest=e.rest.substr(1);return false}n.decode(e.rest,e);const r=e.value+d;d=r;let u;if(e.rest&&e.rest[0]!==","){n.decode(e.rest,e);u=e.value+l;l=u}else{u=l}if(e.rest){const t=e.rest.indexOf(",");e.rest=t===-1?"":e.rest.substr(t)}if(!i){addSource(t,s?s[r]:null,o?o[r]:null,u);return true}}}},437:function(e,t){"use strict";t.y=function getNumberOfLines(e){let t=-1;let s=-1;do{t++;s=e.indexOf("\n",s+1)}while(s>=0);return t};t.P=function getUnfinishedLine(e){const t=e.lastIndexOf("\n");if(t===-1)return e.length;else return e.length-t-1}},233:function(e,t,s){t.SourceListMap=s(805);t.SourceNode=s(478);t.SingleLineNode=s(57);t.CodeNode=s(939);t.MappingsContext=s(300);t.fromStringWithSourceMap=s(234)},72:function(e,t,s){"use strict";const n=s(710);const i=e=>{if(typeof e!=="object"||!e)return e;const t=Object.assign({},e);if(e.mappings){t.mappings=Buffer.from(e.mappings,"utf-8")}if(e.sourcesContent){t.sourcesContent=e.sourcesContent.map(e=>e&&Buffer.from(e,"utf-8"))}return t};const r=e=>{if(typeof e!=="object"||!e)return e;const t=Object.assign({},e);if(e.mappings){t.mappings=e.mappings.toString("utf-8")}if(e.sourcesContent){t.sourcesContent=e.sourcesContent.map(e=>e&&e.toString("utf-8"))}return t};class CachedSource extends n{constructor(e,t){super();this._source=e;this._cachedSourceType=t?t.source:undefined;this._cachedSource=undefined;this._cachedBuffer=t?t.buffer:undefined;this._cachedSize=t?t.size:undefined;this._cachedMaps=t?t.maps:new Map;this._cachedHashUpdate=t?t.hash:undefined}getCachedData(){if(this._cachedSource){this.buffer()}const e=new Map;for(const t of this._cachedMaps){if(t[1].bufferedMap===undefined){t[1].bufferedMap=i(t[1].map)}e.set(t[0],{map:undefined,bufferedMap:t[1].bufferedMap})}return{buffer:this._cachedBuffer,source:this._cachedSourceType!==undefined?this._cachedSourceType:typeof this._cachedSource==="string"?true:Buffer.isBuffer(this._cachedSource)?false:undefined,size:this._cachedSize,maps:e,hash:this._cachedHashUpdate}}originalLazy(){return this._source}original(){if(typeof this._source==="function")this._source=this._source();return this._source}source(){if(this._cachedSource!==undefined)return this._cachedSource;if(this._cachedBuffer&&this._cachedSourceType!==undefined){return this._cachedSource=this._cachedSourceType?this._cachedBuffer.toString("utf-8"):this._cachedBuffer}else{return this._cachedSource=this.original().source()}}buffer(){if(typeof this._cachedBuffer!=="undefined")return this._cachedBuffer;if(typeof this._cachedSource!=="undefined"){if(Buffer.isBuffer(this._cachedSource)){return this._cachedBuffer=this._cachedSource}return this._cachedBuffer=Buffer.from(this._cachedSource,"utf-8")}if(typeof this.original().buffer==="function"){return this._cachedBuffer=this.original().buffer()}const e=this.source();if(Buffer.isBuffer(e)){return this._cachedBuffer=e}return this._cachedBuffer=Buffer.from(e,"utf-8")}size(){if(typeof this._cachedSize!=="undefined")return this._cachedSize;if(typeof this._cachedSource!=="undefined"){return this._cachedSize=Buffer.byteLength(this._cachedSource)}if(typeof this._cachedBuffer!=="undefined"){return this._cachedSize=this._cachedBuffer.length}return this._cachedSize=this.original().size()}sourceAndMap(e){const t=e?JSON.stringify(e):"{}";let s=this._cachedMaps.get(t);if(s&&s.map===undefined){s.map=r(s.bufferedMap)}if(typeof this._cachedSource!=="undefined"){if(s===undefined){const s=this.original().map(e);this._cachedMaps.set(t,{map:s,bufferedMap:undefined});return{source:this._cachedSource,map:s}}else{return{source:this._cachedSource,map:s.map}}}else if(s!==undefined){return{source:this._cachedSource=this.original().source(),map:s.map}}else{const s=this.original().sourceAndMap(e);this._cachedSource=s.source;this._cachedMaps.set(t,{map:s.map,bufferedMap:undefined});return s}}map(e){const t=e?JSON.stringify(e):"{}";let s=this._cachedMaps.get(t);if(s!==undefined){if(s.map===undefined){s.map=r(s.bufferedMap)}return s.map}const n=this.original().map(e);this._cachedMaps.set(t,{map:n,bufferedMap:undefined});return n}updateHash(e){if(this._cachedHashUpdate!==undefined){for(const t of this._cachedHashUpdate)e.update(t);return}const t=[];let s=undefined;const n={update:e=>{if(typeof e==="string"&&e.length<10240){if(s===undefined){s=e}else{s+=e;if(s>102400){t.push(Buffer.from(s));s=undefined}}}else{if(s!==undefined){t.push(Buffer.from(s));s=undefined}t.push(e)}}};this.original().updateHash(n);if(s!==undefined){t.push(Buffer.from(s))}for(const s of t)e.update(s);this._cachedHashUpdate=t}}e.exports=CachedSource},135:function(e,t,s){"use strict";const n=s(710);class CompatSource extends n{static from(e){return e instanceof n?e:new CompatSource(e)}constructor(e){super();this._sourceLike=e}source(){return this._sourceLike.source()}buffer(){if(typeof this._sourceLike.buffer==="function"){return this._sourceLike.buffer()}return super.buffer()}size(){if(typeof this._sourceLike.size==="function"){return this._sourceLike.size()}return super.size()}map(e){if(typeof this._sourceLike.map==="function"){return this._sourceLike.map(e)}return super.map(e)}sourceAndMap(e){if(typeof this._sourceLike.sourceAndMap==="function"){return this._sourceLike.sourceAndMap(e)}return super.sourceAndMap(e)}updateHash(e){if(typeof this._sourceLike.updateHash==="function"){return this._sourceLike.updateHash(e)}if(typeof this._sourceLike.map==="function"){throw new Error("A Source-like object with a 'map' method must also provide an 'updateHash' method")}e.update(this.buffer())}}e.exports=CompatSource},209:function(e,t,s){"use strict";const n=s(710);const i=s(742);const{SourceNode:r,SourceMapConsumer:u}=s(241);const{SourceListMap:o,fromStringWithSourceMap:f}=s(233);const{getSourceAndMap:c,getMap:h}=s(533);const a=new WeakSet;class ConcatSource extends n{constructor(){super();this._children=[];for(let e=0;e<arguments.length;e++){const t=arguments[e];if(t instanceof ConcatSource){for(const e of t._children){this._children.push(e)}}else{this._children.push(t)}}this._isOptimized=arguments.length===0}getChildren(){if(!this._isOptimized)this._optimize();return this._children}add(e){if(e instanceof ConcatSource){for(const t of e._children){this._children.push(t)}}else{this._children.push(e)}this._isOptimized=false}addAllSkipOptimizing(e){for(const t of e){this._children.push(t)}}buffer(){if(!this._isOptimized)this._optimize();const e=[];for(const t of this._children){if(typeof t.buffer==="function"){e.push(t.buffer())}else{const s=t.source();if(Buffer.isBuffer(s)){e.push(s)}else{e.push(Buffer.from(s,"utf-8"))}}}return Buffer.concat(e)}source(){if(!this._isOptimized)this._optimize();let e="";for(const t of this._children){e+=t.source()}return e}size(){if(!this._isOptimized)this._optimize();let e=0;for(const t of this._children){e+=t.size()}return e}map(e){return h(this,e)}sourceAndMap(e){return c(this,e)}node(e){if(!this._isOptimized)this._optimize();const t=new r(null,null,null,this._children.map(function(t){if(typeof t.node==="function")return t.node(e);const s=t.sourceAndMap(e);if(s.map){return r.fromStringWithSourceMap(s.source,new u(s.map))}else{return s.source}}));return t}listMap(e){if(!this._isOptimized)this._optimize();const t=new o;for(const s of this._children){if(typeof s==="string"){t.add(s)}else if(typeof s.listMap==="function"){t.add(s.listMap(e))}else{const n=s.sourceAndMap(e);if(n.map){t.add(f(n.source,n.map))}else{t.add(n.source)}}}return t}updateHash(e){if(!this._isOptimized)this._optimize();e.update("ConcatSource");for(const t of this._children){t.updateHash(e)}}_optimize(){const e=[];let t=undefined;let s=undefined;const n=e=>{if(s===undefined){s=e}else if(Array.isArray(s)){s.push(e)}else{s=[typeof s==="string"?s:s.source(),e]}};const r=e=>{if(s===undefined){s=e}else if(Array.isArray(s)){s.push(e.source())}else{s=[typeof s==="string"?s:s.source(),e.source()]}};const u=()=>{if(Array.isArray(s)){const t=new i(s.join(""));a.add(t);e.push(t)}else if(typeof s==="string"){const t=new i(s);a.add(t);e.push(t)}else{e.push(s)}};for(const i of this._children){if(typeof i==="string"){if(t===undefined){t=i}else{t+=i}}else{if(t!==undefined){n(t);t=undefined}if(a.has(i)){r(i)}else{if(s!==undefined){u();s=undefined}e.push(i)}}}if(t!==undefined){n(t)}if(s!==undefined){u()}this._children=e;this._isOptimized=true}}e.exports=ConcatSource},229:function(e,t,s){"use strict";const n=s(710);const{SourceNode:i}=s(241);const{SourceListMap:r}=s(233);const{getSourceAndMap:u,getMap:o}=s(533);const f=/(?!$)[^\n\r;{}]*[\n\r;{}]*/g;function _splitCode(e){return e.match(f)||[]}class OriginalSource extends n{constructor(e,t){super();const s=Buffer.isBuffer(e);this._value=s?undefined:e;this._valueAsBuffer=s?e:undefined;this._name=t}getName(){return this._name}source(){if(this._value===undefined){this._value=this._valueAsBuffer.toString("utf-8")}return this._value}buffer(){if(this._valueAsBuffer===undefined){this._valueAsBuffer=Buffer.from(this._value,"utf-8")}return this._valueAsBuffer}map(e){return o(this,e)}sourceAndMap(e){return u(this,e)}node(e){if(this._value===undefined){this._value=this._valueAsBuffer.toString("utf-8")}const t=this._value;const s=this._name;const n=t.split("\n");const r=new i(null,null,null,n.map(function(t,r){let u=0;if(e&&e.columns===false){const e=t+(r!==n.length-1?"\n":"");return new i(r+1,0,s,e)}return new i(null,null,null,_splitCode(t+(r!==n.length-1?"\n":"")).map(function(e){if(/^\s*$/.test(e)){u+=e.length;return e}const t=new i(r+1,u,s,e);u+=e.length;return t}))}));r.setSourceContent(s,t);return r}listMap(e){if(this._value===undefined){this._value=this._valueAsBuffer.toString("utf-8")}return new r(this._value,this._name,this._value)}updateHash(e){if(this._valueAsBuffer===undefined){this._valueAsBuffer=Buffer.from(this._value,"utf-8")}e.update("OriginalSource");e.update(this._valueAsBuffer);e.update(this._name||"")}}e.exports=OriginalSource},485:function(e,t,s){"use strict";const n=s(710);const i=s(742);const{SourceNode:r}=s(241);const{getSourceAndMap:u,getMap:o}=s(533);const f=/\n(?=.|\s)/g;class PrefixSource extends n{constructor(e,t){super();this._source=typeof t==="string"||Buffer.isBuffer(t)?new i(t,true):t;this._prefix=e}getPrefix(){return this._prefix}original(){return this._source}source(){const e=this._source.source();const t=this._prefix;return t+e.replace(f,"\n"+t)}map(e){return o(this,e)}sourceAndMap(e){return u(this,e)}node(e){const t=this._source.node(e);const s=this._prefix;const n=[];const i=new r;t.walkSourceContents(function(e,t){i.setSourceContent(e,t)});let u=true;t.walk(function(e,t){const i=e.split(/(\n)/);for(let e=0;e<i.length;e+=2){const o=e+1<i.length;const f=i[e]+(o?"\n":"");if(f){if(u){n.push(s)}n.push(new r(t.line,t.column,t.source,f,t.name));u=o}}});i.add(n);return i}listMap(e){const t=this._prefix;const s=this._source.listMap(e);let n=true;return s.mapGeneratedCode(function(e){let s=e.replace(f,"\n"+t);if(n)s=t+s;n=e.charCodeAt(e.length-1)===10;return s})}updateHash(e){e.update("PrefixSource");this._source.updateHash(e);e.update(this._prefix)}}e.exports=PrefixSource},742:function(e,t,s){"use strict";const n=s(710);const{SourceNode:i}=s(241);const{SourceListMap:r}=s(233);class RawSource extends n{constructor(e,t=false){super();const s=Buffer.isBuffer(e);if(!s&&typeof e!=="string"){throw new TypeError("argument 'value' must be either string of Buffer")}this._valueIsBuffer=!t&&s;this._value=t&&s?undefined:e;this._valueAsBuffer=s?e:undefined}isBuffer(){return this._valueIsBuffer}source(){if(this._value===undefined){this._value=this._valueAsBuffer.toString("utf-8")}return this._value}buffer(){if(this._valueAsBuffer===undefined){this._valueAsBuffer=Buffer.from(this._value,"utf-8")}return this._valueAsBuffer}map(e){return null}node(e){if(this._value===undefined){this._value=this._valueAsBuffer.toString("utf-8")}return new i(null,null,null,this._value)}listMap(e){if(this._value===undefined){this._value=this._valueAsBuffer.toString("utf-8")}return new r(this._value)}updateHash(e){if(this._valueAsBuffer===undefined){this._valueAsBuffer=Buffer.from(this._value,"utf-8")}e.update("RawSource");e.update(this._valueAsBuffer)}}e.exports=RawSource},414:function(e,t,s){"use strict";const n=s(710);const{SourceNode:i}=s(241);const{getSourceAndMap:r,getMap:u,getNode:o,getListMap:f}=s(533);class Replacement{constructor(e,t,s,n,i){this.start=e;this.end=t;this.content=s;this.insertIndex=n;this.name=i}}class ReplaceSource extends n{constructor(e,t){super();this._source=e;this._name=t;this._replacements=[];this._isSorted=true}getName(){return this._name}getReplacements(){const e=Array.from(this._replacements);e.sort((e,t)=>{return e.insertIndex-t.insertIndex});return e}replace(e,t,s,n){if(typeof s!=="string")throw new Error("insertion must be a string, but is a "+typeof s);this._replacements.push(new Replacement(e,t,s,this._replacements.length,n));this._isSorted=false}insert(e,t,s){if(typeof t!=="string")throw new Error("insertion must be a string, but is a "+typeof t+": "+t);this._replacements.push(new Replacement(e,e-1,t,this._replacements.length,s));this._isSorted=false}source(){return this._replaceString(this._source.source())}map(e){if(this._replacements.length===0){return this._source.map(e)}return u(this,e)}sourceAndMap(e){if(this._replacements.length===0){return this._source.sourceAndMap(e)}return r(this,e)}original(){return this._source}_sortReplacements(){if(this._isSorted)return;this._replacements.sort(function(e,t){const s=t.end-e.end;if(s!==0)return s;const n=t.start-e.start;if(n!==0)return n;return t.insertIndex-e.insertIndex});this._isSorted=true}_replaceString(e){if(typeof e!=="string")throw new Error("str must be a string, but is a "+typeof e+": "+e);this._sortReplacements();const t=[e];this._replacements.forEach(function(e){const s=t.pop();const n=this._splitString(s,Math.floor(e.end+1));const i=this._splitString(n[0],Math.floor(e.start));t.push(n[1],e.content,i[0])},this);let s="";for(let e=t.length-1;e>=0;--e){s+=t[e]}return s}node(e){const t=o(this._source,e);if(this._replacements.length===0){return t}this._sortReplacements();const s=new ReplacementEnumerator(this._replacements);const n=[];let r=0;const u=Object.create(null);const f=Object.create(null);const c=new i;t.walkSourceContents(function(e,t){c.setSourceContent(e,t);u["$"+e]=t});const h=this._replaceInStringNode.bind(this,n,s,function getOriginalSource(e){const t="$"+e.source;let s=f[t];if(!s){const e=u[t];if(!e)return null;s=e.split("\n").map(function(e){return e+"\n"});f[t]=s}if(e.line>s.length)return null;const n=s[e.line-1];return n.substr(e.column)});t.walk(function(e,t){r=h(e,r,t)});const a=s.footer();if(a){n.push(a)}c.add(n);return c}listMap(e){let t=f(this._source,e);this._sortReplacements();let s=0;const n=this._replacements;let i=n.length-1;let r=0;t=t.mapGeneratedCode(function(e){const t=s+e.length;if(r>e.length){r-=e.length;e=""}else{if(r>0){e=e.substr(r);s+=r;r=0}let u="";while(i>=0&&n[i].start<t){const o=n[i];const f=Math.floor(o.start);const c=Math.floor(o.end+1);const h=e.substr(0,Math.max(0,f-s));if(c<=t){const t=e.substr(Math.max(0,c-s));u+=h+o.content;e=t;s=Math.max(s,c)}else{u+=h+o.content;e="";r=c-t}i--}e=u+e}s=t;return e});let u="";while(i>=0){u+=n[i].content;i--}if(u){t.add(u)}return t}_splitString(e,t){return t<=0?["",e]:[e.substr(0,t),e.substr(t)]}_replaceInStringNode(e,t,s,n,r,u){let o=undefined;do{let f=t.position-r;if(f<0){f=0}if(f>=n.length||t.done){if(t.emit){const t=new i(u.line,u.column,u.source,n,u.name);e.push(t)}return r+n.length}const c=u.column;let h;if(f>0){h=n.slice(0,f);if(o===undefined){o=s(u)}if(o&&o.length>=f&&o.startsWith(h)){u.column+=f;o=o.substr(f)}}const a=t.next();if(!a){if(f>0){const t=new i(u.line,c,u.source,h,u.name);e.push(t)}if(t.value){e.push(new i(u.line,u.column,u.source,t.value,u.name||t.name))}}n=n.substr(f);r+=f}while(true)}updateHash(e){this._sortReplacements();e.update("ReplaceSource");this._source.updateHash(e);e.update(this._name||"");for(const t of this._replacements){e.update(`${t.start}`);e.update(`${t.end}`);e.update(`${t.content}`);e.update(`${t.insertIndex}`);e.update(`${t.name}`)}}}class ReplacementEnumerator{constructor(e){this.replacements=e||[];this.index=this.replacements.length;this.done=false;this.emit=false;this.next()}next(){if(this.done)return true;if(this.emit){const e=this.replacements[this.index];const t=Math.floor(e.end+1);this.position=t;this.value=e.content;this.name=e.name}else{this.index--;if(this.index<0){this.done=true}else{const e=this.replacements[this.index];const t=Math.floor(e.start);this.position=t}}if(this.position<0)this.position=0;this.emit=!this.emit;return this.emit}footer(){if(!this.done&&!this.emit)this.next();if(this.done){return[]}else{let e="";for(let t=this.index;t>=0;t--){const s=this.replacements[t];e+=s.content}return e}}}e.exports=ReplaceSource},922:function(e,t,s){"use strict";const n=s(710);class SizeOnlySource extends n{constructor(e){super();this._size=e}_error(){return new Error("Content and Map of this Source is not available (only size() is supported)")}size(){return this._size}source(){throw this._error()}buffer(){throw this._error()}map(e){throw this._error()}updateHash(){throw this._error()}}e.exports=SizeOnlySource},710:function(e){"use strict";class Source{source(){throw new Error("Abstract")}buffer(){const e=this.source();if(Buffer.isBuffer(e))return e;return Buffer.from(e,"utf-8")}size(){return this.buffer().length}map(e){return null}sourceAndMap(e){return{source:this.source(),map:this.map(e)}}updateHash(e){throw new Error("Abstract")}}e.exports=Source},988:function(e,t,s){"use strict";const n=s(710);const{SourceNode:i,SourceMapConsumer:r}=s(241);const{SourceListMap:u,fromStringWithSourceMap:o}=s(233);const{getSourceAndMap:f,getMap:c}=s(533);const h=s(394);class SourceMapSource extends n{constructor(e,t,s,n,i,r){super();const u=Buffer.isBuffer(e);this._valueAsString=u?undefined:e;this._valueAsBuffer=u?e:undefined;this._name=t;this._hasSourceMap=!!s;const o=Buffer.isBuffer(s);const f=typeof s==="string";this._sourceMapAsObject=o||f?undefined:s;this._sourceMapAsString=f?s:undefined;this._sourceMapAsBuffer=o?s:undefined;this._hasOriginalSource=!!n;const c=Buffer.isBuffer(n);this._originalSourceAsString=c?undefined:n;this._originalSourceAsBuffer=c?n:undefined;this._hasInnerSourceMap=!!i;const h=Buffer.isBuffer(i);const a=typeof i==="string";this._innerSourceMapAsObject=h||a?undefined:i;this._innerSourceMapAsString=a?i:undefined;this._innerSourceMapAsBuffer=h?i:undefined;this._removeOriginalSource=r}_ensureValueBuffer(){if(this._valueAsBuffer===undefined){this._valueAsBuffer=Buffer.from(this._valueAsString,"utf-8")}}_ensureValueString(){if(this._valueAsString===undefined){this._valueAsString=this._valueAsBuffer.toString("utf-8")}}_ensureOriginalSourceBuffer(){if(this._originalSourceAsBuffer===undefined&&this._hasOriginalSource){this._originalSourceAsBuffer=Buffer.from(this._originalSourceAsString,"utf-8")}}_ensureOriginalSourceString(){if(this._originalSourceAsString===undefined&&this._hasOriginalSource){this._originalSourceAsString=this._originalSourceAsBuffer.toString("utf-8")}}_ensureInnerSourceMapObject(){if(this._innerSourceMapAsObject===undefined&&this._hasInnerSourceMap){this._ensureInnerSourceMapString();this._innerSourceMapAsObject=JSON.parse(this._innerSourceMapAsString)}}_ensureInnerSourceMapBuffer(){if(this._innerSourceMapAsBuffer===undefined&&this._hasInnerSourceMap){this._ensureInnerSourceMapString();this._innerSourceMapAsBuffer=Buffer.from(this._innerSourceMapAsString,"utf-8")}}_ensureInnerSourceMapString(){if(this._innerSourceMapAsString===undefined&&this._hasInnerSourceMap){if(this._innerSourceMapAsBuffer!==undefined){this._innerSourceMapAsString=this._innerSourceMapAsBuffer.toString("utf-8")}else{this._innerSourceMapAsString=JSON.stringify(this._innerSourceMapAsObject)}}}_ensureSourceMapObject(){if(this._sourceMapAsObject===undefined){this._ensureSourceMapString();this._sourceMapAsObject=JSON.parse(this._sourceMapAsString)}}_ensureSourceMapBuffer(){if(this._sourceMapAsBuffer===undefined){this._ensureSourceMapString();this._sourceMapAsBuffer=Buffer.from(this._sourceMapAsString,"utf-8")}}_ensureSourceMapString(){if(this._sourceMapAsString===undefined){if(this._sourceMapAsBuffer!==undefined){this._sourceMapAsString=this._sourceMapAsBuffer.toString("utf-8")}else{this._sourceMapAsString=JSON.stringify(this._sourceMapAsObject)}}}getArgsAsBuffers(){this._ensureValueBuffer();this._ensureSourceMapBuffer();this._ensureOriginalSourceBuffer();this._ensureInnerSourceMapBuffer();return[this._valueAsBuffer,this._name,this._sourceMapAsBuffer,this._originalSourceAsBuffer,this._innerSourceMapAsBuffer,this._removeOriginalSource]}source(){this._ensureValueString();return this._valueAsString}map(e){if(!this._hasInnerSourceMap){this._ensureSourceMapObject();return this._sourceMapAsObject}return c(this,e)}sourceAndMap(e){if(!this._hasInnerSourceMap){this._ensureValueString();this._ensureSourceMapObject();return{source:this._valueAsString,map:this._sourceMapAsObject}}return f(this,e)}node(e){this._ensureValueString();this._ensureSourceMapObject();this._ensureOriginalSourceString();let t=i.fromStringWithSourceMap(this._valueAsString,new r(this._sourceMapAsObject));t.setSourceContent(this._name,this._originalSourceAsString);if(this._hasInnerSourceMap){this._ensureInnerSourceMapObject();t=h(t,new r(this._innerSourceMapAsObject),this._name,this._removeOriginalSource)}return t}listMap(e){this._ensureValueString();this._ensureSourceMapObject();e=e||{};if(e.module===false)return new u(this._valueAsString,this._name,this._valueAsString);return o(this._valueAsString,this._sourceMapAsObject)}updateHash(e){this._ensureValueBuffer();this._ensureSourceMapBuffer();this._ensureOriginalSourceBuffer();this._ensureInnerSourceMapBuffer();e.update("SourceMapSource");e.update(this._valueAsBuffer);e.update(this._sourceMapAsBuffer);if(this._hasOriginalSource){e.update(this._originalSourceAsBuffer)}if(this._hasInnerSourceMap){e.update(this._innerSourceMapAsBuffer)}e.update(this._removeOriginalSource?"true":"false")}}e.exports=SourceMapSource},394:function(e,t,s){"use strict";const n=s(241).SourceNode;const i=s(241).SourceMapConsumer;const r=function(e,t,s,r){const u=new n;const o=[];const f={};const c={};const h={};const a={};t.eachMapping(function(e){(c[e.generatedLine]=c[e.generatedLine]||[]).push(e)},null,i.GENERATED_ORDER);const l=(e,t)=>{const s=c[e];let n=0;let i=s.length;while(n<i){let e=n+i>>1;if(s[e].generatedColumn<=t){n=e+1}else{i=e}}if(n===0)return undefined;return s[n-1]};e.walkSourceContents(function(e,t){f["$"+e]=t});const d=f["$"+s];const p=d?d.split("\n"):undefined;e.walk(function(e,i){if(i.source===s&&i.line&&c[i.line]){let s=l(i.line,i.column);if(s){let r=false;let f;let c;let l;const d=s.source;if(p&&d&&(f=p[s.generatedLine-1])&&((l=a[d])||(c=t.sourceContentFor(d,true)))){if(!l){l=a[d]=c.split("\n")}const e=l[s.originalLine-1];if(e){const t=i.column-s.generatedColumn;if(t>0){const n=f.slice(s.generatedColumn,i.column);const r=e.slice(s.originalColumn,s.originalColumn+t);if(n===r){s=Object.assign({},s,{originalColumn:s.originalColumn+t,generatedColumn:i.column,name:undefined})}}if(!s.name&&i.name){r=e.slice(s.originalColumn,s.originalColumn+i.name.length)===i.name}}}let _=s.source;if(_&&_!=="."){o.push(new n(s.originalLine,s.originalColumn,_,e,r?i.name:s.name));if(!("$"+_ in h)){h["$"+_]=true;const e=t.sourceContentFor(_,true);if(e){u.setSourceContent(_,e)}}return}}}if(r&&i.source===s||!i.source){o.push(e);return}const d=i.source;o.push(new n(i.line,i.column,d,e,i.name));if("$"+d in f){if(!("$"+d in h)){u.setSourceContent(d,f["$"+d]);delete f["$"+d]}}});u.add(o);return u};e.exports=r},533:function(e,t,s){"use strict";const{SourceNode:n,SourceMapConsumer:i}=s(241);const{SourceListMap:r,fromStringWithSourceMap:u}=s(233);t.getSourceAndMap=((e,t)=>{let s;let n;if(t&&t.columns===false){const i=e.listMap(t).toStringWithSourceMap({file:"x"});s=i.source;n=i.map}else{const i=e.node(t).toStringWithSourceMap({file:"x"});s=i.code;n=i.map.toJSON()}if(!n||!n.sources||n.sources.length===0)n=null;return{source:s,map:n}});t.getMap=((e,t)=>{let s;if(t&&t.columns===false){s=e.listMap(t).toStringWithSourceMap({file:"x"}).map}else{s=e.node(t).toStringWithSourceMap({file:"x"}).map.toJSON()}if(!s||!s.sources||s.sources.length===0)return null;return s});t.getNode=((e,t)=>{if(typeof e.node==="function"){return e.node(t)}else{const s=e.sourceAndMap(t);if(s.map){return n.fromStringWithSourceMap(s.source,new i(s.map))}else{return new n(null,null,null,s.source)}}});t.getListMap=((e,t)=>{if(typeof e.listMap==="function"){return e.listMap(t)}else{const s=e.sourceAndMap(t);if(s.map){return u(s.source,s.map)}else{return new r(s.source)}}})},315:function(e,t,s){const n=(e,s)=>{let n;Object.defineProperty(t,e,{get:()=>{if(s!==undefined){n=s();s=undefined}return n},configurable:true})};n("Source",()=>s(710));n("RawSource",()=>s(742));n("OriginalSource",()=>s(229));n("SourceMapSource",()=>s(988));n("CachedSource",()=>s(72));n("ConcatSource",()=>s(209));n("ReplaceSource",()=>s(414));n("PrefixSource",()=>s(485));n("SizeOnlySource",()=>s(922));n("CompatSource",()=>s(135))},241:function(e){"use strict";e.exports=require("next/dist/compiled/source-map")}};var t={};function __nccwpck_require__(s){if(t[s]){return t[s].exports}var n=t[s]={exports:{}};var i=true;try{e[s](n,n.exports,__nccwpck_require__);i=false}finally{if(i)delete t[s]}return n.exports}__nccwpck_require__.ab=__dirname+"/";return __nccwpck_require__(315)}();