$(function () {


    var totalPage = 1;
    var ValiForm;
    var objData = {
        page: 1,
        pageSize: 4
    }
    init();
    function init() {
        querySecondCategoryPaging();
        // $.cateChange();
        setFormValite();
        initFileUpload();
        queryTopCategoryPaging();
    }
    function querySecondCategoryPaging() {
        $.get("/category/querySecondCategoryPaging", objData, function (result) {
            console.log(result)
            totalPage = Math.ceil(result.total / objData.pageSize);

            var userArr = [];
            for (var i = 0; i < result.rows.length; i++) {

                userArr.push('  <tr> <td>' + ((objData.page - 1) * objData.pageSize + i + 1) + '</td> <td>' + result.rows[i].categoryName + '</td> <td>' + result.rows[i].brandName + '</td> <td><img src="' + result.rows[i].brandLogo + '" alt=""/></td> </tr>')
            }
            var html = userArr.join("");
            $("#tbody").html(html)

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
                querySecondCategoryPaging();
            }
        }
        $(".pagination").bootstrapPaginator(options);
    }

    function setFormValite() {
        // 对表单进行配置
        var $form = $('#ff').bootstrapValidator({
            /*校验插件默认会忽略  隐藏的表单元素
                  不忽略任何情况的表单元素*/
            excluded: [],
            // 图标
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            // 要验证的字段
            fields: {
                // 分类名称-name属性
                category: {
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
                },
                brandLogo: {
                    // 用户名的提示信息
                    // message: 'The username is not valid',
                    validators: {
                        // 不能为空
                        notEmpty: {
                            message: '请上传图片'
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

            // 准备发送请求
            var brandName = $(".categoryName").val();
            var categoryId = $("#categoryId").val();
            var brandLogo = $("#brandLogo").val();
            var hot = "";
            var obj = {
                brandName: brandName,
                categoryId: categoryId,
                brandLogo: brandLogo,
                hot: hot
            };

            // 发送请求
            $.post("/category/addSecondCategory", obj, function (result) {
                if (result.success) {
                    // 关闭模态框
                    $('#cateSModal').modal('hide')
                    // 刷新数据
                    querySecondCategoryPaging();

                } else {
                    // 失败
                    console.log("提交失败");
                }

            })
        });
    }
    /* s上传 */

    // 初始化文件上传插件
  function initFileUpload() {
        $('.fileuploadBtn').fileupload({
            dataType: 'json',
            // 上传成功的时候调用
            done: function (e, data) {
                // data.result 为上传成功的返回值
                /// 上传成功之后 会执行 
                // console.log(data.result);
                var src = data.result.picAddr;
                // 设置图片的路径
                $(".ff_img").attr("src", src);

                // 设置隐藏的值
                $("#brandLogo").val(src);

                // 手动去掉表单的验证
                // VALID->正确的
                $('#ff').data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
            }
        });

    }

    // 查询一级分类
    function queryTopCategoryPaging() {
        $.get("/category/queryTopCategoryPaging", { page: 1, pageSize: 1000 }, function (result) {
            // console.log(123);

            var rows = result.rows;
            // <option value=""></option>
            var htmlArr = [];
            for (var i = 0; i < rows.length; i++) {
                htmlArr.push('<option value="' + rows[i].id + '">' + rows[i].categoryName + '</option>');
            }

            console.log(htmlArr.join(''))
            $(".selected_category").html(htmlArr.join(''));

        })
    }


    // 表单重置 
    $('#cateFirstModal').on('hide.bs.modal', function (e) {
        // 重置表单 - js 原生的重置  重置 输入框的文字
        $("#ff")[0].reset();
        // 重置验证信息- 插件的重置 重置的是插件自己的图标显示 
        $("#ff").data('bootstrapValidator').resetForm();

        // 重置隐藏域和图片
        $(".brandLogo").val("");
        $(".ff_img").attr("src", "./images/none.png");
    })
})
