<template>
  <div class="agentaccountpage">
    <div class="search-condition">
      <el-form :inline="true" :model="conditionparam" class="demo-form-inline">
        <el-form-item>
          <el-input class="D0E8F2-input" v-model="conditionparam.project_id" placeholder="PROJECT ID"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input class="EFF2CF-input" v-model="conditionparam.modified_account" placeholder="MODIFIED ACCOUNT"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input class="F4EAD5-input" v-model="conditionparam.operator_account" placeholder="OPERATOR ACCOUNT"></el-input>
        </el-form-item>

      </el-form>
    </div>
    <div class="handle-button" >
      <el-button size="small" type="primary" icon="el-icon-search" @click="SearchModificationRecordList(1)">Search</el-button>
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
          prop="project_id"
          label="PROJECT ID">
        </el-table-column>
        <el-table-column
          prop="modified_account"
          label="MODIFIED ACCOUNT">
        </el-table-column>
        <el-table-column
          prop="method_name"
          label="METHOD NAME">
        </el-table-column>
        <el-table-column
          prop="method_param"
          label="METHOD PARAM">
        </el-table-column>
        <el-table-column
          prop="method_description"
          label="METHOD DESCRIPTION">
        </el-table-column>
        <el-table-column
          prop="operator_account"
          label="OPERATOR ACCOUNT">
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
  </div>
</template>

<script>
  import md5util from '../util/md5util.js'
  export default {
    name: '',
    data () {
      return {
        datalist:[],
        currentpage:1,
        totalcount:0,
        conditionparam:{
          count:10,
        },
      }
    },
    components: {},
    mounted(){
      this.Verify();
      this.SearchModificationRecordList();
    },
    watch: {
      //element ui 的分页有bug  不能再handlecurrentpage中调用查询   只能监听currentpage的变化来查询
      currentpage:{
        handler:function(val,oldval){
          this.SearchModificationRecordList();
        },
        deep:true//对象内部的属性监听，也叫深度监听
      },
    },
    methods: {
      tableheaderClassName({ row, column, rowIndex, columnIndex}) {
        if(column.label=='PROJECT ID'||column.label=='TEL'||column.label=='ROLE')
          return 'table-header-cell-1';
        if(column.label=='MODIFIED ACCOUNT'||column.label=='METHOD DESCRIPTION')
          return 'table-header-cell-4';
        if(column.label=='METHOD NAME')
          return 'table-header-cell-3';
        if(column.label=='METHOD PARAM'||column.label=='OPERATOR ACCOUNT')
          return 'table-header-cell-2';
      },
      tableClassName({ row, column, rowIndex, columnIndex}){
        if(column.label=='PROJECT ID'||column.label=='TEL'||column.label=='ROLE')
          return 'table-cell-1';
        if(column.label=='MODIFIED ACCOUNT'||column.label=='METHOD DESCRIPTION')
          return 'table-cell-4';
        if(column.label=='METHOD NAME')
          return 'table-cell-3';
        if(column.label=='METHOD PARAM'||column.label=='OPERATOR ACCOUNT')
          return 'table-cell-2';
      },
      SearchModificationRecordList(currentpage){
        if(currentpage!=undefined)
          this.currentpage =currentpage;
        this.conditionparam.skip = (this.currentpage-1)*10;
        var res = this.requestutil.ajax('/SearchModificationRecordList',this.conditionparam,false,this);
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
    height: 34px;
    background: #2C75B8;
    color: #FFFFFF;
    font-family:PingFangSC-Semibold;
  }

  .agentaccountpage .data-table{
    padding: 20px ;
  }


</style>
