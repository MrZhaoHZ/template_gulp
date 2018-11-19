var api_path_config = require('../../../tmp_path_config.js');
// var wxModule = require('../common/wx.js');
var httpURL = require('../common/http-url.js');
$(function(){
	var upId = httpURL.getQueryString('up_id');
	location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + api_path_config.appid + '&redirect_uri=https%3A%2F%2F' + api_path_config.wxdomain + '%2Fwechat_web%2Fwechat%2FwxAutho.do%3Fredirect_url%3Dhttps%253A%252F%252F' + api_path_config.wxdomain + '%252Fhtml%252Fdele-register.html%26up_id%3D' + upId + '&response_type=code&scope=snsapi_userinfo';
});
