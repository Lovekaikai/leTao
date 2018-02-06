$(function () {
    init();
    /* 初始化 */
    function init() {
        mui.init({
            pullRefresh: {
                container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
                down: {
                    height: 50,//可选,默认50.触发下拉刷新拖动距离,
                    auto: true,//可选,默认false.首次加载自动下拉刷新一次
                    contentdown: "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                    contentover: "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                    contentrefresh: "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                    callback: function () {

                        queryProductDetail(function (result) {
                            console.log(result)
                            // console.log(result)
                            result.addSize = $.sizeFromat(result.size)
                            var html = template("templeID", result);
                            $(".mui-scroll").html(html);
                            mui(".mui-numbox").numbox()
                            //获得slider插件对象
                            var gallery = mui('.mui-slider');
                            gallery.slider({
                                interval: 2000//自动轮播周期，若为0则不自动播放，默认为0；
                            });
                            setTimeout(function () {

                                mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                            }, 500);
                        });

                    } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                }
            }
        });
    }


    function queryProductDetail(callback) {

        $.get("/product/queryProductDetail?id=" + $.getQueryString("id"), function (res) {
            callback && callback(res);
        })
    }
    var size;
    $(".product_container").on("tap", ".pro_size i", function (e) {
        $(this).addClass("active").siblings().removeClass("active");
        size = $(this).html();
    })
    $(".btn-left ").on("tap", function () {
        console.log(1)
        if ($(".product_container .pro_size i.active").length == 0) {
            mui.toast('请选择尺码')
            return;
        }
        if ($(".mui-numbox-input").val() < 1) {
            mui.toast('请选择数量');
            return;
        }
        var addCartObj = {
            productId: $.getQueryString("id"),
            num: $(".mui-numbox-input").val(),
            size: size
        }
        // $.post("/cart/addCart",addCartObj,function(res) {
        //     if(res.error&&res.error==400){

        //            location.href="./user/login.html?returnUrl="+location.href;

        //     }else{
        //         mui.prompt('你', 'deftext', 'title', ['true', 'false'], function(index) {
        //                 if(index==0){

        //                 }
        //         }, 'div') 


        //     }
        // })

        $.ltajax({
            url: "/cart/addCart",
            data: addCartObj,
            type: "post",
            success: function (result) {
                if (result.error && result.error == 400) {
                    location.href = "./user/login.html?returnUrl=" + location.href;
                } else {
                    mui.confirm('你确定加入购物车吗', "我的宝贝", function (data) {
                        if (data.index == 1) {
                            location.href = "/mobile/cart.html"
                        }
                    }, 'div')


                }

            }
        })

    })
})