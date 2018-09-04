<template>
  <div class="Mhousepage">
    <divider v-show="shownomoredata">There is no more data.</divider>
    <FormPreview class="empty-element"></FormPreview>
    <div class="vux-form-preview weui-form-preview"  v-for="item in singleHouseOfferlist">
      <div class="weui-form-preview__hd"><label class="weui-form-preview__label">LOT NO</label> <em
        class="weui-form-preview__value">{{item.lot_NO}}</em></div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item"><label class="weui-form-preview__label">PUR1_NAME</label> <span
          class="weui-form-preview__value">{{item.pur1_name}}</span></div>
        <div class="weui-form-preview__item"><label class="weui-form-preview__label">DEPOSIT HAS BEEN PAID</label> <span
          class="weui-form-preview__value">{{item.is_cash_pledge==0?'yes':'no'}}</span></div>
        <div class="weui-form-preview__item"><label class="weui-form-preview__label">PUR1_EMAIL</label> <span
          class="weui-form-preview__value">{{item.pur1_email}}</span></div>
        <div class="weui-form-preview__item"><label class="weui-form-preview__label">OFFER PRICE</label> <span
          class="weui-form-preview__value">{{item.offer_price}}</span></div>
      </div>
      <div class="weui-form-preview__ft">
        <a  href="javascript:" class="weui-form-preview__btn weui-form-preview__btn_primary" style="color: #000"  @click="$goRoute('/Mhome/Mhouse/Mofferlist/Mofferview',{house_id:item.house_id,purchaser_random:item.purchaser_random});">
          <i class="iconfont icon-chakan"></i>
          <p>View</p>
        </a>
        <a href="javascript:" class="weui-form-preview__btn weui-form-preview__btn_primary" @click="$goRoute('/Mhome/Mhouse/Mcreateeditoffer',{house_id:item.house_id,flag:5,purchaser_random:item.purchaser_random});">
          <i class="iconfont iconfont icon-edit" style="color: #faae74;"></i>
          <p style="color: #faae74;">Edit Reserve</p>
        </a>
      </div>
    </div>
    <toast v-model="showtoast" type="text" :time="1500" :text="toast_text" position="top"></toast>
  </div>
</template>


<script>
  import { Sticky, Divider, XButton, Swiper, SwiperItem,FormPreview,Scroller } from 'vux'
  export default {
    components: {
      Sticky,
      Divider,
      XButton,
      Swiper,
      SwiperItem,
      FormPreview,
      Scroller,
      singleHouseOfferlist:[],
    },
    data () {
      return {
        toast_text: '',
        showtoast: false,
        conditionparam:{
          allstatus:'0,1,3,5'
        },
        singleHouseOfferlist:[],
        shownomoredata:false,
      }
    },
    mounted(){
      this.VerifyUser();
      this.SearchOfferList();
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
      SearchOfferList(){
        var param = {
          house_id:this.$route.query.house_id,
          skip:0,
          count:9999,
        }
        let res = this.requestutil.ajax('/SearchOfferList',param,false,this);
        if(res.statuscode>=0&&res.message.length!=0)
          this.singleHouseOfferlist = res.message;
        else
          this.shownomoredata = true;
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
