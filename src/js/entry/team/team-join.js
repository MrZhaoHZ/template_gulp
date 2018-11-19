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
//0.未审核1.新上级审核通过2.新上级审核拒绝3.平台审核通过4.平台审核拒绝5.原上级审核通过6.原上级审核拒绝7.用户自己取消
var pram = {
    audit_status: "",
    current_page: "1",
    page_size: "10"
};
var dictionary = [ "", "审核中", "已拒绝", "审核成功","已拒绝", "原上级审核通过", "原上级审核拒绝", "已取消", "待上级审核", "待平台审核"];
function pullUpAction() {
    $ajax.ajaxPost(null, "003000010", pram, 
        function(data){
            if (data.success && data.data) {
                $(".no_info").css("display", "none");
                $("#pullUp").css("display", "block");
                $('#stuList').append(doT.template(self_tpl.myTeamJoin)({ data:data.data.datas, dictionary: dictionary, audit_status: pram.audit_status}));
                var current_page = parseInt(pram.current_page) + 1;
                pram.current_page = current_page.toString();
                pram.current++;
//              if ($("#stuList li").length == 0) {
//                  $(".prompt").css("display", "block");
//              }else{
//                  $(".prompt").css("display", "none");
//              };
            };
            if (!data.data && pram.current_page == "1") {// 没有一条数据
                $("#pullUp").css("display", "none");
                $(".no_info").css("display", "block");
            }
             if (data.data && data.data.datas.length >=5) {// 没有一条数据
                $("#pullUp").css("display", "block");
			}else{
				$("#pullUp").css("display", "none");
			};
           myScroll.refresh();
            if (!data.data && pram.current_page != "1") {
                $(".pullUpLabel").text("加载完毕！")
                $(".pullUpIcon").css("display", "none");
            }else{
                $(".pullUpLabel").text("上拉加载更多")
                $(".pullUpIcon").css("display", "block");
            }
        });
    // $.ajax({
    //     type: 'POST',
    //     url: '/getMyTeamJoin.do',
    //     data: { pram: pram },
    //     dataType: 'json',
    //     success: function(data) {
    //         $('#stuList').append(doT.template(self_tpl.myTeamJoin)(data.data));
    //         myScroll.refresh();
    //         pram.current++;
    //     },
    //     error: function(xhr, type) {}
    // });
}


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
   returnPage.returnPageWithUrl("../center.html?from=login");
    pram.audit_status = httpURL.getQueryString('audit_status');
    //$("nav span").eq(pram.audit_status).addClass('active').siblings('nav span').removeClass('active');
    $('nav span').click(function() {
        $(this).addClass('active').siblings('nav span').removeClass('active');
    });
    $("nav span").eq(pram.audit_status).trigger("click");  
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

    pullUpAction(1);
   
    $("nav span").on("click", function(){
        $("#stuList li").remove();
        var index = $(this).attr("data_val");
        pram.audit_status = index;
        pram.current_page = "1";
        pullUpAction(1);
    });
});
