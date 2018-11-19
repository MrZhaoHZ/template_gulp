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

	module.exports = __webpack_require__(68);


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

/***/ 68:
/***/ (function(module, exports, __webpack_require__) {

	var httpURL = __webpack_require__(12);
	if(!httpURL.getQueryString('from')){
	    __webpack_require__(16).setItem('login_redirect',location.href+'?from=login');
	}
	var $ajax = __webpack_require__(3);
	var self_tpl = __webpack_require__(57);
	// require('../../common/login-status.js').isLogin(function(){require('../../common/rem.js').remSetting();});
	__webpack_require__(7).remSetting();
	if(httpURL.getQueryString('from') != 'login') {
	    __webpack_require__(29).redirectByStatus();
	}
	var api_path_config = __webpack_require__(4);
	var data,
	    myScroll,
	    //pullDownEl, pullDownOffset,
	    pullUpEl, pullUpOffset,
	    generatedCount = 0;
	// function pullDownAction () {
	//     $.getJSON('/uploads/rs/200/ptvnx6ur/test.json', function (data, state) {
	//     });
	// }
	var filterCondition = {
	    "current_page": "1",
	    "page_size": "20",
	    "isAppend": true
	}
	// pullUpAction(filterCondition);
	function pullUpAction() {
	     $ajax.post(null, "002000004", filterCondition, function(data){
	        if (data.success) {
	            if(data.data) {
	                data.data.image_prefix = api_path_config.upload_path;
	                if(data.data.item_sku_d_t_os && data.data.item_sku_d_t_os.length >= 5) {
	                    $('#pullUp').show();
	                }
	                $('#nomore-data').hide();
	                if(filterCondition.isAppend) {
	                    $('#goods-list').append(doT.template(self_tpl.goodsListTpl)(data.data));
	                } else {
	                    $('#goods-list').html(doT.template(self_tpl.goodsListTpl)(data.data));
	                }
	            } else {
	                if(filterCondition.current_page === "1") {
	                    $('#goods-list').html(doT.template(self_tpl.noGoodsTpl)());
	                } else {
	                    $('#nomore-data').show();
	                }
	                $('#pullUp').hide();
	            }
	            myScroll.refresh();
	            // $('#goods-list').css({"min-height":($('#page1').innerHeight()-$('#nav').innerHeight()-30) + "px"});
	        };
	    });
	};

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
	                pullUpEl.className = 'loading';
	                pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
	                filterCondition.current_page = (parseInt(filterCondition.current_page) + 1) + '';
	                filterCondition.isAppend = true;
	                pullUpAction();
	            }
	        }
	    });
	}
	$(function() {
	    var deliverType = '1';
	    //pullUpAction(deliverType);
	    // $('nav span').click(function() {
	    //     if(!$(this).hasClass('active')) {
	    //         $('#nomore-data').hide();
	    //         $('#order-list').html('');
	    //         filterCondition.current_page = '1';
	    //         filterCondition.order_status = $(this).data('tab')+'';
	    //         filterCondition.isAppend = false;
	    //         pullUpAction(filterCondition);
	    //     }
	    //     $(this).addClass('active').siblings('nav span').removeClass('active');
	    // });
	    $('#nav').on("click", "span",function() {
	        if(!$(this).hasClass('active')) {
	             $('#nomore-data').hide();
	            $('#goods-list').html('');
	            filterCondition.current_page = "1";
	            filterCondition.group_id = $(this).attr("data-id");
	            filterCondition.isAppend = false;
	            pullUpAction();
	        }
	        $(this).addClass('active').siblings('span').removeClass('active');
	    });
	    $("nav div[data-id=2] span").trigger("click");
	    getGroupList();
	    function getGroupList(){
	        $ajax.post(null, '002000005', {}, function(data) {
	            if(data.success){
	                $('#nav').append(doT.template(self_tpl.goodsGroupTpl)(data.data));
	                setTimeout(function(){
	                    $("#nav span:first").trigger("click");
	                },200)
	            };
	        });
	    };
	    
	});


/***/ })

/******/ });