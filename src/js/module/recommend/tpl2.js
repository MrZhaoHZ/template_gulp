var self_tpl = {
	'blockTpl': '{{~ it.blockInfo:item:index }}\
					<span class="col{{? (index+1)%it.column!=0 }}{{= (index+1)%it.column }}{{??}}{{= it.column }}{{?}}" data-id="{{= item.id.join(",") }}" data-left_top_x="{{= item.left_top_x }}" data-left_top_y="{{= item.left_top_y }}" data-bottom_right_x="{{= item.bottom_right_x }}" data-bottom_right_y="{{= item.bottom_right_y }}" style="left:{{= item.left_top_x*it.blockWidth }}px;top:{{= item.left_top_y*it.blockWidth }}px;width:{{= Math.abs(item.left_top_x-item.bottom_right_x)*it.blockWidth }}px;height:{{= Math.abs(item.left_top_y-item.bottom_right_y)*it.blockWidth }}px;">\
					</span>\
				{{~}}',
	'editBlockTpl': '{{~ it.blockInfo:item:index }}\
					<span data-id="{{= item.id.join(",") }}" data-left_top_x="{{= item.left_top_x }}" data-left_top_y="{{= item.left_top_y }}" data-bottom_right_x="{{= item.bottom_right_x }}" data-bottom_right_y="{{= item.bottom_right_y }}" style="left:{{= item.left_top_x*it.blockWidth }}px;top:{{= item.left_top_y*it.blockWidth }}px;width:{{= Math.abs(item.left_top_x-item.bottom_right_x)*it.blockWidth }}px;height:{{= Math.abs(item.left_top_y-item.bottom_right_y)*it.blockWidth }}px;">\
					</span>\
				{{~}}',
	'singleBlockTpl':'<span data-id="{{= it.id.join(",") }}" data-left_top_x="{{= it.left_top_x }}" data-left_top_y="{{= it.left_top_y }}" data-bottom_right_x="{{= it.bottom_right_x }}" data-bottom_right_y="{{= it.bottom_right_y }}" style="left:{{= it.left_top_x*it.blockWidth }}px;top:{{= it.left_top_y*it.blockWidth }}px;width:{{= Math.abs(it.left_top_x-it.bottom_right_x)*it.blockWidth }}px;height:{{= Math.abs(it.left_top_y-it.bottom_right_y)*it.blockWidth }}px;">\
					 </span>'
};
module.exports = self_tpl;