const deepClone = (source, dest) => {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  dest = dest || (source.constructor === Array ? [] : {})
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (source[key] && typeof source[key] === 'object') {
        dest[key] = source[key].constructor === Array ? [] : {}
        deepClone(source[key], dest[key])
      } else {
        dest[key] = source[key]
      }
    }
  }
  return dest
}

//  读取localStorage
const getStorageItem = (key) => {
  let val = window.localStorage.getItem(key)
  return JSON.parse(val)
}

//  读取localStorage
const setStorageItem = (key, val) => {
  window.localStorage.setItem(key, JSON.stringify(val))
}

//  删除
const removeStoreItem = (key) => {
  window.localStorage.removeItem(key)
}

//  禁止中文输入
const stopChinese = (val) => {
  return val.replace(/[\u4E00-\u9FA5]/gi, '')
}

const wktToJs = (wkt) => {
  if (!wkt) {
    return []
  }

  let reg = /\((.+?)\)/g
  let arr = []
  if (reg.test(wkt)) {
    wkt = RegExp.$1.replace('(', '')
    let wktArr = wkt.split(',')
    wktArr.forEach((item) => {
      let newArr = item.split(' ')
      let obj = {
        x: newArr[0],
        y: newArr[1]
      }
      arr.push(obj)
    })

    return arr
  }
}

// 点线框  线字段（line）转 linestring
const lineToLineString = (type) => {
  return type === 'line' ? 'linestring' : type
}

const jsToWkt = (types, data) => {
  let obj = {}
  let strObj = {
    point: 'POINT(',
    linestring: 'LINESTRING(',
    polygon: 'POLYGON(('
  }
  types.forEach(item => {
    let type = lineToLineString(item)
    obj[type] = []
  })

  data.forEach(item => {
    let type = lineToLineString(item.type)
    let pointsArr = item.points
    let startStr = strObj[type]
    let endStr = type === 'polygon' ? '))' : ')'
    let pointLen = pointsArr.length

    pointsArr.forEach((point, index) => {
      let x = Number(point.x).toFixed(5)
      let y = Number(point.y).toFixed(5)
      startStr += x + ' ' + y + (index === pointLen - 1 ? '' : ',')
    })

    startStr += endStr

    obj[type].push(startStr)
  })

  return obj
}

//  浏览器全屏
const fullScreen = () => {
  var el = document.documentElement;

  var rfs = el.requestFullScreen || el.webkitRequestFullScreen || 

      el.mozRequestFullScreen || el.msRequestFullScreen;

  if (typeof rfs !== 'undefined' && rfs) {
    rfs.call(el)
  }
}

const cancelFullScreen = () => {
  if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  }
}

//  列表分页 查询没有数据自动查询上一页  （非第一页）
const tableListIsCheckPrePage = (list, currentPage) => {
  if (currentPage === 1) return false

  if (!list.length) {
    return currentPage - 1
  }
}

//  事件绑定兼容
const addHandle = (dom, type, fn) => {
  if (document.addEventListener) {
    dom.addEventListener(type, fn, false)
  } else if (document.attachEvent) {
    dom.attachEvent('on' + type, fn)
  } else {
    let oldDomFun = dom['on' + type]
    dom['on' + type] = function() {
      oldDomFun()
      fn && fn()
    }
  }
}

//  事件解绑
const removeHandle = (dom, type, fn) => {
  if (document.removeEventListener) {
    dom.removeEventListener(type, fn)
  } else if (document.detachEvent) {
    dom.detachEvent('on' + type, fn)
  } else {
    dom['on' + type] = null
  }
}
const getCssPrefix = () => {
  let styles = window.getComputedStyle(document.documentElement, '');
  let core = (
    Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms|o)-/) || (styles.OLink === '' && ['', 'o'])
  )[1];
  return '-' + core + '-';
}
//  判断浏览器前缀
const getBowserPrefix = () => {
  let prefix = {
    '-webkit-': 'webkit',
    '-moz-': 'moz',
    '-ms-': 'ms',
    '-o-': 'o'
  }

  return prefix[getCssPrefix()]
}

//  判断当前环境
const isDev = () => {
  return process.env.NODE_ENV === 'production' ? false : true
}

const getImgSrc = (url) => {
  if (isDev()) {
    url = url ? ('http://ji_algo_config.com/' + url) : url
    return url
  }

  if (url) {
    let reg = /(http)|(https):\/\//g
    
    if (reg.test(url)) {
      return url
    }
    return '/' + url
  }

  return url
}

//  中英文获取语言 对应key的val key支持对象obj.info.name链式取值
const getLanguageVal = (store, key) => {
  let keys = key.split('.')
  let obj = JSON.parse(store.getState())
  let len = keys.length

  for (let i = 0; i < len; i++) {
    let item = keys[i]
    obj = obj[item]
  }
  return obj
}

//  中英文获取语言 对应key的val key支持对象obj.info.name链式取值 新函数
const getLangShowName = (key) => {
  let keys = key.split('.')
  let obj = window.lang
  let len = keys.length

  for (let i = 0; i < len; i++) {
    let item = keys[i]
    obj = obj[item]
  }
  return obj
}

//  中英文字段显示
const langShowStr = (lang, key) => {
  key = lang !== 'ch' ? key + '_' + lang : key
  // console.log('lang', key)
  return key
}

//  下载文件    type--true 打开新空白页面下载
const downloadFile = (url, type) => {
  if (!type) {
    window.open(url)
  } else {
    let downloadwin = window.open()
    downloadwin.location = url
  }
}

 //  初始化线框数据  获取模板数据
 const initDrawDataTemp = (temp) => {
  //  console.log('initDrawDataTemp temp', temp)
  let maxDrawNum = {}
  let drawedNum = {}
  let initBtns = []
  let initDrawType = ''

  temp.forEach((item, index) => {
    let type = item.type
    type = type === 'linestring' ? 'line' : type

    if (!index) {
      initDrawType = type
    }
    let max = item.max
    maxDrawNum[type] = max
    drawedNum[type] = 0
    initBtns.push(type)
  })

  return {
    initBtns,
    maxDrawNum,
    drawedNum,
    initDrawType
  }
}

//  点线框数据 wkt 转 js
const transformConfigdataWKTToJs = (data, drawedNum) => {
  let arr = []
  
  //  设置初始化点线框数据
  data.forEach(camera => {
    let points = camera.value
    let type = camera.type 
    type = type === 'linestring' ? 'line' : type

    points.forEach((item) => {
      let obj = {
        type: type,
        points: wktToJs(item)
      }
      drawedNum[type]++
      arr.push(obj)
    })
  })

  return {points: arr, drawedNum}
}

//  获取url参数
const getUrlParam = (paramKey) => {
  let search = window.location.search
  
  if (!search) return

  search = search.substring(1)
  let arr = search.split('&')
  let obj = {}

  arr.forEach(item => {
    let newArr = item.split('=')
    let key = newArr[0]
    let val = newArr[1]
    obj[key] = val
  })

  return obj[paramKey]
}

//  自动播放音频文件  (解决浏览器禁止默认播放音效)
const autoPlayVoice = (url) => {
  window.AudioContext = window.AudioContext|| window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
  let context = new window.AudioContext();
  let source = null;
  let audioBuffer = null;

  const playSound = () => {
    source = context.createBufferSource()
    source.buffer = audioBuffer
    source.connect(context.destination)
    source.start(0);
  }

  const initSound = (arrayBuffer) => {
    context.decodeAudioData(arrayBuffer, function (buffer) { // 解码成功时的回调函数
        audioBuffer = buffer;
        playSound();
      }, function (e) { //解码出错时的回调函数
        console.log('Error decoding file', e);
      });
    }
    function loadAudioFile(url) {
      var xhr = new XMLHttpRequest(); //  通过XHR下载音频文件
      xhr.open('GET', url, true);
      xhr.responseType = 'arraybuffer';
      xhr.onload = function (e) { //  下载完成
        initSound(this.response);
      };
      xhr.send();
    }

    //  立即停止
    // const stopSound = () => {
    //   if (source) {
    //     source.stop(0); 
    //   }
    // }

    try {
      loadAudioFile(url)
    } catch (error) {
      console.log('!Your browser does not support AudioContext');
    }
}

//  简单window数据缓存 初始化
const initWinData = (str) => {
  if (window[str]) return

  window[str] = {}
}

//  退出浏览器全屏
export {
  deepClone,
  getStorageItem,
  setStorageItem,
  removeStoreItem,
  stopChinese,
  wktToJs,
  fullScreen,
  cancelFullScreen,
  tableListIsCheckPrePage,
  addHandle,
  removeHandle,
  getBowserPrefix,
  isDev,
  getImgSrc,
  getLanguageVal,
  langShowStr,
  jsToWkt,
  getLangShowName,
  downloadFile,
  initDrawDataTemp,
  transformConfigdataWKTToJs,
  getUrlParam,
  autoPlayVoice,
  initWinData
}
