// 判断浏览器是否是移动端
function isMobile() {
	return navigator.userAgent.match(/(iphone|ipad|ipod|ios|android|mobile|blackberry|iemobile|mqqbrowser|juc|fennec|wosbrowser|browserng|Webos|symbian|windows phone)/i);
}

function getEventType() {
	return isMobile() ? 'touchend' : 'click';
}


module.exports = {
	getEventType: getEventType
}