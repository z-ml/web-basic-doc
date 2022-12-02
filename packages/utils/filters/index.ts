// 传进来的正整数字符串变成三位一逗号的字符串
export function formatNum(num:number) {
  let str:string = ''
  if (isNaN(+num)) {
    return '0'
  }
  str = num + ''
  let i = str.length > 3 ? str.length % 3 : 0
  return (
    (i ? `${str.substr(0, i)},` : '') +
    str.substr(i).replace(/(\d{3})(?=\d)/g, '$1' + ',')
  )
}