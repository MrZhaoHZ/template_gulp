/*
* @Author: Administrator
* @Date:   2018-02-09 14:37:04
 * @Last Modified by: Jing
 * @Last Modified time: 2018-03-14 15:09:49
*/

var wxModule = require('../common/wx.js');
var remSetting = require('../common/rem.js').remSetting;
var localStorage = require('../common/localStorage.js');
var $ajax = require('../common/ajax.js');
var localStorage = require('../common/localStorage.js');
var layer = require('../common/layer.js');
var self_tpl = require('../module/tpl/dele-register-tpl.js');
var httpURL = require('../common/http-url.js');
var string2object = require('../common/jsonstring2object.js');
var tmp_path_config = require('../../../tmp_path_config.js');

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
	console.log(window.location.href)
	var openid = getQueryString('openId');
	var actid = getQueryString('actId');


	var wxPram = {
			code: "",
			random_id: null
		};
	wxPram.code = httpURL.getQueryString('code');   // 
	var random_id = httpURL.getQueryString('randomId');
	// $.fn.cookie('random_id', random_id);
	// 判断验证码是否注册
	
	var actopenid = "";
	// if (random_id != 'null') {
	// 		wxPram.random_id = random_id;
	// 	};
	// 通过code拿到用户头像 和 opendid 存入cookie。注册成功后删除
	// $.fn.cookie('openid',null);
	// $.fn.cookie('headimgurl',null);
	// var openid = $.fn.cookie('openid');
	
	// function getUserInfo (){
	$ajax.ajaxWxAutho('/wechat/userinfo.do', wxPram,function(data){
			actopenid = data.openid;
			deleProcess(actopenid);
 	});
 	function deleProcess(actopenid){
 		// $ajax.ajaxPost(null, "004000009", {open_id: actopenid},
			// function(data){
			// 	if(data.success){
			// 		if (data.data) { // 关注过
						var developAgentLink = tmp_path_config.wxdomainDL +'/static/html/drainageActivity/drainageShare.html?act_id='+ actid +'&openid='+ actopenid +'&member_id='+ openid;
						console.log(developAgentLink)
			 		 	location.href = developAgentLink;
				// 	}else{ // 没关注公众号
				// 		$('.container').css("display", "block");
				// 		$(".qr_code").css("display", "block");
				// 		console.log(123)
				// 		$("#qr_code_img").attr("src", "../images/" + tmp_path_config.wxQrcode);
				// 		return;
				// 	};
				// }else{
				// 	layer.open("是否关注公众号获取失败！");
				// 	alert(openid);
				// };	
		// });
 	};
	// }

	
 		 // var developAgentLink = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + api_path_config.appid + '&redirect_uri=http%3A%2F%2F' + api_path_config.wxdomain + '%2Fwechat_web%2Fwechat%2FwxAutho.do%3Fredirect_url%3Dhttp%3a%2f%2f' + api_path_config.wxdomain + '%2fhtml%2fshareTodl.html%26open_id%3d' + openId + '%26act_id%3d'+ actid +'&response_type=code&scope=snsapi_userinfo';

 		 
 		 // location.href = developAgentLink;
});
