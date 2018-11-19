var self_tpl = require('./tpl.js');
//5*5
// var gridInfo = {row:4,column:5,blockWidth:100},
//     blockInfo = [],
//     temp = null;
// initGrid(gridInfo.row, gridInfo.column);
// gridInfo.blockInfo = blockInfo;
// function initGrid(row, column) {
//     for(var i=0;i<gridInfo.row;i++){
//         for(var j=0;j<gridInfo.column;j++) {
//             temp = {
//                 id:1,
//                 top_left_x: j,
//                 top_left_y: i,
//                 bottom_right_x: j+1,
//                 bottom_right_y: i+1
//             };
//             blockInfo.push(temp);
//             temp = null;
//         }
//     }
//     gridInfo.blockInfo = blockInfo;
//     $('#block-container').html(doT.template(self_tpl.blockTpl)(gridInfo))
//                      .css({
//                         width: gridInfo.column*100 + 'px',
//                         height: gridInfo.row*100 + 'px'
//                      });
// }

// $('#block-container').css({
//     'left': '50%',
//     'margin-left': '-' + (gridInfo.blockWidth*gridInfo.column)/2+ 'px'
// });
// $('#block-container').css({
//     'left': (1200-gridInfo.column*100)/2 + 'px'
// });

$('#block-container').delegate('span','click',function(){
    $(this).toggleClass('active');
});
//最左边的块和最右边的块之间的块个数必须等于。。。

function bindEvent() {
    console.log('9k');
    $('#produce-grid-btn').click(function(){
        alert('ok');
    });
    // $('#produce-grid-btn').click(function(){
    //     var gridInfo = {
    //         row: $['input[name=row-num]'].val(),
    //         column:$['input[name=column-num]'].val(),
    //         blockWidth:100
    //     };
    //     blockInfo = [];
    //     temp = null;
    //     for(var i=0;i<gridInfo.row;i++){
    //         for(var j=0;j<gridInfo.column;j++) {
    //             temp = {
    //                 id:1,
    //                 top_left_x: j,
    //                 top_left_y: i,
    //                 bottom_right_x: j+1,
    //                 bottom_right_y: i+1
    //             };
    //             blockInfo.push(temp);
    //             temp = null;
    //         }
    //     }
    //     gridInfo.blockInfo = blockInfo;
    //     $('#block-container').html(doT.template(self_tpl.blockTpl)(gridInfo))
    //                      .css({
    //                         width: gridInfo.column*100 + 'px',
    //                         height: gridInfo.row*100 + 'px'
    //                      });
    // });
}
function init() {
    bindEvent();
}
var gridFactory = {
    init: init
}
module.exports = gridFactory;