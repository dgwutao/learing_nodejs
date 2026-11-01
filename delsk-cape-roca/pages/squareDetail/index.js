// pages/squareDetail/index.js
var app =  getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    audioRates:['0.5','0.8','1.0','1.25','1.5','2.0'],
    currentAudioRate:'1.0',
    audioIndex:0,
    currentIdx:0,
    playItem:{},
    state:'pause',
    start:'00:00',
    end:'00:00',
    showSlider:false,
    length:0,
    timer:Object,
    audio:Object,
    id:'',
    info:{},
    infoS:{},
    type:'',
    tab:0,
    detail:{},


    toView:'scrollx-0',
    toView2:'scrollx-0',
    state_s:'play',
    start_s:'00:00',
    end_s:'00:00',
    length_s:0,
    video_duration:0,
    trans:0,
    whole:0,
    currentIndex:0,
    currentTime:0,

    playRate:1.0,
    showRateBtn:false,
    showFF:false,
    showFFF:false,
    showffff:false,
    fff:[{t:'2.0X',rate:2.0},{t:'1.5X',rate:1.5},{t:'1.25X',rate:1.25},{t:'1.0X',rate:1.0},{t:'0.8X',rate:0.8},{t:'0.5X',rate:0.5}],
    selectedfff:{t:'1.0X',rate:1.0},
    fullScreen:false,
    showxxx:false,
    showxxxx:false
  },

  rate_c(e){
    let item = e.currentTarget.dataset.item
    this.setData({
      currentAudioRate:item
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
    var current = this.data.audio.currentTime
    if (type == 'rewind') {
      current = current - 5
      if (current < 0) {
        current = 0
      }
    }else{
      current = current + 5
      if (current > this.data.audio.duration) {
        current = this.data.duration
      }
    }
    this.data.audio.seek(current)
    this.data.audio.play()
  },

  goxxx(e){
    this.setData({
      showxxx:true
    })
  },

  goff(e){
    let index = e.currentTarget.dataset.index
    let item = this.data.info.video_content[index]
    let time = item.time.replace('[','').replace(']','').replace(' ','').split(':')
    let secs = 0
        if (time.length>2) {
          secs = Number(time[0])*60*60 + Number(time[1])*60 + Number(time[2])
        }else{
          secs = Number(time[0])*60 + Number(time[1])
        }
    let context = wx.createVideoContext('video2')
    context.seek(secs) 
    // if (this.data.state_s == 'play') {
      context.play()
    // }
    this.setData({
      currentIdx:index
    })

    this.sizerClose()
  },

  moreff(e){
this.setData({
  showFF:true
})
  },

  gofff(e){
    let item = e.currentTarget.dataset.item
    let context = wx.createVideoContext('video2')
    context.playbackRate(item.rate)

    this.setData({
      selectedfff:item,
      showFFF:false,
      showffff:true,
      showxxxx:false,
      showxxx:false
    })

    setTimeout(() => {
      this.setData({
        showffff:false
      })
    }, 3000);
  },

  playbackRate(e){
if (this.data.fullScreen) {
  this.setData({
    showxxxx:true
  })
}else{
  this.setData({
    showFFF:true
  })
}
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
    let context = wx.createVideoContext('video')
    if (this.data.state_s == 'play') {
      context.play()
    }else{
      context.pause()
    }
  },

  calculateIndex(){
    let currentSec = this.data.currentTime
    var index = -1
    for (let i = 0; i < this.data.infoS.video_content.length; i++){
      let element = this.data.infoS.video_content[i];
      let time = element.time.replace('[','').replace(']','').replace(' ','').split(':')
      let sec = 0
        if (time.length>2) {
          sec = Number(time[0])*60*60 + Number(time[1])*60 + Number(time[2])
        }else{
          sec = Number(time[0])*60 + Number(time[1])
        }
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
    let item = this.data.infoS.video_content[index]
    let time = item.time.replace('[','').replace(']','').replace(' ','').split(':')
    let secs = 0
        if (time.length>2) {
          secs = Number(time[0])*60*60 + Number(time[1])*60 + Number(time[2])
        }else{
          secs = Number(time[0])*60 + Number(time[1])
        }
    let context = wx.createVideoContext('video')
    context.seek(secs) 
    if (this.data.state_s == 'play') {
      context.play()
    }
  },

sliderChanged_s(e){
  let context = wx.createVideoContext('video')
  let positin = e.detail.value / 100 * this.data.video_duration
  context.seek(positin)
  context.play()
},

sliderChanging_s(e){
  let context = wx.createVideoContext('video')
  context.pause()
},

video_bindplay(){
    this.setData({
      state_s:'pause'
    })
},

video_bindpause(){
  this.setData({
    state_s:'play'
  })
},

video_bindended(){
  this.setData({
    state_s:'play',
    length_s:0,
    start_s:'00:00',
    currentTime:0
  })
},

video_bindtimeupdate(e){
  let duration = this.formateTime(e.detail.duration)
  let current = this.formateTime(e.detail.currentTime)
  let progress = e.detail.currentTime/e.detail.duration*100
  this.setData({
    length_s:progress,
    start_s:current,
    end_s:duration,
    video_duration:e.detail.duration,
    currentTime:e.detail.currentTime,
    detail:e.detail
  })

  this.calculateIndex()

  // console.log(e)
},

video_binderror(e){
  wx.showToast({
    title: '视频加载失败',
    icon:'none'
  })
},

video_bindseekcomplete(){

},

video_bindloadedmetadata(e){
  let duration = this.formateTime(e.detail.duration)
  this.setData({
    end_s:duration,
    video_duration:e.detail.duration
  })
},

video_bindwaiting(){

},

video_bindfullscreenchange(e){

},

video_bindcontrolstoggle(e){
  this.setData({
    showRateBtn:e.detail.show
  })

  console.log(e)
},

bindcontrolstoggle(e){
this.setData({
  showRateBtn:e.detail.show
})

},

bindfullscreenchange(e){
this.setData({
  fullScreen:e.detail.fullScreen
})
this.sizerClose()
},




























  preview2(e){
    let url = e.currentTarget.dataset.url
    wx.previewImage({
      urls: [url],
    })
  },

  handleTimeUpdate(e){
    this.setData({
            detail:e.detail
    })

    if (this.data.info.video_content.length>0) {
      let currentSec = e.detail.currentTime
      var index = -1
      for (let i = 0; i < this.data.info.video_content.length; i++){
        let element = this.data.info.video_content[i];
        let time = element.time.replace('[','').replace(']','').replace(' ','').split(':')
        let sec = 0
        if (time.length>2) {
          sec = Number(time[0])*60*60 + Number(time[1])*60 + Number(time[2])
        }else{
          sec = Number(time[0])*60 + Number(time[1])
        }
        
        if (currentSec >= sec) {
          index++
        }
      }
      index = index<0?0:index

      this.setData({
        currentIdx:index
      })

      let toView2 = 'scrollx-' + index
      if (this.data.toView2 != toView2) {
        this.setData({
          toView2:toView2
        })
      }
    }
  },

  sizerClose() {
    this.setData({
      showxxx:false,
      showxxxx:false,
      showFF:false,
      showFFF:false,
      showSlider: false,
      length:0,
      start:'00:00',
      end:'00:00'
    })
  },

  sizerClose2() {
    this.setData({
      showxxx:false,
      showxxxx:false,
      showFF:false,
      showFFF:false,
      showSlider: false,
      length:0,
      start:'00:00',
      end:'00:00'
    })
    // if (this.data.state == 'pause') {
      let current = this.data.audio.currentTime
      this.data.audio.stop()
      clearInterval(this.data.timer)
    // }
  },

  sliderChanging(e){
    this.data.audio.pause()
    clearInterval(this.data.timer)
  },

  sliderChanged(e){
    let positin = e.detail.value / 100 * this.data.audio.duration
    this.data.audio.seek(positin)
    this.data.audio.play()
    setTimeout(() => {
      const interval = this.startTimer()
        this.setData({
          timer:interval
        })
        let current = this.data.audio.currentTime
    }, 500);
  },

  playVoice(e){
    if (this.data.audio.paused) {
      this.data.audio.play()
    }else{
      this.data.audio.pause()
    }
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

  startTimer(){
    let interval = setInterval(() => {
        let duration = this.formateTime(this.data.audio.duration)
        let current = this.formateTime(this.data.audio.currentTime)
        let progress = this.data.audio.currentTime/this.data.audio.duration*100
        this.setData({
          length:progress,
          start:current,
          end:duration
        })
    }, 500);
    return interval
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

  preview(e){
        let item = e.currentTarget.dataset.item
        if (item.ext.toLowerCase() == 'jpg' ||
            item.ext.toLowerCase() == 'jpeg' ||
            item.ext.toLowerCase() == 'png' ||
            item.ext.toLowerCase() == 'gif') {
                  wx.previewImage({
                          urls: [item.url],
                  })
        } else if(item.ext.toLowerCase() == 'mp3'){
            this.setData({
              showSlider:true,
              playItem:item,
              audioIndex:e.currentTarget.dataset.index
            })
            this.data.audio.src = item.url
            this.data.audio.play()
            setTimeout(() => {
              const interval = this.startTimer()
                this.setData({
                  timer:interval
                })
                let current = this.data.audio.currentTime
            }, 500);
        } else{
                wx.showLoading({
                        title: '加载中...',
                })
                wx.downloadFile({
                url: item.url,
                success:function(res){
                wx.hideLoading()
                        wx.openDocument({
                        filePath: res.tempFilePath,
                                fail:function(res){
                                        wx.showToast({
                                                title: '不支持查看此文件',
                                                icon:'none'
                                        })
                                }
                        })
                },
                fail:function(res){
                        wx.hideLoading()
                        wx.showToast({
                                title: '加载失败，请查看您的网络！',
                                icon:'none'
                        })
                        console.log(res)
                }
                })
        }
    },

  changeTab(e){
    let tab = e.currentTarget.dataset.tab
    this.setData({
            tab:tab,
            length_s:0,
            showRateBtn:false
    })
    let context = wx.createVideoContext('video')
    context.pause()

    let context2 = wx.createVideoContext('video2')
    context2.pause()
  },

  loadData(){
        app.func.$http.get('edu/edu-article/info',{id:this.data.id}).then(res => {
                if (res.code == '200'){
                  let info = res.data.info
                  this.setData({
                          info:info
                  })
                  if (info.type==2&&info.ziyuan_info&&info.ziyuan_info.id) {
                    this.setData({
                      infoS:info.ziyuan_info
                    })
                  }else if (info.type==4) {
                    this.setData({
                      infoS:info
                    })
                  }
                  wx.setNavigationBarTitle({
                    title: info.type==2?'直播课详情':info.type==4?info.title:'图文详情',
                  })
                  if (info.type==2&&(!info.ziyuan_info || !info.ziyuan_info.id)) {
                    this.setData({
                      tab:1
                    })
                  }else if (info.type == 1) {
                    this.setData({
                      tab:1
                    })
                  }
                }else{
                  app.func.$util.showError(res.msg) 
                }
              }).catch(err => {   
                console.log(err)
              })  
  },

  loadData2(){
        app.func.$http.get('edu/edu-course/info',{id:this.data.id}).then(res => {
                if (res.code == '200'){
                  let info = res.data.info
                  this.setData({
                          info:info
                  })
                  if (info.type==2&&info.ziyuan_info&&info.ziyuan_info.id) {
                    this.setData({
                      infoS:info.ziyuan_info
                    })
                  }else if (info.type==4) {
                    this.setData({
                      infoS:info
                    })
                  }
                  wx.setNavigationBarTitle({
                    title: info.type==2?'直播课详情':info.type==4?info.title:'图文详情',
                  })
                  if (info.type==2&&(!info.ziyuan_info || !info.ziyuan_info.id)) {
                    this.setData({
                      tab:1
                    })
                  }else if (info.type == 1) {
                    this.setData({
                      tab:1
                    })
                  }
                }else{
                  app.func.$util.showError(res.msg) 
                }
              }).catch(err => {   
                console.log(err)
              })  
  },

  goVideo(e){
          if (this.data.info.type == 2) {
                wx.navigateTo({
                        url: '/pages/videoPlay/index?url=' + this.data.info.video_url + '&title=' + this.data.info.title + '&cover=' + this.data.info.pic + '&id=' + this.data.id,
                })
          }
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
        this.setData({
                id:options.id,
                type:options.type
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
          var temp
          for (let i = 0; i < this.data.info.files.length; i++) {
            let item = this.data.info.files[i];
            if (item.ext.toLowerCase() == 'mp3' && i > this.data.audioIndex) {
              temp = item
              this.setData({
                playItem:item,
                audioIndex:i
              })
              this.data.audio.src = item.url
              this.data.audio.play()

              break
            }
          }
          if (!temp) {
            this.setData({
              state:'play'
            })
          }
        })
        
        innerAudioContext.onWaiting(() => {
          console.log('播放缓冲')
    
        })
    
        innerAudioContext.onError((res) => {
          // wx.showToast({
          //   title: '音频文件加载失败',
          //   icon:'error'
          // })
          // console.log(res)
        })
    
        this.setData({
          audio:innerAudioContext
        })
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
    let token = wx.getStorageSync('token')
        if (token && token.length>0) {
          if (this.data.type == 2) {
            app.func.$http.get('edu/edu-course/buy',{id:this.data.id}).then(res => {
              if (res.code == '200'){
                if (res.data.buy == 0) {
                  wx.reLaunch({
                    url: '/pages/centerDetail/index?id=' + res.data.group_id,
                  })
                }else{
                  if (this.data.type == 2) {
                    this.loadData2()
                  }else{
                        this.loadData()
                  }
                }
              }else{
                app.func.$util.showError(res.msg) 
              }
            }).catch(err => {   
              console.log(err)
            }) 
          }else{
            if (this.data.type == 2) {
              this.loadData2()
            }else{
                  this.loadData()
            }
          }
        }else{
          wx.reLaunch({
            url: '/pages/login/index',
          })
        }
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
    if (this.data.timer) {
      clearInterval(this.data.timer)
    }

    if (this.data.info.type != 2) {
      return
    }


    let token = wx.getStorageSync('token')
          if (!token) {
                  return
          }
        let today = new Date()
        let history = wx.getStorageSync('history')
        if (!history) {
                history = []
                let item = {
                        id:this.data.id,
                        cover:this.data.info.pic,
                        url:this.data.info.video_url,
                        title:this.data.info.title,
                        detail:this.data.detail,
                        year : today.getFullYear(),
                        month : (today.getMonth()+1).toString().padStart(2,'0'),
                        day : today.getDate().toString().padStart(2,'0'),
                        hour : today.getHours().toString().padStart(2,'0'),
                        min : today.getMinutes().toString().padStart(2,'0'),
                        sec : today.getSeconds().toString().padStart(2,'0')
                }
                history.push(item)
        }else{
                let arr = history.filter(val=>val.id == this.data.id)

                if (arr.length>0) {
                        let current = arr[0]
                        let index = history.indexOf(current)

                        current.id = this.data.id
                        current.cover = this.data.info.pic
                        current.url = this.data.info.video_url
                        current.title = this.data.info.title
                        current.detail = this.data.detail

                        current.year = today.getFullYear()
                        current.month = (today.getMonth()+1).toString().padStart(2,'0')
                        current.day = today.getDate().toString().padStart(2,'0')
                        current.hour = today.getHours().toString().padStart(2,'0')
                        current.min = today.getMinutes().toString().padStart(2,'0')
                        current.sec = today.getSeconds().toString().padStart(2,'0')
                        
                        history.splice(index,1)
                        history.unshift(current)
                }else{
                      let item = {
                              id:this.data.id,
                              cover:this.data.info.pic,
                              url:this.data.info.video_url,
                              title:this.data.info.title,
                              detail:this.data.detail,
                              year : today.getFullYear(),
                              month : (today.getMonth()+1).toString().padStart(2,'0'),
                              day : today.getDate().toString().padStart(2,'0'),
                              hour : today.getHours().toString().padStart(2,'0'),
                              min : today.getMinutes().toString().padStart(2,'0'),
                              sec : today.getSeconds().toString().padStart(2,'0')
                      }
                      history.unshift(item)
                }
        }
        
        history.forEach(val=>{
                let sec = parseInt(val.detail.duration - val.detail.currentTime)
                if (sec <= 0) {
                        val.left = '00:00:00'
                }else{
                        let min = 0
                        let hour = 0
                        if (sec >= 60) {
                                min = parseInt(sec / 60)
                                sec = parseInt(sec % 60)
                                if (min >= 60) {
                                        hour = parseInt(min / 60)
                                        min = parseInt(min % 60)
                                }
                        }
                        val.left = hour.toString().padStart(2,'0') + ':' + min.toString().padStart(2,'0') + ':' + sec.toString().padStart(2,'0')
                }
                val.progress = parseInt(val.detail.currentTime/val.detail.duration*100)
        })

        
        wx.setStorageSync('history', history)
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
      path: `/pages/squareDetail/index?id=` + this.data.id + '&type=' + this.data.type,
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