var self_tpl = {
	'addrTpl': '<span class="logo"></span>\
				<div class="info">\
					<span>{{= it.member_name}}</span>\
					<span>{{= it.mobile}}</span>\
					<span>{{= it.address}}</span>\
				</div>'
	,'orderCancelExpressTpl' : '{{? it.orderDetail.order_status==36 || it.orderDetail.order_status==38 || it.orderDetail.order_status==39}}\
								<div class="blk reason" id="cancel-reason">\
									<span class="key">{{? it.orderDetail.order_status==38}}拒绝原因：{{?}}{{? it.orderDetail.order_status==36||it.orderDetail.order_status==39}}取消原因：{{?}}</span>\
									<span class="value">{{? it.orderDetail.order_status==38}}{{= it.orderDetail.reject_reason}}{{?}}{{? it.orderDetail.order_status==36 || it.orderDetail.order_status==39}}{{= it.orderDetail.cancel_reason}}{{?}}</span>\
								</div>\
								{{?}}\
								{{? it.isSendPage=="true"}}\
								<div class="blk express" id="express-form">\
									<div class="form-item">\
										<span class="key">物流公司：</span>\
										<span class="value">\
											<select name="" id="expressSelect">\
												{{~ it.expressConfigDTOS:item:index }}\
												<option value="{{= item.express_code}}">{{= item.express_name}}</option>\
												{{~}}\
											</select>\
										</span>\
									</div>\
									<div class="form-item">\
										<span class="key">物流单号：</span>\
										<span class="value">\
											<input type="text" placeholder="请输入物流单号" id="express_no">\
										</span>\
									</div>\
									<div class="send">\
										<span id="send-goods-btn">发货</span>\
									</div>\
								</div>\
								{{?}}'
	,'orderGoodsTpl' : '<div class="title">\
						{{? it.order_status==29}}待审单\
						{{?? it.order_status==30}}待审单\
						{{?? it.order_status==31}}已审单\
						{{?? it.order_status==32}}待发货\
						{{?? it.order_status==34}}已发货\
						{{?? it.order_status==33}}待收货\
						{{?? it.order_status==35}}取消中\
						{{?? it.order_status==36}}已取消\
						{{?? it.order_status==39}}强制取消\
						{{?? it.order_status==37}}已完成\
						{{?? it.order_status==38}}已拒绝\
						{{?}}(\
						{{? it.deliver_type==1}}上级发货\
						{{?? it.deliver_type==2}}总部发货\
						{{?}})\
						</div>\
						<div class="ctrl">\
							<img src="{{= it.upload_path}}{{= it.sku_image_url}}" alt="">\
							<div class="about">\
								<p class="goods-name">{{= it.sku_name}}</p>\
								<p class="guige">规格：{{= it.sku_specs}}</p>\
							</div>\
							<div class="price">\
								<p>{{= it.wechat_price}}</p>\
								<p class="num">x{{= it.count}}</p>\
							</div>\
						</div>'
	,'orderProcessTpl' : '<section id="cd-timeline-{{= it.length}}" class="cd-container-normal">\
							{{~ it:item:index }}\
							<div class="cd-timeline-block">\
								<div class="cd-timeline-img cd-picture"></div>\
								<div class="cd-timeline-content">\
									<p class="detail">\
										<span class="name" id="superior">{{= item.handle_time}}&nbsp;</span>\
										<span class="status" id="superior_state">{{? item.status==5 || item.status==6}}已拒绝{{?? item.status==10 || item.status==11}}待审核{{??}}{{= item.remarks}}{{?}}</span>\
									</p>\
									<p class="time" id="time1">{{= item.member_name}}({{= item.grade_name}})</p>\
								</div>\
							</div>\
							{{~}}\
						  </section>'
	,'orderOtherTpl' : '<div class="blk" style="margin-top: 0.2rem;">\
							<span class="key">订单合计：</span>\
							<span class="value">￥{{= it.total_amount}}</span>\
						</div>\
						{{? it.order_status==33 || it.order_status==34 || it.order_status==37}}\
						<div class="blk">\
							<span class="key">物流公司：</span>\
							<span class="value">{{= it.express}}</span>\
						</div>\
						<div class="blk">\
							<span class="key">物流单号：</span>\
							<span class="value">{{= it.express_no}}</span>\
						</div>\
						{{?}}\
						<div class="blk">\
							<span class="key">订单编号：</span>\
							<span class="value">{{= it.order_sn}}</span>\
						</div>\
						<div class="blk">\
							<span class="key">下单时间：</span>\
							<span class="value">{{= it.order_time}}</span>\
						</div>'
	,'submitPersonTpl': '<div class="blk submit-person"><span class="key">提单人：</span><span class="value">{{= it.member_name}}({{= it.grade_name}})</span></div>'
};
module.exports = self_tpl;
