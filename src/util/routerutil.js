export default {
  //session失效跳转登录页
  invalidsessiongologin(res,_this){
    if(res.statuscode == -111){
      _this.$goRoute('/login');
      /*_this.$message({
        showClose: true,
        message: 'invalid session!',
        type: 'warning'
      });*/
      return true;
    }
    return false;

  },

}
