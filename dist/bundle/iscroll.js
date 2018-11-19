/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(53);


/***/ }),

/***/ 7:
/***/ (function(module, exports) {

	function remSetting(isHd) {
	    var deviceWidth = document.documentElement.clientWidth;
	    if (deviceWidth > 750) deviceWidth = 750;
	    document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
	    if(!isHd){
	    	$('.Hd').removeClass('Hd');
	    }
	}

	exports.remSetting = remSetting;


/***/ }),

/***/ 53:
/***/ (function(module, exports, __webpack_require__) {

	var remSetting = __webpack_require__(7).remSetting;
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

	function pullUpAction() {
	    $.ajax({
	        type: 'POST',
	        url: '/iscrollMockData.do',
	        data: { userId: '' },
	        dataType: 'json',
	        success: function(data) {
	            var tempHTML = '';
	            for (var i = 0; i < 20; i++) {
	                tempHTML += '<li>' +
	                    '    <div class="name-per">' +
	                    '        <span class="name">第一个人</span>' +
	                    '        <span class="per">80%</span>' +
	                    '        <span class="toggle"></span>' +
	                    '    </div>' +
	                    '    <ul class="details">' +
	                    '        <li>' +
	                    '            <i>已学科目：</i>' +
	                    '            <span class="course">数学，语文，英语</span>' +
	                    '        </li>' +
	                    '        <li>' +
	                    '            <i>总课时：</i>' +
	                    '            <span class="course-num">50</span>' +
	                    '        </li>' +
	                    '        <li>' +
	                    '            <i>课程时长（分）：</i>' +
	                    '            <span class="course-time">230</span>' +
	                    '        </li>' +
	                    '        <li>' +
	                    '            <i>已观看数：</i>' +
	                    '            <span class="my-num">5</span>' +
	                    '        </li>' +
	                    '        <li>' +
	                    '            <i>完成度：</i>' +
	                    '            <span class="complete">数学，语文，英语</span>' +
	                    '        </li>' +
	                    '        <li>' +
	                    '            <i>学习时长：</i>' +
	                    '            <span class="my-time">1小时2分钟29秒</span>' +
	                    '        </li>' +
	                    '    </ul>' +
	                    '</li>'
	            }
	            setTimeout(function() {
	                $('#stuList').append(tempHTML);
	                myScroll.refresh();
	                $('.name-per').unbind('tap');
	                $('.name-per').tap(function() {
	                    //$(this).siblings('.name-per').children('.details').toggle();
	                    $(this).siblings('.details').toggle();
	                    $(this).children('.toggle').toggleClass('toggle-active');
	                });
	            }, 600);
	        },
	        error: function(xhr, type) {}
	    });
	}

	//初始化绑定iScroll控件
	document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
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

	    $('nav li').click(function() {
	        $(this).addClass('nav-active').siblings('nav li').removeClass('nav-active');
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


/***/ })

/******/ });