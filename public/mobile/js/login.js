$(function () {
    init()

    function init() {
        

        $(".mui-btn").on("tap",function () {
            var username = $(".mui-input-clear").val();
            var password = $(".mui-input-password").val();

            if(!username.trim()){
                return ;
            }
            if(password.length<6){
                return ;
            }
            var obj={
                username:username,
                password:password
            }

             $.post("/user/login",obj, function (res) {
                if(res.success){
                    if ($.getQueryString("returnUrl")){
                        location.href = $.getQueryString("returnUrl");  
                    }else{
                        location.href = "../index.html";  
                    }
                     
                 }else{
                     console.log(res);
                    mui.toast(res.message);
                 }
             })
        })
   


        




    }

})