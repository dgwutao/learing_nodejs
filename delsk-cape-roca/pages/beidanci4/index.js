// pages/beidanci4/index.js
const app =  getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    playing_audio_state:'',
    currentIndex:-1,
    timer:Object,
    audio:Object,
    tab:0,
    id:'',
    info:{}
  },

  playVoice(e){
    let item = e.currentTarget.dataset.item
    let state = item.yinpin
    if (this.data.playing_audio_state == state) {
      this.data.audio.pause()
      this.setData({
        playing_audio_state:''
      })
    }else{
      let url = state
      this.data.audio.src = url
      this.data.audio.play()
      this.setData({
        playing_audio_state:state
      }) 
    }
  },

  loadData(){
    app.func.$http.get('edu/edu-cishu/danci-info',{id:this.data.id}).then(res => {
      if (res.code == '200'){
        this.setData({
             info:res.data.info
        })
      }else{
        app.func.$util.showError(res.msg) 
      }
    }).catch(err => {   
      
    })  
  },

  collect(e){
    var url = 'edu/edu-danci-shoucang/add'
    var param = {
      danci_id : this.data.id
    }
    if (this.data.info.is_shoucang == 1) {
      url = 'edu/edu-danci-shoucang/delete'
      param = {
        danci_id : this.data.id
      }
    }
    app.func.$http.get(url,param).then(res => {
      if (res.code == '200'){
        if (this.data.info.is_shoucang==1) {
          wx.showToast({
            title: '取消收藏',
            icon:'none'
          })
        }else{
          wx.showToast({
            title: '收藏成功',
            icon:'none'
          })
        }
        this.loadData()
      }else{
        app.func.$util.showError(res.msg) 
      }
    }).catch(err => {   
      
    })  
  },

  preview(e){
    let url = e.currentTarget.dataset.url
    wx.previewImage({
      urls: [url],
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id:options.id
    })
    const innerAudioContext = wx.createInnerAudioContext({
      useWebAudioImplement: false,
      autoplay:false
    })
    innerAudioContext.useWebAudioImplement = false
    innerAudioContext.autoplay = false
    innerAudioContext.loop = false
    innerAudioContext.onCanplay(() => {
      console.log('可以播放')
    })

    innerAudioContext.onPlay(() => {
      console.log('开始播放')

    })

    innerAudioContext.onPause(() => {
      console.log('暂停播放')
      // this.setData({
      //   currentIndex : -1
      // })

      // clearInterval(this.data.timer)
    })

    innerAudioContext.onEnded(() => {
      console.log('播放完成')
      this.setData({
        playing_audio_state:'',
        currentIndex : -1
      })

      clearInterval(this.data.timer)
    })
    
    innerAudioContext.onWaiting(() => {
      console.log('播放缓冲')

    })

    innerAudioContext.onError((res) => {
      wx.showToast({
        title: '音频文件加载失败',
        icon:'error'
      })
      this.setData({
        playing_audio_state:'',
        currentIndex : -1
      })

      clearInterval(this.data.timer)
    })

    this.setData({
      audio:innerAudioContext
    })
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
    this.loadData()

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
    this.data.audio.stop()
    this.data.audio.destroy()
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