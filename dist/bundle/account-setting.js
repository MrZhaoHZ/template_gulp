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
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	var wxModule = __webpack_require__(2);
	var $ajax = __webpack_require__(3);
	var cookie = __webpack_require__(5);
	var self_tpl = __webpack_require__(6);
	$(function(){
		__webpack_require__(7).remSetting();
		//本人信息
		$ajax.post(null,'004000002',{},function(data){
			if(data.success) {
				$('#myInfo').html(doT.template(self_tpl.mainTpl)(data.data.memberDTO));
				getUpInfo();
				ifSetGesture();
				if(!wxModule.isWX()) {
					$('#logout').show();
					$('#gesture-setting').hide();
					$('#myInfo').on('click','#logout',function(){
						logout();
					});
				}
			}
		});
		function logout(){
			$ajax.ajaxPost('/logout.do','',{},function(data){
				if(data.success) {
					cookie.removeCookie();
					location.href = 'pwd-login.html';
				}
			});
		}
		var upLevelInfo;
		var activeLayerIndex = null;
		//上级
		function getUpInfo(){
			$ajax.ajaxPost(null, '003000023', {}, function(data) {
				if(data.success){
					upLevelInfo = data.data;
					
					if(data.data.grade_name != "公司"){
						$('#my-up').html(data.data.real_name + ' >');
						$('#myInfo').on('click','#my-up',function(){
							// activeLayerIndex = layer.open({
							// 	title: [
							// 		'我的上级',
							// 		'background-color: #F2F2F2;'
							// 	]
							// 	// ,content: '<p>姓名：吕小小小</p><p>等级：合伙人</p><p>微信号：youdream</p><p>手机号码：<span id="up-phone">18668069999</span></p>'
							// 	,content: doT.template(self_tpl.myUpTpl)(upLevelInfo)
							// 	,btn: '电话呼叫'
							// 	,success: function(elem){
							// 		$('.layui-m-layerchild').append('<div class="layer-close">X</div>');
							// 		$('.layui-m-layercont').css({'padding':'20px 30px'});
							// 		$('.layui-m-layerbtn span').css({'color':'#fff'});
							// 		$('.layui-m-layerchild h3').css({'height':'40px','line-height':'40px'});
							// 	},yes:function(){
							// 		window.location.href = "tel:" + $('#up-phone').html();
							// 	}
							// });
							$('#myup-layer').html(doT.template(self_tpl.myUpTpl)(upLevelInfo));
							$('.layer-mask').remove();
							$('body').append('<div id="layer-mask" class="layer-mask"></div>');
							$('.layer-mask').show();
							// $('#seeresult').html('&nbsp;');
							$('#myup-layer').show();
							var bodyRect = document.body.getBoundingClientRect();
							var E_float = document.getElementById('myup-layer');
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
						});
					} else {
						$('#my-up').html(data.data.real_name);
					}
				}
			});
		}
		
		$('body').delegate('.myup-layer-close', 'click', function() {
			$('.layer-mask').hide();
			$('#myup-layer').hide();
		});
		$('body').delegate('.myup-layer-close', 'touchend', function() {
			$('.layer-mask').hide();
			$('#myup-layer').hide();
		});

		$('body').delegate('#call-now', 'click', function() {
			window.location.href = "tel:" + $('#up-phone').html();
		});

		function ifSetGesture() {
			$ajax.post(null,'004000004',{open_id: $.fn.cookie('openid')},function(data){
				if(data.success) {
					if(data.data.have === 1) {
						$('#gesture-setting').html('修改 >');
						$('#gesture-setting').attr('href', 'reset-gesture-s1.html');
					}
				}
			});
		}
		
	});


/***/ }),
/* 2 */
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
/* 3 */
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
/* 4 */
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
/* 5 */
/***/ (function(module, exports) {

	function removeCookie() {
	    $.fn.cookie('member_id',null);
	    $.fn.cookie('login_name',null);
	}
	exports.removeCookie = removeCookie;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

	var self_tpl = {
		'mainTpl':'<div class="blk">\
						<span>我的上级</span>\
						<span id="my-up" class="gray"></span>\
					</div>\
					<div class="blk">\
						<span>授权姓名</span>\
						<span class="gray">{{= it.real_name}}</span>\
					</div>\
					<div class="blk">\
						<span>授权微信</span>\
						<span class="gray">{{= it.wechat_id || ""}}</span>\
					</div>\
					<div class="blk">\
						<span>注册手机</span>\
						<span class="gray">{{= it.mobile}}</span>\
					</div>\
					<div class="blk">\
						<span style="position: relative;top: 10px;">收货地址</span>\
						<span class="gray">\
						<p><span>{{= it.member_address_d_t_o.province}} {{= it.member_address_d_t_o.city}} {{= it.member_address_d_t_o.area}}</span></p><p><span>{{= it.member_address_d_t_o.address}}</span></p>\
						</span>\
					</div>\
					<div class="blk">\
						<span>手势密码</span>\
						<a class="blk-a" href="setting-gesture.html" id="gesture-setting">设置 ></a>\
					</div>\
					<div class="blk">\
						<span>登陆密码</span>\
						<a class="blk-a" href="reset-pwd.html">修改 ></a>\
					</div>\
					<div class="blk main" id="logout" style="display: none;">\
						退出帐号\
					</div>'
		,'myUpTpl': '<p class="myup-title"><span>我的上级</span><span class="myup-layer-close"></span></p>\
					    <p>姓名：{{= it.real_name}}</p>\
					    <p>等级：{{= it.grade_name}}</p>\
					    <p>微信号：{{= it.wechat_id}}</p>\
					    <p>手机号码：<span id="up-phone">{{= it.mobile}}</span></p>\
					    <p class="tool"><span class="myup-now" id="call-now">电话呼叫</span></p>'
	};
	module.exports = self_tpl;

/***/ }),
/* 7 */
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


/***/ })
/******/ ]);