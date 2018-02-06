$(function () {
    

    var vcode;
    var code;

    var newPassword;
    var oldpassword;
    var confirmPawword;

    init();
    updatePassword();
    function init(params) {
        $(".getCode").on("tap", function () {
            username = $(".phoneNumber").val();


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

            $.get("/user/vCodeForUpdatePassword", function (res) {
                vcode = res.vCode;

                console.log(vcode)
            })

        })
    }
  


    function updatePassword() {
        $(".updatapassword").click(function () {
            confirmPawword = $(".confirmPawword").val();
            oldpassword = $(".oldpassword").val();
            newPassword = $(".newPassword").val();
            code = $(".code").val();


            if(oldpassword==newPassword){
                return;
            }
            if(newPassword!=confirmPawword){
                return;
            }

            console.log(vcode)
            if(code!=vcode){
                return;
            }


            var obj={
                oldPassword: oldpassword,
                newPassword:newPassword,
                vCode: code

            }
            console.log(obj)

            $.post("/user/updatePassword",obj,function (result) {
                if (result.error && result.error == 400) {
                    location.href = "./login.html";
                } else {
                    mui.toast('修改成功') 
              
                }
                
            })

        })
    }

})