// pages/homework/index.js
var app =  getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    fold_audio_name:'',
    showAudioRates:false,
    audioRates:['0.5','0.8','1.0','1.25','1.5','2.0'],
    currentAudioRate:'1.0',
    currentIndex:-1,
    timer:Object,
    tab:0,
    id:'',
    info:{},
    course:{},
    list:[],
    audio:Object,
    playing_audio_state:'',
    length:0
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

  showRates(e){
this.setData({
  showAudioRates:true
})
  },
  
  sizerClose(e){
    this.setData({
      showAudioRates:false
    })
  },

  rate_c(e){
    let item = e.currentTarget.dataset.item
    this.setData({
      currentAudioRate:item,
      showAudioRates:false
    })
    this.data.audio.playbackRate = Number(item)

    this.data.audio.pause()
    this.data.audio.play()
    wx.showToast({
      title: '已开启'+item+'x倍速播放',
      icon:'none'
    })
  },

  f_5s(e){
    let type = e.currentTarget.dataset.type
    
    
    if (this.data.playing_audio_state.length == 0) {
      let state = e.currentTarget.dataset.playing
      let url = e.currentTarget.dataset.url
      this.data.audio.src = url
      var current = this.data.audio.currentTime
      if (type == 'rewind') {
        current = current - 5
        if (current < 0) {
          current = 0
        }
      }else{
        current = current + 5
      }
      this.data.audio.seek(current)
      this.data.audio.play()
      this.setData({
        playing_audio_state:state
      })

      let index = e.currentTarget.dataset.index
      if (typeof (index) != 'undefined' && index > -1) {
        this.setData({
          currentIndex:index
        }) 
        setTimeout(() => {
          const interval = this.startTimer()
          this.setData({
            timer:interval
          }) 
          let current = this.data.audio.currentTime
        }, 500);
        
      } else{

        this.setData({
          currentIndex:-1
        })
        clearInterval(this.data.timer)
      }
    }else{
      var current = this.data.audio.currentTime
      if (type == 'rewind') {
        current = current - 5
        if (current < 0) {
          current = 0
        }
      }else{
        current = current + 5
      }
      this.data.audio.seek(current)
      this.data.audio.play()
    }
  },

  foldAudio(e){
    let name = e.currentTarget.dataset.audio
    if (name != this.data.fold_audio_name) {
      this.data.audio.pause()
      this.setData({
        playing_audio_state:'',
        currentIndex : -1
      })
      clearInterval(this.data.timer)
    }else{

    }
    this.setData({
      fold_audio_name:name
    })
  },

  startTimer(){
    let interval = setInterval(() => {
      if (this.data.currentIndex > -1) {
        let info = this.data.info
        let item = info.audios[this.data.currentIndex]
        let progress = this.data.audio.currentTime/this.data.audio.duration*100
        item.value = progress
        let current = this.formateTime(this.data.audio.currentTime)
        item.start = current
        this.setData({
          info:info
        })
        console.log(progress)
      }
    }, 500);
    return interval
  },

  sliderChanging(e){
    this.data.audio.pause()
    clearInterval(this.data.timer)
  },

  sliderChanged(e){
    let positin = e.detail.value / 100 * this.data.audio.duration
    this.data.audio.seek(positin)
    this.data.audio.play()
    if (this.data.playing_audio_state.length == 0) {
      let state = e.currentTarget.dataset.playing
      let index = e.currentTarget.dataset.index
      this.setData({
        playing_audio_state:state,
        currentIndex:index
      })
    }
    setTimeout(() => {
      const interval = this.startTimer()
        this.setData({
          timer:interval
        })
        let current = this.data.audio.currentTime
    }, 500);
  },

  playVoice(e){
    let state = e.currentTarget.dataset.playing
    if (this.data.playing_audio_state == state) {
      this.data.audio.pause()
      this.setData({
        playing_audio_state:'',
        currentIndex : -1
      })

      clearInterval(this.data.timer)
    }else{
      let url = e.currentTarget.dataset.url
      // this.data.audio.stop()
      this.data.audio.src = url
      this.data.audio.play()
      this.setData({
        playing_audio_state:state
      })

      let index = e.currentTarget.dataset.index
      if (typeof (index) != 'undefined' && index > -1) {
        this.setData({
          currentIndex:index
        }) 
        setTimeout(() => {
          const interval = this.startTimer()
          this.setData({
            timer:interval
          }) 
          let current = this.data.audio.currentTime
        }, 500);
        
      } else{

        this.setData({
          currentIndex:-1
        })
        clearInterval(this.data.timer)
      }     
    }
  },

  preview(e){
    let urls = e.currentTarget.dataset.urls
    let url = e.currentTarget.dataset.url
    if (urls&&urls.length>0) {
      wx.previewImage({
        current:url,
        urls: urls,
      })
    }else{
      wx.previewImage({
        current:url,
        urls: [url],
      })
    }
  },

  loadData(){
    let param = {id:this.data.id}
    app.func.$http.get('edu/edu-task/info',param).then(res => {
            if (res.code == '200'){
              res.data.info.audios.forEach(val=>{
                val.value = 0
                val.start = '00:00'
                val.end = this.formateTime(val.audio_size)
              })
              if (res.data.info.audios&&
                  res.data.info.audios.length>0) {
                this.setData({
                  fold_audio_name:res.data.info.audios[0].name
                })
              }

              this.setData({
                info:res.data.info,
                course:res.data.course,
                list:res.data.comment
              })
            }else{
              app.func.$util.showError(res.msg) 
            }
          }).catch(err => {  
            console.log(err) 
            wx.showToast({
              title: err.msg?err.msg:'读取错误',
              icon:'error'
            })
          })  
   },

  goDetail(e){
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/homeworkDetail/index?id=' + this.data.info.course_id + '&userId=' + item.user_id,
    })
  },

  changeTab(e){
    let tab = e.currentTarget.dataset.tab
    this.setData({
            tab:tab
    })
  },

  /**
   * Lifecycle function--Called when page load
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
      if (this.data.currentIndex > -1) {
        let info = this.data.info
        let item = info.audios[this.data.currentIndex]
        item.value = 0
        item.start = '00:00'
        this.setData({
          info:info
        })

        let current = this.data.audio.currentTime
      }

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

    let token = wx.getStorageSync('token')
        if (token && token.length>0) {
          // if (this.data.type == 2) {
          //   app.func.$http.get('edu/edu-course/buy',{id:this.data.id}).then(res => {
          //     if (res.code == '200'){
          //       if (res.data.buy == 0) {
          //         wx.reLaunch({
          //           url: '/pages/centerDetail/index?id=' + res.data.group_id,
          //         })
          //       }
          //     }else{
          //       app.func.$util.showError(res.msg) 
          //     }
          //   }).catch(err => {   
          //     console.log(err)
          //   }) 
          // }

          // wx.reLaunch({
          //   url: '/pages/index/index',
          // })
        }else{
          wx.reLaunch({
            url: '/pages/login/index',
          })
        }
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
    this.loadData()
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
    this.data.audio.stop()
    this.data.audio.destroy()

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
  // onShareAppMessage() {

  // }
})