var api_path_config = require('../../../../tmp_path_config.js');
var returnPage = require('../../common/return-page.js');
$(function() {
	require('../../common/rem.js').remSetting();
	var self_tpl = require('../../module/tpl/order-detail-tpl.js');
    var $ajax = require('../../common/ajax.js');
    var httpURL = require('../../common/http-url.js');
    var orderId = httpURL.getQueryString('orderId');
    var orderType = httpURL.getQueryString('orderType');
    var order_status = httpURL.getQueryString('order_status');
    var audit_status = httpURL.getQueryString('audit_status');
    var member_id = httpURL.getQueryString('member_id');
    
    var isSendPage = httpURL.getQueryString('isSend');
    var from = httpURL.getQueryString('from');
    if(from == "upGrading"){// 升级中
    	returnPage.returnPageWithUrl("my-order-upgrading.html?from=login&order_type=" + orderType + "&order_status=" + audit_status );
    	$(".center-home").attr('href','../center-upgrading.html?from=login');
    }else{
    	returnPage.returnPageWithUrl("my-order.html?from=login&order_type=" + orderType + "&order_status=" + audit_status );
    }
    //个人信息
    // $ajax.ajaxPost(null, '004000002', {}, function(data) {
    //     if(data.success){
    //         $('#address-container').html(doT.template(self_tpl.addrTpl)(data.data));
    //     }
    // });
    $ajax.post(null,'006000008', {order_id: orderId,order_type:orderType,order_status:order_status,member_id:member_id}, function(data) {
        if(data.success){
        	data.data.orderDetail.orderType = orderType;
            data.data.isSendPage = isSendPage;
            $('#address-container').html(doT.template(self_tpl.addrTpl)(data.data.orderDetail));
        	$('#order-goods').before(doT.template(self_tpl.orderCancelExpressTpl)(data.data));
            data.data.orderDetail.upload_path = api_path_config.upload_path;
            $('#order-goods').html(doT.template(self_tpl.orderGoodsTpl)(data.data.orderDetail));
        	$('#order-goods').after(doT.template(self_tpl.submitPersonTpl)(data.data.orderDetail));
        	$('#process-step').html(doT.template(self_tpl.orderProcessTpl)(data.data.orderAudits));
        	$('#order-process').after(doT.template(self_tpl.orderOtherTpl)(data.data.orderDetail));
        }
    });

    $('body').on(require('../../common/event.js').getEventType(),'#send-goods-btn',function(e){
        require('../../common/btn-trigger.js').btnCtrl(e, function(){
            $ajax.post(null,'006000011', {order_id: orderId,order_type:orderType,express_no:$('#express_no').val(),express_code:$('#expressSelect option:selected').val(),express:$('#expressSelect option:selected').text()}, function(data) {
                if(data.success){
                    location.href = 'my-order.html?from=login&order_type=' + orderType + '&order_status=00';
                }
            });
        });
    });
});

