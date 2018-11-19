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

	module.exports = __webpack_require__(61);


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

/***/ 11:
/***/ (function(module, exports) {

	function open(msg) {
		layer.open({
			content: msg
			,skin: 'msg'
			,time: 2 //2秒后自动关闭,
			// ,fixed: false
			// ,top: -250
			// ,anim: false
		});
	}
	function openLongTime(msg) {
		layer.open({
			content: msg
			,skin: 'msg'
			,time: 5 //2秒后自动关闭,
			// ,fixed: false
			// ,top: -250
			// ,anim: false
		});
	}

	exports.open = open;
	exports.openLongTime = openLongTime;

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

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {

	var $ajax = __webpack_require__(3);
	var commonEvent = __webpack_require__(14);
	var clickType = commonEvent.getEventType;
	var httpURL = __webpack_require__(12);
	var self_tpl = __webpack_require__(57);
	var layer = __webpack_require__(11);
	var remSetting = __webpack_require__(7).remSetting;
	var api_path_config = __webpack_require__(4);
	var specContent = null;
	$(function() {
		var finalSkuId = null;
		remSetting();
		var goodsId = httpURL.getQueryString('id');
		var data_img = httpURL.getQueryString('data_img');
		var spuImgUrl = null;
		var orderConfirmInfo = null;
		var currentClickAttr = null; // 表示当前点击的属性dom
		//个人信息
		$ajax.ajaxPost(null, '004000002', {}, function(data) {
			if(data.success){
				$('#address').html(doT.template(self_tpl.addrTpl)(data.data.memberDTO));
			}
		});
		//下单信息
		var skuInfo = null;
		getOrderDetail("2");
		function getOrderDetail(deliver){
			skuInfo = null;
			$ajax.ajaxPost(null, '002000001', {spu_id: goodsId, deliver_type: deliver}, function(data) {
				if(data.success){
					$(".ctrl, .submit, .sku_info").remove();
					if(!data.data || !data.data.property_d_t_o_list || data.data.property_d_t_o_list.length<0){
						var msg = deliver==1? "没有上级发货！": "没有厂家发货！"
						layer.open(msg);
						
						return;
					};
					var unitInfo = {
						property_id:"2",
						property_name:"单位"
					};
					data.data.property_d_t_o_list.push(unitInfo);
					for(var j=0;j<data.data.item_sku_d_t_o_list.length; j++){
						data.data.item_sku_d_t_o_list[j].reserve0 = data.data.item_sku_d_t_o_list[j].reserve9;
					};
					skuInfo = data.data.item_sku_d_t_o_list;
					orderConfirmInfo = data.data;
					data.data.image_prefix = api_path_config.upload_path;
					data.data.deliver = deliver;
					$('body').append(doT.template(self_tpl.orderConfirmTpl)(data.data));
					$(".ctrl img").attr("data_id", data.data.id);
					$(".ctrl img").attr("src", data_img);
					$("#avaliable_amount").text(data.data.avaliable_amount);
					var attrNameDoms = $(".ctrl .attr_left");
					var attrValueDoms = $(".ctrl .attr_right");
					for(var i=0; i<attrNameDoms.length; i++){
						var currentNameDom = attrNameDoms.eq(i);
						var attrValueDom = attrValueDoms.eq(i); // 要写入的属性dom
						var id = parseInt(currentNameDom.attr("data_id")) -2;// id -2  是为了获取对应的属性值的编号  （相差2）
						if(id == 0){ // 专门为单位的展示做处理
							id = 9;
						};
						attrValueDom.html(doT.template(self_tpl.goodsAttrList)(data.data["reserve" + id + "_list"]));
					};
					if($('#avaliable_amount').html() === '0.00'){
						$('#submit-btn').addClass('gray');
					};
					spuImgUrl = $(".ctrl img").attr("src");
					specContent = "规格：";
				}
			});
		};
		$('body').on(__webpack_require__(14).getEventType(),'#minus-btn',function(){
			if(parseInt($('#goodsNum').html()) < 2) {
				return;
			}
			$('#goodsNum').html((parseInt($('#goodsNum').html())-1));
			if(parseInt($('#goodsNum').html()) < 2) {
				$('#minus-btn').addClass('gray');
			};
			var perPrice = parseInt($('#goodsNum').html())*100;
			var tmp = perPrice*parseFloat($('#goods-price').html())*0.01.toFixed(2);
			if(!isNaN(tmp)){
				$('#totalValue').html(tmp);
			}else{
				$('#totalValue').html("");
			}
		});
		var attrPram = {};
		var attrArr = []; // 存放所有的有效选择的属性
	 	var skuArr = []; // 存放所有匹配到的sku
	 	$('body').on(__webpack_require__(14).getEventType(),'.attr_box .per_attr',attrClickFun)
		//$("body").on("click", ".attr_box .per_attr", attrClickFun);
	 	function attrClickFun(){
	 		attrArr = [];
	 		skuArr = [];
	 		
	 		currentClickAttr = $(this);
	// 		if(currentClickAttr.attr("data_is_click") == 1){ // 移除事件就是通过data_is_click属性的值来判断的 只有 == 1的时候才移除事件
	// 			return;
	// 		}
	 		$(this).addClass('spanActive').siblings('span').removeClass('spanActive');
	 		// currentClickAttr 就是当前点击的属性span
	 		if(currentClickAttr.hasClass("disClick")){ // 如果点击的时候灰色的属性，则清除除当前点击以外的所有已经选择的属性
	 			$(".per_attr").removeClass("disClick").removeClass("spanActive");
	 			currentClickAttr.addClass("spanActive")
	 		};
	 		getAllSelectedAttr();
	 		// 吧每行对应的选中的属性去掉
	 		var attrDomLen = $(".attr_right").length;
	 		for(var i=0;i< attrDomLen; i++){
	 			var attrArrTmp = attrArr.slice(0);
	 			var numId = parseInt($(".attr_right").eq(i).attr("data_id")) -2 ;
	 			for(var j=0;j<attrArrTmp.length;j++){
	 				if(attrArrTmp[j].index == i){
	 					if(attrArrTmp[j].name == "reserve" + numId ){
							attrArrTmp.splice(j,1);
	 					};
	 				}
	 			}
	 			checkSkuByAttr(attrArrTmp, $(".attr_right").eq(i).attr("data_id"), i); // i代表的是设置第i行的数据
	 		};
	 		//checkSkuByAttr(attrArr);
	 		//collectData();
	 	}
	 	// 根据一个活多个属性值判断 选择出来所有的sku商品添加进入skusArr数组中
	 	var skusArr = [];
	 	function getAllSelectedAttr(){
	 		attrArr = [];
	 		var clickedPerAttr = $(".attr_box");
	 		for(var item=0; item<clickedPerAttr.length; item++){ // 获取了所有已经选中的属性值
	 			if(clickedPerAttr.eq(item).find(".spanActive").text()){
	 				var num = parseInt($(".attr_right").eq(item).attr("data_id")) -2;
	 				var tmp = {};
	 				tmp.name = "reserve" + num;
	 				tmp.val = clickedPerAttr.eq(item).find(".spanActive").text();
	 				tmp.index = item;
	 				attrArr.push(tmp);
	 			};
	 		};
	 		if(attrArr.length != $(".attr_right").length ){
	 			$('#totalValue').html("");
				$("#goods-price").html("");
	 		}
	 	}
	 	function checkSkuByAttr(attrArrTmp , num, index){
	 		checkSkuByAllAttr(attrArrTmp)
	 		var skusArrTmp = skusArr.slice(0)
	 		combinationAttr(skusArrTmp, parseInt(num), index);
	 	};
	 	function checkSkuByAllAttr(attrArrTmp){
	 		skusArr = [];
	 		var flag = 1;
	 		//skuInfo 是所有的sku商品信息
	 		for(var i=0; i<skuInfo.length;i++){
	 			flag = 1;
	 			for(var j=0;j<attrArrTmp.length; j++){
	 				if(attrArrTmp[j].val != skuInfo[i][attrArrTmp[j].name]){
	 					flag = 0; // 不匹配
	 					break;
	 					//skusArr.push(skuInfo[i]);
	 				};
	 			};
	 			if(flag == 1){
	 				skusArr.push(skuInfo[i]);
	 			};
	 		}; // 现在已经选择出了所选择属性对应的所有的sku商品 就装在skusArr数组中。
	 	};
	 	function selectedOverAndSetSkuInfo(){ // 已经选择完所有的属性后设置对应sku的信息。
	 		if(attrArr.length == $(".attr_right").length ){ // 已经选择出来
	 			var data = skusArr[0];
	 			if(!data.sku_price){
	 				layer.open("本商品未设置价格！");
	 			}
	 			$("#goods-price").html(data.sku_price);
				$(".ctrl img").attr("src", api_path_config.upload_path + data.image_uri);
				sku_id = data.sku_id + "";
				finalSkuId = data.id;
				$(".ctrl .guigeleft").html("规格：" + data.unit);
				var tmp = parseInt($('#goodsNum').html())*parseFloat($('#goods-price').html()).toFixed(2);
				if(!isNaN(tmp)){
					$('#totalValue').html(tmp);
					$("#submit-btn").removeClass("gray");
				}else{
					$('#totalValue').html();
					$("#goods-price").html();
				};
	 		}else{
	 			
	 			$(".ctrl .guigeleft").html(specContent);
	 			$(".ctrl img").attr("src", spuImgUrl);
	 			finalSkuId = null;
	 			$("#goods-price").html("");
	 			$('#totalValue').html(tmp);
				$("#submit-btn").addClass("gray");
	 		};
	 	}
	 	var dataArrRepeat = {};
	 	// 根据已经选择的属性从对应的sku中找到了所有对应的属性  并且去重。是要设置置灰的属性信息
	 	function combinationAttr(skusArrTmp, num, index){
	 		// skusArrTmp = []; 所有商品的sku 
	 		// attrArr = []; // 存放所有的有效选择的属性
	 		// 判断 只有在所有sku的数量等于1的时候 并且已经选择的属性的个数等于总属性的个数的时候就标志着已经选择完毕，可以显示价格个sku图片
	 		
	 		dataArrRepeat = {};
	 		for(var i=1;i<=9; i++){
	 			for(var j=0; j<skusArrTmp.length; j++){
	 				var name = "reserve" + i;
	 				if(skusArrTmp[j][name]){
	 					if(!dataArrRepeat[name]){
	 						dataArrRepeat[name] = [];
	 					};
	 					dataArrRepeat[name].push(skusArrTmp[j][name]);
	 				}
	 			};
	 		}; // 已经处理完数据，所有的可用的属性数组。 
	 		
	 		$.each(dataArrRepeat,function(index,item){ // 去重并且赋值
	 			arrNoRepeat(item, index);
	 		});
	 		// 挑选出来要设置的那一行数据
	 		var tmpNum =num -2;
	 		var tmpNum2 = tmpNum;
	 		 var attrValue = {};
	 		 if(tmpNum == 0){
	 		 	tmpNum = 9;
	 		 	tmpNum2 =0;
	 		 };
	 		 
	 		 attrValue["reserve" + tmpNum] = dataArrRepeat["reserve" + tmpNum];
	 		deleAttrAndClick(attrValue,num, index); // dataArrRepeat已经筛选出来的所有的sku对应的属性。 通过deleAttrAndClick函数来设置对应属性的置灰效果
	 	}
	 	// 数组去重，吧属性里边有重复的去掉
	 	function arrNoRepeat(arr, index) {
			var result = []
			for(var i = 0; i < arr.length; i++) {
				if(result.indexOf(arr[i]) == -1) {
					result.push(arr[i])
				}
			}
			dataArrRepeat[index] = result;
		}
	 	// 发送请求 查询价格
	 	var sku_id = "";
	 	var deliver_type = "2";
	 	
	 	function deleAttrAndClick(data, num, index){ // 只会把不符合的条件置灰！
	 		//var clickAttrId = currentClickAttr.parent(".attr_right").attr("data_id");
	 		//var attrNames = $(".attr_left");
	 		var attrValues = $(".attr_right").eq(index).find("span");
	 		var tmpNum = num -2;
	 		for(var i=0;i<attrValues.length; i++){
	 			if(tmpNum == 0){
	 				tmpNum = 9;
	 			}
	 			if($.inArray(attrValues.eq(i).html(), data["reserve" + tmpNum]) == -1){
	 				attrValues.eq(i).addClass("disClick");
	 			}else{
	 				attrValues.eq(i).removeClass("disClick");
	 			}
	 			
	 		}
	 		if( index == $(".attr_right").length -1){
	 			getAllSelectedAttr();
	 			checkSkuByAllAttr(attrArr)
	 			selectedOverAndSetSkuInfo(); // 已经选择完所有的属性后设置对应sku的信息。
	 		}else{
	 			$('#totalValue').html();
				$("#goods-price").html();
	 		}
	 		// 只设置一行的属性
	 		
	 		// 吧所有的属性设置一遍
	// 		for(var i=0; i<attrValues.length; i++){
	// 			var perAttrValueId =  attrValues.eq(i).attr("data_id"); // 属性的序列号
	// 			if(clickAttrId == perAttrValueId){
	// 				continue;
	// 			};
	// 			// 从dada中取出对应的属性数组
	// 			var tmpDataIndex = parseInt(perAttrValueId)-2
	// 			var dataArr = data["reserve" + tmpDataIndex];
	// 			// 判断每一行的属性值是否在数值中;
	// 			var perSpan = attrValues.eq(i).find("span");
	// 			for(var j=0;j<perSpan.length; j++){
	// 				var status = $.inArray(perSpan.eq(j).text(), dataArr); // 返回-1的时候就是没有  否则就是能匹配 现在不用解除事件绑定了
	// 				if(status == -1){ // 数组中不存在,应该置灰 并且移除事件绑定
	// 					//perSpan.eq(j).addClass("disClick").attr("data_is_click", 1);
	// 					perSpan.eq(j).addClass("disClick");
	// 					
	// 				}else{ // 应该去掉置灰 ,添加事件绑定
	// 					//perSpan.eq(j).removeClass("disClick").attr("data_is_click", 0);// 返回-1的时候就是没有  否则就是能匹配 现在不用解除事件绑定了
	// 					perSpan.eq(j).removeClass("disClick")
	// 				}
	// 			}
	// 		};
	 	}
	 	$('body').on(__webpack_require__(14).getEventType(),'nav span',function(e){
	 	//$("body").on("click", "nav span", function(){
	 		 $(this).addClass('active').siblings('span').removeClass('active');
	 		 var attrBoxLen = $(".attr_box").length;
	 		 deliver_type = $("nav .active").attr("data_type");
		 	getOrderDetail(deliver_type);
	 	});

		$('body').on(__webpack_require__(14).getEventType(),'#add-btn',function(){
			$('#goodsNum').html((parseInt($('#goodsNum').html())+1));
			var perPrice = parseInt($('#goodsNum').html())*100;
			var tmp = perPrice*parseFloat($('#goods-price').html())*0.01.toFixed(2);
			$('#minus-btn').removeClass('gray');
			if(!isNaN(tmp)){
				$('#totalValue').html(tmp);
				$("#submit-btn").removeClass("gray");
			}else{
				$('#totalValue').html("");
				$("#submit-btn").addClass("gray");
			}
		});

		$('body').on(__webpack_require__(14).getEventType(),'#submit-btn',function(e){
			__webpack_require__(38).btnCtrl(e, function(){
				if(!$("#totalValue").html()){
					layer.open("请选择特定规格的商品！");
					return;
				};
				var param = {
					sku_id: finalSkuId + "",
					spu_id : goodsId,
					sku_name: orderConfirmInfo.sku_name,
					sku_image_url: orderConfirmInfo.sku_image_url,
					sku_specs: orderConfirmInfo.sku_specs,
					wechat_price: orderConfirmInfo.wechat_price,
					counts: $('#goodsNum').html(),
					deliver_type: deliver_type
				}
				$ajax.ajaxPost(null, '006000007', param, function(data) {
					if(data.success){
						layer.open("提交成功！");
						setTimeout(function () {
							location.href = 'my-order.html?from=login&order_type=1&order_status=00';
					    }, 1000);

					} else {
						if(data.code == "30008"){
							layer.open("库存不足!");
							return;
						}
						if(data.code === '30058' ||data.code === '40009' || data.code === '40007' || data.code === '50003'|| data.code === '50002' || data.code === '40014'|| data.code === '40016'|| data.code === '40010'|| data.code === '30062'){
							layer.open(data.msg);
						}else{
							if(data.msg){
								layer.open(data.msg.substring(0,40));
							}else{
								layer.open(data.substring(0,40));
							};
						};
					}
				});
			});
		});
	});



/***/ })

/******/ });