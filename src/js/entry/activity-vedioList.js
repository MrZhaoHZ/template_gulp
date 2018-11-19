// require('../common/localStorage.js').setItem('login_redirect',location.href);
var $ajax = require('../common/ajax.js');
var self_tpl = require('../module/tpl/activity-vedio-tpl.js');
var api_path_config = require('../../../tmp_path_config.js');
var wxModule = require('../common/wx.js');
var wxShare = require('../common/wx-share.js').wxShare;
var layer = require('../common/layer.js');
var httpURL = require('../common/http-url.js');
var returnPage = require('../common/return-page.js');
if(!httpURL.getQueryString('from')){
	require('../common/localStorage.js').setItem('login_redirect',location.href+'?from=login');
}
$(function(){
	require('../common/rem.js').remSetting();
    // require('../common/agent-status.js').redirectByStatus();
    getDate();
    var openId = $.fn.cookie('openid');
    function randomString(len) {
        　　len = len || 32;
        　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        　　var maxPos = $chars.length;
        　　var pwd = '';
        　　for (i = 0; i < len; i++) {
        　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        　　}
        　　return pwd;
        }
    if(!openId){
        var _openid = randomString();
        $.fn.cookie('openid', _openid);
        openId = _openid;
    }
    function getDate(){
        $ajax.ajaxPostWXDL("/gate.do","007000015",{}, function(data) {
            var data1 = data;
            if(data1.success){
                var _data = data1.data;
                var itemBox = '';
                for(var i =0;i<_data.length;i++){
                    var str =   '<div class="vedioBox" dataId="'+_data[i].id+'">'
                            +       '<div class="vidBox">'
                            +           '<img src="https://imgtest-yyzws1.oss-cn-hangzhou.aliyuncs.com/sp/id_'+ _data[i].id +'.png" _idNum="'+ _data[i].id +'" id="imgFun'+ _data[i].id + '" class="imgHeader">'
                            +            '<video id="vedio'+ _data[i].id +'" onended="myFunction(this.attid)" attid="'+ _data[i].id +'" controls="controls" poster="https://imgtest-yyzws1.oss-cn-hangzhou.aliyuncs.com/sp/id_'+ _data[i].id +'.png">'
                            +               '<source id="v'+ _data[i].id +'" src="">'
                            +           '</video>'
                            +       '</div>'
                            +       '<div class="dianzan">'
                            +            '<span class="num">'+ _data[i].id +'</span>'
                            +            '<span class="hao">号</span>'
                            +            '<span class="shu"></span>'
                            +            '<div class="clickBtn">'
                            +                '<img class="hertNmu" src="../images/hert.png" alt="" />'
                            +                '<span class="hert">'+ _data[i].like_count +'</span>'
                            +            '</div>'
                            +        '</div>'
                            +    '</div>'

                    itemBox += str;
                }
                $('#content').html(itemBox);
            }
        });
    }
    $('body').on("click",".imgHeader",function(){
        var _this = $(this);
        var _id = 'vedio' + $(this).attr("_idNum");
        var _vid = 'v'+ $(this).attr("_idNum");
        var _idmp4 = 'id_'+ $(this).attr("_idNum");
        var _src = 'https://imgtest-yyzws1.oss-cn-hangzhou.aliyuncs.com/sp/'+ _idmp4 +'.mp4';
        var oVideo = document.getElementById(_id);  
        var _v = document.getElementById(_vid)
        $(this).siblings("video").show();
        var _idvv = '#'+_vid;
        $(this).siblings("video").find(_idvv).attr("src",_src);
        oVideo.load();
        oVideo.play();
        _this.hide();
    })
    function myFunction(_id){
        var _attids = '#imgFun'+_id;
        $(_attids).show();
    }
	// $("body").on("click",'.hertNmu',function () {
    //     var _this = $(this);
    //     var _val = _this.siblings(".hert").text(),
    //         // _openid = $.cookie('openid') || "",
    //         // _openid = 'ggdcdjdssdjjoohddcccsss',
    //         _id = _this.parents(".vedioBox").attr("dataId"),
    //         _param = {
    //             open_id:openId,
    //             video_id:_id
    //         };
    //         console.log(_val)
    //         // $ajax.ajaxPost('/wechat-web/like/update.do', {}, function(data) {
    //             $ajax.ajaxPostWXDL("/gate.do","007000016", _param, function(data) {
    //             var data1 = data;
    //             if(data1.success){
    //                 var valNew = _val -0 + 1 + '';
    //                 _this.siblings().text(valNew);
    //                 layer.open('点赞'+data1.msg)
    //             }else{
    //                 layer.open(data1.msg)
    //             }
    //         });
    // })

    function onBridgeReady() {
        WeixinJSBridge.call('hideOptionMenu');
    }

    if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
    } else {
        onBridgeReady();
    }

	
	(function isIOS() {
		var u = navigator.userAgent;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		if(isIOS){
			$('#develop-layer .tool').hide();
		}
	})();

	// $('body').delegate('.golink','click',function(){
	// 	alert('ok')
	// 	location.href = $(this).attr('data-href');
	// });
});
