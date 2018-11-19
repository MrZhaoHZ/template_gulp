var self_tpl = {
	'mainTpl':'<div class="blk">\
					<span>我的上级</span>\
					<span id="my-up" class="gray"></span>\
				</div>\
				<div class="blk">\
					<span>授权姓名</span>\
					<span class="gray">{{= it.real_name}}</span>\
				</div>\
				<div class="blk">\
					<span>授权微信</span>\
					<span class="gray">{{= it.wechat_id || ""}}</span>\
				</div>\
				<div class="blk">\
					<span>注册手机</span>\
					<span class="gray">{{= it.mobile}}</span>\
				</div>\
				<div class="blk">\
					<span style="position: relative;top: 10px;">收货地址</span>\
					<span class="gray">\
					<p><span>{{= it.member_address_d_t_o.province}} {{= it.member_address_d_t_o.city}} {{= it.member_address_d_t_o.area}}</span></p><p><span>{{= it.member_address_d_t_o.address}}</span></p>\
					</span>\
				</div>\
				<div class="blk">\
					<span>手势密码</span>\
					<a class="blk-a" href="setting-gesture.html" id="gesture-setting">设置 ></a>\
				</div>\
				<div class="blk">\
					<span>登陆密码</span>\
					<a class="blk-a" href="reset-pwd.html">修改 ></a>\
				</div>\
				<div class="blk main" id="logout" style="display: none;">\
					退出帐号\
				</div>'
	,'myUpTpl': '<p class="myup-title"><span>我的上级</span><span class="myup-layer-close"></span></p>\
				    <p>姓名：{{= it.real_name}}</p>\
				    <p>等级：{{= it.grade_name}}</p>\
				    <p>微信号：{{= it.wechat_id}}</p>\
				    <p>手机号码：<span id="up-phone">{{= it.mobile}}</span></p>\
				    <p class="tool"><span class="myup-now" id="call-now">电话呼叫</span></p>'
};
module.exports = self_tpl;