$(function () {

    var vcode;
    var code;
    var username;
    var password1 ;
    var password2 ;
    $(".getCode").on("tap", function () {
        username = $(".phoneNumber").val();

        if (!checkPhone(username)) {
            mui.toast('输入用户名不合法')
            return;
        }

        $(this).html("正在输入")
        var that = this;
        var index = 4;
        var timer = setInterval(function (params) {
            index--;
            $(that).html(index + "秒再获取")
            if (index < 0) {
                clearInterval(timer);
                $(that).html("获取验证码")
            }
        }, 1000);

        $.get("/user/vCode", function (res) {
            vcode = res.vCode;
        })

    })

    $(".register").on("tap", function () {
        password1= $(".password1").val().trim();
         password2 = $(".password2").val().trim();
         code = $(".code").val().trim();
         username = $(".phoneNumber").val();
         if (!checkPhone(username)) {
             mui.toast('输入用户名不合法')
             return;
         }
        if (password1.length < 6) {
            mui.toast('输入正确的密码')
            return;
        }
        if (password1 != password2) {
            mui.toast("密码不一致")
            return;
        }
        // console.log(vcode.length)
        // console.log(code.length)
        if (vcode.length != code.length) {
            mui.toast('验证码错误')
            return;
        }

        var registerObj={
            username:username,
            password:password2,
            mobile:username,
            vCode:vcode
        }

        $.post("/user/register",registerObj,function (res) {
            if(res.success){
                location.href="../index.html"
            }
        })

    })

    function checkPhone(phone) {
        // var phone = document.getElementById('phone').value;
        if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
            return false;
        } else {
            return true;
        }
    }


})