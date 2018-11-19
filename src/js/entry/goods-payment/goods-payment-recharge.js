var remSetting = require('../../common/rem.js').remSetting;
var $ajax = require('../../common/ajax.js');
var httpURL = require('../../common/http-url.js');
var layer = require('../../common/layer.js');
var returnPage = require('../../common/return-page.js');
remSetting();
$(function() {
    returnPage.returnPageWithUrl("../center.html?from=login");
     /*
	  * 
	  *
     */
     //var member_id = httpURL.getQueryString("member_id").toString();
     $ajax.ajaxPost(null, "001000004", {}, 
    	function(data){
    		if (data.code == "10000") {
    			$(".current_payment span").eq(1).text('￥' + data.data.avaliable_amount_str);
    		};
    });
     // 调整金额校验
    // $("#monery").keyup(function(){
    //     var value = $("#monery").val();
    //     var re = /^\d+(\.(\d{1,2})?)?$/;
    //     if(!re.test(value)){
    //         $("#monery").val("");
    //     };
    //     var max = parseFloat($("#adjustCurrentBalance").text());
    //     current = parseFloat(value);
    //     var status = $("#status").val();
    //     if(current >= max && status == 1){
    //         $("#monery").val("");
    //     };
    // });
     var pram = {
     	amount: ""
     }
//   $(".next").on("click", function(){
//   	pram.amount = $("#monery").val();
//      var re = /^\d+(\.(\d{1,2})?)?$/;
//      if(!re.test(pram.amount || parseFloat(pram.amount)<= 0)){
//          layer.open("请输入大于0的数字！");
//          return;
//      };
//   	if (pram.amount) {
//   		$ajax.ajaxPost(null, "001000007", pram, 
//		    	function(data){
//		    		if (data.code == "10000") {
//                      layer.open("提交成功！");
//		    			window.location.href = "../center.html";
//		    		};
//		    });
//   	} else{
//   		layer.open("请输入您要充值的货款金额");
//   	}
//   });
     $('.next').click(function(e) {
		require('../../common/btn-trigger.js').btnCtrl(e, function(target){
			pram.amount = $("#monery").val();
	        var re = /^\d+(\.(\d{1,2})?)?$/;
            console.log(!re.test(pram.amount || parseFloat(pram.amount)<= 0));
            console.log(re.test(pram.amount || parseFloat(pram.amount)<= 0));
	        if(!re.test(pram.amount || parseFloat(pram.amount)<= 0)){
	            layer.open("请输入大于0的数字！");
	            return;
	        };
	     	if (pram.amount) {
	     		$ajax.ajaxPost(null, "001000007", pram, 
			    	function(data){
			    		if (data.code == "10000") {
	                        layer.open("提交成功！");
	                        setTimeout(function () {
			    				window.location.href = "goods-payment-my.html";
						    }, 1000);
			    		}else{
							if(data.msg){// 30075 防重复提交
								layer.open(data.msg.substring(0,40));
							}else{
								layer.open(data.substring(0,40));
							};
						};
			    });
	     	} else{
	     		layer.open("请输入您要充值的货款金额");
	     	}
		});
	});
     $("#home-btn").on("click", function(){
        window.location.href = "../center.html?from=login";
    });
});
