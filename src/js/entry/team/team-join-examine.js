var $ajax = require('../../common/ajax.js');
var remSetting = require('../../common/rem.js').remSetting;
var layer = require('../../common/layer.js');
var httpURL = require('../../common/http-url.js');
var api_path_config = require('../../../../tmp_path_config.js');
var returnPage = require('../../common/return-page.js');
 remSetting();
//var layer = require('../../common/layer.js');
$(function() {
	var dictionary = [ "", "审核中", "已拒绝", "审核成功","已拒绝", "原上级审核通过", "原上级审核拒绝", "已取消", "待上级审核", "待平台审核"];
     var id = httpURL.getQueryString('id');
     var audit_status = httpURL.getQueryString('audit_status');
    returnPage.returnPageWithUrl("team-join.html?audit_status=" + audit_status);

    $('#search-btn').click(function() {
        // activeLayerIndex = layer.open({
        //     title: [
        //         '搜索',
        //         'background-color: #F2F2F2;'
        //     ],
        //     content: '<p>订单类型：<select name="" id="" style="border-radius:5px;width:100px;+"><option value="">请选择</option></select></p><p>开始时间：<input type="text" id="date-select" /></p><p>微信号：youdream</p><p>手机号码：18668069999</p>',
        //     btn: '立即查找',
        //     success: function(elem) {
        //         $('.layui-m-layerchild').append('<div class="layer-close">X</div>');
        //         $('.layui-m-layercont').css({ 'padding': '20px 30px' });
        //         $('.layui-m-layerbtn span').css({ 'color': '#fff' });
        //         $('.layui-m-layerchild h3').css({ 'height': '40px', 'line-height': '40px', 'margin': '0' });
        //         $('.layui-m-layercont p').css({ 'text-align': 'left' });
        //         $('#date-select').val('').scroller('destroy').scroller($.extend(opt['date'], {
        //             theme: 'android-ics light',
        //             mode: 'scroller',
        //             display: 'modal',
        //             lang: 'zh'
        //         }));
        //     },
        //     yes: function() {
        //         // alert('ok')
        //     }
        // });
        $('.layer-mask').remove();
        $('body').append('<div id="layer-mask" class="layer-mask"></div>');
        $('.layer-mask').show();
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

        E_float.style.top = (0 + (iH - eH) / 2) + 'px';
        E_float.style.left = (0 + (iW - eW) / 2) + 'px';
    });
    $('body').delegate('.search-layer-close', require('../../common/event.js').getEventType(), function(e) {
    	e.preventDefault();
        $('.layer-mask').hide();
        $('#search-layer').hide();
    });

    function GetQueryString(name){
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if(r!=null)return  unescape(r[2]); return null;
    };
    var id = GetQueryString("id");
    getDate();
    function getDate(){
        $ajax.ajaxPost(null, "003000009", {'application_no': id}, 
            function(data){
                if (data.code == "10000") {
                    var item = data.data;
                    if (item.audit_status == 8) {
                        $(".next-div").css("display", "block");
                    };
                   $("#status").text(dictionary[item.audit_status]);
                   $("#time").text(item.create_time);
                   if (item.remark) {
                        $(".reason").css("display", "block");
                        $("#refuse").text(item.remark);
                   };
                   $("#money").text(item.payment_amount);
                   if (item.payment_voucher) {
                        $(".money_info").eq(0).css("display", "block");
                        $("#money_pic").attr( "src", "" + api_path_config.upload_path_h5 + item.payment_voucher);
                   };
                   if (item.picture_front) {
                        //$(".money_info").eq(1).css("display", "block");
                        $("#id").text(item.authon_personal_id);
                        $("#id_pic").attr( "src", "" + api_path_config.upload_path_h5 + item.picture_front);
                   };
                   $("#name").text(item.real_name);
                   $("#for_level").text(item.grade_name);
                   $("#weChat").text(item.wechat_id);
                   $("#phone").text(item.mobile);
                   $("#address").text(item.address);
                }
        });
        // $.post('/getMyTeamMyTeamJoinExamine.do', {   }, 
        //     function(data){
        //        var item = data.data[0];
        //        $("#status").text(item.status);
        //        $("#time").text(item.time);
        //        $("#refuse").text(item.refuse);
        //        $("#name").text(item.name);
        //        $("#for_level").text(item.for_level);
        //        $("#weChat").text(item.weChat);
        //        $("#phone").text(item.phone);
        //        $("#address").text(item.address);
        //        $("#money").text(item.money);
        //        $("#money_pic").attr( "src", item.money_pic);
        //        $("#id").text(item.id);
        //        $("#id_pic").attr( "src", item.user_id_pic);
        // });
    };
    $(".click_img").on("click", function(){

        var src = $(this).attr("src");
        $(".click_img_box").css("display", "block");
        $(".click_img_box img").attr("src", src);

    });
    $(".click_img_box").on("click", function(){
        $(".click_img_box").css("display", "none");
    });
    var pram = {
        application_no: id,
        audit_status: "",
        remark: ""
    };
//  $("#search-now").on("click", function(){
//      var length = $("#text").val().length;
//      if (length) {
//          $('.layer-mask').hide();
//          $('#search-layer').hide();
//          pram.remark = $("#text").val();
//          pram.audit_status = "2";
//          $ajax.ajaxPost(null, "003000008", pram, 
//              function(data){
//                  if (data.success) {
//                      window.location.href = "team-join.html?audit_status=2";
//                  };
//          });
//      }else{
//          layer.open("请输入拒绝原因！");
//      };
//  });
    
   $('#search-now').click(function(e) {
		require('../../common/btn-trigger.js').btnCtrl(e, function(target){
			var length = $("#text").val().length;
	        if (length) {
	            $('.layer-mask').hide();
	            $('#search-layer').hide();
	            pram.remark = $("#text").val();
	            pram.audit_status = "2";
	            $ajax.ajaxPost(null, "003000008", pram, 
	                function(data){
	                    if (data.success) {
	                    	layer.open("提交成功！");
							setTimeout(function () {
	                        	window.location.href = "team-join.html?audit_status=2";
						    }, 1000);

	                    }else{
							if(data.msg){
								layer.openLongTime(data.msg.substring(0,60));
							}else{
								layer.openLongTime(data.substring(0,60));
							};
						};
	            });
	        }else{
	            layer.open("请输入拒绝原因！");
	        };
		});
	});

//  $("#pass").on("click", function(){
//      pram.remark = $("#text").val();
//      pram.audit_status = "1";
//       $ajax.ajaxPost(null, "003000008", {application_no: id,audit_status:"1"}, 
//          function(data){
//              if (data.success) {
//                  window.location.href = "team-join.html?audit_status=1";
//              };
//      });
//  });
    
    $('#pass').click(function(e) {
		require('../../common/btn-trigger.js').btnCtrl(e, function(target){
			pram.remark = $("#text").val();
	        pram.audit_status = "1";
	         $ajax.ajaxPost(null, "003000008", {application_no: id,audit_status:"1"}, 
	            function(data){
	                if (data.success) {
	                	layer.open("提交成功！");
						setTimeout(function () {
	                    window.location.href = "team-join.html?audit_status=1";
					    }, 1000);

	                }else{
	                	if(data.code == "30075"){
	                		layer.openLongTime(data.msg);
	                	}else{
	                		if(data.msg){
								layer.openLongTime(data.msg.substring(0,60));
							}else{
								layer.openLongTime(data.substring(0,60));
							};
	                	}
	                	
	                }
	        });
		});
	});
});

