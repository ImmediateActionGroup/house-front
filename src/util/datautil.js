export default {
  strtonumber(str){
    if(str==undefined)
      return str;
    return Number(str);
  },
  objtostr(obj){
    if(obj==undefined)
      return '';
    return obj.toString();
  }
}
