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

},{"./model/AppController.js":16,"./model/AppHelper.js":17,"./model/Conductor.js":18,"./utils/AppContext.js":22,"./view/App.jsx":30,"preact":4,"preact/debug":2,"shortid":6}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _shortid = _interopRequireDefault(require("shortid"));

require("regenerator-runtime/runtime");

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
        editSectionChordVisible: -1
      };
      state.instruments.push({
        "key": "bad-jazz-drums",
        "type": "percussive",
        "name": "Bad Jazz Drums",
        "labels": ["KICK", "SNARE", "HI-HAT"],
        "icon": "drum.svg",
        "icons": ["kick-drum.svg", "snare-drum.svg", "hi-hat.svg"],
        "samples": ["samples/drums/bad-kick.wav", "samples/drums/bad-snare.wav", "samples/drums/bad-hihat.wav"]
      });
      state.instruments.push({
        "key": "yes-drums",
        "type": "percussive",
        "name": "Yes Drums",
        "labels": ["KICK", "SNARE", "HI-HAT 1", "HI-HAT 2", "HI-HAT 3"],
        "icon": "drum.svg",
        "icons": ["kick-drum.svg", "snare-drum.svg", "hi-hat.svg", "hi-hat.svg", "hi-hat.svg"],
        "samples": ["samples/drums/yes-kick.mp3", "samples/drums/yes-snare.mp3", "samples/drums/thrl-hat_A_minor.wav", "samples/drums/vinyl-hat_90bpm_C.wav", "samples/drums/rock-hihat-tchik.wav"]
      });
      state.instruments.push({
        "key": "dive-bass",
        "type": "harmonic",
        "name": "Dive Bass",
        "sample": "samples/bass/upright-bass-bombdive.mp3",
        "icon": "bass.svg"
      });
      state.instruments.push({
        "key": "acoustic-bass",
        "type": "harmonic",
        "name": "Acoustic Bass",
        "sampleNote": "F#",
        "sample": "samples/bass/acoustic_bass_f_sharp.mp3",
        "icon": "bass.svg"
      });
      state.instruments.push({
        "key": "piano",
        "type": "harmonic",
        "name": "Piano",
        "sample": "samples/piano/piano-c.wav",
        "defaultVolume": 0.25,
        "icon": "piano.svg"
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
                this.conductor.setState(state);
                _context.next = 6;
                return this.conductor.loadInstruments();

              case 6:
                return _context.abrupt("return", state);

              case 7:
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
    key: "deleteCurrentSong",
    value: function deleteCurrentSong(state) {
      state.songs.splice(state.currentSongIndex, 1);
      state.currentSongIndex = -1;
      state.settingsVisible = false;
      state.currentSectionIndex = -1;
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
    value: function addLayer(state, instrumentName) {
      var song = state.songs[state.currentSongIndex];
      var seq = [];
      var numSounds = this.helper.getInstrumentNumSoundsByName(state, instrumentName);
      var instrument = this.helper.getInstrumentByName(state, instrumentName);
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
        instrumentName: instrumentName,
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

},{"regenerator-runtime/runtime":5,"shortid":6}],17:[function(require,module,exports){
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

var AppHelper = /*#__PURE__*/function () {
  function AppHelper(conductor) {
    _classCallCheck(this, AppHelper);

    this.conductor = conductor;
  }

  _createClass(AppHelper, [{
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
    key: "getInstrumentByName",
    value: function getInstrumentByName(state, name) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = state.instruments[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var instrument = _step.value;
          if (instrument.name == name) return instrument;
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
    }
  }, {
    key: "getInstrumentNumSoundsByName",
    value: function getInstrumentNumSoundsByName(state, name) {
      var instrument = this.getInstrumentByName(state, name);

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
      return this.getInstrumentByName(state, layer.instrumentName);
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
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = section[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var i = _step2.value;
          a.push(chordNames[i]);
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

      return a;
    }
  }, {
    key: "getNotesSelectOptions",
    value: function getNotesSelectOptions(state) {
      var a = [];
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = _MusicUtil["default"].NOTE_NAMES[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var noteName = _step3.value;
          a.push({
            key: noteName,
            label: noteName
          });
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
    key: "getChordOptions",
    value: function getChordOptions(state) {
      var song = this.getCurrentSong(state);

      var chordNames = _MusicUtil["default"].getChordNamesForScale(song.musicKey, song.minor);

      var a = [];
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = chordNames[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var chordName = _step4.value;
          a.push({
            key: chordName,
            label: chordName
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

},{"../utils/MusicUtil.js":25}],18:[function(require,module,exports){
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
    key: "getConductorInstrumentByName",
    value: function getConductorInstrumentByName(name) {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.instruments.getItems()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var instrument = _step3.value;
          if (instrument.getName() == name) return instrument;
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
      var note = layer.instrument.createNote(soundIndex);
      note.setChordCents(this.getCurrentChordCents());
      note.connect(layer.destination);
      note.playNow();
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
              var note = layer.instrument.createNote(soundIndex);
              note.connect(layer.destination);
              note.setChordCents(chordCents);
              note.playSheduled(at, layer.getNoteLen(gridIndex) * this.getSecPerGrid());
              note.setVelocity(layer.data.seq[gridIndex].vel);
              note.onended = this.onNoteEnded.bind(this, note);
              this.currentNotes.push(note);
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

},{"../utils/AudioTimer":23,"../utils/AudioUtil":24,"../utils/MusicUtil":25,"../utils/ReconcileArray":27,"./ConductorInstrument":19,"./ConductorLayer":20}],19:[function(require,module,exports){
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
    key: "getName",
    value: function getName() {
      return this.data.name;
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

},{"../utils/AudioUtil":24,"../utils/MusicUtil":25,"./ConductorNote":21}],20:[function(require,module,exports){
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
    this.instrument = this.conductor.getConductorInstrumentByName(data.instrumentName);
    if (!this.instrument) throw new Error("There is no instrument!!!");
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

},{}],21:[function(require,module,exports){
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

},{"../utils/MusicUtil":25}],22:[function(require,module,exports){
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

},{"preact":4}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
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

},{"preact":4}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
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
      //e.preventDefault();
      e.stopPropagation();
      if (_this.base.isPressed) return;
      _this.base.isPressed = true;
      if (_this.props.onPress) _this.props.onPress();
      if (_this.props.onRelease) _this.base.className += " pressed";
    });

    _defineProperty(_assertThisInitialized(_this), "onUp", function (e) {
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

},{"preact":4}],29:[function(require,module,exports){
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
          onRelease: _this.context.addLayer.bind(null, instrument.name)
        }, (0, _preact.h)("img", {
          src: "img/" + instrument.icon
        }), instrument.name);
      })));
    }
  }]);

  return AddLayer;
}();

exports["default"] = AddLayer;

},{"./A.jsx":28,"preact":4}],30:[function(require,module,exports){
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
      }));
    }
  }]);

  return App;
}(_preact.Component);

exports["default"] = App;

},{"../utils/ReactUtil.jsx":26,"./A.jsx":28,"./AddLayer.jsx":29,"./Front.jsx":31,"./Header.jsx":32,"./Layer.jsx":33,"./LayerSettings.jsx":34,"./SelectChord.jsx":35,"./Song.jsx":36,"./SongSettings.jsx":39,"./TapHighlight.jsx":40,"preact":4}],31:[function(require,module,exports){
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

},{"./A.jsx":28,"preact":4}],32:[function(require,module,exports){
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
          src: "img/" + this.context.getInstrumentByName(this.context.getCurrentLayer().instrumentName).icon
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
      }

      return (0, _preact.h)("div", {
        "class": "header box bg-dark"
      }, items);
    }
  }]);

  return Header;
}(_preact.Component);

exports["default"] = Header;

},{"../utils/ReactUtil.jsx":26,"./A.jsx":28,"preact":4}],33:[function(require,module,exports){
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
      var numSounds = this.context.getInstrumentNumSoundsByName(instrument.name);

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

},{"./A.jsx":28,"preact":4}],34:[function(require,module,exports){
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
      }, "Remove Layer"), (0, _preact.h)(_A["default"], {
        "class": "box bg-primary form-button text-white",
        onRelease: this.context.toggleSettings
      }, "Close"))));
    }
  }]);

  return LayerSettings;
}();

exports["default"] = LayerSettings;

},{"./A.jsx":28,"preact":4}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _preact = require("preact");

var _A = _interopRequireDefault(require("./A.jsx"));

var _ReactUtil = require("../utils/ReactUtil.jsx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SelectChord = /*#__PURE__*/function () {
  function SelectChord() {
    _classCallCheck(this, SelectChord);
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
}();

exports["default"] = SelectChord;

},{"../utils/ReactUtil.jsx":26,"./A.jsx":28,"preact":4}],36:[function(require,module,exports){
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

},{"./A.jsx":28,"./SongChords.jsx":37,"./SongLayers.jsx":38,"preact":4}],37:[function(require,module,exports){
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

},{"../utils/ReactUtil.jsx":26,"./A.jsx":28,"./SelectChord.jsx":35,"preact":4}],38:[function(require,module,exports){
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
          src: "img/" + _this.context.getInstrumentByName(layer.instrumentName).icon
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

},{"./A.jsx":28,"preact":4}],39:[function(require,module,exports){
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
        "class": "bg-danger box text-white",
        href: "#",
        onRelease: this.context.deleteCurrentSong
      }, "Remove Song"), (0, _preact.h)(_A["default"], {
        "class": "bg-primary box text-white",
        href: "#",
        onRelease: this.context.toggleSettings
      }, "Close"))));
    }
  }]);

  return SongSettings;
}();

exports["default"] = SongSettings;

},{"../utils/ReactUtil.jsx":26,"./A.jsx":28,"preact":4}],40:[function(require,module,exports){
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

},{"../utils/ReactUtil.jsx":26,"./A.jsx":28,"preact":4}]},{},[15])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbmFub2lkL2Zvcm1hdC5icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9kZWJ1Zy9kaXN0L2RlYnVnLmpzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9kZXZ0b29scy9kaXN0L2RldnRvb2xzLmpzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9kaXN0L3ByZWFjdC5qcyIsIm5vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiLCJub2RlX21vZHVsZXMvc2hvcnRpZC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9hbHBoYWJldC5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9idWlsZC5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9nZW5lcmF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9pcy12YWxpZC5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9yYW5kb20vcmFuZG9tLWJ5dGUtYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9yYW5kb20vcmFuZG9tLWZyb20tc2VlZC5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi91dGlsL2NsdXN0ZXItd29ya2VyLWlkLWJyb3dzZXIuanMiLCJzcmMvaW5kZXguanN4Iiwic3JjL21vZGVsL0FwcENvbnRyb2xsZXIuanMiLCJzcmMvbW9kZWwvQXBwSGVscGVyLmpzIiwic3JjL21vZGVsL0NvbmR1Y3Rvci5qcyIsInNyYy9tb2RlbC9Db25kdWN0b3JJbnN0cnVtZW50LmpzIiwic3JjL21vZGVsL0NvbmR1Y3RvckxheWVyLmpzIiwic3JjL21vZGVsL0NvbmR1Y3Rvck5vdGUuanMiLCJzcmMvdXRpbHMvQXBwQ29udGV4dC5qcyIsInNyYy91dGlscy9BdWRpb1RpbWVyLmpzIiwic3JjL3V0aWxzL0F1ZGlvVXRpbC5qcyIsInNyYy91dGlscy9NdXNpY1V0aWwuanMiLCJzcmMvdXRpbHMvUmVhY3RVdGlsLmpzeCIsInNyYy91dGlscy9SZWNvbmNpbGVBcnJheS5qcyIsInNyYy92aWV3L0EuanN4Iiwic3JjL3ZpZXcvQWRkTGF5ZXIuanN4Iiwic3JjL3ZpZXcvQXBwLmpzeCIsInNyYy92aWV3L0Zyb250LmpzeCIsInNyYy92aWV3L0hlYWRlci5qc3giLCJzcmMvdmlldy9MYXllci5qc3giLCJzcmMvdmlldy9MYXllclNldHRpbmdzLmpzeCIsInNyYy92aWV3L1NlbGVjdENob3JkLmpzeCIsInNyYy92aWV3L1NvbmcuanN4Iiwic3JjL3ZpZXcvU29uZ0Nob3Jkcy5qc3giLCJzcmMvdmlldy9Tb25nTGF5ZXJzLmpzeCIsInNyYy92aWV3L1NvbmdTZXR0aW5ncy5qc3giLCJzcmMvdmlldy9UYXBIaWdobGlnaHQuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdHRCQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QyxDQUFDLE9BQUYsR0FBVSxJQUE3QztBQUNBLE1BQUEsQ0FBQyxDQUFDLFdBQUYsQ0FBYyxtQkFBZCxFQUFrQyxDQUFDLENBQUMsT0FBRixHQUFVLElBQTVDO0FBQ0EsS0FuQmtCOztBQUFBLGdFQXFCVCxVQUFDLENBQUQsRUFBSztBQUNkLFlBQUssUUFBTCxDQUFjO0FBQ2IsUUFBQSxhQUFhLEVBQUU7QUFERixPQUFkO0FBR0EsS0F6QmtCOztBQUdsQixVQUFLLEtBQUwsR0FBVztBQUNWLE1BQUEsYUFBYSxFQUFFO0FBREwsS0FBWDtBQUhrQjtBQU1sQjs7Ozt3Q0FxQm1CO0FBQ25CLE1BQUEsUUFBUSxDQUFDLGdCQUFULENBQTBCLGFBQTFCLEVBQXdDLEtBQUssYUFBN0M7QUFDQSxNQUFBLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixTQUExQixFQUFvQyxLQUFLLFNBQXpDO0FBQ0E7OzsyQ0FFc0I7QUFDdEIsTUFBQSxRQUFRLENBQUMsbUJBQVQsQ0FBNkIsYUFBN0IsRUFBMkMsS0FBSyxhQUFoRDtBQUNBLE1BQUEsUUFBUSxDQUFDLG1CQUFULENBQTZCLFNBQTdCLEVBQXVDLEtBQUssU0FBNUM7QUFDQTs7OzZCQUVRO0FBQ1IsYUFDQztBQUFLLGlCQUFNO0FBQVgsU0FDRSxtQkFBRyxLQUFLLEtBQUwsQ0FBVyxhQUFkLEVBQTRCO0FBQUEsZUFDNUI7QUFBSyxVQUFBLEdBQUcsRUFBQztBQUFULFVBRDRCO0FBQUEsT0FBNUIsQ0FERixDQUREO0FBT0E7Ozs7RUE5Q3dDLGlCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gVGhpcyBmaWxlIHJlcGxhY2VzIGBmb3JtYXQuanNgIGluIGJ1bmRsZXJzIGxpa2Ugd2VicGFjayBvciBSb2xsdXAsXG4vLyBhY2NvcmRpbmcgdG8gYGJyb3dzZXJgIGNvbmZpZyBpbiBgcGFja2FnZS5qc29uYC5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAocmFuZG9tLCBhbHBoYWJldCwgc2l6ZSkge1xuICAvLyBXZSBjYW7igJl0IHVzZSBieXRlcyBiaWdnZXIgdGhhbiB0aGUgYWxwaGFiZXQuIFRvIG1ha2UgYnl0ZXMgdmFsdWVzIGNsb3NlclxuICAvLyB0byB0aGUgYWxwaGFiZXQsIHdlIGFwcGx5IGJpdG1hc2sgb24gdGhlbS4gV2UgbG9vayBmb3IgdGhlIGNsb3Nlc3RcbiAgLy8gYDIgKiogeCAtIDFgIG51bWJlciwgd2hpY2ggd2lsbCBiZSBiaWdnZXIgdGhhbiBhbHBoYWJldCBzaXplLiBJZiB3ZSBoYXZlXG4gIC8vIDMwIHN5bWJvbHMgaW4gdGhlIGFscGhhYmV0LCB3ZSB3aWxsIHRha2UgMzEgKDAwMDExMTExKS5cbiAgLy8gV2UgZG8gbm90IHVzZSBmYXN0ZXIgTWF0aC5jbHozMiwgYmVjYXVzZSBpdCBpcyBub3QgYXZhaWxhYmxlIGluIGJyb3dzZXJzLlxuICB2YXIgbWFzayA9ICgyIDw8IE1hdGgubG9nKGFscGhhYmV0Lmxlbmd0aCAtIDEpIC8gTWF0aC5MTjIpIC0gMVxuICAvLyBCaXRtYXNrIGlzIG5vdCBhIHBlcmZlY3Qgc29sdXRpb24gKGluIG91ciBleGFtcGxlIGl0IHdpbGwgcGFzcyAzMSBieXRlcyxcbiAgLy8gd2hpY2ggaXMgYmlnZ2VyIHRoYW4gdGhlIGFscGhhYmV0KS4gQXMgYSByZXN1bHQsIHdlIHdpbGwgbmVlZCBtb3JlIGJ5dGVzLFxuICAvLyB0aGFuIElEIHNpemUsIGJlY2F1c2Ugd2Ugd2lsbCByZWZ1c2UgYnl0ZXMgYmlnZ2VyIHRoYW4gdGhlIGFscGhhYmV0LlxuXG4gIC8vIEV2ZXJ5IGhhcmR3YXJlIHJhbmRvbSBnZW5lcmF0b3IgY2FsbCBpcyBjb3N0bHksXG4gIC8vIGJlY2F1c2Ugd2UgbmVlZCB0byB3YWl0IGZvciBlbnRyb3B5IGNvbGxlY3Rpb24uIFRoaXMgaXMgd2h5IG9mdGVuIGl0IHdpbGxcbiAgLy8gYmUgZmFzdGVyIHRvIGFzayBmb3IgZmV3IGV4dHJhIGJ5dGVzIGluIGFkdmFuY2UsIHRvIGF2b2lkIGFkZGl0aW9uYWwgY2FsbHMuXG5cbiAgLy8gSGVyZSB3ZSBjYWxjdWxhdGUgaG93IG1hbnkgcmFuZG9tIGJ5dGVzIHNob3VsZCB3ZSBjYWxsIGluIGFkdmFuY2UuXG4gIC8vIEl0IGRlcGVuZHMgb24gSUQgbGVuZ3RoLCBtYXNrIC8gYWxwaGFiZXQgc2l6ZSBhbmQgbWFnaWMgbnVtYmVyIDEuNlxuICAvLyAod2hpY2ggd2FzIHNlbGVjdGVkIGFjY29yZGluZyBiZW5jaG1hcmtzKS5cblxuICAvLyAtfmYgPT4gTWF0aC5jZWlsKGYpIGlmIG4gaXMgZmxvYXQgbnVtYmVyXG4gIC8vIC1+aSA9PiBpICsgMSBpZiBuIGlzIGludGVnZXIgbnVtYmVyXG4gIHZhciBzdGVwID0gLX4oMS42ICogbWFzayAqIHNpemUgLyBhbHBoYWJldC5sZW5ndGgpXG4gIHZhciBpZCA9ICcnXG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICB2YXIgYnl0ZXMgPSByYW5kb20oc3RlcClcbiAgICAvLyBDb21wYWN0IGFsdGVybmF0aXZlIGZvciBgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGVwOyBpKyspYFxuICAgIHZhciBpID0gc3RlcFxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIC8vIElmIHJhbmRvbSBieXRlIGlzIGJpZ2dlciB0aGFuIGFscGhhYmV0IGV2ZW4gYWZ0ZXIgYml0bWFzayxcbiAgICAgIC8vIHdlIHJlZnVzZSBpdCBieSBgfHwgJydgLlxuICAgICAgaWQgKz0gYWxwaGFiZXRbYnl0ZXNbaV0gJiBtYXNrXSB8fCAnJ1xuICAgICAgLy8gTW9yZSBjb21wYWN0IHRoYW4gYGlkLmxlbmd0aCArIDEgPT09IHNpemVgXG4gICAgICBpZiAoaWQubGVuZ3RoID09PSArc2l6ZSkgcmV0dXJuIGlkXG4gICAgfVxuICB9XG59XG4iLCJ2YXIgbj1yZXF1aXJlKFwicHJlYWN0XCIpO3JlcXVpcmUoXCJwcmVhY3QvZGV2dG9vbHNcIik7dmFyIGU9e307ZnVuY3Rpb24gdChlKXtyZXR1cm4gZS50eXBlPT09bi5GcmFnbWVudD9cIkZyYWdtZW50XCI6XCJmdW5jdGlvblwiPT10eXBlb2YgZS50eXBlP2UudHlwZS5kaXNwbGF5TmFtZXx8ZS50eXBlLm5hbWU6XCJzdHJpbmdcIj09dHlwZW9mIGUudHlwZT9lLnR5cGU6XCIjdGV4dFwifXZhciBvPVtdLHI9W107ZnVuY3Rpb24gYSgpe3JldHVybiBvLmxlbmd0aD4wP29bby5sZW5ndGgtMV06bnVsbH12YXIgaT0hMTtmdW5jdGlvbiBzKGUpe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIGUudHlwZSYmZS50eXBlIT09bi5GcmFnbWVudH1mdW5jdGlvbiBjKG4pe2Zvcih2YXIgZT1bbl0sbz1uO251bGwhPW8uX19vOyllLnB1c2goby5fX28pLG89by5fX287cmV0dXJuIGUucmVkdWNlKGZ1bmN0aW9uKG4sZSl7bis9XCIgIGluIFwiK3QoZSk7dmFyIG89ZS5fX3NvdXJjZTtyZXR1cm4gbz9uKz1cIiAoYXQgXCIrby5maWxlTmFtZStcIjpcIitvLmxpbmVOdW1iZXIrXCIpXCI6aXx8KGk9ITAsY29uc29sZS53YXJuKFwiQWRkIEBiYWJlbC9wbHVnaW4tdHJhbnNmb3JtLXJlYWN0LWpzeC1zb3VyY2UgdG8gZ2V0IGEgbW9yZSBkZXRhaWxlZCBjb21wb25lbnQgc3RhY2suIE5vdGUgdGhhdCB5b3Ugc2hvdWxkIG5vdCBhZGQgaXQgdG8gcHJvZHVjdGlvbiBidWlsZHMgb2YgeW91ciBBcHAgZm9yIGJ1bmRsZSBzaXplIHJlYXNvbnMuXCIpKSxuK1wiXFxuXCJ9LFwiXCIpfXZhciBsPVwiZnVuY3Rpb25cIj09dHlwZW9mIFdlYWtNYXAsdT1uLkNvbXBvbmVudC5wcm90b3R5cGUuc2V0U3RhdGU7bi5Db21wb25lbnQucHJvdG90eXBlLnNldFN0YXRlPWZ1bmN0aW9uKG4sZSl7cmV0dXJuIG51bGw9PXRoaXMuX192P251bGw9PXRoaXMuc3RhdGUmJmNvbnNvbGUud2FybignQ2FsbGluZyBcInRoaXMuc2V0U3RhdGVcIiBpbnNpZGUgdGhlIGNvbnN0cnVjdG9yIG9mIGEgY29tcG9uZW50IGlzIGEgbm8tb3AgYW5kIG1pZ2h0IGJlIGEgYnVnIGluIHlvdXIgYXBwbGljYXRpb24uIEluc3RlYWQsIHNldCBcInRoaXMuc3RhdGUgPSB7fVwiIGRpcmVjdGx5LlxcblxcbicrYyhhKCkpKTpudWxsPT10aGlzLl9fUCYmY29uc29sZS53YXJuKCdDYW5cXCd0IGNhbGwgXCJ0aGlzLnNldFN0YXRlXCIgb24gYW4gdW5tb3VudGVkIGNvbXBvbmVudC4gVGhpcyBpcyBhIG5vLW9wLCBidXQgaXQgaW5kaWNhdGVzIGEgbWVtb3J5IGxlYWsgaW4geW91ciBhcHBsaWNhdGlvbi4gVG8gZml4LCBjYW5jZWwgYWxsIHN1YnNjcmlwdGlvbnMgYW5kIGFzeW5jaHJvbm91cyB0YXNrcyBpbiB0aGUgY29tcG9uZW50V2lsbFVubW91bnQgbWV0aG9kLlxcblxcbicrYyh0aGlzLl9fdikpLHUuY2FsbCh0aGlzLG4sZSl9O3ZhciBmPW4uQ29tcG9uZW50LnByb3RvdHlwZS5mb3JjZVVwZGF0ZTtmdW5jdGlvbiBwKG4pe3ZhciBlPW4ucHJvcHMsbz10KG4pLHI9XCJcIjtmb3IodmFyIGEgaW4gZSlpZihlLmhhc093blByb3BlcnR5KGEpJiZcImNoaWxkcmVuXCIhPT1hKXt2YXIgaT1lW2FdO1wiZnVuY3Rpb25cIj09dHlwZW9mIGkmJihpPVwiZnVuY3Rpb24gXCIrKGkuZGlzcGxheU5hbWV8fGkubmFtZSkrXCIoKSB7fVwiKSxpPU9iamVjdChpKSE9PWl8fGkudG9TdHJpbmc/aStcIlwiOk9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpKSxyKz1cIiBcIithK1wiPVwiK0pTT04uc3RyaW5naWZ5KGkpfXZhciBzPWUuY2hpbGRyZW47cmV0dXJuXCI8XCIrbytyKyhzJiZzLmxlbmd0aD9cIj4uLjwvXCIrbytcIj5cIjpcIiAvPlwiKX1uLkNvbXBvbmVudC5wcm90b3R5cGUuZm9yY2VVcGRhdGU9ZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PXRoaXMuX192P2NvbnNvbGUud2FybignQ2FsbGluZyBcInRoaXMuZm9yY2VVcGRhdGVcIiBpbnNpZGUgdGhlIGNvbnN0cnVjdG9yIG9mIGEgY29tcG9uZW50IGlzIGEgbm8tb3AgYW5kIG1pZ2h0IGJlIGEgYnVnIGluIHlvdXIgYXBwbGljYXRpb24uXFxuXFxuJytjKGEoKSkpOm51bGw9PXRoaXMuX19QJiZjb25zb2xlLndhcm4oJ0NhblxcJ3QgY2FsbCBcInRoaXMuZm9yY2VVcGRhdGVcIiBvbiBhbiB1bm1vdW50ZWQgY29tcG9uZW50LiBUaGlzIGlzIGEgbm8tb3AsIGJ1dCBpdCBpbmRpY2F0ZXMgYSBtZW1vcnkgbGVhayBpbiB5b3VyIGFwcGxpY2F0aW9uLiBUbyBmaXgsIGNhbmNlbCBhbGwgc3Vic2NyaXB0aW9ucyBhbmQgYXN5bmNocm9ub3VzIHRhc2tzIGluIHRoZSBjb21wb25lbnRXaWxsVW5tb3VudCBtZXRob2QuXFxuXFxuJytjKHRoaXMuX192KSksZi5jYWxsKHRoaXMsbil9LGZ1bmN0aW9uKCl7IWZ1bmN0aW9uKCl7dmFyIGU9bi5vcHRpb25zLl9fYix0PW4ub3B0aW9ucy5kaWZmZWQsYT1uLm9wdGlvbnMuX18saT1uLm9wdGlvbnMudm5vZGUsYz1uLm9wdGlvbnMuX19yO24ub3B0aW9ucy5kaWZmZWQ9ZnVuY3Rpb24obil7cyhuKSYmci5wb3AoKSxvLnBvcCgpLHQmJnQobil9LG4ub3B0aW9ucy5fX2I9ZnVuY3Rpb24obil7cyhuKSYmby5wdXNoKG4pLGUmJmUobil9LG4ub3B0aW9ucy5fXz1mdW5jdGlvbihuLGUpe3I9W10sYSYmYShuLGUpfSxuLm9wdGlvbnMudm5vZGU9ZnVuY3Rpb24obil7bi5fX289ci5sZW5ndGg+MD9yW3IubGVuZ3RoLTFdOm51bGwsaSYmaShuKX0sbi5vcHRpb25zLl9fcj1mdW5jdGlvbihuKXtzKG4pJiZyLnB1c2gobiksYyYmYyhuKX19KCk7dmFyIGE9bi5vcHRpb25zLl9fYixpPW4ub3B0aW9ucy5kaWZmZWQsdT1uLm9wdGlvbnMudm5vZGUsZj1uLm9wdGlvbnMuX19lLGQ9bi5vcHRpb25zLl9fLGg9bi5vcHRpb25zLl9faCx5PWw/e3VzZUVmZmVjdDpuZXcgV2Vha01hcCx1c2VMYXlvdXRFZmZlY3Q6bmV3IFdlYWtNYXAsbGF6eVByb3BUeXBlczpuZXcgV2Vha01hcH06bnVsbDtuLm9wdGlvbnMuX19lPWZ1bmN0aW9uKG4sZSxvKXtpZihlJiZlLl9fYyYmXCJmdW5jdGlvblwiPT10eXBlb2Ygbi50aGVuKXt2YXIgcj1uO249bmV3IEVycm9yKFwiTWlzc2luZyBTdXNwZW5zZS4gVGhlIHRocm93aW5nIGNvbXBvbmVudCB3YXM6IFwiK3QoZSkpO2Zvcih2YXIgYT1lO2E7YT1hLl9fKWlmKGEuX19jJiZhLl9fYy5fX2Mpe249cjticmVha31pZihuIGluc3RhbmNlb2YgRXJyb3IpdGhyb3cgbn1mKG4sZSxvKX0sbi5vcHRpb25zLl9fPWZ1bmN0aW9uKG4sZSl7aWYoIWUpdGhyb3cgbmV3IEVycm9yKFwiVW5kZWZpbmVkIHBhcmVudCBwYXNzZWQgdG8gcmVuZGVyKCksIHRoaXMgaXMgdGhlIHNlY29uZCBhcmd1bWVudC5cXG5DaGVjayBpZiB0aGUgZWxlbWVudCBpcyBhdmFpbGFibGUgaW4gdGhlIERPTS9oYXMgdGhlIGNvcnJlY3QgaWQuXCIpO3ZhciBvO3N3aXRjaChlLm5vZGVUeXBlKXtjYXNlIDE6Y2FzZSAxMTpjYXNlIDk6bz0hMDticmVhaztkZWZhdWx0Om89ITF9aWYoIW8pe3ZhciByPXQobik7dGhyb3cgbmV3IEVycm9yKFwiRXhwZWN0ZWQgYSB2YWxpZCBIVE1MIG5vZGUgYXMgYSBzZWNvbmQgYXJndW1lbnQgdG8gcmVuZGVyLlxcdFJlY2VpdmVkIFwiK2UrXCIgaW5zdGVhZDogcmVuZGVyKDxcIityK1wiIC8+LCBcIitlK1wiKTtcIil9ZCYmZChuLGUpfSxuLm9wdGlvbnMuX19iPWZ1bmN0aW9uKG4pe3ZhciBvLHIsaSxzLGw9bi50eXBlLHU9ZnVuY3Rpb24gbihlKXtyZXR1cm4gZT9cImZ1bmN0aW9uXCI9PXR5cGVvZiBlLnR5cGU/bihlLl9fKTplOnt9fShuLl9fKTtpZih2b2lkIDA9PT1sKXRocm93IG5ldyBFcnJvcihcIlVuZGVmaW5lZCBjb21wb25lbnQgcGFzc2VkIHRvIGNyZWF0ZUVsZW1lbnQoKVxcblxcbllvdSBsaWtlbHkgZm9yZ290IHRvIGV4cG9ydCB5b3VyIGNvbXBvbmVudCBvciBtaWdodCBoYXZlIG1peGVkIHVwIGRlZmF1bHQgYW5kIG5hbWVkIGltcG9ydHNcIitwKG4pK1wiXFxuXFxuXCIrYyhuKSk7aWYobnVsbCE9bCYmXCJvYmplY3RcIj09dHlwZW9mIGwpe2lmKHZvaWQgMCE9PWwuX19rJiZ2b2lkIDAhPT1sLl9fZSl0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHR5cGUgcGFzc2VkIHRvIGNyZWF0ZUVsZW1lbnQoKTogXCIrbCtcIlxcblxcbkRpZCB5b3UgYWNjaWRlbnRhbGx5IHBhc3MgYSBKU1ggbGl0ZXJhbCBhcyBKU1ggdHdpY2U/XFxuXFxuICBsZXQgTXlcIit0KG4pK1wiID0gXCIrcChsKStcIjtcXG4gIGxldCB2bm9kZSA9IDxNeVwiK3QobikrXCIgLz47XFxuXFxuVGhpcyB1c3VhbGx5IGhhcHBlbnMgd2hlbiB5b3UgZXhwb3J0IGEgSlNYIGxpdGVyYWwgYW5kIG5vdCB0aGUgY29tcG9uZW50LlxcblxcblwiK2MobikpO3Rocm93IG5ldyBFcnJvcihcIkludmFsaWQgdHlwZSBwYXNzZWQgdG8gY3JlYXRlRWxlbWVudCgpOiBcIisoQXJyYXkuaXNBcnJheShsKT9cImFycmF5XCI6bCkpfWlmKFwidGhlYWRcIiE9PWwmJlwidGZvb3RcIiE9PWwmJlwidGJvZHlcIiE9PWx8fFwidGFibGVcIj09PXUudHlwZT9cInRyXCI9PT1sJiZcInRoZWFkXCIhPT11LnR5cGUmJlwidGZvb3RcIiE9PXUudHlwZSYmXCJ0Ym9keVwiIT09dS50eXBlJiZcInRhYmxlXCIhPT11LnR5cGU/Y29uc29sZS5lcnJvcihcIkltcHJvcGVyIG5lc3Rpbmcgb2YgdGFibGUuIFlvdXIgPHRyPiBzaG91bGQgaGF2ZSBhIDx0aGVhZC90Ym9keS90Zm9vdC90YWJsZT4gcGFyZW50LlwiK3AobikrXCJcXG5cXG5cIitjKG4pKTpcInRkXCI9PT1sJiZcInRyXCIhPT11LnR5cGU/Y29uc29sZS5lcnJvcihcIkltcHJvcGVyIG5lc3Rpbmcgb2YgdGFibGUuIFlvdXIgPHRkPiBzaG91bGQgaGF2ZSBhIDx0cj4gcGFyZW50LlwiK3AobikrXCJcXG5cXG5cIitjKG4pKTpcInRoXCI9PT1sJiZcInRyXCIhPT11LnR5cGUmJmNvbnNvbGUuZXJyb3IoXCJJbXByb3BlciBuZXN0aW5nIG9mIHRhYmxlLiBZb3VyIDx0aD4gc2hvdWxkIGhhdmUgYSA8dHI+LlwiK3AobikrXCJcXG5cXG5cIitjKG4pKTpjb25zb2xlLmVycm9yKFwiSW1wcm9wZXIgbmVzdGluZyBvZiB0YWJsZS4gWW91ciA8dGhlYWQvdGJvZHkvdGZvb3Q+IHNob3VsZCBoYXZlIGEgPHRhYmxlPiBwYXJlbnQuXCIrcChuKStcIlxcblxcblwiK2MobikpLHZvaWQgMCE9PW4ucmVmJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiBuLnJlZiYmXCJvYmplY3RcIiE9dHlwZW9mIG4ucmVmJiYhKFwiJCR0eXBlb2ZcImluIG4pKXRocm93IG5ldyBFcnJvcignQ29tcG9uZW50XFwncyBcInJlZlwiIHByb3BlcnR5IHNob3VsZCBiZSBhIGZ1bmN0aW9uLCBvciBhbiBvYmplY3QgY3JlYXRlZCBieSBjcmVhdGVSZWYoKSwgYnV0IGdvdCBbJyt0eXBlb2Ygbi5yZWYrXCJdIGluc3RlYWRcXG5cIitwKG4pK1wiXFxuXFxuXCIrYyhuKSk7aWYoXCJzdHJpbmdcIj09dHlwZW9mIG4udHlwZSlmb3IodmFyIGYgaW4gbi5wcm9wcylpZihcIm9cIj09PWZbMF0mJlwiblwiPT09ZlsxXSYmXCJmdW5jdGlvblwiIT10eXBlb2Ygbi5wcm9wc1tmXSYmbnVsbCE9bi5wcm9wc1tmXSl0aHJvdyBuZXcgRXJyb3IoXCJDb21wb25lbnQncyBcXFwiXCIrZisnXCIgcHJvcGVydHkgc2hvdWxkIGJlIGEgZnVuY3Rpb24sIGJ1dCBnb3QgWycrdHlwZW9mIG4ucHJvcHNbZl0rXCJdIGluc3RlYWRcXG5cIitwKG4pK1wiXFxuXFxuXCIrYyhuKSk7aWYoXCJmdW5jdGlvblwiPT10eXBlb2Ygbi50eXBlJiZuLnR5cGUucHJvcFR5cGVzKXtpZihcIkxhenlcIj09PW4udHlwZS5kaXNwbGF5TmFtZSYmeSYmIXkubGF6eVByb3BUeXBlcy5oYXMobi50eXBlKSl7dmFyIGQ9XCJQcm9wVHlwZXMgYXJlIG5vdCBzdXBwb3J0ZWQgb24gbGF6eSgpLiBVc2UgcHJvcFR5cGVzIG9uIHRoZSB3cmFwcGVkIGNvbXBvbmVudCBpdHNlbGYuIFwiO3RyeXt2YXIgaD1uLnR5cGUoKTt5LmxhenlQcm9wVHlwZXMuc2V0KG4udHlwZSwhMCksY29uc29sZS53YXJuKGQrXCJDb21wb25lbnQgd3JhcHBlZCBpbiBsYXp5KCkgaXMgXCIrdChoKSl9Y2F0Y2gobil7Y29uc29sZS53YXJuKGQrXCJXZSB3aWxsIGxvZyB0aGUgd3JhcHBlZCBjb21wb25lbnQncyBuYW1lIG9uY2UgaXQgaXMgbG9hZGVkLlwiKX19bz1uLnR5cGUucHJvcFR5cGVzLHI9bi5wcm9wcyxpPXQobikscz1wKG4pLE9iamVjdC5rZXlzKG8pLmZvckVhY2goZnVuY3Rpb24obil7dmFyIHQ7dHJ5e3Q9b1tuXShyLG4scyxpLG51bGwsXCJTRUNSRVRfRE9fTk9UX1BBU1NfVEhJU19PUl9ZT1VfV0lMTF9CRV9GSVJFRFwiKX1jYXRjaChuKXt0PW59IXR8fHQubWVzc2FnZSBpbiBlfHwoZVt0Lm1lc3NhZ2VdPSEwLGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgXCIraStcIiB0eXBlOiBcIit0Lm1lc3NhZ2UpKX0pfWEmJmEobil9LG4ub3B0aW9ucy5fX2g9ZnVuY3Rpb24obil7aWYoIW4pdGhyb3cgbmV3IEVycm9yKFwiSG9vayBjYW4gb25seSBiZSBpbnZva2VkIGZyb20gcmVuZGVyIG1ldGhvZHMuXCIpO2gmJmgobil9O3ZhciB2PWZ1bmN0aW9uKG4sZSl7cmV0dXJue2dldDpmdW5jdGlvbigpe3Rocm93IG5ldyBFcnJvcihcImdldHRpbmcgdm5vZGUuXCIrbitcIiBpcyBkZXByZWNhdGVkLCBcIitlKX0sc2V0OmZ1bmN0aW9uKCl7dGhyb3cgbmV3IEVycm9yKFwic2V0dGluZyB2bm9kZS5cIituK1wiIGlzIG5vdCBhbGxvd2VkLCBcIitlKX19fSxtPXtub2RlTmFtZTp2KFwibm9kZU5hbWVcIixcInVzZSB2bm9kZS50eXBlXCIpLGF0dHJpYnV0ZXM6dihcImF0dHJpYnV0ZXNcIixcInVzZSB2bm9kZS5wcm9wc1wiKSxjaGlsZHJlbjp2KFwiY2hpbGRyZW5cIixcInVzZSB2bm9kZS5wcm9wcy5jaGlsZHJlblwiKX0sYj1PYmplY3QuY3JlYXRlKHt9LG0pO24ub3B0aW9ucy52bm9kZT1mdW5jdGlvbihuKXt2YXIgZT1uLnByb3BzO2lmKG51bGwhPT1uLnR5cGUmJm51bGwhPWUmJihcIl9fc291cmNlXCJpbiBlfHxcIl9fc2VsZlwiaW4gZSkpe3ZhciB0PW4ucHJvcHM9e307Zm9yKHZhciBvIGluIGUpe3ZhciByPWVbb107XCJfX3NvdXJjZVwiPT09bz9uLl9fc291cmNlPXI6XCJfX3NlbGZcIj09PW8/bi5fX3NlbGY9cjp0W29dPXJ9fU9iamVjdC5zZXRQcm90b3R5cGVPZihuLGIpLHUmJnUobil9LG4ub3B0aW9ucy5kaWZmZWQ9ZnVuY3Rpb24obil7bi5fX2smJm4uX19rLmZvckVhY2goZnVuY3Rpb24obil7aWYobiYmdm9pZCAwPT09bi50eXBlKXtkZWxldGUgbi5fXyxkZWxldGUgbi5fX2I7dmFyIGU9T2JqZWN0LmtleXMobikuam9pbihcIixcIik7dGhyb3cgbmV3IEVycm9yKFwiT2JqZWN0cyBhcmUgbm90IHZhbGlkIGFzIGEgY2hpbGQuIEVuY291bnRlcmVkIGFuIG9iamVjdCB3aXRoIHRoZSBrZXlzIHtcIitlK1wifS5cIil9fSk7dmFyIGU9bi5fX2M7aWYoZSYmZS5fX0gpe3ZhciBvPWUuX19IO0FycmF5LmlzQXJyYXkoby5fXykmJm8uX18uZm9yRWFjaChmdW5jdGlvbihlKXtpZihlLl9faCYmKCFlLl9fSHx8IUFycmF5LmlzQXJyYXkoZS5fX0gpKSl7dmFyIG89dChuKTtjb25zb2xlLndhcm4oXCJJbiBcIitvK1wiIHlvdSBhcmUgY2FsbGluZyB1c2VNZW1vL3VzZUNhbGxiYWNrIHdpdGhvdXQgcGFzc2luZyBhcmd1bWVudHMuXFxuVGhpcyBpcyBhIG5vb3Agc2luY2UgaXQgd2lsbCBub3QgYmUgYWJsZSB0byBtZW1vaXplLCBpdCB3aWxsIGV4ZWN1dGUgaXQgZXZlcnkgcmVuZGVyLlxcblxcblwiK2MobikpfX0pfWlmKGkmJmkobiksbnVsbCE9bi5fX2spZm9yKHZhciByPVtdLGE9MDthPG4uX19rLmxlbmd0aDthKyspe3ZhciBzPW4uX19rW2FdO2lmKHMmJm51bGwhPXMua2V5KXt2YXIgbD1zLmtleTtpZigtMSE9PXIuaW5kZXhPZihsKSl7Y29uc29sZS5lcnJvcignRm9sbG93aW5nIGNvbXBvbmVudCBoYXMgdHdvIG9yIG1vcmUgY2hpbGRyZW4gd2l0aCB0aGUgc2FtZSBrZXkgYXR0cmlidXRlOiBcIicrbCsnXCIuIFRoaXMgbWF5IGNhdXNlIGdsaXRjaGVzIGFuZCBtaXNiZWhhdmlvciBpbiByZW5kZXJpbmcgcHJvY2Vzcy4gQ29tcG9uZW50OiBcXG5cXG4nK3AobikrXCJcXG5cXG5cIitjKG4pKTticmVha31yLnB1c2gobCl9fX19KCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZWJ1Zy5qcy5tYXBcbiIsInZhciBlPXJlcXVpcmUoXCJwcmVhY3RcIik7XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmd2luZG93Ll9fUFJFQUNUX0RFVlRPT0xTX18mJndpbmRvdy5fX1BSRUFDVF9ERVZUT09MU19fLmF0dGFjaFByZWFjdChcIjEwLjAuNVwiLGUub3B0aW9ucyx7RnJhZ21lbnQ6ZS5GcmFnbWVudH0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGV2dG9vbHMuanMubWFwXG4iLCJ2YXIgbixsLHUsdCxpLG8scixmPXt9LGU9W10sYz0vYWNpdHxleCg/OnN8Z3xufHB8JCl8cnBofGdyaWR8b3dzfG1uY3xudHd8aW5lW2NoXXx6b298Xm9yZC9pO2Z1bmN0aW9uIHMobixsKXtmb3IodmFyIHUgaW4gbCluW3VdPWxbdV07cmV0dXJuIG59ZnVuY3Rpb24gYShuKXt2YXIgbD1uLnBhcmVudE5vZGU7bCYmbC5yZW1vdmVDaGlsZChuKX1mdW5jdGlvbiBwKG4sbCx1KXt2YXIgdCxpPWFyZ3VtZW50cyxvPXt9O2Zvcih0IGluIGwpXCJrZXlcIiE9PXQmJlwicmVmXCIhPT10JiYob1t0XT1sW3RdKTtpZihhcmd1bWVudHMubGVuZ3RoPjMpZm9yKHU9W3VdLHQ9Mzt0PGFyZ3VtZW50cy5sZW5ndGg7dCsrKXUucHVzaChpW3RdKTtpZihudWxsIT11JiYoby5jaGlsZHJlbj11KSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBuJiZudWxsIT1uLmRlZmF1bHRQcm9wcylmb3IodCBpbiBuLmRlZmF1bHRQcm9wcyl2b2lkIDA9PT1vW3RdJiYob1t0XT1uLmRlZmF1bHRQcm9wc1t0XSk7cmV0dXJuIHYobixvLGwmJmwua2V5LGwmJmwucmVmKX1mdW5jdGlvbiB2KGwsdSx0LGkpe3ZhciBvPXt0eXBlOmwscHJvcHM6dSxrZXk6dCxyZWY6aSxfX2s6bnVsbCxfXzpudWxsLF9fYjowLF9fZTpudWxsLF9fZDp2b2lkIDAsX19jOm51bGwsY29uc3RydWN0b3I6dm9pZCAwfTtyZXR1cm4gbi52bm9kZSYmbi52bm9kZShvKSxvfWZ1bmN0aW9uIGgobil7cmV0dXJuIG4uY2hpbGRyZW59ZnVuY3Rpb24gZChuLGwpe3RoaXMucHJvcHM9bix0aGlzLmNvbnRleHQ9bH1mdW5jdGlvbiB5KG4sbCl7aWYobnVsbD09bClyZXR1cm4gbi5fXz95KG4uX18sbi5fXy5fX2suaW5kZXhPZihuKSsxKTpudWxsO2Zvcih2YXIgdTtsPG4uX19rLmxlbmd0aDtsKyspaWYobnVsbCE9KHU9bi5fX2tbbF0pJiZudWxsIT11Ll9fZSlyZXR1cm4gdS5fX2U7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2Ygbi50eXBlP3kobik6bnVsbH1mdW5jdGlvbiB4KG4pe3ZhciBsLHU7aWYobnVsbCE9KG49bi5fXykmJm51bGwhPW4uX19jKXtmb3Iobi5fX2U9bi5fX2MuYmFzZT1udWxsLGw9MDtsPG4uX19rLmxlbmd0aDtsKyspaWYobnVsbCE9KHU9bi5fX2tbbF0pJiZudWxsIT11Ll9fZSl7bi5fX2U9bi5fX2MuYmFzZT11Ll9fZTticmVha31yZXR1cm4geChuKX19ZnVuY3Rpb24gbShsKXsoIWwuX19kJiYobC5fX2Q9ITApJiYxPT09dS5wdXNoKGwpfHxpIT09bi5kZWJvdW5jZVJlbmRlcmluZykmJigoaT1uLmRlYm91bmNlUmVuZGVyaW5nKXx8dCkodyl9ZnVuY3Rpb24gdygpe3ZhciBuLGwsdCxpLG8scixmO2Zvcih1LnNvcnQoZnVuY3Rpb24obixsKXtyZXR1cm4gbC5fX3YuX19iLW4uX192Ll9fYn0pO249dS5wb3AoKTspbi5fX2QmJih0PXZvaWQgMCxpPXZvaWQgMCxyPShvPShsPW4pLl9fdikuX19lLChmPWwuX19QKSYmKHQ9W10saT1OKGYsbyxzKHt9LG8pLGwuX19uLHZvaWQgMCE9PWYub3duZXJTVkdFbGVtZW50LG51bGwsdCxudWxsPT1yP3kobyk6cikseih0LG8pLGkhPXImJngobykpKX1mdW5jdGlvbiBnKG4sbCx1LHQsaSxvLHIsYyxzKXt2YXIgcCx2LGgsZCx4LG0sdyxnPXUmJnUuX19rfHxlLF89Zy5sZW5ndGg7aWYoYz09ZiYmKGM9bnVsbCE9bz9vWzBdOl8/eSh1LDApOm51bGwpLHA9MCxsLl9faz1rKGwuX19rLGZ1bmN0aW9uKHUpe2lmKG51bGwhPXUpe2lmKHUuX189bCx1Ll9fYj1sLl9fYisxLG51bGw9PT0oaD1nW3BdKXx8aCYmdS5rZXk9PWgua2V5JiZ1LnR5cGU9PT1oLnR5cGUpZ1twXT12b2lkIDA7ZWxzZSBmb3Iodj0wO3Y8Xzt2Kyspe2lmKChoPWdbdl0pJiZ1LmtleT09aC5rZXkmJnUudHlwZT09PWgudHlwZSl7Z1t2XT12b2lkIDA7YnJlYWt9aD1udWxsfWlmKGQ9TihuLHUsaD1ofHxmLHQsaSxvLHIsYyxzKSwodj11LnJlZikmJmgucmVmIT12JiYod3x8KHc9W10pLGgucmVmJiZ3LnB1c2goaC5yZWYsbnVsbCx1KSx3LnB1c2godix1Ll9fY3x8ZCx1KSksbnVsbCE9ZCl7dmFyIGU7aWYobnVsbD09bSYmKG09ZCksdm9pZCAwIT09dS5fX2QpZT11Ll9fZCx1Ll9fZD12b2lkIDA7ZWxzZSBpZihvPT1ofHxkIT1jfHxudWxsPT1kLnBhcmVudE5vZGUpe246aWYobnVsbD09Y3x8Yy5wYXJlbnROb2RlIT09biluLmFwcGVuZENoaWxkKGQpLGU9bnVsbDtlbHNle2Zvcih4PWMsdj0wOyh4PXgubmV4dFNpYmxpbmcpJiZ2PF87dis9MilpZih4PT1kKWJyZWFrIG47bi5pbnNlcnRCZWZvcmUoZCxjKSxlPWN9XCJvcHRpb25cIj09bC50eXBlJiYobi52YWx1ZT1cIlwiKX1jPXZvaWQgMCE9PWU/ZTpkLm5leHRTaWJsaW5nLFwiZnVuY3Rpb25cIj09dHlwZW9mIGwudHlwZSYmKGwuX19kPWMpfWVsc2UgYyYmaC5fX2U9PWMmJmMucGFyZW50Tm9kZSE9biYmKGM9eShoKSl9cmV0dXJuIHArKyx1fSksbC5fX2U9bSxudWxsIT1vJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiBsLnR5cGUpZm9yKHA9by5sZW5ndGg7cC0tOyludWxsIT1vW3BdJiZhKG9bcF0pO2ZvcihwPV87cC0tOyludWxsIT1nW3BdJiYkKGdbcF0sZ1twXSk7aWYodylmb3IocD0wO3A8dy5sZW5ndGg7cCsrKVQod1twXSx3WysrcF0sd1srK3BdKX1mdW5jdGlvbiBrKG4sbCx1KXtpZihudWxsPT11JiYodT1bXSksbnVsbD09bnx8XCJib29sZWFuXCI9PXR5cGVvZiBuKWwmJnUucHVzaChsKG51bGwpKTtlbHNlIGlmKEFycmF5LmlzQXJyYXkobikpZm9yKHZhciB0PTA7dDxuLmxlbmd0aDt0KyspayhuW3RdLGwsdSk7ZWxzZSB1LnB1c2gobD9sKFwic3RyaW5nXCI9PXR5cGVvZiBufHxcIm51bWJlclwiPT10eXBlb2Ygbj92KG51bGwsbixudWxsLG51bGwpOm51bGwhPW4uX19lfHxudWxsIT1uLl9fYz92KG4udHlwZSxuLnByb3BzLG4ua2V5LG51bGwpOm4pOm4pO3JldHVybiB1fWZ1bmN0aW9uIF8obixsLHUsdCxpKXt2YXIgbztmb3IobyBpbiB1KW8gaW4gbHx8UChuLG8sbnVsbCx1W29dLHQpO2ZvcihvIGluIGwpaSYmXCJmdW5jdGlvblwiIT10eXBlb2YgbFtvXXx8XCJ2YWx1ZVwiPT09b3x8XCJjaGVja2VkXCI9PT1vfHx1W29dPT09bFtvXXx8UChuLG8sbFtvXSx1W29dLHQpfWZ1bmN0aW9uIGIobixsLHUpe1wiLVwiPT09bFswXT9uLnNldFByb3BlcnR5KGwsdSk6bltsXT1cIm51bWJlclwiPT10eXBlb2YgdSYmITE9PT1jLnRlc3QobCk/dStcInB4XCI6bnVsbD09dT9cIlwiOnV9ZnVuY3Rpb24gUChuLGwsdSx0LGkpe3ZhciBvLHIsZixlLGM7aWYoaT9cImNsYXNzTmFtZVwiPT09bCYmKGw9XCJjbGFzc1wiKTpcImNsYXNzXCI9PT1sJiYobD1cImNsYXNzTmFtZVwiKSxcImtleVwiPT09bHx8XCJjaGlsZHJlblwiPT09bCk7ZWxzZSBpZihcInN0eWxlXCI9PT1sKWlmKG89bi5zdHlsZSxcInN0cmluZ1wiPT10eXBlb2YgdSlvLmNzc1RleHQ9dTtlbHNle2lmKFwic3RyaW5nXCI9PXR5cGVvZiB0JiYoby5jc3NUZXh0PVwiXCIsdD1udWxsKSx0KWZvcihyIGluIHQpdSYmciBpbiB1fHxiKG8scixcIlwiKTtpZih1KWZvcihmIGluIHUpdCYmdVtmXT09PXRbZl18fGIobyxmLHVbZl0pfWVsc2VcIm9cIj09PWxbMF0mJlwiblwiPT09bFsxXT8oZT1sIT09KGw9bC5yZXBsYWNlKC9DYXB0dXJlJC8sXCJcIikpLGM9bC50b0xvd2VyQ2FzZSgpLGw9KGMgaW4gbj9jOmwpLnNsaWNlKDIpLHU/KHR8fG4uYWRkRXZlbnRMaXN0ZW5lcihsLEMsZSksKG4ubHx8KG4ubD17fSkpW2xdPXUpOm4ucmVtb3ZlRXZlbnRMaXN0ZW5lcihsLEMsZSkpOlwibGlzdFwiIT09bCYmXCJ0YWdOYW1lXCIhPT1sJiZcImZvcm1cIiE9PWwmJlwidHlwZVwiIT09bCYmXCJzaXplXCIhPT1sJiYhaSYmbCBpbiBuP25bbF09bnVsbD09dT9cIlwiOnU6XCJmdW5jdGlvblwiIT10eXBlb2YgdSYmXCJkYW5nZXJvdXNseVNldElubmVySFRNTFwiIT09bCYmKGwhPT0obD1sLnJlcGxhY2UoL154bGluazo/LyxcIlwiKSk/bnVsbD09dXx8ITE9PT11P24ucmVtb3ZlQXR0cmlidXRlTlMoXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIsbC50b0xvd2VyQ2FzZSgpKTpuLnNldEF0dHJpYnV0ZU5TKFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiLGwudG9Mb3dlckNhc2UoKSx1KTpudWxsPT11fHwhMT09PXUmJiEvXmFyLy50ZXN0KGwpP24ucmVtb3ZlQXR0cmlidXRlKGwpOm4uc2V0QXR0cmlidXRlKGwsdSkpfWZ1bmN0aW9uIEMobCl7dGhpcy5sW2wudHlwZV0obi5ldmVudD9uLmV2ZW50KGwpOmwpfWZ1bmN0aW9uIE4obCx1LHQsaSxvLHIsZixlLGMpe3ZhciBhLHAsdix5LHgsbSx3LGssXyxiLFA9dS50eXBlO2lmKHZvaWQgMCE9PXUuY29uc3RydWN0b3IpcmV0dXJuIG51bGw7KGE9bi5fX2IpJiZhKHUpO3RyeXtuOmlmKFwiZnVuY3Rpb25cIj09dHlwZW9mIFApe2lmKGs9dS5wcm9wcyxfPShhPVAuY29udGV4dFR5cGUpJiZpW2EuX19jXSxiPWE/Xz9fLnByb3BzLnZhbHVlOmEuX186aSx0Ll9fYz93PShwPXUuX19jPXQuX19jKS5fXz1wLl9fRTooXCJwcm90b3R5cGVcImluIFAmJlAucHJvdG90eXBlLnJlbmRlcj91Ll9fYz1wPW5ldyBQKGssYik6KHUuX19jPXA9bmV3IGQoayxiKSxwLmNvbnN0cnVjdG9yPVAscC5yZW5kZXI9aiksXyYmXy5zdWIocCkscC5wcm9wcz1rLHAuc3RhdGV8fChwLnN0YXRlPXt9KSxwLmNvbnRleHQ9YixwLl9fbj1pLHY9cC5fX2Q9ITAscC5fX2g9W10pLG51bGw9PXAuX19zJiYocC5fX3M9cC5zdGF0ZSksbnVsbCE9UC5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMmJihwLl9fcz09cC5zdGF0ZSYmKHAuX19zPXMoe30scC5fX3MpKSxzKHAuX19zLFAuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzKGsscC5fX3MpKSkseT1wLnByb3BzLHg9cC5zdGF0ZSx2KW51bGw9PVAuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzJiZudWxsIT1wLmNvbXBvbmVudFdpbGxNb3VudCYmcC5jb21wb25lbnRXaWxsTW91bnQoKSxudWxsIT1wLmNvbXBvbmVudERpZE1vdW50JiZwLl9faC5wdXNoKHAuY29tcG9uZW50RGlkTW91bnQpO2Vsc2V7aWYobnVsbD09UC5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMmJmshPT15JiZudWxsIT1wLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMmJnAuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhrLGIpLCFwLl9fZSYmbnVsbCE9cC5zaG91bGRDb21wb25lbnRVcGRhdGUmJiExPT09cC5zaG91bGRDb21wb25lbnRVcGRhdGUoayxwLl9fcyxiKSl7Zm9yKHAucHJvcHM9ayxwLnN0YXRlPXAuX19zLHAuX19kPSExLHAuX192PXUsdS5fX2U9dC5fX2UsdS5fX2s9dC5fX2sscC5fX2gubGVuZ3RoJiZmLnB1c2gocCksYT0wO2E8dS5fX2subGVuZ3RoO2ErKyl1Ll9fa1thXSYmKHUuX19rW2FdLl9fPXUpO2JyZWFrIG59bnVsbCE9cC5jb21wb25lbnRXaWxsVXBkYXRlJiZwLmNvbXBvbmVudFdpbGxVcGRhdGUoayxwLl9fcyxiKSxudWxsIT1wLmNvbXBvbmVudERpZFVwZGF0ZSYmcC5fX2gucHVzaChmdW5jdGlvbigpe3AuY29tcG9uZW50RGlkVXBkYXRlKHkseCxtKX0pfXAuY29udGV4dD1iLHAucHJvcHM9ayxwLnN0YXRlPXAuX19zLChhPW4uX19yKSYmYSh1KSxwLl9fZD0hMSxwLl9fdj11LHAuX19QPWwsYT1wLnJlbmRlcihwLnByb3BzLHAuc3RhdGUscC5jb250ZXh0KSx1Ll9faz1udWxsIT1hJiZhLnR5cGU9PWgmJm51bGw9PWEua2V5P2EucHJvcHMuY2hpbGRyZW46QXJyYXkuaXNBcnJheShhKT9hOlthXSxudWxsIT1wLmdldENoaWxkQ29udGV4dCYmKGk9cyhzKHt9LGkpLHAuZ2V0Q2hpbGRDb250ZXh0KCkpKSx2fHxudWxsPT1wLmdldFNuYXBzaG90QmVmb3JlVXBkYXRlfHwobT1wLmdldFNuYXBzaG90QmVmb3JlVXBkYXRlKHkseCkpLGcobCx1LHQsaSxvLHIsZixlLGMpLHAuYmFzZT11Ll9fZSxwLl9faC5sZW5ndGgmJmYucHVzaChwKSx3JiYocC5fX0U9cC5fXz1udWxsKSxwLl9fZT0hMX1lbHNlIHUuX19lPUEodC5fX2UsdSx0LGksbyxyLGYsYyk7KGE9bi5kaWZmZWQpJiZhKHUpfWNhdGNoKGwpe24uX19lKGwsdSx0KX1yZXR1cm4gdS5fX2V9ZnVuY3Rpb24geihsLHUpe24uX19jJiZuLl9fYyh1LGwpLGwuc29tZShmdW5jdGlvbih1KXt0cnl7bD11Ll9faCx1Ll9faD1bXSxsLnNvbWUoZnVuY3Rpb24obil7bi5jYWxsKHUpfSl9Y2F0Y2gobCl7bi5fX2UobCx1Ll9fdil9fSl9ZnVuY3Rpb24gQShuLGwsdSx0LGksbyxyLGMpe3ZhciBzLGEscCx2LGgsZD11LnByb3BzLHk9bC5wcm9wcztpZihpPVwic3ZnXCI9PT1sLnR5cGV8fGksbnVsbCE9bylmb3Iocz0wO3M8by5sZW5ndGg7cysrKWlmKG51bGwhPShhPW9bc10pJiYoKG51bGw9PT1sLnR5cGU/Mz09PWEubm9kZVR5cGU6YS5sb2NhbE5hbWU9PT1sLnR5cGUpfHxuPT1hKSl7bj1hLG9bc109bnVsbDticmVha31pZihudWxsPT1uKXtpZihudWxsPT09bC50eXBlKXJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh5KTtuPWk/ZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixsLnR5cGUpOmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobC50eXBlLHkuaXMmJntpczp5LmlzfSksbz1udWxsfWlmKG51bGw9PT1sLnR5cGUpZCE9PXkmJm4uZGF0YSE9eSYmKG4uZGF0YT15KTtlbHNlIGlmKGwhPT11KXtpZihudWxsIT1vJiYobz1lLnNsaWNlLmNhbGwobi5jaGlsZE5vZGVzKSkscD0oZD11LnByb3BzfHxmKS5kYW5nZXJvdXNseVNldElubmVySFRNTCx2PXkuZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwsIWMpe2lmKGQ9PT1mKWZvcihkPXt9LGg9MDtoPG4uYXR0cmlidXRlcy5sZW5ndGg7aCsrKWRbbi5hdHRyaWJ1dGVzW2hdLm5hbWVdPW4uYXR0cmlidXRlc1toXS52YWx1ZTsodnx8cCkmJih2JiZwJiZ2Ll9faHRtbD09cC5fX2h0bWx8fChuLmlubmVySFRNTD12JiZ2Ll9faHRtbHx8XCJcIikpfV8obix5LGQsaSxjKSxsLl9faz1sLnByb3BzLmNoaWxkcmVuLHZ8fGcobixsLHUsdCxcImZvcmVpZ25PYmplY3RcIiE9PWwudHlwZSYmaSxvLHIsZixjKSxjfHwoXCJ2YWx1ZVwiaW4geSYmdm9pZCAwIT09eS52YWx1ZSYmeS52YWx1ZSE9PW4udmFsdWUmJihuLnZhbHVlPW51bGw9PXkudmFsdWU/XCJcIjp5LnZhbHVlKSxcImNoZWNrZWRcImluIHkmJnZvaWQgMCE9PXkuY2hlY2tlZCYmeS5jaGVja2VkIT09bi5jaGVja2VkJiYobi5jaGVja2VkPXkuY2hlY2tlZCkpfXJldHVybiBufWZ1bmN0aW9uIFQobCx1LHQpe3RyeXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBsP2wodSk6bC5jdXJyZW50PXV9Y2F0Y2gobCl7bi5fX2UobCx0KX19ZnVuY3Rpb24gJChsLHUsdCl7dmFyIGksbyxyO2lmKG4udW5tb3VudCYmbi51bm1vdW50KGwpLChpPWwucmVmKSYmKGkuY3VycmVudCYmaS5jdXJyZW50IT09bC5fX2V8fFQoaSxudWxsLHUpKSx0fHxcImZ1bmN0aW9uXCI9PXR5cGVvZiBsLnR5cGV8fCh0PW51bGwhPShvPWwuX19lKSksbC5fX2U9bC5fX2Q9dm9pZCAwLG51bGwhPShpPWwuX19jKSl7aWYoaS5jb21wb25lbnRXaWxsVW5tb3VudCl0cnl7aS5jb21wb25lbnRXaWxsVW5tb3VudCgpfWNhdGNoKGwpe24uX19lKGwsdSl9aS5iYXNlPWkuX19QPW51bGx9aWYoaT1sLl9faylmb3Iocj0wO3I8aS5sZW5ndGg7cisrKWlbcl0mJiQoaVtyXSx1LHQpO251bGwhPW8mJmEobyl9ZnVuY3Rpb24gaihuLGwsdSl7cmV0dXJuIHRoaXMuY29uc3RydWN0b3Iobix1KX1mdW5jdGlvbiBEKGwsdSx0KXt2YXIgaSxyLGM7bi5fXyYmbi5fXyhsLHUpLHI9KGk9dD09PW8pP251bGw6dCYmdC5fX2t8fHUuX19rLGw9cChoLG51bGwsW2xdKSxjPVtdLE4odSwoaT91OnR8fHUpLl9faz1sLHJ8fGYsZix2b2lkIDAhPT11Lm93bmVyU1ZHRWxlbWVudCx0JiYhaT9bdF06cj9udWxsOmUuc2xpY2UuY2FsbCh1LmNoaWxkTm9kZXMpLGMsdHx8ZixpKSx6KGMsbCl9bj17X19lOmZ1bmN0aW9uKG4sbCl7Zm9yKHZhciB1LHQ7bD1sLl9fOylpZigodT1sLl9fYykmJiF1Ll9fKXRyeXtpZih1LmNvbnN0cnVjdG9yJiZudWxsIT11LmNvbnN0cnVjdG9yLmdldERlcml2ZWRTdGF0ZUZyb21FcnJvciYmKHQ9ITAsdS5zZXRTdGF0ZSh1LmNvbnN0cnVjdG9yLmdldERlcml2ZWRTdGF0ZUZyb21FcnJvcihuKSkpLG51bGwhPXUuY29tcG9uZW50RGlkQ2F0Y2gmJih0PSEwLHUuY29tcG9uZW50RGlkQ2F0Y2gobikpLHQpcmV0dXJuIG0odS5fX0U9dSl9Y2F0Y2gobCl7bj1sfXRocm93IG59fSxsPWZ1bmN0aW9uKG4pe3JldHVybiBudWxsIT1uJiZ2b2lkIDA9PT1uLmNvbnN0cnVjdG9yfSxkLnByb3RvdHlwZS5zZXRTdGF0ZT1mdW5jdGlvbihuLGwpe3ZhciB1O3U9dGhpcy5fX3MhPT10aGlzLnN0YXRlP3RoaXMuX19zOnRoaXMuX19zPXMoe30sdGhpcy5zdGF0ZSksXCJmdW5jdGlvblwiPT10eXBlb2YgbiYmKG49bih1LHRoaXMucHJvcHMpKSxuJiZzKHUsbiksbnVsbCE9biYmdGhpcy5fX3YmJihsJiZ0aGlzLl9faC5wdXNoKGwpLG0odGhpcykpfSxkLnByb3RvdHlwZS5mb3JjZVVwZGF0ZT1mdW5jdGlvbihuKXt0aGlzLl9fdiYmKHRoaXMuX19lPSEwLG4mJnRoaXMuX19oLnB1c2gobiksbSh0aGlzKSl9LGQucHJvdG90eXBlLnJlbmRlcj1oLHU9W10sdD1cImZ1bmN0aW9uXCI9PXR5cGVvZiBQcm9taXNlP1Byb21pc2UucHJvdG90eXBlLnRoZW4uYmluZChQcm9taXNlLnJlc29sdmUoKSk6c2V0VGltZW91dCxvPWYscj0wLGV4cG9ydHMucmVuZGVyPUQsZXhwb3J0cy5oeWRyYXRlPWZ1bmN0aW9uKG4sbCl7RChuLGwsbyl9LGV4cG9ydHMuY3JlYXRlRWxlbWVudD1wLGV4cG9ydHMuaD1wLGV4cG9ydHMuRnJhZ21lbnQ9aCxleHBvcnRzLmNyZWF0ZVJlZj1mdW5jdGlvbigpe3JldHVybnt9fSxleHBvcnRzLmlzVmFsaWRFbGVtZW50PWwsZXhwb3J0cy5Db21wb25lbnQ9ZCxleHBvcnRzLmNsb25lRWxlbWVudD1mdW5jdGlvbihuLGwpe3JldHVybiBsPXMocyh7fSxuLnByb3BzKSxsKSxhcmd1bWVudHMubGVuZ3RoPjImJihsLmNoaWxkcmVuPWUuc2xpY2UuY2FsbChhcmd1bWVudHMsMikpLHYobi50eXBlLGwsbC5rZXl8fG4ua2V5LGwucmVmfHxuLnJlZil9LGV4cG9ydHMuY3JlYXRlQ29udGV4dD1mdW5jdGlvbihuKXt2YXIgbD17fSx1PXtfX2M6XCJfX2NDXCIrcisrLF9fOm4sQ29uc3VtZXI6ZnVuY3Rpb24obixsKXtyZXR1cm4gbi5jaGlsZHJlbihsKX0sUHJvdmlkZXI6ZnVuY3Rpb24obil7dmFyIHQsaT10aGlzO3JldHVybiB0aGlzLmdldENoaWxkQ29udGV4dHx8KHQ9W10sdGhpcy5nZXRDaGlsZENvbnRleHQ9ZnVuY3Rpb24oKXtyZXR1cm4gbFt1Ll9fY109aSxsfSx0aGlzLnNob3VsZENvbXBvbmVudFVwZGF0ZT1mdW5jdGlvbihsKXtuLnZhbHVlIT09bC52YWx1ZSYmdC5zb21lKGZ1bmN0aW9uKG4pe24uY29udGV4dD1sLnZhbHVlLG0obil9KX0sdGhpcy5zdWI9ZnVuY3Rpb24obil7dC5wdXNoKG4pO3ZhciBsPW4uY29tcG9uZW50V2lsbFVubW91bnQ7bi5jb21wb25lbnRXaWxsVW5tb3VudD1mdW5jdGlvbigpe3Quc3BsaWNlKHQuaW5kZXhPZihuKSwxKSxsJiZsLmNhbGwobil9fSksbi5jaGlsZHJlbn19O3JldHVybiB1LkNvbnN1bWVyLmNvbnRleHRUeXBlPXUsdX0sZXhwb3J0cy50b0NoaWxkQXJyYXk9ayxleHBvcnRzLl9lPSQsZXhwb3J0cy5vcHRpb25zPW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcmVhY3QuanMubWFwXG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbnZhciBydW50aW1lID0gKGZ1bmN0aW9uIChleHBvcnRzKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBPcCA9IE9iamVjdC5wcm90b3R5cGU7XG4gIHZhciBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHVuZGVmaW5lZDsgLy8gTW9yZSBjb21wcmVzc2libGUgdGhhbiB2b2lkIDAuXG4gIHZhciAkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sIDoge307XG4gIHZhciBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG4gIHZhciBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCI7XG4gIHZhciB0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgXCJAQHRvU3RyaW5nVGFnXCI7XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgZXhwb3J0cy53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgLy8gVGhpcyBpcyBhIHBvbHlmaWxsIGZvciAlSXRlcmF0b3JQcm90b3R5cGUlIGZvciBlbnZpcm9ubWVudHMgdGhhdFxuICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgSXRlcmF0b3JQcm90b3R5cGVbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiAgdmFyIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8gJiYgZ2V0UHJvdG8oZ2V0UHJvdG8odmFsdWVzKFtdKSkpO1xuICBpZiAoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiZcbiAgICAgIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJlxuICAgICAgaGFzT3duLmNhbGwoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sKSkge1xuICAgIC8vIFRoaXMgZW52aXJvbm1lbnQgaGFzIGEgbmF0aXZlICVJdGVyYXRvclByb3RvdHlwZSU7IHVzZSBpdCBpbnN0ZWFkXG4gICAgLy8gb2YgdGhlIHBvbHlmaWxsLlxuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cblxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPVxuICAgIEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGVbdG9TdHJpbmdUYWdTeW1ib2xdID1cbiAgICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBwcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3JcbiAgICAgID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHxcbiAgICAgICAgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgICAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICAgICAgOiBmYWxzZTtcbiAgfTtcblxuICBleHBvcnRzLm1hcmsgPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGlmICghKHRvU3RyaW5nVGFnU3ltYm9sIGluIGdlbkZ1bikpIHtcbiAgICAgICAgZ2VuRnVuW3RvU3RyaW5nVGFnU3ltYm9sXSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcbiAgICAgIH1cbiAgICB9XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB7IF9fYXdhaXQ6IGFyZyB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlICYmXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAvLyBJZiBhIHJlamVjdGVkIFByb21pc2Ugd2FzIHlpZWxkZWQsIHRocm93IHRoZSByZWplY3Rpb24gYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgaGFuZGxlZCB0aGVyZS5cbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPVxuICAgICAgICAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsXG4gICAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmdcbiAgICAgICAgKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcbiAgQXN5bmNJdGVyYXRvci5wcm90b3R5cGVbYXN5bmNJdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3IoXG4gICAgICB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KVxuICAgICk7XG5cbiAgICByZXR1cm4gZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5tZXRob2QgPSBtZXRob2Q7XG4gICAgICBjb250ZXh0LmFyZyA9IGFyZztcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIENhbGwgZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdKGNvbnRleHQuYXJnKSBhbmQgaGFuZGxlIHRoZVxuICAvLyByZXN1bHQsIGVpdGhlciBieSByZXR1cm5pbmcgYSB7IHZhbHVlLCBkb25lIH0gcmVzdWx0IGZyb20gdGhlXG4gIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLFxuICAvLyBzZXR0aW5nIGNvbnRleHQuZGVsZWdhdGUgdG8gbnVsbCwgYW5kIHJldHVybmluZyB0aGUgQ29udGludWVTZW50aW5lbC5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgLy8gTm90ZTogW1wicmV0dXJuXCJdIG11c3QgYmUgdXNlZCBmb3IgRVMzIHBhcnNpbmcgY29tcGF0aWJpbGl0eS5cbiAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb21cbiAgICAgICAgICAgIC8vIFwicmV0dXJuXCIgdG8gXCJ0aHJvd1wiLCBsZXQgdGhhdCBvdmVycmlkZSB0aGUgVHlwZUVycm9yIGJlbG93LlxuICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ3Rocm93JyBtZXRob2RcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7XG5cbiAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcblxuICAgIGlmICghIGluZm8pIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIik7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5XG4gICAgICAvLyB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgZGVsZWdhdGUucmVzdWx0TmFtZSAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7XG5cbiAgICAgIC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG5cbiAgICAgIC8vIElmIGNvbnRleHQubWV0aG9kIHdhcyBcInRocm93XCIgYnV0IHRoZSBkZWxlZ2F0ZSBoYW5kbGVkIHRoZVxuICAgICAgLy8gZXhjZXB0aW9uLCBsZXQgdGhlIG91dGVyIGdlbmVyYXRvciBwcm9jZWVkIG5vcm1hbGx5LiBJZlxuICAgICAgLy8gY29udGV4dC5tZXRob2Qgd2FzIFwibmV4dFwiLCBmb3JnZXQgY29udGV4dC5hcmcgc2luY2UgaXQgaGFzIGJlZW5cbiAgICAgIC8vIFwiY29uc3VtZWRcIiBieSB0aGUgZGVsZWdhdGUgaXRlcmF0b3IuIElmIGNvbnRleHQubWV0aG9kIHdhc1xuICAgICAgLy8gXCJyZXR1cm5cIiwgYWxsb3cgdGhlIG9yaWdpbmFsIC5yZXR1cm4gY2FsbCB0byBjb250aW51ZSBpbiB0aGVcbiAgICAgIC8vIG91dGVyIGdlbmVyYXRvci5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCAhPT0gXCJyZXR1cm5cIikge1xuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuXG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9XG5cbiAgICAvLyBUaGUgZGVsZWdhdGUgaXRlcmF0b3IgaXMgZmluaXNoZWQsIHNvIGZvcmdldCBpdCBhbmQgY29udGludWUgd2l0aFxuICAgIC8vIHRoZSBvdXRlciBnZW5lcmF0b3IuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH1cblxuICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG5cbiAgR3BbdG9TdHJpbmdUYWdTeW1ib2xdID0gXCJHZW5lcmF0b3JcIjtcblxuICAvLyBBIEdlbmVyYXRvciBzaG91bGQgYWx3YXlzIHJldHVybiBpdHNlbGYgYXMgdGhlIGl0ZXJhdG9yIG9iamVjdCB3aGVuIHRoZVxuICAvLyBAQGl0ZXJhdG9yIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbiBpdC4gU29tZSBicm93c2VycycgaW1wbGVtZW50YXRpb25zIG9mIHRoZVxuICAvLyBpdGVyYXRvciBwcm90b3R5cGUgY2hhaW4gaW5jb3JyZWN0bHkgaW1wbGVtZW50IHRoaXMsIGNhdXNpbmcgdGhlIEdlbmVyYXRvclxuICAvLyBvYmplY3QgdG8gbm90IGJlIHJldHVybmVkIGZyb20gdGhpcyBjYWxsLiBUaGlzIGVuc3VyZXMgdGhhdCBkb2Vzbid0IGhhcHBlbi5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9pc3N1ZXMvMjc0IGZvciBtb3JlIGRldGFpbHMuXG4gIEdwW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEdwLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH07XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBleHBvcnRzLmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cbiAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gIH1cbiAgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiZcbiAgICAgICAgICAgICAgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiZcbiAgICAgICAgICAgICAgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhISBjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFicnVwdDogZnVuY3Rpb24odHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiZcbiAgICAgICAgICAgIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAgICh0eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICAgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJlxuICAgICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgICAgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTtcblxuICAvLyBSZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlXG4gIC8vIG9yIG5vdCwgcmV0dXJuIHRoZSBydW50aW1lIG9iamVjdCBzbyB0aGF0IHdlIGNhbiBkZWNsYXJlIHRoZSB2YXJpYWJsZVxuICAvLyByZWdlbmVyYXRvclJ1bnRpbWUgaW4gdGhlIG91dGVyIHNjb3BlLCB3aGljaCBhbGxvd3MgdGhpcyBtb2R1bGUgdG8gYmVcbiAgLy8gaW5qZWN0ZWQgZWFzaWx5IGJ5IGBiaW4vcmVnZW5lcmF0b3IgLS1pbmNsdWRlLXJ1bnRpbWUgc2NyaXB0LmpzYC5cbiAgcmV0dXJuIGV4cG9ydHM7XG5cbn0oXG4gIC8vIElmIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZSwgdXNlIG1vZHVsZS5leHBvcnRzXG4gIC8vIGFzIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgbmFtZXNwYWNlLiBPdGhlcndpc2UgY3JlYXRlIGEgbmV3IGVtcHR5XG4gIC8vIG9iamVjdC4gRWl0aGVyIHdheSwgdGhlIHJlc3VsdGluZyBvYmplY3Qgd2lsbCBiZSB1c2VkIHRvIGluaXRpYWxpemVcbiAgLy8gdGhlIHJlZ2VuZXJhdG9yUnVudGltZSB2YXJpYWJsZSBhdCB0aGUgdG9wIG9mIHRoaXMgZmlsZS5cbiAgdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiA/IG1vZHVsZS5leHBvcnRzIDoge31cbikpO1xuXG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgLy8gVGhpcyBtb2R1bGUgc2hvdWxkIG5vdCBiZSBydW5uaW5nIGluIHN0cmljdCBtb2RlLCBzbyB0aGUgYWJvdmVcbiAgLy8gYXNzaWdubWVudCBzaG91bGQgYWx3YXlzIHdvcmsgdW5sZXNzIHNvbWV0aGluZyBpcyBtaXNjb25maWd1cmVkLiBKdXN0XG4gIC8vIGluIGNhc2UgcnVudGltZS5qcyBhY2NpZGVudGFsbHkgcnVucyBpbiBzdHJpY3QgbW9kZSwgd2UgY2FuIGVzY2FwZVxuICAvLyBzdHJpY3QgbW9kZSB1c2luZyBhIGdsb2JhbCBGdW5jdGlvbiBjYWxsLiBUaGlzIGNvdWxkIGNvbmNlaXZhYmx5IGZhaWxcbiAgLy8gaWYgYSBDb250ZW50IFNlY3VyaXR5IFBvbGljeSBmb3JiaWRzIHVzaW5nIEZ1bmN0aW9uLCBidXQgaW4gdGhhdCBjYXNlXG4gIC8vIHRoZSBwcm9wZXIgc29sdXRpb24gaXMgdG8gZml4IHRoZSBhY2NpZGVudGFsIHN0cmljdCBtb2RlIHByb2JsZW0uIElmXG4gIC8vIHlvdSd2ZSBtaXNjb25maWd1cmVkIHlvdXIgYnVuZGxlciB0byBmb3JjZSBzdHJpY3QgbW9kZSBhbmQgYXBwbGllZCBhXG4gIC8vIENTUCB0byBmb3JiaWQgRnVuY3Rpb24sIGFuZCB5b3UncmUgbm90IHdpbGxpbmcgdG8gZml4IGVpdGhlciBvZiB0aG9zZVxuICAvLyBwcm9ibGVtcywgcGxlYXNlIGRldGFpbCB5b3VyIHVuaXF1ZSBwcmVkaWNhbWVudCBpbiBhIEdpdEh1YiBpc3N1ZS5cbiAgRnVuY3Rpb24oXCJyXCIsIFwicmVnZW5lcmF0b3JSdW50aW1lID0gclwiKShydW50aW1lKTtcbn1cbiIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvaW5kZXgnKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJhbmRvbUZyb21TZWVkID0gcmVxdWlyZSgnLi9yYW5kb20vcmFuZG9tLWZyb20tc2VlZCcpO1xuXG52YXIgT1JJR0lOQUwgPSAnMDEyMzQ1Njc4OWFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpfLSc7XG52YXIgYWxwaGFiZXQ7XG52YXIgcHJldmlvdXNTZWVkO1xuXG52YXIgc2h1ZmZsZWQ7XG5cbmZ1bmN0aW9uIHJlc2V0KCkge1xuICAgIHNodWZmbGVkID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHNldENoYXJhY3RlcnMoX2FscGhhYmV0Xykge1xuICAgIGlmICghX2FscGhhYmV0Xykge1xuICAgICAgICBpZiAoYWxwaGFiZXQgIT09IE9SSUdJTkFMKSB7XG4gICAgICAgICAgICBhbHBoYWJldCA9IE9SSUdJTkFMO1xuICAgICAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKF9hbHBoYWJldF8gPT09IGFscGhhYmV0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoX2FscGhhYmV0Xy5sZW5ndGggIT09IE9SSUdJTkFMLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0N1c3RvbSBhbHBoYWJldCBmb3Igc2hvcnRpZCBtdXN0IGJlICcgKyBPUklHSU5BTC5sZW5ndGggKyAnIHVuaXF1ZSBjaGFyYWN0ZXJzLiBZb3Ugc3VibWl0dGVkICcgKyBfYWxwaGFiZXRfLmxlbmd0aCArICcgY2hhcmFjdGVyczogJyArIF9hbHBoYWJldF8pO1xuICAgIH1cblxuICAgIHZhciB1bmlxdWUgPSBfYWxwaGFiZXRfLnNwbGl0KCcnKS5maWx0ZXIoZnVuY3Rpb24oaXRlbSwgaW5kLCBhcnIpe1xuICAgICAgIHJldHVybiBpbmQgIT09IGFyci5sYXN0SW5kZXhPZihpdGVtKTtcbiAgICB9KTtcblxuICAgIGlmICh1bmlxdWUubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ3VzdG9tIGFscGhhYmV0IGZvciBzaG9ydGlkIG11c3QgYmUgJyArIE9SSUdJTkFMLmxlbmd0aCArICcgdW5pcXVlIGNoYXJhY3RlcnMuIFRoZXNlIGNoYXJhY3RlcnMgd2VyZSBub3QgdW5pcXVlOiAnICsgdW5pcXVlLmpvaW4oJywgJykpO1xuICAgIH1cblxuICAgIGFscGhhYmV0ID0gX2FscGhhYmV0XztcbiAgICByZXNldCgpO1xufVxuXG5mdW5jdGlvbiBjaGFyYWN0ZXJzKF9hbHBoYWJldF8pIHtcbiAgICBzZXRDaGFyYWN0ZXJzKF9hbHBoYWJldF8pO1xuICAgIHJldHVybiBhbHBoYWJldDtcbn1cblxuZnVuY3Rpb24gc2V0U2VlZChzZWVkKSB7XG4gICAgcmFuZG9tRnJvbVNlZWQuc2VlZChzZWVkKTtcbiAgICBpZiAocHJldmlvdXNTZWVkICE9PSBzZWVkKSB7XG4gICAgICAgIHJlc2V0KCk7XG4gICAgICAgIHByZXZpb3VzU2VlZCA9IHNlZWQ7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzaHVmZmxlKCkge1xuICAgIGlmICghYWxwaGFiZXQpIHtcbiAgICAgICAgc2V0Q2hhcmFjdGVycyhPUklHSU5BTCk7XG4gICAgfVxuXG4gICAgdmFyIHNvdXJjZUFycmF5ID0gYWxwaGFiZXQuc3BsaXQoJycpO1xuICAgIHZhciB0YXJnZXRBcnJheSA9IFtdO1xuICAgIHZhciByID0gcmFuZG9tRnJvbVNlZWQubmV4dFZhbHVlKCk7XG4gICAgdmFyIGNoYXJhY3RlckluZGV4O1xuXG4gICAgd2hpbGUgKHNvdXJjZUFycmF5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgciA9IHJhbmRvbUZyb21TZWVkLm5leHRWYWx1ZSgpO1xuICAgICAgICBjaGFyYWN0ZXJJbmRleCA9IE1hdGguZmxvb3IociAqIHNvdXJjZUFycmF5Lmxlbmd0aCk7XG4gICAgICAgIHRhcmdldEFycmF5LnB1c2goc291cmNlQXJyYXkuc3BsaWNlKGNoYXJhY3RlckluZGV4LCAxKVswXSk7XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXRBcnJheS5qb2luKCcnKTtcbn1cblxuZnVuY3Rpb24gZ2V0U2h1ZmZsZWQoKSB7XG4gICAgaWYgKHNodWZmbGVkKSB7XG4gICAgICAgIHJldHVybiBzaHVmZmxlZDtcbiAgICB9XG4gICAgc2h1ZmZsZWQgPSBzaHVmZmxlKCk7XG4gICAgcmV0dXJuIHNodWZmbGVkO1xufVxuXG4vKipcbiAqIGxvb2t1cCBzaHVmZmxlZCBsZXR0ZXJcbiAqIEBwYXJhbSBpbmRleFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gbG9va3VwKGluZGV4KSB7XG4gICAgdmFyIGFscGhhYmV0U2h1ZmZsZWQgPSBnZXRTaHVmZmxlZCgpO1xuICAgIHJldHVybiBhbHBoYWJldFNodWZmbGVkW2luZGV4XTtcbn1cblxuZnVuY3Rpb24gZ2V0ICgpIHtcbiAgcmV0dXJuIGFscGhhYmV0IHx8IE9SSUdJTkFMO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZXQ6IGdldCxcbiAgICBjaGFyYWN0ZXJzOiBjaGFyYWN0ZXJzLFxuICAgIHNlZWQ6IHNldFNlZWQsXG4gICAgbG9va3VwOiBsb29rdXAsXG4gICAgc2h1ZmZsZWQ6IGdldFNodWZmbGVkXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZ2VuZXJhdGUgPSByZXF1aXJlKCcuL2dlbmVyYXRlJyk7XG52YXIgYWxwaGFiZXQgPSByZXF1aXJlKCcuL2FscGhhYmV0Jyk7XG5cbi8vIElnbm9yZSBhbGwgbWlsbGlzZWNvbmRzIGJlZm9yZSBhIGNlcnRhaW4gdGltZSB0byByZWR1Y2UgdGhlIHNpemUgb2YgdGhlIGRhdGUgZW50cm9weSB3aXRob3V0IHNhY3JpZmljaW5nIHVuaXF1ZW5lc3MuXG4vLyBUaGlzIG51bWJlciBzaG91bGQgYmUgdXBkYXRlZCBldmVyeSB5ZWFyIG9yIHNvIHRvIGtlZXAgdGhlIGdlbmVyYXRlZCBpZCBzaG9ydC5cbi8vIFRvIHJlZ2VuZXJhdGUgYG5ldyBEYXRlKCkgLSAwYCBhbmQgYnVtcCB0aGUgdmVyc2lvbi4gQWx3YXlzIGJ1bXAgdGhlIHZlcnNpb24hXG52YXIgUkVEVUNFX1RJTUUgPSAxNTY3NzUyODAyMDYyO1xuXG4vLyBkb24ndCBjaGFuZ2UgdW5sZXNzIHdlIGNoYW5nZSB0aGUgYWxnb3Mgb3IgUkVEVUNFX1RJTUVcbi8vIG11c3QgYmUgYW4gaW50ZWdlciBhbmQgbGVzcyB0aGFuIDE2XG52YXIgdmVyc2lvbiA9IDc7XG5cbi8vIENvdW50ZXIgaXMgdXNlZCB3aGVuIHNob3J0aWQgaXMgY2FsbGVkIG11bHRpcGxlIHRpbWVzIGluIG9uZSBzZWNvbmQuXG52YXIgY291bnRlcjtcblxuLy8gUmVtZW1iZXIgdGhlIGxhc3QgdGltZSBzaG9ydGlkIHdhcyBjYWxsZWQgaW4gY2FzZSBjb3VudGVyIGlzIG5lZWRlZC5cbnZhciBwcmV2aW91c1NlY29uZHM7XG5cbi8qKlxuICogR2VuZXJhdGUgdW5pcXVlIGlkXG4gKiBSZXR1cm5zIHN0cmluZyBpZFxuICovXG5mdW5jdGlvbiBidWlsZChjbHVzdGVyV29ya2VySWQpIHtcbiAgICB2YXIgc3RyID0gJyc7XG5cbiAgICB2YXIgc2Vjb25kcyA9IE1hdGguZmxvb3IoKERhdGUubm93KCkgLSBSRURVQ0VfVElNRSkgKiAwLjAwMSk7XG5cbiAgICBpZiAoc2Vjb25kcyA9PT0gcHJldmlvdXNTZWNvbmRzKSB7XG4gICAgICAgIGNvdW50ZXIrKztcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb3VudGVyID0gMDtcbiAgICAgICAgcHJldmlvdXNTZWNvbmRzID0gc2Vjb25kcztcbiAgICB9XG5cbiAgICBzdHIgPSBzdHIgKyBnZW5lcmF0ZSh2ZXJzaW9uKTtcbiAgICBzdHIgPSBzdHIgKyBnZW5lcmF0ZShjbHVzdGVyV29ya2VySWQpO1xuICAgIGlmIChjb3VudGVyID4gMCkge1xuICAgICAgICBzdHIgPSBzdHIgKyBnZW5lcmF0ZShjb3VudGVyKTtcbiAgICB9XG4gICAgc3RyID0gc3RyICsgZ2VuZXJhdGUoc2Vjb25kcyk7XG4gICAgcmV0dXJuIHN0cjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBidWlsZDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFscGhhYmV0ID0gcmVxdWlyZSgnLi9hbHBoYWJldCcpO1xudmFyIHJhbmRvbSA9IHJlcXVpcmUoJy4vcmFuZG9tL3JhbmRvbS1ieXRlJyk7XG52YXIgZm9ybWF0ID0gcmVxdWlyZSgnbmFub2lkL2Zvcm1hdCcpO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZShudW1iZXIpIHtcbiAgICB2YXIgbG9vcENvdW50ZXIgPSAwO1xuICAgIHZhciBkb25lO1xuXG4gICAgdmFyIHN0ciA9ICcnO1xuXG4gICAgd2hpbGUgKCFkb25lKSB7XG4gICAgICAgIHN0ciA9IHN0ciArIGZvcm1hdChyYW5kb20sIGFscGhhYmV0LmdldCgpLCAxKTtcbiAgICAgICAgZG9uZSA9IG51bWJlciA8IChNYXRoLnBvdygxNiwgbG9vcENvdW50ZXIgKyAxICkgKTtcbiAgICAgICAgbG9vcENvdW50ZXIrKztcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZW5lcmF0ZTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFscGhhYmV0ID0gcmVxdWlyZSgnLi9hbHBoYWJldCcpO1xudmFyIGJ1aWxkID0gcmVxdWlyZSgnLi9idWlsZCcpO1xudmFyIGlzVmFsaWQgPSByZXF1aXJlKCcuL2lzLXZhbGlkJyk7XG5cbi8vIGlmIHlvdSBhcmUgdXNpbmcgY2x1c3RlciBvciBtdWx0aXBsZSBzZXJ2ZXJzIHVzZSB0aGlzIHRvIG1ha2UgZWFjaCBpbnN0YW5jZVxuLy8gaGFzIGEgdW5pcXVlIHZhbHVlIGZvciB3b3JrZXJcbi8vIE5vdGU6IEkgZG9uJ3Qga25vdyBpZiB0aGlzIGlzIGF1dG9tYXRpY2FsbHkgc2V0IHdoZW4gdXNpbmcgdGhpcmRcbi8vIHBhcnR5IGNsdXN0ZXIgc29sdXRpb25zIHN1Y2ggYXMgcG0yLlxudmFyIGNsdXN0ZXJXb3JrZXJJZCA9IHJlcXVpcmUoJy4vdXRpbC9jbHVzdGVyLXdvcmtlci1pZCcpIHx8IDA7XG5cbi8qKlxuICogU2V0IHRoZSBzZWVkLlxuICogSGlnaGx5IHJlY29tbWVuZGVkIGlmIHlvdSBkb24ndCB3YW50IHBlb3BsZSB0byB0cnkgdG8gZmlndXJlIG91dCB5b3VyIGlkIHNjaGVtYS5cbiAqIGV4cG9zZWQgYXMgc2hvcnRpZC5zZWVkKGludClcbiAqIEBwYXJhbSBzZWVkIEludGVnZXIgdmFsdWUgdG8gc2VlZCB0aGUgcmFuZG9tIGFscGhhYmV0LiAgQUxXQVlTIFVTRSBUSEUgU0FNRSBTRUVEIG9yIHlvdSBtaWdodCBnZXQgb3ZlcmxhcHMuXG4gKi9cbmZ1bmN0aW9uIHNlZWQoc2VlZFZhbHVlKSB7XG4gICAgYWxwaGFiZXQuc2VlZChzZWVkVmFsdWUpO1xuICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLyoqXG4gKiBTZXQgdGhlIGNsdXN0ZXIgd29ya2VyIG9yIG1hY2hpbmUgaWRcbiAqIGV4cG9zZWQgYXMgc2hvcnRpZC53b3JrZXIoaW50KVxuICogQHBhcmFtIHdvcmtlcklkIHdvcmtlciBtdXN0IGJlIHBvc2l0aXZlIGludGVnZXIuICBOdW1iZXIgbGVzcyB0aGFuIDE2IGlzIHJlY29tbWVuZGVkLlxuICogcmV0dXJucyBzaG9ydGlkIG1vZHVsZSBzbyBpdCBjYW4gYmUgY2hhaW5lZC5cbiAqL1xuZnVuY3Rpb24gd29ya2VyKHdvcmtlcklkKSB7XG4gICAgY2x1c3RlcldvcmtlcklkID0gd29ya2VySWQ7XG4gICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vKipcbiAqXG4gKiBzZXRzIG5ldyBjaGFyYWN0ZXJzIHRvIHVzZSBpbiB0aGUgYWxwaGFiZXRcbiAqIHJldHVybnMgdGhlIHNodWZmbGVkIGFscGhhYmV0XG4gKi9cbmZ1bmN0aW9uIGNoYXJhY3RlcnMobmV3Q2hhcmFjdGVycykge1xuICAgIGlmIChuZXdDaGFyYWN0ZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgYWxwaGFiZXQuY2hhcmFjdGVycyhuZXdDaGFyYWN0ZXJzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWxwaGFiZXQuc2h1ZmZsZWQoKTtcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZSB1bmlxdWUgaWRcbiAqIFJldHVybnMgc3RyaW5nIGlkXG4gKi9cbmZ1bmN0aW9uIGdlbmVyYXRlKCkge1xuICByZXR1cm4gYnVpbGQoY2x1c3RlcldvcmtlcklkKTtcbn1cblxuLy8gRXhwb3J0IGFsbCBvdGhlciBmdW5jdGlvbnMgYXMgcHJvcGVydGllcyBvZiB0aGUgZ2VuZXJhdGUgZnVuY3Rpb25cbm1vZHVsZS5leHBvcnRzID0gZ2VuZXJhdGU7XG5tb2R1bGUuZXhwb3J0cy5nZW5lcmF0ZSA9IGdlbmVyYXRlO1xubW9kdWxlLmV4cG9ydHMuc2VlZCA9IHNlZWQ7XG5tb2R1bGUuZXhwb3J0cy53b3JrZXIgPSB3b3JrZXI7XG5tb2R1bGUuZXhwb3J0cy5jaGFyYWN0ZXJzID0gY2hhcmFjdGVycztcbm1vZHVsZS5leHBvcnRzLmlzVmFsaWQgPSBpc1ZhbGlkO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFscGhhYmV0ID0gcmVxdWlyZSgnLi9hbHBoYWJldCcpO1xuXG5mdW5jdGlvbiBpc1Nob3J0SWQoaWQpIHtcbiAgICBpZiAoIWlkIHx8IHR5cGVvZiBpZCAhPT0gJ3N0cmluZycgfHwgaWQubGVuZ3RoIDwgNiApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBub25BbHBoYWJldGljID0gbmV3IFJlZ0V4cCgnW14nICtcbiAgICAgIGFscGhhYmV0LmdldCgpLnJlcGxhY2UoL1t8XFxcXHt9KClbXFxdXiQrKj8uLV0vZywgJ1xcXFwkJicpICtcbiAgICAnXScpO1xuICAgIHJldHVybiAhbm9uQWxwaGFiZXRpYy50ZXN0KGlkKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1Nob3J0SWQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcnlwdG8gPSB0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiAod2luZG93LmNyeXB0byB8fCB3aW5kb3cubXNDcnlwdG8pOyAvLyBJRSAxMSB1c2VzIHdpbmRvdy5tc0NyeXB0b1xuXG52YXIgcmFuZG9tQnl0ZTtcblxuaWYgKCFjcnlwdG8gfHwgIWNyeXB0by5nZXRSYW5kb21WYWx1ZXMpIHtcbiAgICByYW5kb21CeXRlID0gZnVuY3Rpb24oc2l6ZSkge1xuICAgICAgICB2YXIgYnl0ZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgICAgICAgIGJ5dGVzLnB1c2goTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU2KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgIH07XG59IGVsc2Uge1xuICAgIHJhbmRvbUJ5dGUgPSBmdW5jdGlvbihzaXplKSB7XG4gICAgICAgIHJldHVybiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KHNpemUpKTtcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJhbmRvbUJ5dGU7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIEZvdW5kIHRoaXMgc2VlZC1iYXNlZCByYW5kb20gZ2VuZXJhdG9yIHNvbWV3aGVyZVxuLy8gQmFzZWQgb24gVGhlIENlbnRyYWwgUmFuZG9taXplciAxLjMgKEMpIDE5OTcgYnkgUGF1bCBIb3VsZSAoaG91bGVAbXNjLmNvcm5lbGwuZWR1KVxuXG52YXIgc2VlZCA9IDE7XG5cbi8qKlxuICogcmV0dXJuIGEgcmFuZG9tIG51bWJlciBiYXNlZCBvbiBhIHNlZWRcbiAqIEBwYXJhbSBzZWVkXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5mdW5jdGlvbiBnZXROZXh0VmFsdWUoKSB7XG4gICAgc2VlZCA9IChzZWVkICogOTMwMSArIDQ5Mjk3KSAlIDIzMzI4MDtcbiAgICByZXR1cm4gc2VlZC8oMjMzMjgwLjApO1xufVxuXG5mdW5jdGlvbiBzZXRTZWVkKF9zZWVkXykge1xuICAgIHNlZWQgPSBfc2VlZF87XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG5leHRWYWx1ZTogZ2V0TmV4dFZhbHVlLFxuICAgIHNlZWQ6IHNldFNlZWRcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gMDtcbiIsImltcG9ydCBcInByZWFjdC9kZWJ1Z1wiO1xuXG5pbXBvcnQgeyBoLCByZW5kZXIgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IEFwcCBmcm9tICcuL3ZpZXcvQXBwLmpzeCc7XG5pbXBvcnQgQXBwQ29udGV4dCBmcm9tICcuL3V0aWxzL0FwcENvbnRleHQuanMnO1xuaW1wb3J0IHNob3J0aWQgZnJvbSAnc2hvcnRpZCc7XG5pbXBvcnQgQXBwQ29udHJvbGxlciBmcm9tICcuL21vZGVsL0FwcENvbnRyb2xsZXIuanMnO1xuaW1wb3J0IEFwcEhlbHBlciBmcm9tICcuL21vZGVsL0FwcEhlbHBlci5qcyc7XG5pbXBvcnQgQ29uZHVjdG9yIGZyb20gJy4vbW9kZWwvQ29uZHVjdG9yLmpzJztcblxubGV0IGNvbmR1Y3RvciwgYXBwSGVscGVyLCBhcHBDb250cm9sbGVyO1xuXG50cnkge1xuXHRjb25kdWN0b3I9bmV3IENvbmR1Y3RvcigpO1xuXHRhcHBIZWxwZXI9bmV3IEFwcEhlbHBlcihjb25kdWN0b3IpO1xuXHRhcHBDb250cm9sbGVyPW5ldyBBcHBDb250cm9sbGVyKGNvbmR1Y3RvcixhcHBIZWxwZXIpO1xufVxuXG5jYXRjaCAoZSkge1xuXHRhbGVydChlKTtcbn1cblxuY29uZHVjdG9yLm9uUGxheUdyaWRJbmRleENoYW5nZT0oZ3JpZEluZGV4LCBzZXF1ZW5jZUluZGV4KT0+e1xuXHRmb3IgKGxldCBlbCBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmN1cnJlbnQtYmVhdFwiKSlcblx0XHRlbC5jbGFzc0xpc3QucmVtb3ZlKCdjdXJyZW50LWJlYXQnKTtcblxuXHRpZiAoZ3JpZEluZGV4Pj0wKVxuXHRcdGZvciAobGV0IGVsIG9mIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYmVhdC1cIitncmlkSW5kZXgpKVxuXHRcdFx0ZWwuY2xhc3NMaXN0LmFkZCgnY3VycmVudC1iZWF0Jyk7XG5cblx0Zm9yIChsZXQgZWwgb2YgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jdXJyZW50LXNlcXVlbmNlXCIpKVxuXHRcdGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2N1cnJlbnQtc2VxdWVuY2UnKTtcblxuXHRpZiAoZ3JpZEluZGV4JTQ9PTAgJiYgc2VxdWVuY2VJbmRleD49MClcblx0XHRmb3IgKGxldCBlbCBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlcXVlbmNlLVwiK3NlcXVlbmNlSW5kZXgpKVxuXHRcdFx0ZWwuY2xhc3NMaXN0LmFkZCgnY3VycmVudC1zZXF1ZW5jZScpO1xufVxuXG5mdW5jdGlvbiBvblN0YXRlQ2hhbmdlKHN0YXRlKSB7XG5cdGNvbmR1Y3Rvci5zZXRTdGF0ZShzdGF0ZSk7XG5cdHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImhvb2Rtb2RlLXNvbmdzXCIsSlNPTi5zdHJpbmdpZnkoc3RhdGUuc29uZ3MpKTtcbn1cblxubGV0IGFwcENvbnRleHQ9KFxuXHQ8QXBwQ29udGV4dFxuXHRcdFx0Y29udHJvbGxlcj17YXBwQ29udHJvbGxlcn1cblx0XHRcdGhlbHBlcj17YXBwSGVscGVyfVxuXHRcdFx0aW5pdEFjdGlvbj1cImluaXRcIlxuXHRcdFx0b25TdGF0ZUNoYW5nZT17b25TdGF0ZUNoYW5nZX0+XG5cdFx0PEFwcC8+XG5cdDwvQXBwQ29udGV4dD5cbik7XG5cbmZ1bmN0aW9uIHN0YXJ0KCkge1xuXHRyZW5kZXIoYXBwQ29udGV4dCwgZG9jdW1lbnQuYm9keSk7XG59XG5cbmlmICh3aW5kb3cuaGFzT3duUHJvcGVydHkoXCJjb3Jkb3ZhXCIpKVxuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkZXZpY2VyZWFkeScsc3RhcnQpO1xuXG5lbHNlXG5cdHN0YXJ0KCk7XG4iLCJpbXBvcnQgc2hvcnRpZCBmcm9tICdzaG9ydGlkJztcbmltcG9ydCBcInJlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBDb250cm9sbGVyIHtcblx0Y29uc3RydWN0b3IoY29uZHVjdG9yLCBoZWxwZXIpIHtcblx0XHR0aGlzLmNvbmR1Y3Rvcj1jb25kdWN0b3I7XG5cdFx0dGhpcy5oZWxwZXI9aGVscGVyO1xuXHR9XG5cblx0aW5pdFN0YXRlKCkge1xuXHRcdGxldCBzdGF0ZT17XG5cdFx0XHRjdXJyZW50U29uZ0luZGV4OiAtMSxcblx0XHRcdGN1cnJlbnRMYXllckluZGV4OiAtMSxcblx0XHRcdGN1cnJlbnRDaG9yZEluZGV4OiAwLFxuXHRcdFx0Y3VycmVudFNlY3Rpb25JbmRleDogLTEsXG5cdFx0XHRjdXJyZW50R3JpZEluZGV4OiAtMSxcblx0XHRcdHNldHRpbmdzVmlzaWJsZTogZmFsc2UsXG5cdFx0XHRhZGRMYXllclZpc2libGU6IGZhbHNlLFxuXHRcdFx0c29uZ3M6IFtdLFxuXHRcdFx0aW5zdHJ1bWVudHM6IFtdLFxuXHRcdFx0cGxheWluZzogZmFsc2UsXG5cdFx0XHRyZWNvcmRpbmc6IGZhbHNlLFxuXHRcdFx0ZWRpdFNlY3Rpb25DaG9yZFZpc2libGU6IC0xXG5cdFx0fVxuXG5cdFx0c3RhdGUuaW5zdHJ1bWVudHMucHVzaCh7XG5cdFx0XHRcImtleVwiOiBcImJhZC1qYXp6LWRydW1zXCIsXG5cdFx0XHRcInR5cGVcIjogXCJwZXJjdXNzaXZlXCIsXG5cdFx0XHRcIm5hbWVcIjogXCJCYWQgSmF6eiBEcnVtc1wiLFxuXHRcdFx0XCJsYWJlbHNcIjogW1wiS0lDS1wiLFwiU05BUkVcIixcIkhJLUhBVFwiXSxcblx0XHRcdFwiaWNvblwiOiBcImRydW0uc3ZnXCIsXG5cdFx0XHRcImljb25zXCI6IFtcImtpY2stZHJ1bS5zdmdcIixcInNuYXJlLWRydW0uc3ZnXCIsXCJoaS1oYXQuc3ZnXCJdLFxuXHRcdFx0XCJzYW1wbGVzXCI6IFtcblx0XHRcdFx0XCJzYW1wbGVzL2RydW1zL2JhZC1raWNrLndhdlwiLFxuXHRcdFx0XHRcInNhbXBsZXMvZHJ1bXMvYmFkLXNuYXJlLndhdlwiLFxuXHRcdFx0XHRcInNhbXBsZXMvZHJ1bXMvYmFkLWhpaGF0LndhdlwiLFxuXHRcdFx0XVxuXHRcdH0pO1xuXG5cdFx0c3RhdGUuaW5zdHJ1bWVudHMucHVzaCh7XG5cdFx0XHRcImtleVwiOiBcInllcy1kcnVtc1wiLFxuXHRcdFx0XCJ0eXBlXCI6IFwicGVyY3Vzc2l2ZVwiLFxuXHRcdFx0XCJuYW1lXCI6IFwiWWVzIERydW1zXCIsXG5cdFx0XHRcImxhYmVsc1wiOiBbXCJLSUNLXCIsXCJTTkFSRVwiLFwiSEktSEFUIDFcIixcIkhJLUhBVCAyXCIsXCJISS1IQVQgM1wiXSxcblx0XHRcdFwiaWNvblwiOiBcImRydW0uc3ZnXCIsXG5cdFx0XHRcImljb25zXCI6IFtcImtpY2stZHJ1bS5zdmdcIixcInNuYXJlLWRydW0uc3ZnXCIsXCJoaS1oYXQuc3ZnXCIsXCJoaS1oYXQuc3ZnXCIsXCJoaS1oYXQuc3ZnXCJdLFxuXHRcdFx0XCJzYW1wbGVzXCI6IFtcblx0XHRcdFx0XCJzYW1wbGVzL2RydW1zL3llcy1raWNrLm1wM1wiLFxuXHRcdFx0XHRcInNhbXBsZXMvZHJ1bXMveWVzLXNuYXJlLm1wM1wiLFxuXHRcdFx0XHRcInNhbXBsZXMvZHJ1bXMvdGhybC1oYXRfQV9taW5vci53YXZcIixcblx0XHRcdFx0XCJzYW1wbGVzL2RydW1zL3ZpbnlsLWhhdF85MGJwbV9DLndhdlwiLFxuXHRcdFx0XHRcInNhbXBsZXMvZHJ1bXMvcm9jay1oaWhhdC10Y2hpay53YXZcIlxuXHRcdFx0XVxuXHRcdH0pO1xuXG5cdFx0c3RhdGUuaW5zdHJ1bWVudHMucHVzaCh7XG5cdFx0XHRcImtleVwiOiBcImRpdmUtYmFzc1wiLFxuXHRcdFx0XCJ0eXBlXCI6IFwiaGFybW9uaWNcIixcblx0XHRcdFwibmFtZVwiOiBcIkRpdmUgQmFzc1wiLFxuXHRcdFx0XCJzYW1wbGVcIjogXCJzYW1wbGVzL2Jhc3MvdXByaWdodC1iYXNzLWJvbWJkaXZlLm1wM1wiLFxuXHRcdFx0XCJpY29uXCI6IFwiYmFzcy5zdmdcIlxuXHRcdH0pO1xuXG5cdFx0c3RhdGUuaW5zdHJ1bWVudHMucHVzaCh7XG5cdFx0XHRcImtleVwiOiBcImFjb3VzdGljLWJhc3NcIixcblx0XHRcdFwidHlwZVwiOiBcImhhcm1vbmljXCIsXG5cdFx0XHRcIm5hbWVcIjogXCJBY291c3RpYyBCYXNzXCIsXG5cdFx0XHRcInNhbXBsZU5vdGVcIjogXCJGI1wiLFxuXHRcdFx0XCJzYW1wbGVcIjogXCJzYW1wbGVzL2Jhc3MvYWNvdXN0aWNfYmFzc19mX3NoYXJwLm1wM1wiLFxuXHRcdFx0XCJpY29uXCI6IFwiYmFzcy5zdmdcIlxuXHRcdH0pO1xuXG5cdFx0c3RhdGUuaW5zdHJ1bWVudHMucHVzaCh7XG5cdFx0XHRcImtleVwiOiBcInBpYW5vXCIsXG5cdFx0XHRcInR5cGVcIjogXCJoYXJtb25pY1wiLFxuXHRcdFx0XCJuYW1lXCI6IFwiUGlhbm9cIixcblx0XHRcdFwic2FtcGxlXCI6IFwic2FtcGxlcy9waWFuby9waWFuby1jLndhdlwiLFxuXHRcdFx0XCJkZWZhdWx0Vm9sdW1lXCI6IDAuMjUsXG5cdFx0XHRcImljb25cIjogXCJwaWFuby5zdmdcIlxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0YXN5bmMgaW5pdCgpIHtcblx0XHRsZXQgc3RhdGU9dGhpcy5pbml0U3RhdGUoKTtcblx0XHRsZXQgc29uZ0RhdGFKc29uPXdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImhvb2Rtb2RlLXNvbmdzXCIpO1xuXHRcdGlmIChzb25nRGF0YUpzb24pXG5cdFx0XHRzdGF0ZS5zb25ncz1KU09OLnBhcnNlKHNvbmdEYXRhSnNvbik7XG5cblx0XHR0aGlzLmNvbmR1Y3Rvci5zZXRTdGF0ZShzdGF0ZSk7XG5cdFx0YXdhaXQgdGhpcy5jb25kdWN0b3IubG9hZEluc3RydW1lbnRzKCk7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH07XG5cblx0YWRkU29uZyhzdGF0ZSwgbmFtZSkge1xuXHRcdGlmICghbmFtZSB8fCBuYW1lLnRvU3RyaW5nKCk9PVwiW29iamVjdCBNb3VzZUV2ZW50XVwiKVxuXHRcdFx0bmFtZT1cIk15IE5ldyBTb25nXCI7XG5cblx0XHRsZXQgaW5kZXg9c3RhdGUuc29uZ3MubGVuZ3RoO1xuXG5cdFx0c3RhdGUuc29uZ3MucHVzaCh7XG5cdFx0XHRuYW1lOiBuYW1lLFxuXHRcdFx0YnBtOiAxMDAsXG5cdFx0XHRrZXk6IHNob3J0aWQuZ2VuZXJhdGUoKSxcblx0XHRcdG11c2ljS2V5OiBcIkFcIixcblx0XHRcdG1pbm9yOiB0cnVlLFxuXHRcdFx0bGF5ZXJzOiBbXSxcblx0XHRcdGNob3JkU2VxdWVuY2U6IFtdLFxuXHRcdFx0c2VjdGlvbnM6IFtcblx0XHRcdFx0WzBdLFxuXHRcdFx0XHRbMF0sXG5cdFx0XHRcdFswXVxuXHRcdFx0XVxuXHRcdH0pO1xuXG5cdFx0c3RhdGU9dGhpcy5zZXRTb25nSW5kZXgoc3RhdGUsaW5kZXgpO1xuXHRcdHN0YXRlPXRoaXMuYWRkU2VxdWVuY2VDaG9yZChzdGF0ZSk7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRzZXRDdXJyZW50Q2hvcmRJbmRleChzdGF0ZSwgaW5kZXgpIHtcblx0XHRzdGF0ZS5jdXJyZW50Q2hvcmRJbmRleD1pbmRleDtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHNldEN1cnJlbnRTZWN0aW9uSW5kZXgoc3RhdGUsIGluZGV4KSB7XG5cdFx0c3RhdGUuY3VycmVudFNlY3Rpb25JbmRleD1pbmRleDtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdGNsb3NlU29uZyhzdGF0ZSkge1xuXHRcdHN0YXRlLmN1cnJlbnRTb25nSW5kZXg9LTE7XG5cdFx0c3RhdGUuY3VycmVudFNlY3Rpb25JbmRleD0tMTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHNldFNvbmdJbmRleChzdGF0ZSwgaW5kZXgpIHtcblx0XHRpZiAoaW5kZXg9PXN0YXRlLmN1cnJlbnRTb25nSW5kZXgpXG5cdFx0XHRyZXR1cm4gc3RhdGU7XG5cblx0XHRzdGF0ZS5jdXJyZW50U29uZ0luZGV4PWluZGV4O1xuXHRcdHN0YXRlLmN1cnJlbnRMYXllckluZGV4PS0xO1xuXHRcdHN0YXRlLmN1cnJlbnRDaG9yZEluZGV4PTA7XG5cdFx0c3RhdGUuY3VycmVudEdyaWRJbmRleD0tMTtcblx0XHRzdGF0ZS5jdXJyZW50U2VjdGlvbkluZGV4PS0xO1xuXHRcdHN0YXRlLnBsYXlpbmc9ZmFsc2U7XG5cdFx0c3RhdGUucmVjb3JkaW5nPWZhbHNlO1xuXG5cdFx0bGV0IHNvbmc9dGhpcy5oZWxwZXIuZ2V0Q3VycmVudFNvbmcoc3RhdGUpO1xuXHRcdGZvciAobGV0IGk9c29uZy5zZWN0aW9ucy5sZW5ndGgtMTsgaT49MDsgaS0tKVxuXHRcdFx0aWYgKHNvbmcuc2VjdGlvbnNbaV0ubGVuZ3RoPjEpXG5cdFx0XHRcdHN0YXRlLmN1cnJlbnRTZWN0aW9uSW5kZXg9aTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHNob3dTZXR0aW5ncyhzdGF0ZSkge1xuXHRcdHN0YXRlLnNldHRpbmdzVmlzaWJsZT10cnVlO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0aGlkZVNldHRpbmdzKHN0YXRlKSB7XG5cdFx0c3RhdGUuc2V0dGluZ3NWaXNpYmxlPWZhbHNlO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0dG9nZ2xlU2V0dGluZ3Moc3RhdGUpIHtcblx0XHRzdGF0ZS5zZXR0aW5nc1Zpc2libGU9IXN0YXRlLnNldHRpbmdzVmlzaWJsZTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHNldEN1cnJlbnRTb25nTmFtZShzdGF0ZSwgbmFtZSkge1xuXHRcdHN0YXRlLnNvbmdzW3N0YXRlLmN1cnJlbnRTb25nSW5kZXhdLm5hbWU9bmFtZTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHNldEN1cnJlbnRTb25nQnBtKHN0YXRlLCBicG0pIHtcblx0XHRicG09cGFyc2VJbnQoYnBtKTtcblx0XHRpZiAoaXNOYU4oYnBtKSlcblx0XHRcdGJwbT0xMDA7XG5cblx0XHRpZiAoYnBtPDUwKVxuXHRcdFx0YnBtPTUwO1xuXG5cdFx0aWYgKGJwbT4yMDApXG5cdFx0XHRicG09MjAwO1xuXG5cdFx0c3RhdGUuc29uZ3Nbc3RhdGUuY3VycmVudFNvbmdJbmRleF0uYnBtPWJwbTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHNldEN1cnJlbnRTb25nTXVzaWNLZXkoc3RhdGUsIG11c2ljS2V5KSB7XG5cdFx0c3RhdGUuc29uZ3Nbc3RhdGUuY3VycmVudFNvbmdJbmRleF0ubXVzaWNLZXk9bXVzaWNLZXk7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRzZXRDdXJyZW50U29uZ01pbm9yKHN0YXRlLCBtaW5vcikge1xuXHRcdHN0YXRlLnNvbmdzW3N0YXRlLmN1cnJlbnRTb25nSW5kZXhdLm1pbm9yPW1pbm9yO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0ZGVsZXRlQ3VycmVudFNvbmcoc3RhdGUpIHtcblx0XHRzdGF0ZS5zb25ncy5zcGxpY2Uoc3RhdGUuY3VycmVudFNvbmdJbmRleCwxKTtcblx0XHRzdGF0ZS5jdXJyZW50U29uZ0luZGV4PS0xO1xuXHRcdHN0YXRlLnNldHRpbmdzVmlzaWJsZT1mYWxzZTtcblx0XHRzdGF0ZS5jdXJyZW50U2VjdGlvbkluZGV4PS0xO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0c2hvd0FkZExheWVyKHN0YXRlKSB7XG5cdFx0c3RhdGUuYWRkTGF5ZXJWaXNpYmxlPXRydWU7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRoaWRlQWRkTGF5ZXIoc3RhdGUpIHtcblx0XHRzdGF0ZS5hZGRMYXllclZpc2libGU9ZmFsc2U7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRhZGRTZXF1ZW5jZUNob3JkKHN0YXRlKSB7XG5cdFx0bGV0IHNvbmc9dGhpcy5oZWxwZXIuZ2V0Q3VycmVudFNvbmcoc3RhdGUpO1xuXG5cdFx0c29uZy5jaG9yZFNlcXVlbmNlLnB1c2goe1xuXHRcdFx0Y2hvcmRJbmRleDogMCxcblx0XHRcdGtleTogc2hvcnRpZC5nZW5lcmF0ZSgpXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRhZGRMYXllcihzdGF0ZSwgaW5zdHJ1bWVudE5hbWUpIHtcblx0XHRsZXQgc29uZz1zdGF0ZS5zb25nc1tzdGF0ZS5jdXJyZW50U29uZ0luZGV4XTtcblxuXHRcdGxldCBzZXE9W107XG5cdFx0bGV0IG51bVNvdW5kcz10aGlzLmhlbHBlci5nZXRJbnN0cnVtZW50TnVtU291bmRzQnlOYW1lKHN0YXRlLGluc3RydW1lbnROYW1lKTtcblx0XHRsZXQgaW5zdHJ1bWVudD10aGlzLmhlbHBlci5nZXRJbnN0cnVtZW50QnlOYW1lKHN0YXRlLGluc3RydW1lbnROYW1lKTtcblxuXHRcdGxldCB2b2x1bWU9MTtcblx0XHRpZiAoaW5zdHJ1bWVudC5oYXNPd25Qcm9wZXJ0eShcImRlZmF1bHRWb2x1bWVcIikpXG5cdFx0XHR2b2x1bWU9aW5zdHJ1bWVudC5kZWZhdWx0Vm9sdW1lO1xuXG5cdFx0Zm9yIChsZXQgaT0wOyBpPDE2OyBpKyspXG5cdFx0XHRzZXEucHVzaCh7XG5cdFx0XHRcdHNvdW5kczogW10sXG5cdFx0XHRcdHZlbDogMSxcblx0XHRcdFx0c3RhY2M6IGZhbHNlXG5cdFx0XHR9KTtcblxuXHRcdGxldCBsYXllcj17XG5cdFx0XHRrZXk6IHNob3J0aWQuZ2VuZXJhdGUoKSxcblx0XHRcdGluc3RydW1lbnROYW1lOiBpbnN0cnVtZW50TmFtZSxcblx0XHRcdGF1ZGlibGU6IHRydWUsXG5cdFx0XHR2b2x1bWU6IHZvbHVtZSxcblx0XHRcdHNlcTogc2VxLFxuXHRcdH07XG5cblx0XHRzb25nLmxheWVycy5wdXNoKGxheWVyKTtcblxuXHRcdHN0YXRlLmFkZExheWVyVmlzaWJsZT1mYWxzZTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHNldExheWVySW5kZXgoc3RhdGUsIGluZGV4KSB7XG5cdFx0c3RhdGUuY3VycmVudExheWVySW5kZXg9aW5kZXg7XG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0aGlkZUN1cnJlbnRMYXllcihzdGF0ZSkge1xuXHRcdHN0YXRlLmN1cnJlbnRMYXllckluZGV4PS0xO1xuXHRcdHN0YXRlLmN1cnJlbnRHcmlkSW5kZXg9LTE7XG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0dG9nZ2xlTGF5ZXJBdWRpYmxlKHN0YXRlLCBsYXllckluZGV4KSB7XG5cdFx0bGV0IHNvbmc9dGhpcy5oZWxwZXIuZ2V0Q3VycmVudFNvbmcoc3RhdGUpO1xuXHRcdHNvbmcubGF5ZXJzW2xheWVySW5kZXhdLmF1ZGlibGU9IXNvbmcubGF5ZXJzW2xheWVySW5kZXhdLmF1ZGlibGU7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRkZWxldGVDdXJyZW50TGF5ZXIoc3RhdGUpIHtcblx0XHRsZXQgc29uZz10aGlzLmhlbHBlci5nZXRDdXJyZW50U29uZyhzdGF0ZSk7XG5cdFx0c29uZy5sYXllcnMuc3BsaWNlKHN0YXRlLmN1cnJlbnRMYXllckluZGV4LDEpO1xuXHRcdHN0YXRlLmN1cnJlbnRMYXllckluZGV4PS0xO1xuXHRcdHN0YXRlLmN1cnJlbnRHcmlkSW5kZXg9LTE7XG5cdFx0c3RhdGUuc2V0dGluZ3NWaXNpYmxlPWZhbHNlO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0c2V0Q3VycmVudExheWVyVm9sdW1lKHN0YXRlLCB2b2x1bWUpIHtcblx0XHRsZXQgbGF5ZXI9dGhpcy5oZWxwZXIuZ2V0Q3VycmVudExheWVyKHN0YXRlKTtcblx0XHRsYXllci52b2x1bWU9cGFyc2VGbG9hdCh2b2x1bWUpO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0cGxheUNsaWNrKHN0YXRlKSB7XG5cdFx0c3RhdGUucGxheWluZz0hc3RhdGUucGxheWluZztcblx0XHRzdGF0ZS5jdXJyZW50R3JpZEluZGV4PS0xO1xuXG5cdFx0aWYgKCFzdGF0ZS5wbGF5aW5nKVxuXHRcdFx0c3RhdGUucmVjb3JkaW5nPWZhbHNlO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0cmVjb3JkQ2xpY2soc3RhdGUpIHtcblx0XHRzdGF0ZS5yZWNvcmRpbmc9IXN0YXRlLnJlY29yZGluZztcblx0XHRzdGF0ZS5jdXJyZW50R3JpZEluZGV4PS0xO1xuXG5cdFx0aWYgKHN0YXRlLnJlY29yZGluZyAmJiAhc3RhdGUucGxheWluZylcblx0XHRcdHN0YXRlLnBsYXlpbmc9dHJ1ZTtcblxuXHRcdGlmICghc3RhdGUucGxheWluZylcblx0XHRcdHN0YXRlLmN1cnJlbnRHcmlkSW5kZXg9LTE7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRkZWxldGVTZXF1ZW5jZUNob3JkKHN0YXRlLCBpbmRleCkge1xuXHRcdGxldCBzb25nPXRoaXMuaGVscGVyLmdldEN1cnJlbnRTb25nKHN0YXRlKTtcblx0XHRzb25nLmNob3JkU2VxdWVuY2Uuc3BsaWNlKGluZGV4LDEpO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0c2V0U2VxdWVuY2VDaG9yZChzdGF0ZSwgc2VxdWVuY2VJbmRleCwgY2hvcmRJbmRleCkge1xuXHRcdGxldCBzb25nPXRoaXMuaGVscGVyLmdldEN1cnJlbnRTb25nKHN0YXRlKTtcblx0XHRzb25nLmNob3JkU2VxdWVuY2Vbc2VxdWVuY2VJbmRleF0uY2hvcmRJbmRleD1jaG9yZEluZGV4O1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0Z29CYWNrKHN0YXRlKSB7XG5cdFx0aWYgKHN0YXRlLnNldHRpbmdzVmlzaWJsZSlcblx0XHRcdHJldHVybiB0aGlzLmhpZGVTZXR0aW5ncyhzdGF0ZSk7XG5cblx0XHRlbHNlIGlmIChzdGF0ZS5jdXJyZW50TGF5ZXJJbmRleD49MCkge1xuXHRcdFx0c3RhdGUuY3VycmVudExheWVySW5kZXg9LTE7XG5cdFx0XHRzdGF0ZS5jdXJyZW50R3JpZEluZGV4PS0xO1xuXHRcdFx0cmV0dXJuIHN0YXRlO1xuXHRcdH1cblxuXHRcdGVsc2UgaWYgKHN0YXRlLmFkZExheWVyVmlzaWJsZSlcblx0XHRcdHJldHVybiB0aGlzLmhpZGVBZGRMYXllcihzdGF0ZSk7XG5cblx0XHRlbHNlIGlmICh0aGlzLmhlbHBlci5pc1NvbmdPcGVuKHN0YXRlKSlcblx0XHRcdHJldHVybiB0aGlzLmNsb3NlU29uZyhzdGF0ZSlcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdGdyaWRJbmRleENsaWNrKHN0YXRlLCBuZXdHcmlkSW5kZXgpIHtcblx0XHRzdGF0ZS5wbGF5aW5nPWZhbHNlO1xuXHRcdHN0YXRlLnJlY29yZGluZz1mYWxzZTtcblxuXHRcdGlmIChzdGF0ZS5jdXJyZW50R3JpZEluZGV4PT1uZXdHcmlkSW5kZXgpXG5cdFx0XHRzdGF0ZS5jdXJyZW50R3JpZEluZGV4PS0xO1xuXG5cdFx0ZWxzZVxuXHRcdFx0c3RhdGUuY3VycmVudEdyaWRJbmRleD1uZXdHcmlkSW5kZXg7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHR0b2dnbGVDdXJyZW50TGF5ZXJTdGFjYyhzdGF0ZSkge1xuXHRcdGxldCBsYXllcj10aGlzLmhlbHBlci5nZXRDdXJyZW50TGF5ZXIoc3RhdGUpO1xuXHRcdGxldCBncmlkSW5kZXg9c3RhdGUuY3VycmVudEdyaWRJbmRleDtcblxuXHRcdGlmIChzdGF0ZS5yZWNvcmRpbmcpXG5cdFx0XHRncmlkSW5kZXg9dGhpcy5jb25kdWN0b3IuZ2V0UGxheUdyaWRJbmRleCgpO1xuXG5cdFx0aWYgKGdyaWRJbmRleDwwKVxuXHRcdFx0cmV0dXJuIHN0YXRlO1xuXG5cdFx0bGF5ZXIuc2VxW2dyaWRJbmRleF0uc3RhY2M9IWxheWVyLnNlcVtncmlkSW5kZXhdLnN0YWNjO1xuXHRcdGlmIChsYXllci5zZXFbZ3JpZEluZGV4XS5zdGFjYylcblx0XHRcdGxheWVyLnNlcVtncmlkSW5kZXhdLnNvdW5kcz1bXTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHNldEN1cnJlbnRMYXllclZlbChzdGF0ZSwgdmVsKSB7XG5cdFx0bGV0IGxheWVyPXRoaXMuaGVscGVyLmdldEN1cnJlbnRMYXllcihzdGF0ZSk7XG5cdFx0bGV0IGdyaWRJbmRleD1zdGF0ZS5jdXJyZW50R3JpZEluZGV4O1xuXG5cdFx0aWYgKHN0YXRlLnJlY29yZGluZylcblx0XHRcdGdyaWRJbmRleD10aGlzLmNvbmR1Y3Rvci5nZXRQbGF5R3JpZEluZGV4KCk7XG5cblx0XHRpZiAoZ3JpZEluZGV4PDApXG5cdFx0XHRyZXR1cm4gc3RhdGU7XG5cblx0XHRsYXllci5zZXFbZ3JpZEluZGV4XS52ZWw9dmVsO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0c2V0R3JpZFNvdW5kKHN0YXRlLCBncmlkSW5kZXgsIHNvdW5kSW5kZXgsIGVuYWJsZWQpIHtcblx0XHRsZXQgbGF5ZXI9dGhpcy5oZWxwZXIuZ2V0Q3VycmVudExheWVyKHN0YXRlKTtcblx0XHRsZXQgY3VycmVudEVuYWJsZWQ9XG5cdFx0XHRsYXllci5zZXFbZ3JpZEluZGV4XS5zb3VuZHMuaW5jbHVkZXMoc291bmRJbmRleCk7XG5cblx0XHRpZiAoZW5hYmxlZD09Y3VycmVudEVuYWJsZWQpXG5cdFx0XHRyZXR1cm4gc3RhdGU7XG5cblx0XHRpZiAoZW5hYmxlZCkge1xuXHRcdFx0bGF5ZXIuc2VxW2dyaWRJbmRleF0uc291bmRzLnB1c2goc291bmRJbmRleCk7XG5cdFx0XHRsYXllci5zZXFbZ3JpZEluZGV4XS5zdGFjYz1mYWxzZTtcblx0XHR9XG5cblx0XHRlbHNlIHtcblx0XHRcdGxheWVyLnNlcVtncmlkSW5kZXhdLnNvdW5kcy5zcGxpY2UoXG5cdFx0XHRcdGxheWVyLnNlcVtncmlkSW5kZXhdLnNvdW5kcy5pbmRleE9mKHNvdW5kSW5kZXgpLFxuXHRcdFx0XHQxXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHNldEN1cnJlbnRHcmlkU291bmQoc3RhdGUsIHNvdW5kSW5kZXgsIGVuYWJsZWQpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRHcmlkU291bmQoc3RhdGUsc3RhdGUuY3VycmVudEdyaWRJbmRleCxzb3VuZEluZGV4LGVuYWJsZWQpO1xuXHR9XG5cblx0c291bmRCdXR0b25DbGljayhzdGF0ZSwgc291bmRJbmRleCkge1xuXHRcdGlmIChzdGF0ZS5yZWNvcmRpbmcpIHtcblx0XHRcdHRoaXMuY29uZHVjdG9yLnBsYXlMYXllckluc3RydW1lbnQoc291bmRJbmRleCk7XG5cblx0XHRcdGxldCBncmlkSW5kZXg9dGhpcy5jb25kdWN0b3IuZ2V0UGxheUdyaWRJbmRleCgpO1xuXHRcdFx0c3RhdGU9dGhpcy5zZXRHcmlkU291bmQoc3RhdGUsZ3JpZEluZGV4LHNvdW5kSW5kZXgsdHJ1ZSk7XG5cblx0XHRcdHJldHVybiBzdGF0ZTtcblx0XHR9XG5cblx0XHRpZiAoc3RhdGUuY3VycmVudEdyaWRJbmRleDwwKSB7XG5cdFx0XHR0aGlzLmNvbmR1Y3Rvci5wbGF5TGF5ZXJJbnN0cnVtZW50KHNvdW5kSW5kZXgpO1xuXHRcdFx0cmV0dXJuIHN0YXRlO1xuXHRcdH1cblxuXHRcdGxldCBsYXllcj10aGlzLmhlbHBlci5nZXRDdXJyZW50TGF5ZXIoc3RhdGUpO1xuXHRcdGxldCBlbmFibGVkPWxheWVyLnNlcVtzdGF0ZS5jdXJyZW50R3JpZEluZGV4XS5zb3VuZHMuaW5jbHVkZXMoc291bmRJbmRleCk7XG5cdFx0c3RhdGU9dGhpcy5zZXRDdXJyZW50R3JpZFNvdW5kKHN0YXRlLHNvdW5kSW5kZXgsIWVuYWJsZWQpO1xuXG5cdFx0aWYgKGxheWVyLnNlcVtzdGF0ZS5jdXJyZW50R3JpZEluZGV4XS5zb3VuZHMuaW5jbHVkZXMoc291bmRJbmRleCkpXG5cdFx0XHR0aGlzLmNvbmR1Y3Rvci5wbGF5TGF5ZXJJbnN0cnVtZW50KHNvdW5kSW5kZXgpO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0Y2hvcmRCdXR0b25DbGljayhzdGF0ZSwgb2N0YXZlKSB7XG5cdFx0bGV0IGluc3RydW1lbnQ9dGhpcy5oZWxwZXIuZ2V0Q3VycmVudEluc3RydW1lbnQoc3RhdGUpO1xuXG5cdFx0aWYgKHN0YXRlLnJlY29yZGluZykge1xuXHRcdFx0dGhpcy5jb25kdWN0b3IucGxheUxheWVySW5zdHJ1bWVudChvY3RhdmUqMyk7XG5cdFx0XHR0aGlzLmNvbmR1Y3Rvci5wbGF5TGF5ZXJJbnN0cnVtZW50KG9jdGF2ZSozKzEpO1xuXHRcdFx0dGhpcy5jb25kdWN0b3IucGxheUxheWVySW5zdHJ1bWVudChvY3RhdmUqMysyKTtcblxuXHRcdFx0bGV0IGdyaWRJbmRleD10aGlzLmNvbmR1Y3Rvci5nZXRQbGF5R3JpZEluZGV4KCk7XG5cdFx0XHRzdGF0ZT10aGlzLnNldEdyaWRTb3VuZChzdGF0ZSxncmlkSW5kZXgsb2N0YXZlKjMsdHJ1ZSk7XG5cdFx0XHRzdGF0ZT10aGlzLnNldEdyaWRTb3VuZChzdGF0ZSxncmlkSW5kZXgsb2N0YXZlKjMrMSx0cnVlKTtcblx0XHRcdHN0YXRlPXRoaXMuc2V0R3JpZFNvdW5kKHN0YXRlLGdyaWRJbmRleCxvY3RhdmUqMysyLHRydWUpO1xuXG5cdFx0XHRyZXR1cm4gc3RhdGU7XG5cdFx0fVxuXG5cdFx0aWYgKHN0YXRlLmN1cnJlbnRHcmlkSW5kZXg8MCkge1xuXHRcdFx0dGhpcy5jb25kdWN0b3IucGxheUxheWVySW5zdHJ1bWVudChvY3RhdmUqMyk7XG5cdFx0XHR0aGlzLmNvbmR1Y3Rvci5wbGF5TGF5ZXJJbnN0cnVtZW50KG9jdGF2ZSozKzEpO1xuXHRcdFx0dGhpcy5jb25kdWN0b3IucGxheUxheWVySW5zdHJ1bWVudChvY3RhdmUqMysyKTtcblx0XHRcdHJldHVybiBzdGF0ZTtcblx0XHR9XG5cblx0XHRsZXQgbGF5ZXI9dGhpcy5oZWxwZXIuZ2V0Q3VycmVudExheWVyKHN0YXRlKTtcblx0XHRpZiAodGhpcy5oZWxwZXIuY3VycmVudExheWVySGFzQ2hvcmRBdChzdGF0ZSxzdGF0ZS5jdXJyZW50R3JpZEluZGV4LG9jdGF2ZSkpIHtcblx0XHRcdHN0YXRlPXRoaXMuc2V0Q3VycmVudEdyaWRTb3VuZChzdGF0ZSxvY3RhdmUqMyxmYWxzZSk7XG5cdFx0XHRzdGF0ZT10aGlzLnNldEN1cnJlbnRHcmlkU291bmQoc3RhdGUsb2N0YXZlKjMrMSxmYWxzZSk7XG5cdFx0XHRzdGF0ZT10aGlzLnNldEN1cnJlbnRHcmlkU291bmQoc3RhdGUsb2N0YXZlKjMrMixmYWxzZSk7XG5cdFx0fVxuXG5cdFx0ZWxzZSB7XG5cdFx0XHRzdGF0ZT10aGlzLnNldEN1cnJlbnRHcmlkU291bmQoc3RhdGUsb2N0YXZlKjMsdHJ1ZSk7XG5cdFx0XHRzdGF0ZT10aGlzLnNldEN1cnJlbnRHcmlkU291bmQoc3RhdGUsb2N0YXZlKjMrMSx0cnVlKTtcblx0XHRcdHN0YXRlPXRoaXMuc2V0Q3VycmVudEdyaWRTb3VuZChzdGF0ZSxvY3RhdmUqMysyLHRydWUpO1xuXHRcdFx0dGhpcy5jb25kdWN0b3IucGxheUxheWVySW5zdHJ1bWVudChvY3RhdmUqMyk7XG5cdFx0XHR0aGlzLmNvbmR1Y3Rvci5wbGF5TGF5ZXJJbnN0cnVtZW50KG9jdGF2ZSozKzEpO1xuXHRcdFx0dGhpcy5jb25kdWN0b3IucGxheUxheWVySW5zdHJ1bWVudChvY3RhdmUqMysyKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRhZGRTZWN0aW9uQ2hvcmQoc3RhdGUpIHtcblx0XHRsZXQgc29uZz10aGlzLmhlbHBlci5nZXRDdXJyZW50U29uZyhzdGF0ZSk7XG5cdFx0c29uZy5zZWN0aW9uc1tzdGF0ZS5jdXJyZW50U2VjdGlvbkluZGV4XS5wdXNoKDApO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0c2hvd0VkaXRTZWN0aW9uQ2hvcmQoc3RhdGUsaW5kZXgpIHtcblx0XHRzdGF0ZS5lZGl0U2VjdGlvbkNob3JkVmlzaWJsZT1pbmRleDtcblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRoaWRlRWRpdFNlY3Rpb25DaG9yZChzdGF0ZSxpbmRleCkge1xuXHRcdHN0YXRlLmVkaXRTZWN0aW9uQ2hvcmRWaXNpYmxlPS0xO1xuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHJlbW92ZVNlY3Rpb25DaG9yZChzdGF0ZSkge1xuXHRcdGxldCBzb25nPXRoaXMuaGVscGVyLmdldEN1cnJlbnRTb25nKHN0YXRlKTtcblx0XHRzb25nLnNlY3Rpb25zW3N0YXRlLmN1cnJlbnRTZWN0aW9uSW5kZXhdLnNwbGljZShzdGF0ZS5lZGl0U2VjdGlvbkNob3JkVmlzaWJsZSwxKTtcblxuXHRcdHN0YXRlLmVkaXRTZWN0aW9uQ2hvcmRWaXNpYmxlPS0xO1xuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdGVkaXRTZWN0aW9uQ2hvcmQoc3RhdGUsIGluZGV4KSB7XG5cdFx0bGV0IHNvbmc9dGhpcy5oZWxwZXIuZ2V0Q3VycmVudFNvbmcoc3RhdGUpO1xuXHRcdHNvbmcuc2VjdGlvbnNbc3RhdGUuY3VycmVudFNlY3Rpb25JbmRleF1bc3RhdGUuZWRpdFNlY3Rpb25DaG9yZFZpc2libGVdPWluZGV4O1xuXHRcdHN0YXRlLmVkaXRTZWN0aW9uQ2hvcmRWaXNpYmxlPS0xO1xuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxufVxuIiwiaW1wb3J0IE11c2ljVXRpbCBmcm9tICcuLi91dGlscy9NdXNpY1V0aWwuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBIZWxwZXIge1xuXHRjb25zdHJ1Y3Rvcihjb25kdWN0b3IpIHtcblx0XHR0aGlzLmNvbmR1Y3Rvcj1jb25kdWN0b3I7XG5cdH1cblxuXHRnZXRDdXJyZW50U29uZyhzdGF0ZSkge1xuXHRcdHJldHVybiBzdGF0ZS5zb25nc1tzdGF0ZS5jdXJyZW50U29uZ0luZGV4XTtcblx0fVxuXG5cdGdldEN1cnJlbnRMYXllcihzdGF0ZSkge1xuXHRcdHJldHVybiBzdGF0ZS5zb25nc1tzdGF0ZS5jdXJyZW50U29uZ0luZGV4XS5sYXllcnNbc3RhdGUuY3VycmVudExheWVySW5kZXhdO1xuXHR9XG5cblx0Z2V0SW5zdHJ1bWVudEJ5TmFtZShzdGF0ZSwgbmFtZSkge1xuXHRcdGZvciAobGV0IGluc3RydW1lbnQgb2Ygc3RhdGUuaW5zdHJ1bWVudHMpXG5cdFx0XHRpZiAoaW5zdHJ1bWVudC5uYW1lPT1uYW1lKVxuXHRcdFx0XHRyZXR1cm4gaW5zdHJ1bWVudDtcblx0fVxuXG5cdGdldEluc3RydW1lbnROdW1Tb3VuZHNCeU5hbWUoc3RhdGUsIG5hbWUpIHtcblx0XHRsZXQgaW5zdHJ1bWVudD10aGlzLmdldEluc3RydW1lbnRCeU5hbWUoc3RhdGUsbmFtZSk7XG5cblx0XHRzd2l0Y2ggKGluc3RydW1lbnQudHlwZSkge1xuXHRcdFx0Y2FzZSBcImhhcm1vbmljXCI6XG5cdFx0XHRcdHJldHVybiA5O1xuXG5cdFx0XHRjYXNlIFwicGVyY3Vzc2l2ZVwiOlxuXHRcdFx0XHRyZXR1cm4gaW5zdHJ1bWVudC5sYWJlbHMubGVuZ3RoO1xuXHRcdH1cblx0fVxuXG5cdGdldEN1cnJlbnRJbnN0cnVtZW50KHN0YXRlKSB7XG5cdFx0bGV0IGxheWVyPXRoaXMuZ2V0Q3VycmVudExheWVyKHN0YXRlKTtcblx0XHRyZXR1cm4gdGhpcy5nZXRJbnN0cnVtZW50QnlOYW1lKHN0YXRlLGxheWVyLmluc3RydW1lbnROYW1lKTtcblx0fVxuXG5cdGdldEN1cnJlbnRJbnN0cnVtZW50U291bmRMYWJlbHMoc3RhdGUpIHtcblx0XHRsZXQgaW5zdHJ1bWVudD10aGlzLmdldEN1cnJlbnRJbnN0cnVtZW50KHN0YXRlKTtcblxuXHRcdHN3aXRjaCAoaW5zdHJ1bWVudC50eXBlKSB7XG5cdFx0XHRjYXNlIFwiaGFybW9uaWNcIjpcblx0XHRcdFx0cmV0dXJuIFtcIlQxXCIsXCJUMlwiLFwiVDNcIixcIk8tVDFcIixcIk8tVDJcIixcIk8tVDNcIl07XG5cblx0XHRcdGNhc2UgXCJwZXJjdXNzaXZlXCI6XG5cdFx0XHRcdHJldHVybiBpbnN0cnVtZW50LmxhYmVscztcblx0XHR9XG5cdH1cblxuXHRnZXRDaG9yZExhYmVscyhzdGF0ZSkge1xuXHRcdGxldCBzb25nPXRoaXMuZ2V0Q3VycmVudFNvbmcoc3RhdGUpO1xuXHRcdHJldHVybiBNdXNpY1V0aWwuZ2V0Q2hvcmROYW1lc0ZvclNjYWxlKHNvbmcubXVzaWNLZXksc29uZy5taW5vcik7XG5cdH1cblxuXHRnZXRDdXJyZW50U2VjdGlvbkNob3JkTGFiZWxzKHN0YXRlKSB7XG5cdFx0bGV0IHNvbmc9dGhpcy5nZXRDdXJyZW50U29uZyhzdGF0ZSk7XG5cdFx0bGV0IGNob3JkTmFtZXM9TXVzaWNVdGlsLmdldENob3JkTmFtZXNGb3JTY2FsZShzb25nLm11c2ljS2V5LHNvbmcubWlub3IpO1xuXHRcdGxldCBzZWN0aW9uPXNvbmcuc2VjdGlvbnNbc3RhdGUuY3VycmVudFNlY3Rpb25JbmRleF07XG5cdFx0bGV0IGE9W107XG5cblx0XHRmb3IgKGxldCBpIG9mIHNlY3Rpb24pXG5cdFx0XHRhLnB1c2goY2hvcmROYW1lc1tpXSk7XG5cblx0XHRyZXR1cm4gYTtcblx0fVxuXG5cdGdldE5vdGVzU2VsZWN0T3B0aW9ucyhzdGF0ZSkge1xuXHRcdGxldCBhPVtdO1xuXG5cdFx0Zm9yIChsZXQgbm90ZU5hbWUgb2YgTXVzaWNVdGlsLk5PVEVfTkFNRVMpXG5cdFx0XHRhLnB1c2goe1xuXHRcdFx0XHRrZXk6IG5vdGVOYW1lLCBsYWJlbDogbm90ZU5hbWVcblx0XHRcdH0pO1xuXG5cdFx0cmV0dXJuIGE7XG5cdH1cblxuXHRnZXRDaG9yZE9wdGlvbnMoc3RhdGUpIHtcblx0XHRsZXQgc29uZz10aGlzLmdldEN1cnJlbnRTb25nKHN0YXRlKTtcblx0XHRsZXQgY2hvcmROYW1lcz1NdXNpY1V0aWwuZ2V0Q2hvcmROYW1lc0ZvclNjYWxlKHNvbmcubXVzaWNLZXksc29uZy5taW5vcik7XG5cdFx0bGV0IGE9W107XG5cblx0XHRmb3IgKGxldCBjaG9yZE5hbWUgb2YgY2hvcmROYW1lcylcblx0XHRcdGEucHVzaCh7XG5cdFx0XHRcdGtleTogY2hvcmROYW1lLFxuXHRcdFx0XHRsYWJlbDogY2hvcmROYW1lXG5cdFx0XHR9KTtcblxuXHRcdHJldHVybiBhO1xuXHR9XG5cblx0Z2V0TW9kYWxTZWxlY3RPcHRpb25zKHN0YXRlKSB7XG5cdFx0cmV0dXJuIFtcblx0XHRcdHtrZXk6IGZhbHNlLCBsYWJlbDogXCJtYWpvclwifSxcblx0XHRcdHtrZXk6IHRydWUsIGxhYmVsOiBcIm1pbm9yXCJ9LFxuXHRcdF07XG5cdH1cblxuXHRjdXJyZW50TGF5ZXJIYXNTb3VuZEF0KHN0YXRlLCBncmlkSW5kZXgpIHtcblx0XHRsZXQgbGF5ZXI9dGhpcy5nZXRDdXJyZW50TGF5ZXIoc3RhdGUpO1xuXG5cdFx0aWYgKGxheWVyLnNlcVtncmlkSW5kZXhdLnNvdW5kcy5sZW5ndGg+MClcblx0XHRcdHJldHVybiB0cnVlO1xuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Y3VycmVudExheWVySGFzQ2hvcmRBdChzdGF0ZSwgZ3JpZEluZGV4LCBvY3RhdmUpIHtcblx0XHRsZXQgbGF5ZXI9dGhpcy5nZXRDdXJyZW50TGF5ZXIoc3RhdGUpO1xuXG5cdFx0Zm9yIChsZXQgaT0wOyBpPDM7IGkrKylcblx0XHRcdGlmICghbGF5ZXIuc2VxW2dyaWRJbmRleF0uc291bmRzLmluY2x1ZGVzKG9jdGF2ZSozK2kpKVxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdGlzU29uZ09wZW4oc3RhdGUpIHtcblx0XHRyZXR1cm4gKHN0YXRlLmN1cnJlbnRTb25nSW5kZXg+PTApO1xuXHR9XG59XG4iLCJpbXBvcnQgQXVkaW9VdGlsIGZyb20gJy4uL3V0aWxzL0F1ZGlvVXRpbCc7XG5pbXBvcnQgUmVjb25jaWxlQXJyYXkgZnJvbSAnLi4vdXRpbHMvUmVjb25jaWxlQXJyYXknO1xuaW1wb3J0IENvbmR1Y3RvckxheWVyIGZyb20gJy4vQ29uZHVjdG9yTGF5ZXInO1xuaW1wb3J0IENvbmR1Y3Rvckluc3RydW1lbnQgZnJvbSAnLi9Db25kdWN0b3JJbnN0cnVtZW50JztcbmltcG9ydCBNdXNpY1V0aWwgZnJvbSAnLi4vdXRpbHMvTXVzaWNVdGlsJztcbmltcG9ydCBBdWRpb1RpbWVyIGZyb20gJy4uL3V0aWxzL0F1ZGlvVGltZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25kdWN0b3Ige1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRsZXQgQXVkaW9Db250ZXh0PXdpbmRvdy5BdWRpb0NvbnRleHQ7XG5cblx0XHRpZiAoIUF1ZGlvQ29udGV4dClcblx0XHRcdEF1ZGlvQ29udGV4dD13aW5kb3cud2Via2l0QXVkaW9Db250ZXh0O1xuXG5cdFx0aWYgKCFBdWRpb0NvbnRleHQpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJubyB3ZWIgYXVkaW8hXCIpO1xuXG5cdFx0dGhpcy5hdWRpb0NvbnRleHQ9bmV3IEF1ZGlvQ29udGV4dCgpO1xuXHRcdHRoaXMuYXVkaW9UaW1lcj1uZXcgQXVkaW9UaW1lcih0aGlzLmF1ZGlvQ29udGV4dCk7XG5cdFx0dGhpcy5hdWRpb1RpbWVyLm9uVGljaz10aGlzLm9uUGxheVRpY2s7XG5cblx0XHR0aGlzLmluc3RydW1lbnRzPVJlY29uY2lsZUFycmF5LmNyZWF0ZVdpdGhGYWN0b3J5KHRoaXMuY3JlYXRlSW5zdHJ1bWVudCk7XG5cdFx0dGhpcy5sYXllcnM9UmVjb25jaWxlQXJyYXkuY3JlYXRlV2l0aEZhY3RvcnkodGhpcy5jcmVhdGVMYXllcik7XG5cdFx0dGhpcy5jdXJyZW50Tm90ZXM9W107XG5cdFx0dGhpcy5wbGF5aW5nU2VxdWVuY2VJbmRleD0tMTtcblx0XHR0aGlzLnBsYXlpbmdTZXF1ZW5jZUNob3JkSW5kZXg9LTE7XG5cdH1cblxuXHRsb2FkSW5zdHJ1bWVudHMoKSB7XG5cdFx0bGV0IHByb21pc2VzPVtdO1xuXHRcdGZvciAobGV0IGluc3RydW1lbnQgb2YgdGhpcy5pbnN0cnVtZW50cy5nZXRJdGVtcygpKVxuXHRcdFx0cHJvbWlzZXMucHVzaChpbnN0cnVtZW50LmxvYWQoKSk7XG5cblx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuXHR9XG5cblx0Y3JlYXRlTGF5ZXI9KGRhdGEpPT57XG5cdFx0cmV0dXJuIG5ldyBDb25kdWN0b3JMYXllcih0aGlzLGRhdGEpO1xuXHR9O1xuXG5cdGNyZWF0ZUluc3RydW1lbnQ9KGRhdGEpPT57XG5cdFx0cmV0dXJuIG5ldyBDb25kdWN0b3JJbnN0cnVtZW50KHRoaXMsZGF0YSk7XG5cdH07XG5cblx0Z2V0Q29uZHVjdG9ySW5zdHJ1bWVudEJ5TmFtZShuYW1lKSB7XG5cdFx0Zm9yIChsZXQgaW5zdHJ1bWVudCBvZiB0aGlzLmluc3RydW1lbnRzLmdldEl0ZW1zKCkpIHtcblx0XHRcdGlmIChpbnN0cnVtZW50LmdldE5hbWUoKT09bmFtZSlcblx0XHRcdFx0cmV0dXJuIGluc3RydW1lbnQ7XG5cdFx0fVxuXHR9XG5cblx0Z2V0Q3VycmVudENvbmR1Y3RvckxheWVyKCkge1xuXHRcdGxldCBzdGF0ZT10aGlzLnN0YXRlO1xuXHRcdGxldCBrZXk9c3RhdGUuc29uZ3Nbc3RhdGUuY3VycmVudFNvbmdJbmRleF0ubGF5ZXJzW3N0YXRlLmN1cnJlbnRMYXllckluZGV4XS5rZXk7XG5cblx0XHRyZXR1cm4gdGhpcy5sYXllcnMuZ2V0SXRlbUJ5S2V5KGtleSk7XG5cdH1cblxuXHRwbGF5TGF5ZXJJbnN0cnVtZW50KHNvdW5kSW5kZXgpIHtcblx0XHRsZXQgbGF5ZXI9dGhpcy5nZXRDdXJyZW50Q29uZHVjdG9yTGF5ZXIoKTtcblx0XHRsZXQgbm90ZT1sYXllci5pbnN0cnVtZW50LmNyZWF0ZU5vdGUoc291bmRJbmRleCk7XG5cdFx0bm90ZS5zZXRDaG9yZENlbnRzKHRoaXMuZ2V0Q3VycmVudENob3JkQ2VudHMoKSk7XG5cdFx0bm90ZS5jb25uZWN0KGxheWVyLmRlc3RpbmF0aW9uKTtcblx0XHRub3RlLnBsYXlOb3coKTtcblx0fVxuXG5cdGdldEN1cnJlbnRTb25nKCkge1xuXHRcdHJldHVybiB0aGlzLnN0YXRlLnNvbmdzW3RoaXMuc3RhdGUuY3VycmVudFNvbmdJbmRleF07XG5cdH1cblxuXHRnZXRDaG9yZENlbnRzKGNob3JkSW5kZXgpIHtcblx0XHRsZXQgc29uZz10aGlzLmdldEN1cnJlbnRTb25nKCk7XG5cdFx0aWYgKCFzb25nIHx8IGNob3JkSW5kZXg8MClcblx0XHRcdHJldHVybiBbMCwwLDBdO1xuXG5cdFx0bGV0IHNjYWxlQ2hvcmROb3Rlcz1NdXNpY1V0aWwuZ2V0Q2hvcmROb3Rlc0ZvclNjYWxlKHNvbmcubXVzaWNLZXksc29uZy5taW5vcik7XG5cdFx0bGV0IGNob3JkTm90ZXM9c2NhbGVDaG9yZE5vdGVzW2Nob3JkSW5kZXhdO1xuXHRcdHJldHVybiBbXG5cdFx0XHRNdXNpY1V0aWwubm90ZVRvQ2VudHMoY2hvcmROb3Rlc1swXSksXG5cdFx0XHRNdXNpY1V0aWwubm90ZVRvQ2VudHMoY2hvcmROb3Rlc1sxXSksXG5cdFx0XHRNdXNpY1V0aWwubm90ZVRvQ2VudHMoY2hvcmROb3Rlc1syXSlcblx0XHRdO1xuXHR9XG5cblx0Z2V0Q3VycmVudENob3JkQ2VudHMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q2hvcmRDZW50cyh0aGlzLnN0YXRlLmN1cnJlbnRDaG9yZEluZGV4KTtcblx0fVxuXG5cdG9uTm90ZUVuZGVkKG5vdGUpIHtcblx0XHRsZXQgaWR4PXRoaXMuY3VycmVudE5vdGVzLmluZGV4T2Yobm90ZSk7XG5cdFx0aWYgKGlkeDwwKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5jdXJyZW50Tm90ZXMuc3BsaWNlKGlkeCwxKTtcblx0fVxuXG5cdGdldFNlY1BlckdyaWQoKSB7XG5cdFx0bGV0IHNlY1BlckJlYXQ9NjAvdGhpcy5nZXRDdXJyZW50U29uZygpLmJwbTtcblx0XHRsZXQgc2VjUGVyR3JpZD1zZWNQZXJCZWF0LzQ7XG5cblx0XHRyZXR1cm4gc2VjUGVyR3JpZDtcblx0fVxuXG5cdGdldFNlY1BlckJhcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRTZWNQZXJHcmlkKCkqMTY7XG5cdH1cblxuXHRwbGF5R3JpZFNsaWNlKGF0LCBncmlkSW5kZXgsIGNob3JkQ2VudHMpIHtcblx0XHRmb3IgKGxldCBsYXllciBvZiB0aGlzLmxheWVycy5nZXRJdGVtcygpKSB7XG5cdFx0XHRmb3IgKGxldCBzb3VuZEluZGV4IG9mIGxheWVyLmRhdGEuc2VxW2dyaWRJbmRleF0uc291bmRzKSB7XG5cdFx0XHRcdGxldCBub3RlPWxheWVyLmluc3RydW1lbnQuY3JlYXRlTm90ZShzb3VuZEluZGV4KTtcblx0XHRcdFx0bm90ZS5jb25uZWN0KGxheWVyLmRlc3RpbmF0aW9uKTtcblx0XHRcdFx0bm90ZS5zZXRDaG9yZENlbnRzKGNob3JkQ2VudHMpO1xuXHRcdFx0XHRub3RlLnBsYXlTaGVkdWxlZChhdCxsYXllci5nZXROb3RlTGVuKGdyaWRJbmRleCkqdGhpcy5nZXRTZWNQZXJHcmlkKCkpO1xuXHRcdFx0XHRub3RlLnNldFZlbG9jaXR5KGxheWVyLmRhdGEuc2VxW2dyaWRJbmRleF0udmVsKTtcblxuXHRcdFx0XHRub3RlLm9uZW5kZWQ9dGhpcy5vbk5vdGVFbmRlZC5iaW5kKHRoaXMsbm90ZSk7XG5cdFx0XHRcdHRoaXMuY3VycmVudE5vdGVzLnB1c2gobm90ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cGxheUJhcihhdCwgY2hvcmRDZW50cykge1xuXHRcdGZvciAobGV0IGdyaWRJbmRleD0wOyBncmlkSW5kZXg8MTY7IGdyaWRJbmRleCsrKSB7XG5cdFx0XHR0aGlzLnBsYXlHcmlkU2xpY2UoXG5cdFx0XHRcdGF0K2dyaWRJbmRleCp0aGlzLmdldFNlY1BlckdyaWQoKSxcblx0XHRcdFx0Z3JpZEluZGV4LFxuXHRcdFx0XHRjaG9yZENlbnRzXG5cdFx0XHQpO1xuXHRcdH1cblx0fVxuXG5cdGdldFBsYXlHcmlkSW5kZXgoKSB7XG5cdFx0aWYgKCF0aGlzLmlzUGxheWluZygpKVxuXHRcdFx0cmV0dXJuIC0xO1xuXG5cdFx0cmV0dXJuIHRoaXMucGxheUdyaWRJbmRleDtcblx0fVxuXG5cdG9uUGxheVRpY2s9KHRpY2tJbmRleCk9Pntcblx0XHRsZXQgc29uZz10aGlzLmdldEN1cnJlbnRTb25nKCk7XG5cblx0XHRsZXQgYmFySW5kZXg9TWF0aC5mbG9vcih0aWNrSW5kZXgvMTYpO1xuXHRcdGxldCBncmlkSW5kZXg9dGlja0luZGV4JTE2O1xuXG5cdFx0dGhpcy5wbGF5R3JpZEluZGV4PWdyaWRJbmRleDtcblxuXHRcdGlmIChncmlkSW5kZXg9PTAgJiYgdGhpcy5wbGF5aW5nU2VxdWVuY2VJbmRleD49MCkge1xuXHRcdFx0dGhpcy5wbGF5aW5nU2VxdWVuY2VDaG9yZEluZGV4Kys7XG5cblx0XHRcdGlmICh0aGlzLnBsYXlpbmdTZXF1ZW5jZUNob3JkSW5kZXg+PXNvbmcuc2VjdGlvbnNbdGhpcy5wbGF5aW5nU2VxdWVuY2VJbmRleF0ubGVuZ3RoKVxuXHRcdFx0XHR0aGlzLnBsYXlpbmdTZXF1ZW5jZUNob3JkSW5kZXg9MDtcblx0XHR9XG5cblx0XHRpZiAoYmFySW5kZXg9PTAgJiYgdGlja0luZGV4PT0wKSB7XG5cdFx0XHRsZXQgY2VudHM9dGhpcy5nZXRDdXJyZW50Q2hvcmRDZW50cygpO1xuXG5cdFx0XHRpZiAodGhpcy5wbGF5aW5nU2VxdWVuY2VJbmRleD49MCkge1xuXHRcdFx0XHRsZXQgaT10aGlzLnBsYXlpbmdTZXF1ZW5jZUNob3JkSW5kZXg7XG5cdFx0XHRcdGNlbnRzPXRoaXMuZ2V0Q2hvcmRDZW50cyhzb25nLnNlY3Rpb25zW3RoaXMucGxheWluZ1NlcXVlbmNlSW5kZXhdW2ldKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5wbGF5QmFyKFxuXHRcdFx0XHR0aGlzLmF1ZGlvVGltZXIuc3RhcnRUaW1lLFxuXHRcdFx0XHRjZW50c1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAoZ3JpZEluZGV4PT0xNSkge1xuXHRcdFx0bGV0IGNlbnRzPXRoaXMuZ2V0Q3VycmVudENob3JkQ2VudHMoKTtcblxuXHRcdFx0aWYgKHRoaXMucGxheWluZ1NlcXVlbmNlSW5kZXg+PTApIHtcblx0XHRcdFx0bGV0IGk9dGhpcy5wbGF5aW5nU2VxdWVuY2VDaG9yZEluZGV4O1xuXHRcdFx0XHRpPShpKzEpJXNvbmcuc2VjdGlvbnNbdGhpcy5wbGF5aW5nU2VxdWVuY2VJbmRleF0ubGVuZ3RoO1xuXHRcdFx0XHRjZW50cz10aGlzLmdldENob3JkQ2VudHMoc29uZy5zZWN0aW9uc1t0aGlzLnBsYXlpbmdTZXF1ZW5jZUluZGV4XVtpXSk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMucGxheUJhcihcblx0XHRcdFx0dGhpcy5hdWRpb1RpbWVyLnN0YXJ0VGltZSsoYmFySW5kZXgrMSkqdGhpcy5nZXRTZWNQZXJCYXIoKSxcblx0XHRcdFx0Y2VudHNcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMub25QbGF5R3JpZEluZGV4Q2hhbmdlKVxuXHRcdFx0dGhpcy5vblBsYXlHcmlkSW5kZXhDaGFuZ2UoZ3JpZEluZGV4LHRoaXMucGxheWluZ1NlcXVlbmNlQ2hvcmRJbmRleCk7XG5cdH1cblxuXHRwbGF5PSgpPT57XG5cdFx0bGV0IHNvbmc9dGhpcy5nZXRDdXJyZW50U29uZygpO1xuXHRcdHRoaXMucGxheUJwbT1zb25nLmJwbTtcblxuXHRcdHRoaXMucGxheWluZ1NlcXVlbmNlSW5kZXg9dGhpcy5zdGF0ZS5jdXJyZW50U2VjdGlvbkluZGV4O1xuXHRcdHRoaXMucGxheWluZ1NlcXVlbmNlQ2hvcmRJbmRleD0tMTtcblxuXHRcdHRoaXMuYXVkaW9UaW1lci5zZXRTdGFydFRpbWUodGhpcy5hdWRpb0NvbnRleHQuY3VycmVudFRpbWUpO1xuXHRcdHRoaXMuYXVkaW9UaW1lci5zZXRUaWNrSW50ZXJ2YWwodGhpcy5nZXRTZWNQZXJHcmlkKCkpO1xuXHRcdHRoaXMuYXVkaW9UaW1lci5zdGFydCgpO1xuXHR9XG5cblx0c3RvcCgpIHtcblx0XHRpZiAodGhpcy5vblBsYXlHcmlkSW5kZXhDaGFuZ2UpXG5cdFx0XHR0aGlzLm9uUGxheUdyaWRJbmRleENoYW5nZSgtMSwtMSk7XG5cblx0XHR0aGlzLnBsYXlCcG09MDtcblx0XHR0aGlzLmF1ZGlvVGltZXIuc3RvcCgpO1xuXG5cdFx0Zm9yIChsZXQgbm90ZSBvZiB0aGlzLmN1cnJlbnROb3Rlcykge1xuXHRcdFx0bm90ZS5zZXRWZWxvY2l0eSgwKTtcblx0XHRcdG5vdGUub25lbmRlZD1udWxsO1xuXHRcdH1cblxuXHRcdHRoaXMuY3VycmVudE5vdGVzPVtdO1xuXHR9XG5cblx0aXNQbGF5aW5nKCkge1xuXHRcdHJldHVybiB0aGlzLmF1ZGlvVGltZXIuaXNSdW5uaW5nKCk7XG5cdH1cblxuXHRzZXRTdGF0ZT0oc3RhdGUpPT57XG5cdFx0dGhpcy5zdGF0ZT1zdGF0ZTtcblx0XHR0aGlzLmluc3RydW1lbnRzLnNldERhdGEoc3RhdGUuaW5zdHJ1bWVudHMpO1xuXG5cdFx0aWYgKHRoaXMuZ2V0Q3VycmVudFNvbmcoKSkge1xuXHRcdFx0dGhpcy5sYXllcnMuc2V0RGF0YSh0aGlzLmdldEN1cnJlbnRTb25nKCkubGF5ZXJzKTtcblx0XHRcdGlmIChzdGF0ZS5wbGF5aW5nICYmICF0aGlzLmlzUGxheWluZygpKVxuXHRcdFx0XHR0aGlzLnBsYXkoKTtcblxuXHRcdFx0ZWxzZSBpZiAoIXN0YXRlLnBsYXlpbmcgJiYgdGhpcy5pc1BsYXlpbmcoKSlcblx0XHRcdFx0dGhpcy5zdG9wKCk7XG5cblx0XHRcdGlmICh0aGlzLmlzUGxheWluZygpICYmIHRoaXMucGxheUJwbSE9dGhpcy5nZXRDdXJyZW50U29uZygpLmJwbSkge1xuXHRcdFx0XHR0aGlzLnN0b3AoKTtcblx0XHRcdFx0dGhpcy5wbGF5KCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZWxzZSB7XG5cdFx0XHR0aGlzLnN0b3AoKTtcblx0XHRcdHRoaXMubGF5ZXJzLnNldERhdGEoW10pO1xuXHRcdH1cblxuXHRcdGlmIChzdGF0ZS5jdXJyZW50U2VjdGlvbkluZGV4PDApIHtcblx0XHRcdHRoaXMucGxheWluZ1NlcXVlbmNlSW5kZXg9LTE7XG5cdFx0XHR0aGlzLnBsYXlpbmdTZXF1ZW5jZUNob3JkSW5kZXg9LTFcblx0XHRcdGxldCBjdXJyZW50Q2hvcmRDZW50cz10aGlzLmdldEN1cnJlbnRDaG9yZENlbnRzKCk7XG5cdFx0XHRmb3IgKGxldCBub3RlIG9mIHRoaXMuY3VycmVudE5vdGVzKVxuXHRcdFx0XHRub3RlLnNldENob3JkQ2VudHMoY3VycmVudENob3JkQ2VudHMpO1xuXHRcdH1cblxuXHRcdGVsc2UgaWYgKHN0YXRlLmN1cnJlbnRTZWN0aW9uSW5kZXghPXRoaXMucGxheWluZ1NlcXVlbmNlSW5kZXgpIHtcblx0XHRcdHRoaXMucGxheWluZ1NlcXVlbmNlSW5kZXg9c3RhdGUuY3VycmVudFNlY3Rpb25JbmRleDtcblx0XHRcdHRoaXMucGxheWluZ1NlcXVlbmNlQ2hvcmRJbmRleD0tMTtcblx0XHR9XG5cdH07XG59XG4iLCJpbXBvcnQgQXVkaW9VdGlsIGZyb20gJy4uL3V0aWxzL0F1ZGlvVXRpbCc7XG5pbXBvcnQgTXVzaWNVdGlsIGZyb20gJy4uL3V0aWxzL011c2ljVXRpbCc7XG5pbXBvcnQgQ29uZHVjdG9yTm90ZSBmcm9tICcuL0NvbmR1Y3Rvck5vdGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25kdWN0b3JJbnN0cnVtZW50IHtcblx0Y29uc3RydWN0b3IoY29uZHVjdG9yLCBkYXRhKSB7XG5cdFx0dGhpcy5jb25kdWN0b3I9Y29uZHVjdG9yO1xuXHRcdHRoaXMuZGF0YT1kYXRhO1xuXHR9XG5cblx0Z2V0TmFtZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5kYXRhLm5hbWU7XG5cdH1cblxuXHRhc3luYyBsb2FkKCkge1xuXHRcdHN3aXRjaCAodGhpcy5kYXRhLnR5cGUpIHtcblx0XHRcdGNhc2UgXCJoYXJtb25pY1wiOlxuXHRcdFx0XHRsZXQgdXJsPXRoaXMuZGF0YS5zYW1wbGU7XG5cdFx0XHRcdHRoaXMuYnVmZmVyPWF3YWl0IEF1ZGlvVXRpbC5sb2FkQnVmZmVyKHVybCx0aGlzLmNvbmR1Y3Rvci5hdWRpb0NvbnRleHQpO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSBcInBlcmN1c3NpdmVcIjpcblx0XHRcdFx0dGhpcy5idWZmZXJzPVtdO1xuXHRcdFx0XHRmb3IgKGxldCB1cmwgb2YgdGhpcy5kYXRhLnNhbXBsZXMpXG5cdFx0XHRcdFx0dGhpcy5idWZmZXJzLnB1c2goYXdhaXQgQXVkaW9VdGlsLmxvYWRCdWZmZXIodXJsLHRoaXMuY29uZHVjdG9yLmF1ZGlvQ29udGV4dCkpO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblxuXHR1cGRhdGUoZGF0YSkge1xuXHR9XG5cblx0ZmluYWxpemUoKSB7XG5cdH1cblxuXHRjcmVhdGVOb3RlKHNvdW5kSW5kZXgpIHtcblx0XHRzd2l0Y2ggKHRoaXMuZGF0YS50eXBlKSB7XG5cdFx0XHRjYXNlIFwiaGFybW9uaWNcIjpcblx0XHRcdFx0bGV0IG5vdGU9bmV3IENvbmR1Y3Rvck5vdGUodGhpcy5jb25kdWN0b3IsdGhpcy5idWZmZXIsc291bmRJbmRleCk7XG5cdFx0XHRcdGlmICh0aGlzLmRhdGEuc2FtcGxlTm90ZSlcblx0XHRcdFx0XHRub3RlLnNldFNhbXBsZU5vdGVDZW50cyhNdXNpY1V0aWwubm90ZVRvQ2VudHModGhpcy5kYXRhLnNhbXBsZU5vdGUpKTtcblxuXHRcdFx0XHRyZXR1cm4gbm90ZTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgXCJwZXJjdXNzaXZlXCI6XG5cdFx0XHRcdHJldHVybiBuZXcgQ29uZHVjdG9yTm90ZSh0aGlzLmNvbmR1Y3Rvcix0aGlzLmJ1ZmZlcnNbc291bmRJbmRleF0pO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDb25kdWN0b3JMYXllciB7XG5cdGNvbnN0cnVjdG9yKGNvbmR1Y3RvciwgZGF0YSkge1xuXHRcdHRoaXMuY29uZHVjdG9yPWNvbmR1Y3Rvcjtcblx0XHR0aGlzLmRhdGE9ZGF0YTtcblx0XHR0aGlzLmluc3RydW1lbnQ9dGhpcy5jb25kdWN0b3IuZ2V0Q29uZHVjdG9ySW5zdHJ1bWVudEJ5TmFtZShkYXRhLmluc3RydW1lbnROYW1lKTtcblx0XHRpZiAoIXRoaXMuaW5zdHJ1bWVudClcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIlRoZXJlIGlzIG5vIGluc3RydW1lbnQhISFcIik7XG5cblx0XHR0aGlzLmdhaW49dGhpcy5jb25kdWN0b3IuYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKTtcblx0XHR0aGlzLmdhaW4uY29ubmVjdCh0aGlzLmNvbmR1Y3Rvci5hdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xuXHRcdHRoaXMudXBkYXRlR2FpbigpO1xuXG5cdFx0dGhpcy5kZXN0aW5hdGlvbj10aGlzLmdhaW47XG5cdH1cblxuXHR1cGRhdGUoZGF0YSkge1xuXHRcdHRoaXMuZGF0YT1kYXRhO1xuXHRcdHRoaXMudXBkYXRlR2FpbigpO1xuXHR9XG5cblx0ZmluYWxpemUoKSB7XG5cdFx0dGhpcy5nYWluLmRpc2Nvbm5lY3QoKTtcblx0fVxuXG5cdHVwZGF0ZUdhaW4oKSB7XG5cdFx0aWYgKHRoaXMuZGF0YS5hdWRpYmxlIHx8IHRoaXMuZGF0YS5pbmRleD09dGhpcy5jb25kdWN0b3Iuc3RhdGUuY3VycmVudExheWVySW5kZXgpXG5cdFx0XHR0aGlzLmdhaW4uZ2Fpbi52YWx1ZT10aGlzLmRhdGEudm9sdW1lO1xuXG5cdFx0ZWxzZVxuXHRcdFx0dGhpcy5nYWluLmdhaW4udmFsdWU9MDtcblx0fVxuXG5cdGhhc1NvdW5kQXQocG9zKSB7XG5cdFx0aWYgKHRoaXMuZGF0YS5zZXFbcG9zXS5zb3VuZHMubGVuZ3RoPjApXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGdldE5vdGVMZW4ocG9zKSB7XG5cdFx0Zm9yIChsZXQgaT0xOyBpPHRoaXMuZGF0YS5zZXEubGVuZ3RoOyBpKyspXG5cdFx0XHRpZiAodGhpcy5oYXNTb3VuZEF0KChwb3MraSklMTYpXG5cdFx0XHRcdFx0fHwgdGhpcy5kYXRhLnNlcVsocG9zK2kpJTE2XS5zdGFjYylcblx0XHRcdFx0cmV0dXJuIGk7XG5cblx0XHRyZXR1cm4gMTY7XG5cdH1cbn0iLCJpbXBvcnQgTXVzaWNVdGlsIGZyb20gJy4uL3V0aWxzL011c2ljVXRpbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbmR1Y3Rvck5vdGUge1xuXHRjb25zdHJ1Y3Rvcihjb25kdWN0b3IsIGJ1ZmZlciwgY2hvcmROb3RlKSB7XG5cdFx0dGhpcy5jb25kdWN0b3I9Y29uZHVjdG9yO1xuXHRcdHRoaXMuYnVmZmVyPWJ1ZmZlcjtcblxuXHRcdHRoaXMuZ2Fpbj10aGlzLmNvbmR1Y3Rvci5hdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpO1xuXHRcdHRoaXMuc291cmNlPXRoaXMuY29uZHVjdG9yLmF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcblx0XHR0aGlzLnNvdXJjZS5idWZmZXI9dGhpcy5idWZmZXI7XG5cdFx0dGhpcy5zb3VyY2UuY29ubmVjdCh0aGlzLmdhaW4pO1xuXHRcdHRoaXMuc291cmNlLm9uZW5kZWQ9KCk9Pntcblx0XHRcdHRoaXMuZ2Fpbi5kaXNjb25uZWN0KCk7XG5cdFx0XHRpZiAodGhpcy5vbmVuZGVkKVxuXHRcdFx0XHR0aGlzLm9uZW5kZWQodGhpcyk7XG5cdFx0fVxuXG5cdFx0dGhpcy5jaG9yZE5vdGU9Y2hvcmROb3RlO1xuXHRcdHRoaXMuY2hvcmRDZW50cz1bMCwxMDAsMjAwXTtcblx0XHR0aGlzLnNhbXBsZU5vdGVDZW50cz0wO1xuXHRcdHRoaXMudXBkYXRlRGV0dW5lKCk7XG5cdH1cblxuXHRjb25uZWN0KGRlc3RpbmF0aW9uKSB7XG5cdFx0dGhpcy5pc0Nvbm5lY3RlZD10cnVlO1xuXHRcdHRoaXMuZ2Fpbi5jb25uZWN0KGRlc3RpbmF0aW9uKTtcblx0fVxuXG5cdHNldFNhbXBsZU5vdGVDZW50cyhjZW50cykge1xuXHRcdHRoaXMuc2FtcGxlTm90ZUNlbnRzPWNlbnRzO1xuXHRcdHRoaXMudXBkYXRlRGV0dW5lKCk7XG5cdH1cblxuXHRzZXRDaG9yZENlbnRzKGNob3JkQ2VudHMpIHtcblx0XHR0aGlzLmNob3JkQ2VudHM9Y2hvcmRDZW50cztcblx0XHR0aGlzLnVwZGF0ZURldHVuZSgpO1xuXHR9XG5cblx0cGxheU5vdygpIHtcblx0XHRpZiAoIXRoaXMuaXNDb25uZWN0ZWQpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJub3RlIG5vdCBjb25uZWN0ZWQhXCIpO1xuXG5cdFx0dGhpcy5zb3VyY2Uuc3RhcnQoKTtcblx0fVxuXG5cdHBsYXlTaGVkdWxlZChhdCwgZHVyYXRpb24pIHtcblx0XHRpZiAoIXRoaXMuaXNDb25uZWN0ZWQpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJub3RlIG5vdCBjb25uZWN0ZWQhXCIpO1xuXG5cdFx0dGhpcy5zb3VyY2Uuc3RhcnQoYXQpO1xuXHRcdHRoaXMuc291cmNlLnN0b3AoYXQrZHVyYXRpb24pO1xuXHR9XG5cblx0dXBkYXRlRGV0dW5lKCkge1xuXHRcdGxldCBjZW50cztcblxuXHRcdGlmICh0aGlzLmNob3JkTm90ZT09dW5kZWZpbmVkKVxuXHRcdFx0Y2VudHM9MDtcblxuXHRcdGVsc2Vcblx0XHRcdGNlbnRzPVxuXHRcdFx0XHRNdXNpY1V0aWwuT0NUQVZFX0NFTlRTKihNYXRoLmZsb29yKHRoaXMuY2hvcmROb3RlLzMpLTEpK1xuXHRcdFx0XHR0aGlzLmNob3JkQ2VudHNbdGhpcy5jaG9yZE5vdGUlM10tXG5cdFx0XHRcdHRoaXMuc2FtcGxlTm90ZUNlbnRzO1xuXG5cdFx0aWYgKHRoaXMuc291cmNlLmRldHVuZSlcblx0XHRcdHRoaXMuc291cmNlLmRldHVuZS52YWx1ZT1jZW50cztcblxuXHRcdGVsc2Vcblx0XHRcdHRoaXMuc291cmNlLnBsYXliYWNrUmF0ZS52YWx1ZT1NdXNpY1V0aWwucmF0ZUZyb21DZW50cyhjZW50cyk7XG5cdH1cblxuXHRzZXRWZWxvY2l0eSh2ZWwpIHtcblx0XHR0aGlzLmdhaW4uZ2Fpbi52YWx1ZT12ZWw7XG5cdH1cbn0iLCJpbXBvcnQgeyBoLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuXG5jbGFzcyBBcHBDb250ZXh0IGV4dGVuZHMgQ29tcG9uZW50IHtcblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG5cblx0XHR0aGlzLmN1cnJpZWQ9e307XG5cblx0XHRmb3IgKGxldCBrZXkgb2YgdGhpcy5nZXRPYmplY3RLZXlzKHByb3BzLmNvbnRyb2xsZXIpKSB7XG5cdFx0XHR0aGlzLmN1cnJpZWRba2V5XT0oLi4uYXJncyk9PntcblxuXHRcdFx0XHRpZiAodGhpcy5wcm9wcy5sb2dBY3Rpb25zKVxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiQWN0aW9uOiBcIitrZXkrXCIgKFwiK2FyZ3MrXCIpXCIpO1xuXG5cdFx0XHRcdGZvciAobGV0IGkgaW4gYXJncykge1xuXHRcdFx0XHRcdGlmIChhcmdzW2ldIGluc3RhbmNlb2YgRXZlbnQpIHtcblx0XHRcdFx0XHRcdGlmIChhcmdzW2ldLnR5cGU9PVwibW91c2Vkb3duXCIgJiYgYXJnc1tpXS5idXR0b249PTIpXG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblxuXHRcdFx0XHRcdFx0YXJnc1tpXS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0YXJnc1tpXS5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdFx0XHRcdFx0aWYgKGFyZ3NbaV0udHlwZT09XCJjaGFuZ2VcIikge1xuXHRcdFx0XHRcdFx0XHRhcmdzW2ldPWFyZ3NbaV0udGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGxldCBuZXdTdGF0ZT1wcm9wcy5jb250cm9sbGVyW2tleV0odGhpcy5zdGF0ZSwgLi4uYXJncyk7XG5cdFx0XHRcdGlmIChuZXdTdGF0ZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcblx0XHRcdFx0XHRpZiAoIXRoaXMuc3RhdGUpXG5cdFx0XHRcdFx0XHR0aGlzLnN0YXRlPXtidXN5OiB0cnVlfTtcblxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdFx0XHRidXN5OiB0cnVlXG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdG5ld1N0YXRlLnRoZW4oKHN0YXRlKT0+e1xuXHRcdFx0XHRcdFx0c3RhdGUuYnVzeT1mYWxzZTtcblx0XHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoc3RhdGUpO1xuXHRcdFx0XHRcdFx0dGhpcy5ub3RpZnlTdGF0ZUNoYW5nZShzdGF0ZSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRpZiAoIXRoaXMuc3RhdGUpXG5cdFx0XHRcdFx0XHR0aGlzLnN0YXRlPW5ld1N0YXRlO1xuXG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XG5cblx0XHRcdFx0XHR0aGlzLm5vdGlmeVN0YXRlQ2hhbmdlKG5ld1N0YXRlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZvciAobGV0IGtleSBvZiB0aGlzLmdldE9iamVjdEtleXMocHJvcHMuaGVscGVyKSkge1xuXHRcdFx0dGhpcy5jdXJyaWVkW2tleV09KC4uLmFyZ3MpPT57XG5cdFx0XHRcdHJldHVybiBwcm9wcy5oZWxwZXJba2V5XSh0aGlzLnN0YXRlLCAuLi5hcmdzKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAocHJvcHMuaW5pdEFjdGlvbilcblx0XHRcdHRoaXMuY3VycmllZFtwcm9wcy5pbml0QWN0aW9uXSgpO1xuXHR9XG5cblx0bm90aWZ5U3RhdGVDaGFuZ2Uoc3RhdGUpIHtcblx0XHRpZiAodHlwZW9mIHRoaXMucHJvcHMub25TdGF0ZUNoYW5nZT09XCJmdW5jdGlvblwiKVxuXHRcdFx0dGhpcy5wcm9wcy5vblN0YXRlQ2hhbmdlKHN0YXRlKTtcblx0fVxuXG5cdGdldE9iamVjdEtleXMobykge1xuXHRcdGxldCBrZXlzPVtdO1xuXHRcdG89T2JqZWN0LmdldFByb3RvdHlwZU9mKG8pO1xuXHRcdHdoaWxlIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvKS5pbmRleE9mKFwiX19wcm90b19fXCIpPDApIHtcblx0XHRcdGtleXM9a2V5cy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMobykpO1xuXHRcdFx0bz1PYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7XG5cdFx0fVxuXG5cdFx0aWYgKGtleXMuaW5jbHVkZXMoXCJjb25zdHJ1Y3RvclwiKSlcblx0XHRcdGtleXMuc3BsaWNlKGtleXMuaW5kZXhPZihcImNvbnN0cnVjdG9yXCIpLDEpO1xuXG5cdFx0cmV0dXJuIGtleXM7XG5cdH1cblxuXHRnZXRDaGlsZENvbnRleHQoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdC4uLnRoaXMuc3RhdGUsXG5cdFx0XHQuLi50aGlzLmN1cnJpZWRcblx0XHR9O1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBcHBDb250ZXh0OyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1ZGlvVGltZXIge1xuXHRjb25zdHJ1Y3RvcihhdWRpb0NvbnRleHQpIHtcblx0XHR0aGlzLmF1ZGlvQ29udGV4dD1hdWRpb0NvbnRleHQ7XG5cdFx0dGhpcy50aW1lb3V0PW51bGw7XG5cdH1cblxuXHRwcm9jZXNzVGlja3M9KCk9Pntcblx0XHRsZXQgY3VycmVudFRpbWU9dGhpcy5hdWRpb0NvbnRleHQuY3VycmVudFRpbWU7XG5cdFx0Ly9jb25zb2xlLmxvZyhcImNhbGxlZCBhdDogXCIrY3VycmVudFRpbWUpO1xuXG5cdFx0d2hpbGUgKHRoaXMuc3RhcnRUaW1lK3RoaXMuZGVsaXZlcmVkVGlja3MqdGhpcy50aWNrSW50ZXJ2YWw8PWN1cnJlbnRUaW1lKSB7XG5cdFx0XHR0aGlzLm9uVGljayh0aGlzLmRlbGl2ZXJlZFRpY2tzKTtcblx0XHRcdHRoaXMuZGVsaXZlcmVkVGlja3MrKztcblx0XHR9XG5cblx0XHRsZXQgbmV4dEF0PXRoaXMuc3RhcnRUaW1lKyh0aGlzLmRlbGl2ZXJlZFRpY2tzKSp0aGlzLnRpY2tJbnRlcnZhbDtcblx0XHRsZXQgdW50aWxOZXh0PW5leHRBdC10aGlzLmF1ZGlvQ29udGV4dC5jdXJyZW50VGltZTtcblx0XHQvL2NvbnNvbGUubG9nKFwibmV4dCBhdDogXCIrbmV4dEF0K1wiIGluOiBcIit1bnRpbE5leHQpO1xuXG5cdFx0dGhpcy50aW1lb3V0PXNldFRpbWVvdXQodGhpcy5wcm9jZXNzVGlja3MsdW50aWxOZXh0KjEwMDApO1xuXHR9XG5cblx0c3RhcnQoKSB7XG5cdFx0dGhpcy5zdG9wKCk7XG5cdFx0dGhpcy5kZWxpdmVyZWRUaWNrcz0wO1xuXG5cdFx0dGhpcy5wcm9jZXNzVGlja3MoKTtcblx0fVxuXG5cdHN0b3AoKSB7XG5cdFx0Y2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG5cdFx0dGhpcy50aW1lb3V0PW51bGw7XG5cdH1cblxuXHRzZXRTdGFydFRpbWUoc3RhcnRUaW1lKSB7XG5cdFx0aWYgKHRoaXMuaXNSdW5uaW5nKCkpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjYW4ndCBjaGFuZ2Ugc3RhcnQgdGltZSB3aGlsZSBydW5uaW5nISEhXCIpO1xuXG5cdFx0dGhpcy5zdGFydFRpbWU9c3RhcnRUaW1lO1xuXHR9XG5cblx0c2V0VGlja0ludGVydmFsKHRpY2tJbnRlcnZhbCkge1xuXHRcdGlmICh0aGlzLmlzUnVubmluZygpKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2FuJ3QgY2hhbmdlIHRpY2sgaW50ZXJ2YWwgd2hpbGUgcnVubmluZyEhIVwiKTtcblxuXHRcdHRoaXMudGlja0ludGVydmFsPXRpY2tJbnRlcnZhbDtcblx0fVxuXG5cdGlzUnVubmluZygpIHtcblx0XHRyZXR1cm4gISF0aGlzLnRpbWVvdXQ7XG5cdH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBBdWRpb1V0aWwge1xuXHRzdGF0aWMgbG9hZEJ1ZmZlcih1cmwsIGNvbnRleHQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9Pntcblx0XHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0XHRyZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XG5cdFx0XHRyZXF1ZXN0LnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcic7XG5cblx0XHRcdHJlcXVlc3Qub25sb2FkPSgpPT57XG5cdFx0XHRcdGNvbnRleHQuZGVjb2RlQXVkaW9EYXRhKHJlcXVlc3QucmVzcG9uc2UsXG5cdFx0XHRcdFx0KGJ1ZmZlcik9Pntcblx0XHRcdFx0XHRcdHJlc29sdmUoYnVmZmVyKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdChlKT0+e1xuXHRcdFx0XHRcdFx0cmVqZWN0KGUpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQpO1xuXHRcdFx0fTtcblx0XHRcdHJlcXVlc3Quc2VuZCgpO1xuXHRcdH0pXG5cdH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE11c2ljVXRpbCB7XG5cdHN0YXRpYyBPQ1RBVkVfQ0VOVFM9MTIwMDtcblx0c3RhdGljIE5PVEVfTkFNRVM9W1wiQVwiLFwiQSNcIixcIkJcIixcIkNcIixcIkMjXCIsXCJEXCIsXCJEI1wiLFwiRVwiLFwiRlwiLFwiRiNcIixcIkdcIixcIkcjXCJdO1xuXG5cdHN0YXRpYyByYXRlRnJvbUNlbnRzKGNlbnRzKSB7XG5cdFx0bGV0IG1pZGRsZUNGcmVxPTI2MS42Mztcblx0XHRsZXQgZnJlcT1taWRkbGVDRnJlcSpNYXRoLnBvdygyLGNlbnRzLzEyMDApO1xuXHRcdGxldCByYXRlPWZyZXEvbWlkZGxlQ0ZyZXE7XG5cblx0XHRyZXR1cm4gcmF0ZTtcblx0fVxuXG5cdHN0YXRpYyBub3RlVG9DZW50cyhzKSB7XG5cdFx0c3dpdGNoIChzLnRvVXBwZXJDYXNlKCkpIHtcblx0XHRcdGNhc2UgXCJDXCI6XG5cdFx0XHRjYXNlIFwiXCI6XG5cdFx0XHRcdHJldHVybiAwO1xuXG5cdFx0XHRjYXNlIFwiQyNcIjpcblx0XHRcdFx0cmV0dXJuIDEwMDtcblxuXHRcdFx0Y2FzZSBcIkRcIjpcblx0XHRcdFx0cmV0dXJuIDIwMDtcblxuXHRcdFx0Y2FzZSBcIkQjXCI6XG5cdFx0XHRcdHJldHVybiAzMDA7XG5cblx0XHRcdGNhc2UgXCJFXCI6XG5cdFx0XHRcdHJldHVybiA0MDA7XG5cblx0XHRcdGNhc2UgXCJGXCI6XG5cdFx0XHRcdHJldHVybiA1MDA7XG5cblx0XHRcdGNhc2UgXCJGI1wiOlxuXHRcdFx0XHRyZXR1cm4gNjAwO1xuXG5cdFx0XHRjYXNlIFwiR1wiOlxuXHRcdFx0XHRyZXR1cm4gNzAwO1xuXG5cdFx0XHRjYXNlIFwiRyNcIjpcblx0XHRcdFx0cmV0dXJuIDgwMDtcblxuXHRcdFx0Y2FzZSBcIkFcIjpcblx0XHRcdFx0cmV0dXJuIDkwMDtcblxuXHRcdFx0Y2FzZSBcIkEjXCI6XG5cdFx0XHRcdHJldHVybiAxMDAwO1xuXG5cdFx0XHRjYXNlIFwiQlwiOlxuXHRcdFx0XHRyZXR1cm4gMTEwMDtcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgZ2V0Tm90ZXNGb3JTY2FsZShzY2FsZSwgbWlub3IpIHtcblx0XHRsZXQgc3RhcnRJbmRleD1NdXNpY1V0aWwuTk9URV9OQU1FUy5pbmRleE9mKHNjYWxlKTtcblx0XHRpZiAoc3RhcnRJbmRleDwwKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwibm8gc3VjaCBzY2FsZTogXCIrc2NhbGUpO1xuXG5cdFx0bGV0IG5vdGVJbmRlY2VzPVswLDIsNCw1LDcsOSwxMV07XG5cdFx0aWYgKG1pbm9yKVxuXHRcdFx0bm90ZUluZGVjZXM9WzAsMiwzLDUsNyw4LDEwXTtcblxuXHRcdGxldCByZXM9W107XG5cdFx0Zm9yIChsZXQgaW5kZXggb2Ygbm90ZUluZGVjZXMpXG5cdFx0XHRyZXMucHVzaChNdXNpY1V0aWwuTk9URV9OQU1FU1soc3RhcnRJbmRleCtpbmRleCklMTJdKTtcblxuXHRcdHJldHVybiByZXM7XG5cdH1cblxuXHRzdGF0aWMgZ2V0Q2hvcmROb3Rlc0ZvclNjYWxlKHNjYWxlLCBtaW5vcikge1xuXHRcdGxldCBub3RlTmFtZXM9TXVzaWNVdGlsLmdldE5vdGVzRm9yU2NhbGUoc2NhbGUsbWlub3IpO1xuXG5cdFx0bGV0IHJlcz1bXTtcblx0XHRmb3IgKGxldCBpPTA7IGk8MTI7IGkrKylcblx0XHRcdHJlcy5wdXNoKFtcblx0XHRcdFx0bm90ZU5hbWVzWyhpKSU3XSxcblx0XHRcdFx0bm90ZU5hbWVzWyhpKzIpJTddLFxuXHRcdFx0XHRub3RlTmFtZXNbKGkrNCklN10sXG5cdFx0XHRdKTtcblxuXHRcdHJldHVybiByZXM7XG5cdH1cblxuXHRzdGF0aWMgZ2V0Q2hvcmROYW1lc0ZvclNjYWxlKHNjYWxlLCBtaW5vcikge1xuXHRcdGxldCBwcmVmaXhlcz1bXCJcIixcIi1cIixcIi1cIixcIlwiLFwiXCIsXCItXCIsXCJvXCJdO1xuXHRcdGlmIChtaW5vcilcblx0XHRcdHByZWZpeGVzPVtcIi1cIixcIm9cIixcIlwiLFwiLVwiLFwiLVwiLFwiXCIsXCJcIl07XG5cblx0XHRsZXQgbm90ZU5hbWVzPU11c2ljVXRpbC5nZXROb3Rlc0ZvclNjYWxlKHNjYWxlLG1pbm9yKTtcblx0XHRsZXQgcmVzPVtdO1xuXHRcdGZvciAobGV0IGluZGV4IGluIG5vdGVOYW1lcylcblx0XHRcdHJlcy5wdXNoKG5vdGVOYW1lc1tpbmRleF0rcHJlZml4ZXNbaW5kZXhdKTtcblxuXHRcdHJldHVybiByZXM7XG5cdH1cbn0iLCJpbXBvcnQgeyBoLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuXG5leHBvcnQgY2xhc3MgU2VsZWN0IHtcblx0b25DaGFuZ2U9KGUpPT57XG5cdFx0aWYgKHRoaXMucHJvcHMub25DaGFuZ2UpXG5cdFx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKEpTT04ucGFyc2UoZS50YXJnZXQudmFsdWUpKTtcblxuXHRcdGlmICh0aGlzLnByb3BzLm9uSW5kZXhDaGFuZ2UpXG5cdFx0XHR0aGlzLnByb3BzLm9uSW5kZXhDaGFuZ2UoZS50YXJnZXQuc2VsZWN0ZWRJbmRleCk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0bGV0IHByb3BzPXRoaXMucHJvcHM7XG5cblx0XHRpZiAoIXByb3BzLmxhYmVsRmllbGQpXG5cdFx0XHRwcm9wcy5sYWJlbEZpZWxkPVwibGFiZWxcIjtcblxuXHRcdGlmICghcHJvcHMub3B0aW9ucylcblx0XHRcdHByb3BzLm9wdGlvbnM9W107XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PHNlbGVjdCBjbGFzcz17cHJvcHMuY2xhc3N9XG5cdFx0XHRcdFx0c3R5bGU9e3Byb3BzLnN0eWxlfVxuXHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfVxuXHRcdFx0XHRcdGtleT17cHJvcHMua2V5fT5cblx0XHRcdFx0e3Byb3BzLm9wdGlvbnMubWFwKChvcHRpb24sIGluZGV4KT0+e1xuXHRcdFx0XHRcdGxldCBzZWxlY3RlZD1mYWxzZTtcblxuXHRcdFx0XHRcdGlmIChwcm9wcy5oYXNPd25Qcm9wZXJ0eSgnc2VsZWN0ZWRJbmRleCcpICYmXG5cdFx0XHRcdFx0XHRcdGluZGV4PT09cHJvcHMuc2VsZWN0ZWRJbmRleClcblx0XHRcdFx0XHRcdHNlbGVjdGVkPXRydWU7XG5cblx0XHRcdFx0XHRpZiAocHJvcHMuaGFzT3duUHJvcGVydHkoJ3NlbGVjdGVkJykgJiZcblx0XHRcdFx0XHRcdFx0b3B0aW9uLmtleT09PXByb3BzLnNlbGVjdGVkKVxuXHRcdFx0XHRcdFx0c2VsZWN0ZWQ9dHJ1ZTtcblxuXHRcdFx0XHRcdGxldCBrZXk9b3B0aW9uLmtleTtcblx0XHRcdFx0XHRpZiAocHJvcHMuaGFzT3duUHJvcGVydHkoJ29wdGlvbktleVByZWZpeCcpKVxuXHRcdFx0XHRcdFx0a2V5PXByb3BzLmtleVByZWZpeCtrZXk7XG5cblx0XHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdFx0PG9wdGlvbiBrZXk9e2tleX1cblx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17SlNPTi5zdHJpbmdpZnkob3B0aW9uLmtleSl9XG5cdFx0XHRcdFx0XHRcdFx0c2VsZWN0ZWQ9e3NlbGVjdGVkfVxuXHRcdFx0XHRcdFx0XHRcdGNsYXNzPXtvcHRpb24uY2xhc3N9PlxuXHRcdFx0XHRcdFx0XHR7b3B0aW9uW3Byb3BzLmxhYmVsRmllbGRdfVxuXHRcdFx0XHRcdFx0PC9vcHRpb24+XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSl9XG5cdFx0XHQ8L3NlbGVjdD5cblx0XHQpO1xuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBJRihjb25kLGZ1bmMpIHtcblx0aWYgKGNvbmQpXG5cdFx0cmV0dXJuIGZ1bmMoKTtcbn0iLCIvL2ltcG9ydCBpbW11dGFibGUgZnJvbSAnaW1tdXRhYmxlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjb25jaWxlQXJyYXkge1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0dGhpcy5pdGVtc0J5S2V5PXt9O1xuXHRcdHRoaXMub3B0aW9ucz1vcHRpb25zO1xuXHR9XG5cblx0c3RhdGljIGNyZWF0ZVdpdGhGYWN0b3J5KGZhY3RvcnkpIHtcblx0XHRyZXR1cm4gbmV3IFJlY29uY2lsZUFycmF5KHtcblx0XHRcdGl0ZW1GYWN0b3J5OiBmYWN0b3J5XG5cdFx0fSlcblx0fVxuXG5cdGNyZWF0ZUl0ZW0oZGF0YSkge1xuXHRcdGlmICh0aGlzLm9wdGlvbnMuaXRlbUZhY3RvcnkpXG5cdFx0XHRyZXR1cm4gdGhpcy5vcHRpb25zLml0ZW1GYWN0b3J5KGRhdGEpO1xuXG5cdFx0ZWxzZSBpZiAodGhpcy5vcHRpb25zLml0ZW1DbGFzcylcblx0XHRcdHJldHVybiBuZXcgdGhpcy5vcHRpb25zLml0ZW1DbGFzcyhkYXRhKTtcblxuXHRcdGVsc2Vcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIk5vIHdheSB0byBjcmVhdGUgaXRlbXMhXCIpO1xuXHR9XG5cblx0c2V0RGF0YShkYXRhcykge1xuXHRcdGxldCBuZXdLZXlzPVtdO1xuXHRcdGZvciAobGV0IGluZGV4IGluIGRhdGFzKSB7XG5cdFx0XHRsZXQgZGF0YT1kYXRhc1tpbmRleF07XG5cdFx0XHRkYXRhLmluZGV4PWluZGV4O1xuXG5cdFx0XHRpZiAoIWRhdGEua2V5KVxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJBcnJheSBpdGVtIGRvZXNuJ3QgaGF2ZSBhIGtleVwiKTtcblxuXHRcdFx0bGV0IGtleT1TdHJpbmcoZGF0YS5rZXkpO1xuXHRcdFx0bmV3S2V5cy5wdXNoKGtleSk7XG5cblx0XHRcdC8vbGV0IGltPWltbXV0YWJsZS5mcm9tSlMoZGF0YSk7XG5cdFx0XHRpZiAodGhpcy5pdGVtc0J5S2V5W2tleV0pIHtcblx0XHRcdFx0Ly9pZiAoIWltLmVxdWFscyh0aGlzLml0ZW1zQnlLZXlba2V5XS5fX2ltKSlcblx0XHRcdFx0dGhpcy5pdGVtc0J5S2V5W2tleV0udXBkYXRlKGRhdGEpO1xuXHRcdFx0fVxuXG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dGhpcy5pdGVtc0J5S2V5W2tleV09dGhpcy5jcmVhdGVJdGVtKGRhdGEpO1xuXHRcdFx0fVxuXG5cdFx0XHQvL3RoaXMuaXRlbXNCeUtleVtrZXldLl9faW09aW07XG5cdFx0fVxuXG5cdFx0Zm9yIChsZXQga2V5IG9mIE9iamVjdC5rZXlzKHRoaXMuaXRlbXNCeUtleSkpIHtcblx0XHRcdGlmIChuZXdLZXlzLmluZGV4T2Yoa2V5KTwwKSB7XG5cdFx0XHRcdHRoaXMuaXRlbXNCeUtleVtrZXldLmZpbmFsaXplKCk7XG5cdFx0XHRcdGRlbGV0ZSB0aGlzLml0ZW1zQnlLZXlba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRnZXRJdGVtcygpIHtcblx0XHRyZXR1cm4gT2JqZWN0LnZhbHVlcyh0aGlzLml0ZW1zQnlLZXkpO1xuXHR9XG5cblx0Z2V0SXRlbUJ5S2V5KGtleSkge1xuXHRcdHJldHVybiB0aGlzLml0ZW1zQnlLZXlba2V5XTtcblx0fVxufVxuIiwiaW1wb3J0IHsgaCwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQSBleHRlbmRzIENvbXBvbmVudCB7XG5cdG9uRG93bj0oZSk9Pntcblx0XHQvL2UucHJldmVudERlZmF1bHQoKTtcblx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0aWYgKHRoaXMuYmFzZS5pc1ByZXNzZWQpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLmJhc2UuaXNQcmVzc2VkPXRydWU7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5vblByZXNzKVxuXHRcdFx0dGhpcy5wcm9wcy5vblByZXNzKCk7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5vblJlbGVhc2UpXG5cdFx0XHR0aGlzLmJhc2UuY2xhc3NOYW1lKz1cIiBwcmVzc2VkXCI7XG5cdH1cblxuXHRvblVwPShlKT0+e1xuXHRcdGlmIChlLmNhbmNlbGFibGUpXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0aWYgKCF0aGlzLmJhc2UuaXNQcmVzc2VkKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5iYXNlLmlzUHJlc3NlZD1mYWxzZTtcblxuXHRcdGlmICh0aGlzLnByb3BzLm9uUmVsZWFzZSkge1xuXHRcdFx0dGhpcy5iYXNlLmNsYXNzTmFtZT10aGlzLmJhc2UuY2xhc3NOYW1lLnJlcGxhY2UoXCIgcHJlc3NlZFwiLFwiXCIpO1xuXHRcdFx0dGhpcy5wcm9wcy5vblJlbGVhc2UoKTtcblx0XHR9XG5cdH1cblxuXHRvbk1vdmU9KGUpPT57XG5cdFx0aWYgKHRoaXMucHJvcHMuY2FuY2VsT25Nb3ZlICYmIHRoaXMuYmFzZS5pc1ByZXNzZWQpIHtcblx0XHRcdHRoaXMuYmFzZS5jbGFzc05hbWU9dGhpcy5iYXNlLmNsYXNzTmFtZS5yZXBsYWNlKFwiIHByZXNzZWRcIixcIlwiKTtcblx0XHRcdHRoaXMuYmFzZS5pc1ByZXNzZWQ9ZmFsc2U7XG5cdFx0fVxuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8YSBjbGFzcz17XCJhIFwiK3RoaXMucHJvcHMuY2xhc3N9XG5cdFx0XHRcdFx0b25Ub3VjaE1vdmU9e3RoaXMub25Nb3ZlfVxuXHRcdFx0XHRcdG9uVG91Y2hTdGFydD17dGhpcy5vbkRvd259XG5cdFx0XHRcdFx0b25Ub3VjaEVuZD17dGhpcy5vblVwfVxuXHRcdFx0XHRcdG9uTW91c2VEb3duPXt0aGlzLm9uRG93bn1cblx0XHRcdFx0XHRvbk1vdXNlVXA9e3RoaXMub25VcH0+XG5cdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVufVxuXHRcdFx0PC9hPlxuXHRcdClcblx0fVxufSIsImltcG9ydCB7IGgsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgQSBmcm9tICcuL0EuanN4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWRkTGF5ZXIge1xuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lLWNvbnRhaW5lclwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYm94IHBhbmUgZG91YmxlIGJnLWRhcmtcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZS1oZWFkZXIgYmctZGFyayB0ZXh0LXNlY29uZGFyeVwiPkFERCBMQVlFUjwvZGl2PlxuXHRcdFx0XHRcdHt0aGlzLmNvbnRleHQuaW5zdHJ1bWVudHMubWFwKChpbnN0cnVtZW50LGluZGV4KT0+KFxuXHRcdFx0XHRcdFx0PEEgY2xhc3M9XCJib3ggdy00IHRleHQtd2hpdGUgYmctZGFuZ2VyIGVsXCJcblx0XHRcdFx0XHRcdFx0XHRvblJlbGVhc2U9e3RoaXMuY29udGV4dC5hZGRMYXllci5iaW5kKG51bGwsaW5zdHJ1bWVudC5uYW1lKX0+XG5cdFx0XHRcdFx0XHRcdDxpbWcgc3JjPXtcImltZy9cIitpbnN0cnVtZW50Lmljb259Lz5cblx0XHRcdFx0XHRcdFx0e2luc3RydW1lbnQubmFtZX1cblx0XHRcdFx0XHRcdDwvQT5cblx0XHRcdFx0XHQpKX1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBoLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IHsgU2VsZWN0LCBJRiB9IGZyb20gJy4uL3V0aWxzL1JlYWN0VXRpbC5qc3gnO1xuaW1wb3J0IEhlYWRlciBmcm9tICcuL0hlYWRlci5qc3gnO1xuaW1wb3J0IEZyb250IGZyb20gJy4vRnJvbnQuanN4JztcbmltcG9ydCBTb25nIGZyb20gJy4vU29uZy5qc3gnO1xuaW1wb3J0IFNvbmdTZXR0aW5ncyBmcm9tICcuL1NvbmdTZXR0aW5ncy5qc3gnO1xuaW1wb3J0IExheWVyU2V0dGluZ3MgZnJvbSAnLi9MYXllclNldHRpbmdzLmpzeCc7XG5pbXBvcnQgQWRkTGF5ZXIgZnJvbSAnLi9BZGRMYXllci5qc3gnO1xuaW1wb3J0IExheWVyIGZyb20gJy4vTGF5ZXIuanN4JztcbmltcG9ydCBTZWxlY3RDaG9yZCBmcm9tICcuL1NlbGVjdENob3JkLmpzeCc7XG5pbXBvcnQgVGFwSGlnaGxpZ2h0IGZyb20gJy4vVGFwSGlnaGxpZ2h0LmpzeCc7XG5pbXBvcnQgQSBmcm9tICcuL0EuanN4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0dXBkYXRlU2l6ZT0oKT0+e1xuXHRcdGxldCB3aW5kb3dXaWR0aD1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGg7XG5cdFx0bGV0IHdpbmRvd0hlaWdodD1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuXG5cdFx0bGV0IGNzPWdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KTtcblx0XHRsZXQgcGFuZVdpZHRoPXBhcnNlRmxvYXQoY3MuZ2V0UHJvcGVydHlWYWx1ZSgnLS1wYW5lV2lkdGgnKSk7XG5cdFx0bGV0IHBhbmVIZWlnaHQ9cGFyc2VGbG9hdChjcy5nZXRQcm9wZXJ0eVZhbHVlKCctLXBhbmVIZWlnaHQnKSk7XG5cblx0XHRsZXQgY29udGVudFdpZHRoLGNvbnRlbnRIZWlnaHQ7XG5cblx0XHRsZXQgZWw9ZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcblx0XHRsZXQgc2NyZWVuS2V5Ym9hcmRBY3RpdmU9ZmFsc2U7XG5cdFx0aWYgKGVsLm5vZGVOYW1lPT1cIklOUFVUXCIgJiYgZWwudHlwZT09XCJ0ZXh0XCIpXG5cdFx0XHRzY3JlZW5LZXlib2FyZEFjdGl2ZT10cnVlO1xuXG5cdFx0Ly8gUG9ydHJhaXQuXG5cdFx0aWYgKHdpbmRvd0hlaWdodD53aW5kb3dXaWR0aCkge1xuXHRcdFx0Y29udGVudEhlaWdodD0yKihwYW5lSGVpZ2h0KzEpKzI7XG5cdFx0XHRjb250ZW50V2lkdGg9cGFuZVdpZHRoKzE7XG5cdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5jbGFzc0xpc3QuYWRkKFwicG9ydHJhaXRcIik7XG5cdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5jbGFzc0xpc3QucmVtb3ZlKFwibGFuZHNjYXBlXCIpO1xuXG5cdFx0XHRpZiAod2luZG93Lmhhc093blByb3BlcnR5KFwiY29yZG92YVwiKSlcblx0XHRcdFx0U3RhdHVzQmFyLnNob3coKTtcblx0XHR9XG5cblx0XHQvLyBMYW5kc2NhcGUuXG5cdFx0ZWxzZSB7XG5cdFx0XHRjb250ZW50SGVpZ2h0PXBhbmVIZWlnaHQrMisxO1xuXHRcdFx0Y29udGVudFdpZHRoPTIqKHBhbmVXaWR0aCsxKTtcblx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmNsYXNzTGlzdC5hZGQoXCJsYW5kc2NhcGVcIik7XG5cdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5jbGFzc0xpc3QucmVtb3ZlKFwicG9ydHJhaXRcIik7XG5cblx0XHRcdGlmICh3aW5kb3cuaGFzT3duUHJvcGVydHkoXCJjb3Jkb3ZhXCIpKSB7XG5cdFx0XHRcdGlmIChzY3JlZW5LZXlib2FyZEFjdGl2ZSlcblx0XHRcdFx0XHRTdGF0dXNCYXIuc2hvdygpO1xuXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRTdGF0dXNCYXIuaGlkZSgpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGxldCBmb250U2l6ZTtcblx0XHRpZiAod2luZG93V2lkdGgvY29udGVudFdpZHRoPHdpbmRvd0hlaWdodC9jb250ZW50SGVpZ2h0KVxuXHRcdFx0Zm9udFNpemU9d2luZG93V2lkdGgvY29udGVudFdpZHRoO1xuXG5cdFx0ZWxzZVxuXHRcdFx0Zm9udFNpemU9d2luZG93SGVpZ2h0L2NvbnRlbnRIZWlnaHQ7XG5cblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaHRtbFwiKS5zdHlsZS5mb250U2l6ZT1mb250U2l6ZStcInB4XCI7XG5cblx0XHRsZXQgcz1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGU7XG5cdFx0cy5zZXRQcm9wZXJ0eShcIi0tcGFuZU1hcmdpblRvcFwiLCgod2luZG93SGVpZ2h0LWZvbnRTaXplKmNvbnRlbnRIZWlnaHQpLzIpK1wicHhcIik7XG5cdFx0cy5zZXRQcm9wZXJ0eShcIi0tcGFuZU1hcmdpbkxlZnRcIiwoKHdpbmRvd1dpZHRoLWZvbnRTaXplKmNvbnRlbnRXaWR0aCkvMikrXCJweFwiKTtcblx0fVxuXG5cdG9uUGxheUNsaWNrPSgpPT57XG5cdFx0Y29uc29sZS5sb2coXCJwbGF5XCIpO1xuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0d2luZG93Lm9ucmVzaXplPXRoaXMudXBkYXRlU2l6ZTtcblx0XHRzZXRUaW1lb3V0KHRoaXMudXBkYXRlU2l6ZSwwKTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRpZiAodGhpcy5jb250ZXh0LmJ1c3kpXG5cdFx0XHRyZXR1cm4gKDxkaXY+TE9BRElORy4uLjwvZGl2Pik7XG5cblx0XHRsZXQgY2xzPVwiXCI7XG5cdFx0aWYgKHRoaXMuY29udGV4dC5yZWNvcmRpbmcpXG5cdFx0XHRjbHM9XCJyZWNvcmRpbmdcIjtcblxuXHRcdC8vIDxUYXBIaWdobGlnaHQgLz5cblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzPXtjbHN9PlxuXHRcdFx0XHQ8SGVhZGVyIC8+XG5cdFx0XHRcdHtJRighdGhpcy5jb250ZXh0LmlzU29uZ09wZW4oKSwoKT0+XG5cdFx0XHRcdFx0PEZyb250IC8+XG5cdFx0XHRcdCl9XG5cdFx0XHRcdHtJRih0aGlzLmNvbnRleHQuaXNTb25nT3BlbigpLCgpPT57XG5cdFx0XHRcdFx0aWYgKHRoaXMuY29udGV4dC5zZXR0aW5nc1Zpc2libGUpIHtcblx0XHRcdFx0XHRcdGlmICh0aGlzLmNvbnRleHQuY3VycmVudExheWVySW5kZXg+PTApXG5cdFx0XHRcdFx0XHRcdHJldHVybiA8TGF5ZXJTZXR0aW5ncyAvPjtcblxuXHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gPFNvbmdTZXR0aW5ncyAvPjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRlbHNlIGlmICh0aGlzLmNvbnRleHQuYWRkTGF5ZXJWaXNpYmxlKVxuXHRcdFx0XHRcdFx0cmV0dXJuIDxBZGRMYXllciAvPjtcblxuXHRcdFx0XHRcdGVsc2UgaWYgKHRoaXMuY29udGV4dC5jdXJyZW50TGF5ZXJJbmRleD49MClcblx0XHRcdFx0XHRcdHJldHVybiA8TGF5ZXIgLz5cblxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdHJldHVybiA8U29uZyAvPjtcblx0XHRcdFx0fSl9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBoLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IEEgZnJvbSAnLi9BLmpzeCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZyb250IHtcblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZS1jb250YWluZXJcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cImJveCBwYW5lIGRvdWJsZSBib3JkZXIgYm9yZGVyLWRhcmtcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZS1oZWFkZXIgdGV4dC1zZWNvbmRhcnkgYmctZGFya1wiPlNPTkdTPC9kaXY+XG5cblx0XHRcdFx0XHQ8QSBjbGFzcz1cInRleHQtd2hpdGVcIlxuXHRcdFx0XHRcdFx0XHRvblJlbGVhc2U9e3RoaXMuY29udGV4dC5hZGRTb25nfT5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJib3ggYmctZGFyayB3LTFcIj4rPC9kaXY+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYm94XCI+TmV3IFNvbmc8L2Rpdj5cblx0XHRcdFx0XHQ8L0E+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cImZyb250LWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0e3RoaXMuY29udGV4dC5zb25ncy5tYXAoKHNvbmcsaW5kZXgpPT4oXG5cdFx0XHRcdFx0XHRcdDxBIGNsYXNzPVwiYm94IGJnLXNlY29uZGFyeSB0ZXh0LXdoaXRlIHctNCBib3JkZXIgYm9yZGVyLWxpZ2h0IGVsXCJcblx0XHRcdFx0XHRcdFx0XHRcdG9uUmVsZWFzZT17dGhpcy5jb250ZXh0LnNldFNvbmdJbmRleC5iaW5kKG51bGwsaW5kZXgpfVxuXHRcdFx0XHRcdFx0XHRcdFx0Y2FuY2VsT25Nb3ZlPXt0cnVlfT5cblx0XHRcdFx0XHRcdFx0XHR7c29uZy5uYW1lfVxuXHRcdFx0XHRcdFx0XHQ8L0E+XG5cdFx0XHRcdFx0XHQpKX1cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBoLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IHsgU2VsZWN0LCBJRiB9IGZyb20gJy4uL3V0aWxzL1JlYWN0VXRpbC5qc3gnO1xuaW1wb3J0IEEgZnJvbSAnLi9BLmpzeCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYWRlciBleHRlbmRzIENvbXBvbmVudCB7XG5cdHJlbmRlcigpIHtcblx0XHRsZXQgcGxheUJ1dHRvbkNsYXNzPVwiaGVhZGVyLWJ1dHRvbiB0ZXh0LXdoaXRlIFwiO1xuXHRcdGlmICh0aGlzLmNvbnRleHQucGxheWluZylcblx0XHRcdHBsYXlCdXR0b25DbGFzcys9XCJhY3RpdmVcIjtcblxuXHRcdGxldCByZWNvcmRCdXR0b25DbGFzcz1cImhlYWRlci1idXR0b24gdGV4dC13aGl0ZSBcIjtcblx0XHRpZiAodGhpcy5jb250ZXh0LnJlY29yZGluZylcblx0XHRcdHJlY29yZEJ1dHRvbkNsYXNzKz1cImFjdGl2ZVwiO1xuXG5cdFx0bGV0IGl0ZW1zPVtdO1xuXHRcdGlmICh0aGlzLmNvbnRleHQuaXNTb25nT3BlbigpKSB7XG5cdFx0XHRpdGVtcy5wdXNoKFxuXHRcdFx0XHQ8QSBjbGFzcz1cImhlYWRlci1idXR0b24gdGV4dC13aGl0ZVwiXG5cdFx0XHRcdFx0XHRvblJlbGVhc2U9e3RoaXMuY29udGV4dC5nb0JhY2t9PlxuXHRcdFx0XHRcdDxpbWcgc3JjPVwiaW1nL2Fycm93LWxlZnQuc3ZnXCIvPlxuXHRcdFx0XHQ8L0E+XG5cdFx0XHQpO1xuXG5cdFx0XHRpZiAodGhpcy5jb250ZXh0LmN1cnJlbnRMYXllckluZGV4Pj0wKVxuXHRcdFx0XHRpdGVtcy5wdXNoKFxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJoZWFkZXItYnV0dG9uIHRleHQtd2hpdGVcIj5cblx0XHRcdFx0XHRcdDxpbWcgc3JjPXtcImltZy9cIit0aGlzLmNvbnRleHQuZ2V0SW5zdHJ1bWVudEJ5TmFtZSh0aGlzLmNvbnRleHQuZ2V0Q3VycmVudExheWVyKCkuaW5zdHJ1bWVudE5hbWUpLmljb259Lz5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0KTtcblxuXHRcdFx0aXRlbXMucHVzaChcblx0XHRcdFx0PGRpdiBjbGFzcz1cImhlYWRlci10ZXh0IHRleHQtd2hpdGVcIj5cblx0XHRcdFx0XHR7dGhpcy5jb250ZXh0LmdldEN1cnJlbnRTb25nKCkubmFtZX1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQpO1xuXG5cdFx0XHRpdGVtcy5wdXNoKFxuXHRcdFx0XHQ8QSBjbGFzcz17cGxheUJ1dHRvbkNsYXNzfVxuXHRcdFx0XHRcdFx0b25QcmVzcz17dGhpcy5jb250ZXh0LnBsYXlDbGlja30+XG5cdFx0XHRcdFx0PGltZyBzcmM9XCJpbWcvcGxheS1maWxsLnN2Z1wiLz5cblx0XHRcdFx0PC9BPlxuXHRcdFx0KTtcblxuXHRcdFx0aWYgKHRoaXMuY29udGV4dC5jdXJyZW50TGF5ZXJJbmRleD49MCkgXG5cdFx0XHRcdGl0ZW1zLnB1c2goXG5cdFx0XHRcdFx0PEEgY2xhc3M9e3JlY29yZEJ1dHRvbkNsYXNzfVxuXHRcdFx0XHRcdFx0XHRvblByZXNzPXt0aGlzLmNvbnRleHQucmVjb3JkQ2xpY2t9PlxuXHRcdFx0XHRcdFx0PGltZyBzcmM9XCJpbWcvY2lyY2xlLWZpbGwuc3ZnXCIvPlxuXHRcdFx0XHRcdDwvQT5cblx0XHRcdFx0KTtcblxuXHRcdFx0aXRlbXMucHVzaChcblx0XHRcdFx0PEEgY2xhc3M9XCJoZWFkZXItYnV0dG9uIHRleHQtd2hpdGVcIlxuXHRcdFx0XHRcdFx0b25SZWxlYXNlPXt0aGlzLmNvbnRleHQudG9nZ2xlU2V0dGluZ3N9PlxuXHRcdFx0XHRcdDxpbWcgc3JjPVwiaW1nL2dlYXItZmlsbC5zdmdcIi8+XG5cdFx0XHRcdDwvQT5cblx0XHRcdCk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0aXRlbXMucHVzaChcblx0XHRcdFx0PGRpdiBjbGFzcz1cImhlYWRlci10ZXh0IHRleHQtd2hpdGVcIj5Ib29kbW9kZTwvZGl2PlxuXHRcdFx0KTtcblx0XHR9XG5cblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzPVwiaGVhZGVyIGJveCBiZy1kYXJrXCI+XG5cdFx0XHRcdHtpdGVtc31cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0iLCJpbXBvcnQgeyBoLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IEEgZnJvbSAnLi9BLmpzeCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExheWVyIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0b25LZXlEb3duPShlKT0+e1xuXHRcdGlmIChlLnRhcmdldC5ub2RlTmFtZT09XCJJTlBVVFwiKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0bGV0IGs9cGFyc2VJbnQoZS5rZXkpLTE7XG5cdFx0aWYgKGs+PTApXG5cdFx0XHR0aGlzLmNvbnRleHQuc291bmRCdXR0b25DbGljayhrKTtcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCkge1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsdGhpcy5vbktleURvd24pO1xuXHR9XG5cblx0Y29tcG9uZW50V2lsbFVubW91bnQoKSB7XG5cdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIix0aGlzLm9uS2V5RG93bik7XG5cdH1cblxuXHRyZW5kZXJTb3VuZFN5bWJvbHMoKSB7XG5cdFx0bGV0IGluc3RydW1lbnQ9dGhpcy5jb250ZXh0LmdldEN1cnJlbnRJbnN0cnVtZW50KCk7XG5cdFx0bGV0IGxheWVyPXRoaXMuY29udGV4dC5nZXRDdXJyZW50TGF5ZXIoKTtcblx0XHRsZXQgYnV0dG9ucz1uZXcgQXJyYXkoMTYpLmZpbGwoPGRpdiBjbGFzcz1cImJveCB3LTFcIi8+KTtcblx0XHRsZXQgbnVtU291bmRzPXRoaXMuY29udGV4dC5nZXRJbnN0cnVtZW50TnVtU291bmRzQnlOYW1lKGluc3RydW1lbnQubmFtZSk7XG5cblx0XHRmb3IgKGxldCBpPTA7IGk8OTsgaSsrKSB7XG5cdFx0XHRsZXQgYnV0dG9uSW5kZXg9OC00Kk1hdGguZmxvb3IoaS8zKStpJTM7XG5cdFx0XHRpZiAoaTxudW1Tb3VuZHMpIHtcblx0XHRcdFx0bGV0IGJ1dHRvbkNsYXNzPVwiYm94IHctMSBiZy1wcmltYXJ5IHRleHQtd2hpdGUgXCI7XG5cblx0XHRcdFx0aWYgKHRoaXMuY29udGV4dC5jdXJyZW50R3JpZEluZGV4Pj0wICYmXG5cdFx0XHRcdFx0XHRsYXllci5zZXFbdGhpcy5jb250ZXh0LmN1cnJlbnRHcmlkSW5kZXhdLnNvdW5kcy5pbmNsdWRlcyhpKSlcblx0XHRcdFx0XHRidXR0b25DbGFzcys9XCJhY3RpdmVcIlxuXG5cdFx0XHRcdGxldCBidXR0b25JY29uO1xuXHRcdFx0XHRpZiAoaW5zdHJ1bWVudC50eXBlPT1cInBlcmN1c3NpdmVcIilcblx0XHRcdFx0XHRidXR0b25JY29uPVwiaW1nL1wiK2luc3RydW1lbnQuaWNvbnNbaV07XG5cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdGJ1dHRvbkljb249XCJpbWcvaG5vdGUtXCIrKDErMiooaSUzKSkrXCIuc3ZnXCI7XG5cblx0XHRcdFx0YnV0dG9uc1tidXR0b25JbmRleF09XG5cdFx0XHRcdFx0PEEgY2xhc3M9e2J1dHRvbkNsYXNzfVxuXHRcdFx0XHRcdFx0XHRvblByZXNzPXt0aGlzLmNvbnRleHQuc291bmRCdXR0b25DbGljay5iaW5kKG51bGwsaSl9PlxuXHRcdFx0XHRcdFx0PGltZyBzcmM9e2J1dHRvbkljb259Lz5cblx0XHRcdFx0XHQ8L0E+XG5cdFx0XHR9XG5cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRidXR0b25zW2J1dHRvbkluZGV4XT1cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYm94IHctMSBiZy1wcmltYXJ5XCIvPlxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0bGV0IGNscz1cImJveCB3LTEgYmctd2FybmluZyB0ZXh0LXdoaXRlIFwiO1xuXHRcdGlmICh0aGlzLmNvbnRleHQuY3VycmVudEdyaWRJbmRleD49MCAmJlxuXHRcdFx0XHRcdGxheWVyLnNlcVt0aGlzLmNvbnRleHQuY3VycmVudEdyaWRJbmRleF0uc3RhY2MpXG5cdFx0XHRjbHMrPVwiYWN0aXZlXCI7XG5cblx0XHRidXR0b25zWzEyXT0oXG5cdFx0XHQ8QSBjbGFzcz17Y2xzfVxuXHRcdFx0XHRcdG9uUHJlc3M9e3RoaXMuY29udGV4dC50b2dnbGVDdXJyZW50TGF5ZXJTdGFjY30+XG5cdFx0XHRcdDxpbWcgc3JjPVwiaW1nL3Jlc3Quc3ZnXCIvPlxuXHRcdFx0PC9BPlxuXHRcdCk7XG5cblx0XHRsZXQgY3VycmVudFZlbD1udWxsO1xuXHRcdGlmICh0aGlzLmNvbnRleHQuY3VycmVudEdyaWRJbmRleD49MCAmJlxuXHRcdFx0XHR0aGlzLmNvbnRleHQuY3VycmVudExheWVySGFzU291bmRBdCh0aGlzLmNvbnRleHQuY3VycmVudEdyaWRJbmRleCkpXG5cdFx0XHRjdXJyZW50VmVsPWxheWVyLnNlcVt0aGlzLmNvbnRleHQuY3VycmVudEdyaWRJbmRleF0udmVsO1xuXG5cdFx0bGV0IHNpemVDbGFzc2VzPVtcInRpbnlcIixcInNtYWxsXCIsXCJcIl07XG5cdFx0bGV0IHZlbHM9WzAuMjUsMC41MCwxXTtcblx0XHRmb3IgKGxldCBpPTA7IGk8MzsgaSsrKSB7XG5cdFx0XHRsZXQgY2xzPVwiYm94IHctMSBiZy13YXJuaW5nIHRleHQtd2hpdGUgXCIrc2l6ZUNsYXNzZXNbaV0rXCIgXCI7XG5cblx0XHRcdGlmIChjdXJyZW50VmVsPT12ZWxzW2ldKVxuXHRcdFx0XHRjbHMrPVwiYWN0aXZlXCI7XG5cblx0XHRcdGJ1dHRvbnNbMTMraV09KFxuXHRcdFx0XHQ8QSBjbGFzcz17Y2xzfVxuXHRcdFx0XHRcdFx0aHJlZj1cIiNcIlxuXHRcdFx0XHRcdFx0b25QcmVzcz17dGhpcy5jb250ZXh0LnNldEN1cnJlbnRMYXllclZlbC5iaW5kKG51bGwsdmVsc1tpXSl9PlxuXHRcdFx0XHRcdDxpbWcgc3JjPVwiaW1nL25vdGUuc3ZnXCIvPlxuXHRcdFx0XHQ8L0E+XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmIChpbnN0cnVtZW50LnR5cGU9PVwiaGFybW9uaWNcIikge1xuXHRcdFx0Zm9yIChsZXQgb2N0YXZlIG9mIFswLDEsMl0pIHtcblx0XHRcdFx0bGV0IGNscz1cImJveCB3LTEgYmctaW5mbyB0ZXh0LXdoaXRlIFwiO1xuXHRcdFx0XHRpZiAodGhpcy5jb250ZXh0LmN1cnJlbnRHcmlkSW5kZXg+PTAgJiZcblx0XHRcdFx0XHRcdHRoaXMuY29udGV4dC5jdXJyZW50TGF5ZXJIYXNDaG9yZEF0KHRoaXMuY29udGV4dC5jdXJyZW50R3JpZEluZGV4LG9jdGF2ZSkpXG5cdFx0XHRcdFx0Y2xzKz1cImFjdGl2ZVwiO1xuXG5cdFx0XHRcdGJ1dHRvbnNbMTEtb2N0YXZlKjRdPShcblx0XHRcdFx0XHQ8QSBjbGFzcz17Y2xzfVxuXHRcdFx0XHRcdFx0XHRocmVmPVwiI1wiXG5cdFx0XHRcdFx0XHRcdG9uUHJlc3M9e3RoaXMuY29udGV4dC5jaG9yZEJ1dHRvbkNsaWNrLmJpbmQobnVsbCxvY3RhdmUpfT5cblx0XHRcdFx0XHRcdDxpbWcgc3JjPVwiaW1nL2hub3RlLWNob3JkLnN2Z1wiLz5cblx0XHRcdFx0XHQ8L0E+XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGJ1dHRvbnM7XG5cdH1cblxuXHRyZW5kZXJTZXF1ZW5jZSgpIHtcblx0XHRsZXQgbGF5ZXI9dGhpcy5jb250ZXh0LmdldEN1cnJlbnRMYXllcigpO1xuXHRcdGxldCByZXM9W107XG5cdFx0bGV0IHZlbENscz17XG5cdFx0XHQwLjI1OiBcInRpbnlcIixcblx0XHRcdDAuNTogXCJzbWFsbFwiLFxuXHRcdFx0MTogXCJcIlxuXHRcdH07XG5cblx0XHRmb3IgKGxldCBncmlkSW5kZXg9MDsgZ3JpZEluZGV4PDE2OyBncmlkSW5kZXgrKykge1xuXHRcdFx0bGV0IGNscz1cImJveCB3LTEgYmVhdC1ncmlkIGJlYXQtXCIrZ3JpZEluZGV4K1wiIFwiO1xuXG5cdFx0XHRpZiAoZ3JpZEluZGV4PT10aGlzLmNvbnRleHQuY3VycmVudEdyaWRJbmRleClcblx0XHRcdFx0Y2xzKz1cImJnLWxpZ2h0IFwiO1xuXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGNscys9XCJiZy1ibGFjayB0ZXh0LXdoaXRlIFwiO1xuXG5cdFx0XHRsZXQgaWNvbj1udWxsO1xuXHRcdFx0aWYgKGxheWVyLnNlcVtncmlkSW5kZXhdLnN0YWNjKVxuXHRcdFx0XHRpY29uPTxpbWcgc3JjPVwiaW1nL3Jlc3Quc3ZnXCIvPjtcblxuXHRcdFx0ZWxzZSBpZiAodGhpcy5jb250ZXh0LmN1cnJlbnRMYXllckhhc1NvdW5kQXQoZ3JpZEluZGV4KSkge1xuXHRcdFx0XHRpY29uPTxpbWcgc3JjPVwiaW1nL25vdGUuc3ZnXCIvPjtcblx0XHRcdFx0Y2xzKz12ZWxDbHNbbGF5ZXIuc2VxW2dyaWRJbmRleF0udmVsXTtcblx0XHRcdH1cblxuXHRcdFx0cmVzLnB1c2goXG5cdFx0XHRcdDxBIGNsYXNzPXtjbHN9XG5cdFx0XHRcdFx0XHRvblByZXNzPXt0aGlzLmNvbnRleHQuZ3JpZEluZGV4Q2xpY2suYmluZChudWxsLGdyaWRJbmRleCl9PlxuXHRcdFx0XHRcdHtpY29ufVxuXHRcdFx0XHQ8L0E+XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXM7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0bGV0IGxheWVyPXRoaXMuY29udGV4dC5nZXRDdXJyZW50TGF5ZXIoKTtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZS1jb250YWluZXIgcmV2LXBvcnRyYWl0XCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lIGJveCBib3JkZXIgYm9yZGVyLWRhcmtcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZS1oZWFkZXIgdGV4dC1zZWNvbmRhcnkgYmctZGFya1wiPlNPVU5EUzwvZGl2PlxuXHRcdFx0XHRcdHt0aGlzLnJlbmRlclNvdW5kU3ltYm9scygpfVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInBhbmUgYm94IGJnLWRhcmtcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZS1oZWFkZXIgdGV4dC1zZWNvbmRhcnkgYmctZGFya1wiPlNFUVVFTkNFPC9kaXY+XG5cdFx0XHRcdFx0e3RoaXMucmVuZGVyU2VxdWVuY2UoKX1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBoLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IEEgZnJvbSAnLi9BLmpzeCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExheWVyU2V0dGluZ3Mge1xuXHRyZW5kZXIoKSB7XG5cdFx0bGV0IGluc3RydW1lbnQ9dGhpcy5jb250ZXh0LmdldEN1cnJlbnRJbnN0cnVtZW50KCk7XG5cdFx0bGV0IGxheWVyPXRoaXMuY29udGV4dC5nZXRDdXJyZW50TGF5ZXIoKTtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZS1jb250YWluZXJcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cImJveCBwYW5lIGRvdWJsZSBiZy1kYXJrXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInBhbmUtaGVhZGVyIGJnLWRhcmsgdGV4dC1zZWNvbmRhcnlcIj5MQVlFUiBTRVRUSU5HUzwvZGl2PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJib3ggdy00IGVsIHRleHQtd2hpdGVcIj5cblx0XHRcdFx0XHRcdDxpbWcgc3JjPXtcImltZy9cIitpbnN0cnVtZW50Lmljb259Lz5cblx0XHRcdFx0XHRcdHtpbnN0cnVtZW50Lm5hbWV9XG5cdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHQ8YnIvPjxici8+XG5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cblx0XHRcdFx0XHRcdFZvbHVtZTxici8+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYm94IGJvcmRlciBiZy13aGl0ZSBib3JkZXItYmxhY2sgdGV4dC1ibGFjayB3LTRcIj5cblx0XHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJyYW5nZVwiIG1pbj1cIjBcIiBtYXg9XCIxXCIgc3RlcD1cIjAuMDFcIlxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlPXtsYXllci52b2x1bWV9XG5cdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuY29udGV4dC5zZXRDdXJyZW50TGF5ZXJWb2x1bWV9XG5cdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJmb3JtLWJ1dHRvbnNcIj5cblx0XHRcdFx0XHRcdDxBIGNsYXNzPVwiYm94IGJnLWRhbmdlciB0ZXh0LXdoaXRlXCJcblx0XHRcdFx0XHRcdFx0XHRvblJlbGVhc2U9e3RoaXMuY29udGV4dC5kZWxldGVDdXJyZW50TGF5ZXJ9PlxuXHRcdFx0XHRcdFx0XHRSZW1vdmUgTGF5ZXJcblx0XHRcdFx0XHRcdDwvQT5cblx0XHRcdFx0XHRcdDxBIGNsYXNzPVwiYm94IGJnLXByaW1hcnkgZm9ybS1idXR0b24gdGV4dC13aGl0ZVwiXG5cdFx0XHRcdFx0XHRcdFx0b25SZWxlYXNlPXt0aGlzLmNvbnRleHQudG9nZ2xlU2V0dGluZ3N9PlxuXHRcdFx0XHRcdFx0XHRDbG9zZVxuXHRcdFx0XHRcdFx0PC9BPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbiIsImltcG9ydCB7IGgsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgQSBmcm9tICcuL0EuanN4JztcbmltcG9ydCB7IFNlbGVjdCwgSUYgfSBmcm9tICcuLi91dGlscy9SZWFjdFV0aWwuanN4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VsZWN0Q2hvcmQge1xuXHRyZW5kZXIoKSB7XG5cdFx0bGV0IHNvbmc9dGhpcy5jb250ZXh0LmdldEN1cnJlbnRTb25nKCk7XG5cdFx0bGV0IHNlY3Rpb249c29uZy5zZWN0aW9uc1t0aGlzLmNvbnRleHQuY3VycmVudFNlY3Rpb25JbmRleF07XG5cdFx0bGV0IGN1cnJlbnRDaG9yZEluZGV4PXNlY3Rpb25bdGhpcy5jb250ZXh0LmVkaXRTZWN0aW9uQ2hvcmRWaXNpYmxlXTtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzPVwibW9kYWwtY29udGFpbmVyXCIgb25DbGljaz17dGhpcy5jb250ZXh0LmhpZGVFZGl0U2VjdGlvbkNob3JkfT5cblx0XHRcdFx0PGRpdiBjbGFzcz1cImJveCBib3JkZXIgYm9yZGVyLWRhcmsgYmctYmFja2dyb3VuZCBzZWxlY3QtY2hvcmRcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZS1oZWFkZXIgdGV4dC1zZWNvbmRhcnkgYmctZGFyayBcIj5FRElUIENIT1JEPC9kaXY+XG5cdFx0XHRcdFx0PGhyIGNsYXNzPVwicGFuZS1kaXZpZGVyIGZvdXJcIi8+XG5cdFx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHRcdHt0aGlzLmNvbnRleHQuZ2V0Q2hvcmRMYWJlbHMoKS5tYXAoKGxhYmVsLCBpbmRleCk9Pntcblx0XHRcdFx0XHRcdFx0bGV0IGNscz1cImJveCB3LTEgYmctc3VjY2VzcyB0ZXh0LWxpZ2h0IGNob3JkIFwiO1xuXHRcdFx0XHRcdFx0XHRpZiAoaW5kZXg9PWN1cnJlbnRDaG9yZEluZGV4KVxuXHRcdFx0XHRcdFx0XHRcdGNscys9XCJhY3RpdmVcIjtcblxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdFx0XHRcdDxBIGNsYXNzPXtjbHN9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG9uUmVsZWFzZT17dGhpcy5jb250ZXh0LmVkaXRTZWN0aW9uQ2hvcmQuYmluZChudWxsLGluZGV4KX0+XG5cdFx0XHRcdFx0XHRcdFx0XHR7bGFiZWx9XG5cdFx0XHRcdFx0XHRcdFx0PC9BPlxuXHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHR9KX1cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHR7SUYoc2VjdGlvbi5sZW5ndGg+MSwoKT0+XG5cdFx0XHRcdFx0XHQ8QSBjbGFzcz1cImJveCBiZy1kYW5nZXIgdy0xIHRleHQtd2hpdGVcIlxuXHRcdFx0XHRcdFx0XHRcdGhyZWY9XCIjXCJcblx0XHRcdFx0XHRcdFx0XHRvblJlbGVhc2U9e3RoaXMuY29udGV4dC5yZW1vdmVTZWN0aW9uQ2hvcmR9PlxuXHRcdFx0XHRcdFx0XHQ8aW1nIHNyYz1cImltZy90cmFzaC5zdmdcIi8+XG5cdFx0XHRcdFx0XHQ8L0E+XG5cdFx0XHRcdFx0KX1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBoLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IFNvbmdMYXllcnMgZnJvbSAnLi9Tb25nTGF5ZXJzLmpzeCc7XG5pbXBvcnQgU29uZ0Nob3JkcyBmcm9tICcuL1NvbmdDaG9yZHMuanN4JztcbmltcG9ydCBBIGZyb20gJy4vQS5qc3gnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTb25nIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZS1jb250YWluZXJcIj5cblx0XHRcdFx0PFNvbmdMYXllcnMgLz5cblx0XHRcdFx0PFNvbmdDaG9yZHMgLz5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbiIsImltcG9ydCB7IGgsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgU2VsZWN0Q2hvcmQgZnJvbSAnLi9TZWxlY3RDaG9yZC5qc3gnO1xuaW1wb3J0IHsgU2VsZWN0LCBJRiB9IGZyb20gJy4uL3V0aWxzL1JlYWN0VXRpbC5qc3gnO1xuaW1wb3J0IEEgZnJvbSAnLi9BLmpzeCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNvbmdDaG9yZHMgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRyZW5kZXJDb25kdWN0b3JDaG9yZHMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuY29udGV4dC5nZXRDaG9yZExhYmVscygpLm1hcCgobGFiZWwsIGluZGV4KT0+e1xuXHRcdFx0bGV0IGNscz1cImJveCB3LTEgYmctc3VjY2VzcyB0ZXh0LWxpZ2h0IGNob3JkIFwiO1xuXHRcdFx0aWYgKGluZGV4PT10aGlzLmNvbnRleHQuY3VycmVudENob3JkSW5kZXgpXG5cdFx0XHRcdGNscys9XCIgYWN0aXZlIGJlYXQtMCBiZWF0LTQgYmVhdC04IGJlYXQtMTJcIjtcblxuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PEEgY2xhc3M9e2Nsc31cblx0XHRcdFx0XHRcdG9uUHJlc3M9e3RoaXMuY29udGV4dC5zZXRDdXJyZW50Q2hvcmRJbmRleC5iaW5kKG51bGwsaW5kZXgpfT5cblx0XHRcdFx0XHR7bGFiZWx9XG5cdFx0XHRcdDwvQT5cblx0XHRcdClcblx0XHR9KTtcblx0fVxuXG5cdHJlbmRlclNlY3Rpb25DaG9yZHMoKSB7XG5cdFx0bGV0IGE9dGhpcy5jb250ZXh0LmdldEN1cnJlbnRTZWN0aW9uQ2hvcmRMYWJlbHMoKS5tYXAoKGxhYmVsLCBpbmRleCk9Pntcblx0XHRcdGxldCBjbHM9XCJib3ggdy0xIGJnLXN1Y2Nlc3MgdGV4dC1saWdodCBzZWN0aW9uLWNob3JkIHNlcXVlbmNlLVwiK2luZGV4O1xuXG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8QSBjbGFzcz17Y2xzfVxuXHRcdFx0XHRcdFx0b25SZWxlYXNlPXt0aGlzLmNvbnRleHQuc2hvd0VkaXRTZWN0aW9uQ2hvcmQuYmluZChudWxsLGluZGV4KX0+XG5cdFx0XHRcdFx0e2xhYmVsfVxuXHRcdFx0XHQ8L0E+XG5cdFx0XHQpO1xuXHRcdH0pO1xuXG5cdFx0YS5wdXNoKFxuXHRcdFx0PEEgY2xhc3M9XCJib3ggYm9yZGVyIGJvcmRlci13aGl0ZSB0ZXh0LXdoaXRlIHctMVwiXG5cdFx0XHRcdFx0b25SZWxlYXNlPXt0aGlzLmNvbnRleHQuYWRkU2VjdGlvbkNob3JkfT5cblx0XHRcdFx0K1xuXHRcdFx0PC9BPlxuXHRcdCk7XG5cblx0XHRyZXR1cm4gYTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRsZXQgc29uZz10aGlzLmNvbnRleHQuZ2V0Q3VycmVudFNvbmcoKTtcblxuXHRcdGxldCBjaG9yZExhYmVscztcblx0XHRpZiAodGhpcy5jb250ZXh0LmN1cnJlbnRTZWN0aW9uSW5kZXg9PS0xKVxuXHRcdFx0Y2hvcmRMYWJlbHM9dGhpcy5yZW5kZXJDb25kdWN0b3JDaG9yZHMoKTtcblxuXHRcdGVsc2Vcblx0XHRcdGNob3JkTGFiZWxzPXRoaXMucmVuZGVyU2VjdGlvbkNob3JkcygpO1xuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lIGJveCBib3JkZXIgYm9yZGVyLWRhcmtcIj5cblx0XHRcdFx0PGhyIGNsYXNzPVwicGFuZS1kaXZpZGVyXCIvPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZS1oZWFkZXIgdGV4dC1zZWNvbmRhcnkgYmctZGFyayBcIj5DSE9SRFM8L2Rpdj5cblx0XHRcdFx0PGRpdiBzdHlsZT17e2hlaWdodDogJzZlbSd9fT57Y2hvcmRMYWJlbHN9PC9kaXY+XG5cdFx0XHRcdDxBIGNsYXNzPXtcImJveCB3LTEgYmctc2Vjb25kYXJ5IHRleHQtd2hpdGUgXCIrXG5cdFx0XHRcdFx0XHRcdCgodGhpcy5jb250ZXh0LmN1cnJlbnRTZWN0aW9uSW5kZXg9PS0xKT9cImFjdGl2ZVwiOlwiXCIpfVxuXHRcdFx0XHRcdFx0b25QcmVzcz17dGhpcy5jb250ZXh0LnNldEN1cnJlbnRTZWN0aW9uSW5kZXguYmluZChudWxsLC0xKX0+XG5cdFx0XHRcdFx0PGltZyBzcmM9XCJpbWcvY29uZHVjdG9yLnN2Z1wiLz5cblx0XHRcdFx0PC9BPlxuXHRcdFx0XHR7W1wiQVwiLFwiQlwiLFwiQ1wiXS5tYXAoKGxldHRlciwgaW5kZXgpPT57XG5cdFx0XHRcdFx0bGV0IGNscz1cImJveCB3LTEgYmctcHJpbWFyeSB0ZXh0LXdoaXRlIFwiO1xuXHRcdFx0XHRcdGlmIChpbmRleD09dGhpcy5jb250ZXh0LmN1cnJlbnRTZWN0aW9uSW5kZXgpXG5cdFx0XHRcdFx0XHRjbHMrPVwiYWN0aXZlXCI7XG5cblx0XHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdFx0PEEgY2xhc3M9e2Nsc31cblx0XHRcdFx0XHRcdFx0XHRvblByZXNzPXt0aGlzLmNvbnRleHQuc2V0Q3VycmVudFNlY3Rpb25JbmRleC5iaW5kKG51bGwsaW5kZXgpfT5cblx0XHRcdFx0XHRcdFx0e2xldHRlcn1cblx0XHRcdFx0XHRcdDwvQT5cblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9KX1cblx0XHRcdFx0e0lGKHRoaXMuY29udGV4dC5lZGl0U2VjdGlvbkNob3JkVmlzaWJsZT49MCwoKT0+XG5cdFx0XHRcdFx0PFNlbGVjdENob3JkIC8+XG5cdFx0XHRcdCl9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBoLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IEEgZnJvbSAnLi9BLmpzeCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNvbmdMYXllcnMgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRyZW5kZXIoKSB7XG5cdFx0bGV0IHNvbmc9dGhpcy5jb250ZXh0LmdldEN1cnJlbnRTb25nKCk7XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzcz1cInBhbmUgYm94IGJvcmRlciBib3JkZXItZGFya1wiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZS1oZWFkZXIgdGV4dC1zZWNvbmRhcnlcIj5MQVlFUlM8L2Rpdj5cblx0XHRcdFx0e3NvbmcubGF5ZXJzLm1hcCgobGF5ZXIsaW5kZXgpPT57XG5cdFx0XHRcdFx0bGV0IGNscz1cImJveCBiZy1kYW5nZXIgdGV4dC13aGl0ZSB3LTIgbGF5ZXItYnV0dG9uLVwiK2luZGV4K1wiIFwiO1xuXHRcdFx0XHRcdGxldCBpY29uPVwiaW1nL3RvZ2dsZS1vbi5zdmdcIjtcblxuXHRcdFx0XHRcdGlmICghbGF5ZXIuYXVkaWJsZSkge1xuXHRcdFx0XHRcdFx0aWNvbj1cImltZy90b2dnbGUtb2ZmLnN2Z1wiO1xuXHRcdFx0XHRcdFx0Y2xzKz1cImZhZGVkXCI7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHRcdDxBIGNsYXNzPXtjbHN9XG5cdFx0XHRcdFx0XHRcdG9uUmVsZWFzZT17dGhpcy5jb250ZXh0LnNldExheWVySW5kZXguYmluZChudWxsLGluZGV4KX0+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJsYXllci1pY29uXCI+XG5cdFx0XHRcdFx0XHRcdFx0PGltZyBzcmM9e1wiaW1nL1wiK3RoaXMuY29udGV4dC5nZXRJbnN0cnVtZW50QnlOYW1lKGxheWVyLmluc3RydW1lbnROYW1lKS5pY29ufS8+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8QSBjbGFzcz1cImxheWVyLWljb25cIlxuXHRcdFx0XHRcdFx0XHRcdG9uUHJlc3M9e3RoaXMuY29udGV4dC50b2dnbGVMYXllckF1ZGlibGUuYmluZChudWxsLGluZGV4KX0+XG5cdFx0XHRcdFx0XHRcdFx0PGltZyBzcmM9e2ljb259Lz5cblx0XHRcdFx0XHRcdFx0PC9BPlxuXHRcdFx0XHRcdFx0PC9BPlxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH0pfVxuXG5cdFx0XHRcdDxBIGNsYXNzPVwiYm94IGJvcmRlciBib3JkZXItd2hpdGUgdGV4dC13aGl0ZSB3LTFcIlxuXHRcdFx0XHRcdFx0aHJlZj1cIiNcIlxuXHRcdFx0XHRcdFx0b25SZWxlYXNlPXt0aGlzLmNvbnRleHQuc2hvd0FkZExheWVyfT5cblx0XHRcdFx0XHQrXG5cdFx0XHRcdDwvQT5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbiIsImltcG9ydCB7IGgsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyBTZWxlY3QsIElGIH0gZnJvbSAnLi4vdXRpbHMvUmVhY3RVdGlsLmpzeCc7XG5pbXBvcnQgQSBmcm9tICcuL0EuanN4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU29uZ1NldHRpbmdzIHtcblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZS1jb250YWluZXJcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInBhbmUgYm94IGRvdWJsZSBiZy1kYXJrXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInBhbmUtaGVhZGVyIGJnLWRhcmsgdGV4dC1zZWNvbmRhcnlcIj5TT05HIFNFVFRJTkdTPC9kaXY+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG5cdFx0XHRcdFx0XHRTb25nIE5hbWU8YnIvPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImJveCBib3JkZXIgYmctd2hpdGUgYm9yZGVyLWJsYWNrIHRleHQtYmxhY2sgdy00XCI+XG5cdFx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwidGV4dFwiXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU9e3RoaXMuY29udGV4dC5nZXRDdXJyZW50U29uZygpLm5hbWV9XG5cdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuY29udGV4dC5zZXRDdXJyZW50U29uZ05hbWV9Lz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG5cdFx0XHRcdFx0XHRUZW1wbzxici8+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYm94IGJvcmRlciBiZy13aGl0ZSBib3JkZXItYmxhY2sgdGV4dC1ibGFjayB3LTRcIj5cblx0XHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJ0ZXh0XCJcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17dGhpcy5jb250ZXh0LmdldEN1cnJlbnRTb25nKCkuYnBtfVxuXHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLmNvbnRleHQuc2V0Q3VycmVudFNvbmdCcG19Lz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG5cdFx0XHRcdFx0XHRLZXk8YnIvPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImJveCBib3JkZXIgYmctd2hpdGUgYm9yZGVyLWJsYWNrIHRleHQtYmxhY2sgdy0yXCI+XG5cdFx0XHRcdFx0XHRcdDxTZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2wgY29sLTJcIlxuXHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucz17dGhpcy5jb250ZXh0LmdldE5vdGVzU2VsZWN0T3B0aW9ucygpfVxuXHRcdFx0XHRcdFx0XHRcdFx0c2VsZWN0ZWQ9e3RoaXMuY29udGV4dC5nZXRDdXJyZW50U29uZygpLm11c2ljS2V5fVxuXHRcdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuY29udGV4dC5zZXRDdXJyZW50U29uZ011c2ljS2V5fS8+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJib3ggYm9yZGVyIGJnLXdoaXRlIGJvcmRlci1ibGFjayB0ZXh0LWJsYWNrIHctMlwiPlxuXHRcdFx0XHRcdFx0XHQ8U2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sIGNvbC00XCJcblx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnM9e3RoaXMuY29udGV4dC5nZXRNb2RhbFNlbGVjdE9wdGlvbnMoKX1cblx0XHRcdFx0XHRcdFx0XHRcdHNlbGVjdGVkPXt0aGlzLmNvbnRleHQuZ2V0Q3VycmVudFNvbmcoKS5taW5vcn1cblx0XHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLmNvbnRleHQuc2V0Q3VycmVudFNvbmdNaW5vcn0vPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZm9ybS1idXR0b25zXCI+XG5cdFx0XHRcdFx0XHQ8QSBjbGFzcz1cImJnLWRhbmdlciBib3ggdGV4dC13aGl0ZVwiXG5cdFx0XHRcdFx0XHRcdFx0aHJlZj1cIiNcIlxuXHRcdFx0XHRcdFx0XHRcdG9uUmVsZWFzZT17dGhpcy5jb250ZXh0LmRlbGV0ZUN1cnJlbnRTb25nfT5cblx0XHRcdFx0XHRcdFx0UmVtb3ZlIFNvbmdcblx0XHRcdFx0XHRcdDwvQT5cblx0XHRcdFx0XHRcdDxBIGNsYXNzPVwiYmctcHJpbWFyeSBib3ggdGV4dC13aGl0ZVwiXG5cdFx0XHRcdFx0XHRcdFx0aHJlZj1cIiNcIlxuXHRcdFx0XHRcdFx0XHRcdG9uUmVsZWFzZT17dGhpcy5jb250ZXh0LnRvZ2dsZVNldHRpbmdzfT5cblx0XHRcdFx0XHRcdFx0Q2xvc2Vcblx0XHRcdFx0XHRcdDwvQT5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBoLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IHsgU2VsZWN0LCBJRiB9IGZyb20gJy4uL3V0aWxzL1JlYWN0VXRpbC5qc3gnO1xuaW1wb3J0IEEgZnJvbSAnLi9BLmpzeCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhcEhpZ2hsaWdodCBleHRlbmRzIENvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpO1xuXG5cdFx0dGhpcy5zdGF0ZT17XG5cdFx0XHRzaG93SGlnaGxpZ2h0OiBmYWxzZVxuXHRcdH1cblx0fVxuXG5cdG9uQ29udGV4dE1lbnU9KGUpPT57XG5cdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdHNob3dIaWdobGlnaHQ6IHRydWVcblx0XHR9KTtcblxuXHRcdGxldCBzPWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZTtcblx0XHRzLnNldFByb3BlcnR5KFwiLS10YXBIaWdobGlnaHRMZWZ0XCIsZS5jbGllbnRYK1wicHhcIik7XG5cdFx0cy5zZXRQcm9wZXJ0eShcIi0tdGFwSGlnaGxpZ2h0VG9wXCIsZS5jbGllbnRZK1wicHhcIik7XG5cdH07XG5cblx0b25Nb3VzZVVwPShlKT0+e1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0c2hvd0hpZ2hsaWdodDogZmFsc2Vcblx0XHR9KTtcblx0fTtcblxuXHRjb21wb25lbnREaWRNb3VudCgpIHtcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIix0aGlzLm9uQ29udGV4dE1lbnUpO1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsdGhpcy5vbk1vdXNlVXApO1xuXHR9XG5cblx0Y29tcG9uZW50V2lsbFVubW91bnQoKSB7XG5cdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNvbnRleHRtZW51XCIsdGhpcy5vbkNvbnRleHRNZW51KTtcblx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLHRoaXMub25Nb3VzZVVwKTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzcz1cInRhcC1oaWdobGlnaHRcIj5cblx0XHRcdFx0e0lGKHRoaXMuc3RhdGUuc2hvd0hpZ2hsaWdodCwoKT0+XG5cdFx0XHRcdFx0PGltZyBzcmM9XCJpbWcvdGFwLWhpZ2hsaWdodC5zdmdcIi8+XG5cdFx0XHRcdCl9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59Il19
