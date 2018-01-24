$(function () {
    init();
    function init() {
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
        /* 初始化 */
        var id=1;
        ulTempateGet(id);

        /* 获取菜单的列表 */
        $.get("/category/queryTopCategory", function (res) {
            var html = template("temple", res)
            $(".cate_left_menu").html(html)

        })

        $(".cate_left_menu").on("tap", "a", function () {
            var id = $(this).parent().data("id");
            ulTempateGet(id);
        })
    }

    function ulTempateGet(id) {
        $.get("/category/querySecondCategory?id=" + id, function (res) {
            var rows = res.rows;
            /* 返回的是数组 */
            var stringHTML = rows.map(function (data, index) {
                var str = '<li> <img src=' + data.brandLogo + ' alt=""> <p>' + data.brandName + '</p> </li>'
                return str;
            })
            var html = stringHTML.join("")
            // console.log(html)

            $(".right_menu_ul").html(html)

        })
    }
})