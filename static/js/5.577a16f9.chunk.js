(this["webpackJsonpreact-dianping"]=this["webpackJsonpreact-dianping"]||[]).push([[5],{126:function(e,t,a){},127:function(e,t,a){},128:function(e,t,a){},129:function(e,t,a){},130:function(e,t,a){},131:function(e,t,a){},132:function(e,t,a){},153:function(e,t,a){"use strict";a.r(t);var n=a(1),c=a(16),r=a(17),l=a(19),s=a(18),i=a(0),o=a.n(i),m=a(21),u=a(3),p=(a(126),a(127),a(128),function(e){Object(l.a)(a,e);var t=Object(s.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){var e=this.props,t=e.currentPrice,a=e.oldPrice;return o.a.createElement("div",{className:"product-price"},o.a.createElement("span",{className:"product__current-price"},t),o.a.createElement("span",{className:"product__old-price"},a))}}]),a}(i.Component)),d=a(31),h=(a(129),function(e){Object(l.a)(a,e);var t=Object(s.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){var e=this.props,t=e.className,a=e.productId;return o.a.createElement(d.b,{to:"/purchase/".concat(a),className:"buy-button ".concat(t)},"\u7acb\u5373\u8d2d\u4e70")}}]),a}(i.Component)),_=function(e){Object(l.a)(a,e);var t=Object(s.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){var e=this.props.data,t=e.id,a=e.picture,n=e.product,c=e.description,r=e.currentPrice,l=e.oldPrice;return o.a.createElement("div",{className:"product-overview"},o.a.createElement("div",{className:"product-overview__img-wrapper"},o.a.createElement("img",{className:"product-overview__img",src:a,alt:n}),o.a.createElement("div",{className:"product-overview__content"},o.a.createElement("h4",{className:"product-overview__title"},n),o.a.createElement("p",{className:"product-overview__description"},c))),o.a.createElement("div",{className:"product-overview__buy"},o.a.createElement(p,{currentPrice:r,oldPrice:l}),o.a.createElement(h,{className:"product-overview__btn--buy",productId:t})),o.a.createElement("ul",{className:"product-overview__advantages"},o.a.createElement("li",null,o.a.createElement("i",null),o.a.createElement("span",null,"\u968f\u65f6\u53ef\u9000")),o.a.createElement("li",null,o.a.createElement("i",null),o.a.createElement("span",null,"\u8fc7\u671f\u81ea\u52a8\u9000"))))}}]),a}(i.Component),E=(a(130),function(e){Object(l.a)(a,e);var t=Object(s.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){var e=this.props.data,t=e.url,a=e.shop,n=e.star,c=e.distance,r=void 0===c?">100km":c,l=e.phone,s=e.address,i=e.shopCount,m=n/50*100+"%";return o.a.createElement("div",{className:"shop-info"},o.a.createElement("div",{className:"shop-info__header"},o.a.createElement("h5",{className:"shop-info__title"},"\u9002\u7528\u5546\u6237(",i,")"),o.a.createElement("span",{className:"shop-info__more"})),o.a.createElement("div",{className:"shop-info__content"},o.a.createElement("a",{href:t,className:"shop-info__link"},o.a.createElement("div",{className:"shop-info__detail"},o.a.createElement("p",{className:"shop-info__name"},a),o.a.createElement("div",{className:"shop-info__rating"},o.a.createElement("i",{className:"shop-info__stars"},o.a.createElement("i",{className:"shop-info__stars--red",style:{width:m}}))),o.a.createElement("span",{className:"shop-info__distance"},r)),o.a.createElement("a",{href:"tel:".concat(l),className:"shop-info__phone"},o.a.createElement("i",null)))),o.a.createElement("div",{className:"shop-info__address-wrapper"},o.a.createElement("i",{className:"shop-info__address-icon"}),o.a.createElement("span",{className:"shop-info__address"},s)))}}]),a}(i.Component)),v=(a(131),function(e){Object(l.a)(a,e);var t=Object(s.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){var e=this.props.data,t=e.detail,a=t.category,n=t.products,c=t.remark,r=e.oldPrice,l=e.currentPrice;return o.a.createElement("div",{className:"buy-detail"},o.a.createElement("div",{className:"buy-detail__header"},o.a.createElement("span",{className:"buy-detail__title"},"\u56e2\u8d2d\u8be6\u60c5"),o.a.createElement("i",{className:"buy-detail__title-icon"})),o.a.createElement("div",{className:"buy-detail__content"},o.a.createElement("table",{className:"buy-detail__table"},o.a.createElement("thead",null,o.a.createElement("tr",null,o.a.createElement("th",{colSpan:"3"},a))),o.a.createElement("tbody",null,n.map((function(e,t){var a=e.name,n=e.quantity,c=e.price;return o.a.createElement("tr",{key:t},o.a.createElement("td",null,a),o.a.createElement("td",null,n),o.a.createElement("td",null,c))})),o.a.createElement("tr",null,o.a.createElement("td",null),o.a.createElement("td",null,"\u6700\u9ad8\u4ef7\u503c"),o.a.createElement("td",null,r,"\u5143")),o.a.createElement("tr",null,o.a.createElement("td",null),o.a.createElement("td",null,"\u56e2\u8d2d\u4ef7"),o.a.createElement("td",null,l,"\u5143")))),o.a.createElement("p",{className:"buy-detail__remark"},c),o.a.createElement("div",{className:"buy-detail__more"},o.a.createElement("span",null,"\u66f4\u591a\u56fe\u6587\u8be6\u60c5"),o.a.createElement("span",{className:"buy-detail__notice"},"\uff08\u5efa\u8baeWifi\u73af\u5883\u4e0b\u6253\u5f00,\u571f\u8c6a\u8bf7\u968f\u610f\uff09"),o.a.createElement("i",{className:"buy-detail__arrow"}))))}}]),a}(i.Component)),b=(a(132),function(e){Object(l.a)(a,e);var t=Object(s.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){var e=this.props.data,t=e.purchaseNotes,a=e.validityPeriod;return o.a.createElement("div",{className:"purchase-notes"},o.a.createElement("div",{className:"purchase-notes__header"},o.a.createElement("span",{className:"purchase-notes__title"},"\u8d2d\u4e70\u987b\u77e5"),o.a.createElement("i",{className:"purchase-notes__title-icon"})),o.a.createElement("div",{className:"purchase-notes__content"},o.a.createElement("dl",{className:"purchase-notes__item"},o.a.createElement("dt",{className:"purchase-notes__item-title"},"\u6709\u6548\u671f"),o.a.createElement("dd",null,o.a.createElement("p",{className:"purchase-notes__item-listitem"},a))),t.map((function(e,t){var a=e.title,n=e.content;return o.a.createElement("dl",{key:t,className:"purchase-notes__item"},o.a.createElement("dt",{className:"purchase-notes__item-title"},a),o.a.createElement("dd",null,o.a.createElement("p",{className:"purchase-notes__item-listitem"},n)))}))))}}]),a}(i.Component)),f=a(92),N=a(37),y=a(6),j=function(e){Object(l.a)(a,e);var t=Object(s.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).handleBack=function(e){e.preventDefault()},e.handleBack=function(){e.props.history.goBack()},e}return Object(r.a)(a,[{key:"componentDidMount",value:function(){var e=this.props,t=e.product,a=e.relatedShop,n=this.props.match.params.id;t?a||this.props.detailActions.fetchShopById(t.nearestShop):this.props.detailActions.fetchProduct(n)}},{key:"componentDidUpdate",value:function(e){var t=this.props.product;!e.product&&this.props.product&&this.props.detailActions.fetchShopById(t.nearestShop)}},{key:"render",value:function(){var e=this.props,t=e.product,a=e.relatedShop,c=t?t.shopIds.length:0;return o.a.createElement("div",{className:"product-detail"},o.a.createElement(f.a,{className:"gray",title:"\u56e2\u8d2d\u8be6\u60c5",onBack:this.handleBack}),t&&o.a.createElement(_,{data:t}),a&&o.a.createElement(E,{data:Object(n.a)(Object(n.a)({},a),{},{shopCount:c})}),t&&o.a.createElement(o.a.Fragment,null,o.a.createElement(v,{data:t}),o.a.createElement(b,{data:t}),o.a.createElement(h,{productId:t.id,className:"product-detail__buy-button"})))}}]),a}(i.Component);t.default=Object(u.g)(Object(m.b)((function(e,t){var a=t.match.params.id;return{product:Object(N.c)(e,a),relatedShop:Object(N.d)(e,a)}}),(function(e){return{detailActions:Object(y.b)(N.a,e)}}))(j))},92:function(e,t,a){"use strict";var n=a(16),c=a(17),r=a(19),l=a(18),s=a(0),i=a.n(s),o=(a(93),function(e){Object(r.a)(a,e);var t=Object(l.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){var e=this.props,t=e.className,a=e.title,n=e.onBack;return i.a.createElement("div",{className:"base-header"},i.a.createElement("span",{className:"base-header__back ".concat(t),onClick:n},"\u8fd4\u56de"),i.a.createElement("h2",{className:"base-header__title"},a))}}]),a}(s.Component));t.a=o},93:function(e,t,a){}}]);
//# sourceMappingURL=5.577a16f9.chunk.js.map