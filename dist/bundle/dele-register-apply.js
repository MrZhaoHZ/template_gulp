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

	module.exports = __webpack_require__(36);


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

/***/ 34:
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

/***/ 35:
/***/ (function(module, exports) {

	module.exports = {
		parse : function(obj) {
			if(typeof obj != 'object') {
	            obj = JSON.parse(obj);
	        }
	        return obj;
		}
	}

/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

	var remSetting = __webpack_require__(7).remSetting;
	var $ajax = __webpack_require__(3);
	var self_tpl = __webpack_require__(34);
	var httpURL = __webpack_require__(12);
	var layer = __webpack_require__(11);
	var string2object = __webpack_require__(35);
	var tmp_path_config = __webpack_require__(4);
	remSetting();
	$(function() {

	  var tpl = '{{~ it.data:item:index }}\
	              <div class="swiper-slide">\
	                <img class="user-pic" src="{{? item.image_uri.indexOf("http") == -1}}{{= it.image_prefix}}{{?}}{{= item.image_uri}}" alt="">\
	              </div>\
	            {{~}}';
	  function carouseImg() {
	    $ajax.ajaxPost(null, "005000001", {},
	      function(data){
	        if (data.success) {
	            data.image_prefix = tmp_path_config.upload_path;
	            $('.swiper-container1 .swiper-wrapper').append(doT.template(tpl)(data));
	            var swiper = new Swiper('.swiper-container1', {
	              pagination: '.swiper-pagination',
	              paginationClickable: true,
	              loop: true,
	              autoplay: 2000,
	              autoplayDisableOnInteraction : false
	            });
	        };
	      });

	    // $ajax.ajaxPost('/commodity/category/list.do',{},function(data){
	    //   if (data.code == "10000") {
	    //     $('.swiper-container1 .swiper-wrapper').append(doT.template(tpl)(data.data));
	    //   };
	    // });
	  };
	  carouseImg();

	  var pram = {
	    open_id: "",
	    agent_grade: "",
	    real_name: "",
	    mobile: "",
	    wechat_id: "",
	    remark: ""
	  };
	  var wxCode = httpURL.getQueryString('code');
	  $ajax.ajaxWxAutho('/wechat/userinfo.do',{code: wxCode},function(data){
	      pram.open_id = data.openid;
	      $.fn.cookie('openid',data.openid);
	      $.fn.cookie('headimgurl',data.headimgurl);
	      $('#user-pic').attr('src',data.headimgurl);
	  });
	    
	    
	     var mySwiper = new Swiper('.choose .swiper-container2', {
	     	nextButton: '.swiper-button-next',
	        prevButton: '.swiper-button-prev',
	        pagination: '.swiper-pagination',
	        slidesPerView: 3,
	        paginationClickable: true,
	        spaceBetween: 30,
	        freeMode: true

	    });
	     $("#swiper-wrapper").on("click",".swiper-slide",function(){
	     	  var index = $(this).index();
	        pram.agent_grade = $(".choose .swiper-slide").eq(index).attr("agent_grade");
	        $(".remark").html($(this).find(".hide_div").html());
	     	  $(".swiper-wrapper .swiper-slide .border").css("display","none");
	     	  $(".swiper-wrapper .swiper-slide").css("border","0.02rem solid #ccc");
	     	  $(this).find(".border").css("display","inline-block");
	     	  $(this).css("border","0.02rem solid #66c300");
	     });
	     var info;
	     getLevelData();
	      function getLevelData(){
	             // 可选代理类型
	          $ajax.ajaxPost(null, "003000017", { member_id: ""}, 
	            function(data){
	              if (data.code == "10000") {
	                  $(".swiper-container2 .swiper-wrapper").html(doT.template(self_tpl.getDeltRegisterApplyTpl)(data.data.des));
	                mySwiper.updateSlidesSize();
	              };
	              if (data.code == "30044" || data.code == "30046" || data.code == "30047" ||data.code == "30048" || data.code == "30049" || data.code == "30050") {
	                layer.open(data.msg);
	              };
	            });
	      };
	      // 数据校验
	      // $("#phone").keyup(function(){
	      //     var phone = $("#phone").val();
	      //     if(!(/^\d{0,11}$/.test(phone))){ 
	      //         $("#phone").val("");
	      //     };
	      //     if ($("#phone").val().length == 11) {
	      //        if(!(/^1[34578]\d{0,9}$/.test(phone))){ 
	      //           $("#phone").val("");
	      //        };
	      //     };
	      // });
	     // $("#name").keydown(function(){
	     //    var name = $("#name").val();
	     //    if(!(/^[\u4e00-\u9fa5]$/.test(name))){ 
	     //            $("#name").val("");
	     //         };
	     // });
	      // 收集数据
	      $(".next").on("click", function(){
	           pram.open_id = "wxfjc123";
	          collect();
	          if (msg) {
	            layer.open(msg);
	            return;
	          };
	          $ajax.ajaxPost(null, "003000025", { mobile: pram.mobile},
	            function(data){
	              	if(data.code == "30065"){
	              		layer.open(data.msg);
	              	};
	              	if(data.code == "30056"){
	              		layer.open(data.msg);
	              	};
	              	if(data.code == "30047"){
	              		layer.open(data.msg);
	              	};
	              	if(data.code == "30049"){
	              		layer.open(data.msg);
	              	};
	                if (data.code == "30066") {
	                   $ajax.ajaxPost(null, "003000021", pram,
	                      function(data){
	                          if (data.success) {
	                          	layer.open("提交成功!");
	                          	setTimeout(function(){
	                          		WeixinJSBridge.call('closeWindow');
	                          	},1000);
	                          	
	                          };
	                    });
	                };
	          });
	          
	      });
	      var msg = "";
	      function collect() {
	          msg = "";
	          if (!pram.agent_grade) {
	            msg = "请选择代理类型";
	            return;
	          }
	          pram.real_name = $("#name").val().trim();
	          if (!pram.real_name) {
	            msg = "请输入姓名";
	            return;
	          } else if(pram.real_name.length <2){
	            msg = "姓名不可小于2位";
	            return;
	          };
	//       if(!(/^[\u4e00-\u9fa5]+$/.test(pram.real_name))){ // 只能输入汉字
	//            $("#name").val("");
	//            msg = "姓名仅支持汉字";
	//            return;
	//      };
	          pram.mobile = $("#phone").val().trim();
	          // if (!pram.mobile) {
	          //   msg = "请输入手机号";
	          //   return;
	          // };
	          
	         if(!(/^1[34578]\d{9}$/.test(pram.mobile))){ 
	            $("#phone").val("");
	            msg = "请输入11位手机号码";
	            return;
	         };
	          
	          pram.wechat_id = $("#weChat").val().trim();
	          if (!pram.wechat_id) {
	            msg = "请输入微信号";
	            return;
	          };
	          if(pram.wechat_id.length <6){
	            msg = "请输入6-15位微信号!";
	            return;
	          };
	          var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
	          if(reg.test(pram.wechat_id)){
	            msg = "微信号支持数字、英文、特殊字符";
	            return;
	          };
	          pram.remark = $("#remark").val().trim();
	      };
	     
	});

/***/ })

/******/ });