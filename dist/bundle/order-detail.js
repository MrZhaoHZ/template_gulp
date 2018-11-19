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

	module.exports = __webpack_require__(63);


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

/***/ 63:
/***/ (function(module, exports, __webpack_require__) {

	var api_path_config = __webpack_require__(4);
	var returnPage = __webpack_require__(13);
	$(function() {
		__webpack_require__(7).remSetting();
		var self_tpl = __webpack_require__(64);
	    var $ajax = __webpack_require__(3);
	    var httpURL = __webpack_require__(12);
	    var orderId = httpURL.getQueryString('orderId');
	    var orderType = httpURL.getQueryString('orderType');
	    var order_status = httpURL.getQueryString('order_status');
	    var audit_status = httpURL.getQueryString('audit_status');
	    var member_id = httpURL.getQueryString('member_id');
	    
	    var isSendPage = httpURL.getQueryString('isSend');
	    var from = httpURL.getQueryString('from');
	    if(from == "upGrading"){// 升级中
	    	returnPage.returnPageWithUrl("my-order-upgrading.html?from=login&order_type=" + orderType + "&order_status=" + audit_status );
	    	$(".center-home").attr('href','../center-upgrading.html?from=login');
	    }else{
	    	returnPage.returnPageWithUrl("my-order.html?from=login&order_type=" + orderType + "&order_status=" + audit_status );
	    }
	    //个人信息
	    // $ajax.ajaxPost(null, '004000002', {}, function(data) {
	    //     if(data.success){
	    //         $('#address-container').html(doT.template(self_tpl.addrTpl)(data.data));
	    //     }
	    // });
	    $ajax.post(null,'006000008', {order_id: orderId,order_type:orderType,order_status:order_status,member_id:member_id}, function(data) {
	        if(data.success){
	        	data.data.orderDetail.orderType = orderType;
	            data.data.isSendPage = isSendPage;
	            $('#address-container').html(doT.template(self_tpl.addrTpl)(data.data.orderDetail));
	        	$('#order-goods').before(doT.template(self_tpl.orderCancelExpressTpl)(data.data));
	            data.data.orderDetail.upload_path = api_path_config.upload_path;
	            $('#order-goods').html(doT.template(self_tpl.orderGoodsTpl)(data.data.orderDetail));
	        	$('#order-goods').after(doT.template(self_tpl.submitPersonTpl)(data.data.orderDetail));
	        	$('#process-step').html(doT.template(self_tpl.orderProcessTpl)(data.data.orderAudits));
	        	$('#order-process').after(doT.template(self_tpl.orderOtherTpl)(data.data.orderDetail));
	        }
	    });

	    $('body').on(__webpack_require__(14).getEventType(),'#send-goods-btn',function(e){
	        __webpack_require__(38).btnCtrl(e, function(){
	            $ajax.post(null,'006000011', {order_id: orderId,order_type:orderType,express_no:$('#express_no').val(),express_code:$('#expressSelect option:selected').val(),express:$('#expressSelect option:selected').text()}, function(data) {
	                if(data.success){
	                    location.href = 'my-order.html?from=login&order_type=' + orderType + '&order_status=00';
	                }
	            });
	        });
	    });
	});



/***/ }),

/***/ 64:
/***/ (function(module, exports) {

	var self_tpl = {
		'addrTpl': '<span class="logo"></span>\
					<div class="info">\
						<span>{{= it.member_name}}</span>\
						<span>{{= it.mobile}}</span>\
						<span>{{= it.address}}</span>\
					</div>'
		,'orderCancelExpressTpl' : '{{? it.orderDetail.order_status==36 || it.orderDetail.order_status==38 || it.orderDetail.order_status==39}}\
									<div class="blk reason" id="cancel-reason">\
										<span class="key">{{? it.orderDetail.order_status==38}}拒绝原因：{{?}}{{? it.orderDetail.order_status==36||it.orderDetail.order_status==39}}取消原因：{{?}}</span>\
										<span class="value">{{? it.orderDetail.order_status==38}}{{= it.orderDetail.reject_reason}}{{?}}{{? it.orderDetail.order_status==36 || it.orderDetail.order_status==39}}{{= it.orderDetail.cancel_reason}}{{?}}</span>\
									</div>\
									{{?}}\
									{{? it.isSendPage=="true"}}\
									<div class="blk express" id="express-form">\
										<div class="form-item">\
											<span class="key">物流公司：</span>\
											<span class="value">\
												<select name="" id="expressSelect">\
													{{~ it.expressConfigDTOS:item:index }}\
													<option value="{{= item.express_code}}">{{= item.express_name}}</option>\
													{{~}}\
												</select>\
											</span>\
										</div>\
										<div class="form-item">\
											<span class="key">物流单号：</span>\
											<span class="value">\
												<input type="text" placeholder="请输入物流单号" id="express_no">\
											</span>\
										</div>\
										<div class="send">\
											<span id="send-goods-btn">发货</span>\
										</div>\
									</div>\
									{{?}}'
		,'orderGoodsTpl' : '<div class="title">\
							{{? it.order_status==29}}待审单\
							{{?? it.order_status==30}}待审单\
							{{?? it.order_status==31}}已审单\
							{{?? it.order_status==32}}待发货\
							{{?? it.order_status==34}}已发货\
							{{?? it.order_status==33}}待收货\
							{{?? it.order_status==35}}取消中\
							{{?? it.order_status==36}}已取消\
							{{?? it.order_status==39}}强制取消\
							{{?? it.order_status==37}}已完成\
							{{?? it.order_status==38}}已拒绝\
							{{?}}(\
							{{? it.deliver_type==1}}上级发货\
							{{?? it.deliver_type==2}}总部发货\
							{{?}})\
							</div>\
							<div class="ctrl">\
								<img src="{{= it.upload_path}}{{= it.sku_image_url}}" alt="">\
								<div class="about">\
									<p class="goods-name">{{= it.sku_name}}</p>\
									<p class="guige">规格：{{= it.sku_specs}}</p>\
								</div>\
								<div class="price">\
									<p>{{= it.wechat_price}}</p>\
									<p class="num">x{{= it.count}}</p>\
								</div>\
							</div>'
		,'orderProcessTpl' : '<section id="cd-timeline-{{= it.length}}" class="cd-container-normal">\
								{{~ it:item:index }}\
								<div class="cd-timeline-block">\
									<div class="cd-timeline-img cd-picture"></div>\
									<div class="cd-timeline-content">\
										<p class="detail">\
											<span class="name" id="superior">{{= item.handle_time}}&nbsp;</span>\
											<span class="status" id="superior_state">{{? item.status==5 || item.status==6}}已拒绝{{?? item.status==10 || item.status==11}}待审核{{??}}{{= item.remarks}}{{?}}</span>\
										</p>\
										<p class="time" id="time1">{{= item.member_name}}({{= item.grade_name}})</p>\
									</div>\
								</div>\
								{{~}}\
							  </section>'
		,'orderOtherTpl' : '<div class="blk" style="margin-top: 0.2rem;">\
								<span class="key">订单合计：</span>\
								<span class="value">￥{{= it.total_amount}}</span>\
							</div>\
							{{? it.order_status==33 || it.order_status==34 || it.order_status==37}}\
							<div class="blk">\
								<span class="key">物流公司：</span>\
								<span class="value">{{= it.express}}</span>\
							</div>\
							<div class="blk">\
								<span class="key">物流单号：</span>\
								<span class="value">{{= it.express_no}}</span>\
							</div>\
							{{?}}\
							<div class="blk">\
								<span class="key">订单编号：</span>\
								<span class="value">{{= it.order_sn}}</span>\
							</div>\
							<div class="blk">\
								<span class="key">下单时间：</span>\
								<span class="value">{{= it.order_time}}</span>\
							</div>'
		,'submitPersonTpl': '<div class="blk submit-person"><span class="key">提单人：</span><span class="value">{{= it.member_name}}({{= it.grade_name}})</span></div>'
	};
	module.exports = self_tpl;


/***/ })

/******/ });