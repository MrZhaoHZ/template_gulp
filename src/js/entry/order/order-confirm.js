var $ajax = require('../../common/ajax.js');
var commonEvent = require('../../common/event.js');
var clickType = commonEvent.getEventType;
var httpURL = require('../../common/http-url.js');
var self_tpl = require('../../module/tpl/order-tpl.js');
var layer = require('../../common/layer.js');
var remSetting = require('../../common/rem.js').remSetting;
var api_path_config = require('../../../../tmp_path_config.js');
var specContent = null;
$(function() {
	var finalSkuId = null;
	remSetting();
	var goodsId = httpURL.getQueryString('id');
	var data_img = httpURL.getQueryString('data_img');
	var spuImgUrl = null;
	var orderConfirmInfo = null;
	var currentClickAttr = null; // 表示当前点击的属性dom
	//个人信息
	$ajax.ajaxPost(null, '004000002', {}, function(data) {
		if(data.success){
			$('#address').html(doT.template(self_tpl.addrTpl)(data.data.memberDTO));
		}
	});
	//下单信息
	var skuInfo = null;
	getOrderDetail("2");
	function getOrderDetail(deliver){
		skuInfo = null;
		$ajax.ajaxPost(null, '002000001', {spu_id: goodsId, deliver_type: deliver}, function(data) {
			if(data.success){
				$(".ctrl, .submit, .sku_info").remove();
				if(!data.data || !data.data.property_d_t_o_list || data.data.property_d_t_o_list.length<0){
					var msg = deliver==1? "没有上级发货！": "没有厂家发货！"
					layer.open(msg);
					
					return;
				};
				var unitInfo = {
					property_id:"2",
					property_name:"单位"
				};
				data.data.property_d_t_o_list.push(unitInfo);
				for(var j=0;j<data.data.item_sku_d_t_o_list.length; j++){
					data.data.item_sku_d_t_o_list[j].reserve0 = data.data.item_sku_d_t_o_list[j].reserve9;
				};
				skuInfo = data.data.item_sku_d_t_o_list;
				orderConfirmInfo = data.data;
				data.data.image_prefix = api_path_config.upload_path;
				data.data.deliver = deliver;
				$('body').append(doT.template(self_tpl.orderConfirmTpl)(data.data));
				$(".ctrl img").attr("data_id", data.data.id);
				$(".ctrl img").attr("src", data_img);
				$("#avaliable_amount").text(data.data.avaliable_amount);
				var attrNameDoms = $(".ctrl .attr_left");
				var attrValueDoms = $(".ctrl .attr_right");
				for(var i=0; i<attrNameDoms.length; i++){
					var currentNameDom = attrNameDoms.eq(i);
					var attrValueDom = attrValueDoms.eq(i); // 要写入的属性dom
					var id = parseInt(currentNameDom.attr("data_id")) -2;// id -2  是为了获取对应的属性值的编号  （相差2）
					if(id == 0){ // 专门为单位的展示做处理
						id = 9;
					};
					attrValueDom.html(doT.template(self_tpl.goodsAttrList)(data.data["reserve" + id + "_list"]));
				};
				if($('#avaliable_amount').html() === '0.00'){
					$('#submit-btn').addClass('gray');
				};
				spuImgUrl = $(".ctrl img").attr("src");
				specContent = "规格：";
			}
		});
	};
	$('body').on(require('../../common/event.js').getEventType(),'#minus-btn',function(){
		if(parseInt($('#goodsNum').html()) < 2) {
			return;
		}
		$('#goodsNum').html((parseInt($('#goodsNum').html())-1));
		if(parseInt($('#goodsNum').html()) < 2) {
			$('#minus-btn').addClass('gray');
		};
		var perPrice = parseInt($('#goodsNum').html())*100;
		var tmp = perPrice*parseFloat($('#goods-price').html())*0.01.toFixed(2);
		if(!isNaN(tmp)){
			$('#totalValue').html(tmp);
		}else{
			$('#totalValue').html("");
		}
	});
	var attrPram = {};
	var attrArr = []; // 存放所有的有效选择的属性
 	var skuArr = []; // 存放所有匹配到的sku
 	$('body').on(require('../../common/event.js').getEventType(),'.attr_box .per_attr',attrClickFun)
	//$("body").on("click", ".attr_box .per_attr", attrClickFun);
 	function attrClickFun(){
 		attrArr = [];
 		skuArr = [];
 		
 		currentClickAttr = $(this);
// 		if(currentClickAttr.attr("data_is_click") == 1){ // 移除事件就是通过data_is_click属性的值来判断的 只有 == 1的时候才移除事件
// 			return;
// 		}
 		$(this).addClass('spanActive').siblings('span').removeClass('spanActive');
 		// currentClickAttr 就是当前点击的属性span
 		if(currentClickAttr.hasClass("disClick")){ // 如果点击的时候灰色的属性，则清除除当前点击以外的所有已经选择的属性
 			$(".per_attr").removeClass("disClick").removeClass("spanActive");
 			currentClickAttr.addClass("spanActive")
 		};
 		getAllSelectedAttr();
 		// 吧每行对应的选中的属性去掉
 		var attrDomLen = $(".attr_right").length;
 		for(var i=0;i< attrDomLen; i++){
 			var attrArrTmp = attrArr.slice(0);
 			var numId = parseInt($(".attr_right").eq(i).attr("data_id")) -2 ;
 			for(var j=0;j<attrArrTmp.length;j++){
 				if(attrArrTmp[j].index == i){
 					if(attrArrTmp[j].name == "reserve" + numId ){
						attrArrTmp.splice(j,1);
 					};
 				}
 			}
 			checkSkuByAttr(attrArrTmp, $(".attr_right").eq(i).attr("data_id"), i); // i代表的是设置第i行的数据
 		};
 		//checkSkuByAttr(attrArr);
 		//collectData();
 	}
 	// 根据一个活多个属性值判断 选择出来所有的sku商品添加进入skusArr数组中
 	var skusArr = [];
 	function getAllSelectedAttr(){
 		attrArr = [];
 		var clickedPerAttr = $(".attr_box");
 		for(var item=0; item<clickedPerAttr.length; item++){ // 获取了所有已经选中的属性值
 			if(clickedPerAttr.eq(item).find(".spanActive").text()){
 				var num = parseInt($(".attr_right").eq(item).attr("data_id")) -2;
 				var tmp = {};
 				tmp.name = "reserve" + num;
 				tmp.val = clickedPerAttr.eq(item).find(".spanActive").text();
 				tmp.index = item;
 				attrArr.push(tmp);
 			};
 		};
 		if(attrArr.length != $(".attr_right").length ){
 			$('#totalValue').html("");
			$("#goods-price").html("");
 		}
 	}
 	function checkSkuByAttr(attrArrTmp , num, index){
 		checkSkuByAllAttr(attrArrTmp)
 		var skusArrTmp = skusArr.slice(0)
 		combinationAttr(skusArrTmp, parseInt(num), index);
 	};
 	function checkSkuByAllAttr(attrArrTmp){
 		skusArr = [];
 		var flag = 1;
 		//skuInfo 是所有的sku商品信息
 		for(var i=0; i<skuInfo.length;i++){
 			flag = 1;
 			for(var j=0;j<attrArrTmp.length; j++){
 				if(attrArrTmp[j].val != skuInfo[i][attrArrTmp[j].name]){
 					flag = 0; // 不匹配
 					break;
 					//skusArr.push(skuInfo[i]);
 				};
 			};
 			if(flag == 1){
 				skusArr.push(skuInfo[i]);
 			};
 		}; // 现在已经选择出了所选择属性对应的所有的sku商品 就装在skusArr数组中。
 	};
 	function selectedOverAndSetSkuInfo(){ // 已经选择完所有的属性后设置对应sku的信息。
 		if(attrArr.length == $(".attr_right").length ){ // 已经选择出来
 			var data = skusArr[0];
 			if(!data.sku_price){
 				layer.open("本商品未设置价格！");
 			}
 			$("#goods-price").html(data.sku_price);
			$(".ctrl img").attr("src", api_path_config.upload_path + data.image_uri);
			sku_id = data.sku_id + "";
			finalSkuId = data.id;
			$(".ctrl .guigeleft").html("规格：" + data.unit);
			var tmp = parseInt($('#goodsNum').html())*parseFloat($('#goods-price').html()).toFixed(2);
			if(!isNaN(tmp)){
				$('#totalValue').html(tmp);
				$("#submit-btn").removeClass("gray");
			}else{
				$('#totalValue').html();
				$("#goods-price").html();
			};
 		}else{
 			
 			$(".ctrl .guigeleft").html(specContent);
 			$(".ctrl img").attr("src", spuImgUrl);
 			finalSkuId = null;
 			$("#goods-price").html("");
 			$('#totalValue').html(tmp);
			$("#submit-btn").addClass("gray");
 		};
 	}
 	var dataArrRepeat = {};
 	// 根据已经选择的属性从对应的sku中找到了所有对应的属性  并且去重。是要设置置灰的属性信息
 	function combinationAttr(skusArrTmp, num, index){
 		// skusArrTmp = []; 所有商品的sku 
 		// attrArr = []; // 存放所有的有效选择的属性
 		// 判断 只有在所有sku的数量等于1的时候 并且已经选择的属性的个数等于总属性的个数的时候就标志着已经选择完毕，可以显示价格个sku图片
 		
 		dataArrRepeat = {};
 		for(var i=1;i<=9; i++){
 			for(var j=0; j<skusArrTmp.length; j++){
 				var name = "reserve" + i;
 				if(skusArrTmp[j][name]){
 					if(!dataArrRepeat[name]){
 						dataArrRepeat[name] = [];
 					};
 					dataArrRepeat[name].push(skusArrTmp[j][name]);
 				}
 			};
 		}; // 已经处理完数据，所有的可用的属性数组。 
 		
 		$.each(dataArrRepeat,function(index,item){ // 去重并且赋值
 			arrNoRepeat(item, index);
 		});
 		// 挑选出来要设置的那一行数据
 		var tmpNum =num -2;
 		var tmpNum2 = tmpNum;
 		 var attrValue = {};
 		 if(tmpNum == 0){
 		 	tmpNum = 9;
 		 	tmpNum2 =0;
 		 };
 		 
 		 attrValue["reserve" + tmpNum] = dataArrRepeat["reserve" + tmpNum];
 		deleAttrAndClick(attrValue,num, index); // dataArrRepeat已经筛选出来的所有的sku对应的属性。 通过deleAttrAndClick函数来设置对应属性的置灰效果
 	}
 	// 数组去重，吧属性里边有重复的去掉
 	function arrNoRepeat(arr, index) {
		var result = []
		for(var i = 0; i < arr.length; i++) {
			if(result.indexOf(arr[i]) == -1) {
				result.push(arr[i])
			}
		}
		dataArrRepeat[index] = result;
	}
 	// 发送请求 查询价格
 	var sku_id = "";
 	var deliver_type = "2";
 	
 	function deleAttrAndClick(data, num, index){ // 只会把不符合的条件置灰！
 		//var clickAttrId = currentClickAttr.parent(".attr_right").attr("data_id");
 		//var attrNames = $(".attr_left");
 		var attrValues = $(".attr_right").eq(index).find("span");
 		var tmpNum = num -2;
 		for(var i=0;i<attrValues.length; i++){
 			if(tmpNum == 0){
 				tmpNum = 9;
 			}
 			if($.inArray(attrValues.eq(i).html(), data["reserve" + tmpNum]) == -1){
 				attrValues.eq(i).addClass("disClick");
 			}else{
 				attrValues.eq(i).removeClass("disClick");
 			}
 			
 		}
 		if( index == $(".attr_right").length -1){
 			getAllSelectedAttr();
 			checkSkuByAllAttr(attrArr)
 			selectedOverAndSetSkuInfo(); // 已经选择完所有的属性后设置对应sku的信息。
 		}else{
 			$('#totalValue').html();
			$("#goods-price").html();
 		}
 		// 只设置一行的属性
 		
 		// 吧所有的属性设置一遍
// 		for(var i=0; i<attrValues.length; i++){
// 			var perAttrValueId =  attrValues.eq(i).attr("data_id"); // 属性的序列号
// 			if(clickAttrId == perAttrValueId){
// 				continue;
// 			};
// 			// 从dada中取出对应的属性数组
// 			var tmpDataIndex = parseInt(perAttrValueId)-2
// 			var dataArr = data["reserve" + tmpDataIndex];
// 			// 判断每一行的属性值是否在数值中;
// 			var perSpan = attrValues.eq(i).find("span");
// 			for(var j=0;j<perSpan.length; j++){
// 				var status = $.inArray(perSpan.eq(j).text(), dataArr); // 返回-1的时候就是没有  否则就是能匹配 现在不用解除事件绑定了
// 				if(status == -1){ // 数组中不存在,应该置灰 并且移除事件绑定
// 					//perSpan.eq(j).addClass("disClick").attr("data_is_click", 1);
// 					perSpan.eq(j).addClass("disClick");
// 					
// 				}else{ // 应该去掉置灰 ,添加事件绑定
// 					//perSpan.eq(j).removeClass("disClick").attr("data_is_click", 0);// 返回-1的时候就是没有  否则就是能匹配 现在不用解除事件绑定了
// 					perSpan.eq(j).removeClass("disClick")
// 				}
// 			}
// 		};
 	}
 	$('body').on(require('../../common/event.js').getEventType(),'nav span',function(e){
 	//$("body").on("click", "nav span", function(){
 		 $(this).addClass('active').siblings('span').removeClass('active');
 		 var attrBoxLen = $(".attr_box").length;
 		 deliver_type = $("nav .active").attr("data_type");
	 	getOrderDetail(deliver_type);
 	});

	$('body').on(require('../../common/event.js').getEventType(),'#add-btn',function(){
		$('#goodsNum').html((parseInt($('#goodsNum').html())+1));
		var perPrice = parseInt($('#goodsNum').html())*100;
		var tmp = perPrice*parseFloat($('#goods-price').html())*0.01.toFixed(2);
		$('#minus-btn').removeClass('gray');
		if(!isNaN(tmp)){
			$('#totalValue').html(tmp);
			$("#submit-btn").removeClass("gray");
		}else{
			$('#totalValue').html("");
			$("#submit-btn").addClass("gray");
		}
	});

	$('body').on(require('../../common/event.js').getEventType(),'#submit-btn',function(e){
		require('../../common/btn-trigger.js').btnCtrl(e, function(){
			if(!$("#totalValue").html()){
				layer.open("请选择特定规格的商品！");
				return;
			};
			var param = {
				sku_id: finalSkuId + "",
				spu_id : goodsId,
				sku_name: orderConfirmInfo.sku_name,
				sku_image_url: orderConfirmInfo.sku_image_url,
				sku_specs: orderConfirmInfo.sku_specs,
				wechat_price: orderConfirmInfo.wechat_price,
				counts: $('#goodsNum').html(),
				deliver_type: deliver_type
			}
			$ajax.ajaxPost(null, '006000007', param, function(data) {
				if(data.success){
					layer.open("提交成功！");
					setTimeout(function () {
						location.href = 'my-order.html?from=login&order_type=1&order_status=00';
				    }, 1000);

				} else {
					if(data.code == "30008"){
						layer.open("库存不足!");
						return;
					}
					if(data.code === '30058' ||data.code === '40009' || data.code === '40007' || data.code === '50003'|| data.code === '50002' || data.code === '40014'|| data.code === '40016'|| data.code === '40010'|| data.code === '30062'){
						layer.open(data.msg);
					}else{
						if(data.msg){
							layer.open(data.msg.substring(0,40));
						}else{
							layer.open(data.substring(0,40));
						};
					};
				}
			});
		});
	});
});

