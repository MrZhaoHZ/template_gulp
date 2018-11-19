var wxModule = require('../common/wx.js');
var remSetting = require('../common/rem.js').remSetting;
var $ajax = require('../common/ajax.js');
var httpURL = require('../common/http-url.js');
var tmp_path_config = require('../../../tmp_path_config.js');
var localStorage = require('../common/localStorage.js');
var layer = require('../common/layer.js');
$(function() {
	if(!wxModule.isWX()) {
		location.href = 'pwd-login.html';
	}
	remSetting(true);
	var fromPage = httpURL.getQueryString('from');
	var wxCode = httpURL.getQueryString('code');
	var openId = null;
	var publicKey = {};
	var  myStatus = 1;
	if(fromPage != 'gesture-login') {
		// $('.Hd').removeClass('Hd');
		$ajax.ajaxWxAutho('/wechat/userinfo.do',{code: wxCode},function(data){
			// $('#user-pic').attr('src',data.headimgurl);
			$('#user-pic').css({'background-image':'url('+data.headimgurl+')'});
			$.fn.cookie('openid',data.openid);
			openId = data.openid;
			$.fn.cookie('headimgurl',data.headimgurl);
			// syncUserLogo(data.headimgurl);
			isAgent(data.openid);
		});
	} else {
		$('#login-btn').click(loginClick);
		$('.Hd').removeClass('Hd');
		// $('#user-pic').attr('src',$.fn.cookie('headimgurl'));
		$('#user-pic').css({'background-image':'url('+$.fn.cookie('headimgurl')+')'});
		isUpGrading($.fn.cookie('openid'));
	}
	function isUpGrading(openid){
		$ajax.post(null,'003000026',{open_id: openid},function(data){
			if( data.code == "30064"){
				//location.href = 'center-upgrading.html?from=login';
				myStatus = 2;
			}
		});
	}
	//判断是否已注册代理/升级审核情况
	function isAgent(openid) {
		$ajax.post(null,'003000026',{open_id: openid},function(data){
			if( data.code == "30064"){
				//location.href = 'center-upgrading.html?from=login';
				myStatus = 2;
				alert("正在升级中！")
				ifSetGesture();
			}
			if( data.code == "30059"){
				require('../common/agent-status.js').goDeleRegisterUrl(openid);
			}
			if (data.code == "30047" || data.code == "30050" || data.code == "30067" || data.code == "30060") {
				ifSetGesture();
			}
			if (data.code == "30048") { // 能进行注册
				location.href = 'no-register.html';
			}
			if (data.code == "30049") {  // 显示进度条
				location.href = "dele-register-success.html";
			}
			$('#login-btn').click(loginClick);
		});
	}

	//判断有没有设置手势密码
	function ifSetGesture() {
		$ajax.post(null,'004000004',{open_id:$.fn.cookie('openid')},function(data){
			if(data.success) {
				if(data.data.have === 1) {
					location.href = 'gesture-login.html' ;
				} else {
					$('.Hd').removeClass('Hd');
					if(data.data.have != 2) {
						$('#handpattern').show();
					}
				}
			}
		});
	}
	
	// $ajax.post('/getPublicKey.do', {}, function(data) {
	// 	publicKey.publicKeyExponent = data.publicKeyExponent;
	// 	publicKey.publicKeyModulus = data.publicKeyExponent;
	// });
	//同步微信图像
	function syncUserLogo(imgsrc) {
		//$ajax.post('/syncUserLogo',{imgsrc:imgsrc},function(data){});
	}
	function loginClick(){
		// RSAUtils.setMaxDigits(200);
		// var key = new RSAUtils.getKeyPair(publicKey.publicKeyExponent ,"",publicKey.publicKeyModulus);  
		// var enPwd = RSAUtils.encryptedString(key,hex_md5($('#pwd'))); 
		// var openId = 'wx000111';
		if($('#pwd').val() === ''){
			layer.open('请输入登录密码');
			return;
		}
		var enPwd = hex_md5($('#pwd').val()); 
		// var enPwd = $('#pwd').val(); 
		//加密后的
		$ajax.ajaxGet4AuthoCR('/member/login.do',{login_name:$.fn.cookie('openid'), login_pwd:enPwd, login_flag:3},function(data){
			if(data.success) {
				$.fn.cookie('member_id',data.data.member_id);
				$.fn.cookie('login_name',data.data.login_name);
				var login_redirect = localStorage.getItem('login_redirect');
				localStorage.removeItem('login_redirect');
				$ajax.post(null,'003000002',{},function(datas){
						if(datas.success) {
							if(myStatus == 1){
								location.href = 'center.html?from=login';
							}else if(myStatus == 2){
								location.href = 'center-upgrading.html?from=login';
							}
						}else{
							if(datas.msg){
								// layer.open(datas.msg.substring(0,40));
								layer.open(datas.msg.substring(0,40));
							}else{
								// layer.open(datas.substring(0,40));
								// layer.open({content:datas.msg.substring(0,40)});
								layer.open(datas.msg.substring(0,40));
							};
							return;
						}
					});
				
//				if(login_redirect) {
//					location.href = login_redirect;
//				} else {
//					if(myStatus == 1){
//						location.href = 'center.html?from=login';
//					}else if(myStatus == 2){
//						location.href = 'center-upgrading.html?from=login';
//					}
//					
//				}
			} else {
				if(data.code === '30013' || data.code === '40008' || data.code === '40015'){
					layer.open(data.msg);
				}
			}
		});
	}
	
});
