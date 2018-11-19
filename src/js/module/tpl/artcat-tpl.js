var self_tpl = {
	'listTpl': '<div class="artcat_div">\
					<img src="../../images/help/998562281723_20150724141116_799.jpg" alt="">\
				</div>\
				<ul class="artcat_ul">\
					{{~ it.item_sku_d_t_os:item:index }}\
					<li>\
						<a href="article.html?id={{= item.id}}&catid=15">\
							<strong>{{= item.name}}</strong>\
							<small><img src="../../images/help/icon_right.png"></small>\
						</a>\
					</li>\
					{{~}}\
				</ul>\
				<div class="pagination pagination-large">\
					<ul>\
						{{? it.current_page != 1 }}\
						<li><a href="javascript:void(0);" class="pageprev">上一页</a>\</li>\
						{{?}}\
						<li class="active"><a href="javascript:void(0);" page="1" class="pagenum" title="第{{= it.current_page}}页">1</a></li>\
						{{? it.isLastPage }}\
						<li><a href="javascript:void(0);" page="2" class="pagenext">下一页</a></li>\
						{{?}}\
					</ul>\
				</div>'
};
module.exports = self_tpl;
