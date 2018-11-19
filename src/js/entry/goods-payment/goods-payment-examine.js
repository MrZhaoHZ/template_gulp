var remSetting = require('../../common/rem.js').remSetting;
var $ajax = require('../../common/ajax.js');
var self_tpl = require('../../module/tpl/goods-payment-tpl.js');
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
    "topup_status": "1",
    "current_page": "1",
    "page_size": "10"
};

function pullUpAction() {
    $ajax.ajaxPost(null, "001000009", pram, 
        function(data){
            if (!data.data.member_account_d_t_o_list && pram.current_page == "1") { // 没有数据
            	pram.current_page = "0";
                $(".no_info").css("display", "block");
            }else if(data.data.member_account_d_t_o_list){ // 有数据的时候
                $(".no_info").css("display", "none");
            };
            if(data.data.member_account_d_t_o_list && data.data.member_account_d_t_o_list.length >=5){
				$("#pullUp").css("display", "block");
			}else{
				$("#pullUp").css("display", "none");
			};
             
             if (!data.data.member_account_d_t_o_list && pram.current_page != "1") {
                $(".pullUpLabel").text("加载完毕！")
                $(".pullUpIcon").css("display", "none");
            }else{
                $(".pullUpLabel").text("上拉加载更多")
                $(".pullUpIcon").css("display", "block");
            }
            if (data.code == "10000") {
                var status = pram.topup_status;
                $('#stuList').append(doT.template(self_tpl.getGoodsPaymentExamineTpl)({ data: data.data.member_account_d_t_o_list, status: status}));
                var current_page = parseInt(pram.current_page) + 1;
                pram.current_page = current_page.toString();
               
            };
			myScroll.refresh();
           
    });
    // $.ajax({
    //     type: 'POST',
    //     url: '/getGoodsPaymentExamine.do',
    //     data: { pram: pram },
    //     dataType: 'json',
    //     success: function(data) {
    //         $('#stuList').append(doT.template(self_tpl.getGoodsPaymentExamineTpl)(data.data));
    //          myScroll.refresh();
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
    // var tpl = '{{~ it:item:index }}\
    //             <option value="{{= item.id}}">{{= item.category_name}}</option>\
    //       {{~}}';
    // function cate() {
    //     $ajax.ajaxPost('/commodity/category/list.do',{},function(data){
    //         if (data.code == "10000") {
    //             $('#goods_cate').append(doT.template(tpl)(data.data.item_category_d_t_os));
    //         };
    //     });
    // };
    // cate();
    $('nav span').click(function() {
        pram.current_page = "1";
        if($(this).attr("data_val") != 1){
            $(".preding").css("display", "none");
        };
        if($(this).attr("data_val") != 3){
            $(".cancel").css("display", "block");
        };
        $("#stuList li").remove();
        pram.topup_status = $(this).attr("data_val");
        $(this).addClass('active').siblings('nav span').removeClass('active');
        pullUpAction($(this).attr("data_val"));
    });

    pullUpAction();

    var activeLayerIndex = null;
    $('.content').on('click', '.refuse',function() {
        refusePram.topup_id = $(this).attr("data_id");
        refusePram.member_id = $(this).attr("member_id");
        $('.layer-mask').remove();
        $(".text").val("");
        $('body').append('<div id="layer-mask" class="layer-mask"></div>');
        $('.layer-mask').show();
        $('#search-layer-refuse').show();
        var bodyRect = document.body.getBoundingClientRect();
        var E_float = document.getElementById('search-layer-refuse');
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

        E_float.style.top = (top + (iH - eH) / 2) + 'px';
        E_float.style.left = (left + (iW - eW) / 2) + 'px';
    });

    $('body').delegate('.search-layer-close',  require('../../common/event.js').getEventType(), function(e) {
    	e.preventDefault();
        $('.layer-mask').hide();
        $('#search-layer').hide();
        $('#search-layer-refuse').hide();
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

    var refusePram = {
        biz_desc: "",
        member_id: "",
        topup_id: ""
    }
//  $("#confirm").on("click", function(){
//      var length = $(".text").val().length;
//      if (length > 0) {
//          $('.layer-mask').hide();
//          $('.search-layer').hide();
//          refusePram.biz_desc = $(".text").val();
//          $ajax.ajaxPost(null, "001000011", refusePram, 
//              function(data){
//                  if (data.code == "10000") {
//                      pram.topup_status = 3;
//                      $("nav span[data_val=" +pram.topup_status + "]").trigger("click");
//                  };
//          });
//      }else{
//          layer.open("拒绝原因不能为空！");
//      };
//  });
    $('#confirm').click(function(e) {
		require('../../common/btn-trigger.js').btnCtrl(e, function(target){
			var length = $(".text").val().length;
	        if (length > 0) {
	            $('.layer-mask').hide();
	            $('.search-layer').hide();
	            refusePram.biz_desc = $(".text").val();
	            $ajax.ajaxPost(null, "001000011", refusePram, 
	                function(data){
	                    if (data.code == "10000") {
	                        pram.topup_status = 3;
	                        $("nav span[data_val=" +pram.topup_status + "]").trigger("click");
	                    };
	            });
	        }else{
	            myLayer.open("拒绝原因不能为空！");
	        };
		});
	});
    $("#search").on("click", function(){
       pram.topup_status = $("#setection").val();
       pram.start_time = $("#date-begin").val();
       pram.end_time = $("#date-end").val();
       $('.layer-mask').hide();
        $('#search-layer').hide();
        $("nav span").eq(pram.topup_status).trigger("click");
       pullUpAction();
    });
    var agreePram = {
        biz_desc: "",
        member_id: "",
        topup_id: ""
    };
//  $(".content").on("click", ".agree", function(){
//      // agreePram.menber = $(this).attr("");
//      // agreePram.topup_id = $(this).attr("data_id");
//      agreePram.biz_desc = "";
//      agreePram.topup_id = $(this).attr("data_id");
//      agreePram.member_id = $(this).attr("member_id");
//      $ajax.ajaxPost(null, "001000008", agreePram, 
//          function(data){
//              if (data.code == "10000") {
//                 pram.topup_status = 2;
//                 $("nav span[data_val=" +pram.topup_status + "]").trigger("click");
//              };
//      });
//  });
    $('body').on('click','.agree',function(e){
		require('../../common/btn-trigger.js').btnCtrl(e, function(target){
			agreePram.biz_desc = "";
	        agreePram.topup_id = target.attr("data_id");
	        agreePram.member_id = target.attr("member_id");
	        layer.open({
			    type: 2,
			    shadeClose: false,
			    content: '处理中'
			  });
	        $ajax.ajaxPostTimeoutHandle(null, "001000008", agreePram, 
	            function(data){
	            	layer.closeAll();
	                if (data.code == "10000") {
	                	myLayer.open("提交成功！");
						setTimeout(function () {
                        	pram.topup_status = 2;
	                   		$("nav span[data_val=" +pram.topup_status + "]").trigger("click");
					    }, 1000);
	               }else{
	                	if(data.msg){
							myLayer.openLongTime(data.msg.substring(0,60));
						}else{
							myLayer.openLongTime(data.substring(0,60));
						};
	                };
    	        },
                function(){
                    myLayer.open("请求超时！");
                }
            );
		})
	});
    $("#home-btn").on("click", function(){
        window.location.href = "";
    })
});
