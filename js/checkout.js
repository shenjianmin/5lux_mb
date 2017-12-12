jQuery(function ($) {
    var xiaoji = localStorage.cartgoods_sum;
    $('.checkout_xiaoji').html('' + xiaoji + '')
    var yingfu = xiaoji - 50
    if (yingfu < 0) {
        yingfu = 0
        $('.checkout_ri').html(0)
        $('.checkout_yingfu').html(0)
        $('.checkout_heji').html(0)
    } else {
        $('.checkout_yingfu').html('' + yingfu + '.00')
        var heji = $('.checkout_yingfu').html()
        $('.checkout_heji').html('' + heji + '')
        localStorage.sum = yingfu
    }
    if (localStorage.consignee) {
        $('.checkout_shou').html('' + localStorage.consignee + '')
    } else {
        $('.checkout_shou').html('')
    }
    if (localStorage.mobile) {
        $('.checkout_dian').html('' + localStorage.mobile + '')
    } else {
        $('.checkout_dian').html('')
    }
    if (localStorage.district) {
        $('.checkout_district').html('' + localStorage.district + '')
    } else {
        $('.checkout_district').html('')
    }
    var oOrder = document.querySelector('#checkout_order')
    oOrder.addEventListener('touchstart', function () {
        var address_id = localStorage.address_id
        console.log(address_id)
        if (!address_id) {
            $('.checkout_confirm').css('display', 'block')
            var oOk = document.querySelector('#checkout_ok')
            oOk.addEventListener('touchstart', function () {
                $('.checkout_confirm').css('display', 'none')
            })
        }
        var total_prices = localStorage.sum
        $.post('http://h6.duchengjiu.top/shop/api_order.php?token=' + localStorage.token + '&status=add',
            {
                address_id: address_id,
                total_prices: total_prices
            },
            function (json) {
                console.log(json)
                if (json.code === 0) {
                    $('.checkout_confirm1').css('display', 'block')
                    var que = document.querySelector('#checkout_que')
                    que.addEventListener('touchstart', function () {
                        $('.checkout_confirm1').css('display', 'none')
                        location.href = 'orderPage.html';
                    })
                }
            }
        )
    })
})