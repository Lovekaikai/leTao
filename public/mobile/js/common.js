/* 把自己方法拓展到$上 */
$.extend($, {
    /**
   * 根据key去查询url上的参数的值
   * @param {*参数名} name 
   */
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]); return null;
    }
})



