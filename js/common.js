(function(){
  // 基本的公共方法
  function CommonJs(){
    this.token = null;
    this.username = '';
    this.password = '';
    this.Ajax = null;
    this.init();
  }
  CommonJs.prototype = {
    init : function(){
      this.Ajax = new Ajax();
      this.Ajax.commonJs = this;
    },
    /*存储,获取storage*/
    setItem : function(k,v){
      return localStorage.setItem(k, v);
    },
    getItem : function(k){
      return localStorage.getItem(k);
    },
    /*创建商品的dom元素,并返回,传入你要创建的元素的数据*/
    createDom : function(obj){
      var prePrice = (obj.price * 1.6).toFixed(2);
      var str = `<li class="pro-list-item">
            <a href="detail.html?goods_id= ${obj.goods_id}">
              <div class="pli-top">
                <img src="${obj.goods_thumb}" alt="">
              </div>
              <div class="pli-bottom">
                <h4 class="pro-name">${obj.goods_name}</h4>
                <p><span class="dis-price"><del>&yen;${prePrice}</del></span></p>
                <p class="clearfix"><span class="price"><i>&yen;</i>${obj.price}</span> <span class="sale-count">已售：9999</span></p>
              </div>
            </a>
          </li>`;

      /*注意返回的好像是一个字符串*/
      return str;
    },
      //用正则匹配查询字符串
    matchQueryString:function (str) {
        var queryString = location.search.substr(1);
        var reg = new RegExp("(^|&)" + str + "=([^&]*)(&|$)");
        var backStr = queryString.match(reg);
        if(backStr === null)
        return null;
        return decodeURIComponent(backStr[2]);

    },

    /*获取查询字符串方法*/

    getQueryString : function(name) {
      var search = location.search.substr(1);
      var reg = new RegExp('(&|^)'+name+'=([^&]*)(&|$)');
      var r = search.match(reg);
      if (r === null) return null;
      return decodeURI(r[2]);
    }
   
  };
  // 所有的ajax请求
  function Ajax(){
    this.commonJs = '';
    this.config = {};
    this.init();
  }
  Ajax.prototype = {
    init : function(){
      this.config.API_PREFIX = "http://h6.duchengjiu.top/shop/",
      this.config.PAGESIZE = 10
    },
    /*登录*/
    login : function(username,password,callback){
      var data = {
        "status" : 'login',
        "username" : username,
        "password" : password
      };
      $.post(this.config.API_PREFIX + "api_user.php",data,callback);
    },

    /*注册*/
		register : function(username2,password2,callback){
			var data = {
				"status" : 'register',
        "username" : username2,
        "password" : password2
			};
			$.post(this.config.API_PREFIX + "api_user.php",data,callback);
		},

    /*获取热门商品*/
    fetchHotProduct : function(page,pagesize,callback){
      var data = {
        "page" : page,
        "pagesize" : pagesize
      };
      //$.get(this.config.API_PREFIX + "api_goods.php",data,callback);

      $.ajax({
        url : this.config.API_PREFIX + "api_goods.php?format=jsonp&callback=cb",
        data : data,
        dataType :'jsonp',
        jsonpCallback : 'cb',
        success: callback
      })
    },

     //获取搜索商品
      fetchSearchProduct:function(callback){
          var searchText=this.commonJs.matchQueryString('search_text');
           var data={
               "search_text":searchText
           };
          $.get(this.config.API_PREFIX+'api_goods.php',data,callback);
        },
      //获取商品列表
      fetchProductList:function(callback){
        var data={};
        $.get(this.config.API_PREFIX+'api_cat.php',data,callback);
      },
      //获取商品列表页
      fetchProductListPage:function(cat_id,page,pagesize,callback){
         var data={
             'cat_id':cat_id,
             'page':page,
             'pagesize':pagesize
         };
        $.get(this.config.API_PREFIX+'api_goods.php',data,callback);
      },

			/*商品详情*/
    fetchDetail : function(goods_id,callback){
   	 var data = {
   		 'goods_id':goods_id
   	 };
   	 $.get(this.config.API_PREFIX + "api_goods.php",data,callback);
    },
    /*判断加入购物车*/
   	fetchAddCar : function(goods_id,goods_number,callback){
   		var data = {
   			"goods_id" : goods_id,
   			"number" : goods_number
   		}
   	 $.post(this.config.API_PREFIX + "api_cart.php?token=" + this.commonJs.getItem("token"),data,callback);
   	},
   	
   	/*获取data长度*/
		fetchData : function(callback){
		 var data = {
		 	"token" : this.commonJs.getItem("token")
		 }
   	 $.get(this.config.API_PREFIX + "api_cart.php",data,callback);
			
		},



    /*存储收货地址*/
    saveAddress:function (name,mobile,district,address,callback) {
      var data = {
        "consignee":name,
        "mobile":mobile,
        "district":district,
        "address":address,
      };
      $.post(this.config.API_PREFIX+"api_useraddress.php?status=add&token=" + this.commonJs.getItem('token') ,data,callback);
    },

    /*获取收货地址*/
    getaddress:function (callback) {
      var data={
        'token':this.commonJs.getItem('token'),
      };
      $.get(this.config.API_PREFIX+"api_useraddress.php?",data,callback)
    },

    /*删除收货地址*/
    deleteaddress:function (address_id,callback) {
      var data={
        'address_id':address_id,
        'status':"delete",
        'token':this.commonJs.getItem('token')
      };
      $.get(this.config.API_PREFIX+"api_useraddress.php",data,callback)
    },

    /*我的订单*/
    fetchOrder : function(callback){
    	var data = {
    		"token" : this.commonJs.getItem("token")
    	};
    	$.get(this.config.API_PREFIX + "api_order.php",data,callback);
    },

    /*删除订单*/
    delOrder : function(order_id,callback) {
    	var data = {
    		"order_id" : order_id
    	}
    	$.post(this.config.API_PREFIX + "api_order.php?token=" + this.commonJs.getItem("token") + "&status=cancel",data,callback);
    },

    /*搜索商品的ajax*/
    searchProduct : function(page,search_text,pagesize,callback){
      var data = {
        "search_text" : search_text,
        "pagesize" : pagesize
      }
      $.get(this.config.API_PREFIX + "api_goods.php",data,callback);
    },

    /*查看购物车的ajax*/
    seeUserCart : function(callback){
      var data = {
        "token" : this.commonJs.getItem("token")
      };
      $.get(this.config.API_PREFIX + "api_cart.php",data,callback);
    },

    /*删除购物车商品,其实就是更新购物车*/
    deleteCartProduct : function(goods_id,number,callback){
      var data = {
        goods_id : goods_id,
        number : number
      }
      $.post(this.config.API_PREFIX + "api_cart.php?token=" + this.commonJs.getItem("token"),data,callback);
    },

    /*更新购物车*/
    updateCart : function(goods_id){

    }



  };

    window.$$ = new CommonJs();
})();