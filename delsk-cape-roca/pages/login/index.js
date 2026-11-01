// pages/login/index.js
var app =  getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
        userInfo:[],
        code:'',
        backType:'0'
  },

      //微信手机注册
      WeixinLogin(e) {
        console.log(e)
        if (e.detail.errMsg != 'getPhoneNumber:ok') {
            wx.showToast({
                title: '未同意获取微信手机号将无法进行登录',
                icon: 'none',
                duration: 3000
            })
            return;
        }
        let code = this.data.code
        var ivObj = e.detail.iv
        var telObj = e.detail.encryptedData
        var that = this;
        wx.checkSession({
            success() {
                //session_key 未过期，并且在本生命周期一直有效
            },
            fail() {
                // session_key 已经失效，需要重新执行登录流程

            },
            complete() {
                wx.showLoading({
                    title: '登录中...',
                })
                app.func.$http.get('edu/edu-user/weixin-login', {
                        code: code,
                        encryptedData: telObj,
                        iv: ivObj
                    })
                    .then((res) => {
                        wx.hideLoading({})
                        if (res.code == 200) {
                                wx.setStorageSync('token', res.data.open_id)
                                wx.setStorageSync('user.type', res.data.type)
                                wx.setStorageSync('user.id', res.data.id)
                                if (res.data.name.length>0) {
                                        wx.showToast({
                                                title: '登录成功',
                                                icon: 'none'
                                        })
                                        if (that.data.backType==1) {
                                                setTimeout(() => {
                                                        wx.navigateBack({
                                                          delta: 0,
                                                        })
                                                }, 1000);
                                        }else{
                                                setTimeout(() => {
                                                        wx.reLaunch({
                                                                url: '/pages/home/index',
                                                        })
                                                }, 1000);
                                        }
                                        
                                }else{
                                        wx.reLaunch({
                                                url: '/pages/bindName/index',
                                        })
                                }
                        } else {
                            if (res.data && res.data.errmsg) {
                                wx.showToast({
                                    title: res.data.errmsg,
                                    icon: 'none',
                                    duration: 3000
                                })
                            } else {
                                wx.showToast({
                                    title: res.msg,
                                    icon: 'none',
                                    duration: 3000
                                })
                            }
                            wx.login({
                                success: res => {
                                    that.setData({
                                        code: res.code
                                    })
                                }
                            })
                        }
                    }).catch((e) => {
                        wx.login({
                                success: res => {
                                    that.setData({
                                        code: res.code
                                    })
                                }
                        })
                        wx.showToast({
                            title: '获取数据失败，请重试！',
                            icon: 'error',
                            duration: 3000
                        })
                    })
            }
        })
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
          this.setData({
                  backType:options.backType
          })
        wx.login({
                success: res => {
                    this.setData({
                        code: res.code
                    })
                }
        })
  },

  wxlogin(){
        wx.getUserProfile({
                desc: '用于完善用户资料',
                success: (res) => {
                  this.setData({
                    userInfo: res.userInfo  
                  })          
                }
        })


        wx.login({
          success (res) {
            if (res.code) {
              app.func.$http.get('edu/edu-user/weixin-login',{code:res.code}).then(resdata => {
                if (resdata.code == '0'){
                  if (resdata.data.user){ 
                    wx.setStorageSync('token', resdata.data.token);
                    let timestamp = Date.parse(new Date())/1000+43200 
                    wx.setStorageSync('outtime', timestamp);
                    wx.setStorageSync('userRole', resdata.data.user.role);

                  }
                }else{
                  app.func.$util.showError(resdata.msg) 
                }
              }).catch(err => {   
                app.func.$util.showError('登录失败') 
              })          
            } else {
              console.log('登录失败！' )
            }
          }
        })
      },

  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
})