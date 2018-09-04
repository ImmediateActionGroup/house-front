<template>
    <div class="changepassword-page">
        <el-form :model="changepasswordformdata" ref="changepasswordform" label-width="300px" style="padding:30px">
          <el-form-item
            label="ORIGINAL PASSWORD"
            :rules="[
              { required: true, message: 'The originalpassword cannot be empty.', trigger: 'blur' },
            ]"
            prop="originalpassword"
          >
            <el-input type="password" v-model="changepasswordformdata.originalpassword" placeholder="ORIGINAL PASSWORD"></el-input>
          </el-form-item>
          <el-form-item
            label="NEW PASSWORD"
            :rules="[
              { required: true, message: 'The newpassword cannot be empty.', trigger: 'blur' },
            ]"
            prop="newpassword1"
          >
            <el-input type="password" v-model="changepasswordformdata.newpassword1" placeholder="NEW PASSWORD"></el-input>
          </el-form-item>
          <el-form-item
            label="CONFIRM NEW PASSWORD"
            :rules="[
              { required: true, message: 'The newpassword cannot be empty.', trigger: 'blur' },
            ]"
            prop="newpassword2"
          >
            <el-input type="password" v-model="changepasswordformdata.newpassword2" placeholder="CONFIRM NEW PASSWORD"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button  type="primary" @click="changepassword()">Change Password</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>

<script>
  import md5util from '../util/md5util.js'
    export default {
        name: '',
        data () {
            return {
              changepasswordformdata:{},
              Role:undefined,
              AccountType:undefined,

            }
        },
        components: {},
        mounted(){
          this.Verify();
        },
        methods: {
          //两次输入新密码必须一致
          changepassword(){
            if(this.changepasswordformdata.newpassword1!=this.changepasswordformdata.newpassword2){
              this.$message({
                showClose: true,
                message: 'Entered passwords differ!',
                type: 'warning'
              });
              return;
            }
            //新旧密码不能一致
            if(this.changepasswordformdata.originalpassword==this.changepasswordformdata.newpassword1){
              this.$message({
                showClose: true,
                message: 'The original password and the new password cannot be consistent.',
                type: 'warning'
              });
              return;
            }
            this.$refs['changepasswordform'].validate((valid) => {
              if (valid) {
                this.changepasswordformdata.oldpassword = md5util.md5(this.changepasswordformdata.originalpassword);
                this.changepasswordformdata.newpassword =md5util.md5(this.changepasswordformdata.newpassword1);
                let res;
                //厚易
                if(this.AccountType==0){
                  res = this.requestutil.ajax('/ChangeHouyiAccountPassword',this.changepasswordformdata,true,this);
                }
                //中介
                else if(this.AccountType==1){
                  res = this.requestutil.ajax('/ChangeIntermediaryPassword',this.changepasswordformdata,true,this);
                }
                //销售
                else if(this.AccountType==2){
                  res = this.requestutil.ajax('/ChangeSalesmanAccountPassword',this.changepasswordformdata,true,this);
                }
                if(res.statuscode>=0){
                  this.requestutil.ajax('/LogOut',null,false,this);
                  this.$goRoute("/login");
                }
              }
            });
          },
          Verify(){
            let res = this.requestutil.ajax('/VerifyUser',null,true,this);
            if(res.statuscode>=0) {
              if (res.statuscode<0) {
                this.$goRoute("/login");
              }
              let message = JSON.parse(res.message);
              this.Role = message.Role;
              this.AccountType = message.AccountType;
            }
          },
        }
    }
</script>

<style>
  @import '../../static/css/modulestyle.css';
  .changepassword-page .el-form-item{
    width: 600px;
  }
  .changepassword-page .el-form{

  }
</style>
