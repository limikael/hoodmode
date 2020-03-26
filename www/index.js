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
  "version": "0.0.3",
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
      "android"
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

},{"./model/AppController.js":17,"./model/AppHelper.js":18,"./model/Conductor.js":19,"./utils/AppContext.js":23,"./view/App.jsx":32,"preact":4,"preact/debug":2,"shortid":6}],17:[function(require,module,exports){
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
        editSectionChordVisible: -1,
        aboutScreenVisible: false
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

},{"regenerator-runtime/runtime":5,"shortid":6}],18:[function(require,module,exports){
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

},{"../../package.json":15,"../utils/MusicUtil.js":26}],19:[function(require,module,exports){
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

},{"../utils/AudioTimer":24,"../utils/AudioUtil":25,"../utils/MusicUtil":26,"../utils/ReconcileArray":28,"./ConductorInstrument":20,"./ConductorLayer":21}],20:[function(require,module,exports){
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

},{"../utils/AudioUtil":25,"../utils/MusicUtil":26,"./ConductorNote":22}],21:[function(require,module,exports){
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

},{"../utils/MusicUtil":26}],23:[function(require,module,exports){
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

},{"preact":4}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
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

},{"preact":4}],28:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
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

},{"preact":4}],30:[function(require,module,exports){
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

},{"../utils/ReactUtil.jsx":27,"./A.jsx":29,"preact":4}],31:[function(require,module,exports){
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

},{"./A.jsx":29,"preact":4}],32:[function(require,module,exports){
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
      }));
    }
  }]);

  return App;
}(_preact.Component);

exports["default"] = App;

},{"../utils/ReactUtil.jsx":27,"./A.jsx":29,"./AboutScreen.jsx":30,"./AddLayer.jsx":31,"./Front.jsx":33,"./Header.jsx":34,"./Layer.jsx":35,"./LayerSettings.jsx":36,"./SelectChord.jsx":37,"./Song.jsx":38,"./SongSettings.jsx":41,"./TapHighlight.jsx":42,"preact":4}],33:[function(require,module,exports){
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

},{"./A.jsx":29,"preact":4}],34:[function(require,module,exports){
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

},{"../utils/ReactUtil.jsx":27,"./A.jsx":29,"preact":4}],35:[function(require,module,exports){
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

},{"./A.jsx":29,"preact":4}],36:[function(require,module,exports){
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

},{"./A.jsx":29,"preact":4}],37:[function(require,module,exports){
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

},{"../utils/ReactUtil.jsx":27,"./A.jsx":29,"preact":4}],38:[function(require,module,exports){
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

},{"./A.jsx":29,"./SongChords.jsx":39,"./SongLayers.jsx":40,"preact":4}],39:[function(require,module,exports){
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

},{"../utils/ReactUtil.jsx":27,"./A.jsx":29,"./SelectChord.jsx":37,"preact":4}],40:[function(require,module,exports){
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

},{"./A.jsx":29,"preact":4}],41:[function(require,module,exports){
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

},{"../utils/ReactUtil.jsx":27,"./A.jsx":29,"preact":4}],42:[function(require,module,exports){
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

},{"../utils/ReactUtil.jsx":27,"./A.jsx":29,"preact":4}]},{},[16])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbmFub2lkL2Zvcm1hdC5icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9kZWJ1Zy9kaXN0L2RlYnVnLmpzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9kZXZ0b29scy9kaXN0L2RldnRvb2xzLmpzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9kaXN0L3ByZWFjdC5qcyIsIm5vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiLCJub2RlX21vZHVsZXMvc2hvcnRpZC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9hbHBoYWJldC5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9idWlsZC5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9nZW5lcmF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9pcy12YWxpZC5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9yYW5kb20vcmFuZG9tLWJ5dGUtYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9yYW5kb20vcmFuZG9tLWZyb20tc2VlZC5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi91dGlsL2NsdXN0ZXItd29ya2VyLWlkLWJyb3dzZXIuanMiLCJwYWNrYWdlLmpzb24iLCJzcmMvaW5kZXguanN4Iiwic3JjL21vZGVsL0FwcENvbnRyb2xsZXIuanMiLCJzcmMvbW9kZWwvQXBwSGVscGVyLmpzIiwic3JjL21vZGVsL0NvbmR1Y3Rvci5qcyIsInNyYy9tb2RlbC9Db25kdWN0b3JJbnN0cnVtZW50LmpzIiwic3JjL21vZGVsL0NvbmR1Y3RvckxheWVyLmpzIiwic3JjL21vZGVsL0NvbmR1Y3Rvck5vdGUuanMiLCJzcmMvdXRpbHMvQXBwQ29udGV4dC5qcyIsInNyYy91dGlscy9BdWRpb1RpbWVyLmpzIiwic3JjL3V0aWxzL0F1ZGlvVXRpbC5qcyIsInNyYy91dGlscy9NdXNpY1V0aWwuanMiLCJzcmMvdXRpbHMvUmVhY3RVdGlsLmpzeCIsInNyYy91dGlscy9SZWNvbmNpbGVBcnJheS5qcyIsInNyYy92aWV3L0EuanN4Iiwic3JjL3ZpZXcvQWJvdXRTY3JlZW4uanN4Iiwic3JjL3ZpZXcvQWRkTGF5ZXIuanN4Iiwic3JjL3ZpZXcvQXBwLmpzeCIsInNyYy92aWV3L0Zyb250LmpzeCIsInNyYy92aWV3L0hlYWRlci5qc3giLCJzcmMvdmlldy9MYXllci5qc3giLCJzcmMvdmlldy9MYXllclNldHRpbmdzLmpzeCIsInNyYy92aWV3L1NlbGVjdENob3JkLmpzeCIsInNyYy92aWV3L1NvbmcuanN4Iiwic3JjL3ZpZXcvU29uZ0Nob3Jkcy5qc3giLCJzcmMvdmlldy9Tb25nTGF5ZXJzLmpzeCIsInNyYy92aWV3L1NvbmdTZXR0aW5ncy5qc3giLCJzcmMvdmlldy9UYXBIaWdobGlnaHQuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdHRCQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzVDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLElBQUksU0FBSixFQUFlLFNBQWYsRUFBMEIsYUFBMUI7O0FBRUEsSUFBSTtBQUNILEVBQUEsU0FBUyxHQUFDLElBQUkscUJBQUosRUFB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LE1BQUEsUUFBUSxDQUFDLG1CQUFULENBQTZCLFNBQTdCLEVBQXVDLEtBQUssU0FBNUM7QUFDQTs7OzZCQUVRO0FBQ1IsYUFDQztBQUFLLGlCQUFNO0FBQVgsU0FDRSxtQkFBRyxLQUFLLEtBQUwsQ0FBVyxhQUFkLEVBQTRCO0FBQUEsZUFDNUI7QUFBSyxVQUFBLEdBQUcsRUFBQztBQUFULFVBRDRCO0FBQUEsT0FBNUIsQ0FERixDQUREO0FBT0E7Ozs7RUE5Q3dDLGlCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gVGhpcyBmaWxlIHJlcGxhY2VzIGBmb3JtYXQuanNgIGluIGJ1bmRsZXJzIGxpa2Ugd2VicGFjayBvciBSb2xsdXAsXG4vLyBhY2NvcmRpbmcgdG8gYGJyb3dzZXJgIGNvbmZpZyBpbiBgcGFja2FnZS5qc29uYC5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAocmFuZG9tLCBhbHBoYWJldCwgc2l6ZSkge1xuICAvLyBXZSBjYW7igJl0IHVzZSBieXRlcyBiaWdnZXIgdGhhbiB0aGUgYWxwaGFiZXQuIFRvIG1ha2UgYnl0ZXMgdmFsdWVzIGNsb3NlclxuICAvLyB0byB0aGUgYWxwaGFiZXQsIHdlIGFwcGx5IGJpdG1hc2sgb24gdGhlbS4gV2UgbG9vayBmb3IgdGhlIGNsb3Nlc3RcbiAgLy8gYDIgKiogeCAtIDFgIG51bWJlciwgd2hpY2ggd2lsbCBiZSBiaWdnZXIgdGhhbiBhbHBoYWJldCBzaXplLiBJZiB3ZSBoYXZlXG4gIC8vIDMwIHN5bWJvbHMgaW4gdGhlIGFscGhhYmV0LCB3ZSB3aWxsIHRha2UgMzEgKDAwMDExMTExKS5cbiAgLy8gV2UgZG8gbm90IHVzZSBmYXN0ZXIgTWF0aC5jbHozMiwgYmVjYXVzZSBpdCBpcyBub3QgYXZhaWxhYmxlIGluIGJyb3dzZXJzLlxuICB2YXIgbWFzayA9ICgyIDw8IE1hdGgubG9nKGFscGhhYmV0Lmxlbmd0aCAtIDEpIC8gTWF0aC5MTjIpIC0gMVxuICAvLyBCaXRtYXNrIGlzIG5vdCBhIHBlcmZlY3Qgc29sdXRpb24gKGluIG91ciBleGFtcGxlIGl0IHdpbGwgcGFzcyAzMSBieXRlcyxcbiAgLy8gd2hpY2ggaXMgYmlnZ2VyIHRoYW4gdGhlIGFscGhhYmV0KS4gQXMgYSByZXN1bHQsIHdlIHdpbGwgbmVlZCBtb3JlIGJ5dGVzLFxuICAvLyB0aGFuIElEIHNpemUsIGJlY2F1c2Ugd2Ugd2lsbCByZWZ1c2UgYnl0ZXMgYmlnZ2VyIHRoYW4gdGhlIGFscGhhYmV0LlxuXG4gIC8vIEV2ZXJ5IGhhcmR3YXJlIHJhbmRvbSBnZW5lcmF0b3IgY2FsbCBpcyBjb3N0bHksXG4gIC8vIGJlY2F1c2Ugd2UgbmVlZCB0byB3YWl0IGZvciBlbnRyb3B5IGNvbGxlY3Rpb24uIFRoaXMgaXMgd2h5IG9mdGVuIGl0IHdpbGxcbiAgLy8gYmUgZmFzdGVyIHRvIGFzayBmb3IgZmV3IGV4dHJhIGJ5dGVzIGluIGFkdmFuY2UsIHRvIGF2b2lkIGFkZGl0aW9uYWwgY2FsbHMuXG5cbiAgLy8gSGVyZSB3ZSBjYWxjdWxhdGUgaG93IG1hbnkgcmFuZG9tIGJ5dGVzIHNob3VsZCB3ZSBjYWxsIGluIGFkdmFuY2UuXG4gIC8vIEl0IGRlcGVuZHMgb24gSUQgbGVuZ3RoLCBtYXNrIC8gYWxwaGFiZXQgc2l6ZSBhbmQgbWFnaWMgbnVtYmVyIDEuNlxuICAvLyAod2hpY2ggd2FzIHNlbGVjdGVkIGFjY29yZGluZyBiZW5jaG1hcmtzKS5cblxuICAvLyAtfmYgPT4gTWF0aC5jZWlsKGYpIGlmIG4gaXMgZmxvYXQgbnVtYmVyXG4gIC8vIC1+aSA9PiBpICsgMSBpZiBuIGlzIGludGVnZXIgbnVtYmVyXG4gIHZhciBzdGVwID0gLX4oMS42ICogbWFzayAqIHNpemUgLyBhbHBoYWJldC5sZW5ndGgpXG4gIHZhciBpZCA9ICcnXG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICB2YXIgYnl0ZXMgPSByYW5kb20oc3RlcClcbiAgICAvLyBDb21wYWN0IGFsdGVybmF0aXZlIGZvciBgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGVwOyBpKyspYFxuICAgIHZhciBpID0gc3RlcFxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIC8vIElmIHJhbmRvbSBieXRlIGlzIGJpZ2dlciB0aGFuIGFscGhhYmV0IGV2ZW4gYWZ0ZXIgYml0bWFzayxcbiAgICAgIC8vIHdlIHJlZnVzZSBpdCBieSBgfHwgJydgLlxuICAgICAgaWQgKz0gYWxwaGFiZXRbYnl0ZXNbaV0gJiBtYXNrXSB8fCAnJ1xuICAgICAgLy8gTW9yZSBjb21wYWN0IHRoYW4gYGlkLmxlbmd0aCArIDEgPT09IHNpemVgXG4gICAgICBpZiAoaWQubGVuZ3RoID09PSArc2l6ZSkgcmV0dXJuIGlkXG4gICAgfVxuICB9XG59XG4iLCJ2YXIgbj1yZXF1aXJlKFwicHJlYWN0XCIpO3JlcXVpcmUoXCJwcmVhY3QvZGV2dG9vbHNcIik7dmFyIGU9e307ZnVuY3Rpb24gdChlKXtyZXR1cm4gZS50eXBlPT09bi5GcmFnbWVudD9cIkZyYWdtZW50XCI6XCJmdW5jdGlvblwiPT10eXBlb2YgZS50eXBlP2UudHlwZS5kaXNwbGF5TmFtZXx8ZS50eXBlLm5hbWU6XCJzdHJpbmdcIj09dHlwZW9mIGUudHlwZT9lLnR5cGU6XCIjdGV4dFwifXZhciBvPVtdLHI9W107ZnVuY3Rpb24gYSgpe3JldHVybiBvLmxlbmd0aD4wP29bby5sZW5ndGgtMV06bnVsbH12YXIgaT0hMTtmdW5jdGlvbiBzKGUpe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIGUudHlwZSYmZS50eXBlIT09bi5GcmFnbWVudH1mdW5jdGlvbiBjKG4pe2Zvcih2YXIgZT1bbl0sbz1uO251bGwhPW8uX19vOyllLnB1c2goby5fX28pLG89by5fX287cmV0dXJuIGUucmVkdWNlKGZ1bmN0aW9uKG4sZSl7bis9XCIgIGluIFwiK3QoZSk7dmFyIG89ZS5fX3NvdXJjZTtyZXR1cm4gbz9uKz1cIiAoYXQgXCIrby5maWxlTmFtZStcIjpcIitvLmxpbmVOdW1iZXIrXCIpXCI6aXx8KGk9ITAsY29uc29sZS53YXJuKFwiQWRkIEBiYWJlbC9wbHVnaW4tdHJhbnNmb3JtLXJlYWN0LWpzeC1zb3VyY2UgdG8gZ2V0IGEgbW9yZSBkZXRhaWxlZCBjb21wb25lbnQgc3RhY2suIE5vdGUgdGhhdCB5b3Ugc2hvdWxkIG5vdCBhZGQgaXQgdG8gcHJvZHVjdGlvbiBidWlsZHMgb2YgeW91ciBBcHAgZm9yIGJ1bmRsZSBzaXplIHJlYXNvbnMuXCIpKSxuK1wiXFxuXCJ9LFwiXCIpfXZhciBsPVwiZnVuY3Rpb25cIj09dHlwZW9mIFdlYWtNYXAsdT1uLkNvbXBvbmVudC5wcm90b3R5cGUuc2V0U3RhdGU7bi5Db21wb25lbnQucHJvdG90eXBlLnNldFN0YXRlPWZ1bmN0aW9uKG4sZSl7cmV0dXJuIG51bGw9PXRoaXMuX192P251bGw9PXRoaXMuc3RhdGUmJmNvbnNvbGUud2FybignQ2FsbGluZyBcInRoaXMuc2V0U3RhdGVcIiBpbnNpZGUgdGhlIGNvbnN0cnVjdG9yIG9mIGEgY29tcG9uZW50IGlzIGEgbm8tb3AgYW5kIG1pZ2h0IGJlIGEgYnVnIGluIHlvdXIgYXBwbGljYXRpb24uIEluc3RlYWQsIHNldCBcInRoaXMuc3RhdGUgPSB7fVwiIGRpcmVjdGx5LlxcblxcbicrYyhhKCkpKTpudWxsPT10aGlzLl9fUCYmY29uc29sZS53YXJuKCdDYW5cXCd0IGNhbGwgXCJ0aGlzLnNldFN0YXRlXCIgb24gYW4gdW5tb3VudGVkIGNvbXBvbmVudC4gVGhpcyBpcyBhIG5vLW9wLCBidXQgaXQgaW5kaWNhdGVzIGEgbWVtb3J5IGxlYWsgaW4geW91ciBhcHBsaWNhdGlvbi4gVG8gZml4LCBjYW5jZWwgYWxsIHN1YnNjcmlwdGlvbnMgYW5kIGFzeW5jaHJvbm91cyB0YXNrcyBpbiB0aGUgY29tcG9uZW50V2lsbFVubW91bnQgbWV0aG9kLlxcblxcbicrYyh0aGlzLl9fdikpLHUuY2FsbCh0aGlzLG4sZSl9O3ZhciBmPW4uQ29tcG9uZW50LnByb3RvdHlwZS5mb3JjZVVwZGF0ZTtmdW5jdGlvbiBwKG4pe3ZhciBlPW4ucHJvcHMsbz10KG4pLHI9XCJcIjtmb3IodmFyIGEgaW4gZSlpZihlLmhhc093blByb3BlcnR5KGEpJiZcImNoaWxkcmVuXCIhPT1hKXt2YXIgaT1lW2FdO1wiZnVuY3Rpb25cIj09dHlwZW9mIGkmJihpPVwiZnVuY3Rpb24gXCIrKGkuZGlzcGxheU5hbWV8fGkubmFtZSkrXCIoKSB7fVwiKSxpPU9iamVjdChpKSE9PWl8fGkudG9TdHJpbmc/aStcIlwiOk9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpKSxyKz1cIiBcIithK1wiPVwiK0pTT04uc3RyaW5naWZ5KGkpfXZhciBzPWUuY2hpbGRyZW47cmV0dXJuXCI8XCIrbytyKyhzJiZzLmxlbmd0aD9cIj4uLjwvXCIrbytcIj5cIjpcIiAvPlwiKX1uLkNvbXBvbmVudC5wcm90b3R5cGUuZm9yY2VVcGRhdGU9ZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PXRoaXMuX192P2NvbnNvbGUud2FybignQ2FsbGluZyBcInRoaXMuZm9yY2VVcGRhdGVcIiBpbnNpZGUgdGhlIGNvbnN0cnVjdG9yIG9mIGEgY29tcG9uZW50IGlzIGEgbm8tb3AgYW5kIG1pZ2h0IGJlIGEgYnVnIGluIHlvdXIgYXBwbGljYXRpb24uXFxuXFxuJytjKGEoKSkpOm51bGw9PXRoaXMuX19QJiZjb25zb2xlLndhcm4oJ0NhblxcJ3QgY2FsbCBcInRoaXMuZm9yY2VVcGRhdGVcIiBvbiBhbiB1bm1vdW50ZWQgY29tcG9uZW50LiBUaGlzIGlzIGEgbm8tb3AsIGJ1dCBpdCBpbmRpY2F0ZXMgYSBtZW1vcnkgbGVhayBpbiB5b3VyIGFwcGxpY2F0aW9uLiBUbyBmaXgsIGNhbmNlbCBhbGwgc3Vic2NyaXB0aW9ucyBhbmQgYXN5bmNocm9ub3VzIHRhc2tzIGluIHRoZSBjb21wb25lbnRXaWxsVW5tb3VudCBtZXRob2QuXFxuXFxuJytjKHRoaXMuX192KSksZi5jYWxsKHRoaXMsbil9LGZ1bmN0aW9uKCl7IWZ1bmN0aW9uKCl7dmFyIGU9bi5vcHRpb25zLl9fYix0PW4ub3B0aW9ucy5kaWZmZWQsYT1uLm9wdGlvbnMuX18saT1uLm9wdGlvbnMudm5vZGUsYz1uLm9wdGlvbnMuX19yO24ub3B0aW9ucy5kaWZmZWQ9ZnVuY3Rpb24obil7cyhuKSYmci5wb3AoKSxvLnBvcCgpLHQmJnQobil9LG4ub3B0aW9ucy5fX2I9ZnVuY3Rpb24obil7cyhuKSYmby5wdXNoKG4pLGUmJmUobil9LG4ub3B0aW9ucy5fXz1mdW5jdGlvbihuLGUpe3I9W10sYSYmYShuLGUpfSxuLm9wdGlvbnMudm5vZGU9ZnVuY3Rpb24obil7bi5fX289ci5sZW5ndGg+MD9yW3IubGVuZ3RoLTFdOm51bGwsaSYmaShuKX0sbi5vcHRpb25zLl9fcj1mdW5jdGlvbihuKXtzKG4pJiZyLnB1c2gobiksYyYmYyhuKX19KCk7dmFyIGE9bi5vcHRpb25zLl9fYixpPW4ub3B0aW9ucy5kaWZmZWQsdT1uLm9wdGlvbnMudm5vZGUsZj1uLm9wdGlvbnMuX19lLGQ9bi5vcHRpb25zLl9fLGg9bi5vcHRpb25zLl9faCx5PWw/e3VzZUVmZmVjdDpuZXcgV2Vha01hcCx1c2VMYXlvdXRFZmZlY3Q6bmV3IFdlYWtNYXAsbGF6eVByb3BUeXBlczpuZXcgV2Vha01hcH06bnVsbDtuLm9wdGlvbnMuX19lPWZ1bmN0aW9uKG4sZSxvKXtpZihlJiZlLl9fYyYmXCJmdW5jdGlvblwiPT10eXBlb2Ygbi50aGVuKXt2YXIgcj1uO249bmV3IEVycm9yKFwiTWlzc2luZyBTdXNwZW5zZS4gVGhlIHRocm93aW5nIGNvbXBvbmVudCB3YXM6IFwiK3QoZSkpO2Zvcih2YXIgYT1lO2E7YT1hLl9fKWlmKGEuX19jJiZhLl9fYy5fX2Mpe249cjticmVha31pZihuIGluc3RhbmNlb2YgRXJyb3IpdGhyb3cgbn1mKG4sZSxvKX0sbi5vcHRpb25zLl9fPWZ1bmN0aW9uKG4sZSl7aWYoIWUpdGhyb3cgbmV3IEVycm9yKFwiVW5kZWZpbmVkIHBhcmVudCBwYXNzZWQgdG8gcmVuZGVyKCksIHRoaXMgaXMgdGhlIHNlY29uZCBhcmd1bWVudC5cXG5DaGVjayBpZiB0aGUgZWxlbWVudCBpcyBhdmFpbGFibGUgaW4gdGhlIERPTS9oYXMgdGhlIGNvcnJlY3QgaWQuXCIpO3ZhciBvO3N3aXRjaChlLm5vZGVUeXBlKXtjYXNlIDE6Y2FzZSAxMTpjYXNlIDk6bz0hMDticmVhaztkZWZhdWx0Om89ITF9aWYoIW8pe3ZhciByPXQobik7dGhyb3cgbmV3IEVycm9yKFwiRXhwZWN0ZWQgYSB2YWxpZCBIVE1MIG5vZGUgYXMgYSBzZWNvbmQgYXJndW1lbnQgdG8gcmVuZGVyLlxcdFJlY2VpdmVkIFwiK2UrXCIgaW5zdGVhZDogcmVuZGVyKDxcIityK1wiIC8+LCBcIitlK1wiKTtcIil9ZCYmZChuLGUpfSxuLm9wdGlvbnMuX19iPWZ1bmN0aW9uKG4pe3ZhciBvLHIsaSxzLGw9bi50eXBlLHU9ZnVuY3Rpb24gbihlKXtyZXR1cm4gZT9cImZ1bmN0aW9uXCI9PXR5cGVvZiBlLnR5cGU/bihlLl9fKTplOnt9fShuLl9fKTtpZih2b2lkIDA9PT1sKXRocm93IG5ldyBFcnJvcihcIlVuZGVmaW5lZCBjb21wb25lbnQgcGFzc2VkIHRvIGNyZWF0ZUVsZW1lbnQoKVxcblxcbllvdSBsaWtlbHkgZm9yZ290IHRvIGV4cG9ydCB5b3VyIGNvbXBvbmVudCBvciBtaWdodCBoYXZlIG1peGVkIHVwIGRlZmF1bHQgYW5kIG5hbWVkIGltcG9ydHNcIitwKG4pK1wiXFxuXFxuXCIrYyhuKSk7aWYobnVsbCE9bCYmXCJvYmplY3RcIj09dHlwZW9mIGwpe2lmKHZvaWQgMCE9PWwuX19rJiZ2b2lkIDAhPT1sLl9fZSl0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHR5cGUgcGFzc2VkIHRvIGNyZWF0ZUVsZW1lbnQoKTogXCIrbCtcIlxcblxcbkRpZCB5b3UgYWNjaWRlbnRhbGx5IHBhc3MgYSBKU1ggbGl0ZXJhbCBhcyBKU1ggdHdpY2U/XFxuXFxuICBsZXQgTXlcIit0KG4pK1wiID0gXCIrcChsKStcIjtcXG4gIGxldCB2bm9kZSA9IDxNeVwiK3QobikrXCIgLz47XFxuXFxuVGhpcyB1c3VhbGx5IGhhcHBlbnMgd2hlbiB5b3UgZXhwb3J0IGEgSlNYIGxpdGVyYWwgYW5kIG5vdCB0aGUgY29tcG9uZW50LlxcblxcblwiK2MobikpO3Rocm93IG5ldyBFcnJvcihcIkludmFsaWQgdHlwZSBwYXNzZWQgdG8gY3JlYXRlRWxlbWVudCgpOiBcIisoQXJyYXkuaXNBcnJheShsKT9cImFycmF5XCI6bCkpfWlmKFwidGhlYWRcIiE9PWwmJlwidGZvb3RcIiE9PWwmJlwidGJvZHlcIiE9PWx8fFwidGFibGVcIj09PXUudHlwZT9cInRyXCI9PT1sJiZcInRoZWFkXCIhPT11LnR5cGUmJlwidGZvb3RcIiE9PXUudHlwZSYmXCJ0Ym9keVwiIT09dS50eXBlJiZcInRhYmxlXCIhPT11LnR5cGU/Y29uc29sZS5lcnJvcihcIkltcHJvcGVyIG5lc3Rpbmcgb2YgdGFibGUuIFlvdXIgPHRyPiBzaG91bGQgaGF2ZSBhIDx0aGVhZC90Ym9keS90Zm9vdC90YWJsZT4gcGFyZW50LlwiK3AobikrXCJcXG5cXG5cIitjKG4pKTpcInRkXCI9PT1sJiZcInRyXCIhPT11LnR5cGU/Y29uc29sZS5lcnJvcihcIkltcHJvcGVyIG5lc3Rpbmcgb2YgdGFibGUuIFlvdXIgPHRkPiBzaG91bGQgaGF2ZSBhIDx0cj4gcGFyZW50LlwiK3AobikrXCJcXG5cXG5cIitjKG4pKTpcInRoXCI9PT1sJiZcInRyXCIhPT11LnR5cGUmJmNvbnNvbGUuZXJyb3IoXCJJbXByb3BlciBuZXN0aW5nIG9mIHRhYmxlLiBZb3VyIDx0aD4gc2hvdWxkIGhhdmUgYSA8dHI+LlwiK3AobikrXCJcXG5cXG5cIitjKG4pKTpjb25zb2xlLmVycm9yKFwiSW1wcm9wZXIgbmVzdGluZyBvZiB0YWJsZS4gWW91ciA8dGhlYWQvdGJvZHkvdGZvb3Q+IHNob3VsZCBoYXZlIGEgPHRhYmxlPiBwYXJlbnQuXCIrcChuKStcIlxcblxcblwiK2MobikpLHZvaWQgMCE9PW4ucmVmJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiBuLnJlZiYmXCJvYmplY3RcIiE9dHlwZW9mIG4ucmVmJiYhKFwiJCR0eXBlb2ZcImluIG4pKXRocm93IG5ldyBFcnJvcignQ29tcG9uZW50XFwncyBcInJlZlwiIHByb3BlcnR5IHNob3VsZCBiZSBhIGZ1bmN0aW9uLCBvciBhbiBvYmplY3QgY3JlYXRlZCBieSBjcmVhdGVSZWYoKSwgYnV0IGdvdCBbJyt0eXBlb2Ygbi5yZWYrXCJdIGluc3RlYWRcXG5cIitwKG4pK1wiXFxuXFxuXCIrYyhuKSk7aWYoXCJzdHJpbmdcIj09dHlwZW9mIG4udHlwZSlmb3IodmFyIGYgaW4gbi5wcm9wcylpZihcIm9cIj09PWZbMF0mJlwiblwiPT09ZlsxXSYmXCJmdW5jdGlvblwiIT10eXBlb2Ygbi5wcm9wc1tmXSYmbnVsbCE9bi5wcm9wc1tmXSl0aHJvdyBuZXcgRXJyb3IoXCJDb21wb25lbnQncyBcXFwiXCIrZisnXCIgcHJvcGVydHkgc2hvdWxkIGJlIGEgZnVuY3Rpb24sIGJ1dCBnb3QgWycrdHlwZW9mIG4ucHJvcHNbZl0rXCJdIGluc3RlYWRcXG5cIitwKG4pK1wiXFxuXFxuXCIrYyhuKSk7aWYoXCJmdW5jdGlvblwiPT10eXBlb2Ygbi50eXBlJiZuLnR5cGUucHJvcFR5cGVzKXtpZihcIkxhenlcIj09PW4udHlwZS5kaXNwbGF5TmFtZSYmeSYmIXkubGF6eVByb3BUeXBlcy5oYXMobi50eXBlKSl7dmFyIGQ9XCJQcm9wVHlwZXMgYXJlIG5vdCBzdXBwb3J0ZWQgb24gbGF6eSgpLiBVc2UgcHJvcFR5cGVzIG9uIHRoZSB3cmFwcGVkIGNvbXBvbmVudCBpdHNlbGYuIFwiO3RyeXt2YXIgaD1uLnR5cGUoKTt5LmxhenlQcm9wVHlwZXMuc2V0KG4udHlwZSwhMCksY29uc29sZS53YXJuKGQrXCJDb21wb25lbnQgd3JhcHBlZCBpbiBsYXp5KCkgaXMgXCIrdChoKSl9Y2F0Y2gobil7Y29uc29sZS53YXJuKGQrXCJXZSB3aWxsIGxvZyB0aGUgd3JhcHBlZCBjb21wb25lbnQncyBuYW1lIG9uY2UgaXQgaXMgbG9hZGVkLlwiKX19bz1uLnR5cGUucHJvcFR5cGVzLHI9bi5wcm9wcyxpPXQobikscz1wKG4pLE9iamVjdC5rZXlzKG8pLmZvckVhY2goZnVuY3Rpb24obil7dmFyIHQ7dHJ5e3Q9b1tuXShyLG4scyxpLG51bGwsXCJTRUNSRVRfRE9fTk9UX1BBU1NfVEhJU19PUl9ZT1VfV0lMTF9CRV9GSVJFRFwiKX1jYXRjaChuKXt0PW59IXR8fHQubWVzc2FnZSBpbiBlfHwoZVt0Lm1lc3NhZ2VdPSEwLGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgXCIraStcIiB0eXBlOiBcIit0Lm1lc3NhZ2UpKX0pfWEmJmEobil9LG4ub3B0aW9ucy5fX2g9ZnVuY3Rpb24obil7aWYoIW4pdGhyb3cgbmV3IEVycm9yKFwiSG9vayBjYW4gb25seSBiZSBpbnZva2VkIGZyb20gcmVuZGVyIG1ldGhvZHMuXCIpO2gmJmgobil9O3ZhciB2PWZ1bmN0aW9uKG4sZSl7cmV0dXJue2dldDpmdW5jdGlvbigpe3Rocm93IG5ldyBFcnJvcihcImdldHRpbmcgdm5vZGUuXCIrbitcIiBpcyBkZXByZWNhdGVkLCBcIitlKX0sc2V0OmZ1bmN0aW9uKCl7dGhyb3cgbmV3IEVycm9yKFwic2V0dGluZyB2bm9kZS5cIituK1wiIGlzIG5vdCBhbGxvd2VkLCBcIitlKX19fSxtPXtub2RlTmFtZTp2KFwibm9kZU5hbWVcIixcInVzZSB2bm9kZS50eXBlXCIpLGF0dHJpYnV0ZXM6dihcImF0dHJpYnV0ZXNcIixcInVzZSB2bm9kZS5wcm9wc1wiKSxjaGlsZHJlbjp2KFwiY2hpbGRyZW5cIixcInVzZSB2bm9kZS5wcm9wcy5jaGlsZHJlblwiKX0sYj1PYmplY3QuY3JlYXRlKHt9LG0pO24ub3B0aW9ucy52bm9kZT1mdW5jdGlvbihuKXt2YXIgZT1uLnByb3BzO2lmKG51bGwhPT1uLnR5cGUmJm51bGwhPWUmJihcIl9fc291cmNlXCJpbiBlfHxcIl9fc2VsZlwiaW4gZSkpe3ZhciB0PW4ucHJvcHM9e307Zm9yKHZhciBvIGluIGUpe3ZhciByPWVbb107XCJfX3NvdXJjZVwiPT09bz9uLl9fc291cmNlPXI6XCJfX3NlbGZcIj09PW8/bi5fX3NlbGY9cjp0W29dPXJ9fU9iamVjdC5zZXRQcm90b3R5cGVPZihuLGIpLHUmJnUobil9LG4ub3B0aW9ucy5kaWZmZWQ9ZnVuY3Rpb24obil7bi5fX2smJm4uX19rLmZvckVhY2goZnVuY3Rpb24obil7aWYobiYmdm9pZCAwPT09bi50eXBlKXtkZWxldGUgbi5fXyxkZWxldGUgbi5fX2I7dmFyIGU9T2JqZWN0LmtleXMobikuam9pbihcIixcIik7dGhyb3cgbmV3IEVycm9yKFwiT2JqZWN0cyBhcmUgbm90IHZhbGlkIGFzIGEgY2hpbGQuIEVuY291bnRlcmVkIGFuIG9iamVjdCB3aXRoIHRoZSBrZXlzIHtcIitlK1wifS5cIil9fSk7dmFyIGU9bi5fX2M7aWYoZSYmZS5fX0gpe3ZhciBvPWUuX19IO0FycmF5LmlzQXJyYXkoby5fXykmJm8uX18uZm9yRWFjaChmdW5jdGlvbihlKXtpZihlLl9faCYmKCFlLl9fSHx8IUFycmF5LmlzQXJyYXkoZS5fX0gpKSl7dmFyIG89dChuKTtjb25zb2xlLndhcm4oXCJJbiBcIitvK1wiIHlvdSBhcmUgY2FsbGluZyB1c2VNZW1vL3VzZUNhbGxiYWNrIHdpdGhvdXQgcGFzc2luZyBhcmd1bWVudHMuXFxuVGhpcyBpcyBhIG5vb3Agc2luY2UgaXQgd2lsbCBub3QgYmUgYWJsZSB0byBtZW1vaXplLCBpdCB3aWxsIGV4ZWN1dGUgaXQgZXZlcnkgcmVuZGVyLlxcblxcblwiK2MobikpfX0pfWlmKGkmJmkobiksbnVsbCE9bi5fX2spZm9yKHZhciByPVtdLGE9MDthPG4uX19rLmxlbmd0aDthKyspe3ZhciBzPW4uX19rW2FdO2lmKHMmJm51bGwhPXMua2V5KXt2YXIgbD1zLmtleTtpZigtMSE9PXIuaW5kZXhPZihsKSl7Y29uc29sZS5lcnJvcignRm9sbG93aW5nIGNvbXBvbmVudCBoYXMgdHdvIG9yIG1vcmUgY2hpbGRyZW4gd2l0aCB0aGUgc2FtZSBrZXkgYXR0cmlidXRlOiBcIicrbCsnXCIuIFRoaXMgbWF5IGNhdXNlIGdsaXRjaGVzIGFuZCBtaXNiZWhhdmlvciBpbiByZW5kZXJpbmcgcHJvY2Vzcy4gQ29tcG9uZW50OiBcXG5cXG4nK3AobikrXCJcXG5cXG5cIitjKG4pKTticmVha31yLnB1c2gobCl9fX19KCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZWJ1Zy5qcy5tYXBcbiIsInZhciBlPXJlcXVpcmUoXCJwcmVhY3RcIik7XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmd2luZG93Ll9fUFJFQUNUX0RFVlRPT0xTX18mJndpbmRvdy5fX1BSRUFDVF9ERVZUT09MU19fLmF0dGFjaFByZWFjdChcIjEwLjAuNVwiLGUub3B0aW9ucyx7RnJhZ21lbnQ6ZS5GcmFnbWVudH0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGV2dG9vbHMuanMubWFwXG4iLCJ2YXIgbixsLHUsdCxpLG8scixmPXt9LGU9W10sYz0vYWNpdHxleCg/OnN8Z3xufHB8JCl8cnBofGdyaWR8b3dzfG1uY3xudHd8aW5lW2NoXXx6b298Xm9yZC9pO2Z1bmN0aW9uIHMobixsKXtmb3IodmFyIHUgaW4gbCluW3VdPWxbdV07cmV0dXJuIG59ZnVuY3Rpb24gYShuKXt2YXIgbD1uLnBhcmVudE5vZGU7bCYmbC5yZW1vdmVDaGlsZChuKX1mdW5jdGlvbiBwKG4sbCx1KXt2YXIgdCxpPWFyZ3VtZW50cyxvPXt9O2Zvcih0IGluIGwpXCJrZXlcIiE9PXQmJlwicmVmXCIhPT10JiYob1t0XT1sW3RdKTtpZihhcmd1bWVudHMubGVuZ3RoPjMpZm9yKHU9W3VdLHQ9Mzt0PGFyZ3VtZW50cy5sZW5ndGg7dCsrKXUucHVzaChpW3RdKTtpZihudWxsIT11JiYoby5jaGlsZHJlbj11KSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBuJiZudWxsIT1uLmRlZmF1bHRQcm9wcylmb3IodCBpbiBuLmRlZmF1bHRQcm9wcyl2b2lkIDA9PT1vW3RdJiYob1t0XT1uLmRlZmF1bHRQcm9wc1t0XSk7cmV0dXJuIHYobixvLGwmJmwua2V5LGwmJmwucmVmKX1mdW5jdGlvbiB2KGwsdSx0LGkpe3ZhciBvPXt0eXBlOmwscHJvcHM6dSxrZXk6dCxyZWY6aSxfX2s6bnVsbCxfXzpudWxsLF9fYjowLF9fZTpudWxsLF9fZDp2b2lkIDAsX19jOm51bGwsY29uc3RydWN0b3I6dm9pZCAwfTtyZXR1cm4gbi52bm9kZSYmbi52bm9kZShvKSxvfWZ1bmN0aW9uIGgobil7cmV0dXJuIG4uY2hpbGRyZW59ZnVuY3Rpb24gZChuLGwpe3RoaXMucHJvcHM9bix0aGlzLmNvbnRleHQ9bH1mdW5jdGlvbiB5KG4sbCl7aWYobnVsbD09bClyZXR1cm4gbi5fXz95KG4uX18sbi5fXy5fX2suaW5kZXhPZihuKSsxKTpudWxsO2Zvcih2YXIgdTtsPG4uX19rLmxlbmd0aDtsKyspaWYobnVsbCE9KHU9bi5fX2tbbF0pJiZudWxsIT11Ll9fZSlyZXR1cm4gdS5fX2U7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2Ygbi50eXBlP3kobik6bnVsbH1mdW5jdGlvbiB4KG4pe3ZhciBsLHU7aWYobnVsbCE9KG49bi5fXykmJm51bGwhPW4uX19jKXtmb3Iobi5fX2U9bi5fX2MuYmFzZT1udWxsLGw9MDtsPG4uX19rLmxlbmd0aDtsKyspaWYobnVsbCE9KHU9bi5fX2tbbF0pJiZudWxsIT11Ll9fZSl7bi5fX2U9bi5fX2MuYmFzZT11Ll9fZTticmVha31yZXR1cm4geChuKX19ZnVuY3Rpb24gbShsKXsoIWwuX19kJiYobC5fX2Q9ITApJiYxPT09dS5wdXNoKGwpfHxpIT09bi5kZWJvdW5jZVJlbmRlcmluZykmJigoaT1uLmRlYm91bmNlUmVuZGVyaW5nKXx8dCkodyl9ZnVuY3Rpb24gdygpe3ZhciBuLGwsdCxpLG8scixmO2Zvcih1LnNvcnQoZnVuY3Rpb24obixsKXtyZXR1cm4gbC5fX3YuX19iLW4uX192Ll9fYn0pO249dS5wb3AoKTspbi5fX2QmJih0PXZvaWQgMCxpPXZvaWQgMCxyPShvPShsPW4pLl9fdikuX19lLChmPWwuX19QKSYmKHQ9W10saT1OKGYsbyxzKHt9LG8pLGwuX19uLHZvaWQgMCE9PWYub3duZXJTVkdFbGVtZW50LG51bGwsdCxudWxsPT1yP3kobyk6cikseih0LG8pLGkhPXImJngobykpKX1mdW5jdGlvbiBnKG4sbCx1LHQsaSxvLHIsYyxzKXt2YXIgcCx2LGgsZCx4LG0sdyxnPXUmJnUuX19rfHxlLF89Zy5sZW5ndGg7aWYoYz09ZiYmKGM9bnVsbCE9bz9vWzBdOl8/eSh1LDApOm51bGwpLHA9MCxsLl9faz1rKGwuX19rLGZ1bmN0aW9uKHUpe2lmKG51bGwhPXUpe2lmKHUuX189bCx1Ll9fYj1sLl9fYisxLG51bGw9PT0oaD1nW3BdKXx8aCYmdS5rZXk9PWgua2V5JiZ1LnR5cGU9PT1oLnR5cGUpZ1twXT12b2lkIDA7ZWxzZSBmb3Iodj0wO3Y8Xzt2Kyspe2lmKChoPWdbdl0pJiZ1LmtleT09aC5rZXkmJnUudHlwZT09PWgudHlwZSl7Z1t2XT12b2lkIDA7YnJlYWt9aD1udWxsfWlmKGQ9TihuLHUsaD1ofHxmLHQsaSxvLHIsYyxzKSwodj11LnJlZikmJmgucmVmIT12JiYod3x8KHc9W10pLGgucmVmJiZ3LnB1c2goaC5yZWYsbnVsbCx1KSx3LnB1c2godix1Ll9fY3x8ZCx1KSksbnVsbCE9ZCl7dmFyIGU7aWYobnVsbD09bSYmKG09ZCksdm9pZCAwIT09dS5fX2QpZT11Ll9fZCx1Ll9fZD12b2lkIDA7ZWxzZSBpZihvPT1ofHxkIT1jfHxudWxsPT1kLnBhcmVudE5vZGUpe246aWYobnVsbD09Y3x8Yy5wYXJlbnROb2RlIT09biluLmFwcGVuZENoaWxkKGQpLGU9bnVsbDtlbHNle2Zvcih4PWMsdj0wOyh4PXgubmV4dFNpYmxpbmcpJiZ2PF87dis9MilpZih4PT1kKWJyZWFrIG47bi5pbnNlcnRCZWZvcmUoZCxjKSxlPWN9XCJvcHRpb25cIj09bC50eXBlJiYobi52YWx1ZT1cIlwiKX1jPXZvaWQgMCE9PWU/ZTpkLm5leHRTaWJsaW5nLFwiZnVuY3Rpb25cIj09dHlwZW9mIGwudHlwZSYmKGwuX19kPWMpfWVsc2UgYyYmaC5fX2U9PWMmJmMucGFyZW50Tm9kZSE9biYmKGM9eShoKSl9cmV0dXJuIHArKyx1fSksbC5fX2U9bSxudWxsIT1vJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiBsLnR5cGUpZm9yKHA9by5sZW5ndGg7cC0tOyludWxsIT1vW3BdJiZhKG9bcF0pO2ZvcihwPV87cC0tOyludWxsIT1nW3BdJiYkKGdbcF0sZ1twXSk7aWYodylmb3IocD0wO3A8dy5sZW5ndGg7cCsrKVQod1twXSx3WysrcF0sd1srK3BdKX1mdW5jdGlvbiBrKG4sbCx1KXtpZihudWxsPT11JiYodT1bXSksbnVsbD09bnx8XCJib29sZWFuXCI9PXR5cGVvZiBuKWwmJnUucHVzaChsKG51bGwpKTtlbHNlIGlmKEFycmF5LmlzQXJyYXkobikpZm9yKHZhciB0PTA7dDxuLmxlbmd0aDt0KyspayhuW3RdLGwsdSk7ZWxzZSB1LnB1c2gobD9sKFwic3RyaW5nXCI9PXR5cGVvZiBufHxcIm51bWJlclwiPT10eXBlb2Ygbj92KG51bGwsbixudWxsLG51bGwpOm51bGwhPW4uX19lfHxudWxsIT1uLl9fYz92KG4udHlwZSxuLnByb3BzLG4ua2V5LG51bGwpOm4pOm4pO3JldHVybiB1fWZ1bmN0aW9uIF8obixsLHUsdCxpKXt2YXIgbztmb3IobyBpbiB1KW8gaW4gbHx8UChuLG8sbnVsbCx1W29dLHQpO2ZvcihvIGluIGwpaSYmXCJmdW5jdGlvblwiIT10eXBlb2YgbFtvXXx8XCJ2YWx1ZVwiPT09b3x8XCJjaGVja2VkXCI9PT1vfHx1W29dPT09bFtvXXx8UChuLG8sbFtvXSx1W29dLHQpfWZ1bmN0aW9uIGIobixsLHUpe1wiLVwiPT09bFswXT9uLnNldFByb3BlcnR5KGwsdSk6bltsXT1cIm51bWJlclwiPT10eXBlb2YgdSYmITE9PT1jLnRlc3QobCk/dStcInB4XCI6bnVsbD09dT9cIlwiOnV9ZnVuY3Rpb24gUChuLGwsdSx0LGkpe3ZhciBvLHIsZixlLGM7aWYoaT9cImNsYXNzTmFtZVwiPT09bCYmKGw9XCJjbGFzc1wiKTpcImNsYXNzXCI9PT1sJiYobD1cImNsYXNzTmFtZVwiKSxcImtleVwiPT09bHx8XCJjaGlsZHJlblwiPT09bCk7ZWxzZSBpZihcInN0eWxlXCI9PT1sKWlmKG89bi5zdHlsZSxcInN0cmluZ1wiPT10eXBlb2YgdSlvLmNzc1RleHQ9dTtlbHNle2lmKFwic3RyaW5nXCI9PXR5cGVvZiB0JiYoby5jc3NUZXh0PVwiXCIsdD1udWxsKSx0KWZvcihyIGluIHQpdSYmciBpbiB1fHxiKG8scixcIlwiKTtpZih1KWZvcihmIGluIHUpdCYmdVtmXT09PXRbZl18fGIobyxmLHVbZl0pfWVsc2VcIm9cIj09PWxbMF0mJlwiblwiPT09bFsxXT8oZT1sIT09KGw9bC5yZXBsYWNlKC9DYXB0dXJlJC8sXCJcIikpLGM9bC50b0xvd2VyQ2FzZSgpLGw9KGMgaW4gbj9jOmwpLnNsaWNlKDIpLHU/KHR8fG4uYWRkRXZlbnRMaXN0ZW5lcihsLEMsZSksKG4ubHx8KG4ubD17fSkpW2xdPXUpOm4ucmVtb3ZlRXZlbnRMaXN0ZW5lcihsLEMsZSkpOlwibGlzdFwiIT09bCYmXCJ0YWdOYW1lXCIhPT1sJiZcImZvcm1cIiE9PWwmJlwidHlwZVwiIT09bCYmXCJzaXplXCIhPT1sJiYhaSYmbCBpbiBuP25bbF09bnVsbD09dT9cIlwiOnU6XCJmdW5jdGlvblwiIT10eXBlb2YgdSYmXCJkYW5nZXJvdXNseVNldElubmVySFRNTFwiIT09bCYmKGwhPT0obD1sLnJlcGxhY2UoL154bGluazo/LyxcIlwiKSk/bnVsbD09dXx8ITE9PT11P24ucmVtb3ZlQXR0cmlidXRlTlMoXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIsbC50b0xvd2VyQ2FzZSgpKTpuLnNldEF0dHJpYnV0ZU5TKFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiLGwudG9Mb3dlckNhc2UoKSx1KTpudWxsPT11fHwhMT09PXUmJiEvXmFyLy50ZXN0KGwpP24ucmVtb3ZlQXR0cmlidXRlKGwpOm4uc2V0QXR0cmlidXRlKGwsdSkpfWZ1bmN0aW9uIEMobCl7dGhpcy5sW2wudHlwZV0obi5ldmVudD9uLmV2ZW50KGwpOmwpfWZ1bmN0aW9uIE4obCx1LHQsaSxvLHIsZixlLGMpe3ZhciBhLHAsdix5LHgsbSx3LGssXyxiLFA9dS50eXBlO2lmKHZvaWQgMCE9PXUuY29uc3RydWN0b3IpcmV0dXJuIG51bGw7KGE9bi5fX2IpJiZhKHUpO3RyeXtuOmlmKFwiZnVuY3Rpb25cIj09dHlwZW9mIFApe2lmKGs9dS5wcm9wcyxfPShhPVAuY29udGV4dFR5cGUpJiZpW2EuX19jXSxiPWE/Xz9fLnByb3BzLnZhbHVlOmEuX186aSx0Ll9fYz93PShwPXUuX19jPXQuX19jKS5fXz1wLl9fRTooXCJwcm90b3R5cGVcImluIFAmJlAucHJvdG90eXBlLnJlbmRlcj91Ll9fYz1wPW5ldyBQKGssYik6KHUuX19jPXA9bmV3IGQoayxiKSxwLmNvbnN0cnVjdG9yPVAscC5yZW5kZXI9aiksXyYmXy5zdWIocCkscC5wcm9wcz1rLHAuc3RhdGV8fChwLnN0YXRlPXt9KSxwLmNvbnRleHQ9YixwLl9fbj1pLHY9cC5fX2Q9ITAscC5fX2g9W10pLG51bGw9PXAuX19zJiYocC5fX3M9cC5zdGF0ZSksbnVsbCE9UC5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMmJihwLl9fcz09cC5zdGF0ZSYmKHAuX19zPXMoe30scC5fX3MpKSxzKHAuX19zLFAuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzKGsscC5fX3MpKSkseT1wLnByb3BzLHg9cC5zdGF0ZSx2KW51bGw9PVAuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzJiZudWxsIT1wLmNvbXBvbmVudFdpbGxNb3VudCYmcC5jb21wb25lbnRXaWxsTW91bnQoKSxudWxsIT1wLmNvbXBvbmVudERpZE1vdW50JiZwLl9faC5wdXNoKHAuY29tcG9uZW50RGlkTW91bnQpO2Vsc2V7aWYobnVsbD09UC5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMmJmshPT15JiZudWxsIT1wLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMmJnAuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhrLGIpLCFwLl9fZSYmbnVsbCE9cC5zaG91bGRDb21wb25lbnRVcGRhdGUmJiExPT09cC5zaG91bGRDb21wb25lbnRVcGRhdGUoayxwLl9fcyxiKSl7Zm9yKHAucHJvcHM9ayxwLnN0YXRlPXAuX19zLHAuX19kPSExLHAuX192PXUsdS5fX2U9dC5fX2UsdS5fX2s9dC5fX2sscC5fX2gubGVuZ3RoJiZmLnB1c2gocCksYT0wO2E8dS5fX2subGVuZ3RoO2ErKyl1Ll9fa1thXSYmKHUuX19rW2FdLl9fPXUpO2JyZWFrIG59bnVsbCE9cC5jb21wb25lbnRXaWxsVXBkYXRlJiZwLmNvbXBvbmVudFdpbGxVcGRhdGUoayxwLl9fcyxiKSxudWxsIT1wLmNvbXBvbmVudERpZFVwZGF0ZSYmcC5fX2gucHVzaChmdW5jdGlvbigpe3AuY29tcG9uZW50RGlkVXBkYXRlKHkseCxtKX0pfXAuY29udGV4dD1iLHAucHJvcHM9ayxwLnN0YXRlPXAuX19zLChhPW4uX19yKSYmYSh1KSxwLl9fZD0hMSxwLl9fdj11LHAuX19QPWwsYT1wLnJlbmRlcihwLnByb3BzLHAuc3RhdGUscC5jb250ZXh0KSx1Ll9faz1udWxsIT1hJiZhLnR5cGU9PWgmJm51bGw9PWEua2V5P2EucHJvcHMuY2hpbGRyZW46QXJyYXkuaXNBcnJheShhKT9hOlthXSxudWxsIT1wLmdldENoaWxkQ29udGV4dCYmKGk9cyhzKHt9LGkpLHAuZ2V0Q2hpbGRDb250ZXh0KCkpKSx2fHxudWxsPT1wLmdldFNuYXBzaG90QmVmb3JlVXBkYXRlfHwobT1wLmdldFNuYXBzaG90QmVmb3JlVXBkYXRlKHkseCkpLGcobCx1LHQsaSxvLHIsZixlLGMpLHAuYmFzZT11Ll9fZSxwLl9faC5sZW5ndGgmJmYucHVzaChwKSx3JiYocC5fX0U9cC5fXz1udWxsKSxwLl9fZT0hMX1lbHNlIHUuX19lPUEodC5fX2UsdSx0LGksbyxyLGYsYyk7KGE9bi5kaWZmZWQpJiZhKHUpfWNhdGNoKGwpe24uX19lKGwsdSx0KX1yZXR1cm4gdS5fX2V9ZnVuY3Rpb24geihsLHUpe24uX19jJiZuLl9fYyh1LGwpLGwuc29tZShmdW5jdGlvbih1KXt0cnl7bD11Ll9faCx1Ll9faD1bXSxsLnNvbWUoZnVuY3Rpb24obil7bi5jYWxsKHUpfSl9Y2F0Y2gobCl7bi5fX2UobCx1Ll9fdil9fSl9ZnVuY3Rpb24gQShuLGwsdSx0LGksbyxyLGMpe3ZhciBzLGEscCx2LGgsZD11LnByb3BzLHk9bC5wcm9wcztpZihpPVwic3ZnXCI9PT1sLnR5cGV8fGksbnVsbCE9bylmb3Iocz0wO3M8by5sZW5ndGg7cysrKWlmKG51bGwhPShhPW9bc10pJiYoKG51bGw9PT1sLnR5cGU/Mz09PWEubm9kZVR5cGU6YS5sb2NhbE5hbWU9PT1sLnR5cGUpfHxuPT1hKSl7bj1hLG9bc109bnVsbDticmVha31pZihudWxsPT1uKXtpZihudWxsPT09bC50eXBlKXJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh5KTtuPWk/ZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixsLnR5cGUpOmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobC50eXBlLHkuaXMmJntpczp5LmlzfSksbz1udWxsfWlmKG51bGw9PT1sLnR5cGUpZCE9PXkmJm4uZGF0YSE9eSYmKG4uZGF0YT15KTtlbHNlIGlmKGwhPT11KXtpZihudWxsIT1vJiYobz1lLnNsaWNlLmNhbGwobi5jaGlsZE5vZGVzKSkscD0oZD11LnByb3BzfHxmKS5kYW5nZXJvdXNseVNldElubmVySFRNTCx2PXkuZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwsIWMpe2lmKGQ9PT1mKWZvcihkPXt9LGg9MDtoPG4uYXR0cmlidXRlcy5sZW5ndGg7aCsrKWRbbi5hdHRyaWJ1dGVzW2hdLm5hbWVdPW4uYXR0cmlidXRlc1toXS52YWx1ZTsodnx8cCkmJih2JiZwJiZ2Ll9faHRtbD09cC5fX2h0bWx8fChuLmlubmVySFRNTD12JiZ2Ll9faHRtbHx8XCJcIikpfV8obix5LGQsaSxjKSxsLl9faz1sLnByb3BzLmNoaWxkcmVuLHZ8fGcobixsLHUsdCxcImZvcmVpZ25PYmplY3RcIiE9PWwudHlwZSYmaSxvLHIsZixjKSxjfHwoXCJ2YWx1ZVwiaW4geSYmdm9pZCAwIT09eS52YWx1ZSYmeS52YWx1ZSE9PW4udmFsdWUmJihuLnZhbHVlPW51bGw9PXkudmFsdWU/XCJcIjp5LnZhbHVlKSxcImNoZWNrZWRcImluIHkmJnZvaWQgMCE9PXkuY2hlY2tlZCYmeS5jaGVja2VkIT09bi5jaGVja2VkJiYobi5jaGVja2VkPXkuY2hlY2tlZCkpfXJldHVybiBufWZ1bmN0aW9uIFQobCx1LHQpe3RyeXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBsP2wodSk6bC5jdXJyZW50PXV9Y2F0Y2gobCl7bi5fX2UobCx0KX19ZnVuY3Rpb24gJChsLHUsdCl7dmFyIGksbyxyO2lmKG4udW5tb3VudCYmbi51bm1vdW50KGwpLChpPWwucmVmKSYmKGkuY3VycmVudCYmaS5jdXJyZW50IT09bC5fX2V8fFQoaSxudWxsLHUpKSx0fHxcImZ1bmN0aW9uXCI9PXR5cGVvZiBsLnR5cGV8fCh0PW51bGwhPShvPWwuX19lKSksbC5fX2U9bC5fX2Q9dm9pZCAwLG51bGwhPShpPWwuX19jKSl7aWYoaS5jb21wb25lbnRXaWxsVW5tb3VudCl0cnl7aS5jb21wb25lbnRXaWxsVW5tb3VudCgpfWNhdGNoKGwpe24uX19lKGwsdSl9aS5iYXNlPWkuX19QPW51bGx9aWYoaT1sLl9faylmb3Iocj0wO3I8aS5sZW5ndGg7cisrKWlbcl0mJiQoaVtyXSx1LHQpO251bGwhPW8mJmEobyl9ZnVuY3Rpb24gaihuLGwsdSl7cmV0dXJuIHRoaXMuY29uc3RydWN0b3Iobix1KX1mdW5jdGlvbiBEKGwsdSx0KXt2YXIgaSxyLGM7bi5fXyYmbi5fXyhsLHUpLHI9KGk9dD09PW8pP251bGw6dCYmdC5fX2t8fHUuX19rLGw9cChoLG51bGwsW2xdKSxjPVtdLE4odSwoaT91OnR8fHUpLl9faz1sLHJ8fGYsZix2b2lkIDAhPT11Lm93bmVyU1ZHRWxlbWVudCx0JiYhaT9bdF06cj9udWxsOmUuc2xpY2UuY2FsbCh1LmNoaWxkTm9kZXMpLGMsdHx8ZixpKSx6KGMsbCl9bj17X19lOmZ1bmN0aW9uKG4sbCl7Zm9yKHZhciB1LHQ7bD1sLl9fOylpZigodT1sLl9fYykmJiF1Ll9fKXRyeXtpZih1LmNvbnN0cnVjdG9yJiZudWxsIT11LmNvbnN0cnVjdG9yLmdldERlcml2ZWRTdGF0ZUZyb21FcnJvciYmKHQ9ITAsdS5zZXRTdGF0ZSh1LmNvbnN0cnVjdG9yLmdldERlcml2ZWRTdGF0ZUZyb21FcnJvcihuKSkpLG51bGwhPXUuY29tcG9uZW50RGlkQ2F0Y2gmJih0PSEwLHUuY29tcG9uZW50RGlkQ2F0Y2gobikpLHQpcmV0dXJuIG0odS5fX0U9dSl9Y2F0Y2gobCl7bj1sfXRocm93IG59fSxsPWZ1bmN0aW9uKG4pe3JldHVybiBudWxsIT1uJiZ2b2lkIDA9PT1uLmNvbnN0cnVjdG9yfSxkLnByb3RvdHlwZS5zZXRTdGF0ZT1mdW5jdGlvbihuLGwpe3ZhciB1O3U9dGhpcy5fX3MhPT10aGlzLnN0YXRlP3RoaXMuX19zOnRoaXMuX19zPXMoe30sdGhpcy5zdGF0ZSksXCJmdW5jdGlvblwiPT10eXBlb2YgbiYmKG49bih1LHRoaXMucHJvcHMpKSxuJiZzKHUsbiksbnVsbCE9biYmdGhpcy5fX3YmJihsJiZ0aGlzLl9faC5wdXNoKGwpLG0odGhpcykpfSxkLnByb3RvdHlwZS5mb3JjZVVwZGF0ZT1mdW5jdGlvbihuKXt0aGlzLl9fdiYmKHRoaXMuX19lPSEwLG4mJnRoaXMuX19oLnB1c2gobiksbSh0aGlzKSl9LGQucHJvdG90eXBlLnJlbmRlcj1oLHU9W10sdD1cImZ1bmN0aW9uXCI9PXR5cGVvZiBQcm9taXNlP1Byb21pc2UucHJvdG90eXBlLnRoZW4uYmluZChQcm9taXNlLnJlc29sdmUoKSk6c2V0VGltZW91dCxvPWYscj0wLGV4cG9ydHMucmVuZGVyPUQsZXhwb3J0cy5oeWRyYXRlPWZ1bmN0aW9uKG4sbCl7RChuLGwsbyl9LGV4cG9ydHMuY3JlYXRlRWxlbWVudD1wLGV4cG9ydHMuaD1wLGV4cG9ydHMuRnJhZ21lbnQ9aCxleHBvcnRzLmNyZWF0ZVJlZj1mdW5jdGlvbigpe3JldHVybnt9fSxleHBvcnRzLmlzVmFsaWRFbGVtZW50PWwsZXhwb3J0cy5Db21wb25lbnQ9ZCxleHBvcnRzLmNsb25lRWxlbWVudD1mdW5jdGlvbihuLGwpe3JldHVybiBsPXMocyh7fSxuLnByb3BzKSxsKSxhcmd1bWVudHMubGVuZ3RoPjImJihsLmNoaWxkcmVuPWUuc2xpY2UuY2FsbChhcmd1bWVudHMsMikpLHYobi50eXBlLGwsbC5rZXl8fG4ua2V5LGwucmVmfHxuLnJlZil9LGV4cG9ydHMuY3JlYXRlQ29udGV4dD1mdW5jdGlvbihuKXt2YXIgbD17fSx1PXtfX2M6XCJfX2NDXCIrcisrLF9fOm4sQ29uc3VtZXI6ZnVuY3Rpb24obixsKXtyZXR1cm4gbi5jaGlsZHJlbihsKX0sUHJvdmlkZXI6ZnVuY3Rpb24obil7dmFyIHQsaT10aGlzO3JldHVybiB0aGlzLmdldENoaWxkQ29udGV4dHx8KHQ9W10sdGhpcy5nZXRDaGlsZENvbnRleHQ9ZnVuY3Rpb24oKXtyZXR1cm4gbFt1Ll9fY109aSxsfSx0aGlzLnNob3VsZENvbXBvbmVudFVwZGF0ZT1mdW5jdGlvbihsKXtuLnZhbHVlIT09bC52YWx1ZSYmdC5zb21lKGZ1bmN0aW9uKG4pe24uY29udGV4dD1sLnZhbHVlLG0obil9KX0sdGhpcy5zdWI9ZnVuY3Rpb24obil7dC5wdXNoKG4pO3ZhciBsPW4uY29tcG9uZW50V2lsbFVubW91bnQ7bi5jb21wb25lbnRXaWxsVW5tb3VudD1mdW5jdGlvbigpe3Quc3BsaWNlKHQuaW5kZXhPZihuKSwxKSxsJiZsLmNhbGwobil9fSksbi5jaGlsZHJlbn19O3JldHVybiB1LkNvbnN1bWVyLmNvbnRleHRUeXBlPXUsdX0sZXhwb3J0cy50b0NoaWxkQXJyYXk9ayxleHBvcnRzLl9lPSQsZXhwb3J0cy5vcHRpb25zPW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcmVhY3QuanMubWFwXG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbnZhciBydW50aW1lID0gKGZ1bmN0aW9uIChleHBvcnRzKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBPcCA9IE9iamVjdC5wcm90b3R5cGU7XG4gIHZhciBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHVuZGVmaW5lZDsgLy8gTW9yZSBjb21wcmVzc2libGUgdGhhbiB2b2lkIDAuXG4gIHZhciAkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sIDoge307XG4gIHZhciBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG4gIHZhciBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCI7XG4gIHZhciB0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgXCJAQHRvU3RyaW5nVGFnXCI7XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgZXhwb3J0cy53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgLy8gVGhpcyBpcyBhIHBvbHlmaWxsIGZvciAlSXRlcmF0b3JQcm90b3R5cGUlIGZvciBlbnZpcm9ubWVudHMgdGhhdFxuICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgSXRlcmF0b3JQcm90b3R5cGVbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiAgdmFyIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8gJiYgZ2V0UHJvdG8oZ2V0UHJvdG8odmFsdWVzKFtdKSkpO1xuICBpZiAoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiZcbiAgICAgIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJlxuICAgICAgaGFzT3duLmNhbGwoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sKSkge1xuICAgIC8vIFRoaXMgZW52aXJvbm1lbnQgaGFzIGEgbmF0aXZlICVJdGVyYXRvclByb3RvdHlwZSU7IHVzZSBpdCBpbnN0ZWFkXG4gICAgLy8gb2YgdGhlIHBvbHlmaWxsLlxuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cblxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPVxuICAgIEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGVbdG9TdHJpbmdUYWdTeW1ib2xdID1cbiAgICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBwcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3JcbiAgICAgID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHxcbiAgICAgICAgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgICAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICAgICAgOiBmYWxzZTtcbiAgfTtcblxuICBleHBvcnRzLm1hcmsgPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGlmICghKHRvU3RyaW5nVGFnU3ltYm9sIGluIGdlbkZ1bikpIHtcbiAgICAgICAgZ2VuRnVuW3RvU3RyaW5nVGFnU3ltYm9sXSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcbiAgICAgIH1cbiAgICB9XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB7IF9fYXdhaXQ6IGFyZyB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlICYmXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAvLyBJZiBhIHJlamVjdGVkIFByb21pc2Ugd2FzIHlpZWxkZWQsIHRocm93IHRoZSByZWplY3Rpb24gYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgaGFuZGxlZCB0aGVyZS5cbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPVxuICAgICAgICAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsXG4gICAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmdcbiAgICAgICAgKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcbiAgQXN5bmNJdGVyYXRvci5wcm90b3R5cGVbYXN5bmNJdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3IoXG4gICAgICB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KVxuICAgICk7XG5cbiAgICByZXR1cm4gZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5tZXRob2QgPSBtZXRob2Q7XG4gICAgICBjb250ZXh0LmFyZyA9IGFyZztcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIENhbGwgZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdKGNvbnRleHQuYXJnKSBhbmQgaGFuZGxlIHRoZVxuICAvLyByZXN1bHQsIGVpdGhlciBieSByZXR1cm5pbmcgYSB7IHZhbHVlLCBkb25lIH0gcmVzdWx0IGZyb20gdGhlXG4gIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLFxuICAvLyBzZXR0aW5nIGNvbnRleHQuZGVsZWdhdGUgdG8gbnVsbCwgYW5kIHJldHVybmluZyB0aGUgQ29udGludWVTZW50aW5lbC5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgLy8gTm90ZTogW1wicmV0dXJuXCJdIG11c3QgYmUgdXNlZCBmb3IgRVMzIHBhcnNpbmcgY29tcGF0aWJpbGl0eS5cbiAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb21cbiAgICAgICAgICAgIC8vIFwicmV0dXJuXCIgdG8gXCJ0aHJvd1wiLCBsZXQgdGhhdCBvdmVycmlkZSB0aGUgVHlwZUVycm9yIGJlbG93LlxuICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ3Rocm93JyBtZXRob2RcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7XG5cbiAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcblxuICAgIGlmICghIGluZm8pIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIik7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5XG4gICAgICAvLyB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgZGVsZWdhdGUucmVzdWx0TmFtZSAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7XG5cbiAgICAgIC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG5cbiAgICAgIC8vIElmIGNvbnRleHQubWV0aG9kIHdhcyBcInRocm93XCIgYnV0IHRoZSBkZWxlZ2F0ZSBoYW5kbGVkIHRoZVxuICAgICAgLy8gZXhjZXB0aW9uLCBsZXQgdGhlIG91dGVyIGdlbmVyYXRvciBwcm9jZWVkIG5vcm1hbGx5LiBJZlxuICAgICAgLy8gY29udGV4dC5tZXRob2Qgd2FzIFwibmV4dFwiLCBmb3JnZXQgY29udGV4dC5hcmcgc2luY2UgaXQgaGFzIGJlZW5cbiAgICAgIC8vIFwiY29uc3VtZWRcIiBieSB0aGUgZGVsZWdhdGUgaXRlcmF0b3IuIElmIGNvbnRleHQubWV0aG9kIHdhc1xuICAgICAgLy8gXCJyZXR1cm5cIiwgYWxsb3cgdGhlIG9yaWdpbmFsIC5yZXR1cm4gY2FsbCB0byBjb250aW51ZSBpbiB0aGVcbiAgICAgIC8vIG91dGVyIGdlbmVyYXRvci5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCAhPT0gXCJyZXR1cm5cIikge1xuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuXG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9XG5cbiAgICAvLyBUaGUgZGVsZWdhdGUgaXRlcmF0b3IgaXMgZmluaXNoZWQsIHNvIGZvcmdldCBpdCBhbmQgY29udGludWUgd2l0aFxuICAgIC8vIHRoZSBvdXRlciBnZW5lcmF0b3IuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH1cblxuICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG5cbiAgR3BbdG9TdHJpbmdUYWdTeW1ib2xdID0gXCJHZW5lcmF0b3JcIjtcblxuICAvLyBBIEdlbmVyYXRvciBzaG91bGQgYWx3YXlzIHJldHVybiBpdHNlbGYgYXMgdGhlIGl0ZXJhdG9yIG9iamVjdCB3aGVuIHRoZVxuICAvLyBAQGl0ZXJhdG9yIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbiBpdC4gU29tZSBicm93c2VycycgaW1wbGVtZW50YXRpb25zIG9mIHRoZVxuICAvLyBpdGVyYXRvciBwcm90b3R5cGUgY2hhaW4gaW5jb3JyZWN0bHkgaW1wbGVtZW50IHRoaXMsIGNhdXNpbmcgdGhlIEdlbmVyYXRvclxuICAvLyBvYmplY3QgdG8gbm90IGJlIHJldHVybmVkIGZyb20gdGhpcyBjYWxsLiBUaGlzIGVuc3VyZXMgdGhhdCBkb2Vzbid0IGhhcHBlbi5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9pc3N1ZXMvMjc0IGZvciBtb3JlIGRldGFpbHMuXG4gIEdwW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEdwLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH07XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBleHBvcnRzLmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cbiAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gIH1cbiAgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiZcbiAgICAgICAgICAgICAgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiZcbiAgICAgICAgICAgICAgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhISBjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFicnVwdDogZnVuY3Rpb24odHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiZcbiAgICAgICAgICAgIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAgICh0eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICAgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJlxuICAgICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgICAgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTtcblxuICAvLyBSZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlXG4gIC8vIG9yIG5vdCwgcmV0dXJuIHRoZSBydW50aW1lIG9iamVjdCBzbyB0aGF0IHdlIGNhbiBkZWNsYXJlIHRoZSB2YXJpYWJsZVxuICAvLyByZWdlbmVyYXRvclJ1bnRpbWUgaW4gdGhlIG91dGVyIHNjb3BlLCB3aGljaCBhbGxvd3MgdGhpcyBtb2R1bGUgdG8gYmVcbiAgLy8gaW5qZWN0ZWQgZWFzaWx5IGJ5IGBiaW4vcmVnZW5lcmF0b3IgLS1pbmNsdWRlLXJ1bnRpbWUgc2NyaXB0LmpzYC5cbiAgcmV0dXJuIGV4cG9ydHM7XG5cbn0oXG4gIC8vIElmIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZSwgdXNlIG1vZHVsZS5leHBvcnRzXG4gIC8vIGFzIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgbmFtZXNwYWNlLiBPdGhlcndpc2UgY3JlYXRlIGEgbmV3IGVtcHR5XG4gIC8vIG9iamVjdC4gRWl0aGVyIHdheSwgdGhlIHJlc3VsdGluZyBvYmplY3Qgd2lsbCBiZSB1c2VkIHRvIGluaXRpYWxpemVcbiAgLy8gdGhlIHJlZ2VuZXJhdG9yUnVudGltZSB2YXJpYWJsZSBhdCB0aGUgdG9wIG9mIHRoaXMgZmlsZS5cbiAgdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiA/IG1vZHVsZS5leHBvcnRzIDoge31cbikpO1xuXG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgLy8gVGhpcyBtb2R1bGUgc2hvdWxkIG5vdCBiZSBydW5uaW5nIGluIHN0cmljdCBtb2RlLCBzbyB0aGUgYWJvdmVcbiAgLy8gYXNzaWdubWVudCBzaG91bGQgYWx3YXlzIHdvcmsgdW5sZXNzIHNvbWV0aGluZyBpcyBtaXNjb25maWd1cmVkLiBKdXN0XG4gIC8vIGluIGNhc2UgcnVudGltZS5qcyBhY2NpZGVudGFsbHkgcnVucyBpbiBzdHJpY3QgbW9kZSwgd2UgY2FuIGVzY2FwZVxuICAvLyBzdHJpY3QgbW9kZSB1c2luZyBhIGdsb2JhbCBGdW5jdGlvbiBjYWxsLiBUaGlzIGNvdWxkIGNvbmNlaXZhYmx5IGZhaWxcbiAgLy8gaWYgYSBDb250ZW50IFNlY3VyaXR5IFBvbGljeSBmb3JiaWRzIHVzaW5nIEZ1bmN0aW9uLCBidXQgaW4gdGhhdCBjYXNlXG4gIC8vIHRoZSBwcm9wZXIgc29sdXRpb24gaXMgdG8gZml4IHRoZSBhY2NpZGVudGFsIHN0cmljdCBtb2RlIHByb2JsZW0uIElmXG4gIC8vIHlvdSd2ZSBtaXNjb25maWd1cmVkIHlvdXIgYnVuZGxlciB0byBmb3JjZSBzdHJpY3QgbW9kZSBhbmQgYXBwbGllZCBhXG4gIC8vIENTUCB0byBmb3JiaWQgRnVuY3Rpb24sIGFuZCB5b3UncmUgbm90IHdpbGxpbmcgdG8gZml4IGVpdGhlciBvZiB0aG9zZVxuICAvLyBwcm9ibGVtcywgcGxlYXNlIGRldGFpbCB5b3VyIHVuaXF1ZSBwcmVkaWNhbWVudCBpbiBhIEdpdEh1YiBpc3N1ZS5cbiAgRnVuY3Rpb24oXCJyXCIsIFwicmVnZW5lcmF0b3JSdW50aW1lID0gclwiKShydW50aW1lKTtcbn1cbiIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvaW5kZXgnKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJhbmRvbUZyb21TZWVkID0gcmVxdWlyZSgnLi9yYW5kb20vcmFuZG9tLWZyb20tc2VlZCcpO1xuXG52YXIgT1JJR0lOQUwgPSAnMDEyMzQ1Njc4OWFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpfLSc7XG52YXIgYWxwaGFiZXQ7XG52YXIgcHJldmlvdXNTZWVkO1xuXG52YXIgc2h1ZmZsZWQ7XG5cbmZ1bmN0aW9uIHJlc2V0KCkge1xuICAgIHNodWZmbGVkID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHNldENoYXJhY3RlcnMoX2FscGhhYmV0Xykge1xuICAgIGlmICghX2FscGhhYmV0Xykge1xuICAgICAgICBpZiAoYWxwaGFiZXQgIT09IE9SSUdJTkFMKSB7XG4gICAgICAgICAgICBhbHBoYWJldCA9IE9SSUdJTkFMO1xuICAgICAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKF9hbHBoYWJldF8gPT09IGFscGhhYmV0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoX2FscGhhYmV0Xy5sZW5ndGggIT09IE9SSUdJTkFMLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0N1c3RvbSBhbHBoYWJldCBmb3Igc2hvcnRpZCBtdXN0IGJlICcgKyBPUklHSU5BTC5sZW5ndGggKyAnIHVuaXF1ZSBjaGFyYWN0ZXJzLiBZb3Ugc3VibWl0dGVkICcgKyBfYWxwaGFiZXRfLmxlbmd0aCArICcgY2hhcmFjdGVyczogJyArIF9hbHBoYWJldF8pO1xuICAgIH1cblxuICAgIHZhciB1bmlxdWUgPSBfYWxwaGFiZXRfLnNwbGl0KCcnKS5maWx0ZXIoZnVuY3Rpb24oaXRlbSwgaW5kLCBhcnIpe1xuICAgICAgIHJldHVybiBpbmQgIT09IGFyci5sYXN0SW5kZXhPZihpdGVtKTtcbiAgICB9KTtcblxuICAgIGlmICh1bmlxdWUubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ3VzdG9tIGFscGhhYmV0IGZvciBzaG9ydGlkIG11c3QgYmUgJyArIE9SSUdJTkFMLmxlbmd0aCArICcgdW5pcXVlIGNoYXJhY3RlcnMuIFRoZXNlIGNoYXJhY3RlcnMgd2VyZSBub3QgdW5pcXVlOiAnICsgdW5pcXVlLmpvaW4oJywgJykpO1xuICAgIH1cblxuICAgIGFscGhhYmV0ID0gX2FscGhhYmV0XztcbiAgICByZXNldCgpO1xufVxuXG5mdW5jdGlvbiBjaGFyYWN0ZXJzKF9hbHBoYWJldF8pIHtcbiAgICBzZXRDaGFyYWN0ZXJzKF9hbHBoYWJldF8pO1xuICAgIHJldHVybiBhbHBoYWJldDtcbn1cblxuZnVuY3Rpb24gc2V0U2VlZChzZWVkKSB7XG4gICAgcmFuZG9tRnJvbVNlZWQuc2VlZChzZWVkKTtcbiAgICBpZiAocHJldmlvdXNTZWVkICE9PSBzZWVkKSB7XG4gICAgICAgIHJlc2V0KCk7XG4gICAgICAgIHByZXZpb3VzU2VlZCA9IHNlZWQ7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzaHVmZmxlKCkge1xuICAgIGlmICghYWxwaGFiZXQpIHtcbiAgICAgICAgc2V0Q2hhcmFjdGVycyhPUklHSU5BTCk7XG4gICAgfVxuXG4gICAgdmFyIHNvdXJjZUFycmF5ID0gYWxwaGFiZXQuc3BsaXQoJycpO1xuICAgIHZhciB0YXJnZXRBcnJheSA9IFtdO1xuICAgIHZhciByID0gcmFuZG9tRnJvbVNlZWQubmV4dFZhbHVlKCk7XG4gICAgdmFyIGNoYXJhY3RlckluZGV4O1xuXG4gICAgd2hpbGUgKHNvdXJjZUFycmF5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgciA9IHJhbmRvbUZyb21TZWVkLm5leHRWYWx1ZSgpO1xuICAgICAgICBjaGFyYWN0ZXJJbmRleCA9IE1hdGguZmxvb3IociAqIHNvdXJjZUFycmF5Lmxlbmd0aCk7XG4gICAgICAgIHRhcmdldEFycmF5LnB1c2goc291cmNlQXJyYXkuc3BsaWNlKGNoYXJhY3RlckluZGV4LCAxKVswXSk7XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXRBcnJheS5qb2luKCcnKTtcbn1cblxuZnVuY3Rpb24gZ2V0U2h1ZmZsZWQoKSB7XG4gICAgaWYgKHNodWZmbGVkKSB7XG4gICAgICAgIHJldHVybiBzaHVmZmxlZDtcbiAgICB9XG4gICAgc2h1ZmZsZWQgPSBzaHVmZmxlKCk7XG4gICAgcmV0dXJuIHNodWZmbGVkO1xufVxuXG4vKipcbiAqIGxvb2t1cCBzaHVmZmxlZCBsZXR0ZXJcbiAqIEBwYXJhbSBpbmRleFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gbG9va3VwKGluZGV4KSB7XG4gICAgdmFyIGFscGhhYmV0U2h1ZmZsZWQgPSBnZXRTaHVmZmxlZCgpO1xuICAgIHJldHVybiBhbHBoYWJldFNodWZmbGVkW2luZGV4XTtcbn1cblxuZnVuY3Rpb24gZ2V0ICgpIHtcbiAgcmV0dXJuIGFscGhhYmV0IHx8IE9SSUdJTkFMO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZXQ6IGdldCxcbiAgICBjaGFyYWN0ZXJzOiBjaGFyYWN0ZXJzLFxuICAgIHNlZWQ6IHNldFNlZWQsXG4gICAgbG9va3VwOiBsb29rdXAsXG4gICAgc2h1ZmZsZWQ6IGdldFNodWZmbGVkXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZ2VuZXJhdGUgPSByZXF1aXJlKCcuL2dlbmVyYXRlJyk7XG52YXIgYWxwaGFiZXQgPSByZXF1aXJlKCcuL2FscGhhYmV0Jyk7XG5cbi8vIElnbm9yZSBhbGwgbWlsbGlzZWNvbmRzIGJlZm9yZSBhIGNlcnRhaW4gdGltZSB0byByZWR1Y2UgdGhlIHNpemUgb2YgdGhlIGRhdGUgZW50cm9weSB3aXRob3V0IHNhY3JpZmljaW5nIHVuaXF1ZW5lc3MuXG4vLyBUaGlzIG51bWJlciBzaG91bGQgYmUgdXBkYXRlZCBldmVyeSB5ZWFyIG9yIHNvIHRvIGtlZXAgdGhlIGdlbmVyYXRlZCBpZCBzaG9ydC5cbi8vIFRvIHJlZ2VuZXJhdGUgYG5ldyBEYXRlKCkgLSAwYCBhbmQgYnVtcCB0aGUgdmVyc2lvbi4gQWx3YXlzIGJ1bXAgdGhlIHZlcnNpb24hXG52YXIgUkVEVUNFX1RJTUUgPSAxNTY3NzUyODAyMDYyO1xuXG4vLyBkb24ndCBjaGFuZ2UgdW5sZXNzIHdlIGNoYW5nZSB0aGUgYWxnb3Mgb3IgUkVEVUNFX1RJTUVcbi8vIG11c3QgYmUgYW4gaW50ZWdlciBhbmQgbGVzcyB0aGFuIDE2XG52YXIgdmVyc2lvbiA9IDc7XG5cbi8vIENvdW50ZXIgaXMgdXNlZCB3aGVuIHNob3J0aWQgaXMgY2FsbGVkIG11bHRpcGxlIHRpbWVzIGluIG9uZSBzZWNvbmQuXG52YXIgY291bnRlcjtcblxuLy8gUmVtZW1iZXIgdGhlIGxhc3QgdGltZSBzaG9ydGlkIHdhcyBjYWxsZWQgaW4gY2FzZSBjb3VudGVyIGlzIG5lZWRlZC5cbnZhciBwcmV2aW91c1NlY29uZHM7XG5cbi8qKlxuICogR2VuZXJhdGUgdW5pcXVlIGlkXG4gKiBSZXR1cm5zIHN0cmluZyBpZFxuICovXG5mdW5jdGlvbiBidWlsZChjbHVzdGVyV29ya2VySWQpIHtcbiAgICB2YXIgc3RyID0gJyc7XG5cbiAgICB2YXIgc2Vjb25kcyA9IE1hdGguZmxvb3IoKERhdGUubm93KCkgLSBSRURVQ0VfVElNRSkgKiAwLjAwMSk7XG5cbiAgICBpZiAoc2Vjb25kcyA9PT0gcHJldmlvdXNTZWNvbmRzKSB7XG4gICAgICAgIGNvdW50ZXIrKztcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb3VudGVyID0gMDtcbiAgICAgICAgcHJldmlvdXNTZWNvbmRzID0gc2Vjb25kcztcbiAgICB9XG5cbiAgICBzdHIgPSBzdHIgKyBnZW5lcmF0ZSh2ZXJzaW9uKTtcbiAgICBzdHIgPSBzdHIgKyBnZW5lcmF0ZShjbHVzdGVyV29ya2VySWQpO1xuICAgIGlmIChjb3VudGVyID4gMCkge1xuICAgICAgICBzdHIgPSBzdHIgKyBnZW5lcmF0ZShjb3VudGVyKTtcbiAgICB9XG4gICAgc3RyID0gc3RyICsgZ2VuZXJhdGUoc2Vjb25kcyk7XG4gICAgcmV0dXJuIHN0cjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBidWlsZDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFscGhhYmV0ID0gcmVxdWlyZSgnLi9hbHBoYWJldCcpO1xudmFyIHJhbmRvbSA9IHJlcXVpcmUoJy4vcmFuZG9tL3JhbmRvbS1ieXRlJyk7XG52YXIgZm9ybWF0ID0gcmVxdWlyZSgnbmFub2lkL2Zvcm1hdCcpO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZShudW1iZXIpIHtcbiAgICB2YXIgbG9vcENvdW50ZXIgPSAwO1xuICAgIHZhciBkb25lO1xuXG4gICAgdmFyIHN0ciA9ICcnO1xuXG4gICAgd2hpbGUgKCFkb25lKSB7XG4gICAgICAgIHN0ciA9IHN0ciArIGZvcm1hdChyYW5kb20sIGFscGhhYmV0LmdldCgpLCAxKTtcbiAgICAgICAgZG9uZSA9IG51bWJlciA8IChNYXRoLnBvdygxNiwgbG9vcENvdW50ZXIgKyAxICkgKTtcbiAgICAgICAgbG9vcENvdW50ZXIrKztcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZW5lcmF0ZTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFscGhhYmV0ID0gcmVxdWlyZSgnLi9hbHBoYWJldCcpO1xudmFyIGJ1aWxkID0gcmVxdWlyZSgnLi9idWlsZCcpO1xudmFyIGlzVmFsaWQgPSByZXF1aXJlKCcuL2lzLXZhbGlkJyk7XG5cbi8vIGlmIHlvdSBhcmUgdXNpbmcgY2x1c3RlciBvciBtdWx0aXBsZSBzZXJ2ZXJzIHVzZSB0aGlzIHRvIG1ha2UgZWFjaCBpbnN0YW5jZVxuLy8gaGFzIGEgdW5pcXVlIHZhbHVlIGZvciB3b3JrZXJcbi8vIE5vdGU6IEkgZG9uJ3Qga25vdyBpZiB0aGlzIGlzIGF1dG9tYXRpY2FsbHkgc2V0IHdoZW4gdXNpbmcgdGhpcmRcbi8vIHBhcnR5IGNsdXN0ZXIgc29sdXRpb25zIHN1Y2ggYXMgcG0yLlxudmFyIGNsdXN0ZXJXb3JrZXJJZCA9IHJlcXVpcmUoJy4vdXRpbC9jbHVzdGVyLXdvcmtlci1pZCcpIHx8IDA7XG5cbi8qKlxuICogU2V0IHRoZSBzZWVkLlxuICogSGlnaGx5IHJlY29tbWVuZGVkIGlmIHlvdSBkb24ndCB3YW50IHBlb3BsZSB0byB0cnkgdG8gZmlndXJlIG91dCB5b3VyIGlkIHNjaGVtYS5cbiAqIGV4cG9zZWQgYXMgc2hvcnRpZC5zZWVkKGludClcbiAqIEBwYXJhbSBzZWVkIEludGVnZXIgdmFsdWUgdG8gc2VlZCB0aGUgcmFuZG9tIGFscGhhYmV0LiAgQUxXQVlTIFVTRSBUSEUgU0FNRSBTRUVEIG9yIHlvdSBtaWdodCBnZXQgb3ZlcmxhcHMuXG4gKi9cbmZ1bmN0aW9uIHNlZWQoc2VlZFZhbHVlKSB7XG4gICAgYWxwaGFiZXQuc2VlZChzZWVkVmFsdWUpO1xuICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLyoqXG4gKiBTZXQgdGhlIGNsdXN0ZXIgd29ya2VyIG9yIG1hY2hpbmUgaWRcbiAqIGV4cG9zZWQgYXMgc2hvcnRpZC53b3JrZXIoaW50KVxuICogQHBhcmFtIHdvcmtlcklkIHdvcmtlciBtdXN0IGJlIHBvc2l0aXZlIGludGVnZXIuICBOdW1iZXIgbGVzcyB0aGFuIDE2IGlzIHJlY29tbWVuZGVkLlxuICogcmV0dXJucyBzaG9ydGlkIG1vZHVsZSBzbyBpdCBjYW4gYmUgY2hhaW5lZC5cbiAqL1xuZnVuY3Rpb24gd29ya2VyKHdvcmtlcklkKSB7XG4gICAgY2x1c3RlcldvcmtlcklkID0gd29ya2VySWQ7XG4gICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vKipcbiAqXG4gKiBzZXRzIG5ldyBjaGFyYWN0ZXJzIHRvIHVzZSBpbiB0aGUgYWxwaGFiZXRcbiAqIHJldHVybnMgdGhlIHNodWZmbGVkIGFscGhhYmV0XG4gKi9cbmZ1bmN0aW9uIGNoYXJhY3RlcnMobmV3Q2hhcmFjdGVycykge1xuICAgIGlmIChuZXdDaGFyYWN0ZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgYWxwaGFiZXQuY2hhcmFjdGVycyhuZXdDaGFyYWN0ZXJzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWxwaGFiZXQuc2h1ZmZsZWQoKTtcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZSB1bmlxdWUgaWRcbiAqIFJldHVybnMgc3RyaW5nIGlkXG4gKi9cbmZ1bmN0aW9uIGdlbmVyYXRlKCkge1xuICByZXR1cm4gYnVpbGQoY2x1c3RlcldvcmtlcklkKTtcbn1cblxuLy8gRXhwb3J0IGFsbCBvdGhlciBmdW5jdGlvbnMgYXMgcHJvcGVydGllcyBvZiB0aGUgZ2VuZXJhdGUgZnVuY3Rpb25cbm1vZHVsZS5leHBvcnRzID0gZ2VuZXJhdGU7XG5tb2R1bGUuZXhwb3J0cy5nZW5lcmF0ZSA9IGdlbmVyYXRlO1xubW9kdWxlLmV4cG9ydHMuc2VlZCA9IHNlZWQ7XG5tb2R1bGUuZXhwb3J0cy53b3JrZXIgPSB3b3JrZXI7XG5tb2R1bGUuZXhwb3J0cy5jaGFyYWN0ZXJzID0gY2hhcmFjdGVycztcbm1vZHVsZS5leHBvcnRzLmlzVmFsaWQgPSBpc1ZhbGlkO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFscGhhYmV0ID0gcmVxdWlyZSgnLi9hbHBoYWJldCcpO1xuXG5mdW5jdGlvbiBpc1Nob3J0SWQoaWQpIHtcbiAgICBpZiAoIWlkIHx8IHR5cGVvZiBpZCAhPT0gJ3N0cmluZycgfHwgaWQubGVuZ3RoIDwgNiApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBub25BbHBoYWJldGljID0gbmV3IFJlZ0V4cCgnW14nICtcbiAgICAgIGFscGhhYmV0LmdldCgpLnJlcGxhY2UoL1t8XFxcXHt9KClbXFxdXiQrKj8uLV0vZywgJ1xcXFwkJicpICtcbiAgICAnXScpO1xuICAgIHJldHVybiAhbm9uQWxwaGFiZXRpYy50ZXN0KGlkKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1Nob3J0SWQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcnlwdG8gPSB0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiAod2luZG93LmNyeXB0byB8fCB3aW5kb3cubXNDcnlwdG8pOyAvLyBJRSAxMSB1c2VzIHdpbmRvdy5tc0NyeXB0b1xuXG52YXIgcmFuZG9tQnl0ZTtcblxuaWYgKCFjcnlwdG8gfHwgIWNyeXB0by5nZXRSYW5kb21WYWx1ZXMpIHtcbiAgICByYW5kb21CeXRlID0gZnVuY3Rpb24oc2l6ZSkge1xuICAgICAgICB2YXIgYnl0ZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgICAgICAgIGJ5dGVzLnB1c2goTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU2KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgIH07XG59IGVsc2Uge1xuICAgIHJhbmRvbUJ5dGUgPSBmdW5jdGlvbihzaXplKSB7XG4gICAgICAgIHJldHVybiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KHNpemUpKTtcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJhbmRvbUJ5dGU7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIEZvdW5kIHRoaXMgc2VlZC1iYXNlZCByYW5kb20gZ2VuZXJhdG9yIHNvbWV3aGVyZVxuLy8gQmFzZWQgb24gVGhlIENlbnRyYWwgUmFuZG9taXplciAxLjMgKEMpIDE5OTcgYnkgUGF1bCBIb3VsZSAoaG91bGVAbXNjLmNvcm5lbGwuZWR1KVxuXG52YXIgc2VlZCA9IDE7XG5cbi8qKlxuICogcmV0dXJuIGEgcmFuZG9tIG51bWJlciBiYXNlZCBvbiBhIHNlZWRcbiAqIEBwYXJhbSBzZWVkXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5mdW5jdGlvbiBnZXROZXh0VmFsdWUoKSB7XG4gICAgc2VlZCA9IChzZWVkICogOTMwMSArIDQ5Mjk3KSAlIDIzMzI4MDtcbiAgICByZXR1cm4gc2VlZC8oMjMzMjgwLjApO1xufVxuXG5mdW5jdGlvbiBzZXRTZWVkKF9zZWVkXykge1xuICAgIHNlZWQgPSBfc2VlZF87XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG5leHRWYWx1ZTogZ2V0TmV4dFZhbHVlLFxuICAgIHNlZWQ6IHNldFNlZWRcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gMDtcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJuYW1lXCI6IFwiYXBwLmhvb2Rtb2RlLmNvXCIsXG4gIFwiZGlzcGxheU5hbWVcIjogXCJIb29kbW9kZVwiLFxuICBcInZlcnNpb25cIjogXCIwLjAuM1wiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiQSBzYW1wbGUgQXBhY2hlIENvcmRvdmEgYXBwbGljYXRpb24gdGhhdCByZXNwb25kcyB0byB0aGUgZGV2aWNlcmVhZHkgZXZlbnQuXCIsXG4gIFwibWFpblwiOiBcImluZGV4LmpzXCIsXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJkZXZcIjogXCJidWRvIHNyYy9pbmRleC5qc3ggLS1mb3JjZS1kZWZhdWx0LWluZGV4IC0tZGlyIHd3dyAtLWNzcyBpbmRleC5jc3MgLS13YXRjaC1nbG9iPXd3dy9pbmRleC5jc3MgLS1saXZlIC0tIC10IGJhYmVsaWZ5XCJcbiAgfSxcbiAgXCJrZXl3b3Jkc1wiOiBbXG4gICAgXCJlY29zeXN0ZW06Y29yZG92YVwiXG4gIF0sXG4gIFwiYXV0aG9yXCI6IFwiQXBhY2hlIENvcmRvdmEgVGVhbVwiLFxuICBcImxpY2Vuc2VcIjogXCJBcGFjaGUtMi4wXCIsXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBiYWJlbC9wb2x5ZmlsbFwiOiBcIl43LjguM1wiLFxuICAgIFwiY29yZG92YS1hbmRyb2lkXCI6IFwiXjguMS4wXCIsXG4gICAgXCJjb3Jkb3ZhLXBsdWdpbi1zdGF0dXNiYXJcIjogXCJeMi40LjNcIixcbiAgICBcInByZWFjdFwiOiBcIl4xMC4zLjFcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAYmFiZWwvY2xpXCI6IFwiXjcuOC4zXCIsXG4gICAgXCJAYmFiZWwvY29yZVwiOiBcIl43LjQuM1wiLFxuICAgIFwiQGJhYmVsL3BsdWdpbi1wcm9wb3NhbC1jbGFzcy1wcm9wZXJ0aWVzXCI6IFwiXjcuOC4zXCIsXG4gICAgXCJAYmFiZWwvcGx1Z2luLXRyYW5zZm9ybS1yZWFjdC1qc3hcIjogXCJeNy44LjNcIixcbiAgICBcIkBiYWJlbC9wcmVzZXQtZW52XCI6IFwiXjcuOC4zXCIsXG4gICAgXCJiYWJlbC1wcmVzZXQtcHJlYWN0XCI6IFwiXjIuMC4wXCIsXG4gICAgXCJiYWJlbGlmeVwiOiBcIl4xMC4wLjBcIixcbiAgICBcImJyb3dzZXJpZnlcIjogXCJeMTYuMS4wXCIsXG4gICAgXCJidWRvXCI6IFwiXjExLjYuM1wiLFxuICAgIFwiY29yZG92YVwiOiBcIl45LjAuMFwiLFxuICAgIFwiY29yZG92YS1wbHVnaW4td2hpdGVsaXN0XCI6IFwiXjEuMy40XCIsXG4gICAgXCJ1Z2xpZnlpZnlcIjogXCJeNC4wLjVcIixcbiAgICBcInNob3J0aWRcIjogXCJeMi4yLjE1XCJcbiAgfSxcbiAgXCJjb3Jkb3ZhXCI6IHtcbiAgICBcInBsdWdpbnNcIjoge1xuICAgICAgXCJjb3Jkb3ZhLXBsdWdpbi13aGl0ZWxpc3RcIjoge30sXG4gICAgICBcImNvcmRvdmEtcGx1Z2luLXN0YXR1c2JhclwiOiB7fVxuICAgIH0sXG4gICAgXCJwbGF0Zm9ybXNcIjogW1xuICAgICAgXCJhbmRyb2lkXCJcbiAgICBdXG4gIH1cbn0iLCJpbXBvcnQgXCJwcmVhY3QvZGVidWdcIjtcblxuaW1wb3J0IHsgaCwgcmVuZGVyIH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCBBcHAgZnJvbSAnLi92aWV3L0FwcC5qc3gnO1xuaW1wb3J0IEFwcENvbnRleHQgZnJvbSAnLi91dGlscy9BcHBDb250ZXh0LmpzJztcbmltcG9ydCBzaG9ydGlkIGZyb20gJ3Nob3J0aWQnO1xuaW1wb3J0IEFwcENvbnRyb2xsZXIgZnJvbSAnLi9tb2RlbC9BcHBDb250cm9sbGVyLmpzJztcbmltcG9ydCBBcHBIZWxwZXIgZnJvbSAnLi9tb2RlbC9BcHBIZWxwZXIuanMnO1xuaW1wb3J0IENvbmR1Y3RvciBmcm9tICcuL21vZGVsL0NvbmR1Y3Rvci5qcyc7XG5cbmxldCBjb25kdWN0b3IsIGFwcEhlbHBlciwgYXBwQ29udHJvbGxlcjtcblxudHJ5IHtcblx0Y29uZHVjdG9yPW5ldyBDb25kdWN0b3IoKTtcblx0YXBwSGVscGVyPW5ldyBBcHBIZWxwZXIoY29uZHVjdG9yKTtcblx0YXBwQ29udHJvbGxlcj1uZXcgQXBwQ29udHJvbGxlcihjb25kdWN0b3IsYXBwSGVscGVyKTtcbn1cblxuY2F0Y2ggKGUpIHtcblx0YWxlcnQoZSk7XG59XG5cbmNvbmR1Y3Rvci5vblBsYXlHcmlkSW5kZXhDaGFuZ2U9KGdyaWRJbmRleCwgc2VxdWVuY2VJbmRleCk9Pntcblx0Zm9yIChsZXQgZWwgb2YgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jdXJyZW50LWJlYXRcIikpXG5cdFx0ZWwuY2xhc3NMaXN0LnJlbW92ZSgnY3VycmVudC1iZWF0Jyk7XG5cblx0aWYgKGdyaWRJbmRleD49MClcblx0XHRmb3IgKGxldCBlbCBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmJlYXQtXCIrZ3JpZEluZGV4KSlcblx0XHRcdGVsLmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQtYmVhdCcpO1xuXG5cdGZvciAobGV0IGVsIG9mIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY3VycmVudC1zZXF1ZW5jZVwiKSlcblx0XHRlbC5jbGFzc0xpc3QucmVtb3ZlKCdjdXJyZW50LXNlcXVlbmNlJyk7XG5cblx0aWYgKGdyaWRJbmRleCU0PT0wICYmIHNlcXVlbmNlSW5kZXg+PTApXG5cdFx0Zm9yIChsZXQgZWwgb2YgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zZXF1ZW5jZS1cIitzZXF1ZW5jZUluZGV4KSlcblx0XHRcdGVsLmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQtc2VxdWVuY2UnKTtcbn1cblxuZnVuY3Rpb24gb25TdGF0ZUNoYW5nZShzdGF0ZSkge1xuXHRjb25kdWN0b3Iuc2V0U3RhdGUoc3RhdGUpO1xuXHR3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJob29kbW9kZS1zb25nc1wiLEpTT04uc3RyaW5naWZ5KHN0YXRlLnNvbmdzKSk7XG59XG5cbmxldCBhcHBDb250ZXh0PShcblx0PEFwcENvbnRleHRcblx0XHRcdGNvbnRyb2xsZXI9e2FwcENvbnRyb2xsZXJ9XG5cdFx0XHRoZWxwZXI9e2FwcEhlbHBlcn1cblx0XHRcdGluaXRBY3Rpb249XCJpbml0XCJcblx0XHRcdG9uU3RhdGVDaGFuZ2U9e29uU3RhdGVDaGFuZ2V9PlxuXHRcdDxBcHAvPlxuXHQ8L0FwcENvbnRleHQ+XG4pO1xuXG5mdW5jdGlvbiBzdGFydCgpIHtcblx0cmVuZGVyKGFwcENvbnRleHQsIGRvY3VtZW50LmJvZHkpO1xufVxuXG5pZiAod2luZG93Lmhhc093blByb3BlcnR5KFwiY29yZG92YVwiKSlcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZGV2aWNlcmVhZHknLHN0YXJ0KTtcblxuZWxzZVxuXHRzdGFydCgpO1xuIiwiaW1wb3J0IHNob3J0aWQgZnJvbSAnc2hvcnRpZCc7XG5pbXBvcnQgXCJyZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwQ29udHJvbGxlciB7XG5cdGNvbnN0cnVjdG9yKGNvbmR1Y3RvciwgaGVscGVyKSB7XG5cdFx0dGhpcy5jb25kdWN0b3I9Y29uZHVjdG9yO1xuXHRcdHRoaXMuaGVscGVyPWhlbHBlcjtcblx0fVxuXG5cdGluaXRTdGF0ZSgpIHtcblx0XHRsZXQgc3RhdGU9e1xuXHRcdFx0Y3VycmVudFNvbmdJbmRleDogLTEsXG5cdFx0XHRjdXJyZW50TGF5ZXJJbmRleDogLTEsXG5cdFx0XHRjdXJyZW50Q2hvcmRJbmRleDogMCxcblx0XHRcdGN1cnJlbnRTZWN0aW9uSW5kZXg6IC0xLFxuXHRcdFx0Y3VycmVudEdyaWRJbmRleDogLTEsXG5cdFx0XHRzZXR0aW5nc1Zpc2libGU6IGZhbHNlLFxuXHRcdFx0YWRkTGF5ZXJWaXNpYmxlOiBmYWxzZSxcblx0XHRcdHNvbmdzOiBbXSxcblx0XHRcdGluc3RydW1lbnRzOiBbXSxcblx0XHRcdHBsYXlpbmc6IGZhbHNlLFxuXHRcdFx0cmVjb3JkaW5nOiBmYWxzZSxcblx0XHRcdGVkaXRTZWN0aW9uQ2hvcmRWaXNpYmxlOiAtMSxcblx0XHRcdGFib3V0U2NyZWVuVmlzaWJsZTogZmFsc2Vcblx0XHR9O1xuXG5cdFx0c3RhdGUuaW5zdHJ1bWVudHMucHVzaCh7XG5cdFx0XHRcImtleVwiOiBcImJhZC1qYXp6LWRydW1zXCIsXG5cdFx0XHRcInR5cGVcIjogXCJwZXJjdXNzaXZlXCIsXG5cdFx0XHRcIm5hbWVcIjogXCJCYWQgSmF6eiBEcnVtc1wiLFxuXHRcdFx0XCJsYWJlbHNcIjogW1wiS0lDS1wiLFwiU05BUkVcIixcIkhJLUhBVFwiXSxcblx0XHRcdFwiaWNvblwiOiBcImRydW0uc3ZnXCIsXG5cdFx0XHRcImljb25zXCI6IFtcImtpY2stZHJ1bS5zdmdcIixcInNuYXJlLWRydW0uc3ZnXCIsXCJoaS1oYXQuc3ZnXCJdLFxuXHRcdFx0XCJzYW1wbGVzXCI6IFtcblx0XHRcdFx0XCJzYW1wbGVzL2RydW1zL2JhZC1raWNrLndhdlwiLFxuXHRcdFx0XHRcInNhbXBsZXMvZHJ1bXMvYmFkLXNuYXJlLndhdlwiLFxuXHRcdFx0XHRcInNhbXBsZXMvZHJ1bXMvYmFkLWhpaGF0LndhdlwiLFxuXHRcdFx0XVxuXHRcdH0pO1xuXG5cdFx0c3RhdGUuaW5zdHJ1bWVudHMucHVzaCh7XG5cdFx0XHRcImtleVwiOiBcInllcy1kcnVtc1wiLFxuXHRcdFx0XCJ0eXBlXCI6IFwicGVyY3Vzc2l2ZVwiLFxuXHRcdFx0XCJuYW1lXCI6IFwiWWVzIERydW1zXCIsXG5cdFx0XHRcImxhYmVsc1wiOiBbXCJLSUNLXCIsXCJTTkFSRVwiLFwiSEktSEFUIDFcIixcIkhJLUhBVCAyXCIsXCJISS1IQVQgM1wiXSxcblx0XHRcdFwiaWNvblwiOiBcImRydW0uc3ZnXCIsXG5cdFx0XHRcImljb25zXCI6IFtcImtpY2stZHJ1bS5zdmdcIixcInNuYXJlLWRydW0uc3ZnXCIsXCJoaS1oYXQuc3ZnXCIsXCJoaS1oYXQuc3ZnXCIsXCJoaS1oYXQuc3ZnXCJdLFxuXHRcdFx0XCJzYW1wbGVzXCI6IFtcblx0XHRcdFx0XCJzYW1wbGVzL2RydW1zL3llcy1raWNrLm1wM1wiLFxuXHRcdFx0XHRcInNhbXBsZXMvZHJ1bXMveWVzLXNuYXJlLm1wM1wiLFxuXHRcdFx0XHRcInNhbXBsZXMvZHJ1bXMvdGhybC1oYXRfQV9taW5vci53YXZcIixcblx0XHRcdFx0XCJzYW1wbGVzL2RydW1zL3ZpbnlsLWhhdF85MGJwbV9DLndhdlwiLFxuXHRcdFx0XHRcInNhbXBsZXMvZHJ1bXMvcm9jay1oaWhhdC10Y2hpay53YXZcIlxuXHRcdFx0XVxuXHRcdH0pO1xuXG5cdFx0c3RhdGUuaW5zdHJ1bWVudHMucHVzaCh7XG5cdFx0XHRcImtleVwiOiBcImRpdmUtYmFzc1wiLFxuXHRcdFx0XCJ0eXBlXCI6IFwiaGFybW9uaWNcIixcblx0XHRcdFwibmFtZVwiOiBcIkRpdmUgQmFzc1wiLFxuXHRcdFx0XCJzYW1wbGVcIjogXCJzYW1wbGVzL2Jhc3MvdXByaWdodC1iYXNzLWJvbWJkaXZlLm1wM1wiLFxuXHRcdFx0XCJpY29uXCI6IFwiYmFzcy5zdmdcIlxuXHRcdH0pO1xuXG5cdFx0c3RhdGUuaW5zdHJ1bWVudHMucHVzaCh7XG5cdFx0XHRcImtleVwiOiBcImFjb3VzdGljLWJhc3NcIixcblx0XHRcdFwidHlwZVwiOiBcImhhcm1vbmljXCIsXG5cdFx0XHRcIm5hbWVcIjogXCJBY291c3RpYyBCYXNzXCIsXG5cdFx0XHRcInNhbXBsZU5vdGVcIjogXCJGI1wiLFxuXHRcdFx0XCJzYW1wbGVcIjogXCJzYW1wbGVzL2Jhc3MvYWNvdXN0aWNfYmFzc19mX3NoYXJwLm1wM1wiLFxuXHRcdFx0XCJpY29uXCI6IFwiYmFzcy5zdmdcIlxuXHRcdH0pO1xuXG5cdFx0c3RhdGUuaW5zdHJ1bWVudHMucHVzaCh7XG5cdFx0XHRcImtleVwiOiBcInBpYW5vXCIsXG5cdFx0XHRcInR5cGVcIjogXCJoYXJtb25pY1wiLFxuXHRcdFx0XCJuYW1lXCI6IFwiUGlhbm9cIixcblx0XHRcdFwic2FtcGxlXCI6IFwic2FtcGxlcy9waWFuby9waWFuby1jLndhdlwiLFxuXHRcdFx0XCJkZWZhdWx0Vm9sdW1lXCI6IDAuMjUsXG5cdFx0XHRcImljb25cIjogXCJwaWFuby5zdmdcIlxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0YXN5bmMgaW5pdCgpIHtcblx0XHRsZXQgc3RhdGU9dGhpcy5pbml0U3RhdGUoKTtcblx0XHRsZXQgc29uZ0RhdGFKc29uPXdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImhvb2Rtb2RlLXNvbmdzXCIpO1xuXHRcdGlmIChzb25nRGF0YUpzb24pXG5cdFx0XHRzdGF0ZS5zb25ncz1KU09OLnBhcnNlKHNvbmdEYXRhSnNvbik7XG5cblx0XHR0aGlzLmNvbmR1Y3Rvci5zZXRTdGF0ZShzdGF0ZSk7XG5cdFx0YXdhaXQgdGhpcy5jb25kdWN0b3IubG9hZEluc3RydW1lbnRzKCk7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH07XG5cblx0YWRkU29uZyhzdGF0ZSwgbmFtZSkge1xuXHRcdGlmICghbmFtZSB8fCBuYW1lLnRvU3RyaW5nKCk9PVwiW29iamVjdCBNb3VzZUV2ZW50XVwiKVxuXHRcdFx0bmFtZT1cIk15IE5ldyBTb25nXCI7XG5cblx0XHRsZXQgaW5kZXg9c3RhdGUuc29uZ3MubGVuZ3RoO1xuXG5cdFx0c3RhdGUuc29uZ3MucHVzaCh7XG5cdFx0XHRuYW1lOiBuYW1lLFxuXHRcdFx0YnBtOiAxMDAsXG5cdFx0XHRrZXk6IHNob3J0aWQuZ2VuZXJhdGUoKSxcblx0XHRcdG11c2ljS2V5OiBcIkFcIixcblx0XHRcdG1pbm9yOiB0cnVlLFxuXHRcdFx0bGF5ZXJzOiBbXSxcblx0XHRcdGNob3JkU2VxdWVuY2U6IFtdLFxuXHRcdFx0c2VjdGlvbnM6IFtcblx0XHRcdFx0WzBdLFxuXHRcdFx0XHRbMF0sXG5cdFx0XHRcdFswXVxuXHRcdFx0XVxuXHRcdH0pO1xuXG5cdFx0c3RhdGU9dGhpcy5zZXRTb25nSW5kZXgoc3RhdGUsaW5kZXgpO1xuXHRcdHN0YXRlPXRoaXMuYWRkU2VxdWVuY2VDaG9yZChzdGF0ZSk7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRzZXRDdXJyZW50Q2hvcmRJbmRleChzdGF0ZSwgaW5kZXgpIHtcblx0XHRzdGF0ZS5jdXJyZW50Q2hvcmRJbmRleD1pbmRleDtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHNldEN1cnJlbnRTZWN0aW9uSW5kZXgoc3RhdGUsIGluZGV4KSB7XG5cdFx0c3RhdGUuY3VycmVudFNlY3Rpb25JbmRleD1pbmRleDtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdGNsb3NlU29uZyhzdGF0ZSkge1xuXHRcdHN0YXRlLmN1cnJlbnRTb25nSW5kZXg9LTE7XG5cdFx0c3RhdGUuY3VycmVudFNlY3Rpb25JbmRleD0tMTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHNldFNvbmdJbmRleChzdGF0ZSwgaW5kZXgpIHtcblx0XHRpZiAoaW5kZXg9PXN0YXRlLmN1cnJlbnRTb25nSW5kZXgpXG5cdFx0XHRyZXR1cm4gc3RhdGU7XG5cblx0XHRzdGF0ZS5jdXJyZW50U29uZ0luZGV4PWluZGV4O1xuXHRcdHN0YXRlLmN1cnJlbnRMYXllckluZGV4PS0xO1xuXHRcdHN0YXRlLmN1cnJlbnRDaG9yZEluZGV4PTA7XG5cdFx0c3RhdGUuY3VycmVudEdyaWRJbmRleD0tMTtcblx0XHRzdGF0ZS5jdXJyZW50U2VjdGlvbkluZGV4PS0xO1xuXHRcdHN0YXRlLnBsYXlpbmc9ZmFsc2U7XG5cdFx0c3RhdGUucmVjb3JkaW5nPWZhbHNlO1xuXG5cdFx0bGV0IHNvbmc9dGhpcy5oZWxwZXIuZ2V0Q3VycmVudFNvbmcoc3RhdGUpO1xuXHRcdGZvciAobGV0IGk9c29uZy5zZWN0aW9ucy5sZW5ndGgtMTsgaT49MDsgaS0tKVxuXHRcdFx0aWYgKHNvbmcuc2VjdGlvbnNbaV0ubGVuZ3RoPjEpXG5cdFx0XHRcdHN0YXRlLmN1cnJlbnRTZWN0aW9uSW5kZXg9aTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHNob3dTZXR0aW5ncyhzdGF0ZSkge1xuXHRcdHN0YXRlLnNldHRpbmdzVmlzaWJsZT10cnVlO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0aGlkZVNldHRpbmdzKHN0YXRlKSB7XG5cdFx0c3RhdGUuc2V0dGluZ3NWaXNpYmxlPWZhbHNlO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0c2hvd0Fib3V0U2NyZWVuKHN0YXRlKSB7XG5cdFx0c3RhdGUuYWJvdXRTY3JlZW5WaXNpYmxlPXRydWU7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRoaWRlQWJvdXRTY3JlZW4oc3RhdGUpIHtcblx0XHRzdGF0ZS5hYm91dFNjcmVlblZpc2libGU9ZmFsc2U7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHR0b2dnbGVTZXR0aW5ncyhzdGF0ZSkge1xuXHRcdHN0YXRlLnNldHRpbmdzVmlzaWJsZT0hc3RhdGUuc2V0dGluZ3NWaXNpYmxlO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0c2V0Q3VycmVudFNvbmdOYW1lKHN0YXRlLCBuYW1lKSB7XG5cdFx0c3RhdGUuc29uZ3Nbc3RhdGUuY3VycmVudFNvbmdJbmRleF0ubmFtZT1uYW1lO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0c2V0Q3VycmVudFNvbmdCcG0oc3RhdGUsIGJwbSkge1xuXHRcdGJwbT1wYXJzZUludChicG0pO1xuXHRcdGlmIChpc05hTihicG0pKVxuXHRcdFx0YnBtPTEwMDtcblxuXHRcdGlmIChicG08NTApXG5cdFx0XHRicG09NTA7XG5cblx0XHRpZiAoYnBtPjIwMClcblx0XHRcdGJwbT0yMDA7XG5cblx0XHRzdGF0ZS5zb25nc1tzdGF0ZS5jdXJyZW50U29uZ0luZGV4XS5icG09YnBtO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0c2V0Q3VycmVudFNvbmdNdXNpY0tleShzdGF0ZSwgbXVzaWNLZXkpIHtcblx0XHRzdGF0ZS5zb25nc1tzdGF0ZS5jdXJyZW50U29uZ0luZGV4XS5tdXNpY0tleT1tdXNpY0tleTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHNldEN1cnJlbnRTb25nTWlub3Ioc3RhdGUsIG1pbm9yKSB7XG5cdFx0c3RhdGUuc29uZ3Nbc3RhdGUuY3VycmVudFNvbmdJbmRleF0ubWlub3I9bWlub3I7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRkZWxldGVDdXJyZW50U29uZyhzdGF0ZSkge1xuXHRcdHN0YXRlLnNvbmdzLnNwbGljZShzdGF0ZS5jdXJyZW50U29uZ0luZGV4LDEpO1xuXHRcdHN0YXRlLmN1cnJlbnRTb25nSW5kZXg9LTE7XG5cdFx0c3RhdGUuc2V0dGluZ3NWaXNpYmxlPWZhbHNlO1xuXHRcdHN0YXRlLmN1cnJlbnRTZWN0aW9uSW5kZXg9LTE7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRzaG93QWRkTGF5ZXIoc3RhdGUpIHtcblx0XHRzdGF0ZS5hZGRMYXllclZpc2libGU9dHJ1ZTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdGhpZGVBZGRMYXllcihzdGF0ZSkge1xuXHRcdHN0YXRlLmFkZExheWVyVmlzaWJsZT1mYWxzZTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdGFkZFNlcXVlbmNlQ2hvcmQoc3RhdGUpIHtcblx0XHRsZXQgc29uZz10aGlzLmhlbHBlci5nZXRDdXJyZW50U29uZyhzdGF0ZSk7XG5cblx0XHRzb25nLmNob3JkU2VxdWVuY2UucHVzaCh7XG5cdFx0XHRjaG9yZEluZGV4OiAwLFxuXHRcdFx0a2V5OiBzaG9ydGlkLmdlbmVyYXRlKClcblx0XHR9KTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdGFkZExheWVyKHN0YXRlLCBpbnN0cnVtZW50TmFtZSkge1xuXHRcdGxldCBzb25nPXN0YXRlLnNvbmdzW3N0YXRlLmN1cnJlbnRTb25nSW5kZXhdO1xuXG5cdFx0bGV0IHNlcT1bXTtcblx0XHRsZXQgbnVtU291bmRzPXRoaXMuaGVscGVyLmdldEluc3RydW1lbnROdW1Tb3VuZHNCeU5hbWUoc3RhdGUsaW5zdHJ1bWVudE5hbWUpO1xuXHRcdGxldCBpbnN0cnVtZW50PXRoaXMuaGVscGVyLmdldEluc3RydW1lbnRCeU5hbWUoc3RhdGUsaW5zdHJ1bWVudE5hbWUpO1xuXG5cdFx0bGV0IHZvbHVtZT0xO1xuXHRcdGlmIChpbnN0cnVtZW50Lmhhc093blByb3BlcnR5KFwiZGVmYXVsdFZvbHVtZVwiKSlcblx0XHRcdHZvbHVtZT1pbnN0cnVtZW50LmRlZmF1bHRWb2x1bWU7XG5cblx0XHRmb3IgKGxldCBpPTA7IGk8MTY7IGkrKylcblx0XHRcdHNlcS5wdXNoKHtcblx0XHRcdFx0c291bmRzOiBbXSxcblx0XHRcdFx0dmVsOiAxLFxuXHRcdFx0XHRzdGFjYzogZmFsc2Vcblx0XHRcdH0pO1xuXG5cdFx0bGV0IGxheWVyPXtcblx0XHRcdGtleTogc2hvcnRpZC5nZW5lcmF0ZSgpLFxuXHRcdFx0aW5zdHJ1bWVudE5hbWU6IGluc3RydW1lbnROYW1lLFxuXHRcdFx0YXVkaWJsZTogdHJ1ZSxcblx0XHRcdHZvbHVtZTogdm9sdW1lLFxuXHRcdFx0c2VxOiBzZXEsXG5cdFx0fTtcblxuXHRcdHNvbmcubGF5ZXJzLnB1c2gobGF5ZXIpO1xuXG5cdFx0c3RhdGUuYWRkTGF5ZXJWaXNpYmxlPWZhbHNlO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0c2V0TGF5ZXJJbmRleChzdGF0ZSwgaW5kZXgpIHtcblx0XHRzdGF0ZS5jdXJyZW50TGF5ZXJJbmRleD1pbmRleDtcblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRoaWRlQ3VycmVudExheWVyKHN0YXRlKSB7XG5cdFx0c3RhdGUuY3VycmVudExheWVySW5kZXg9LTE7XG5cdFx0c3RhdGUuY3VycmVudEdyaWRJbmRleD0tMTtcblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHR0b2dnbGVMYXllckF1ZGlibGUoc3RhdGUsIGxheWVySW5kZXgpIHtcblx0XHRsZXQgc29uZz10aGlzLmhlbHBlci5nZXRDdXJyZW50U29uZyhzdGF0ZSk7XG5cdFx0c29uZy5sYXllcnNbbGF5ZXJJbmRleF0uYXVkaWJsZT0hc29uZy5sYXllcnNbbGF5ZXJJbmRleF0uYXVkaWJsZTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdGRlbGV0ZUN1cnJlbnRMYXllcihzdGF0ZSkge1xuXHRcdGxldCBzb25nPXRoaXMuaGVscGVyLmdldEN1cnJlbnRTb25nKHN0YXRlKTtcblx0XHRzb25nLmxheWVycy5zcGxpY2Uoc3RhdGUuY3VycmVudExheWVySW5kZXgsMSk7XG5cdFx0c3RhdGUuY3VycmVudExheWVySW5kZXg9LTE7XG5cdFx0c3RhdGUuY3VycmVudEdyaWRJbmRleD0tMTtcblx0XHRzdGF0ZS5zZXR0aW5nc1Zpc2libGU9ZmFsc2U7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRzZXRDdXJyZW50TGF5ZXJWb2x1bWUoc3RhdGUsIHZvbHVtZSkge1xuXHRcdGxldCBsYXllcj10aGlzLmhlbHBlci5nZXRDdXJyZW50TGF5ZXIoc3RhdGUpO1xuXHRcdGxheWVyLnZvbHVtZT1wYXJzZUZsb2F0KHZvbHVtZSk7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRwbGF5Q2xpY2soc3RhdGUpIHtcblx0XHRzdGF0ZS5wbGF5aW5nPSFzdGF0ZS5wbGF5aW5nO1xuXHRcdHN0YXRlLmN1cnJlbnRHcmlkSW5kZXg9LTE7XG5cblx0XHRpZiAoIXN0YXRlLnBsYXlpbmcpXG5cdFx0XHRzdGF0ZS5yZWNvcmRpbmc9ZmFsc2U7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRyZWNvcmRDbGljayhzdGF0ZSkge1xuXHRcdHN0YXRlLnJlY29yZGluZz0hc3RhdGUucmVjb3JkaW5nO1xuXHRcdHN0YXRlLmN1cnJlbnRHcmlkSW5kZXg9LTE7XG5cblx0XHRpZiAoc3RhdGUucmVjb3JkaW5nICYmICFzdGF0ZS5wbGF5aW5nKVxuXHRcdFx0c3RhdGUucGxheWluZz10cnVlO1xuXG5cdFx0aWYgKCFzdGF0ZS5wbGF5aW5nKVxuXHRcdFx0c3RhdGUuY3VycmVudEdyaWRJbmRleD0tMTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdGRlbGV0ZVNlcXVlbmNlQ2hvcmQoc3RhdGUsIGluZGV4KSB7XG5cdFx0bGV0IHNvbmc9dGhpcy5oZWxwZXIuZ2V0Q3VycmVudFNvbmcoc3RhdGUpO1xuXHRcdHNvbmcuY2hvcmRTZXF1ZW5jZS5zcGxpY2UoaW5kZXgsMSk7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRzZXRTZXF1ZW5jZUNob3JkKHN0YXRlLCBzZXF1ZW5jZUluZGV4LCBjaG9yZEluZGV4KSB7XG5cdFx0bGV0IHNvbmc9dGhpcy5oZWxwZXIuZ2V0Q3VycmVudFNvbmcoc3RhdGUpO1xuXHRcdHNvbmcuY2hvcmRTZXF1ZW5jZVtzZXF1ZW5jZUluZGV4XS5jaG9yZEluZGV4PWNob3JkSW5kZXg7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRnb0JhY2soc3RhdGUpIHtcblx0XHRpZiAoc3RhdGUuc2V0dGluZ3NWaXNpYmxlKVxuXHRcdFx0cmV0dXJuIHRoaXMuaGlkZVNldHRpbmdzKHN0YXRlKTtcblxuXHRcdGVsc2UgaWYgKHN0YXRlLmN1cnJlbnRMYXllckluZGV4Pj0wKSB7XG5cdFx0XHRzdGF0ZS5jdXJyZW50TGF5ZXJJbmRleD0tMTtcblx0XHRcdHN0YXRlLmN1cnJlbnRHcmlkSW5kZXg9LTE7XG5cdFx0XHRyZXR1cm4gc3RhdGU7XG5cdFx0fVxuXG5cdFx0ZWxzZSBpZiAoc3RhdGUuYWRkTGF5ZXJWaXNpYmxlKVxuXHRcdFx0cmV0dXJuIHRoaXMuaGlkZUFkZExheWVyKHN0YXRlKTtcblxuXHRcdGVsc2UgaWYgKHRoaXMuaGVscGVyLmlzU29uZ09wZW4oc3RhdGUpKVxuXHRcdFx0cmV0dXJuIHRoaXMuY2xvc2VTb25nKHN0YXRlKVxuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0Z3JpZEluZGV4Q2xpY2soc3RhdGUsIG5ld0dyaWRJbmRleCkge1xuXHRcdHN0YXRlLnBsYXlpbmc9ZmFsc2U7XG5cdFx0c3RhdGUucmVjb3JkaW5nPWZhbHNlO1xuXG5cdFx0aWYgKHN0YXRlLmN1cnJlbnRHcmlkSW5kZXg9PW5ld0dyaWRJbmRleClcblx0XHRcdHN0YXRlLmN1cnJlbnRHcmlkSW5kZXg9LTE7XG5cblx0XHRlbHNlXG5cdFx0XHRzdGF0ZS5jdXJyZW50R3JpZEluZGV4PW5ld0dyaWRJbmRleDtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHRvZ2dsZUN1cnJlbnRMYXllclN0YWNjKHN0YXRlKSB7XG5cdFx0bGV0IGxheWVyPXRoaXMuaGVscGVyLmdldEN1cnJlbnRMYXllcihzdGF0ZSk7XG5cdFx0bGV0IGdyaWRJbmRleD1zdGF0ZS5jdXJyZW50R3JpZEluZGV4O1xuXG5cdFx0aWYgKHN0YXRlLnJlY29yZGluZylcblx0XHRcdGdyaWRJbmRleD10aGlzLmNvbmR1Y3Rvci5nZXRQbGF5R3JpZEluZGV4KCk7XG5cblx0XHRpZiAoZ3JpZEluZGV4PDApXG5cdFx0XHRyZXR1cm4gc3RhdGU7XG5cblx0XHRsYXllci5zZXFbZ3JpZEluZGV4XS5zdGFjYz0hbGF5ZXIuc2VxW2dyaWRJbmRleF0uc3RhY2M7XG5cdFx0aWYgKGxheWVyLnNlcVtncmlkSW5kZXhdLnN0YWNjKVxuXHRcdFx0bGF5ZXIuc2VxW2dyaWRJbmRleF0uc291bmRzPVtdO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0c2V0Q3VycmVudExheWVyVmVsKHN0YXRlLCB2ZWwpIHtcblx0XHRsZXQgbGF5ZXI9dGhpcy5oZWxwZXIuZ2V0Q3VycmVudExheWVyKHN0YXRlKTtcblx0XHRsZXQgZ3JpZEluZGV4PXN0YXRlLmN1cnJlbnRHcmlkSW5kZXg7XG5cblx0XHRpZiAoc3RhdGUucmVjb3JkaW5nKVxuXHRcdFx0Z3JpZEluZGV4PXRoaXMuY29uZHVjdG9yLmdldFBsYXlHcmlkSW5kZXgoKTtcblxuXHRcdGlmIChncmlkSW5kZXg8MClcblx0XHRcdHJldHVybiBzdGF0ZTtcblxuXHRcdGxheWVyLnNlcVtncmlkSW5kZXhdLnZlbD12ZWw7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRzZXRHcmlkU291bmQoc3RhdGUsIGdyaWRJbmRleCwgc291bmRJbmRleCwgZW5hYmxlZCkge1xuXHRcdGxldCBsYXllcj10aGlzLmhlbHBlci5nZXRDdXJyZW50TGF5ZXIoc3RhdGUpO1xuXHRcdGxldCBjdXJyZW50RW5hYmxlZD1cblx0XHRcdGxheWVyLnNlcVtncmlkSW5kZXhdLnNvdW5kcy5pbmNsdWRlcyhzb3VuZEluZGV4KTtcblxuXHRcdGlmIChlbmFibGVkPT1jdXJyZW50RW5hYmxlZClcblx0XHRcdHJldHVybiBzdGF0ZTtcblxuXHRcdGlmIChlbmFibGVkKSB7XG5cdFx0XHRsYXllci5zZXFbZ3JpZEluZGV4XS5zb3VuZHMucHVzaChzb3VuZEluZGV4KTtcblx0XHRcdGxheWVyLnNlcVtncmlkSW5kZXhdLnN0YWNjPWZhbHNlO1xuXHRcdH1cblxuXHRcdGVsc2Uge1xuXHRcdFx0bGF5ZXIuc2VxW2dyaWRJbmRleF0uc291bmRzLnNwbGljZShcblx0XHRcdFx0bGF5ZXIuc2VxW2dyaWRJbmRleF0uc291bmRzLmluZGV4T2Yoc291bmRJbmRleCksXG5cdFx0XHRcdDFcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0c2V0Q3VycmVudEdyaWRTb3VuZChzdGF0ZSwgc291bmRJbmRleCwgZW5hYmxlZCkge1xuXHRcdHJldHVybiB0aGlzLnNldEdyaWRTb3VuZChzdGF0ZSxzdGF0ZS5jdXJyZW50R3JpZEluZGV4LHNvdW5kSW5kZXgsZW5hYmxlZCk7XG5cdH1cblxuXHRzb3VuZEJ1dHRvbkNsaWNrKHN0YXRlLCBzb3VuZEluZGV4KSB7XG5cdFx0aWYgKHN0YXRlLnJlY29yZGluZykge1xuXHRcdFx0dGhpcy5jb25kdWN0b3IucGxheUxheWVySW5zdHJ1bWVudChzb3VuZEluZGV4KTtcblxuXHRcdFx0bGV0IGdyaWRJbmRleD10aGlzLmNvbmR1Y3Rvci5nZXRQbGF5R3JpZEluZGV4KCk7XG5cdFx0XHRzdGF0ZT10aGlzLnNldEdyaWRTb3VuZChzdGF0ZSxncmlkSW5kZXgsc291bmRJbmRleCx0cnVlKTtcblxuXHRcdFx0cmV0dXJuIHN0YXRlO1xuXHRcdH1cblxuXHRcdGlmIChzdGF0ZS5jdXJyZW50R3JpZEluZGV4PDApIHtcblx0XHRcdHRoaXMuY29uZHVjdG9yLnBsYXlMYXllckluc3RydW1lbnQoc291bmRJbmRleCk7XG5cdFx0XHRyZXR1cm4gc3RhdGU7XG5cdFx0fVxuXG5cdFx0bGV0IGxheWVyPXRoaXMuaGVscGVyLmdldEN1cnJlbnRMYXllcihzdGF0ZSk7XG5cdFx0bGV0IGVuYWJsZWQ9bGF5ZXIuc2VxW3N0YXRlLmN1cnJlbnRHcmlkSW5kZXhdLnNvdW5kcy5pbmNsdWRlcyhzb3VuZEluZGV4KTtcblx0XHRzdGF0ZT10aGlzLnNldEN1cnJlbnRHcmlkU291bmQoc3RhdGUsc291bmRJbmRleCwhZW5hYmxlZCk7XG5cblx0XHRpZiAobGF5ZXIuc2VxW3N0YXRlLmN1cnJlbnRHcmlkSW5kZXhdLnNvdW5kcy5pbmNsdWRlcyhzb3VuZEluZGV4KSlcblx0XHRcdHRoaXMuY29uZHVjdG9yLnBsYXlMYXllckluc3RydW1lbnQoc291bmRJbmRleCk7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRjaG9yZEJ1dHRvbkNsaWNrKHN0YXRlLCBvY3RhdmUpIHtcblx0XHRsZXQgaW5zdHJ1bWVudD10aGlzLmhlbHBlci5nZXRDdXJyZW50SW5zdHJ1bWVudChzdGF0ZSk7XG5cblx0XHRpZiAoc3RhdGUucmVjb3JkaW5nKSB7XG5cdFx0XHR0aGlzLmNvbmR1Y3Rvci5wbGF5TGF5ZXJJbnN0cnVtZW50KG9jdGF2ZSozKTtcblx0XHRcdHRoaXMuY29uZHVjdG9yLnBsYXlMYXllckluc3RydW1lbnQob2N0YXZlKjMrMSk7XG5cdFx0XHR0aGlzLmNvbmR1Y3Rvci5wbGF5TGF5ZXJJbnN0cnVtZW50KG9jdGF2ZSozKzIpO1xuXG5cdFx0XHRsZXQgZ3JpZEluZGV4PXRoaXMuY29uZHVjdG9yLmdldFBsYXlHcmlkSW5kZXgoKTtcblx0XHRcdHN0YXRlPXRoaXMuc2V0R3JpZFNvdW5kKHN0YXRlLGdyaWRJbmRleCxvY3RhdmUqMyx0cnVlKTtcblx0XHRcdHN0YXRlPXRoaXMuc2V0R3JpZFNvdW5kKHN0YXRlLGdyaWRJbmRleCxvY3RhdmUqMysxLHRydWUpO1xuXHRcdFx0c3RhdGU9dGhpcy5zZXRHcmlkU291bmQoc3RhdGUsZ3JpZEluZGV4LG9jdGF2ZSozKzIsdHJ1ZSk7XG5cblx0XHRcdHJldHVybiBzdGF0ZTtcblx0XHR9XG5cblx0XHRpZiAoc3RhdGUuY3VycmVudEdyaWRJbmRleDwwKSB7XG5cdFx0XHR0aGlzLmNvbmR1Y3Rvci5wbGF5TGF5ZXJJbnN0cnVtZW50KG9jdGF2ZSozKTtcblx0XHRcdHRoaXMuY29uZHVjdG9yLnBsYXlMYXllckluc3RydW1lbnQob2N0YXZlKjMrMSk7XG5cdFx0XHR0aGlzLmNvbmR1Y3Rvci5wbGF5TGF5ZXJJbnN0cnVtZW50KG9jdGF2ZSozKzIpO1xuXHRcdFx0cmV0dXJuIHN0YXRlO1xuXHRcdH1cblxuXHRcdGxldCBsYXllcj10aGlzLmhlbHBlci5nZXRDdXJyZW50TGF5ZXIoc3RhdGUpO1xuXHRcdGlmICh0aGlzLmhlbHBlci5jdXJyZW50TGF5ZXJIYXNDaG9yZEF0KHN0YXRlLHN0YXRlLmN1cnJlbnRHcmlkSW5kZXgsb2N0YXZlKSkge1xuXHRcdFx0c3RhdGU9dGhpcy5zZXRDdXJyZW50R3JpZFNvdW5kKHN0YXRlLG9jdGF2ZSozLGZhbHNlKTtcblx0XHRcdHN0YXRlPXRoaXMuc2V0Q3VycmVudEdyaWRTb3VuZChzdGF0ZSxvY3RhdmUqMysxLGZhbHNlKTtcblx0XHRcdHN0YXRlPXRoaXMuc2V0Q3VycmVudEdyaWRTb3VuZChzdGF0ZSxvY3RhdmUqMysyLGZhbHNlKTtcblx0XHR9XG5cblx0XHRlbHNlIHtcblx0XHRcdHN0YXRlPXRoaXMuc2V0Q3VycmVudEdyaWRTb3VuZChzdGF0ZSxvY3RhdmUqMyx0cnVlKTtcblx0XHRcdHN0YXRlPXRoaXMuc2V0Q3VycmVudEdyaWRTb3VuZChzdGF0ZSxvY3RhdmUqMysxLHRydWUpO1xuXHRcdFx0c3RhdGU9dGhpcy5zZXRDdXJyZW50R3JpZFNvdW5kKHN0YXRlLG9jdGF2ZSozKzIsdHJ1ZSk7XG5cdFx0XHR0aGlzLmNvbmR1Y3Rvci5wbGF5TGF5ZXJJbnN0cnVtZW50KG9jdGF2ZSozKTtcblx0XHRcdHRoaXMuY29uZHVjdG9yLnBsYXlMYXllckluc3RydW1lbnQob2N0YXZlKjMrMSk7XG5cdFx0XHR0aGlzLmNvbmR1Y3Rvci5wbGF5TGF5ZXJJbnN0cnVtZW50KG9jdGF2ZSozKzIpO1xuXHRcdH1cblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdGFkZFNlY3Rpb25DaG9yZChzdGF0ZSkge1xuXHRcdGxldCBzb25nPXRoaXMuaGVscGVyLmdldEN1cnJlbnRTb25nKHN0YXRlKTtcblx0XHRzb25nLnNlY3Rpb25zW3N0YXRlLmN1cnJlbnRTZWN0aW9uSW5kZXhdLnB1c2goMCk7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRzaG93RWRpdFNlY3Rpb25DaG9yZChzdGF0ZSxpbmRleCkge1xuXHRcdHN0YXRlLmVkaXRTZWN0aW9uQ2hvcmRWaXNpYmxlPWluZGV4O1xuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdGhpZGVFZGl0U2VjdGlvbkNob3JkKHN0YXRlLGluZGV4KSB7XG5cdFx0c3RhdGUuZWRpdFNlY3Rpb25DaG9yZFZpc2libGU9LTE7XG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0cmVtb3ZlU2VjdGlvbkNob3JkKHN0YXRlKSB7XG5cdFx0bGV0IHNvbmc9dGhpcy5oZWxwZXIuZ2V0Q3VycmVudFNvbmcoc3RhdGUpO1xuXHRcdHNvbmcuc2VjdGlvbnNbc3RhdGUuY3VycmVudFNlY3Rpb25JbmRleF0uc3BsaWNlKHN0YXRlLmVkaXRTZWN0aW9uQ2hvcmRWaXNpYmxlLDEpO1xuXG5cdFx0c3RhdGUuZWRpdFNlY3Rpb25DaG9yZFZpc2libGU9LTE7XG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0ZWRpdFNlY3Rpb25DaG9yZChzdGF0ZSwgaW5kZXgpIHtcblx0XHRsZXQgc29uZz10aGlzLmhlbHBlci5nZXRDdXJyZW50U29uZyhzdGF0ZSk7XG5cdFx0c29uZy5zZWN0aW9uc1tzdGF0ZS5jdXJyZW50U2VjdGlvbkluZGV4XVtzdGF0ZS5lZGl0U2VjdGlvbkNob3JkVmlzaWJsZV09aW5kZXg7XG5cdFx0c3RhdGUuZWRpdFNlY3Rpb25DaG9yZFZpc2libGU9LTE7XG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG59XG4iLCJpbXBvcnQgTXVzaWNVdGlsIGZyb20gJy4uL3V0aWxzL011c2ljVXRpbC5qcyc7XG5jb25zdCBhcHBQYWNrYWdlPXJlcXVpcmUoXCIuLi8uLi9wYWNrYWdlLmpzb25cIik7XG4vL2NvbnN0IGFwcFBhY2thZ2U9e3ZlcnNpb246IFwiYWJjXCJ9O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBIZWxwZXIge1xuXHRjb25zdHJ1Y3Rvcihjb25kdWN0b3IpIHtcblx0XHR0aGlzLmNvbmR1Y3Rvcj1jb25kdWN0b3I7XG5cdH1cblxuXHRnZXRBcHBWZXJzaW9uKCkge1xuXHRcdHJldHVybiBhcHBQYWNrYWdlLnZlcnNpb247XG5cdH1cblxuXHRnZXRDdXJyZW50U29uZyhzdGF0ZSkge1xuXHRcdHJldHVybiBzdGF0ZS5zb25nc1tzdGF0ZS5jdXJyZW50U29uZ0luZGV4XTtcblx0fVxuXG5cdGdldEN1cnJlbnRMYXllcihzdGF0ZSkge1xuXHRcdHJldHVybiBzdGF0ZS5zb25nc1tzdGF0ZS5jdXJyZW50U29uZ0luZGV4XS5sYXllcnNbc3RhdGUuY3VycmVudExheWVySW5kZXhdO1xuXHR9XG5cblx0Z2V0SW5zdHJ1bWVudEJ5TmFtZShzdGF0ZSwgbmFtZSkge1xuXHRcdGZvciAobGV0IGluc3RydW1lbnQgb2Ygc3RhdGUuaW5zdHJ1bWVudHMpXG5cdFx0XHRpZiAoaW5zdHJ1bWVudC5uYW1lPT1uYW1lKVxuXHRcdFx0XHRyZXR1cm4gaW5zdHJ1bWVudDtcblx0fVxuXG5cdGdldEluc3RydW1lbnROdW1Tb3VuZHNCeU5hbWUoc3RhdGUsIG5hbWUpIHtcblx0XHRsZXQgaW5zdHJ1bWVudD10aGlzLmdldEluc3RydW1lbnRCeU5hbWUoc3RhdGUsbmFtZSk7XG5cblx0XHRzd2l0Y2ggKGluc3RydW1lbnQudHlwZSkge1xuXHRcdFx0Y2FzZSBcImhhcm1vbmljXCI6XG5cdFx0XHRcdHJldHVybiA5O1xuXG5cdFx0XHRjYXNlIFwicGVyY3Vzc2l2ZVwiOlxuXHRcdFx0XHRyZXR1cm4gaW5zdHJ1bWVudC5sYWJlbHMubGVuZ3RoO1xuXHRcdH1cblx0fVxuXG5cdGdldEN1cnJlbnRJbnN0cnVtZW50KHN0YXRlKSB7XG5cdFx0bGV0IGxheWVyPXRoaXMuZ2V0Q3VycmVudExheWVyKHN0YXRlKTtcblx0XHRyZXR1cm4gdGhpcy5nZXRJbnN0cnVtZW50QnlOYW1lKHN0YXRlLGxheWVyLmluc3RydW1lbnROYW1lKTtcblx0fVxuXG5cdGdldEN1cnJlbnRJbnN0cnVtZW50U291bmRMYWJlbHMoc3RhdGUpIHtcblx0XHRsZXQgaW5zdHJ1bWVudD10aGlzLmdldEN1cnJlbnRJbnN0cnVtZW50KHN0YXRlKTtcblxuXHRcdHN3aXRjaCAoaW5zdHJ1bWVudC50eXBlKSB7XG5cdFx0XHRjYXNlIFwiaGFybW9uaWNcIjpcblx0XHRcdFx0cmV0dXJuIFtcIlQxXCIsXCJUMlwiLFwiVDNcIixcIk8tVDFcIixcIk8tVDJcIixcIk8tVDNcIl07XG5cblx0XHRcdGNhc2UgXCJwZXJjdXNzaXZlXCI6XG5cdFx0XHRcdHJldHVybiBpbnN0cnVtZW50LmxhYmVscztcblx0XHR9XG5cdH1cblxuXHRnZXRDaG9yZExhYmVscyhzdGF0ZSkge1xuXHRcdGxldCBzb25nPXRoaXMuZ2V0Q3VycmVudFNvbmcoc3RhdGUpO1xuXHRcdHJldHVybiBNdXNpY1V0aWwuZ2V0Q2hvcmROYW1lc0ZvclNjYWxlKHNvbmcubXVzaWNLZXksc29uZy5taW5vcik7XG5cdH1cblxuXHRnZXRDdXJyZW50U2VjdGlvbkNob3JkTGFiZWxzKHN0YXRlKSB7XG5cdFx0bGV0IHNvbmc9dGhpcy5nZXRDdXJyZW50U29uZyhzdGF0ZSk7XG5cdFx0bGV0IGNob3JkTmFtZXM9TXVzaWNVdGlsLmdldENob3JkTmFtZXNGb3JTY2FsZShzb25nLm11c2ljS2V5LHNvbmcubWlub3IpO1xuXHRcdGxldCBzZWN0aW9uPXNvbmcuc2VjdGlvbnNbc3RhdGUuY3VycmVudFNlY3Rpb25JbmRleF07XG5cdFx0bGV0IGE9W107XG5cblx0XHRmb3IgKGxldCBpIG9mIHNlY3Rpb24pXG5cdFx0XHRhLnB1c2goY2hvcmROYW1lc1tpXSk7XG5cblx0XHRyZXR1cm4gYTtcblx0fVxuXG5cdGdldE5vdGVzU2VsZWN0T3B0aW9ucyhzdGF0ZSkge1xuXHRcdGxldCBhPVtdO1xuXG5cdFx0Zm9yIChsZXQgbm90ZU5hbWUgb2YgTXVzaWNVdGlsLk5PVEVfTkFNRVMpXG5cdFx0XHRhLnB1c2goe1xuXHRcdFx0XHRrZXk6IG5vdGVOYW1lLCBsYWJlbDogbm90ZU5hbWVcblx0XHRcdH0pO1xuXG5cdFx0cmV0dXJuIGE7XG5cdH1cblxuXHRnZXRDaG9yZE9wdGlvbnMoc3RhdGUpIHtcblx0XHRsZXQgc29uZz10aGlzLmdldEN1cnJlbnRTb25nKHN0YXRlKTtcblx0XHRsZXQgY2hvcmROYW1lcz1NdXNpY1V0aWwuZ2V0Q2hvcmROYW1lc0ZvclNjYWxlKHNvbmcubXVzaWNLZXksc29uZy5taW5vcik7XG5cdFx0bGV0IGE9W107XG5cblx0XHRmb3IgKGxldCBjaG9yZE5hbWUgb2YgY2hvcmROYW1lcylcblx0XHRcdGEucHVzaCh7XG5cdFx0XHRcdGtleTogY2hvcmROYW1lLFxuXHRcdFx0XHRsYWJlbDogY2hvcmROYW1lXG5cdFx0XHR9KTtcblxuXHRcdHJldHVybiBhO1xuXHR9XG5cblx0Z2V0TW9kYWxTZWxlY3RPcHRpb25zKHN0YXRlKSB7XG5cdFx0cmV0dXJuIFtcblx0XHRcdHtrZXk6IGZhbHNlLCBsYWJlbDogXCJtYWpvclwifSxcblx0XHRcdHtrZXk6IHRydWUsIGxhYmVsOiBcIm1pbm9yXCJ9LFxuXHRcdF07XG5cdH1cblxuXHRjdXJyZW50TGF5ZXJIYXNTb3VuZEF0KHN0YXRlLCBncmlkSW5kZXgpIHtcblx0XHRsZXQgbGF5ZXI9dGhpcy5nZXRDdXJyZW50TGF5ZXIoc3RhdGUpO1xuXG5cdFx0aWYgKGxheWVyLnNlcVtncmlkSW5kZXhdLnNvdW5kcy5sZW5ndGg+MClcblx0XHRcdHJldHVybiB0cnVlO1xuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Y3VycmVudExheWVySGFzQ2hvcmRBdChzdGF0ZSwgZ3JpZEluZGV4LCBvY3RhdmUpIHtcblx0XHRsZXQgbGF5ZXI9dGhpcy5nZXRDdXJyZW50TGF5ZXIoc3RhdGUpO1xuXG5cdFx0Zm9yIChsZXQgaT0wOyBpPDM7IGkrKylcblx0XHRcdGlmICghbGF5ZXIuc2VxW2dyaWRJbmRleF0uc291bmRzLmluY2x1ZGVzKG9jdGF2ZSozK2kpKVxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdGlzU29uZ09wZW4oc3RhdGUpIHtcblx0XHRyZXR1cm4gKHN0YXRlLmN1cnJlbnRTb25nSW5kZXg+PTApO1xuXHR9XG59XG4iLCJpbXBvcnQgQXVkaW9VdGlsIGZyb20gJy4uL3V0aWxzL0F1ZGlvVXRpbCc7XG5pbXBvcnQgUmVjb25jaWxlQXJyYXkgZnJvbSAnLi4vdXRpbHMvUmVjb25jaWxlQXJyYXknO1xuaW1wb3J0IENvbmR1Y3RvckxheWVyIGZyb20gJy4vQ29uZHVjdG9yTGF5ZXInO1xuaW1wb3J0IENvbmR1Y3Rvckluc3RydW1lbnQgZnJvbSAnLi9Db25kdWN0b3JJbnN0cnVtZW50JztcbmltcG9ydCBNdXNpY1V0aWwgZnJvbSAnLi4vdXRpbHMvTXVzaWNVdGlsJztcbmltcG9ydCBBdWRpb1RpbWVyIGZyb20gJy4uL3V0aWxzL0F1ZGlvVGltZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25kdWN0b3Ige1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRsZXQgQXVkaW9Db250ZXh0PXdpbmRvdy5BdWRpb0NvbnRleHQ7XG5cblx0XHRpZiAoIUF1ZGlvQ29udGV4dClcblx0XHRcdEF1ZGlvQ29udGV4dD13aW5kb3cud2Via2l0QXVkaW9Db250ZXh0O1xuXG5cdFx0aWYgKCFBdWRpb0NvbnRleHQpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJubyB3ZWIgYXVkaW8hXCIpO1xuXG5cdFx0dGhpcy5hdWRpb0NvbnRleHQ9bmV3IEF1ZGlvQ29udGV4dCgpO1xuXHRcdHRoaXMuYXVkaW9UaW1lcj1uZXcgQXVkaW9UaW1lcih0aGlzLmF1ZGlvQ29udGV4dCk7XG5cdFx0dGhpcy5hdWRpb1RpbWVyLm9uVGljaz10aGlzLm9uUGxheVRpY2s7XG5cblx0XHR0aGlzLmluc3RydW1lbnRzPVJlY29uY2lsZUFycmF5LmNyZWF0ZVdpdGhGYWN0b3J5KHRoaXMuY3JlYXRlSW5zdHJ1bWVudCk7XG5cdFx0dGhpcy5sYXllcnM9UmVjb25jaWxlQXJyYXkuY3JlYXRlV2l0aEZhY3RvcnkodGhpcy5jcmVhdGVMYXllcik7XG5cdFx0dGhpcy5jdXJyZW50Tm90ZXM9W107XG5cdFx0dGhpcy5wbGF5aW5nU2VxdWVuY2VJbmRleD0tMTtcblx0XHR0aGlzLnBsYXlpbmdTZXF1ZW5jZUNob3JkSW5kZXg9LTE7XG5cdH1cblxuXHRsb2FkSW5zdHJ1bWVudHMoKSB7XG5cdFx0bGV0IHByb21pc2VzPVtdO1xuXHRcdGZvciAobGV0IGluc3RydW1lbnQgb2YgdGhpcy5pbnN0cnVtZW50cy5nZXRJdGVtcygpKVxuXHRcdFx0cHJvbWlzZXMucHVzaChpbnN0cnVtZW50LmxvYWQoKSk7XG5cblx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuXHR9XG5cblx0Y3JlYXRlTGF5ZXI9KGRhdGEpPT57XG5cdFx0cmV0dXJuIG5ldyBDb25kdWN0b3JMYXllcih0aGlzLGRhdGEpO1xuXHR9O1xuXG5cdGNyZWF0ZUluc3RydW1lbnQ9KGRhdGEpPT57XG5cdFx0cmV0dXJuIG5ldyBDb25kdWN0b3JJbnN0cnVtZW50KHRoaXMsZGF0YSk7XG5cdH07XG5cblx0Z2V0Q29uZHVjdG9ySW5zdHJ1bWVudEJ5TmFtZShuYW1lKSB7XG5cdFx0Zm9yIChsZXQgaW5zdHJ1bWVudCBvZiB0aGlzLmluc3RydW1lbnRzLmdldEl0ZW1zKCkpIHtcblx0XHRcdGlmIChpbnN0cnVtZW50LmdldE5hbWUoKT09bmFtZSlcblx0XHRcdFx0cmV0dXJuIGluc3RydW1lbnQ7XG5cdFx0fVxuXHR9XG5cblx0Z2V0Q3VycmVudENvbmR1Y3RvckxheWVyKCkge1xuXHRcdGxldCBzdGF0ZT10aGlzLnN0YXRlO1xuXHRcdGxldCBrZXk9c3RhdGUuc29uZ3Nbc3RhdGUuY3VycmVudFNvbmdJbmRleF0ubGF5ZXJzW3N0YXRlLmN1cnJlbnRMYXllckluZGV4XS5rZXk7XG5cblx0XHRyZXR1cm4gdGhpcy5sYXllcnMuZ2V0SXRlbUJ5S2V5KGtleSk7XG5cdH1cblxuXHRwbGF5TGF5ZXJJbnN0cnVtZW50KHNvdW5kSW5kZXgpIHtcblx0XHRsZXQgbGF5ZXI9dGhpcy5nZXRDdXJyZW50Q29uZHVjdG9yTGF5ZXIoKTtcblx0XHRsZXQgbm90ZT1sYXllci5pbnN0cnVtZW50LmNyZWF0ZU5vdGUoc291bmRJbmRleCk7XG5cdFx0bm90ZS5zZXRDaG9yZENlbnRzKHRoaXMuZ2V0Q3VycmVudENob3JkQ2VudHMoKSk7XG5cdFx0bm90ZS5jb25uZWN0KGxheWVyLmRlc3RpbmF0aW9uKTtcblx0XHRub3RlLnBsYXlOb3coKTtcblx0fVxuXG5cdGdldEN1cnJlbnRTb25nKCkge1xuXHRcdHJldHVybiB0aGlzLnN0YXRlLnNvbmdzW3RoaXMuc3RhdGUuY3VycmVudFNvbmdJbmRleF07XG5cdH1cblxuXHRnZXRDaG9yZENlbnRzKGNob3JkSW5kZXgpIHtcblx0XHRsZXQgc29uZz10aGlzLmdldEN1cnJlbnRTb25nKCk7XG5cdFx0aWYgKCFzb25nIHx8IGNob3JkSW5kZXg8MClcblx0XHRcdHJldHVybiBbMCwwLDBdO1xuXG5cdFx0bGV0IHNjYWxlQ2hvcmROb3Rlcz1NdXNpY1V0aWwuZ2V0Q2hvcmROb3Rlc0ZvclNjYWxlKHNvbmcubXVzaWNLZXksc29uZy5taW5vcik7XG5cdFx0bGV0IGNob3JkTm90ZXM9c2NhbGVDaG9yZE5vdGVzW2Nob3JkSW5kZXhdO1xuXHRcdHJldHVybiBbXG5cdFx0XHRNdXNpY1V0aWwubm90ZVRvQ2VudHMoY2hvcmROb3Rlc1swXSksXG5cdFx0XHRNdXNpY1V0aWwubm90ZVRvQ2VudHMoY2hvcmROb3Rlc1sxXSksXG5cdFx0XHRNdXNpY1V0aWwubm90ZVRvQ2VudHMoY2hvcmROb3Rlc1syXSlcblx0XHRdO1xuXHR9XG5cblx0Z2V0Q3VycmVudENob3JkQ2VudHMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q2hvcmRDZW50cyh0aGlzLnN0YXRlLmN1cnJlbnRDaG9yZEluZGV4KTtcblx0fVxuXG5cdG9uTm90ZUVuZGVkKG5vdGUpIHtcblx0XHRsZXQgaWR4PXRoaXMuY3VycmVudE5vdGVzLmluZGV4T2Yobm90ZSk7XG5cdFx0aWYgKGlkeDwwKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5jdXJyZW50Tm90ZXMuc3BsaWNlKGlkeCwxKTtcblx0fVxuXG5cdGdldFNlY1BlckdyaWQoKSB7XG5cdFx0bGV0IHNlY1BlckJlYXQ9NjAvdGhpcy5nZXRDdXJyZW50U29uZygpLmJwbTtcblx0XHRsZXQgc2VjUGVyR3JpZD1zZWNQZXJCZWF0LzQ7XG5cblx0XHRyZXR1cm4gc2VjUGVyR3JpZDtcblx0fVxuXG5cdGdldFNlY1BlckJhcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRTZWNQZXJHcmlkKCkqMTY7XG5cdH1cblxuXHRwbGF5R3JpZFNsaWNlKGF0LCBncmlkSW5kZXgsIGNob3JkQ2VudHMpIHtcblx0XHRmb3IgKGxldCBsYXllciBvZiB0aGlzLmxheWVycy5nZXRJdGVtcygpKSB7XG5cdFx0XHRmb3IgKGxldCBzb3VuZEluZGV4IG9mIGxheWVyLmRhdGEuc2VxW2dyaWRJbmRleF0uc291bmRzKSB7XG5cdFx0XHRcdGxldCBub3RlPWxheWVyLmluc3RydW1lbnQuY3JlYXRlTm90ZShzb3VuZEluZGV4KTtcblx0XHRcdFx0bm90ZS5jb25uZWN0KGxheWVyLmRlc3RpbmF0aW9uKTtcblx0XHRcdFx0bm90ZS5zZXRDaG9yZENlbnRzKGNob3JkQ2VudHMpO1xuXHRcdFx0XHRub3RlLnBsYXlTaGVkdWxlZChhdCxsYXllci5nZXROb3RlTGVuKGdyaWRJbmRleCkqdGhpcy5nZXRTZWNQZXJHcmlkKCkpO1xuXHRcdFx0XHRub3RlLnNldFZlbG9jaXR5KGxheWVyLmRhdGEuc2VxW2dyaWRJbmRleF0udmVsKTtcblxuXHRcdFx0XHRub3RlLm9uZW5kZWQ9dGhpcy5vbk5vdGVFbmRlZC5iaW5kKHRoaXMsbm90ZSk7XG5cdFx0XHRcdHRoaXMuY3VycmVudE5vdGVzLnB1c2gobm90ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cGxheUJhcihhdCwgY2hvcmRDZW50cykge1xuXHRcdGZvciAobGV0IGdyaWRJbmRleD0wOyBncmlkSW5kZXg8MTY7IGdyaWRJbmRleCsrKSB7XG5cdFx0XHR0aGlzLnBsYXlHcmlkU2xpY2UoXG5cdFx0XHRcdGF0K2dyaWRJbmRleCp0aGlzLmdldFNlY1BlckdyaWQoKSxcblx0XHRcdFx0Z3JpZEluZGV4LFxuXHRcdFx0XHRjaG9yZENlbnRzXG5cdFx0XHQpO1xuXHRcdH1cblx0fVxuXG5cdGdldFBsYXlHcmlkSW5kZXgoKSB7XG5cdFx0aWYgKCF0aGlzLmlzUGxheWluZygpKVxuXHRcdFx0cmV0dXJuIC0xO1xuXG5cdFx0cmV0dXJuIHRoaXMucGxheUdyaWRJbmRleDtcblx0fVxuXG5cdG9uUGxheVRpY2s9KHRpY2tJbmRleCk9Pntcblx0XHRsZXQgc29uZz10aGlzLmdldEN1cnJlbnRTb25nKCk7XG5cblx0XHRsZXQgYmFySW5kZXg9TWF0aC5mbG9vcih0aWNrSW5kZXgvMTYpO1xuXHRcdGxldCBncmlkSW5kZXg9dGlja0luZGV4JTE2O1xuXG5cdFx0dGhpcy5wbGF5R3JpZEluZGV4PWdyaWRJbmRleDtcblxuXHRcdGlmIChncmlkSW5kZXg9PTAgJiYgdGhpcy5wbGF5aW5nU2VxdWVuY2VJbmRleD49MCkge1xuXHRcdFx0dGhpcy5wbGF5aW5nU2VxdWVuY2VDaG9yZEluZGV4Kys7XG5cblx0XHRcdGlmICh0aGlzLnBsYXlpbmdTZXF1ZW5jZUNob3JkSW5kZXg+PXNvbmcuc2VjdGlvbnNbdGhpcy5wbGF5aW5nU2VxdWVuY2VJbmRleF0ubGVuZ3RoKVxuXHRcdFx0XHR0aGlzLnBsYXlpbmdTZXF1ZW5jZUNob3JkSW5kZXg9MDtcblx0XHR9XG5cblx0XHRpZiAoYmFySW5kZXg9PTAgJiYgdGlja0luZGV4PT0wKSB7XG5cdFx0XHRsZXQgY2VudHM9dGhpcy5nZXRDdXJyZW50Q2hvcmRDZW50cygpO1xuXG5cdFx0XHRpZiAodGhpcy5wbGF5aW5nU2VxdWVuY2VJbmRleD49MCkge1xuXHRcdFx0XHRsZXQgaT10aGlzLnBsYXlpbmdTZXF1ZW5jZUNob3JkSW5kZXg7XG5cdFx0XHRcdGNlbnRzPXRoaXMuZ2V0Q2hvcmRDZW50cyhzb25nLnNlY3Rpb25zW3RoaXMucGxheWluZ1NlcXVlbmNlSW5kZXhdW2ldKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5wbGF5QmFyKFxuXHRcdFx0XHR0aGlzLmF1ZGlvVGltZXIuc3RhcnRUaW1lLFxuXHRcdFx0XHRjZW50c1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAoZ3JpZEluZGV4PT0xNSkge1xuXHRcdFx0bGV0IGNlbnRzPXRoaXMuZ2V0Q3VycmVudENob3JkQ2VudHMoKTtcblxuXHRcdFx0aWYgKHRoaXMucGxheWluZ1NlcXVlbmNlSW5kZXg+PTApIHtcblx0XHRcdFx0bGV0IGk9dGhpcy5wbGF5aW5nU2VxdWVuY2VDaG9yZEluZGV4O1xuXHRcdFx0XHRpPShpKzEpJXNvbmcuc2VjdGlvbnNbdGhpcy5wbGF5aW5nU2VxdWVuY2VJbmRleF0ubGVuZ3RoO1xuXHRcdFx0XHRjZW50cz10aGlzLmdldENob3JkQ2VudHMoc29uZy5zZWN0aW9uc1t0aGlzLnBsYXlpbmdTZXF1ZW5jZUluZGV4XVtpXSk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMucGxheUJhcihcblx0XHRcdFx0dGhpcy5hdWRpb1RpbWVyLnN0YXJ0VGltZSsoYmFySW5kZXgrMSkqdGhpcy5nZXRTZWNQZXJCYXIoKSxcblx0XHRcdFx0Y2VudHNcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMub25QbGF5R3JpZEluZGV4Q2hhbmdlKVxuXHRcdFx0dGhpcy5vblBsYXlHcmlkSW5kZXhDaGFuZ2UoZ3JpZEluZGV4LHRoaXMucGxheWluZ1NlcXVlbmNlQ2hvcmRJbmRleCk7XG5cdH1cblxuXHRwbGF5PSgpPT57XG5cdFx0bGV0IHNvbmc9dGhpcy5nZXRDdXJyZW50U29uZygpO1xuXHRcdHRoaXMucGxheUJwbT1zb25nLmJwbTtcblxuXHRcdHRoaXMucGxheWluZ1NlcXVlbmNlSW5kZXg9dGhpcy5zdGF0ZS5jdXJyZW50U2VjdGlvbkluZGV4O1xuXHRcdHRoaXMucGxheWluZ1NlcXVlbmNlQ2hvcmRJbmRleD0tMTtcblxuXHRcdHRoaXMuYXVkaW9UaW1lci5zZXRTdGFydFRpbWUodGhpcy5hdWRpb0NvbnRleHQuY3VycmVudFRpbWUpO1xuXHRcdHRoaXMuYXVkaW9UaW1lci5zZXRUaWNrSW50ZXJ2YWwodGhpcy5nZXRTZWNQZXJHcmlkKCkpO1xuXHRcdHRoaXMuYXVkaW9UaW1lci5zdGFydCgpO1xuXHR9XG5cblx0c3RvcCgpIHtcblx0XHRpZiAodGhpcy5vblBsYXlHcmlkSW5kZXhDaGFuZ2UpXG5cdFx0XHR0aGlzLm9uUGxheUdyaWRJbmRleENoYW5nZSgtMSwtMSk7XG5cblx0XHR0aGlzLnBsYXlCcG09MDtcblx0XHR0aGlzLmF1ZGlvVGltZXIuc3RvcCgpO1xuXG5cdFx0Zm9yIChsZXQgbm90ZSBvZiB0aGlzLmN1cnJlbnROb3Rlcykge1xuXHRcdFx0bm90ZS5zZXRWZWxvY2l0eSgwKTtcblx0XHRcdG5vdGUub25lbmRlZD1udWxsO1xuXHRcdH1cblxuXHRcdHRoaXMuY3VycmVudE5vdGVzPVtdO1xuXHR9XG5cblx0aXNQbGF5aW5nKCkge1xuXHRcdHJldHVybiB0aGlzLmF1ZGlvVGltZXIuaXNSdW5uaW5nKCk7XG5cdH1cblxuXHRzZXRTdGF0ZT0oc3RhdGUpPT57XG5cdFx0dGhpcy5zdGF0ZT1zdGF0ZTtcblx0XHR0aGlzLmluc3RydW1lbnRzLnNldERhdGEoc3RhdGUuaW5zdHJ1bWVudHMpO1xuXG5cdFx0aWYgKHRoaXMuZ2V0Q3VycmVudFNvbmcoKSkge1xuXHRcdFx0dGhpcy5sYXllcnMuc2V0RGF0YSh0aGlzLmdldEN1cnJlbnRTb25nKCkubGF5ZXJzKTtcblx0XHRcdGlmIChzdGF0ZS5wbGF5aW5nICYmICF0aGlzLmlzUGxheWluZygpKVxuXHRcdFx0XHR0aGlzLnBsYXkoKTtcblxuXHRcdFx0ZWxzZSBpZiAoIXN0YXRlLnBsYXlpbmcgJiYgdGhpcy5pc1BsYXlpbmcoKSlcblx0XHRcdFx0dGhpcy5zdG9wKCk7XG5cblx0XHRcdGlmICh0aGlzLmlzUGxheWluZygpICYmIHRoaXMucGxheUJwbSE9dGhpcy5nZXRDdXJyZW50U29uZygpLmJwbSkge1xuXHRcdFx0XHR0aGlzLnN0b3AoKTtcblx0XHRcdFx0dGhpcy5wbGF5KCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZWxzZSB7XG5cdFx0XHR0aGlzLnN0b3AoKTtcblx0XHRcdHRoaXMubGF5ZXJzLnNldERhdGEoW10pO1xuXHRcdH1cblxuXHRcdGlmIChzdGF0ZS5jdXJyZW50U2VjdGlvbkluZGV4PDApIHtcblx0XHRcdHRoaXMucGxheWluZ1NlcXVlbmNlSW5kZXg9LTE7XG5cdFx0XHR0aGlzLnBsYXlpbmdTZXF1ZW5jZUNob3JkSW5kZXg9LTFcblx0XHRcdGxldCBjdXJyZW50Q2hvcmRDZW50cz10aGlzLmdldEN1cnJlbnRDaG9yZENlbnRzKCk7XG5cdFx0XHRmb3IgKGxldCBub3RlIG9mIHRoaXMuY3VycmVudE5vdGVzKVxuXHRcdFx0XHRub3RlLnNldENob3JkQ2VudHMoY3VycmVudENob3JkQ2VudHMpO1xuXHRcdH1cblxuXHRcdGVsc2UgaWYgKHN0YXRlLmN1cnJlbnRTZWN0aW9uSW5kZXghPXRoaXMucGxheWluZ1NlcXVlbmNlSW5kZXgpIHtcblx0XHRcdHRoaXMucGxheWluZ1NlcXVlbmNlSW5kZXg9c3RhdGUuY3VycmVudFNlY3Rpb25JbmRleDtcblx0XHRcdHRoaXMucGxheWluZ1NlcXVlbmNlQ2hvcmRJbmRleD0tMTtcblx0XHR9XG5cdH07XG59XG4iLCJpbXBvcnQgQXVkaW9VdGlsIGZyb20gJy4uL3V0aWxzL0F1ZGlvVXRpbCc7XG5pbXBvcnQgTXVzaWNVdGlsIGZyb20gJy4uL3V0aWxzL011c2ljVXRpbCc7XG5pbXBvcnQgQ29uZHVjdG9yTm90ZSBmcm9tICcuL0NvbmR1Y3Rvck5vdGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25kdWN0b3JJbnN0cnVtZW50IHtcblx0Y29uc3RydWN0b3IoY29uZHVjdG9yLCBkYXRhKSB7XG5cdFx0dGhpcy5jb25kdWN0b3I9Y29uZHVjdG9yO1xuXHRcdHRoaXMuZGF0YT1kYXRhO1xuXHR9XG5cblx0Z2V0TmFtZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5kYXRhLm5hbWU7XG5cdH1cblxuXHRhc3luYyBsb2FkKCkge1xuXHRcdHN3aXRjaCAodGhpcy5kYXRhLnR5cGUpIHtcblx0XHRcdGNhc2UgXCJoYXJtb25pY1wiOlxuXHRcdFx0XHRsZXQgdXJsPXRoaXMuZGF0YS5zYW1wbGU7XG5cdFx0XHRcdHRoaXMuYnVmZmVyPWF3YWl0IEF1ZGlvVXRpbC5sb2FkQnVmZmVyKHVybCx0aGlzLmNvbmR1Y3Rvci5hdWRpb0NvbnRleHQpO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSBcInBlcmN1c3NpdmVcIjpcblx0XHRcdFx0dGhpcy5idWZmZXJzPVtdO1xuXHRcdFx0XHRmb3IgKGxldCB1cmwgb2YgdGhpcy5kYXRhLnNhbXBsZXMpXG5cdFx0XHRcdFx0dGhpcy5idWZmZXJzLnB1c2goYXdhaXQgQXVkaW9VdGlsLmxvYWRCdWZmZXIodXJsLHRoaXMuY29uZHVjdG9yLmF1ZGlvQ29udGV4dCkpO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblxuXHR1cGRhdGUoZGF0YSkge1xuXHR9XG5cblx0ZmluYWxpemUoKSB7XG5cdH1cblxuXHRjcmVhdGVOb3RlKHNvdW5kSW5kZXgpIHtcblx0XHRzd2l0Y2ggKHRoaXMuZGF0YS50eXBlKSB7XG5cdFx0XHRjYXNlIFwiaGFybW9uaWNcIjpcblx0XHRcdFx0bGV0IG5vdGU9bmV3IENvbmR1Y3Rvck5vdGUodGhpcy5jb25kdWN0b3IsdGhpcy5idWZmZXIsc291bmRJbmRleCk7XG5cdFx0XHRcdGlmICh0aGlzLmRhdGEuc2FtcGxlTm90ZSlcblx0XHRcdFx0XHRub3RlLnNldFNhbXBsZU5vdGVDZW50cyhNdXNpY1V0aWwubm90ZVRvQ2VudHModGhpcy5kYXRhLnNhbXBsZU5vdGUpKTtcblxuXHRcdFx0XHRyZXR1cm4gbm90ZTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgXCJwZXJjdXNzaXZlXCI6XG5cdFx0XHRcdHJldHVybiBuZXcgQ29uZHVjdG9yTm90ZSh0aGlzLmNvbmR1Y3Rvcix0aGlzLmJ1ZmZlcnNbc291bmRJbmRleF0pO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDb25kdWN0b3JMYXllciB7XG5cdGNvbnN0cnVjdG9yKGNvbmR1Y3RvciwgZGF0YSkge1xuXHRcdHRoaXMuY29uZHVjdG9yPWNvbmR1Y3Rvcjtcblx0XHR0aGlzLmRhdGE9ZGF0YTtcblx0XHR0aGlzLmluc3RydW1lbnQ9dGhpcy5jb25kdWN0b3IuZ2V0Q29uZHVjdG9ySW5zdHJ1bWVudEJ5TmFtZShkYXRhLmluc3RydW1lbnROYW1lKTtcblx0XHRpZiAoIXRoaXMuaW5zdHJ1bWVudClcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIlRoZXJlIGlzIG5vIGluc3RydW1lbnQhISFcIik7XG5cblx0XHR0aGlzLmdhaW49dGhpcy5jb25kdWN0b3IuYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKTtcblx0XHR0aGlzLmdhaW4uY29ubmVjdCh0aGlzLmNvbmR1Y3Rvci5hdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xuXHRcdHRoaXMudXBkYXRlR2FpbigpO1xuXG5cdFx0dGhpcy5kZXN0aW5hdGlvbj10aGlzLmdhaW47XG5cdH1cblxuXHR1cGRhdGUoZGF0YSkge1xuXHRcdHRoaXMuZGF0YT1kYXRhO1xuXHRcdHRoaXMudXBkYXRlR2FpbigpO1xuXHR9XG5cblx0ZmluYWxpemUoKSB7XG5cdFx0dGhpcy5nYWluLmRpc2Nvbm5lY3QoKTtcblx0fVxuXG5cdHVwZGF0ZUdhaW4oKSB7XG5cdFx0aWYgKHRoaXMuZGF0YS5hdWRpYmxlIHx8IHRoaXMuZGF0YS5pbmRleD09dGhpcy5jb25kdWN0b3Iuc3RhdGUuY3VycmVudExheWVySW5kZXgpXG5cdFx0XHR0aGlzLmdhaW4uZ2Fpbi52YWx1ZT10aGlzLmRhdGEudm9sdW1lO1xuXG5cdFx0ZWxzZVxuXHRcdFx0dGhpcy5nYWluLmdhaW4udmFsdWU9MDtcblx0fVxuXG5cdGhhc1NvdW5kQXQocG9zKSB7XG5cdFx0aWYgKHRoaXMuZGF0YS5zZXFbcG9zXS5zb3VuZHMubGVuZ3RoPjApXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGdldE5vdGVMZW4ocG9zKSB7XG5cdFx0Zm9yIChsZXQgaT0xOyBpPHRoaXMuZGF0YS5zZXEubGVuZ3RoOyBpKyspXG5cdFx0XHRpZiAodGhpcy5oYXNTb3VuZEF0KChwb3MraSklMTYpXG5cdFx0XHRcdFx0fHwgdGhpcy5kYXRhLnNlcVsocG9zK2kpJTE2XS5zdGFjYylcblx0XHRcdFx0cmV0dXJuIGk7XG5cblx0XHRyZXR1cm4gMTY7XG5cdH1cbn0iLCJpbXBvcnQgTXVzaWNVdGlsIGZyb20gJy4uL3V0aWxzL011c2ljVXRpbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbmR1Y3Rvck5vdGUge1xuXHRjb25zdHJ1Y3Rvcihjb25kdWN0b3IsIGJ1ZmZlciwgY2hvcmROb3RlKSB7XG5cdFx0dGhpcy5jb25kdWN0b3I9Y29uZHVjdG9yO1xuXHRcdHRoaXMuYnVmZmVyPWJ1ZmZlcjtcblxuXHRcdHRoaXMuZ2Fpbj10aGlzLmNvbmR1Y3Rvci5hdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpO1xuXHRcdHRoaXMuc291cmNlPXRoaXMuY29uZHVjdG9yLmF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcblx0XHR0aGlzLnNvdXJjZS5idWZmZXI9dGhpcy5idWZmZXI7XG5cdFx0dGhpcy5zb3VyY2UuY29ubmVjdCh0aGlzLmdhaW4pO1xuXHRcdHRoaXMuc291cmNlLm9uZW5kZWQ9KCk9Pntcblx0XHRcdHRoaXMuZ2Fpbi5kaXNjb25uZWN0KCk7XG5cdFx0XHRpZiAodGhpcy5vbmVuZGVkKVxuXHRcdFx0XHR0aGlzLm9uZW5kZWQodGhpcyk7XG5cdFx0fVxuXG5cdFx0dGhpcy5jaG9yZE5vdGU9Y2hvcmROb3RlO1xuXHRcdHRoaXMuY2hvcmRDZW50cz1bMCwxMDAsMjAwXTtcblx0XHR0aGlzLnNhbXBsZU5vdGVDZW50cz0wO1xuXHRcdHRoaXMudXBkYXRlRGV0dW5lKCk7XG5cdH1cblxuXHRjb25uZWN0KGRlc3RpbmF0aW9uKSB7XG5cdFx0dGhpcy5pc0Nvbm5lY3RlZD10cnVlO1xuXHRcdHRoaXMuZ2Fpbi5jb25uZWN0KGRlc3RpbmF0aW9uKTtcblx0fVxuXG5cdHNldFNhbXBsZU5vdGVDZW50cyhjZW50cykge1xuXHRcdHRoaXMuc2FtcGxlTm90ZUNlbnRzPWNlbnRzO1xuXHRcdHRoaXMudXBkYXRlRGV0dW5lKCk7XG5cdH1cblxuXHRzZXRDaG9yZENlbnRzKGNob3JkQ2VudHMpIHtcblx0XHR0aGlzLmNob3JkQ2VudHM9Y2hvcmRDZW50cztcblx0XHR0aGlzLnVwZGF0ZURldHVuZSgpO1xuXHR9XG5cblx0cGxheU5vdygpIHtcblx0XHRpZiAoIXRoaXMuaXNDb25uZWN0ZWQpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJub3RlIG5vdCBjb25uZWN0ZWQhXCIpO1xuXG5cdFx0dGhpcy5zb3VyY2Uuc3RhcnQoKTtcblx0fVxuXG5cdHBsYXlTaGVkdWxlZChhdCwgZHVyYXRpb24pIHtcblx0XHRpZiAoIXRoaXMuaXNDb25uZWN0ZWQpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJub3RlIG5vdCBjb25uZWN0ZWQhXCIpO1xuXG5cdFx0dGhpcy5zb3VyY2Uuc3RhcnQoYXQpO1xuXHRcdHRoaXMuc291cmNlLnN0b3AoYXQrZHVyYXRpb24pO1xuXHR9XG5cblx0dXBkYXRlRGV0dW5lKCkge1xuXHRcdGxldCBjZW50cztcblxuXHRcdGlmICh0aGlzLmNob3JkTm90ZT09dW5kZWZpbmVkKVxuXHRcdFx0Y2VudHM9MDtcblxuXHRcdGVsc2Vcblx0XHRcdGNlbnRzPVxuXHRcdFx0XHRNdXNpY1V0aWwuT0NUQVZFX0NFTlRTKihNYXRoLmZsb29yKHRoaXMuY2hvcmROb3RlLzMpLTEpK1xuXHRcdFx0XHR0aGlzLmNob3JkQ2VudHNbdGhpcy5jaG9yZE5vdGUlM10tXG5cdFx0XHRcdHRoaXMuc2FtcGxlTm90ZUNlbnRzO1xuXG5cdFx0aWYgKHRoaXMuc291cmNlLmRldHVuZSlcblx0XHRcdHRoaXMuc291cmNlLmRldHVuZS52YWx1ZT1jZW50cztcblxuXHRcdGVsc2Vcblx0XHRcdHRoaXMuc291cmNlLnBsYXliYWNrUmF0ZS52YWx1ZT1NdXNpY1V0aWwucmF0ZUZyb21DZW50cyhjZW50cyk7XG5cdH1cblxuXHRzZXRWZWxvY2l0eSh2ZWwpIHtcblx0XHR0aGlzLmdhaW4uZ2Fpbi52YWx1ZT12ZWw7XG5cdH1cbn0iLCJpbXBvcnQgeyBoLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuXG5jbGFzcyBBcHBDb250ZXh0IGV4dGVuZHMgQ29tcG9uZW50IHtcblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG5cblx0XHR0aGlzLmN1cnJpZWQ9e307XG5cblx0XHRmb3IgKGxldCBrZXkgb2YgdGhpcy5nZXRPYmplY3RLZXlzKHByb3BzLmNvbnRyb2xsZXIpKSB7XG5cdFx0XHR0aGlzLmN1cnJpZWRba2V5XT0oLi4uYXJncyk9PntcblxuXHRcdFx0XHRpZiAodGhpcy5wcm9wcy5sb2dBY3Rpb25zKVxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiQWN0aW9uOiBcIitrZXkrXCIgKFwiK2FyZ3MrXCIpXCIpO1xuXG5cdFx0XHRcdGZvciAobGV0IGkgaW4gYXJncykge1xuXHRcdFx0XHRcdGlmIChhcmdzW2ldIGluc3RhbmNlb2YgRXZlbnQpIHtcblx0XHRcdFx0XHRcdGlmIChhcmdzW2ldLnR5cGU9PVwibW91c2Vkb3duXCIgJiYgYXJnc1tpXS5idXR0b249PTIpXG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblxuXHRcdFx0XHRcdFx0YXJnc1tpXS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0YXJnc1tpXS5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdFx0XHRcdFx0aWYgKGFyZ3NbaV0udHlwZT09XCJjaGFuZ2VcIikge1xuXHRcdFx0XHRcdFx0XHRhcmdzW2ldPWFyZ3NbaV0udGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGxldCBuZXdTdGF0ZT1wcm9wcy5jb250cm9sbGVyW2tleV0odGhpcy5zdGF0ZSwgLi4uYXJncyk7XG5cdFx0XHRcdGlmIChuZXdTdGF0ZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcblx0XHRcdFx0XHRpZiAoIXRoaXMuc3RhdGUpXG5cdFx0XHRcdFx0XHR0aGlzLnN0YXRlPXtidXN5OiB0cnVlfTtcblxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdFx0XHRidXN5OiB0cnVlXG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdG5ld1N0YXRlLnRoZW4oKHN0YXRlKT0+e1xuXHRcdFx0XHRcdFx0c3RhdGUuYnVzeT1mYWxzZTtcblx0XHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoc3RhdGUpO1xuXHRcdFx0XHRcdFx0dGhpcy5ub3RpZnlTdGF0ZUNoYW5nZShzdGF0ZSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRpZiAoIXRoaXMuc3RhdGUpXG5cdFx0XHRcdFx0XHR0aGlzLnN0YXRlPW5ld1N0YXRlO1xuXG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XG5cblx0XHRcdFx0XHR0aGlzLm5vdGlmeVN0YXRlQ2hhbmdlKG5ld1N0YXRlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZvciAobGV0IGtleSBvZiB0aGlzLmdldE9iamVjdEtleXMocHJvcHMuaGVscGVyKSkge1xuXHRcdFx0dGhpcy5jdXJyaWVkW2tleV09KC4uLmFyZ3MpPT57XG5cdFx0XHRcdHJldHVybiBwcm9wcy5oZWxwZXJba2V5XSh0aGlzLnN0YXRlLCAuLi5hcmdzKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAocHJvcHMuaW5pdEFjdGlvbilcblx0XHRcdHRoaXMuY3VycmllZFtwcm9wcy5pbml0QWN0aW9uXSgpO1xuXHR9XG5cblx0bm90aWZ5U3RhdGVDaGFuZ2Uoc3RhdGUpIHtcblx0XHRpZiAodHlwZW9mIHRoaXMucHJvcHMub25TdGF0ZUNoYW5nZT09XCJmdW5jdGlvblwiKVxuXHRcdFx0dGhpcy5wcm9wcy5vblN0YXRlQ2hhbmdlKHN0YXRlKTtcblx0fVxuXG5cdGdldE9iamVjdEtleXMobykge1xuXHRcdGxldCBrZXlzPVtdO1xuXHRcdG89T2JqZWN0LmdldFByb3RvdHlwZU9mKG8pO1xuXHRcdHdoaWxlIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvKS5pbmRleE9mKFwiX19wcm90b19fXCIpPDApIHtcblx0XHRcdGtleXM9a2V5cy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMobykpO1xuXHRcdFx0bz1PYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7XG5cdFx0fVxuXG5cdFx0aWYgKGtleXMuaW5jbHVkZXMoXCJjb25zdHJ1Y3RvclwiKSlcblx0XHRcdGtleXMuc3BsaWNlKGtleXMuaW5kZXhPZihcImNvbnN0cnVjdG9yXCIpLDEpO1xuXG5cdFx0cmV0dXJuIGtleXM7XG5cdH1cblxuXHRnZXRDaGlsZENvbnRleHQoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdC4uLnRoaXMuc3RhdGUsXG5cdFx0XHQuLi50aGlzLmN1cnJpZWRcblx0XHR9O1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBcHBDb250ZXh0OyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1ZGlvVGltZXIge1xuXHRjb25zdHJ1Y3RvcihhdWRpb0NvbnRleHQpIHtcblx0XHR0aGlzLmF1ZGlvQ29udGV4dD1hdWRpb0NvbnRleHQ7XG5cdFx0dGhpcy50aW1lb3V0PW51bGw7XG5cdH1cblxuXHRwcm9jZXNzVGlja3M9KCk9Pntcblx0XHRsZXQgY3VycmVudFRpbWU9dGhpcy5hdWRpb0NvbnRleHQuY3VycmVudFRpbWU7XG5cdFx0Ly9jb25zb2xlLmxvZyhcImNhbGxlZCBhdDogXCIrY3VycmVudFRpbWUpO1xuXG5cdFx0d2hpbGUgKHRoaXMuc3RhcnRUaW1lK3RoaXMuZGVsaXZlcmVkVGlja3MqdGhpcy50aWNrSW50ZXJ2YWw8PWN1cnJlbnRUaW1lKSB7XG5cdFx0XHR0aGlzLm9uVGljayh0aGlzLmRlbGl2ZXJlZFRpY2tzKTtcblx0XHRcdHRoaXMuZGVsaXZlcmVkVGlja3MrKztcblx0XHR9XG5cblx0XHRsZXQgbmV4dEF0PXRoaXMuc3RhcnRUaW1lKyh0aGlzLmRlbGl2ZXJlZFRpY2tzKSp0aGlzLnRpY2tJbnRlcnZhbDtcblx0XHRsZXQgdW50aWxOZXh0PW5leHRBdC10aGlzLmF1ZGlvQ29udGV4dC5jdXJyZW50VGltZTtcblx0XHQvL2NvbnNvbGUubG9nKFwibmV4dCBhdDogXCIrbmV4dEF0K1wiIGluOiBcIit1bnRpbE5leHQpO1xuXG5cdFx0dGhpcy50aW1lb3V0PXNldFRpbWVvdXQodGhpcy5wcm9jZXNzVGlja3MsdW50aWxOZXh0KjEwMDApO1xuXHR9XG5cblx0c3RhcnQoKSB7XG5cdFx0dGhpcy5zdG9wKCk7XG5cdFx0dGhpcy5kZWxpdmVyZWRUaWNrcz0wO1xuXG5cdFx0dGhpcy5wcm9jZXNzVGlja3MoKTtcblx0fVxuXG5cdHN0b3AoKSB7XG5cdFx0Y2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG5cdFx0dGhpcy50aW1lb3V0PW51bGw7XG5cdH1cblxuXHRzZXRTdGFydFRpbWUoc3RhcnRUaW1lKSB7XG5cdFx0aWYgKHRoaXMuaXNSdW5uaW5nKCkpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjYW4ndCBjaGFuZ2Ugc3RhcnQgdGltZSB3aGlsZSBydW5uaW5nISEhXCIpO1xuXG5cdFx0dGhpcy5zdGFydFRpbWU9c3RhcnRUaW1lO1xuXHR9XG5cblx0c2V0VGlja0ludGVydmFsKHRpY2tJbnRlcnZhbCkge1xuXHRcdGlmICh0aGlzLmlzUnVubmluZygpKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2FuJ3QgY2hhbmdlIHRpY2sgaW50ZXJ2YWwgd2hpbGUgcnVubmluZyEhIVwiKTtcblxuXHRcdHRoaXMudGlja0ludGVydmFsPXRpY2tJbnRlcnZhbDtcblx0fVxuXG5cdGlzUnVubmluZygpIHtcblx0XHRyZXR1cm4gISF0aGlzLnRpbWVvdXQ7XG5cdH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBBdWRpb1V0aWwge1xuXHRzdGF0aWMgbG9hZEJ1ZmZlcih1cmwsIGNvbnRleHQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9Pntcblx0XHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0XHRyZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XG5cdFx0XHRyZXF1ZXN0LnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcic7XG5cblx0XHRcdHJlcXVlc3Qub25sb2FkPSgpPT57XG5cdFx0XHRcdGNvbnRleHQuZGVjb2RlQXVkaW9EYXRhKHJlcXVlc3QucmVzcG9uc2UsXG5cdFx0XHRcdFx0KGJ1ZmZlcik9Pntcblx0XHRcdFx0XHRcdHJlc29sdmUoYnVmZmVyKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdChlKT0+e1xuXHRcdFx0XHRcdFx0cmVqZWN0KGUpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQpO1xuXHRcdFx0fTtcblx0XHRcdHJlcXVlc3Quc2VuZCgpO1xuXHRcdH0pXG5cdH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE11c2ljVXRpbCB7XG5cdHN0YXRpYyBPQ1RBVkVfQ0VOVFM9MTIwMDtcblx0c3RhdGljIE5PVEVfTkFNRVM9W1wiQVwiLFwiQSNcIixcIkJcIixcIkNcIixcIkMjXCIsXCJEXCIsXCJEI1wiLFwiRVwiLFwiRlwiLFwiRiNcIixcIkdcIixcIkcjXCJdO1xuXG5cdHN0YXRpYyByYXRlRnJvbUNlbnRzKGNlbnRzKSB7XG5cdFx0bGV0IG1pZGRsZUNGcmVxPTI2MS42Mztcblx0XHRsZXQgZnJlcT1taWRkbGVDRnJlcSpNYXRoLnBvdygyLGNlbnRzLzEyMDApO1xuXHRcdGxldCByYXRlPWZyZXEvbWlkZGxlQ0ZyZXE7XG5cblx0XHRyZXR1cm4gcmF0ZTtcblx0fVxuXG5cdHN0YXRpYyBub3RlVG9DZW50cyhzKSB7XG5cdFx0c3dpdGNoIChzLnRvVXBwZXJDYXNlKCkpIHtcblx0XHRcdGNhc2UgXCJDXCI6XG5cdFx0XHRjYXNlIFwiXCI6XG5cdFx0XHRcdHJldHVybiAwO1xuXG5cdFx0XHRjYXNlIFwiQyNcIjpcblx0XHRcdFx0cmV0dXJuIDEwMDtcblxuXHRcdFx0Y2FzZSBcIkRcIjpcblx0XHRcdFx0cmV0dXJuIDIwMDtcblxuXHRcdFx0Y2FzZSBcIkQjXCI6XG5cdFx0XHRcdHJldHVybiAzMDA7XG5cblx0XHRcdGNhc2UgXCJFXCI6XG5cdFx0XHRcdHJldHVybiA0MDA7XG5cblx0XHRcdGNhc2UgXCJGXCI6XG5cdFx0XHRcdHJldHVybiA1MDA7XG5cblx0XHRcdGNhc2UgXCJGI1wiOlxuXHRcdFx0XHRyZXR1cm4gNjAwO1xuXG5cdFx0XHRjYXNlIFwiR1wiOlxuXHRcdFx0XHRyZXR1cm4gNzAwO1xuXG5cdFx0XHRjYXNlIFwiRyNcIjpcblx0XHRcdFx0cmV0dXJuIDgwMDtcblxuXHRcdFx0Y2FzZSBcIkFcIjpcblx0XHRcdFx0cmV0dXJuIDkwMDtcblxuXHRcdFx0Y2FzZSBcIkEjXCI6XG5cdFx0XHRcdHJldHVybiAxMDAwO1xuXG5cdFx0XHRjYXNlIFwiQlwiOlxuXHRcdFx0XHRyZXR1cm4gMTEwMDtcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgZ2V0Tm90ZXNGb3JTY2FsZShzY2FsZSwgbWlub3IpIHtcblx0XHRsZXQgc3RhcnRJbmRleD1NdXNpY1V0aWwuTk9URV9OQU1FUy5pbmRleE9mKHNjYWxlKTtcblx0XHRpZiAoc3RhcnRJbmRleDwwKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwibm8gc3VjaCBzY2FsZTogXCIrc2NhbGUpO1xuXG5cdFx0bGV0IG5vdGVJbmRlY2VzPVswLDIsNCw1LDcsOSwxMV07XG5cdFx0aWYgKG1pbm9yKVxuXHRcdFx0bm90ZUluZGVjZXM9WzAsMiwzLDUsNyw4LDEwXTtcblxuXHRcdGxldCByZXM9W107XG5cdFx0Zm9yIChsZXQgaW5kZXggb2Ygbm90ZUluZGVjZXMpXG5cdFx0XHRyZXMucHVzaChNdXNpY1V0aWwuTk9URV9OQU1FU1soc3RhcnRJbmRleCtpbmRleCklMTJdKTtcblxuXHRcdHJldHVybiByZXM7XG5cdH1cblxuXHRzdGF0aWMgZ2V0Q2hvcmROb3Rlc0ZvclNjYWxlKHNjYWxlLCBtaW5vcikge1xuXHRcdGxldCBub3RlTmFtZXM9TXVzaWNVdGlsLmdldE5vdGVzRm9yU2NhbGUoc2NhbGUsbWlub3IpO1xuXG5cdFx0bGV0IHJlcz1bXTtcblx0XHRmb3IgKGxldCBpPTA7IGk8MTI7IGkrKylcblx0XHRcdHJlcy5wdXNoKFtcblx0XHRcdFx0bm90ZU5hbWVzWyhpKSU3XSxcblx0XHRcdFx0bm90ZU5hbWVzWyhpKzIpJTddLFxuXHRcdFx0XHRub3RlTmFtZXNbKGkrNCklN10sXG5cdFx0XHRdKTtcblxuXHRcdHJldHVybiByZXM7XG5cdH1cblxuXHRzdGF0aWMgZ2V0Q2hvcmROYW1lc0ZvclNjYWxlKHNjYWxlLCBtaW5vcikge1xuXHRcdGxldCBwcmVmaXhlcz1bXCJcIixcIi1cIixcIi1cIixcIlwiLFwiXCIsXCItXCIsXCJvXCJdO1xuXHRcdGlmIChtaW5vcilcblx0XHRcdHByZWZpeGVzPVtcIi1cIixcIm9cIixcIlwiLFwiLVwiLFwiLVwiLFwiXCIsXCJcIl07XG5cblx0XHRsZXQgbm90ZU5hbWVzPU11c2ljVXRpbC5nZXROb3Rlc0ZvclNjYWxlKHNjYWxlLG1pbm9yKTtcblx0XHRsZXQgcmVzPVtdO1xuXHRcdGZvciAobGV0IGluZGV4IGluIG5vdGVOYW1lcylcblx0XHRcdHJlcy5wdXNoKG5vdGVOYW1lc1tpbmRleF0rcHJlZml4ZXNbaW5kZXhdKTtcblxuXHRcdHJldHVybiByZXM7XG5cdH1cbn0iLCJpbXBvcnQgeyBoLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuXG5leHBvcnQgY2xhc3MgU2VsZWN0IHtcblx0b25DaGFuZ2U9KGUpPT57XG5cdFx0aWYgKHRoaXMucHJvcHMub25DaGFuZ2UpXG5cdFx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKEpTT04ucGFyc2UoZS50YXJnZXQudmFsdWUpKTtcblxuXHRcdGlmICh0aGlzLnByb3BzLm9uSW5kZXhDaGFuZ2UpXG5cdFx0XHR0aGlzLnByb3BzLm9uSW5kZXhDaGFuZ2UoZS50YXJnZXQuc2VsZWN0ZWRJbmRleCk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0bGV0IHByb3BzPXRoaXMucHJvcHM7XG5cblx0XHRpZiAoIXByb3BzLmxhYmVsRmllbGQpXG5cdFx0XHRwcm9wcy5sYWJlbEZpZWxkPVwibGFiZWxcIjtcblxuXHRcdGlmICghcHJvcHMub3B0aW9ucylcblx0XHRcdHByb3BzLm9wdGlvbnM9W107XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PHNlbGVjdCBjbGFzcz17cHJvcHMuY2xhc3N9XG5cdFx0XHRcdFx0c3R5bGU9e3Byb3BzLnN0eWxlfVxuXHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfVxuXHRcdFx0XHRcdGtleT17cHJvcHMua2V5fT5cblx0XHRcdFx0e3Byb3BzLm9wdGlvbnMubWFwKChvcHRpb24sIGluZGV4KT0+e1xuXHRcdFx0XHRcdGxldCBzZWxlY3RlZD1mYWxzZTtcblxuXHRcdFx0XHRcdGlmIChwcm9wcy5oYXNPd25Qcm9wZXJ0eSgnc2VsZWN0ZWRJbmRleCcpICYmXG5cdFx0XHRcdFx0XHRcdGluZGV4PT09cHJvcHMuc2VsZWN0ZWRJbmRleClcblx0XHRcdFx0XHRcdHNlbGVjdGVkPXRydWU7XG5cblx0XHRcdFx0XHRpZiAocHJvcHMuaGFzT3duUHJvcGVydHkoJ3NlbGVjdGVkJykgJiZcblx0XHRcdFx0XHRcdFx0b3B0aW9uLmtleT09PXByb3BzLnNlbGVjdGVkKVxuXHRcdFx0XHRcdFx0c2VsZWN0ZWQ9dHJ1ZTtcblxuXHRcdFx0XHRcdGxldCBrZXk9b3B0aW9uLmtleTtcblx0XHRcdFx0XHRpZiAocHJvcHMuaGFzT3duUHJvcGVydHkoJ29wdGlvbktleVByZWZpeCcpKVxuXHRcdFx0XHRcdFx0a2V5PXByb3BzLmtleVByZWZpeCtrZXk7XG5cblx0XHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdFx0PG9wdGlvbiBrZXk9e2tleX1cblx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17SlNPTi5zdHJpbmdpZnkob3B0aW9uLmtleSl9XG5cdFx0XHRcdFx0XHRcdFx0c2VsZWN0ZWQ9e3NlbGVjdGVkfVxuXHRcdFx0XHRcdFx0XHRcdGNsYXNzPXtvcHRpb24uY2xhc3N9PlxuXHRcdFx0XHRcdFx0XHR7b3B0aW9uW3Byb3BzLmxhYmVsRmllbGRdfVxuXHRcdFx0XHRcdFx0PC9vcHRpb24+XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSl9XG5cdFx0XHQ8L3NlbGVjdD5cblx0XHQpO1xuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBJRihjb25kLGZ1bmMpIHtcblx0aWYgKGNvbmQpXG5cdFx0cmV0dXJuIGZ1bmMoKTtcbn0iLCIvL2ltcG9ydCBpbW11dGFibGUgZnJvbSAnaW1tdXRhYmxlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjb25jaWxlQXJyYXkge1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0dGhpcy5pdGVtc0J5S2V5PXt9O1xuXHRcdHRoaXMub3B0aW9ucz1vcHRpb25zO1xuXHR9XG5cblx0c3RhdGljIGNyZWF0ZVdpdGhGYWN0b3J5KGZhY3RvcnkpIHtcblx0XHRyZXR1cm4gbmV3IFJlY29uY2lsZUFycmF5KHtcblx0XHRcdGl0ZW1GYWN0b3J5OiBmYWN0b3J5XG5cdFx0fSlcblx0fVxuXG5cdGNyZWF0ZUl0ZW0oZGF0YSkge1xuXHRcdGlmICh0aGlzLm9wdGlvbnMuaXRlbUZhY3RvcnkpXG5cdFx0XHRyZXR1cm4gdGhpcy5vcHRpb25zLml0ZW1GYWN0b3J5KGRhdGEpO1xuXG5cdFx0ZWxzZSBpZiAodGhpcy5vcHRpb25zLml0ZW1DbGFzcylcblx0XHRcdHJldHVybiBuZXcgdGhpcy5vcHRpb25zLml0ZW1DbGFzcyhkYXRhKTtcblxuXHRcdGVsc2Vcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIk5vIHdheSB0byBjcmVhdGUgaXRlbXMhXCIpO1xuXHR9XG5cblx0c2V0RGF0YShkYXRhcykge1xuXHRcdGxldCBuZXdLZXlzPVtdO1xuXHRcdGZvciAobGV0IGluZGV4IGluIGRhdGFzKSB7XG5cdFx0XHRsZXQgZGF0YT1kYXRhc1tpbmRleF07XG5cdFx0XHRkYXRhLmluZGV4PWluZGV4O1xuXG5cdFx0XHRpZiAoIWRhdGEua2V5KVxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJBcnJheSBpdGVtIGRvZXNuJ3QgaGF2ZSBhIGtleVwiKTtcblxuXHRcdFx0bGV0IGtleT1TdHJpbmcoZGF0YS5rZXkpO1xuXHRcdFx0bmV3S2V5cy5wdXNoKGtleSk7XG5cblx0XHRcdC8vbGV0IGltPWltbXV0YWJsZS5mcm9tSlMoZGF0YSk7XG5cdFx0XHRpZiAodGhpcy5pdGVtc0J5S2V5W2tleV0pIHtcblx0XHRcdFx0Ly9pZiAoIWltLmVxdWFscyh0aGlzLml0ZW1zQnlLZXlba2V5XS5fX2ltKSlcblx0XHRcdFx0dGhpcy5pdGVtc0J5S2V5W2tleV0udXBkYXRlKGRhdGEpO1xuXHRcdFx0fVxuXG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dGhpcy5pdGVtc0J5S2V5W2tleV09dGhpcy5jcmVhdGVJdGVtKGRhdGEpO1xuXHRcdFx0fVxuXG5cdFx0XHQvL3RoaXMuaXRlbXNCeUtleVtrZXldLl9faW09aW07XG5cdFx0fVxuXG5cdFx0Zm9yIChsZXQga2V5IG9mIE9iamVjdC5rZXlzKHRoaXMuaXRlbXNCeUtleSkpIHtcblx0XHRcdGlmIChuZXdLZXlzLmluZGV4T2Yoa2V5KTwwKSB7XG5cdFx0XHRcdHRoaXMuaXRlbXNCeUtleVtrZXldLmZpbmFsaXplKCk7XG5cdFx0XHRcdGRlbGV0ZSB0aGlzLml0ZW1zQnlLZXlba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRnZXRJdGVtcygpIHtcblx0XHRyZXR1cm4gT2JqZWN0LnZhbHVlcyh0aGlzLml0ZW1zQnlLZXkpO1xuXHR9XG5cblx0Z2V0SXRlbUJ5S2V5KGtleSkge1xuXHRcdHJldHVybiB0aGlzLml0ZW1zQnlLZXlba2V5XTtcblx0fVxufVxuIiwiaW1wb3J0IHsgaCwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQSBleHRlbmRzIENvbXBvbmVudCB7XG5cdG9uRG93bj0oZSk9Pntcblx0XHRpZiAoZSBpbnN0YW5jZW9mIFRvdWNoRXZlbnQpXG5cdFx0XHR3aW5kb3cuaGF2ZVRvdWNoRXZlbnQ9dHJ1ZTtcblxuXHRcdGlmICh3aW5kb3cuaGF2ZVRvdWNoRXZlbnQgJiYgIShlIGluc3RhbmNlb2YgVG91Y2hFdmVudCkpXG5cdFx0XHRyZXR1cm47XG5cblx0XHQvL2UucHJldmVudERlZmF1bHQoKTtcblx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0aWYgKHRoaXMuYmFzZS5pc1ByZXNzZWQpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLmJhc2UuaXNQcmVzc2VkPXRydWU7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5vblByZXNzKVxuXHRcdFx0dGhpcy5wcm9wcy5vblByZXNzKCk7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5vblJlbGVhc2UpXG5cdFx0XHR0aGlzLmJhc2UuY2xhc3NOYW1lKz1cIiBwcmVzc2VkXCI7XG5cdH1cblxuXHRvblVwPShlKT0+e1xuXHRcdGlmIChlIGluc3RhbmNlb2YgVG91Y2hFdmVudClcblx0XHRcdHdpbmRvdy5oYXZlVG91Y2hFdmVudD10cnVlO1xuXG5cdFx0aWYgKHdpbmRvdy5oYXZlVG91Y2hFdmVudCAmJiAhKGUgaW5zdGFuY2VvZiBUb3VjaEV2ZW50KSlcblx0XHRcdHJldHVybjtcblxuXHRcdGlmIChlLmNhbmNlbGFibGUpXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0aWYgKCF0aGlzLmJhc2UuaXNQcmVzc2VkKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5iYXNlLmlzUHJlc3NlZD1mYWxzZTtcblxuXHRcdGlmICh0aGlzLnByb3BzLm9uUmVsZWFzZSkge1xuXHRcdFx0dGhpcy5iYXNlLmNsYXNzTmFtZT10aGlzLmJhc2UuY2xhc3NOYW1lLnJlcGxhY2UoXCIgcHJlc3NlZFwiLFwiXCIpO1xuXHRcdFx0dGhpcy5wcm9wcy5vblJlbGVhc2UoKTtcblx0XHR9XG5cdH1cblxuXHRvbk1vdmU9KGUpPT57XG5cdFx0aWYgKHRoaXMucHJvcHMuY2FuY2VsT25Nb3ZlICYmIHRoaXMuYmFzZS5pc1ByZXNzZWQpIHtcblx0XHRcdHRoaXMuYmFzZS5jbGFzc05hbWU9dGhpcy5iYXNlLmNsYXNzTmFtZS5yZXBsYWNlKFwiIHByZXNzZWRcIixcIlwiKTtcblx0XHRcdHRoaXMuYmFzZS5pc1ByZXNzZWQ9ZmFsc2U7XG5cdFx0fVxuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8YSBjbGFzcz17XCJhIFwiK3RoaXMucHJvcHMuY2xhc3N9XG5cdFx0XHRcdFx0b25Ub3VjaE1vdmU9e3RoaXMub25Nb3ZlfVxuXHRcdFx0XHRcdG9uVG91Y2hTdGFydD17dGhpcy5vbkRvd259XG5cdFx0XHRcdFx0b25Ub3VjaEVuZD17dGhpcy5vblVwfVxuXHRcdFx0XHRcdG9uTW91c2VEb3duPXt0aGlzLm9uRG93bn1cblx0XHRcdFx0XHRvbk1vdXNlVXA9e3RoaXMub25VcH0+XG5cdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVufVxuXHRcdFx0PC9hPlxuXHRcdClcblx0fVxufSIsImltcG9ydCB7IGgsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgQSBmcm9tICcuL0EuanN4JztcbmltcG9ydCB7IFNlbGVjdCwgSUYgfSBmcm9tICcuLi91dGlscy9SZWFjdFV0aWwuanN4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWJvdXRTY3JlZW4gZXh0ZW5kcyBDb21wb25lbnQge1xuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbC1jb250YWluZXJcIiBvbkNsaWNrPXt0aGlzLmNvbnRleHQuaGlkZUFib3V0U2NyZWVufT5cblx0XHRcdFx0PGRpdiBjbGFzcz1cImJveCBib3JkZXIgYm9yZGVyLWRhcmsgYmctYmFja2dyb3VuZCBhYm91dC1zY3JlZW5cIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZS1oZWFkZXIgdGV4dC1zZWNvbmRhcnkgYmctZGFyayBcIj5BQk9VVDwvZGl2PlxuXHRcdFx0XHRcdDxiPkhvb2Rtb2RlPC9iPjxici8+PGJyLz5cblx0XHRcdFx0XHRWZXJzaW9uOiB7dGhpcy5jb250ZXh0LmdldEFwcFZlcnNpb24oKX08YnIvPjxici8+XG5cdFx0XHRcdFx0RW5qb3khIFBsZWFzZSBsZXQgbWUga25vdyBvZiBhbnkgYnVncyB5b3UgZmluZCFcblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBoLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IEEgZnJvbSAnLi9BLmpzeCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkZExheWVyIHtcblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZS1jb250YWluZXJcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cImJveCBwYW5lIGRvdWJsZSBiZy1kYXJrXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInBhbmUtaGVhZGVyIGJnLWRhcmsgdGV4dC1zZWNvbmRhcnlcIj5BREQgTEFZRVI8L2Rpdj5cblx0XHRcdFx0XHR7dGhpcy5jb250ZXh0Lmluc3RydW1lbnRzLm1hcCgoaW5zdHJ1bWVudCxpbmRleCk9Pihcblx0XHRcdFx0XHRcdDxBIGNsYXNzPVwiYm94IHctNCB0ZXh0LXdoaXRlIGJnLWRhbmdlciBlbFwiXG5cdFx0XHRcdFx0XHRcdFx0b25SZWxlYXNlPXt0aGlzLmNvbnRleHQuYWRkTGF5ZXIuYmluZChudWxsLGluc3RydW1lbnQubmFtZSl9PlxuXHRcdFx0XHRcdFx0XHQ8aW1nIHNyYz17XCJpbWcvXCIraW5zdHJ1bWVudC5pY29ufS8+XG5cdFx0XHRcdFx0XHRcdHtpbnN0cnVtZW50Lm5hbWV9XG5cdFx0XHRcdFx0XHQ8L0E+XG5cdFx0XHRcdFx0KSl9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuIiwiaW1wb3J0IHsgaCwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCB7IFNlbGVjdCwgSUYgfSBmcm9tICcuLi91dGlscy9SZWFjdFV0aWwuanN4JztcbmltcG9ydCBIZWFkZXIgZnJvbSAnLi9IZWFkZXIuanN4JztcbmltcG9ydCBGcm9udCBmcm9tICcuL0Zyb250LmpzeCc7XG5pbXBvcnQgU29uZyBmcm9tICcuL1NvbmcuanN4JztcbmltcG9ydCBTb25nU2V0dGluZ3MgZnJvbSAnLi9Tb25nU2V0dGluZ3MuanN4JztcbmltcG9ydCBMYXllclNldHRpbmdzIGZyb20gJy4vTGF5ZXJTZXR0aW5ncy5qc3gnO1xuaW1wb3J0IEFkZExheWVyIGZyb20gJy4vQWRkTGF5ZXIuanN4JztcbmltcG9ydCBMYXllciBmcm9tICcuL0xheWVyLmpzeCc7XG5pbXBvcnQgU2VsZWN0Q2hvcmQgZnJvbSAnLi9TZWxlY3RDaG9yZC5qc3gnO1xuaW1wb3J0IFRhcEhpZ2hsaWdodCBmcm9tICcuL1RhcEhpZ2hsaWdodC5qc3gnO1xuaW1wb3J0IEFib3V0U2NyZWVuIGZyb20gJy4vQWJvdXRTY3JlZW4uanN4JztcbmltcG9ydCBBIGZyb20gJy4vQS5qc3gnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAgZXh0ZW5kcyBDb21wb25lbnQge1xuXHR1cGRhdGVTaXplPSgpPT57XG5cdFx0bGV0IHdpbmRvd1dpZHRoPWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcblx0XHRsZXQgd2luZG93SGVpZ2h0PWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XG5cblx0XHRsZXQgY3M9Z2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpO1xuXHRcdGxldCBwYW5lV2lkdGg9cGFyc2VGbG9hdChjcy5nZXRQcm9wZXJ0eVZhbHVlKCctLXBhbmVXaWR0aCcpKTtcblx0XHRsZXQgcGFuZUhlaWdodD1wYXJzZUZsb2F0KGNzLmdldFByb3BlcnR5VmFsdWUoJy0tcGFuZUhlaWdodCcpKTtcblxuXHRcdGxldCBjb250ZW50V2lkdGgsY29udGVudEhlaWdodDtcblxuXHRcdGxldCBlbD1kb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuXHRcdGxldCBzY3JlZW5LZXlib2FyZEFjdGl2ZT1mYWxzZTtcblx0XHRpZiAoZWwubm9kZU5hbWU9PVwiSU5QVVRcIiAmJiBlbC50eXBlPT1cInRleHRcIilcblx0XHRcdHNjcmVlbktleWJvYXJkQWN0aXZlPXRydWU7XG5cblx0XHQvLyBQb3J0cmFpdC5cblx0XHRpZiAod2luZG93SGVpZ2h0PndpbmRvd1dpZHRoKSB7XG5cdFx0XHRjb250ZW50SGVpZ2h0PTIqKHBhbmVIZWlnaHQrMSkrMjtcblx0XHRcdGNvbnRlbnRXaWR0aD1wYW5lV2lkdGgrMTtcblx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmNsYXNzTGlzdC5hZGQoXCJwb3J0cmFpdFwiKTtcblx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJsYW5kc2NhcGVcIik7XG5cblx0XHRcdGlmICh3aW5kb3cuaGFzT3duUHJvcGVydHkoXCJjb3Jkb3ZhXCIpKVxuXHRcdFx0XHRTdGF0dXNCYXIuc2hvdygpO1xuXHRcdH1cblxuXHRcdC8vIExhbmRzY2FwZS5cblx0XHRlbHNlIHtcblx0XHRcdGNvbnRlbnRIZWlnaHQ9cGFuZUhlaWdodCsyKzE7XG5cdFx0XHRjb250ZW50V2lkdGg9MioocGFuZVdpZHRoKzEpO1xuXHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuY2xhc3NMaXN0LmFkZChcImxhbmRzY2FwZVwiKTtcblx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJwb3J0cmFpdFwiKTtcblxuXHRcdFx0aWYgKHdpbmRvdy5oYXNPd25Qcm9wZXJ0eShcImNvcmRvdmFcIikpIHtcblx0XHRcdFx0aWYgKHNjcmVlbktleWJvYXJkQWN0aXZlKVxuXHRcdFx0XHRcdFN0YXR1c0Jhci5zaG93KCk7XG5cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFN0YXR1c0Jhci5oaWRlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0bGV0IGZvbnRTaXplO1xuXHRcdGlmICh3aW5kb3dXaWR0aC9jb250ZW50V2lkdGg8d2luZG93SGVpZ2h0L2NvbnRlbnRIZWlnaHQpXG5cdFx0XHRmb250U2l6ZT13aW5kb3dXaWR0aC9jb250ZW50V2lkdGg7XG5cblx0XHRlbHNlXG5cdFx0XHRmb250U2l6ZT13aW5kb3dIZWlnaHQvY29udGVudEhlaWdodDtcblxuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJodG1sXCIpLnN0eWxlLmZvbnRTaXplPWZvbnRTaXplK1wicHhcIjtcblxuXHRcdGxldCBzPWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZTtcblx0XHRzLnNldFByb3BlcnR5KFwiLS1wYW5lTWFyZ2luVG9wXCIsKCh3aW5kb3dIZWlnaHQtZm9udFNpemUqY29udGVudEhlaWdodCkvMikrXCJweFwiKTtcblx0XHRzLnNldFByb3BlcnR5KFwiLS1wYW5lTWFyZ2luTGVmdFwiLCgod2luZG93V2lkdGgtZm9udFNpemUqY29udGVudFdpZHRoKS8yKStcInB4XCIpO1xuXHR9XG5cblx0b25QbGF5Q2xpY2s9KCk9Pntcblx0XHRjb25zb2xlLmxvZyhcInBsYXlcIik7XG5cdH1cblxuXHRjb21wb25lbnREaWRNb3VudCgpIHtcblx0XHR3aW5kb3cub25yZXNpemU9dGhpcy51cGRhdGVTaXplO1xuXHRcdHNldFRpbWVvdXQodGhpcy51cGRhdGVTaXplLDApO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdGlmICh0aGlzLmNvbnRleHQuYnVzeSlcblx0XHRcdHJldHVybiAoPGRpdj5MT0FESU5HLi4uPC9kaXY+KTtcblxuXHRcdGxldCBjbHM9XCJcIjtcblx0XHRpZiAodGhpcy5jb250ZXh0LnJlY29yZGluZylcblx0XHRcdGNscz1cInJlY29yZGluZ1wiO1xuXG5cdFx0Ly8gPFRhcEhpZ2hsaWdodCAvPlxuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3M9e2Nsc30+XG5cdFx0XHRcdDxIZWFkZXIgLz5cblx0XHRcdFx0e0lGKCF0aGlzLmNvbnRleHQuaXNTb25nT3BlbigpLCgpPT5cblx0XHRcdFx0XHQ8RnJvbnQgLz5cblx0XHRcdFx0KX1cblx0XHRcdFx0e0lGKHRoaXMuY29udGV4dC5pc1NvbmdPcGVuKCksKCk9Pntcblx0XHRcdFx0XHRpZiAodGhpcy5jb250ZXh0LnNldHRpbmdzVmlzaWJsZSkge1xuXHRcdFx0XHRcdFx0aWYgKHRoaXMuY29udGV4dC5jdXJyZW50TGF5ZXJJbmRleD49MClcblx0XHRcdFx0XHRcdFx0cmV0dXJuIDxMYXllclNldHRpbmdzIC8+O1xuXG5cdFx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRcdHJldHVybiA8U29uZ1NldHRpbmdzIC8+O1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGVsc2UgaWYgKHRoaXMuY29udGV4dC5hZGRMYXllclZpc2libGUpXG5cdFx0XHRcdFx0XHRyZXR1cm4gPEFkZExheWVyIC8+O1xuXG5cdFx0XHRcdFx0ZWxzZSBpZiAodGhpcy5jb250ZXh0LmN1cnJlbnRMYXllckluZGV4Pj0wKVxuXHRcdFx0XHRcdFx0cmV0dXJuIDxMYXllciAvPlxuXG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0cmV0dXJuIDxTb25nIC8+O1xuXHRcdFx0XHR9KX1cblx0XHRcdFx0e0lGKHRoaXMuY29udGV4dC5hYm91dFNjcmVlblZpc2libGUsKCk9PlxuXHRcdFx0XHRcdDxBYm91dFNjcmVlbiAvPlxuXHRcdFx0XHQpfVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuIiwiaW1wb3J0IHsgaCwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCBBIGZyb20gJy4vQS5qc3gnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGcm9udCB7XG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzcz1cInBhbmUtY29udGFpbmVyXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJib3ggcGFuZSBkb3VibGUgYm9yZGVyIGJvcmRlci1kYXJrXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInBhbmUtaGVhZGVyIHRleHQtc2Vjb25kYXJ5IGJnLWRhcmtcIj5TT05HUzwvZGl2PlxuXG5cdFx0XHRcdFx0PEEgY2xhc3M9XCJ0ZXh0LXdoaXRlXCJcblx0XHRcdFx0XHRcdFx0b25SZWxlYXNlPXt0aGlzLmNvbnRleHQuYWRkU29uZ30+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYm94IGJnLWRhcmsgdy0xXCI+KzwvZGl2PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImJveFwiPk5ldyBTb25nPC9kaXY+XG5cdFx0XHRcdFx0PC9BPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJmcm9udC1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdHt0aGlzLmNvbnRleHQuc29uZ3MubWFwKChzb25nLGluZGV4KT0+KFxuXHRcdFx0XHRcdFx0XHQ8QSBjbGFzcz1cImJveCBiZy1zZWNvbmRhcnkgdGV4dC13aGl0ZSB3LTQgYm9yZGVyIGJvcmRlci1saWdodCBlbFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRvblJlbGVhc2U9e3RoaXMuY29udGV4dC5zZXRTb25nSW5kZXguYmluZChudWxsLGluZGV4KX1cblx0XHRcdFx0XHRcdFx0XHRcdGNhbmNlbE9uTW92ZT17dHJ1ZX0+XG5cdFx0XHRcdFx0XHRcdFx0e3NvbmcubmFtZX1cblx0XHRcdFx0XHRcdFx0PC9BPlxuXHRcdFx0XHRcdFx0KSl9XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuIiwiaW1wb3J0IHsgaCwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCB7IFNlbGVjdCwgSUYgfSBmcm9tICcuLi91dGlscy9SZWFjdFV0aWwuanN4JztcbmltcG9ydCBBIGZyb20gJy4vQS5qc3gnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZWFkZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRyZW5kZXIoKSB7XG5cdFx0bGV0IHBsYXlCdXR0b25DbGFzcz1cImhlYWRlci1idXR0b24gdGV4dC13aGl0ZSBcIjtcblx0XHRpZiAodGhpcy5jb250ZXh0LnBsYXlpbmcpXG5cdFx0XHRwbGF5QnV0dG9uQ2xhc3MrPVwiYWN0aXZlXCI7XG5cblx0XHRsZXQgcmVjb3JkQnV0dG9uQ2xhc3M9XCJoZWFkZXItYnV0dG9uIHRleHQtd2hpdGUgXCI7XG5cdFx0aWYgKHRoaXMuY29udGV4dC5yZWNvcmRpbmcpXG5cdFx0XHRyZWNvcmRCdXR0b25DbGFzcys9XCJhY3RpdmVcIjtcblxuXHRcdGxldCBpdGVtcz1bXTtcblx0XHRpZiAodGhpcy5jb250ZXh0LmlzU29uZ09wZW4oKSkge1xuXHRcdFx0aXRlbXMucHVzaChcblx0XHRcdFx0PEEgY2xhc3M9XCJoZWFkZXItYnV0dG9uIHRleHQtd2hpdGVcIlxuXHRcdFx0XHRcdFx0b25SZWxlYXNlPXt0aGlzLmNvbnRleHQuZ29CYWNrfT5cblx0XHRcdFx0XHQ8aW1nIHNyYz1cImltZy9hcnJvdy1sZWZ0LnN2Z1wiLz5cblx0XHRcdFx0PC9BPlxuXHRcdFx0KTtcblxuXHRcdFx0aWYgKHRoaXMuY29udGV4dC5jdXJyZW50TGF5ZXJJbmRleD49MClcblx0XHRcdFx0aXRlbXMucHVzaChcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiaGVhZGVyLWJ1dHRvbiB0ZXh0LXdoaXRlXCI+XG5cdFx0XHRcdFx0XHQ8aW1nIHNyYz17XCJpbWcvXCIrdGhpcy5jb250ZXh0LmdldEluc3RydW1lbnRCeU5hbWUodGhpcy5jb250ZXh0LmdldEN1cnJlbnRMYXllcigpLmluc3RydW1lbnROYW1lKS5pY29ufS8+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdCk7XG5cblx0XHRcdGl0ZW1zLnB1c2goXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJoZWFkZXItdGV4dCB0ZXh0LXdoaXRlXCI+XG5cdFx0XHRcdFx0e3RoaXMuY29udGV4dC5nZXRDdXJyZW50U29uZygpLm5hbWV9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KTtcblxuXHRcdFx0aXRlbXMucHVzaChcblx0XHRcdFx0PEEgY2xhc3M9e3BsYXlCdXR0b25DbGFzc31cblx0XHRcdFx0XHRcdG9uUHJlc3M9e3RoaXMuY29udGV4dC5wbGF5Q2xpY2t9PlxuXHRcdFx0XHRcdDxpbWcgc3JjPVwiaW1nL3BsYXktZmlsbC5zdmdcIi8+XG5cdFx0XHRcdDwvQT5cblx0XHRcdCk7XG5cblx0XHRcdGlmICh0aGlzLmNvbnRleHQuY3VycmVudExheWVySW5kZXg+PTApIFxuXHRcdFx0XHRpdGVtcy5wdXNoKFxuXHRcdFx0XHRcdDxBIGNsYXNzPXtyZWNvcmRCdXR0b25DbGFzc31cblx0XHRcdFx0XHRcdFx0b25QcmVzcz17dGhpcy5jb250ZXh0LnJlY29yZENsaWNrfT5cblx0XHRcdFx0XHRcdDxpbWcgc3JjPVwiaW1nL2NpcmNsZS1maWxsLnN2Z1wiLz5cblx0XHRcdFx0XHQ8L0E+XG5cdFx0XHRcdCk7XG5cblx0XHRcdGl0ZW1zLnB1c2goXG5cdFx0XHRcdDxBIGNsYXNzPVwiaGVhZGVyLWJ1dHRvbiB0ZXh0LXdoaXRlXCJcblx0XHRcdFx0XHRcdG9uUmVsZWFzZT17dGhpcy5jb250ZXh0LnRvZ2dsZVNldHRpbmdzfT5cblx0XHRcdFx0XHQ8aW1nIHNyYz1cImltZy9nZWFyLWZpbGwuc3ZnXCIvPlxuXHRcdFx0XHQ8L0E+XG5cdFx0XHQpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGl0ZW1zLnB1c2goXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJoZWFkZXItdGV4dCB0ZXh0LXdoaXRlXCI+SG9vZG1vZGU8L2Rpdj5cblx0XHRcdCk7XG5cblx0XHRcdGl0ZW1zLnB1c2goXG5cdFx0XHRcdDxBIGNsYXNzPVwiaGVhZGVyLWJ1dHRvbiB0ZXh0LXdoaXRlXCJcblx0XHRcdFx0XHRvblJlbGVhc2U9e3RoaXMuY29udGV4dC5zaG93QWJvdXRTY3JlZW59PlxuXHRcdFx0XHRcdDxpbWcgc3JjPVwiaW1nL2luZm8taWNvbi5zdmdcIi8+XG5cdFx0XHRcdDwvQT5cblx0XHRcdCk7XG5cdFx0fVxuXG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzcz1cImhlYWRlciBib3ggYmctZGFya1wiPlxuXHRcdFx0XHR7aXRlbXN9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59IiwiaW1wb3J0IHsgaCwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCBBIGZyb20gJy4vQS5qc3gnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMYXllciBleHRlbmRzIENvbXBvbmVudCB7XG5cdG9uS2V5RG93bj0oZSk9Pntcblx0XHRpZiAoZS50YXJnZXQubm9kZU5hbWU9PVwiSU5QVVRcIilcblx0XHRcdHJldHVybjtcblxuXHRcdGxldCBrPXBhcnNlSW50KGUua2V5KS0xO1xuXHRcdGlmIChrPj0wKVxuXHRcdFx0dGhpcy5jb250ZXh0LnNvdW5kQnV0dG9uQ2xpY2soayk7XG5cdH1cblxuXHRjb21wb25lbnREaWRNb3VudCgpIHtcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLHRoaXMub25LZXlEb3duKTtcblx0fVxuXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuXHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsdGhpcy5vbktleURvd24pO1xuXHR9XG5cblx0cmVuZGVyU291bmRTeW1ib2xzKCkge1xuXHRcdGxldCBpbnN0cnVtZW50PXRoaXMuY29udGV4dC5nZXRDdXJyZW50SW5zdHJ1bWVudCgpO1xuXHRcdGxldCBsYXllcj10aGlzLmNvbnRleHQuZ2V0Q3VycmVudExheWVyKCk7XG5cdFx0bGV0IGJ1dHRvbnM9bmV3IEFycmF5KDE2KS5maWxsKDxkaXYgY2xhc3M9XCJib3ggdy0xXCIvPik7XG5cdFx0bGV0IG51bVNvdW5kcz10aGlzLmNvbnRleHQuZ2V0SW5zdHJ1bWVudE51bVNvdW5kc0J5TmFtZShpbnN0cnVtZW50Lm5hbWUpO1xuXG5cdFx0Zm9yIChsZXQgaT0wOyBpPDk7IGkrKykge1xuXHRcdFx0bGV0IGJ1dHRvbkluZGV4PTgtNCpNYXRoLmZsb29yKGkvMykraSUzO1xuXHRcdFx0aWYgKGk8bnVtU291bmRzKSB7XG5cdFx0XHRcdGxldCBidXR0b25DbGFzcz1cImJveCB3LTEgYmctcHJpbWFyeSB0ZXh0LXdoaXRlIFwiO1xuXG5cdFx0XHRcdGlmICh0aGlzLmNvbnRleHQuY3VycmVudEdyaWRJbmRleD49MCAmJlxuXHRcdFx0XHRcdFx0bGF5ZXIuc2VxW3RoaXMuY29udGV4dC5jdXJyZW50R3JpZEluZGV4XS5zb3VuZHMuaW5jbHVkZXMoaSkpXG5cdFx0XHRcdFx0YnV0dG9uQ2xhc3MrPVwiYWN0aXZlXCJcblxuXHRcdFx0XHRsZXQgYnV0dG9uSWNvbjtcblx0XHRcdFx0aWYgKGluc3RydW1lbnQudHlwZT09XCJwZXJjdXNzaXZlXCIpXG5cdFx0XHRcdFx0YnV0dG9uSWNvbj1cImltZy9cIitpbnN0cnVtZW50Lmljb25zW2ldO1xuXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRidXR0b25JY29uPVwiaW1nL2hub3RlLVwiKygxKzIqKGklMykpK1wiLnN2Z1wiO1xuXG5cdFx0XHRcdGJ1dHRvbnNbYnV0dG9uSW5kZXhdPVxuXHRcdFx0XHRcdDxBIGNsYXNzPXtidXR0b25DbGFzc31cblx0XHRcdFx0XHRcdFx0b25QcmVzcz17dGhpcy5jb250ZXh0LnNvdW5kQnV0dG9uQ2xpY2suYmluZChudWxsLGkpfT5cblx0XHRcdFx0XHRcdDxpbWcgc3JjPXtidXR0b25JY29ufS8+XG5cdFx0XHRcdFx0PC9BPlxuXHRcdFx0fVxuXG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0YnV0dG9uc1tidXR0b25JbmRleF09XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cImJveCB3LTEgYmctcHJpbWFyeVwiLz5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdGxldCBjbHM9XCJib3ggdy0xIGJnLXdhcm5pbmcgdGV4dC13aGl0ZSBcIjtcblx0XHRpZiAodGhpcy5jb250ZXh0LmN1cnJlbnRHcmlkSW5kZXg+PTAgJiZcblx0XHRcdFx0XHRsYXllci5zZXFbdGhpcy5jb250ZXh0LmN1cnJlbnRHcmlkSW5kZXhdLnN0YWNjKVxuXHRcdFx0Y2xzKz1cImFjdGl2ZVwiO1xuXG5cdFx0YnV0dG9uc1sxMl09KFxuXHRcdFx0PEEgY2xhc3M9e2Nsc31cblx0XHRcdFx0XHRvblByZXNzPXt0aGlzLmNvbnRleHQudG9nZ2xlQ3VycmVudExheWVyU3RhY2N9PlxuXHRcdFx0XHQ8aW1nIHNyYz1cImltZy9yZXN0LnN2Z1wiLz5cblx0XHRcdDwvQT5cblx0XHQpO1xuXG5cdFx0bGV0IGN1cnJlbnRWZWw9bnVsbDtcblx0XHRpZiAodGhpcy5jb250ZXh0LmN1cnJlbnRHcmlkSW5kZXg+PTAgJiZcblx0XHRcdFx0dGhpcy5jb250ZXh0LmN1cnJlbnRMYXllckhhc1NvdW5kQXQodGhpcy5jb250ZXh0LmN1cnJlbnRHcmlkSW5kZXgpKVxuXHRcdFx0Y3VycmVudFZlbD1sYXllci5zZXFbdGhpcy5jb250ZXh0LmN1cnJlbnRHcmlkSW5kZXhdLnZlbDtcblxuXHRcdGxldCBzaXplQ2xhc3Nlcz1bXCJ0aW55XCIsXCJzbWFsbFwiLFwiXCJdO1xuXHRcdGxldCB2ZWxzPVswLjI1LDAuNTAsMV07XG5cdFx0Zm9yIChsZXQgaT0wOyBpPDM7IGkrKykge1xuXHRcdFx0bGV0IGNscz1cImJveCB3LTEgYmctd2FybmluZyB0ZXh0LXdoaXRlIFwiK3NpemVDbGFzc2VzW2ldK1wiIFwiO1xuXG5cdFx0XHRpZiAoY3VycmVudFZlbD09dmVsc1tpXSlcblx0XHRcdFx0Y2xzKz1cImFjdGl2ZVwiO1xuXG5cdFx0XHRidXR0b25zWzEzK2ldPShcblx0XHRcdFx0PEEgY2xhc3M9e2Nsc31cblx0XHRcdFx0XHRcdGhyZWY9XCIjXCJcblx0XHRcdFx0XHRcdG9uUHJlc3M9e3RoaXMuY29udGV4dC5zZXRDdXJyZW50TGF5ZXJWZWwuYmluZChudWxsLHZlbHNbaV0pfT5cblx0XHRcdFx0XHQ8aW1nIHNyYz1cImltZy9ub3RlLnN2Z1wiLz5cblx0XHRcdFx0PC9BPlxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAoaW5zdHJ1bWVudC50eXBlPT1cImhhcm1vbmljXCIpIHtcblx0XHRcdGZvciAobGV0IG9jdGF2ZSBvZiBbMCwxLDJdKSB7XG5cdFx0XHRcdGxldCBjbHM9XCJib3ggdy0xIGJnLWluZm8gdGV4dC13aGl0ZSBcIjtcblx0XHRcdFx0aWYgKHRoaXMuY29udGV4dC5jdXJyZW50R3JpZEluZGV4Pj0wICYmXG5cdFx0XHRcdFx0XHR0aGlzLmNvbnRleHQuY3VycmVudExheWVySGFzQ2hvcmRBdCh0aGlzLmNvbnRleHQuY3VycmVudEdyaWRJbmRleCxvY3RhdmUpKVxuXHRcdFx0XHRcdGNscys9XCJhY3RpdmVcIjtcblxuXHRcdFx0XHRidXR0b25zWzExLW9jdGF2ZSo0XT0oXG5cdFx0XHRcdFx0PEEgY2xhc3M9e2Nsc31cblx0XHRcdFx0XHRcdFx0aHJlZj1cIiNcIlxuXHRcdFx0XHRcdFx0XHRvblByZXNzPXt0aGlzLmNvbnRleHQuY2hvcmRCdXR0b25DbGljay5iaW5kKG51bGwsb2N0YXZlKX0+XG5cdFx0XHRcdFx0XHQ8aW1nIHNyYz1cImltZy9obm90ZS1jaG9yZC5zdmdcIi8+XG5cdFx0XHRcdFx0PC9BPlxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBidXR0b25zO1xuXHR9XG5cblx0cmVuZGVyU2VxdWVuY2UoKSB7XG5cdFx0bGV0IGxheWVyPXRoaXMuY29udGV4dC5nZXRDdXJyZW50TGF5ZXIoKTtcblx0XHRsZXQgcmVzPVtdO1xuXHRcdGxldCB2ZWxDbHM9e1xuXHRcdFx0MC4yNTogXCJ0aW55XCIsXG5cdFx0XHQwLjU6IFwic21hbGxcIixcblx0XHRcdDE6IFwiXCJcblx0XHR9O1xuXG5cdFx0Zm9yIChsZXQgZ3JpZEluZGV4PTA7IGdyaWRJbmRleDwxNjsgZ3JpZEluZGV4KyspIHtcblx0XHRcdGxldCBjbHM9XCJib3ggdy0xIGJlYXQtZ3JpZCBiZWF0LVwiK2dyaWRJbmRleCtcIiBcIjtcblxuXHRcdFx0aWYgKGdyaWRJbmRleD09dGhpcy5jb250ZXh0LmN1cnJlbnRHcmlkSW5kZXgpXG5cdFx0XHRcdGNscys9XCJiZy1saWdodCBcIjtcblxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRjbHMrPVwiYmctYmxhY2sgdGV4dC13aGl0ZSBcIjtcblxuXHRcdFx0bGV0IGljb249bnVsbDtcblx0XHRcdGlmIChsYXllci5zZXFbZ3JpZEluZGV4XS5zdGFjYylcblx0XHRcdFx0aWNvbj08aW1nIHNyYz1cImltZy9yZXN0LnN2Z1wiLz47XG5cblx0XHRcdGVsc2UgaWYgKHRoaXMuY29udGV4dC5jdXJyZW50TGF5ZXJIYXNTb3VuZEF0KGdyaWRJbmRleCkpIHtcblx0XHRcdFx0aWNvbj08aW1nIHNyYz1cImltZy9ub3RlLnN2Z1wiLz47XG5cdFx0XHRcdGNscys9dmVsQ2xzW2xheWVyLnNlcVtncmlkSW5kZXhdLnZlbF07XG5cdFx0XHR9XG5cblx0XHRcdHJlcy5wdXNoKFxuXHRcdFx0XHQ8QSBjbGFzcz17Y2xzfVxuXHRcdFx0XHRcdFx0b25QcmVzcz17dGhpcy5jb250ZXh0LmdyaWRJbmRleENsaWNrLmJpbmQobnVsbCxncmlkSW5kZXgpfT5cblx0XHRcdFx0XHR7aWNvbn1cblx0XHRcdFx0PC9BPlxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdGxldCBsYXllcj10aGlzLmNvbnRleHQuZ2V0Q3VycmVudExheWVyKCk7XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzcz1cInBhbmUtY29udGFpbmVyIHJldi1wb3J0cmFpdFwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZSBib3ggYm9yZGVyIGJvcmRlci1kYXJrXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInBhbmUtaGVhZGVyIHRleHQtc2Vjb25kYXJ5IGJnLWRhcmtcIj5TT1VORFM8L2Rpdj5cblx0XHRcdFx0XHR7dGhpcy5yZW5kZXJTb3VuZFN5bWJvbHMoKX1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lIGJveCBiZy1kYXJrXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInBhbmUtaGVhZGVyIHRleHQtc2Vjb25kYXJ5IGJnLWRhcmtcIj5TRVFVRU5DRTwvZGl2PlxuXHRcdFx0XHRcdHt0aGlzLnJlbmRlclNlcXVlbmNlKCl9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuIiwiaW1wb3J0IHsgaCwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCBBIGZyb20gJy4vQS5qc3gnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMYXllclNldHRpbmdzIHtcblx0cmVuZGVyKCkge1xuXHRcdGxldCBpbnN0cnVtZW50PXRoaXMuY29udGV4dC5nZXRDdXJyZW50SW5zdHJ1bWVudCgpO1xuXHRcdGxldCBsYXllcj10aGlzLmNvbnRleHQuZ2V0Q3VycmVudExheWVyKCk7XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzcz1cInBhbmUtY29udGFpbmVyXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJib3ggcGFuZSBkb3VibGUgYmctZGFya1wiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lLWhlYWRlciBiZy1kYXJrIHRleHQtc2Vjb25kYXJ5XCI+TEFZRVIgU0VUVElOR1M8L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYm94IHctNCBlbCB0ZXh0LXdoaXRlXCI+XG5cdFx0XHRcdFx0XHQ8aW1nIHNyYz17XCJpbWcvXCIraW5zdHJ1bWVudC5pY29ufS8+XG5cdFx0XHRcdFx0XHR7aW5zdHJ1bWVudC5uYW1lfVxuXHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0PGJyLz48YnIvPlxuXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG5cdFx0XHRcdFx0XHRWb2x1bWU8YnIvPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImJveCBib3JkZXIgYmctd2hpdGUgYm9yZGVyLWJsYWNrIHRleHQtYmxhY2sgdy00XCI+XG5cdFx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwicmFuZ2VcIiBtaW49XCIwXCIgbWF4PVwiMVwiIHN0ZXA9XCIwLjAxXCJcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17bGF5ZXIudm9sdW1lfVxuXHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLmNvbnRleHQuc2V0Q3VycmVudExheWVyVm9sdW1lfVxuXHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZm9ybS1idXR0b25zXCI+XG5cdFx0XHRcdFx0XHQ8QSBjbGFzcz1cImJveCBiZy1kYW5nZXIgdGV4dC13aGl0ZVwiXG5cdFx0XHRcdFx0XHRcdFx0b25SZWxlYXNlPXt0aGlzLmNvbnRleHQuZGVsZXRlQ3VycmVudExheWVyfT5cblx0XHRcdFx0XHRcdFx0UmVtb3ZlIExheWVyXG5cdFx0XHRcdFx0XHQ8L0E+XG5cdFx0XHRcdFx0XHQ8QSBjbGFzcz1cImJveCBiZy1wcmltYXJ5IGZvcm0tYnV0dG9uIHRleHQtd2hpdGVcIlxuXHRcdFx0XHRcdFx0XHRcdG9uUmVsZWFzZT17dGhpcy5jb250ZXh0LnRvZ2dsZVNldHRpbmdzfT5cblx0XHRcdFx0XHRcdFx0Q2xvc2Vcblx0XHRcdFx0XHRcdDwvQT5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBoLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IEEgZnJvbSAnLi9BLmpzeCc7XG5pbXBvcnQgeyBTZWxlY3QsIElGIH0gZnJvbSAnLi4vdXRpbHMvUmVhY3RVdGlsLmpzeCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlbGVjdENob3JkIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0cmVuZGVyKCkge1xuXHRcdGxldCBzb25nPXRoaXMuY29udGV4dC5nZXRDdXJyZW50U29uZygpO1xuXHRcdGxldCBzZWN0aW9uPXNvbmcuc2VjdGlvbnNbdGhpcy5jb250ZXh0LmN1cnJlbnRTZWN0aW9uSW5kZXhdO1xuXHRcdGxldCBjdXJyZW50Q2hvcmRJbmRleD1zZWN0aW9uW3RoaXMuY29udGV4dC5lZGl0U2VjdGlvbkNob3JkVmlzaWJsZV07XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRhaW5lclwiIG9uQ2xpY2s9e3RoaXMuY29udGV4dC5oaWRlRWRpdFNlY3Rpb25DaG9yZH0+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJib3ggYm9yZGVyIGJvcmRlci1kYXJrIGJnLWJhY2tncm91bmQgc2VsZWN0LWNob3JkXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInBhbmUtaGVhZGVyIHRleHQtc2Vjb25kYXJ5IGJnLWRhcmsgXCI+RURJVCBDSE9SRDwvZGl2PlxuXHRcdFx0XHRcdDxociBjbGFzcz1cInBhbmUtZGl2aWRlciBmb3VyXCIvPlxuXHRcdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0XHR7dGhpcy5jb250ZXh0LmdldENob3JkTGFiZWxzKCkubWFwKChsYWJlbCwgaW5kZXgpPT57XG5cdFx0XHRcdFx0XHRcdGxldCBjbHM9XCJib3ggdy0xIGJnLXN1Y2Nlc3MgdGV4dC1saWdodCBjaG9yZCBcIjtcblx0XHRcdFx0XHRcdFx0aWYgKGluZGV4PT1jdXJyZW50Q2hvcmRJbmRleClcblx0XHRcdFx0XHRcdFx0XHRjbHMrPVwiYWN0aXZlXCI7XG5cblx0XHRcdFx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHRcdFx0XHQ8QSBjbGFzcz17Y2xzfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRvblJlbGVhc2U9e3RoaXMuY29udGV4dC5lZGl0U2VjdGlvbkNob3JkLmJpbmQobnVsbCxpbmRleCl9PlxuXHRcdFx0XHRcdFx0XHRcdFx0e2xhYmVsfVxuXHRcdFx0XHRcdFx0XHRcdDwvQT5cblx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0fSl9XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0e0lGKHNlY3Rpb24ubGVuZ3RoPjEsKCk9PlxuXHRcdFx0XHRcdFx0PEEgY2xhc3M9XCJib3ggYmctZGFuZ2VyIHctMSB0ZXh0LXdoaXRlXCJcblx0XHRcdFx0XHRcdFx0XHRocmVmPVwiI1wiXG5cdFx0XHRcdFx0XHRcdFx0b25SZWxlYXNlPXt0aGlzLmNvbnRleHQucmVtb3ZlU2VjdGlvbkNob3JkfT5cblx0XHRcdFx0XHRcdFx0PGltZyBzcmM9XCJpbWcvdHJhc2guc3ZnXCIvPlxuXHRcdFx0XHRcdFx0PC9BPlxuXHRcdFx0XHRcdCl9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuIiwiaW1wb3J0IHsgaCwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCBTb25nTGF5ZXJzIGZyb20gJy4vU29uZ0xheWVycy5qc3gnO1xuaW1wb3J0IFNvbmdDaG9yZHMgZnJvbSAnLi9Tb25nQ2hvcmRzLmpzeCc7XG5pbXBvcnQgQSBmcm9tICcuL0EuanN4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU29uZyBleHRlbmRzIENvbXBvbmVudCB7XG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzcz1cInBhbmUtY29udGFpbmVyXCI+XG5cdFx0XHRcdDxTb25nTGF5ZXJzIC8+XG5cdFx0XHRcdDxTb25nQ2hvcmRzIC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBoLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IFNlbGVjdENob3JkIGZyb20gJy4vU2VsZWN0Q2hvcmQuanN4JztcbmltcG9ydCB7IFNlbGVjdCwgSUYgfSBmcm9tICcuLi91dGlscy9SZWFjdFV0aWwuanN4JztcbmltcG9ydCBBIGZyb20gJy4vQS5qc3gnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTb25nQ2hvcmRzIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0cmVuZGVyQ29uZHVjdG9yQ2hvcmRzKCkge1xuXHRcdHJldHVybiB0aGlzLmNvbnRleHQuZ2V0Q2hvcmRMYWJlbHMoKS5tYXAoKGxhYmVsLCBpbmRleCk9Pntcblx0XHRcdGxldCBjbHM9XCJib3ggdy0xIGJnLXN1Y2Nlc3MgdGV4dC1saWdodCBjaG9yZCBcIjtcblx0XHRcdGlmIChpbmRleD09dGhpcy5jb250ZXh0LmN1cnJlbnRDaG9yZEluZGV4KVxuXHRcdFx0XHRjbHMrPVwiIGFjdGl2ZSBiZWF0LTAgYmVhdC00IGJlYXQtOCBiZWF0LTEyXCI7XG5cblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxBIGNsYXNzPXtjbHN9XG5cdFx0XHRcdFx0XHRvblByZXNzPXt0aGlzLmNvbnRleHQuc2V0Q3VycmVudENob3JkSW5kZXguYmluZChudWxsLGluZGV4KX0+XG5cdFx0XHRcdFx0e2xhYmVsfVxuXHRcdFx0XHQ8L0E+XG5cdFx0XHQpXG5cdFx0fSk7XG5cdH1cblxuXHRyZW5kZXJTZWN0aW9uQ2hvcmRzKCkge1xuXHRcdGxldCBhPXRoaXMuY29udGV4dC5nZXRDdXJyZW50U2VjdGlvbkNob3JkTGFiZWxzKCkubWFwKChsYWJlbCwgaW5kZXgpPT57XG5cdFx0XHRsZXQgY2xzPVwiYm94IHctMSBiZy1zdWNjZXNzIHRleHQtbGlnaHQgc2VjdGlvbi1jaG9yZCBzZXF1ZW5jZS1cIitpbmRleDtcblxuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PEEgY2xhc3M9e2Nsc31cblx0XHRcdFx0XHRcdG9uUmVsZWFzZT17dGhpcy5jb250ZXh0LnNob3dFZGl0U2VjdGlvbkNob3JkLmJpbmQobnVsbCxpbmRleCl9PlxuXHRcdFx0XHRcdHtsYWJlbH1cblx0XHRcdFx0PC9BPlxuXHRcdFx0KTtcblx0XHR9KTtcblxuXHRcdGEucHVzaChcblx0XHRcdDxBIGNsYXNzPVwiYm94IGJvcmRlciBib3JkZXItd2hpdGUgdGV4dC13aGl0ZSB3LTFcIlxuXHRcdFx0XHRcdG9uUmVsZWFzZT17dGhpcy5jb250ZXh0LmFkZFNlY3Rpb25DaG9yZH0+XG5cdFx0XHRcdCtcblx0XHRcdDwvQT5cblx0XHQpO1xuXG5cdFx0cmV0dXJuIGE7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0bGV0IHNvbmc9dGhpcy5jb250ZXh0LmdldEN1cnJlbnRTb25nKCk7XG5cblx0XHRsZXQgY2hvcmRMYWJlbHM7XG5cdFx0aWYgKHRoaXMuY29udGV4dC5jdXJyZW50U2VjdGlvbkluZGV4PT0tMSlcblx0XHRcdGNob3JkTGFiZWxzPXRoaXMucmVuZGVyQ29uZHVjdG9yQ2hvcmRzKCk7XG5cblx0XHRlbHNlXG5cdFx0XHRjaG9yZExhYmVscz10aGlzLnJlbmRlclNlY3Rpb25DaG9yZHMoKTtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZSBib3ggYm9yZGVyIGJvcmRlci1kYXJrXCI+XG5cdFx0XHRcdDxociBjbGFzcz1cInBhbmUtZGl2aWRlclwiLz5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInBhbmUtaGVhZGVyIHRleHQtc2Vjb25kYXJ5IGJnLWRhcmsgXCI+Q0hPUkRTPC9kaXY+XG5cdFx0XHRcdDxkaXYgc3R5bGU9e3toZWlnaHQ6ICc2ZW0nfX0+e2Nob3JkTGFiZWxzfTwvZGl2PlxuXHRcdFx0XHQ8QSBjbGFzcz17XCJib3ggdy0xIGJnLXNlY29uZGFyeSB0ZXh0LXdoaXRlIFwiK1xuXHRcdFx0XHRcdFx0XHQoKHRoaXMuY29udGV4dC5jdXJyZW50U2VjdGlvbkluZGV4PT0tMSk/XCJhY3RpdmVcIjpcIlwiKX1cblx0XHRcdFx0XHRcdG9uUHJlc3M9e3RoaXMuY29udGV4dC5zZXRDdXJyZW50U2VjdGlvbkluZGV4LmJpbmQobnVsbCwtMSl9PlxuXHRcdFx0XHRcdDxpbWcgc3JjPVwiaW1nL2NvbmR1Y3Rvci5zdmdcIi8+XG5cdFx0XHRcdDwvQT5cblx0XHRcdFx0e1tcIkFcIixcIkJcIixcIkNcIl0ubWFwKChsZXR0ZXIsIGluZGV4KT0+e1xuXHRcdFx0XHRcdGxldCBjbHM9XCJib3ggdy0xIGJnLXByaW1hcnkgdGV4dC13aGl0ZSBcIjtcblx0XHRcdFx0XHRpZiAoaW5kZXg9PXRoaXMuY29udGV4dC5jdXJyZW50U2VjdGlvbkluZGV4KVxuXHRcdFx0XHRcdFx0Y2xzKz1cImFjdGl2ZVwiO1xuXG5cdFx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHRcdDxBIGNsYXNzPXtjbHN9XG5cdFx0XHRcdFx0XHRcdFx0b25QcmVzcz17dGhpcy5jb250ZXh0LnNldEN1cnJlbnRTZWN0aW9uSW5kZXguYmluZChudWxsLGluZGV4KX0+XG5cdFx0XHRcdFx0XHRcdHtsZXR0ZXJ9XG5cdFx0XHRcdFx0XHQ8L0E+XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSl9XG5cdFx0XHRcdHtJRih0aGlzLmNvbnRleHQuZWRpdFNlY3Rpb25DaG9yZFZpc2libGU+PTAsKCk9PlxuXHRcdFx0XHRcdDxTZWxlY3RDaG9yZCAvPlxuXHRcdFx0XHQpfVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuIiwiaW1wb3J0IHsgaCwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCBBIGZyb20gJy4vQS5qc3gnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTb25nTGF5ZXJzIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0cmVuZGVyKCkge1xuXHRcdGxldCBzb25nPXRoaXMuY29udGV4dC5nZXRDdXJyZW50U29uZygpO1xuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lIGJveCBib3JkZXIgYm9yZGVyLWRhcmtcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInBhbmUtaGVhZGVyIHRleHQtc2Vjb25kYXJ5XCI+TEFZRVJTPC9kaXY+XG5cdFx0XHRcdHtzb25nLmxheWVycy5tYXAoKGxheWVyLGluZGV4KT0+e1xuXHRcdFx0XHRcdGxldCBjbHM9XCJib3ggYmctZGFuZ2VyIHRleHQtd2hpdGUgdy0yIGxheWVyLWJ1dHRvbi1cIitpbmRleCtcIiBcIjtcblx0XHRcdFx0XHRsZXQgaWNvbj1cImltZy90b2dnbGUtb24uc3ZnXCI7XG5cblx0XHRcdFx0XHRpZiAoIWxheWVyLmF1ZGlibGUpIHtcblx0XHRcdFx0XHRcdGljb249XCJpbWcvdG9nZ2xlLW9mZi5zdmdcIjtcblx0XHRcdFx0XHRcdGNscys9XCJmYWRlZFwiO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0XHQ8QSBjbGFzcz17Y2xzfVxuXHRcdFx0XHRcdFx0XHRvblJlbGVhc2U9e3RoaXMuY29udGV4dC5zZXRMYXllckluZGV4LmJpbmQobnVsbCxpbmRleCl9PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwibGF5ZXItaWNvblwiPlxuXHRcdFx0XHRcdFx0XHRcdDxpbWcgc3JjPXtcImltZy9cIit0aGlzLmNvbnRleHQuZ2V0SW5zdHJ1bWVudEJ5TmFtZShsYXllci5pbnN0cnVtZW50TmFtZSkuaWNvbn0vPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PEEgY2xhc3M9XCJsYXllci1pY29uXCJcblx0XHRcdFx0XHRcdFx0XHRvblByZXNzPXt0aGlzLmNvbnRleHQudG9nZ2xlTGF5ZXJBdWRpYmxlLmJpbmQobnVsbCxpbmRleCl9PlxuXHRcdFx0XHRcdFx0XHRcdDxpbWcgc3JjPXtpY29ufS8+XG5cdFx0XHRcdFx0XHRcdDwvQT5cblx0XHRcdFx0XHRcdDwvQT5cblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9KX1cblxuXHRcdFx0XHQ8QSBjbGFzcz1cImJveCBib3JkZXIgYm9yZGVyLXdoaXRlIHRleHQtd2hpdGUgdy0xXCJcblx0XHRcdFx0XHRcdGhyZWY9XCIjXCJcblx0XHRcdFx0XHRcdG9uUmVsZWFzZT17dGhpcy5jb250ZXh0LnNob3dBZGRMYXllcn0+XG5cdFx0XHRcdFx0K1xuXHRcdFx0XHQ8L0E+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBoLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IHsgU2VsZWN0LCBJRiB9IGZyb20gJy4uL3V0aWxzL1JlYWN0VXRpbC5qc3gnO1xuaW1wb3J0IEEgZnJvbSAnLi9BLmpzeCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNvbmdTZXR0aW5ncyB7XG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzcz1cInBhbmUtY29udGFpbmVyXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lIGJveCBkb3VibGUgYmctZGFya1wiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lLWhlYWRlciBiZy1kYXJrIHRleHQtc2Vjb25kYXJ5XCI+U09ORyBTRVRUSU5HUzwvZGl2PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuXHRcdFx0XHRcdFx0U29uZyBOYW1lPGJyLz5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJib3ggYm9yZGVyIGJnLXdoaXRlIGJvcmRlci1ibGFjayB0ZXh0LWJsYWNrIHctNFwiPlxuXHRcdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cInRleHRcIlxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlPXt0aGlzLmNvbnRleHQuZ2V0Q3VycmVudFNvbmcoKS5uYW1lfVxuXHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLmNvbnRleHQuc2V0Q3VycmVudFNvbmdOYW1lfS8+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuXHRcdFx0XHRcdFx0VGVtcG88YnIvPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImJveCBib3JkZXIgYmctd2hpdGUgYm9yZGVyLWJsYWNrIHRleHQtYmxhY2sgdy00XCI+XG5cdFx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwidGV4dFwiXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU9e3RoaXMuY29udGV4dC5nZXRDdXJyZW50U29uZygpLmJwbX1cblx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5jb250ZXh0LnNldEN1cnJlbnRTb25nQnBtfS8+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuXHRcdFx0XHRcdFx0S2V5PGJyLz5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJib3ggYm9yZGVyIGJnLXdoaXRlIGJvcmRlci1ibGFjayB0ZXh0LWJsYWNrIHctMlwiPlxuXHRcdFx0XHRcdFx0XHQ8U2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sIGNvbC0yXCJcblx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnM9e3RoaXMuY29udGV4dC5nZXROb3Rlc1NlbGVjdE9wdGlvbnMoKX1cblx0XHRcdFx0XHRcdFx0XHRcdHNlbGVjdGVkPXt0aGlzLmNvbnRleHQuZ2V0Q3VycmVudFNvbmcoKS5tdXNpY0tleX1cblx0XHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLmNvbnRleHQuc2V0Q3VycmVudFNvbmdNdXNpY0tleX0vPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYm94IGJvcmRlciBiZy13aGl0ZSBib3JkZXItYmxhY2sgdGV4dC1ibGFjayB3LTJcIj5cblx0XHRcdFx0XHRcdFx0PFNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbCBjb2wtNFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zPXt0aGlzLmNvbnRleHQuZ2V0TW9kYWxTZWxlY3RPcHRpb25zKCl9XG5cdFx0XHRcdFx0XHRcdFx0XHRzZWxlY3RlZD17dGhpcy5jb250ZXh0LmdldEN1cnJlbnRTb25nKCkubWlub3J9XG5cdFx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5jb250ZXh0LnNldEN1cnJlbnRTb25nTWlub3J9Lz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cImZvcm0tYnV0dG9uc1wiPlxuXHRcdFx0XHRcdFx0PEEgY2xhc3M9XCJiZy1kYW5nZXIgYm94IHRleHQtd2hpdGVcIlxuXHRcdFx0XHRcdFx0XHRcdGhyZWY9XCIjXCJcblx0XHRcdFx0XHRcdFx0XHRvblJlbGVhc2U9e3RoaXMuY29udGV4dC5kZWxldGVDdXJyZW50U29uZ30+XG5cdFx0XHRcdFx0XHRcdFJlbW92ZSBTb25nXG5cdFx0XHRcdFx0XHQ8L0E+XG5cdFx0XHRcdFx0XHQ8QSBjbGFzcz1cImJnLXByaW1hcnkgYm94IHRleHQtd2hpdGVcIlxuXHRcdFx0XHRcdFx0XHRcdGhyZWY9XCIjXCJcblx0XHRcdFx0XHRcdFx0XHRvblJlbGVhc2U9e3RoaXMuY29udGV4dC50b2dnbGVTZXR0aW5nc30+XG5cdFx0XHRcdFx0XHRcdENsb3NlXG5cdFx0XHRcdFx0XHQ8L0E+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuIiwiaW1wb3J0IHsgaCwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCB7IFNlbGVjdCwgSUYgfSBmcm9tICcuLi91dGlscy9SZWFjdFV0aWwuanN4JztcbmltcG9ydCBBIGZyb20gJy4vQS5qc3gnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYXBIaWdobGlnaHQgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKTtcblxuXHRcdHRoaXMuc3RhdGU9e1xuXHRcdFx0c2hvd0hpZ2hsaWdodDogZmFsc2Vcblx0XHR9XG5cdH1cblxuXHRvbkNvbnRleHRNZW51PShlKT0+e1xuXHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRzaG93SGlnaGxpZ2h0OiB0cnVlXG5cdFx0fSk7XG5cblx0XHRsZXQgcz1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGU7XG5cdFx0cy5zZXRQcm9wZXJ0eShcIi0tdGFwSGlnaGxpZ2h0TGVmdFwiLGUuY2xpZW50WCtcInB4XCIpO1xuXHRcdHMuc2V0UHJvcGVydHkoXCItLXRhcEhpZ2hsaWdodFRvcFwiLGUuY2xpZW50WStcInB4XCIpO1xuXHR9O1xuXG5cdG9uTW91c2VVcD0oZSk9Pntcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdHNob3dIaWdobGlnaHQ6IGZhbHNlXG5cdFx0fSk7XG5cdH07XG5cblx0Y29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNvbnRleHRtZW51XCIsdGhpcy5vbkNvbnRleHRNZW51KTtcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLHRoaXMub25Nb3VzZVVwKTtcblx0fVxuXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuXHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLHRoaXMub25Db250ZXh0TWVudSk7XG5cdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIix0aGlzLm9uTW91c2VVcCk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3M9XCJ0YXAtaGlnaGxpZ2h0XCI+XG5cdFx0XHRcdHtJRih0aGlzLnN0YXRlLnNob3dIaWdobGlnaHQsKCk9PlxuXHRcdFx0XHRcdDxpbWcgc3JjPVwiaW1nL3RhcC1oaWdobGlnaHQuc3ZnXCIvPlxuXHRcdFx0XHQpfVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSJdfQ==
