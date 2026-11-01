// pages/letterList/index.js
var app =  getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    audio:Object,
    tree:[]
  },

  toDetail(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/letter/index?id='+id,
    })
  },

  loadRecommend(){
    app.func.$http.get('edu/edu-zimu/tree',{}).then(res => {
            if (res.code == '200'){
              this.setData({
                      tree:res.data
              })
            }else{
              app.func.$util.showError(res.msg) 
            }
          }).catch(err => {   
            
          })  
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // const innerAudioContext = wx.createInnerAudioContext({
    //   useWebAudioImplement: false,
    //   autoplay:false
    // })
    // innerAudioContext.useWebAudioImplement = false
    // innerAudioContext.loop = true

    // wx.onAudioInterruptionBegin((res) => {

    // })

    // wx.onAudioInterruptionEnd((res) => {

    // })

    // innerAudioContext.onCanplay(() => {
    //   console.log('可以播放')
    // })

    // innerAudioContext.onPlay(() => {
    //   console.log('开始播放')
    //   this.setData({
    //     state:'pause'
    //   })
    // })

    // innerAudioContext.onPause(() => {
    //   console.log('暂停播放')
    //   this.setData({
    //     state:'play'
    //   })
    // })

    // innerAudioContext.onEnded(() => {
    //   console.log('播放完成')
    // })

    // innerAudioContext.onTimeUpdate(()=>{
    // })
    
    // innerAudioContext.onWaiting(() => {
    //   console.log('播放缓冲')

    // })

    // innerAudioContext.onError((res) => {
    //   wx.showToast({
    //     title: '音频文件加载失败',
    //     icon:'error'
    //   })
    // })

    // this.setData({
    //   audio:innerAudioContext
    // })
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
    this.loadRecommend()

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
  onShareAppMessage() {

  }
})