var $ajax = require('../../common/ajax.js');
var remSetting = require('../../common/rem.js').remSetting;
var self_tpl = require('../../module/tpl/team-tpl.js');
var myLayer = require('../../common/layer.js');
var httpURL = require('../../common/http-url.js');
var tmp_path_config = require('../../../../tmp_path_config.js');
remSetting();
$(function() {
	var idFont= httpURL.getQueryString('idFont');
	var agent_grade = httpURL.getQueryString('agent_grade');
	var needId = 0;
	var needVoucher = 0;
	$ajax.ajaxPost(null, "003000019", { agent_grade: agent_grade},
		function(data){
		   if(data.success){
				// if (data.data.need_i_d_card == 0 && !idFont) {
					needId = 1;
					$(".basic_info").css("display", "block");
					$(".id_div").css("display", "block");
					initUploader('#upload-up', true);
					//initUploader('#upload-down', false);
				// };
				$("#need_money").text("升级到该级别至少需要" + data.data.upgrade_amount/100 + "元");
				if(data.data.payment_voucher == 0){
					needVoucher = 1;
					$(".basic_info").css("display", "block");
					$(".up-load-id:last-child").css("display", "block");
					initUploader('#upload-down', false);
					
				}else{
					$(".basic_info").css("display", "block");
					$("#nextTwo").css({
						    position: "absolute",
							left: "0.26rem",
							bottom: "-1rem"
					});	
					// getDetailData();
					// $(".submit_success").css("display", "block");
				};
		   }else{
		   	myLayer.open("系统异常，请稍后重试！");
		   }
		   // else{
		   //      $(".err-warning").css("display", "block");
		   //  }
	});
	var pramTwo = {
		agent_grade: ""
	};
	pramTwo.agent_grade = agent_grade;
	/**
		agent_grade: "",
		payment_amount: "",
		payment_voucher: "",
		picture_front: ""
	**/
	var flagMsg = 1;
	function checkData(){
		flagMsg = 1;
		// if (needId == 1) {
			pramTwo.authon_personalid = $("#id_num").val().trim();
			var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
			if(!reg.test(pramTwo.authon_personalid)){
				myLayer.open("请输入正确身份证号码");
				flagMsg = 2;
    			return;
			};
			// if (pramTwo.authon_personalid) {
	  //   		msg = "请输入18位身份证号码";
	  //   		return;
	  //   	}else{
				
			// };
			if (!pramTwo.picture_front) {
				myLayer.open("请上传身份证正面照！");
				flagMsg = 2;
				return;
			};
		// };
		pramTwo.payment_amount = $("#monery_num").val().trim();
		if (!pramTwo.payment_amount) {
			myLayer.open("请输入授权金额");
			flagMsg = 2;
			return;
		};
		if(!(/^[0-9]+$/.test(pramTwo.payment_amount))){ 
             myLayer.open("授权金额只能是数字");
             flagMsg = 2;
              return;
         };
		if (needVoucher == 1) {
			if (!pramTwo.payment_voucher) {
				myLayer.open("请上传您向上级的打款截图");
				flagMsg = 2;
				return;
			};
		};
	};
//	 $("#nextTwo").click(function(){
//		checkData();
//		if(flagMsg == 2){
//			return;
//		};
//		$ajax.ajaxPost(null, "003000012", pramTwo, 
//			function(data){
//				if(data.code == 10000){
//					$(".basic_info").css("display", "none");
//					$(".submit_success").css("display", "block");
//					getDetailData();
//					// if(){
//					//     $(".basic_info .id_class").css("display","none");
//					//     $(".basic_info .money_class").css("display","none");
//					// };
//				};
//				if (data.code == "30045") {
//					myLayer.open(data.msg);
//				};
//				if (data.code == "30046") {
//					myLayer.open(data.msg);
//				};
//		});
//	});
	$('#nextTwo').click(function(e) {
		require('../../common/btn-trigger.js').btnCtrl(e, function(target){
			checkData();
			if(flagMsg == 2){
				return;
			};
			$ajax.ajaxPost(null, "003000012", pramTwo, 
				function(data){
					if(data.code == 10000){
						myLayer.open("提交成功！");
						setTimeout(function () {
							window.location.href = "team-my-upgrade-success.html"
					    }, 1000);
					}else if (data.code == "30045") {
						myLayer.openLongTime(data.msg);
					}else if (data.code == "30046" || data.code == "20002") {
						myLayer.openLongTime(data.msg);
					}else {
						if(data.msg){
							myLayer.open(data.msg.substring(0,40));
						}else{
							myLayer.open(data.substring(0,40));
						};
					}
			});
		});
	});

	// 身份证号校验
	$("#id_num").keyup(function(){
		var num = $("#id_num").val();
		if(num.length == 15 || num.length == 18){
			console.log(isCardNo(num));
		}
		
	})
	function isCardNo (card)  
	{  
		//身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
		var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;  
		if(reg.test(card) === false)  
		{
			return false;  
		}
		return true;  
	};

   // 优化retina, 在retina下这个值是2
	var ratio = window.devicePixelRatio || 1,
		// 缩略图大小
		thumbnailWidth = 100 * ratio,
		thumbnailHeight = 100 * ratio,
		// Web Uploader实例
		uploader;

	function initUploader(targetID, flag) {
		// $('#uploader-container').html('<div id="gridFileList"></div><div id="picker">选择图片</div>');
		// 初始化Web Uploader
		uploader = WebUploader.create({
			// 自动上传。
			auto: true,
			// swf文件路径
			//swf: BASE_URL + '/js/Uploader.swf',
			// 文件接收服务端。
			// server: 'http://media.haiyn.com/upload.php',
			// formData: {
			// 	user_id: 1,
			// 	biz_code: 'hanshu'
			// },
			server: tmp_path_config.api_path_3 + '/gate.do?req={"id":"004000006"}',
			// server: tmp_path_config.api_path_3 + '/gate.do',
			formData: {
				// req: JSON.stringify({id:'004000006'})
				//id: 'ok'
			},
			// 选择文件的按钮。可选。
			// 内部根据当前运行是创建，可能是input元素，也可能是flash.
			pick: {
				id: targetID, //'#upload-up',
				multiple: false
			},
			// 只允许选择文件，可选。
			accept: {
				title: 'Images',
				extensions: 'gif,jpg,jpeg,png,GIF,JPG,JPEG',
				// mimeTypes: 'image/*'
				mimeTypes: 'image/jpg,image/png'
			},
			 fileSingleSizeLimit:4*1024*1024
		});
		// $("#picker").mouseenter(function() {
		//  if (uploader) {
		//      uploader.refresh();
		//  }
		// });
		// 当有文件添加进来的时候
		uploader.on('fileQueued', function(file) {
			$img = $(targetID +' .img-container img');
			// 创建缩略图
			uploader.makeThumb(file, function(error, src) {
				if (error) {
					// $img.replaceWith('<span>不能预览</span>');
					return;
				}
				//$img.attr('src', src);
			}, thumbnailWidth, thumbnailHeight);
			//loading带文字
			layer.open({
				shadeClose: false,
				type: 2,
				content: '图片上传中'
			});
		});
		// 判断文件的类型 大小
		uploader.on("error", function(type) {
			if(type == "Q_TYPE_DENIED") {
				myLayer.open("请上传jpg,png,gif,jpeg格式文件！");
				//dialogMsg("myModal", "messageP", "请上传jpg,png,gif,jpeg格式文件");
			} else if(type == "F_EXCEED_SIZE") {
				myLayer.open("文件大小不能超过4M！");
				//dialogMsg("myModal", "messageP", "文件大小不能超过2M");
			}
		});
		// 文件上传过程中创建进度条实时显示。
		uploader.on('uploadProgress', function(file, percentage) {
			var $li = $('#' + file.id),
				$percent = $li.find('.progress span');

			// 避免重复创建
			if (!$percent.length) {
				$percent = $('<p class="progress"><span></span></p>')
					.appendTo($li)
					.find('span');
			}
			$percent.css('width', percentage * 100 + '%');
		});
		// 文件上传成功，给item添加成功class, 用样式标记上传成功。
		uploader.on('uploadSuccess', function(file, res) {
			layer.closeAll();
			if(!res.data){
				myLayer.open("图片上传失败！");
				return;
			};
			var imgSrc = res.data;
			$img = $(targetID +' .img-container img');
			if(imgSrc) {
				$img.attr('imgsrc', imgSrc);
				$img.attr('src', tmp_path_config.upload_path_h5 + imgSrc);
			};
			if (targetID == "#upload-up") {
				pramTwo.picture_front = imgSrc;
				$("#reuploader_id").css("display", "block");
				$("#id-prompt").text("请确认上传身证号码和姓名与提交信息一至，非一至将会被拒绝；");
			} 
			if (targetID == "#upload-down") {
				pramTwo.payment_voucher = imgSrc;
				$("#reuploader_voncher").css("display", "block");
				$("#img-prompt").text("请确认打款金额，审核通过后代理可能过授权金额进行系统下单；");
			};
		});
		// 文件上传失败，现实上传出错。
		uploader.on('uploadError', function(file) {
			layer.closeAll()
			myLayer.open("图片上传失败！");
			var $li = $('#' + file.id),
				$error = $li.find('div.error');
			// 避免重复创建
			if (!$error.length) {
				$error = $('<div class="error"></div>').appendTo($li);
			}
			$error.text('上传失败');
		});
		// 完成上传完了，成功或者失败，先删除进度条。
		uploader.on('uploadComplete', function(file) {
			$('#' + file.id).find('.progress').remove();
		});
		uploader.on('uploadBeforeSend', function(obj, data, headers) {
			$.extend(headers, {
				"Origin":  tmp_path_config.wxdomain,
				"Access-Control-Request-Method": "POST"
			});
		});
		// $('#grid-confirm-upload').click(function() {
		//  //console.log("上传...");
		//  if (uploader) {
		
		//      uploader.upload();
		//  }
		// });
		// $('#uploadUp .webuploader-element-invisible').click();
	}

	// $('#uploadUp').click(function(){
	//  initUploader();
	// });
   

});
