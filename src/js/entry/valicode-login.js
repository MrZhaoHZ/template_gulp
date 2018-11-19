var wx = require('../common/wx.js');
var remSetting = require('../common/rem.js').remSetting;
var $ajax = require('../common/ajax.js');
var tmp_path_config = require('../../../tmp_path_config.js');
$(function(){
	remSetting();
	var timeLeft = $('#time-left');
	var timeValue = null;
	var time = null;
	$('#get-valicode').click(function(){
		if($('#mobile').val() === '') {
			$('#finish-tips').html('手机号不能为空');
			return;
		}
		if(time) {
			clearInterval(time);
		}
		$ajax.ajaxPost4Autho(tmp_path_config.msgReq, {mobile:$('#mobile').val(), handle_type:'login'}, function(data){
			if(data.success) {
				$('#get-valicode').html('&nbsp;&nbsp;&nbsp;重发');
			} else {
				if(data.code === "30008") {
					$('#finish-tips').html(data.msg);
				}
			}
		});
		timeValue = 60;
		var valicodeBtn = $(this);
		valicodeBtn.hide();
		timeLeft.html(timeValue + 's').show();
		time = setInterval(function(){
			timeValue--;
			if(timeValue > 0) {
				timeLeft.html(timeValue + 's');
			} else {
				// clearInterval(time);
				timeLeft.hide();
				valicodeBtn.show();
			}
		},1000);
	});
	$('#login-btn').click(function(){
		if($('#mobile').val() === '') {
			// layer.open({
			// 	content: '手机号不能为空'
			// 	,skin: 'msg'
			// 	,time: 2 //2秒后自动关闭,
			// 	,fixed: false
			// 	,top: -250
			// 	// ,anim: false
			// });
			$('#finish-tips').html('手机号不能为空');
			return;
		}
		if($('#valicode').val() === '') {
			// layer.open({
			// 	content: '验证码不能为空'
			// 	,skin: 'msg'
			// 	,time: 2 //2秒后自动关闭,
			// 	,fixed: false
			// 	,top: -250
			// 	// ,anim: false
			// });
			
			$('#finish-tips').html('验证码不能为空');
			return;
		}
		$ajax.ajaxGet4AuthoCR('/member/login.do', {login_flag: 1,login_name:$('#mobile').val(),login_verify_code:$('#valicode').val()}, function(data) {
			if(data.success) {
				$.fn.cookie('member_id',data.data.member_id);
				$.fn.cookie('login_name',data.data.login_name);
				$.fn.cookie('openid',data.data.open_id);

				$ajax.post(null,'003000002',{},function(datas){
					if(datas.success) {
						location.href = 'center.html?from=login';
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
			} else {
				if(data.code === "30014" || data.code === "30010"|| data.code === "30008" || data.code === "40015") {
					$('#finish-tips').html(data.msg);
				}
			}
		});
	});
	$('#mobile,#valicode').keyup(function(){
		$(this).val($(this).val().replace(/\D/g,''));
	});
});