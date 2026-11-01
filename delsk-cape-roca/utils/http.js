 var rootDocment = 'https://api.delsk.com/api/';//你的域名
//  var rootDocment = 'http://crmapi.test.delsk.com/api/';//你的域名

// function req(url, data, cb) {
//   var token = wx.getStorageSync('token');
//   if (token != null && token != undefined &&token!='') {
//     data.token = token
//   }
//   wx.request({
//     url: rootDocment + url,
//     data: data,
//     method: 'get',
//     header: { 'Content-Type': 'application/json' },
//     success: function (res) {
//       return typeof cb == "function" && cb(res.data)
//     },
//     fail: function () {
//       return typeof cb == "function" && cb(false)
//     }
//   })
// }
// function post(url, data, cb) {
//   var token = wx.getStorageSync('token');
//   if (token != null && token != undefined) {
//     data.token = token
//   }
//   wx.request({
//     url: rootDocment + url,
//     data: data,
//     method: 'post',
//     header: { 'Content-Type': 'application/json' },
//     success: function (res) {
//       return typeof cb == "function" && cb(res.data)
//     },
//     fail: function () {
//       return typeof cb == "function" && cb(false)
//     }
//   })
// }


//添加finally：因为还有一个参数里面还有一个complete方法。
Promise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => { throw reason })
    );
};
const get = (url,data={})=>{
    const token = wx.getStorageSync('token');
    if (token != null && token != undefined) {
        data.token = token
    }
    const promise = new Promise((resolve, reject) => {
        wx.request({
            url: rootDocment + url,
            data: data,
            method: 'get',
            header: { 'Content-Type': 'application/json' },
            success: function (res) {
               
              if(res.statusCode==200){
                  resolve(res.data)
              }else{
                  reject(res.data)
              }
            },
            error:function(e){
                reject('网络出错')
            }
          })
    })
    return promise;
}

const post = (url,data={}) => {
  const token = wx.getStorageSync('token');
  if (token != null && token != undefined) {
    data.token = token
  }
    var promise = new Promise((resolve, reject) => {
      //网络请求
      wx.request({
        url: rootDocment+url,
        data: data,
        method: 'POST',
        header: { 
            'Content-Type': 'application/json',
            // 'token':wx.getStorageSync('token')
        },
        success: function (res) {//服务器返回数据        
          if (res.statusCode == 200) {
            resolve(res.data);
          } else {//返回错误提示信息
            reject(res.data);
          }
        },
        error: function (e) {
          reject('网络出错');
        }
      })
    });
    return promise;
  }

module.exports = {
  get: get,
  post: post,
  rootDocment
}