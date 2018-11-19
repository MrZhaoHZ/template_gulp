function open(msg) {
	layer.open({
		content: msg
		,skin: 'msg'
		,time: 2 //2秒后自动关闭,
		// ,fixed: false
		// ,top: -250
		// ,anim: false
	});
}
function openLongTime(msg) {
	layer.open({
		content: msg
		,skin: 'msg'
		,time: 5 //2秒后自动关闭,
		// ,fixed: false
		// ,top: -250
		// ,anim: false
	});
}

exports.open = open;
exports.openLongTime = openLongTime;