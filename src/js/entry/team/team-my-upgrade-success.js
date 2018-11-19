var $ajax = require('../../common/ajax.js');
var remSetting = require('../../common/rem.js').remSetting;
var self_tpl = require('../../module/tpl/team-tpl.js');
var returnPage = require('../../common/return-page.js');
remSetting();
$(function() {
    returnPage.closeWindow();
	//升级审核成功后，展示审核进度
 	function getDetailData(){
		$ajax.ajaxPost(null, "003000020", {}, 
		function(data){
			if (data.success) {
				$('.process-step').html(doT.template(self_tpl.orderProcessTpl)(data.data));
				$(".cd-timeline-block:last").css("color", "#75ce66");
				$(".cd-picture:last").css("background-color", "#75ce66");
			};
		});
	 };
	 getDetailData();
});
