var $ajax = require('../common/ajax.js');
$(function() {
	var resultTpl = '<p>授权级别：{{= it.agent_grade_name}}</p>\
					 <p>姓名：{{= it.name}}</p>\
					 <p>授权编号：{{= it.authorization_no}}</p>\
					 <p>状态：{{? it.status == 0}}正常{{??}}取消授权{{?}}</p>';
	$('#search-btn').click(function() {
		$('#search-result').hide();
		$('#result-container').html('');
		$ajax.ajaxPost(null, '003000011', {key_word:$('#keyword').val()}, function(data) {
			if(data.success){
				if(data.data && data.data.length != 0){
					$('#search-result').show();
					$('#result-container').html(doT.template(resultTpl)(data.data[0]));
				}
			} else {
				if(data.code == '30011'){
					$('#result-container').html(data.msg);
				}
			}
		});
	});
});

