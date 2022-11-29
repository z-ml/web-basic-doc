---
title: 函数工具库
date: 2022-11-28
permalink: /guide/utils/
---

# 函数工具库

本系统中已经集成了若干公共方法，在 `src/utils` 中，下面是一些重要:chestnut:

## `common` 常用方法

### 深拷贝（deepCopy）

::: details 点击查看

```javascript
/**
 * 深拷贝
 */
//返回传递给他的任意对象的类
export function isClass(o) {
  if (o === null) return 'Null'
  if (o === undefined) return 'Undefined'
  return Object.prototype.toString.call(o).slice(8, -1)
}

export function deepCopy(obj) {
  if (!obj) {
    return null
  }
  let result,
    oClass = isClass(obj)
  //确定result的类型
  if (oClass === 'Object') {
    result = {}
  } else if (oClass === 'Array') {
    result = []
  } else {
    return obj
  }

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      let copy = obj[key]
      if (isClass(copy) === 'Object') {
        result[key] = deepCopy(copy) //递归调用
      } else if (isClass(copy) === 'Array') {
        result[key] = deepCopy(copy)
      } else {
        result[key] = obj[key]
      }
    }
  }
  return result
}
```

:::

### 格式化日期

#### 时间对象格式化为指定类型（formatDate）

::: details 点击查看

```javascript
/*
 *将Date/String类型,解析为String类型.
 *传入String类型,则先解析为Date类型
 *不正确的Date,返回 ''
 *如果时间部分为0,则忽略,只返回日期部分.
 *日期格式对应字符如下(年-yyyy,月-MM,日-dd,时-hh,分-mm,秒-ss,毫秒-S 字符区分大小写)
 */
export function formatDate(v, format) {
  if (!format) {
    format = 'yyyy-MM-dd hh:mm:ss'
  }
  if (typeof v == 'string') v = this.parseDate(v)
  if (!(v instanceof Date)) {
    return ''
  }
  var o = {
    'M+': v.getMonth() + 1, //month
    'd+': v.getDate(), //day
    'h+': v.getHours(), //hour
    'm+': v.getMinutes(), //minute
    's+': v.getSeconds(), //second
    'q+': Math.floor((v.getMonth() + 3) / 3), //quarter
    // "S" : v.getMilliseconds() //millisecond
  }

  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (v.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }

  if (/(S+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      ('000' + v.getMilliseconds()).substr(('' + v.getMilliseconds()).length)
    )
  }

  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return format
}
```

:::

#### 时间格式化后的字符转换为时间对象（parseDate）

::: details 点击查看

```javascript
/*
     将String类型解析为Date类型.
     parseDate('2006-1') return new Date(2006,0)
     parseDate(' 2006-1 ') return new Date(2006,0)
     parseDate('2006-1-1') return new Date(2006,0,1)
     parseDate(' 2006-1-1 ') return new Date(2006,0,1)
     parseDate('2006-1-1 15:14:16') return new Date(2006,0,1,15,14,16)
     parseDate(' 2006-1-1 15:14:16 ') return new Date(2006,0,1,15,14,16);
     parseDate('2006-1-1 15:14:16.254') return new Date(2006,0,1,15,14,16,254)
     parseDate(' 2006-1-1 15:14:16.254 ') return new Date(2006,0,1,15,14,16,254)
     parseDate('不正确的格式') retrun null
     */
export function parseDate(str) {
  if (typeof str == 'string') {
    var results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) *$/)
    if (!results && str.match(/^ *(\d{4})-(\d{1,2}) *$/)) {
      results = str.match(/^ *(\d{4})-(\d{1,2}) *$/)
      return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1)
    }
    if (results && results.length > 3)
      return new Date(
        parseInt(results[1], 10),
        parseInt(results[2], 10) - 1,
        parseInt(results[3], 10)
      )
    results = str.match(
      /^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2}) *$/
    )
    if (results && results.length > 6)
      return new Date(
        parseInt(results[1], 10),
        parseInt(results[2], 10) - 1,
        parseInt(results[3], 10),
        parseInt(results[4], 10),
        parseInt(results[5], 10),
        parseInt(results[6], 10)
      )
    results = str.match(
      /^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2})\.(\d{1,5}) *$/
    )
    if (results && results.length > 7)
      return new Date(
        parseInt(results[1], 10),
        parseInt(results[2], 10) - 1,
        parseInt(results[3], 10),
        parseInt(results[4], 10),
        parseInt(results[5], 10),
        parseInt(results[6], 10),
        parseInt(results[7], 10)
      )
  }
  return null
}
```

:::

### 前端分页（pagination）

::: details 点击查看

```javascript
/**
 *
 * @param {*} totalData 获取到的所有的数据
 * @param {*} currentPage 当前的页码
 * @param {*} pageSize 当前的每页多少条
 * pageData 当前的分页分出的数据
 */
export function pagination(totalData, currentPage, pageSize) {
  let pageData = []
  for (let i = 0, length = totalData.length; i < length; i++) {
    if (i < pageSize * currentPage && i >= pageSize * (currentPage - 1)) {
      pageData.push(totalData[i])
    }
  }
  return pageData
}
```

:::

### 数组去重（deduplication）

::: details 点击查看

```javascript
/**
 * 数组对象去重
 * @param {*} list 目标去重数组
 * @param {*} target 以哪个字段去重
 * @returns 去重后的数组
 */
export function deduplication(list, target) {
  let hash = {}
  let array = []
  array = list.reduceRight((item, next) => {
    hash[next[target]] ? '' : (hash[next[target]] = true && item.unshift(next))
    return item
  }, [])
  return array
}
```

:::

### 组装树结构（arrayToJson）

::: details 点击查看

```javascript
/**
 * 一维数组转树状数组
 * arr: 要转换的一维数组
 * id: 唯一识别
 * pid: 父级唯一识别
 */
export function arrayToJson(arr, id, pid, children = 'children') {
  let tempArr = []
  let tempObj = {}
  for (let i = 0, l = arr.length; i < l; i++) {
    tempObj[arr[i][id]] = arr[i]
  }
  for (let i = 0, l = arr.length; i < l; i++) {
    let key = tempObj[arr[i][pid]]

    if (key) {
      if (!key[children]) {
        key[children] = []
        key[children].push(arr[i])
      } else {
        key[children].push(arr[i])
      }
    } else {
      tempArr.push(arr[i])
    }
  }
  return tempArr
}
```

:::

### 树结构解构（arrayToJson）

::: details 点击查看

```javascript
export function jsonToArray(nodes, children = 'children') {
  let r = []
  if (Array.isArray(nodes)) {
    for (let i = 0, l = nodes.length; i < l; i++) {
      r.push(nodes[i])
      if (Array.isArray(nodes[i][children]) && nodes[i][children].length > 0)
        //将children递归的push到最外层的数组r里面
        r = r.concat(jsonToArray(nodes[i][children]))
      delete nodes[i][children]
    }
  }
  return r
}
```

:::

### 导出文件

#### 文件流导出（exportfile）

::: details 点击查看

```javascript
/**
 * 文件流导出
 * @param {*} res 文件流返回结果
 * @param {*} filename 文件名称
 * @param {*} type 文件类型
 * @returns
 */
export function exportfile(res, filename = null, type = '') {
  return new Promise((reslove, reject) => {
    const resData = res.data
    const fileReader = new FileReader()
    fileReader.onloadend = () => {
      try {
        const errJson = JSON.parse(fileReader.result) // 说明是普通对象数据，后台转换失败
        reject(errJson)
      } catch (err) {
        // 解析成对象失败，说明是正常的文件流
        reslove({
          code: 200,
        })
        const blob = new Blob([res.data], {
          type: type,
        })

        //获取heads中的filename文件名
        const temp = filename
          ? filename
          : res.headers['content-disposition']
              .split(';')[1]
              .split('filename=')[1]
        const fileName = decodeURIComponent(temp)
        downloadFile(blob, fileName)
      }
    }
    fileReader.readAsText(resData)
  })
}
```

:::

#### 文件链接地址导出（transformBlob）

::: details 点击查看

```javascript
/**
 * 文件链接地址导出
 * @param {*} url 文件下载链接
 * @param {*} fileName 文件名称
 */
export async function transformBlob(url, fileName = null) {
  const response = await fetch(url, {
    mode: 'cors', //跨域
  }) // 内容转变成blob地址
  const blob = await response.blob()
  const _fileName = fileName
    ? fileName
    : url.split('/')[url.split('/').length - 1]
  // 下载文件
  downloadFile(blob, _fileName)
}
```

:::

#### 文件创建 a 链接下载

::: details 点击查看

```javascript
/**
 * 文件创建a链接下载
 * @param {*} blob
 * @param {*} fileName
 */
function downloadFile(blob, fileName) {
  const url = window.URL.createObjectURL(blob)
  let aLink = document.createElement('a')
  aLink.setAttribute('download', fileName)
  aLink.style.display = 'none'
  aLink.href = url
  document.body.appendChild(aLink)
  aLink.click()
  document.body.removeChild(aLink)
  window.URL.revokeObjectURL(url)
}
```

:::

## `doEcharts` 可视化图表

`Echarts.js` 配置方法

## `regular` 正则

正则验证方法

## `system` 系统内置

框架内部方法
