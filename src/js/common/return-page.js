function returnPageWithUrl(url) {
	setTimeout(function(){
		pushHistory();
	 window.addEventListener("popstate", function(e) {
	 	window.location = url;
	 }, false);
	 function pushHistory() {
	 	var state = {
	 		title: "title",
	 		url: "#"
	 	};
	 	window.history.pushState(state, "title", "#wechat_redirect");
	 }
	},500)
	 
}
function closeWindow() {
	 pushHistory();
	 window.addEventListener("popstate", function(e) {
	 	WeixinJSBridge.call('closeWindow');
	 }, false);
	 function pushHistory() {
	 	var state = {
	 		title: "title",
	 		url: "#"
	 	};
	 	window.history.pushState(state, "title", "#wechat_redirect");
	 }
}
exports.closeWindow = closeWindow;
exports.returnPageWithUrl = returnPageWithUrl;