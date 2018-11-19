var self_tpl = require('../../module/tpl/team-tpl.js');
var $ajax = require('../../common/ajax.js');
var layer = require('../../common/layer.js');
var remSetting = require('../../common/rem.js').remSetting;
var httpURL = require('../../common/http-url.js');
var api_path_config = require('../../../../tmp_path_config.js');
var returnPage = require('../../common/return-page.js');
remSetting();
$(function() {
	var application_no = httpURL.getQueryString('id');
	var data_type = httpURL.getQueryString('data_type');
    returnPage.returnPageWithUrl("team-upgrade.html?audit_status=" + data_type);
	$('#nopass-btn').click(function() {
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

		E_float.style.top = (iH - eH) / 2 + 'px';
		E_float.style.left = (iW - eW) / 2 + 'px';
	});
	$('body').delegate('.search-layer-close', require('../../common/event.js').getEventType(), function(e) {
		e.preventDefault();
		$('.layer-mask').hide();
		$('#search-layer').hide();
	});

	// function GetQueryString(name){
	// 	 var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	// 	 var r = window.location.search.substr(1).match(reg);
	// 	 if(r!=null)return  unescape(r[2]); return null;
	// };
	// var id = GetQueryString("id");


	$(".click_img").on("click", function(){
		var src = $(this).attr("src");
		$(".click_img_box").css("display", "block");
		$(".click_img_box img").attr("src", src);

	});
	$(".click_img_box").on("click", function(){
		$(".click_img_box").css("display", "none");
	});

//	$("#search-now").on("click", function(){
//		var length = $("#text").val().length;
//		if (length == 0) {
//			layer.open("拒绝理由不能为空！");
//		}else{
//			$('.layer-mask').hide();
//			$('#search-layer').hide();
//			$ajax.ajaxPost(null, "003000003", {application_no: application_no,remark: $('#text').val(),audit_status: '2'}, function(data){
//				if(data.success){
//					location.href = 'team-upgrade.html?audit_status=2';
//				}
//			});
//		};
//	});
	$('#search-now').click(function(e) {
		require('../../common/btn-trigger.js').btnCtrl(e, function(target){
			var length = $("#text").val().length;
			if (length == 0) {
				layer.open("拒绝理由不能为空！");
			}else{
				$('.layer-mask').hide();
				$('#search-layer').hide();
				$ajax.ajaxPost(null, "003000003", {application_no: application_no,remark: $('#text').val(),audit_status: '2'}, function(data){
					if(data.success){
						layer.open("提交成功！");
						setTimeout(function () {
							location.href = 'team-upgrade.html?audit_status=2';
					    }, 1000);

					}else{
						if(data.msg){
							layer.open(data.msg.substring(0,40));
						}else{
							layer.open(data.substring(0,40));
						};
					}
				});
			};
		});
	});
//	$("#pass").on("click", function(){
//		 $ajax.ajaxPost(null, "003000003", {application_no: application_no, audit_status: '1'}, function(data){
//			if(data.success){
//				location.href = 'team-upgrade.html?audit_status=1';
//			}
//		});
//	});
	$('#pass').click(function(e) {
		require('../../common/btn-trigger.js').btnCtrl(e, function(target){
			$ajax.ajaxPost(null, "003000003", {application_no: application_no, audit_status: '1'}, function(data){
				if(data.success){
					layer.open("提交成功！");
					setTimeout(function () {
					location.href = 'team-upgrade.html?audit_status=1';
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
	getDate();
	function getDate(){
		$ajax.ajaxPost(null, "003000004", {application_no: application_no}, function(data){
			if(data.success){
				var memberInfo = data.data.member;
				var parentMemberInfo = data.data.parent_member;
				var newParentMemberInfo = data.data.new_parent_member;
				$("#status").text(memberInfo.audit_status_name);
				$("#time").text(memberInfo.create_time);
				if(memberInfo.audit_status == 6 || memberInfo.audit_status == 2) {
					$("#refuse").text( "拒绝原因：" + memberInfo.remark);
				}
				if (memberInfo.remark) {
					$(".reason").css("display", "block");
					$("#refuse").text("拒绝原因：" + memberInfo.remark);
				};
				//升级信息
				$("#up_name").text(memberInfo.real_name);
				$("#up_old_level").text(memberInfo.grade_name);
				$("#up_new_level").text(memberInfo.new_agent_grade_name);

				//原上级
				$("#old_name").text(parentMemberInfo.real_name);
				$("#old_old_level").text(parentMemberInfo.grade_name);
				$("#old_mobile").text(parentMemberInfo.mobile);

				//新上级
				$("#new_name").text(newParentMemberInfo.real_name);
				$("#new_old_level").text(newParentMemberInfo.grade_name);
				$("#new_mobile").text(newParentMemberInfo.mobile);

				// 截图展示
				$('#money').text('￥' + memberInfo.payment_amount);
				if (memberInfo.payment_voucher) {
					$(".money_info:first").css("display", "block");
					
					$("#money_pic").attr( "src",  "" + api_path_config.upload_path_h5 +  memberInfo.payment_voucher);
				};
				if (memberInfo.authon_personal_id) {
					$(".money_info:last").css("display", "block");
					$('#personId').text(memberInfo.authon_personal_id);
					$("#personId_pic").attr( "src",  "" + api_path_config.upload_path_h5 + memberInfo.picture_front)
				};
				if ( data_type == "0") {
					$(".next-div").css("display", "block")
				};
				//$("#heji").text(memberInfo.payment_amount);
			}
		});
	};
});

