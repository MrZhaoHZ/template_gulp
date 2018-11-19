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

	module.exports = __webpack_require__(48);


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

/***/ 47:
/***/ (function(module, exports) {

	var self_tpl = {
			'getGoodsPaymentDetailTpl': '{{~ it.data:item:index }}\
								<li order_type={{= item.order_type || "-"}} order_status={{= item.order_status || "-"}} order_id={{= item.order_id || "-"}}>\
									<div class="name-per">\
										<div class="left">\
											{{? item.type == 3 || item.type == 6}}\
												<img src="../../images/money.png">\
											{{?? }}\
												<img src="{{= it.path}}{{= item.image_url || ""}}">\
											{{?}}\
										</div>\
										<div class="middle">\
											<span class="span_top">{{= item.amount || ""}}</span>\
											<span class="span_bottom">{{= item.type_name || ""}}</span>\
										</div>\
										<div class="right">\
											<span class="span_top">{{= item.operate_date || ""}}</span>\
											<span class="span_bottom">{{= item.status_name || ""}}</span>\
										</div>\
									</div>\
								</li>\
						{{~}}',
			'getGoodsPaymentExamineTpl': '{{~ it.data:item:index }}\
								<li>\
						<div class="name-per">\
							<p class="p_top">\
								<span class="p_left">状态：</span>\
								{{? it.status == 1}}\
									<span class="p_middle">待审核</span>\
								{{?? it.status == 2}}\
									<span class="p_middle">已审核</span>\
								{{?? it.status == 3}}\
									<span class="p_middle">已取消</span>\
								{{?}}\
								<span class="p_right">{{= item.apply_date}}</span>\
							</p>\
							<div class="content_detail">\
								<div class="left">\
									<img src="{{= item.portrait_uri}}">\
								</div>\
								<div class="middle">\
									<p>\
										<span>姓名：</span>\
										<span>{{= item.real_name}}</span>\
									</p>\
									<p>\
										<span>货款金额：</span>\
										<span>{{= item.topup_amount_d}}</span>\
									</p>\
								</div>\
							</div>\
							<div class="bottom">\
								{{? it.status == 1}}\
									<div class="preding">\
										<span class="span_btn agree" member_id="{{= item.member_id}}" data_id="{{= item.biz_id}}">同意</span>\
										<span class="span_btn refuse" member_id="{{= item.member_id}}" data_id="{{= item.biz_id}}">拒绝</span>\
									</div>\
								{{?? it.status == 3}}\
									<div class="cancel">\
										<p>\
											<span>拒绝原因：</span>\
											<span>{{= item.biz_desc}}</span>\
										</p>\
									</div>\
								{{?}}\
							</div>\
						</div>\
					</li>\
						{{~}}'
	};
	module.exports = self_tpl;


/***/ }),

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

	var remSetting = __webpack_require__(7).remSetting;
	var $ajax = __webpack_require__(3);
	var self_tpl = __webpack_require__(47);
	var myLayer = __webpack_require__(11);
	remSetting();
	var data,
	    myScroll,
	    //pullDownEl, pullDownOffset,
	    pullUpEl, pullUpOffset,
	    generatedCount = 0;
	// function pullDownAction () {
	//     $.getJSON('/uploads/rs/200/ptvnx6ur/test.json', function (data, state) {
	//     });
	// }

	var pram = {
	    "topup_status": "1",
	    "current_page": "1",
	    "page_size": "10"
	};

	function pullUpAction() {
	    $ajax.ajaxPost(null, "001000009", pram, 
	        function(data){
	            if (!data.data.member_account_d_t_o_list && pram.current_page == "1") { // 没有数据
	            	pram.current_page = "0";
	                $(".no_info").css("display", "block");
	            }else if(data.data.member_account_d_t_o_list){ // 有数据的时候
	                $(".no_info").css("display", "none");
	            };
	            if(data.data.member_account_d_t_o_list && data.data.member_account_d_t_o_list.length >=5){
					$("#pullUp").css("display", "block");
				}else{
					$("#pullUp").css("display", "none");
				};
	             
	             if (!data.data.member_account_d_t_o_list && pram.current_page != "1") {
	                $(".pullUpLabel").text("加载完毕！")
	                $(".pullUpIcon").css("display", "none");
	            }else{
	                $(".pullUpLabel").text("上拉加载更多")
	                $(".pullUpIcon").css("display", "block");
	            }
	            if (data.code == "10000") {
	                var status = pram.topup_status;
	                $('#stuList').append(doT.template(self_tpl.getGoodsPaymentExamineTpl)({ data: data.data.member_account_d_t_o_list, status: status}));
	                var current_page = parseInt(pram.current_page) + 1;
	                pram.current_page = current_page.toString();
	               
	            };
				myScroll.refresh();
	           
	    });
	    // $.ajax({
	    //     type: 'POST',
	    //     url: '/getGoodsPaymentExamine.do',
	    //     data: { pram: pram },
	    //     dataType: 'json',
	    //     success: function(data) {
	    //         $('#stuList').append(doT.template(self_tpl.getGoodsPaymentExamineTpl)(data.data));
	    //          myScroll.refresh();
	    //     },
	    //     error: function(xhr, type) {}
	    // });
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
	                pullUpEl.className = 'loading';
	                pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
	                pullUpAction();
	            }
	        }
	    });
	}
	$(function() {
	    // var tpl = '{{~ it:item:index }}\
	    //             <option value="{{= item.id}}">{{= item.category_name}}</option>\
	    //       {{~}}';
	    // function cate() {
	    //     $ajax.ajaxPost('/commodity/category/list.do',{},function(data){
	    //         if (data.code == "10000") {
	    //             $('#goods_cate').append(doT.template(tpl)(data.data.item_category_d_t_os));
	    //         };
	    //     });
	    // };
	    // cate();
	    $('nav span').click(function() {
	        pram.current_page = "1";
	        if($(this).attr("data_val") != 1){
	            $(".preding").css("display", "none");
	        };
	        if($(this).attr("data_val") != 3){
	            $(".cancel").css("display", "block");
	        };
	        $("#stuList li").remove();
	        pram.topup_status = $(this).attr("data_val");
	        $(this).addClass('active').siblings('nav span').removeClass('active');
	        pullUpAction($(this).attr("data_val"));
	    });

	    pullUpAction();

	    var activeLayerIndex = null;
	    $('.content').on('click', '.refuse',function() {
	        refusePram.topup_id = $(this).attr("data_id");
	        refusePram.member_id = $(this).attr("member_id");
	        $('.layer-mask').remove();
	        $(".text").val("");
	        $('body').append('<div id="layer-mask" class="layer-mask"></div>');
	        $('.layer-mask').show();
	        $('#search-layer-refuse').show();
	        var bodyRect = document.body.getBoundingClientRect();
	        var E_float = document.getElementById('search-layer-refuse');
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

	        E_float.style.top = (top + (iH - eH) / 2) + 'px';
	        E_float.style.left = (left + (iW - eW) / 2) + 'px';
	    });

	    $('body').delegate('.search-layer-close',  __webpack_require__(14).getEventType(), function(e) {
	    	e.preventDefault();
	        $('.layer-mask').hide();
	        $('#search-layer').hide();
	        $('#search-layer-refuse').hide();
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

	    var refusePram = {
	        biz_desc: "",
	        member_id: "",
	        topup_id: ""
	    }
	//  $("#confirm").on("click", function(){
	//      var length = $(".text").val().length;
	//      if (length > 0) {
	//          $('.layer-mask').hide();
	//          $('.search-layer').hide();
	//          refusePram.biz_desc = $(".text").val();
	//          $ajax.ajaxPost(null, "001000011", refusePram, 
	//              function(data){
	//                  if (data.code == "10000") {
	//                      pram.topup_status = 3;
	//                      $("nav span[data_val=" +pram.topup_status + "]").trigger("click");
	//                  };
	//          });
	//      }else{
	//          layer.open("拒绝原因不能为空！");
	//      };
	//  });
	    $('#confirm').click(function(e) {
			__webpack_require__(38).btnCtrl(e, function(target){
				var length = $(".text").val().length;
		        if (length > 0) {
		            $('.layer-mask').hide();
		            $('.search-layer').hide();
		            refusePram.biz_desc = $(".text").val();
		            $ajax.ajaxPost(null, "001000011", refusePram, 
		                function(data){
		                    if (data.code == "10000") {
		                        pram.topup_status = 3;
		                        $("nav span[data_val=" +pram.topup_status + "]").trigger("click");
		                    };
		            });
		        }else{
		            myLayer.open("拒绝原因不能为空！");
		        };
			});
		});
	    $("#search").on("click", function(){
	       pram.topup_status = $("#setection").val();
	       pram.start_time = $("#date-begin").val();
	       pram.end_time = $("#date-end").val();
	       $('.layer-mask').hide();
	        $('#search-layer').hide();
	        $("nav span").eq(pram.topup_status).trigger("click");
	       pullUpAction();
	    });
	    var agreePram = {
	        biz_desc: "",
	        member_id: "",
	        topup_id: ""
	    };
	//  $(".content").on("click", ".agree", function(){
	//      // agreePram.menber = $(this).attr("");
	//      // agreePram.topup_id = $(this).attr("data_id");
	//      agreePram.biz_desc = "";
	//      agreePram.topup_id = $(this).attr("data_id");
	//      agreePram.member_id = $(this).attr("member_id");
	//      $ajax.ajaxPost(null, "001000008", agreePram, 
	//          function(data){
	//              if (data.code == "10000") {
	//                 pram.topup_status = 2;
	//                 $("nav span[data_val=" +pram.topup_status + "]").trigger("click");
	//              };
	//      });
	//  });
	    $('body').on('click','.agree',function(e){
			__webpack_require__(38).btnCtrl(e, function(target){
				agreePram.biz_desc = "";
		        agreePram.topup_id = target.attr("data_id");
		        agreePram.member_id = target.attr("member_id");
		        layer.open({
				    type: 2,
				    shadeClose: false,
				    content: '处理中'
				  });
		        $ajax.ajaxPostTimeoutHandle(null, "001000008", agreePram, 
		            function(data){
		            	layer.closeAll();
		                if (data.code == "10000") {
		                	myLayer.open("提交成功！");
							setTimeout(function () {
	                        	pram.topup_status = 2;
		                   		$("nav span[data_val=" +pram.topup_status + "]").trigger("click");
						    }, 1000);
		               }else{
		                	if(data.msg){
								myLayer.openLongTime(data.msg.substring(0,60));
							}else{
								myLayer.openLongTime(data.substring(0,60));
							};
		                };
	    	        },
	                function(){
	                    myLayer.open("请求超时！");
	                }
	            );
			})
		});
	    $("#home-btn").on("click", function(){
	        window.location.href = "";
	    })
	});


/***/ })

/******/ });