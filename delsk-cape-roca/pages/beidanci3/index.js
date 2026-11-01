// pages/beidanci3/index.js
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
    tab:0,
    list:[],
    loading:false,
    page:1,
    pageSize:'40',
    count:{}
  },

  nextData() {
    if (this.data.loading == true) {
      return;
    }

      this.setData({
        page: this.data.page + 1,
        loading: true,
      })
      this.loadData()
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
    app.func.$http.get('edu/edu-cishu/danci-list',{cishu_id:this.data.id,xuexi:this.data.tab==0?'1':'2',page:this.data.page,pageSize:this.data.pageSize}).then(res => {
      if (res.code == '200'){
        var list
        if (this.data.page == 1) {
          list = res.data.list
        }else{
          let current = this.data.list
          res.data.list.forEach(val=>{
            current.push(val)
          })
          list = current
        }
        this.setData({
          list:list
        })
      }else{
        app.func.$util.showError(res.msg) 
      }
      this.setData({
        loading:false
      })
    }).catch(err => {   
      this.setData({
        loading:false
      })
    })  
  },

  loadCount(){
    app.func.$http.get('edu/edu-cishu/danci-tongji',{cishu_id:this.data.id}).then(res => {
      if (res.code == '200'){
        this.setData({
          count:res.data
        })
      }else{
        app.func.$util.showError(res.msg) 
      }
    }).catch(err => {   

    })  
  },

  switch(e){
    let id = e.currentTarget.dataset.id
    this.setData({
      tab:id
    })
    this.setData({
      page: 1,
      loading: true,
    })
    this.loadData()
  },

  goDetail(e){
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/beidanci4/index?id='+item.id,
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
this.loadCount()
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