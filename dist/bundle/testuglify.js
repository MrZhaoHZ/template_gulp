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

	module.exports = __webpack_require__(92);


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

/***/ 57:
/***/ (function(module, exports) {

	var self_tpl = {
		'orderListTpl': '{{~ it.orderList:item:index }}\
							<li class="item">\
								<div class="top-info">\
									<span class="user-font"></span><span class="user-name">{{= item.member_name}}</span><br>\
									<span class="order-no">{{= item.order_sn}}</span>\
									<div class="send-info">\
										<span class="">\
										{{? item.order_status==30 || item.order_status==29}}待审单\
										{{?? item.order_status==31}}已审单\
										{{?? item.order_status==32}}待发货\
										{{?? item.order_status==34}}已发货\
										{{?? item.order_status==33}}待收货\
										{{?? item.order_status==35}}取消中\
										{{?? item.order_status==36}}已取消\
										{{?? item.order_status==39}}强制取消\
										{{?? item.order_status==37}}已完成\
										{{?? item.order_status==38}}已拒绝\
										{{?}}(\
										{{? item.deliver_type==1}}上级发货\
										{{?? item.deliver_type==2}}总部发货\
										{{?}})\
										</span><br>\
										<span class="order-time">{{= item.order_time}}</span>\
									</div>\
									{{? item.member_id == "872"}}\
										<p style="font-size:12px;color:#999;padding:3px 0;">{{= item.address}}</p>\
									{{?}}\
								</div>\
								<div class="middle-info">\
									<div class="goods">\
										<img src="{{= it.upload_path}}{{= item.sku_image_url}}" alt="">\
										<div class="about">\
											<p class="goods-name">{{= item.sku_name}}</p>\
											<p class="guige">规格：{{= item.sku_specs || ""}}</p>\
										</div>\
										<div class="price">\
											<p>￥{{= item.wechat_price}}</p>\
											<p class="num">x {{= item.count}}</p>\
										</div>\
									</div>\
								</div>\
								{{? item.direct_subor_id}}\
									<div class="bottom-info" style="border-bottom: 1px solid #e8e8e8;">\
										<span class="total">直接下级：{{= item.direct_subor_name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;\
										<span class="total">被扣金额：￥{{= item.deduction_amount}}</span>\
									</div>\
								{{?}}\
								<div class="bottom-info">\
									<p style="text-align: right;font-size: 12px;"><span>共{{= item.count}}件商品 </span><span class="total">合计：￥{{= item.total_amount}}</span> (含运费￥0.00)</p>\
									<div class="btn">\
										{{? it.order_type == 1}}\
											{{? item.order_status == 29}}\
											<span class="cancel" data-id="{{= item.order_id}}">取消</span>\
											{{?}}\
											{{? item.order_status == 33}}\
											<a class="express" data-ordertype="{{= it.order_type}}" data-orderstatus="{{= item.order_status}}" data-orderid="{{= item.order_id}}" data-member_id="{{= item.member_id}}" href="javascript:void(0);">物流</a>\
											<span class="getgoods" data-id="{{= item.order_id}}">收货</span>\
											{{?}}\
											{{? item.order_status == 37}}\
											<a class="express" data-ordertype="{{= it.order_type}}" data-orderstatus="{{= item.order_status}}" data-orderid="{{= item.order_id}}" data-member_id="{{= item.member_id}}" href="javascript:void(0);">物流</a>\
											{{?}}\
											<a class="detail" href="order-detail.html?orderType={{= it.order_type}}&orderId={{= item.order_id}}&order_status={{= item.order_status}}&audit_status={{= it.audit_status}}&member_id={{= item.member_id}}">详情</a>\
										{{?}}\
										{{? it.order_type == 2}}\
											{{? (item.order_status == 30 || item.order_status == 29 || item.order_status == 2) && !item.type}}\
											<span class="nopass" data-id="{{= item.order_id}}" data-nopasstext="拒绝">拒绝</span>\
											<span class="pass" data-id="{{= item.order_id}}" data-nopasstext="通过">通过</span>\
											{{?}}\
											{{? item.order_status == 32 && item.deliver_type != 2}}\
											<a class="send" href="order-detail.html?orderType={{= it.order_type}}&orderId={{= item.order_id}}&&isSend=true&member_id={{= item.member_id}}">发货</a>\
											{{?}}\
											{{? item.order_status == 34}}\
											<a class="express" data-ordertype="{{= it.order_type}}" data-orderstatus="{{= item.order_status}}" data-orderid="{{= item.order_id}}" data-member_id="{{= item.member_id}}" href="javascript:void(0);">物流</a>\
											{{?}}\
											{{? item.order_status == 35}}\
											<span class="pass-cancel" data-id="{{= item.order_id}}" data-nopasstext="同意">同意</span>\
											<span class="nopass-cancel" data-id="{{= item.order_id}}" data-nopasstext="拒绝">拒绝</span>\
											{{?}}\
											{{? item.order_status == 37}}\
											<a class="express" data-ordertype="{{= it.order_type}}" data-orderstatus="{{= item.order_status}}" data-orderid="{{= item.order_id}}" data-member_id="{{= item.member_id}}" href="javascript:void(0);">物流</a>\
											{{?}}\
											<a class="detail" href="order-detail.html?orderType={{= it.order_type}}&orderId={{= item.order_id}}&order_status={{= item.order_status}}&audit_status={{= it.audit_status}}&member_id={{= item.member_id}}">详情</a>\
										{{?}}\
									</div>\
								</div>\
							</li>\
						{{~}}',
		'orderListUpGradingTpl': '{{~ it.orderList:item:index }}\
							<li class="item">\
								<div class="top-info">\
									<span class="user-font"></span><span class="user-name">{{= item.member_name}}</span><br>\
									<span class="order-no">{{= item.order_sn}}</span>\
									<div class="send-info">\
										<span class="">\
										{{? item.order_status==30 || item.order_status==29}}待审单\
										{{?? item.order_status==31}}已审单\
										{{?? item.order_status==32}}待发货\
										{{?? item.order_status==34}}已发货\
										{{?? item.order_status==33}}待收货\
										{{?? item.order_status==35}}取消中\
										{{?? item.order_status==36}}已取消\
										{{?? item.order_status==39}}强制取消\
										{{?? item.order_status==37}}已完成\
										{{?? item.order_status==38}}已拒绝\
										{{?}}(\
										{{? item.deliver_type==1}}上级发货\
										{{?? item.deliver_type==2}}总部发货\
										{{?}})\
										</span><br>\
										<span class="order-time">{{= item.order_time}}</span>\
									</div>\
								</div>\
								<div class="middle-info">\
									<div class="goods">\
										<img src="{{= it.upload_path}}{{= item.sku_image_url}}" alt="">\
										<div class="about">\
											<p class="goods-name">{{= item.sku_name}}</p>\
											<p class="guige">规格：{{= item.sku_specs}}</p>\
										</div>\
										<div class="price">\
											<p>￥{{= item.wechat_price}}</p>\
											<p class="num">x {{= item.count}}</p>\
										</div>\
									</div>\
								</div>\
								{{? item.direct_subor_id}}\
									<div class="bottom-info" style="border-bottom: 1px solid #e8e8e8;">\
										<span class="total">直接下级：{{= item.direct_subor_name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;\
										<span class="total">被扣金额：￥{{= item.deduction_amount}}</span>\
									</div>\
								{{?}}\
								<div class="bottom-info">\
									<span class="total">合计：￥{{= item.total_amount}}</span>\
									<div class="btn">\
										{{? it.order_type == 1}}\
											{{? item.order_status == 29}}\
											<span class="cancel" data-id="{{= item.order_id}}">取消</span>\
											{{?}}\
											{{? item.order_status == 33}}\
											<a class="express" data-ordertype="{{= it.order_type}}" data-orderstatus="{{= item.order_status}}" data-orderid="{{= item.order_id}}" data-member_id="{{= item.member_id}}" href="javascript:void(0);">物流</a>\
											<span class="getgoods" data-id="{{= item.order_id}}">收货</span>\
											{{?}}\
											{{? item.order_status == 37}}\
											<a class="express" data-ordertype="{{= it.order_type}}" data-orderstatus="{{= item.order_status}}" data-orderid="{{= item.order_id}}" data-member_id="{{= item.member_id}}" href="javascript:void(0);">物流</a>\
											{{?}}\
											<a class="detail" href="order-detail.html?orderType={{= it.order_type}}&orderId={{= item.order_id}}&order_status={{= item.order_status}}&audit_status={{= it.audit_status}}&member_id={{= item.member_id}}&from=upGrading">详情</a>\
										{{?}}\
										{{? it.order_type == 2}}\
											{{? (item.order_status == 30 || item.order_status == 29 || item.order_status == 2) && !item.type}}\
											<span style="display: none;" class="nopass" data-id="{{= item.order_id}}" data-nopasstext="拒绝">拒绝</span>\
											<span style="display: none;" class="pass" data-id="{{= item.order_id}}" data-nopasstext="通过">通过</span>\
											{{?}}\
											{{? item.order_status == 32 && item.deliver_type != 2}}\
											<a class="send" href="order-detail.html?orderType={{= it.order_type}}&orderId={{= item.order_id}}&&isSend=true&member_id={{= item.member_id}}">发货</a>\
											{{?}}\
											{{? item.order_status == 34}}\
											<a class="express" data-ordertype="{{= it.order_type}}" data-orderstatus="{{= item.order_status}}" data-orderid="{{= item.order_id}}" data-member_id="{{= item.member_id}}" href="javascript:void(0);">物流</a>\
											{{?}}\
											{{? item.order_status == 35}}\
											<span style="display: none;" class="pass-cancel" data-id="{{= item.order_id}}" data-nopasstext="同意">同意</span>\
											<span style="display: none;" class="nopass-cancel" data-id="{{= item.order_id}}" data-nopasstext="拒绝">拒绝</span>\
											{{?}}\
											{{? item.order_status == 37}}\
											<a class="express" data-ordertype="{{= it.order_type}}" data-orderstatus="{{= item.order_status}}" data-orderid="{{= item.order_id}}" data-member_id="{{= item.member_id}}" href="javascript:void(0);">物流</a>\
											{{?}}\
											<a class="detail" href="order-detail.html?orderType={{= it.order_type}}&orderId={{= item.order_id}}&order_status={{= item.order_status}}&audit_status={{= it.audit_status}}&member_id={{= item.member_id}}&from=upGrading">详情</a>\
										{{?}}\
									</div>\
								</div>\
							</li>\
						{{~}}',
		'goodsListTpl': '<li class="item">\
							<div class="group_info" style=" background-color: #DDEBCE;margin: .1rem .1rem 0.1rem;padding: .3rem .2rem;border-radius: 4px;">{{= it.descri}}</div>\
						</li>\
						{{~ it.group_spu_d_t_o_s:item:index }}\
						 <li class="item" data-id="{{= item.spu_id}}">\
							<div class="middle-info">\
								<div class="goods">\
									<img src="{{= it.image_prefix + item.spu_img_uri}}" alt="">\
									<div class="about">\
											<span class="spu_name" style="display: inline-block;margin: 25px 10px;">{{= item.spu_name}}</span>\
											<div style="top: 28%;" class="btn-area">\
												<a class="place-btn" href="order-confirm.html?id={{= item.spu_id}}&data_img={{= it.image_prefix + item.spu_img_uri}}&deliver_type={{= item.deliver_type}}">下单</a>\
											</div>\
									</div>\
								</div>\
							</div>\
						</li>\
						{{~}}',
		'noGoodsTpl': '<li class="item"">\
						<div class="middle-info">\
							<div class="no-goods">\
								<img src="../../images/nogoods.png" alt="">\
							</div>\
						</div>\
					</li>',
		'noOrdersTpl': '<li class="item"">\
						<div class="middle-info">\
							<div class="no-goods">\
								<img src="../../images/noorders.png" alt="">\
							</div>\
						</div>\
					</li>',
		'orderConfirmTpl': '<div class="ctrl">\
								<img src="{{= it.image_prefix + it.sku_image_url}}" alt="">\
								<div class="about">\
									<p>{{= it.spu_name}}</p>\
									<div class="guige"><span class="guigeleft" data_unit="{{= it.unit}}" style="display: none;">规格：</span>\
									</div>\
								</div>\
								{{ for(var j=0; j< it.property_d_t_o_list.length; j++) { }}\
									<div class="attr_box" {{? j==0}}style="border-top: 1px solid #e8e8e8; margin-top: 42px;"{{?}}>\
										<div class="attr_left" data_id="{{= it.property_d_t_o_list[j].property_id}}">{{= it.property_d_t_o_list[j].property_name }}:</div>\
										<div class="attr_right" data_id="{{= it.property_d_t_o_list[j].property_id}}">\
										</div>\
									</div>\
								{{ } }}\
								<div class="num_box" style="border-top: 1px solid #e8e8e8;">\
									<p class="price">拿货价：<span id="goods-price"></span></p>\
									<div class="btn-area">\
										<div class="whole">\
											<span class="minus gray" id="minus-btn">—</span><span class="value" id="goodsNum">1</span><span class="add" id="add-btn">+</span>\
										</div>\
									</div>\
								</div>\
								<div class="bottom">\
									{{? it.deliver_type == 1}}上级发货{{?}}\
									{{? it.deliver_type == 2}}总部发货{{?}}\
								</div>\
							</div>\
							{{? it.order_des}}\
							<div class="descrip">\
								<p>下单说明</p>\
								<p>{{= it.order_des}}</p>\
							</div>\
							{{?}}\
							<div class="sku_info">\
								{{? it.deliver == "1"}}\
									类型说明：上级发货订单，将由您的上级进行审单，最终由您的上级直接发货到您手中。\
								{{?? it.deliver == "2"}}\
									类型说明：厂家发货订单，将由您的上级和总部进行审单，最终由厂家直接发货到您手中。\
								{{?}}\
							</div>\
							<div class="submit">\
								<span class="jine">订单金额：<i id="totalValue"></i></span>\
								<span class="submit-btn" id="submit-btn">提交订单</span>\
							</div>'
		,'addrTpl': '<span class="logo"></span>\
					<div class="info">\
						<span>{{= it.real_name}}</span>\
						<span>{{= it.mobile}}</span>\
						<span>{{= it.member_address_d_t_o.province}} {{= it.member_address_d_t_o.city}} {{= it.member_address_d_t_o.area}} {{= it.member_address_d_t_o.address}}</span>\
					</div>'
		,'goodsGroupTpl': '{{~ it:item:index}}\
							<span data-id="{{= item.id}}" style="margin: 0 10px;">{{= item.group_name }}</span>\
						{{~}}'
		,'goodsAttrList': '{{~ it:item:index}}\
							<span class="per_attr">{{= item}}</span>\
						{{~}}'
	};
	module.exports = self_tpl;


/***/ }),

/***/ 58:
/***/ (function(module, exports) {

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

/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

	var remSetting = __webpack_require__(7).remSetting;
	var self_tpl = __webpack_require__(57);
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
	    var hoverSearch = __webpack_require__(58);
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



/***/ })

/******/ });