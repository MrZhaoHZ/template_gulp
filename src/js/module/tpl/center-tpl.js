var self_tpl = {
	'swiperTpl': '<div class="swiper-wrapper">\
					{{~ it.data:item:index }}\
						<div class="swiper-slide"><a href="{{= item.uri}}"><img src="{{? item.image_uri.indexOf("http") == -1}}{{= it.image_prefix}}{{?}}{{= item.image_uri}}"></a></div>\
					{{~}}\
				</div>\
				<div class="swiper-pagination"></div>'
	,'userInfoTpl': '<span style="float:left;display:inline-block;border-radius:1.25rem;;width:1.25rem;;height:1.25rem;background-image:url({{= it.portrait_uri}});background-size: contain;"></span>\
					<div class="info">\
						<p class="name">姓名：{{= it.real_name}}（{{= it.agent_grade_name}}）</p>\
						<p class="uplevel" id="uplevel"></p>\
						<a href="account-setting.html"><span></span></a>\
					</div>'
	,'findResultTpl': '查询结果：\
						{{~ it:item:index }}\
						{{= item.real_name}}({{= item.agent_grade_name}})&nbsp;\
						{{~}}'
	,'actList': '{{~ it:item:index}}\
						<li class="listActN">\
							<div class="listN">\
								<div class="borBox">\
									<span class="actName">{{= item.activityDTO.act_name}}</span>\
									<span class="actStatus">{{= item.activityDTO.act_status_str}}</span>\
								</div>\
							</div>\
							<div class="dailiN">\
								<div class="borBox">\
									<div class="listActBox">\
										<p>准代理数量：<span class="listZhun" actid="{{= item.activityDTO.id}}">{{= item.objectList[0].totalIntentAgent}}</span></p>\
										<p>正式代理数量：<span class="listZheng" actid="{{= item.activityDTO.id}}">{{= item.objectList[0].totalFormalAgent}}</span></p>\
									</div>\
									{{? item.act_status==2}}\
									<p class="caoBox">\
										<input type="text" style="display: none;">\
										<span class="xiangqing" actid="{{= item.activityDTO.id}}">活动详情</span>\
										<span class="fuzhi" actid="{{= item.activityDTO.id}}">复制链接</span>\
									</p>\
									{{?}}\
								</div>\
							</div>\
							<div class="numbox">\
								<div class="numListN">\
									<div class="boxPosi">\
										<div class="headPosi">\
											<span>姓名</span>\
											<span>手机号</span>\
											<span>微信号</span>\
											<span>状态</span>\
										</div>\
										<ul class="scrollbox">\
										</ul>\
									<div>\
								</div>\
							</div>\
						</li>\
					{{~}}'
	,'actListReward': '{{~ it:item:index}}\
							<li class="listActN">\
								<div class="listN">\
									<div class="borBox">\
										<span class="actName">{{= item.acti_name}}</span>\
										{{? item.act_status==1}}<span class="actStatus">未开始</span>\
										{{?? item.act_status==2}}<span class="actStatus">进行中</span>\
										{{?? item.act_status==3}}<span class="actStatus">已撤下</span>\
										{{?? item.act_status==4}}<span class="actStatus">已结束</span>\
										{{?}}\
									</div>\
								</div>\
								<div class="dailiN">\
									<div class="borBox">\
										<div class="listActBox">\
											<p>奖励次数:<span class="listZhun" actid="{{= item.activity_id}}" style="margin-right:10px;">{{= item.total_counts}}</span>奖励总额:<span class="listZheng" actid="">{{= item.total_amount}}</span></p>\
										</div>\
									</div>\
								</div>\
								<div class="numbox">\
									<div class="numListN">\
										<div class="boxPosi">\
											<div class="headPosi">\
												<span>活动名称</span>\
												<span>状态</span>\
												<span>发放时间</span>\
												<span>数额</span>\
											</div>\
											<ul class="scrollbox">\
											</ul>\
										<div>\
									</div>\
								</div>\
							</li>\
						{{~}}'
	,'ActAgent': 	'{{~ it:item:index }}\
								<li>\
									<span>{{= item.recommend_name}}</span>\
									<span>{{= item.mobile}}</span>\
									<span>{{= item.wechat_no}}</span>\
									<span>{{= item.become_agent_str}}</span>\
								</li>\
							{{~}}'
	,'moneryHtml': '<li>\
						<span>活动名称</span>\
						<span>状态</span>\
						<span>发放时间</span>\
						<span>数额</span>\
					</li>\
					<li>\
						<span>12</span>\
						<span>12</span>\
						<span>2</span>\
						<span>2</span>\
					</li>\
				'
	,'ActAgentReward': 	'{{~ it:item:index }}\
								<li>\
									<span>{{= item.acti_name}}</span>\
									{{? item.act_status==1}}<span>未开始</span>\
									{{?? item.act_status==2}}<span>进行中</span>\
									{{?? item.act_status==3}}<span>已撤下</span>\
									{{?? item.act_status==4}}<span>已结束</span>\
									{{?}}\
									<span>{{= item.create_date}}</span>\
									<span>{{= item.award_amount}}</span>\
								</li>\
							{{~}}'
	,'moneryHtmlReward': '<li>\
						<span>活动名称</span>\
						<span>状态</span>\
						<span>发放时间</span>\
						<span>数额</span>\
					</li>\
					<li>\
						<span>12</span>\
						<span>12</span>\
						<span>2</span>\
						<span>2</span>\
					</li>\
				'
};
module.exports = self_tpl;
