var $ajax = require('../common/ajax.js');
var httpURL = require('../common/http-url.js');
var api_path_config = require('../../../tmp_path_config.js');
$(function() {
	var gradeId = httpURL.getQueryString('id');
	var eleTpl =    '<img src="{{= it.upload_path }}{{= it.price_uri }}" alt="" />';
	$ajax.ajaxGet(null, "003000019",{agent_grade: gradeId+''}, function(data){
		if (data.success) {
			data.data.upload_path = api_path_config.upload_path;
			// data.data.price_uri = '20170409160214604.jpg';
			$('#img-container').html(doT.template(eleTpl)(data.data));
		};
	});
});

