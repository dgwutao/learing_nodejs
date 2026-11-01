var http = require('http.js')

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDate = time => {
  var now = new Date(time);
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  return year + "-" + month + "-" + day;
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const digitalUnitConversion = val => {
  val = val * 1
  if (val >= 10000) {
    val = val / 10000
    val = val.toFixed(2).replace('.00', '') + '亿'
    return val
  } else {
    return val + '万'
  }
}

function showError(msg, cbObj = {}, ...args) {
        wx.showToast({
          title: msg,
          icon: 'none',
          image: '',
          duration: 1500,
          mask: false,
        });
        console.log(Array.from(args), 'arguments')
        if (cbObj && cbObj['cb'] && cbObj['target']) {
          // 如果想往obj['cb']中传参数，可以直接在cbObj后面依次传入
          cbObj['cb'].apply(cbObj['target'], args)
        }
      }

function islogin() {
  var token = wx.getStorageSync('token')
  if (token == undefined || token == null || token == '') {
    return false;
  }
  return true;
}

function checkIfBanned() {
        let token = wx.getStorageSync('token')
        if (token&&token.length>0) {
                http.get('edu/edu-user/state',{}).then(res => {
                        if (res.code == '200'){
                                if (res.data.state == 2) {
                                        wx.showToast({
                                                title: '登录信息失效，请重新登录',
                                                icon:'none'
                                        })
                                        wx.removeStorage({key: 'token',})
                                        wx.removeStorage({key: 'history',})
                                        setTimeout(() => {
                                                wx.reLaunch({
                                                  url: '/pages/login/index',
                                                })
                                        }, 1500);     
                                }
                        }
                      }).catch(err => {   
                     
                      }) 
        }
}

function valid(l) {
  if (!this.islogin()) {

    return;
  }
}

/*函数节流*/
const throttle =  (fn, interval) => {
  var enterTime = 0;//触发的时间
  var gapTime = interval || 300 ;//默认间隔时间
  return function() {
    var context = this;
    var backTime = new Date().getTime();//第一次函数return即触发的时间
    if (backTime - enterTime > gapTime) {
      fn.apply(context,arguments);
      enterTime = backTime;//赋值给第一次触发的时间，这样就保存了第二次触发的时间
    }
  };
}

/*函数防抖*/
const debounce =  (fn, interval) => {
  var timer;
  var gapTime = interval || 500;//默认间隔时间
  return function() {
    clearTimeout(timer);
    var context = this;
    var args = arguments;//保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
    timer = setTimeout(function() {
      fn.apply(context,args);
    }, gapTime);
  };
}

const deepClone = obj => {
	let target = Array.isArray(obj) ? [] : {}
	for (var k in obj) {
		if (typeof obj[k] === 'object') {
			target[k] = deepClone(obj[k])
		} else {
			target[k] = obj[k]
		}
	}
	return target
}


module.exports = {
        checkIfBanned:checkIfBanned,
  showError:showError,
  formatTime: formatTime,
  formatDate: formatDate,
  islogin: islogin,
  valid: valid,
  digitalUnitConversion: digitalUnitConversion,
  throttle:throttle,
  debounce:debounce,
  deepClone,
}