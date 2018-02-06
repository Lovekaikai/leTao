$(function() {
    $(window).ajaxStart(function () {
        NProgress.start();
    });

    $(window).ajaxStop(function() {
        NProgress.done()
    })
    $.extend($, {
        /**
       * 根据key去查询url上的参数的值
       * @param {*参数名} name 
       */
        getQueryString: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURI(r[2]); return null;
        },
        ltajax: function (option) {
            $.ajax({
                url: option.url,
                data: option.data || "",
                type: option.type || "get",
                success: function (result) {
                    option.success && option.success(result);
                }
            })
        },
        sizeFromat: function (str) {
            var startNum = str.split("-")[0];
            var endNum = str.split("-")[1];
            var Arraysize = [];
            for (var i = startNum; i <= endNum; i++) {
                Arraysize.push(i);
            }
            return Arraysize;
        },
        /*
     * 根据数组中对象数据ID获取索引
     * */
        getObjectFromId: function (arr, id) {
            var object = null;
            for (var i = 0; i < arr.length; i++) {
                var item = arr[i];
                if (item && item.id == id) {
                    object = item;
                    break;
                }
            }
            return object;
        },
 cateChange:function () {
            $(".category").click(function () {

                $(".It_bottom").stop().slideToggle()
            })
            $(".tools_btn_left").click(function () {

                $("body").toggleClass("headerShow");
                $(".It_header_nav").toggleClass("It_header_nav_show")
            })

        }
    })


    $(".close_btn").click(function () {

        $.get("/user/logout", function (res) {
            if (res.success) {
                location.href = "/admin/login.html"
            }
        })
    })
    $(".category").click(function () {
        $(".It_bottom").stop().slideToggle()
    })
    $(".tools_btn_left").click(function () {

        $("body").toggleClass("headerShow");
        $(".It_header_nav").toggleClass("It_header_nav_show")
    })



})


