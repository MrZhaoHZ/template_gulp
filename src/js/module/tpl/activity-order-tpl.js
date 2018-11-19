var self_tpl = {
	'orderContentTpl': '{{~ it.data.data:item:index}}\
		{{? item.act_order_details_d_t_o_list}}\
			{{ for(var j=0, len=item.act_order_details_d_t_o_list.length; j<len; j++) { }}\
				<div>\
					<div class= "order-number">\
					订单编号：{{= item.order_sn}}\
					</div >\
					<div class="commodity-details">\
						<div class="headerInfor">\
							<div class="imgInfor">\
								<img src="{{= it.path + item.act_order_details_d_t_o_list[j].image_uri}}" alt="">\
							</div>\
							<div class="inforOr">\
								<p class="color01">\
									<span class="spLeft">{{= item.act_order_details_d_t_o_list[j].item_name}}</span>\
									<span class="spRight">数量 : {{= item.act_order_details_d_t_o_list[j].quantity}}</span>\
								</p>\
								<p class="color02">\
									<span class="spLeft">规格:{{= item.act_order_details_d_t_o_list[j].unit}}</span>\
									<span class="spRight">￥{{= item.act_order_details_d_t_o_list[j].unit_price}}</span>\
								</p>\
							</div>\
						</div>\
					</div>\
					<div class="total-details">\
						<div>\
							合计：￥\
								<span>{{= item.act_order_details_d_t_o_list[j].total_money}}</span>\
						</div>\
						<a href="orderDetails.html?order_id={{= item.act_order_details_d_t_o_list[j].order_id}}"  class="details">\
							详情\
						</a>\
					</div>\
				</div>\
			{{ } }}\
		{{?}}\
	{{~}}',
	'orderDetailsTpl': '\
		<div class="title">\
			<img src="../../images/u2472.png" alt="" >\
			<div>\
				<p>收件人：\
                    <span>{{= it.data.consignee}}</span> &nbsp;\
                    <span>{{= it.data.mobile}}</span>\
				</p>\
				<p>收货地址：\
                    <span>{{= it.data.address}}</span>\
				</p>\
			</div>\
        </div >\
		<div class="content">\
			<div>\
				<div class="commodity-details">\
					<div class="headerInfor">\
						<div class="imgInfor">\
							<img src="{{= it.path + it.data.image_uri}}" alt="">\
                        </div>\
						<div class="inforOr">\
							<p class="color01">\
								<span class="spLeft">{{= it.data.item_name}}</span>\
								<span class="spRight">数量 ：1</span>\
							</p>\
							<p class="color02">\
								<span class="spLeft">规格:{{= it.data.unit}}</span>\
								<span class="spRight">￥{{= it.data.unit_price_str}}</span>\
							</p>\
						</div>\
					</div>\
				</div>\
				<div class="order-number">\
					订单奖励：\
                    <span id="num" class="num"></span>\
				</div>\
				<div class="order-number">\
					订单合计：\
                    <span>￥{{= it.data.total_amount_str}}</span>\
				</div>\
				<div class="order-number">\
					订单编号：\
                    <span>{{= it.data.order_sn}}</span>\
				</div>\
				<div class="order-number">\
					下单时间：\
                    <span>{{= it.data.order_date}}</span>\
				</div>\
				{{? it.data.order_status ==3}}\
				<div class="order-number">\
					物流公司：\
                    <span>{{= it.data.express}}</span>\
				</div>\
				<div class="order-number">\
					物流单号：\
                    <span>{{= it.data.express_no}}</span>\
				</div>\
				{{? }}\
			</div>\
		</div>\
		{{? it.data.order_status ==1}}\
			<div class="footer">\
			<div class="total-details">\
				<div>\
					待发货\
                </div>\
			</div>\
		</div>\
		{{?? it.data.order_status ==3 }}\
		<div class="footer">\
			<div class="total-details">\
				<div>\
					已发货\
                </div>\
					<a class="details" href="https://m.kuaidi100.com/index_all.html?postid={{= it.data.express_no || ""}}" target="_blank">查看物流</a>\
			</div>\
		</div>\
		{{?}}'
};
module.exports = self_tpl;