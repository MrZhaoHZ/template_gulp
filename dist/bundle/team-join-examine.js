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

	module.exports = __webpack_require__(82);


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

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {

	var $ajax = __webpack_require__(3);
	var remSetting = __webpack_require__(7).remSetting;
	var layer = __webpack_require__(11);
	var httpURL = __webpack_require__(12);
	var api_path_config = __webpack_require__(4);
	var returnPage = __webpack_require__(13);
	 remSetting();
	//var layer = require('../../common/layer.js');
	$(function() {
		var dictionary = [ "", "审核中", "已拒绝", "审核成功","已拒绝", "原上级审核通过", "原上级审核拒绝", "已取消", "待上级审核", "待平台审核"];
	     var id = httpURL.getQueryString('id');
	     var audit_status = httpURL.getQueryString('audit_status');
	    returnPage.returnPageWithUrl("team-join.html?audit_status=" + audit_status);

	    $('#search-btn').click(function() {
	        // activeLayerIndex = layer.open({
	        //     title: [
	        //         '搜索',
	        //         'background-color: #F2F2F2;'
	        //     ],
	        //     content: '<p>订单类型：<select name="" id="" style="border-radius:5px;width:100px;+"><option value="">请选择</option></select></p><p>开始时间：<input type="text" id="date-select" /></p><p>微信号：youdream</p><p>手机号码：18668069999</p>',
	        //     btn: '立即查找',
	        //     success: function(elem) {
	        //         $('.layui-m-layerchild').append('<div class="layer-close">X</div>');
	        //         $('.layui-m-layercont').css({ 'padding': '20px 30px' });
	        //         $('.layui-m-layerbtn span').css({ 'color': '#fff' });
	        //         $('.layui-m-layerchild h3').css({ 'height': '40px', 'line-height': '40px', 'margin': '0' });
	        //         $('.layui-m-layercont p').css({ 'text-align': 'left' });
	        //         $('#date-select').val('').scroller('destroy').scroller($.extend(opt['date'], {
	        //             theme: 'android-ics light',
	        //             mode: 'scroller',
	        //             display: 'modal',
	        //             lang: 'zh'
	        //         }));
	        //     },
	        //     yes: function() {
	        //         // alert('ok')
	        //     }
	        // });
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
	    $('body').delegate('.search-layer-close', __webpack_require__(14).getEventType(), function(e) {
	    	e.preventDefault();
	        $('.layer-mask').hide();
	        $('#search-layer').hide();
	    });

	    function GetQueryString(name){
	         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	         var r = window.location.search.substr(1).match(reg);
	         if(r!=null)return  unescape(r[2]); return null;
	    };
	    var id = GetQueryString("id");
	    getDate();
	    function getDate(){
	        $ajax.ajaxPost(null, "003000009", {'application_no': id}, 
	            function(data){
	                if (data.code == "10000") {
	                    var item = data.data;
	                    if (item.audit_status == 8) {
	                        $(".next-div").css("display", "block");
	                    };
	                   $("#status").text(dictionary[item.audit_status]);
	                   $("#time").text(item.create_time);
	                   if (item.remark) {
	                        $(".reason").css("display", "block");
	                        $("#refuse").text(item.remark);
	                   };
	                   $("#money").text(item.payment_amount);
	                   if (item.payment_voucher) {
	                        $(".money_info").eq(0).css("display", "block");
	                        $("#money_pic").attr( "src", "" + api_path_config.upload_path_h5 + item.payment_voucher);
	                   };
	                   if (item.picture_front) {
	                        //$(".money_info").eq(1).css("display", "block");
	                        $("#id").text(item.authon_personal_id);
	                        $("#id_pic").attr( "src", "" + api_path_config.upload_path_h5 + item.picture_front);
	                   };
	                   $("#name").text(item.real_name);
	                   $("#for_level").text(item.grade_name);
	                   $("#weChat").text(item.wechat_id);
	                   $("#phone").text(item.mobile);
	                   $("#address").text(item.address);
	                }
	        });
	        // $.post('/getMyTeamMyTeamJoinExamine.do', {   }, 
	        //     function(data){
	        //        var item = data.data[0];
	        //        $("#status").text(item.status);
	        //        $("#time").text(item.time);
	        //        $("#refuse").text(item.refuse);
	        //        $("#name").text(item.name);
	        //        $("#for_level").text(item.for_level);
	        //        $("#weChat").text(item.weChat);
	        //        $("#phone").text(item.phone);
	        //        $("#address").text(item.address);
	        //        $("#money").text(item.money);
	        //        $("#money_pic").attr( "src", item.money_pic);
	        //        $("#id").text(item.id);
	        //        $("#id_pic").attr( "src", item.user_id_pic);
	        // });
	    };
	    $(".click_img").on("click", function(){

	        var src = $(this).attr("src");
	        $(".click_img_box").css("display", "block");
	        $(".click_img_box img").attr("src", src);

	    });
	    $(".click_img_box").on("click", function(){
	        $(".click_img_box").css("display", "none");
	    });
	    var pram = {
	        application_no: id,
	        audit_status: "",
	        remark: ""
	    };
	//  $("#search-now").on("click", function(){
	//      var length = $("#text").val().length;
	//      if (length) {
	//          $('.layer-mask').hide();
	//          $('#search-layer').hide();
	//          pram.remark = $("#text").val();
	//          pram.audit_status = "2";
	//          $ajax.ajaxPost(null, "003000008", pram, 
	//              function(data){
	//                  if (data.success) {
	//                      window.location.href = "team-join.html?audit_status=2";
	//                  };
	//          });
	//      }else{
	//          layer.open("请输入拒绝原因！");
	//      };
	//  });
	    
	   $('#search-now').click(function(e) {
			__webpack_require__(38).btnCtrl(e, function(target){
				var length = $("#text").val().length;
		        if (length) {
		            $('.layer-mask').hide();
		            $('#search-layer').hide();
		            pram.remark = $("#text").val();
		            pram.audit_status = "2";
		            $ajax.ajaxPost(null, "003000008", pram, 
		                function(data){
		                    if (data.success) {
		                    	layer.open("提交成功！");
								setTimeout(function () {
		                        	window.location.href = "team-join.html?audit_status=2";
							    }, 1000);

		                    }else{
								if(data.msg){
									layer.openLongTime(data.msg.substring(0,60));
								}else{
									layer.openLongTime(data.substring(0,60));
								};
							};
		            });
		        }else{
		            layer.open("请输入拒绝原因！");
		        };
			});
		});

	//  $("#pass").on("click", function(){
	//      pram.remark = $("#text").val();
	//      pram.audit_status = "1";
	//       $ajax.ajaxPost(null, "003000008", {application_no: id,audit_status:"1"}, 
	//          function(data){
	//              if (data.success) {
	//                  window.location.href = "team-join.html?audit_status=1";
	//              };
	//      });
	//  });
	    
	    $('#pass').click(function(e) {
			__webpack_require__(38).btnCtrl(e, function(target){
				pram.remark = $("#text").val();
		        pram.audit_status = "1";
		         $ajax.ajaxPost(null, "003000008", {application_no: id,audit_status:"1"}, 
		            function(data){
		                if (data.success) {
		                	layer.open("提交成功！");
							setTimeout(function () {
		                    window.location.href = "team-join.html?audit_status=1";
						    }, 1000);

		                }else{
		                	if(data.code == "30075"){
		                		layer.openLongTime(data.msg);
		                	}else{
		                		if(data.msg){
									layer.openLongTime(data.msg.substring(0,60));
								}else{
									layer.openLongTime(data.substring(0,60));
								};
		                	}
		                	
		                }
		        });
			});
		});
	});



/***/ })

/******/ });