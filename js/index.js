(function(){
  // 利用swiper制作首页banner
  var mySwiper = new Swiper('.swiper-container', {
    // 自动播放
    autoplay: 6000,
    loop: true,
    // 如果需要分页器
    pagination: '.swiper-pagination'
  });


  // 首页热门商品数据请求
  var page = 2;      // 初始时请求第一页的数据
  var canadd = false;
  function fetHotProductMethod(page,pagesize){
    $$.Ajax.fetchHotProduct(page,pagesize,function(data){
      console.log(data);
      var dataArr = data['data'];
      for(var i = 0; i < dataArr.length; i ++){
        $("#pro-list").append($$.createDom(dataArr[i]));
      }
      canadd = true;
    });
  }
  fetHotProductMethod(page,10);
  $(window).on('scroll',function(event){

    if(!canadd){
      return ;
    }
    // 利用文档的高度减去屏幕高度获取到滚动体可以滚动的最大高度
    var maxHeight = $(document).height() - $(window).height();
    event.preventDefault();
    var nowHeight = $(document).scrollTop();

    if(nowHeight / maxHeight >= 0.8) {
      page ++ ;
      fetHotProductMethod(page,20);
      canadd = false;
    }
  });


  // 底部导航的js代码,点击那个跳转到哪一页并改变相应的li的样式,并进行相应的页面跳转
  $('.index-nav-list').each(function(i,item){
    $(item).on('touchstart',function(){

      // 改变li样式
      $(this).addClass('selected').siblings().removeClass('selected');
    })
  });

  //判断是否登录，有则跳转个人中心，没有则返回登陆
  $('.personalCenter').on('touchstart',function () {
      if(localStorage.username) {
           location.href = 'personalCenter.html';
      } else{
           location.href='login.html';
     }
   });

   $('.myCart').on('touchstart',function(){
       if(localStorage.username) {
           location.href = 'cart.html';
       } else{
           location.href='login.html';
       }

   });
    $('.myOrder').on('touchstart',function(){
        if(localStorage.username) {
            location.href = 'orderPage.html';
        } else{
            location.href='login.html';
        }

    });

    $('.search-box').on('touchstart',function () {
        location.href='searchPage.html';
    });

    $("#shop-bag").on('touchstart',function(event) {
      event.stopPropagation();
      location.href = 'cart.html';
    });

	//判断是否登录，有则显示，无则消失
	if(!localStorage.token){
  	$('.totalNum').hide();
  }else{
  	$('.totalNum').show();
  }
  function showPro() {
    // 获取购物车数据根据购物车中的data数组来判断商品个数
    $$.Ajax.fetchData(function(data){
    	//console.log(data);
    	$('.totalNum')[0].innerText = data.data.length;
    });
  }
  showPro();
  })();