var wxModule = require('../common/wx.js');
var $ajax = require('../common/ajax.js');
var cookie = require('../common/cookie.js');
var self_tpl = require('../module/tpl/account-setting-tpl.js');
$(function(){
	require('../common/rem.js').remSetting();
	//本人信息
	$ajax.post(null,'004000002',{},function(data){
		if(data.success) {
			$('#myInfo').html(doT.template(self_tpl.mainTpl)(data.data.memberDTO));
			getUpInfo();
			ifSetGesture();
			if(!wxModule.isWX()) {
				$('#logout').show();
				$('#gesture-setting').hide();
				$('#myInfo').on('click','#logout',function(){
					logout();
				});
			}
		}
	});
	function logout(){
		$ajax.ajaxPost('/logout.do','',{},function(data){
			if(data.success) {
				cookie.removeCookie();
				location.href = 'pwd-login.html';
			}
		});
	}
	var upLevelInfo;
	var activeLayerIndex = null;
	//上级
	function getUpInfo(){
		$ajax.ajaxPost(null, '003000023', {}, function(data) {
			if(data.success){
				upLevelInfo = data.data;
				
				if(data.data.grade_name != "公司"){
					$('#my-up').html(data.data.real_name + ' >');
					$('#myInfo').on('click','#my-up',function(){
						// activeLayerIndex = layer.open({
						// 	title: [
						// 		'我的上级',
						// 		'background-color: #F2F2F2;'
						// 	]
						// 	// ,content: '<p>姓名：吕小小小</p><p>等级：合伙人</p><p>微信号：youdream</p><p>手机号码：<span id="up-phone">18668069999</span></p>'
						// 	,content: doT.template(self_tpl.myUpTpl)(upLevelInfo)
						// 	,btn: '电话呼叫'
						// 	,success: function(elem){
						// 		$('.layui-m-layerchild').append('<div class="layer-close">X</div>');
						// 		$('.layui-m-layercont').css({'padding':'20px 30px'});
						// 		$('.layui-m-layerbtn span').css({'color':'#fff'});
						// 		$('.layui-m-layerchild h3').css({'height':'40px','line-height':'40px'});
						// 	},yes:function(){
						// 		window.location.href = "tel:" + $('#up-phone').html();
						// 	}
						// });
						$('#myup-layer').html(doT.template(self_tpl.myUpTpl)(upLevelInfo));
						$('.layer-mask').remove();
						$('body').append('<div id="layer-mask" class="layer-mask"></div>');
						$('.layer-mask').show();
						// $('#seeresult').html('&nbsp;');
						$('#myup-layer').show();
						var bodyRect = document.body.getBoundingClientRect();
						var E_float = document.getElementById('myup-layer');
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
						// E_float.style.left = (0 + (iW - eW) / 2) + 'px';
						if(iW < 750) {
							E_float.style.left = (0 + (iW - eW) / 2) + 'px';
						}
					});
				} else {
					$('#my-up').html(data.data.real_name);
				}
			}
		});
	}
	
	$('body').delegate('.myup-layer-close', 'click', function() {
		$('.layer-mask').hide();
		$('#myup-layer').hide();
	});
	$('body').delegate('.myup-layer-close', 'touchend', function() {
		$('.layer-mask').hide();
		$('#myup-layer').hide();
	});

	$('body').delegate('#call-now', 'click', function() {
		window.location.href = "tel:" + $('#up-phone').html();
	});

	function ifSetGesture() {
		$ajax.post(null,'004000004',{open_id: $.fn.cookie('openid')},function(data){
			if(data.success) {
				if(data.data.have === 1) {
					$('#gesture-setting').html('修改 >');
					$('#gesture-setting').attr('href', 'reset-gesture-s1.html');
				}
			}
		});
	}
	
});
