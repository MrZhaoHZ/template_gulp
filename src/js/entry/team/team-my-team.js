var remSetting = require('../../common/rem.js').remSetting;
var self_tpl = require('../../module/tpl/team-tpl.js');
var $ajax = require('../../common/ajax.js');
var myLayer = require('../../common/layer.js');
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
    current_page: "1",
    page_size: "10",
    can_load_data: true,
    real_name: "",
    mobile: ""
}
var flag = 0;
function pullUpAction(){
    $ajax.ajaxPost(null, "003000018", pram, 
        function(data){
        	
        	pram.can_load_data = true;
        	if(flag == 0){
        		 if (!data.data && pram.current_page == "1") {
	                $("#head, .content").css("display", "none");
	                $(".prompt").css("display", "block");
	                return;
	            };
        	};
            myScroll.refresh(); 
            if (data.code == "10000" && data.data) {
                if (flag == 1 && data.data) {
                	 $('#stuList').append(doT.template(self_tpl.myTeamListLiTpl)(data.data.datas));
                } else if(flag == 0 && data.data){
                   $('#stuList').html(doT.template(self_tpl.myTeamListLiTpl)(data.data.datas));
                   if(data.data.datas.length <5){
                   	$("#pullUp").css("display", "none");
                   }
                   flag = 1;
                };
            };
            if(!data.data){
        		myLayer.open('暂无信息！');
        	}
            if (!data.data && pram.current_page != "1") {
                $(".pullUpLabel").text("加载完毕！")
                $(".pullUpIcon").css("display", "none");
                $(".first").css("display", "block");

            }else{
                $(".pullUpLabel").text("上拉加载更多")
                $(".pullUpIcon").css("display", "block");
                $(".first").css("display", "block");
            }
        });
    // $.post('/getMyTeamLiList.do', {   }, 
    //     function(data){
    //         $('#stuList').append(doT.template(self_tpl.myTeamListLiTpl)(data.data));
    //         myScroll.refresh(); 
    //         setTimeout(function() {
    //            myScroll.refresh();
               
    //         }, 600);
            
    // });
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
                if(pram.can_load_data){
                	var current_page = parseInt(pram.current_page) + 1;
            		pram.current_page = current_page.toString();
                	pullUpAction();
                	pram.can_load_data = false;
                };
            }
        }
    });
}
$(function() {
	//$("#search-layer").css("top", "");
    $('nav span').click(function() {
        $(this).addClass('active').siblings('nav span').removeClass('active');
        pram.current_page = "1";
    });
    
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

        //E_float.style.top = (top + (iH - eH) / 2) + 'px';
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

    getMyTeamList();

   // $("#page1").css("margin-top", "190px");
    
    //获取元素的纵坐标 
    function getTop(e){ 
        var offset=e.offsetTop; 
        if(e.offsetParent!=null) offset+=getTop(e.offsetParent); 
        return offset; 
    } 
    function getMyTeamList(pagenumber){
        $ajax.ajaxPost(null, "003000007", {}, 
            function(data){
                if (data.code == "10000") {
                	if(flag == 0){
                        if(data.data && data.data.datas && data.data.datas.length){
                             var arr = [];
                            for(var i=0; i< data.data.datas.length; i++){
                                arr.push(data.data.datas[i].count);
                            };
                            var length = Math.max.apply(null, arr);
                            $('.head').append(doT.template(self_tpl.myTeamListTpl)({data: data.data.datas, length: length, total_count: data.data.total_count}));
                        }
                	}
                    pullUpAction(flag);
                    layer.closeAll();
                    if (flag ==0) {
                        var height  = $("#head").height() + $(".first").height() + 5;
                        $(".first").css("margin-top", height + "px");
                        $("#page1").css("margin-top", height + $(".first").height() + "px");
                    };
                };
        });
        // $.post('/getMyTeamList.do', {   },  + 5
        //     function(data){
        //         $('#head').html(doT.template(self_tpl.myTeamListTpl)({data: data.data, length:data.length}));
        //         layer.closeAll();
        // });
    };
	 $(".search-now").on("click", function(){
	 	pram.mobile = $("#mobile").val().trim();
	 	if(pram.mobile && !(/^1\d{10}$/.test(pram.mobile))){
	 			$("#mobile").val("");
	 			myLayer.open("手机号输入不合法！");
	 			return;
	 	};
        $("#stuList li").remove();
        pram.real_name = $("#real_name").val().trim();
        $('.layer-mask').hide();
        $('#search-layer').hide();
        pullUpAction();
    })
    $("#home").on("click", function(){
        window.location.href = "../center.html?from=login";
    });
    $("#sync").on("click", function(){
    	window.location.href = "team-my-team.html";
//  	$(".p_row, .total").remove();
//  	flag = 0;
//  	pram.current_page = "1";
//       layer.open({
//          type: 2
//          ,content: '加载中',
//          shadeClose: false
//        });
//      getMyTeamList();
    });
});
