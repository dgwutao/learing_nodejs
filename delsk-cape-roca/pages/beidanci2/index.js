// pages/beidanci2/index.js
const app =  getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    playing_audio_state:'',
    currentIndex:-1,
    timer:Object,
    audio:Object,
    list:[]
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
    app.func.$http.get('edu/edu-danci-shoucang/list',{cs_id:this.data.id,page:'1',pageSize:'9999'}).then(res => {
      if (res.code == '200'){
        this.setData({
             list:res.data.list
        })
      }else{
        app.func.$util.showError(res.msg) 
      }
    }).catch(err => {   
      
    })  
  },

  goDetail(e){
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/beidanci4/index?id='+item.danci_id,
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