
var remSetting = require('../common/rem.js').remSetting;
$(function() {
    remSetting();
     var swiper = new Swiper('.swiper-container', {
     	nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        pagination: '.swiper-pagination',
        slidesPerView: 3,
        paginationClickable: true,
        spaceBetween: 30,
        freeMode: true
    });
     $(".swiper-wrapper").on("click",".swiper-slide",function(){
     	var index = $(this).index();
     	$(".swiper-wrapper .swiper-slide .border").css("display","none");
     	$(".swiper-wrapper .swiper-slide").css("border","0.02rem solid #ccc");
     	$(this).find(".border").css("display","inline-block");
     	$(this).css("border","0.02rem solid #66c300");
     })
});
