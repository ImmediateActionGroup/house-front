<template>
  <div >
    <div class="headerpage">
      <img class="logo" src="/static/img/LOGO.png">
      <div class="systemname">Management System</div>
      <div class="right-div">
        <span class="username" >Welcome , {{$store.state.author}}
          &nbsp;&nbsp;&nbsp;&nbsp;
        <i style="font-size: 10px;cursor: pointer" v-if="!showdownmenu" class="iconfont icon-daosanjiao" @click="showdownmenu=true"></i>
          <i style="font-size: 10px;cursor: pointer" v-if="showdownmenu" class="iconfont icon-zhengsanjiao"  @click="showdownmenu=false"></i>
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <el-button class="logout"  size="mini" @click="LogOut()">logout</el-button>

        <div class="down-menu" v-if="showdownmenu">
          <div class="changepassword" @click="$goRoute('/home/changepassword'),showdownmenu=false"><i class="iconfont icon-lock" ></i>&nbsp;&nbsp;Change Password</div>
          <div class="modifydata" @click="$goRoute('/home/modifydata'),showdownmenu=false"><i class="iconfont icon-shezhi" ></i>&nbsp;&nbsp;Modify Data</div>
        </div>
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
  methods:{
    LogOut(){
      var res = this.requestutil.ajax('/LogOut',null,false,this);
      this.$goRoute('/login');
    }
  }
}
</script>

<style scoped>
  @import '../assets/iconfont/iconfont.css';
  .headerpage{
    z-index: 1;
    width:100%;
    height:36px;
    background:rgba(43,43,48,1);
  }
  .headerpage .right-div .down-menu{
    width:170px;
    height:85px;;
    background:rgba(71,71,79,1);
    border-radius:0px 0px 4px 4px ;
    position: absolute;
    z-index: 1000;
    top: 36px;
  }
  .headerpage .right-div .down-menu .changepassword,.headerpage .right-div .down-menu .modifydata{
    height: 50%;
    font-size: 14px;
    font-family:Helvetica;
    color:rgba(255,255,255,1);
    line-height:13.48px;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
  }
  .headerpage .logo{
    margin-left:  15%;
    display: inline-block;
    text-align: center;
    line-height: 36px;
    text-align: center;
    vertical-align: middle;
  }
  .headerpage .systemname{
    font-size:14px;
    font-family:Helvetica-Bold;
    color:rgba(255,255,255,1);
    line-height:36px;
    text-align: center;
    display: inline-block;
    margin: 0px 40px;
  }
  .headerpage .right-div .username{
    height:100%;
    font-size:11.43px;
    font-family:Helvetica;
    color:rgba(255,255,255,1);
    position: relative;
    line-height:36px;
    display: inline-block;
  }
  .headerpage .right-div button{
    background:rgba(45,118,183,1);
    border-radius: 3.57px ;
    border: 0px;
    font-family:Helvetica;
    color:rgba(255,255,255,1);

  }
  .headerpage .right-div{
    float: right;
    margin-right: 10%;
  }


</style>
