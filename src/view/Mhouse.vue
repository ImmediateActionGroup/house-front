<template>
  <div class="Mhousepage">
      <form-preview class="empty-element"></form-preview>
        <scroller lock-x  height="40rem" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" >
          <div class="box1" style="padding-bottom: 19rem">
            <divider>Condition</divider>
            <flexbox>
              <flexbox-item>
                <x-input placeholder="Project Name" novalidate v-model="conditionparam.name" :show-clear="false"></x-input>
              </flexbox-item>
              <flexbox-item>
                <x-input placeholder="Project Address" novalidate v-model="conditionparam.address" :show-clear="false" ></x-input>
              </flexbox-item>
            </flexbox>
            <flexbox>
              <flexbox-item>
                <x-input placeholder="Low Sales Price" novalidate v-model="conditionparam.low_sales_price" :show-clear="false"></x-input>
              </flexbox-item>
              <flexbox-item>
                <x-input placeholder="High Sales Price" novalidate v-model="conditionparam.high_sales_price" :show-clear="false" ></x-input>
              </flexbox-item>
            </flexbox>
            <flexbox>
              <flexbox-item>
                <x-input placeholder="Lot NO" novalidate  v-model="conditionparam.lot_NO" :show-clear="false"></x-input>
              </flexbox-item>
              <flexbox-item>
                <popup-radio title="Status" :options="status_options"  v-model="conditionparam.status"></popup-radio>
              </flexbox-item>
            </flexbox>
            <flexbox>
              <flexbox-item style="padding: 0 0.5rem">
                <x-button  type="primary" @click.native="SearchHouseAllInfoList(true)">Search</x-button>
              </flexbox-item>
            </flexbox>
              <div class="vux-form-preview weui-form-preview" v-for="item in datalist">
                <div class="weui-form-preview__hd"><label class="weui-form-preview__label">LOT NO</label> <em
                  class="weui-form-preview__value">{{item.lot_NO}}</em></div>
                <div class="weui-form-preview__bd">
                  <div class="weui-form-preview__item"><label class="weui-form-preview__label">PROJECT NAME</label> <span
                    class="weui-form-preview__value">{{item.name}}</span></div>
                  <div class="weui-form-preview__item"><label class="weui-form-preview__label">PROJECT ADDRESS</label> <span
                    class="weui-form-preview__value">{{item.address}}</span></div>
                  <div class="weui-form-preview__item"><label class="weui-form-preview__label">LOT SIZE</label> <span
                    class="weui-form-preview__value">{{item.lot_size}}</span></div>
                  <div class="weui-form-preview__item"><label class="weui-form-preview__label">SALES PRICE</label> <span
                    class="weui-form-preview__value">{{item.sales_price}}</span></div>
                  <div class="weui-form-preview__item"><label class="weui-form-preview__label">STATUS</label> <span
                    class="weui-form-preview__value">{{ item.status==0?'AVAILABLE':item.status==1?'RESERVED':item.status==2?'SOLD':item.status==3?'SETTLED':item.status==4?'LOCKED':item.status==5?'OFFERED':''}}</span></div>
                </div>
                <div class="weui-form-preview__ft">
                  <a  href="javascript:" class="weui-form-preview__btn weui-form-preview__btn_primary" style="color: #000"  @click="$goRoute('/Mhome/Mhouse/Mhouseview',{house_id:item.id});">
                    <i class="iconfont icon-chakan"></i>
                    <p>View</p></a>
                  <a v-if="item.status==0||item.status==5" href="javascript:" class="weui-form-preview__btn weui-form-preview__btn_primary" @click="$goRoute('/Mhome/Mhouse/Mreservehouse',{house_id:item.id,flag:0});">
                    <i class="iconfont icon-chenggong" style="color: #1ad300;"></i>
                    <p style="color: #1ad300;">Reserve House</p>
                  </a>
                  <a v-if="item.status==1" href="javascript:" class="weui-form-preview__btn weui-form-preview__btn_primary" @click="currentreleasehouseid=item.id,showreleasedialog=true">
                    <i class="iconfont icon-shibai" style="color: #fa2f1e;"></i>
                    <p style="color: #fa2f1e;">Release House</p>
                  </a>
                  <a v-if="item.status==1" href="javascript:" class="weui-form-preview__btn weui-form-preview__btn_primary" @click="$goRoute('/Mhome/Mhouse/Mreservehouse',{house_id:item.id,flag:1});">
                    <i class="iconfont iconfont icon-edit" style="color: #faae74;"></i>
                    <p style="color: #faae74;">Edit Reserve</p>
                  </a>
                  <!--预定前创建的offer-->
                  <a v-if="item.status==0" href="javascript:" class="weui-form-preview__btn weui-form-preview__btn_primary" style="color: #fa9427;"  @click="$goRoute('/Mhome/Mhouse/Mcreateeditoffer',{house_id:item.id,purchaser_random:item.purchaser_random,flag:4});">
                    <i class="iconfont icon-jilu"></i>
                    <p>Create Offer</p>
                  </a>
                  <!--预定后创建的offer-->
                  <a v-if="item.status==1" href="javascript:" class="weui-form-preview__btn weui-form-preview__btn_primary" style="color: #fa9427;"  @click="$goRoute('/Mhome/Mhouse/Mcreateeditoffer',{house_id:item.id,purchaser_random:item.purchaser_random,flag:6});">
                    <i class="iconfont icon-jilu"></i>
                    <p>Create Offer</p>
                  </a>
                  <a v-if="item.status==0||item.status==1" href="javascript:" class="weui-form-preview__btn weui-form-preview__btn_primary" style="color: #656565;" @click="$goRoute('/Mhome/Mhouse/Mofferlist',{house_id:item.id});">
                    <i class="iconfont icon-fangdajing1"></i>
                    <p>Look Offer</p>
                  </a>
                  <a href="javascript:" class="weui-form-preview__btn weui-form-preview__btn_primary" style="color: #7ED321;">
                    <i class="iconfont icon-dingwei"></i>
                    <p>Map</p>
                  </a>
                </div>
              </div>
            <divider v-show="shownomoredata">There is no more data.</divider>
            <load-more v-show="onFetching" tip="loading"></load-more>
          </div>
        </scroller>
      <toast v-model="showtoast" type="text" :time="1500" :text="toast_text" position="top"></toast>
      <div v-transfer-dom>
        <confirm
          v-model="showreleasedialog"
          show-input
          ref="releasehousedialog"
          title="are you sure release house?"
          @on-confirm="releasehouse">
        </confirm>
      </div>
  </div>
</template>


<script>
  import {PopupRadio,Flexbox, FlexboxItem,XInput,Confirm,LoadMore,Loading, Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem,FormPreview,Scroller } from 'vux'
  export default {
    components: {
      PopupRadio,
      Flexbox,
      FlexboxItem,
      XInput,
      Confirm,
      LoadMore,
      Loading,
      Tab,
      TabItem,
      Sticky,
      Divider,
      XButton,
      Swiper,
      SwiperItem,
      FormPreview,
      Scroller,
    },
    data () {
      return {
        currentreleasehouseid:'',
        showreleasedialog:false,
        toast_text: '',
        showtoast: false,
        datacount:0,
        onFetching:false,
        conditionparam:{
          allstatus:'0,1,3,5',
          count:10,
        },
        datalist:[],
        shownomoredata:false,
        status_options:[
          {
            value: 'ALLSTATUS',
            key: '0,1,3,5'
          },{
            value: 'AVAILABLE',
            key: '0'
          }, {
            value: 'RESERVED',
            key: '1'
          }, {
            value: 'SETTLED',
            key: '3'
          }, {
            value: 'OFFERED',
            key: '5'
          }
        ],

      }
    },
    mounted(){

      this.VerifyUser();
      this.SearchHouseAllInfoList();

    },
    metaInfo: {
      /*title: 'Management System',
      titleTemplate: '%s - by vue-meta',*/
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
      onItemClick (index) {
        console.log('on item click:', index)
      },
      onScrollBottom () {
          //正在刷新或者没有更多数据不做任何操作
        if (this.onFetching||this.shownomoredata) {
        } else {
          this.onFetching = true

          setTimeout(() => {
            this.SearchHouseAllInfoList();
            this.onFetching = false
          }, 1000)
        }
      },
      showtoastmethod(text){
        this.showtoast = true;
        this.toast_text = text;
      },
      SearchHouseAllInfoList (issearch) {
        //如果是点击Search进入  直接重置数据
        if(issearch){
          this.datacount=0;
          this.datalist=[];
          this.shownomoredata = false;
        }

        if (this.conditionparam.status != undefined) {
          this.conditionparam.statuss = this.conditionparam.status;
        } else {
          this.conditionparam.statuss = this.conditionparam.allstatus;
        }

        //计算跳过多少行
        this.conditionparam.skip = this.datacount;
        var res = this.requestutil.ajax('/SearchHouseAllInfoList', this.conditionparam, false,this);
        if (res.statuscode >= 0) {
          var message = JSON.parse(res.message);
          if(message.datalist.length!=0){
            this.datalist = this.datalist.concat(message.datalist);
            console.log(this.datalist);
          }else
              this.shownomoredata = true;     //没有更多数据了
          this.datacount = this.datacount+this.conditionparam.count;
        }else if (res.statuscode < 0) {
          this.datalist = [];
        }
      },
      releasehouse (value) {
        this.$refs.releasehousedialog.setInputValue('');
        var param = {
          house_id: this.currentreleasehouseid,
          description: value
        };
        var res = this.requestutil.ajax('/ReleaseHouse', param, true, this);
        if (res.statuscode >=0) {
          this.shownomoredata = false;
          this.datacount = 0;
          this.datalist = [];
          this.SearchHouseAllInfoList();
        }
      },
    }
  }
</script>


<style>
  @import '../assets/iconfont/iconfont.css';

  .Mhousepage a.weui-form-preview__btn{
    text-decoration: none;
  }
  .Mhousepage a.weui-form-preview__btn i{
    font-size: 1.5rem;
  }
  .Mhousepage a.weui-form-preview__btn p{
    margin: 0rem;
    line-height: 1.3rem;
    font-size: 1rem;
  }
  .empty-element{
    height: 0px;
    width: 0px;
    margin: 0px;
    padding: 0px;
    border: 0px;
  }


</style>
