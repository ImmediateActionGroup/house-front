<template>
  <div id="app">
    <div>
      <UEditor :defaultMsg=defaultMsg :config=ueconfig ref="ueditor"></UEditor>
      <div style="float: right;margin-top: 10px">
        <el-button size="small" type="primary" @click="$goRoute('/home/project')"  style="margin-right: 5px">Go Back</el-button>
        <el-button size="small" type="primary" @click="EditProjectWebCode()">Save</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import UEditor from '../components/ueditor/ueditor.vue'
  import ElButton from "../../node_modules/element-ui/packages/button/src/button";

  export default{
    name: '',
    components: {ElButton, UEditor},
    data(){
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
          initialContent:undefined,   //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
          autoClearinitialContent:false, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
          initialFrameWidth: null,
          initialFrameHeight: 450,
          BaseUrl: '',
          UEDITOR_HOME_URL: 'static/ueditor/',
        },
        defaultMsg:'',
        viewNO:'',
        project_id:'',
        projectdata:{},
      }
    },
    mounted(){
      this.viewNO = this.$route.query.viewNO;
      this.project_id = this.$route.query.project_id;
      this.SearchProjectByid();
    },
    methods: {
      //获取文档内容
      getContent: function(){
        let content = this.$refs.ueditor.getUEContent();
        console.log(content);
      },
      EditProjectWebCode(){
        let content = this.$refs.ueditor.getUEContent();
        var param={
          viewNO:this.viewNO,
          code:content,
          project_id:this.project_id
        }
        var res = this.requestutil.ajax('/EditProjectWebCode',param,true,this);
      },
      /*修改项目回显*/
      SearchProjectByid(){
        this.editprojectpiclist = [];
        this.TabsactiveName = 'one';
        var param = {
          id: this.project_id,
        }
        let res = this.requestutil.ajax('/SearchProjectByidUseEdit', param, false,this);
        if (res.statuscode < 0){
          return;
        }
        this.projectdata = JSON.parse(res.message);
        if(this.viewNO=='00'){
          this.defaultMsg =this.projectdata.project_overview_code;
        }else if(this.viewNO=='01'){
          this.defaultMsg =this.projectdata.project_overview_code_CN;
        }else if(this.viewNO=='10'){
          this.defaultMsg =this.projectdata.project_architecture_code;
        }else if(this.viewNO=='11'){
          this.defaultMsg =this.projectdata.project_architecture_code_CN;
        }else if(this.viewNO=='20'){
          this.defaultMsg =this.projectdata.project_exterior_code;
        }else if(this.viewNO=='21'){
          this.defaultMsg =this.projectdata.project_exterior_code_CN;
        }else if(this.viewNO=='30'){
          this.defaultMsg =this.projectdata.project_environment_code;
        }else if(this.viewNO=='31'){
          this.defaultMsg =this.projectdata.project_environment_code_CN;
        }else if(this.viewNO=='40'){
          this.defaultMsg =this.projectdata.project_progress_code;
        }else if(this.viewNO=='41'){
          this.defaultMsg =this.projectdata.project_progress_code_CN;
        }


      },
    }
  }

</script>
