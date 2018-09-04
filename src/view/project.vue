<template>
  <div class="projectpage">
    <div class="search-condition">
      <el-form :inline="true" :model="conditionparam" class="demo-form-inline">
        <el-form-item>
          <el-select  class="D0E8F2-input" v-model="conditionparam.name" placeholder="PROJECT NAME">
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
          <el-input class="EFF2CF-input" v-model="conditionparam.address" placeholder="ADDRESS"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="handle-button">
      <el-button size="small" type="primary" @click="showcreateprojectdialog=true"  icon="el-icon-plus">Create Project</el-button>
      <el-button size="small" type="primary" icon="el-icon-search" @click="SearchProjectInfoList(1)">Search</el-button>
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
          label="Picture"
          width="70">
          <template slot-scope="scope">
            <i title="Project Picture" v-if="scope.row.showproject_pic" class="iconfont icon-chakan" @click="showprojectpicture(scope.row.project_pic)" style="color: #997D45;cursor: pointer"></i>
          </template>
        </el-table-column>
        <el-table-column
          label="Edit Project Code"
          width="200">
          <template slot-scope="scope">
            <el-select v-model="viewNO" placeholder="Select the code type" @change="$goRoute('/home/editprojectwebcode',{project_id:scope.row.id,viewNO:viewNO})">
              <el-option value="00" label="project_overview_code"></el-option>
              <el-option value="01"  label="project_overview_code_CN"></el-option>
              <el-option value="10"  label="project_architecture_code"></el-option>
              <el-option value="11"  label="project_architecture_code_CN"></el-option>
              <el-option value="20"  label="project_exterior_code"></el-option>
              <el-option value="21"  label="project_exterior_code_CN"></el-option>
              <el-option value="30"  label="project_environment_code"></el-option>
              <el-option value="31"  label="project_environment_code_CN"></el-option>
              <el-option value="40"  label="project_progress_code"></el-option>
              <el-option value="41"  label="project_progress_code_CN"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          label="Edit"
          width="60">
          <template slot-scope="scope">
            <i title="Edit Project" class="iconfont icon-edit" @click="showeditprojectdialog=true,SearchProjectByidUseEdit(scope.row.id)" style="color: #997D45;cursor: pointer"></i>
          </template>
        </el-table-column>
        <el-table-column
          label="Map"
          width="60">
          <template slot-scope="scope">
            <i title="Map" class="iconfont icon-dingwei" @click="openmap(scope.row.id)"  style="color: #7ED321;cursor: pointer"></i>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="NAME">
        </el-table-column>
        <el-table-column
          prop="address"
          label="ADDRESS">
        </el-table-column>
        <el-table-column
          prop="intro"
          label="INTRO">
        </el-table-column>
        <el-table-column
          prop="sunset_date"
          label="SUNSET_DATE">
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

    <!--创建项目-->
    <el-dialog @close="closedialog('createprojectformref')"  class="form-dialog createproject-dialog" title="Create Project" :visible.sync="showcreateprojectdialog">
      <el-form :model="createprojectformdata" ref="createprojectformref" label-width="200px">
        <el-tabs  style="height: 400px;" tab-position="left" v-model="TabsactiveName" >
          <!--项目基础信息-->
          <el-tab-pane label="PROJECT INFO" name="one">

            <el-form-item
              label="PROJECT NAME_EN"
              prop="name"
              :rules="[
                  { required: true, message: 'The project name_EN cannot be empty.', trigger: 'blur' },
                ]"
            >
              <el-input class="EFF2CF-input" placeholder="PROJECT NAME" v-model="createprojectformdata.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="PROJECT NAME_CN"
              prop="name_CN"
              :rules="[
                  { required: true, message: 'The project name_CN cannot be empty.', trigger: 'blur' },
                ]"
            >
              <el-input class="EFF2CF-input" placeholder="PROJECT NAME" v-model="createprojectformdata.name_CN" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="PROJECT ADDRESS_EN"
              prop="address"
              :rules="[
                  { required: true, message: 'The address_EN cannot be empty.', trigger: 'blur' },
                ]"
            >
              <el-input  class="F4EAD5-input" placeholder="PROJECT ADDRESS" v-model="createprojectformdata.address" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="PROJECT ADDRESS_CN"
              prop="address_CN"
              :rules="[
                  { required: true, message: 'The address_CN cannot be empty.', trigger: 'blur' },
                ]"
            >
              <el-input  class="F4EAD5-input" placeholder="PROJECT ADDRESS" v-model="createprojectformdata.address_CN" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="INTRO_EN"
              prop="intro"
              :rules="[
                  { required: true, message: 'The intro_EN cannot be empty.', trigger: 'blur' },
                ]"
            >
              <el-input class="D0E8F2-input" placeholder="INTRO" v-model="createprojectformdata.intro" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="INTRO_CN"
              prop="intro_CN"
              :rules="[
                  { required: true, message: 'The intro_CN cannot be empty.', trigger: 'blur' },
                ]"
            >
              <el-input class="D0E8F2-input" placeholder="INTRO" v-model="createprojectformdata.intro_CN" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="PROJECT_LINK"
              prop="project_link"
            >
              <el-input class="D0E8F2-input" placeholder="PROJECT_LINK" v-model="createprojectformdata.project_link" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item
              label="SUNSET DATE"
              prop="sunset_date"
              :rules="[
                  { required: true, message: 'The sunset date cannot be empty.', trigger: 'change' },
                ]"
            >
              <el-date-picker
                class="FBF0EC-input"
                v-model="createprojectformdata.sunset_date"
                type="date"
                placeholder="SUNSET DATE">
              </el-date-picker>
            </el-form-item>
            <el-form-item
              label="PROJECT LOGO(One picture at most)"
            >
              <el-upload
                :action=$store.state.serveruploadpicsrc
                :on-success="uploadlogosuccess"
                list-type="picture-card"
                :with-credentials="true"
                :file-list="projectweblogopic"
                :on-remove="removelogopic"
                :limit="1"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
            <el-form-item
              label="PROJECT BANNER(One picture at most)"
            >
              <el-upload
                :action=$store.state.serveruploadpicsrc
                :on-success="uploadbannersuccess"
                list-type="picture-card"
                :file-list="projectwebbannerpic"
                :with-credentials="true"
                :on-remove="removebannerpic"
                :limit="1"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane label="PROJECT PICTURE" name="two">
            <el-form-item>
              <el-upload
                :action=$store.state.serveruploadpicsrc
                :on-success="uploadsuccess"
                :file-list="projectpiclist"
                list-type="picture-card"
                :with-credentials="true"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
        <el-form-item  class="form-dialog-footer">
          <span class="el-dialog__footer-btn" @click="createprojectformdata={}">Reset</span>
          <span class="el-dialog__footer-btn" @click="CreateProjectInfo('createprojectformref')">Save</span>
        </el-form-item>
      </el-form>
    </el-dialog>


    <!--修改项目-->
    <el-dialog @close="closedialog('editprojectformref')" class="form-dialog createproject-dialog" title="Edit Project" :visible.sync="showeditprojectdialog">
      <el-form :model="editprojectformdata" ref="editprojectformref" label-width="200px">
        <el-tabs  style="height: 400px;" tab-position="left" v-model="TabsactiveName" >
          <!--项目基础信息-->
          <el-tab-pane label="PROJECT INFO" name="one">

            <el-form-item
              label="PROJECT NAME_EN"
              prop="name"
              :rules="[
                  { required: true, message: 'The project name_EN cannot be empty.', trigger: 'blur' },
                ]"
            >
              <el-input class="EFF2CF-input" placeholder="PROJECT NAME" v-model="editprojectformdata.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="PROJECT NAME_CN"
              prop="name_CN"
              :rules="[
                  { required: true, message: 'The project name_CN cannot be empty.', trigger: 'blur' },
                ]"
            >
              <el-input class="EFF2CF-input" placeholder="PROJECT NAME" v-model="editprojectformdata.name_CN" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="PROJECT ADDRESS_EN"
              prop="address"
              :rules="[
                  { required: true, message: 'The address_EN cannot be empty.', trigger: 'blur' },
                ]"
            >
              <el-input  class="F4EAD5-input" placeholder="PROJECT ADDRESS" v-model="editprojectformdata.address" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="PROJECT ADDRESS_CN"
              prop="address_CN"
              :rules="[
                  { required: true, message: 'The address_CN cannot be empty.', trigger: 'blur' },
                ]"
            >
              <el-input  class="F4EAD5-input" placeholder="PROJECT ADDRESS" v-model="editprojectformdata.address_CN" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="INTRO_EN"
              prop="intro"
              :rules="[
                  { required: true, message: 'The intro_EN cannot be empty.', trigger: 'blur' },
                ]"
            >
              <el-input class="D0E8F2-input" placeholder="INTRO" v-model="editprojectformdata.intro" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="INTRO_CN"
              prop="intro_CN"
              :rules="[
                  { required: true, message: 'The intro_CN cannot be empty.', trigger: 'blur' },
                ]"
            >
              <el-input class="D0E8F2-input" placeholder="INTRO" v-model="editprojectformdata.intro_CN" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="PROJECT_LINK"
              prop="project_link"
            >
              <el-input class="D0E8F2-input" placeholder="PROJECT_LINK" v-model="editprojectformdata.project_link" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="SUNSET DATE"
              prop="sunset_date"
              :rules="[
                  { required: true, message: 'The sunset date cannot be empty.', trigger: 'change' },
                ]"
            >
              <el-date-picker
                class="FBF0EC-input"
                v-model="editprojectformdata.sunset_date"
                type="date"
                placeholder="SUNSET DATE">
              </el-date-picker>
            </el-form-item>
            <el-form-item
              label="PROJECT LOGO(One picture at most)"
            >
              <el-upload
                :action=$store.state.serveruploadpicsrc
                :on-success="uploadlogosuccess"
                list-type="picture-card"
                :file-list="projectweblogopic"
                :with-credentials="true"
                :on-remove="removelogopic"
                :limit="1"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
            <el-form-item
              label="PROJECT BANNER(One picture at most)"
            >
              <el-upload
                :action=$store.state.serveruploadpicsrc
                :on-success="uploadbannersuccess"
                list-type="picture-card"
                :file-list="projectwebbannerpic"
                :with-credentials="true"
                :on-remove="removebannerpic"
                :limit="1"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>


          </el-tab-pane>
          <el-tab-pane label="PROJECT PICTURE" name="three">
            <el-form-item>
              <el-upload
                :action=$store.state.serveruploadpicsrc
                :on-success="edituploadsuccess"
                :file-list="editprojectpiclist"
                list-type="picture-card"
                :with-credentials="true"
                :on-remove="editprojecthandleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
        <el-form-item  class="form-dialog-footer">
          <span class="el-dialog__footer-btn" @click="editprojectformdata={}">Reset</span>
          <span class="el-dialog__footer-btn" @click="EditProjectInfo('editprojectformref')">Save</span>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="Project Picture" class="projectpic-dialog" :visible.sync="showprojectpicturedialog">
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="item in projectpiclist" :key="item">
          <img style="width: auto ; height: 100%; display: block; margin: 0 auto" :src=$store.state.imgpath+item />
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
    <!--锁定项目-->
    <!--<el-dialog title="Tips" class="lockproject-dialog" :visible.sync="showLockProjectDialog" height="15%">
      <span>{{showdata}}</span>
      <div slot="footer" class="dialog-footer">
        <span class="el-dialog__footer-btn" @click="LockUnlockProject()">Affirm</span>
        <span class="el-dialog__footer-btn" @click="showLockProjectDialog = false">Cancel</span>
      </div>
    </el-dialog>-->

  </div>
</template>

<script>
  import md5util from '../util/md5util.js'
  import UEditor from '../components/ueditor/ueditor.vue'
  export default {
    name: '',
    components: {UEditor},
    data () {
      return {
        ueconfig: {
          //可以在此处定义工具栏的内容
          // toolbars: [
          //  ['fullscreen', 'undo', 'redo','|','bold', 'italic', 'underline',
          //  '|','superscript','subscript','|', 'insertorderedlist', 'insertunorderedlist',
          //  '|','fontfamily','fontsize','justifyleft','justifyright','justifycenter','justifyjustify']
          // ],
          autoHeightEnabled: false,
          autoFloatEnabled: true,
          initialContent:'请输入内容',   //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
          autoClearinitialContent:true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
          initialFrameWidth: null,
          initialFrameHeight: 450,
          BaseUrl: '',
          UEDITOR_HOME_URL: 'static/ueditor/'
        },
        showLockProjectDialog:false,
        editprojectpiclist:[],
        TabsactiveName: 'one',
        showcreateprojectdialog:false,
        showeditprojectdialog:false,
        showprojectpicturedialog:false,
        datalist:[],
        currentpage:1,
        totalcount:0,
        conditionparam:{
          count:10,
        },
        createprojectformdata:{},
        projectpiclist:[],
        editprojectformdata:{},
        currentlockid:undefined,
        currentislock:0,
        projectidandnamearray:[],
        projectweblogopic:[],
        projectwebbannerpic:[],
        viewNO:'',
      }
    },
    watch: {
      //element ui 的分页有bug  不能再handlecurrentpage中调用查询   只能监听currentpage的变化来查询
      currentpage:{
        handler:function(val,oldval){
          this.SearchProjectInfoList();
        },
        deep:true//对象内部的属性监听，也叫深度监听
      },
    },
    mounted(){
      this.Verify();
      this.SearchProjectInfoIdAndName();
      this.SearchProjectInfoList();
    },
    methods: {
      //获取文档内容
      getContent: function(){
        let content = this.$refs.ueditor.getUEContent();
        console.log(content);
        alert(content);
      },
      SearchProjectInfoIdAndName(){
        if(this.projectidandnamearray.length!=0)
          return;
        let res = this.requestutil.ajax('/SearchProjectInfoIdAndName', null, false,this);
        this.projectidandnamearray = res.message;
      },
      showprojectpicture(project_pic){
        this.projectpiclist = [];
        this.projectpiclist = project_pic!=undefined&&project_pic!=""?project_pic.split(','):[];
        this.showprojectpicturedialog = true;
      },
      //锁定解锁项目
      LockUnlockProject: function () {
        this.showLockProjectDialog = false;
        let param = {
          id: this.currentlockid,
          islock: this.currentislock
        }
        var res = this.requestutil.ajax('/LockUnlockProject', param, true, this);
        this.SearchProjectAllInfoList(1);
      },
      openmap(projectid){
        window.open("/googlemap/ProjectDetails.html?id="+projectid);
      },
      EditProjectInfo(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //时间转换为时间戳
            this.editprojectformdata.sunset_date = this.dateutil.datetotime(this.editprojectformdata.sunset_date);
            this.editprojectformdata.project_pic = this.uploadfileutil.filelisttopathstr(this.editprojectpiclist);
            this.editprojectformdata.project_logo =this.uploadfileutil.filelisttopathstr(this.projectweblogopic);
            this.editprojectformdata.project_banner =this.uploadfileutil.filelisttopathstr(this.projectwebbannerpic);
            var res = this.requestutil.ajax('/EditProjectInfo', this.editprojectformdata, true, this);
            if(res.statuscode>=0){
              this.editprojectformdata = {};
              this.showeditprojectdialog = false;
              this.SearchProjectInfoList(1);
              this.TabsactiveName = 'one';
            }
          }
        });
      },
      closedialog(formName){
        this.projectpiclist = [];
        this.projectweblogopic =[];
        this.projectwebbannerpic =[];
        var dom = this.$refs[formName];
        if(dom!=undefined){
          if (Array.isArray(dom)) dom = dom[0];
          dom.resetFields();
        }
      },
      uploadlogosuccess(response, file, fileList){
          this.projectweblogopic =  fileList;
      },
      removelogopic(file, fileList) {
        this.projectweblogopic = fileList;
      },
      uploadbannersuccess(response, file, fileList){
        this.projectwebbannerpic = fileList;
      },
      removebannerpic(file, fileList) {
        this.projectwebbannerpic = fileList;
      },
      edituploadsuccess(response, file, fileList){
        this.editprojectpiclist = fileList;
      },
      editprojecthandleRemove(file, fileList) {
        this.editprojectpiclist = fileList;
      },
      tableheaderClassName({ row, column, rowIndex, columnIndex}) {
        if(column.label=='Edit Project Code'||column.label=='Picture'||column.label=='Edit'||column.label=='Map')
          return 'table-operate-header-cell';
        if(column.label=='NAME')
          return 'table-header-cell-1';
        if(column.label=='INTRO')
          return 'table-header-cell-4';
        if(column.label=='SUNSET_DATE'||column.label=='NAME')
          return 'table-header-cell-3';
        if(column.label=='ADDRESS')
          return 'table-header-cell-2';
      },
      tableClassName({ row, column, rowIndex, columnIndex}){
        if(column.label=='Edit Project Code'||column.label=='Picture'||column.label=='Edit'||column.label=='Map')
          return 'table-operate-cell';
        if(column.label=='NAME')
          return 'table-cell-1';
        if(column.label=='INTRO')
          return 'table-cell-4';
        if(column.label=='SUNSET_DATE'||column.label=='NAME')
          return 'table-cell-3';
        if(column.label=='ADDRESS')
          return 'table-cell-2';
      },

      /*修改项目回显*/
      SearchProjectByidUseEdit(editprojectid){
        this.editprojectpiclist = [];
        this.TabsactiveName = 'one';
        var param = {
          id: editprojectid,
        }
        let res = this.requestutil.ajax('/SearchProjectByidUseEdit', param, false,this);
        if (res.statuscode < 0){
          return;
        }
        this.editprojectformdata = JSON.parse(res.message);
        this.$set(this.editprojectformdata,'sunset_date',this.dateutil.timetodate(this.editprojectformdata.sunset_date))
        //编辑项目时展示户型图
        this.editprojectpiclist = this.uploadfileutil.pathstrtofilelist(this.editprojectformdata.project_pic,this);
        this.projectwebbannerpic = this.uploadfileutil.pathstrtofilelist(this.editprojectformdata.project_banner,this);
        this.projectweblogopic = this.uploadfileutil.pathstrtofilelist(this.editprojectformdata.project_logo,this);
      },
      SearchProjectInfoList:function(currentpage){
        if(currentpage!=undefined)
          this.currentpage = currentpage;
        //计算跳过多少行
        this.conditionparam.skip = (this.currentpage-1)*this.conditionparam.count;
        var res = this.requestutil.ajax('/SearchProjectInfoList',this.conditionparam,false,this);
        if(res.statuscode>=0){
          var message = JSON.parse(res.message);
          this.totalcount = message.totalcount;
          this.datalist = message.datalist;
          //为列表加入checked属性来判定初始是否选中
          for(var i=0;i<message.datalist.length;i++){
            this.datalist[i].sunset_date = this.dateutil.timetodateymd(this.datalist[i].sunset_date);
            this.datalist[i].showproject_pic = this.datalist[i].project_pic==undefined||this.datalist[i].project_pic==""?false:true;
          }
        }else if(res.statuscode<0){
          this.totalcount =0;
          this.datalist = [];
        }
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
      uploadsuccess(response, file, fileList){
        this.projectpiclist = fileList;
      },
      handleRemove(file, fileList) {
        this.projectpiclist = fileList;
      },
      CreateProjectInfo(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = Object.assign({}, this.createprojectformdata);
            param.sunset_date = this.dateutil.datetotime(this.createprojectformdata.sunset_date);
            param.project_pic = this.uploadfileutil.filelisttopathstr(this.projectpiclist);
            param.project_logo =this.uploadfileutil.filelisttopathstr(this.projectweblogopic);
            param.project_banner =this.uploadfileutil.filelisttopathstr(this.projectwebbannerpic);
            var res = this.requestutil.ajax('/CreateProjectInfo', param, true, this);
            if(res.statuscode>=0){
              this.showcreateprojectdialog = false;
              this.SearchProjectInfoList(1);
              this.TabsactiveName = 'one';
            }
            this.projectpiclist = [];
            this.projectweblogopic =[];
            this.projectwebbannerpic =[];
          }
        });
      },

    }
  }
</script>

<style>
  @import '../../static/css/modulestyle.css';
  @import '../assets/iconfont/iconfont.css';
  .projectpage>.editproject-dialog>.el-dialog{
    width:700px;
  }
  .projectpage>.createproject-dialog>.el-dialog{
    width:700px;
  }
  .projectpage .createproject-dialog .el-tab-pane{
    height: 400px;
    overflow-y: scroll;
  }
  .projectpage .search-condition{
    padding: 20px;
  }
  .projectpage .handle-button{
    margin-right: 30px;
    float: right;
    margin-bottom: 20px;
  }
  .projectpage .handle-button button{
    background: #2C75B8;
    color: #FFFFFF;
    font-family:PingFangSC-Semibold;
  }
  .projectpage .projectpic-dialog .el-carousel__item{
    background: #fff;
  }

  .projectpage .data-table{
    padding: 20px ;
  }


</style>
