/*!--------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

export function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

export var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

export function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

export function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

export function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

export function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};

export function __runInitializers(thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};

export function __propKey(x) {
    return typeof x === "symbol" ? x : "".concat(x);
};

export function __setFunctionName(f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};

export function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

export function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

export function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

export var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

export function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

export function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

export function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
export function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
export function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

export function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

export function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

export function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
    function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
    function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

export function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
}

export function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

export function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

export function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

export function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

export function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

export function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

export function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}

export function __addDisposableResource(env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose, inner;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
            if (async) inner = dispose;
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
        env.stack.push({ value: value, dispose: dispose, async: async });
    }
    else if (async) {
        env.stack.push({ async: true });
    }
    return value;

}

var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

export function __disposeResources(env) {
    function fail(e) {
        env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
        env.hasError = true;
    }
    function next() {
        while (env.stack.length) {
            var rec = env.stack.pop();
            try {
                var result = rec.dispose && rec.dispose.call(rec.value);
                if (rec.async) return Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
            }
            catch (e) {
                fail(e);
            }
        }
        if (env.hasError) throw env.error;
    }
    return next();
}

export default {
    __extends: __extends,
    __assign: __assign,
    __rest: __rest,
    __decorate: __decorate,
    __param: __param,
    __metadata: __metadata,
    __awaiter: __awaiter,
    __generator: __generator,
    __createBinding: __createBinding,
    __exportStar: __exportStar,
    __values: __values,
    __read: __read,
    __spread: __spread,
    __spreadArrays: __spreadArrays,
    __spreadArray: __spreadArray,
    __await: __await,
    __asyncGenerator: __asyncGenerator,
    __asyncDelegator: __asyncDelegator,
    __asyncValues: __asyncValues,
    __makeTemplateObject: __makeTemplateObject,
    __importStar: __importStar,
    __importDefault: __importDefault,
    __classPrivateFieldGet: __classPrivateFieldGet,
    __classPrivateFieldSet: __classPrivateFieldSet,
    __classPrivateFieldIn: __classPrivateFieldIn,
    __addDisposableResource: __addDisposableResource,
    __disposeResources: __disposeResources,
};

(async function(){let u=globalThis;u.process??={},u.process.env??={},u.process.env.NODE_ENV="production",performance.mark("code/didStartRenderer");let p=window.vscode,m=p.process;function h(i){performance.mark("code/willShowPartsSplash"),f(i),performance.mark("code/didShowPartsSplash")}function f(i){let o=i.partsSplash;o&&(i.autoDetectHighContrast&&i.colorScheme.highContrast?(i.colorScheme.dark&&o.baseTheme!=="hc-black"||!i.colorScheme.dark&&o.baseTheme!=="hc-light")&&(o=void 0):i.autoDetectColorScheme&&(i.colorScheme.dark&&o.baseTheme!=="vs-dark"||!i.colorScheme.dark&&o.baseTheme!=="vs")&&(o=void 0)),o&&i.extensionDevelopmentPath&&(o.layoutInfo=void 0);let r,a,l;o?(r=o.baseTheme,a=o.colorInfo.editorBackground,l=o.colorInfo.foreground):i.autoDetectHighContrast&&i.colorScheme.highContrast?i.colorScheme.dark?(r="hc-black",a="#000000",l="#FFFFFF"):(r="hc-light",a="#FFFFFF",l="#000000"):i.autoDetectColorScheme&&(i.colorScheme.dark?(r="vs-dark",a="#1E1E1E",l="#CCCCCC"):(r="vs",a="#FFFFFF",l="#000000"));let c=document.createElement("style");if(c.className="initialShellColors",window.document.head.appendChild(c),c.textContent=`body {	background-color: ${a}; color: ${l}; margin: 0; padding: 0; }`,typeof o?.zoomLevel=="number"&&typeof p?.webFrame?.setZoomLevel=="function"&&p.webFrame.setZoomLevel(o.zoomLevel),o?.layoutInfo){let{layoutInfo:t,colorInfo:n}=o,d=document.createElement("div");if(d.id="monaco-parts-splash",d.className=r??"vs-dark",t.windowBorder&&n.windowBorder){let e=document.createElement("div");e.style.position="absolute",e.style.width="calc(100vw - 2px)",e.style.height="calc(100vh - 2px)",e.style.zIndex="1",e.style.border="1px solid var(--window-border-color)",e.style.setProperty("--window-border-color",n.windowBorder),t.windowBorderRadius&&(e.style.borderRadius=t.windowBorderRadius),d.appendChild(e)}if(t.auxiliaryBarWidth===Number.MAX_SAFE_INTEGER?t.auxiliaryBarWidth=window.innerWidth-t.activityBarWidth:t.auxiliaryBarWidth=Math.min(t.auxiliaryBarWidth,window.innerWidth-(t.activityBarWidth+t.editorPartMinWidth+t.sideBarWidth)),t.sideBarWidth=Math.min(t.sideBarWidth,window.innerWidth-(t.activityBarWidth+t.editorPartMinWidth+t.auxiliaryBarWidth)),t.titleBarHeight>0){let e=document.createElement("div");if(e.style.position="absolute",e.style.width="100%",e.style.height=`${t.titleBarHeight}px`,e.style.left="0",e.style.top="0",e.style.backgroundColor=`${n.titleBarBackground}`,e.style["-webkit-app-region"]="drag",d.appendChild(e),n.titleBarBorder){let s=document.createElement("div");s.style.position="absolute",s.style.width="100%",s.style.height="1px",s.style.left="0",s.style.bottom="0",s.style.borderBottom=`1px solid ${n.titleBarBorder}`,e.appendChild(s)}}if(t.activityBarWidth>0){let e=document.createElement("div");if(e.style.position="absolute",e.style.width=`${t.activityBarWidth}px`,e.style.height=`calc(100% - ${t.titleBarHeight+t.statusBarHeight}px)`,e.style.top=`${t.titleBarHeight}px`,t.sideBarSide==="left"?e.style.left="0":e.style.right="0",e.style.backgroundColor=`${n.activityBarBackground}`,d.appendChild(e),n.activityBarBorder){let s=document.createElement("div");s.style.position="absolute",s.style.width="1px",s.style.height="100%",s.style.top="0",t.sideBarSide==="left"?(s.style.right="0",s.style.borderRight=`1px solid ${n.activityBarBorder}`):(s.style.left="0",s.style.borderLeft=`1px solid ${n.activityBarBorder}`),e.appendChild(s)}}if(t.sideBarWidth>0){let e=document.createElement("div");if(e.style.position="absolute",e.style.width=`${t.sideBarWidth}px`,e.style.height=`calc(100% - ${t.titleBarHeight+t.statusBarHeight}px)`,e.style.top=`${t.titleBarHeight}px`,t.sideBarSide==="left"?e.style.left=`${t.activityBarWidth}px`:e.style.right=`${t.activityBarWidth}px`,e.style.backgroundColor=`${n.sideBarBackground}`,d.appendChild(e),n.sideBarBorder){let s=document.createElement("div");s.style.position="absolute",s.style.width="1px",s.style.height="100%",s.style.top="0",s.style.right="0",t.sideBarSide==="left"?s.style.borderRight=`1px solid ${n.sideBarBorder}`:(s.style.left="0",s.style.borderLeft=`1px solid ${n.sideBarBorder}`),e.appendChild(s)}}if(t.auxiliaryBarWidth>0){let e=document.createElement("div");if(e.style.position="absolute",e.style.width=`${t.auxiliaryBarWidth}px`,e.style.height=`calc(100% - ${t.titleBarHeight+t.statusBarHeight}px)`,e.style.top=`${t.titleBarHeight}px`,t.sideBarSide==="left"?e.style.right="0":e.style.left="0",e.style.backgroundColor=`${n.sideBarBackground}`,d.appendChild(e),n.sideBarBorder){let s=document.createElement("div");s.style.position="absolute",s.style.width="1px",s.style.height="100%",s.style.top="0",t.sideBarSide==="left"?(s.style.left="0",s.style.borderLeft=`1px solid ${n.sideBarBorder}`):(s.style.right="0",s.style.borderRight=`1px solid ${n.sideBarBorder}`),e.appendChild(s)}}if(t.statusBarHeight>0){let e=document.createElement("div");if(e.style.position="absolute",e.style.width="100%",e.style.height=`${t.statusBarHeight}px`,e.style.bottom="0",e.style.left="0",i.workspace&&n.statusBarBackground?e.style.backgroundColor=n.statusBarBackground:!i.workspace&&n.statusBarNoFolderBackground&&(e.style.backgroundColor=n.statusBarNoFolderBackground),d.appendChild(e),n.statusBarBorder){let s=document.createElement("div");s.style.position="absolute",s.style.width="100%",s.style.height="1px",s.style.top="0",s.style.borderTop=`1px solid ${n.statusBarBorder}`,e.appendChild(s)}}window.document.body.appendChild(d)}}async function y(i){let o=await b();i?.beforeImport?.(o);let{enableDeveloperKeybindings:r,removeDeveloperKeybindingsAfterLoad:a,developerDeveloperKeybindingsDisposable:l,forceDisableShowDevtoolsOnError:c}=w(o,i);v(o);let t=new URL(`${x(o.appRoot,{isWindows:m.platform==="win32",scheme:"vscode-file",fallbackAuthority:"vscode-app"})}/out/`);globalThis._VSCODE_FILE_ROOT=t.toString(),S(o,t);try{let n;m.env.VSCODE_DEV&&globalThis._VSCODE_USE_RELATIVE_IMPORTS?n="../../../workbench/workbench.desktop.main.js":n=new URL("vs/workbench/workbench.desktop.main.js",t).href;let d=await import(n);return l&&a&&l(),{result:d,configuration:o}}catch(n){throw B(n,r&&!c),n}}async function b(){let i=setTimeout(()=>{console.error("[resolve window config] Could not resolve window configuration within 10 seconds, but will continue to wait...")},1e4);performance.mark("code/willWaitForWindowConfig");let o=await p.context.resolveConfiguration();return performance.mark("code/didWaitForWindowConfig"),clearTimeout(i),o}function w(i,o){let{forceEnableDeveloperKeybindings:r,disallowReloadKeybinding:a,removeDeveloperKeybindingsAfterLoad:l,forceDisableShowDevtoolsOnError:c}=typeof o?.configureDeveloperSettings=="function"?o.configureDeveloperSettings(i):{forceEnableDeveloperKeybindings:!1,disallowReloadKeybinding:!1,removeDeveloperKeybindingsAfterLoad:!1,forceDisableShowDevtoolsOnError:!1},n=!!(!!m.env.VSCODE_DEV||r),d;return n&&(d=g(a)),{enableDeveloperKeybindings:n,removeDeveloperKeybindingsAfterLoad:l,developerDeveloperKeybindingsDisposable:d,forceDisableShowDevtoolsOnError:c}}function g(i){let o=p.ipcRenderer,r=function(n){return[n.ctrlKey?"ctrl-":"",n.metaKey?"meta-":"",n.altKey?"alt-":"",n.shiftKey?"shift-":"",n.keyCode].join("")},a=m.platform==="darwin"?"meta-alt-73":"ctrl-shift-73",l="123",c=m.platform==="darwin"?"meta-82":"ctrl-82",t=function(n){let d=r(n);d===a||d===l?o.send("vscode:toggleDevTools"):d===c&&!i&&o.send("vscode:reloadWindow")};return window.addEventListener("keydown",t),function(){t&&(window.removeEventListener("keydown",t),t=void 0)}}function v(i){globalThis._VSCODE_NLS_MESSAGES=i.nls.messages,globalThis._VSCODE_NLS_LANGUAGE=i.nls.language;let o=i.nls.language||"en";o==="zh-tw"?o="zh-Hant":o==="zh-cn"&&(o="zh-Hans"),window.document.documentElement.setAttribute("lang",o)}function B(i,o){o&&p.ipcRenderer.send("vscode:openDevTools"),console.error(`[uncaught exception]: ${i}`),i&&typeof i!="string"&&i.stack&&console.error(i.stack)}function x(i,o){let r=i.replace(/\\/g,"/");r.length>0&&r.charAt(0)!=="/"&&(r=`/${r}`);let a;return o.isWindows&&r.startsWith("//")?a=encodeURI(`${o.scheme||"file"}:${r}`):a=encodeURI(`${o.scheme||"file"}://${o.fallbackAuthority||""}${r}`),a.replace(/#/g,"%23")}function S(i,o){if(!globalThis._VSCODE_DISABLE_CSS_IMPORT_MAP&&Array.isArray(i.cssModules)&&i.cssModules.length>0){performance.mark("code/willAddCssLoader"),globalThis._VSCODE_CSS_LOAD=function(t){let n=document.createElement("link");n.setAttribute("rel","stylesheet"),n.setAttribute("type","text/css"),n.setAttribute("href",t),window.document.head.appendChild(n)};let r={imports:{react:"../../../../../node_modules/preact/compat/dist/compat.mjs",preact:"../../../../../node_modules/preact/dist/preact.mjs","preact/hooks":"../../../../../node_modules/preact/hooks/dist/hooks.mjs","react-dom/client":"../../../../../node_modules/preact/compat/client.mjs","preact/compat":"../../../../../node_modules/preact/compat/dist/compat.mjs","react/jsx-runtime":"../../../../../node_modules/preact/jsx-runtime/dist/jsxRuntime.mjs",zustand:"../../../../../node_modules/zustand/esm/index.mjs","zustand/middleware":"../../../../../node_modules/zustand/esm/middleware.mjs","zustand/react":"../../../../../node_modules/zustand/esm/react.mjs","zustand/vanilla":"../../../../../node_modules/zustand/esm/vanilla.mjs","motion/react":"../../../../../node_modules/motion/dist/es/react.mjs",motion:"../../../../../node_modules/motion/dist/es/index.mjs","framer-motion":"../../../../../node_modules/framer-motion/dist/es/index.mjs","motion-utils":"../../../../../node_modules/motion-utils/dist/es/index.mjs","motion-dom":"../../../../../node_modules/motion-dom/dist/es/index.mjs","@bufbuild/protobuf":"../../../../../node_modules/@bufbuild/protobuf/dist/esm/index.js","jsonc-parser":"../../../../../node_modules/jsonc-parser/lib/esm/main.js","@connectrpc/connect":"../../../../../node_modules/@connectrpc/connect/dist/esm/index.js","@connectrpc/connect/protocol":"../../../../../node_modules/@connectrpc/connect/dist/esm/protocol/index.js","@connectrpc/connect/protocol-connect":"../../../../../node_modules/@connectrpc/connect/dist/esm/protocol-connect/index.js","@connectrpc/connect/protocol-grpc-web":"../../../../../node_modules/@connectrpc/connect/dist/esm/protocol-grpc-web/index.js","@connectrpc/connect-web":"../../../../../node_modules/@connectrpc/connect-web/dist/esm/index.js","unleash-proxy-client":"../../../../../node_modules/unleash-proxy-client/build/main.esm.js","@exa/chat-client":"../../../../../node_modules/@exa/chat-client/index.js","@exa/windsurf-acp":"../../../../../node_modules/@exa/windsurf-acp/index.js"}};for(let t of i.cssModules){let n=new URL(t,o).href,d=`globalThis._VSCODE_CSS_LOAD('${n}');
`,e=new Blob([d],{type:"application/javascript"});r.imports[n]=URL.createObjectURL(e)}let a=window.trustedTypes?.createPolicy("vscode-bootstrapImportMap",{createScript(t){return t}}),l=JSON.stringify(r,void 0,2),c=document.createElement("script");c.type="importmap",c.setAttribute("nonce","0c6a828f1297"),c.textContent=a?.createScript(l)??l,window.document.head.appendChild(c),performance.mark("code/didAddCssLoader")}}let{result:k,configuration:C}=await y({configureDeveloperSettings:function(i){return{forceDisableShowDevtoolsOnError:typeof i.extensionTestsPath=="string"||i["enable-smoke-test-driver"]===!0,forceEnableDeveloperKeybindings:Array.isArray(i.extensionDevelopmentPath)&&i.extensionDevelopmentPath.length>0,removeDeveloperKeybindingsAfterLoad:!0}},beforeImport:function(i){h(i),Object.defineProperty(window,"vscodeWindowId",{get:()=>i.windowId}),window.requestIdleCallback(()=>{let o=document.createElement("canvas");o.getContext("2d")?.clearRect(0,0,o.width,o.height),o.remove()},{timeout:50}),performance.mark("code/willLoadWorkbenchMain")}});performance.mark("code/didLoadWorkbenchMain"),k.main(C)})();
//# sourceMappingURL=https://cdn.windsurf.com/sourcemaps/a65d6c4e1fd335336d7a0b601099811667e184ca/core/vs/code/electron-browser/workbench/workbench.js.map
