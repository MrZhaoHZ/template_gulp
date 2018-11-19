var remSetting = require('../common/rem.js').remSetting;
var $ajax = require('../common/ajax.js');
var wxModule = require('../common/wx.js');
var layer = require('../common/layer.js');
var tmp_path_config = require('../../../tmp_path_config.js');
var httpURL = require('../common/http-url.js');
$(function(){
	var from = httpURL.getQueryString('from');
	remSetting();
	var timeLeft = $('#time-left');
	var timeValue = null;
	var time = null;
	var is_actDele = 0;
	if(wxModule.isWX()){
		//根据openId取手机号
		//is_act_dele(); // 判断用户是否是活动引流进来的代理商 如果是引流进来的就必须输入微信号！
		var openId = $.fn.cookie('openid');
		$ajax.post(null,'004000004',{open_id:openId,member_id:''},function(data){
			if(data.success) {
				if(from == "login"){ // 下单成为代理商后第一次进入时设置密码
					
				}else{
					$('#phoneNum').val(data.data.mobile);
					$('#phoneNum').attr("disabled", "disabled");
				}
			}
		});
	} else {
		//取会员号
		var memberId = $.fn.cookie('member_id');
		//根据memberId取手机号
		$ajax.post(null,'004000004',{open_id:'',member_id: memberId},function(data){
			if(data.success) {
				if(from == "login"){ // 下单成为代理商后第一次进入时设置密码
					
				}else{
					$('#phoneNum').val(data.data.mobile);
					$('#phoneNum').attr("disabled", "disabled");
				}
			}
		});
	}
	
	function  is_act_dele()  
	{  
		$ajax.ajaxDlGet("008000007", {open_id: $.fn.cookie('openid')}, function(data){
			if(data.success) {
				if(data.data){
					is_actDele = 1; // 返回data.data = true 时就是引流进来的
					$(".div_we_chat").css("display", '');
				}
			}
		});
	};
	
	
	
	$('#get-valicode').click(function(){
		if($('#phoneNum').val() === '') {
			$('#finish-tips').html('手机号不能为空');
			return;
		}
		if(time) {
			clearInterval(time);
		}
		$ajax.ajaxPost4Autho(tmp_path_config.msgReq, {mobile:$('#phoneNum').val(), handle_type:'modify_password'}, function(data){
			if(data.success) {
				// $.cookie('memberId',data.memberId);
				// $.cookie('openId',data.openId);
				// location.href = 'reset-gesture.html';
			}else if(data.code === '30008'){
				layer.open(data.msg);
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
	$('#phoneNum').keyup(function(){
		$(this).val($(this).val().replace(/\D/g,''));
	});
	$('#valicode').keyup(function(){
		$(this).val($(this).val().replace(/\D/g,''));
	});
	$('#password').keyup(function(){
		$(this).val($(this).val().replace(/[\W]/g,''));
	});
	$('#finish-reset').click(function(){
		if($('#phoneNum').val() == '') {
			$('#finish-tips').html('请输入手机号');
			return;
		}
		if($('#valicode').val()=='') {
			$('#finish-tips').html('请输入验证码');
			return;
		}
		if($('#weChat').val()==''  && is_actDele == 1) { // 当is_actDele ==  1 的时候就是引流进来的，微信号必须填，已经有微信号的时候就不需要填写
			$('#finish-tips').html('请输入微信号');
			return;
		}
		if($('#password').val()=='') { 
			$('#finish-tips').html('请输入新密码');
			return;
		} else {
			var password = $('#password').val();
			if(password.length < 6) {
				$('#finish-tips').html('请输入6-15位密码');
				return;
			} else {
				if(!(/^[0-9a-zA-Z]+$/.test(password))) {
					$('#finish-tips').html('只能输入字母和数字');
					return;
				}
			}
		}
		var resetPwdReq = '';
		if(wxModule.isWX()){
			resetPwdReq = '004000007';
		} else {
			resetPwdReq = '004000007';
		}
		$ajax.ajaxPost(null, resetPwdReq, {mobile:$('#phoneNum').val(), verify_code: $('#valicode').val(), wechat_id: $('#weChat').val(), modify_type: '2',pwd:hex_md5($('#password').val())}, function(data){
			if(data.success) {
				layer.open('重置密码成功');
				setTimeout(function(){
					$ajax.redirectURL();
				},2000);
			} else {
				if(data.code === '30010' || data.code === '30014' || data.code === '30008'){
					$('#finish-tips').html(data.msg);
				}
			}
		});
	});
});
