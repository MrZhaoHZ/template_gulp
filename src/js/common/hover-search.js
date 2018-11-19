var searchLayerSelectTpl = '<div class="search-btn" id="search-btn"></div>\
							<div id="search-layer" class="search-layer">\
								<p class="search-title"><span>搜&nbsp;&nbsp;索</span><span class="search-layer-close\
								"></span></p>\
								{{? it.orderType == 2}}\
								<p>&nbsp;&nbsp;&nbsp;提单人：<input type="text" id="member_name" /></p>\
								{{?}}\
								<p>订单类型：\
								<select name="" id="deliverType">\
									<option value="0">全部</option>\
									<option value="1">上级发货</option>\
									<option value="2">总部发货</option>\
								</select></p>\
								<p>开始时间：<input type="text" id="date-begin" /></p>\
								<p>截至时间：<input type="text" id="date-end" /></p>\
								<p class="tool"><span class="search-now" id="search-now">立即查找</span></p>\
							</div>';
var selectMetaData = {orderType: 1};
if($('input[name="orderType"]').val() === '2') {
	selectMetaData.orderType = 2;
}
function init(pullUpAction) {
	$('body').append(doT.template(searchLayerSelectTpl)(selectMetaData));
	$('#search-btn').click(function() {
		$('.layer-mask').remove();
		$('body').append('<div id="layer-mask" class="layer-mask"></div>');
		$('.layer-mask').show();
		$('#search-layer').show();
		var bodyRect = document.body.getBoundingClientRect();
		var E_float = document.getElementById('search-layer');
		var top = -bodyRect.top;
		var left = -bodyRect.left;
		var iW = window.innerWidth;
		var iH = window.innerHeight;
		var floatRect = E_float.getBoundingClientRect();
		var eW = floatRect.width;
		var eH = floatRect.height;

		E_float.style.top = (0 + (iH - eH) / 2) + 'px';
		E_float.style.left = (0 + (iW - eW) / 2) + 'px';
	});
	//转化时间格式:09/04/2018 ===>2018-09-04
	function formatTime(timeStr) {
		if(timeStr === "") {
			return "";
		}
		var temp = timeStr.split('/');
		return temp[2] + '-' + temp[1] + '-' + temp[0];
	}
	$('#search-now').click(function() {
		var filterCondition = {
			current_page: "1",
			page_size: "20",
			order_type: selectMetaData.orderType + '',
			order_status: $('#nav .active').data('tab') + '',
			deliver_type:  $('#deliverType option:checked').val() != 0 ?  $('#deliverType option:checked').val() : '',
			// deliver_type: '',
			start_time: formatTime($('#date-begin').val()) + " 00:00:00",
			end_time: formatTime($('#date-end').val()) + " 00:00:00",
			member_name: '',
			isAppend: true
		}
		if(selectMetaData.orderType === 2) {
			filterCondition.member_name = $('#member_name').val()
		}
		// $('#nav span').removeClass('active');
		// $('#nav .tab' + filterCondition.order_type).addClass('active');
		$('#order-list').html('');
		pullUpAction(filterCondition);
		$('.layer-mask').hide();
		$('#search-layer').hide();
	});

	$('body').delegate('.search-layer-close', 'click', function() {
		$('.layer-mask').hide();
		$('#search-layer').hide();
	});
	var curr = new Date().getFullYear();
	var opt = {}

	opt.date = {
		preset: 'date'
	};

	opt.datetime = {
		preset: 'datetime',
		minDate: new Date(2012, 3, 10, 9, 22),
		maxDate: new Date(2014, 7, 30, 15, 44),
		stepMinute: 5
	};

	opt.time = {
		preset: 'time'
	};

	opt.tree_list = {
		preset: 'list',
		labels: ['Region', 'Country', 'City']
	};

	opt.image_text = {
		preset: 'list',
		labels: ['Cars']
	};

	opt.select = {
		preset: 'select'
	};
	$('#date-begin').val('').scroller('destroy').scroller($.extend(opt['date'], {
		theme: 'android-ics light',
		mode: 'scroller',
		display: 'modal',
		lang: 'zh'
	}));
	$('#date-end').val('').scroller('destroy').scroller($.extend(opt['date'], {
		theme: 'android-ics light',
		mode: 'scroller',
		display: 'modal',
		lang: 'zh'
	}));
}
exports.init = init;