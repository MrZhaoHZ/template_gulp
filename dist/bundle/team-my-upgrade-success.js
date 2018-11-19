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

	module.exports = __webpack_require__(87);


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

/***/ 80:
/***/ (function(module, exports) {

	var self_tpl = {
			'myTeamListTpl': '{{~ it.data:item:index }}\
								<p class="p_row">\
									<span class="left" style="display: inline-block;text-align: justify;text-align-last: justify;">{{= item.grade_name}}</span>\
									<span class="middle" style="width:{{= item.count / it.length * 60}}%"></span>\
									<sapn class="right">{{= item.count}}人</sapn>\
								</p>\
							{{~}}\
							<p class="total"><span>合计：</span><span>{{= it.total_count}}人</span></p>',
			'myTeamListLiTpl': '{{~ it:item:index }}\
								<li style="position: relative;">\
									<span>{{= item.real_name}}</span>\
									<span>{{= item.grade_name}}</span>\
									<span>{{= item.account}}</span>\
									<span>{{= item.total_team_num}}</span>\
									{{? item.total_team_num !=0}}\
										<a href="team-my-team-detail.html?member_id={{= item.member_id}}" class="right_icon" data_id="{{= item.id}}"></a>\
									{{?}}\
									{{? item.total_team_num ==0}}\
										<a href="team-my-team-detail.html?member_id={{= item.member_id}}" class="right_icon" style="opacity: 0;position: absolute;width: 100%;height: 100%;display: block;left: 0;top: 0;" data_id="{{= item.id}}"></a>\
									{{?}}\
								</li>\
							{{~}}',
			'myTeamListLiTplDetail': '<ul>\
										{{~ it:item:index }}\
											<li class="click_li" data_id="{{= item.member_id}}" team_num="{{= item.total_team_num}}">\
												<p>\
													<span class="left">{{= item.grade_name}}&nbsp;&nbsp;</span>\
													<span class="left">({{= item.real_name}})</span>\
													{{? item.total_team_num !=0}}\
														<span class="right right_icon"></span>\
													{{?}}\
													<span class="right num">{{= item.total_team_num}}</span>\
												</p>\
											</li>\
											<div class="team hidde"></div>\
										{{~}}\
									</ul>',
			'myTeamJoin': '{{~ it.data:item:index }}\
								<li>\
									<div class="name-per">\
										<p class="p_top">\
											<span class="P_left">状态：</span>\
											<span class="p_middle">{{= it.dictionary[item.audit_status]}}</span>\
											<span class="p_right">{{= item.create_time}}</span>\
										</p>\
										<div class="content_detail">\
											<div class="left">\
												<img src="{{= item.portrait}}">\
											</div>\
											<div class="middle">\
												<p>\
													<span>姓名：</span>\
													<span>{{= item.real_name}}</span>\
												</p>\
												<p>\
													<span>申请等级：</span>\
													<span>{{= item.grade_name}}</span>\
												</p>\
											</div>\
										</div>\
										<div class="bottom">\
											<a class="span_btn" data_id="{{= item.id}}" href="team-join-examine.html?id={{= item.id}}&audit_status={{= it.audit_status}}">查看详情</a>\
										</div>\
									</div>\
								</li>\
						{{~}}',
			'myTeamUpgrade': '{{~ it.data:item:index }}\
								<li>\
									<div class="name-per">\
										<p class="p_top">\
											<span class="P_left">状态：</span>\
											<span class="p_middle">{{= item.audit_status_name}}</span>\
											<span class="p_right">{{= item.create_time}}</span>\
										</p>\
										<div class="content_detail">\
											<div class="left">\
												<img src="{{= item.portrait}}">\
											</div>\
											<div class="middle">\
												<p>\
													<span>姓名：</span>\
													<span>{{= item.real_name}}</span>\
												</p>\
												<p>\
													<span>原等级：</span>\
													<span>{{= item.grade_name}}</span>\
												</p>\
												<p>\
													<span>申请等级：</span>\
													<span>{{= item.new_agent_grade_name}}</span>\
												</p>\
											</div>\
										</div>\
										<div class="bottom">\
											<a class="span_btn" href="team-upgrade-examine.html?id={{= item.id}}&data_type={{= it.type}}" data_id="{{= item.id}}">查看详情</a>\
										</div>\
									</div>\
								</li>\
						{{~}}',
			'myTeamUpgrade1Tpl': '{{~ it.des:item:index }}\
									<div class="swiper-slide" isNeedIdCard="{{= item.need_i_d_card}}" agent_grade="{{= item.id}}" auth_amount= {{= item.auth_amount/100}}>\
										{{= item.name}}\
						            	<div class="hide_div" style="display:none;">{{= item.application_des || ""}}</div>\
						            	<span class="bot border"></span>\
					    				<span class="top border"></span></div>\
								{{~}}',
			'upgradeAuditProcessTpl': '<section id="cd-timeline-{{= it.length}}" class="cd-container-normal">\
										{{~ it:item:index }}\
										<div class="cd-timeline-block">\
											<div class="cd-timeline-img cd-picture"></div>\
											<div class="cd-timeline-content">\
												<p class="detail">\
													<span class="name" id="superior">{{= item.handle_time}}</span>\
													<span class="status" id="superior_state">  {{= item.remarks}}</span>\
												</p>\
												<p class="time" id="time1">{{= item.member_name}}({{= item.grade_name}})</p>\
											</div>\
										</div>\
										{{~}}\
									  </section>',
			'orderProcessTpl' : '<section id="cd-timeline-{{= it.length}}" class="cd-container-normal">\
									{{? it.length>=1}}\
										<div class="cd-timeline-block">\
											<div class="cd-timeline-img cd-picture" id="submit" style="background-color: #e0e0e0;"></div>\
											<div class="cd-timeline-content">\
												<p>\
													<span class="left">提交成功：</span>\
													<span>申请级别：</span>\
													<span id="for_level">{{= it[0].agent_grade_name}}</span>\
												</p>\
												<p>\
													<span class="left time" id="time" >{{= it[0].create_date || ""}}</span>\
												</p>\
											</div>\
										</div>\
									{{?}}\
									{{? it.length>=2}}\
										<div class="cd-timeline-block">\
											<div class="cd-timeline-img cd-picture" id="old" style="background-color: #e0e0e0;"></div>\
											<div class="cd-timeline-content">\
												<p>\
													<span class="left">原上级：</span>\
													<span id="old_superior">{{= it[1].name}}</span>\
												</p>\
												<p>\
													<span id="old_status">{{= it[1].audit_status_name}}</span>\
												</p>\
												<p>\
													<span class="left time" id="time" >{{= it[1].create_date || ""}}</span>\
												</p>\
											</div>\
										</div>\
									{{?}}\
									{{? it.length>=3}}\
										<div class="cd-timeline-block">\
											<div class="cd-timeline-img cd-picture" id="new" style="background-color: #e0e0e0;"></div>\
											<div class="cd-timeline-content">\
												<p>\
													<span class="left">新上级：</span>\
													<span id="new_superior">{{= it[2].name}}</span>\
												</p>\
												<p>\
													<span id="new_status">{{= it[2].audit_status_name}}</span>\
												</p>\
												<p>\
													<span class="left time" id="time" >{{= it[2].create_date || ""}}</span>\
												</p>\
											</div>\
										</div>\
									{{?}}\
									{{? it.length>=4}}\
										<div class="cd-timeline-block">\
											<div class="cd-timeline-img cd-picture" id="head" style="background-color: #e0e0e0;"></div>\
											<div class="cd-timeline-content">\
												<p>\
													<span class="left">{{= it[3].name}}：</span>\
													<span id="head_status">{{= it[3].audit_status_name}}</span>\
												</p>\
												<p>\
													<span class="left time" id="time" >{{= it[3].create_date || ""}}</span>\
												</p>\
											</div>\
										</div>\
									{{?}}\
							</section>'
	};
	module.exports = self_tpl;


/***/ }),

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

	var $ajax = __webpack_require__(3);
	var remSetting = __webpack_require__(7).remSetting;
	var self_tpl = __webpack_require__(80);
	var returnPage = __webpack_require__(13);
	remSetting();
	$(function() {
	    returnPage.closeWindow();
		//升级审核成功后，展示审核进度
	 	function getDetailData(){
			$ajax.ajaxPost(null, "003000020", {}, 
			function(data){
				if (data.success) {
					$('.process-step').html(doT.template(self_tpl.orderProcessTpl)(data.data));
					$(".cd-timeline-block:last").css("color", "#75ce66");
					$(".cd-picture:last").css("background-color", "#75ce66");
				};
			});
		 };
		 getDetailData();
	});


/***/ })

/******/ });