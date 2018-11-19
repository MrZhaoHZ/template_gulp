var remSetting = require('../../common/rem.js').remSetting;
var self_tpl = require('../../module/tpl/team-tpl.js');
var $ajax = require('../../common/ajax.js');
var httpURL = require('../../common/http-url.js');
var returnPage = require('../../common/return-page.js');
remSetting();
var data,
	myScroll,
	//pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset,
	generatedCount = 0;
// function pullDownAction () {
//     $.getJSON('/uploads/rs/200/ptvnx6ur/test.json', function (data, state) {
//     });
// }
var filterCondition = {page_size: '20',current_page: '1',audit_status:'0',isAppend:true};
function pullUpAction(filterCondition) {
	// filterCondition.current_page = current_page;
	$ajax.ajaxPost(null, "003000005", filterCondition, function(data){
		if(data.success){
			
			if(filterCondition.isAppend && data.data) {
				$(".no_info").css("display", "none");
             	//$("#pullUp").css("display", "block");
				$('#stuList').append(doT.template(self_tpl.myTeamUpgrade)({data: data.data.datas, type: filterCondition.audit_status}));
			} else {
				if(data.data) {
					$(".no_info").css("display", "none");
             		//$("#pullUp").css("display", "block");
					$('#stuList').html(doT.template(self_tpl.myTeamUpgrade)({data: data.data.datas, type: filterCondition.audit_status}));
				}
			};
			if (data.data && data.data.datas.length >=5) {// 没有一条数据
                $("#pullUp").css("display", "block");
			}else{
				$("#pullUp").css("display", "none");
			};
			if (!data.data && filterCondition.current_page == "1") {
                $("#pullUp").css("display", "none");
                $(".no_info").css("display", "block");
            }
			myScroll.refresh();
			 if (!data.data && filterCondition.current_page != "1") {
                $(".pullUpLabel").text("加载完毕！")
                $(".pullUpIcon").css("display", "none");
            }else{
                $(".pullUpLabel").text("上拉加载更多")
                $(".pullUpIcon").css("display", "block");
            }
		}
	});
}
//

//初始化绑定iScroll控件
document.getElementById('page1').addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
// document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', loaded, false);

function loaded() {
	// pullDownEl = document.getElementById('pullDown');
	// pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp');
	pullUpOffset = pullUpEl.offsetHeight;

	/**
	 * 初始化iScroll控件
	 */
	myScroll = new iScroll('page1', {
		vScrollbar: false,
		//topOffset : pullDownOffset,
		onRefresh: function() {
			// if (pullDownEl.className.match('loading')) {
			//     pullDownEl.className = '';
			//     pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
			// } else
			if (pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
			}
		},
		onScrollMove: function() {
			// if (this.y > 5 && !pullDownEl.className.match('flip')) {
			//     pullDownEl.className = 'flip';
			//     pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
			//     this.minScrollY = 0;
			// } else
			if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
			}
		},
		onScrollEnd: function() {
			// if (pullDownEl.className.match('flip')) {
			//     pullDownEl.className = 'loading';
			//     pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
			//     pullDownAction();
			// } else
			if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
				filterCondition.current_page = (parseInt(filterCondition.current_page) + 1) + '';
				filterCondition.isAppend = true;
				pullUpAction(filterCondition);
			}
		}
	});
}
$(function() {
    returnPage.returnPageWithUrl("../center.html?from=login");
	 $('nav span').click(function() {
		$('#stuList').html('');
		filterCondition.current_page = '1';
		filterCondition.audit_status = $(this).data('tab')+'';
		filterCondition.isAppend = false;
		pullUpAction(filterCondition);
		$(this).addClass('active').siblings('nav span').removeClass('active');
	});
	 if (httpURL.getQueryString('audit_status')) {
	 	var index = parseInt(httpURL.getQueryString('audit_status'));
	 	$("nav span").eq(index).trigger('click');
	 }else{
	 	pullUpAction(filterCondition);
	 };
	 
	var activeLayerIndex = null;
	$('#search-btn').click(function() {
		// activeLayerIndex = layer.open({
		//     title: [
		//         '搜索',
		//         'background-color: #F2F2F2;'
		//     ],
		//     content: '<p>订单类型：<select name="" id="" style="border-radius:5px;width:100px;+"><option value="">请选择</option></select></p><p>开始时间：<input type="text" id="date-select" /></p><p>微信号：youdream</p><p>手机号码：18668069999</p>',
		//     btn: '立即查找',
		//     success: function(elem) {
		//         $('.layui-m-layerchild').append('<div class="layer-close">X</div>');
		//         $('.layui-m-layercont').css({ 'padding': '20px 30px' });
		//         $('.layui-m-layerbtn span').css({ 'color': '#fff' });
		//         $('.layui-m-layerchild h3').css({ 'height': '40px', 'line-height': '40px', 'margin': '0' });
		//         $('.layui-m-layercont p').css({ 'text-align': 'left' });
		//         $('#date-select').val('').scroller('destroy').scroller($.extend(opt['date'], {
		//             theme: 'android-ics light',
		//             mode: 'scroller',
		//             display: 'modal',
		//             lang: 'zh'
		//         }));
		//     },
		//     yes: function() {
		//         // alert('ok')
		//     }
		// });
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

		E_float.style.top = (top + (iH - eH) / 2) + 'px';
		E_float.style.left = (left + (iW - eW) / 2) + 'px';
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
});
