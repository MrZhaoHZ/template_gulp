function btnCtrl(event, callback) {
	var target = $(event.target);
	var oldColor = target.css('background-color');
	if(target.hasClass('btn-trigging')) {
		return;
	} else {
		target.addClass('btn-trigging');
		target.css({'background-color': 'gray'});
		callback(target);
		setTimeout(function(){
			target.removeClass('btn-trigging');
			target.css({'background-color': oldColor});
		},4000);
	}
}


module.exports = {
	btnCtrl: btnCtrl
}