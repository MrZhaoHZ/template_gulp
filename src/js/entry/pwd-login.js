var $ajax = require('../common/ajax.js');
var wx = require('../common/wx.js');
var remSetting = require('../common/rem.js').remSetting;
var layer = require('../common/layer.js');
$(function() {
    remSetting();
    var publicKey = {};
    $('#mobile').keyup(function(){
		$(this).val($(this).val().replace(/\D/g,''));
	});
    $('#login-btn').click(function(){
		if($('#mobile').val() === '') {
			// layer.open('手机号不能为空');
			$('#finish-tips').html('手机号不能为空');
			return;
		}
		if($('#mobile').val().length < 11) {
			$('#finish-tips').html('请输入正确的手机号');
		}
		if($('#pwd').val() === '') {
			// layer.open('密码不能为空');
			$('#finish-tips').html('密码不能为空');
			return;
		}
		// $ajax.post('/getPublicKey.do', {}, function(data) {
			// publicKey.publicKeyExponent
			// publicKey.publicKeyModulus
		// });
		// RSAUtils.setMaxDigits(200);
		// var key = new RSAUtils.getKeyPair(publicKey.publicKeyExponent ,"",publicKey.publicKeyModulus);  
		// var enPwd = RSAUtils.encryptedString(key,$('#pwd').val().split("").reverse().join("")); 
		// var enPwd = RSAUtils.encryptedString(key,hex_md5($('#pwd'))); 
		var enPwd = hex_md5($('#pwd').val());
		// console.log($('#pwd').val()) 
		// var dePwd = RSAUtils.decryptedString(enPwd, key);
		$ajax.ajaxGet4AuthoCR('/member/login.do', {login_flag: 0,login_name:$('#mobile').val(),login_pwd: enPwd}, function(data) {
			if(data.success) {
				var member_id = data.data.member_id;
				var login_name = data.data.login_name;
				var open_id = data.data.open_id;
				$ajax.ajaxPost(null, "003000026", {open_id: open_id}, function(data){ // 判断是否需要展示审核进度
					// if (data.code == "30048" || data.code == "30059") { // 能进行注册
					// 	$(".container").css("display", "block");
					// 	$('#user-pic').attr('src', $.fn.cookie('headimgurl'));
					// 	getData();
					// 	if (data.msg !="可以发起注册申请") {  // 被拒绝
					// 		$(".err-warning").css("display", "block");
					// 		$(".warning-bottom").text("原因：" + data.msg);
					// 	};
					// 	return;
					// };
					$.fn.cookie('openid',open_id);

					$ajax.post(null,'003000002',{},function(datas){
						if(datas.success) {
							if (data.code == "30064") {  // 正在升级中
								location.href = 'center-upgrading.html?from=login';
							} else {
								$.fn.cookie('member_id',member_id);
								$.fn.cookie('login_name',login_name);
								$.fn.cookie('mobile',null);
								$.fn.cookie('headimgurl',null);

								location.href = 'center.html?from=login';
							}
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


					
					// if (data.code == "30047" || data.code == "30050") {  // 注册成功 并且 审核通过 (已经成为代理商)
					// 	window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + tmp_path_config.appid + '&redirect_uri=http%3A%2F%2F' + tmp_path_config.wxdomain + '%2Fwechat_web%2Fwechat%2FwxAutho.do%3Fredirect_url%3Dhttp%253A%252F%252F' + tmp_path_config.wxdomain + '%252Fhtml%252Fwx-login.html&response_type=code&scope=snsapi_userinfo';
					// 	return;
					// };
				});
			} else {
				if(data.code === "30008" || data.code === "30011" || data.code === "30013" || data.code === "40008" || data.code === "30050" || data.code === '40015'){
					$('#finish-tips').html(data.msg);
				}
			}
		});
	});
});
