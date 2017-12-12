(function () {
    var oListUl=document.querySelector('.hot-con');
    //搜索框跳转页
     $('.search-text').on('keyup',function (event) {
        event=event||window.event;
          event.preventDefault();
          if(event.keyCode===13){
          location.href='productList.html?search_text='+$(this).val();
          }
       });
      $('.hot-con').on('touchstart',function (event) {
          localStorage.cat_name=event.target.innerText;
       })
    //获取商品列表
      $$.Ajax.fetchProductList(function (data) {
          console.log(data);
           var dataList=data['data'];
          console.log(dataList);
           for(var i=0;i<dataList.length;i++){
              var obj=dataList[i];
              console.log(obj['cat_id']);
              oListUl.innerHTML+=`<li class="hotList"><a href="productList.html?cat_id=${obj.cat_id}">${obj.cat_name}</a></li>`;
            }
        })
   })();

