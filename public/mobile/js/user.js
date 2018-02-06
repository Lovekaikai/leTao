$(function () {

    $.ltajax({
        url:"/user/queryUserMessage",
        type:'get',
        success: function (result) {
            if (result.error && result.error == 400) {
                location.href = "./login.html?returnUrl=" + location.href;
            } else {
                $(".media-heading").html(result.username);
                $(".mui-ellipsis").html("绑定手机:" + result.mobile);
                console.log(result)
             }
        }
    })

})