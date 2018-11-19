var $ajax = require('../common/ajax.js');
var self_tpl = require('../module/tpl/center-tpl.js');
var api_path_config = require('../../../tmp_path_config.js');
var wxModule = require('../common/wx.js');
var wxShare = require('../common/wx-share.js').wxShare;
var layer = require('../common/layer.js');
var httpURL = require('../common/http-url.js');
var returnPage = require('../common/return-page.js');
$(function(){
	require('../common/rem.js').remSetting();
	var developAgentLink = null;
	var developAgentShareLink = null;
	var allowShare = false;
	var _membid = $.cookie('member_id');
	$ajax.ajaxPostAct("/gate.do","007000007",{member_id:_membid},function(data) {
		if(data.success){
			console.log(data)
			$('.listBoxN').html(doT.template(self_tpl.actList)(data.data));
		}
	});
	// function getAgentList(doc,actid,agent){
	// 	$ajax.ajaxPostAct("/gate.do","007000008",{member_id:_membid,act_id:actid,become_agent:agent},function(data) {
	// 		if(data.success){
	// 			console.log(data)
	// 			var _moneryHtml = doc.parents(".dailiN").siblings(".numbox");
	// 			$(_moneryHtml).html(doT.template(self_tpl.ActAgent)(data.data.datas));
	// 			// $(_moneryHtml).show();
	// 		}
	// 	});
	// }
	$(".activityboxN").on("click",".listZhun",function(){
		var _this = $(this),
			_thisActid = _this.attr("actid"),
			_become_agent = "0";
			var scobox = _this.parents(".dailiN").siblings(".numbox").find(".scrollbox");
			if($(scobox).find("li").length > 0){
				$(scobox).html("");
			}
			// getAgentList(_this,_thisActid,_become_agent);
			reloadFn(_this,_thisActid,_become_agent);
	})

	$(".activityboxN").on("click",".listZheng",function(){
		var _this = $(this),
			_thisActid = _this.attr("actid"),
			_become_agent = "1"; 
			var scobox = _this.parents(".dailiN").siblings(".numbox").find(".scrollbox");
			if($(scobox).find("li").length > 0){
				$(scobox).html("");
			}
			// getAgentList(_this,_thisActid,_become_agent);
			reloadFn(_this,_thisActid,_become_agent);
	})
	$('body').on("click",".fuzhi",function(){
		var _this = $(this),
			_thisactId = $(this).attr("actid"),
			_thisopenid = _membid;
		// var developAgentShareLink = ""+ api_path_config.api_path_act +"/static/page/index.html?openId="+ require('../common/base64.js').encode(_thisopenid) +"&actId="+ _thisactId +"";
		developAgentShareLink = 'https://' + api_path_config.wxdomain + '/html/shareAct.html?openId='+ _thisopenid +'&actId='+ _thisactId +'';
		$('#developAgentOnline').val(developAgentShareLink);
		$('.layer-mask').remove();
		$('body').append('<div id="layer-mask" class="layer-mask"></div>');
		$('.layer-mask').show();
		$('#develop-layer').show();
		var bodyRect = document.body.getBoundingClientRect();
		var E_float = document.getElementById('develop-layer');
		var top = -bodyRect.top;
		var left = -bodyRect.left;
		var iW = window.innerWidth;
		var iH = window.innerHeight;
		var floatRect = E_float.getBoundingClientRect();
		var eW = floatRect.width;
		var eH = floatRect.height;

		// E_float.style.top = (top + (iH - eH) / 2) + 'px';
		// E_float.style.left = (left + (iW - eW) / 2) + 'px';
		E_float.style.top = (0 + (iH - eH) / 2) + 'px';
		// E_float.style.left = (0 + (iW - eW) / 2) + 'px';
		if(iW < 750) {
			E_float.style.left = (0 + (iW - eW) / 2) + 'px';
		}
	});
	$("body").on("click",".xiangqing",function(){
		var _this = $(this);
		var _actid = _this.attr("actid");
		location.href = 'https://dltest1.yyzws.com/dl_gateway_web/static/page/index.html?actid='+ _actid + '&openId=null&memberid='+ _membid;
	})
	$("textarea").keyup(function(){
		$("#developAgentOnline").val(developAgentShareLink);
	});
	$('body').delegate('.develop-layer-close', require('../common/event.js').getEventType(), function(e) {
		e.preventDefault();
		$('.layer-mask').hide();
		$('#develop-layer').hide();
	});
	// function reloadFnClick(doc,actid,agent){
	// 	var page = 1;
	//     // 每页展示个数
	//     var size = "10";
	// 	$ajax.ajaxPostAct("/gate.do","007000008",{member_id:_membid,act_id:actid,become_agent:agent,page_size:size,current_page:String(page)},function(data) {
	// 		if(data.success){
	// 			if(data.data.datas){
	// 				var arrLen = data.data.datas.length;
	// 				if(arrLen > 0){
	// 					var _moneryHtml = doc.parents(".dailiN").siblings(".numbox");
	// 					$(_moneryHtml).find(".scrollbox").append(doT.template(self_tpl.ActAgent)(data.data.datas));
	// 					$(_moneryHtml).find(".numListN").show();
	// 				}
	// 			}
	// 		}
	// 	});
	// }

		// var titleValue = "";
		// 	var id_val = "";
		// 	splitHref();
		// 	reloadFn();
	function reloadFn(doc,actid,agent){
		var page = 0;
	    // 每页展示个数
	    var size = "10";
	    var drophtml = doc.parents(".dailiN").siblings(".numbox").find(".scrollbox");
	    // var _act_id = "15";
	    // dropload
	    $(drophtml).dropload({
	        scrollArea : $(drophtml),
	        loadDownFn : function(me){
	            // 拼接HTML
	            page++;

	            $ajax.ajaxPostAct("/gate.do","007000008",{member_id:_membid,act_id:actid,become_agent:agent,page_size:size,current_page:String(page)},function(data) {
					if(data.success){
						if(data.data.datas){
							var arrLen = data.data.datas.length;
							if(arrLen > 0){
								var _moneryHtml = doc.parents(".dailiN").siblings(".numbox");
								$(_moneryHtml).find(".scrollbox").append(doT.template(self_tpl.ActAgent)(data.data.datas));
								$(_moneryHtml).find(".numListN").show();
								me.resetload();
							}
						}else{
							me.lock();
		                        // 无数据
	                        me.noData();
						}
						// console.log(data)
						// var _moneryHtml = doc.parents(".dailiN").siblings(".numbox");
						// $(_moneryHtml).html(doT.template(self_tpl.ActAgent)(data.data));
						// $(_moneryHtml).show();
					}else{
						me.resetload();
					}
				});
	        }
	    });
	}

});
