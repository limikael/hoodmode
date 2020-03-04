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

var conductor = new _Conductor["default"]();
var appHelper = new _AppHelper["default"](conductor);
var appController = new _AppController["default"](conductor, appHelper);

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

},{"./model/AppController.js":16,"./model/AppHelper.js":17,"./model/Conductor.js":18,"./utils/AppContext.js":22,"./view/App.jsx":28,"preact":4,"preact/debug":2,"shortid":6}],16:[function(require,module,exports){
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
      if (bpm > 100) bpm = 100;
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
      console.log("setting minor: " + minor);
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

      for (var i = 0; i < numSounds; i++) {
        seq.push(Array(16).fill(false));
      }

      var layer = {
        key: _shortid["default"].generate(),
        instrumentName: instrumentName,
        audible: true,
        volume: volume,
        seq: seq,
        vel: Array(16).fill(1),
        stacc: Array(16).fill(false)
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
      layer.stacc[gridIndex] = !layer.stacc[gridIndex];
      return state;
    }
  }, {
    key: "setCurrentLayerVel",
    value: function setCurrentLayerVel(state, vel) {
      var layer = this.helper.getCurrentLayer(state);
      var gridIndex = state.currentGridIndex;
      if (state.recording) gridIndex = this.conductor.getPlayGridIndex();
      if (gridIndex < 0) return state;
      layer.vel[gridIndex] = vel;
      return state;
    }
  }, {
    key: "soundButtonClick",
    value: function soundButtonClick(state, soundIndex) {
      var instrument = this.helper.getCurrentInstrument(state);

      if (state.recording) {
        this.conductor.playInstrument(instrument.name, soundIndex);
        var gridIndex = this.conductor.getPlayGridIndex();

        var _layer = this.helper.getCurrentLayer(state);

        _layer.seq[soundIndex][gridIndex] = true;
        return state;
      }

      if (state.currentGridIndex < 0) {
        this.conductor.playInstrument(instrument.name, soundIndex);
        return state;
      }

      var layer = this.helper.getCurrentLayer(state);
      layer.seq[soundIndex][state.currentGridIndex] = !layer.seq[soundIndex][state.currentGridIndex];
      if (layer.seq[soundIndex][state.currentGridIndex]) this.conductor.playInstrument(instrument.name, soundIndex);
      return state;
    }
  }, {
    key: "chordButtonClick",
    value: function chordButtonClick(state, octave) {
      var instrument = this.helper.getCurrentInstrument(state);

      if (state.recording) {
        this.conductor.playInstrument(instrument.name, octave * 3);
        this.conductor.playInstrument(instrument.name, octave * 3 + 1);
        this.conductor.playInstrument(instrument.name, octave * 3 + 2);
        var gridIndex = this.conductor.getPlayGridIndex();

        var _layer2 = this.helper.getCurrentLayer(state);

        _layer2.seq[octave * 3][gridIndex] = true;
        _layer2.seq[octave * 3 + 1][gridIndex] = true;
        _layer2.seq[octave * 3 + 2][gridIndex] = true;
        return state;
      }

      if (state.currentGridIndex < 0) {
        this.conductor.playInstrument(instrument.name, octave * 3);
        this.conductor.playInstrument(instrument.name, octave * 3 + 1);
        this.conductor.playInstrument(instrument.name, octave * 3 + 2);
        return state;
      }

      var layer = this.helper.getCurrentLayer(state);

      if (this.helper.currentLayerHasChordAt(state, state.currentGridIndex, octave)) {
        layer.seq[octave * 3][state.currentGridIndex] = false;
        layer.seq[octave * 3 + 1][state.currentGridIndex] = false;
        layer.seq[octave * 3 + 2][state.currentGridIndex] = false;
      } else {
        layer.seq[octave * 3][state.currentGridIndex] = true;
        layer.seq[octave * 3 + 1][state.currentGridIndex] = true;
        layer.seq[octave * 3 + 2][state.currentGridIndex] = true;
        this.conductor.playInstrument(instrument.name, octave * 3);
        this.conductor.playInstrument(instrument.name, octave * 3 + 1);
        this.conductor.playInstrument(instrument.name, octave * 3 + 2);
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

      for (var soundIndex = 0; soundIndex < layer.seq.length; soundIndex++) {
        if (layer.seq[soundIndex][gridIndex]) return true;
      }

      return false;
    }
  }, {
    key: "currentLayerHasChordAt",
    value: function currentLayerHasChordAt(state, gridIndex, octave) {
      var layer = this.getCurrentLayer(state);

      for (var i = 0; i < 3; i++) {
        if (!layer.seq[octave * 3 + i][gridIndex]) return false;
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

},{"../utils/MusicUtil.js":24}],18:[function(require,module,exports){
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

    _defineProperty(this, "onPlayInterval", function () {
      var elapsed = _this.audioContext.currentTime - _this.playStartTime;

      var gridIndex = elapsed / _this.getSecPerGrid();

      _this.playGridIndex = Math.round(gridIndex);
      if (_this.onPlayGridIndexChange) _this.onPlayGridIndexChange(_this.playGridIndex, _this.sequenceIndex);
    });

    _defineProperty(this, "play", function () {
      _this.playStartTime = _this.audioContext.currentTime;

      if (_this.state.currentSectionIndex >= 0) {
        var song = _this.getCurrentSong();

        _this.sequenceIndex++;
        if (_this.sequenceIndex >= song.sections[_this.state.currentSectionIndex].length) _this.sequenceIndex = 0;
      }

      for (var gridIndex = 0; gridIndex < 16; gridIndex++) {
        _this.playGridSlice(_this.playStartTime + gridIndex * _this.getSecPerGrid(), gridIndex);
      }

      _this.playTimer = setTimeout(_this.play, 1000 * 16 * _this.getSecPerGrid());
      clearInterval(_this.playInterval);
      _this.playInterval = setInterval(_this.onPlayInterval, 1000 * _this.getSecPerGrid());

      _this.onPlayInterval();
    });

    _defineProperty(this, "setState", function (state) {
      _this.state = state;

      _this.instruments.setData(state.instruments);

      if (_this.getCurrentSong()) {
        _this.layers.setData(_this.getCurrentSong().layers);

        if (state.playing && !_this.isPlaying()) _this.play();else if (!state.playing && _this.isPlaying()) _this.stop();
      } else {
        _this.stop();

        _this.layers.setData([]);
      }

      if (state.currentSectionIndex < 0) {
        _this.sequenceIndex = -1;

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
      }
    });

    this.audioContext = new window.AudioContext();
    if (!this.audioContext) throw new Error("no web audio!");
    this.instruments = _ReconcileArray["default"].createWithFactory(this.createInstrument);
    this.layers = _ReconcileArray["default"].createWithFactory(this.createLayer);
    this.currentNotes = [];
    this.sequenceIndex = -1;
    this.playGridIndex = -1;
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
    key: "getCurrentSong",
    value: function getCurrentSong() {
      return this.state.songs[this.state.currentSongIndex];
    }
  }, {
    key: "getCurrentChordCents",
    value: function getCurrentChordCents() {
      var song = this.getCurrentSong();
      if (!song) return [0, 0, 0];
      var chordIndex = this.state.currentChordIndex;
      if (this.state.currentSectionIndex >= 0 && this.sequenceIndex >= 0) chordIndex = song.sections[this.state.currentSectionIndex][this.sequenceIndex];

      var scaleChordNotes = _MusicUtil["default"].getChordNotesForScale(song.musicKey, song.minor);

      var chordNotes = scaleChordNotes[chordIndex];
      return [_MusicUtil["default"].noteToCents(chordNotes[0]), _MusicUtil["default"].noteToCents(chordNotes[1]), _MusicUtil["default"].noteToCents(chordNotes[2])];
    }
  }, {
    key: "playInstrument",
    value: function playInstrument(name, soundIndex) {
      var instrument = this.getConductorInstrumentByName(name);
      var note = instrument.createNote(soundIndex);
      note.setChordCents(this.getCurrentChordCents());
      note.connect(this.audioContext.destination);
      note.playNow();
    }
  }, {
    key: "onNoteEnded",
    value: function onNoteEnded(note) {
      var idx = this.currentNotes.indexOf(note);
      if (idx < 0) return;
      this.currentNotes.splice(idx, 1);
    }
  }, {
    key: "playGridSlice",
    value: function playGridSlice(at, gridIndex) {
      var chordCents = this.getCurrentChordCents();
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.layers.getItems()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var layer = _step4.value;

          for (var soundIndex = 0; soundIndex < layer.data.seq.length; soundIndex++) {
            if (layer.data.seq[soundIndex][gridIndex]) {
              var note = layer.instrument.createNote(soundIndex);
              note.connect(layer.destination);
              note.setChordCents(chordCents);
              note.playSheduled(at, layer.getNoteLen(gridIndex) * this.getSecPerGrid());
              note.setVelocity(layer.data.vel[gridIndex]);
              note.onended = this.onNoteEnded.bind(this, note);
              this.currentNotes.push(note);
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
    key: "getSecPerGrid",
    value: function getSecPerGrid() {
      var secPerBeat = 60 / this.getCurrentSong().bpm;
      var secPerGrid = secPerBeat / 4;
      return secPerGrid;
    }
  }, {
    key: "getPlayGridIndex",
    value: function getPlayGridIndex() {
      if (!this.isPlaying()) throw new Error("Not playing!!!");
      var elapsed = this.audioContext.currentTime - this.playStartTime;
      var gridIndex = Math.floor(elapsed / this.getSecPerGrid());
      if (gridIndex == 16) gridIndex = 0;
      return gridIndex;
    }
  }, {
    key: "stop",
    value: function stop() {
      this.playGridIndex = -1;
      this.sequenceIndex = -1;
      if (this.onPlayGridIndexChange) this.onPlayGridIndexChange(this.playGridIndex, this.sequenceIndex);
      clearTimeout(this.playTimer);
      clearInterval(this.playInterval);
      this.playTimer = null;
      this.playInterval = null;
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.currentNotes[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var note = _step5.value;
          note.setVelocity(0);
          note.onended = null;
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

      this.currentNotes = [];
    }
  }, {
    key: "isPlaying",
    value: function isPlaying() {
      return !!this.playTimer;
    }
  }]);

  return Conductor;
}();

exports["default"] = Conductor;

},{"../utils/AudioUtil":23,"../utils/MusicUtil":24,"../utils/ReconcileArray":26,"./ConductorInstrument":19,"./ConductorLayer":20}],19:[function(require,module,exports){
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

},{"../utils/AudioUtil":23,"../utils/MusicUtil":24,"./ConductorNote":21}],20:[function(require,module,exports){
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
      if (!this.data.audible) this.gain.gain.value = 0;else this.gain.gain.value = this.data.volume;
    }
  }, {
    key: "hasSoundAt",
    value: function hasSoundAt(pos) {
      for (var i = 0; i < this.data.seq.length; i++) {
        if (this.data.seq[i][pos]) return true;
      }

      return false;
    }
  }, {
    key: "getNoteLen",
    value: function getNoteLen(pos) {
      for (var i = 1; i < 16; i++) {
        if (this.hasSoundAt((pos + i) % 16) || this.data.stacc[(pos + i) % 16]) return i;
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
      if (this.chordNote == undefined) this.source.detune.value = 0;else this.source.detune.value = _MusicUtil["default"].OCTAVE_CENTS * (Math.floor(this.chordNote / 3) - 1) + this.chordCents[this.chordNote % 3] - this.sampleNoteCents;
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

},{"../utils/MusicUtil":24}],22:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
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

},{"preact":4}],26:[function(require,module,exports){
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
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = datas[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var data = _step.value;
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

},{}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _preact = require("preact");

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
        return (0, _preact.h)("a", {
          "class": "box w-4 text-white bg-danger el",
          href: "#",
          onClick: _this.context.addLayer.bind(null, instrument.name)
        }, (0, _preact.h)("img", {
          src: "img/" + instrument.icon
        }), instrument.name);
      })));
    }
  }]);

  return AddLayer;
}();

exports["default"] = AddLayer;

},{"preact":4}],28:[function(require,module,exports){
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
      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;
      var cs = getComputedStyle(document.documentElement);
      var paneWidth = parseFloat(cs.getPropertyValue('--paneWidth'));
      var paneHeight = parseFloat(cs.getPropertyValue('--paneHeight'));
      var contentWidth, contentHeight;

      if (windowHeight > windowWidth) {
        contentHeight = 2 * (paneHeight + 1) + 2;
        contentWidth = paneWidth + 1;
        document.querySelector("body").classList.add("portrait");
        document.querySelector("body").classList.remove("landscape");
      } else {
        contentHeight = paneHeight + 2 + 1;
        contentWidth = 2 * (paneWidth + 1);
        document.querySelector("body").classList.add("landscape");
        document.querySelector("body").classList.remove("portrait");
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
      if (this.context.recording) cls = "recording";
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

},{"../utils/ReactUtil.jsx":25,"./AddLayer.jsx":27,"./Front.jsx":29,"./Header.jsx":30,"./Layer.jsx":31,"./LayerSettings.jsx":32,"./SelectChord.jsx":33,"./Song.jsx":34,"./SongSettings.jsx":37,"preact":4}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _preact = require("preact");

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
      }, "SONGS"), (0, _preact.h)("a", {
        href: "#",
        "class": "text-white",
        onClick: this.context.addSong
      }, (0, _preact.h)("div", {
        "class": "box bg-dark w-1"
      }, "+"), (0, _preact.h)("div", {
        "class": "box"
      }, "New Song")), (0, _preact.h)("br", null), this.context.songs.map(function (song, index) {
        return (0, _preact.h)("a", {
          "class": "box bg-secondary text-white w-4 border border-light",
          href: "#",
          onClick: _this.context.setSongIndex.bind(null, index)
        }, song.name);
      })));
    }
  }]);

  return Front;
}();

exports["default"] = Front;

},{"preact":4}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _preact = require("preact");

var _ReactUtil = require("../utils/ReactUtil.jsx");

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
        items.push((0, _preact.h)("a", {
          "class": "header-button text-white",
          href: "#",
          onClick: this.context.goBack
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
        items.push((0, _preact.h)("a", {
          "class": playButtonClass,
          href: "#",
          onClick: this.context.playClick
        }, (0, _preact.h)("img", {
          src: "img/play-fill.svg"
        })));
        if (this.context.currentLayerIndex >= 0) items.push((0, _preact.h)("a", {
          "class": recordButtonClass,
          href: "#",
          onClick: this.context.recordClick
        }, (0, _preact.h)("img", {
          src: "img/circle-fill.svg"
        })));
        items.push((0, _preact.h)("a", {
          "class": "header-button text-white",
          href: "#",
          onClick: this.context.toggleSettings
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

},{"../utils/ReactUtil.jsx":25,"preact":4}],31:[function(require,module,exports){
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

        if (layer.seq[i]) {
          var buttonClass = "box w-1 bg-primary text-white ";
          if (this.context.currentGridIndex >= 0 && layer.seq[i][this.context.currentGridIndex]) buttonClass += "active";
          var buttonIcon = void 0;
          if (instrument.type == "percussive") buttonIcon = "img/" + instrument.icons[i];else buttonIcon = "img/note.svg";
          buttons[buttonIndex] = (0, _preact.h)("a", {
            "class": buttonClass,
            href: "#",
            onClick: this.context.soundButtonClick.bind(null, i)
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
      if (this.context.currentGridIndex >= 0 && layer.stacc[this.context.currentGridIndex]) cls += "active";
      buttons[12] = (0, _preact.h)("a", {
        "class": cls,
        href: "#",
        onClick: this.context.toggleCurrentLayerStacc
      }, (0, _preact.h)("img", {
        src: "img/rest.svg"
      }));
      var currentVel = null;
      if (this.context.currentGridIndex >= 0 && this.context.currentLayerHasSoundAt(this.context.currentGridIndex)) currentVel = layer.vel[this.context.currentGridIndex];
      var sizeClasses = ["tiny", "small", ""];
      var vels = [0.25, 0.50, 1];

      for (var _i = 0; _i < 3; _i++) {
        var _cls = "box w-1 bg-warning text-white " + sizeClasses[_i] + " ";

        if (currentVel == vels[_i]) _cls += "active";
        buttons[13 + _i] = (0, _preact.h)("a", {
          "class": _cls,
          href: "#",
          onClick: this.context.setCurrentLayerVel.bind(null, vels[_i])
        }, (0, _preact.h)("img", {
          src: "img/note.svg"
        }));
      }

      if (instrument.type == "harmonic") {
        for (var _i2 = 0, _arr = [0, 1, 2]; _i2 < _arr.length; _i2++) {
          var octave = _arr[_i2];
          var _cls2 = "box w-1 bg-info text-white ";
          if (this.context.currentGridIndex >= 0 && this.context.currentLayerHasChordAt(this.context.currentGridIndex, octave)) _cls2 += "active";
          buttons[11 - octave * 4] = (0, _preact.h)("a", {
            "class": _cls2,
            href: "#",
            onClick: this.context.chordButtonClick.bind(null, octave)
          }, (0, _preact.h)("img", {
            src: "img/music-note.svg"
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
        if (layer.stacc[gridIndex]) icon = (0, _preact.h)("img", {
          src: "img/rest.svg"
        });else if (this.context.currentLayerHasSoundAt(gridIndex)) {
          icon = (0, _preact.h)("img", {
            src: "img/note.svg"
          });
          cls += velCls[layer.vel[gridIndex]];
        }
        res.push((0, _preact.h)("a", {
          "class": cls,
          href: "#",
          onMouseDown: this.context.gridIndexClick.bind(null, gridIndex)
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

},{"preact":4}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _preact = require("preact");

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
      }, (0, _preact.h)("a", {
        "class": "box bg-danger text-white",
        href: "#",
        onClick: this.context.deleteCurrentLayer
      }, "Remove Layer"), (0, _preact.h)("a", {
        "class": "box bg-primary form-button text-white",
        href: "#",
        onClick: this.context.toggleSettings
      }, "Close"))));
    }
  }]);

  return LayerSettings;
}();

exports["default"] = LayerSettings;

},{"preact":4}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _preact = require("preact");

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
        return (0, _preact.h)("a", {
          "class": cls,
          href: "#",
          onClick: _this.context.editSectionChord.bind(null, index)
        }, label);
      })), (0, _preact.h)("a", {
        "class": "box bg-danger w-1 text-white",
        href: "#",
        onClick: this.context.removeSectionChord
      }, (0, _preact.h)("img", {
        src: "img/trash.svg"
      }))));
    }
  }]);

  return SelectChord;
}();

exports["default"] = SelectChord;

},{"preact":4}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _preact = require("preact");

var _SongLayers = _interopRequireDefault(require("./SongLayers.jsx"));

var _SongChords = _interopRequireDefault(require("./SongChords.jsx"));

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

},{"./SongChords.jsx":35,"./SongLayers.jsx":36,"preact":4}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _preact = require("preact");

var _SelectChord = _interopRequireDefault(require("./SelectChord.jsx"));

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
        return (0, _preact.h)("a", {
          "class": cls,
          href: "#",
          onClick: _this.context.setCurrentChordIndex.bind(null, index)
        }, label);
      });
    }
  }, {
    key: "renderSectionChords",
    value: function renderSectionChords() {
      var _this2 = this;

      var a = this.context.getCurrentSectionChordLabels().map(function (label, index) {
        var cls = "box w-1 bg-success text-light section-chord sequence-" + index;
        return (0, _preact.h)("a", {
          "class": cls,
          href: "#",
          onClick: _this2.context.showEditSectionChord.bind(null, index)
        }, label);
      });
      a.push((0, _preact.h)("a", {
        "class": "box border border-white text-white w-1",
        href: "#",
        onClick: this.context.addSectionChord
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
      }, chordLabels), (0, _preact.h)("a", {
        "class": "box w-1 bg-secondary text-white " + (this.context.currentSectionIndex == -1 ? "active" : ""),
        href: "#",
        onClick: this.context.setCurrentSectionIndex.bind(null, -1)
      }, (0, _preact.h)("img", {
        src: "img/conductor.svg"
      })), ["A", "B", "C"].map(function (letter, index) {
        var cls = "box w-1 bg-primary text-white ";
        if (index == _this3.context.currentSectionIndex) cls += "active";
        return (0, _preact.h)("a", {
          "class": cls,
          href: "#",
          onClick: _this3.context.setCurrentSectionIndex.bind(null, index)
        }, letter);
      }), (0, _ReactUtil.IF)(this.context.editSectionChordVisible >= 0, function () {
        return (0, _preact.h)(_SelectChord["default"], null);
      }));
    }
  }]);

  return SongChords;
}(_preact.Component);

exports["default"] = SongChords;

},{"../utils/ReactUtil.jsx":25,"./SelectChord.jsx":33,"preact":4}],36:[function(require,module,exports){
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
        var cls = "box bg-danger text-white w-2 ";
        var icon = "img/toggle-on.svg";

        if (!layer.audible) {
          icon = "img/toggle-off.svg";
          cls += "faded";
        }

        return (0, _preact.h)("div", {
          "class": cls
        }, (0, _preact.h)("a", {
          href: "#",
          "class": "layer-icon",
          onClick: _this.context.setLayerIndex.bind(null, index)
        }, (0, _preact.h)("img", {
          src: "img/" + _this.context.getInstrumentByName(layer.instrumentName).icon
        })), (0, _preact.h)("a", {
          href: "#",
          "class": "layer-icon",
          onClick: _this.context.toggleLayerAudible.bind(null, index)
        }, (0, _preact.h)("img", {
          src: icon
        })));
      }), (0, _preact.h)("a", {
        "class": "box border border-white text-white w-1",
        href: "#",
        onClick: this.context.showAddLayer
      }, "+"));
    }
  }]);

  return SongLayers;
}(_preact.Component);

exports["default"] = SongLayers;

},{"preact":4}],37:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _preact = require("preact");

var _ReactUtil = require("../utils/ReactUtil.jsx");

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
      }, (0, _preact.h)("a", {
        "class": "bg-danger box text-white",
        href: "#",
        onClick: this.context.deleteCurrentSong
      }, "Remove Song"), (0, _preact.h)("a", {
        "class": "bg-primary box text-white",
        href: "#",
        onClick: this.context.toggleSettings
      }, "Close"))));
    }
  }]);

  return SongSettings;
}();

exports["default"] = SongSettings;

},{"../utils/ReactUtil.jsx":25,"preact":4}]},{},[15])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbmFub2lkL2Zvcm1hdC5icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9kZWJ1Zy9kaXN0L2RlYnVnLmpzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9kZXZ0b29scy9kaXN0L2RldnRvb2xzLmpzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9kaXN0L3ByZWFjdC5qcyIsIm5vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiLCJub2RlX21vZHVsZXMvc2hvcnRpZC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9hbHBoYWJldC5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9idWlsZC5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9nZW5lcmF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9pcy12YWxpZC5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9yYW5kb20vcmFuZG9tLWJ5dGUtYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9yYW5kb20vcmFuZG9tLWZyb20tc2VlZC5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi91dGlsL2NsdXN0ZXItd29ya2VyLWlkLWJyb3dzZXIuanMiLCJzcmMvaW5kZXguanN4Iiwic3JjL21vZGVsL0FwcENvbnRyb2xsZXIuanMiLCJzcmMvbW9kZWwvQXBwSGVscGVyLmpzIiwic3JjL21vZGVsL0NvbmR1Y3Rvci5qcyIsInNyYy9tb2RlbC9Db25kdWN0b3JJbnN0cnVtZW50LmpzIiwic3JjL21vZGVsL0NvbmR1Y3RvckxheWVyLmpzIiwic3JjL21vZGVsL0NvbmR1Y3Rvck5vdGUuanMiLCJzcmMvdXRpbHMvQXBwQ29udGV4dC5qcyIsInNyYy91dGlscy9BdWRpb1V0aWwuanMiLCJzcmMvdXRpbHMvTXVzaWNVdGlsLmpzIiwic3JjL3V0aWxzL1JlYWN0VXRpbC5qc3giLCJzcmMvdXRpbHMvUmVjb25jaWxlQXJyYXkuanMiLCJzcmMvdmlldy9BZGRMYXllci5qc3giLCJzcmMvdmlldy9BcHAuanN4Iiwic3JjL3ZpZXcvRnJvbnQuanN4Iiwic3JjL3ZpZXcvSGVhZGVyLmpzeCIsInNyYy92aWV3L0xheWVyLmpzeCIsInNyYy92aWV3L0xheWVyU2V0dGluZ3MuanN4Iiwic3JjL3ZpZXcvU2VsZWN0Q2hvcmQuanN4Iiwic3JjL3ZpZXcvU29uZy5qc3giLCJzcmMvdmlldy9Tb25nQ2hvcmRzLmpzeCIsInNyYy92aWV3L1NvbmdMYXllcnMuanN4Iiwic3JjL3ZpZXcvU29uZ1NldHRpbmdzLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3R0QkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUEsT0FBTyxFQUFFLEtBQUssT0FBTCxDQUFhO0FBRnhCLGlCQU5ELENBcENELENBREQsQ0FERDtBQXFEQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIFRoaXMgZmlsZSByZXBsYWNlcyBgZm9ybWF0LmpzYCBpbiBidW5kbGVycyBsaWtlIHdlYnBhY2sgb3IgUm9sbHVwLFxuLy8gYWNjb3JkaW5nIHRvIGBicm93c2VyYCBjb25maWcgaW4gYHBhY2thZ2UuanNvbmAuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHJhbmRvbSwgYWxwaGFiZXQsIHNpemUpIHtcbiAgLy8gV2UgY2Fu4oCZdCB1c2UgYnl0ZXMgYmlnZ2VyIHRoYW4gdGhlIGFscGhhYmV0LiBUbyBtYWtlIGJ5dGVzIHZhbHVlcyBjbG9zZXJcbiAgLy8gdG8gdGhlIGFscGhhYmV0LCB3ZSBhcHBseSBiaXRtYXNrIG9uIHRoZW0uIFdlIGxvb2sgZm9yIHRoZSBjbG9zZXN0XG4gIC8vIGAyICoqIHggLSAxYCBudW1iZXIsIHdoaWNoIHdpbGwgYmUgYmlnZ2VyIHRoYW4gYWxwaGFiZXQgc2l6ZS4gSWYgd2UgaGF2ZVxuICAvLyAzMCBzeW1ib2xzIGluIHRoZSBhbHBoYWJldCwgd2Ugd2lsbCB0YWtlIDMxICgwMDAxMTExMSkuXG4gIC8vIFdlIGRvIG5vdCB1c2UgZmFzdGVyIE1hdGguY2x6MzIsIGJlY2F1c2UgaXQgaXMgbm90IGF2YWlsYWJsZSBpbiBicm93c2Vycy5cbiAgdmFyIG1hc2sgPSAoMiA8PCBNYXRoLmxvZyhhbHBoYWJldC5sZW5ndGggLSAxKSAvIE1hdGguTE4yKSAtIDFcbiAgLy8gQml0bWFzayBpcyBub3QgYSBwZXJmZWN0IHNvbHV0aW9uIChpbiBvdXIgZXhhbXBsZSBpdCB3aWxsIHBhc3MgMzEgYnl0ZXMsXG4gIC8vIHdoaWNoIGlzIGJpZ2dlciB0aGFuIHRoZSBhbHBoYWJldCkuIEFzIGEgcmVzdWx0LCB3ZSB3aWxsIG5lZWQgbW9yZSBieXRlcyxcbiAgLy8gdGhhbiBJRCBzaXplLCBiZWNhdXNlIHdlIHdpbGwgcmVmdXNlIGJ5dGVzIGJpZ2dlciB0aGFuIHRoZSBhbHBoYWJldC5cblxuICAvLyBFdmVyeSBoYXJkd2FyZSByYW5kb20gZ2VuZXJhdG9yIGNhbGwgaXMgY29zdGx5LFxuICAvLyBiZWNhdXNlIHdlIG5lZWQgdG8gd2FpdCBmb3IgZW50cm9weSBjb2xsZWN0aW9uLiBUaGlzIGlzIHdoeSBvZnRlbiBpdCB3aWxsXG4gIC8vIGJlIGZhc3RlciB0byBhc2sgZm9yIGZldyBleHRyYSBieXRlcyBpbiBhZHZhbmNlLCB0byBhdm9pZCBhZGRpdGlvbmFsIGNhbGxzLlxuXG4gIC8vIEhlcmUgd2UgY2FsY3VsYXRlIGhvdyBtYW55IHJhbmRvbSBieXRlcyBzaG91bGQgd2UgY2FsbCBpbiBhZHZhbmNlLlxuICAvLyBJdCBkZXBlbmRzIG9uIElEIGxlbmd0aCwgbWFzayAvIGFscGhhYmV0IHNpemUgYW5kIG1hZ2ljIG51bWJlciAxLjZcbiAgLy8gKHdoaWNoIHdhcyBzZWxlY3RlZCBhY2NvcmRpbmcgYmVuY2htYXJrcykuXG5cbiAgLy8gLX5mID0+IE1hdGguY2VpbChmKSBpZiBuIGlzIGZsb2F0IG51bWJlclxuICAvLyAtfmkgPT4gaSArIDEgaWYgbiBpcyBpbnRlZ2VyIG51bWJlclxuICB2YXIgc3RlcCA9IC1+KDEuNiAqIG1hc2sgKiBzaXplIC8gYWxwaGFiZXQubGVuZ3RoKVxuICB2YXIgaWQgPSAnJ1xuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgdmFyIGJ5dGVzID0gcmFuZG9tKHN0ZXApXG4gICAgLy8gQ29tcGFjdCBhbHRlcm5hdGl2ZSBmb3IgYGZvciAodmFyIGkgPSAwOyBpIDwgc3RlcDsgaSsrKWBcbiAgICB2YXIgaSA9IHN0ZXBcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAvLyBJZiByYW5kb20gYnl0ZSBpcyBiaWdnZXIgdGhhbiBhbHBoYWJldCBldmVuIGFmdGVyIGJpdG1hc2ssXG4gICAgICAvLyB3ZSByZWZ1c2UgaXQgYnkgYHx8ICcnYC5cbiAgICAgIGlkICs9IGFscGhhYmV0W2J5dGVzW2ldICYgbWFza10gfHwgJydcbiAgICAgIC8vIE1vcmUgY29tcGFjdCB0aGFuIGBpZC5sZW5ndGggKyAxID09PSBzaXplYFxuICAgICAgaWYgKGlkLmxlbmd0aCA9PT0gK3NpemUpIHJldHVybiBpZFxuICAgIH1cbiAgfVxufVxuIiwidmFyIG49cmVxdWlyZShcInByZWFjdFwiKTtyZXF1aXJlKFwicHJlYWN0L2RldnRvb2xzXCIpO3ZhciBlPXt9O2Z1bmN0aW9uIHQoZSl7cmV0dXJuIGUudHlwZT09PW4uRnJhZ21lbnQ/XCJGcmFnbWVudFwiOlwiZnVuY3Rpb25cIj09dHlwZW9mIGUudHlwZT9lLnR5cGUuZGlzcGxheU5hbWV8fGUudHlwZS5uYW1lOlwic3RyaW5nXCI9PXR5cGVvZiBlLnR5cGU/ZS50eXBlOlwiI3RleHRcIn12YXIgbz1bXSxyPVtdO2Z1bmN0aW9uIGEoKXtyZXR1cm4gby5sZW5ndGg+MD9vW28ubGVuZ3RoLTFdOm51bGx9dmFyIGk9ITE7ZnVuY3Rpb24gcyhlKXtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBlLnR5cGUmJmUudHlwZSE9PW4uRnJhZ21lbnR9ZnVuY3Rpb24gYyhuKXtmb3IodmFyIGU9W25dLG89bjtudWxsIT1vLl9fbzspZS5wdXNoKG8uX19vKSxvPW8uX19vO3JldHVybiBlLnJlZHVjZShmdW5jdGlvbihuLGUpe24rPVwiICBpbiBcIit0KGUpO3ZhciBvPWUuX19zb3VyY2U7cmV0dXJuIG8/bis9XCIgKGF0IFwiK28uZmlsZU5hbWUrXCI6XCIrby5saW5lTnVtYmVyK1wiKVwiOml8fChpPSEwLGNvbnNvbGUud2FybihcIkFkZCBAYmFiZWwvcGx1Z2luLXRyYW5zZm9ybS1yZWFjdC1qc3gtc291cmNlIHRvIGdldCBhIG1vcmUgZGV0YWlsZWQgY29tcG9uZW50IHN0YWNrLiBOb3RlIHRoYXQgeW91IHNob3VsZCBub3QgYWRkIGl0IHRvIHByb2R1Y3Rpb24gYnVpbGRzIG9mIHlvdXIgQXBwIGZvciBidW5kbGUgc2l6ZSByZWFzb25zLlwiKSksbitcIlxcblwifSxcIlwiKX12YXIgbD1cImZ1bmN0aW9uXCI9PXR5cGVvZiBXZWFrTWFwLHU9bi5Db21wb25lbnQucHJvdG90eXBlLnNldFN0YXRlO24uQ29tcG9uZW50LnByb3RvdHlwZS5zZXRTdGF0ZT1mdW5jdGlvbihuLGUpe3JldHVybiBudWxsPT10aGlzLl9fdj9udWxsPT10aGlzLnN0YXRlJiZjb25zb2xlLndhcm4oJ0NhbGxpbmcgXCJ0aGlzLnNldFN0YXRlXCIgaW5zaWRlIHRoZSBjb25zdHJ1Y3RvciBvZiBhIGNvbXBvbmVudCBpcyBhIG5vLW9wIGFuZCBtaWdodCBiZSBhIGJ1ZyBpbiB5b3VyIGFwcGxpY2F0aW9uLiBJbnN0ZWFkLCBzZXQgXCJ0aGlzLnN0YXRlID0ge31cIiBkaXJlY3RseS5cXG5cXG4nK2MoYSgpKSk6bnVsbD09dGhpcy5fX1AmJmNvbnNvbGUud2FybignQ2FuXFwndCBjYWxsIFwidGhpcy5zZXRTdGF0ZVwiIG9uIGFuIHVubW91bnRlZCBjb21wb25lbnQuIFRoaXMgaXMgYSBuby1vcCwgYnV0IGl0IGluZGljYXRlcyBhIG1lbW9yeSBsZWFrIGluIHlvdXIgYXBwbGljYXRpb24uIFRvIGZpeCwgY2FuY2VsIGFsbCBzdWJzY3JpcHRpb25zIGFuZCBhc3luY2hyb25vdXMgdGFza3MgaW4gdGhlIGNvbXBvbmVudFdpbGxVbm1vdW50IG1ldGhvZC5cXG5cXG4nK2ModGhpcy5fX3YpKSx1LmNhbGwodGhpcyxuLGUpfTt2YXIgZj1uLkNvbXBvbmVudC5wcm90b3R5cGUuZm9yY2VVcGRhdGU7ZnVuY3Rpb24gcChuKXt2YXIgZT1uLnByb3BzLG89dChuKSxyPVwiXCI7Zm9yKHZhciBhIGluIGUpaWYoZS5oYXNPd25Qcm9wZXJ0eShhKSYmXCJjaGlsZHJlblwiIT09YSl7dmFyIGk9ZVthXTtcImZ1bmN0aW9uXCI9PXR5cGVvZiBpJiYoaT1cImZ1bmN0aW9uIFwiKyhpLmRpc3BsYXlOYW1lfHxpLm5hbWUpK1wiKCkge31cIiksaT1PYmplY3QoaSkhPT1pfHxpLnRvU3RyaW5nP2krXCJcIjpPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaSkscis9XCIgXCIrYStcIj1cIitKU09OLnN0cmluZ2lmeShpKX12YXIgcz1lLmNoaWxkcmVuO3JldHVyblwiPFwiK28rcisocyYmcy5sZW5ndGg/XCI+Li48L1wiK28rXCI+XCI6XCIgLz5cIil9bi5Db21wb25lbnQucHJvdG90eXBlLmZvcmNlVXBkYXRlPWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT10aGlzLl9fdj9jb25zb2xlLndhcm4oJ0NhbGxpbmcgXCJ0aGlzLmZvcmNlVXBkYXRlXCIgaW5zaWRlIHRoZSBjb25zdHJ1Y3RvciBvZiBhIGNvbXBvbmVudCBpcyBhIG5vLW9wIGFuZCBtaWdodCBiZSBhIGJ1ZyBpbiB5b3VyIGFwcGxpY2F0aW9uLlxcblxcbicrYyhhKCkpKTpudWxsPT10aGlzLl9fUCYmY29uc29sZS53YXJuKCdDYW5cXCd0IGNhbGwgXCJ0aGlzLmZvcmNlVXBkYXRlXCIgb24gYW4gdW5tb3VudGVkIGNvbXBvbmVudC4gVGhpcyBpcyBhIG5vLW9wLCBidXQgaXQgaW5kaWNhdGVzIGEgbWVtb3J5IGxlYWsgaW4geW91ciBhcHBsaWNhdGlvbi4gVG8gZml4LCBjYW5jZWwgYWxsIHN1YnNjcmlwdGlvbnMgYW5kIGFzeW5jaHJvbm91cyB0YXNrcyBpbiB0aGUgY29tcG9uZW50V2lsbFVubW91bnQgbWV0aG9kLlxcblxcbicrYyh0aGlzLl9fdikpLGYuY2FsbCh0aGlzLG4pfSxmdW5jdGlvbigpeyFmdW5jdGlvbigpe3ZhciBlPW4ub3B0aW9ucy5fX2IsdD1uLm9wdGlvbnMuZGlmZmVkLGE9bi5vcHRpb25zLl9fLGk9bi5vcHRpb25zLnZub2RlLGM9bi5vcHRpb25zLl9fcjtuLm9wdGlvbnMuZGlmZmVkPWZ1bmN0aW9uKG4pe3MobikmJnIucG9wKCksby5wb3AoKSx0JiZ0KG4pfSxuLm9wdGlvbnMuX19iPWZ1bmN0aW9uKG4pe3MobikmJm8ucHVzaChuKSxlJiZlKG4pfSxuLm9wdGlvbnMuX189ZnVuY3Rpb24obixlKXtyPVtdLGEmJmEobixlKX0sbi5vcHRpb25zLnZub2RlPWZ1bmN0aW9uKG4pe24uX19vPXIubGVuZ3RoPjA/cltyLmxlbmd0aC0xXTpudWxsLGkmJmkobil9LG4ub3B0aW9ucy5fX3I9ZnVuY3Rpb24obil7cyhuKSYmci5wdXNoKG4pLGMmJmMobil9fSgpO3ZhciBhPW4ub3B0aW9ucy5fX2IsaT1uLm9wdGlvbnMuZGlmZmVkLHU9bi5vcHRpb25zLnZub2RlLGY9bi5vcHRpb25zLl9fZSxkPW4ub3B0aW9ucy5fXyxoPW4ub3B0aW9ucy5fX2gseT1sP3t1c2VFZmZlY3Q6bmV3IFdlYWtNYXAsdXNlTGF5b3V0RWZmZWN0Om5ldyBXZWFrTWFwLGxhenlQcm9wVHlwZXM6bmV3IFdlYWtNYXB9Om51bGw7bi5vcHRpb25zLl9fZT1mdW5jdGlvbihuLGUsbyl7aWYoZSYmZS5fX2MmJlwiZnVuY3Rpb25cIj09dHlwZW9mIG4udGhlbil7dmFyIHI9bjtuPW5ldyBFcnJvcihcIk1pc3NpbmcgU3VzcGVuc2UuIFRoZSB0aHJvd2luZyBjb21wb25lbnQgd2FzOiBcIit0KGUpKTtmb3IodmFyIGE9ZTthO2E9YS5fXylpZihhLl9fYyYmYS5fX2MuX19jKXtuPXI7YnJlYWt9aWYobiBpbnN0YW5jZW9mIEVycm9yKXRocm93IG59ZihuLGUsbyl9LG4ub3B0aW9ucy5fXz1mdW5jdGlvbihuLGUpe2lmKCFlKXRocm93IG5ldyBFcnJvcihcIlVuZGVmaW5lZCBwYXJlbnQgcGFzc2VkIHRvIHJlbmRlcigpLCB0aGlzIGlzIHRoZSBzZWNvbmQgYXJndW1lbnQuXFxuQ2hlY2sgaWYgdGhlIGVsZW1lbnQgaXMgYXZhaWxhYmxlIGluIHRoZSBET00vaGFzIHRoZSBjb3JyZWN0IGlkLlwiKTt2YXIgbztzd2l0Y2goZS5ub2RlVHlwZSl7Y2FzZSAxOmNhc2UgMTE6Y2FzZSA5Om89ITA7YnJlYWs7ZGVmYXVsdDpvPSExfWlmKCFvKXt2YXIgcj10KG4pO3Rocm93IG5ldyBFcnJvcihcIkV4cGVjdGVkIGEgdmFsaWQgSFRNTCBub2RlIGFzIGEgc2Vjb25kIGFyZ3VtZW50IHRvIHJlbmRlci5cXHRSZWNlaXZlZCBcIitlK1wiIGluc3RlYWQ6IHJlbmRlcig8XCIrcitcIiAvPiwgXCIrZStcIik7XCIpfWQmJmQobixlKX0sbi5vcHRpb25zLl9fYj1mdW5jdGlvbihuKXt2YXIgbyxyLGkscyxsPW4udHlwZSx1PWZ1bmN0aW9uIG4oZSl7cmV0dXJuIGU/XCJmdW5jdGlvblwiPT10eXBlb2YgZS50eXBlP24oZS5fXyk6ZTp7fX0obi5fXyk7aWYodm9pZCAwPT09bCl0aHJvdyBuZXcgRXJyb3IoXCJVbmRlZmluZWQgY29tcG9uZW50IHBhc3NlZCB0byBjcmVhdGVFbGVtZW50KClcXG5cXG5Zb3UgbGlrZWx5IGZvcmdvdCB0byBleHBvcnQgeW91ciBjb21wb25lbnQgb3IgbWlnaHQgaGF2ZSBtaXhlZCB1cCBkZWZhdWx0IGFuZCBuYW1lZCBpbXBvcnRzXCIrcChuKStcIlxcblxcblwiK2MobikpO2lmKG51bGwhPWwmJlwib2JqZWN0XCI9PXR5cGVvZiBsKXtpZih2b2lkIDAhPT1sLl9fayYmdm9pZCAwIT09bC5fX2UpdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB0eXBlIHBhc3NlZCB0byBjcmVhdGVFbGVtZW50KCk6IFwiK2wrXCJcXG5cXG5EaWQgeW91IGFjY2lkZW50YWxseSBwYXNzIGEgSlNYIGxpdGVyYWwgYXMgSlNYIHR3aWNlP1xcblxcbiAgbGV0IE15XCIrdChuKStcIiA9IFwiK3AobCkrXCI7XFxuICBsZXQgdm5vZGUgPSA8TXlcIit0KG4pK1wiIC8+O1xcblxcblRoaXMgdXN1YWxseSBoYXBwZW5zIHdoZW4geW91IGV4cG9ydCBhIEpTWCBsaXRlcmFsIGFuZCBub3QgdGhlIGNvbXBvbmVudC5cXG5cXG5cIitjKG4pKTt0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHR5cGUgcGFzc2VkIHRvIGNyZWF0ZUVsZW1lbnQoKTogXCIrKEFycmF5LmlzQXJyYXkobCk/XCJhcnJheVwiOmwpKX1pZihcInRoZWFkXCIhPT1sJiZcInRmb290XCIhPT1sJiZcInRib2R5XCIhPT1sfHxcInRhYmxlXCI9PT11LnR5cGU/XCJ0clwiPT09bCYmXCJ0aGVhZFwiIT09dS50eXBlJiZcInRmb290XCIhPT11LnR5cGUmJlwidGJvZHlcIiE9PXUudHlwZSYmXCJ0YWJsZVwiIT09dS50eXBlP2NvbnNvbGUuZXJyb3IoXCJJbXByb3BlciBuZXN0aW5nIG9mIHRhYmxlLiBZb3VyIDx0cj4gc2hvdWxkIGhhdmUgYSA8dGhlYWQvdGJvZHkvdGZvb3QvdGFibGU+IHBhcmVudC5cIitwKG4pK1wiXFxuXFxuXCIrYyhuKSk6XCJ0ZFwiPT09bCYmXCJ0clwiIT09dS50eXBlP2NvbnNvbGUuZXJyb3IoXCJJbXByb3BlciBuZXN0aW5nIG9mIHRhYmxlLiBZb3VyIDx0ZD4gc2hvdWxkIGhhdmUgYSA8dHI+IHBhcmVudC5cIitwKG4pK1wiXFxuXFxuXCIrYyhuKSk6XCJ0aFwiPT09bCYmXCJ0clwiIT09dS50eXBlJiZjb25zb2xlLmVycm9yKFwiSW1wcm9wZXIgbmVzdGluZyBvZiB0YWJsZS4gWW91ciA8dGg+IHNob3VsZCBoYXZlIGEgPHRyPi5cIitwKG4pK1wiXFxuXFxuXCIrYyhuKSk6Y29uc29sZS5lcnJvcihcIkltcHJvcGVyIG5lc3Rpbmcgb2YgdGFibGUuIFlvdXIgPHRoZWFkL3Rib2R5L3Rmb290PiBzaG91bGQgaGF2ZSBhIDx0YWJsZT4gcGFyZW50LlwiK3AobikrXCJcXG5cXG5cIitjKG4pKSx2b2lkIDAhPT1uLnJlZiYmXCJmdW5jdGlvblwiIT10eXBlb2Ygbi5yZWYmJlwib2JqZWN0XCIhPXR5cGVvZiBuLnJlZiYmIShcIiQkdHlwZW9mXCJpbiBuKSl0aHJvdyBuZXcgRXJyb3IoJ0NvbXBvbmVudFxcJ3MgXCJyZWZcIiBwcm9wZXJ0eSBzaG91bGQgYmUgYSBmdW5jdGlvbiwgb3IgYW4gb2JqZWN0IGNyZWF0ZWQgYnkgY3JlYXRlUmVmKCksIGJ1dCBnb3QgWycrdHlwZW9mIG4ucmVmK1wiXSBpbnN0ZWFkXFxuXCIrcChuKStcIlxcblxcblwiK2MobikpO2lmKFwic3RyaW5nXCI9PXR5cGVvZiBuLnR5cGUpZm9yKHZhciBmIGluIG4ucHJvcHMpaWYoXCJvXCI9PT1mWzBdJiZcIm5cIj09PWZbMV0mJlwiZnVuY3Rpb25cIiE9dHlwZW9mIG4ucHJvcHNbZl0mJm51bGwhPW4ucHJvcHNbZl0pdGhyb3cgbmV3IEVycm9yKFwiQ29tcG9uZW50J3MgXFxcIlwiK2YrJ1wiIHByb3BlcnR5IHNob3VsZCBiZSBhIGZ1bmN0aW9uLCBidXQgZ290IFsnK3R5cGVvZiBuLnByb3BzW2ZdK1wiXSBpbnN0ZWFkXFxuXCIrcChuKStcIlxcblxcblwiK2MobikpO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIG4udHlwZSYmbi50eXBlLnByb3BUeXBlcyl7aWYoXCJMYXp5XCI9PT1uLnR5cGUuZGlzcGxheU5hbWUmJnkmJiF5LmxhenlQcm9wVHlwZXMuaGFzKG4udHlwZSkpe3ZhciBkPVwiUHJvcFR5cGVzIGFyZSBub3Qgc3VwcG9ydGVkIG9uIGxhenkoKS4gVXNlIHByb3BUeXBlcyBvbiB0aGUgd3JhcHBlZCBjb21wb25lbnQgaXRzZWxmLiBcIjt0cnl7dmFyIGg9bi50eXBlKCk7eS5sYXp5UHJvcFR5cGVzLnNldChuLnR5cGUsITApLGNvbnNvbGUud2FybihkK1wiQ29tcG9uZW50IHdyYXBwZWQgaW4gbGF6eSgpIGlzIFwiK3QoaCkpfWNhdGNoKG4pe2NvbnNvbGUud2FybihkK1wiV2Ugd2lsbCBsb2cgdGhlIHdyYXBwZWQgY29tcG9uZW50J3MgbmFtZSBvbmNlIGl0IGlzIGxvYWRlZC5cIil9fW89bi50eXBlLnByb3BUeXBlcyxyPW4ucHJvcHMsaT10KG4pLHM9cChuKSxPYmplY3Qua2V5cyhvKS5mb3JFYWNoKGZ1bmN0aW9uKG4pe3ZhciB0O3RyeXt0PW9bbl0ocixuLHMsaSxudWxsLFwiU0VDUkVUX0RPX05PVF9QQVNTX1RISVNfT1JfWU9VX1dJTExfQkVfRklSRURcIil9Y2F0Y2gobil7dD1ufSF0fHx0Lm1lc3NhZ2UgaW4gZXx8KGVbdC5tZXNzYWdlXT0hMCxjb25zb2xlLmVycm9yKFwiRmFpbGVkIFwiK2krXCIgdHlwZTogXCIrdC5tZXNzYWdlKSl9KX1hJiZhKG4pfSxuLm9wdGlvbnMuX19oPWZ1bmN0aW9uKG4pe2lmKCFuKXRocm93IG5ldyBFcnJvcihcIkhvb2sgY2FuIG9ubHkgYmUgaW52b2tlZCBmcm9tIHJlbmRlciBtZXRob2RzLlwiKTtoJiZoKG4pfTt2YXIgdj1mdW5jdGlvbihuLGUpe3JldHVybntnZXQ6ZnVuY3Rpb24oKXt0aHJvdyBuZXcgRXJyb3IoXCJnZXR0aW5nIHZub2RlLlwiK24rXCIgaXMgZGVwcmVjYXRlZCwgXCIrZSl9LHNldDpmdW5jdGlvbigpe3Rocm93IG5ldyBFcnJvcihcInNldHRpbmcgdm5vZGUuXCIrbitcIiBpcyBub3QgYWxsb3dlZCwgXCIrZSl9fX0sbT17bm9kZU5hbWU6dihcIm5vZGVOYW1lXCIsXCJ1c2Ugdm5vZGUudHlwZVwiKSxhdHRyaWJ1dGVzOnYoXCJhdHRyaWJ1dGVzXCIsXCJ1c2Ugdm5vZGUucHJvcHNcIiksY2hpbGRyZW46dihcImNoaWxkcmVuXCIsXCJ1c2Ugdm5vZGUucHJvcHMuY2hpbGRyZW5cIil9LGI9T2JqZWN0LmNyZWF0ZSh7fSxtKTtuLm9wdGlvbnMudm5vZGU9ZnVuY3Rpb24obil7dmFyIGU9bi5wcm9wcztpZihudWxsIT09bi50eXBlJiZudWxsIT1lJiYoXCJfX3NvdXJjZVwiaW4gZXx8XCJfX3NlbGZcImluIGUpKXt2YXIgdD1uLnByb3BzPXt9O2Zvcih2YXIgbyBpbiBlKXt2YXIgcj1lW29dO1wiX19zb3VyY2VcIj09PW8/bi5fX3NvdXJjZT1yOlwiX19zZWxmXCI9PT1vP24uX19zZWxmPXI6dFtvXT1yfX1PYmplY3Quc2V0UHJvdG90eXBlT2YobixiKSx1JiZ1KG4pfSxuLm9wdGlvbnMuZGlmZmVkPWZ1bmN0aW9uKG4pe24uX19rJiZuLl9fay5mb3JFYWNoKGZ1bmN0aW9uKG4pe2lmKG4mJnZvaWQgMD09PW4udHlwZSl7ZGVsZXRlIG4uX18sZGVsZXRlIG4uX19iO3ZhciBlPU9iamVjdC5rZXlzKG4pLmpvaW4oXCIsXCIpO3Rocm93IG5ldyBFcnJvcihcIk9iamVjdHMgYXJlIG5vdCB2YWxpZCBhcyBhIGNoaWxkLiBFbmNvdW50ZXJlZCBhbiBvYmplY3Qgd2l0aCB0aGUga2V5cyB7XCIrZStcIn0uXCIpfX0pO3ZhciBlPW4uX19jO2lmKGUmJmUuX19IKXt2YXIgbz1lLl9fSDtBcnJheS5pc0FycmF5KG8uX18pJiZvLl9fLmZvckVhY2goZnVuY3Rpb24oZSl7aWYoZS5fX2gmJighZS5fX0h8fCFBcnJheS5pc0FycmF5KGUuX19IKSkpe3ZhciBvPXQobik7Y29uc29sZS53YXJuKFwiSW4gXCIrbytcIiB5b3UgYXJlIGNhbGxpbmcgdXNlTWVtby91c2VDYWxsYmFjayB3aXRob3V0IHBhc3NpbmcgYXJndW1lbnRzLlxcblRoaXMgaXMgYSBub29wIHNpbmNlIGl0IHdpbGwgbm90IGJlIGFibGUgdG8gbWVtb2l6ZSwgaXQgd2lsbCBleGVjdXRlIGl0IGV2ZXJ5IHJlbmRlci5cXG5cXG5cIitjKG4pKX19KX1pZihpJiZpKG4pLG51bGwhPW4uX19rKWZvcih2YXIgcj1bXSxhPTA7YTxuLl9fay5sZW5ndGg7YSsrKXt2YXIgcz1uLl9fa1thXTtpZihzJiZudWxsIT1zLmtleSl7dmFyIGw9cy5rZXk7aWYoLTEhPT1yLmluZGV4T2YobCkpe2NvbnNvbGUuZXJyb3IoJ0ZvbGxvd2luZyBjb21wb25lbnQgaGFzIHR3byBvciBtb3JlIGNoaWxkcmVuIHdpdGggdGhlIHNhbWUga2V5IGF0dHJpYnV0ZTogXCInK2wrJ1wiLiBUaGlzIG1heSBjYXVzZSBnbGl0Y2hlcyBhbmQgbWlzYmVoYXZpb3IgaW4gcmVuZGVyaW5nIHByb2Nlc3MuIENvbXBvbmVudDogXFxuXFxuJytwKG4pK1wiXFxuXFxuXCIrYyhuKSk7YnJlYWt9ci5wdXNoKGwpfX19fSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGVidWcuanMubWFwXG4iLCJ2YXIgZT1yZXF1aXJlKFwicHJlYWN0XCIpO1widW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJndpbmRvdy5fX1BSRUFDVF9ERVZUT09MU19fJiZ3aW5kb3cuX19QUkVBQ1RfREVWVE9PTFNfXy5hdHRhY2hQcmVhY3QoXCIxMC4wLjVcIixlLm9wdGlvbnMse0ZyYWdtZW50OmUuRnJhZ21lbnR9KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRldnRvb2xzLmpzLm1hcFxuIiwidmFyIG4sbCx1LHQsaSxvLHIsZj17fSxlPVtdLGM9L2FjaXR8ZXgoPzpzfGd8bnxwfCQpfHJwaHxncmlkfG93c3xtbmN8bnR3fGluZVtjaF18em9vfF5vcmQvaTtmdW5jdGlvbiBzKG4sbCl7Zm9yKHZhciB1IGluIGwpblt1XT1sW3VdO3JldHVybiBufWZ1bmN0aW9uIGEobil7dmFyIGw9bi5wYXJlbnROb2RlO2wmJmwucmVtb3ZlQ2hpbGQobil9ZnVuY3Rpb24gcChuLGwsdSl7dmFyIHQsaT1hcmd1bWVudHMsbz17fTtmb3IodCBpbiBsKVwia2V5XCIhPT10JiZcInJlZlwiIT09dCYmKG9bdF09bFt0XSk7aWYoYXJndW1lbnRzLmxlbmd0aD4zKWZvcih1PVt1XSx0PTM7dDxhcmd1bWVudHMubGVuZ3RoO3QrKyl1LnB1c2goaVt0XSk7aWYobnVsbCE9dSYmKG8uY2hpbGRyZW49dSksXCJmdW5jdGlvblwiPT10eXBlb2YgbiYmbnVsbCE9bi5kZWZhdWx0UHJvcHMpZm9yKHQgaW4gbi5kZWZhdWx0UHJvcHMpdm9pZCAwPT09b1t0XSYmKG9bdF09bi5kZWZhdWx0UHJvcHNbdF0pO3JldHVybiB2KG4sbyxsJiZsLmtleSxsJiZsLnJlZil9ZnVuY3Rpb24gdihsLHUsdCxpKXt2YXIgbz17dHlwZTpsLHByb3BzOnUsa2V5OnQscmVmOmksX19rOm51bGwsX186bnVsbCxfX2I6MCxfX2U6bnVsbCxfX2Q6dm9pZCAwLF9fYzpudWxsLGNvbnN0cnVjdG9yOnZvaWQgMH07cmV0dXJuIG4udm5vZGUmJm4udm5vZGUobyksb31mdW5jdGlvbiBoKG4pe3JldHVybiBuLmNoaWxkcmVufWZ1bmN0aW9uIGQobixsKXt0aGlzLnByb3BzPW4sdGhpcy5jb250ZXh0PWx9ZnVuY3Rpb24geShuLGwpe2lmKG51bGw9PWwpcmV0dXJuIG4uX18/eShuLl9fLG4uX18uX19rLmluZGV4T2YobikrMSk6bnVsbDtmb3IodmFyIHU7bDxuLl9fay5sZW5ndGg7bCsrKWlmKG51bGwhPSh1PW4uX19rW2xdKSYmbnVsbCE9dS5fX2UpcmV0dXJuIHUuX19lO3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIG4udHlwZT95KG4pOm51bGx9ZnVuY3Rpb24geChuKXt2YXIgbCx1O2lmKG51bGwhPShuPW4uX18pJiZudWxsIT1uLl9fYyl7Zm9yKG4uX19lPW4uX19jLmJhc2U9bnVsbCxsPTA7bDxuLl9fay5sZW5ndGg7bCsrKWlmKG51bGwhPSh1PW4uX19rW2xdKSYmbnVsbCE9dS5fX2Upe24uX19lPW4uX19jLmJhc2U9dS5fX2U7YnJlYWt9cmV0dXJuIHgobil9fWZ1bmN0aW9uIG0obCl7KCFsLl9fZCYmKGwuX19kPSEwKSYmMT09PXUucHVzaChsKXx8aSE9PW4uZGVib3VuY2VSZW5kZXJpbmcpJiYoKGk9bi5kZWJvdW5jZVJlbmRlcmluZyl8fHQpKHcpfWZ1bmN0aW9uIHcoKXt2YXIgbixsLHQsaSxvLHIsZjtmb3IodS5zb3J0KGZ1bmN0aW9uKG4sbCl7cmV0dXJuIGwuX192Ll9fYi1uLl9fdi5fX2J9KTtuPXUucG9wKCk7KW4uX19kJiYodD12b2lkIDAsaT12b2lkIDAscj0obz0obD1uKS5fX3YpLl9fZSwoZj1sLl9fUCkmJih0PVtdLGk9TihmLG8scyh7fSxvKSxsLl9fbix2b2lkIDAhPT1mLm93bmVyU1ZHRWxlbWVudCxudWxsLHQsbnVsbD09cj95KG8pOnIpLHoodCxvKSxpIT1yJiZ4KG8pKSl9ZnVuY3Rpb24gZyhuLGwsdSx0LGksbyxyLGMscyl7dmFyIHAsdixoLGQseCxtLHcsZz11JiZ1Ll9fa3x8ZSxfPWcubGVuZ3RoO2lmKGM9PWYmJihjPW51bGwhPW8/b1swXTpfP3kodSwwKTpudWxsKSxwPTAsbC5fX2s9ayhsLl9fayxmdW5jdGlvbih1KXtpZihudWxsIT11KXtpZih1Ll9fPWwsdS5fX2I9bC5fX2IrMSxudWxsPT09KGg9Z1twXSl8fGgmJnUua2V5PT1oLmtleSYmdS50eXBlPT09aC50eXBlKWdbcF09dm9pZCAwO2Vsc2UgZm9yKHY9MDt2PF87disrKXtpZigoaD1nW3ZdKSYmdS5rZXk9PWgua2V5JiZ1LnR5cGU9PT1oLnR5cGUpe2dbdl09dm9pZCAwO2JyZWFrfWg9bnVsbH1pZihkPU4obix1LGg9aHx8Zix0LGksbyxyLGMscyksKHY9dS5yZWYpJiZoLnJlZiE9diYmKHd8fCh3PVtdKSxoLnJlZiYmdy5wdXNoKGgucmVmLG51bGwsdSksdy5wdXNoKHYsdS5fX2N8fGQsdSkpLG51bGwhPWQpe3ZhciBlO2lmKG51bGw9PW0mJihtPWQpLHZvaWQgMCE9PXUuX19kKWU9dS5fX2QsdS5fX2Q9dm9pZCAwO2Vsc2UgaWYobz09aHx8ZCE9Y3x8bnVsbD09ZC5wYXJlbnROb2RlKXtuOmlmKG51bGw9PWN8fGMucGFyZW50Tm9kZSE9PW4pbi5hcHBlbmRDaGlsZChkKSxlPW51bGw7ZWxzZXtmb3IoeD1jLHY9MDsoeD14Lm5leHRTaWJsaW5nKSYmdjxfO3YrPTIpaWYoeD09ZClicmVhayBuO24uaW5zZXJ0QmVmb3JlKGQsYyksZT1jfVwib3B0aW9uXCI9PWwudHlwZSYmKG4udmFsdWU9XCJcIil9Yz12b2lkIDAhPT1lP2U6ZC5uZXh0U2libGluZyxcImZ1bmN0aW9uXCI9PXR5cGVvZiBsLnR5cGUmJihsLl9fZD1jKX1lbHNlIGMmJmguX19lPT1jJiZjLnBhcmVudE5vZGUhPW4mJihjPXkoaCkpfXJldHVybiBwKyssdX0pLGwuX19lPW0sbnVsbCE9byYmXCJmdW5jdGlvblwiIT10eXBlb2YgbC50eXBlKWZvcihwPW8ubGVuZ3RoO3AtLTspbnVsbCE9b1twXSYmYShvW3BdKTtmb3IocD1fO3AtLTspbnVsbCE9Z1twXSYmJChnW3BdLGdbcF0pO2lmKHcpZm9yKHA9MDtwPHcubGVuZ3RoO3ArKylUKHdbcF0sd1srK3BdLHdbKytwXSl9ZnVuY3Rpb24gayhuLGwsdSl7aWYobnVsbD09dSYmKHU9W10pLG51bGw9PW58fFwiYm9vbGVhblwiPT10eXBlb2YgbilsJiZ1LnB1c2gobChudWxsKSk7ZWxzZSBpZihBcnJheS5pc0FycmF5KG4pKWZvcih2YXIgdD0wO3Q8bi5sZW5ndGg7dCsrKWsoblt0XSxsLHUpO2Vsc2UgdS5wdXNoKGw/bChcInN0cmluZ1wiPT10eXBlb2Ygbnx8XCJudW1iZXJcIj09dHlwZW9mIG4/dihudWxsLG4sbnVsbCxudWxsKTpudWxsIT1uLl9fZXx8bnVsbCE9bi5fX2M/dihuLnR5cGUsbi5wcm9wcyxuLmtleSxudWxsKTpuKTpuKTtyZXR1cm4gdX1mdW5jdGlvbiBfKG4sbCx1LHQsaSl7dmFyIG87Zm9yKG8gaW4gdSlvIGluIGx8fFAobixvLG51bGwsdVtvXSx0KTtmb3IobyBpbiBsKWkmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIGxbb118fFwidmFsdWVcIj09PW98fFwiY2hlY2tlZFwiPT09b3x8dVtvXT09PWxbb118fFAobixvLGxbb10sdVtvXSx0KX1mdW5jdGlvbiBiKG4sbCx1KXtcIi1cIj09PWxbMF0/bi5zZXRQcm9wZXJ0eShsLHUpOm5bbF09XCJudW1iZXJcIj09dHlwZW9mIHUmJiExPT09Yy50ZXN0KGwpP3UrXCJweFwiOm51bGw9PXU/XCJcIjp1fWZ1bmN0aW9uIFAobixsLHUsdCxpKXt2YXIgbyxyLGYsZSxjO2lmKGk/XCJjbGFzc05hbWVcIj09PWwmJihsPVwiY2xhc3NcIik6XCJjbGFzc1wiPT09bCYmKGw9XCJjbGFzc05hbWVcIiksXCJrZXlcIj09PWx8fFwiY2hpbGRyZW5cIj09PWwpO2Vsc2UgaWYoXCJzdHlsZVwiPT09bClpZihvPW4uc3R5bGUsXCJzdHJpbmdcIj09dHlwZW9mIHUpby5jc3NUZXh0PXU7ZWxzZXtpZihcInN0cmluZ1wiPT10eXBlb2YgdCYmKG8uY3NzVGV4dD1cIlwiLHQ9bnVsbCksdClmb3IociBpbiB0KXUmJnIgaW4gdXx8YihvLHIsXCJcIik7aWYodSlmb3IoZiBpbiB1KXQmJnVbZl09PT10W2ZdfHxiKG8sZix1W2ZdKX1lbHNlXCJvXCI9PT1sWzBdJiZcIm5cIj09PWxbMV0/KGU9bCE9PShsPWwucmVwbGFjZSgvQ2FwdHVyZSQvLFwiXCIpKSxjPWwudG9Mb3dlckNhc2UoKSxsPShjIGluIG4/YzpsKS5zbGljZSgyKSx1Pyh0fHxuLmFkZEV2ZW50TGlzdGVuZXIobCxDLGUpLChuLmx8fChuLmw9e30pKVtsXT11KTpuLnJlbW92ZUV2ZW50TGlzdGVuZXIobCxDLGUpKTpcImxpc3RcIiE9PWwmJlwidGFnTmFtZVwiIT09bCYmXCJmb3JtXCIhPT1sJiZcInR5cGVcIiE9PWwmJlwic2l6ZVwiIT09bCYmIWkmJmwgaW4gbj9uW2xdPW51bGw9PXU/XCJcIjp1OlwiZnVuY3Rpb25cIiE9dHlwZW9mIHUmJlwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUxcIiE9PWwmJihsIT09KGw9bC5yZXBsYWNlKC9eeGxpbms6Py8sXCJcIikpP251bGw9PXV8fCExPT09dT9uLnJlbW92ZUF0dHJpYnV0ZU5TKFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiLGwudG9Mb3dlckNhc2UoKSk6bi5zZXRBdHRyaWJ1dGVOUyhcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIixsLnRvTG93ZXJDYXNlKCksdSk6bnVsbD09dXx8ITE9PT11JiYhL15hci8udGVzdChsKT9uLnJlbW92ZUF0dHJpYnV0ZShsKTpuLnNldEF0dHJpYnV0ZShsLHUpKX1mdW5jdGlvbiBDKGwpe3RoaXMubFtsLnR5cGVdKG4uZXZlbnQ/bi5ldmVudChsKTpsKX1mdW5jdGlvbiBOKGwsdSx0LGksbyxyLGYsZSxjKXt2YXIgYSxwLHYseSx4LG0sdyxrLF8sYixQPXUudHlwZTtpZih2b2lkIDAhPT11LmNvbnN0cnVjdG9yKXJldHVybiBudWxsOyhhPW4uX19iKSYmYSh1KTt0cnl7bjppZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBQKXtpZihrPXUucHJvcHMsXz0oYT1QLmNvbnRleHRUeXBlKSYmaVthLl9fY10sYj1hP18/Xy5wcm9wcy52YWx1ZTphLl9fOmksdC5fX2M/dz0ocD11Ll9fYz10Ll9fYykuX189cC5fX0U6KFwicHJvdG90eXBlXCJpbiBQJiZQLnByb3RvdHlwZS5yZW5kZXI/dS5fX2M9cD1uZXcgUChrLGIpOih1Ll9fYz1wPW5ldyBkKGssYikscC5jb25zdHJ1Y3Rvcj1QLHAucmVuZGVyPWopLF8mJl8uc3ViKHApLHAucHJvcHM9ayxwLnN0YXRlfHwocC5zdGF0ZT17fSkscC5jb250ZXh0PWIscC5fX249aSx2PXAuX19kPSEwLHAuX19oPVtdKSxudWxsPT1wLl9fcyYmKHAuX19zPXAuc3RhdGUpLG51bGwhPVAuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzJiYocC5fX3M9PXAuc3RhdGUmJihwLl9fcz1zKHt9LHAuX19zKSkscyhwLl9fcyxQLmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyhrLHAuX19zKSkpLHk9cC5wcm9wcyx4PXAuc3RhdGUsdiludWxsPT1QLmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyYmbnVsbCE9cC5jb21wb25lbnRXaWxsTW91bnQmJnAuY29tcG9uZW50V2lsbE1vdW50KCksbnVsbCE9cC5jb21wb25lbnREaWRNb3VudCYmcC5fX2gucHVzaChwLmNvbXBvbmVudERpZE1vdW50KTtlbHNle2lmKG51bGw9PVAuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzJiZrIT09eSYmbnVsbCE9cC5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzJiZwLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoayxiKSwhcC5fX2UmJm51bGwhPXAuc2hvdWxkQ29tcG9uZW50VXBkYXRlJiYhMT09PXAuc2hvdWxkQ29tcG9uZW50VXBkYXRlKGsscC5fX3MsYikpe2ZvcihwLnByb3BzPWsscC5zdGF0ZT1wLl9fcyxwLl9fZD0hMSxwLl9fdj11LHUuX19lPXQuX19lLHUuX19rPXQuX19rLHAuX19oLmxlbmd0aCYmZi5wdXNoKHApLGE9MDthPHUuX19rLmxlbmd0aDthKyspdS5fX2tbYV0mJih1Ll9fa1thXS5fXz11KTticmVhayBufW51bGwhPXAuY29tcG9uZW50V2lsbFVwZGF0ZSYmcC5jb21wb25lbnRXaWxsVXBkYXRlKGsscC5fX3MsYiksbnVsbCE9cC5jb21wb25lbnREaWRVcGRhdGUmJnAuX19oLnB1c2goZnVuY3Rpb24oKXtwLmNvbXBvbmVudERpZFVwZGF0ZSh5LHgsbSl9KX1wLmNvbnRleHQ9YixwLnByb3BzPWsscC5zdGF0ZT1wLl9fcywoYT1uLl9fcikmJmEodSkscC5fX2Q9ITEscC5fX3Y9dSxwLl9fUD1sLGE9cC5yZW5kZXIocC5wcm9wcyxwLnN0YXRlLHAuY29udGV4dCksdS5fX2s9bnVsbCE9YSYmYS50eXBlPT1oJiZudWxsPT1hLmtleT9hLnByb3BzLmNoaWxkcmVuOkFycmF5LmlzQXJyYXkoYSk/YTpbYV0sbnVsbCE9cC5nZXRDaGlsZENvbnRleHQmJihpPXMocyh7fSxpKSxwLmdldENoaWxkQ29udGV4dCgpKSksdnx8bnVsbD09cC5nZXRTbmFwc2hvdEJlZm9yZVVwZGF0ZXx8KG09cC5nZXRTbmFwc2hvdEJlZm9yZVVwZGF0ZSh5LHgpKSxnKGwsdSx0LGksbyxyLGYsZSxjKSxwLmJhc2U9dS5fX2UscC5fX2gubGVuZ3RoJiZmLnB1c2gocCksdyYmKHAuX19FPXAuX189bnVsbCkscC5fX2U9ITF9ZWxzZSB1Ll9fZT1BKHQuX19lLHUsdCxpLG8scixmLGMpOyhhPW4uZGlmZmVkKSYmYSh1KX1jYXRjaChsKXtuLl9fZShsLHUsdCl9cmV0dXJuIHUuX19lfWZ1bmN0aW9uIHoobCx1KXtuLl9fYyYmbi5fX2ModSxsKSxsLnNvbWUoZnVuY3Rpb24odSl7dHJ5e2w9dS5fX2gsdS5fX2g9W10sbC5zb21lKGZ1bmN0aW9uKG4pe24uY2FsbCh1KX0pfWNhdGNoKGwpe24uX19lKGwsdS5fX3YpfX0pfWZ1bmN0aW9uIEEobixsLHUsdCxpLG8scixjKXt2YXIgcyxhLHAsdixoLGQ9dS5wcm9wcyx5PWwucHJvcHM7aWYoaT1cInN2Z1wiPT09bC50eXBlfHxpLG51bGwhPW8pZm9yKHM9MDtzPG8ubGVuZ3RoO3MrKylpZihudWxsIT0oYT1vW3NdKSYmKChudWxsPT09bC50eXBlPzM9PT1hLm5vZGVUeXBlOmEubG9jYWxOYW1lPT09bC50eXBlKXx8bj09YSkpe249YSxvW3NdPW51bGw7YnJlYWt9aWYobnVsbD09bil7aWYobnVsbD09PWwudHlwZSlyZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoeSk7bj1pP2RvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsbC50eXBlKTpkb2N1bWVudC5jcmVhdGVFbGVtZW50KGwudHlwZSx5LmlzJiZ7aXM6eS5pc30pLG89bnVsbH1pZihudWxsPT09bC50eXBlKWQhPT15JiZuLmRhdGEhPXkmJihuLmRhdGE9eSk7ZWxzZSBpZihsIT09dSl7aWYobnVsbCE9byYmKG89ZS5zbGljZS5jYWxsKG4uY2hpbGROb2RlcykpLHA9KGQ9dS5wcm9wc3x8ZikuZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwsdj15LmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MLCFjKXtpZihkPT09Zilmb3IoZD17fSxoPTA7aDxuLmF0dHJpYnV0ZXMubGVuZ3RoO2grKylkW24uYXR0cmlidXRlc1toXS5uYW1lXT1uLmF0dHJpYnV0ZXNbaF0udmFsdWU7KHZ8fHApJiYodiYmcCYmdi5fX2h0bWw9PXAuX19odG1sfHwobi5pbm5lckhUTUw9diYmdi5fX2h0bWx8fFwiXCIpKX1fKG4seSxkLGksYyksbC5fX2s9bC5wcm9wcy5jaGlsZHJlbix2fHxnKG4sbCx1LHQsXCJmb3JlaWduT2JqZWN0XCIhPT1sLnR5cGUmJmksbyxyLGYsYyksY3x8KFwidmFsdWVcImluIHkmJnZvaWQgMCE9PXkudmFsdWUmJnkudmFsdWUhPT1uLnZhbHVlJiYobi52YWx1ZT1udWxsPT15LnZhbHVlP1wiXCI6eS52YWx1ZSksXCJjaGVja2VkXCJpbiB5JiZ2b2lkIDAhPT15LmNoZWNrZWQmJnkuY2hlY2tlZCE9PW4uY2hlY2tlZCYmKG4uY2hlY2tlZD15LmNoZWNrZWQpKX1yZXR1cm4gbn1mdW5jdGlvbiBUKGwsdSx0KXt0cnl7XCJmdW5jdGlvblwiPT10eXBlb2YgbD9sKHUpOmwuY3VycmVudD11fWNhdGNoKGwpe24uX19lKGwsdCl9fWZ1bmN0aW9uICQobCx1LHQpe3ZhciBpLG8scjtpZihuLnVubW91bnQmJm4udW5tb3VudChsKSwoaT1sLnJlZikmJihpLmN1cnJlbnQmJmkuY3VycmVudCE9PWwuX19lfHxUKGksbnVsbCx1KSksdHx8XCJmdW5jdGlvblwiPT10eXBlb2YgbC50eXBlfHwodD1udWxsIT0obz1sLl9fZSkpLGwuX19lPWwuX19kPXZvaWQgMCxudWxsIT0oaT1sLl9fYykpe2lmKGkuY29tcG9uZW50V2lsbFVubW91bnQpdHJ5e2kuY29tcG9uZW50V2lsbFVubW91bnQoKX1jYXRjaChsKXtuLl9fZShsLHUpfWkuYmFzZT1pLl9fUD1udWxsfWlmKGk9bC5fX2spZm9yKHI9MDtyPGkubGVuZ3RoO3IrKylpW3JdJiYkKGlbcl0sdSx0KTtudWxsIT1vJiZhKG8pfWZ1bmN0aW9uIGoobixsLHUpe3JldHVybiB0aGlzLmNvbnN0cnVjdG9yKG4sdSl9ZnVuY3Rpb24gRChsLHUsdCl7dmFyIGkscixjO24uX18mJm4uX18obCx1KSxyPShpPXQ9PT1vKT9udWxsOnQmJnQuX19rfHx1Ll9fayxsPXAoaCxudWxsLFtsXSksYz1bXSxOKHUsKGk/dTp0fHx1KS5fX2s9bCxyfHxmLGYsdm9pZCAwIT09dS5vd25lclNWR0VsZW1lbnQsdCYmIWk/W3RdOnI/bnVsbDplLnNsaWNlLmNhbGwodS5jaGlsZE5vZGVzKSxjLHR8fGYsaSkseihjLGwpfW49e19fZTpmdW5jdGlvbihuLGwpe2Zvcih2YXIgdSx0O2w9bC5fXzspaWYoKHU9bC5fX2MpJiYhdS5fXyl0cnl7aWYodS5jb25zdHJ1Y3RvciYmbnVsbCE9dS5jb25zdHJ1Y3Rvci5nZXREZXJpdmVkU3RhdGVGcm9tRXJyb3ImJih0PSEwLHUuc2V0U3RhdGUodS5jb25zdHJ1Y3Rvci5nZXREZXJpdmVkU3RhdGVGcm9tRXJyb3IobikpKSxudWxsIT11LmNvbXBvbmVudERpZENhdGNoJiYodD0hMCx1LmNvbXBvbmVudERpZENhdGNoKG4pKSx0KXJldHVybiBtKHUuX19FPXUpfWNhdGNoKGwpe249bH10aHJvdyBufX0sbD1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbCE9biYmdm9pZCAwPT09bi5jb25zdHJ1Y3Rvcn0sZC5wcm90b3R5cGUuc2V0U3RhdGU9ZnVuY3Rpb24obixsKXt2YXIgdTt1PXRoaXMuX19zIT09dGhpcy5zdGF0ZT90aGlzLl9fczp0aGlzLl9fcz1zKHt9LHRoaXMuc3RhdGUpLFwiZnVuY3Rpb25cIj09dHlwZW9mIG4mJihuPW4odSx0aGlzLnByb3BzKSksbiYmcyh1LG4pLG51bGwhPW4mJnRoaXMuX192JiYobCYmdGhpcy5fX2gucHVzaChsKSxtKHRoaXMpKX0sZC5wcm90b3R5cGUuZm9yY2VVcGRhdGU9ZnVuY3Rpb24obil7dGhpcy5fX3YmJih0aGlzLl9fZT0hMCxuJiZ0aGlzLl9faC5wdXNoKG4pLG0odGhpcykpfSxkLnByb3RvdHlwZS5yZW5kZXI9aCx1PVtdLHQ9XCJmdW5jdGlvblwiPT10eXBlb2YgUHJvbWlzZT9Qcm9taXNlLnByb3RvdHlwZS50aGVuLmJpbmQoUHJvbWlzZS5yZXNvbHZlKCkpOnNldFRpbWVvdXQsbz1mLHI9MCxleHBvcnRzLnJlbmRlcj1ELGV4cG9ydHMuaHlkcmF0ZT1mdW5jdGlvbihuLGwpe0QobixsLG8pfSxleHBvcnRzLmNyZWF0ZUVsZW1lbnQ9cCxleHBvcnRzLmg9cCxleHBvcnRzLkZyYWdtZW50PWgsZXhwb3J0cy5jcmVhdGVSZWY9ZnVuY3Rpb24oKXtyZXR1cm57fX0sZXhwb3J0cy5pc1ZhbGlkRWxlbWVudD1sLGV4cG9ydHMuQ29tcG9uZW50PWQsZXhwb3J0cy5jbG9uZUVsZW1lbnQ9ZnVuY3Rpb24obixsKXtyZXR1cm4gbD1zKHMoe30sbi5wcm9wcyksbCksYXJndW1lbnRzLmxlbmd0aD4yJiYobC5jaGlsZHJlbj1lLnNsaWNlLmNhbGwoYXJndW1lbnRzLDIpKSx2KG4udHlwZSxsLGwua2V5fHxuLmtleSxsLnJlZnx8bi5yZWYpfSxleHBvcnRzLmNyZWF0ZUNvbnRleHQ9ZnVuY3Rpb24obil7dmFyIGw9e30sdT17X19jOlwiX19jQ1wiK3IrKyxfXzpuLENvbnN1bWVyOmZ1bmN0aW9uKG4sbCl7cmV0dXJuIG4uY2hpbGRyZW4obCl9LFByb3ZpZGVyOmZ1bmN0aW9uKG4pe3ZhciB0LGk9dGhpcztyZXR1cm4gdGhpcy5nZXRDaGlsZENvbnRleHR8fCh0PVtdLHRoaXMuZ2V0Q2hpbGRDb250ZXh0PWZ1bmN0aW9uKCl7cmV0dXJuIGxbdS5fX2NdPWksbH0sdGhpcy5zaG91bGRDb21wb25lbnRVcGRhdGU9ZnVuY3Rpb24obCl7bi52YWx1ZSE9PWwudmFsdWUmJnQuc29tZShmdW5jdGlvbihuKXtuLmNvbnRleHQ9bC52YWx1ZSxtKG4pfSl9LHRoaXMuc3ViPWZ1bmN0aW9uKG4pe3QucHVzaChuKTt2YXIgbD1uLmNvbXBvbmVudFdpbGxVbm1vdW50O24uY29tcG9uZW50V2lsbFVubW91bnQ9ZnVuY3Rpb24oKXt0LnNwbGljZSh0LmluZGV4T2YobiksMSksbCYmbC5jYWxsKG4pfX0pLG4uY2hpbGRyZW59fTtyZXR1cm4gdS5Db25zdW1lci5jb250ZXh0VHlwZT11LHV9LGV4cG9ydHMudG9DaGlsZEFycmF5PWssZXhwb3J0cy5fZT0kLGV4cG9ydHMub3B0aW9ucz1uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHJlYWN0LmpzLm1hcFxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG52YXIgcnVudGltZSA9IChmdW5jdGlvbiAoZXhwb3J0cykge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgT3AgPSBPYmplY3QucHJvdG90eXBlO1xuICB2YXIgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuXG4gICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIEl0ZXJhdG9yUHJvdG90eXBlW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmXG4gICAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiZcbiAgICAgIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkpIHtcbiAgICAvLyBUaGlzIGVudmlyb25tZW50IGhhcyBhIG5hdGl2ZSAlSXRlcmF0b3JQcm90b3R5cGUlOyB1c2UgaXQgaW5zdGVhZFxuICAgIC8vIG9mIHRoZSBwb2x5ZmlsbC5cbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID1cbiAgICBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdwLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb247XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlW3RvU3RyaW5nVGFnU3ltYm9sXSA9XG4gICAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgcHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgZXhwb3J0cy5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgICBpZiAoISh0b1N0cmluZ1RhZ1N5bWJvbCBpbiBnZW5GdW4pKSB7XG4gICAgICAgIGdlbkZ1blt0b1N0cmluZ1RhZ1N5bWJvbF0gPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG4gICAgICB9XG4gICAgfVxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKWAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG4gIGV4cG9ydHMuYXdyYXAgPSBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4geyBfX2F3YWl0OiBhcmcgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZS5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbih1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgLy8gSWYgYSByZWplY3RlZCBQcm9taXNlIHdhcyB5aWVsZGVkLCB0aHJvdyB0aGUgcmVqZWN0aW9uIGJhY2tcbiAgICAgICAgICAvLyBpbnRvIHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGhhbmRsZWQgdGhlcmUuXG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKFxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnXG4gICAgICAgICkgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG4gIEFzeW5jSXRlcmF0b3IucHJvdG90eXBlW2FzeW5jSXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBleHBvcnRzLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yO1xuXG4gIC8vIE5vdGUgdGhhdCBzaW1wbGUgYXN5bmMgZnVuY3Rpb25zIGFyZSBpbXBsZW1lbnRlZCBvbiB0b3Agb2ZcbiAgLy8gQXN5bmNJdGVyYXRvciBvYmplY3RzOyB0aGV5IGp1c3QgcmV0dXJuIGEgUHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9mXG4gIC8vIHRoZSBmaW5hbCByZXN1bHQgcHJvZHVjZWQgYnkgdGhlIGl0ZXJhdG9yLlxuICBleHBvcnRzLmFzeW5jID0gZnVuY3Rpb24oaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKFxuICAgICAgd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdClcbiAgICApO1xuXG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO1xuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIC8vIE5vdGU6IFtcInJldHVyblwiXSBtdXN0IGJlIHVzZWQgZm9yIEVTMyBwYXJzaW5nIGNvbXBhdGliaWxpdHkuXG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoISBpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuXG4gICAgICAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuXG4gICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmUteWllbGQgdGhlIHJlc3VsdCByZXR1cm5lZCBieSB0aGUgZGVsZWdhdGUgbWV0aG9kLlxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIEdwW3RvU3RyaW5nVGFnU3ltYm9sXSA9IFwiR2VuZXJhdG9yXCI7XG5cbiAgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuICBHcFtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBHcC50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0geyB0cnlMb2M6IGxvY3NbMF0gfTtcblxuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG5cbiAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbeyB0cnlMb2M6IFwicm9vdFwiIH1dO1xuICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0KHRydWUpO1xuICB9XG5cbiAgZXhwb3J0cy5rZXlzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSwgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgcmV0dXJuIHsgbmV4dDogZG9uZVJlc3VsdCB9O1xuICB9XG4gIGV4cG9ydHMudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG5cbiAgICByZXNldDogZnVuY3Rpb24oc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmXG4gICAgICAgICAgICAgIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmXG4gICAgICAgICAgICAgICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcblxuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcblxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcblxuICAgICAgICBpZiAoY2F1Z2h0KSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gISEgY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uKHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmXG4gICAgICAgICAgICB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiZcbiAgICAgICAgICAodHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgIHR5cGUgPT09IFwiY29udGludWVcIikgJiZcbiAgICAgICAgICBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJlxuICAgICAgICAgIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG5cbiAgICBmaW5pc2g6IGZ1bmN0aW9uKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24odHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcblxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG5cbiAgLy8gUmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZVxuICAvLyBvciBub3QsIHJldHVybiB0aGUgcnVudGltZSBvYmplY3Qgc28gdGhhdCB3ZSBjYW4gZGVjbGFyZSB0aGUgdmFyaWFibGVcbiAgLy8gcmVnZW5lcmF0b3JSdW50aW1lIGluIHRoZSBvdXRlciBzY29wZSwgd2hpY2ggYWxsb3dzIHRoaXMgbW9kdWxlIHRvIGJlXG4gIC8vIGluamVjdGVkIGVhc2lseSBieSBgYmluL3JlZ2VuZXJhdG9yIC0taW5jbHVkZS1ydW50aW1lIHNjcmlwdC5qc2AuXG4gIHJldHVybiBleHBvcnRzO1xuXG59KFxuICAvLyBJZiB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGUsIHVzZSBtb2R1bGUuZXhwb3J0c1xuICAvLyBhcyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIG5hbWVzcGFjZS4gT3RoZXJ3aXNlIGNyZWF0ZSBhIG5ldyBlbXB0eVxuICAvLyBvYmplY3QuIEVpdGhlciB3YXksIHRoZSByZXN1bHRpbmcgb2JqZWN0IHdpbGwgYmUgdXNlZCB0byBpbml0aWFsaXplXG4gIC8vIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgdmFyaWFibGUgYXQgdGhlIHRvcCBvZiB0aGlzIGZpbGUuXG4gIHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgPyBtb2R1bGUuZXhwb3J0cyA6IHt9XG4pKTtcblxudHJ5IHtcbiAgcmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbn0gY2F0Y2ggKGFjY2lkZW50YWxTdHJpY3RNb2RlKSB7XG4gIC8vIFRoaXMgbW9kdWxlIHNob3VsZCBub3QgYmUgcnVubmluZyBpbiBzdHJpY3QgbW9kZSwgc28gdGhlIGFib3ZlXG4gIC8vIGFzc2lnbm1lbnQgc2hvdWxkIGFsd2F5cyB3b3JrIHVubGVzcyBzb21ldGhpbmcgaXMgbWlzY29uZmlndXJlZC4gSnVzdFxuICAvLyBpbiBjYXNlIHJ1bnRpbWUuanMgYWNjaWRlbnRhbGx5IHJ1bnMgaW4gc3RyaWN0IG1vZGUsIHdlIGNhbiBlc2NhcGVcbiAgLy8gc3RyaWN0IG1vZGUgdXNpbmcgYSBnbG9iYWwgRnVuY3Rpb24gY2FsbC4gVGhpcyBjb3VsZCBjb25jZWl2YWJseSBmYWlsXG4gIC8vIGlmIGEgQ29udGVudCBTZWN1cml0eSBQb2xpY3kgZm9yYmlkcyB1c2luZyBGdW5jdGlvbiwgYnV0IGluIHRoYXQgY2FzZVxuICAvLyB0aGUgcHJvcGVyIHNvbHV0aW9uIGlzIHRvIGZpeCB0aGUgYWNjaWRlbnRhbCBzdHJpY3QgbW9kZSBwcm9ibGVtLiBJZlxuICAvLyB5b3UndmUgbWlzY29uZmlndXJlZCB5b3VyIGJ1bmRsZXIgdG8gZm9yY2Ugc3RyaWN0IG1vZGUgYW5kIGFwcGxpZWQgYVxuICAvLyBDU1AgdG8gZm9yYmlkIEZ1bmN0aW9uLCBhbmQgeW91J3JlIG5vdCB3aWxsaW5nIHRvIGZpeCBlaXRoZXIgb2YgdGhvc2VcbiAgLy8gcHJvYmxlbXMsIHBsZWFzZSBkZXRhaWwgeW91ciB1bmlxdWUgcHJlZGljYW1lbnQgaW4gYSBHaXRIdWIgaXNzdWUuXG4gIEZ1bmN0aW9uKFwiclwiLCBcInJlZ2VuZXJhdG9yUnVudGltZSA9IHJcIikocnVudGltZSk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2luZGV4Jyk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciByYW5kb21Gcm9tU2VlZCA9IHJlcXVpcmUoJy4vcmFuZG9tL3JhbmRvbS1mcm9tLXNlZWQnKTtcblxudmFyIE9SSUdJTkFMID0gJzAxMjM0NTY3ODlhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaXy0nO1xudmFyIGFscGhhYmV0O1xudmFyIHByZXZpb3VzU2VlZDtcblxudmFyIHNodWZmbGVkO1xuXG5mdW5jdGlvbiByZXNldCgpIHtcbiAgICBzaHVmZmxlZCA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBzZXRDaGFyYWN0ZXJzKF9hbHBoYWJldF8pIHtcbiAgICBpZiAoIV9hbHBoYWJldF8pIHtcbiAgICAgICAgaWYgKGFscGhhYmV0ICE9PSBPUklHSU5BTCkge1xuICAgICAgICAgICAgYWxwaGFiZXQgPSBPUklHSU5BTDtcbiAgICAgICAgICAgIHJlc2V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChfYWxwaGFiZXRfID09PSBhbHBoYWJldCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKF9hbHBoYWJldF8ubGVuZ3RoICE9PSBPUklHSU5BTC5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDdXN0b20gYWxwaGFiZXQgZm9yIHNob3J0aWQgbXVzdCBiZSAnICsgT1JJR0lOQUwubGVuZ3RoICsgJyB1bmlxdWUgY2hhcmFjdGVycy4gWW91IHN1Ym1pdHRlZCAnICsgX2FscGhhYmV0Xy5sZW5ndGggKyAnIGNoYXJhY3RlcnM6ICcgKyBfYWxwaGFiZXRfKTtcbiAgICB9XG5cbiAgICB2YXIgdW5pcXVlID0gX2FscGhhYmV0Xy5zcGxpdCgnJykuZmlsdGVyKGZ1bmN0aW9uKGl0ZW0sIGluZCwgYXJyKXtcbiAgICAgICByZXR1cm4gaW5kICE9PSBhcnIubGFzdEluZGV4T2YoaXRlbSk7XG4gICAgfSk7XG5cbiAgICBpZiAodW5pcXVlLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0N1c3RvbSBhbHBoYWJldCBmb3Igc2hvcnRpZCBtdXN0IGJlICcgKyBPUklHSU5BTC5sZW5ndGggKyAnIHVuaXF1ZSBjaGFyYWN0ZXJzLiBUaGVzZSBjaGFyYWN0ZXJzIHdlcmUgbm90IHVuaXF1ZTogJyArIHVuaXF1ZS5qb2luKCcsICcpKTtcbiAgICB9XG5cbiAgICBhbHBoYWJldCA9IF9hbHBoYWJldF87XG4gICAgcmVzZXQoKTtcbn1cblxuZnVuY3Rpb24gY2hhcmFjdGVycyhfYWxwaGFiZXRfKSB7XG4gICAgc2V0Q2hhcmFjdGVycyhfYWxwaGFiZXRfKTtcbiAgICByZXR1cm4gYWxwaGFiZXQ7XG59XG5cbmZ1bmN0aW9uIHNldFNlZWQoc2VlZCkge1xuICAgIHJhbmRvbUZyb21TZWVkLnNlZWQoc2VlZCk7XG4gICAgaWYgKHByZXZpb3VzU2VlZCAhPT0gc2VlZCkge1xuICAgICAgICByZXNldCgpO1xuICAgICAgICBwcmV2aW91c1NlZWQgPSBzZWVkO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2h1ZmZsZSgpIHtcbiAgICBpZiAoIWFscGhhYmV0KSB7XG4gICAgICAgIHNldENoYXJhY3RlcnMoT1JJR0lOQUwpO1xuICAgIH1cblxuICAgIHZhciBzb3VyY2VBcnJheSA9IGFscGhhYmV0LnNwbGl0KCcnKTtcbiAgICB2YXIgdGFyZ2V0QXJyYXkgPSBbXTtcbiAgICB2YXIgciA9IHJhbmRvbUZyb21TZWVkLm5leHRWYWx1ZSgpO1xuICAgIHZhciBjaGFyYWN0ZXJJbmRleDtcblxuICAgIHdoaWxlIChzb3VyY2VBcnJheS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHIgPSByYW5kb21Gcm9tU2VlZC5uZXh0VmFsdWUoKTtcbiAgICAgICAgY2hhcmFjdGVySW5kZXggPSBNYXRoLmZsb29yKHIgKiBzb3VyY2VBcnJheS5sZW5ndGgpO1xuICAgICAgICB0YXJnZXRBcnJheS5wdXNoKHNvdXJjZUFycmF5LnNwbGljZShjaGFyYWN0ZXJJbmRleCwgMSlbMF0pO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0QXJyYXkuam9pbignJyk7XG59XG5cbmZ1bmN0aW9uIGdldFNodWZmbGVkKCkge1xuICAgIGlmIChzaHVmZmxlZCkge1xuICAgICAgICByZXR1cm4gc2h1ZmZsZWQ7XG4gICAgfVxuICAgIHNodWZmbGVkID0gc2h1ZmZsZSgpO1xuICAgIHJldHVybiBzaHVmZmxlZDtcbn1cblxuLyoqXG4gKiBsb29rdXAgc2h1ZmZsZWQgbGV0dGVyXG4gKiBAcGFyYW0gaW5kZXhcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGxvb2t1cChpbmRleCkge1xuICAgIHZhciBhbHBoYWJldFNodWZmbGVkID0gZ2V0U2h1ZmZsZWQoKTtcbiAgICByZXR1cm4gYWxwaGFiZXRTaHVmZmxlZFtpbmRleF07XG59XG5cbmZ1bmN0aW9uIGdldCAoKSB7XG4gIHJldHVybiBhbHBoYWJldCB8fCBPUklHSU5BTDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2V0OiBnZXQsXG4gICAgY2hhcmFjdGVyczogY2hhcmFjdGVycyxcbiAgICBzZWVkOiBzZXRTZWVkLFxuICAgIGxvb2t1cDogbG9va3VwLFxuICAgIHNodWZmbGVkOiBnZXRTaHVmZmxlZFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGdlbmVyYXRlID0gcmVxdWlyZSgnLi9nZW5lcmF0ZScpO1xudmFyIGFscGhhYmV0ID0gcmVxdWlyZSgnLi9hbHBoYWJldCcpO1xuXG4vLyBJZ25vcmUgYWxsIG1pbGxpc2Vjb25kcyBiZWZvcmUgYSBjZXJ0YWluIHRpbWUgdG8gcmVkdWNlIHRoZSBzaXplIG9mIHRoZSBkYXRlIGVudHJvcHkgd2l0aG91dCBzYWNyaWZpY2luZyB1bmlxdWVuZXNzLlxuLy8gVGhpcyBudW1iZXIgc2hvdWxkIGJlIHVwZGF0ZWQgZXZlcnkgeWVhciBvciBzbyB0byBrZWVwIHRoZSBnZW5lcmF0ZWQgaWQgc2hvcnQuXG4vLyBUbyByZWdlbmVyYXRlIGBuZXcgRGF0ZSgpIC0gMGAgYW5kIGJ1bXAgdGhlIHZlcnNpb24uIEFsd2F5cyBidW1wIHRoZSB2ZXJzaW9uIVxudmFyIFJFRFVDRV9USU1FID0gMTU2Nzc1MjgwMjA2MjtcblxuLy8gZG9uJ3QgY2hhbmdlIHVubGVzcyB3ZSBjaGFuZ2UgdGhlIGFsZ29zIG9yIFJFRFVDRV9USU1FXG4vLyBtdXN0IGJlIGFuIGludGVnZXIgYW5kIGxlc3MgdGhhbiAxNlxudmFyIHZlcnNpb24gPSA3O1xuXG4vLyBDb3VudGVyIGlzIHVzZWQgd2hlbiBzaG9ydGlkIGlzIGNhbGxlZCBtdWx0aXBsZSB0aW1lcyBpbiBvbmUgc2Vjb25kLlxudmFyIGNvdW50ZXI7XG5cbi8vIFJlbWVtYmVyIHRoZSBsYXN0IHRpbWUgc2hvcnRpZCB3YXMgY2FsbGVkIGluIGNhc2UgY291bnRlciBpcyBuZWVkZWQuXG52YXIgcHJldmlvdXNTZWNvbmRzO1xuXG4vKipcbiAqIEdlbmVyYXRlIHVuaXF1ZSBpZFxuICogUmV0dXJucyBzdHJpbmcgaWRcbiAqL1xuZnVuY3Rpb24gYnVpbGQoY2x1c3RlcldvcmtlcklkKSB7XG4gICAgdmFyIHN0ciA9ICcnO1xuXG4gICAgdmFyIHNlY29uZHMgPSBNYXRoLmZsb29yKChEYXRlLm5vdygpIC0gUkVEVUNFX1RJTUUpICogMC4wMDEpO1xuXG4gICAgaWYgKHNlY29uZHMgPT09IHByZXZpb3VzU2Vjb25kcykge1xuICAgICAgICBjb3VudGVyKys7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY291bnRlciA9IDA7XG4gICAgICAgIHByZXZpb3VzU2Vjb25kcyA9IHNlY29uZHM7XG4gICAgfVxuXG4gICAgc3RyID0gc3RyICsgZ2VuZXJhdGUodmVyc2lvbik7XG4gICAgc3RyID0gc3RyICsgZ2VuZXJhdGUoY2x1c3RlcldvcmtlcklkKTtcbiAgICBpZiAoY291bnRlciA+IDApIHtcbiAgICAgICAgc3RyID0gc3RyICsgZ2VuZXJhdGUoY291bnRlcik7XG4gICAgfVxuICAgIHN0ciA9IHN0ciArIGdlbmVyYXRlKHNlY29uZHMpO1xuICAgIHJldHVybiBzdHI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnVpbGQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBhbHBoYWJldCA9IHJlcXVpcmUoJy4vYWxwaGFiZXQnKTtcbnZhciByYW5kb20gPSByZXF1aXJlKCcuL3JhbmRvbS9yYW5kb20tYnl0ZScpO1xudmFyIGZvcm1hdCA9IHJlcXVpcmUoJ25hbm9pZC9mb3JtYXQnKTtcblxuZnVuY3Rpb24gZ2VuZXJhdGUobnVtYmVyKSB7XG4gICAgdmFyIGxvb3BDb3VudGVyID0gMDtcbiAgICB2YXIgZG9uZTtcblxuICAgIHZhciBzdHIgPSAnJztcblxuICAgIHdoaWxlICghZG9uZSkge1xuICAgICAgICBzdHIgPSBzdHIgKyBmb3JtYXQocmFuZG9tLCBhbHBoYWJldC5nZXQoKSwgMSk7XG4gICAgICAgIGRvbmUgPSBudW1iZXIgPCAoTWF0aC5wb3coMTYsIGxvb3BDb3VudGVyICsgMSApICk7XG4gICAgICAgIGxvb3BDb3VudGVyKys7XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2VuZXJhdGU7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBhbHBoYWJldCA9IHJlcXVpcmUoJy4vYWxwaGFiZXQnKTtcbnZhciBidWlsZCA9IHJlcXVpcmUoJy4vYnVpbGQnKTtcbnZhciBpc1ZhbGlkID0gcmVxdWlyZSgnLi9pcy12YWxpZCcpO1xuXG4vLyBpZiB5b3UgYXJlIHVzaW5nIGNsdXN0ZXIgb3IgbXVsdGlwbGUgc2VydmVycyB1c2UgdGhpcyB0byBtYWtlIGVhY2ggaW5zdGFuY2Vcbi8vIGhhcyBhIHVuaXF1ZSB2YWx1ZSBmb3Igd29ya2VyXG4vLyBOb3RlOiBJIGRvbid0IGtub3cgaWYgdGhpcyBpcyBhdXRvbWF0aWNhbGx5IHNldCB3aGVuIHVzaW5nIHRoaXJkXG4vLyBwYXJ0eSBjbHVzdGVyIHNvbHV0aW9ucyBzdWNoIGFzIHBtMi5cbnZhciBjbHVzdGVyV29ya2VySWQgPSByZXF1aXJlKCcuL3V0aWwvY2x1c3Rlci13b3JrZXItaWQnKSB8fCAwO1xuXG4vKipcbiAqIFNldCB0aGUgc2VlZC5cbiAqIEhpZ2hseSByZWNvbW1lbmRlZCBpZiB5b3UgZG9uJ3Qgd2FudCBwZW9wbGUgdG8gdHJ5IHRvIGZpZ3VyZSBvdXQgeW91ciBpZCBzY2hlbWEuXG4gKiBleHBvc2VkIGFzIHNob3J0aWQuc2VlZChpbnQpXG4gKiBAcGFyYW0gc2VlZCBJbnRlZ2VyIHZhbHVlIHRvIHNlZWQgdGhlIHJhbmRvbSBhbHBoYWJldC4gIEFMV0FZUyBVU0UgVEhFIFNBTUUgU0VFRCBvciB5b3UgbWlnaHQgZ2V0IG92ZXJsYXBzLlxuICovXG5mdW5jdGlvbiBzZWVkKHNlZWRWYWx1ZSkge1xuICAgIGFscGhhYmV0LnNlZWQoc2VlZFZhbHVlKTtcbiAgICByZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8qKlxuICogU2V0IHRoZSBjbHVzdGVyIHdvcmtlciBvciBtYWNoaW5lIGlkXG4gKiBleHBvc2VkIGFzIHNob3J0aWQud29ya2VyKGludClcbiAqIEBwYXJhbSB3b3JrZXJJZCB3b3JrZXIgbXVzdCBiZSBwb3NpdGl2ZSBpbnRlZ2VyLiAgTnVtYmVyIGxlc3MgdGhhbiAxNiBpcyByZWNvbW1lbmRlZC5cbiAqIHJldHVybnMgc2hvcnRpZCBtb2R1bGUgc28gaXQgY2FuIGJlIGNoYWluZWQuXG4gKi9cbmZ1bmN0aW9uIHdvcmtlcih3b3JrZXJJZCkge1xuICAgIGNsdXN0ZXJXb3JrZXJJZCA9IHdvcmtlcklkO1xuICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLyoqXG4gKlxuICogc2V0cyBuZXcgY2hhcmFjdGVycyB0byB1c2UgaW4gdGhlIGFscGhhYmV0XG4gKiByZXR1cm5zIHRoZSBzaHVmZmxlZCBhbHBoYWJldFxuICovXG5mdW5jdGlvbiBjaGFyYWN0ZXJzKG5ld0NoYXJhY3RlcnMpIHtcbiAgICBpZiAobmV3Q2hhcmFjdGVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGFscGhhYmV0LmNoYXJhY3RlcnMobmV3Q2hhcmFjdGVycyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFscGhhYmV0LnNodWZmbGVkKCk7XG59XG5cbi8qKlxuICogR2VuZXJhdGUgdW5pcXVlIGlkXG4gKiBSZXR1cm5zIHN0cmluZyBpZFxuICovXG5mdW5jdGlvbiBnZW5lcmF0ZSgpIHtcbiAgcmV0dXJuIGJ1aWxkKGNsdXN0ZXJXb3JrZXJJZCk7XG59XG5cbi8vIEV4cG9ydCBhbGwgb3RoZXIgZnVuY3Rpb25zIGFzIHByb3BlcnRpZXMgb2YgdGhlIGdlbmVyYXRlIGZ1bmN0aW9uXG5tb2R1bGUuZXhwb3J0cyA9IGdlbmVyYXRlO1xubW9kdWxlLmV4cG9ydHMuZ2VuZXJhdGUgPSBnZW5lcmF0ZTtcbm1vZHVsZS5leHBvcnRzLnNlZWQgPSBzZWVkO1xubW9kdWxlLmV4cG9ydHMud29ya2VyID0gd29ya2VyO1xubW9kdWxlLmV4cG9ydHMuY2hhcmFjdGVycyA9IGNoYXJhY3RlcnM7XG5tb2R1bGUuZXhwb3J0cy5pc1ZhbGlkID0gaXNWYWxpZDtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBhbHBoYWJldCA9IHJlcXVpcmUoJy4vYWxwaGFiZXQnKTtcblxuZnVuY3Rpb24gaXNTaG9ydElkKGlkKSB7XG4gICAgaWYgKCFpZCB8fCB0eXBlb2YgaWQgIT09ICdzdHJpbmcnIHx8IGlkLmxlbmd0aCA8IDYgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgbm9uQWxwaGFiZXRpYyA9IG5ldyBSZWdFeHAoJ1teJyArXG4gICAgICBhbHBoYWJldC5nZXQoKS5yZXBsYWNlKC9bfFxcXFx7fSgpW1xcXV4kKyo/Li1dL2csICdcXFxcJCYnKSArXG4gICAgJ10nKTtcbiAgICByZXR1cm4gIW5vbkFscGhhYmV0aWMudGVzdChpZCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNTaG9ydElkO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3J5cHRvID0gdHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgKHdpbmRvdy5jcnlwdG8gfHwgd2luZG93Lm1zQ3J5cHRvKTsgLy8gSUUgMTEgdXNlcyB3aW5kb3cubXNDcnlwdG9cblxudmFyIHJhbmRvbUJ5dGU7XG5cbmlmICghY3J5cHRvIHx8ICFjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgcmFuZG9tQnl0ZSA9IGZ1bmN0aW9uKHNpemUpIHtcbiAgICAgICAgdmFyIGJ5dGVzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICAgICAgICBieXRlcy5wdXNoKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NikpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBieXRlcztcbiAgICB9O1xufSBlbHNlIHtcbiAgICByYW5kb21CeXRlID0gZnVuY3Rpb24oc2l6ZSkge1xuICAgICAgICByZXR1cm4gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheShzaXplKSk7XG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByYW5kb21CeXRlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBGb3VuZCB0aGlzIHNlZWQtYmFzZWQgcmFuZG9tIGdlbmVyYXRvciBzb21ld2hlcmVcbi8vIEJhc2VkIG9uIFRoZSBDZW50cmFsIFJhbmRvbWl6ZXIgMS4zIChDKSAxOTk3IGJ5IFBhdWwgSG91bGUgKGhvdWxlQG1zYy5jb3JuZWxsLmVkdSlcblxudmFyIHNlZWQgPSAxO1xuXG4vKipcbiAqIHJldHVybiBhIHJhbmRvbSBudW1iZXIgYmFzZWQgb24gYSBzZWVkXG4gKiBAcGFyYW0gc2VlZFxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZnVuY3Rpb24gZ2V0TmV4dFZhbHVlKCkge1xuICAgIHNlZWQgPSAoc2VlZCAqIDkzMDEgKyA0OTI5NykgJSAyMzMyODA7XG4gICAgcmV0dXJuIHNlZWQvKDIzMzI4MC4wKTtcbn1cblxuZnVuY3Rpb24gc2V0U2VlZChfc2VlZF8pIHtcbiAgICBzZWVkID0gX3NlZWRfO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBuZXh0VmFsdWU6IGdldE5leHRWYWx1ZSxcbiAgICBzZWVkOiBzZXRTZWVkXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IDA7XG4iLCJpbXBvcnQgXCJwcmVhY3QvZGVidWdcIjtcblxuaW1wb3J0IHsgaCwgcmVuZGVyIH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCBBcHAgZnJvbSAnLi92aWV3L0FwcC5qc3gnO1xuaW1wb3J0IEFwcENvbnRleHQgZnJvbSAnLi91dGlscy9BcHBDb250ZXh0LmpzJztcbmltcG9ydCBzaG9ydGlkIGZyb20gJ3Nob3J0aWQnO1xuaW1wb3J0IEFwcENvbnRyb2xsZXIgZnJvbSAnLi9tb2RlbC9BcHBDb250cm9sbGVyLmpzJztcbmltcG9ydCBBcHBIZWxwZXIgZnJvbSAnLi9tb2RlbC9BcHBIZWxwZXIuanMnO1xuaW1wb3J0IENvbmR1Y3RvciBmcm9tICcuL21vZGVsL0NvbmR1Y3Rvci5qcyc7XG5cbmxldCBjb25kdWN0b3I9bmV3IENvbmR1Y3RvcigpO1xubGV0IGFwcEhlbHBlcj1uZXcgQXBwSGVscGVyKGNvbmR1Y3Rvcik7XG5sZXQgYXBwQ29udHJvbGxlcj1uZXcgQXBwQ29udHJvbGxlcihjb25kdWN0b3IsYXBwSGVscGVyKTtcblxuY29uZHVjdG9yLm9uUGxheUdyaWRJbmRleENoYW5nZT0oZ3JpZEluZGV4LCBzZXF1ZW5jZUluZGV4KT0+e1xuXHRmb3IgKGxldCBlbCBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmN1cnJlbnQtYmVhdFwiKSlcblx0XHRlbC5jbGFzc0xpc3QucmVtb3ZlKCdjdXJyZW50LWJlYXQnKTtcblxuXHRpZiAoZ3JpZEluZGV4Pj0wKVxuXHRcdGZvciAobGV0IGVsIG9mIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYmVhdC1cIitncmlkSW5kZXgpKVxuXHRcdFx0ZWwuY2xhc3NMaXN0LmFkZCgnY3VycmVudC1iZWF0Jyk7XG5cblx0Zm9yIChsZXQgZWwgb2YgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jdXJyZW50LXNlcXVlbmNlXCIpKVxuXHRcdGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2N1cnJlbnQtc2VxdWVuY2UnKTtcblxuXHRpZiAoZ3JpZEluZGV4JTQ9PTAgJiYgc2VxdWVuY2VJbmRleD49MClcblx0XHRmb3IgKGxldCBlbCBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlcXVlbmNlLVwiK3NlcXVlbmNlSW5kZXgpKVxuXHRcdFx0ZWwuY2xhc3NMaXN0LmFkZCgnY3VycmVudC1zZXF1ZW5jZScpO1xufVxuXG5mdW5jdGlvbiBvblN0YXRlQ2hhbmdlKHN0YXRlKSB7XG5cdGNvbmR1Y3Rvci5zZXRTdGF0ZShzdGF0ZSk7XG5cdHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImhvb2Rtb2RlLXNvbmdzXCIsSlNPTi5zdHJpbmdpZnkoc3RhdGUuc29uZ3MpKTtcbn1cblxubGV0IGFwcENvbnRleHQ9KFxuXHQ8QXBwQ29udGV4dFxuXHRcdFx0Y29udHJvbGxlcj17YXBwQ29udHJvbGxlcn1cblx0XHRcdGhlbHBlcj17YXBwSGVscGVyfVxuXHRcdFx0aW5pdEFjdGlvbj1cImluaXRcIlxuXHRcdFx0b25TdGF0ZUNoYW5nZT17b25TdGF0ZUNoYW5nZX0+XG5cdFx0PEFwcC8+XG5cdDwvQXBwQ29udGV4dD5cbik7XG5cbmZ1bmN0aW9uIHN0YXJ0KCkge1xuXHRyZW5kZXIoYXBwQ29udGV4dCwgZG9jdW1lbnQuYm9keSk7XG59XG5cbmlmICh3aW5kb3cuaGFzT3duUHJvcGVydHkoXCJjb3Jkb3ZhXCIpKVxuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkZXZpY2VyZWFkeScsc3RhcnQpO1xuXG5lbHNlXG5cdHN0YXJ0KCk7XG4iLCJpbXBvcnQgc2hvcnRpZCBmcm9tICdzaG9ydGlkJztcbmltcG9ydCBcInJlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBDb250cm9sbGVyIHtcblx0Y29uc3RydWN0b3IoY29uZHVjdG9yLCBoZWxwZXIpIHtcblx0XHR0aGlzLmNvbmR1Y3Rvcj1jb25kdWN0b3I7XG5cdFx0dGhpcy5oZWxwZXI9aGVscGVyO1xuXHR9XG5cblx0aW5pdFN0YXRlKCkge1xuXHRcdGxldCBzdGF0ZT17XG5cdFx0XHRjdXJyZW50U29uZ0luZGV4OiAtMSxcblx0XHRcdGN1cnJlbnRMYXllckluZGV4OiAtMSxcblx0XHRcdGN1cnJlbnRDaG9yZEluZGV4OiAwLFxuXHRcdFx0Y3VycmVudFNlY3Rpb25JbmRleDogLTEsXG5cdFx0XHRjdXJyZW50R3JpZEluZGV4OiAtMSxcblx0XHRcdHNldHRpbmdzVmlzaWJsZTogZmFsc2UsXG5cdFx0XHRhZGRMYXllclZpc2libGU6IGZhbHNlLFxuXHRcdFx0c29uZ3M6IFtdLFxuXHRcdFx0aW5zdHJ1bWVudHM6IFtdLFxuXHRcdFx0cGxheWluZzogZmFsc2UsXG5cdFx0XHRyZWNvcmRpbmc6IGZhbHNlLFxuXHRcdFx0ZWRpdFNlY3Rpb25DaG9yZFZpc2libGU6IC0xXG5cdFx0fVxuXG5cdFx0c3RhdGUuaW5zdHJ1bWVudHMucHVzaCh7XG5cdFx0XHRcImtleVwiOiBcImJhZC1qYXp6LWRydW1zXCIsXG5cdFx0XHRcInR5cGVcIjogXCJwZXJjdXNzaXZlXCIsXG5cdFx0XHRcIm5hbWVcIjogXCJCYWQgSmF6eiBEcnVtc1wiLFxuXHRcdFx0XCJsYWJlbHNcIjogW1wiS0lDS1wiLFwiU05BUkVcIixcIkhJLUhBVFwiXSxcblx0XHRcdFwiaWNvblwiOiBcImRydW0uc3ZnXCIsXG5cdFx0XHRcImljb25zXCI6IFtcImtpY2stZHJ1bS5zdmdcIixcInNuYXJlLWRydW0uc3ZnXCIsXCJoaS1oYXQuc3ZnXCJdLFxuXHRcdFx0XCJzYW1wbGVzXCI6IFtcblx0XHRcdFx0XCJzYW1wbGVzL2RydW1zL2JhZC1raWNrLndhdlwiLFxuXHRcdFx0XHRcInNhbXBsZXMvZHJ1bXMvYmFkLXNuYXJlLndhdlwiLFxuXHRcdFx0XHRcInNhbXBsZXMvZHJ1bXMvYmFkLWhpaGF0LndhdlwiLFxuXHRcdFx0XVxuXHRcdH0pO1xuXG5cdFx0c3RhdGUuaW5zdHJ1bWVudHMucHVzaCh7XG5cdFx0XHRcImtleVwiOiBcInllcy1kcnVtc1wiLFxuXHRcdFx0XCJ0eXBlXCI6IFwicGVyY3Vzc2l2ZVwiLFxuXHRcdFx0XCJuYW1lXCI6IFwiWWVzIERydW1zXCIsXG5cdFx0XHRcImxhYmVsc1wiOiBbXCJLSUNLXCIsXCJTTkFSRVwiLFwiSEktSEFUIDFcIixcIkhJLUhBVCAyXCIsXCJISS1IQVQgM1wiXSxcblx0XHRcdFwiaWNvblwiOiBcImRydW0uc3ZnXCIsXG5cdFx0XHRcImljb25zXCI6IFtcImtpY2stZHJ1bS5zdmdcIixcInNuYXJlLWRydW0uc3ZnXCIsXCJoaS1oYXQuc3ZnXCIsXCJoaS1oYXQuc3ZnXCIsXCJoaS1oYXQuc3ZnXCJdLFxuXHRcdFx0XCJzYW1wbGVzXCI6IFtcblx0XHRcdFx0XCJzYW1wbGVzL2RydW1zL3llcy1raWNrLm1wM1wiLFxuXHRcdFx0XHRcInNhbXBsZXMvZHJ1bXMveWVzLXNuYXJlLm1wM1wiLFxuXHRcdFx0XHRcInNhbXBsZXMvZHJ1bXMvdGhybC1oYXRfQV9taW5vci53YXZcIixcblx0XHRcdFx0XCJzYW1wbGVzL2RydW1zL3ZpbnlsLWhhdF85MGJwbV9DLndhdlwiLFxuXHRcdFx0XHRcInNhbXBsZXMvZHJ1bXMvcm9jay1oaWhhdC10Y2hpay53YXZcIlxuXHRcdFx0XVxuXHRcdH0pO1xuXG5cdFx0c3RhdGUuaW5zdHJ1bWVudHMucHVzaCh7XG5cdFx0XHRcImtleVwiOiBcImRpdmUtYmFzc1wiLFxuXHRcdFx0XCJ0eXBlXCI6IFwiaGFybW9uaWNcIixcblx0XHRcdFwibmFtZVwiOiBcIkRpdmUgQmFzc1wiLFxuXHRcdFx0XCJzYW1wbGVcIjogXCJzYW1wbGVzL2Jhc3MvdXByaWdodC1iYXNzLWJvbWJkaXZlLm1wM1wiLFxuXHRcdFx0XCJpY29uXCI6IFwiYmFzcy5zdmdcIlxuXHRcdH0pO1xuXG5cdFx0c3RhdGUuaW5zdHJ1bWVudHMucHVzaCh7XG5cdFx0XHRcImtleVwiOiBcImFjb3VzdGljLWJhc3NcIixcblx0XHRcdFwidHlwZVwiOiBcImhhcm1vbmljXCIsXG5cdFx0XHRcIm5hbWVcIjogXCJBY291c3RpYyBCYXNzXCIsXG5cdFx0XHRcInNhbXBsZU5vdGVcIjogXCJGI1wiLFxuXHRcdFx0XCJzYW1wbGVcIjogXCJzYW1wbGVzL2Jhc3MvYWNvdXN0aWNfYmFzc19mX3NoYXJwLm1wM1wiLFxuXHRcdFx0XCJpY29uXCI6IFwiYmFzcy5zdmdcIlxuXHRcdH0pO1xuXG5cdFx0c3RhdGUuaW5zdHJ1bWVudHMucHVzaCh7XG5cdFx0XHRcImtleVwiOiBcInBpYW5vXCIsXG5cdFx0XHRcInR5cGVcIjogXCJoYXJtb25pY1wiLFxuXHRcdFx0XCJuYW1lXCI6IFwiUGlhbm9cIixcblx0XHRcdFwic2FtcGxlXCI6IFwic2FtcGxlcy9waWFuby9waWFuby1jLndhdlwiLFxuXHRcdFx0XCJkZWZhdWx0Vm9sdW1lXCI6IDAuMjUsXG5cdFx0XHRcImljb25cIjogXCJwaWFuby5zdmdcIlxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0YXN5bmMgaW5pdCgpIHtcblx0XHRsZXQgc3RhdGU9dGhpcy5pbml0U3RhdGUoKTtcblx0XHRsZXQgc29uZ0RhdGFKc29uPXdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImhvb2Rtb2RlLXNvbmdzXCIpO1xuXHRcdGlmIChzb25nRGF0YUpzb24pXG5cdFx0XHRzdGF0ZS5zb25ncz1KU09OLnBhcnNlKHNvbmdEYXRhSnNvbik7XG5cblx0XHR0aGlzLmNvbmR1Y3Rvci5zZXRTdGF0ZShzdGF0ZSk7XG5cdFx0YXdhaXQgdGhpcy5jb25kdWN0b3IubG9hZEluc3RydW1lbnRzKCk7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH07XG5cblx0YWRkU29uZyhzdGF0ZSwgbmFtZSkge1xuXHRcdGlmICghbmFtZSB8fCBuYW1lLnRvU3RyaW5nKCk9PVwiW29iamVjdCBNb3VzZUV2ZW50XVwiKVxuXHRcdFx0bmFtZT1cIk15IE5ldyBTb25nXCI7XG5cblx0XHRsZXQgaW5kZXg9c3RhdGUuc29uZ3MubGVuZ3RoO1xuXG5cdFx0c3RhdGUuc29uZ3MucHVzaCh7XG5cdFx0XHRuYW1lOiBuYW1lLFxuXHRcdFx0YnBtOiAxMDAsXG5cdFx0XHRrZXk6IHNob3J0aWQuZ2VuZXJhdGUoKSxcblx0XHRcdG11c2ljS2V5OiBcIkFcIixcblx0XHRcdG1pbm9yOiB0cnVlLFxuXHRcdFx0bGF5ZXJzOiBbXSxcblx0XHRcdGNob3JkU2VxdWVuY2U6IFtdLFxuXHRcdFx0c2VjdGlvbnM6IFtcblx0XHRcdFx0WzBdLFxuXHRcdFx0XHRbMF0sXG5cdFx0XHRcdFswXVxuXHRcdFx0XVxuXHRcdH0pO1xuXG5cdFx0c3RhdGU9dGhpcy5zZXRTb25nSW5kZXgoc3RhdGUsaW5kZXgpO1xuXHRcdHN0YXRlPXRoaXMuYWRkU2VxdWVuY2VDaG9yZChzdGF0ZSk7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRzZXRDdXJyZW50Q2hvcmRJbmRleChzdGF0ZSwgaW5kZXgpIHtcblx0XHRzdGF0ZS5jdXJyZW50Q2hvcmRJbmRleD1pbmRleDtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHNldEN1cnJlbnRTZWN0aW9uSW5kZXgoc3RhdGUsIGluZGV4KSB7XG5cdFx0c3RhdGUuY3VycmVudFNlY3Rpb25JbmRleD1pbmRleDtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdGNsb3NlU29uZyhzdGF0ZSkge1xuXHRcdHN0YXRlLmN1cnJlbnRTb25nSW5kZXg9LTE7XG5cdFx0c3RhdGUuY3VycmVudFNlY3Rpb25JbmRleD0tMTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHNldFNvbmdJbmRleChzdGF0ZSwgaW5kZXgpIHtcblx0XHRpZiAoaW5kZXg9PXN0YXRlLmN1cnJlbnRTb25nSW5kZXgpXG5cdFx0XHRyZXR1cm4gc3RhdGU7XG5cblx0XHRzdGF0ZS5jdXJyZW50U29uZ0luZGV4PWluZGV4O1xuXHRcdHN0YXRlLmN1cnJlbnRMYXllckluZGV4PS0xO1xuXHRcdHN0YXRlLmN1cnJlbnRDaG9yZEluZGV4PTA7XG5cdFx0c3RhdGUuY3VycmVudEdyaWRJbmRleD0tMTtcblx0XHRzdGF0ZS5jdXJyZW50U2VjdGlvbkluZGV4PS0xO1xuXHRcdHN0YXRlLnBsYXlpbmc9ZmFsc2U7XG5cdFx0c3RhdGUucmVjb3JkaW5nPWZhbHNlO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0c2hvd1NldHRpbmdzKHN0YXRlKSB7XG5cdFx0c3RhdGUuc2V0dGluZ3NWaXNpYmxlPXRydWU7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRoaWRlU2V0dGluZ3Moc3RhdGUpIHtcblx0XHRzdGF0ZS5zZXR0aW5nc1Zpc2libGU9ZmFsc2U7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHR0b2dnbGVTZXR0aW5ncyhzdGF0ZSkge1xuXHRcdHN0YXRlLnNldHRpbmdzVmlzaWJsZT0hc3RhdGUuc2V0dGluZ3NWaXNpYmxlO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0c2V0Q3VycmVudFNvbmdOYW1lKHN0YXRlLCBuYW1lKSB7XG5cdFx0c3RhdGUuc29uZ3Nbc3RhdGUuY3VycmVudFNvbmdJbmRleF0ubmFtZT1uYW1lO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0c2V0Q3VycmVudFNvbmdCcG0oc3RhdGUsIGJwbSkge1xuXHRcdGJwbT1wYXJzZUludChicG0pO1xuXHRcdGlmIChpc05hTihicG0pKVxuXHRcdFx0YnBtPTEwMDtcblxuXHRcdGlmIChicG08NTApXG5cdFx0XHRicG09NTA7XG5cblx0XHRpZiAoYnBtPjEwMClcblx0XHRcdGJwbT0xMDA7XG5cblx0XHRzdGF0ZS5zb25nc1tzdGF0ZS5jdXJyZW50U29uZ0luZGV4XS5icG09YnBtO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0c2V0Q3VycmVudFNvbmdNdXNpY0tleShzdGF0ZSwgbXVzaWNLZXkpIHtcblx0XHRzdGF0ZS5zb25nc1tzdGF0ZS5jdXJyZW50U29uZ0luZGV4XS5tdXNpY0tleT1tdXNpY0tleTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHNldEN1cnJlbnRTb25nTWlub3Ioc3RhdGUsIG1pbm9yKSB7XG5cdFx0Y29uc29sZS5sb2coXCJzZXR0aW5nIG1pbm9yOiBcIittaW5vcik7XG5cblx0XHRzdGF0ZS5zb25nc1tzdGF0ZS5jdXJyZW50U29uZ0luZGV4XS5taW5vcj1taW5vcjtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdGRlbGV0ZUN1cnJlbnRTb25nKHN0YXRlKSB7XG5cdFx0c3RhdGUuc29uZ3Muc3BsaWNlKHN0YXRlLmN1cnJlbnRTb25nSW5kZXgsMSk7XG5cdFx0c3RhdGUuY3VycmVudFNvbmdJbmRleD0tMTtcblx0XHRzdGF0ZS5zZXR0aW5nc1Zpc2libGU9ZmFsc2U7XG5cdFx0c3RhdGUuY3VycmVudFNlY3Rpb25JbmRleD0tMTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHNob3dBZGRMYXllcihzdGF0ZSkge1xuXHRcdHN0YXRlLmFkZExheWVyVmlzaWJsZT10cnVlO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0aGlkZUFkZExheWVyKHN0YXRlKSB7XG5cdFx0c3RhdGUuYWRkTGF5ZXJWaXNpYmxlPWZhbHNlO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0YWRkU2VxdWVuY2VDaG9yZChzdGF0ZSkge1xuXHRcdGxldCBzb25nPXRoaXMuaGVscGVyLmdldEN1cnJlbnRTb25nKHN0YXRlKTtcblxuXHRcdHNvbmcuY2hvcmRTZXF1ZW5jZS5wdXNoKHtcblx0XHRcdGNob3JkSW5kZXg6IDAsXG5cdFx0XHRrZXk6IHNob3J0aWQuZ2VuZXJhdGUoKVxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0YWRkTGF5ZXIoc3RhdGUsIGluc3RydW1lbnROYW1lKSB7XG5cdFx0bGV0IHNvbmc9c3RhdGUuc29uZ3Nbc3RhdGUuY3VycmVudFNvbmdJbmRleF07XG5cblx0XHRsZXQgc2VxPVtdO1xuXHRcdGxldCBudW1Tb3VuZHM9dGhpcy5oZWxwZXIuZ2V0SW5zdHJ1bWVudE51bVNvdW5kc0J5TmFtZShzdGF0ZSxpbnN0cnVtZW50TmFtZSk7XG5cdFx0bGV0IGluc3RydW1lbnQ9dGhpcy5oZWxwZXIuZ2V0SW5zdHJ1bWVudEJ5TmFtZShzdGF0ZSxpbnN0cnVtZW50TmFtZSk7XG5cblx0XHRsZXQgdm9sdW1lPTE7XG5cdFx0aWYgKGluc3RydW1lbnQuaGFzT3duUHJvcGVydHkoXCJkZWZhdWx0Vm9sdW1lXCIpKVxuXHRcdFx0dm9sdW1lPWluc3RydW1lbnQuZGVmYXVsdFZvbHVtZTtcblxuXHRcdGZvciAobGV0IGk9MDsgaTxudW1Tb3VuZHM7IGkrKylcblx0XHRcdHNlcS5wdXNoKEFycmF5KDE2KS5maWxsKGZhbHNlKSk7XG5cblx0XHRsZXQgbGF5ZXI9e1xuXHRcdFx0a2V5OiBzaG9ydGlkLmdlbmVyYXRlKCksXG5cdFx0XHRpbnN0cnVtZW50TmFtZTogaW5zdHJ1bWVudE5hbWUsXG5cdFx0XHRhdWRpYmxlOiB0cnVlLFxuXHRcdFx0dm9sdW1lOiB2b2x1bWUsXG5cdFx0XHRzZXE6IHNlcSxcblx0XHRcdHZlbDogQXJyYXkoMTYpLmZpbGwoMSksXG5cdFx0XHRzdGFjYzogQXJyYXkoMTYpLmZpbGwoZmFsc2UpXG5cdFx0fTtcblxuXHRcdHNvbmcubGF5ZXJzLnB1c2gobGF5ZXIpO1xuXG5cdFx0c3RhdGUuYWRkTGF5ZXJWaXNpYmxlPWZhbHNlO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0c2V0TGF5ZXJJbmRleChzdGF0ZSwgaW5kZXgpIHtcblx0XHRzdGF0ZS5jdXJyZW50TGF5ZXJJbmRleD1pbmRleDtcblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRoaWRlQ3VycmVudExheWVyKHN0YXRlKSB7XG5cdFx0c3RhdGUuY3VycmVudExheWVySW5kZXg9LTE7XG5cdFx0c3RhdGUuY3VycmVudEdyaWRJbmRleD0tMTtcblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHR0b2dnbGVMYXllckF1ZGlibGUoc3RhdGUsIGxheWVySW5kZXgpIHtcblx0XHRsZXQgc29uZz10aGlzLmhlbHBlci5nZXRDdXJyZW50U29uZyhzdGF0ZSk7XG5cdFx0c29uZy5sYXllcnNbbGF5ZXJJbmRleF0uYXVkaWJsZT0hc29uZy5sYXllcnNbbGF5ZXJJbmRleF0uYXVkaWJsZTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdGRlbGV0ZUN1cnJlbnRMYXllcihzdGF0ZSkge1xuXHRcdGxldCBzb25nPXRoaXMuaGVscGVyLmdldEN1cnJlbnRTb25nKHN0YXRlKTtcblx0XHRzb25nLmxheWVycy5zcGxpY2Uoc3RhdGUuY3VycmVudExheWVySW5kZXgsMSk7XG5cdFx0c3RhdGUuY3VycmVudExheWVySW5kZXg9LTE7XG5cdFx0c3RhdGUuY3VycmVudEdyaWRJbmRleD0tMTtcblx0XHRzdGF0ZS5zZXR0aW5nc1Zpc2libGU9ZmFsc2U7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRzZXRDdXJyZW50TGF5ZXJWb2x1bWUoc3RhdGUsIHZvbHVtZSkge1xuXHRcdGxldCBsYXllcj10aGlzLmhlbHBlci5nZXRDdXJyZW50TGF5ZXIoc3RhdGUpO1xuXHRcdGxheWVyLnZvbHVtZT1wYXJzZUZsb2F0KHZvbHVtZSk7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRwbGF5Q2xpY2soc3RhdGUpIHtcblx0XHRzdGF0ZS5wbGF5aW5nPSFzdGF0ZS5wbGF5aW5nO1xuXHRcdHN0YXRlLmN1cnJlbnRHcmlkSW5kZXg9LTE7XG5cblx0XHRpZiAoIXN0YXRlLnBsYXlpbmcpXG5cdFx0XHRzdGF0ZS5yZWNvcmRpbmc9ZmFsc2U7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRyZWNvcmRDbGljayhzdGF0ZSkge1xuXHRcdHN0YXRlLnJlY29yZGluZz0hc3RhdGUucmVjb3JkaW5nO1xuXHRcdHN0YXRlLmN1cnJlbnRHcmlkSW5kZXg9LTE7XG5cblx0XHRpZiAoc3RhdGUucmVjb3JkaW5nICYmICFzdGF0ZS5wbGF5aW5nKVxuXHRcdFx0c3RhdGUucGxheWluZz10cnVlO1xuXG5cdFx0aWYgKCFzdGF0ZS5wbGF5aW5nKVxuXHRcdFx0c3RhdGUuY3VycmVudEdyaWRJbmRleD0tMTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdGRlbGV0ZVNlcXVlbmNlQ2hvcmQoc3RhdGUsIGluZGV4KSB7XG5cdFx0bGV0IHNvbmc9dGhpcy5oZWxwZXIuZ2V0Q3VycmVudFNvbmcoc3RhdGUpO1xuXHRcdHNvbmcuY2hvcmRTZXF1ZW5jZS5zcGxpY2UoaW5kZXgsMSk7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRzZXRTZXF1ZW5jZUNob3JkKHN0YXRlLCBzZXF1ZW5jZUluZGV4LCBjaG9yZEluZGV4KSB7XG5cdFx0bGV0IHNvbmc9dGhpcy5oZWxwZXIuZ2V0Q3VycmVudFNvbmcoc3RhdGUpO1xuXHRcdHNvbmcuY2hvcmRTZXF1ZW5jZVtzZXF1ZW5jZUluZGV4XS5jaG9yZEluZGV4PWNob3JkSW5kZXg7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRnb0JhY2soc3RhdGUpIHtcblx0XHRpZiAoc3RhdGUuc2V0dGluZ3NWaXNpYmxlKVxuXHRcdFx0cmV0dXJuIHRoaXMuaGlkZVNldHRpbmdzKHN0YXRlKTtcblxuXHRcdGVsc2UgaWYgKHN0YXRlLmN1cnJlbnRMYXllckluZGV4Pj0wKSB7XG5cdFx0XHRzdGF0ZS5jdXJyZW50TGF5ZXJJbmRleD0tMTtcblx0XHRcdHN0YXRlLmN1cnJlbnRHcmlkSW5kZXg9LTE7XG5cdFx0XHRyZXR1cm4gc3RhdGU7XG5cdFx0fVxuXG5cdFx0ZWxzZSBpZiAoc3RhdGUuYWRkTGF5ZXJWaXNpYmxlKVxuXHRcdFx0cmV0dXJuIHRoaXMuaGlkZUFkZExheWVyKHN0YXRlKTtcblxuXHRcdGVsc2UgaWYgKHRoaXMuaGVscGVyLmlzU29uZ09wZW4oc3RhdGUpKVxuXHRcdFx0cmV0dXJuIHRoaXMuY2xvc2VTb25nKHN0YXRlKVxuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0Z3JpZEluZGV4Q2xpY2soc3RhdGUsIG5ld0dyaWRJbmRleCkge1xuXHRcdHN0YXRlLnBsYXlpbmc9ZmFsc2U7XG5cdFx0c3RhdGUucmVjb3JkaW5nPWZhbHNlO1xuXG5cdFx0aWYgKHN0YXRlLmN1cnJlbnRHcmlkSW5kZXg9PW5ld0dyaWRJbmRleClcblx0XHRcdHN0YXRlLmN1cnJlbnRHcmlkSW5kZXg9LTE7XG5cblx0XHRlbHNlXG5cdFx0XHRzdGF0ZS5jdXJyZW50R3JpZEluZGV4PW5ld0dyaWRJbmRleDtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHRvZ2dsZUN1cnJlbnRMYXllclN0YWNjKHN0YXRlKSB7XG5cdFx0bGV0IGxheWVyPXRoaXMuaGVscGVyLmdldEN1cnJlbnRMYXllcihzdGF0ZSk7XG5cdFx0bGV0IGdyaWRJbmRleD1zdGF0ZS5jdXJyZW50R3JpZEluZGV4O1xuXG5cdFx0aWYgKHN0YXRlLnJlY29yZGluZylcblx0XHRcdGdyaWRJbmRleD10aGlzLmNvbmR1Y3Rvci5nZXRQbGF5R3JpZEluZGV4KCk7XG5cblx0XHRpZiAoZ3JpZEluZGV4PDApXG5cdFx0XHRyZXR1cm4gc3RhdGU7XG5cblx0XHRsYXllci5zdGFjY1tncmlkSW5kZXhdPSFsYXllci5zdGFjY1tncmlkSW5kZXhdO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0c2V0Q3VycmVudExheWVyVmVsKHN0YXRlLCB2ZWwpIHtcblx0XHRsZXQgbGF5ZXI9dGhpcy5oZWxwZXIuZ2V0Q3VycmVudExheWVyKHN0YXRlKTtcblx0XHRsZXQgZ3JpZEluZGV4PXN0YXRlLmN1cnJlbnRHcmlkSW5kZXg7XG5cblx0XHRpZiAoc3RhdGUucmVjb3JkaW5nKVxuXHRcdFx0Z3JpZEluZGV4PXRoaXMuY29uZHVjdG9yLmdldFBsYXlHcmlkSW5kZXgoKTtcblxuXHRcdGlmIChncmlkSW5kZXg8MClcblx0XHRcdHJldHVybiBzdGF0ZTtcblxuXHRcdGxheWVyLnZlbFtncmlkSW5kZXhdPXZlbDtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHNvdW5kQnV0dG9uQ2xpY2soc3RhdGUsIHNvdW5kSW5kZXgpIHtcblx0XHRsZXQgaW5zdHJ1bWVudD10aGlzLmhlbHBlci5nZXRDdXJyZW50SW5zdHJ1bWVudChzdGF0ZSk7XG5cblx0XHRpZiAoc3RhdGUucmVjb3JkaW5nKSB7XG5cdFx0XHR0aGlzLmNvbmR1Y3Rvci5wbGF5SW5zdHJ1bWVudChpbnN0cnVtZW50Lm5hbWUsc291bmRJbmRleCk7XG5cblx0XHRcdGxldCBncmlkSW5kZXg9dGhpcy5jb25kdWN0b3IuZ2V0UGxheUdyaWRJbmRleCgpO1xuXHRcdFx0bGV0IGxheWVyPXRoaXMuaGVscGVyLmdldEN1cnJlbnRMYXllcihzdGF0ZSk7XG5cblx0XHRcdGxheWVyLnNlcVtzb3VuZEluZGV4XVtncmlkSW5kZXhdPXRydWU7XG5cblx0XHRcdHJldHVybiBzdGF0ZTtcblx0XHR9XG5cblx0XHRpZiAoc3RhdGUuY3VycmVudEdyaWRJbmRleDwwKSB7XG5cdFx0XHR0aGlzLmNvbmR1Y3Rvci5wbGF5SW5zdHJ1bWVudChpbnN0cnVtZW50Lm5hbWUsc291bmRJbmRleCk7XG5cdFx0XHRyZXR1cm4gc3RhdGU7XG5cdFx0fVxuXG5cdFx0bGV0IGxheWVyPXRoaXMuaGVscGVyLmdldEN1cnJlbnRMYXllcihzdGF0ZSk7XG5cdFx0bGF5ZXIuc2VxW3NvdW5kSW5kZXhdW3N0YXRlLmN1cnJlbnRHcmlkSW5kZXhdPVxuXHRcdFx0IWxheWVyLnNlcVtzb3VuZEluZGV4XVtzdGF0ZS5jdXJyZW50R3JpZEluZGV4XTtcblxuXHRcdGlmIChsYXllci5zZXFbc291bmRJbmRleF1bc3RhdGUuY3VycmVudEdyaWRJbmRleF0pXG5cdFx0XHR0aGlzLmNvbmR1Y3Rvci5wbGF5SW5zdHJ1bWVudChpbnN0cnVtZW50Lm5hbWUsc291bmRJbmRleCk7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRjaG9yZEJ1dHRvbkNsaWNrKHN0YXRlLCBvY3RhdmUpIHtcblx0XHRsZXQgaW5zdHJ1bWVudD10aGlzLmhlbHBlci5nZXRDdXJyZW50SW5zdHJ1bWVudChzdGF0ZSk7XG5cblx0XHRpZiAoc3RhdGUucmVjb3JkaW5nKSB7XG5cdFx0XHR0aGlzLmNvbmR1Y3Rvci5wbGF5SW5zdHJ1bWVudChpbnN0cnVtZW50Lm5hbWUsb2N0YXZlKjMpO1xuXHRcdFx0dGhpcy5jb25kdWN0b3IucGxheUluc3RydW1lbnQoaW5zdHJ1bWVudC5uYW1lLG9jdGF2ZSozKzEpO1xuXHRcdFx0dGhpcy5jb25kdWN0b3IucGxheUluc3RydW1lbnQoaW5zdHJ1bWVudC5uYW1lLG9jdGF2ZSozKzIpO1xuXG5cdFx0XHRsZXQgZ3JpZEluZGV4PXRoaXMuY29uZHVjdG9yLmdldFBsYXlHcmlkSW5kZXgoKTtcblx0XHRcdGxldCBsYXllcj10aGlzLmhlbHBlci5nZXRDdXJyZW50TGF5ZXIoc3RhdGUpO1xuXG5cdFx0XHRsYXllci5zZXFbb2N0YXZlKjNdW2dyaWRJbmRleF09dHJ1ZTtcblx0XHRcdGxheWVyLnNlcVtvY3RhdmUqMysxXVtncmlkSW5kZXhdPXRydWU7XG5cdFx0XHRsYXllci5zZXFbb2N0YXZlKjMrMl1bZ3JpZEluZGV4XT10cnVlO1xuXHRcdFx0cmV0dXJuIHN0YXRlO1xuXHRcdH1cblxuXHRcdGlmIChzdGF0ZS5jdXJyZW50R3JpZEluZGV4PDApIHtcblx0XHRcdHRoaXMuY29uZHVjdG9yLnBsYXlJbnN0cnVtZW50KGluc3RydW1lbnQubmFtZSxvY3RhdmUqMyk7XG5cdFx0XHR0aGlzLmNvbmR1Y3Rvci5wbGF5SW5zdHJ1bWVudChpbnN0cnVtZW50Lm5hbWUsb2N0YXZlKjMrMSk7XG5cdFx0XHR0aGlzLmNvbmR1Y3Rvci5wbGF5SW5zdHJ1bWVudChpbnN0cnVtZW50Lm5hbWUsb2N0YXZlKjMrMik7XG5cdFx0XHRyZXR1cm4gc3RhdGU7XG5cdFx0fVxuXG5cdFx0bGV0IGxheWVyPXRoaXMuaGVscGVyLmdldEN1cnJlbnRMYXllcihzdGF0ZSk7XG5cdFx0aWYgKHRoaXMuaGVscGVyLmN1cnJlbnRMYXllckhhc0Nob3JkQXQoc3RhdGUsc3RhdGUuY3VycmVudEdyaWRJbmRleCxvY3RhdmUpKSB7XG5cdFx0XHRsYXllci5zZXFbb2N0YXZlKjNdW3N0YXRlLmN1cnJlbnRHcmlkSW5kZXhdPWZhbHNlO1xuXHRcdFx0bGF5ZXIuc2VxW29jdGF2ZSozKzFdW3N0YXRlLmN1cnJlbnRHcmlkSW5kZXhdPWZhbHNlO1xuXHRcdFx0bGF5ZXIuc2VxW29jdGF2ZSozKzJdW3N0YXRlLmN1cnJlbnRHcmlkSW5kZXhdPWZhbHNlO1xuXHRcdH1cblxuXHRcdGVsc2Uge1xuXHRcdFx0bGF5ZXIuc2VxW29jdGF2ZSozXVtzdGF0ZS5jdXJyZW50R3JpZEluZGV4XT10cnVlO1xuXHRcdFx0bGF5ZXIuc2VxW29jdGF2ZSozKzFdW3N0YXRlLmN1cnJlbnRHcmlkSW5kZXhdPXRydWU7XG5cdFx0XHRsYXllci5zZXFbb2N0YXZlKjMrMl1bc3RhdGUuY3VycmVudEdyaWRJbmRleF09dHJ1ZTtcblx0XHRcdHRoaXMuY29uZHVjdG9yLnBsYXlJbnN0cnVtZW50KGluc3RydW1lbnQubmFtZSxvY3RhdmUqMyk7XG5cdFx0XHR0aGlzLmNvbmR1Y3Rvci5wbGF5SW5zdHJ1bWVudChpbnN0cnVtZW50Lm5hbWUsb2N0YXZlKjMrMSk7XG5cdFx0XHR0aGlzLmNvbmR1Y3Rvci5wbGF5SW5zdHJ1bWVudChpbnN0cnVtZW50Lm5hbWUsb2N0YXZlKjMrMik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0YWRkU2VjdGlvbkNob3JkKHN0YXRlKSB7XG5cdFx0bGV0IHNvbmc9dGhpcy5oZWxwZXIuZ2V0Q3VycmVudFNvbmcoc3RhdGUpO1xuXHRcdHNvbmcuc2VjdGlvbnNbc3RhdGUuY3VycmVudFNlY3Rpb25JbmRleF0ucHVzaCgwKTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHNob3dFZGl0U2VjdGlvbkNob3JkKHN0YXRlLGluZGV4KSB7XG5cdFx0c3RhdGUuZWRpdFNlY3Rpb25DaG9yZFZpc2libGU9aW5kZXg7XG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0aGlkZUVkaXRTZWN0aW9uQ2hvcmQoc3RhdGUsaW5kZXgpIHtcblx0XHRzdGF0ZS5lZGl0U2VjdGlvbkNob3JkVmlzaWJsZT0tMTtcblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRyZW1vdmVTZWN0aW9uQ2hvcmQoc3RhdGUpIHtcblx0XHRsZXQgc29uZz10aGlzLmhlbHBlci5nZXRDdXJyZW50U29uZyhzdGF0ZSk7XG5cdFx0c29uZy5zZWN0aW9uc1tzdGF0ZS5jdXJyZW50U2VjdGlvbkluZGV4XS5zcGxpY2Uoc3RhdGUuZWRpdFNlY3Rpb25DaG9yZFZpc2libGUsMSk7XG5cblx0XHRzdGF0ZS5lZGl0U2VjdGlvbkNob3JkVmlzaWJsZT0tMTtcblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRlZGl0U2VjdGlvbkNob3JkKHN0YXRlLCBpbmRleCkge1xuXHRcdGxldCBzb25nPXRoaXMuaGVscGVyLmdldEN1cnJlbnRTb25nKHN0YXRlKTtcblx0XHRzb25nLnNlY3Rpb25zW3N0YXRlLmN1cnJlbnRTZWN0aW9uSW5kZXhdW3N0YXRlLmVkaXRTZWN0aW9uQ2hvcmRWaXNpYmxlXT1pbmRleDtcblx0XHRzdGF0ZS5lZGl0U2VjdGlvbkNob3JkVmlzaWJsZT0tMTtcblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cbn1cbiIsImltcG9ydCBNdXNpY1V0aWwgZnJvbSAnLi4vdXRpbHMvTXVzaWNVdGlsLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwSGVscGVyIHtcblx0Y29uc3RydWN0b3IoY29uZHVjdG9yKSB7XG5cdFx0dGhpcy5jb25kdWN0b3I9Y29uZHVjdG9yO1xuXHR9XG5cblx0Z2V0Q3VycmVudFNvbmcoc3RhdGUpIHtcblx0XHRyZXR1cm4gc3RhdGUuc29uZ3Nbc3RhdGUuY3VycmVudFNvbmdJbmRleF07XG5cdH1cblxuXHRnZXRDdXJyZW50TGF5ZXIoc3RhdGUpIHtcblx0XHRyZXR1cm4gc3RhdGUuc29uZ3Nbc3RhdGUuY3VycmVudFNvbmdJbmRleF0ubGF5ZXJzW3N0YXRlLmN1cnJlbnRMYXllckluZGV4XTtcblx0fVxuXG5cdGdldEluc3RydW1lbnRCeU5hbWUoc3RhdGUsIG5hbWUpIHtcblx0XHRmb3IgKGxldCBpbnN0cnVtZW50IG9mIHN0YXRlLmluc3RydW1lbnRzKVxuXHRcdFx0aWYgKGluc3RydW1lbnQubmFtZT09bmFtZSlcblx0XHRcdFx0cmV0dXJuIGluc3RydW1lbnQ7XG5cdH1cblxuXHRnZXRJbnN0cnVtZW50TnVtU291bmRzQnlOYW1lKHN0YXRlLCBuYW1lKSB7XG5cdFx0bGV0IGluc3RydW1lbnQ9dGhpcy5nZXRJbnN0cnVtZW50QnlOYW1lKHN0YXRlLG5hbWUpO1xuXG5cdFx0c3dpdGNoIChpbnN0cnVtZW50LnR5cGUpIHtcblx0XHRcdGNhc2UgXCJoYXJtb25pY1wiOlxuXHRcdFx0XHRyZXR1cm4gOTtcblxuXHRcdFx0Y2FzZSBcInBlcmN1c3NpdmVcIjpcblx0XHRcdFx0cmV0dXJuIGluc3RydW1lbnQubGFiZWxzLmxlbmd0aDtcblx0XHR9XG5cdH1cblxuXHRnZXRDdXJyZW50SW5zdHJ1bWVudChzdGF0ZSkge1xuXHRcdGxldCBsYXllcj10aGlzLmdldEN1cnJlbnRMYXllcihzdGF0ZSk7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0SW5zdHJ1bWVudEJ5TmFtZShzdGF0ZSxsYXllci5pbnN0cnVtZW50TmFtZSk7XG5cdH1cblxuXHRnZXRDdXJyZW50SW5zdHJ1bWVudFNvdW5kTGFiZWxzKHN0YXRlKSB7XG5cdFx0bGV0IGluc3RydW1lbnQ9dGhpcy5nZXRDdXJyZW50SW5zdHJ1bWVudChzdGF0ZSk7XG5cblx0XHRzd2l0Y2ggKGluc3RydW1lbnQudHlwZSkge1xuXHRcdFx0Y2FzZSBcImhhcm1vbmljXCI6XG5cdFx0XHRcdHJldHVybiBbXCJUMVwiLFwiVDJcIixcIlQzXCIsXCJPLVQxXCIsXCJPLVQyXCIsXCJPLVQzXCJdO1xuXG5cdFx0XHRjYXNlIFwicGVyY3Vzc2l2ZVwiOlxuXHRcdFx0XHRyZXR1cm4gaW5zdHJ1bWVudC5sYWJlbHM7XG5cdFx0fVxuXHR9XG5cblx0Z2V0Q2hvcmRMYWJlbHMoc3RhdGUpIHtcblx0XHRsZXQgc29uZz10aGlzLmdldEN1cnJlbnRTb25nKHN0YXRlKTtcblx0XHRyZXR1cm4gTXVzaWNVdGlsLmdldENob3JkTmFtZXNGb3JTY2FsZShzb25nLm11c2ljS2V5LHNvbmcubWlub3IpO1xuXHR9XG5cblx0Z2V0Q3VycmVudFNlY3Rpb25DaG9yZExhYmVscyhzdGF0ZSkge1xuXHRcdGxldCBzb25nPXRoaXMuZ2V0Q3VycmVudFNvbmcoc3RhdGUpO1xuXHRcdGxldCBjaG9yZE5hbWVzPU11c2ljVXRpbC5nZXRDaG9yZE5hbWVzRm9yU2NhbGUoc29uZy5tdXNpY0tleSxzb25nLm1pbm9yKTtcblx0XHRsZXQgc2VjdGlvbj1zb25nLnNlY3Rpb25zW3N0YXRlLmN1cnJlbnRTZWN0aW9uSW5kZXhdO1xuXHRcdGxldCBhPVtdO1xuXG5cdFx0Zm9yIChsZXQgaSBvZiBzZWN0aW9uKVxuXHRcdFx0YS5wdXNoKGNob3JkTmFtZXNbaV0pO1xuXG5cdFx0cmV0dXJuIGE7XG5cdH1cblxuXHRnZXROb3Rlc1NlbGVjdE9wdGlvbnMoc3RhdGUpIHtcblx0XHRsZXQgYT1bXTtcblxuXHRcdGZvciAobGV0IG5vdGVOYW1lIG9mIE11c2ljVXRpbC5OT1RFX05BTUVTKVxuXHRcdFx0YS5wdXNoKHtcblx0XHRcdFx0a2V5OiBub3RlTmFtZSwgbGFiZWw6IG5vdGVOYW1lXG5cdFx0XHR9KTtcblxuXHRcdHJldHVybiBhO1xuXHR9XG5cblx0Z2V0Q2hvcmRPcHRpb25zKHN0YXRlKSB7XG5cdFx0bGV0IHNvbmc9dGhpcy5nZXRDdXJyZW50U29uZyhzdGF0ZSk7XG5cdFx0bGV0IGNob3JkTmFtZXM9TXVzaWNVdGlsLmdldENob3JkTmFtZXNGb3JTY2FsZShzb25nLm11c2ljS2V5LHNvbmcubWlub3IpO1xuXHRcdGxldCBhPVtdO1xuXG5cdFx0Zm9yIChsZXQgY2hvcmROYW1lIG9mIGNob3JkTmFtZXMpXG5cdFx0XHRhLnB1c2goe1xuXHRcdFx0XHRrZXk6IGNob3JkTmFtZSxcblx0XHRcdFx0bGFiZWw6IGNob3JkTmFtZVxuXHRcdFx0fSk7XG5cblx0XHRyZXR1cm4gYTtcblx0fVxuXG5cdGdldE1vZGFsU2VsZWN0T3B0aW9ucyhzdGF0ZSkge1xuXHRcdHJldHVybiBbXG5cdFx0XHR7a2V5OiBmYWxzZSwgbGFiZWw6IFwibWFqb3JcIn0sXG5cdFx0XHR7a2V5OiB0cnVlLCBsYWJlbDogXCJtaW5vclwifSxcblx0XHRdO1xuXHR9XG5cblx0Y3VycmVudExheWVySGFzU291bmRBdChzdGF0ZSwgZ3JpZEluZGV4KSB7XG5cdFx0bGV0IGxheWVyPXRoaXMuZ2V0Q3VycmVudExheWVyKHN0YXRlKTtcblxuXHRcdGZvciAobGV0IHNvdW5kSW5kZXg9MDsgc291bmRJbmRleDxsYXllci5zZXEubGVuZ3RoOyBzb3VuZEluZGV4KyspXG5cdFx0XHRpZiAobGF5ZXIuc2VxW3NvdW5kSW5kZXhdW2dyaWRJbmRleF0pXG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Y3VycmVudExheWVySGFzQ2hvcmRBdChzdGF0ZSwgZ3JpZEluZGV4LCBvY3RhdmUpIHtcblx0XHRsZXQgbGF5ZXI9dGhpcy5nZXRDdXJyZW50TGF5ZXIoc3RhdGUpO1xuXG5cdFx0Zm9yIChsZXQgaT0wOyBpPDM7IGkrKylcblx0XHRcdGlmICghbGF5ZXIuc2VxW29jdGF2ZSozK2ldW2dyaWRJbmRleF0pXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0aXNTb25nT3BlbihzdGF0ZSkge1xuXHRcdHJldHVybiAoc3RhdGUuY3VycmVudFNvbmdJbmRleD49MCk7XG5cdH1cbn1cbiIsImltcG9ydCBBdWRpb1V0aWwgZnJvbSAnLi4vdXRpbHMvQXVkaW9VdGlsJztcbmltcG9ydCBSZWNvbmNpbGVBcnJheSBmcm9tICcuLi91dGlscy9SZWNvbmNpbGVBcnJheSc7XG5pbXBvcnQgQ29uZHVjdG9yTGF5ZXIgZnJvbSAnLi9Db25kdWN0b3JMYXllcic7XG5pbXBvcnQgQ29uZHVjdG9ySW5zdHJ1bWVudCBmcm9tICcuL0NvbmR1Y3Rvckluc3RydW1lbnQnO1xuaW1wb3J0IE11c2ljVXRpbCBmcm9tICcuLi91dGlscy9NdXNpY1V0aWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25kdWN0b3Ige1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLmF1ZGlvQ29udGV4dD1uZXcgd2luZG93LkF1ZGlvQ29udGV4dCgpO1xuXHRcdGlmICghdGhpcy5hdWRpb0NvbnRleHQpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJubyB3ZWIgYXVkaW8hXCIpO1xuXG5cdFx0dGhpcy5pbnN0cnVtZW50cz1SZWNvbmNpbGVBcnJheS5jcmVhdGVXaXRoRmFjdG9yeSh0aGlzLmNyZWF0ZUluc3RydW1lbnQpO1xuXHRcdHRoaXMubGF5ZXJzPVJlY29uY2lsZUFycmF5LmNyZWF0ZVdpdGhGYWN0b3J5KHRoaXMuY3JlYXRlTGF5ZXIpO1xuXHRcdHRoaXMuY3VycmVudE5vdGVzPVtdO1xuXHRcdHRoaXMuc2VxdWVuY2VJbmRleD0tMTtcblx0XHR0aGlzLnBsYXlHcmlkSW5kZXg9LTE7XG5cdH1cblxuXHRsb2FkSW5zdHJ1bWVudHMoKSB7XG5cdFx0bGV0IHByb21pc2VzPVtdO1xuXHRcdGZvciAobGV0IGluc3RydW1lbnQgb2YgdGhpcy5pbnN0cnVtZW50cy5nZXRJdGVtcygpKVxuXHRcdFx0cHJvbWlzZXMucHVzaChpbnN0cnVtZW50LmxvYWQoKSk7XG5cblx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuXHR9XG5cblx0Y3JlYXRlTGF5ZXI9KGRhdGEpPT57XG5cdFx0cmV0dXJuIG5ldyBDb25kdWN0b3JMYXllcih0aGlzLGRhdGEpO1xuXHR9O1xuXG5cdGNyZWF0ZUluc3RydW1lbnQ9KGRhdGEpPT57XG5cdFx0cmV0dXJuIG5ldyBDb25kdWN0b3JJbnN0cnVtZW50KHRoaXMsZGF0YSk7XG5cdH07XG5cblx0Z2V0Q29uZHVjdG9ySW5zdHJ1bWVudEJ5TmFtZShuYW1lKSB7XG5cdFx0Zm9yIChsZXQgaW5zdHJ1bWVudCBvZiB0aGlzLmluc3RydW1lbnRzLmdldEl0ZW1zKCkpIHtcblx0XHRcdGlmIChpbnN0cnVtZW50LmdldE5hbWUoKT09bmFtZSlcblx0XHRcdFx0cmV0dXJuIGluc3RydW1lbnQ7XG5cdFx0fVxuXHR9XG5cblx0Z2V0Q3VycmVudFNvbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUuc29uZ3NbdGhpcy5zdGF0ZS5jdXJyZW50U29uZ0luZGV4XTtcblx0fVxuXG5cdGdldEN1cnJlbnRDaG9yZENlbnRzKCkge1xuXHRcdGxldCBzb25nPXRoaXMuZ2V0Q3VycmVudFNvbmcoKTtcblx0XHRpZiAoIXNvbmcpXG5cdFx0XHRyZXR1cm4gWzAsMCwwXTtcblxuXHRcdGxldCBjaG9yZEluZGV4PXRoaXMuc3RhdGUuY3VycmVudENob3JkSW5kZXg7XG5cdFx0aWYgKHRoaXMuc3RhdGUuY3VycmVudFNlY3Rpb25JbmRleD49MCAmJiB0aGlzLnNlcXVlbmNlSW5kZXg+PTApXG5cdFx0XHRjaG9yZEluZGV4PXNvbmcuc2VjdGlvbnNbdGhpcy5zdGF0ZS5jdXJyZW50U2VjdGlvbkluZGV4XVt0aGlzLnNlcXVlbmNlSW5kZXhdO1xuXG5cdFx0bGV0IHNjYWxlQ2hvcmROb3Rlcz1NdXNpY1V0aWwuZ2V0Q2hvcmROb3Rlc0ZvclNjYWxlKHNvbmcubXVzaWNLZXksc29uZy5taW5vcik7XG5cdFx0bGV0IGNob3JkTm90ZXM9c2NhbGVDaG9yZE5vdGVzW2Nob3JkSW5kZXhdO1xuXHRcdHJldHVybiBbXG5cdFx0XHRNdXNpY1V0aWwubm90ZVRvQ2VudHMoY2hvcmROb3Rlc1swXSksXG5cdFx0XHRNdXNpY1V0aWwubm90ZVRvQ2VudHMoY2hvcmROb3Rlc1sxXSksXG5cdFx0XHRNdXNpY1V0aWwubm90ZVRvQ2VudHMoY2hvcmROb3Rlc1syXSlcblx0XHRdO1xuXHR9XG5cblx0cGxheUluc3RydW1lbnQobmFtZSwgc291bmRJbmRleCkge1xuXHRcdGxldCBpbnN0cnVtZW50PXRoaXMuZ2V0Q29uZHVjdG9ySW5zdHJ1bWVudEJ5TmFtZShuYW1lKTtcblx0XHRsZXQgbm90ZT1pbnN0cnVtZW50LmNyZWF0ZU5vdGUoc291bmRJbmRleCk7XG5cdFx0bm90ZS5zZXRDaG9yZENlbnRzKHRoaXMuZ2V0Q3VycmVudENob3JkQ2VudHMoKSk7XG5cdFx0bm90ZS5jb25uZWN0KHRoaXMuYXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uKTtcblx0XHRub3RlLnBsYXlOb3coKTtcblx0fVxuXG5cdG9uTm90ZUVuZGVkKG5vdGUpIHtcblx0XHRsZXQgaWR4PXRoaXMuY3VycmVudE5vdGVzLmluZGV4T2Yobm90ZSk7XG5cdFx0aWYgKGlkeDwwKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5jdXJyZW50Tm90ZXMuc3BsaWNlKGlkeCwxKTtcblx0fVxuXG5cdHBsYXlHcmlkU2xpY2UoYXQsIGdyaWRJbmRleCkge1xuXHRcdGxldCBjaG9yZENlbnRzPXRoaXMuZ2V0Q3VycmVudENob3JkQ2VudHMoKTtcblxuXHRcdGZvciAobGV0IGxheWVyIG9mIHRoaXMubGF5ZXJzLmdldEl0ZW1zKCkpIHtcblx0XHRcdGZvciAobGV0IHNvdW5kSW5kZXg9MDsgc291bmRJbmRleDxsYXllci5kYXRhLnNlcS5sZW5ndGg7IHNvdW5kSW5kZXgrKykge1xuXHRcdFx0XHRpZiAobGF5ZXIuZGF0YS5zZXFbc291bmRJbmRleF1bZ3JpZEluZGV4XSkge1xuXHRcdFx0XHRcdGxldCBub3RlPWxheWVyLmluc3RydW1lbnQuY3JlYXRlTm90ZShzb3VuZEluZGV4KTtcblx0XHRcdFx0XHRub3RlLmNvbm5lY3QobGF5ZXIuZGVzdGluYXRpb24pO1xuXHRcdFx0XHRcdG5vdGUuc2V0Q2hvcmRDZW50cyhjaG9yZENlbnRzKTtcblx0XHRcdFx0XHRub3RlLnBsYXlTaGVkdWxlZChhdCxsYXllci5nZXROb3RlTGVuKGdyaWRJbmRleCkqdGhpcy5nZXRTZWNQZXJHcmlkKCkpO1xuXHRcdFx0XHRcdG5vdGUuc2V0VmVsb2NpdHkobGF5ZXIuZGF0YS52ZWxbZ3JpZEluZGV4XSk7XG5cblx0XHRcdFx0XHRub3RlLm9uZW5kZWQ9dGhpcy5vbk5vdGVFbmRlZC5iaW5kKHRoaXMsbm90ZSk7XG5cdFx0XHRcdFx0dGhpcy5jdXJyZW50Tm90ZXMucHVzaChub3RlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGdldFNlY1BlckdyaWQoKSB7XG5cdFx0bGV0IHNlY1BlckJlYXQ9NjAvdGhpcy5nZXRDdXJyZW50U29uZygpLmJwbTtcblx0XHRsZXQgc2VjUGVyR3JpZD1zZWNQZXJCZWF0LzQ7XG5cblx0XHRyZXR1cm4gc2VjUGVyR3JpZDtcblx0fVxuXG5cdGdldFBsYXlHcmlkSW5kZXgoKSB7XG5cdFx0aWYgKCF0aGlzLmlzUGxheWluZygpKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiTm90IHBsYXlpbmchISFcIik7XG5cblx0XHRsZXQgZWxhcHNlZD10aGlzLmF1ZGlvQ29udGV4dC5jdXJyZW50VGltZS10aGlzLnBsYXlTdGFydFRpbWU7XG5cdFx0bGV0IGdyaWRJbmRleD1NYXRoLmZsb29yKGVsYXBzZWQvdGhpcy5nZXRTZWNQZXJHcmlkKCkpO1xuXG5cdFx0aWYgKGdyaWRJbmRleD09MTYpXG5cdFx0XHRncmlkSW5kZXg9MDtcblxuXHRcdHJldHVybiBncmlkSW5kZXg7XG5cdH1cblxuXHRvblBsYXlJbnRlcnZhbD0oKT0+e1xuXHRcdGxldCBlbGFwc2VkPXRoaXMuYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lLXRoaXMucGxheVN0YXJ0VGltZTtcblx0XHRsZXQgZ3JpZEluZGV4PWVsYXBzZWQvdGhpcy5nZXRTZWNQZXJHcmlkKCk7XG5cblx0XHR0aGlzLnBsYXlHcmlkSW5kZXg9TWF0aC5yb3VuZChncmlkSW5kZXgpO1xuXHRcdGlmICh0aGlzLm9uUGxheUdyaWRJbmRleENoYW5nZSlcblx0XHRcdHRoaXMub25QbGF5R3JpZEluZGV4Q2hhbmdlKHRoaXMucGxheUdyaWRJbmRleCwgdGhpcy5zZXF1ZW5jZUluZGV4KTtcblx0fVxuXG5cdHBsYXk9KCk9Pntcblx0XHR0aGlzLnBsYXlTdGFydFRpbWU9dGhpcy5hdWRpb0NvbnRleHQuY3VycmVudFRpbWU7XG5cblx0XHRpZiAodGhpcy5zdGF0ZS5jdXJyZW50U2VjdGlvbkluZGV4Pj0wKSB7XG5cdFx0XHRsZXQgc29uZz10aGlzLmdldEN1cnJlbnRTb25nKCk7XG5cblx0XHRcdHRoaXMuc2VxdWVuY2VJbmRleCsrO1xuXHRcdFx0aWYgKHRoaXMuc2VxdWVuY2VJbmRleD49c29uZy5zZWN0aW9uc1t0aGlzLnN0YXRlLmN1cnJlbnRTZWN0aW9uSW5kZXhdLmxlbmd0aClcblx0XHRcdFx0dGhpcy5zZXF1ZW5jZUluZGV4PTA7XG5cdFx0fVxuXG5cdFx0Zm9yIChsZXQgZ3JpZEluZGV4PTA7IGdyaWRJbmRleDwxNjsgZ3JpZEluZGV4KyspIHtcblx0XHRcdHRoaXMucGxheUdyaWRTbGljZShcblx0XHRcdFx0dGhpcy5wbGF5U3RhcnRUaW1lK2dyaWRJbmRleCp0aGlzLmdldFNlY1BlckdyaWQoKSxcblx0XHRcdFx0Z3JpZEluZGV4KTtcblx0XHR9XG5cblx0XHR0aGlzLnBsYXlUaW1lcj1zZXRUaW1lb3V0KHRoaXMucGxheSwxMDAwKjE2KnRoaXMuZ2V0U2VjUGVyR3JpZCgpKTtcblxuXHRcdGNsZWFySW50ZXJ2YWwodGhpcy5wbGF5SW50ZXJ2YWwpO1xuXHRcdHRoaXMucGxheUludGVydmFsPXNldEludGVydmFsKHRoaXMub25QbGF5SW50ZXJ2YWwsMTAwMCp0aGlzLmdldFNlY1BlckdyaWQoKSk7XG5cdFx0dGhpcy5vblBsYXlJbnRlcnZhbCgpO1xuXHR9XG5cblx0c3RvcCgpIHtcblx0XHR0aGlzLnBsYXlHcmlkSW5kZXg9LTE7XG5cdFx0dGhpcy5zZXF1ZW5jZUluZGV4PS0xO1xuXG5cdFx0aWYgKHRoaXMub25QbGF5R3JpZEluZGV4Q2hhbmdlKVxuXHRcdFx0dGhpcy5vblBsYXlHcmlkSW5kZXhDaGFuZ2UodGhpcy5wbGF5R3JpZEluZGV4LHRoaXMuc2VxdWVuY2VJbmRleCk7XG5cblx0XHRjbGVhclRpbWVvdXQodGhpcy5wbGF5VGltZXIpO1xuXHRcdGNsZWFySW50ZXJ2YWwodGhpcy5wbGF5SW50ZXJ2YWwpO1xuXHRcdHRoaXMucGxheVRpbWVyPW51bGw7XG5cdFx0dGhpcy5wbGF5SW50ZXJ2YWw9bnVsbDtcblxuXHRcdGZvciAobGV0IG5vdGUgb2YgdGhpcy5jdXJyZW50Tm90ZXMpIHtcblx0XHRcdG5vdGUuc2V0VmVsb2NpdHkoMCk7XG5cdFx0XHRub3RlLm9uZW5kZWQ9bnVsbDtcblx0XHR9XG5cblx0XHR0aGlzLmN1cnJlbnROb3Rlcz1bXTtcblx0fVxuXG5cdGlzUGxheWluZygpIHtcblx0XHRyZXR1cm4gISF0aGlzLnBsYXlUaW1lcjtcblx0fVxuXG5cdHNldFN0YXRlPShzdGF0ZSk9Pntcblx0XHR0aGlzLnN0YXRlPXN0YXRlO1xuXHRcdHRoaXMuaW5zdHJ1bWVudHMuc2V0RGF0YShzdGF0ZS5pbnN0cnVtZW50cyk7XG5cblx0XHRpZiAodGhpcy5nZXRDdXJyZW50U29uZygpKSB7XG5cdFx0XHR0aGlzLmxheWVycy5zZXREYXRhKHRoaXMuZ2V0Q3VycmVudFNvbmcoKS5sYXllcnMpO1xuXHRcdFx0aWYgKHN0YXRlLnBsYXlpbmcgJiYgIXRoaXMuaXNQbGF5aW5nKCkpXG5cdFx0XHRcdHRoaXMucGxheSgpO1xuXG5cdFx0XHRlbHNlIGlmICghc3RhdGUucGxheWluZyAmJiB0aGlzLmlzUGxheWluZygpKVxuXHRcdFx0XHR0aGlzLnN0b3AoKTtcblx0XHR9XG5cblx0XHRlbHNlIHtcblx0XHRcdHRoaXMuc3RvcCgpO1xuXHRcdFx0dGhpcy5sYXllcnMuc2V0RGF0YShbXSk7XG5cdFx0fVxuXG5cdFx0aWYgKHN0YXRlLmN1cnJlbnRTZWN0aW9uSW5kZXg8MCkge1xuXHRcdFx0dGhpcy5zZXF1ZW5jZUluZGV4PS0xO1xuXHRcdFx0bGV0IGN1cnJlbnRDaG9yZENlbnRzPXRoaXMuZ2V0Q3VycmVudENob3JkQ2VudHMoKTtcblx0XHRcdGZvciAobGV0IG5vdGUgb2YgdGhpcy5jdXJyZW50Tm90ZXMpXG5cdFx0XHRcdG5vdGUuc2V0Q2hvcmRDZW50cyhjdXJyZW50Q2hvcmRDZW50cyk7XG5cdFx0fVxuXHR9O1xufVxuIiwiaW1wb3J0IEF1ZGlvVXRpbCBmcm9tICcuLi91dGlscy9BdWRpb1V0aWwnO1xuaW1wb3J0IE11c2ljVXRpbCBmcm9tICcuLi91dGlscy9NdXNpY1V0aWwnO1xuaW1wb3J0IENvbmR1Y3Rvck5vdGUgZnJvbSAnLi9Db25kdWN0b3JOb3RlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uZHVjdG9ySW5zdHJ1bWVudCB7XG5cdGNvbnN0cnVjdG9yKGNvbmR1Y3RvciwgZGF0YSkge1xuXHRcdHRoaXMuY29uZHVjdG9yPWNvbmR1Y3Rvcjtcblx0XHR0aGlzLmRhdGE9ZGF0YTtcblx0fVxuXG5cdGdldE5hbWUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZGF0YS5uYW1lO1xuXHR9XG5cblx0YXN5bmMgbG9hZCgpIHtcblx0XHRzd2l0Y2ggKHRoaXMuZGF0YS50eXBlKSB7XG5cdFx0XHRjYXNlIFwiaGFybW9uaWNcIjpcblx0XHRcdFx0bGV0IHVybD10aGlzLmRhdGEuc2FtcGxlO1xuXHRcdFx0XHR0aGlzLmJ1ZmZlcj1hd2FpdCBBdWRpb1V0aWwubG9hZEJ1ZmZlcih1cmwsdGhpcy5jb25kdWN0b3IuYXVkaW9Db250ZXh0KTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgXCJwZXJjdXNzaXZlXCI6XG5cdFx0XHRcdHRoaXMuYnVmZmVycz1bXTtcblx0XHRcdFx0Zm9yIChsZXQgdXJsIG9mIHRoaXMuZGF0YS5zYW1wbGVzKVxuXHRcdFx0XHRcdHRoaXMuYnVmZmVycy5wdXNoKGF3YWl0IEF1ZGlvVXRpbC5sb2FkQnVmZmVyKHVybCx0aGlzLmNvbmR1Y3Rvci5hdWRpb0NvbnRleHQpKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cblx0dXBkYXRlKGRhdGEpIHtcblx0fVxuXG5cdGZpbmFsaXplKCkge1xuXHR9XG5cblx0Y3JlYXRlTm90ZShzb3VuZEluZGV4KSB7XG5cdFx0c3dpdGNoICh0aGlzLmRhdGEudHlwZSkge1xuXHRcdFx0Y2FzZSBcImhhcm1vbmljXCI6XG5cdFx0XHRcdGxldCBub3RlPW5ldyBDb25kdWN0b3JOb3RlKHRoaXMuY29uZHVjdG9yLHRoaXMuYnVmZmVyLHNvdW5kSW5kZXgpO1xuXHRcdFx0XHRpZiAodGhpcy5kYXRhLnNhbXBsZU5vdGUpXG5cdFx0XHRcdFx0bm90ZS5zZXRTYW1wbGVOb3RlQ2VudHMoTXVzaWNVdGlsLm5vdGVUb0NlbnRzKHRoaXMuZGF0YS5zYW1wbGVOb3RlKSk7XG5cblx0XHRcdFx0cmV0dXJuIG5vdGU7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIFwicGVyY3Vzc2l2ZVwiOlxuXHRcdFx0XHRyZXR1cm4gbmV3IENvbmR1Y3Rvck5vdGUodGhpcy5jb25kdWN0b3IsdGhpcy5idWZmZXJzW3NvdW5kSW5kZXhdKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uZHVjdG9yTGF5ZXIge1xuXHRjb25zdHJ1Y3Rvcihjb25kdWN0b3IsIGRhdGEpIHtcblx0XHR0aGlzLmNvbmR1Y3Rvcj1jb25kdWN0b3I7XG5cdFx0dGhpcy5kYXRhPWRhdGE7XG5cdFx0dGhpcy5pbnN0cnVtZW50PXRoaXMuY29uZHVjdG9yLmdldENvbmR1Y3Rvckluc3RydW1lbnRCeU5hbWUoZGF0YS5pbnN0cnVtZW50TmFtZSk7XG5cdFx0aWYgKCF0aGlzLmluc3RydW1lbnQpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJUaGVyZSBpcyBubyBpbnN0cnVtZW50ISEhXCIpO1xuXG5cdFx0dGhpcy5nYWluPXRoaXMuY29uZHVjdG9yLmF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCk7XG5cdFx0dGhpcy5nYWluLmNvbm5lY3QodGhpcy5jb25kdWN0b3IuYXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uKTtcblx0XHR0aGlzLnVwZGF0ZUdhaW4oKTtcblxuXHRcdHRoaXMuZGVzdGluYXRpb249dGhpcy5nYWluO1xuXHR9XG5cblx0dXBkYXRlKGRhdGEpIHtcblx0XHR0aGlzLmRhdGE9ZGF0YTtcblx0XHR0aGlzLnVwZGF0ZUdhaW4oKTtcblx0fVxuXG5cdGZpbmFsaXplKCkge1xuXHRcdHRoaXMuZ2Fpbi5kaXNjb25uZWN0KCk7XG5cdH1cblxuXHR1cGRhdGVHYWluKCkge1xuXHRcdGlmICghdGhpcy5kYXRhLmF1ZGlibGUpXG5cdFx0XHR0aGlzLmdhaW4uZ2Fpbi52YWx1ZT0wO1xuXG5cdFx0ZWxzZVxuXHRcdFx0dGhpcy5nYWluLmdhaW4udmFsdWU9dGhpcy5kYXRhLnZvbHVtZTtcblx0fVxuXG5cdGhhc1NvdW5kQXQocG9zKSB7XG5cdFx0Zm9yIChsZXQgaT0wOyBpPHRoaXMuZGF0YS5zZXEubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmICh0aGlzLmRhdGEuc2VxW2ldW3Bvc10pXG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGdldE5vdGVMZW4ocG9zKSB7XG5cdFx0Zm9yIChsZXQgaT0xOyBpPDE2OyBpKyspXG5cdFx0XHRpZiAodGhpcy5oYXNTb3VuZEF0KChwb3MraSklMTYpXG5cdFx0XHRcdFx0fHwgdGhpcy5kYXRhLnN0YWNjWyhwb3MraSklMTZdKVxuXHRcdFx0XHRyZXR1cm4gaTtcblxuXHRcdHJldHVybiAxNjtcblx0fVxufSIsImltcG9ydCBNdXNpY1V0aWwgZnJvbSAnLi4vdXRpbHMvTXVzaWNVdGlsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uZHVjdG9yTm90ZSB7XG5cdGNvbnN0cnVjdG9yKGNvbmR1Y3RvciwgYnVmZmVyLCBjaG9yZE5vdGUpIHtcblx0XHR0aGlzLmNvbmR1Y3Rvcj1jb25kdWN0b3I7XG5cdFx0dGhpcy5idWZmZXI9YnVmZmVyO1xuXG5cdFx0dGhpcy5nYWluPXRoaXMuY29uZHVjdG9yLmF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCk7XG5cdFx0dGhpcy5zb3VyY2U9dGhpcy5jb25kdWN0b3IuYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xuXHRcdHRoaXMuc291cmNlLmJ1ZmZlcj10aGlzLmJ1ZmZlcjtcblx0XHR0aGlzLnNvdXJjZS5jb25uZWN0KHRoaXMuZ2Fpbik7XG5cdFx0dGhpcy5zb3VyY2Uub25lbmRlZD0oKT0+e1xuXHRcdFx0dGhpcy5nYWluLmRpc2Nvbm5lY3QoKTtcblx0XHRcdGlmICh0aGlzLm9uZW5kZWQpXG5cdFx0XHRcdHRoaXMub25lbmRlZCh0aGlzKTtcblx0XHR9XG5cblx0XHR0aGlzLmNob3JkTm90ZT1jaG9yZE5vdGU7XG5cdFx0dGhpcy5jaG9yZENlbnRzPVswLDEwMCwyMDBdO1xuXHRcdHRoaXMuc2FtcGxlTm90ZUNlbnRzPTA7XG5cdFx0dGhpcy51cGRhdGVEZXR1bmUoKTtcblx0fVxuXG5cdGNvbm5lY3QoZGVzdGluYXRpb24pIHtcblx0XHR0aGlzLmlzQ29ubmVjdGVkPXRydWU7XG5cdFx0dGhpcy5nYWluLmNvbm5lY3QoZGVzdGluYXRpb24pO1xuXHR9XG5cblx0c2V0U2FtcGxlTm90ZUNlbnRzKGNlbnRzKSB7XG5cdFx0dGhpcy5zYW1wbGVOb3RlQ2VudHM9Y2VudHM7XG5cdFx0dGhpcy51cGRhdGVEZXR1bmUoKTtcblx0fVxuXG5cdHNldENob3JkQ2VudHMoY2hvcmRDZW50cykge1xuXHRcdHRoaXMuY2hvcmRDZW50cz1jaG9yZENlbnRzO1xuXHRcdHRoaXMudXBkYXRlRGV0dW5lKCk7XG5cdH1cblxuXHRwbGF5Tm93KCkge1xuXHRcdGlmICghdGhpcy5pc0Nvbm5lY3RlZClcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vdGUgbm90IGNvbm5lY3RlZCFcIik7XG5cblx0XHR0aGlzLnNvdXJjZS5zdGFydCgpO1xuXHR9XG5cblx0cGxheVNoZWR1bGVkKGF0LCBkdXJhdGlvbikge1xuXHRcdGlmICghdGhpcy5pc0Nvbm5lY3RlZClcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vdGUgbm90IGNvbm5lY3RlZCFcIik7XG5cblx0XHR0aGlzLnNvdXJjZS5zdGFydChhdCk7XG5cdFx0dGhpcy5zb3VyY2Uuc3RvcChhdCtkdXJhdGlvbik7XG5cdH1cblxuXHR1cGRhdGVEZXR1bmUoKSB7XG5cdFx0aWYgKHRoaXMuY2hvcmROb3RlPT11bmRlZmluZWQpXG5cdFx0XHR0aGlzLnNvdXJjZS5kZXR1bmUudmFsdWU9MDtcblxuXHRcdGVsc2Vcblx0XHRcdHRoaXMuc291cmNlLmRldHVuZS52YWx1ZT1cblx0XHRcdFx0TXVzaWNVdGlsLk9DVEFWRV9DRU5UUyooTWF0aC5mbG9vcih0aGlzLmNob3JkTm90ZS8zKS0xKStcblx0XHRcdFx0dGhpcy5jaG9yZENlbnRzW3RoaXMuY2hvcmROb3RlJTNdLVxuXHRcdFx0XHR0aGlzLnNhbXBsZU5vdGVDZW50cztcblx0fVxuXG5cdHNldFZlbG9jaXR5KHZlbCkge1xuXHRcdHRoaXMuZ2Fpbi5nYWluLnZhbHVlPXZlbDtcblx0fVxufSIsImltcG9ydCB7IGgsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5cbmNsYXNzIEFwcENvbnRleHQgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKTtcblxuXHRcdHRoaXMuY3VycmllZD17fTtcblxuXHRcdGZvciAobGV0IGtleSBvZiB0aGlzLmdldE9iamVjdEtleXMocHJvcHMuY29udHJvbGxlcikpIHtcblx0XHRcdHRoaXMuY3VycmllZFtrZXldPSguLi5hcmdzKT0+e1xuXG5cdFx0XHRcdGlmICh0aGlzLnByb3BzLmxvZ0FjdGlvbnMpXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJBY3Rpb246IFwiK2tleStcIiAoXCIrYXJncytcIilcIik7XG5cblx0XHRcdFx0Zm9yIChsZXQgaSBpbiBhcmdzKSB7XG5cdFx0XHRcdFx0aWYgKGFyZ3NbaV0gaW5zdGFuY2VvZiBFdmVudCkge1xuXHRcdFx0XHRcdFx0YXJnc1tpXS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0YXJnc1tpXS5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdFx0XHRcdFx0aWYgKGFyZ3NbaV0udHlwZT09XCJjaGFuZ2VcIikge1xuXHRcdFx0XHRcdFx0XHRhcmdzW2ldPWFyZ3NbaV0udGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGxldCBuZXdTdGF0ZT1wcm9wcy5jb250cm9sbGVyW2tleV0odGhpcy5zdGF0ZSwgLi4uYXJncyk7XG5cdFx0XHRcdGlmIChuZXdTdGF0ZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcblx0XHRcdFx0XHRpZiAoIXRoaXMuc3RhdGUpXG5cdFx0XHRcdFx0XHR0aGlzLnN0YXRlPXtidXN5OiB0cnVlfTtcblxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdFx0XHRidXN5OiB0cnVlXG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdG5ld1N0YXRlLnRoZW4oKHN0YXRlKT0+e1xuXHRcdFx0XHRcdFx0c3RhdGUuYnVzeT1mYWxzZTtcblx0XHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoc3RhdGUpO1xuXHRcdFx0XHRcdFx0dGhpcy5ub3RpZnlTdGF0ZUNoYW5nZShzdGF0ZSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRpZiAoIXRoaXMuc3RhdGUpXG5cdFx0XHRcdFx0XHR0aGlzLnN0YXRlPW5ld1N0YXRlO1xuXG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XG5cblx0XHRcdFx0XHR0aGlzLm5vdGlmeVN0YXRlQ2hhbmdlKG5ld1N0YXRlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZvciAobGV0IGtleSBvZiB0aGlzLmdldE9iamVjdEtleXMocHJvcHMuaGVscGVyKSkge1xuXHRcdFx0dGhpcy5jdXJyaWVkW2tleV09KC4uLmFyZ3MpPT57XG5cdFx0XHRcdHJldHVybiBwcm9wcy5oZWxwZXJba2V5XSh0aGlzLnN0YXRlLCAuLi5hcmdzKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAocHJvcHMuaW5pdEFjdGlvbilcblx0XHRcdHRoaXMuY3VycmllZFtwcm9wcy5pbml0QWN0aW9uXSgpO1xuXHR9XG5cblx0bm90aWZ5U3RhdGVDaGFuZ2Uoc3RhdGUpIHtcblx0XHRpZiAodHlwZW9mIHRoaXMucHJvcHMub25TdGF0ZUNoYW5nZT09XCJmdW5jdGlvblwiKVxuXHRcdFx0dGhpcy5wcm9wcy5vblN0YXRlQ2hhbmdlKHN0YXRlKTtcblx0fVxuXG5cdGdldE9iamVjdEtleXMobykge1xuXHRcdGxldCBrZXlzPVtdO1xuXHRcdG89T2JqZWN0LmdldFByb3RvdHlwZU9mKG8pO1xuXHRcdHdoaWxlIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvKS5pbmRleE9mKFwiX19wcm90b19fXCIpPDApIHtcblx0XHRcdGtleXM9a2V5cy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMobykpO1xuXHRcdFx0bz1PYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7XG5cdFx0fVxuXG5cdFx0aWYgKGtleXMuaW5jbHVkZXMoXCJjb25zdHJ1Y3RvclwiKSlcblx0XHRcdGtleXMuc3BsaWNlKGtleXMuaW5kZXhPZihcImNvbnN0cnVjdG9yXCIpLDEpO1xuXG5cdFx0cmV0dXJuIGtleXM7XG5cdH1cblxuXHRnZXRDaGlsZENvbnRleHQoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdC4uLnRoaXMuc3RhdGUsXG5cdFx0XHQuLi50aGlzLmN1cnJpZWRcblx0XHR9O1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBcHBDb250ZXh0OyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1ZGlvVXRpbCB7XG5cdHN0YXRpYyBsb2FkQnVmZmVyKHVybCwgY29udGV4dCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuXHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRcdHJlcXVlc3Qub3BlbignR0VUJywgdXJsLCB0cnVlKTtcblx0XHRcdHJlcXVlc3QucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJztcblxuXHRcdFx0cmVxdWVzdC5vbmxvYWQ9KCk9Pntcblx0XHRcdFx0Y29udGV4dC5kZWNvZGVBdWRpb0RhdGEocmVxdWVzdC5yZXNwb25zZSxcblx0XHRcdFx0XHQoYnVmZmVyKT0+e1xuXHRcdFx0XHRcdFx0cmVzb2x2ZShidWZmZXIpO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0KGUpPT57XG5cdFx0XHRcdFx0XHRyZWplY3QoZSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdCk7XG5cdFx0XHR9O1xuXHRcdFx0cmVxdWVzdC5zZW5kKCk7XG5cdFx0fSlcblx0fVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXVzaWNVdGlsIHtcblx0c3RhdGljIE9DVEFWRV9DRU5UUz0xMjAwO1xuXHRzdGF0aWMgTk9URV9OQU1FUz1bXCJBXCIsXCJBI1wiLFwiQlwiLFwiQ1wiLFwiQyNcIixcIkRcIixcIkQjXCIsXCJFXCIsXCJGXCIsXCJGI1wiLFwiR1wiLFwiRyNcIl07XG5cblx0c3RhdGljIG5vdGVUb0NlbnRzKHMpIHtcblx0XHRzd2l0Y2ggKHMudG9VcHBlckNhc2UoKSkge1xuXHRcdFx0Y2FzZSBcIkNcIjpcblx0XHRcdGNhc2UgXCJcIjpcblx0XHRcdFx0cmV0dXJuIDA7XG5cblx0XHRcdGNhc2UgXCJDI1wiOlxuXHRcdFx0XHRyZXR1cm4gMTAwO1xuXG5cdFx0XHRjYXNlIFwiRFwiOlxuXHRcdFx0XHRyZXR1cm4gMjAwO1xuXG5cdFx0XHRjYXNlIFwiRCNcIjpcblx0XHRcdFx0cmV0dXJuIDMwMDtcblxuXHRcdFx0Y2FzZSBcIkVcIjpcblx0XHRcdFx0cmV0dXJuIDQwMDtcblxuXHRcdFx0Y2FzZSBcIkZcIjpcblx0XHRcdFx0cmV0dXJuIDUwMDtcblxuXHRcdFx0Y2FzZSBcIkYjXCI6XG5cdFx0XHRcdHJldHVybiA2MDA7XG5cblx0XHRcdGNhc2UgXCJHXCI6XG5cdFx0XHRcdHJldHVybiA3MDA7XG5cblx0XHRcdGNhc2UgXCJHI1wiOlxuXHRcdFx0XHRyZXR1cm4gODAwO1xuXG5cdFx0XHRjYXNlIFwiQVwiOlxuXHRcdFx0XHRyZXR1cm4gOTAwO1xuXG5cdFx0XHRjYXNlIFwiQSNcIjpcblx0XHRcdFx0cmV0dXJuIDEwMDA7XG5cblx0XHRcdGNhc2UgXCJCXCI6XG5cdFx0XHRcdHJldHVybiAxMTAwO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBnZXROb3Rlc0ZvclNjYWxlKHNjYWxlLCBtaW5vcikge1xuXHRcdGxldCBzdGFydEluZGV4PU11c2ljVXRpbC5OT1RFX05BTUVTLmluZGV4T2Yoc2NhbGUpO1xuXHRcdGlmIChzdGFydEluZGV4PDApXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJubyBzdWNoIHNjYWxlOiBcIitzY2FsZSk7XG5cblx0XHRsZXQgbm90ZUluZGVjZXM9WzAsMiw0LDUsNyw5LDExXTtcblx0XHRpZiAobWlub3IpXG5cdFx0XHRub3RlSW5kZWNlcz1bMCwyLDMsNSw3LDgsMTBdO1xuXG5cdFx0bGV0IHJlcz1bXTtcblx0XHRmb3IgKGxldCBpbmRleCBvZiBub3RlSW5kZWNlcylcblx0XHRcdHJlcy5wdXNoKE11c2ljVXRpbC5OT1RFX05BTUVTWyhzdGFydEluZGV4K2luZGV4KSUxMl0pO1xuXG5cdFx0cmV0dXJuIHJlcztcblx0fVxuXG5cdHN0YXRpYyBnZXRDaG9yZE5vdGVzRm9yU2NhbGUoc2NhbGUsIG1pbm9yKSB7XG5cdFx0bGV0IG5vdGVOYW1lcz1NdXNpY1V0aWwuZ2V0Tm90ZXNGb3JTY2FsZShzY2FsZSxtaW5vcik7XG5cblx0XHRsZXQgcmVzPVtdO1xuXHRcdGZvciAobGV0IGk9MDsgaTwxMjsgaSsrKVxuXHRcdFx0cmVzLnB1c2goW1xuXHRcdFx0XHRub3RlTmFtZXNbKGkpJTddLFxuXHRcdFx0XHRub3RlTmFtZXNbKGkrMiklN10sXG5cdFx0XHRcdG5vdGVOYW1lc1soaSs0KSU3XSxcblx0XHRcdF0pO1xuXG5cdFx0cmV0dXJuIHJlcztcblx0fVxuXG5cdHN0YXRpYyBnZXRDaG9yZE5hbWVzRm9yU2NhbGUoc2NhbGUsIG1pbm9yKSB7XG5cdFx0bGV0IHByZWZpeGVzPVtcIlwiLFwiLVwiLFwiLVwiLFwiXCIsXCJcIixcIi1cIixcIm9cIl07XG5cdFx0aWYgKG1pbm9yKVxuXHRcdFx0cHJlZml4ZXM9W1wiLVwiLFwib1wiLFwiXCIsXCItXCIsXCItXCIsXCJcIixcIlwiXTtcblxuXHRcdGxldCBub3RlTmFtZXM9TXVzaWNVdGlsLmdldE5vdGVzRm9yU2NhbGUoc2NhbGUsbWlub3IpO1xuXHRcdGxldCByZXM9W107XG5cdFx0Zm9yIChsZXQgaW5kZXggaW4gbm90ZU5hbWVzKVxuXHRcdFx0cmVzLnB1c2gobm90ZU5hbWVzW2luZGV4XStwcmVmaXhlc1tpbmRleF0pO1xuXG5cdFx0cmV0dXJuIHJlcztcblx0fVxufSIsImltcG9ydCB7IGgsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5cbmV4cG9ydCBjbGFzcyBTZWxlY3Qge1xuXHRvbkNoYW5nZT0oZSk9Pntcblx0XHRpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSlcblx0XHRcdHRoaXMucHJvcHMub25DaGFuZ2UoSlNPTi5wYXJzZShlLnRhcmdldC52YWx1ZSkpO1xuXG5cdFx0aWYgKHRoaXMucHJvcHMub25JbmRleENoYW5nZSlcblx0XHRcdHRoaXMucHJvcHMub25JbmRleENoYW5nZShlLnRhcmdldC5zZWxlY3RlZEluZGV4KTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRsZXQgcHJvcHM9dGhpcy5wcm9wcztcblxuXHRcdGlmICghcHJvcHMubGFiZWxGaWVsZClcblx0XHRcdHByb3BzLmxhYmVsRmllbGQ9XCJsYWJlbFwiO1xuXG5cdFx0aWYgKCFwcm9wcy5vcHRpb25zKVxuXHRcdFx0cHJvcHMub3B0aW9ucz1bXTtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8c2VsZWN0IGNsYXNzPXtwcm9wcy5jbGFzc31cblx0XHRcdFx0XHRzdHlsZT17cHJvcHMuc3R5bGV9XG5cdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG5cdFx0XHRcdFx0a2V5PXtwcm9wcy5rZXl9PlxuXHRcdFx0XHR7cHJvcHMub3B0aW9ucy5tYXAoKG9wdGlvbiwgaW5kZXgpPT57XG5cdFx0XHRcdFx0bGV0IHNlbGVjdGVkPWZhbHNlO1xuXG5cdFx0XHRcdFx0aWYgKHByb3BzLmhhc093blByb3BlcnR5KCdzZWxlY3RlZEluZGV4JykgJiZcblx0XHRcdFx0XHRcdFx0aW5kZXg9PT1wcm9wcy5zZWxlY3RlZEluZGV4KVxuXHRcdFx0XHRcdFx0c2VsZWN0ZWQ9dHJ1ZTtcblxuXHRcdFx0XHRcdGlmIChwcm9wcy5oYXNPd25Qcm9wZXJ0eSgnc2VsZWN0ZWQnKSAmJlxuXHRcdFx0XHRcdFx0XHRvcHRpb24ua2V5PT09cHJvcHMuc2VsZWN0ZWQpXG5cdFx0XHRcdFx0XHRzZWxlY3RlZD10cnVlO1xuXG5cdFx0XHRcdFx0bGV0IGtleT1vcHRpb24ua2V5O1xuXHRcdFx0XHRcdGlmIChwcm9wcy5oYXNPd25Qcm9wZXJ0eSgnb3B0aW9uS2V5UHJlZml4JykpXG5cdFx0XHRcdFx0XHRrZXk9cHJvcHMua2V5UHJlZml4K2tleTtcblxuXHRcdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0XHQ8b3B0aW9uIGtleT17a2V5fVxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlPXtKU09OLnN0cmluZ2lmeShvcHRpb24ua2V5KX1cblx0XHRcdFx0XHRcdFx0XHRzZWxlY3RlZD17c2VsZWN0ZWR9XG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3M9e29wdGlvbi5jbGFzc30+XG5cdFx0XHRcdFx0XHRcdHtvcHRpb25bcHJvcHMubGFiZWxGaWVsZF19XG5cdFx0XHRcdFx0XHQ8L29wdGlvbj5cblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9KX1cblx0XHRcdDwvc2VsZWN0PlxuXHRcdCk7XG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIElGKGNvbmQsZnVuYykge1xuXHRpZiAoY29uZClcblx0XHRyZXR1cm4gZnVuYygpO1xufSIsIi8vaW1wb3J0IGltbXV0YWJsZSBmcm9tICdpbW11dGFibGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWNvbmNpbGVBcnJheSB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHR0aGlzLml0ZW1zQnlLZXk9e307XG5cdFx0dGhpcy5vcHRpb25zPW9wdGlvbnM7XG5cdH1cblxuXHRzdGF0aWMgY3JlYXRlV2l0aEZhY3RvcnkoZmFjdG9yeSkge1xuXHRcdHJldHVybiBuZXcgUmVjb25jaWxlQXJyYXkoe1xuXHRcdFx0aXRlbUZhY3Rvcnk6IGZhY3Rvcnlcblx0XHR9KVxuXHR9XG5cblx0Y3JlYXRlSXRlbShkYXRhKSB7XG5cdFx0aWYgKHRoaXMub3B0aW9ucy5pdGVtRmFjdG9yeSlcblx0XHRcdHJldHVybiB0aGlzLm9wdGlvbnMuaXRlbUZhY3RvcnkoZGF0YSk7XG5cblx0XHRlbHNlIGlmICh0aGlzLm9wdGlvbnMuaXRlbUNsYXNzKVxuXHRcdFx0cmV0dXJuIG5ldyB0aGlzLm9wdGlvbnMuaXRlbUNsYXNzKGRhdGEpO1xuXG5cdFx0ZWxzZVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiTm8gd2F5IHRvIGNyZWF0ZSBpdGVtcyFcIik7XG5cdH1cblxuXHRzZXREYXRhKGRhdGFzKSB7XG5cdFx0bGV0IG5ld0tleXM9W107XG5cdFx0Zm9yIChsZXQgZGF0YSBvZiBkYXRhcykge1xuXHRcdFx0aWYgKCFkYXRhLmtleSlcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiQXJyYXkgaXRlbSBkb2Vzbid0IGhhdmUgYSBrZXlcIik7XG5cblx0XHRcdGxldCBrZXk9U3RyaW5nKGRhdGEua2V5KTtcblx0XHRcdG5ld0tleXMucHVzaChrZXkpO1xuXG5cdFx0XHQvL2xldCBpbT1pbW11dGFibGUuZnJvbUpTKGRhdGEpO1xuXHRcdFx0aWYgKHRoaXMuaXRlbXNCeUtleVtrZXldKSB7XG5cdFx0XHRcdC8vaWYgKCFpbS5lcXVhbHModGhpcy5pdGVtc0J5S2V5W2tleV0uX19pbSkpXG5cdFx0XHRcdHRoaXMuaXRlbXNCeUtleVtrZXldLnVwZGF0ZShkYXRhKTtcblx0XHRcdH1cblxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHRoaXMuaXRlbXNCeUtleVtrZXldPXRoaXMuY3JlYXRlSXRlbShkYXRhKTtcblx0XHRcdH1cblxuXHRcdFx0Ly90aGlzLml0ZW1zQnlLZXlba2V5XS5fX2ltPWltO1xuXHRcdH1cblxuXHRcdGZvciAobGV0IGtleSBvZiBPYmplY3Qua2V5cyh0aGlzLml0ZW1zQnlLZXkpKSB7XG5cdFx0XHRpZiAobmV3S2V5cy5pbmRleE9mKGtleSk8MCkge1xuXHRcdFx0XHR0aGlzLml0ZW1zQnlLZXlba2V5XS5maW5hbGl6ZSgpO1xuXHRcdFx0XHRkZWxldGUgdGhpcy5pdGVtc0J5S2V5W2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Z2V0SXRlbXMoKSB7XG5cdFx0cmV0dXJuIE9iamVjdC52YWx1ZXModGhpcy5pdGVtc0J5S2V5KTtcblx0fVxufVxuIiwiaW1wb3J0IHsgaCwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWRkTGF5ZXIge1xuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lLWNvbnRhaW5lclwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYm94IHBhbmUgZG91YmxlIGJnLWRhcmtcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZS1oZWFkZXIgYmctZGFyayB0ZXh0LXNlY29uZGFyeVwiPkFERCBMQVlFUjwvZGl2PlxuXHRcdFx0XHRcdHt0aGlzLmNvbnRleHQuaW5zdHJ1bWVudHMubWFwKChpbnN0cnVtZW50LGluZGV4KT0+KFxuXHRcdFx0XHRcdFx0PGEgY2xhc3M9XCJib3ggdy00IHRleHQtd2hpdGUgYmctZGFuZ2VyIGVsXCJcblx0XHRcdFx0XHRcdFx0XHRocmVmPVwiI1wiXG5cdFx0XHRcdFx0XHRcdFx0b25DbGljaz17dGhpcy5jb250ZXh0LmFkZExheWVyLmJpbmQobnVsbCxpbnN0cnVtZW50Lm5hbWUpfT5cblx0XHRcdFx0XHRcdFx0PGltZyBzcmM9e1wiaW1nL1wiK2luc3RydW1lbnQuaWNvbn0vPlxuXHRcdFx0XHRcdFx0XHR7aW5zdHJ1bWVudC5uYW1lfVxuXHRcdFx0XHRcdFx0PC9hPlxuXHRcdFx0XHRcdCkpfVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbiIsImltcG9ydCB7IGgsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyBTZWxlY3QsIElGIH0gZnJvbSAnLi4vdXRpbHMvUmVhY3RVdGlsLmpzeCc7XG5pbXBvcnQgSGVhZGVyIGZyb20gJy4vSGVhZGVyLmpzeCc7XG5pbXBvcnQgRnJvbnQgZnJvbSAnLi9Gcm9udC5qc3gnO1xuaW1wb3J0IFNvbmcgZnJvbSAnLi9Tb25nLmpzeCc7XG5pbXBvcnQgU29uZ1NldHRpbmdzIGZyb20gJy4vU29uZ1NldHRpbmdzLmpzeCc7XG5pbXBvcnQgTGF5ZXJTZXR0aW5ncyBmcm9tICcuL0xheWVyU2V0dGluZ3MuanN4JztcbmltcG9ydCBBZGRMYXllciBmcm9tICcuL0FkZExheWVyLmpzeCc7XG5pbXBvcnQgTGF5ZXIgZnJvbSAnLi9MYXllci5qc3gnO1xuaW1wb3J0IFNlbGVjdENob3JkIGZyb20gJy4vU2VsZWN0Q2hvcmQuanN4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0dXBkYXRlU2l6ZT0oKT0+e1xuXHRcdGxldCB3aW5kb3dXaWR0aD13aW5kb3cuaW5uZXJXaWR0aDtcblx0XHRsZXQgd2luZG93SGVpZ2h0PXdpbmRvdy5pbm5lckhlaWdodDtcblxuXHRcdGxldCBjcz1nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCk7XG5cdFx0bGV0IHBhbmVXaWR0aD1wYXJzZUZsb2F0KGNzLmdldFByb3BlcnR5VmFsdWUoJy0tcGFuZVdpZHRoJykpO1xuXHRcdGxldCBwYW5lSGVpZ2h0PXBhcnNlRmxvYXQoY3MuZ2V0UHJvcGVydHlWYWx1ZSgnLS1wYW5lSGVpZ2h0JykpO1xuXG5cdFx0bGV0IGNvbnRlbnRXaWR0aCxjb250ZW50SGVpZ2h0O1xuXHRcdGlmICh3aW5kb3dIZWlnaHQ+d2luZG93V2lkdGgpIHtcblx0XHRcdGNvbnRlbnRIZWlnaHQ9MioocGFuZUhlaWdodCsxKSsyO1xuXHRcdFx0Y29udGVudFdpZHRoPXBhbmVXaWR0aCsxO1xuXHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuY2xhc3NMaXN0LmFkZChcInBvcnRyYWl0XCIpO1xuXHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuY2xhc3NMaXN0LnJlbW92ZShcImxhbmRzY2FwZVwiKTtcblx0XHR9XG5cblx0XHRlbHNlIHtcblx0XHRcdGNvbnRlbnRIZWlnaHQ9cGFuZUhlaWdodCsyKzE7XG5cdFx0XHRjb250ZW50V2lkdGg9MioocGFuZVdpZHRoKzEpO1xuXHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuY2xhc3NMaXN0LmFkZChcImxhbmRzY2FwZVwiKTtcblx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJwb3J0cmFpdFwiKTtcblx0XHR9XG5cblx0XHRsZXQgZm9udFNpemU7XG5cdFx0aWYgKHdpbmRvd1dpZHRoL2NvbnRlbnRXaWR0aDx3aW5kb3dIZWlnaHQvY29udGVudEhlaWdodClcblx0XHRcdGZvbnRTaXplPXdpbmRvd1dpZHRoL2NvbnRlbnRXaWR0aDtcblxuXHRcdGVsc2Vcblx0XHRcdGZvbnRTaXplPXdpbmRvd0hlaWdodC9jb250ZW50SGVpZ2h0O1xuXG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImh0bWxcIikuc3R5bGUuZm9udFNpemU9Zm9udFNpemUrXCJweFwiO1xuXG5cdFx0bGV0IHM9ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlO1xuXHRcdHMuc2V0UHJvcGVydHkoXCItLXBhbmVNYXJnaW5Ub3BcIiwoKHdpbmRvd0hlaWdodC1mb250U2l6ZSpjb250ZW50SGVpZ2h0KS8yKStcInB4XCIpO1xuXHRcdHMuc2V0UHJvcGVydHkoXCItLXBhbmVNYXJnaW5MZWZ0XCIsKCh3aW5kb3dXaWR0aC1mb250U2l6ZSpjb250ZW50V2lkdGgpLzIpK1wicHhcIik7XG5cdH1cblxuXHRvblBsYXlDbGljaz0oKT0+e1xuXHRcdGNvbnNvbGUubG9nKFwicGxheVwiKTtcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCkge1xuXHRcdHdpbmRvdy5vbnJlc2l6ZT10aGlzLnVwZGF0ZVNpemU7XG5cdFx0c2V0VGltZW91dCh0aGlzLnVwZGF0ZVNpemUsMCk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0aWYgKHRoaXMuY29udGV4dC5idXN5KVxuXHRcdFx0cmV0dXJuICg8ZGl2PkxPQURJTkcuLi48L2Rpdj4pO1xuXG5cdFx0bGV0IGNscz1cIlwiO1xuXHRcdGlmICh0aGlzLmNvbnRleHQucmVjb3JkaW5nKVxuXHRcdFx0Y2xzPVwicmVjb3JkaW5nXCI7XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzcz17Y2xzfT5cblx0XHRcdFx0PEhlYWRlciAvPlxuXHRcdFx0XHR7SUYoIXRoaXMuY29udGV4dC5pc1NvbmdPcGVuKCksKCk9PlxuXHRcdFx0XHRcdDxGcm9udCAvPlxuXHRcdFx0XHQpfVxuXHRcdFx0XHR7SUYodGhpcy5jb250ZXh0LmlzU29uZ09wZW4oKSwoKT0+e1xuXHRcdFx0XHRcdGlmICh0aGlzLmNvbnRleHQuc2V0dGluZ3NWaXNpYmxlKSB7XG5cdFx0XHRcdFx0XHRpZiAodGhpcy5jb250ZXh0LmN1cnJlbnRMYXllckluZGV4Pj0wKVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gPExheWVyU2V0dGluZ3MgLz47XG5cblx0XHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdFx0cmV0dXJuIDxTb25nU2V0dGluZ3MgLz47XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0ZWxzZSBpZiAodGhpcy5jb250ZXh0LmFkZExheWVyVmlzaWJsZSlcblx0XHRcdFx0XHRcdHJldHVybiA8QWRkTGF5ZXIgLz47XG5cblx0XHRcdFx0XHRlbHNlIGlmICh0aGlzLmNvbnRleHQuY3VycmVudExheWVySW5kZXg+PTApXG5cdFx0XHRcdFx0XHRyZXR1cm4gPExheWVyIC8+XG5cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRyZXR1cm4gPFNvbmcgLz47XG5cdFx0XHRcdH0pfVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuIiwiaW1wb3J0IHsgaCwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnJvbnQge1xuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lLWNvbnRhaW5lclwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYm94IHBhbmUgZG91YmxlIGJvcmRlciBib3JkZXItZGFya1wiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lLWhlYWRlciB0ZXh0LXNlY29uZGFyeSBiZy1kYXJrXCI+U09OR1M8L2Rpdj5cblxuXHRcdFx0XHRcdDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJ0ZXh0LXdoaXRlXCJcblx0XHRcdFx0XHRcdFx0b25DbGljaz17dGhpcy5jb250ZXh0LmFkZFNvbmd9PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImJveCBiZy1kYXJrIHctMVwiPis8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJib3hcIj5OZXcgU29uZzwvZGl2PlxuXHRcdFx0XHRcdDwvYT48YnIvPlxuXHRcdFx0XHRcdHt0aGlzLmNvbnRleHQuc29uZ3MubWFwKChzb25nLGluZGV4KT0+KFxuXHRcdFx0XHRcdFx0PGEgY2xhc3M9XCJib3ggYmctc2Vjb25kYXJ5IHRleHQtd2hpdGUgdy00IGJvcmRlciBib3JkZXItbGlnaHRcIlxuXHRcdFx0XHRcdFx0XHRcdGhyZWY9XCIjXCJcblx0XHRcdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLmNvbnRleHQuc2V0U29uZ0luZGV4LmJpbmQobnVsbCxpbmRleCl9PlxuXHRcdFx0XHRcdFx0XHR7c29uZy5uYW1lfVxuXHRcdFx0XHRcdFx0PC9hPlxuXHRcdFx0XHRcdCkpfVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbiIsImltcG9ydCB7IGgsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyBTZWxlY3QsIElGIH0gZnJvbSAnLi4vdXRpbHMvUmVhY3RVdGlsLmpzeCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYWRlciBleHRlbmRzIENvbXBvbmVudCB7XG5cdHJlbmRlcigpIHtcblx0XHRsZXQgcGxheUJ1dHRvbkNsYXNzPVwiaGVhZGVyLWJ1dHRvbiB0ZXh0LXdoaXRlIFwiO1xuXHRcdGlmICh0aGlzLmNvbnRleHQucGxheWluZylcblx0XHRcdHBsYXlCdXR0b25DbGFzcys9XCJhY3RpdmVcIjtcblxuXHRcdGxldCByZWNvcmRCdXR0b25DbGFzcz1cImhlYWRlci1idXR0b24gdGV4dC13aGl0ZSBcIjtcblx0XHRpZiAodGhpcy5jb250ZXh0LnJlY29yZGluZylcblx0XHRcdHJlY29yZEJ1dHRvbkNsYXNzKz1cImFjdGl2ZVwiO1xuXG5cdFx0bGV0IGl0ZW1zPVtdO1xuXHRcdGlmICh0aGlzLmNvbnRleHQuaXNTb25nT3BlbigpKSB7XG5cdFx0XHRpdGVtcy5wdXNoKFxuXHRcdFx0XHQ8YSBjbGFzcz1cImhlYWRlci1idXR0b24gdGV4dC13aGl0ZVwiXG5cdFx0XHRcdFx0XHRocmVmPVwiI1wiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLmNvbnRleHQuZ29CYWNrfT5cblx0XHRcdFx0XHQ8aW1nIHNyYz1cImltZy9hcnJvdy1sZWZ0LnN2Z1wiLz5cblx0XHRcdFx0PC9hPlxuXHRcdFx0KTtcblxuXHRcdFx0aWYgKHRoaXMuY29udGV4dC5jdXJyZW50TGF5ZXJJbmRleD49MClcblx0XHRcdFx0aXRlbXMucHVzaChcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiaGVhZGVyLWJ1dHRvbiB0ZXh0LXdoaXRlXCI+XG5cdFx0XHRcdFx0XHQ8aW1nIHNyYz17XCJpbWcvXCIrdGhpcy5jb250ZXh0LmdldEluc3RydW1lbnRCeU5hbWUodGhpcy5jb250ZXh0LmdldEN1cnJlbnRMYXllcigpLmluc3RydW1lbnROYW1lKS5pY29ufS8+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdCk7XG5cblx0XHRcdGl0ZW1zLnB1c2goXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJoZWFkZXItdGV4dCB0ZXh0LXdoaXRlXCI+XG5cdFx0XHRcdFx0e3RoaXMuY29udGV4dC5nZXRDdXJyZW50U29uZygpLm5hbWV9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KTtcblxuXHRcdFx0aXRlbXMucHVzaChcblx0XHRcdFx0PGEgY2xhc3M9e3BsYXlCdXR0b25DbGFzc31cblx0XHRcdFx0XHRcdGhyZWY9XCIjXCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMuY29udGV4dC5wbGF5Q2xpY2t9PlxuXHRcdFx0XHRcdDxpbWcgc3JjPVwiaW1nL3BsYXktZmlsbC5zdmdcIi8+XG5cdFx0XHRcdDwvYT5cblx0XHRcdCk7XG5cblx0XHRcdGlmICh0aGlzLmNvbnRleHQuY3VycmVudExheWVySW5kZXg+PTApIFxuXHRcdFx0XHRpdGVtcy5wdXNoKFxuXHRcdFx0XHRcdDxhIGNsYXNzPXtyZWNvcmRCdXR0b25DbGFzc31cblx0XHRcdFx0XHRcdFx0aHJlZj1cIiNcIlxuXHRcdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLmNvbnRleHQucmVjb3JkQ2xpY2t9PlxuXHRcdFx0XHRcdFx0PGltZyBzcmM9XCJpbWcvY2lyY2xlLWZpbGwuc3ZnXCIvPlxuXHRcdFx0XHRcdDwvYT5cblx0XHRcdFx0KTtcblxuXHRcdFx0aXRlbXMucHVzaChcblx0XHRcdFx0PGEgY2xhc3M9XCJoZWFkZXItYnV0dG9uIHRleHQtd2hpdGVcIlxuXHRcdFx0XHRcdFx0aHJlZj1cIiNcIlxuXHRcdFx0XHRcdFx0b25DbGljaz17dGhpcy5jb250ZXh0LnRvZ2dsZVNldHRpbmdzfT5cblx0XHRcdFx0XHQ8aW1nIHNyYz1cImltZy9nZWFyLWZpbGwuc3ZnXCIvPlxuXHRcdFx0XHQ8L2E+XG5cdFx0XHQpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGl0ZW1zLnB1c2goXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJoZWFkZXItdGV4dCB0ZXh0LXdoaXRlXCI+SG9vZG1vZGU8L2Rpdj5cblx0XHRcdCk7XG5cdFx0fVxuXG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzcz1cImhlYWRlciBib3ggYmctZGFya1wiPlxuXHRcdFx0XHR7aXRlbXN9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59IiwiaW1wb3J0IHsgaCwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGF5ZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRvbktleURvd249KGUpPT57XG5cdFx0aWYgKGUudGFyZ2V0Lm5vZGVOYW1lPT1cIklOUFVUXCIpXG5cdFx0XHRyZXR1cm47XG5cblx0XHRsZXQgaz1wYXJzZUludChlLmtleSktMTtcblx0XHRpZiAoaz49MClcblx0XHRcdHRoaXMuY29udGV4dC5zb3VuZEJ1dHRvbkNsaWNrKGspO1xuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIix0aGlzLm9uS2V5RG93bik7XG5cdH1cblxuXHRjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcblx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLHRoaXMub25LZXlEb3duKTtcblx0fVxuXG5cdHJlbmRlclNvdW5kU3ltYm9scygpIHtcblx0XHRsZXQgaW5zdHJ1bWVudD10aGlzLmNvbnRleHQuZ2V0Q3VycmVudEluc3RydW1lbnQoKTtcblx0XHRsZXQgbGF5ZXI9dGhpcy5jb250ZXh0LmdldEN1cnJlbnRMYXllcigpO1xuXHRcdGxldCBidXR0b25zPW5ldyBBcnJheSgxNikuZmlsbCg8ZGl2IGNsYXNzPVwiYm94IHctMVwiLz4pO1xuXHRcdGxldCBudW1Tb3VuZHM9dGhpcy5jb250ZXh0LmdldEluc3RydW1lbnROdW1Tb3VuZHNCeU5hbWUoaW5zdHJ1bWVudC5uYW1lKTtcblxuXHRcdGZvciAobGV0IGk9MDsgaTw5OyBpKyspIHtcblx0XHRcdGxldCBidXR0b25JbmRleD04LTQqTWF0aC5mbG9vcihpLzMpK2klMztcblx0XHRcdGlmIChsYXllci5zZXFbaV0pIHtcblx0XHRcdFx0bGV0IGJ1dHRvbkNsYXNzPVwiYm94IHctMSBiZy1wcmltYXJ5IHRleHQtd2hpdGUgXCI7XG5cblx0XHRcdFx0aWYgKHRoaXMuY29udGV4dC5jdXJyZW50R3JpZEluZGV4Pj0wICYmXG5cdFx0XHRcdFx0XHRsYXllci5zZXFbaV1bdGhpcy5jb250ZXh0LmN1cnJlbnRHcmlkSW5kZXhdKVxuXHRcdFx0XHRcdGJ1dHRvbkNsYXNzKz1cImFjdGl2ZVwiXG5cblx0XHRcdFx0bGV0IGJ1dHRvbkljb247XG5cdFx0XHRcdGlmIChpbnN0cnVtZW50LnR5cGU9PVwicGVyY3Vzc2l2ZVwiKVxuXHRcdFx0XHRcdGJ1dHRvbkljb249XCJpbWcvXCIraW5zdHJ1bWVudC5pY29uc1tpXTtcblxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0YnV0dG9uSWNvbj1cImltZy9ub3RlLnN2Z1wiO1xuXG5cdFx0XHRcdGJ1dHRvbnNbYnV0dG9uSW5kZXhdPVxuXHRcdFx0XHRcdDxhIGNsYXNzPXtidXR0b25DbGFzc31cblx0XHRcdFx0XHRcdFx0aHJlZj1cIiNcIlxuXHRcdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLmNvbnRleHQuc291bmRCdXR0b25DbGljay5iaW5kKG51bGwsaSl9PlxuXHRcdFx0XHRcdFx0PGltZyBzcmM9e2J1dHRvbkljb259Lz5cblx0XHRcdFx0XHQ8L2E+XG5cdFx0XHR9XG5cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRidXR0b25zW2J1dHRvbkluZGV4XT1cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYm94IHctMSBiZy1wcmltYXJ5XCIvPlxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0bGV0IGNscz1cImJveCB3LTEgYmctd2FybmluZyB0ZXh0LXdoaXRlIFwiO1xuXHRcdGlmICh0aGlzLmNvbnRleHQuY3VycmVudEdyaWRJbmRleD49MCAmJlxuXHRcdFx0XHRcdGxheWVyLnN0YWNjW3RoaXMuY29udGV4dC5jdXJyZW50R3JpZEluZGV4XSlcblx0XHRcdGNscys9XCJhY3RpdmVcIjtcblxuXHRcdGJ1dHRvbnNbMTJdPShcblx0XHRcdDxhIGNsYXNzPXtjbHN9XG5cdFx0XHRcdFx0aHJlZj1cIiNcIlxuXHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMuY29udGV4dC50b2dnbGVDdXJyZW50TGF5ZXJTdGFjY30+XG5cdFx0XHRcdDxpbWcgc3JjPVwiaW1nL3Jlc3Quc3ZnXCIvPlxuXHRcdFx0PC9hPlxuXHRcdCk7XG5cblx0XHRsZXQgY3VycmVudFZlbD1udWxsO1xuXHRcdGlmICh0aGlzLmNvbnRleHQuY3VycmVudEdyaWRJbmRleD49MCAmJlxuXHRcdFx0XHR0aGlzLmNvbnRleHQuY3VycmVudExheWVySGFzU291bmRBdCh0aGlzLmNvbnRleHQuY3VycmVudEdyaWRJbmRleCkpXG5cdFx0XHRjdXJyZW50VmVsPWxheWVyLnZlbFt0aGlzLmNvbnRleHQuY3VycmVudEdyaWRJbmRleF07XG5cblx0XHRsZXQgc2l6ZUNsYXNzZXM9W1widGlueVwiLFwic21hbGxcIixcIlwiXTtcblx0XHRsZXQgdmVscz1bMC4yNSwwLjUwLDFdO1xuXHRcdGZvciAobGV0IGk9MDsgaTwzOyBpKyspIHtcblx0XHRcdGxldCBjbHM9XCJib3ggdy0xIGJnLXdhcm5pbmcgdGV4dC13aGl0ZSBcIitzaXplQ2xhc3Nlc1tpXStcIiBcIjtcblxuXHRcdFx0aWYgKGN1cnJlbnRWZWw9PXZlbHNbaV0pXG5cdFx0XHRcdGNscys9XCJhY3RpdmVcIjtcblxuXHRcdFx0YnV0dG9uc1sxMytpXT0oXG5cdFx0XHRcdDxhIGNsYXNzPXtjbHN9XG5cdFx0XHRcdFx0XHRocmVmPVwiI1wiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLmNvbnRleHQuc2V0Q3VycmVudExheWVyVmVsLmJpbmQobnVsbCx2ZWxzW2ldKX0+XG5cdFx0XHRcdFx0PGltZyBzcmM9XCJpbWcvbm90ZS5zdmdcIi8+XG5cdFx0XHRcdDwvYT5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKGluc3RydW1lbnQudHlwZT09XCJoYXJtb25pY1wiKSB7XG5cdFx0XHRmb3IgKGxldCBvY3RhdmUgb2YgWzAsMSwyXSkge1xuXHRcdFx0XHRsZXQgY2xzPVwiYm94IHctMSBiZy1pbmZvIHRleHQtd2hpdGUgXCI7XG5cdFx0XHRcdGlmICh0aGlzLmNvbnRleHQuY3VycmVudEdyaWRJbmRleD49MCAmJlxuXHRcdFx0XHRcdFx0dGhpcy5jb250ZXh0LmN1cnJlbnRMYXllckhhc0Nob3JkQXQodGhpcy5jb250ZXh0LmN1cnJlbnRHcmlkSW5kZXgsb2N0YXZlKSlcblx0XHRcdFx0XHRjbHMrPVwiYWN0aXZlXCI7XG5cblx0XHRcdFx0YnV0dG9uc1sxMS1vY3RhdmUqNF09KFxuXHRcdFx0XHRcdDxhIGNsYXNzPXtjbHN9XG5cdFx0XHRcdFx0XHRcdGhyZWY9XCIjXCJcblx0XHRcdFx0XHRcdFx0b25DbGljaz17dGhpcy5jb250ZXh0LmNob3JkQnV0dG9uQ2xpY2suYmluZChudWxsLG9jdGF2ZSl9PlxuXHRcdFx0XHRcdFx0PGltZyBzcmM9XCJpbWcvbXVzaWMtbm90ZS5zdmdcIi8+XG5cdFx0XHRcdFx0PC9hPlxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBidXR0b25zO1xuXHR9XG5cblx0cmVuZGVyU2VxdWVuY2UoKSB7XG5cdFx0bGV0IGxheWVyPXRoaXMuY29udGV4dC5nZXRDdXJyZW50TGF5ZXIoKTtcblx0XHRsZXQgcmVzPVtdO1xuXHRcdGxldCB2ZWxDbHM9e1xuXHRcdFx0MC4yNTogXCJ0aW55XCIsXG5cdFx0XHQwLjU6IFwic21hbGxcIixcblx0XHRcdDE6IFwiXCJcblx0XHR9O1xuXG5cdFx0Zm9yIChsZXQgZ3JpZEluZGV4PTA7IGdyaWRJbmRleDwxNjsgZ3JpZEluZGV4KyspIHtcblx0XHRcdGxldCBjbHM9XCJib3ggdy0xIGJlYXQtZ3JpZCBiZWF0LVwiK2dyaWRJbmRleCtcIiBcIjtcblxuXHRcdFx0aWYgKGdyaWRJbmRleD09dGhpcy5jb250ZXh0LmN1cnJlbnRHcmlkSW5kZXgpXG5cdFx0XHRcdGNscys9XCJiZy1saWdodCBcIjtcblxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRjbHMrPVwiYmctYmxhY2sgdGV4dC13aGl0ZSBcIjtcblxuXHRcdFx0bGV0IGljb249bnVsbDtcblx0XHRcdGlmIChsYXllci5zdGFjY1tncmlkSW5kZXhdKVxuXHRcdFx0XHRpY29uPTxpbWcgc3JjPVwiaW1nL3Jlc3Quc3ZnXCIvPjtcblxuXHRcdFx0ZWxzZSBpZiAodGhpcy5jb250ZXh0LmN1cnJlbnRMYXllckhhc1NvdW5kQXQoZ3JpZEluZGV4KSkge1xuXHRcdFx0XHRpY29uPTxpbWcgc3JjPVwiaW1nL25vdGUuc3ZnXCIvPjtcblx0XHRcdFx0Y2xzKz12ZWxDbHNbbGF5ZXIudmVsW2dyaWRJbmRleF1dO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXMucHVzaChcblx0XHRcdFx0PGEgY2xhc3M9e2Nsc31cblx0XHRcdFx0XHRcdGhyZWY9XCIjXCJcblx0XHRcdFx0XHRcdG9uTW91c2VEb3duPXt0aGlzLmNvbnRleHQuZ3JpZEluZGV4Q2xpY2suYmluZChudWxsLGdyaWRJbmRleCl9PlxuXHRcdFx0XHRcdHtpY29ufVxuXHRcdFx0XHQ8L2E+XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXM7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0bGV0IGxheWVyPXRoaXMuY29udGV4dC5nZXRDdXJyZW50TGF5ZXIoKTtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZS1jb250YWluZXIgcmV2LXBvcnRyYWl0XCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lIGJveCBib3JkZXIgYm9yZGVyLWRhcmtcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZS1oZWFkZXIgdGV4dC1zZWNvbmRhcnkgYmctZGFya1wiPlNPVU5EUzwvZGl2PlxuXHRcdFx0XHRcdHt0aGlzLnJlbmRlclNvdW5kU3ltYm9scygpfVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInBhbmUgYm94IGJnLWRhcmtcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZS1oZWFkZXIgdGV4dC1zZWNvbmRhcnkgYmctZGFya1wiPlNFUVVFTkNFPC9kaXY+XG5cdFx0XHRcdFx0e3RoaXMucmVuZGVyU2VxdWVuY2UoKX1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBoLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMYXllclNldHRpbmdzIHtcblx0cmVuZGVyKCkge1xuXHRcdGxldCBpbnN0cnVtZW50PXRoaXMuY29udGV4dC5nZXRDdXJyZW50SW5zdHJ1bWVudCgpO1xuXHRcdGxldCBsYXllcj10aGlzLmNvbnRleHQuZ2V0Q3VycmVudExheWVyKCk7XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzcz1cInBhbmUtY29udGFpbmVyXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJib3ggcGFuZSBkb3VibGUgYmctZGFya1wiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lLWhlYWRlciBiZy1kYXJrIHRleHQtc2Vjb25kYXJ5XCI+TEFZRVIgU0VUVElOR1M8L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYm94IHctNCBlbCB0ZXh0LXdoaXRlXCI+XG5cdFx0XHRcdFx0XHQ8aW1nIHNyYz17XCJpbWcvXCIraW5zdHJ1bWVudC5pY29ufS8+XG5cdFx0XHRcdFx0XHR7aW5zdHJ1bWVudC5uYW1lfVxuXHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0PGJyLz48YnIvPlxuXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG5cdFx0XHRcdFx0XHRWb2x1bWU8YnIvPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImJveCBib3JkZXIgYmctd2hpdGUgYm9yZGVyLWJsYWNrIHRleHQtYmxhY2sgdy00XCI+XG5cdFx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwicmFuZ2VcIiBtaW49XCIwXCIgbWF4PVwiMVwiIHN0ZXA9XCIwLjAxXCJcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17bGF5ZXIudm9sdW1lfVxuXHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLmNvbnRleHQuc2V0Q3VycmVudExheWVyVm9sdW1lfVxuXHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZm9ybS1idXR0b25zXCI+XG5cdFx0XHRcdFx0XHQ8YSBjbGFzcz1cImJveCBiZy1kYW5nZXIgdGV4dC13aGl0ZVwiXG5cdFx0XHRcdFx0XHRcdFx0aHJlZj1cIiNcIlxuXHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMuY29udGV4dC5kZWxldGVDdXJyZW50TGF5ZXJ9PlxuXHRcdFx0XHRcdFx0XHRSZW1vdmUgTGF5ZXJcblx0XHRcdFx0XHRcdDwvYT5cblx0XHRcdFx0XHRcdDxhIGNsYXNzPVwiYm94IGJnLXByaW1hcnkgZm9ybS1idXR0b24gdGV4dC13aGl0ZVwiXG5cdFx0XHRcdFx0XHRcdFx0aHJlZj1cIiNcIlxuXHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMuY29udGV4dC50b2dnbGVTZXR0aW5nc30+XG5cdFx0XHRcdFx0XHRcdENsb3NlXG5cdFx0XHRcdFx0XHQ8L2E+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuIiwiaW1wb3J0IHsgaCwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VsZWN0Q2hvcmQge1xuXHRyZW5kZXIoKSB7XG5cdFx0bGV0IHNvbmc9dGhpcy5jb250ZXh0LmdldEN1cnJlbnRTb25nKCk7XG5cdFx0bGV0IHNlY3Rpb249c29uZy5zZWN0aW9uc1t0aGlzLmNvbnRleHQuY3VycmVudFNlY3Rpb25JbmRleF07XG5cdFx0bGV0IGN1cnJlbnRDaG9yZEluZGV4PXNlY3Rpb25bdGhpcy5jb250ZXh0LmVkaXRTZWN0aW9uQ2hvcmRWaXNpYmxlXTtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzPVwibW9kYWwtY29udGFpbmVyXCIgb25DbGljaz17dGhpcy5jb250ZXh0LmhpZGVFZGl0U2VjdGlvbkNob3JkfT5cblx0XHRcdFx0PGRpdiBjbGFzcz1cImJveCBib3JkZXIgYm9yZGVyLWRhcmsgYmctYmFja2dyb3VuZCBzZWxlY3QtY2hvcmRcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZS1oZWFkZXIgdGV4dC1zZWNvbmRhcnkgYmctZGFyayBcIj5FRElUIENIT1JEPC9kaXY+XG5cdFx0XHRcdFx0PGhyIGNsYXNzPVwicGFuZS1kaXZpZGVyIGZvdXJcIi8+XG5cdFx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHRcdHt0aGlzLmNvbnRleHQuZ2V0Q2hvcmRMYWJlbHMoKS5tYXAoKGxhYmVsLCBpbmRleCk9Pntcblx0XHRcdFx0XHRcdFx0bGV0IGNscz1cImJveCB3LTEgYmctc3VjY2VzcyB0ZXh0LWxpZ2h0IGNob3JkIFwiO1xuXHRcdFx0XHRcdFx0XHRpZiAoaW5kZXg9PWN1cnJlbnRDaG9yZEluZGV4KVxuXHRcdFx0XHRcdFx0XHRcdGNscys9XCJhY3RpdmVcIjtcblxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdFx0XHRcdDxhIGNsYXNzPXtjbHN9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGhyZWY9XCIjXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0b25DbGljaz17dGhpcy5jb250ZXh0LmVkaXRTZWN0aW9uQ2hvcmQuYmluZChudWxsLGluZGV4KX0+XG5cdFx0XHRcdFx0XHRcdFx0XHR7bGFiZWx9XG5cdFx0XHRcdFx0XHRcdFx0PC9hPlxuXHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHR9KX1cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8YSBjbGFzcz1cImJveCBiZy1kYW5nZXIgdy0xIHRleHQtd2hpdGVcIlxuXHRcdFx0XHRcdFx0XHRocmVmPVwiI1wiXG5cdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMuY29udGV4dC5yZW1vdmVTZWN0aW9uQ2hvcmR9PlxuXHRcdFx0XHRcdFx0PGltZyBzcmM9XCJpbWcvdHJhc2guc3ZnXCIvPlxuXHRcdFx0XHRcdDwvYT5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBoLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IFNvbmdMYXllcnMgZnJvbSAnLi9Tb25nTGF5ZXJzLmpzeCc7XG5pbXBvcnQgU29uZ0Nob3JkcyBmcm9tICcuL1NvbmdDaG9yZHMuanN4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU29uZyBleHRlbmRzIENvbXBvbmVudCB7XG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzcz1cInBhbmUtY29udGFpbmVyXCI+XG5cdFx0XHRcdDxTb25nTGF5ZXJzIC8+XG5cdFx0XHRcdDxTb25nQ2hvcmRzIC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBoLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IFNlbGVjdENob3JkIGZyb20gJy4vU2VsZWN0Q2hvcmQuanN4JztcbmltcG9ydCB7IFNlbGVjdCwgSUYgfSBmcm9tICcuLi91dGlscy9SZWFjdFV0aWwuanN4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU29uZ0Nob3JkcyBleHRlbmRzIENvbXBvbmVudCB7XG5cdHJlbmRlckNvbmR1Y3RvckNob3JkcygpIHtcblx0XHRyZXR1cm4gdGhpcy5jb250ZXh0LmdldENob3JkTGFiZWxzKCkubWFwKChsYWJlbCwgaW5kZXgpPT57XG5cdFx0XHRsZXQgY2xzPVwiYm94IHctMSBiZy1zdWNjZXNzIHRleHQtbGlnaHQgY2hvcmQgXCI7XG5cdFx0XHRpZiAoaW5kZXg9PXRoaXMuY29udGV4dC5jdXJyZW50Q2hvcmRJbmRleClcblx0XHRcdFx0Y2xzKz1cIiBhY3RpdmUgYmVhdC0wIGJlYXQtNCBiZWF0LTggYmVhdC0xMlwiO1xuXG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8YSBjbGFzcz17Y2xzfVxuXHRcdFx0XHRcdFx0aHJlZj1cIiNcIlxuXHRcdFx0XHRcdFx0b25DbGljaz17dGhpcy5jb250ZXh0LnNldEN1cnJlbnRDaG9yZEluZGV4LmJpbmQobnVsbCxpbmRleCl9PlxuXHRcdFx0XHRcdHtsYWJlbH1cblx0XHRcdFx0PC9hPlxuXHRcdFx0KVxuXHRcdH0pO1xuXHR9XG5cblx0cmVuZGVyU2VjdGlvbkNob3JkcygpIHtcblx0XHRsZXQgYT10aGlzLmNvbnRleHQuZ2V0Q3VycmVudFNlY3Rpb25DaG9yZExhYmVscygpLm1hcCgobGFiZWwsIGluZGV4KT0+e1xuXHRcdFx0bGV0IGNscz1cImJveCB3LTEgYmctc3VjY2VzcyB0ZXh0LWxpZ2h0IHNlY3Rpb24tY2hvcmQgc2VxdWVuY2UtXCIraW5kZXg7XG5cblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxhIGNsYXNzPXtjbHN9XG5cdFx0XHRcdFx0XHRocmVmPVwiI1wiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLmNvbnRleHQuc2hvd0VkaXRTZWN0aW9uQ2hvcmQuYmluZChudWxsLGluZGV4KX0+XG5cdFx0XHRcdFx0e2xhYmVsfVxuXHRcdFx0XHQ8L2E+XG5cdFx0XHQpO1xuXHRcdH0pO1xuXG5cdFx0YS5wdXNoKFxuXHRcdFx0PGEgY2xhc3M9XCJib3ggYm9yZGVyIGJvcmRlci13aGl0ZSB0ZXh0LXdoaXRlIHctMVwiXG5cdFx0XHRcdFx0aHJlZj1cIiNcIlxuXHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMuY29udGV4dC5hZGRTZWN0aW9uQ2hvcmR9PlxuXHRcdFx0XHQrXG5cdFx0XHQ8L2E+XG5cdFx0KTtcblxuXHRcdHJldHVybiBhO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdGxldCBzb25nPXRoaXMuY29udGV4dC5nZXRDdXJyZW50U29uZygpO1xuXG5cdFx0bGV0IGNob3JkTGFiZWxzO1xuXHRcdGlmICh0aGlzLmNvbnRleHQuY3VycmVudFNlY3Rpb25JbmRleD09LTEpXG5cdFx0XHRjaG9yZExhYmVscz10aGlzLnJlbmRlckNvbmR1Y3RvckNob3JkcygpO1xuXG5cdFx0ZWxzZVxuXHRcdFx0Y2hvcmRMYWJlbHM9dGhpcy5yZW5kZXJTZWN0aW9uQ2hvcmRzKCk7XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzcz1cInBhbmUgYm94IGJvcmRlciBib3JkZXItZGFya1wiPlxuXHRcdFx0XHQ8aHIgY2xhc3M9XCJwYW5lLWRpdmlkZXJcIi8+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lLWhlYWRlciB0ZXh0LXNlY29uZGFyeSBiZy1kYXJrIFwiPkNIT1JEUzwvZGl2PlxuXHRcdFx0XHQ8ZGl2IHN0eWxlPXt7aGVpZ2h0OiAnNmVtJ319PntjaG9yZExhYmVsc308L2Rpdj5cblx0XHRcdFx0PGEgY2xhc3M9e1wiYm94IHctMSBiZy1zZWNvbmRhcnkgdGV4dC13aGl0ZSBcIitcblx0XHRcdFx0XHRcdFx0KCh0aGlzLmNvbnRleHQuY3VycmVudFNlY3Rpb25JbmRleD09LTEpP1wiYWN0aXZlXCI6XCJcIil9XG5cdFx0XHRcdFx0XHRocmVmPVwiI1wiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLmNvbnRleHQuc2V0Q3VycmVudFNlY3Rpb25JbmRleC5iaW5kKG51bGwsLTEpfT5cblx0XHRcdFx0XHQ8aW1nIHNyYz1cImltZy9jb25kdWN0b3Iuc3ZnXCIvPlxuXHRcdFx0XHQ8L2E+XG5cdFx0XHRcdHtbXCJBXCIsXCJCXCIsXCJDXCJdLm1hcCgobGV0dGVyLCBpbmRleCk9Pntcblx0XHRcdFx0XHRsZXQgY2xzPVwiYm94IHctMSBiZy1wcmltYXJ5IHRleHQtd2hpdGUgXCI7XG5cdFx0XHRcdFx0aWYgKGluZGV4PT10aGlzLmNvbnRleHQuY3VycmVudFNlY3Rpb25JbmRleClcblx0XHRcdFx0XHRcdGNscys9XCJhY3RpdmVcIjtcblxuXHRcdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0XHQ8YSBjbGFzcz17Y2xzfVxuXHRcdFx0XHRcdFx0XHRcdGhyZWY9XCIjXCJcblx0XHRcdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLmNvbnRleHQuc2V0Q3VycmVudFNlY3Rpb25JbmRleC5iaW5kKG51bGwsaW5kZXgpfT5cblx0XHRcdFx0XHRcdFx0e2xldHRlcn1cblx0XHRcdFx0XHRcdDwvYT5cblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9KX1cblx0XHRcdFx0e0lGKHRoaXMuY29udGV4dC5lZGl0U2VjdGlvbkNob3JkVmlzaWJsZT49MCwoKT0+XG5cdFx0XHRcdFx0PFNlbGVjdENob3JkIC8+XG5cdFx0XHRcdCl9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBoLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTb25nTGF5ZXJzIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0cmVuZGVyKCkge1xuXHRcdGxldCBzb25nPXRoaXMuY29udGV4dC5nZXRDdXJyZW50U29uZygpO1xuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lIGJveCBib3JkZXIgYm9yZGVyLWRhcmtcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInBhbmUtaGVhZGVyIHRleHQtc2Vjb25kYXJ5XCI+TEFZRVJTPC9kaXY+XG5cdFx0XHRcdHtzb25nLmxheWVycy5tYXAoKGxheWVyLGluZGV4KT0+e1xuXHRcdFx0XHRcdGxldCBjbHM9XCJib3ggYmctZGFuZ2VyIHRleHQtd2hpdGUgdy0yIFwiO1xuXHRcdFx0XHRcdGxldCBpY29uPVwiaW1nL3RvZ2dsZS1vbi5zdmdcIjtcblxuXHRcdFx0XHRcdGlmICghbGF5ZXIuYXVkaWJsZSkge1xuXHRcdFx0XHRcdFx0aWNvbj1cImltZy90b2dnbGUtb2ZmLnN2Z1wiO1xuXHRcdFx0XHRcdFx0Y2xzKz1cImZhZGVkXCI7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9e2Nsc30+XG5cdFx0XHRcdFx0XHRcdDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJsYXllci1pY29uXCJcblx0XHRcdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLmNvbnRleHQuc2V0TGF5ZXJJbmRleC5iaW5kKG51bGwsaW5kZXgpfT5cblx0XHRcdFx0XHRcdFx0XHQ8aW1nIHNyYz17XCJpbWcvXCIrdGhpcy5jb250ZXh0LmdldEluc3RydW1lbnRCeU5hbWUobGF5ZXIuaW5zdHJ1bWVudE5hbWUpLmljb259Lz5cblx0XHRcdFx0XHRcdFx0PC9hPlxuXHRcdFx0XHRcdFx0XHQ8YSBocmVmPVwiI1wiIGNsYXNzPVwibGF5ZXItaWNvblwiXG5cdFx0XHRcdFx0XHRcdFx0b25DbGljaz17dGhpcy5jb250ZXh0LnRvZ2dsZUxheWVyQXVkaWJsZS5iaW5kKG51bGwsaW5kZXgpfT5cblx0XHRcdFx0XHRcdFx0XHQ8aW1nIHNyYz17aWNvbn0vPlxuXHRcdFx0XHRcdFx0XHQ8L2E+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9KX1cblxuXHRcdFx0XHQ8YSBjbGFzcz1cImJveCBib3JkZXIgYm9yZGVyLXdoaXRlIHRleHQtd2hpdGUgdy0xXCJcblx0XHRcdFx0XHRcdGhyZWY9XCIjXCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMuY29udGV4dC5zaG93QWRkTGF5ZXJ9PlxuXHRcdFx0XHRcdCtcblx0XHRcdFx0PC9hPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuIiwiaW1wb3J0IHsgaCwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCB7IFNlbGVjdCwgSUYgfSBmcm9tICcuLi91dGlscy9SZWFjdFV0aWwuanN4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU29uZ1NldHRpbmdzIHtcblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZS1jb250YWluZXJcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInBhbmUgYm94IGRvdWJsZSBiZy1kYXJrXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInBhbmUtaGVhZGVyIGJnLWRhcmsgdGV4dC1zZWNvbmRhcnlcIj5TT05HIFNFVFRJTkdTPC9kaXY+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG5cdFx0XHRcdFx0XHRTb25nIE5hbWU8YnIvPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImJveCBib3JkZXIgYmctd2hpdGUgYm9yZGVyLWJsYWNrIHRleHQtYmxhY2sgdy00XCI+XG5cdFx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwidGV4dFwiXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU9e3RoaXMuY29udGV4dC5nZXRDdXJyZW50U29uZygpLm5hbWV9XG5cdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuY29udGV4dC5zZXRDdXJyZW50U29uZ05hbWV9Lz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG5cdFx0XHRcdFx0XHRUZW1wbzxici8+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYm94IGJvcmRlciBiZy13aGl0ZSBib3JkZXItYmxhY2sgdGV4dC1ibGFjayB3LTRcIj5cblx0XHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJ0ZXh0XCJcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17dGhpcy5jb250ZXh0LmdldEN1cnJlbnRTb25nKCkuYnBtfVxuXHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLmNvbnRleHQuc2V0Q3VycmVudFNvbmdCcG19Lz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG5cdFx0XHRcdFx0XHRLZXk8YnIvPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImJveCBib3JkZXIgYmctd2hpdGUgYm9yZGVyLWJsYWNrIHRleHQtYmxhY2sgdy0yXCI+XG5cdFx0XHRcdFx0XHRcdDxTZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2wgY29sLTJcIlxuXHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucz17dGhpcy5jb250ZXh0LmdldE5vdGVzU2VsZWN0T3B0aW9ucygpfVxuXHRcdFx0XHRcdFx0XHRcdFx0c2VsZWN0ZWQ9e3RoaXMuY29udGV4dC5nZXRDdXJyZW50U29uZygpLm11c2ljS2V5fVxuXHRcdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuY29udGV4dC5zZXRDdXJyZW50U29uZ011c2ljS2V5fS8+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJib3ggYm9yZGVyIGJnLXdoaXRlIGJvcmRlci1ibGFjayB0ZXh0LWJsYWNrIHctMlwiPlxuXHRcdFx0XHRcdFx0XHQ8U2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sIGNvbC00XCJcblx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnM9e3RoaXMuY29udGV4dC5nZXRNb2RhbFNlbGVjdE9wdGlvbnMoKX1cblx0XHRcdFx0XHRcdFx0XHRcdHNlbGVjdGVkPXt0aGlzLmNvbnRleHQuZ2V0Q3VycmVudFNvbmcoKS5taW5vcn1cblx0XHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLmNvbnRleHQuc2V0Q3VycmVudFNvbmdNaW5vcn0vPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZm9ybS1idXR0b25zXCI+XG5cdFx0XHRcdFx0XHQ8YSBjbGFzcz1cImJnLWRhbmdlciBib3ggdGV4dC13aGl0ZVwiXG5cdFx0XHRcdFx0XHRcdFx0aHJlZj1cIiNcIlxuXHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMuY29udGV4dC5kZWxldGVDdXJyZW50U29uZ30+XG5cdFx0XHRcdFx0XHRcdFJlbW92ZSBTb25nXG5cdFx0XHRcdFx0XHQ8L2E+XG5cdFx0XHRcdFx0XHQ8YSBjbGFzcz1cImJnLXByaW1hcnkgYm94IHRleHQtd2hpdGVcIlxuXHRcdFx0XHRcdFx0XHRcdGhyZWY9XCIjXCJcblx0XHRcdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLmNvbnRleHQudG9nZ2xlU2V0dGluZ3N9PlxuXHRcdFx0XHRcdFx0XHRDbG9zZVxuXHRcdFx0XHRcdFx0PC9hPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbiJdfQ==
