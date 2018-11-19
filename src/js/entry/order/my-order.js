// require('../../common/login-status.js').isLogin(function(){require('../../common/rem.js').remSetting();});
// alert('ok')
require('../../common/rem.js').remSetting();
var returnPage = require('../../common/return-page.js');
// require('../../common/localStorage.js').setItem('login_redirect',location.href);
var httpURL = require('../../common/http-url.js');
if(!httpURL.getQueryString('from')){
	require('../../common/localStorage.js').setItem('login_redirect',location.href+'&from=login');
}
if(httpURL.getQueryString('from') != 'login') {
	require('../../common/agent-status.js').redirectByStatusIfUpGradingMyOrder();
}
var $ajax = require('../../common/ajax.js');
var self_tpl = require('../../module/tpl/order-tpl.js');

var api_path_config = require('../../../../tmp_path_config.js');
var order_status = httpURL.getQueryString('order_status');
if(!order_status) {
	order_status = '0';
}
var order_type = httpURL.getQueryString('order_type');
if(!order_type) {
	order_type = '2';
}
$('input[name="orderType"]').val(order_type);
if(order_type === '1') {
	document.title = '我的订单';
	$('.tab33').show();
}
if(order_type === '2') {
	document.title = '团队订单';
	$('.tab31,.tab34').show();
}
if(order_status == "0"){
	order_status = "00";
};
if(order_status) {
	$('#nav .tab'+ order_status).addClass('active');
}
var data,
	myScroll,
	//pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset,
	generatedCount = 0;

var filterCondition = {
	current_page: "1",
	page_size: "20",
	order_status: order_status,//订单状态 00-全部 30 -待审单 31-已审单 32-待发货 33-待收货 34 -已发货 35-取消中  36-已取消 37-已完成
	order_type: order_type,//订单类型 1 -我的订单 2-团队订单
	start_time: '',
	end_time: '',
	isAppend: true,
	member_name: '',//提单人
	deliver_type: ''//发货类型 1-上级发货2-总部发货
}

pullUpAction(filterCondition);
function pullUpAction(filterCondition) {
	$ajax.get(null, '006000009', filterCondition, function(data) {
		if(data.success) {
			if(data.data.orderList.length != 0) {
				if(data.data.orderList.length >= 5) {
					$('#pullUp').show();
				}
				$('#nomore-data').hide();
				data.data.order_type = order_type;
				data.data.upload_path = api_path_config.upload_path;
				data.data.audit_status = $("#nav .active").attr("data-tab");
				for(var i=0;i<data.data.orderList.length; i++){
					data.data.orderList[i].sku_specs = data.data.orderList[i].sku_specs.replace(/null,/g, "");
					data.data.orderList[i].sku_specs = data.data.orderList[i].sku_specs.replace(/,null/g, "");
				};
				if(filterCondition.isAppend) {
					$('#order-list').append(doT.template(self_tpl.orderListTpl)(data.data));//order_list
				} else {
					$('#order-list').html(doT.template(self_tpl.orderListTpl)(data.data));
				}
			} else {
				if(filterCondition.current_page === "1") {
					$('#order-list').html(doT.template(self_tpl.noOrdersTpl)());
				} else {
					if($('#order-list .no-goods').length === 0) {
						$('#nomore-data').show();
					}
				}
				$('#pullUp').hide();
			}
			myScroll.refresh();
			$("#page1").css("overflow","auto");
		}
	});
}

//初始化绑定iScroll控件
document.getElementById('page1').addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
// document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', loaded, false);

function loaded() {
	// pullDownEl = document.getElementById('pullDown');
	// pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp');
	pullUpOffset = pullUpEl.offsetHeight;

	/**
	 * 初始化iScroll控件
	 */
	myScroll = new iScroll('page1', {
		vScrollbar: false,
		//topOffset : pullDownOffset,
		onRefresh: function() {
			// if (pullDownEl.className.match('loading')) {
			//     pullDownEl.className = '';
			//     pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
			// } else
			if (pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
			}
		},
		onScrollMove: function() {
			// if (this.y > 5 && !pullDownEl.className.match('flip')) {
			//     pullDownEl.className = 'flip';
			//     pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
			//     this.minScrollY = 0;
			// } else
			if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
			}
		},
		onScrollEnd: function() {
			// if (pullDownEl.className.match('flip')) {
			//     pullDownEl.className = 'loading';
			//     pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
			//     pullDownAction();
			// } else
			if (pullUpEl.className.match('flip')) {
				filterCondition.current_page = (parseInt(filterCondition.current_page) + 1) + '';
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
				filterCondition.isAppend = true;
				pullUpAction(filterCondition);
			}
		}
	});
}
//
$(function() {
    returnPage.returnPageWithUrl("../center.html?from=login");
	var hoverSearch = require('../../common/hover-search.js');
//	var layerMsg = require('../../common/layer.js');
//	var myLayer = layerMsg;
	hoverSearch.init(pullUpAction);
	$('nav span').click(function() {
		if(!$(this).hasClass('active')) {
			$('#nomore-data').hide();
			$('#order-list').html('');
			filterCondition.current_page = '1';
			filterCondition.order_status = $(this).data('tab')+'';
			filterCondition.isAppend = false;
			pullUpAction(filterCondition);
		}
		$(this).addClass('active').siblings('nav span').removeClass('active');
	});

	// $('body').on('click','.cancel',function(){
	// 	var orderId = $(this).data('id')+'';
	// 	//nopassLayer(orderId, '006000005', true);
	// 	layer.open({
	// 		content: '确定取消该订单？'
	// 		,btn: ['是', '否']
	// 		,yes: function(index){
	// 			$ajax.post(null, '006000005', {order_id: orderId}, function(data) {
	// 				if(data.success){
	// 					layer.close(index);
	// 					location.reload();
	// 				}
	// 			});
	// 		}
	// 	});
	// });
	$('body').on('click','.cancel',function(){
		var orderId = $(this).data('id')+'';
		cancelLayer(orderId, '006000005');
	});
	$('body').on('click','.pass-cancel',function(){
		var orderId = $(this).data('id')+'';
		layer.open({
			content: '确定同意取消该订单？'
			,btn: ['是', '否']
			,yes: function(index){
				$ajax.post(null, '006000002', {order_id: orderId}, function(data) {
					if(data.success){
						layer.close(index);
						layer.open({
							content: "提交成功！"
							,skin: 'msg'
							,time: 2
						});
						setTimeout(function () {
							window.location.href = "my-order.html?from=login&order_type=" + order_type + "&order_status=" + filterCondition.order_status;
					    }, 1000);

						//location.reload();
					}else{
						if(data.msg){
							layer.msg(data.msg.substring(0,40));
						}else{
							layer.msg(data.substring(0,40));
						};
					};
				});
			}
		});
	});
	$('body').on('click','.nopass-cancel',function(){
		var orderId = $(this).data('id')+'';
		nopassLayer(orderId, '006000003');
		// layer.open({
		//     content: '确定不同意取消该订单？'
		//     ,btn: ['是', '否']
		//     ,yes: function(index){
		//         $ajax.post(null, '006000003', {order_id: orderId}, function(data) {
		//             if(data.success){
		//                 layer.close(index);
		//                 location.reload();
		//             }
		//         });
		//     }
		// });
	});
	$('body').on('click','.pass',function(){
		var orderId = $(this).data('id')+'';
		var passText = $(this).data('nopasstext');
		layer.open({
			content: '确定' + passText + '该订单？'
			,btn: ['是', '否']
			,yes: function(index){
				layer.open({
				    type: 2,
				    shadeClose: false,
				    content: '处理中'
				  });
				$ajax.post(null, '006000001', {order_id: orderId}, function(data) {
					layer.closeAll();
					if(data.success){
						// alert('passing');
						// alert('passed have dd...')
						layer.open({
							content: "提交成功!"
							,skin: 'msg'
							,time: 2 //2秒后自动关闭,
							// ,fixed: false
							// ,top: -250
							// ,anim: false
						});
						setTimeout(function () {
							window.location.href = "my-order.html?from=login&order_type=" + order_type + "&order_status=" + filterCondition.order_status;
					    }, 1000);
						//location.reload();
						// location.href = location.href;
						// window.open(location.href, "_self");
						// window.open(location.href);
					} else {
						if(data.msg){
							layer.open({
								content: data.msg.substring(0,40)
								,skin: 'msg'
								,time: 2 //2秒后自动关闭,
								// ,fixed: false
								// ,top: -250
								// ,anim: false
							});
							//layer.msg(data.msg.substring(0,40));
						}else{
							layer.open({
								content: data.substring(0,40)
								,skin: 'msg'
								,time: 2 //2秒后自动关闭,
								// ,fixed: false
								// ,top: -250
								// ,anim: false
							});
							//layer.msg(data.substring(0,40));
						};
//						if(data.code === '40007' || data.code === '30062'){
//							layer.close(index);
//							layer.msg(data.msg);
//							layer.open({
//								content: "提交成功！"
//								,skin: 'msg'
//								,time: 2
//							});
//						}else{
//							if(data.msg){
//								layer.msg(data.msg.substring(0,40));
//							}else{
//								layer.msg(data.substring(0,40));
//							};
//						};
					}
				});
			}
			,no: function(){
				// console.log('ok');
			}
		});
	});
	$('body').on('click','.nopass',function(){
		var orderId = $(this).data('id')+'';
		var nopassText = $(this).data('nopasstext');
		nopassLayer(orderId, '006000004');
		// layer.open({
		//     content: '确定' + nopassText + '该订单？'
		//     ,btn: ['是', '否']
		//     ,yes: function(index){
		//         $ajax.post(null, '006000004', {order_id: orderId}, function(data) {
		//             if(data.success){
		//                 layer.close(index);
		//                 location.reload();
		//             }
		//         });
		//     }
		// });
	});
	$('body').on('click','.getgoods',function(){
		var orderId = $(this).data('id')+'';
		layer.open({
			content: '确定收货？'
			,btn: ['是', '否']
			,yes: function(index){
				$ajax.post(null, '006000010', {order_id: orderId,remarks:""}, function(data) {
					if(data.success){
						layer.open({
							content: "提交成功！"
							,skin: 'msg'
							,time: 2
						});
						setTimeout(function(){
							window.location.href = "my-order.html?from=login&order_type=" + order_type + "&order_status=" + filterCondition.order_status;
						})

						//location.reload();
					}
				});
			}
		});
	});
	function nopassLayer(orderId, reqid, isCancel) {
		$('.layer-mask').remove();
		$('body').append('<div id="layer-mask" class="layer-mask"></div>');
		if(isCancel){
			$('#nopass-layer .nopass-title-1').html('取消理由');
			$('#nopass-layer .nopass-title-2').html('请输入取消理由：');
			$('#nopass-now').html('取消');
		} else {
			$('#nopass-layer .nopass-title-1').html('拒绝理由');
			$('#nopass-layer .nopass-title-2').html('请输入拒绝理由：');
			$('#nopass-now').html('拒绝');
		}
		$('.layer-mask').show();
		$('#nopass-layer').show();
		var bodyRect = document.body.getBoundingClientRect();
		var E_float = document.getElementById('nopass-layer');
		$('#nopass-layer .nopass-now').attr('data-orderid',orderId);
		$('#nopass-layer .nopass-now').attr('data-reqid',reqid);
		var top = -bodyRect.top;
		var left = -bodyRect.left;
		var iW = window.innerWidth;
		var iH = window.innerHeight;
		var floatRect = E_float.getBoundingClientRect();
		var eW = floatRect.width;
		var eH = floatRect.height;

		// E_float.style.top = (top + (iH - eH) / 2) + 'px';
		// E_float.style.left = (left + (iW - eW) / 2) + 'px';
		E_float.style.top = (0 + (iH - eH) / 2) + 'px';
		// E_float.style.left = (0 + (iW - eW) / 2) + 'px';
		if(iW < 750) {
			E_float.style.left = (0 + (iW - eW) / 2) + 'px';
		}
	}

	function cancelLayer(orderId, reqid) {
		$('.layer-mask').remove();
		$('body').append('<div id="layer-mask" class="layer-mask"></div>');
		$('#cancel-layer .cancel-title-1').html('取消理由');
		$('#cancel-layer .cancel-title-2').html('请输入取消理由：');
		$('#cancel-now').html('取消');
		$('.layer-mask').show();
		$('#cancel-layer').show();
		var bodyRect = document.body.getBoundingClientRect();
		var E_float = document.getElementById('cancel-layer');
		$('#cancel-layer .cancel-now').attr('data-orderid',orderId);
		$('#cancel-layer .cancel-now').attr('data-reqid',reqid);
		var top = -bodyRect.top;
		var left = -bodyRect.left;
		var iW = window.innerWidth;
		var iH = window.innerHeight;
		var floatRect = E_float.getBoundingClientRect();
		var eW = floatRect.width;
		var eH = floatRect.height;

		// E_float.style.top = (top + (iH - eH) / 2) + 'px';
		// E_float.style.left = (left + (iW - eW) / 2) + 'px';
		E_float.style.top = (0 + (iH - eH) / 2) + 'px';
		// E_float.style.left = (0 + (iW - eW) / 2) + 'px';
		if(iW < 750) {
			E_float.style.left = (0 + (iW - eW) / 2) + 'px';
		}
	}
	$('#nopass-now').click(function(e) {
		require('../../common/btn-trigger.js').btnCtrl(e, function(target){
			var orderId = target.data('orderid');
			var requestId = target.data('reqid');
			var nopassReason = $('#nopass-reason').val();
			if(nopassReason === ''){
				$('#operate-tips').html('拒绝原因不能为空');
				return;
			}
			$ajax.post(null, requestId, {order_id: orderId+'', remarks: nopassReason}, function(data) {
				if(data.success){
					$('.layer-mask').hide();
					$('#nopass-layer').hide();
					layer.open({
						content: "提交成功！"
						,skin: 'msg'
						,time: 2
					});
					setTimeout(function () {
						window.location.href = "my-order.html?from=login&order_type=" + order_type + "&order_status=" + filterCondition.order_status;
				    }, 1000);
					//location.reload();
				}else {
					if(data.msg){
						layer.msg(data.msg.substring(0,40));
					}else{
						layer.msg(data.substring(0,40));
					};
				}
			});
		});
	});
	$('#cancel-now').click(function(e) {
		require('../../common/btn-trigger.js').btnCtrl(e, function(target){
			var orderId = target.data('orderid');
			var requestId = target.data('reqid');
			var nopassReason = $('#cancel-reason').val();
			if(nopassReason === ''){
				$('#operate-cancel-tips').html('取消原因不能为空');
				return;
			}
			$ajax.post(null, requestId, {order_id: orderId+'', cancel_reason: nopassReason}, function(data) {
				if(data.success){
					$('.layer-mask').hide();
					$('#cancel-layer').hide();
					layer.open({
						content: "提交成功！"
						,skin: 'msg'
						,time: 2 
					});
					setTimeout(function () {
						window.location.href = "my-order.html?from=login&order_type=" + order_type + "&order_status=" + filterCondition.order_status;
				    }, 1000);

					//location.reload();
				}
			});
		});
	});
	$('body').delegate('.nopass-layer-close', require('../../common/event.js').getEventType() , function(e) {
		e.preventDefault();
		$('.layer-mask').hide();
		$('#nopass-layer').hide();
	});
	$('body').delegate('.cancel-layer-close', require('../../common/event.js').getEventType() , function(e) {
		e.preventDefault();
		$('.layer-mask').hide();
		$('#cancel-layer').hide();
	});
	// $('body').delegate('.nopass-layer-close', 'touchend', function() {
	// 	$('.layer-mask').hide();
	// 	$('#nopass-layer').hide();
	// });

	$('body').on('click','.express',function(e){
		require('../../common/btn-trigger.js').btnCtrl(e, function(target){
			var orderId = target.data('orderid')+'';
			var orderType = target.data('ordertype')+'';
			var order_status = target.data('orderstatus')+'';
			var member_id = target.attr('data-member_id')+'';
			$ajax.post(null,'006000008', {order_id: orderId,order_type:orderType,order_status:order_status, member_id: member_id}, function(data) {
				if(data.success){
					if(data.data.orderDetail){
						var expressInfo = data.data.orderDetail;
						location.href = 'https://m.kuaidi100.com/index_all.html?type=' + expressInfo.express_code + '&postid=' + expressInfo.express_no + '&callbackurl=' + location.href;
					}
				}
			});
		})
	});
});

