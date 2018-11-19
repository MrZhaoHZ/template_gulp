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

	module.exports = __webpack_require__(8);


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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	var $ajax = __webpack_require__(3);
	var self_tpl = __webpack_require__(9);
	var api_path_config = __webpack_require__(4);
	var wxModule = __webpack_require__(2);
	var wxShare = __webpack_require__(10).wxShare;
	var layer = __webpack_require__(11);
	var httpURL = __webpack_require__(12);
	var returnPage = __webpack_require__(13);
	$(function(){
		__webpack_require__(7).remSetting();
		var developAgentLink = null;
		var developAgentShareLink = null;
		var allowShare = false;
		var _membid = $.cookie('member_id');
		$ajax.ajaxPostAct("/gate.do","007000007",{member_id:_membid},function(data) {
			if(data.success){
				console.log(data)
				$('.listBoxN').html(doT.template(self_tpl.actList)(data.data));
			}
		});
		// function getAgentList(doc,actid,agent){
		// 	$ajax.ajaxPostAct("/gate.do","007000008",{member_id:_membid,act_id:actid,become_agent:agent},function(data) {
		// 		if(data.success){
		// 			console.log(data)
		// 			var _moneryHtml = doc.parents(".dailiN").siblings(".numbox");
		// 			$(_moneryHtml).html(doT.template(self_tpl.ActAgent)(data.data.datas));
		// 			// $(_moneryHtml).show();
		// 		}
		// 	});
		// }
		$(".activityboxN").on("click",".listZhun",function(){
			var _this = $(this),
				_thisActid = _this.attr("actid"),
				_become_agent = "0";
				var scobox = _this.parents(".dailiN").siblings(".numbox").find(".scrollbox");
				if($(scobox).find("li").length > 0){
					$(scobox).html("");
				}
				// getAgentList(_this,_thisActid,_become_agent);
				reloadFn(_this,_thisActid,_become_agent);
		})

		$(".activityboxN").on("click",".listZheng",function(){
			var _this = $(this),
				_thisActid = _this.attr("actid"),
				_become_agent = "1"; 
				var scobox = _this.parents(".dailiN").siblings(".numbox").find(".scrollbox");
				if($(scobox).find("li").length > 0){
					$(scobox).html("");
				}
				// getAgentList(_this,_thisActid,_become_agent);
				reloadFn(_this,_thisActid,_become_agent);
		})
		$('body').on("click",".fuzhi",function(){
			var _this = $(this),
				_thisactId = $(this).attr("actid"),
				_thisopenid = _membid;
			// var developAgentShareLink = ""+ api_path_config.api_path_act +"/static/page/index.html?openId="+ require('../common/base64.js').encode(_thisopenid) +"&actId="+ _thisactId +"";
			developAgentShareLink = 'https://' + api_path_config.wxdomain + '/html/shareAct.html?openId='+ _thisopenid +'&actId='+ _thisactId +'';
			$('#developAgentOnline').val(developAgentShareLink);
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
		});
		$("body").on("click",".xiangqing",function(){
			var _this = $(this);
			var _actid = _this.attr("actid");
			location.href = 'https://dltest1.yyzws.com/dl_gateway_web/static/page/index.html?actid='+ _actid + '&openId=null&memberid='+ _membid;
		})
		$("textarea").keyup(function(){
			$("#developAgentOnline").val(developAgentShareLink);
		});
		$('body').delegate('.develop-layer-close', __webpack_require__(14).getEventType(), function(e) {
			e.preventDefault();
			$('.layer-mask').hide();
			$('#develop-layer').hide();
		});
		// function reloadFnClick(doc,actid,agent){
		// 	var page = 1;
		//     // 每页展示个数
		//     var size = "10";
		// 	$ajax.ajaxPostAct("/gate.do","007000008",{member_id:_membid,act_id:actid,become_agent:agent,page_size:size,current_page:String(page)},function(data) {
		// 		if(data.success){
		// 			if(data.data.datas){
		// 				var arrLen = data.data.datas.length;
		// 				if(arrLen > 0){
		// 					var _moneryHtml = doc.parents(".dailiN").siblings(".numbox");
		// 					$(_moneryHtml).find(".scrollbox").append(doT.template(self_tpl.ActAgent)(data.data.datas));
		// 					$(_moneryHtml).find(".numListN").show();
		// 				}
		// 			}
		// 		}
		// 	});
		// }

			// var titleValue = "";
			// 	var id_val = "";
			// 	splitHref();
			// 	reloadFn();
		function reloadFn(doc,actid,agent){
			var page = 0;
		    // 每页展示个数
		    var size = "10";
		    var drophtml = doc.parents(".dailiN").siblings(".numbox").find(".scrollbox");
		    // var _act_id = "15";
		    // dropload
		    $(drophtml).dropload({
		        scrollArea : $(drophtml),
		        loadDownFn : function(me){
		            // 拼接HTML
		            page++;

		            $ajax.ajaxPostAct("/gate.do","007000008",{member_id:_membid,act_id:actid,become_agent:agent,page_size:size,current_page:String(page)},function(data) {
						if(data.success){
							if(data.data.datas){
								var arrLen = data.data.datas.length;
								if(arrLen > 0){
									var _moneryHtml = doc.parents(".dailiN").siblings(".numbox");
									$(_moneryHtml).find(".scrollbox").append(doT.template(self_tpl.ActAgent)(data.data.datas));
									$(_moneryHtml).find(".numListN").show();
									me.resetload();
								}
							}else{
								me.lock();
			                        // 无数据
		                        me.noData();
							}
							// console.log(data)
							// var _moneryHtml = doc.parents(".dailiN").siblings(".numbox");
							// $(_moneryHtml).html(doT.template(self_tpl.ActAgent)(data.data));
							// $(_moneryHtml).show();
						}else{
							me.resetload();
						}
					});
		        }
		    });
		}

	});


/***/ }),
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

/***/ })
/******/ ]);