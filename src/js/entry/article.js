var $ajax = require('../common/ajax.js');
var httpURL = require('../common/http-url.js');
// var api_path_config = require('../../../tmp_path_config.js');
$(function() {
	var articleId = httpURL.getQueryString('id');
	var catId = httpURL.getQueryString('catid');
	if(catId && catId == 15){
		$ajax.ajaxGet(null, "002000003",{item_sku_id: articleId+''}, function(data){
			if (data.success && data.data) {
				//data.data.upload_path = api_path_config.upload_path;
				$('#img-container').html(data.data.brief);
			};
		});
	} else {
		$ajax.ajaxGet(null, "005000003",{article_id: articleId+''}, function(data){
			if (data.success && data.data) {
				//data.data.upload_path = api_path_config.upload_path;
				$('#img-container').html(data.data.content);
			};
		});
	}
});

