// pages/letter/index.js
var app =  getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    toView:'',
    audio:Object,
    id:'',
    fayin_id:'',
    data:{},
    tab:0,
    tab2:0,
    current:{},
    playing_audio_state:'',
    swiperHeight:0
  },

  calculateHeight(){
    setTimeout(() => {
      wx.createSelectorQuery().select('.a-class-'+this.data.tab).boundingClientRect((rect)=>{
        // var height = 0
        // rects.forEach(rect=>{
        //   height = (height + rect.height)
        // })
        // this.setData({
        //   swiperHeight:height
        // })
        // console.log(rects)

        this.setData({
          swiperHeight:rect.height*2 + 100
        })
        
      }).exec()
    }, 1000);

    wx.pageScrollTo({
      scrollTop:0,
      duration:0
    })
  },

  swiperChange(e){
    let id = e.detail.current
    let current = this.data.data.fayin[id]
    this.setData({
      tab:id,
      current:current,
      toView: 'id_' + current.id
    })
    console.log(current)
    if (this.data.playing_audio_state.length>0) {
      this.data.audio.pause()
      this.setData({
        playing_audio_state:''
      })
    }
    this.loadRecommend()
    // this.calculateHeight()
  },

  playVoice(e){
    let state = e.currentTarget.dataset.playing
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

  switch(e){
    let id = e.currentTarget.dataset.id
    let current = this.data.data.fayin[id]
    this.setData({
      tab:id,
      current:current
    })
    // toView:'id_' + current.id
    if (this.data.playing_audio_state.length>0) {
      this.data.audio.pause()
      this.setData({
        playing_audio_state:''
      })
    }
    // this.loadRecommend()
    // this.calculateHeight()
  },

  switch2(e){
    let id = e.currentTarget.dataset.id
    this.setData({
      tab2:id
    })
    if (this.data.playing_audio_state.length>0) {
      this.data.audio.pause()
      this.setData({
        playing_audio_state:''
      })
    }
  },

  loadRecommend(){
    app.func.$http.get('edu/edu-zimu/info',{
      id:this.data.id,
      fayin_id:this.data.current.id?this.data.current.id:''
    }).then(res => {
            if (res.code == '200'){
              res.data.fayin.forEach(val=>{
                if (val.fy_yinpin.length > 0) {
                  val.map = JSON.parse(val.fy_yinpin)
                }
              })
              if (res.data.xiangugan.length>0) {
                this.setData({
                  tab2:0
                })
              }
              let current = res.data.fayin[this.data.tab]
              if (res.data.fayin.length>1) {
                this.calculateHeight()
              }
              this.setData({
                     data:res.data,
                     current:current
              })
              wx.setNavigationBarTitle({
                title: '字母表-' + this.data.data.zm_daxie + this.data.data.zm_xiaoxie,
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
    this.setData({
      id:options.id
    })
    const innerAudioContext = wx.createInnerAudioContext({
      useWebAudioImplement: false,
      autoplay:false
    })
    innerAudioContext.useWebAudioImplement = false
    innerAudioContext.loop = false

    wx.onAudioInterruptionBegin((res) => {

    })

    wx.onAudioInterruptionEnd((res) => {

    })

    innerAudioContext.onCanplay(() => {

    })

    innerAudioContext.onPlay(() => {

    })

    innerAudioContext.onPause(() => {
      this.setData({
        playing_audio_state:''
      })
    })

    innerAudioContext.onEnded(() => {
      this.setData({
        playing_audio_state:''
      })
    })

    // innerAudioContext.onTimeUpdate(()=>{
    // })
    
    innerAudioContext.onWaiting(() => {

    })

    innerAudioContext.onError((res) => {
      wx.showToast({
        title: '音频文件加载失败',
        icon:'error'
      })
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