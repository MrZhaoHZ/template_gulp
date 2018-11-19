var remSetting = require('../../common/rem.js').remSetting;
var $ajax = require('../../common/ajax.js');
var httpURL = require('../../common/http-url.js');
var returnPage = require('../../common/return-page.js');
 remSetting();
$(function() {
	var from = httpURL.getQueryString('from');
	if(from == "upGrading"){
		returnPage.returnPageWithUrl("../center-upgrading.html?from=login");
		$(".right, .box").attr('href','javascript:void(0);');
	}else{
		returnPage.returnPageWithUrl("../center.html?from=login");
	};
    
     /*
	  * 
	  *
     */
    
    $ajax.ajaxPost(null, "001000004", {},
    	function(data){
    		if (data.code == "10000") {
    			var dataInput = data.data;
    			$(".top_pic .money").text( '￥' + dataInput.avaliable_amount_str);
    			$(".content .right").text( '￥' + dataInput.received_amount_str);
    			var arr = $(".detail .up");
    			$(arr[0]).text(dataInput.payed_order_num);
    			$(arr[1]).text(dataInput.canceled_order_num);
    			$(arr[2]).text(dataInput.topup_num);
    			$(arr[3]).text(dataInput.audited_order_num);
    			$(arr[4]).text(dataInput.canceled_order_num);
    			$(arr[5]).text(dataInput.deduct_money_num);

    		};
    });
});
