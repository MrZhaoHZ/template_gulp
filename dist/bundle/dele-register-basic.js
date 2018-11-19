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

	module.exports = __webpack_require__(37);


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

/***/ 16:
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

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

	var remSetting = __webpack_require__(7).remSetting;
	remSetting();
	var $ajax = __webpack_require__(3);
	var localStorage = __webpack_require__(16);
	var myLayer = __webpack_require__(11);
	var httpURL = __webpack_require__(12);
	var tmp_path_config = __webpack_require__(4);
	$(function() {
		var state = httpURL.getQueryString('upId');
		var auth_amount = httpURL.getQueryString('auth_amount');
		var agent_grade = httpURL.getQueryString('agent_grade');
		$('#user-pic').attr('src', $.cookie('headimgurl'));
		getData();
		var pramIsShow = {
			needCard: "",
			needPayment: ""
		}

		function getData() {
			// 收货地址
			$ajax.ajaxPost(null, "004000001", {
					member_id: state
				},
				function(data) {
					if(data.code == "10000") {
						var provs_data = data.data.province;
						var citys_data = data.data.city;
						var dists_data = data.data.area;
						var area2 = new LArea();
						area2.init({
							'trigger': '#demo2',
							'valueTo': '#value2',
							"clickDom": "#address_click",
							'keys': {
								id: 'code',
								name: 'name'
							},
							'type': 2,
							'data': [provs_data, citys_data, dists_data]
						});
					};
				});
			// 个人中心代理商我的上级信息
			$ajax.ajaxPost(null, "003000016", {
					member_id: state
				},
				function(data) {
					if(data.code == "10000") {
						var apply_level = localStorage.getItem("apply_level");
						//localStorage.removeItem("apply_level");
						$("#content-bottom").text(apply_level);
						$("#superior_name").text(data.data.real_name);
						$("#superior_level").text(data.data.grade_name);
					};
				});
			// 获取展示规则
			$ajax.ajaxPost(null, "003000019", {
					agent_grade: agent_grade
				},
				function(data) {
					if(data.success) {
						pramIsShow.needPayment = data.data.payment_voucher;
						pramIsShow.needCard = data.data.need_i_d_card;
						if(pramIsShow.needCard == 0) {
							$(".id_div").css("display", "block");
							initUploader('#upload-up', "id");
						};
						$("#need_money").text("申请该级别至少需要" + auth_amount +"元")
						if(pramIsShow.needPayment == 0) {
							$(".money_div").css("display", "block");
							initUploader('#upload-down');
						};
					};
				});
		};
		//var provs_data = [{ "text": "浙江", "value": "110000" }, { "text": "江苏", "value": "120000" }];
		//var citys_data = { "110000": [{ "text": "杭州", "value": "110100" },{ "text": "湖州", "value": "110200" }], "120000": [{ "text": "杭州", "value": "120100" },{ "text": "湖州", "value": "120200" }]};
		//var dists_data = { "110100": [{ "text": "拱墅区", "value": "110101" },{ "text": "江干区", "value": "110102" }],"110200": [{ "text": "南浔区", "value": "110201" },{ "text": "长兴区", "value": "110202" }]};

		// 优化retina, 在retina下这个值是2
		var ratio = window.devicePixelRatio || 1,
			// 缩略图大小
			thumbnailWidth = 100 * ratio,
			thumbnailHeight = 100 * ratio,
			// Web Uploader实例
			uploaderUp, uploaderDown;

		function initUploader(targetID) {
			// $('#uploader-container').html('<div id="gridFileList"></div><div id="picker">选择图片</div>');
			// 初始化Web Uploader
			uploader = WebUploader.create({
				// 自动上传。
				auto: true,
				// swf文件路径
				//swf: BASE_URL + '/js/Uploader.swf',
				// 文件接收服务端。
				// server: 'http://media.haiyn.com/upload.php',
				//          formData: {
				//              user_id: 1,
				//              biz_code: 'hanshu'
				//          },
				server: tmp_path_config.api_path_3 + '/gate.do?req={"id":"004000006"}',
				//server: tmp_path_config.api_path_3 + '/gate.do',
				formData: {
					//req: JSON.stringify({id:'004000006'})
				},
				//sendAsBinary: true,
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
			// 	if (uploader) {
			// 		uploader.refresh();
			// 	}
			// });
			// 当有文件添加进来的时候
			uploader.on('fileQueued', function(file) {
				$img = $(targetID + ' .img-container img');
				// 创建缩略图
				uploader.makeThumb(file, function(error, src) {
					if(error) {
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
				if(!$percent.length) {
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
				$img = $(targetID + ' .img-container img');
				if(imgSrc) {
					$img.attr('imgsrc', imgSrc);
					$img.attr('src', tmp_path_config.upload_path_h5 + imgSrc);
				};
				if(targetID == "#upload-up") {
					pram.picture_front = imgSrc;
					$("#reuploader_id").css("display", "block");
					$("#id-prompt").text("请确认上传身份证号码和姓名与提交信息一致，非一致将会被拒绝；");
				}
				if(targetID == "#upload-down") {
					pram.payment_voucher = imgSrc;
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
				if(!$error.length) {
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
					"Origin": tmp_path_config.wxdomain,
					// "Origin": "http://" + tmp_path_config.wxdomain,
					"Access-Control-Request-Method": "POST"
				});
			});
			// $('#grid-confirm-upload').click(function() {
			// 	//console.log("上传...");
			// 	if (uploader) {

			// 		uploader.upload();
			// 	}
			// });
			// $('#uploadUp .webuploader-element-invisible').click();
		}

		// $('#uploadUp').click(function(){
		// 	initUploader();
		// });
		// 短信验证倒计时
		var validCode = true;
		$(".msgs").click(function() {
				var mobile = $("#phone").val().trim();
				if(mobile.length < 11) {
					myLayer.open("请输入11位手机号码");
					return;
				};
				if(!mobile) {
					myLayer.open("请输入11位手机号码");
					return;
				} else if(mobile.length < 11) {
					myLayer.open("请输入11位手机号码");
					return;
				} else if(!(/^1\d{0,10}$/.test(mobile))) {
					myLayer.open("请输入11位手机号码");
					return;
				};
				if($(".msgs").attr('data_flag') == "2"){
					return;
				};
				$(".msgs").attr("data_flag","2");
				var code = $(this);
				var pramNobile = {
					mobile: "",
					handle_type: "register"
				};
				pramNobile.mobile = $("#phone").val().trim();
				$(".msgs").css("color", '#ccc'); ///message/mobileVerify.do
				$ajax.ajaxGet4Autho(tmp_path_config.msgReq, pramNobile, function(data) {
					//
					if(data.success) {
						var time = 59;
						code.html("59秒");
						if(validCode) {
							validCode = false;
							
							
							// $.post('/message/mobileVerify.do',pram,function(data){
							// 	console.log(data)
							// });
							// $ajax.ajaxPost(null, tmp_path_config.api_path_2 + "/message/mobileVerify.do", pram, 
							//       	function(data){
			
							//       });
							
							code.addClass("msgs1");
							var t = setInterval(function() {
								time--;
								code.html(time + "秒");
								if(time == 0) {
									clearInterval(t);
									$(".msgs").attr("data_flag","1");
									$(".msgs").css("color", '#66c300');
									code.html("重新获取");
									validCode = true;
									code.removeClass("msgs1");
			
								}
							}, 1000)
						}
					} else if(data.code == "30009") {
						$(".msgs").attr("data_flag","1");
						$(".msgs").css("color", '#66c300');
						myLayer.open(data.msg);
					};
				});
				
			})
			// 数据校验  密码只能输入数字和字母
			// $("#pwd").keyup(function(){
			// var pwd = $("#pwd").val().trim();
			// //Unicode编码中的汉字范围
			// if(!(/^[A-Za-z0-9]+$/.test(pwd))){ 
			//             $("#pwd").val("");
			//        };
			// });
			// 数据校验  只能输入汉字
			// $("#name").keyup(function(){
			// 	var name = $("#name").val().trim();
			// 	//Unicode编码中的汉字范围
			// 	if(!(/^[\u4e00-\u9fa5]+$/.test(name))){ 
			//              $("#name").val("");
			//          };
			//  });
			// 微信号不能输入汉字
			// $("#we_chat").keyup(function(){
			// 	var we_chat = $("#we_chat").val().trim();
			// 	//Unicode编码中的汉字范围
			// 	var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
			// 	if(reg.test(we_chat)){
			// 		$("#we_chat").val("");
			// 	};
			// 	// if((/^[\u4e00-\u9fa5]+$/.test(we_chat))){ 
			//  //             $("#we_chat").val("");
			//  //       };
			//  });
			// 手机号验证
			// $("#phone").keyup(function(){
			// 	var phone = $("#phone").val();
			// 	if(!(/^\d{0,11}$/.test(phone))){ 
			// 		$("#phone").val("");
			// 	};
			// 	if ($("#phone").val().length == 11) {
			// 		if(!(/^1[34578]\d{0,9}$/.test(phone))){ 
			// 			$("#phone").val("");
			// 		};
			// 	};
			// });
			// 验证码只能输入0-6个数字
			// $("#check_num").keyup(function(){
			// 	var num = $("#check_num").val();
			// 	if(!(/^\d{0,6}$/.test(num))){ 
			// 		$("#check_num").val("");
			// 	};
			// });
			// 身份证号码验证
			// $("#id").keyup(function(){
			// 	var card = $("#id").val().trim();
			// 	 // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
			// 	if(card.length ==15 || card.length == 18){
			// 		var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
			// 		if(reg.test(card) === false){
			// 			$("#id").val("");
			// 		};
			// 	};
			// });
		var pram = {
			open_id: "",
			real_name: "",
			mobile: "",
			verify_code: "",
			wechat_id: "",
			password: "",
			province_code: "",
			city_code: "",
			area_code: "",
			address: "",
			province: "",
			city: "",
			area: "",
			portrait: $.cookie('headimgurl'),
			agent_grade: agent_grade,
			parent_member_id: ""
		};
		// authon_personalid: "",  payment_voucher: "",  picture_front: "", payment_amount: "",
		var msg = "";

		function collectData() {
			pram.parent_member_id = state;
			if($.cookie('random_id') != "null"){
				pram.random_id = $.cookie('random_id');
			};
			// pram.picture_front = "http://img04.tooopen.com/thumbnails/20130701/x_10055061.jpg";
			// pram.payment_voucher = "http://img04.tooopen.com/thumbnails/20130701/x_10055061.jpg";
			msg = "";
			pram.open_id = $.cookie("openid");
			pram.real_name = $("#name").val().trim();
			if(!pram.real_name) {
				msg = "请输入用户名";
				return;
			} else if(pram.real_name.length < 2) {
				msg = "请输入2-25位用户名";
				return;
			};
			if($("#phone").length != 0){
				pram.mobile = $("#phone").val().trim();
				if(!pram.mobile) {
					msg = "请输入11位手机号码";
					return;
				} else if(pram.mobile.length < 11) {
					msg = "请输入11位手机号码";
					return;
				} else if(!(/^1\d{0,10}$/.test(pram.mobile))) {
					msg = "请输入11位手机号码";
					return;
				};
			}
			if($("#check_num").length != 0){
				pram.verify_code = $("#check_num").val().trim();
				if(!pram.verify_code) {
					msg = "请输入验证码";
					return;
				} else if(!(/^\d{0,6}$/.test(pram.verify_code))) {
					msg = "请输入正确验证码";
					return;
				};
			}
			pram.wechat_id = $("#we_chat").val().trim();
			if(!pram.wechat_id) {
				msg = "请输入微信号";
				return;
			} else {
				var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
				if(reg.test(pram.wechat_id)) {
					msg = "微信号支持数字、英文、特殊字符";
					return;
				};
			};
			if(pram.wechat_id.length <6){
		        msg = "微信号不可小于6个位!";
		        return;
		    };
			if(!$("#pwd").val().trim()) {
				msg = "请输入密码";
				return;
			} else if($("#pwd").val().trim().length < 6) {
				msg = "请输入6-15位密码";
				return;
			} else { // 只能输入数字字母
				var pwd = $("#pwd").val().trim();
				//Unicode编码中的汉字范围
				if(!(/^[A-Za-z0-9]+$/.test(pwd))) {
					msg = "密码仅支持数字和字母";
					return;
				};
			}
			pram.password = hex_md5($('#pwd').val());
			if(!$("#value2").attr("value")) {
				msg = "请选择省市区";
				return;
			};
			var arr = $("#value2").attr("value").split(",");

			pram.province_code = arr[0];
			pram.city_code = arr[1];
			pram.area_code = arr[2];
			var arr2 = $("#demo2").val().split(",");
			pram.province = arr2[0];
			pram.city = arr2[1];
			pram.area = arr2[2];
			pram.address = $("#address").val().trim();
			if(!pram.address) {
				msg = "请输入街道地址";
				return;
			} else if(pram.address.length < 5) {
				msg = "详细地址不可低于5位";
				return;
			};
			if(pramIsShow.needCard == 0) { // 身份证
				pram.authon_personalid = $("#id").val().trim();
				if(!pram.authon_personalid) {
					msg = "请输入正确的身份证号码";
					return;
				} else if(pram.authon_personalid.length == 15 || pram.authon_personalid.length == 18) {
					var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
					if(reg.test(pram.authon_personalid) === false) {
						msg = "请输入正确的身份证号码";
						return;
					};
				};
				if(!pram.picture_front) {
					msg = "请上传身份证正面照";
					return;
				};
			};
			pram.payment_amount = $("#money").val().trim();
			if(!pram.payment_amount) {
				msg = "请输入授权金额";
				return;
			};
			if(!(/^[0-9]+$/.test(pram.payment_amount))) {
				msg = "授权金额只能是数字！";
				return;
			};
			if($(".money_div").length != 0){
				if(pramIsShow.needPayment == 0) { // 授权金额
					if(!pram.payment_voucher) {
						msg = "请上传您向上级的打款截图";
						return;
					};
				};
			}
		};
	//	$("#next").on("click", function() {
	//		collectData();
	//		if(msg) {
	//			myLayer.open(msg);
	//			return;
	//		};
	//		$ajax.ajaxPost(null, "004000003", pram,
	//			function(data) {
	//				if(data.success) {
	//					// 删除微信用户信息
	//					//$.cookie('openid',null);
	//					$.cookie('headimgurl',null);
	//					$.cookie('random_id', null);
	//					window.location.href = "dele-register-success.html";
	//				} else {
	//					myLayer.open(data.msg);
	//				};
	//				if(data.code == "30009") {
	//					myLayer.open(data.msg);
	//				}
	//			});
	//	});
		$('#next').click(function(e) {
			collectData();
			if(msg) {
				myLayer.open(msg);
				return;
			};
			__webpack_require__(38).btnCtrl(e, function(target){
				$ajax.ajaxPost(null, "004000003", pram,
					function(data) {
						if(data.success) {
							// 删除微信用户信息
							//$.cookie('openid',null);
							$.cookie('headimgurl',null);
							$.cookie('random_id', null);
							myLayer.open("提交成功！");
	                        setTimeout(function () {
			    				window.location.href = "dele-register-success.html";
						    }, 1000);
						} else {
							if(data.msg){
								myLayer.open(data.msg.substring(0,40));
							}else{
								myLayer.open(data.substring(0,40));
							};
						};
						if(data.code == "30009") {
							myLayer.open(data.msg);
						}
					});
				});
		});
	});

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

/***/ })

/******/ });