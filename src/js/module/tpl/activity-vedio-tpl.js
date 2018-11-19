var self_tpl = {
	'vedioActTpl': '{{~ it.data.data:item}}\
        <div class="vedioBox" dataId="{{item.id}}">\
            <div class="dianzan">\
                <span class="num">{{item.id}}</span>\
                <span class="hao">号</span>\
                <span class="shu"></span>\
                <div class="clickBtn">\
                    <img class="hertNmu" src="./hert.png" alt="">\
                    <span class="hert">{{item.like_count}}</span>\
                </div>\
            </div>\
        </div>	\
    {{~}}',
    'imageList': '{{~ it:item:index}}\
        <div class="vedioBox" dataId="{{= item.id}}">\
            <div class="vidBox">\
            <a href="{{= it.url}}{{= item.id}}">\
                <img src="{{= it.image_prefix}}id_{{= item.id}}.jpg" _idNum="{{= item.id}}" id="imgFun" class="imgHeader">\
            </a>\
            </div>\
            <div class="dianzan">\
                <span class="num">{{= item.id}}</span>\
                <span class="hao">号</span>\
                <span class="shu"></span>\
                <div class="clickBtn">\
                    <img class="hertNmu" src="../images/hert1.png" alt="" />\
                    <span class="hert">{{= item.like_count}}</span>\
                </div>\
            </div>\
        </div>\
    {{~}}'
};
module.exports = self_tpl;