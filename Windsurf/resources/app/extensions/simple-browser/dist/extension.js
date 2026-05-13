"use strict";var y=Object.create;var l=Object.defineProperty;var U=Object.getOwnPropertyDescriptor;var x=Object.getOwnPropertyNames;var C=Object.getPrototypeOf,_=Object.prototype.hasOwnProperty;var D=(s,t)=>{for(var e in t)l(s,e,{get:t[e],enumerable:!0})},m=(s,t,e,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of x(t))!_.call(s,r)&&r!==e&&l(s,r,{get:()=>t[r],enumerable:!(i=U(t,r))||i.enumerable});return s};var h=(s,t,e)=>(e=s!=null?y(C(s)):{},m(t||!s||!s.__esModule?l(e,"default",{value:s,enumerable:!0}):e,s)),P=s=>m(l({},"__esModule",{value:!0}),s);var L={};D(L,{activate:()=>R});module.exports=P(L);var o=h(require("vscode"));var n=h(require("vscode"));function S(s){for(;s.length;)s.pop()?.dispose()}var p=class{_isDisposed=!1;_disposables=[];dispose(){this._isDisposed||(this._isDisposed=!0,S(this._disposables))}_register(t){return this._isDisposed?t.dispose():this._disposables.push(t),t}get isDisposed(){return this._isDisposed}};function b(){if(typeof crypto.randomUUID=="function")return crypto.randomUUID.bind(crypto)();let s=new Uint8Array(16),t=[];for(let r=0;r<256;r++)t.push(r.toString(16).padStart(2,"0"));crypto.getRandomValues(s),s[6]=s[6]&15|64,s[8]=s[8]&63|128;let e=0,i="";return i+=t[s[e++]],i+=t[s[e++]],i+=t[s[e++]],i+=t[s[e++]],i+="-",i+=t[s[e++]],i+=t[s[e++]],i+="-",i+=t[s[e++]],i+=t[s[e++]],i+="-",i+=t[s[e++]],i+=t[s[e++]],i+="-",i+=t[s[e++]],i+=t[s[e++]],i+=t[s[e++]],i+=t[s[e++]],i+=t[s[e++]],i+=t[s[e++]],i}var d=class s extends p{constructor(e,i,r){super();this.extensionUri=e;this._webviewPanel=this._register(r),this._webviewPanel.webview.options=s.getWebviewOptions(e),this._register(this._webviewPanel.webview.onDidReceiveMessage(c=>{switch(c.type){case"openExternal":try{let a=n.Uri.parse(c.url);n.env.openExternal(a)}catch{}break}})),this._register(this._webviewPanel.onDidDispose(()=>{this.dispose()})),this._register(n.workspace.onDidChangeConfiguration(c=>{if(c.affectsConfiguration("simpleBrowser.focusLockIndicator.enabled")){let a=n.workspace.getConfiguration("simpleBrowser");this._webviewPanel.webview.postMessage({type:"didChangeFocusLockIndicatorEnabled",focusLockEnabled:a.get("focusLockIndicator.enabled",!0)})}})),this.show(i)}static viewType="simpleBrowser.view";static title=n.l10n.t("Windsurf Preview");static getWebviewLocalResourceRoots(e){return[n.Uri.joinPath(e,"media")]}static getWebviewOptions(e){return{enableScripts:!0,enableForms:!0,localResourceRoots:s.getWebviewLocalResourceRoots(e)}}_webviewPanel;_onDidDispose=this._register(new n.EventEmitter);onDispose=this._onDidDispose.event;static create(e,i,r){let c=n.window.createWebviewPanel(s.viewType,s.title,{viewColumn:r?.viewColumn??n.ViewColumn.Active,preserveFocus:r?.preserveFocus},{retainContextWhenHidden:!0,...s.getWebviewOptions(e)});return new s(e,i,c)}static restore(e,i,r){return new s(e,i,r)}dispose(){this._onDidDispose.fire(),super.dispose()}show(e,i){this._webviewPanel.webview.html=this.getHtml(e),this._webviewPanel.reveal(i?.viewColumn,i?.preserveFocus)}getHtml(e){let i=n.workspace.getConfiguration("simpleBrowser"),r=b(),c=this.extensionResourceUrl("media","index.js"),a=this.extensionResourceUrl("media","main.css"),f=this.extensionResourceUrl("media","codicon.css");return`<!DOCTYPE html>
			<html>
			<head>
				<meta http-equiv="Content-type" content="text/html;charset=UTF-8">

				<meta http-equiv="Content-Security-Policy" content="
					default-src 'none';
					font-src data:;
					style-src ${this._webviewPanel.webview.cspSource};
					script-src 'nonce-${r}';
					frame-src *;
					">

				<meta id="simple-browser-settings" data-settings="${B(JSON.stringify({url:e,focusLockEnabled:i.get("focusLockIndicator.enabled",!0)}))}">

				<link rel="stylesheet" type="text/css" href="${a}">
				<link rel="stylesheet" type="text/css" href="${f}">
			</head>
			<body>
				<header class="header">
					<nav class="controls">
						<button
							title="${n.l10n.t("Back")}"
							class="back-button icon"><i class="codicon codicon-arrow-left"></i></button>

						<button
							title="${n.l10n.t("Forward")}"
							class="forward-button icon"><i class="codicon codicon-arrow-right"></i></button>

						<button
							title="${n.l10n.t("Reload")}"
							class="reload-button icon"><i class="codicon codicon-refresh"></i></button>
					</nav>

					<input class="url-input" type="text">

					<nav class="controls">
						<button
							title="${n.l10n.t("Open in browser")}"
							class="open-external-button icon"><i class="codicon codicon-link-external"></i></button>
					</nav>
				</header>
				<div class="content">
					<!-- HIDDEN FOR CASCADE -->
					<!-- <div class="iframe-focused-alert">${n.l10n.t("Focus Lock")}</div> -->
					<iframe sandbox="allow-scripts allow-forms allow-same-origin allow-downloads"></iframe>
				</div>

				<script src="${c}" nonce="${r}"></script>
			</body>
			</html>`}extensionResourceUrl(...e){return this._webviewPanel.webview.asWebviewUri(n.Uri.joinPath(this.extensionUri,...e))}};function B(s){return s.toString().replace(/"/g,"&quot;")}var v=class{constructor(t){this.extensionUri=t}_activeView;dispose(){this._activeView?.dispose(),this._activeView=void 0}show(t,e){let i=typeof t=="string"?t:t.toString(!0);if(this._activeView)this._activeView.show(i,e);else{let r=d.create(this.extensionUri,i,e);this.registerWebviewListeners(r),this._activeView=r}}restore(t,e){let i=e?.url??"",r=d.restore(this.extensionUri,i,t);this.registerWebviewListeners(r),this._activeView??=r}registerWebviewListeners(t){t.onDispose(()=>{this._activeView===t&&(this._activeView=void 0)})}};var E="simpleBrowser.api.open",O="simpleBrowser.show",g="workbench.action.browser.open",V="simpleBrowser.useIntegratedBrowser",W=new Set(["localhost","127.0.0.1","[0:0:0:0:0:0:0:1]","[::1]","0.0.0.0","[0:0:0:0:0:0:0:0]","[::]"]),k="simpleBrowser.open";async function w(){return o.workspace.getConfiguration().get(V,!0)?(await o.commands.getCommands(!0)).includes(g):!1}async function u(s){await o.commands.executeCommand(g,s)}function R(s){let t=new v(s.extensionUri);s.subscriptions.push(t),s.subscriptions.push(o.commands.registerCommand(O,async e=>{if(await w())return u(e);e||(e=await o.window.showInputBox({placeHolder:o.l10n.t("https://example.com"),prompt:o.l10n.t("Enter url to visit")})),e&&t.show(e)})),s.subscriptions.push(o.commands.registerCommand(E,async(e,i)=>{await w()?await u(e.toString(!0)):t.show(e,i)})),s.subscriptions.push(o.window.registerExternalUriOpener(k,{canOpenExternalUri(e){let i=new URL(e.toString(!0));return W.has(i.hostname)?I()?o.ExternalUriOpenerPriority.Default:o.ExternalUriOpenerPriority.Option:o.ExternalUriOpenerPriority.None},async openExternalUri(e){if(await w())await u(e.toString(!0));else return t.show(e,{viewColumn:o.window.activeTextEditor?o.ViewColumn.Beside:o.ViewColumn.Active})}},{schemes:["http","https"],label:o.l10n.t("Open in simple browser")}))}function I(){return!(typeof process=="object"&&process.versions.node)&&o.env.uiKind===o.UIKind.Web}0&&(module.exports={activate});
//# sourceMappingURL=extension.js.map
