var httpURL = require('../common/http-url.js');
if (!httpURL.getQueryString('from')) {
    require('../common/localStorage.js').setItem('login_redirect', location.href + '?from=login');
}
require('../common/rem.js').remSetting();
var layer = require('../common/layer.js');
var $ajax = require('../common/ajax.js');
var self_tpl = require('../module/tpl/activity-vedio-tpl.js');
// require('../../common/login-status.js').isLogin(function(){require('../../common/rem.js').remSetting();});
require('../common/rem.js').remSetting();
var api_path_config = require('../../../tmp_path_config.js');
var data,
    myScroll,
    //pullDownEl, pullDownOffset,
    pullUpEl, pullUpOffset,
    generatedCount = 0;
// function pullDownAction () {
//     $.getJSON('/uploads/rs/200/ptvnx6ur/test.json', function (data, state) {
//     });
// }
var openId = $.fn.cookie('openid');
function randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}
if (!openId) {
    var _openid = randomString();
    $.fn.cookie('openid', _openid);
    openId = _openid;
}
$("body").on("click",'.hertNmu',function () {
    var _this = $(this);
    var _val = _this.siblings(".hert").text(),
    // _openid = $.cookie('openid') || "",
    // _openid = 'ggdcdjdssdjjoohddcccsss',
    _id = _this.parents(".vedioBox").attr("dataId"),
    _param = {
        open_id:openId,
        picture_id:_id
    };
    console.log(_val)
    // $ajax.ajaxPost('/wechat-web/like/update.do', {}, function(data) {
    $ajax.ajaxPostWXDL("/gate.do","007000019", _param, function(data) {
        var data1 = data;
        if(data1.success){
            var valNew = _val -0 + 1 + '';
            _this.siblings().text(valNew);
            layer.open('点赞'+data1.msg)
        }else{
            layer.open(data1.msg)
        }
    });
})

// var filterCondition = {
//     "current_page": "1",
//     "page_size": "4"
// }
// var filterCondition = {
//     "current_page": "1",
//     "page_size": "4"
// }
pullUpAction();
// pullUpAction(filterCondition);
function pullUpAction() {
    $ajax.ajaxPostWXDL("/gate.do", "007000018", {}, function (data) {
        if (data.success) {
            if (data.data) {
                data.data.image_prefix = 'https://imgtest-yyzws1.oss-cn-hangzhou.aliyuncs.com/xihu/';
                data.data.url = 'activity-imageInfor.html?id=';
                // if (data.data.item_sku_d_t_os && data.data.item_sku_d_t_os.length >= 5) {
                //     $('#pullUp').show();
                // }
                // $('#nomore-data').hide();
                $('#goods-list').append(doT.template(self_tpl.imageList)(data.data));
                
            } 
            // else {
            //     if (filterCondition.current_page === "1") {
            //         $('#goods-list').html(doT.template(self_tpl.noGoodsTpl)());
            //     } else {
            //         $('#nomore-data').show();
            //     }
            //     $('#pullUp').hide();
            // }
            // myScroll.refresh();
            // $('#goods-list').css({"min-height":($('#page1').innerHeight()-$('#nav').innerHeight()-30) + "px"});
        };
    });
};

//初始化绑定iScroll控件
// document.getElementById('page1').addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
// // document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
// document.addEventListener('DOMContentLoaded', loaded, false);

// function loaded() {
//     // pullDownEl = document.getElementById('pullDown');
//     // pullDownOffset = pullDownEl.offsetHeight;
//     pullUpEl = document.getElementById('pullUp');
//     pullUpOffset = pullUpEl.offsetHeight;

//     /**
//      * 初始化iScroll控件
//      */
//     myScroll = new iScroll('page1', {
//         vScrollbar: false,
//         //topOffset : pullDownOffset,
//         onRefresh: function () {
//             // if (pullDownEl.className.match('loading')) {
//             //     pullDownEl.className = '';
//             //     pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
//             // } else
//             if (pullUpEl.className.match('loading')) {
//                 pullUpEl.className = '';
//                 pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
//             }
//         },
//         onScrollMove: function () {
//             // if (this.y > 5 && !pullDownEl.className.match('flip')) {
//             //     pullDownEl.className = 'flip';
//             //     pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
//             //     this.minScrollY = 0;
//             // } else
//             if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
//                 pullUpEl.className = 'flip';
//                 pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
//             }
//         },
//         onScrollEnd: function () {
//             // if (pullDownEl.className.match('flip')) {
//             //     pullDownEl.className = 'loading';
//             //     pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
//             //     pullDownAction();
//             // } else
//             if (pullUpEl.className.match('flip')) {
//                 pullUpEl.className = 'loading';
//                 pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
//                 filterCondition.current_page = (parseInt(filterCondition.current_page) + 1) + '';
//                 filterCondition.isAppend = true;
//                 pullUpAction();
//             }
//         }
//     });
// }
