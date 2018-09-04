<template>
  <div>
    <div>
      <el-tabs class="M-tabs" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="PURCHASER1" name="one">
          <group>
            <x-input label-width="10rem" :readonly="isofferreserved" title="NAME" required v-model="singlehouseinfo.pur1_name" placeholder-align="right" ref="pur1_name" ></x-input>
          </group>
          <group>
            <x-input label-width="10rem"  :readonly="isofferreserved" title="PASSPORT NO" required  v-model="singlehouseinfo.pur1_passport_NO" placeholder-align="right" ref="pur1_passport_NO"></x-input>
          </group>
          <group>
            <x-input label-width="10rem"  :readonly="isofferreserved" title="ADDRESS" required v-model="singlehouseinfo.pur1_address" placeholder-align="right" ref="pur1_address"></x-input>
          </group>
          <group>
            <x-input label-width="10rem"  :readonly="isofferreserved" title="EMAIL"  required is-type="email" v-model="singlehouseinfo.pur1_email" placeholder-align="right" ref="pur1_email"></x-input>
          </group>
          <group>
            <x-input label-width="10rem"  :readonly="isofferreserved" title="TEL" required v-model="singlehouseinfo.pur1_tel" placeholder-align="right" ref="pur1_tel"></x-input>
          </group>
          <group>
            <calendar :readonly="isofferreserved" disable-future label-width="10rem"  v-model="singlehouseinfo.pur1_dob" title="DOB" ref="pur1_dob"></calendar>
          </group>
          <group>
            <popup-radio :readonly="isofferreserved" required title="IDENTITY CARD" :options="identity_card_options" v-model="singlehouseinfo.pur1_identity_card" placeholder-align="right"  ref="pur1_identity_card"></popup-radio>
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
        <el-tab-pane label="PROJECT INFO" name="five">
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
        <el-tab-pane label="CONTRACT" name="three">
          <group>
            <popup-radio  title="CONTRACT SIGNED BY PURCHASERS" :options="contract_signed_by_purchasers_options" v-model="singlehouseinfo.contract_signed_by_purchasers" placeholder-align="right" ref="contract_signed_by_purchasers"></popup-radio>
          </group>
          <group>
            <popup-radio  title="CONTRACT SIGNED BY VENDORS" :options="contract_signed_by_vendors_options" v-model="singlehouseinfo.contract_signed_by_vendors" placeholder-align="right"  ref="contract_signed_by_vendors"></popup-radio>
          </group>
          <group>
            <calendar disable-future v-model="singlehouseinfo.contract_date" title="CONTRACT_DATE"   ref="contract_date"></calendar>
          </group>
          <group>
            <calendar disable-future v-model="singlehouseinfo.contract_exchanged_date" title="CONTRACT_EXCHANGED_DATE" ref="contract_exchanged_date"></calendar>
          </group>
          <group>
            <calendar disable-future v-model="singlehouseinfo.unconditional_date" title="UNCONDITIONAL_DATE"  ref="unconditional_date"></calendar>
          </group>
        </el-tab-pane>


        <el-tab-pane label="PURCHASER2" name="six">
          <group>
            <x-input label-width="10rem" :readonly="isofferreserved"  title="NAME" v-model="singlehouseinfo.pur2_name" placeholder-align="right" ref="pur2_name"></x-input>
          </group>
          <group>
            <x-input label-width="10rem" :readonly="isofferreserved"  title="PASSPORT NO" v-model="singlehouseinfo.pur2_passport_NO" placeholder-align="right" ref="pur2_passport_NO"></x-input>
          </group>
          <group>
            <x-input label-width="10rem" :readonly="isofferreserved"  title="ADDRESS" v-model="singlehouseinfo.pur2_address" placeholder-align="right" ref="pur2_address"></x-input>
          </group>
          <group>
            <x-input label-width="10rem" :readonly="isofferreserved"  title="EMAIL"  is-type="email" v-model="singlehouseinfo.pur2_email" placeholder-align="right" ref="pur2_email"></x-input>
          </group>
          <group>
            <x-input label-width="10rem" :readonly="isofferreserved"  title="TEL" v-model="singlehouseinfo.pur2_tel" placeholder-align="right" ref="pur2_tel"></x-input>
          </group>
          <group>
            <calendar  disable-future :readonly="isofferreserved" disable-future v-model="singlehouseinfo.pur2_dob" title="DOB" ref="pur2_dob"></calendar>
          </group>
          <group>
            <popup-radio :readonly="isofferreserved"  title="IDENTITY CARD" :options="identity_card_options" v-model="singlehouseinfo.pur2_identity_card" placeholder-align="right" placeholder="IDENTITY CARD" ref="pur2_identity_card"></popup-radio>
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
        <el-tab-pane label="HOUSE&MASTER INFO" name="seven">
          <group>
            <popup-radio  title="PROJECT_USE" :options="project_use_options" v-model="singlehouseinfo.project_use" placeholder-align="right"  ref="project_use"></popup-radio>
          </group>
          <group>
            <x-input label-width="10rem" :is-type="isNumber"  title="SALE_PRICE_PER_CONTRACT"  v-model="singlehouseinfo.sale_price_per_contract" placeholder-align="right" ref="sale_price_per_contract"></x-input>
          </group>
          <group>
            <popup-radio  title="COLOUR_SCHEME" :options="colour_scheme_options" v-model="singlehouseinfo.colour_scheme" placeholder-align="right"  ref="colour_scheme"></popup-radio>
          </group>
          <group>
            <popup-radio :readonly="isofferreserved"  title="APPLIANCE PACKAGE" :options="appliance_package_options" v-model="singlehouseinfo.appliance_package" placeholder-align="right" ref="appliance_package_options"></popup-radio>
          </group>
          <group>
            <x-input :readonly="isofferreserved" label-width="10rem"   title="EXTRA_SPECIAL_CONDITIONS"  v-model="singlehouseinfo.extra_special_conditions" placeholder-align="right" ref="extra_special_conditions"></x-input>
          </group>
          <group>
            <x-input label-width="10rem"  :is-type="isNumber"   title="DEPOSIT_REQUIRED_PER_CONTRACT"  v-model="singlehouseinfo.deposit_required_per_contract" placeholder-align="right" ref="deposit_required_per_contract"></x-input>
          </group>
          <group>
            <popup-radio  title="DEPOSIT_TYPE" :options="deposit_type_options" v-model="singlehouseinfo.deposit_type" placeholder-align="right"  ref="deposit_type"></popup-radio>
          </group>

          <group>
            <popup-radio :readonly="isofferreserved"   title="RESIDENT_STATUS" :options="resident_status_options" v-model="singlehouseinfo.resident_status" placeholder-align="right"  ref="resident_status"></popup-radio>
          </group>
          <group>
            <x-input :readonly="isofferreserved"  label-width="10rem"   title="NATIONALITY"  v-model="singlehouseinfo.nationality" placeholder-align="right" ref="nationality"></x-input>
          </group>
          <group>
            <calendar disable-future v-model="singlehouseinfo.reserve_date" title="RESERVE_DATE"  ref="reserve_date"></calendar>
          </group>
        </el-tab-pane>

        <el-tab-pane label="INTERMEDIARY INFO" name="eight">
          <group>
            <x-input label-width="10rem"  required title="ESTATE_AGENT_OFFICE"  v-model="singlehouseinfo.estate_agent_office" placeholder-align="right" ref="estate_agent_office"></x-input>
          </group>
          <group>
            <x-input label-width="10rem"  required title="ESTATE_AGENT_OFFICE_CONTACT_DETAILS"  v-model="singlehouseinfo.estate_agent_office_contact_details" placeholder-align="right" ref="estate_agent_office_contact_details"></x-input>
          </group>
          <group>
            <x-input label-width="10rem"  required title="ESTATE_AGENT_SALES_PERSON"  v-model="singlehouseinfo.estate_agent_sales_person" placeholder-align="right" ref="estate_agent_sales_person"></x-input>
          </group>
          <group>
            <x-input label-width="10rem"  required title="ESTATE_AGENT_SALES_CONTACT_DETAILS"  v-model="singlehouseinfo.estate_agent_sales_contact_details" placeholder-align="right" ref="estate_agent_sales_contact_details"></x-input>
          </group>
          <group>
            <x-input label-width="10rem"   title="PURCHASER_SOLICITOR_NAME"  v-model="singlehouseinfo.purchaser_solicitor_name" placeholder-align="right" ref="purchaser_solicitor_name"></x-input>
          </group>
          <group>
            <x-input label-width="10rem"   title="PURCHASER_SOLICITOR_TEL"  v-model="singlehouseinfo.purchaser_solicitor_tel" placeholder-align="right" ref="purchaser_solicitor_tel"></x-input>
          </group>
          <x-button type="primary" @click.native="ReserveHouse()">{{flag==0?'Reserve':'Save'}}</x-button>
        </el-tab-pane>
      </el-tabs>
    </div>
    <toast v-model="showtoast" type="text" :time="1500" :text="toast_text" position="top"  width="20em"></toast>
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

        identity_card_options: [{
          key: '0',
          value: 'use'
        }, {
          key: '1',
          value: 'nonuse'
        }],
        contract_signed_by_purchasers_options:[{
          key: '0',
          value: 'Not signed'
        },{
          key: '1',
          value: 'signed'
        }],
        contract_signed_by_vendors_options:[{
          key: '0',
          value: 'Not signed'
        },{
          key: '1',
          value: 'signed'
        }],
        project_use_options:[
          {
            key:'0',
            value:'live'
          },
          {
            key:'1',
            value:'invest'
          },
        ],
        colour_scheme_options:[
          {
            key:'0',
            value:'light'
          },{
            key:'1',
            value:'dark'
          }
        ],
        appliance_package_options:[
          {
            key:'0',
            value:'standard'
          },{
            key:'1',
            value:'premum'
          },{
            key:'2',
            value:'luxury'
          }
        ],
        deposit_type_options:[
          {
            key:'0',
            value:'direct debit'
          },{
            key:'1',
            value:'bank guarantee'
          }
        ],
        //flag：   0：预定项目   1：修改预定的项目   2：确认定金   3：确认尾款  4：创建offer 5:修改offer
        flag: undefined,
        isofferreserved:false,
        idcard2piclist:[],
        idcard1piclist:[],
        currentaccountinfo:[],

      };
    },
    mounted(){
      this.flag = this.$route.query.flag;
      this.VerifyUser();
      this.SearchHouseAllInfoByHouseId();
    },
    methods: {
      VerifyUser(){
        var res = this.requestutil.ajax('/VerifyUser', null, true, this);
        if (res.statuscode < 0)
          this.$goRoute('/login');
        let message = JSON.parse(res.message);
        this.currentaccountinfo = message;
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
      handleClick(tab, event) {
      },
      SearchHouseAllInfoByHouseId(){
        this.offerdepositpiclist=[];
        this.TabsactiveName = 'one';
        var param = {
          house_id: this.$route.query.house_id,
        }
        var res = this.requestutil.ajax('/SearchHouseAllInfoByHouseId', param, false,this);
        if(res.statuscode>=0)
          this.singlehouseinfo = JSON.parse(res.message);
        //判定当前进来的操作是offer还是非offer
        this.singlehouseinfo.house_id = this.singlehouseinfo.id;
        this.singlehouseinfo.purchaser_random!=undefined?this.isofferreserved=true:this.isofferreserved=false;
        this.singlehouseinfo.createtime = this.dateutil.timetodateymd(this.singlehouseinfo.createtime);

        let singlestatus = this.singlehouseinfo.status;
        this.singlehouseinfo.status=singlestatus==0?'AVAILABLE':singlestatus==1?'RESERVED':singlestatus==2?'SOLD':singlestatus==3?'SETTLED':singlestatus==4?'LOCKED':singlestatus==5?'OFFERED':'';
        let type = this.singlehouseinfo.type;
        this.singlehouseinfo.type=type==0?'B':'H';
        this.singlehouseinfo.sunset_date = this.dateutil.timetodateymd(this.singlehouseinfo.sunset_date)
        this.singlehouseinfo.housetypefilelist = this.singlehouseinfo.house_type_pic!=undefined&&this.singlehouseinfo.house_type_pic!=""?this.singlehouseinfo.house_type_pic.split(','):[];
        this.singlehouseinfo.property_category = this.datautil.objtostr(this.singlehouseinfo.property_category);
        this.singlehouseinfo.orientation = this.datautil.objtostr(this.singlehouseinfo.orientation);
        //通过offer来预定项目
        if(this.flag==0&&singlestatus==5){
          this.isofferreserved=true;
          this.singlehouseinfo.reserve_date = this.dateutil.nowdatetoymd();
          this.singlehouseinfo.offerpicfilelist = this.singlehouseinfo.cash_pledge_proof_pic!=undefined&&this.singlehouseinfo.cash_pledge_proof_pic!=""?this.singlehouseinfo.cash_pledge_proof_pic.split(','):[];
          if(this.singlehouseinfo.pur1_dob!=undefined&&this.singlehouseinfo.pur1_dob!=0)
            this.$set(this.singlehouseinfo,'pur1_dob',this.dateutil.timetodateymd(this.singlehouseinfo.pur1_dob))
          if(this.singlehouseinfo.pur2_dob!=undefined&&this.singlehouseinfo.pur2_dob!=0)
            this.$set(this.singlehouseinfo,'pur2_dob',this.dateutil.timetodateymd(this.singlehouseinfo.pur2_dob))
          if(this.singlehouseinfo.is_cash_pledge!=undefined)
            this.singlehouseinfo.is_cash_pledge = this.singlehouseinfo.is_cash_pledge.toString();
          if(this.singlehouseinfo.appliance_package!=undefined)
            this.singlehouseinfo.appliance_package = this.singlehouseinfo.appliance_package.toString();
          if(this.singlehouseinfo.resident_status!=undefined)
            this.singlehouseinfo.resident_status = this.singlehouseinfo.resident_status.toString();
          var param={
            account:this.currentaccountinfo.Account,
          }
          let res = this.requestutil.ajax('/SearchAccountInfoBySalesManAccount', param, false,this);
          if(res.statuscode>=0){
            let accountinfo = JSON.parse(res.message);
            this.singlehouseinfo.estate_agent_office = accountinfo.intermediary_account;
            this.singlehouseinfo.estate_agent_office_contact_details = accountinfo.intermediary_tel;
            this.singlehouseinfo.estate_agent_sales_person = accountinfo.salesman_account;
            this.singlehouseinfo.estate_agent_sales_contact_details = accountinfo.salesman_tel;
          }
        }
        //预定项目  创建offer
        if(this.flag==0||this.flag==4){
          var param={
            account:this.currentaccountinfo.Account,
          }
          let res = this.requestutil.ajax('/SearchAccountInfoBySalesManAccount', param, false,this);
          if(res.statuscode>=0){
            let accountinfo = JSON.parse(res.message);
            this.singlehouseinfo.estate_agent_office = accountinfo.intermediary_account;
            this.singlehouseinfo.estate_agent_office_contact_details = accountinfo.intermediary_tel;
            this.singlehouseinfo.estate_agent_sales_person = accountinfo.salesman_account;
            this.singlehouseinfo.estate_agent_sales_contact_details = accountinfo.salesman_tel;
          }
          this.singlehouseinfo.reserve_date = this.dateutil.nowdatetoymd();
          return ;
        }
        //修改预定的项目
        if(this.flag==1){

          //判定当前进来的操作是offer还是非offer
          this.singlehouseinfo.purchaser_random!=undefined?this.isofferreserved=true:this.isofferreserved=false;
          this.singlehouseinfo.contract_date = this.dateutil.timetodateymd(this.singlehouseinfo.contract_date)
          this.singlehouseinfo.contract_exchanged_date = this.dateutil.timetodateymd(this.singlehouseinfo.contract_exchanged_date)
          this.singlehouseinfo.reserve_date = this.dateutil.timetodateymd(this.singlehouseinfo.last_reserve_time)
          this.singlehouseinfo.unconditional_date = this.dateutil.timetodateymd(this.singlehouseinfo.unconditional_date)
          this.singlehouseinfo.pur1_dob = this.dateutil.timetodateymd(this.singlehouseinfo.pur1_dob)
          if(this.singlehouseinfo.pur2_dob!=undefined)
            this.singlehouseinfo.pur2_dob = this.dateutil.timetodateymd(this.singlehouseinfo.pur2_dob)
          if(this.singlehouseinfo.project_use!=undefined)
            this.singlehouseinfo.project_use=this.singlehouseinfo.project_use.toString();
          if(this.singlehouseinfo.colour_scheme!=undefined)
            this.singlehouseinfo.colour_scheme=this.singlehouseinfo.colour_scheme.toString();
          if(this.singlehouseinfo.appliance_package!=undefined)
            this.singlehouseinfo.appliance_package=this.singlehouseinfo.appliance_package.toString();
          if(this.singlehouseinfo.resident_status!=undefined)
          this.singlehouseinfo.resident_status=this.singlehouseinfo.resident_status.toString();
          if(this.singlehouseinfo.deposit_type!=undefined)
          this.singlehouseinfo.deposit_type=this.singlehouseinfo.deposit_type.toString();
          if(this.singlehouseinfo.contract_signed_by_vendors!=undefined)
          this.singlehouseinfo.contract_signed_by_vendors=this.singlehouseinfo.contract_signed_by_vendors.toString();
          if(this.singlehouseinfo.contract_signed_by_purchasers!=undefined)
            this.singlehouseinfo.contract_signed_by_purchasers=this.singlehouseinfo.contract_signed_by_purchasers.toString();
          this.idcard2piclist = this.uploadfileutil.pathstrtofilelist(this.singlehouseinfo.pur2_idcard_pic,this);
          this.idcard1piclist = this.uploadfileutil.pathstrtofilelist(this.singlehouseinfo.pur1_idcard_pic,this);
          return;
        }
      },
      //预定项目
      ReserveHouse(){
        /*if(this.singlehouseinfo.contract_signed_by_purchasers==undefined) {
          this.showtoastmethod('contract_signed_by_purchasers Is Invalid');
          return;
        }
        if(this.singlehouseinfo.contract_signed_by_vendors==undefined) {
          this.showtoastmethod('contract_signed_by_vendors Is Invalid');
          return;
        }
        if(this.singlehouseinfo.contract_date==undefined) {
          this.showtoastmethod('contract_date Is Invalid');
          return;
        }
        if(this.singlehouseinfo.contract_exchanged_date==undefined) {
          this.showtoastmethod('contract_exchanged_date Is Invalid');
          return;
        }

        if(this.singlehouseinfo.unconditional_date==undefined) {
          this.showtoastmethod('unconditional_date Is Invalid');
          return;
        }*/
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
        /*if(this.singlehouseinfo.project_use==undefined) {
         this.showtoastmethod('project_use Is Invalid');
         return;
         }
         if(!this.$refs.sale_price_per_contract.valid) {
         this.showtoastmethod('sale_price_per_contract Is Invalid');
         return;
         }
         if(this.singlehouseinfo.colour_scheme==undefined) {
         this.showtoastmethod('colour_scheme Is Invalid');
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
         if(!this.$refs.deposit_required_per_contract.valid) {
         this.showtoastmethod('deposit_required_per_contract Is Invalid');
         return;
         }
         if(this.singlehouseinfo.deposit_type==undefined) {
         this.showtoastmethod('deposit_type Is Invalid');
         return;
         }
         if(this.singlehouseinfo.resident_status==undefined) {
         this.showtoastmethod('resident_status Is Invalid');
         return;
         }
         if(!this.$refs.nationality.valid) {
         this.showtoastmethod('nationality Is Invalid');
         return;
         }*/
        if(!this.$refs.estate_agent_office.valid) {
          this.showtoastmethod('estate_agent_office Is Invalid');
          return;
        }
        if(!this.$refs.estate_agent_office_contact_details.valid) {
          this.showtoastmethod('estate_agent_office_contact_details Is Invalid');
          return;
        }
        if(!this.$refs.estate_agent_sales_person.valid) {
          this.showtoastmethod('estate_agent_sales_person Is Invalid');
          return;
        }
        if(!this.$refs.estate_agent_sales_contact_details.valid) {
          this.showtoastmethod('estate_agent_sales_contact_details Is Invalid');
          return;
        }
        /*if(!this.$refs.purchaser_solicitor_name.valid) {
          this.showtoastmethod('purchaser_solicitor_name Is Invalid');
          return;
        }
        if(!this.$refs.purchaser_solicitor_tel.valid) {
          this.showtoastmethod('purchaser_solicitor_tel Is Invalid');
          return;
        }*/
        if(this.singlehouseinfo.reserve_date==undefined) {
          this.showtoastmethod('reserve_date Is Invalid');
          return;
        }
        this.singlehouseinfo.contract_date = this.dateutil.ymddatestrtotime(this.singlehouseinfo.contract_date);
        this.singlehouseinfo.contract_exchanged_date = this.dateutil.ymddatestrtotime(this.singlehouseinfo.contract_exchanged_date);
        this.singlehouseinfo.unconditional_date = this.dateutil.ymddatestrtotime(this.singlehouseinfo.unconditional_date);
        this.singlehouseinfo.pur1_dob = this.dateutil.ymddatestrtotime(this.singlehouseinfo.pur1_dob);
        this.singlehouseinfo.pur2_dob = this.dateutil.ymddatestrtotime(this.singlehouseinfo.pur2_dob);
        this.singlehouseinfo.last_reserve_time = this.dateutil.ymddatestrtotime(this.singlehouseinfo.reserve_date);
        this.singlehouseinfo.pur1_idcard_pic = this.uploadfileutil.filelisttopathstr(this.idcard1piclist);
        this.singlehouseinfo.pur2_idcard_pic = this.uploadfileutil.filelisttopathstr(this.idcard2piclist);
        var res ;
        if(this.flag==0&&this.isofferreserved){
          res = this.requestutil.ajax('/OfferReserveHouse', this.singlehouseinfo, true, this);
        }else if(this.flag==0){
          res = this.requestutil.ajax('/ReserveHouse', this.singlehouseinfo, true, this);
        }
        if(this.flag==1&&this.isofferreserved){
          res = this.requestutil.ajax('/EditOfferReserveHouse', this.singlehouseinfo, true, this);
        }else if(this.flag==1){
          res = this.requestutil.ajax('/EditReserveHouse', this.singlehouseinfo, true, this);
        }
        if(res.statuscode>=0){
          this.singlehouseinfo = {};
          this.isofferreserved=false;
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
