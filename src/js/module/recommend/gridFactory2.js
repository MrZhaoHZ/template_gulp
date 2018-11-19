var self_tpl = require('./tpl2.js');
var localStorageTool = require('../../common/localStorage.js');
var imgSelect = require('../../common/img-select2.js');


function initBlankGrid(target, row, column) {
    var gridInfo = {
        row: row,
        column: column,
        blockWidth:100
    };
    blockInfo = [];
    temp = null;
    var id = 1;
    for(var i=0;i<gridInfo.row;i++){
        for(var j=0;j<gridInfo.column;j++) {
            temp = {
                id:[id],
                left_top_x: j,
                left_top_y: i,
                bottom_right_x: j+1,
                bottom_right_y: i+1
            };
            blockInfo.push(temp);
            id++;
            temp = null;
        }
    }
    gridInfo.blockInfo = blockInfo;
    target.html('').html(doT.template(self_tpl.blockTpl)(gridInfo))
                     .css({
                        width: gridInfo.column*100 + 'px',
                        height: gridInfo.row*100 + 'px'
                     });
    gridFactory.gridBlock.find('.virtual-grid-container,.grid-container').attr('data-row', gridInfo.row).attr('data-column', gridInfo.column);
    // if(!$('#grid-container').data('row'))
    // localStorageTool.setItem("gridInfo", JSON.stringify(gridInfo));  
    // localStorageTool.setItem("gridInfo", JSON.stringify(getReadyData()));  
}

function initGrid(target) {
    $.get('/getGrid.do',{id: ''},function(data){
        var temp = data;
        target.html(doT.template(self_tpl.editBlockTpl)(data.data))
        // .css({
        //                     width: data.data.column*100 + 'px',
        //                     height: data.data.row*100 + 'px'
        //                  });
        // initBlankGrid($('#virtual-grid-container'), data.data.row, data.data.column);
        // localStorageTool.setItem("gridInfo", JSON.stringify(data.data));  
    });
}


function mergeGrid() {
    //当前选中的格子信息
    var selected_grid = [];
    //当前选中的格子id
    var str = '';
    gridFactory.gridBlock.find('.grid-container span.active').each(function(index){
        selected_grid.push({id: $(this).data('id')});
        if(index != gridFactory.gridBlock.find('.grid-container span.active').length -1) {
            str += $(this).data('id') + ',';
        } else {
            str += $(this).data('id');
        }
    });
    var gridArray = str.split(',');
    //设置虚拟格子的active
    gridFactory.gridBlock.find('.virtual-grid-container span').removeClass('active');
    gridArray.forEach(function(item,i){
        gridFactory.gridBlock.find('.virtual-grid-container span[data-id="' + item + '"]').addClass('active');
    });
    // selected_grid.forEach(function(item,i){
    //     $('#virtual-grid-container span[data-id="' + item.id + '"]').addClass('active');
    // });


    //当前格子的n*m
    var row = gridFactory.gridBlock.find('.grid-container').attr('data-row');
    var column = gridFactory.gridBlock.find('.grid-container').attr('data-column');
    //most_left_top -----begin -----
    var most_left_top_grid = {};
    for(var i=1;i<=column;i++) {
        gridFactory.gridBlock.find('.virtual-grid-container .col' + i).each(function(){
            if($(this).hasClass('active')) {
                most_left_top_grid.id = $(this).data('id');
                most_left_top_grid.left_top_x = $(this).data('left_top_x');
                most_left_top_grid.left_top_y = $(this).data('left_top_y');
                // most_left_top_grid.bottom_right_x = $(this).data('bottom_right_x');
                // most_left_top_grid.bottom_right_y = $(this).data('bottom_right_y');
                return false;
            }
        });
        if(most_left_top_grid.id != null) {
            break;
        }
    }

    //most_left_top -----end -----


    //most_bottom_right ----- begin -----
    
    var most_bottom_right_grid = {};
    var temp = null;
    for(var i=row*column;i>0;i--){
        temp = gridFactory.gridBlock.find('.virtual-grid-container span[data-id="' + i + '"]');
        if(temp.hasClass('active')) {
            most_bottom_right_grid.id = temp.data('id');
            most_bottom_right_grid.left_top_x = temp.data('left_top_x');
            most_bottom_right_grid.left_top_y = temp.data('left_top_y');
            most_bottom_right_grid.bottom_right_x = temp.data('bottom_right_x');
            most_bottom_right_grid.bottom_right_y = temp.data('bottom_right_y');
            break;
        }
    }
    //most_bottom_right ----- end -----
    if(most_left_top_grid.left_top_x > most_bottom_right_grid.left_top_x) {
        layer.msg("当前选择无法合并");
        return;
    } else {
        if(most_left_top_grid.left_top_x === most_bottom_right_grid.left_top_x && most_left_top_grid.left_top_y === most_bottom_right_grid.left_top_y) {
            layer.msg("当前选择无法合并");
        }
        //开始合并-------->>>
        //有效区域内的格子数
        var total_grid_sum = Math.abs(most_bottom_right_grid.bottom_right_x - most_left_top_grid.left_top_x)*Math.abs(most_bottom_right_grid.bottom_right_y - most_left_top_grid.left_top_y);
        //有效区域内active的格子数
        var active_grid_sum = 0;
        var temp = null;
        gridFactory.gridBlock.find('.virtual-grid-container span.active').each(function(){
            var this_left_top_x = $(this).data('left_top_x');
            var this_left_top_y = $(this).data('left_top_y');
            if(this_left_top_x >= most_left_top_grid.left_top_x && this_left_top_x <= most_bottom_right_grid.left_top_x && this_left_top_y >= most_left_top_grid.left_top_y && this_left_top_y <= most_bottom_right_grid.left_top_y) {
                active_grid_sum++;
            }
        });
        
        if(total_grid_sum === active_grid_sum && total_grid_sum === gridFactory.gridBlock.find('.virtual-grid-container span.active').length) {
            //开始合并
            //取得可以合并的格子id
            var avail_grid_id = [];
            gridFactory.gridBlock.find('.virtual-grid-container span').each(function(){
                var this_left_top_x = $(this).data('left_top_x');
                var this_left_top_y = $(this).data('left_top_y');
                if(this_left_top_x >= most_left_top_grid.left_top_x && this_left_top_x <= most_bottom_right_grid.left_top_x && this_left_top_y >= most_left_top_grid.left_top_y && this_left_top_y <= most_bottom_right_grid.left_top_y) {
                    avail_grid_id.push($(this).data('id'));
                }
            });
            // avail_grid_id.forEach(function(item,i){
            //     $('#grid-container span[data-id="' + item + '"]').remove();
            // });
            // $('#grid-container span[data-id="' + gridArray.join(",") + '"]').remove();
            selected_grid.forEach(function(item,i){
                gridFactory.gridBlock.find('.grid-container span[data-id="' + item.id + '"]').remove();
            });
            // $('#grid-container span[data-id="' + gridArray.join(",") + '"]').remove();
            //构造新格子
            var merge_grid = {
                id: avail_grid_id,
                left_top_x: gridFactory.gridBlock.find('.virtual-grid-container span[data-id="' + avail_grid_id[0] + '"]').data('left_top_x'),
                left_top_y: gridFactory.gridBlock.find('.virtual-grid-container span[data-id="' + avail_grid_id[0] + '"]').data('left_top_y'),
                bottom_right_x: gridFactory.gridBlock.find('.virtual-grid-container span[data-id="' + avail_grid_id[avail_grid_id.length-1] + '"]').data('bottom_right_x'),
                bottom_right_y: gridFactory.gridBlock.find('.virtual-grid-container span[data-id="' + avail_grid_id[avail_grid_id.length-1] + '"]').data('bottom_right_y'),
                blockWidth: 100
            };
            gridFactory.gridBlock.find('.grid-container').append(doT.template(self_tpl.singleBlockTpl)(merge_grid));
            // initBlankGrid($('#virtual-grid-container'), $('#virtual-grid-container').data('row'), $('#virtual-grid-container').data('column'));
            //把当前格子的排列信息放到缓存
            localStorageTool.setItem("gridInfo", JSON.stringify(getReadyData()));  
        } else {
            // initBlankGrid($('#virtual-grid-container'), $('#virtual-grid-container').data('row'), $('#virtual-grid-container').data('column'));
            layer.msg("当前选择无法合并");
        }
    }
}
/** 判断item是否存在于数组中
 *  item:元素
 *  itemArray: 元素数组
***/
function inArray(item, itemArray) {
    var isExist = false;
    for(var i=0;i<itemArray.length;i++) {
        if(item === itemArray[i]) {
            isExist = true;
            break;
        }
    }
    return isExist;
}

//当前格子的排列信息
function getReadyData() {
    var saveGridInfo = {};
    //格子序列
    var grid_queue = [];
    //按照1到row*column
    //已经计算过的id
    var ready_id = [];
    //当前格子的n*m
    var row = gridFactory.gridBlock.find('.grid-container').attr('data-row');
    var column = gridFactory.gridBlock.find('.grid-container').attr('data-column');
    for(var i=1;i<=row*column;i++){
        gridFactory.gridBlock.find('.grid-container span').each(function(){
            var curr_block = $(this);
            //当前块的id
            var curr_id = (curr_block.data('id')+'').split(",");
            if(!inArray(i+'',ready_id) && inArray(i+'',curr_id)) {
                for(var j=0;j<curr_id.length;j++) {
                    ready_id.push(curr_id[j]);
                }
                var singleBlock = {
                    ids: curr_id,
                    left_top_x: curr_block.data('left_top_x'),
                    left_top_y: curr_block.data('left_top_y'),
                    bottom_right_x: curr_block.data('bottom_right_x'),
                    bottom_right_y: curr_block.data('bottom_right_y'),
                    image_url: curr_block.find('img').attr('src'),
                    target_url: curr_block.attr('imghref')
                };
                grid_queue.push(singleBlock);
                // private Long gridId;
                // private Integer leftTopX;
                // private Integer leftTopY;
                // private Integer bottomRightX;
                // private Integer bottomRightY;
                // private String imageUrl;
                // private String targetUrl;
                // private Date gmtCreated;
                // private Date gmtModified;
                // private Integer deleteMark;
                // private List<Integer> ids;
            }
        });
    }
    saveGridInfo.grid_row = row;
    saveGridInfo.grid_column = column;
    saveGridInfo.grid_list = grid_queue;
    return saveGridInfo;
}
function validateGrid(n) {
    gridFactory.gridBlock = $(n);
    //首先判断每个格子中是否已配置图片
    if(gridFactory.gridBlock.find('.grid-container span img').length === 0 || gridFactory.gridBlock.find('.grid-container span').length != gridFactory.gridBlock.find('.grid-container span img').length) {
        layer.msg("请先配置格子块的图片");
        return false;
    }
    return true;
}
function saveGrid() {
    var saveGridInfo = getReadyData();
    return saveGridInfo;
}

function bindEvent() {
    // $('body').undelegate('.grid-container span','click').delegate('.grid-container span','click',function(){
    //     $(this).toggleClass('active');
    // });
    // $('.grid-container').undelegate('span','click').delegate('span','click',function(){
    //     $(this).toggleClass('active');
    // });
    //生成格子
    //produceGrid();
    // $('body').undelegate('.produce-grid-btn','click').delegate('.produce-grid-btn','click',function(){
    //     //当前操作的grid块
    //     gridFactory.gridBlock = $(this).closest('.block-grid-container');
    //     initBlankGrid(gridFactory.gridBlock.find('#grid-container'), gridFactory.gridBlock.find('input[name=row-num]').val(), gridFactory.gridBlock.find('input[name=column-num]').val());
    //     initBlankGrid(gridFactory.gridBlock.find('#virtual-grid-container'), gridFactory.gridBlock.find('input[name=row-num]').val(), gridFactory.gridBlock.find('input[name=column-num]').val());
    //     gridFactory.gridBlock.find('.btn-container').show(); 
    // });
    $('.produce-grid-btn').unbind('click').click(function(){
        //当前操作的grid块
        gridFactory.gridBlock = $(this).closest('.block-grid-container');
        initBlankGrid(gridFactory.gridBlock.find('.grid-container'), gridFactory.gridBlock.find('input[name=row-num]').val(), gridFactory.gridBlock.find('input[name=column-num]').val());
        initBlankGrid(gridFactory.gridBlock.find('.virtual-grid-container'), gridFactory.gridBlock.find('input[name=row-num]').val(), gridFactory.gridBlock.find('input[name=column-num]').val());
        gridFactory.gridBlock.find('.btn-container').show(); 
    });
    //合并格子
    // $('#merge-grid-btn').click(function(){
    //     if($('#grid-container span.active').length < 2) {
    //         layer.msg("至少选择两个格子才能合并");
    //         return false;
    //     }
    //     mergeGrid();
    // });
    $('.merge-grid-btn').unbind('click').click(function(){
        gridFactory.gridBlock = $(this).closest('.block-grid-container');
        if(gridFactory.gridBlock.find('.grid-container span.active').length < 2) {
            layer.msg("至少选择两个格子才能合并");
            return false;
        }
        mergeGrid();
    });
    //全选
    $('.select-all-grid-btn').unbind('click').click(function(){
        gridFactory.gridBlock = $(this).closest('.block-grid-container');
        gridFactory.gridBlock.find('.grid-container span').removeClass('active').addClass('active');
    });
    
    //重置格子
    $('.reset-grid-btn').unbind('click').click(function(){
        gridFactory.gridBlock = $(this).closest('.block-grid-container');
        initBlankGrid(gridFactory.gridBlock.find('.grid-container'), gridFactory.gridBlock.find('input[name=row-num]').val(), gridFactory.gridBlock.find('input[name=column-num]').val());
        initBlankGrid(gridFactory.gridBlock.find('.virtual-grid-container'), gridFactory.gridBlock.find('input[name=row-num]').val(), gridFactory.gridBlock.find('input[name=column-num]').val());
    }); 

    //保存格子
    // $('#save-grid-btn').click(function(){
    //     saveGrid();
    // });

    //预览格子
    // $('#preview-grid-btn').click(function(){
    //     //iframe层
    //     layer.open({
    //       type: 2,
    //       title: '预览',
    //       shadeClose: true,
    //       shade: 0.8,
    //       area: ['414px', '736px'],
    //       content: 'http://192.168.8.169:3000/html/recommend/preview.html' //iframe的url
    //     }); 
    // });

    //上传图片
    imgSelect.initModal();
    $('.grid-container').undelegate('span','click').delegate('span','click',function(){
        $(this).toggleClass('active');
        gridFactory.gridBlock = $(this).closest('.block-grid-container');
        if(gridFactory.gridBlock.find('.upload-img-switch').hasClass('active')){
            $(this).siblings('.active').removeClass('active');
            // imgSelect.initModal();
            if($(this).hasClass('active')) {
                imgSelect.show(gridFactory.gridBlock);
            }
        }
        
        // if(gridFactory.gridBlock.find('.upload-img-switch').hasClass('active') && $(this).hasClass('active')) {
        //     imgSelect.show();
        // }
    });

    // $('#uploadNewImg').click(function() {
    //     $('#mySelectModal').modal('hide');
    //     $('#newImgModal').modal('show');
    //     //initUploader();
    // });
}
function init() {
    bindEvent();
    //type=edit
    // if(location.href.substr(location.href.indexOf("type=")+5) === "edit") {
    //     initGrid($('#grid-container'));
    // }
}
var gridFactory = {
    init: init,
    validateGrid: validateGrid,
    saveGrid: saveGrid,
    bindEvent: bindEvent
}
module.exports = gridFactory;