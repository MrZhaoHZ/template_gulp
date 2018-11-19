var $ajax = require('./ajax.js');
var api_path_config = require('../../../tmp_path_config.js');
function redirectByStatus() {
	var openid = null;
	if(typeof($.cookie) == 'function') {
		openid = $.cookie('openid');
	}
	if(typeof($.fn.cookie) == 'function') {
		openid = $.fn.cookie('openid');
	}
	$ajax.post(null,'003000026',{open_id: openid},function(data){
		if( data.code == "30064"){
			//location.href = 'http://' + api_path_config.wxdomain + '/html/team/team-my-upgrade-success.html';
			location.href = 'https://' + api_path_config.wxdomain + '/html/center-upgrading.html';
		}
		if( data.code == "30059"){
			goDeleRegisterUrl(openid);
		}
		// if( data.code == "30067"){
		// 	$ajax.redirectURL();
		// }
		// if (data.code == "30047") {
		// 	ifSetGesture();
		// }
		if (data.code == "30048") { // 能进行注册
			location.href = 'https://' + api_path_config.wxdomain + '/html/no-register.html';
		}
		if (data.code == "30049") {  // 显示进度条
			location.href = 'https://' + api_path_config.wxdomain + '/html/dele-register-success.html';
		}
	});
}

function redirectByStatusIfUpGrading() {// 在正在升级的个人中心里边调用。 仅仅为了判断状态是否为正在升级中。
	var openid = null;
	if(typeof($.cookie) == 'function') {
		openid = $.cookie('openid');
	}
	if(typeof($.fn.cookie) == 'function') {
		openid = $.fn.cookie('openid');
	};
	$ajax.post(null,'003000026',{open_id: openid},function(data){
		if(!data.success && data.code != "30064"){ // 30064正在升级中。
			//location.href = 'http://' + api_path_config.wxdomain + '/html/team/team-my-upgrade-success.html';
			//location.href = 'http://' + api_path_config.wxdomain + '/html/center-upgrading.html';
			location.href = 'https://' + api_path_config.wxdomain + '/html/center.html';
		}
	});
}
function redirectByStatusIfUpGradingMyOrder() {// 在正在升级的个人中心里边调用。 仅仅为了判断状态是否为正在升级中。
	var openid = null;
	if(typeof($.cookie) == 'function') {
		openid = $.cookie('openid');
	}
	if(typeof($.fn.cookie) == 'function') {
		openid = $.fn.cookie('openid');
	};
	$ajax.post(null,'003000026',{open_id: openid},function(data){
		if(!data.success && data.code == "30064"){ // 30064正在升级中。
			//location.href = 'http://' + api_path_config.wxdomain + '/html/team/team-my-upgrade-success.html';
			//location.href = 'http://' + api_path_config.wxdomain + '/html/center-upgrading.html';
			location.href = 'https://' + api_path_config.wxdomain + '/html/order/my-order-upgrading.html';
		}
	});
}
function redirectByStatusIfUpGradingMyOrderUpGrading() {// 在正在升级的个人中心里边调用。 仅仅为了判断状态是否为正在升级中。
	var openid = null;
	if(typeof($.cookie) == 'function') {
		openid = $.cookie('openid');
	}
	if(typeof($.fn.cookie) == 'function') {
		openid = $.fn.cookie('openid');
	};
	$ajax.post(null,'003000026',{open_id: openid},function(data){
		if(!data.success && data.code != "30064"){ // 30064正在升级中。
			//location.href = 'http://' + api_path_config.wxdomain + '/html/team/team-my-upgrade-success.html';
			//location.href = 'http://' + api_path_config.wxdomain + '/html/center-upgrading.html';
			location.href = 'https://' + api_path_config.wxdomain + '/html/order/my-order.html';
		}
	});
}

function goDeleRegisterUrl(openid) {
	$ajax.post(null,'003000029',{open_id: openid},function(data){
		if(data.success){
			var up_id = data.data;
			location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + api_path_config.appid + '&redirect_uri=https%3A%2F%2F' + api_path_config.wxdomain + '%2Fwechat_web%2Fwechat%2FwxAutho.do%3Fredirect_url%3Dhttps%253A%252F%252F' + api_path_config.wxdomain + '%252Fhtml%252Fdele-register.html%26up_id%3D' + up_id + '&response_type=code&scope=snsapi_userinfo';
		}
	});
}
module.exports = {
	redirectByStatus: redirectByStatus,
	goDeleRegisterUrl: goDeleRegisterUrl,
	redirectByStatusIfUpGrading: redirectByStatusIfUpGrading,
	redirectByStatusIfUpGradingMyOrder: redirectByStatusIfUpGradingMyOrder,
	redirectByStatusIfUpGradingMyOrderUpGrading: redirectByStatusIfUpGradingMyOrderUpGrading
}