var $ajax = require('../../common/ajax.js');
var httpURL = require('../../common/http-url.js');
var self_tpl = require('../../module/tpl/order-tpl.js');
var layer = require('../../common/layer.js');
var remSetting = require('../../common/rem.js').remSetting;
var api_path_config = require('../../../../tmp_path_config.js');
$(function() {
	remSetting();
	var goodsId = httpURL.getQueryString('id');
	var orderConfirmInfo = null;
	//个人信息
	$ajax.ajaxPost(null, '004000002', {}, function(data) {
		if(data.success){
			$('#address').html(doT.template(self_tpl.addrTpl)(data.data));
		}
	});
	//下单信息
	$ajax.ajaxPost(null, '006000006', {sku_id: goodsId}, function(data) {
		if(data.success){
			orderConfirmInfo = data.data;
			data.data.image_prefix = api_path_config.upload_path;
			$('body').append(doT.template(self_tpl.orderConfirmTpl)(data.data));
			if($('#avaliable_amount').html() === '0.00'){
				$('#submit-btn').addClass('gray');
			}
		}
	});
	$('body').on('touchend','#minus-btn',function(){
		if(parseInt($('#goodsNum').html()) < 2) {
			return;
		}
		$('#goodsNum').html((parseInt($('#goodsNum').html())-1));
		if(parseInt($('#goodsNum').html()) < 2) {
			$('#minus-btn').addClass('gray');
		}
		$('#totalValue').html((parseInt($('#goodsNum').html())*parseFloat($('#goods-price').html())).toFixed(2));
	});


	$('body').on('touchend','#add-btn',function(){
		$('#goodsNum').html((parseInt($('#goodsNum').html())+1));
		$('#minus-btn').removeClass('gray');
		$('#totalValue').html((parseInt($('#goodsNum').html())*parseFloat($('#goods-price').html())).toFixed(2));
	});

	$('body').on('touchend','#submit-btn',function(e){
		require('../../common/btn-trigger.js').btnCtrl(e, function(){
			var param = {
				sku_id: goodsId,
				sku_name: orderConfirmInfo.sku_name,
				sku_image_url: orderConfirmInfo.sku_image_url,
				sku_specs: orderConfirmInfo.sku_specs,
				avaliable_amount: orderConfirmInfo.avaliable_amount,
				wechat_price: orderConfirmInfo.wechat_price,
				counts: $('#goodsNum').html(),
				deliver_type: orderConfirmInfo.deliver_type+''
			}
			$ajax.ajaxGet(null, '006000007', param, function(data) {
				if(data.success){
					location.href = 'my-order.html?order_type=1&order_status=00';
				} else {
					if(data.code === '30058' ||data.code === '40009' || data.code === '40007' || data.code === '50003'|| data.code === '50002' || data.code === '40014'|| data.code === '40010'|| data.code === '30062'){
						layer.open(data.msg);
					}
				}
			});
		});
	});
});

