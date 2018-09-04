<template>
    <div class="modifydata-page">
      <span v-show="perfectinfo" style="margin-left: 20%;color: #ff6356;font-size: 20px;line-height: 100px">Please complete the information first</span>

      <el-form :model="modifydataformdata" ref="modifydataform" v-if="showmodifyHouyiaccountdataform" label-width="200px" >
        <el-form-item
          label="NAME"
          :rules="[
              { required: true, message: 'The name cannot be empty.', trigger: 'blur' },
            ]"
          prop="name"
        >
          <el-input v-model="modifydataformdata.name" placeholder="NAME"></el-input>
        </el-form-item>
        <el-form-item
          label="TEL"
          :rules="[
              { required: true, message: 'The tel cannot be empty.', trigger: 'blur' },
            ]"
          prop="tel"
        >
          <el-input v-model="modifydataformdata.tel" placeholder="TEL"></el-input>
        </el-form-item>
        <el-form-item
          label="EMAIL"
          prop="email"
          :rules="[
              { required: true, message: 'The email cannot be empty.', trigger: 'blur' },
              { type: 'email', message: 'Email address is invalid', trigger: ['blur', 'change'] }
            ]"
        >
          <el-input v-model="modifydataformdata.email" placeholder="EMAIL"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="medium"  type="primary" @click="modifydata()">Modify Data</el-button>
        </el-form-item>
      </el-form>


      <el-form :model="modifydataformdata" ref="modifydataform" v-if="showmodifyIntermediaryaccountdataform"  label-width="200px">
        <el-form-item
          label="COMPANY NAME"
          :rules="[
              { required: true, message: 'The company name cannot be empty.', trigger: 'blur' },
            ]"
          prop="company_name"
        >
          <el-input v-model="modifydataformdata.company_name" placeholder="COMPANY NAME"></el-input>
        </el-form-item>
        <el-form-item
          label="ADDRESS"
          :rules="[
              { required: true, message: 'The address cannot be empty.', trigger: 'blur' },
            ]"
          prop="address"
        >
          <el-input v-model="modifydataformdata.address" placeholder="ADDRESS"></el-input>
        </el-form-item>
        <el-form-item
          label="TEL"
          :rules="[
              { required: true, message: 'The tel cannot be empty.', trigger: 'blur' },
            ]"
          prop="tel"
        >
          <el-input v-model="modifydataformdata.tel" placeholder="TEL"></el-input>
        </el-form-item>
        <el-form-item
          label="EMAIL"
          prop="email"
          :rules="[
              { required: true, message: 'The email cannot be empty.', trigger: 'blur' },
              { type: 'email', message: 'Email address is invalid', trigger: ['blur', 'change'] }
            ]"
        >
          <el-input v-model="modifydataformdata.email" placeholder="EMAIL"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="medium"  type="primary" @click="modifydata()">Modify Data</el-button>
        </el-form-item>
      </el-form>


      <el-form :model="modifydataformdata" ref="modifydataform" v-if="showmodifysalesmanaccountdataform" label-width="200px">
        <el-form-item
          label="ACCOUNT"
        >
          <el-input v-model="modifydataformdata.account" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item
          label="SALES LICENSE NO"
        >
          <el-input v-model="modifydataformdata.number" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item
          label="NAME"
          :rules="[
              { required: true, message: 'The name cannot be empty.', trigger: 'blur' },
            ]"
          prop="name"
        >
          <el-input v-model="modifydataformdata.name" placeholder="NAME"></el-input>
        </el-form-item>
       <!-- <el-form-item
          label="SEX"
          :rules="[
              { required: true, message: 'The sex cannot be empty.', trigger: 'change' },
            ]"
          prop="sex"
        >
          <el-select v-model="modifydataformdata.sex" placeholder="SEX">
            <el-option label="MAN" value=0></el-option>
            <el-option label="WOMAN" value=1></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item
          label="TEL"
          :rules="[
              { required: true, message: 'The tel cannot be empty.', trigger: 'change' },
            ]"
          prop="tel"
        >
          <el-input v-model="modifydataformdata.tel" placeholder="TEL"></el-input>
        </el-form-item>
        <el-form-item
          label="EMAIL"
          prop="email"
          :rules="[
              { required: true, message: 'The email cannot be empty.', trigger: 'blur' },
              { type: 'email', message: 'Email address is invalid', trigger: ['blur', 'change'] }
            ]"
        >
          <el-input v-model="modifydataformdata.email" placeholder="EMAIL"></el-input>
        </el-form-item>
        <!--<el-form-item
          label="EMPLOYEE NO"
          :rules="[
              { required: true, message: 'The EMPLOYEE NO cannot be empty.', trigger: 'blur' },
            ]"
          prop="number"
        >
          <el-input v-model="modifydataformdata.number" placeholder="EMPLOYEE NO"></el-input>
        </el-form-item>-->
        <el-form-item
          label="DUTY"
          :rules="[
              { required: true, message: 'The duty cannot be empty.', trigger: 'blur' },
            ]"
          prop="duty"
        >
          <el-input v-model="modifydataformdata.duty" placeholder="DUTY"></el-input>
        </el-form-item>
        <!--<el-form-item
          label="ADDRESS"
          :rules="[
              { required: true, message: 'The address cannot be empty.', trigger: 'blur' },
            ]"
          prop="address"
        >
          <el-input v-model="modifydataformdata.address" placeholder="ADDRESS"></el-input>
        </el-form-item>-->
        <el-form-item>
          <el-button size="medium"  type="primary" @click="modifydata()">Modify Data</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import ElFormItem from "../../node_modules/element-ui/packages/form/src/form-item";
    export default {
        name: '',
        data () {
            return {
              modifydataformdata:{},
              AccountType:undefined,
              showmodifyHouyiaccountdataform:false,
              showmodifyIntermediaryaccountdataform:false,
              showmodifysalesmanaccountdataform:false,
              perfectinfo:false,
            }
        },
        mounted(){
          this.Verify();
          this.showformdata();
          this.perfectinfo = this.$route.query.perfectinfo;
        },
        components: {ElFormItem},
        methods: {
          //数据回显
          showformdata(){
            let res ;
            //厚易
            if(this.AccountType==0){
              res = this.requestutil.ajax('/SearchHouyiAccountByAccount',null,false,this);
            }
            //中介
            else if(this.AccountType==1){
              res = this.requestutil.ajax('/SearchIntermediaryAccountByAccount',null,false,this);
            }
            //销售
            else if(this.AccountType==2){
              res = this.requestutil.ajax('/SearchSalesmanAccountByAccount',null,false,this);
            }
            if(res.statuscode<0)
              return;
            this.modifydataformdata = JSON.parse(res.message);
            if(this.modifydataformdata.sex!=undefined)
              this.modifydataformdata.sex = this.datautil.objtostr(this.modifydataformdata.sex);
          },
          Verify(){
            var res = this.requestutil.ajax('/VerifyUser',null,true,this);
            if(res.statuscode>=0) {
              if (res.statuscode<0) {
                this.$goRoute("/login");
              }
              let message = JSON.parse(res.message);
              this.AccountType = message.AccountType;
              if(this.AccountType==0){
                this.showmodifyHouyiaccountdataform = true;
              }else if(this.AccountType==1){
                this.showmodifyIntermediaryaccountdataform = true;
              }else if(this.AccountType==2){
                this.showmodifysalesmanaccountdataform = true;
              }
            }
          },
          modifydata(){
            this.$refs['modifydataform'].validate((valid) => {
              if (valid) {
                let res;
                //厚易
                if(this.AccountType==0){
                  res = this.requestutil.ajax('/EditHouyiAccount',this.modifydataformdata,true,this);
                }
                //中介
                else if(this.AccountType==1){
                  res = this.requestutil.ajax('/EditIntermediaryAccount',this.modifydataformdata,true,this);
                }
                //销售
                else if(this.AccountType==2){
                  res = this.requestutil.ajax('/EditSalesmanAccount',this.modifydataformdata,true,this);
                }
                if(res.statuscode>=0){
                  this.$goRoute("/home/project");
                }
              }
            });
          }
        }
    }
</script>

<style>
  @import '../../static/css/modulestyle.css';
  .modifydata-page{
    padding: 30px;
  }
  .modifydata-page .el-form-item{
    width: 700px;
  }
</style>
