var self_tpl = {
		'getGoodsPaymentDetailTpl': '{{~ it.data:item:index }}\
							<li order_type={{= item.order_type || "-"}} order_status={{= item.order_status || "-"}} order_id={{= item.order_id || "-"}}>\
								<div class="name-per">\
									<div class="left">\
										{{? item.type == 3 || item.type == 6}}\
											<img src="../../images/money.png">\
										{{?? }}\
											<img src="{{= it.path}}{{= item.image_url || ""}}">\
										{{?}}\
									</div>\
									<div class="middle">\
										<span class="span_top">{{= item.amount || ""}}</span>\
										<span class="span_bottom">{{= item.type_name || ""}}</span>\
									</div>\
									<div class="right">\
										<span class="span_top">{{= item.operate_date || ""}}</span>\
										<span class="span_bottom">{{= item.status_name || ""}}</span>\
									</div>\
								</div>\
							</li>\
					{{~}}',
		'getGoodsPaymentExamineTpl': '{{~ it.data:item:index }}\
							<li>\
					<div class="name-per">\
						<p class="p_top">\
							<span class="p_left">状态：</span>\
							{{? it.status == 1}}\
								<span class="p_middle">待审核</span>\
							{{?? it.status == 2}}\
								<span class="p_middle">已审核</span>\
							{{?? it.status == 3}}\
								<span class="p_middle">已取消</span>\
							{{?}}\
							<span class="p_right">{{= item.apply_date}}</span>\
						</p>\
						<div class="content_detail">\
							<div class="left">\
								<img src="{{= item.portrait_uri}}">\
							</div>\
							<div class="middle">\
								<p>\
									<span>姓名：</span>\
									<span>{{= item.real_name}}</span>\
								</p>\
								<p>\
									<span>货款金额：</span>\
									<span>{{= item.topup_amount_d}}</span>\
								</p>\
							</div>\
						</div>\
						<div class="bottom">\
							{{? it.status == 1}}\
								<div class="preding">\
									<span class="span_btn agree" member_id="{{= item.member_id}}" data_id="{{= item.biz_id}}">同意</span>\
									<span class="span_btn refuse" member_id="{{= item.member_id}}" data_id="{{= item.biz_id}}">拒绝</span>\
								</div>\
							{{?? it.status == 3}}\
								<div class="cancel">\
									<p>\
										<span>拒绝原因：</span>\
										<span>{{= item.biz_desc}}</span>\
									</p>\
								</div>\
							{{?}}\
						</div>\
					</div>\
				</li>\
					{{~}}'
};
module.exports = self_tpl;
