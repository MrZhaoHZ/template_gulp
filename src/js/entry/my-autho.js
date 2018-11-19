// require('../common/login-status.js').isLogin(function(){});
var httpURL = require('../common/http-url.js');
if(!httpURL.getQueryString('from')){
	require('../common/localStorage.js').setItem('login_redirect',location.href+'?from=login');
}
var $ajax = require('../common/ajax.js');
// var self_tpl = require('../module/tpl/order-tpl.js');
$(function() {
	var openid = null;
	var status = 1;
	if(typeof($.cookie) == 'function') {
		openid = $.cookie('openid');
	}
	if(typeof($.fn.cookie) == 'function') {
		openid = $.fn.cookie('openid');
	};
	$ajax.post(null,'003000026',{open_id: openid},function(data){
		if(!data.success && data.code == "30064"){ // 30064正在升级中。
			$(".center-home").attr('href','center-upgrading.html?from=login');
		}
	});
	var eleTpl =    '<img src="{{= it.back_picture }}" alt="" />\
					{{~ it.list:item:index }}\
						{{? it.eleType[item.type].type=="title"}}\
						<span style="position: absolute;left: {{= item.app_x }};top: {{= item.app_y }};font-family:{{= it.fontFamilyFlag[item.type_face].code }};font-size:{{= item.font_size }}px;color:{{= item.font_color }};font-weight:{{? item.is_bold==1}}bold{{?}}">\
							{{? item.type==3}}{{= it.userInfo.authorization_no}}{{?}}\
							{{? item.type==4}}{{= it.userInfo.real_name}}{{?}}\
							{{? item.type==5}}{{= it.userInfo.wechat_id}}{{?}}\
							{{? item.type==6}}{{= it.userInfo.name}}{{?}}\
							{{? item.type==7 || item.type==10}}{{= it.userInfo.grade_name}}{{?}}\
							{{? item.type==8}}{{= it.userInfo.start_time.substr(0,10)}}{{?}}\
						</span>\
						{{?}}\
						{{? it.eleType[item.type].type=="img"}}\
						<img src="{{? item.type==1}}{{= it.imge}}{{?}}{{? item.type==2}}{{= it.userInfo.pic}}{{?}}" style="position: absolute;left: {{= item.app_x }};top: {{= item.app_y }};width: {{= item.width }}px;height: {{= item.height }}px;"></img>\
						{{?}}\
					{{~}}';
	var elePicTpl =    '<img src="{{= it.upload_path }}{{= it.data }}" alt="" />';
	var bookTabTpl = '{{~ it:item:index }}\
						<span class="{{? index==0}}active{{?}}" data-tab="{{= item.id}}">{{= item.name}}</span>\
					  {{~}}';
	
	var eleFlag = {
		'1': {
			'type': 'img',
			'name': '二维码'
		},
		'2': {
			'type': 'img',
			'name': '图像'
		},
		'3': {
			'type': 'title',
			'name': '授权编号'
		},
		'4': {
			'type': 'title',
			'name': '姓名'
		},
		'5': {
			'type': 'title',
			'name': '微信号'
		},
		'6': {
			'type': 'title',
			'name': '微信昵称'
		},
		'7': {
			'type': 'title',
			'name': '代理级别'
		},
		'10': {
			'type': 'title',
			'name': '代理级别'
		},
		'8': {
			'type': 'title',
			'name': '授权开始时间'
		},
		'9': {
			'type': 'title',
			'name': '授权结束时间'
		}
	}
	var eleType = {
		'1': {
			'type': 'img',
		},
		'2': {
			'type': 'img',
		},
		'3': {
			'type': 'title',
		},
		'4': {
			'type': 'title',
		},
		'5': {
			'type': 'title',
		},
		'6': {
			'type': 'title',
		},
		'7': {
			'type': 'title',
		},
		'10': {
			'type': 'title',
		},
		'8': {
			'type': 'title',
		},
		'9': {
			'type': 'title',
		}
	};
	var fontFamilyFlag = {
		'1': {
			'name': '黑体',
			'code': 'SimHei'
		},
		'2': {
			'name': '黑体加粗',
			'code': 'SimHei'
		},
		'3': {
			'name': '微软雅黑',
			'code': 'Microsoft YaHei'
		},
		'4': {
			'name': '微软雅黑加粗',
			'code': 'Microsoft YaHei'
		}
	};
	var userInfo = {};
	function getBookList(){
		$ajax.ajaxGet(null, "003000013",{}, function(data){
			if (data.success) {
				// var data = data.data;
				$('#nav').html(doT.template(bookTabTpl)(data.data.certificate.datas));
				// var memberInfo = data.member;
				// var agentInfo = data.agent;
				// userInfo.erweima = null;
				// userInfo.pic = memberInfo.portrait_uri;
				// userInfo.authorization_no = agentInfo.authorization_no;
				// userInfo.real_name = memberInfo.real_name;
				// userInfo.wechat_id = memberInfo.wechat_id;
				// userInfo.name = memberInfo.name;
				// userInfo.grade_name = agentInfo.grade_name;
				// userInfo.start_time = agentInfo.start_time;
				// // userInfo.end_time = memberInfo.end_time;
				getBookDetail($('#nav .active').data('tab'));
				// data.upload_path =  require('../../../tmp_path_config.js').upload_path;
				// $('#book-container').html(doT.template(elePicTpl)(data));
			};
		});
	}
	function getBookDetail(id) {
		$ajax.ajaxGet(null, "003000024",{cert_id:id+''}, function(data){
			if (data.success) {
				// var bookInfo = data.data;
				// bookInfo.fontFamilyFlag = fontFamilyFlag;
				// bookInfo.eleType = eleType;
				// bookInfo.eleFlag = eleFlag;
				// bookInfo.userInfo = userInfo;
				// $('#book-container').html(doT.template(eleTpl)(bookInfo));
				data.upload_path =  require('../../../tmp_path_config.js').upload_path;
				$('#book-container').html(doT.template(elePicTpl)(data));
			};
		});
	}
	getBookList(1);
	$('#nav').on('click','span',function(){
		if(!$(this).hasClass('active')) {
			$('#book-container').html('');
			getBookDetail($(this).data('tab'));
		}
		$(this).addClass('active').siblings('span').removeClass('active');
	});
});

