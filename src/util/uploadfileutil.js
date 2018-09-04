export default {
  //多图片地址通过，拼接成一个字符串
  filelisttopathstr(fileList){
    if(fileList==undefined||fileList.length==0)
      return "";
    var result = "";
    fileList.forEach(function(value,key,arr){
      var res = value.response;
      if(res.statuscode>=0){
        if(result=="")
          result=res.message;
        else
          result=result+","+res.message;
      }
    })
    return result;
  },
  pathstrtofilelist(pathstr,_this){
    if(pathstr==undefined||pathstr=="")
      return [];
    var pathlist = pathstr.split(',');
    var result =pathlist.map(function(value,key,arr){
      var singlefile = {
        name:"",
        url:_this.$store.state.imgpath+value,
        response:{"statuscode":0,"message":value}
      }
      return singlefile;
    })
    return result;
  }
}
