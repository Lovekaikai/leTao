$(function () {
    init();

    function init() {
        var addressArr = [];
        $.get("/address/queryAddress", function (result) {
            if (result.error && result.error == 400) {
                location.href = "./login.html"
            } else {
                console.log(result)
                for (var i = 0; i < result.length; i++) {

                    addressArr.push('  <li data-index=' + result[i].id + ' class="mui-table-view-cell"> <div class="mui-slider-right mui-disabled"> <a class="mui-btn mui-btn-red deleteAddress">删除</a> </div> <div class="mui-slider-handle"> <a href="./addressManage.html?id=' + result[i].id + '"> <div class="box clearfix"> <div class="email "> 邮箱：<span>' + result[i].postCode + '</span> </div> <div class="address_user"> 收货人 <span>' + result[i].recipients + '</span> </div> <div class="address_message"> ' + result[i].address + result[i].addressDetail + ' </div> </div> </a> </div> </li>')

                }
                $("#OA_task_1").html(addressArr.join(''))

            }


        })

        $("html").on("tap", ".deleteAddress", function (e) {
        
            var addressId = $(this).parents(".mui-table-view-cell")[0].dataset.index
            var obj={
                id:addressId
            }
            queryAddress(obj,function (result) {
                if (result.success) {
                    // console.log(success)
                    location.href = location.href;
                }
            })
        })
    }

    function queryAddress(obj,callback) {
        $.ltajax({
            url:"/address/deleteAddress",
            type:'post',
            data: obj,
            success:function (result) {
                callback && callback(result);
            }
        })
    }
})