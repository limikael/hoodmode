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
    console.log(_demosongs["default"]);
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
        "key": "drums",
        "type": "percussive",
        "name": "Drums",
        "labels": ["KICK", "KICK", "SNARE", "SNARE", "HI-HAT", "HI-HAT", "HI-HAT", "SHAKER", "CLAP"],
        "icon": "drum.svg",
        "icons": ["kick-drum.svg", "kick-drum.svg", "snare-drum.svg", "snare-drum.svg", "hi-hat.svg", "hi-hat.svg", "hi-hat.svg", "maracas.svg", "clap.svg"],
        "samples": ["samples/drums/yes-kick.mp3", "samples/drums/bad-kick.wav", "samples/drums/yes-snare.mp3", "samples/drums/bad-snare.wav", "samples/drums/bad-hihat.wav", "samples/drums/thrl-hat_A_minor.wav", "samples/drums/rock-hihat-tchik.wav", "samples/drums/Yamaha-RX15-Shaker.wav", "samples/drums/Roland-R-8-808-Clap.wav"]
      });
      state.instruments.push({
        "key": "string-bass",
        "type": "harmonic",
        "name": "String Bass",
        "sample": "samples/Yamaha-EX5-Old-Strings-C2-edited.wav",
        "icon": "bass.svg"
      });
      state.instruments.push({
        "key": "piano",
        "type": "harmonic",
        "name": "Piano",
        "sample": "samples/piano-c.wav",
        "icon": "piano.svg",
        "defaultVolume": 0.25
      });
      state.instruments.push({
        "key": "korg-organ",
        "type": "harmonic",
        "name": "Korg Organ",
        "sample": "samples/Korg-DW-8000-Organ-C3.wav",
        "icon": "organ.svg",
        "defaultVolume": 0.25
      });
      state.instruments.push({
        "key": "clav",
        "type": "harmonic",
        "name": "Clav",
        "sample": "samples/Ensoniq-ESQ-1-Clav-Piano-C3.wav",
        "icon": "clav.svg",
        "defaultVolume": 0.75
      });
      state.instruments.push({
        "key": "strings",
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
      return state;
    }
  }, {
    key: "cancelDialog",
    value: function cancelDialog(state) {
      state.dialogText = null;
      state.dialogAction = null;
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
    "instrumentName": "Drums",
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
    "instrumentName": "String Bass",
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
    "instrumentName": "Piano",
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
    "instrumentName": "Korg Organ",
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
    "instrumentName": "Clav",
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
    "instrumentName": "Piano",
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
    "instrumentName": "Strings",
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
    "instrumentName": "String Bass",
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
    "instrumentName": "Piano",
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
    "instrumentName": "Drums",
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
    "instrumentName": "Piano",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbmFub2lkL2Zvcm1hdC5icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9kZWJ1Zy9kaXN0L2RlYnVnLmpzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9kZXZ0b29scy9kaXN0L2RldnRvb2xzLmpzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9kaXN0L3ByZWFjdC5qcyIsIm5vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiLCJub2RlX21vZHVsZXMvc2hvcnRpZC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9hbHBoYWJldC5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9idWlsZC5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9nZW5lcmF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9pcy12YWxpZC5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9yYW5kb20vcmFuZG9tLWJ5dGUtYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9yYW5kb20vcmFuZG9tLWZyb20tc2VlZC5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi91dGlsL2NsdXN0ZXItd29ya2VyLWlkLWJyb3dzZXIuanMiLCJwYWNrYWdlLmpzb24iLCJzcmMvaW5kZXguanN4Iiwic3JjL21vZGVsL0FwcENvbnRyb2xsZXIuanMiLCJzcmMvbW9kZWwvQXBwSGVscGVyLmpzIiwic3JjL21vZGVsL0NvbmR1Y3Rvci5qcyIsInNyYy9tb2RlbC9Db25kdWN0b3JJbnN0cnVtZW50LmpzIiwic3JjL21vZGVsL0NvbmR1Y3RvckxheWVyLmpzIiwic3JjL21vZGVsL0NvbmR1Y3Rvck5vdGUuanMiLCJzcmMvbW9kZWwvZGVtb3NvbmdzLmpzIiwic3JjL3V0aWxzL0FwcENvbnRleHQuanMiLCJzcmMvdXRpbHMvQXVkaW9UaW1lci5qcyIsInNyYy91dGlscy9BdWRpb1V0aWwuanMiLCJzcmMvdXRpbHMvTXVzaWNVdGlsLmpzIiwic3JjL3V0aWxzL1JlYWN0VXRpbC5qc3giLCJzcmMvdXRpbHMvUmVjb25jaWxlQXJyYXkuanMiLCJzcmMvdmlldy9BLmpzeCIsInNyYy92aWV3L0Fib3V0U2NyZWVuLmpzeCIsInNyYy92aWV3L0FkZExheWVyLmpzeCIsInNyYy92aWV3L0FwcC5qc3giLCJzcmMvdmlldy9EaWFsb2cuanN4Iiwic3JjL3ZpZXcvRnJvbnQuanN4Iiwic3JjL3ZpZXcvSGVhZGVyLmpzeCIsInNyYy92aWV3L0xheWVyLmpzeCIsInNyYy92aWV3L0xheWVyU2V0dGluZ3MuanN4Iiwic3JjL3ZpZXcvU2VsZWN0Q2hvcmQuanN4Iiwic3JjL3ZpZXcvU29uZy5qc3giLCJzcmMvdmlldy9Tb25nQ2hvcmRzLmpzeCIsInNyYy92aWV3L1NvbmdMYXllcnMuanN4Iiwic3JjL3ZpZXcvU29uZ1NldHRpbmdzLmpzeCIsInNyYy92aWV3L1RhcEhpZ2hsaWdodC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0dEJBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDNUNBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUEsSUFBSSxTQUFKLEVBQWUsU0FBZixFQUEwQixhQUEx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RyxFQUFDO0FBQVQsVUFENEI7QUFBQSxPQUE1QixDQURGLENBREQ7QUFPQTs7OztFQTlDd0MsaUIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBUaGlzIGZpbGUgcmVwbGFjZXMgYGZvcm1hdC5qc2AgaW4gYnVuZGxlcnMgbGlrZSB3ZWJwYWNrIG9yIFJvbGx1cCxcbi8vIGFjY29yZGluZyB0byBgYnJvd3NlcmAgY29uZmlnIGluIGBwYWNrYWdlLmpzb25gLlxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChyYW5kb20sIGFscGhhYmV0LCBzaXplKSB7XG4gIC8vIFdlIGNhbuKAmXQgdXNlIGJ5dGVzIGJpZ2dlciB0aGFuIHRoZSBhbHBoYWJldC4gVG8gbWFrZSBieXRlcyB2YWx1ZXMgY2xvc2VyXG4gIC8vIHRvIHRoZSBhbHBoYWJldCwgd2UgYXBwbHkgYml0bWFzayBvbiB0aGVtLiBXZSBsb29rIGZvciB0aGUgY2xvc2VzdFxuICAvLyBgMiAqKiB4IC0gMWAgbnVtYmVyLCB3aGljaCB3aWxsIGJlIGJpZ2dlciB0aGFuIGFscGhhYmV0IHNpemUuIElmIHdlIGhhdmVcbiAgLy8gMzAgc3ltYm9scyBpbiB0aGUgYWxwaGFiZXQsIHdlIHdpbGwgdGFrZSAzMSAoMDAwMTExMTEpLlxuICAvLyBXZSBkbyBub3QgdXNlIGZhc3RlciBNYXRoLmNsejMyLCBiZWNhdXNlIGl0IGlzIG5vdCBhdmFpbGFibGUgaW4gYnJvd3NlcnMuXG4gIHZhciBtYXNrID0gKDIgPDwgTWF0aC5sb2coYWxwaGFiZXQubGVuZ3RoIC0gMSkgLyBNYXRoLkxOMikgLSAxXG4gIC8vIEJpdG1hc2sgaXMgbm90IGEgcGVyZmVjdCBzb2x1dGlvbiAoaW4gb3VyIGV4YW1wbGUgaXQgd2lsbCBwYXNzIDMxIGJ5dGVzLFxuICAvLyB3aGljaCBpcyBiaWdnZXIgdGhhbiB0aGUgYWxwaGFiZXQpLiBBcyBhIHJlc3VsdCwgd2Ugd2lsbCBuZWVkIG1vcmUgYnl0ZXMsXG4gIC8vIHRoYW4gSUQgc2l6ZSwgYmVjYXVzZSB3ZSB3aWxsIHJlZnVzZSBieXRlcyBiaWdnZXIgdGhhbiB0aGUgYWxwaGFiZXQuXG5cbiAgLy8gRXZlcnkgaGFyZHdhcmUgcmFuZG9tIGdlbmVyYXRvciBjYWxsIGlzIGNvc3RseSxcbiAgLy8gYmVjYXVzZSB3ZSBuZWVkIHRvIHdhaXQgZm9yIGVudHJvcHkgY29sbGVjdGlvbi4gVGhpcyBpcyB3aHkgb2Z0ZW4gaXQgd2lsbFxuICAvLyBiZSBmYXN0ZXIgdG8gYXNrIGZvciBmZXcgZXh0cmEgYnl0ZXMgaW4gYWR2YW5jZSwgdG8gYXZvaWQgYWRkaXRpb25hbCBjYWxscy5cblxuICAvLyBIZXJlIHdlIGNhbGN1bGF0ZSBob3cgbWFueSByYW5kb20gYnl0ZXMgc2hvdWxkIHdlIGNhbGwgaW4gYWR2YW5jZS5cbiAgLy8gSXQgZGVwZW5kcyBvbiBJRCBsZW5ndGgsIG1hc2sgLyBhbHBoYWJldCBzaXplIGFuZCBtYWdpYyBudW1iZXIgMS42XG4gIC8vICh3aGljaCB3YXMgc2VsZWN0ZWQgYWNjb3JkaW5nIGJlbmNobWFya3MpLlxuXG4gIC8vIC1+ZiA9PiBNYXRoLmNlaWwoZikgaWYgbiBpcyBmbG9hdCBudW1iZXJcbiAgLy8gLX5pID0+IGkgKyAxIGlmIG4gaXMgaW50ZWdlciBudW1iZXJcbiAgdmFyIHN0ZXAgPSAtfigxLjYgKiBtYXNrICogc2l6ZSAvIGFscGhhYmV0Lmxlbmd0aClcbiAgdmFyIGlkID0gJydcblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIHZhciBieXRlcyA9IHJhbmRvbShzdGVwKVxuICAgIC8vIENvbXBhY3QgYWx0ZXJuYXRpdmUgZm9yIGBmb3IgKHZhciBpID0gMDsgaSA8IHN0ZXA7IGkrKylgXG4gICAgdmFyIGkgPSBzdGVwXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgLy8gSWYgcmFuZG9tIGJ5dGUgaXMgYmlnZ2VyIHRoYW4gYWxwaGFiZXQgZXZlbiBhZnRlciBiaXRtYXNrLFxuICAgICAgLy8gd2UgcmVmdXNlIGl0IGJ5IGB8fCAnJ2AuXG4gICAgICBpZCArPSBhbHBoYWJldFtieXRlc1tpXSAmIG1hc2tdIHx8ICcnXG4gICAgICAvLyBNb3JlIGNvbXBhY3QgdGhhbiBgaWQubGVuZ3RoICsgMSA9PT0gc2l6ZWBcbiAgICAgIGlmIChpZC5sZW5ndGggPT09ICtzaXplKSByZXR1cm4gaWRcbiAgICB9XG4gIH1cbn1cbiIsInZhciBuPXJlcXVpcmUoXCJwcmVhY3RcIik7cmVxdWlyZShcInByZWFjdC9kZXZ0b29sc1wiKTt2YXIgZT17fTtmdW5jdGlvbiB0KGUpe3JldHVybiBlLnR5cGU9PT1uLkZyYWdtZW50P1wiRnJhZ21lbnRcIjpcImZ1bmN0aW9uXCI9PXR5cGVvZiBlLnR5cGU/ZS50eXBlLmRpc3BsYXlOYW1lfHxlLnR5cGUubmFtZTpcInN0cmluZ1wiPT10eXBlb2YgZS50eXBlP2UudHlwZTpcIiN0ZXh0XCJ9dmFyIG89W10scj1bXTtmdW5jdGlvbiBhKCl7cmV0dXJuIG8ubGVuZ3RoPjA/b1tvLmxlbmd0aC0xXTpudWxsfXZhciBpPSExO2Z1bmN0aW9uIHMoZSl7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgZS50eXBlJiZlLnR5cGUhPT1uLkZyYWdtZW50fWZ1bmN0aW9uIGMobil7Zm9yKHZhciBlPVtuXSxvPW47bnVsbCE9by5fX287KWUucHVzaChvLl9fbyksbz1vLl9fbztyZXR1cm4gZS5yZWR1Y2UoZnVuY3Rpb24obixlKXtuKz1cIiAgaW4gXCIrdChlKTt2YXIgbz1lLl9fc291cmNlO3JldHVybiBvP24rPVwiIChhdCBcIitvLmZpbGVOYW1lK1wiOlwiK28ubGluZU51bWJlcitcIilcIjppfHwoaT0hMCxjb25zb2xlLndhcm4oXCJBZGQgQGJhYmVsL3BsdWdpbi10cmFuc2Zvcm0tcmVhY3QtanN4LXNvdXJjZSB0byBnZXQgYSBtb3JlIGRldGFpbGVkIGNvbXBvbmVudCBzdGFjay4gTm90ZSB0aGF0IHlvdSBzaG91bGQgbm90IGFkZCBpdCB0byBwcm9kdWN0aW9uIGJ1aWxkcyBvZiB5b3VyIEFwcCBmb3IgYnVuZGxlIHNpemUgcmVhc29ucy5cIikpLG4rXCJcXG5cIn0sXCJcIil9dmFyIGw9XCJmdW5jdGlvblwiPT10eXBlb2YgV2Vha01hcCx1PW4uQ29tcG9uZW50LnByb3RvdHlwZS5zZXRTdGF0ZTtuLkNvbXBvbmVudC5wcm90b3R5cGUuc2V0U3RhdGU9ZnVuY3Rpb24obixlKXtyZXR1cm4gbnVsbD09dGhpcy5fX3Y/bnVsbD09dGhpcy5zdGF0ZSYmY29uc29sZS53YXJuKCdDYWxsaW5nIFwidGhpcy5zZXRTdGF0ZVwiIGluc2lkZSB0aGUgY29uc3RydWN0b3Igb2YgYSBjb21wb25lbnQgaXMgYSBuby1vcCBhbmQgbWlnaHQgYmUgYSBidWcgaW4geW91ciBhcHBsaWNhdGlvbi4gSW5zdGVhZCwgc2V0IFwidGhpcy5zdGF0ZSA9IHt9XCIgZGlyZWN0bHkuXFxuXFxuJytjKGEoKSkpOm51bGw9PXRoaXMuX19QJiZjb25zb2xlLndhcm4oJ0NhblxcJ3QgY2FsbCBcInRoaXMuc2V0U3RhdGVcIiBvbiBhbiB1bm1vdW50ZWQgY29tcG9uZW50LiBUaGlzIGlzIGEgbm8tb3AsIGJ1dCBpdCBpbmRpY2F0ZXMgYSBtZW1vcnkgbGVhayBpbiB5b3VyIGFwcGxpY2F0aW9uLiBUbyBmaXgsIGNhbmNlbCBhbGwgc3Vic2NyaXB0aW9ucyBhbmQgYXN5bmNocm9ub3VzIHRhc2tzIGluIHRoZSBjb21wb25lbnRXaWxsVW5tb3VudCBtZXRob2QuXFxuXFxuJytjKHRoaXMuX192KSksdS5jYWxsKHRoaXMsbixlKX07dmFyIGY9bi5Db21wb25lbnQucHJvdG90eXBlLmZvcmNlVXBkYXRlO2Z1bmN0aW9uIHAobil7dmFyIGU9bi5wcm9wcyxvPXQobikscj1cIlwiO2Zvcih2YXIgYSBpbiBlKWlmKGUuaGFzT3duUHJvcGVydHkoYSkmJlwiY2hpbGRyZW5cIiE9PWEpe3ZhciBpPWVbYV07XCJmdW5jdGlvblwiPT10eXBlb2YgaSYmKGk9XCJmdW5jdGlvbiBcIisoaS5kaXNwbGF5TmFtZXx8aS5uYW1lKStcIigpIHt9XCIpLGk9T2JqZWN0KGkpIT09aXx8aS50b1N0cmluZz9pK1wiXCI6T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGkpLHIrPVwiIFwiK2ErXCI9XCIrSlNPTi5zdHJpbmdpZnkoaSl9dmFyIHM9ZS5jaGlsZHJlbjtyZXR1cm5cIjxcIitvK3IrKHMmJnMubGVuZ3RoP1wiPi4uPC9cIitvK1wiPlwiOlwiIC8+XCIpfW4uQ29tcG9uZW50LnByb3RvdHlwZS5mb3JjZVVwZGF0ZT1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09dGhpcy5fX3Y/Y29uc29sZS53YXJuKCdDYWxsaW5nIFwidGhpcy5mb3JjZVVwZGF0ZVwiIGluc2lkZSB0aGUgY29uc3RydWN0b3Igb2YgYSBjb21wb25lbnQgaXMgYSBuby1vcCBhbmQgbWlnaHQgYmUgYSBidWcgaW4geW91ciBhcHBsaWNhdGlvbi5cXG5cXG4nK2MoYSgpKSk6bnVsbD09dGhpcy5fX1AmJmNvbnNvbGUud2FybignQ2FuXFwndCBjYWxsIFwidGhpcy5mb3JjZVVwZGF0ZVwiIG9uIGFuIHVubW91bnRlZCBjb21wb25lbnQuIFRoaXMgaXMgYSBuby1vcCwgYnV0IGl0IGluZGljYXRlcyBhIG1lbW9yeSBsZWFrIGluIHlvdXIgYXBwbGljYXRpb24uIFRvIGZpeCwgY2FuY2VsIGFsbCBzdWJzY3JpcHRpb25zIGFuZCBhc3luY2hyb25vdXMgdGFza3MgaW4gdGhlIGNvbXBvbmVudFdpbGxVbm1vdW50IG1ldGhvZC5cXG5cXG4nK2ModGhpcy5fX3YpKSxmLmNhbGwodGhpcyxuKX0sZnVuY3Rpb24oKXshZnVuY3Rpb24oKXt2YXIgZT1uLm9wdGlvbnMuX19iLHQ9bi5vcHRpb25zLmRpZmZlZCxhPW4ub3B0aW9ucy5fXyxpPW4ub3B0aW9ucy52bm9kZSxjPW4ub3B0aW9ucy5fX3I7bi5vcHRpb25zLmRpZmZlZD1mdW5jdGlvbihuKXtzKG4pJiZyLnBvcCgpLG8ucG9wKCksdCYmdChuKX0sbi5vcHRpb25zLl9fYj1mdW5jdGlvbihuKXtzKG4pJiZvLnB1c2gobiksZSYmZShuKX0sbi5vcHRpb25zLl9fPWZ1bmN0aW9uKG4sZSl7cj1bXSxhJiZhKG4sZSl9LG4ub3B0aW9ucy52bm9kZT1mdW5jdGlvbihuKXtuLl9fbz1yLmxlbmd0aD4wP3Jbci5sZW5ndGgtMV06bnVsbCxpJiZpKG4pfSxuLm9wdGlvbnMuX19yPWZ1bmN0aW9uKG4pe3MobikmJnIucHVzaChuKSxjJiZjKG4pfX0oKTt2YXIgYT1uLm9wdGlvbnMuX19iLGk9bi5vcHRpb25zLmRpZmZlZCx1PW4ub3B0aW9ucy52bm9kZSxmPW4ub3B0aW9ucy5fX2UsZD1uLm9wdGlvbnMuX18saD1uLm9wdGlvbnMuX19oLHk9bD97dXNlRWZmZWN0Om5ldyBXZWFrTWFwLHVzZUxheW91dEVmZmVjdDpuZXcgV2Vha01hcCxsYXp5UHJvcFR5cGVzOm5ldyBXZWFrTWFwfTpudWxsO24ub3B0aW9ucy5fX2U9ZnVuY3Rpb24obixlLG8pe2lmKGUmJmUuX19jJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBuLnRoZW4pe3ZhciByPW47bj1uZXcgRXJyb3IoXCJNaXNzaW5nIFN1c3BlbnNlLiBUaGUgdGhyb3dpbmcgY29tcG9uZW50IHdhczogXCIrdChlKSk7Zm9yKHZhciBhPWU7YTthPWEuX18paWYoYS5fX2MmJmEuX19jLl9fYyl7bj1yO2JyZWFrfWlmKG4gaW5zdGFuY2VvZiBFcnJvcil0aHJvdyBufWYobixlLG8pfSxuLm9wdGlvbnMuX189ZnVuY3Rpb24obixlKXtpZighZSl0aHJvdyBuZXcgRXJyb3IoXCJVbmRlZmluZWQgcGFyZW50IHBhc3NlZCB0byByZW5kZXIoKSwgdGhpcyBpcyB0aGUgc2Vjb25kIGFyZ3VtZW50LlxcbkNoZWNrIGlmIHRoZSBlbGVtZW50IGlzIGF2YWlsYWJsZSBpbiB0aGUgRE9NL2hhcyB0aGUgY29ycmVjdCBpZC5cIik7dmFyIG87c3dpdGNoKGUubm9kZVR5cGUpe2Nhc2UgMTpjYXNlIDExOmNhc2UgOTpvPSEwO2JyZWFrO2RlZmF1bHQ6bz0hMX1pZighbyl7dmFyIHI9dChuKTt0aHJvdyBuZXcgRXJyb3IoXCJFeHBlY3RlZCBhIHZhbGlkIEhUTUwgbm9kZSBhcyBhIHNlY29uZCBhcmd1bWVudCB0byByZW5kZXIuXFx0UmVjZWl2ZWQgXCIrZStcIiBpbnN0ZWFkOiByZW5kZXIoPFwiK3IrXCIgLz4sIFwiK2UrXCIpO1wiKX1kJiZkKG4sZSl9LG4ub3B0aW9ucy5fX2I9ZnVuY3Rpb24obil7dmFyIG8scixpLHMsbD1uLnR5cGUsdT1mdW5jdGlvbiBuKGUpe3JldHVybiBlP1wiZnVuY3Rpb25cIj09dHlwZW9mIGUudHlwZT9uKGUuX18pOmU6e319KG4uX18pO2lmKHZvaWQgMD09PWwpdGhyb3cgbmV3IEVycm9yKFwiVW5kZWZpbmVkIGNvbXBvbmVudCBwYXNzZWQgdG8gY3JlYXRlRWxlbWVudCgpXFxuXFxuWW91IGxpa2VseSBmb3Jnb3QgdG8gZXhwb3J0IHlvdXIgY29tcG9uZW50IG9yIG1pZ2h0IGhhdmUgbWl4ZWQgdXAgZGVmYXVsdCBhbmQgbmFtZWQgaW1wb3J0c1wiK3AobikrXCJcXG5cXG5cIitjKG4pKTtpZihudWxsIT1sJiZcIm9iamVjdFwiPT10eXBlb2YgbCl7aWYodm9pZCAwIT09bC5fX2smJnZvaWQgMCE9PWwuX19lKXRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdHlwZSBwYXNzZWQgdG8gY3JlYXRlRWxlbWVudCgpOiBcIitsK1wiXFxuXFxuRGlkIHlvdSBhY2NpZGVudGFsbHkgcGFzcyBhIEpTWCBsaXRlcmFsIGFzIEpTWCB0d2ljZT9cXG5cXG4gIGxldCBNeVwiK3QobikrXCIgPSBcIitwKGwpK1wiO1xcbiAgbGV0IHZub2RlID0gPE15XCIrdChuKStcIiAvPjtcXG5cXG5UaGlzIHVzdWFsbHkgaGFwcGVucyB3aGVuIHlvdSBleHBvcnQgYSBKU1ggbGl0ZXJhbCBhbmQgbm90IHRoZSBjb21wb25lbnQuXFxuXFxuXCIrYyhuKSk7dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB0eXBlIHBhc3NlZCB0byBjcmVhdGVFbGVtZW50KCk6IFwiKyhBcnJheS5pc0FycmF5KGwpP1wiYXJyYXlcIjpsKSl9aWYoXCJ0aGVhZFwiIT09bCYmXCJ0Zm9vdFwiIT09bCYmXCJ0Ym9keVwiIT09bHx8XCJ0YWJsZVwiPT09dS50eXBlP1widHJcIj09PWwmJlwidGhlYWRcIiE9PXUudHlwZSYmXCJ0Zm9vdFwiIT09dS50eXBlJiZcInRib2R5XCIhPT11LnR5cGUmJlwidGFibGVcIiE9PXUudHlwZT9jb25zb2xlLmVycm9yKFwiSW1wcm9wZXIgbmVzdGluZyBvZiB0YWJsZS4gWW91ciA8dHI+IHNob3VsZCBoYXZlIGEgPHRoZWFkL3Rib2R5L3Rmb290L3RhYmxlPiBwYXJlbnQuXCIrcChuKStcIlxcblxcblwiK2MobikpOlwidGRcIj09PWwmJlwidHJcIiE9PXUudHlwZT9jb25zb2xlLmVycm9yKFwiSW1wcm9wZXIgbmVzdGluZyBvZiB0YWJsZS4gWW91ciA8dGQ+IHNob3VsZCBoYXZlIGEgPHRyPiBwYXJlbnQuXCIrcChuKStcIlxcblxcblwiK2MobikpOlwidGhcIj09PWwmJlwidHJcIiE9PXUudHlwZSYmY29uc29sZS5lcnJvcihcIkltcHJvcGVyIG5lc3Rpbmcgb2YgdGFibGUuIFlvdXIgPHRoPiBzaG91bGQgaGF2ZSBhIDx0cj4uXCIrcChuKStcIlxcblxcblwiK2MobikpOmNvbnNvbGUuZXJyb3IoXCJJbXByb3BlciBuZXN0aW5nIG9mIHRhYmxlLiBZb3VyIDx0aGVhZC90Ym9keS90Zm9vdD4gc2hvdWxkIGhhdmUgYSA8dGFibGU+IHBhcmVudC5cIitwKG4pK1wiXFxuXFxuXCIrYyhuKSksdm9pZCAwIT09bi5yZWYmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIG4ucmVmJiZcIm9iamVjdFwiIT10eXBlb2Ygbi5yZWYmJiEoXCIkJHR5cGVvZlwiaW4gbikpdGhyb3cgbmV3IEVycm9yKCdDb21wb25lbnRcXCdzIFwicmVmXCIgcHJvcGVydHkgc2hvdWxkIGJlIGEgZnVuY3Rpb24sIG9yIGFuIG9iamVjdCBjcmVhdGVkIGJ5IGNyZWF0ZVJlZigpLCBidXQgZ290IFsnK3R5cGVvZiBuLnJlZitcIl0gaW5zdGVhZFxcblwiK3AobikrXCJcXG5cXG5cIitjKG4pKTtpZihcInN0cmluZ1wiPT10eXBlb2Ygbi50eXBlKWZvcih2YXIgZiBpbiBuLnByb3BzKWlmKFwib1wiPT09ZlswXSYmXCJuXCI9PT1mWzFdJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiBuLnByb3BzW2ZdJiZudWxsIT1uLnByb3BzW2ZdKXRocm93IG5ldyBFcnJvcihcIkNvbXBvbmVudCdzIFxcXCJcIitmKydcIiBwcm9wZXJ0eSBzaG91bGQgYmUgYSBmdW5jdGlvbiwgYnV0IGdvdCBbJyt0eXBlb2Ygbi5wcm9wc1tmXStcIl0gaW5zdGVhZFxcblwiK3AobikrXCJcXG5cXG5cIitjKG4pKTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBuLnR5cGUmJm4udHlwZS5wcm9wVHlwZXMpe2lmKFwiTGF6eVwiPT09bi50eXBlLmRpc3BsYXlOYW1lJiZ5JiYheS5sYXp5UHJvcFR5cGVzLmhhcyhuLnR5cGUpKXt2YXIgZD1cIlByb3BUeXBlcyBhcmUgbm90IHN1cHBvcnRlZCBvbiBsYXp5KCkuIFVzZSBwcm9wVHlwZXMgb24gdGhlIHdyYXBwZWQgY29tcG9uZW50IGl0c2VsZi4gXCI7dHJ5e3ZhciBoPW4udHlwZSgpO3kubGF6eVByb3BUeXBlcy5zZXQobi50eXBlLCEwKSxjb25zb2xlLndhcm4oZCtcIkNvbXBvbmVudCB3cmFwcGVkIGluIGxhenkoKSBpcyBcIit0KGgpKX1jYXRjaChuKXtjb25zb2xlLndhcm4oZCtcIldlIHdpbGwgbG9nIHRoZSB3cmFwcGVkIGNvbXBvbmVudCdzIG5hbWUgb25jZSBpdCBpcyBsb2FkZWQuXCIpfX1vPW4udHlwZS5wcm9wVHlwZXMscj1uLnByb3BzLGk9dChuKSxzPXAobiksT2JqZWN0LmtleXMobykuZm9yRWFjaChmdW5jdGlvbihuKXt2YXIgdDt0cnl7dD1vW25dKHIsbixzLGksbnVsbCxcIlNFQ1JFVF9ET19OT1RfUEFTU19USElTX09SX1lPVV9XSUxMX0JFX0ZJUkVEXCIpfWNhdGNoKG4pe3Q9bn0hdHx8dC5tZXNzYWdlIGluIGV8fChlW3QubWVzc2FnZV09ITAsY29uc29sZS5lcnJvcihcIkZhaWxlZCBcIitpK1wiIHR5cGU6IFwiK3QubWVzc2FnZSkpfSl9YSYmYShuKX0sbi5vcHRpb25zLl9faD1mdW5jdGlvbihuKXtpZighbil0aHJvdyBuZXcgRXJyb3IoXCJIb29rIGNhbiBvbmx5IGJlIGludm9rZWQgZnJvbSByZW5kZXIgbWV0aG9kcy5cIik7aCYmaChuKX07dmFyIHY9ZnVuY3Rpb24obixlKXtyZXR1cm57Z2V0OmZ1bmN0aW9uKCl7dGhyb3cgbmV3IEVycm9yKFwiZ2V0dGluZyB2bm9kZS5cIituK1wiIGlzIGRlcHJlY2F0ZWQsIFwiK2UpfSxzZXQ6ZnVuY3Rpb24oKXt0aHJvdyBuZXcgRXJyb3IoXCJzZXR0aW5nIHZub2RlLlwiK24rXCIgaXMgbm90IGFsbG93ZWQsIFwiK2UpfX19LG09e25vZGVOYW1lOnYoXCJub2RlTmFtZVwiLFwidXNlIHZub2RlLnR5cGVcIiksYXR0cmlidXRlczp2KFwiYXR0cmlidXRlc1wiLFwidXNlIHZub2RlLnByb3BzXCIpLGNoaWxkcmVuOnYoXCJjaGlsZHJlblwiLFwidXNlIHZub2RlLnByb3BzLmNoaWxkcmVuXCIpfSxiPU9iamVjdC5jcmVhdGUoe30sbSk7bi5vcHRpb25zLnZub2RlPWZ1bmN0aW9uKG4pe3ZhciBlPW4ucHJvcHM7aWYobnVsbCE9PW4udHlwZSYmbnVsbCE9ZSYmKFwiX19zb3VyY2VcImluIGV8fFwiX19zZWxmXCJpbiBlKSl7dmFyIHQ9bi5wcm9wcz17fTtmb3IodmFyIG8gaW4gZSl7dmFyIHI9ZVtvXTtcIl9fc291cmNlXCI9PT1vP24uX19zb3VyY2U9cjpcIl9fc2VsZlwiPT09bz9uLl9fc2VsZj1yOnRbb109cn19T2JqZWN0LnNldFByb3RvdHlwZU9mKG4sYiksdSYmdShuKX0sbi5vcHRpb25zLmRpZmZlZD1mdW5jdGlvbihuKXtuLl9fayYmbi5fX2suZm9yRWFjaChmdW5jdGlvbihuKXtpZihuJiZ2b2lkIDA9PT1uLnR5cGUpe2RlbGV0ZSBuLl9fLGRlbGV0ZSBuLl9fYjt2YXIgZT1PYmplY3Qua2V5cyhuKS5qb2luKFwiLFwiKTt0aHJvdyBuZXcgRXJyb3IoXCJPYmplY3RzIGFyZSBub3QgdmFsaWQgYXMgYSBjaGlsZC4gRW5jb3VudGVyZWQgYW4gb2JqZWN0IHdpdGggdGhlIGtleXMge1wiK2UrXCJ9LlwiKX19KTt2YXIgZT1uLl9fYztpZihlJiZlLl9fSCl7dmFyIG89ZS5fX0g7QXJyYXkuaXNBcnJheShvLl9fKSYmby5fXy5mb3JFYWNoKGZ1bmN0aW9uKGUpe2lmKGUuX19oJiYoIWUuX19IfHwhQXJyYXkuaXNBcnJheShlLl9fSCkpKXt2YXIgbz10KG4pO2NvbnNvbGUud2FybihcIkluIFwiK28rXCIgeW91IGFyZSBjYWxsaW5nIHVzZU1lbW8vdXNlQ2FsbGJhY2sgd2l0aG91dCBwYXNzaW5nIGFyZ3VtZW50cy5cXG5UaGlzIGlzIGEgbm9vcCBzaW5jZSBpdCB3aWxsIG5vdCBiZSBhYmxlIHRvIG1lbW9pemUsIGl0IHdpbGwgZXhlY3V0ZSBpdCBldmVyeSByZW5kZXIuXFxuXFxuXCIrYyhuKSl9fSl9aWYoaSYmaShuKSxudWxsIT1uLl9faylmb3IodmFyIHI9W10sYT0wO2E8bi5fX2subGVuZ3RoO2ErKyl7dmFyIHM9bi5fX2tbYV07aWYocyYmbnVsbCE9cy5rZXkpe3ZhciBsPXMua2V5O2lmKC0xIT09ci5pbmRleE9mKGwpKXtjb25zb2xlLmVycm9yKCdGb2xsb3dpbmcgY29tcG9uZW50IGhhcyB0d28gb3IgbW9yZSBjaGlsZHJlbiB3aXRoIHRoZSBzYW1lIGtleSBhdHRyaWJ1dGU6IFwiJytsKydcIi4gVGhpcyBtYXkgY2F1c2UgZ2xpdGNoZXMgYW5kIG1pc2JlaGF2aW9yIGluIHJlbmRlcmluZyBwcm9jZXNzLiBDb21wb25lbnQ6IFxcblxcbicrcChuKStcIlxcblxcblwiK2MobikpO2JyZWFrfXIucHVzaChsKX19fX0oKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRlYnVnLmpzLm1hcFxuIiwidmFyIGU9cmVxdWlyZShcInByZWFjdFwiKTtcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiZ3aW5kb3cuX19QUkVBQ1RfREVWVE9PTFNfXyYmd2luZG93Ll9fUFJFQUNUX0RFVlRPT0xTX18uYXR0YWNoUHJlYWN0KFwiMTAuMC41XCIsZS5vcHRpb25zLHtGcmFnbWVudDplLkZyYWdtZW50fSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZXZ0b29scy5qcy5tYXBcbiIsInZhciBuLGwsdSx0LGksbyxyLGY9e30sZT1bXSxjPS9hY2l0fGV4KD86c3xnfG58cHwkKXxycGh8Z3JpZHxvd3N8bW5jfG50d3xpbmVbY2hdfHpvb3xeb3JkL2k7ZnVuY3Rpb24gcyhuLGwpe2Zvcih2YXIgdSBpbiBsKW5bdV09bFt1XTtyZXR1cm4gbn1mdW5jdGlvbiBhKG4pe3ZhciBsPW4ucGFyZW50Tm9kZTtsJiZsLnJlbW92ZUNoaWxkKG4pfWZ1bmN0aW9uIHAobixsLHUpe3ZhciB0LGk9YXJndW1lbnRzLG89e307Zm9yKHQgaW4gbClcImtleVwiIT09dCYmXCJyZWZcIiE9PXQmJihvW3RdPWxbdF0pO2lmKGFyZ3VtZW50cy5sZW5ndGg+Mylmb3IodT1bdV0sdD0zO3Q8YXJndW1lbnRzLmxlbmd0aDt0KyspdS5wdXNoKGlbdF0pO2lmKG51bGwhPXUmJihvLmNoaWxkcmVuPXUpLFwiZnVuY3Rpb25cIj09dHlwZW9mIG4mJm51bGwhPW4uZGVmYXVsdFByb3BzKWZvcih0IGluIG4uZGVmYXVsdFByb3BzKXZvaWQgMD09PW9bdF0mJihvW3RdPW4uZGVmYXVsdFByb3BzW3RdKTtyZXR1cm4gdihuLG8sbCYmbC5rZXksbCYmbC5yZWYpfWZ1bmN0aW9uIHYobCx1LHQsaSl7dmFyIG89e3R5cGU6bCxwcm9wczp1LGtleTp0LHJlZjppLF9fazpudWxsLF9fOm51bGwsX19iOjAsX19lOm51bGwsX19kOnZvaWQgMCxfX2M6bnVsbCxjb25zdHJ1Y3Rvcjp2b2lkIDB9O3JldHVybiBuLnZub2RlJiZuLnZub2RlKG8pLG99ZnVuY3Rpb24gaChuKXtyZXR1cm4gbi5jaGlsZHJlbn1mdW5jdGlvbiBkKG4sbCl7dGhpcy5wcm9wcz1uLHRoaXMuY29udGV4dD1sfWZ1bmN0aW9uIHkobixsKXtpZihudWxsPT1sKXJldHVybiBuLl9fP3kobi5fXyxuLl9fLl9fay5pbmRleE9mKG4pKzEpOm51bGw7Zm9yKHZhciB1O2w8bi5fX2subGVuZ3RoO2wrKylpZihudWxsIT0odT1uLl9fa1tsXSkmJm51bGwhPXUuX19lKXJldHVybiB1Ll9fZTtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBuLnR5cGU/eShuKTpudWxsfWZ1bmN0aW9uIHgobil7dmFyIGwsdTtpZihudWxsIT0obj1uLl9fKSYmbnVsbCE9bi5fX2Mpe2ZvcihuLl9fZT1uLl9fYy5iYXNlPW51bGwsbD0wO2w8bi5fX2subGVuZ3RoO2wrKylpZihudWxsIT0odT1uLl9fa1tsXSkmJm51bGwhPXUuX19lKXtuLl9fZT1uLl9fYy5iYXNlPXUuX19lO2JyZWFrfXJldHVybiB4KG4pfX1mdW5jdGlvbiBtKGwpeyghbC5fX2QmJihsLl9fZD0hMCkmJjE9PT11LnB1c2gobCl8fGkhPT1uLmRlYm91bmNlUmVuZGVyaW5nKSYmKChpPW4uZGVib3VuY2VSZW5kZXJpbmcpfHx0KSh3KX1mdW5jdGlvbiB3KCl7dmFyIG4sbCx0LGksbyxyLGY7Zm9yKHUuc29ydChmdW5jdGlvbihuLGwpe3JldHVybiBsLl9fdi5fX2Itbi5fX3YuX19ifSk7bj11LnBvcCgpOyluLl9fZCYmKHQ9dm9pZCAwLGk9dm9pZCAwLHI9KG89KGw9bikuX192KS5fX2UsKGY9bC5fX1ApJiYodD1bXSxpPU4oZixvLHMoe30sbyksbC5fX24sdm9pZCAwIT09Zi5vd25lclNWR0VsZW1lbnQsbnVsbCx0LG51bGw9PXI/eShvKTpyKSx6KHQsbyksaSE9ciYmeChvKSkpfWZ1bmN0aW9uIGcobixsLHUsdCxpLG8scixjLHMpe3ZhciBwLHYsaCxkLHgsbSx3LGc9dSYmdS5fX2t8fGUsXz1nLmxlbmd0aDtpZihjPT1mJiYoYz1udWxsIT1vP29bMF06Xz95KHUsMCk6bnVsbCkscD0wLGwuX19rPWsobC5fX2ssZnVuY3Rpb24odSl7aWYobnVsbCE9dSl7aWYodS5fXz1sLHUuX19iPWwuX19iKzEsbnVsbD09PShoPWdbcF0pfHxoJiZ1LmtleT09aC5rZXkmJnUudHlwZT09PWgudHlwZSlnW3BdPXZvaWQgMDtlbHNlIGZvcih2PTA7djxfO3YrKyl7aWYoKGg9Z1t2XSkmJnUua2V5PT1oLmtleSYmdS50eXBlPT09aC50eXBlKXtnW3ZdPXZvaWQgMDticmVha31oPW51bGx9aWYoZD1OKG4sdSxoPWh8fGYsdCxpLG8scixjLHMpLCh2PXUucmVmKSYmaC5yZWYhPXYmJih3fHwodz1bXSksaC5yZWYmJncucHVzaChoLnJlZixudWxsLHUpLHcucHVzaCh2LHUuX19jfHxkLHUpKSxudWxsIT1kKXt2YXIgZTtpZihudWxsPT1tJiYobT1kKSx2b2lkIDAhPT11Ll9fZCllPXUuX19kLHUuX19kPXZvaWQgMDtlbHNlIGlmKG89PWh8fGQhPWN8fG51bGw9PWQucGFyZW50Tm9kZSl7bjppZihudWxsPT1jfHxjLnBhcmVudE5vZGUhPT1uKW4uYXBwZW5kQ2hpbGQoZCksZT1udWxsO2Vsc2V7Zm9yKHg9Yyx2PTA7KHg9eC5uZXh0U2libGluZykmJnY8Xzt2Kz0yKWlmKHg9PWQpYnJlYWsgbjtuLmluc2VydEJlZm9yZShkLGMpLGU9Y31cIm9wdGlvblwiPT1sLnR5cGUmJihuLnZhbHVlPVwiXCIpfWM9dm9pZCAwIT09ZT9lOmQubmV4dFNpYmxpbmcsXCJmdW5jdGlvblwiPT10eXBlb2YgbC50eXBlJiYobC5fX2Q9Yyl9ZWxzZSBjJiZoLl9fZT09YyYmYy5wYXJlbnROb2RlIT1uJiYoYz15KGgpKX1yZXR1cm4gcCsrLHV9KSxsLl9fZT1tLG51bGwhPW8mJlwiZnVuY3Rpb25cIiE9dHlwZW9mIGwudHlwZSlmb3IocD1vLmxlbmd0aDtwLS07KW51bGwhPW9bcF0mJmEob1twXSk7Zm9yKHA9XztwLS07KW51bGwhPWdbcF0mJiQoZ1twXSxnW3BdKTtpZih3KWZvcihwPTA7cDx3Lmxlbmd0aDtwKyspVCh3W3BdLHdbKytwXSx3WysrcF0pfWZ1bmN0aW9uIGsobixsLHUpe2lmKG51bGw9PXUmJih1PVtdKSxudWxsPT1ufHxcImJvb2xlYW5cIj09dHlwZW9mIG4pbCYmdS5wdXNoKGwobnVsbCkpO2Vsc2UgaWYoQXJyYXkuaXNBcnJheShuKSlmb3IodmFyIHQ9MDt0PG4ubGVuZ3RoO3QrKylrKG5bdF0sbCx1KTtlbHNlIHUucHVzaChsP2woXCJzdHJpbmdcIj09dHlwZW9mIG58fFwibnVtYmVyXCI9PXR5cGVvZiBuP3YobnVsbCxuLG51bGwsbnVsbCk6bnVsbCE9bi5fX2V8fG51bGwhPW4uX19jP3Yobi50eXBlLG4ucHJvcHMsbi5rZXksbnVsbCk6bik6bik7cmV0dXJuIHV9ZnVuY3Rpb24gXyhuLGwsdSx0LGkpe3ZhciBvO2ZvcihvIGluIHUpbyBpbiBsfHxQKG4sbyxudWxsLHVbb10sdCk7Zm9yKG8gaW4gbClpJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiBsW29dfHxcInZhbHVlXCI9PT1vfHxcImNoZWNrZWRcIj09PW98fHVbb109PT1sW29dfHxQKG4sbyxsW29dLHVbb10sdCl9ZnVuY3Rpb24gYihuLGwsdSl7XCItXCI9PT1sWzBdP24uc2V0UHJvcGVydHkobCx1KTpuW2xdPVwibnVtYmVyXCI9PXR5cGVvZiB1JiYhMT09PWMudGVzdChsKT91K1wicHhcIjpudWxsPT11P1wiXCI6dX1mdW5jdGlvbiBQKG4sbCx1LHQsaSl7dmFyIG8scixmLGUsYztpZihpP1wiY2xhc3NOYW1lXCI9PT1sJiYobD1cImNsYXNzXCIpOlwiY2xhc3NcIj09PWwmJihsPVwiY2xhc3NOYW1lXCIpLFwia2V5XCI9PT1sfHxcImNoaWxkcmVuXCI9PT1sKTtlbHNlIGlmKFwic3R5bGVcIj09PWwpaWYobz1uLnN0eWxlLFwic3RyaW5nXCI9PXR5cGVvZiB1KW8uY3NzVGV4dD11O2Vsc2V7aWYoXCJzdHJpbmdcIj09dHlwZW9mIHQmJihvLmNzc1RleHQ9XCJcIix0PW51bGwpLHQpZm9yKHIgaW4gdCl1JiZyIGluIHV8fGIobyxyLFwiXCIpO2lmKHUpZm9yKGYgaW4gdSl0JiZ1W2ZdPT09dFtmXXx8YihvLGYsdVtmXSl9ZWxzZVwib1wiPT09bFswXSYmXCJuXCI9PT1sWzFdPyhlPWwhPT0obD1sLnJlcGxhY2UoL0NhcHR1cmUkLyxcIlwiKSksYz1sLnRvTG93ZXJDYXNlKCksbD0oYyBpbiBuP2M6bCkuc2xpY2UoMiksdT8odHx8bi5hZGRFdmVudExpc3RlbmVyKGwsQyxlKSwobi5sfHwobi5sPXt9KSlbbF09dSk6bi5yZW1vdmVFdmVudExpc3RlbmVyKGwsQyxlKSk6XCJsaXN0XCIhPT1sJiZcInRhZ05hbWVcIiE9PWwmJlwiZm9ybVwiIT09bCYmXCJ0eXBlXCIhPT1sJiZcInNpemVcIiE9PWwmJiFpJiZsIGluIG4/bltsXT1udWxsPT11P1wiXCI6dTpcImZ1bmN0aW9uXCIhPXR5cGVvZiB1JiZcImRhbmdlcm91c2x5U2V0SW5uZXJIVE1MXCIhPT1sJiYobCE9PShsPWwucmVwbGFjZSgvXnhsaW5rOj8vLFwiXCIpKT9udWxsPT11fHwhMT09PXU/bi5yZW1vdmVBdHRyaWJ1dGVOUyhcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIixsLnRvTG93ZXJDYXNlKCkpOm4uc2V0QXR0cmlidXRlTlMoXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIsbC50b0xvd2VyQ2FzZSgpLHUpOm51bGw9PXV8fCExPT09dSYmIS9eYXIvLnRlc3QobCk/bi5yZW1vdmVBdHRyaWJ1dGUobCk6bi5zZXRBdHRyaWJ1dGUobCx1KSl9ZnVuY3Rpb24gQyhsKXt0aGlzLmxbbC50eXBlXShuLmV2ZW50P24uZXZlbnQobCk6bCl9ZnVuY3Rpb24gTihsLHUsdCxpLG8scixmLGUsYyl7dmFyIGEscCx2LHkseCxtLHcsayxfLGIsUD11LnR5cGU7aWYodm9pZCAwIT09dS5jb25zdHJ1Y3RvcilyZXR1cm4gbnVsbDsoYT1uLl9fYikmJmEodSk7dHJ5e246aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgUCl7aWYoaz11LnByb3BzLF89KGE9UC5jb250ZXh0VHlwZSkmJmlbYS5fX2NdLGI9YT9fP18ucHJvcHMudmFsdWU6YS5fXzppLHQuX19jP3c9KHA9dS5fX2M9dC5fX2MpLl9fPXAuX19FOihcInByb3RvdHlwZVwiaW4gUCYmUC5wcm90b3R5cGUucmVuZGVyP3UuX19jPXA9bmV3IFAoayxiKToodS5fX2M9cD1uZXcgZChrLGIpLHAuY29uc3RydWN0b3I9UCxwLnJlbmRlcj1qKSxfJiZfLnN1YihwKSxwLnByb3BzPWsscC5zdGF0ZXx8KHAuc3RhdGU9e30pLHAuY29udGV4dD1iLHAuX19uPWksdj1wLl9fZD0hMCxwLl9faD1bXSksbnVsbD09cC5fX3MmJihwLl9fcz1wLnN0YXRlKSxudWxsIT1QLmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyYmKHAuX19zPT1wLnN0YXRlJiYocC5fX3M9cyh7fSxwLl9fcykpLHMocC5fX3MsUC5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMoayxwLl9fcykpKSx5PXAucHJvcHMseD1wLnN0YXRlLHYpbnVsbD09UC5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMmJm51bGwhPXAuY29tcG9uZW50V2lsbE1vdW50JiZwLmNvbXBvbmVudFdpbGxNb3VudCgpLG51bGwhPXAuY29tcG9uZW50RGlkTW91bnQmJnAuX19oLnB1c2gocC5jb21wb25lbnREaWRNb3VudCk7ZWxzZXtpZihudWxsPT1QLmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyYmayE9PXkmJm51bGwhPXAuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyYmcC5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKGssYiksIXAuX19lJiZudWxsIT1wLnNob3VsZENvbXBvbmVudFVwZGF0ZSYmITE9PT1wLnNob3VsZENvbXBvbmVudFVwZGF0ZShrLHAuX19zLGIpKXtmb3IocC5wcm9wcz1rLHAuc3RhdGU9cC5fX3MscC5fX2Q9ITEscC5fX3Y9dSx1Ll9fZT10Ll9fZSx1Ll9faz10Ll9fayxwLl9faC5sZW5ndGgmJmYucHVzaChwKSxhPTA7YTx1Ll9fay5sZW5ndGg7YSsrKXUuX19rW2FdJiYodS5fX2tbYV0uX189dSk7YnJlYWsgbn1udWxsIT1wLmNvbXBvbmVudFdpbGxVcGRhdGUmJnAuY29tcG9uZW50V2lsbFVwZGF0ZShrLHAuX19zLGIpLG51bGwhPXAuY29tcG9uZW50RGlkVXBkYXRlJiZwLl9faC5wdXNoKGZ1bmN0aW9uKCl7cC5jb21wb25lbnREaWRVcGRhdGUoeSx4LG0pfSl9cC5jb250ZXh0PWIscC5wcm9wcz1rLHAuc3RhdGU9cC5fX3MsKGE9bi5fX3IpJiZhKHUpLHAuX19kPSExLHAuX192PXUscC5fX1A9bCxhPXAucmVuZGVyKHAucHJvcHMscC5zdGF0ZSxwLmNvbnRleHQpLHUuX19rPW51bGwhPWEmJmEudHlwZT09aCYmbnVsbD09YS5rZXk/YS5wcm9wcy5jaGlsZHJlbjpBcnJheS5pc0FycmF5KGEpP2E6W2FdLG51bGwhPXAuZ2V0Q2hpbGRDb250ZXh0JiYoaT1zKHMoe30saSkscC5nZXRDaGlsZENvbnRleHQoKSkpLHZ8fG51bGw9PXAuZ2V0U25hcHNob3RCZWZvcmVVcGRhdGV8fChtPXAuZ2V0U25hcHNob3RCZWZvcmVVcGRhdGUoeSx4KSksZyhsLHUsdCxpLG8scixmLGUsYykscC5iYXNlPXUuX19lLHAuX19oLmxlbmd0aCYmZi5wdXNoKHApLHcmJihwLl9fRT1wLl9fPW51bGwpLHAuX19lPSExfWVsc2UgdS5fX2U9QSh0Ll9fZSx1LHQsaSxvLHIsZixjKTsoYT1uLmRpZmZlZCkmJmEodSl9Y2F0Y2gobCl7bi5fX2UobCx1LHQpfXJldHVybiB1Ll9fZX1mdW5jdGlvbiB6KGwsdSl7bi5fX2MmJm4uX19jKHUsbCksbC5zb21lKGZ1bmN0aW9uKHUpe3RyeXtsPXUuX19oLHUuX19oPVtdLGwuc29tZShmdW5jdGlvbihuKXtuLmNhbGwodSl9KX1jYXRjaChsKXtuLl9fZShsLHUuX192KX19KX1mdW5jdGlvbiBBKG4sbCx1LHQsaSxvLHIsYyl7dmFyIHMsYSxwLHYsaCxkPXUucHJvcHMseT1sLnByb3BzO2lmKGk9XCJzdmdcIj09PWwudHlwZXx8aSxudWxsIT1vKWZvcihzPTA7czxvLmxlbmd0aDtzKyspaWYobnVsbCE9KGE9b1tzXSkmJigobnVsbD09PWwudHlwZT8zPT09YS5ub2RlVHlwZTphLmxvY2FsTmFtZT09PWwudHlwZSl8fG49PWEpKXtuPWEsb1tzXT1udWxsO2JyZWFrfWlmKG51bGw9PW4pe2lmKG51bGw9PT1sLnR5cGUpcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHkpO249aT9kb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLGwudHlwZSk6ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChsLnR5cGUseS5pcyYme2lzOnkuaXN9KSxvPW51bGx9aWYobnVsbD09PWwudHlwZSlkIT09eSYmbi5kYXRhIT15JiYobi5kYXRhPXkpO2Vsc2UgaWYobCE9PXUpe2lmKG51bGwhPW8mJihvPWUuc2xpY2UuY2FsbChuLmNoaWxkTm9kZXMpKSxwPShkPXUucHJvcHN8fGYpLmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MLHY9eS5kYW5nZXJvdXNseVNldElubmVySFRNTCwhYyl7aWYoZD09PWYpZm9yKGQ9e30saD0wO2g8bi5hdHRyaWJ1dGVzLmxlbmd0aDtoKyspZFtuLmF0dHJpYnV0ZXNbaF0ubmFtZV09bi5hdHRyaWJ1dGVzW2hdLnZhbHVlOyh2fHxwKSYmKHYmJnAmJnYuX19odG1sPT1wLl9faHRtbHx8KG4uaW5uZXJIVE1MPXYmJnYuX19odG1sfHxcIlwiKSl9XyhuLHksZCxpLGMpLGwuX19rPWwucHJvcHMuY2hpbGRyZW4sdnx8ZyhuLGwsdSx0LFwiZm9yZWlnbk9iamVjdFwiIT09bC50eXBlJiZpLG8scixmLGMpLGN8fChcInZhbHVlXCJpbiB5JiZ2b2lkIDAhPT15LnZhbHVlJiZ5LnZhbHVlIT09bi52YWx1ZSYmKG4udmFsdWU9bnVsbD09eS52YWx1ZT9cIlwiOnkudmFsdWUpLFwiY2hlY2tlZFwiaW4geSYmdm9pZCAwIT09eS5jaGVja2VkJiZ5LmNoZWNrZWQhPT1uLmNoZWNrZWQmJihuLmNoZWNrZWQ9eS5jaGVja2VkKSl9cmV0dXJuIG59ZnVuY3Rpb24gVChsLHUsdCl7dHJ5e1wiZnVuY3Rpb25cIj09dHlwZW9mIGw/bCh1KTpsLmN1cnJlbnQ9dX1jYXRjaChsKXtuLl9fZShsLHQpfX1mdW5jdGlvbiAkKGwsdSx0KXt2YXIgaSxvLHI7aWYobi51bm1vdW50JiZuLnVubW91bnQobCksKGk9bC5yZWYpJiYoaS5jdXJyZW50JiZpLmN1cnJlbnQhPT1sLl9fZXx8VChpLG51bGwsdSkpLHR8fFwiZnVuY3Rpb25cIj09dHlwZW9mIGwudHlwZXx8KHQ9bnVsbCE9KG89bC5fX2UpKSxsLl9fZT1sLl9fZD12b2lkIDAsbnVsbCE9KGk9bC5fX2MpKXtpZihpLmNvbXBvbmVudFdpbGxVbm1vdW50KXRyeXtpLmNvbXBvbmVudFdpbGxVbm1vdW50KCl9Y2F0Y2gobCl7bi5fX2UobCx1KX1pLmJhc2U9aS5fX1A9bnVsbH1pZihpPWwuX19rKWZvcihyPTA7cjxpLmxlbmd0aDtyKyspaVtyXSYmJChpW3JdLHUsdCk7bnVsbCE9byYmYShvKX1mdW5jdGlvbiBqKG4sbCx1KXtyZXR1cm4gdGhpcy5jb25zdHJ1Y3RvcihuLHUpfWZ1bmN0aW9uIEQobCx1LHQpe3ZhciBpLHIsYztuLl9fJiZuLl9fKGwsdSkscj0oaT10PT09byk/bnVsbDp0JiZ0Ll9fa3x8dS5fX2ssbD1wKGgsbnVsbCxbbF0pLGM9W10sTih1LChpP3U6dHx8dSkuX19rPWwscnx8ZixmLHZvaWQgMCE9PXUub3duZXJTVkdFbGVtZW50LHQmJiFpP1t0XTpyP251bGw6ZS5zbGljZS5jYWxsKHUuY2hpbGROb2RlcyksYyx0fHxmLGkpLHooYyxsKX1uPXtfX2U6ZnVuY3Rpb24obixsKXtmb3IodmFyIHUsdDtsPWwuX187KWlmKCh1PWwuX19jKSYmIXUuX18pdHJ5e2lmKHUuY29uc3RydWN0b3ImJm51bGwhPXUuY29uc3RydWN0b3IuZ2V0RGVyaXZlZFN0YXRlRnJvbUVycm9yJiYodD0hMCx1LnNldFN0YXRlKHUuY29uc3RydWN0b3IuZ2V0RGVyaXZlZFN0YXRlRnJvbUVycm9yKG4pKSksbnVsbCE9dS5jb21wb25lbnREaWRDYXRjaCYmKHQ9ITAsdS5jb21wb25lbnREaWRDYXRjaChuKSksdClyZXR1cm4gbSh1Ll9fRT11KX1jYXRjaChsKXtuPWx9dGhyb3cgbn19LGw9ZnVuY3Rpb24obil7cmV0dXJuIG51bGwhPW4mJnZvaWQgMD09PW4uY29uc3RydWN0b3J9LGQucHJvdG90eXBlLnNldFN0YXRlPWZ1bmN0aW9uKG4sbCl7dmFyIHU7dT10aGlzLl9fcyE9PXRoaXMuc3RhdGU/dGhpcy5fX3M6dGhpcy5fX3M9cyh7fSx0aGlzLnN0YXRlKSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBuJiYobj1uKHUsdGhpcy5wcm9wcykpLG4mJnModSxuKSxudWxsIT1uJiZ0aGlzLl9fdiYmKGwmJnRoaXMuX19oLnB1c2gobCksbSh0aGlzKSl9LGQucHJvdG90eXBlLmZvcmNlVXBkYXRlPWZ1bmN0aW9uKG4pe3RoaXMuX192JiYodGhpcy5fX2U9ITAsbiYmdGhpcy5fX2gucHVzaChuKSxtKHRoaXMpKX0sZC5wcm90b3R5cGUucmVuZGVyPWgsdT1bXSx0PVwiZnVuY3Rpb25cIj09dHlwZW9mIFByb21pc2U/UHJvbWlzZS5wcm90b3R5cGUudGhlbi5iaW5kKFByb21pc2UucmVzb2x2ZSgpKTpzZXRUaW1lb3V0LG89ZixyPTAsZXhwb3J0cy5yZW5kZXI9RCxleHBvcnRzLmh5ZHJhdGU9ZnVuY3Rpb24obixsKXtEKG4sbCxvKX0sZXhwb3J0cy5jcmVhdGVFbGVtZW50PXAsZXhwb3J0cy5oPXAsZXhwb3J0cy5GcmFnbWVudD1oLGV4cG9ydHMuY3JlYXRlUmVmPWZ1bmN0aW9uKCl7cmV0dXJue319LGV4cG9ydHMuaXNWYWxpZEVsZW1lbnQ9bCxleHBvcnRzLkNvbXBvbmVudD1kLGV4cG9ydHMuY2xvbmVFbGVtZW50PWZ1bmN0aW9uKG4sbCl7cmV0dXJuIGw9cyhzKHt9LG4ucHJvcHMpLGwpLGFyZ3VtZW50cy5sZW5ndGg+MiYmKGwuY2hpbGRyZW49ZS5zbGljZS5jYWxsKGFyZ3VtZW50cywyKSksdihuLnR5cGUsbCxsLmtleXx8bi5rZXksbC5yZWZ8fG4ucmVmKX0sZXhwb3J0cy5jcmVhdGVDb250ZXh0PWZ1bmN0aW9uKG4pe3ZhciBsPXt9LHU9e19fYzpcIl9fY0NcIityKyssX186bixDb25zdW1lcjpmdW5jdGlvbihuLGwpe3JldHVybiBuLmNoaWxkcmVuKGwpfSxQcm92aWRlcjpmdW5jdGlvbihuKXt2YXIgdCxpPXRoaXM7cmV0dXJuIHRoaXMuZ2V0Q2hpbGRDb250ZXh0fHwodD1bXSx0aGlzLmdldENoaWxkQ29udGV4dD1mdW5jdGlvbigpe3JldHVybiBsW3UuX19jXT1pLGx9LHRoaXMuc2hvdWxkQ29tcG9uZW50VXBkYXRlPWZ1bmN0aW9uKGwpe24udmFsdWUhPT1sLnZhbHVlJiZ0LnNvbWUoZnVuY3Rpb24obil7bi5jb250ZXh0PWwudmFsdWUsbShuKX0pfSx0aGlzLnN1Yj1mdW5jdGlvbihuKXt0LnB1c2gobik7dmFyIGw9bi5jb21wb25lbnRXaWxsVW5tb3VudDtuLmNvbXBvbmVudFdpbGxVbm1vdW50PWZ1bmN0aW9uKCl7dC5zcGxpY2UodC5pbmRleE9mKG4pLDEpLGwmJmwuY2FsbChuKX19KSxuLmNoaWxkcmVufX07cmV0dXJuIHUuQ29uc3VtZXIuY29udGV4dFR5cGU9dSx1fSxleHBvcnRzLnRvQ2hpbGRBcnJheT1rLGV4cG9ydHMuX2U9JCxleHBvcnRzLm9wdGlvbnM9bjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByZWFjdC5qcy5tYXBcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxudmFyIHJ1bnRpbWUgPSAoZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCBhbmQgb3V0ZXJGbi5wcm90b3R5cGUgaXMgYSBHZW5lcmF0b3IsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3I7XG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKTtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcblxuICAgIC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgfVxuICBleHBvcnRzLndyYXAgPSB3cmFwO1xuXG4gIC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwibm9ybWFsXCIsIGFyZzogZm4uY2FsbChvYmosIGFyZykgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwidGhyb3dcIiwgYXJnOiBlcnIgfTtcbiAgICB9XG4gIH1cblxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7XG5cbiAgLy8gUmV0dXJuaW5nIHRoaXMgb2JqZWN0IGZyb20gdGhlIGlubmVyRm4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhc1xuICAvLyBicmVha2luZyBvdXQgb2YgdGhlIGRpc3BhdGNoIHN3aXRjaCBzdGF0ZW1lbnQuXG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307XG5cbiAgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kXG4gIC8vIC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgcHJvcGVydGllcyBmb3IgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIEdlbmVyYXRvclxuICAvLyBvYmplY3RzLiBGb3IgZnVsbCBzcGVjIGNvbXBsaWFuY2UsIHlvdSBtYXkgd2lzaCB0byBjb25maWd1cmUgeW91clxuICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLlxuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cblxuICAvLyBUaGlzIGlzIGEgcG9seWZpbGwgZm9yICVJdGVyYXRvclByb3RvdHlwZSUgZm9yIGVudmlyb25tZW50cyB0aGF0XG4gIC8vIGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgaXQuXG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICBJdGVyYXRvclByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJlxuICAgICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmXG4gICAgICBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHcC5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZVt0b1N0cmluZ1RhZ1N5bWJvbF0gPVxuICAgIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuXG4gIC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIHByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgaWYgKCEodG9TdHJpbmdUYWdTeW1ib2wgaW4gZ2VuRnVuKSkge1xuICAgICAgICBnZW5GdW5bdG9TdHJpbmdUYWdTeW1ib2xdID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuICAgICAgfVxuICAgIH1cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTtcblxuICAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIilgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLlxuICBleHBvcnRzLmF3cmFwID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHsgX19hd2FpdDogYXJnIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24odW53cmFwcGVkKSB7XG4gICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAvLyBjdXJyZW50IGl0ZXJhdGlvbi5cbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIC8vIElmIGEgcmVqZWN0ZWQgUHJvbWlzZSB3YXMgeWllbGRlZCwgdGhyb3cgdGhlIHJlamVjdGlvbiBiYWNrXG4gICAgICAgICAgLy8gaW50byB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIHNvIGl0IGNhbiBiZSBoYW5kbGVkIHRoZXJlLlxuICAgICAgICAgIHJldHVybiBpbnZva2UoXCJ0aHJvd1wiLCBlcnJvciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcblxuICAgIGZ1bmN0aW9uIGVucXVldWUobWV0aG9kLCBhcmcpIHtcbiAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihcbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgICAgICAvLyBBdm9pZCBwcm9wYWdhdGluZyBmYWlsdXJlcyB0byBQcm9taXNlcyByZXR1cm5lZCBieSBsYXRlclxuICAgICAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZ1xuICAgICAgICApIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuICBBc3luY0l0ZXJhdG9yLnByb3RvdHlwZVthc3luY0l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjtcblxuICAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgZXhwb3J0cy5hc3luYyA9IGZ1bmN0aW9uKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpXG4gICAgKTtcblxuICAgIHJldHVybiBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbilcbiAgICAgID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgIGNvbnRleHQuYXJnID0gYXJnO1xuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgIC8vIFNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGNvbnRleHQuYXJnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuXG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgLy8gSWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBmcm9tIGlubmVyRm4sIHdlIGxlYXZlIHN0YXRlID09PVxuICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICBzdGF0ZSA9IGNvbnRleHQuZG9uZVxuICAgICAgICAgICAgPyBHZW5TdGF0ZUNvbXBsZXRlZFxuICAgICAgICAgICAgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgLy8gY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZykgY2FsbCBhYm92ZS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gQ2FsbCBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF0oY29udGV4dC5hcmcpIGFuZCBoYW5kbGUgdGhlXG4gIC8vIHJlc3VsdCwgZWl0aGVyIGJ5IHJldHVybmluZyBhIHsgdmFsdWUsIGRvbmUgfSByZXN1bHQgZnJvbSB0aGVcbiAgLy8gZGVsZWdhdGUgaXRlcmF0b3IsIG9yIGJ5IG1vZGlmeWluZyBjb250ZXh0Lm1ldGhvZCBhbmQgY29udGV4dC5hcmcsXG4gIC8vIHNldHRpbmcgY29udGV4dC5kZWxlZ2F0ZSB0byBudWxsLCBhbmQgcmV0dXJuaW5nIHRoZSBDb250aW51ZVNlbnRpbmVsLlxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXTtcbiAgICBpZiAobWV0aG9kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIEEgLnRocm93IG9yIC5yZXR1cm4gd2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIC50aHJvd1xuICAgICAgLy8gbWV0aG9kIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAvLyBOb3RlOiBbXCJyZXR1cm5cIl0gbXVzdCBiZSB1c2VkIGZvciBFUzMgcGFyc2luZyBjb21wYXRpYmlsaXR5LlxuICAgICAgICBpZiAoZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAvLyBJZiBtYXliZUludm9rZURlbGVnYXRlKGNvbnRleHQpIGNoYW5nZWQgY29udGV4dC5tZXRob2QgZnJvbVxuICAgICAgICAgICAgLy8gXCJyZXR1cm5cIiB0byBcInRocm93XCIsIGxldCB0aGF0IG92ZXJyaWRlIHRoZSBUeXBlRXJyb3IgYmVsb3cuXG4gICAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcblxuICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuXG4gICAgaWYgKCEgaW5mbykge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKTtcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgLy8gQXNzaWduIHRoZSByZXN1bHQgb2YgdGhlIGZpbmlzaGVkIGRlbGVnYXRlIHRvIHRoZSB0ZW1wb3JhcnlcbiAgICAgIC8vIHZhcmlhYmxlIHNwZWNpZmllZCBieSBkZWxlZ2F0ZS5yZXN1bHROYW1lIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcblxuICAgICAgLy8gUmVzdW1lIGV4ZWN1dGlvbiBhdCB0aGUgZGVzaXJlZCBsb2NhdGlvbiAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYztcblxuICAgICAgLy8gSWYgY29udGV4dC5tZXRob2Qgd2FzIFwidGhyb3dcIiBidXQgdGhlIGRlbGVnYXRlIGhhbmRsZWQgdGhlXG4gICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmXG4gICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgLy8gXCJjb25zdW1lZFwiIGJ5IHRoZSBkZWxlZ2F0ZSBpdGVyYXRvci4gSWYgY29udGV4dC5tZXRob2Qgd2FzXG4gICAgICAvLyBcInJldHVyblwiLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZVxuICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kICE9PSBcInJldHVyblwiKSB7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cblxuICAgIC8vIFRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBpcyBmaW5pc2hlZCwgc28gZm9yZ2V0IGl0IGFuZCBjb250aW51ZSB3aXRoXG4gICAgLy8gdGhlIG91dGVyIGdlbmVyYXRvci5cbiAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgfVxuXG4gIC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcblxuICBHcFt0b1N0cmluZ1RhZ1N5bWJvbF0gPSBcIkdlbmVyYXRvclwiO1xuXG4gIC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgR3BbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhIGNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xuXG4gIC8vIFJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGVcbiAgLy8gb3Igbm90LCByZXR1cm4gdGhlIHJ1bnRpbWUgb2JqZWN0IHNvIHRoYXQgd2UgY2FuIGRlY2xhcmUgdGhlIHZhcmlhYmxlXG4gIC8vIHJlZ2VuZXJhdG9yUnVudGltZSBpbiB0aGUgb3V0ZXIgc2NvcGUsIHdoaWNoIGFsbG93cyB0aGlzIG1vZHVsZSB0byBiZVxuICAvLyBpbmplY3RlZCBlYXNpbHkgYnkgYGJpbi9yZWdlbmVyYXRvciAtLWluY2x1ZGUtcnVudGltZSBzY3JpcHQuanNgLlxuICByZXR1cm4gZXhwb3J0cztcblxufShcbiAgLy8gSWYgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlLCB1c2UgbW9kdWxlLmV4cG9ydHNcbiAgLy8gYXMgdGhlIHJlZ2VuZXJhdG9yUnVudGltZSBuYW1lc3BhY2UuIE90aGVyd2lzZSBjcmVhdGUgYSBuZXcgZW1wdHlcbiAgLy8gb2JqZWN0LiBFaXRoZXIgd2F5LCB0aGUgcmVzdWx0aW5nIG9iamVjdCB3aWxsIGJlIHVzZWQgdG8gaW5pdGlhbGl6ZVxuICAvLyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIHZhcmlhYmxlIGF0IHRoZSB0b3Agb2YgdGhpcyBmaWxlLlxuICB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiID8gbW9kdWxlLmV4cG9ydHMgOiB7fVxuKSk7XG5cbnRyeSB7XG4gIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG59IGNhdGNoIChhY2NpZGVudGFsU3RyaWN0TW9kZSkge1xuICAvLyBUaGlzIG1vZHVsZSBzaG91bGQgbm90IGJlIHJ1bm5pbmcgaW4gc3RyaWN0IG1vZGUsIHNvIHRoZSBhYm92ZVxuICAvLyBhc3NpZ25tZW50IHNob3VsZCBhbHdheXMgd29yayB1bmxlc3Mgc29tZXRoaW5nIGlzIG1pc2NvbmZpZ3VyZWQuIEp1c3RcbiAgLy8gaW4gY2FzZSBydW50aW1lLmpzIGFjY2lkZW50YWxseSBydW5zIGluIHN0cmljdCBtb2RlLCB3ZSBjYW4gZXNjYXBlXG4gIC8vIHN0cmljdCBtb2RlIHVzaW5nIGEgZ2xvYmFsIEZ1bmN0aW9uIGNhbGwuIFRoaXMgY291bGQgY29uY2VpdmFibHkgZmFpbFxuICAvLyBpZiBhIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5IGZvcmJpZHMgdXNpbmcgRnVuY3Rpb24sIGJ1dCBpbiB0aGF0IGNhc2VcbiAgLy8gdGhlIHByb3BlciBzb2x1dGlvbiBpcyB0byBmaXggdGhlIGFjY2lkZW50YWwgc3RyaWN0IG1vZGUgcHJvYmxlbS4gSWZcbiAgLy8geW91J3ZlIG1pc2NvbmZpZ3VyZWQgeW91ciBidW5kbGVyIHRvIGZvcmNlIHN0cmljdCBtb2RlIGFuZCBhcHBsaWVkIGFcbiAgLy8gQ1NQIHRvIGZvcmJpZCBGdW5jdGlvbiwgYW5kIHlvdSdyZSBub3Qgd2lsbGluZyB0byBmaXggZWl0aGVyIG9mIHRob3NlXG4gIC8vIHByb2JsZW1zLCBwbGVhc2UgZGV0YWlsIHlvdXIgdW5pcXVlIHByZWRpY2FtZW50IGluIGEgR2l0SHViIGlzc3VlLlxuICBGdW5jdGlvbihcInJcIiwgXCJyZWdlbmVyYXRvclJ1bnRpbWUgPSByXCIpKHJ1bnRpbWUpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9pbmRleCcpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmFuZG9tRnJvbVNlZWQgPSByZXF1aXJlKCcuL3JhbmRvbS9yYW5kb20tZnJvbS1zZWVkJyk7XG5cbnZhciBPUklHSU5BTCA9ICcwMTIzNDU2Nzg5YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWl8tJztcbnZhciBhbHBoYWJldDtcbnZhciBwcmV2aW91c1NlZWQ7XG5cbnZhciBzaHVmZmxlZDtcblxuZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgc2h1ZmZsZWQgPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gc2V0Q2hhcmFjdGVycyhfYWxwaGFiZXRfKSB7XG4gICAgaWYgKCFfYWxwaGFiZXRfKSB7XG4gICAgICAgIGlmIChhbHBoYWJldCAhPT0gT1JJR0lOQUwpIHtcbiAgICAgICAgICAgIGFscGhhYmV0ID0gT1JJR0lOQUw7XG4gICAgICAgICAgICByZXNldCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoX2FscGhhYmV0XyA9PT0gYWxwaGFiZXQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChfYWxwaGFiZXRfLmxlbmd0aCAhPT0gT1JJR0lOQUwubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ3VzdG9tIGFscGhhYmV0IGZvciBzaG9ydGlkIG11c3QgYmUgJyArIE9SSUdJTkFMLmxlbmd0aCArICcgdW5pcXVlIGNoYXJhY3RlcnMuIFlvdSBzdWJtaXR0ZWQgJyArIF9hbHBoYWJldF8ubGVuZ3RoICsgJyBjaGFyYWN0ZXJzOiAnICsgX2FscGhhYmV0Xyk7XG4gICAgfVxuXG4gICAgdmFyIHVuaXF1ZSA9IF9hbHBoYWJldF8uc3BsaXQoJycpLmZpbHRlcihmdW5jdGlvbihpdGVtLCBpbmQsIGFycil7XG4gICAgICAgcmV0dXJuIGluZCAhPT0gYXJyLmxhc3RJbmRleE9mKGl0ZW0pO1xuICAgIH0pO1xuXG4gICAgaWYgKHVuaXF1ZS5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDdXN0b20gYWxwaGFiZXQgZm9yIHNob3J0aWQgbXVzdCBiZSAnICsgT1JJR0lOQUwubGVuZ3RoICsgJyB1bmlxdWUgY2hhcmFjdGVycy4gVGhlc2UgY2hhcmFjdGVycyB3ZXJlIG5vdCB1bmlxdWU6ICcgKyB1bmlxdWUuam9pbignLCAnKSk7XG4gICAgfVxuXG4gICAgYWxwaGFiZXQgPSBfYWxwaGFiZXRfO1xuICAgIHJlc2V0KCk7XG59XG5cbmZ1bmN0aW9uIGNoYXJhY3RlcnMoX2FscGhhYmV0Xykge1xuICAgIHNldENoYXJhY3RlcnMoX2FscGhhYmV0Xyk7XG4gICAgcmV0dXJuIGFscGhhYmV0O1xufVxuXG5mdW5jdGlvbiBzZXRTZWVkKHNlZWQpIHtcbiAgICByYW5kb21Gcm9tU2VlZC5zZWVkKHNlZWQpO1xuICAgIGlmIChwcmV2aW91c1NlZWQgIT09IHNlZWQpIHtcbiAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgcHJldmlvdXNTZWVkID0gc2VlZDtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNodWZmbGUoKSB7XG4gICAgaWYgKCFhbHBoYWJldCkge1xuICAgICAgICBzZXRDaGFyYWN0ZXJzKE9SSUdJTkFMKTtcbiAgICB9XG5cbiAgICB2YXIgc291cmNlQXJyYXkgPSBhbHBoYWJldC5zcGxpdCgnJyk7XG4gICAgdmFyIHRhcmdldEFycmF5ID0gW107XG4gICAgdmFyIHIgPSByYW5kb21Gcm9tU2VlZC5uZXh0VmFsdWUoKTtcbiAgICB2YXIgY2hhcmFjdGVySW5kZXg7XG5cbiAgICB3aGlsZSAoc291cmNlQXJyYXkubGVuZ3RoID4gMCkge1xuICAgICAgICByID0gcmFuZG9tRnJvbVNlZWQubmV4dFZhbHVlKCk7XG4gICAgICAgIGNoYXJhY3RlckluZGV4ID0gTWF0aC5mbG9vcihyICogc291cmNlQXJyYXkubGVuZ3RoKTtcbiAgICAgICAgdGFyZ2V0QXJyYXkucHVzaChzb3VyY2VBcnJheS5zcGxpY2UoY2hhcmFjdGVySW5kZXgsIDEpWzBdKTtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldEFycmF5LmpvaW4oJycpO1xufVxuXG5mdW5jdGlvbiBnZXRTaHVmZmxlZCgpIHtcbiAgICBpZiAoc2h1ZmZsZWQpIHtcbiAgICAgICAgcmV0dXJuIHNodWZmbGVkO1xuICAgIH1cbiAgICBzaHVmZmxlZCA9IHNodWZmbGUoKTtcbiAgICByZXR1cm4gc2h1ZmZsZWQ7XG59XG5cbi8qKlxuICogbG9va3VwIHNodWZmbGVkIGxldHRlclxuICogQHBhcmFtIGluZGV4XG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBsb29rdXAoaW5kZXgpIHtcbiAgICB2YXIgYWxwaGFiZXRTaHVmZmxlZCA9IGdldFNodWZmbGVkKCk7XG4gICAgcmV0dXJuIGFscGhhYmV0U2h1ZmZsZWRbaW5kZXhdO1xufVxuXG5mdW5jdGlvbiBnZXQgKCkge1xuICByZXR1cm4gYWxwaGFiZXQgfHwgT1JJR0lOQUw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdldDogZ2V0LFxuICAgIGNoYXJhY3RlcnM6IGNoYXJhY3RlcnMsXG4gICAgc2VlZDogc2V0U2VlZCxcbiAgICBsb29rdXA6IGxvb2t1cCxcbiAgICBzaHVmZmxlZDogZ2V0U2h1ZmZsZWRcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBnZW5lcmF0ZSA9IHJlcXVpcmUoJy4vZ2VuZXJhdGUnKTtcbnZhciBhbHBoYWJldCA9IHJlcXVpcmUoJy4vYWxwaGFiZXQnKTtcblxuLy8gSWdub3JlIGFsbCBtaWxsaXNlY29uZHMgYmVmb3JlIGEgY2VydGFpbiB0aW1lIHRvIHJlZHVjZSB0aGUgc2l6ZSBvZiB0aGUgZGF0ZSBlbnRyb3B5IHdpdGhvdXQgc2FjcmlmaWNpbmcgdW5pcXVlbmVzcy5cbi8vIFRoaXMgbnVtYmVyIHNob3VsZCBiZSB1cGRhdGVkIGV2ZXJ5IHllYXIgb3Igc28gdG8ga2VlcCB0aGUgZ2VuZXJhdGVkIGlkIHNob3J0LlxuLy8gVG8gcmVnZW5lcmF0ZSBgbmV3IERhdGUoKSAtIDBgIGFuZCBidW1wIHRoZSB2ZXJzaW9uLiBBbHdheXMgYnVtcCB0aGUgdmVyc2lvbiFcbnZhciBSRURVQ0VfVElNRSA9IDE1Njc3NTI4MDIwNjI7XG5cbi8vIGRvbid0IGNoYW5nZSB1bmxlc3Mgd2UgY2hhbmdlIHRoZSBhbGdvcyBvciBSRURVQ0VfVElNRVxuLy8gbXVzdCBiZSBhbiBpbnRlZ2VyIGFuZCBsZXNzIHRoYW4gMTZcbnZhciB2ZXJzaW9uID0gNztcblxuLy8gQ291bnRlciBpcyB1c2VkIHdoZW4gc2hvcnRpZCBpcyBjYWxsZWQgbXVsdGlwbGUgdGltZXMgaW4gb25lIHNlY29uZC5cbnZhciBjb3VudGVyO1xuXG4vLyBSZW1lbWJlciB0aGUgbGFzdCB0aW1lIHNob3J0aWQgd2FzIGNhbGxlZCBpbiBjYXNlIGNvdW50ZXIgaXMgbmVlZGVkLlxudmFyIHByZXZpb3VzU2Vjb25kcztcblxuLyoqXG4gKiBHZW5lcmF0ZSB1bmlxdWUgaWRcbiAqIFJldHVybnMgc3RyaW5nIGlkXG4gKi9cbmZ1bmN0aW9uIGJ1aWxkKGNsdXN0ZXJXb3JrZXJJZCkge1xuICAgIHZhciBzdHIgPSAnJztcblxuICAgIHZhciBzZWNvbmRzID0gTWF0aC5mbG9vcigoRGF0ZS5ub3coKSAtIFJFRFVDRV9USU1FKSAqIDAuMDAxKTtcblxuICAgIGlmIChzZWNvbmRzID09PSBwcmV2aW91c1NlY29uZHMpIHtcbiAgICAgICAgY291bnRlcisrO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvdW50ZXIgPSAwO1xuICAgICAgICBwcmV2aW91c1NlY29uZHMgPSBzZWNvbmRzO1xuICAgIH1cblxuICAgIHN0ciA9IHN0ciArIGdlbmVyYXRlKHZlcnNpb24pO1xuICAgIHN0ciA9IHN0ciArIGdlbmVyYXRlKGNsdXN0ZXJXb3JrZXJJZCk7XG4gICAgaWYgKGNvdW50ZXIgPiAwKSB7XG4gICAgICAgIHN0ciA9IHN0ciArIGdlbmVyYXRlKGNvdW50ZXIpO1xuICAgIH1cbiAgICBzdHIgPSBzdHIgKyBnZW5lcmF0ZShzZWNvbmRzKTtcbiAgICByZXR1cm4gc3RyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ1aWxkO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYWxwaGFiZXQgPSByZXF1aXJlKCcuL2FscGhhYmV0Jyk7XG52YXIgcmFuZG9tID0gcmVxdWlyZSgnLi9yYW5kb20vcmFuZG9tLWJ5dGUnKTtcbnZhciBmb3JtYXQgPSByZXF1aXJlKCduYW5vaWQvZm9ybWF0Jyk7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlKG51bWJlcikge1xuICAgIHZhciBsb29wQ291bnRlciA9IDA7XG4gICAgdmFyIGRvbmU7XG5cbiAgICB2YXIgc3RyID0gJyc7XG5cbiAgICB3aGlsZSAoIWRvbmUpIHtcbiAgICAgICAgc3RyID0gc3RyICsgZm9ybWF0KHJhbmRvbSwgYWxwaGFiZXQuZ2V0KCksIDEpO1xuICAgICAgICBkb25lID0gbnVtYmVyIDwgKE1hdGgucG93KDE2LCBsb29wQ291bnRlciArIDEgKSApO1xuICAgICAgICBsb29wQ291bnRlcisrO1xuICAgIH1cbiAgICByZXR1cm4gc3RyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdlbmVyYXRlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYWxwaGFiZXQgPSByZXF1aXJlKCcuL2FscGhhYmV0Jyk7XG52YXIgYnVpbGQgPSByZXF1aXJlKCcuL2J1aWxkJyk7XG52YXIgaXNWYWxpZCA9IHJlcXVpcmUoJy4vaXMtdmFsaWQnKTtcblxuLy8gaWYgeW91IGFyZSB1c2luZyBjbHVzdGVyIG9yIG11bHRpcGxlIHNlcnZlcnMgdXNlIHRoaXMgdG8gbWFrZSBlYWNoIGluc3RhbmNlXG4vLyBoYXMgYSB1bmlxdWUgdmFsdWUgZm9yIHdvcmtlclxuLy8gTm90ZTogSSBkb24ndCBrbm93IGlmIHRoaXMgaXMgYXV0b21hdGljYWxseSBzZXQgd2hlbiB1c2luZyB0aGlyZFxuLy8gcGFydHkgY2x1c3RlciBzb2x1dGlvbnMgc3VjaCBhcyBwbTIuXG52YXIgY2x1c3RlcldvcmtlcklkID0gcmVxdWlyZSgnLi91dGlsL2NsdXN0ZXItd29ya2VyLWlkJykgfHwgMDtcblxuLyoqXG4gKiBTZXQgdGhlIHNlZWQuXG4gKiBIaWdobHkgcmVjb21tZW5kZWQgaWYgeW91IGRvbid0IHdhbnQgcGVvcGxlIHRvIHRyeSB0byBmaWd1cmUgb3V0IHlvdXIgaWQgc2NoZW1hLlxuICogZXhwb3NlZCBhcyBzaG9ydGlkLnNlZWQoaW50KVxuICogQHBhcmFtIHNlZWQgSW50ZWdlciB2YWx1ZSB0byBzZWVkIHRoZSByYW5kb20gYWxwaGFiZXQuICBBTFdBWVMgVVNFIFRIRSBTQU1FIFNFRUQgb3IgeW91IG1pZ2h0IGdldCBvdmVybGFwcy5cbiAqL1xuZnVuY3Rpb24gc2VlZChzZWVkVmFsdWUpIHtcbiAgICBhbHBoYWJldC5zZWVkKHNlZWRWYWx1ZSk7XG4gICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vKipcbiAqIFNldCB0aGUgY2x1c3RlciB3b3JrZXIgb3IgbWFjaGluZSBpZFxuICogZXhwb3NlZCBhcyBzaG9ydGlkLndvcmtlcihpbnQpXG4gKiBAcGFyYW0gd29ya2VySWQgd29ya2VyIG11c3QgYmUgcG9zaXRpdmUgaW50ZWdlci4gIE51bWJlciBsZXNzIHRoYW4gMTYgaXMgcmVjb21tZW5kZWQuXG4gKiByZXR1cm5zIHNob3J0aWQgbW9kdWxlIHNvIGl0IGNhbiBiZSBjaGFpbmVkLlxuICovXG5mdW5jdGlvbiB3b3JrZXIod29ya2VySWQpIHtcbiAgICBjbHVzdGVyV29ya2VySWQgPSB3b3JrZXJJZDtcbiAgICByZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8qKlxuICpcbiAqIHNldHMgbmV3IGNoYXJhY3RlcnMgdG8gdXNlIGluIHRoZSBhbHBoYWJldFxuICogcmV0dXJucyB0aGUgc2h1ZmZsZWQgYWxwaGFiZXRcbiAqL1xuZnVuY3Rpb24gY2hhcmFjdGVycyhuZXdDaGFyYWN0ZXJzKSB7XG4gICAgaWYgKG5ld0NoYXJhY3RlcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBhbHBoYWJldC5jaGFyYWN0ZXJzKG5ld0NoYXJhY3RlcnMpO1xuICAgIH1cblxuICAgIHJldHVybiBhbHBoYWJldC5zaHVmZmxlZCgpO1xufVxuXG4vKipcbiAqIEdlbmVyYXRlIHVuaXF1ZSBpZFxuICogUmV0dXJucyBzdHJpbmcgaWRcbiAqL1xuZnVuY3Rpb24gZ2VuZXJhdGUoKSB7XG4gIHJldHVybiBidWlsZChjbHVzdGVyV29ya2VySWQpO1xufVxuXG4vLyBFeHBvcnQgYWxsIG90aGVyIGZ1bmN0aW9ucyBhcyBwcm9wZXJ0aWVzIG9mIHRoZSBnZW5lcmF0ZSBmdW5jdGlvblxubW9kdWxlLmV4cG9ydHMgPSBnZW5lcmF0ZTtcbm1vZHVsZS5leHBvcnRzLmdlbmVyYXRlID0gZ2VuZXJhdGU7XG5tb2R1bGUuZXhwb3J0cy5zZWVkID0gc2VlZDtcbm1vZHVsZS5leHBvcnRzLndvcmtlciA9IHdvcmtlcjtcbm1vZHVsZS5leHBvcnRzLmNoYXJhY3RlcnMgPSBjaGFyYWN0ZXJzO1xubW9kdWxlLmV4cG9ydHMuaXNWYWxpZCA9IGlzVmFsaWQ7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYWxwaGFiZXQgPSByZXF1aXJlKCcuL2FscGhhYmV0Jyk7XG5cbmZ1bmN0aW9uIGlzU2hvcnRJZChpZCkge1xuICAgIGlmICghaWQgfHwgdHlwZW9mIGlkICE9PSAnc3RyaW5nJyB8fCBpZC5sZW5ndGggPCA2ICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIG5vbkFscGhhYmV0aWMgPSBuZXcgUmVnRXhwKCdbXicgK1xuICAgICAgYWxwaGFiZXQuZ2V0KCkucmVwbGFjZSgvW3xcXFxce30oKVtcXF1eJCsqPy4tXS9nLCAnXFxcXCQmJykgK1xuICAgICddJyk7XG4gICAgcmV0dXJuICFub25BbHBoYWJldGljLnRlc3QoaWQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzU2hvcnRJZDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNyeXB0byA9IHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmICh3aW5kb3cuY3J5cHRvIHx8IHdpbmRvdy5tc0NyeXB0byk7IC8vIElFIDExIHVzZXMgd2luZG93Lm1zQ3J5cHRvXG5cbnZhciByYW5kb21CeXRlO1xuXG5pZiAoIWNyeXB0byB8fCAhY3J5cHRvLmdldFJhbmRvbVZhbHVlcykge1xuICAgIHJhbmRvbUJ5dGUgPSBmdW5jdGlvbihzaXplKSB7XG4gICAgICAgIHZhciBieXRlcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgICAgICAgYnl0ZXMucHVzaChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTYpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnl0ZXM7XG4gICAgfTtcbn0gZWxzZSB7XG4gICAgcmFuZG9tQnl0ZSA9IGZ1bmN0aW9uKHNpemUpIHtcbiAgICAgICAgcmV0dXJuIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoc2l6ZSkpO1xuICAgIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmFuZG9tQnl0ZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gRm91bmQgdGhpcyBzZWVkLWJhc2VkIHJhbmRvbSBnZW5lcmF0b3Igc29tZXdoZXJlXG4vLyBCYXNlZCBvbiBUaGUgQ2VudHJhbCBSYW5kb21pemVyIDEuMyAoQykgMTk5NyBieSBQYXVsIEhvdWxlIChob3VsZUBtc2MuY29ybmVsbC5lZHUpXG5cbnZhciBzZWVkID0gMTtcblxuLyoqXG4gKiByZXR1cm4gYSByYW5kb20gbnVtYmVyIGJhc2VkIG9uIGEgc2VlZFxuICogQHBhcmFtIHNlZWRcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIGdldE5leHRWYWx1ZSgpIHtcbiAgICBzZWVkID0gKHNlZWQgKiA5MzAxICsgNDkyOTcpICUgMjMzMjgwO1xuICAgIHJldHVybiBzZWVkLygyMzMyODAuMCk7XG59XG5cbmZ1bmN0aW9uIHNldFNlZWQoX3NlZWRfKSB7XG4gICAgc2VlZCA9IF9zZWVkXztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbmV4dFZhbHVlOiBnZXROZXh0VmFsdWUsXG4gICAgc2VlZDogc2V0U2VlZFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSAwO1xuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIm5hbWVcIjogXCJhcHAuaG9vZG1vZGUuY29cIixcbiAgXCJkaXNwbGF5TmFtZVwiOiBcIkhvb2Rtb2RlXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuMC4zXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJBIHNhbXBsZSBBcGFjaGUgQ29yZG92YSBhcHBsaWNhdGlvbiB0aGF0IHJlc3BvbmRzIHRvIHRoZSBkZXZpY2VyZWFkeSBldmVudC5cIixcbiAgXCJtYWluXCI6IFwiaW5kZXguanNcIixcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImRldlwiOiBcImJ1ZG8gc3JjL2luZGV4LmpzeCAtLWZvcmNlLWRlZmF1bHQtaW5kZXggLS1kaXIgd3d3IC0tY3NzIGluZGV4LmNzcyAtLXdhdGNoLWdsb2I9d3d3L2luZGV4LmNzcyAtLWxpdmUgLS0gLXQgYmFiZWxpZnlcIlxuICB9LFxuICBcImtleXdvcmRzXCI6IFtcbiAgICBcImVjb3N5c3RlbTpjb3Jkb3ZhXCJcbiAgXSxcbiAgXCJhdXRob3JcIjogXCJBcGFjaGUgQ29yZG92YSBUZWFtXCIsXG4gIFwibGljZW5zZVwiOiBcIkFwYWNoZS0yLjBcIixcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGJhYmVsL3BvbHlmaWxsXCI6IFwiXjcuOC4zXCIsXG4gICAgXCJjb3Jkb3ZhLWFuZHJvaWRcIjogXCJeOC4xLjBcIixcbiAgICBcImNvcmRvdmEtcGx1Z2luLXN0YXR1c2JhclwiOiBcIl4yLjQuM1wiLFxuICAgIFwicHJlYWN0XCI6IFwiXjEwLjMuMVwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBiYWJlbC9jbGlcIjogXCJeNy44LjNcIixcbiAgICBcIkBiYWJlbC9jb3JlXCI6IFwiXjcuNC4zXCIsXG4gICAgXCJAYmFiZWwvcGx1Z2luLXByb3Bvc2FsLWNsYXNzLXByb3BlcnRpZXNcIjogXCJeNy44LjNcIixcbiAgICBcIkBiYWJlbC9wbHVnaW4tdHJhbnNmb3JtLXJlYWN0LWpzeFwiOiBcIl43LjguM1wiLFxuICAgIFwiQGJhYmVsL3ByZXNldC1lbnZcIjogXCJeNy44LjNcIixcbiAgICBcImJhYmVsLXByZXNldC1wcmVhY3RcIjogXCJeMi4wLjBcIixcbiAgICBcImJhYmVsaWZ5XCI6IFwiXjEwLjAuMFwiLFxuICAgIFwiYnJvd3NlcmlmeVwiOiBcIl4xNi4xLjBcIixcbiAgICBcImJ1ZG9cIjogXCJeMTEuNi4zXCIsXG4gICAgXCJjb3Jkb3ZhXCI6IFwiXjkuMC4wXCIsXG4gICAgXCJjb3Jkb3ZhLXBsdWdpbi13aGl0ZWxpc3RcIjogXCJeMS4zLjRcIixcbiAgICBcInVnbGlmeWlmeVwiOiBcIl40LjAuNVwiLFxuICAgIFwic2hvcnRpZFwiOiBcIl4yLjIuMTVcIlxuICB9LFxuICBcImNvcmRvdmFcIjoge1xuICAgIFwicGx1Z2luc1wiOiB7XG4gICAgICBcImNvcmRvdmEtcGx1Z2luLXdoaXRlbGlzdFwiOiB7fSxcbiAgICAgIFwiY29yZG92YS1wbHVnaW4tc3RhdHVzYmFyXCI6IHt9XG4gICAgfSxcbiAgICBcInBsYXRmb3Jtc1wiOiBbXG4gICAgICBcImFuZHJvaWRcIlxuICAgIF1cbiAgfVxufSIsImltcG9ydCBcInByZWFjdC9kZWJ1Z1wiO1xuXG5pbXBvcnQgeyBoLCByZW5kZXIgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IEFwcCBmcm9tICcuL3ZpZXcvQXBwLmpzeCc7XG5pbXBvcnQgQXBwQ29udGV4dCBmcm9tICcuL3V0aWxzL0FwcENvbnRleHQuanMnO1xuaW1wb3J0IHNob3J0aWQgZnJvbSAnc2hvcnRpZCc7XG5pbXBvcnQgQXBwQ29udHJvbGxlciBmcm9tICcuL21vZGVsL0FwcENvbnRyb2xsZXIuanMnO1xuaW1wb3J0IEFwcEhlbHBlciBmcm9tICcuL21vZGVsL0FwcEhlbHBlci5qcyc7XG5pbXBvcnQgQ29uZHVjdG9yIGZyb20gJy4vbW9kZWwvQ29uZHVjdG9yLmpzJztcblxubGV0IGNvbmR1Y3RvciwgYXBwSGVscGVyLCBhcHBDb250cm9sbGVyO1xuXG50cnkge1xuXHRjb25kdWN0b3I9bmV3IENvbmR1Y3RvcigpO1xuXHRhcHBIZWxwZXI9bmV3IEFwcEhlbHBlcihjb25kdWN0b3IpO1xuXHRhcHBDb250cm9sbGVyPW5ldyBBcHBDb250cm9sbGVyKGNvbmR1Y3RvcixhcHBIZWxwZXIpO1xufVxuXG5jYXRjaCAoZSkge1xuXHRhbGVydChlKTtcbn1cblxuY29uZHVjdG9yLm9uUGxheUdyaWRJbmRleENoYW5nZT0oZ3JpZEluZGV4LCBzZXF1ZW5jZUluZGV4KT0+e1xuXHRmb3IgKGxldCBlbCBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmN1cnJlbnQtYmVhdFwiKSlcblx0XHRlbC5jbGFzc0xpc3QucmVtb3ZlKCdjdXJyZW50LWJlYXQnKTtcblxuXHRpZiAoZ3JpZEluZGV4Pj0wKVxuXHRcdGZvciAobGV0IGVsIG9mIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYmVhdC1cIitncmlkSW5kZXgpKVxuXHRcdFx0ZWwuY2xhc3NMaXN0LmFkZCgnY3VycmVudC1iZWF0Jyk7XG5cblx0Zm9yIChsZXQgZWwgb2YgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jdXJyZW50LXNlcXVlbmNlXCIpKVxuXHRcdGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2N1cnJlbnQtc2VxdWVuY2UnKTtcblxuXHRpZiAoZ3JpZEluZGV4JTQ9PTAgJiYgc2VxdWVuY2VJbmRleD49MClcblx0XHRmb3IgKGxldCBlbCBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlcXVlbmNlLVwiK3NlcXVlbmNlSW5kZXgpKVxuXHRcdFx0ZWwuY2xhc3NMaXN0LmFkZCgnY3VycmVudC1zZXF1ZW5jZScpO1xufVxuXG5mdW5jdGlvbiBvblN0YXRlQ2hhbmdlKHN0YXRlKSB7XG5cdGNvbmR1Y3Rvci5zZXRTdGF0ZShzdGF0ZSk7XG5cdHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImhvb2Rtb2RlLXNvbmdzXCIsSlNPTi5zdHJpbmdpZnkoc3RhdGUuc29uZ3MpKTtcbn1cblxubGV0IGFwcENvbnRleHQ9KFxuXHQ8QXBwQ29udGV4dFxuXHRcdFx0Y29udHJvbGxlcj17YXBwQ29udHJvbGxlcn1cblx0XHRcdGhlbHBlcj17YXBwSGVscGVyfVxuXHRcdFx0aW5pdEFjdGlvbj1cImluaXRcIlxuXHRcdFx0b25TdGF0ZUNoYW5nZT17b25TdGF0ZUNoYW5nZX0+XG5cdFx0PEFwcC8+XG5cdDwvQXBwQ29udGV4dD5cbik7XG5cbmZ1bmN0aW9uIHN0YXJ0KCkge1xuXHRyZW5kZXIoYXBwQ29udGV4dCwgZG9jdW1lbnQuYm9keSk7XG59XG5cbmlmICh3aW5kb3cuaGFzT3duUHJvcGVydHkoXCJjb3Jkb3ZhXCIpKVxuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkZXZpY2VyZWFkeScsc3RhcnQpO1xuXG5lbHNlXG5cdHN0YXJ0KCk7XG4iLCJpbXBvcnQgc2hvcnRpZCBmcm9tICdzaG9ydGlkJztcbmltcG9ydCBcInJlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZVwiO1xuaW1wb3J0IGRlbW9zb25ncyBmcm9tICcuL2RlbW9zb25ncyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcENvbnRyb2xsZXIge1xuXHRjb25zdHJ1Y3Rvcihjb25kdWN0b3IsIGhlbHBlcikge1xuXHRcdHRoaXMuY29uZHVjdG9yPWNvbmR1Y3Rvcjtcblx0XHR0aGlzLmhlbHBlcj1oZWxwZXI7XG5cdFx0Y29uc29sZS5sb2coZGVtb3NvbmdzKTtcblx0fVxuXG5cdGluaXRTdGF0ZSgpIHtcblx0XHRsZXQgc3RhdGU9e1xuXHRcdFx0Y3VycmVudFNvbmdJbmRleDogLTEsXG5cdFx0XHRjdXJyZW50TGF5ZXJJbmRleDogLTEsXG5cdFx0XHRjdXJyZW50Q2hvcmRJbmRleDogMCxcblx0XHRcdGN1cnJlbnRTZWN0aW9uSW5kZXg6IC0xLFxuXHRcdFx0Y3VycmVudEdyaWRJbmRleDogLTEsXG5cdFx0XHRzZXR0aW5nc1Zpc2libGU6IGZhbHNlLFxuXHRcdFx0YWRkTGF5ZXJWaXNpYmxlOiBmYWxzZSxcblx0XHRcdHNvbmdzOiBbXSxcblx0XHRcdGluc3RydW1lbnRzOiBbXSxcblx0XHRcdHBsYXlpbmc6IGZhbHNlLFxuXHRcdFx0cmVjb3JkaW5nOiBmYWxzZSxcblx0XHRcdGVkaXRTZWN0aW9uQ2hvcmRWaXNpYmxlOiAtMSxcblx0XHRcdGFib3V0U2NyZWVuVmlzaWJsZTogZmFsc2Vcblx0XHR9O1xuXG5cdFx0c3RhdGUuaW5zdHJ1bWVudHMucHVzaCh7XG5cdFx0XHRcImtleVwiOiBcImRydW1zXCIsXG5cdFx0XHRcInR5cGVcIjogXCJwZXJjdXNzaXZlXCIsXG5cdFx0XHRcIm5hbWVcIjogXCJEcnVtc1wiLFxuXHRcdFx0XCJsYWJlbHNcIjogW1xuXHRcdFx0XHRcIktJQ0tcIixcIktJQ0tcIixcIlNOQVJFXCIsXG5cdFx0XHRcdFwiU05BUkVcIixcIkhJLUhBVFwiLFwiSEktSEFUXCIsXG5cdFx0XHRcdFwiSEktSEFUXCIsXCJTSEFLRVJcIixcIkNMQVBcIl0sXG5cdFx0XHRcImljb25cIjogXCJkcnVtLnN2Z1wiLFxuXHRcdFx0XCJpY29uc1wiOiBbXG5cdFx0XHRcdFwia2ljay1kcnVtLnN2Z1wiLFwia2ljay1kcnVtLnN2Z1wiLFxuXHRcdFx0XHRcInNuYXJlLWRydW0uc3ZnXCIsXCJzbmFyZS1kcnVtLnN2Z1wiLFxuXHRcdFx0XHRcImhpLWhhdC5zdmdcIixcImhpLWhhdC5zdmdcIixcImhpLWhhdC5zdmdcIixcblx0XHRcdFx0XCJtYXJhY2FzLnN2Z1wiLFwiY2xhcC5zdmdcIl0sXG5cdFx0XHRcInNhbXBsZXNcIjogW1xuXHRcdFx0XHRcInNhbXBsZXMvZHJ1bXMveWVzLWtpY2subXAzXCIsXG5cdFx0XHRcdFwic2FtcGxlcy9kcnVtcy9iYWQta2ljay53YXZcIixcblx0XHRcdFx0XCJzYW1wbGVzL2RydW1zL3llcy1zbmFyZS5tcDNcIixcblx0XHRcdFx0XCJzYW1wbGVzL2RydW1zL2JhZC1zbmFyZS53YXZcIixcblx0XHRcdFx0XCJzYW1wbGVzL2RydW1zL2JhZC1oaWhhdC53YXZcIixcblx0XHRcdFx0XCJzYW1wbGVzL2RydW1zL3RocmwtaGF0X0FfbWlub3Iud2F2XCIsXG5cdFx0XHRcdFwic2FtcGxlcy9kcnVtcy9yb2NrLWhpaGF0LXRjaGlrLndhdlwiLFxuXHRcdFx0XHRcInNhbXBsZXMvZHJ1bXMvWWFtYWhhLVJYMTUtU2hha2VyLndhdlwiLFxuXHRcdFx0XHRcInNhbXBsZXMvZHJ1bXMvUm9sYW5kLVItOC04MDgtQ2xhcC53YXZcIlxuXHRcdFx0XVxuXHRcdH0pO1xuXG5cdFx0c3RhdGUuaW5zdHJ1bWVudHMucHVzaCh7XG5cdFx0XHRcImtleVwiOiBcInN0cmluZy1iYXNzXCIsXG5cdFx0XHRcInR5cGVcIjogXCJoYXJtb25pY1wiLFxuXHRcdFx0XCJuYW1lXCI6IFwiU3RyaW5nIEJhc3NcIixcblx0XHRcdFwic2FtcGxlXCI6IFwic2FtcGxlcy9ZYW1haGEtRVg1LU9sZC1TdHJpbmdzLUMyLWVkaXRlZC53YXZcIixcblx0XHRcdFwiaWNvblwiOiBcImJhc3Muc3ZnXCJcblx0XHR9KTtcblxuXHRcdHN0YXRlLmluc3RydW1lbnRzLnB1c2goe1xuXHRcdFx0XCJrZXlcIjogXCJwaWFub1wiLFxuXHRcdFx0XCJ0eXBlXCI6IFwiaGFybW9uaWNcIixcblx0XHRcdFwibmFtZVwiOiBcIlBpYW5vXCIsXG5cdFx0XHRcInNhbXBsZVwiOiBcInNhbXBsZXMvcGlhbm8tYy53YXZcIixcblx0XHRcdFwiaWNvblwiOiBcInBpYW5vLnN2Z1wiLFxuXHRcdFx0XCJkZWZhdWx0Vm9sdW1lXCI6IDAuMjVcblx0XHR9KTtcblxuXHRcdHN0YXRlLmluc3RydW1lbnRzLnB1c2goe1xuXHRcdFx0XCJrZXlcIjogXCJrb3JnLW9yZ2FuXCIsXG5cdFx0XHRcInR5cGVcIjogXCJoYXJtb25pY1wiLFxuXHRcdFx0XCJuYW1lXCI6IFwiS29yZyBPcmdhblwiLFxuXHRcdFx0XCJzYW1wbGVcIjogXCJzYW1wbGVzL0tvcmctRFctODAwMC1Pcmdhbi1DMy53YXZcIixcblx0XHRcdFwiaWNvblwiOiBcIm9yZ2FuLnN2Z1wiLFxuXHRcdFx0XCJkZWZhdWx0Vm9sdW1lXCI6IDAuMjVcblx0XHR9KTtcblxuXHRcdHN0YXRlLmluc3RydW1lbnRzLnB1c2goe1xuXHRcdFx0XCJrZXlcIjogXCJjbGF2XCIsXG5cdFx0XHRcInR5cGVcIjogXCJoYXJtb25pY1wiLFxuXHRcdFx0XCJuYW1lXCI6IFwiQ2xhdlwiLFxuXHRcdFx0XCJzYW1wbGVcIjogXCJzYW1wbGVzL0Vuc29uaXEtRVNRLTEtQ2xhdi1QaWFuby1DMy53YXZcIixcblx0XHRcdFwiaWNvblwiOiBcImNsYXYuc3ZnXCIsXG5cdFx0XHRcImRlZmF1bHRWb2x1bWVcIjogMC43NVxuXHRcdH0pO1xuXG5cdFx0c3RhdGUuaW5zdHJ1bWVudHMucHVzaCh7XG5cdFx0XHRcImtleVwiOiBcInN0cmluZ3NcIixcblx0XHRcdFwidHlwZVwiOiBcImhhcm1vbmljXCIsXG5cdFx0XHRcIm5hbWVcIjogXCJTdHJpbmdzXCIsXG5cdFx0XHRcInNhbXBsZVwiOiBcInNhbXBsZXMvWWFtYWhhLUVYNS1NZWxsb3dTdHJuZ3MtQzQud2F2XCIsXG5cdFx0XHRcImljb25cIjogXCJ2aW9saW4uc3ZnXCIsXG5cdFx0XHRcImRlZmF1bHRWb2x1bWVcIjogMC4yNVxuXHRcdH0pXG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRhc3luYyBpbml0KCkge1xuXHRcdGxldCBzdGF0ZT10aGlzLmluaXRTdGF0ZSgpO1xuXHRcdGxldCBzb25nRGF0YUpzb249d2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiaG9vZG1vZGUtc29uZ3NcIik7XG5cdFx0aWYgKHNvbmdEYXRhSnNvbilcblx0XHRcdHN0YXRlLnNvbmdzPUpTT04ucGFyc2Uoc29uZ0RhdGFKc29uKTtcblxuXHRcdGlmICghc3RhdGUuc29uZ3MgfHwgIXN0YXRlLnNvbmdzLmxlbmd0aClcblx0XHRcdHN0YXRlLnNvbmdzPWRlbW9zb25ncztcblxuXHRcdHRoaXMuY29uZHVjdG9yLnNldFN0YXRlKHN0YXRlKTtcblx0XHRhd2FpdCB0aGlzLmNvbmR1Y3Rvci5sb2FkSW5zdHJ1bWVudHMoKTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fTtcblxuXHRhZGRTb25nKHN0YXRlLCBuYW1lKSB7XG5cdFx0aWYgKCFuYW1lIHx8IG5hbWUudG9TdHJpbmcoKT09XCJbb2JqZWN0IE1vdXNlRXZlbnRdXCIpXG5cdFx0XHRuYW1lPVwiTXkgTmV3IFNvbmdcIjtcblxuXHRcdGxldCBpbmRleD1zdGF0ZS5zb25ncy5sZW5ndGg7XG5cblx0XHRzdGF0ZS5zb25ncy5wdXNoKHtcblx0XHRcdG5hbWU6IG5hbWUsXG5cdFx0XHRicG06IDEwMCxcblx0XHRcdGtleTogc2hvcnRpZC5nZW5lcmF0ZSgpLFxuXHRcdFx0bXVzaWNLZXk6IFwiQVwiLFxuXHRcdFx0bWlub3I6IHRydWUsXG5cdFx0XHRsYXllcnM6IFtdLFxuXHRcdFx0Y2hvcmRTZXF1ZW5jZTogW10sXG5cdFx0XHRzZWN0aW9uczogW1xuXHRcdFx0XHRbMF0sXG5cdFx0XHRcdFswXSxcblx0XHRcdFx0WzBdXG5cdFx0XHRdXG5cdFx0fSk7XG5cblx0XHRzdGF0ZT10aGlzLnNldFNvbmdJbmRleChzdGF0ZSxpbmRleCk7XG5cdFx0c3RhdGU9dGhpcy5hZGRTZXF1ZW5jZUNob3JkKHN0YXRlKTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHNldEN1cnJlbnRDaG9yZEluZGV4KHN0YXRlLCBpbmRleCkge1xuXHRcdHN0YXRlLmN1cnJlbnRDaG9yZEluZGV4PWluZGV4O1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0c2V0Q3VycmVudFNlY3Rpb25JbmRleChzdGF0ZSwgaW5kZXgpIHtcblx0XHRzdGF0ZS5jdXJyZW50U2VjdGlvbkluZGV4PWluZGV4O1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0Y2xvc2VTb25nKHN0YXRlKSB7XG5cdFx0c3RhdGUuY3VycmVudFNvbmdJbmRleD0tMTtcblx0XHRzdGF0ZS5jdXJyZW50U2VjdGlvbkluZGV4PS0xO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0c2V0U29uZ0luZGV4KHN0YXRlLCBpbmRleCkge1xuXHRcdGlmIChpbmRleD09c3RhdGUuY3VycmVudFNvbmdJbmRleClcblx0XHRcdHJldHVybiBzdGF0ZTtcblxuXHRcdHN0YXRlLmN1cnJlbnRTb25nSW5kZXg9aW5kZXg7XG5cdFx0c3RhdGUuY3VycmVudExheWVySW5kZXg9LTE7XG5cdFx0c3RhdGUuY3VycmVudENob3JkSW5kZXg9MDtcblx0XHRzdGF0ZS5jdXJyZW50R3JpZEluZGV4PS0xO1xuXHRcdHN0YXRlLmN1cnJlbnRTZWN0aW9uSW5kZXg9LTE7XG5cdFx0c3RhdGUucGxheWluZz1mYWxzZTtcblx0XHRzdGF0ZS5yZWNvcmRpbmc9ZmFsc2U7XG5cblx0XHRsZXQgc29uZz10aGlzLmhlbHBlci5nZXRDdXJyZW50U29uZyhzdGF0ZSk7XG5cdFx0Zm9yIChsZXQgaT1zb25nLnNlY3Rpb25zLmxlbmd0aC0xOyBpPj0wOyBpLS0pXG5cdFx0XHRpZiAoc29uZy5zZWN0aW9uc1tpXS5sZW5ndGg+MSlcblx0XHRcdFx0c3RhdGUuY3VycmVudFNlY3Rpb25JbmRleD1pO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0c2hvd1NldHRpbmdzKHN0YXRlKSB7XG5cdFx0c3RhdGUuc2V0dGluZ3NWaXNpYmxlPXRydWU7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRoaWRlU2V0dGluZ3Moc3RhdGUpIHtcblx0XHRzdGF0ZS5zZXR0aW5nc1Zpc2libGU9ZmFsc2U7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRzaG93QWJvdXRTY3JlZW4oc3RhdGUpIHtcblx0XHRzdGF0ZS5hYm91dFNjcmVlblZpc2libGU9dHJ1ZTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdGhpZGVBYm91dFNjcmVlbihzdGF0ZSkge1xuXHRcdHN0YXRlLmFib3V0U2NyZWVuVmlzaWJsZT1mYWxzZTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHRvZ2dsZVNldHRpbmdzKHN0YXRlKSB7XG5cdFx0c3RhdGUuc2V0dGluZ3NWaXNpYmxlPSFzdGF0ZS5zZXR0aW5nc1Zpc2libGU7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRzZXRDdXJyZW50U29uZ05hbWUoc3RhdGUsIG5hbWUpIHtcblx0XHRzdGF0ZS5zb25nc1tzdGF0ZS5jdXJyZW50U29uZ0luZGV4XS5uYW1lPW5hbWU7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRzZXRDdXJyZW50U29uZ0JwbShzdGF0ZSwgYnBtKSB7XG5cdFx0YnBtPXBhcnNlSW50KGJwbSk7XG5cdFx0aWYgKGlzTmFOKGJwbSkpXG5cdFx0XHRicG09MTAwO1xuXG5cdFx0aWYgKGJwbTw1MClcblx0XHRcdGJwbT01MDtcblxuXHRcdGlmIChicG0+MjAwKVxuXHRcdFx0YnBtPTIwMDtcblxuXHRcdHN0YXRlLnNvbmdzW3N0YXRlLmN1cnJlbnRTb25nSW5kZXhdLmJwbT1icG07XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRzZXRDdXJyZW50U29uZ011c2ljS2V5KHN0YXRlLCBtdXNpY0tleSkge1xuXHRcdHN0YXRlLnNvbmdzW3N0YXRlLmN1cnJlbnRTb25nSW5kZXhdLm11c2ljS2V5PW11c2ljS2V5O1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0c2V0Q3VycmVudFNvbmdNaW5vcihzdGF0ZSwgbWlub3IpIHtcblx0XHRzdGF0ZS5zb25nc1tzdGF0ZS5jdXJyZW50U29uZ0luZGV4XS5taW5vcj1taW5vcjtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdGNvbmZpcm1EZWxldGVDdXJyZW50U29uZyhzdGF0ZSkge1xuXHRcdHN0YXRlLnNvbmdzLnNwbGljZShzdGF0ZS5jdXJyZW50U29uZ0luZGV4LDEpO1xuXHRcdHN0YXRlLmN1cnJlbnRTb25nSW5kZXg9LTE7XG5cdFx0c3RhdGUuc2V0dGluZ3NWaXNpYmxlPWZhbHNlO1xuXHRcdHN0YXRlLmN1cnJlbnRTZWN0aW9uSW5kZXg9LTE7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRkZWxldGVDdXJyZW50U29uZyhzdGF0ZSkge1xuXHRcdHN0YXRlLmRpYWxvZ1RleHQ9XCJTdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGUgc29uZz9cIjtcblx0XHRzdGF0ZS5kaWFsb2dBY3Rpb249XCJjb25maXJtRGVsZXRlQ3VycmVudFNvbmdcIjtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdGNvbmZpcm1EaWFsb2coc3RhdGUpIHtcblx0XHRzdGF0ZT10aGlzW3N0YXRlLmRpYWxvZ0FjdGlvbl0oc3RhdGUpO1xuXG5cdFx0c3RhdGUuZGlhbG9nVGV4dD1udWxsO1xuXHRcdHN0YXRlLmRpYWxvZ0FjdGlvbj1udWxsO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0Y2FuY2VsRGlhbG9nKHN0YXRlKSB7XG5cdFx0c3RhdGUuZGlhbG9nVGV4dD1udWxsO1xuXHRcdHN0YXRlLmRpYWxvZ0FjdGlvbj1udWxsO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0c2hvd0FkZExheWVyKHN0YXRlKSB7XG5cdFx0c3RhdGUuYWRkTGF5ZXJWaXNpYmxlPXRydWU7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRoaWRlQWRkTGF5ZXIoc3RhdGUpIHtcblx0XHRzdGF0ZS5hZGRMYXllclZpc2libGU9ZmFsc2U7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRhZGRTZXF1ZW5jZUNob3JkKHN0YXRlKSB7XG5cdFx0bGV0IHNvbmc9dGhpcy5oZWxwZXIuZ2V0Q3VycmVudFNvbmcoc3RhdGUpO1xuXG5cdFx0c29uZy5jaG9yZFNlcXVlbmNlLnB1c2goe1xuXHRcdFx0Y2hvcmRJbmRleDogMCxcblx0XHRcdGtleTogc2hvcnRpZC5nZW5lcmF0ZSgpXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRhZGRMYXllcihzdGF0ZSwgaW5zdHJ1bWVudE5hbWUpIHtcblx0XHRsZXQgc29uZz1zdGF0ZS5zb25nc1tzdGF0ZS5jdXJyZW50U29uZ0luZGV4XTtcblxuXHRcdGxldCBzZXE9W107XG5cdFx0bGV0IG51bVNvdW5kcz10aGlzLmhlbHBlci5nZXRJbnN0cnVtZW50TnVtU291bmRzQnlOYW1lKHN0YXRlLGluc3RydW1lbnROYW1lKTtcblx0XHRsZXQgaW5zdHJ1bWVudD10aGlzLmhlbHBlci5nZXRJbnN0cnVtZW50QnlOYW1lKHN0YXRlLGluc3RydW1lbnROYW1lKTtcblxuXHRcdGxldCB2b2x1bWU9MTtcblx0XHRpZiAoaW5zdHJ1bWVudC5oYXNPd25Qcm9wZXJ0eShcImRlZmF1bHRWb2x1bWVcIikpXG5cdFx0XHR2b2x1bWU9aW5zdHJ1bWVudC5kZWZhdWx0Vm9sdW1lO1xuXG5cdFx0Zm9yIChsZXQgaT0wOyBpPDE2OyBpKyspXG5cdFx0XHRzZXEucHVzaCh7XG5cdFx0XHRcdHNvdW5kczogW10sXG5cdFx0XHRcdHZlbDogMSxcblx0XHRcdFx0c3RhY2M6IGZhbHNlXG5cdFx0XHR9KTtcblxuXHRcdGxldCBsYXllcj17XG5cdFx0XHRrZXk6IHNob3J0aWQuZ2VuZXJhdGUoKSxcblx0XHRcdGluc3RydW1lbnROYW1lOiBpbnN0cnVtZW50TmFtZSxcblx0XHRcdGF1ZGlibGU6IHRydWUsXG5cdFx0XHR2b2x1bWU6IHZvbHVtZSxcblx0XHRcdHNlcTogc2VxLFxuXHRcdH07XG5cblx0XHRzb25nLmxheWVycy5wdXNoKGxheWVyKTtcblxuXHRcdHN0YXRlLmFkZExheWVyVmlzaWJsZT1mYWxzZTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHNldExheWVySW5kZXgoc3RhdGUsIGluZGV4KSB7XG5cdFx0c3RhdGUuY3VycmVudExheWVySW5kZXg9aW5kZXg7XG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0aGlkZUN1cnJlbnRMYXllcihzdGF0ZSkge1xuXHRcdHN0YXRlLmN1cnJlbnRMYXllckluZGV4PS0xO1xuXHRcdHN0YXRlLmN1cnJlbnRHcmlkSW5kZXg9LTE7XG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0dG9nZ2xlTGF5ZXJBdWRpYmxlKHN0YXRlLCBsYXllckluZGV4KSB7XG5cdFx0bGV0IHNvbmc9dGhpcy5oZWxwZXIuZ2V0Q3VycmVudFNvbmcoc3RhdGUpO1xuXHRcdHNvbmcubGF5ZXJzW2xheWVySW5kZXhdLmF1ZGlibGU9IXNvbmcubGF5ZXJzW2xheWVySW5kZXhdLmF1ZGlibGU7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRkZWxldGVDdXJyZW50TGF5ZXIoc3RhdGUpIHtcblx0XHRsZXQgc29uZz10aGlzLmhlbHBlci5nZXRDdXJyZW50U29uZyhzdGF0ZSk7XG5cdFx0c29uZy5sYXllcnMuc3BsaWNlKHN0YXRlLmN1cnJlbnRMYXllckluZGV4LDEpO1xuXHRcdHN0YXRlLmN1cnJlbnRMYXllckluZGV4PS0xO1xuXHRcdHN0YXRlLmN1cnJlbnRHcmlkSW5kZXg9LTE7XG5cdFx0c3RhdGUuc2V0dGluZ3NWaXNpYmxlPWZhbHNlO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0c2V0Q3VycmVudExheWVyVm9sdW1lKHN0YXRlLCB2b2x1bWUpIHtcblx0XHRsZXQgbGF5ZXI9dGhpcy5oZWxwZXIuZ2V0Q3VycmVudExheWVyKHN0YXRlKTtcblx0XHRsYXllci52b2x1bWU9cGFyc2VGbG9hdCh2b2x1bWUpO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0cGxheUNsaWNrKHN0YXRlKSB7XG5cdFx0c3RhdGUucGxheWluZz0hc3RhdGUucGxheWluZztcblx0XHRzdGF0ZS5jdXJyZW50R3JpZEluZGV4PS0xO1xuXG5cdFx0aWYgKCFzdGF0ZS5wbGF5aW5nKVxuXHRcdFx0c3RhdGUucmVjb3JkaW5nPWZhbHNlO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0cmVjb3JkQ2xpY2soc3RhdGUpIHtcblx0XHRzdGF0ZS5yZWNvcmRpbmc9IXN0YXRlLnJlY29yZGluZztcblx0XHRzdGF0ZS5jdXJyZW50R3JpZEluZGV4PS0xO1xuXG5cdFx0aWYgKHN0YXRlLnJlY29yZGluZyAmJiAhc3RhdGUucGxheWluZylcblx0XHRcdHN0YXRlLnBsYXlpbmc9dHJ1ZTtcblxuXHRcdGlmICghc3RhdGUucGxheWluZylcblx0XHRcdHN0YXRlLmN1cnJlbnRHcmlkSW5kZXg9LTE7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRkZWxldGVTZXF1ZW5jZUNob3JkKHN0YXRlLCBpbmRleCkge1xuXHRcdGxldCBzb25nPXRoaXMuaGVscGVyLmdldEN1cnJlbnRTb25nKHN0YXRlKTtcblx0XHRzb25nLmNob3JkU2VxdWVuY2Uuc3BsaWNlKGluZGV4LDEpO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0c2V0U2VxdWVuY2VDaG9yZChzdGF0ZSwgc2VxdWVuY2VJbmRleCwgY2hvcmRJbmRleCkge1xuXHRcdGxldCBzb25nPXRoaXMuaGVscGVyLmdldEN1cnJlbnRTb25nKHN0YXRlKTtcblx0XHRzb25nLmNob3JkU2VxdWVuY2Vbc2VxdWVuY2VJbmRleF0uY2hvcmRJbmRleD1jaG9yZEluZGV4O1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0Z29CYWNrKHN0YXRlKSB7XG5cdFx0aWYgKHN0YXRlLnNldHRpbmdzVmlzaWJsZSlcblx0XHRcdHJldHVybiB0aGlzLmhpZGVTZXR0aW5ncyhzdGF0ZSk7XG5cblx0XHRlbHNlIGlmIChzdGF0ZS5jdXJyZW50TGF5ZXJJbmRleD49MCkge1xuXHRcdFx0c3RhdGUuY3VycmVudExheWVySW5kZXg9LTE7XG5cdFx0XHRzdGF0ZS5jdXJyZW50R3JpZEluZGV4PS0xO1xuXHRcdFx0cmV0dXJuIHN0YXRlO1xuXHRcdH1cblxuXHRcdGVsc2UgaWYgKHN0YXRlLmFkZExheWVyVmlzaWJsZSlcblx0XHRcdHJldHVybiB0aGlzLmhpZGVBZGRMYXllcihzdGF0ZSk7XG5cblx0XHRlbHNlIGlmICh0aGlzLmhlbHBlci5pc1NvbmdPcGVuKHN0YXRlKSlcblx0XHRcdHJldHVybiB0aGlzLmNsb3NlU29uZyhzdGF0ZSlcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdGdyaWRJbmRleENsaWNrKHN0YXRlLCBuZXdHcmlkSW5kZXgpIHtcblx0XHRzdGF0ZS5wbGF5aW5nPWZhbHNlO1xuXHRcdHN0YXRlLnJlY29yZGluZz1mYWxzZTtcblxuXHRcdGlmIChzdGF0ZS5jdXJyZW50R3JpZEluZGV4PT1uZXdHcmlkSW5kZXgpXG5cdFx0XHRzdGF0ZS5jdXJyZW50R3JpZEluZGV4PS0xO1xuXG5cdFx0ZWxzZVxuXHRcdFx0c3RhdGUuY3VycmVudEdyaWRJbmRleD1uZXdHcmlkSW5kZXg7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHR0b2dnbGVDdXJyZW50TGF5ZXJTdGFjYyhzdGF0ZSkge1xuXHRcdGxldCBsYXllcj10aGlzLmhlbHBlci5nZXRDdXJyZW50TGF5ZXIoc3RhdGUpO1xuXHRcdGxldCBncmlkSW5kZXg9c3RhdGUuY3VycmVudEdyaWRJbmRleDtcblxuXHRcdGlmIChzdGF0ZS5yZWNvcmRpbmcpXG5cdFx0XHRncmlkSW5kZXg9dGhpcy5jb25kdWN0b3IuZ2V0UGxheUdyaWRJbmRleCgpO1xuXG5cdFx0aWYgKGdyaWRJbmRleDwwKVxuXHRcdFx0cmV0dXJuIHN0YXRlO1xuXG5cdFx0bGF5ZXIuc2VxW2dyaWRJbmRleF0uc3RhY2M9IWxheWVyLnNlcVtncmlkSW5kZXhdLnN0YWNjO1xuXHRcdGlmIChsYXllci5zZXFbZ3JpZEluZGV4XS5zdGFjYylcblx0XHRcdGxheWVyLnNlcVtncmlkSW5kZXhdLnNvdW5kcz1bXTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHNldEN1cnJlbnRMYXllclZlbChzdGF0ZSwgdmVsKSB7XG5cdFx0bGV0IGxheWVyPXRoaXMuaGVscGVyLmdldEN1cnJlbnRMYXllcihzdGF0ZSk7XG5cdFx0bGV0IGdyaWRJbmRleD1zdGF0ZS5jdXJyZW50R3JpZEluZGV4O1xuXG5cdFx0aWYgKHN0YXRlLnJlY29yZGluZylcblx0XHRcdGdyaWRJbmRleD10aGlzLmNvbmR1Y3Rvci5nZXRQbGF5R3JpZEluZGV4KCk7XG5cblx0XHRpZiAoZ3JpZEluZGV4PDApXG5cdFx0XHRyZXR1cm4gc3RhdGU7XG5cblx0XHRsYXllci5zZXFbZ3JpZEluZGV4XS52ZWw9dmVsO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0c2V0R3JpZFNvdW5kKHN0YXRlLCBncmlkSW5kZXgsIHNvdW5kSW5kZXgsIGVuYWJsZWQpIHtcblx0XHRsZXQgbGF5ZXI9dGhpcy5oZWxwZXIuZ2V0Q3VycmVudExheWVyKHN0YXRlKTtcblx0XHRsZXQgY3VycmVudEVuYWJsZWQ9XG5cdFx0XHRsYXllci5zZXFbZ3JpZEluZGV4XS5zb3VuZHMuaW5jbHVkZXMoc291bmRJbmRleCk7XG5cblx0XHRpZiAoZW5hYmxlZD09Y3VycmVudEVuYWJsZWQpXG5cdFx0XHRyZXR1cm4gc3RhdGU7XG5cblx0XHRpZiAoZW5hYmxlZCkge1xuXHRcdFx0bGF5ZXIuc2VxW2dyaWRJbmRleF0uc291bmRzLnB1c2goc291bmRJbmRleCk7XG5cdFx0XHRsYXllci5zZXFbZ3JpZEluZGV4XS5zdGFjYz1mYWxzZTtcblx0XHR9XG5cblx0XHRlbHNlIHtcblx0XHRcdGxheWVyLnNlcVtncmlkSW5kZXhdLnNvdW5kcy5zcGxpY2UoXG5cdFx0XHRcdGxheWVyLnNlcVtncmlkSW5kZXhdLnNvdW5kcy5pbmRleE9mKHNvdW5kSW5kZXgpLFxuXHRcdFx0XHQxXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHNldEN1cnJlbnRHcmlkU291bmQoc3RhdGUsIHNvdW5kSW5kZXgsIGVuYWJsZWQpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRHcmlkU291bmQoc3RhdGUsc3RhdGUuY3VycmVudEdyaWRJbmRleCxzb3VuZEluZGV4LGVuYWJsZWQpO1xuXHR9XG5cblx0c291bmRCdXR0b25DbGljayhzdGF0ZSwgc291bmRJbmRleCkge1xuXHRcdGlmIChzdGF0ZS5yZWNvcmRpbmcpIHtcblx0XHRcdHRoaXMuY29uZHVjdG9yLnBsYXlMYXllckluc3RydW1lbnQoc291bmRJbmRleCk7XG5cblx0XHRcdGxldCBncmlkSW5kZXg9dGhpcy5jb25kdWN0b3IuZ2V0UGxheUdyaWRJbmRleCgpO1xuXHRcdFx0c3RhdGU9dGhpcy5zZXRHcmlkU291bmQoc3RhdGUsZ3JpZEluZGV4LHNvdW5kSW5kZXgsdHJ1ZSk7XG5cblx0XHRcdHJldHVybiBzdGF0ZTtcblx0XHR9XG5cblx0XHRpZiAoc3RhdGUuY3VycmVudEdyaWRJbmRleDwwKSB7XG5cdFx0XHR0aGlzLmNvbmR1Y3Rvci5wbGF5TGF5ZXJJbnN0cnVtZW50KHNvdW5kSW5kZXgpO1xuXHRcdFx0cmV0dXJuIHN0YXRlO1xuXHRcdH1cblxuXHRcdGxldCBsYXllcj10aGlzLmhlbHBlci5nZXRDdXJyZW50TGF5ZXIoc3RhdGUpO1xuXHRcdGxldCBlbmFibGVkPWxheWVyLnNlcVtzdGF0ZS5jdXJyZW50R3JpZEluZGV4XS5zb3VuZHMuaW5jbHVkZXMoc291bmRJbmRleCk7XG5cdFx0c3RhdGU9dGhpcy5zZXRDdXJyZW50R3JpZFNvdW5kKHN0YXRlLHNvdW5kSW5kZXgsIWVuYWJsZWQpO1xuXG5cdFx0aWYgKGxheWVyLnNlcVtzdGF0ZS5jdXJyZW50R3JpZEluZGV4XS5zb3VuZHMuaW5jbHVkZXMoc291bmRJbmRleCkpXG5cdFx0XHR0aGlzLmNvbmR1Y3Rvci5wbGF5TGF5ZXJJbnN0cnVtZW50KHNvdW5kSW5kZXgpO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0Y2hvcmRCdXR0b25DbGljayhzdGF0ZSwgb2N0YXZlKSB7XG5cdFx0bGV0IGluc3RydW1lbnQ9dGhpcy5oZWxwZXIuZ2V0Q3VycmVudEluc3RydW1lbnQoc3RhdGUpO1xuXG5cdFx0aWYgKHN0YXRlLnJlY29yZGluZykge1xuXHRcdFx0dGhpcy5jb25kdWN0b3IucGxheUxheWVySW5zdHJ1bWVudChvY3RhdmUqMyk7XG5cdFx0XHR0aGlzLmNvbmR1Y3Rvci5wbGF5TGF5ZXJJbnN0cnVtZW50KG9jdGF2ZSozKzEpO1xuXHRcdFx0dGhpcy5jb25kdWN0b3IucGxheUxheWVySW5zdHJ1bWVudChvY3RhdmUqMysyKTtcblxuXHRcdFx0bGV0IGdyaWRJbmRleD10aGlzLmNvbmR1Y3Rvci5nZXRQbGF5R3JpZEluZGV4KCk7XG5cdFx0XHRzdGF0ZT10aGlzLnNldEdyaWRTb3VuZChzdGF0ZSxncmlkSW5kZXgsb2N0YXZlKjMsdHJ1ZSk7XG5cdFx0XHRzdGF0ZT10aGlzLnNldEdyaWRTb3VuZChzdGF0ZSxncmlkSW5kZXgsb2N0YXZlKjMrMSx0cnVlKTtcblx0XHRcdHN0YXRlPXRoaXMuc2V0R3JpZFNvdW5kKHN0YXRlLGdyaWRJbmRleCxvY3RhdmUqMysyLHRydWUpO1xuXG5cdFx0XHRyZXR1cm4gc3RhdGU7XG5cdFx0fVxuXG5cdFx0aWYgKHN0YXRlLmN1cnJlbnRHcmlkSW5kZXg8MCkge1xuXHRcdFx0dGhpcy5jb25kdWN0b3IucGxheUxheWVySW5zdHJ1bWVudChvY3RhdmUqMyk7XG5cdFx0XHR0aGlzLmNvbmR1Y3Rvci5wbGF5TGF5ZXJJbnN0cnVtZW50KG9jdGF2ZSozKzEpO1xuXHRcdFx0dGhpcy5jb25kdWN0b3IucGxheUxheWVySW5zdHJ1bWVudChvY3RhdmUqMysyKTtcblx0XHRcdHJldHVybiBzdGF0ZTtcblx0XHR9XG5cblx0XHRsZXQgbGF5ZXI9dGhpcy5oZWxwZXIuZ2V0Q3VycmVudExheWVyKHN0YXRlKTtcblx0XHRpZiAodGhpcy5oZWxwZXIuY3VycmVudExheWVySGFzQ2hvcmRBdChzdGF0ZSxzdGF0ZS5jdXJyZW50R3JpZEluZGV4LG9jdGF2ZSkpIHtcblx0XHRcdHN0YXRlPXRoaXMuc2V0Q3VycmVudEdyaWRTb3VuZChzdGF0ZSxvY3RhdmUqMyxmYWxzZSk7XG5cdFx0XHRzdGF0ZT10aGlzLnNldEN1cnJlbnRHcmlkU291bmQoc3RhdGUsb2N0YXZlKjMrMSxmYWxzZSk7XG5cdFx0XHRzdGF0ZT10aGlzLnNldEN1cnJlbnRHcmlkU291bmQoc3RhdGUsb2N0YXZlKjMrMixmYWxzZSk7XG5cdFx0fVxuXG5cdFx0ZWxzZSB7XG5cdFx0XHRzdGF0ZT10aGlzLnNldEN1cnJlbnRHcmlkU291bmQoc3RhdGUsb2N0YXZlKjMsdHJ1ZSk7XG5cdFx0XHRzdGF0ZT10aGlzLnNldEN1cnJlbnRHcmlkU291bmQoc3RhdGUsb2N0YXZlKjMrMSx0cnVlKTtcblx0XHRcdHN0YXRlPXRoaXMuc2V0Q3VycmVudEdyaWRTb3VuZChzdGF0ZSxvY3RhdmUqMysyLHRydWUpO1xuXHRcdFx0dGhpcy5jb25kdWN0b3IucGxheUxheWVySW5zdHJ1bWVudChvY3RhdmUqMyk7XG5cdFx0XHR0aGlzLmNvbmR1Y3Rvci5wbGF5TGF5ZXJJbnN0cnVtZW50KG9jdGF2ZSozKzEpO1xuXHRcdFx0dGhpcy5jb25kdWN0b3IucGxheUxheWVySW5zdHJ1bWVudChvY3RhdmUqMysyKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRhZGRTZWN0aW9uQ2hvcmQoc3RhdGUpIHtcblx0XHRsZXQgc29uZz10aGlzLmhlbHBlci5nZXRDdXJyZW50U29uZyhzdGF0ZSk7XG5cdFx0c29uZy5zZWN0aW9uc1tzdGF0ZS5jdXJyZW50U2VjdGlvbkluZGV4XS5wdXNoKDApO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0c2hvd0VkaXRTZWN0aW9uQ2hvcmQoc3RhdGUsaW5kZXgpIHtcblx0XHRzdGF0ZS5lZGl0U2VjdGlvbkNob3JkVmlzaWJsZT1pbmRleDtcblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRoaWRlRWRpdFNlY3Rpb25DaG9yZChzdGF0ZSxpbmRleCkge1xuXHRcdHN0YXRlLmVkaXRTZWN0aW9uQ2hvcmRWaXNpYmxlPS0xO1xuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHJlbW92ZVNlY3Rpb25DaG9yZChzdGF0ZSkge1xuXHRcdGxldCBzb25nPXRoaXMuaGVscGVyLmdldEN1cnJlbnRTb25nKHN0YXRlKTtcblx0XHRzb25nLnNlY3Rpb25zW3N0YXRlLmN1cnJlbnRTZWN0aW9uSW5kZXhdLnNwbGljZShzdGF0ZS5lZGl0U2VjdGlvbkNob3JkVmlzaWJsZSwxKTtcblxuXHRcdHN0YXRlLmVkaXRTZWN0aW9uQ2hvcmRWaXNpYmxlPS0xO1xuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdGVkaXRTZWN0aW9uQ2hvcmQoc3RhdGUsIGluZGV4KSB7XG5cdFx0bGV0IHNvbmc9dGhpcy5oZWxwZXIuZ2V0Q3VycmVudFNvbmcoc3RhdGUpO1xuXHRcdHNvbmcuc2VjdGlvbnNbc3RhdGUuY3VycmVudFNlY3Rpb25JbmRleF1bc3RhdGUuZWRpdFNlY3Rpb25DaG9yZFZpc2libGVdPWluZGV4O1xuXHRcdHN0YXRlLmVkaXRTZWN0aW9uQ2hvcmRWaXNpYmxlPS0xO1xuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxufVxuIiwiaW1wb3J0IE11c2ljVXRpbCBmcm9tICcuLi91dGlscy9NdXNpY1V0aWwuanMnO1xuY29uc3QgYXBwUGFja2FnZT1yZXF1aXJlKFwiLi4vLi4vcGFja2FnZS5qc29uXCIpO1xuLy9jb25zdCBhcHBQYWNrYWdlPXt2ZXJzaW9uOiBcImFiY1wifTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwSGVscGVyIHtcblx0Y29uc3RydWN0b3IoY29uZHVjdG9yKSB7XG5cdFx0dGhpcy5jb25kdWN0b3I9Y29uZHVjdG9yO1xuXHR9XG5cblx0Z2V0QXBwVmVyc2lvbigpIHtcblx0XHRyZXR1cm4gYXBwUGFja2FnZS52ZXJzaW9uO1xuXHR9XG5cblx0Z2V0Q3VycmVudFNvbmcoc3RhdGUpIHtcblx0XHRyZXR1cm4gc3RhdGUuc29uZ3Nbc3RhdGUuY3VycmVudFNvbmdJbmRleF07XG5cdH1cblxuXHRnZXRDdXJyZW50TGF5ZXIoc3RhdGUpIHtcblx0XHRyZXR1cm4gc3RhdGUuc29uZ3Nbc3RhdGUuY3VycmVudFNvbmdJbmRleF0ubGF5ZXJzW3N0YXRlLmN1cnJlbnRMYXllckluZGV4XTtcblx0fVxuXG5cdGdldEluc3RydW1lbnRCeU5hbWUoc3RhdGUsIG5hbWUpIHtcblx0XHRmb3IgKGxldCBpbnN0cnVtZW50IG9mIHN0YXRlLmluc3RydW1lbnRzKVxuXHRcdFx0aWYgKGluc3RydW1lbnQubmFtZT09bmFtZSlcblx0XHRcdFx0cmV0dXJuIGluc3RydW1lbnQ7XG5cdH1cblxuXHRnZXRJbnN0cnVtZW50TnVtU291bmRzQnlOYW1lKHN0YXRlLCBuYW1lKSB7XG5cdFx0bGV0IGluc3RydW1lbnQ9dGhpcy5nZXRJbnN0cnVtZW50QnlOYW1lKHN0YXRlLG5hbWUpO1xuXG5cdFx0c3dpdGNoIChpbnN0cnVtZW50LnR5cGUpIHtcblx0XHRcdGNhc2UgXCJoYXJtb25pY1wiOlxuXHRcdFx0XHRyZXR1cm4gOTtcblxuXHRcdFx0Y2FzZSBcInBlcmN1c3NpdmVcIjpcblx0XHRcdFx0cmV0dXJuIGluc3RydW1lbnQubGFiZWxzLmxlbmd0aDtcblx0XHR9XG5cdH1cblxuXHRnZXRDdXJyZW50SW5zdHJ1bWVudChzdGF0ZSkge1xuXHRcdGxldCBsYXllcj10aGlzLmdldEN1cnJlbnRMYXllcihzdGF0ZSk7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0SW5zdHJ1bWVudEJ5TmFtZShzdGF0ZSxsYXllci5pbnN0cnVtZW50TmFtZSk7XG5cdH1cblxuXHRnZXRDdXJyZW50SW5zdHJ1bWVudFNvdW5kTGFiZWxzKHN0YXRlKSB7XG5cdFx0bGV0IGluc3RydW1lbnQ9dGhpcy5nZXRDdXJyZW50SW5zdHJ1bWVudChzdGF0ZSk7XG5cblx0XHRzd2l0Y2ggKGluc3RydW1lbnQudHlwZSkge1xuXHRcdFx0Y2FzZSBcImhhcm1vbmljXCI6XG5cdFx0XHRcdHJldHVybiBbXCJUMVwiLFwiVDJcIixcIlQzXCIsXCJPLVQxXCIsXCJPLVQyXCIsXCJPLVQzXCJdO1xuXG5cdFx0XHRjYXNlIFwicGVyY3Vzc2l2ZVwiOlxuXHRcdFx0XHRyZXR1cm4gaW5zdHJ1bWVudC5sYWJlbHM7XG5cdFx0fVxuXHR9XG5cblx0Z2V0Q2hvcmRMYWJlbHMoc3RhdGUpIHtcblx0XHRsZXQgc29uZz10aGlzLmdldEN1cnJlbnRTb25nKHN0YXRlKTtcblx0XHRyZXR1cm4gTXVzaWNVdGlsLmdldENob3JkTmFtZXNGb3JTY2FsZShzb25nLm11c2ljS2V5LHNvbmcubWlub3IpO1xuXHR9XG5cblx0Z2V0Q3VycmVudFNlY3Rpb25DaG9yZExhYmVscyhzdGF0ZSkge1xuXHRcdGxldCBzb25nPXRoaXMuZ2V0Q3VycmVudFNvbmcoc3RhdGUpO1xuXHRcdGxldCBjaG9yZE5hbWVzPU11c2ljVXRpbC5nZXRDaG9yZE5hbWVzRm9yU2NhbGUoc29uZy5tdXNpY0tleSxzb25nLm1pbm9yKTtcblx0XHRsZXQgc2VjdGlvbj1zb25nLnNlY3Rpb25zW3N0YXRlLmN1cnJlbnRTZWN0aW9uSW5kZXhdO1xuXHRcdGxldCBhPVtdO1xuXG5cdFx0Zm9yIChsZXQgaSBvZiBzZWN0aW9uKVxuXHRcdFx0YS5wdXNoKGNob3JkTmFtZXNbaV0pO1xuXG5cdFx0cmV0dXJuIGE7XG5cdH1cblxuXHRnZXROb3Rlc1NlbGVjdE9wdGlvbnMoc3RhdGUpIHtcblx0XHRsZXQgYT1bXTtcblxuXHRcdGZvciAobGV0IG5vdGVOYW1lIG9mIE11c2ljVXRpbC5OT1RFX05BTUVTKVxuXHRcdFx0YS5wdXNoKHtcblx0XHRcdFx0a2V5OiBub3RlTmFtZSwgbGFiZWw6IG5vdGVOYW1lXG5cdFx0XHR9KTtcblxuXHRcdHJldHVybiBhO1xuXHR9XG5cblx0Z2V0Q2hvcmRPcHRpb25zKHN0YXRlKSB7XG5cdFx0bGV0IHNvbmc9dGhpcy5nZXRDdXJyZW50U29uZyhzdGF0ZSk7XG5cdFx0bGV0IGNob3JkTmFtZXM9TXVzaWNVdGlsLmdldENob3JkTmFtZXNGb3JTY2FsZShzb25nLm11c2ljS2V5LHNvbmcubWlub3IpO1xuXHRcdGxldCBhPVtdO1xuXG5cdFx0Zm9yIChsZXQgY2hvcmROYW1lIG9mIGNob3JkTmFtZXMpXG5cdFx0XHRhLnB1c2goe1xuXHRcdFx0XHRrZXk6IGNob3JkTmFtZSxcblx0XHRcdFx0bGFiZWw6IGNob3JkTmFtZVxuXHRcdFx0fSk7XG5cblx0XHRyZXR1cm4gYTtcblx0fVxuXG5cdGdldE1vZGFsU2VsZWN0T3B0aW9ucyhzdGF0ZSkge1xuXHRcdHJldHVybiBbXG5cdFx0XHR7a2V5OiBmYWxzZSwgbGFiZWw6IFwibWFqb3JcIn0sXG5cdFx0XHR7a2V5OiB0cnVlLCBsYWJlbDogXCJtaW5vclwifSxcblx0XHRdO1xuXHR9XG5cblx0Y3VycmVudExheWVySGFzU291bmRBdChzdGF0ZSwgZ3JpZEluZGV4KSB7XG5cdFx0bGV0IGxheWVyPXRoaXMuZ2V0Q3VycmVudExheWVyKHN0YXRlKTtcblxuXHRcdGlmIChsYXllci5zZXFbZ3JpZEluZGV4XS5zb3VuZHMubGVuZ3RoPjApXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGN1cnJlbnRMYXllckhhc0Nob3JkQXQoc3RhdGUsIGdyaWRJbmRleCwgb2N0YXZlKSB7XG5cdFx0bGV0IGxheWVyPXRoaXMuZ2V0Q3VycmVudExheWVyKHN0YXRlKTtcblxuXHRcdGZvciAobGV0IGk9MDsgaTwzOyBpKyspXG5cdFx0XHRpZiAoIWxheWVyLnNlcVtncmlkSW5kZXhdLnNvdW5kcy5pbmNsdWRlcyhvY3RhdmUqMytpKSlcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRpc1NvbmdPcGVuKHN0YXRlKSB7XG5cdFx0cmV0dXJuIChzdGF0ZS5jdXJyZW50U29uZ0luZGV4Pj0wKTtcblx0fVxufVxuIiwiaW1wb3J0IEF1ZGlvVXRpbCBmcm9tICcuLi91dGlscy9BdWRpb1V0aWwnO1xuaW1wb3J0IFJlY29uY2lsZUFycmF5IGZyb20gJy4uL3V0aWxzL1JlY29uY2lsZUFycmF5JztcbmltcG9ydCBDb25kdWN0b3JMYXllciBmcm9tICcuL0NvbmR1Y3RvckxheWVyJztcbmltcG9ydCBDb25kdWN0b3JJbnN0cnVtZW50IGZyb20gJy4vQ29uZHVjdG9ySW5zdHJ1bWVudCc7XG5pbXBvcnQgTXVzaWNVdGlsIGZyb20gJy4uL3V0aWxzL011c2ljVXRpbCc7XG5pbXBvcnQgQXVkaW9UaW1lciBmcm9tICcuLi91dGlscy9BdWRpb1RpbWVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uZHVjdG9yIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0bGV0IEF1ZGlvQ29udGV4dD13aW5kb3cuQXVkaW9Db250ZXh0O1xuXG5cdFx0aWYgKCFBdWRpb0NvbnRleHQpXG5cdFx0XHRBdWRpb0NvbnRleHQ9d2luZG93LndlYmtpdEF1ZGlvQ29udGV4dDtcblxuXHRcdGlmICghQXVkaW9Db250ZXh0KVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwibm8gd2ViIGF1ZGlvIVwiKTtcblxuXHRcdHRoaXMuYXVkaW9Db250ZXh0PW5ldyBBdWRpb0NvbnRleHQoKTtcblx0XHR0aGlzLmF1ZGlvVGltZXI9bmV3IEF1ZGlvVGltZXIodGhpcy5hdWRpb0NvbnRleHQpO1xuXHRcdHRoaXMuYXVkaW9UaW1lci5vblRpY2s9dGhpcy5vblBsYXlUaWNrO1xuXG5cdFx0dGhpcy5pbnN0cnVtZW50cz1SZWNvbmNpbGVBcnJheS5jcmVhdGVXaXRoRmFjdG9yeSh0aGlzLmNyZWF0ZUluc3RydW1lbnQpO1xuXHRcdHRoaXMubGF5ZXJzPVJlY29uY2lsZUFycmF5LmNyZWF0ZVdpdGhGYWN0b3J5KHRoaXMuY3JlYXRlTGF5ZXIpO1xuXHRcdHRoaXMuY3VycmVudE5vdGVzPVtdO1xuXHRcdHRoaXMucGxheWluZ1NlcXVlbmNlSW5kZXg9LTE7XG5cdFx0dGhpcy5wbGF5aW5nU2VxdWVuY2VDaG9yZEluZGV4PS0xO1xuXHR9XG5cblx0bG9hZEluc3RydW1lbnRzKCkge1xuXHRcdGxldCBwcm9taXNlcz1bXTtcblx0XHRmb3IgKGxldCBpbnN0cnVtZW50IG9mIHRoaXMuaW5zdHJ1bWVudHMuZ2V0SXRlbXMoKSlcblx0XHRcdHByb21pc2VzLnB1c2goaW5zdHJ1bWVudC5sb2FkKCkpO1xuXG5cdFx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcblx0fVxuXG5cdGNyZWF0ZUxheWVyPShkYXRhKT0+e1xuXHRcdHJldHVybiBuZXcgQ29uZHVjdG9yTGF5ZXIodGhpcyxkYXRhKTtcblx0fTtcblxuXHRjcmVhdGVJbnN0cnVtZW50PShkYXRhKT0+e1xuXHRcdHJldHVybiBuZXcgQ29uZHVjdG9ySW5zdHJ1bWVudCh0aGlzLGRhdGEpO1xuXHR9O1xuXG5cdGdldENvbmR1Y3Rvckluc3RydW1lbnRCeU5hbWUobmFtZSkge1xuXHRcdGZvciAobGV0IGluc3RydW1lbnQgb2YgdGhpcy5pbnN0cnVtZW50cy5nZXRJdGVtcygpKSB7XG5cdFx0XHRpZiAoaW5zdHJ1bWVudC5nZXROYW1lKCk9PW5hbWUpXG5cdFx0XHRcdHJldHVybiBpbnN0cnVtZW50O1xuXHRcdH1cblx0fVxuXG5cdGdldEN1cnJlbnRDb25kdWN0b3JMYXllcigpIHtcblx0XHRsZXQgc3RhdGU9dGhpcy5zdGF0ZTtcblx0XHRsZXQga2V5PXN0YXRlLnNvbmdzW3N0YXRlLmN1cnJlbnRTb25nSW5kZXhdLmxheWVyc1tzdGF0ZS5jdXJyZW50TGF5ZXJJbmRleF0ua2V5O1xuXG5cdFx0cmV0dXJuIHRoaXMubGF5ZXJzLmdldEl0ZW1CeUtleShrZXkpO1xuXHR9XG5cblx0cGxheUxheWVySW5zdHJ1bWVudChzb3VuZEluZGV4KSB7XG5cdFx0bGV0IGxheWVyPXRoaXMuZ2V0Q3VycmVudENvbmR1Y3RvckxheWVyKCk7XG5cdFx0bGV0IG5vdGU9bGF5ZXIuaW5zdHJ1bWVudC5jcmVhdGVOb3RlKHNvdW5kSW5kZXgpO1xuXHRcdG5vdGUuc2V0Q2hvcmRDZW50cyh0aGlzLmdldEN1cnJlbnRDaG9yZENlbnRzKCkpO1xuXHRcdG5vdGUuY29ubmVjdChsYXllci5kZXN0aW5hdGlvbik7XG5cdFx0bm90ZS5wbGF5Tm93KCk7XG5cdH1cblxuXHRnZXRDdXJyZW50U29uZygpIHtcblx0XHRyZXR1cm4gdGhpcy5zdGF0ZS5zb25nc1t0aGlzLnN0YXRlLmN1cnJlbnRTb25nSW5kZXhdO1xuXHR9XG5cblx0Z2V0Q2hvcmRDZW50cyhjaG9yZEluZGV4KSB7XG5cdFx0bGV0IHNvbmc9dGhpcy5nZXRDdXJyZW50U29uZygpO1xuXHRcdGlmICghc29uZyB8fCBjaG9yZEluZGV4PDApXG5cdFx0XHRyZXR1cm4gWzAsMCwwXTtcblxuXHRcdGxldCBzY2FsZUNob3JkTm90ZXM9TXVzaWNVdGlsLmdldENob3JkTm90ZXNGb3JTY2FsZShzb25nLm11c2ljS2V5LHNvbmcubWlub3IpO1xuXHRcdGxldCBjaG9yZE5vdGVzPXNjYWxlQ2hvcmROb3Rlc1tjaG9yZEluZGV4XTtcblx0XHRyZXR1cm4gW1xuXHRcdFx0TXVzaWNVdGlsLm5vdGVUb0NlbnRzKGNob3JkTm90ZXNbMF0pLFxuXHRcdFx0TXVzaWNVdGlsLm5vdGVUb0NlbnRzKGNob3JkTm90ZXNbMV0pLFxuXHRcdFx0TXVzaWNVdGlsLm5vdGVUb0NlbnRzKGNob3JkTm90ZXNbMl0pXG5cdFx0XTtcblx0fVxuXG5cdGdldEN1cnJlbnRDaG9yZENlbnRzKCkge1xuXHRcdHJldHVybiB0aGlzLmdldENob3JkQ2VudHModGhpcy5zdGF0ZS5jdXJyZW50Q2hvcmRJbmRleCk7XG5cdH1cblxuXHRvbk5vdGVFbmRlZChub3RlKSB7XG5cdFx0bGV0IGlkeD10aGlzLmN1cnJlbnROb3Rlcy5pbmRleE9mKG5vdGUpO1xuXHRcdGlmIChpZHg8MClcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuY3VycmVudE5vdGVzLnNwbGljZShpZHgsMSk7XG5cdH1cblxuXHRnZXRTZWNQZXJHcmlkKCkge1xuXHRcdGxldCBzZWNQZXJCZWF0PTYwL3RoaXMuZ2V0Q3VycmVudFNvbmcoKS5icG07XG5cdFx0bGV0IHNlY1BlckdyaWQ9c2VjUGVyQmVhdC80O1xuXG5cdFx0cmV0dXJuIHNlY1BlckdyaWQ7XG5cdH1cblxuXHRnZXRTZWNQZXJCYXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0U2VjUGVyR3JpZCgpKjE2O1xuXHR9XG5cblx0cGxheUdyaWRTbGljZShhdCwgZ3JpZEluZGV4LCBjaG9yZENlbnRzKSB7XG5cdFx0Zm9yIChsZXQgbGF5ZXIgb2YgdGhpcy5sYXllcnMuZ2V0SXRlbXMoKSkge1xuXHRcdFx0Zm9yIChsZXQgc291bmRJbmRleCBvZiBsYXllci5kYXRhLnNlcVtncmlkSW5kZXhdLnNvdW5kcykge1xuXHRcdFx0XHRsZXQgbm90ZT1sYXllci5pbnN0cnVtZW50LmNyZWF0ZU5vdGUoc291bmRJbmRleCk7XG5cdFx0XHRcdG5vdGUuY29ubmVjdChsYXllci5kZXN0aW5hdGlvbik7XG5cdFx0XHRcdG5vdGUuc2V0Q2hvcmRDZW50cyhjaG9yZENlbnRzKTtcblx0XHRcdFx0bm90ZS5wbGF5U2hlZHVsZWQoYXQsbGF5ZXIuZ2V0Tm90ZUxlbihncmlkSW5kZXgpKnRoaXMuZ2V0U2VjUGVyR3JpZCgpKTtcblx0XHRcdFx0bm90ZS5zZXRWZWxvY2l0eShsYXllci5kYXRhLnNlcVtncmlkSW5kZXhdLnZlbCk7XG5cblx0XHRcdFx0bm90ZS5vbmVuZGVkPXRoaXMub25Ob3RlRW5kZWQuYmluZCh0aGlzLG5vdGUpO1xuXHRcdFx0XHR0aGlzLmN1cnJlbnROb3Rlcy5wdXNoKG5vdGUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHBsYXlCYXIoYXQsIGNob3JkQ2VudHMpIHtcblx0XHRmb3IgKGxldCBncmlkSW5kZXg9MDsgZ3JpZEluZGV4PDE2OyBncmlkSW5kZXgrKykge1xuXHRcdFx0dGhpcy5wbGF5R3JpZFNsaWNlKFxuXHRcdFx0XHRhdCtncmlkSW5kZXgqdGhpcy5nZXRTZWNQZXJHcmlkKCksXG5cdFx0XHRcdGdyaWRJbmRleCxcblx0XHRcdFx0Y2hvcmRDZW50c1xuXHRcdFx0KTtcblx0XHR9XG5cdH1cblxuXHRnZXRQbGF5R3JpZEluZGV4KCkge1xuXHRcdGlmICghdGhpcy5pc1BsYXlpbmcoKSlcblx0XHRcdHJldHVybiAtMTtcblxuXHRcdHJldHVybiB0aGlzLnBsYXlHcmlkSW5kZXg7XG5cdH1cblxuXHRvblBsYXlUaWNrPSh0aWNrSW5kZXgpPT57XG5cdFx0bGV0IHNvbmc9dGhpcy5nZXRDdXJyZW50U29uZygpO1xuXG5cdFx0bGV0IGJhckluZGV4PU1hdGguZmxvb3IodGlja0luZGV4LzE2KTtcblx0XHRsZXQgZ3JpZEluZGV4PXRpY2tJbmRleCUxNjtcblxuXHRcdHRoaXMucGxheUdyaWRJbmRleD1ncmlkSW5kZXg7XG5cblx0XHRpZiAoZ3JpZEluZGV4PT0wICYmIHRoaXMucGxheWluZ1NlcXVlbmNlSW5kZXg+PTApIHtcblx0XHRcdHRoaXMucGxheWluZ1NlcXVlbmNlQ2hvcmRJbmRleCsrO1xuXG5cdFx0XHRpZiAodGhpcy5wbGF5aW5nU2VxdWVuY2VDaG9yZEluZGV4Pj1zb25nLnNlY3Rpb25zW3RoaXMucGxheWluZ1NlcXVlbmNlSW5kZXhdLmxlbmd0aClcblx0XHRcdFx0dGhpcy5wbGF5aW5nU2VxdWVuY2VDaG9yZEluZGV4PTA7XG5cdFx0fVxuXG5cdFx0aWYgKGJhckluZGV4PT0wICYmIHRpY2tJbmRleD09MCkge1xuXHRcdFx0bGV0IGNlbnRzPXRoaXMuZ2V0Q3VycmVudENob3JkQ2VudHMoKTtcblxuXHRcdFx0aWYgKHRoaXMucGxheWluZ1NlcXVlbmNlSW5kZXg+PTApIHtcblx0XHRcdFx0bGV0IGk9dGhpcy5wbGF5aW5nU2VxdWVuY2VDaG9yZEluZGV4O1xuXHRcdFx0XHRjZW50cz10aGlzLmdldENob3JkQ2VudHMoc29uZy5zZWN0aW9uc1t0aGlzLnBsYXlpbmdTZXF1ZW5jZUluZGV4XVtpXSk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMucGxheUJhcihcblx0XHRcdFx0dGhpcy5hdWRpb1RpbWVyLnN0YXJ0VGltZSxcblx0XHRcdFx0Y2VudHNcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKGdyaWRJbmRleD09MTUpIHtcblx0XHRcdGxldCBjZW50cz10aGlzLmdldEN1cnJlbnRDaG9yZENlbnRzKCk7XG5cblx0XHRcdGlmICh0aGlzLnBsYXlpbmdTZXF1ZW5jZUluZGV4Pj0wKSB7XG5cdFx0XHRcdGxldCBpPXRoaXMucGxheWluZ1NlcXVlbmNlQ2hvcmRJbmRleDtcblx0XHRcdFx0aT0oaSsxKSVzb25nLnNlY3Rpb25zW3RoaXMucGxheWluZ1NlcXVlbmNlSW5kZXhdLmxlbmd0aDtcblx0XHRcdFx0Y2VudHM9dGhpcy5nZXRDaG9yZENlbnRzKHNvbmcuc2VjdGlvbnNbdGhpcy5wbGF5aW5nU2VxdWVuY2VJbmRleF1baV0pO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnBsYXlCYXIoXG5cdFx0XHRcdHRoaXMuYXVkaW9UaW1lci5zdGFydFRpbWUrKGJhckluZGV4KzEpKnRoaXMuZ2V0U2VjUGVyQmFyKCksXG5cdFx0XHRcdGNlbnRzXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLm9uUGxheUdyaWRJbmRleENoYW5nZSlcblx0XHRcdHRoaXMub25QbGF5R3JpZEluZGV4Q2hhbmdlKGdyaWRJbmRleCx0aGlzLnBsYXlpbmdTZXF1ZW5jZUNob3JkSW5kZXgpO1xuXHR9XG5cblx0cGxheT0oKT0+e1xuXHRcdGxldCBzb25nPXRoaXMuZ2V0Q3VycmVudFNvbmcoKTtcblx0XHR0aGlzLnBsYXlCcG09c29uZy5icG07XG5cblx0XHR0aGlzLnBsYXlpbmdTZXF1ZW5jZUluZGV4PXRoaXMuc3RhdGUuY3VycmVudFNlY3Rpb25JbmRleDtcblx0XHR0aGlzLnBsYXlpbmdTZXF1ZW5jZUNob3JkSW5kZXg9LTE7XG5cblx0XHR0aGlzLmF1ZGlvVGltZXIuc2V0U3RhcnRUaW1lKHRoaXMuYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lKTtcblx0XHR0aGlzLmF1ZGlvVGltZXIuc2V0VGlja0ludGVydmFsKHRoaXMuZ2V0U2VjUGVyR3JpZCgpKTtcblx0XHR0aGlzLmF1ZGlvVGltZXIuc3RhcnQoKTtcblx0fVxuXG5cdHN0b3AoKSB7XG5cdFx0aWYgKHRoaXMub25QbGF5R3JpZEluZGV4Q2hhbmdlKVxuXHRcdFx0dGhpcy5vblBsYXlHcmlkSW5kZXhDaGFuZ2UoLTEsLTEpO1xuXG5cdFx0dGhpcy5wbGF5QnBtPTA7XG5cdFx0dGhpcy5hdWRpb1RpbWVyLnN0b3AoKTtcblxuXHRcdGZvciAobGV0IG5vdGUgb2YgdGhpcy5jdXJyZW50Tm90ZXMpIHtcblx0XHRcdG5vdGUuc2V0VmVsb2NpdHkoMCk7XG5cdFx0XHRub3RlLm9uZW5kZWQ9bnVsbDtcblx0XHR9XG5cblx0XHR0aGlzLmN1cnJlbnROb3Rlcz1bXTtcblx0fVxuXG5cdGlzUGxheWluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5hdWRpb1RpbWVyLmlzUnVubmluZygpO1xuXHR9XG5cblx0c2V0U3RhdGU9KHN0YXRlKT0+e1xuXHRcdHRoaXMuc3RhdGU9c3RhdGU7XG5cdFx0dGhpcy5pbnN0cnVtZW50cy5zZXREYXRhKHN0YXRlLmluc3RydW1lbnRzKTtcblxuXHRcdGlmICh0aGlzLmdldEN1cnJlbnRTb25nKCkpIHtcblx0XHRcdHRoaXMubGF5ZXJzLnNldERhdGEodGhpcy5nZXRDdXJyZW50U29uZygpLmxheWVycyk7XG5cdFx0XHRpZiAoc3RhdGUucGxheWluZyAmJiAhdGhpcy5pc1BsYXlpbmcoKSlcblx0XHRcdFx0dGhpcy5wbGF5KCk7XG5cblx0XHRcdGVsc2UgaWYgKCFzdGF0ZS5wbGF5aW5nICYmIHRoaXMuaXNQbGF5aW5nKCkpXG5cdFx0XHRcdHRoaXMuc3RvcCgpO1xuXG5cdFx0XHRpZiAodGhpcy5pc1BsYXlpbmcoKSAmJiB0aGlzLnBsYXlCcG0hPXRoaXMuZ2V0Q3VycmVudFNvbmcoKS5icG0pIHtcblx0XHRcdFx0dGhpcy5zdG9wKCk7XG5cdFx0XHRcdHRoaXMucGxheSgpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGVsc2Uge1xuXHRcdFx0dGhpcy5zdG9wKCk7XG5cdFx0XHR0aGlzLmxheWVycy5zZXREYXRhKFtdKTtcblx0XHR9XG5cblx0XHRpZiAoc3RhdGUuY3VycmVudFNlY3Rpb25JbmRleDwwKSB7XG5cdFx0XHR0aGlzLnBsYXlpbmdTZXF1ZW5jZUluZGV4PS0xO1xuXHRcdFx0dGhpcy5wbGF5aW5nU2VxdWVuY2VDaG9yZEluZGV4PS0xXG5cdFx0XHRsZXQgY3VycmVudENob3JkQ2VudHM9dGhpcy5nZXRDdXJyZW50Q2hvcmRDZW50cygpO1xuXHRcdFx0Zm9yIChsZXQgbm90ZSBvZiB0aGlzLmN1cnJlbnROb3Rlcylcblx0XHRcdFx0bm90ZS5zZXRDaG9yZENlbnRzKGN1cnJlbnRDaG9yZENlbnRzKTtcblx0XHR9XG5cblx0XHRlbHNlIGlmIChzdGF0ZS5jdXJyZW50U2VjdGlvbkluZGV4IT10aGlzLnBsYXlpbmdTZXF1ZW5jZUluZGV4KSB7XG5cdFx0XHR0aGlzLnBsYXlpbmdTZXF1ZW5jZUluZGV4PXN0YXRlLmN1cnJlbnRTZWN0aW9uSW5kZXg7XG5cdFx0XHR0aGlzLnBsYXlpbmdTZXF1ZW5jZUNob3JkSW5kZXg9LTE7XG5cdFx0fVxuXHR9O1xufVxuIiwiaW1wb3J0IEF1ZGlvVXRpbCBmcm9tICcuLi91dGlscy9BdWRpb1V0aWwnO1xuaW1wb3J0IE11c2ljVXRpbCBmcm9tICcuLi91dGlscy9NdXNpY1V0aWwnO1xuaW1wb3J0IENvbmR1Y3Rvck5vdGUgZnJvbSAnLi9Db25kdWN0b3JOb3RlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uZHVjdG9ySW5zdHJ1bWVudCB7XG5cdGNvbnN0cnVjdG9yKGNvbmR1Y3RvciwgZGF0YSkge1xuXHRcdHRoaXMuY29uZHVjdG9yPWNvbmR1Y3Rvcjtcblx0XHR0aGlzLmRhdGE9ZGF0YTtcblx0fVxuXG5cdGdldE5hbWUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZGF0YS5uYW1lO1xuXHR9XG5cblx0YXN5bmMgbG9hZCgpIHtcblx0XHRzd2l0Y2ggKHRoaXMuZGF0YS50eXBlKSB7XG5cdFx0XHRjYXNlIFwiaGFybW9uaWNcIjpcblx0XHRcdFx0bGV0IHVybD10aGlzLmRhdGEuc2FtcGxlO1xuXHRcdFx0XHR0aGlzLmJ1ZmZlcj1hd2FpdCBBdWRpb1V0aWwubG9hZEJ1ZmZlcih1cmwsdGhpcy5jb25kdWN0b3IuYXVkaW9Db250ZXh0KTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgXCJwZXJjdXNzaXZlXCI6XG5cdFx0XHRcdHRoaXMuYnVmZmVycz1bXTtcblx0XHRcdFx0Zm9yIChsZXQgdXJsIG9mIHRoaXMuZGF0YS5zYW1wbGVzKVxuXHRcdFx0XHRcdHRoaXMuYnVmZmVycy5wdXNoKGF3YWl0IEF1ZGlvVXRpbC5sb2FkQnVmZmVyKHVybCx0aGlzLmNvbmR1Y3Rvci5hdWRpb0NvbnRleHQpKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cblx0dXBkYXRlKGRhdGEpIHtcblx0fVxuXG5cdGZpbmFsaXplKCkge1xuXHR9XG5cblx0Y3JlYXRlTm90ZShzb3VuZEluZGV4KSB7XG5cdFx0c3dpdGNoICh0aGlzLmRhdGEudHlwZSkge1xuXHRcdFx0Y2FzZSBcImhhcm1vbmljXCI6XG5cdFx0XHRcdGxldCBub3RlPW5ldyBDb25kdWN0b3JOb3RlKHRoaXMuY29uZHVjdG9yLHRoaXMuYnVmZmVyLHNvdW5kSW5kZXgpO1xuXHRcdFx0XHRpZiAodGhpcy5kYXRhLnNhbXBsZU5vdGUpXG5cdFx0XHRcdFx0bm90ZS5zZXRTYW1wbGVOb3RlQ2VudHMoTXVzaWNVdGlsLm5vdGVUb0NlbnRzKHRoaXMuZGF0YS5zYW1wbGVOb3RlKSk7XG5cblx0XHRcdFx0cmV0dXJuIG5vdGU7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIFwicGVyY3Vzc2l2ZVwiOlxuXHRcdFx0XHRyZXR1cm4gbmV3IENvbmR1Y3Rvck5vdGUodGhpcy5jb25kdWN0b3IsdGhpcy5idWZmZXJzW3NvdW5kSW5kZXhdKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uZHVjdG9yTGF5ZXIge1xuXHRjb25zdHJ1Y3Rvcihjb25kdWN0b3IsIGRhdGEpIHtcblx0XHR0aGlzLmNvbmR1Y3Rvcj1jb25kdWN0b3I7XG5cdFx0dGhpcy5kYXRhPWRhdGE7XG5cdFx0dGhpcy5pbnN0cnVtZW50PXRoaXMuY29uZHVjdG9yLmdldENvbmR1Y3Rvckluc3RydW1lbnRCeU5hbWUoZGF0YS5pbnN0cnVtZW50TmFtZSk7XG5cdFx0aWYgKCF0aGlzLmluc3RydW1lbnQpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJUaGVyZSBpcyBubyBpbnN0cnVtZW50ISEhXCIpO1xuXG5cdFx0dGhpcy5nYWluPXRoaXMuY29uZHVjdG9yLmF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCk7XG5cdFx0dGhpcy5nYWluLmNvbm5lY3QodGhpcy5jb25kdWN0b3IuYXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uKTtcblx0XHR0aGlzLnVwZGF0ZUdhaW4oKTtcblxuXHRcdHRoaXMuZGVzdGluYXRpb249dGhpcy5nYWluO1xuXHR9XG5cblx0dXBkYXRlKGRhdGEpIHtcblx0XHR0aGlzLmRhdGE9ZGF0YTtcblx0XHR0aGlzLnVwZGF0ZUdhaW4oKTtcblx0fVxuXG5cdGZpbmFsaXplKCkge1xuXHRcdHRoaXMuZ2Fpbi5kaXNjb25uZWN0KCk7XG5cdH1cblxuXHR1cGRhdGVHYWluKCkge1xuXHRcdGlmICh0aGlzLmRhdGEuYXVkaWJsZSB8fCB0aGlzLmRhdGEuaW5kZXg9PXRoaXMuY29uZHVjdG9yLnN0YXRlLmN1cnJlbnRMYXllckluZGV4KVxuXHRcdFx0dGhpcy5nYWluLmdhaW4udmFsdWU9dGhpcy5kYXRhLnZvbHVtZTtcblxuXHRcdGVsc2Vcblx0XHRcdHRoaXMuZ2Fpbi5nYWluLnZhbHVlPTA7XG5cdH1cblxuXHRoYXNTb3VuZEF0KHBvcykge1xuXHRcdGlmICh0aGlzLmRhdGEuc2VxW3Bvc10uc291bmRzLmxlbmd0aD4wKVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRnZXROb3RlTGVuKHBvcykge1xuXHRcdGZvciAobGV0IGk9MTsgaTx0aGlzLmRhdGEuc2VxLmxlbmd0aDsgaSsrKVxuXHRcdFx0aWYgKHRoaXMuaGFzU291bmRBdCgocG9zK2kpJTE2KVxuXHRcdFx0XHRcdHx8IHRoaXMuZGF0YS5zZXFbKHBvcytpKSUxNl0uc3RhY2MpXG5cdFx0XHRcdHJldHVybiBpO1xuXG5cdFx0cmV0dXJuIDE2O1xuXHR9XG59IiwiaW1wb3J0IE11c2ljVXRpbCBmcm9tICcuLi91dGlscy9NdXNpY1V0aWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25kdWN0b3JOb3RlIHtcblx0Y29uc3RydWN0b3IoY29uZHVjdG9yLCBidWZmZXIsIGNob3JkTm90ZSkge1xuXHRcdHRoaXMuY29uZHVjdG9yPWNvbmR1Y3Rvcjtcblx0XHR0aGlzLmJ1ZmZlcj1idWZmZXI7XG5cblx0XHR0aGlzLmdhaW49dGhpcy5jb25kdWN0b3IuYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKTtcblx0XHR0aGlzLnNvdXJjZT10aGlzLmNvbmR1Y3Rvci5hdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKCk7XG5cdFx0dGhpcy5zb3VyY2UuYnVmZmVyPXRoaXMuYnVmZmVyO1xuXHRcdHRoaXMuc291cmNlLmNvbm5lY3QodGhpcy5nYWluKTtcblx0XHR0aGlzLnNvdXJjZS5vbmVuZGVkPSgpPT57XG5cdFx0XHR0aGlzLmdhaW4uZGlzY29ubmVjdCgpO1xuXHRcdFx0aWYgKHRoaXMub25lbmRlZClcblx0XHRcdFx0dGhpcy5vbmVuZGVkKHRoaXMpO1xuXHRcdH1cblxuXHRcdHRoaXMuY2hvcmROb3RlPWNob3JkTm90ZTtcblx0XHR0aGlzLmNob3JkQ2VudHM9WzAsMTAwLDIwMF07XG5cdFx0dGhpcy5zYW1wbGVOb3RlQ2VudHM9MDtcblx0XHR0aGlzLnVwZGF0ZURldHVuZSgpO1xuXHR9XG5cblx0Y29ubmVjdChkZXN0aW5hdGlvbikge1xuXHRcdHRoaXMuaXNDb25uZWN0ZWQ9dHJ1ZTtcblx0XHR0aGlzLmdhaW4uY29ubmVjdChkZXN0aW5hdGlvbik7XG5cdH1cblxuXHRzZXRTYW1wbGVOb3RlQ2VudHMoY2VudHMpIHtcblx0XHR0aGlzLnNhbXBsZU5vdGVDZW50cz1jZW50cztcblx0XHR0aGlzLnVwZGF0ZURldHVuZSgpO1xuXHR9XG5cblx0c2V0Q2hvcmRDZW50cyhjaG9yZENlbnRzKSB7XG5cdFx0dGhpcy5jaG9yZENlbnRzPWNob3JkQ2VudHM7XG5cdFx0dGhpcy51cGRhdGVEZXR1bmUoKTtcblx0fVxuXG5cdHBsYXlOb3coKSB7XG5cdFx0aWYgKCF0aGlzLmlzQ29ubmVjdGVkKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwibm90ZSBub3QgY29ubmVjdGVkIVwiKTtcblxuXHRcdHRoaXMuc291cmNlLnN0YXJ0KCk7XG5cdH1cblxuXHRwbGF5U2hlZHVsZWQoYXQsIGR1cmF0aW9uKSB7XG5cdFx0aWYgKCF0aGlzLmlzQ29ubmVjdGVkKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwibm90ZSBub3QgY29ubmVjdGVkIVwiKTtcblxuXHRcdHRoaXMuc291cmNlLnN0YXJ0KGF0KTtcblx0XHR0aGlzLnNvdXJjZS5zdG9wKGF0K2R1cmF0aW9uKTtcblx0fVxuXG5cdHVwZGF0ZURldHVuZSgpIHtcblx0XHRsZXQgY2VudHM7XG5cblx0XHRpZiAodGhpcy5jaG9yZE5vdGU9PXVuZGVmaW5lZClcblx0XHRcdGNlbnRzPTA7XG5cblx0XHRlbHNlXG5cdFx0XHRjZW50cz1cblx0XHRcdFx0TXVzaWNVdGlsLk9DVEFWRV9DRU5UUyooTWF0aC5mbG9vcih0aGlzLmNob3JkTm90ZS8zKS0xKStcblx0XHRcdFx0dGhpcy5jaG9yZENlbnRzW3RoaXMuY2hvcmROb3RlJTNdLVxuXHRcdFx0XHR0aGlzLnNhbXBsZU5vdGVDZW50cztcblxuXHRcdGlmICh0aGlzLnNvdXJjZS5kZXR1bmUpXG5cdFx0XHR0aGlzLnNvdXJjZS5kZXR1bmUudmFsdWU9Y2VudHM7XG5cblx0XHRlbHNlXG5cdFx0XHR0aGlzLnNvdXJjZS5wbGF5YmFja1JhdGUudmFsdWU9TXVzaWNVdGlsLnJhdGVGcm9tQ2VudHMoY2VudHMpO1xuXHR9XG5cblx0c2V0VmVsb2NpdHkodmVsKSB7XG5cdFx0dGhpcy5nYWluLmdhaW4udmFsdWU9dmVsO1xuXHR9XG59IiwibW9kdWxlLmV4cG9ydHM9XG5bXG4gICB7XG4gICAgICBcIm5hbWVcIjpcIlN1bW1lcmRlbW9cIixcbiAgICAgIFwiYnBtXCI6MTAwLFxuICAgICAgXCJrZXlcIjpcIkh4d1k2dmFQaFwiLFxuICAgICAgXCJtdXNpY0tleVwiOlwiR1wiLFxuICAgICAgXCJtaW5vclwiOnRydWUsXG4gICAgICBcImxheWVyc1wiOltcbiAgICAgICAgIHtcbiAgICAgICAgICAgIFwia2V5XCI6XCJkVUc4Rko0cE5cIixcbiAgICAgICAgICAgIFwiaW5zdHJ1bWVudE5hbWVcIjpcIkRydW1zXCIsXG4gICAgICAgICAgICBcImF1ZGlibGVcIjp0cnVlLFxuICAgICAgICAgICAgXCJ2b2x1bWVcIjoxLFxuICAgICAgICAgICAgXCJzZXFcIjpbXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOlswXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOls3XSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MC4yNSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOlswXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjAuNSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6WzVdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjowLjUsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOls3XSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MC4yNSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6WzBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6WzddLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjowLjI1LFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6WzhdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbNV0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjAuNSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOls3XSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MC4yNSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFwiaW5kZXhcIjpcIjBcIlxuICAgICAgICAgfSxcbiAgICAgICAgIHtcbiAgICAgICAgICAgIFwia2V5XCI6XCJKUHNnU3NIQmVcIixcbiAgICAgICAgICAgIFwiaW5zdHJ1bWVudE5hbWVcIjpcIlN0cmluZyBCYXNzXCIsXG4gICAgICAgICAgICBcImF1ZGlibGVcIjp0cnVlLFxuICAgICAgICAgICAgXCJ2b2x1bWVcIjoxLFxuICAgICAgICAgICAgXCJzZXFcIjpbXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOlswXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6dHJ1ZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6WzBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6dHJ1ZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6WzJdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFwiaW5kZXhcIjpcIjFcIlxuICAgICAgICAgfSxcbiAgICAgICAgIHtcbiAgICAgICAgICAgIFwia2V5XCI6XCJjd1lJbjJ4cERcIixcbiAgICAgICAgICAgIFwiaW5zdHJ1bWVudE5hbWVcIjpcIlBpYW5vXCIsXG4gICAgICAgICAgICBcImF1ZGlibGVcIjp0cnVlLFxuICAgICAgICAgICAgXCJ2b2x1bWVcIjowLjE1LFxuICAgICAgICAgICAgXCJzZXFcIjpbXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6WzMsNCw1XSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MC41LFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MC41LFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjowLjI1LFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6WzMsNCw1XSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MC41LFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6WzMsNCw1XSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6WzMsNCw1XSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MC4yNSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBcImluZGV4XCI6XCIyXCJcbiAgICAgICAgIH0sXG4gICAgICAgICB7XG4gICAgICAgICAgICBcImtleVwiOlwiYlc2VVpmRlZTXCIsXG4gICAgICAgICAgICBcImluc3RydW1lbnROYW1lXCI6XCJLb3JnIE9yZ2FuXCIsXG4gICAgICAgICAgICBcImF1ZGlibGVcIjp0cnVlLFxuICAgICAgICAgICAgXCJ2b2x1bWVcIjowLjQ0LFxuICAgICAgICAgICAgXCJzZXFcIjpbXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOlswXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6WzMsNCw1XSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MC41LFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6dHJ1ZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFwiaW5kZXhcIjpcIjNcIlxuICAgICAgICAgfSxcbiAgICAgICAgIHtcbiAgICAgICAgICAgIFwia2V5XCI6XCJQXzNIQ1NqQWdcIixcbiAgICAgICAgICAgIFwiaW5zdHJ1bWVudE5hbWVcIjpcIkNsYXZcIixcbiAgICAgICAgICAgIFwiYXVkaWJsZVwiOnRydWUsXG4gICAgICAgICAgICBcInZvbHVtZVwiOjAuNjksXG4gICAgICAgICAgICBcInNlcVwiOltcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjAuMjUsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6dHJ1ZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjowLjUsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjowLjI1LFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MC41LFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjAuNSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjAuMjUsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjowLjI1LFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6WzFdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbMl0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjAuNSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6WzBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgXCJpbmRleFwiOlwiNFwiXG4gICAgICAgICB9LFxuICAgICAgICAge1xuICAgICAgICAgICAgXCJrZXlcIjpcIkNKQXRnenFseVwiLFxuICAgICAgICAgICAgXCJpbnN0cnVtZW50TmFtZVwiOlwiUGlhbm9cIixcbiAgICAgICAgICAgIFwiYXVkaWJsZVwiOnRydWUsXG4gICAgICAgICAgICBcInZvbHVtZVwiOjAuMTEsXG4gICAgICAgICAgICBcInNlcVwiOltcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6WzYsNyw4XSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W10sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6dHJ1ZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6WzYsNyw4XSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MC41LFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjp0cnVlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG4gICAgICAgICAgICAgICAgICAgICA2LFxuICAgICAgICAgICAgICAgICAgICAgNyxcbiAgICAgICAgICAgICAgICAgICAgIDhcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjAuNSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOnRydWVcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcbiAgICAgICAgICAgICAgICAgICAgIDYsXG4gICAgICAgICAgICAgICAgICAgICA3LFxuICAgICAgICAgICAgICAgICAgICAgOFxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MC4yNSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOnRydWVcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcbiAgICAgICAgICAgICAgICAgICAgIDYsXG4gICAgICAgICAgICAgICAgICAgICA3LFxuICAgICAgICAgICAgICAgICAgICAgOFxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MC41LFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG5cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6dHJ1ZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgNixcbiAgICAgICAgICAgICAgICAgICAgIDcsXG4gICAgICAgICAgICAgICAgICAgICA4XG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjowLjUsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjp0cnVlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG4gICAgICAgICAgICAgICAgICAgICA2LFxuICAgICAgICAgICAgICAgICAgICAgNyxcbiAgICAgICAgICAgICAgICAgICAgIDhcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjp0cnVlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG4gICAgICAgICAgICAgICAgICAgICA2LFxuICAgICAgICAgICAgICAgICAgICAgNyxcbiAgICAgICAgICAgICAgICAgICAgIDhcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjAuMjUsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjp0cnVlXG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgXCJpbmRleFwiOlwiNVwiXG4gICAgICAgICB9XG4gICAgICBdLFxuICAgICAgXCJjaG9yZFNlcXVlbmNlXCI6W1xuICAgICAgICAge1xuICAgICAgICAgICAgXCJjaG9yZEluZGV4XCI6MCxcbiAgICAgICAgICAgIFwia2V5XCI6XCJNamgzR1l3a1pnXCJcbiAgICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBcInNlY3Rpb25zXCI6W1xuICAgICAgICAgW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICA0LFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDMsXG4gICAgICAgICAgICAzLFxuICAgICAgICAgICAgNCxcbiAgICAgICAgICAgIDRcbiAgICAgICAgIF0sXG4gICAgICAgICBbXG4gICAgICAgICAgICAyLFxuICAgICAgICAgICAgNixcbiAgICAgICAgICAgIDUsXG4gICAgICAgICAgICAwXG4gICAgICAgICBdLFxuICAgICAgICAgW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDMsXG4gICAgICAgICAgICAzLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICA0LFxuICAgICAgICAgICAgMyxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwXG4gICAgICAgICBdXG4gICAgICBdXG4gICB9LFxuICAge1xuICAgICAgXCJuYW1lXCI6XCJCb3lzdHJpbmdzXCIsXG4gICAgICBcImJwbVwiOjEwMCxcbiAgICAgIFwia2V5XCI6XCJLUGM1bXhlUkdcIixcbiAgICAgIFwibXVzaWNLZXlcIjpcIkNcIixcbiAgICAgIFwibWlub3JcIjpmYWxzZSxcbiAgICAgIFwibGF5ZXJzXCI6W1xuICAgICAgICAge1xuICAgICAgICAgICAgXCJrZXlcIjpcImlBZkJ0VkFrYlwiLFxuICAgICAgICAgICAgXCJpbnN0cnVtZW50TmFtZVwiOlwiU3RyaW5nc1wiLFxuICAgICAgICAgICAgXCJhdWRpYmxlXCI6dHJ1ZSxcbiAgICAgICAgICAgIFwidm9sdW1lXCI6MC4xMyxcbiAgICAgICAgICAgIFwic2VxXCI6W1xuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG4gICAgICAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICAgICAgIDJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG5cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG5cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG5cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG5cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG5cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBcImluZGV4XCI6XCIwXCJcbiAgICAgICAgIH0sXG4gICAgICAgICB7XG4gICAgICAgICAgICBcImtleVwiOlwiOGdJUlU2Skk5XCIsXG4gICAgICAgICAgICBcImluc3RydW1lbnROYW1lXCI6XCJTdHJpbmcgQmFzc1wiLFxuICAgICAgICAgICAgXCJhdWRpYmxlXCI6dHJ1ZSxcbiAgICAgICAgICAgIFwidm9sdW1lXCI6MSxcbiAgICAgICAgICAgIFwic2VxXCI6W1xuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG4gICAgICAgICAgICAgICAgICAgICAzXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG5cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG5cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG5cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG5cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgMlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG4gICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG5cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBcImluZGV4XCI6XCIxXCJcbiAgICAgICAgIH0sXG4gICAgICAgICB7XG4gICAgICAgICAgICBcImtleVwiOlwiSkhRWmJ4cVhIXCIsXG4gICAgICAgICAgICBcImluc3RydW1lbnROYW1lXCI6XCJQaWFub1wiLFxuICAgICAgICAgICAgXCJhdWRpYmxlXCI6dHJ1ZSxcbiAgICAgICAgICAgIFwidm9sdW1lXCI6MC4yNSxcbiAgICAgICAgICAgIFwic2VxXCI6W1xuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG4gICAgICAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICAgICAgIDJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG5cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG5cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG5cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG5cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG5cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBcImluZGV4XCI6XCIyXCJcbiAgICAgICAgIH0sXG4gICAgICAgICB7XG4gICAgICAgICAgICBcImtleVwiOlwidVJKcFpxM3NvXCIsXG4gICAgICAgICAgICBcImluc3RydW1lbnROYW1lXCI6XCJEcnVtc1wiLFxuICAgICAgICAgICAgXCJhdWRpYmxlXCI6dHJ1ZSxcbiAgICAgICAgICAgIFwidm9sdW1lXCI6MSxcbiAgICAgICAgICAgIFwic2VxXCI6W1xuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG4gICAgICAgICAgICAgICAgICAgICA1LFxuICAgICAgICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjowLjI1LFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG4gICAgICAgICAgICAgICAgICAgICA0XG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG4gICAgICAgICAgICAgICAgICAgICA3XG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjowLjI1LFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG4gICAgICAgICAgICAgICAgICAgICA0LFxuICAgICAgICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgN1xuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MC4yNSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgNVxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjowLjI1LFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG4gICAgICAgICAgICAgICAgICAgICA1LFxuICAgICAgICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgN1xuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MC4yNSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgNFxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjowLjI1LFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG4gICAgICAgICAgICAgICAgICAgICA0LFxuICAgICAgICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjowLjI1LFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG4gICAgICAgICAgICAgICAgICAgICA1XG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG4gICAgICAgICAgICAgICAgICAgICA3XG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjowLjI1LFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgXCJpbmRleFwiOlwiM1wiXG4gICAgICAgICB9LFxuICAgICAgICAge1xuICAgICAgICAgICAgXCJrZXlcIjpcIkNqTzV0Um9vWlwiLFxuICAgICAgICAgICAgXCJpbnN0cnVtZW50TmFtZVwiOlwiUGlhbm9cIixcbiAgICAgICAgICAgIFwiYXVkaWJsZVwiOnRydWUsXG4gICAgICAgICAgICBcInZvbHVtZVwiOjAuMjUsXG4gICAgICAgICAgICBcInNlcVwiOltcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG5cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG5cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcbiAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgMlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG5cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwic291bmRzXCI6W1xuXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJ2ZWxcIjoxLFxuICAgICAgICAgICAgICAgICAgXCJzdGFjY1wiOmZhbHNlXG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJzb3VuZHNcIjpbXG5cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcbiAgICAgICAgICAgICAgICAgICAgIDNcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInZlbFwiOjEsXG4gICAgICAgICAgICAgICAgICBcInN0YWNjXCI6ZmFsc2VcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInNvdW5kc1wiOltcblxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwidmVsXCI6MSxcbiAgICAgICAgICAgICAgICAgIFwic3RhY2NcIjpmYWxzZVxuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFwiaW5kZXhcIjpcIjRcIlxuICAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIFwiY2hvcmRTZXF1ZW5jZVwiOltcbiAgICAgICAgIHtcbiAgICAgICAgICAgIFwiY2hvcmRJbmRleFwiOjAsXG4gICAgICAgICAgICBcImtleVwiOlwiQWt5UXZ4bmw4b1wiXG4gICAgICAgICB9XG4gICAgICBdLFxuICAgICAgXCJzZWN0aW9uc1wiOltcbiAgICAgICAgIFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICA0LFxuICAgICAgICAgICAgMyxcbiAgICAgICAgICAgIDVcbiAgICAgICAgIF0sXG4gICAgICAgICBbXG4gICAgICAgICAgICAwXG4gICAgICAgICBdLFxuICAgICAgICAgW1xuICAgICAgICAgICAgMFxuICAgICAgICAgXVxuICAgICAgXVxuICAgfVxuXVxuOyIsImltcG9ydCB7IGgsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5cbmNsYXNzIEFwcENvbnRleHQgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKTtcblxuXHRcdHRoaXMuY3VycmllZD17fTtcblxuXHRcdGZvciAobGV0IGtleSBvZiB0aGlzLmdldE9iamVjdEtleXMocHJvcHMuY29udHJvbGxlcikpIHtcblx0XHRcdHRoaXMuY3VycmllZFtrZXldPSguLi5hcmdzKT0+e1xuXG5cdFx0XHRcdGlmICh0aGlzLnByb3BzLmxvZ0FjdGlvbnMpXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJBY3Rpb246IFwiK2tleStcIiAoXCIrYXJncytcIilcIik7XG5cblx0XHRcdFx0Zm9yIChsZXQgaSBpbiBhcmdzKSB7XG5cdFx0XHRcdFx0aWYgKGFyZ3NbaV0gaW5zdGFuY2VvZiBFdmVudCkge1xuXHRcdFx0XHRcdFx0aWYgKGFyZ3NbaV0udHlwZT09XCJtb3VzZWRvd25cIiAmJiBhcmdzW2ldLmJ1dHRvbj09Milcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXG5cdFx0XHRcdFx0XHRhcmdzW2ldLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRhcmdzW2ldLnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0XHRcdFx0XHRpZiAoYXJnc1tpXS50eXBlPT1cImNoYW5nZVwiKSB7XG5cdFx0XHRcdFx0XHRcdGFyZ3NbaV09YXJnc1tpXS50YXJnZXQudmFsdWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0bGV0IG5ld1N0YXRlPXByb3BzLmNvbnRyb2xsZXJba2V5XSh0aGlzLnN0YXRlLCAuLi5hcmdzKTtcblx0XHRcdFx0aWYgKG5ld1N0YXRlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuXHRcdFx0XHRcdGlmICghdGhpcy5zdGF0ZSlcblx0XHRcdFx0XHRcdHRoaXMuc3RhdGU9e2J1c3k6IHRydWV9O1xuXG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdFx0XHRcdGJ1c3k6IHRydWVcblx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0bmV3U3RhdGUudGhlbigoc3RhdGUpPT57XG5cdFx0XHRcdFx0XHRzdGF0ZS5idXN5PWZhbHNlO1xuXHRcdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZShzdGF0ZSk7XG5cdFx0XHRcdFx0XHR0aGlzLm5vdGlmeVN0YXRlQ2hhbmdlKHN0YXRlKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGlmICghdGhpcy5zdGF0ZSlcblx0XHRcdFx0XHRcdHRoaXMuc3RhdGU9bmV3U3RhdGU7XG5cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKG5ld1N0YXRlKTtcblxuXHRcdFx0XHRcdHRoaXMubm90aWZ5U3RhdGVDaGFuZ2UobmV3U3RhdGUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Zm9yIChsZXQga2V5IG9mIHRoaXMuZ2V0T2JqZWN0S2V5cyhwcm9wcy5oZWxwZXIpKSB7XG5cdFx0XHR0aGlzLmN1cnJpZWRba2V5XT0oLi4uYXJncyk9Pntcblx0XHRcdFx0cmV0dXJuIHByb3BzLmhlbHBlcltrZXldKHRoaXMuc3RhdGUsIC4uLmFyZ3MpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChwcm9wcy5pbml0QWN0aW9uKVxuXHRcdFx0dGhpcy5jdXJyaWVkW3Byb3BzLmluaXRBY3Rpb25dKCk7XG5cdH1cblxuXHRub3RpZnlTdGF0ZUNoYW5nZShzdGF0ZSkge1xuXHRcdGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vblN0YXRlQ2hhbmdlPT1cImZ1bmN0aW9uXCIpXG5cdFx0XHR0aGlzLnByb3BzLm9uU3RhdGVDaGFuZ2Uoc3RhdGUpO1xuXHR9XG5cblx0Z2V0T2JqZWN0S2V5cyhvKSB7XG5cdFx0bGV0IGtleXM9W107XG5cdFx0bz1PYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7XG5cdFx0d2hpbGUgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG8pLmluZGV4T2YoXCJfX3Byb3RvX19cIik8MCkge1xuXHRcdFx0a2V5cz1rZXlzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvKSk7XG5cdFx0XHRvPU9iamVjdC5nZXRQcm90b3R5cGVPZihvKTtcblx0XHR9XG5cblx0XHRpZiAoa2V5cy5pbmNsdWRlcyhcImNvbnN0cnVjdG9yXCIpKVxuXHRcdFx0a2V5cy5zcGxpY2Uoa2V5cy5pbmRleE9mKFwiY29uc3RydWN0b3JcIiksMSk7XG5cblx0XHRyZXR1cm4ga2V5cztcblx0fVxuXG5cdGdldENoaWxkQ29udGV4dCgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Li4udGhpcy5zdGF0ZSxcblx0XHRcdC4uLnRoaXMuY3VycmllZFxuXHRcdH07XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW47XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFwcENvbnRleHQ7IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXVkaW9UaW1lciB7XG5cdGNvbnN0cnVjdG9yKGF1ZGlvQ29udGV4dCkge1xuXHRcdHRoaXMuYXVkaW9Db250ZXh0PWF1ZGlvQ29udGV4dDtcblx0XHR0aGlzLnRpbWVvdXQ9bnVsbDtcblx0fVxuXG5cdHByb2Nlc3NUaWNrcz0oKT0+e1xuXHRcdGxldCBjdXJyZW50VGltZT10aGlzLmF1ZGlvQ29udGV4dC5jdXJyZW50VGltZTtcblx0XHQvL2NvbnNvbGUubG9nKFwiY2FsbGVkIGF0OiBcIitjdXJyZW50VGltZSk7XG5cblx0XHR3aGlsZSAodGhpcy5zdGFydFRpbWUrdGhpcy5kZWxpdmVyZWRUaWNrcyp0aGlzLnRpY2tJbnRlcnZhbDw9Y3VycmVudFRpbWUpIHtcblx0XHRcdHRoaXMub25UaWNrKHRoaXMuZGVsaXZlcmVkVGlja3MpO1xuXHRcdFx0dGhpcy5kZWxpdmVyZWRUaWNrcysrO1xuXHRcdH1cblxuXHRcdGxldCBuZXh0QXQ9dGhpcy5zdGFydFRpbWUrKHRoaXMuZGVsaXZlcmVkVGlja3MpKnRoaXMudGlja0ludGVydmFsO1xuXHRcdGxldCB1bnRpbE5leHQ9bmV4dEF0LXRoaXMuYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lO1xuXHRcdC8vY29uc29sZS5sb2coXCJuZXh0IGF0OiBcIituZXh0QXQrXCIgaW46IFwiK3VudGlsTmV4dCk7XG5cblx0XHR0aGlzLnRpbWVvdXQ9c2V0VGltZW91dCh0aGlzLnByb2Nlc3NUaWNrcyx1bnRpbE5leHQqMTAwMCk7XG5cdH1cblxuXHRzdGFydCgpIHtcblx0XHR0aGlzLnN0b3AoKTtcblx0XHR0aGlzLmRlbGl2ZXJlZFRpY2tzPTA7XG5cblx0XHR0aGlzLnByb2Nlc3NUaWNrcygpO1xuXHR9XG5cblx0c3RvcCgpIHtcblx0XHRjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcblx0XHR0aGlzLnRpbWVvdXQ9bnVsbDtcblx0fVxuXG5cdHNldFN0YXJ0VGltZShzdGFydFRpbWUpIHtcblx0XHRpZiAodGhpcy5pc1J1bm5pbmcoKSlcblx0XHRcdHRocm93IG5ldyBFcnJvcihcImNhbid0IGNoYW5nZSBzdGFydCB0aW1lIHdoaWxlIHJ1bm5pbmchISFcIik7XG5cblx0XHR0aGlzLnN0YXJ0VGltZT1zdGFydFRpbWU7XG5cdH1cblxuXHRzZXRUaWNrSW50ZXJ2YWwodGlja0ludGVydmFsKSB7XG5cdFx0aWYgKHRoaXMuaXNSdW5uaW5nKCkpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjYW4ndCBjaGFuZ2UgdGljayBpbnRlcnZhbCB3aGlsZSBydW5uaW5nISEhXCIpO1xuXG5cdFx0dGhpcy50aWNrSW50ZXJ2YWw9dGlja0ludGVydmFsO1xuXHR9XG5cblx0aXNSdW5uaW5nKCkge1xuXHRcdHJldHVybiAhIXRoaXMudGltZW91dDtcblx0fVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1ZGlvVXRpbCB7XG5cdHN0YXRpYyBsb2FkQnVmZmVyKHVybCwgY29udGV4dCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuXHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRcdHJlcXVlc3Qub3BlbignR0VUJywgdXJsLCB0cnVlKTtcblx0XHRcdHJlcXVlc3QucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJztcblxuXHRcdFx0cmVxdWVzdC5vbmxvYWQ9KCk9Pntcblx0XHRcdFx0Y29udGV4dC5kZWNvZGVBdWRpb0RhdGEocmVxdWVzdC5yZXNwb25zZSxcblx0XHRcdFx0XHQoYnVmZmVyKT0+e1xuXHRcdFx0XHRcdFx0cmVzb2x2ZShidWZmZXIpO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0KGUpPT57XG5cdFx0XHRcdFx0XHRyZWplY3QoZSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdCk7XG5cdFx0XHR9O1xuXHRcdFx0cmVxdWVzdC5zZW5kKCk7XG5cdFx0fSlcblx0fVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXVzaWNVdGlsIHtcblx0c3RhdGljIE9DVEFWRV9DRU5UUz0xMjAwO1xuXHRzdGF0aWMgTk9URV9OQU1FUz1bXCJBXCIsXCJBI1wiLFwiQlwiLFwiQ1wiLFwiQyNcIixcIkRcIixcIkQjXCIsXCJFXCIsXCJGXCIsXCJGI1wiLFwiR1wiLFwiRyNcIl07XG5cblx0c3RhdGljIHJhdGVGcm9tQ2VudHMoY2VudHMpIHtcblx0XHRsZXQgbWlkZGxlQ0ZyZXE9MjYxLjYzO1xuXHRcdGxldCBmcmVxPW1pZGRsZUNGcmVxKk1hdGgucG93KDIsY2VudHMvMTIwMCk7XG5cdFx0bGV0IHJhdGU9ZnJlcS9taWRkbGVDRnJlcTtcblxuXHRcdHJldHVybiByYXRlO1xuXHR9XG5cblx0c3RhdGljIG5vdGVUb0NlbnRzKHMpIHtcblx0XHRzd2l0Y2ggKHMudG9VcHBlckNhc2UoKSkge1xuXHRcdFx0Y2FzZSBcIkNcIjpcblx0XHRcdGNhc2UgXCJcIjpcblx0XHRcdFx0cmV0dXJuIDA7XG5cblx0XHRcdGNhc2UgXCJDI1wiOlxuXHRcdFx0XHRyZXR1cm4gMTAwO1xuXG5cdFx0XHRjYXNlIFwiRFwiOlxuXHRcdFx0XHRyZXR1cm4gMjAwO1xuXG5cdFx0XHRjYXNlIFwiRCNcIjpcblx0XHRcdFx0cmV0dXJuIDMwMDtcblxuXHRcdFx0Y2FzZSBcIkVcIjpcblx0XHRcdFx0cmV0dXJuIDQwMDtcblxuXHRcdFx0Y2FzZSBcIkZcIjpcblx0XHRcdFx0cmV0dXJuIDUwMDtcblxuXHRcdFx0Y2FzZSBcIkYjXCI6XG5cdFx0XHRcdHJldHVybiA2MDA7XG5cblx0XHRcdGNhc2UgXCJHXCI6XG5cdFx0XHRcdHJldHVybiA3MDA7XG5cblx0XHRcdGNhc2UgXCJHI1wiOlxuXHRcdFx0XHRyZXR1cm4gODAwO1xuXG5cdFx0XHRjYXNlIFwiQVwiOlxuXHRcdFx0XHRyZXR1cm4gOTAwO1xuXG5cdFx0XHRjYXNlIFwiQSNcIjpcblx0XHRcdFx0cmV0dXJuIDEwMDA7XG5cblx0XHRcdGNhc2UgXCJCXCI6XG5cdFx0XHRcdHJldHVybiAxMTAwO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBnZXROb3Rlc0ZvclNjYWxlKHNjYWxlLCBtaW5vcikge1xuXHRcdGxldCBzdGFydEluZGV4PU11c2ljVXRpbC5OT1RFX05BTUVTLmluZGV4T2Yoc2NhbGUpO1xuXHRcdGlmIChzdGFydEluZGV4PDApXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJubyBzdWNoIHNjYWxlOiBcIitzY2FsZSk7XG5cblx0XHRsZXQgbm90ZUluZGVjZXM9WzAsMiw0LDUsNyw5LDExXTtcblx0XHRpZiAobWlub3IpXG5cdFx0XHRub3RlSW5kZWNlcz1bMCwyLDMsNSw3LDgsMTBdO1xuXG5cdFx0bGV0IHJlcz1bXTtcblx0XHRmb3IgKGxldCBpbmRleCBvZiBub3RlSW5kZWNlcylcblx0XHRcdHJlcy5wdXNoKE11c2ljVXRpbC5OT1RFX05BTUVTWyhzdGFydEluZGV4K2luZGV4KSUxMl0pO1xuXG5cdFx0cmV0dXJuIHJlcztcblx0fVxuXG5cdHN0YXRpYyBnZXRDaG9yZE5vdGVzRm9yU2NhbGUoc2NhbGUsIG1pbm9yKSB7XG5cdFx0bGV0IG5vdGVOYW1lcz1NdXNpY1V0aWwuZ2V0Tm90ZXNGb3JTY2FsZShzY2FsZSxtaW5vcik7XG5cblx0XHRsZXQgcmVzPVtdO1xuXHRcdGZvciAobGV0IGk9MDsgaTwxMjsgaSsrKVxuXHRcdFx0cmVzLnB1c2goW1xuXHRcdFx0XHRub3RlTmFtZXNbKGkpJTddLFxuXHRcdFx0XHRub3RlTmFtZXNbKGkrMiklN10sXG5cdFx0XHRcdG5vdGVOYW1lc1soaSs0KSU3XSxcblx0XHRcdF0pO1xuXG5cdFx0cmV0dXJuIHJlcztcblx0fVxuXG5cdHN0YXRpYyBnZXRDaG9yZE5hbWVzRm9yU2NhbGUoc2NhbGUsIG1pbm9yKSB7XG5cdFx0bGV0IHByZWZpeGVzPVtcIlwiLFwiLVwiLFwiLVwiLFwiXCIsXCJcIixcIi1cIixcIm9cIl07XG5cdFx0aWYgKG1pbm9yKVxuXHRcdFx0cHJlZml4ZXM9W1wiLVwiLFwib1wiLFwiXCIsXCItXCIsXCItXCIsXCJcIixcIlwiXTtcblxuXHRcdGxldCBub3RlTmFtZXM9TXVzaWNVdGlsLmdldE5vdGVzRm9yU2NhbGUoc2NhbGUsbWlub3IpO1xuXHRcdGxldCByZXM9W107XG5cdFx0Zm9yIChsZXQgaW5kZXggaW4gbm90ZU5hbWVzKVxuXHRcdFx0cmVzLnB1c2gobm90ZU5hbWVzW2luZGV4XStwcmVmaXhlc1tpbmRleF0pO1xuXG5cdFx0cmV0dXJuIHJlcztcblx0fVxufSIsImltcG9ydCB7IGgsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5cbmV4cG9ydCBjbGFzcyBTZWxlY3Qge1xuXHRvbkNoYW5nZT0oZSk9Pntcblx0XHRpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSlcblx0XHRcdHRoaXMucHJvcHMub25DaGFuZ2UoSlNPTi5wYXJzZShlLnRhcmdldC52YWx1ZSkpO1xuXG5cdFx0aWYgKHRoaXMucHJvcHMub25JbmRleENoYW5nZSlcblx0XHRcdHRoaXMucHJvcHMub25JbmRleENoYW5nZShlLnRhcmdldC5zZWxlY3RlZEluZGV4KTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRsZXQgcHJvcHM9dGhpcy5wcm9wcztcblxuXHRcdGlmICghcHJvcHMubGFiZWxGaWVsZClcblx0XHRcdHByb3BzLmxhYmVsRmllbGQ9XCJsYWJlbFwiO1xuXG5cdFx0aWYgKCFwcm9wcy5vcHRpb25zKVxuXHRcdFx0cHJvcHMub3B0aW9ucz1bXTtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8c2VsZWN0IGNsYXNzPXtwcm9wcy5jbGFzc31cblx0XHRcdFx0XHRzdHlsZT17cHJvcHMuc3R5bGV9XG5cdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG5cdFx0XHRcdFx0a2V5PXtwcm9wcy5rZXl9PlxuXHRcdFx0XHR7cHJvcHMub3B0aW9ucy5tYXAoKG9wdGlvbiwgaW5kZXgpPT57XG5cdFx0XHRcdFx0bGV0IHNlbGVjdGVkPWZhbHNlO1xuXG5cdFx0XHRcdFx0aWYgKHByb3BzLmhhc093blByb3BlcnR5KCdzZWxlY3RlZEluZGV4JykgJiZcblx0XHRcdFx0XHRcdFx0aW5kZXg9PT1wcm9wcy5zZWxlY3RlZEluZGV4KVxuXHRcdFx0XHRcdFx0c2VsZWN0ZWQ9dHJ1ZTtcblxuXHRcdFx0XHRcdGlmIChwcm9wcy5oYXNPd25Qcm9wZXJ0eSgnc2VsZWN0ZWQnKSAmJlxuXHRcdFx0XHRcdFx0XHRvcHRpb24ua2V5PT09cHJvcHMuc2VsZWN0ZWQpXG5cdFx0XHRcdFx0XHRzZWxlY3RlZD10cnVlO1xuXG5cdFx0XHRcdFx0bGV0IGtleT1vcHRpb24ua2V5O1xuXHRcdFx0XHRcdGlmIChwcm9wcy5oYXNPd25Qcm9wZXJ0eSgnb3B0aW9uS2V5UHJlZml4JykpXG5cdFx0XHRcdFx0XHRrZXk9cHJvcHMua2V5UHJlZml4K2tleTtcblxuXHRcdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0XHQ8b3B0aW9uIGtleT17a2V5fVxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlPXtKU09OLnN0cmluZ2lmeShvcHRpb24ua2V5KX1cblx0XHRcdFx0XHRcdFx0XHRzZWxlY3RlZD17c2VsZWN0ZWR9XG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3M9e29wdGlvbi5jbGFzc30+XG5cdFx0XHRcdFx0XHRcdHtvcHRpb25bcHJvcHMubGFiZWxGaWVsZF19XG5cdFx0XHRcdFx0XHQ8L29wdGlvbj5cblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9KX1cblx0XHRcdDwvc2VsZWN0PlxuXHRcdCk7XG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIElGKGNvbmQsZnVuYykge1xuXHRpZiAoY29uZClcblx0XHRyZXR1cm4gZnVuYygpO1xufSIsIi8vaW1wb3J0IGltbXV0YWJsZSBmcm9tICdpbW11dGFibGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWNvbmNpbGVBcnJheSB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHR0aGlzLml0ZW1zQnlLZXk9e307XG5cdFx0dGhpcy5vcHRpb25zPW9wdGlvbnM7XG5cdH1cblxuXHRzdGF0aWMgY3JlYXRlV2l0aEZhY3RvcnkoZmFjdG9yeSkge1xuXHRcdHJldHVybiBuZXcgUmVjb25jaWxlQXJyYXkoe1xuXHRcdFx0aXRlbUZhY3Rvcnk6IGZhY3Rvcnlcblx0XHR9KVxuXHR9XG5cblx0Y3JlYXRlSXRlbShkYXRhKSB7XG5cdFx0aWYgKHRoaXMub3B0aW9ucy5pdGVtRmFjdG9yeSlcblx0XHRcdHJldHVybiB0aGlzLm9wdGlvbnMuaXRlbUZhY3RvcnkoZGF0YSk7XG5cblx0XHRlbHNlIGlmICh0aGlzLm9wdGlvbnMuaXRlbUNsYXNzKVxuXHRcdFx0cmV0dXJuIG5ldyB0aGlzLm9wdGlvbnMuaXRlbUNsYXNzKGRhdGEpO1xuXG5cdFx0ZWxzZVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiTm8gd2F5IHRvIGNyZWF0ZSBpdGVtcyFcIik7XG5cdH1cblxuXHRzZXREYXRhKGRhdGFzKSB7XG5cdFx0bGV0IG5ld0tleXM9W107XG5cdFx0Zm9yIChsZXQgaW5kZXggaW4gZGF0YXMpIHtcblx0XHRcdGxldCBkYXRhPWRhdGFzW2luZGV4XTtcblx0XHRcdGRhdGEuaW5kZXg9aW5kZXg7XG5cblx0XHRcdGlmICghZGF0YS5rZXkpXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIkFycmF5IGl0ZW0gZG9lc24ndCBoYXZlIGEga2V5XCIpO1xuXG5cdFx0XHRsZXQga2V5PVN0cmluZyhkYXRhLmtleSk7XG5cdFx0XHRuZXdLZXlzLnB1c2goa2V5KTtcblxuXHRcdFx0Ly9sZXQgaW09aW1tdXRhYmxlLmZyb21KUyhkYXRhKTtcblx0XHRcdGlmICh0aGlzLml0ZW1zQnlLZXlba2V5XSkge1xuXHRcdFx0XHQvL2lmICghaW0uZXF1YWxzKHRoaXMuaXRlbXNCeUtleVtrZXldLl9faW0pKVxuXHRcdFx0XHR0aGlzLml0ZW1zQnlLZXlba2V5XS51cGRhdGUoZGF0YSk7XG5cdFx0XHR9XG5cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHR0aGlzLml0ZW1zQnlLZXlba2V5XT10aGlzLmNyZWF0ZUl0ZW0oZGF0YSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vdGhpcy5pdGVtc0J5S2V5W2tleV0uX19pbT1pbTtcblx0XHR9XG5cblx0XHRmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmtleXModGhpcy5pdGVtc0J5S2V5KSkge1xuXHRcdFx0aWYgKG5ld0tleXMuaW5kZXhPZihrZXkpPDApIHtcblx0XHRcdFx0dGhpcy5pdGVtc0J5S2V5W2tleV0uZmluYWxpemUoKTtcblx0XHRcdFx0ZGVsZXRlIHRoaXMuaXRlbXNCeUtleVtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGdldEl0ZW1zKCkge1xuXHRcdHJldHVybiBPYmplY3QudmFsdWVzKHRoaXMuaXRlbXNCeUtleSk7XG5cdH1cblxuXHRnZXRJdGVtQnlLZXkoa2V5KSB7XG5cdFx0cmV0dXJuIHRoaXMuaXRlbXNCeUtleVtrZXldO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBoLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0b25Eb3duPShlKT0+e1xuXHRcdGlmIChlIGluc3RhbmNlb2YgVG91Y2hFdmVudClcblx0XHRcdHdpbmRvdy5oYXZlVG91Y2hFdmVudD10cnVlO1xuXG5cdFx0aWYgKHdpbmRvdy5oYXZlVG91Y2hFdmVudCAmJiAhKGUgaW5zdGFuY2VvZiBUb3VjaEV2ZW50KSlcblx0XHRcdHJldHVybjtcblxuXHRcdC8vZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRpZiAodGhpcy5iYXNlLmlzUHJlc3NlZClcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuYmFzZS5pc1ByZXNzZWQ9dHJ1ZTtcblxuXHRcdGlmICh0aGlzLnByb3BzLm9uUHJlc3MpXG5cdFx0XHR0aGlzLnByb3BzLm9uUHJlc3MoKTtcblxuXHRcdGlmICh0aGlzLnByb3BzLm9uUmVsZWFzZSlcblx0XHRcdHRoaXMuYmFzZS5jbGFzc05hbWUrPVwiIHByZXNzZWRcIjtcblx0fVxuXG5cdG9uVXA9KGUpPT57XG5cdFx0aWYgKGUgaW5zdGFuY2VvZiBUb3VjaEV2ZW50KVxuXHRcdFx0d2luZG93LmhhdmVUb3VjaEV2ZW50PXRydWU7XG5cblx0XHRpZiAod2luZG93LmhhdmVUb3VjaEV2ZW50ICYmICEoZSBpbnN0YW5jZW9mIFRvdWNoRXZlbnQpKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0aWYgKGUuY2FuY2VsYWJsZSlcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRpZiAoIXRoaXMuYmFzZS5pc1ByZXNzZWQpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLmJhc2UuaXNQcmVzc2VkPWZhbHNlO1xuXG5cdFx0aWYgKHRoaXMucHJvcHMub25SZWxlYXNlKSB7XG5cdFx0XHR0aGlzLmJhc2UuY2xhc3NOYW1lPXRoaXMuYmFzZS5jbGFzc05hbWUucmVwbGFjZShcIiBwcmVzc2VkXCIsXCJcIik7XG5cdFx0XHR0aGlzLnByb3BzLm9uUmVsZWFzZSgpO1xuXHRcdH1cblx0fVxuXG5cdG9uTW92ZT0oZSk9Pntcblx0XHRpZiAodGhpcy5wcm9wcy5jYW5jZWxPbk1vdmUgJiYgdGhpcy5iYXNlLmlzUHJlc3NlZCkge1xuXHRcdFx0dGhpcy5iYXNlLmNsYXNzTmFtZT10aGlzLmJhc2UuY2xhc3NOYW1lLnJlcGxhY2UoXCIgcHJlc3NlZFwiLFwiXCIpO1xuXHRcdFx0dGhpcy5iYXNlLmlzUHJlc3NlZD1mYWxzZTtcblx0XHR9XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxhIGNsYXNzPXtcImEgXCIrdGhpcy5wcm9wcy5jbGFzc31cblx0XHRcdFx0XHRvblRvdWNoTW92ZT17dGhpcy5vbk1vdmV9XG5cdFx0XHRcdFx0b25Ub3VjaFN0YXJ0PXt0aGlzLm9uRG93bn1cblx0XHRcdFx0XHRvblRvdWNoRW5kPXt0aGlzLm9uVXB9XG5cdFx0XHRcdFx0b25Nb3VzZURvd249e3RoaXMub25Eb3dufVxuXHRcdFx0XHRcdG9uTW91c2VVcD17dGhpcy5vblVwfT5cblx0XHRcdFx0e3RoaXMucHJvcHMuY2hpbGRyZW59XG5cdFx0XHQ8L2E+XG5cdFx0KVxuXHR9XG59IiwiaW1wb3J0IHsgaCwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCBBIGZyb20gJy4vQS5qc3gnO1xuaW1wb3J0IHsgU2VsZWN0LCBJRiB9IGZyb20gJy4uL3V0aWxzL1JlYWN0VXRpbC5qc3gnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBYm91dFNjcmVlbiBleHRlbmRzIENvbXBvbmVudCB7XG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRhaW5lclwiIG9uQ2xpY2s9e3RoaXMuY29udGV4dC5oaWRlQWJvdXRTY3JlZW59PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYm94IGJvcmRlciBib3JkZXItZGFyayBiZy1iYWNrZ3JvdW5kIGFib3V0LXNjcmVlblwiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lLWhlYWRlciB0ZXh0LXNlY29uZGFyeSBiZy1kYXJrIFwiPkFCT1VUPC9kaXY+XG5cdFx0XHRcdFx0PGI+SG9vZG1vZGU8L2I+PGJyLz48YnIvPlxuXHRcdFx0XHRcdFZlcnNpb246IHt0aGlzLmNvbnRleHQuZ2V0QXBwVmVyc2lvbigpfTxici8+PGJyLz5cblx0XHRcdFx0XHRFbmpveSEgUGxlYXNlIGxldCBtZSBrbm93IG9mIGFueSBidWdzIHlvdSBmaW5kIVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbiIsImltcG9ydCB7IGgsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgQSBmcm9tICcuL0EuanN4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWRkTGF5ZXIge1xuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lLWNvbnRhaW5lclwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYm94IHBhbmUgZG91YmxlIGJnLWRhcmtcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZS1oZWFkZXIgYmctZGFyayB0ZXh0LXNlY29uZGFyeVwiPkFERCBMQVlFUjwvZGl2PlxuXHRcdFx0XHRcdHt0aGlzLmNvbnRleHQuaW5zdHJ1bWVudHMubWFwKChpbnN0cnVtZW50LGluZGV4KT0+KFxuXHRcdFx0XHRcdFx0PEEgY2xhc3M9XCJib3ggdy00IHRleHQtd2hpdGUgYmctZGFuZ2VyIGVsXCJcblx0XHRcdFx0XHRcdFx0XHRvblJlbGVhc2U9e3RoaXMuY29udGV4dC5hZGRMYXllci5iaW5kKG51bGwsaW5zdHJ1bWVudC5uYW1lKX0+XG5cdFx0XHRcdFx0XHRcdDxpbWcgc3JjPXtcImltZy9cIitpbnN0cnVtZW50Lmljb259Lz5cblx0XHRcdFx0XHRcdFx0e2luc3RydW1lbnQubmFtZX1cblx0XHRcdFx0XHRcdDwvQT5cblx0XHRcdFx0XHQpKX1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBoLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IHsgU2VsZWN0LCBJRiB9IGZyb20gJy4uL3V0aWxzL1JlYWN0VXRpbC5qc3gnO1xuaW1wb3J0IEhlYWRlciBmcm9tICcuL0hlYWRlci5qc3gnO1xuaW1wb3J0IEZyb250IGZyb20gJy4vRnJvbnQuanN4JztcbmltcG9ydCBTb25nIGZyb20gJy4vU29uZy5qc3gnO1xuaW1wb3J0IFNvbmdTZXR0aW5ncyBmcm9tICcuL1NvbmdTZXR0aW5ncy5qc3gnO1xuaW1wb3J0IExheWVyU2V0dGluZ3MgZnJvbSAnLi9MYXllclNldHRpbmdzLmpzeCc7XG5pbXBvcnQgQWRkTGF5ZXIgZnJvbSAnLi9BZGRMYXllci5qc3gnO1xuaW1wb3J0IExheWVyIGZyb20gJy4vTGF5ZXIuanN4JztcbmltcG9ydCBTZWxlY3RDaG9yZCBmcm9tICcuL1NlbGVjdENob3JkLmpzeCc7XG5pbXBvcnQgVGFwSGlnaGxpZ2h0IGZyb20gJy4vVGFwSGlnaGxpZ2h0LmpzeCc7XG5pbXBvcnQgQWJvdXRTY3JlZW4gZnJvbSAnLi9BYm91dFNjcmVlbi5qc3gnO1xuaW1wb3J0IERpYWxvZyBmcm9tICcuL0RpYWxvZy5qc3gnO1xuaW1wb3J0IEEgZnJvbSAnLi9BLmpzeCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcCBleHRlbmRzIENvbXBvbmVudCB7XG5cdHVwZGF0ZVNpemU9KCk9Pntcblx0XHRsZXQgd2luZG93V2lkdGg9ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xuXHRcdGxldCB3aW5kb3dIZWlnaHQ9ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodDtcblxuXHRcdGxldCBjcz1nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCk7XG5cdFx0bGV0IHBhbmVXaWR0aD1wYXJzZUZsb2F0KGNzLmdldFByb3BlcnR5VmFsdWUoJy0tcGFuZVdpZHRoJykpO1xuXHRcdGxldCBwYW5lSGVpZ2h0PXBhcnNlRmxvYXQoY3MuZ2V0UHJvcGVydHlWYWx1ZSgnLS1wYW5lSGVpZ2h0JykpO1xuXG5cdFx0bGV0IGNvbnRlbnRXaWR0aCxjb250ZW50SGVpZ2h0O1xuXG5cdFx0bGV0IGVsPWRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG5cdFx0bGV0IHNjcmVlbktleWJvYXJkQWN0aXZlPWZhbHNlO1xuXHRcdGlmIChlbC5ub2RlTmFtZT09XCJJTlBVVFwiICYmIGVsLnR5cGU9PVwidGV4dFwiKVxuXHRcdFx0c2NyZWVuS2V5Ym9hcmRBY3RpdmU9dHJ1ZTtcblxuXHRcdC8vIFBvcnRyYWl0LlxuXHRcdGlmICh3aW5kb3dIZWlnaHQ+d2luZG93V2lkdGgpIHtcblx0XHRcdGNvbnRlbnRIZWlnaHQ9MioocGFuZUhlaWdodCsxKSsyO1xuXHRcdFx0Y29udGVudFdpZHRoPXBhbmVXaWR0aCsxO1xuXHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuY2xhc3NMaXN0LmFkZChcInBvcnRyYWl0XCIpO1xuXHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuY2xhc3NMaXN0LnJlbW92ZShcImxhbmRzY2FwZVwiKTtcblxuXHRcdFx0aWYgKHdpbmRvdy5oYXNPd25Qcm9wZXJ0eShcImNvcmRvdmFcIikpXG5cdFx0XHRcdFN0YXR1c0Jhci5zaG93KCk7XG5cdFx0fVxuXG5cdFx0Ly8gTGFuZHNjYXBlLlxuXHRcdGVsc2Uge1xuXHRcdFx0Y29udGVudEhlaWdodD1wYW5lSGVpZ2h0KzIrMTtcblx0XHRcdGNvbnRlbnRXaWR0aD0yKihwYW5lV2lkdGgrMSk7XG5cdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5jbGFzc0xpc3QuYWRkKFwibGFuZHNjYXBlXCIpO1xuXHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuY2xhc3NMaXN0LnJlbW92ZShcInBvcnRyYWl0XCIpO1xuXG5cdFx0XHRpZiAod2luZG93Lmhhc093blByb3BlcnR5KFwiY29yZG92YVwiKSkge1xuXHRcdFx0XHRpZiAoc2NyZWVuS2V5Ym9hcmRBY3RpdmUpXG5cdFx0XHRcdFx0U3RhdHVzQmFyLnNob3coKTtcblxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0U3RhdHVzQmFyLmhpZGUoKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRsZXQgZm9udFNpemU7XG5cdFx0aWYgKHdpbmRvd1dpZHRoL2NvbnRlbnRXaWR0aDx3aW5kb3dIZWlnaHQvY29udGVudEhlaWdodClcblx0XHRcdGZvbnRTaXplPXdpbmRvd1dpZHRoL2NvbnRlbnRXaWR0aDtcblxuXHRcdGVsc2Vcblx0XHRcdGZvbnRTaXplPXdpbmRvd0hlaWdodC9jb250ZW50SGVpZ2h0O1xuXG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImh0bWxcIikuc3R5bGUuZm9udFNpemU9Zm9udFNpemUrXCJweFwiO1xuXG5cdFx0bGV0IHM9ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlO1xuXHRcdHMuc2V0UHJvcGVydHkoXCItLXBhbmVNYXJnaW5Ub3BcIiwoKHdpbmRvd0hlaWdodC1mb250U2l6ZSpjb250ZW50SGVpZ2h0KS8yKStcInB4XCIpO1xuXHRcdHMuc2V0UHJvcGVydHkoXCItLXBhbmVNYXJnaW5MZWZ0XCIsKCh3aW5kb3dXaWR0aC1mb250U2l6ZSpjb250ZW50V2lkdGgpLzIpK1wicHhcIik7XG5cdH1cblxuXHRvblBsYXlDbGljaz0oKT0+e1xuXHRcdGNvbnNvbGUubG9nKFwicGxheVwiKTtcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCkge1xuXHRcdHdpbmRvdy5vbnJlc2l6ZT10aGlzLnVwZGF0ZVNpemU7XG5cdFx0c2V0VGltZW91dCh0aGlzLnVwZGF0ZVNpemUsMCk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0aWYgKHRoaXMuY29udGV4dC5idXN5KVxuXHRcdFx0cmV0dXJuICg8ZGl2PkxPQURJTkcuLi48L2Rpdj4pO1xuXG5cdFx0bGV0IGNscz1cIlwiO1xuXHRcdGlmICh0aGlzLmNvbnRleHQucmVjb3JkaW5nKVxuXHRcdFx0Y2xzPVwicmVjb3JkaW5nXCI7XG5cblx0XHQvLyA8VGFwSGlnaGxpZ2h0IC8+XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzcz17Y2xzfT5cblx0XHRcdFx0PEhlYWRlciAvPlxuXHRcdFx0XHR7SUYoIXRoaXMuY29udGV4dC5pc1NvbmdPcGVuKCksKCk9PlxuXHRcdFx0XHRcdDxGcm9udCAvPlxuXHRcdFx0XHQpfVxuXHRcdFx0XHR7SUYodGhpcy5jb250ZXh0LmlzU29uZ09wZW4oKSwoKT0+e1xuXHRcdFx0XHRcdGlmICh0aGlzLmNvbnRleHQuc2V0dGluZ3NWaXNpYmxlKSB7XG5cdFx0XHRcdFx0XHRpZiAodGhpcy5jb250ZXh0LmN1cnJlbnRMYXllckluZGV4Pj0wKVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gPExheWVyU2V0dGluZ3MgLz47XG5cblx0XHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdFx0cmV0dXJuIDxTb25nU2V0dGluZ3MgLz47XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0ZWxzZSBpZiAodGhpcy5jb250ZXh0LmFkZExheWVyVmlzaWJsZSlcblx0XHRcdFx0XHRcdHJldHVybiA8QWRkTGF5ZXIgLz47XG5cblx0XHRcdFx0XHRlbHNlIGlmICh0aGlzLmNvbnRleHQuY3VycmVudExheWVySW5kZXg+PTApXG5cdFx0XHRcdFx0XHRyZXR1cm4gPExheWVyIC8+XG5cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRyZXR1cm4gPFNvbmcgLz47XG5cdFx0XHRcdH0pfVxuXHRcdFx0XHR7SUYodGhpcy5jb250ZXh0LmFib3V0U2NyZWVuVmlzaWJsZSwoKT0+XG5cdFx0XHRcdFx0PEFib3V0U2NyZWVuIC8+XG5cdFx0XHRcdCl9XG5cdFx0XHRcdHtJRih0aGlzLmNvbnRleHQuZGlhbG9nVGV4dCwoKT0+XG5cdFx0XHRcdFx0PERpYWxvZyAvPlxuXHRcdFx0XHQpfVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuIiwiaW1wb3J0IHsgaCwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCBBIGZyb20gJy4vQS5qc3gnO1xuaW1wb3J0IHsgU2VsZWN0LCBJRiB9IGZyb20gJy4uL3V0aWxzL1JlYWN0VXRpbC5qc3gnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaWFsb2cgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbC1jb250YWluZXJcIiBvbkNsaWNrPXt0aGlzLmNvbnRleHQuY2FuY2VsRGlhbG9nfT5cblx0XHRcdFx0PGRpdiBjbGFzcz1cImJveCBib3JkZXIgYm9yZGVyLWRhcmsgYmctYmFja2dyb3VuZCBkaWFsb2dcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZS1oZWFkZXIgdGV4dC1zZWNvbmRhcnkgYmctZGFyayBcIj5DT05GSVJNPC9kaXY+XG5cdFx0XHRcdFx0e3RoaXMuY29udGV4dC5kaWFsb2dUZXh0fVxuXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cImZvcm0tYnV0dG9uc1wiPlxuXHRcdFx0XHRcdFx0PEEgY2xhc3M9XCJib3ggYmctaW5mb1wiXG5cdFx0XHRcdFx0XHRcdFx0b25SZWxlYXNlPXt0aGlzLmNvbnRleHQuY2FuY2VsRGlhbG9nfT5cblx0XHRcdFx0XHRcdFx0Q2FuY2VsXG5cdFx0XHRcdFx0XHQ8L0E+XG5cdFx0XHRcdFx0XHQ8QSBjbGFzcz1cImJveCBiZy13YXJuaW5nXCJcblx0XHRcdFx0XHRcdFx0XHRvblJlbGVhc2U9e3RoaXMuY29udGV4dC5jb25maXJtRGlhbG9nfT5cblx0XHRcdFx0XHRcdFx0T2tcblx0XHRcdFx0XHRcdDwvQT5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBoLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IEEgZnJvbSAnLi9BLmpzeCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZyb250IHtcblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZS1jb250YWluZXJcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cImJveCBwYW5lIGRvdWJsZSBib3JkZXIgYm9yZGVyLWRhcmtcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZS1oZWFkZXIgdGV4dC1zZWNvbmRhcnkgYmctZGFya1wiPlNPTkdTPC9kaXY+XG5cblx0XHRcdFx0XHQ8QSBjbGFzcz1cInRleHQtd2hpdGVcIlxuXHRcdFx0XHRcdFx0XHRvblJlbGVhc2U9e3RoaXMuY29udGV4dC5hZGRTb25nfT5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJib3ggYmctZGFyayB3LTFcIj4rPC9kaXY+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYm94XCI+TmV3IFNvbmc8L2Rpdj5cblx0XHRcdFx0XHQ8L0E+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cImZyb250LWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0e3RoaXMuY29udGV4dC5zb25ncy5tYXAoKHNvbmcsaW5kZXgpPT4oXG5cdFx0XHRcdFx0XHRcdDxBIGNsYXNzPVwiYm94IGJnLXNlY29uZGFyeSB0ZXh0LXdoaXRlIHctNCBib3JkZXIgYm9yZGVyLWxpZ2h0IGVsXCJcblx0XHRcdFx0XHRcdFx0XHRcdG9uUmVsZWFzZT17dGhpcy5jb250ZXh0LnNldFNvbmdJbmRleC5iaW5kKG51bGwsaW5kZXgpfVxuXHRcdFx0XHRcdFx0XHRcdFx0Y2FuY2VsT25Nb3ZlPXt0cnVlfT5cblx0XHRcdFx0XHRcdFx0XHR7c29uZy5uYW1lfVxuXHRcdFx0XHRcdFx0XHQ8L0E+XG5cdFx0XHRcdFx0XHQpKX1cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBoLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IHsgU2VsZWN0LCBJRiB9IGZyb20gJy4uL3V0aWxzL1JlYWN0VXRpbC5qc3gnO1xuaW1wb3J0IEEgZnJvbSAnLi9BLmpzeCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYWRlciBleHRlbmRzIENvbXBvbmVudCB7XG5cdHJlbmRlcigpIHtcblx0XHRsZXQgcGxheUJ1dHRvbkNsYXNzPVwiaGVhZGVyLWJ1dHRvbiB0ZXh0LXdoaXRlIFwiO1xuXHRcdGlmICh0aGlzLmNvbnRleHQucGxheWluZylcblx0XHRcdHBsYXlCdXR0b25DbGFzcys9XCJhY3RpdmVcIjtcblxuXHRcdGxldCByZWNvcmRCdXR0b25DbGFzcz1cImhlYWRlci1idXR0b24gdGV4dC13aGl0ZSBcIjtcblx0XHRpZiAodGhpcy5jb250ZXh0LnJlY29yZGluZylcblx0XHRcdHJlY29yZEJ1dHRvbkNsYXNzKz1cImFjdGl2ZVwiO1xuXG5cdFx0bGV0IGl0ZW1zPVtdO1xuXHRcdGlmICh0aGlzLmNvbnRleHQuaXNTb25nT3BlbigpKSB7XG5cdFx0XHRpdGVtcy5wdXNoKFxuXHRcdFx0XHQ8QSBjbGFzcz1cImhlYWRlci1idXR0b24gdGV4dC13aGl0ZVwiXG5cdFx0XHRcdFx0XHRvblJlbGVhc2U9e3RoaXMuY29udGV4dC5nb0JhY2t9PlxuXHRcdFx0XHRcdDxpbWcgc3JjPVwiaW1nL2Fycm93LWxlZnQuc3ZnXCIvPlxuXHRcdFx0XHQ8L0E+XG5cdFx0XHQpO1xuXG5cdFx0XHRpZiAodGhpcy5jb250ZXh0LmN1cnJlbnRMYXllckluZGV4Pj0wKVxuXHRcdFx0XHRpdGVtcy5wdXNoKFxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJoZWFkZXItYnV0dG9uIHRleHQtd2hpdGVcIj5cblx0XHRcdFx0XHRcdDxpbWcgc3JjPXtcImltZy9cIit0aGlzLmNvbnRleHQuZ2V0SW5zdHJ1bWVudEJ5TmFtZSh0aGlzLmNvbnRleHQuZ2V0Q3VycmVudExheWVyKCkuaW5zdHJ1bWVudE5hbWUpLmljb259Lz5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0KTtcblxuXHRcdFx0aXRlbXMucHVzaChcblx0XHRcdFx0PGRpdiBjbGFzcz1cImhlYWRlci10ZXh0IHRleHQtd2hpdGVcIj5cblx0XHRcdFx0XHR7dGhpcy5jb250ZXh0LmdldEN1cnJlbnRTb25nKCkubmFtZX1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQpO1xuXG5cdFx0XHRpdGVtcy5wdXNoKFxuXHRcdFx0XHQ8QSBjbGFzcz17cGxheUJ1dHRvbkNsYXNzfVxuXHRcdFx0XHRcdFx0b25QcmVzcz17dGhpcy5jb250ZXh0LnBsYXlDbGlja30+XG5cdFx0XHRcdFx0PGltZyBzcmM9XCJpbWcvcGxheS1maWxsLnN2Z1wiLz5cblx0XHRcdFx0PC9BPlxuXHRcdFx0KTtcblxuXHRcdFx0aWYgKHRoaXMuY29udGV4dC5jdXJyZW50TGF5ZXJJbmRleD49MCkgXG5cdFx0XHRcdGl0ZW1zLnB1c2goXG5cdFx0XHRcdFx0PEEgY2xhc3M9e3JlY29yZEJ1dHRvbkNsYXNzfVxuXHRcdFx0XHRcdFx0XHRvblByZXNzPXt0aGlzLmNvbnRleHQucmVjb3JkQ2xpY2t9PlxuXHRcdFx0XHRcdFx0PGltZyBzcmM9XCJpbWcvY2lyY2xlLWZpbGwuc3ZnXCIvPlxuXHRcdFx0XHRcdDwvQT5cblx0XHRcdFx0KTtcblxuXHRcdFx0aXRlbXMucHVzaChcblx0XHRcdFx0PEEgY2xhc3M9XCJoZWFkZXItYnV0dG9uIHRleHQtd2hpdGVcIlxuXHRcdFx0XHRcdFx0b25SZWxlYXNlPXt0aGlzLmNvbnRleHQudG9nZ2xlU2V0dGluZ3N9PlxuXHRcdFx0XHRcdDxpbWcgc3JjPVwiaW1nL2dlYXItZmlsbC5zdmdcIi8+XG5cdFx0XHRcdDwvQT5cblx0XHRcdCk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0aXRlbXMucHVzaChcblx0XHRcdFx0PGRpdiBjbGFzcz1cImhlYWRlci10ZXh0IHRleHQtd2hpdGVcIj5Ib29kbW9kZTwvZGl2PlxuXHRcdFx0KTtcblxuXHRcdFx0aXRlbXMucHVzaChcblx0XHRcdFx0PEEgY2xhc3M9XCJoZWFkZXItYnV0dG9uIHRleHQtd2hpdGVcIlxuXHRcdFx0XHRcdG9uUmVsZWFzZT17dGhpcy5jb250ZXh0LnNob3dBYm91dFNjcmVlbn0+XG5cdFx0XHRcdFx0PGltZyBzcmM9XCJpbWcvaW5mby1pY29uLnN2Z1wiLz5cblx0XHRcdFx0PC9BPlxuXHRcdFx0KTtcblx0XHR9XG5cblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzPVwiaGVhZGVyIGJveCBiZy1kYXJrXCI+XG5cdFx0XHRcdHtpdGVtc31cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0iLCJpbXBvcnQgeyBoLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IEEgZnJvbSAnLi9BLmpzeCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExheWVyIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0b25LZXlEb3duPShlKT0+e1xuXHRcdGlmIChlLnRhcmdldC5ub2RlTmFtZT09XCJJTlBVVFwiKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0bGV0IGs9cGFyc2VJbnQoZS5rZXkpLTE7XG5cdFx0aWYgKGs+PTApXG5cdFx0XHR0aGlzLmNvbnRleHQuc291bmRCdXR0b25DbGljayhrKTtcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCkge1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsdGhpcy5vbktleURvd24pO1xuXHR9XG5cblx0Y29tcG9uZW50V2lsbFVubW91bnQoKSB7XG5cdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIix0aGlzLm9uS2V5RG93bik7XG5cdH1cblxuXHRyZW5kZXJTb3VuZFN5bWJvbHMoKSB7XG5cdFx0bGV0IGluc3RydW1lbnQ9dGhpcy5jb250ZXh0LmdldEN1cnJlbnRJbnN0cnVtZW50KCk7XG5cdFx0bGV0IGxheWVyPXRoaXMuY29udGV4dC5nZXRDdXJyZW50TGF5ZXIoKTtcblx0XHRsZXQgYnV0dG9ucz1uZXcgQXJyYXkoMTYpLmZpbGwoPGRpdiBjbGFzcz1cImJveCB3LTFcIi8+KTtcblx0XHRsZXQgbnVtU291bmRzPXRoaXMuY29udGV4dC5nZXRJbnN0cnVtZW50TnVtU291bmRzQnlOYW1lKGluc3RydW1lbnQubmFtZSk7XG5cblx0XHRmb3IgKGxldCBpPTA7IGk8OTsgaSsrKSB7XG5cdFx0XHRsZXQgYnV0dG9uSW5kZXg9OC00Kk1hdGguZmxvb3IoaS8zKStpJTM7XG5cdFx0XHRpZiAoaTxudW1Tb3VuZHMpIHtcblx0XHRcdFx0bGV0IGJ1dHRvbkNsYXNzPVwiYm94IHctMSBiZy1wcmltYXJ5IHRleHQtd2hpdGUgXCI7XG5cblx0XHRcdFx0aWYgKHRoaXMuY29udGV4dC5jdXJyZW50R3JpZEluZGV4Pj0wICYmXG5cdFx0XHRcdFx0XHRsYXllci5zZXFbdGhpcy5jb250ZXh0LmN1cnJlbnRHcmlkSW5kZXhdLnNvdW5kcy5pbmNsdWRlcyhpKSlcblx0XHRcdFx0XHRidXR0b25DbGFzcys9XCJhY3RpdmVcIlxuXG5cdFx0XHRcdGxldCBidXR0b25JY29uO1xuXHRcdFx0XHRpZiAoaW5zdHJ1bWVudC50eXBlPT1cInBlcmN1c3NpdmVcIilcblx0XHRcdFx0XHRidXR0b25JY29uPVwiaW1nL1wiK2luc3RydW1lbnQuaWNvbnNbaV07XG5cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdGJ1dHRvbkljb249XCJpbWcvaG5vdGUtXCIrKDErMiooaSUzKSkrXCIuc3ZnXCI7XG5cblx0XHRcdFx0YnV0dG9uc1tidXR0b25JbmRleF09XG5cdFx0XHRcdFx0PEEgY2xhc3M9e2J1dHRvbkNsYXNzfVxuXHRcdFx0XHRcdFx0XHRvblByZXNzPXt0aGlzLmNvbnRleHQuc291bmRCdXR0b25DbGljay5iaW5kKG51bGwsaSl9PlxuXHRcdFx0XHRcdFx0PGltZyBzcmM9e2J1dHRvbkljb259Lz5cblx0XHRcdFx0XHQ8L0E+XG5cdFx0XHR9XG5cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRidXR0b25zW2J1dHRvbkluZGV4XT1cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYm94IHctMSBiZy1wcmltYXJ5XCIvPlxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0bGV0IGNscz1cImJveCB3LTEgYmctd2FybmluZyB0ZXh0LXdoaXRlIFwiO1xuXHRcdGlmICh0aGlzLmNvbnRleHQuY3VycmVudEdyaWRJbmRleD49MCAmJlxuXHRcdFx0XHRcdGxheWVyLnNlcVt0aGlzLmNvbnRleHQuY3VycmVudEdyaWRJbmRleF0uc3RhY2MpXG5cdFx0XHRjbHMrPVwiYWN0aXZlXCI7XG5cblx0XHRidXR0b25zWzEyXT0oXG5cdFx0XHQ8QSBjbGFzcz17Y2xzfVxuXHRcdFx0XHRcdG9uUHJlc3M9e3RoaXMuY29udGV4dC50b2dnbGVDdXJyZW50TGF5ZXJTdGFjY30+XG5cdFx0XHRcdDxpbWcgc3JjPVwiaW1nL3Jlc3Quc3ZnXCIvPlxuXHRcdFx0PC9BPlxuXHRcdCk7XG5cblx0XHRsZXQgY3VycmVudFZlbD1udWxsO1xuXHRcdGlmICh0aGlzLmNvbnRleHQuY3VycmVudEdyaWRJbmRleD49MCAmJlxuXHRcdFx0XHR0aGlzLmNvbnRleHQuY3VycmVudExheWVySGFzU291bmRBdCh0aGlzLmNvbnRleHQuY3VycmVudEdyaWRJbmRleCkpXG5cdFx0XHRjdXJyZW50VmVsPWxheWVyLnNlcVt0aGlzLmNvbnRleHQuY3VycmVudEdyaWRJbmRleF0udmVsO1xuXG5cdFx0bGV0IHNpemVDbGFzc2VzPVtcInRpbnlcIixcInNtYWxsXCIsXCJcIl07XG5cdFx0bGV0IHZlbHM9WzAuMjUsMC41MCwxXTtcblx0XHRmb3IgKGxldCBpPTA7IGk8MzsgaSsrKSB7XG5cdFx0XHRsZXQgY2xzPVwiYm94IHctMSBiZy13YXJuaW5nIHRleHQtd2hpdGUgXCIrc2l6ZUNsYXNzZXNbaV0rXCIgXCI7XG5cblx0XHRcdGlmIChjdXJyZW50VmVsPT12ZWxzW2ldKVxuXHRcdFx0XHRjbHMrPVwiYWN0aXZlXCI7XG5cblx0XHRcdGJ1dHRvbnNbMTMraV09KFxuXHRcdFx0XHQ8QSBjbGFzcz17Y2xzfVxuXHRcdFx0XHRcdFx0aHJlZj1cIiNcIlxuXHRcdFx0XHRcdFx0b25QcmVzcz17dGhpcy5jb250ZXh0LnNldEN1cnJlbnRMYXllclZlbC5iaW5kKG51bGwsdmVsc1tpXSl9PlxuXHRcdFx0XHRcdDxpbWcgc3JjPVwiaW1nL25vdGUuc3ZnXCIvPlxuXHRcdFx0XHQ8L0E+XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmIChpbnN0cnVtZW50LnR5cGU9PVwiaGFybW9uaWNcIikge1xuXHRcdFx0Zm9yIChsZXQgb2N0YXZlIG9mIFswLDEsMl0pIHtcblx0XHRcdFx0bGV0IGNscz1cImJveCB3LTEgYmctaW5mbyB0ZXh0LXdoaXRlIFwiO1xuXHRcdFx0XHRpZiAodGhpcy5jb250ZXh0LmN1cnJlbnRHcmlkSW5kZXg+PTAgJiZcblx0XHRcdFx0XHRcdHRoaXMuY29udGV4dC5jdXJyZW50TGF5ZXJIYXNDaG9yZEF0KHRoaXMuY29udGV4dC5jdXJyZW50R3JpZEluZGV4LG9jdGF2ZSkpXG5cdFx0XHRcdFx0Y2xzKz1cImFjdGl2ZVwiO1xuXG5cdFx0XHRcdGJ1dHRvbnNbMTEtb2N0YXZlKjRdPShcblx0XHRcdFx0XHQ8QSBjbGFzcz17Y2xzfVxuXHRcdFx0XHRcdFx0XHRocmVmPVwiI1wiXG5cdFx0XHRcdFx0XHRcdG9uUHJlc3M9e3RoaXMuY29udGV4dC5jaG9yZEJ1dHRvbkNsaWNrLmJpbmQobnVsbCxvY3RhdmUpfT5cblx0XHRcdFx0XHRcdDxpbWcgc3JjPVwiaW1nL2hub3RlLWNob3JkLnN2Z1wiLz5cblx0XHRcdFx0XHQ8L0E+XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGJ1dHRvbnM7XG5cdH1cblxuXHRyZW5kZXJTZXF1ZW5jZSgpIHtcblx0XHRsZXQgbGF5ZXI9dGhpcy5jb250ZXh0LmdldEN1cnJlbnRMYXllcigpO1xuXHRcdGxldCByZXM9W107XG5cdFx0bGV0IHZlbENscz17XG5cdFx0XHQwLjI1OiBcInRpbnlcIixcblx0XHRcdDAuNTogXCJzbWFsbFwiLFxuXHRcdFx0MTogXCJcIlxuXHRcdH07XG5cblx0XHRmb3IgKGxldCBncmlkSW5kZXg9MDsgZ3JpZEluZGV4PDE2OyBncmlkSW5kZXgrKykge1xuXHRcdFx0bGV0IGNscz1cImJveCB3LTEgYmVhdC1ncmlkIGJlYXQtXCIrZ3JpZEluZGV4K1wiIFwiO1xuXG5cdFx0XHRpZiAoZ3JpZEluZGV4PT10aGlzLmNvbnRleHQuY3VycmVudEdyaWRJbmRleClcblx0XHRcdFx0Y2xzKz1cImJnLWxpZ2h0IFwiO1xuXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGNscys9XCJiZy1ibGFjayB0ZXh0LXdoaXRlIFwiO1xuXG5cdFx0XHRsZXQgaWNvbj1udWxsO1xuXHRcdFx0aWYgKGxheWVyLnNlcVtncmlkSW5kZXhdLnN0YWNjKVxuXHRcdFx0XHRpY29uPTxpbWcgc3JjPVwiaW1nL3Jlc3Quc3ZnXCIvPjtcblxuXHRcdFx0ZWxzZSBpZiAodGhpcy5jb250ZXh0LmN1cnJlbnRMYXllckhhc1NvdW5kQXQoZ3JpZEluZGV4KSkge1xuXHRcdFx0XHRpY29uPTxpbWcgc3JjPVwiaW1nL25vdGUuc3ZnXCIvPjtcblx0XHRcdFx0Y2xzKz12ZWxDbHNbbGF5ZXIuc2VxW2dyaWRJbmRleF0udmVsXTtcblx0XHRcdH1cblxuXHRcdFx0cmVzLnB1c2goXG5cdFx0XHRcdDxBIGNsYXNzPXtjbHN9XG5cdFx0XHRcdFx0XHRvblByZXNzPXt0aGlzLmNvbnRleHQuZ3JpZEluZGV4Q2xpY2suYmluZChudWxsLGdyaWRJbmRleCl9PlxuXHRcdFx0XHRcdHtpY29ufVxuXHRcdFx0XHQ8L0E+XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXM7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0bGV0IGxheWVyPXRoaXMuY29udGV4dC5nZXRDdXJyZW50TGF5ZXIoKTtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZS1jb250YWluZXIgcmV2LXBvcnRyYWl0XCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lIGJveCBib3JkZXIgYm9yZGVyLWRhcmtcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZS1oZWFkZXIgdGV4dC1zZWNvbmRhcnkgYmctZGFya1wiPlNPVU5EUzwvZGl2PlxuXHRcdFx0XHRcdHt0aGlzLnJlbmRlclNvdW5kU3ltYm9scygpfVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInBhbmUgYm94IGJnLWRhcmtcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZS1oZWFkZXIgdGV4dC1zZWNvbmRhcnkgYmctZGFya1wiPlNFUVVFTkNFPC9kaXY+XG5cdFx0XHRcdFx0e3RoaXMucmVuZGVyU2VxdWVuY2UoKX1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBoLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IEEgZnJvbSAnLi9BLmpzeCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExheWVyU2V0dGluZ3Mge1xuXHRyZW5kZXIoKSB7XG5cdFx0bGV0IGluc3RydW1lbnQ9dGhpcy5jb250ZXh0LmdldEN1cnJlbnRJbnN0cnVtZW50KCk7XG5cdFx0bGV0IGxheWVyPXRoaXMuY29udGV4dC5nZXRDdXJyZW50TGF5ZXIoKTtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZS1jb250YWluZXJcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cImJveCBwYW5lIGRvdWJsZSBiZy1kYXJrXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInBhbmUtaGVhZGVyIGJnLWRhcmsgdGV4dC1zZWNvbmRhcnlcIj5MQVlFUiBTRVRUSU5HUzwvZGl2PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJib3ggdy00IGVsIHRleHQtd2hpdGVcIj5cblx0XHRcdFx0XHRcdDxpbWcgc3JjPXtcImltZy9cIitpbnN0cnVtZW50Lmljb259Lz5cblx0XHRcdFx0XHRcdHtpbnN0cnVtZW50Lm5hbWV9XG5cdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHQ8YnIvPjxici8+XG5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cblx0XHRcdFx0XHRcdFZvbHVtZTxici8+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYm94IGJvcmRlciBiZy13aGl0ZSBib3JkZXItYmxhY2sgdGV4dC1ibGFjayB3LTRcIj5cblx0XHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJyYW5nZVwiIG1pbj1cIjBcIiBtYXg9XCIxXCIgc3RlcD1cIjAuMDFcIlxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlPXtsYXllci52b2x1bWV9XG5cdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuY29udGV4dC5zZXRDdXJyZW50TGF5ZXJWb2x1bWV9XG5cdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJmb3JtLWJ1dHRvbnNcIj5cblx0XHRcdFx0XHRcdDxBIGNsYXNzPVwiYm94IGJnLWRhbmdlciB0ZXh0LXdoaXRlXCJcblx0XHRcdFx0XHRcdFx0XHRvblJlbGVhc2U9e3RoaXMuY29udGV4dC5kZWxldGVDdXJyZW50TGF5ZXJ9PlxuXHRcdFx0XHRcdFx0XHQ8aW1nIHNyYz1cImltZy90cmFzaC5zdmdcIi8+XG5cdFx0XHRcdFx0XHQ8L0E+XG5cdFx0XHRcdFx0XHQ8QSBjbGFzcz1cImJveCBiZy1wcmltYXJ5IGZvcm0tYnV0dG9uIHRleHQtd2hpdGVcIlxuXHRcdFx0XHRcdFx0XHRcdG9uUmVsZWFzZT17dGhpcy5jb250ZXh0LnRvZ2dsZVNldHRpbmdzfT5cblx0XHRcdFx0XHRcdFx0Q2xvc2Vcblx0XHRcdFx0XHRcdDwvQT5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBoLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IEEgZnJvbSAnLi9BLmpzeCc7XG5pbXBvcnQgeyBTZWxlY3QsIElGIH0gZnJvbSAnLi4vdXRpbHMvUmVhY3RVdGlsLmpzeCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlbGVjdENob3JkIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0cmVuZGVyKCkge1xuXHRcdGxldCBzb25nPXRoaXMuY29udGV4dC5nZXRDdXJyZW50U29uZygpO1xuXHRcdGxldCBzZWN0aW9uPXNvbmcuc2VjdGlvbnNbdGhpcy5jb250ZXh0LmN1cnJlbnRTZWN0aW9uSW5kZXhdO1xuXHRcdGxldCBjdXJyZW50Q2hvcmRJbmRleD1zZWN0aW9uW3RoaXMuY29udGV4dC5lZGl0U2VjdGlvbkNob3JkVmlzaWJsZV07XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRhaW5lclwiIG9uQ2xpY2s9e3RoaXMuY29udGV4dC5oaWRlRWRpdFNlY3Rpb25DaG9yZH0+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJib3ggYm9yZGVyIGJvcmRlci1kYXJrIGJnLWJhY2tncm91bmQgc2VsZWN0LWNob3JkXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInBhbmUtaGVhZGVyIHRleHQtc2Vjb25kYXJ5IGJnLWRhcmsgXCI+RURJVCBDSE9SRDwvZGl2PlxuXHRcdFx0XHRcdDxociBjbGFzcz1cInBhbmUtZGl2aWRlciBmb3VyXCIvPlxuXHRcdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0XHR7dGhpcy5jb250ZXh0LmdldENob3JkTGFiZWxzKCkubWFwKChsYWJlbCwgaW5kZXgpPT57XG5cdFx0XHRcdFx0XHRcdGxldCBjbHM9XCJib3ggdy0xIGJnLXN1Y2Nlc3MgdGV4dC1saWdodCBjaG9yZCBcIjtcblx0XHRcdFx0XHRcdFx0aWYgKGluZGV4PT1jdXJyZW50Q2hvcmRJbmRleClcblx0XHRcdFx0XHRcdFx0XHRjbHMrPVwiYWN0aXZlXCI7XG5cblx0XHRcdFx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHRcdFx0XHQ8QSBjbGFzcz17Y2xzfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRvblJlbGVhc2U9e3RoaXMuY29udGV4dC5lZGl0U2VjdGlvbkNob3JkLmJpbmQobnVsbCxpbmRleCl9PlxuXHRcdFx0XHRcdFx0XHRcdFx0e2xhYmVsfVxuXHRcdFx0XHRcdFx0XHRcdDwvQT5cblx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0fSl9XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0e0lGKHNlY3Rpb24ubGVuZ3RoPjEsKCk9PlxuXHRcdFx0XHRcdFx0PEEgY2xhc3M9XCJib3ggYmctZGFuZ2VyIHctMSB0ZXh0LXdoaXRlXCJcblx0XHRcdFx0XHRcdFx0XHRocmVmPVwiI1wiXG5cdFx0XHRcdFx0XHRcdFx0b25SZWxlYXNlPXt0aGlzLmNvbnRleHQucmVtb3ZlU2VjdGlvbkNob3JkfT5cblx0XHRcdFx0XHRcdFx0PGltZyBzcmM9XCJpbWcvdHJhc2guc3ZnXCIvPlxuXHRcdFx0XHRcdFx0PC9BPlxuXHRcdFx0XHRcdCl9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuIiwiaW1wb3J0IHsgaCwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCBTb25nTGF5ZXJzIGZyb20gJy4vU29uZ0xheWVycy5qc3gnO1xuaW1wb3J0IFNvbmdDaG9yZHMgZnJvbSAnLi9Tb25nQ2hvcmRzLmpzeCc7XG5pbXBvcnQgQSBmcm9tICcuL0EuanN4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU29uZyBleHRlbmRzIENvbXBvbmVudCB7XG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzcz1cInBhbmUtY29udGFpbmVyXCI+XG5cdFx0XHRcdDxTb25nTGF5ZXJzIC8+XG5cdFx0XHRcdDxTb25nQ2hvcmRzIC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBoLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IFNlbGVjdENob3JkIGZyb20gJy4vU2VsZWN0Q2hvcmQuanN4JztcbmltcG9ydCB7IFNlbGVjdCwgSUYgfSBmcm9tICcuLi91dGlscy9SZWFjdFV0aWwuanN4JztcbmltcG9ydCBBIGZyb20gJy4vQS5qc3gnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTb25nQ2hvcmRzIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0cmVuZGVyQ29uZHVjdG9yQ2hvcmRzKCkge1xuXHRcdHJldHVybiB0aGlzLmNvbnRleHQuZ2V0Q2hvcmRMYWJlbHMoKS5tYXAoKGxhYmVsLCBpbmRleCk9Pntcblx0XHRcdGxldCBjbHM9XCJib3ggdy0xIGJnLXN1Y2Nlc3MgdGV4dC1saWdodCBjaG9yZCBcIjtcblx0XHRcdGlmIChpbmRleD09dGhpcy5jb250ZXh0LmN1cnJlbnRDaG9yZEluZGV4KVxuXHRcdFx0XHRjbHMrPVwiIGFjdGl2ZSBiZWF0LTAgYmVhdC00IGJlYXQtOCBiZWF0LTEyXCI7XG5cblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxBIGNsYXNzPXtjbHN9XG5cdFx0XHRcdFx0XHRvblByZXNzPXt0aGlzLmNvbnRleHQuc2V0Q3VycmVudENob3JkSW5kZXguYmluZChudWxsLGluZGV4KX0+XG5cdFx0XHRcdFx0e2xhYmVsfVxuXHRcdFx0XHQ8L0E+XG5cdFx0XHQpXG5cdFx0fSk7XG5cdH1cblxuXHRyZW5kZXJTZWN0aW9uQ2hvcmRzKCkge1xuXHRcdGxldCBhPXRoaXMuY29udGV4dC5nZXRDdXJyZW50U2VjdGlvbkNob3JkTGFiZWxzKCkubWFwKChsYWJlbCwgaW5kZXgpPT57XG5cdFx0XHRsZXQgY2xzPVwiYm94IHctMSBiZy1zdWNjZXNzIHRleHQtbGlnaHQgc2VjdGlvbi1jaG9yZCBzZXF1ZW5jZS1cIitpbmRleDtcblxuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PEEgY2xhc3M9e2Nsc31cblx0XHRcdFx0XHRcdG9uUmVsZWFzZT17dGhpcy5jb250ZXh0LnNob3dFZGl0U2VjdGlvbkNob3JkLmJpbmQobnVsbCxpbmRleCl9PlxuXHRcdFx0XHRcdHtsYWJlbH1cblx0XHRcdFx0PC9BPlxuXHRcdFx0KTtcblx0XHR9KTtcblxuXHRcdGEucHVzaChcblx0XHRcdDxBIGNsYXNzPVwiYm94IGJvcmRlciBib3JkZXItd2hpdGUgdGV4dC13aGl0ZSB3LTFcIlxuXHRcdFx0XHRcdG9uUmVsZWFzZT17dGhpcy5jb250ZXh0LmFkZFNlY3Rpb25DaG9yZH0+XG5cdFx0XHRcdCtcblx0XHRcdDwvQT5cblx0XHQpO1xuXG5cdFx0cmV0dXJuIGE7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0bGV0IHNvbmc9dGhpcy5jb250ZXh0LmdldEN1cnJlbnRTb25nKCk7XG5cblx0XHRsZXQgY2hvcmRMYWJlbHM7XG5cdFx0aWYgKHRoaXMuY29udGV4dC5jdXJyZW50U2VjdGlvbkluZGV4PT0tMSlcblx0XHRcdGNob3JkTGFiZWxzPXRoaXMucmVuZGVyQ29uZHVjdG9yQ2hvcmRzKCk7XG5cblx0XHRlbHNlXG5cdFx0XHRjaG9yZExhYmVscz10aGlzLnJlbmRlclNlY3Rpb25DaG9yZHMoKTtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZSBib3ggYm9yZGVyIGJvcmRlci1kYXJrXCI+XG5cdFx0XHRcdDxociBjbGFzcz1cInBhbmUtZGl2aWRlclwiLz5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInBhbmUtaGVhZGVyIHRleHQtc2Vjb25kYXJ5IGJnLWRhcmsgXCI+Q0hPUkRTPC9kaXY+XG5cdFx0XHRcdDxkaXYgc3R5bGU9e3toZWlnaHQ6ICc2ZW0nfX0+e2Nob3JkTGFiZWxzfTwvZGl2PlxuXHRcdFx0XHQ8QSBjbGFzcz17XCJib3ggdy0xIGJnLXNlY29uZGFyeSB0ZXh0LXdoaXRlIFwiK1xuXHRcdFx0XHRcdFx0XHQoKHRoaXMuY29udGV4dC5jdXJyZW50U2VjdGlvbkluZGV4PT0tMSk/XCJhY3RpdmVcIjpcIlwiKX1cblx0XHRcdFx0XHRcdG9uUHJlc3M9e3RoaXMuY29udGV4dC5zZXRDdXJyZW50U2VjdGlvbkluZGV4LmJpbmQobnVsbCwtMSl9PlxuXHRcdFx0XHRcdDxpbWcgc3JjPVwiaW1nL2NvbmR1Y3Rvci5zdmdcIi8+XG5cdFx0XHRcdDwvQT5cblx0XHRcdFx0e1tcIkFcIixcIkJcIixcIkNcIl0ubWFwKChsZXR0ZXIsIGluZGV4KT0+e1xuXHRcdFx0XHRcdGxldCBjbHM9XCJib3ggdy0xIGJnLXByaW1hcnkgdGV4dC13aGl0ZSBcIjtcblx0XHRcdFx0XHRpZiAoaW5kZXg9PXRoaXMuY29udGV4dC5jdXJyZW50U2VjdGlvbkluZGV4KVxuXHRcdFx0XHRcdFx0Y2xzKz1cImFjdGl2ZVwiO1xuXG5cdFx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHRcdDxBIGNsYXNzPXtjbHN9XG5cdFx0XHRcdFx0XHRcdFx0b25QcmVzcz17dGhpcy5jb250ZXh0LnNldEN1cnJlbnRTZWN0aW9uSW5kZXguYmluZChudWxsLGluZGV4KX0+XG5cdFx0XHRcdFx0XHRcdHtsZXR0ZXJ9XG5cdFx0XHRcdFx0XHQ8L0E+XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSl9XG5cdFx0XHRcdHtJRih0aGlzLmNvbnRleHQuZWRpdFNlY3Rpb25DaG9yZFZpc2libGU+PTAsKCk9PlxuXHRcdFx0XHRcdDxTZWxlY3RDaG9yZCAvPlxuXHRcdFx0XHQpfVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuIiwiaW1wb3J0IHsgaCwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCBBIGZyb20gJy4vQS5qc3gnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTb25nTGF5ZXJzIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0cmVuZGVyKCkge1xuXHRcdGxldCBzb25nPXRoaXMuY29udGV4dC5nZXRDdXJyZW50U29uZygpO1xuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lIGJveCBib3JkZXIgYm9yZGVyLWRhcmtcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInBhbmUtaGVhZGVyIHRleHQtc2Vjb25kYXJ5XCI+TEFZRVJTPC9kaXY+XG5cdFx0XHRcdHtzb25nLmxheWVycy5tYXAoKGxheWVyLGluZGV4KT0+e1xuXHRcdFx0XHRcdGxldCBjbHM9XCJib3ggYmctZGFuZ2VyIHRleHQtd2hpdGUgdy0yIGxheWVyLWJ1dHRvbi1cIitpbmRleCtcIiBcIjtcblx0XHRcdFx0XHRsZXQgaWNvbj1cImltZy90b2dnbGUtb24uc3ZnXCI7XG5cblx0XHRcdFx0XHRpZiAoIWxheWVyLmF1ZGlibGUpIHtcblx0XHRcdFx0XHRcdGljb249XCJpbWcvdG9nZ2xlLW9mZi5zdmdcIjtcblx0XHRcdFx0XHRcdGNscys9XCJmYWRlZFwiO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0XHQ8QSBjbGFzcz17Y2xzfVxuXHRcdFx0XHRcdFx0XHRvblJlbGVhc2U9e3RoaXMuY29udGV4dC5zZXRMYXllckluZGV4LmJpbmQobnVsbCxpbmRleCl9PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwibGF5ZXItaWNvblwiPlxuXHRcdFx0XHRcdFx0XHRcdDxpbWcgc3JjPXtcImltZy9cIit0aGlzLmNvbnRleHQuZ2V0SW5zdHJ1bWVudEJ5TmFtZShsYXllci5pbnN0cnVtZW50TmFtZSkuaWNvbn0vPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PEEgY2xhc3M9XCJsYXllci1pY29uXCJcblx0XHRcdFx0XHRcdFx0XHRvblByZXNzPXt0aGlzLmNvbnRleHQudG9nZ2xlTGF5ZXJBdWRpYmxlLmJpbmQobnVsbCxpbmRleCl9PlxuXHRcdFx0XHRcdFx0XHRcdDxpbWcgc3JjPXtpY29ufS8+XG5cdFx0XHRcdFx0XHRcdDwvQT5cblx0XHRcdFx0XHRcdDwvQT5cblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9KX1cblxuXHRcdFx0XHQ8QSBjbGFzcz1cImJveCBib3JkZXIgYm9yZGVyLXdoaXRlIHRleHQtd2hpdGUgdy0xXCJcblx0XHRcdFx0XHRcdGhyZWY9XCIjXCJcblx0XHRcdFx0XHRcdG9uUmVsZWFzZT17dGhpcy5jb250ZXh0LnNob3dBZGRMYXllcn0+XG5cdFx0XHRcdFx0K1xuXHRcdFx0XHQ8L0E+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBoLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IHsgU2VsZWN0LCBJRiB9IGZyb20gJy4uL3V0aWxzL1JlYWN0VXRpbC5qc3gnO1xuaW1wb3J0IEEgZnJvbSAnLi9BLmpzeCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNvbmdTZXR0aW5ncyB7XG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzcz1cInBhbmUtY29udGFpbmVyXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lIGJveCBkb3VibGUgYmctZGFya1wiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lLWhlYWRlciBiZy1kYXJrIHRleHQtc2Vjb25kYXJ5XCI+U09ORyBTRVRUSU5HUzwvZGl2PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuXHRcdFx0XHRcdFx0U29uZyBOYW1lPGJyLz5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJib3ggYm9yZGVyIGJnLXdoaXRlIGJvcmRlci1ibGFjayB0ZXh0LWJsYWNrIHctNFwiPlxuXHRcdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cInRleHRcIlxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlPXt0aGlzLmNvbnRleHQuZ2V0Q3VycmVudFNvbmcoKS5uYW1lfVxuXHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLmNvbnRleHQuc2V0Q3VycmVudFNvbmdOYW1lfS8+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuXHRcdFx0XHRcdFx0VGVtcG88YnIvPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImJveCBib3JkZXIgYmctd2hpdGUgYm9yZGVyLWJsYWNrIHRleHQtYmxhY2sgdy00XCI+XG5cdFx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwidGV4dFwiXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU9e3RoaXMuY29udGV4dC5nZXRDdXJyZW50U29uZygpLmJwbX1cblx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5jb250ZXh0LnNldEN1cnJlbnRTb25nQnBtfS8+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuXHRcdFx0XHRcdFx0S2V5PGJyLz5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJib3ggYm9yZGVyIGJnLXdoaXRlIGJvcmRlci1ibGFjayB0ZXh0LWJsYWNrIHctMlwiPlxuXHRcdFx0XHRcdFx0XHQ8U2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sIGNvbC0yXCJcblx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnM9e3RoaXMuY29udGV4dC5nZXROb3Rlc1NlbGVjdE9wdGlvbnMoKX1cblx0XHRcdFx0XHRcdFx0XHRcdHNlbGVjdGVkPXt0aGlzLmNvbnRleHQuZ2V0Q3VycmVudFNvbmcoKS5tdXNpY0tleX1cblx0XHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLmNvbnRleHQuc2V0Q3VycmVudFNvbmdNdXNpY0tleX0vPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYm94IGJvcmRlciBiZy13aGl0ZSBib3JkZXItYmxhY2sgdGV4dC1ibGFjayB3LTJcIj5cblx0XHRcdFx0XHRcdFx0PFNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbCBjb2wtNFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zPXt0aGlzLmNvbnRleHQuZ2V0TW9kYWxTZWxlY3RPcHRpb25zKCl9XG5cdFx0XHRcdFx0XHRcdFx0XHRzZWxlY3RlZD17dGhpcy5jb250ZXh0LmdldEN1cnJlbnRTb25nKCkubWlub3J9XG5cdFx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5jb250ZXh0LnNldEN1cnJlbnRTb25nTWlub3J9Lz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cImZvcm0tYnV0dG9uc1wiPlxuXHRcdFx0XHRcdFx0PEEgY2xhc3M9XCJiZy13YXJuaW5nIGJveCB0ZXh0LXdoaXRlIHctMVwiXG5cdFx0XHRcdFx0XHRcdFx0aHJlZj1cIiNcIlxuXHRcdFx0XHRcdFx0XHRcdG9uUmVsZWFzZT17dGhpcy5jb250ZXh0LmRlbGV0ZUN1cnJlbnRTb25nfT5cblx0XHRcdFx0XHRcdFx0PGltZyBzcmM9XCJpbWcvdHJhc2guc3ZnXCIvPlxuXHRcdFx0XHRcdFx0PC9BPlxuXHRcdFx0XHRcdFx0PEEgY2xhc3M9XCJiZy1wcmltYXJ5IGJveCB0ZXh0LXdoaXRlXCJcblx0XHRcdFx0XHRcdFx0XHRocmVmPVwiI1wiXG5cdFx0XHRcdFx0XHRcdFx0b25SZWxlYXNlPXt0aGlzLmNvbnRleHQudG9nZ2xlU2V0dGluZ3N9PlxuXHRcdFx0XHRcdFx0XHRDbG9zZVxuXHRcdFx0XHRcdFx0PC9BPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbiIsImltcG9ydCB7IGgsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyBTZWxlY3QsIElGIH0gZnJvbSAnLi4vdXRpbHMvUmVhY3RVdGlsLmpzeCc7XG5pbXBvcnQgQSBmcm9tICcuL0EuanN4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFwSGlnaGxpZ2h0IGV4dGVuZHMgQ29tcG9uZW50IHtcblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG5cblx0XHR0aGlzLnN0YXRlPXtcblx0XHRcdHNob3dIaWdobGlnaHQ6IGZhbHNlXG5cdFx0fVxuXHR9XG5cblx0b25Db250ZXh0TWVudT0oZSk9Pntcblx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0c2hvd0hpZ2hsaWdodDogdHJ1ZVxuXHRcdH0pO1xuXG5cdFx0bGV0IHM9ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlO1xuXHRcdHMuc2V0UHJvcGVydHkoXCItLXRhcEhpZ2hsaWdodExlZnRcIixlLmNsaWVudFgrXCJweFwiKTtcblx0XHRzLnNldFByb3BlcnR5KFwiLS10YXBIaWdobGlnaHRUb3BcIixlLmNsaWVudFkrXCJweFwiKTtcblx0fTtcblxuXHRvbk1vdXNlVXA9KGUpPT57XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRzaG93SGlnaGxpZ2h0OiBmYWxzZVxuXHRcdH0pO1xuXHR9O1xuXG5cdGNvbXBvbmVudERpZE1vdW50KCkge1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLHRoaXMub25Db250ZXh0TWVudSk7XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIix0aGlzLm9uTW91c2VVcCk7XG5cdH1cblxuXHRjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcblx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIix0aGlzLm9uQ29udGV4dE1lbnUpO1xuXHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsdGhpcy5vbk1vdXNlVXApO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzPVwidGFwLWhpZ2hsaWdodFwiPlxuXHRcdFx0XHR7SUYodGhpcy5zdGF0ZS5zaG93SGlnaGxpZ2h0LCgpPT5cblx0XHRcdFx0XHQ8aW1nIHNyYz1cImltZy90YXAtaGlnaGxpZ2h0LnN2Z1wiLz5cblx0XHRcdFx0KX1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0iXX0=
