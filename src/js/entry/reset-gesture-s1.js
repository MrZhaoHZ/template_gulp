var remSetting = require('../common/rem.js').remSetting;
var $ajax = require('../common/ajax.js');
var httpURL = require('../common/http-url.js');
var layer = require('../common/layer.js');
var tmp_path_config = require('../../../tmp_path_config.js');
$(function(){
	remSetting();
	var openId = $.fn.cookie('openid');
	// var mobile = $.fn.cookie('mobile');
	//根据openId取手机号
	$ajax.post(null,'004000004',{open_id:openId},function(data){
		if(data.success) {
			$.fn.cookie('mobile',data.data.mobile);
			$('#mobile').val(data.data.mobile);
		}
	});
	// $('#mobile').html(mobile);
	var timeLeft = $('#time-left');
	var timeValue = null;
	var time = null;
	$('#get-valicode').click(function(){
		if(time) {
			clearInterval(time);
		}
		$ajax.ajaxPost4Autho(tmp_path_config.msgReq, {mobile:$('#mobile').val(), handle_type:'modify_password'}, function(data){
			if(data.success) {

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
				timeLeft.hide();
				valicodeBtn.show();
			}
		},1000);
	});
	$('#valicode').keyup(function(){
		$(this).val($(this).val().replace(/\D/g,''));
	});
	$('#nextStep').click(function(){
		if($('#mobile').val() === ''){
			// layer.open('验证码不能为空');
			$('#finish-tips').html('手机号不能为空');
			return;
		} 
		if($('#valicode').val() === ''){
			// layer.open('验证码不能为空');
			$('#finish-tips').html('验证码不能为空');
			return;
		} 
		// $ajax.ajaxPost4Autho('/member/login.do',{login_name:openId,login_verify_code:$('#valicode').val(),login_flag:1},function(data){
		// 	if(data.success) {
		// 		location.href = 'reset-gesture.html';
		// 	} else {
		// 		// layer.open('验证码不正确');
		// 		$('#finish-tips').html('验证码不正确');
		// 	}
		// });
		$.fn.cookie('reset-gesture-valicode', $('#valicode').val());
		location.href = 'reset-gesture.html';
	});
	$('#mobile,#valicode').keyup(function(){
		$(this).val($(this).val().replace(/\D/g,''));
	});
});
