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

	module.exports = __webpack_require__(86);


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

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

	var $ajax = __webpack_require__(3);
	var remSetting = __webpack_require__(7).remSetting;
	var self_tpl = __webpack_require__(80);
	var myLayer = __webpack_require__(11);
	var httpURL = __webpack_require__(12);
	var tmp_path_config = __webpack_require__(4);
	remSetting();
	$(function() {
		var idFont= httpURL.getQueryString('idFont');
		var agent_grade = httpURL.getQueryString('agent_grade');
		var needId = 0;
		var needVoucher = 0;
		$ajax.ajaxPost(null, "003000019", { agent_grade: agent_grade},
			function(data){
			   if(data.success){
					// if (data.data.need_i_d_card == 0 && !idFont) {
						needId = 1;
						$(".basic_info").css("display", "block");
						$(".id_div").css("display", "block");
						initUploader('#upload-up', true);
						//initUploader('#upload-down', false);
					// };
					$("#need_money").text("升级到该级别至少需要" + data.data.upgrade_amount/100 + "元");
					if(data.data.payment_voucher == 0){
						needVoucher = 1;
						$(".basic_info").css("display", "block");
						$(".up-load-id:last-child").css("display", "block");
						initUploader('#upload-down', false);
						
					}else{
						$(".basic_info").css("display", "block");
						$("#nextTwo").css({
							    position: "absolute",
								left: "0.26rem",
								bottom: "-1rem"
						});	
						// getDetailData();
						// $(".submit_success").css("display", "block");
					};
			   }else{
			   	myLayer.open("系统异常，请稍后重试！");
			   }
			   // else{
			   //      $(".err-warning").css("display", "block");
			   //  }
		});
		var pramTwo = {
			agent_grade: ""
		};
		pramTwo.agent_grade = agent_grade;
		/**
			agent_grade: "",
			payment_amount: "",
			payment_voucher: "",
			picture_front: ""
		**/
		var flagMsg = 1;
		function checkData(){
			flagMsg = 1;
			// if (needId == 1) {
				pramTwo.authon_personalid = $("#id_num").val().trim();
				var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
				if(!reg.test(pramTwo.authon_personalid)){
					myLayer.open("请输入正确身份证号码");
					flagMsg = 2;
	    			return;
				};
				// if (pramTwo.authon_personalid) {
		  //   		msg = "请输入18位身份证号码";
		  //   		return;
		  //   	}else{
					
				// };
				if (!pramTwo.picture_front) {
					myLayer.open("请上传身份证正面照！");
					flagMsg = 2;
					return;
				};
			// };
			pramTwo.payment_amount = $("#monery_num").val().trim();
			if (!pramTwo.payment_amount) {
				myLayer.open("请输入授权金额");
				flagMsg = 2;
				return;
			};
			if(!(/^[0-9]+$/.test(pramTwo.payment_amount))){ 
	             myLayer.open("授权金额只能是数字");
	             flagMsg = 2;
	              return;
	         };
			if (needVoucher == 1) {
				if (!pramTwo.payment_voucher) {
					myLayer.open("请上传您向上级的打款截图");
					flagMsg = 2;
					return;
				};
			};
		};
	//	 $("#nextTwo").click(function(){
	//		checkData();
	//		if(flagMsg == 2){
	//			return;
	//		};
	//		$ajax.ajaxPost(null, "003000012", pramTwo, 
	//			function(data){
	//				if(data.code == 10000){
	//					$(".basic_info").css("display", "none");
	//					$(".submit_success").css("display", "block");
	//					getDetailData();
	//					// if(){
	//					//     $(".basic_info .id_class").css("display","none");
	//					//     $(".basic_info .money_class").css("display","none");
	//					// };
	//				};
	//				if (data.code == "30045") {
	//					myLayer.open(data.msg);
	//				};
	//				if (data.code == "30046") {
	//					myLayer.open(data.msg);
	//				};
	//		});
	//	});
		$('#nextTwo').click(function(e) {
			__webpack_require__(38).btnCtrl(e, function(target){
				checkData();
				if(flagMsg == 2){
					return;
				};
				$ajax.ajaxPost(null, "003000012", pramTwo, 
					function(data){
						if(data.code == 10000){
							myLayer.open("提交成功！");
							setTimeout(function () {
								window.location.href = "team-my-upgrade-success.html"
						    }, 1000);
						}else if (data.code == "30045") {
							myLayer.openLongTime(data.msg);
						}else if (data.code == "30046" || data.code == "20002") {
							myLayer.openLongTime(data.msg);
						}else {
							if(data.msg){
								myLayer.open(data.msg.substring(0,40));
							}else{
								myLayer.open(data.substring(0,40));
							};
						}
				});
			});
		});

		// 身份证号校验
		$("#id_num").keyup(function(){
			var num = $("#id_num").val();
			if(num.length == 15 || num.length == 18){
				console.log(isCardNo(num));
			}
			
		})
		function isCardNo (card)  
		{  
			//身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
			var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;  
			if(reg.test(card) === false)  
			{
				return false;  
			}
			return true;  
		};

	   // 优化retina, 在retina下这个值是2
		var ratio = window.devicePixelRatio || 1,
			// 缩略图大小
			thumbnailWidth = 100 * ratio,
			thumbnailHeight = 100 * ratio,
			// Web Uploader实例
			uploader;

		function initUploader(targetID, flag) {
			// $('#uploader-container').html('<div id="gridFileList"></div><div id="picker">选择图片</div>');
			// 初始化Web Uploader
			uploader = WebUploader.create({
				// 自动上传。
				auto: true,
				// swf文件路径
				//swf: BASE_URL + '/js/Uploader.swf',
				// 文件接收服务端。
				// server: 'http://media.haiyn.com/upload.php',
				// formData: {
				// 	user_id: 1,
				// 	biz_code: 'hanshu'
				// },
				server: tmp_path_config.api_path_3 + '/gate.do?req={"id":"004000006"}',
				// server: tmp_path_config.api_path_3 + '/gate.do',
				formData: {
					// req: JSON.stringify({id:'004000006'})
					//id: 'ok'
				},
				// 选择文件的按钮。可选。
				// 内部根据当前运行是创建，可能是input元素，也可能是flash.
				pick: {
					id: targetID, //'#upload-up',
					multiple: false
				},
				// 只允许选择文件，可选。
				accept: {
					title: 'Images',
					extensions: 'gif,jpg,jpeg,png,GIF,JPG,JPEG',
					// mimeTypes: 'image/*'
					mimeTypes: 'image/jpg,image/png'
				},
				 fileSingleSizeLimit:4*1024*1024
			});
			// $("#picker").mouseenter(function() {
			//  if (uploader) {
			//      uploader.refresh();
			//  }
			// });
			// 当有文件添加进来的时候
			uploader.on('fileQueued', function(file) {
				$img = $(targetID +' .img-container img');
				// 创建缩略图
				uploader.makeThumb(file, function(error, src) {
					if (error) {
						// $img.replaceWith('<span>不能预览</span>');
						return;
					}
					//$img.attr('src', src);
				}, thumbnailWidth, thumbnailHeight);
				//loading带文字
				layer.open({
					shadeClose: false,
					type: 2,
					content: '图片上传中'
				});
			});
			// 判断文件的类型 大小
			uploader.on("error", function(type) {
				if(type == "Q_TYPE_DENIED") {
					myLayer.open("请上传jpg,png,gif,jpeg格式文件！");
					//dialogMsg("myModal", "messageP", "请上传jpg,png,gif,jpeg格式文件");
				} else if(type == "F_EXCEED_SIZE") {
					myLayer.open("文件大小不能超过4M！");
					//dialogMsg("myModal", "messageP", "文件大小不能超过2M");
				}
			});
			// 文件上传过程中创建进度条实时显示。
			uploader.on('uploadProgress', function(file, percentage) {
				var $li = $('#' + file.id),
					$percent = $li.find('.progress span');

				// 避免重复创建
				if (!$percent.length) {
					$percent = $('<p class="progress"><span></span></p>')
						.appendTo($li)
						.find('span');
				}
				$percent.css('width', percentage * 100 + '%');
			});
			// 文件上传成功，给item添加成功class, 用样式标记上传成功。
			uploader.on('uploadSuccess', function(file, res) {
				layer.closeAll();
				if(!res.data){
					myLayer.open("图片上传失败！");
					return;
				};
				var imgSrc = res.data;
				$img = $(targetID +' .img-container img');
				if(imgSrc) {
					$img.attr('imgsrc', imgSrc);
					$img.attr('src', tmp_path_config.upload_path_h5 + imgSrc);
				};
				if (targetID == "#upload-up") {
					pramTwo.picture_front = imgSrc;
					$("#reuploader_id").css("display", "block");
					$("#id-prompt").text("请确认上传身证号码和姓名与提交信息一至，非一至将会被拒绝；");
				} 
				if (targetID == "#upload-down") {
					pramTwo.payment_voucher = imgSrc;
					$("#reuploader_voncher").css("display", "block");
					$("#img-prompt").text("请确认打款金额，审核通过后代理可能过授权金额进行系统下单；");
				};
			});
			// 文件上传失败，现实上传出错。
			uploader.on('uploadError', function(file) {
				layer.closeAll()
				myLayer.open("图片上传失败！");
				var $li = $('#' + file.id),
					$error = $li.find('div.error');
				// 避免重复创建
				if (!$error.length) {
					$error = $('<div class="error"></div>').appendTo($li);
				}
				$error.text('上传失败');
			});
			// 完成上传完了，成功或者失败，先删除进度条。
			uploader.on('uploadComplete', function(file) {
				$('#' + file.id).find('.progress').remove();
			});
			uploader.on('uploadBeforeSend', function(obj, data, headers) {
				$.extend(headers, {
					"Origin":  tmp_path_config.wxdomain,
					"Access-Control-Request-Method": "POST"
				});
			});
			// $('#grid-confirm-upload').click(function() {
			//  //console.log("上传...");
			//  if (uploader) {
			
			//      uploader.upload();
			//  }
			// });
			// $('#uploadUp .webuploader-element-invisible').click();
		}

		// $('#uploadUp').click(function(){
		//  initUploader();
		// });
	   

	});


/***/ })

/******/ });