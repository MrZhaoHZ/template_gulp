var self_tpl = {
	'registerProcessTpl': '{{~ it:item:index }}\
							<div class="cd-timeline-block">\
								{{? item.color == 1}}\
									<div class="cd-timeline-img cd-picture back_color"></div>\
								{{?? }}\
									<div class="cd-timeline-img cd-picture"></div>\
								{{?}}\
								<div class="cd-timeline-content">\
									<p class="detail">\
										<span class="name">{{= item.name}}</span>\
										<span class="status">（{{= item.status}}）</span>\
									</p>\
									<p class="time">{{= item.time}}</p>\
								</div>\
							</div>\
						{{~}}',
	'getDeltRegisterTpl': '{{~ it:item:index }}\
								<div class="swiper-slide" auth_amount={{= item.auth_amount/100}} isNeedIdCard="{{= item.need_i_d_card}}" agent_name="{{= item.name}}"  agent_grade="{{= item.id}}">\
					            	{{= item.name}}\
					            	<div class="hide_div" style="display:none;">{{= item.application_des || ""}}</div>\
					            	<span class="bot border"></span>\
				    				<span class="top border"></span></div>\
							{{~}}',
	'getDeltRegisterApplyTpl': '{{~ it:item:index }}\
								<div class="swiper-slide" isNeedIdCard="{{= item.need_i_d_card}}" agent_grade="{{= item.id}}">\
									{{= item.name}}\
									<div class="hide_div" style="display:none;">{{= item.application_des || ""}}</div>\
					            	<span class="bot border"></span>\
				    				<span class="top border"></span></div>\
							{{~}}',
	'orderProcessTpl' : '<section id="cd-timeline-{{= it.length}}" class="cd-container-normal">\
							{{? it.length>=1}}\
								<div class="cd-timeline-block">\
									<div class="cd-timeline-img cd-picture"></div>\
									<div class="cd-timeline-content">\
										<p class="detail">\
											<span class="name">提交成功</span>\
										</p>\
										<p class="time" id="time2">{{= it[0].create_date || ""}}</p>\
									</div>\
								</div>\
							{{?}}\
							{{? it.length>=2}}\
								<div class="cd-timeline-block">\
									<div class="cd-timeline-img cd-picture"></div>\
									<div class="cd-timeline-content">\
										<p class="detail">\
											<span class="name" id="superior">{{= it[1].name + "(" + it[1].agent_grade_name + ")"}}</span>\
											<span class="status" id="superior_state">&nbsp;&nbsp;&nbsp;{{= it[1].audit_status_name}}</span>\
										</p>\
										<p class="time" id="time1">{{= it[1].create_date || ""}}</p>\
									</div>\
								</div>\
							{{?}}\
							{{? it.length>=3}}\
								<div class="cd-timeline-block">\
									<div class="cd-timeline-img cd-picture"></div>\
									<div class="cd-timeline-content">\
										<p class="detail">\
											<span class="name">总部</span>\
											<span class="status" id="head_state">{{= it[2].audit_status_name }}</span>\
										</p>\
										<p class="time" id="time0">{{= it[2].create_date || ""}}</p>\
									</div>\
								</div>\
							{{?}}\
						</section>'
};
module.exports = self_tpl;
