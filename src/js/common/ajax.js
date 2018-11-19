var api_path_config = require('../../../tmp_path_config.js');
var wxModule = require('../common/wx.js');
function redirectURL() {
	if(!wxModule.isWX()) {
		location.href = 'pwd-login.html';
	} else {
		location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + api_path_config.appid + '&redirect_uri=https%3A%2F%2F' + api_path_config.wxdomain + '%2Fwechat_web%2Fwechat%2FwxAutho.do%3Fredirect_url%3Dhttps%253A%252F%252F' + api_path_config.wxdomain + '%252Fhtml%252Fwx-login.html&response_type=code&scope=snsapi_userinfo';
	}
}
function ajaxPostAct(url,id,param,callback) {
	if(!url) {
		url = '/gate.do';
	}
	if(id) {
		param.id = id;
	}
	var param = {
		req: JSON.stringify(param)
	}
	// $.post(api_path_config.api_path_3 + url,param,function(data){
	// 	// if(data.isLogin) {
	// 		if(typeof data != 'object') {
	// 			callback(JSON.parse(data));
	// 		} else {
	// 			callback(data);
	// 		}
	// 	// } else {
	// 		// redirectURL();
	// 	// }
	// });
	$.ajax({
        type: "post",
        data: param,
        url: api_path_config.api_path_act + url,
        timeout : 3000,
        xhrFields:{
	      withCredentials: true
	    },
	    //crossDomain: true,
        success: function(data) {
   //      	if(typeof data != 'object') {
			// 	callback(JSON.parse(data));
			// } else {
			// 	callback(data);
			// }
			loginJudge(data, callback);
        }
    });
}
//act ajax dl
function ajaxPost(url,id,param,callback) {
	if(!url) {
		url = '/gate.do';
	}
	if(id) {
		param.id = id;
	}
	var param = {
		req: JSON.stringify(param)
	}
	// $.post(api_path_config.api_path_3 + url,param,function(data){
	// 	// if(data.isLogin) {
	// 		if(typeof data != 'object') {
	// 			callback(JSON.parse(data));
	// 		} else {
	// 			callback(data);
	// 		}
	// 	// } else {
	// 		// redirectURL();
	// 	// }
	// });
	$.ajax({
        type: "post",
        data: param,
        url: api_path_config.api_path_3 + url,
        timeout : 3000,
        xhrFields:{
	      withCredentials: true
	    },
	    //crossDomain: true,
        success: function(data) {
   //      	if(typeof data != 'object') {
			// 	callback(JSON.parse(data));
			// } else {
			// 	callback(data);
			// }
			loginJudge(data, callback);
        }
    });
}
function ajaxPostWXDL(url,id,param,callback) {
	if(!url) {
		url = '/gate.do';
	}
	if(id) {
		param.id = id;
	}
	var param = {
		req: JSON.stringify(param)
	}
	// $.post(api_path_config.api_path_3 + url,param,function(data){
	// 	// if(data.isLogin) {
	// 		if(typeof data != 'object') {
	// 			callback(JSON.parse(data));
	// 		} else {
	// 			callback(data);
	// 		}
	// 	// } else {
	// 		// redirectURL();
	// 	// }
	// });
	$.ajax({
        type: "post",
        data: param,
        url: api_path_config.wxdomainDL + url,
        timeout : 3000,
        xhrFields:{
	      withCredentials: true
	    },
	    //crossDomain: true,
        success: function(data) {
   //      	if(typeof data != 'object') {
			// 	callback(JSON.parse(data));
			// } else {
			// 	callback(data);
			// }
			loginJudge(data, callback);
        }
    });
}
function ajaxPostTimeoutHandle(url,id,param,callback, timeOutCallBack) {
	if(!url) {
		url = '/gate.do';
	}
	if(id) {
		param.id = id;
	}
	var param = {
		req: JSON.stringify(param)
	}
	// $.post(api_path_config.api_path_3 + url,param,function(data){
	// 	// if(data.isLogin) {
	// 		if(typeof data != 'object') {
	// 			callback(JSON.parse(data));
	// 		} else {
	// 			callback(data);
	// 		}
	// 	// } else {
	// 		// redirectURL();
	// 	// }
	// });
	$.ajax({
        type: "post",
        data: param,
        url: api_path_config.api_path_3 + url,
        timeout : 3000,
        xhrFields:{
	      withCredentials: true
	    },
	    //crossDomain: true,
        success: function(data) {
   //      	if(typeof data != 'object') {
			// 	callback(JSON.parse(data));
			// } else {
			// 	callback(data);
			// }
			loginJudge(data, callback);
        },
		error: function(jqXHR, textStatus, errorThrown){ //请求完成后最终执行参数
	　　　　if(textStatus=='timeout'){//超时,status还有success,error等值的情况
	　　　　　  timeOutCallBack();

	　　　　}
	　　}
    });
}
function ajaxGet(url,id,param,callback) {
	if(!url) {
		url = '/gate.do';
	} 
	if(id) {
		param.id = id;
	}
	var param = {
		req: JSON.stringify(param)
	}
	// $.get(api_path_config.api_path_3 + url,param,function(data){
	// 	// if(data.isLogin) {
	// 		if(typeof data != 'object') {
	// 			callback(JSON.parse(data));
	// 		} else {
	// 			callback(data);
	// 		}
	// 	// } else {
			
	// 	// }
	// });
	$.ajax({
        type: "get",
        data: param,
        url: api_path_config.api_path_3 + url,
        xhrFields:{
	      withCredentials: true
	    },
	    //crossDomain: true,
        success: function(data) {
   //      	if(typeof data != 'object') {
			// 	callback(JSON.parse(data));
			// } else {
			// 	callback(data);
			// }
			loginJudge(data, callback);
        }
    });
}

function ajaxDlGet(id,param,callback) {
	if(id) {
		param.id = id;
	}
	var param = {
		req: JSON.stringify(param)
	}
	$.ajax({
        type: "get",
        data: param,
        url: api_path_config.wxdomainDL + "/gate.do",
        xhrFields:{
	      withCredentials: true
	    },
	    //crossDomain: true,
        success: function(data) {
   //      	if(typeof data != 'object') {
			// 	callback(JSON.parse(data));
			// } else {
			// 	callback(data);
			// }
			loginJudge(data, callback);
       }
    });
}


function ajaxPost4Autho(url,param,callback) {
	// $.post(api_path_config.api_path_2 + url,param,function(data){
	// 	// if(data.isLogin) {
	// 		if(typeof data != 'object') {
	// 			callback(JSON.parse(data));
	// 		} else {
	// 			callback(data);
	// 		}
	// 	// } else {
	// 		// redirectURL();
	// 	// }
	// });
	$.ajax({
        type: "post",
        data: param,
        url: api_path_config.api_path_2 + url,
        xhrFields:{
	      withCredentials: true
	    },
	    //crossDomain: true,
        success: function(data) {
   //      	if(typeof data != 'object') {
			// 	callback(JSON.parse(data));
			// } else {
			// 	callback(data);
			// }
			loginJudge(data, callback);
        }
    });
}

function ajaxGet4Autho(url,param,callback) {
	// $.get(api_path_config.api_path_2 + url,param,function(data){
	// 	// if(data.isLogin) {
	// 		if(typeof data != 'object') {
	// 			callback(JSON.parse(data));
	// 		} else {
	// 			callback(data);
	// 		}
	// 	// } else {
	// 		// redirectURL();
	// 	// }
	// });
	$.ajax({
        type: "get",
        data: param,
        url: api_path_config.api_path_2 + url,
        xhrFields:{
	      withCredentials: true
	    },
	    //crossDomain: true,
        success: function(data) {
   //      	if(typeof data != 'object') {
			// 	callback(JSON.parse(data));
			// } else {
			// 	callback(data);
			// }
			loginJudge(data, callback);
        }
    });
}
function ajaxWxAutho(url,param,callback) {
	$.get(api_path_config.api_path_4 + url,param,function(data){
		// if(data.isLogin) {
			if(typeof data != 'object') {
				callback(JSON.parse(data));
			} else {
				callback(data);
			}
		// } else {
			// redirectURL();
		// }
	});
}

//登录跨域ajax跳转
function ajaxGet4AuthoCR(url,param,callback) {
	$.ajax({
        type: "get",
        data: param,
        url: api_path_config.api_path_2 + url,
        xhrFields:{
	      withCredentials: true
	    },
	    //crossDomain: true,
        success: function(data) {
   //      	if(typeof data != 'object') {
			// 	callback(JSON.parse(data));
			// } else {
			// 	callback(data);
			// }
			loginJudge(data, callback);
        }
    });
}
//登录拦截
function loginJudge(data, callback) {
	if(typeof data != 'object') {
		var data = JSON.parse(data);
		if(data.code === '40002') {
			redirectURL();
		} else {
			callback(data);
		}
	} else {
		if(data.code === '40002') {
			redirectURL();
		} else {
			callback(data);
		}
	}
}
exports.ajaxPost = ajaxPost;
exports.ajaxPostTimeoutHandle = ajaxPostTimeoutHandle;
exports.ajaxGet = ajaxGet;
exports.post = ajaxPost;
exports.get = ajaxGet;
exports.ajaxPost4Autho = ajaxPost4Autho;
exports.ajaxGet4Autho = ajaxGet4Autho;
exports.ajaxGet4AuthoCR = ajaxGet4AuthoCR;
exports.ajaxWxAutho = ajaxWxAutho;
exports.redirectURL = redirectURL;
exports.ajaxPostAct = ajaxPostAct;
exports.ajaxDlGet = ajaxDlGet;
exports.ajaxPostWXDL = ajaxPostWXDL;
