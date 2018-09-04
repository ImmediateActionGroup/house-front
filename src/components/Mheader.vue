<template>
    <div>
      <div class="m-headerpage">
        <div class="logo-div">
          <img class="logo" src="/static/img/LOGO.png">
        </div>
        <div class="right-div">
          <span class="username">{{$store.state.author}}</span>
          <i class="iconfont icon-tuichu" style="margin-left: 1rem;font-size: 1.5rem" @click="LogOut()"></i>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      data () {
        return {
          showdownmenu:false,
          dialogFormVisible: false,
        }
      },
      mounted(){
        /*fnResize()
        window.onresize = function () {
          fnResize()
        }
        function fnResize() {
          var deviceWidth = document.documentElement.clientWidth || window.innerWidth
          if (deviceWidth >= 750) {
            deviceWidth = 750
          }
          if (deviceWidth <= 320) {
            deviceWidth = 320
          }
          document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px'
        }*/
      },
      methods:{
        LogOut(){
          var res = this.requestutil.ajax('/LogOut',null,false,this);
          this.$goRoute('/login');
        }
      }
    }
</script>

<style>
  @import '../assets/iconfont/iconfont.css';
  .m-headerpage{
    font-size: 0rem;
    width:100%;
    height:3rem;
    background:rgba(43,43,48,1);
  }
  .m-headerpage .logo-div{
    display: inline-block;
    margin-left:  15%;
    height: 100%;
    vertical-align: middle;
  }
  .m-headerpage .logo{
    position: absolute;
    height: 1.5rem;
    top: 0.75rem;
  }
  .m-headerpage .right-div{
    width: 70%;
    font-size:1rem;
    font-width: 200;
    font-family:Helvetica;
    color:rgba(255,255,255,1);
    line-height:3rem;
    display: inline-block;
    margin: auto 5% auto 0;
    text-align: right;
  }
</style>
