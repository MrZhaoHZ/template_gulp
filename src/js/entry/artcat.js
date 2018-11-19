var $ajax = require('../common/ajax.js');
var self_tpl = require('../module/tpl/artcat-tpl.js');
var api_path_config = require('../../../tmp_path_config.js');
var httpURL = require('../common/http-url.js');
$(function(){
	var articleId = httpURL.getQueryString('id');
	var catId = httpURL.getQueryString('catid');
	var goodsListFilter = {
		page_size: '10',
		current_page: '1'
	};

	if(catId && catId == 15){
		initGoodsList();
	}

	function initGoodsList(){
		$ajax.ajaxGet(null, "002000002", {article_id: articleId+'', page_size: goodsListFilter.page_size, current_page: goodsListFilter.current_page}, function(data){
			if (data.success) {
				data.data.upload_path = api_path_config.upload_path;
				data.data.current_page = goodsListFilter.current_page;
				data.data.page_size = goodsListFilter.page_size;
				if(data.data.current_page == Math.ceil(data.data.total_counts / goodsListFilter.page_size)) {
					data.data.isLastPage = true;
				}
				$('#artList').html(doT.template(self_tpl.listTpl)(data.data));
			};
		});
	}
	$('body').on('click','.pageprev',function(){
		goodsListFilter.current_page = parseInt(goodsListFilter.current_page) - 1;
		initGoodsList();
	});
	$('body').on('click','.pagenext',function(){
		goodsListFilter.current_page = parseInt(goodsListFilter.current_page) + 1;
		initGoodsList();
	});
});
