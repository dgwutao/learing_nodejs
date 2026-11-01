// pages/beidanci5/index.js
const app =  getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tongji:{},
    cishu_id:'',
    playing_audio_state:'',
    currentIndex:-1,
    timer:Object,
    audio:Object,
    showSlider:false,
    showSlider2:false,
    info:{},
    danci:{},
    list:[],
    list2:[],
    answer_idx:99,
    showHint:false,
    haveRightAnswer:false,
    data:{},
  },

  collect(e){
    var url = 'edu/edu-danci-shoucang/add'
    var param = {
      danci_id : this.data.danci.id
    }
    if (this.data.info.is_shoucang == 1) {
      url = 'edu/edu-danci-shoucang/delete'
      param = {
        danci_id : this.data.danci.id
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

  goback(e){
    wx.navigateBack()
  },

  answer(e){
    let item = e.currentTarget.dataset.item
    let idx = e.currentTarget.dataset.idx
    if (item.is_zhengque==1) {
      if (this.data.info.type_id == 1 ||
          this.data.info.type_id == 2 ||
          this.data.info.type_id == 3) {
            setTimeout(() => {
              this.setData({
                haveRightAnswer:true
              })
              this.goon({})
            }, 500);
      }else{
        this.setData({
          haveRightAnswer:true
        })
        setTimeout(() => {
          this.setData({
            showSlider:true
          })
        }, 500);
      }
    }else{
      setTimeout(() => {
        this.setData({
          answer_idx:99,
          showHint:true
        })
      }, 500);
    }
    this.setData({
      answer_idx:idx
    })
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
    app.func.$http.get('edu/edu-cishu/lianxi-chuti',{
      cishu_id:this.data.cishu_id
    }).then(res => {
      if (res.code == '200'){
        res.data.xxInfo.is_shoucang = res.data.is_shoucang
        this.setData({
             info:res.data.xxInfo,
             danci:res.data.zqDanci,
             list:res.data.list,
             list2:res.data.next_peitu,
             tongji:res.data.tongji,
             answer_idx:99,
             showHint:false,
        })
      }else{
        app.func.$util.showError(res.msg) 
      }
    }).catch(err => {   
      
    })  
  },

  preview(e){
    console.log(e)
    let url = e.currentTarget.dataset.url
    wx.previewImage({
      current:url,
      urls: [url],
    })
  },

  goon(e){
    if (this.data.haveRightAnswer) {
      var type = parseInt(this.data.info.type_id) + 1
      if (type > 3) {
        type = 3
      }
      app.func.$http.get('edu/edu-cishu/lianxi-huida',{
        id:this.data.info.id,
        type_id:type
      }).then(res => {
        if (res.code == '200'){
          app.func.$http.get('edu/edu-cishu/xuexi-zhuangtai',{
            cishu_id:this.data.cishu_id
          }).then(res2 => {
            if (res2.code == '200'){
              let data = res2.data
              if (data.all_wancheng == 1) {
                this.setData({
                  showSlider: false,
                  showSlider2:true,
                  data:data
                })
              }else if(data.today_wancheng == 1){
                this.setData({
                  showSlider: false,
                  showSlider2:true,
                  data:data
                })
              }else{
                this.loadData()
                this.setData({
                  showSlider: false,
                  haveRightAnswer:false
                })
              }
            }else{
              app.func.$util.showError(res2.msg) 
            }
          }).catch(err2 => {   
            
          })
        }else{
          app.func.$util.showError(res.msg) 
        }
      }).catch(err => {   
        
      })
    }else{
      this.setData({
        showSlider: false,
        haveRightAnswer:false
      })
    }
  },

  show(e){
    this.setData({
      showSlider:true
    })
  },

  sizerClose() {
    this.setData({
      showSlider: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      cishu_id:options.cishu_id
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