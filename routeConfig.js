var fs = require('fs');
//mock假数据， 将线上环境的路由   ajax访问 映射到开发环境
/**
 *  @param route: ./mock/data/distHTML/test.html
 *
**/
var redirect = function(route){
	//console.log("redirect执行...");
	return function(req, res, param){
		//重定向到 ./mock/data/distHTML/test.html
		res.writeHead(302, {
		  'Location': route + param
		});
		res.end();
	}
};
/**
 *  @param route: ./mock/data/json/test.json
 *  @param jsonStr: {isSuccess:1}
**/
var ajax = function(route, jsonStr){
	//console.log("ajax执行...");
	return function(req, res){        
		res.setHeader("Access-Control-Allow-Origin",true);
		res.setHeader("Content-Type", "application/json;charset=utf-8");
		if(route){
			delete require.cache[require.resolve(route)];
			res.end(JSON.stringify(require(route)));
		} else {
			res.end(JSON.stringify(jsonStr));
		}
	}
}
/**
 *  @param route: ./mock/data/json/jsonP.json
 *  @param jsonStr: {isSuccess:1}
**/
var jsonP = function(route, jsonStr){
	//console.log("jsonP执行...");
	return function(req, res, param, jsonpCallback){        
		res.setHeader("Access-Control-Allow-Origin",true);
		res.setHeader("Content-Type", "application/json;charset=utf-8");
		if(route){
			delete require.cache[require.resolve(route)];
			res.end(jsonpCallback + "(" + JSON.stringify(require(route)) + ")");
		} else {
			res.end(jsonpCallback + "(" + JSON.stringify(jsonStr) + ")");
		}
	}
}
var render_html = function(filePath){
	//console.log("render_html执行...");
	return function(req, res){
		res.setHeader("Content-Type", "text/html");
		res.end(readFile(filePath));
	}
}
/**
 *  @param filePath: ./mock/data/renderHTML/test.html
 *
**/
var readFile = function(filePath){
	//console.log("readFile执行...");
	try {
		var str = fs.readFileSync(filePath, 'utf8');
	} catch(e) {
		console.error('readFile ', filePath, ' error!');
		console.error(e);
	}
	return str;
}

/**
 *   gulp task 启动时，ajax，render_html，readFile， redirect函数会执行...
 *
**/
var mocks = {
	//'/getJson.do': ajax('./mock/data/json/test.json'),
	'/getJson.do': ajax(null, {"success" : true}),
	'/getHTML.do': render_html('./mock/data/renderHTML/test.html'),
	'/redirectToHTML.do': redirect('./mock/data/distHTML/test.html'),
	// '/getJsonP.do': jsonP('./mock/data/json/jsonP.json')
	'/getJsonP.do': jsonP(null, {"success" : false}),

	'/getGoodsList.do': ajax('./mock/data/json/goodsList.json'),

	'/getTimeCheckSellList.do': ajax('./mock/data/json/time-check-sell-list.json'),
	'/getSecKillList.do': ajax('./mock/data/json/sec-kill-list.json'),
	'/getTimePurchaseList.do': ajax('./mock/data/json/time-purchase-list.json'),
    '/getCheckSellList.do': ajax('./mock/data/json/check-sell-list.json'),
	'/bossmanager/item/query.do': ajax('./mock/data/json/getGoodsList.json'),
	'/bossmanager/category/query.do': ajax('./mock/data/json/getCate.json'),
	'/bossmanager/category/query2.do': ajax('./mock/data/json/getTwoCate.json'),
	'/bossmanager/item/brand/query.do': ajax('./mock/data/json/brand_list.json'),
	'/bossmanager/item/sku/queryx.do': ajax('./mock/data/json/sku-queryx.json'),
	'/bossmanager/item/icon/query.do': ajax('./mock/data/json/jiaobiao.json'),
	'/getTimePurchaseList.do': ajax('./mock/data/json/time-purchase-list.json'),
	'/bossmanager/goods/query.do': ajax('./mock/data/json/getGoodsSku.json'),
	'/modifyTimelimitpurchase.do': ajax(null, {"success" : true}),
	'/marketing/limtedPurchase/limitedPurchaseById.do': ajax('./mock/data/json/campaignInfo.json'),
	'/getGoodsCategary.do': ajax('./mock/data/json/goods-management-new-categary.json'),
	'/getGoodsBrand.do': ajax('./mock/data/json/goods-management-new-recent.json'),
	'/getGoodsLable.do': ajax('./mock/data/json/goods-management-new-lable.json'),
	'/getGoodsEdit.do': ajax('./mock/data/json/goods-management-edit.json'),
	'/seckill/update.do': ajax('./mock/data/json/sec-kill-edit.json'),
	'/bundleSaleList.do': ajax('./mock/data/json/bundle-sale-list.json'),
	'/getGoodsRecent.do': ajax('./mock/data/json/goods-management-new-recent.json'),
	'/item/category/leaf/query.do': ajax('./mock/data/json/leaf-query.json'),
	'/getPageList.do': ajax('./mock/data/json/page-list.json'),
	'/mainweb/page/names.do': ajax('./mock/data/json/ready-page-list.json'),
	'/mainweb/page/get.do': ajax('./mock/data/json/h5homepage.json'),

	//	team
	'/getMyTeamList.do': ajax('./mock/data/json/getMyTeamList.json'),
	'/getMyTeamLiList.do': ajax('./mock/data/json/getMyTeamLiList.json'),
	'/getMyTeamLiListDetail.do': ajax('./mock/data/json/getMyTeamLiListDetail.json'),
	'/getMyTeamJoin.do': ajax('./mock/data/json/getMyTeamJoin.json'),
	'/getMyTeamUpgrade.do': ajax('./mock/data/json/getMyTeamUpgrade.json'),
	'/getMyTeamUpgrade1.do': ajax('./mock/data/json/getMyTeamUpgrade1.json'),
	'/getMyTeamUpgradeDetail.do': ajax('./mock/data/json/getMyTeamUpgrade2.json'),
	'/getMyTeamMyTeamDetail.do': ajax('./mock/data/json/getMyTeamLiListDetail.json'),
	'/getMyTeamMyTeamDetailTop.do': ajax('./mock/data/json/getMyTeamDetailTop.json'),
	'/getMyTeamMyTeamJoinExamine.do': ajax('./mock/data/json/getMyTeamJoinExamine.json'),
	'/getMyTeamUpgrade3.do': ajax('./mock/data/json/getMyTeamUpgrade3.json'),

	// goods-payment
	'/getGoodsPaymentDetail.do': ajax('./mock/data/json/goods-payment-detail.json'),
	'/getGoodsPaymentExamine.do': ajax('./mock/data/json/goods-payment-examine.json'),

	//grid
	'/getGrid.do': ajax('./mock/data/json/grid.json'),
	'/getGridPreview.do': ajax('./mock/data/json/preview.json'),

	//OneLeaf
	'/iscrollMockData.do': ajax(null, {"success" : true}),
	'/getOrderList.do': ajax('./mock/data/json/orderList.json'),
	'/getGoodsList.do': ajax('./mock/data/json/goodsList.json'),

	//center
	'/getSwiperList.do': ajax('./mock/data/json/swiperList.json'),
	'/getOrderAddress.do': ajax('./mock/data/json/orderAddress.json'),
	'/getOrderGoods.do': ajax('./mock/data/json/orderGoods.json'),
	'/getBookDetail.do': ajax('./mock/data/json/autho-book-detail.json')
}

var middleware = function(){
	//任何一个请求(css,js,img,ajax)都会经过这里
	return function (req, res, next){
		var url = req.url;
		//如果是ajax请求，如/getJson.do?type=1，截取查询参数：type=1
		var parameter = "";
		//jsonP回调函数
		var jsonpCallback = null;
		//如果请求中包含参数
		if(url.indexOf('?') > 0) {
			if(url.indexOf("callback") === -1) {
				//非jsonp请求.请求格式为："/getJsonP.do?callback=handler321&jsonpCallback=handler321&_=1464251185988"，因此包含callback字符串
				var index =  url.indexOf('?');
				parameter = index > 0 ? url.slice(index) : "";
				url = url.slice(0, url.indexOf('?'));
			} else {
				//jsonp请求.请求格式为："/getJsonP.do?callback=handler&jsonpCallback=handler&_=1464161171204"，因此包含callback字符串
				jsonpCallback = url.slice(url.indexOf("jsonpCallback")+14,url.indexOf("&_="));
				url = url.slice(0, url.indexOf('?'));
			}
		}
		if (mocks[url]) {
			// ajax('./mock/data/json/test.json')(req, res, parameter);
			mocks[url](req, res, parameter, jsonpCallback);
		}
		next();
	}
}
exports.middleware = middleware;
exports.mocks = mocks;