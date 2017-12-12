// 庄子轩
(function() {
  var oProduct_title = document.querySelector('.product_title');
  var canadd = false;
  var cat_id = $$.matchQueryString('cat_id');
  var page = 1;

  function oFetchProductListPage(page, pagesize) {
    $$.Ajax.fetchProductListPage(cat_id, page, pagesize, function(data) {
      console.log(data);
      var dataArr = data['data'];
      for (var i = 0; i < dataArr.length; i++) {
        console.log(dataArr[i]);
        $('.list_con').append($$.createDom(dataArr[i]));
      }
      canadd = true;
      oProduct_title.innerText = localStorage.cat_name;
    });
  };
  if(cat_id){
    oFetchProductListPage();
  }
  $(window).on('scroll', function(event) {
    if (!canadd) {
      return;
    }
    // 利用文档的高度减去屏幕高度获取到滚动体可以滚动的最大高度
    var maxHeight = $(document).height() - $(window).height();
    event.preventDefault();
    var nowHeight = $(document).scrollTop();
    if (nowHeight / maxHeight >= 0.8) {
      console.log(page);
      page++;
      oFetchProductListPage(page, 20);
      canadd = false;
    }
  });
  // 叶家辉
  //console.log($$.getQueryString("search_text"));
  var search_text = $$.matchQueryString('search_text');
  console.log(search_text);
  var number = 1;
  oProduct_title.innerText = search_text;

  function searchProductData(page, pagesize) {
    $$.Ajax.searchProduct(page, search_text, pagesize, function(data) {
      var dataArr = data['data'];
      for (var i = 0; i < dataArr.length; i++) {
        $('#pro-list').append($$.createDom(dataArr[i]));
      }
      $('#click-add-more').css({
        'margin-top': 10,
      });
    });
  }

  searchProductData(1, 10);
  $('#click-add-more').on('touchstart', function() {
    number++;
    setTimeout(function(){
      searchProductData(number, 10);
    },10);
  });
})();





