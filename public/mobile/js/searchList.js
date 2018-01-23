$(function () {

    var dataObject = {
        // 产品名称
        proName: $.getQueryString("key"),
        // 品牌id
        brandId: "",
        // 安装价格排序 1 升序 2 降序 
        price: "",
        // 数量排序
        num: "",
        // 第几页
        page: 1,
        // 页容量 
        pageSize: 4
    }
    var pageCount = 1;
    $(".lt_goods_tools>a").on("tap", function (e) {

        var sort = 1;
        var aDom = e.target.nodeName == "SPAN" ? e.target.parentNode : e.target;
        var listDom = aDom.dataset.sortname;
        $(aDom).find("span").toggleClass("mui-icon-arrowdown mui-icon-arrowup")

        if ($(aDom).find("span").hasClass("mui-icon-arrowdown")) {
            sort = 2;
        } else {
            sort = 1;
        }
        dataObject.price = "";
        dataObject.num = "";
        dataObject[listDom] = sort;

        // getQueryDate(function (result) {
        //     var html = template("goodsTpl", result);
        //     $(".brand_list").html(html)

        // })
        // 手动触发下拉刷新
        mui("#refreshContainer").pullRefresh().pulldownLoading();

    })
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
                        dataObject.page = 1;
                        // 结束下拉刷新
                        getQueryDate(function (result) {

                            var html = template("goodsTpl", result);
                            $(".brand_list").html(html);
                            mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                        })
                    }
                },
                up: {
                    height: 50,//可选.默认50.触发上拉加载拖动距离
                    auto: true,//可选,默认false.自动上拉加载一次
                    contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                    contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                    callback: function () {
                        if (dataObject.page >= pageCount) {
                            /* 重置 */
                            mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                            return;
                        } else {
                            dataObject.page++;
                            getQueryDate(function (result) {
                                var html = template("goodsTpl", result);
                                $(".brand_list").append(html)
                                // 结束上拉
                                setTimeout(function () {
                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                                }, 2000)
                            })
                        }
                    }
                }
            }
        });
    }

    /*   搜索按钮 */
    $(".search_icon").on("tap", function () {
        var key = $(".search_content").val();
        dataObject.proName = key;
        // 手动触发下拉刷新
        mui("#refreshContainer").pullRefresh().pulldownLoading();
    })

    /* 因为mui阻止了跳转 */
    $(".brand_list ").on("tap", "button", function (e) {
        location.href = e.target.dataset.href;
    })

    function getQueryDate(callback) {

        $.get("/product/queryProduct", dataObject, function (result) {
            // console.log(result);
            callback && callback(result);
            pageCount = Math.ceil(result.count / dataObject.pageSize)
        })
    }

})