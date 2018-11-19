var self_tpl = require('../module/tpl/dele-register-tpl.js');
var remSetting = require('../common/rem.js').remSetting;
var $ajax = require('../common/ajax.js');
 remSetting();
var returnPage = require('../common/return-page.js');
$(function() {
	returnPage.closeWindow();
   var open_id = $.fn.cookie('openid');
   getData();
   
    function getData(){
    	// 获取数据
		$ajax.ajaxPost(null, "003000001", {open_id: open_id}, 
		function(data){
			if (data.success) {
				//$.fn.cookie('openid',null); // 删除openid
				//var item = data.data;
				$('.process-step').html(doT.template(self_tpl.orderProcessTpl)(data.data));
				// if (item[0].create_date) {
				// 	$(".cd-timeline-block").eq(0).css("display", "block");
				// 	$("#head_state").text(item[0].audit_status_name);
				// 	$("#time0").text(item[0].create_date || "");
				// };
				// if (item[1].create_date) {
				// 	$(".cd-timeline-block").eq(1).css("display", "block");
				// 	$("#superior").text(item[1].name + "(" + item[1].agent_grade_name + ")");
				// 	$("#superior_state").text(item[1].audit_status_name);
				// 	$("#time1").text(item[1].create_date || "");
				// };
				// if (item[2].create_date) {
				// 	$(".cd-timeline-block").eq(2).css("display", "block");
				// 	$("#time2").text(item[2].create_date || "");
				// };
				$(".cd-timeline-block:last").css("color", "#75ce66");
		$(".cd-picture:last").css("background-color", "#75ce66");
			};
		});
    };
});
