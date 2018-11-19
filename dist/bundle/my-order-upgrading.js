/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(59);


/***/ }),

/***/ 2:
/***/ (function(module, exports) {

	function is_weixin() {
	    var ua = navigator.userAgent.toLowerCase();
	    if (ua.match(/MicroMessenger/i) == "micromessenger") {
	        return true;
	    } else {
	        return false;
	    }
	}
	exports.isWX = is_weixin;


/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

	var api_path_config = __webpack_require__(4);
	var wxModule = __webpack_require__(2);
	function redirectURL() {
		if(!wxModule.isWX()) {
			location.href = 'pwd-login.html';
		} else {
			location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + api_path_config.appid + '&redirect_uri=https%3A%2F%2F' + api_path_config.wxdomain + '%2Fwechat_web%2Fwechat%2FwxAutho.do%3Fredirect_url%3Dhttps%253A%252F%252F' + api_path_config.wxdomain + '%252Fhtml%252Fwx-login.html&response_type=code&scope=snsapi_userinfo';
		}
	}
	function ajaxPostAct(url,id,param,callback) {
		if(!url) {
			url = '/gate.do';
		}
		if(id) {
			param.id = id;
		}
		var param = {
			req: JSON.stringify(param)
		}
		// $.post(api_path_config.api_path_3 + url,param,function(data){
		// 	// if(data.isLogin) {
		// 		if(typeof data != 'object') {
		// 			callback(JSON.parse(data));
		// 		} else {
		// 			callback(data);
		// 		}
		// 	// } else {
		// 		// redirectURL();
		// 	// }
		// });
		$.ajax({
	        type: "post",
	        data: param,
	        url: api_path_config.api_path_act + url,
	        timeout : 3000,
	        xhrFields:{
		      withCredentials: true
		    },
		    //crossDomain: true,
	        success: function(data) {
	   //      	if(typeof data != 'object') {
				// 	callback(JSON.parse(data));
				// } else {
				// 	callback(data);
				// }
				loginJudge(data, callback);
	        }
	    });
	}
	//act ajax dl
	function ajaxPost(url,id,param,callback) {
		if(!url) {
			url = '/gate.do';
		}
		if(id) {
			param.id = id;
		}
		var param = {
			req: JSON.stringify(param)
		}
		// $.post(api_path_config.api_path_3 + url,param,function(data){
		// 	// if(data.isLogin) {
		// 		if(typeof data != 'object') {
		// 			callback(JSON.parse(data));
		// 		} else {
		// 			callback(data);
		// 		}
		// 	// } else {
		// 		// redirectURL();
		// 	// }
		// });
		$.ajax({
	        type: "post",
	        data: param,
	        url: api_path_config.api_path_3 + url,
	        timeout : 3000,
	        xhrFields:{
		      withCredentials: true
		    },
		    //crossDomain: true,
	        success: function(data) {
	   //      	if(typeof data != 'object') {
				// 	callback(JSON.parse(data));
				// } else {
				// 	callback(data);
				// }
				loginJudge(data, callback);
	        }
	    });
	}
	function ajaxPostWXDL(url,id,param,callback) {
		if(!url) {
			url = '/gate.do';
		}
		if(id) {
			param.id = id;
		}
		var param = {
			req: JSON.stringify(param)
		}
		// $.post(api_path_config.api_path_3 + url,param,function(data){
		// 	// if(data.isLogin) {
		// 		if(typeof data != 'object') {
		// 			callback(JSON.parse(data));
		// 		} else {
		// 			callback(data);
		// 		}
		// 	// } else {
		// 		// redirectURL();
		// 	// }
		// });
		$.ajax({
	        type: "post",
	        data: param,
	        url: api_path_config.wxdomainDL + url,
	        timeout : 3000,
	        xhrFields:{
		      withCredentials: true
		    },
		    //crossDomain: true,
	        success: function(data) {
	   //      	if(typeof data != 'object') {
				// 	callback(JSON.parse(data));
				// } else {
				// 	callback(data);
				// }
				loginJudge(data, callback);
	        }
	    });
	}
	function ajaxPostTimeoutHandle(url,id,param,callback, timeOutCallBack) {
		if(!url) {
			url = '/gate.do';
		}
		if(id) {
			param.id = id;
		}
		var param = {
			req: JSON.stringify(param)
		}
		// $.post(api_path_config.api_path_3 + url,param,function(data){
		// 	// if(data.isLogin) {
		// 		if(typeof data != 'object') {
		// 			callback(JSON.parse(data));
		// 		} else {
		// 			callback(data);
		// 		}
		// 	// } else {
		// 		// redirectURL();
		// 	// }
		// });
		$.ajax({
	        type: "post",
	        data: param,
	        url: api_path_config.api_path_3 + url,
	        timeout : 3000,
	        xhrFields:{
		      withCredentials: true
		    },
		    //crossDomain: true,
	        success: function(data) {
	   //      	if(typeof data != 'object') {
				// 	callback(JSON.parse(data));
				// } else {
				// 	callback(data);
				// }
				loginJudge(data, callback);
	        },
			error: function(jqXHR, textStatus, errorThrown){ //请求完成后最终执行参数
		　　　　if(textStatus=='timeout'){//超时,status还有success,error等值的情况
		　　　　　  timeOutCallBack();

		　　　　}
		　　}
	    });
	}
	function ajaxGet(url,id,param,callback) {
		if(!url) {
			url = '/gate.do';
		} 
		if(id) {
			param.id = id;
		}
		var param = {
			req: JSON.stringify(param)
		}
		// $.get(api_path_config.api_path_3 + url,param,function(data){
		// 	// if(data.isLogin) {
		// 		if(typeof data != 'object') {
		// 			callback(JSON.parse(data));
		// 		} else {
		// 			callback(data);
		// 		}
		// 	// } else {
				
		// 	// }
		// });
		$.ajax({
	        type: "get",
	        data: param,
	        url: api_path_config.api_path_3 + url,
	        xhrFields:{
		      withCredentials: true
		    },
		    //crossDomain: true,
	        success: function(data) {
	   //      	if(typeof data != 'object') {
				// 	callback(JSON.parse(data));
				// } else {
				// 	callback(data);
				// }
				loginJudge(data, callback);
	        }
	    });
	}

	function ajaxDlGet(id,param,callback) {
		if(id) {
			param.id = id;
		}
		var param = {
			req: JSON.stringify(param)
		}
		$.ajax({
	        type: "get",
	        data: param,
	        url: api_path_config.wxdomainDL + "/gate.do",
	        xhrFields:{
		      withCredentials: true
		    },
		    //crossDomain: true,
	        success: function(data) {
	   //      	if(typeof data != 'object') {
				// 	callback(JSON.parse(data));
				// } else {
				// 	callback(data);
				// }
				loginJudge(data, callback);
	       }
	    });
	}


	function ajaxPost4Autho(url,param,callback) {
		// $.post(api_path_config.api_path_2 + url,param,function(data){
		// 	// if(data.isLogin) {
		// 		if(typeof data != 'object') {
		// 			callback(JSON.parse(data));
		// 		} else {
		// 			callback(data);
		// 		}
		// 	// } else {
		// 		// redirectURL();
		// 	// }
		// });
		$.ajax({
	        type: "post",
	        data: param,
	        url: api_path_config.api_path_2 + url,
	        xhrFields:{
		      withCredentials: true
		    },
		    //crossDomain: true,
	        success: function(data) {
	   //      	if(typeof data != 'object') {
				// 	callback(JSON.parse(data));
				// } else {
				// 	callback(data);
				// }
				loginJudge(data, callback);
	        }
	    });
	}

	function ajaxGet4Autho(url,param,callback) {
		// $.get(api_path_config.api_path_2 + url,param,function(data){
		// 	// if(data.isLogin) {
		// 		if(typeof data != 'object') {
		// 			callback(JSON.parse(data));
		// 		} else {
		// 			callback(data);
		// 		}
		// 	// } else {
		// 		// redirectURL();
		// 	// }
		// });
		$.ajax({
	        type: "get",
	        data: param,
	        url: api_path_config.api_path_2 + url,
	        xhrFields:{
		      withCredentials: true
		    },
		    //crossDomain: true,
	        success: function(data) {
	   //      	if(typeof data != 'object') {
				// 	callback(JSON.parse(data));
				// } else {
				// 	callback(data);
				// }
				loginJudge(data, callback);
	        }
	    });
	}
	function ajaxWxAutho(url,param,callback) {
		$.get(api_path_config.api_path_4 + url,param,function(data){
			// if(data.isLogin) {
				if(typeof data != 'object') {
					callback(JSON.parse(data));
				} else {
					callback(data);
				}
			// } else {
				// redirectURL();
			// }
		});
	}

	//登录跨域ajax跳转
	function ajaxGet4AuthoCR(url,param,callback) {
		$.ajax({
	        type: "get",
	        data: param,
	        url: api_path_config.api_path_2 + url,
	        xhrFields:{
		      withCredentials: true
		    },
		    //crossDomain: true,
	        success: function(data) {
	   //      	if(typeof data != 'object') {
				// 	callback(JSON.parse(data));
				// } else {
				// 	callback(data);
				// }
				loginJudge(data, callback);
	        }
	    });
	}
	//登录拦截
	function loginJudge(data, callback) {
		if(typeof data != 'object') {
			var data = JSON.parse(data);
			if(data.code === '40002') {
				redirectURL();
			} else {
				callback(data);
			}
		} else {
			if(data.code === '40002') {
				redirectURL();
			} else {
				callback(data);
			}
		}
	}
	exports.ajaxPost = ajaxPost;
	exports.ajaxPostTimeoutHandle = ajaxPostTimeoutHandle;
	exports.ajaxGet = ajaxGet;
	exports.post = ajaxPost;
	exports.get = ajaxGet;
	exports.ajaxPost4Autho = ajaxPost4Autho;
	exports.ajaxGet4Autho = ajaxGet4Autho;
	exports.ajaxGet4AuthoCR = ajaxGet4AuthoCR;
	exports.ajaxWxAutho = ajaxWxAutho;
	exports.redirectURL = redirectURL;
	exports.ajaxPostAct = ajaxPostAct;
	exports.ajaxDlGet = ajaxDlGet;
	exports.ajaxPostWXDL = ajaxPostWXDL;


/***/ }),

/***/ 4:
/***/ (function(module, exports) {

	module.exports = {
		"api_path_1": "https://bsstest1.yyzws.com/leaf_manager_web",
		"api_path_actDra": "https://img.yyzws.com/ex/",
		"api_path_2": "https://ssotest1.yyzws.com/leaf_sso_web",
		"api_path_3": "https://gatewaytest1.yyzws.com/mobile_gateway_web",
		"api_path_4": "https://wxtest1.yyzws.com/wechat_web",
		"static_path": "https://statictest1.yyzws.com",
		"upload_path": "https://img.yyzws.com/ex/",
		"upload_path_sq": "https://yiyezi.yyzws.com/ex/",
		"upload_path_in": "https://yiyezi.yyzws.com/in/",
		"upload_path_h5": "https://img.yyzws.com/ex/",
		"wxdomain": "wxtest1.yyzws.com",
		"wxdomainDL": "https://dltest1.yyzws.com/dl_gateway_web",
		"msgReq": "/message/sendSms.do",
		"appid": "wxe2ad70729e334402",
		"secret": "1b1b3479e0fd475a0fc6ae9d6595429e",
		"wxQrcode": "yyz_test_qrcode.jpg"
	}

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

	function remSetting(isHd) {
	    var deviceWidth = document.documentElement.clientWidth;
	    if (deviceWidth > 750) deviceWidth = 750;
	    document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
	    if(!isHd){
	    	$('.Hd').removeClass('Hd');
	    }
	}

	exports.remSetting = remSetting;


/***/ }),

/***/ 12:
/***/ (function(module, exports) {

	function getQueryString(name) {
	    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) {
	        return unescape(r[2]);
	    }
	    return null;
	}
	exports.getQueryString = getQueryString;

/***/ }),

/***/ 13:
/***/ (function(module, exports) {

	function returnPageWithUrl(url) {
		setTimeout(function(){
			pushHistory();
		 window.addEventListener("popstate", function(e) {
		 	window.location = url;
		 }, false);
		 function pushHistory() {
		 	var state = {
		 		title: "title",
		 		url: "#"
		 	};
		 	window.history.pushState(state, "title", "#wechat_redirect");
		 }
		},500)
		 
	}
	function closeWindow() {
		 pushHistory();
		 window.addEventListener("popstate", function(e) {
		 	WeixinJSBridge.call('closeWindow');
		 }, false);
		 function pushHistory() {
		 	var state = {
		 		title: "title",
		 		url: "#"
		 	};
		 	window.history.pushState(state, "title", "#wechat_redirect");
		 }
	}
	exports.closeWindow = closeWindow;
	exports.returnPageWithUrl = returnPageWithUrl;

/***/ }),

/***/ 14:
/***/ (function(module, exports) {

	// 判断浏览器是否是移动端
	function isMobile() {
		return navigator.userAgent.match(/(iphone|ipad|ipod|ios|android|mobile|blackberry|iemobile|mqqbrowser|juc|fennec|wosbrowser|browserng|Webos|symbian|windows phone)/i);
	}

	function getEventType() {
		return isMobile() ? 'touchend' : 'click';
	}


	module.exports = {
		getEventType: getEventType
	}

/***/ }),

/***/ 16:
/***/ (function(module, exports) {

	function setItem(item, obj) {
		localStorage.setItem(item, obj);
	}

	function getItem(item) {
		return localStorage.getItem(item);
	}

	function removeItem(item){
		localStorage.removeItem(item);
	}

	exports.setItem = setItem;
	exports.removeItem = removeItem;
	exports.getItem = getItem;

/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

	var $ajax = __webpack_require__(3);
	var api_path_config = __webpack_require__(4);
	function redirectByStatus() {
		var openid = null;
		if(typeof($.cookie) == 'function') {
			openid = $.cookie('openid');
		}
		if(typeof($.fn.cookie) == 'function') {
			openid = $.fn.cookie('openid');
		}
		$ajax.post(null,'003000026',{open_id: openid},function(data){
			if( data.code == "30064"){
				//location.href = 'http://' + api_path_config.wxdomain + '/html/team/team-my-upgrade-success.html';
				location.href = 'https://' + api_path_config.wxdomain + '/html/center-upgrading.html';
			}
			if( data.code == "30059"){
				goDeleRegisterUrl(openid);
			}
			// if( data.code == "30067"){
			// 	$ajax.redirectURL();
			// }
			// if (data.code == "30047") {
			// 	ifSetGesture();
			// }
			if (data.code == "30048") { // 能进行注册
				location.href = 'https://' + api_path_config.wxdomain + '/html/no-register.html';
			}
			if (data.code == "30049") {  // 显示进度条
				location.href = 'https://' + api_path_config.wxdomain + '/html/dele-register-success.html';
			}
		});
	}

	function redirectByStatusIfUpGrading() {// 在正在升级的个人中心里边调用。 仅仅为了判断状态是否为正在升级中。
		var openid = null;
		if(typeof($.cookie) == 'function') {
			openid = $.cookie('openid');
		}
		if(typeof($.fn.cookie) == 'function') {
			openid = $.fn.cookie('openid');
		};
		$ajax.post(null,'003000026',{open_id: openid},function(data){
			if(!data.success && data.code != "30064"){ // 30064正在升级中。
				//location.href = 'http://' + api_path_config.wxdomain + '/html/team/team-my-upgrade-success.html';
				//location.href = 'http://' + api_path_config.wxdomain + '/html/center-upgrading.html';
				location.href = 'https://' + api_path_config.wxdomain + '/html/center.html';
			}
		});
	}
	function redirectByStatusIfUpGradingMyOrder() {// 在正在升级的个人中心里边调用。 仅仅为了判断状态是否为正在升级中。
		var openid = null;
		if(typeof($.cookie) == 'function') {
			openid = $.cookie('openid');
		}
		if(typeof($.fn.cookie) == 'function') {
			openid = $.fn.cookie('openid');
		};
		$ajax.post(null,'003000026',{open_id: openid},function(data){
			if(!data.success && data.code == "30064"){ // 30064正在升级中。
				//location.href = 'http://' + api_path_config.wxdomain + '/html/team/team-my-upgrade-success.html';
				//location.href = 'http://' + api_path_config.wxdomain + '/html/center-upgrading.html';
				location.href = 'https://' + api_path_config.wxdomain + '/html/order/my-order-upgrading.html';
			}
		});
	}
	function redirectByStatusIfUpGradingMyOrderUpGrading() {// 在正在升级的个人中心里边调用。 仅仅为了判断状态是否为正在升级中。
		var openid = null;
		if(typeof($.cookie) == 'function') {
			openid = $.cookie('openid');
		}
		if(typeof($.fn.cookie) == 'function') {
			openid = $.fn.cookie('openid');
		};
		$ajax.post(null,'003000026',{open_id: openid},function(data){
			if(!data.success && data.code != "30064"){ // 30064正在升级中。
				//location.href = 'http://' + api_path_config.wxdomain + '/html/team/team-my-upgrade-success.html';
				//location.href = 'http://' + api_path_config.wxdomain + '/html/center-upgrading.html';
				location.href = 'https://' + api_path_config.wxdomain + '/html/order/my-order.html';
			}
		});
	}

	function goDeleRegisterUrl(openid) {
		$ajax.post(null,'003000029',{open_id: openid},function(data){
			if(data.success){
				var up_id = data.data;
				location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + api_path_config.appid + '&redirect_uri=https%3A%2F%2F' + api_path_config.wxdomain + '%2Fwechat_web%2Fwechat%2FwxAutho.do%3Fredirect_url%3Dhttps%253A%252F%252F' + api_path_config.wxdomain + '%252Fhtml%252Fdele-register.html%26up_id%3D' + up_id + '&response_type=code&scope=snsapi_userinfo';
			}
		});
	}
	module.exports = {
		redirectByStatus: redirectByStatus,
		goDeleRegisterUrl: goDeleRegisterUrl,
		redirectByStatusIfUpGrading: redirectByStatusIfUpGrading,
		redirectByStatusIfUpGradingMyOrder: redirectByStatusIfUpGradingMyOrder,
		redirectByStatusIfUpGradingMyOrderUpGrading: redirectByStatusIfUpGradingMyOrderUpGrading
	}

/***/ }),

/***/ 38:
/***/ (function(module, exports) {

	function btnCtrl(event, callback) {
		var target = $(event.target);
		var oldColor = target.css('background-color');
		if(target.hasClass('btn-trigging')) {
			return;
		} else {
			target.addClass('btn-trigging');
			target.css({'background-color': 'gray'});
			callback(target);
			setTimeout(function(){
				target.removeClass('btn-trigging');
				target.css({'background-color': oldColor});
			},4000);
		}
	}


	module.exports = {
		btnCtrl: btnCtrl
	}

/***/ }),

/***/ 57:
/***/ (function(module, exports) {

	var self_tpl = {
		'orderListTpl': '{{~ it.orderList:item:index }}\
							<li class="item">\
								<div class="top-info">\
									<span class="user-font"></span><span class="user-name">{{= item.member_name}}</span><br>\
									<span class="order-no">{{= item.order_sn}}</span>\
									<div class="send-info">\
										<span class="">\
										{{? item.order_status==30 || item.order_status==29}}待审单\
										{{?? item.order_status==31}}已审单\
										{{?? item.order_status==32}}待发货\
										{{?? item.order_status==34}}已发货\
										{{?? item.order_status==33}}待收货\
										{{?? item.order_status==35}}取消中\
										{{?? item.order_status==36}}已取消\
										{{?? item.order_status==39}}强制取消\
										{{?? item.order_status==37}}已完成\
										{{?? item.order_status==38}}已拒绝\
										{{?}}(\
										{{? item.deliver_type==1}}上级发货\
										{{?? item.deliver_type==2}}总部发货\
										{{?}})\
										</span><br>\
										<span class="order-time">{{= item.order_time}}</span>\
									</div>\
									{{? item.member_id == "872"}}\
										<p style="font-size:12px;color:#999;padding:3px 0;">{{= item.address}}</p>\
									{{?}}\
								</div>\
								<div class="middle-info">\
									<div class="goods">\
										<img src="{{= it.upload_path}}{{= item.sku_image_url}}" alt="">\
										<div class="about">\
											<p class="goods-name">{{= item.sku_name}}</p>\
											<p class="guige">规格：{{= item.sku_specs || ""}}</p>\
										</div>\
										<div class="price">\
											<p>￥{{= item.wechat_price}}</p>\
											<p class="num">x {{= item.count}}</p>\
										</div>\
									</div>\
								</div>\
								{{? item.direct_subor_id}}\
									<div class="bottom-info" style="border-bottom: 1px solid #e8e8e8;">\
										<span class="total">直接下级：{{= item.direct_subor_name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;\
										<span class="total">被扣金额：￥{{= item.deduction_amount}}</span>\
									</div>\
								{{?}}\
								<div class="bottom-info">\
									<p style="text-align: right;font-size: 12px;"><span>共{{= item.count}}件商品 </span><span class="total">合计：￥{{= item.total_amount}}</span> (含运费￥0.00)</p>\
									<div class="btn">\
										{{? it.order_type == 1}}\
											{{? item.order_status == 29}}\
											<span class="cancel" data-id="{{= item.order_id}}">取消</span>\
											{{?}}\
											{{? item.order_status == 33}}\
											<a class="express" data-ordertype="{{= it.order_type}}" data-orderstatus="{{= item.order_status}}" data-orderid="{{= item.order_id}}" data-member_id="{{= item.member_id}}" href="javascript:void(0);">物流</a>\
											<span class="getgoods" data-id="{{= item.order_id}}">收货</span>\
											{{?}}\
											{{? item.order_status == 37}}\
											<a class="express" data-ordertype="{{= it.order_type}}" data-orderstatus="{{= item.order_status}}" data-orderid="{{= item.order_id}}" data-member_id="{{= item.member_id}}" href="javascript:void(0);">物流</a>\
											{{?}}\
											<a class="detail" href="order-detail.html?orderType={{= it.order_type}}&orderId={{= item.order_id}}&order_status={{= item.order_status}}&audit_status={{= it.audit_status}}&member_id={{= item.member_id}}">详情</a>\
										{{?}}\
										{{? it.order_type == 2}}\
											{{? (item.order_status == 30 || item.order_status == 29 || item.order_status == 2) && !item.type}}\
											<span class="nopass" data-id="{{= item.order_id}}" data-nopasstext="拒绝">拒绝</span>\
											<span class="pass" data-id="{{= item.order_id}}" data-nopasstext="通过">通过</span>\
											{{?}}\
											{{? item.order_status == 32 && item.deliver_type != 2}}\
											<a class="send" href="order-detail.html?orderType={{= it.order_type}}&orderId={{= item.order_id}}&&isSend=true&member_id={{= item.member_id}}">发货</a>\
											{{?}}\
											{{? item.order_status == 34}}\
											<a class="express" data-ordertype="{{= it.order_type}}" data-orderstatus="{{= item.order_status}}" data-orderid="{{= item.order_id}}" data-member_id="{{= item.member_id}}" href="javascript:void(0);">物流</a>\
											{{?}}\
											{{? item.order_status == 35}}\
											<span class="pass-cancel" data-id="{{= item.order_id}}" data-nopasstext="同意">同意</span>\
											<span class="nopass-cancel" data-id="{{= item.order_id}}" data-nopasstext="拒绝">拒绝</span>\
											{{?}}\
											{{? item.order_status == 37}}\
											<a class="express" data-ordertype="{{= it.order_type}}" data-orderstatus="{{= item.order_status}}" data-orderid="{{= item.order_id}}" data-member_id="{{= item.member_id}}" href="javascript:void(0);">物流</a>\
											{{?}}\
											<a class="detail" href="order-detail.html?orderType={{= it.order_type}}&orderId={{= item.order_id}}&order_status={{= item.order_status}}&audit_status={{= it.audit_status}}&member_id={{= item.member_id}}">详情</a>\
										{{?}}\
									</div>\
								</div>\
							</li>\
						{{~}}',
		'orderListUpGradingTpl': '{{~ it.orderList:item:index }}\
							<li class="item">\
								<div class="top-info">\
									<span class="user-font"></span><span class="user-name">{{= item.member_name}}</span><br>\
									<span class="order-no">{{= item.order_sn}}</span>\
									<div class="send-info">\
										<span class="">\
										{{? item.order_status==30 || item.order_status==29}}待审单\
										{{?? item.order_status==31}}已审单\
										{{?? item.order_status==32}}待发货\
										{{?? item.order_status==34}}已发货\
										{{?? item.order_status==33}}待收货\
										{{?? item.order_status==35}}取消中\
										{{?? item.order_status==36}}已取消\
										{{?? item.order_status==39}}强制取消\
										{{?? item.order_status==37}}已完成\
										{{?? item.order_status==38}}已拒绝\
										{{?}}(\
										{{? item.deliver_type==1}}上级发货\
										{{?? item.deliver_type==2}}总部发货\
										{{?}})\
										</span><br>\
										<span class="order-time">{{= item.order_time}}</span>\
									</div>\
								</div>\
								<div class="middle-info">\
									<div class="goods">\
										<img src="{{= it.upload_path}}{{= item.sku_image_url}}" alt="">\
										<div class="about">\
											<p class="goods-name">{{= item.sku_name}}</p>\
											<p class="guige">规格：{{= item.sku_specs}}</p>\
										</div>\
										<div class="price">\
											<p>￥{{= item.wechat_price}}</p>\
											<p class="num">x {{= item.count}}</p>\
										</div>\
									</div>\
								</div>\
								{{? item.direct_subor_id}}\
									<div class="bottom-info" style="border-bottom: 1px solid #e8e8e8;">\
										<span class="total">直接下级：{{= item.direct_subor_name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;\
										<span class="total">被扣金额：￥{{= item.deduction_amount}}</span>\
									</div>\
								{{?}}\
								<div class="bottom-info">\
									<span class="total">合计：￥{{= item.total_amount}}</span>\
									<div class="btn">\
										{{? it.order_type == 1}}\
											{{? item.order_status == 29}}\
											<span class="cancel" data-id="{{= item.order_id}}">取消</span>\
											{{?}}\
											{{? item.order_status == 33}}\
											<a class="express" data-ordertype="{{= it.order_type}}" data-orderstatus="{{= item.order_status}}" data-orderid="{{= item.order_id}}" data-member_id="{{= item.member_id}}" href="javascript:void(0);">物流</a>\
											<span class="getgoods" data-id="{{= item.order_id}}">收货</span>\
											{{?}}\
											{{? item.order_status == 37}}\
											<a class="express" data-ordertype="{{= it.order_type}}" data-orderstatus="{{= item.order_status}}" data-orderid="{{= item.order_id}}" data-member_id="{{= item.member_id}}" href="javascript:void(0);">物流</a>\
											{{?}}\
											<a class="detail" href="order-detail.html?orderType={{= it.order_type}}&orderId={{= item.order_id}}&order_status={{= item.order_status}}&audit_status={{= it.audit_status}}&member_id={{= item.member_id}}&from=upGrading">详情</a>\
										{{?}}\
										{{? it.order_type == 2}}\
											{{? (item.order_status == 30 || item.order_status == 29 || item.order_status == 2) && !item.type}}\
											<span style="display: none;" class="nopass" data-id="{{= item.order_id}}" data-nopasstext="拒绝">拒绝</span>\
											<span style="display: none;" class="pass" data-id="{{= item.order_id}}" data-nopasstext="通过">通过</span>\
											{{?}}\
											{{? item.order_status == 32 && item.deliver_type != 2}}\
											<a class="send" href="order-detail.html?orderType={{= it.order_type}}&orderId={{= item.order_id}}&&isSend=true&member_id={{= item.member_id}}">发货</a>\
											{{?}}\
											{{? item.order_status == 34}}\
											<a class="express" data-ordertype="{{= it.order_type}}" data-orderstatus="{{= item.order_status}}" data-orderid="{{= item.order_id}}" data-member_id="{{= item.member_id}}" href="javascript:void(0);">物流</a>\
											{{?}}\
											{{? item.order_status == 35}}\
											<span style="display: none;" class="pass-cancel" data-id="{{= item.order_id}}" data-nopasstext="同意">同意</span>\
											<span style="display: none;" class="nopass-cancel" data-id="{{= item.order_id}}" data-nopasstext="拒绝">拒绝</span>\
											{{?}}\
											{{? item.order_status == 37}}\
											<a class="express" data-ordertype="{{= it.order_type}}" data-orderstatus="{{= item.order_status}}" data-orderid="{{= item.order_id}}" data-member_id="{{= item.member_id}}" href="javascript:void(0);">物流</a>\
											{{?}}\
											<a class="detail" href="order-detail.html?orderType={{= it.order_type}}&orderId={{= item.order_id}}&order_status={{= item.order_status}}&audit_status={{= it.audit_status}}&member_id={{= item.member_id}}&from=upGrading">详情</a>\
										{{?}}\
									</div>\
								</div>\
							</li>\
						{{~}}',
		'goodsListTpl': '<li class="item">\
							<div class="group_info" style=" background-color: #DDEBCE;margin: .1rem .1rem 0.1rem;padding: .3rem .2rem;border-radius: 4px;">{{= it.descri}}</div>\
						</li>\
						{{~ it.group_spu_d_t_o_s:item:index }}\
						 <li class="item" data-id="{{= item.spu_id}}">\
							<div class="middle-info">\
								<div class="goods">\
									<img src="{{= it.image_prefix + item.spu_img_uri}}" alt="">\
									<div class="about">\
											<span class="spu_name" style="display: inline-block;margin: 25px 10px;">{{= item.spu_name}}</span>\
											<div style="top: 28%;" class="btn-area">\
												<a class="place-btn" href="order-confirm.html?id={{= item.spu_id}}&data_img={{= it.image_prefix + item.spu_img_uri}}&deliver_type={{= item.deliver_type}}">下单</a>\
											</div>\
									</div>\
								</div>\
							</div>\
						</li>\
						{{~}}',
		'noGoodsTpl': '<li class="item"">\
						<div class="middle-info">\
							<div class="no-goods">\
								<img src="../../images/nogoods.png" alt="">\
							</div>\
						</div>\
					</li>',
		'noOrdersTpl': '<li class="item"">\
						<div class="middle-info">\
							<div class="no-goods">\
								<img src="../../images/noorders.png" alt="">\
							</div>\
						</div>\
					</li>',
		'orderConfirmTpl': '<div class="ctrl">\
								<img src="{{= it.image_prefix + it.sku_image_url}}" alt="">\
								<div class="about">\
									<p>{{= it.spu_name}}</p>\
									<div class="guige"><span class="guigeleft" data_unit="{{= it.unit}}" style="display: none;">规格：</span>\
									</div>\
								</div>\
								{{ for(var j=0; j< it.property_d_t_o_list.length; j++) { }}\
									<div class="attr_box" {{? j==0}}style="border-top: 1px solid #e8e8e8; margin-top: 42px;"{{?}}>\
										<div class="attr_left" data_id="{{= it.property_d_t_o_list[j].property_id}}">{{= it.property_d_t_o_list[j].property_name }}:</div>\
										<div class="attr_right" data_id="{{= it.property_d_t_o_list[j].property_id}}">\
										</div>\
									</div>\
								{{ } }}\
								<div class="num_box" style="border-top: 1px solid #e8e8e8;">\
									<p class="price">拿货价：<span id="goods-price"></span></p>\
									<div class="btn-area">\
										<div class="whole">\
											<span class="minus gray" id="minus-btn">—</span><span class="value" id="goodsNum">1</span><span class="add" id="add-btn">+</span>\
										</div>\
									</div>\
								</div>\
								<div class="bottom">\
									{{? it.deliver_type == 1}}上级发货{{?}}\
									{{? it.deliver_type == 2}}总部发货{{?}}\
								</div>\
							</div>\
							{{? it.order_des}}\
							<div class="descrip">\
								<p>下单说明</p>\
								<p>{{= it.order_des}}</p>\
							</div>\
							{{?}}\
							<div class="sku_info">\
								{{? it.deliver == "1"}}\
									类型说明：上级发货订单，将由您的上级进行审单，最终由您的上级直接发货到您手中。\
								{{?? it.deliver == "2"}}\
									类型说明：厂家发货订单，将由您的上级和总部进行审单，最终由厂家直接发货到您手中。\
								{{?}}\
							</div>\
							<div class="submit">\
								<span class="jine">订单金额：<i id="totalValue"></i></span>\
								<span class="submit-btn" id="submit-btn">提交订单</span>\
							</div>'
		,'addrTpl': '<span class="logo"></span>\
					<div class="info">\
						<span>{{= it.real_name}}</span>\
						<span>{{= it.mobile}}</span>\
						<span>{{= it.member_address_d_t_o.province}} {{= it.member_address_d_t_o.city}} {{= it.member_address_d_t_o.area}} {{= it.member_address_d_t_o.address}}</span>\
					</div>'
		,'goodsGroupTpl': '{{~ it:item:index}}\
							<span data-id="{{= item.id}}" style="margin: 0 10px;">{{= item.group_name }}</span>\
						{{~}}'
		,'goodsAttrList': '{{~ it:item:index}}\
							<span class="per_attr">{{= item}}</span>\
						{{~}}'
	};
	module.exports = self_tpl;


/***/ }),

/***/ 58:
/***/ (function(module, exports) {

	var searchLayerSelectTpl = '<div class="search-btn" id="search-btn"></div>\
								<div id="search-layer" class="search-layer">\
									<p class="search-title"><span>搜&nbsp;&nbsp;索</span><span class="search-layer-close\
									"></span></p>\
									{{? it.orderType == 2}}\
									<p>&nbsp;&nbsp;&nbsp;提单人：<input type="text" id="member_name" /></p>\
									{{?}}\
									<p>订单类型：\
									<select name="" id="deliverType">\
										<option value="0">全部</option>\
										<option value="1">上级发货</option>\
										<option value="2">总部发货</option>\
									</select></p>\
									<p>开始时间：<input type="text" id="date-begin" /></p>\
									<p>截至时间：<input type="text" id="date-end" /></p>\
									<p class="tool"><span class="search-now" id="search-now">立即查找</span></p>\
								</div>';
	var selectMetaData = {orderType: 1};
	if($('input[name="orderType"]').val() === '2') {
		selectMetaData.orderType = 2;
	}
	function init(pullUpAction) {
		$('body').append(doT.template(searchLayerSelectTpl)(selectMetaData));
		$('#search-btn').click(function() {
			$('.layer-mask').remove();
			$('body').append('<div id="layer-mask" class="layer-mask"></div>');
			$('.layer-mask').show();
			$('#search-layer').show();
			var bodyRect = document.body.getBoundingClientRect();
			var E_float = document.getElementById('search-layer');
			var top = -bodyRect.top;
			var left = -bodyRect.left;
			var iW = window.innerWidth;
			var iH = window.innerHeight;
			var floatRect = E_float.getBoundingClientRect();
			var eW = floatRect.width;
			var eH = floatRect.height;

			E_float.style.top = (0 + (iH - eH) / 2) + 'px';
			E_float.style.left = (0 + (iW - eW) / 2) + 'px';
		});
		//转化时间格式:09/04/2018 ===>2018-09-04
		function formatTime(timeStr) {
			if(timeStr === "") {
				return "";
			}
			var temp = timeStr.split('/');
			return temp[2] + '-' + temp[1] + '-' + temp[0];
		}
		$('#search-now').click(function() {
			var filterCondition = {
				current_page: "1",
				page_size: "20",
				order_type: selectMetaData.orderType + '',
				order_status: $('#nav .active').data('tab') + '',
				deliver_type:  $('#deliverType option:checked').val() != 0 ?  $('#deliverType option:checked').val() : '',
				// deliver_type: '',
				start_time: formatTime($('#date-begin').val()) + " 00:00:00",
				end_time: formatTime($('#date-end').val()) + " 00:00:00",
				member_name: '',
				isAppend: true
			}
			if(selectMetaData.orderType === 2) {
				filterCondition.member_name = $('#member_name').val()
			}
			// $('#nav span').removeClass('active');
			// $('#nav .tab' + filterCondition.order_type).addClass('active');
			$('#order-list').html('');
			pullUpAction(filterCondition);
			$('.layer-mask').hide();
			$('#search-layer').hide();
		});

		$('body').delegate('.search-layer-close', 'click', function() {
			$('.layer-mask').hide();
			$('#search-layer').hide();
		});
		var curr = new Date().getFullYear();
		var opt = {}

		opt.date = {
			preset: 'date'
		};

		opt.datetime = {
			preset: 'datetime',
			minDate: new Date(2012, 3, 10, 9, 22),
			maxDate: new Date(2014, 7, 30, 15, 44),
			stepMinute: 5
		};

		opt.time = {
			preset: 'time'
		};

		opt.tree_list = {
			preset: 'list',
			labels: ['Region', 'Country', 'City']
		};

		opt.image_text = {
			preset: 'list',
			labels: ['Cars']
		};

		opt.select = {
			preset: 'select'
		};
		$('#date-begin').val('').scroller('destroy').scroller($.extend(opt['date'], {
			theme: 'android-ics light',
			mode: 'scroller',
			display: 'modal',
			lang: 'zh'
		}));
		$('#date-end').val('').scroller('destroy').scroller($.extend(opt['date'], {
			theme: 'android-ics light',
			mode: 'scroller',
			display: 'modal',
			lang: 'zh'
		}));
	}
	exports.init = init;

/***/ }),

/***/ 59:
/***/ (function(module, exports, __webpack_require__) {

	// require('../../common/login-status.js').isLogin(function(){require('../../common/rem.js').remSetting();});
	// alert('ok')
	// 仅仅有 物流  发货 详情
	__webpack_require__(7).remSetting();
	var returnPage = __webpack_require__(13);
	// require('../../common/localStorage.js').setItem('login_redirect',location.href);
	var httpURL = __webpack_require__(12);
	if(!httpURL.getQueryString('from')){
		__webpack_require__(16).setItem('login_redirect',location.href+'&from=login');
	}
	if(httpURL.getQueryString('from') != 'login') {
		__webpack_require__(29).redirectByStatusIfUpGradingMyOrderUpGrading();
	}
	var $ajax = __webpack_require__(3);
	var self_tpl = __webpack_require__(57);

	var api_path_config = __webpack_require__(4);
	var order_status = httpURL.getQueryString('order_status');
	if(!order_status) {
		order_status = '0';
	}
	var order_type = httpURL.getQueryString('order_type');
	if(!order_type) {
		order_type = '2';
	}
	$('input[name="orderType"]').val(order_type);
	if(order_type === '1') {
		document.title = '我的订单';
		$('.tab33').show();
	}
	if(order_type === '2') {
		document.title = '团队订单';
		$('.tab31,.tab34').show();
	}
	if(order_status == "0"){
		order_status = "00";
	};
	if(order_status) {
		$('#nav .tab'+ order_status).addClass('active');
	}
	var data,
		myScroll,
		//pullDownEl, pullDownOffset,
		pullUpEl, pullUpOffset,
		generatedCount = 0;

	var filterCondition = {
		current_page: "1",
		page_size: "20",
		order_status: order_status,//订单状态 00-全部 30 -待审单 31-已审单 32-待发货 33-待收货 34 -已发货 35-取消中  36-已取消 37-已完成
		order_type: order_type,//订单类型 1 -我的订单 2-团队订单
		start_time: '',
		end_time: '',
		isAppend: true,
		member_name: '',//提单人
		deliver_type: ''//发货类型 1-上级发货2-总部发货
	}

	pullUpAction(filterCondition);
	function pullUpAction(filterCondition) {
		$ajax.get(null, '006000009', filterCondition, function(data) {
			if(data.success) {
				if(data.data.orderList.length != 0) {
					if(data.data.orderList.length >= 5) {
						$('#pullUp').show();
					}
					$('#nomore-data').hide();
					data.data.order_type = order_type;
					data.data.upload_path = api_path_config.upload_path;
					data.data.audit_status = $("#nav .active").attr("data-tab");
					if(filterCondition.isAppend) {
						$('#order-list').append(doT.template(self_tpl.orderListUpGradingTpl)(data.data));//order_list
					} else {
						$('#order-list').html(doT.template(self_tpl.orderListUpGradingTpl)(data.data));
					}
				} else {
					if(filterCondition.current_page === "1") {
						$('#order-list').html(doT.template(self_tpl.noOrdersTpl)());
					} else {
						if($('#order-list .no-goods').length === 0) {
							$('#nomore-data').show();
						}
					}
					$('#pullUp').hide();
				}
				myScroll.refresh();
			}
		});
	}

	//初始化绑定iScroll控件
	document.getElementById('page1').addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
	// document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
	document.addEventListener('DOMContentLoaded', loaded, false);

	function loaded() {
		// pullDownEl = document.getElementById('pullDown');
		// pullDownOffset = pullDownEl.offsetHeight;
		pullUpEl = document.getElementById('pullUp');
		pullUpOffset = pullUpEl.offsetHeight;

		/**
		 * 初始化iScroll控件
		 */
		myScroll = new iScroll('page1', {
			vScrollbar: false,
			//topOffset : pullDownOffset,
			onRefresh: function() {
				// if (pullDownEl.className.match('loading')) {
				//     pullDownEl.className = '';
				//     pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
				// } else
				if (pullUpEl.className.match('loading')) {
					pullUpEl.className = '';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
				}
			},
			onScrollMove: function() {
				// if (this.y > 5 && !pullDownEl.className.match('flip')) {
				//     pullDownEl.className = 'flip';
				//     pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
				//     this.minScrollY = 0;
				// } else
				if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
					pullUpEl.className = 'flip';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
				}
			},
			onScrollEnd: function() {
				// if (pullDownEl.className.match('flip')) {
				//     pullDownEl.className = 'loading';
				//     pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
				//     pullDownAction();
				// } else
				if (pullUpEl.className.match('flip')) {
					filterCondition.current_page = (parseInt(filterCondition.current_page) + 1) + '';
					pullUpEl.className = 'loading';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
					filterCondition.isAppend = true;
					pullUpAction(filterCondition);
				}
			}
		});
	}
	//
	$(function() {
	    returnPage.returnPageWithUrl("../center-upgrading.html?from=login");
		var hoverSearch = __webpack_require__(58);
	//	var layerMsg = require('../../common/layer.js');
	//	var myLayer = layerMsg;
		hoverSearch.init(pullUpAction);
		$('nav span').click(function() {
			if(!$(this).hasClass('active')) {
				$('#nomore-data').hide();
				$('#order-list').html('');
				filterCondition.current_page = '1';
				filterCondition.order_status = $(this).data('tab')+'';
				filterCondition.isAppend = false;
				pullUpAction(filterCondition);
			}
			$(this).addClass('active').siblings('nav span').removeClass('active');
		});

		// $('body').on('click','.cancel',function(){
		// 	var orderId = $(this).data('id')+'';
		// 	//nopassLayer(orderId, '006000005', true);
		// 	layer.open({
		// 		content: '确定取消该订单？'
		// 		,btn: ['是', '否']
		// 		,yes: function(index){
		// 			$ajax.post(null, '006000005', {order_id: orderId}, function(data) {
		// 				if(data.success){
		// 					layer.close(index);
		// 					location.reload();
		// 				}
		// 			});
		// 		}
		// 	});
		// });
		$('body').on('click','.cancel',function(){
			var orderId = $(this).data('id')+'';
			cancelLayer(orderId, '006000005');
		});
		$('body').on('click','.pass-cancel',function(){
			var orderId = $(this).data('id')+'';
			layer.open({
				content: '确定同意取消该订单？'
				,btn: ['是', '否']
				,yes: function(index){
					$ajax.post(null, '006000002', {order_id: orderId}, function(data) {
						if(data.success){
							layer.close(index);
							layer.open({
								content: "提交成功！"
								,skin: 'msg'
								,time: 2
							});
							setTimeout(function () {
								window.location.href = "my-order.html?from=login&order_type=" + order_type + "&order_status=" + filterCondition.order_status;
						    }, 1000);

							//location.reload();
						}else{
							if(data.msg){
								layer.msg(data.msg.substring(0,40));
							}else{
								layer.msg(data.substring(0,40));
							};
						};
					});
				}
			});
		});
		$('body').on('click','.nopass-cancel',function(){
			var orderId = $(this).data('id')+'';
			nopassLayer(orderId, '006000003');
			// layer.open({
			//     content: '确定不同意取消该订单？'
			//     ,btn: ['是', '否']
			//     ,yes: function(index){
			//         $ajax.post(null, '006000003', {order_id: orderId}, function(data) {
			//             if(data.success){
			//                 layer.close(index);
			//                 location.reload();
			//             }
			//         });
			//     }
			// });
		});
		$('body').on('click','.pass',function(){
			var orderId = $(this).data('id')+'';
			var passText = $(this).data('nopasstext');
			layer.open({
				content: '确定' + passText + '该订单？'
				,btn: ['是', '否']
				,yes: function(index){
					layer.open({
					    type: 2,
					    shadeClose: false,
					    content: '处理中'
					  });
					$ajax.post(null, '006000001', {order_id: orderId}, function(data) {
						layer.closeAll();
						if(data.success){
							// alert('passing');
							// alert('passed have dd...')
							layer.open({
								content: "提交成功!"
								,skin: 'msg'
								,time: 2 //2秒后自动关闭,
								// ,fixed: false
								// ,top: -250
								// ,anim: false
							});
							setTimeout(function () {
								window.location.href = "my-order.html?from=login&order_type=" + order_type + "&order_status=" + filterCondition.order_status;
						    }, 1000);
							//location.reload();
							// location.href = location.href;
							// window.open(location.href, "_self");
							// window.open(location.href);
						} else {
							if(data.msg){
								layer.open({
									content: data.msg.substring(0,40)
									,skin: 'msg'
									,time: 2 //2秒后自动关闭,
									// ,fixed: false
									// ,top: -250
									// ,anim: false
								});
								//layer.msg(data.msg.substring(0,40));
							}else{
								layer.open({
									content: data.substring(0,40)
									,skin: 'msg'
									,time: 2 //2秒后自动关闭,
									// ,fixed: false
									// ,top: -250
									// ,anim: false
								});
								//layer.msg(data.substring(0,40));
							};
	//						if(data.code === '40007' || data.code === '30062'){
	//							layer.close(index);
	//							layer.msg(data.msg);
	//							layer.open({
	//								content: "提交成功！"
	//								,skin: 'msg'
	//								,time: 2
	//							});
	//						}else{
	//							if(data.msg){
	//								layer.msg(data.msg.substring(0,40));
	//							}else{
	//								layer.msg(data.substring(0,40));
	//							};
	//						};
						}
					});
				}
				,no: function(){
					// console.log('ok');
				}
			});
		});
		$('body').on('click','.nopass',function(){
			var orderId = $(this).data('id')+'';
			var nopassText = $(this).data('nopasstext');
			nopassLayer(orderId, '006000004');
			// layer.open({
			//     content: '确定' + nopassText + '该订单？'
			//     ,btn: ['是', '否']
			//     ,yes: function(index){
			//         $ajax.post(null, '006000004', {order_id: orderId}, function(data) {
			//             if(data.success){
			//                 layer.close(index);
			//                 location.reload();
			//             }
			//         });
			//     }
			// });
		});
		$('body').on('click','.getgoods',function(){
			var orderId = $(this).data('id')+'';
			layer.open({
				content: '确定收货？'
				,btn: ['是', '否']
				,yes: function(index){
					$ajax.post(null, '006000010', {order_id: orderId,remarks:""}, function(data) {
						if(data.success){
							layer.open({
								content: "提交成功！"
								,skin: 'msg'
								,time: 2
							});
							setTimeout(function(){
								window.location.href = "my-order.html?from=login&order_type=" + order_type + "&order_status=" + filterCondition.order_status;
							})

							//location.reload();
						}
					});
				}
			});
		});
		function nopassLayer(orderId, reqid, isCancel) {
			$('.layer-mask').remove();
			$('body').append('<div id="layer-mask" class="layer-mask"></div>');
			if(isCancel){
				$('#nopass-layer .nopass-title-1').html('取消理由');
				$('#nopass-layer .nopass-title-2').html('请输入取消理由：');
				$('#nopass-now').html('取消');
			} else {
				$('#nopass-layer .nopass-title-1').html('拒绝理由');
				$('#nopass-layer .nopass-title-2').html('请输入拒绝理由：');
				$('#nopass-now').html('拒绝');
			}
			$('.layer-mask').show();
			$('#nopass-layer').show();
			var bodyRect = document.body.getBoundingClientRect();
			var E_float = document.getElementById('nopass-layer');
			$('#nopass-layer .nopass-now').attr('data-orderid',orderId);
			$('#nopass-layer .nopass-now').attr('data-reqid',reqid);
			var top = -bodyRect.top;
			var left = -bodyRect.left;
			var iW = window.innerWidth;
			var iH = window.innerHeight;
			var floatRect = E_float.getBoundingClientRect();
			var eW = floatRect.width;
			var eH = floatRect.height;

			// E_float.style.top = (top + (iH - eH) / 2) + 'px';
			// E_float.style.left = (left + (iW - eW) / 2) + 'px';
			E_float.style.top = (0 + (iH - eH) / 2) + 'px';
			// E_float.style.left = (0 + (iW - eW) / 2) + 'px';
			if(iW < 750) {
				E_float.style.left = (0 + (iW - eW) / 2) + 'px';
			}
		}

		function cancelLayer(orderId, reqid) {
			$('.layer-mask').remove();
			$('body').append('<div id="layer-mask" class="layer-mask"></div>');
			$('#cancel-layer .cancel-title-1').html('取消理由');
			$('#cancel-layer .cancel-title-2').html('请输入取消理由：');
			$('#cancel-now').html('取消');
			$('.layer-mask').show();
			$('#cancel-layer').show();
			var bodyRect = document.body.getBoundingClientRect();
			var E_float = document.getElementById('cancel-layer');
			$('#cancel-layer .cancel-now').attr('data-orderid',orderId);
			$('#cancel-layer .cancel-now').attr('data-reqid',reqid);
			var top = -bodyRect.top;
			var left = -bodyRect.left;
			var iW = window.innerWidth;
			var iH = window.innerHeight;
			var floatRect = E_float.getBoundingClientRect();
			var eW = floatRect.width;
			var eH = floatRect.height;

			// E_float.style.top = (top + (iH - eH) / 2) + 'px';
			// E_float.style.left = (left + (iW - eW) / 2) + 'px';
			E_float.style.top = (0 + (iH - eH) / 2) + 'px';
			// E_float.style.left = (0 + (iW - eW) / 2) + 'px';
			if(iW < 750) {
				E_float.style.left = (0 + (iW - eW) / 2) + 'px';
			}
		}
		$('#nopass-now').click(function(e) {
			__webpack_require__(38).btnCtrl(e, function(target){
				var orderId = target.data('orderid');
				var requestId = target.data('reqid');
				var nopassReason = $('#nopass-reason').val();
				if(nopassReason === ''){
					$('#operate-tips').html('拒绝原因不能为空');
					return;
				}
				$ajax.post(null, requestId, {order_id: orderId+'', remarks: nopassReason}, function(data) {
					if(data.success){
						$('.layer-mask').hide();
						$('#nopass-layer').hide();
						layer.open({
							content: "提交成功！"
							,skin: 'msg'
							,time: 2
						});
						setTimeout(function () {
							window.location.href = "my-order.html?from=login&order_type=" + order_type + "&order_status=" + filterCondition.order_status;
					    }, 1000);
						//location.reload();
					}else {
						if(data.msg){
							layer.msg(data.msg.substring(0,40));
						}else{
							layer.msg(data.substring(0,40));
						};
					}
				});
			});
		});
		$('#cancel-now').click(function(e) {
			__webpack_require__(38).btnCtrl(e, function(target){
				var orderId = target.data('orderid');
				var requestId = target.data('reqid');
				var nopassReason = $('#cancel-reason').val();
				if(nopassReason === ''){
					$('#operate-cancel-tips').html('取消原因不能为空');
					return;
				}
				$ajax.post(null, requestId, {order_id: orderId+'', cancel_reason: nopassReason}, function(data) {
					if(data.success){
						$('.layer-mask').hide();
						$('#cancel-layer').hide();
						layer.open({
							content: "提交成功！"
							,skin: 'msg'
							,time: 2 
						});
						setTimeout(function () {
							window.location.href = "my-order.html?from=login&order_type=" + order_type + "&order_status=" + filterCondition.order_status;
					    }, 1000);

						//location.reload();
					}
				});
			});
		});
		$('body').delegate('.nopass-layer-close', __webpack_require__(14).getEventType() , function(e) {
			e.preventDefault();
			$('.layer-mask').hide();
			$('#nopass-layer').hide();
		});
		$('body').delegate('.cancel-layer-close', __webpack_require__(14).getEventType() , function(e) {
			e.preventDefault();
			$('.layer-mask').hide();
			$('#cancel-layer').hide();
		});
		// $('body').delegate('.nopass-layer-close', 'touchend', function() {
		// 	$('.layer-mask').hide();
		// 	$('#nopass-layer').hide();
		// });

		$('body').on('click','.express',function(e){
			__webpack_require__(38).btnCtrl(e, function(target){
				var orderId = target.data('orderid')+'';
				var orderType = target.data('ordertype')+'';
				var order_status = target.data('orderstatus')+'';
				var member_id = target.attr('data-member_id')+'';
				$ajax.post(null,'006000008', {order_id: orderId,order_type:orderType,order_status:order_status, member_id: member_id}, function(data) {
					if(data.success){
						if(data.data.orderDetail){
							var expressInfo = data.data.orderDetail;
							location.href = 'https://m.kuaidi100.com/index_all.html?type=' + expressInfo.express_code + '&postid=' + expressInfo.express_no + '&callbackurl=' + location.href;
						}
					}
				});
			})
		});
	});



/***/ })

/******/ });