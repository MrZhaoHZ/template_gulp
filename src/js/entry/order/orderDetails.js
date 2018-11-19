/*
 * @Author: Jing 
 * @Date: 2018-03-06 10:21:55 
 * @Last Modified by: Jing
 * @Last Modified time: 2018-03-09 15:30:36
 */
$(function () {
    var commonEvent = require('../../common/event.js');
    var $ajax = require('../../common/ajax.js');
    var self_tpl = require('../../module/tpl/activity-order-tpl');
    var api_path_config = require('../../../../tmp_path_config.js');
    var wxModule = require('../../common/wx.js');
    var wxShare = require('../../common/wx-share.js').wxShare;
    var layer = require('../../common/layer.js');
    var remSetting = require('../../common/rem.js').remSetting;
    var httpURL = require('../../common/http-url.js');
    var num = httpURL.getQueryString('num');
    var order_id = httpURL.getQueryString('order_id');
    // rem适配
    remSetting();
    //所需参数
    var prams = {
        order_id: order_id
    };
    //页面渲染
    getDataList(prams);
    function getDataList(prams) {
        $ajax.ajaxDlGet('008000004', prams, function (data) {
        // $ajax.ajaxPostAct(null, '008000004', prams, function (data) {
            if (data.code == "10000" && data.data != null) {
                $('#info').html(doT.template(self_tpl.orderDetailsTpl)({ data:data.data, path: api_path_config.upload_path, deliver_type: prams.deliver_type}));
                if (num) {
                    $("#num").html("￥" + num);
                }else{
                    $("#num").parents(".order-number").hide();
                }
            } else if (data.data == null) {
                var html = '<div class = "null_content"></div>';
                $('#info').html(html);
            } else {
                layer.open(data.msg);
            }
        });
    }
});
