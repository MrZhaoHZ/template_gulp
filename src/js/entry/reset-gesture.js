var $ajax = require('../common/ajax.js');
var httpURL = require('../common/http-url.js');
$(function() {
	//第一次设置的密码
	var firstPwd = null;
	var secondPwd = null;
	var mobile = $.cookie('mobile');
	var openId = $.cookie('openid');
	var valicode = $.cookie('reset-gesture-valicode');
	var lock = new PatternLock("#patternContainer", {
		onDraw: function(pattern) {
			console.log(pattern);
			lock.error();
			if(!firstPwd) {
				firstPwd = pattern;
				$('#reset-tip').html('确认手势密码');
			} else {
				secondPwd = pattern;
				if(firstPwd === secondPwd) {
					$ajax.ajaxPost(null,'004000007', {mobile:mobile, verify_code: valicode, modify_type: '1',pwd:secondPwd}, function(data){
						if(data.success) {
							//重置手势密码成功后，跳转到个人中心（登录状态）
							$('#reset-tip').html('手势密码重置成功');
							setTimeout(function(){
								// location.href = 'center.html?from=login';
								$ajax.redirectURL();
							},2000);
						} else {
							if(data.code == '30010'){
								$('#reset-tip').html('<i style="color:red;font-style: normal;">' + data.msg + '</i>');
							}
							if(data.code == '30014'){
								$('#reset-tip').html(data.msg);
								setTimeout(function(){
									location.href = 'account-setting.html'
								},2000);
							}
						}
					});
				} else {
					firstPwd = null;
					secondPwd = null;
					$('#reset-tip').html('两次手势密码不一致，请重新设置').addClass('active');
					setTimeout(function(){
						$('#reset-tip').html('请设置手势密码').removeClass('active');
					},500);
				}
			}
			
			lock.reset();

		}
	});
});