$(function () {

    init();
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

                        queryCart(function (result) {
                            template.helper("tempJSON", function (value) {
                                return JSON.stringify(value)
                            })
                            var html = template("cart", { data: result });

                            $(".mui-table-view").html(html)
                            // mui("#refreshContainer").pullRefresh().pulldownLoading();
                            mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                        })

                    } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                }
            }
        });
    }


    /* 计算总价 */
    var allprice = 0;
    $(".mui-table-view").on("change", ".checkbox", function (e) {
        var objSON = $(this).parents(".mui-table-view-cell");
        var obj = JSON.parse(objSON[0].dataset.obj);
        allprice += $(this).prop("checked") ? (obj.price * 10 * obj.num * 10) : -(obj.price * 10 * obj.num * 10)
        $("#cartAmount").html(allprice / 100)
    })



    
    /* 请求数据 */
    function queryCart(callback) {
        $.ltajax({
            url: "/cart/queryCart",
            type: "get",
            success: function (result) {
                if (result.error && result.error == 400) {
                    location.href = "./user/login.html?returnUrl=" + location.href;
                } else {
                    callback && callback(result);
                }

            }
        })
    }

    /* 删除 */
    $(".mui-table-view").on("tap", ".mui-btn-green", function () {
        /* 获取全部数据  放在ul里面 */
        var objSON = $(this).parents(".mui-table-view-cell");

        var obj = JSON.parse(objSON[0].dataset.obj);
        var id = obj.id;
        var arr = [id];
        id = { "id": arr }
        deleteCart(id, function (res) {
            if (res.success) {
                mui("#refreshContainer").pullRefresh().pulldownLoading();
            }
        })
    })

    /* 编辑 */
    $(".mui-table-view").on("tap", ".mui-btn-blue", function () {

        var objSON = $(this).parents(".mui-table-view-cell");

        var obj = JSON.parse(objSON[0].dataset.obj);
        console.log(obj);
        var productSize = $.sizeFromat(obj.productSize);

        console.log(productSize)
        var objSize = { addSize: productSize, num: obj.size }
        var html = template('productSize', objSize)
        var html = html.replace(/\n/g, "");
        mui.confirm(html, "编辑商品信息");
        $(".btn").val(obj.num)
        $(".remain").html("剩余" + obj.productNum + "件")
        mui(".mui-numbox").numbox()


    })
    /* 切换尺码高亮 */

    $("body").on("tap", ".pro_size>i", function () {
        $(this).addClass("active").siblings().removeClass("active")
    })

    $("body").on("tap", ".mui-popup-button-bold", function () {

        var objSON = $(".mui-btn-blue").parents(".mui-table-view-cell");

        var obj = JSON.parse(objSON[0].dataset.obj);

        var editMessObj = {
            id: obj.id,
            size: $(".pro_size .active")[0].innerHTML,
            num: $(".btn").val()



        }
        /* 更新发出请求 */
        updateCart(editMessObj, function (result) {
            if (result.success) {
                mui("#refreshContainer").pullRefresh().pulldownLoading();
            }
        })


    })


    /* 删除商品 */
    function deleteCart(id, callback) {
        $.ltajax({
            url: "/cart/deleteCart",
            type: "get",
            data: id,
            success: function (result) {
                if (result.error && result.error == 400) {
                    location.href = "./user/login.html?returnUrl=" + location.href;
                } else {
                    callback && callback(result);
                }

            }
        })
    }
    /* 更新 */
    function updateCart(editMessObj, callback) {
        $.ltajax({
            url: "/cart/updateCart",
            type: 'post',
            data: editMessObj,
            success: function (result) {
                if (result.error && result.error == 400) {
                    location.href = "./user/login.html?returnUrl=" + location.href;
                } else {
                    callback && callback(result);
                }
            }
        })



    }
})