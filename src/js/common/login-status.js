var tmp_path_config = require('../../../tmp_path_config.js');
function isLogin(callback) {
	var cookieMemberId = null;
	if(typeof($.cookie) == 'function') {
		cookieMemberId = $.cookie('member_id');
	} 
	if(typeof($.fn.cookie) == 'function') {
		cookieMemberId = $.fn.cookie('member_id');
	} 
    if(!cookieMemberId){
		if(tmp_path_config.wxdomain.indexOf('wxtest') != -1) {
			if(location.href === 'https://wxtest.hanshuweishang.com/html/order/place-order.html') {
				location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + tmp_path_config.appid + '&redirect_uri=https%3A%2F%2F' +  tmp_path_config.wxdomain + '%2Fwechat_web%2Fwechat%2FwxAutho.do%3Fredirect_url%3Dhttps%253A%252F%252Fwxtest.hanshuweishang.com%252Fhtml%252Fwx-login.html%26login_redirect%3Dhttp%3A%2F%2Fwxtest.hanshuweishang.com%2Fhtml%2Forder%2Fplace-order.html&response_type=code&scope=snsapi_userinfo';
			}
			//location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx33c37063f8d0ec8e&redirect_uri=http%3A%2F%2Fwxtest.hanshuweishang.com%2Fwechat_web%2Fwechat%2FwxAutho.do%3Fredirect_url%3Dhttp%253A%252F%252Fwxtest.hanshuweishang.com%252Fhtml%252Fwx-login.html%26login_redirect%3D' + encodeURIComponent(location.href) + '&response_type=code&scope=snsapi_userinfo';
		} else {
			location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + tmp_path_config.appid + '&redirect_uri=https%3A%2F%2F' +  tmp_path_config.wxdomain + '%2Fwechat_web%2Fwechat%2FwxAutho.do%3Fredirect_url%3Dhttps%253A%252F%252Fwx.hanshuweishang.com%252Fhtml%252Fwx-login.html%26login_redirect%3D' + encodeURIComponent(location.href) + '&response_type=code&scope=snsapi_userinfo';
		}
	} else {
		callback();
	}
}
exports.isLogin = isLogin;
