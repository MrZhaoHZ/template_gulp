var $ajax = require('./ajax.js');

function weixinShareTimeline(data,callbacks){
	callbacks = callbacks||{};
	wx.onMenuShareTimeline({
		title:data.title,
		link:data.link,
		imgUrl:data.imgUrl,
		trigger:function(res){
			callbacks.trigger&&callbacks.trigger(res)
		},
		success:function(res){callbacks.success&&callbacks.success(res)},
		cancel:function(res){callbacks.cancel&&callbacks.cancel(res)},
		fail:function(res){callbacks.fail&&callbacks.fail(res)}
	})
}
function weixinSendAppMessage(data,callbacks){
	// alert('in weixinSendAppMessage...');
	callbacks=callbacks||{};
	wx.onMenuShareAppMessage({
		title:data.title,
		desc:data.desc,
		link:data.link,
		imgUrl:data.imgUrl,
		trigger:function(res){
			// alert('trigger in...')
			callbacks.trigger&&callbacks.trigger(res)
		},
		success:function(res){
			// alert('success in....');
			// alert(res);
			callbacks.success&&callbacks.success(res);
		},
		cancel:function(res){callbacks.cancel&&callbacks.cancel(res)},
		fail:function(res){callbacks.fail&&callbacks.fail(res)}
	})
}

function weixinShareQQ(data,callbacks){
	callbacks=callbacks||{};
	wx.onMenuShareQQ({
		title:data.title,
		desc:data.desc,
		link:data.link,
		imgUrl:data.imgUrl,
		trigger:function(res){
			callbacks.trigger&&callbacks.trigger(res)
		},
		success:function(res){
			callbacks.success&&callbacks.success(res)
		},
		cancel:function(res){
			callbacks.cancel&&callbacks.cancel(res)
		},
		fail:function(res){
			callbacks.fail&&callbacks.fail(res)
		}
	})
}
function weixinShareWeibo(data,callbacks){
	callbacks=callbacks||{};
	wx.onMenuShareWeibo({
		title:data.title,
		desc:data.desc,
		link:data.link,
		imgUrl:data.imgUrl,
		trigger:function(res){
			callbacks.trigger&&callbacks.trigger(res)
		},
		success:function(res){
			callbacks.success&&callbacks.success(res)
		},
		cancel:function(res){
			callbacks.cancel&&callbacks.cancel(res)
		},
		fail:function(res){
			callbacks.fail&&callbacks.fail(res)
		}
	})
}

function weixinShareQZone(data,callbacks){
	callbacks=callbacks||{};
	wx.onMenuShareWeibo({
		title:data.title,
		desc:data.desc,
		link:data.link,
		imgUrl:data.imgUrl,
		trigger:function(res){
			callbacks.trigger&&callbacks.trigger(res)
		},
		success:function(res){
			callbacks.success&&callbacks.success(res)
		},
		cancel:function(res){
			callbacks.cancel&&callbacks.cancel(res)
		},
		fail:function(res){
			callbacks.fail&&callbacks.fail(res)
		}
	})
}

function init(opts){
	if(!wx)throw"请先加载https://res.wx.qq.com/open/js/jweixin-1.0.0.js";
	var signUrl = opts.url;
	$ajax.ajaxWxAutho('/wechat/getWxConfig.do', {url: location.href}, function(data){
		// lib.WeixinApi.sign = data;
		var data = data.data;
		wx.config({
			debug: opts.debug || !1,
			appId: data.appId,
			timestamp: data.timestamp,
			nonceStr: data.nonceStr,
			signature: data.signature,
			jsApiList:["checkJsApi","onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","hideMenuItems","showMenuItems","hideAllNonBaseMenuItem","showAllNonBaseMenuItem","translateVoice","startRecord","stopRecord","onRecordEnd","playVoice","pauseVoice","stopVoice","uploadVoice","downloadVoice","chooseImage","previewImage","uploadImage","downloadImage","getNetworkType","openLocation","getLocation","hideOptionMenu","showOptionMenu","closeWindow","scanQRCode","chooseWXPay","openProductSpecificView","addCard","chooseCard","openCard"]
		});
		wx.ready(function(){
			opts.ready&&opts.ready.call(null, opts.target)
		});
	});
}

var wxShare = {
	version: "1.0.0",
	init: init,
	shareToTimeline: weixinShareTimeline,
	shareToWeibo: weixinShareWeibo,
	shareToFriend: weixinSendAppMessage,
	shareToQQ: weixinShareQQ,
	shareToQZone: weixinShareQZone
}

exports.wxShare = wxShare;