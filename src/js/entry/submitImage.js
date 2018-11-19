var $ajax = require('../common/ajax.js');
var remSetting = require('../common/rem.js').remSetting;
var self_tpl = require('../module/tpl/team-tpl.js');
var myLayer = require('../common/layer.js');
var httpURL = require('../common/http-url.js');
var tmp_path_config = require('../../../tmp_path_config.js');
remSetting();
$(function () {
    var needId = 0;
    var needVoucher = 0;
    initUploader('#upload-up', true);
    initUploader('#upload-down1', true);
    initUploader('#upload-down2', true);
    var pramTwo = {

    };
    /**
    	agent_grade: "",
    	payment_amount: "",
    	payment_voucher: "",
    	picture_front: ""
    **/
    var flagMsg = 1;

    function checkData() {
        flagMsg = 1;
        pramTwo.name = $("#name").val().trim();
        pramTwo.mobile = $("#phone").val();
        pramTwo.desc = $("#liuyan").val();
        if (!pramTwo.mobile) {
            myLayer.open("请输入11位手机号码");
            flagMsg = 2;
            return;
        } else if (pramTwo.mobile.length < 11) {
            myLayer.open("请输入11位手机号码");
            flagMsg = 2;
            return;
        } else if (!(/^1\d{0,10}$/.test(pramTwo.mobile))) {
            myLayer.open("请输入11位手机号码");
            flagMsg = 2;
            return;
        };
        if (!pramTwo.name) {
            myLayer.open("请输入姓名");
            flagMsg = 2;
            return;
        }
        if (!(pramTwo.picture_url1 || pramTwo.picture_url1 || pramTwo.picture_url2)) {
            myLayer.open("请上传图片");
            flagMsg = 2;
            return;
        }
    };
    $("#next").on("click",function(){
        checkData();
        if (flagMsg == 2) {
            return;
        };
        $ajax.ajaxPostWXDL('/gate.do', "007000017", pramTwo, function (data) {
        // $ajax.ajaxPostWXDL("/gate.do", "007000017", pramTwo, function (data) {
            if (data.code == 10000) {
                myLayer.open("提交成功！！");
                setTimeout(function(){
                    location.reload();
                }, 1000);
            }
        })
    })
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
            fileSingleSizeLimit: 4 * 1024 * 1024
        });
        // $("#picker").mouseenter(function() {
        //  if (uploader) {
        //      uploader.refresh();
        //  }
        // });
        // 当有文件添加进来的时候
        uploader.on('fileQueued', function (file) {
            $img = $(targetID + ' .img-container img');
            // 创建缩略图
            uploader.makeThumb(file, function (error, src) {
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
        uploader.on("error", function (type) {
            if (type == "Q_TYPE_DENIED") {
                myLayer.open("请上传jpg,png,gif,jpeg格式文件！");
                //dialogMsg("myModal", "messageP", "请上传jpg,png,gif,jpeg格式文件");
            } else if (type == "F_EXCEED_SIZE") {
                myLayer.open("文件大小不能超过4M！");
                //dialogMsg("myModal", "messageP", "文件大小不能超过2M");
            }
        });
        // 文件上传过程中创建进度条实时显示。
        uploader.on('uploadProgress', function (file, percentage) {
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
        uploader.on('uploadSuccess', function (file, res) {
            layer.closeAll();
            if (!res.data) {
                myLayer.open("图片上传失败！");
                return;
            };
            var imgSrc = res.data;
            $img = $(targetID + ' .img-container img');
            if (imgSrc) {
                $img.attr('imgsrc', imgSrc);
                $img.attr('src', tmp_path_config.upload_path_in + imgSrc);
            };
            if (targetID == "#upload-up") {
                pramTwo.picture_url1 = imgSrc;
            }
            if (targetID == "#upload-down1") {
                pramTwo.picture_url2 = imgSrc;
            };
            if (targetID == "#upload-down2") {
                pramTwo.picture_url3 = imgSrc;
            };
        });
        // 文件上传失败，现实上传出错。
        uploader.on('uploadError', function (file) {
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
        uploader.on('uploadComplete', function (file) {
            $('#' + file.id).find('.progress').remove();
        });
        uploader.on('uploadBeforeSend', function (obj, data, headers) {
            $.extend(headers, {
                "Origin": tmp_path_config.wxdomain,
                "Access-Control-Request-Method": "POST"
            });
        });
    }
});
