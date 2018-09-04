<template>
  <div>
    <div>
      <el-tabs class="M-tabs" v-model="activeName">
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
        <el-tab-pane label="DEPOSIT CERTIFICATE PICTURE" name="three3">
          <el-carousel :interval="5000" arrow="always">
            <el-carousel-item v-for="item in singlehouseinfo.offerpicfilelist" :key="item">
              <img style="width: auto ; height: 100%; display: block; margin: 0 auto" :src=$store.state.imgpath+item />
            </el-carousel-item>
          </el-carousel>
        </el-tab-pane>
        <el-tab-pane label="PURCHASER1" name="five">
          <div style="padding:0 15px;">
            <x-table>
              <thead>
              <tr>
                <th>NAME</th>
                <th>{{this.singlehouseinfo.pur1_name}}</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>PASSPORT_NO</td>
                <td>{{this.singlehouseinfo.pur1_passport_NO}}</td>
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
                <td>IDENTITY_CARD</td>
                <td>{{this.singlehouseinfo.pur1_identity_card}}</td>
              </tr>
              </tbody>
            </x-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="PURCHASER2" name="six">
          <div style="padding:0 15px;">
            <x-table>
              <thead>
              <tr>
                <th>NAME</th>
                <th>{{this.singlehouseinfo.pur2_name}}</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>PASSPORT_NO</td>
                <td>{{this.singlehouseinfo.pur2_passport_NO}}</td>
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
                <td>IDENTITY_CARD</td>
                <td>{{this.singlehouseinfo.pur2_identity_card}}</td>
              </tr>

              </tbody>
            </x-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="OTHER INFO" name="seven">
          <div style="padding:0 15px;">
            <x-table>
              <thead>
              <tr>
                <th>RESIDENT_STATUS</th>
                <th>{{this.singlehouseinfo.resident_status}}</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>NATIONALITY</td>
                <td>{{this.singlehouseinfo.nationality}}</td>
              </tr>
              <tr>
                <td>APPLIANCE_PACKAGE</td>
                <td>{{this.singlehouseinfo.appliance_package}}</td>
              </tr>
              <tr>
                <td>EXTRA_SPECIAL_CONDITIONS</td>
                <td>{{this.singlehouseinfo.extra_special_conditions}}</td>
              </tr>
              <tr>
                <td>OFFER_PRICE</td>
                <td>{{this.singlehouseinfo.offer_price}}</td>
              </tr>
              <tr>
                <td>DEPOSIT HAS BEEN PAID</td>
                <td>{{this.singlehouseinfo.is_cash_pledge}}</td>
              </tr>
              </tbody>
            </x-table>
          </div>
        </el-tab-pane>

      </el-tabs>
    </div>

  </div>
</template>

<script>
  import {Toast,XNumber,Calendar,PopupRadio,XInput, XTable, LoadMore,Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem,Group} from 'vux'
  export default {
    components: {
      Toast,
      XNumber,
      Calendar,
      Group,
      PopupRadio,
      XInput,
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
        singlehouseinfo: [],
        activeName: 'one',
      };
    },
    mounted(){
      this.SearchHouseAllInfoByHouseId();
      this.VerifyUser();
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
        this.offerdepositpiclist = [];
        this.TabsactiveName = 'one';
        var param = {
          house_id: this.$route.query.house_id,
          purchaser_random: this.$route.query.purchaser_random,
        }
        var res = this.requestutil.ajax('/SearchHouseAllInfoByHouseId', param, false, this);
        if (res.statuscode >= 0)
          this.singlehouseinfo = JSON.parse(res.message);
        this.currentreceiveddeposittype = this.singlehouseinfo.deposit_type;
        this.singlehouseinfo.createtime = this.dateutil.timetodateymd(this.singlehouseinfo.createtime);
        let singlestatus = this.singlehouseinfo.status;
        this.singlehouseinfo.status = singlestatus == 0 ? 'AVAILABLE' : singlestatus == 1 ? 'RESERVED' : singlestatus == 2 ? 'SOLD' : singlestatus == 3 ? 'SETTLED' : singlestatus == 4 ? 'LOCKED' : singlestatus == 5 ? 'OFFERED' : '';
        let type = this.singlehouseinfo.type;
        this.singlehouseinfo.type = type == 0 ? 'B' : 'H';
        this.singlehouseinfo.sunset_date = this.dateutil.timetodateymd(this.singlehouseinfo.sunset_date)
        this.singlehouseinfo.housetypefilelist = this.singlehouseinfo.house_type_pic != undefined && this.singlehouseinfo.house_type_pic != "" ? this.singlehouseinfo.house_type_pic.split(',') : [];
        this.singlehouseinfo.property_category = this.datautil.objtostr(this.singlehouseinfo.property_category);
        this.singlehouseinfo.orientation = this.datautil.objtostr(this.singlehouseinfo.orientation);
        this.singlehouseinfo.offerpicfilelist = this.singlehouseinfo.cash_pledge_proof_pic != undefined && this.singlehouseinfo.cash_pledge_proof_pic != "" ? this.singlehouseinfo.cash_pledge_proof_pic.split(',') : [];
        if (this.singlehouseinfo.pur1_dob != undefined && this.singlehouseinfo.pur1_dob != 0)
          this.$set(this.singlehouseinfo, 'pur1_dob', this.dateutil.timetodateymd(this.singlehouseinfo.pur1_dob))
        if (this.singlehouseinfo.pur2_dob != undefined && this.singlehouseinfo.pur2_dob != 0)
          this.$set(this.singlehouseinfo, 'pur2_dob', this.dateutil.timetodateymd(this.singlehouseinfo.pur2_dob))
        this.singlehouseinfo.is_cash_pledge = this.singlehouseinfo.is_cash_pledge==0?'yes':'no';
        this.offerdepositpiclist = this.uploadfileutil.pathstrtofilelist(this.singlehouseinfo.cash_pledge_proof_pic, this);
        let appliance_package = this.singlehouseinfo.appliance_package;
        this.singlehouseinfo.appliance_package = appliance_package==0?'standard':appliance_package==1?'premum':'luxury';
        this.singlehouseinfo.resident_status = this.singlehouseinfo.resident_status==0?'Local':'FIRB';
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
