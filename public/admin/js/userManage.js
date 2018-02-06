$(function () {

    init();


    function init() {
        var totalPage = 1;
        var page = 1;
        var pageSize = 10;
        var flag = true;
        var objData = { size: pageSize, page: page }
        queryUser();
        function queryUser() {
            $.ajax({
                url: "/user/queryUser",
                data: objData,
                type: 'get',
                success: function (result) {
                    totalPage = Math.ceil(result.total / objData.size);
                    var userArr = [];
                    for (var i = 0; i < result.rows.length; i++) {
                        userArr.push('<tr data-id=' + result.rows[i].id + ' data-isDelete=' + result.rows[i].isDelete + '> <th scope="row">' + ((objData.page - 1) * objData.size + i + 1) + '</th> <td>' + result.rows[i].username + '</td> <td>' + result.rows[i].mobile + '</td> <td class="jin">正常</td> <td><button  class="btn btn-danger  isclose">禁用</button></td> </tr>')
                    }
                    $("#tbody").html(userArr.join(""))
                    setPage();
                }

            })
        }

        function setPage() {

            console.log(totalPage)
            var options = {
                bootstrapMajorVersion: 3,// bootstrap为3.x版本的时候要声明
                alignment: "left",//左侧显示
                currentPage: objData.page,//当前页数
                totalPages: totalPage,//总页数 注意不是总条数
                // 点击页码的时候触发
                onPageClicked: function (e, oe, type, page) {
                    // event, originalEvent, type,page。
                    // page 为被点击的页码

                    objData.page = page;
                    queryUser();
                }
            }
            $(".pagination").bootstrapPaginator(options);
        }
        var id;
        var isDelete;
        var that;
        $("#tbody").on("click", ".isclose", function (e) {
            $("#start").modal('show');
            console.log(e.target)
            id = $(this).parents("tr")[0].dataset.id;
            isDelete = $(this).parents("tr")[0].dataset.isdelete;
            that=$(this);
        })

        $(".jin_btn").click(function () {

            var obj = {
                id: id,
                isDelete: isDelete
            };
            console.log(obj)
            updateUser(obj, function (result) {
                if (result.success) {
                    $("#start").modal('hide')
                    if (flag) {
                        $(that).html("启动");
                        $(that).removeClass('btn-danger').addClass("btn-primary");
                        $(that).parents("tr").children('.jin').html("已禁用");
                        flag = !flag;
                    } else {
                        $(that).html("禁用");
                        $(that).removeClass('btn-primary').addClass("btn-danger");
                        $(that).parents("tr").children('.jin').html("正常");
                        flag = !flag;
                    }
                }
            })
        })
    }
    function updateUser(obj, callback) {
        $.ltajax({
            url: '/user/updateUser',
            type: 'post',
            data: obj,
            success: function (result) {
                callback && callback(result);
            }
        })
    }
})