$(function () {

    var picArr = [];
    var totalPage = 1;
    var ValiForm;
    var objData = {
        page: 1,
        pageSize: 4
    }
    init();
    function init() {
        queryTopCategoryPaging(); 
        setFormValite();
        initFileUpload();
    }
    function queryTopCategoryPaging() {
        $.get("/product/queryProductDetailList", objData, function (result) {
            console.log(result.total)
            totalPage = Math.ceil(result.total / objData.pageSize);
            console.log(totalPage)
            var userArr = [];
            for (var i = 0; i < result.rows.length; i++) {

                userArr.push('  <tr> <td>' + ((objData.page - 1) * objData.pageSize + i + 1) +
                    '</td> <td>' + result.rows[i].proName +
                    '</td> <td>' + result.rows[i].proDesc +
                    '</td> <td>' + result.rows[i].num +
                    '</td> <td>' + result.rows[i].size +
                    '</td> <td>已上架</td> <td> <a href="javascript:;" class="btn btn-sm btn-danger">下架</a> <a href="javascript:;" class="btn btn-sm btn-primary">编辑</a> </td> </tr> ')

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
                queryTopCategoryPaging();
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
                proName: {
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
                pic: {
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
                },
                proDesc: {
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
                ,
                num: {
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
                ,
                price: {
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
                ,
                oldPrice: {
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
                ,
                size: {
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
        $form.on('success.form.bv', function (e) {
            // 点击提交的时候  

            // 阻止默认提交事件
            e.preventDefault();

            // 准备发送请求
            var proName = $(".proName").val();
            var proDesc = $(".proDesc").val();
            var num = $(".num").val();
            var price = $(".price").val();
            var oldPrice = $(".oldPrice").val();
            var size = $(".size").val();
            var  img=picArr;

            var obj = {
                proName: proName,
                proDesc: proDesc,
                num: num,
                price: price,
                oldPrice: oldPrice,
                size: size,
                statu:'',
                brandId:'',
                pic: img
            };

//            发送请求
            $.post("/product/addProduct", obj, function (result) {
                if (result.success) {
                    // 关闭模态框
                    $('#productManage').modal('hide')
                    // 刷新数据
                    queryTopCategoryPaging();

                } else {
                    // 失败
                    console.log("提交失败");
                }

            })
        });


    }


    function initFileUpload() {
        $('.fileuploadBtn').fileupload({
            dataType: 'json',
            done: function (e, data) {
                if (picArr.length < 3) {
                    /*追加图片*/
                    $(".img").append('<img width="100" height="100" src="' + data.result.picAddr + '"/> ');
                    picArr.push(data.result);//{picName:'',picAddr:''}
                    console.log(data.result)
                    /*上传了三张图片 显示合法的提示*/
                    if (picArr.length == 3) {
                        $('#ff').data('bootstrapValidator').updateStatus('pic', 'VALID');
                    }
                }
            }
        });

    }





})