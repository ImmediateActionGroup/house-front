<template>
  <div>
    <div>
      <el-tabs class="M-tabs" v-model="activeName" >
        <el-tab-pane label="PROJECT INFO" name="one">
          <div style="padding:0 15px;">
            <x-table>
              <tbody>
              <tr>
                <th>ID</th>
                <th>{{this.singlehouseinfo.house_id}}</th>
              </tr>
              <tr>
                <td>NAME</td>
                <td>{{this.singlehouseinfo.name}}</td>
              </tr>
              <tr>
                <td>ADDRESS</td>
                <td>{{this.singlehouseinfo.address}}</td>
              </tr>
              <tr>
                <td>CREATETIME</td>
                <td>{{this.singlehouseinfo.createtime}}</td>
              </tr>
              <tr>
                <td>INTRO</td>
                <td>{{this.singlehouseinfo.intro}}</td>
              </tr>
              <tr>
                <td>CREATOR</td>
                <td>{{this.singlehouseinfo.creator}}</td>
              </tr>
              <tr>
                <td>SUNSET DATE</td>
                <td>{{this.singlehouseinfo.sunset_date}}</td>
              </tr>
              </tbody>
            </x-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="HOUSE INFO" name="two">
          <div style="padding:0 15px;">
            <x-table>
              <thead>
              <tr>
                <th>LOT NO</th>
                <th>{{this.singlehouseinfo.lot_NO}}</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>LOT SIZE</td>
                <td>{{this.singlehouseinfo.lot_size}}</td>
              </tr>
              <tr>
                <td>TYPE</td>
                <td>{{this.singlehouseinfo.type}}</td>
              </tr>
              <tr>
                <td>SALES PRICE</td>
                <td>{{this.singlehouseinfo.sales_price}}</td>
              </tr>
              <tr>
                <td>STATUS</td>
                <td>{{this.singlehouseinfo.status}}</td>
              </tr>
              <tr>
                <td>LEVEL</td>
                <td>{{this.singlehouseinfo.level}}</td>
              </tr>
              <tr>
                <td>BED</td>
                <td>{{this.singlehouseinfo.bed}}</td>
              </tr>
              <tr>
                <td>BATH</td>
                <td>{{this.singlehouseinfo.bath}}</td>
              </tr>
              <tr>
                <td>STUDY</td>
                <td>{{this.singlehouseinfo.study}}</td>
              </tr>
              <tr>
                <td>CARPARK</td>
                <td>{{this.singlehouseinfo.carpark}}</td>
              </tr>
              <tr>
                <td>ORIENTATION</td>
                <td>{{this.singlehouseinfo.orientation}}</td>
              </tr>
              <tr>
                <td>INTERNAL APPROX</td>
                <td>{{this.singlehouseinfo.internal_approx}}</td>
              </tr>
              <tr>
                <td>BALCONY</td>
                <td>{{this.singlehouseinfo.balcony}}</td>
              </tr>
              <tr>
                <td>TOTAL AREA</td>
                <td>{{this.singlehouseinfo.total_area}}</td>
              </tr>
              <tr>
                <td>BODY CORP 1ST YEAR</td>
                <td>{{this.singlehouseinfo.body_corp_1st_year}}</td>
              </tr>
              <tr>
                <td>BODY CORP 2ST YEAR</td>
                <td>{{this.singlehouseinfo.body_corp_2st_year}}</td>
              </tr>
              <tr>
                <td>PROPERTY CATEGORY</td>
                <td>{{this.singlehouseinfo.property_category}}</td>
              </tr>
              </tbody>
            </x-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="HOUSE TYPE PICTURE" name="three">
          <!--<swiper :list="this.housetypefilelist"></swiper>-->
          <el-carousel :interval="5000" arrow="always">
            <el-carousel-item v-for="item in singlehouseinfo.housetypefilelist" :key="item">
              <img style="width: auto ; height: 100%; display: block; margin: 0 auto" :src=$store.state.imgpath+item />
            </el-carousel-item>
          </el-carousel>
        </el-tab-pane>
        <el-tab-pane label="CONTRACT" name="four">
          <div style="padding:0 15px;">
            <x-table>
              <tbody>
              <tr>
                <th>VERSION CONTRACT</th>
                <th>{{this.singlehouseinfo.version_contract}}</th>
              </tr>
              <tr>
                <td>CONTRACT SIGNED BY PURCHASERS</td>
                <td>{{this.singlehouseinfo.contract_signed_by_purchasers}}</td>
              </tr>
              <tr>
                <td>CONTRACT SIGNED BY VENDORS</td>
                <td>{{this.singlehouseinfo.contract_signed_by_vendors}}</td>
              </tr>
              <tr>
                <td>CONTRACT DATE</td>
                <td>{{this.singlehouseinfo.contract_date}}</td>
              </tr>
              <tr>
                <td>CONTRACT EXCHANGE DATE</td>
                <td>{{this.singlehouseinfo.contract_exchanged_date}}</td>
              </tr>
              <tr>
                <td>CONTRACT UNCONDITIONONAL DATE</td>
                <td>{{this.singlehouseinfo.unconditional_date}}</td>
              </tr>
              </tbody>
            </x-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="PURCHASER1" name="five">
          <div style="padding:0 15px;">
            <x-table>
              <tbody>
              <tr>
                <th>PASSPORT NO</th>
                <th>{{this.singlehouseinfo.pur1_passport_NO}}</th>
              </tr>
              <tr>
                <td>ADDRESS</td>
                <td>{{this.singlehouseinfo.pur1_address}}</td>
              </tr>
              <tr>
                <td>EMAIL</td>
                <td>{{this.singlehouseinfo.pur1_email}}</td>
              </tr>
              <tr>
                <td>TEL</td>
                <td>{{this.singlehouseinfo.pur1_tel}}</td>
              </tr>
              <tr>
                <td>DOB</td>
                <td>{{this.singlehouseinfo.pur1_dob}}</td>
              </tr>
              <tr>
                <td>IDENTITY CARD</td>
                <td>{{this.singlehouseinfo.pur1_identity_card}}</td>
              </tr>
              </tbody>
            </x-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="PURCHASER2" name="sex">
          <div style="padding:0 15px;">
            <x-table>
              <tbody>
              <tr>
                <th>PASSPORT NO</th>
                <th>{{this.singlehouseinfo.pur2_passport_NO}}</th>
              </tr>
              <tr>
                <td>ADDRESS</td>
                <td>{{this.singlehouseinfo.pur2_address}}</td>
              </tr>
              <tr>
                <td>EMAIL</td>
                <td>{{this.singlehouseinfo.pur2_email}}</td>
              </tr>
              <tr>
                <td>TEL</td>
                <td>{{this.singlehouseinfo.pur2_tel}}</td>
              </tr>
              <tr>
                <td>DOB</td>
                <td>{{this.singlehouseinfo.pur2_dob}}</td>
              </tr>
              <tr>
                <td>IDENTITY CARD</td>
                <td>{{this.singlehouseinfo.pur2_identity_card}}</td>
              </tr>
              </tbody>
            </x-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="HOUSE AND OTHER INFO" name="seven">
          <div style="padding:0 15px;">
            <x-table>
              <tbody>
              <tr>
                <th>PROJECT USE</th>
                <th>{{this.singlehouseinfo.project_use}}</th>
              </tr>
              <tr>
                <td>SALE PRICE PER CONTRACT</td>
                <td>{{this.singlehouseinfo.sale_price_per_contract}}</td>
              </tr>
              <tr>
                <td>COLOUR SCHEME</td>
                <td>{{this.singlehouseinfo.colour_scheme}}</td>
              </tr>
              <tr>
                <td>APPLIANCE PACKAGE</td>
                <td>{{this.singlehouseinfo.appliance_package}}</td>
              </tr>
              <tr>
                <td>EXTRA SPECIAL CONDITIONS</td>
                <td>{{this.singlehouseinfo.extra_special_conditions}}</td>
              </tr>
              <tr>
                <td>PURCHASER SOLICITOR NAME</td>
                <td>{{this.singlehouseinfo.purchaser_solicitor_name}}</td>
              </tr>
              </tbody>
            </x-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="DEPOSIT INFO" name="eight">
          <x-table>
            <tbody>
            <tr>
              <th>DEPOSIT REQUIRED PER CONTRACT</th>
              <th>{{this.singlehouseinfo.deposit_required_per_contract}}</th>
            </tr>
            <tr>
              <td>DEPOSIT TYPE</td>
              <td>{{this.singlehouseinfo.deposit_type}}</td>
            </tr>
            <tr>
              <td>DIRECT DEBIT DEPOSIT RECEIVED</td>
              <td>{{this.singlehouseinfo.direct_debit_deposit_received}}</td>
            </tr>
            <tr>
              <td>DEPOSIT RECEIVED DATE</td>
              <td>{{this.singlehouseinfo.deposit_received_date}}</td>
            </tr>
            <tr>
              <td>BANK GUARANTEE ISSUER</td>
              <td>{{this.singlehouseinfo.bank_guarantee_issuer}}</td>
            </tr>
            <tr>
              <td>BANK GUARANTEE EXPIRY</td>
              <td>{{this.singlehouseinfo.bank_guarantee_expiry}}</td>
            </tr>
            <tr>
              <td>BANK GUARANTEE AMOUNT</td>
              <td>{{this.singlehouseinfo.bank_guarantee_amount}}</td>
            </tr>
            <tr>
              <td>BANK GUARANTEE RECEIVED DATE</td>
              <td>{{this.singlehouseinfo.bank_guarantee_received_date}}</td>
            </tr>
            <tr>
              <td>ACCEPTABLE</td>
              <td>{{this.singlehouseinfo.acceptable}}</td>
            </tr>
            <tr>
              <td>DEPOSIT DUE DATE</td>
              <td>{{this.singlehouseinfo.deposit_due_date}}</td>
            </tr>
            <tr>
              <td>INTEREST BELONG</td>
              <td>{{this.singlehouseinfo.interest_belong}}</td>
            </tr>
            </tbody>
          </x-table>
        </el-tab-pane>
        <el-tab-pane label="INTERMEDIARY INFO" name="nine">
          <x-table>
            <tbody>
              <tr>
                <th>LAST RESERVE BELONG AGENT</th>
                <th>{{this.singlehouseinfo.last_reserve_belong_intermediaryaccount}}</th>
              </tr>
              <tr>
                <td>LAST RESERVE ACCOUNT</td>
                <td>{{this.singlehouseinfo.last_reserve_account}}</td>
              </tr>
              <tr>
                <td>ESTATE AGENT OFFICE</td>
                <td>{{this.singlehouseinfo.estate_agent_office}}</td>
              </tr>
              <tr>
                <td>ESTATE AGENT OFFICE CONTACT DETAILS</td>
                <td>{{this.singlehouseinfo.estate_agent_office_contact_details}}</td>
              </tr>
              <tr>
                <td>ESTATE AGENT SALES PERSON</td>
                <td>{{this.singlehouseinfo.estate_agent_sales_person}}</td>
              </tr>
              <tr>
                <td>COMMISSION RATE</td>
                <td>{{this.singlehouseinfo.commission_rate}}</td>
              </tr>
              <tr>
                <td>COMMISSION PAYMENT METHOD</td>
                <td>{{this.singlehouseinfo.commission_payment_method}}</td>
              </tr>
              <tr>
                <td>COMMISSION TOTAL AMOUNT</td>
                <td>{{this.singlehouseinfo.commission_total_amount}}</td>
              </tr>
              <tr>
                <td>COMMISSION PAYMENT DATE</td>
                <td>{{this.singlehouseinfo.commission_payment_date}}</td>
              </tr>
            </tbody>
          </x-table>
        </el-tab-pane>
      </el-tabs>

    </div>


  </div>
</template>


<script>
  import { XTable, LoadMore,Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'
  const list = () => ['PROJECT INFO','HOUSE INFO','HOUSE TYPE PIC','CONTRACT','PURCHASER1','PURCHASER2','HOUSE AND OTHER INFO','DEPOSIT INFO','INTERMEDIARY INFO']
  const baseList = [{
    url: 'javascript:',
    img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
    title: '送你一朵fua'
  }, {
    url: 'javascript:',
    img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
    title: '送你一辆车'
  }, {
    url: 'javascript:',
    img: 'https://static.vux.li/demo/5.jpg', // 404
    title: '送你一次旅行',
    fallbackImg: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'
  }]

  export default {
    components: {
      Tab,
      TabItem,
      Sticky,
      Divider,
      XButton,
      Swiper,
      SwiperItem,
      XTable,
      LoadMore
    },
    data () {
      return {
        activeName: 'one',
        demo01_list: baseList,
        singlehouseinfo:{},
        housetypefilelist:[],
      }
    },
    mounted(){
      this.VerifyUser();
      this.SearchHouseAllInfoByHouseId();

    },
    methods: {
      VerifyUser(){
        var res = this.requestutil.ajax('/VerifyUser', null, true, this);
        if (res.statuscode < 0)
          this.$goRoute('/login');
        let message = JSON.parse(res.message);
        //如果是厚易账号且要进入我的项目会直接到登录页面
        if (message.AccountType != 2 )
          this.$goRoute('/login');
        this.$store.state.author = message.Name;
      },
      SearchHouseAllInfoByHouseId(){
        this.TabsactiveName = 'one';
        var param = {
          house_id: this.$route.query.house_id,
        }
        var res = this.requestutil.ajax('/SearchHouseAllInfoByHouseId', param, false,this);
        if(res.statuscode>=0)
          this.singlehouseinfo = JSON.parse(res.message);
        this.currentreceiveddeposittype = this.singlehouseinfo.deposit_type;
        this.singlehouseinfo.createtime = this.dateutil.timetodateymd(this.singlehouseinfo.createtime);
        let singlestatus = this.singlehouseinfo.status;
        this.singlehouseinfo.status=singlestatus==0?'AVAILABLE':singlestatus==1?'RESERVED':singlestatus==2?'SOLD':singlestatus==3?'SETTLED':singlestatus==4?'LOCKED':singlestatus==5?'OFFERED':'';
        let type = this.singlehouseinfo.type;
        this.singlehouseinfo.type=type==0?'B':'H';
        this.singlehouseinfo.sunset_date = this.dateutil.timetodateymd(this.singlehouseinfo.sunset_date)
        this.singlehouseinfo.housetypefilelist = this.singlehouseinfo.house_type_pic!=undefined&&this.singlehouseinfo.house_type_pic!=""?this.singlehouseinfo.house_type_pic.split(','):[];

        /*let housepicarr = this.singlehouseinfo.house_type_pic!=undefined&&this.singlehouseinfo.house_type_pic!=""?this.singlehouseinfo.house_type_pic.split(','):[];
        for(var j = 0,len=housepicarr.length; j < len; j++) {
          var singleimg = {
              img:this.$store.state.imgpath+housepicarr[j]
          }
          this.housetypefilelist.push(singleimg);
        }*/
        this.singlehouseinfo.property_category = this.datautil.objtostr(this.singlehouseinfo.property_category);
        this.singlehouseinfo.orientation = this.datautil.objtostr(this.singlehouseinfo.orientation);
        this.singlehouseinfo.deposit_received_date = this.dateutil.timetodateymd(this.singlehouseinfo.deposit_received_date)
        this.singlehouseinfo.bank_guarantee_issuer = this.dateutil.timetodateymd(this.singlehouseinfo.bank_guarantee_issuer)
        this.singlehouseinfo.bank_guarantee_expiry = this.dateutil.timetodateymd(this.singlehouseinfo.bank_guarantee_expiry)
        this.singlehouseinfo.bank_guarantee_received_date = this.dateutil.timetodateymd(this.singlehouseinfo.bank_guarantee_received_date)
        this.singlehouseinfo.deposit_due_date = this.dateutil.timetodateymd(this.singlehouseinfo.deposit_due_date)
        this.singlehouseinfo.commission_payment_date = this.dateutil.timetodateymd(this.singlehouseinfo.commission_payment_date)
        this.singlehouseinfo.contract_date = this.dateutil.timetodateymd(this.singlehouseinfo.contract_date)
        this.singlehouseinfo.contract_exchanged_date = this.dateutil.timetodateymd(this.singlehouseinfo.contract_exchanged_date)
        this.singlehouseinfo.unconditional_date = this.dateutil.timetodateymd(this.singlehouseinfo.unconditional_date)
        this.singlehouseinfo.pur1_dob = this.dateutil.timetodateymd(this.singlehouseinfo.pur1_dob)
        this.singlehouseinfo.pur2_dob = this.dateutil.timetodateymd(this.singlehouseinfo.pur2_dob)
        if(this.singlehouseinfo.contract_signed_by_purchasers!=undefined)
          this.singlehouseinfo.contract_signed_by_purchasers==0?this.singlehouseinfo.contract_signed_by_purchasers='signed':this.singlehouseinfo.contract_signed_by_purchasers='no signed'
        if(this.singlehouseinfo.deposit_type!=undefined)
          this.singlehouseinfo.deposit_type==0?this.singlehouseinfo.deposit_type='direct debit':this.singlehouseinfo.deposit_type='bank guarantee'
        if(this.singlehouseinfo.contract_signed_by_vendors!=undefined)
          this.singlehouseinfo.contract_signed_by_vendors==0?this.singlehouseinfo.contract_signed_by_vendors='signed':this.singlehouseinfo.contract_signed_by_vendors='no signed'
        if(this.singlehouseinfo.pur1_identity_card!=undefined)
          this.singlehouseinfo.pur1_identity_card==0?this.singlehouseinfo.pur1_identity_card='use':this.singlehouseinfo.pur1_identity_card='nonuse'
        if(this.singlehouseinfo.pur2_identity_card!=undefined)
          this.singlehouseinfo.pur2_identity_card==undefined?this.singlehouseinfo.pur2_identity_card='':this.singlehouseinfo.pur2_identity_card==0?this.singlehouseinfo.pur2_identity_card='use':this.singlehouseinfo.pur2_identity_card='nonuse'
        if(this.singlehouseinfo.project_use!=undefined)
          this.singlehouseinfo.project_use==0?this.singlehouseinfo.project_use='live':this.singlehouseinfo.project_use='invest'
        if(this.singlehouseinfo.colour_scheme!=undefined)
          this.singlehouseinfo.colour_scheme==0?this.singlehouseinfo.colour_scheme='light':this.singlehouseinfo.colour_scheme='dark'
        if(this.singlehouseinfo.appliance_package!=undefined)
          this.singlehouseinfo.appliance_package==0?this.singlehouseinfo.appliance_package='standard':this.singlehouseinfo.appliance_package==1?this.singlehouseinfo.appliance_package='premum':this.singlehouseinfo.appliance_package='luxury'
        if(this.singlehouseinfo.resident_status!=undefined)
          this.singlehouseinfo.resident_status=this.singlehouseinfo.resident_status==0?'Local':this.singlehouseinfo.resident_status==1?'FIRB':''
      },

    }
  }
</script>

<style>
  .M-tabs .el-tabs__item:hover{
    color: #1AAD19 !important;
  }
  .M-tabs .el-tabs__item.is-active{
    color: #1AAD19 !important;
  }
  .M-tabs .el-tabs__active-bar{
    background-color: #1AAD19 !important;
  }



</style>
