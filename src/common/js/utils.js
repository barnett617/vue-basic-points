function deepCopy(origin) {
  const primitive_types = ['string', 'number', 'boolean', 'undefined', 'null'];
  let helper = function(data) {
    if (primitive_types.includes(typeof data)) {
      return data;
    } else if (Array.isArray(data)) {
      return data.map(item => helper(item));
    } else if (Object.prototype.toString.call(data) === '[object Object]') {
      let newObj = {};
      Object.keys(data).map(key => {
        newObj[key] = helper(data[key]);
      })
      return newObj;
    } else {
      throw new Error('unexpected type value')
    }
  }
  return helper(origin);
}

function baiduMap(ak) {
  return new Promise((resolve, reject) => {
    window.baiduMap = function() {
      resolve()
    }
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `http://api.map.baidu.com/api?type=webgl&v=3.0&ak=${ak}&callback=baiduMap`
    script.onerror = reject
    document.head.appendChild(script)
  })
}

export {
  deepCopy,
  baiduMap,
}
