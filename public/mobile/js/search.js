$(function () {
    /* 初始化 */
    init()
    function init() {


        var local = localStorage;
        var str = (local.getItem("keyKey") && JSON.parse(local.getItem("keyKey"))) || [];

        var tmpl = "";
        for (var i = 0; i < str.length; i++) {
            var element = str[i];
            tmpl += '<li> <a href="javascript:;">' + element + '</a> <span  data-index=' + i + '  class="fa fa-close"></span> </li>'
        }

        if (str.length > 0) {
            $(".empty_history").hide();
        } else {
            $(".has_history").hide();
        }

        $(".history_list ul").html(tmpl);

        $(".search_icon").on("click", function () {
            var txt = $(".search_content").val();

            /* 判断是否是空值 */
            if (!$.trim(txt)) {
                mui.toast('请输入关键字')
                return;
            }

            for (var i = 0; i < str.length; i++) {
                var element = str[i];
                if (element == txt) {
                   
                    // 已经存在了
                    // splice 删除数组(索引,要删除几个)
                    str.splice(i, 1);
                }
            }
            /* 添加到数组 */
            str.unshift(txt);
            /* 把数组变为字符串 再添加*/
            console.log(str);
            local.setItem("keyKey", JSON.stringify(str))
            location.href = "./searchList.html?key=" + txt;



        })
        /* 全部删除 */
        $(".clear_history").on("click", function () {
            str.splice(0, str.length);
            local.setItem("keyKey", JSON.stringify(str));
            location.href = location.href;
        })
        /* 删除单个 */
        $(".history_list ul").on("click", ".fa-close", function (e) {

            var index = e.target.dataset.index;
            str.splice(0, 1);
            local.setItem("keyKey", JSON.stringify(str))
            location.href = location.href;
        })


    }
})