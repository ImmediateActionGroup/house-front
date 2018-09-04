<template>
  <div class="agentaccountpage">
    <div class="search-condition">
      <el-form :inline="true" :model="conditionparam" class="demo-form-inline">
        <el-form-item>

          <el-select class="D0E8F2-input" v-model="conditionparam.resident_status" placeholder="RESIDENT STATUS">
            <el-option label="all" value=-1></el-option>
            <el-option label="Local" value=0></el-option>
            <el-option label="FIRB" value=1></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select class="D0E8F2-input" v-model="conditionparam.statuss" placeholder="STATUS">
            <el-option label="SOLD&SETTLED" value='2,3'></el-option>
            <el-option label="SOLD" value='2'></el-option>
            <el-option label="SETTLED" value='3'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input class="D0E8F2-input" v-model="conditionparam.low_age" placeholder="LOW_AGE"></el-input>
          ——
          <el-input class="D0E8F2-input" v-model="conditionparam.high_age" placeholder="HIGH_AGE"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="conditionparam.starttime"
            class="FBF0EC-input"
            type="date"
            placeholder="STARTTIME">
          </el-date-picker>
          ——
          <el-date-picker
            class="FBF0EC-input"
            v-model="conditionparam.endtime"
            type="date"
            placeholder="ENDTIME">
          </el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <div class="handle-button" >
      <el-button size="small" type="primary" icon="el-icon-tickets" @click="exportagentexcel()">Export Excel</el-button>
      <el-button size="small" type="primary" icon="el-icon-search" @click="SearchPurchaserReportFormsPOJOList(1)">Search</el-button>
    </div>
    <el-button  type="text" style="padding-left: 20px" @click="showdisplaycolumnselectiondialog=true">Display column selection</el-button>
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
          v-for="col in showcolarray"
          :prop=col
          :label="col | toUpperCase"
          :render-header="col=='pur1_age'?pur1_agerenderHeader:col=='resident_status'?resident_statusrenderHeader:col=='nationality'?nationalityrenderHeader:col=='contract_signed_by_purchasers'?contract_signed_by_purchasersrenderHeader:col=='contract_signed_by_vendors'?contract_signed_by_vendorsrenderHeader:col=='estate_agent_office'?estate_agent_officerenderHeader:col=='commission_rate'?commission_raterenderHeader:col=='commission_payment_method'?commission_payment_methodrenderHeader:col=='commission_payment_date'?commission_payment_daterenderHeader:col=='settlement_completion'?settlement_completionrenderHeader:null"
          :min-width="col=='pur1_age'?'170px':col=='resident_status'?'210px':col=='nationality'?'180px':auto"
        >
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


    <el-dialog title="Display column selection" class="checkshowcol-dialog" style="padding: 20px" width="550px" :visible.sync="showdisplaycolumnselectiondialog">
      <el-checkbox-group v-model="showcolarray">
      <el-row>
        <el-col  :span="12">
          <el-checkbox label="pur1_age"></el-checkbox>
          <el-checkbox label="resident_status"></el-checkbox>
          <el-checkbox label="nationality"></el-checkbox>
          <el-checkbox label="pur1_name"></el-checkbox>
          <el-checkbox label="pur1_passport_NO"></el-checkbox>
          <el-checkbox label="pur1_address"></el-checkbox>
          <el-checkbox label="pur1_email"></el-checkbox>
          <el-checkbox label="pur1_tel"></el-checkbox>
          <el-checkbox label="pur1_dob"></el-checkbox>
          <el-checkbox label="pur1_identity_card"></el-checkbox>
          <el-checkbox label="settlement_date"></el-checkbox>
          <el-checkbox label="sale_price_per_contract"></el-checkbox>
          <el-checkbox label="contract_signed_by_purchasers"></el-checkbox>
          <el-checkbox label="contract_signed_by_vendors"></el-checkbox>
          <el-checkbox label="contract_date"></el-checkbox>
          <el-checkbox label="contract_exchanged_date"></el-checkbox>
          <el-checkbox label="unconditional_date"></el-checkbox>
          <el-checkbox label="project_use"></el-checkbox>
        </el-col>
        <el-col :span="12">
          <el-checkbox label="project_id"></el-checkbox>
          <el-checkbox label="pur2_name"></el-checkbox>
          <el-checkbox label="pur2_passport_NO"></el-checkbox>
          <el-checkbox label="pur2_address"></el-checkbox>
          <el-checkbox label="pur2_email"></el-checkbox>
          <el-checkbox label="pur2_tel"></el-checkbox>
          <el-checkbox label="pur2_dob"></el-checkbox>
          <el-checkbox label="pur2_identity_card"></el-checkbox>
          <el-checkbox label="purchaser_solicitor_name"></el-checkbox>
          <el-checkbox label="purchaser_solicitor_tel"></el-checkbox>
          <el-checkbox label="estate_agent_office"></el-checkbox>
          <el-checkbox label="estate_agent_office_contact_details"></el-checkbox>
          <el-checkbox label="estate_agent_sales_person"></el-checkbox>
          <el-checkbox label="estate_agent_sales_contact_details"></el-checkbox>
          <el-checkbox label="commission_rate"></el-checkbox>
          <el-checkbox label="commission_payment_method"></el-checkbox>
          <el-checkbox label="commission_total_amount"></el-checkbox>
          <el-checkbox label="commission_payment_date"></el-checkbox>
          <el-checkbox label="settlement_completion"></el-checkbox>
        </el-col>
      </el-row>
      </el-checkbox-group>
    </el-dialog>

    <el-dialog class="form-dialog chart-dialog"  title="Chart" width="700px" :visible.sync="showChart">
      <el-tabs v-model="activeName"  type="card" @tab-click="handleClick">
        <el-tab-pane label="Line" name="line">
          <div id="line-main" style="width: 500px;height: 400px;margin: auto"></div>
        </el-tab-pane>
        <el-tab-pane label="Bar" name="bar">
          <div id="bar-main"  style="width: 500px;height: 400px;margin: auto"></div>
        </el-tab-pane>
        <el-tab-pane label="Pie" name="pie">
          <div id="pie-main"  style="width: 500px;height: 400px;margin: auto"></div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>

  import md5util from '../util/md5util.js'
  export default {
    name: '',
    data () {
      return {
        showcolarray:['pur1_name','pur1_age','resident_status','nationality','pur1_address'],
        showdisplaycolumnselectiondialog:false,
        activeName:'line',
        showChart:false,
        datalist:[],
        currentpage:1,
        totalcount:0,
        conditionparam:{
          count:10,
        },
        titlechartstyle:{
          color: '#FFD428',
          margin:'0px 5px 0px 0px',
          cursor:'pointer'
        },
        titlesortstyle:{
          color: '#FFD428',
          margin:'0px 0px 0px 5px',
          cursor:'pointer'
        },
        chartoption:{},

      }
    },
    filters: {
      toUpperCase: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.toUpperCase()
      }
    },
    components: {},
    mounted(){
      this.Verify();
      this.SearchPurchaserReportFormsPOJOList();
    },
    watch: {
      //element ui 的分页有bug  不能再handlecurrentpage中调用查询   只能监听currentpage的变化来查询
      currentpage:{
        handler:function(val,oldval){
          this.SearchPurchaserReportFormsPOJOList();
        },
        deep:true//对象内部的属性监听，也叫深度监听
      },

    },
    methods: {
      handleClick(tab, event) {
        if(this.activeName=='line'){
          /*ECharts图表*/
          var myChart = this.$echarts.init(document.getElementById('line-main'));
          myChart.setOption(JSON.parse(this.chartoption.lineoption))
        }else if(this.activeName=='bar'){
          var myChart = this.$echarts.init(document.getElementById('bar-main'));
          myChart.setOption(JSON.parse(this.chartoption.baroption))
        }else{
          var myChart = this.$echarts.init(document.getElementById('pie-main'));
          console.log(this.chartoption.pieoption);
          myChart.setOption(JSON.parse(this.chartoption.pieoption))
        }
      },
      showChartview(chartfiled){
        this.chartoption={};
        this.activeName = 'line';
        let param = Object.assign({}, this.conditionparam);
        if(param.starttime==null)
          delete param.starttime;
        if(param.endtime==null)
          delete param.endtime;
        param.chartfiled = chartfiled;
        var res = this.requestutil.ajax('/MakeAllChart',param,false,this);
        if(res.statuscode<0){
          this.$message({
            showClose: true,
            message: res.message,
            type: 'error'
          });
          return;
        }
        this.showChart=true;
        this.chartoption = JSON.parse(res.message);
        this.$nextTick(function () {
          if (this.activeName == 'line') {
            var myChart = this.$echarts.init(document.getElementById('line-main'));
            myChart.setOption(JSON.parse(this.chartoption.lineoption));
          }
        })
      },
      //渲染年龄头
      pur1_agerenderHeader(h){
        return h('div', [
          h('i', {
            attrs: {
              class: 'iconfont icon-line'
            },
            style: this.titlechartstyle,
            on: {
              click: () => {
              this.showChartview(0)
          }
        }
        },''),
          h('span', {
          }, 'PUR1_AGE'),
            h('span', {
              attrs: {
                class: 'iconfont icon-paixu'
              },
              style: this.titlesortstyle,
              on: {
                click: () => {
                this.changesortway('pur1_dob');
              }
            }
          }, ''),
        ])
      },
      //渲染用户类型
      resident_statusrenderHeader(h){
        return h('div', [
          h('i', {
            attrs: {
              class: 'iconfont icon-line'
            },
            style: this.titlechartstyle,
            on: {
              click: () => {
              this.showChartview(2)
              }
            }
          },''),
            h('span', {
            }, 'RESIDENT_STATUS'),
              h('span', {
                attrs: {
                  class: 'iconfont icon-paixu'
                },
                style: this.titlesortstyle,
                on: {
                  click: () => {
                  this.changesortway('resident_status');
                  }
                }
              }, ''),
          ])
      },
      //渲染国籍
      nationalityrenderHeader(h) {
        return h('div', [
          h('i', {
            attrs: {
              class: 'iconfont icon-line'
            },
            style: this.titlechartstyle,
            on: {
                click: () => {
                  this.showChartview(1)
                }
            }
          },''),
        h('span', {
        }, 'NATIONALITY'),
          h('span', {
            attrs: {
              class: 'iconfont icon-paixu'
            },
            style: this.titlesortstyle,
            on: {
              click: () => {
              this.changesortway('nationality');
              }
            }
          }, ''),
        ])
      },
      //渲染买方是否签署合同
      contract_signed_by_purchasersrenderHeader(h) {
        return h('div', [
          h('i', {
            attrs: {
              class: 'iconfont icon-line'
            },
            style: this.titlechartstyle,
            on: {
              click: () => {
                this.showChartview(3)
              }
            }
          },''),
          h('span', {
          }, 'CONTRACT_SIGNED_BY_PURCHASERS'),
        ])
      },
      //渲染厚易是否签署合同
      contract_signed_by_vendorsrenderHeader(h) {
        return h('div', [
          h('i', {
            attrs: {
              class: 'iconfont icon-line'
            },
            style: this.titlechartstyle,
            on: {
              click: () => {
                this.showChartview(4)
              }
            }
          },''),
          h('span', {
          }, 'CONTRACT_SIGNED_BY_VENDORS'),
        ])
      },
      //渲染中介办公司统计
      estate_agent_officerenderHeader(h) {
        return h('div', [
          h('i', {
            attrs: {
              class: 'iconfont icon-line'
            },
            style: this.titlechartstyle,
            on: {
              click: () => {
                this.showChartview(5)
              }
            }
          },''),
          h('span', {
          }, 'ESTATE_AGENT_OFFICE'),
        ])
      },
      //渲染佣金比例
      commission_raterenderHeader(h) {
        return h('div', [
          h('i', {
            attrs: {
              class: 'iconfont icon-line'
            },
            style: this.titlechartstyle,
            on: {
              click: () => {
                this.showChartview(6)
              }
            }
          },''),
          h('span', {
          }, 'COMMISSION_RATE'),
        ])
      },
      //渲染佣金支付方式
      commission_payment_methodrenderHeader(h) {
        return h('div', [
          h('i', {
            attrs: {
              class: 'iconfont icon-line'
            },
            style: this.titlechartstyle,
            on: {
              click: () => {
                this.showChartview(7)
              }
            }
          },''),
          h('span', {
          }, 'COMMISSION_PAYMENT_METHOD'),
        ])
      },
      //渲染佣金支付时间
      commission_payment_daterenderHeader(h) {
        return h('div', [
          h('i', {
            attrs: {
              class: 'iconfont icon-line'
            },
            style: this.titlechartstyle,
            on: {
              click: () => {
                this.showChartview(8)
              }
            }
          },''),
          h('span', {
          }, 'COMMISSION_PAYMENT_DATE'),
        ])
      },
      //渲染结算是否已经完成
      settlement_completionrenderHeader(h) {
        return h('div', [
          h('i', {
            attrs: {
              class: 'iconfont icon-line'
            },
            style: this.titlechartstyle,
            on: {
              click: () => {
                this.showChartview(9)
              }
            }
          },''),
          h('span', {
          }, 'SETTLEMENT_COMPLETION'),
        ])
      },
      changesortway(sortfiled){
        if(this.conditionparam.sortfiled==undefined||this.conditionparam.sortfiled!=sortfiled){
          this.conditionparam.sortfiled= sortfiled;
          this.conditionparam.sortway = 'desc';
        }else if(this.conditionparam.sortfiled==sortfiled){
          let sortway = this.conditionparam.sortway;
          this.conditionparam.sortway = sortway=='desc'?'':'desc';
        }
        this.SearchPurchaserReportFormsPOJOList(1);
      },
      tableheaderClassName({ row, column, rowIndex, columnIndex}) {
        if(column.label=='PROJECT_ID'||column.label=='PUR1_EMAIL'||column.label=='PUR2_NAME'||column.label=='PUR2_TEL'||column.label=='PURCHASER_SOLICITOR_TEL'||column.label=='SETTLEMENT_DATE'||column.label=='CONTRACT_EXCHANGED_DATE'||column.label=='ESTATE_AGENT_OFFICE_CONTACT_DETAILS'||column.label=='COMMISSION_PAYMENT_METHOD')
          return 'table-header-cell-1';
        if(column.label=='PUR1_NAME'||column.label=='PUR1_TEL'||column.label=='PUR2_PASSPORT_NO'||column.label=='PUR2_DOB'||column.label=='RESIDENT_STATUS'||column.label=='SALE_PRICE_PER_CONTRACT'||column.label=='UNCONDITIONAL_DATE'||column.label=='ESTATE_AGENT_SALES_PERSON'||column.label=='COMMISSION_TOTAL_AMOUNT')
          return 'table-header-cell-4';
        if(column.label=='PUR1_PASSPORT_NO'||column.label=='PUR1_DOB'||column.label=='PUR2_ADDRESS'||column.label=='PUR2_IDENTITY_CARD'||column.label=='NATIONALITY'||column.label=='CONTRACT_SIGNED_BY_VENDORS'||column.label=='PROJECT_USE'||column.label=='ESTATE_AGENT_SALES_CONTACT_DETAILS'||column.label=='COMMISSION_PAYMENT_DATE')
          return 'table-header-cell-3';
        if(column.label=='CONTRACT_SIGNED_BY_PURCHASERS'||column.label=='PUR1_ADDRESS'||column.label=='PUR1_IDENTITY_CARD'||column.label=='PUR2_EMAIL'||column.label=='PURCHASER_SOLICITOR_NAME'||column.label=='PUR1_AGE'||column.label=='CONTRACT_DATE'||column.label=='ESTATE_AGENT_OFFICE'||column.label=='COMMISSION_RATE'||column.label=='SETTLEMENT_COMPLETION')
          return 'table-header-cell-2';
      },

      tableClassName({ row, column, rowIndex, columnIndex}){
        if(column.label=='PROJECT_ID'||column.label=='PUR1_EMAIL'||column.label=='PUR2_NAME'||column.label=='PUR2_TEL'||column.label=='PURCHASER_SOLICITOR_TEL'||column.label=='SETTLEMENT_DATE'||column.label=='CONTRACT_EXCHANGED_DATE'||column.label=='ESTATE_AGENT_OFFICE_CONTACT_DETAILS'||column.label=='COMMISSION_PAYMENT_METHOD')
          return 'table-cell-1';
        if(column.label=='PUR1_NAME'||column.label=='PUR1_TEL'||column.label=='PUR2_PASSPORT_NO'||column.label=='PUR2_DOB'||column.label=='RESIDENT_STATUS'||column.label=='SALE_PRICE_PER_CONTRACT'||column.label=='UNCONDITIONAL_DATE'||column.label=='ESTATE_AGENT_SALES_PERSON'||column.label=='COMMISSION_TOTAL_AMOUNT')
          return 'table-cell-4';
        if(column.label=='PUR1_PASSPORT_NO'||column.label=='PUR1_DOB'||column.label=='PUR2_ADDRESS'||column.label=='PUR2_IDENTITY_CARD'||column.label=='NATIONALITY'||column.label=='CONTRACT_SIGNED_BY_VENDORS'||column.label=='PROJECT_USE'||column.label=='ESTATE_AGENT_SALES_CONTACT_DETAILS'||column.label=='COMMISSION_PAYMENT_DATE')
          return 'table-cell-3';
        if(column.label=='CONTRACT_SIGNED_BY_PURCHASERS'||column.label=='PUR1_ADDRESS'||column.label=='PUR1_IDENTITY_CARD'||column.label=='PUR2_EMAIL'||column.label=='PURCHASER_SOLICITOR_NAME'||column.label=='PUR1_AGE'||column.label=='CONTRACT_DATE'||column.label=='ESTATE_AGENT_OFFICE'||column.label=='COMMISSION_RATE'||column.label=='SETTLEMENT_COMPLETION')
          return 'table-cell-2';
      },
      exportagentexcel(){
        let param = Object.assign({}, this.conditionparam);
        param.starttime=this.dateutil.datetotime(param.starttime);
        param.endtime=this.dateutil.datetotime(param.endtime);
        this.$http({
          method: "get",
          url: this.$store.state.agentexcelpath,
          params: param,
          responseType: 'arraybuffer'
        }).
        then(function success(data) {
          var blob = new Blob([data.data], {type: "application/vnd.ms-excel"});
          var objectUrl = URL.createObjectURL(blob);
          var a = document.createElement('a');
          document.body.appendChild(a);
          a.setAttribute('style', 'display:none');
          a.setAttribute('href', objectUrl);
          var filename = "sales_invoice_summary_report.xls";
          a.setAttribute('download', filename);
          a.click();
          URL.revokeObjectURL(objectUrl);
        })

        //var res = this.requestutil.excelajax('/exportagentexcel',param,true,this);
      },
      //获取当前页
      handleCurrentChange (val) {
        this.currentpage = val;
      },
      Verify(){
        var res = this.requestutil.ajax('/VerifyUser',null,true,this);
        if(res.statuscode>=0) {
          let message = JSON.parse(res.message);
          //中介账号才能管理销售信息
          if (message.AccountType != 0) {
            this.$goRoute("/login");
          }
        }
      },
      SearchPurchaserReportFormsPOJOList(currentpage){
        if(currentpage!=undefined)
          this.currentpage=currentpage;
        let param = Object.assign({}, this.conditionparam);
        param.skip = (this.currentpage-1)*10;
        if(param.starttime==null)
          delete param.starttime;
        if(param.endtime==null)
          delete param.endtime;
        var res = this.requestutil.ajax('/SearchPurchaserReportFormsPOJOList',param,false,this);
        if(res.statuscode<0){
          this.datalist=[];
          return;
        }
        let message = JSON.parse(res.message);
        this.datalist = message.datalist;
        for(var i=0;i<this.datalist.length;i++){
          this.datalist[i].pur1_age = this.dateutil.getagebybirthday(this.datalist[i].pur1_dob);
          this.datalist[i].pur1_dob = this.dateutil.timetodateymd(this.datalist[i].pur1_dob);
          this.datalist[i].settlement_date = this.dateutil.timetodateymd(this.datalist[i].settlement_date);
          this.datalist[i].commission_payment_date = this.dateutil.timetodateymd(this.datalist[i].commission_payment_date);
          this.datalist[i].unconditional_date = this.dateutil.timetodateymd(this.datalist[i].unconditional_date);
          this.datalist[i].contract_exchanged_date = this.dateutil.timetodateymd(this.datalist[i].contract_exchanged_date);
          this.datalist[i].contract_date = this.dateutil.timetodateymd(this.datalist[i].contract_date);
          this.datalist[i].contract_signed_by_vendors =this.datalist[i].contract_signed_by_vendors==0?'signed':this.datalist[i].contract_signed_by_vendors==1?'no signed':'';
          this.datalist[i].contract_signed_by_purchasers =this.datalist[i].contract_signed_by_purchasers==0?'signed':this.datalist[i].contract_signed_by_purchasers==1?'no signed':'';
          this.datalist[i].project_use =this.datalist[i].project_use==0?'live':this.datalist[i].contract_signed_by_purchasers==1?'invest':'';
          this.datalist[i].settlement_completion =this.datalist[i].settlement_completion==0?'unfinished':this.datalist[i].settlement_completion==1?'finished':'';
          var resident_status = this.datalist[i].resident_status;
          this.datalist[i].resident_status = resident_status==0?'Local':resident_status==1?'FIRB':'Unknown';
        }
        this.totalcount = message.totalcount;
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
    background: #2C75B8;
    color: #FFFFFF;
    font-family:PingFangSC-Semibold;
  }

  .agentaccountpage .data-table{
    padding: 20px ;

  }

  .agentaccountpage .chart-dialog .el-tabs__header{
    margin-bottom: 0px !important;
  }
  .agentaccountpage .chart-dialog .el-tab-pane{
    background: rgb(21, 46, 71) !important;
  }

  .checkshowcol-dialog .el-checkbox+.el-checkbox{
    margin-left: 0px;
    display: block;
  }





</style>
