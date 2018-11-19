var $ajax = require('../common/ajax.js');
var layer = require('../common/layer.js');
var httpURL = require('../common/http-url.js');
$(function() {
	// $ajax.post('/getUserLogo.do',{openid:openId},function(data){
	// 	if(data.success) {
	// 		$('#userLogo').attr('src',data.userLogo);
	// 	}
	// });
	// 判断是否在升级中
	
	var openid = $.cookie('openid');
	var status = 1;
	$ajax.post(null,'003000026',{open_id: openid},function(data){
		if(!data.success && data.code == "30064"){ // 30064正在升级中。
			status = 2;
		}
	});
	var headimgurl = $.cookie('headimgurl');
	// $('#userLogo').attr('src',headimgurl);
	$('#userLogo').css({'background-image':'url('+headimgurl+')'});
	$('#go-wx-login').attr('href','wx-login.html?from=gesture-login');
	$('#forger-pwd').attr('href','reset-gesture-s1.html');
	var lock = new PatternLock("#patternContainer", {
		onDraw: function(pattern) {
			if(pattern.length < 6) {
				layer.open('手势密码长度不能少于6位');
				lock.reset();
			}
			// var openid = "wx000111 ";
			// var pattern = "e10adc3949ba59abbe56e057f20f883e"
			$ajax.ajaxGet4AuthoCR('/member/login.do', {login_name:openid,login_pwd:pattern,login_flag:2}, function(data){
				if(data.success) {
					$.cookie('memberId',data.memberId);
					// $.cookie('openId',data.openId);
					// location.href = 'center.html';
					var login_redirect = localStorage.getItem('login_redirect');
					localStorage.removeItem('login_redirect');
					if(login_redirect) {
						location.href = login_redirect;
					} else {
						$ajax.post(null,'003000002',{},function(datas){
							if(datas.success) {
								if(status == 1){
									location.href = 'center.html?from=login';
								}else if(status == 2){// 正在升级中
									location.href = 'center-upgrading.html?from=login';
								};
							}else{
								if(datas.msg){
									// layer.open(datas.msg.substring(0,40));
									// layer.open({content:datas.msg.substring(0,40),time:1});
										layer.open(datas.msg.substring(0,40));
									
								}else{
									// layer.open(datas.substring(0,40));
									// layer.open({content:datas.msg.substring(0,40),time:1});
										layer.open(datas.msg.substring(0,40));
								};
								return;
							}
						});
						
						
						// location.href = $ajax.redirectURL();
					}
				} else {
					lock.reset();
					if(data.code === '30013' || data.code === "40015") {
						layer.open(data.msg);
					}
				}
			});
		}
	});
});