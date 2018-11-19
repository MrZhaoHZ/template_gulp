function remSetting(isHd) {
    var deviceWidth = document.documentElement.clientWidth;
    if (deviceWidth > 750) deviceWidth = 750;
    document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
    if(!isHd){
    	$('.Hd').removeClass('Hd');
    }
}

exports.remSetting = remSetting;
