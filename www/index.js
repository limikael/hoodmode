(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// This file replaces `format.js` in bundlers like webpack or Rollup,
// according to `browser` config in `package.json`.

module.exports = function (random, alphabet, size) {
  // We can’t use bytes bigger than the alphabet. To make bytes values closer
  // to the alphabet, we apply bitmask on them. We look for the closest
  // `2 ** x - 1` number, which will be bigger than alphabet size. If we have
  // 30 symbols in the alphabet, we will take 31 (00011111).
  // We do not use faster Math.clz32, because it is not available in browsers.
  var mask = (2 << Math.log(alphabet.length - 1) / Math.LN2) - 1
  // Bitmask is not a perfect solution (in our example it will pass 31 bytes,
  // which is bigger than the alphabet). As a result, we will need more bytes,
  // than ID size, because we will refuse bytes bigger than the alphabet.

  // Every hardware random generator call is costly,
  // because we need to wait for entropy collection. This is why often it will
  // be faster to ask for few extra bytes in advance, to avoid additional calls.

  // Here we calculate how many random bytes should we call in advance.
  // It depends on ID length, mask / alphabet size and magic number 1.6
  // (which was selected according benchmarks).

  // -~f => Math.ceil(f) if n is float number
  // -~i => i + 1 if n is integer number
  var step = -~(1.6 * mask * size / alphabet.length)
  var id = ''

  while (true) {
    var bytes = random(step)
    // Compact alternative for `for (var i = 0; i < step; i++)`
    var i = step
    while (i--) {
      // If random byte is bigger than alphabet even after bitmask,
      // we refuse it by `|| ''`.
      id += alphabet[bytes[i] & mask] || ''
      // More compact than `id.length + 1 === size`
      if (id.length === +size) return id
    }
  }
}

},{}],2:[function(require,module,exports){
var n=require("preact");require("preact/devtools");var e={};function t(e){return e.type===n.Fragment?"Fragment":"function"==typeof e.type?e.type.displayName||e.type.name:"string"==typeof e.type?e.type:"#text"}var o=[],r=[];function a(){return o.length>0?o[o.length-1]:null}var i=!1;function s(e){return"function"==typeof e.type&&e.type!==n.Fragment}function c(n){for(var e=[n],o=n;null!=o.__o;)e.push(o.__o),o=o.__o;return e.reduce(function(n,e){n+="  in "+t(e);var o=e.__source;return o?n+=" (at "+o.fileName+":"+o.lineNumber+")":i||(i=!0,console.warn("Add @babel/plugin-transform-react-jsx-source to get a more detailed component stack. Note that you should not add it to production builds of your App for bundle size reasons.")),n+"\n"},"")}var l="function"==typeof WeakMap,u=n.Component.prototype.setState;n.Component.prototype.setState=function(n,e){return null==this.__v?null==this.state&&console.warn('Calling "this.setState" inside the constructor of a component is a no-op and might be a bug in your application. Instead, set "this.state = {}" directly.\n\n'+c(a())):null==this.__P&&console.warn('Can\'t call "this.setState" on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.\n\n'+c(this.__v)),u.call(this,n,e)};var f=n.Component.prototype.forceUpdate;function p(n){var e=n.props,o=t(n),r="";for(var a in e)if(e.hasOwnProperty(a)&&"children"!==a){var i=e[a];"function"==typeof i&&(i="function "+(i.displayName||i.name)+"() {}"),i=Object(i)!==i||i.toString?i+"":Object.prototype.toString.call(i),r+=" "+a+"="+JSON.stringify(i)}var s=e.children;return"<"+o+r+(s&&s.length?">..</"+o+">":" />")}n.Component.prototype.forceUpdate=function(n){return null==this.__v?console.warn('Calling "this.forceUpdate" inside the constructor of a component is a no-op and might be a bug in your application.\n\n'+c(a())):null==this.__P&&console.warn('Can\'t call "this.forceUpdate" on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.\n\n'+c(this.__v)),f.call(this,n)},function(){!function(){var e=n.options.__b,t=n.options.diffed,a=n.options.__,i=n.options.vnode,c=n.options.__r;n.options.diffed=function(n){s(n)&&r.pop(),o.pop(),t&&t(n)},n.options.__b=function(n){s(n)&&o.push(n),e&&e(n)},n.options.__=function(n,e){r=[],a&&a(n,e)},n.options.vnode=function(n){n.__o=r.length>0?r[r.length-1]:null,i&&i(n)},n.options.__r=function(n){s(n)&&r.push(n),c&&c(n)}}();var a=n.options.__b,i=n.options.diffed,u=n.options.vnode,f=n.options.__e,d=n.options.__,h=n.options.__h,y=l?{useEffect:new WeakMap,useLayoutEffect:new WeakMap,lazyPropTypes:new WeakMap}:null;n.options.__e=function(n,e,o){if(e&&e.__c&&"function"==typeof n.then){var r=n;n=new Error("Missing Suspense. The throwing component was: "+t(e));for(var a=e;a;a=a.__)if(a.__c&&a.__c.__c){n=r;break}if(n instanceof Error)throw n}f(n,e,o)},n.options.__=function(n,e){if(!e)throw new Error("Undefined parent passed to render(), this is the second argument.\nCheck if the element is available in the DOM/has the correct id.");var o;switch(e.nodeType){case 1:case 11:case 9:o=!0;break;default:o=!1}if(!o){var r=t(n);throw new Error("Expected a valid HTML node as a second argument to render.\tReceived "+e+" instead: render(<"+r+" />, "+e+");")}d&&d(n,e)},n.options.__b=function(n){var o,r,i,s,l=n.type,u=function n(e){return e?"function"==typeof e.type?n(e.__):e:{}}(n.__);if(void 0===l)throw new Error("Undefined component passed to createElement()\n\nYou likely forgot to export your component or might have mixed up default and named imports"+p(n)+"\n\n"+c(n));if(null!=l&&"object"==typeof l){if(void 0!==l.__k&&void 0!==l.__e)throw new Error("Invalid type passed to createElement(): "+l+"\n\nDid you accidentally pass a JSX literal as JSX twice?\n\n  let My"+t(n)+" = "+p(l)+";\n  let vnode = <My"+t(n)+" />;\n\nThis usually happens when you export a JSX literal and not the component.\n\n"+c(n));throw new Error("Invalid type passed to createElement(): "+(Array.isArray(l)?"array":l))}if("thead"!==l&&"tfoot"!==l&&"tbody"!==l||"table"===u.type?"tr"===l&&"thead"!==u.type&&"tfoot"!==u.type&&"tbody"!==u.type&&"table"!==u.type?console.error("Improper nesting of table. Your <tr> should have a <thead/tbody/tfoot/table> parent."+p(n)+"\n\n"+c(n)):"td"===l&&"tr"!==u.type?console.error("Improper nesting of table. Your <td> should have a <tr> parent."+p(n)+"\n\n"+c(n)):"th"===l&&"tr"!==u.type&&console.error("Improper nesting of table. Your <th> should have a <tr>."+p(n)+"\n\n"+c(n)):console.error("Improper nesting of table. Your <thead/tbody/tfoot> should have a <table> parent."+p(n)+"\n\n"+c(n)),void 0!==n.ref&&"function"!=typeof n.ref&&"object"!=typeof n.ref&&!("$$typeof"in n))throw new Error('Component\'s "ref" property should be a function, or an object created by createRef(), but got ['+typeof n.ref+"] instead\n"+p(n)+"\n\n"+c(n));if("string"==typeof n.type)for(var f in n.props)if("o"===f[0]&&"n"===f[1]&&"function"!=typeof n.props[f]&&null!=n.props[f])throw new Error("Component's \""+f+'" property should be a function, but got ['+typeof n.props[f]+"] instead\n"+p(n)+"\n\n"+c(n));if("function"==typeof n.type&&n.type.propTypes){if("Lazy"===n.type.displayName&&y&&!y.lazyPropTypes.has(n.type)){var d="PropTypes are not supported on lazy(). Use propTypes on the wrapped component itself. ";try{var h=n.type();y.lazyPropTypes.set(n.type,!0),console.warn(d+"Component wrapped in lazy() is "+t(h))}catch(n){console.warn(d+"We will log the wrapped component's name once it is loaded.")}}o=n.type.propTypes,r=n.props,i=t(n),s=p(n),Object.keys(o).forEach(function(n){var t;try{t=o[n](r,n,s,i,null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch(n){t=n}!t||t.message in e||(e[t.message]=!0,console.error("Failed "+i+" type: "+t.message))})}a&&a(n)},n.options.__h=function(n){if(!n)throw new Error("Hook can only be invoked from render methods.");h&&h(n)};var v=function(n,e){return{get:function(){throw new Error("getting vnode."+n+" is deprecated, "+e)},set:function(){throw new Error("setting vnode."+n+" is not allowed, "+e)}}},m={nodeName:v("nodeName","use vnode.type"),attributes:v("attributes","use vnode.props"),children:v("children","use vnode.props.children")},b=Object.create({},m);n.options.vnode=function(n){var e=n.props;if(null!==n.type&&null!=e&&("__source"in e||"__self"in e)){var t=n.props={};for(var o in e){var r=e[o];"__source"===o?n.__source=r:"__self"===o?n.__self=r:t[o]=r}}Object.setPrototypeOf(n,b),u&&u(n)},n.options.diffed=function(n){n.__k&&n.__k.forEach(function(n){if(n&&void 0===n.type){delete n.__,delete n.__b;var e=Object.keys(n).join(",");throw new Error("Objects are not valid as a child. Encountered an object with the keys {"+e+"}.")}});var e=n.__c;if(e&&e.__H){var o=e.__H;Array.isArray(o.__)&&o.__.forEach(function(e){if(e.__h&&(!e.__H||!Array.isArray(e.__H))){var o=t(n);console.warn("In "+o+" you are calling useMemo/useCallback without passing arguments.\nThis is a noop since it will not be able to memoize, it will execute it every render.\n\n"+c(n))}})}if(i&&i(n),null!=n.__k)for(var r=[],a=0;a<n.__k.length;a++){var s=n.__k[a];if(s&&null!=s.key){var l=s.key;if(-1!==r.indexOf(l)){console.error('Following component has two or more children with the same key attribute: "'+l+'". This may cause glitches and misbehavior in rendering process. Component: \n\n'+p(n)+"\n\n"+c(n));break}r.push(l)}}}}();


},{"preact":4,"preact/devtools":3}],3:[function(require,module,exports){
var e=require("preact");"undefined"!=typeof window&&window.__PREACT_DEVTOOLS__&&window.__PREACT_DEVTOOLS__.attachPreact("10.0.5",e.options,{Fragment:e.Fragment});


},{"preact":4}],4:[function(require,module,exports){
var n,l,u,t,i,o,r,f={},e=[],c=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord/i;function s(n,l){for(var u in l)n[u]=l[u];return n}function a(n){var l=n.parentNode;l&&l.removeChild(n)}function p(n,l,u){var t,i=arguments,o={};for(t in l)"key"!==t&&"ref"!==t&&(o[t]=l[t]);if(arguments.length>3)for(u=[u],t=3;t<arguments.length;t++)u.push(i[t]);if(null!=u&&(o.children=u),"function"==typeof n&&null!=n.defaultProps)for(t in n.defaultProps)void 0===o[t]&&(o[t]=n.defaultProps[t]);return v(n,o,l&&l.key,l&&l.ref)}function v(l,u,t,i){var o={type:l,props:u,key:t,ref:i,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0};return n.vnode&&n.vnode(o),o}function h(n){return n.children}function d(n,l){this.props=n,this.context=l}function y(n,l){if(null==l)return n.__?y(n.__,n.__.__k.indexOf(n)+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return"function"==typeof n.type?y(n):null}function x(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return x(n)}}function m(l){(!l.__d&&(l.__d=!0)&&1===u.push(l)||i!==n.debounceRendering)&&((i=n.debounceRendering)||t)(w)}function w(){var n,l,t,i,o,r,f;for(u.sort(function(n,l){return l.__v.__b-n.__v.__b});n=u.pop();)n.__d&&(t=void 0,i=void 0,r=(o=(l=n).__v).__e,(f=l.__P)&&(t=[],i=N(f,o,s({},o),l.__n,void 0!==f.ownerSVGElement,null,t,null==r?y(o):r),z(t,o),i!=r&&x(o)))}function g(n,l,u,t,i,o,r,c,s){var p,v,h,d,x,m,w,g=u&&u.__k||e,_=g.length;if(c==f&&(c=null!=o?o[0]:_?y(u,0):null),p=0,l.__k=k(l.__k,function(u){if(null!=u){if(u.__=l,u.__b=l.__b+1,null===(h=g[p])||h&&u.key==h.key&&u.type===h.type)g[p]=void 0;else for(v=0;v<_;v++){if((h=g[v])&&u.key==h.key&&u.type===h.type){g[v]=void 0;break}h=null}if(d=N(n,u,h=h||f,t,i,o,r,c,s),(v=u.ref)&&h.ref!=v&&(w||(w=[]),h.ref&&w.push(h.ref,null,u),w.push(v,u.__c||d,u)),null!=d){var e;if(null==m&&(m=d),void 0!==u.__d)e=u.__d,u.__d=void 0;else if(o==h||d!=c||null==d.parentNode){n:if(null==c||c.parentNode!==n)n.appendChild(d),e=null;else{for(x=c,v=0;(x=x.nextSibling)&&v<_;v+=2)if(x==d)break n;n.insertBefore(d,c),e=c}"option"==l.type&&(n.value="")}c=void 0!==e?e:d.nextSibling,"function"==typeof l.type&&(l.__d=c)}else c&&h.__e==c&&c.parentNode!=n&&(c=y(h))}return p++,u}),l.__e=m,null!=o&&"function"!=typeof l.type)for(p=o.length;p--;)null!=o[p]&&a(o[p]);for(p=_;p--;)null!=g[p]&&$(g[p],g[p]);if(w)for(p=0;p<w.length;p++)T(w[p],w[++p],w[++p])}function k(n,l,u){if(null==u&&(u=[]),null==n||"boolean"==typeof n)l&&u.push(l(null));else if(Array.isArray(n))for(var t=0;t<n.length;t++)k(n[t],l,u);else u.push(l?l("string"==typeof n||"number"==typeof n?v(null,n,null,null):null!=n.__e||null!=n.__c?v(n.type,n.props,n.key,null):n):n);return u}function _(n,l,u,t,i){var o;for(o in u)o in l||P(n,o,null,u[o],t);for(o in l)i&&"function"!=typeof l[o]||"value"===o||"checked"===o||u[o]===l[o]||P(n,o,l[o],u[o],t)}function b(n,l,u){"-"===l[0]?n.setProperty(l,u):n[l]="number"==typeof u&&!1===c.test(l)?u+"px":null==u?"":u}function P(n,l,u,t,i){var o,r,f,e,c;if(i?"className"===l&&(l="class"):"class"===l&&(l="className"),"key"===l||"children"===l);else if("style"===l)if(o=n.style,"string"==typeof u)o.cssText=u;else{if("string"==typeof t&&(o.cssText="",t=null),t)for(r in t)u&&r in u||b(o,r,"");if(u)for(f in u)t&&u[f]===t[f]||b(o,f,u[f])}else"o"===l[0]&&"n"===l[1]?(e=l!==(l=l.replace(/Capture$/,"")),c=l.toLowerCase(),l=(c in n?c:l).slice(2),u?(t||n.addEventListener(l,C,e),(n.l||(n.l={}))[l]=u):n.removeEventListener(l,C,e)):"list"!==l&&"tagName"!==l&&"form"!==l&&"type"!==l&&"size"!==l&&!i&&l in n?n[l]=null==u?"":u:"function"!=typeof u&&"dangerouslySetInnerHTML"!==l&&(l!==(l=l.replace(/^xlink:?/,""))?null==u||!1===u?n.removeAttributeNS("http://www.w3.org/1999/xlink",l.toLowerCase()):n.setAttributeNS("http://www.w3.org/1999/xlink",l.toLowerCase(),u):null==u||!1===u&&!/^ar/.test(l)?n.removeAttribute(l):n.setAttribute(l,u))}function C(l){this.l[l.type](n.event?n.event(l):l)}function N(l,u,t,i,o,r,f,e,c){var a,p,v,y,x,m,w,k,_,b,P=u.type;if(void 0!==u.constructor)return null;(a=n.__b)&&a(u);try{n:if("function"==typeof P){if(k=u.props,_=(a=P.contextType)&&i[a.__c],b=a?_?_.props.value:a.__:i,t.__c?w=(p=u.__c=t.__c).__=p.__E:("prototype"in P&&P.prototype.render?u.__c=p=new P(k,b):(u.__c=p=new d(k,b),p.constructor=P,p.render=j),_&&_.sub(p),p.props=k,p.state||(p.state={}),p.context=b,p.__n=i,v=p.__d=!0,p.__h=[]),null==p.__s&&(p.__s=p.state),null!=P.getDerivedStateFromProps&&(p.__s==p.state&&(p.__s=s({},p.__s)),s(p.__s,P.getDerivedStateFromProps(k,p.__s))),y=p.props,x=p.state,v)null==P.getDerivedStateFromProps&&null!=p.componentWillMount&&p.componentWillMount(),null!=p.componentDidMount&&p.__h.push(p.componentDidMount);else{if(null==P.getDerivedStateFromProps&&k!==y&&null!=p.componentWillReceiveProps&&p.componentWillReceiveProps(k,b),!p.__e&&null!=p.shouldComponentUpdate&&!1===p.shouldComponentUpdate(k,p.__s,b)){for(p.props=k,p.state=p.__s,p.__d=!1,p.__v=u,u.__e=t.__e,u.__k=t.__k,p.__h.length&&f.push(p),a=0;a<u.__k.length;a++)u.__k[a]&&(u.__k[a].__=u);break n}null!=p.componentWillUpdate&&p.componentWillUpdate(k,p.__s,b),null!=p.componentDidUpdate&&p.__h.push(function(){p.componentDidUpdate(y,x,m)})}p.context=b,p.props=k,p.state=p.__s,(a=n.__r)&&a(u),p.__d=!1,p.__v=u,p.__P=l,a=p.render(p.props,p.state,p.context),u.__k=null!=a&&a.type==h&&null==a.key?a.props.children:Array.isArray(a)?a:[a],null!=p.getChildContext&&(i=s(s({},i),p.getChildContext())),v||null==p.getSnapshotBeforeUpdate||(m=p.getSnapshotBeforeUpdate(y,x)),g(l,u,t,i,o,r,f,e,c),p.base=u.__e,p.__h.length&&f.push(p),w&&(p.__E=p.__=null),p.__e=!1}else u.__e=A(t.__e,u,t,i,o,r,f,c);(a=n.diffed)&&a(u)}catch(l){n.__e(l,u,t)}return u.__e}function z(l,u){n.__c&&n.__c(u,l),l.some(function(u){try{l=u.__h,u.__h=[],l.some(function(n){n.call(u)})}catch(l){n.__e(l,u.__v)}})}function A(n,l,u,t,i,o,r,c){var s,a,p,v,h,d=u.props,y=l.props;if(i="svg"===l.type||i,null!=o)for(s=0;s<o.length;s++)if(null!=(a=o[s])&&((null===l.type?3===a.nodeType:a.localName===l.type)||n==a)){n=a,o[s]=null;break}if(null==n){if(null===l.type)return document.createTextNode(y);n=i?document.createElementNS("http://www.w3.org/2000/svg",l.type):document.createElement(l.type,y.is&&{is:y.is}),o=null}if(null===l.type)d!==y&&n.data!=y&&(n.data=y);else if(l!==u){if(null!=o&&(o=e.slice.call(n.childNodes)),p=(d=u.props||f).dangerouslySetInnerHTML,v=y.dangerouslySetInnerHTML,!c){if(d===f)for(d={},h=0;h<n.attributes.length;h++)d[n.attributes[h].name]=n.attributes[h].value;(v||p)&&(v&&p&&v.__html==p.__html||(n.innerHTML=v&&v.__html||""))}_(n,y,d,i,c),l.__k=l.props.children,v||g(n,l,u,t,"foreignObject"!==l.type&&i,o,r,f,c),c||("value"in y&&void 0!==y.value&&y.value!==n.value&&(n.value=null==y.value?"":y.value),"checked"in y&&void 0!==y.checked&&y.checked!==n.checked&&(n.checked=y.checked))}return n}function T(l,u,t){try{"function"==typeof l?l(u):l.current=u}catch(l){n.__e(l,t)}}function $(l,u,t){var i,o,r;if(n.unmount&&n.unmount(l),(i=l.ref)&&(i.current&&i.current!==l.__e||T(i,null,u)),t||"function"==typeof l.type||(t=null!=(o=l.__e)),l.__e=l.__d=void 0,null!=(i=l.__c)){if(i.componentWillUnmount)try{i.componentWillUnmount()}catch(l){n.__e(l,u)}i.base=i.__P=null}if(i=l.__k)for(r=0;r<i.length;r++)i[r]&&$(i[r],u,t);null!=o&&a(o)}function j(n,l,u){return this.constructor(n,u)}function D(l,u,t){var i,r,c;n.__&&n.__(l,u),r=(i=t===o)?null:t&&t.__k||u.__k,l=p(h,null,[l]),c=[],N(u,(i?u:t||u).__k=l,r||f,f,void 0!==u.ownerSVGElement,t&&!i?[t]:r?null:e.slice.call(u.childNodes),c,t||f,i),z(c,l)}n={__e:function(n,l){for(var u,t;l=l.__;)if((u=l.__c)&&!u.__)try{if(u.constructor&&null!=u.constructor.getDerivedStateFromError&&(t=!0,u.setState(u.constructor.getDerivedStateFromError(n))),null!=u.componentDidCatch&&(t=!0,u.componentDidCatch(n)),t)return m(u.__E=u)}catch(l){n=l}throw n}},l=function(n){return null!=n&&void 0===n.constructor},d.prototype.setState=function(n,l){var u;u=this.__s!==this.state?this.__s:this.__s=s({},this.state),"function"==typeof n&&(n=n(u,this.props)),n&&s(u,n),null!=n&&this.__v&&(l&&this.__h.push(l),m(this))},d.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),m(this))},d.prototype.render=h,u=[],t="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,o=f,r=0,exports.render=D,exports.hydrate=function(n,l){D(n,l,o)},exports.createElement=p,exports.h=p,exports.Fragment=h,exports.createRef=function(){return{}},exports.isValidElement=l,exports.Component=d,exports.cloneElement=function(n,l){return l=s(s({},n.props),l),arguments.length>2&&(l.children=e.slice.call(arguments,2)),v(n.type,l,l.key||n.key,l.ref||n.ref)},exports.createContext=function(n){var l={},u={__c:"__cC"+r++,__:n,Consumer:function(n,l){return n.children(l)},Provider:function(n){var t,i=this;return this.getChildContext||(t=[],this.getChildContext=function(){return l[u.__c]=i,l},this.shouldComponentUpdate=function(l){n.value!==l.value&&t.some(function(n){n.context=l.value,m(n)})},this.sub=function(n){t.push(n);var l=n.componentWillUnmount;n.componentWillUnmount=function(){t.splice(t.indexOf(n),1),l&&l.call(n)}}),n.children}};return u.Consumer.contextType=u,u},exports.toChildArray=k,exports._e=$,exports.options=n;


},{}],5:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

},{}],6:[function(require,module,exports){
'use strict';
module.exports = require('./lib/index');

},{"./lib/index":10}],7:[function(require,module,exports){
'use strict';

var randomFromSeed = require('./random/random-from-seed');

var ORIGINAL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
var alphabet;
var previousSeed;

var shuffled;

function reset() {
    shuffled = false;
}

function setCharacters(_alphabet_) {
    if (!_alphabet_) {
        if (alphabet !== ORIGINAL) {
            alphabet = ORIGINAL;
            reset();
        }
        return;
    }

    if (_alphabet_ === alphabet) {
        return;
    }

    if (_alphabet_.length !== ORIGINAL.length) {
        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. You submitted ' + _alphabet_.length + ' characters: ' + _alphabet_);
    }

    var unique = _alphabet_.split('').filter(function(item, ind, arr){
       return ind !== arr.lastIndexOf(item);
    });

    if (unique.length) {
        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. These characters were not unique: ' + unique.join(', '));
    }

    alphabet = _alphabet_;
    reset();
}

function characters(_alphabet_) {
    setCharacters(_alphabet_);
    return alphabet;
}

function setSeed(seed) {
    randomFromSeed.seed(seed);
    if (previousSeed !== seed) {
        reset();
        previousSeed = seed;
    }
}

function shuffle() {
    if (!alphabet) {
        setCharacters(ORIGINAL);
    }

    var sourceArray = alphabet.split('');
    var targetArray = [];
    var r = randomFromSeed.nextValue();
    var characterIndex;

    while (sourceArray.length > 0) {
        r = randomFromSeed.nextValue();
        characterIndex = Math.floor(r * sourceArray.length);
        targetArray.push(sourceArray.splice(characterIndex, 1)[0]);
    }
    return targetArray.join('');
}

function getShuffled() {
    if (shuffled) {
        return shuffled;
    }
    shuffled = shuffle();
    return shuffled;
}

/**
 * lookup shuffled letter
 * @param index
 * @returns {string}
 */
function lookup(index) {
    var alphabetShuffled = getShuffled();
    return alphabetShuffled[index];
}

function get () {
  return alphabet || ORIGINAL;
}

module.exports = {
    get: get,
    characters: characters,
    seed: setSeed,
    lookup: lookup,
    shuffled: getShuffled
};

},{"./random/random-from-seed":13}],8:[function(require,module,exports){
'use strict';

var generate = require('./generate');
var alphabet = require('./alphabet');

// Ignore all milliseconds before a certain time to reduce the size of the date entropy without sacrificing uniqueness.
// This number should be updated every year or so to keep the generated id short.
// To regenerate `new Date() - 0` and bump the version. Always bump the version!
var REDUCE_TIME = 1567752802062;

// don't change unless we change the algos or REDUCE_TIME
// must be an integer and less than 16
var version = 7;

// Counter is used when shortid is called multiple times in one second.
var counter;

// Remember the last time shortid was called in case counter is needed.
var previousSeconds;

/**
 * Generate unique id
 * Returns string id
 */
function build(clusterWorkerId) {
    var str = '';

    var seconds = Math.floor((Date.now() - REDUCE_TIME) * 0.001);

    if (seconds === previousSeconds) {
        counter++;
    } else {
        counter = 0;
        previousSeconds = seconds;
    }

    str = str + generate(version);
    str = str + generate(clusterWorkerId);
    if (counter > 0) {
        str = str + generate(counter);
    }
    str = str + generate(seconds);
    return str;
}

module.exports = build;

},{"./alphabet":7,"./generate":9}],9:[function(require,module,exports){
'use strict';

var alphabet = require('./alphabet');
var random = require('./random/random-byte');
var format = require('nanoid/format');

function generate(number) {
    var loopCounter = 0;
    var done;

    var str = '';

    while (!done) {
        str = str + format(random, alphabet.get(), 1);
        done = number < (Math.pow(16, loopCounter + 1 ) );
        loopCounter++;
    }
    return str;
}

module.exports = generate;

},{"./alphabet":7,"./random/random-byte":12,"nanoid/format":1}],10:[function(require,module,exports){
'use strict';

var alphabet = require('./alphabet');
var build = require('./build');
var isValid = require('./is-valid');

// if you are using cluster or multiple servers use this to make each instance
// has a unique value for worker
// Note: I don't know if this is automatically set when using third
// party cluster solutions such as pm2.
var clusterWorkerId = require('./util/cluster-worker-id') || 0;

/**
 * Set the seed.
 * Highly recommended if you don't want people to try to figure out your id schema.
 * exposed as shortid.seed(int)
 * @param seed Integer value to seed the random alphabet.  ALWAYS USE THE SAME SEED or you might get overlaps.
 */
function seed(seedValue) {
    alphabet.seed(seedValue);
    return module.exports;
}

/**
 * Set the cluster worker or machine id
 * exposed as shortid.worker(int)
 * @param workerId worker must be positive integer.  Number less than 16 is recommended.
 * returns shortid module so it can be chained.
 */
function worker(workerId) {
    clusterWorkerId = workerId;
    return module.exports;
}

/**
 *
 * sets new characters to use in the alphabet
 * returns the shuffled alphabet
 */
function characters(newCharacters) {
    if (newCharacters !== undefined) {
        alphabet.characters(newCharacters);
    }

    return alphabet.shuffled();
}

/**
 * Generate unique id
 * Returns string id
 */
function generate() {
  return build(clusterWorkerId);
}

// Export all other functions as properties of the generate function
module.exports = generate;
module.exports.generate = generate;
module.exports.seed = seed;
module.exports.worker = worker;
module.exports.characters = characters;
module.exports.isValid = isValid;

},{"./alphabet":7,"./build":8,"./is-valid":11,"./util/cluster-worker-id":14}],11:[function(require,module,exports){
'use strict';
var alphabet = require('./alphabet');

function isShortId(id) {
    if (!id || typeof id !== 'string' || id.length < 6 ) {
        return false;
    }

    var nonAlphabetic = new RegExp('[^' +
      alphabet.get().replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&') +
    ']');
    return !nonAlphabetic.test(id);
}

module.exports = isShortId;

},{"./alphabet":7}],12:[function(require,module,exports){
'use strict';

var crypto = typeof window === 'object' && (window.crypto || window.msCrypto); // IE 11 uses window.msCrypto

var randomByte;

if (!crypto || !crypto.getRandomValues) {
    randomByte = function(size) {
        var bytes = [];
        for (var i = 0; i < size; i++) {
            bytes.push(Math.floor(Math.random() * 256));
        }
        return bytes;
    };
} else {
    randomByte = function(size) {
        return crypto.getRandomValues(new Uint8Array(size));
    };
}

module.exports = randomByte;

},{}],13:[function(require,module,exports){
'use strict';

// Found this seed-based random generator somewhere
// Based on The Central Randomizer 1.3 (C) 1997 by Paul Houle (houle@msc.cornell.edu)

var seed = 1;

/**
 * return a random number based on a seed
 * @param seed
 * @returns {number}
 */
function getNextValue() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed/(233280.0);
}

function setSeed(_seed_) {
    seed = _seed_;
}

module.exports = {
    nextValue: getNextValue,
    seed: setSeed
};

},{}],14:[function(require,module,exports){
'use strict';

module.exports = 0;

},{}],15:[function(require,module,exports){
module.exports={
  "name": "app.hoodmode.co",
  "displayName": "Hoodmode",
  "version": "0.0.7",
  "description": "A sample Apache Cordova application that responds to the deviceready event.",
  "main": "index.js",
  "scripts": {
    "dev": "budo src/index.jsx --force-default-index --dir www --css index.css --watch-glob=www/index.css --live -- -t babelify"
  },
  "keywords": [
    "ecosystem:cordova"
  ],
  "author": "Apache Cordova Team",
  "license": "Apache-2.0",
  "dependencies": {
    "@babel/polyfill": "^7.8.3",
    "cordova-android": "^8.1.0",
    "cordova-ios": "^5.1.1",
    "cordova-plugin-statusbar": "^2.4.3",
    "preact": "^10.3.1"
  },
  "devDependencies": {
    "@babel/cli": "^7.8.3",
    "@babel/core": "^7.4.3",
    "@babel/plugin-proposal-class-properties": "^7.8.3",
    "@babel/plugin-transform-react-jsx": "^7.8.3",
    "@babel/preset-env": "^7.8.3",
    "babel-preset-preact": "^2.0.0",
    "babelify": "^10.0.0",
    "browserify": "^16.1.0",
    "budo": "^11.6.3",
    "cordova": "^9.0.0",
    "cordova-plugin-whitelist": "^1.3.4",
    "uglifyify": "^4.0.5",
    "shortid": "^2.2.15"
  },
  "cordova": {
    "plugins": {
      "cordova-plugin-whitelist": {},
      "cordova-plugin-statusbar": {}
    },
    "platforms": [
      "android",
      "ios"
    ]
  }
}
},{}],16:[function(require,module,exports){
"use strict";

require("preact/debug");

var _preact = require("preact");

var _App = _interopRequireDefault(require("./view/App.jsx"));

var _AppContext = _interopRequireDefault(require("./utils/AppContext.js"));

var _shortid = _interopRequireDefault(require("shortid"));

var _AppController = _interopRequireDefault(require("./model/AppController.js"));

var _AppHelper = _interopRequireDefault(require("./model/AppHelper.js"));

var _Conductor = _interopRequireDefault(require("./model/Conductor.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var conductor, appHelper, appController;

try {
  conductor = new _Conductor["default"]();
  appHelper = new _AppHelper["default"](conductor);
  appController = new _AppController["default"](conductor, appHelper);
} catch (e) {
  alert(e);
}

conductor.onPlayGridIndexChange = function (gridIndex, sequenceIndex) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = document.querySelectorAll(".current-beat")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _el2 = _step.value;

      _el2.classList.remove('current-beat');
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (gridIndex >= 0) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = document.querySelectorAll(".beat-" + gridIndex)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var el = _step2.value;
        el.classList.add('current-beat');
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = document.querySelectorAll(".current-sequence")[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _el3 = _step3.value;

      _el3.classList.remove('current-sequence');
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  if (gridIndex % 4 == 0 && sequenceIndex >= 0) {
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = document.querySelectorAll(".sequence-" + sequenceIndex)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var _el = _step4.value;

        _el.classList.add('current-sequence');
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
          _iterator4["return"]();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }
  }
};

function onStateChange(state) {
  conductor.setState(state);
  window.localStorage.setItem("hoodmode-songs", JSON.stringify(state.songs));
}

var appContext = (0, _preact.h)(_AppContext["default"], {
  controller: appController,
  helper: appHelper,
  initAction: "init",
  onStateChange: onStateChange
}, (0, _preact.h)(_App["default"], null));

function start() {
  (0, _preact.render)(appContext, document.body);
}

if (window.hasOwnProperty("cordova")) document.addEventListener('deviceready', start);else start();

},{"./model/AppController.js":17,"./model/AppHelper.js":18,"./model/Conductor.js":19,"./utils/AppContext.js":24,"./view/App.jsx":33,"preact":4,"preact/debug":2,"shortid":6}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _shortid = _interopRequireDefault(require("shortid"));

require("regenerator-runtime/runtime");

var _demosongs = _interopRequireDefault(require("./demosongs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AppController = /*#__PURE__*/function () {
  function AppController(conductor, helper) {
    _classCallCheck(this, AppController);

    this.conductor = conductor;
    this.helper = helper;
  }

  _createClass(AppController, [{
    key: "initState",
    value: function initState() {
      var state = {
        currentSongIndex: -1,
        currentLayerIndex: -1,
        currentChordIndex: 0,
        currentSectionIndex: -1,
        currentGridIndex: -1,
        settingsVisible: false,
        addLayerVisible: false,
        songs: [],
        instruments: [],
        playing: false,
        recording: false,
        editSectionChordVisible: -1,
        aboutScreenVisible: false
      };
      state.instruments.push({
        "key": "basic-drums",
        "type": "percussive",
        "name": "Drums",
        "labels": ["KICK", "KICK", "SNARE", "SNARE", "HI-HAT", "HI-HAT", "HI-HAT", "SHAKER", "CLAP"],
        "icon": "drum.svg",
        "icons": ["kick-drum.svg", "kick-drum.svg", "snare-drum.svg", "snare-drum.svg", "hi-hat.svg", "hi-hat.svg", "hi-hat.svg", "maracas.svg", "clap.svg"],
        "samples": ["samples/drums/yes-kick.mp3", "samples/drums/bad-kick.wav", "samples/drums/yes-snare.mp3", "samples/drums/bad-snare.wav", "samples/drums/bad-hihat.wav", "samples/drums/thrl-hat_A_minor.wav", "samples/drums/rock-hihat-tchik.wav", "samples/drums/Yamaha-RX15-Shaker.wav", "samples/drums/Roland-R-8-808-Clap.wav"]
      });
      state.instruments.push({
        "key": "basic-bass",
        "type": "harmonic",
        "name": "String Bass",
        "sample": "samples/Yamaha-EX5-Old-Strings-C2-edited.wav",
        "icon": "bass.svg"
      });
      state.instruments.push({
        "key": "basic-piano",
        "type": "harmonic",
        "name": "Piano",
        "sample": "samples/piano-c.wav",
        "icon": "piano.svg",
        "defaultVolume": 0.25
      });
      state.instruments.push({
        "key": "basic-organ",
        "type": "harmonic",
        "name": "Korg Organ",
        "sample": "samples/Korg-DW-8000-Organ-C3.wav",
        "icon": "organ.svg",
        "defaultVolume": 0.25
      });
      state.instruments.push({
        "key": "basic-clav",
        "type": "harmonic",
        "name": "Clav",
        "sample": "samples/Ensoniq-ESQ-1-Clav-Piano-C3.wav",
        "icon": "clav.svg",
        "defaultVolume": 0.75
      });
      state.instruments.push({
        "key": "basic-strings",
        "type": "harmonic",
        "name": "Strings",
        "sample": "samples/Yamaha-EX5-MellowStrngs-C4.wav",
        "icon": "violin.svg",
        "defaultVolume": 0.25
      });
      return state;
    }
  }, {
    key: "init",
    value: function () {
      var _init = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var state, songDataJson;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                state = this.initState();
                songDataJson = window.localStorage.getItem("hoodmode-songs");
                if (songDataJson) state.songs = JSON.parse(songDataJson);
                if (!state.songs || !state.songs.length) state.songs = _demosongs["default"];
                this.conductor.setState(state);
                _context.next = 7;
                return this.conductor.loadInstruments();

              case 7:
                return _context.abrupt("return", state);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "addSong",
    value: function addSong(state, name) {
      if (!name || name.toString() == "[object MouseEvent]") name = "My New Song";
      var index = state.songs.length;
      state.songs.push({
        name: name,
        bpm: 100,
        key: _shortid["default"].generate(),
        musicKey: "A",
        minor: true,
        layers: [],
        chordSequence: [],
        sections: [[0], [0], [0]]
      });
      state = this.setSongIndex(state, index);
      state = this.addSequenceChord(state);
      return state;
    }
  }, {
    key: "setCurrentChordIndex",
    value: function setCurrentChordIndex(state, index) {
      state.currentChordIndex = index;
      return state;
    }
  }, {
    key: "setCurrentSectionIndex",
    value: function setCurrentSectionIndex(state, index) {
      state.currentSectionIndex = index;
      return state;
    }
  }, {
    key: "closeSong",
    value: function closeSong(state) {
      state.currentSongIndex = -1;
      state.currentSectionIndex = -1;
      return state;
    }
  }, {
    key: "setSongIndex",
    value: function setSongIndex(state, index) {
      if (index == state.currentSongIndex) return state;
      state.currentSongIndex = index;
      state.currentLayerIndex = -1;
      state.currentChordIndex = 0;
      state.currentGridIndex = -1;
      state.currentSectionIndex = -1;
      state.playing = false;
      state.recording = false;
      var song = this.helper.getCurrentSong(state);

      for (var i = song.sections.length - 1; i >= 0; i--) {
        if (song.sections[i].length > 1) state.currentSectionIndex = i;
      }

      return state;
    }
  }, {
    key: "showSettings",
    value: function showSettings(state) {
      state.settingsVisible = true;
      return state;
    }
  }, {
    key: "hideSettings",
    value: function hideSettings(state) {
      state.settingsVisible = false;
      return state;
    }
  }, {
    key: "showAboutScreen",
    value: function showAboutScreen(state) {
      state.aboutScreenVisible = true;
      return state;
    }
  }, {
    key: "hideAboutScreen",
    value: function hideAboutScreen(state) {
      state.aboutScreenVisible = false;
      return state;
    }
  }, {
    key: "toggleSettings",
    value: function toggleSettings(state) {
      state.settingsVisible = !state.settingsVisible;
      return state;
    }
  }, {
    key: "setCurrentSongName",
    value: function setCurrentSongName(state, name) {
      state.songs[state.currentSongIndex].name = name;
      return state;
    }
  }, {
    key: "setCurrentSongBpm",
    value: function setCurrentSongBpm(state, bpm) {
      bpm = parseInt(bpm);
      if (isNaN(bpm)) bpm = 100;
      if (bpm < 50) bpm = 50;
      if (bpm > 200) bpm = 200;
      state.songs[state.currentSongIndex].bpm = bpm;
      return state;
    }
  }, {
    key: "setCurrentSongMusicKey",
    value: function setCurrentSongMusicKey(state, musicKey) {
      state.songs[state.currentSongIndex].musicKey = musicKey;
      return state;
    }
  }, {
    key: "setCurrentSongMinor",
    value: function setCurrentSongMinor(state, minor) {
      state.songs[state.currentSongIndex].minor = minor;
      return state;
    }
  }, {
    key: "confirmDeleteCurrentSong",
    value: function confirmDeleteCurrentSong(state) {
      state.songs.splice(state.currentSongIndex, 1);
      state.currentSongIndex = -1;
      state.settingsVisible = false;
      state.currentSectionIndex = -1;
      return state;
    }
  }, {
    key: "deleteCurrentSong",
    value: function deleteCurrentSong(state) {
      state.dialogText = "Sure you want to delete the song?";
      state.dialogAction = "confirmDeleteCurrentSong";
      return state;
    }
  }, {
    key: "confirmDialog",
    value: function confirmDialog(state) {
      state = this[state.dialogAction](state);
      state.dialogText = null;
      state.dialogAction = null;
      state.dialogData = null;
      return state;
    }
  }, {
    key: "cancelDialog",
    value: function cancelDialog(state) {
      state.dialogText = null;
      state.dialogAction = null;
      state.dialogData = null;
      return state;
    }
  }, {
    key: "showAddLayer",
    value: function showAddLayer(state) {
      state.addLayerVisible = true;
      return state;
    }
  }, {
    key: "hideAddLayer",
    value: function hideAddLayer(state) {
      state.addLayerVisible = false;
      return state;
    }
  }, {
    key: "addSequenceChord",
    value: function addSequenceChord(state) {
      var song = this.helper.getCurrentSong(state);
      song.chordSequence.push({
        chordIndex: 0,
        key: _shortid["default"].generate()
      });
      return state;
    }
  }, {
    key: "addLayer",
    value: function addLayer(state, instrumentKey) {
      var song = state.songs[state.currentSongIndex];
      var seq = [];
      var numSounds = this.helper.getInstrumentNumSoundsByKey(state, instrumentKey);
      var instrument = this.helper.getInstrumentByKey(state, instrumentKey);
      var volume = 1;
      if (instrument.hasOwnProperty("defaultVolume")) volume = instrument.defaultVolume;

      for (var i = 0; i < 16; i++) {
        seq.push({
          sounds: [],
          vel: 1,
          stacc: false
        });
      }

      var layer = {
        key: _shortid["default"].generate(),
        instrumentKey: instrumentKey,
        audible: true,
        volume: volume,
        seq: seq
      };
      song.layers.push(layer);
      state.addLayerVisible = false;
      return state;
    }
  }, {
    key: "setLayerIndex",
    value: function setLayerIndex(state, index) {
      var song = this.helper.getCurrentSong(state);

      if (!this.helper.instrumentExists(state, song.layers[index].instrumentKey)) {
        state.dialogText = "Layer is broken, delete?";
        state.dialogAction = "deleteDialogLayer";
        state.dialogData = index;
        return state;
      }

      state.currentLayerIndex = index;
      return state;
    }
  }, {
    key: "hideCurrentLayer",
    value: function hideCurrentLayer(state) {
      state.currentLayerIndex = -1;
      state.currentGridIndex = -1;
      return state;
    }
  }, {
    key: "toggleLayerAudible",
    value: function toggleLayerAudible(state, layerIndex) {
      var song = this.helper.getCurrentSong(state);
      song.layers[layerIndex].audible = !song.layers[layerIndex].audible;
      return state;
    }
  }, {
    key: "deleteDialogLayer",
    value: function deleteDialogLayer(state) {
      var song = this.helper.getCurrentSong(state);
      song.layers.splice(state.dialogData, 1);
      state.currentLayerIndex = -1;
      state.currentGridIndex = -1;
      state.settingsVisible = false;
      return state;
    }
  }, {
    key: "deleteCurrentLayer",
    value: function deleteCurrentLayer(state) {
      var song = this.helper.getCurrentSong(state);
      song.layers.splice(state.currentLayerIndex, 1);
      state.currentLayerIndex = -1;
      state.currentGridIndex = -1;
      state.settingsVisible = false;
      return state;
    }
  }, {
    key: "setCurrentLayerVolume",
    value: function setCurrentLayerVolume(state, volume) {
      var layer = this.helper.getCurrentLayer(state);
      layer.volume = parseFloat(volume);
      return state;
    }
  }, {
    key: "playClick",
    value: function playClick(state) {
      state.playing = !state.playing;
      state.currentGridIndex = -1;
      if (!state.playing) state.recording = false;
      return state;
    }
  }, {
    key: "recordClick",
    value: function recordClick(state) {
      state.recording = !state.recording;
      state.currentGridIndex = -1;
      if (state.recording && !state.playing) state.playing = true;
      if (!state.playing) state.currentGridIndex = -1;
      return state;
    }
  }, {
    key: "deleteSequenceChord",
    value: function deleteSequenceChord(state, index) {
      var song = this.helper.getCurrentSong(state);
      song.chordSequence.splice(index, 1);
      return state;
    }
  }, {
    key: "setSequenceChord",
    value: function setSequenceChord(state, sequenceIndex, chordIndex) {
      var song = this.helper.getCurrentSong(state);
      song.chordSequence[sequenceIndex].chordIndex = chordIndex;
      return state;
    }
  }, {
    key: "goBack",
    value: function goBack(state) {
      if (state.settingsVisible) return this.hideSettings(state);else if (state.currentLayerIndex >= 0) {
        state.currentLayerIndex = -1;
        state.currentGridIndex = -1;
        return state;
      } else if (state.addLayerVisible) return this.hideAddLayer(state);else if (this.helper.isSongOpen(state)) return this.closeSong(state);
      return state;
    }
  }, {
    key: "gridIndexClick",
    value: function gridIndexClick(state, newGridIndex) {
      state.playing = false;
      state.recording = false;
      if (state.currentGridIndex == newGridIndex) state.currentGridIndex = -1;else state.currentGridIndex = newGridIndex;
      return state;
    }
  }, {
    key: "toggleCurrentLayerStacc",
    value: function toggleCurrentLayerStacc(state) {
      var layer = this.helper.getCurrentLayer(state);
      var gridIndex = state.currentGridIndex;
      if (state.recording) gridIndex = this.conductor.getPlayGridIndex();
      if (gridIndex < 0) return state;
      layer.seq[gridIndex].stacc = !layer.seq[gridIndex].stacc;
      if (layer.seq[gridIndex].stacc) layer.seq[gridIndex].sounds = [];
      return state;
    }
  }, {
    key: "setCurrentLayerVel",
    value: function setCurrentLayerVel(state, vel) {
      var layer = this.helper.getCurrentLayer(state);
      var gridIndex = state.currentGridIndex;
      if (state.recording) gridIndex = this.conductor.getPlayGridIndex();
      if (gridIndex < 0) return state;
      layer.seq[gridIndex].vel = vel;
      return state;
    }
  }, {
    key: "setGridSound",
    value: function setGridSound(state, gridIndex, soundIndex, enabled) {
      var layer = this.helper.getCurrentLayer(state);
      var currentEnabled = layer.seq[gridIndex].sounds.includes(soundIndex);
      if (enabled == currentEnabled) return state;

      if (enabled) {
        layer.seq[gridIndex].sounds.push(soundIndex);
        layer.seq[gridIndex].stacc = false;
      } else {
        layer.seq[gridIndex].sounds.splice(layer.seq[gridIndex].sounds.indexOf(soundIndex), 1);
      }

      return state;
    }
  }, {
    key: "setCurrentGridSound",
    value: function setCurrentGridSound(state, soundIndex, enabled) {
      return this.setGridSound(state, state.currentGridIndex, soundIndex, enabled);
    }
  }, {
    key: "soundButtonClick",
    value: function soundButtonClick(state, soundIndex) {
      if (state.recording) {
        this.conductor.playLayerInstrument(soundIndex);
        var gridIndex = this.conductor.getPlayGridIndex();
        state = this.setGridSound(state, gridIndex, soundIndex, true);
        return state;
      }

      if (state.currentGridIndex < 0) {
        this.conductor.playLayerInstrument(soundIndex);
        return state;
      }

      var layer = this.helper.getCurrentLayer(state);
      var enabled = layer.seq[state.currentGridIndex].sounds.includes(soundIndex);
      state = this.setCurrentGridSound(state, soundIndex, !enabled);
      if (layer.seq[state.currentGridIndex].sounds.includes(soundIndex)) this.conductor.playLayerInstrument(soundIndex);
      return state;
    }
  }, {
    key: "chordButtonClick",
    value: function chordButtonClick(state, octave) {
      var instrument = this.helper.getCurrentInstrument(state);

      if (state.recording) {
        this.conductor.playLayerInstrument(octave * 3);
        this.conductor.playLayerInstrument(octave * 3 + 1);
        this.conductor.playLayerInstrument(octave * 3 + 2);
        var gridIndex = this.conductor.getPlayGridIndex();
        state = this.setGridSound(state, gridIndex, octave * 3, true);
        state = this.setGridSound(state, gridIndex, octave * 3 + 1, true);
        state = this.setGridSound(state, gridIndex, octave * 3 + 2, true);
        return state;
      }

      if (state.currentGridIndex < 0) {
        this.conductor.playLayerInstrument(octave * 3);
        this.conductor.playLayerInstrument(octave * 3 + 1);
        this.conductor.playLayerInstrument(octave * 3 + 2);
        return state;
      }

      var layer = this.helper.getCurrentLayer(state);

      if (this.helper.currentLayerHasChordAt(state, state.currentGridIndex, octave)) {
        state = this.setCurrentGridSound(state, octave * 3, false);
        state = this.setCurrentGridSound(state, octave * 3 + 1, false);
        state = this.setCurrentGridSound(state, octave * 3 + 2, false);
      } else {
        state = this.setCurrentGridSound(state, octave * 3, true);
        state = this.setCurrentGridSound(state, octave * 3 + 1, true);
        state = this.setCurrentGridSound(state, octave * 3 + 2, true);
        this.conductor.playLayerInstrument(octave * 3);
        this.conductor.playLayerInstrument(octave * 3 + 1);
        this.conductor.playLayerInstrument(octave * 3 + 2);
      }

      return state;
    }
  }, {
    key: "addSectionChord",
    value: function addSectionChord(state) {
      var song = this.helper.getCurrentSong(state);
      song.sections[state.currentSectionIndex].push(0);
      return state;
    }
  }, {
    key: "showEditSectionChord",
    value: function showEditSectionChord(state, index) {
      state.editSectionChordVisible = index;
      return state;
    }
  }, {
    key: "hideEditSectionChord",
    value: function hideEditSectionChord(state, index) {
      state.editSectionChordVisible = -1;
      return state;
    }
  }, {
    key: "removeSectionChord",
    value: function removeSectionChord(state) {
      var song = this.helper.getCurrentSong(state);
      song.sections[state.currentSectionIndex].splice(state.editSectionChordVisible, 1);
      state.editSectionChordVisible = -1;
      return state;
    }
  }, {
    key: "editSectionChord",
    value: function editSectionChord(state, index) {
      var song = this.helper.getCurrentSong(state);
      song.sections[state.currentSectionIndex][state.editSectionChordVisible] = index;
      state.editSectionChordVisible = -1;
      return state;
    }
  }]);

  return AppController;
}();

exports["default"] = AppController;

},{"./demosongs":23,"regenerator-runtime/runtime":5,"shortid":6}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _MusicUtil = _interopRequireDefault(require("../utils/MusicUtil.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var appPackage = require("../../package.json"); //const appPackage={version: "abc"};


var AppHelper = /*#__PURE__*/function () {
  function AppHelper(conductor) {
    _classCallCheck(this, AppHelper);

    this.conductor = conductor;
  }

  _createClass(AppHelper, [{
    key: "getAppVersion",
    value: function getAppVersion() {
      return appPackage.version;
    }
  }, {
    key: "getCurrentSong",
    value: function getCurrentSong(state) {
      return state.songs[state.currentSongIndex];
    }
  }, {
    key: "getCurrentLayer",
    value: function getCurrentLayer(state) {
      return state.songs[state.currentSongIndex].layers[state.currentLayerIndex];
    }
  }, {
    key: "instrumentExists",
    value: function instrumentExists(state, key) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = state.instruments[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var instrument = _step.value;
          if (instrument.key == key) return true;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return false;
    }
  }, {
    key: "getInstrumentByKey",
    value: function getInstrumentByKey(state, key) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = state.instruments[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var instrument = _step2.value;
          if (instrument.key == key) return instrument;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: "getInstrumentIconByKey",
    value: function getInstrumentIconByKey(state, key) {
      var instrument = this.getInstrumentByKey(state, key);
      if (!instrument) return "broken.svg";
      return instrument.icon;
    }
  }, {
    key: "getInstrumentNumSoundsByKey",
    value: function getInstrumentNumSoundsByKey(state, key) {
      var instrument = this.getInstrumentByKey(state, key);

      switch (instrument.type) {
        case "harmonic":
          return 9;

        case "percussive":
          return instrument.labels.length;
      }
    }
  }, {
    key: "getCurrentInstrument",
    value: function getCurrentInstrument(state) {
      var layer = this.getCurrentLayer(state);
      return this.getInstrumentByKey(state, layer.instrumentKey);
    }
  }, {
    key: "getCurrentInstrumentSoundLabels",
    value: function getCurrentInstrumentSoundLabels(state) {
      var instrument = this.getCurrentInstrument(state);

      switch (instrument.type) {
        case "harmonic":
          return ["T1", "T2", "T3", "O-T1", "O-T2", "O-T3"];

        case "percussive":
          return instrument.labels;
      }
    }
  }, {
    key: "getChordLabels",
    value: function getChordLabels(state) {
      var song = this.getCurrentSong(state);
      return _MusicUtil["default"].getChordNamesForScale(song.musicKey, song.minor);
    }
  }, {
    key: "getCurrentSectionChordLabels",
    value: function getCurrentSectionChordLabels(state) {
      var song = this.getCurrentSong(state);

      var chordNames = _MusicUtil["default"].getChordNamesForScale(song.musicKey, song.minor);

      var section = song.sections[state.currentSectionIndex];
      var a = [];
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = section[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var i = _step3.value;
          a.push(chordNames[i]);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return a;
    }
  }, {
    key: "getNotesSelectOptions",
    value: function getNotesSelectOptions(state) {
      var a = [];
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = _MusicUtil["default"].NOTE_NAMES[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var noteName = _step4.value;
          a.push({
            key: noteName,
            label: noteName
          });
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return a;
    }
  }, {
    key: "getChordOptions",
    value: function getChordOptions(state) {
      var song = this.getCurrentSong(state);

      var chordNames = _MusicUtil["default"].getChordNamesForScale(song.musicKey, song.minor);

      var a = [];
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = chordNames[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var chordName = _step5.value;
          a.push({
            key: chordName,
            label: chordName
          });
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
            _iterator5["return"]();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      return a;
    }
  }, {
    key: "getModalSelectOptions",
    value: function getModalSelectOptions(state) {
      return [{
        key: false,
        label: "major"
      }, {
        key: true,
        label: "minor"
      }];
    }
  }, {
    key: "currentLayerHasSoundAt",
    value: function currentLayerHasSoundAt(state, gridIndex) {
      var layer = this.getCurrentLayer(state);
      if (layer.seq[gridIndex].sounds.length > 0) return true;
      return false;
    }
  }, {
    key: "currentLayerHasChordAt",
    value: function currentLayerHasChordAt(state, gridIndex, octave) {
      var layer = this.getCurrentLayer(state);

      for (var i = 0; i < 3; i++) {
        if (!layer.seq[gridIndex].sounds.includes(octave * 3 + i)) return false;
      }

      return true;
    }
  }, {
    key: "isSongOpen",
    value: function isSongOpen(state) {
      return state.currentSongIndex >= 0;
    }
  }]);

  return AppHelper;
}();

exports["default"] = AppHelper;

},{"../../package.json":15,"../utils/MusicUtil.js":27}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _AudioUtil = _interopRequireDefault(require("../utils/AudioUtil"));

var _ReconcileArray = _interopRequireDefault(require("../utils/ReconcileArray"));

var _ConductorLayer = _interopRequireDefault(require("./ConductorLayer"));

var _ConductorInstrument = _interopRequireDefault(require("./ConductorInstrument"));

var _MusicUtil = _interopRequireDefault(require("../utils/MusicUtil"));

var _AudioTimer = _interopRequireDefault(require("../utils/AudioTimer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Conductor = /*#__PURE__*/function () {
  function Conductor() {
    var _this = this;

    _classCallCheck(this, Conductor);

    _defineProperty(this, "createLayer", function (data) {
      return new _ConductorLayer["default"](_this, data);
    });

    _defineProperty(this, "createInstrument", function (data) {
      return new _ConductorInstrument["default"](_this, data);
    });

    _defineProperty(this, "onPlayTick", function (tickIndex) {
      var song = _this.getCurrentSong();

      var barIndex = Math.floor(tickIndex / 16);
      var gridIndex = tickIndex % 16;
      _this.playGridIndex = gridIndex;

      if (gridIndex == 0 && _this.playingSequenceIndex >= 0) {
        _this.playingSequenceChordIndex++;
        if (_this.playingSequenceChordIndex >= song.sections[_this.playingSequenceIndex].length) _this.playingSequenceChordIndex = 0;
      }

      if (barIndex == 0 && tickIndex == 0) {
        var cents = _this.getCurrentChordCents();

        if (_this.playingSequenceIndex >= 0) {
          var i = _this.playingSequenceChordIndex;
          cents = _this.getChordCents(song.sections[_this.playingSequenceIndex][i]);
        }

        _this.playBar(_this.audioTimer.startTime, cents);
      }

      if (gridIndex == 15) {
        var _cents = _this.getCurrentChordCents();

        if (_this.playingSequenceIndex >= 0) {
          var _i = _this.playingSequenceChordIndex;
          _i = (_i + 1) % song.sections[_this.playingSequenceIndex].length;
          _cents = _this.getChordCents(song.sections[_this.playingSequenceIndex][_i]);
        }

        _this.playBar(_this.audioTimer.startTime + (barIndex + 1) * _this.getSecPerBar(), _cents);
      }

      if (_this.onPlayGridIndexChange) _this.onPlayGridIndexChange(gridIndex, _this.playingSequenceChordIndex);
    });

    _defineProperty(this, "play", function () {
      var song = _this.getCurrentSong();

      _this.playBpm = song.bpm;
      _this.playingSequenceIndex = _this.state.currentSectionIndex;
      _this.playingSequenceChordIndex = -1;

      _this.audioTimer.setStartTime(_this.audioContext.currentTime);

      _this.audioTimer.setTickInterval(_this.getSecPerGrid());

      _this.audioTimer.start();
    });

    _defineProperty(this, "setState", function (state) {
      _this.state = state;

      _this.instruments.setData(state.instruments);

      if (_this.getCurrentSong()) {
        _this.layers.setData(_this.getCurrentSong().layers);

        if (state.playing && !_this.isPlaying()) _this.play();else if (!state.playing && _this.isPlaying()) _this.stop();

        if (_this.isPlaying() && _this.playBpm != _this.getCurrentSong().bpm) {
          _this.stop();

          _this.play();
        }
      } else {
        _this.stop();

        _this.layers.setData([]);
      }

      if (state.currentSectionIndex < 0) {
        _this.playingSequenceIndex = -1;
        _this.playingSequenceChordIndex = -1;

        var currentChordCents = _this.getCurrentChordCents();

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = _this.currentNotes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var note = _step.value;
            note.setChordCents(currentChordCents);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      } else if (state.currentSectionIndex != _this.playingSequenceIndex) {
        _this.playingSequenceIndex = state.currentSectionIndex;
        _this.playingSequenceChordIndex = -1;
      }
    });

    var AudioContext = window.AudioContext;
    if (!AudioContext) AudioContext = window.webkitAudioContext;
    if (!AudioContext) throw new Error("no web audio!");
    this.audioContext = new AudioContext();
    this.audioTimer = new _AudioTimer["default"](this.audioContext);
    this.audioTimer.onTick = this.onPlayTick;
    this.instruments = _ReconcileArray["default"].createWithFactory(this.createInstrument);
    this.layers = _ReconcileArray["default"].createWithFactory(this.createLayer);
    this.currentNotes = [];
    this.playingSequenceIndex = -1;
    this.playingSequenceChordIndex = -1;
  }

  _createClass(Conductor, [{
    key: "loadInstruments",
    value: function loadInstruments() {
      var promises = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.instruments.getItems()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var instrument = _step2.value;
          promises.push(instrument.load());
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return Promise.all(promises);
    }
  }, {
    key: "getConductorInstrumentByKey",
    value: function getConductorInstrumentByKey(key) {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.instruments.getItems()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var instrument = _step3.value;
          if (instrument.getKey() == key) return instrument;
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  }, {
    key: "getCurrentConductorLayer",
    value: function getCurrentConductorLayer() {
      var state = this.state;
      var key = state.songs[state.currentSongIndex].layers[state.currentLayerIndex].key;
      return this.layers.getItemByKey(key);
    }
  }, {
    key: "playLayerInstrument",
    value: function playLayerInstrument(soundIndex) {
      var layer = this.getCurrentConductorLayer();

      if (layer.instrument) {
        var note = layer.instrument.createNote(soundIndex);
        note.setChordCents(this.getCurrentChordCents());
        note.connect(layer.destination);
        note.playNow();
      }
    }
  }, {
    key: "getCurrentSong",
    value: function getCurrentSong() {
      return this.state.songs[this.state.currentSongIndex];
    }
  }, {
    key: "getChordCents",
    value: function getChordCents(chordIndex) {
      var song = this.getCurrentSong();
      if (!song || chordIndex < 0) return [0, 0, 0];

      var scaleChordNotes = _MusicUtil["default"].getChordNotesForScale(song.musicKey, song.minor);

      var chordNotes = scaleChordNotes[chordIndex];
      return [_MusicUtil["default"].noteToCents(chordNotes[0]), _MusicUtil["default"].noteToCents(chordNotes[1]), _MusicUtil["default"].noteToCents(chordNotes[2])];
    }
  }, {
    key: "getCurrentChordCents",
    value: function getCurrentChordCents() {
      return this.getChordCents(this.state.currentChordIndex);
    }
  }, {
    key: "onNoteEnded",
    value: function onNoteEnded(note) {
      var idx = this.currentNotes.indexOf(note);
      if (idx < 0) return;
      this.currentNotes.splice(idx, 1);
    }
  }, {
    key: "getSecPerGrid",
    value: function getSecPerGrid() {
      var secPerBeat = 60 / this.getCurrentSong().bpm;
      var secPerGrid = secPerBeat / 4;
      return secPerGrid;
    }
  }, {
    key: "getSecPerBar",
    value: function getSecPerBar() {
      return this.getSecPerGrid() * 16;
    }
  }, {
    key: "playGridSlice",
    value: function playGridSlice(at, gridIndex, chordCents) {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.layers.getItems()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var layer = _step4.value;
          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (var _iterator5 = layer.data.seq[gridIndex].sounds[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              var soundIndex = _step5.value;

              if (layer.instrument) {
                var note = layer.instrument.createNote(soundIndex);
                note.connect(layer.destination);
                note.setChordCents(chordCents);
                note.playSheduled(at, layer.getNoteLen(gridIndex) * this.getSecPerGrid());
                note.setVelocity(layer.data.seq[gridIndex].vel);
                note.onended = this.onNoteEnded.bind(this, note);
                this.currentNotes.push(note);
              }
            }
          } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
                _iterator5["return"]();
              }
            } finally {
              if (_didIteratorError5) {
                throw _iteratorError5;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    }
  }, {
    key: "playBar",
    value: function playBar(at, chordCents) {
      for (var gridIndex = 0; gridIndex < 16; gridIndex++) {
        this.playGridSlice(at + gridIndex * this.getSecPerGrid(), gridIndex, chordCents);
      }
    }
  }, {
    key: "getPlayGridIndex",
    value: function getPlayGridIndex() {
      if (!this.isPlaying()) return -1;
      return this.playGridIndex;
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this.onPlayGridIndexChange) this.onPlayGridIndexChange(-1, -1);
      this.playBpm = 0;
      this.audioTimer.stop();
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = this.currentNotes[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var note = _step6.value;
          note.setVelocity(0);
          note.onended = null;
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
            _iterator6["return"]();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      this.currentNotes = [];
    }
  }, {
    key: "isPlaying",
    value: function isPlaying() {
      return this.audioTimer.isRunning();
    }
  }]);

  return Conductor;
}();

exports["default"] = Conductor;

},{"../utils/AudioTimer":25,"../utils/AudioUtil":26,"../utils/MusicUtil":27,"../utils/ReconcileArray":29,"./ConductorInstrument":20,"./ConductorLayer":21}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _AudioUtil = _interopRequireDefault(require("../utils/AudioUtil"));

var _MusicUtil = _interopRequireDefault(require("../utils/MusicUtil"));

var _ConductorNote = _interopRequireDefault(require("./ConductorNote"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ConductorInstrument = /*#__PURE__*/function () {
  function ConductorInstrument(conductor, data) {
    _classCallCheck(this, ConductorInstrument);

    this.conductor = conductor;
    this.data = data;
  }

  _createClass(ConductorInstrument, [{
    key: "getKey",
    value: function getKey() {
      return this.data.key;
    }
  }, {
    key: "load",
    value: function () {
      var _load = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var url, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _url;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.t0 = this.data.type;
                _context.next = _context.t0 === "harmonic" ? 3 : _context.t0 === "percussive" ? 8 : 39;
                break;

              case 3:
                url = this.data.sample;
                _context.next = 6;
                return _AudioUtil["default"].loadBuffer(url, this.conductor.audioContext);

              case 6:
                this.buffer = _context.sent;
                return _context.abrupt("break", 39);

              case 8:
                this.buffers = [];
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 12;
                _iterator = this.data.samples[Symbol.iterator]();

              case 14:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 24;
                  break;
                }

                _url = _step.value;
                _context.t1 = this.buffers;
                _context.next = 19;
                return _AudioUtil["default"].loadBuffer(_url, this.conductor.audioContext);

              case 19:
                _context.t2 = _context.sent;

                _context.t1.push.call(_context.t1, _context.t2);

              case 21:
                _iteratorNormalCompletion = true;
                _context.next = 14;
                break;

              case 24:
                _context.next = 30;
                break;

              case 26:
                _context.prev = 26;
                _context.t3 = _context["catch"](12);
                _didIteratorError = true;
                _iteratorError = _context.t3;

              case 30:
                _context.prev = 30;
                _context.prev = 31;

                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }

              case 33:
                _context.prev = 33;

                if (!_didIteratorError) {
                  _context.next = 36;
                  break;
                }

                throw _iteratorError;

              case 36:
                return _context.finish(33);

              case 37:
                return _context.finish(30);

              case 38:
                return _context.abrupt("break", 39);

              case 39:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[12, 26, 30, 38], [31,, 33, 37]]);
      }));

      function load() {
        return _load.apply(this, arguments);
      }

      return load;
    }()
  }, {
    key: "update",
    value: function update(data) {}
  }, {
    key: "finalize",
    value: function finalize() {}
  }, {
    key: "createNote",
    value: function createNote(soundIndex) {
      switch (this.data.type) {
        case "harmonic":
          var note = new _ConductorNote["default"](this.conductor, this.buffer, soundIndex);
          if (this.data.sampleNote) note.setSampleNoteCents(_MusicUtil["default"].noteToCents(this.data.sampleNote));
          return note;
          break;

        case "percussive":
          return new _ConductorNote["default"](this.conductor, this.buffers[soundIndex]);
          break;
      }
    }
  }]);

  return ConductorInstrument;
}();

exports["default"] = ConductorInstrument;

},{"../utils/AudioUtil":26,"../utils/MusicUtil":27,"./ConductorNote":22}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ConductorLayer = /*#__PURE__*/function () {
  function ConductorLayer(conductor, data) {
    _classCallCheck(this, ConductorLayer);

    this.conductor = conductor;
    this.data = data;
    this.instrument = this.conductor.getConductorInstrumentByKey(data.instrumentKey);
    /*if (!this.instrument)
    	throw new Error("There is no instrument!!!");*/

    this.gain = this.conductor.audioContext.createGain();
    this.gain.connect(this.conductor.audioContext.destination);
    this.updateGain();
    this.destination = this.gain;
  }

  _createClass(ConductorLayer, [{
    key: "update",
    value: function update(data) {
      this.data = data;
      this.updateGain();
    }
  }, {
    key: "finalize",
    value: function finalize() {
      this.gain.disconnect();
    }
  }, {
    key: "updateGain",
    value: function updateGain() {
      if (this.data.audible || this.data.index == this.conductor.state.currentLayerIndex) this.gain.gain.value = this.data.volume;else this.gain.gain.value = 0;
    }
  }, {
    key: "hasSoundAt",
    value: function hasSoundAt(pos) {
      if (this.data.seq[pos].sounds.length > 0) return true;
      return false;
    }
  }, {
    key: "getNoteLen",
    value: function getNoteLen(pos) {
      for (var i = 1; i < this.data.seq.length; i++) {
        if (this.hasSoundAt((pos + i) % 16) || this.data.seq[(pos + i) % 16].stacc) return i;
      }

      return 16;
    }
  }]);

  return ConductorLayer;
}();

exports["default"] = ConductorLayer;

},{}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _MusicUtil = _interopRequireDefault(require("../utils/MusicUtil"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ConductorNote = /*#__PURE__*/function () {
  function ConductorNote(conductor, buffer, chordNote) {
    var _this = this;

    _classCallCheck(this, ConductorNote);

    this.conductor = conductor;
    this.buffer = buffer;
    this.gain = this.conductor.audioContext.createGain();
    this.source = this.conductor.audioContext.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.connect(this.gain);

    this.source.onended = function () {
      _this.gain.disconnect();

      if (_this.onended) _this.onended(_this);
    };

    this.chordNote = chordNote;
    this.chordCents = [0, 100, 200];
    this.sampleNoteCents = 0;
    this.updateDetune();
  }

  _createClass(ConductorNote, [{
    key: "connect",
    value: function connect(destination) {
      this.isConnected = true;
      this.gain.connect(destination);
    }
  }, {
    key: "setSampleNoteCents",
    value: function setSampleNoteCents(cents) {
      this.sampleNoteCents = cents;
      this.updateDetune();
    }
  }, {
    key: "setChordCents",
    value: function setChordCents(chordCents) {
      this.chordCents = chordCents;
      this.updateDetune();
    }
  }, {
    key: "playNow",
    value: function playNow() {
      if (!this.isConnected) throw new Error("note not connected!");
      this.source.start();
    }
  }, {
    key: "playSheduled",
    value: function playSheduled(at, duration) {
      if (!this.isConnected) throw new Error("note not connected!");
      this.source.start(at);
      this.source.stop(at + duration);
    }
  }, {
    key: "updateDetune",
    value: function updateDetune() {
      var cents;
      if (this.chordNote == undefined) cents = 0;else cents = _MusicUtil["default"].OCTAVE_CENTS * (Math.floor(this.chordNote / 3) - 1) + this.chordCents[this.chordNote % 3] - this.sampleNoteCents;
      if (this.source.detune) this.source.detune.value = cents;else this.source.playbackRate.value = _MusicUtil["default"].rateFromCents(cents);
    }
  }, {
    key: "setVelocity",
    value: function setVelocity(vel) {
      this.gain.gain.value = vel;
    }
  }]);

  return ConductorNote;
}();

exports["default"] = ConductorNote;

},{"../utils/MusicUtil":27}],23:[function(require,module,exports){
"use strict";

module.exports = [{
  "name": "Summerdemo",
  "bpm": 100,
  "key": "HxwY6vaPh",
  "musicKey": "G",
  "minor": true,
  "layers": [{
    "key": "dUG8FJ4pN",
    "instrumentKey": "basic-drums",
    "audible": true,
    "volume": 1,
    "seq": [{
      "sounds": [0],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [7],
      "vel": 0.25,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [0],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 0.5,
      "stacc": false
    }, {
      "sounds": [5],
      "vel": 0.5,
      "stacc": false
    }, {
      "sounds": [7],
      "vel": 0.25,
      "stacc": false
    }, {
      "sounds": [0],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [7],
      "vel": 0.25,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [8],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [5],
      "vel": 0.5,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [7],
      "vel": 0.25,
      "stacc": false
    }],
    "index": "0"
  }, {
    "key": "JPsgSsHBe",
    "instrumentKey": "basic-bass",
    "audible": true,
    "volume": 1,
    "seq": [{
      "sounds": [0],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": true
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [0],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": true
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [2],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }],
    "index": "1"
  }, {
    "key": "cwYIn2xpD",
    "instrumentKey": "basic-piano",
    "audible": true,
    "volume": 0.15,
    "seq": [{
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [3, 4, 5],
      "vel": 0.5,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 0.5,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 0.25,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [3, 4, 5],
      "vel": 0.5,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [3, 4, 5],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [3, 4, 5],
      "vel": 0.25,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }],
    "index": "2"
  }, {
    "key": "bW6UZfFVS",
    "instrumentKey": "basic-organ",
    "audible": true,
    "volume": 0.44,
    "seq": [{
      "sounds": [0],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [3, 4, 5],
      "vel": 0.5,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": true
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }],
    "index": "3"
  }, {
    "key": "P_3HCSjAg",
    "instrumentKey": "basic-clav",
    "audible": true,
    "volume": 0.69,
    "seq": [{
      "sounds": [],
      "vel": 0.25,
      "stacc": true
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 0.5,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 0.25,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 0.5,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 0.5,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 0.25,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 0.25,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [1],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [2],
      "vel": 0.5,
      "stacc": false
    }, {
      "sounds": [0],
      "vel": 1,
      "stacc": false
    }],
    "index": "4"
  }, {
    "key": "CJAtgzqly",
    "instrumentKey": "basic-piano",
    "audible": true,
    "volume": 0.11,
    "seq": [{
      "sounds": [6, 7, 8],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": true
    }, {
      "sounds": [6, 7, 8],
      "vel": 0.5,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": true
    }, {
      "sounds": [6, 7, 8],
      "vel": 0.5,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": true
    }, {
      "sounds": [6, 7, 8],
      "vel": 0.25,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": true
    }, {
      "sounds": [6, 7, 8],
      "vel": 0.5,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": true
    }, {
      "sounds": [6, 7, 8],
      "vel": 0.5,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": true
    }, {
      "sounds": [6, 7, 8],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": true
    }, {
      "sounds": [6, 7, 8],
      "vel": 0.25,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": true
    }],
    "index": "5"
  }],
  "chordSequence": [{
    "chordIndex": 0,
    "key": "Mjh3GYwkZg"
  }],
  "sections": [[0, 0, 4, 0, 3, 3, 4, 4], [2, 6, 5, 0], [0, 0, 0, 0, 3, 3, 0, 0, 4, 3, 0, 0]]
}, {
  "name": "Boystrings",
  "bpm": 100,
  "key": "KPc5mxeRG",
  "musicKey": "C",
  "minor": false,
  "layers": [{
    "key": "iAfBtVAkb",
    "instrumentKey": "basic-strings",
    "audible": true,
    "volume": 0.13,
    "seq": [{
      "sounds": [0, 1, 2],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }],
    "index": "0"
  }, {
    "key": "8gIRU6JI9",
    "instrumentKey": "basic-bass",
    "audible": true,
    "volume": 1,
    "seq": [{
      "sounds": [3],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [2],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [1],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }],
    "index": "1"
  }, {
    "key": "JHQZbxqXH",
    "instrumentKey": "basic-piano",
    "audible": true,
    "volume": 0.25,
    "seq": [{
      "sounds": [0, 1, 2],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }],
    "index": "2"
  }, {
    "key": "uRJpZq3so",
    "instrumentKey": "basic-drums",
    "audible": true,
    "volume": 1,
    "seq": [{
      "sounds": [5, 0],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 0.25,
      "stacc": false
    }, {
      "sounds": [4],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [7],
      "vel": 0.25,
      "stacc": false
    }, {
      "sounds": [4, 0],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [7],
      "vel": 0.25,
      "stacc": false
    }, {
      "sounds": [5],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 0.25,
      "stacc": false
    }, {
      "sounds": [5, 0],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [7],
      "vel": 0.25,
      "stacc": false
    }, {
      "sounds": [4],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 0.25,
      "stacc": false
    }, {
      "sounds": [4, 0],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 0.25,
      "stacc": false
    }, {
      "sounds": [5],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [7],
      "vel": 0.25,
      "stacc": false
    }],
    "index": "3"
  }, {
    "key": "CjO5tRooZ",
    "instrumentKey": "basic-piano",
    "audible": true,
    "volume": 0.25,
    "seq": [{
      "sounds": [0],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [1],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [2],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [3],
      "vel": 1,
      "stacc": false
    }, {
      "sounds": [],
      "vel": 1,
      "stacc": false
    }],
    "index": "4"
  }],
  "chordSequence": [{
    "chordIndex": 0,
    "key": "AkyQvxnl8o"
  }],
  "sections": [[0, 4, 3, 5], [0], [0]]
}];

},{}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _preact = require("preact");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var AppContext = /*#__PURE__*/function (_Component) {
  _inherits(AppContext, _Component);

  function AppContext(props) {
    var _this;

    _classCallCheck(this, AppContext);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AppContext).call(this, props));
    _this.curried = {};
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      var _loop = function _loop() {
        var key = _step.value;

        _this.curried[key] = function () {
          var _props$controller;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          if (_this.props.logActions) console.log("Action: " + key + " (" + args + ")");

          for (var i in args) {
            if (args[i] instanceof Event) {
              if (args[i].type == "mousedown" && args[i].button == 2) return;
              args[i].preventDefault();
              args[i].stopPropagation();

              if (args[i].type == "change") {
                args[i] = args[i].target.value;
              }
            }
          }

          var newState = (_props$controller = props.controller)[key].apply(_props$controller, [_this.state].concat(args));

          if (newState instanceof Promise) {
            if (!_this.state) _this.state = {
              busy: true
            };else _this.setState({
              busy: true
            });
            newState.then(function (state) {
              state.busy = false;

              _this.setState(state);

              _this.notifyStateChange(state);
            });
          } else {
            if (!_this.state) _this.state = newState;else _this.setState(newState);

            _this.notifyStateChange(newState);
          }
        };
      };

      for (var _iterator = _this.getObjectKeys(props.controller)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        _loop();
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      var _loop2 = function _loop2() {
        var key = _step2.value;

        _this.curried[key] = function () {
          var _props$helper;

          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          return (_props$helper = props.helper)[key].apply(_props$helper, [_this.state].concat(args));
        };
      };

      for (var _iterator2 = _this.getObjectKeys(props.helper)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        _loop2();
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    if (props.initAction) _this.curried[props.initAction]();
    return _this;
  }

  _createClass(AppContext, [{
    key: "notifyStateChange",
    value: function notifyStateChange(state) {
      if (typeof this.props.onStateChange == "function") this.props.onStateChange(state);
    }
  }, {
    key: "getObjectKeys",
    value: function getObjectKeys(o) {
      var keys = [];
      o = Object.getPrototypeOf(o);

      while (Object.getOwnPropertyNames(o).indexOf("__proto__") < 0) {
        keys = keys.concat(Object.getOwnPropertyNames(o));
        o = Object.getPrototypeOf(o);
      }

      if (keys.includes("constructor")) keys.splice(keys.indexOf("constructor"), 1);
      return keys;
    }
  }, {
    key: "getChildContext",
    value: function getChildContext() {
      return _objectSpread({}, this.state, {}, this.curried);
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);

  return AppContext;
}(_preact.Component);

;
var _default = AppContext;
exports["default"] = _default;

},{"preact":4}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AudioTimer = /*#__PURE__*/function () {
  function AudioTimer(audioContext) {
    var _this = this;

    _classCallCheck(this, AudioTimer);

    _defineProperty(this, "processTicks", function () {
      var currentTime = _this.audioContext.currentTime; //console.log("called at: "+currentTime);

      while (_this.startTime + _this.deliveredTicks * _this.tickInterval <= currentTime) {
        _this.onTick(_this.deliveredTicks);

        _this.deliveredTicks++;
      }

      var nextAt = _this.startTime + _this.deliveredTicks * _this.tickInterval;
      var untilNext = nextAt - _this.audioContext.currentTime; //console.log("next at: "+nextAt+" in: "+untilNext);

      _this.timeout = setTimeout(_this.processTicks, untilNext * 1000);
    });

    this.audioContext = audioContext;
    this.timeout = null;
  }

  _createClass(AudioTimer, [{
    key: "start",
    value: function start() {
      this.stop();
      this.deliveredTicks = 0;
      this.processTicks();
    }
  }, {
    key: "stop",
    value: function stop() {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }, {
    key: "setStartTime",
    value: function setStartTime(startTime) {
      if (this.isRunning()) throw new Error("can't change start time while running!!!");
      this.startTime = startTime;
    }
  }, {
    key: "setTickInterval",
    value: function setTickInterval(tickInterval) {
      if (this.isRunning()) throw new Error("can't change tick interval while running!!!");
      this.tickInterval = tickInterval;
    }
  }, {
    key: "isRunning",
    value: function isRunning() {
      return !!this.timeout;
    }
  }]);

  return AudioTimer;
}();

exports["default"] = AudioTimer;

},{}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AudioUtil = /*#__PURE__*/function () {
  function AudioUtil() {
    _classCallCheck(this, AudioUtil);
  }

  _createClass(AudioUtil, null, [{
    key: "loadBuffer",
    value: function loadBuffer(url, context) {
      return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';

        request.onload = function () {
          context.decodeAudioData(request.response, function (buffer) {
            resolve(buffer);
          }, function (e) {
            reject(e);
          });
        };

        request.send();
      });
    }
  }]);

  return AudioUtil;
}();

exports["default"] = AudioUtil;

},{}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MusicUtil = /*#__PURE__*/function () {
  function MusicUtil() {
    _classCallCheck(this, MusicUtil);
  }

  _createClass(MusicUtil, null, [{
    key: "rateFromCents",
    value: function rateFromCents(cents) {
      var middleCFreq = 261.63;
      var freq = middleCFreq * Math.pow(2, cents / 1200);
      var rate = freq / middleCFreq;
      return rate;
    }
  }, {
    key: "noteToCents",
    value: function noteToCents(s) {
      switch (s.toUpperCase()) {
        case "C":
        case "":
          return 0;

        case "C#":
          return 100;

        case "D":
          return 200;

        case "D#":
          return 300;

        case "E":
          return 400;

        case "F":
          return 500;

        case "F#":
          return 600;

        case "G":
          return 700;

        case "G#":
          return 800;

        case "A":
          return 900;

        case "A#":
          return 1000;

        case "B":
          return 1100;
      }
    }
  }, {
    key: "getNotesForScale",
    value: function getNotesForScale(scale, minor) {
      var startIndex = MusicUtil.NOTE_NAMES.indexOf(scale);
      if (startIndex < 0) throw new Error("no such scale: " + scale);
      var noteIndeces = [0, 2, 4, 5, 7, 9, 11];
      if (minor) noteIndeces = [0, 2, 3, 5, 7, 8, 10];
      var res = [];

      for (var _i = 0, _noteIndeces = noteIndeces; _i < _noteIndeces.length; _i++) {
        var index = _noteIndeces[_i];
        res.push(MusicUtil.NOTE_NAMES[(startIndex + index) % 12]);
      }

      return res;
    }
  }, {
    key: "getChordNotesForScale",
    value: function getChordNotesForScale(scale, minor) {
      var noteNames = MusicUtil.getNotesForScale(scale, minor);
      var res = [];

      for (var i = 0; i < 12; i++) {
        res.push([noteNames[i % 7], noteNames[(i + 2) % 7], noteNames[(i + 4) % 7]]);
      }

      return res;
    }
  }, {
    key: "getChordNamesForScale",
    value: function getChordNamesForScale(scale, minor) {
      var prefixes = ["", "-", "-", "", "", "-", "o"];
      if (minor) prefixes = ["-", "o", "", "-", "-", "", ""];
      var noteNames = MusicUtil.getNotesForScale(scale, minor);
      var res = [];

      for (var index in noteNames) {
        res.push(noteNames[index] + prefixes[index]);
      }

      return res;
    }
  }]);

  return MusicUtil;
}();

exports["default"] = MusicUtil;

_defineProperty(MusicUtil, "OCTAVE_CENTS", 1200);

_defineProperty(MusicUtil, "NOTE_NAMES", ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"]);

},{}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IF = IF;
exports.Select = void 0;

var _preact = require("preact");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Select = /*#__PURE__*/function () {
  function Select() {
    var _this = this;

    _classCallCheck(this, Select);

    _defineProperty(this, "onChange", function (e) {
      if (_this.props.onChange) _this.props.onChange(JSON.parse(e.target.value));
      if (_this.props.onIndexChange) _this.props.onIndexChange(e.target.selectedIndex);
    });
  }

  _createClass(Select, [{
    key: "render",
    value: function render() {
      var props = this.props;
      if (!props.labelField) props.labelField = "label";
      if (!props.options) props.options = [];
      return (0, _preact.h)("select", {
        "class": props["class"],
        style: props.style,
        onChange: this.onChange,
        key: props.key
      }, props.options.map(function (option, index) {
        var selected = false;
        if (props.hasOwnProperty('selectedIndex') && index === props.selectedIndex) selected = true;
        if (props.hasOwnProperty('selected') && option.key === props.selected) selected = true;
        var key = option.key;
        if (props.hasOwnProperty('optionKeyPrefix')) key = props.keyPrefix + key;
        return (0, _preact.h)("option", {
          key: key,
          value: JSON.stringify(option.key),
          selected: selected,
          "class": option["class"]
        }, option[props.labelField]);
      }));
    }
  }]);

  return Select;
}();

exports.Select = Select;

function IF(cond, func) {
  if (cond) return func();
}

},{"preact":4}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//import immutable from 'immutable';
var ReconcileArray = /*#__PURE__*/function () {
  function ReconcileArray(options) {
    _classCallCheck(this, ReconcileArray);

    this.itemsByKey = {};
    this.options = options;
  }

  _createClass(ReconcileArray, [{
    key: "createItem",
    value: function createItem(data) {
      if (this.options.itemFactory) return this.options.itemFactory(data);else if (this.options.itemClass) return new this.options.itemClass(data);else throw new Error("No way to create items!");
    }
  }, {
    key: "setData",
    value: function setData(datas) {
      var newKeys = [];

      for (var index in datas) {
        var data = datas[index];
        data.index = index;
        if (!data.key) throw new Error("Array item doesn't have a key");
        var key = String(data.key);
        newKeys.push(key); //let im=immutable.fromJS(data);

        if (this.itemsByKey[key]) {
          //if (!im.equals(this.itemsByKey[key].__im))
          this.itemsByKey[key].update(data);
        } else {
          this.itemsByKey[key] = this.createItem(data);
        } //this.itemsByKey[key].__im=im;

      }

      for (var _i = 0, _Object$keys = Object.keys(this.itemsByKey); _i < _Object$keys.length; _i++) {
        var _key = _Object$keys[_i];

        if (newKeys.indexOf(_key) < 0) {
          this.itemsByKey[_key].finalize();

          delete this.itemsByKey[_key];
        }
      }
    }
  }, {
    key: "getItems",
    value: function getItems() {
      return Object.values(this.itemsByKey);
    }
  }, {
    key: "getItemByKey",
    value: function getItemByKey(key) {
      return this.itemsByKey[key];
    }
  }], [{
    key: "createWithFactory",
    value: function createWithFactory(factory) {
      return new ReconcileArray({
        itemFactory: factory
      });
    }
  }]);

  return ReconcileArray;
}();

exports["default"] = ReconcileArray;

},{}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _preact = require("preact");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var A = /*#__PURE__*/function (_Component) {
  _inherits(A, _Component);

  function A() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, A);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(A)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onDown", function (e) {
      if (e instanceof TouchEvent) window.haveTouchEvent = true;
      if (window.haveTouchEvent && !(e instanceof TouchEvent)) return; //e.preventDefault();

      e.stopPropagation();
      if (_this.base.isPressed) return;
      _this.base.isPressed = true;
      if (_this.props.onPress) _this.props.onPress();
      if (_this.props.onRelease) _this.base.className += " pressed";
    });

    _defineProperty(_assertThisInitialized(_this), "onUp", function (e) {
      if (e instanceof TouchEvent) window.haveTouchEvent = true;
      if (window.haveTouchEvent && !(e instanceof TouchEvent)) return;
      if (e.cancelable) e.preventDefault();
      e.stopPropagation();
      if (!_this.base.isPressed) return;
      _this.base.isPressed = false;

      if (_this.props.onRelease) {
        _this.base.className = _this.base.className.replace(" pressed", "");

        _this.props.onRelease();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMove", function (e) {
      if (_this.props.cancelOnMove && _this.base.isPressed) {
        _this.base.className = _this.base.className.replace(" pressed", "");
        _this.base.isPressed = false;
      }
    });

    return _this;
  }

  _createClass(A, [{
    key: "render",
    value: function render() {
      return (0, _preact.h)("a", {
        "class": "a " + this.props["class"],
        onTouchMove: this.onMove,
        onTouchStart: this.onDown,
        onTouchEnd: this.onUp,
        onMouseDown: this.onDown,
        onMouseUp: this.onUp
      }, this.props.children);
    }
  }]);

  return A;
}(_preact.Component);

exports["default"] = A;

},{"preact":4}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _preact = require("preact");

var _A = _interopRequireDefault(require("./A.jsx"));

var _ReactUtil = require("../utils/ReactUtil.jsx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var AboutScreen = /*#__PURE__*/function (_Component) {
  _inherits(AboutScreen, _Component);

  function AboutScreen() {
    _classCallCheck(this, AboutScreen);

    return _possibleConstructorReturn(this, _getPrototypeOf(AboutScreen).apply(this, arguments));
  }

  _createClass(AboutScreen, [{
    key: "render",
    value: function render() {
      return (0, _preact.h)("div", {
        "class": "modal-container",
        onClick: this.context.hideAboutScreen
      }, (0, _preact.h)("div", {
        "class": "box border border-dark bg-background about-screen"
      }, (0, _preact.h)("div", {
        "class": "pane-header text-secondary bg-dark "
      }, "ABOUT"), (0, _preact.h)("b", null, "Hoodmode"), (0, _preact.h)("br", null), (0, _preact.h)("br", null), "Version: ", this.context.getAppVersion(), (0, _preact.h)("br", null), (0, _preact.h)("br", null), "Enjoy! Please let me know of any bugs you find!"));
    }
  }]);

  return AboutScreen;
}(_preact.Component);

exports["default"] = AboutScreen;

},{"../utils/ReactUtil.jsx":28,"./A.jsx":30,"preact":4}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _preact = require("preact");

var _A = _interopRequireDefault(require("./A.jsx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AddLayer = /*#__PURE__*/function () {
  function AddLayer() {
    _classCallCheck(this, AddLayer);
  }

  _createClass(AddLayer, [{
    key: "render",
    value: function render() {
      var _this = this;

      return (0, _preact.h)("div", {
        "class": "pane-container"
      }, (0, _preact.h)("div", {
        "class": "box pane double bg-dark"
      }, (0, _preact.h)("div", {
        "class": "pane-header bg-dark text-secondary"
      }, "ADD LAYER"), this.context.instruments.map(function (instrument, index) {
        return (0, _preact.h)(_A["default"], {
          "class": "box w-4 text-white bg-danger el",
          onRelease: _this.context.addLayer.bind(null, instrument.key)
        }, (0, _preact.h)("img", {
          src: "img/" + instrument.icon
        }), instrument.name);
      })));
    }
  }]);

  return AddLayer;
}();

exports["default"] = AddLayer;

},{"./A.jsx":30,"preact":4}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _preact = require("preact");

var _ReactUtil = require("../utils/ReactUtil.jsx");

var _Header = _interopRequireDefault(require("./Header.jsx"));

var _Front = _interopRequireDefault(require("./Front.jsx"));

var _Song = _interopRequireDefault(require("./Song.jsx"));

var _SongSettings = _interopRequireDefault(require("./SongSettings.jsx"));

var _LayerSettings = _interopRequireDefault(require("./LayerSettings.jsx"));

var _AddLayer = _interopRequireDefault(require("./AddLayer.jsx"));

var _Layer = _interopRequireDefault(require("./Layer.jsx"));

var _SelectChord = _interopRequireDefault(require("./SelectChord.jsx"));

var _TapHighlight = _interopRequireDefault(require("./TapHighlight.jsx"));

var _AboutScreen = _interopRequireDefault(require("./AboutScreen.jsx"));

var _Dialog = _interopRequireDefault(require("./Dialog.jsx"));

var _A = _interopRequireDefault(require("./A.jsx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var App = /*#__PURE__*/function (_Component) {
  _inherits(App, _Component);

  function App() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, App);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(App)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "updateSize", function () {
      var windowWidth = document.documentElement.clientWidth;
      var windowHeight = document.documentElement.clientHeight;
      var cs = getComputedStyle(document.documentElement);
      var paneWidth = parseFloat(cs.getPropertyValue('--paneWidth'));
      var paneHeight = parseFloat(cs.getPropertyValue('--paneHeight'));
      var contentWidth, contentHeight;
      var el = document.activeElement;
      var screenKeyboardActive = false;
      if (el.nodeName == "INPUT" && el.type == "text") screenKeyboardActive = true; // Portrait.

      if (windowHeight > windowWidth) {
        contentHeight = 2 * (paneHeight + 1) + 2;
        contentWidth = paneWidth + 1;
        document.querySelector("body").classList.add("portrait");
        document.querySelector("body").classList.remove("landscape");
        if (window.hasOwnProperty("cordova")) StatusBar.show();
      } // Landscape.
      else {
          contentHeight = paneHeight + 2 + 1;
          contentWidth = 2 * (paneWidth + 1);
          document.querySelector("body").classList.add("landscape");
          document.querySelector("body").classList.remove("portrait");

          if (window.hasOwnProperty("cordova")) {
            if (screenKeyboardActive) StatusBar.show();else StatusBar.hide();
          }
        }

      var fontSize;
      if (windowWidth / contentWidth < windowHeight / contentHeight) fontSize = windowWidth / contentWidth;else fontSize = windowHeight / contentHeight;
      document.querySelector("html").style.fontSize = fontSize + "px";
      var s = document.documentElement.style;
      s.setProperty("--paneMarginTop", (windowHeight - fontSize * contentHeight) / 2 + "px");
      s.setProperty("--paneMarginLeft", (windowWidth - fontSize * contentWidth) / 2 + "px");
    });

    _defineProperty(_assertThisInitialized(_this), "onPlayClick", function () {
      console.log("play");
    });

    return _this;
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.onresize = this.updateSize;
      setTimeout(this.updateSize, 0);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      if (this.context.busy) return (0, _preact.h)("div", null, "LOADING...");
      var cls = "";
      if (this.context.recording) cls = "recording"; // <TapHighlight />

      return (0, _preact.h)("div", {
        "class": cls
      }, (0, _preact.h)(_Header["default"], null), (0, _ReactUtil.IF)(!this.context.isSongOpen(), function () {
        return (0, _preact.h)(_Front["default"], null);
      }), (0, _ReactUtil.IF)(this.context.isSongOpen(), function () {
        if (_this2.context.settingsVisible) {
          if (_this2.context.currentLayerIndex >= 0) return (0, _preact.h)(_LayerSettings["default"], null);else return (0, _preact.h)(_SongSettings["default"], null);
        } else if (_this2.context.addLayerVisible) return (0, _preact.h)(_AddLayer["default"], null);else if (_this2.context.currentLayerIndex >= 0) return (0, _preact.h)(_Layer["default"], null);else return (0, _preact.h)(_Song["default"], null);
      }), (0, _ReactUtil.IF)(this.context.aboutScreenVisible, function () {
        return (0, _preact.h)(_AboutScreen["default"], null);
      }), (0, _ReactUtil.IF)(this.context.dialogText, function () {
        return (0, _preact.h)(_Dialog["default"], null);
      }));
    }
  }]);

  return App;
}(_preact.Component);

exports["default"] = App;

},{"../utils/ReactUtil.jsx":28,"./A.jsx":30,"./AboutScreen.jsx":31,"./AddLayer.jsx":32,"./Dialog.jsx":34,"./Front.jsx":35,"./Header.jsx":36,"./Layer.jsx":37,"./LayerSettings.jsx":38,"./SelectChord.jsx":39,"./Song.jsx":40,"./SongSettings.jsx":43,"./TapHighlight.jsx":44,"preact":4}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _preact = require("preact");

var _A = _interopRequireDefault(require("./A.jsx"));

var _ReactUtil = require("../utils/ReactUtil.jsx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Dialog = /*#__PURE__*/function (_Component) {
  _inherits(Dialog, _Component);

  function Dialog() {
    _classCallCheck(this, Dialog);

    return _possibleConstructorReturn(this, _getPrototypeOf(Dialog).apply(this, arguments));
  }

  _createClass(Dialog, [{
    key: "render",
    value: function render() {
      return (0, _preact.h)("div", {
        "class": "modal-container",
        onClick: this.context.cancelDialog
      }, (0, _preact.h)("div", {
        "class": "box border border-dark bg-background dialog"
      }, (0, _preact.h)("div", {
        "class": "pane-header text-secondary bg-dark "
      }, "CONFIRM"), this.context.dialogText, (0, _preact.h)("div", {
        "class": "form-buttons"
      }, (0, _preact.h)(_A["default"], {
        "class": "box bg-info",
        onRelease: this.context.cancelDialog
      }, "Cancel"), (0, _preact.h)(_A["default"], {
        "class": "box bg-warning",
        onRelease: this.context.confirmDialog
      }, "Ok"))));
    }
  }]);

  return Dialog;
}(_preact.Component);

exports["default"] = Dialog;

},{"../utils/ReactUtil.jsx":28,"./A.jsx":30,"preact":4}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _preact = require("preact");

var _A = _interopRequireDefault(require("./A.jsx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Front = /*#__PURE__*/function () {
  function Front() {
    _classCallCheck(this, Front);
  }

  _createClass(Front, [{
    key: "render",
    value: function render() {
      var _this = this;

      return (0, _preact.h)("div", {
        "class": "pane-container"
      }, (0, _preact.h)("div", {
        "class": "box pane double border border-dark"
      }, (0, _preact.h)("div", {
        "class": "pane-header text-secondary bg-dark"
      }, "SONGS"), (0, _preact.h)(_A["default"], {
        "class": "text-white",
        onRelease: this.context.addSong
      }, (0, _preact.h)("div", {
        "class": "box bg-dark w-1"
      }, "+"), (0, _preact.h)("div", {
        "class": "box"
      }, "New Song")), (0, _preact.h)("div", {
        "class": "front-container"
      }, this.context.songs.map(function (song, index) {
        return (0, _preact.h)(_A["default"], {
          "class": "box bg-secondary text-white w-4 border border-light el",
          onRelease: _this.context.setSongIndex.bind(null, index),
          cancelOnMove: true
        }, song.name);
      }))));
    }
  }]);

  return Front;
}();

exports["default"] = Front;

},{"./A.jsx":30,"preact":4}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _preact = require("preact");

var _ReactUtil = require("../utils/ReactUtil.jsx");

var _A = _interopRequireDefault(require("./A.jsx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Header = /*#__PURE__*/function (_Component) {
  _inherits(Header, _Component);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, _getPrototypeOf(Header).apply(this, arguments));
  }

  _createClass(Header, [{
    key: "render",
    value: function render() {
      var playButtonClass = "header-button text-white ";
      if (this.context.playing) playButtonClass += "active";
      var recordButtonClass = "header-button text-white ";
      if (this.context.recording) recordButtonClass += "active";
      var items = [];

      if (this.context.isSongOpen()) {
        items.push((0, _preact.h)(_A["default"], {
          "class": "header-button text-white",
          onRelease: this.context.goBack
        }, (0, _preact.h)("img", {
          src: "img/arrow-left.svg"
        })));
        if (this.context.currentLayerIndex >= 0) items.push((0, _preact.h)("div", {
          "class": "header-button text-white"
        }, (0, _preact.h)("img", {
          src: "img/" + this.context.getInstrumentIconByKey(this.context.getCurrentLayer().instrumentKey)
        })));
        items.push((0, _preact.h)("div", {
          "class": "header-text text-white"
        }, this.context.getCurrentSong().name));
        items.push((0, _preact.h)(_A["default"], {
          "class": playButtonClass,
          onPress: this.context.playClick
        }, (0, _preact.h)("img", {
          src: "img/play-fill.svg"
        })));
        if (this.context.currentLayerIndex >= 0) items.push((0, _preact.h)(_A["default"], {
          "class": recordButtonClass,
          onPress: this.context.recordClick
        }, (0, _preact.h)("img", {
          src: "img/circle-fill.svg"
        })));
        items.push((0, _preact.h)(_A["default"], {
          "class": "header-button text-white",
          onRelease: this.context.toggleSettings
        }, (0, _preact.h)("img", {
          src: "img/gear-fill.svg"
        })));
      } else {
        items.push((0, _preact.h)("div", {
          "class": "header-text text-white"
        }, "Hoodmode"));
        items.push((0, _preact.h)(_A["default"], {
          "class": "header-button text-white",
          onRelease: this.context.showAboutScreen
        }, (0, _preact.h)("img", {
          src: "img/info-icon.svg"
        })));
      }

      return (0, _preact.h)("div", {
        "class": "header box bg-dark"
      }, items);
    }
  }]);

  return Header;
}(_preact.Component);

exports["default"] = Header;

},{"../utils/ReactUtil.jsx":28,"./A.jsx":30,"preact":4}],37:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _preact = require("preact");

var _A = _interopRequireDefault(require("./A.jsx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Layer = /*#__PURE__*/function (_Component) {
  _inherits(Layer, _Component);

  function Layer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Layer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Layer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (e) {
      if (e.target.nodeName == "INPUT") return;
      var k = parseInt(e.key) - 1;
      if (k >= 0) _this.context.soundButtonClick(k);
    });

    return _this;
  }

  _createClass(Layer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener("keydown", this.onKeyDown);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener("keydown", this.onKeyDown);
    }
  }, {
    key: "renderSoundSymbols",
    value: function renderSoundSymbols() {
      var instrument = this.context.getCurrentInstrument();
      var layer = this.context.getCurrentLayer();
      var buttons = new Array(16).fill((0, _preact.h)("div", {
        "class": "box w-1"
      }));
      var numSounds = this.context.getInstrumentNumSoundsByKey(instrument.key);

      for (var i = 0; i < 9; i++) {
        var buttonIndex = 8 - 4 * Math.floor(i / 3) + i % 3;

        if (i < numSounds) {
          var buttonClass = "box w-1 bg-primary text-white ";
          if (this.context.currentGridIndex >= 0 && layer.seq[this.context.currentGridIndex].sounds.includes(i)) buttonClass += "active";
          var buttonIcon = void 0;
          if (instrument.type == "percussive") buttonIcon = "img/" + instrument.icons[i];else buttonIcon = "img/hnote-" + (1 + 2 * (i % 3)) + ".svg";
          buttons[buttonIndex] = (0, _preact.h)(_A["default"], {
            "class": buttonClass,
            onPress: this.context.soundButtonClick.bind(null, i)
          }, (0, _preact.h)("img", {
            src: buttonIcon
          }));
        } else {
          buttons[buttonIndex] = (0, _preact.h)("div", {
            "class": "box w-1 bg-primary"
          });
        }
      }

      var cls = "box w-1 bg-warning text-white ";
      if (this.context.currentGridIndex >= 0 && layer.seq[this.context.currentGridIndex].stacc) cls += "active";
      buttons[12] = (0, _preact.h)(_A["default"], {
        "class": cls,
        onPress: this.context.toggleCurrentLayerStacc
      }, (0, _preact.h)("img", {
        src: "img/rest.svg"
      }));
      var currentVel = null;
      if (this.context.currentGridIndex >= 0 && this.context.currentLayerHasSoundAt(this.context.currentGridIndex)) currentVel = layer.seq[this.context.currentGridIndex].vel;
      var sizeClasses = ["tiny", "small", ""];
      var vels = [0.25, 0.50, 1];

      for (var _i = 0; _i < 3; _i++) {
        var _cls = "box w-1 bg-warning text-white " + sizeClasses[_i] + " ";

        if (currentVel == vels[_i]) _cls += "active";
        buttons[13 + _i] = (0, _preact.h)(_A["default"], {
          "class": _cls,
          href: "#",
          onPress: this.context.setCurrentLayerVel.bind(null, vels[_i])
        }, (0, _preact.h)("img", {
          src: "img/note.svg"
        }));
      }

      if (instrument.type == "harmonic") {
        for (var _i2 = 0, _arr = [0, 1, 2]; _i2 < _arr.length; _i2++) {
          var octave = _arr[_i2];
          var _cls2 = "box w-1 bg-info text-white ";
          if (this.context.currentGridIndex >= 0 && this.context.currentLayerHasChordAt(this.context.currentGridIndex, octave)) _cls2 += "active";
          buttons[11 - octave * 4] = (0, _preact.h)(_A["default"], {
            "class": _cls2,
            href: "#",
            onPress: this.context.chordButtonClick.bind(null, octave)
          }, (0, _preact.h)("img", {
            src: "img/hnote-chord.svg"
          }));
        }
      }

      return buttons;
    }
  }, {
    key: "renderSequence",
    value: function renderSequence() {
      var layer = this.context.getCurrentLayer();
      var res = [];
      var velCls = {
        0.25: "tiny",
        0.5: "small",
        1: ""
      };

      for (var gridIndex = 0; gridIndex < 16; gridIndex++) {
        var cls = "box w-1 beat-grid beat-" + gridIndex + " ";
        if (gridIndex == this.context.currentGridIndex) cls += "bg-light ";else cls += "bg-black text-white ";
        var icon = null;
        if (layer.seq[gridIndex].stacc) icon = (0, _preact.h)("img", {
          src: "img/rest.svg"
        });else if (this.context.currentLayerHasSoundAt(gridIndex)) {
          icon = (0, _preact.h)("img", {
            src: "img/note.svg"
          });
          cls += velCls[layer.seq[gridIndex].vel];
        }
        res.push((0, _preact.h)(_A["default"], {
          "class": cls,
          onPress: this.context.gridIndexClick.bind(null, gridIndex)
        }, icon));
      }

      return res;
    }
  }, {
    key: "render",
    value: function render() {
      var layer = this.context.getCurrentLayer();
      return (0, _preact.h)("div", {
        "class": "pane-container rev-portrait"
      }, (0, _preact.h)("div", {
        "class": "pane box border border-dark"
      }, (0, _preact.h)("div", {
        "class": "pane-header text-secondary bg-dark"
      }, "SOUNDS"), this.renderSoundSymbols()), (0, _preact.h)("div", {
        "class": "pane box bg-dark"
      }, (0, _preact.h)("div", {
        "class": "pane-header text-secondary bg-dark"
      }, "SEQUENCE"), this.renderSequence()));
    }
  }]);

  return Layer;
}(_preact.Component);

exports["default"] = Layer;

},{"./A.jsx":30,"preact":4}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _preact = require("preact");

var _A = _interopRequireDefault(require("./A.jsx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LayerSettings = /*#__PURE__*/function () {
  function LayerSettings() {
    _classCallCheck(this, LayerSettings);
  }

  _createClass(LayerSettings, [{
    key: "render",
    value: function render() {
      var instrument = this.context.getCurrentInstrument();
      var layer = this.context.getCurrentLayer();
      return (0, _preact.h)("div", {
        "class": "pane-container"
      }, (0, _preact.h)("div", {
        "class": "box pane double bg-dark"
      }, (0, _preact.h)("div", {
        "class": "pane-header bg-dark text-secondary"
      }, "LAYER SETTINGS"), (0, _preact.h)("div", {
        "class": "box w-4 el text-white"
      }, (0, _preact.h)("img", {
        src: "img/" + instrument.icon
      }), instrument.name), (0, _preact.h)("br", null), (0, _preact.h)("br", null), (0, _preact.h)("div", {
        "class": "input-group"
      }, "Volume", (0, _preact.h)("br", null), (0, _preact.h)("div", {
        "class": "box border bg-white border-black text-black w-4"
      }, (0, _preact.h)("input", {
        type: "range",
        min: "0",
        max: "1",
        step: "0.01",
        value: layer.volume,
        onChange: this.context.setCurrentLayerVolume
      }))), (0, _preact.h)("div", {
        "class": "form-buttons"
      }, (0, _preact.h)(_A["default"], {
        "class": "box bg-danger text-white",
        onRelease: this.context.deleteCurrentLayer
      }, (0, _preact.h)("img", {
        src: "img/trash.svg"
      })), (0, _preact.h)(_A["default"], {
        "class": "box bg-primary form-button text-white",
        onRelease: this.context.toggleSettings
      }, "Close"))));
    }
  }]);

  return LayerSettings;
}();

exports["default"] = LayerSettings;

},{"./A.jsx":30,"preact":4}],39:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _preact = require("preact");

var _A = _interopRequireDefault(require("./A.jsx"));

var _ReactUtil = require("../utils/ReactUtil.jsx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var SelectChord = /*#__PURE__*/function (_Component) {
  _inherits(SelectChord, _Component);

  function SelectChord() {
    _classCallCheck(this, SelectChord);

    return _possibleConstructorReturn(this, _getPrototypeOf(SelectChord).apply(this, arguments));
  }

  _createClass(SelectChord, [{
    key: "render",
    value: function render() {
      var _this = this;

      var song = this.context.getCurrentSong();
      var section = song.sections[this.context.currentSectionIndex];
      var currentChordIndex = section[this.context.editSectionChordVisible];
      return (0, _preact.h)("div", {
        "class": "modal-container",
        onClick: this.context.hideEditSectionChord
      }, (0, _preact.h)("div", {
        "class": "box border border-dark bg-background select-chord"
      }, (0, _preact.h)("div", {
        "class": "pane-header text-secondary bg-dark "
      }, "EDIT CHORD"), (0, _preact.h)("hr", {
        "class": "pane-divider four"
      }), (0, _preact.h)("div", null, this.context.getChordLabels().map(function (label, index) {
        var cls = "box w-1 bg-success text-light chord ";
        if (index == currentChordIndex) cls += "active";
        return (0, _preact.h)(_A["default"], {
          "class": cls,
          onRelease: _this.context.editSectionChord.bind(null, index)
        }, label);
      })), (0, _ReactUtil.IF)(section.length > 1, function () {
        return (0, _preact.h)(_A["default"], {
          "class": "box bg-danger w-1 text-white",
          href: "#",
          onRelease: _this.context.removeSectionChord
        }, (0, _preact.h)("img", {
          src: "img/trash.svg"
        }));
      })));
    }
  }]);

  return SelectChord;
}(_preact.Component);

exports["default"] = SelectChord;

},{"../utils/ReactUtil.jsx":28,"./A.jsx":30,"preact":4}],40:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _preact = require("preact");

var _SongLayers = _interopRequireDefault(require("./SongLayers.jsx"));

var _SongChords = _interopRequireDefault(require("./SongChords.jsx"));

var _A = _interopRequireDefault(require("./A.jsx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Song = /*#__PURE__*/function (_Component) {
  _inherits(Song, _Component);

  function Song() {
    _classCallCheck(this, Song);

    return _possibleConstructorReturn(this, _getPrototypeOf(Song).apply(this, arguments));
  }

  _createClass(Song, [{
    key: "render",
    value: function render() {
      return (0, _preact.h)("div", {
        "class": "pane-container"
      }, (0, _preact.h)(_SongLayers["default"], null), (0, _preact.h)(_SongChords["default"], null));
    }
  }]);

  return Song;
}(_preact.Component);

exports["default"] = Song;

},{"./A.jsx":30,"./SongChords.jsx":41,"./SongLayers.jsx":42,"preact":4}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _preact = require("preact");

var _SelectChord = _interopRequireDefault(require("./SelectChord.jsx"));

var _ReactUtil = require("../utils/ReactUtil.jsx");

var _A = _interopRequireDefault(require("./A.jsx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var SongChords = /*#__PURE__*/function (_Component) {
  _inherits(SongChords, _Component);

  function SongChords() {
    _classCallCheck(this, SongChords);

    return _possibleConstructorReturn(this, _getPrototypeOf(SongChords).apply(this, arguments));
  }

  _createClass(SongChords, [{
    key: "renderConductorChords",
    value: function renderConductorChords() {
      var _this = this;

      return this.context.getChordLabels().map(function (label, index) {
        var cls = "box w-1 bg-success text-light chord ";
        if (index == _this.context.currentChordIndex) cls += " active beat-0 beat-4 beat-8 beat-12";
        return (0, _preact.h)(_A["default"], {
          "class": cls,
          onPress: _this.context.setCurrentChordIndex.bind(null, index)
        }, label);
      });
    }
  }, {
    key: "renderSectionChords",
    value: function renderSectionChords() {
      var _this2 = this;

      var a = this.context.getCurrentSectionChordLabels().map(function (label, index) {
        var cls = "box w-1 bg-success text-light section-chord sequence-" + index;
        return (0, _preact.h)(_A["default"], {
          "class": cls,
          onRelease: _this2.context.showEditSectionChord.bind(null, index)
        }, label);
      });
      a.push((0, _preact.h)(_A["default"], {
        "class": "box border border-white text-white w-1",
        onRelease: this.context.addSectionChord
      }, "+"));
      return a;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var song = this.context.getCurrentSong();
      var chordLabels;
      if (this.context.currentSectionIndex == -1) chordLabels = this.renderConductorChords();else chordLabels = this.renderSectionChords();
      return (0, _preact.h)("div", {
        "class": "pane box border border-dark"
      }, (0, _preact.h)("hr", {
        "class": "pane-divider"
      }), (0, _preact.h)("div", {
        "class": "pane-header text-secondary bg-dark "
      }, "CHORDS"), (0, _preact.h)("div", {
        style: {
          height: '6em'
        }
      }, chordLabels), (0, _preact.h)(_A["default"], {
        "class": "box w-1 bg-secondary text-white " + (this.context.currentSectionIndex == -1 ? "active" : ""),
        onPress: this.context.setCurrentSectionIndex.bind(null, -1)
      }, (0, _preact.h)("img", {
        src: "img/conductor.svg"
      })), ["A", "B", "C"].map(function (letter, index) {
        var cls = "box w-1 bg-primary text-white ";
        if (index == _this3.context.currentSectionIndex) cls += "active";
        return (0, _preact.h)(_A["default"], {
          "class": cls,
          onPress: _this3.context.setCurrentSectionIndex.bind(null, index)
        }, letter);
      }), (0, _ReactUtil.IF)(this.context.editSectionChordVisible >= 0, function () {
        return (0, _preact.h)(_SelectChord["default"], null);
      }));
    }
  }]);

  return SongChords;
}(_preact.Component);

exports["default"] = SongChords;

},{"../utils/ReactUtil.jsx":28,"./A.jsx":30,"./SelectChord.jsx":39,"preact":4}],42:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _preact = require("preact");

var _A = _interopRequireDefault(require("./A.jsx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var SongLayers = /*#__PURE__*/function (_Component) {
  _inherits(SongLayers, _Component);

  function SongLayers() {
    _classCallCheck(this, SongLayers);

    return _possibleConstructorReturn(this, _getPrototypeOf(SongLayers).apply(this, arguments));
  }

  _createClass(SongLayers, [{
    key: "render",
    value: function render() {
      var _this = this;

      var song = this.context.getCurrentSong();
      return (0, _preact.h)("div", {
        "class": "pane box border border-dark"
      }, (0, _preact.h)("div", {
        "class": "pane-header text-secondary"
      }, "LAYERS"), song.layers.map(function (layer, index) {
        var cls = "box bg-danger text-white w-2 layer-button-" + index + " ";
        var icon = "img/toggle-on.svg";

        if (!layer.audible) {
          icon = "img/toggle-off.svg";
          cls += "faded";
        }

        return (0, _preact.h)(_A["default"], {
          "class": cls,
          onRelease: _this.context.setLayerIndex.bind(null, index)
        }, (0, _preact.h)("div", {
          "class": "layer-icon"
        }, (0, _preact.h)("img", {
          src: "img/" + _this.context.getInstrumentIconByKey(layer.instrumentKey)
        })), (0, _preact.h)(_A["default"], {
          "class": "layer-icon",
          onPress: _this.context.toggleLayerAudible.bind(null, index)
        }, (0, _preact.h)("img", {
          src: icon
        })));
      }), (0, _preact.h)(_A["default"], {
        "class": "box border border-white text-white w-1",
        href: "#",
        onRelease: this.context.showAddLayer
      }, "+"));
    }
  }]);

  return SongLayers;
}(_preact.Component);

exports["default"] = SongLayers;

},{"./A.jsx":30,"preact":4}],43:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _preact = require("preact");

var _ReactUtil = require("../utils/ReactUtil.jsx");

var _A = _interopRequireDefault(require("./A.jsx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SongSettings = /*#__PURE__*/function () {
  function SongSettings() {
    _classCallCheck(this, SongSettings);
  }

  _createClass(SongSettings, [{
    key: "render",
    value: function render() {
      return (0, _preact.h)("div", {
        "class": "pane-container"
      }, (0, _preact.h)("div", {
        "class": "pane box double bg-dark"
      }, (0, _preact.h)("div", {
        "class": "pane-header bg-dark text-secondary"
      }, "SONG SETTINGS"), (0, _preact.h)("div", {
        "class": "input-group"
      }, "Song Name", (0, _preact.h)("br", null), (0, _preact.h)("div", {
        "class": "box border bg-white border-black text-black w-4"
      }, (0, _preact.h)("input", {
        type: "text",
        value: this.context.getCurrentSong().name,
        onChange: this.context.setCurrentSongName
      }))), (0, _preact.h)("div", {
        "class": "input-group"
      }, "Tempo", (0, _preact.h)("br", null), (0, _preact.h)("div", {
        "class": "box border bg-white border-black text-black w-4"
      }, (0, _preact.h)("input", {
        type: "text",
        value: this.context.getCurrentSong().bpm,
        onChange: this.context.setCurrentSongBpm
      }))), (0, _preact.h)("div", {
        "class": "input-group"
      }, "Key", (0, _preact.h)("br", null), (0, _preact.h)("div", {
        "class": "box border bg-white border-black text-black w-2"
      }, (0, _preact.h)(_ReactUtil.Select, {
        "class": "form-control col-2",
        options: this.context.getNotesSelectOptions(),
        selected: this.context.getCurrentSong().musicKey,
        onChange: this.context.setCurrentSongMusicKey
      })), (0, _preact.h)("div", {
        "class": "box border bg-white border-black text-black w-2"
      }, (0, _preact.h)(_ReactUtil.Select, {
        "class": "form-control col-4",
        options: this.context.getModalSelectOptions(),
        selected: this.context.getCurrentSong().minor,
        onChange: this.context.setCurrentSongMinor
      }))), (0, _preact.h)("div", {
        "class": "form-buttons"
      }, (0, _preact.h)(_A["default"], {
        "class": "bg-warning box text-white w-1",
        href: "#",
        onRelease: this.context.deleteCurrentSong
      }, (0, _preact.h)("img", {
        src: "img/trash.svg"
      })), (0, _preact.h)(_A["default"], {
        "class": "bg-primary box text-white",
        href: "#",
        onRelease: this.context.toggleSettings
      }, "Close"))));
    }
  }]);

  return SongSettings;
}();

exports["default"] = SongSettings;

},{"../utils/ReactUtil.jsx":28,"./A.jsx":30,"preact":4}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _preact = require("preact");

var _ReactUtil = require("../utils/ReactUtil.jsx");

var _A = _interopRequireDefault(require("./A.jsx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TapHighlight = /*#__PURE__*/function (_Component) {
  _inherits(TapHighlight, _Component);

  function TapHighlight(props) {
    var _this;

    _classCallCheck(this, TapHighlight);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TapHighlight).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onContextMenu", function (e) {
      e.stopPropagation();
      e.preventDefault();

      _this.setState({
        showHighlight: true
      });

      var s = document.documentElement.style;
      s.setProperty("--tapHighlightLeft", e.clientX + "px");
      s.setProperty("--tapHighlightTop", e.clientY + "px");
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseUp", function (e) {
      _this.setState({
        showHighlight: false
      });
    });

    _this.state = {
      showHighlight: false
    };
    return _this;
  }

  _createClass(TapHighlight, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener("contextmenu", this.onContextMenu);
      document.addEventListener("mouseup", this.onMouseUp);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener("contextmenu", this.onContextMenu);
      document.removeEventListener("mouseup", this.onMouseUp);
    }
  }, {
    key: "render",
    value: function render() {
      return (0, _preact.h)("div", {
        "class": "tap-highlight"
      }, (0, _ReactUtil.IF)(this.state.showHighlight, function () {
        return (0, _preact.h)("img", {
          src: "img/tap-highlight.svg"
        });
      }));
    }
  }]);

  return TapHighlight;
}(_preact.Component);

exports["default"] = TapHighlight;

},{"../utils/ReactUtil.jsx":28,"./A.jsx":30,"preact":4}]},{},[16])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbmFub2lkL2Zvcm1hdC5icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9kZWJ1Zy9kaXN0L2RlYnVnLmpzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9kZXZ0b29scy9kaXN0L2RldnRvb2xzLmpzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9kaXN0L3ByZWFjdC5qcyIsIm5vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiLCJub2RlX21vZHVsZXMvc2hvcnRpZC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9hbHBoYWJldC5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9idWlsZC5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9nZW5lcmF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9pcy12YWxpZC5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9yYW5kb20vcmFuZG9tLWJ5dGUtYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9yYW5kb20vcmFuZG9tLWZyb20tc2VlZC5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi91dGlsL2NsdXN0ZXItd29ya2VyLWlkLWJyb3dzZXIuanMiLCJwYWNrYWdlLmpzb24iLCJzcmMvaW5kZXguanN4Iiwic3JjL21vZGVsL0FwcENvbnRyb2xsZXIuanMiLCJzcmMvbW9kZWwvQXBwSGVscGVyLmpzIiwic3JjL21vZGVsL0NvbmR1Y3Rvci5qcyIsInNyYy9tb2RlbC9Db25kdWN0b3JJbnN0cnVtZW50LmpzIiwic3JjL21vZGVsL0NvbmR1Y3RvckxheWVyLmpzIiwic3JjL21vZGVsL0NvbmR1Y3Rvck5vdGUuanMiLCJzcmMvbW9kZWwvZGVtb3NvbmdzLmpzIiwic3JjL3V0aWxzL0FwcENvbnRleHQuanMiLCJzcmMvdXRpbHMvQXVkaW9UaW1lci5qcyIsInNyYy91dGlscy9BdWRpb1V0aWwuanMiLCJzcmMvdXRpbHMvTXVzaWNVdGlsLmpzIiwic3JjL3V0aWxzL1JlYWN0VXRpbC5qc3giLCJzcmMvdXRpbHMvUmVjb25jaWxlQXJyYXkuanMiLCJzcmMvdmlldy9BLmpzeCIsInNyYy92aWV3L0Fib3V0U2NyZWVuLmpzeCIsInNyYy92aWV3L0FkZExheWVyLmpzeCIsInNyYy92aWV3L0FwcC5qc3giLCJzcmMvdmlldy9EaWFsb2cuanN4Iiwic3JjL3ZpZXcvRnJvbnQuanN4Iiwic3JjL3ZpZXcvSGVhZGVyLmpzeCIsInNyYy92aWV3L0xheWVyLmpzeCIsInNyYy92aWV3L0xheWVyU2V0dGluZ3MuanN4Iiwic3JjL3ZpZXcvU2VsZWN0Q2hvcmQuanN4Iiwic3JjL3ZpZXcvU29uZy5qc3giLCJzcmMvdmlldy9Tb25nQ2hvcmRzLmpzeCIsInNyYy92aWV3L1NvbmdMYXllcnMuanN4Iiwic3JjL3ZpZXcvU29uZ1NldHRpbmdzLmpzeCIsInNyYy92aWV3L1RhcEhpZ2hsaWdodC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0dEJBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzlDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLElBQUksU0FBSixFQUFlLFNBQWYs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QVQsQ0FBNkIsU0FBN0IsRUFBdUMsS0FBSyxTQUE1QztBQUNBOzs7NkJBRVE7QUFDUixhQUNDO0FBQUssaUJBQU07QUFBWCxTQUNFLG1CQUFHLEtBQUssS0FBTCxDQUFXLGFBQWQsRUFBNEI7QUFBQSxlQUM1QjtBQUFLLFVBQUEsR0FBRyxFQUFDO0FBQVQsVUFENEI7QUFBQSxPQUE1QixDQURGLENBREQ7QUFPQTs7OztFQTlDd0MsaUIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBUaGlzIGZpbGUgcmVwbGFjZXMgYGZvcm1hdC5qc2AgaW4gYnVuZGxlcnMgbGlrZSB3ZWJwYWNrIG9yIFJvbGx1cCxcbi8vIGFjY29yZGluZyB0byBgYnJvd3NlcmAgY29uZmlnIGluIGBwYWNrYWdlLmpzb25gLlxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChyYW5kb20sIGFscGhhYmV0LCBzaXplKSB7XG4gIC8vIFdlIGNhbuKAmXQgdXNlIGJ5dGVzIGJpZ2dlciB0aGFuIHRoZSBhbHBoYWJldC4gVG8gbWFrZSBieXRlcyB2YWx1ZXMgY2xvc2VyXG4gIC8vIHRvIHRoZSBhbHBoYWJldCwgd2UgYXBwbHkgYml0bWFzayBvbiB0aGVtLiBXZSBsb29rIGZvciB0aGUgY2xvc2VzdFxuICAvLyBgMiAqKiB4IC0gMWAgbnVtYmVyLCB3aGljaCB3aWxsIGJlIGJpZ2dlciB0aGFuIGFscGhhYmV0IHNpemUuIElmIHdlIGhhdmVcbiAgLy8gMzAgc3ltYm9scyBpbiB0aGUgYWxwaGFiZXQsIHdlIHdpbGwgdGFrZSAzMSAoMDAwMTExMTEpLlxuICAvLyBXZSBkbyBub3QgdXNlIGZhc3RlciBNYXRoLmNsejMyLCBiZWNhdXNlIGl0IGlzIG5vdCBhdmFpbGFibGUgaW4gYnJvd3NlcnMuXG4gIHZhciBtYXNrID0gKDIgPDwgTWF0aC5sb2coYWxwaGFiZXQubGVuZ3RoIC0gMSkgLyBNYXRoLkxOMikgLSAxXG4gIC8vIEJpdG1hc2sgaXMgbm90IGEgcGVyZmVjdCBzb2x1dGlvbiAoaW4gb3VyIGV4YW1wbGUgaXQgd2lsbCBwYXNzIDMxIGJ5dGVzLFxuICAvLyB3aGljaCBpcyBiaWdnZXIgdGhhbiB0aGUgYWxwaGFiZXQpLiBBcyBhIHJlc3VsdCwgd2Ugd2lsbCBuZWVkIG1vcmUgYnl0ZXMsXG4gIC8vIHRoYW4gSUQgc2l6ZSwgYmVjYXVzZSB3ZSB3aWxsIHJlZnVzZSBieXRlcyBiaWdnZXIgdGhhbiB0aGUgYWxwaGFiZXQuXG5cbiAgLy8gRXZlcnkgaGFyZHdhcmUgcmFuZG9tIGdlbmVyYXRvciBjYWxsIGlzIGNvc3RseSxcbiAgLy8gYmVjYXVzZSB3ZSBuZWVkIHRvIHdhaXQgZm9yIGVudHJvcHkgY29sbGVjdGlvbi4gVGhpcyBpcyB3aHkgb2Z0ZW4gaXQgd2lsbFxuICAvLyBiZSBmYXN0ZXIgdG8gYXNrIGZvciBmZXcgZXh0cmEgYnl0ZXMgaW4gYWR2YW5jZSwgdG8gYXZvaWQgYWRkaXRpb25hbCBjYWxscy5cblxuICAvLyBIZXJlIHdlIGNhbGN1bGF0ZSBob3cgbWFueSByYW5kb20gYnl0ZXMgc2hvdWxkIHdlIGNhbGwgaW4gYWR2YW5jZS5cbiAgLy8gSXQgZGVwZW5kcyBvbiBJRCBsZW5ndGgsIG1hc2sgLyBhbHBoYWJldCBzaXplIGFuZCBtYWdpYyBudW1iZXIgMS42XG4gIC8vICh3aGljaCB3YXMgc2VsZWN0ZWQgYWNjb3JkaW5nIGJlbmNobWFya3MpLlxuXG4gIC8vIC1+ZiA9PiBNYXRoLmNlaWwoZikgaWYgbiBpcyBmbG9hdCBudW1iZXJcbiAgLy8gLX5pID0+IGkgKyAxIGlmIG4gaXMgaW50ZWdlciBudW1iZXJcbiAgdmFyIHN0ZXAgPSAtfigxLjYgKiBtYXNrICogc2l6ZSAvIGFscGhhYmV0Lmxlbmd0aClcbiAgdmFyIGlkID0gJydcblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIHZhciBieXRlcyA9IHJhbmRvbShzdGVwKVxuICAgIC8vIENvbXBhY3QgYWx0ZXJuYXRpdmUgZm9yIGBmb3IgKHZhciBpID0gMDsgaSA8IHN0ZXA7IGkrKylgXG4gICAgdmFyIGkgPSBzdGVwXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgLy8gSWYgcmFuZG9tIGJ5dGUgaXMgYmlnZ2VyIHRoYW4gYWxwaGFiZXQgZXZlbiBhZnRlciBiaXRtYXNrLFxuICAgICAgLy8gd2UgcmVmdXNlIGl0IGJ5IGB8fCAnJ2AuXG4gICAgICBpZCArPSBhbHBoYWJldFtieXRlc1tpXSAmIG1hc2tdIHx8ICcnXG4gICAgICAvLyBNb3JlIGNvbXBhY3QgdGhhbiBgaWQubGVuZ3RoICsgMSA9PT0gc2l6ZWBcbiAgICAgIGlmIChpZC5sZW5ndGggPT09ICtzaXplKSByZXR1cm4gaWRcbiAgICB9XG4gIH1cbn1cbiIsInZhciBuPXJlcXVpcmUoXCJwcmVhY3RcIik7cmVxdWlyZShcInByZWFjdC9kZXZ0b29sc1wiKTt2YXIgZT17fTtmdW5jdGlvbiB0KGUpe3JldHVybiBlLnR5cGU9PT1uLkZyYWdtZW50P1wiRnJhZ21lbnRcIjpcImZ1bmN0aW9uXCI9PXR5cGVvZiBlLnR5cGU/ZS50eXBlLmRpc3BsYXlOYW1lfHxlLnR5cGUubmFtZTpcInN0cmluZ1wiPT10eXBlb2YgZS50eXBlP2UudHlwZTpcIiN0ZXh0XCJ9dmFyIG89W10scj1bXTtmdW5jdGlvbiBhKCl7cmV0dXJuIG8ubGVuZ3RoPjA/b1tvLmxlbmd0aC0xXTpudWxsfXZhciBpPSExO2Z1bmN0aW9uIHMoZSl7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgZS50eXBlJiZlLnR5cGUhPT1uLkZyYWdtZW50fWZ1bmN0aW9uIGMobil7Zm9yKHZhciBlPVtuXSxvPW47bnVsbCE9by5fX287KWUucHVzaChvLl9fbyksbz1vLl9fbztyZXR1cm4gZS5yZWR1Y2UoZnVuY3Rpb24obixlKXtuKz1cIiAgaW4gXCIrdChlKTt2YXIgbz1lLl9fc291cmNlO3JldHVybiBvP24rPVwiIChhdCBcIitvLmZpbGVOYW1lK1wiOlwiK28ubGluZU51bWJlcitcIilcIjppfHwoaT0hMCxjb25zb2xlLndhcm4oXCJBZGQgQGJhYmVsL3BsdWdpbi10cmFuc2Zvcm0tcmVhY3QtanN4LXNvdXJjZSB0byBnZXQgYSBtb3JlIGRldGFpbGVkIGNvbXBvbmVudCBzdGFjay4gTm90ZSB0aGF0IHlvdSBzaG91bGQgbm90IGFkZCBpdCB0byBwcm9kdWN0aW9uIGJ1aWxkcyBvZiB5b3VyIEFwcCBmb3IgYnVuZGxlIHNpemUgcmVhc29ucy5cIikpLG4rXCJcXG5cIn0sXCJcIil9dmFyIGw9XCJmdW5jdGlvblwiPT10eXBlb2YgV2Vha01hcCx1PW4uQ29tcG9uZW50LnByb3RvdHlwZS5zZXRTdGF0ZTtuLkNvbXBvbmVudC5wcm90b3R5cGUuc2V0U3RhdGU9ZnVuY3Rpb24obixlKXtyZXR1cm4gbnVsbD09dGhpcy5fX3Y/bnVsbD09dGhpcy5zdGF0ZSYmY29uc29sZS53YXJuKCdDYWxsaW5nIFwidGhpcy5zZXRTdGF0ZVwiIGluc2lkZSB0aGUgY29uc3RydWN0b3Igb2YgYSBjb21wb25lbnQgaXMgYSBuby1vcCBhbmQgbWlnaHQgYmUgYSBidWcgaW4geW91ciBhcHBsaWNhdGlvbi4gSW5zdGVhZCwgc2V0IFwidGhpcy5zdGF0ZSA9IHt9XCIgZGlyZWN0bHkuXFxuXFxuJytjKGEoKSkpOm51bGw9PXRoaXMuX19QJiZjb25zb2xlLndhcm4oJ0NhblxcJ3QgY2FsbCBcInRoaXMuc2V0U3RhdGVcIiBvbiBhbiB1bm1vdW50ZWQgY29tcG9uZW50LiBUaGlzIGlzIGEgbm8tb3AsIGJ1dCBpdCBpbmRpY2F0ZXMgYSBtZW1vcnkgbGVhayBpbiB5b3VyIGFwcGxpY2F0aW9uLiBUbyBmaXgsIGNhbmNlbCBhbGwgc3Vic2NyaXB0aW9ucyBhbmQgYXN5bmNocm9ub3VzIHRhc2tzIGluIHRoZSBjb21wb25lbnRXaWxsVW5tb3VudCBtZXRob2QuXFxuXFxuJytjKHRoaXMuX192KSksdS5jYWxsKHRoaXMsbixlKX07dmFyIGY9bi5Db21wb25lbnQucHJvdG90eXBlLmZvcmNlVXBkYXRlO2Z1bmN0aW9uIHAobil7dmFyIGU9bi5wcm9wcyxvPXQobikscj1cIlwiO2Zvcih2YXIgYSBpbiBlKWlmKGUuaGFzT3duUHJvcGVydHkoYSkmJlwiY2hpbGRyZW5cIiE9PWEpe3ZhciBpPWVbYV07XCJmdW5jdGlvblwiPT10eXBlb2YgaSYmKGk9XCJmdW5jdGlvbiBcIisoaS5kaXNwbGF5TmFtZXx8aS5uYW1lKStcIigpIHt9XCIpLGk9T2JqZWN0KGkpIT09aXx8aS50b1N0cmluZz9pK1wiXCI6T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGkpLHIrPVwiIFwiK2ErXCI9XCIrSlNPTi5zdHJpbmdpZnkoaSl9dmFyIHM9ZS5jaGlsZHJlbjtyZXR1cm5cIjxcIitvK3IrKHMmJnMubGVuZ3RoP1wiPi4uPC9cIitvK1wiPlwiOlwiIC8+XCIpfW4uQ29tcG9uZW50LnByb3RvdHlwZS5mb3JjZVVwZGF0ZT1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09dGhpcy5fX3Y/Y29uc29sZS53YXJuKCdDYWxsaW5nIFwidGhpcy5mb3JjZVVwZGF0ZVwiIGluc2lkZSB0aGUgY29uc3RydWN0b3Igb2YgYSBjb21wb25lbnQgaXMgYSBuby1vcCBhbmQgbWlnaHQgYmUgYSBidWcgaW4geW91ciBhcHBsaWNhdGlvbi5cXG5cXG4nK2MoYSgpKSk6bnVsbD09dGhpcy5fX1AmJmNvbnNvbGUud2FybignQ2FuXFwndCBjYWxsIFwidGhpcy5mb3JjZVVwZGF0ZVwiIG9uIGFuIHVubW91bnRlZCBjb21wb25lbnQuIFRoaXMgaXMgYSBuby1vcCwgYnV0IGl0IGluZGljYXRlcyBhIG1lbW9yeSBsZWFrIGluIHlvdXIgYXBwbGljYXRpb24uIFRvIGZpeCwgY2FuY2VsIGFsbCBzdWJzY3JpcHRpb25zIGFuZCBhc3luY2hyb25vdXMgdGFza3MgaW4gdGhlIGNvbXBvbmVudFdpbGxVbm1vdW50IG1ldGhvZC5cXG5cXG4nK2ModGhpcy5fX3YpKSxmLmNhbGwodGhpcyxuKX0sZnVuY3Rpb24oKXshZnVuY3Rpb24oKXt2YXIgZT1uLm9wdGlvbnMuX19iLHQ9bi5vcHRpb25zLmRpZmZlZCxhPW4ub3B0aW9ucy5fXyxpPW4ub3B0aW9ucy52bm9kZSxjPW4ub3B0aW9ucy5fX3I7bi5vcHRpb25zLmRpZmZlZD1mdW5jdGlvbihuKXtzKG4pJiZyLnBvcCgpLG8ucG9wKCksdCYmdChuKX0sbi5vcHRpb25zLl9fYj1mdW5jdGlvbihuKXtzKG4pJiZvLnB1c2gobiksZSYmZShuKX0sbi5vcHRpb25zLl9fPWZ1bmN0aW9uKG4sZSl7cj1bXSxhJiZhKG4sZSl9LG4ub3B0aW9ucy52bm9kZT1mdW5jdGlvbihuKXtuLl9fbz1yLmxlbmd0aD4wP3Jbci5sZW5ndGgtMV06bnVsbCxpJiZpKG4pfSxuLm9wdGlvbnMuX19yPWZ1bmN0aW9uKG4pe3MobikmJnIucHVzaChuKSxjJiZjKG4pfX0oKTt2YXIgYT1uLm9wdGlvbnMuX19iLGk9bi5vcHRpb25zLmRpZmZlZCx1PW4ub3B0aW9ucy52bm9kZSxmPW4ub3B0aW9ucy5fX2UsZD1uLm9wdGlvbnMuX18saD1uLm9wdGlvbnMuX19oLHk9bD97dXNlRWZmZWN0Om5ldyBXZWFrTWFwLHVzZUxheW91dEVmZmVjdDpuZXcgV2Vha01hcCxsYXp5UHJvcFR5cGVzOm5ldyBXZWFrTWFwfTpudWxsO24ub3B0aW9ucy5fX2U9ZnVuY3Rpb24obixlLG8pe2lmKGUmJmUuX19jJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBuLnRoZW4pe3ZhciByPW47bj1uZXcgRXJyb3IoXCJNaXNzaW5nIFN1c3BlbnNlLiBUaGUgdGhyb3dpbmcgY29tcG9uZW50IHdhczogXCIrdChlKSk7Zm9yKHZhciBhPWU7YTthPWEuX18paWYoYS5fX2MmJmEuX19jLl9fYyl7bj1yO2JyZWFrfWlmKG4gaW5zdGFuY2VvZiBFcnJvcil0aHJvdyBufWYobixlLG8pfSxuLm9wdGlvbnMuX189ZnVuY3Rpb24obixlKXtpZighZSl0aHJvdyBuZXcgRXJyb3IoXCJVbmRlZmluZWQgcGFyZW50IHBhc3NlZCB0byByZW5kZXIoKSwgdGhpcyBpcyB0aGUgc2Vjb25kIGFyZ3VtZW50LlxcbkNoZWNrIGlmIHRoZSBlbGVtZW50IGlzIGF2YWlsYWJsZSBpbiB0aGUgRE9NL2hhcyB0aGUgY29ycmVjdCBpZC5cIik7dmFyIG87c3dpdGNoKGUubm9kZVR5cGUpe2Nhc2UgMTpjYXNlIDExOmNhc2UgOTpvPSEwO2JyZWFrO2RlZmF1bHQ6bz0hMX1pZighbyl7dmFyIHI9dChuKTt0aHJvdyBuZXcgRXJyb3IoXCJFeHBlY3RlZCBhIHZhbGlkIEhUTUwgbm9kZSBhcyBhIHNlY29uZCBhcmd1bWVudCB0byByZW5kZXIuXFx0UmVjZWl2ZWQgXCIrZStcIiBpbnN0ZWFkOiByZW5kZXIoPFwiK3IrXCIgLz4sIFwiK2UrXCIpO1wiKX1kJiZkKG4sZSl9LG4ub3B0aW9ucy5fX2I9ZnVuY3Rpb24obil7dmFyIG8scixpLHMsbD1uLnR5cGUsdT1mdW5jdGlvbiBuKGUpe3JldHVybiBlP1wiZnVuY3Rpb25cIj09dHlwZW9mIGUudHlwZT9uKGUuX18pOmU6e319KG4uX18pO2lmKHZvaWQgMD09PWwpdGhyb3cgbmV3IEVycm9yKFwiVW5kZWZpbmVkIGNvbXBvbmVudCBwYXNzZWQgdG8gY3JlYXRlRWxlbWVudCgpXFxuXFxuWW91IGxpa2VseSBmb3Jnb3QgdG8gZXhwb3J0IHlvdXIgY29tcG9uZW50IG9yIG1pZ2h0IGhhdmUgbWl4ZWQgdXAgZGVmYXVsdCBhbmQgbmFtZWQgaW1wb3J0c1wiK3AobikrXCJcXG5cXG5cIitjKG4pKTtpZihudWxsIT1sJiZcIm9iamVjdFwiPT10eXBlb2YgbCl7aWYodm9pZCAwIT09bC5fX2smJnZvaWQgMCE9PWwuX19lKXRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdHlwZSBwYXNzZWQgdG8gY3JlYXRlRWxlbWVudCgpOiBcIitsK1wiXFxuXFxuRGlkIHlvdSBhY2NpZGVudGFsbHkgcGFzcyBhIEpTWCBsaXRlcmFsIGFzIEpTWCB0d2ljZT9cXG5cXG4gIGxldCBNeVwiK3QobikrXCIgPSBcIitwKGwpK1wiO1xcbiAgbGV0IHZub2RlID0gPE15XCIrdChuKStcIiAvPjtcXG5cXG5UaGlzIHVzdWFsbHkgaGFwcGVucyB3aGVuIHlvdSBleHBvcnQgYSBKU1ggbGl0ZXJhbCBhbmQgbm90IHRoZSBjb21wb25lbnQuXFxuXFxuXCIrYyhuKSk7dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB0eXBlIHBhc3NlZCB0byBjcmVhdGVFbGVtZW50KCk6IFwiKyhBcnJheS5pc0FycmF5KGwpP1wiYXJyYXlcIjpsKSl9aWYoXCJ0aGVhZFwiIT09bCYmXCJ0Zm9vdFwiIT09bCYmXCJ0Ym9keVwiIT09bHx8XCJ0YWJsZVwiPT09dS50eXBlP1widHJcIj09PWwmJlwidGhlYWRcIiE9PXUudHlwZSYmXCJ0Zm9vdFwiIT09dS50eXBlJiZcInRib2R5XCIhPT11LnR5cGUmJlwidGFibGVcIiE9PXUudHlwZT9jb25zb2xlLmVycm9yKFwiSW1wcm9wZXIgbmVzdGluZyBvZiB0YWJsZS4gWW91ciA8dHI+IHNob3VsZCBoYXZlIGEgPHRoZWFkL3Rib2R5L3Rmb290L3RhYmxlPiBwYXJlbnQuXCIrcChuKStcIlxcblxcblwiK2MobikpOlwidGRcIj09PWwmJlwidHJcIiE9PXUudHlwZT9jb25zb2xlLmVycm9yKFwiSW1wcm9wZXIgbmVzdGluZyBvZiB0YWJsZS4gWW91ciA8dGQ+IHNob3VsZCBoYXZlIGEgPHRyPiBwYXJlbnQuXCIrcChuKStcIlxcblxcblwiK2MobikpOlwidGhcIj09PWwmJlwidHJcIiE9PXUudHlwZSYmY29uc29sZS5lcnJvcihcIkltcHJvcGVyIG5lc3Rpbmcgb2YgdGFibGUuIFlvdXIgPHRoPiBzaG91bGQgaGF2ZSBhIDx0cj4uXCIrcChuKStcIlxcblxcblwiK2MobikpOmNvbnNvbGUuZXJyb3IoXCJJbXByb3BlciBuZXN0aW5nIG9mIHRhYmxlLiBZb3VyIDx0aGVhZC90Ym9keS90Zm9vdD4gc2hvdWxkIGhhdmUgYSA8dGFibGU+IHBhcmVudC5cIitwKG4pK1wiXFxuXFxuXCIrYyhuKSksdm9pZCAwIT09bi5yZWYmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIG4ucmVmJiZcIm9iamVjdFwiIT10eXBlb2Ygbi5yZWYmJiEoXCIkJHR5cGVvZlwiaW4gbikpdGhyb3cgbmV3IEVycm9yKCdDb21wb25lbnRcXCdzIFwicmVmXCIgcHJvcGVydHkgc2hvdWxkIGJlIGEgZnVuY3Rpb24sIG9yIGFuIG9iamVjdCBjcmVhdGVkIGJ5IGNyZWF0ZVJlZigpLCBidXQgZ290IFsnK3R5cGVvZiBuLnJlZitcIl0gaW5zdGVhZFxcblwiK3AobikrXCJcXG5cXG5cIitjKG4pKTtpZihcInN0cmluZ1wiPT10eXBlb2Ygbi50eXBlKWZvcih2YXIgZiBpbiBuLnByb3BzKWlmKFwib1wiPT09ZlswXSYmXCJuXCI9PT1mWzFdJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiBuLnByb3BzW2ZdJiZudWxsIT1uLnByb3BzW2ZdKXRocm93IG5ldyBFcnJvcihcIkNvbXBvbmVudCdzIFxcXCJcIitmKydcIiBwcm9wZXJ0eSBzaG91bGQgYmUgYSBmdW5jdGlvbiwgYnV0IGdvdCBbJyt0eXBlb2Ygbi5wcm9wc1tmXStcIl0gaW5zdGVhZFxcblwiK3AobikrXCJcXG5cXG5cIitjKG4pKTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBuLnR5cGUmJm4udHlwZS5wcm9wVHlwZXMpe2lmKFwiTGF6eVwiPT09bi50eXBlLmRpc3BsYXlOYW1lJiZ5JiYheS5sYXp5UHJvcFR5cGVzLmhhcyhuLnR5cGUpKXt2YXIgZD1cIlByb3BUeXBlcyBhcmUgbm90IHN1cHBvcnRlZCBvbiBsYXp5KCkuIFVzZSBwcm9wVHlwZXMgb24gdGhlIHdyYXBwZWQgY29tcG9uZW50IGl0c2VsZi4gXCI7dHJ5e3ZhciBoPW4udHlwZSgpO3kubGF6eVByb3BUeXBlcy5zZXQobi50eXBlLCEwKSxjb25zb2xlLndhcm4oZCtcIkNvbXBvbmVudCB3cmFwcGVkIGluIGxhenkoKSBpcyBcIit0KGgpKX1jYXRjaChuKXtjb25zb2xlLndhcm4oZCtcIldlIHdpbGwgbG9nIHRoZSB3cmFwcGVkIGNvbXBvbmVudCdzIG5hbWUgb25jZSBpdCBpcyBsb2FkZWQuXCIpfX1vPW4udHlwZS5wcm9wVHlwZXMscj1uLnByb3BzLGk9dChuKSxzPXAobiksT2JqZWN0LmtleXMobykuZm9yRWFjaChmdW5jdGlvbihuKXt2YXIgdDt0cnl7dD1vW25dKHIsbixzLGksbnVsbCxcIlNFQ1JFVF9ET19OT1RfUEFTU19USElTX09SX1lPVV9XSUxMX0JFX0ZJUkVEXCIpfWNhdGNoKG4pe3Q9bn0hdHx8dC5tZXNzYWdlIGluIGV8fChlW3QubWVzc2FnZV09ITAsY29uc29sZS5lcnJvcihcIkZhaWxlZCBcIitpK1wiIHR5cGU6IFwiK3QubWVzc2FnZSkpfSl9YSYmYShuKX0sbi5vcHRpb25zLl9faD1mdW5jdGlvbihuKXtpZighbil0aHJvdyBuZXcgRXJyb3IoXCJIb29rIGNhbiBvbmx5IGJlIGludm9rZWQgZnJvbSByZW5kZXIgbWV0aG9kcy5cIik7aCYmaChuKX07dmFyIHY9ZnVuY3Rpb24obixlKXtyZXR1cm57Z2V0OmZ1bmN0aW9uKCl7dGhyb3cgbmV3IEVycm9yKFwiZ2V0dGluZyB2bm9kZS5cIituK1wiIGlzIGRlcHJlY2F0ZWQsIFwiK2UpfSxzZXQ6ZnVuY3Rpb24oKXt0aHJvdyBuZXcgRXJyb3IoXCJzZXR0aW5nIHZub2RlLlwiK24rXCIgaXMgbm90IGFsbG93ZWQsIFwiK2UpfX19LG09e25vZGVOYW1lOnYoXCJub2RlTmFtZVwiLFwidXNlIHZub2RlLnR5cGVcIiksYXR0cmlidXRlczp2KFwiYXR0cmlidXRlc1wiLFwidXNlIHZub2RlLnByb3BzXCIpLGNoaWxkcmVuOnYoXCJjaGlsZHJlblwiLFwidXNlIHZub2RlLnByb3BzLmNoaWxkcmVuXCIpfSxiPU9iamVjdC5jcmVhdGUoe30sbSk7bi5vcHRpb25zLnZub2RlPWZ1bmN0aW9uKG4pe3ZhciBlPW4ucHJvcHM7aWYobnVsbCE9PW4udHlwZSYmbnVsbCE9ZSYmKFwiX19zb3VyY2VcImluIGV8fFwiX19zZWxmXCJpbiBlKSl7dmFyIHQ9bi5wcm9wcz17fTtmb3IodmFyIG8gaW4gZSl7dmFyIHI9ZVtvXTtcIl9fc291cmNlXCI9PT1vP24uX19zb3VyY2U9cjpcIl9fc2VsZlwiPT09bz9uLl9fc2VsZj1yOnRbb109cn19T2JqZWN0LnNldFByb3RvdHlwZU9mKG4sYiksdSYmdShuKX0sbi5vcHRpb25zLmRpZmZlZD1mdW5jdGlvbihuKXtuLl9fayYmbi5fX2suZm9yRWFjaChmdW5jdGlvbihuKXtpZihuJiZ2b2lkIDA9PT1uLnR5cGUpe2RlbGV0ZSBuLl9fLGRlbGV0ZSBuLl9fYjt2YXIgZT1PYmplY3Qua2V5cyhuKS5qb2luKFwiLFwiKTt0aHJvdyBuZXcgRXJyb3IoXCJPYmplY3RzIGFyZSBub3QgdmFsaWQgYXMgYSBjaGlsZC4gRW5jb3VudGVyZWQgYW4gb2JqZWN0IHdpdGggdGhlIGtleXMge1wiK2UrXCJ9LlwiKX19KTt2YXIgZT1uLl9fYztpZihlJiZlLl9fSCl7dmFyIG89ZS5fX0g7QXJyYXkuaXNBcnJheShvLl9fKSYmby5fXy5mb3JFYWNoKGZ1bmN0aW9uKGUpe2lmKGUuX19oJiYoIWUuX19IfHwhQXJyYXkuaXNBcnJheShlLl9fSCkpKXt2YXIgbz10KG4pO2NvbnNvbGUud2FybihcIkluIFwiK28rXCIgeW91IGFyZSBjYWxsaW5nIHVzZU1lbW8vdXNlQ2FsbGJhY2sgd2l0aG91dCBwYXNzaW5nIGFyZ3VtZW50cy5cXG5UaGlzIGlzIGEgbm9vcCBzaW5jZSBpdCB3aWxsIG5vdCBiZSBhYmxlIHRvIG1lbW9pemUsIGl0IHdpbGwgZXhlY3V0ZSBpdCBldmVyeSByZW5kZXIuXFxuXFxuXCIrYyhuKSl9fSl9aWYoaSYmaShuKSxudWxsIT1uLl9faylmb3IodmFyIHI9W10sYT0wO2E8bi5fX2subGVuZ3RoO2ErKyl7dmFyIHM9bi5fX2tbYV07aWYocyYmbnVsbCE9cy5rZXkpe3ZhciBsPXMua2V5O2lmKC0xIT09ci5pbmRleE9mKGwpKXtjb25zb2xlLmVycm9yKCdGb2xsb3dpbmcgY29tcG9uZW50IGhhcyB0d28gb3IgbW9yZSBjaGlsZHJlbiB3aXRoIHRoZSBzYW1lIGtleSBhdHRyaWJ1dGU6IFwiJytsKydcIi4gVGhpcyBtYXkgY2F1c2UgZ2xpdGNoZXMgYW5kIG1pc2JlaGF2aW9yIGluIHJlbmRlcmluZyBwcm9jZXNzLiBDb21wb25lbnQ6IFxcblxcbicrcChuKStcIlxcblxcblwiK2MobikpO2JyZWFrfXIucHVzaChsKX19fX0oKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRlYnVnLmpzLm1hcFxuIiwidmFyIGU9cmVxdWlyZShcInByZWFjdFwiKTtcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiZ3aW5kb3cuX19QUkVBQ1RfREVWVE9PTFNfXyYmd2luZG93Ll9fUFJFQUNUX0RFVlRPT0xTX18uYXR0YWNoUHJlYWN0KFwiMTAuMC41XCIsZS5vcHRpb25zLHtGcmFnbWVudDplLkZyYWdtZW50fSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZXZ0b29scy5qcy5tYXBcbiIsInZhciBuLGwsdSx0LGksbyxyLGY9e30sZT1bXSxjPS9hY2l0fGV4KD86c3xnfG58cHwkKXxycGh8Z3JpZHxvd3N8bW5jfG50d3xpbmVbY2hdfHpvb3xeb3JkL2k7ZnVuY3Rpb24gcyhuLGwpe2Zvcih2YXIgdSBpbiBsKW5bdV09bFt1XTtyZXR1cm4gbn1mdW5jdGlvbiBhKG4pe3ZhciBsPW4ucGFyZW50Tm9kZTtsJiZsLnJlbW92ZUNoaWxkKG4pfWZ1bmN0aW9uIHAobixsLHUpe3ZhciB0LGk9YXJndW1lbnRzLG89e307Zm9yKHQgaW4gbClcImtleVwiIT09dCYmXCJyZWZcIiE9PXQmJihvW3RdPWxbdF0pO2lmKGFyZ3VtZW50cy5sZW5ndGg+Mylmb3IodT1bdV0sdD0zO3Q8YXJndW1lbnRzLmxlbmd0aDt0KyspdS5wdXNoKGlbdF0pO2lmKG51bGwhPXUmJihvLmNoaWxkcmVuPXUpLFwiZnVuY3Rpb25cIj09dHlwZW9mIG4mJm51bGwhPW4uZGVmYXVsdFByb3BzKWZvcih0IGluIG4uZGVmYXVsdFByb3BzKXZvaWQgMD09PW9bdF0mJihvW3RdPW4uZGVmYXVsdFByb3BzW3RdKTtyZXR1cm4gdihuLG8sbCYmbC5rZXksbCYmbC5yZWYpfWZ1bmN0aW9uIHYobCx1LHQsaSl7dmFyIG89e3R5cGU6bCxwcm9wczp1LGtleTp0LHJlZjppLF9fazpudWxsLF9fOm51bGwsX19iOjAsX19lOm51bGwsX19kOnZvaWQgMCxfX2M6bnVsbCxjb25zdHJ1Y3Rvcjp2b2lkIDB9O3JldHVybiBuLnZub2RlJiZuLnZub2RlKG8pLG99ZnVuY3Rpb24gaChuKXtyZXR1cm4gbi5jaGlsZHJlbn1mdW5jdGlvbiBkKG4sbCl7dGhpcy5wcm9wcz1uLHRoaXMuY29udGV4dD1sfWZ1bmN0aW9uIHkobixsKXtpZihudWxsPT1sKXJldHVybiBuLl9fP3kobi5fXyxuLl9fLl9fay5pbmRleE9mKG4pKzEpOm51bGw7Zm9yKHZhciB1O2w8bi5fX2subGVuZ3RoO2wrKylpZihudWxsIT0odT1uLl9fa1tsXSkmJm51bGwhPXUuX19lKXJldHVybiB1Ll9fZTtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBuLnR5cGU/eShuKTpudWxsfWZ1bmN0aW9uIHgobil7dmFyIGwsdTtpZihudWxsIT0obj1uLl9fKSYmbnVsbCE9bi5fX2Mpe2ZvcihuLl9fZT1uLl9fYy5iYXNlPW51bGwsbD0wO2w8bi5fX2subGVuZ3RoO2wrKylpZihudWxsIT0odT1uLl9fa1tsXSkmJm51bGwhPXUuX19lKXtuLl9fZT1uLl9fYy5iYXNlPXUuX19lO2JyZWFrfXJldHVybiB4KG4pfX1mdW5jdGlvbiBtKGwpeyghbC5fX2QmJihsLl9fZD0hMCkmJjE9PT11LnB1c2gobCl8fGkhPT1uLmRlYm91bmNlUmVuZGVyaW5nKSYmKChpPW4uZGVib3VuY2VSZW5kZXJpbmcpfHx0KSh3KX1mdW5jdGlvbiB3KCl7dmFyIG4sbCx0LGksbyxyLGY7Zm9yKHUuc29ydChmdW5jdGlvbihuLGwpe3JldHVybiBsLl9fdi5fX2Itbi5fX3YuX19ifSk7bj11LnBvcCgpOyluLl9fZCYmKHQ9dm9pZCAwLGk9dm9pZCAwLHI9KG89KGw9bikuX192KS5fX2UsKGY9bC5fX1ApJiYodD1bXSxpPU4oZixvLHMoe30sbyksbC5fX24sdm9pZCAwIT09Zi5vd25lclNWR0VsZW1lbnQsbnVsbCx0LG51bGw9PXI/eShvKTpyKSx6KHQsbyksaSE9ciYmeChvKSkpfWZ1bmN0aW9uIGcobixsLHUsdCxpLG8scixjLHMpe3ZhciBwLHYsaCxkLHgsbSx3LGc9dSYmdS5fX2t8fGUsXz1nLmxlbmd0aDtpZihjPT1mJiYoYz1udWxsIT1vP29bMF06Xz95KHUsMCk6bnVsbCkscD0wLGwuX19rPWsobC5fX2ssZnVuY3Rpb24odSl7aWYobnVsbCE9dSl7aWYodS5fXz1sLHUuX19iPWwuX19iKzEsbnVsbD09PShoPWdbcF0pfHxoJiZ1LmtleT09aC5rZXkmJnUudHlwZT09PWgudHlwZSlnW3BdPXZvaWQgMDtlbHNlIGZvcih2PTA7djxfO3YrKyl7aWYoKGg9Z1t2XSkmJnUua2V5PT1oLmtleSYmdS50eXBlPT09aC50eXBlKXtnW3ZdPXZvaWQgMDticmVha31oPW51bGx9aWYoZD1OKG4sdSxoPWh8fGYsdCxpLG8scixjLHMpLCh2PXUucmVmKSYmaC5yZWYhPXYmJih3fHwodz1bXSksaC5yZWYmJncucHVzaChoLnJlZixudWxsLHUpLHcucHVzaCh2LHUuX19jfHxkLHUpKSxudWxsIT1kKXt2YXIgZTtpZihudWxsPT1tJiYobT1kKSx2b2lkIDAhPT11Ll9fZCllPXUuX19kLHUuX19kPXZvaWQgMDtlbHNlIGlmKG89PWh8fGQhPWN8fG51bGw9PWQucGFyZW50Tm9kZSl7bjppZihudWxsPT1jfHxjLnBhcmVudE5vZGUhPT1uKW4uYXBwZW5kQ2hpbGQoZCksZT1udWxsO2Vsc2V7Zm9yKHg9Yyx2PTA7KHg9eC5uZXh0U2libGluZykmJnY8Xzt2Kz0yKWlmKHg9PWQpYnJlYWsgbjtuLmluc2VydEJlZm9yZShkLGMpLGU9Y31cIm9wdGlvblwiPT1sLnR5cGUmJihuLnZhbHVlPVwiXCIpfWM9dm9pZCAwIT09ZT9lOmQubmV4dFNpYmxpbmcsXCJmdW5jdGlvblwiPT10eXBlb2YgbC50eXBlJiYobC5fX2Q9Yyl9ZWxzZSBjJiZoLl9fZT09YyYmYy5wYXJlbnROb2RlIT1uJiYoYz15KGgpKX1yZXR1cm4gcCsrLHV9KSxsLl9fZT1tLG51bGwhPW8mJlwiZnVuY3Rpb25cIiE9dHlwZW9mIGwudHlwZSlmb3IocD1vLmxlbmd0aDtwLS07KW51bGwhPW9bcF0mJmEob1twXSk7Zm9yKHA9XztwLS07KW51bGwhPWdbcF0mJiQoZ1twXSxnW3BdKTtpZih3KWZvcihwPTA7cDx3Lmxlbmd0aDtwKyspVCh3W3BdLHdbKytwXSx3WysrcF0pfWZ1bmN0aW9uIGsobixsLHUpe2lmKG51bGw9PXUmJih1PVtdKSxudWxsPT1ufHxcImJvb2xlYW5cIj09dHlwZW9mIG4pbCYmdS5wdXNoKGwobnVsbCkpO2Vsc2UgaWYoQXJyYXkuaXNBcnJheShuKSlmb3IodmFyIHQ9MDt0PG4ubGVuZ3RoO3QrKylrKG5bdF0sbCx1KTtlbHNlIHUucHVzaChsP2woXCJzdHJpbmdcIj09dHlwZW9mIG58fFwibnVtYmVyXCI9PXR5cGVvZiBuP3YobnVsbCxuLG51bGwsbnVsbCk6bnVsbCE9bi5fX2V8fG51bGwhPW4uX19jP3Yobi50eXBlLG4ucHJvcHMsbi5rZXksbnVsbCk6bik6bik7cmV0dXJuIHV9ZnVuY3Rpb24gXyhuLGwsdSx0LGkpe3ZhciBvO2ZvcihvIGluIHUpbyBpbiBsfHxQKG4sbyxudWxsLHVbb10sdCk7Zm9yKG8gaW4gbClpJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiBsW29dfHxcInZhbHVlXCI9PT1vfHxcImNoZWNrZWRcIj09PW98fHVbb109PT1sW29dfHxQKG4sbyxsW29dLHVbb10sdCl9ZnVuY3Rpb24gYihuLGwsdSl7XCItXCI9PT1sWzBdP24uc2V0UHJvcGVydHkobCx1KTpuW2xdPVwibnVtYmVyXCI9PXR5cGVvZiB1JiYhMT09PWMudGVzdChsKT91K1wicHhcIjpudWxsPT11P1wiXCI6dX1mdW5jdGlvbiBQKG4sbCx1LHQsaSl7dmFyIG8scixmLGUsYztpZihpP1wiY2xhc3NOYW1lXCI9PT1sJiYobD1cImNsYXNzXCIpOlwiY2xhc3NcIj09PWwmJihsPVwiY2xhc3NOYW1lXCIpLFwia2V5XCI9PT1sfHxcImNoaWxkcmVuXCI9PT1sKTtlbHNlIGlmKFwic3R5bGVcIj09PWwpaWYobz1uLnN0eWxlLFwic3RyaW5nXCI9PXR5cGVvZiB1KW8uY3NzVGV4dD11O2Vsc2V7aWYoXCJzdHJpbmdcIj09dHlwZW9mIHQmJihvLmNzc1RleHQ9XCJcIix0PW51bGwpLHQpZm9yKHIgaW4gdCl1JiZyIGluIHV8fGIobyxyLFwiXCIpO2lmKHUpZm9yKGYgaW4gdSl0JiZ1W2ZdPT09dFtmXXx8YihvLGYsdVtmXSl9ZWxzZVwib1wiPT09bFswXSYmXCJuXCI9PT1sWzFdPyhlPWwhPT0obD1sLnJlcGxhY2UoL0NhcHR1cmUkLyxcIlwiKSksYz1sLnRvTG93ZXJDYXNlKCksbD0oYyBpbiBuP2M6bCkuc2xpY2UoMiksdT8odHx8bi5hZGRFdmVudExpc3RlbmVyKGwsQyxlKSwobi5sfHwobi5sPXt9KSlbbF09dSk6bi5yZW1vdmVFdmVudExpc3RlbmVyKGwsQyxlKSk6XCJsaXN0XCIhPT1sJiZcInRhZ05hbWVcIiE9PWwmJlwiZm9ybVwiIT09bCYmXCJ0eXBlXCIhPT1sJiZcInNpemVcIiE9PWwmJiFpJiZsIGluIG4/bltsXT1udWxsPT11P1wiXCI6dTpcImZ1bmN0aW9uXCIhPXR5cGVvZiB1JiZcImRhbmdlcm91c2x5U2V0SW5uZXJIVE1MXCIhPT1sJiYobCE9PShsPWwucmVwbGFjZSgvXnhsaW5rOj8vLFwiXCIpKT9udWxsPT11fHwhMT09PXU/bi5yZW1vdmVBdHRyaWJ1dGVOUyhcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIixsLnRvTG93ZXJDYXNlKCkpOm4uc2V0QXR0cmlidXRlTlMoXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIsbC50b0xvd2VyQ2FzZSgpLHUpOm51bGw9PXV8fCExPT09dSYmIS9eYXIvLnRlc3QobCk/bi5yZW1vdmVBdHRyaWJ1dGUobCk6bi5zZXRBdHRyaWJ1dGUobCx1KSl9ZnVuY3Rpb24gQyhsKXt0aGlzLmxbbC50eXBlXShuLmV2ZW50P24uZXZlbnQobCk6bCl9ZnVuY3Rpb24gTihsLHUsdCxpLG8scixmLGUsYyl7dmFyIGEscCx2LHkseCxtLHcsayxfLGIsUD11LnR5cGU7aWYodm9pZCAwIT09dS5jb25zdHJ1Y3RvcilyZXR1cm4gbnVsbDsoYT1uLl9fYikmJmEodSk7dHJ5e246aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgUCl7aWYoaz11LnByb3BzLF89KGE9UC5jb250ZXh0VHlwZSkmJmlbYS5fX2NdLGI9YT9fP18ucHJvcHMudmFsdWU6YS5fXzppLHQuX19jP3c9KHA9dS5fX2M9dC5fX2MpLl9fPXAuX19FOihcInByb3RvdHlwZVwiaW4gUCYmUC5wcm90b3R5cGUucmVuZGVyP3UuX19jPXA9bmV3IFAoayxiKToodS5fX2M9cD1uZXcgZChrLGIpLHAuY29uc3RydWN0b3I9UCxwLnJlbmRlcj1qKSxfJiZfLnN1YihwKSxwLnByb3BzPWsscC5zdGF0ZXx8KHAuc3RhdGU9e30pLHAuY29udGV4dD1iLHAuX19uPWksdj1wLl9fZD0hMCxwLl9faD1bXSksbnVsbD09cC5fX3MmJihwLl9fcz1wLnN0YXRlKSxudWxsIT1QLmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyYmKHAuX19zPT1wLnN0YXRlJiYocC5fX3M9cyh7fSxwLl9fcykpLHMocC5fX3MsUC5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMoayxwLl9fcykpKSx5PXAucHJvcHMseD1wLnN0YXRlLHYpbnVsbD09UC5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMmJm51bGwhPXAuY29tcG9uZW50V2lsbE1vdW50JiZwLmNvbXBvbmVudFdpbGxNb3VudCgpLG51bGwhPXAuY29tcG9uZW50RGlkTW91bnQmJnAuX19oLnB1c2gocC5jb21wb25lbnREaWRNb3VudCk7ZWxzZXtpZihudWxsPT1QLmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyYmayE9PXkmJm51bGwhPXAuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyYmcC5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKGssYiksIXAuX19lJiZudWxsIT1wLnNob3VsZENvbXBvbmVudFVwZGF0ZSYmITE9PT1wLnNob3VsZENvbXBvbmVudFVwZGF0ZShrLHAuX19zLGIpKXtmb3IocC5wcm9wcz1rLHAuc3RhdGU9cC5fX3MscC5fX2Q9ITEscC5fX3Y9dSx1Ll9fZT10Ll9fZSx1Ll9faz10Ll9fayxwLl9faC5sZW5ndGgmJmYucHVzaChwKSxhPTA7YTx1Ll9fay5sZW5ndGg7YSsrKXUuX19rW2FdJiYodS5fX2tbYV0uX189dSk7YnJlYWsgbn1udWxsIT1wLmNvbXBvbmVudFdpbGxVcGRhdGUmJnAuY29tcG9uZW50V2lsbFVwZGF0ZShrLHAuX19zLGIpLG51bGwhPXAuY29tcG9uZW50RGlkVXBkYXRlJiZwLl9faC5wdXNoKGZ1bmN0aW9uKCl7cC5jb21wb25lbnREaWRVcGRhdGUoeSx4LG0pfSl9cC5jb250ZXh0PWIscC5wcm9wcz1rLHAuc3RhdGU9cC5fX3MsKGE9bi5fX3IpJiZhKHUpLHAuX19kPSExLHAuX192PXUscC5fX1A9bCxhPXAucmVuZGVyKHAucHJvcHMscC5zdGF0ZSxwLmNvbnRleHQpLHUuX19rPW51bGwhPWEmJmEudHlwZT09aCYmbnVsbD09YS5rZXk/YS5wcm9wcy5jaGlsZHJlbjpBcnJheS5pc0FycmF5KGEpP2E6W2FdLG51bGwhPXAuZ2V0Q2hpbGRDb250ZXh0JiYoaT1zKHMoe30saSkscC5nZXRDaGlsZENvbnRleHQoKSkpLHZ8fG51bGw9PXAuZ2V0U25hcHNob3RCZWZvcmVVcGRhdGV8fChtPXAuZ2V0U25hcHNob3RCZWZvcmVVcGRhdGUoeSx4KSksZyhsLHUsdCxpLG8scixmLGUsYykscC5iYXNlPXUuX19lLHAuX19oLmxlbmd0aCYmZi5wdXNoKHApLHcmJihwLl9fRT1wLl9fPW51bGwpLHAuX19lPSExfWVsc2UgdS5fX2U9QSh0Ll9fZSx1LHQsaSxvLHIsZixjKTsoYT1uLmRpZmZlZCkmJmEodSl9Y2F0Y2gobCl7bi5fX2UobCx1LHQpfXJldHVybiB1Ll9fZX1mdW5jdGlvbiB6KGwsdSl7bi5fX2MmJm4uX19jKHUsbCksbC5zb21lKGZ1bmN0aW9uKHUpe3RyeXtsPXUuX19oLHUuX19oPVtdLGwuc29tZShmdW5jdGlvbihuKXtuLmNhbGwodSl9KX1jYXRjaChsKXtuLl9fZShsLHUuX192KX19KX1mdW5jdGlvbiBBKG4sbCx1LHQsaSxvLHIsYyl7dmFyIHMsYSxwLHYsaCxkPXUucHJvcHMseT1sLnByb3BzO2lmKGk9XCJzdmdcIj09PWwudHlwZXx8aSxudWxsIT1vKWZvcihzPTA7czxvLmxlbmd0aDtzKyspaWYobnVsbCE9KGE9b1tzXSkmJigobnVsbD09PWwudHlwZT8zPT09YS5ub2RlVHlwZTphLmxvY2FsTmFtZT09PWwudHlwZSl8fG49PWEpKXtuPWEsb1tzXT1udWxsO2JyZWFrfWlmKG51bGw9PW4pe2lmKG51bGw9PT1sLnR5cGUpcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHkpO249aT9kb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLGwudHlwZSk6ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChsLnR5cGUseS5pcyYme2lzOnkuaXN9KSxvPW51bGx9aWYobnVsbD09PWwudHlwZSlkIT09eSYmbi5kYXRhIT15JiYobi5kYXRhPXkpO2Vsc2UgaWYobCE9PXUpe2lmKG51bGwhPW8mJihvPWUuc2xpY2UuY2FsbChuLmNoaWxkTm9kZXMpKSxwPShkPXUucHJvcHN8fGYpLmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MLHY9eS5kYW5nZXJvdXNseVNldElubmVySFRNTCwhYyl7aWYoZD09PWYpZm9yKGQ9e30saD0wO2g8bi5hdHRyaWJ1dGVzLmxlbmd0aDtoKyspZFtuLmF0dHJpYnV0ZXNbaF0ubmFtZV09bi5hdHRyaWJ1dGVzW2hdLnZhbHVlOyh2fHxwKSYmKHYmJnAmJnYuX19odG1sPT1wLl9faHRtbHx8KG4uaW5uZXJIVE1MPXYmJnYuX19odG1sfHxcIlwiKSl9XyhuLHksZCxpLGMpLGwuX19rPWwucHJvcHMuY2hpbGRyZW4sdnx8ZyhuLGwsdSx0LFwiZm9yZWlnbk9iamVjdFwiIT09bC50eXBlJiZpLG8scixmLGMpLGN8fChcInZhbHVlXCJpbiB5JiZ2b2lkIDAhPT15LnZhbHVlJiZ5LnZhbHVlIT09bi52YWx1ZSYmKG4udmFsdWU9bnVsbD09eS52YWx1ZT9cIlwiOnkudmFsdWUpLFwiY2hlY2tlZFwiaW4geSYmdm9pZCAwIT09eS5jaGVja2VkJiZ5LmNoZWNrZWQhPT1uLmNoZWNrZWQmJihuLmNoZWNrZWQ9eS5jaGVja2VkKSl9cmV0dXJuIG59ZnVuY3Rpb24gVChsLHUsdCl7dHJ5e1wiZnVuY3Rpb25cIj09dHlwZW9mIGw/bCh1KTpsLmN1cnJlbnQ9dX1jYXRjaChsKXtuLl9fZShsLHQpfX1mdW5jdGlvbiAkKGwsdSx0KXt2YXIgaSxvLHI7aWYobi51bm1vdW50JiZuLnVubW91bnQobCksKGk9bC5yZWYpJiYoaS5jdXJyZW50JiZpLmN1cnJlbnQhPT1sLl9fZXx8VChpLG51bGwsdSkpLHR8fFwiZnVuY3Rpb25cIj09dHlwZW9mIGwudHlwZXx8KHQ9bnVsbCE9KG89bC5fX2UpKSxsLl9fZT1sLl9fZD12b2lkIDAsbnVsbCE9KGk9bC5fX2MpKXtpZihpLmNvbXBvbmVudFdpbGxVbm1vdW50KXRyeXtpLmNvbXBvbmVudFdpbGxVbm1vdW50KCl9Y2F0Y2gobCl7bi5fX2UobCx1KX1pLmJhc2U9aS5fX1A9bnVsbH1pZihpPWwuX19rKWZvcihyPTA7cjxpLmxlbmd0aDtyKyspaVtyXSYmJChpW3JdLHUsdCk7bnVsbCE9byYmYShvKX1mdW5jdGlvbiBqKG4sbCx1KXtyZXR1cm4gdGhpcy5jb25zdHJ1Y3RvcihuLHUpfWZ1bmN0aW9uIEQobCx1LHQpe3ZhciBpLHIsYztuLl9fJiZuLl9fKGwsdSkscj0oaT10PT09byk/bnVsbDp0JiZ0Ll9fa3x8dS5fX2ssbD1wKGgsbnVsbCxbbF0pLGM9W10sTih1LChpP3U6dHx8dSkuX19rPWwscnx8ZixmLHZvaWQgMCE9PXUub3duZXJTVkdFbGVtZW50LHQmJiFpP1t0XTpyP251bGw6ZS5zbGljZS5jYWxsKHUuY2hpbGROb2RlcyksYyx0fHxmLGkpLHooYyxsKX1uPXtfX2U6ZnVuY3Rpb24obixsKXtmb3IodmFyIHUsdDtsPWwuX187KWlmKCh1PWwuX19jKSYmIXUuX18pdHJ5e2lmKHUuY29uc3RydWN0b3ImJm51bGwhPXUuY29uc3RydWN0b3IuZ2V0RGVyaXZlZFN0YXRlRnJvbUVycm9yJiYodD0hMCx1LnNldFN0YXRlKHUuY29uc3RydWN0b3IuZ2V0RGVyaXZlZFN0YXRlRnJvbUVycm9yKG4pKSksbnVsbCE9dS5jb21wb25lbnREaWRDYXRjaCYmKHQ9ITAsdS5jb21wb25lbnREaWRDYXRjaChuKSksdClyZXR1cm4gbSh1Ll9fRT11KX1jYXRjaChsKXtuPWx9dGhyb3cgbn19LGw9ZnVuY3Rpb24obil7cmV0dXJuIG51bGwhPW4mJnZvaWQgMD09PW4uY29uc3RydWN0b3J9LGQucHJvdG90eXBlLnNldFN0YXRlPWZ1bmN0aW9uKG4sbCl7dmFyIHU7dT10aGlzLl9fcyE9PXRoaXMuc3RhdGU/dGhpcy5fX3M6dGhpcy5fX3M9cyh7fSx0aGlzLnN0YXRlKSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBuJiYobj1uKHUsdGhpcy5wcm9wcykpLG4mJnModSxuKSxudWxsIT1uJiZ0aGlzLl9fdiYmKGwmJnRoaXMuX19oLnB1c2gobCksbSh0aGlzKSl9LGQucHJvdG90eXBlLmZvcmNlVXBkYXRlPWZ1bmN0aW9uKG4pe3RoaXMuX192JiYodGhpcy5fX2U9ITAsbiYmdGhpcy5fX2gucHVzaChuKSxtKHRoaXMpKX0sZC5wcm90b3R5cGUucmVuZGVyPWgsdT1bXSx0PVwiZnVuY3Rpb25cIj09dHlwZW9mIFByb21pc2U/UHJvbWlzZS5wcm90b3R5cGUudGhlbi5iaW5kKFByb21pc2UucmVzb2x2ZSgpKTpzZXRUaW1lb3V0LG89ZixyPTAsZXhwb3J0cy5yZW5kZXI9RCxleHBvcnRzLmh5ZHJhdGU9ZnVuY3Rpb24obixsKXtEKG4sbCxvKX0sZXhwb3J0cy5jcmVhdGVFbGVtZW50PXAsZXhwb3J0cy5oPXAsZXhwb3J0cy5GcmFnbWVudD1oLGV4cG9ydHMuY3JlYXRlUmVmPWZ1bmN0aW9uKCl7cmV0dXJue319LGV4cG9ydHMuaXNWYWxpZEVsZW1lbnQ9bCxleHBvcnRzLkNvbXBvbmVudD1kLGV4cG9ydHMuY2xvbmVFbGVtZW50PWZ1bmN0aW9uKG4sbCl7cmV0dXJuIGw9cyhzKHt9LG4ucHJvcHMpLGwpLGFyZ3VtZW50cy5sZW5ndGg+MiYmKGwuY2hpbGRyZW49ZS5zbGljZS5jYWxsKGFyZ3VtZW50cywyKSksdihuLnR5cGUsbCxsLmtleXx8bi5rZXksbC5yZWZ8fG4ucmVmKX0sZXhwb3J0cy5jcmVhdGVDb250ZXh0PWZ1bmN0aW9uKG4pe3ZhciBsPXt9LHU9e19fYzpcIl9fY0NcIityKyssX186bixDb25zdW1lcjpmdW5jdGlvbihuLGwpe3JldHVybiBuLmNoaWxkcmVuKGwpfSxQcm92aWRlcjpmdW5jdGlvbihuKXt2YXIgdCxpPXRoaXM7cmV0dXJuIHRoaXMuZ2V0Q2hpbGRDb250ZXh0fHwodD1bXSx0aGlzLmdldENoaWxkQ29udGV4dD1mdW5jdGlvbigpe3JldHVybiBsW3UuX19jXT1pLGx9LHRoaXMuc2hvdWxkQ29tcG9uZW50VXBkYXRlPWZ1bmN0aW9uKGwpe24udmFsdWUhPT1sLnZhbHVlJiZ0LnNvbWUoZnVuY3Rpb24obil7bi5jb250ZXh0PWwudmFsdWUsbShuKX0pfSx0aGlzLnN1Yj1mdW5jdGlvbihuKXt0LnB1c2gobik7dmFyIGw9bi5jb21wb25lbnRXaWxsVW5tb3VudDtuLmNvbXBvbmVudFdpbGxVbm1vdW50PWZ1bmN0aW9uKCl7dC5zcGxpY2UodC5pbmRleE9mKG4pLDEpLGwmJmwuY2FsbChuKX19KSxuLmNoaWxkcmVufX07cmV0dXJuIHUuQ29uc3VtZXIuY29udGV4dFR5cGU9dSx1fSxleHBvcnRzLnRvQ2hpbGRBcnJheT1rLGV4cG9ydHMuX2U9JCxleHBvcnRzLm9wdGlvbnM9bjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByZWFjdC5qcy5tYXBcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxudmFyIHJ1bnRpbWUgPSAoZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCBhbmQgb3V0ZXJGbi5wcm90b3R5cGUgaXMgYSBHZW5lcmF0b3IsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3I7XG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKTtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcblxuICAgIC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgfVxuICBleHBvcnRzLndyYXAgPSB3cmFwO1xuXG4gIC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwibm9ybWFsXCIsIGFyZzogZm4uY2FsbChvYmosIGFyZykgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwidGhyb3dcIiwgYXJnOiBlcnIgfTtcbiAgICB9XG4gIH1cblxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7XG5cbiAgLy8gUmV0dXJuaW5nIHRoaXMgb2JqZWN0IGZyb20gdGhlIGlubmVyRm4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhc1xuICAvLyBicmVha2luZyBvdXQgb2YgdGhlIGRpc3BhdGNoIHN3aXRjaCBzdGF0ZW1lbnQuXG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307XG5cbiAgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kXG4gIC8vIC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgcHJvcGVydGllcyBmb3IgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIEdlbmVyYXRvclxuICAvLyBvYmplY3RzLiBGb3IgZnVsbCBzcGVjIGNvbXBsaWFuY2UsIHlvdSBtYXkgd2lzaCB0byBjb25maWd1cmUgeW91clxuICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLlxuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cblxuICAvLyBUaGlzIGlzIGEgcG9seWZpbGwgZm9yICVJdGVyYXRvclByb3RvdHlwZSUgZm9yIGVudmlyb25tZW50cyB0aGF0XG4gIC8vIGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgaXQuXG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICBJdGVyYXRvclByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJlxuICAgICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmXG4gICAgICBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHcC5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZVt0b1N0cmluZ1RhZ1N5bWJvbF0gPVxuICAgIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuXG4gIC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIHByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgaWYgKCEodG9TdHJpbmdUYWdTeW1ib2wgaW4gZ2VuRnVuKSkge1xuICAgICAgICBnZW5GdW5bdG9TdHJpbmdUYWdTeW1ib2xdID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuICAgICAgfVxuICAgIH1cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTtcblxuICAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIilgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLlxuICBleHBvcnRzLmF3cmFwID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHsgX19hd2FpdDogYXJnIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24odW53cmFwcGVkKSB7XG4gICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAvLyBjdXJyZW50IGl0ZXJhdGlvbi5cbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIC8vIElmIGEgcmVqZWN0ZWQgUHJvbWlzZSB3YXMgeWllbGRlZCwgdGhyb3cgdGhlIHJlamVjdGlvbiBiYWNrXG4gICAgICAgICAgLy8gaW50byB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIHNvIGl0IGNhbiBiZSBoYW5kbGVkIHRoZXJlLlxuICAgICAgICAgIHJldHVybiBpbnZva2UoXCJ0aHJvd1wiLCBlcnJvciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcblxuICAgIGZ1bmN0aW9uIGVucXVldWUobWV0aG9kLCBhcmcpIHtcbiAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihcbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgICAgICAvLyBBdm9pZCBwcm9wYWdhdGluZyBmYWlsdXJlcyB0byBQcm9taXNlcyByZXR1cm5lZCBieSBsYXRlclxuICAgICAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZ1xuICAgICAgICApIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuICBBc3luY0l0ZXJhdG9yLnByb3RvdHlwZVthc3luY0l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjtcblxuICAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgZXhwb3J0cy5hc3luYyA9IGZ1bmN0aW9uKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpXG4gICAgKTtcblxuICAgIHJldHVybiBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbilcbiAgICAgID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgIGNvbnRleHQuYXJnID0gYXJnO1xuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgIC8vIFNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGNvbnRleHQuYXJnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuXG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgLy8gSWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBmcm9tIGlubmVyRm4sIHdlIGxlYXZlIHN0YXRlID09PVxuICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICBzdGF0ZSA9IGNvbnRleHQuZG9uZVxuICAgICAgICAgICAgPyBHZW5TdGF0ZUNvbXBsZXRlZFxuICAgICAgICAgICAgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgLy8gY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZykgY2FsbCBhYm92ZS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gQ2FsbCBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF0oY29udGV4dC5hcmcpIGFuZCBoYW5kbGUgdGhlXG4gIC8vIHJlc3VsdCwgZWl0aGVyIGJ5IHJldHVybmluZyBhIHsgdmFsdWUsIGRvbmUgfSByZXN1bHQgZnJvbSB0aGVcbiAgLy8gZGVsZWdhdGUgaXRlcmF0b3IsIG9yIGJ5IG1vZGlmeWluZyBjb250ZXh0Lm1ldGhvZCBhbmQgY29udGV4dC5hcmcsXG4gIC8vIHNldHRpbmcgY29udGV4dC5kZWxlZ2F0ZSB0byBudWxsLCBhbmQgcmV0dXJuaW5nIHRoZSBDb250aW51ZVNlbnRpbmVsLlxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXTtcbiAgICBpZiAobWV0aG9kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIEEgLnRocm93IG9yIC5yZXR1cm4gd2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIC50aHJvd1xuICAgICAgLy8gbWV0aG9kIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAvLyBOb3RlOiBbXCJyZXR1cm5cIl0gbXVzdCBiZSB1c2VkIGZvciBFUzMgcGFyc2luZyBjb21wYXRpYmlsaXR5LlxuICAgICAgICBpZiAoZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAvLyBJZiBtYXliZUludm9rZURlbGVnYXRlKGNvbnRleHQpIGNoYW5nZWQgY29udGV4dC5tZXRob2QgZnJvbVxuICAgICAgICAgICAgLy8gXCJyZXR1cm5cIiB0byBcInRocm93XCIsIGxldCB0aGF0IG92ZXJyaWRlIHRoZSBUeXBlRXJyb3IgYmVsb3cuXG4gICAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcblxuICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuXG4gICAgaWYgKCEgaW5mbykge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKTtcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgLy8gQXNzaWduIHRoZSByZXN1bHQgb2YgdGhlIGZpbmlzaGVkIGRlbGVnYXRlIHRvIHRoZSB0ZW1wb3JhcnlcbiAgICAgIC8vIHZhcmlhYmxlIHNwZWNpZmllZCBieSBkZWxlZ2F0ZS5yZXN1bHROYW1lIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcblxuICAgICAgLy8gUmVzdW1lIGV4ZWN1dGlvbiBhdCB0aGUgZGVzaXJlZCBsb2NhdGlvbiAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYztcblxuICAgICAgLy8gSWYgY29udGV4dC5tZXRob2Qgd2FzIFwidGhyb3dcIiBidXQgdGhlIGRlbGVnYXRlIGhhbmRsZWQgdGhlXG4gICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmXG4gICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgLy8gXCJjb25zdW1lZFwiIGJ5IHRoZSBkZWxlZ2F0ZSBpdGVyYXRvci4gSWYgY29udGV4dC5tZXRob2Qgd2FzXG4gICAgICAvLyBcInJldHVyblwiLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZVxuICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kICE9PSBcInJldHVyblwiKSB7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cblxuICAgIC8vIFRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBpcyBmaW5pc2hlZCwgc28gZm9yZ2V0IGl0IGFuZCBjb250aW51ZSB3aXRoXG4gICAgLy8gdGhlIG91dGVyIGdlbmVyYXRvci5cbiAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgfVxuXG4gIC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcblxuICBHcFt0b1N0cmluZ1RhZ1N5bWJvbF0gPSBcIkdlbmVyYXRvclwiO1xuXG4gIC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgR3BbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhIGNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xuXG4gIC8vIFJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGVcbiAgLy8gb3Igbm90LCByZXR1cm4gdGhlIHJ1bnRpbWUgb2JqZWN0IHNvIHRoYXQgd2UgY2FuIGRlY2xhcmUgdGhlIHZhcmlhYmxlXG4gIC8vIHJlZ2VuZXJhdG9yUnVudGltZSBpbiB0aGUgb3V0ZXIgc2NvcGUsIHdoaWNoIGFsbG93cyB0aGlzIG1vZHVsZSB0byBiZVxuICAvLyBpbmplY3RlZCBlYXNpbHkgYnkgYGJpbi9yZWdlbmVyYXRvciAtLWluY2x1ZGUtcnVudGltZSBzY3JpcHQuanNgLlxuICByZXR1cm4gZXhwb3J0cztcblxufShcbiAgLy8gSWYgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlLCB1c2UgbW9kdWxlLmV4cG9ydHNcbiAgLy8gYXMgdGhlIHJlZ2VuZXJhdG9yUnVudGltZSBuYW1lc3BhY2UuIE90aGVyd2lzZSBjcmVhdGUgYSBuZXcgZW1wdHlcbiAgLy8gb2JqZWN0LiBFaXRoZXIgd2F5LCB0aGUgcmVzdWx0aW5nIG9iamVjdCB3aWxsIGJlIHVzZWQgdG8gaW5pdGlhbGl6ZVxuICAvLyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIHZhcmlhYmxlIGF0IHRoZSB0b3Agb2YgdGhpcyBmaWxlLlxuICB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiID8gbW9kdWxlLmV4cG9ydHMgOiB7fVxuKSk7XG5cbnRyeSB7XG4gIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG59IGNhdGNoIChhY2NpZGVudGFsU3RyaWN0TW9kZSkge1xuICAvLyBUaGlzIG1vZHVsZSBzaG91bGQgbm90IGJlIHJ1bm5pbmcgaW4gc3RyaWN0IG1vZGUsIHNvIHRoZSBhYm92ZVxuICAvLyBhc3NpZ25tZW50IHNob3VsZCBhbHdheXMgd29yayB1bmxlc3Mgc29tZXRoaW5nIGlzIG1pc2NvbmZpZ3VyZWQuIEp1c3RcbiAgLy8gaW4gY2FzZSBydW50aW1lLmpzIGFjY2lkZW50YWxseSBydW5zIGluIHN0cmljdCBtb2RlLCB3ZSBjYW4gZXNjYXBlXG4gIC8vIHN0cmljdCBtb2RlIHVzaW5nIGEgZ2xvYmFsIEZ1bmN0aW9uIGNhbGwuIFRoaXMgY291bGQgY29uY2VpdmFibHkgZmFpbFxuICAvLyBpZiBhIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5IGZvcmJpZHMgdXNpbmcgRnVuY3Rpb24sIGJ1dCBpbiB0aGF0IGNhc2VcbiAgLy8gdGhlIHByb3BlciBzb2x1dGlvbiBpcyB0byBmaXggdGhlIGFjY2lkZW50YWwgc3RyaWN0IG1vZGUgcHJvYmxlbS4gSWZcbiAgLy8geW91J3ZlIG1pc2NvbmZpZ3VyZWQgeW91ciBidW5kbGVyIHRvIGZvcmNlIHN0cmljdCBtb2RlIGFuZCBhcHBsaWVkIGFcbiAgLy8gQ1NQIHRvIGZvcmJpZCBGdW5jdGlvbiwgYW5kIHlvdSdyZSBub3Qgd2lsbGluZyB0byBmaXggZWl0aGVyIG9mIHRob3NlXG4gIC8vIHByb2JsZW1zLCBwbGVhc2UgZGV0YWlsIHlvdXIgdW5pcXVlIHByZWRpY2FtZW50IGluIGEgR2l0SHViIGlzc3VlLlxuICBGdW5jdGlvbihcInJcIiwgXCJyZWdlbmVyYXRvclJ1bnRpbWUgPSByXCIpKHJ1bnRpbWUpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9pbmRleCcpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmFuZG9tRnJvbVNlZWQgPSByZXF1aXJlKCcuL3JhbmRvbS9yYW5kb20tZnJvbS1zZWVkJyk7XG5cbnZhciBPUklHSU5BTCA9ICcwMTIzNDU2Nzg5YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWl8tJztcbnZhciBhbHBoYWJldDtcbnZhciBwcmV2aW91c1NlZWQ7XG5cbnZhciBzaHVmZmxlZDtcblxuZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgc2h1ZmZsZWQgPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gc2V0Q2hhcmFjdGVycyhfYWxwaGFiZXRfKSB7XG4gICAgaWYgKCFfYWxwaGFiZXRfKSB7XG4gICAgICAgIGlmIChhbHBoYWJldCAhPT0gT1JJR0lOQUwpIHtcbiAgICAgICAgICAgIGFscGhhYmV0ID0gT1JJR0lOQUw7XG4gICAgICAgICAgICByZXNldCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoX2FscGhhYmV0XyA9PT0gYWxwaGFiZXQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChfYWxwaGFiZXRfLmxlbmd0aCAhPT0gT1JJR0lOQUwubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ3VzdG9tIGFscGhhYmV0IGZvciBzaG9ydGlkIG11c3QgYmUgJyArIE9SSUdJTkFMLmxlbmd0aCArICcgdW5pcXVlIGNoYXJhY3RlcnMuIFlvdSBzdWJtaXR0ZWQgJyArIF9hbHBoYWJldF8ubGVuZ3RoICsgJyBjaGFyYWN0ZXJzOiAnICsgX2FscGhhYmV0Xyk7XG4gICAgfVxuXG4gICAgdmFyIHVuaXF1ZSA9IF9hbHBoYWJldF8uc3BsaXQoJycpLmZpbHRlcihmdW5jdGlvbihpdGVtLCBpbmQsIGFycil7XG4gICAgICAgcmV0dXJuIGluZCAhPT0gYXJyLmxhc3RJbmRleE9mKGl0ZW0pO1xuICAgIH0pO1xuXG4gICAgaWYgKHVuaXF1ZS5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDdXN0b20gYWxwaGFiZXQgZm9yIHNob3J0aWQgbXVzdCBiZSAnICsgT1JJR0lOQUwubGVuZ3RoICsgJyB1bmlxdWUgY2hhcmFjdGVycy4gVGhlc2UgY2hhcmFjdGVycyB3ZXJlIG5vdCB1bmlxdWU6ICcgKyB1bmlxdWUuam9pbignLCAnKSk7XG4gICAgfVxuXG4gICAgYWxwaGFiZXQgPSBfYWxwaGFiZXRfO1xuICAgIHJlc2V0KCk7XG59XG5cbmZ1bmN0aW9uIGNoYXJhY3RlcnMoX2FscGhhYmV0Xykge1xuICAgIHNldENoYXJhY3RlcnMoX2FscGhhYmV0Xyk7XG4gICAgcmV0dXJuIGFscGhhYmV0O1xufVxuXG5mdW5jdGlvbiBzZXRTZWVkKHNlZWQpIHtcbiAgICByYW5kb21Gcm9tU2VlZC5zZWVkKHNlZWQpO1xuICAgIGlmIChwcmV2aW91c1NlZWQgIT09IHNlZWQpIHtcbiAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgcHJldmlvdXNTZWVkID0gc2VlZDtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNodWZmbGUoKSB7XG4gICAgaWYgKCFhbHBoYWJldCkge1xuICAgICAgICBzZXRDaGFyYWN0ZXJzKE9SSUdJTkFMKTtcbiAgICB9XG5cbiAgICB2YXIgc291cmNlQXJyYXkgPSBhbHBoYWJldC5zcGxpdCgnJyk7XG4gICAgdmFyIHRhcmdldEFycmF5ID0gW107XG4gICAgdmFyIHIgPSByYW5kb21Gcm9tU2VlZC5uZXh0VmFsdWUoKTtcbiAgICB2YXIgY2hhcmFjdGVySW5kZXg7XG5cbiAgICB3aGlsZSAoc291cmNlQXJyYXkubGVuZ3RoID4gMCkge1xuICAgICAgICByID0gcmFuZG9tRnJvbVNlZWQubmV4dFZhbHVlKCk7XG4gICAgICAgIGNoYXJhY3RlckluZGV4ID0gTWF0aC5mbG9vcihyICogc291cmNlQXJyYXkubGVuZ3RoKTtcbiAgICAgICAgdGFyZ2V0QXJyYXkucHVzaChzb3VyY2VBcnJheS5zcGxpY2UoY2hhcmFjdGVySW5kZXgsIDEpWzBdKTtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldEFycmF5LmpvaW4oJycpO1xufVxuXG5mdW5jdGlvbiBnZXRTaHVmZmxlZCgpIHtcbiAgICBpZiAoc2h1ZmZsZWQpIHtcbiAgICAgICAgcmV0dXJuIHNodWZmbGVkO1xuICAgIH1cbiAgICBzaHVmZmxlZCA9IHNodWZmbGUoKTtcbiAgICByZXR1cm4gc2h1ZmZsZWQ7XG59XG5cbi8qKlxuICogbG9va3VwIHNodWZmbGVkIGxldHRlclxuICogQHBhcmFtIGluZGV4XG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBsb29rdXAoaW5kZXgpIHtcbiAgICB2YXIgYWxwaGFiZXRTaHVmZmxlZCA9IGdldFNodWZmbGVkKCk7XG4gICAgcmV0dXJuIGFscGhhYmV0U2h1ZmZsZWRbaW5kZXhdO1xufVxuXG5mdW5jdGlvbiBnZXQgKCkge1xuICByZXR1cm4gYWxwaGFiZXQgfHwgT1JJR0lOQUw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdldDogZ2V0LFxuICAgIGNoYXJhY3RlcnM6IGNoYXJhY3RlcnMsXG4gICAgc2VlZDogc2V0U2VlZCxcbiAgICBsb29rdXA6IGxvb2t1cCxcbiAgICBzaHVmZmxlZDogZ2V0U2h1ZmZsZWRcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBnZW5lcmF0ZSA9IHJlcXVpcmUoJy4vZ2VuZXJhdGUnKTtcbnZhciBhbHBoYWJldCA9IHJlcXVpcmUoJy4vYWxwaGFiZXQnKTtcblxuLy8gSWdub3JlIGFsbCBtaWxsaXNlY29uZHMgYmVmb3JlIGEgY2VydGFpbiB0aW1lIHRvIHJlZHVjZSB0aGUgc2l6ZSBvZiB0aGUgZGF0ZSBlbnRyb3B5IHdpdGhvdXQgc2FjcmlmaWNpbmcgdW5pcXVlbmVzcy5cbi8vIFRoaXMgbnVtYmVyIHNob3VsZCBiZSB1cGRhdGVkIGV2ZXJ5IHllYXIgb3Igc28gdG8ga2VlcCB0aGUgZ2VuZXJhdGVkIGlkIHNob3J0LlxuLy8gVG8gcmVnZW5lcmF0ZSBgbmV3IERhdGUoKSAtIDBgIGFuZCBidW1wIHRoZSB2ZXJzaW9uLiBBbHdheXMgYnVtcCB0aGUgdmVyc2lvbiFcbnZhciBSRURVQ0VfVElNRSA9IDE1Njc3NTI4MDIwNjI7XG5cbi8vIGRvbid0IGNoYW5nZSB1bmxlc3Mgd2UgY2hhbmdlIHRoZSBhbGdvcyBvciBSRURVQ0VfVElNRVxuLy8gbXVzdCBiZSBhbiBpbnRlZ2VyIGFuZCBsZXNzIHRoYW4gMTZcbnZhciB2ZXJzaW9uID0gNztcblxuLy8gQ291bnRlciBpcyB1c2VkIHdoZW4gc2hvcnRpZCBpcyBjYWxsZWQgbXVsdGlwbGUgdGltZXMgaW4gb25lIHNlY29uZC5cbnZhciBjb3VudGVyO1xuXG4vLyBSZW1lbWJlciB0aGUgbGFzdCB0aW1lIHNob3J0aWQgd2FzIGNhbGxlZCBpbiBjYXNlIGNvdW50ZXIgaXMgbmVlZGVkLlxudmFyIHByZXZpb3VzU2Vjb25kcztcblxuLyoqXG4gKiBHZW5lcmF0ZSB1bmlxdWUgaWRcbiAqIFJldHVybnMgc3RyaW5nIGlkXG4gKi9cbmZ1bmN0aW9uIGJ1aWxkKGNsdXN0ZXJXb3JrZXJJZCkge1xuICAgIHZhciBzdHIgPSAnJztcblxuICAgIHZhciBzZWNvbmRzID0gTWF0aC5mbG9vcigoRGF0ZS5ub3coKSAtIFJFRFVDRV9USU1FKSAqIDAuMDAxKTtcblxuICAgIGlmIChzZWNvbmRzID09PSBwcmV2aW91c1NlY29uZHMpIHtcbiAgICAgICAgY291bnRlcisrO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvdW50ZXIgPSAwO1xuICAgICAgICBwcmV2aW91c1NlY29uZHMgPSBzZWNvbmRzO1xuICAgIH1cblxuICAgIHN0ciA9IHN0ciArIGdlbmVyYXRlKHZlcnNpb24pO1xuICAgIHN0ciA9IHN0ciArIGdlbmVyYXRlKGNsdXN0ZXJXb3JrZXJJZCk7XG4gICAgaWYgKGNvdW50ZXIgPiAwKSB7XG4gICAgICAgIHN0ciA9IHN0ciArIGdlbmVyYXRlKGNvdW50ZXIpO1xuICAgIH1cbiAgICBzdHIgPSBzdHIgKyBnZW5lcmF0ZShzZWNvbmRzKTtcbiAgICByZXR1cm4gc3RyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ1aWxkO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYWxwaGFiZXQgPSByZXF1aXJlKCcuL2FscGhhYmV0Jyk7XG52YXIgcmFuZG9tID0gcmVxdWlyZSgnLi9yYW5kb20vcmFuZG9tLWJ5dGUnKTtcbnZhciBmb3JtYXQgPSByZXF1aXJlKCduYW5vaWQvZm9ybWF0Jyk7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlKG51bWJlcikge1xuICAgIHZhciBsb29wQ291bnRlciA9IDA7XG4gICAgdmFyIGRvbmU7XG5cbiAgICB2YXIgc3RyID0gJyc7XG5cbiAgICB3aGlsZSAoIWRvbmUpIHtcbiAgICAgICAgc3RyID0gc3RyICsgZm9ybWF0KHJhbmRvbSwgYWxwaGFiZXQuZ2V0KCksIDEpO1xuICAgICAgICBkb25lID0gbnVtYmVyIDwgKE1hdGgucG93KDE2LCBsb29wQ291bnRlciArIDEgKSApO1xuICAgICAgICBsb29wQ291bnRlcisrO1xuICAgIH1cbiAgICByZXR1cm4gc3RyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdlbmVyYXRlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYWxwaGFiZXQgPSByZXF1aXJlKCcuL2FscGhhYmV0Jyk7XG52YXIgYnVpbGQgPSByZXF1aXJlKCcuL2J1aWxkJyk7XG52YXIgaXNWYWxpZCA9IHJlcXVpcmUoJy4vaXMtdmFsaWQnKTtcblxuLy8gaWYgeW91IGFyZSB1c2luZyBjbHVzdGVyIG9yIG11bHRpcGxlIHNlcnZlcnMgdXNlIHRoaXMgdG8gbWFrZSBlYWNoIGluc3RhbmNlXG4vLyBoYXMgYSB1bmlxdWUgdmFsdWUgZm9yIHdvcmtlclxuLy8gTm90ZTogSSBkb24ndCBrbm93IGlmIHRoaXMgaXMgYXV0b21hdGljYWxseSBzZXQgd2hlbiB1c2luZyB0aGlyZFxuLy8gcGFydHkgY2x1c3RlciBzb2x1dGlvbnMgc3VjaCBhcyBwbTIuXG52YXIgY2x1c3RlcldvcmtlcklkID0gcmVxdWlyZSgnLi91dGlsL2NsdXN0ZXItd29ya2VyLWlkJykgfHwgMDtcblxuLyoqXG4gKiBTZXQgdGhlIHNlZWQuXG4gKiBIaWdobHkgcmVjb21tZW5kZWQgaWYgeW91IGRvbid0IHdhbnQgcGVvcGxlIHRvIHRyeSB0byBmaWd1cmUgb3V0IHlvdXIgaWQgc2NoZW1hLlxuICogZXhwb3NlZCBhcyBzaG9ydGlkLnNlZWQoaW50KVxuICogQHBhcmFtIHNlZWQgSW50ZWdlciB2YWx1ZSB0byBzZWVkIHRoZSByYW5kb20gYWxwaGFiZXQuICBBTFdBWVMgVVNFIFRIRSBTQU1FIFNFRUQgb3IgeW91IG1pZ2h0IGdldCBvdmVybGFwcy5cbiAqL1xuZnVuY3Rpb24gc2VlZChzZWVkVmFsdWUpIHtcbiAgICBhbHBoYWJldC5zZWVkKHNlZWRWYWx1ZSk7XG4gICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vKipcbiAqIFNldCB0aGUgY2x1c3RlciB3b3JrZXIgb3IgbWFjaGluZSBpZFxuICogZXhwb3NlZCBhcyBzaG9ydGlkLndvcmtlcihpbnQpXG4gKiBAcGFyYW0gd29ya2VySWQgd29ya2VyIG11c3QgYmUgcG9zaXRpdmUgaW50ZWdlci4gIE51bWJlciBsZXNzIHRoYW4gMTYgaXMgcmVjb21tZW5kZWQuXG4gKiByZXR1cm5zIHNob3J0aWQgbW9kdWxlIHNvIGl0IGNhbiBiZSBjaGFpbmVkLlxuICovXG5mdW5jdGlvbiB3b3JrZXIod29ya2VySWQpIHtcbiAgICBjbHVzdGVyV29ya2VySWQgPSB3b3JrZXJJZDtcbiAgICByZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8qKlxuICpcbiAqIHNldHMgbmV3IGNoYXJhY3RlcnMgdG8gdXNlIGluIHRoZSBhbHBoYWJldFxuICogcmV0dXJucyB0aGUgc2h1ZmZsZWQgYWxwaGFiZXRcbiAqL1xuZnVuY3Rpb24gY2hhcmFjdGVycyhuZXdDaGFyYWN0ZXJzKSB7XG4gICAgaWYgKG5ld0NoYXJhY3RlcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBhbHBoYWJldC5jaGFyYWN0ZXJzKG5ld0NoYXJhY3RlcnMpO1xuICAgIH1cblxuICAgIHJldHVybiBhbHBoYWJldC5zaHVmZmxlZCgpO1xufVxuXG4vKipcbiAqIEdlbmVyYXRlIHVuaXF1ZSBpZFxuICogUmV0dXJucyBzdHJpbmcgaWRcbiAqL1xuZnVuY3Rpb24gZ2VuZXJhdGUoKSB7XG4gIHJldHVybiBidWlsZChjbHVzdGVyV29ya2VySWQpO1xufVxuXG4vLyBFeHBvcnQgYWxsIG90aGVyIGZ1bmN0aW9ucyBhcyBwcm9wZXJ0aWVzIG9mIHRoZSBnZW5lcmF0ZSBmdW5jdGlvblxubW9kdWxlLmV4cG9ydHMgPSBnZW5lcmF0ZTtcbm1vZHVsZS5leHBvcnRzLmdlbmVyYXRlID0gZ2VuZXJhdGU7XG5tb2R1bGUuZXhwb3J0cy5zZWVkID0gc2VlZDtcbm1vZHVsZS5leHBvcnRzLndvcmtlciA9IHdvcmtlcjtcbm1vZHVsZS5leHBvcnRzLmNoYXJhY3RlcnMgPSBjaGFyYWN0ZXJzO1xubW9kdWxlLmV4cG9ydHMuaXNWYWxpZCA9IGlzVmFsaWQ7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYWxwaGFiZXQgPSByZXF1aXJlKCcuL2FscGhhYmV0Jyk7XG5cbmZ1bmN0aW9uIGlzU2hvcnRJZChpZCkge1xuICAgIGlmICghaWQgfHwgdHlwZW9mIGlkICE9PSAnc3RyaW5nJyB8fCBpZC5sZW5ndGggPCA2ICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIG5vbkFscGhhYmV0aWMgPSBuZXcgUmVnRXhwKCdbXicgK1xuICAgICAgYWxwaGFiZXQuZ2V0KCkucmVwbGFjZSgvW3xcXFxce30oKVtcXF1eJCsqPy4tXS9nLCAnXFxcXCQmJykgK1xuICAgICddJyk7XG4gICAgcmV0dXJuICFub25BbHBoYWJldGljLnRlc3QoaWQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzU2hvcnRJZDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNyeXB0byA9IHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmICh3aW5kb3cuY3J5cHRvIHx8IHdpbmRvdy5tc0NyeXB0byk7IC8vIElFIDExIHVzZXMgd2luZG93Lm1zQ3J5cHRvXG5cbnZhciByYW5kb21CeXRlO1xuXG5pZiAoIWNyeXB0byB8fCAhY3J5cHRvLmdldFJhbmRvbVZhbHVlcykge1xuICAgIHJhbmRvbUJ5dGUgPSBmdW5jdGlvbihzaXplKSB7XG4gICAgICAgIHZhciBieXRlcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgICAgICAgYnl0ZXMucHVzaChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTYpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnl0ZXM7XG4gICAgfTtcbn0gZWxzZSB7XG4gICAgcmFuZG9tQnl0ZSA9IGZ1bmN0aW9uKHNpemUpIHtcbiAgICAgICAgcmV0dXJuIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoc2l6ZSkpO1xuICAgIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmFuZG9tQnl0ZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gRm91bmQgdGhpcyBzZWVkLWJhc2VkIHJhbmRvbSBnZW5lcmF0b3Igc29tZXdoZXJlXG4vLyBCYXNlZCBvbiBUaGUgQ2VudHJhbCBSYW5kb21pemVyIDEuMyAoQykgMTk5NyBieSBQYXVsIEhvdWxlIChob3VsZUBtc2MuY29ybmVsbC5lZHUpXG5cbnZhciBzZWVkID0gMTtcblxuLyoqXG4gKiByZXR1cm4gYSByYW5kb20gbnVtYmVyIGJhc2VkIG9uIGEgc2VlZFxuICogQHBhcmFtIHNlZWRcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIGdldE5leHRWYWx1ZSgpIHtcbiAgICBzZWVkID0gKHNlZWQgKiA5MzAxICsgNDkyOTcpICUgMjMzMjgwO1xuICAgIHJldHVybiBzZWVkLygyMzMyODAuMCk7XG59XG5cbmZ1bmN0aW9uIHNldFNlZWQoX3NlZWRfKSB7XG4gICAgc2VlZCA9IF9zZWVkXztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbmV4dFZhbHVlOiBnZXROZXh0VmFsdWUsXG4gICAgc2VlZDogc2V0U2VlZFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSAwO1xuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIm5hbWVcIjogXCJhcHAuaG9vZG1vZGUuY29cIixcbiAgXCJkaXNwbGF5TmFtZVwiOiBcIkhvb2Rtb2RlXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuMC43XCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJBIHNhbXBsZSBBcGFjaGUgQ29yZG92YSBhcHBsaWNhdGlvbiB0aGF0IHJlc3BvbmRzIHRvIHRoZSBkZXZpY2VyZWFkeSBldmVudC5cIixcbiAgXCJtYWluXCI6IFwiaW5kZXguanNcIixcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImRldlwiOiBcImJ1ZG8gc3JjL2luZGV4LmpzeCAtLWZvcmNlLWRlZmF1bHQtaW5kZXggLS1kaXIgd3d3IC0tY3NzIGluZGV4LmNzcyAtLXdhdGNoLWdsb2I9d3d3L2luZGV4LmNzcyAtLWxpdmUgLS0gLXQgYmFiZWxpZnlcIlxuICB9LFxuICBcImtleXdvcmRzXCI6IFtcbiAgICBcImVjb3N5c3RlbTpjb3Jkb3ZhXCJcbiAgXSxcbiAgXCJhdXRob3JcIjogXCJBcGFjaGUgQ29yZG92YSBUZWFtXCIsXG4gIFwibGljZW5zZVwiOiBcIkFwYWNoZS0yLjBcIixcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGJhYmVsL3BvbHlmaWxsXCI6IFwiXjcuOC4zXCIsXG4gICAgXCJjb3Jkb3ZhLWFuZHJvaWRcIjogXCJeOC4xLjBcIixcbiAgICBcImNvcmRvdmEtaW9zXCI6IFwiXjUuMS4xXCIsXG4gICAgXCJjb3Jkb3ZhLXBsdWdpbi1zdGF0dXNiYXJcIjogXCJeMi40LjNcIixcbiAgICBcInByZWFjdFwiOiBcIl4xMC4zLjFcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAYmFiZWwvY2xpXCI6IFwiXjcuOC4zXCIsXG4gICAgXCJAYmFiZWwvY29yZVwiOiBcIl43LjQuM1wiLFxuICAgIFwiQGJhYmVsL3BsdWdpbi1wcm9wb3NhbC1jbGFzcy1wcm9wZXJ0aWVzXCI6IFwiXjcuOC4zXCIsXG4gICAgXCJAYmFiZWwvcGx1Z2luLXRyYW5zZm9ybS1yZWFjdC1qc3hcIjogXCJeNy44LjNcIixcbiAgICBcIkBiYWJlbC9wcmVzZXQtZW52XCI6IFwiXjcuOC4zXCIsXG4gICAgXCJiYWJlbC1wcmVzZXQtcHJlYWN0XCI6IFwiXjIuMC4wXCIsXG4gICAgXCJiYWJlbGlmeVwiOiBcIl4xMC4wLjBcIixcbiAgICBcImJyb3dzZXJpZnlcIjogXCJeMTYuMS4wXCIsXG4gICAgXCJidWRvXCI6IFwiXjExLjYuM1wiLFxuICAgIFwiY29yZG92YVwiOiBcIl45LjAuMFwiLFxuICAgIFwiY29yZG92YS1wbHVnaW4td2hpdGVsaXN0XCI6IFwiXjEuMy40XCIsXG4gICAgXCJ1Z2xpZnlpZnlcIjogXCJeNC4wLjVcIixcbiAgICBcInNob3J0aWRcIjogXCJeMi4yLjE1XCJcbiAgfSxcbiAgXCJjb3Jkb3ZhXCI6IHtcbiAgICBcInBsdWdpbnNcIjoge1xuICAgICAgXCJjb3Jkb3ZhLXBsdWdpbi13aGl0ZWxpc3RcIjoge30sXG4gICAgICBcImNvcmRvdmEtcGx1Z2luLXN0YXR1c2JhclwiOiB7fVxuICAgIH0sXG4gICAgXCJwbGF0Zm9ybXNcIjogW1xuICAgICAgXCJhbmRyb2lkXCIsXG4gICAgICBcImlvc1wiXG4gICAgXVxuICB9XG59IiwiaW1wb3J0IFwicHJlYWN0L2RlYnVnXCI7XG5cbmltcG9ydCB7IGgsIHJlbmRlciB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgQXBwIGZyb20gJy4vdmlldy9BcHAuanN4JztcbmltcG9ydCBBcHBDb250ZXh0IGZyb20gJy4vdXRpbHMvQXBwQ29udGV4dC5qcyc7XG5pbXBvcnQgc2hvcnRpZCBmcm9tICdzaG9ydGlkJztcbmltcG9ydCBBcHBDb250cm9sbGVyIGZyb20gJy4vbW9kZWwvQXBwQ29udHJvbGxlci5qcyc7XG5pbXBvcnQgQXBwSGVscGVyIGZyb20gJy4vbW9kZWwvQXBwSGVscGVyLmpzJztcbmltcG9ydCBDb25kdWN0b3IgZnJvbSAnLi9tb2RlbC9Db25kdWN0b3IuanMnO1xuXG5sZXQgY29uZHVjdG9yLCBhcHBIZWxwZXIsIGFwcENvbnRyb2xsZXI7XG5cbnRyeSB7XG5cdGNvbmR1Y3Rvcj1uZXcgQ29uZHVjdG9yKCk7XG5cdGFwcEhlbHBlcj1uZXcgQXBwSGVscGVyKGNvbmR1Y3Rvcik7XG5cdGFwcENvbnRyb2xsZXI9bmV3IEFwcENvbnRyb2xsZXIoY29uZHVjdG9yLGFwcEhlbHBlcik7XG59XG5cbmNhdGNoIChlKSB7XG5cdGFsZXJ0KGUpO1xufVxuXG5jb25kdWN0b3Iub25QbGF5R3JpZEluZGV4Q2hhbmdlPShncmlkSW5kZXgsIHNlcXVlbmNlSW5kZXgpPT57XG5cdGZvciAobGV0IGVsIG9mIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY3VycmVudC1iZWF0XCIpKVxuXHRcdGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2N1cnJlbnQtYmVhdCcpO1xuXG5cdGlmIChncmlkSW5kZXg+PTApXG5cdFx0Zm9yIChsZXQgZWwgb2YgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5iZWF0LVwiK2dyaWRJbmRleCkpXG5cdFx0XHRlbC5jbGFzc0xpc3QuYWRkKCdjdXJyZW50LWJlYXQnKTtcblxuXHRmb3IgKGxldCBlbCBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmN1cnJlbnQtc2VxdWVuY2VcIikpXG5cdFx0ZWwuY2xhc3NMaXN0LnJlbW92ZSgnY3VycmVudC1zZXF1ZW5jZScpO1xuXG5cdGlmIChncmlkSW5kZXglND09MCAmJiBzZXF1ZW5jZUluZGV4Pj0wKVxuXHRcdGZvciAobGV0IGVsIG9mIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VxdWVuY2UtXCIrc2VxdWVuY2VJbmRleCkpXG5cdFx0XHRlbC5jbGFzc0xpc3QuYWRkKCdjdXJyZW50LXNlcXVlbmNlJyk7XG59XG5cbmZ1bmN0aW9uIG9uU3RhdGVDaGFuZ2Uoc3RhdGUpIHtcblx0Y29uZHVjdG9yLnNldFN0YXRlKHN0YXRlKTtcblx0d2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiaG9vZG1vZGUtc29uZ3NcIixKU09OLnN0cmluZ2lmeShzdGF0ZS5zb25ncykpO1xufVxuXG5sZXQgYXBwQ29udGV4dD0oXG5cdDxBcHBDb250ZXh0XG5cdFx0XHRjb250cm9sbGVyPXthcHBDb250cm9sbGVyfVxuXHRcdFx0aGVscGVyPXthcHBIZWxwZXJ9XG5cdFx0XHRpbml0QWN0aW9uPVwiaW5pdFwiXG5cdFx0XHRvblN0YXRlQ2hhbmdlPXtvblN0YXRlQ2hhbmdlfT5cblx0XHQ8QXBwLz5cblx0PC9BcHBDb250ZXh0PlxuKTtcblxuZnVuY3Rpb24gc3RhcnQoKSB7XG5cdHJlbmRlcihhcHBDb250ZXh0LCBkb2N1bWVudC5ib2R5KTtcbn1cblxuaWYgKHdpbmRvdy5oYXNPd25Qcm9wZXJ0eShcImNvcmRvdmFcIikpXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RldmljZXJlYWR5JyxzdGFydCk7XG5cbmVsc2Vcblx0c3RhcnQoKTtcbiIsImltcG9ydCBzaG9ydGlkIGZyb20gJ3Nob3J0aWQnO1xuaW1wb3J0IFwicmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lXCI7XG5pbXBvcnQgZGVtb3NvbmdzIGZyb20gJy4vZGVtb3NvbmdzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwQ29udHJvbGxlciB7XG5cdGNvbnN0cnVjdG9yKGNvbmR1Y3RvciwgaGVscGVyKSB7XG5cdFx0dGhpcy5jb25kdWN0b3I9Y29uZHVjdG9yO1xuXHRcdHRoaXMuaGVscGVyPWhlbHBlcjtcblx0fVxuXG5cdGluaXRTdGF0ZSgpIHtcblx0XHRsZXQgc3RhdGU9e1xuXHRcdFx0Y3VycmVudFNvbmdJbmRleDogLTEsXG5cdFx0XHRjdXJyZW50TGF5ZXJJbmRleDogLTEsXG5cdFx0XHRjdXJyZW50Q2hvcmRJbmRleDogMCxcblx0XHRcdGN1cnJlbnRTZWN0aW9uSW5kZXg6IC0xLFxuXHRcdFx0Y3VycmVudEdyaWRJbmRleDogLTEsXG5cdFx0XHRzZXR0aW5nc1Zpc2libGU6IGZhbHNlLFxuXHRcdFx0YWRkTGF5ZXJWaXNpYmxlOiBmYWxzZSxcblx0XHRcdHNvbmdzOiBbXSxcblx0XHRcdGluc3RydW1lbnRzOiBbXSxcblx0XHRcdHBsYXlpbmc6IGZhbHNlLFxuXHRcdFx0cmVjb3JkaW5nOiBmYWxzZSxcblx0XHRcdGVkaXRTZWN0aW9uQ2hvcmRWaXNpYmxlOiAtMSxcblx0XHRcdGFib3V0U2NyZWVuVmlzaWJsZTogZmFsc2Vcblx0XHR9O1xuXG5cdFx0c3RhdGUuaW5zdHJ1bWVudHMucHVzaCh7XG5cdFx0XHRcImtleVwiOiBcImJhc2ljLWRydW1zXCIsXG5cdFx0XHRcInR5cGVcIjogXCJwZXJjdXNzaXZlXCIsXG5cdFx0XHRcIm5hbWVcIjogXCJEcnVtc1wiLFxuXHRcdFx0XCJsYWJlbHNcIjogW1xuXHRcdFx0XHRcIktJQ0tcIixcIktJQ0tcIixcIlNOQVJFXCIsXG5cdFx0XHRcdFwiU05BUkVcIixcIkhJLUhBVFwiLFwiSEktSEFUXCIsXG5cdFx0XHRcdFwiSEktSEFUXCIsXCJTSEFLRVJcIixcIkNMQVBcIl0sXG5cdFx0XHRcImljb25cIjogXCJkcnVtLnN2Z1wiLFxuXHRcdFx0XCJpY29uc1wiOiBbXG5cdFx0XHRcdFwia2ljay1kcnVtLnN2Z1wiLFwia2ljay1kcnVtLnN2Z1wiLFxuXHRcdFx0XHRcInNuYXJlLWRydW0uc3ZnXCIsXCJzbmFyZS1kcnVtLnN2Z1wiLFxuXHRcdFx0XHRcImhpLWhhdC5zdmdcIixcImhpLWhhdC5zdmdcIixcImhpLWhhdC5zdmdcIixcblx0XHRcdFx0XCJtYXJhY2FzLnN2Z1wiLFwiY2xhcC5zdmdcIl0sXG5cdFx0XHRcInNhbXBsZXNcIjogW1xuXHRcdFx0XHRcInNhbXBsZXMvZHJ1bXMveWVzLWtpY2subXAzXCIsXG5cdFx0XHRcdFwic2FtcGxlcy9kcnVtcy9iYWQta2ljay53YXZcIixcblx0XHRcdFx0XCJzYW1wbGVzL2RydW1zL3llcy1zbmFyZS5tcDNcIixcblx0XHRcdFx0XCJzYW1wbGVzL2RydW1zL2JhZC1zbmFyZS53YXZcIixcblx0XHRcdFx0XCJzYW1wbGVzL2RydW1zL2JhZC1oaWhhdC53YXZcIixcblx0XHRcdFx0XCJzYW1wbGVzL2RydW1zL3RocmwtaGF0X0FfbWlub3Iud2F2XCIsXG5cdFx0XHRcdFwic2FtcGxlcy9kcnVtcy9yb2NrLWhpaGF0LXRjaGlrLndhdlwiLFxuXHRcdFx0XHRcInNhbXBsZXMvZHJ1bXMvWWFtYWhhLVJYMTUtU2hha2VyLndhdlwiLFxuXHRcdFx0XHRcInNhbXBsZXMvZHJ1bXMvUm9sYW5kLVItOC04MDgtQ2xhcC53YXZcIlxuXHRcdFx0XVxuXHRcdH0pO1xuXG5cdFx0c3RhdGUuaW5zdHJ1bWVudHMucHVzaCh7XG5cdFx0XHRcImtleVwiOiBcImJhc2ljLWJhc3NcIixcblx0XHRcdFwidHlwZVwiOiBcImhhcm1vbmljXCIsXG5cdFx0XHRcIm5hbWVcIjogXCJTdHJpbmcgQmFzc1wiLFxuXHRcdFx0XCJzYW1wbGVcIjogXCJzYW1wbGVzL1lhbWFoYS1FWDUtT2xkLVN0cmluZ3MtQzItZWRpdGVkLndhdlwiLFxuXHRcdFx0XCJpY29uXCI6IFwiYmFzcy5zdmdcIlxuXHRcdH0pO1xuXG5cdFx0c3RhdGUuaW5zdHJ1bWVudHMucHVzaCh7XG5cdFx0XHRcImtleVwiOiBcImJhc2ljLXBpYW5vXCIsXG5cdFx0XHRcInR5cGVcIjogXCJoYXJtb25pY1wiLFxuXHRcdFx0XCJuYW1lXCI6IFwiUGlhbm9cIixcblx0XHRcdFwic2FtcGxlXCI6IFwic2FtcGxlcy9waWFuby1jLndhdlwiLFxuXHRcdFx0XCJpY29uXCI6IFwicGlhbm8uc3ZnXCIsXG5cdFx0XHRcImRlZmF1bHRWb2x1bWVcIjogMC4yNVxuXHRcdH0pO1xuXG5cdFx0c3RhdGUuaW5zdHJ1bWVudHMucHVzaCh7XG5cdFx0XHRcImtleVwiOiBcImJhc2ljLW9yZ2FuXCIsXG5cdFx0XHRcInR5cGVcIjogXCJoYXJtb25pY1wiLFxuXHRcdFx0XCJuYW1lXCI6IFwiS29yZyBPcmdhblwiLFxuXHRcdFx0XCJzYW1wbGVcIjogXCJzYW1wbGVzL0tvcmctRFctODAwMC1Pcmdhbi1DMy53YXZcIixcblx0XHRcdFwiaWNvblwiOiBcIm9yZ2FuLnN2Z1wiLFxuXHRcdFx0XCJkZWZhdWx0Vm9sdW1lXCI6IDAuMjVcblx0XHR9KTtcblxuXHRcdHN0YXRlLmluc3RydW1lbnRzLnB1c2goe1xuXHRcdFx0XCJrZXlcIjogXCJiYXNpYy1jbGF2XCIsXG5cdFx0XHRcInR5cGVcIjogXCJoYXJtb25pY1wiLFxuXHRcdFx0XCJuYW1lXCI6IFwiQ2xhdlwiLFxuXHRcdFx0XCJzYW1wbGVcIjogXCJzYW1wbGVzL0Vuc29uaXEtRVNRLTEtQ2xhdi1QaWFuby1DMy53YXZcIixcblx0XHRcdFwiaWNvblwiOiBcImNsYXYuc3ZnXCIsXG5cdFx0XHRcImRlZmF1bHRWb2x1bWVcIjogMC43NVxuXHRcdH0pO1xuXG5cdFx0c3RhdGUuaW5zdHJ1bWVudHMucHVzaCh7XG5cdFx0XHRcImtleVwiOiBcImJhc2ljLXN0cmluZ3NcIixcblx0XHRcdFwidHlwZVwiOiBcImhhcm1vbmljXCIsXG5cdFx0XHRcIm5hbWVcIjogXCJTdHJpbmdzXCIsXG5cdFx0XHRcInNhbXBsZVwiOiBcInNhbXBsZXMvWWFtYWhhLUVYNS1NZWxsb3dTdHJuZ3MtQzQud2F2XCIsXG5cdFx0XHRcImljb25cIjogXCJ2aW9saW4uc3ZnXCIsXG5cdFx0XHRcImRlZmF1bHRWb2x1bWVcIjogMC4yNVxuXHRcdH0pXG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRhc3luYyBpbml0KCkge1xuXHRcdGxldCBzdGF0ZT10aGlzLmluaXRTdGF0ZSgpO1xuXHRcdGxldCBzb25nRGF0YUpzb249d2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiaG9vZG1vZGUtc29uZ3NcIik7XG5cdFx0aWYgKHNvbmdEYXRhSnNvbilcblx0XHRcdHN0YXRlLnNvbmdzPUpTT04ucGFyc2Uoc29uZ0RhdGFKc29uKTtcblxuXHRcdGlmICghc3RhdGUuc29uZ3MgfHwgIXN0YXRlLnNvbmdzLmxlbmd0aClcblx0XHRcdHN0YXRlLnNvbmdzPWRlbW9zb25ncztcblxuXHRcdHRoaXMuY29uZHVjdG9yLnNldFN0YXRlKHN0YXRlKTtcblx0XHRhd2FpdCB0aGlzLmNvbmR1Y3Rvci5sb2FkSW5zdHJ1bWVudHMoKTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fTtcblxuXHRhZGRTb25nKHN0YXRlLCBuYW1lKSB7XG5cdFx0aWYgKCFuYW1lIHx8IG5hbWUudG9TdHJpbmcoKT09XCJbb2JqZWN0IE1vdXNlRXZlbnRdXCIpXG5cdFx0XHRuYW1lPVwiTXkgTmV3IFNvbmdcIjtcblxuXHRcdGxldCBpbmRleD1zdGF0ZS5zb25ncy5sZW5ndGg7XG5cblx0XHRzdGF0ZS5zb25ncy5wdXNoKHtcblx0XHRcdG5hbWU6IG5hbWUsXG5cdFx0XHRicG06IDEwMCxcblx0XHRcdGtleTogc2hvcnRpZC5nZW5lcmF0ZSgpLFxuXHRcdFx0bXVzaWNLZXk6IFwiQVwiLFxuXHRcdFx0bWlub3I6IHRydWUsXG5cdFx0XHRsYXllcnM6IFtdLFxuXHRcdFx0Y2hvcmRTZXF1ZW5jZTogW10sXG5cdFx0XHRzZWN0aW9uczogW1xuXHRcdFx0XHRbMF0sXG5cdFx0XHRcdFswXSxcblx0XHRcdFx0WzBdXG5cdFx0XHRdXG5cdFx0fSk7XG5cblx0XHRzdGF0ZT10aGlzLnNldFNvbmdJbmRleChzdGF0ZSxpbmRleCk7XG5cdFx0c3RhdGU9dGhpcy5hZGRTZXF1ZW5jZUNob3JkKHN0YXRlKTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHNldEN1cnJlbnRDaG9yZEluZGV4KHN0YXRlLCBpbmRleCkge1xuXHRcdHN0YXRlLmN1cnJlbnRDaG9yZEluZGV4PWluZGV4O1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0c2V0Q3VycmVudFNlY3Rpb25JbmRleChzdGF0ZSwgaW5kZXgpIHtcblx0XHRzdGF0ZS5jdXJyZW50U2VjdGlvbkluZGV4PWluZGV4O1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0Y2xvc2VTb25nKHN0YXRlKSB7XG5cdFx0c3RhdGUuY3VycmVudFNvbmdJbmRleD0tMTtcblx0XHRzdGF0ZS5jdXJyZW50U2VjdGlvbkluZGV4PS0xO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0c2V0U29uZ0luZGV4KHN0YXRlLCBpbmRleCkge1xuXHRcdGlmIChpbmRleD09c3RhdGUuY3VycmVudFNvbmdJbmRleClcblx0XHRcdHJldHVybiBzdGF0ZTtcblxuXHRcdHN0YXRlLmN1cnJlbnRTb25nSW5kZXg9aW5kZXg7XG5cdFx0c3RhdGUuY3VycmVudExheWVySW5kZXg9LTE7XG5cdFx0c3RhdGUuY3VycmVudENob3JkSW5kZXg9MDtcblx0XHRzdGF0ZS5jdXJyZW50R3JpZEluZGV4PS0xO1xuXHRcdHN0YXRlLmN1cnJlbnRTZWN0aW9uSW5kZXg9LTE7XG5cdFx0c3RhdGUucGxheWluZz1mYWxzZTtcblx0XHRzdGF0ZS5yZWNvcmRpbmc9ZmFsc2U7XG5cblx0XHRsZXQgc29uZz10aGlzLmhlbHBlci5nZXRDdXJyZW50U29uZyhzdGF0ZSk7XG5cdFx0Zm9yIChsZXQgaT1zb25nLnNlY3Rpb25zLmxlbmd0aC0xOyBpPj0wOyBpLS0pXG5cdFx0XHRpZiAoc29uZy5zZWN0aW9uc1tpXS5sZW5ndGg+MSlcblx0XHRcdFx0c3RhdGUuY3VycmVudFNlY3Rpb25JbmRleD1pO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0c2hvd1NldHRpbmdzKHN0YXRlKSB7XG5cdFx0c3RhdGUuc2V0dGluZ3NWaXNpYmxlPXRydWU7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRoaWRlU2V0dGluZ3Moc3RhdGUpIHtcblx0XHRzdGF0ZS5zZXR0aW5nc1Zpc2libGU9ZmFsc2U7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRzaG93QWJvdXRTY3JlZW4oc3RhdGUpIHtcblx0XHRzdGF0ZS5hYm91dFNjcmVlblZpc2libGU9dHJ1ZTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdGhpZGVBYm91dFNjcmVlbihzdGF0ZSkge1xuXHRcdHN0YXRlLmFib3V0U2NyZWVuVmlzaWJsZT1mYWxzZTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHRvZ2dsZVNldHRpbmdzKHN0YXRlKSB7XG5cdFx0c3RhdGUuc2V0dGluZ3NWaXNpYmxlPSFzdGF0ZS5zZXR0aW5nc1Zpc2libGU7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRzZXRDdXJyZW50U29uZ05hbWUoc3RhdGUsIG5hbWUpIHtcblx0XHRzdGF0ZS5zb25nc1tzdGF0ZS5jdXJyZW50U29uZ0luZGV4XS5uYW1lPW5hbWU7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRzZXRDdXJyZW50U29uZ0JwbShzdGF0ZSwgYnBtKSB7XG5cdFx0YnBtPXBhcnNlSW50KGJwbSk7XG5cdFx0aWYgKGlzTmFOKGJwbSkpXG5cdFx0XHRicG09MTAwO1xuXG5cdFx0aWYgKGJwbTw1MClcblx0XHRcdGJwbT01MDtcblxuXHRcdGlmIChicG0+MjAwKVxuXHRcdFx0YnBtPTIwMDtcblxuXHRcdHN0YXRlLnNvbmdzW3N0YXRlLmN1cnJlbnRTb25nSW5kZXhdLmJwbT1icG07XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRzZXRDdXJyZW50U29uZ011c2ljS2V5KHN0YXRlLCBtdXNpY0tleSkge1xuXHRcdHN0YXRlLnNvbmdzW3N0YXRlLmN1cnJlbnRTb25nSW5kZXhdLm11c2ljS2V5PW11c2ljS2V5O1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0c2V0Q3VycmVudFNvbmdNaW5vcihzdGF0ZSwgbWlub3IpIHtcblx0XHRzdGF0ZS5zb25nc1tzdGF0ZS5jdXJyZW50U29uZ0luZGV4XS5taW5vcj1taW5vcjtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdGNvbmZpcm1EZWxldGVDdXJyZW50U29uZyhzdGF0ZSkge1xuXHRcdHN0YXRlLnNvbmdzLnNwbGljZShzdGF0ZS5jdXJyZW50U29uZ0luZGV4LDEpO1xuXHRcdHN0YXRlLmN1cnJlbnRTb25nSW5kZXg9LTE7XG5cdFx0c3RhdGUuc2V0dGluZ3NWaXNpYmxlPWZhbHNlO1xuXHRcdHN0YXRlLmN1cnJlbnRTZWN0aW9uSW5kZXg9LTE7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRkZWxldGVDdXJyZW50U29uZyhzdGF0ZSkge1xuXHRcdHN0YXRlLmRpYWxvZ1RleHQ9XCJTdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGUgc29uZz9cIjtcblx0XHRzdGF0ZS5kaWFsb2dBY3Rpb249XCJjb25maXJtRGVsZXRlQ3VycmVudFNvbmdcIjtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdGNvbmZpcm1EaWFsb2coc3RhdGUpIHtcblx0XHRzdGF0ZT10aGlzW3N0YXRlLmRpYWxvZ0FjdGlvbl0oc3RhdGUpO1xuXG5cdFx0c3RhdGUuZGlhbG9nVGV4dD1udWxsO1xuXHRcdHN0YXRlLmRpYWxvZ0FjdGlvbj1udWxsO1xuXHRcdHN0YXRlLmRpYWxvZ0RhdGE9bnVsbDtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdGNhbmNlbERpYWxvZyhzdGF0ZSkge1xuXHRcdHN0YXRlLmRpYWxvZ1RleHQ9bnVsbDtcblx0XHRzdGF0ZS5kaWFsb2dBY3Rpb249bnVsbDtcblx0XHRzdGF0ZS5kaWFsb2dEYXRhPW51bGw7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRzaG93QWRkTGF5ZXIoc3RhdGUpIHtcblx0XHRzdGF0ZS5hZGRMYXllclZpc2libGU9dHJ1ZTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdGhpZGVBZGRMYXllcihzdGF0ZSkge1xuXHRcdHN0YXRlLmFkZExheWVyVmlzaWJsZT1mYWxzZTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdGFkZFNlcXVlbmNlQ2hvcmQoc3RhdGUpIHtcblx0XHRsZXQgc29uZz10aGlzLmhlbHBlci5nZXRDdXJyZW50U29uZyhzdGF0ZSk7XG5cblx0XHRzb25nLmNob3JkU2VxdWVuY2UucHVzaCh7XG5cdFx0XHRjaG9yZEluZGV4OiAwLFxuXHRcdFx0a2V5OiBzaG9ydGlkLmdlbmVyYXRlKClcblx0XHR9KTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdGFkZExheWVyKHN0YXRlLCBpbnN0cnVtZW50S2V5KSB7XG5cdFx0bGV0IHNvbmc9c3RhdGUuc29uZ3Nbc3RhdGUuY3VycmVudFNvbmdJbmRleF07XG5cblx0XHRsZXQgc2VxPVtdO1xuXHRcdGxldCBudW1Tb3VuZHM9dGhpcy5oZWxwZXIuZ2V0SW5zdHJ1bWVudE51bVNvdW5kc0J5S2V5KHN0YXRlLGluc3RydW1lbnRLZXkpO1xuXHRcdGxldCBpbnN0cnVtZW50PXRoaXMuaGVscGVyLmdldEluc3RydW1lbnRCeUtleShzdGF0ZSxpbnN0cnVtZW50S2V5KTtcblxuXHRcdGxldCB2b2x1bWU9MTtcblx0XHRpZiAoaW5zdHJ1bWVudC5oYXNPd25Qcm9wZXJ0eShcImRlZmF1bHRWb2x1bWVcIikpXG5cdFx0XHR2b2x1bWU9aW5zdHJ1bWVudC5kZWZhdWx0Vm9sdW1lO1xuXG5cdFx0Zm9yIChsZXQgaT0wOyBpPDE2OyBpKyspXG5cdFx0XHRzZXEucHVzaCh7XG5cdFx0XHRcdHNvdW5kczogW10sXG5cdFx0XHRcdHZlbDogMSxcblx0XHRcdFx0c3RhY2M6IGZhbHNlXG5cdFx0XHR9KTtcblxuXHRcdGxldCBsYXllcj17XG5cdFx0XHRrZXk6IHNob3J0aWQuZ2VuZXJhdGUoKSxcblx0XHRcdGluc3RydW1lbnRLZXk6IGluc3RydW1lbnRLZXksXG5cdFx0XHRhdWRpYmxlOiB0cnVlLFxuXHRcdFx0dm9sdW1lOiB2b2x1bWUsXG5cdFx0XHRzZXE6IHNlcSxcblx0XHR9O1xuXG5cdFx0c29uZy5sYXllcnMucHVzaChsYXllcik7XG5cblx0XHRzdGF0ZS5hZGRMYXllclZpc2libGU9ZmFsc2U7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRzZXRMYXllckluZGV4KHN0YXRlLCBpbmRleCkge1xuXHRcdGxldCBzb25nPXRoaXMuaGVscGVyLmdldEN1cnJlbnRTb25nKHN0YXRlKTtcblxuXHRcdGlmICghdGhpcy5oZWxwZXIuaW5zdHJ1bWVudEV4aXN0cyhzdGF0ZSxzb25nLmxheWVyc1tpbmRleF0uaW5zdHJ1bWVudEtleSkpIHtcblx0XHRcdHN0YXRlLmRpYWxvZ1RleHQ9XCJMYXllciBpcyBicm9rZW4sIGRlbGV0ZT9cIjtcblx0XHRcdHN0YXRlLmRpYWxvZ0FjdGlvbj1cImRlbGV0ZURpYWxvZ0xheWVyXCI7XG5cdFx0XHRzdGF0ZS5kaWFsb2dEYXRhPWluZGV4O1xuXG5cdFx0XHRyZXR1cm4gc3RhdGU7XG5cdFx0fVxuXG5cdFx0c3RhdGUuY3VycmVudExheWVySW5kZXg9aW5kZXg7XG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0aGlkZUN1cnJlbnRMYXllcihzdGF0ZSkge1xuXHRcdHN0YXRlLmN1cnJlbnRMYXllckluZGV4PS0xO1xuXHRcdHN0YXRlLmN1cnJlbnRHcmlkSW5kZXg9LTE7XG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0dG9nZ2xlTGF5ZXJBdWRpYmxlKHN0YXRlLCBsYXllckluZGV4KSB7XG5cdFx0bGV0IHNvbmc9dGhpcy5oZWxwZXIuZ2V0Q3VycmVudFNvbmcoc3RhdGUpO1xuXHRcdHNvbmcubGF5ZXJzW2xheWVySW5kZXhdLmF1ZGlibGU9IXNvbmcubGF5ZXJzW2xheWVySW5kZXhdLmF1ZGlibGU7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRkZWxldGVEaWFsb2dMYXllcihzdGF0ZSkge1xuXHRcdGxldCBzb25nPXRoaXMuaGVscGVyLmdldEN1cnJlbnRTb25nKHN0YXRlKTtcblx0XHRzb25nLmxheWVycy5zcGxpY2Uoc3RhdGUuZGlhbG9nRGF0YSwxKTtcblx0XHRzdGF0ZS5jdXJyZW50TGF5ZXJJbmRleD0tMTtcblx0XHRzdGF0ZS5jdXJyZW50R3JpZEluZGV4PS0xO1xuXHRcdHN0YXRlLnNldHRpbmdzVmlzaWJsZT1mYWxzZTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdGRlbGV0ZUN1cnJlbnRMYXllcihzdGF0ZSkge1xuXHRcdGxldCBzb25nPXRoaXMuaGVscGVyLmdldEN1cnJlbnRTb25nKHN0YXRlKTtcblx0XHRzb25nLmxheWVycy5zcGxpY2Uoc3RhdGUuY3VycmVudExheWVySW5kZXgsMSk7XG5cdFx0c3RhdGUuY3VycmVudExheWVySW5kZXg9LTE7XG5cdFx0c3RhdGUuY3VycmVudEdyaWRJbmRleD0tMTtcblx0XHRzdGF0ZS5zZXR0aW5nc1Zpc2libGU9ZmFsc2U7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRzZXRDdXJyZW50TGF5ZXJWb2x1bWUoc3RhdGUsIHZvbHVtZSkge1xuXHRcdGxldCBsYXllcj10aGlzLmhlbHBlci5nZXRDdXJyZW50TGF5ZXIoc3RhdGUpO1xuXHRcdGxheWVyLnZvbHVtZT1wYXJzZUZsb2F0KHZvbHVtZSk7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRwbGF5Q2xpY2soc3RhdGUpIHtcblx0XHRzdGF0ZS5wbGF5aW5nPSFzdGF0ZS5wbGF5aW5nO1xuXHRcdHN0YXRlLmN1cnJlbnRHcmlkSW5kZXg9LTE7XG5cblx0XHRpZiAoIXN0YXRlLnBsYXlpbmcpXG5cdFx0XHRzdGF0ZS5yZWNvcmRpbmc9ZmFsc2U7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRyZWNvcmRDbGljayhzdGF0ZSkge1xuXHRcdHN0YXRlLnJlY29yZGluZz0hc3RhdGUucmVjb3JkaW5nO1xuXHRcdHN0YXRlLmN1cnJlbnRHcmlkSW5kZXg9LTE7XG5cblx0XHRpZiAoc3RhdGUucmVjb3JkaW5nICYmICFzdGF0ZS5wbGF5aW5nKVxuXHRcdFx0c3RhdGUucGxheWluZz10cnVlO1xuXG5cdFx0aWYgKCFzdGF0ZS5wbGF5aW5nKVxuXHRcdFx0c3RhdGUuY3VycmVudEdyaWRJbmRleD0tMTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdGRlbGV0ZVNlcXVlbmNlQ2hvcmQoc3RhdGUsIGluZGV4KSB7XG5cdFx0bGV0IHNvbmc9dGhpcy5oZWxwZXIuZ2V0Q3VycmVudFNvbmcoc3RhdGUpO1xuXHRcdHNvbmcuY2hvcmRTZXF1ZW5jZS5zcGxpY2UoaW5kZXgsMSk7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRzZXRTZXF1ZW5jZUNob3JkKHN0YXRlLCBzZXF1ZW5jZUluZGV4LCBjaG9yZEluZGV4KSB7XG5cdFx0bGV0IHNvbmc9dGhpcy5oZWxwZXIuZ2V0Q3VycmVudFNvbmcoc3RhdGUpO1xuXHRcdHNvbmcuY2hvcmRTZXF1ZW5jZVtzZXF1ZW5jZUluZGV4XS5jaG9yZEluZGV4PWNob3JkSW5kZXg7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRnb0JhY2soc3RhdGUpIHtcblx0XHRpZiAoc3RhdGUuc2V0dGluZ3NWaXNpYmxlKVxuXHRcdFx0cmV0dXJuIHRoaXMuaGlkZVNldHRpbmdzKHN0YXRlKTtcblxuXHRcdGVsc2UgaWYgKHN0YXRlLmN1cnJlbnRMYXllckluZGV4Pj0wKSB7XG5cdFx0XHRzdGF0ZS5jdXJyZW50TGF5ZXJJbmRleD0tMTtcblx0XHRcdHN0YXRlLmN1cnJlbnRHcmlkSW5kZXg9LTE7XG5cdFx0XHRyZXR1cm4gc3RhdGU7XG5cdFx0fVxuXG5cdFx0ZWxzZSBpZiAoc3RhdGUuYWRkTGF5ZXJWaXNpYmxlKVxuXHRcdFx0cmV0dXJuIHRoaXMuaGlkZUFkZExheWVyKHN0YXRlKTtcblxuXHRcdGVsc2UgaWYgKHRoaXMuaGVscGVyLmlzU29uZ09wZW4oc3RhdGUpKVxuXHRcdFx0cmV0dXJuIHRoaXMuY2xvc2VTb25nKHN0YXRlKVxuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0Z3JpZEluZGV4Q2xpY2soc3RhdGUsIG5ld0dyaWRJbmRleCkge1xuXHRcdHN0YXRlLnBsYXlpbmc9ZmFsc2U7XG5cdFx0c3RhdGUucmVjb3JkaW5nPWZhbHNlO1xuXG5cdFx0aWYgKHN0YXRlLmN1cnJlbnRHcmlkSW5kZXg9PW5ld0dyaWRJbmRleClcblx0XHRcdHN0YXRlLmN1cnJlbnRHcmlkSW5kZXg9LTE7XG5cblx0XHRlbHNlXG5cdFx0XHRzdGF0ZS5jdXJyZW50R3JpZEluZGV4PW5ld0dyaWRJbmRleDtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHRvZ2dsZUN1cnJlbnRMYXllclN0YWNjKHN0YXRlKSB7XG5cdFx0bGV0IGxheWVyPXRoaXMuaGVscGVyLmdldEN1cnJlbnRMYXllcihzdGF0ZSk7XG5cdFx0bGV0IGdyaWRJbmRleD1zdGF0ZS5jdXJyZW50R3JpZEluZGV4O1xuXG5cdFx0aWYgKHN0YXRlLnJlY29yZGluZylcblx0XHRcdGdyaWRJbmRleD10aGlzLmNvbmR1Y3Rvci5nZXRQbGF5R3JpZEluZGV4KCk7XG5cblx0XHRpZiAoZ3JpZEluZGV4PDApXG5cdFx0XHRyZXR1cm4gc3RhdGU7XG5cblx0XHRsYXllci5zZXFbZ3JpZEluZGV4XS5zdGFjYz0hbGF5ZXIuc2VxW2dyaWRJbmRleF0uc3RhY2M7XG5cdFx0aWYgKGxheWVyLnNlcVtncmlkSW5kZXhdLnN0YWNjKVxuXHRcdFx0bGF5ZXIuc2VxW2dyaWRJbmRleF0uc291bmRzPVtdO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0c2V0Q3VycmVudExheWVyVmVsKHN0YXRlLCB2ZWwpIHtcblx0XHRsZXQgbGF5ZXI9dGhpcy5oZWxwZXIuZ2V0Q3VycmVudExheWVyKHN0YXRlKTtcblx0XHRsZXQgZ3JpZEluZGV4PXN0YXRlLmN1cnJlbnRHcmlkSW5kZXg7XG5cblx0XHRpZiAoc3RhdGUucmVjb3JkaW5nKVxuXHRcdFx0Z3JpZEluZGV4PXRoaXMuY29uZHVjdG9yLmdldFBsYXlHcmlkSW5kZXgoKTtcblxuXHRcdGlmIChncmlkSW5kZXg8MClcblx0XHRcdHJldHVybiBzdGF0ZTtcblxuXHRcdGxheWVyLnNlcVtncmlkSW5kZXhdLnZlbD12ZWw7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRzZXRHcmlkU291bmQoc3RhdGUsIGdyaWRJbmRleCwgc291bmRJbmRleCwgZW5hYmxlZCkge1xuXHRcdGxldCBsYXllcj10aGlzLmhlbHBlci5nZXRDdXJyZW50TGF5ZXIoc3RhdGUpO1xuXHRcdGxldCBjdXJyZW50RW5hYmxlZD1cblx0XHRcdGxheWVyLnNlcVtncmlkSW5kZXhdLnNvdW5kcy5pbmNsdWRlcyhzb3VuZEluZGV4KTtcblxuXHRcdGlmIChlbmFibGVkPT1jdXJyZW50RW5hYmxlZClcblx0XHRcdHJldHVybiBzdGF0ZTtcblxuXHRcdGlmIChlbmFibGVkKSB7XG5cdFx0XHRsYXllci5zZXFbZ3JpZEluZGV4XS5zb3VuZHMucHVzaChzb3VuZEluZGV4KTtcblx0XHRcdGxheWVyLnNlcVtncmlkSW5kZXhdLnN0YWNjPWZhbHNlO1xuXHRcdH1cblxuXHRcdGVsc2Uge1xuXHRcdFx0bGF5ZXIuc2VxW2dyaWRJbmRleF0uc291bmRzLnNwbGljZShcblx0XHRcdFx0bGF5ZXIuc2VxW2dyaWRJbmRleF0uc291bmRzLmluZGV4T2Yoc291bmRJbmRleCksXG5cdFx0XHRcdDFcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0c2V0Q3VycmVudEdyaWRTb3VuZChzdGF0ZSwgc291bmRJbmRleCwgZW5hYmxlZCkge1xuXHRcdHJldHVybiB0aGlzLnNldEdyaWRTb3VuZChzdGF0ZSxzdGF0ZS5jdXJyZW50R3JpZEluZGV4LHNvdW5kSW5kZXgsZW5hYmxlZCk7XG5cdH1cblxuXHRzb3VuZEJ1dHRvbkNsaWNrKHN0YXRlLCBzb3VuZEluZGV4KSB7XG5cdFx0aWYgKHN0YXRlLnJlY29yZGluZykge1xuXHRcdFx0dGhpcy5jb25kdWN0b3IucGxheUxheWVySW5zdHJ1bWVudChzb3VuZEluZGV4KTtcblxuXHRcdFx0bGV0IGdyaWRJbmRleD10aGlzLmNvbmR1Y3Rvci5nZXRQbGF5R3JpZEluZGV4KCk7XG5cdFx0XHRzdGF0ZT10aGlzLnNldEdyaWRTb3VuZChzdGF0ZSxncmlkSW5kZXgsc291bmRJbmRleCx0cnVlKTtcblxuXHRcdFx0cmV0dXJuIHN0YXRlO1xuXHRcdH1cblxuXHRcdGlmIChzdGF0ZS5jdXJyZW50R3JpZEluZGV4PDApIHtcblx0XHRcdHRoaXMuY29uZHVjdG9yLnBsYXlMYXllckluc3RydW1lbnQoc291bmRJbmRleCk7XG5cdFx0XHRyZXR1cm4gc3RhdGU7XG5cdFx0fVxuXG5cdFx0bGV0IGxheWVyPXRoaXMuaGVscGVyLmdldEN1cnJlbnRMYXllcihzdGF0ZSk7XG5cdFx0bGV0IGVuYWJsZWQ9bGF5ZXIuc2VxW3N0YXRlLmN1cnJlbnRHcmlkSW5kZXhdLnNvdW5kcy5pbmNsdWRlcyhzb3VuZEluZGV4KTtcblx0XHRzdGF0ZT10aGlzLnNldEN1cnJlbnRHcmlkU291bmQoc3RhdGUsc291bmRJbmRleCwhZW5hYmxlZCk7XG5cblx0XHRpZiAobGF5ZXIuc2VxW3N0YXRlLmN1cnJlbnRHcmlkSW5kZXhdLnNvdW5kcy5pbmNsdWRlcyhzb3VuZEluZGV4KSlcblx0XHRcdHRoaXMuY29uZHVjdG9yLnBsYXlMYXllckluc3RydW1lbnQoc291bmRJbmRleCk7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRjaG9yZEJ1dHRvbkNsaWNrKHN0YXRlLCBvY3RhdmUpIHtcblx0XHRsZXQgaW5zdHJ1bWVudD10aGlzLmhlbHBlci5nZXRDdXJyZW50SW5zdHJ1bWVudChzdGF0ZSk7XG5cblx0XHRpZiAoc3RhdGUucmVjb3JkaW5nKSB7XG5cdFx0XHR0aGlzLmNvbmR1Y3Rvci5wbGF5TGF5ZXJJbnN0cnVtZW50KG9jdGF2ZSozKTtcblx0XHRcdHRoaXMuY29uZHVjdG9yLnBsYXlMYXllckluc3RydW1lbnQob2N0YXZlKjMrMSk7XG5cdFx0XHR0aGlzLmNvbmR1Y3Rvci5wbGF5TGF5ZXJJbnN0cnVtZW50KG9jdGF2ZSozKzIpO1xuXG5cdFx0XHRsZXQgZ3JpZEluZGV4PXRoaXMuY29uZHVjdG9yLmdldFBsYXlHcmlkSW5kZXgoKTtcblx0XHRcdHN0YXRlPXRoaXMuc2V0R3JpZFNvdW5kKHN0YXRlLGdyaWRJbmRleCxvY3RhdmUqMyx0cnVlKTtcblx0XHRcdHN0YXRlPXRoaXMuc2V0R3JpZFNvdW5kKHN0YXRlLGdyaWRJbmRleCxvY3RhdmUqMysxLHRydWUpO1xuXHRcdFx0c3RhdGU9dGhpcy5zZXRHcmlkU291bmQoc3RhdGUsZ3JpZEluZGV4LG9jdGF2ZSozKzIsdHJ1ZSk7XG5cblx0XHRcdHJldHVybiBzdGF0ZTtcblx0XHR9XG5cblx0XHRpZiAoc3RhdGUuY3VycmVudEdyaWRJbmRleDwwKSB7XG5cdFx0XHR0aGlzLmNvbmR1Y3Rvci5wbGF5TGF5ZXJJbnN0cnVtZW50KG9jdGF2ZSozKTtcblx0XHRcdHRoaXMuY29uZHVjdG9yLnBsYXlMYXllckluc3RydW1lbnQob2N0YXZlKjMrMSk7XG5cdFx0XHR0aGlzLmNvbmR1Y3Rvci5wbGF5TGF5ZXJJbnN0cnVtZW50KG9jdGF2ZSozKzIpO1xuXHRcdFx0cmV0dXJuIHN0YXRlO1xuXHRcdH1cblxuXHRcdGxldCBsYXllcj10aGlzLmhlbHBlci5nZXRDdXJyZW50TGF5ZXIoc3RhdGUpO1xuXHRcdGlmICh0aGlzLmhlbHBlci5jdXJyZW50TGF5ZXJIYXNDaG9yZEF0KHN0YXRlLHN0YXRlLmN1cnJlbnRHcmlkSW5kZXgsb2N0YXZlKSkge1xuXHRcdFx0c3RhdGU9dGhpcy5zZXRDdXJyZW50R3JpZFNvdW5kKHN0YXRlLG9jdGF2ZSozLGZhbHNlKTtcblx0XHRcdHN0YXRlPXRoaXMuc2V0Q3VycmVudEdyaWRTb3VuZChzdGF0ZSxvY3RhdmUqMysxLGZhbHNlKTtcblx0XHRcdHN0YXRlPXRoaXMuc2V0Q3VycmVudEdyaWRTb3VuZChzdGF0ZSxvY3RhdmUqMysyLGZhbHNlKTtcblx0XHR9XG5cblx0XHRlbHNlIHtcblx0XHRcdHN0YXRlPXRoaXMuc2V0Q3VycmVudEdyaWRTb3VuZChzdGF0ZSxvY3RhdmUqMyx0cnVlKTtcblx0XHRcdHN0YXRlPXRoaXMuc2V0Q3VycmVudEdyaWRTb3VuZChzdGF0ZSxvY3RhdmUqMysxLHRydWUpO1xuXHRcdFx0c3RhdGU9dGhpcy5zZXRDdXJyZW50R3JpZFNvdW5kKHN0YXRlLG9jdGF2ZSozKzIsdHJ1ZSk7XG5cdFx0XHR0aGlzLmNvbmR1Y3Rvci5wbGF5TGF5ZXJJbnN0cnVtZW50KG9jdGF2ZSozKTtcblx0XHRcdHRoaXMuY29uZHVjdG9yLnBsYXlMYXllckluc3RydW1lbnQob2N0YXZlKjMrMSk7XG5cdFx0XHR0aGlzLmNvbmR1Y3Rvci5wbGF5TGF5ZXJJbnN0cnVtZW50KG9jdGF2ZSozKzIpO1xuXHRcdH1cblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdGFkZFNlY3Rpb25DaG9yZChzdGF0ZSkge1xuXHRcdGxldCBzb25nPXRoaXMuaGVscGVyLmdldEN1cnJlbnRTb25nKHN0YXRlKTtcblx0XHRzb25nLnNlY3Rpb25zW3N0YXRlLmN1cnJlbnRTZWN0aW9uSW5kZXhdLnB1c2goMCk7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRzaG93RWRpdFNlY3Rpb25DaG9yZChzdGF0ZSxpbmRleCkge1xuXHRcdHN0YXRlLmVkaXRTZWN0aW9uQ2hvcmRWaXNpYmxlPWluZGV4O1xuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdGhpZGVFZGl0U2VjdGlvbkNob3JkKHN0YXRlLGluZGV4KSB7XG5cdFx0c3RhdGUuZWRpdFNlY3Rpb25DaG9yZFZpc2libGU9LTE7XG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0cmVtb3ZlU2VjdGlvbkNob3JkKHN0YXRlKSB7XG5cdFx0bGV0IHNvbmc9dGhpcy5oZWxwZXIuZ2V0Q3VycmVudFNvbmcoc3RhdGUpO1xuXHRcdHNvbmcuc2VjdGlvbnNbc3RhdGUuY3VycmVudFNlY3Rpb25JbmRleF0uc3BsaWNlKHN0YXRlLmVkaXRTZWN0aW9uQ2hvcmRWaXNpYmxlLDEpO1xuXG5cdFx0c3RhdGUuZWRpdFNlY3Rpb25DaG9yZFZpc2libGU9LTE7XG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0ZWRpdFNlY3Rpb25DaG9yZChzdGF0ZSwgaW5kZXgpIHtcblx0XHRsZXQgc29uZz10aGlzLmhlbHBlci5nZXRDdXJyZW50U29uZyhzdGF0ZSk7XG5cdFx0c29uZy5zZWN0aW9uc1tzdGF0ZS5jdXJyZW50U2VjdGlvbkluZGV4XVtzdGF0ZS5lZGl0U2VjdGlvbkNob3JkVmlzaWJsZV09aW5kZXg7XG5cdFx0c3RhdGUuZWRpdFNlY3Rpb25DaG9yZFZpc2libGU9LTE7XG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG59XG4iLCJpbXBvcnQgTXVzaWNVdGlsIGZyb20gJy4uL3V0aWxzL011c2ljVXRpbC5qcyc7XG5jb25zdCBhcHBQYWNrYWdlPXJlcXVpcmUoXCIuLi8uLi9wYWNrYWdlLmpzb25cIik7XG4vL2NvbnN0IGFwcFBhY2thZ2U9e3ZlcnNpb246IFwiYWJjXCJ9O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBIZWxwZXIge1xuXHRjb25zdHJ1Y3Rvcihjb25kdWN0b3IpIHtcblx0XHR0aGlzLmNvbmR1Y3Rvcj1jb25kdWN0b3I7XG5cdH1cblxuXHRnZXRBcHBWZXJzaW9uKCkge1xuXHRcdHJldHVybiBhcHBQYWNrYWdlLnZlcnNpb247XG5cdH1cblxuXHRnZXRDdXJyZW50U29uZyhzdGF0ZSkge1xuXHRcdHJldHVybiBzdGF0ZS5zb25nc1tzdGF0ZS5jdXJyZW50U29uZ0luZGV4XTtcblx0fVxuXG5cdGdldEN1cnJlbnRMYXllcihzdGF0ZSkge1xuXHRcdHJldHVybiBzdGF0ZS5zb25nc1tzdGF0ZS5jdXJyZW50U29uZ0luZGV4XS5sYXllcnNbc3RhdGUuY3VycmVudExheWVySW5kZXhdO1xuXHR9XG5cblx0aW5zdHJ1bWVudEV4aXN0cyhzdGF0ZSwga2V5KSB7XG5cdFx0Zm9yIChsZXQgaW5zdHJ1bWVudCBvZiBzdGF0ZS5pbnN0cnVtZW50cylcblx0XHRcdGlmIChpbnN0cnVtZW50LmtleT09a2V5KVxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGdldEluc3RydW1lbnRCeUtleShzdGF0ZSwga2V5KSB7XG5cdFx0Zm9yIChsZXQgaW5zdHJ1bWVudCBvZiBzdGF0ZS5pbnN0cnVtZW50cylcblx0XHRcdGlmIChpbnN0cnVtZW50LmtleT09a2V5KVxuXHRcdFx0XHRyZXR1cm4gaW5zdHJ1bWVudDtcblx0fVxuXG5cdGdldEluc3RydW1lbnRJY29uQnlLZXkoc3RhdGUsIGtleSkge1xuXHRcdGxldCBpbnN0cnVtZW50PXRoaXMuZ2V0SW5zdHJ1bWVudEJ5S2V5KHN0YXRlLGtleSk7XG5cblx0XHRpZiAoIWluc3RydW1lbnQpXG5cdFx0XHRyZXR1cm4gXCJicm9rZW4uc3ZnXCI7XG5cblx0XHRyZXR1cm4gaW5zdHJ1bWVudC5pY29uO1xuXHR9XG5cblx0Z2V0SW5zdHJ1bWVudE51bVNvdW5kc0J5S2V5KHN0YXRlLCBrZXkpIHtcblx0XHRsZXQgaW5zdHJ1bWVudD10aGlzLmdldEluc3RydW1lbnRCeUtleShzdGF0ZSxrZXkpO1xuXG5cdFx0c3dpdGNoIChpbnN0cnVtZW50LnR5cGUpIHtcblx0XHRcdGNhc2UgXCJoYXJtb25pY1wiOlxuXHRcdFx0XHRyZXR1cm4gOTtcblxuXHRcdFx0Y2FzZSBcInBlcmN1c3NpdmVcIjpcblx0XHRcdFx0cmV0dXJuIGluc3RydW1lbnQubGFiZWxzLmxlbmd0aDtcblx0XHR9XG5cdH1cblxuXHRnZXRDdXJyZW50SW5zdHJ1bWVudChzdGF0ZSkge1xuXHRcdGxldCBsYXllcj10aGlzLmdldEN1cnJlbnRMYXllcihzdGF0ZSk7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0SW5zdHJ1bWVudEJ5S2V5KHN0YXRlLGxheWVyLmluc3RydW1lbnRLZXkpO1xuXHR9XG5cblx0Z2V0Q3VycmVudEluc3RydW1lbnRTb3VuZExhYmVscyhzdGF0ZSkge1xuXHRcdGxldCBpbnN0cnVtZW50PXRoaXMuZ2V0Q3VycmVudEluc3RydW1lbnQoc3RhdGUpO1xuXG5cdFx0c3dpdGNoIChpbnN0cnVtZW50LnR5cGUpIHtcblx0XHRcdGNhc2UgXCJoYXJtb25pY1wiOlxuXHRcdFx0XHRyZXR1cm4gW1wiVDFcIixcIlQyXCIsXCJUM1wiLFwiTy1UMVwiLFwiTy1UMlwiLFwiTy1UM1wiXTtcblxuXHRcdFx0Y2FzZSBcInBlcmN1c3NpdmVcIjpcblx0XHRcdFx0cmV0dXJuIGluc3RydW1lbnQubGFiZWxzO1xuXHRcdH1cblx0fVxuXG5cdGdldENob3JkTGFiZWxzKHN0YXRlKSB7XG5cdFx0bGV0IHNvbmc9dGhpcy5nZXRDdXJyZW50U29uZyhzdGF0ZSk7XG5cdFx0cmV0dXJuIE11c2ljVXRpbC5nZXRDaG9yZE5hbWVzRm9yU2NhbGUoc29uZy5tdXNpY0tleSxzb25nLm1pbm9yKTtcblx0fVxuXG5cdGdldEN1cnJlbnRTZWN0aW9uQ2hvcmRMYWJlbHMoc3RhdGUpIHtcblx0XHRsZXQgc29uZz10aGlzLmdldEN1cnJlbnRTb25nKHN0YXRlKTtcblx0XHRsZXQgY2hvcmROYW1lcz1NdXNpY1V0aWwuZ2V0Q2hvcmROYW1lc0ZvclNjYWxlKHNvbmcubXVzaWNLZXksc29uZy5taW5vcik7XG5cdFx0bGV0IHNlY3Rpb249c29uZy5zZWN0aW9uc1tzdGF0ZS5jdXJyZW50U2VjdGlvbkluZGV4XTtcblx0XHRsZXQgYT1bXTtcblxuXHRcdGZvciAobGV0IGkgb2Ygc2VjdGlvbilcblx0XHRcdGEucHVzaChjaG9yZE5hbWVzW2ldKTtcblxuXHRcdHJldHVybiBhO1xuXHR9XG5cblx0Z2V0Tm90ZXNTZWxlY3RPcHRpb25zKHN0YXRlKSB7XG5cdFx0bGV0IGE9W107XG5cblx0XHRmb3IgKGxldCBub3RlTmFtZSBvZiBNdXNpY1V0aWwuTk9URV9OQU1FUylcblx0XHRcdGEucHVzaCh7XG5cdFx0XHRcdGtleTogbm90ZU5hbWUsIGxhYmVsOiBub3RlTmFtZVxuXHRcdFx0fSk7XG5cblx0XHRyZXR1cm4gYTtcblx0fVxuXG5cdGdldENob3JkT3B0aW9ucyhzdGF0ZSkge1xuXHRcdGxldCBzb25nPXRoaXMuZ2V0Q3VycmVudFNvbmcoc3RhdGUpO1xuXHRcdGxldCBjaG9yZE5hbWVzPU11c2ljVXRpbC5nZXRDaG9yZE5hbWVzRm9yU2NhbGUoc29uZy5tdXNpY0tleSxzb25nLm1pbm9yKTtcblx0XHRsZXQgYT1bXTtcblxuXHRcdGZvciAobGV0IGNob3JkTmFtZSBvZiBjaG9yZE5hbWVzKVxuXHRcdFx0YS5wdXNoKHtcblx0XHRcdFx0a2V5OiBjaG9yZE5hbWUsXG5cdFx0XHRcdGxhYmVsOiBjaG9yZE5hbWVcblx0XHRcdH0pO1xuXG5cdFx0cmV0dXJuIGE7XG5cdH1cblxuXHRnZXRNb2RhbFNlbGVjdE9wdGlvbnMoc3RhdGUpIHtcblx0XHRyZXR1cm4gW1xuXHRcdFx0e2tleTogZmFsc2UsIGxhYmVsOiBcIm1ham9yXCJ9LFxuXHRcdFx0e2tleTogdHJ1ZSwgbGFiZWw6IFwibWlub3JcIn0sXG5cdFx0XTtcblx0fVxuXG5cdGN1cnJlbnRMYXllckhhc1NvdW5kQXQoc3RhdGUsIGdyaWRJbmRleCkge1xuXHRcdGxldCBsYXllcj10aGlzLmdldEN1cnJlbnRMYXllcihzdGF0ZSk7XG5cblx0XHRpZiAobGF5ZXIuc2VxW2dyaWRJbmRleF0uc291bmRzLmxlbmd0aD4wKVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRjdXJyZW50TGF5ZXJIYXNDaG9yZEF0KHN0YXRlLCBncmlkSW5kZXgsIG9jdGF2ZSkge1xuXHRcdGxldCBsYXllcj10aGlzLmdldEN1cnJlbnRMYXllcihzdGF0ZSk7XG5cblx0XHRmb3IgKGxldCBpPTA7IGk8MzsgaSsrKVxuXHRcdFx0aWYgKCFsYXllci5zZXFbZ3JpZEluZGV4XS5zb3VuZHMuaW5jbHVkZXMob2N0YXZlKjMraSkpXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0aXNTb25nT3BlbihzdGF0ZSkge1xuXHRcdHJldHVybiAoc3RhdGUuY3VycmVudFNvbmdJbmRleD49MCk7XG5cdH1cbn1cbiIsImltcG9ydCBBdWRpb1V0aWwgZnJvbSAnLi4vdXRpbHMvQXVkaW9VdGlsJztcbmltcG9ydCBSZWNvbmNpbGVBcnJheSBmcm9tICcuLi91dGlscy9SZWNvbmNpbGVBcnJheSc7XG5pbXBvcnQgQ29uZHVjdG9yTGF5ZXIgZnJvbSAnLi9Db25kdWN0b3JMYXllcic7XG5pbXBvcnQgQ29uZHVjdG9ySW5zdHJ1bWVudCBmcm9tICcuL0NvbmR1Y3Rvckluc3RydW1lbnQnO1xuaW1wb3J0IE11c2ljVXRpbCBmcm9tICcuLi91dGlscy9NdXNpY1V0aWwnO1xuaW1wb3J0IEF1ZGlvVGltZXIgZnJvbSAnLi4vdXRpbHMvQXVkaW9UaW1lcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbmR1Y3RvciB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdGxldCBBdWRpb0NvbnRleHQ9d2luZG93LkF1ZGlvQ29udGV4dDtcblxuXHRcdGlmICghQXVkaW9Db250ZXh0KVxuXHRcdFx0QXVkaW9Db250ZXh0PXdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQ7XG5cblx0XHRpZiAoIUF1ZGlvQ29udGV4dClcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vIHdlYiBhdWRpbyFcIik7XG5cblx0XHR0aGlzLmF1ZGlvQ29udGV4dD1uZXcgQXVkaW9Db250ZXh0KCk7XG5cdFx0dGhpcy5hdWRpb1RpbWVyPW5ldyBBdWRpb1RpbWVyKHRoaXMuYXVkaW9Db250ZXh0KTtcblx0XHR0aGlzLmF1ZGlvVGltZXIub25UaWNrPXRoaXMub25QbGF5VGljaztcblxuXHRcdHRoaXMuaW5zdHJ1bWVudHM9UmVjb25jaWxlQXJyYXkuY3JlYXRlV2l0aEZhY3RvcnkodGhpcy5jcmVhdGVJbnN0cnVtZW50KTtcblx0XHR0aGlzLmxheWVycz1SZWNvbmNpbGVBcnJheS5jcmVhdGVXaXRoRmFjdG9yeSh0aGlzLmNyZWF0ZUxheWVyKTtcblx0XHR0aGlzLmN1cnJlbnROb3Rlcz1bXTtcblx0XHR0aGlzLnBsYXlpbmdTZXF1ZW5jZUluZGV4PS0xO1xuXHRcdHRoaXMucGxheWluZ1NlcXVlbmNlQ2hvcmRJbmRleD0tMTtcblx0fVxuXG5cdGxvYWRJbnN0cnVtZW50cygpIHtcblx0XHRsZXQgcHJvbWlzZXM9W107XG5cdFx0Zm9yIChsZXQgaW5zdHJ1bWVudCBvZiB0aGlzLmluc3RydW1lbnRzLmdldEl0ZW1zKCkpXG5cdFx0XHRwcm9taXNlcy5wdXNoKGluc3RydW1lbnQubG9hZCgpKTtcblxuXHRcdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG5cdH1cblxuXHRjcmVhdGVMYXllcj0oZGF0YSk9Pntcblx0XHRyZXR1cm4gbmV3IENvbmR1Y3RvckxheWVyKHRoaXMsZGF0YSk7XG5cdH07XG5cblx0Y3JlYXRlSW5zdHJ1bWVudD0oZGF0YSk9Pntcblx0XHRyZXR1cm4gbmV3IENvbmR1Y3Rvckluc3RydW1lbnQodGhpcyxkYXRhKTtcblx0fTtcblxuXHRnZXRDb25kdWN0b3JJbnN0cnVtZW50QnlLZXkoa2V5KSB7XG5cdFx0Zm9yIChsZXQgaW5zdHJ1bWVudCBvZiB0aGlzLmluc3RydW1lbnRzLmdldEl0ZW1zKCkpIHtcblx0XHRcdGlmIChpbnN0cnVtZW50LmdldEtleSgpPT1rZXkpXG5cdFx0XHRcdHJldHVybiBpbnN0cnVtZW50O1xuXHRcdH1cblx0fVxuXG5cdGdldEN1cnJlbnRDb25kdWN0b3JMYXllcigpIHtcblx0XHRsZXQgc3RhdGU9dGhpcy5zdGF0ZTtcblx0XHRsZXQga2V5PXN0YXRlLnNvbmdzW3N0YXRlLmN1cnJlbnRTb25nSW5kZXhdLmxheWVyc1tzdGF0ZS5jdXJyZW50TGF5ZXJJbmRleF0ua2V5O1xuXG5cdFx0cmV0dXJuIHRoaXMubGF5ZXJzLmdldEl0ZW1CeUtleShrZXkpO1xuXHR9XG5cblx0cGxheUxheWVySW5zdHJ1bWVudChzb3VuZEluZGV4KSB7XG5cdFx0bGV0IGxheWVyPXRoaXMuZ2V0Q3VycmVudENvbmR1Y3RvckxheWVyKCk7XG5cblx0XHRpZiAobGF5ZXIuaW5zdHJ1bWVudCkge1xuXHRcdFx0bGV0IG5vdGU9bGF5ZXIuaW5zdHJ1bWVudC5jcmVhdGVOb3RlKHNvdW5kSW5kZXgpO1xuXHRcdFx0bm90ZS5zZXRDaG9yZENlbnRzKHRoaXMuZ2V0Q3VycmVudENob3JkQ2VudHMoKSk7XG5cdFx0XHRub3RlLmNvbm5lY3QobGF5ZXIuZGVzdGluYXRpb24pO1xuXHRcdFx0bm90ZS5wbGF5Tm93KCk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0Q3VycmVudFNvbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUuc29uZ3NbdGhpcy5zdGF0ZS5jdXJyZW50U29uZ0luZGV4XTtcblx0fVxuXG5cdGdldENob3JkQ2VudHMoY2hvcmRJbmRleCkge1xuXHRcdGxldCBzb25nPXRoaXMuZ2V0Q3VycmVudFNvbmcoKTtcblx0XHRpZiAoIXNvbmcgfHwgY2hvcmRJbmRleDwwKVxuXHRcdFx0cmV0dXJuIFswLDAsMF07XG5cblx0XHRsZXQgc2NhbGVDaG9yZE5vdGVzPU11c2ljVXRpbC5nZXRDaG9yZE5vdGVzRm9yU2NhbGUoc29uZy5tdXNpY0tleSxzb25nLm1pbm9yKTtcblx0XHRsZXQgY2hvcmROb3Rlcz1zY2FsZUNob3JkTm90ZXNbY2hvcmRJbmRleF07XG5cdFx0cmV0dXJuIFtcblx0XHRcdE11c2ljVXRpbC5ub3RlVG9DZW50cyhjaG9yZE5vdGVzWzBdKSxcblx0XHRcdE11c2ljVXRpbC5ub3RlVG9DZW50cyhjaG9yZE5vdGVzWzFdKSxcblx0XHRcdE11c2ljVXRpbC5ub3RlVG9DZW50cyhjaG9yZE5vdGVzWzJdKVxuXHRcdF07XG5cdH1cblxuXHRnZXRDdXJyZW50Q2hvcmRDZW50cygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRDaG9yZENlbnRzKHRoaXMuc3RhdGUuY3VycmVudENob3JkSW5kZXgpO1xuXHR9XG5cblx0b25Ob3RlRW5kZWQobm90ZSkge1xuXHRcdGxldCBpZHg9dGhpcy5jdXJyZW50Tm90ZXMuaW5kZXhPZihub3RlKTtcblx0XHRpZiAoaWR4PDApXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLmN1cnJlbnROb3Rlcy5zcGxpY2UoaWR4LDEpO1xuXHR9XG5cblx0Z2V0U2VjUGVyR3JpZCgpIHtcblx0XHRsZXQgc2VjUGVyQmVhdD02MC90aGlzLmdldEN1cnJlbnRTb25nKCkuYnBtO1xuXHRcdGxldCBzZWNQZXJHcmlkPXNlY1BlckJlYXQvNDtcblxuXHRcdHJldHVybiBzZWNQZXJHcmlkO1xuXHR9XG5cblx0Z2V0U2VjUGVyQmFyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFNlY1BlckdyaWQoKSoxNjtcblx0fVxuXG5cdHBsYXlHcmlkU2xpY2UoYXQsIGdyaWRJbmRleCwgY2hvcmRDZW50cykge1xuXHRcdGZvciAobGV0IGxheWVyIG9mIHRoaXMubGF5ZXJzLmdldEl0ZW1zKCkpIHtcblx0XHRcdGZvciAobGV0IHNvdW5kSW5kZXggb2YgbGF5ZXIuZGF0YS5zZXFbZ3JpZEluZGV4XS5zb3VuZHMpIHtcblx0XHRcdFx0aWYgKGxheWVyLmluc3RydW1lbnQpIHtcblx0XHRcdFx0XHRsZXQgbm90ZT1sYXllci5pbnN0cnVtZW50LmNyZWF0ZU5vdGUoc291bmRJbmRleCk7XG5cdFx0XHRcdFx0bm90ZS5jb25uZWN0KGxheWVyLmRlc3RpbmF0aW9uKTtcblx0XHRcdFx0XHRub3RlLnNldENob3JkQ2VudHMoY2hvcmRDZW50cyk7XG5cdFx0XHRcdFx0bm90ZS5wbGF5U2hlZHVsZWQoYXQsbGF5ZXIuZ2V0Tm90ZUxlbihncmlkSW5kZXgpKnRoaXMuZ2V0U2VjUGVyR3JpZCgpKTtcblx0XHRcdFx0XHRub3RlLnNldFZlbG9jaXR5KGxheWVyLmRhdGEuc2VxW2dyaWRJbmRleF0udmVsKTtcblxuXHRcdFx0XHRcdG5vdGUub25lbmRlZD10aGlzLm9uTm90ZUVuZGVkLmJpbmQodGhpcyxub3RlKTtcblx0XHRcdFx0XHR0aGlzLmN1cnJlbnROb3Rlcy5wdXNoKG5vdGUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cGxheUJhcihhdCwgY2hvcmRDZW50cykge1xuXHRcdGZvciAobGV0IGdyaWRJbmRleD0wOyBncmlkSW5kZXg8MTY7IGdyaWRJbmRleCsrKSB7XG5cdFx0XHR0aGlzLnBsYXlHcmlkU2xpY2UoXG5cdFx0XHRcdGF0K2dyaWRJbmRleCp0aGlzLmdldFNlY1BlckdyaWQoKSxcblx0XHRcdFx0Z3JpZEluZGV4LFxuXHRcdFx0XHRjaG9yZENlbnRzXG5cdFx0XHQpO1xuXHRcdH1cblx0fVxuXG5cdGdldFBsYXlHcmlkSW5kZXgoKSB7XG5cdFx0aWYgKCF0aGlzLmlzUGxheWluZygpKVxuXHRcdFx0cmV0dXJuIC0xO1xuXG5cdFx0cmV0dXJuIHRoaXMucGxheUdyaWRJbmRleDtcblx0fVxuXG5cdG9uUGxheVRpY2s9KHRpY2tJbmRleCk9Pntcblx0XHRsZXQgc29uZz10aGlzLmdldEN1cnJlbnRTb25nKCk7XG5cblx0XHRsZXQgYmFySW5kZXg9TWF0aC5mbG9vcih0aWNrSW5kZXgvMTYpO1xuXHRcdGxldCBncmlkSW5kZXg9dGlja0luZGV4JTE2O1xuXG5cdFx0dGhpcy5wbGF5R3JpZEluZGV4PWdyaWRJbmRleDtcblxuXHRcdGlmIChncmlkSW5kZXg9PTAgJiYgdGhpcy5wbGF5aW5nU2VxdWVuY2VJbmRleD49MCkge1xuXHRcdFx0dGhpcy5wbGF5aW5nU2VxdWVuY2VDaG9yZEluZGV4Kys7XG5cblx0XHRcdGlmICh0aGlzLnBsYXlpbmdTZXF1ZW5jZUNob3JkSW5kZXg+PXNvbmcuc2VjdGlvbnNbdGhpcy5wbGF5aW5nU2VxdWVuY2VJbmRleF0ubGVuZ3RoKVxuXHRcdFx0XHR0aGlzLnBsYXlpbmdTZXF1ZW5jZUNob3JkSW5kZXg9MDtcblx0XHR9XG5cblx0XHRpZiAoYmFySW5kZXg9PTAgJiYgdGlja0luZGV4PT0wKSB7XG5cdFx0XHRsZXQgY2VudHM9dGhpcy5nZXRDdXJyZW50Q2hvcmRDZW50cygpO1xuXG5cdFx0XHRpZiAodGhpcy5wbGF5aW5nU2VxdWVuY2VJbmRleD49MCkge1xuXHRcdFx0XHRsZXQgaT10aGlzLnBsYXlpbmdTZXF1ZW5jZUNob3JkSW5kZXg7XG5cdFx0XHRcdGNlbnRzPXRoaXMuZ2V0Q2hvcmRDZW50cyhzb25nLnNlY3Rpb25zW3RoaXMucGxheWluZ1NlcXVlbmNlSW5kZXhdW2ldKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5wbGF5QmFyKFxuXHRcdFx0XHR0aGlzLmF1ZGlvVGltZXIuc3RhcnRUaW1lLFxuXHRcdFx0XHRjZW50c1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAoZ3JpZEluZGV4PT0xNSkge1xuXHRcdFx0bGV0IGNlbnRzPXRoaXMuZ2V0Q3VycmVudENob3JkQ2VudHMoKTtcblxuXHRcdFx0aWYgKHRoaXMucGxheWluZ1NlcXVlbmNlSW5kZXg+PTApIHtcblx0XHRcdFx0bGV0IGk9dGhpcy5wbGF5aW5nU2VxdWVuY2VDaG9yZEluZGV4O1xuXHRcdFx0XHRpPShpKzEpJXNvbmcuc2VjdGlvbnNbdGhpcy5wbGF5aW5nU2VxdWVuY2VJbmRleF0ubGVuZ3RoO1xuXHRcdFx0XHRjZW50cz10aGlzLmdldENob3JkQ2VudHMoc29uZy5zZWN0aW9uc1t0aGlzLnBsYXlpbmdTZXF1ZW5jZUluZGV4XVtpXSk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMucGxheUJhcihcblx0XHRcdFx0dGhpcy5hdWRpb1RpbWVyLnN0YXJ0VGltZSsoYmFySW5kZXgrMSkqdGhpcy5nZXRTZWNQZXJCYXIoKSxcblx0XHRcdFx0Y2VudHNcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMub25QbGF5R3JpZEluZGV4Q2hhbmdlKVxuXHRcdFx0dGhpcy5vblBsYXlHcmlkSW5kZXhDaGFuZ2UoZ3JpZEluZGV4LHRoaXMucGxheWluZ1NlcXVlbmNlQ2hvcmRJbmRleCk7XG5cdH1cblxuXHRwbGF5PSgpPT57XG5cdFx0bGV0IHNvbmc9dGhpcy5nZXRDdXJyZW50U29uZygpO1xuXHRcdHRoaXMucGxheUJwbT1zb25nLmJwbTtcblxuXHRcdHRoaXMucGxheWluZ1NlcXVlbmNlSW5kZXg9dGhpcy5zdGF0ZS5jdXJyZW50U2VjdGlvbkluZGV4O1xuXHRcdHRoaXMucGxheWluZ1NlcXVlbmNlQ2hvcmRJbmRleD0tMTtcblxuXHRcdHRoaXMuYXVkaW9UaW1lci5zZXRTdGFydFRpbWUodGhpcy5hdWRpb0NvbnRleHQuY3VycmVudFRpbWUpO1xuXHRcdHRoaXMuYXVkaW9UaW1lci5zZXRUaWNrSW50ZXJ2YWwodGhpcy5nZXRTZWNQZXJHcmlkKCkpO1xuXHRcdHRoaXMuYXVkaW9UaW1lci5zdGFydCgpO1xuXHR9XG5cblx0c3RvcCgpIHtcblx0XHRpZiAodGhpcy5vblBsYXlHcmlkSW5kZXhDaGFuZ2UpXG5cdFx0XHR0aGlzLm9uUGxheUdyaWRJbmRleENoYW5nZSgtMSwtMSk7XG5cblx0XHR0aGlzLnBsYXlCcG09MDtcblx0XHR0aGlzLmF1ZGlvVGltZXIuc3RvcCgpO1xuXG5cdFx0Zm9yIChsZXQgbm90ZSBvZiB0aGlzLmN1cnJlbnROb3Rlcykge1xuXHRcdFx0bm90ZS5zZXRWZWxvY2l0eSgwKTtcblx0XHRcdG5vdGUub25lbmRlZD1udWxsO1xuXHRcdH1cblxuXHRcdHRoaXMuY3VycmVudE5vdGVzPVtdO1xuXHR9XG5cblx0aXNQbGF5aW5nKCkge1xuXHRcdHJldHVybiB0aGlzLmF1ZGlvVGltZXIuaXNSdW5uaW5nKCk7XG5cdH1cblxuXHRzZXRTdGF0ZT0oc3RhdGUpPT57XG5cdFx0dGhpcy5zdGF0ZT1zdGF0ZTtcblx0XHR0aGlzLmluc3RydW1lbnRzLnNldERhdGEoc3RhdGUuaW5zdHJ1bWVudHMpO1xuXG5cdFx0aWYgKHRoaXMuZ2V0Q3VycmVudFNvbmcoKSkge1xuXHRcdFx0dGhpcy5sYXllcnMuc2V0RGF0YSh0aGlzLmdldEN1cnJlbnRTb25nKCkubGF5ZXJzKTtcblx0XHRcdGlmIChzdGF0ZS5wbGF5aW5nICYmICF0aGlzLmlzUGxheWluZygpKVxuXHRcdFx0XHR0aGlzLnBsYXkoKTtcblxuXHRcdFx0ZWxzZSBpZiAoIXN0YXRlLnBsYXlpbmcgJiYgdGhpcy5pc1BsYXlpbmcoKSlcblx0XHRcdFx0dGhpcy5zdG9wKCk7XG5cblx0XHRcdGlmICh0aGlzLmlzUGxheWluZygpICYmIHRoaXMucGxheUJwbSE9dGhpcy5nZXRDdXJyZW50U29uZygpLmJwbSkge1xuXHRcdFx0XHR0aGlzLnN0b3AoKTtcblx0XHRcdFx0dGhpcy5wbGF5KCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZWxzZSB7XG5cdFx0XHR0aGlzLnN0b3AoKTtcblx0XHRcdHRoaXMubGF5ZXJzLnNldERhdGEoW10pO1xuXHRcdH1cblxuXHRcdGlmIChzdGF0ZS5jdXJyZW50U2VjdGlvbkluZGV4PDApIHtcblx0XHRcdHRoaXMucGxheWluZ1NlcXVlbmNlSW5kZXg9LTE7XG5cdFx0XHR0aGlzLnBsYXlpbmdTZXF1ZW5jZUNob3JkSW5kZXg9LTFcblx0XHRcdGxldCBjdXJyZW50Q2hvcmRDZW50cz10aGlzLmdldEN1cnJlbnRDaG9yZENlbnRzKCk7XG5cdFx0XHRmb3IgKGxldCBub3RlIG9mIHRoaXMuY3VycmVudE5vdGVzKVxuXHRcdFx0XHRub3RlLnNldENob3JkQ2VudHMoY3VycmVudENob3JkQ2VudHMpO1xuXHRcdH1cblxuXHRcdGVsc2UgaWYgKHN0YXRlLmN1cnJlbnRTZWN0aW9uSW5kZXghPXRoaXMucGxheWluZ1NlcXVlbmNlSW5kZXgpIHtcblx0XHRcdHRoaXMucGxheWluZ1NlcXVlbmNlSW5kZXg9c3RhdGUuY3VycmVudFNlY3Rpb25JbmRleDtcblx0XHRcdHRoaXMucGxheWluZ1NlcXVlbmNlQ2hvcmRJbmRleD0tMTtcblx0XHR9XG5cdH07XG59XG4iLCJpbXBvcnQgQXVkaW9VdGlsIGZyb20gJy4uL3V0aWxzL0F1ZGlvVXRpbCc7XG5pbXBvcnQgTXVzaWNVdGlsIGZyb20gJy4uL3V0aWxzL011c2ljVXRpbCc7XG5pbXBvcnQgQ29uZHVjdG9yTm90ZSBmcm9tICcuL0NvbmR1Y3Rvck5vdGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25kdWN0b3JJbnN0cnVtZW50IHtcblx0Y29uc3RydWN0b3IoY29uZHVjdG9yLCBkYXRhKSB7XG5cdFx0dGhpcy5jb25kdWN0b3I9Y29uZHVjdG9yO1xuXHRcdHRoaXMuZGF0YT1kYXRhO1xuXHR9XG5cblx0Z2V0S2V5KCkge1xuXHRcdHJldHVybiB0aGlzLmRhdGEua2V5O1xuXHR9XG5cblx0YXN5bmMgbG9hZCgpIHtcblx0XHRzd2l0Y2ggKHRoaXMuZGF0YS50eXBlKSB7XG5cdFx0XHRjYXNlIFwiaGFybW9uaWNcIjpcblx0XHRcdFx0bGV0IHVybD10aGlzLmRhdGEuc2FtcGxlO1xuXHRcdFx0XHR0aGlzLmJ1ZmZlcj1hd2FpdCBBdWRpb1V0aWwubG9hZEJ1ZmZlcih1cmwsdGhpcy5jb25kdWN0b3IuYXVkaW9Db250ZXh0KTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgXCJwZXJjdXNzaXZlXCI6XG5cdFx0XHRcdHRoaXMuYnVmZmVycz1bXTtcblx0XHRcdFx0Zm9yIChsZXQgdXJsIG9mIHRoaXMuZGF0YS5zYW1wbGVzKVxuXHRcdFx0XHRcdHRoaXMuYnVmZmVycy5wdXNoKGF3YWl0IEF1ZGlvVXRpbC5sb2FkQnVmZmVyKHVybCx0aGlzLmNvbmR1Y3Rvci5hdWRpb0NvbnRleHQpKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cblx0dXBkYXRlKGRhdGEpIHtcblx0fVxuXG5cdGZpbmFsaXplKCkge1xuXHR9XG5cblx0Y3JlYXRlTm90ZShzb3VuZEluZGV4KSB7XG5cdFx0c3dpdGNoICh0aGlzLmRhdGEudHlwZSkge1xuXHRcdFx0Y2FzZSBcImhhcm1vbmljXCI6XG5cdFx0XHRcdGxldCBub3RlPW5ldyBDb25kdWN0b3JOb3RlKHRoaXMuY29uZHVjdG9yLHRoaXMuYnVmZmVyLHNvdW5kSW5kZXgpO1xuXHRcdFx0XHRpZiAodGhpcy5kYXRhLnNhbXBsZU5vdGUpXG5cdFx0XHRcdFx0bm90ZS5zZXRTYW1wbGVOb3RlQ2VudHMoTXVzaWNVdGlsLm5vdGVUb0NlbnRzKHRoaXMuZGF0YS5zYW1wbGVOb3RlKSk7XG5cblx0XHRcdFx0cmV0dXJuIG5vdGU7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIFwicGVyY3Vzc2l2ZVwiOlxuXHRcdFx0XHRyZXR1cm4gbmV3IENvbmR1Y3Rvck5vdGUodGhpcy5jb25kdWN0b3IsdGhpcy5idWZmZXJzW3NvdW5kSW5kZXhdKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uZHVjdG9yTGF5ZXIge1xuXHRjb25zdHJ1Y3Rvcihjb25kdWN0b3IsIGRhdGEpIHtcblx0XHR0aGlzLmNvbmR1Y3Rvcj1jb25kdWN0b3I7XG5cdFx0dGhpcy5kYXRhPWRhdGE7XG5cdFx0dGhpcy5pbnN0cnVtZW50PXRoaXMuY29uZHVjdG9yLmdldENvbmR1Y3Rvckluc3RydW1lbnRCeUtleShkYXRhLmluc3RydW1lbnRLZXkpO1xuXHRcdC8qaWYgKCF0aGlzLmluc3RydW1lbnQpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJUaGVyZSBpcyBubyBpbnN0cnVtZW50ISEhXCIpOyovXG5cblx0XHR0aGlzLmdhaW49dGhpcy5jb25kdWN0b3IuYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKTtcblx0XHR0aGlzLmdhaW4uY29ubmVjdCh0aGlzLmNvbmR1Y3Rvci5hdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xuXHRcdHRoaXMudXBkYXRlR2FpbigpO1xuXG5cdFx0dGhpcy5kZXN0aW5hdGlvbj10aGlzLmdhaW47XG5cdH1cblxuXHR1cGRhdGUoZGF0YSkge1xuXHRcdHRoaXMuZGF0YT1kYXRhO1xuXHRcdHRoaXMudXBkYXRlR2FpbigpO1xuXHR9XG5cblx0ZmluYWxpemUoKSB7XG5cdFx0dGhpcy5nYWluLmRpc2Nvbm5lY3QoKTtcblx0fVxuXG5cdHVwZGF0ZUdhaW4oKSB7XG5cdFx0aWYgKHRoaXMuZGF0YS5hdWRpYmxlIHx8IHRoaXMuZGF0YS5pbmRleD09dGhpcy5jb25kdWN0b3Iuc3RhdGUuY3VycmVudExheWVySW5kZXgpXG5cdFx0XHR0aGlzLmdhaW4uZ2Fpbi52YWx1ZT10aGlzLmRhdGEudm9sdW1lO1xuXG5cdFx0ZWxzZVxuXHRcdFx0dGhpcy5nYWluLmdhaW4udmFsdWU9MDtcblx0fVxuXG5cdGhhc1NvdW5kQXQocG9zKSB7XG5cdFx0aWYgKHRoaXMuZGF0YS5zZXFbcG9zXS5zb3VuZHMubGVuZ3RoPjApXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGdldE5vdGVMZW4ocG9zKSB7XG5cdFx0Zm9yIChsZXQgaT0xOyBpPHRoaXMuZGF0YS5zZXEubGVuZ3RoOyBpKyspXG5cdFx0XHRpZiAodGhpcy5oYXNTb3VuZEF0KChwb3MraSklMTYpXG5cdFx0XHRcdFx0fHwgdGhpcy5kYXRhLnNlcVsocG9zK2kpJTE2XS5zdGFjYylcblx0XHRcdFx0cmV0dXJuIGk7XG5cblx0XHRyZXR1cm4gMTY7XG5cdH1cbn0iLCJpbXBvcnQgTXVzaWNVdGlsIGZyb20gJy4uL3V0aWxzL011c2ljVXRpbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbmR1Y3Rvck5vdGUge1xuXHRjb25zdHJ1Y3Rvcihjb25kdWN0b3IsIGJ1ZmZlciwgY2hvcmROb3RlKSB7XG5cdFx0dGhpcy5jb25kdWN0b3I9Y29uZHVjdG9yO1xuXHRcdHRoaXMuYnVmZmVyPWJ1ZmZlcjtcblxuXHRcdHRoaXMuZ2Fpbj10aGlzLmNvbmR1Y3Rvci5hdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpO1xuXHRcdHRoaXMuc291cmNlPXRoaXMuY29uZHVjdG9yLmF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcblx0XHR0aGlzLnNvdXJjZS5idWZmZXI9dGhpcy5idWZmZXI7XG5cdFx0dGhpcy5zb3VyY2UuY29ubmVjdCh0aGlzLmdhaW4pO1xuXHRcdHRoaXMuc291cmNlLm9uZW5kZWQ9KCk9Pntcblx0XHRcdHRoaXMuZ2Fpbi5kaXNjb25uZWN0KCk7XG5cdFx0XHRpZiAodGhpcy5vbmVuZGVkKVxuXHRcdFx0XHR0aGlzLm9uZW5kZWQodGhpcyk7XG5cdFx0fVxuXG5cdFx0dGhpcy5jaG9yZE5vdGU9Y2hvcmROb3RlO1xuXHRcdHRoaXMuY2hvcmRDZW50cz1bMCwxMDAsMjAwXTtcblx0XHR0aGlzLnNhbXBsZU5vdGVDZW50cz0wO1xuXHRcdHRoaXMudXBkYXRlRGV0dW5lKCk7XG5cdH1cblxuXHRjb25uZWN0KGRlc3RpbmF0aW9uKSB7XG5cdFx0dGhpcy5pc0Nvbm5lY3RlZD10cnVlO1xuXHRcdHRoaXMuZ2Fpbi5jb25uZWN0KGRlc3RpbmF0aW9uKTtcblx0fVxuXG5cdHNldFNhbXBsZU5vdGVDZW50cyhjZW50cykge1xuXHRcdHRoaXMuc2FtcGxlTm90ZUNlbnRzPWNlbnRzO1xuXHRcdHRoaXMudXBkYXRlRGV0dW5lKCk7XG5cdH1cblxuXHRzZXRDaG9yZENlbnRzKGNob3JkQ2VudHMpIHtcblx0XHR0aGlzLmNob3JkQ2VudHM9Y2hvcmRDZW50cztcblx0XHR0aGlzLnVwZGF0ZURldHVuZSgpO1xuXHR9XG5cblx0cGxheU5vdygpIHtcblx0XHRpZiAoIXRoaXMuaXNDb25uZWN0ZWQpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJub3RlIG5vdCBjb25uZWN0ZWQhXCIpO1xuXG5cdFx0dGhpcy5zb3VyY2Uuc3RhcnQoKTtcblx0fVxuXG5cdHBsYXlTaGVkdWxlZChhdCwgZHVyYXRpb24pIHtcblx0XHRpZiAoIXRoaXMuaXNDb25uZWN0ZWQpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJub3RlIG5vdCBjb25uZWN0ZWQhXCIpO1xuXG5cdFx0dGhpcy5zb3VyY2Uuc3RhcnQoYXQpO1xuXHRcdHRoaXMuc291cmNlLnN0b3AoYXQrZHVyYXRpb24pO1xuXHR9XG5cblx0dXBkYXRlRGV0dW5lKCkge1xuXHRcdGxldCBjZW50cztcblxuXHRcdGlmICh0aGlzLmNob3JkTm90ZT09dW5kZWZpbmVkKVxuXHRcdFx0Y2VudHM9MDtcblxuXHRcdGVsc2Vcblx0XHRcdGNlbnRzPVxuXHRcdFx0XHRNdXNpY1V0aWwuT0NUQVZFX0NFTlRTKihNYXRoLmZsb29yKHRoaXMuY2hvcmROb3RlLzMpLTEpK1xuXHRcdFx0XHR0aGlzLmNob3JkQ2VudHNbdGhpcy5jaG9yZE5vdGUlM10tXG5cdFx0XHRcdHRoaXMuc2FtcGxlTm90ZUNlbnRzO1xuXG5cdFx0aWYgKHRoaXMuc291cmNlLmRldHVuZSlcblx0XHRcdHRoaXMuc291cmNlLmRldHVuZS52YWx1ZT1jZW50cztcblxuXHRcdGVsc2Vcblx0XHRcdHRoaXMuc291cmNlLnBsYXliYWNrUmF0ZS52YWx1ZT1NdXNpY1V0aWwucmF0ZUZyb21DZW50cyhjZW50cyk7XG5cdH1cblxuXHRzZXRWZWxvY2l0eSh2ZWwpIHtcblx0XHR0aGlzLmdhaW4uZ2Fpbi52YWx1ZT12ZWw7XG5cdH1cbn0iLCJtb2R1bGUuZXhwb3J0cz1cbltcbiAgIHtcbiAgICAgIFwibmFtZVwiOlwiU3VtbWVyZGVtb1wiLFxuICAgICAgXCJicG1cIjoxMDAsXG4gICAgICBcImtleVwiOlwiSHh3WTZ2YVBoXCIsXG4gICAgICBcIm11c2ljS2V5XCI6XCJHXCIsXG4gICAgICBcIm1pbm9yXCI6dHJ1ZSxcbiAgICAgIFwibGF5ZXJzXCI6W1xuICAgICAgICAge1xuICAgICAgICAgICAgXCJrZXlcIjpcImRVRzhGSjRwTlwiLFxuICAgICAgICAgICAgXCJpbnN0cnVtZW50S2V5XCI6XCJiYXNpYy1kcnVtc1wiLFxuICAgICAgICAgICAgXCJhdWRpYmxlXCI6dHJ1ZSxcbiAgICAgICAgICAgIFwidm9sdW1lXCI6MSxcbiAgICAgICAgICAgIFwic2VxXCI6W1xuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbMF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbN10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjAuMjUsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbMF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjowLjUsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOls1XSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MC41LFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbN10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjAuMjUsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOlswXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOls3XSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MC4yNSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOls4XSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6WzVdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjowLjUsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbN10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjAuMjUsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBcImluZGV4XCI6XCIwXCJcbiAgICAgICAgIH0sXG4gICAgICAgICB7XG4gICAgICAgICAgICBcImtleVwiOlwiSlBzZ1NzSEJlXCIsXG4gICAgICAgICAgICBcImluc3RydW1lbnRLZXlcIjpcImJhc2ljLWJhc3NcIixcbiAgICAgICAgICAgIFwiYXVkaWJsZVwiOnRydWUsXG4gICAgICAgICAgICBcInZvbHVtZVwiOjEsXG4gICAgICAgICAgICBcInNlcVwiOltcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6WzBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjp0cnVlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbMF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjp0cnVlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbMl0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgXCJpbmRleFwiOlwiMVwiXG4gICAgICAgICB9LFxuICAgICAgICAge1xuICAgICAgICAgICAgXCJrZXlcIjpcImN3WUluMnhwRFwiLFxuICAgICAgICAgICAgXCJpbnN0cnVtZW50S2V5XCI6XCJiYXNpYy1waWFub1wiLFxuICAgICAgICAgICAgXCJhdWRpYmxlXCI6dHJ1ZSxcbiAgICAgICAgICAgIFwidm9sdW1lXCI6MC4xNSxcbiAgICAgICAgICAgIFwic2VxXCI6W1xuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOlszLDQsNV0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjAuNSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjAuNSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MC4yNSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOlszLDQsNV0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjAuNSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOlszLDQsNV0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOlszLDQsNV0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjAuMjUsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgXCJpbmRleFwiOlwiMlwiXG4gICAgICAgICB9LFxuICAgICAgICAge1xuICAgICAgICAgICAgXCJrZXlcIjpcImJXNlVaZkZWU1wiLFxuICAgICAgICAgICAgXCJpbnN0cnVtZW50S2V5XCI6XCJiYXNpYy1vcmdhblwiLFxuICAgICAgICAgICAgXCJhdWRpYmxlXCI6dHJ1ZSxcbiAgICAgICAgICAgIFwidm9sdW1lXCI6MC40NCxcbiAgICAgICAgICAgIFwic2VxXCI6W1xuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbMF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOlszLDQsNV0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjAuNSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOnRydWVcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBcImluZGV4XCI6XCIzXCJcbiAgICAgICAgIH0sXG4gICAgICAgICB7XG4gICAgICAgICAgICBcImtleVwiOlwiUF8zSENTakFnXCIsXG4gICAgICAgICAgICBcImluc3RydW1lbnRLZXlcIjpcImJhc2ljLWNsYXZcIixcbiAgICAgICAgICAgIFwiYXVkaWJsZVwiOnRydWUsXG4gICAgICAgICAgICBcInZvbHVtZVwiOjAuNjksXG4gICAgICAgICAgICBcInNlcVwiOltcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjAuMjUsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6dHJ1ZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjowLjUsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjowLjI1LFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MC41LFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjAuNSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjAuMjUsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjowLjI1LFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6WzFdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbMl0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjAuNSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6WzBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgXCJpbmRleFwiOlwiNFwiXG4gICAgICAgICB9LFxuICAgICAgICAge1xuICAgICAgICAgICAgXCJrZXlcIjpcIkNKQXRnenFseVwiLFxuICAgICAgICAgICAgXCJpbnN0cnVtZW50S2V5XCI6XCJiYXNpYy1waWFub1wiLFxuICAgICAgICAgICAgXCJhdWRpYmxlXCI6dHJ1ZSxcbiAgICAgICAgICAgIFwidm9sdW1lXCI6MC4xMSxcbiAgICAgICAgICAgIFwic2VxXCI6W1xuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbNiw3LDhdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjp0cnVlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbNiw3LDhdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjowLjUsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOnRydWVcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcbiAgICAgICAgICAgICAgICAgICAgIDYsXG4gICAgICAgICAgICAgICAgICAgICA3LFxuICAgICAgICAgICAgICAgICAgICAgOFxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MC41LFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG5cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6dHJ1ZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgNixcbiAgICAgICAgICAgICAgICAgICAgIDcsXG4gICAgICAgICAgICAgICAgICAgICA4XG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjowLjI1LFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG5cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6dHJ1ZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgNixcbiAgICAgICAgICAgICAgICAgICAgIDcsXG4gICAgICAgICAgICAgICAgICAgICA4XG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjowLjUsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjp0cnVlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG4gICAgICAgICAgICAgICAgICAgICA2LFxuICAgICAgICAgICAgICAgICAgICAgNyxcbiAgICAgICAgICAgICAgICAgICAgIDhcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjAuNSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOnRydWVcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcbiAgICAgICAgICAgICAgICAgICAgIDYsXG4gICAgICAgICAgICAgICAgICAgICA3LFxuICAgICAgICAgICAgICAgICAgICAgOFxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOnRydWVcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcbiAgICAgICAgICAgICAgICAgICAgIDYsXG4gICAgICAgICAgICAgICAgICAgICA3LFxuICAgICAgICAgICAgICAgICAgICAgOFxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MC4yNSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOnRydWVcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBcImluZGV4XCI6XCI1XCJcbiAgICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBcImNob3JkU2VxdWVuY2VcIjpbXG4gICAgICAgICB7XG4gICAgICAgICAgICBcImNob3JkSW5kZXhcIjowLFxuICAgICAgICAgICAgXCJrZXlcIjpcIk1qaDNHWXdrWmdcIlxuICAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIFwic2VjdGlvbnNcIjpbXG4gICAgICAgICBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDQsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMyxcbiAgICAgICAgICAgIDMsXG4gICAgICAgICAgICA0LFxuICAgICAgICAgICAgNFxuICAgICAgICAgXSxcbiAgICAgICAgIFtcbiAgICAgICAgICAgIDIsXG4gICAgICAgICAgICA2LFxuICAgICAgICAgICAgNSxcbiAgICAgICAgICAgIDBcbiAgICAgICAgIF0sXG4gICAgICAgICBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMyxcbiAgICAgICAgICAgIDMsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDQsXG4gICAgICAgICAgICAzLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgIF1cbiAgICAgIF1cbiAgIH0sXG4gICB7XG4gICAgICBcIm5hbWVcIjpcIkJveXN0cmluZ3NcIixcbiAgICAgIFwiYnBtXCI6MTAwLFxuICAgICAgXCJrZXlcIjpcIktQYzVteGVSR1wiLFxuICAgICAgXCJtdXNpY0tleVwiOlwiQ1wiLFxuICAgICAgXCJtaW5vclwiOmZhbHNlLFxuICAgICAgXCJsYXllcnNcIjpbXG4gICAgICAgICB7XG4gICAgICAgICAgICBcImtleVwiOlwiaUFmQnRWQWtiXCIsXG4gICAgICAgICAgICBcImluc3RydW1lbnRLZXlcIjpcImJhc2ljLXN0cmluZ3NcIixcbiAgICAgICAgICAgIFwiYXVkaWJsZVwiOnRydWUsXG4gICAgICAgICAgICBcInZvbHVtZVwiOjAuMTMsXG4gICAgICAgICAgICBcInNlcVwiOltcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICAgICAgICAyXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG5cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG5cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG5cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG5cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG5cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgXCJpbmRleFwiOlwiMFwiXG4gICAgICAgICB9LFxuICAgICAgICAge1xuICAgICAgICAgICAgXCJrZXlcIjpcIjhnSVJVNkpJOVwiLFxuICAgICAgICAgICAgXCJpbnN0cnVtZW50S2V5XCI6XCJiYXNpYy1iYXNzXCIsXG4gICAgICAgICAgICBcImF1ZGlibGVcIjp0cnVlLFxuICAgICAgICAgICAgXCJ2b2x1bWVcIjoxLFxuICAgICAgICAgICAgXCJzZXFcIjpbXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcbiAgICAgICAgICAgICAgICAgICAgIDNcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG5cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG5cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG5cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG4gICAgICAgICAgICAgICAgICAgICAyXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG5cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcbiAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFwiaW5kZXhcIjpcIjFcIlxuICAgICAgICAgfSxcbiAgICAgICAgIHtcbiAgICAgICAgICAgIFwia2V5XCI6XCJKSFFaYnhxWEhcIixcbiAgICAgICAgICAgIFwiaW5zdHJ1bWVudEtleVwiOlwiYmFzaWMtcGlhbm9cIixcbiAgICAgICAgICAgIFwiYXVkaWJsZVwiOnRydWUsXG4gICAgICAgICAgICBcInZvbHVtZVwiOjAuMjUsXG4gICAgICAgICAgICBcInNlcVwiOltcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICAgICAgICAyXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG5cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG5cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG5cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG5cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG5cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgXCJpbmRleFwiOlwiMlwiXG4gICAgICAgICB9LFxuICAgICAgICAge1xuICAgICAgICAgICAgXCJrZXlcIjpcInVSSnBacTNzb1wiLFxuICAgICAgICAgICAgXCJpbnN0cnVtZW50S2V5XCI6XCJiYXNpYy1kcnVtc1wiLFxuICAgICAgICAgICAgXCJhdWRpYmxlXCI6dHJ1ZSxcbiAgICAgICAgICAgIFwidm9sdW1lXCI6MSxcbiAgICAgICAgICAgIFwic2VxXCI6W1xuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG4gICAgICAgICAgICAgICAgICAgICA1LFxuICAgICAgICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjowLjI1LFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG4gICAgICAgICAgICAgICAgICAgICA0XG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG4gICAgICAgICAgICAgICAgICAgICA3XG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjowLjI1LFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG4gICAgICAgICAgICAgICAgICAgICA0LFxuICAgICAgICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgN1xuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MC4yNSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgNVxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjowLjI1LFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG4gICAgICAgICAgICAgICAgICAgICA1LFxuICAgICAgICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgN1xuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MC4yNSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgNFxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjowLjI1LFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG4gICAgICAgICAgICAgICAgICAgICA0LFxuICAgICAgICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjowLjI1LFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG4gICAgICAgICAgICAgICAgICAgICA1XG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG4gICAgICAgICAgICAgICAgICAgICA3XG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjowLjI1LFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgXCJpbmRleFwiOlwiM1wiXG4gICAgICAgICB9LFxuICAgICAgICAge1xuICAgICAgICAgICAgXCJrZXlcIjpcIkNqTzV0Um9vWlwiLFxuICAgICAgICAgICAgXCJpbnN0cnVtZW50S2V5XCI6XCJiYXNpYy1waWFub1wiLFxuICAgICAgICAgICAgXCJhdWRpYmxlXCI6dHJ1ZSxcbiAgICAgICAgICAgIFwidm9sdW1lXCI6MC4yNSxcbiAgICAgICAgICAgIFwic2VxXCI6W1xuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG4gICAgICAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG5cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG5cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG4gICAgICAgICAgICAgICAgICAgICAyXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG5cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG5cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgM1xuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgXCJpbmRleFwiOlwiNFwiXG4gICAgICAgICB9XG4gICAgICBdLFxuICAgICAgXCJjaG9yZFNlcXVlbmNlXCI6W1xuICAgICAgICAge1xuICAgICAgICAgICAgXCJjaG9yZEluZGV4XCI6MCxcbiAgICAgICAgICAgIFwia2V5XCI6XCJBa3lRdnhubDhvXCJcbiAgICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBcInNlY3Rpb25zXCI6W1xuICAgICAgICAgW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDQsXG4gICAgICAgICAgICAzLFxuICAgICAgICAgICAgNVxuICAgICAgICAgXSxcbiAgICAgICAgIFtcbiAgICAgICAgICAgIDBcbiAgICAgICAgIF0sXG4gICAgICAgICBbXG4gICAgICAgICAgICAwXG4gICAgICAgICBdXG4gICAgICBdXG4gICB9XG5dXG47IiwiaW1wb3J0IHsgaCwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcblxuY2xhc3MgQXBwQ29udGV4dCBleHRlbmRzIENvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpO1xuXG5cdFx0dGhpcy5jdXJyaWVkPXt9O1xuXG5cdFx0Zm9yIChsZXQga2V5IG9mIHRoaXMuZ2V0T2JqZWN0S2V5cyhwcm9wcy5jb250cm9sbGVyKSkge1xuXHRcdFx0dGhpcy5jdXJyaWVkW2tleV09KC4uLmFyZ3MpPT57XG5cblx0XHRcdFx0aWYgKHRoaXMucHJvcHMubG9nQWN0aW9ucylcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIkFjdGlvbjogXCIra2V5K1wiIChcIithcmdzK1wiKVwiKTtcblxuXHRcdFx0XHRmb3IgKGxldCBpIGluIGFyZ3MpIHtcblx0XHRcdFx0XHRpZiAoYXJnc1tpXSBpbnN0YW5jZW9mIEV2ZW50KSB7XG5cdFx0XHRcdFx0XHRpZiAoYXJnc1tpXS50eXBlPT1cIm1vdXNlZG93blwiICYmIGFyZ3NbaV0uYnV0dG9uPT0yKVxuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cblx0XHRcdFx0XHRcdGFyZ3NbaV0ucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdGFyZ3NbaV0uc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRcdFx0XHRcdGlmIChhcmdzW2ldLnR5cGU9PVwiY2hhbmdlXCIpIHtcblx0XHRcdFx0XHRcdFx0YXJnc1tpXT1hcmdzW2ldLnRhcmdldC52YWx1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRsZXQgbmV3U3RhdGU9cHJvcHMuY29udHJvbGxlcltrZXldKHRoaXMuc3RhdGUsIC4uLmFyZ3MpO1xuXHRcdFx0XHRpZiAobmV3U3RhdGUgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG5cdFx0XHRcdFx0aWYgKCF0aGlzLnN0YXRlKVxuXHRcdFx0XHRcdFx0dGhpcy5zdGF0ZT17YnVzeTogdHJ1ZX07XG5cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0XHRcdFx0YnVzeTogdHJ1ZVxuXHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRuZXdTdGF0ZS50aGVuKChzdGF0ZSk9Pntcblx0XHRcdFx0XHRcdHN0YXRlLmJ1c3k9ZmFsc2U7XG5cdFx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHN0YXRlKTtcblx0XHRcdFx0XHRcdHRoaXMubm90aWZ5U3RhdGVDaGFuZ2Uoc3RhdGUpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0aWYgKCF0aGlzLnN0YXRlKVxuXHRcdFx0XHRcdFx0dGhpcy5zdGF0ZT1uZXdTdGF0ZTtcblxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xuXG5cdFx0XHRcdFx0dGhpcy5ub3RpZnlTdGF0ZUNoYW5nZShuZXdTdGF0ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRmb3IgKGxldCBrZXkgb2YgdGhpcy5nZXRPYmplY3RLZXlzKHByb3BzLmhlbHBlcikpIHtcblx0XHRcdHRoaXMuY3VycmllZFtrZXldPSguLi5hcmdzKT0+e1xuXHRcdFx0XHRyZXR1cm4gcHJvcHMuaGVscGVyW2tleV0odGhpcy5zdGF0ZSwgLi4uYXJncyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHByb3BzLmluaXRBY3Rpb24pXG5cdFx0XHR0aGlzLmN1cnJpZWRbcHJvcHMuaW5pdEFjdGlvbl0oKTtcblx0fVxuXG5cdG5vdGlmeVN0YXRlQ2hhbmdlKHN0YXRlKSB7XG5cdFx0aWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uU3RhdGVDaGFuZ2U9PVwiZnVuY3Rpb25cIilcblx0XHRcdHRoaXMucHJvcHMub25TdGF0ZUNoYW5nZShzdGF0ZSk7XG5cdH1cblxuXHRnZXRPYmplY3RLZXlzKG8pIHtcblx0XHRsZXQga2V5cz1bXTtcblx0XHRvPU9iamVjdC5nZXRQcm90b3R5cGVPZihvKTtcblx0XHR3aGlsZSAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMobykuaW5kZXhPZihcIl9fcHJvdG9fX1wiKTwwKSB7XG5cdFx0XHRrZXlzPWtleXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG8pKTtcblx0XHRcdG89T2JqZWN0LmdldFByb3RvdHlwZU9mKG8pO1xuXHRcdH1cblxuXHRcdGlmIChrZXlzLmluY2x1ZGVzKFwiY29uc3RydWN0b3JcIikpXG5cdFx0XHRrZXlzLnNwbGljZShrZXlzLmluZGV4T2YoXCJjb25zdHJ1Y3RvclwiKSwxKTtcblxuXHRcdHJldHVybiBrZXlzO1xuXHR9XG5cblx0Z2V0Q2hpbGRDb250ZXh0KCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHQuLi50aGlzLnN0YXRlLFxuXHRcdFx0Li4udGhpcy5jdXJyaWVkXG5cdFx0fTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbjtcblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQXBwQ29udGV4dDsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBBdWRpb1RpbWVyIHtcblx0Y29uc3RydWN0b3IoYXVkaW9Db250ZXh0KSB7XG5cdFx0dGhpcy5hdWRpb0NvbnRleHQ9YXVkaW9Db250ZXh0O1xuXHRcdHRoaXMudGltZW91dD1udWxsO1xuXHR9XG5cblx0cHJvY2Vzc1RpY2tzPSgpPT57XG5cdFx0bGV0IGN1cnJlbnRUaW1lPXRoaXMuYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lO1xuXHRcdC8vY29uc29sZS5sb2coXCJjYWxsZWQgYXQ6IFwiK2N1cnJlbnRUaW1lKTtcblxuXHRcdHdoaWxlICh0aGlzLnN0YXJ0VGltZSt0aGlzLmRlbGl2ZXJlZFRpY2tzKnRoaXMudGlja0ludGVydmFsPD1jdXJyZW50VGltZSkge1xuXHRcdFx0dGhpcy5vblRpY2sodGhpcy5kZWxpdmVyZWRUaWNrcyk7XG5cdFx0XHR0aGlzLmRlbGl2ZXJlZFRpY2tzKys7XG5cdFx0fVxuXG5cdFx0bGV0IG5leHRBdD10aGlzLnN0YXJ0VGltZSsodGhpcy5kZWxpdmVyZWRUaWNrcykqdGhpcy50aWNrSW50ZXJ2YWw7XG5cdFx0bGV0IHVudGlsTmV4dD1uZXh0QXQtdGhpcy5hdWRpb0NvbnRleHQuY3VycmVudFRpbWU7XG5cdFx0Ly9jb25zb2xlLmxvZyhcIm5leHQgYXQ6IFwiK25leHRBdCtcIiBpbjogXCIrdW50aWxOZXh0KTtcblxuXHRcdHRoaXMudGltZW91dD1zZXRUaW1lb3V0KHRoaXMucHJvY2Vzc1RpY2tzLHVudGlsTmV4dCoxMDAwKTtcblx0fVxuXG5cdHN0YXJ0KCkge1xuXHRcdHRoaXMuc3RvcCgpO1xuXHRcdHRoaXMuZGVsaXZlcmVkVGlja3M9MDtcblxuXHRcdHRoaXMucHJvY2Vzc1RpY2tzKCk7XG5cdH1cblxuXHRzdG9wKCkge1xuXHRcdGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuXHRcdHRoaXMudGltZW91dD1udWxsO1xuXHR9XG5cblx0c2V0U3RhcnRUaW1lKHN0YXJ0VGltZSkge1xuXHRcdGlmICh0aGlzLmlzUnVubmluZygpKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2FuJ3QgY2hhbmdlIHN0YXJ0IHRpbWUgd2hpbGUgcnVubmluZyEhIVwiKTtcblxuXHRcdHRoaXMuc3RhcnRUaW1lPXN0YXJ0VGltZTtcblx0fVxuXG5cdHNldFRpY2tJbnRlcnZhbCh0aWNrSW50ZXJ2YWwpIHtcblx0XHRpZiAodGhpcy5pc1J1bm5pbmcoKSlcblx0XHRcdHRocm93IG5ldyBFcnJvcihcImNhbid0IGNoYW5nZSB0aWNrIGludGVydmFsIHdoaWxlIHJ1bm5pbmchISFcIik7XG5cblx0XHR0aGlzLnRpY2tJbnRlcnZhbD10aWNrSW50ZXJ2YWw7XG5cdH1cblxuXHRpc1J1bm5pbmcoKSB7XG5cdFx0cmV0dXJuICEhdGhpcy50aW1lb3V0O1xuXHR9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXVkaW9VdGlsIHtcblx0c3RhdGljIGxvYWRCdWZmZXIodXJsLCBjb250ZXh0KSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG5cdFx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdFx0cmVxdWVzdC5vcGVuKCdHRVQnLCB1cmwsIHRydWUpO1xuXHRcdFx0cmVxdWVzdC5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xuXG5cdFx0XHRyZXF1ZXN0Lm9ubG9hZD0oKT0+e1xuXHRcdFx0XHRjb250ZXh0LmRlY29kZUF1ZGlvRGF0YShyZXF1ZXN0LnJlc3BvbnNlLFxuXHRcdFx0XHRcdChidWZmZXIpPT57XG5cdFx0XHRcdFx0XHRyZXNvbHZlKGJ1ZmZlcik7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQoZSk9Pntcblx0XHRcdFx0XHRcdHJlamVjdChlKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0KTtcblx0XHRcdH07XG5cdFx0XHRyZXF1ZXN0LnNlbmQoKTtcblx0XHR9KVxuXHR9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNdXNpY1V0aWwge1xuXHRzdGF0aWMgT0NUQVZFX0NFTlRTPTEyMDA7XG5cdHN0YXRpYyBOT1RFX05BTUVTPVtcIkFcIixcIkEjXCIsXCJCXCIsXCJDXCIsXCJDI1wiLFwiRFwiLFwiRCNcIixcIkVcIixcIkZcIixcIkYjXCIsXCJHXCIsXCJHI1wiXTtcblxuXHRzdGF0aWMgcmF0ZUZyb21DZW50cyhjZW50cykge1xuXHRcdGxldCBtaWRkbGVDRnJlcT0yNjEuNjM7XG5cdFx0bGV0IGZyZXE9bWlkZGxlQ0ZyZXEqTWF0aC5wb3coMixjZW50cy8xMjAwKTtcblx0XHRsZXQgcmF0ZT1mcmVxL21pZGRsZUNGcmVxO1xuXG5cdFx0cmV0dXJuIHJhdGU7XG5cdH1cblxuXHRzdGF0aWMgbm90ZVRvQ2VudHMocykge1xuXHRcdHN3aXRjaCAocy50b1VwcGVyQ2FzZSgpKSB7XG5cdFx0XHRjYXNlIFwiQ1wiOlxuXHRcdFx0Y2FzZSBcIlwiOlxuXHRcdFx0XHRyZXR1cm4gMDtcblxuXHRcdFx0Y2FzZSBcIkMjXCI6XG5cdFx0XHRcdHJldHVybiAxMDA7XG5cblx0XHRcdGNhc2UgXCJEXCI6XG5cdFx0XHRcdHJldHVybiAyMDA7XG5cblx0XHRcdGNhc2UgXCJEI1wiOlxuXHRcdFx0XHRyZXR1cm4gMzAwO1xuXG5cdFx0XHRjYXNlIFwiRVwiOlxuXHRcdFx0XHRyZXR1cm4gNDAwO1xuXG5cdFx0XHRjYXNlIFwiRlwiOlxuXHRcdFx0XHRyZXR1cm4gNTAwO1xuXG5cdFx0XHRjYXNlIFwiRiNcIjpcblx0XHRcdFx0cmV0dXJuIDYwMDtcblxuXHRcdFx0Y2FzZSBcIkdcIjpcblx0XHRcdFx0cmV0dXJuIDcwMDtcblxuXHRcdFx0Y2FzZSBcIkcjXCI6XG5cdFx0XHRcdHJldHVybiA4MDA7XG5cblx0XHRcdGNhc2UgXCJBXCI6XG5cdFx0XHRcdHJldHVybiA5MDA7XG5cblx0XHRcdGNhc2UgXCJBI1wiOlxuXHRcdFx0XHRyZXR1cm4gMTAwMDtcblxuXHRcdFx0Y2FzZSBcIkJcIjpcblx0XHRcdFx0cmV0dXJuIDExMDA7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIGdldE5vdGVzRm9yU2NhbGUoc2NhbGUsIG1pbm9yKSB7XG5cdFx0bGV0IHN0YXJ0SW5kZXg9TXVzaWNVdGlsLk5PVEVfTkFNRVMuaW5kZXhPZihzY2FsZSk7XG5cdFx0aWYgKHN0YXJ0SW5kZXg8MClcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vIHN1Y2ggc2NhbGU6IFwiK3NjYWxlKTtcblxuXHRcdGxldCBub3RlSW5kZWNlcz1bMCwyLDQsNSw3LDksMTFdO1xuXHRcdGlmIChtaW5vcilcblx0XHRcdG5vdGVJbmRlY2VzPVswLDIsMyw1LDcsOCwxMF07XG5cblx0XHRsZXQgcmVzPVtdO1xuXHRcdGZvciAobGV0IGluZGV4IG9mIG5vdGVJbmRlY2VzKVxuXHRcdFx0cmVzLnB1c2goTXVzaWNVdGlsLk5PVEVfTkFNRVNbKHN0YXJ0SW5kZXgraW5kZXgpJTEyXSk7XG5cblx0XHRyZXR1cm4gcmVzO1xuXHR9XG5cblx0c3RhdGljIGdldENob3JkTm90ZXNGb3JTY2FsZShzY2FsZSwgbWlub3IpIHtcblx0XHRsZXQgbm90ZU5hbWVzPU11c2ljVXRpbC5nZXROb3Rlc0ZvclNjYWxlKHNjYWxlLG1pbm9yKTtcblxuXHRcdGxldCByZXM9W107XG5cdFx0Zm9yIChsZXQgaT0wOyBpPDEyOyBpKyspXG5cdFx0XHRyZXMucHVzaChbXG5cdFx0XHRcdG5vdGVOYW1lc1soaSklN10sXG5cdFx0XHRcdG5vdGVOYW1lc1soaSsyKSU3XSxcblx0XHRcdFx0bm90ZU5hbWVzWyhpKzQpJTddLFxuXHRcdFx0XSk7XG5cblx0XHRyZXR1cm4gcmVzO1xuXHR9XG5cblx0c3RhdGljIGdldENob3JkTmFtZXNGb3JTY2FsZShzY2FsZSwgbWlub3IpIHtcblx0XHRsZXQgcHJlZml4ZXM9W1wiXCIsXCItXCIsXCItXCIsXCJcIixcIlwiLFwiLVwiLFwib1wiXTtcblx0XHRpZiAobWlub3IpXG5cdFx0XHRwcmVmaXhlcz1bXCItXCIsXCJvXCIsXCJcIixcIi1cIixcIi1cIixcIlwiLFwiXCJdO1xuXG5cdFx0bGV0IG5vdGVOYW1lcz1NdXNpY1V0aWwuZ2V0Tm90ZXNGb3JTY2FsZShzY2FsZSxtaW5vcik7XG5cdFx0bGV0IHJlcz1bXTtcblx0XHRmb3IgKGxldCBpbmRleCBpbiBub3RlTmFtZXMpXG5cdFx0XHRyZXMucHVzaChub3RlTmFtZXNbaW5kZXhdK3ByZWZpeGVzW2luZGV4XSk7XG5cblx0XHRyZXR1cm4gcmVzO1xuXHR9XG59IiwiaW1wb3J0IHsgaCwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcblxuZXhwb3J0IGNsYXNzIFNlbGVjdCB7XG5cdG9uQ2hhbmdlPShlKT0+e1xuXHRcdGlmICh0aGlzLnByb3BzLm9uQ2hhbmdlKVxuXHRcdFx0dGhpcy5wcm9wcy5vbkNoYW5nZShKU09OLnBhcnNlKGUudGFyZ2V0LnZhbHVlKSk7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5vbkluZGV4Q2hhbmdlKVxuXHRcdFx0dGhpcy5wcm9wcy5vbkluZGV4Q2hhbmdlKGUudGFyZ2V0LnNlbGVjdGVkSW5kZXgpO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdGxldCBwcm9wcz10aGlzLnByb3BzO1xuXG5cdFx0aWYgKCFwcm9wcy5sYWJlbEZpZWxkKVxuXHRcdFx0cHJvcHMubGFiZWxGaWVsZD1cImxhYmVsXCI7XG5cblx0XHRpZiAoIXByb3BzLm9wdGlvbnMpXG5cdFx0XHRwcm9wcy5vcHRpb25zPVtdO1xuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxzZWxlY3QgY2xhc3M9e3Byb3BzLmNsYXNzfVxuXHRcdFx0XHRcdHN0eWxlPXtwcm9wcy5zdHlsZX1cblx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX1cblx0XHRcdFx0XHRrZXk9e3Byb3BzLmtleX0+XG5cdFx0XHRcdHtwcm9wcy5vcHRpb25zLm1hcCgob3B0aW9uLCBpbmRleCk9Pntcblx0XHRcdFx0XHRsZXQgc2VsZWN0ZWQ9ZmFsc2U7XG5cblx0XHRcdFx0XHRpZiAocHJvcHMuaGFzT3duUHJvcGVydHkoJ3NlbGVjdGVkSW5kZXgnKSAmJlxuXHRcdFx0XHRcdFx0XHRpbmRleD09PXByb3BzLnNlbGVjdGVkSW5kZXgpXG5cdFx0XHRcdFx0XHRzZWxlY3RlZD10cnVlO1xuXG5cdFx0XHRcdFx0aWYgKHByb3BzLmhhc093blByb3BlcnR5KCdzZWxlY3RlZCcpICYmXG5cdFx0XHRcdFx0XHRcdG9wdGlvbi5rZXk9PT1wcm9wcy5zZWxlY3RlZClcblx0XHRcdFx0XHRcdHNlbGVjdGVkPXRydWU7XG5cblx0XHRcdFx0XHRsZXQga2V5PW9wdGlvbi5rZXk7XG5cdFx0XHRcdFx0aWYgKHByb3BzLmhhc093blByb3BlcnR5KCdvcHRpb25LZXlQcmVmaXgnKSlcblx0XHRcdFx0XHRcdGtleT1wcm9wcy5rZXlQcmVmaXgra2V5O1xuXG5cdFx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHRcdDxvcHRpb24ga2V5PXtrZXl9XG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU9e0pTT04uc3RyaW5naWZ5KG9wdGlvbi5rZXkpfVxuXHRcdFx0XHRcdFx0XHRcdHNlbGVjdGVkPXtzZWxlY3RlZH1cblx0XHRcdFx0XHRcdFx0XHRjbGFzcz17b3B0aW9uLmNsYXNzfT5cblx0XHRcdFx0XHRcdFx0e29wdGlvbltwcm9wcy5sYWJlbEZpZWxkXX1cblx0XHRcdFx0XHRcdDwvb3B0aW9uPlxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH0pfVxuXHRcdFx0PC9zZWxlY3Q+XG5cdFx0KTtcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gSUYoY29uZCxmdW5jKSB7XG5cdGlmIChjb25kKVxuXHRcdHJldHVybiBmdW5jKCk7XG59IiwiLy9pbXBvcnQgaW1tdXRhYmxlIGZyb20gJ2ltbXV0YWJsZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY29uY2lsZUFycmF5IHtcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdHRoaXMuaXRlbXNCeUtleT17fTtcblx0XHR0aGlzLm9wdGlvbnM9b3B0aW9ucztcblx0fVxuXG5cdHN0YXRpYyBjcmVhdGVXaXRoRmFjdG9yeShmYWN0b3J5KSB7XG5cdFx0cmV0dXJuIG5ldyBSZWNvbmNpbGVBcnJheSh7XG5cdFx0XHRpdGVtRmFjdG9yeTogZmFjdG9yeVxuXHRcdH0pXG5cdH1cblxuXHRjcmVhdGVJdGVtKGRhdGEpIHtcblx0XHRpZiAodGhpcy5vcHRpb25zLml0ZW1GYWN0b3J5KVxuXHRcdFx0cmV0dXJuIHRoaXMub3B0aW9ucy5pdGVtRmFjdG9yeShkYXRhKTtcblxuXHRcdGVsc2UgaWYgKHRoaXMub3B0aW9ucy5pdGVtQ2xhc3MpXG5cdFx0XHRyZXR1cm4gbmV3IHRoaXMub3B0aW9ucy5pdGVtQ2xhc3MoZGF0YSk7XG5cblx0XHRlbHNlXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJObyB3YXkgdG8gY3JlYXRlIGl0ZW1zIVwiKTtcblx0fVxuXG5cdHNldERhdGEoZGF0YXMpIHtcblx0XHRsZXQgbmV3S2V5cz1bXTtcblx0XHRmb3IgKGxldCBpbmRleCBpbiBkYXRhcykge1xuXHRcdFx0bGV0IGRhdGE9ZGF0YXNbaW5kZXhdO1xuXHRcdFx0ZGF0YS5pbmRleD1pbmRleDtcblxuXHRcdFx0aWYgKCFkYXRhLmtleSlcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiQXJyYXkgaXRlbSBkb2Vzbid0IGhhdmUgYSBrZXlcIik7XG5cblx0XHRcdGxldCBrZXk9U3RyaW5nKGRhdGEua2V5KTtcblx0XHRcdG5ld0tleXMucHVzaChrZXkpO1xuXG5cdFx0XHQvL2xldCBpbT1pbW11dGFibGUuZnJvbUpTKGRhdGEpO1xuXHRcdFx0aWYgKHRoaXMuaXRlbXNCeUtleVtrZXldKSB7XG5cdFx0XHRcdC8vaWYgKCFpbS5lcXVhbHModGhpcy5pdGVtc0J5S2V5W2tleV0uX19pbSkpXG5cdFx0XHRcdHRoaXMuaXRlbXNCeUtleVtrZXldLnVwZGF0ZShkYXRhKTtcblx0XHRcdH1cblxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHRoaXMuaXRlbXNCeUtleVtrZXldPXRoaXMuY3JlYXRlSXRlbShkYXRhKTtcblx0XHRcdH1cblxuXHRcdFx0Ly90aGlzLml0ZW1zQnlLZXlba2V5XS5fX2ltPWltO1xuXHRcdH1cblxuXHRcdGZvciAobGV0IGtleSBvZiBPYmplY3Qua2V5cyh0aGlzLml0ZW1zQnlLZXkpKSB7XG5cdFx0XHRpZiAobmV3S2V5cy5pbmRleE9mKGtleSk8MCkge1xuXHRcdFx0XHR0aGlzLml0ZW1zQnlLZXlba2V5XS5maW5hbGl6ZSgpO1xuXHRcdFx0XHRkZWxldGUgdGhpcy5pdGVtc0J5S2V5W2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Z2V0SXRlbXMoKSB7XG5cdFx0cmV0dXJuIE9iamVjdC52YWx1ZXModGhpcy5pdGVtc0J5S2V5KTtcblx0fVxuXG5cdGdldEl0ZW1CeUtleShrZXkpIHtcblx0XHRyZXR1cm4gdGhpcy5pdGVtc0J5S2V5W2tleV07XG5cdH1cbn1cbiIsImltcG9ydCB7IGgsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEEgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRvbkRvd249KGUpPT57XG5cdFx0aWYgKGUgaW5zdGFuY2VvZiBUb3VjaEV2ZW50KVxuXHRcdFx0d2luZG93LmhhdmVUb3VjaEV2ZW50PXRydWU7XG5cblx0XHRpZiAod2luZG93LmhhdmVUb3VjaEV2ZW50ICYmICEoZSBpbnN0YW5jZW9mIFRvdWNoRXZlbnQpKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0Ly9lLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdGlmICh0aGlzLmJhc2UuaXNQcmVzc2VkKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5iYXNlLmlzUHJlc3NlZD10cnVlO1xuXG5cdFx0aWYgKHRoaXMucHJvcHMub25QcmVzcylcblx0XHRcdHRoaXMucHJvcHMub25QcmVzcygpO1xuXG5cdFx0aWYgKHRoaXMucHJvcHMub25SZWxlYXNlKVxuXHRcdFx0dGhpcy5iYXNlLmNsYXNzTmFtZSs9XCIgcHJlc3NlZFwiO1xuXHR9XG5cblx0b25VcD0oZSk9Pntcblx0XHRpZiAoZSBpbnN0YW5jZW9mIFRvdWNoRXZlbnQpXG5cdFx0XHR3aW5kb3cuaGF2ZVRvdWNoRXZlbnQ9dHJ1ZTtcblxuXHRcdGlmICh3aW5kb3cuaGF2ZVRvdWNoRXZlbnQgJiYgIShlIGluc3RhbmNlb2YgVG91Y2hFdmVudCkpXG5cdFx0XHRyZXR1cm47XG5cblx0XHRpZiAoZS5jYW5jZWxhYmxlKVxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdGlmICghdGhpcy5iYXNlLmlzUHJlc3NlZClcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuYmFzZS5pc1ByZXNzZWQ9ZmFsc2U7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5vblJlbGVhc2UpIHtcblx0XHRcdHRoaXMuYmFzZS5jbGFzc05hbWU9dGhpcy5iYXNlLmNsYXNzTmFtZS5yZXBsYWNlKFwiIHByZXNzZWRcIixcIlwiKTtcblx0XHRcdHRoaXMucHJvcHMub25SZWxlYXNlKCk7XG5cdFx0fVxuXHR9XG5cblx0b25Nb3ZlPShlKT0+e1xuXHRcdGlmICh0aGlzLnByb3BzLmNhbmNlbE9uTW92ZSAmJiB0aGlzLmJhc2UuaXNQcmVzc2VkKSB7XG5cdFx0XHR0aGlzLmJhc2UuY2xhc3NOYW1lPXRoaXMuYmFzZS5jbGFzc05hbWUucmVwbGFjZShcIiBwcmVzc2VkXCIsXCJcIik7XG5cdFx0XHR0aGlzLmJhc2UuaXNQcmVzc2VkPWZhbHNlO1xuXHRcdH1cblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGEgY2xhc3M9e1wiYSBcIit0aGlzLnByb3BzLmNsYXNzfVxuXHRcdFx0XHRcdG9uVG91Y2hNb3ZlPXt0aGlzLm9uTW92ZX1cblx0XHRcdFx0XHRvblRvdWNoU3RhcnQ9e3RoaXMub25Eb3dufVxuXHRcdFx0XHRcdG9uVG91Y2hFbmQ9e3RoaXMub25VcH1cblx0XHRcdFx0XHRvbk1vdXNlRG93bj17dGhpcy5vbkRvd259XG5cdFx0XHRcdFx0b25Nb3VzZVVwPXt0aGlzLm9uVXB9PlxuXHRcdFx0XHR7dGhpcy5wcm9wcy5jaGlsZHJlbn1cblx0XHRcdDwvYT5cblx0XHQpXG5cdH1cbn0iLCJpbXBvcnQgeyBoLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IEEgZnJvbSAnLi9BLmpzeCc7XG5pbXBvcnQgeyBTZWxlY3QsIElGIH0gZnJvbSAnLi4vdXRpbHMvUmVhY3RVdGlsLmpzeCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFib3V0U2NyZWVuIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzPVwibW9kYWwtY29udGFpbmVyXCIgb25DbGljaz17dGhpcy5jb250ZXh0LmhpZGVBYm91dFNjcmVlbn0+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJib3ggYm9yZGVyIGJvcmRlci1kYXJrIGJnLWJhY2tncm91bmQgYWJvdXQtc2NyZWVuXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInBhbmUtaGVhZGVyIHRleHQtc2Vjb25kYXJ5IGJnLWRhcmsgXCI+QUJPVVQ8L2Rpdj5cblx0XHRcdFx0XHQ8Yj5Ib29kbW9kZTwvYj48YnIvPjxici8+XG5cdFx0XHRcdFx0VmVyc2lvbjoge3RoaXMuY29udGV4dC5nZXRBcHBWZXJzaW9uKCl9PGJyLz48YnIvPlxuXHRcdFx0XHRcdEVuam95ISBQbGVhc2UgbGV0IG1lIGtub3cgb2YgYW55IGJ1Z3MgeW91IGZpbmQhXG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuIiwiaW1wb3J0IHsgaCwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCBBIGZyb20gJy4vQS5qc3gnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZGRMYXllciB7XG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzcz1cInBhbmUtY29udGFpbmVyXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJib3ggcGFuZSBkb3VibGUgYmctZGFya1wiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lLWhlYWRlciBiZy1kYXJrIHRleHQtc2Vjb25kYXJ5XCI+QUREIExBWUVSPC9kaXY+XG5cdFx0XHRcdFx0e3RoaXMuY29udGV4dC5pbnN0cnVtZW50cy5tYXAoKGluc3RydW1lbnQsaW5kZXgpPT4oXG5cdFx0XHRcdFx0XHQ8QSBjbGFzcz1cImJveCB3LTQgdGV4dC13aGl0ZSBiZy1kYW5nZXIgZWxcIlxuXHRcdFx0XHRcdFx0XHRcdG9uUmVsZWFzZT17dGhpcy5jb250ZXh0LmFkZExheWVyLmJpbmQobnVsbCxpbnN0cnVtZW50LmtleSl9PlxuXHRcdFx0XHRcdFx0XHQ8aW1nIHNyYz17XCJpbWcvXCIraW5zdHJ1bWVudC5pY29ufS8+XG5cdFx0XHRcdFx0XHRcdHtpbnN0cnVtZW50Lm5hbWV9XG5cdFx0XHRcdFx0XHQ8L0E+XG5cdFx0XHRcdFx0KSl9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuIiwiaW1wb3J0IHsgaCwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCB7IFNlbGVjdCwgSUYgfSBmcm9tICcuLi91dGlscy9SZWFjdFV0aWwuanN4JztcbmltcG9ydCBIZWFkZXIgZnJvbSAnLi9IZWFkZXIuanN4JztcbmltcG9ydCBGcm9udCBmcm9tICcuL0Zyb250LmpzeCc7XG5pbXBvcnQgU29uZyBmcm9tICcuL1NvbmcuanN4JztcbmltcG9ydCBTb25nU2V0dGluZ3MgZnJvbSAnLi9Tb25nU2V0dGluZ3MuanN4JztcbmltcG9ydCBMYXllclNldHRpbmdzIGZyb20gJy4vTGF5ZXJTZXR0aW5ncy5qc3gnO1xuaW1wb3J0IEFkZExheWVyIGZyb20gJy4vQWRkTGF5ZXIuanN4JztcbmltcG9ydCBMYXllciBmcm9tICcuL0xheWVyLmpzeCc7XG5pbXBvcnQgU2VsZWN0Q2hvcmQgZnJvbSAnLi9TZWxlY3RDaG9yZC5qc3gnO1xuaW1wb3J0IFRhcEhpZ2hsaWdodCBmcm9tICcuL1RhcEhpZ2hsaWdodC5qc3gnO1xuaW1wb3J0IEFib3V0U2NyZWVuIGZyb20gJy4vQWJvdXRTY3JlZW4uanN4JztcbmltcG9ydCBEaWFsb2cgZnJvbSAnLi9EaWFsb2cuanN4JztcbmltcG9ydCBBIGZyb20gJy4vQS5qc3gnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAgZXh0ZW5kcyBDb21wb25lbnQge1xuXHR1cGRhdGVTaXplPSgpPT57XG5cdFx0bGV0IHdpbmRvd1dpZHRoPWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcblx0XHRsZXQgd2luZG93SGVpZ2h0PWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XG5cblx0XHRsZXQgY3M9Z2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpO1xuXHRcdGxldCBwYW5lV2lkdGg9cGFyc2VGbG9hdChjcy5nZXRQcm9wZXJ0eVZhbHVlKCctLXBhbmVXaWR0aCcpKTtcblx0XHRsZXQgcGFuZUhlaWdodD1wYXJzZUZsb2F0KGNzLmdldFByb3BlcnR5VmFsdWUoJy0tcGFuZUhlaWdodCcpKTtcblxuXHRcdGxldCBjb250ZW50V2lkdGgsY29udGVudEhlaWdodDtcblxuXHRcdGxldCBlbD1kb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuXHRcdGxldCBzY3JlZW5LZXlib2FyZEFjdGl2ZT1mYWxzZTtcblx0XHRpZiAoZWwubm9kZU5hbWU9PVwiSU5QVVRcIiAmJiBlbC50eXBlPT1cInRleHRcIilcblx0XHRcdHNjcmVlbktleWJvYXJkQWN0aXZlPXRydWU7XG5cblx0XHQvLyBQb3J0cmFpdC5cblx0XHRpZiAod2luZG93SGVpZ2h0PndpbmRvd1dpZHRoKSB7XG5cdFx0XHRjb250ZW50SGVpZ2h0PTIqKHBhbmVIZWlnaHQrMSkrMjtcblx0XHRcdGNvbnRlbnRXaWR0aD1wYW5lV2lkdGgrMTtcblx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmNsYXNzTGlzdC5hZGQoXCJwb3J0cmFpdFwiKTtcblx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJsYW5kc2NhcGVcIik7XG5cblx0XHRcdGlmICh3aW5kb3cuaGFzT3duUHJvcGVydHkoXCJjb3Jkb3ZhXCIpKVxuXHRcdFx0XHRTdGF0dXNCYXIuc2hvdygpO1xuXHRcdH1cblxuXHRcdC8vIExhbmRzY2FwZS5cblx0XHRlbHNlIHtcblx0XHRcdGNvbnRlbnRIZWlnaHQ9cGFuZUhlaWdodCsyKzE7XG5cdFx0XHRjb250ZW50V2lkdGg9MioocGFuZVdpZHRoKzEpO1xuXHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuY2xhc3NMaXN0LmFkZChcImxhbmRzY2FwZVwiKTtcblx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJwb3J0cmFpdFwiKTtcblxuXHRcdFx0aWYgKHdpbmRvdy5oYXNPd25Qcm9wZXJ0eShcImNvcmRvdmFcIikpIHtcblx0XHRcdFx0aWYgKHNjcmVlbktleWJvYXJkQWN0aXZlKVxuXHRcdFx0XHRcdFN0YXR1c0Jhci5zaG93KCk7XG5cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFN0YXR1c0Jhci5oaWRlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0bGV0IGZvbnRTaXplO1xuXHRcdGlmICh3aW5kb3dXaWR0aC9jb250ZW50V2lkdGg8d2luZG93SGVpZ2h0L2NvbnRlbnRIZWlnaHQpXG5cdFx0XHRmb250U2l6ZT13aW5kb3dXaWR0aC9jb250ZW50V2lkdGg7XG5cblx0XHRlbHNlXG5cdFx0XHRmb250U2l6ZT13aW5kb3dIZWlnaHQvY29udGVudEhlaWdodDtcblxuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJodG1sXCIpLnN0eWxlLmZvbnRTaXplPWZvbnRTaXplK1wicHhcIjtcblxuXHRcdGxldCBzPWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZTtcblx0XHRzLnNldFByb3BlcnR5KFwiLS1wYW5lTWFyZ2luVG9wXCIsKCh3aW5kb3dIZWlnaHQtZm9udFNpemUqY29udGVudEhlaWdodCkvMikrXCJweFwiKTtcblx0XHRzLnNldFByb3BlcnR5KFwiLS1wYW5lTWFyZ2luTGVmdFwiLCgod2luZG93V2lkdGgtZm9udFNpemUqY29udGVudFdpZHRoKS8yKStcInB4XCIpO1xuXHR9XG5cblx0b25QbGF5Q2xpY2s9KCk9Pntcblx0XHRjb25zb2xlLmxvZyhcInBsYXlcIik7XG5cdH1cblxuXHRjb21wb25lbnREaWRNb3VudCgpIHtcblx0XHR3aW5kb3cub25yZXNpemU9dGhpcy51cGRhdGVTaXplO1xuXHRcdHNldFRpbWVvdXQodGhpcy51cGRhdGVTaXplLDApO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdGlmICh0aGlzLmNvbnRleHQuYnVzeSlcblx0XHRcdHJldHVybiAoPGRpdj5MT0FESU5HLi4uPC9kaXY+KTtcblxuXHRcdGxldCBjbHM9XCJcIjtcblx0XHRpZiAodGhpcy5jb250ZXh0LnJlY29yZGluZylcblx0XHRcdGNscz1cInJlY29yZGluZ1wiO1xuXG5cdFx0Ly8gPFRhcEhpZ2hsaWdodCAvPlxuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3M9e2Nsc30+XG5cdFx0XHRcdDxIZWFkZXIgLz5cblx0XHRcdFx0e0lGKCF0aGlzLmNvbnRleHQuaXNTb25nT3BlbigpLCgpPT5cblx0XHRcdFx0XHQ8RnJvbnQgLz5cblx0XHRcdFx0KX1cblx0XHRcdFx0e0lGKHRoaXMuY29udGV4dC5pc1NvbmdPcGVuKCksKCk9Pntcblx0XHRcdFx0XHRpZiAodGhpcy5jb250ZXh0LnNldHRpbmdzVmlzaWJsZSkge1xuXHRcdFx0XHRcdFx0aWYgKHRoaXMuY29udGV4dC5jdXJyZW50TGF5ZXJJbmRleD49MClcblx0XHRcdFx0XHRcdFx0cmV0dXJuIDxMYXllclNldHRpbmdzIC8+O1xuXG5cdFx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRcdHJldHVybiA8U29uZ1NldHRpbmdzIC8+O1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGVsc2UgaWYgKHRoaXMuY29udGV4dC5hZGRMYXllclZpc2libGUpXG5cdFx0XHRcdFx0XHRyZXR1cm4gPEFkZExheWVyIC8+O1xuXG5cdFx0XHRcdFx0ZWxzZSBpZiAodGhpcy5jb250ZXh0LmN1cnJlbnRMYXllckluZGV4Pj0wKVxuXHRcdFx0XHRcdFx0cmV0dXJuIDxMYXllciAvPlxuXG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0cmV0dXJuIDxTb25nIC8+O1xuXHRcdFx0XHR9KX1cblx0XHRcdFx0e0lGKHRoaXMuY29udGV4dC5hYm91dFNjcmVlblZpc2libGUsKCk9PlxuXHRcdFx0XHRcdDxBYm91dFNjcmVlbiAvPlxuXHRcdFx0XHQpfVxuXHRcdFx0XHR7SUYodGhpcy5jb250ZXh0LmRpYWxvZ1RleHQsKCk9PlxuXHRcdFx0XHRcdDxEaWFsb2cgLz5cblx0XHRcdFx0KX1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbiIsImltcG9ydCB7IGgsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgQSBmcm9tICcuL0EuanN4JztcbmltcG9ydCB7IFNlbGVjdCwgSUYgfSBmcm9tICcuLi91dGlscy9SZWFjdFV0aWwuanN4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlhbG9nIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzPVwibW9kYWwtY29udGFpbmVyXCIgb25DbGljaz17dGhpcy5jb250ZXh0LmNhbmNlbERpYWxvZ30+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJib3ggYm9yZGVyIGJvcmRlci1kYXJrIGJnLWJhY2tncm91bmQgZGlhbG9nXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInBhbmUtaGVhZGVyIHRleHQtc2Vjb25kYXJ5IGJnLWRhcmsgXCI+Q09ORklSTTwvZGl2PlxuXHRcdFx0XHRcdHt0aGlzLmNvbnRleHQuZGlhbG9nVGV4dH1cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJmb3JtLWJ1dHRvbnNcIj5cblx0XHRcdFx0XHRcdDxBIGNsYXNzPVwiYm94IGJnLWluZm9cIlxuXHRcdFx0XHRcdFx0XHRcdG9uUmVsZWFzZT17dGhpcy5jb250ZXh0LmNhbmNlbERpYWxvZ30+XG5cdFx0XHRcdFx0XHRcdENhbmNlbFxuXHRcdFx0XHRcdFx0PC9BPlxuXHRcdFx0XHRcdFx0PEEgY2xhc3M9XCJib3ggYmctd2FybmluZ1wiXG5cdFx0XHRcdFx0XHRcdFx0b25SZWxlYXNlPXt0aGlzLmNvbnRleHQuY29uZmlybURpYWxvZ30+XG5cdFx0XHRcdFx0XHRcdE9rXG5cdFx0XHRcdFx0XHQ8L0E+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuIiwiaW1wb3J0IHsgaCwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCBBIGZyb20gJy4vQS5qc3gnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGcm9udCB7XG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzcz1cInBhbmUtY29udGFpbmVyXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJib3ggcGFuZSBkb3VibGUgYm9yZGVyIGJvcmRlci1kYXJrXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInBhbmUtaGVhZGVyIHRleHQtc2Vjb25kYXJ5IGJnLWRhcmtcIj5TT05HUzwvZGl2PlxuXG5cdFx0XHRcdFx0PEEgY2xhc3M9XCJ0ZXh0LXdoaXRlXCJcblx0XHRcdFx0XHRcdFx0b25SZWxlYXNlPXt0aGlzLmNvbnRleHQuYWRkU29uZ30+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYm94IGJnLWRhcmsgdy0xXCI+KzwvZGl2PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImJveFwiPk5ldyBTb25nPC9kaXY+XG5cdFx0XHRcdFx0PC9BPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJmcm9udC1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdHt0aGlzLmNvbnRleHQuc29uZ3MubWFwKChzb25nLGluZGV4KT0+KFxuXHRcdFx0XHRcdFx0XHQ8QSBjbGFzcz1cImJveCBiZy1zZWNvbmRhcnkgdGV4dC13aGl0ZSB3LTQgYm9yZGVyIGJvcmRlci1saWdodCBlbFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRvblJlbGVhc2U9e3RoaXMuY29udGV4dC5zZXRTb25nSW5kZXguYmluZChudWxsLGluZGV4KX1cblx0XHRcdFx0XHRcdFx0XHRcdGNhbmNlbE9uTW92ZT17dHJ1ZX0+XG5cdFx0XHRcdFx0XHRcdFx0e3NvbmcubmFtZX1cblx0XHRcdFx0XHRcdFx0PC9BPlxuXHRcdFx0XHRcdFx0KSl9XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuIiwiaW1wb3J0IHsgaCwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCB7IFNlbGVjdCwgSUYgfSBmcm9tICcuLi91dGlscy9SZWFjdFV0aWwuanN4JztcbmltcG9ydCBBIGZyb20gJy4vQS5qc3gnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZWFkZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRyZW5kZXIoKSB7XG5cdFx0bGV0IHBsYXlCdXR0b25DbGFzcz1cImhlYWRlci1idXR0b24gdGV4dC13aGl0ZSBcIjtcblx0XHRpZiAodGhpcy5jb250ZXh0LnBsYXlpbmcpXG5cdFx0XHRwbGF5QnV0dG9uQ2xhc3MrPVwiYWN0aXZlXCI7XG5cblx0XHRsZXQgcmVjb3JkQnV0dG9uQ2xhc3M9XCJoZWFkZXItYnV0dG9uIHRleHQtd2hpdGUgXCI7XG5cdFx0aWYgKHRoaXMuY29udGV4dC5yZWNvcmRpbmcpXG5cdFx0XHRyZWNvcmRCdXR0b25DbGFzcys9XCJhY3RpdmVcIjtcblxuXHRcdGxldCBpdGVtcz1bXTtcblx0XHRpZiAodGhpcy5jb250ZXh0LmlzU29uZ09wZW4oKSkge1xuXHRcdFx0aXRlbXMucHVzaChcblx0XHRcdFx0PEEgY2xhc3M9XCJoZWFkZXItYnV0dG9uIHRleHQtd2hpdGVcIlxuXHRcdFx0XHRcdFx0b25SZWxlYXNlPXt0aGlzLmNvbnRleHQuZ29CYWNrfT5cblx0XHRcdFx0XHQ8aW1nIHNyYz1cImltZy9hcnJvdy1sZWZ0LnN2Z1wiLz5cblx0XHRcdFx0PC9BPlxuXHRcdFx0KTtcblxuXHRcdFx0aWYgKHRoaXMuY29udGV4dC5jdXJyZW50TGF5ZXJJbmRleD49MClcblx0XHRcdFx0aXRlbXMucHVzaChcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiaGVhZGVyLWJ1dHRvbiB0ZXh0LXdoaXRlXCI+XG5cdFx0XHRcdFx0XHQ8aW1nIHNyYz17XCJpbWcvXCIrdGhpcy5jb250ZXh0LmdldEluc3RydW1lbnRJY29uQnlLZXkodGhpcy5jb250ZXh0LmdldEN1cnJlbnRMYXllcigpLmluc3RydW1lbnRLZXkpfS8+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdCk7XG5cblx0XHRcdGl0ZW1zLnB1c2goXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJoZWFkZXItdGV4dCB0ZXh0LXdoaXRlXCI+XG5cdFx0XHRcdFx0e3RoaXMuY29udGV4dC5nZXRDdXJyZW50U29uZygpLm5hbWV9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KTtcblxuXHRcdFx0aXRlbXMucHVzaChcblx0XHRcdFx0PEEgY2xhc3M9e3BsYXlCdXR0b25DbGFzc31cblx0XHRcdFx0XHRcdG9uUHJlc3M9e3RoaXMuY29udGV4dC5wbGF5Q2xpY2t9PlxuXHRcdFx0XHRcdDxpbWcgc3JjPVwiaW1nL3BsYXktZmlsbC5zdmdcIi8+XG5cdFx0XHRcdDwvQT5cblx0XHRcdCk7XG5cblx0XHRcdGlmICh0aGlzLmNvbnRleHQuY3VycmVudExheWVySW5kZXg+PTApIFxuXHRcdFx0XHRpdGVtcy5wdXNoKFxuXHRcdFx0XHRcdDxBIGNsYXNzPXtyZWNvcmRCdXR0b25DbGFzc31cblx0XHRcdFx0XHRcdFx0b25QcmVzcz17dGhpcy5jb250ZXh0LnJlY29yZENsaWNrfT5cblx0XHRcdFx0XHRcdDxpbWcgc3JjPVwiaW1nL2NpcmNsZS1maWxsLnN2Z1wiLz5cblx0XHRcdFx0XHQ8L0E+XG5cdFx0XHRcdCk7XG5cblx0XHRcdGl0ZW1zLnB1c2goXG5cdFx0XHRcdDxBIGNsYXNzPVwiaGVhZGVyLWJ1dHRvbiB0ZXh0LXdoaXRlXCJcblx0XHRcdFx0XHRcdG9uUmVsZWFzZT17dGhpcy5jb250ZXh0LnRvZ2dsZVNldHRpbmdzfT5cblx0XHRcdFx0XHQ8aW1nIHNyYz1cImltZy9nZWFyLWZpbGwuc3ZnXCIvPlxuXHRcdFx0XHQ8L0E+XG5cdFx0XHQpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGl0ZW1zLnB1c2goXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJoZWFkZXItdGV4dCB0ZXh0LXdoaXRlXCI+SG9vZG1vZGU8L2Rpdj5cblx0XHRcdCk7XG5cblx0XHRcdGl0ZW1zLnB1c2goXG5cdFx0XHRcdDxBIGNsYXNzPVwiaGVhZGVyLWJ1dHRvbiB0ZXh0LXdoaXRlXCJcblx0XHRcdFx0XHRvblJlbGVhc2U9e3RoaXMuY29udGV4dC5zaG93QWJvdXRTY3JlZW59PlxuXHRcdFx0XHRcdDxpbWcgc3JjPVwiaW1nL2luZm8taWNvbi5zdmdcIi8+XG5cdFx0XHRcdDwvQT5cblx0XHRcdCk7XG5cdFx0fVxuXG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzcz1cImhlYWRlciBib3ggYmctZGFya1wiPlxuXHRcdFx0XHR7aXRlbXN9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59IiwiaW1wb3J0IHsgaCwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCBBIGZyb20gJy4vQS5qc3gnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMYXllciBleHRlbmRzIENvbXBvbmVudCB7XG5cdG9uS2V5RG93bj0oZSk9Pntcblx0XHRpZiAoZS50YXJnZXQubm9kZU5hbWU9PVwiSU5QVVRcIilcblx0XHRcdHJldHVybjtcblxuXHRcdGxldCBrPXBhcnNlSW50KGUua2V5KS0xO1xuXHRcdGlmIChrPj0wKVxuXHRcdFx0dGhpcy5jb250ZXh0LnNvdW5kQnV0dG9uQ2xpY2soayk7XG5cdH1cblxuXHRjb21wb25lbnREaWRNb3VudCgpIHtcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLHRoaXMub25LZXlEb3duKTtcblx0fVxuXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuXHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsdGhpcy5vbktleURvd24pO1xuXHR9XG5cblx0cmVuZGVyU291bmRTeW1ib2xzKCkge1xuXHRcdGxldCBpbnN0cnVtZW50PXRoaXMuY29udGV4dC5nZXRDdXJyZW50SW5zdHJ1bWVudCgpO1xuXHRcdGxldCBsYXllcj10aGlzLmNvbnRleHQuZ2V0Q3VycmVudExheWVyKCk7XG5cdFx0bGV0IGJ1dHRvbnM9bmV3IEFycmF5KDE2KS5maWxsKDxkaXYgY2xhc3M9XCJib3ggdy0xXCIvPik7XG5cdFx0bGV0IG51bVNvdW5kcz10aGlzLmNvbnRleHQuZ2V0SW5zdHJ1bWVudE51bVNvdW5kc0J5S2V5KGluc3RydW1lbnQua2V5KTtcblxuXHRcdGZvciAobGV0IGk9MDsgaTw5OyBpKyspIHtcblx0XHRcdGxldCBidXR0b25JbmRleD04LTQqTWF0aC5mbG9vcihpLzMpK2klMztcblx0XHRcdGlmIChpPG51bVNvdW5kcykge1xuXHRcdFx0XHRsZXQgYnV0dG9uQ2xhc3M9XCJib3ggdy0xIGJnLXByaW1hcnkgdGV4dC13aGl0ZSBcIjtcblxuXHRcdFx0XHRpZiAodGhpcy5jb250ZXh0LmN1cnJlbnRHcmlkSW5kZXg+PTAgJiZcblx0XHRcdFx0XHRcdGxheWVyLnNlcVt0aGlzLmNvbnRleHQuY3VycmVudEdyaWRJbmRleF0uc291bmRzLmluY2x1ZGVzKGkpKVxuXHRcdFx0XHRcdGJ1dHRvbkNsYXNzKz1cImFjdGl2ZVwiXG5cblx0XHRcdFx0bGV0IGJ1dHRvbkljb247XG5cdFx0XHRcdGlmIChpbnN0cnVtZW50LnR5cGU9PVwicGVyY3Vzc2l2ZVwiKVxuXHRcdFx0XHRcdGJ1dHRvbkljb249XCJpbWcvXCIraW5zdHJ1bWVudC5pY29uc1tpXTtcblxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0YnV0dG9uSWNvbj1cImltZy9obm90ZS1cIisoMSsyKihpJTMpKStcIi5zdmdcIjtcblxuXHRcdFx0XHRidXR0b25zW2J1dHRvbkluZGV4XT1cblx0XHRcdFx0XHQ8QSBjbGFzcz17YnV0dG9uQ2xhc3N9XG5cdFx0XHRcdFx0XHRcdG9uUHJlc3M9e3RoaXMuY29udGV4dC5zb3VuZEJ1dHRvbkNsaWNrLmJpbmQobnVsbCxpKX0+XG5cdFx0XHRcdFx0XHQ8aW1nIHNyYz17YnV0dG9uSWNvbn0vPlxuXHRcdFx0XHRcdDwvQT5cblx0XHRcdH1cblxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGJ1dHRvbnNbYnV0dG9uSW5kZXhdPVxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJib3ggdy0xIGJnLXByaW1hcnlcIi8+XG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRsZXQgY2xzPVwiYm94IHctMSBiZy13YXJuaW5nIHRleHQtd2hpdGUgXCI7XG5cdFx0aWYgKHRoaXMuY29udGV4dC5jdXJyZW50R3JpZEluZGV4Pj0wICYmXG5cdFx0XHRcdFx0bGF5ZXIuc2VxW3RoaXMuY29udGV4dC5jdXJyZW50R3JpZEluZGV4XS5zdGFjYylcblx0XHRcdGNscys9XCJhY3RpdmVcIjtcblxuXHRcdGJ1dHRvbnNbMTJdPShcblx0XHRcdDxBIGNsYXNzPXtjbHN9XG5cdFx0XHRcdFx0b25QcmVzcz17dGhpcy5jb250ZXh0LnRvZ2dsZUN1cnJlbnRMYXllclN0YWNjfT5cblx0XHRcdFx0PGltZyBzcmM9XCJpbWcvcmVzdC5zdmdcIi8+XG5cdFx0XHQ8L0E+XG5cdFx0KTtcblxuXHRcdGxldCBjdXJyZW50VmVsPW51bGw7XG5cdFx0aWYgKHRoaXMuY29udGV4dC5jdXJyZW50R3JpZEluZGV4Pj0wICYmXG5cdFx0XHRcdHRoaXMuY29udGV4dC5jdXJyZW50TGF5ZXJIYXNTb3VuZEF0KHRoaXMuY29udGV4dC5jdXJyZW50R3JpZEluZGV4KSlcblx0XHRcdGN1cnJlbnRWZWw9bGF5ZXIuc2VxW3RoaXMuY29udGV4dC5jdXJyZW50R3JpZEluZGV4XS52ZWw7XG5cblx0XHRsZXQgc2l6ZUNsYXNzZXM9W1widGlueVwiLFwic21hbGxcIixcIlwiXTtcblx0XHRsZXQgdmVscz1bMC4yNSwwLjUwLDFdO1xuXHRcdGZvciAobGV0IGk9MDsgaTwzOyBpKyspIHtcblx0XHRcdGxldCBjbHM9XCJib3ggdy0xIGJnLXdhcm5pbmcgdGV4dC13aGl0ZSBcIitzaXplQ2xhc3Nlc1tpXStcIiBcIjtcblxuXHRcdFx0aWYgKGN1cnJlbnRWZWw9PXZlbHNbaV0pXG5cdFx0XHRcdGNscys9XCJhY3RpdmVcIjtcblxuXHRcdFx0YnV0dG9uc1sxMytpXT0oXG5cdFx0XHRcdDxBIGNsYXNzPXtjbHN9XG5cdFx0XHRcdFx0XHRocmVmPVwiI1wiXG5cdFx0XHRcdFx0XHRvblByZXNzPXt0aGlzLmNvbnRleHQuc2V0Q3VycmVudExheWVyVmVsLmJpbmQobnVsbCx2ZWxzW2ldKX0+XG5cdFx0XHRcdFx0PGltZyBzcmM9XCJpbWcvbm90ZS5zdmdcIi8+XG5cdFx0XHRcdDwvQT5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKGluc3RydW1lbnQudHlwZT09XCJoYXJtb25pY1wiKSB7XG5cdFx0XHRmb3IgKGxldCBvY3RhdmUgb2YgWzAsMSwyXSkge1xuXHRcdFx0XHRsZXQgY2xzPVwiYm94IHctMSBiZy1pbmZvIHRleHQtd2hpdGUgXCI7XG5cdFx0XHRcdGlmICh0aGlzLmNvbnRleHQuY3VycmVudEdyaWRJbmRleD49MCAmJlxuXHRcdFx0XHRcdFx0dGhpcy5jb250ZXh0LmN1cnJlbnRMYXllckhhc0Nob3JkQXQodGhpcy5jb250ZXh0LmN1cnJlbnRHcmlkSW5kZXgsb2N0YXZlKSlcblx0XHRcdFx0XHRjbHMrPVwiYWN0aXZlXCI7XG5cblx0XHRcdFx0YnV0dG9uc1sxMS1vY3RhdmUqNF09KFxuXHRcdFx0XHRcdDxBIGNsYXNzPXtjbHN9XG5cdFx0XHRcdFx0XHRcdGhyZWY9XCIjXCJcblx0XHRcdFx0XHRcdFx0b25QcmVzcz17dGhpcy5jb250ZXh0LmNob3JkQnV0dG9uQ2xpY2suYmluZChudWxsLG9jdGF2ZSl9PlxuXHRcdFx0XHRcdFx0PGltZyBzcmM9XCJpbWcvaG5vdGUtY2hvcmQuc3ZnXCIvPlxuXHRcdFx0XHRcdDwvQT5cblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gYnV0dG9ucztcblx0fVxuXG5cdHJlbmRlclNlcXVlbmNlKCkge1xuXHRcdGxldCBsYXllcj10aGlzLmNvbnRleHQuZ2V0Q3VycmVudExheWVyKCk7XG5cdFx0bGV0IHJlcz1bXTtcblx0XHRsZXQgdmVsQ2xzPXtcblx0XHRcdDAuMjU6IFwidGlueVwiLFxuXHRcdFx0MC41OiBcInNtYWxsXCIsXG5cdFx0XHQxOiBcIlwiXG5cdFx0fTtcblxuXHRcdGZvciAobGV0IGdyaWRJbmRleD0wOyBncmlkSW5kZXg8MTY7IGdyaWRJbmRleCsrKSB7XG5cdFx0XHRsZXQgY2xzPVwiYm94IHctMSBiZWF0LWdyaWQgYmVhdC1cIitncmlkSW5kZXgrXCIgXCI7XG5cblx0XHRcdGlmIChncmlkSW5kZXg9PXRoaXMuY29udGV4dC5jdXJyZW50R3JpZEluZGV4KVxuXHRcdFx0XHRjbHMrPVwiYmctbGlnaHQgXCI7XG5cblx0XHRcdGVsc2Vcblx0XHRcdFx0Y2xzKz1cImJnLWJsYWNrIHRleHQtd2hpdGUgXCI7XG5cblx0XHRcdGxldCBpY29uPW51bGw7XG5cdFx0XHRpZiAobGF5ZXIuc2VxW2dyaWRJbmRleF0uc3RhY2MpXG5cdFx0XHRcdGljb249PGltZyBzcmM9XCJpbWcvcmVzdC5zdmdcIi8+O1xuXG5cdFx0XHRlbHNlIGlmICh0aGlzLmNvbnRleHQuY3VycmVudExheWVySGFzU291bmRBdChncmlkSW5kZXgpKSB7XG5cdFx0XHRcdGljb249PGltZyBzcmM9XCJpbWcvbm90ZS5zdmdcIi8+O1xuXHRcdFx0XHRjbHMrPXZlbENsc1tsYXllci5zZXFbZ3JpZEluZGV4XS52ZWxdO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXMucHVzaChcblx0XHRcdFx0PEEgY2xhc3M9e2Nsc31cblx0XHRcdFx0XHRcdG9uUHJlc3M9e3RoaXMuY29udGV4dC5ncmlkSW5kZXhDbGljay5iaW5kKG51bGwsZ3JpZEluZGV4KX0+XG5cdFx0XHRcdFx0e2ljb259XG5cdFx0XHRcdDwvQT5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlcztcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRsZXQgbGF5ZXI9dGhpcy5jb250ZXh0LmdldEN1cnJlbnRMYXllcigpO1xuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lLWNvbnRhaW5lciByZXYtcG9ydHJhaXRcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInBhbmUgYm94IGJvcmRlciBib3JkZXItZGFya1wiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lLWhlYWRlciB0ZXh0LXNlY29uZGFyeSBiZy1kYXJrXCI+U09VTkRTPC9kaXY+XG5cdFx0XHRcdFx0e3RoaXMucmVuZGVyU291bmRTeW1ib2xzKCl9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZSBib3ggYmctZGFya1wiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lLWhlYWRlciB0ZXh0LXNlY29uZGFyeSBiZy1kYXJrXCI+U0VRVUVOQ0U8L2Rpdj5cblx0XHRcdFx0XHR7dGhpcy5yZW5kZXJTZXF1ZW5jZSgpfVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbiIsImltcG9ydCB7IGgsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgQSBmcm9tICcuL0EuanN4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGF5ZXJTZXR0aW5ncyB7XG5cdHJlbmRlcigpIHtcblx0XHRsZXQgaW5zdHJ1bWVudD10aGlzLmNvbnRleHQuZ2V0Q3VycmVudEluc3RydW1lbnQoKTtcblx0XHRsZXQgbGF5ZXI9dGhpcy5jb250ZXh0LmdldEN1cnJlbnRMYXllcigpO1xuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lLWNvbnRhaW5lclwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYm94IHBhbmUgZG91YmxlIGJnLWRhcmtcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZS1oZWFkZXIgYmctZGFyayB0ZXh0LXNlY29uZGFyeVwiPkxBWUVSIFNFVFRJTkdTPC9kaXY+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cImJveCB3LTQgZWwgdGV4dC13aGl0ZVwiPlxuXHRcdFx0XHRcdFx0PGltZyBzcmM9e1wiaW1nL1wiK2luc3RydW1lbnQuaWNvbn0vPlxuXHRcdFx0XHRcdFx0e2luc3RydW1lbnQubmFtZX1cblx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdDxici8+PGJyLz5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuXHRcdFx0XHRcdFx0Vm9sdW1lPGJyLz5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJib3ggYm9yZGVyIGJnLXdoaXRlIGJvcmRlci1ibGFjayB0ZXh0LWJsYWNrIHctNFwiPlxuXHRcdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cInJhbmdlXCIgbWluPVwiMFwiIG1heD1cIjFcIiBzdGVwPVwiMC4wMVwiXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU9e2xheWVyLnZvbHVtZX1cblx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5jb250ZXh0LnNldEN1cnJlbnRMYXllclZvbHVtZX1cblx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cImZvcm0tYnV0dG9uc1wiPlxuXHRcdFx0XHRcdFx0PEEgY2xhc3M9XCJib3ggYmctZGFuZ2VyIHRleHQtd2hpdGVcIlxuXHRcdFx0XHRcdFx0XHRcdG9uUmVsZWFzZT17dGhpcy5jb250ZXh0LmRlbGV0ZUN1cnJlbnRMYXllcn0+XG5cdFx0XHRcdFx0XHRcdDxpbWcgc3JjPVwiaW1nL3RyYXNoLnN2Z1wiLz5cblx0XHRcdFx0XHRcdDwvQT5cblx0XHRcdFx0XHRcdDxBIGNsYXNzPVwiYm94IGJnLXByaW1hcnkgZm9ybS1idXR0b24gdGV4dC13aGl0ZVwiXG5cdFx0XHRcdFx0XHRcdFx0b25SZWxlYXNlPXt0aGlzLmNvbnRleHQudG9nZ2xlU2V0dGluZ3N9PlxuXHRcdFx0XHRcdFx0XHRDbG9zZVxuXHRcdFx0XHRcdFx0PC9BPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbiIsImltcG9ydCB7IGgsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgQSBmcm9tICcuL0EuanN4JztcbmltcG9ydCB7IFNlbGVjdCwgSUYgfSBmcm9tICcuLi91dGlscy9SZWFjdFV0aWwuanN4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VsZWN0Q2hvcmQgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRyZW5kZXIoKSB7XG5cdFx0bGV0IHNvbmc9dGhpcy5jb250ZXh0LmdldEN1cnJlbnRTb25nKCk7XG5cdFx0bGV0IHNlY3Rpb249c29uZy5zZWN0aW9uc1t0aGlzLmNvbnRleHQuY3VycmVudFNlY3Rpb25JbmRleF07XG5cdFx0bGV0IGN1cnJlbnRDaG9yZEluZGV4PXNlY3Rpb25bdGhpcy5jb250ZXh0LmVkaXRTZWN0aW9uQ2hvcmRWaXNpYmxlXTtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzPVwibW9kYWwtY29udGFpbmVyXCIgb25DbGljaz17dGhpcy5jb250ZXh0LmhpZGVFZGl0U2VjdGlvbkNob3JkfT5cblx0XHRcdFx0PGRpdiBjbGFzcz1cImJveCBib3JkZXIgYm9yZGVyLWRhcmsgYmctYmFja2dyb3VuZCBzZWxlY3QtY2hvcmRcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZS1oZWFkZXIgdGV4dC1zZWNvbmRhcnkgYmctZGFyayBcIj5FRElUIENIT1JEPC9kaXY+XG5cdFx0XHRcdFx0PGhyIGNsYXNzPVwicGFuZS1kaXZpZGVyIGZvdXJcIi8+XG5cdFx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHRcdHt0aGlzLmNvbnRleHQuZ2V0Q2hvcmRMYWJlbHMoKS5tYXAoKGxhYmVsLCBpbmRleCk9Pntcblx0XHRcdFx0XHRcdFx0bGV0IGNscz1cImJveCB3LTEgYmctc3VjY2VzcyB0ZXh0LWxpZ2h0IGNob3JkIFwiO1xuXHRcdFx0XHRcdFx0XHRpZiAoaW5kZXg9PWN1cnJlbnRDaG9yZEluZGV4KVxuXHRcdFx0XHRcdFx0XHRcdGNscys9XCJhY3RpdmVcIjtcblxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdFx0XHRcdDxBIGNsYXNzPXtjbHN9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG9uUmVsZWFzZT17dGhpcy5jb250ZXh0LmVkaXRTZWN0aW9uQ2hvcmQuYmluZChudWxsLGluZGV4KX0+XG5cdFx0XHRcdFx0XHRcdFx0XHR7bGFiZWx9XG5cdFx0XHRcdFx0XHRcdFx0PC9BPlxuXHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHR9KX1cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHR7SUYoc2VjdGlvbi5sZW5ndGg+MSwoKT0+XG5cdFx0XHRcdFx0XHQ8QSBjbGFzcz1cImJveCBiZy1kYW5nZXIgdy0xIHRleHQtd2hpdGVcIlxuXHRcdFx0XHRcdFx0XHRcdGhyZWY9XCIjXCJcblx0XHRcdFx0XHRcdFx0XHRvblJlbGVhc2U9e3RoaXMuY29udGV4dC5yZW1vdmVTZWN0aW9uQ2hvcmR9PlxuXHRcdFx0XHRcdFx0XHQ8aW1nIHNyYz1cImltZy90cmFzaC5zdmdcIi8+XG5cdFx0XHRcdFx0XHQ8L0E+XG5cdFx0XHRcdFx0KX1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBoLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IFNvbmdMYXllcnMgZnJvbSAnLi9Tb25nTGF5ZXJzLmpzeCc7XG5pbXBvcnQgU29uZ0Nob3JkcyBmcm9tICcuL1NvbmdDaG9yZHMuanN4JztcbmltcG9ydCBBIGZyb20gJy4vQS5qc3gnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTb25nIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZS1jb250YWluZXJcIj5cblx0XHRcdFx0PFNvbmdMYXllcnMgLz5cblx0XHRcdFx0PFNvbmdDaG9yZHMgLz5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbiIsImltcG9ydCB7IGgsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgU2VsZWN0Q2hvcmQgZnJvbSAnLi9TZWxlY3RDaG9yZC5qc3gnO1xuaW1wb3J0IHsgU2VsZWN0LCBJRiB9IGZyb20gJy4uL3V0aWxzL1JlYWN0VXRpbC5qc3gnO1xuaW1wb3J0IEEgZnJvbSAnLi9BLmpzeCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNvbmdDaG9yZHMgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRyZW5kZXJDb25kdWN0b3JDaG9yZHMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuY29udGV4dC5nZXRDaG9yZExhYmVscygpLm1hcCgobGFiZWwsIGluZGV4KT0+e1xuXHRcdFx0bGV0IGNscz1cImJveCB3LTEgYmctc3VjY2VzcyB0ZXh0LWxpZ2h0IGNob3JkIFwiO1xuXHRcdFx0aWYgKGluZGV4PT10aGlzLmNvbnRleHQuY3VycmVudENob3JkSW5kZXgpXG5cdFx0XHRcdGNscys9XCIgYWN0aXZlIGJlYXQtMCBiZWF0LTQgYmVhdC04IGJlYXQtMTJcIjtcblxuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PEEgY2xhc3M9e2Nsc31cblx0XHRcdFx0XHRcdG9uUHJlc3M9e3RoaXMuY29udGV4dC5zZXRDdXJyZW50Q2hvcmRJbmRleC5iaW5kKG51bGwsaW5kZXgpfT5cblx0XHRcdFx0XHR7bGFiZWx9XG5cdFx0XHRcdDwvQT5cblx0XHRcdClcblx0XHR9KTtcblx0fVxuXG5cdHJlbmRlclNlY3Rpb25DaG9yZHMoKSB7XG5cdFx0bGV0IGE9dGhpcy5jb250ZXh0LmdldEN1cnJlbnRTZWN0aW9uQ2hvcmRMYWJlbHMoKS5tYXAoKGxhYmVsLCBpbmRleCk9Pntcblx0XHRcdGxldCBjbHM9XCJib3ggdy0xIGJnLXN1Y2Nlc3MgdGV4dC1saWdodCBzZWN0aW9uLWNob3JkIHNlcXVlbmNlLVwiK2luZGV4O1xuXG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8QSBjbGFzcz17Y2xzfVxuXHRcdFx0XHRcdFx0b25SZWxlYXNlPXt0aGlzLmNvbnRleHQuc2hvd0VkaXRTZWN0aW9uQ2hvcmQuYmluZChudWxsLGluZGV4KX0+XG5cdFx0XHRcdFx0e2xhYmVsfVxuXHRcdFx0XHQ8L0E+XG5cdFx0XHQpO1xuXHRcdH0pO1xuXG5cdFx0YS5wdXNoKFxuXHRcdFx0PEEgY2xhc3M9XCJib3ggYm9yZGVyIGJvcmRlci13aGl0ZSB0ZXh0LXdoaXRlIHctMVwiXG5cdFx0XHRcdFx0b25SZWxlYXNlPXt0aGlzLmNvbnRleHQuYWRkU2VjdGlvbkNob3JkfT5cblx0XHRcdFx0K1xuXHRcdFx0PC9BPlxuXHRcdCk7XG5cblx0XHRyZXR1cm4gYTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRsZXQgc29uZz10aGlzLmNvbnRleHQuZ2V0Q3VycmVudFNvbmcoKTtcblxuXHRcdGxldCBjaG9yZExhYmVscztcblx0XHRpZiAodGhpcy5jb250ZXh0LmN1cnJlbnRTZWN0aW9uSW5kZXg9PS0xKVxuXHRcdFx0Y2hvcmRMYWJlbHM9dGhpcy5yZW5kZXJDb25kdWN0b3JDaG9yZHMoKTtcblxuXHRcdGVsc2Vcblx0XHRcdGNob3JkTGFiZWxzPXRoaXMucmVuZGVyU2VjdGlvbkNob3JkcygpO1xuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lIGJveCBib3JkZXIgYm9yZGVyLWRhcmtcIj5cblx0XHRcdFx0PGhyIGNsYXNzPVwicGFuZS1kaXZpZGVyXCIvPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZS1oZWFkZXIgdGV4dC1zZWNvbmRhcnkgYmctZGFyayBcIj5DSE9SRFM8L2Rpdj5cblx0XHRcdFx0PGRpdiBzdHlsZT17e2hlaWdodDogJzZlbSd9fT57Y2hvcmRMYWJlbHN9PC9kaXY+XG5cdFx0XHRcdDxBIGNsYXNzPXtcImJveCB3LTEgYmctc2Vjb25kYXJ5IHRleHQtd2hpdGUgXCIrXG5cdFx0XHRcdFx0XHRcdCgodGhpcy5jb250ZXh0LmN1cnJlbnRTZWN0aW9uSW5kZXg9PS0xKT9cImFjdGl2ZVwiOlwiXCIpfVxuXHRcdFx0XHRcdFx0b25QcmVzcz17dGhpcy5jb250ZXh0LnNldEN1cnJlbnRTZWN0aW9uSW5kZXguYmluZChudWxsLC0xKX0+XG5cdFx0XHRcdFx0PGltZyBzcmM9XCJpbWcvY29uZHVjdG9yLnN2Z1wiLz5cblx0XHRcdFx0PC9BPlxuXHRcdFx0XHR7W1wiQVwiLFwiQlwiLFwiQ1wiXS5tYXAoKGxldHRlciwgaW5kZXgpPT57XG5cdFx0XHRcdFx0bGV0IGNscz1cImJveCB3LTEgYmctcHJpbWFyeSB0ZXh0LXdoaXRlIFwiO1xuXHRcdFx0XHRcdGlmIChpbmRleD09dGhpcy5jb250ZXh0LmN1cnJlbnRTZWN0aW9uSW5kZXgpXG5cdFx0XHRcdFx0XHRjbHMrPVwiYWN0aXZlXCI7XG5cblx0XHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdFx0PEEgY2xhc3M9e2Nsc31cblx0XHRcdFx0XHRcdFx0XHRvblByZXNzPXt0aGlzLmNvbnRleHQuc2V0Q3VycmVudFNlY3Rpb25JbmRleC5iaW5kKG51bGwsaW5kZXgpfT5cblx0XHRcdFx0XHRcdFx0e2xldHRlcn1cblx0XHRcdFx0XHRcdDwvQT5cblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9KX1cblx0XHRcdFx0e0lGKHRoaXMuY29udGV4dC5lZGl0U2VjdGlvbkNob3JkVmlzaWJsZT49MCwoKT0+XG5cdFx0XHRcdFx0PFNlbGVjdENob3JkIC8+XG5cdFx0XHRcdCl9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBoLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IEEgZnJvbSAnLi9BLmpzeCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNvbmdMYXllcnMgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRyZW5kZXIoKSB7XG5cdFx0bGV0IHNvbmc9dGhpcy5jb250ZXh0LmdldEN1cnJlbnRTb25nKCk7XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzcz1cInBhbmUgYm94IGJvcmRlciBib3JkZXItZGFya1wiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZS1oZWFkZXIgdGV4dC1zZWNvbmRhcnlcIj5MQVlFUlM8L2Rpdj5cblx0XHRcdFx0e3NvbmcubGF5ZXJzLm1hcCgobGF5ZXIsaW5kZXgpPT57XG5cdFx0XHRcdFx0bGV0IGNscz1cImJveCBiZy1kYW5nZXIgdGV4dC13aGl0ZSB3LTIgbGF5ZXItYnV0dG9uLVwiK2luZGV4K1wiIFwiO1xuXHRcdFx0XHRcdGxldCBpY29uPVwiaW1nL3RvZ2dsZS1vbi5zdmdcIjtcblxuXHRcdFx0XHRcdGlmICghbGF5ZXIuYXVkaWJsZSkge1xuXHRcdFx0XHRcdFx0aWNvbj1cImltZy90b2dnbGUtb2ZmLnN2Z1wiO1xuXHRcdFx0XHRcdFx0Y2xzKz1cImZhZGVkXCI7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHRcdDxBIGNsYXNzPXtjbHN9XG5cdFx0XHRcdFx0XHRcdG9uUmVsZWFzZT17dGhpcy5jb250ZXh0LnNldExheWVySW5kZXguYmluZChudWxsLGluZGV4KX0+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJsYXllci1pY29uXCI+XG5cdFx0XHRcdFx0XHRcdFx0PGltZyBzcmM9e1wiaW1nL1wiK3RoaXMuY29udGV4dC5nZXRJbnN0cnVtZW50SWNvbkJ5S2V5KGxheWVyLmluc3RydW1lbnRLZXkpfS8+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8QSBjbGFzcz1cImxheWVyLWljb25cIlxuXHRcdFx0XHRcdFx0XHRcdG9uUHJlc3M9e3RoaXMuY29udGV4dC50b2dnbGVMYXllckF1ZGlibGUuYmluZChudWxsLGluZGV4KX0+XG5cdFx0XHRcdFx0XHRcdFx0PGltZyBzcmM9e2ljb259Lz5cblx0XHRcdFx0XHRcdFx0PC9BPlxuXHRcdFx0XHRcdFx0PC9BPlxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH0pfVxuXG5cdFx0XHRcdDxBIGNsYXNzPVwiYm94IGJvcmRlciBib3JkZXItd2hpdGUgdGV4dC13aGl0ZSB3LTFcIlxuXHRcdFx0XHRcdFx0aHJlZj1cIiNcIlxuXHRcdFx0XHRcdFx0b25SZWxlYXNlPXt0aGlzLmNvbnRleHQuc2hvd0FkZExheWVyfT5cblx0XHRcdFx0XHQrXG5cdFx0XHRcdDwvQT5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbiIsImltcG9ydCB7IGgsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyBTZWxlY3QsIElGIH0gZnJvbSAnLi4vdXRpbHMvUmVhY3RVdGlsLmpzeCc7XG5pbXBvcnQgQSBmcm9tICcuL0EuanN4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU29uZ1NldHRpbmdzIHtcblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZS1jb250YWluZXJcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInBhbmUgYm94IGRvdWJsZSBiZy1kYXJrXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInBhbmUtaGVhZGVyIGJnLWRhcmsgdGV4dC1zZWNvbmRhcnlcIj5TT05HIFNFVFRJTkdTPC9kaXY+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG5cdFx0XHRcdFx0XHRTb25nIE5hbWU8YnIvPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImJveCBib3JkZXIgYmctd2hpdGUgYm9yZGVyLWJsYWNrIHRleHQtYmxhY2sgdy00XCI+XG5cdFx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwidGV4dFwiXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU9e3RoaXMuY29udGV4dC5nZXRDdXJyZW50U29uZygpLm5hbWV9XG5cdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuY29udGV4dC5zZXRDdXJyZW50U29uZ05hbWV9Lz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG5cdFx0XHRcdFx0XHRUZW1wbzxici8+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYm94IGJvcmRlciBiZy13aGl0ZSBib3JkZXItYmxhY2sgdGV4dC1ibGFjayB3LTRcIj5cblx0XHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJ0ZXh0XCJcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17dGhpcy5jb250ZXh0LmdldEN1cnJlbnRTb25nKCkuYnBtfVxuXHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLmNvbnRleHQuc2V0Q3VycmVudFNvbmdCcG19Lz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG5cdFx0XHRcdFx0XHRLZXk8YnIvPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImJveCBib3JkZXIgYmctd2hpdGUgYm9yZGVyLWJsYWNrIHRleHQtYmxhY2sgdy0yXCI+XG5cdFx0XHRcdFx0XHRcdDxTZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2wgY29sLTJcIlxuXHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucz17dGhpcy5jb250ZXh0LmdldE5vdGVzU2VsZWN0T3B0aW9ucygpfVxuXHRcdFx0XHRcdFx0XHRcdFx0c2VsZWN0ZWQ9e3RoaXMuY29udGV4dC5nZXRDdXJyZW50U29uZygpLm11c2ljS2V5fVxuXHRcdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuY29udGV4dC5zZXRDdXJyZW50U29uZ011c2ljS2V5fS8+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJib3ggYm9yZGVyIGJnLXdoaXRlIGJvcmRlci1ibGFjayB0ZXh0LWJsYWNrIHctMlwiPlxuXHRcdFx0XHRcdFx0XHQ8U2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sIGNvbC00XCJcblx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnM9e3RoaXMuY29udGV4dC5nZXRNb2RhbFNlbGVjdE9wdGlvbnMoKX1cblx0XHRcdFx0XHRcdFx0XHRcdHNlbGVjdGVkPXt0aGlzLmNvbnRleHQuZ2V0Q3VycmVudFNvbmcoKS5taW5vcn1cblx0XHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLmNvbnRleHQuc2V0Q3VycmVudFNvbmdNaW5vcn0vPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZm9ybS1idXR0b25zXCI+XG5cdFx0XHRcdFx0XHQ8QSBjbGFzcz1cImJnLXdhcm5pbmcgYm94IHRleHQtd2hpdGUgdy0xXCJcblx0XHRcdFx0XHRcdFx0XHRocmVmPVwiI1wiXG5cdFx0XHRcdFx0XHRcdFx0b25SZWxlYXNlPXt0aGlzLmNvbnRleHQuZGVsZXRlQ3VycmVudFNvbmd9PlxuXHRcdFx0XHRcdFx0XHQ8aW1nIHNyYz1cImltZy90cmFzaC5zdmdcIi8+XG5cdFx0XHRcdFx0XHQ8L0E+XG5cdFx0XHRcdFx0XHQ8QSBjbGFzcz1cImJnLXByaW1hcnkgYm94IHRleHQtd2hpdGVcIlxuXHRcdFx0XHRcdFx0XHRcdGhyZWY9XCIjXCJcblx0XHRcdFx0XHRcdFx0XHRvblJlbGVhc2U9e3RoaXMuY29udGV4dC50b2dnbGVTZXR0aW5nc30+XG5cdFx0XHRcdFx0XHRcdENsb3NlXG5cdFx0XHRcdFx0XHQ8L0E+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuIiwiaW1wb3J0IHsgaCwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCB7IFNlbGVjdCwgSUYgfSBmcm9tICcuLi91dGlscy9SZWFjdFV0aWwuanN4JztcbmltcG9ydCBBIGZyb20gJy4vQS5qc3gnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYXBIaWdobGlnaHQgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKTtcblxuXHRcdHRoaXMuc3RhdGU9e1xuXHRcdFx0c2hvd0hpZ2hsaWdodDogZmFsc2Vcblx0XHR9XG5cdH1cblxuXHRvbkNvbnRleHRNZW51PShlKT0+e1xuXHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRzaG93SGlnaGxpZ2h0OiB0cnVlXG5cdFx0fSk7XG5cblx0XHRsZXQgcz1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGU7XG5cdFx0cy5zZXRQcm9wZXJ0eShcIi0tdGFwSGlnaGxpZ2h0TGVmdFwiLGUuY2xpZW50WCtcInB4XCIpO1xuXHRcdHMuc2V0UHJvcGVydHkoXCItLXRhcEhpZ2hsaWdodFRvcFwiLGUuY2xpZW50WStcInB4XCIpO1xuXHR9O1xuXG5cdG9uTW91c2VVcD0oZSk9Pntcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdHNob3dIaWdobGlnaHQ6IGZhbHNlXG5cdFx0fSk7XG5cdH07XG5cblx0Y29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNvbnRleHRtZW51XCIsdGhpcy5vbkNvbnRleHRNZW51KTtcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLHRoaXMub25Nb3VzZVVwKTtcblx0fVxuXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuXHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLHRoaXMub25Db250ZXh0TWVudSk7XG5cdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIix0aGlzLm9uTW91c2VVcCk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3M9XCJ0YXAtaGlnaGxpZ2h0XCI+XG5cdFx0XHRcdHtJRih0aGlzLnN0YXRlLnNob3dIaWdobGlnaHQsKCk9PlxuXHRcdFx0XHRcdDxpbWcgc3JjPVwiaW1nL3RhcC1oaWdobGlnaHQuc3ZnXCIvPlxuXHRcdFx0XHQpfVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSJdfQ==
