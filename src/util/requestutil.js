import $ from 'jquery'
export default {
  ajax :function (url, params, isalert,_this) {
    var res;
    $.ajax({
      type: "POST",
      url: _this.$store.state.posturl + url,
      //url:  url,
      async: false,
      xhrFields: {
        withCredentials: true
      },
      data: params,
      success: function (response) {
        var response = JSON.parse(response);
        //session失效则直接返回
        let result = _this.routerutil.invalidsessiongologin(response,_this)
        if(result)
          return;
        //  message不是以[   {开头(非json数据)
        if (_this!=null && _this!=undefined && response.message!="" && isalert && response.message.indexOf("{") != 0 && response.message.indexOf("[") != 0 ) {
          //状态码小于0  -139:没有返回的信息
          if (response.statuscode < 0 && response.statuscode!=-139) {
            _this.$message({
             showClose: true,
             message: response.message,
             type: 'error'
             });
          } else if(response.statuscode!=-139){
            _this.$message({
              showClose: true,
              message: response.message,
              type: 'success'
            });
          }
        }
        res = response;
      }
    });
    return res;
  },

}
