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

	module.exports = __webpack_require__(28);


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
/* 9 */
/***/ (function(module, exports) {

	var self_tpl = {
		'swiperTpl': '<div class="swiper-wrapper">\
						{{~ it.data:item:index }}\
							<div class="swiper-slide"><a href="{{= item.uri}}"><img src="{{? item.image_uri.indexOf("http") == -1}}{{= it.image_prefix}}{{?}}{{= item.image_uri}}"></a></div>\
						{{~}}\
					</div>\
					<div class="swiper-pagination"></div>'
		,'userInfoTpl': '<span style="float:left;display:inline-block;border-radius:1.25rem;;width:1.25rem;;height:1.25rem;background-image:url({{= it.portrait_uri}});background-size: contain;"></span>\
						<div class="info">\
							<p class="name">姓名：{{= it.real_name}}（{{= it.agent_grade_name}}）</p>\
							<p class="uplevel" id="uplevel"></p>\
							<a href="account-setting.html"><span></span></a>\
						</div>'
		,'findResultTpl': '查询结果：\
							{{~ it:item:index }}\
							{{= item.real_name}}({{= item.agent_grade_name}})&nbsp;\
							{{~}}'
		,'actList': '{{~ it:item:index}}\
							<li class="listActN">\
								<div class="listN">\
									<div class="borBox">\
										<span class="actName">{{= item.activityDTO.act_name}}</span>\
										<span class="actStatus">{{= item.activityDTO.act_status_str}}</span>\
									</div>\
								</div>\
								<div class="dailiN">\
									<div class="borBox">\
										<div class="listActBox">\
											<p>准代理数量：<span class="listZhun" actid="{{= item.activityDTO.id}}">{{= item.objectList[0].totalIntentAgent}}</span></p>\
											<p>正式代理数量：<span class="listZheng" actid="{{= item.activityDTO.id}}">{{= item.objectList[0].totalFormalAgent}}</span></p>\
										</div>\
										{{? item.act_status==2}}\
										<p class="caoBox">\
											<input type="text" style="display: none;">\
											<span class="xiangqing" actid="{{= item.activityDTO.id}}">活动详情</span>\
											<span class="fuzhi" actid="{{= item.activityDTO.id}}">复制链接</span>\
										</p>\
										{{?}}\
									</div>\
								</div>\
								<div class="numbox">\
									<div class="numListN">\
										<div class="boxPosi">\
											<div class="headPosi">\
												<span>姓名</span>\
												<span>手机号</span>\
												<span>微信号</span>\
												<span>状态</span>\
											</div>\
											<ul class="scrollbox">\
											</ul>\
										<div>\
									</div>\
								</div>\
							</li>\
						{{~}}'
		,'actListReward': '{{~ it:item:index}}\
								<li class="listActN">\
									<div class="listN">\
										<div class="borBox">\
											<span class="actName">{{= item.acti_name}}</span>\
											{{? item.act_status==1}}<span class="actStatus">未开始</span>\
											{{?? item.act_status==2}}<span class="actStatus">进行中</span>\
											{{?? item.act_status==3}}<span class="actStatus">已撤下</span>\
											{{?? item.act_status==4}}<span class="actStatus">已结束</span>\
											{{?}}\
										</div>\
									</div>\
									<div class="dailiN">\
										<div class="borBox">\
											<div class="listActBox">\
												<p>奖励次数:<span class="listZhun" actid="{{= item.activity_id}}" style="margin-right:10px;">{{= item.total_counts}}</span>奖励总额:<span class="listZheng" actid="">{{= item.total_amount}}</span></p>\
											</div>\
										</div>\
									</div>\
									<div class="numbox">\
										<div class="numListN">\
											<div class="boxPosi">\
												<div class="headPosi">\
													<span>活动名称</span>\
													<span>状态</span>\
													<span>发放时间</span>\
													<span>数额</span>\
												</div>\
												<ul class="scrollbox">\
												</ul>\
											<div>\
										</div>\
									</div>\
								</li>\
							{{~}}'
		,'ActAgent': 	'{{~ it:item:index }}\
									<li>\
										<span>{{= item.recommend_name}}</span>\
										<span>{{= item.mobile}}</span>\
										<span>{{= item.wechat_no}}</span>\
										<span>{{= item.become_agent_str}}</span>\
									</li>\
								{{~}}'
		,'moneryHtml': '<li>\
							<span>活动名称</span>\
							<span>状态</span>\
							<span>发放时间</span>\
							<span>数额</span>\
						</li>\
						<li>\
							<span>12</span>\
							<span>12</span>\
							<span>2</span>\
							<span>2</span>\
						</li>\
					'
		,'ActAgentReward': 	'{{~ it:item:index }}\
									<li>\
										<span>{{= item.acti_name}}</span>\
										{{? item.act_status==1}}<span>未开始</span>\
										{{?? item.act_status==2}}<span>进行中</span>\
										{{?? item.act_status==3}}<span>已撤下</span>\
										{{?? item.act_status==4}}<span>已结束</span>\
										{{?}}\
										<span>{{= item.create_date}}</span>\
										<span>{{= item.award_amount}}</span>\
									</li>\
								{{~}}'
		,'moneryHtmlReward': '<li>\
							<span>活动名称</span>\
							<span>状态</span>\
							<span>发放时间</span>\
							<span>数额</span>\
						</li>\
						<li>\
							<span>12</span>\
							<span>12</span>\
							<span>2</span>\
							<span>2</span>\
						</li>\
					'
	};
	module.exports = self_tpl;


/***/ }),
/* 10 */
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
		if(!wx)throw"请先加载https://res.wx.qq.com/open/js/jweixin-1.0.0.js";
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
/* 13 */
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
/* 14 */
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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	// require('../common/localStorage.js').setItem('login_redirect',location.href);
	var $ajax = __webpack_require__(3);
	var self_tpl = __webpack_require__(9);
	var api_path_config = __webpack_require__(4);
	var wxModule = __webpack_require__(2);
	var wxShare = __webpack_require__(10).wxShare;
	var layer = __webpack_require__(11);
	var httpURL = __webpack_require__(12);
	var returnPage = __webpack_require__(13);
	if(!httpURL.getQueryString('from')){
		__webpack_require__(16).setItem('login_redirect',location.href+'?from=login');
	}
	$(function(){
		// console.log("************************************")
		// console.log("base64 encode:" + require('../common/base64.js').encode("55612545211465"));
		// console.log("base64 decode:" + require('../common/base64.js').decode("MTMxMDI2"));

		// alert(require('../common/base64.js').encode("55612545211465"))
		// alert(require('../common/base64.js').decode("NTU2MTI1NDUyMTE0NjU"))
		returnPage.closeWindow();
		// require('../common/login-status.js').isLogin(function(){require('../common/rem.js').remSetting();});
		__webpack_require__(7).remSetting();
		// if(httpURL.getQueryString('from') != 'login') {
		__webpack_require__(29).redirectByStatus();
		// }
		//发展代理链接
		var developAgentLink = null;
		var developAgentShareLink = null;
		var allowShare = false;
		
		// 获取个人信息 上级信息 轮播图  （合并接口）
		
		$ajax.ajaxPost(null, '004000002', {}, function(data) {
			if(data.success){
				// 设置轮播图信息
				setCarouselPicInfo(data.data.list);
				// 设置个人信息 
				setPersonalInfo(data.data.memberDTO);
				// 设置上级信息
				setUpGradeInfo(data.data.agentVo);
			}
		});
		
		//轮播图
		function setCarouselPicInfo(pramData){
			var data = {data:1};
			data.data = pramData;
			if(data.data){
				data.image_prefix = api_path_config.upload_path_h5;
				$('#swiper-container').html(doT.template(self_tpl.swiperTpl)(data));
				var swiper = new Swiper('.swiper-container', {
					pagination: '.swiper-pagination',
					paginationClickable: true,
					autoplay: 2000,
					loop: true,
					autoplayDisableOnInteraction : false
				});
				if(data.data.length == 1){
					swiper.stopAutoplay();
					swiper.lockSwipes();
					var actId =  getQueryString("act_id" ,data.data[0].uri);
					$.fn.cookie('actId', actId); // 存储活动id
					//var orderHref =  $("#activity_order").attr("href");
					$("#activity_order").attr("href", "order/activity-oder-list.html" + "?act_id=" + actId);
					var hrefDom =  $("#swiper-container .swiper-slide").find("a");
					var hrefLink =  $("#swiper-container .swiper-slide").find("a").attr("href") + "&openId=" + $.fn.cookie('openid');
					hrefDom.attr("href", hrefLink);
				}
			}
		}
		
		// alert("进入个人中心");
		//个人信息
		function setPersonalInfo(pramData){
			// alert("进入个人中心 个人信息 004000002");
			// console.log("base64:" + require('../common/base64.js').encode("55612545211465"));
			var data = {data:1};
			data.data = pramData;
			allowShare = data.data.allow_share;
			memberId = data.data.member_id;
			$.fn.cookie('member_id', data.data.member_id);
			if(!data.data.portrait_uri){
				if(wxModule.isWX()){
					data.data.portrait_uri = $.fn.cookie('headimgurl');
				} else {
					data.data.portrait_uri = "../images/default_head_pic.jpg";
				}
			}
			$('#user-info').html(doT.template(self_tpl.userInfoTpl)(data.data));
			developAgentLink = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + api_path_config.appid + '&redirect_uri=https%3A%2F%2F' + api_path_config.wxdomain + '%2Fwechat_web%2Fwechat%2FwxAutho.do%3Fredirect_url%3Dhttps%253A%252F%252F' + api_path_config.wxdomain + '%252Fhtml%252Fdele-register.html%26up_id%3D' + __webpack_require__(30).encode(data.data.member_id) + '&response_type=code&scope=snsapi_userinfo';
			developAgentShareLink = 'https://' + api_path_config.wxdomain + '/html/share.html?up_id=' + __webpack_require__(30).encode(data.data.member_id);
			$('#developAgentOnline').attr('value',developAgentShareLink);
			$('#developAgentOnline').val(developAgentShareLink);
			//getUpInfo();
			wxShare.init({
				debug: false,
				target: wxShare,
				ready: function (wxShare) {
				    wx.hideMenuItems({
				       menuList: [
				            // "menuItem:share:qq",
				            "menuItem:share:QZone",
				            "menuItem:share:facebook",
				            "menuItem:share:email",
				            // "menuItem:share:weiboApp",
				            "menuItem:copyUrl",
				            "menuItem:openWithQQBrowser",
				            "menuItem:openWithSafari"
				            ], // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
				        success:function(res){
				            // alert('hide menu success');
				        }
				    });
				    var wxCallbacks = {
				        cancel : function(resp) {},
				        success : function(resp) {}
				    };
				    var wxData = {
				        // "appId": wxShare.sign.appId,
				        "imgUrl" : 'https://img.hanshuweishang.com/img-hanshuweishang/ex/20170426133614768.jpg',
				        "link" : getShareLink(),
				        "desc" : "韩束微商",
				        "title" : "韩束微商"
				    };
				    wxShare.shareToFriend(wxData, wxCallbacks);
				    wxShare.shareToTimeline(wxData, wxCallbacks);
				    wxShare.shareToWeibo(wxData, wxCallbacks);
				    wxShare.shareToQQ(wxData, wxCallbacks);
				    wxShare.shareToQZone(wxData, wxCallbacks);
				}
			});
			wx.onMenuShareAppMessage({
				title: '', // 分享标题
				desc: '韩束微商', // 分享描述
				link: getShareLink(), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl: 'https://img.hanshuweishang.com/img-hanshuweishang/ex/20170426133614768.jpg', // 分享图标
				type: '', // 分享类型,music、video或link，不填默认为link
				dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				success: function () {
					// 用户确认分享后执行的回调函数
				},
				cancel: function () {
					// 用户取消分享后执行的回调函数
				}
			});
			
		}
		
		//上级
		function setUpGradeInfo(pramData){
			var data = {data:1};
			data.data = pramData;
			$('#uplevel').html('上级: ' + data.data.real_name);
		}
		
		// 获取订单统计 团队管理统计 货款统计  （合并接口）
		$ajax.ajaxPost(null, '001000012', {}, function(data) {
			if(data.success){
				// 设置团队管理统计
				setTeamInfo(data);
				// 设置货款统计信息 
				setPaymoneyInfo(data);
				// 设置订单统计信息
				if(data.data){
					setOrderInfo(data.data.order);
				}
			}
		});
		
		// 获取用户是否已经上传了微信号
		$ajax.ajaxPost(null, '004000010', {}, function(data) {
			$("#inputWeChat .findform").css("height", "0.8rem");
			if(data.success && !data.data){
				$('.layer-mask').remove();
				$('body').append('<div id="layer-mask" class="layer-mask"></div>');
				$('.layer-mask').show();
				$('#seeresult').html('&nbsp;');
				$('#inputWeChat').show();
				var bodyRect = document.body.getBoundingClientRect();
				var E_float = document.getElementById('inputWeChat');
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
			}
		});
		function getQueryString(pram, str) { // pram 参数 str是url   获取一个url中的参数
			var reg = new RegExp('(^|&)' + pram + '=([^&]*)(&|$)', 'i');
			var r = str.split("?")[1].match(reg);
			if(r != null) {
				return unescape(r[2]);
			}
			return null;
		}
		function getShareLink() {
			var shareLink = null;
			shareLink = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + api_path_config.appid + '&redirect_uri=http%3A%2F%2F' + api_path_config.wxdomain+ '%2Fwechat_web%2Fwechat%2FwxAutho.do%3Fredirect_url%3Dhttp%253A%252F%252F' + api_path_config.wxdomain+ '%252Fhtml%252Fdele-register.html%26up_id%3Dnull&response_type=code&scope=snsapi_userinfo';
			if(allowShare){
				shareLink = developAgentLink;
			}
			// shareLink = 'http://wx.hanshuweishang.com/html/pwd-login.html'
			// alert('shareLink: ' + shareLink);
			return shareLink;
		}

		
		
		$('#authoFind').click(function(){
			$('.layer-mask').remove();
			$('body').append('<div id="layer-mask" class="layer-mask"></div>');
			$('.layer-mask').show();
			$('#seeresult').html('&nbsp;');
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

			// E_float.style.top = (top + (iH - eH) / 2) + 'px';
			// E_float.style.left = (left + (iW - eW) / 2) + 'px';
			E_float.style.top = (0 + (iH - eH) / 2) + 'px';
			// E_float.style.left = (0 + (iW - eW) / 2) + 'px';
			if(iW < 750) {
				E_float.style.left = (0 + (iW - eW) / 2) + 'px';
			}
		});
		$('#search-now').click(function() {
			if($('#keyword').val() === ''){
				$('#seeresult').html('<i style="color:red;">请输入正确的微信号或手机号</i>');
				return;
			}
			// if(!(/^1[34578]\d{9}$/.test($('#keyword').val()))){ 
			// 	$('#seeresult').html('<i style="color:red;">请输入正确的手机号</i>');
			// 	return; 
			// } 
			$ajax.ajaxPost(null, '003000011', {key_word:$('#keyword').val()}, function(data) {
				if(data.success){
					if(data.data){
						$('#seeresult').html(doT.template(self_tpl.findResultTpl)(data.data));
					} else {
						$('#seeresult').html('没有此代理商信息');
					}
				} else {
					if(data.code === '30011') {
						$('#seeresult').html('<i style="color:red;">' + data.msg + '</i>');
					}
				}
			});
			// $('.layer-mask').hide();
			// $('#search-layer').hide();
		});
		
		$('#submitWeChat').click(function(e) {
			if(!$('#inputWeChatContent').val()){
				$('#seeresultWeChat').html('<i style="color:red;">请输入微信号</i>');
				return;
			}
			// if(!(/^1[34578]\d{9}$/.test($('#keyword').val()))){ 
			// 	$('#seeresult').html('<i style="color:red;">请输入正确的手机号</i>');
			// 	return; 
			// } 
			$ajax.ajaxPost(null, '004000011', {wechat_id:$('#inputWeChatContent').val().trim()}, function(data) {
				if(data.success){
					e.preventDefault();
					$('.layer-mask').hide();
					$('#inputWeChat').hide();
					layer.open('保存成功！');
				}
			});
			// $('.layer-mask').hide();
			// $('#search-layer').hide();
		});
		var clipboard = new Clipboard('.btnCopy');

		$('#develop-agent').click(function(){
			if(allowShare) {
				$('.layer-mask').remove();
				$('body').append('<div id="layer-mask" class="layer-mask"></div>');
				$('.layer-mask').show();
				$('#develop-layer').show();
				var bodyRect = document.body.getBoundingClientRect();
				var E_float = document.getElementById('develop-layer');
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
			} else {
				layer.open('您不可以分享');
			}
		});
		$('body').delegate('.search-layer-close', __webpack_require__(14).getEventType(), function(e) {
			e.preventDefault();
			$('.layer-mask').hide();
			$('#search-layer').hide();
		});
		// $('body').delegate('.search-layer-close', 'click', function() {
		// 	$('.layer-mask').hide();
		// 	$('#search-layer').hide();
		// });

		$('body').delegate('.develop-layer-close', __webpack_require__(14).getEventType(), function(e) {
			e.preventDefault();
			$('.layer-mask').hide();
			$('#develop-layer').hide();
		});
		// $('body').delegate('.develop-layer-close', 'click', function() {
		// 	$('.layer-mask').hide();
		// 	$('#develop-layer').hide();
		// });

		//待我处理 待我发货 取消中订单统计
		function setOrderInfo(pramData){
			var data = {data:1};
			data.data = pramData;
			if(data.data){
				if((data.data.not_audited_count+'').length == 1) {
					$('#wait-process').html('<i>' + data.data.not_audited_count + '</i>')
				} else {
					$('#wait-process').html('<i class="num' + (data.data.not_audited_count+'').length + '">' + data.data.not_audited_count + '</i>')
				}
				if((data.data.not_ship_count+'').length == 1) {
					$('#wait-send').html('<i>' + data.data.not_ship_count + '</i>')
				} else {
					$('#wait-send').html('<i class="num' + (data.data.not_ship_count+'').length + '">' + data.data.not_ship_count + '</i>')
				}
				if((data.data.cancel_order_count+'').length == 1) {
					$('#canceling-order').html('<i>' + data.data.cancel_order_count + '</i>')
				} else {
					$('#canceling-order').html('<i class="num' + (data.data.cancel_order_count+'').length + '">' + data.data.cancel_order_count + '</i>')
				}
				//$('#wait-process').html('<i>' + data.data.not_audited_count + '</i>')
				//$('#wait-send').html('<i>' + data.data.not_ship_count + '</i>')
				//$('#canceling-order').html('<i>' + data.data.cancel_order_count + '</i>')
			}
		}
		//贷款审核统计
		function setPaymoneyInfo(data){
			if(data.data){
				if(data.data) {
					if(!data.data.count){
						$('#payment-audit').html('');
					}else{
						$('#payment-audit').html('<i>' + data.data.count + '</i>');
					}
				} else {
					$('#payment-audit').html('<i class="num' + (data.data+'').length + '">' + data.data + '</i>')
				}
			}
		}
		
		//团队管理统计
		function setTeamInfo(data){
			if(data.data){
				if((data.data.application+'').length == 1) {
					$('#join-audit').html(data.data.application > 0 ? '<i>' + data.data.application + '</i>' : '');
				} else {
					$('#join-audit').html(data.data.application > 0 ? '<i class="num' + (data.data.application+'').length + '">' + data.data.application + '</i>' : '');
				}
				if((data.data.updateGrade+'').length == 1) {
					$('#upgrade-audit').html(data.data.updateGrade > 0 ? '<i>' + data.data.updateGrade + '</i>' : '');
				} else {
					$('#upgrade-audit').html(data.data.updateGrade > 0 ? '<i class="num' + (data.data.updateGrade+'').length + '">' + data.data.updateGrade + '</i>' : '');
				}
				//$('#join-audit').html(data.data.application > 0 ? '<i>' + data.data.application + '</i>' : '');
				//$('#upgrade-audit').html(data.data.updateGrade > 0 ? '<i>' + data.data.updateGrade + '</i>' : '');
			}
		}

		$("textarea").keyup(function(){
			$("#developAgentOnline").val(developAgentShareLink);
		});
		(function isIOS() {
			var u = navigator.userAgent;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			if(isIOS){
				$('#develop-layer .tool').hide();
			}
		})();

		// $('body').delegate('.golink','click',function(){
		// 	alert('ok')
		// 	location.href = $(this).attr('data-href');
		// });
	});


/***/ }),
/* 29 */
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

/***/ })
/******/ ]);