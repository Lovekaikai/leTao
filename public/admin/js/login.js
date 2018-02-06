$(function () {
    init();
    function init() {
        $("#inputEmail3").on("invalid", function () {
            this.setCustomValidity("邓二货")
        })

        $("form").submit(function (e) {

            /* 正则知识 */
            /* invalid */
            /* 表单系列化 */
            /* 默认行为 */
            var data = $("form").serialize()
            $.post("/employee/employeeLogin", data, function (result) {

                if (result.success) {
                    location.href = "/admin/index.html"
                }
            })

            e.preventDefault();
        })
    }
})















