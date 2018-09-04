<template>
    <div class="navmenu" id="navmenu">
        <el-menu
          default-active="1"
          background-color="#45454D"
          text-color="#A6B6CF"
          active-text-color="#3DA1FF"
          >
          <el-menu-item v-if="showhouse" index="1" @click="$goRoute('/home/house')">
            <i class="menu-icon iconfont icon-fangzi1"></i>
            <span slot="title">House</span>
          </el-menu-item>
          <el-menu-item v-if="showproject" index="1-1" @click="$goRoute('/home/project')">
            <i class="menu-icon el-icon-menu"></i>
            <span slot="title">Project</span>
          </el-menu-item>
          <el-menu-item v-if="showfinance" index="2" @click="$goRoute('/home/project',{finance:true})">
            <i class="menu-icon el-icon-document"></i>
            <span slot="title">Finance</span>
          </el-menu-item>
          <el-menu-item v-if="showagentaccount" index="3"  @click="$goRoute('/home/agentaccount')">
            <i class="menu-icon iconfont icon-zhongjie"></i>
            <span slot="title">Agent Account</span>
          </el-menu-item>

          <el-menu-item v-if="showsystem" index="4"  @click="$goRoute('/home/system')">
            <i class="menu-icon iconfont icon-system"></i>
            <span slot="title">System</span>
          </el-menu-item>
          <el-menu-item v-if="false" index="5"  @click="$goRoute('/home/modificationrecord')">
            <i class="menu-icon iconfont icon-jilu"></i>
            <span slot="title">Modification Record</span>
          </el-menu-item>
          <el-menu-item v-if="showemployee" index="6" @click="$goRoute('/home/employee')">
            <i class="menu-icon iconfont icon-xiaoshou"></i>
            <span slot="title">Employee</span>
          </el-menu-item>
          <el-menu-item v-if="showmyproject"  index="7" @click="$goRoute('/home/house',{myproject:true});">
            <i class="menu-icon iconfont icon-wode"></i>
            <span slot="title">My Project</span>
          </el-menu-item>
          <el-menu-item v-if="showagentreportforms" index="8" @click="$goRoute('/home/agentreportforms')">
            <i class="menu-icon iconfont icon-pie"></i>
            <span slot="title">Report Forms</span>
          </el-menu-item>
          <el-menu-item v-if="false" index="9" @click="$goRoute('/home/reportforms')">
            <i class="menu-icon iconfont icon-pie"></i>
            <span slot="title">Report Forms</span>
          </el-menu-item>
          <el-menu-item v-if="showpurchaserreportforms" index="10" @click="$goRoute('/home/purchaserreportforms')">
            <i class="menu-icon iconfont icon-pie"></i>
            <span slot="title">Report Forms</span>
          </el-menu-item>

        </el-menu>


    </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
              showproject:false,
              showhouse:false,
              showfinance:false,
              showagentaccount:false,
              showsystem:false,
              showemployee:false,
              showreportforms:false,
              showmyproject:false,
              showmodificationrecord:false,
              showagentreportforms:false,
              showpurchaserreportforms:false,
            }
        },
        components: {

        },
        methods: {
          showmenu(){
            var res = this.requestutil.ajax('/VerifyUser',null,false,this);
            if(res.statuscode>=0) {
              let message = JSON.parse(res.message);
              //厚易admin
              if (message.AccountType == 0 && message.Role == 0) {
                this.showsystem = true;
                /*this.showreportforms = true;*/
                this.showagentaccount = true;
                this.showproject = true;
                this.showmodificationrecord = true;
//              this.showagentreportforms = true;
                this.showpurchaserreportforms=true;
                this.showhouse = true;
              }
              //厚易财务
              else if (message.AccountType == 0 && message.Role == 1) {
                this.showfinance = true;
              }
              //厚易股东
              else if (message.AccountType == 0 && message.Role == 2) {
//                this.showreportforms = true;
//                this.showagentreportforms = true;
                this.showpurchaserreportforms=true;

              }
              //中介
              else if (message.AccountType == 1) {
                this.showemployee = true;
                this.showhouse=true;
              }
              //销售
              else if (message.AccountType == 2) {
                this.showhouse=true;
                this.showmyproject = true;
              }
            }
          }

        },
        mounted(){
          this.showmenu();
        },created(){

        }
    }
</script>

<style>

  .navmenu{
    /*width: 15%;
    max-height: 100%;
    background: red;*/
  }
  .navmenu .el-menu{
    width: 100%;
    height: 100%;
    border-right-width: 0px;
    position: absolute;
    top: 0px;
    margin-top: 36px;
  }
  .navmenu .el-menu-item{
    font-family:Helvetica;
  }
  .navmenu .menu-icon{
    color: #A6B6CF;
    margin-right: 30px;
  }

</style>
