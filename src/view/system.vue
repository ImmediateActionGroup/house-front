<template>
    <div class="systempage">
      <div class="search-condition">
        <el-form :inline="true" :model="conditionparam" class="demo-form-inline">
          <el-form-item>
            <el-select class="FBF0EC-input" v-model="conditionparam.islock" placeholder="ISLOCK">
              <el-option label="All" value=-1></el-option>
              <el-option label="Unlocked" value=0></el-option>
              <el-option label="Locked" value=1></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select class="EFF2CF-input" v-model="conditionparam.role" placeholder="ROLE">
              <el-option label="All" value=-1></el-option>
              <el-option label="Administrator" value=0></el-option>
              <el-option label="Finance" value=1></el-option>
              <el-option label="Shareholder" value=2></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="handle-button" >
        <el-button size="small" type="primary" @click="showcreateaccountdialog=true" icon="el-icon-plus">Create Account</el-button>
        <el-button size="small" type="primary" icon="el-icon-search" @click="SearchHouyiAccountList(1)">Search</el-button>
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
            prop="name"
            label="NAME">
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
            prop="role"
            label="ROLE">
            <template slot-scope="scope">
              {{scope.row.role==0?"Administrator":scope.row.role==1?"Finance":"Shareholder"}}
            </template>
          </el-table-column>
          <el-table-column
            prop="islock"
            label="ISLOCK">
            <template slot-scope="scope">
              {{scope.row.islock==0?'':'locked'}}
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


      <el-dialog class="form-dialog" @close="closedialog('createaccountformdataref')" title="Create Account" width="500px" :visible.sync="showcreateaccountdialog">
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
          <el-form-item
            label="ROLE"
            prop="role"
            :rules="[
              { required: true, message: 'The role cannot be empty.', trigger: 'change' },
            ]">
            <el-select class="ECF0F8-input" v-model="createaccountformdata.role" placeholder="ROLE">
              <el-option label="admin" value=0></el-option>
              <el-option label="finance" value=1></el-option>
              <el-option label="shareholder" value=2></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-dialog-footer">
            <span class="el-dialog__footer-btn" @click="createaccountformdata={}">Reset</span>
            <span class="el-dialog__footer-btn" @click="CreateHouyiAccount('createaccountformdataref')">Save</span>
          </el-form-item>
        </el-form>
      </el-dialog>

      <el-dialog title="Tips" class="lockproject-dialog" :visible.sync="showlockdialog" height="15%">
        <span>{{showtipstext}}</span>
        <div slot="footer" class="dialog-footer">
          <span class="el-dialog__footer-btn" @click="LockUnlockHouyiAccount()">Yes</span>
          <span class="el-dialog__footer-btn" @click="showlockdialog=false">No</span>
        </div>
      </el-dialog>

     <!-- <el-dialog title="Reset Password" width="400px" :visible.sync="showresetpassworddialog" height="15%">
        NEW PASSWORD&nbsp;&nbsp;&nbsp;<el-input type="password" class="F4EAD5-input" v-model="ResetNewPassword" placeholder="NEW PASSWORD"></el-input>
        <div slot="footer" class="dialog-footer">
          <span class="el-dialog__footer-btn" @click="ResetHouyiPassword()">Affirm</span>
          <span class="el-dialog__footer-btn" @click="showresetpassworddialog=false">Cancel</span>
        </div>
      </el-dialog>-->

      <el-dialog @close="closedialog('resetpasswordformref')" title="Reset Password" class="form-dialog"  :visible.sync="showresetpassworddialog" width="450px" height="160px">
        <el-form label-width="150px" :model="resetpasswordform" ref="resetpasswordformref">
          <el-form-item
            prop="ResetNewPassword"
            :rules="[
            { required: true, message: 'The password cannot be empty.', trigger: 'blur' },
          ]"
            label="NEW PASSWORD">
            <el-input  style="width: auto" class="EFF2CF-input" type="password" v-model="resetpasswordform.ResetNewPassword"  placeholder="NEW PASSWORD"></el-input>
          </el-form-item>
          <el-form-item class="form-dialog-footer">
            <span class="el-dialog__footer-btn" @click="ResetHouyiPassword('resetpasswordformref')">Confirm</span>
            <span class="el-dialog__footer-btn" @click="showresetpassworddialog=false">Cancel</span>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
</template>

<script>
  import md5util from '../util/md5util.js'
  export default {
        name: '',
        data () {
            return {
              resetpasswordform:{},
              showresetpassworddialog:false,
              currentresetpasswordaccount:undefined,
              currentlockaccount:undefined,
              islock:0,
              showcreateaccountdialog:false,
              showtipstext:'Are you sure lock account?',
              showlockdialog:false,
              datalist:[],
              currentpage:1,
              totalcount:0,
              conditionparam:{
                count:10,
              },
              createaccountformdata:{},

            }
        },
        components: {},
        mounted(){
          this.Verify();
          this.SearchHouyiAccountList();
        },
        watch: {
          //element ui 的分页有bug  不能再handlecurrentpage中调用查询   只能监听currentpage的变化来查询
          currentpage:{
            handler:function(val,oldval){
              this.SearchHouyiAccountList();
            },
            deep:true//对象内部的属性监听，也叫深度监听
          },

        },
        methods: {
          closedialog(formName){
            var dom = this.$refs[formName];
            if(dom!=undefined){
              if (Array.isArray(dom)) dom = dom[0];
              dom.resetFields();
            }
          },
          tableheaderClassName({ row, column, rowIndex, columnIndex}) {
            if(column.label=='Reset Password'||column.label=='Lock')
              return 'table-operate-header-cell';
            if(column.label=='ID'||column.label=='TEL'||column.label=='ROLE')
              return 'table-header-cell-1';
            if(column.label=='ACCOUNT'||column.label=='ISLOCK')
              return 'table-header-cell-4';
            if(column.label=='NAME')
              return 'table-header-cell-3';
            if(column.label=='EMAIL'||column.label=='CREATOR')
              return 'table-header-cell-2';
          },
          tableClassName({ row, column, rowIndex, columnIndex}){
            if(column.label=='Reset Password'||column.label=='Lock')
              return 'table-operate-cell';
            if(column.label=='ID'||column.label=='TEL'||column.label=='ROLE')
              return 'table-cell-1';
            if(column.label=='ACCOUNT'||column.label=='ISLOCK')
              return 'table-cell-4';
            if(column.label=='NAME')
              return 'table-cell-3';
            if(column.label=='EMAIL'||column.label=='CREATOR')
              return 'table-cell-2';
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
          SearchHouyiAccountList(currentpage){
            if(currentpage!=undefined)
              this.currentpage = currentpage;
            var param = Object.assign({}, this.conditionparam);
            param.skip = (this.currentpage-1)*10;
            if(this.conditionparam.role==-1)
              param.role = null;
            if(this.conditionparam.islock==-1){
              param.islock = null;
            }
            var res = this.requestutil.ajax('/SearchHouyiAccountList',param,false,this);
            if(res.statuscode<0){
              this.$message({
                showClose: true,
                message: res.message,
                type: 'error'
              });
              this.datalist=[];
              return;
            }
            let message = JSON.parse(res.message);
            this.datalist = message.datalist;
            this.totalcount = message.totalcount;


          },
          CreateHouyiAccount(formName){
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
                var res = this.requestutil.ajax('/CreateHouyiAccount',this.createaccountformdata,true,this);
                if(res.statuscode>=0){
                  this.createaccountformdata={};
                  this.showcreateaccountdialog=false;
                  this.SearchHouyiAccountList(1);
                }


              }
            });
          },
          LockUnlockHouyiAccount(){
            var param = {
              account:this.currentlockaccount,
              islock:this.islock,
            }
            this.requestutil.ajax('/LockUnlockHouyiAccount',param,true,this);
            this.showlockdialog = false;
            this.SearchHouyiAccountList(1);
          },

          ResetHouyiPassword(formName){
            this.$refs[formName].validate((valid) => {
              if (valid) {
                var param = {
                  account:this.currentresetpasswordaccount,
                  password:md5util.md5(this.resetpasswordform.ResetNewPassword)
                }
                var res = this.requestutil.ajax('/ResetHouyiPassword',param,true,this);
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
  .systempage .search-condition{
    padding: 20px;
  }
  .systempage .handle-button{
    margin-right: 30px;
    float: right;
    margin-bottom: 20px;
  }
  .systempage .handle-button button{
    background: #2C75B8;
    color: #FFFFFF;
    font-family:PingFangSC-Semibold;
  }

  .systempage .data-table{
    padding: 20px ;
  }


</style>
