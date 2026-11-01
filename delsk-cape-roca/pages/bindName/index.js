// pages/bindName/index.js
var app =  getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
        value:''
  },

  OK(e){
          if (this.data.value.length==0) {
                  wx.showToast({
                    title: '请填写昵称',
                    icon:'none'
                  })
                  return
          }
          this.setUserInfo(this.data.value)

  },

  setUserInfo(name){
        let param = {}
        if (name.length>0) {
              param.name = name
        }
      app.func.$http.get('edu/edu-user/edit',param).then(res=> {
        if(res.code == 200 ){
              wx.showToast({
                      title: '登录成功',
                      icon:'none'
              })
              setTimeout(() => {
                     wx.reLaunch({
                       url: '/pages/home/index',
                     }) 
              }, 1000);
        }else{
          wx.showToast({
            title: res.msg,
            icon: 'none',
          });
        }
      })
},

  handleChange: function (e) {
        this.setData({
          value: e.detail.value
        })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage() {

  // }
})