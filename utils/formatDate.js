/*yyyy-MM-dd hh:mm:ss可根据需求显示到分或秒或其他.调用formatDate(new Date(time), 'yyyy-MM-dd')*/
export default function (date, fmt) {
  if(!date) return false;
  const formateDate = new Date(date);
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (formateDate.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': formateDate.getMonth() + 1,
    'd+': formateDate.getDate(),
    'h+': formateDate.getHours(),
    'm+': formateDate.getMinutes(),
    's+': formateDate.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  function padLeftZero(str) {
    return ('00' + str).substr(str.length);
  }
  return fmt;
}