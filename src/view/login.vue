<template>
    <div class="login_content">
      <div class="login">
        <div class="login-tab">
          <h1>Sign in</h1>
        </div>
        <div class="login-box">
          <div class="form">
            <form id="formlogin" method="post" onsubmit="return false;">
              <div class="item item-fore1">
                <p>Account</p>
                <input id="loginname" v-model="loginparam.account" placeholder="Account">
              </div>
              <div class="item item-fore2">
                <p>Password</p>
                <input type="password" id="password" v-model="loginparam.originalpassword" placeholder="Password">
              </div>

              <div class="item-fore4">
                <button @click="Login()" >Sign in</button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
  import md5util from '../util/md5util.js'
    export default {
        name: '',
        data () {
            return {
              loginparam:{},

            }
        },
        components: {},
        mounted(){
          this.islogin();
        },
        methods: {
          IsPC(){
            var userAgentInfo = navigator.userAgent;
            var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
              if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
            }
            return flag;
          },

          Login(){
            this.loginparam.password = md5util.md5(this.loginparam.originalpassword);
            var res = this.requestutil.ajax('/Login',this.loginparam,true,this);
            if (res.statuscode>=0){
              if(this.IsPC())
                this.$goRoute('/home/house');
              else{

                  this.$goRoute('/Mhome/Mhouse');
              }
            }

          },
          islogin(){
            var res = this.requestutil.ajax('/IsLogin',null,true,this);
            if (res.statuscode>=0){
              if(this.IsPC())
                this.$goRoute('/home/house');
              else
                var res = JSON.parse(res.message);
                if(res.Role==2)
                  this.$goRoute('/Mhome/Mhouse');
            }
          }
        },

    }
</script>

<style>
  @import '../../static/css/modulestyle.css';
  /*登录 */
  .login_content{
    background:url(../../static/img/bgbig.png) ;
    background-size:cover ;
    overflow: hidden;
  }
  .login_content{
    position:absolute;
    right:0;
    left:0;
    bottom:0;
    top:0;
    margin:auto;
  }
  .login_content>.login{
    width: 360px;
    height: 400px;
    margin:0 auto;
    padding:20px;
    background: #fff;
    position: absolute;
    top:50%;
    margin-top: -200px;
    left: 50%;
    margin-left: -180px;
  }
  .login_content>.login>.login-tab{text-align: center;;}
  .login_content>.login>.login-tab>h1{font-size: 34px;line-height: 48px;}
  .login_content>.login>.login-tab>p{font-size:16px;line-height: 22px;}
  .login_content>.login>.login-tab>p>a{color:#2C75B8;}

  .login_content>.login>.login-box{
    width:100%;
    height: auto;
    margin-top:28px;
  }

  .login_content>.login>.login-box>.form>#formlogin>.item{
    color:#2E3233;
    height: 70px;
  }
  .login_content>.login>.login-box>.form>#formlogin>.item>p{
    font-size: 14px;
  }
  .login_content>.login>.login-box>.form>#formlogin>.item> input{
    outline:none;
    border: 1px solid #DDDDDD;
    width: 320px;
    height: 35px;
    line-height: 35px;
    background-color: #FCFCFC;
  }

  .login-box>.form>#formlogin>.item-fore3>em{
    font-style: normal;
    font-size: 14px;
  }
  .login-box>.form>#formlogin>.item-fore4>button{
    cursor: pointer;
    width:320px;
    height: 44px;
    border: none;
    color: #FFF;
    font-size:18px;
    background-color:#2C75B8;
    text-align: center;
    line-height: 44px;
    border-radius: 3px;
    margin-top:28px
  }

  .login_content .foot{
    width: 400px;
    margin:100px auto;
    height:auto;
    text-align: center;
    font-size: 14px;
  }


  .icon-weibiaoti39{
    font-family:"iconfont";
    color: #2C75B8;
    font-size: 11px;
    height: 4px;
    margin-right: 5px;
  }

  /* #endregion */

</style>
