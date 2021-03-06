require('../common/localStorage.js').setItem('login_redirect',location.href);
var $ajax = require('../common/ajax.js');
var self_tpl = require('../module/tpl/center-tpl.js');
var api_path_config = require('../../../tmp_path_config.js');
var wxModule = require('../common/wx.js');
var wxShare = require('../common/wx-share.js').wxShare;
var layer = require('../common/layer.js');
$(function(){
	// require('../common/login-status.js').isLogin(function(){require('../common/rem.js').remSetting();});
	require('../common/rem.js').remSetting();
	require('../common/agent-status.js').redirectByStatus();
	//发展代理链接
	var developAgentLink = null;
	var allowShare = false;
	//轮播图
	$ajax.post(null, '005000001', {}, function(data) {
		if(data.success && data.data){
			data.image_prefix = api_path_config.upload_path;
			$('#swiper-container').html(doT.template(self_tpl.swiperTpl)(data));
			var swiper = new Swiper('.swiper-container', {
				pagination: '.swiper-pagination',
				paginationClickable: true,
				autoplay: 2000,
				loop: true,
				autoplayDisableOnInteraction : false
			});
		}
	});
	//个人信息
	$ajax.ajaxPost(null, '004000002', {}, function(data) {
		if(data.success) {
			allowShare = data.data.allow_share;
			memberId = data.data.member_id;
			$('#user-info').html(doT.template(self_tpl.userInfoTpl)(data.data));
			developAgentLink = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + api_path_config.appid + '&redirect_uri=https%3A%2F%2F' + api_path_config.wxdomain + '%2Fwechat_web%2Fwechat%2FwxAutho.do%3Fredirect_url%3Dhttps%253A%252F%252F' + api_path_config.wxdomain + '%252Fhtml%252Fdele-register.html%26up_id%3D' + data.data.member_id + '&response_type=code&scope=snsapi_userinfo';
			$('#developAgentOnline').attr('value',developAgentLink);
			getUpInfo();
			wxShare.init({
				debug: false,
				target: wxShare,
				ready: function (wxShare) {
				    wx.hideMenuItems({
				       menuList: [
				            // "menuItem:share:qq",
				            // "menuItem:share:QZone",
				            "menuItem:share:facebook",
				            "menuItem:share:email",
				            // "menuItem:share:weiboApp",
				            "menuItem:copyUrl",
				            "menuItem:openWithQQBrowser",
				            "menuItem:openWithSafari"
				            ], // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
				        success:function(res){
				            // alert('hide menu success');
				        }
				    });
				    var wxCallbacks = {
				        cancel : function(resp) {},
				        success : function(resp) {}
				    };
				    var wxData = {
				        // "appId": wxShare.sign.appId,
				        "imgUrl" : 'https://img.hanshuweishang.com/img-hanshuweishang/ex/20170411221858178.jpg',
				        "link" : getShareLink(),
				        "desc" : "韩束微商",
				        "title" : "韩束微商"
				    };
				    wxShare.shareToFriend(wxData, wxCallbacks);
				    wxShare.shareToTimeline(wxData, wxCallbacks);
				    // wxShare.shareToWeibo(wxData, wxCallbacks);
				    // wxShare.shareToQQ(wxData, wxCallbacks);
				}
			});
			// $ajax.ajaxWxAutho('/wechat/getWxConfig.do', {url: location.href.split('#')[0]}, function(data){
			// 	// lib.WeixinApi.sign = data;
			// 	var data = data.data;
			// 	wx.config({
			// 		debug: true,
			// 		appId: data.appId,
			// 		timestamp: data.timestamp,
			// 		nonceStr: data.nonceStr,
			// 		signature: data.signature,
			// 		jsApiList:["checkJsApi","onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","hideMenuItems","showMenuItems","hideAllNonBaseMenuItem","showAllNonBaseMenuItem","translateVoice","startRecord","stopRecord","onRecordEnd","playVoice","pauseVoice","stopVoice","uploadVoice","downloadVoice","chooseImage","previewImage","uploadImage","downloadImage","getNetworkType","openLocation","getLocation","hideOptionMenu","showOptionMenu","closeWindow","scanQRCode","chooseWXPay","openProductSpecificView","addCard","chooseCard","openCard"]
			// 		// jsApiList:["onMenuShareAppMessage"]
			// 	});
			// 	wx.ready(function(){
			// 		wx.onMenuShareAppMessage({
			// 			title: '韩束微商', // 分享标题
			// 			desc: '韩束微商', // 分享描述
			// 			link: getShareLink(), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			// 			imgUrl: 'http://img.hanshuweishang.com/img-hanshuweishang/ex/20170411221858178.jpg', // 分享图标
			// 			type: '', // 分享类型,music、video或link，不填默认为link
			// 			dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			// 			success: function () { 
			// 				// 用户确认分享后执行的回调函数
			// 				// alert('confirm share...');
			// 			},
			// 			cancel: function () { 
			// 				// 用户取消分享后执行的回调函数
			// 				// alert('confirm cancel share...');
			// 			}
			// 		});
			// 	});
			// });
		}
	});
	function getShareLink() {
		var shareLink = null;
		shareLink = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + api_path_config.appid + '&redirect_uri=http%3A%2F%2F' + api_path_config.wxdomain+ '%2Fwechat_web%2Fwechat%2FwxAutho.do%3Fredirect_url%3Dhttp%253A%252F%252F' + api_path_config.wxdomain+ '%252Fhtml%252Fdele-register.html%26up_id%3Dnull&response_type=code&scope=snsapi_userinfo';
		if(allowShare){
			shareLink = developAgentLink;
		}
		// shareLink = 'http://wx.hanshuweishang.com/html/pwd-login.html'
		// alert('shareLink: ' + shareLink);
		return shareLink;
	}

	//上级
	function getUpInfo(){
		$ajax.ajaxPost(null, '003000023', {}, function(data) {
			if(data.success){
				$('#uplevel').html('上级: ' + data.data.real_name);
			}
		});
	}
	$('#authoFind').click(function(){
		$('.layer-mask').remove();
		$('body').append('<div id="layer-mask" class="layer-mask"></div>');
		$('.layer-mask').show();
		$('#seeresult').html('&nbsp;');
		$('#search-layer').show();
		var bodyRect = document.body.getBoundingClientRect();
		var E_float = document.getElementById('search-layer');
		var top = -bodyRect.top;
		var left = -bodyRect.left;
		var iW = window.innerWidth;
		var iH = window.innerHeight;
		var floatRect = E_float.getBoundingClientRect();
		var eW = floatRect.width;
		var eH = floatRect.height;

		// E_float.style.top = (top + (iH - eH) / 2) + 'px';
		// E_float.style.left = (left + (iW - eW) / 2) + 'px';
		E_float.style.top = (0 + (iH - eH) / 2) + 'px';
		E_float.style.left = (0 + (iW - eW) / 2) + 'px';
	});
	$('#search-now').click(function() {
		if($('#keyword').val() === ''){
			$('#seeresult').html('<i style="color:red;">请输入手机号</i>');
			return;
		}
		if(!(/^1[34578]\d{9}$/.test($('#keyword').val()))){ 
			$('#seeresult').html('<i style="color:red;">请输入正确的手机号</i>');
			return; 
		} 
		$ajax.ajaxPost(null, '003000011', {key_word:$('#keyword').val()}, function(data) {
			if(data.success){
				if(data.data){
					$('#seeresult').html(doT.template(self_tpl.findResultTpl)(data.data));
				} else {
					$('#seeresult').html('无相关记录');
				}
			} else {
				if(data.code === '30011') {
					$('#seeresult').html('<i style="color:red;">' + data.msg + '</i>');
				}
			}
		});
		// $('.layer-mask').hide();
		// $('#search-layer').hide();
	});
	var clipboard = new Clipboard('.btnCopy');

	$('#develop-agent').click(function(){
		if(allowShare) {
			$('.layer-mask').remove();
			$('body').append('<div id="layer-mask" class="layer-mask"></div>');
			$('.layer-mask').show();
			$('#develop-layer').show();
			var bodyRect = document.body.getBoundingClientRect();
			var E_float = document.getElementById('develop-layer');
			var top = -bodyRect.top;
			var left = -bodyRect.left;
			var iW = window.innerWidth;
			var iH = window.innerHeight;
			var floatRect = E_float.getBoundingClientRect();
			var eW = floatRect.width;
			var eH = floatRect.height;

			// E_float.style.top = (top + (iH - eH) / 2) + 'px';
			// E_float.style.left = (left + (iW - eW) / 2) + 'px';
			E_float.style.top = (0 + (iH - eH) / 2) + 'px';
			E_float.style.left = (0 + (iW - eW) / 2) + 'px';
		} else {
			layer.open('您不可以分享');
		}
	});
	$('body').delegate('.search-layer-close', 'touchend', function() {
		$('.layer-mask').hide();
		$('#search-layer').hide();
	});
	$('body').delegate('.search-layer-close', 'click', function() {
		$('.layer-mask').hide();
		$('#search-layer').hide();
	});

	$('body').delegate('.develop-layer-close', 'touchend', function() {
		$('.layer-mask').hide();
		$('#develop-layer').hide();
	});
	$('body').delegate('.develop-layer-close', 'click', function() {
		$('.layer-mask').hide();
		$('#develop-layer').hide();
	});

	//待我处理 待我发货 取消中订单统计
	$ajax.ajaxPost(null, '006000013', {}, function(data) {
		if(data.success && data.data){
			if((data.data.not_audited_count+'').length == 1) {
				$('#wait-process').html('<i>' + data.data.not_audited_count + '</i>')
			} else {
				$('#wait-process').html('<i class="num' + (data.data.not_audited_count+'').length + '">' + data.data.not_audited_count + '</i>')
			}
			if((data.data.not_ship_count+'').length == 1) {
				$('#wait-send').html('<i>' + data.data.not_ship_count + '</i>')
			} else {
				$('#wait-send').html('<i class="num' + (data.data.not_ship_count+'').length + '">' + data.data.not_ship_count + '</i>')
			}
			if((data.data.cancel_order_count+'').length == 1) {
				$('#canceling-order').html('<i>' + data.data.cancel_order_count + '</i>')
			} else {
				$('#canceling-order').html('<i class="num' + (data.data.cancel_order_count+'').length + '">' + data.data.cancel_order_count + '</i>')
			}
			//$('#wait-process').html('<i>' + data.data.not_audited_count + '</i>')
			//$('#wait-send').html('<i>' + data.data.not_ship_count + '</i>')
			//$('#canceling-order').html('<i>' + data.data.cancel_order_count + '</i>')
		}
	});
	//贷款审核统计
	$ajax.ajaxPost(null, '001000012', {}, function(data) {
		if(data.success && data.data){
			if((data.data+'').length == 1) {
				$('#payment-audit').html('<i>' + data.data + '</i>');
			} else {
				$('#payment-audit').html('<i class="num' + (data.data+'').length + '">' + data.data + '</i>')
			}
		}
	});
	//团队管理统计
	$ajax.ajaxPost(null, '003000015', {}, function(data) {
		if(data.success && data.data){
			if((data.data.application+'').length == 1) {
				$('#join-audit').html(data.data.application > 0 ? '<i>' + data.data.application + '</i>' : '');
			} else {
				$('#join-audit').html(data.data.application > 0 ? '<i class="num' + (data.data.application+'').length + '">' + data.data.application + '</i>' : '');
			}
			if((data.data.updateGrade+'').length == 1) {
				$('#upgrade-audit').html(data.data.updateGrade > 0 ? '<i>' + data.data.updateGrade + '</i>' : '');
			} else {
				$('#upgrade-audit').html(data.data.updateGrade > 0 ? '<i class="num' + (data.data.updateGrade+'').length + '">' + data.data.updateGrade + '</i>' : '');
			}
			//$('#join-audit').html(data.data.application > 0 ? '<i>' + data.data.application + '</i>' : '');
			//$('#upgrade-audit').html(data.data.updateGrade > 0 ? '<i>' + data.data.updateGrade + '</i>' : '');
		}
	});

	(function isIOS() {
		var u = navigator.userAgent;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		if(isIOS){
			$('#develop-layer .tool').hide();
		}
	})();
});
