var httpURL = require('../../common/http-url.js');
// if(!httpURL.getQueryString('from')){
//     require('../../common/localStorage.js').setItem('login_redirect',location.href+'?from=login');
// }
var $ajax = require('../../common/ajax.js');
var self_tpl = require('../../module/tpl/order-list-tpl.js');
// require('../../common/login-status.js').isLogin(function(){require('../../common/rem.js').remSetting();});
require('../../common/rem.js').remSetting();
//if(httpURL.getQueryString('from') != 'login') {
//  require('../../common/agent-status.js').redirectByStatus();
//}
var api_path_config = require('../../../../tmp_path_config.js');
var data,
    myScroll,
    //pullDownEl, pullDownOffset,
    pullUpEl, pullUpOffset,
    generatedCount = 0;
// function pullDownAction () {
//     $.getJSON('/uploads/rs/200/ptvnx6ur/test.json', function (data, state) {
//     });
// }
var filterCondition = {
    "current_page": "1",
    "id": "007000007",
    "page_size": "20",
    "isAppend": true
};
var member_id = $.fn.cookie('member_id');
var openid = $.fn.cookie('openid');
filterCondition.open_id = openid;
filterCondition.act_id = httpURL.getQueryString('act_id')
 pullUpAction(filterCondition);
function pullUpAction() {
     $ajax.ajaxDlGet(null, filterCondition, function(data){
     	//$.post("/getOrderList.do", function(data) {
        if (data.success) {
        	var netData = null;
        	if(filterCondition.id == "007000007"){
        		if(data.data.totalAmountStr){
        			$(".p_num").html("¥" + data.data.totalAmountStr);
        		}else{
        			$(".p_num").html("¥" + "0");
        		}
            	netData = data.data.datas;
            }else{
            	netData = data.data.datas;
            }
            if(netData.length !=0) {
                data.data.image_prefix = api_path_config.upload_path;
                if(data.data.item_sku_d_t_os && data.data.item_sku_d_t_os.length >= 5) {
                    $('#pullUp').show();
                }
                $('#nomore-data').hide();
                var it = null;
                if(filterCondition.id == "007000007"){
                	data.data.id = "1";
                	it = data.data;
                }else{
                	data.data.id = "2";
                	it = data.data
                }
                if(filterCondition.isAppend) {
                    $('#goods-list').append(doT.template(self_tpl.goodsListTpl)(it));
                } else {
                    $('#goods-list').html(doT.template(self_tpl.goodsListTpl)(it));
                }
            } else {
                if(filterCondition.current_page === "1") {
                    $('#goods-list').html(doT.template(self_tpl.noGoodsTpl)());
                } else {
                	if($("#goods-list .item").length >3){
                   		$('#nomore-data').show();
                	}
                }
                $('#pullUp').hide();
            }
            myScroll.refresh();
            // $('#goods-list').css({"min-height":($('#page1').innerHeight()-$('#nav').innerHeight()-30) + "px"});
        };
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
                filterCondition.current_page = (parseInt(filterCondition.current_page) + 1) + '';
                filterCondition.isAppend = true;
                pullUpAction();
            }
        }
    });
}
$(function() {
    var deliverType = '1';
    //pullUpAction(deliverType);
    // $('nav span').click(function() {
    //     if(!$(this).hasClass('active')) {
    //         $('#nomore-data').hide();
    //         $('#order-list').html('');
    //         filterCondition.current_page = '1';
    //         filterCondition.order_status = $(this).data('tab')+'';
    //         filterCondition.isAppend = false;
    //         pullUpAction(filterCondition);
    //     }
    //     $(this).addClass('active').siblings('nav span').removeClass('active');
    // });
    $('#nav div').on("click",function() {
        if(!$(this).hasClass('active')) {
             $('#nomore-data').hide();
            $('#goods-list').html('');
            filterCondition.current_page = "1";
            filterCondition.id = $(this).attr("data-id");
            if(filterCondition.id == '007000008'){
                delete filterCondition.open_id;
                filterCondition.member_id = member_id;
            }else{
                delete filterCondition.member_id;
                filterCondition.open_id = openid;
            }
            filterCondition.isAppend = false;
            pullUpAction();
        }
        $(this).find('span').addClass('active');
        $(this).siblings().find('span').removeClass('active');
    });
    $("#nav div[data-id='2'] span").trigger("click");
    $("#page1").on("click", "ul li",function(){
    	var num = $(this).attr("data_num");
    	var data_num = "";
    	if(num){
    		data_num = "&num=" + num;
    	}
    	var id = $(this).attr("data_id");
    	if(id){
    		window.location.href = "orderDetails.html" + "?order_id=" + id + data_num;
    	}
    })
});
