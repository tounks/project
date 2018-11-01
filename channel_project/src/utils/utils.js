
//设置时间格式为 yy.mm.dd hh:MM:SS
const formatDate1 = strTime =>{
  let date = new Date(strTime);
  let m = date.getMonth() + 1 + '';
  let d = date.getDate() + '';
  let h = date.getHours() +'';
  let Min = date.getMinutes()+ '';
  let n = date.getSeconds() +'';
  if(m.length == 1 ){
    m = 0 + m
  }
  if(d.length == 1 ){
    d = 0 + d
  }
  if(h.length == 1 ){
    h = 0 + h
  }
  if(Min.length == 1 ){
    Min = 0 + Min
  }
  if(n.length == 1){
    n = 0 + n
  }
  return date.getFullYear()+"-"+ m +"-"+ d + "  " + h+':'+Min + ':' + n;
}



const formatDate = strTime =>{
  if(!strTime){
    return ""
  }
  let date = new Date(strTime);
  let m = date.getMonth() + 1 + '';
  let d = date.getDate() + '';
  if(m.length == 1 ){
    m = 0 + m
  }
  if(d.length == 1 ){
    d = 0 + d
  }
  return date.getFullYear()+"-"+ m +"-"+ d;
}


export {
  formatDate,
  formatDate1
}



