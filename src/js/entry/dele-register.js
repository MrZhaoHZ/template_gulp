var wxModule = require('../common/wx.js');
var remSetting = require('../common/rem.js').remSetting;
var localStorage = require('../common/localStorage.js');
var $ajax = require('../common/ajax.js');
var localStorage = require('../common/localStorage.js');
var layer = require('../common/layer.js');
var self_tpl = require('../module/tpl/dele-register-tpl.js');
var httpURL = require('../common/http-url.js');
var string2object = require('../common/jsonstring2object.js');
var tmp_path_config = require('../../../tmp_path_config.js');
remSetting();
$(function() {
		var upId = httpURL.getQueryString('upId');
		var levelId = httpURL.getQueryString('levelId');

		if (upId === 'null') {
			upId = "1"
		}else{
			upId = require('../common/base64.js').decode(upId);
		};
		var pram = {
			level: "",
			name: ""
		}
		var auth_amount = "";
		$(".swiper-wrapper").on("click",".swiper-slide",function(){
			var index = $(this).index();
			auth_amount = $(this).attr("auth_amount");
			$(".remark").html($(this).find(".hide_div").html());
			pram.name = $(".swiper-slide").eq(index).attr("agent_name");
			pram.level = $(this).attr("agent_grade");
			$(".swiper-wrapper .swiper-slide .border").css("display","none");
			$(".swiper-wrapper .swiper-slide").css("border","0.02rem solid #ccc");
			$(this).find(".border").css("display","inline-block");
			$(this).css("border","0.02rem solid #66c300");
			var height = window.screen.availHeight - $(".container").height() - $(".next-div").height();
			if(height< 0){
				$(".next-div").css("bottom", -$(".container").height() + window.screen.availHeight -$(".next-div").height() -20  + "px");
			}else {
				$(".next-div").css("bottom", "0px");
			};
		 });
		 var info;
		//getData();
		function getData(){
				// 可选代理类型
				$ajax.ajaxPost(null, "003000017", {member_id: upId}, 
					function(data){
						if (data.code == "10000") {
								mySwiper = new Swiper('.swiper-container', {
									nextButton: '.swiper-button-next',
										prevButton: '.swiper-button-prev',
										pagination: '.swiper-pagination',
										slidesPerView: 3,
										paginationClickable: true,
										spaceBetween: 30,
										freeMode: true
								});
								if (levelId && levelId !='null') {
									var index = selectDelegateLevel(levelId, data.data.des);
									var tmp = [];
									//var index = parseInt(levelId) - 1;
									tmp.push(data.data.des[index]);
									$(".swiper-wrapper").html(doT.template(self_tpl.getDeltRegisterTpl)(tmp));
									mySwiper.updateSlidesSize();
									$(".swiper-slide[agent_grade='" + levelId +"']").trigger("click");
									// $(".swiper-slide[agent_grade!='" + levelId +"']").remove();
								}else{
									$(".swiper-wrapper").html(doT.template(self_tpl.getDeltRegisterTpl)(data.data.des));
									mySwiper.updateSlidesSize();
								};
						};
						$(".next-div").css("bottom", "0px");
						if (data.code == "30044" || data.code == "30046" || data.code == "30047" ||data.code == "30048" || data.code == "30049" || data.code == "30050" || data.code == "20002") {
							layer.open(data.msg);
						};
						
						// if (data.code == "10000") {
						//   var data = string2object.parse(data);
						//   info = data.data.des;
						//   $('.swiper-wrapper').append(doT.template(self_tpl.getDeltRegisterTpl)(data.data.grade_name));
						//   mySwiper.updateSlidesSize();
						// };
						
					});
				// 个人中心代理商我的上级信息
				$ajax.ajaxPost(null, "003000016", {member_id: upId}, 
					function(data){
						if (data.code == "10000") {
							$("#superior_name").text(data.data.real_name);
							$("#superior_level").text(data.data.grade_name);
						};
					});
		};
	function selectDelegateLevel (levelId, data){
		var len = data.length;
		for(var i=0; i<len; i++){
			if(data[i].id == levelId){
				return i;
				break;
			}
		}
	};
	var wxPram = {
		code: ""
	};
	wxPram.code = httpURL.getQueryString('code');   // 
	var random_id = httpURL.getQueryString('randomId');
	$.fn.cookie('random_id', random_id);
	// 判断验证码是否注册
	
	var openid = "";
	if (random_id != 'null') {
			wxPram.random_id = random_id;
		};
	// 通过code拿到用户头像 和 opendid 存入cookie。注册成功后删除
	// $.fn.cookie('openid',null);
	// $.fn.cookie('headimgurl',null);
	var openid = $.fn.cookie('openid');
	if(openid){ // 已经获取用户信息  用户刷新页面问题解决
		deleProcess();
	}else{ // 没有获取用户信息
		getUserInfo();
	};
	function getUserInfo (){
		$ajax.ajaxWxAutho('/wechat/userinfo.do', wxPram,function(data){
				if(!data.openid && data.code != "40090"){ // 获取openid失败！
					layer.open("获取openid失败！");
				};
				$.fn.cookie('openid',data.openid);
				$.fn.cookie('headimgurl', data.headimgurl || '../images/default_head_pic.jpg');
				//$('#user-pic').attr('src',data.headimgurl);
				openid = data.openid;
				isDelegate(); // 是否是代理商 是代理上就进入登录页
				if (data.code == "40090") { // 二维码已经被注册过
					$(".enable").css("display", "block");
					$(".enable .enable_prompt").text("代理注册二维码失效");
					return;
				};
				deleProcess();
	 	});
	}
 	// 有用户头像和openid后的判断流程
 	function deleProcess(){
 		$ajax.ajaxPost(null, "004000009", {open_id: openid},
			function(data){
				if(data.success){
					if (data.data) { // 关注过
						isShowProcess();
					}else{ // 没关注公众号
						//$('.container').css("display", "block");
						$(".qr_code").css("display", "block");
						$("#qr_code_img").attr("src", "../images/" + tmp_path_config.wxQrcode);
						return;
					};
				}else{
					layer.open("是否关注公众号获取失败！");
					alert(openid);
				};	
		});
 	};
 	function isShowProcess(){ // 判断是否需要展示审核进度
 		$ajax.ajaxPost(null, "003000026", {open_id: openid},
			function(data){ 
				if(data.success){
					
				} else {
					if (data.code == "30048" || data.code == "30059") { // 能进行注册
						$(".container").css("display", "block");
						$('#user-pic').attr('src', $.fn.cookie('headimgurl'));
						getData();
						if (data.msg !="可以发起注册申请") {  // 被拒绝
							$(".err-warning").css("display", "block");
							$(".warning-bottom").text("原因：" + data.msg);
						};
						return;
					};
					if (data.code == "30049") {  // 显示进度条
						window.location.href = "dele-register-success.html";
						return;
					};
					if (data.code == "30047" || data.code == "30050" || data.code == "30064" || data.code == "30060" ) {  // 注册成功 并且 审核通过 (已经成为代理商)
						window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + tmp_path_config.appid + '&redirect_uri=http%3A%2F%2F' + tmp_path_config.wxdomain + '%2Fwechat_web%2Fwechat%2FwxAutho.do%3Fredirect_url%3Dhttps%253A%252F%252F' + tmp_path_config.wxdomain + '%252Fhtml%252Fwx-login.html&response_type=code&scope=snsapi_userinfo';
						return;
					};
				}
			});
 	};
 	function isDelegate(){ // 判断是否是代理商，是代理商就跳转到登陆页面
 		$ajax.ajaxPost(null, "003000026", {open_id: openid},
			function(data){ 
				if(data.success){
					
				} else {
					if (data.code == "30047" || data.code == "30050" || data.code == "30064" || data.code == "30060" ) {  // 注册成功 并且 审核通过 (已经成为代理商)
						window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + tmp_path_config.appid + '&redirect_uri=https%3A%2F%2F' + tmp_path_config.wxdomain + '%2Fwechat_web%2Fwechat%2FwxAutho.do%3Fredirect_url%3Dhttps%253A%252F%252F' + tmp_path_config.wxdomain + '%252Fhtml%252Fwx-login.html&response_type=code&scope=snsapi_userinfo';
						return;
					};
				}
			});
 	}
 	// function isFollowFun (){
 	// 	$ajax.ajaxPost(null, "004000009", {open_id: openid},
		// 	function(data){
		// 		if (data.data) {
		// 			isNext = 1;
		// 		}else{
		// 			isNext = 2;
		// 		};
		// });
 	// }
	// localStorage.setItem("openid", "wxopenid123456");
	$("#next").on("click", function(){
		if (pram.name.trim()) {
			localStorage.setItem("apply_level", pram.name);
			// if(pram.level == 2){
			// window.location.href = "dele-register-basic.html?agent_grade=" + pram.level + "&upId=" + upId + "&auth_amount=" + auth_amount;
			// // }else{
				window.location.href = "dele-register-basic.html?agent_grade=" + pram.level + "&upId=" + upId + "&auth_amount=" + auth_amount;
			// }
			
		}else{
			layer.open("请选择代理类型！");
		};
	});
});