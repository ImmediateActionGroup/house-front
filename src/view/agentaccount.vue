<template>
  <div class="agentaccountpage">
    <div class="search-condition">
      <el-form :inline="true" :model="conditionparam" class="demo-form-inline">
        <el-form-item>
          <el-input class="F4EAD5-input" v-model="conditionparam.account" placeholder="ACCOUNT"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input class="EFF2CF-input" v-model="conditionparam.name" placeholder="NAME"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input class="D0E8F2-input" v-model="conditionparam.company_name" placeholder="COMPANY NAME"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input class="EFF2CF-input" v-model="conditionparam.tel" placeholder="TEL"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select  class="FBF0EC-input" v-model="conditionparam.islock" placeholder="ISLOCK">
            <el-option label="All" value=-1></el-option>
            <el-option label="Unlocked" value=0></el-option>
            <el-option label="Locked" value=1></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="handle-button">
      <el-button size="small" type="primary" @click="showcreateaccountdialog=true"  icon="el-icon-plus">Create Account</el-button>
      <el-button size="small" type="primary" icon="el-icon-search" @click="SearchIntermediaryAccountList(1)">Search</el-button>
    </div>
    <div class="data-table">
      <el-table
        stripe
        :data="datalist"
        border
        style="
            width: 100%;
            font-size: 11px;
            font-family:Helvetica;
          "
        :header-cell-class-name="tableheaderClassName"
        :cell-class-name="tableClassName"
      >
        <el-table-column
          label="Allocation House"
          width="90"
        >
          <!--分配项目-->
          <template slot-scope="scope">
            <i title="Allocation House" v-if="scope.row.islock==0" class="iconfont icon-fenpei" @click="showAllocationhouse(scope.row.account)" style="color: #ffa75f;cursor: pointer"></i>
          </template>
        </el-table-column>
        <el-table-column
          label="Reset Password"
          width="90"
        >
          <template slot-scope="scope">
            <i title="Reset Password" @click="showresetpassworddialog=true,currentresetpasswordaccount=scope.row.account" class="iconfont icon-chongzhi" style="color: #7578d3;cursor: pointer"></i>
          </template>
        </el-table-column>
        <el-table-column
          label="Lock"
          width="60"
          >
          <template slot-scope="scope">
            <i title="Lock Account" class="iconfont icon-suo" v-if="scope.row.islock==0" @click="showlockdialog=true,showtipstext='Are you sure lock account?',islock=1,currentlockaccount=scope.row.account" style="color: #d3be3a;cursor: pointer"></i>
            <i title="Unlock Account" class="iconfont icon-jiesuo" v-if="scope.row.islock==1" @click="showlockdialog=true,showtipstext='Are you sure unlock account?',islock=0,currentlockaccount=scope.row.account" style="color: #d3be3a;cursor: pointer"></i>
          </template>
        </el-table-column>
        <el-table-column
          prop="account"
          label="ACCOUNT">
        </el-table-column>
        <el-table-column
          prop="company_name"
          label="COMPANY NAME">
        </el-table-column>
        <el-table-column
          prop="address"
          label="ADDRESS">
        </el-table-column>
        <el-table-column
          prop="tel"
          label="TEL">
        </el-table-column>
        <el-table-column
          prop="email"
          label="EMAIL">
        </el-table-column>

        <el-table-column
          prop="islock"
          label="ISLOCK">
          <template slot-scope="scope">
            {{scope.row.islock==0?'':'Is locked'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="creator"
          label="CREATOR">
        </el-table-column>
      </el-table>
    </div>
    <div style="height: 40px;">
      <el-pagination
        layout="prev, pager, next"
        :total=totalcount
        :current-page.sync="currentpage"
        @current-change="handleCurrentChange"
        style="float: right"
      >
      </el-pagination>
    </div>

    <el-dialog class="form-dialog"  @close="closedialog('createaccountformdataref')" title="Create Account" width="500px" :visible.sync="showcreateaccountdialog">
      <el-form :model="createaccountformdata" ref="createaccountformdataref" label-width="180px">
        <el-form-item
          label="ACCOUNT"
          :rules="[
              { required: true, message: 'The account cannot be empty.', trigger: 'blur' },
            ]"
          prop="account"
        >
          <el-input placeholder="ACCOUNT" class="D0E8F2-input" v-model="createaccountformdata.account" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="PASSWORD"
          prop="originalpassword"
          :rules="[
              { required: true, message: 'The password cannot be empty.', trigger: 'blur' },
            ]"
        >
          <el-input placeholder="PASSWORD"  type="password" class="F4EAD5-input" v-model="createaccountformdata.originalpassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="CONFIRM PASSWORD"
          prop="confirmpassword"
          :rules="[
              { required: true, message: 'The password cannot be empty.', trigger: 'blur' },
            ]"
        >
          <el-input placeholder="CONFIRM PASSWORD" type="password"  class="EFF2CF-input" v-model="createaccountformdata.confirmpassword" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item class="form-dialog-footer">
          <span class="el-dialog__footer-btn" @click="createaccountformdata={}">Reset</span>
          <span class="el-dialog__footer-btn" @click="CreateIntermediaryAccount('createaccountformdataref')">Save</span>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="Tips" class="lockproject-dialog" :visible.sync="showlockdialog" height="15%">
      <span>{{showtipstext}}</span>
      <div slot="footer" class="dialog-footer">
        <span class="el-dialog__footer-btn" @click="LockUnlockIntermediaryAccount()">Yes</span>
        <span class="el-dialog__footer-btn" @click="showlockdialog=false">No</span>
      </div>
    </el-dialog>

    <el-dialog @close="closedialog('resetpasswordformref')" title="Reset Password" class="form-dialog"  :visible.sync="showresetpassworddialog" width="450px" height="160px">
      <el-form label-width="150px" :model="resetpasswordform" ref="resetpasswordformref">
        <el-form-item
          prop="ResetNewPassword"
          :rules="[
            { required: true, message: 'The password cannot be empty.', trigger: 'blur' },
          ]"
          label="NEW PASSWORD">
          <el-input style="width: auto" class="EFF2CF-input"  type="password" v-model="resetpasswordform.ResetNewPassword"  placeholder="NEW PASSWORD"></el-input>
        </el-form-item>
        <el-form-item class="form-dialog-footer">
            <span class="el-dialog__footer-btn" @click="ResetIntermediaryPassword('resetpasswordformref')">Confirm</span>
            <span class="el-dialog__footer-btn" @click="showresetpassworddialog=false">Cancel</span>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="Allocation House" :visible.sync="showallocationprojectdialog">

      <el-form :inline="true" :model="dialogconditionparam" class="demo-form-inline">
        <el-form-item>
          <el-select  style="width: 160px !important;" class="D0E8F2-input" v-model="dialogconditionparam.name" placeholder="PROJECT NAME">
            <el-option>All Project</el-option>
            <el-option
              v-for="item in projectidandnamearray"
              :key="item.name"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input style="width: 160px !important;" class="EFF2CF-input" v-model="dialogconditionparam.lot_NO" placeholder="LOT NO"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input style="width: 160px !important;" class="F4EAD5-input" v-model="dialogconditionparam.level" placeholder="LEVEL"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select style="width: 160px !important;"  class="FBF0EC-input" v-model="dialogconditionparam.orientation" placeholder="ORIENTATION">
            <el-option label="ALL" value=-1></el-option>
            <el-option label="E" value=0></el-option>
            <el-option label="N" value=1></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input style="width: 160px !important;" class="F4EAD5-input" v-model="dialogconditionparam.bed" placeholder="BED"></el-input>
        </el-form-item>
      </el-form>
      <div style="float: right;margin-bottom: 20px">
      <el-button  size="small" type="primary" icon="el-icon-edit" @click="AssignedHouseToIntermediary()">Assigned project</el-button>
      <el-button  size="small" type="primary" icon="el-icon-search" @click="SearchHouseAllInfoList(1)">Search</el-button>
      </div>
      <el-table
        stripe
        :data="dialogdatalist"
        border
        style="
            width: 100%;
            font-size: 11px;
            font-family:Helvetica;
          "
        ref="assignhousetableref"
      >

        <el-table-column
          :render-header='checkedallhouse'
          width="70">
          <template slot-scope="scope">
            <!--<el-checkbox true-label=true v-model="scope.row.checked" @change="handleCheckedChange($event,scope.row.id.toString())"></el-checkbox>-->
            <label class="demo--label">
              <input class="demo--radio" type="checkbox" name="demo-checkbox3" v-model="scope.row.checked" @change="handleCheckedChange($event,scope.row.id.toString())">
              <span class="demo--checkbox demo--radioInput"></span>
            </label>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="PROJECT NAME">
        </el-table-column>
        <el-table-column
          prop="lot_NO"
          label="LOT_NO">
        </el-table-column>
        <el-table-column
          prop="level"
          label="LEVEL">
        </el-table-column>
        <el-table-column
          prop="orientation"
          label="ORIENTATION">
          <template slot-scope="scope">
            <span>{{ scope.row.orientation==0?'E':'N'}}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="lot_size"
          label="LOT SIZE">
        </el-table-column>
        <el-table-column
          prop="bed"
          label="BED">

        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total=dialogtotalcount
        :current-page.sync="dialogcurrentpage"
        @current-change="dialoghandleCurrentChange">
      </el-pagination>
    </el-dialog>
  </div>
</template>

<script>
  import md5util from '../util/md5util.js'
  export default {
    name: '',
    data () {
      return {
        resetpasswordform:{
        },
        showcreateaccountdialog:false,
        showresetpassworddialog:false,
        currentresetpasswordaccount:undefined,
        currentlockaccount:undefined,
        islock:0,
        showtipstext:'Are you sure lock account?',
        showlockdialog:false,
        datalist:[],
        currentpage:1,
        totalcount:0,
        conditionparam:{
          count:10,
        },
        createaccountformdata:{},
        //给我分配的房子  或者在原有房子的基础上选中删除之后的数组
        houseidarray:[],
        dialogcurrentpage:1,
        dialogtotalcount:0,
        dialogconditionparam:{
          count:10,
        },
        dialogdatalist:[],
        currentallocationprojectaccount:undefined,
        showallocationprojectdialog:false,
        houseSelection:[],
        defaultselectedhouse:[],
        projectidandnamearray:[],

      }
    },
    watch: {
      //element ui 的分页有bug  不能再handlecurrentpage中调用查询   只能监听currentpage的变化来查询
      currentpage:{
        handler:function(val,oldval){
          this.SearchIntermediaryAccountList();
        },
        deep:true//对象内部的属性监听，也叫深度监听
      },
      dialogcurrentpage:{
        handler:function(val,oldval){
          this.SearchHouseAllInfoList();
        },
        deep:true//对象内部的属性监听，也叫深度监听
      },
    },
    components: {},
    mounted(){
      this.Verify();
      this.SearchProjectInfoIdAndName();
      this.SearchIntermediaryAccountList();
    },
    methods: {
      //自定义渲染头部选择框
      checkedallhouse(h) {
        return h('label',
          [
          h('input', {
            attrs: {
              id:'checkallhouse',
              class:'demo--radio',
              type:'checkbox'
            },
            on: {
              change: () => {
                  this.clickcheckedallhouse();
              }
            }
          },''),
            h('span', {
              attrs: {
                class:'demo--checkbox demo--radioInput'
              },
              on: {
              }
            },''),
        ])
      },
      clickcheckedallhouse(){
        var ischecked = document.getElementById("checkallhouse").checked;
        //全选
        if(ischecked){
          for(var i=0;i<this.dialogdatalist.length;i++){
            var val = this.dialogdatalist[i].id;
            //将数据选中
            this.dialogdatalist[i].checked = true;
            console.log('这里是id',this.dialogdatalist[i].id,this.dialogdatalist[i].checked);
            //不存在选中数组中
            if(this.houseidarray.indexOf(val)==-1){
              this.houseidarray.push(val);
            }
          }
        }
        //取消全选
        else{
          for(var i=0;i<this.dialogdatalist.length;i++){
            var val = this.dialogdatalist[i].id;
            var index = this.houseidarray.indexOf(val);
            //将数据选中
            this.dialogdatalist[i].checked = false;
            if(index!=-1){
              this.houseidarray.splice(index,1);
            }
          }
        }
      },
      handleCheckedChange(e,val){
         var checked = event.currentTarget.checked;
         val = parseInt(val);
        //选中
        if(checked){
          //不存在选中数组中
          if(this.houseidarray.indexOf(val)==-1){
            this.houseidarray.push(val);
          }
        }
        //不选中删除数组中的元素
        else{
          var index = this.houseidarray.indexOf(val);
          if(index!=-1){
            this.houseidarray.splice(index,1);
          }
        }
      },
      SearchProjectInfoIdAndName(){
        if(this.projectidandnamearray.length!=0)
          return;
        let res = this.requestutil.ajax('/SearchProjectInfoIdAndName', null, false,this);
        this.projectidandnamearray = res.message;
      },
      showAllocationhouse(account){
        //清空默认选中
        this.defaultselectedhouse =[];
        this.showallocationprojectdialog=true;
        this.currentallocationprojectaccount=account;
        this.SearchIntermediaryHouses();
        this.SearchHouseAllInfoList(1)
      },
      closedialog(formName){
        this.defaultselectedhouse =[];
        this.houseidarray = [];
        var dom = this.$refs[formName];
        if(dom!=undefined){
          if (Array.isArray(dom)) dom = dom[0];
          dom.resetFields();
        }
      },
      tableheaderClassName({ row, column, rowIndex, columnIndex}) {
        if(column.label=='Allocation House'||column.label=='Reset Password'||column.label=='Lock')
          return 'table-operate-header-cell';
        if(column.label=='ID'||column.label=='ISLOCK')
          return 'table-header-cell-1';
        if(column.label=='ACCOUNT'||column.label=='TEL')
          return 'table-header-cell-4';
        if(column.label=='COMPANY NAME'||column.label=='EMAIL')
          return 'table-header-cell-3';
        if(column.label=='ADDRESS'||column.label=='CREATOR')
          return 'table-header-cell-2';
      },
      tableClassName({ row, column, rowIndex, columnIndex}){
        if(column.label=='Allocation House'||column.label=='Reset Password'||column.label=='Lock')
          return 'table-operate-cell';
        if(column.label=='ID'||column.label=='ISLOCK')
          return 'table-cell-1';
        if(column.label=='ACCOUNT'||column.label=='TEL')
          return 'table-cell-4';
        if(column.label=='COMPANY NAME'||column.label=='EMAIL')
          return 'table-cell-3';
        if(column.label=='ADDRESS'||column.label=='CREATOR')
          return 'table-cell-2';
      },
      SearchIntermediaryHouses(){
        var param = {
          account:this.currentallocationprojectaccount
        }
        var res = this.requestutil.ajax('/SearchIntermediaryHouses',param,false,this);
        if(res.statuscode<0){
          this.houseidarray = [];
          return;
        }

        this.houseidarray = res.message.split(",");
        //string数组转int数组
        var dataIntArr=this.houseidarray.map(function(data){
          return +data;
        });
        this.houseidarray = dataIntArr;
      },
      /*分配项目*/
      AssignedHouseToIntermediary(){
        var param={
          houses:this.houseidarray.toString(),
          account:this.currentallocationprojectaccount,
        }
        var res = this.requestutil.ajax('/AssignedHouseToIntermediary',param,true,this);
        this.showallocationprojectdialog = false;
        this.houseidarray=[];
      },
      SearchHouseAllInfoList:function(currentpage){
        if(currentpage!=undefined){
          //如果是查询清空默认选中
          this.defaultselectedhouse = [];
          this.dialogcurrentpage = currentpage;
        }
        //计算跳过多少行
        this.dialogconditionparam.skip = (this.dialogcurrentpage-1)*this.dialogconditionparam.count;
        //只查询出未预定的
        this.dialogconditionparam.statuss = 0;
        var res = this.requestutil.ajax('/SearchHouseAllInfoList', this.dialogconditionparam, false,this);
        if(res.statuscode>=0){
          var message = JSON.parse(res.message);
          //为列表加入checked属性来判定初始是否选中
          for(var i=0;i<message.datalist.length;i++){
            if(this.houseidarray.indexOf(message.datalist[i].id)>=0){
              message.datalist[i].checked=true;
            }else{
              message.datalist[i].checked=false;
            }
          }
          this.dialogtotalcount = message.totalcount;
          this.dialogdatalist = message.datalist;

        }else if(res.statuscode<0){
          this.dialogtotalcount =0;
          this.dialogdatalist = [];
        }
      },
      //获取当前页
      dialoghandleCurrentChange (val) {
        this.dialogcurrentpage = val;
      },
      //获取当前页
      handleCurrentChange (val) {
        this.currentpage = val;
      },
      Verify(){
        var res = this.requestutil.ajax('/VerifyUser',null,true,this);
        if(res.statuscode>=0) {
          let message = JSON.parse(res.message);
          //厚易admin
          if (message.AccountType != 0 || message.Role != 0) {
            this.$goRoute("/login");
          }
        }
      },
      SearchIntermediaryAccountList(currentpage){
        if(currentpage!=undefined)
          this.currentpage = currentpage;
        var param = Object.assign({}, this.conditionparam);
        param.skip = (this.currentpage-1)*10;
        if(this.conditionparam.islock==-1){
          param.islock = null;
        }
        var res = this.requestutil.ajax('/SearchIntermediaryAccountList',param,true,this);
        if(res.statuscode<0){
          this.datalist=[];
          return;
        }
        let message = JSON.parse(res.message);
        this.datalist = message.datalist;
        this.totalcount = message.totalcount;
      },
      CreateIntermediaryAccount(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            /*判断两次输入密码是否一致*/
            if(this.createaccountformdata.originalpassword!=this.createaccountformdata.confirmpassword){
              this.$message({
                showClose: true,
                message: 'Entered passwords differ',
                type: 'error'
              });
              return;
            }
            this.showcreateaccountdialog = false;
            this.createaccountformdata.password = md5util.md5(this.createaccountformdata.originalpassword);
            var res = this.requestutil.ajax('/CreateIntermediaryAccount',this.createaccountformdata,true,this);
            if(res.statuscode>=0){
              this.createaccountformdata={};
              this.showcreateaccountdialog=false;
              this.SearchIntermediaryAccountList(1);
            }
          }
        });
      },

      LockUnlockIntermediaryAccount(){
        var param = {
          account:this.currentlockaccount,
          islock:this.islock,
        }
        this.requestutil.ajax('/LockUnlockIntermediaryAccount',param,true,this);
        this.showlockdialog = false;
        this.SearchIntermediaryAccountList(1);
      },
      ResetIntermediaryPassword(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var param = {
              account:this.currentresetpasswordaccount,
              password:md5util.md5(this.resetpasswordform.ResetNewPassword)
            }
            var res = this.requestutil.ajax('/ResetIntermediaryPassword',param,true,this);
            if(res.statuscode>=0){
              this.resetpasswordform={};
              this.showresetpassworddialog=false;
            }
          }
        });
      }
    }
  }
</script>

<style>
  @import '../../static/css/modulestyle.css';
  @import '../assets/iconfont/iconfont.css';
  .agentaccountpage .search-condition{
    padding: 20px;
  }
  .agentaccountpage .handle-button{
    margin-right: 30px;
    float: right;
    margin-bottom: 20px;
  }
  .agentaccountpage .handle-button button{
    background: #2C75B8;
    color: #FFFFFF;
    font-family:PingFangSC-Semibold;
  }

  .agentaccountpage .data-table{
    padding: 20px ;
  }

  .demo--radio{
    display:none
  }
  .demo--radioInput{
    background-color:#fff;
    border:1px solid rgba(0,0,0,0.15);
    border-radius:100%;
    display:inline-block;
    height:16px;
    margin-right:10px;
    margin-top:-1px;
    vertical-align:middle;
    width:16px;
    line-height:1;
    cursor: pointer;
  }
  .demo--radio:checked + .demo--radioInput:after {
    background-color: #409eff;
    border-radius:100%;
    content:"";
    display:inline-block;
    height:12px;
    margin:2px;
    width:12px
  }
  .demo--checkbox.demo--radioInput,.demo--radio:checked + .demo--checkbox.demo--radioInput:after{
    border-radius:0
  }

</style>
