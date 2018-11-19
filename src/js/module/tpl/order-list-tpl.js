var self_tpl = {
	'noGoodsTpl': '<li class="item"">\
					<div class="middle-info">\
						<div class="no-goods">\
							<img class="img_no_goods" src="../../images/nogoods.png" alt="">\
						</div>\
					</div>\
				</li>',
	'goodsListTpl':'{{~ it.datas:item:index }}\
						<li class="item" data_id={{= item.order_id}} data_num={{= item.drai_award || ""}}>\
							<div class="order_left">\
								<p class="top_p">{{= item.activity_name}}</p>\
								<p class="bottom_p">{{= item.start_time}}</p>\
							</div>\
							<div class="order_right">\
								<p>\
									{{? it.id == "2"}}\
										<span class="right_span">{{= item.member_name}}</span>\
										<span class="left_span">推荐人：</span>\
									{{?? it.id == "1"}}\
										<span class="right_span">{{= item.drai_award}}</span>\
									{{?}}\
								</p>\
								<p>\
									<span class="right_span">{{= item.consignee}}</span>\
									<span class="left_span">下单人：</span>\
								</p>\
							</div>\
						</li>\
					{{~}}'
};
module.exports = self_tpl;