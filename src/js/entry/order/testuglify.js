var remSetting = require('../../common/rem.js').remSetting;
var self_tpl = require('../../module/tpl/order-tpl.js');
remSetting();
var data,
    myScroll,
    pullUpEl, pullUpOffset,
    generatedCount = 0;

var filterCondition = {
    pageIndex: 1,
    orderType: $('#orderType option:checked').val(),
    startTime: $('#date-begin').val(),
    endTime: $('#date-end').val()
}


function pullUpAction(filterCondition) {
    $.ajax({
        type: 'POST',
        url: '/getOrderList.do',
        data: filterCondition,
        dataType: 'json',
        success: function(data) {
            $('#order-list').append(doT.template(self_tpl.orderListTpl)(data.data));
            myScroll.refresh();
        },
        error: function(xhr, type) {}
    });
}
pullUpAction(filterCondition);
document.getElementById('page1').addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
// document.addEventListener('DOMContentLoaded', loaded, false);
function loaded() {
    pullUpEl = document.getElementById('pullUp');
    pullUpOffset = pullUpEl.offsetHeight;

    myScroll = new iScroll('page1', {
        vScrollbar: false,
        onRefresh: function() {
            if (pullUpEl.className.match('loading')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
            }
        },
        onScrollMove: function() {
            if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                pullUpEl.className = 'flip';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
            }
        },
        onScrollEnd: function() {
            if (pullUpEl.className.match('flip')) {
                filterCondition.pageIndex++;
                pullUpEl.className = 'loading';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
                pullUpAction(filterCondition);
            }
        }
    });
}
$(function() {
    var hoverSearch = require('../../common/hover-search.js');
    hoverSearch.init(pullUpAction);
    $('nav span').click(function() {
        if(!$(this).hasClass('active')) {
            $('#order-list').html('');
            filterCondition.pageIndex = 1;
            pullUpAction(filterCondition);
        }
        $(this).addClass('active').siblings('nav span').removeClass('active');
    });
});

