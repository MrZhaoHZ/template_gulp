var api_path_config = require('../../../tmp_path_config.js');
// var wxModule = require('../common/wx.js');
var httpURL = require('../common/http-url.js');
$(function(){
	function getQueryString(name) {
	    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) {
	        return unescape(r[2]);
	    }
	    return null;
	}
//	console.log(window.location.href)
//	var openId = getQueryString('openId');
	var actid = getQueryString('act_id');

	// var url = window.location.href,
	// 	actstart = url.indexOf("actId=")-0+6,
	// 	actover = url.length,
	// 	actid = url.substring(actstart,actover),
	// 	opensatrt = url.indexOf("openId=")-0+7,
	// 	openover = url.indexOf("&actId="),
	// 	openId = url.substring(opensatrt,openover);
		// developAgentLink = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + api_path_config.appid + '&redirect_uri=http%3A%2F%2F' + api_path_config.wxdomain + '%2Fwechat_web%2Fwechat%2FwxAutho.do%3Fredirect_url%3Dhttp%253A%252F%252F' + api_path_config.wxdomain + '%252Fhtml%252Fdele-register.html%26up_id%3D' + require('../common/base64.js').encode(data.data.member_id) + '&response_type=code&scope=snsapi_userinfo';
	// location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + api_path_config.appid + '&redirect_uri=http%3A%2F%2F' + api_path_config.wxdomain + '%2Fwechat_web%2Fwechat%2FwxAutho.do%3Fredirect_url%3Dhttp%253A%252F%252F' + api_path_config.wxdomain + '%252Fhtml%252Fdele-register.html%26up_id%3D' + upId + '&response_type=code&scope=snsapi_userinfo';
 		 var developAgentLink = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + api_path_config.appid + '&redirect_uri=https%3A%2F%2F' + api_path_config.wxdomain + '%2Fwechat_web%2Fwechat%2FwxAutho.do%3Fredirect_url%3Dhttps%3a%2f%2f' + api_path_config.wxdomain + '%2fhtml%2fshareTodl-wx.html' + '%26act_id%3d'+ actid +'&response_type=code&scope=snsapi_userinfo';
 		 console.log(developAgentLink)
 		 location.href = developAgentLink;
});
