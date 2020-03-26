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

//const appPackage=require("../../package.json");
var appPackage = {
  version: "abc"
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbmFub2lkL2Zvcm1hdC5icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9kZWJ1Zy9kaXN0L2RlYnVnLmpzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9kZXZ0b29scy9kaXN0L2RldnRvb2xzLmpzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9kaXN0L3ByZWFjdC5qcyIsIm5vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiLCJub2RlX21vZHVsZXMvc2hvcnRpZC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9hbHBoYWJldC5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9idWlsZC5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9nZW5lcmF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9pcy12YWxpZC5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9yYW5kb20vcmFuZG9tLWJ5dGUtYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi9yYW5kb20vcmFuZG9tLWZyb20tc2VlZC5qcyIsIm5vZGVfbW9kdWxlcy9zaG9ydGlkL2xpYi91dGlsL2NsdXN0ZXItd29ya2VyLWlkLWJyb3dzZXIuanMiLCJzcmMvaW5kZXguanN4Iiwic3JjL21vZGVsL0FwcENvbnRyb2xsZXIuanMiLCJzcmMvbW9kZWwvQXBwSGVscGVyLmpzIiwic3JjL21vZGVsL0NvbmR1Y3Rvci5qcyIsInNyYy9tb2RlbC9Db25kdWN0b3JJbnN0cnVtZW50LmpzIiwic3JjL21vZGVsL0NvbmR1Y3RvckxheWVyLmpzIiwic3JjL21vZGVsL0NvbmR1Y3Rvck5vdGUuanMiLCJzcmMvdXRpbHMvQXBwQ29udGV4dC5qcyIsInNyYy91dGlscy9BdWRpb1RpbWVyLmpzIiwic3JjL3V0aWxzL0F1ZGlvVXRpbC5qcyIsInNyYy91dGlscy9NdXNpY1V0aWwuanMiLCJzcmMvdXRpbHMvUmVhY3RVdGlsLmpzeCIsInNyYy91dGlscy9SZWNvbmNpbGVBcnJheS5qcyIsInNyYy92aWV3L0EuanN4Iiwic3JjL3ZpZXcvQWRkTGF5ZXIuanN4Iiwic3JjL3ZpZXcvQXBwLmpzeCIsInNyYy92aWV3L0Zyb250LmpzeCIsInNyYy92aWV3L0hlYWRlci5qc3giLCJzcmMvdmlldy9MYXllci5qc3giLCJzcmMvdmlldy9MYXllclNldHRpbmdzLmpzeCIsInNyYy92aWV3L1NlbGVjdENob3JkLmpzeCIsInNyYy92aWV3L1NvbmcuanN4Iiwic3JjL3ZpZXcvU29uZ0Nob3Jkcy5qc3giLCJzcmMvdmlldy9Tb25nTGF5ZXJzLmpzeCIsInNyYy92aWV3L1NvbmdTZXR0aW5ncy5qc3giLCJzcmMvdmlldy9UYXBIaWdobGlnaHQuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdHRCQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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LE1BQUEsYUFBYSxFQUFFO0FBREwsS0FBWDtBQUhrQjtBQU1sQjs7Ozt3Q0FxQm1CO0FBQ25CLE1BQUEsUUFBUSxDQUFDLGdCQUFULENBQTBCLGFBQTFCLEVBQXdDLEtBQUssYUFBN0M7QUFDQSxNQUFBLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixTQUExQixFQUFvQyxLQUFLLFNBQXpDO0FBQ0E7OzsyQ0FFc0I7QUFDdEIsTUFBQSxRQUFRLENBQUMsbUJBQVQsQ0FBNkIsYUFBN0IsRUFBMkMsS0FBSyxhQUFoRDtBQUNBLE1BQUEsUUFBUSxDQUFDLG1CQUFULENBQTZCLFNBQTdCLEVBQXVDLEtBQUssU0FBNUM7QUFDQTs7OzZCQUVRO0FBQ1IsYUFDQztBQUFLLGlCQUFNO0FBQVgsU0FDRSxtQkFBRyxLQUFLLEtBQUwsQ0FBVyxhQUFkLEVBQTRCO0FBQUEsZUFDNUI7QUFBSyxVQUFBLEdBQUcsRUFBQztBQUFULFVBRDRCO0FBQUEsT0FBNUIsQ0FERixDQUREO0FBT0E7Ozs7RUE5Q3dDLGlCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gVGhpcyBmaWxlIHJlcGxhY2VzIGBmb3JtYXQuanNgIGluIGJ1bmRsZXJzIGxpa2Ugd2VicGFjayBvciBSb2xsdXAsXG4vLyBhY2NvcmRpbmcgdG8gYGJyb3dzZXJgIGNvbmZpZyBpbiBgcGFja2FnZS5qc29uYC5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAocmFuZG9tLCBhbHBoYWJldCwgc2l6ZSkge1xuICAvLyBXZSBjYW7igJl0IHVzZSBieXRlcyBiaWdnZXIgdGhhbiB0aGUgYWxwaGFiZXQuIFRvIG1ha2UgYnl0ZXMgdmFsdWVzIGNsb3NlclxuICAvLyB0byB0aGUgYWxwaGFiZXQsIHdlIGFwcGx5IGJpdG1hc2sgb24gdGhlbS4gV2UgbG9vayBmb3IgdGhlIGNsb3Nlc3RcbiAgLy8gYDIgKiogeCAtIDFgIG51bWJlciwgd2hpY2ggd2lsbCBiZSBiaWdnZXIgdGhhbiBhbHBoYWJldCBzaXplLiBJZiB3ZSBoYXZlXG4gIC8vIDMwIHN5bWJvbHMgaW4gdGhlIGFscGhhYmV0LCB3ZSB3aWxsIHRha2UgMzEgKDAwMDExMTExKS5cbiAgLy8gV2UgZG8gbm90IHVzZSBmYXN0ZXIgTWF0aC5jbHozMiwgYmVjYXVzZSBpdCBpcyBub3QgYXZhaWxhYmxlIGluIGJyb3dzZXJzLlxuICB2YXIgbWFzayA9ICgyIDw8IE1hdGgubG9nKGFscGhhYmV0Lmxlbmd0aCAtIDEpIC8gTWF0aC5MTjIpIC0gMVxuICAvLyBCaXRtYXNrIGlzIG5vdCBhIHBlcmZlY3Qgc29sdXRpb24gKGluIG91ciBleGFtcGxlIGl0IHdpbGwgcGFzcyAzMSBieXRlcyxcbiAgLy8gd2hpY2ggaXMgYmlnZ2VyIHRoYW4gdGhlIGFscGhhYmV0KS4gQXMgYSByZXN1bHQsIHdlIHdpbGwgbmVlZCBtb3JlIGJ5dGVzLFxuICAvLyB0aGFuIElEIHNpemUsIGJlY2F1c2Ugd2Ugd2lsbCByZWZ1c2UgYnl0ZXMgYmlnZ2VyIHRoYW4gdGhlIGFscGhhYmV0LlxuXG4gIC8vIEV2ZXJ5IGhhcmR3YXJlIHJhbmRvbSBnZW5lcmF0b3IgY2FsbCBpcyBjb3N0bHksXG4gIC8vIGJlY2F1c2Ugd2UgbmVlZCB0byB3YWl0IGZvciBlbnRyb3B5IGNvbGxlY3Rpb24uIFRoaXMgaXMgd2h5IG9mdGVuIGl0IHdpbGxcbiAgLy8gYmUgZmFzdGVyIHRvIGFzayBmb3IgZmV3IGV4dHJhIGJ5dGVzIGluIGFkdmFuY2UsIHRvIGF2b2lkIGFkZGl0aW9uYWwgY2FsbHMuXG5cbiAgLy8gSGVyZSB3ZSBjYWxjdWxhdGUgaG93IG1hbnkgcmFuZG9tIGJ5dGVzIHNob3VsZCB3ZSBjYWxsIGluIGFkdmFuY2UuXG4gIC8vIEl0IGRlcGVuZHMgb24gSUQgbGVuZ3RoLCBtYXNrIC8gYWxwaGFiZXQgc2l6ZSBhbmQgbWFnaWMgbnVtYmVyIDEuNlxuICAvLyAod2hpY2ggd2FzIHNlbGVjdGVkIGFjY29yZGluZyBiZW5jaG1hcmtzKS5cblxuICAvLyAtfmYgPT4gTWF0aC5jZWlsKGYpIGlmIG4gaXMgZmxvYXQgbnVtYmVyXG4gIC8vIC1+aSA9PiBpICsgMSBpZiBuIGlzIGludGVnZXIgbnVtYmVyXG4gIHZhciBzdGVwID0gLX4oMS42ICogbWFzayAqIHNpemUgLyBhbHBoYWJldC5sZW5ndGgpXG4gIHZhciBpZCA9ICcnXG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICB2YXIgYnl0ZXMgPSByYW5kb20oc3RlcClcbiAgICAvLyBDb21wYWN0IGFsdGVybmF0aXZlIGZvciBgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGVwOyBpKyspYFxuICAgIHZhciBpID0gc3RlcFxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIC8vIElmIHJhbmRvbSBieXRlIGlzIGJpZ2dlciB0aGFuIGFscGhhYmV0IGV2ZW4gYWZ0ZXIgYml0bWFzayxcbiAgICAgIC8vIHdlIHJlZnVzZSBpdCBieSBgfHwgJydgLlxuICAgICAgaWQgKz0gYWxwaGFiZXRbYnl0ZXNbaV0gJiBtYXNrXSB8fCAnJ1xuICAgICAgLy8gTW9yZSBjb21wYWN0IHRoYW4gYGlkLmxlbmd0aCArIDEgPT09IHNpemVgXG4gICAgICBpZiAoaWQubGVuZ3RoID09PSArc2l6ZSkgcmV0dXJuIGlkXG4gICAgfVxuICB9XG59XG4iLCJ2YXIgbj1yZXF1aXJlKFwicHJlYWN0XCIpO3JlcXVpcmUoXCJwcmVhY3QvZGV2dG9vbHNcIik7dmFyIGU9e307ZnVuY3Rpb24gdChlKXtyZXR1cm4gZS50eXBlPT09bi5GcmFnbWVudD9cIkZyYWdtZW50XCI6XCJmdW5jdGlvblwiPT10eXBlb2YgZS50eXBlP2UudHlwZS5kaXNwbGF5TmFtZXx8ZS50eXBlLm5hbWU6XCJzdHJpbmdcIj09dHlwZW9mIGUudHlwZT9lLnR5cGU6XCIjdGV4dFwifXZhciBvPVtdLHI9W107ZnVuY3Rpb24gYSgpe3JldHVybiBvLmxlbmd0aD4wP29bby5sZW5ndGgtMV06bnVsbH12YXIgaT0hMTtmdW5jdGlvbiBzKGUpe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIGUudHlwZSYmZS50eXBlIT09bi5GcmFnbWVudH1mdW5jdGlvbiBjKG4pe2Zvcih2YXIgZT1bbl0sbz1uO251bGwhPW8uX19vOyllLnB1c2goby5fX28pLG89by5fX287cmV0dXJuIGUucmVkdWNlKGZ1bmN0aW9uKG4sZSl7bis9XCIgIGluIFwiK3QoZSk7dmFyIG89ZS5fX3NvdXJjZTtyZXR1cm4gbz9uKz1cIiAoYXQgXCIrby5maWxlTmFtZStcIjpcIitvLmxpbmVOdW1iZXIrXCIpXCI6aXx8KGk9ITAsY29uc29sZS53YXJuKFwiQWRkIEBiYWJlbC9wbHVnaW4tdHJhbnNmb3JtLXJlYWN0LWpzeC1zb3VyY2UgdG8gZ2V0IGEgbW9yZSBkZXRhaWxlZCBjb21wb25lbnQgc3RhY2suIE5vdGUgdGhhdCB5b3Ugc2hvdWxkIG5vdCBhZGQgaXQgdG8gcHJvZHVjdGlvbiBidWlsZHMgb2YgeW91ciBBcHAgZm9yIGJ1bmRsZSBzaXplIHJlYXNvbnMuXCIpKSxuK1wiXFxuXCJ9LFwiXCIpfXZhciBsPVwiZnVuY3Rpb25cIj09dHlwZW9mIFdlYWtNYXAsdT1uLkNvbXBvbmVudC5wcm90b3R5cGUuc2V0U3RhdGU7bi5Db21wb25lbnQucHJvdG90eXBlLnNldFN0YXRlPWZ1bmN0aW9uKG4sZSl7cmV0dXJuIG51bGw9PXRoaXMuX192P251bGw9PXRoaXMuc3RhdGUmJmNvbnNvbGUud2FybignQ2FsbGluZyBcInRoaXMuc2V0U3RhdGVcIiBpbnNpZGUgdGhlIGNvbnN0cnVjdG9yIG9mIGEgY29tcG9uZW50IGlzIGEgbm8tb3AgYW5kIG1pZ2h0IGJlIGEgYnVnIGluIHlvdXIgYXBwbGljYXRpb24uIEluc3RlYWQsIHNldCBcInRoaXMuc3RhdGUgPSB7fVwiIGRpcmVjdGx5LlxcblxcbicrYyhhKCkpKTpudWxsPT10aGlzLl9fUCYmY29uc29sZS53YXJuKCdDYW5cXCd0IGNhbGwgXCJ0aGlzLnNldFN0YXRlXCIgb24gYW4gdW5tb3VudGVkIGNvbXBvbmVudC4gVGhpcyBpcyBhIG5vLW9wLCBidXQgaXQgaW5kaWNhdGVzIGEgbWVtb3J5IGxlYWsgaW4geW91ciBhcHBsaWNhdGlvbi4gVG8gZml4LCBjYW5jZWwgYWxsIHN1YnNjcmlwdGlvbnMgYW5kIGFzeW5jaHJvbm91cyB0YXNrcyBpbiB0aGUgY29tcG9uZW50V2lsbFVubW91bnQgbWV0aG9kLlxcblxcbicrYyh0aGlzLl9fdikpLHUuY2FsbCh0aGlzLG4sZSl9O3ZhciBmPW4uQ29tcG9uZW50LnByb3RvdHlwZS5mb3JjZVVwZGF0ZTtmdW5jdGlvbiBwKG4pe3ZhciBlPW4ucHJvcHMsbz10KG4pLHI9XCJcIjtmb3IodmFyIGEgaW4gZSlpZihlLmhhc093blByb3BlcnR5KGEpJiZcImNoaWxkcmVuXCIhPT1hKXt2YXIgaT1lW2FdO1wiZnVuY3Rpb25cIj09dHlwZW9mIGkmJihpPVwiZnVuY3Rpb24gXCIrKGkuZGlzcGxheU5hbWV8fGkubmFtZSkrXCIoKSB7fVwiKSxpPU9iamVjdChpKSE9PWl8fGkudG9TdHJpbmc/aStcIlwiOk9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpKSxyKz1cIiBcIithK1wiPVwiK0pTT04uc3RyaW5naWZ5KGkpfXZhciBzPWUuY2hpbGRyZW47cmV0dXJuXCI8XCIrbytyKyhzJiZzLmxlbmd0aD9cIj4uLjwvXCIrbytcIj5cIjpcIiAvPlwiKX1uLkNvbXBvbmVudC5wcm90b3R5cGUuZm9yY2VVcGRhdGU9ZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PXRoaXMuX192P2NvbnNvbGUud2FybignQ2FsbGluZyBcInRoaXMuZm9yY2VVcGRhdGVcIiBpbnNpZGUgdGhlIGNvbnN0cnVjdG9yIG9mIGEgY29tcG9uZW50IGlzIGEgbm8tb3AgYW5kIG1pZ2h0IGJlIGEgYnVnIGluIHlvdXIgYXBwbGljYXRpb24uXFxuXFxuJytjKGEoKSkpOm51bGw9PXRoaXMuX19QJiZjb25zb2xlLndhcm4oJ0NhblxcJ3QgY2FsbCBcInRoaXMuZm9yY2VVcGRhdGVcIiBvbiBhbiB1bm1vdW50ZWQgY29tcG9uZW50LiBUaGlzIGlzIGEgbm8tb3AsIGJ1dCBpdCBpbmRpY2F0ZXMgYSBtZW1vcnkgbGVhayBpbiB5b3VyIGFwcGxpY2F0aW9uLiBUbyBmaXgsIGNhbmNlbCBhbGwgc3Vic2NyaXB0aW9ucyBhbmQgYXN5bmNocm9ub3VzIHRhc2tzIGluIHRoZSBjb21wb25lbnRXaWxsVW5tb3VudCBtZXRob2QuXFxuXFxuJytjKHRoaXMuX192KSksZi5jYWxsKHRoaXMsbil9LGZ1bmN0aW9uKCl7IWZ1bmN0aW9uKCl7dmFyIGU9bi5vcHRpb25zLl9fYix0PW4ub3B0aW9ucy5kaWZmZWQsYT1uLm9wdGlvbnMuX18saT1uLm9wdGlvbnMudm5vZGUsYz1uLm9wdGlvbnMuX19yO24ub3B0aW9ucy5kaWZmZWQ9ZnVuY3Rpb24obil7cyhuKSYmci5wb3AoKSxvLnBvcCgpLHQmJnQobil9LG4ub3B0aW9ucy5fX2I9ZnVuY3Rpb24obil7cyhuKSYmby5wdXNoKG4pLGUmJmUobil9LG4ub3B0aW9ucy5fXz1mdW5jdGlvbihuLGUpe3I9W10sYSYmYShuLGUpfSxuLm9wdGlvbnMudm5vZGU9ZnVuY3Rpb24obil7bi5fX289ci5sZW5ndGg+MD9yW3IubGVuZ3RoLTFdOm51bGwsaSYmaShuKX0sbi5vcHRpb25zLl9fcj1mdW5jdGlvbihuKXtzKG4pJiZyLnB1c2gobiksYyYmYyhuKX19KCk7dmFyIGE9bi5vcHRpb25zLl9fYixpPW4ub3B0aW9ucy5kaWZmZWQsdT1uLm9wdGlvbnMudm5vZGUsZj1uLm9wdGlvbnMuX19lLGQ9bi5vcHRpb25zLl9fLGg9bi5vcHRpb25zLl9faCx5PWw/e3VzZUVmZmVjdDpuZXcgV2Vha01hcCx1c2VMYXlvdXRFZmZlY3Q6bmV3IFdlYWtNYXAsbGF6eVByb3BUeXBlczpuZXcgV2Vha01hcH06bnVsbDtuLm9wdGlvbnMuX19lPWZ1bmN0aW9uKG4sZSxvKXtpZihlJiZlLl9fYyYmXCJmdW5jdGlvblwiPT10eXBlb2Ygbi50aGVuKXt2YXIgcj1uO249bmV3IEVycm9yKFwiTWlzc2luZyBTdXNwZW5zZS4gVGhlIHRocm93aW5nIGNvbXBvbmVudCB3YXM6IFwiK3QoZSkpO2Zvcih2YXIgYT1lO2E7YT1hLl9fKWlmKGEuX19jJiZhLl9fYy5fX2Mpe249cjticmVha31pZihuIGluc3RhbmNlb2YgRXJyb3IpdGhyb3cgbn1mKG4sZSxvKX0sbi5vcHRpb25zLl9fPWZ1bmN0aW9uKG4sZSl7aWYoIWUpdGhyb3cgbmV3IEVycm9yKFwiVW5kZWZpbmVkIHBhcmVudCBwYXNzZWQgdG8gcmVuZGVyKCksIHRoaXMgaXMgdGhlIHNlY29uZCBhcmd1bWVudC5cXG5DaGVjayBpZiB0aGUgZWxlbWVudCBpcyBhdmFpbGFibGUgaW4gdGhlIERPTS9oYXMgdGhlIGNvcnJlY3QgaWQuXCIpO3ZhciBvO3N3aXRjaChlLm5vZGVUeXBlKXtjYXNlIDE6Y2FzZSAxMTpjYXNlIDk6bz0hMDticmVhaztkZWZhdWx0Om89ITF9aWYoIW8pe3ZhciByPXQobik7dGhyb3cgbmV3IEVycm9yKFwiRXhwZWN0ZWQgYSB2YWxpZCBIVE1MIG5vZGUgYXMgYSBzZWNvbmQgYXJndW1lbnQgdG8gcmVuZGVyLlxcdFJlY2VpdmVkIFwiK2UrXCIgaW5zdGVhZDogcmVuZGVyKDxcIityK1wiIC8+LCBcIitlK1wiKTtcIil9ZCYmZChuLGUpfSxuLm9wdGlvbnMuX19iPWZ1bmN0aW9uKG4pe3ZhciBvLHIsaSxzLGw9bi50eXBlLHU9ZnVuY3Rpb24gbihlKXtyZXR1cm4gZT9cImZ1bmN0aW9uXCI9PXR5cGVvZiBlLnR5cGU/bihlLl9fKTplOnt9fShuLl9fKTtpZih2b2lkIDA9PT1sKXRocm93IG5ldyBFcnJvcihcIlVuZGVmaW5lZCBjb21wb25lbnQgcGFzc2VkIHRvIGNyZWF0ZUVsZW1lbnQoKVxcblxcbllvdSBsaWtlbHkgZm9yZ290IHRvIGV4cG9ydCB5b3VyIGNvbXBvbmVudCBvciBtaWdodCBoYXZlIG1peGVkIHVwIGRlZmF1bHQgYW5kIG5hbWVkIGltcG9ydHNcIitwKG4pK1wiXFxuXFxuXCIrYyhuKSk7aWYobnVsbCE9bCYmXCJvYmplY3RcIj09dHlwZW9mIGwpe2lmKHZvaWQgMCE9PWwuX19rJiZ2b2lkIDAhPT1sLl9fZSl0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHR5cGUgcGFzc2VkIHRvIGNyZWF0ZUVsZW1lbnQoKTogXCIrbCtcIlxcblxcbkRpZCB5b3UgYWNjaWRlbnRhbGx5IHBhc3MgYSBKU1ggbGl0ZXJhbCBhcyBKU1ggdHdpY2U/XFxuXFxuICBsZXQgTXlcIit0KG4pK1wiID0gXCIrcChsKStcIjtcXG4gIGxldCB2bm9kZSA9IDxNeVwiK3QobikrXCIgLz47XFxuXFxuVGhpcyB1c3VhbGx5IGhhcHBlbnMgd2hlbiB5b3UgZXhwb3J0IGEgSlNYIGxpdGVyYWwgYW5kIG5vdCB0aGUgY29tcG9uZW50LlxcblxcblwiK2MobikpO3Rocm93IG5ldyBFcnJvcihcIkludmFsaWQgdHlwZSBwYXNzZWQgdG8gY3JlYXRlRWxlbWVudCgpOiBcIisoQXJyYXkuaXNBcnJheShsKT9cImFycmF5XCI6bCkpfWlmKFwidGhlYWRcIiE9PWwmJlwidGZvb3RcIiE9PWwmJlwidGJvZHlcIiE9PWx8fFwidGFibGVcIj09PXUudHlwZT9cInRyXCI9PT1sJiZcInRoZWFkXCIhPT11LnR5cGUmJlwidGZvb3RcIiE9PXUudHlwZSYmXCJ0Ym9keVwiIT09dS50eXBlJiZcInRhYmxlXCIhPT11LnR5cGU/Y29uc29sZS5lcnJvcihcIkltcHJvcGVyIG5lc3Rpbmcgb2YgdGFibGUuIFlvdXIgPHRyPiBzaG91bGQgaGF2ZSBhIDx0aGVhZC90Ym9keS90Zm9vdC90YWJsZT4gcGFyZW50LlwiK3AobikrXCJcXG5cXG5cIitjKG4pKTpcInRkXCI9PT1sJiZcInRyXCIhPT11LnR5cGU/Y29uc29sZS5lcnJvcihcIkltcHJvcGVyIG5lc3Rpbmcgb2YgdGFibGUuIFlvdXIgPHRkPiBzaG91bGQgaGF2ZSBhIDx0cj4gcGFyZW50LlwiK3AobikrXCJcXG5cXG5cIitjKG4pKTpcInRoXCI9PT1sJiZcInRyXCIhPT11LnR5cGUmJmNvbnNvbGUuZXJyb3IoXCJJbXByb3BlciBuZXN0aW5nIG9mIHRhYmxlLiBZb3VyIDx0aD4gc2hvdWxkIGhhdmUgYSA8dHI+LlwiK3AobikrXCJcXG5cXG5cIitjKG4pKTpjb25zb2xlLmVycm9yKFwiSW1wcm9wZXIgbmVzdGluZyBvZiB0YWJsZS4gWW91ciA8dGhlYWQvdGJvZHkvdGZvb3Q+IHNob3VsZCBoYXZlIGEgPHRhYmxlPiBwYXJlbnQuXCIrcChuKStcIlxcblxcblwiK2MobikpLHZvaWQgMCE9PW4ucmVmJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiBuLnJlZiYmXCJvYmplY3RcIiE9dHlwZW9mIG4ucmVmJiYhKFwiJCR0eXBlb2ZcImluIG4pKXRocm93IG5ldyBFcnJvcignQ29tcG9uZW50XFwncyBcInJlZlwiIHByb3BlcnR5IHNob3VsZCBiZSBhIGZ1bmN0aW9uLCBvciBhbiBvYmplY3QgY3JlYXRlZCBieSBjcmVhdGVSZWYoKSwgYnV0IGdvdCBbJyt0eXBlb2Ygbi5yZWYrXCJdIGluc3RlYWRcXG5cIitwKG4pK1wiXFxuXFxuXCIrYyhuKSk7aWYoXCJzdHJpbmdcIj09dHlwZW9mIG4udHlwZSlmb3IodmFyIGYgaW4gbi5wcm9wcylpZihcIm9cIj09PWZbMF0mJlwiblwiPT09ZlsxXSYmXCJmdW5jdGlvblwiIT10eXBlb2Ygbi5wcm9wc1tmXSYmbnVsbCE9bi5wcm9wc1tmXSl0aHJvdyBuZXcgRXJyb3IoXCJDb21wb25lbnQncyBcXFwiXCIrZisnXCIgcHJvcGVydHkgc2hvdWxkIGJlIGEgZnVuY3Rpb24sIGJ1dCBnb3QgWycrdHlwZW9mIG4ucHJvcHNbZl0rXCJdIGluc3RlYWRcXG5cIitwKG4pK1wiXFxuXFxuXCIrYyhuKSk7aWYoXCJmdW5jdGlvblwiPT10eXBlb2Ygbi50eXBlJiZuLnR5cGUucHJvcFR5cGVzKXtpZihcIkxhenlcIj09PW4udHlwZS5kaXNwbGF5TmFtZSYmeSYmIXkubGF6eVByb3BUeXBlcy5oYXMobi50eXBlKSl7dmFyIGQ9XCJQcm9wVHlwZXMgYXJlIG5vdCBzdXBwb3J0ZWQgb24gbGF6eSgpLiBVc2UgcHJvcFR5cGVzIG9uIHRoZSB3cmFwcGVkIGNvbXBvbmVudCBpdHNlbGYuIFwiO3RyeXt2YXIgaD1uLnR5cGUoKTt5LmxhenlQcm9wVHlwZXMuc2V0KG4udHlwZSwhMCksY29uc29sZS53YXJuKGQrXCJDb21wb25lbnQgd3JhcHBlZCBpbiBsYXp5KCkgaXMgXCIrdChoKSl9Y2F0Y2gobil7Y29uc29sZS53YXJuKGQrXCJXZSB3aWxsIGxvZyB0aGUgd3JhcHBlZCBjb21wb25lbnQncyBuYW1lIG9uY2UgaXQgaXMgbG9hZGVkLlwiKX19bz1uLnR5cGUucHJvcFR5cGVzLHI9bi5wcm9wcyxpPXQobikscz1wKG4pLE9iamVjdC5rZXlzKG8pLmZvckVhY2goZnVuY3Rpb24obil7dmFyIHQ7dHJ5e3Q9b1tuXShyLG4scyxpLG51bGwsXCJTRUNSRVRfRE9fTk9UX1BBU1NfVEhJU19PUl9ZT1VfV0lMTF9CRV9GSVJFRFwiKX1jYXRjaChuKXt0PW59IXR8fHQubWVzc2FnZSBpbiBlfHwoZVt0Lm1lc3NhZ2VdPSEwLGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgXCIraStcIiB0eXBlOiBcIit0Lm1lc3NhZ2UpKX0pfWEmJmEobil9LG4ub3B0aW9ucy5fX2g9ZnVuY3Rpb24obil7aWYoIW4pdGhyb3cgbmV3IEVycm9yKFwiSG9vayBjYW4gb25seSBiZSBpbnZva2VkIGZyb20gcmVuZGVyIG1ldGhvZHMuXCIpO2gmJmgobil9O3ZhciB2PWZ1bmN0aW9uKG4sZSl7cmV0dXJue2dldDpmdW5jdGlvbigpe3Rocm93IG5ldyBFcnJvcihcImdldHRpbmcgdm5vZGUuXCIrbitcIiBpcyBkZXByZWNhdGVkLCBcIitlKX0sc2V0OmZ1bmN0aW9uKCl7dGhyb3cgbmV3IEVycm9yKFwic2V0dGluZyB2bm9kZS5cIituK1wiIGlzIG5vdCBhbGxvd2VkLCBcIitlKX19fSxtPXtub2RlTmFtZTp2KFwibm9kZU5hbWVcIixcInVzZSB2bm9kZS50eXBlXCIpLGF0dHJpYnV0ZXM6dihcImF0dHJpYnV0ZXNcIixcInVzZSB2bm9kZS5wcm9wc1wiKSxjaGlsZHJlbjp2KFwiY2hpbGRyZW5cIixcInVzZSB2bm9kZS5wcm9wcy5jaGlsZHJlblwiKX0sYj1PYmplY3QuY3JlYXRlKHt9LG0pO24ub3B0aW9ucy52bm9kZT1mdW5jdGlvbihuKXt2YXIgZT1uLnByb3BzO2lmKG51bGwhPT1uLnR5cGUmJm51bGwhPWUmJihcIl9fc291cmNlXCJpbiBlfHxcIl9fc2VsZlwiaW4gZSkpe3ZhciB0PW4ucHJvcHM9e307Zm9yKHZhciBvIGluIGUpe3ZhciByPWVbb107XCJfX3NvdXJjZVwiPT09bz9uLl9fc291cmNlPXI6XCJfX3NlbGZcIj09PW8/bi5fX3NlbGY9cjp0W29dPXJ9fU9iamVjdC5zZXRQcm90b3R5cGVPZihuLGIpLHUmJnUobil9LG4ub3B0aW9ucy5kaWZmZWQ9ZnVuY3Rpb24obil7bi5fX2smJm4uX19rLmZvckVhY2goZnVuY3Rpb24obil7aWYobiYmdm9pZCAwPT09bi50eXBlKXtkZWxldGUgbi5fXyxkZWxldGUgbi5fX2I7dmFyIGU9T2JqZWN0LmtleXMobikuam9pbihcIixcIik7dGhyb3cgbmV3IEVycm9yKFwiT2JqZWN0cyBhcmUgbm90IHZhbGlkIGFzIGEgY2hpbGQuIEVuY291bnRlcmVkIGFuIG9iamVjdCB3aXRoIHRoZSBrZXlzIHtcIitlK1wifS5cIil9fSk7dmFyIGU9bi5fX2M7aWYoZSYmZS5fX0gpe3ZhciBvPWUuX19IO0FycmF5LmlzQXJyYXkoby5fXykmJm8uX18uZm9yRWFjaChmdW5jdGlvbihlKXtpZihlLl9faCYmKCFlLl9fSHx8IUFycmF5LmlzQXJyYXkoZS5fX0gpKSl7dmFyIG89dChuKTtjb25zb2xlLndhcm4oXCJJbiBcIitvK1wiIHlvdSBhcmUgY2FsbGluZyB1c2VNZW1vL3VzZUNhbGxiYWNrIHdpdGhvdXQgcGFzc2luZyBhcmd1bWVudHMuXFxuVGhpcyBpcyBhIG5vb3Agc2luY2UgaXQgd2lsbCBub3QgYmUgYWJsZSB0byBtZW1vaXplLCBpdCB3aWxsIGV4ZWN1dGUgaXQgZXZlcnkgcmVuZGVyLlxcblxcblwiK2MobikpfX0pfWlmKGkmJmkobiksbnVsbCE9bi5fX2spZm9yKHZhciByPVtdLGE9MDthPG4uX19rLmxlbmd0aDthKyspe3ZhciBzPW4uX19rW2FdO2lmKHMmJm51bGwhPXMua2V5KXt2YXIgbD1zLmtleTtpZigtMSE9PXIuaW5kZXhPZihsKSl7Y29uc29sZS5lcnJvcignRm9sbG93aW5nIGNvbXBvbmVudCBoYXMgdHdvIG9yIG1vcmUgY2hpbGRyZW4gd2l0aCB0aGUgc2FtZSBrZXkgYXR0cmlidXRlOiBcIicrbCsnXCIuIFRoaXMgbWF5IGNhdXNlIGdsaXRjaGVzIGFuZCBtaXNiZWhhdmlvciBpbiByZW5kZXJpbmcgcHJvY2Vzcy4gQ29tcG9uZW50OiBcXG5cXG4nK3AobikrXCJcXG5cXG5cIitjKG4pKTticmVha31yLnB1c2gobCl9fX19KCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZWJ1Zy5qcy5tYXBcbiIsInZhciBlPXJlcXVpcmUoXCJwcmVhY3RcIik7XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmd2luZG93Ll9fUFJFQUNUX0RFVlRPT0xTX18mJndpbmRvdy5fX1BSRUFDVF9ERVZUT09MU19fLmF0dGFjaFByZWFjdChcIjEwLjAuNVwiLGUub3B0aW9ucyx7RnJhZ21lbnQ6ZS5GcmFnbWVudH0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGV2dG9vbHMuanMubWFwXG4iLCJ2YXIgbixsLHUsdCxpLG8scixmPXt9LGU9W10sYz0vYWNpdHxleCg/OnN8Z3xufHB8JCl8cnBofGdyaWR8b3dzfG1uY3xudHd8aW5lW2NoXXx6b298Xm9yZC9pO2Z1bmN0aW9uIHMobixsKXtmb3IodmFyIHUgaW4gbCluW3VdPWxbdV07cmV0dXJuIG59ZnVuY3Rpb24gYShuKXt2YXIgbD1uLnBhcmVudE5vZGU7bCYmbC5yZW1vdmVDaGlsZChuKX1mdW5jdGlvbiBwKG4sbCx1KXt2YXIgdCxpPWFyZ3VtZW50cyxvPXt9O2Zvcih0IGluIGwpXCJrZXlcIiE9PXQmJlwicmVmXCIhPT10JiYob1t0XT1sW3RdKTtpZihhcmd1bWVudHMubGVuZ3RoPjMpZm9yKHU9W3VdLHQ9Mzt0PGFyZ3VtZW50cy5sZW5ndGg7dCsrKXUucHVzaChpW3RdKTtpZihudWxsIT11JiYoby5jaGlsZHJlbj11KSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBuJiZudWxsIT1uLmRlZmF1bHRQcm9wcylmb3IodCBpbiBuLmRlZmF1bHRQcm9wcyl2b2lkIDA9PT1vW3RdJiYob1t0XT1uLmRlZmF1bHRQcm9wc1t0XSk7cmV0dXJuIHYobixvLGwmJmwua2V5LGwmJmwucmVmKX1mdW5jdGlvbiB2KGwsdSx0LGkpe3ZhciBvPXt0eXBlOmwscHJvcHM6dSxrZXk6dCxyZWY6aSxfX2s6bnVsbCxfXzpudWxsLF9fYjowLF9fZTpudWxsLF9fZDp2b2lkIDAsX19jOm51bGwsY29uc3RydWN0b3I6dm9pZCAwfTtyZXR1cm4gbi52bm9kZSYmbi52bm9kZShvKSxvfWZ1bmN0aW9uIGgobil7cmV0dXJuIG4uY2hpbGRyZW59ZnVuY3Rpb24gZChuLGwpe3RoaXMucHJvcHM9bix0aGlzLmNvbnRleHQ9bH1mdW5jdGlvbiB5KG4sbCl7aWYobnVsbD09bClyZXR1cm4gbi5fXz95KG4uX18sbi5fXy5fX2suaW5kZXhPZihuKSsxKTpudWxsO2Zvcih2YXIgdTtsPG4uX19rLmxlbmd0aDtsKyspaWYobnVsbCE9KHU9bi5fX2tbbF0pJiZudWxsIT11Ll9fZSlyZXR1cm4gdS5fX2U7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2Ygbi50eXBlP3kobik6bnVsbH1mdW5jdGlvbiB4KG4pe3ZhciBsLHU7aWYobnVsbCE9KG49bi5fXykmJm51bGwhPW4uX19jKXtmb3Iobi5fX2U9bi5fX2MuYmFzZT1udWxsLGw9MDtsPG4uX19rLmxlbmd0aDtsKyspaWYobnVsbCE9KHU9bi5fX2tbbF0pJiZudWxsIT11Ll9fZSl7bi5fX2U9bi5fX2MuYmFzZT11Ll9fZTticmVha31yZXR1cm4geChuKX19ZnVuY3Rpb24gbShsKXsoIWwuX19kJiYobC5fX2Q9ITApJiYxPT09dS5wdXNoKGwpfHxpIT09bi5kZWJvdW5jZVJlbmRlcmluZykmJigoaT1uLmRlYm91bmNlUmVuZGVyaW5nKXx8dCkodyl9ZnVuY3Rpb24gdygpe3ZhciBuLGwsdCxpLG8scixmO2Zvcih1LnNvcnQoZnVuY3Rpb24obixsKXtyZXR1cm4gbC5fX3YuX19iLW4uX192Ll9fYn0pO249dS5wb3AoKTspbi5fX2QmJih0PXZvaWQgMCxpPXZvaWQgMCxyPShvPShsPW4pLl9fdikuX19lLChmPWwuX19QKSYmKHQ9W10saT1OKGYsbyxzKHt9LG8pLGwuX19uLHZvaWQgMCE9PWYub3duZXJTVkdFbGVtZW50LG51bGwsdCxudWxsPT1yP3kobyk6cikseih0LG8pLGkhPXImJngobykpKX1mdW5jdGlvbiBnKG4sbCx1LHQsaSxvLHIsYyxzKXt2YXIgcCx2LGgsZCx4LG0sdyxnPXUmJnUuX19rfHxlLF89Zy5sZW5ndGg7aWYoYz09ZiYmKGM9bnVsbCE9bz9vWzBdOl8/eSh1LDApOm51bGwpLHA9MCxsLl9faz1rKGwuX19rLGZ1bmN0aW9uKHUpe2lmKG51bGwhPXUpe2lmKHUuX189bCx1Ll9fYj1sLl9fYisxLG51bGw9PT0oaD1nW3BdKXx8aCYmdS5rZXk9PWgua2V5JiZ1LnR5cGU9PT1oLnR5cGUpZ1twXT12b2lkIDA7ZWxzZSBmb3Iodj0wO3Y8Xzt2Kyspe2lmKChoPWdbdl0pJiZ1LmtleT09aC5rZXkmJnUudHlwZT09PWgudHlwZSl7Z1t2XT12b2lkIDA7YnJlYWt9aD1udWxsfWlmKGQ9TihuLHUsaD1ofHxmLHQsaSxvLHIsYyxzKSwodj11LnJlZikmJmgucmVmIT12JiYod3x8KHc9W10pLGgucmVmJiZ3LnB1c2goaC5yZWYsbnVsbCx1KSx3LnB1c2godix1Ll9fY3x8ZCx1KSksbnVsbCE9ZCl7dmFyIGU7aWYobnVsbD09bSYmKG09ZCksdm9pZCAwIT09dS5fX2QpZT11Ll9fZCx1Ll9fZD12b2lkIDA7ZWxzZSBpZihvPT1ofHxkIT1jfHxudWxsPT1kLnBhcmVudE5vZGUpe246aWYobnVsbD09Y3x8Yy5wYXJlbnROb2RlIT09biluLmFwcGVuZENoaWxkKGQpLGU9bnVsbDtlbHNle2Zvcih4PWMsdj0wOyh4PXgubmV4dFNpYmxpbmcpJiZ2PF87dis9MilpZih4PT1kKWJyZWFrIG47bi5pbnNlcnRCZWZvcmUoZCxjKSxlPWN9XCJvcHRpb25cIj09bC50eXBlJiYobi52YWx1ZT1cIlwiKX1jPXZvaWQgMCE9PWU/ZTpkLm5leHRTaWJsaW5nLFwiZnVuY3Rpb25cIj09dHlwZW9mIGwudHlwZSYmKGwuX19kPWMpfWVsc2UgYyYmaC5fX2U9PWMmJmMucGFyZW50Tm9kZSE9biYmKGM9eShoKSl9cmV0dXJuIHArKyx1fSksbC5fX2U9bSxudWxsIT1vJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiBsLnR5cGUpZm9yKHA9by5sZW5ndGg7cC0tOyludWxsIT1vW3BdJiZhKG9bcF0pO2ZvcihwPV87cC0tOyludWxsIT1nW3BdJiYkKGdbcF0sZ1twXSk7aWYodylmb3IocD0wO3A8dy5sZW5ndGg7cCsrKVQod1twXSx3WysrcF0sd1srK3BdKX1mdW5jdGlvbiBrKG4sbCx1KXtpZihudWxsPT11JiYodT1bXSksbnVsbD09bnx8XCJib29sZWFuXCI9PXR5cGVvZiBuKWwmJnUucHVzaChsKG51bGwpKTtlbHNlIGlmKEFycmF5LmlzQXJyYXkobikpZm9yKHZhciB0PTA7dDxuLmxlbmd0aDt0KyspayhuW3RdLGwsdSk7ZWxzZSB1LnB1c2gobD9sKFwic3RyaW5nXCI9PXR5cGVvZiBufHxcIm51bWJlclwiPT10eXBlb2Ygbj92KG51bGwsbixudWxsLG51bGwpOm51bGwhPW4uX19lfHxudWxsIT1uLl9fYz92KG4udHlwZSxuLnByb3BzLG4ua2V5LG51bGwpOm4pOm4pO3JldHVybiB1fWZ1bmN0aW9uIF8obixsLHUsdCxpKXt2YXIgbztmb3IobyBpbiB1KW8gaW4gbHx8UChuLG8sbnVsbCx1W29dLHQpO2ZvcihvIGluIGwpaSYmXCJmdW5jdGlvblwiIT10eXBlb2YgbFtvXXx8XCJ2YWx1ZVwiPT09b3x8XCJjaGVja2VkXCI9PT1vfHx1W29dPT09bFtvXXx8UChuLG8sbFtvXSx1W29dLHQpfWZ1bmN0aW9uIGIobixsLHUpe1wiLVwiPT09bFswXT9uLnNldFByb3BlcnR5KGwsdSk6bltsXT1cIm51bWJlclwiPT10eXBlb2YgdSYmITE9PT1jLnRlc3QobCk/dStcInB4XCI6bnVsbD09dT9cIlwiOnV9ZnVuY3Rpb24gUChuLGwsdSx0LGkpe3ZhciBvLHIsZixlLGM7aWYoaT9cImNsYXNzTmFtZVwiPT09bCYmKGw9XCJjbGFzc1wiKTpcImNsYXNzXCI9PT1sJiYobD1cImNsYXNzTmFtZVwiKSxcImtleVwiPT09bHx8XCJjaGlsZHJlblwiPT09bCk7ZWxzZSBpZihcInN0eWxlXCI9PT1sKWlmKG89bi5zdHlsZSxcInN0cmluZ1wiPT10eXBlb2YgdSlvLmNzc1RleHQ9dTtlbHNle2lmKFwic3RyaW5nXCI9PXR5cGVvZiB0JiYoby5jc3NUZXh0PVwiXCIsdD1udWxsKSx0KWZvcihyIGluIHQpdSYmciBpbiB1fHxiKG8scixcIlwiKTtpZih1KWZvcihmIGluIHUpdCYmdVtmXT09PXRbZl18fGIobyxmLHVbZl0pfWVsc2VcIm9cIj09PWxbMF0mJlwiblwiPT09bFsxXT8oZT1sIT09KGw9bC5yZXBsYWNlKC9DYXB0dXJlJC8sXCJcIikpLGM9bC50b0xvd2VyQ2FzZSgpLGw9KGMgaW4gbj9jOmwpLnNsaWNlKDIpLHU/KHR8fG4uYWRkRXZlbnRMaXN0ZW5lcihsLEMsZSksKG4ubHx8KG4ubD17fSkpW2xdPXUpOm4ucmVtb3ZlRXZlbnRMaXN0ZW5lcihsLEMsZSkpOlwibGlzdFwiIT09bCYmXCJ0YWdOYW1lXCIhPT1sJiZcImZvcm1cIiE9PWwmJlwidHlwZVwiIT09bCYmXCJzaXplXCIhPT1sJiYhaSYmbCBpbiBuP25bbF09bnVsbD09dT9cIlwiOnU6XCJmdW5jdGlvblwiIT10eXBlb2YgdSYmXCJkYW5nZXJvdXNseVNldElubmVySFRNTFwiIT09bCYmKGwhPT0obD1sLnJlcGxhY2UoL154bGluazo/LyxcIlwiKSk/bnVsbD09dXx8ITE9PT11P24ucmVtb3ZlQXR0cmlidXRlTlMoXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIsbC50b0xvd2VyQ2FzZSgpKTpuLnNldEF0dHJpYnV0ZU5TKFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiLGwudG9Mb3dlckNhc2UoKSx1KTpudWxsPT11fHwhMT09PXUmJiEvXmFyLy50ZXN0KGwpP24ucmVtb3ZlQXR0cmlidXRlKGwpOm4uc2V0QXR0cmlidXRlKGwsdSkpfWZ1bmN0aW9uIEMobCl7dGhpcy5sW2wudHlwZV0obi5ldmVudD9uLmV2ZW50KGwpOmwpfWZ1bmN0aW9uIE4obCx1LHQsaSxvLHIsZixlLGMpe3ZhciBhLHAsdix5LHgsbSx3LGssXyxiLFA9dS50eXBlO2lmKHZvaWQgMCE9PXUuY29uc3RydWN0b3IpcmV0dXJuIG51bGw7KGE9bi5fX2IpJiZhKHUpO3RyeXtuOmlmKFwiZnVuY3Rpb25cIj09dHlwZW9mIFApe2lmKGs9dS5wcm9wcyxfPShhPVAuY29udGV4dFR5cGUpJiZpW2EuX19jXSxiPWE/Xz9fLnByb3BzLnZhbHVlOmEuX186aSx0Ll9fYz93PShwPXUuX19jPXQuX19jKS5fXz1wLl9fRTooXCJwcm90b3R5cGVcImluIFAmJlAucHJvdG90eXBlLnJlbmRlcj91Ll9fYz1wPW5ldyBQKGssYik6KHUuX19jPXA9bmV3IGQoayxiKSxwLmNvbnN0cnVjdG9yPVAscC5yZW5kZXI9aiksXyYmXy5zdWIocCkscC5wcm9wcz1rLHAuc3RhdGV8fChwLnN0YXRlPXt9KSxwLmNvbnRleHQ9YixwLl9fbj1pLHY9cC5fX2Q9ITAscC5fX2g9W10pLG51bGw9PXAuX19zJiYocC5fX3M9cC5zdGF0ZSksbnVsbCE9UC5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMmJihwLl9fcz09cC5zdGF0ZSYmKHAuX19zPXMoe30scC5fX3MpKSxzKHAuX19zLFAuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzKGsscC5fX3MpKSkseT1wLnByb3BzLHg9cC5zdGF0ZSx2KW51bGw9PVAuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzJiZudWxsIT1wLmNvbXBvbmVudFdpbGxNb3VudCYmcC5jb21wb25lbnRXaWxsTW91bnQoKSxudWxsIT1wLmNvbXBvbmVudERpZE1vdW50JiZwLl9faC5wdXNoKHAuY29tcG9uZW50RGlkTW91bnQpO2Vsc2V7aWYobnVsbD09UC5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMmJmshPT15JiZudWxsIT1wLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMmJnAuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhrLGIpLCFwLl9fZSYmbnVsbCE9cC5zaG91bGRDb21wb25lbnRVcGRhdGUmJiExPT09cC5zaG91bGRDb21wb25lbnRVcGRhdGUoayxwLl9fcyxiKSl7Zm9yKHAucHJvcHM9ayxwLnN0YXRlPXAuX19zLHAuX19kPSExLHAuX192PXUsdS5fX2U9dC5fX2UsdS5fX2s9dC5fX2sscC5fX2gubGVuZ3RoJiZmLnB1c2gocCksYT0wO2E8dS5fX2subGVuZ3RoO2ErKyl1Ll9fa1thXSYmKHUuX19rW2FdLl9fPXUpO2JyZWFrIG59bnVsbCE9cC5jb21wb25lbnRXaWxsVXBkYXRlJiZwLmNvbXBvbmVudFdpbGxVcGRhdGUoayxwLl9fcyxiKSxudWxsIT1wLmNvbXBvbmVudERpZFVwZGF0ZSYmcC5fX2gucHVzaChmdW5jdGlvbigpe3AuY29tcG9uZW50RGlkVXBkYXRlKHkseCxtKX0pfXAuY29udGV4dD1iLHAucHJvcHM9ayxwLnN0YXRlPXAuX19zLChhPW4uX19yKSYmYSh1KSxwLl9fZD0hMSxwLl9fdj11LHAuX19QPWwsYT1wLnJlbmRlcihwLnByb3BzLHAuc3RhdGUscC5jb250ZXh0KSx1Ll9faz1udWxsIT1hJiZhLnR5cGU9PWgmJm51bGw9PWEua2V5P2EucHJvcHMuY2hpbGRyZW46QXJyYXkuaXNBcnJheShhKT9hOlthXSxudWxsIT1wLmdldENoaWxkQ29udGV4dCYmKGk9cyhzKHt9LGkpLHAuZ2V0Q2hpbGRDb250ZXh0KCkpKSx2fHxudWxsPT1wLmdldFNuYXBzaG90QmVmb3JlVXBkYXRlfHwobT1wLmdldFNuYXBzaG90QmVmb3JlVXBkYXRlKHkseCkpLGcobCx1LHQsaSxvLHIsZixlLGMpLHAuYmFzZT11Ll9fZSxwLl9faC5sZW5ndGgmJmYucHVzaChwKSx3JiYocC5fX0U9cC5fXz1udWxsKSxwLl9fZT0hMX1lbHNlIHUuX19lPUEodC5fX2UsdSx0LGksbyxyLGYsYyk7KGE9bi5kaWZmZWQpJiZhKHUpfWNhdGNoKGwpe24uX19lKGwsdSx0KX1yZXR1cm4gdS5fX2V9ZnVuY3Rpb24geihsLHUpe24uX19jJiZuLl9fYyh1LGwpLGwuc29tZShmdW5jdGlvbih1KXt0cnl7bD11Ll9faCx1Ll9faD1bXSxsLnNvbWUoZnVuY3Rpb24obil7bi5jYWxsKHUpfSl9Y2F0Y2gobCl7bi5fX2UobCx1Ll9fdil9fSl9ZnVuY3Rpb24gQShuLGwsdSx0LGksbyxyLGMpe3ZhciBzLGEscCx2LGgsZD11LnByb3BzLHk9bC5wcm9wcztpZihpPVwic3ZnXCI9PT1sLnR5cGV8fGksbnVsbCE9bylmb3Iocz0wO3M8by5sZW5ndGg7cysrKWlmKG51bGwhPShhPW9bc10pJiYoKG51bGw9PT1sLnR5cGU/Mz09PWEubm9kZVR5cGU6YS5sb2NhbE5hbWU9PT1sLnR5cGUpfHxuPT1hKSl7bj1hLG9bc109bnVsbDticmVha31pZihudWxsPT1uKXtpZihudWxsPT09bC50eXBlKXJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh5KTtuPWk/ZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixsLnR5cGUpOmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobC50eXBlLHkuaXMmJntpczp5LmlzfSksbz1udWxsfWlmKG51bGw9PT1sLnR5cGUpZCE9PXkmJm4uZGF0YSE9eSYmKG4uZGF0YT15KTtlbHNlIGlmKGwhPT11KXtpZihudWxsIT1vJiYobz1lLnNsaWNlLmNhbGwobi5jaGlsZE5vZGVzKSkscD0oZD11LnByb3BzfHxmKS5kYW5nZXJvdXNseVNldElubmVySFRNTCx2PXkuZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwsIWMpe2lmKGQ9PT1mKWZvcihkPXt9LGg9MDtoPG4uYXR0cmlidXRlcy5sZW5ndGg7aCsrKWRbbi5hdHRyaWJ1dGVzW2hdLm5hbWVdPW4uYXR0cmlidXRlc1toXS52YWx1ZTsodnx8cCkmJih2JiZwJiZ2Ll9faHRtbD09cC5fX2h0bWx8fChuLmlubmVySFRNTD12JiZ2Ll9faHRtbHx8XCJcIikpfV8obix5LGQsaSxjKSxsLl9faz1sLnByb3BzLmNoaWxkcmVuLHZ8fGcobixsLHUsdCxcImZvcmVpZ25PYmplY3RcIiE9PWwudHlwZSYmaSxvLHIsZixjKSxjfHwoXCJ2YWx1ZVwiaW4geSYmdm9pZCAwIT09eS52YWx1ZSYmeS52YWx1ZSE9PW4udmFsdWUmJihuLnZhbHVlPW51bGw9PXkudmFsdWU/XCJcIjp5LnZhbHVlKSxcImNoZWNrZWRcImluIHkmJnZvaWQgMCE9PXkuY2hlY2tlZCYmeS5jaGVja2VkIT09bi5jaGVja2VkJiYobi5jaGVja2VkPXkuY2hlY2tlZCkpfXJldHVybiBufWZ1bmN0aW9uIFQobCx1LHQpe3RyeXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBsP2wodSk6bC5jdXJyZW50PXV9Y2F0Y2gobCl7bi5fX2UobCx0KX19ZnVuY3Rpb24gJChsLHUsdCl7dmFyIGksbyxyO2lmKG4udW5tb3VudCYmbi51bm1vdW50KGwpLChpPWwucmVmKSYmKGkuY3VycmVudCYmaS5jdXJyZW50IT09bC5fX2V8fFQoaSxudWxsLHUpKSx0fHxcImZ1bmN0aW9uXCI9PXR5cGVvZiBsLnR5cGV8fCh0PW51bGwhPShvPWwuX19lKSksbC5fX2U9bC5fX2Q9dm9pZCAwLG51bGwhPShpPWwuX19jKSl7aWYoaS5jb21wb25lbnRXaWxsVW5tb3VudCl0cnl7aS5jb21wb25lbnRXaWxsVW5tb3VudCgpfWNhdGNoKGwpe24uX19lKGwsdSl9aS5iYXNlPWkuX19QPW51bGx9aWYoaT1sLl9faylmb3Iocj0wO3I8aS5sZW5ndGg7cisrKWlbcl0mJiQoaVtyXSx1LHQpO251bGwhPW8mJmEobyl9ZnVuY3Rpb24gaihuLGwsdSl7cmV0dXJuIHRoaXMuY29uc3RydWN0b3Iobix1KX1mdW5jdGlvbiBEKGwsdSx0KXt2YXIgaSxyLGM7bi5fXyYmbi5fXyhsLHUpLHI9KGk9dD09PW8pP251bGw6dCYmdC5fX2t8fHUuX19rLGw9cChoLG51bGwsW2xdKSxjPVtdLE4odSwoaT91OnR8fHUpLl9faz1sLHJ8fGYsZix2b2lkIDAhPT11Lm93bmVyU1ZHRWxlbWVudCx0JiYhaT9bdF06cj9udWxsOmUuc2xpY2UuY2FsbCh1LmNoaWxkTm9kZXMpLGMsdHx8ZixpKSx6KGMsbCl9bj17X19lOmZ1bmN0aW9uKG4sbCl7Zm9yKHZhciB1LHQ7bD1sLl9fOylpZigodT1sLl9fYykmJiF1Ll9fKXRyeXtpZih1LmNvbnN0cnVjdG9yJiZudWxsIT11LmNvbnN0cnVjdG9yLmdldERlcml2ZWRTdGF0ZUZyb21FcnJvciYmKHQ9ITAsdS5zZXRTdGF0ZSh1LmNvbnN0cnVjdG9yLmdldERlcml2ZWRTdGF0ZUZyb21FcnJvcihuKSkpLG51bGwhPXUuY29tcG9uZW50RGlkQ2F0Y2gmJih0PSEwLHUuY29tcG9uZW50RGlkQ2F0Y2gobikpLHQpcmV0dXJuIG0odS5fX0U9dSl9Y2F0Y2gobCl7bj1sfXRocm93IG59fSxsPWZ1bmN0aW9uKG4pe3JldHVybiBudWxsIT1uJiZ2b2lkIDA9PT1uLmNvbnN0cnVjdG9yfSxkLnByb3RvdHlwZS5zZXRTdGF0ZT1mdW5jdGlvbihuLGwpe3ZhciB1O3U9dGhpcy5fX3MhPT10aGlzLnN0YXRlP3RoaXMuX19zOnRoaXMuX19zPXMoe30sdGhpcy5zdGF0ZSksXCJmdW5jdGlvblwiPT10eXBlb2YgbiYmKG49bih1LHRoaXMucHJvcHMpKSxuJiZzKHUsbiksbnVsbCE9biYmdGhpcy5fX3YmJihsJiZ0aGlzLl9faC5wdXNoKGwpLG0odGhpcykpfSxkLnByb3RvdHlwZS5mb3JjZVVwZGF0ZT1mdW5jdGlvbihuKXt0aGlzLl9fdiYmKHRoaXMuX19lPSEwLG4mJnRoaXMuX19oLnB1c2gobiksbSh0aGlzKSl9LGQucHJvdG90eXBlLnJlbmRlcj1oLHU9W10sdD1cImZ1bmN0aW9uXCI9PXR5cGVvZiBQcm9taXNlP1Byb21pc2UucHJvdG90eXBlLnRoZW4uYmluZChQcm9taXNlLnJlc29sdmUoKSk6c2V0VGltZW91dCxvPWYscj0wLGV4cG9ydHMucmVuZGVyPUQsZXhwb3J0cy5oeWRyYXRlPWZ1bmN0aW9uKG4sbCl7RChuLGwsbyl9LGV4cG9ydHMuY3JlYXRlRWxlbWVudD1wLGV4cG9ydHMuaD1wLGV4cG9ydHMuRnJhZ21lbnQ9aCxleHBvcnRzLmNyZWF0ZVJlZj1mdW5jdGlvbigpe3JldHVybnt9fSxleHBvcnRzLmlzVmFsaWRFbGVtZW50PWwsZXhwb3J0cy5Db21wb25lbnQ9ZCxleHBvcnRzLmNsb25lRWxlbWVudD1mdW5jdGlvbihuLGwpe3JldHVybiBsPXMocyh7fSxuLnByb3BzKSxsKSxhcmd1bWVudHMubGVuZ3RoPjImJihsLmNoaWxkcmVuPWUuc2xpY2UuY2FsbChhcmd1bWVudHMsMikpLHYobi50eXBlLGwsbC5rZXl8fG4ua2V5LGwucmVmfHxuLnJlZil9LGV4cG9ydHMuY3JlYXRlQ29udGV4dD1mdW5jdGlvbihuKXt2YXIgbD17fSx1PXtfX2M6XCJfX2NDXCIrcisrLF9fOm4sQ29uc3VtZXI6ZnVuY3Rpb24obixsKXtyZXR1cm4gbi5jaGlsZHJlbihsKX0sUHJvdmlkZXI6ZnVuY3Rpb24obil7dmFyIHQsaT10aGlzO3JldHVybiB0aGlzLmdldENoaWxkQ29udGV4dHx8KHQ9W10sdGhpcy5nZXRDaGlsZENvbnRleHQ9ZnVuY3Rpb24oKXtyZXR1cm4gbFt1Ll9fY109aSxsfSx0aGlzLnNob3VsZENvbXBvbmVudFVwZGF0ZT1mdW5jdGlvbihsKXtuLnZhbHVlIT09bC52YWx1ZSYmdC5zb21lKGZ1bmN0aW9uKG4pe24uY29udGV4dD1sLnZhbHVlLG0obil9KX0sdGhpcy5zdWI9ZnVuY3Rpb24obil7dC5wdXNoKG4pO3ZhciBsPW4uY29tcG9uZW50V2lsbFVubW91bnQ7bi5jb21wb25lbnRXaWxsVW5tb3VudD1mdW5jdGlvbigpe3Quc3BsaWNlKHQuaW5kZXhPZihuKSwxKSxsJiZsLmNhbGwobil9fSksbi5jaGlsZHJlbn19O3JldHVybiB1LkNvbnN1bWVyLmNvbnRleHRUeXBlPXUsdX0sZXhwb3J0cy50b0NoaWxkQXJyYXk9ayxleHBvcnRzLl9lPSQsZXhwb3J0cy5vcHRpb25zPW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcmVhY3QuanMubWFwXG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbnZhciBydW50aW1lID0gKGZ1bmN0aW9uIChleHBvcnRzKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBPcCA9IE9iamVjdC5wcm90b3R5cGU7XG4gIHZhciBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHVuZGVmaW5lZDsgLy8gTW9yZSBjb21wcmVzc2libGUgdGhhbiB2b2lkIDAuXG4gIHZhciAkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sIDoge307XG4gIHZhciBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG4gIHZhciBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCI7XG4gIHZhciB0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgXCJAQHRvU3RyaW5nVGFnXCI7XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgZXhwb3J0cy53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgLy8gVGhpcyBpcyBhIHBvbHlmaWxsIGZvciAlSXRlcmF0b3JQcm90b3R5cGUlIGZvciBlbnZpcm9ubWVudHMgdGhhdFxuICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgSXRlcmF0b3JQcm90b3R5cGVbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiAgdmFyIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8gJiYgZ2V0UHJvdG8oZ2V0UHJvdG8odmFsdWVzKFtdKSkpO1xuICBpZiAoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiZcbiAgICAgIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJlxuICAgICAgaGFzT3duLmNhbGwoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sKSkge1xuICAgIC8vIFRoaXMgZW52aXJvbm1lbnQgaGFzIGEgbmF0aXZlICVJdGVyYXRvclByb3RvdHlwZSU7IHVzZSBpdCBpbnN0ZWFkXG4gICAgLy8gb2YgdGhlIHBvbHlmaWxsLlxuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cblxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPVxuICAgIEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGVbdG9TdHJpbmdUYWdTeW1ib2xdID1cbiAgICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBwcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3JcbiAgICAgID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHxcbiAgICAgICAgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgICAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICAgICAgOiBmYWxzZTtcbiAgfTtcblxuICBleHBvcnRzLm1hcmsgPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGlmICghKHRvU3RyaW5nVGFnU3ltYm9sIGluIGdlbkZ1bikpIHtcbiAgICAgICAgZ2VuRnVuW3RvU3RyaW5nVGFnU3ltYm9sXSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcbiAgICAgIH1cbiAgICB9XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB7IF9fYXdhaXQ6IGFyZyB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlICYmXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAvLyBJZiBhIHJlamVjdGVkIFByb21pc2Ugd2FzIHlpZWxkZWQsIHRocm93IHRoZSByZWplY3Rpb24gYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgaGFuZGxlZCB0aGVyZS5cbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPVxuICAgICAgICAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsXG4gICAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmdcbiAgICAgICAgKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcbiAgQXN5bmNJdGVyYXRvci5wcm90b3R5cGVbYXN5bmNJdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3IoXG4gICAgICB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KVxuICAgICk7XG5cbiAgICByZXR1cm4gZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5tZXRob2QgPSBtZXRob2Q7XG4gICAgICBjb250ZXh0LmFyZyA9IGFyZztcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIENhbGwgZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdKGNvbnRleHQuYXJnKSBhbmQgaGFuZGxlIHRoZVxuICAvLyByZXN1bHQsIGVpdGhlciBieSByZXR1cm5pbmcgYSB7IHZhbHVlLCBkb25lIH0gcmVzdWx0IGZyb20gdGhlXG4gIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLFxuICAvLyBzZXR0aW5nIGNvbnRleHQuZGVsZWdhdGUgdG8gbnVsbCwgYW5kIHJldHVybmluZyB0aGUgQ29udGludWVTZW50aW5lbC5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgLy8gTm90ZTogW1wicmV0dXJuXCJdIG11c3QgYmUgdXNlZCBmb3IgRVMzIHBhcnNpbmcgY29tcGF0aWJpbGl0eS5cbiAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb21cbiAgICAgICAgICAgIC8vIFwicmV0dXJuXCIgdG8gXCJ0aHJvd1wiLCBsZXQgdGhhdCBvdmVycmlkZSB0aGUgVHlwZUVycm9yIGJlbG93LlxuICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ3Rocm93JyBtZXRob2RcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7XG5cbiAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcblxuICAgIGlmICghIGluZm8pIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIik7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5XG4gICAgICAvLyB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgZGVsZWdhdGUucmVzdWx0TmFtZSAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7XG5cbiAgICAgIC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG5cbiAgICAgIC8vIElmIGNvbnRleHQubWV0aG9kIHdhcyBcInRocm93XCIgYnV0IHRoZSBkZWxlZ2F0ZSBoYW5kbGVkIHRoZVxuICAgICAgLy8gZXhjZXB0aW9uLCBsZXQgdGhlIG91dGVyIGdlbmVyYXRvciBwcm9jZWVkIG5vcm1hbGx5LiBJZlxuICAgICAgLy8gY29udGV4dC5tZXRob2Qgd2FzIFwibmV4dFwiLCBmb3JnZXQgY29udGV4dC5hcmcgc2luY2UgaXQgaGFzIGJlZW5cbiAgICAgIC8vIFwiY29uc3VtZWRcIiBieSB0aGUgZGVsZWdhdGUgaXRlcmF0b3IuIElmIGNvbnRleHQubWV0aG9kIHdhc1xuICAgICAgLy8gXCJyZXR1cm5cIiwgYWxsb3cgdGhlIG9yaWdpbmFsIC5yZXR1cm4gY2FsbCB0byBjb250aW51ZSBpbiB0aGVcbiAgICAgIC8vIG91dGVyIGdlbmVyYXRvci5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCAhPT0gXCJyZXR1cm5cIikge1xuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuXG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9XG5cbiAgICAvLyBUaGUgZGVsZWdhdGUgaXRlcmF0b3IgaXMgZmluaXNoZWQsIHNvIGZvcmdldCBpdCBhbmQgY29udGludWUgd2l0aFxuICAgIC8vIHRoZSBvdXRlciBnZW5lcmF0b3IuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH1cblxuICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG5cbiAgR3BbdG9TdHJpbmdUYWdTeW1ib2xdID0gXCJHZW5lcmF0b3JcIjtcblxuICAvLyBBIEdlbmVyYXRvciBzaG91bGQgYWx3YXlzIHJldHVybiBpdHNlbGYgYXMgdGhlIGl0ZXJhdG9yIG9iamVjdCB3aGVuIHRoZVxuICAvLyBAQGl0ZXJhdG9yIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbiBpdC4gU29tZSBicm93c2VycycgaW1wbGVtZW50YXRpb25zIG9mIHRoZVxuICAvLyBpdGVyYXRvciBwcm90b3R5cGUgY2hhaW4gaW5jb3JyZWN0bHkgaW1wbGVtZW50IHRoaXMsIGNhdXNpbmcgdGhlIEdlbmVyYXRvclxuICAvLyBvYmplY3QgdG8gbm90IGJlIHJldHVybmVkIGZyb20gdGhpcyBjYWxsLiBUaGlzIGVuc3VyZXMgdGhhdCBkb2Vzbid0IGhhcHBlbi5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9pc3N1ZXMvMjc0IGZvciBtb3JlIGRldGFpbHMuXG4gIEdwW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEdwLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH07XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBleHBvcnRzLmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cbiAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gIH1cbiAgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiZcbiAgICAgICAgICAgICAgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiZcbiAgICAgICAgICAgICAgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhISBjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFicnVwdDogZnVuY3Rpb24odHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiZcbiAgICAgICAgICAgIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAgICh0eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICAgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJlxuICAgICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgICAgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTtcblxuICAvLyBSZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlXG4gIC8vIG9yIG5vdCwgcmV0dXJuIHRoZSBydW50aW1lIG9iamVjdCBzbyB0aGF0IHdlIGNhbiBkZWNsYXJlIHRoZSB2YXJpYWJsZVxuICAvLyByZWdlbmVyYXRvclJ1bnRpbWUgaW4gdGhlIG91dGVyIHNjb3BlLCB3aGljaCBhbGxvd3MgdGhpcyBtb2R1bGUgdG8gYmVcbiAgLy8gaW5qZWN0ZWQgZWFzaWx5IGJ5IGBiaW4vcmVnZW5lcmF0b3IgLS1pbmNsdWRlLXJ1bnRpbWUgc2NyaXB0LmpzYC5cbiAgcmV0dXJuIGV4cG9ydHM7XG5cbn0oXG4gIC8vIElmIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZSwgdXNlIG1vZHVsZS5leHBvcnRzXG4gIC8vIGFzIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgbmFtZXNwYWNlLiBPdGhlcndpc2UgY3JlYXRlIGEgbmV3IGVtcHR5XG4gIC8vIG9iamVjdC4gRWl0aGVyIHdheSwgdGhlIHJlc3VsdGluZyBvYmplY3Qgd2lsbCBiZSB1c2VkIHRvIGluaXRpYWxpemVcbiAgLy8gdGhlIHJlZ2VuZXJhdG9yUnVudGltZSB2YXJpYWJsZSBhdCB0aGUgdG9wIG9mIHRoaXMgZmlsZS5cbiAgdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiA/IG1vZHVsZS5leHBvcnRzIDoge31cbikpO1xuXG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgLy8gVGhpcyBtb2R1bGUgc2hvdWxkIG5vdCBiZSBydW5uaW5nIGluIHN0cmljdCBtb2RlLCBzbyB0aGUgYWJvdmVcbiAgLy8gYXNzaWdubWVudCBzaG91bGQgYWx3YXlzIHdvcmsgdW5sZXNzIHNvbWV0aGluZyBpcyBtaXNjb25maWd1cmVkLiBKdXN0XG4gIC8vIGluIGNhc2UgcnVudGltZS5qcyBhY2NpZGVudGFsbHkgcnVucyBpbiBzdHJpY3QgbW9kZSwgd2UgY2FuIGVzY2FwZVxuICAvLyBzdHJpY3QgbW9kZSB1c2luZyBhIGdsb2JhbCBGdW5jdGlvbiBjYWxsLiBUaGlzIGNvdWxkIGNvbmNlaXZhYmx5IGZhaWxcbiAgLy8gaWYgYSBDb250ZW50IFNlY3VyaXR5IFBvbGljeSBmb3JiaWRzIHVzaW5nIEZ1bmN0aW9uLCBidXQgaW4gdGhhdCBjYXNlXG4gIC8vIHRoZSBwcm9wZXIgc29sdXRpb24gaXMgdG8gZml4IHRoZSBhY2NpZGVudGFsIHN0cmljdCBtb2RlIHByb2JsZW0uIElmXG4gIC8vIHlvdSd2ZSBtaXNjb25maWd1cmVkIHlvdXIgYnVuZGxlciB0byBmb3JjZSBzdHJpY3QgbW9kZSBhbmQgYXBwbGllZCBhXG4gIC8vIENTUCB0byBmb3JiaWQgRnVuY3Rpb24sIGFuZCB5b3UncmUgbm90IHdpbGxpbmcgdG8gZml4IGVpdGhlciBvZiB0aG9zZVxuICAvLyBwcm9ibGVtcywgcGxlYXNlIGRldGFpbCB5b3VyIHVuaXF1ZSBwcmVkaWNhbWVudCBpbiBhIEdpdEh1YiBpc3N1ZS5cbiAgRnVuY3Rpb24oXCJyXCIsIFwicmVnZW5lcmF0b3JSdW50aW1lID0gclwiKShydW50aW1lKTtcbn1cbiIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvaW5kZXgnKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJhbmRvbUZyb21TZWVkID0gcmVxdWlyZSgnLi9yYW5kb20vcmFuZG9tLWZyb20tc2VlZCcpO1xuXG52YXIgT1JJR0lOQUwgPSAnMDEyMzQ1Njc4OWFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpfLSc7XG52YXIgYWxwaGFiZXQ7XG52YXIgcHJldmlvdXNTZWVkO1xuXG52YXIgc2h1ZmZsZWQ7XG5cbmZ1bmN0aW9uIHJlc2V0KCkge1xuICAgIHNodWZmbGVkID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHNldENoYXJhY3RlcnMoX2FscGhhYmV0Xykge1xuICAgIGlmICghX2FscGhhYmV0Xykge1xuICAgICAgICBpZiAoYWxwaGFiZXQgIT09IE9SSUdJTkFMKSB7XG4gICAgICAgICAgICBhbHBoYWJldCA9IE9SSUdJTkFMO1xuICAgICAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKF9hbHBoYWJldF8gPT09IGFscGhhYmV0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoX2FscGhhYmV0Xy5sZW5ndGggIT09IE9SSUdJTkFMLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0N1c3RvbSBhbHBoYWJldCBmb3Igc2hvcnRpZCBtdXN0IGJlICcgKyBPUklHSU5BTC5sZW5ndGggKyAnIHVuaXF1ZSBjaGFyYWN0ZXJzLiBZb3Ugc3VibWl0dGVkICcgKyBfYWxwaGFiZXRfLmxlbmd0aCArICcgY2hhcmFjdGVyczogJyArIF9hbHBoYWJldF8pO1xuICAgIH1cblxuICAgIHZhciB1bmlxdWUgPSBfYWxwaGFiZXRfLnNwbGl0KCcnKS5maWx0ZXIoZnVuY3Rpb24oaXRlbSwgaW5kLCBhcnIpe1xuICAgICAgIHJldHVybiBpbmQgIT09IGFyci5sYXN0SW5kZXhPZihpdGVtKTtcbiAgICB9KTtcblxuICAgIGlmICh1bmlxdWUubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ3VzdG9tIGFscGhhYmV0IGZvciBzaG9ydGlkIG11c3QgYmUgJyArIE9SSUdJTkFMLmxlbmd0aCArICcgdW5pcXVlIGNoYXJhY3RlcnMuIFRoZXNlIGNoYXJhY3RlcnMgd2VyZSBub3QgdW5pcXVlOiAnICsgdW5pcXVlLmpvaW4oJywgJykpO1xuICAgIH1cblxuICAgIGFscGhhYmV0ID0gX2FscGhhYmV0XztcbiAgICByZXNldCgpO1xufVxuXG5mdW5jdGlvbiBjaGFyYWN0ZXJzKF9hbHBoYWJldF8pIHtcbiAgICBzZXRDaGFyYWN0ZXJzKF9hbHBoYWJldF8pO1xuICAgIHJldHVybiBhbHBoYWJldDtcbn1cblxuZnVuY3Rpb24gc2V0U2VlZChzZWVkKSB7XG4gICAgcmFuZG9tRnJvbVNlZWQuc2VlZChzZWVkKTtcbiAgICBpZiAocHJldmlvdXNTZWVkICE9PSBzZWVkKSB7XG4gICAgICAgIHJlc2V0KCk7XG4gICAgICAgIHByZXZpb3VzU2VlZCA9IHNlZWQ7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzaHVmZmxlKCkge1xuICAgIGlmICghYWxwaGFiZXQpIHtcbiAgICAgICAgc2V0Q2hhcmFjdGVycyhPUklHSU5BTCk7XG4gICAgfVxuXG4gICAgdmFyIHNvdXJjZUFycmF5ID0gYWxwaGFiZXQuc3BsaXQoJycpO1xuICAgIHZhciB0YXJnZXRBcnJheSA9IFtdO1xuICAgIHZhciByID0gcmFuZG9tRnJvbVNlZWQubmV4dFZhbHVlKCk7XG4gICAgdmFyIGNoYXJhY3RlckluZGV4O1xuXG4gICAgd2hpbGUgKHNvdXJjZUFycmF5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgciA9IHJhbmRvbUZyb21TZWVkLm5leHRWYWx1ZSgpO1xuICAgICAgICBjaGFyYWN0ZXJJbmRleCA9IE1hdGguZmxvb3IociAqIHNvdXJjZUFycmF5Lmxlbmd0aCk7XG4gICAgICAgIHRhcmdldEFycmF5LnB1c2goc291cmNlQXJyYXkuc3BsaWNlKGNoYXJhY3RlckluZGV4LCAxKVswXSk7XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXRBcnJheS5qb2luKCcnKTtcbn1cblxuZnVuY3Rpb24gZ2V0U2h1ZmZsZWQoKSB7XG4gICAgaWYgKHNodWZmbGVkKSB7XG4gICAgICAgIHJldHVybiBzaHVmZmxlZDtcbiAgICB9XG4gICAgc2h1ZmZsZWQgPSBzaHVmZmxlKCk7XG4gICAgcmV0dXJuIHNodWZmbGVkO1xufVxuXG4vKipcbiAqIGxvb2t1cCBzaHVmZmxlZCBsZXR0ZXJcbiAqIEBwYXJhbSBpbmRleFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gbG9va3VwKGluZGV4KSB7XG4gICAgdmFyIGFscGhhYmV0U2h1ZmZsZWQgPSBnZXRTaHVmZmxlZCgpO1xuICAgIHJldHVybiBhbHBoYWJldFNodWZmbGVkW2luZGV4XTtcbn1cblxuZnVuY3Rpb24gZ2V0ICgpIHtcbiAgcmV0dXJuIGFscGhhYmV0IHx8IE9SSUdJTkFMO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZXQ6IGdldCxcbiAgICBjaGFyYWN0ZXJzOiBjaGFyYWN0ZXJzLFxuICAgIHNlZWQ6IHNldFNlZWQsXG4gICAgbG9va3VwOiBsb29rdXAsXG4gICAgc2h1ZmZsZWQ6IGdldFNodWZmbGVkXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZ2VuZXJhdGUgPSByZXF1aXJlKCcuL2dlbmVyYXRlJyk7XG52YXIgYWxwaGFiZXQgPSByZXF1aXJlKCcuL2FscGhhYmV0Jyk7XG5cbi8vIElnbm9yZSBhbGwgbWlsbGlzZWNvbmRzIGJlZm9yZSBhIGNlcnRhaW4gdGltZSB0byByZWR1Y2UgdGhlIHNpemUgb2YgdGhlIGRhdGUgZW50cm9weSB3aXRob3V0IHNhY3JpZmljaW5nIHVuaXF1ZW5lc3MuXG4vLyBUaGlzIG51bWJlciBzaG91bGQgYmUgdXBkYXRlZCBldmVyeSB5ZWFyIG9yIHNvIHRvIGtlZXAgdGhlIGdlbmVyYXRlZCBpZCBzaG9ydC5cbi8vIFRvIHJlZ2VuZXJhdGUgYG5ldyBEYXRlKCkgLSAwYCBhbmQgYnVtcCB0aGUgdmVyc2lvbi4gQWx3YXlzIGJ1bXAgdGhlIHZlcnNpb24hXG52YXIgUkVEVUNFX1RJTUUgPSAxNTY3NzUyODAyMDYyO1xuXG4vLyBkb24ndCBjaGFuZ2UgdW5sZXNzIHdlIGNoYW5nZSB0aGUgYWxnb3Mgb3IgUkVEVUNFX1RJTUVcbi8vIG11c3QgYmUgYW4gaW50ZWdlciBhbmQgbGVzcyB0aGFuIDE2XG52YXIgdmVyc2lvbiA9IDc7XG5cbi8vIENvdW50ZXIgaXMgdXNlZCB3aGVuIHNob3J0aWQgaXMgY2FsbGVkIG11bHRpcGxlIHRpbWVzIGluIG9uZSBzZWNvbmQuXG52YXIgY291bnRlcjtcblxuLy8gUmVtZW1iZXIgdGhlIGxhc3QgdGltZSBzaG9ydGlkIHdhcyBjYWxsZWQgaW4gY2FzZSBjb3VudGVyIGlzIG5lZWRlZC5cbnZhciBwcmV2aW91c1NlY29uZHM7XG5cbi8qKlxuICogR2VuZXJhdGUgdW5pcXVlIGlkXG4gKiBSZXR1cm5zIHN0cmluZyBpZFxuICovXG5mdW5jdGlvbiBidWlsZChjbHVzdGVyV29ya2VySWQpIHtcbiAgICB2YXIgc3RyID0gJyc7XG5cbiAgICB2YXIgc2Vjb25kcyA9IE1hdGguZmxvb3IoKERhdGUubm93KCkgLSBSRURVQ0VfVElNRSkgKiAwLjAwMSk7XG5cbiAgICBpZiAoc2Vjb25kcyA9PT0gcHJldmlvdXNTZWNvbmRzKSB7XG4gICAgICAgIGNvdW50ZXIrKztcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb3VudGVyID0gMDtcbiAgICAgICAgcHJldmlvdXNTZWNvbmRzID0gc2Vjb25kcztcbiAgICB9XG5cbiAgICBzdHIgPSBzdHIgKyBnZW5lcmF0ZSh2ZXJzaW9uKTtcbiAgICBzdHIgPSBzdHIgKyBnZW5lcmF0ZShjbHVzdGVyV29ya2VySWQpO1xuICAgIGlmIChjb3VudGVyID4gMCkge1xuICAgICAgICBzdHIgPSBzdHIgKyBnZW5lcmF0ZShjb3VudGVyKTtcbiAgICB9XG4gICAgc3RyID0gc3RyICsgZ2VuZXJhdGUoc2Vjb25kcyk7XG4gICAgcmV0dXJuIHN0cjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBidWlsZDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFscGhhYmV0ID0gcmVxdWlyZSgnLi9hbHBoYWJldCcpO1xudmFyIHJhbmRvbSA9IHJlcXVpcmUoJy4vcmFuZG9tL3JhbmRvbS1ieXRlJyk7XG52YXIgZm9ybWF0ID0gcmVxdWlyZSgnbmFub2lkL2Zvcm1hdCcpO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZShudW1iZXIpIHtcbiAgICB2YXIgbG9vcENvdW50ZXIgPSAwO1xuICAgIHZhciBkb25lO1xuXG4gICAgdmFyIHN0ciA9ICcnO1xuXG4gICAgd2hpbGUgKCFkb25lKSB7XG4gICAgICAgIHN0ciA9IHN0ciArIGZvcm1hdChyYW5kb20sIGFscGhhYmV0LmdldCgpLCAxKTtcbiAgICAgICAgZG9uZSA9IG51bWJlciA8IChNYXRoLnBvdygxNiwgbG9vcENvdW50ZXIgKyAxICkgKTtcbiAgICAgICAgbG9vcENvdW50ZXIrKztcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZW5lcmF0ZTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFscGhhYmV0ID0gcmVxdWlyZSgnLi9hbHBoYWJldCcpO1xudmFyIGJ1aWxkID0gcmVxdWlyZSgnLi9idWlsZCcpO1xudmFyIGlzVmFsaWQgPSByZXF1aXJlKCcuL2lzLXZhbGlkJyk7XG5cbi8vIGlmIHlvdSBhcmUgdXNpbmcgY2x1c3RlciBvciBtdWx0aXBsZSBzZXJ2ZXJzIHVzZSB0aGlzIHRvIG1ha2UgZWFjaCBpbnN0YW5jZVxuLy8gaGFzIGEgdW5pcXVlIHZhbHVlIGZvciB3b3JrZXJcbi8vIE5vdGU6IEkgZG9uJ3Qga25vdyBpZiB0aGlzIGlzIGF1dG9tYXRpY2FsbHkgc2V0IHdoZW4gdXNpbmcgdGhpcmRcbi8vIHBhcnR5IGNsdXN0ZXIgc29sdXRpb25zIHN1Y2ggYXMgcG0yLlxudmFyIGNsdXN0ZXJXb3JrZXJJZCA9IHJlcXVpcmUoJy4vdXRpbC9jbHVzdGVyLXdvcmtlci1pZCcpIHx8IDA7XG5cbi8qKlxuICogU2V0IHRoZSBzZWVkLlxuICogSGlnaGx5IHJlY29tbWVuZGVkIGlmIHlvdSBkb24ndCB3YW50IHBlb3BsZSB0byB0cnkgdG8gZmlndXJlIG91dCB5b3VyIGlkIHNjaGVtYS5cbiAqIGV4cG9zZWQgYXMgc2hvcnRpZC5zZWVkKGludClcbiAqIEBwYXJhbSBzZWVkIEludGVnZXIgdmFsdWUgdG8gc2VlZCB0aGUgcmFuZG9tIGFscGhhYmV0LiAgQUxXQVlTIFVTRSBUSEUgU0FNRSBTRUVEIG9yIHlvdSBtaWdodCBnZXQgb3ZlcmxhcHMuXG4gKi9cbmZ1bmN0aW9uIHNlZWQoc2VlZFZhbHVlKSB7XG4gICAgYWxwaGFiZXQuc2VlZChzZWVkVmFsdWUpO1xuICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLyoqXG4gKiBTZXQgdGhlIGNsdXN0ZXIgd29ya2VyIG9yIG1hY2hpbmUgaWRcbiAqIGV4cG9zZWQgYXMgc2hvcnRpZC53b3JrZXIoaW50KVxuICogQHBhcmFtIHdvcmtlcklkIHdvcmtlciBtdXN0IGJlIHBvc2l0aXZlIGludGVnZXIuICBOdW1iZXIgbGVzcyB0aGFuIDE2IGlzIHJlY29tbWVuZGVkLlxuICogcmV0dXJucyBzaG9ydGlkIG1vZHVsZSBzbyBpdCBjYW4gYmUgY2hhaW5lZC5cbiAqL1xuZnVuY3Rpb24gd29ya2VyKHdvcmtlcklkKSB7XG4gICAgY2x1c3RlcldvcmtlcklkID0gd29ya2VySWQ7XG4gICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vKipcbiAqXG4gKiBzZXRzIG5ldyBjaGFyYWN0ZXJzIHRvIHVzZSBpbiB0aGUgYWxwaGFiZXRcbiAqIHJldHVybnMgdGhlIHNodWZmbGVkIGFscGhhYmV0XG4gKi9cbmZ1bmN0aW9uIGNoYXJhY3RlcnMobmV3Q2hhcmFjdGVycykge1xuICAgIGlmIChuZXdDaGFyYWN0ZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgYWxwaGFiZXQuY2hhcmFjdGVycyhuZXdDaGFyYWN0ZXJzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWxwaGFiZXQuc2h1ZmZsZWQoKTtcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZSB1bmlxdWUgaWRcbiAqIFJldHVybnMgc3RyaW5nIGlkXG4gKi9cbmZ1bmN0aW9uIGdlbmVyYXRlKCkge1xuICByZXR1cm4gYnVpbGQoY2x1c3RlcldvcmtlcklkKTtcbn1cblxuLy8gRXhwb3J0IGFsbCBvdGhlciBmdW5jdGlvbnMgYXMgcHJvcGVydGllcyBvZiB0aGUgZ2VuZXJhdGUgZnVuY3Rpb25cbm1vZHVsZS5leHBvcnRzID0gZ2VuZXJhdGU7XG5tb2R1bGUuZXhwb3J0cy5nZW5lcmF0ZSA9IGdlbmVyYXRlO1xubW9kdWxlLmV4cG9ydHMuc2VlZCA9IHNlZWQ7XG5tb2R1bGUuZXhwb3J0cy53b3JrZXIgPSB3b3JrZXI7XG5tb2R1bGUuZXhwb3J0cy5jaGFyYWN0ZXJzID0gY2hhcmFjdGVycztcbm1vZHVsZS5leHBvcnRzLmlzVmFsaWQgPSBpc1ZhbGlkO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFscGhhYmV0ID0gcmVxdWlyZSgnLi9hbHBoYWJldCcpO1xuXG5mdW5jdGlvbiBpc1Nob3J0SWQoaWQpIHtcbiAgICBpZiAoIWlkIHx8IHR5cGVvZiBpZCAhPT0gJ3N0cmluZycgfHwgaWQubGVuZ3RoIDwgNiApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBub25BbHBoYWJldGljID0gbmV3IFJlZ0V4cCgnW14nICtcbiAgICAgIGFscGhhYmV0LmdldCgpLnJlcGxhY2UoL1t8XFxcXHt9KClbXFxdXiQrKj8uLV0vZywgJ1xcXFwkJicpICtcbiAgICAnXScpO1xuICAgIHJldHVybiAhbm9uQWxwaGFiZXRpYy50ZXN0KGlkKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1Nob3J0SWQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcnlwdG8gPSB0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiAod2luZG93LmNyeXB0byB8fCB3aW5kb3cubXNDcnlwdG8pOyAvLyBJRSAxMSB1c2VzIHdpbmRvdy5tc0NyeXB0b1xuXG52YXIgcmFuZG9tQnl0ZTtcblxuaWYgKCFjcnlwdG8gfHwgIWNyeXB0by5nZXRSYW5kb21WYWx1ZXMpIHtcbiAgICByYW5kb21CeXRlID0gZnVuY3Rpb24oc2l6ZSkge1xuICAgICAgICB2YXIgYnl0ZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgICAgICAgIGJ5dGVzLnB1c2goTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU2KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgIH07XG59IGVsc2Uge1xuICAgIHJhbmRvbUJ5dGUgPSBmdW5jdGlvbihzaXplKSB7XG4gICAgICAgIHJldHVybiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KHNpemUpKTtcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJhbmRvbUJ5dGU7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIEZvdW5kIHRoaXMgc2VlZC1iYXNlZCByYW5kb20gZ2VuZXJhdG9yIHNvbWV3aGVyZVxuLy8gQmFzZWQgb24gVGhlIENlbnRyYWwgUmFuZG9taXplciAxLjMgKEMpIDE5OTcgYnkgUGF1bCBIb3VsZSAoaG91bGVAbXNjLmNvcm5lbGwuZWR1KVxuXG52YXIgc2VlZCA9IDE7XG5cbi8qKlxuICogcmV0dXJuIGEgcmFuZG9tIG51bWJlciBiYXNlZCBvbiBhIHNlZWRcbiAqIEBwYXJhbSBzZWVkXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5mdW5jdGlvbiBnZXROZXh0VmFsdWUoKSB7XG4gICAgc2VlZCA9IChzZWVkICogOTMwMSArIDQ5Mjk3KSAlIDIzMzI4MDtcbiAgICByZXR1cm4gc2VlZC8oMjMzMjgwLjApO1xufVxuXG5mdW5jdGlvbiBzZXRTZWVkKF9zZWVkXykge1xuICAgIHNlZWQgPSBfc2VlZF87XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG5leHRWYWx1ZTogZ2V0TmV4dFZhbHVlLFxuICAgIHNlZWQ6IHNldFNlZWRcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gMDtcbiIsImltcG9ydCBcInByZWFjdC9kZWJ1Z1wiO1xuXG5pbXBvcnQgeyBoLCByZW5kZXIgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IEFwcCBmcm9tICcuL3ZpZXcvQXBwLmpzeCc7XG5pbXBvcnQgQXBwQ29udGV4dCBmcm9tICcuL3V0aWxzL0FwcENvbnRleHQuanMnO1xuaW1wb3J0IHNob3J0aWQgZnJvbSAnc2hvcnRpZCc7XG5pbXBvcnQgQXBwQ29udHJvbGxlciBmcm9tICcuL21vZGVsL0FwcENvbnRyb2xsZXIuanMnO1xuaW1wb3J0IEFwcEhlbHBlciBmcm9tICcuL21vZGVsL0FwcEhlbHBlci5qcyc7XG5pbXBvcnQgQ29uZHVjdG9yIGZyb20gJy4vbW9kZWwvQ29uZHVjdG9yLmpzJztcblxubGV0IGNvbmR1Y3RvciwgYXBwSGVscGVyLCBhcHBDb250cm9sbGVyO1xuXG50cnkge1xuXHRjb25kdWN0b3I9bmV3IENvbmR1Y3RvcigpO1xuXHRhcHBIZWxwZXI9bmV3IEFwcEhlbHBlcihjb25kdWN0b3IpO1xuXHRhcHBDb250cm9sbGVyPW5ldyBBcHBDb250cm9sbGVyKGNvbmR1Y3RvcixhcHBIZWxwZXIpO1xufVxuXG5jYXRjaCAoZSkge1xuXHRhbGVydChlKTtcbn1cblxuY29uZHVjdG9yLm9uUGxheUdyaWRJbmRleENoYW5nZT0oZ3JpZEluZGV4LCBzZXF1ZW5jZUluZGV4KT0+e1xuXHRmb3IgKGxldCBlbCBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmN1cnJlbnQtYmVhdFwiKSlcblx0XHRlbC5jbGFzc0xpc3QucmVtb3ZlKCdjdXJyZW50LWJlYXQnKTtcblxuXHRpZiAoZ3JpZEluZGV4Pj0wKVxuXHRcdGZvciAobGV0IGVsIG9mIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYmVhdC1cIitncmlkSW5kZXgpKVxuXHRcdFx0ZWwuY2xhc3NMaXN0LmFkZCgnY3VycmVudC1iZWF0Jyk7XG5cblx0Zm9yIChsZXQgZWwgb2YgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jdXJyZW50LXNlcXVlbmNlXCIpKVxuXHRcdGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2N1cnJlbnQtc2VxdWVuY2UnKTtcblxuXHRpZiAoZ3JpZEluZGV4JTQ9PTAgJiYgc2VxdWVuY2VJbmRleD49MClcblx0XHRmb3IgKGxldCBlbCBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlcXVlbmNlLVwiK3NlcXVlbmNlSW5kZXgpKVxuXHRcdFx0ZWwuY2xhc3NMaXN0LmFkZCgnY3VycmVudC1zZXF1ZW5jZScpO1xufVxuXG5mdW5jdGlvbiBvblN0YXRlQ2hhbmdlKHN0YXRlKSB7XG5cdGNvbmR1Y3Rvci5zZXRTdGF0ZShzdGF0ZSk7XG5cdHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImhvb2Rtb2RlLXNvbmdzXCIsSlNPTi5zdHJpbmdpZnkoc3RhdGUuc29uZ3MpKTtcbn1cblxubGV0IGFwcENvbnRleHQ9KFxuXHQ8QXBwQ29udGV4dFxuXHRcdFx0Y29udHJvbGxlcj17YXBwQ29udHJvbGxlcn1cblx0XHRcdGhlbHBlcj17YXBwSGVscGVyfVxuXHRcdFx0aW5pdEFjdGlvbj1cImluaXRcIlxuXHRcdFx0b25TdGF0ZUNoYW5nZT17b25TdGF0ZUNoYW5nZX0+XG5cdFx0PEFwcC8+XG5cdDwvQXBwQ29udGV4dD5cbik7XG5cbmZ1bmN0aW9uIHN0YXJ0KCkge1xuXHRyZW5kZXIoYXBwQ29udGV4dCwgZG9jdW1lbnQuYm9keSk7XG59XG5cbmlmICh3aW5kb3cuaGFzT3duUHJvcGVydHkoXCJjb3Jkb3ZhXCIpKVxuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkZXZpY2VyZWFkeScsc3RhcnQpO1xuXG5lbHNlXG5cdHN0YXJ0KCk7XG4iLCJpbXBvcnQgc2hvcnRpZCBmcm9tICdzaG9ydGlkJztcbmltcG9ydCBcInJlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBDb250cm9sbGVyIHtcblx0Y29uc3RydWN0b3IoY29uZHVjdG9yLCBoZWxwZXIpIHtcblx0XHR0aGlzLmNvbmR1Y3Rvcj1jb25kdWN0b3I7XG5cdFx0dGhpcy5oZWxwZXI9aGVscGVyO1xuXHR9XG5cblx0aW5pdFN0YXRlKCkge1xuXHRcdGxldCBzdGF0ZT17XG5cdFx0XHRjdXJyZW50U29uZ0luZGV4OiAtMSxcblx0XHRcdGN1cnJlbnRMYXllckluZGV4OiAtMSxcblx0XHRcdGN1cnJlbnRDaG9yZEluZGV4OiAwLFxuXHRcdFx0Y3VycmVudFNlY3Rpb25JbmRleDogLTEsXG5cdFx0XHRjdXJyZW50R3JpZEluZGV4OiAtMSxcblx0XHRcdHNldHRpbmdzVmlzaWJsZTogZmFsc2UsXG5cdFx0XHRhZGRMYXllclZpc2libGU6IGZhbHNlLFxuXHRcdFx0c29uZ3M6IFtdLFxuXHRcdFx0aW5zdHJ1bWVudHM6IFtdLFxuXHRcdFx0cGxheWluZzogZmFsc2UsXG5cdFx0XHRyZWNvcmRpbmc6IGZhbHNlLFxuXHRcdFx0ZWRpdFNlY3Rpb25DaG9yZFZpc2libGU6IC0xLFxuXHRcdFx0YWJvdXRTY3JlZW5WaXNpYmxlOiBmYWxzZVxuXHRcdH07XG5cblx0XHRzdGF0ZS5pbnN0cnVtZW50cy5wdXNoKHtcblx0XHRcdFwia2V5XCI6IFwiYmFkLWphenotZHJ1bXNcIixcblx0XHRcdFwidHlwZVwiOiBcInBlcmN1c3NpdmVcIixcblx0XHRcdFwibmFtZVwiOiBcIkJhZCBKYXp6IERydW1zXCIsXG5cdFx0XHRcImxhYmVsc1wiOiBbXCJLSUNLXCIsXCJTTkFSRVwiLFwiSEktSEFUXCJdLFxuXHRcdFx0XCJpY29uXCI6IFwiZHJ1bS5zdmdcIixcblx0XHRcdFwiaWNvbnNcIjogW1wia2ljay1kcnVtLnN2Z1wiLFwic25hcmUtZHJ1bS5zdmdcIixcImhpLWhhdC5zdmdcIl0sXG5cdFx0XHRcInNhbXBsZXNcIjogW1xuXHRcdFx0XHRcInNhbXBsZXMvZHJ1bXMvYmFkLWtpY2sud2F2XCIsXG5cdFx0XHRcdFwic2FtcGxlcy9kcnVtcy9iYWQtc25hcmUud2F2XCIsXG5cdFx0XHRcdFwic2FtcGxlcy9kcnVtcy9iYWQtaGloYXQud2F2XCIsXG5cdFx0XHRdXG5cdFx0fSk7XG5cblx0XHRzdGF0ZS5pbnN0cnVtZW50cy5wdXNoKHtcblx0XHRcdFwia2V5XCI6IFwieWVzLWRydW1zXCIsXG5cdFx0XHRcInR5cGVcIjogXCJwZXJjdXNzaXZlXCIsXG5cdFx0XHRcIm5hbWVcIjogXCJZZXMgRHJ1bXNcIixcblx0XHRcdFwibGFiZWxzXCI6IFtcIktJQ0tcIixcIlNOQVJFXCIsXCJISS1IQVQgMVwiLFwiSEktSEFUIDJcIixcIkhJLUhBVCAzXCJdLFxuXHRcdFx0XCJpY29uXCI6IFwiZHJ1bS5zdmdcIixcblx0XHRcdFwiaWNvbnNcIjogW1wia2ljay1kcnVtLnN2Z1wiLFwic25hcmUtZHJ1bS5zdmdcIixcImhpLWhhdC5zdmdcIixcImhpLWhhdC5zdmdcIixcImhpLWhhdC5zdmdcIl0sXG5cdFx0XHRcInNhbXBsZXNcIjogW1xuXHRcdFx0XHRcInNhbXBsZXMvZHJ1bXMveWVzLWtpY2subXAzXCIsXG5cdFx0XHRcdFwic2FtcGxlcy9kcnVtcy95ZXMtc25hcmUubXAzXCIsXG5cdFx0XHRcdFwic2FtcGxlcy9kcnVtcy90aHJsLWhhdF9BX21pbm9yLndhdlwiLFxuXHRcdFx0XHRcInNhbXBsZXMvZHJ1bXMvdmlueWwtaGF0XzkwYnBtX0Mud2F2XCIsXG5cdFx0XHRcdFwic2FtcGxlcy9kcnVtcy9yb2NrLWhpaGF0LXRjaGlrLndhdlwiXG5cdFx0XHRdXG5cdFx0fSk7XG5cblx0XHRzdGF0ZS5pbnN0cnVtZW50cy5wdXNoKHtcblx0XHRcdFwia2V5XCI6IFwiZGl2ZS1iYXNzXCIsXG5cdFx0XHRcInR5cGVcIjogXCJoYXJtb25pY1wiLFxuXHRcdFx0XCJuYW1lXCI6IFwiRGl2ZSBCYXNzXCIsXG5cdFx0XHRcInNhbXBsZVwiOiBcInNhbXBsZXMvYmFzcy91cHJpZ2h0LWJhc3MtYm9tYmRpdmUubXAzXCIsXG5cdFx0XHRcImljb25cIjogXCJiYXNzLnN2Z1wiXG5cdFx0fSk7XG5cblx0XHRzdGF0ZS5pbnN0cnVtZW50cy5wdXNoKHtcblx0XHRcdFwia2V5XCI6IFwiYWNvdXN0aWMtYmFzc1wiLFxuXHRcdFx0XCJ0eXBlXCI6IFwiaGFybW9uaWNcIixcblx0XHRcdFwibmFtZVwiOiBcIkFjb3VzdGljIEJhc3NcIixcblx0XHRcdFwic2FtcGxlTm90ZVwiOiBcIkYjXCIsXG5cdFx0XHRcInNhbXBsZVwiOiBcInNhbXBsZXMvYmFzcy9hY291c3RpY19iYXNzX2Zfc2hhcnAubXAzXCIsXG5cdFx0XHRcImljb25cIjogXCJiYXNzLnN2Z1wiXG5cdFx0fSk7XG5cblx0XHRzdGF0ZS5pbnN0cnVtZW50cy5wdXNoKHtcblx0XHRcdFwia2V5XCI6IFwicGlhbm9cIixcblx0XHRcdFwidHlwZVwiOiBcImhhcm1vbmljXCIsXG5cdFx0XHRcIm5hbWVcIjogXCJQaWFub1wiLFxuXHRcdFx0XCJzYW1wbGVcIjogXCJzYW1wbGVzL3BpYW5vL3BpYW5vLWMud2F2XCIsXG5cdFx0XHRcImRlZmF1bHRWb2x1bWVcIjogMC4yNSxcblx0XHRcdFwiaWNvblwiOiBcInBpYW5vLnN2Z1wiXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRhc3luYyBpbml0KCkge1xuXHRcdGxldCBzdGF0ZT10aGlzLmluaXRTdGF0ZSgpO1xuXHRcdGxldCBzb25nRGF0YUpzb249d2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiaG9vZG1vZGUtc29uZ3NcIik7XG5cdFx0aWYgKHNvbmdEYXRhSnNvbilcblx0XHRcdHN0YXRlLnNvbmdzPUpTT04ucGFyc2Uoc29uZ0RhdGFKc29uKTtcblxuXHRcdHRoaXMuY29uZHVjdG9yLnNldFN0YXRlKHN0YXRlKTtcblx0XHRhd2FpdCB0aGlzLmNvbmR1Y3Rvci5sb2FkSW5zdHJ1bWVudHMoKTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fTtcblxuXHRhZGRTb25nKHN0YXRlLCBuYW1lKSB7XG5cdFx0aWYgKCFuYW1lIHx8IG5hbWUudG9TdHJpbmcoKT09XCJbb2JqZWN0IE1vdXNlRXZlbnRdXCIpXG5cdFx0XHRuYW1lPVwiTXkgTmV3IFNvbmdcIjtcblxuXHRcdGxldCBpbmRleD1zdGF0ZS5zb25ncy5sZW5ndGg7XG5cblx0XHRzdGF0ZS5zb25ncy5wdXNoKHtcblx0XHRcdG5hbWU6IG5hbWUsXG5cdFx0XHRicG06IDEwMCxcblx0XHRcdGtleTogc2hvcnRpZC5nZW5lcmF0ZSgpLFxuXHRcdFx0bXVzaWNLZXk6IFwiQVwiLFxuXHRcdFx0bWlub3I6IHRydWUsXG5cdFx0XHRsYXllcnM6IFtdLFxuXHRcdFx0Y2hvcmRTZXF1ZW5jZTogW10sXG5cdFx0XHRzZWN0aW9uczogW1xuXHRcdFx0XHRbMF0sXG5cdFx0XHRcdFswXSxcblx0XHRcdFx0WzBdXG5cdFx0XHRdXG5cdFx0fSk7XG5cblx0XHRzdGF0ZT10aGlzLnNldFNvbmdJbmRleChzdGF0ZSxpbmRleCk7XG5cdFx0c3RhdGU9dGhpcy5hZGRTZXF1ZW5jZUNob3JkKHN0YXRlKTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHNldEN1cnJlbnRDaG9yZEluZGV4KHN0YXRlLCBpbmRleCkge1xuXHRcdHN0YXRlLmN1cnJlbnRDaG9yZEluZGV4PWluZGV4O1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0c2V0Q3VycmVudFNlY3Rpb25JbmRleChzdGF0ZSwgaW5kZXgpIHtcblx0XHRzdGF0ZS5jdXJyZW50U2VjdGlvbkluZGV4PWluZGV4O1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0Y2xvc2VTb25nKHN0YXRlKSB7XG5cdFx0c3RhdGUuY3VycmVudFNvbmdJbmRleD0tMTtcblx0XHRzdGF0ZS5jdXJyZW50U2VjdGlvbkluZGV4PS0xO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0c2V0U29uZ0luZGV4KHN0YXRlLCBpbmRleCkge1xuXHRcdGlmIChpbmRleD09c3RhdGUuY3VycmVudFNvbmdJbmRleClcblx0XHRcdHJldHVybiBzdGF0ZTtcblxuXHRcdHN0YXRlLmN1cnJlbnRTb25nSW5kZXg9aW5kZXg7XG5cdFx0c3RhdGUuY3VycmVudExheWVySW5kZXg9LTE7XG5cdFx0c3RhdGUuY3VycmVudENob3JkSW5kZXg9MDtcblx0XHRzdGF0ZS5jdXJyZW50R3JpZEluZGV4PS0xO1xuXHRcdHN0YXRlLmN1cnJlbnRTZWN0aW9uSW5kZXg9LTE7XG5cdFx0c3RhdGUucGxheWluZz1mYWxzZTtcblx0XHRzdGF0ZS5yZWNvcmRpbmc9ZmFsc2U7XG5cblx0XHRsZXQgc29uZz10aGlzLmhlbHBlci5nZXRDdXJyZW50U29uZyhzdGF0ZSk7XG5cdFx0Zm9yIChsZXQgaT1zb25nLnNlY3Rpb25zLmxlbmd0aC0xOyBpPj0wOyBpLS0pXG5cdFx0XHRpZiAoc29uZy5zZWN0aW9uc1tpXS5sZW5ndGg+MSlcblx0XHRcdFx0c3RhdGUuY3VycmVudFNlY3Rpb25JbmRleD1pO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0c2hvd1NldHRpbmdzKHN0YXRlKSB7XG5cdFx0c3RhdGUuc2V0dGluZ3NWaXNpYmxlPXRydWU7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRoaWRlU2V0dGluZ3Moc3RhdGUpIHtcblx0XHRzdGF0ZS5zZXR0aW5nc1Zpc2libGU9ZmFsc2U7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRzaG93QWJvdXRTY3JlZW4oc3RhdGUpIHtcblx0XHRzdGF0ZS5hYm91dFNjcmVlblZpc2libGU9dHJ1ZTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdGhpZGVBYm91dFNjcmVlbihzdGF0ZSkge1xuXHRcdHN0YXRlLmFib3V0U2NyZWVuVmlzaWJsZT1mYWxzZTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHRvZ2dsZVNldHRpbmdzKHN0YXRlKSB7XG5cdFx0c3RhdGUuc2V0dGluZ3NWaXNpYmxlPSFzdGF0ZS5zZXR0aW5nc1Zpc2libGU7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRzZXRDdXJyZW50U29uZ05hbWUoc3RhdGUsIG5hbWUpIHtcblx0XHRzdGF0ZS5zb25nc1tzdGF0ZS5jdXJyZW50U29uZ0luZGV4XS5uYW1lPW5hbWU7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRzZXRDdXJyZW50U29uZ0JwbShzdGF0ZSwgYnBtKSB7XG5cdFx0YnBtPXBhcnNlSW50KGJwbSk7XG5cdFx0aWYgKGlzTmFOKGJwbSkpXG5cdFx0XHRicG09MTAwO1xuXG5cdFx0aWYgKGJwbTw1MClcblx0XHRcdGJwbT01MDtcblxuXHRcdGlmIChicG0+MjAwKVxuXHRcdFx0YnBtPTIwMDtcblxuXHRcdHN0YXRlLnNvbmdzW3N0YXRlLmN1cnJlbnRTb25nSW5kZXhdLmJwbT1icG07XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRzZXRDdXJyZW50U29uZ011c2ljS2V5KHN0YXRlLCBtdXNpY0tleSkge1xuXHRcdHN0YXRlLnNvbmdzW3N0YXRlLmN1cnJlbnRTb25nSW5kZXhdLm11c2ljS2V5PW11c2ljS2V5O1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0c2V0Q3VycmVudFNvbmdNaW5vcihzdGF0ZSwgbWlub3IpIHtcblx0XHRzdGF0ZS5zb25nc1tzdGF0ZS5jdXJyZW50U29uZ0luZGV4XS5taW5vcj1taW5vcjtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdGRlbGV0ZUN1cnJlbnRTb25nKHN0YXRlKSB7XG5cdFx0c3RhdGUuc29uZ3Muc3BsaWNlKHN0YXRlLmN1cnJlbnRTb25nSW5kZXgsMSk7XG5cdFx0c3RhdGUuY3VycmVudFNvbmdJbmRleD0tMTtcblx0XHRzdGF0ZS5zZXR0aW5nc1Zpc2libGU9ZmFsc2U7XG5cdFx0c3RhdGUuY3VycmVudFNlY3Rpb25JbmRleD0tMTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHNob3dBZGRMYXllcihzdGF0ZSkge1xuXHRcdHN0YXRlLmFkZExheWVyVmlzaWJsZT10cnVlO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0aGlkZUFkZExheWVyKHN0YXRlKSB7XG5cdFx0c3RhdGUuYWRkTGF5ZXJWaXNpYmxlPWZhbHNlO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0YWRkU2VxdWVuY2VDaG9yZChzdGF0ZSkge1xuXHRcdGxldCBzb25nPXRoaXMuaGVscGVyLmdldEN1cnJlbnRTb25nKHN0YXRlKTtcblxuXHRcdHNvbmcuY2hvcmRTZXF1ZW5jZS5wdXNoKHtcblx0XHRcdGNob3JkSW5kZXg6IDAsXG5cdFx0XHRrZXk6IHNob3J0aWQuZ2VuZXJhdGUoKVxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0YWRkTGF5ZXIoc3RhdGUsIGluc3RydW1lbnROYW1lKSB7XG5cdFx0bGV0IHNvbmc9c3RhdGUuc29uZ3Nbc3RhdGUuY3VycmVudFNvbmdJbmRleF07XG5cblx0XHRsZXQgc2VxPVtdO1xuXHRcdGxldCBudW1Tb3VuZHM9dGhpcy5oZWxwZXIuZ2V0SW5zdHJ1bWVudE51bVNvdW5kc0J5TmFtZShzdGF0ZSxpbnN0cnVtZW50TmFtZSk7XG5cdFx0bGV0IGluc3RydW1lbnQ9dGhpcy5oZWxwZXIuZ2V0SW5zdHJ1bWVudEJ5TmFtZShzdGF0ZSxpbnN0cnVtZW50TmFtZSk7XG5cblx0XHRsZXQgdm9sdW1lPTE7XG5cdFx0aWYgKGluc3RydW1lbnQuaGFzT3duUHJvcGVydHkoXCJkZWZhdWx0Vm9sdW1lXCIpKVxuXHRcdFx0dm9sdW1lPWluc3RydW1lbnQuZGVmYXVsdFZvbHVtZTtcblxuXHRcdGZvciAobGV0IGk9MDsgaTwxNjsgaSsrKVxuXHRcdFx0c2VxLnB1c2goe1xuXHRcdFx0XHRzb3VuZHM6IFtdLFxuXHRcdFx0XHR2ZWw6IDEsXG5cdFx0XHRcdHN0YWNjOiBmYWxzZVxuXHRcdFx0fSk7XG5cblx0XHRsZXQgbGF5ZXI9e1xuXHRcdFx0a2V5OiBzaG9ydGlkLmdlbmVyYXRlKCksXG5cdFx0XHRpbnN0cnVtZW50TmFtZTogaW5zdHJ1bWVudE5hbWUsXG5cdFx0XHRhdWRpYmxlOiB0cnVlLFxuXHRcdFx0dm9sdW1lOiB2b2x1bWUsXG5cdFx0XHRzZXE6IHNlcSxcblx0XHR9O1xuXG5cdFx0c29uZy5sYXllcnMucHVzaChsYXllcik7XG5cblx0XHRzdGF0ZS5hZGRMYXllclZpc2libGU9ZmFsc2U7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRzZXRMYXllckluZGV4KHN0YXRlLCBpbmRleCkge1xuXHRcdHN0YXRlLmN1cnJlbnRMYXllckluZGV4PWluZGV4O1xuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdGhpZGVDdXJyZW50TGF5ZXIoc3RhdGUpIHtcblx0XHRzdGF0ZS5jdXJyZW50TGF5ZXJJbmRleD0tMTtcblx0XHRzdGF0ZS5jdXJyZW50R3JpZEluZGV4PS0xO1xuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHRvZ2dsZUxheWVyQXVkaWJsZShzdGF0ZSwgbGF5ZXJJbmRleCkge1xuXHRcdGxldCBzb25nPXRoaXMuaGVscGVyLmdldEN1cnJlbnRTb25nKHN0YXRlKTtcblx0XHRzb25nLmxheWVyc1tsYXllckluZGV4XS5hdWRpYmxlPSFzb25nLmxheWVyc1tsYXllckluZGV4XS5hdWRpYmxlO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0ZGVsZXRlQ3VycmVudExheWVyKHN0YXRlKSB7XG5cdFx0bGV0IHNvbmc9dGhpcy5oZWxwZXIuZ2V0Q3VycmVudFNvbmcoc3RhdGUpO1xuXHRcdHNvbmcubGF5ZXJzLnNwbGljZShzdGF0ZS5jdXJyZW50TGF5ZXJJbmRleCwxKTtcblx0XHRzdGF0ZS5jdXJyZW50TGF5ZXJJbmRleD0tMTtcblx0XHRzdGF0ZS5jdXJyZW50R3JpZEluZGV4PS0xO1xuXHRcdHN0YXRlLnNldHRpbmdzVmlzaWJsZT1mYWxzZTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHNldEN1cnJlbnRMYXllclZvbHVtZShzdGF0ZSwgdm9sdW1lKSB7XG5cdFx0bGV0IGxheWVyPXRoaXMuaGVscGVyLmdldEN1cnJlbnRMYXllcihzdGF0ZSk7XG5cdFx0bGF5ZXIudm9sdW1lPXBhcnNlRmxvYXQodm9sdW1lKTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHBsYXlDbGljayhzdGF0ZSkge1xuXHRcdHN0YXRlLnBsYXlpbmc9IXN0YXRlLnBsYXlpbmc7XG5cdFx0c3RhdGUuY3VycmVudEdyaWRJbmRleD0tMTtcblxuXHRcdGlmICghc3RhdGUucGxheWluZylcblx0XHRcdHN0YXRlLnJlY29yZGluZz1mYWxzZTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHJlY29yZENsaWNrKHN0YXRlKSB7XG5cdFx0c3RhdGUucmVjb3JkaW5nPSFzdGF0ZS5yZWNvcmRpbmc7XG5cdFx0c3RhdGUuY3VycmVudEdyaWRJbmRleD0tMTtcblxuXHRcdGlmIChzdGF0ZS5yZWNvcmRpbmcgJiYgIXN0YXRlLnBsYXlpbmcpXG5cdFx0XHRzdGF0ZS5wbGF5aW5nPXRydWU7XG5cblx0XHRpZiAoIXN0YXRlLnBsYXlpbmcpXG5cdFx0XHRzdGF0ZS5jdXJyZW50R3JpZEluZGV4PS0xO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0ZGVsZXRlU2VxdWVuY2VDaG9yZChzdGF0ZSwgaW5kZXgpIHtcblx0XHRsZXQgc29uZz10aGlzLmhlbHBlci5nZXRDdXJyZW50U29uZyhzdGF0ZSk7XG5cdFx0c29uZy5jaG9yZFNlcXVlbmNlLnNwbGljZShpbmRleCwxKTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHNldFNlcXVlbmNlQ2hvcmQoc3RhdGUsIHNlcXVlbmNlSW5kZXgsIGNob3JkSW5kZXgpIHtcblx0XHRsZXQgc29uZz10aGlzLmhlbHBlci5nZXRDdXJyZW50U29uZyhzdGF0ZSk7XG5cdFx0c29uZy5jaG9yZFNlcXVlbmNlW3NlcXVlbmNlSW5kZXhdLmNob3JkSW5kZXg9Y2hvcmRJbmRleDtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdGdvQmFjayhzdGF0ZSkge1xuXHRcdGlmIChzdGF0ZS5zZXR0aW5nc1Zpc2libGUpXG5cdFx0XHRyZXR1cm4gdGhpcy5oaWRlU2V0dGluZ3Moc3RhdGUpO1xuXG5cdFx0ZWxzZSBpZiAoc3RhdGUuY3VycmVudExheWVySW5kZXg+PTApIHtcblx0XHRcdHN0YXRlLmN1cnJlbnRMYXllckluZGV4PS0xO1xuXHRcdFx0c3RhdGUuY3VycmVudEdyaWRJbmRleD0tMTtcblx0XHRcdHJldHVybiBzdGF0ZTtcblx0XHR9XG5cblx0XHRlbHNlIGlmIChzdGF0ZS5hZGRMYXllclZpc2libGUpXG5cdFx0XHRyZXR1cm4gdGhpcy5oaWRlQWRkTGF5ZXIoc3RhdGUpO1xuXG5cdFx0ZWxzZSBpZiAodGhpcy5oZWxwZXIuaXNTb25nT3BlbihzdGF0ZSkpXG5cdFx0XHRyZXR1cm4gdGhpcy5jbG9zZVNvbmcoc3RhdGUpXG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRncmlkSW5kZXhDbGljayhzdGF0ZSwgbmV3R3JpZEluZGV4KSB7XG5cdFx0c3RhdGUucGxheWluZz1mYWxzZTtcblx0XHRzdGF0ZS5yZWNvcmRpbmc9ZmFsc2U7XG5cblx0XHRpZiAoc3RhdGUuY3VycmVudEdyaWRJbmRleD09bmV3R3JpZEluZGV4KVxuXHRcdFx0c3RhdGUuY3VycmVudEdyaWRJbmRleD0tMTtcblxuXHRcdGVsc2Vcblx0XHRcdHN0YXRlLmN1cnJlbnRHcmlkSW5kZXg9bmV3R3JpZEluZGV4O1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0dG9nZ2xlQ3VycmVudExheWVyU3RhY2Moc3RhdGUpIHtcblx0XHRsZXQgbGF5ZXI9dGhpcy5oZWxwZXIuZ2V0Q3VycmVudExheWVyKHN0YXRlKTtcblx0XHRsZXQgZ3JpZEluZGV4PXN0YXRlLmN1cnJlbnRHcmlkSW5kZXg7XG5cblx0XHRpZiAoc3RhdGUucmVjb3JkaW5nKVxuXHRcdFx0Z3JpZEluZGV4PXRoaXMuY29uZHVjdG9yLmdldFBsYXlHcmlkSW5kZXgoKTtcblxuXHRcdGlmIChncmlkSW5kZXg8MClcblx0XHRcdHJldHVybiBzdGF0ZTtcblxuXHRcdGxheWVyLnNlcVtncmlkSW5kZXhdLnN0YWNjPSFsYXllci5zZXFbZ3JpZEluZGV4XS5zdGFjYztcblx0XHRpZiAobGF5ZXIuc2VxW2dyaWRJbmRleF0uc3RhY2MpXG5cdFx0XHRsYXllci5zZXFbZ3JpZEluZGV4XS5zb3VuZHM9W107XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRzZXRDdXJyZW50TGF5ZXJWZWwoc3RhdGUsIHZlbCkge1xuXHRcdGxldCBsYXllcj10aGlzLmhlbHBlci5nZXRDdXJyZW50TGF5ZXIoc3RhdGUpO1xuXHRcdGxldCBncmlkSW5kZXg9c3RhdGUuY3VycmVudEdyaWRJbmRleDtcblxuXHRcdGlmIChzdGF0ZS5yZWNvcmRpbmcpXG5cdFx0XHRncmlkSW5kZXg9dGhpcy5jb25kdWN0b3IuZ2V0UGxheUdyaWRJbmRleCgpO1xuXG5cdFx0aWYgKGdyaWRJbmRleDwwKVxuXHRcdFx0cmV0dXJuIHN0YXRlO1xuXG5cdFx0bGF5ZXIuc2VxW2dyaWRJbmRleF0udmVsPXZlbDtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHNldEdyaWRTb3VuZChzdGF0ZSwgZ3JpZEluZGV4LCBzb3VuZEluZGV4LCBlbmFibGVkKSB7XG5cdFx0bGV0IGxheWVyPXRoaXMuaGVscGVyLmdldEN1cnJlbnRMYXllcihzdGF0ZSk7XG5cdFx0bGV0IGN1cnJlbnRFbmFibGVkPVxuXHRcdFx0bGF5ZXIuc2VxW2dyaWRJbmRleF0uc291bmRzLmluY2x1ZGVzKHNvdW5kSW5kZXgpO1xuXG5cdFx0aWYgKGVuYWJsZWQ9PWN1cnJlbnRFbmFibGVkKVxuXHRcdFx0cmV0dXJuIHN0YXRlO1xuXG5cdFx0aWYgKGVuYWJsZWQpIHtcblx0XHRcdGxheWVyLnNlcVtncmlkSW5kZXhdLnNvdW5kcy5wdXNoKHNvdW5kSW5kZXgpO1xuXHRcdFx0bGF5ZXIuc2VxW2dyaWRJbmRleF0uc3RhY2M9ZmFsc2U7XG5cdFx0fVxuXG5cdFx0ZWxzZSB7XG5cdFx0XHRsYXllci5zZXFbZ3JpZEluZGV4XS5zb3VuZHMuc3BsaWNlKFxuXHRcdFx0XHRsYXllci5zZXFbZ3JpZEluZGV4XS5zb3VuZHMuaW5kZXhPZihzb3VuZEluZGV4KSxcblx0XHRcdFx0MVxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRzZXRDdXJyZW50R3JpZFNvdW5kKHN0YXRlLCBzb3VuZEluZGV4LCBlbmFibGVkKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0R3JpZFNvdW5kKHN0YXRlLHN0YXRlLmN1cnJlbnRHcmlkSW5kZXgsc291bmRJbmRleCxlbmFibGVkKTtcblx0fVxuXG5cdHNvdW5kQnV0dG9uQ2xpY2soc3RhdGUsIHNvdW5kSW5kZXgpIHtcblx0XHRpZiAoc3RhdGUucmVjb3JkaW5nKSB7XG5cdFx0XHR0aGlzLmNvbmR1Y3Rvci5wbGF5TGF5ZXJJbnN0cnVtZW50KHNvdW5kSW5kZXgpO1xuXG5cdFx0XHRsZXQgZ3JpZEluZGV4PXRoaXMuY29uZHVjdG9yLmdldFBsYXlHcmlkSW5kZXgoKTtcblx0XHRcdHN0YXRlPXRoaXMuc2V0R3JpZFNvdW5kKHN0YXRlLGdyaWRJbmRleCxzb3VuZEluZGV4LHRydWUpO1xuXG5cdFx0XHRyZXR1cm4gc3RhdGU7XG5cdFx0fVxuXG5cdFx0aWYgKHN0YXRlLmN1cnJlbnRHcmlkSW5kZXg8MCkge1xuXHRcdFx0dGhpcy5jb25kdWN0b3IucGxheUxheWVySW5zdHJ1bWVudChzb3VuZEluZGV4KTtcblx0XHRcdHJldHVybiBzdGF0ZTtcblx0XHR9XG5cblx0XHRsZXQgbGF5ZXI9dGhpcy5oZWxwZXIuZ2V0Q3VycmVudExheWVyKHN0YXRlKTtcblx0XHRsZXQgZW5hYmxlZD1sYXllci5zZXFbc3RhdGUuY3VycmVudEdyaWRJbmRleF0uc291bmRzLmluY2x1ZGVzKHNvdW5kSW5kZXgpO1xuXHRcdHN0YXRlPXRoaXMuc2V0Q3VycmVudEdyaWRTb3VuZChzdGF0ZSxzb3VuZEluZGV4LCFlbmFibGVkKTtcblxuXHRcdGlmIChsYXllci5zZXFbc3RhdGUuY3VycmVudEdyaWRJbmRleF0uc291bmRzLmluY2x1ZGVzKHNvdW5kSW5kZXgpKVxuXHRcdFx0dGhpcy5jb25kdWN0b3IucGxheUxheWVySW5zdHJ1bWVudChzb3VuZEluZGV4KTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdGNob3JkQnV0dG9uQ2xpY2soc3RhdGUsIG9jdGF2ZSkge1xuXHRcdGxldCBpbnN0cnVtZW50PXRoaXMuaGVscGVyLmdldEN1cnJlbnRJbnN0cnVtZW50KHN0YXRlKTtcblxuXHRcdGlmIChzdGF0ZS5yZWNvcmRpbmcpIHtcblx0XHRcdHRoaXMuY29uZHVjdG9yLnBsYXlMYXllckluc3RydW1lbnQob2N0YXZlKjMpO1xuXHRcdFx0dGhpcy5jb25kdWN0b3IucGxheUxheWVySW5zdHJ1bWVudChvY3RhdmUqMysxKTtcblx0XHRcdHRoaXMuY29uZHVjdG9yLnBsYXlMYXllckluc3RydW1lbnQob2N0YXZlKjMrMik7XG5cblx0XHRcdGxldCBncmlkSW5kZXg9dGhpcy5jb25kdWN0b3IuZ2V0UGxheUdyaWRJbmRleCgpO1xuXHRcdFx0c3RhdGU9dGhpcy5zZXRHcmlkU291bmQoc3RhdGUsZ3JpZEluZGV4LG9jdGF2ZSozLHRydWUpO1xuXHRcdFx0c3RhdGU9dGhpcy5zZXRHcmlkU291bmQoc3RhdGUsZ3JpZEluZGV4LG9jdGF2ZSozKzEsdHJ1ZSk7XG5cdFx0XHRzdGF0ZT10aGlzLnNldEdyaWRTb3VuZChzdGF0ZSxncmlkSW5kZXgsb2N0YXZlKjMrMix0cnVlKTtcblxuXHRcdFx0cmV0dXJuIHN0YXRlO1xuXHRcdH1cblxuXHRcdGlmIChzdGF0ZS5jdXJyZW50R3JpZEluZGV4PDApIHtcblx0XHRcdHRoaXMuY29uZHVjdG9yLnBsYXlMYXllckluc3RydW1lbnQob2N0YXZlKjMpO1xuXHRcdFx0dGhpcy5jb25kdWN0b3IucGxheUxheWVySW5zdHJ1bWVudChvY3RhdmUqMysxKTtcblx0XHRcdHRoaXMuY29uZHVjdG9yLnBsYXlMYXllckluc3RydW1lbnQob2N0YXZlKjMrMik7XG5cdFx0XHRyZXR1cm4gc3RhdGU7XG5cdFx0fVxuXG5cdFx0bGV0IGxheWVyPXRoaXMuaGVscGVyLmdldEN1cnJlbnRMYXllcihzdGF0ZSk7XG5cdFx0aWYgKHRoaXMuaGVscGVyLmN1cnJlbnRMYXllckhhc0Nob3JkQXQoc3RhdGUsc3RhdGUuY3VycmVudEdyaWRJbmRleCxvY3RhdmUpKSB7XG5cdFx0XHRzdGF0ZT10aGlzLnNldEN1cnJlbnRHcmlkU291bmQoc3RhdGUsb2N0YXZlKjMsZmFsc2UpO1xuXHRcdFx0c3RhdGU9dGhpcy5zZXRDdXJyZW50R3JpZFNvdW5kKHN0YXRlLG9jdGF2ZSozKzEsZmFsc2UpO1xuXHRcdFx0c3RhdGU9dGhpcy5zZXRDdXJyZW50R3JpZFNvdW5kKHN0YXRlLG9jdGF2ZSozKzIsZmFsc2UpO1xuXHRcdH1cblxuXHRcdGVsc2Uge1xuXHRcdFx0c3RhdGU9dGhpcy5zZXRDdXJyZW50R3JpZFNvdW5kKHN0YXRlLG9jdGF2ZSozLHRydWUpO1xuXHRcdFx0c3RhdGU9dGhpcy5zZXRDdXJyZW50R3JpZFNvdW5kKHN0YXRlLG9jdGF2ZSozKzEsdHJ1ZSk7XG5cdFx0XHRzdGF0ZT10aGlzLnNldEN1cnJlbnRHcmlkU291bmQoc3RhdGUsb2N0YXZlKjMrMix0cnVlKTtcblx0XHRcdHRoaXMuY29uZHVjdG9yLnBsYXlMYXllckluc3RydW1lbnQob2N0YXZlKjMpO1xuXHRcdFx0dGhpcy5jb25kdWN0b3IucGxheUxheWVySW5zdHJ1bWVudChvY3RhdmUqMysxKTtcblx0XHRcdHRoaXMuY29uZHVjdG9yLnBsYXlMYXllckluc3RydW1lbnQob2N0YXZlKjMrMik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0YWRkU2VjdGlvbkNob3JkKHN0YXRlKSB7XG5cdFx0bGV0IHNvbmc9dGhpcy5oZWxwZXIuZ2V0Q3VycmVudFNvbmcoc3RhdGUpO1xuXHRcdHNvbmcuc2VjdGlvbnNbc3RhdGUuY3VycmVudFNlY3Rpb25JbmRleF0ucHVzaCgwKTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdHNob3dFZGl0U2VjdGlvbkNob3JkKHN0YXRlLGluZGV4KSB7XG5cdFx0c3RhdGUuZWRpdFNlY3Rpb25DaG9yZFZpc2libGU9aW5kZXg7XG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0aGlkZUVkaXRTZWN0aW9uQ2hvcmQoc3RhdGUsaW5kZXgpIHtcblx0XHRzdGF0ZS5lZGl0U2VjdGlvbkNob3JkVmlzaWJsZT0tMTtcblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRyZW1vdmVTZWN0aW9uQ2hvcmQoc3RhdGUpIHtcblx0XHRsZXQgc29uZz10aGlzLmhlbHBlci5nZXRDdXJyZW50U29uZyhzdGF0ZSk7XG5cdFx0c29uZy5zZWN0aW9uc1tzdGF0ZS5jdXJyZW50U2VjdGlvbkluZGV4XS5zcGxpY2Uoc3RhdGUuZWRpdFNlY3Rpb25DaG9yZFZpc2libGUsMSk7XG5cblx0XHRzdGF0ZS5lZGl0U2VjdGlvbkNob3JkVmlzaWJsZT0tMTtcblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRlZGl0U2VjdGlvbkNob3JkKHN0YXRlLCBpbmRleCkge1xuXHRcdGxldCBzb25nPXRoaXMuaGVscGVyLmdldEN1cnJlbnRTb25nKHN0YXRlKTtcblx0XHRzb25nLnNlY3Rpb25zW3N0YXRlLmN1cnJlbnRTZWN0aW9uSW5kZXhdW3N0YXRlLmVkaXRTZWN0aW9uQ2hvcmRWaXNpYmxlXT1pbmRleDtcblx0XHRzdGF0ZS5lZGl0U2VjdGlvbkNob3JkVmlzaWJsZT0tMTtcblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cbn1cbiIsImltcG9ydCBNdXNpY1V0aWwgZnJvbSAnLi4vdXRpbHMvTXVzaWNVdGlsLmpzJztcbi8vY29uc3QgYXBwUGFja2FnZT1yZXF1aXJlKFwiLi4vLi4vcGFja2FnZS5qc29uXCIpO1xuY29uc3QgYXBwUGFja2FnZT17dmVyc2lvbjogXCJhYmNcIn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcEhlbHBlciB7XG5cdGNvbnN0cnVjdG9yKGNvbmR1Y3Rvcikge1xuXHRcdHRoaXMuY29uZHVjdG9yPWNvbmR1Y3Rvcjtcblx0fVxuXG5cdGdldEFwcFZlcnNpb24oKSB7XG5cdFx0cmV0dXJuIGFwcFBhY2thZ2UudmVyc2lvbjtcblx0fVxuXG5cdGdldEN1cnJlbnRTb25nKHN0YXRlKSB7XG5cdFx0cmV0dXJuIHN0YXRlLnNvbmdzW3N0YXRlLmN1cnJlbnRTb25nSW5kZXhdO1xuXHR9XG5cblx0Z2V0Q3VycmVudExheWVyKHN0YXRlKSB7XG5cdFx0cmV0dXJuIHN0YXRlLnNvbmdzW3N0YXRlLmN1cnJlbnRTb25nSW5kZXhdLmxheWVyc1tzdGF0ZS5jdXJyZW50TGF5ZXJJbmRleF07XG5cdH1cblxuXHRnZXRJbnN0cnVtZW50QnlOYW1lKHN0YXRlLCBuYW1lKSB7XG5cdFx0Zm9yIChsZXQgaW5zdHJ1bWVudCBvZiBzdGF0ZS5pbnN0cnVtZW50cylcblx0XHRcdGlmIChpbnN0cnVtZW50Lm5hbWU9PW5hbWUpXG5cdFx0XHRcdHJldHVybiBpbnN0cnVtZW50O1xuXHR9XG5cblx0Z2V0SW5zdHJ1bWVudE51bVNvdW5kc0J5TmFtZShzdGF0ZSwgbmFtZSkge1xuXHRcdGxldCBpbnN0cnVtZW50PXRoaXMuZ2V0SW5zdHJ1bWVudEJ5TmFtZShzdGF0ZSxuYW1lKTtcblxuXHRcdHN3aXRjaCAoaW5zdHJ1bWVudC50eXBlKSB7XG5cdFx0XHRjYXNlIFwiaGFybW9uaWNcIjpcblx0XHRcdFx0cmV0dXJuIDk7XG5cblx0XHRcdGNhc2UgXCJwZXJjdXNzaXZlXCI6XG5cdFx0XHRcdHJldHVybiBpbnN0cnVtZW50LmxhYmVscy5sZW5ndGg7XG5cdFx0fVxuXHR9XG5cblx0Z2V0Q3VycmVudEluc3RydW1lbnQoc3RhdGUpIHtcblx0XHRsZXQgbGF5ZXI9dGhpcy5nZXRDdXJyZW50TGF5ZXIoc3RhdGUpO1xuXHRcdHJldHVybiB0aGlzLmdldEluc3RydW1lbnRCeU5hbWUoc3RhdGUsbGF5ZXIuaW5zdHJ1bWVudE5hbWUpO1xuXHR9XG5cblx0Z2V0Q3VycmVudEluc3RydW1lbnRTb3VuZExhYmVscyhzdGF0ZSkge1xuXHRcdGxldCBpbnN0cnVtZW50PXRoaXMuZ2V0Q3VycmVudEluc3RydW1lbnQoc3RhdGUpO1xuXG5cdFx0c3dpdGNoIChpbnN0cnVtZW50LnR5cGUpIHtcblx0XHRcdGNhc2UgXCJoYXJtb25pY1wiOlxuXHRcdFx0XHRyZXR1cm4gW1wiVDFcIixcIlQyXCIsXCJUM1wiLFwiTy1UMVwiLFwiTy1UMlwiLFwiTy1UM1wiXTtcblxuXHRcdFx0Y2FzZSBcInBlcmN1c3NpdmVcIjpcblx0XHRcdFx0cmV0dXJuIGluc3RydW1lbnQubGFiZWxzO1xuXHRcdH1cblx0fVxuXG5cdGdldENob3JkTGFiZWxzKHN0YXRlKSB7XG5cdFx0bGV0IHNvbmc9dGhpcy5nZXRDdXJyZW50U29uZyhzdGF0ZSk7XG5cdFx0cmV0dXJuIE11c2ljVXRpbC5nZXRDaG9yZE5hbWVzRm9yU2NhbGUoc29uZy5tdXNpY0tleSxzb25nLm1pbm9yKTtcblx0fVxuXG5cdGdldEN1cnJlbnRTZWN0aW9uQ2hvcmRMYWJlbHMoc3RhdGUpIHtcblx0XHRsZXQgc29uZz10aGlzLmdldEN1cnJlbnRTb25nKHN0YXRlKTtcblx0XHRsZXQgY2hvcmROYW1lcz1NdXNpY1V0aWwuZ2V0Q2hvcmROYW1lc0ZvclNjYWxlKHNvbmcubXVzaWNLZXksc29uZy5taW5vcik7XG5cdFx0bGV0IHNlY3Rpb249c29uZy5zZWN0aW9uc1tzdGF0ZS5jdXJyZW50U2VjdGlvbkluZGV4XTtcblx0XHRsZXQgYT1bXTtcblxuXHRcdGZvciAobGV0IGkgb2Ygc2VjdGlvbilcblx0XHRcdGEucHVzaChjaG9yZE5hbWVzW2ldKTtcblxuXHRcdHJldHVybiBhO1xuXHR9XG5cblx0Z2V0Tm90ZXNTZWxlY3RPcHRpb25zKHN0YXRlKSB7XG5cdFx0bGV0IGE9W107XG5cblx0XHRmb3IgKGxldCBub3RlTmFtZSBvZiBNdXNpY1V0aWwuTk9URV9OQU1FUylcblx0XHRcdGEucHVzaCh7XG5cdFx0XHRcdGtleTogbm90ZU5hbWUsIGxhYmVsOiBub3RlTmFtZVxuXHRcdFx0fSk7XG5cblx0XHRyZXR1cm4gYTtcblx0fVxuXG5cdGdldENob3JkT3B0aW9ucyhzdGF0ZSkge1xuXHRcdGxldCBzb25nPXRoaXMuZ2V0Q3VycmVudFNvbmcoc3RhdGUpO1xuXHRcdGxldCBjaG9yZE5hbWVzPU11c2ljVXRpbC5nZXRDaG9yZE5hbWVzRm9yU2NhbGUoc29uZy5tdXNpY0tleSxzb25nLm1pbm9yKTtcblx0XHRsZXQgYT1bXTtcblxuXHRcdGZvciAobGV0IGNob3JkTmFtZSBvZiBjaG9yZE5hbWVzKVxuXHRcdFx0YS5wdXNoKHtcblx0XHRcdFx0a2V5OiBjaG9yZE5hbWUsXG5cdFx0XHRcdGxhYmVsOiBjaG9yZE5hbWVcblx0XHRcdH0pO1xuXG5cdFx0cmV0dXJuIGE7XG5cdH1cblxuXHRnZXRNb2RhbFNlbGVjdE9wdGlvbnMoc3RhdGUpIHtcblx0XHRyZXR1cm4gW1xuXHRcdFx0e2tleTogZmFsc2UsIGxhYmVsOiBcIm1ham9yXCJ9LFxuXHRcdFx0e2tleTogdHJ1ZSwgbGFiZWw6IFwibWlub3JcIn0sXG5cdFx0XTtcblx0fVxuXG5cdGN1cnJlbnRMYXllckhhc1NvdW5kQXQoc3RhdGUsIGdyaWRJbmRleCkge1xuXHRcdGxldCBsYXllcj10aGlzLmdldEN1cnJlbnRMYXllcihzdGF0ZSk7XG5cblx0XHRpZiAobGF5ZXIuc2VxW2dyaWRJbmRleF0uc291bmRzLmxlbmd0aD4wKVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRjdXJyZW50TGF5ZXJIYXNDaG9yZEF0KHN0YXRlLCBncmlkSW5kZXgsIG9jdGF2ZSkge1xuXHRcdGxldCBsYXllcj10aGlzLmdldEN1cnJlbnRMYXllcihzdGF0ZSk7XG5cblx0XHRmb3IgKGxldCBpPTA7IGk8MzsgaSsrKVxuXHRcdFx0aWYgKCFsYXllci5zZXFbZ3JpZEluZGV4XS5zb3VuZHMuaW5jbHVkZXMob2N0YXZlKjMraSkpXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0aXNTb25nT3BlbihzdGF0ZSkge1xuXHRcdHJldHVybiAoc3RhdGUuY3VycmVudFNvbmdJbmRleD49MCk7XG5cdH1cbn1cbiIsImltcG9ydCBBdWRpb1V0aWwgZnJvbSAnLi4vdXRpbHMvQXVkaW9VdGlsJztcbmltcG9ydCBSZWNvbmNpbGVBcnJheSBmcm9tICcuLi91dGlscy9SZWNvbmNpbGVBcnJheSc7XG5pbXBvcnQgQ29uZHVjdG9yTGF5ZXIgZnJvbSAnLi9Db25kdWN0b3JMYXllcic7XG5pbXBvcnQgQ29uZHVjdG9ySW5zdHJ1bWVudCBmcm9tICcuL0NvbmR1Y3Rvckluc3RydW1lbnQnO1xuaW1wb3J0IE11c2ljVXRpbCBmcm9tICcuLi91dGlscy9NdXNpY1V0aWwnO1xuaW1wb3J0IEF1ZGlvVGltZXIgZnJvbSAnLi4vdXRpbHMvQXVkaW9UaW1lcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbmR1Y3RvciB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdGxldCBBdWRpb0NvbnRleHQ9d2luZG93LkF1ZGlvQ29udGV4dDtcblxuXHRcdGlmICghQXVkaW9Db250ZXh0KVxuXHRcdFx0QXVkaW9Db250ZXh0PXdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQ7XG5cblx0XHRpZiAoIUF1ZGlvQ29udGV4dClcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vIHdlYiBhdWRpbyFcIik7XG5cblx0XHR0aGlzLmF1ZGlvQ29udGV4dD1uZXcgQXVkaW9Db250ZXh0KCk7XG5cdFx0dGhpcy5hdWRpb1RpbWVyPW5ldyBBdWRpb1RpbWVyKHRoaXMuYXVkaW9Db250ZXh0KTtcblx0XHR0aGlzLmF1ZGlvVGltZXIub25UaWNrPXRoaXMub25QbGF5VGljaztcblxuXHRcdHRoaXMuaW5zdHJ1bWVudHM9UmVjb25jaWxlQXJyYXkuY3JlYXRlV2l0aEZhY3RvcnkodGhpcy5jcmVhdGVJbnN0cnVtZW50KTtcblx0XHR0aGlzLmxheWVycz1SZWNvbmNpbGVBcnJheS5jcmVhdGVXaXRoRmFjdG9yeSh0aGlzLmNyZWF0ZUxheWVyKTtcblx0XHR0aGlzLmN1cnJlbnROb3Rlcz1bXTtcblx0XHR0aGlzLnBsYXlpbmdTZXF1ZW5jZUluZGV4PS0xO1xuXHRcdHRoaXMucGxheWluZ1NlcXVlbmNlQ2hvcmRJbmRleD0tMTtcblx0fVxuXG5cdGxvYWRJbnN0cnVtZW50cygpIHtcblx0XHRsZXQgcHJvbWlzZXM9W107XG5cdFx0Zm9yIChsZXQgaW5zdHJ1bWVudCBvZiB0aGlzLmluc3RydW1lbnRzLmdldEl0ZW1zKCkpXG5cdFx0XHRwcm9taXNlcy5wdXNoKGluc3RydW1lbnQubG9hZCgpKTtcblxuXHRcdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG5cdH1cblxuXHRjcmVhdGVMYXllcj0oZGF0YSk9Pntcblx0XHRyZXR1cm4gbmV3IENvbmR1Y3RvckxheWVyKHRoaXMsZGF0YSk7XG5cdH07XG5cblx0Y3JlYXRlSW5zdHJ1bWVudD0oZGF0YSk9Pntcblx0XHRyZXR1cm4gbmV3IENvbmR1Y3Rvckluc3RydW1lbnQodGhpcyxkYXRhKTtcblx0fTtcblxuXHRnZXRDb25kdWN0b3JJbnN0cnVtZW50QnlOYW1lKG5hbWUpIHtcblx0XHRmb3IgKGxldCBpbnN0cnVtZW50IG9mIHRoaXMuaW5zdHJ1bWVudHMuZ2V0SXRlbXMoKSkge1xuXHRcdFx0aWYgKGluc3RydW1lbnQuZ2V0TmFtZSgpPT1uYW1lKVxuXHRcdFx0XHRyZXR1cm4gaW5zdHJ1bWVudDtcblx0XHR9XG5cdH1cblxuXHRnZXRDdXJyZW50Q29uZHVjdG9yTGF5ZXIoKSB7XG5cdFx0bGV0IHN0YXRlPXRoaXMuc3RhdGU7XG5cdFx0bGV0IGtleT1zdGF0ZS5zb25nc1tzdGF0ZS5jdXJyZW50U29uZ0luZGV4XS5sYXllcnNbc3RhdGUuY3VycmVudExheWVySW5kZXhdLmtleTtcblxuXHRcdHJldHVybiB0aGlzLmxheWVycy5nZXRJdGVtQnlLZXkoa2V5KTtcblx0fVxuXG5cdHBsYXlMYXllckluc3RydW1lbnQoc291bmRJbmRleCkge1xuXHRcdGxldCBsYXllcj10aGlzLmdldEN1cnJlbnRDb25kdWN0b3JMYXllcigpO1xuXHRcdGxldCBub3RlPWxheWVyLmluc3RydW1lbnQuY3JlYXRlTm90ZShzb3VuZEluZGV4KTtcblx0XHRub3RlLnNldENob3JkQ2VudHModGhpcy5nZXRDdXJyZW50Q2hvcmRDZW50cygpKTtcblx0XHRub3RlLmNvbm5lY3QobGF5ZXIuZGVzdGluYXRpb24pO1xuXHRcdG5vdGUucGxheU5vdygpO1xuXHR9XG5cblx0Z2V0Q3VycmVudFNvbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUuc29uZ3NbdGhpcy5zdGF0ZS5jdXJyZW50U29uZ0luZGV4XTtcblx0fVxuXG5cdGdldENob3JkQ2VudHMoY2hvcmRJbmRleCkge1xuXHRcdGxldCBzb25nPXRoaXMuZ2V0Q3VycmVudFNvbmcoKTtcblx0XHRpZiAoIXNvbmcgfHwgY2hvcmRJbmRleDwwKVxuXHRcdFx0cmV0dXJuIFswLDAsMF07XG5cblx0XHRsZXQgc2NhbGVDaG9yZE5vdGVzPU11c2ljVXRpbC5nZXRDaG9yZE5vdGVzRm9yU2NhbGUoc29uZy5tdXNpY0tleSxzb25nLm1pbm9yKTtcblx0XHRsZXQgY2hvcmROb3Rlcz1zY2FsZUNob3JkTm90ZXNbY2hvcmRJbmRleF07XG5cdFx0cmV0dXJuIFtcblx0XHRcdE11c2ljVXRpbC5ub3RlVG9DZW50cyhjaG9yZE5vdGVzWzBdKSxcblx0XHRcdE11c2ljVXRpbC5ub3RlVG9DZW50cyhjaG9yZE5vdGVzWzFdKSxcblx0XHRcdE11c2ljVXRpbC5ub3RlVG9DZW50cyhjaG9yZE5vdGVzWzJdKVxuXHRcdF07XG5cdH1cblxuXHRnZXRDdXJyZW50Q2hvcmRDZW50cygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRDaG9yZENlbnRzKHRoaXMuc3RhdGUuY3VycmVudENob3JkSW5kZXgpO1xuXHR9XG5cblx0b25Ob3RlRW5kZWQobm90ZSkge1xuXHRcdGxldCBpZHg9dGhpcy5jdXJyZW50Tm90ZXMuaW5kZXhPZihub3RlKTtcblx0XHRpZiAoaWR4PDApXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLmN1cnJlbnROb3Rlcy5zcGxpY2UoaWR4LDEpO1xuXHR9XG5cblx0Z2V0U2VjUGVyR3JpZCgpIHtcblx0XHRsZXQgc2VjUGVyQmVhdD02MC90aGlzLmdldEN1cnJlbnRTb25nKCkuYnBtO1xuXHRcdGxldCBzZWNQZXJHcmlkPXNlY1BlckJlYXQvNDtcblxuXHRcdHJldHVybiBzZWNQZXJHcmlkO1xuXHR9XG5cblx0Z2V0U2VjUGVyQmFyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFNlY1BlckdyaWQoKSoxNjtcblx0fVxuXG5cdHBsYXlHcmlkU2xpY2UoYXQsIGdyaWRJbmRleCwgY2hvcmRDZW50cykge1xuXHRcdGZvciAobGV0IGxheWVyIG9mIHRoaXMubGF5ZXJzLmdldEl0ZW1zKCkpIHtcblx0XHRcdGZvciAobGV0IHNvdW5kSW5kZXggb2YgbGF5ZXIuZGF0YS5zZXFbZ3JpZEluZGV4XS5zb3VuZHMpIHtcblx0XHRcdFx0bGV0IG5vdGU9bGF5ZXIuaW5zdHJ1bWVudC5jcmVhdGVOb3RlKHNvdW5kSW5kZXgpO1xuXHRcdFx0XHRub3RlLmNvbm5lY3QobGF5ZXIuZGVzdGluYXRpb24pO1xuXHRcdFx0XHRub3RlLnNldENob3JkQ2VudHMoY2hvcmRDZW50cyk7XG5cdFx0XHRcdG5vdGUucGxheVNoZWR1bGVkKGF0LGxheWVyLmdldE5vdGVMZW4oZ3JpZEluZGV4KSp0aGlzLmdldFNlY1BlckdyaWQoKSk7XG5cdFx0XHRcdG5vdGUuc2V0VmVsb2NpdHkobGF5ZXIuZGF0YS5zZXFbZ3JpZEluZGV4XS52ZWwpO1xuXG5cdFx0XHRcdG5vdGUub25lbmRlZD10aGlzLm9uTm90ZUVuZGVkLmJpbmQodGhpcyxub3RlKTtcblx0XHRcdFx0dGhpcy5jdXJyZW50Tm90ZXMucHVzaChub3RlKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRwbGF5QmFyKGF0LCBjaG9yZENlbnRzKSB7XG5cdFx0Zm9yIChsZXQgZ3JpZEluZGV4PTA7IGdyaWRJbmRleDwxNjsgZ3JpZEluZGV4KyspIHtcblx0XHRcdHRoaXMucGxheUdyaWRTbGljZShcblx0XHRcdFx0YXQrZ3JpZEluZGV4KnRoaXMuZ2V0U2VjUGVyR3JpZCgpLFxuXHRcdFx0XHRncmlkSW5kZXgsXG5cdFx0XHRcdGNob3JkQ2VudHNcblx0XHRcdCk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0UGxheUdyaWRJbmRleCgpIHtcblx0XHRpZiAoIXRoaXMuaXNQbGF5aW5nKCkpXG5cdFx0XHRyZXR1cm4gLTE7XG5cblx0XHRyZXR1cm4gdGhpcy5wbGF5R3JpZEluZGV4O1xuXHR9XG5cblx0b25QbGF5VGljaz0odGlja0luZGV4KT0+e1xuXHRcdGxldCBzb25nPXRoaXMuZ2V0Q3VycmVudFNvbmcoKTtcblxuXHRcdGxldCBiYXJJbmRleD1NYXRoLmZsb29yKHRpY2tJbmRleC8xNik7XG5cdFx0bGV0IGdyaWRJbmRleD10aWNrSW5kZXglMTY7XG5cblx0XHR0aGlzLnBsYXlHcmlkSW5kZXg9Z3JpZEluZGV4O1xuXG5cdFx0aWYgKGdyaWRJbmRleD09MCAmJiB0aGlzLnBsYXlpbmdTZXF1ZW5jZUluZGV4Pj0wKSB7XG5cdFx0XHR0aGlzLnBsYXlpbmdTZXF1ZW5jZUNob3JkSW5kZXgrKztcblxuXHRcdFx0aWYgKHRoaXMucGxheWluZ1NlcXVlbmNlQ2hvcmRJbmRleD49c29uZy5zZWN0aW9uc1t0aGlzLnBsYXlpbmdTZXF1ZW5jZUluZGV4XS5sZW5ndGgpXG5cdFx0XHRcdHRoaXMucGxheWluZ1NlcXVlbmNlQ2hvcmRJbmRleD0wO1xuXHRcdH1cblxuXHRcdGlmIChiYXJJbmRleD09MCAmJiB0aWNrSW5kZXg9PTApIHtcblx0XHRcdGxldCBjZW50cz10aGlzLmdldEN1cnJlbnRDaG9yZENlbnRzKCk7XG5cblx0XHRcdGlmICh0aGlzLnBsYXlpbmdTZXF1ZW5jZUluZGV4Pj0wKSB7XG5cdFx0XHRcdGxldCBpPXRoaXMucGxheWluZ1NlcXVlbmNlQ2hvcmRJbmRleDtcblx0XHRcdFx0Y2VudHM9dGhpcy5nZXRDaG9yZENlbnRzKHNvbmcuc2VjdGlvbnNbdGhpcy5wbGF5aW5nU2VxdWVuY2VJbmRleF1baV0pO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnBsYXlCYXIoXG5cdFx0XHRcdHRoaXMuYXVkaW9UaW1lci5zdGFydFRpbWUsXG5cdFx0XHRcdGNlbnRzXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmIChncmlkSW5kZXg9PTE1KSB7XG5cdFx0XHRsZXQgY2VudHM9dGhpcy5nZXRDdXJyZW50Q2hvcmRDZW50cygpO1xuXG5cdFx0XHRpZiAodGhpcy5wbGF5aW5nU2VxdWVuY2VJbmRleD49MCkge1xuXHRcdFx0XHRsZXQgaT10aGlzLnBsYXlpbmdTZXF1ZW5jZUNob3JkSW5kZXg7XG5cdFx0XHRcdGk9KGkrMSklc29uZy5zZWN0aW9uc1t0aGlzLnBsYXlpbmdTZXF1ZW5jZUluZGV4XS5sZW5ndGg7XG5cdFx0XHRcdGNlbnRzPXRoaXMuZ2V0Q2hvcmRDZW50cyhzb25nLnNlY3Rpb25zW3RoaXMucGxheWluZ1NlcXVlbmNlSW5kZXhdW2ldKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5wbGF5QmFyKFxuXHRcdFx0XHR0aGlzLmF1ZGlvVGltZXIuc3RhcnRUaW1lKyhiYXJJbmRleCsxKSp0aGlzLmdldFNlY1BlckJhcigpLFxuXHRcdFx0XHRjZW50c1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5vblBsYXlHcmlkSW5kZXhDaGFuZ2UpXG5cdFx0XHR0aGlzLm9uUGxheUdyaWRJbmRleENoYW5nZShncmlkSW5kZXgsdGhpcy5wbGF5aW5nU2VxdWVuY2VDaG9yZEluZGV4KTtcblx0fVxuXG5cdHBsYXk9KCk9Pntcblx0XHRsZXQgc29uZz10aGlzLmdldEN1cnJlbnRTb25nKCk7XG5cdFx0dGhpcy5wbGF5QnBtPXNvbmcuYnBtO1xuXG5cdFx0dGhpcy5wbGF5aW5nU2VxdWVuY2VJbmRleD10aGlzLnN0YXRlLmN1cnJlbnRTZWN0aW9uSW5kZXg7XG5cdFx0dGhpcy5wbGF5aW5nU2VxdWVuY2VDaG9yZEluZGV4PS0xO1xuXG5cdFx0dGhpcy5hdWRpb1RpbWVyLnNldFN0YXJ0VGltZSh0aGlzLmF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSk7XG5cdFx0dGhpcy5hdWRpb1RpbWVyLnNldFRpY2tJbnRlcnZhbCh0aGlzLmdldFNlY1BlckdyaWQoKSk7XG5cdFx0dGhpcy5hdWRpb1RpbWVyLnN0YXJ0KCk7XG5cdH1cblxuXHRzdG9wKCkge1xuXHRcdGlmICh0aGlzLm9uUGxheUdyaWRJbmRleENoYW5nZSlcblx0XHRcdHRoaXMub25QbGF5R3JpZEluZGV4Q2hhbmdlKC0xLC0xKTtcblxuXHRcdHRoaXMucGxheUJwbT0wO1xuXHRcdHRoaXMuYXVkaW9UaW1lci5zdG9wKCk7XG5cblx0XHRmb3IgKGxldCBub3RlIG9mIHRoaXMuY3VycmVudE5vdGVzKSB7XG5cdFx0XHRub3RlLnNldFZlbG9jaXR5KDApO1xuXHRcdFx0bm90ZS5vbmVuZGVkPW51bGw7XG5cdFx0fVxuXG5cdFx0dGhpcy5jdXJyZW50Tm90ZXM9W107XG5cdH1cblxuXHRpc1BsYXlpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMuYXVkaW9UaW1lci5pc1J1bm5pbmcoKTtcblx0fVxuXG5cdHNldFN0YXRlPShzdGF0ZSk9Pntcblx0XHR0aGlzLnN0YXRlPXN0YXRlO1xuXHRcdHRoaXMuaW5zdHJ1bWVudHMuc2V0RGF0YShzdGF0ZS5pbnN0cnVtZW50cyk7XG5cblx0XHRpZiAodGhpcy5nZXRDdXJyZW50U29uZygpKSB7XG5cdFx0XHR0aGlzLmxheWVycy5zZXREYXRhKHRoaXMuZ2V0Q3VycmVudFNvbmcoKS5sYXllcnMpO1xuXHRcdFx0aWYgKHN0YXRlLnBsYXlpbmcgJiYgIXRoaXMuaXNQbGF5aW5nKCkpXG5cdFx0XHRcdHRoaXMucGxheSgpO1xuXG5cdFx0XHRlbHNlIGlmICghc3RhdGUucGxheWluZyAmJiB0aGlzLmlzUGxheWluZygpKVxuXHRcdFx0XHR0aGlzLnN0b3AoKTtcblxuXHRcdFx0aWYgKHRoaXMuaXNQbGF5aW5nKCkgJiYgdGhpcy5wbGF5QnBtIT10aGlzLmdldEN1cnJlbnRTb25nKCkuYnBtKSB7XG5cdFx0XHRcdHRoaXMuc3RvcCgpO1xuXHRcdFx0XHR0aGlzLnBsYXkoKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRlbHNlIHtcblx0XHRcdHRoaXMuc3RvcCgpO1xuXHRcdFx0dGhpcy5sYXllcnMuc2V0RGF0YShbXSk7XG5cdFx0fVxuXG5cdFx0aWYgKHN0YXRlLmN1cnJlbnRTZWN0aW9uSW5kZXg8MCkge1xuXHRcdFx0dGhpcy5wbGF5aW5nU2VxdWVuY2VJbmRleD0tMTtcblx0XHRcdHRoaXMucGxheWluZ1NlcXVlbmNlQ2hvcmRJbmRleD0tMVxuXHRcdFx0bGV0IGN1cnJlbnRDaG9yZENlbnRzPXRoaXMuZ2V0Q3VycmVudENob3JkQ2VudHMoKTtcblx0XHRcdGZvciAobGV0IG5vdGUgb2YgdGhpcy5jdXJyZW50Tm90ZXMpXG5cdFx0XHRcdG5vdGUuc2V0Q2hvcmRDZW50cyhjdXJyZW50Q2hvcmRDZW50cyk7XG5cdFx0fVxuXG5cdFx0ZWxzZSBpZiAoc3RhdGUuY3VycmVudFNlY3Rpb25JbmRleCE9dGhpcy5wbGF5aW5nU2VxdWVuY2VJbmRleCkge1xuXHRcdFx0dGhpcy5wbGF5aW5nU2VxdWVuY2VJbmRleD1zdGF0ZS5jdXJyZW50U2VjdGlvbkluZGV4O1xuXHRcdFx0dGhpcy5wbGF5aW5nU2VxdWVuY2VDaG9yZEluZGV4PS0xO1xuXHRcdH1cblx0fTtcbn1cbiIsImltcG9ydCBBdWRpb1V0aWwgZnJvbSAnLi4vdXRpbHMvQXVkaW9VdGlsJztcbmltcG9ydCBNdXNpY1V0aWwgZnJvbSAnLi4vdXRpbHMvTXVzaWNVdGlsJztcbmltcG9ydCBDb25kdWN0b3JOb3RlIGZyb20gJy4vQ29uZHVjdG9yTm90ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbmR1Y3Rvckluc3RydW1lbnQge1xuXHRjb25zdHJ1Y3Rvcihjb25kdWN0b3IsIGRhdGEpIHtcblx0XHR0aGlzLmNvbmR1Y3Rvcj1jb25kdWN0b3I7XG5cdFx0dGhpcy5kYXRhPWRhdGE7XG5cdH1cblxuXHRnZXROYW1lKCkge1xuXHRcdHJldHVybiB0aGlzLmRhdGEubmFtZTtcblx0fVxuXG5cdGFzeW5jIGxvYWQoKSB7XG5cdFx0c3dpdGNoICh0aGlzLmRhdGEudHlwZSkge1xuXHRcdFx0Y2FzZSBcImhhcm1vbmljXCI6XG5cdFx0XHRcdGxldCB1cmw9dGhpcy5kYXRhLnNhbXBsZTtcblx0XHRcdFx0dGhpcy5idWZmZXI9YXdhaXQgQXVkaW9VdGlsLmxvYWRCdWZmZXIodXJsLHRoaXMuY29uZHVjdG9yLmF1ZGlvQ29udGV4dCk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIFwicGVyY3Vzc2l2ZVwiOlxuXHRcdFx0XHR0aGlzLmJ1ZmZlcnM9W107XG5cdFx0XHRcdGZvciAobGV0IHVybCBvZiB0aGlzLmRhdGEuc2FtcGxlcylcblx0XHRcdFx0XHR0aGlzLmJ1ZmZlcnMucHVzaChhd2FpdCBBdWRpb1V0aWwubG9hZEJ1ZmZlcih1cmwsdGhpcy5jb25kdWN0b3IuYXVkaW9Db250ZXh0KSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXG5cdHVwZGF0ZShkYXRhKSB7XG5cdH1cblxuXHRmaW5hbGl6ZSgpIHtcblx0fVxuXG5cdGNyZWF0ZU5vdGUoc291bmRJbmRleCkge1xuXHRcdHN3aXRjaCAodGhpcy5kYXRhLnR5cGUpIHtcblx0XHRcdGNhc2UgXCJoYXJtb25pY1wiOlxuXHRcdFx0XHRsZXQgbm90ZT1uZXcgQ29uZHVjdG9yTm90ZSh0aGlzLmNvbmR1Y3Rvcix0aGlzLmJ1ZmZlcixzb3VuZEluZGV4KTtcblx0XHRcdFx0aWYgKHRoaXMuZGF0YS5zYW1wbGVOb3RlKVxuXHRcdFx0XHRcdG5vdGUuc2V0U2FtcGxlTm90ZUNlbnRzKE11c2ljVXRpbC5ub3RlVG9DZW50cyh0aGlzLmRhdGEuc2FtcGxlTm90ZSkpO1xuXG5cdFx0XHRcdHJldHVybiBub3RlO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSBcInBlcmN1c3NpdmVcIjpcblx0XHRcdFx0cmV0dXJuIG5ldyBDb25kdWN0b3JOb3RlKHRoaXMuY29uZHVjdG9yLHRoaXMuYnVmZmVyc1tzb3VuZEluZGV4XSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbmR1Y3RvckxheWVyIHtcblx0Y29uc3RydWN0b3IoY29uZHVjdG9yLCBkYXRhKSB7XG5cdFx0dGhpcy5jb25kdWN0b3I9Y29uZHVjdG9yO1xuXHRcdHRoaXMuZGF0YT1kYXRhO1xuXHRcdHRoaXMuaW5zdHJ1bWVudD10aGlzLmNvbmR1Y3Rvci5nZXRDb25kdWN0b3JJbnN0cnVtZW50QnlOYW1lKGRhdGEuaW5zdHJ1bWVudE5hbWUpO1xuXHRcdGlmICghdGhpcy5pbnN0cnVtZW50KVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVGhlcmUgaXMgbm8gaW5zdHJ1bWVudCEhIVwiKTtcblxuXHRcdHRoaXMuZ2Fpbj10aGlzLmNvbmR1Y3Rvci5hdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpO1xuXHRcdHRoaXMuZ2Fpbi5jb25uZWN0KHRoaXMuY29uZHVjdG9yLmF1ZGlvQ29udGV4dC5kZXN0aW5hdGlvbik7XG5cdFx0dGhpcy51cGRhdGVHYWluKCk7XG5cblx0XHR0aGlzLmRlc3RpbmF0aW9uPXRoaXMuZ2Fpbjtcblx0fVxuXG5cdHVwZGF0ZShkYXRhKSB7XG5cdFx0dGhpcy5kYXRhPWRhdGE7XG5cdFx0dGhpcy51cGRhdGVHYWluKCk7XG5cdH1cblxuXHRmaW5hbGl6ZSgpIHtcblx0XHR0aGlzLmdhaW4uZGlzY29ubmVjdCgpO1xuXHR9XG5cblx0dXBkYXRlR2FpbigpIHtcblx0XHRpZiAodGhpcy5kYXRhLmF1ZGlibGUgfHwgdGhpcy5kYXRhLmluZGV4PT10aGlzLmNvbmR1Y3Rvci5zdGF0ZS5jdXJyZW50TGF5ZXJJbmRleClcblx0XHRcdHRoaXMuZ2Fpbi5nYWluLnZhbHVlPXRoaXMuZGF0YS52b2x1bWU7XG5cblx0XHRlbHNlXG5cdFx0XHR0aGlzLmdhaW4uZ2Fpbi52YWx1ZT0wO1xuXHR9XG5cblx0aGFzU291bmRBdChwb3MpIHtcblx0XHRpZiAodGhpcy5kYXRhLnNlcVtwb3NdLnNvdW5kcy5sZW5ndGg+MClcblx0XHRcdHJldHVybiB0cnVlO1xuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Z2V0Tm90ZUxlbihwb3MpIHtcblx0XHRmb3IgKGxldCBpPTE7IGk8dGhpcy5kYXRhLnNlcS5sZW5ndGg7IGkrKylcblx0XHRcdGlmICh0aGlzLmhhc1NvdW5kQXQoKHBvcytpKSUxNilcblx0XHRcdFx0XHR8fCB0aGlzLmRhdGEuc2VxWyhwb3MraSklMTZdLnN0YWNjKVxuXHRcdFx0XHRyZXR1cm4gaTtcblxuXHRcdHJldHVybiAxNjtcblx0fVxufSIsImltcG9ydCBNdXNpY1V0aWwgZnJvbSAnLi4vdXRpbHMvTXVzaWNVdGlsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uZHVjdG9yTm90ZSB7XG5cdGNvbnN0cnVjdG9yKGNvbmR1Y3RvciwgYnVmZmVyLCBjaG9yZE5vdGUpIHtcblx0XHR0aGlzLmNvbmR1Y3Rvcj1jb25kdWN0b3I7XG5cdFx0dGhpcy5idWZmZXI9YnVmZmVyO1xuXG5cdFx0dGhpcy5nYWluPXRoaXMuY29uZHVjdG9yLmF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCk7XG5cdFx0dGhpcy5zb3VyY2U9dGhpcy5jb25kdWN0b3IuYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xuXHRcdHRoaXMuc291cmNlLmJ1ZmZlcj10aGlzLmJ1ZmZlcjtcblx0XHR0aGlzLnNvdXJjZS5jb25uZWN0KHRoaXMuZ2Fpbik7XG5cdFx0dGhpcy5zb3VyY2Uub25lbmRlZD0oKT0+e1xuXHRcdFx0dGhpcy5nYWluLmRpc2Nvbm5lY3QoKTtcblx0XHRcdGlmICh0aGlzLm9uZW5kZWQpXG5cdFx0XHRcdHRoaXMub25lbmRlZCh0aGlzKTtcblx0XHR9XG5cblx0XHR0aGlzLmNob3JkTm90ZT1jaG9yZE5vdGU7XG5cdFx0dGhpcy5jaG9yZENlbnRzPVswLDEwMCwyMDBdO1xuXHRcdHRoaXMuc2FtcGxlTm90ZUNlbnRzPTA7XG5cdFx0dGhpcy51cGRhdGVEZXR1bmUoKTtcblx0fVxuXG5cdGNvbm5lY3QoZGVzdGluYXRpb24pIHtcblx0XHR0aGlzLmlzQ29ubmVjdGVkPXRydWU7XG5cdFx0dGhpcy5nYWluLmNvbm5lY3QoZGVzdGluYXRpb24pO1xuXHR9XG5cblx0c2V0U2FtcGxlTm90ZUNlbnRzKGNlbnRzKSB7XG5cdFx0dGhpcy5zYW1wbGVOb3RlQ2VudHM9Y2VudHM7XG5cdFx0dGhpcy51cGRhdGVEZXR1bmUoKTtcblx0fVxuXG5cdHNldENob3JkQ2VudHMoY2hvcmRDZW50cykge1xuXHRcdHRoaXMuY2hvcmRDZW50cz1jaG9yZENlbnRzO1xuXHRcdHRoaXMudXBkYXRlRGV0dW5lKCk7XG5cdH1cblxuXHRwbGF5Tm93KCkge1xuXHRcdGlmICghdGhpcy5pc0Nvbm5lY3RlZClcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vdGUgbm90IGNvbm5lY3RlZCFcIik7XG5cblx0XHR0aGlzLnNvdXJjZS5zdGFydCgpO1xuXHR9XG5cblx0cGxheVNoZWR1bGVkKGF0LCBkdXJhdGlvbikge1xuXHRcdGlmICghdGhpcy5pc0Nvbm5lY3RlZClcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vdGUgbm90IGNvbm5lY3RlZCFcIik7XG5cblx0XHR0aGlzLnNvdXJjZS5zdGFydChhdCk7XG5cdFx0dGhpcy5zb3VyY2Uuc3RvcChhdCtkdXJhdGlvbik7XG5cdH1cblxuXHR1cGRhdGVEZXR1bmUoKSB7XG5cdFx0bGV0IGNlbnRzO1xuXG5cdFx0aWYgKHRoaXMuY2hvcmROb3RlPT11bmRlZmluZWQpXG5cdFx0XHRjZW50cz0wO1xuXG5cdFx0ZWxzZVxuXHRcdFx0Y2VudHM9XG5cdFx0XHRcdE11c2ljVXRpbC5PQ1RBVkVfQ0VOVFMqKE1hdGguZmxvb3IodGhpcy5jaG9yZE5vdGUvMyktMSkrXG5cdFx0XHRcdHRoaXMuY2hvcmRDZW50c1t0aGlzLmNob3JkTm90ZSUzXS1cblx0XHRcdFx0dGhpcy5zYW1wbGVOb3RlQ2VudHM7XG5cblx0XHRpZiAodGhpcy5zb3VyY2UuZGV0dW5lKVxuXHRcdFx0dGhpcy5zb3VyY2UuZGV0dW5lLnZhbHVlPWNlbnRzO1xuXG5cdFx0ZWxzZVxuXHRcdFx0dGhpcy5zb3VyY2UucGxheWJhY2tSYXRlLnZhbHVlPU11c2ljVXRpbC5yYXRlRnJvbUNlbnRzKGNlbnRzKTtcblx0fVxuXG5cdHNldFZlbG9jaXR5KHZlbCkge1xuXHRcdHRoaXMuZ2Fpbi5nYWluLnZhbHVlPXZlbDtcblx0fVxufSIsImltcG9ydCB7IGgsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5cbmNsYXNzIEFwcENvbnRleHQgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKTtcblxuXHRcdHRoaXMuY3VycmllZD17fTtcblxuXHRcdGZvciAobGV0IGtleSBvZiB0aGlzLmdldE9iamVjdEtleXMocHJvcHMuY29udHJvbGxlcikpIHtcblx0XHRcdHRoaXMuY3VycmllZFtrZXldPSguLi5hcmdzKT0+e1xuXG5cdFx0XHRcdGlmICh0aGlzLnByb3BzLmxvZ0FjdGlvbnMpXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJBY3Rpb246IFwiK2tleStcIiAoXCIrYXJncytcIilcIik7XG5cblx0XHRcdFx0Zm9yIChsZXQgaSBpbiBhcmdzKSB7XG5cdFx0XHRcdFx0aWYgKGFyZ3NbaV0gaW5zdGFuY2VvZiBFdmVudCkge1xuXHRcdFx0XHRcdFx0aWYgKGFyZ3NbaV0udHlwZT09XCJtb3VzZWRvd25cIiAmJiBhcmdzW2ldLmJ1dHRvbj09Milcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXG5cdFx0XHRcdFx0XHRhcmdzW2ldLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRhcmdzW2ldLnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0XHRcdFx0XHRpZiAoYXJnc1tpXS50eXBlPT1cImNoYW5nZVwiKSB7XG5cdFx0XHRcdFx0XHRcdGFyZ3NbaV09YXJnc1tpXS50YXJnZXQudmFsdWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0bGV0IG5ld1N0YXRlPXByb3BzLmNvbnRyb2xsZXJba2V5XSh0aGlzLnN0YXRlLCAuLi5hcmdzKTtcblx0XHRcdFx0aWYgKG5ld1N0YXRlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuXHRcdFx0XHRcdGlmICghdGhpcy5zdGF0ZSlcblx0XHRcdFx0XHRcdHRoaXMuc3RhdGU9e2J1c3k6IHRydWV9O1xuXG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdFx0XHRcdGJ1c3k6IHRydWVcblx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0bmV3U3RhdGUudGhlbigoc3RhdGUpPT57XG5cdFx0XHRcdFx0XHRzdGF0ZS5idXN5PWZhbHNlO1xuXHRcdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZShzdGF0ZSk7XG5cdFx0XHRcdFx0XHR0aGlzLm5vdGlmeVN0YXRlQ2hhbmdlKHN0YXRlKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGlmICghdGhpcy5zdGF0ZSlcblx0XHRcdFx0XHRcdHRoaXMuc3RhdGU9bmV3U3RhdGU7XG5cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKG5ld1N0YXRlKTtcblxuXHRcdFx0XHRcdHRoaXMubm90aWZ5U3RhdGVDaGFuZ2UobmV3U3RhdGUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Zm9yIChsZXQga2V5IG9mIHRoaXMuZ2V0T2JqZWN0S2V5cyhwcm9wcy5oZWxwZXIpKSB7XG5cdFx0XHR0aGlzLmN1cnJpZWRba2V5XT0oLi4uYXJncyk9Pntcblx0XHRcdFx0cmV0dXJuIHByb3BzLmhlbHBlcltrZXldKHRoaXMuc3RhdGUsIC4uLmFyZ3MpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChwcm9wcy5pbml0QWN0aW9uKVxuXHRcdFx0dGhpcy5jdXJyaWVkW3Byb3BzLmluaXRBY3Rpb25dKCk7XG5cdH1cblxuXHRub3RpZnlTdGF0ZUNoYW5nZShzdGF0ZSkge1xuXHRcdGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vblN0YXRlQ2hhbmdlPT1cImZ1bmN0aW9uXCIpXG5cdFx0XHR0aGlzLnByb3BzLm9uU3RhdGVDaGFuZ2Uoc3RhdGUpO1xuXHR9XG5cblx0Z2V0T2JqZWN0S2V5cyhvKSB7XG5cdFx0bGV0IGtleXM9W107XG5cdFx0bz1PYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7XG5cdFx0d2hpbGUgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG8pLmluZGV4T2YoXCJfX3Byb3RvX19cIik8MCkge1xuXHRcdFx0a2V5cz1rZXlzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvKSk7XG5cdFx0XHRvPU9iamVjdC5nZXRQcm90b3R5cGVPZihvKTtcblx0XHR9XG5cblx0XHRpZiAoa2V5cy5pbmNsdWRlcyhcImNvbnN0cnVjdG9yXCIpKVxuXHRcdFx0a2V5cy5zcGxpY2Uoa2V5cy5pbmRleE9mKFwiY29uc3RydWN0b3JcIiksMSk7XG5cblx0XHRyZXR1cm4ga2V5cztcblx0fVxuXG5cdGdldENoaWxkQ29udGV4dCgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Li4udGhpcy5zdGF0ZSxcblx0XHRcdC4uLnRoaXMuY3VycmllZFxuXHRcdH07XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW47XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFwcENvbnRleHQ7IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXVkaW9UaW1lciB7XG5cdGNvbnN0cnVjdG9yKGF1ZGlvQ29udGV4dCkge1xuXHRcdHRoaXMuYXVkaW9Db250ZXh0PWF1ZGlvQ29udGV4dDtcblx0XHR0aGlzLnRpbWVvdXQ9bnVsbDtcblx0fVxuXG5cdHByb2Nlc3NUaWNrcz0oKT0+e1xuXHRcdGxldCBjdXJyZW50VGltZT10aGlzLmF1ZGlvQ29udGV4dC5jdXJyZW50VGltZTtcblx0XHQvL2NvbnNvbGUubG9nKFwiY2FsbGVkIGF0OiBcIitjdXJyZW50VGltZSk7XG5cblx0XHR3aGlsZSAodGhpcy5zdGFydFRpbWUrdGhpcy5kZWxpdmVyZWRUaWNrcyp0aGlzLnRpY2tJbnRlcnZhbDw9Y3VycmVudFRpbWUpIHtcblx0XHRcdHRoaXMub25UaWNrKHRoaXMuZGVsaXZlcmVkVGlja3MpO1xuXHRcdFx0dGhpcy5kZWxpdmVyZWRUaWNrcysrO1xuXHRcdH1cblxuXHRcdGxldCBuZXh0QXQ9dGhpcy5zdGFydFRpbWUrKHRoaXMuZGVsaXZlcmVkVGlja3MpKnRoaXMudGlja0ludGVydmFsO1xuXHRcdGxldCB1bnRpbE5leHQ9bmV4dEF0LXRoaXMuYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lO1xuXHRcdC8vY29uc29sZS5sb2coXCJuZXh0IGF0OiBcIituZXh0QXQrXCIgaW46IFwiK3VudGlsTmV4dCk7XG5cblx0XHR0aGlzLnRpbWVvdXQ9c2V0VGltZW91dCh0aGlzLnByb2Nlc3NUaWNrcyx1bnRpbE5leHQqMTAwMCk7XG5cdH1cblxuXHRzdGFydCgpIHtcblx0XHR0aGlzLnN0b3AoKTtcblx0XHR0aGlzLmRlbGl2ZXJlZFRpY2tzPTA7XG5cblx0XHR0aGlzLnByb2Nlc3NUaWNrcygpO1xuXHR9XG5cblx0c3RvcCgpIHtcblx0XHRjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcblx0XHR0aGlzLnRpbWVvdXQ9bnVsbDtcblx0fVxuXG5cdHNldFN0YXJ0VGltZShzdGFydFRpbWUpIHtcblx0XHRpZiAodGhpcy5pc1J1bm5pbmcoKSlcblx0XHRcdHRocm93IG5ldyBFcnJvcihcImNhbid0IGNoYW5nZSBzdGFydCB0aW1lIHdoaWxlIHJ1bm5pbmchISFcIik7XG5cblx0XHR0aGlzLnN0YXJ0VGltZT1zdGFydFRpbWU7XG5cdH1cblxuXHRzZXRUaWNrSW50ZXJ2YWwodGlja0ludGVydmFsKSB7XG5cdFx0aWYgKHRoaXMuaXNSdW5uaW5nKCkpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjYW4ndCBjaGFuZ2UgdGljayBpbnRlcnZhbCB3aGlsZSBydW5uaW5nISEhXCIpO1xuXG5cdFx0dGhpcy50aWNrSW50ZXJ2YWw9dGlja0ludGVydmFsO1xuXHR9XG5cblx0aXNSdW5uaW5nKCkge1xuXHRcdHJldHVybiAhIXRoaXMudGltZW91dDtcblx0fVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1ZGlvVXRpbCB7XG5cdHN0YXRpYyBsb2FkQnVmZmVyKHVybCwgY29udGV4dCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuXHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRcdHJlcXVlc3Qub3BlbignR0VUJywgdXJsLCB0cnVlKTtcblx0XHRcdHJlcXVlc3QucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJztcblxuXHRcdFx0cmVxdWVzdC5vbmxvYWQ9KCk9Pntcblx0XHRcdFx0Y29udGV4dC5kZWNvZGVBdWRpb0RhdGEocmVxdWVzdC5yZXNwb25zZSxcblx0XHRcdFx0XHQoYnVmZmVyKT0+e1xuXHRcdFx0XHRcdFx0cmVzb2x2ZShidWZmZXIpO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0KGUpPT57XG5cdFx0XHRcdFx0XHRyZWplY3QoZSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdCk7XG5cdFx0XHR9O1xuXHRcdFx0cmVxdWVzdC5zZW5kKCk7XG5cdFx0fSlcblx0fVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXVzaWNVdGlsIHtcblx0c3RhdGljIE9DVEFWRV9DRU5UUz0xMjAwO1xuXHRzdGF0aWMgTk9URV9OQU1FUz1bXCJBXCIsXCJBI1wiLFwiQlwiLFwiQ1wiLFwiQyNcIixcIkRcIixcIkQjXCIsXCJFXCIsXCJGXCIsXCJGI1wiLFwiR1wiLFwiRyNcIl07XG5cblx0c3RhdGljIHJhdGVGcm9tQ2VudHMoY2VudHMpIHtcblx0XHRsZXQgbWlkZGxlQ0ZyZXE9MjYxLjYzO1xuXHRcdGxldCBmcmVxPW1pZGRsZUNGcmVxKk1hdGgucG93KDIsY2VudHMvMTIwMCk7XG5cdFx0bGV0IHJhdGU9ZnJlcS9taWRkbGVDRnJlcTtcblxuXHRcdHJldHVybiByYXRlO1xuXHR9XG5cblx0c3RhdGljIG5vdGVUb0NlbnRzKHMpIHtcblx0XHRzd2l0Y2ggKHMudG9VcHBlckNhc2UoKSkge1xuXHRcdFx0Y2FzZSBcIkNcIjpcblx0XHRcdGNhc2UgXCJcIjpcblx0XHRcdFx0cmV0dXJuIDA7XG5cblx0XHRcdGNhc2UgXCJDI1wiOlxuXHRcdFx0XHRyZXR1cm4gMTAwO1xuXG5cdFx0XHRjYXNlIFwiRFwiOlxuXHRcdFx0XHRyZXR1cm4gMjAwO1xuXG5cdFx0XHRjYXNlIFwiRCNcIjpcblx0XHRcdFx0cmV0dXJuIDMwMDtcblxuXHRcdFx0Y2FzZSBcIkVcIjpcblx0XHRcdFx0cmV0dXJuIDQwMDtcblxuXHRcdFx0Y2FzZSBcIkZcIjpcblx0XHRcdFx0cmV0dXJuIDUwMDtcblxuXHRcdFx0Y2FzZSBcIkYjXCI6XG5cdFx0XHRcdHJldHVybiA2MDA7XG5cblx0XHRcdGNhc2UgXCJHXCI6XG5cdFx0XHRcdHJldHVybiA3MDA7XG5cblx0XHRcdGNhc2UgXCJHI1wiOlxuXHRcdFx0XHRyZXR1cm4gODAwO1xuXG5cdFx0XHRjYXNlIFwiQVwiOlxuXHRcdFx0XHRyZXR1cm4gOTAwO1xuXG5cdFx0XHRjYXNlIFwiQSNcIjpcblx0XHRcdFx0cmV0dXJuIDEwMDA7XG5cblx0XHRcdGNhc2UgXCJCXCI6XG5cdFx0XHRcdHJldHVybiAxMTAwO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBnZXROb3Rlc0ZvclNjYWxlKHNjYWxlLCBtaW5vcikge1xuXHRcdGxldCBzdGFydEluZGV4PU11c2ljVXRpbC5OT1RFX05BTUVTLmluZGV4T2Yoc2NhbGUpO1xuXHRcdGlmIChzdGFydEluZGV4PDApXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJubyBzdWNoIHNjYWxlOiBcIitzY2FsZSk7XG5cblx0XHRsZXQgbm90ZUluZGVjZXM9WzAsMiw0LDUsNyw5LDExXTtcblx0XHRpZiAobWlub3IpXG5cdFx0XHRub3RlSW5kZWNlcz1bMCwyLDMsNSw3LDgsMTBdO1xuXG5cdFx0bGV0IHJlcz1bXTtcblx0XHRmb3IgKGxldCBpbmRleCBvZiBub3RlSW5kZWNlcylcblx0XHRcdHJlcy5wdXNoKE11c2ljVXRpbC5OT1RFX05BTUVTWyhzdGFydEluZGV4K2luZGV4KSUxMl0pO1xuXG5cdFx0cmV0dXJuIHJlcztcblx0fVxuXG5cdHN0YXRpYyBnZXRDaG9yZE5vdGVzRm9yU2NhbGUoc2NhbGUsIG1pbm9yKSB7XG5cdFx0bGV0IG5vdGVOYW1lcz1NdXNpY1V0aWwuZ2V0Tm90ZXNGb3JTY2FsZShzY2FsZSxtaW5vcik7XG5cblx0XHRsZXQgcmVzPVtdO1xuXHRcdGZvciAobGV0IGk9MDsgaTwxMjsgaSsrKVxuXHRcdFx0cmVzLnB1c2goW1xuXHRcdFx0XHRub3RlTmFtZXNbKGkpJTddLFxuXHRcdFx0XHRub3RlTmFtZXNbKGkrMiklN10sXG5cdFx0XHRcdG5vdGVOYW1lc1soaSs0KSU3XSxcblx0XHRcdF0pO1xuXG5cdFx0cmV0dXJuIHJlcztcblx0fVxuXG5cdHN0YXRpYyBnZXRDaG9yZE5hbWVzRm9yU2NhbGUoc2NhbGUsIG1pbm9yKSB7XG5cdFx0bGV0IHByZWZpeGVzPVtcIlwiLFwiLVwiLFwiLVwiLFwiXCIsXCJcIixcIi1cIixcIm9cIl07XG5cdFx0aWYgKG1pbm9yKVxuXHRcdFx0cHJlZml4ZXM9W1wiLVwiLFwib1wiLFwiXCIsXCItXCIsXCItXCIsXCJcIixcIlwiXTtcblxuXHRcdGxldCBub3RlTmFtZXM9TXVzaWNVdGlsLmdldE5vdGVzRm9yU2NhbGUoc2NhbGUsbWlub3IpO1xuXHRcdGxldCByZXM9W107XG5cdFx0Zm9yIChsZXQgaW5kZXggaW4gbm90ZU5hbWVzKVxuXHRcdFx0cmVzLnB1c2gobm90ZU5hbWVzW2luZGV4XStwcmVmaXhlc1tpbmRleF0pO1xuXG5cdFx0cmV0dXJuIHJlcztcblx0fVxufSIsImltcG9ydCB7IGgsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5cbmV4cG9ydCBjbGFzcyBTZWxlY3Qge1xuXHRvbkNoYW5nZT0oZSk9Pntcblx0XHRpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSlcblx0XHRcdHRoaXMucHJvcHMub25DaGFuZ2UoSlNPTi5wYXJzZShlLnRhcmdldC52YWx1ZSkpO1xuXG5cdFx0aWYgKHRoaXMucHJvcHMub25JbmRleENoYW5nZSlcblx0XHRcdHRoaXMucHJvcHMub25JbmRleENoYW5nZShlLnRhcmdldC5zZWxlY3RlZEluZGV4KTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRsZXQgcHJvcHM9dGhpcy5wcm9wcztcblxuXHRcdGlmICghcHJvcHMubGFiZWxGaWVsZClcblx0XHRcdHByb3BzLmxhYmVsRmllbGQ9XCJsYWJlbFwiO1xuXG5cdFx0aWYgKCFwcm9wcy5vcHRpb25zKVxuXHRcdFx0cHJvcHMub3B0aW9ucz1bXTtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8c2VsZWN0IGNsYXNzPXtwcm9wcy5jbGFzc31cblx0XHRcdFx0XHRzdHlsZT17cHJvcHMuc3R5bGV9XG5cdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG5cdFx0XHRcdFx0a2V5PXtwcm9wcy5rZXl9PlxuXHRcdFx0XHR7cHJvcHMub3B0aW9ucy5tYXAoKG9wdGlvbiwgaW5kZXgpPT57XG5cdFx0XHRcdFx0bGV0IHNlbGVjdGVkPWZhbHNlO1xuXG5cdFx0XHRcdFx0aWYgKHByb3BzLmhhc093blByb3BlcnR5KCdzZWxlY3RlZEluZGV4JykgJiZcblx0XHRcdFx0XHRcdFx0aW5kZXg9PT1wcm9wcy5zZWxlY3RlZEluZGV4KVxuXHRcdFx0XHRcdFx0c2VsZWN0ZWQ9dHJ1ZTtcblxuXHRcdFx0XHRcdGlmIChwcm9wcy5oYXNPd25Qcm9wZXJ0eSgnc2VsZWN0ZWQnKSAmJlxuXHRcdFx0XHRcdFx0XHRvcHRpb24ua2V5PT09cHJvcHMuc2VsZWN0ZWQpXG5cdFx0XHRcdFx0XHRzZWxlY3RlZD10cnVlO1xuXG5cdFx0XHRcdFx0bGV0IGtleT1vcHRpb24ua2V5O1xuXHRcdFx0XHRcdGlmIChwcm9wcy5oYXNPd25Qcm9wZXJ0eSgnb3B0aW9uS2V5UHJlZml4JykpXG5cdFx0XHRcdFx0XHRrZXk9cHJvcHMua2V5UHJlZml4K2tleTtcblxuXHRcdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0XHQ8b3B0aW9uIGtleT17a2V5fVxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlPXtKU09OLnN0cmluZ2lmeShvcHRpb24ua2V5KX1cblx0XHRcdFx0XHRcdFx0XHRzZWxlY3RlZD17c2VsZWN0ZWR9XG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3M9e29wdGlvbi5jbGFzc30+XG5cdFx0XHRcdFx0XHRcdHtvcHRpb25bcHJvcHMubGFiZWxGaWVsZF19XG5cdFx0XHRcdFx0XHQ8L29wdGlvbj5cblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9KX1cblx0XHRcdDwvc2VsZWN0PlxuXHRcdCk7XG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIElGKGNvbmQsZnVuYykge1xuXHRpZiAoY29uZClcblx0XHRyZXR1cm4gZnVuYygpO1xufSIsIi8vaW1wb3J0IGltbXV0YWJsZSBmcm9tICdpbW11dGFibGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWNvbmNpbGVBcnJheSB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHR0aGlzLml0ZW1zQnlLZXk9e307XG5cdFx0dGhpcy5vcHRpb25zPW9wdGlvbnM7XG5cdH1cblxuXHRzdGF0aWMgY3JlYXRlV2l0aEZhY3RvcnkoZmFjdG9yeSkge1xuXHRcdHJldHVybiBuZXcgUmVjb25jaWxlQXJyYXkoe1xuXHRcdFx0aXRlbUZhY3Rvcnk6IGZhY3Rvcnlcblx0XHR9KVxuXHR9XG5cblx0Y3JlYXRlSXRlbShkYXRhKSB7XG5cdFx0aWYgKHRoaXMub3B0aW9ucy5pdGVtRmFjdG9yeSlcblx0XHRcdHJldHVybiB0aGlzLm9wdGlvbnMuaXRlbUZhY3RvcnkoZGF0YSk7XG5cblx0XHRlbHNlIGlmICh0aGlzLm9wdGlvbnMuaXRlbUNsYXNzKVxuXHRcdFx0cmV0dXJuIG5ldyB0aGlzLm9wdGlvbnMuaXRlbUNsYXNzKGRhdGEpO1xuXG5cdFx0ZWxzZVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiTm8gd2F5IHRvIGNyZWF0ZSBpdGVtcyFcIik7XG5cdH1cblxuXHRzZXREYXRhKGRhdGFzKSB7XG5cdFx0bGV0IG5ld0tleXM9W107XG5cdFx0Zm9yIChsZXQgaW5kZXggaW4gZGF0YXMpIHtcblx0XHRcdGxldCBkYXRhPWRhdGFzW2luZGV4XTtcblx0XHRcdGRhdGEuaW5kZXg9aW5kZXg7XG5cblx0XHRcdGlmICghZGF0YS5rZXkpXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIkFycmF5IGl0ZW0gZG9lc24ndCBoYXZlIGEga2V5XCIpO1xuXG5cdFx0XHRsZXQga2V5PVN0cmluZyhkYXRhLmtleSk7XG5cdFx0XHRuZXdLZXlzLnB1c2goa2V5KTtcblxuXHRcdFx0Ly9sZXQgaW09aW1tdXRhYmxlLmZyb21KUyhkYXRhKTtcblx0XHRcdGlmICh0aGlzLml0ZW1zQnlLZXlba2V5XSkge1xuXHRcdFx0XHQvL2lmICghaW0uZXF1YWxzKHRoaXMuaXRlbXNCeUtleVtrZXldLl9faW0pKVxuXHRcdFx0XHR0aGlzLml0ZW1zQnlLZXlba2V5XS51cGRhdGUoZGF0YSk7XG5cdFx0XHR9XG5cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHR0aGlzLml0ZW1zQnlLZXlba2V5XT10aGlzLmNyZWF0ZUl0ZW0oZGF0YSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vdGhpcy5pdGVtc0J5S2V5W2tleV0uX19pbT1pbTtcblx0XHR9XG5cblx0XHRmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmtleXModGhpcy5pdGVtc0J5S2V5KSkge1xuXHRcdFx0aWYgKG5ld0tleXMuaW5kZXhPZihrZXkpPDApIHtcblx0XHRcdFx0dGhpcy5pdGVtc0J5S2V5W2tleV0uZmluYWxpemUoKTtcblx0XHRcdFx0ZGVsZXRlIHRoaXMuaXRlbXNCeUtleVtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGdldEl0ZW1zKCkge1xuXHRcdHJldHVybiBPYmplY3QudmFsdWVzKHRoaXMuaXRlbXNCeUtleSk7XG5cdH1cblxuXHRnZXRJdGVtQnlLZXkoa2V5KSB7XG5cdFx0cmV0dXJuIHRoaXMuaXRlbXNCeUtleVtrZXldO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBoLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0b25Eb3duPShlKT0+e1xuXHRcdGlmIChlIGluc3RhbmNlb2YgVG91Y2hFdmVudClcblx0XHRcdHdpbmRvdy5oYXZlVG91Y2hFdmVudD10cnVlO1xuXG5cdFx0aWYgKHdpbmRvdy5oYXZlVG91Y2hFdmVudCAmJiAhKGUgaW5zdGFuY2VvZiBUb3VjaEV2ZW50KSlcblx0XHRcdHJldHVybjtcblxuXHRcdC8vZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRpZiAodGhpcy5iYXNlLmlzUHJlc3NlZClcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuYmFzZS5pc1ByZXNzZWQ9dHJ1ZTtcblxuXHRcdGlmICh0aGlzLnByb3BzLm9uUHJlc3MpXG5cdFx0XHR0aGlzLnByb3BzLm9uUHJlc3MoKTtcblxuXHRcdGlmICh0aGlzLnByb3BzLm9uUmVsZWFzZSlcblx0XHRcdHRoaXMuYmFzZS5jbGFzc05hbWUrPVwiIHByZXNzZWRcIjtcblx0fVxuXG5cdG9uVXA9KGUpPT57XG5cdFx0aWYgKGUgaW5zdGFuY2VvZiBUb3VjaEV2ZW50KVxuXHRcdFx0d2luZG93LmhhdmVUb3VjaEV2ZW50PXRydWU7XG5cblx0XHRpZiAod2luZG93LmhhdmVUb3VjaEV2ZW50ICYmICEoZSBpbnN0YW5jZW9mIFRvdWNoRXZlbnQpKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0aWYgKGUuY2FuY2VsYWJsZSlcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRpZiAoIXRoaXMuYmFzZS5pc1ByZXNzZWQpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLmJhc2UuaXNQcmVzc2VkPWZhbHNlO1xuXG5cdFx0aWYgKHRoaXMucHJvcHMub25SZWxlYXNlKSB7XG5cdFx0XHR0aGlzLmJhc2UuY2xhc3NOYW1lPXRoaXMuYmFzZS5jbGFzc05hbWUucmVwbGFjZShcIiBwcmVzc2VkXCIsXCJcIik7XG5cdFx0XHR0aGlzLnByb3BzLm9uUmVsZWFzZSgpO1xuXHRcdH1cblx0fVxuXG5cdG9uTW92ZT0oZSk9Pntcblx0XHRpZiAodGhpcy5wcm9wcy5jYW5jZWxPbk1vdmUgJiYgdGhpcy5iYXNlLmlzUHJlc3NlZCkge1xuXHRcdFx0dGhpcy5iYXNlLmNsYXNzTmFtZT10aGlzLmJhc2UuY2xhc3NOYW1lLnJlcGxhY2UoXCIgcHJlc3NlZFwiLFwiXCIpO1xuXHRcdFx0dGhpcy5iYXNlLmlzUHJlc3NlZD1mYWxzZTtcblx0XHR9XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxhIGNsYXNzPXtcImEgXCIrdGhpcy5wcm9wcy5jbGFzc31cblx0XHRcdFx0XHRvblRvdWNoTW92ZT17dGhpcy5vbk1vdmV9XG5cdFx0XHRcdFx0b25Ub3VjaFN0YXJ0PXt0aGlzLm9uRG93bn1cblx0XHRcdFx0XHRvblRvdWNoRW5kPXt0aGlzLm9uVXB9XG5cdFx0XHRcdFx0b25Nb3VzZURvd249e3RoaXMub25Eb3dufVxuXHRcdFx0XHRcdG9uTW91c2VVcD17dGhpcy5vblVwfT5cblx0XHRcdFx0e3RoaXMucHJvcHMuY2hpbGRyZW59XG5cdFx0XHQ8L2E+XG5cdFx0KVxuXHR9XG59IiwiaW1wb3J0IHsgaCwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCBBIGZyb20gJy4vQS5qc3gnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZGRMYXllciB7XG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzcz1cInBhbmUtY29udGFpbmVyXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJib3ggcGFuZSBkb3VibGUgYmctZGFya1wiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lLWhlYWRlciBiZy1kYXJrIHRleHQtc2Vjb25kYXJ5XCI+QUREIExBWUVSPC9kaXY+XG5cdFx0XHRcdFx0e3RoaXMuY29udGV4dC5pbnN0cnVtZW50cy5tYXAoKGluc3RydW1lbnQsaW5kZXgpPT4oXG5cdFx0XHRcdFx0XHQ8QSBjbGFzcz1cImJveCB3LTQgdGV4dC13aGl0ZSBiZy1kYW5nZXIgZWxcIlxuXHRcdFx0XHRcdFx0XHRcdG9uUmVsZWFzZT17dGhpcy5jb250ZXh0LmFkZExheWVyLmJpbmQobnVsbCxpbnN0cnVtZW50Lm5hbWUpfT5cblx0XHRcdFx0XHRcdFx0PGltZyBzcmM9e1wiaW1nL1wiK2luc3RydW1lbnQuaWNvbn0vPlxuXHRcdFx0XHRcdFx0XHR7aW5zdHJ1bWVudC5uYW1lfVxuXHRcdFx0XHRcdFx0PC9BPlxuXHRcdFx0XHRcdCkpfVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbiIsImltcG9ydCB7IGgsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyBTZWxlY3QsIElGIH0gZnJvbSAnLi4vdXRpbHMvUmVhY3RVdGlsLmpzeCc7XG5pbXBvcnQgSGVhZGVyIGZyb20gJy4vSGVhZGVyLmpzeCc7XG5pbXBvcnQgRnJvbnQgZnJvbSAnLi9Gcm9udC5qc3gnO1xuaW1wb3J0IFNvbmcgZnJvbSAnLi9Tb25nLmpzeCc7XG5pbXBvcnQgU29uZ1NldHRpbmdzIGZyb20gJy4vU29uZ1NldHRpbmdzLmpzeCc7XG5pbXBvcnQgTGF5ZXJTZXR0aW5ncyBmcm9tICcuL0xheWVyU2V0dGluZ3MuanN4JztcbmltcG9ydCBBZGRMYXllciBmcm9tICcuL0FkZExheWVyLmpzeCc7XG5pbXBvcnQgTGF5ZXIgZnJvbSAnLi9MYXllci5qc3gnO1xuaW1wb3J0IFNlbGVjdENob3JkIGZyb20gJy4vU2VsZWN0Q2hvcmQuanN4JztcbmltcG9ydCBUYXBIaWdobGlnaHQgZnJvbSAnLi9UYXBIaWdobGlnaHQuanN4Jztcbi8vaW1wb3J0IEFib3V0U2NyZWVuIGZyb20gJy4vQWJvdXRTY3JlZW4uanN4JztcbmltcG9ydCBBIGZyb20gJy4vQS5qc3gnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAgZXh0ZW5kcyBDb21wb25lbnQge1xuXHR1cGRhdGVTaXplPSgpPT57XG5cdFx0bGV0IHdpbmRvd1dpZHRoPWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcblx0XHRsZXQgd2luZG93SGVpZ2h0PWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XG5cblx0XHRsZXQgY3M9Z2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpO1xuXHRcdGxldCBwYW5lV2lkdGg9cGFyc2VGbG9hdChjcy5nZXRQcm9wZXJ0eVZhbHVlKCctLXBhbmVXaWR0aCcpKTtcblx0XHRsZXQgcGFuZUhlaWdodD1wYXJzZUZsb2F0KGNzLmdldFByb3BlcnR5VmFsdWUoJy0tcGFuZUhlaWdodCcpKTtcblxuXHRcdGxldCBjb250ZW50V2lkdGgsY29udGVudEhlaWdodDtcblxuXHRcdGxldCBlbD1kb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuXHRcdGxldCBzY3JlZW5LZXlib2FyZEFjdGl2ZT1mYWxzZTtcblx0XHRpZiAoZWwubm9kZU5hbWU9PVwiSU5QVVRcIiAmJiBlbC50eXBlPT1cInRleHRcIilcblx0XHRcdHNjcmVlbktleWJvYXJkQWN0aXZlPXRydWU7XG5cblx0XHQvLyBQb3J0cmFpdC5cblx0XHRpZiAod2luZG93SGVpZ2h0PndpbmRvd1dpZHRoKSB7XG5cdFx0XHRjb250ZW50SGVpZ2h0PTIqKHBhbmVIZWlnaHQrMSkrMjtcblx0XHRcdGNvbnRlbnRXaWR0aD1wYW5lV2lkdGgrMTtcblx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmNsYXNzTGlzdC5hZGQoXCJwb3J0cmFpdFwiKTtcblx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJsYW5kc2NhcGVcIik7XG5cblx0XHRcdGlmICh3aW5kb3cuaGFzT3duUHJvcGVydHkoXCJjb3Jkb3ZhXCIpKVxuXHRcdFx0XHRTdGF0dXNCYXIuc2hvdygpO1xuXHRcdH1cblxuXHRcdC8vIExhbmRzY2FwZS5cblx0XHRlbHNlIHtcblx0XHRcdGNvbnRlbnRIZWlnaHQ9cGFuZUhlaWdodCsyKzE7XG5cdFx0XHRjb250ZW50V2lkdGg9MioocGFuZVdpZHRoKzEpO1xuXHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuY2xhc3NMaXN0LmFkZChcImxhbmRzY2FwZVwiKTtcblx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJwb3J0cmFpdFwiKTtcblxuXHRcdFx0aWYgKHdpbmRvdy5oYXNPd25Qcm9wZXJ0eShcImNvcmRvdmFcIikpIHtcblx0XHRcdFx0aWYgKHNjcmVlbktleWJvYXJkQWN0aXZlKVxuXHRcdFx0XHRcdFN0YXR1c0Jhci5zaG93KCk7XG5cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFN0YXR1c0Jhci5oaWRlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0bGV0IGZvbnRTaXplO1xuXHRcdGlmICh3aW5kb3dXaWR0aC9jb250ZW50V2lkdGg8d2luZG93SGVpZ2h0L2NvbnRlbnRIZWlnaHQpXG5cdFx0XHRmb250U2l6ZT13aW5kb3dXaWR0aC9jb250ZW50V2lkdGg7XG5cblx0XHRlbHNlXG5cdFx0XHRmb250U2l6ZT13aW5kb3dIZWlnaHQvY29udGVudEhlaWdodDtcblxuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJodG1sXCIpLnN0eWxlLmZvbnRTaXplPWZvbnRTaXplK1wicHhcIjtcblxuXHRcdGxldCBzPWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZTtcblx0XHRzLnNldFByb3BlcnR5KFwiLS1wYW5lTWFyZ2luVG9wXCIsKCh3aW5kb3dIZWlnaHQtZm9udFNpemUqY29udGVudEhlaWdodCkvMikrXCJweFwiKTtcblx0XHRzLnNldFByb3BlcnR5KFwiLS1wYW5lTWFyZ2luTGVmdFwiLCgod2luZG93V2lkdGgtZm9udFNpemUqY29udGVudFdpZHRoKS8yKStcInB4XCIpO1xuXHR9XG5cblx0b25QbGF5Q2xpY2s9KCk9Pntcblx0XHRjb25zb2xlLmxvZyhcInBsYXlcIik7XG5cdH1cblxuXHRjb21wb25lbnREaWRNb3VudCgpIHtcblx0XHR3aW5kb3cub25yZXNpemU9dGhpcy51cGRhdGVTaXplO1xuXHRcdHNldFRpbWVvdXQodGhpcy51cGRhdGVTaXplLDApO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdGlmICh0aGlzLmNvbnRleHQuYnVzeSlcblx0XHRcdHJldHVybiAoPGRpdj5MT0FESU5HLi4uPC9kaXY+KTtcblxuXHRcdGxldCBjbHM9XCJcIjtcblx0XHRpZiAodGhpcy5jb250ZXh0LnJlY29yZGluZylcblx0XHRcdGNscz1cInJlY29yZGluZ1wiO1xuXG5cdFx0Ly8gPFRhcEhpZ2hsaWdodCAvPlxuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3M9e2Nsc30+XG5cdFx0XHRcdDxIZWFkZXIgLz5cblx0XHRcdFx0e0lGKCF0aGlzLmNvbnRleHQuaXNTb25nT3BlbigpLCgpPT5cblx0XHRcdFx0XHQ8RnJvbnQgLz5cblx0XHRcdFx0KX1cblx0XHRcdFx0e0lGKHRoaXMuY29udGV4dC5pc1NvbmdPcGVuKCksKCk9Pntcblx0XHRcdFx0XHRpZiAodGhpcy5jb250ZXh0LnNldHRpbmdzVmlzaWJsZSkge1xuXHRcdFx0XHRcdFx0aWYgKHRoaXMuY29udGV4dC5jdXJyZW50TGF5ZXJJbmRleD49MClcblx0XHRcdFx0XHRcdFx0cmV0dXJuIDxMYXllclNldHRpbmdzIC8+O1xuXG5cdFx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRcdHJldHVybiA8U29uZ1NldHRpbmdzIC8+O1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGVsc2UgaWYgKHRoaXMuY29udGV4dC5hZGRMYXllclZpc2libGUpXG5cdFx0XHRcdFx0XHRyZXR1cm4gPEFkZExheWVyIC8+O1xuXG5cdFx0XHRcdFx0ZWxzZSBpZiAodGhpcy5jb250ZXh0LmN1cnJlbnRMYXllckluZGV4Pj0wKVxuXHRcdFx0XHRcdFx0cmV0dXJuIDxMYXllciAvPlxuXG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0cmV0dXJuIDxTb25nIC8+O1xuXHRcdFx0XHR9KX1cblx0XHRcdFx0ey8qSUYodGhpcy5jb250ZXh0LmFib3V0U2NyZWVuVmlzaWJsZSwoKT0+XG5cdFx0XHRcdFx0PEFib3V0U2NyZWVuIC8+XG5cdFx0XHRcdCkqL31cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbiIsImltcG9ydCB7IGgsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgQSBmcm9tICcuL0EuanN4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnJvbnQge1xuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lLWNvbnRhaW5lclwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYm94IHBhbmUgZG91YmxlIGJvcmRlciBib3JkZXItZGFya1wiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lLWhlYWRlciB0ZXh0LXNlY29uZGFyeSBiZy1kYXJrXCI+U09OR1M8L2Rpdj5cblxuXHRcdFx0XHRcdDxBIGNsYXNzPVwidGV4dC13aGl0ZVwiXG5cdFx0XHRcdFx0XHRcdG9uUmVsZWFzZT17dGhpcy5jb250ZXh0LmFkZFNvbmd9PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImJveCBiZy1kYXJrIHctMVwiPis8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJib3hcIj5OZXcgU29uZzwvZGl2PlxuXHRcdFx0XHRcdDwvQT5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZnJvbnQtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHR7dGhpcy5jb250ZXh0LnNvbmdzLm1hcCgoc29uZyxpbmRleCk9Pihcblx0XHRcdFx0XHRcdFx0PEEgY2xhc3M9XCJib3ggYmctc2Vjb25kYXJ5IHRleHQtd2hpdGUgdy00IGJvcmRlciBib3JkZXItbGlnaHQgZWxcIlxuXHRcdFx0XHRcdFx0XHRcdFx0b25SZWxlYXNlPXt0aGlzLmNvbnRleHQuc2V0U29uZ0luZGV4LmJpbmQobnVsbCxpbmRleCl9XG5cdFx0XHRcdFx0XHRcdFx0XHRjYW5jZWxPbk1vdmU9e3RydWV9PlxuXHRcdFx0XHRcdFx0XHRcdHtzb25nLm5hbWV9XG5cdFx0XHRcdFx0XHRcdDwvQT5cblx0XHRcdFx0XHRcdCkpfVxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbiIsImltcG9ydCB7IGgsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyBTZWxlY3QsIElGIH0gZnJvbSAnLi4vdXRpbHMvUmVhY3RVdGlsLmpzeCc7XG5pbXBvcnQgQSBmcm9tICcuL0EuanN4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVhZGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0cmVuZGVyKCkge1xuXHRcdGxldCBwbGF5QnV0dG9uQ2xhc3M9XCJoZWFkZXItYnV0dG9uIHRleHQtd2hpdGUgXCI7XG5cdFx0aWYgKHRoaXMuY29udGV4dC5wbGF5aW5nKVxuXHRcdFx0cGxheUJ1dHRvbkNsYXNzKz1cImFjdGl2ZVwiO1xuXG5cdFx0bGV0IHJlY29yZEJ1dHRvbkNsYXNzPVwiaGVhZGVyLWJ1dHRvbiB0ZXh0LXdoaXRlIFwiO1xuXHRcdGlmICh0aGlzLmNvbnRleHQucmVjb3JkaW5nKVxuXHRcdFx0cmVjb3JkQnV0dG9uQ2xhc3MrPVwiYWN0aXZlXCI7XG5cblx0XHRsZXQgaXRlbXM9W107XG5cdFx0aWYgKHRoaXMuY29udGV4dC5pc1NvbmdPcGVuKCkpIHtcblx0XHRcdGl0ZW1zLnB1c2goXG5cdFx0XHRcdDxBIGNsYXNzPVwiaGVhZGVyLWJ1dHRvbiB0ZXh0LXdoaXRlXCJcblx0XHRcdFx0XHRcdG9uUmVsZWFzZT17dGhpcy5jb250ZXh0LmdvQmFja30+XG5cdFx0XHRcdFx0PGltZyBzcmM9XCJpbWcvYXJyb3ctbGVmdC5zdmdcIi8+XG5cdFx0XHRcdDwvQT5cblx0XHRcdCk7XG5cblx0XHRcdGlmICh0aGlzLmNvbnRleHQuY3VycmVudExheWVySW5kZXg+PTApXG5cdFx0XHRcdGl0ZW1zLnB1c2goXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cImhlYWRlci1idXR0b24gdGV4dC13aGl0ZVwiPlxuXHRcdFx0XHRcdFx0PGltZyBzcmM9e1wiaW1nL1wiK3RoaXMuY29udGV4dC5nZXRJbnN0cnVtZW50QnlOYW1lKHRoaXMuY29udGV4dC5nZXRDdXJyZW50TGF5ZXIoKS5pbnN0cnVtZW50TmFtZSkuaWNvbn0vPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQpO1xuXG5cdFx0XHRpdGVtcy5wdXNoKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiaGVhZGVyLXRleHQgdGV4dC13aGl0ZVwiPlxuXHRcdFx0XHRcdHt0aGlzLmNvbnRleHQuZ2V0Q3VycmVudFNvbmcoKS5uYW1lfVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdCk7XG5cblx0XHRcdGl0ZW1zLnB1c2goXG5cdFx0XHRcdDxBIGNsYXNzPXtwbGF5QnV0dG9uQ2xhc3N9XG5cdFx0XHRcdFx0XHRvblByZXNzPXt0aGlzLmNvbnRleHQucGxheUNsaWNrfT5cblx0XHRcdFx0XHQ8aW1nIHNyYz1cImltZy9wbGF5LWZpbGwuc3ZnXCIvPlxuXHRcdFx0XHQ8L0E+XG5cdFx0XHQpO1xuXG5cdFx0XHRpZiAodGhpcy5jb250ZXh0LmN1cnJlbnRMYXllckluZGV4Pj0wKSBcblx0XHRcdFx0aXRlbXMucHVzaChcblx0XHRcdFx0XHQ8QSBjbGFzcz17cmVjb3JkQnV0dG9uQ2xhc3N9XG5cdFx0XHRcdFx0XHRcdG9uUHJlc3M9e3RoaXMuY29udGV4dC5yZWNvcmRDbGlja30+XG5cdFx0XHRcdFx0XHQ8aW1nIHNyYz1cImltZy9jaXJjbGUtZmlsbC5zdmdcIi8+XG5cdFx0XHRcdFx0PC9BPlxuXHRcdFx0XHQpO1xuXG5cdFx0XHRpdGVtcy5wdXNoKFxuXHRcdFx0XHQ8QSBjbGFzcz1cImhlYWRlci1idXR0b24gdGV4dC13aGl0ZVwiXG5cdFx0XHRcdFx0XHRvblJlbGVhc2U9e3RoaXMuY29udGV4dC50b2dnbGVTZXR0aW5nc30+XG5cdFx0XHRcdFx0PGltZyBzcmM9XCJpbWcvZ2Vhci1maWxsLnN2Z1wiLz5cblx0XHRcdFx0PC9BPlxuXHRcdFx0KTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRpdGVtcy5wdXNoKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiaGVhZGVyLXRleHQgdGV4dC13aGl0ZVwiPkhvb2Rtb2RlPC9kaXY+XG5cdFx0XHQpO1xuXG5cdFx0XHRpdGVtcy5wdXNoKFxuXHRcdFx0XHQ8QSBjbGFzcz1cImhlYWRlci1idXR0b24gdGV4dC13aGl0ZVwiXG5cdFx0XHRcdFx0b25SZWxlYXNlPXt0aGlzLmNvbnRleHQuc2hvd0Fib3V0U2NyZWVufT5cblx0XHRcdFx0XHQ8aW1nIHNyYz1cImltZy9pbmZvLWljb24uc3ZnXCIvPlxuXHRcdFx0XHQ8L0E+XG5cdFx0XHQpO1xuXHRcdH1cblxuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3M9XCJoZWFkZXIgYm94IGJnLWRhcmtcIj5cblx0XHRcdFx0e2l0ZW1zfVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSIsImltcG9ydCB7IGgsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgQSBmcm9tICcuL0EuanN4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGF5ZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRvbktleURvd249KGUpPT57XG5cdFx0aWYgKGUudGFyZ2V0Lm5vZGVOYW1lPT1cIklOUFVUXCIpXG5cdFx0XHRyZXR1cm47XG5cblx0XHRsZXQgaz1wYXJzZUludChlLmtleSktMTtcblx0XHRpZiAoaz49MClcblx0XHRcdHRoaXMuY29udGV4dC5zb3VuZEJ1dHRvbkNsaWNrKGspO1xuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIix0aGlzLm9uS2V5RG93bik7XG5cdH1cblxuXHRjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcblx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLHRoaXMub25LZXlEb3duKTtcblx0fVxuXG5cdHJlbmRlclNvdW5kU3ltYm9scygpIHtcblx0XHRsZXQgaW5zdHJ1bWVudD10aGlzLmNvbnRleHQuZ2V0Q3VycmVudEluc3RydW1lbnQoKTtcblx0XHRsZXQgbGF5ZXI9dGhpcy5jb250ZXh0LmdldEN1cnJlbnRMYXllcigpO1xuXHRcdGxldCBidXR0b25zPW5ldyBBcnJheSgxNikuZmlsbCg8ZGl2IGNsYXNzPVwiYm94IHctMVwiLz4pO1xuXHRcdGxldCBudW1Tb3VuZHM9dGhpcy5jb250ZXh0LmdldEluc3RydW1lbnROdW1Tb3VuZHNCeU5hbWUoaW5zdHJ1bWVudC5uYW1lKTtcblxuXHRcdGZvciAobGV0IGk9MDsgaTw5OyBpKyspIHtcblx0XHRcdGxldCBidXR0b25JbmRleD04LTQqTWF0aC5mbG9vcihpLzMpK2klMztcblx0XHRcdGlmIChpPG51bVNvdW5kcykge1xuXHRcdFx0XHRsZXQgYnV0dG9uQ2xhc3M9XCJib3ggdy0xIGJnLXByaW1hcnkgdGV4dC13aGl0ZSBcIjtcblxuXHRcdFx0XHRpZiAodGhpcy5jb250ZXh0LmN1cnJlbnRHcmlkSW5kZXg+PTAgJiZcblx0XHRcdFx0XHRcdGxheWVyLnNlcVt0aGlzLmNvbnRleHQuY3VycmVudEdyaWRJbmRleF0uc291bmRzLmluY2x1ZGVzKGkpKVxuXHRcdFx0XHRcdGJ1dHRvbkNsYXNzKz1cImFjdGl2ZVwiXG5cblx0XHRcdFx0bGV0IGJ1dHRvbkljb247XG5cdFx0XHRcdGlmIChpbnN0cnVtZW50LnR5cGU9PVwicGVyY3Vzc2l2ZVwiKVxuXHRcdFx0XHRcdGJ1dHRvbkljb249XCJpbWcvXCIraW5zdHJ1bWVudC5pY29uc1tpXTtcblxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0YnV0dG9uSWNvbj1cImltZy9obm90ZS1cIisoMSsyKihpJTMpKStcIi5zdmdcIjtcblxuXHRcdFx0XHRidXR0b25zW2J1dHRvbkluZGV4XT1cblx0XHRcdFx0XHQ8QSBjbGFzcz17YnV0dG9uQ2xhc3N9XG5cdFx0XHRcdFx0XHRcdG9uUHJlc3M9e3RoaXMuY29udGV4dC5zb3VuZEJ1dHRvbkNsaWNrLmJpbmQobnVsbCxpKX0+XG5cdFx0XHRcdFx0XHQ8aW1nIHNyYz17YnV0dG9uSWNvbn0vPlxuXHRcdFx0XHRcdDwvQT5cblx0XHRcdH1cblxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGJ1dHRvbnNbYnV0dG9uSW5kZXhdPVxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJib3ggdy0xIGJnLXByaW1hcnlcIi8+XG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRsZXQgY2xzPVwiYm94IHctMSBiZy13YXJuaW5nIHRleHQtd2hpdGUgXCI7XG5cdFx0aWYgKHRoaXMuY29udGV4dC5jdXJyZW50R3JpZEluZGV4Pj0wICYmXG5cdFx0XHRcdFx0bGF5ZXIuc2VxW3RoaXMuY29udGV4dC5jdXJyZW50R3JpZEluZGV4XS5zdGFjYylcblx0XHRcdGNscys9XCJhY3RpdmVcIjtcblxuXHRcdGJ1dHRvbnNbMTJdPShcblx0XHRcdDxBIGNsYXNzPXtjbHN9XG5cdFx0XHRcdFx0b25QcmVzcz17dGhpcy5jb250ZXh0LnRvZ2dsZUN1cnJlbnRMYXllclN0YWNjfT5cblx0XHRcdFx0PGltZyBzcmM9XCJpbWcvcmVzdC5zdmdcIi8+XG5cdFx0XHQ8L0E+XG5cdFx0KTtcblxuXHRcdGxldCBjdXJyZW50VmVsPW51bGw7XG5cdFx0aWYgKHRoaXMuY29udGV4dC5jdXJyZW50R3JpZEluZGV4Pj0wICYmXG5cdFx0XHRcdHRoaXMuY29udGV4dC5jdXJyZW50TGF5ZXJIYXNTb3VuZEF0KHRoaXMuY29udGV4dC5jdXJyZW50R3JpZEluZGV4KSlcblx0XHRcdGN1cnJlbnRWZWw9bGF5ZXIuc2VxW3RoaXMuY29udGV4dC5jdXJyZW50R3JpZEluZGV4XS52ZWw7XG5cblx0XHRsZXQgc2l6ZUNsYXNzZXM9W1widGlueVwiLFwic21hbGxcIixcIlwiXTtcblx0XHRsZXQgdmVscz1bMC4yNSwwLjUwLDFdO1xuXHRcdGZvciAobGV0IGk9MDsgaTwzOyBpKyspIHtcblx0XHRcdGxldCBjbHM9XCJib3ggdy0xIGJnLXdhcm5pbmcgdGV4dC13aGl0ZSBcIitzaXplQ2xhc3Nlc1tpXStcIiBcIjtcblxuXHRcdFx0aWYgKGN1cnJlbnRWZWw9PXZlbHNbaV0pXG5cdFx0XHRcdGNscys9XCJhY3RpdmVcIjtcblxuXHRcdFx0YnV0dG9uc1sxMytpXT0oXG5cdFx0XHRcdDxBIGNsYXNzPXtjbHN9XG5cdFx0XHRcdFx0XHRocmVmPVwiI1wiXG5cdFx0XHRcdFx0XHRvblByZXNzPXt0aGlzLmNvbnRleHQuc2V0Q3VycmVudExheWVyVmVsLmJpbmQobnVsbCx2ZWxzW2ldKX0+XG5cdFx0XHRcdFx0PGltZyBzcmM9XCJpbWcvbm90ZS5zdmdcIi8+XG5cdFx0XHRcdDwvQT5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKGluc3RydW1lbnQudHlwZT09XCJoYXJtb25pY1wiKSB7XG5cdFx0XHRmb3IgKGxldCBvY3RhdmUgb2YgWzAsMSwyXSkge1xuXHRcdFx0XHRsZXQgY2xzPVwiYm94IHctMSBiZy1pbmZvIHRleHQtd2hpdGUgXCI7XG5cdFx0XHRcdGlmICh0aGlzLmNvbnRleHQuY3VycmVudEdyaWRJbmRleD49MCAmJlxuXHRcdFx0XHRcdFx0dGhpcy5jb250ZXh0LmN1cnJlbnRMYXllckhhc0Nob3JkQXQodGhpcy5jb250ZXh0LmN1cnJlbnRHcmlkSW5kZXgsb2N0YXZlKSlcblx0XHRcdFx0XHRjbHMrPVwiYWN0aXZlXCI7XG5cblx0XHRcdFx0YnV0dG9uc1sxMS1vY3RhdmUqNF09KFxuXHRcdFx0XHRcdDxBIGNsYXNzPXtjbHN9XG5cdFx0XHRcdFx0XHRcdGhyZWY9XCIjXCJcblx0XHRcdFx0XHRcdFx0b25QcmVzcz17dGhpcy5jb250ZXh0LmNob3JkQnV0dG9uQ2xpY2suYmluZChudWxsLG9jdGF2ZSl9PlxuXHRcdFx0XHRcdFx0PGltZyBzcmM9XCJpbWcvaG5vdGUtY2hvcmQuc3ZnXCIvPlxuXHRcdFx0XHRcdDwvQT5cblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gYnV0dG9ucztcblx0fVxuXG5cdHJlbmRlclNlcXVlbmNlKCkge1xuXHRcdGxldCBsYXllcj10aGlzLmNvbnRleHQuZ2V0Q3VycmVudExheWVyKCk7XG5cdFx0bGV0IHJlcz1bXTtcblx0XHRsZXQgdmVsQ2xzPXtcblx0XHRcdDAuMjU6IFwidGlueVwiLFxuXHRcdFx0MC41OiBcInNtYWxsXCIsXG5cdFx0XHQxOiBcIlwiXG5cdFx0fTtcblxuXHRcdGZvciAobGV0IGdyaWRJbmRleD0wOyBncmlkSW5kZXg8MTY7IGdyaWRJbmRleCsrKSB7XG5cdFx0XHRsZXQgY2xzPVwiYm94IHctMSBiZWF0LWdyaWQgYmVhdC1cIitncmlkSW5kZXgrXCIgXCI7XG5cblx0XHRcdGlmIChncmlkSW5kZXg9PXRoaXMuY29udGV4dC5jdXJyZW50R3JpZEluZGV4KVxuXHRcdFx0XHRjbHMrPVwiYmctbGlnaHQgXCI7XG5cblx0XHRcdGVsc2Vcblx0XHRcdFx0Y2xzKz1cImJnLWJsYWNrIHRleHQtd2hpdGUgXCI7XG5cblx0XHRcdGxldCBpY29uPW51bGw7XG5cdFx0XHRpZiAobGF5ZXIuc2VxW2dyaWRJbmRleF0uc3RhY2MpXG5cdFx0XHRcdGljb249PGltZyBzcmM9XCJpbWcvcmVzdC5zdmdcIi8+O1xuXG5cdFx0XHRlbHNlIGlmICh0aGlzLmNvbnRleHQuY3VycmVudExheWVySGFzU291bmRBdChncmlkSW5kZXgpKSB7XG5cdFx0XHRcdGljb249PGltZyBzcmM9XCJpbWcvbm90ZS5zdmdcIi8+O1xuXHRcdFx0XHRjbHMrPXZlbENsc1tsYXllci5zZXFbZ3JpZEluZGV4XS52ZWxdO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXMucHVzaChcblx0XHRcdFx0PEEgY2xhc3M9e2Nsc31cblx0XHRcdFx0XHRcdG9uUHJlc3M9e3RoaXMuY29udGV4dC5ncmlkSW5kZXhDbGljay5iaW5kKG51bGwsZ3JpZEluZGV4KX0+XG5cdFx0XHRcdFx0e2ljb259XG5cdFx0XHRcdDwvQT5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlcztcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRsZXQgbGF5ZXI9dGhpcy5jb250ZXh0LmdldEN1cnJlbnRMYXllcigpO1xuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lLWNvbnRhaW5lciByZXYtcG9ydHJhaXRcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInBhbmUgYm94IGJvcmRlciBib3JkZXItZGFya1wiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lLWhlYWRlciB0ZXh0LXNlY29uZGFyeSBiZy1kYXJrXCI+U09VTkRTPC9kaXY+XG5cdFx0XHRcdFx0e3RoaXMucmVuZGVyU291bmRTeW1ib2xzKCl9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZSBib3ggYmctZGFya1wiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lLWhlYWRlciB0ZXh0LXNlY29uZGFyeSBiZy1kYXJrXCI+U0VRVUVOQ0U8L2Rpdj5cblx0XHRcdFx0XHR7dGhpcy5yZW5kZXJTZXF1ZW5jZSgpfVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbiIsImltcG9ydCB7IGgsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgQSBmcm9tICcuL0EuanN4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGF5ZXJTZXR0aW5ncyB7XG5cdHJlbmRlcigpIHtcblx0XHRsZXQgaW5zdHJ1bWVudD10aGlzLmNvbnRleHQuZ2V0Q3VycmVudEluc3RydW1lbnQoKTtcblx0XHRsZXQgbGF5ZXI9dGhpcy5jb250ZXh0LmdldEN1cnJlbnRMYXllcigpO1xuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lLWNvbnRhaW5lclwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYm94IHBhbmUgZG91YmxlIGJnLWRhcmtcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZS1oZWFkZXIgYmctZGFyayB0ZXh0LXNlY29uZGFyeVwiPkxBWUVSIFNFVFRJTkdTPC9kaXY+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cImJveCB3LTQgZWwgdGV4dC13aGl0ZVwiPlxuXHRcdFx0XHRcdFx0PGltZyBzcmM9e1wiaW1nL1wiK2luc3RydW1lbnQuaWNvbn0vPlxuXHRcdFx0XHRcdFx0e2luc3RydW1lbnQubmFtZX1cblx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdDxici8+PGJyLz5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuXHRcdFx0XHRcdFx0Vm9sdW1lPGJyLz5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJib3ggYm9yZGVyIGJnLXdoaXRlIGJvcmRlci1ibGFjayB0ZXh0LWJsYWNrIHctNFwiPlxuXHRcdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cInJhbmdlXCIgbWluPVwiMFwiIG1heD1cIjFcIiBzdGVwPVwiMC4wMVwiXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU9e2xheWVyLnZvbHVtZX1cblx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5jb250ZXh0LnNldEN1cnJlbnRMYXllclZvbHVtZX1cblx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cImZvcm0tYnV0dG9uc1wiPlxuXHRcdFx0XHRcdFx0PEEgY2xhc3M9XCJib3ggYmctZGFuZ2VyIHRleHQtd2hpdGVcIlxuXHRcdFx0XHRcdFx0XHRcdG9uUmVsZWFzZT17dGhpcy5jb250ZXh0LmRlbGV0ZUN1cnJlbnRMYXllcn0+XG5cdFx0XHRcdFx0XHRcdFJlbW92ZSBMYXllclxuXHRcdFx0XHRcdFx0PC9BPlxuXHRcdFx0XHRcdFx0PEEgY2xhc3M9XCJib3ggYmctcHJpbWFyeSBmb3JtLWJ1dHRvbiB0ZXh0LXdoaXRlXCJcblx0XHRcdFx0XHRcdFx0XHRvblJlbGVhc2U9e3RoaXMuY29udGV4dC50b2dnbGVTZXR0aW5nc30+XG5cdFx0XHRcdFx0XHRcdENsb3NlXG5cdFx0XHRcdFx0XHQ8L0E+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuIiwiaW1wb3J0IHsgaCwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCBBIGZyb20gJy4vQS5qc3gnO1xuaW1wb3J0IHsgU2VsZWN0LCBJRiB9IGZyb20gJy4uL3V0aWxzL1JlYWN0VXRpbC5qc3gnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWxlY3RDaG9yZCBleHRlbmRzIENvbXBvbmVudCB7XG5cdHJlbmRlcigpIHtcblx0XHRsZXQgc29uZz10aGlzLmNvbnRleHQuZ2V0Q3VycmVudFNvbmcoKTtcblx0XHRsZXQgc2VjdGlvbj1zb25nLnNlY3Rpb25zW3RoaXMuY29udGV4dC5jdXJyZW50U2VjdGlvbkluZGV4XTtcblx0XHRsZXQgY3VycmVudENob3JkSW5kZXg9c2VjdGlvblt0aGlzLmNvbnRleHQuZWRpdFNlY3Rpb25DaG9yZFZpc2libGVdO1xuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbC1jb250YWluZXJcIiBvbkNsaWNrPXt0aGlzLmNvbnRleHQuaGlkZUVkaXRTZWN0aW9uQ2hvcmR9PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYm94IGJvcmRlciBib3JkZXItZGFyayBiZy1iYWNrZ3JvdW5kIHNlbGVjdC1jaG9yZFwiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lLWhlYWRlciB0ZXh0LXNlY29uZGFyeSBiZy1kYXJrIFwiPkVESVQgQ0hPUkQ8L2Rpdj5cblx0XHRcdFx0XHQ8aHIgY2xhc3M9XCJwYW5lLWRpdmlkZXIgZm91clwiLz5cblx0XHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdFx0e3RoaXMuY29udGV4dC5nZXRDaG9yZExhYmVscygpLm1hcCgobGFiZWwsIGluZGV4KT0+e1xuXHRcdFx0XHRcdFx0XHRsZXQgY2xzPVwiYm94IHctMSBiZy1zdWNjZXNzIHRleHQtbGlnaHQgY2hvcmQgXCI7XG5cdFx0XHRcdFx0XHRcdGlmIChpbmRleD09Y3VycmVudENob3JkSW5kZXgpXG5cdFx0XHRcdFx0XHRcdFx0Y2xzKz1cImFjdGl2ZVwiO1xuXG5cdFx0XHRcdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0XHRcdFx0PEEgY2xhc3M9e2Nsc31cblx0XHRcdFx0XHRcdFx0XHRcdFx0b25SZWxlYXNlPXt0aGlzLmNvbnRleHQuZWRpdFNlY3Rpb25DaG9yZC5iaW5kKG51bGwsaW5kZXgpfT5cblx0XHRcdFx0XHRcdFx0XHRcdHtsYWJlbH1cblx0XHRcdFx0XHRcdFx0XHQ8L0E+XG5cdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdH0pfVxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdHtJRihzZWN0aW9uLmxlbmd0aD4xLCgpPT5cblx0XHRcdFx0XHRcdDxBIGNsYXNzPVwiYm94IGJnLWRhbmdlciB3LTEgdGV4dC13aGl0ZVwiXG5cdFx0XHRcdFx0XHRcdFx0aHJlZj1cIiNcIlxuXHRcdFx0XHRcdFx0XHRcdG9uUmVsZWFzZT17dGhpcy5jb250ZXh0LnJlbW92ZVNlY3Rpb25DaG9yZH0+XG5cdFx0XHRcdFx0XHRcdDxpbWcgc3JjPVwiaW1nL3RyYXNoLnN2Z1wiLz5cblx0XHRcdFx0XHRcdDwvQT5cblx0XHRcdFx0XHQpfVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbiIsImltcG9ydCB7IGgsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgU29uZ0xheWVycyBmcm9tICcuL1NvbmdMYXllcnMuanN4JztcbmltcG9ydCBTb25nQ2hvcmRzIGZyb20gJy4vU29uZ0Nob3Jkcy5qc3gnO1xuaW1wb3J0IEEgZnJvbSAnLi9BLmpzeCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNvbmcgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lLWNvbnRhaW5lclwiPlxuXHRcdFx0XHQ8U29uZ0xheWVycyAvPlxuXHRcdFx0XHQ8U29uZ0Nob3JkcyAvPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuIiwiaW1wb3J0IHsgaCwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCBTZWxlY3RDaG9yZCBmcm9tICcuL1NlbGVjdENob3JkLmpzeCc7XG5pbXBvcnQgeyBTZWxlY3QsIElGIH0gZnJvbSAnLi4vdXRpbHMvUmVhY3RVdGlsLmpzeCc7XG5pbXBvcnQgQSBmcm9tICcuL0EuanN4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU29uZ0Nob3JkcyBleHRlbmRzIENvbXBvbmVudCB7XG5cdHJlbmRlckNvbmR1Y3RvckNob3JkcygpIHtcblx0XHRyZXR1cm4gdGhpcy5jb250ZXh0LmdldENob3JkTGFiZWxzKCkubWFwKChsYWJlbCwgaW5kZXgpPT57XG5cdFx0XHRsZXQgY2xzPVwiYm94IHctMSBiZy1zdWNjZXNzIHRleHQtbGlnaHQgY2hvcmQgXCI7XG5cdFx0XHRpZiAoaW5kZXg9PXRoaXMuY29udGV4dC5jdXJyZW50Q2hvcmRJbmRleClcblx0XHRcdFx0Y2xzKz1cIiBhY3RpdmUgYmVhdC0wIGJlYXQtNCBiZWF0LTggYmVhdC0xMlwiO1xuXG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8QSBjbGFzcz17Y2xzfVxuXHRcdFx0XHRcdFx0b25QcmVzcz17dGhpcy5jb250ZXh0LnNldEN1cnJlbnRDaG9yZEluZGV4LmJpbmQobnVsbCxpbmRleCl9PlxuXHRcdFx0XHRcdHtsYWJlbH1cblx0XHRcdFx0PC9BPlxuXHRcdFx0KVxuXHRcdH0pO1xuXHR9XG5cblx0cmVuZGVyU2VjdGlvbkNob3JkcygpIHtcblx0XHRsZXQgYT10aGlzLmNvbnRleHQuZ2V0Q3VycmVudFNlY3Rpb25DaG9yZExhYmVscygpLm1hcCgobGFiZWwsIGluZGV4KT0+e1xuXHRcdFx0bGV0IGNscz1cImJveCB3LTEgYmctc3VjY2VzcyB0ZXh0LWxpZ2h0IHNlY3Rpb24tY2hvcmQgc2VxdWVuY2UtXCIraW5kZXg7XG5cblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxBIGNsYXNzPXtjbHN9XG5cdFx0XHRcdFx0XHRvblJlbGVhc2U9e3RoaXMuY29udGV4dC5zaG93RWRpdFNlY3Rpb25DaG9yZC5iaW5kKG51bGwsaW5kZXgpfT5cblx0XHRcdFx0XHR7bGFiZWx9XG5cdFx0XHRcdDwvQT5cblx0XHRcdCk7XG5cdFx0fSk7XG5cblx0XHRhLnB1c2goXG5cdFx0XHQ8QSBjbGFzcz1cImJveCBib3JkZXIgYm9yZGVyLXdoaXRlIHRleHQtd2hpdGUgdy0xXCJcblx0XHRcdFx0XHRvblJlbGVhc2U9e3RoaXMuY29udGV4dC5hZGRTZWN0aW9uQ2hvcmR9PlxuXHRcdFx0XHQrXG5cdFx0XHQ8L0E+XG5cdFx0KTtcblxuXHRcdHJldHVybiBhO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdGxldCBzb25nPXRoaXMuY29udGV4dC5nZXRDdXJyZW50U29uZygpO1xuXG5cdFx0bGV0IGNob3JkTGFiZWxzO1xuXHRcdGlmICh0aGlzLmNvbnRleHQuY3VycmVudFNlY3Rpb25JbmRleD09LTEpXG5cdFx0XHRjaG9yZExhYmVscz10aGlzLnJlbmRlckNvbmR1Y3RvckNob3JkcygpO1xuXG5cdFx0ZWxzZVxuXHRcdFx0Y2hvcmRMYWJlbHM9dGhpcy5yZW5kZXJTZWN0aW9uQ2hvcmRzKCk7XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzcz1cInBhbmUgYm94IGJvcmRlciBib3JkZXItZGFya1wiPlxuXHRcdFx0XHQ8aHIgY2xhc3M9XCJwYW5lLWRpdmlkZXJcIi8+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lLWhlYWRlciB0ZXh0LXNlY29uZGFyeSBiZy1kYXJrIFwiPkNIT1JEUzwvZGl2PlxuXHRcdFx0XHQ8ZGl2IHN0eWxlPXt7aGVpZ2h0OiAnNmVtJ319PntjaG9yZExhYmVsc308L2Rpdj5cblx0XHRcdFx0PEEgY2xhc3M9e1wiYm94IHctMSBiZy1zZWNvbmRhcnkgdGV4dC13aGl0ZSBcIitcblx0XHRcdFx0XHRcdFx0KCh0aGlzLmNvbnRleHQuY3VycmVudFNlY3Rpb25JbmRleD09LTEpP1wiYWN0aXZlXCI6XCJcIil9XG5cdFx0XHRcdFx0XHRvblByZXNzPXt0aGlzLmNvbnRleHQuc2V0Q3VycmVudFNlY3Rpb25JbmRleC5iaW5kKG51bGwsLTEpfT5cblx0XHRcdFx0XHQ8aW1nIHNyYz1cImltZy9jb25kdWN0b3Iuc3ZnXCIvPlxuXHRcdFx0XHQ8L0E+XG5cdFx0XHRcdHtbXCJBXCIsXCJCXCIsXCJDXCJdLm1hcCgobGV0dGVyLCBpbmRleCk9Pntcblx0XHRcdFx0XHRsZXQgY2xzPVwiYm94IHctMSBiZy1wcmltYXJ5IHRleHQtd2hpdGUgXCI7XG5cdFx0XHRcdFx0aWYgKGluZGV4PT10aGlzLmNvbnRleHQuY3VycmVudFNlY3Rpb25JbmRleClcblx0XHRcdFx0XHRcdGNscys9XCJhY3RpdmVcIjtcblxuXHRcdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0XHQ8QSBjbGFzcz17Y2xzfVxuXHRcdFx0XHRcdFx0XHRcdG9uUHJlc3M9e3RoaXMuY29udGV4dC5zZXRDdXJyZW50U2VjdGlvbkluZGV4LmJpbmQobnVsbCxpbmRleCl9PlxuXHRcdFx0XHRcdFx0XHR7bGV0dGVyfVxuXHRcdFx0XHRcdFx0PC9BPlxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH0pfVxuXHRcdFx0XHR7SUYodGhpcy5jb250ZXh0LmVkaXRTZWN0aW9uQ2hvcmRWaXNpYmxlPj0wLCgpPT5cblx0XHRcdFx0XHQ8U2VsZWN0Q2hvcmQgLz5cblx0XHRcdFx0KX1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbiIsImltcG9ydCB7IGgsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgQSBmcm9tICcuL0EuanN4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU29uZ0xheWVycyBleHRlbmRzIENvbXBvbmVudCB7XG5cdHJlbmRlcigpIHtcblx0XHRsZXQgc29uZz10aGlzLmNvbnRleHQuZ2V0Q3VycmVudFNvbmcoKTtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZSBib3ggYm9yZGVyIGJvcmRlci1kYXJrXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lLWhlYWRlciB0ZXh0LXNlY29uZGFyeVwiPkxBWUVSUzwvZGl2PlxuXHRcdFx0XHR7c29uZy5sYXllcnMubWFwKChsYXllcixpbmRleCk9Pntcblx0XHRcdFx0XHRsZXQgY2xzPVwiYm94IGJnLWRhbmdlciB0ZXh0LXdoaXRlIHctMiBsYXllci1idXR0b24tXCIraW5kZXgrXCIgXCI7XG5cdFx0XHRcdFx0bGV0IGljb249XCJpbWcvdG9nZ2xlLW9uLnN2Z1wiO1xuXG5cdFx0XHRcdFx0aWYgKCFsYXllci5hdWRpYmxlKSB7XG5cdFx0XHRcdFx0XHRpY29uPVwiaW1nL3RvZ2dsZS1vZmYuc3ZnXCI7XG5cdFx0XHRcdFx0XHRjbHMrPVwiZmFkZWRcIjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdFx0PEEgY2xhc3M9e2Nsc31cblx0XHRcdFx0XHRcdFx0b25SZWxlYXNlPXt0aGlzLmNvbnRleHQuc2V0TGF5ZXJJbmRleC5iaW5kKG51bGwsaW5kZXgpfT5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImxheWVyLWljb25cIj5cblx0XHRcdFx0XHRcdFx0XHQ8aW1nIHNyYz17XCJpbWcvXCIrdGhpcy5jb250ZXh0LmdldEluc3RydW1lbnRCeU5hbWUobGF5ZXIuaW5zdHJ1bWVudE5hbWUpLmljb259Lz5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxBIGNsYXNzPVwibGF5ZXItaWNvblwiXG5cdFx0XHRcdFx0XHRcdFx0b25QcmVzcz17dGhpcy5jb250ZXh0LnRvZ2dsZUxheWVyQXVkaWJsZS5iaW5kKG51bGwsaW5kZXgpfT5cblx0XHRcdFx0XHRcdFx0XHQ8aW1nIHNyYz17aWNvbn0vPlxuXHRcdFx0XHRcdFx0XHQ8L0E+XG5cdFx0XHRcdFx0XHQ8L0E+XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSl9XG5cblx0XHRcdFx0PEEgY2xhc3M9XCJib3ggYm9yZGVyIGJvcmRlci13aGl0ZSB0ZXh0LXdoaXRlIHctMVwiXG5cdFx0XHRcdFx0XHRocmVmPVwiI1wiXG5cdFx0XHRcdFx0XHRvblJlbGVhc2U9e3RoaXMuY29udGV4dC5zaG93QWRkTGF5ZXJ9PlxuXHRcdFx0XHRcdCtcblx0XHRcdFx0PC9BPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuIiwiaW1wb3J0IHsgaCwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCB7IFNlbGVjdCwgSUYgfSBmcm9tICcuLi91dGlscy9SZWFjdFV0aWwuanN4JztcbmltcG9ydCBBIGZyb20gJy4vQS5qc3gnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTb25nU2V0dGluZ3Mge1xuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lLWNvbnRhaW5lclwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZSBib3ggZG91YmxlIGJnLWRhcmtcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZS1oZWFkZXIgYmctZGFyayB0ZXh0LXNlY29uZGFyeVwiPlNPTkcgU0VUVElOR1M8L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cblx0XHRcdFx0XHRcdFNvbmcgTmFtZTxici8+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYm94IGJvcmRlciBiZy13aGl0ZSBib3JkZXItYmxhY2sgdGV4dC1ibGFjayB3LTRcIj5cblx0XHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJ0ZXh0XCJcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17dGhpcy5jb250ZXh0LmdldEN1cnJlbnRTb25nKCkubmFtZX1cblx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5jb250ZXh0LnNldEN1cnJlbnRTb25nTmFtZX0vPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cblx0XHRcdFx0XHRcdFRlbXBvPGJyLz5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJib3ggYm9yZGVyIGJnLXdoaXRlIGJvcmRlci1ibGFjayB0ZXh0LWJsYWNrIHctNFwiPlxuXHRcdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cInRleHRcIlxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlPXt0aGlzLmNvbnRleHQuZ2V0Q3VycmVudFNvbmcoKS5icG19XG5cdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuY29udGV4dC5zZXRDdXJyZW50U29uZ0JwbX0vPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cblx0XHRcdFx0XHRcdEtleTxici8+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYm94IGJvcmRlciBiZy13aGl0ZSBib3JkZXItYmxhY2sgdGV4dC1ibGFjayB3LTJcIj5cblx0XHRcdFx0XHRcdFx0PFNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbCBjb2wtMlwiXG5cdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zPXt0aGlzLmNvbnRleHQuZ2V0Tm90ZXNTZWxlY3RPcHRpb25zKCl9XG5cdFx0XHRcdFx0XHRcdFx0XHRzZWxlY3RlZD17dGhpcy5jb250ZXh0LmdldEN1cnJlbnRTb25nKCkubXVzaWNLZXl9XG5cdFx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5jb250ZXh0LnNldEN1cnJlbnRTb25nTXVzaWNLZXl9Lz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImJveCBib3JkZXIgYmctd2hpdGUgYm9yZGVyLWJsYWNrIHRleHQtYmxhY2sgdy0yXCI+XG5cdFx0XHRcdFx0XHRcdDxTZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2wgY29sLTRcIlxuXHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucz17dGhpcy5jb250ZXh0LmdldE1vZGFsU2VsZWN0T3B0aW9ucygpfVxuXHRcdFx0XHRcdFx0XHRcdFx0c2VsZWN0ZWQ9e3RoaXMuY29udGV4dC5nZXRDdXJyZW50U29uZygpLm1pbm9yfVxuXHRcdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuY29udGV4dC5zZXRDdXJyZW50U29uZ01pbm9yfS8+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJmb3JtLWJ1dHRvbnNcIj5cblx0XHRcdFx0XHRcdDxBIGNsYXNzPVwiYmctZGFuZ2VyIGJveCB0ZXh0LXdoaXRlXCJcblx0XHRcdFx0XHRcdFx0XHRocmVmPVwiI1wiXG5cdFx0XHRcdFx0XHRcdFx0b25SZWxlYXNlPXt0aGlzLmNvbnRleHQuZGVsZXRlQ3VycmVudFNvbmd9PlxuXHRcdFx0XHRcdFx0XHRSZW1vdmUgU29uZ1xuXHRcdFx0XHRcdFx0PC9BPlxuXHRcdFx0XHRcdFx0PEEgY2xhc3M9XCJiZy1wcmltYXJ5IGJveCB0ZXh0LXdoaXRlXCJcblx0XHRcdFx0XHRcdFx0XHRocmVmPVwiI1wiXG5cdFx0XHRcdFx0XHRcdFx0b25SZWxlYXNlPXt0aGlzLmNvbnRleHQudG9nZ2xlU2V0dGluZ3N9PlxuXHRcdFx0XHRcdFx0XHRDbG9zZVxuXHRcdFx0XHRcdFx0PC9BPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbiIsImltcG9ydCB7IGgsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyBTZWxlY3QsIElGIH0gZnJvbSAnLi4vdXRpbHMvUmVhY3RVdGlsLmpzeCc7XG5pbXBvcnQgQSBmcm9tICcuL0EuanN4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFwSGlnaGxpZ2h0IGV4dGVuZHMgQ29tcG9uZW50IHtcblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG5cblx0XHR0aGlzLnN0YXRlPXtcblx0XHRcdHNob3dIaWdobGlnaHQ6IGZhbHNlXG5cdFx0fVxuXHR9XG5cblx0b25Db250ZXh0TWVudT0oZSk9Pntcblx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0c2hvd0hpZ2hsaWdodDogdHJ1ZVxuXHRcdH0pO1xuXG5cdFx0bGV0IHM9ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlO1xuXHRcdHMuc2V0UHJvcGVydHkoXCItLXRhcEhpZ2hsaWdodExlZnRcIixlLmNsaWVudFgrXCJweFwiKTtcblx0XHRzLnNldFByb3BlcnR5KFwiLS10YXBIaWdobGlnaHRUb3BcIixlLmNsaWVudFkrXCJweFwiKTtcblx0fTtcblxuXHRvbk1vdXNlVXA9KGUpPT57XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRzaG93SGlnaGxpZ2h0OiBmYWxzZVxuXHRcdH0pO1xuXHR9O1xuXG5cdGNvbXBvbmVudERpZE1vdW50KCkge1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLHRoaXMub25Db250ZXh0TWVudSk7XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIix0aGlzLm9uTW91c2VVcCk7XG5cdH1cblxuXHRjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcblx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIix0aGlzLm9uQ29udGV4dE1lbnUpO1xuXHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsdGhpcy5vbk1vdXNlVXApO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzPVwidGFwLWhpZ2hsaWdodFwiPlxuXHRcdFx0XHR7SUYodGhpcy5zdGF0ZS5zaG93SGlnaGxpZ2h0LCgpPT5cblx0XHRcdFx0XHQ8aW1nIHNyYz1cImltZy90YXAtaGlnaGxpZ2h0LnN2Z1wiLz5cblx0XHRcdFx0KX1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0iXX0=
