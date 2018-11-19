/**
 *	控制页面元素的可见性及相关逻辑
 *
**/
var httpUrl = require('../../common/http-url.js');
var self_tpl = {
	pageTypeTpl: '{{~ it.data:item:index }}\
						<option value="{{= item.id }}" {{? it.pagetype && it.pagetype === item.id }} selected {{?}}>{{= item.name }}</option>\
				   {{~}}'
}
function initPageType() {
	var pageType = {
		data: [
			{
				id: 1,
				name: "主页"
			},
			{
				id: 2,
				name: "推广页"
			}
		]
	}
	if(isNew()){
		$('#page-name-li').hide();
		pageType.pagetype = pageType.data[0].id;
		$('#page-title').html('界面绘制-新增')
	} else {
		if(httpUrl.getQueryString('pagetype') === '1'){
			$('#page-name-li').hide();
		}
		$('#page-title').html('界面绘制-编辑')
		pageType.pagetype = parseInt(httpUrl.getQueryString('pagetype'));
		$('#page-type').attr('disabled','disabled');
	}
	$('#page-type').html(doT.template(self_tpl.pageTypeTpl)(pageType));
}
function initPageData() {
	if(httpUrl.getQueryString('pagetype') && httpUrl.getQueryString('pagetype') != '1') {
		$('.tab-order-li,.tab-order-gap').hide();
	}
}
//是否是新增
function isNew() {
	if(httpUrl.getQueryString('pagetype') && httpUrl.getQueryString('pageid')) {
		return false;
	}
	return true;
}
function init() {
	initPageType();
	initPageData();
	if(!httpUrl.getQueryString('pagetype')) {
        $("#add-page").show();
    }
    if(httpUrl.getQueryString('pagetype')) {
    	$("#add-page").hide();
    	if(httpUrl.getQueryString('pagetype') != 1) {
    		$('#block-type option').eq(2).hide();
    	}
    }
}

var accessCtrl = {
	init: init,
	isNew: isNew
}
module.exports = accessCtrl;