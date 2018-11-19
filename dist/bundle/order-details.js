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

	module.exports = __webpack_require__(60);


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
			location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + api_path_config.appid + '&redirect_uri=http%3A%2F%2F' + api_path_config.wxdomain + '%2Fwechat_web%2Fwechat%2FwxAutho.do%3Fredirect_url%3Dhttp%253A%252F%252F' + api_path_config.wxdomain + '%252Fhtml%252Fwx-login.html&response_type=code&scope=snsapi_userinfo';
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
	        url: "http://dltest1.yyzws.com/dl_gateway_web/gate.do",
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


/***/ }),

/***/ 4:
/***/ (function(module, exports) {

	module.exports = {
		"api_path_1": "http://bss.yyzws.com/leaf_manager_web",				
		"api_path_actDra": "http://img.yyzws.com/ex/",				
		"api_path_2": "http://sso.yyzws.com/leaf_sso_web",				
		"api_path_3": "http://gateway.yyzws.com/mobile_gateway_web",				
		"api_path_4": "http://wx.yyzws.com/wechat_web",				
		"static_path": "http://statictest.yyzws.com",				
		"upload_path": "http://img.yyzws.com/ex/",				
		"upload_path_h5": "http://img.yyzws.com/in/",				
		"wxdomain": "wx.yyzws.com",				
		"msgReq": "/message/secondsTickSendSms.do",				
		"appid": "wx30db8983c5c73842",				
		"secret": "d92a2568e9c00e005c26ebbad35c8be4",				
		"wxQrcode": "yyz_qrcode.jpg"
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

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

	var $ajax = __webpack_require__(3);

	function weixinShareTimeline(data,callbacks){
		callbacks = callbacks||{};
		wx.onMenuShareTimeline({
			title:data.title,
			link:data.link,
			imgUrl:data.imgUrl,
			trigger:function(res){
				callbacks.trigger&&callbacks.trigger(res)
			},
			success:function(res){callbacks.success&&callbacks.success(res)},
			cancel:function(res){callbacks.cancel&&callbacks.cancel(res)},
			fail:function(res){callbacks.fail&&callbacks.fail(res)}
		})
	}
	function weixinSendAppMessage(data,callbacks){
		// alert('in weixinSendAppMessage...');
		callbacks=callbacks||{};
		wx.onMenuShareAppMessage({
			title:data.title,
			desc:data.desc,
			link:data.link,
			imgUrl:data.imgUrl,
			trigger:function(res){
				// alert('trigger in...')
				callbacks.trigger&&callbacks.trigger(res)
			},
			success:function(res){
				// alert('success in....');
				// alert(res);
				callbacks.success&&callbacks.success(res);
			},
			cancel:function(res){callbacks.cancel&&callbacks.cancel(res)},
			fail:function(res){callbacks.fail&&callbacks.fail(res)}
		})
	}

	function weixinShareQQ(data,callbacks){
		callbacks=callbacks||{};
		wx.onMenuShareQQ({
			title:data.title,
			desc:data.desc,
			link:data.link,
			imgUrl:data.imgUrl,
			trigger:function(res){
				callbacks.trigger&&callbacks.trigger(res)
			},
			success:function(res){
				callbacks.success&&callbacks.success(res)
			},
			cancel:function(res){
				callbacks.cancel&&callbacks.cancel(res)
			},
			fail:function(res){
				callbacks.fail&&callbacks.fail(res)
			}
		})
	}
	function weixinShareWeibo(data,callbacks){
		callbacks=callbacks||{};
		wx.onMenuShareWeibo({
			title:data.title,
			desc:data.desc,
			link:data.link,
			imgUrl:data.imgUrl,
			trigger:function(res){
				callbacks.trigger&&callbacks.trigger(res)
			},
			success:function(res){
				callbacks.success&&callbacks.success(res)
			},
			cancel:function(res){
				callbacks.cancel&&callbacks.cancel(res)
			},
			fail:function(res){
				callbacks.fail&&callbacks.fail(res)
			}
		})
	}

	function weixinShareQZone(data,callbacks){
		callbacks=callbacks||{};
		wx.onMenuShareWeibo({
			title:data.title,
			desc:data.desc,
			link:data.link,
			imgUrl:data.imgUrl,
			trigger:function(res){
				callbacks.trigger&&callbacks.trigger(res)
			},
			success:function(res){
				callbacks.success&&callbacks.success(res)
			},
			cancel:function(res){
				callbacks.cancel&&callbacks.cancel(res)
			},
			fail:function(res){
				callbacks.fail&&callbacks.fail(res)
			}
		})
	}

	function init(opts){
		if(!wx)throw"请先加载http://res.wx.qq.com/open/js/jweixin-1.0.0.js";
		var signUrl = opts.url;
		$ajax.ajaxWxAutho('/wechat/getWxConfig.do', {url: location.href}, function(data){
			// lib.WeixinApi.sign = data;
			var data = data.data;
			wx.config({
				debug: opts.debug || !1,
				appId: data.appId,
				timestamp: data.timestamp,
				nonceStr: data.nonceStr,
				signature: data.signature,
				jsApiList:["checkJsApi","onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","hideMenuItems","showMenuItems","hideAllNonBaseMenuItem","showAllNonBaseMenuItem","translateVoice","startRecord","stopRecord","onRecordEnd","playVoice","pauseVoice","stopVoice","uploadVoice","downloadVoice","chooseImage","previewImage","uploadImage","downloadImage","getNetworkType","openLocation","getLocation","hideOptionMenu","showOptionMenu","closeWindow","scanQRCode","chooseWXPay","openProductSpecificView","addCard","chooseCard","openCard"]
			});
			wx.ready(function(){
				opts.ready&&opts.ready.call(null, opts.target)
			});
		});
	}

	var wxShare = {
		version: "1.0.0",
		init: init,
		shareToTimeline: weixinShareTimeline,
		shareToWeibo: weixinShareWeibo,
		shareToFriend: weixinSendAppMessage,
		shareToQQ: weixinShareQQ,
		shareToQZone: weixinShareQZone
	}

	exports.wxShare = wxShare;

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

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * @Author: Jing 
	 * @Date: 2018-03-06 10:21:55 
	 * @Last Modified by: Jing
	 * @Last Modified time: 2018-03-09 15:30:36
	 */
	$(function () {
	    var commonEvent = __webpack_require__(14);
	    var $ajax = __webpack_require__(3);
	    var self_tpl = __webpack_require__(61);
	    var api_path_config = __webpack_require__(4);
	    var wxModule = __webpack_require__(2);
	    var wxShare = __webpack_require__(10).wxShare;
	    var layer = __webpack_require__(11);
	    var remSetting = __webpack_require__(7).remSetting;
	    var httpURL = __webpack_require__(12);
	    var num = httpURL.getQueryString('num');
	    var order_id = httpURL.getQueryString('order_id');
	    // rem适配
	    remSetting();
	    //所需参数
	    var prams = {
	        order_id: order_id
	    };
	    //页面渲染
	    getDataList(prams);
	    function getDataList(prams) {
	        $ajax.ajaxDlGet('008000004', prams, function (data) {
	        // $ajax.ajaxPostAct(null, '008000004', prams, function (data) {
	            if (data.code == "10000" && data.data != null) {
	                $('#info').html(doT.template(self_tpl.orderDetailsTpl)({ data:data.data, path: api_path_config.upload_path, deliver_type: prams.deliver_type}));
	                $("#num").html("￥" + num);
	            } else if (data.data == null) {
	                var html = '<div class = "null_content">空空如也<(ToT)></div>';
	                $('#info').html(html);
	            } else {
	                layer.open(data.msg);
	            }
	        });
	    }
	});


/***/ }),

/***/ 61:
/***/ (function(module, exports) {

	var self_tpl = {
		'orderContentTpl': '{{~ it.data.data:item:index}}\
			{{? item.act_order_details_d_t_o_list}}\
				{{ for(var j=0, len=item.act_order_details_d_t_o_list.length; j<len; j++) { }}\
					<div>\
						<div class= "order-number">\
						订单编号：{{= item.order_sn}}\
						</div >\
						<div class="commodity-details">\
							<div class="headerInfor">\
								<div class="imgInfor">\
									<img src="{{= it.path + item.act_order_details_d_t_o_list[j].image_uri}}" alt="">\
								</div>\
								<div class="inforOr">\
									<p class="color01">\
										<span class="spLeft">{{= item.act_order_details_d_t_o_list[j].item_name}}</span>\
										<span class="spRight">数量 : {{= item.act_order_details_d_t_o_list[j].quantity}}</span>\
									</p>\
									<p class="color02">\
										<span class="spLeft">规格:{{= item.act_order_details_d_t_o_list[j].unit}}</span>\
										<span class="spRight">￥{{= item.act_order_details_d_t_o_list[j].unit_price}}</span>\
									</p>\
								</div>\
							</div>\
						</div>\
						<div class="total-details">\
							<div>\
								合计：￥\
									<span>{{= item.act_order_details_d_t_o_list[j].total_money}}</span>\
							</div>\
							<a href="orderDetails.html?order_id={{= item.act_order_details_d_t_o_list[j].order_id}}"  class="details">\
								详情\
							</a>\
						</div>\
					</div>\
				{{ } }}\
			{{?}}\
		{{~}}',
		'orderDetailsTpl': '\
			<div class="title">\
				<img src="../../images/u2472.png" alt="" >\
				<div>\
					<p>收件人：\
	                    <span>{{= it.data.consignee}}</span> &nbsp;\
	                    <span>{{= it.data.mobile}}</span>\
					</p>\
					<p>收货地址：\
	                    <span>{{= it.data.address}}</span>\
					</p>\
				</div>\
	        </div >\
			<div class="content">\
				<div>\
					<div class="commodity-details">\
						<div class="headerInfor">\
							<div class="imgInfor">\
								<img src="{{= it.path + it.data.image_uri}}" alt="">\
	                        </div>\
							<div class="inforOr">\
								<p class="color01">\
									<span class="spLeft">{{= it.data.item_name}}</span>\
									<span class="spRight">数量 ：1</span>\
								</p>\
								<p class="color02">\
									<span class="spLeft">规格:{{= it.data.unit}}</span>\
									<span class="spRight">￥{{= it.data.unit_price_str}}</span>\
								</p>\
							</div>\
						</div>\
					</div>\
					<div class="order-number">\
						订单奖励：\
	                    <span id="num" class="num"></span>\
					</div>\
					<div class="order-number">\
						订单合计：\
	                    <span>￥{{= it.data.total_amount}}</span>\
					</div>\
					<div class="order-number">\
						订单编号：\
	                    <span>{{= it.data.order_sn}}</span>\
					</div>\
					<div class="order-number">\
						下单时间：\
	                    <span>{{= it.data.order_date}}</span>\
					</div>\
					{{? it.data.order_status ==3}}\
					<div class="order-number">\
						物流公司：\
	                    <span>{{= it.data.express}}</span>\
					</div>\
					<div class="order-number">\
						物流单号：\
	                    <span>{{= it.data.express_no}}</span>\
					</div>\
					{{? }}\
				</div>\
			</div>\
			{{? it.data.order_status ==1}}\
				<div class="footer">\
				<div class="total-details">\
					<div>\
						待发货\
	                </div>\
				</div>\
			</div>\
			{{?? it.data.order_status ==3 }}\
			<div class="footer">\
				<div class="total-details">\
					<div>\
						已发货\
	                </div>\
						<a class="details" href="https://m.kuaidi100.com/index_all.html?type={{= it.data.logistics}}&postid={{= it.data.oddNumber}}" target="_blank">查看物流</a>\
				</div>\
			</div>\
			{{?}}'
	};
	module.exports = self_tpl;

/***/ })

/******/ });