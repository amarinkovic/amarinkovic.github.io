(self.webpackChunkgatsby1=self.webpackChunkgatsby1||[]).push([[853],{7228:function(t){t.exports=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r},t.exports.__esModule=!0,t.exports.default=t.exports},3646:function(t,e,n){var r=n(7228);t.exports=function(t){if(Array.isArray(t))return r(t)},t.exports.__esModule=!0,t.exports.default=t.exports},9100:function(t,e,n){var r=n(9489),o=n(7067);function i(e,n,a){return o()?(t.exports=i=Reflect.construct,t.exports.__esModule=!0,t.exports.default=t.exports):(t.exports=i=function(t,e,n){var o=[null];o.push.apply(o,e);var i=new(Function.bind.apply(t,o));return n&&r(i,n.prototype),i},t.exports.__esModule=!0,t.exports.default=t.exports),i.apply(null,arguments)}t.exports=i,t.exports.__esModule=!0,t.exports.default=t.exports},9713:function(t){t.exports=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t},t.exports.__esModule=!0,t.exports.default=t.exports},7067:function(t){t.exports=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}},t.exports.__esModule=!0,t.exports.default=t.exports},6860:function(t){t.exports=function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)},t.exports.__esModule=!0,t.exports.default=t.exports},8206:function(t){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},t.exports.__esModule=!0,t.exports.default=t.exports},319:function(t,e,n){var r=n(3646),o=n(6860),i=n(379),a=n(8206);t.exports=function(t){return r(t)||o(t)||i(t)||a()},t.exports.__esModule=!0,t.exports.default=t.exports},379:function(t,e,n){var r=n(7228);t.exports=function(t,e){if(t){if("string"==typeof t)return r(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(t,e):void 0}},t.exports.__esModule=!0,t.exports.default=t.exports},1254:function(t,e,n){"use strict";var r=n(5318);e.__esModule=!0,e.default=void 0;var o=r(n(7154)),i=r(n(7316)),a=r(n(5354)),s=r(n(7294)),u=r(n(5697)),l=n(989),d=(0,l.debounce)((function(){window.DISQUSWIDGETS&&window.DISQUSWIDGETS.getCount({reset:!0})}),300,!1),c=function(t){function e(e){var n;return(n=t.call(this,e)||this).shortname="amarinkovic",n}(0,a.default)(e,t);var n=e.prototype;return n.componentDidMount=function(){this.loadInstance()},n.shouldComponentUpdate=function(t){return this.props!==t&&(0,l.shallowComparison)(this.props,t)},n.componentDidUpdate=function(){this.loadInstance()},n.componentWillUnmount=function(){this.cleanInstance()},n.loadInstance=function(){window.document.getElementById("dsq-count-scr")?d():(0,l.insertScript)("https://"+this.shortname+".disqus.com/count.js","dsq-count-scr",window.document.body)},n.cleanInstance=function(){(0,l.removeScript)("dsq-count-scr",window.document.body),window.DISQUSWIDGETS=void 0},n.render=function(){var t=this.props,e=t.config,n=t.className,r=t.placeholder,a=(0,i.default)(t,["config","className","placeholder"]),u="disqus-comment-count"+(n?" "+n:"");return s.default.createElement("span",(0,o.default)({className:u,"data-disqus-identifier":e.identifier,"data-disqus-url":e.url},a),r)},e}(s.default.Component);e.default=c,c.defaultProps={placeholder:"..."},c.propTypes={config:u.default.shape({identifier:u.default.string,title:u.default.string,url:u.default.string}),placeholder:u.default.string,className:u.default.string}},4294:function(t,e,n){"use strict";var r=n(5318);e.__esModule=!0,e.default=void 0;var o=r(n(7154)),i=r(n(7316)),a=r(n(5354)),s=r(n(7294)),u=r(n(5697)),l=function(t){function e(){return t.apply(this,arguments)||this}(0,a.default)(e,t);var n=e.prototype;return n.getSrc=function(){return"https://embed.disqus.com/p/"+Number(this.props.commentId).toString(36)+"?p="+(this.props.showParentComment?"1":"0")+"&m="+(this.props.showMedia?"1":"0")},n.render=function(){var t=this.props,e=(t.commentId,t.showMedia,t.showParentComment,(0,i.default)(t,["commentId","showMedia","showParentComment"]));return s.default.createElement("iframe",(0,o.default)({src:this.getSrc(),width:this.props.width,height:this.props.height,seamless:"seamless",scrolling:"no",frameBorder:"0",title:"embedded-comment"},e))},e}(s.default.Component);e.default=l,l.defaultProps={width:420,height:320,showMedia:!0,showParentComment:!0},l.propTypes={commentId:u.default.oneOfType([u.default.number,u.default.string]).isRequired,width:u.default.number,height:u.default.number,showMedia:u.default.bool,showParentComment:u.default.bool}},2605:function(t,e,n){"use strict";var r=n(5318);e.__esModule=!0,e.default=void 0;var o=r(n(7154)),i=r(n(7316)),a=r(n(5354)),s=r(n(7294)),u=r(n(5697)),l=n(989),d=function(t){function e(e){var n;return(n=t.call(this,e)||this).shortname="amarinkovic",n.embedUrl="https://"+n.shortname+".disqus.com/embed.js",n}(0,a.default)(e,t);var n=e.prototype;return n.componentDidMount=function(){this.loadInstance()},n.shouldComponentUpdate=function(t){return this.props!==t&&(0,l.shallowComparison)(this.props,t)},n.componentDidUpdate=function(){this.loadInstance()},n.componentWillUnmount=function(){this.cleanInstance()},n.getDisqusConfig=function(t){return function(){this.page.identifier=t.identifier,this.page.url=t.url,this.page.title=t.title,this.page.remote_auth_s3=t.remoteAuthS3,this.page.api_key=t.apiKey,this.language=t.language}},n.loadInstance=function(){"undefined"!=typeof window&&window.document&&(window.disqus_config=this.getDisqusConfig(this.props.config),window.document.getElementById("dsq-embed-scr")?this.reloadInstance():(0,l.insertScript)(this.embedUrl,"dsq-embed-scr",window.document.body))},n.reloadInstance=function(){window&&window.DISQUS&&window.DISQUS.reset({reload:!0})},n.cleanInstance=function(){(0,l.removeScript)("dsq-embed-scr",window.document.body);try{delete window.DISQUS}catch(r){window.DISQUS=void 0}var t=window.document.getElementById("disqus_thread");if(t)for(;t.hasChildNodes();)t.removeChild(t.firstChild);var e=window.document.querySelector('[id^="dsq-app"]');if(e){var n=window.document.getElementById(e.id);n.parentNode.removeChild(n)}},n.render=function(){var t=this.props,e=(t.config,(0,i.default)(t,["config"]));return s.default.createElement("div",(0,o.default)({id:"disqus_thread"},e))},e}(s.default.Component);e.default=d,d.propTypes={config:u.default.shape({identifier:u.default.string,title:u.default.string,url:u.default.string,language:u.default.string,remoteAuthS3:u.default.string,apiKey:u.default.string})}},8200:function(t,e,n){"use strict";var r=n(5318);var o=r(n(2605));e.h$=o.default,r(n(1254)).default,r(n(4294)).default,o.default},989:function(t,e,n){"use strict";var r=n(5318);e.__esModule=!0,e.insertScript=function(t,e,n){var r=window.document.createElement("script");return r.async=!0,r.src=t,r.id=e,n.appendChild(r),r},e.removeScript=function(t,e){var n=window.document.getElementById(t);n&&e.removeChild(n)},e.debounce=function(t,e,n){var r;return function(){for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];var s=this,u=function(){r=null,n||t.apply(s,i)},l=n&&!r;window.clearTimeout(r),r=setTimeout(u,e),l&&t.apply(s,i)}},e.isReactElement=a,e.shallowComparison=function t(e,n){var r,i=new Set(Object.keys(e).concat(Object.keys(n))),s=(r=[]).concat.apply(r,(0,o.default)(i)).filter((function(r){if("object"==typeof e[r]){if(t(e[r],n[r]))return!0}else if(e[r]!==n[r]&&!a(e[r]))return!0;return!1}));return 0!==s.length};var o=r(n(319)),i=r(n(7294));function a(t){return!!i.default.isValidElement(t)||!!Array.isArray(t)&&t.some((function(t){return i.default.isValidElement(t)}))}},7733:function(t,e,n){var r=n(8977);t.exports={MDXRenderer:r}},8977:function(t,e,n){var r=n(9100),o=n(319),i=n(9713),a=n(7316),s=["scope","children"];function u(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function l(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?u(Object(n),!0).forEach((function(e){i(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var d=n(7294),c=n(4983).mdx,f=n(2473).useMDXScope;t.exports=function(t){var e=t.scope,n=t.children,i=a(t,s),u=f(e),p=d.useMemo((function(){if(!n)return null;var t=l({React:d,mdx:c},u),e=Object.keys(t),i=e.map((function(e){return t[e]}));return r(Function,["_fn"].concat(o(e),[""+n])).apply(void 0,[{}].concat(o(i)))}),[n,e]);return d.createElement(p,l({},i))}},8285:function(t,e,n){"use strict";n.d(e,{Z:function(){return s}});n(7294);var r=n(1597),o="layout-module--nav-link-item--pfCo2",i="layout-module--nav-link-text--ac2nV",a=n(3431),s=function(t){var e=t.pageTitle,n=t.children,s=(0,r.K2)("3159585216");return(0,a.tZ)("div",{className:"layout-module--container--eLBMS"},(0,a.tZ)("title",{className:"layout-module--heading--8VjLO"},e," | ",s.site.siteMetadata.title),(0,a.tZ)("nav",null,(0,a.tZ)("ul",{className:"layout-module--nav-links--EROwB"},(0,a.tZ)("li",{className:o},(0,a.tZ)(r.rU,{to:"/",className:i},"Home")),(0,a.tZ)("li",{className:o},(0,a.tZ)(r.rU,{to:"/blog",className:i},"Blog")),(0,a.tZ)("li",{className:o},(0,a.tZ)(r.rU,{to:"/about",className:i},"About")))),(0,a.tZ)("main",null,(0,a.tZ)("h2",null,e),n))}},6649:function(t,e,n){"use strict";n.r(e);n(7294);var r=n(7733),o=n(4983),i=n(396),a=n(8285),s=n(8200),u=n(3431);e.default=function(t){var e=t.data,n=(0,i.d)(e.mdx.frontmatter.hero_image),l={url:e.site.siteMetadata.siteUrl+"/blog/"+e.mdx.slug,identifier:e.mdx.id,title:e.mdx.frontmatter.title};return(0,u.tZ)(a.Z,{pageTitle:e.mdx.frontmatter.title},(0,u.tZ)("p",null,"Posted: ",e.mdx.frontmatter.date),(0,u.tZ)(i.G,{image:n,alt:e.mdx.frontmatter.hero_image_alt}),(0,u.tZ)("p",null,(0,u.tZ)("em",null,"Photo Credit:"," ",(0,u.tZ)("a",{href:e.mdx.frontmatter.hero_image_credit_link},e.mdx.frontmatter.hero_image_credit_text))),(0,u.tZ)(o.MDXProvider,null,(0,u.tZ)(r.MDXRenderer,{localImages:e.mdx.frontmatter.embeddedImagesLocal},e.mdx.body)),(0,u.tZ)(s.h$,{config:l}))}}}]);
//# sourceMappingURL=component---src-pages-blog-mdx-slug-js-2f21d44984d547de7c4f.js.map