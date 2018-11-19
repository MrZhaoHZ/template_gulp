var httpURL = require('../common/http-url.js');
if (!httpURL.getQueryString('from')) {
    require('../common/localStorage.js').setItem('login_redirect', location.href + '?from=login');
}
var layer = require('../common/layer.js');
var $ajax = require('../common/ajax.js');
var self_tpl = require('../module/tpl/activity-vedio-tpl.js');
// require('../../common/login-status.js').isLogin(function(){require('../../common/rem.js').remSetting();});
require('../common/rem.js').remSetting();
var api_path_config = require('../../../tmp_path_config.js');
var data,
    myScroll,
    //pullDownEl, pullDownOffset,
    pullUpEl, pullUpOffset,
    generatedCount = 0;

function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
var _id = getQueryString('id')
getImagelist(_id);
function getImagelist(id){
    var url = 'https://imgtest-yyzws1.oss-cn-hangzhou.aliyuncs.com/xihu/id_';
    if(id == 27 || id == 42 || id == 46){
        var stringImage = '<img src="' + url + id +'_1.jpg" alt=""/>';
    } else if (id == 19 || id == 30 || id == 43){
        var stringImage = '<img src="' + url + id + '_1.jpg" alt=""/>'
                        + '<img src="' + url + id + '_2.jpg" alt=""/>'
    }else{
        var stringImage = '<img src="' + url + id + '_1.jpg" alt=""/>'
                        + '<img src="' + url + id + '_2.jpg" alt=""/>'
                        + '<img src="' + url + id + '_3.jpg" alt=""/>'
    }
    $("#content").html(stringImage);
}



