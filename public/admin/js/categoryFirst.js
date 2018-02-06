$(function () {


    var totalPage = 1;
    var ValiForm;
    var objData = {
        page: 1,
        pageSize: 4
    }
    init();
    function init() {
        queryTopCategoryPaging();
        // $.cateChange();
        setFormValite();

    }
    function queryTopCategoryPaging() {
        $.get("/category/queryTopCategoryPaging", objData, function (result) {
            console.log(result.total)
            totalPage = Math.ceil(result.total / objData.pageSize);
            console.log(totalPage)
            var userArr = [];
            for (var i = 0; i < result.rows.length; i++) {

                userArr.push(' <tr> <td>' + ((objData.page - 1) * objData.pageSize + i + 1) + '</td> <td>' + result.rows[i].categoryName + '</td> </tr>')
            }
            var html = userArr.join("");
            $("#tbody").html(html)

            console.log(result)
            setPage();

        })
    }



    function setPage() {

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
                queryTopCategoryPaging();
            }
        }
        $(".pagination").bootstrapPaginator(options);
    }

    // 启用表单验证
    function setFormValite() {
        // 对表单进行配置
        var $form = $('#ff').bootstrapValidator({
            /*校验插件默认会忽略  隐藏的表单元素
                  不忽略任何情况的表单元素*/
            //excluded:[],
            // 图标
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            // 要验证的字段
            fields: {
                // 分类名称-name属性
                categoryName: {
                    // 用户名的提示信息
                    // message: 'The username is not valid',
                    validators: {
                        // 不能为空
                        notEmpty: {
                            message: '分类名称不能为空'
                        },
                        // 提供给ajax回调使用
                        callback: {
                            message: "用户名不存在"
                        }
                    }
                }
            }
        });


        // 开始启用表单验证 满足验证要求的时候 自己执行
        $form.on('success.form.bv', function (e) {
            // 点击提交的时候  

            // 阻止默认提交事件
            e.preventDefault();

            // console.log(123);

            // 提交
            addTopCategory(function (result) {
                console.log(result)
                // 关闭模态框
                $('#cateFirstModal').modal('hide');
                // 刷新数据-已经更新了分页插件了 
                queryTopCategoryPaging();
            });
        });

        ValiForm = $form;
    }

    function addTopCategory(callback) {

        // 获取参数
        var categoryName = $(".categoryName").val();
        console.log(categoryName)
        var obj = { categoryName: categoryName };
        $.post("/category/addTopCategory", obj, function (result) {
            if (result.success) {
                console.log("成功");
                callback && callback(result);
            } else {
                console.log("失败");
            }

        })
    }

    // hide 方法调用之后立即触发该事件 模态框隐藏之后 马上触发
    // 做表单重置的
    $('#cateFirstModal').on('hide.bs.modal', function (e) {
        // 重置表单 - js 原生的重置  重置 输入框的文字
        $("#ff")[0].reset();
        // 重置验证信息- 插件的重置 重置的是插件自己的图标显示 
        $("#ff").data('bootstrapValidator').resetForm();
    })


})
