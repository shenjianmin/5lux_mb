(function() {
	var oContext = document.querySelector("#context");
	var oTable = document.querySelector("#order-table");

	$$.Ajax.fetchOrder(function(data) {
		console.log(data);
		var data = data['data'];
		var goods;
		if(data.length === 0) {
			oContext.innerHTML = `<div class='order_no_top'></div>
				<p class='order_1'>暂无相关订单</p>
				<p class='order_2'>您还没有相关订单哦</p>
				<p class='order_back'>
					<a href='index.html'><span>返回首页</span></a>
				</p>`;
			return;
		}
		for(var i = 0; i < data.length; i++) {
			var obj = data[i];
			var goodsHTML = '';
			var sums = 0;
			for(var j = 0; j < obj.goods_list.length; j++) {
				goods = obj.goods_list[j];

				var sum = `${goods.goods_price * goods.goods_number}`;
				sum = parseInt(sum);
				sums += sum;

				goodsHTML += `
		      <tr>
		        <td>
		      		<img src="${goods.goods_thumb}">
		    		</td>
		        <td>
		          <p>${goods.goods_name}</p>
		        </td>
		        <td><span>单价\¥ ${goods.goods_price}</span><i>数量: ${goods.goods_number}</i></td>
		    	</tr>
	      `;
			}

			oTable.innerHTML += `
		  	<table>
		      <thead>
			          <th>订单号:${obj.order_id}</th>
			          <th>付款\¥ ${sums}</th>
			          <th><span data-id="${obj.order_id}" class="cancel-order" id="order">删除订单</span></th>
		      		</thead>
		        ${goodsHTML}
		    </table>
		  `;
		}

		$(".cancel-order").each(function(i, item) {
			$(this).on('touchstart', function(event) {
				event = event || window.event;
				var target = event.target || event.srcElement;
				var self = this;
				if(target.className === 'cancel-order') {
					var order_id = target.dataset.id;
					$$.Ajax.delOrder(order_id, function(data) {
						confirm("确定要取消订单吗？", function() {
							toast("订单取消成功！", 2000);
							$(self)[0].parentNode.parentNode.parentNode.parentNode.parentNode.removeChild($(self)[0].parentNode.parentNode.parentNode.parentNode);
							console.log($(self)[0].parentNode.parentNode.parentNode.parentNode);
						}, function() {
							console.log("取消删除");
						})
					})
				}
			})
		})
	})
})()