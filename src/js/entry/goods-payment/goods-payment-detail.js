var remSetting = require('../../common/rem.js').remSetting;
var self_tpl = require('../../module/tpl/goods-payment-tpl.js');
var $ajax = require('../../common/ajax.js');
var httpUrl = require('../../common/http-url.js');
var api_path_config = require('../../../../tmp_path_config.js');
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

var pram = {
    "current_page": "1",
    "page_size": "10",
    "order_status": "",
    "start_date": "",
    "end_date": ""
}

function pullUpAction() {
	layer.open({type: 2});
     $ajax.ajaxPost(null, "001000005", pram, 
        function(data){
        	layer.closeAll();
        	 myScroll.refresh();
             if (!data.data && pram.current_page != "1") {
                $(".pullUpLabel").text("加载完毕！")
                $(".pullUpIcon").css("display", "none");
            }else{
                $(".pullUpLabel").text("上拉加载更多")
                $(".pullUpIcon").css("display", "block");
            };
            if (data.code == "10000" && data.data) {
                $('#stuList').append(doT.template(self_tpl.getGoodsPaymentDetailTpl)({data: data.data.datas, path: api_path_config.upload_path}));
            };
            $(".no_info").css("display", "none");
            if (!data.data || !data.data.datas) { // 没有数据
            	// pram.current_page = "0";
				if(pram.current_page == "1"){
					$("#pullUp").css("display", "none");
					$(".no_info").css("display", "block");
				}
            }else{
	            var current_page = parseInt(pram.current_page) + 1;
	             pram.current_page = current_page.toString();
	        }
            if(!data.data){
            	$("#pullUp").css("display", "none");
            };
            if( data.data &&data.data.datas && data.data.datas.length >=5){
				$("#pullUp").css("display", "block");
			}else{
				$("#pullUp").css("display", "none");
			};
//          if( pram.current_page != "1" && !data.data){
//				$("#pullUp").css("display", "block");
//			}else{
//				$("#pullUp").css("display", "none");
//			};
             //var current_page = parseInt(pram.current_page) + 1;
            // pram.current_page = current_page.toString();
    });
};

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
                pullUpAction();
            }
        }
    });
}
$(function() {
    pram.order_status = httpUrl.getQueryString('order_status');

    var tpl = '<option data_val="">全部</option>\
                <option data_val="1" >已下单</option>\
                <option data_val="2">已取消</option>\
                <option data_val="4">已审单</option>\
                <option data_val="5">取消审单</option>\
                <option data_val="3">充值</option>\
                <option data_val="6">扣款</option>';
    $('#setection').append(doT.template(tpl)());

    $("#stuList").on("click", "li", function(){
       
        var pramDetail = "";
        if ($(this).attr("order_id") != "-") {
            pramDetail = "orderId=" + $(this).attr("order_id");
        }else{
            return;
        };
        if ($(this).attr("order_status") != "-") {
            pramDetail = pramDetail + "&order_status=" + $(this).attr("order_status");
        }else{
            return;
        };
        if ($(this).attr("order_type") != "-") {
            pramDetail = pramDetail + "&orderType=" + $(this).attr("order_type");
        }else{
            return;
        };
        if(pramDetail){
            window.location.href = "../order/order-detail.html?" + pramDetail;
        };

    });
    //cate();

    // $ajax.ajaxPost(null, "001000005", pram, 
    //     function(data){
    //         if (data.code == "10000") {
    //             $('#stuList').append(doT.template(self_tpl.getGoodsPaymentDetailTpl)(data.data));
    //             myScroll.refresh();
    //             var current_page = parseInt(pram.current_page) + 1;
    //             pram.current_page = current_page.toString();
    //         };
    // }); 
    $('nav span').click(function() {
        $("#stuList li").remove();
       pram = {
            "current_page": "1",
            "page_size": "10",
            "order_status": "",
            "start_date": "",
            "end_date": ""
        };
        $(this).addClass('active').siblings('nav span').removeClass('active');
        pram.order_status = $(this).attr("data_val");
        pullUpAction();
    });
    $("nav span[data_val=" +pram.order_status + "]").trigger("click");
    var activeLayerIndex = null;
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
    $('body').delegate('.search-layer-close',  require('../../common/event.js').getEventType(), function(e) {
    	e.preventDefault();
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

    $("#home-btn").on("click", function(){
        window.location.href = "../center.html?from=login";
    });
    function formatTime(timeStr) {
        if(timeStr === "") {
            return "";
        }
        var temp = timeStr.split('/');
        return temp[2] + '-' + temp[1] + '-' + temp[0];
    };
    $(".search-now").on("click", function(){
         $("#stuList li").remove();
        pram = {
            "current_page": "1",
            "page_size": "10",
            "order_status": "",
            "start_date": "",
            "end_date": ""
        };
        pram.order_status = $("#setection option:selected").attr("data_val");
        if(formatTime($("#date-begin").val())){
        	pram.start_date = formatTime($("#date-begin").val()) + " 00:00:00";
        };
        if(formatTime($("#date-end").val())){
        	pram.end_date = formatTime($("#date-end").val()) + " 00:00:00";
        };
        $('.layer-mask').hide();
        $('#search-layer').hide();
        //$("nav span[data_val=" +pram.order_status + "]").trigger("click");
        $("nav span[data_val=" +pram.order_status + "]").addClass('active').siblings('nav span').removeClass('active');
        //pram.order_status = $(this).attr("data_val");
        pullUpAction();
    })
});
