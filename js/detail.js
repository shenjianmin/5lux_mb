(function () {
	var mySwiper = new Swiper(".swiper-container",{
        direction:"horizontal",/*横向滑动*/  
        loop:true,/*形成环路（即：可以从最后一张图跳转到第一张图*/  
        pagination:".swiper-pagination",/*分页器*/ 
        autoplay:5000/*每隔5秒自动播放*/
   }) ;
   showPro();
   /*显示隐藏的商品信息*/
   var oShop = document.querySelector('.wuda');
   var oBlack = document.querySelector('.redcardbg');
   var oClose = document.querySelector('.close');
   var oGoShop = document.querySelector('.goum');
   var $oBlackDetail = $('.productParm');
   oShop.addEventListener('touchstart',function(){
   	oBlack.style.display = 'block';
   	$oBlackDetail.show();
   	$oBlackDetail.animate({"height":480},600);
   });
   oGoShop.addEventListener('touchstart',function(){
   	oBlack.style.display = 'block';
   	$oBlackDetail.show();
   	$oBlackDetail.animate({"height":480},600);
   });
   oBlack.addEventListener('touchstart',function(){
   	$oBlackDetail.animate({"height":0},600);
   	setTimeout(function(){$oBlackDetail.hide();},500);
   	oBlack.style.display = 'none';
   });
   oClose.addEventListener('touchstart',function(){
   	$oBlackDetail.animate({"height":0},600);
		setTimeout(function(){$oBlackDetail.hide();},500);
   	oBlack.style.display = 'none';
   });
   /*判断选取的颜色*/
   $('.pt_list_son').each(function(i,item){
   	$(this).on('touchstart',function(){
		  $(this).addClass('ptsel').siblings().removeClass('ptsel'); 
		  $('.regular')[0].innerHTML = '颜色:' + $('.ptsel').html();
   	})
   });
   /*判断选取的数量*/
   var idx = 1;
   $('.productParm .ptcon .pt_list_num .numbtn .right').on('touchstart',function(){
   	idx++;
   	$('.productParm .ptcon .pt_list_num .numbtn .center').html(idx);
   	$('.hide_price b').html(idx);
   });
   $('.productParm .ptcon .pt_list_num .numbtn .left').on('touchstart',function(){
   	idx--;
   	if (idx <= 1) {
   		idx = 1;
   	}
   	$('.productParm .ptcon .pt_list_num .numbtn .center').html(idx);
   	$('.hide_price b').html(idx);
   });
   
   /*$$.Ajax获取商品数据*/
   $.getQueryString = function(name) {
     var search = location.search.substr(1);
     var reg = new RegExp('(&|^)'+name+'=([^&]*)(&|$)');
     var r = search.match(reg);
     if (r === null) return null;
     return decodeURI(r[2]);
	 };
	 var goods_id = $.getQueryString('goods_id');
	 console.log(goods_id);
	 $$.Ajax.fetchDetail(goods_id,function(data){
	 		var str1 = '';
      var str2 = '';
      var str3 = '';
      var str4 = '';
      console.log(data);
      var data = data['data'];
      var obj = data[0];
      str1 += `<span style="font-size:12px">￥</span>${obj.price}`;
      $('.detail_price .extra .price').html(str1);
      str2 += `<img height="100%" src="${obj.goods_thumb}">`;
      $('.swiper-slide').html(str2);
      $('.productParm .pttitle .ptimg').html(str2);
      str3 += `<div>${obj.goods_name}${obj.goods_desc}</div>`;
      $('.detail_text .detail_txt').html(str3);
      str4 += `<div class="name">${obj.goods_name}${obj.goods_desc}</div>
				<div class="price hide_price">￥${obj.price} x <b>1</b></div>
				<div class="regular">
					<span> 颜色:浅棕色 </span>
				</div>`;
				$('.productParm .pttitle .titleright').html(str4);
	 });
	$('.gouw')[0].addEventListener('touchstart',function(event){
    if (this.id === 'gouw') {
    	if (!localStorage.token) {
        localStorage.backurl = location.href;
        location.href = 'login.html';
        return;
      }else{
      	location.href = 'cart.html';
      }
    }
		
	});
	/*判断添加的购物车*/
	$('.ptbtn')[0].addEventListener('touchstart',function(event) {
    event = event || window.event;
    var target = event.target || event.srcElement;
	  var goods_number = $('.productParm .ptcon .pt_list_num .numbtn .center')[0].innerHTML;
    console.log(goods_number);
    // 点击添加到购物车
    if (target.id === 'addCar') {
      console.log('添加到购物车');
      if (!localStorage.token) {
        localStorage.backurl = location.href;
        location.href = 'login.html';
        return;
      } else {
      	$$.Ajax.fetchAddCar(goods_id,goods_number,function(data){
      		console.log(data);
      		if (data.code === 0) {
      				showPro();
              toast('添加到购物车成功', 1500);
              $oBlackDetail.animate({"height":0},600);
							setTimeout(function(){$oBlackDetail.hide();},500);
					   	oBlack.style.display = 'none';
            }
      	});
      }
    }
    if (target.id === 'addCar1') {
      console.log('添加到购物车');
      if (!localStorage.token) {
        localStorage.backurl = location.href;
        location.href = 'login.html';
        return;
      } else {
      	$$.Ajax.fetchAddCar(goods_id,goods_number,function(data){
      		console.log(data);
      		if (data.code === 0) {
      				showPro();
              toast('添加到购物车成功', 1500);
              $oBlackDetail.animate({"height":0},600);
							setTimeout(function(){$oBlackDetail.hide();},500);
					   	oBlack.style.display = 'none';
            }
      	});
      }
    }
   
  }) 
  /*判断购物车中的数量，显示在红色小圈上*/
  function showPro() {
    // 获取购物车数据根据购物车中的data数组来判断商品个数
    $$.Ajax.fetchData(function(data){
    	console.log(data);
    	$('.totalNum')[0].innerText = data.data.length;
    });
  }
  
  if(!localStorage.token){
  	$('.totalNum').hide();
  }else{
  	$('.totalNum').show();
  }
})()
