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

	module.exports = __webpack_require__(94);


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

/***/ 94:
/***/ (function(module, exports, __webpack_require__) {

	var wxModule = __webpack_require__(2);
	var remSetting = __webpack_require__(7).remSetting;
	var $ajax = __webpack_require__(3);
	var httpURL = __webpack_require__(12);
	var tmp_path_config = __webpack_require__(4);
	var localStorage = __webpack_require__(16);
	var layer = __webpack_require__(11);
	$(function() {
		if(!wxModule.isWX()) {
			location.href = 'pwd-login.html';
		}
		remSetting(true);
		var fromPage = httpURL.getQueryString('from');
		var wxCode = httpURL.getQueryString('code');
		var openId = null;
		var publicKey = {};
		var  myStatus = 1;
		if(fromPage != 'gesture-login') {
			// $('.Hd').removeClass('Hd');
			$ajax.ajaxWxAutho('/wechat/userinfo.do',{code: wxCode},function(data){
				// $('#user-pic').attr('src',data.headimgurl);
				$('#user-pic').css({'background-image':'url('+data.headimgurl+')'});
				$.fn.cookie('openid',data.openid);
				openId = data.openid;
				$.fn.cookie('headimgurl',data.headimgurl);
				// syncUserLogo(data.headimgurl);
				isAgent(data.openid);
			});
		} else {
			$('#login-btn').click(loginClick);
			$('.Hd').removeClass('Hd');
			// $('#user-pic').attr('src',$.fn.cookie('headimgurl'));
			$('#user-pic').css({'background-image':'url('+$.fn.cookie('headimgurl')+')'});
			isUpGrading($.fn.cookie('openid'));
		}
		function isUpGrading(openid){
			$ajax.post(null,'003000026',{open_id: openid},function(data){
				if( data.code == "30064"){
					//location.href = 'center-upgrading.html?from=login';
					myStatus = 2;
				}
			});
		}
		//判断是否已注册代理/升级审核情况
		function isAgent(openid) {
			$ajax.post(null,'003000026',{open_id: openid},function(data){
				if( data.code == "30064"){
					//location.href = 'center-upgrading.html?from=login';
					myStatus = 2;
					alert("正在升级中！")
					ifSetGesture();
				}
				if( data.code == "30059"){
					__webpack_require__(29).goDeleRegisterUrl(openid);
				}
				if (data.code == "30047" || data.code == "30050" || data.code == "30067" || data.code == "30060") {
					ifSetGesture();
				}
				if (data.code == "30048") { // 能进行注册
					location.href = 'no-register.html';
				}
				if (data.code == "30049") {  // 显示进度条
					location.href = "dele-register-success.html";
				}
				$('#login-btn').click(loginClick);
			});
		}

		//判断有没有设置手势密码
		function ifSetGesture() {
			$ajax.post(null,'004000004',{open_id:$.fn.cookie('openid')},function(data){
				if(data.success) {
					if(data.data.have === 1) {
						location.href = 'gesture-login.html' ;
					} else {
						$('.Hd').removeClass('Hd');
						if(data.data.have != 2) {
							$('#handpattern').show();
						}
					}
				}
			});
		}
		
		// $ajax.post('/getPublicKey.do', {}, function(data) {
		// 	publicKey.publicKeyExponent = data.publicKeyExponent;
		// 	publicKey.publicKeyModulus = data.publicKeyExponent;
		// });
		//同步微信图像
		function syncUserLogo(imgsrc) {
			//$ajax.post('/syncUserLogo',{imgsrc:imgsrc},function(data){});
		}
		function loginClick(){
			// RSAUtils.setMaxDigits(200);
			// var key = new RSAUtils.getKeyPair(publicKey.publicKeyExponent ,"",publicKey.publicKeyModulus);  
			// var enPwd = RSAUtils.encryptedString(key,hex_md5($('#pwd'))); 
			// var openId = 'wx000111';
			if($('#pwd').val() === ''){
				layer.open('请输入登录密码');
				return;
			}
			var enPwd = hex_md5($('#pwd').val()); 
			// var enPwd = $('#pwd').val(); 
			//加密后的
			$ajax.ajaxGet4AuthoCR('/member/login.do',{login_name:$.fn.cookie('openid'), login_pwd:enPwd, login_flag:3},function(data){
				if(data.success) {
					$.fn.cookie('member_id',data.data.member_id);
					$.fn.cookie('login_name',data.data.login_name);
					var login_redirect = localStorage.getItem('login_redirect');
					localStorage.removeItem('login_redirect');
					$ajax.post(null,'003000002',{},function(datas){
							if(datas.success) {
								if(myStatus == 1){
									location.href = 'center.html?from=login';
								}else if(myStatus == 2){
									location.href = 'center-upgrading.html?from=login';
								}
							}else{
								if(datas.msg){
									// layer.open(datas.msg.substring(0,40));
									layer.open(datas.msg.substring(0,40));
								}else{
									// layer.open(datas.substring(0,40));
									// layer.open({content:datas.msg.substring(0,40)});
									layer.open(datas.msg.substring(0,40));
								};
								return;
							}
						});
					
	//				if(login_redirect) {
	//					location.href = login_redirect;
	//				} else {
	//					if(myStatus == 1){
	//						location.href = 'center.html?from=login';
	//					}else if(myStatus == 2){
	//						location.href = 'center-upgrading.html?from=login';
	//					}
	//					
	//				}
				} else {
					if(data.code === '30013' || data.code === '40008' || data.code === '40015'){
						layer.open(data.msg);
					}
				}
			});
		}
		
	});


/***/ })

/******/ });