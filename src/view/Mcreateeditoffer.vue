<template>
  <div>
    <div>
      <el-tabs class="M-tabs" v-model="activeName" @tab-click="handleClick">
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

        <el-tab-pane label="PURCHASER1" name="five">
          <group>
            <x-input label-width="10rem" title="NAME" required placeholder="NAME" v-model="singlehouseinfo.pur1_name" placeholder-align="right" ref="pur1_name" ></x-input>
          </group>
          <group>
            <x-input label-width="10rem"  title="PASSPORT NO" required placeholder="PASSPORT NO" v-model="singlehouseinfo.pur1_passport_NO" placeholder-align="right" ref="pur1_passport_NO"></x-input>
          </group>
          <group>
            <x-input label-width="10rem"  title="ADDRESS" required placeholder="ADDRESS" v-model="singlehouseinfo.pur1_address" placeholder-align="right" ref="pur1_address"></x-input>
          </group>
          <group>
            <x-input label-width="10rem"  title="EMAIL"  required is-type="email" placeholder="EMAIL" v-model="singlehouseinfo.pur1_email" placeholder-align="right" ref="pur1_email"></x-input>
          </group>
          <group>
            <x-input label-width="10rem"  title="TEL" required placeholder="TEL" v-model="singlehouseinfo.pur1_tel" placeholder-align="right" ref="pur1_tel"></x-input>
          </group>
          <group>
            <calendar disable-future label-width="10rem"  v-model="singlehouseinfo.pur1_dob" title="DOB" placeholder="DOB" ref="pur1_dob"></calendar>
          </group>
          <group>
            <popup-radio required title="IDENTITY CARD" :options="identity_card_options" v-model="singlehouseinfo.pur1_identity_card" placeholder-align="right" placeholder="IDENTITY CARD" ref="pur1_identity_card"></popup-radio>
          </group>
          <el-upload
            v-if="singlehouseinfo.pur1_identity_card==0"
            :action=$store.state.serveruploadpicsrc
            :on-success="idcard1uploadsuccess"
            list-type="picture-card"
            :file-list="idcard1piclist"
            :with-credentials="true"
            :on-remove="idcard1handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="PURCHASER2" name="six">
          <group>
            <x-input label-width="10rem"  title="NAME"  placeholder="NAME" v-model="singlehouseinfo.pur2_name" placeholder-align="right" ref="pur2_name"></x-input>
          </group>
          <group>
            <x-input label-width="10rem"  title="PASSPORT NO"  placeholder="PASSPORT NO" v-model="singlehouseinfo.pur2_passport_NO" placeholder-align="right" ref="pur2_passport_NO"></x-input>
          </group>
          <group>
            <x-input label-width="10rem"  title="ADDRESS"  placeholder="ADDRESS" v-model="singlehouseinfo.pur2_address" placeholder-align="right" ref="pur2_address"></x-input>
          </group>
          <group>
            <x-input label-width="10rem"  title="EMAIL"   is-type="email" placeholder="EMAIL" v-model="singlehouseinfo.pur2_email" placeholder-align="right" ref="pur2_email"></x-input>
          </group>
          <group>
            <x-input label-width="10rem"  title="TEL"  placeholder="TEL" v-model="singlehouseinfo.pur2_tel" placeholder-align="right" ref="pur2_tel"></x-input>
          </group>
          <group>
            <calendar disable-future v-model="singlehouseinfo.pur2_dob" title="DOB" placeholder="DOB" ref="pur2_dob"></calendar>
          </group>
          <group>
            <popup-radio required title="IDENTITY CARD" :options="identity_card_options" v-model="singlehouseinfo.pur2_identity_card" placeholder-align="right" placeholder="IDENTITY CARD" ref="pur2_identity_card"></popup-radio>
          </group>
          <el-upload
            v-if="singlehouseinfo.pur2_identity_card==0"
            :action=$store.state.serveruploadpicsrc
            :on-success="idcard2uploadsuccess"
            list-type="picture-card"
            :file-list="idcard2piclist"
            :with-credentials="true"
            :on-remove="idcard2handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="OFFER" name="seven">
          <group>
            <popup-radio required title="RESIDENT STATUS" :options="resident_status_options" v-model="singlehouseinfo.resident_status" placeholder-align="right" placeholder="RESIDENT STATUS" ref="resident_status"></popup-radio>
          </group>
          <group>
            <x-input label-width="10rem"  required title="NATIONALITY" placeholder="NATIONALITY" v-model="singlehouseinfo.nationality" placeholder-align="right" ref="nationality"></x-input>
          </group>
          <group>
            <popup-radio required title="APPLIANCE PACKAGE" placeholder="APPLIANCE PACKAGE" :options="appliance_package_options" v-model="singlehouseinfo.appliance_package" placeholder-align="right" ref="appliance_package_options"></popup-radio>
          </group>
          <group>
            <x-input label-width="10rem"  required title="EXTRA SPECIAL CONDITIONS" placeholder="EXTRA SPECIAL CONDITIONS" v-model="singlehouseinfo.extra_special_conditions" placeholder-align="right" ref="extra_special_conditions"></x-input>
          </group>
          <group>
            <x-input label-width="10rem" :is-type="isNumber" required title="OFFER_PRICE" placeholder="OFFER_PRICE" v-model="singlehouseinfo.offer_price" placeholder-align="right" ref="offer_price"></x-input>
          </group>
          <group>
            <calendar disable-future v-model="singlehouseinfo.offer_date" title="OFFER_DATE" placeholder="OFFER_DATE" ref="offer_date"></calendar>
          </group>
          <group>
            <popup-radio required title="DEPOSIT HAS BEEN PAID" placeholder="DEPOSIT HAS BEEN PAID" :options="is_cash_pledge_options" v-model="singlehouseinfo.is_cash_pledge" placeholder-align="right" ref="is_cash_pledge"></popup-radio>
          </group>
          <el-upload
            v-if="singlehouseinfo.is_cash_pledge==0"
            :action=$store.state.serveruploadpicsrc
            :with-credentials="true"
            list-type="picture-card"
            :on-success="offerdeposituploadsuccess"
            :on-remove="offerdeposithandleRemove"
            :file-list="offerdepositpiclist"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <x-button type="primary" @click.native="CreateEditOffer()">Save</x-button>
        </el-tab-pane>

      </el-tabs>
    </div>
    <toast v-model="showtoast" type="text" :time="1500" :text="toast_text" width="20em" position="top"></toast>
  </div>
</template>


<script>
  import {Toast,XNumber,Calendar,PopupRadio,XInput, XTable, LoadMore,Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem,Group} from 'vux'
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
        toast_text: '',
        showtoast: false,
        singlehouseinfo: [],
        activeName: 'one',
        demo01_list: baseList,
        resident_status_options: [{
          key: '0',
          value: 'Local'
        }, {
          key: '1',
          value: 'FIRB'
        }],
        appliance_package_options: [{
          key: '0',
          value: 'standard'
        }, {
          key: '1',
          value: 'premum'
        }, {
          key: '2',
          value: 'luxury'
        }],
        is_cash_pledge_options: [{
          key: '0',
          value: 'yes'
        }, {
          key: '1',
          value: 'no'
        }],
        identity_card_options: [{
          key: '0',
          value: 'use'
        }, {
          key: '1',
          value: 'nonuse'
        }],
        offerdepositpiclist: [],
        isofferview: false,
        //flag：   0：预定项目   1：修改预定的项目   2：确认定金   3：确认尾款  4：创建offer 5:修改offer
        flag: undefined,
        idcard1piclist:[],
        idcard2piclist:[],
      };
    },
    mounted(){
      this.flag = this.$route.query.flag;
      this.VerifyUser();
      this.SearchHouseAllInfoByHouseId();
    },
    methods: {
      handleClick(tab, event) {

      },
      offerdeposituploadsuccess(response, file, fileList){
        this.offerdepositpiclist = fileList;
      },
      offerdeposithandleRemove(file, fileList) {
        this.offerdepositpiclist = fileList;
      },
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
      idcard2uploadsuccess(response, file, fileList){
        this.idcard2piclist = fileList;
      },
      idcard2handleRemove(file, fileList) {
        this.idcard2piclist = fileList;
      },
      idcard1uploadsuccess(response, file, fileList){
        this.idcard1piclist = fileList;
      },
      idcard1handleRemove(file, fileList) {
        this.idcard1piclist = fileList;
      },
      SearchHouseAllInfoByHouseId(){
        this.offerdepositpiclist=[];
        this.TabsactiveName = 'one';
        var param = {
          house_id: this.$route.query.house_id,
          purchaser_random:this.$route.query.purchaser_random,
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
        this.singlehouseinfo.property_category = this.datautil.objtostr(this.singlehouseinfo.property_category);
        this.singlehouseinfo.orientation = this.datautil.objtostr(this.singlehouseinfo.orientation);
        //预定项目  创建offer
        if(this.flag==4){
          this.singlehouseinfo.offer_date = this.dateutil.nowdatetoymd();
          return ;
        }
        //预定后创建offer
        if(this.flag==6){
          if(this.singlehouseinfo.pur1_dob!=undefined&&this.singlehouseinfo.pur1_dob!=0)
            this.$set(this.singlehouseinfo,'pur1_dob',this.dateutil.timetodateymd(this.singlehouseinfo.pur1_dob))
          if(this.singlehouseinfo.pur2_dob!=undefined&&this.singlehouseinfo.pur2_dob!=0)
            this.$set(this.singlehouseinfo,'pur2_dob',this.dateutil.timetodateymd(this.singlehouseinfo.pur2_dob))
          this.singlehouseinfo.offer_date = this.dateutil.nowdatetoymd();
          this.idcard2piclist = this.uploadfileutil.pathstrtofilelist(this.singlehouseinfo.pur2_idcard_pic,this);
          this.idcard1piclist = this.uploadfileutil.pathstrtofilelist(this.singlehouseinfo.pur1_idcard_pic,this);
          return;
        }
        //修改offer
        if(this.flag==5){
          this.singlehouseinfo.offerpicfilelist = this.singlehouseinfo.cash_pledge_proof_pic!=undefined&&this.singlehouseinfo.cash_pledge_proof_pic!=""?this.singlehouseinfo.cash_pledge_proof_pic.split(','):[];
          if(this.singlehouseinfo.pur1_dob!=undefined&&this.singlehouseinfo.pur1_dob!=0)
            this.$set(this.singlehouseinfo,'pur1_dob',this.dateutil.timetodateymd(this.singlehouseinfo.pur1_dob))
          if(this.singlehouseinfo.pur2_dob!=undefined&&this.singlehouseinfo.pur2_dob!=0)
            this.$set(this.singlehouseinfo,'pur2_dob',this.dateutil.timetodateymd(this.singlehouseinfo.pur2_dob))
          this.singlehouseinfo.is_cash_pledge = this.singlehouseinfo.is_cash_pledge.toString();
          this.offerdepositpiclist = this.uploadfileutil.pathstrtofilelist(this.singlehouseinfo.cash_pledge_proof_pic,this);
          this.singlehouseinfo.appliance_package = this.singlehouseinfo.appliance_package.toString();
          this.singlehouseinfo.resident_status = this.singlehouseinfo.resident_status.toString();
          this.idcard2piclist = this.uploadfileutil.pathstrtofilelist(this.singlehouseinfo.pur2_idcard_pic,this);
          this.idcard1piclist = this.uploadfileutil.pathstrtofilelist(this.singlehouseinfo.pur1_idcard_pic,this);
          this.singlehouseinfo.offer_date = this.dateutil.timetodateymd(this.singlehouseinfo.offer_date)
          return;
        }
      },
      CreateEditOffer(){
        if(!this.$refs.pur1_name.valid) {
          this.showtoastmethod('pur1_name Is Invalid');
          return;
        }
        if(!this.$refs.pur1_passport_NO.valid) {
          this.showtoastmethod('pur1_passport_NO Is Invalid');
          return;
        }
        if(!this.$refs.pur1_address.valid) {
          this.showtoastmethod('pur1_address Is Invalid');
          return;
        }
        if(!this.$refs.pur1_email.valid) {
          this.showtoastmethod('pur1_email Is Invalid');
          return;
        }
        if(!this.$refs.pur2_email.valid) {
          this.showtoastmethod('pur2_email Is Invalid');
          return;
        }
        if(!this.$refs.pur1_tel.valid) {
          this.showtoastmethod('pur1_tel Is Invalid');
          return;
        }
        if(this.singlehouseinfo.pur1_dob==undefined) {
          this.showtoastmethod('pur1_dob Is Invalid');
          return;
        }
        if(this.singlehouseinfo.pur1_identity_card==undefined) {
          this.showtoastmethod('pur1_identity_card Is Invalid');
          return;
        }

        if(this.singlehouseinfo.resident_status==undefined) {
          this.showtoastmethod('resident_status Is Invalid');
          return;
        }
        if(!this.$refs.nationality.valid) {
          this.showtoastmethod('nationality Is Invalid');
          return;
        }
        if(this.singlehouseinfo.appliance_package==undefined) {
          this.showtoastmethod('appliance_package Is Invalid');
          return;
        }
        if(!this.$refs.extra_special_conditions.valid) {
          this.showtoastmethod('extra_special_conditions Is Invalid');
          return;
        }
        if(!this.$refs.offer_price.valid) {
          this.showtoastmethod('offer_price Is Invalid');
          return;
        }
        if(this.singlehouseinfo.is_cash_pledge==undefined) {
          this.showtoastmethod('deposit has been paid Is Invalid');
          return;
        }
        console.log('???       ',this.offerdepositpiclist);
        this.singlehouseinfo.cash_pledge_proof_pic = this.uploadfileutil.filelisttopathstr(this.offerdepositpiclist);
        this.singlehouseinfo.pur1_dob = this.dateutil.ymddatestrtotime(this.singlehouseinfo.pur1_dob);
        this.singlehouseinfo.pur2_dob = this.dateutil.ymddatestrtotime(this.singlehouseinfo.pur2_dob);
        this.singlehouseinfo.house_id=this.singlehouseinfo.id;
        this.singlehouseinfo.pur1_idcard_pic = this.uploadfileutil.filelisttopathstr(this.idcard1piclist);
        this.singlehouseinfo.pur2_idcard_pic = this.uploadfileutil.filelisttopathstr(this.idcard2piclist);
        this.singlehouseinfo.offer_date = this.dateutil.ymddatestrtotime(this.singlehouseinfo.offer_date);
        this.singlehouseinfo.flag = this.flag;
        var res;
        if(this.flag==4||this.flag==6)
          res = this.requestutil.ajax('/CreateOffer', this.singlehouseinfo, true, this);
        if(this.flag==5){
          res = this.requestutil.ajax('/EditOffer', this.singlehouseinfo, true, this);
        }
        //this.showtoastmethod(res.message);
        if(res.statuscode>=0){
          this.singlehouseinfo = {};
          this.offerdepositpiclist=[];
          this.$goRoute('/Mhome/Mhouse');
        }
      },
      showtoastmethod(text){
        this.showtoast = true;
        this.toast_text = text;
      },
      isNumberMethod(value){
        var reg = new RegExp(/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/); //正整数和正浮点数正则表达式
        if(value === ""){ //输入不能为空
          return false;
        }else if(!reg.test(value)){ //正则验证不通过，格式不对
          return false;
        }else{
          return true;
        }
      },
      isNumber (value) {
        return {
          valid: this.isNumberMethod(value),
          msg: 'Must be a number'
        }
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
