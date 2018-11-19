var zeroClipboard = require('../common/zeroClipboard.js');
var tmp_path_config = require('../../../tmp_path_config.js');
var jsonstring2object = require('../common/jsonstring2object.js');
var api_path = tmp_path_config.api_path;
var preview_path = tmp_path_config.preview_path;
$(function (){
	var param = {
		"type": null, 
		"publish_status": null, // 搜索条件
		"name": null,
		"current_page": 1,
		"page_size": 20
	};
	var pageIndex = 1;
	function pageList(param){
		$.ajax({
			type: "post",
			url: api_path + '/mainweb/page/list.do',
			data: param,
			success : function(result) {
				result = jsonstring2object.parse(result).data;
				var interText = doT.template($("#act-template").text());
				$("#interpolation").html(interText(result));
				if(pageIndex === 1) {
					pageIndex++;
					pager(param.current_page, Math.ceil(result.total_count/param.page_size));
				}
				// zeroClipboard.copyLink($('.copy-link'));
			}
		});
	};
	zeroClipboard.copyLink('#interpolation','.copy-link');
	pageList(param);
	function pager(current_page, pageCount) {
		$(".tcdPageCode").createPage({
			pageCount: pageCount,
			current: current_page,
			backFn: function(current_page){
				param.current_page = current_page;
				pageList(param);
			}
		});
	};
	//处理选项卡
	// $('.btn-tab span').on('click',function(){
	// 	$('.btn-tab span').removeClass("clicked");
	// 	$('.btn-tab span').css({
	// 		"background-color":'#fff',
	// 		"border-bottom":"1px solid #383838"
	// 	});
	// 	$(this).css({
	// 		"background-color":'#e6e6e6',
	// 		"border-bottom":"1px solid #969696"
	// 	});
	// 	param.conditions = $("#inputConditions").val();
	// 	param.status = $(".clicked").text();
	// 	param.current_page = 0;
	// 	pageList(param.current_page, param.status, param.conditions);
	// });

	$(".container .first").css({
		"background-color":'#e6e6e6',
		"border-bottom":"1px solid #969696"
	});

	$('#search').on('click',function(){
		var param = {
			"name": $("#inputConditions").val(),
			"current_page": 1,
			"page_size": 20
		};
		if($('#pageType').val() != "all") {
			param.type = $('#pageType').val();
		}
		if($('#publishStatus').val() != "all") {
			param.publish_status = $('#publishStatus').val();
		}
		pageList(param);
	});

	$('#interpolation').delegate('.cancel-btn', 'click', function(){
		var parentTd = $(this).closest('td');
		layer.confirm('确定撤销吗？', {
			btn: ['确定','取消'] //按钮
		}, function(){
			cancelPage();
		}, function(){
			return;
		});
		function cancelPage() {
			$.ajax({
				type: "post",
				url: api_path + "/mainweb/page/cancel.do",
				data: {id: parentTd.data('pageid')},
				success : function(result) {
					// param.current_page = 1;
					// pageList(param);
					parentTd.closest('tr').find('td').eq(3).html('未发布');
					layer.msg('已撤销');
					pageList(param);
				}
			});
		}
	});
	$('#interpolation').delegate('.delete-btn', 'click', function(){
		var parentTd = $(this).closest('td');
		layer.confirm('确定删除吗？', {
			btn: ['确定','取消'] //按钮
		}, function(){
			deletePage();
		}, function(){
			return;
		});
		function deletePage() {
			$.ajax({
				type: "post",
				url: api_path + "/mainweb/page/delete.do",
				data: {id: parentTd.data('pageid')},
				success : function(result) {
					// param.current_page = 1;
					// pageList(param);
					layer.msg('已删除');
					parentTd.closest('tr').remove();
				}
			});
		}
	});
	$('#interpolation').delegate('.publish-btn', 'click', function(){
		var parentTd = $(this).closest('td');
		layer.confirm('确定发布吗？', {
			btn: ['确定','取消'] //按钮
		}, function(){
			// publishPage();
			$.post(api_path + "/mainweb/page/publish.do", { pageId: parentTd.data('pageid') }, function(resp) {
				// console.log(resp);
				parentTd.closest('tr').find('td').eq(3).html('已发布');
				layer.msg('发布成功');
				pageList(param);
			});
		}, function(){
			return;
		});
	});
	$('#interpolation').delegate('.preview-btn', 'click', function(){
		var pageId = $(this).closest('td').data('pageid');
		var pageType = $(this).closest('td').data('pagetype');
		var previewURl = null;
		if(pageType === 1) {
			previewURl = preview_path + 'index.html?type=preview&' + 'active_id=' + pageId;
			// previewURl = 'http://mtest.haiyn.com/index.html?type=preview&' + 'active_id=' + pageId;
		} else {
			previewURl = preview_path + 'main.html?type=preview&' + 'pagetype=' + pageType + '&pageid=' + pageId;
			// previewURl = 'http://mtest.haiyn.com/main.html?type=preview&' + 'pagetype=' + pageType + '&pageid=' + pageId;
		}
		//iframe层
		layer.open({
		  type: 2,
		  title: '预览',
		  shadeClose: true,
		  shade: 0.8,
		  area: ['414px', '736px'],
		  content: previewURl//iframe的url
		}); 
	});
});