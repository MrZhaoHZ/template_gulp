var remSetting = require('../common/rem.js').remSetting;
var $ajax = require('../common/ajax.js');
var self_tpl = require('../module/tpl/dele-register-tpl.js');
var httpURL = require('../common/http-url.js');
var layer = require('../common/layer.js');
var string2object = require('../common/jsonstring2object.js');
var tmp_path_config = require('../../../tmp_path_config.js');
remSetting();
$(function() {

  var tpl = '{{~ it.data:item:index }}\
              <div class="swiper-slide">\
                <img class="user-pic" src="{{? item.image_uri.indexOf("http") == -1}}{{= it.image_prefix}}{{?}}{{= item.image_uri}}" alt="">\
              </div>\
            {{~}}';
  function carouseImg() {
    $ajax.ajaxPost(null, "005000001", {},
      function(data){
        if (data.success) {
            data.image_prefix = tmp_path_config.upload_path;
            $('.swiper-container1 .swiper-wrapper').append(doT.template(tpl)(data));
            var swiper = new Swiper('.swiper-container1', {
              pagination: '.swiper-pagination',
              paginationClickable: true,
              loop: true,
              autoplay: 2000,
              autoplayDisableOnInteraction : false
            });
        };
      });

    // $ajax.ajaxPost('/commodity/category/list.do',{},function(data){
    //   if (data.code == "10000") {
    //     $('.swiper-container1 .swiper-wrapper').append(doT.template(tpl)(data.data));
    //   };
    // });
  };
  carouseImg();

  var pram = {
    open_id: "",
    agent_grade: "",
    real_name: "",
    mobile: "",
    wechat_id: "",
    remark: ""
  };
  var wxCode = httpURL.getQueryString('code');
  $ajax.ajaxWxAutho('/wechat/userinfo.do',{code: wxCode},function(data){
      pram.open_id = data.openid;
      $.fn.cookie('openid',data.openid);
      $.fn.cookie('headimgurl',data.headimgurl);
      $('#user-pic').attr('src',data.headimgurl);
  });
    
    
     var mySwiper = new Swiper('.choose .swiper-container2', {
     	nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        pagination: '.swiper-pagination',
        slidesPerView: 3,
        paginationClickable: true,
        spaceBetween: 30,
        freeMode: true

    });
     $("#swiper-wrapper").on("click",".swiper-slide",function(){
     	  var index = $(this).index();
        pram.agent_grade = $(".choose .swiper-slide").eq(index).attr("agent_grade");
        $(".remark").html($(this).find(".hide_div").html());
     	  $(".swiper-wrapper .swiper-slide .border").css("display","none");
     	  $(".swiper-wrapper .swiper-slide").css("border","0.02rem solid #ccc");
     	  $(this).find(".border").css("display","inline-block");
     	  $(this).css("border","0.02rem solid #66c300");
     });
     var info;
     getLevelData();
      function getLevelData(){
             // 可选代理类型
          $ajax.ajaxPost(null, "003000017", { member_id: ""}, 
            function(data){
              if (data.code == "10000") {
                  $(".swiper-container2 .swiper-wrapper").html(doT.template(self_tpl.getDeltRegisterApplyTpl)(data.data.des));
                mySwiper.updateSlidesSize();
              };
              if (data.code == "30044" || data.code == "30046" || data.code == "30047" ||data.code == "30048" || data.code == "30049" || data.code == "30050") {
                layer.open(data.msg);
              };
            });
      };
      // 数据校验
      // $("#phone").keyup(function(){
      //     var phone = $("#phone").val();
      //     if(!(/^\d{0,11}$/.test(phone))){ 
      //         $("#phone").val("");
      //     };
      //     if ($("#phone").val().length == 11) {
      //        if(!(/^1[34578]\d{0,9}$/.test(phone))){ 
      //           $("#phone").val("");
      //        };
      //     };
      // });
     // $("#name").keydown(function(){
     //    var name = $("#name").val();
     //    if(!(/^[\u4e00-\u9fa5]$/.test(name))){ 
     //            $("#name").val("");
     //         };
     // });
      // 收集数据
      $(".next").on("click", function(){
           pram.open_id = "wxfjc123";
          collect();
          if (msg) {
            layer.open(msg);
            return;
          };
          $ajax.ajaxPost(null, "003000025", { mobile: pram.mobile},
            function(data){
              	if(data.code == "30065"){
              		layer.open(data.msg);
              	};
              	if(data.code == "30056"){
              		layer.open(data.msg);
              	};
              	if(data.code == "30047"){
              		layer.open(data.msg);
              	};
              	if(data.code == "30049"){
              		layer.open(data.msg);
              	};
                if (data.code == "30066") {
                   $ajax.ajaxPost(null, "003000021", pram,
                      function(data){
                          if (data.success) {
                          	layer.open("提交成功!");
                          	setTimeout(function(){
                          		WeixinJSBridge.call('closeWindow');
                          	},1000);
                          	
                          };
                    });
                };
          });
          
      });
      var msg = "";
      function collect() {
          msg = "";
          if (!pram.agent_grade) {
            msg = "请选择代理类型";
            return;
          }
          pram.real_name = $("#name").val().trim();
          if (!pram.real_name) {
            msg = "请输入姓名";
            return;
          } else if(pram.real_name.length <2){
            msg = "姓名不可小于2位";
            return;
          };
//       if(!(/^[\u4e00-\u9fa5]+$/.test(pram.real_name))){ // 只能输入汉字
//            $("#name").val("");
//            msg = "姓名仅支持汉字";
//            return;
//      };
          pram.mobile = $("#phone").val().trim();
          // if (!pram.mobile) {
          //   msg = "请输入手机号";
          //   return;
          // };
          
         if(!(/^1[34578]\d{9}$/.test(pram.mobile))){ 
            $("#phone").val("");
            msg = "请输入11位手机号码";
            return;
         };
          
          pram.wechat_id = $("#weChat").val().trim();
          if (!pram.wechat_id) {
            msg = "请输入微信号";
            return;
          };
          if(pram.wechat_id.length <6){
            msg = "请输入6-15位微信号!";
            return;
          };
          var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
          if(reg.test(pram.wechat_id)){
            msg = "微信号支持数字、英文、特殊字符";
            return;
          };
          pram.remark = $("#remark").val().trim();
      };
     
});