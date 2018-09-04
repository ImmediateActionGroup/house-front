<template>
  <div class="housepage">
    <div class="search-condition">
      <el-form v-show="showconditiondiv" :inline="true" :model="conditionparam" class="demo-form-inline">
        <el-form-item>
          <el-select  class="D0E8F2-input" v-model="conditionparam.name" v-if="showcondition.name"  placeholder="PROJECT NAME">
            <el-option>All Project</el-option>
            <el-option
              v-for="item in projectidandnamearray"
              :key="item.name"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input  class="EFF2CF-input" v-model="conditionparam.address" v-if="showcondition.address" placeholder="PROJECT ADDRESS"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input  class="F4EAD5-input" v-model="conditionparam.low_sales_price" v-if="showcondition.low_sales_price" placeholder="LOW SALES PRICE"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input  class="FBF0EC-input" v-model="conditionparam.high_sales_price" v-if="showcondition.high_sales_price" placeholder="HIGH SALES PRICE"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input  class="ECF0F8-input" v-model="conditionparam.lot_NO"  v-if="showcondition.lot_NO" placeholder="LOT NO"></el-input>
        </el-form-item>
        <el-form-item >
          <el-select  class="F4EAD5-input" v-model="conditionparam.status"  v-if="showcondition.status" placeholder="STATUS">
            <el-option
              v-for="item in statusoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="handle-button" v-show="showconditiondiv">
      <el-button size="small" type="primary" @click="showcreatehousedialog=true,SearchProjectInfoIdAndName()" v-if="showCreateHouse"  icon="el-icon-plus">Create House</el-button>
      <el-button size="small" type="primary" icon="el-icon-search" @click="SearchHouseAllInfoList(1)">Search</el-button>
    </div>
    <div class="data-table">
      <el-table
        stripe
        :data="datalist"
        :header-cell-class-name="tableheaderClassName"
        :cell-class-name="tableClassName"
        border
        style="
            width: 100%;
            font-size: 11px;
            font-family:Helvetica;
          ">
        <el-table-column
          label="View"
          width="70"
        >
          <!--View视图-->
          <template slot-scope="scope">
            <i title="View"  class="iconfont icon-chakan" @click="showhouseviewdialog=true,SearchHouseAllInfoByHouseId(scope.row.id)" style="color: #000;cursor: pointer"></i>
          </template>
        </el-table-column>
        <el-table-column
          label="Lock"
          width="60"
          v-if="showLockHouse"
        >
          <template slot-scope="scope">
            <!--锁定房子-->
            <i title="Lock Project"  @click="showLockHouseDialog = true,showdata='Are you sure Lock Project?',currentlockid=scope.row.id,currentislock=0" v-if="scope.row.status!=4&&scope.row.status!=3" class="iconfont icon-suo" style="color: #2C75B8;cursor: pointer"></i>
            <!--解锁房子-->
            <i title="Unlock Project"  @click="showLockHouseDialog = true,showdata='Are you sure Unlock Project?',currentlockid=scope.row.id,currentislock=1" v-if="scope.row.status==4" class="iconfont icon-jiesuo" style="color: #BBBBBB;cursor: pointer"></i>
          </template>
        </el-table-column>


        <el-table-column
          :label="ReserveReleaseTitle"
          width="90"
          v-if="showreserverelease">
          <template slot-scope="scope">
            <!--预定-->
            <i title="Reserve Project"  v-if="(scope.row.status==0||scope.row.status==5)&&currentaccountinfo.AccountType==2" @click="reservetitle='Reserve House',reserveoreditreservehouseflag=0,showreservedialog(scope.row.id,0,scope.row.purchaser_random)" class="iconfont icon-chenggong" style="color: #1ad300;cursor: pointer"></i>
            <!--释放-->
            <i title="Release Project" v-if="scope.row.status==1&&isshowreleasehouseicon(scope.row.last_reserve_account)" @click="showreleasehousedialog=true,currentreleasehouseid=scope.row.id" class="iconfont icon-shibai" style="color: #fa2f1e;cursor: pointer"></i>
          </template>
        </el-table-column>
        <el-table-column
          label="Edit Reserve"
          width="80"
          v-if="showeditreserve">
          <!--修改预定信息-->
          <template slot-scope="scope">
            <i title="Edit Reserve Info" v-if="scope.row.status==1&&currentaccountinfo.Account==scope.row.last_reserve_account" @click="reservetitle='Edit Reserve House',reserveoreditreservehouseflag=1,showreservedialog(scope.row.id,1,scope.row.purchaser_random)" class="iconfont icon-jilu" style="color: #faae74;cursor: pointer"></i>
          </template>
        </el-table-column>
        <el-table-column
          label="Create Offer"
          width="90"
          v-if="showcreateoffer">
          <!--创建offer-->
          <template slot-scope="scope">
            <!--当状态为可预订时显示-->
            <i title="Create Offer" v-if="scope.row.status==0" @click="showCreateEditOffer(scope.row.id,4)" class="iconfont icon-jilu" style="color: #425dfa;cursor: pointer"></i>
            <!--当状态为已预订时显示-->
            <i title="Create Offer" v-if="scope.row.status==1" @click="showCreateEditOffer(scope.row.id,6)" class="iconfont icon-jilu" style="color: #425dfa;cursor: pointer"></i>
          </template>
        </el-table-column>
        <el-table-column
          label="Look Offer"
          width="70"
          v-if="showlookoffer">
          <!--查看我的offer列表-->
          <template slot-scope="scope">
            <i title="Look My Create Offer" v-if="scope.row.status==0||scope.row.status==1" @click="showSingleHouseAllOffer(scope.row.id)" class="iconfont icon-fangdajing1" style="color: #656565;cursor: pointer"></i>
          </template>
        </el-table-column>

        <el-table-column
          label="Deposit"
          width="80"
          v-if="showdeposit"
        >
          <!--确认定金-->
          <template slot-scope="scope" v-if="scope.row.status==1">
            <i title="Confirm Deposit"  class="iconfont icon-dingjin" @click="showConfirmDepositorbalancepayment(scope.row.id,2,scope.row.purchaser_random)" style="color: #d3be3a;cursor: pointer"></i>
          </template>
        </el-table-column>
        <el-table-column
          label="Final Payment"
          width="120"
          v-if="showfinalpayment">
          <!--确认尾款-->
          <template slot-scope="scope" v-if="scope.row.status==2">
            <i title="Confirm Finalpayment" @click="showConfirmDepositorbalancepayment(scope.row.id,3,scope.row.purchaser_random)" class="iconfont icon-weikuan" style="color: #d3be3a;cursor: pointer"></i>
          </template>
        </el-table-column>
        <el-table-column
          label="Map"
          width="60">
          <template slot-scope="scope">
            <i title="Map" class="iconfont icon-dingwei" @click="openmap(scope.row.project_id)"  style="color: #7ED321;cursor: pointer"></i>
          </template>
        </el-table-column>

        <el-table-column
          label="Edit"
          width="60"
          v-if="showEditHouse">
          <template slot-scope="scope">
            <i title="Edit House" class="iconfont icon-edit" @click="showedithousedialog=true,SearchHouseByidUseEdit(scope.row.id)" style="color: #997D45;cursor: pointer"></i>
          </template>
        </el-table-column>
        <el-table-column
          prop="lot_NO"
          label="LOT NO">
        </el-table-column>
        <el-table-column
          prop="name"
          label="PROJECT NAME"
        >
        </el-table-column>
        <el-table-column
          prop="bed"
          label="BED">
        </el-table-column>
        <el-table-column
          prop="bath"
          label="BATH">
        </el-table-column>
        <el-table-column
          prop="study"
          label="STUDY">
        </el-table-column>
        <el-table-column
          prop="carpark"
          label="CARPARK">
        </el-table-column>
        <el-table-column
          prop="total_area"
          label="TOTAL AREA(INTERNAL APPROX+BALCONY)">
        </el-table-column>
        <el-table-column
          prop="sales_price"
          label="SALES PRICE">
          <template slot-scope="scope">
            <span>{{ scope.row.sales_price}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="Status">
          <template slot-scope="scope">
            <span>{{ scope.row.status==0?'AVAILABLE':scope.row.status==1?'RESERVED':scope.row.status==2?'SOLD':scope.row.status==3?'SETTLED':scope.row.status==4?'LOCKED':scope.row.status==5?'OFFERED':''}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="last_editstatus_time"
          label="LAST EDITSTATUS TIME">
        </el-table-column>
      </el-table>
    </div>
    <div style="height: 40px">
      <el-pagination
        layout="prev, pager, next"
        :total=totalcount
        :current-page.sync="currentpage"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
    <!--锁定项目-->
    <el-dialog title="Tips" class="lockproject-dialog" :visible.sync="showLockHouseDialog" height="15%">
      <span>{{showdata}}</span>
      <div slot="footer" class="dialog-footer">
        <span class="el-dialog__footer-btn" @click="LockUnlockHouse()">Yes</span>
        <span class="el-dialog__footer-btn" @click="showLockHouseDialog = false">No</span>
      </div>
    </el-dialog>
    <!--创建项目-->
    <el-dialog @close="closedialog('createhouseformref')"  class="form-dialog createproject-dialog" title="Create House" :visible.sync="showcreatehousedialog">
      <el-form :model="createhouseformdata" ref="createhouseformref" label-width="200px">
        <el-tabs  style="height: 400px;" tab-position="left" v-model="TabsactiveName" >
          <!--项目基础信息-->
          <el-tab-pane label="HOUSE INFO" name="one">
            <el-form-item
              label="PROJECT NAME"
              prop="project_id"
              :rules="[
                  { required: true, message: 'The project_id cannot be empty.', trigger: 'blur' },
                ]"
            >
              <el-select  class="F4EAD5-input" v-model="createhouseformdata.project_id" placeholder="PROJECT NAME">
                <el-option
                  v-for="item in projectidandnamearray"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="LOT_NO"
              prop="lot_NO"
              :rules="[
                  { required: true, message: 'The lot_NO cannot be empty.', trigger: 'blur' },
                ]"
            >
              <el-input class="EFF2CF-input" placeholder="LOT_NO" v-model="createhouseformdata.lot_NO" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="LOT_SIZE"
              prop="lot_size"
              :rules="[
                  { required: true, message: 'The lot_size cannot be empty.', trigger: 'blur' },
                ]"
            >
              <el-input-number  class="F4EAD5-input" placeholder="PROJECT ADDRESS" v-model="createhouseformdata.lot_size" auto-complete="off"></el-input-number>
            </el-form-item>

            <el-form-item
              label="TYPE"
              prop="type"
              :rules="[
                  { required: true, message: 'The type cannot be empty.', trigger: 'change' },
                ]"
            >
              <el-select class="EFF2CF-input" v-model="createhouseformdata.type" placeholder="TYPE">
                <el-option label="B" value=0></el-option>
                <el-option label="H" value=1></el-option>
              </el-select>
            </el-form-item>
            <el-form-item   label="STATUS">
              <el-select :disabled="true" class="FBF0EC-input" v-model="createhouseformdata.status" placeholder="STATUS">
                <el-option label="AVALIBLE" value="0" checked></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="SALES PRICE"
              prop="sales_price"
              :rules="[
                  { required: true, message: 'The sales price cannot be empty.', trigger: 'blur,change' },
                ]"
            >
              <el-input-number class="EFF2CF-input" :min="0"  placeholder="SALES PRICE" v-model="createhouseformdata.sales_price" auto-complete="off"></el-input-number>
            </el-form-item>

            <el-form-item
              label="VERSION CONTRACT"
              prop="version_contract"
              :rules="[
                  { required: true, message: 'The version contract cannot be empty.', trigger: 'blur' },
                ]"
            >
              <el-input class="D0E8F2-input" placeholder="VERSION CONTRACT" v-model="createhouseformdata.version_contract" auto-complete="off"></el-input>
            </el-form-item>


          <el-form-item
            label="LEVEL"
            prop="level"
            :rules="[
                { required: true, message: 'The level cannot be empty.', trigger: 'blur,change' },
              ]"
          >
            <el-input-number class="EFF2CF-input" :min="0" placeholder="LEVEL" v-model="createhouseformdata.level" auto-complete="off"></el-input-number>
          </el-form-item>
          <el-form-item
            label="BED"
            prop="bed"
            :rules="[
                { required: true, message: 'The bed cannot be empty.', trigger: 'blur,change' },
              ]"
          >
            <el-input-number class="D0E8F2-input" :min="0" placeholder="BED" v-model="createhouseformdata.bed" auto-complete="off"></el-input-number>
          </el-form-item>
          <el-form-item
            label="BATH"
            prop="bath"
            :rules="[
                { required: true, message: 'The bath cannot be empty.', trigger: 'blur,change' },
              ]"
          >
            <el-input-number class="EFF2CF-input" :min="0" placeholder="BATH" v-model="createhouseformdata.bath" auto-complete="off"></el-input-number>
          </el-form-item>
          <el-form-item
            label="STUDY"
            prop="study"
            :rules="[
              { required: true, message: 'The study cannot be empty.', trigger: 'blur,change' },
            ]"
          >
            <el-input-number class="F4EAD5-input" :min="0" placeholder="STUDY" v-model="createhouseformdata.study" auto-complete="off"></el-input-number>
          </el-form-item>
          <el-form-item
            label="CARPARK"
            prop="carpark"
            :rules="[
            { required: true, message: 'The carpark cannot be empty.', trigger: 'blur,change' },
          ]"
          >
            <el-input-number class="D0E8F2-input" :min="0" placeholder="carpark" v-model="createhouseformdata.carpark" auto-complete="off"></el-input-number>
          </el-form-item>
          <el-form-item
            label="ORIENTATION"
            prop="orientation"
            :rules="[
                { required: true, message: 'The orientation cannot be empty.', trigger: 'change' },
              ]"
          >
            <el-select class="FBF0EC-input" v-model="createhouseformdata.orientation" placeholder="ORIENTATION">
              <el-option label="E" value=0></el-option>
              <el-option label="N" value=1></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="INTERNAL APPROX"
            prop="internal_approx"
            :rules="[
                { required: true, message: 'The internal approx cannot be empty.', trigger: 'blur,change' },
              ]"
          >
            <el-input-number class="ECF0F8-input" :min="0" placeholder="INTERNAL APPROX" v-model="createhouseformdata.internal_approx" auto-complete="off" @change="CreateHouseCalculateTotalArea()"></el-input-number>
          </el-form-item>
          <el-form-item
            label="BALCONY"
            prop="balcony"
            :rules="[
                { required: true, message: 'The balcony cannot be empty.', trigger: 'blur,change' },
              ]"
          >
            <el-input-number class="D0E8F2-input" :min="0" placeholder="BALCONY" v-model="createhouseformdata.balcony" auto-complete="off"  @change="CreateHouseCalculateTotalArea()"></el-input-number>
          </el-form-item>
          <el-form-item
            label="TOTAL AREA"
            prop="total_area"
            :rules="[
                { required: true, message: 'The total area cannot be empty.', trigger: 'blur,change' },
              ]"
          >
            <el-input-number class="F4EAD5-input" :disabled="true" :min="0" placeholder="TOTAL AREA" v-model="createhouseformdata.total_area" auto-complete="off"></el-input-number>
          </el-form-item>
          <el-form-item
            label="BODY CORP 1ST YEAR"
            prop="body_corp_1st_year"
            :rules="[
                { required: true, message: 'The body corp 1st year cannot be empty.', trigger: 'blur,change' },
              ]"
          >
            <el-input-number class="ECF0F8-input" :min="0" placeholder="BODY CORP 1ST YEAR" v-model="createhouseformdata.body_corp_1st_year" auto-complete="off"></el-input-number>
          </el-form-item>
          <el-form-item
            label="BODY CORP 2ST YEAR"
            prop="body_corp_2st_year"
            :rules="[
                { required: true, message: 'The body corp 2st year cannot be empty.', trigger: 'blur,change' },
              ]"
          >
            <el-input-number class="F4EAD5-input" :min="0" placeholder="BODY CORP 2ST YEAR" v-model="createhouseformdata.body_corp_2st_year" auto-complete="off"></el-input-number>
          </el-form-item>
          <el-form-item
            label="PROPERTY CATEGORY"
            prop="property_category"
            :rules="[
                { required: true, message: 'The property category cannot be empty.', trigger: 'change' },
              ]"
          >
            <el-select class="FBF0EC-input" v-model="createhouseformdata.property_category" placeholder="PROPERTY CATEGORY">
              <el-option label="Apartment" value=0></el-option>
              <el-option label="Townhouse" value=1></el-option>
              <el-option label="House" value=2></el-option>
              <el-option label="House and land package" value=3></el-option>
            </el-select>
          </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="HOUSE TYPE PICTURE" name="two">
            <el-form-item>
              <el-upload
                :action=$store.state.serveruploadpicsrc
                :on-success="uploadsuccess"
                list-type="picture-card"
                :file-list="housetypepiclist"
                :with-credentials="true"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
        <el-form-item  class="form-dialog-footer">
          <span class="el-dialog__footer-btn" @click="createhouseformdata={}">Reset</span>
          <span class="el-dialog__footer-btn" @click="CreateHouseInfo('createhouseformref')">Save</span>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--修改项目-->
    <el-dialog @close="closedialog('edithouseformref')"   class="form-dialog editproject-dialog" title="Edit House" :visible.sync="showedithousedialog">
      <el-form :model="edithouseformdata" ref="edithouseformref" label-width="200px">
          <el-tabs  style="height: 400px;" tab-position="left" v-model="TabsactiveName" >
            <!--项目基础信息-->
            <el-tab-pane label="HOUSE INFO" name="one">
              <el-form-item
                label="PROJECT NAME"
                prop="project_id"
                :rules="[
                  { required: true, message: 'The project_id cannot be empty.', trigger: 'blur' },
                ]"
              >
                <el-select  class="F4EAD5-input" v-model="edithouseformdata.project_id" placeholder="PROJECT NAME">
                  <el-option
                    v-for="item in projectidandnamearray"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="LOT_NO"
                prop="lot_NO"
                :rules="[
                  { required: true, message: 'The lot_NO cannot be empty.', trigger: 'blur' },
                ]"
              >
                <el-input class="EFF2CF-input" placeholder="LOT_NO" v-model="edithouseformdata.lot_NO" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item
                label="LOT_SIZE"
                prop="lot_size"
                :rules="[
                  { required: true, message: 'The lot_size cannot be empty.', trigger: 'blur' },
                ]"
              >
                <el-input-number  class="F4EAD5-input" placeholder="PROJECT ADDRESS" v-model="edithouseformdata.lot_size" auto-complete="off"></el-input-number>
              </el-form-item>

              <el-form-item
                label="TYPE"
                prop="type"
                :rules="[
                  { required: true, message: 'The type cannot be empty.', trigger: 'change' },
                ]"
              >
                <el-select class="EFF2CF-input" v-model="edithouseformdata.type" placeholder="TYPE">
                  <el-option label="B" value=0></el-option>
                  <el-option label="H" value=1></el-option>
                </el-select>
              </el-form-item>
              <el-form-item   label="STATUS">
                <el-select :disabled="true" class="FBF0EC-input" v-model="edithouseformdata.status" placeholder="STATUS">
                  <el-option label="AVALIBLE" value="0" checked></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="SALES PRICE"
                prop="sales_price"
                :rules="[
                  { required: true, message: 'The sales price cannot be empty.', trigger: 'blur,change' },
                ]"
              >
                <el-input-number class="EFF2CF-input" :min="0"  placeholder="SALES PRICE" v-model="edithouseformdata.sales_price" auto-complete="off"></el-input-number>
              </el-form-item>
              <el-form-item
                label="VERSION CONTRACT"
                prop="version_contract"
                :rules="[
                  { required: true, message: 'The version contract cannot be empty.', trigger: 'blur' },
                ]"
              >
                <el-input class="D0E8F2-input" placeholder="VERSION CONTRACT" v-model="edithouseformdata.version_contract" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item
                label="LEVEL"
                prop="level"
                :rules="[
                { required: true, message: 'The level cannot be empty.', trigger: 'blur,change' },
              ]"
              >
                <el-input-number class="EFF2CF-input" :min="0" placeholder="LEVEL" v-model="edithouseformdata.level" auto-complete="off"></el-input-number>
              </el-form-item>
              <el-form-item
                label="BED"
                prop="bed"
                :rules="[
                { required: true, message: 'The bed cannot be empty.', trigger: 'blur,change' },
              ]"
              >
                <el-input-number class="D0E8F2-input" :min="0" placeholder="BED" v-model="edithouseformdata.bed" auto-complete="off"></el-input-number>
              </el-form-item>
              <el-form-item
                label="BATH"
                prop="bath"
                :rules="[
                { required: true, message: 'The bath cannot be empty.', trigger: 'blur,change' },
              ]"
              >
                <el-input-number class="EFF2CF-input" :min="0" placeholder="BATH" v-model="edithouseformdata.bath" auto-complete="off"></el-input-number>
              </el-form-item>
              <el-form-item
                label="STUDY"
                prop="study"
                :rules="[
              { required: true, message: 'The study cannot be empty.', trigger: 'blur,change' },
            ]"
              >
                <el-input-number class="F4EAD5-input" :min="0" placeholder="STUDY" v-model="edithouseformdata.study" auto-complete="off"></el-input-number>
              </el-form-item>
              <el-form-item
                label="CARPARK"
                prop="carpark"
                :rules="[
            { required: true, message: 'The carpark cannot be empty.', trigger: 'blur,change' },
          ]"
              >
                <el-input-number class="D0E8F2-input" :min="0" placeholder="carpark" v-model="edithouseformdata.carpark" auto-complete="off"></el-input-number>
              </el-form-item>
              <el-form-item
                label="ORIENTATION"
                prop="orientation"
                :rules="[
                { required: true, message: 'The orientation cannot be empty.', trigger: 'change' },
              ]"
              >
                <el-select class="FBF0EC-input" v-model="edithouseformdata.orientation" placeholder="ORIENTATION">
                  <el-option label="E" value=0></el-option>
                  <el-option label="N" value=1></el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                label="INTERNAL APPROX"
                prop="internal_approx"
                :rules="[
                { required: true, message: 'The internal approx cannot be empty.', trigger: 'blur,change' },
              ]"
              >
                <el-input-number class="ECF0F8-input" :min="0" placeholder="INTERNAL APPROX" v-model="edithouseformdata.internal_approx" auto-complete="off" @change="EditHouseCalculateTotalArea()"></el-input-number>
              </el-form-item>
              <el-form-item
                label="BALCONY"
                prop="balcony"
                :rules="[
                { required: true, message: 'The balcony cannot be empty.', trigger: 'blur,change' },
              ]"
              >
                <el-input-number class="D0E8F2-input" :min="0" placeholder="BALCONY" v-model="edithouseformdata.balcony" auto-complete="off"  @change="EditHouseCalculateTotalArea()"></el-input-number>
              </el-form-item>
              <el-form-item
                label="TOTAL AREA"
                prop="total_area"
                :rules="[
                { required: true, message: 'The total area cannot be empty.', trigger: 'blur,change' },
              ]"
              >
                <el-input-number class="F4EAD5-input" :min="0" :disabled="true" placeholder="TOTAL AREA" v-model="edithouseformdata.total_area" auto-complete="off"></el-input-number>
              </el-form-item>
              <el-form-item
                label="BODY CORP 1ST YEAR"
                prop="body_corp_1st_year"
                :rules="[
                { required: true, message: 'The body corp 1st year cannot be empty.', trigger: 'blur,change' },
              ]"
              >
                <el-input-number class="ECF0F8-input" :min="0" placeholder="BODY CORP 1ST YEAR" v-model="edithouseformdata.body_corp_1st_year" auto-complete="off"></el-input-number>
              </el-form-item>
              <el-form-item
                label="BODY CORP 2ST YEAR"
                prop="body_corp_2st_year"
                :rules="[
                { required: true, message: 'The body corp 2st year cannot be empty.', trigger: 'blur,change' },
              ]"
              >
                <el-input-number class="F4EAD5-input" :min="0" placeholder="BODY CORP 2ST YEAR" v-model="edithouseformdata.body_corp_2st_year" auto-complete="off"></el-input-number>
              </el-form-item>
              <el-form-item
                label="PROPERTY CATEGORY"
                prop="property_category"
                :rules="[
                { required: true, message: 'The property category cannot be empty.', trigger: 'change' },
              ]"
              >
                <el-select class="FBF0EC-input" v-model="edithouseformdata.property_category" placeholder="PROPERTY CATEGORY">
                  <el-option label="Apartment" value=0></el-option>
                  <el-option label="Townhouse" value=1></el-option>
                  <el-option label="House" value=2></el-option>
                  <el-option label="House and land package" value=3></el-option>
                </el-select>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="HOUSE TYPE PICTURE" name="two">
              <el-form-item>
                <el-upload
                  :action=$store.state.serveruploadpicsrc
                  :on-success="uploadsuccess"
                  :file-list="housetypepiclist"
                  list-type="picture-card"
                  :with-credentials="true"
                  :on-remove="handleRemove">
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
            </el-tab-pane>
          </el-tabs>
          <el-form-item  class="form-dialog-footer">
            <span class="el-dialog__footer-btn" @click="edithouseformdata={}">Reset</span>
            <span class="el-dialog__footer-btn" @click="EditHouseInfo('edithouseformref')">Save</span>
          </el-form-item>
      </el-form>

    </el-dialog>

    <!--Create Edit offer-->
    <el-dialog @close="closedialog('createeditofferformref')" style="width: 100%;" class="singleprojectdialog reserveproject-dialog"  :title=createeditoffertitle :visible.sync="showcreateeditofferdialog">
      <el-form :model="singlehouseinfo" ref="createeditofferformref" label-width="350px">
        <el-tabs  style="height: 400px;" tab-position="left" v-model="TabsactiveName" >
          <!--项目基础信息-->
          <el-tab-pane label="PROJECT INFO" name="one">
            <el-form-item label="ID">
              <el-input :disabled="true" class="D0E8F2-input" v-model="singlehouseinfo.id" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="NAME">
              <el-input :disabled="true" class="EFF2CF-input" v-model="singlehouseinfo.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="ADDRESS">
              <el-input :disabled="true" class="FBF0EC-input" v-model="singlehouseinfo.address" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="CREATETIME">
              <el-input :disabled="true" class="D0E8F2-input" v-model="singlehouseinfo.createtime" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="INTRO">
              <el-input :disabled="true" class="EFF2CF-input" v-model="singlehouseinfo.intro" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="CREATOR">
              <el-input :disabled="true" class="FBF0EC-input" v-model="singlehouseinfo.creator" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="SUNSET DATE">
              <el-input :disabled="true" class="EFF2CF-input" v-model="singlehouseinfo.sunset_date" auto-complete="off"></el-input>
            </el-form-item>
          </el-tab-pane>
          <!--房子基础信息-->
          <el-tab-pane label="HOUSE INFO" name="one1">
            <el-form-item label="LOT NO">
              <el-input :disabled="true" class="F4EAD5-input" v-model="singlehouseinfo.lot_NO" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="LOT SIZE">
              <el-input :disabled="true" class="FBF0EC-input" v-model="singlehouseinfo.lot_size" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="TYPE">
              <el-input :disabled="true" class="D0E8F2-input" v-model="singlehouseinfo.type" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="SALES PRICE">
              <el-input :disabled="true" class="ECF0F8-input" v-model="singlehouseinfo.sales_price" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="STATUS">
              <el-input :disabled="true" class="F4EAD5-input" v-model="singlehouseinfo.status" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="LEVEL">
              <el-input :disabled="true" class="FBF0EC-input"  placeholder="LEVEL" v-model="singlehouseinfo.level" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="BED">
              <el-input :disabled="true" class="F4EAD5-input"  placeholder="BED" v-model="singlehouseinfo.bed" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="BATH">
              <el-input :disabled="true" class="FBF0EC-input" placeholder="BATH" v-model="singlehouseinfo.bath" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="ORIENTATION">
              <el-select :disabled="true" class="EFF2CF-input" v-model="singlehouseinfo.orientation" placeholder="ORIENTATION">
                <el-option label="E" value=0></el-option>
                <el-option label="N" value=1></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="INTERNAL APPROX">
              <el-input :disabled="true" class="F4EAD5-input" :min="0" placeholder="INTERNAL APPROX" v-model="singlehouseinfo.internal_approx" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="BALCONY">
              <el-input :disabled="true" class="FBF0EC-input" placeholder="BALCONY" v-model="singlehouseinfo.balcony" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="TOTAL AREA">
              <el-input :disabled="true" class="D0E8F2-input" placeholder="TOTAL AREA" v-model="singlehouseinfo.total_area" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="BODY CORP 1ST YEAR">
              <el-input :disabled="true" class="F4EAD5-input" placeholder="BODY CORP 1ST YEAR" v-model="singlehouseinfo.body_corp_1st_year" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="BODY CORP 2ST YEAR">
              <el-input :disabled="true" class="FBF0EC-input" placeholder="BODY CORP 2ST YEAR" v-model="singlehouseinfo.body_corp_2st_year" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="PROPERTY CATEGORY">
              <el-select :disabled="true" class="EFF2CF-input" v-model="singlehouseinfo.property_category" placeholder="PROPERTY CATEGORY">
                <el-option label="Apartment" value=0></el-option>
                <el-option label="Townhouse" value=1></el-option>
                <el-option label="House" value=2></el-option>
                <el-option label="House and land package" value=3></el-option>
              </el-select>
            </el-form-item>
          </el-tab-pane>
          <!--项目户型图  走马灯-->
          <el-tab-pane label="HOUSE TYPE PICTURE" name="two">
            <el-carousel :interval="5000" arrow="always">
              <el-carousel-item v-for="item in singlehouseinfo.housetypefilelist" :key="item">
                <img style="width: auto ; height: 100%; display: block; margin: 0 auto" :src=$store.state.imgpath+item />
              </el-carousel-item>
            </el-carousel>
          </el-tab-pane>

          <!--押金凭证  走马灯-->
          <el-tab-pane v-if="singlehouseinfo.is_cash_pledge==0" label="DEPOSIT CERTIFICATE PICTURE" name="three">
            <el-carousel :interval="5000" arrow="always">
              <el-carousel-item v-for="item in singlehouseinfo.offerpicfilelist" :key="item">
                <img style="width: auto ; height: 100%; display: block; margin: 0 auto" :src=$store.state.imgpath+item />
              </el-carousel-item>
            </el-carousel>
          </el-tab-pane>

          <el-tab-pane name="four">
            <span slot="label"><i style="color: red">*</i> PURCHASER1</span>
            <el-form-item
              label="NAME"
              :rules="[
                  { required: true, message: 'The name cannot be empty.', trigger: 'blur' },
                ]"
              prop="pur1_name"
            >
              <el-input  :disabled="isofferview"  class="ECF0F8-input" placeholder="NAME" v-model="singlehouseinfo.pur1_name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="PASSPORT NO"
              :rules="[
                  { required: true, message: 'The passport no cannot be empty.', trigger: 'blur' },
                ]"
              prop="pur1_passport_NO"
            >
              <el-input :disabled="isofferview" class="F4EAD5-input" placeholder="PASSPORT NO" v-model="singlehouseinfo.pur1_passport_NO" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="ADDRESS"
              :rules="[
                  { required: true, message: 'The address cannot be empty.', trigger: 'blur' },
                ]"
              prop="pur1_address"
            >
              <el-input :disabled="isofferview" class="FBF0EC-input" placeholder="ADDRESS" v-model="singlehouseinfo.pur1_address" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="EMAIL"
              :rules="[
                  { required: true, message: 'The email cannot be empty.', trigger: 'blur' },
                  { type: 'email', message: 'Email address is invalid', trigger: ['blur'] }
                ]"
              prop="pur1_email"
            >
              <el-input :disabled="isofferview" class="EFF2CF-input" placeholder="EMAIL" v-model="singlehouseinfo.pur1_email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="TEL"
              :rules="[
                  { required: true, message: 'The tel no cannot be empty.', trigger: 'blur' },
                ]"
              prop="pur1_tel"
            >
              <el-input :disabled="isofferview" class="F4EAD5-input" placeholder="TEL" v-model="singlehouseinfo.pur1_tel" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="DOB"
              :rules="[
                  {  required: true, message: 'The dob no cannot be empty.', trigger: 'change' },
                ]"
              prop="pur1_dob"
            >
              <el-date-picker
                :disabled="isofferview"
                class="ECF0F8-input"
                v-model="singlehouseinfo.pur1_dob"
                type="date"
                placeholder="DOB"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item
              :disabled="isofferview"
              label="IDENTITY CARD"
              :rules="[
                  { required: true, message: 'The identity card no cannot be empty.', trigger: 'change' },
                ]"
              prop="pur1_identity_card"
            >
              <el-select :disabled="isofferview" class="EFF2CF-input" v-model="singlehouseinfo.pur1_identity_card" placeholder="IDENTITY CARD">
                <el-option label="use" value=0></el-option>
                <el-option label="nonuse" value=1></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="singlehouseinfo.pur1_identity_card==0">
              <el-upload
                :action=$store.state.serveruploadpicsrc
                :on-success="idcard1uploadsuccess"
                list-type="picture-card"
                :file-list="idcard1piclist"
                :with-credentials="true"
                :on-remove="idcard1handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="PURCHASER2" name="five">
            <el-form-item label="NAME">
              <el-input :disabled="isofferview" class="D0E8F2-input" placeholder="NAME" v-model="singlehouseinfo.pur2_name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="PASSPORT NO">
              <el-input :disabled="isofferview" class="EFF2CF-input" placeholder="PASSPORT NO" v-model="singlehouseinfo.pur2_passport_NO" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="ADDRESS">
              <el-input :disabled="isofferview" class="FBF0EC-input" placeholder="ADDRESS" v-model="singlehouseinfo.pur2_address" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="EMAIL"
              :rules="[
                  { type: 'email', message: 'Email address is invalid', trigger: ['blur'] }
                ]"
              prop="pur2_email"
            >
              <el-input :disabled="isofferview" class="F4EAD5-input" placeholder="EMAIL" v-model="singlehouseinfo.pur2_email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="TEL">
              <el-input :disabled="isofferview" class="D0E8F2-input" placeholder="TEL" v-model="singlehouseinfo.pur2_tel" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="DOB">
              <el-date-picker
                :disabled="isofferview"
                class="EFF2CF-input"
                v-model="singlehouseinfo.pur2_dob"
                type="date"
                placeholder="DOB">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="IDENTITY CARD">
              <el-select :disabled="isofferview" class="ECF0F8-input"  v-model="singlehouseinfo.pur2_identity_card" placeholder="IDENTITY CARD">
                <el-option label="use" value=0></el-option>
                <el-option label="nonuse" value=1></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="singlehouseinfo.pur2_identity_card==0">
              <el-upload
                :action=$store.state.serveruploadpicsrc
                :on-success="idcard2uploadsuccess"
                list-type="picture-card"
                :file-list="idcard2piclist"
                :with-credentials="true"
                :on-remove="idcard2handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-tab-pane>
          <!--其他信息-->
          <el-tab-pane name="seven">
            <span slot="label"><i style="color: red">*</i> OFFER</span>
            <el-form-item
              label="RESIDENT STATUS"
              :rules="[
                  { required: true, message: 'The resident status no cannot be empty.', trigger: 'change' },
                ]"
              prop="resident_status">
              <el-select :disabled="isofferview" class="D0E8F2-input" v-model="singlehouseinfo.resident_status" placeholder="RESIDENT STATUS">
                <el-option label="Local" value=0></el-option>
                <el-option label="FIRB" value=1></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="NATIONALITY"
              :rules="[
                  { required: true, message: 'The nationality no cannot be empty.', trigger: 'blur' },
                ]"
              prop="nationality"
            >
              <el-input :disabled="isofferview" class="FBF0EC-input" placeholder="NATIONALITY" v-model="singlehouseinfo.nationality" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="APPLIANCE PACKAGE"
              :rules="[
                  { required: true, message: 'The appliance package no cannot be empty.', trigger: 'change' },
                ]"
              prop="appliance_package"
            >
              <el-select :disabled="isofferview" class="EFF2CF-input" v-model="singlehouseinfo.appliance_package" placeholder="APPLIANCE PACKAGE">
                <el-option label="standard" value=0></el-option>
                <el-option label="premum" value=1></el-option>
                <el-option label="luxury" value=2></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="EXTRA SPECIAL CONDITIONS"
              :rules="[
                  { required: true, message: 'The extra special conditions no cannot be empty.', trigger: 'blur' },
                ]"
              prop="extra_special_conditions"
            >
              <el-input :disabled="isofferview" class="F4EAD5-input" placeholder="EXTRA SPECIAL CONDITIONS" v-model="singlehouseinfo.extra_special_conditions" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item
              label="OFFER_PRICE"
              :rules="[
                  { required: true, message: 'The offer price no cannot be empty.', trigger: 'blur' },
                ]"
              prop="offer_price"
            >
              <el-input-number :disabled="isofferview" class="F4EAD5-input" placeholder="OFFER PRICE" v-model="singlehouseinfo.offer_price" auto-complete="off"></el-input-number>
            </el-form-item>
            <el-form-item
              label="OFFER_DATE"
              :rules="[
                  {  required: true, message: 'The offer date cannot be empty.', trigger: 'change' },
                ]"
              prop="offer_date"
            >
              <el-date-picker
                :disabled="isofferview"
                class="ECF0F8-input"
                v-model="singlehouseinfo.offer_date"
                type="date"

              >
              </el-date-picker>
            </el-form-item>

            <!--预约的时候是否交了定金-->
            <el-form-item
              label="DEPOSIT HAS BEEN PAID"
              :rules="[
                  { required: true, message: 'The deposit has been paid no cannot be empty.', trigger: 'change' },
                ]"
              prop="is_cash_pledge"
            >
              <el-select :disabled="isofferview" class="EFF2CF-input" v-model="singlehouseinfo.is_cash_pledge" placeholder="DEPOSIT HAS BEEN PAID">
                <el-option label="yes" value=0></el-option>
                <el-option label="no" value=1></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="OFFER_CREATOR"
              v-if="isofferview"
            >
              <el-input :disabled="isofferview" class="ECF0F8-input" placeholder="" v-model="singlehouseinfo.offer_creator" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="OFFER_CREATOR_OF_AGENT"
              v-if="isofferview"
            >
              <el-input :disabled="isofferview" class="FBF0EC-input" placeholder="" v-model="singlehouseinfo.offer_creator_of_agent" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="singlehouseinfo.is_cash_pledge==0&&!isofferview">
              <el-upload
                :action=$store.state.serveruploadpicsrc
                :on-success="offerdeposituploadsuccess"
                list-type="picture-card"
                :with-credentials="true"
                :on-remove="offerdeposithandleRemove"
                :file-list="offerdepositpiclist"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
        <el-form-item class="form-dialog-footer" >
          <el-button v-if="createoreditofferflag==4" class="el-dialog__footer-btn" @click="singlehouseinfo={}">Reset</el-button>
          <el-button v-if="!isofferview&&currentaccountinfo.AccountType==2" class="el-dialog__footer-btn"  @click="CreateEditOffer('createeditofferformref')">Save</el-button>
          <el-button v-if="isofferview&&currentaccountinfo.Role==1&&singlehouseinfo.status=='AVAILABLE'" class="el-dialog__footer-btn"  @click="ChangeOfferedorPass(0)">Offered</el-button>
          <el-button v-if="isofferview&&currentaccountinfo.Role==1&&singlehouseinfo.status=='RESERVED'" class="el-dialog__footer-btn"  @click="ChangeOfferedorPass(1)">Pass</el-button>

        </el-form-item>
      </el-form>
    </el-dialog>


    <!--预定项目，修改预定的项目-->
    <el-dialog @close="closedialog('reserveprojectformref')" style="width: 100%;" class="singleprojectdialog reserveproject-dialog"  :title=reservetitle :visible.sync="showreservehousedialog">
      <el-form :model="singlehouseinfo" ref="reserveprojectformref" label-width="350px">
        <el-tabs  style="height: 400px;" tab-position="left" v-model="TabsactiveName" >
          <el-tab-pane name="one">
            <span slot="label"><i style="color: red">*</i> PURCHASER1</span>
            <el-form-item
              label="NAME"
              :rules="[
                  { required: true, message: 'The name cannot be empty.', trigger: 'blur' },
                ]"
              prop="pur1_name"
            >
              <el-input :disabled=isofferreserved class="ECF0F8-input" placeholder="NAME" v-model="singlehouseinfo.pur1_name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="PASSPORT NO"
              :rules="[
                  { required: true, message: 'The passport no cannot be empty.', trigger: 'blur' },
                ]"
              prop="pur1_passport_NO"
            >
              <el-input :disabled=isofferreserved class="F4EAD5-input" placeholder="PASSPORT NO" v-model="singlehouseinfo.pur1_passport_NO" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="ADDRESS"
              :rules="[
                  { required: true, message: 'The address cannot be empty.', trigger: 'blur' },
                ]"
              prop="pur1_address"
            >
              <el-input  :disabled=isofferreserved class="FBF0EC-input" placeholder="ADDRESS" v-model="singlehouseinfo.pur1_address" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="EMAIL"
              :rules="[
                  { required: true, message: 'The email cannot be empty.', trigger: 'blur' },
                  { type: 'email', message: 'Email address is invalid', trigger: ['blur'] }
                ]"
              prop="pur1_email"
            >
              <el-input  :disabled=isofferreserved class="EFF2CF-input" placeholder="EMAIL" v-model="singlehouseinfo.pur1_email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="TEL"
              :rules="[
                  { required: true, message: 'The tel no cannot be empty.', trigger: 'blur' },
                ]"
              prop="pur1_tel"
            >
              <el-input  :disabled=isofferreserved class="F4EAD5-input" placeholder="TEL" v-model="singlehouseinfo.pur1_tel" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="DOB"
              :rules="[
                  {  required: true, message: 'The dob no cannot be empty.', trigger: 'change' },
                ]"
              prop="pur1_dob"
            >
              <el-date-picker
                :disabled=isofferreserved
                class="ECF0F8-input"
                v-model="singlehouseinfo.pur1_dob"
                type="date"
                placeholder="DOB"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item
              label="IDENTITY CARD"
              :rules="[
                  { required: true, message: 'The identity card no cannot be empty.', trigger: 'change' },
                ]"
              prop="pur1_identity_card"
            >
              <el-select  :disabled=isofferreserved class="EFF2CF-input" v-model="singlehouseinfo.pur1_identity_card" placeholder="IDENTITY CARD">
                <el-option label="use" value=0></el-option>
                <el-option label="nonuse" value=1></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="singlehouseinfo.pur1_identity_card==0">
              <el-upload
                :action=$store.state.serveruploadpicsrc
                :on-success="idcard1uploadsuccess"
                list-type="picture-card"
                :file-list="idcard1piclist"
                :with-credentials="true"
                :on-remove="idcard1handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-tab-pane>
          <!--项目基础信息-->
          <el-tab-pane label="PROJECT INFO" name="four">
            <el-form-item label="ID">
              <el-input :disabled="true" class="D0E8F2-input" v-model="singlehouseinfo.id" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="NAME">
              <el-input :disabled="true" class="EFF2CF-input" v-model="singlehouseinfo.name" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="ADDRESS">
              <el-input :disabled="true" class="FBF0EC-input" v-model="singlehouseinfo.address" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="CREATETIME">
              <el-input :disabled="true" class="D0E8F2-input" v-model="singlehouseinfo.createtime" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="INTRO">
              <el-input :disabled="true" class="EFF2CF-input" v-model="singlehouseinfo.intro" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="CREATOR">
              <el-input :disabled="true" class="FBF0EC-input" v-model="singlehouseinfo.creator" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="SUNSET DATE">
              <el-input :disabled="true" class="EFF2CF-input" v-model="singlehouseinfo.sunset_date" auto-complete="off"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="HOUSE INFO" name="one1">
            <el-form-item label="LOT NO">
              <el-input :disabled="true" class="F4EAD5-input" v-model="singlehouseinfo.lot_NO" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="LOT SIZE">
              <el-input :disabled="true" class="FBF0EC-input" v-model="singlehouseinfo.lot_size" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="TYPE">
              <el-input :disabled="true" class="D0E8F2-input" v-model="singlehouseinfo.type" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="SALES PRICE">
              <el-input :disabled="true" class="ECF0F8-input" v-model="singlehouseinfo.sales_price" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="STATUS">
              <el-input :disabled="true" class="F4EAD5-input" v-model="singlehouseinfo.status" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="LEVEL">
              <el-input :disabled="true" class="FBF0EC-input"  placeholder="LEVEL" v-model="singlehouseinfo.level" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="BED">
              <el-input :disabled="true" class="F4EAD5-input"  placeholder="BED" v-model="singlehouseinfo.bed" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="BATH">
              <el-input :disabled="true" class="FBF0EC-input" placeholder="BATH" v-model="singlehouseinfo.bath" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="ORIENTATION">
              <el-select :disabled="true" class="EFF2CF-input" v-model="singlehouseinfo.orientation" placeholder="ORIENTATION">
                <el-option label="E" value=0></el-option>
                <el-option label="N" value=1></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="INTERNAL APPROX">
              <el-input :disabled="true" class="F4EAD5-input" :min="0" placeholder="INTERNAL APPROX" v-model="singlehouseinfo.internal_approx" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="BALCONY">
              <el-input :disabled="true" class="FBF0EC-input" placeholder="BALCONY" v-model="singlehouseinfo.balcony" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="TOTAL AREA">
              <el-input :disabled="true" class="D0E8F2-input" placeholder="TOTAL AREA" v-model="singlehouseinfo.total_area" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="BODY CORP 1ST YEAR">
              <el-input :disabled="true" class="F4EAD5-input" placeholder="BODY CORP 1ST YEAR" v-model="singlehouseinfo.body_corp_1st_year" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="BODY CORP 2ST YEAR">
              <el-input :disabled="true" class="FBF0EC-input" placeholder="BODY CORP 2ST YEAR" v-model="singlehouseinfo.body_corp_2st_year" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="PROPERTY CATEGORY">
              <el-select :disabled="true" class="EFF2CF-input" v-model="singlehouseinfo.property_category" placeholder="PROPERTY CATEGORY">
                <el-option label="Apartment" value=0></el-option>
                <el-option label="Townhouse" value=1></el-option>
                <el-option label="House" value=2></el-option>
                <el-option label="House and land package" value=3></el-option>
              </el-select>
            </el-form-item>
          </el-tab-pane>
          <!--项目户型图  走马灯-->
          <el-tab-pane label="HOUSE TYPE PICTURE" name="two">
            <el-carousel :interval="5000" arrow="always">
              <el-carousel-item v-for="item in singlehouseinfo.housetypefilelist" :key="item">
                <img style="width: auto ; height: 100%; display: block; margin: 0 auto" :src=$store.state.imgpath+item />
              </el-carousel-item>
            </el-carousel>
          </el-tab-pane>
          <!--押金凭证  走马灯-->
          <el-tab-pane v-if="singlehouseinfo.is_cash_pledge==0" label="DEPOSIT CERTIFICATE PICTURE" name="three3">
            <el-carousel :interval="5000" arrow="always">
              <el-carousel-item v-for="item in singlehouseinfo.offerpicfilelist" :key="item">
                <img style="width: auto ; height: 100%; display: block; margin: 0 auto" :src=$store.state.imgpath+item />
              </el-carousel-item>
            </el-carousel>
          </el-tab-pane>
          <el-tab-pane label="CONTRACT" name="three">
            <el-form-item
              label="CONTRACT SIGNED BY PURCHASERS"
              prop="contract_signed_by_purchasers"
            >
              <el-select class="D0E8F2-input" v-model="singlehouseinfo.contract_signed_by_purchasers" placeholder="CONTRACT SIGNED BY PURCHASERS">
                <el-option label="Not signed" value=0></el-option>
                <el-option label="signed" value=1></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="CONTRACT SIGNED BY VENDORS"
              prop="contract_signed_by_vendors"
            >
              <el-select class="F4EAD5-input" v-model="singlehouseinfo.contract_signed_by_vendors" placeholder="CONTRACT SIGNED BY VENDORS">
                <el-option label="Not signed" value=0></el-option>
                <el-option label="signed" value=1></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="CONTRACT DATE"
              prop="contract_date"
            >
              <el-date-picker
                class="ECF0F8-input"
                v-model="singlehouseinfo.contract_date"
                type="date"
                placeholder="CONTRACT DATE">
              </el-date-picker>
            </el-form-item>
            <el-form-item
              label="CONTRACT EXCHANGE DATE"
              prop="contract_exchanged_date"
            >
              <el-date-picker
                class="FBF0EC-input"
                v-model="singlehouseinfo.contract_exchanged_date"
                type="date"
                placeholder="CONTRACT EXCHANGE DATE">
              </el-date-picker>
            </el-form-item>
            <el-form-item
              label="CONTRACT UNCONDITIONONAL DATE"
              prop="unconditional_date"
            >
              <el-date-picker
                class="F4EAD5-input"
                v-model="singlehouseinfo.unconditional_date"
                type="date"
                placeholder="CONTRACT UNCONDITIONONAL DATE">
              </el-date-picker>
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane label="PURCHASER2" name="five">
            <el-form-item label="NAME">
              <el-input  :disabled=isofferreserved class="D0E8F2-input" placeholder="NAME" v-model="singlehouseinfo.pur2_name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="PASSPORT NO">
              <el-input  :disabled=isofferreserved class="EFF2CF-input" placeholder="PASSPORT NO" v-model="singlehouseinfo.pur2_passport_NO" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="ADDRESS">
              <el-input  :disabled=isofferreserved class="FBF0EC-input" placeholder="ADDRESS" v-model="singlehouseinfo.pur2_address" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="EMAIL"
              :rules="[
                  { type: 'email', message: 'Email address is invalid', trigger: ['blur'] }
                ]"
              prop="pur2_email"
            >
              <el-input  :disabled=isofferreserved class="F4EAD5-input" placeholder="EMAIL" v-model="singlehouseinfo.pur2_email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="TEL">
              <el-input  :disabled=isofferreserved class="D0E8F2-input" placeholder="TEL" v-model="singlehouseinfo.pur2_tel" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="DOB">
              <el-date-picker
                :disabled=isofferreserved
                class="EFF2CF-input"
                v-model="singlehouseinfo.pur2_dob"
                type="date"
                placeholder="DOB">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="IDENTITY CARD">
              <el-select  :disabled=isofferreserved class="ECF0F8-input"  v-model="singlehouseinfo.pur2_identity_card" placeholder="IDENTITY CARD">
                <el-option label="use" value=0></el-option>
                <el-option label="nonuse" value=1></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="singlehouseinfo.pur2_identity_card==0">
              <el-upload
                :action=$store.state.serveruploadpicsrc
                :on-success="idcard2uploadsuccess"
                list-type="picture-card"
                :file-list="idcard2piclist"
                :with-credentials="true"
                :on-remove="idcard2handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-tab-pane>
          <!--房子和主人的一些信息-->
          <el-tab-pane label="HOUSE&MASTER INFO" name="six">
            <el-form-item
              label="PROJECT USE"
              prop="project_use"
            >
              <el-select class="F4EAD5-input" v-model="singlehouseinfo.project_use" placeholder="PROJECT USE">
                <el-option label="live" value=0></el-option>
                <el-option label="invest" value=1></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="SALE PRICE PER CONTRACT"
              prop="sale_price_per_contract"
            >
              <el-input-number :min="0" class="FBF0EC-input" placeholder="SALE PRICE PER CONTRACT" v-model="singlehouseinfo.sale_price_per_contract" auto-complete="off"></el-input-number>
            </el-form-item>
            <el-form-item
              label="COLOUR SCHEME"
              prop="colour_scheme"
            >
              <el-select class="ECF0F8-input" v-model="singlehouseinfo.colour_scheme" placeholder="COLOUR SCHEME">
                <el-option label="light" value=0></el-option>
                <el-option label="dark" value=1></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="APPLIANCE PACKAGE"
              prop="appliance_package"
            >
              <el-select :disabled=isofferreserved class="EFF2CF-input" v-model="singlehouseinfo.appliance_package" placeholder="APPLIANCE PACKAGE">
                <el-option label="standard" value=0></el-option>
                <el-option label="premum" value=1></el-option>
                <el-option label="luxury" value=2></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="EXTRA SPECIAL CONDITIONS"
              prop="extra_special_conditions"
            >
              <el-input  :disabled=isofferreserved class="F4EAD5-input" placeholder="EXTRA SPECIAL CONDITIONS" v-model="singlehouseinfo.extra_special_conditions" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="DEPOSIT REQUIRED PER CONTRACT"
              prop="deposit_required_per_contract"
            >
              <el-input-number :min="0" class="ECF0F8-input" placeholder="DEPOSIT REQUIRED PER CONTRACT" v-model="singlehouseinfo.deposit_required_per_contract" auto-complete="off"></el-input-number>
            </el-form-item>
            <el-form-item
              label="DEPOSIT TYPE"
              prop="deposit_type"
            >
              <el-select class="FBF0EC-input" v-model="singlehouseinfo.deposit_type" placeholder="DEPOSIT TYPE">
                <el-option label="direct debit" value=0></el-option>
                <el-option label="bank guarantee" value=1></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="RESIDENT STATUS"
              prop="resident_status"
            >
              <el-select  :disabled=isofferreserved class="D0E8F2-input" v-model="singlehouseinfo.resident_status" placeholder="RESIDENT STATUS">
                <el-option label="Local" value=0></el-option>
                <el-option label="FIRB" value=1></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="NATIONALITY"
              prop="nationality"
            >
              <el-input  :disabled=isofferreserved class="F4EAD5-input" placeholder="NATIONALITY" v-model="singlehouseinfo.nationality" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="RESERVE DATE"
              :rules="[
                    { required: true, message: 'The reserve date cannot be empty.', trigger: 'change' },
                  ]"
              prop="last_reserve_time"
            >
              <el-date-picker
                class="ECF0F8-input"
                v-model="singlehouseinfo.last_reserve_time"
                type="date"
                placeholder="RESERVE DATE">
              </el-date-picker>

            </el-form-item>
          </el-tab-pane>
          <!--中介和律师信息-->
          <el-tab-pane label="INTERMEDIARY INFO" name="seven">
            <el-form-item
              label="ESTATE AGENT OFFICE"
              :rules="[
                  { required: true, message: 'The estate agent office no cannot be empty.', trigger: 'blur' },
                ]"
              prop="estate_agent_office"
            >
              <el-input class="EFF2CF-input" placeholder="ESTATE AGENT OFFICE" v-model="singlehouseinfo.estate_agent_office" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="ESTATE AGENT OFFICE CONTACT DETAILS"
              :rules="[
                  { required: true, message: 'The estate agent office contact details no cannot be empty.', trigger: 'blur' },
                ]"
              prop="estate_agent_office_contact_details"
            >
              <el-input class="D0E8F2-input" placeholder="ESTATE AGENT OFFICE CONTACT DETAILS" v-model="singlehouseinfo.estate_agent_office_contact_details" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="ESTATE AGENT SALES PERSION"
              :rules="[
                  { required: true, message: 'The estate agent sales persion no cannot be empty.', trigger: 'blur' },
                ]"
              prop="estate_agent_sales_person"
            >
              <el-input class="ECF0F8-input" placeholder="ESTATE AGENT SALES PERSION" v-model="singlehouseinfo.estate_agent_sales_person" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="ESTATE AGENT SALES CONTACT DETAILS"
              :rules="[
                  { required: true, message: 'The estate agent sales contact details no cannot be empty.', trigger: 'blur' },
                ]"
              prop="estate_agent_sales_contact_details"
            >
              <el-input class="F4EAD5-input" placeholder="ESTATE AGENT SALES CONTACT DETAILS" v-model="singlehouseinfo.estate_agent_sales_contact_details" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="PURCHASER SOLICITOR NAME"
              prop="purchaser_solicitor_name"
            >
              <el-input class="FBF0EC-input" placeholder="PURCHASER SOLICITOR NAME" v-model="singlehouseinfo.purchaser_solicitor_name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="PURCHASER SOLICITOR TEL"
              prop="purchaser_solicitor_tel"
            >
              <el-input class="EFF2CF-input" placeholder="PURCHASER SOLICITOR TEL" v-model="singlehouseinfo.purchaser_solicitor_tel" auto-complete="off"></el-input>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
        <el-form-item class="form-dialog-footer" >
          <el-button class="el-dialog__footer-btn" @click="singlehouseinfo={}">Reset</el-button>
          <el-button  class="el-dialog__footer-btn"  @click="ReserveHouse('reserveprojectformref')">Reserve</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--释放项目-->
    <el-dialog  class="form-dialog singleprojectdialog" width="300px" height="180px"  title="Release Project"  :visible.sync="showreleasehousedialog" >
      <el-input style="margin: 30px" label="DESCRIPTION" class="ECF0F8-input" placeholder="DESCRIPTION" v-model="releasehouseDescription"></el-input>
      <div slot="footer" class="dialog-footer">
        <span class="el-dialog__footer-btn" @click="ReleaseHouse()">Confirm</span>
        <span class="el-dialog__footer-btn" @click="showreleasehousedialog = false">Cancel</span>
      </div>
    </el-dialog>
    <!--确认定金确认尾款-->
    <el-dialog @close="closedialog('confirmDepositorbalancepaymentformref')"  class="form-dialog singleprojectdialog confirmproject-dialog" :title=confirmDepositorbalancepaymenttitle :visible.sync="showconfirmDepositorbalancepaymentdialog">
      <el-form label-width="300px" :model="singlehouseinfo" ref="confirmDepositorbalancepaymentformref">
        <el-tabs style="height: 400px;" tab-position="left"  v-model="TabsactiveName" >
          <!--项目基础信息-->
          <el-tab-pane label="PROJECT INFO" name="one">
            <el-form-item label="ID">
              <el-input :disabled="true" class="D0E8F2-input" v-model="singlehouseinfo.id" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="NAME">
              <el-input :disabled="true" class="EFF2CF-input" v-model="singlehouseinfo.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="ADDRESS">
              <el-input :disabled="true" class="FBF0EC-input" v-model="singlehouseinfo.address" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="CREATETIME">
              <el-input :disabled="true" class="D0E8F2-input" v-model="singlehouseinfo.createtime" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="INTRO">
              <el-input :disabled="true" class="EFF2CF-input" v-model="singlehouseinfo.intro" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="CREATOR">
              <el-input :disabled="true" class="FBF0EC-input" v-model="singlehouseinfo.creator" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="SUNSET DATE">
              <el-input :disabled="true" class="EFF2CF-input" v-model="singlehouseinfo.sunset_date" auto-complete="off"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="HOUSE INFO" name="one1">
            <el-form-item label="LOT NO">
              <el-input :disabled="true" class="F4EAD5-input" v-model="singlehouseinfo.lot_NO" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="LOT SIZE">
              <el-input :disabled="true" class="FBF0EC-input" v-model="singlehouseinfo.lot_size" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="TYPE">
              <el-input :disabled="true" class="D0E8F2-input" v-model="singlehouseinfo.type" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="SALES PRICE">
              <el-input :disabled="true" class="ECF0F8-input" v-model="singlehouseinfo.sales_price" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="STATUS">
              <el-input :disabled="true" class="F4EAD5-input" v-model="singlehouseinfo.status" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="LEVEL">
              <el-input :disabled="true" class="FBF0EC-input"  placeholder="LEVEL" v-model="singlehouseinfo.level" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="BED">
              <el-input :disabled="true" class="F4EAD5-input"  placeholder="BED" v-model="singlehouseinfo.bed" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="BATH">
              <el-input :disabled="true" class="FBF0EC-input" placeholder="BATH" v-model="singlehouseinfo.bath" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="ORIENTATION">
              <el-select :disabled="true" class="EFF2CF-input" v-model="singlehouseinfo.orientation" placeholder="ORIENTATION">
                <el-option label="E" value=0></el-option>
                <el-option label="N" value=1></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="INTERNAL APPROX">
              <el-input :disabled="true" class="F4EAD5-input" :min="0" placeholder="INTERNAL APPROX" v-model="singlehouseinfo.internal_approx" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="BALCONY">
              <el-input :disabled="true" class="FBF0EC-input" placeholder="BALCONY" v-model="singlehouseinfo.balcony" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="TOTAL AREA">
              <el-input :disabled="true" class="D0E8F2-input" placeholder="TOTAL AREA" v-model="singlehouseinfo.total_area" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="BODY CORP 1ST YEAR">
              <el-input :disabled="true" class="F4EAD5-input" placeholder="BODY CORP 1ST YEAR" v-model="singlehouseinfo.body_corp_1st_year" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="BODY CORP 2ST YEAR">
              <el-input :disabled="true" class="FBF0EC-input" placeholder="BODY CORP 2ST YEAR" v-model="singlehouseinfo.body_corp_2st_year" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="PROPERTY CATEGORY">
              <el-select :disabled="true" class="EFF2CF-input" v-model="singlehouseinfo.property_category" placeholder="PROPERTY CATEGORY">
                <el-option label="Apartment" value=0></el-option>
                <el-option label="Townhouse" value=1></el-option>
                <el-option label="House" value=2></el-option>
                <el-option label="House and land package" value=3></el-option>
              </el-select>
            </el-form-item>
          </el-tab-pane>
          <!--项目户型图  走马灯-->
          <el-tab-pane label="HOUSE TYPE PICTURE" name="two">
            <el-carousel :interval="5000" arrow="always">
              <el-carousel-item v-for="item in singlehouseinfo.housetypefilelist" :key="item">
                <img style="width: auto ; height: 100%; display: block; margin: 0 auto" :src=$store.state.imgpath+item />
              </el-carousel-item>
            </el-carousel>
          </el-tab-pane>
          <!--合同选项卡-->
          <el-tab-pane label="CONTRACT " name="three">
            <el-form-item label="VERSION CONTRACT">
              <el-input :disabled="true" class="F4EAD5-input" v-model="singlehouseinfo.version_contract" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="CONTRACT SIGNED BY PURCHASERS">
              <el-input :disabled="true" class="D0E8F2-input" v-model="singlehouseinfo.contract_signed_by_purchasers" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="CONTRACT SIGNED BY VENDORS">
              <el-input :disabled="true" class="F4EAD5-input" v-model="singlehouseinfo.contract_signed_by_vendors" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="CONTRACT DATE">
              <el-input :disabled="true" class="ECF0F8-input" v-model="singlehouseinfo.contract_date" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="CONTRACT EXCHANGE DATE">
              <el-input :disabled="true" class="FBF0EC-input" v-model="singlehouseinfo.contract_exchanged_date" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="CONTRACT UNCONDITIONONAL DATE">
              <el-input :disabled="true" class="F4EAD5-input" v-model="singlehouseinfo.unconditional_date" auto-complete="off"></el-input>
            </el-form-item>
          </el-tab-pane>
          <!--买方1信息-->
          <el-tab-pane label="PURCHASER1" name="four">
            <el-form-item label="NAME">
              <el-input :disabled="true" class="ECF0F8-input"  v-model="singlehouseinfo.pur1_name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="PASSPORT NO">
              <el-input :disabled="true" class="F4EAD5-input"  v-model="singlehouseinfo.pur1_passport_NO" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="ADDRESS">
              <el-input :disabled="true" class="FBF0EC-input"  v-model="singlehouseinfo.pur1_address" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="EMAIL">
              <el-input :disabled="true" class="EFF2CF-input"  v-model="singlehouseinfo.pur1_email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="TEL">
              <el-input :disabled="true" class="F4EAD5-input"  v-model="singlehouseinfo.pur1_tel" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="DOB">
              <el-input :disabled="true" class="ECF0F8-input" v-model="singlehouseinfo.pur1_dob" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="IDENTITY CARD">
              <el-input :disabled="true" class="EFF2CF-input"v-model="singlehouseinfo.pur1_identity_card" auto-complete="off"></el-input>
            </el-form-item>
          </el-tab-pane>
          <!--买方2信息-->
          <el-tab-pane label="PURCHASER2" name="five">
            <el-form-item label="NAME">
              <el-input :disabled="true" class="D0E8F2-input" v-model="singlehouseinfo.pur2_name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="PASSPORT NO">
              <el-input :disabled="true" class="EFF2CF-input" v-model="singlehouseinfo.pur2_passport_NO" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="ADDRESS">
              <el-input :disabled="true" class="FBF0EC-input" v-model="singlehouseinfo.pur2_address" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="EMAIL">
              <el-input :disabled="true" class="F4EAD5-input" v-model="singlehouseinfo.pur2_email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="TEL">
              <el-input :disabled="true" class="D0E8F2-input" v-model="singlehouseinfo.pur2_tel" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="DOB">
              <el-input :disabled="true" class="EFF2CF-input" v-model="singlehouseinfo.pur2_dob" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="IDENTITY CARD">
              <el-input :disabled="true" class="ECF0F8-input" v-model="singlehouseinfo.pur2_identity_card" auto-complete="off"></el-input>
            </el-form-item>
          </el-tab-pane>
          <!--房子信息-->
          <el-tab-pane label="HOUSE AND OTHER INFO" name="six">
            <el-form-item label="PROJECT USE">
              <el-input :disabled="true" class="F4EAD5-input" v-model="singlehouseinfo.project_use" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="SALE PRICE PER CONTRACT">
              <el-input :disabled="true" class="FBF0EC-input" v-model="singlehouseinfo.sale_price_per_contract" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="COLOUR SCHEME">
              <el-input :disabled="true" class="ECF0F8-input" v-model="singlehouseinfo.colour_scheme" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="APPLIANCE PACKAGE">
              <el-input :disabled="true" class="EFF2CF-input" v-model="singlehouseinfo.appliance_package" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="EXTRA SPECIAL CONDITIONS">
              <el-input :disabled="true" class="F4EAD5-input" v-model="singlehouseinfo.extra_special_conditions" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="PURCHASER SOLICITOR NAME">
              <el-input :disabled="true" class="FBF0EC-input" v-model="singlehouseinfo.purchaser_solicitor_name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="PURCHASER SOLICITOR TEL">
              <el-input :disabled="true" class="EFF2CF-input" v-model="singlehouseinfo.purchaser_solicitor_tel" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="RESIDENT STATUS">
              <el-input :disabled="true" class="D0E8F2-input" v-model="singlehouseinfo.resident_status" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="NATIONALITY">
              <el-input :disabled="true" class="F4EAD5-input" v-model="singlehouseinfo.nationality" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="DEPOSIT REQUIRED PER CONTRACT">
              <el-input :disabled="true" class="ECF0F8-input" v-model="singlehouseinfo.deposit_required_per_contract" auto-complete="off"></el-input>
            </el-form-item>
          </el-tab-pane>
          <!--定金信息   如果是中介确认定金的时候此栏目不显示-->
          <el-tab-pane label="DEPOSIT INFO" name="seven" v-if="confirmDepositorbalancepaymentflag!=2">
            <el-form-item :disabled="true" label="DEPOSIT TYPE">
              <el-input :disabled="true" class="FBF0EC-input" v-model="singlehouseinfo.deposit_type" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="DIRECT DEBIT DEPOSIT RECEIVED">
              <el-input :disabled="true" class="F4EAD5-input" v-model="singlehouseinfo.direct_debit_deposit_received" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="DEPOSIT RECEIVED DATE">
              <el-input :disabled="true" class="ECF0F8-input" v-model="singlehouseinfo.deposit_received_date" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="BANK GUARANTEE ISSUER">
              <el-input :disabled="true" class="EFF2CF-input" v-model="singlehouseinfo.bank_guarantee_issuer" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="BANK GUARANTEE EXPIRY">
              <el-input :disabled="true" class="FBF0EC-input" v-model="singlehouseinfo.bank_guarantee_expiry" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="BANK GUARANTEE AMOUNT">
              <el-input :disabled="true" class="F4EAD5-input" v-model="singlehouseinfo.bank_guarantee_amount" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="BANK GUARANTEE RECEIVED DATE">
              <el-input :disabled="true" class="ECF0F8-input" v-model="singlehouseinfo.bank_guarantee_received_date" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="ACCEPTABLE">
              <el-input :disabled="true" class="EFF2CF-input" v-model="singlehouseinfo.acceptable" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="DEPOSIT DUE DATE">
              <el-input :disabled="true" class="F4EAD5-input" v-model="singlehouseinfo.deposit_due_date" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="INTEREST BELONG">
              <el-input :disabled="true" class="FBF0EC-input" v-model="singlehouseinfo.interest_belong" auto-complete="off"></el-input>
            </el-form-item>
          </el-tab-pane>

          <!--中介信息-->
          <el-tab-pane label="INTERMEDIARY INFO" name="eight">
            <el-form-item label="LAST RESERVE BELONG AGENT">
              <el-input :disabled="true" class="D0E8F2-input"  v-model="singlehouseinfo.last_reserve_belong_intermediaryaccount" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="LAST RESERVE ACCOUNT">
              <el-input :disabled="true" class="EFF2CF-input"  v-model="singlehouseinfo.last_reserve_account" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="ESTATE AGENT OFFICE">
              <el-input :disabled="true" class="EFF2CF-input"  v-model="singlehouseinfo.estate_agent_office" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="ESTATE AGENT OFFICE CONTACT DETAILS">
              <el-input :disabled="true" class="D0E8F2-input"  v-model="singlehouseinfo.estate_agent_office_contact_details" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="ESTATE AGENT SALES PERSION">
              <el-input :disabled="true" class="ECF0F8-input"  v-model="singlehouseinfo.estate_agent_sales_person" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="ESTATE AGENT SALES CONTACT DETAILS">
              <el-input :disabled="true" class="F4EAD5-input"  v-model="singlehouseinfo.estate_agent_sales_contact_details" auto-complete="off"></el-input>
            </el-form-item>
            <!--<el-form-item  label="COMMISSION RATE">
              <el-input :disabled="true" class="F4EAD5-input" v-model="singlehouseinfo.commission_rate" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="COMMISSION PAYMENT METHOD">
              <el-input :disabled="true" class="F4EAD5-input" v-model="singlehouseinfo.commission_payment_method" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="COMMISSION TOTAL AMOUNT">
              <el-input :disabled="true" class="F4EAD5-input" v-model="singlehouseinfo.commission_total_amount" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="COMMISSION PAYMENT DATE">
              <el-input :disabled="true" class="F4EAD5-input" v-model="singlehouseinfo.commission_payment_date" auto-complete="off"></el-input>
            </el-form-item>-->
          </el-tab-pane>
          <!--确认定金-->
          <el-tab-pane  label="CONFIRMDEPOSIT" name="nine"  v-if="confirmDepositorbalancepaymentflag==2">
            <!--厚易是否接受此保函-->
            <el-form-item
              label="ACCEPTABLE BELONG"
              v-if="this.currentreceiveddeposittype==1"
              :rules="[
                          { required: true, message: 'The acceptable belong cannot be empty.', trigger: 'blur,change' },
                        ]"
              prop="acceptable"
            >
              <el-select class="EFF2CF-input" v-model="singlehouseinfo.acceptable" placeholder="ACCEPTABLE BELONG">
                <el-option label="accept" value=0></el-option>
                <el-option label="reject" value=1></el-option>
              </el-select>
            </el-form-item>
            <!--增加的装修成本买方承担的金额-->
            <el-form-item
              label="UPGRADES COST ON PURCHASER"
              :rules="[
                          { required: true, message: 'The upgrades cost on purchaser cannot be empty.', trigger: 'blur' },
                        ]"
              prop="upgrades_cost_on_purchaser"
            >
              <el-input-number :min="0" class="D0E8F2-input" placeholder="UPGRADES COST ON PURCHASER" v-model="singlehouseinfo.upgrades_cost_on_purchaser" auto-complete="off"></el-input-number>
            </el-form-item>
            <!--增加的装修成本卖方承担的金额-->
            <el-form-item
              label="UPGRADES COST ON VENDOR"
              :rules="[
                          { required: true, message: 'The upgrades cost on vendor cannot be empty.', trigger: 'blur' },
                        ]"
              prop="upgrades_cost_on_vendor"
            >
              <el-input-number :min="0" class="F4EAD5-input" placeholder="UPGRADES COST ON VENDOR" v-model="singlehouseinfo.upgrades_cost_on_vendor" auto-complete="off"></el-input-number>
            </el-form-item>
            <!--直接支付的金额-->
            <el-form-item
              label="DIRECT DEBIT DEPOSIT RECEIVED"
              v-if="this.currentreceiveddeposittype==0"
              :rules="[
                          { required: true, message: 'The direct debit deposit received cannot be empty.', trigger: 'blur' },
                        ]"
              prop="direct_debit_deposit_received"
            >
              <el-input-number :min="0" class="EFF2CF-input" placeholder="DIRECT DEBIT DEPOSIT RECEIVED" v-model="singlehouseinfo.direct_debit_deposit_received" auto-complete="off"></el-input-number>
            </el-form-item>
            <!--定金收到日期-->
            <el-form-item
              label="DEPOSIT RECEIVED DATE"
              :rules="[
                          { required: true, message: 'The deposit received date cannot be empty.', trigger: 'change' },
                        ]"
              prop="deposit_received_date"
            >
              <el-date-picker
                class="ECF0F8-input"
                v-model="singlehouseinfo.deposit_received_date"
                type="date"
                placeholder="DEPOSIT RECEIVED DATE">
              </el-date-picker>

            </el-form-item>
            <!--银行出保函日期-->
            <el-form-item
              label="BANK GUARANTEE ISSUER"
              v-if="this.currentreceiveddeposittype==1"
              :rules="[
                          { required: true, message: 'The bank guarantee issuer cannot be empty.', trigger: 'change' },
                        ]"
              prop="bank_guarantee_issuer"
            >
              <el-date-picker
                class="FBF0EC-input"
                v-model="singlehouseinfo.bank_guarantee_issuer"
                type="date"
                placeholder="BANK GUARANTEE ISSUER">
              </el-date-picker>
            </el-form-item>
            <!--银行保函到期日期-->
            <el-form-item
              label="BANK GUARANTEE EXPIRY"
              v-if="this.currentreceiveddeposittype==1"
              :rules="[
                          { required: true, message: 'The bank guarantee expiry cannot be empty.', trigger: 'change' },
                        ]"
              prop="bank_guarantee_expiry"
            >
              <el-date-picker
                class="D0E8F2-input"
                v-model="singlehouseinfo.bank_guarantee_expiry"
                type="date"
                placeholder="BANK GUARANTEE EXPIRY">
              </el-date-picker>
            </el-form-item>
            <!--银行保函担保金额-->
            <el-form-item
              label="BANK GUARANTEE AMOUNT"
              v-if="this.currentreceiveddeposittype==1"
              :rules="[
                          { required: true, message: 'The bank guarantee amount cannot be empty.', trigger: 'blur' },
                        ]"
              prop="bank_guarantee_amount"
            >
              <el-input  class="EFF2CF-input"  placeholder="BANK GUARANTEE AMOUNT" v-model="singlehouseinfo.bank_guarantee_amount" auto-complete="off"></el-input>
            </el-form-item>
            <!--银行保函收到日期-->
            <el-form-item
              label="BANK GUARANTEE RECEIVED DATE"
              v-if="this.currentreceiveddeposittype==1"
              :rules="[
                          { required: true, message: 'The bank guarantee received date cannot be empty.', trigger: 'change' },
                        ]"
              prop="bank_guarantee_received_date"
            >
              <el-date-picker
                class="FBF0EC-input"
                v-model="singlehouseinfo.bank_guarantee_received_date"
                type="date"
                placeholder="BANK GUARANTEE RECEIVED DATE">
              </el-date-picker>
            </el-form-item>
            <!--应付定金最晚日期-->
            <el-form-item
              label="DEPOSIT DUE DATE"
              :rules="[
                          { required: true, message: 'The deposit due date cannot be empty.', trigger: 'change' },
                        ]"
              prop="deposit_due_date"
            >
              <el-date-picker
                class="D0E8F2-input"
                v-model="singlehouseinfo.deposit_due_date"
                type="date"
                placeholder="DEPOSIT DUE DATE">
              </el-date-picker>
            </el-form-item>
            <!--存款利息归属方-->
            <el-form-item
              label="INTEREST BELONG"
              :rules="[
                          { required: true, message: 'The interest belong cannot be empty.', trigger: 'blur,change' },
                        ]"
              prop="interest_belong"
            >
              <el-select class="F4EAD5-input" v-model="singlehouseinfo.interest_belong" placeholder="INTEREST BELONG">
                <el-option label="purchaser" value=0></el-option>
                <el-option label="seller" value=1></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="COMMISSION RATE">
              <el-input-number :min="0"  class="ECF0F8-input" placeholder="COMMISSION RATE" v-model="singlehouseinfo.commission_rate" auto-complete="off"></el-input-number>
            </el-form-item>
            <el-form-item label="COMMISSION PAYMENT METHOD">
              <el-input class="EFF2CF-input" placeholder="COMMISSION PAYMENT METHOD" v-model="singlehouseinfo.commission_payment_method" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="COMMISSION TOTAL AMOUNT">
              <el-input-number :min="0" class="FBF0EC-input" placeholder="COMMISSION TOTAL AMOUNT" v-model="singlehouseinfo.commission_total_amount" auto-complete="off"></el-input-number>
            </el-form-item>
            <el-form-item  label="COMMISSION PAYMENT DATE">
              <el-date-picker
                class="D0E8F2-input"
                v-model="singlehouseinfo.commission_payment_date"
                type="date"
                placeholder="COMMISSION PAYMENT DATE">
              </el-date-picker>
            </el-form-item>
          </el-tab-pane>
          <!--确认尾款-->
          <el-tab-pane  label="CONFIRM BALANCE PAYMENT" name="nine"  v-if="confirmDepositorbalancepaymentflag==3">

            <el-form-item
              label="COMMISSION RATE"
              :rules="[
                          { required: true, message: 'The commission rate cannot be empty.', trigger: 'blur' },
                        ]"
              prop="commission_rate"
            >
              <el-input-number :min="0" class="ECF0F8-input" placeholder="COMMISSION RATE" v-model="singlehouseinfo.commission_rate" auto-complete="off"></el-input-number>
            </el-form-item>
            <el-form-item
              label="COMMISSION PAYMENT METHOD"
              :rules="[
                          { required: true, message: 'The commission payment method cannot be empty.', trigger: 'blur' },
                        ]"
              prop="commission_payment_method"
            >
              <el-input class="EFF2CF-input" placeholder="COMMISSION PAYMENT METHOD" v-model="singlehouseinfo.commission_payment_method" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="COMMISSION TOTAL AMOUNT"
              :rules="[
                          { required: true, message: 'The commission payment method cannot be empty.', trigger: 'blur' },
                        ]"
              prop="commission_total_amount"
            >
              <el-input-number :min="0" class="FBF0EC-input" placeholder="COMMISSION TOTAL AMOUNT" v-model="singlehouseinfo.commission_total_amount" auto-complete="off"></el-input-number>
            </el-form-item>
            <el-form-item
              label="COMMISSION PAYMENT DATE"
              :rules="[
                          { required: true, message: 'The commission payment date cannot be empty.', trigger: 'change' },
                        ]"
              prop="commission_payment_date"
            >
              <el-date-picker
                class="F4EAD5-input"
                v-model="singlehouseinfo.commission_payment_date"
                type="date"
                placeholder="COMMISSION PAYMENT DATE">
              </el-date-picker>
            </el-form-item>
            <el-form-item
              label="SETTLEMENT DATE"
              :rules="[
                          { required: true, message: 'The settlement date cannot be empty.', trigger: 'change' },
                        ]"
              prop="settlement_date"
            >
              <el-date-picker
                class="D0E8F2-input"
                v-model="singlehouseinfo.settlement_date"
                type="date"
                placeholder="SETTLEMENT DATE">
              </el-date-picker>
            </el-form-item>
            <el-form-item
              label="SETTLEMENT COMPLETION"
              :rules="[
                          { required: true, message: 'The settlement completion cannot be empty.', trigger: 'change' },
                        ]"
              prop="settlement_completion"
            >
              <el-select class="ECF0F8-input" v-model="singlehouseinfo.settlement_completion" placeholder="SETTLEMENT COMPLETION">
                <el-option label="unfinished" value=0></el-option>
                <el-option label="finished" value=1></el-option>
              </el-select>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
        <el-form-item class="form-dialog-footer" v-if="confirmDepositorbalancepaymentflag==2">
          <span class="el-dialog__footer-btn" @click="singlehouseinfo={}">Reset</span>
          <span class="el-dialog__footer-btn" @click="ConfirmReceiptOfDeposit('confirmDepositorbalancepaymentformref',1)">Save</span>
          <span class="el-dialog__footer-btn" @click="ConfirmReceiptOfDeposit('confirmDepositorbalancepaymentformref',0)">Confirm</span>
        </el-form-item>
        <el-form-item class="form-dialog-footer" v-if="confirmDepositorbalancepaymentflag==3">
          <span class="el-dialog__footer-btn" @click="singlehouseinfo={}">Reset</span>
          <span class="el-dialog__footer-btn" @click="receivedbalancepayment('confirmDepositorbalancepaymentformref',1)">Save</span>
          <span class="el-dialog__footer-btn" @click="receivedbalancepayment('confirmDepositorbalancepaymentformref',0)">Confirm</span>
        </el-form-item>
      </el-form>

    </el-dialog>

    <!--View视图-->
    <el-dialog @close="closedialog()" class="singleprojectdialog view-dialog" title="View" :visible.sync="showhouseviewdialog">
      <el-form label-width="300px" >
        <el-tabs tab-position="left"  v-model="TabsactiveName">
          <!--项目基础信息-->
          <el-tab-pane label="PROJECT INFO" name="one">
            <el-form-item label="ID">
              <el-input :disabled="true" class="D0E8F2-input" v-model="singlehouseinfo.id" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="NAME">
              <el-input :disabled="true" class="EFF2CF-input" v-model="singlehouseinfo.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="ADDRESS">
              <el-input :disabled="true" class="FBF0EC-input" v-model="singlehouseinfo.address" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="CREATETIME">
              <el-input :disabled="true" class="D0E8F2-input" v-model="singlehouseinfo.createtime" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="INTRO">
              <el-input :disabled="true" class="EFF2CF-input" v-model="singlehouseinfo.intro" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="CREATOR">
              <el-input :disabled="true" class="FBF0EC-input" v-model="singlehouseinfo.creator" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="SUNSET DATE">
              <el-input :disabled="true" class="EFF2CF-input" v-model="singlehouseinfo.sunset_date" auto-complete="off"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="HOUSE INFO" name="one1">
            <el-form-item label="LOT NO">
              <el-input :disabled="true" class="F4EAD5-input" v-model="singlehouseinfo.lot_NO" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="LOT SIZE">
              <el-input :disabled="true" class="FBF0EC-input" v-model="singlehouseinfo.lot_size" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="TYPE">
              <el-input :disabled="true" class="D0E8F2-input" v-model="singlehouseinfo.type" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="SALES PRICE">
              <el-input :disabled="true" class="ECF0F8-input" v-model="singlehouseinfo.sales_price" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="STATUS">
              <el-input :disabled="true" class="F4EAD5-input" v-model="singlehouseinfo.status" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="LEVEL">
              <el-input :disabled="true" class="FBF0EC-input"  placeholder="LEVEL" v-model="singlehouseinfo.level" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="BED">
              <el-input :disabled="true" class="F4EAD5-input"  placeholder="BED" v-model="singlehouseinfo.bed" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="BATH">
              <el-input :disabled="true" class="FBF0EC-input" placeholder="BATH" v-model="singlehouseinfo.bath" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="STUDY">
              <el-input :disabled="true" class="F4EAD5-input" placeholder="STUDY" v-model="singlehouseinfo.study" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="CARPARK">
              <el-input :disabled="true" class="D0E8F2-input" placeholder="CARPARK" v-model="singlehouseinfo.carpark" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="ORIENTATION">
              <el-select :disabled="true" class="EFF2CF-input" v-model="singlehouseinfo.orientation" placeholder="ORIENTATION">
                <el-option label="E" value=0></el-option>
                <el-option label="N" value=1></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="INTERNAL APPROX">
              <el-input :disabled="true" class="F4EAD5-input" :min="0" placeholder="INTERNAL APPROX" v-model="singlehouseinfo.internal_approx" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="BALCONY">
              <el-input :disabled="true" class="FBF0EC-input" placeholder="BALCONY" v-model="singlehouseinfo.balcony" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="TOTAL AREA">
              <el-input :disabled="true" class="D0E8F2-input" placeholder="TOTAL AREA" v-model="singlehouseinfo.total_area" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="BODY CORP 1ST YEAR">
              <el-input :disabled="true" class="F4EAD5-input" placeholder="BODY CORP 1ST YEAR" v-model="singlehouseinfo.body_corp_1st_year" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="BODY CORP 2ST YEAR">
              <el-input :disabled="true" class="FBF0EC-input" placeholder="BODY CORP 2ST YEAR" v-model="singlehouseinfo.body_corp_2st_year" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="PROPERTY CATEGORY">
              <el-select :disabled="true" class="EFF2CF-input" v-model="singlehouseinfo.property_category" placeholder="PROPERTY CATEGORY">
                <el-option label="Apartment" value=0></el-option>
                <el-option label="Townhouse" value=1></el-option>
                <el-option label="House" value=2></el-option>
                <el-option label="House and land package" value=3></el-option>
              </el-select>
            </el-form-item>

          </el-tab-pane>
          <!--项目户型图  走马灯-->
          <el-tab-pane label="HOUSE TYPE PICTURE" name="two" >
            <el-carousel :interval="5000" arrow="always">
              <el-carousel-item v-for="item in singlehouseinfo.housetypefilelist" :key="item">
                <img style="width:auto !important; height: 400px !important;display: block; margin: 0 auto" :src=$store.state.imgpath+item />
              </el-carousel-item>
            </el-carousel>
          </el-tab-pane>
          <!--分配的中介列表-->
          <el-tab-pane label="ALLOCATION INTERMEDIARY LIST" name="two2" >
            <el-table
              :data="singlehouseinfo.allocationToIntermediaryList"
              style="width: 600px;margin-left: 90px">
              <el-table-column
                prop="account"
                label="Account"
                width="200">
              </el-table-column>
              <el-table-column
                prop="company_name"
                label="COMPANY_NAME"
                width="400">
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <!--合同选项卡-->
          <el-tab-pane label="CONTRACT " name="three" >
            <el-form-item label="VERSION CONTRACT">
              <el-input :disabled="true" class="F4EAD5-input" v-model="singlehouseinfo.version_contract" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="CONTRACT SIGNED BY PURCHASERS">
              <el-input :disabled="true" class="D0E8F2-input" v-model="singlehouseinfo.contract_signed_by_purchasers" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="CONTRACT SIGNED BY VENDORS">
              <el-input :disabled="true" class="F4EAD5-input" v-model="singlehouseinfo.contract_signed_by_vendors" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="CONTRACT DATE">
              <el-input :disabled="true" class="ECF0F8-input" v-model="singlehouseinfo.contract_date" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="CONTRACT EXCHANGE DATE">
              <el-input :disabled="true" class="FBF0EC-input" v-model="singlehouseinfo.contract_exchanged_date" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="CONTRACT UNCONDITIONONAL DATE">
              <el-input :disabled="true" class="F4EAD5-input" v-model="singlehouseinfo.unconditional_date" auto-complete="off"></el-input>
            </el-form-item>
          </el-tab-pane>
          <!--买方1信息-->
          <el-tab-pane label="PURCHASER1" name="four">
            <el-form-item label="NAME">
              <el-input :disabled="true" class="ECF0F8-input"  v-model="singlehouseinfo.pur1_name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="PASSPORT NO">
              <el-input :disabled="true" class="F4EAD5-input"  v-model="singlehouseinfo.pur1_passport_NO" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="ADDRESS">
              <el-input :disabled="true" class="FBF0EC-input"  v-model="singlehouseinfo.pur1_address" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="EMAIL">
              <el-input :disabled="true" class="EFF2CF-input"  v-model="singlehouseinfo.pur1_email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="TEL">
              <el-input :disabled="true" class="F4EAD5-input"  v-model="singlehouseinfo.pur1_tel" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="DOB">
              <el-input :disabled="true" class="ECF0F8-input" v-model="singlehouseinfo.pur1_dob" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="IDENTITY CARD">
              <el-input :disabled="true" class="EFF2CF-input"v-model="singlehouseinfo.pur1_identity_card" auto-complete="off"></el-input>
            </el-form-item>
            <el-carousel :interval="5000" arrow="always">
              <el-carousel-item v-for="item in idcard1piclist" :key="item">
                <img style="width:auto !important; height: 400px !important;display: block; margin: 0 auto" :src=$store.state.imgpath+item />
              </el-carousel-item>
            </el-carousel>
          </el-tab-pane>
          <!--买方2信息-->
          <el-tab-pane label="PURCHASER2" name="five">
            <el-form-item label="NAME">
              <el-input :disabled="true" class="D0E8F2-input" v-model="singlehouseinfo.pur2_name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="PASSPORT NO">
              <el-input :disabled="true" class="EFF2CF-input" v-model="singlehouseinfo.pur2_passport_NO" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="ADDRESS">
              <el-input :disabled="true" class="FBF0EC-input" v-model="singlehouseinfo.pur2_address" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="EMAIL">
              <el-input :disabled="true" class="F4EAD5-input" v-model="singlehouseinfo.pur2_email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="TEL">
              <el-input :disabled="true" class="D0E8F2-input" v-model="singlehouseinfo.pur2_tel" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="DOB">
              <el-input :disabled="true" class="EFF2CF-input" v-model="singlehouseinfo.pur2_dob" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="IDENTITY CARD">
              <el-input :disabled="true" class="ECF0F8-input" v-model="singlehouseinfo.pur2_identity_card" auto-complete="off"></el-input>
            </el-form-item>
            <el-carousel :interval="5000" arrow="always">
              <el-carousel-item v-for="item in idcard2piclist" :key="item">
                <img style="width:auto !important; height: 400px !important;display: block; margin: 0 auto" :src=$store.state.imgpath+item />
              </el-carousel-item>
            </el-carousel>
          </el-tab-pane>
          <!--房子信息-->
          <el-tab-pane label="HOUSE AND OTHER INFO" name="six">
            <el-form-item label="PROJECT USE">
              <el-input :disabled="true" class="F4EAD5-input" v-model="singlehouseinfo.project_use" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="SALE PRICE PER CONTRACT">
              <el-input :disabled="true" class="FBF0EC-input" v-model="singlehouseinfo.sale_price_per_contract" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="COLOUR SCHEME">
              <el-input :disabled="true" class="ECF0F8-input" v-model="singlehouseinfo.colour_scheme" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="APPLIANCE PACKAGE">
              <el-input :disabled="true" class="EFF2CF-input" v-model="singlehouseinfo.appliance_package" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="EXTRA SPECIAL CONDITIONS">
              <el-input :disabled="true" class="F4EAD5-input" v-model="singlehouseinfo.extra_special_conditions" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="PURCHASER SOLICITOR NAME">
              <el-input :disabled="true" class="FBF0EC-input" v-model="singlehouseinfo.purchaser_solicitor_name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="PURCHASER SOLICITOR TEL">
              <el-input :disabled="true" class="EFF2CF-input" v-model="singlehouseinfo.purchaser_solicitor_tel" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="RESIDENT STATUS">
              <el-input :disabled="true" class="D0E8F2-input" v-model="singlehouseinfo.resident_status" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="NATIONALITY">
              <el-input :disabled="true" class="F4EAD5-input" v-model="singlehouseinfo.nationality" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="singlehouseinfo.status=='OFFERED'" label="OFFER CREATOR">
              <el-input :disabled="true" class="F4EAD5-input" v-model="singlehouseinfo.offer_creator" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="singlehouseinfo.status=='OFFERED'" label="OFFER CREATOR OF AGENT">
              <el-input :disabled="true" class="F4EAD5-input" v-model="singlehouseinfo.offer_creator_of_agent" auto-complete="off"></el-input>
            </el-form-item>
          </el-tab-pane>
          <!--定金信息-->
          <el-tab-pane label="DEPOSIT INFO" name="seven">
            <el-form-item label="DEPOSIT REQUIRED PER CONTRACT">
              <el-input :disabled="true" class="EFF2CF-input" v-model="singlehouseinfo.deposit_required_per_contract" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :disabled="true" label="DEPOSIT TYPE">
              <el-input :disabled="true" class="FBF0EC-input" v-model="singlehouseinfo.deposit_type" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="DIRECT DEBIT DEPOSIT RECEIVED">
              <el-input :disabled="true" class="ECF0F8-input" v-model="singlehouseinfo.direct_debit_deposit_received" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="DEPOSIT RECEIVED DATE">
              <el-input :disabled="true" class="F4EAD5-input" v-model="singlehouseinfo.deposit_received_date" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="BANK GUARANTEE ISSUER">
              <el-input :disabled="true" class="ECF0F8-input" v-model="singlehouseinfo.bank_guarantee_issuer" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="BANK GUARANTEE EXPIRY">
              <el-input :disabled="true" class="EFF2CF-input" v-model="singlehouseinfo.bank_guarantee_expiry" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="BANK GUARANTEE AMOUNT">
              <el-input :disabled="true" class="FBF0EC-input" v-model="singlehouseinfo.bank_guarantee_amount" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="BANK GUARANTEE RECEIVED DATE">
              <el-input :disabled="true" class="D0E8F2-input" v-model="singlehouseinfo.bank_guarantee_received_date" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="ACCEPTABLE">
              <el-input :disabled="true" class="EFF2CF-input" v-model="singlehouseinfo.acceptable" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="DEPOSIT DUE DATE">
              <el-input :disabled="true" class="F4EAD5-input" v-model="singlehouseinfo.deposit_due_date" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="INTEREST BELONG">
              <el-input :disabled="true" class="ECF0F8-input" v-model="singlehouseinfo.interest_belong" auto-complete="off"></el-input>
            </el-form-item>
          </el-tab-pane>

          <!--中介信息-->
          <el-tab-pane label="INTERMEDIARY INFO" name="eight">
            <el-form-item label="LAST RESERVE DATE">
              <el-input :disabled="true" class="EFF2CF-input"  v-model="singlehouseinfo.last_reserve_time" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="LAST RESERVE BELONG AGENT">
              <el-input :disabled="true" class="D0E8F2-input"  v-model="singlehouseinfo.last_reserve_belong_intermediaryaccount" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="LAST RESERVE ACCOUNT">
              <el-input :disabled="true" class="EFF2CF-input"  v-model="singlehouseinfo.last_reserve_account" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="ESTATE AGENT OFFICE">
              <el-input :disabled="true" class="FBF0EC-input"  v-model="singlehouseinfo.estate_agent_office" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="ESTATE AGENT OFFICE CONTACT DETAILS">
              <el-input :disabled="true" class="D0E8F2-input"  v-model="singlehouseinfo.estate_agent_office_contact_details" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="ESTATE AGENT SALES PERSION">
              <el-input :disabled="true" class="EFF2CF-input"  v-model="singlehouseinfo.estate_agent_sales_person" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="ESTATE AGENT SALES CONTACT DETAILS">
              <el-input :disabled="true" class="D0E8F2-input"  v-model="singlehouseinfo.estate_agent_sales_contact_details" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="COMMISSION RATE">
              <el-input :disabled="true" class="FBF0EC-input" v-model="singlehouseinfo.commission_rate" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="COMMISSION PAYMENT METHOD">
              <el-input :disabled="true" class="F4EAD5-input" v-model="singlehouseinfo.commission_payment_method" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="COMMISSION TOTAL AMOUNT">
              <el-input :disabled="true" class="FBF0EC-input" v-model="singlehouseinfo.commission_total_amount" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="COMMISSION PAYMENT DATE">
              <el-input :disabled="true" class="EFF2CF-input" v-model="singlehouseinfo.commission_payment_date" auto-complete="off"></el-input>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-dialog>

    <el-dialog title="Offer List" :visible.sync="showsinglehouseallofferdialog">
      <el-table
        stripe
        :data="singleHouseOfferlist"
        border
        :header-cell-class-name="tableheaderClassName"
        :cell-class-name="tableClassName"
        style="
            width: 100%;
            font-size: 11px;
            font-family:Helvetica;
          "
      >
        <el-table-column
          label="View"
          width="70"
        >
          <template slot-scope="scope">
            <i title="Offer View" class="iconfont icon-fangdajing" @click="isofferview=true,showCreateEditOffer(scope.row.house_id,7,scope.row.purchaser_random)" style="color: #fa9427;cursor: pointer"></i>
          </template>
        </el-table-column>
        <el-table-column
          label="Edit Offer"
          width="70"
          v-if="currentaccountinfo.Role!=1"
        >
          <template slot-scope="scope" >
            <i title="Edit Offer" class="iconfont icon-edit" @click="showCreateEditOffer(scope.row.house_id,5,scope.row.purchaser_random)" style="color: #000;cursor: pointer"></i>
          </template>
        </el-table-column>
        <el-table-column
          prop="lot_NO"
          label="LOT_NO">
        </el-table-column>
        <el-table-column
          prop="pur1_name"
          label="PUR1_NAME">
        </el-table-column>
        <el-table-column
          prop="is_cash_pledge"
          label="DEPOSIT HAS BEEN PAID">
          <template slot-scope="scope">
            <span>{{ scope.row.is_cash_pledge==0?'yes':'no'}}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="pur1_email"
          label="PUR1_EMAIL">
        </el-table-column>
        <el-table-column
          prop="offer_price"
          label="OFFER_PRICE">
        </el-table-column>
        <el-table-column
          prop="pur_status"
          label="PASS">
          <template slot-scope="scope">
            <span v-if="scope.row.pur_status=='5'" style="color: #ff6356">yes</span>
            <span v-if="scope.row.pur_status=='6'">no</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        ReserveReleaseTitle:'',
        confirmDepositorbalancepaymenttitle:'',
        confirmDepositorbalancepaymentflag:0,
        showconfirmDepositorbalancepaymentdialog:false,
        reserveoreditreservehouseflag:0,
        createoreditofferflag:0,
        reservetitle:'Reserve Project',
        dialogImageUrl: '',
        dialogVisible: false,
        TabsactiveName: 'one',
        releasehouseDescription: '',
        /*当前登录的用户信息  包括Role AccountType Account Name MyAllSalesman*/
        currentaccountinfo: undefined,
        /*当前项目的定金类型*/
        currentreceiveddeposittype: undefined,
        currentreceiveddepositorbalancepaymenthouseid: undefined,
        isfinance: false,
        ismyproject: false,
        currentreleasehouseid: undefined,
        balancepaymentformdate: {
          settlement_datedate: new Date(),
          commission_payment_datedate: new Date(),
          commission_payment_method: undefined,
        },
        showreservehousedialog: false,
        showreleasehousedialog: false,
        reservehouseformdata: {},
        showconditiondiv: true,
        createhouseformdata: {
          status:'0',
        },
        edithouseformdata: {
          sunset_datedate:new Date(),
        },
        showreserverelease: false,
        showcreatehousedialog: false,
        showedithousedialog: false,
        currentlockid: undefined,
        currentislock: undefined,
        currentpage: 1,
        totalcount: 100,
        showcondition: {
          status: true,
          lot_NO: true,
          high_sales_price: true,
          low_sales_price: true,
          address: true,
          name: true,
        },
        statusoptions: [],
        showLockHouseDialog: false,
        showdata: 'Are you sure Lock Project?',
        conditionparam: {
          count: 10,
          statuss: "",
          status: undefined,
        },
        datalist: [],
        showCreateHouse: true,
        showEditHouse: true,
        showLockHouse: true,
        housetypepiclist:[],
        //用于展示项目信息
        singlehouseinfo:{
          acceptable: undefined,
        },
        showhouseviewdialog:false,
        showdeposit:false,
        showfinalpayment:false,
        projectidandnamearray :[],
        offerdepositpiclist:[],
        showcreateeditofferdialog:false,
        createeditoffertitle:'',
        singleHouseOfferlist:[],
        showsinglehouseallofferdialog:false,
        showlookoffer:false,
        showcreateoffer:false,
        //判定是否是Offer的view视图  如果是view视图控件则失效
        isofferview:false,
        isofferreserved:false,
        idcard1piclist:[],
        idcard2piclist:[],
        showeditreserve:false,
      }
    },
    components: {},
    watch: {
      //如果路由有变化，会再次执行该方法
      '$route': 'mountedmethod',
      //element ui 的分页有bug  不能再handlecurrentpage中调用查询   只能监听currentpage的变化来查询
      currentpage:{
        handler:function(val,oldval){
          this.SearchHouseAllInfoList();
        },
        deep:true//对象内部的属性监听，也叫深度监听
      },

    },
    methods: {
      //验证当前用户信息是否完整
      VerifyInfoFull(){
        var param = {
          account:this.currentaccountinfo.Account,
          AccountType:this.currentaccountinfo.AccountType
        }
        let res = this.requestutil.ajax('/VerifyInfoFull',param,false,this);
        if(res.statuscode<0){
          this.$goRoute('/home/modifydata',{perfectinfo:true});
        }
      },
      CreateHouseCalculateTotalArea(){
          this.createhouseformdata.total_area = this.createhouseformdata.balcony + this.createhouseformdata.internal_approx;
      },
      EditHouseCalculateTotalArea(){
        this.edithouseformdata.total_area = this.edithouseformdata.balcony + this.edithouseformdata.internal_approx;
      },
      showSingleHouseAllOffer(house_id){
        this.showsinglehouseallofferdialog=true;
        this.SearchOfferList(house_id);
      },
      SearchOfferList(house_id){
        var param = {
          house_id:house_id,
          skip:0,
          count:9999,
        }
        let res = this.requestutil.ajax('/SearchOfferList',param,false,this);
        this.singleHouseOfferlist = res.message;
      },
      SearchProjectInfoIdAndName(){
        if(this.projectidandnamearray.length!=0)
            return;
        let res = this.requestutil.ajax('/SearchProjectInfoIdAndName', null, false,this);
        this.projectidandnamearray = res.message;
      },
      //判定是否显示释放项目icon
      isshowreleasehouseicon(last_reserve_account){
        if(this.currentaccountinfo.AccountType==1){
          //如果是我下面的销售 则显示释放
          if(this.currentaccountinfo.MyAllSalesman.indexOf(last_reserve_account)>=0){
            return true;
          }
        }
        //如果是销售的话 最后一次的预约人是我的话显示释放项目
        else if(this.currentaccountinfo.AccountType==2&&this.currentaccountinfo.Account==last_reserve_account){
          return true;
        }
        return false;
      },
      openmap(projectid){
        window.open("/googlemap/ProjectDetails.html?id="+projectid);
      },
      closedialog(formName){
        this.idcard1piclist=[];
        this.idcard2piclist=[];
        this.housetypepiclist = [];
        this.isofferreserved=false;
        this.isofferview = false;
        this.TabsactiveName = 'one';
        if(formName==undefined)
          return;
        var dom = this.$refs[formName];
        if(dom!=undefined){
          if (Array.isArray(dom)) dom = dom[0];
          dom.resetFields();
        }
      },
      //flag:0:预定项目  1：修改预定的项目
      showreservedialog(house_id,flag,purchaser_random){
        this.TabsactiveName = 'one';
        this.showreservehousedialog=true;
        this.currentreservehouseid = house_id;
        this.SearchHouseAllInfoByHouseId(house_id,flag,purchaser_random);
      },
      //flag:2:确认定金   3：确认尾款
      showConfirmDepositorbalancepayment(house_id,flag,purchaser_random){
        if(flag==2)
          this.confirmDepositorbalancepaymenttitle = 'Confirm Deposit';
        if(flag==3)
          this.confirmDepositorbalancepaymenttitle = 'Confirm Finalpayment';
        this.TabsactiveName = 'one';
        this.confirmDepositorbalancepaymentflag=flag;
        this.showconfirmDepositorbalancepaymentdialog=true;
        this.currentreceiveddepositorbalancepaymenthouseid = house_id;
        this.SearchHouseAllInfoByHouseId(house_id,flag,purchaser_random);
      },
      //flag:4:创建offer 5:修改offer
      showCreateEditOffer(house_id,flag,purchaser_random){
        this.showcreateeditofferdialog=true;
        if(flag==4||flag==6)
          this.createeditoffertitle='Create Offer';
        if(flag==5)
          this.createeditoffertitle='Edit Offer';
        if(flag==7)
          this.createeditoffertitle='Offer View';
        this.createoreditofferflag=flag;
        this.SearchHouseAllInfoByHouseId(house_id,flag,purchaser_random);
      },
      //根据不同的flag处理不同的数据
      //flag：   0：预定项目   1：修改预定的项目   2：确认定金   3：确认尾款  4：创建offer  5：修改offer  6：创建预定的offer
      SearchHouseAllInfoByHouseId(id,flag,purchaser_random){
        this.offerdepositpiclist=[];
        this.TabsactiveName = 'one';
        var param = {
          house_id: id,
          purchaser_random:purchaser_random,
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
        //通过offer来预定项目
        if(flag==0&&singlestatus==5){
          //判定当前进来的操作是offer还是非offer
          this.singlehouseinfo.purchaser_random!=undefined?this.isofferreserved=true:this.isofferreserved=false;
          this.singlehouseinfo.offerpicfilelist = this.singlehouseinfo.cash_pledge_proof_pic!=undefined&&this.singlehouseinfo.cash_pledge_proof_pic!=""?this.singlehouseinfo.cash_pledge_proof_pic.split(','):[];
          if(this.singlehouseinfo.pur1_dob!=undefined&&this.singlehouseinfo.pur1_dob!=0)
            this.$set(this.singlehouseinfo,'pur1_dob',new Date(this.singlehouseinfo.pur1_dob))
          if(this.singlehouseinfo.pur2_dob!=undefined&&this.singlehouseinfo.pur2_dob!=0)
            this.$set(this.singlehouseinfo,'pur2_dob',new Date(this.singlehouseinfo.pur2_dob))
          this.singlehouseinfo.is_cash_pledge = this.singlehouseinfo.is_cash_pledge.toString();
          this.singlehouseinfo.appliance_package = this.singlehouseinfo.appliance_package.toString();
          this.singlehouseinfo.resident_status = this.singlehouseinfo.resident_status.toString();
          //将中介信息回显上去
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
          //预定项目时预定时间默认值为当前时间
          this.$set(this.singlehouseinfo,'last_reserve_time',new Date());
        }
        //预定项目
        if(flag==0){
          //将中介信息回显上去
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
          this.$set(this.singlehouseinfo,'last_reserve_time',new Date())
          return ;
        }
        //创建offer
        if(flag==4){
          this.$set(this.singlehouseinfo,'offer_date',new Date());
          return;
        }
        //创建预定后的offer
        if(flag==6){
          this.$set(this.singlehouseinfo,'offer_date',new Date());
          if(this.singlehouseinfo.pur1_dob!=undefined&&this.singlehouseinfo.pur1_dob!=0)
            this.$set(this.singlehouseinfo,'pur1_dob',new Date(this.singlehouseinfo.pur1_dob))
          if(this.singlehouseinfo.pur2_dob!=undefined&&this.singlehouseinfo.pur2_dob!=0)
            this.$set(this.singlehouseinfo,'pur2_dob',new Date(this.singlehouseinfo.pur2_dob))
          this.idcard2piclist = this.uploadfileutil.pathstrtofilelist(this.singlehouseinfo.pur2_idcard_pic,this);
          this.idcard1piclist = this.uploadfileutil.pathstrtofilelist(this.singlehouseinfo.pur1_idcard_pic,this);
          return;
        }
        //修改offer   或者    offer视图
        if(flag==5||flag==7){
          this.singlehouseinfo.offerpicfilelist = this.singlehouseinfo.cash_pledge_proof_pic!=undefined&&this.singlehouseinfo.cash_pledge_proof_pic!=""?this.singlehouseinfo.cash_pledge_proof_pic.split(','):[];
          if(this.singlehouseinfo.pur1_dob!=undefined&&this.singlehouseinfo.pur1_dob!=0)
            this.$set(this.singlehouseinfo,'pur1_dob',new Date(this.singlehouseinfo.pur1_dob))
          if(this.singlehouseinfo.pur2_dob!=undefined&&this.singlehouseinfo.pur2_dob!=0)
            this.$set(this.singlehouseinfo,'pur2_dob',new Date(this.singlehouseinfo.pur2_dob))
          this.singlehouseinfo.is_cash_pledge = this.singlehouseinfo.is_cash_pledge.toString();
          this.offerdepositpiclist = this.uploadfileutil.pathstrtofilelist(this.singlehouseinfo.cash_pledge_proof_pic,this);
          this.singlehouseinfo.appliance_package = this.singlehouseinfo.appliance_package.toString();
          this.singlehouseinfo.resident_status = this.singlehouseinfo.resident_status.toString();
          this.singlehouseinfo.offer_date = this.dateutil.timetodate(this.singlehouseinfo.offer_date);
          this.idcard2piclist = this.uploadfileutil.pathstrtofilelist(this.singlehouseinfo.pur2_idcard_pic,this);
          this.idcard1piclist = this.uploadfileutil.pathstrtofilelist(this.singlehouseinfo.pur1_idcard_pic,this);
          return;
        }
        //修改预定的项目
        if(flag==1){
          this.singlehouseinfo.contract_date = this.dateutil.timetodate(this.singlehouseinfo.contract_date)
          this.singlehouseinfo.contract_exchanged_date = this.dateutil.timetodate(this.singlehouseinfo.contract_exchanged_date)
          this.singlehouseinfo.unconditional_date = this.dateutil.timetodate(this.singlehouseinfo.unconditional_date)
          this.singlehouseinfo.pur1_dob = this.dateutil.timetodate(this.singlehouseinfo.pur1_dob)
          if(this.singlehouseinfo.pur2_dob!=undefined)
            this.singlehouseinfo.pur2_dob = this.dateutil.timetodate(this.singlehouseinfo.pur2_dob)
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
          this.singlehouseinfo.last_reserve_time = this.dateutil.timetodate(this.singlehouseinfo.last_reserve_time)
          return;
        }
        //确认定金
        if(flag==2) {
          this.singlehouseinfo.upgrades_cost_on_purchaser = this.datautil.strtonumber(this.singlehouseinfo.upgrades_cost_on_purchaser);
          this.singlehouseinfo.upgrades_cost_on_vendor = this.datautil.strtonumber(this.singlehouseinfo.upgrades_cost_on_vendor);
          this.singlehouseinfo.direct_debit_deposit_received = this.datautil.strtonumber(this.singlehouseinfo.direct_debit_deposit_received);
          this.singlehouseinfo.commission_rate = this.datautil.strtonumber(this.singlehouseinfo.commission_rate);
          this.singlehouseinfo.commission_total_amount = this.datautil.strtonumber(this.singlehouseinfo.commission_total_amount);
          this.singlehouseinfo.acceptable = this.datautil.objtostr(this.singlehouseinfo.acceptable);
          this.$set(this.singlehouseinfo,'deposit_received_date',this.dateutil.timetodate(this.singlehouseinfo.deposit_received_date))
          this.$set(this.singlehouseinfo,'bank_guarantee_issuer',this.dateutil.timetodate(this.singlehouseinfo.bank_guarantee_issuer))
          this.$set(this.singlehouseinfo,'bank_guarantee_expiry',this.dateutil.timetodate(this.singlehouseinfo.bank_guarantee_expiry))
          this.$set(this.singlehouseinfo,'bank_guarantee_received_date',this.dateutil.timetodate(this.singlehouseinfo.bank_guarantee_received_date))
          this.$set(this.singlehouseinfo,'deposit_due_date',this.dateutil.timetodate(this.singlehouseinfo.deposit_due_date))
          this.$set(this.singlehouseinfo,'interest_belong',this.datautil.objtostr(this.singlehouseinfo.interest_belong))
          this.$set(this.singlehouseinfo,'commission_payment_date',this.dateutil.timetodate(this.singlehouseinfo.commission_payment_date))
        }
        //确认尾款
        else if(flag==3){
          this.singlehouseinfo.commission_rate = this.datautil.strtonumber(this.singlehouseinfo.commission_rate);
          this.singlehouseinfo.commission_total_amount = this.datautil.strtonumber(this.singlehouseinfo.commission_total_amount);
          if(this.singlehouseinfo.commission_payment_date!=undefined)
            this.singlehouseinfo.commission_payment_date = this.dateutil.timetodate(this.singlehouseinfo.commission_payment_date);
          if(this.singlehouseinfo.settlement_date!=undefined)
            this.singlehouseinfo.settlement_date = this.dateutil.timetodate(this.singlehouseinfo.settlement_date);
          if(this.singlehouseinfo.settlement_completion!=undefined)
            this.singlehouseinfo.settlement_completion = this.datautil.objtostr(this.singlehouseinfo.settlement_completion);
        }
        //在不是确认定金和确认尾款的情况下可以转换为字符串
        if(flag!=2&&flag!=3){
          this.singlehouseinfo.deposit_received_date = this.dateutil.timetodateymd(this.singlehouseinfo.deposit_received_date)
          this.singlehouseinfo.deposit_due_date = this.dateutil.timetodateymd(this.singlehouseinfo.deposit_due_date)
          this.singlehouseinfo.commission_payment_date = this.dateutil.timetodateymd(this.singlehouseinfo.commission_payment_date)
        }
        this.singlehouseinfo.bank_guarantee_issuer = this.dateutil.timetodateymd(this.singlehouseinfo.bank_guarantee_issuer)
        this.singlehouseinfo.bank_guarantee_expiry = this.dateutil.timetodateymd(this.singlehouseinfo.bank_guarantee_expiry)
        this.singlehouseinfo.bank_guarantee_received_date = this.dateutil.timetodateymd(this.singlehouseinfo.bank_guarantee_received_date)
        this.idcard2piclist = this.singlehouseinfo.pur2_idcard_pic!=undefined&&this.singlehouseinfo.pur2_idcard_pic!=""?this.singlehouseinfo.pur2_idcard_pic.split(','):[];
        this.idcard1piclist = this.singlehouseinfo.pur1_idcard_pic!=undefined&&this.singlehouseinfo.pur1_idcard_pic!=""?this.singlehouseinfo.pur1_idcard_pic.split(','):[];
        this.singlehouseinfo.contract_date = this.dateutil.timetodateymd(this.singlehouseinfo.contract_date)
        this.singlehouseinfo.contract_exchanged_date = this.dateutil.timetodateymd(this.singlehouseinfo.contract_exchanged_date)
        this.singlehouseinfo.unconditional_date = this.dateutil.timetodateymd(this.singlehouseinfo.unconditional_date)
        this.singlehouseinfo.pur1_dob = this.dateutil.timetodateymd(this.singlehouseinfo.pur1_dob)
        this.singlehouseinfo.pur2_dob = this.dateutil.timetodateymd(this.singlehouseinfo.pur2_dob)
        this.singlehouseinfo.last_reserve_time = this.dateutil.timetodateymd(this.singlehouseinfo.last_reserve_time)
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
      offerdeposituploadsuccess(response, file, fileList){
        this.offerdepositpiclist = fileList;
      },
      offerdeposithandleRemove(file, fileList) {
        this.offerdepositpiclist = fileList;
      },
      idcard1uploadsuccess(response, file, fileList){
        this.idcard1piclist = fileList;
      },
      idcard1handleRemove(file, fileList) {
        this.idcard1piclist = fileList;
      },
      idcard2uploadsuccess(response, file, fileList){
        this.idcard2piclist = fileList;
      },
      idcard2handleRemove(file, fileList) {
        this.idcard2piclist = fileList;
      },
      uploadsuccess(response, file, fileList){
        this.housetypepiclist = fileList;
      },
      handleRemove(file, fileList) {
        this.housetypepiclist = fileList;
      },

      tableheaderClassName({row, column, rowIndex, columnIndex}) {
        if(column.label=='Edit Offer Reserve'||column.label=='Offer Reserve&Release'||column.label=='Edit Offer'||column.label=='Look Offer'||column.label=='Create Offer'||column.label=='Edit Reserve'||column.label=='View'||column.label=='Lock'||column.label=='Reserve&Release'||column.label=='Deposit'||column.label=='Final Payment'||column.label=='Map'||column.label=='Edit'||column.label=='Release')
          return 'table-operate-header-cell';
        if(column.label=='TOTAL AREA(INTERNAL APPROX+BALCONY)'||column.label=='STUDY'||column.label=='PROJECT NAME'||column.label=='LOT SIZE'||column.label=='Status'||column.label=='DEPOSIT HAS BEEN PAID')
          return 'table-header-cell-1';
        if(column.label=='PASS'||column.label=='LAST EDITSTATUS TIME'||column.label=='BATH'||column.label=='SALES PRICE'||column.label=='PUR1_EMAIL')
          return 'table-header-cell-4';
        if(column.label=='BED'||column.label=='LOT NO'||column.label=='LOT_NO')
          return 'table-header-cell-3';
        if(column.label=='CARPARK'||column.label=='LOT SIZE'||column.label=='PUR1_NAME'||column.label=='OFFER_PRICE')
          return 'table-header-cell-2';
      },
      tableClassName({ row, column, rowIndex, columnIndex}){
        if(column.label=='Edit Offer Reserve'||column.label=='Offer Reserve&Release'||column.label=='Edit Offer'||column.label=='Look Offer'||column.label=='Create Offer'||column.label=='Edit Reserve'||column.label=='View'||column.label=='Lock'||column.label=='Reserve&Release'||column.label=='Deposit'||column.label=='Final Payment'||column.label=='Map'||column.label=='Edit'||column.label=='Release')
          return 'table-operate-cell';
        if(column.label=='TOTAL AREA(INTERNAL APPROX+BALCONY)'||column.label=='STUDY'||column.label=='PROJECT NAME'||column.label=='LOT SIZE'||column.label=='Status'||column.label=='DEPOSIT HAS BEEN PAID')
          return 'table-cell-1';
        if(column.label=='PASS'||column.label=='LAST EDITSTATUS TIME'||column.label=='BATH'||column.label=='SALES PRICE'||column.label=='PUR1_EMAIL')
          return 'table-cell-4';
        if(column.label=='BED'||column.label=='LOT NO'||column.label=='LOT_NO')
          return 'table-cell-3';
        if(column.label=='CARPARK'||column.label=='LOT SIZE'||column.label=='PUR1_NAME'||column.label=='OFFER_PRICE')
          return 'table-cell-2';
      },
      mountedmethod(){
        this.VerifyUser();
        this.SearchProjectInfoIdAndName();
        this.SearchHouseAllInfoList();
      },
      /*修改项目回显*/
      SearchHouseByidUseEdit(edithouseid){
        this.SearchProjectInfoIdAndName();
        var param = {
          id:edithouseid,
        }
        let res = this.requestutil.ajax('/SearchHouseByid', param, false,this);
        if (res.statuscode < 0){
          return;
        }
        this.edithouseformdata = JSON.parse(res.message);
//        this.edithouseformdata.project_id = this.edithouseformdata.project_id.toString();
        this.edithouseformdata.type = this.edithouseformdata.type.toString();
        if(this.edithouseformdata.orientation!=undefined)
          this.edithouseformdata.orientation =this.edithouseformdata.orientation.toString();
        if(this.edithouseformdata.property_category!=undefined)
          this.edithouseformdata.property_category =this.edithouseformdata.property_category.toString();
        //编辑项目时展示户型图
        this.housetypepiclist = this.uploadfileutil.pathstrtofilelist(this.edithouseformdata.house_type_pic,this);
      },
      /*确认尾款*/
      receivedbalancepayment(formName,flag){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.singlehouseinfo.flag=flag;
            this.singlehouseinfo.commission_payment_date = this.dateutil.datetotime(this.singlehouseinfo.commission_payment_date);
            this.singlehouseinfo.settlement_date = this.dateutil.datetotime(this.singlehouseinfo.settlement_date);
            this.singlehouseinfo.settlement_completion = this.singlehouseinfo.settlement_completion.toString();
            var res = this.requestutil.ajax('/ReceivedBalancepayment', this.singlehouseinfo, true, this);
            if(res.statuscode>=0){
              this.showconfirmDepositorbalancepaymentdialog = false;
              this.SearchHouseAllInfoList(1);
            }
          }
        });

      },

      /**确认定金   flag:0确认定金   1：保存相关信息不确认定金*/
      ConfirmReceiptOfDeposit(formName,flag){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.singlehouseinfo.deposit_received_date = this.dateutil.datetotime(this.singlehouseinfo.deposit_received_date);
            this.singlehouseinfo.bank_guarantee_issuer = this.dateutil.datetotime(this.singlehouseinfo.bank_guarantee_issuer);
            this.singlehouseinfo.bank_guarantee_expiry = this.dateutil.datetotime(this.singlehouseinfo.bank_guarantee_expiry);
            this.singlehouseinfo.bank_guarantee_received_date = this.dateutil.datetotime(this.singlehouseinfo.bank_guarantee_received_date);
            this.singlehouseinfo.deposit_due_date = this.dateutil.datetotime(this.singlehouseinfo.deposit_due_date);
            this.singlehouseinfo.commission_payment_date = this.dateutil.datetotime(this.singlehouseinfo.commission_payment_date);

            this.singlehouseinfo.flag=flag;
            var res = this.requestutil.ajax('/ConfirmReceiptOfDeposit', this.singlehouseinfo, true, this);
            if(res.statuscode>=0){
              this.showconfirmDepositorbalancepaymentdialog = false;
              this.SearchHouseAllInfoList(1);
            }
          }
        });

      },
      SearchProjectSalesPOJOByProjectIdUseDeposit(){
        var param = {
          project_id: this.currentreceiveddepositprojectid,
        }
        var res = this.requestutil.ajax('/SearchProjectSalesPOJOByProjectId', param, false,this);
        if (res.statuscode >= 0){
          this.depositformdata = JSON.parse(res.message);
          if(this.depositformdata.acceptable!=undefined)
            this.depositformdata.acceptable = this.depositformdata.acceptable.toString();
          this.depositformdata.interest_belong = this.depositformdata.interest_belong.toString();
          this.$set(this.depositformdata,'commission_payment_datedate',new Date(this.depositformdata.commission_payment_date))
          this.$set(this.depositformdata,'deposit_received_datedate',new Date(this.depositformdata.deposit_received_date))
          this.$set(this.depositformdata,'deposit_due_datedate',new Date(this.depositformdata.deposit_due_date))
          this.$set(this.depositformdata,'bank_guarantee_issuerdate',new Date(this.depositformdata.bank_guarantee_issuer))
          this.$set(this.depositformdata,'bank_guarantee_received_datedate',new Date(this.depositformdata.bank_guarantee_received_date))
          this.$set(this.depositformdata,'bank_guarantee_expirydate',new Date(this.depositformdata.bank_guarantee_expiry))
        }
      },
      VerifyUser: function () {
        this.conditionparam.status = undefined;
        //获取url参数来判定是不是中介员工点击了我的项目
        this.ismyproject = this.$route.query.myproject;
        this.isfinance = this.$route.query.finance;
        var res = this.requestutil.ajax('/VerifyUser', null, true, this);
        if (res.statuscode < 0)
          return;
        let message = JSON.parse(res.message);
        this.currentaccountinfo = message;
        //如果是厚易账号且要进入我的项目会直接到登录页面

        if (message.AccountType != 2 && this.ismyproject) {
          this.$goRoute('/login');
        }
        this.$store.state.author = message.Name;

        //如果是中介的话  可选择的状态要控制    查看的列要控制   按钮的显示要控制   查询条件的文本框要控制
        if (message.AccountType != 0) {
            //判定信息是否已经完善
          this.VerifyInfoFull();
          //设置可以展示的状态
          this.conditionparam.allstatus = "0,1,3,5";
          this.showconditiondiv = true;

          //不可显示锁定项目
          this.showLockHouse = false;
          //不可显示编辑项目
          this.showEditHouse = false;
          //显示预定项目
          this.showreserverelease = true;
          //不可显示创建项目
          this.showCreateHouse = false;
          if(message.AccountType == 1){
            this.ReserveReleaseTitle = 'Release';
            this.showeditreserve = false;
          }else if(message.AccountType == 2){
            this.ReserveReleaseTitle = 'Reserve&Release';
            this.showcreateoffer = true;
            this.showlookoffer = true;
            this.showeditreserve = true;
          }
          //查询条件中展示的status  将状态指定为
          this.statusoptions = [
            {
              value: '0,1,3,5',
              label: 'ALLSTATUS'
            },{
              value: 0,
              label: 'AVAILABLE'
            }, {
              value: 1,
              label: 'RESERVED'
            }, {
              value: 3,
              label: 'SETTLED'
            }, {
              value: 5,
              label: 'OFFERED'
            }
          ];
          if (this.ismyproject) {
            this.conditionparam.status = 1;
            this.conditionparam.allstatus = "1,3,5";
            //已被预订   已经出售
            this.statusoptions = [
              {
                value: '1,3,5',
                label: 'ALLSTATUS'
              },
              {
                value: 1,
                label: 'RESERVED'
              }, {
                value: 3,
                label: 'SETTLED'
              }, {
                value: 5,
                label: 'OFFERED'
              }
            ];
          }
        }
        //如果是厚易管理员账号
        else if (message.Role == 0) {
          this.showreserve = false;
          //显示条件
          this.showcondition.lot_NO = false;
          //设置可以展示的状态
          this.conditionparam.allstatus = "0,1,2,3,4,5";
          //不可显示锁定项目
          this.showLockHouse = true;
          //不可显示编辑项目
          this.showEditHouse = true;
          //不可显示创建项目
          this.showCreateHouse = true;
          this.statusoptions = [
            {
              value: '0,1,2,3,4,5',
              label: 'ALLSTATUS'
            },
            {
              value: 0,
              label: 'AVAILABLE'
            }, {
              value: 1,
              label: 'RESERVED'
            }, {
              value: 2,
              label: 'SOLD'
            }, {
              value: 3,
              label: 'SETTLED'
            }, {
              value: 4,
              label: 'LOKED'
            }, {
              value: 5,
              label: 'OFFERED'
            }
          ]
        }
        //厚易财务账号
        else if (message.Role == 1) {
          this.$goRoute('/home/house', {finance: true});
          this.showCreateHouse = false;
          this.showEditHouse = false;
          this.showLockHouse = false;
          this.showdeposit = true;
          this.showfinalpayment = true;
          this.conditionparam.allstatus = "0,1,2,3,4,5";
          this.conditionparam.status = '0,1,2,3,4,5';
          this.showlookoffer = true;
          this.statusoptions = [
            {
              value: '0,1,2,3,4,5',
              label: 'ALLSTATUS'
            },
            {
              value: '1,2',
              label: 'RESERVED&SOLD'
            },
            {
              value: 0,
              label: 'AVAILABLE'
            }, {
              value: 1,
              label: 'RESERVED'
            }, {
              value: 2,
              label: 'SOLD'
            }, {
              value: 3,
              label: 'SETTLED'
            }, {
              value: 4,
              label: 'LOKED'
            }, {
              value: 5,
              label: 'OFFERED'
            }
          ]
        }
      },
      SearchHouseAllInfoList: function (currentpage) {
        if(currentpage!=undefined)
          this.currentpage = currentpage;
        this.conditionparam.myproject = false;
        if (this.conditionparam.status != undefined) {
          this.conditionparam.statuss = this.conditionparam.status;
        } else {
          this.conditionparam.statuss = this.conditionparam.allstatus;
        }
        if (this.ismyproject) {
          this.conditionparam.myproject = true;
        }
        //计算跳过多少行
        this.conditionparam.skip = (this.currentpage - 1) * this.conditionparam.count;
        var res = this.requestutil.ajax('/SearchHouseAllInfoList', this.conditionparam, false,this);
        if (res.statuscode >= 0) {
          var message = JSON.parse(res.message);
          this.totalcount = message.totalcount;
          this.datalist = message.datalist;
          for(var i=0;i<message.datalist.length;i++){
            this.datalist[i].last_editstatus_time =  this.dateutil.timetodateymd(this.datalist[i].last_editstatus_time);
          }


        }else if (res.statuscode < 0) {
          this.totalcount = 0;
          this.datalist = [];
        }
      },
      //锁定解锁项目
      LockUnlockHouse: function () {
        this.showLockHouseDialog = false;
        let param = {
          id: this.currentlockid,
          islock: this.currentislock
        }
        var res = this.requestutil.ajax('/LockUnlockHouse', param, true, this);
        this.SearchHouseAllInfoList(1);
      },
      //获取当前页
      handleCurrentChange(val) {
        this.currentpage = val;

      },
      CreateHouseInfo(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.createhouseformdata.house_type_pic = this.uploadfileutil.filelisttopathstr(this.housetypepiclist);
            var res = this.requestutil.ajax('/CreateHouseInfo', this.createhouseformdata, true, this);
            if(res.statuscode>=0){
              this.createhouseformdata = {
                status:'0',
              };
              this.housetypepiclist = [];
              this.showcreatehousedialog = false;
              this.SearchHouseAllInfoList(1);
              this.TabsactiveName = 'one';
            }
          }
        });

      },
      EditHouseInfo(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //时间转换为时间戳
            this.edithouseformdata.house_type_pic = this.uploadfileutil.filelisttopathstr(this.housetypepiclist);
            var res = this.requestutil.ajax('/EditHouseInfo', this.edithouseformdata, true, this);
            if(res.statuscode>=0){
              this.housetypepiclist = [];
              this.edithouseformdata = {};
              this.showedithousedialog = false;
              this.SearchHouseAllInfoList(1);
              this.TabsactiveName = 'one';
            }
          }
        });
      },
      ChangeOfferedorPass(flag){
        //flag 0：offered   1:pass
        var param={
          house_id:this.singlehouseinfo.id,
          purchaser_random:this.singlehouseinfo.purchaser_random,
          flag:flag,
        }
        var res = this.requestutil.ajax('/ChangeOfferedorPass', param, true, this);
        if(res.statuscode>=0){
          this.singlehouseinfo = {};
          this.showcreateeditofferdialog = false;
          this.offerdepositpiclist=[];
          this.singleHouseOfferlist = [];
          this.showsinglehouseallofferdialog= false;
          this.SearchHouseAllInfoList(1);
        }

      },
      CreateEditOffer(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.singlehouseinfo.cash_pledge_proof_pic = this.uploadfileutil.filelisttopathstr(this.offerdepositpiclist);
            this.singlehouseinfo.pur1_dob = this.dateutil.datetotime(this.singlehouseinfo.pur1_dob);
            this.singlehouseinfo.pur2_dob = this.dateutil.datetotime(this.singlehouseinfo.pur2_dob);
            this.singlehouseinfo.offer_date = this.dateutil.datetotime(this.singlehouseinfo.offer_date);
            this.singlehouseinfo.pur1_idcard_pic = this.uploadfileutil.filelisttopathstr(this.idcard1piclist);
            this.singlehouseinfo.pur2_idcard_pic = this.uploadfileutil.filelisttopathstr(this.idcard2piclist);
            this.singlehouseinfo.house_id=this.singlehouseinfo.id;
            this.singlehouseinfo.flag = this.createoreditofferflag;
            var res;
            if(this.createoreditofferflag==4||this.createoreditofferflag==6)
              res = this.requestutil.ajax('/CreateOffer', this.singlehouseinfo, true, this);
            if(this.createoreditofferflag==5){
              res = this.requestutil.ajax('/EditOffer', this.singlehouseinfo, true, this);
            }
            var house_id = this.singlehouseinfo.id;
            if(res.statuscode>=0){
              if(this.createoreditofferflag==5)
                this.SearchOfferList(this.singlehouseinfo.house_id);
              this.singlehouseinfo = {};
              this.showcreateeditofferdialog = false;
              this.offerdepositpiclist=[];
              this.idcard1piclist = [];
              this.idcard2piclist = [];
            }
          }else{
            this.$message({
              showClose: true,
              message: 'Wrong from,Please check it.',
              type: 'error'
            });
          }
        });
      },
      //预定项目
      ReserveHouse(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.singlehouseinfo.house_id = this.currentreservehouseid;
            this.singlehouseinfo.contract_date = this.dateutil.datetotime(this.singlehouseinfo.contract_date);
            this.singlehouseinfo.contract_exchanged_date = this.dateutil.datetotime(this.singlehouseinfo.contract_exchanged_date);
            this.singlehouseinfo.unconditional_date = this.dateutil.datetotime(this.singlehouseinfo.unconditional_date);
            this.singlehouseinfo.pur1_dob = this.dateutil.datetotime(this.singlehouseinfo.pur1_dob);
            this.singlehouseinfo.pur2_dob = this.dateutil.datetotime(this.singlehouseinfo.pur2_dob);
            this.singlehouseinfo.pur1_idcard_pic = this.uploadfileutil.filelisttopathstr(this.idcard1piclist);
            this.singlehouseinfo.pur2_idcard_pic = this.uploadfileutil.filelisttopathstr(this.idcard2piclist);
            this.singlehouseinfo.last_reserve_time = this.dateutil.datetotime(this.singlehouseinfo.last_reserve_time);
            var res ;
            if(this.reserveoreditreservehouseflag==0&&this.isofferreserved){
              res = this.requestutil.ajax('/OfferReserveHouse', this.singlehouseinfo, true, this);
            }else if(this.reserveoreditreservehouseflag==0){
              res = this.requestutil.ajax('/ReserveHouse', this.singlehouseinfo, true, this);
            }
            if(this.reserveoreditreservehouseflag==1&&this.isofferreserved){
              res = this.requestutil.ajax('/EditOfferReserveHouse', this.singlehouseinfo, true, this);
            }else if(this.reserveoreditreservehouseflag==1){
              res = this.requestutil.ajax('/EditReserveHouse', this.singlehouseinfo, true, this);
            }
            if(res.statuscode>=0){
              this.singlehouseinfo = {};
              this.idcard1piclist = [];
              this.idcard2piclist = [];
              this.showreservehousedialog = false;
              this.isofferreserved=false;
              this.SearchHouseAllInfoList(1);
            }
          }else{
              this.$message({
              showClose: true,
              message: 'Wrong from,Please check it.',
              type: 'error'
            });
        }
      });
      },
      //释放项目
      ReleaseHouse(){
        if(this.releasehouseDescription==''){
          this.$message({
            message: 'Description cannot be empty.',
            type: 'warning'
          });
          return;
        }
        this.showreleasehousedialog = false;
        var param = {
          house_id: this.currentreleasehouseid,
          description: this.releasehouseDescription
        };
        var res = this.requestutil.ajax('/ReleaseHouse', param, true, this);
        this.SearchHouseAllInfoList(1);
      }

    },
    mounted(){
      this.VerifyUser();
      this.SearchProjectInfoIdAndName();
      this.SearchHouseAllInfoList();
    },
    created(){

    }
  };
</script>

<style >
  @import '../assets/iconfont/iconfont.css';
  @import '../../static/css/modulestyle.css';

  .housepage .el-pagination{
    margin: 0px auto;
    float: right;
  }

  .housepage .el-input__inner{
    height: 38px;
  }
  .housepage .search-condition{
    padding:20px 20px 0px 10px;
  }
  .housepage .el-form-item{
    margin-left: 20px;
  }
  .housepage .handle-button{
    right: 40px;
    position: absolute;
  }
  .housepage .handle-button button{
    background: #2C75B8;
    color: #FFFFFF;
    font-family:PingFangSC-Semibold;
  }
  .housepage .data-table{
    margin: 50px 10px 10px 10px;
  }
  .housepage .el-table .warning-row {
    background: oldlace;
  }

  .housepage .el-table .success-row {
    background: #f0f9eb;
  }

  /*这个是斑马线的颜色*/
  /*.el-table--striped .el-table__body tr.el-table__row--striped td{
    background: #F3F3F3;
  }*/

  .housepage .el-table td, .el-table th{
    padding: 5px;
  }


  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .singleprojectdialog .el-dialog{
    width:1100px;
  }
  .housepage .createproject-dialog .el-dialog,.housepage .editproject-dialog .el-dialog{
    width:800px;
  }

  .housepage .view-dialog .el-tab-pane{
    overflow-y: scroll;
    height:400px;
    width: 780px;
  }
  .reserveproject-dialog .el-tab-pane{
    overflow-y: scroll;
    height:350px;
    width: 800px;
  }
  .confirmproject-dialog .el-tab-pane{
    overflow-y: scroll;
    height:350px;
    width: 800px;
  }
  .housepage .createproject-dialog .el-tab-pane,.housepage .editproject-dialog .el-tab-pane{
    overflow-y: scroll;
    height:350px;
    width: 540px;
  }
  .confirmproject-dialog .el-carousel__container,.reserveproject-dialog  .el-carousel__container{
    height: 350px;
  }

  .view-dialog .el-carousel__item,.confirmproject-dialog .el-carousel__item,.reserveproject-dialog .el-carousel__item{
    background-color:#fff;
  }
  .view-dialog .el-carousel__container{
    height:400px;
  }
  .reserveproject-dialog .el-tabs__content{
    width:800px;
  }

</style>
