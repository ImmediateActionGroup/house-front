import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    author: 'Default',
    //中介导出excel路径
    // agentexcelpath:'http://127.0.0.1:8080/exportagentexcel',
    // //厚易导出excel路径
    // //图片访问路径
    // imgpath:'http://127.0.0.1:8080/',
    // //图片上传路径
    // serveruploadpicsrc:'http://127.0.0.1:8080/UploadPic',
    // //发送请求路径
    // posturl:'http://127.0.0.1:8080',



    /*agentexcelpath:'http://192.168.0.164:8080/exportagentexcel',
    imgpath:'http://192.168.0.164:8080/',
    serveruploadpicsrc:'http://192.168.0.164:8080/UploadPic',
    posturl:'http://192.168.0.164:8080',*/

    agentexcelpath:'/exportagentexcel',
    imgpath:'/',
    serveruploadpicsrc:'/UploadPic',
    posturl:'',
  }
})

export default store


