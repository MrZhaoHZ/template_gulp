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

	module.exports = __webpack_require__(81);


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

/***/ 81:
/***/ (function(module, exports, __webpack_require__) {

	var remSetting = __webpack_require__(7).remSetting;
	var self_tpl = __webpack_require__(80);
	var $ajax = __webpack_require__(3);
	var httpURL = __webpack_require__(12);
	var returnPage = __webpack_require__(13);
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
	//0.未审核1.新上级审核通过2.新上级审核拒绝3.平台审核通过4.平台审核拒绝5.原上级审核通过6.原上级审核拒绝7.用户自己取消
	var pram = {
	    audit_status: "",
	    current_page: "1",
	    page_size: "10"
	};
	var dictionary = [ "", "审核中", "已拒绝", "审核成功","已拒绝", "原上级审核通过", "原上级审核拒绝", "已取消", "待上级审核", "待平台审核"];
	function pullUpAction() {
	    $ajax.ajaxPost(null, "003000010", pram, 
	        function(data){
	            if (data.success && data.data) {
	                $(".no_info").css("display", "none");
	                $("#pullUp").css("display", "block");
	                $('#stuList').append(doT.template(self_tpl.myTeamJoin)({ data:data.data.datas, dictionary: dictionary, audit_status: pram.audit_status}));
	                var current_page = parseInt(pram.current_page) + 1;
	                pram.current_page = current_page.toString();
	                pram.current++;
	//              if ($("#stuList li").length == 0) {
	//                  $(".prompt").css("display", "block");
	//              }else{
	//                  $(".prompt").css("display", "none");
	//              };
	            };
	            if (!data.data && pram.current_page == "1") {// 没有一条数据
	                $("#pullUp").css("display", "none");
	                $(".no_info").css("display", "block");
	            }
	             if (data.data && data.data.datas.length >=5) {// 没有一条数据
	                $("#pullUp").css("display", "block");
				}else{
					$("#pullUp").css("display", "none");
				};
	           myScroll.refresh();
	            if (!data.data && pram.current_page != "1") {
	                $(".pullUpLabel").text("加载完毕！")
	                $(".pullUpIcon").css("display", "none");
	            }else{
	                $(".pullUpLabel").text("上拉加载更多")
	                $(".pullUpIcon").css("display", "block");
	            }
	        });
	    // $.ajax({
	    //     type: 'POST',
	    //     url: '/getMyTeamJoin.do',
	    //     data: { pram: pram },
	    //     dataType: 'json',
	    //     success: function(data) {
	    //         $('#stuList').append(doT.template(self_tpl.myTeamJoin)(data.data));
	    //         myScroll.refresh();
	    //         pram.current++;
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
	   returnPage.returnPageWithUrl("../center.html?from=login");
	    pram.audit_status = httpURL.getQueryString('audit_status');
	    //$("nav span").eq(pram.audit_status).addClass('active').siblings('nav span').removeClass('active');
	    $('nav span').click(function() {
	        $(this).addClass('active').siblings('nav span').removeClass('active');
	    });
	    $("nav span").eq(pram.audit_status).trigger("click");  
	    var activeLayerIndex = null;
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

	        E_float.style.top = (top + (iH - eH) / 2) + 'px';
	        E_float.style.left = (left + (iW - eW) / 2) + 'px';
	    });
	    $('body').delegate('.search-layer-close', 'click', function() {
	        $('.layer-mask').hide();
	        $('#search-layer').hide();
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

	    pullUpAction(1);
	   
	    $("nav span").on("click", function(){
	        $("#stuList li").remove();
	        var index = $(this).attr("data_val");
	        pram.audit_status = index;
	        pram.current_page = "1";
	        pullUpAction(1);
	    });
	});


/***/ })

/******/ });