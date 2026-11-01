var app =  getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin:true,
    user:{},
    history:[]
  },

  goVideo(e){
          let item = e.currentTarget.dataset.item
        wx.navigateTo({
                url: '/pages/videoPlay/index?url=' + item.url + '&title=' + item.title + '&cover=' + item.cover + '&id=' + item.id + '&time=' + item.detail.currentTime,
        })
  },

  goMoreLession(e){
        wx.navigateTo({
          url: '/pages/historyList/index',
        })
  },

  goAllLession(e){
        if (this.data.isLogin) {
                wx.switchTab({
                  url: '/pages/center/index',
                })
          }else{
                wx.navigateTo({
                        url: '/pages/login/index',
                })
          }
  },

  goSetting(e){
          if (this.data.isLogin) {
                wx.navigateTo({
                        url: '/pages/setting/index',
                })
          }else{
                wx.navigateTo({
                        url: '/pages/login/index',
                })
          }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  goLogin(){
          if (!this.data.isLogin) {
                wx.navigateTo({
                        url: '/pages/login/index',
                });
          }
  },

  logout(){
    wx.removeStorage({
      key: 'token',
    });
    this.setData({
      isLogin:false,
      user:{}
    })
  },

  getUserInfo(){
    app.func.$http.get('edu/edu-user/info',{}).then(res=> {
      if(res.code == 200 ){
        this.setData({
                user:res.data.info
        })
        wx.setStorageSync('user.type', res.data.info.type)
        wx.setStorageSync('user.id', res.data.info.id)
      }else{
        wx.showToast({
          title: res.msg,
          icon: 'none',
        });
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
        this.setData({
                isLogin:!!wx.getStorageSync('token')
        })
        
    if(this.data.isLogin){
      this.getUserInfo()
      let history = wx.getStorageSync('history')
      this.setData({
              history:history
      })
    }else{
            this.setData({
                    user:{},
                    history:[]
            })
    }

    app.func.$util.checkIfBanned()
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