<template>
  <div class="agentaccountpage">
    <div class="search-condition">
      <el-form :inline="true" :model="conditionparam" class="demo-form-inline">
        <el-form-item>
          <el-input class="ECF0F8-input" v-model="conditionparam.name" placeholder="NAME"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input class="FBF0EC-input" v-model="conditionparam.number" placeholder="NUMBER"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input class="F4EAD5-input" v-model="conditionparam.low_sales_project_count" placeholder="LOW_SALES_PROJECT_COUNT"></el-input>
          ——
          <el-input class="F4EAD5-input" v-model="conditionparam.high_sales_project_count" placeholder="HIGH_SALES_PROJECT_COUNT"></el-input>
        </el-form-item>

        <el-form-item>
          <el-input class="EFF2CF-input" v-model="conditionparam.low_sales_amount" placeholder="LOW_SALES_AMOUNT"></el-input>
          ——
          <el-input class="EFF2CF-input" v-model="conditionparam.high_sales_amount" placeholder="HIGH_SALES_AMOUNT"></el-input>
        </el-form-item>

        <el-form-item>
          <el-input class="D0E8F2-input" v-model="conditionparam.low_total_commission_amount" placeholder="LOW_TOTAL_COMMISSION_AMOUNT"></el-input>
          ——
          <el-input class="D0E8F2-input" v-model="conditionparam.high_total_commission_amount" placeholder="HIGH_TOTAL_COMMISSION_AMOUNT"></el-input>

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
      <el-button size="small" type="primary" icon="el-icon-search" @click="SearchAgentReportFormsPOJOList(1)">Search</el-button>
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
          prop="account"
          label="ACCOUNT"
          v-if="showcol.account"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="NAME"
          v-if="showcol.name"
        >
        </el-table-column>
        <el-table-column
          prop="sex"
          label="SEX"
          v-if="showcol.sex"
        >
          <template slot-scope="scope">
            {{scope.row.sex==0?'man':'woman'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="tel"
          label="TEL"
          v-if="showcol.tel"
        >
        </el-table-column>
        <el-table-column
          prop="email"
          label="EMAIL">
        </el-table-column>

        <el-table-column
          prop="address"
          label="ADDRESS">
        </el-table-column>

        <el-table-column
          prop="number"
          label="NUMBER">
        </el-table-column>
        <el-table-column
          prop="duty"
          label="DUTY">
        </el-table-column>
        <el-table-column
          prop="number"
          label="NUMBER">
        </el-table-column>
        <el-table-column
        prop="sales_project_count"
        label="SALE_PROJECT_COUNT"
        :render-header="sales_project_countrenderHeader"
        width="250"
        >
      </el-table-column>
        <el-table-column
          prop="sales_amount"
          label="SALES_AMOUNT"
          :render-header="sales_amountrenderHeader"
          width="200"
          >
        </el-table-column>
        <el-table-column
          prop="total_commission_amount"
          label="TOTAL_COMMISSION_AMOUNT"
          :render-header="total_commission_amountrenderHeader"
          width="300">
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
    <el-dialog class=""title="Display column selection" style="padding: 20px" width="400px" :visible.sync="showdisplaycolumnselectiondialog">
      <el-checkbox v-model="showcol.account">account</el-checkbox>
      <el-checkbox v-model="showcol.name">name</el-checkbox>
      <el-checkbox v-model="showcol.sex">sex</el-checkbox>
      <el-checkbox v-model="showcol.tel">tel</el-checkbox>
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

        showdisplaycolumnselectiondialog:false,
        showcol:{


        },
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

        lineoption:{
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            }
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            }
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
          }]
        },
        pieoption:{
          series : [
            {
              name: 'Fri',
              type: 'pie',
              radius: '55%',
              itemStyle: {
                normal: {
                  // 阴影的大小
                  shadowBlur: 0,
                  // 阴影水平方向上的偏移
                  shadowOffsetX: 0,
                  // 阴影垂直方向上的偏移
                  shadowOffsetY: 0,
                  // 阴影颜色
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              data:[
                {value:400, name:'Mon'},
                {value:335, name:'Tue'},
                {value:310, name:'Wed'},
                {value:274, name:'Thu'},
                {value:235, name:'Fri'}
              ]
            }
          ]
        },
        baroption:{
          color: ['#3398DB'],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              axisTick: {
                alignWithLabel: true
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#fff'
                }
              }
            }
          ],
          yAxis : [
            {
              type : 'value',
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#fff'
                }
              }
            }

          ],
          series : [
            {
              name:'data',
              type:'bar',
              barWidth: '60%',
              data:[10, 52, 200, 334, 390, 330, 220]
            }
          ]
        }
      }
    },
    components: {},
    mounted(){
      this.Verify();
      this.SearchAgentReportFormsPOJOList();
    },
    watch: {
      //element ui 的分页有bug  不能再handlecurrentpage中调用查询   只能监听currentpage的变化来查询
      currentpage:{
        handler:function(val,oldval){
          this.SearchAgentReportFormsPOJOList();
        },
        deep:true//对象内部的属性监听，也叫深度监听
      },

    },
    methods: {
      handleClick(tab, event) {
        if(this.activeName=='line'){
          /*ECharts图表*/
          var myChart = this.$echarts.init(document.getElementById('line-main'));
          myChart.setOption(this.lineoption)
        }else if(this.activeName=='bar'){
          var myChart = this.$echarts.init(document.getElementById('bar-main'));
          myChart.setOption(this.baroption)
        }else{
          var myChart = this.$echarts.init(document.getElementById('pie-main'));
          myChart.setOption(this.pieoption)
        }
      },
      showChartview(){
        this.showChart=true;
        this.$nextTick(function () {
          if (this.activeName == 'line') {
            var myChart = this.$echarts.init(document.getElementById('line-main'));
            myChart.setOption(this.lineoption)
          }
        })
      },
      sales_project_countrenderHeader(h){
        return h('div', [
          h('i', {
            attrs: {
              class: 'iconfont icon-line'
            },
            style: this.titlechartstyle,
            on: {
              click: () => {
              this.showChartview()
              }
            }
          },''),
            h('span', {
              }, 'SALES_PROJECT_COUNT'),
                h('span', {
                  attrs: {
                    class: 'iconfont icon-paixu'
                  },
                  style: this.titlesortstyle,
                  on: {
                    click: () => {
                    this.changesortway('sales_project_count');
                    }
                  }
                }, ''),
            ])
      },
      sales_amountrenderHeader(h){
        return h('div', [
          h('i', {
            attrs: {
              class: 'iconfont icon-line'
            },
            style: this.titlechartstyle,
            on: {
              click: () => {
              this.showChartview()
          }
        }
        },''),
          h('span', {
          }, 'SALES_AMOUNT'),
            h('span', {
              attrs: {
                class: 'iconfont icon-paixu'
              },
              style: this.titlesortstyle,
              on: {
                click: () => {
                this.changesortway('sales_amount');
        }
        }
        }, ''),
        ])
      },
      //渲染销售佣金总额
      total_commission_amountrenderHeader(h) {
        return h('div', [
          h('i', {
            attrs: {
              class: 'iconfont icon-line'
            },
            style: this.titlechartstyle,
            on: {
              click: () => {
              this.showChartview()
              }
            }
          },''),
          h('span', {
          }, 'TOTAL_COMMISSION_AMOUNT'),
          h('span', {
            attrs: {
              class: 'iconfont icon-paixu'
            },
            style: this.titlesortstyle,
            on: {
              click: () => {
                this.changesortway('total_commission_amount');
              }
            }
          }, ''),
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
        this.SearchAgentReportFormsPOJOList(1);

      },
      tableheaderClassName({ row, column, rowIndex, columnIndex}) {
        if(column.label=='Reset Password'||column.label=='Lock'||column.label=='Allocation Project')
          return 'table-operate-header-cell';
        if(column.label=='ID'||column.label=='ADDRESS')
          return 'table-header-cell-1';
        if(column.label=='NAME'||column.label=='TEL'||column.label=='DUTY'||column.label=='TOTAL_COMMISSION_AMOUNT')
          return 'table-header-cell-4';
        if(column.label=='SEX'||column.label=='EMAIL'||column.label=='SALE_PROJECT_COUNT')
          return 'table-header-cell-3';
        if(column.label=='ACCOUNT'||column.label=='NUMBER'||column.label=='SALES_AMOUNT')
          return 'table-header-cell-2';
      },

      tableClassName({ row, column, rowIndex, columnIndex}){
        if(column.label=='Reset Password'||column.label=='Lock'||column.label=='Allocation Project')
          return 'table-operate-cell';
        if(column.label=='ID'||column.label=='ADDRESS')
          return 'table-cell-1';
        if(column.label=='NAME'||column.label=='TEL'||column.label=='DUTY'||column.label=='TOTAL_COMMISSION_AMOUNT')
          return 'table-cell-4';
        if(column.label=='SEX'||column.label=='EMAIL'||column.label=='DUTY'||column.label=='SALE_PROJECT_COUNT')
          return 'table-cell-3';
        if(column.label=='ACCOUNT'||column.label=='NUMBER'||column.label=='SALES_AMOUNT')
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
      SearchAgentReportFormsPOJOList(currentpage){
        if(currentpage!=undefined)
          this.currentpage=currentpage;
        let param = Object.assign({}, this.conditionparam);
        param.starttime=this.dateutil.datetotime(param.starttime);
        param.endtime=this.dateutil.datetotime(param.endtime);
        param.skip = (this.currentpage-1)*10;
        var res = this.requestutil.ajax('/SearchAgentReportFormsPOJOList',param,false,this);
        if(res.statuscode<0){
          this.datalist=[];
          return;
        }
        let message = JSON.parse(res.message);
        this.datalist = message.datalist;
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




</style>
