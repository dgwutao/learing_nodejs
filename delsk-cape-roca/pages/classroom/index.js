// pages/classroom/index.js
var app =  getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    type:'',
    toView:'',
    audio:Object,
    timer:Object,
    info:{},
    id:'',
    state:'play',
    start:'00:00',
    end:'00:00',
    length:0,
    trans:0,
    whole:0,
    currentIndex:0
  },

  goHomework(e){
    let token = wx.getStorageSync('token')
    if (token && token.length>0) {
      let type = wx.getStorageSync('user.type')
      if (type == 2) {
        wx.navigateTo({
          url: '/pages/homework/index?id=' + this.data.id,
        })
      }else{
        wx.navigateTo({
          url: '/pages/homeworkDetail/index?id=' + this.data.id,
        })
      }
    }else{
      wx.navigateTo({
        url: '/pages/login/index?backType=1',
      })
    }
  },

  previous(e){
    let index = this.data.currentIndex - 1
    if (index < 0) {
      index = 0
    }
    if (this.data.whole == 1) {
      this.setData({
        currentIndex:index
      })
    }
    this.playAtIndex(index)
  },

  next(e){
    let index = this.data.currentIndex + 1
    if (index >= this.data.info.audio_content.length) {
      index = this.data.info.audio_content.length - 1
    }
    if (this.data.whole == 1) {
      this.setData({
        currentIndex:index
      })
    }
    this.playAtIndex(index)
  },

  wholeAction(e){
    let whole = this.data.whole+1
    if (whole > 1) {
      whole = 0
    }
    this.setData({
      whole:whole
    })
    wx.showToast({
      title: whole==0?'整篇播放':'单句播放',
      icon:'none'
    })
  },

  transAction(e){
    let trans = this.data.trans+1
    if (trans > 2) {
      trans = 0
    }
    this.setData({
      trans:trans
    })
    setTimeout(() => {
      this.setData({
        toView:''
      })
      this.calculateIndex()
    }, 500);
  },

  play(e){
    if (this.data.audio.paused) {
      this.data.audio.play()
    }else{
      this.data.audio.pause()
    }
  },

  loadData(){
    let param = {id:this.data.id}
    let url = 'edu/edu-course/info'
    if (this.data.type == 2) {
      url = 'edu/edu-article/info'
    }
    app.func.$http.get(url,param).then(res => {
            if (res.code == '200'){
              this.setData({
                      info:res.data.info
              })
              if (this.data.info.audio_url.length>0) {
                this.data.audio.src = this.data.info.audio_url
                let interval = this.startTimer()
                this.setData({
                  timer:interval
                })
              }
            }else{
              app.func.$util.showError(res.msg) 
            }
          }).catch(err => {   
            
          })  
        },

        startTimer(){
          let interval = setInterval(() => {
            let duration = this.formateTime(this.data.audio.duration)
            let current = this.formateTime(this.data.audio.currentTime)
            let progress = this.data.audio.currentTime/this.data.audio.duration*100

            this.setData({
              start:current,
              end:duration,
              length:progress
            })

            this.calculateIndex()
          }, 500);
          return interval
        },

        calculateIndex(){
          let currentSec = this.data.audio.currentTime
          var index = -1
          for (let i = 0; i < this.data.info.audio_content.length; i++){
            let element = this.data.info.audio_content[i];
            let time = element.time.replace('[','').replace(']','').replace(' ','').split(':')
            let sec = Number(time[0])*60 + Number(time[1])
            if (currentSec >= sec) {
              index++
            }
          }
          index = index<0?0:index

          //循环播放
          if (this.data.whole==1) {
            if (this.data.currentIndex != index) {
              this.playAtIndex(this.data.currentIndex)
            }
          }else{
            this.setData({
              currentIndex:index
            })
          }

          let toView = 'scrollx-' + this.data.currentIndex
          if (this.data.toView != toView) {
            this.setData({
              toView:toView
            })
          }
        },

        jump(e){
          let index = e.currentTarget.dataset.index
          if (this.data.whole == 1) {
            this.setData({
              currentIndex:index
            })
          }
          this.playAtIndex(index)
        },

        playAtIndex(index){
          let item = this.data.info.audio_content[index]
          let time = item.time.replace('[','').replace(']','').replace(' ','').split(':')
          let secs = Number(time[0])*60 + Number(time[1])
          this.data.audio.seek(secs) 
          if (this.data.audio.paused) {
            this.data.audio.play()
          }
        },


      sliderChanged(e){
        let positin = e.detail.value / 100 * this.data.audio.duration
        this.data.audio.seek(positin)
      },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    this.setData({
      id:options.id,
    })
    if (options.type) {
      this.setData({
        type:options.type
      })
    }

    let token = wx.getStorageSync('token')
        if (token && token.length>0) {
          if (this.data.type.length == 0) {
            app.func.$http.get('edu/edu-course/buy',{id:this.data.id}).then(res => {
              if (res.code == '200'){
                if (res.data.buy == 0) {
                  wx.reLaunch({
                    url: '/pages/centerDetail/index?id=' + res.data.group_id,
                  })
                }else{
                  this.loadData()
                }
              }else{
                app.func.$util.showError(res.msg) 
              }
            }).catch(err => {   
              console.log(err)
            }) 
          }else{
            this.loadData()
          }
        }else{
          wx.reLaunch({
            url: '/pages/login/index',
          })
        }

    const innerAudioContext = wx.createInnerAudioContext({
      useWebAudioImplement: false,
      autoplay:false
    })
    innerAudioContext.useWebAudioImplement = false
    innerAudioContext.loop = true

    wx.onAudioInterruptionBegin((res) => {

    })

    wx.onAudioInterruptionEnd((res) => {

    })

    innerAudioContext.onCanplay(() => {
      console.log('可以播放')
    })

    innerAudioContext.onPlay(() => {
      console.log('开始播放')
      this.setData({
        state:'pause'
      })
    })

    innerAudioContext.onPause(() => {
      console.log('暂停播放')
      this.setData({
        state:'play'
      })
    })

    innerAudioContext.onEnded(() => {
      console.log('播放完成')
    })

    // innerAudioContext.onTimeUpdate(()=>{
    // })
    
    innerAudioContext.onWaiting(() => {
      console.log('播放缓冲')

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

  formateTime(raw){
      var sec = parseInt(raw)
      var min = 0
      var duration = ''
      if (sec >= 60) {
        min = parseInt(sec / 60)
        sec = parseInt(sec % 60)
        duration = min.toString().padStart(2,'0') + ':' + sec.toString().padStart(2,'0')
      }else{
        duration = '00' + ':' + sec.toString().padStart(2,'0')
      }
      return duration
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {
    
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {
    if (this.data.audio) {
      this.data.audio.stop()
      this.data.audio.destroy()
    }
    clearInterval(this.data.timer)
  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {
    return {
      title: this.data.info.title,
      path: `/pages/classroom/index?id=` + this.data.id + '&type=' + this.data.type,
      imageUrl:this.data.info.pic,
      success: function (res) {
        wx.showToast({
          title: "分享成功",
          icon: 'success',
          duration: 1500
        })
      }, fail: function (res) {

      },
    }
  }
})