//依赖：<script src="@static_path/libs/zeroClipboard/ZeroClipboard.min.js"></script>
// var copyLink = function(target) {
// 	target.click(function(){
// 		// 添加复制功能
// 		var client = new ZeroClipboard($(this));
// 		client.on('ready', function() {
// 			client.on('copy', function(event) {
// 				var $self = $(event.target);

// 				if ($self.attr('data-linkhref')) {
// 					event.clipboardData.setData('text/plain', $self.attr('data-linkhref'));
// 					return;
// 				}
// 			});
// 			client.on('aftercopy', function() {
// 				layer.msg('商品链接复制成功!');
// 			});
// 		});
// 	});
// }




var copyLink = function(parentDomFlag, targetDomFlag) {
	$(parentDomFlag).delegate(targetDomFlag, 'click', function(){
		layer.tips('<span class="copy-btn">复制</span>', $(this));
		$('.copy-btn').attr('data-linkhref', $(this).attr('data-linkhref'));
		//添加复制功能
		var client = new ZeroClipboard($('.copy-btn'));
		client.on('ready', function() {
			client.on('copy', function(event) {
				var $self = $(event.target);
				if ($self.attr('data-linkhref')) {
					event.clipboardData.setData('text/plain', $self.attr('data-linkhref'));
					return;
				}
			});
			client.on('aftercopy', function() {
				layer.msg('商品链接复制成功!');
			});
		});
	});
}
exports.copyLink = copyLink;