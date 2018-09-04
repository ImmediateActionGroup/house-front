export default {
  timetodateymdhms(timestamp){
    if(timestamp==undefined||timestamp==0)
      return "";
    var date = new Date(timestamp);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = date.getMinutes() + ':';
    let s = date.getSeconds();
    console.log(Y + M + D + h + m + s);
    return Y + M + D + h + m + s;
  },
  timetodateymd(timestamp){
    if(timestamp==undefined||timestamp==0)
      return "";
    var date = new Date(timestamp);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = date.getMinutes() + ':';
    let s = date.getSeconds();
    return Y + M + D;
  },
  nowdatetoymd(){
    var date = new Date();
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate() + ' ';
    return Y + M + D;
  },
  datetotime(date){
    try{
      if(date==undefined||date==0)
        return 0;
      return date.getTime();
    }catch (e){
      return undefined;
    }

  },
  timetodate(time){
    try{
      if(time==undefined||time==0)
        return undefined;
      return new Date(time);
    }catch (e){
      return undefined;
    }

  },
  getagebybirthday(birthDay){
    if(birthDay==undefined||birthDay==0){
      return undefined;
    }
    var now = new Date().getTime();
    var hours = (now - birthDay)/1000/60/60;
    var year =  Math.floor(hours / (24 * 30 * 12));
    hours = hours % (24 * 30 * 12);
    var months = Math.floor(hours / (24 * 30 ));
    hours = hours % (24 * 30 );
    var days = Math.floor(hours / (24));
    console.log('已经出生：'+ year+ '年'+ months +'月'+days +"天");
    return year;
  },
  ymddatestrtotime(datestr){
    if(datestr==undefined||datestr=='')
      return undefined;
    return Date.parse(new Date(datestr));
  }



}
