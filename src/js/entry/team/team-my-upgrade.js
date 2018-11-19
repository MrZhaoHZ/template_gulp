var $ajax = require('../../common/ajax.js');
var remSetting = require('../../common/rem.js').remSetting;
var self_tpl = require('../../module/tpl/team-tpl.js');
var myLayer = require('../../common/layer.js');
var tmp_path_config = require('../../../../tmp_path_config.js');
remSetting();
$(function() {
	
	var pramTwo = {
		agent_grade: ""
	};
	 var auth_amount = "";
	 $(".container").css("display", "block");
	 $(".submit_success").css("display", "none");
	 $(".swiper-wrapper").on("click",".swiper-slide",function(){
		var index = $(this).index();
		pramTwo.agent_grade = $(this).attr("agent_grade");
		auth_amount = $(this).attr("auth_amount");
		$(".remark").html($(this).find(".hide_div").html());
		$(".swiper-wrapper .swiper-slide .border").css("display","none");
		$(".swiper-wrapper .swiper-slide").css("border","0.02rem solid #ccc");
		$(this).find(".border").css("display","inline-block");
		$(this).css("border","0.02rem solid #66c300");
		var height = window.screen.availHeight - $(".container").height() - $(".next-div").height();
		if(height< 0){
			$(".next-div").css("bottom", -$(".container").height() + window.screen.availHeight -$(".next-div").height() -30  + "px");
		}else {
			$(".next-div").css("bottom", "0px");
		};
	 })

	 // 判断升级进度
	$ajax.ajaxPost(null, "003000027", {},
			function(data){
				if (data.code == "30046" || data.code == "30044" || data.code == "30052") { // 不可升级提示
					myLayer.open(data.msg);
					return;
				};
				if (data.code == "30064") { // 展示进度
					window.location.href = "team-my-upgrade-success.html"
					return;
				};
				if (data.code == "30050" || data.code == "30045" || data.code == "30060") { // 可以升级 可能展示拒绝原因
					$(".choose").css("display", "block");
					$(".next-div").css("display", "block");
					
					if (data.msg != "可以发起升级申请") {
						$(".err-warning").css("display", "block");
						$("#reason").text("原因：" + data.msg);

					};
					getSwiperDate();
				}
	});
	var swiperData;
	var idFont= "";
	function getSwiperDate(){
		// $.post('/getMyTeamUpgrade1.do', {   }, 
		//     function(data){
		//         $("#swiper").html(doT.template(self_tpl.myTeamUpgrade1Tpl)(data.data));
		//         swiper.updateSlidesSize();
		//         swiperData = data.info;
		// });
		$ajax.ajaxPost(null, "003000022", {},
			function(data){
				if (data.code == "10000") {
					var swiper = new Swiper('.swiper-container', {
						nextButton: '.swiper-button-next',
						prevButton: '.swiper-button-prev',
						pagination: '.swiper-pagination',
						slidesPerView: 3,
						paginationClickable: true,
						spaceBetween: 30,
						freeMode: true
					});
					$(".swiper-wrapper").html(doT.template(self_tpl.myTeamUpgrade1Tpl)(data.data));
					idFont = data.data.member.picture_front || "";
					//swiper.updateSlidesSize();
					swiper.updateSlidesSize();
				};
				$(".next-div").css("bottom", "0px");
				if (data.code == "30044" || data.code == "30046" || data.code == "30047" ||data.code == "30048" || data.code == "30049" || data.code == "30050") {
					myLayer.open(data.msg);
				};
		});
	};
	var needId = 0;
	var needVoucher = 0;
	var agent_grade = "";
	$("#nextOne").click(function(){
		if (!pramTwo.agent_grade) {
			myLayer.open("请选择等级！");
			return;
		};
		if(pramTwo.agent_grade){
			window.location.href = "team-my-upgrade-basic.html?agent_grade=" + pramTwo.agent_grade + "&idFont=" + idFont;
		};
	});
});
