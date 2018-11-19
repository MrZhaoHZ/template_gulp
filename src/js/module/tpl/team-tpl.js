var self_tpl = {
		'myTeamListTpl': '{{~ it.data:item:index }}\
							<p class="p_row">\
								<span class="left" style="display: inline-block;text-align: justify;text-align-last: justify;">{{= item.grade_name}}</span>\
								<span class="middle" style="width:{{= item.count / it.length * 60}}%"></span>\
								<sapn class="right">{{= item.count}}人</sapn>\
							</p>\
						{{~}}\
						<p class="total"><span>合计：</span><span>{{= it.total_count}}人</span></p>',
		'myTeamListLiTpl': '{{~ it:item:index }}\
							<li style="position: relative;">\
								<span>{{= item.real_name}}</span>\
								<span>{{= item.grade_name}}</span>\
								<span>{{= item.account}}</span>\
								<span>{{= item.total_team_num}}</span>\
								{{? item.total_team_num !=0}}\
									<a href="team-my-team-detail.html?member_id={{= item.member_id}}" class="right_icon" data_id="{{= item.id}}"></a>\
								{{?}}\
								{{? item.total_team_num ==0}}\
									<a href="team-my-team-detail.html?member_id={{= item.member_id}}" class="right_icon" style="opacity: 0;position: absolute;width: 100%;height: 100%;display: block;left: 0;top: 0;" data_id="{{= item.id}}"></a>\
								{{?}}\
							</li>\
						{{~}}',
		'myTeamListLiTplDetail': '<ul>\
									{{~ it:item:index }}\
										<li class="click_li" data_id="{{= item.member_id}}" team_num="{{= item.total_team_num}}">\
											<p>\
												<span class="left">{{= item.grade_name}}&nbsp;&nbsp;</span>\
												<span class="left">({{= item.real_name}})</span>\
												{{? item.total_team_num !=0}}\
													<span class="right right_icon"></span>\
												{{?}}\
												<span class="right num">{{= item.total_team_num}}</span>\
											</p>\
										</li>\
										<div class="team hidde"></div>\
									{{~}}\
								</ul>',
		'myTeamJoin': '{{~ it.data:item:index }}\
							<li>\
								<div class="name-per">\
									<p class="p_top">\
										<span class="P_left">状态：</span>\
										<span class="p_middle">{{= it.dictionary[item.audit_status]}}</span>\
										<span class="p_right">{{= item.create_time}}</span>\
									</p>\
									<div class="content_detail">\
										<div class="left">\
											<img src="{{= item.portrait}}">\
										</div>\
										<div class="middle">\
											<p>\
												<span>姓名：</span>\
												<span>{{= item.real_name}}</span>\
											</p>\
											<p>\
												<span>申请等级：</span>\
												<span>{{= item.grade_name}}</span>\
											</p>\
										</div>\
									</div>\
									<div class="bottom">\
										<a class="span_btn" data_id="{{= item.id}}" href="team-join-examine.html?id={{= item.id}}&audit_status={{= it.audit_status}}">查看详情</a>\
									</div>\
								</div>\
							</li>\
					{{~}}',
		'myTeamUpgrade': '{{~ it.data:item:index }}\
							<li>\
								<div class="name-per">\
									<p class="p_top">\
										<span class="P_left">状态：</span>\
										<span class="p_middle">{{= item.audit_status_name}}</span>\
										<span class="p_right">{{= item.create_time}}</span>\
									</p>\
									<div class="content_detail">\
										<div class="left">\
											<img src="{{= item.portrait}}">\
										</div>\
										<div class="middle">\
											<p>\
												<span>姓名：</span>\
												<span>{{= item.real_name}}</span>\
											</p>\
											<p>\
												<span>原等级：</span>\
												<span>{{= item.grade_name}}</span>\
											</p>\
											<p>\
												<span>申请等级：</span>\
												<span>{{= item.new_agent_grade_name}}</span>\
											</p>\
										</div>\
									</div>\
									<div class="bottom">\
										<a class="span_btn" href="team-upgrade-examine.html?id={{= item.id}}&data_type={{= it.type}}" data_id="{{= item.id}}">查看详情</a>\
									</div>\
								</div>\
							</li>\
					{{~}}',
		'myTeamUpgrade1Tpl': '{{~ it.des:item:index }}\
								<div class="swiper-slide" isNeedIdCard="{{= item.need_i_d_card}}" agent_grade="{{= item.id}}" auth_amount= {{= item.auth_amount/100}}>\
									{{= item.name}}\
					            	<div class="hide_div" style="display:none;">{{= item.application_des || ""}}</div>\
					            	<span class="bot border"></span>\
				    				<span class="top border"></span></div>\
							{{~}}',
		'upgradeAuditProcessTpl': '<section id="cd-timeline-{{= it.length}}" class="cd-container-normal">\
									{{~ it:item:index }}\
									<div class="cd-timeline-block">\
										<div class="cd-timeline-img cd-picture"></div>\
										<div class="cd-timeline-content">\
											<p class="detail">\
												<span class="name" id="superior">{{= item.handle_time}}</span>\
												<span class="status" id="superior_state">  {{= item.remarks}}</span>\
											</p>\
											<p class="time" id="time1">{{= item.member_name}}({{= item.grade_name}})</p>\
										</div>\
									</div>\
									{{~}}\
								  </section>',
		'orderProcessTpl' : '<section id="cd-timeline-{{= it.length}}" class="cd-container-normal">\
								{{? it.length>=1}}\
									<div class="cd-timeline-block">\
										<div class="cd-timeline-img cd-picture" id="submit" style="background-color: #e0e0e0;"></div>\
										<div class="cd-timeline-content">\
											<p>\
												<span class="left">提交成功：</span>\
												<span>申请级别：</span>\
												<span id="for_level">{{= it[0].agent_grade_name}}</span>\
											</p>\
											<p>\
												<span class="left time" id="time" >{{= it[0].create_date || ""}}</span>\
											</p>\
										</div>\
									</div>\
								{{?}}\
								{{? it.length>=2}}\
									<div class="cd-timeline-block">\
										<div class="cd-timeline-img cd-picture" id="old" style="background-color: #e0e0e0;"></div>\
										<div class="cd-timeline-content">\
											<p>\
												<span class="left">原上级：</span>\
												<span id="old_superior">{{= it[1].name}}</span>\
											</p>\
											<p>\
												<span id="old_status">{{= it[1].audit_status_name}}</span>\
											</p>\
											<p>\
												<span class="left time" id="time" >{{= it[1].create_date || ""}}</span>\
											</p>\
										</div>\
									</div>\
								{{?}}\
								{{? it.length>=3}}\
									<div class="cd-timeline-block">\
										<div class="cd-timeline-img cd-picture" id="new" style="background-color: #e0e0e0;"></div>\
										<div class="cd-timeline-content">\
											<p>\
												<span class="left">新上级：</span>\
												<span id="new_superior">{{= it[2].name}}</span>\
											</p>\
											<p>\
												<span id="new_status">{{= it[2].audit_status_name}}</span>\
											</p>\
											<p>\
												<span class="left time" id="time" >{{= it[2].create_date || ""}}</span>\
											</p>\
										</div>\
									</div>\
								{{?}}\
								{{? it.length>=4}}\
									<div class="cd-timeline-block">\
										<div class="cd-timeline-img cd-picture" id="head" style="background-color: #e0e0e0;"></div>\
										<div class="cd-timeline-content">\
											<p>\
												<span class="left">{{= it[3].name}}：</span>\
												<span id="head_status">{{= it[3].audit_status_name}}</span>\
											</p>\
											<p>\
												<span class="left time" id="time" >{{= it[3].create_date || ""}}</span>\
											</p>\
										</div>\
									</div>\
								{{?}}\
						</section>'
};
module.exports = self_tpl;
