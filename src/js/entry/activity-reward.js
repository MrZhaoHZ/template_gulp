var $ajax = require('../common/ajax.js');
var self_tpl = require('../module/tpl/center-tpl.js');
var api_path_config = require('../../../tmp_path_config.js');
var wxModule = require('../common/wx.js');
var wxShare = require('../common/wx-share.js').wxShare;
var layer = require('../common/layer.js');
$(function(){
	require('../common/rem.js').remSetting();
	var _membid = $.cookie('member_id');
	$ajax.ajaxPostAct("/gate.do","007000009",{member_id:_membid},function(data) {
		if(data.success){
			console.log(data)
			if(data.data.length == 0){
				$('.listBoxN').html("<p style='text-align: center;line-height: 3rem;font-size: 15px;'>暂无活动奖励！</p>")
			}else{
				$('.listBoxN').html(doT.template(self_tpl.actListReward)(data.data));
			}
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

	            $ajax.ajaxPostAct("/gate.do","007000010",{member_id:_membid,act_id:actid,page_size:size,current_page:String(page)},function(data) {
					if(data.success){
						if(data.data.datas){
							var arrLen = data.data.datas.length;
							if(arrLen > 0){
								var _moneryHtml = doc.parents(".dailiN").siblings(".numbox");
								$(_moneryHtml).find(".scrollbox").append(doT.template(self_tpl.ActAgentReward)(data.data.datas));
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

