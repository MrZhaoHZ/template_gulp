var $ajax = require('../common/ajax.js');
var httpURL = require('../common/http-url.js');
$(function() {
	//第一次设置的密码
	var firstPwd = null;
	var secondPwd = null;
	var lock = new PatternLock("#patternContainer", {
		onDraw: function(pattern) {
			// console.log(pattern);
			lock.error();
			if(!firstPwd) {
				firstPwd = pattern;
				$('#reset-tip').html('确认手势密码');
			} else {
				secondPwd = pattern;
				if(firstPwd === secondPwd) {
					$ajax.post(null,'004000008',{pwd: secondPwd},function(data){
						if(data.success) {
							//重置手势密码成功后，跳转到个人中心（登录状态）
							// var login_redirect = localStorage.getItem('login_redirect');
							// localStorage.removeItem('login_redirect');
							// if(login_redirect) {
							// 	location.href = login_redirect;
							// } else {
							// 	location.href = 'center.html?from=login';
							// }
							$ajax.redirectURL();
						}
					});
				} else {
					firstPwd = null;
					secondPwd = null;
					$('#reset-tip').html('两次手势密码不一致，请重新设置').addClass('active');
					setTimeout(function(){
						$('#reset-tip').html('请设置手势密码').removeClass('active');
					},1000);
				}
			}
			lock.reset();
		}
	});
});