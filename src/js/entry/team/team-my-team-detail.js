var remSetting = require('../../common/rem.js').remSetting;
var self_tpl = require('../../module/tpl/team-tpl.js');
var $ajax = require('../../common/ajax.js');
var httpURL = require('../../common/http-url.js');
remSetting();
$(function() {
    var flag = 0;
    var member_id = httpURL.getQueryString('member_id');
    getData("#team");

    function getData(selector){
        $ajax.ajaxPost(null, "003000006", {member_id:member_id}, 
        function(data){
            if (data.code == "10000") {
                if (flag == 0) {
                    var item = data.data;
                    $("#head_img").attr("src", item.portrait);
                    var title = item.real_name + "(" + item.grade_name + ")";
                    $("#title").text(title);
                    $("#recommend_num").text(item.referrals + "人");
                    $("#team_num").text(item.total_team_num + "人");
                    $("#phone").text(item.mobile);
                    $("#address").text(item.address);
                    $(selector).html(doT.template(self_tpl.myTeamListLiTplDetail)(data.data.list));
                    flag = 2;
                    $("#team ul").children("li:last").css("border-bottom", "none");
                }else if(data.data){
                    dom_team.toggleClass("hidde");
                    $(selector).html(doT.template(self_tpl.myTeamListLiTplDetail)(data.data.list));
                }
            };
        });
    };

    // getMyTeamList("#team");
    // function getMyTeamList(selector){
    //     // $.post('/getMyTeamLiListDetail.do', {   }, 
    //     //     function(data){
    //     //         $(selector).html(doT.template(self_tpl.myTeamListLiTplDetail)(data.data));
    //     // });
    // };
    var dom_team = "";
    $(".team").on("click", ".click_li", function(event){
        var num = $(this).attr("team_num");
        if (num != 0) {
            dom_team = "";
            member_id = $(this).attr("data_id");
            dom_team = $(this).next(".team");
            var dom_icon = $(this).children("p").children("span").eq(2);
            dom_icon.toggleClass("right_icon");
            dom_icon.toggleClass("bottom_icon");
            getData(dom_team);
            event.stopPropagation();
        };
    });
    $("#home").on("click", function(){
        window.location.href = "../center.html?from=login";
    });
});
