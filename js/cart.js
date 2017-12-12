jQuery(function ($) {



    $$.Ajax.seeUserCart(function (data) {
        if (data['code'] !== 0) {
            toast(data['message'], 3000);
            setLink();
            return;
        }
        var data = data['data'];
        var str = '';
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            obj.goods_price = parseInt(obj.goods_price);
            obj.goods_sum = obj.goods_price * obj.goods_number;
            str += `
            <div class="cart_good">
                    <div class="cart_good1">
                        <button class='cart_delete' data-id="${obj.goods_id}"><span data-id="${obj.goods_id}">X</span></button>
                        <div class="cart_good2">
                            <div class="cart_good3">
                                <img src="${obj.goods_thumb}">
                            </div>
                                <div class="cart_good4">
                                    <p class="cart_name">${obj.goods_name}</p>
                                    <p class="cart_type" >商品ID:<span name='goods_id'>${obj.goods_id}</span></p>
                                    <p class="cart_price" >单:￥<span class='${obj.goods_id}'>${obj.goods_price}</span><span class='kongge'>sa</span>总:￥<span name="sum">${obj.goods_sum}</span></p>
                                    <div class="cart_numbtn">
                                        <span class="cart_jian" data-id="${obj.goods_id}">-</span>
                                        <span class="cart_center" data-id="${obj.goods_id}" id="${obj.goods_id}">${obj.goods_number}</span>
                                        <span class="cart_jjj" data-id="${obj.goods_id}">+</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `

        }
        $('.cart_tianjia').html(str);
        getSum();
        setLink();
    });

    $('body').on('touchend', function () {
        var target = event.target || event.srcElement;
        if (target.innerText == '-') {
            var idjian = target.dataset.id;
            var dange = $('#' + idjian + '').html();
            dange--;
            if (dange < 1) {
                dange = 1;
            }
            $('#' + idjian + '').html(dange);
            $$.Ajax.deleteCartProduct(idjian, dange, function (data) {
                if (data.code == 0) {
                    var goods_price = parseInt($('.' + idjian + '').html());
                    $('.' + idjian + '').next().next().html(goods_price * dange);
                    getSum();
                }
            });
        }
        if (target.innerText == '+') {
            var idjian = target.dataset.id;
            var dange = $('#' + idjian + '').html();
            dange++;
            if (dange > 10) {
                dange = 10;
            }
            $('#' + idjian + '').html(dange);
            $$.Ajax.deleteCartProduct(idjian, dange, function (data) {
                if (data.code == 0) {
                    var goods_price = parseInt($('.' + idjian + '').html());
                    $('.' + idjian + '').next().next().html(goods_price * dange);
                    getSum();
                }
            });
        }
        if (target.innerText == 'X') {
            var x_id = target.dataset.id;
            $('.cart_confirm').css('display', 'block');
            $('.cart_ok').attr('data-id', '' + x_id + '');
        }
        if (target.innerText == '取消') {
            $('.cart_confirm').css('display', 'none');
        }
        if (target.innerText == '确定') {
            var q_id = target.dataset.id;
            var number = 0;

            $$.Ajax.deleteCartProduct(q_id, number, function (data) {
                if (data.code == 0) {
                    $('.' + q_id + '').parent().parent().parent().parent().parent().remove();
                    getSum();
                }
            });
            $('.cart_confirm').css('display', 'none');
            $$.Ajax.deleteCartProduct(q_id, number, function (data) {
                if (data.code == 0) {
                    $('.' + q_id + '').
                        parent().
                        parent().
                        parent().
                        parent().
                        parent().
                        remove();
                    getSum();
                }
            });
            $('.cart_confirm').css('display', 'none');
        }

        if (target.innerText == '清空') {
            $('.cart_confirm1').css('display', 'block');
        }
        if (target.innerText == '否') {
            $('.cart_confirm1').css('display', 'none');
        }
        if (target.innerText == '是') {
            var oGoodsIds = document.querySelectorAll('span[name=goods_id]');
            for (var i = 0; i < oGoodsIds.length; i++) {
                var td = oGoodsIds[i];
                var goods_id = parseInt(td.innerText);
                var number = 0;
                (function (td) {
                    $.post('http://h6.duchengjiu.top/shop/api_cart.php?token=' + localStorage.token,
                        {
                            goods_id: goods_id,
                            number: number
                        },
                        function (json) {
                            if (json.code == 0) {
                                var tr = td.parentNode.parentNode.parentNode.parentNode.parentNode;
                                tr.parentNode.removeChild(tr);
                                getSum();
                            }
                            setLink();
                        }
                    )
                })(td)
            }
            $('.cart_confirm1').css('display', 'none')
        }
        if (target.className == 'cart_bianji') {
            if (target.innerText == '编辑') {
                $('.cart_delete').css('display', 'inline-block')
                target.innerText = '完成'
            } else {
                $('.cart_delete').css('display', 'none')
                target.innerText = '编辑';

            }


        }

    })
    function getSum() {
        var oSums = document.querySelectorAll('span[name=sum]');
        var sum = 0;
        for (var i = 0; i < oSums.length; i++) {
            sum += parseInt(oSums[i].innerText);
        }
        localStorage.sum = sum;
        $('#cart_sum').html(sum);

        localStorage.setItem('cartgoods_sum', '' + sum + '');
    }

    function setLink(){
      $('.cart_btm a').on('touchstart',function (event) {
        var cart_tianjia = document.querySelector('.cart_tianjia');
        console.log(cart_tianjia.innerText);
        if(cart_tianjia.innerText === ''){
          this.href="javascript:0";
        }else{
          this.href='checkout.html';
        }
      });
    }
});
