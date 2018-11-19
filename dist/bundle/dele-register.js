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

	module.exports = __webpack_require__(33);


/***/ }),
/* 1 */,
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
/* 5 */,
/* 6 */,
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


/***/ }),
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
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
/* 12 */
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
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
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
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */
/***/ (function(module, exports) {

	var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	// private method for UTF-8 encoding  
	function _utf8_encode (string) {  
	    string = string.replace(/\r\n/g,"\n");  
	    var utftext = "";  
	    for (var n = 0; n < string.length; n++) {  
	        var c = string.charCodeAt(n);  
	        if (c < 128) {  
	            utftext += String.fromCharCode(c);  
	        } else if((c > 127) && (c < 2048)) {  
	            utftext += String.fromCharCode((c >> 6) | 192);  
	            utftext += String.fromCharCode((c & 63) | 128);  
	        } else {  
	            utftext += String.fromCharCode((c >> 12) | 224);  
	            utftext += String.fromCharCode(((c >> 6) & 63) | 128);  
	            utftext += String.fromCharCode((c & 63) | 128);  
	        }  

	    }  
	    return utftext;  
	}  

	// private method for UTF-8 decoding  
	function _utf8_decode(utftext) {  
	    var string = "";  
	    var i = 0;  
	    var c = c1 = c2 = 0;  
	    while ( i < utftext.length ) {  
	        c = utftext.charCodeAt(i);  
	        if (c < 128) {  
	            string += String.fromCharCode(c);  
	            i++;  
	        } else if((c > 191) && (c < 224)) {  
	            c2 = utftext.charCodeAt(i+1);  
	            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));  
	            i += 2;  
	        } else {  
	            c2 = utftext.charCodeAt(i+1);  
	            c3 = utftext.charCodeAt(i+2);  
	            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));  
	            i += 3;  
	        }  
	    }  
	    return string;  
	} 
	function encode(input){
	    var output = "";  
	    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;  
	    var i = 0;  
	    input = _utf8_encode(input+"");  
	    while (i < input.length) {  
	        chr1 = input.charCodeAt(i++);  
	        chr2 = input.charCodeAt(i++);  
	        chr3 = input.charCodeAt(i++);  
	        enc1 = chr1 >> 2;  
	        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);  
	        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);  
	        enc4 = chr3 & 63;  
	        if (isNaN(chr2)) {  
	            enc3 = enc4 = 64;  
	        } else if (isNaN(chr3)) {  
	            enc4 = 64;  
	        }  
	        output = output +  
	        _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +  
	        _keyStr.charAt(enc3) + _keyStr.charAt(enc4);  
	    }  
	    return output;  
	}

	function decode(input){
	    var output = "";  
	    var chr1, chr2, chr3;  
	    var enc1, enc2, enc3, enc4;  
	    var i = 0;  
	    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");  
	    while (i < input.length) {  
	        enc1 = _keyStr.indexOf(input.charAt(i++));  
	        enc2 = _keyStr.indexOf(input.charAt(i++));  
	        enc3 = _keyStr.indexOf(input.charAt(i++));  
	        enc4 = _keyStr.indexOf(input.charAt(i++));  
	        chr1 = (enc1 << 2) | (enc2 >> 4);  
	        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);  
	        chr3 = ((enc3 & 3) << 6) | enc4;  
	        output = output + String.fromCharCode(chr1);  
	        if (enc3 != 64) {  
	            output = output + String.fromCharCode(chr2);  
	        }  
	        if (enc4 != 64) {  
	            output = output + String.fromCharCode(chr3);  
	        }  
	    }  
	    output = _utf8_decode(output+"");  
	    return output;  
	}
	module.exports = {
	    encode: encode,
	    decode: decode
	}

/***/ }),
/* 31 */,
/* 32 */,
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	var wxModule = __webpack_require__(2);
	var remSetting = __webpack_require__(7).remSetting;
	var localStorage = __webpack_require__(16);
	var $ajax = __webpack_require__(3);
	var localStorage = __webpack_require__(16);
	var layer = __webpack_require__(11);
	var self_tpl = __webpack_require__(34);
	var httpURL = __webpack_require__(12);
	var string2object = __webpack_require__(35);
	var tmp_path_config = __webpack_require__(4);
	remSetting();
	$(function() {
			var upId = httpURL.getQueryString('upId');
			var levelId = httpURL.getQueryString('levelId');

			if (upId === 'null') {
				upId = "1"
			}else{
				upId = __webpack_require__(30).decode(upId);
			};
			var pram = {
				level: "",
				name: ""
			}
			var auth_amount = "";
			$(".swiper-wrapper").on("click",".swiper-slide",function(){
				var index = $(this).index();
				auth_amount = $(this).attr("auth_amount");
				$(".remark").html($(this).find(".hide_div").html());
				pram.name = $(".swiper-slide").eq(index).attr("agent_name");
				pram.level = $(this).attr("agent_grade");
				$(".swiper-wrapper .swiper-slide .border").css("display","none");
				$(".swiper-wrapper .swiper-slide").css("border","0.02rem solid #ccc");
				$(this).find(".border").css("display","inline-block");
				$(this).css("border","0.02rem solid #66c300");
				var height = window.screen.availHeight - $(".container").height() - $(".next-div").height();
				if(height< 0){
					$(".next-div").css("bottom", -$(".container").height() + window.screen.availHeight -$(".next-div").height() -20  + "px");
				}else {
					$(".next-div").css("bottom", "0px");
				};
			 });
			 var info;
			//getData();
			function getData(){
					// 可选代理类型
					$ajax.ajaxPost(null, "003000017", {member_id: upId}, 
						function(data){
							if (data.code == "10000") {
									mySwiper = new Swiper('.swiper-container', {
										nextButton: '.swiper-button-next',
											prevButton: '.swiper-button-prev',
											pagination: '.swiper-pagination',
											slidesPerView: 3,
											paginationClickable: true,
											spaceBetween: 30,
											freeMode: true
									});
									if (levelId && levelId !='null') {
										var index = selectDelegateLevel(levelId, data.data.des);
										var tmp = [];
										//var index = parseInt(levelId) - 1;
										tmp.push(data.data.des[index]);
										$(".swiper-wrapper").html(doT.template(self_tpl.getDeltRegisterTpl)(tmp));
										mySwiper.updateSlidesSize();
										$(".swiper-slide[agent_grade='" + levelId +"']").trigger("click");
										// $(".swiper-slide[agent_grade!='" + levelId +"']").remove();
									}else{
										$(".swiper-wrapper").html(doT.template(self_tpl.getDeltRegisterTpl)(data.data.des));
										mySwiper.updateSlidesSize();
									};
							};
							$(".next-div").css("bottom", "0px");
							if (data.code == "30044" || data.code == "30046" || data.code == "30047" ||data.code == "30048" || data.code == "30049" || data.code == "30050" || data.code == "20002") {
								layer.open(data.msg);
							};
							
							// if (data.code == "10000") {
							//   var data = string2object.parse(data);
							//   info = data.data.des;
							//   $('.swiper-wrapper').append(doT.template(self_tpl.getDeltRegisterTpl)(data.data.grade_name));
							//   mySwiper.updateSlidesSize();
							// };
							
						});
					// 个人中心代理商我的上级信息
					$ajax.ajaxPost(null, "003000016", {member_id: upId}, 
						function(data){
							if (data.code == "10000") {
								$("#superior_name").text(data.data.real_name);
								$("#superior_level").text(data.data.grade_name);
							};
						});
			};
		function selectDelegateLevel (levelId, data){
			var len = data.length;
			for(var i=0; i<len; i++){
				if(data[i].id == levelId){
					return i;
					break;
				}
			}
		};
		var wxPram = {
			code: ""
		};
		wxPram.code = httpURL.getQueryString('code');   // 
		var random_id = httpURL.getQueryString('randomId');
		$.fn.cookie('random_id', random_id);
		// 判断验证码是否注册
		
		var openid = "";
		if (random_id != 'null') {
				wxPram.random_id = random_id;
			};
		// 通过code拿到用户头像 和 opendid 存入cookie。注册成功后删除
		// $.fn.cookie('openid',null);
		// $.fn.cookie('headimgurl',null);
		var openid = $.fn.cookie('openid');
		if(openid){ // 已经获取用户信息  用户刷新页面问题解决
			deleProcess();
		}else{ // 没有获取用户信息
			getUserInfo();
		};
		function getUserInfo (){
			$ajax.ajaxWxAutho('/wechat/userinfo.do', wxPram,function(data){
					if(!data.openid && data.code != "40090"){ // 获取openid失败！
						layer.open("获取openid失败！");
					};
					$.fn.cookie('openid',data.openid);
					$.fn.cookie('headimgurl', data.headimgurl || '../images/default_head_pic.jpg');
					//$('#user-pic').attr('src',data.headimgurl);
					openid = data.openid;
					isDelegate(); // 是否是代理商 是代理上就进入登录页
					if (data.code == "40090") { // 二维码已经被注册过
						$(".enable").css("display", "block");
						$(".enable .enable_prompt").text("代理注册二维码失效");
						return;
					};
					deleProcess();
		 	});
		}
	 	// 有用户头像和openid后的判断流程
	 	function deleProcess(){
	 		$ajax.ajaxPost(null, "004000009", {open_id: openid},
				function(data){
					if(data.success){
						if (data.data) { // 关注过
							isShowProcess();
						}else{ // 没关注公众号
							//$('.container').css("display", "block");
							$(".qr_code").css("display", "block");
							$("#qr_code_img").attr("src", "../images/" + tmp_path_config.wxQrcode);
							return;
						};
					}else{
						layer.open("是否关注公众号获取失败！");
						alert(openid);
					};	
			});
	 	};
	 	function isShowProcess(){ // 判断是否需要展示审核进度
	 		$ajax.ajaxPost(null, "003000026", {open_id: openid},
				function(data){ 
					if(data.success){
						
					} else {
						if (data.code == "30048" || data.code == "30059") { // 能进行注册
							$(".container").css("display", "block");
							$('#user-pic').attr('src', $.fn.cookie('headimgurl'));
							getData();
							if (data.msg !="可以发起注册申请") {  // 被拒绝
								$(".err-warning").css("display", "block");
								$(".warning-bottom").text("原因：" + data.msg);
							};
							return;
						};
						if (data.code == "30049") {  // 显示进度条
							window.location.href = "dele-register-success.html";
							return;
						};
						if (data.code == "30047" || data.code == "30050" || data.code == "30064" || data.code == "30060" ) {  // 注册成功 并且 审核通过 (已经成为代理商)
							window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + tmp_path_config.appid + '&redirect_uri=http%3A%2F%2F' + tmp_path_config.wxdomain + '%2Fwechat_web%2Fwechat%2FwxAutho.do%3Fredirect_url%3Dhttps%253A%252F%252F' + tmp_path_config.wxdomain + '%252Fhtml%252Fwx-login.html&response_type=code&scope=snsapi_userinfo';
							return;
						};
					}
				});
	 	};
	 	function isDelegate(){ // 判断是否是代理商，是代理商就跳转到登陆页面
	 		$ajax.ajaxPost(null, "003000026", {open_id: openid},
				function(data){ 
					if(data.success){
						
					} else {
						if (data.code == "30047" || data.code == "30050" || data.code == "30064" || data.code == "30060" ) {  // 注册成功 并且 审核通过 (已经成为代理商)
							window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + tmp_path_config.appid + '&redirect_uri=https%3A%2F%2F' + tmp_path_config.wxdomain + '%2Fwechat_web%2Fwechat%2FwxAutho.do%3Fredirect_url%3Dhttps%253A%252F%252F' + tmp_path_config.wxdomain + '%252Fhtml%252Fwx-login.html&response_type=code&scope=snsapi_userinfo';
							return;
						};
					}
				});
	 	}
	 	// function isFollowFun (){
	 	// 	$ajax.ajaxPost(null, "004000009", {open_id: openid},
			// 	function(data){
			// 		if (data.data) {
			// 			isNext = 1;
			// 		}else{
			// 			isNext = 2;
			// 		};
			// });
	 	// }
		// localStorage.setItem("openid", "wxopenid123456");
		$("#next").on("click", function(){
			if (pram.name.trim()) {
				localStorage.setItem("apply_level", pram.name);
				// if(pram.level == 2){
				// window.location.href = "dele-register-basic.html?agent_grade=" + pram.level + "&upId=" + upId + "&auth_amount=" + auth_amount;
				// // }else{
					window.location.href = "dele-register-basic.html?agent_grade=" + pram.level + "&upId=" + upId + "&auth_amount=" + auth_amount;
				// }
				
			}else{
				layer.open("请选择代理类型！");
			};
		});
	});

/***/ }),
/* 34 */
/***/ (function(module, exports) {

	var self_tpl = {
		'registerProcessTpl': '{{~ it:item:index }}\
								<div class="cd-timeline-block">\
									{{? item.color == 1}}\
										<div class="cd-timeline-img cd-picture back_color"></div>\
									{{?? }}\
										<div class="cd-timeline-img cd-picture"></div>\
									{{?}}\
									<div class="cd-timeline-content">\
										<p class="detail">\
											<span class="name">{{= item.name}}</span>\
											<span class="status">（{{= item.status}}）</span>\
										</p>\
										<p class="time">{{= item.time}}</p>\
									</div>\
								</div>\
							{{~}}',
		'getDeltRegisterTpl': '{{~ it:item:index }}\
									<div class="swiper-slide" auth_amount={{= item.auth_amount/100}} isNeedIdCard="{{= item.need_i_d_card}}" agent_name="{{= item.name}}"  agent_grade="{{= item.id}}">\
						            	{{= item.name}}\
						            	<div class="hide_div" style="display:none;">{{= item.application_des || ""}}</div>\
						            	<span class="bot border"></span>\
					    				<span class="top border"></span></div>\
								{{~}}',
		'getDeltRegisterApplyTpl': '{{~ it:item:index }}\
									<div class="swiper-slide" isNeedIdCard="{{= item.need_i_d_card}}" agent_grade="{{= item.id}}">\
										{{= item.name}}\
										<div class="hide_div" style="display:none;">{{= item.application_des || ""}}</div>\
						            	<span class="bot border"></span>\
					    				<span class="top border"></span></div>\
								{{~}}',
		'orderProcessTpl' : '<section id="cd-timeline-{{= it.length}}" class="cd-container-normal">\
								{{? it.length>=1}}\
									<div class="cd-timeline-block">\
										<div class="cd-timeline-img cd-picture"></div>\
										<div class="cd-timeline-content">\
											<p class="detail">\
												<span class="name">提交成功</span>\
											</p>\
											<p class="time" id="time2">{{= it[0].create_date || ""}}</p>\
										</div>\
									</div>\
								{{?}}\
								{{? it.length>=2}}\
									<div class="cd-timeline-block">\
										<div class="cd-timeline-img cd-picture"></div>\
										<div class="cd-timeline-content">\
											<p class="detail">\
												<span class="name" id="superior">{{= it[1].name + "(" + it[1].agent_grade_name + ")"}}</span>\
												<span class="status" id="superior_state">&nbsp;&nbsp;&nbsp;{{= it[1].audit_status_name}}</span>\
											</p>\
											<p class="time" id="time1">{{= it[1].create_date || ""}}</p>\
										</div>\
									</div>\
								{{?}}\
								{{? it.length>=3}}\
									<div class="cd-timeline-block">\
										<div class="cd-timeline-img cd-picture"></div>\
										<div class="cd-timeline-content">\
											<p class="detail">\
												<span class="name">总部</span>\
												<span class="status" id="head_state">{{= it[2].audit_status_name }}</span>\
											</p>\
											<p class="time" id="time0">{{= it[2].create_date || ""}}</p>\
										</div>\
									</div>\
								{{?}}\
							</section>'
	};
	module.exports = self_tpl;


/***/ }),
/* 35 */
/***/ (function(module, exports) {

	module.exports = {
		parse : function(obj) {
			if(typeof obj != 'object') {
	            obj = JSON.parse(obj);
	        }
	        return obj;
		}
	}

/***/ })
/******/ ]);