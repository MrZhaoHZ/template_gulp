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

	module.exports = __webpack_require__(19);


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
/* 11 */,
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
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	var httpURL = __webpack_require__(12);
	// if(!httpURL.getQueryString('from')){
	//     require('../../common/localStorage.js').setItem('login_redirect',location.href+'?from=login');
	// }
	var $ajax = __webpack_require__(3);
	var self_tpl = __webpack_require__(20);
	// require('../../common/login-status.js').isLogin(function(){require('../../common/rem.js').remSetting();});
	__webpack_require__(7).remSetting();
	//if(httpURL.getQueryString('from') != 'login') {
	//  require('../../common/agent-status.js').redirectByStatus();
	//}
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
	    "id": "007000007",
	    "page_size": "20",
	    "isAppend": true
	};
	var member_id = $.fn.cookie('member_id');
	var openid = $.fn.cookie('openid');
	filterCondition.open_id = openid;
	filterCondition.act_id = httpURL.getQueryString('act_id')
	 pullUpAction(filterCondition);
	function pullUpAction() {
	     $ajax.ajaxDlGet(null, filterCondition, function(data){
	     	//$.post("/getOrderList.do", function(data) {
	        if (data.success) {
	        	var netData = null;
	        	if(filterCondition.id == "007000007"){
	        		if(data.data.totalAmountStr){
	        			$(".p_num").html("¥" + data.data.totalAmountStr);
	        		}else{
	        			$(".p_num").html("¥" + "0");
	        		}
	            	netData = data.data.datas;
	            }else{
	            	netData = data.data.datas;
	            }
	            if(netData.length !=0) {
	                data.data.image_prefix = api_path_config.upload_path;
	                if(data.data.item_sku_d_t_os && data.data.item_sku_d_t_os.length >= 5) {
	                    $('#pullUp').show();
	                }
	                $('#nomore-data').hide();
	                var it = null;
	                if(filterCondition.id == "007000007"){
	                	data.data.id = "1";
	                	it = data.data;
	                }else{
	                	data.data.id = "2";
	                	it = data.data
	                }
	                if(filterCondition.isAppend) {
	                    $('#goods-list').append(doT.template(self_tpl.goodsListTpl)(it));
	                } else {
	                    $('#goods-list').html(doT.template(self_tpl.goodsListTpl)(it));
	                }
	            } else {
	                if(filterCondition.current_page === "1") {
	                    $('#goods-list').html(doT.template(self_tpl.noGoodsTpl)());
	                } else {
	                	if($("#goods-list .item").length >3){
	                   		$('#nomore-data').show();
	                	}
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
	    $('#nav div').on("click",function() {
	        if(!$(this).hasClass('active')) {
	             $('#nomore-data').hide();
	            $('#goods-list').html('');
	            filterCondition.current_page = "1";
	            filterCondition.id = $(this).attr("data-id");
	            if(filterCondition.id == '007000008'){
	                delete filterCondition.open_id;
	                filterCondition.member_id = member_id;
	            }else{
	                delete filterCondition.member_id;
	                filterCondition.open_id = openid;
	            }
	            filterCondition.isAppend = false;
	            pullUpAction();
	        }
	        $(this).find('span').addClass('active');
	        $(this).siblings().find('span').removeClass('active');
	    });
	    $("#nav div[data-id='2'] span").trigger("click");
	    $("#page1").on("click", "ul li",function(){
	    	var num = $(this).attr("data_num");
	    	var data_num = "";
	    	if(num){
	    		data_num = "&num=" + num;
	    	}
	    	var id = $(this).attr("data_id");
	    	if(id){
	    		window.location.href = "orderDetails.html" + "?order_id=" + id + data_num;
	    	}
	    })
	});


/***/ }),
/* 20 */
/***/ (function(module, exports) {

	var self_tpl = {
		'noGoodsTpl': '<li class="item"">\
						<div class="middle-info">\
							<div class="no-goods">\
								<img class="img_no_goods" src="../../images/nogoods.png" alt="">\
							</div>\
						</div>\
					</li>',
		'goodsListTpl':'{{~ it.datas:item:index }}\
							<li class="item" data_id={{= item.order_id}} data_num={{= item.drai_award || ""}}>\
								<div class="order_left">\
									<p class="top_p">{{= item.activity_name}}</p>\
									<p class="bottom_p">{{= item.start_time}}</p>\
								</div>\
								<div class="order_right">\
									<p>\
										{{? it.id == "2"}}\
											<span class="right_span">{{= item.member_name}}</span>\
											<span class="left_span">推荐人：</span>\
										{{?? it.id == "1"}}\
											<span class="right_span">{{= item.drai_award}}</span>\
										{{?}}\
									</p>\
									<p>\
										<span class="right_span">{{= item.consignee}}</span>\
										<span class="left_span">下单人：</span>\
									</p>\
								</div>\
							</li>\
						{{~}}'
	};
	module.exports = self_tpl;

/***/ })
/******/ ]);