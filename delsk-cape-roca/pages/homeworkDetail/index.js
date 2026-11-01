// pages/homeworkDetail/index.js
var app =  getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fold_audio_name:'',
    showAudioRates:false,
    audioRates:['0.5','0.8','1.0','1.25','1.5','2.0'],
    currentAudioRate:'1.0',
    currentIndex:-1,
    timer:Object,
    length:0,
    footerHeight:100,
    inputHeight:0,
    toView:'',
    id:'',
    barHeight:180,
    fold:true,
    value:'',
    showVoice:false,
    isRecording:false,
    audio:Object,
    recorder:Object,
    info:{},
    course:{},
    list:[],
    tempAudio:{},
    playing_audio_state:'',
    userId:'',
    is_tutor:false,
    popup:'',
    showDia:false,
    delete_item:{}
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

  goDelete(e){
        this.setData({
                showDia:false
        })
        app.func.$http.get('edu/edu-task/comment-del',{
          id:this.data.delete_item.id
        }).then(res => {
          wx.hideLoading()
                if (res.code == '200'){
                  wx.showToast({
                    title: '删除成功',
                    icon:'none'
                  })
                  this.loadData2()
                  this.closePopup()
                }else{
                  app.func.$util.showError(res.msg) 
                }
              }).catch(err => {   
                wx.hideLoading()
                this.closePopup()
                wx.showToast({
                  title: err.msg,
                  icon:'error'
                })
              })  
  },

  showPopop(e){
          let item = e.currentTarget.dataset.item
          this.setData({
                  popup:item.id,
                  delete_item:item
          })
  },

  recallMessage(e){
          this.setData({
                  popup:'',
                  showDia:true
          })
  },

  startTimer(){
    let interval = setInterval(() => {
      if (this.data.currentIndex > -1) {
        let info = this.data.info
        let item = info.audios[this.data.currentIndex]
        let progress = this.data.audio.currentTime/this.data.audio.duration*100
        let current = this.formateTime(this.data.audio.currentTime)
        item.value = progress
        item.start = current
        this.setData({
          info:info
        })
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

  loadData(){
    let param = {}
    param.id = this.data.id
    if (this.data.is_tutor) {
      param.user_id = this.data.userId
    }
    app.func.$http.get('edu/edu-task/detail',param).then(res => {
            if (res.code == '200'){
              let list = res.data.list
              list.forEach(item=>{
                if (item.type == '2' && item.url.indexOf('?') != -1) {
                  item.short = item.url.split("?")[0]
                }
              })
              res.data.info.audios.forEach(val=>{
                val.value = 0
                val.start = '00:00'
                val.end = this.formateTime(val.audio_size)
              })
              this.setData({
                info:res.data.info,
                course:res.data.course,
                list:list
              })
              if (res.data.info.audios&&
                  res.data.info.audios.length>0) {
                this.setData({
                  fold_audio_name:res.data.info.audios[0].name
                })
              }
              setTimeout(() => {
                this.setData({
                  toView:'footer'
                })
              }, 300);
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

   loadData2(){
    let param = {}
    param.id = this.data.id
    if (this.data.is_tutor) {
      param.user_id = this.data.userId
    }
    app.func.$http.get('edu/edu-task/detail',param).then(res => {
            if (res.code == '200'){
              let list = res.data.list
              list.forEach(item=>{
                if (item.type == '2' && item.url.indexOf('?') != -1) {
                  item.short = item.url.split("?")[0]
                }
              })
              res.data.info.audios.forEach(val=>{
                val.value = 0
                val.start = '00:00'
                val.end = this.formateTime(val.audio_size)
              })
              this.setData({
                info:res.data.info,
                course:res.data.course,
                list:list
              })
              if (res.data.info.audios&&
                res.data.info.audios.length>0) {
                  this.setData({
                    fold_audio_name:res.data.info.audios[0].name
                  })
              }
              // setTimeout(() => {
              //   this.setData({
              //     toView:'footer'
              //   })
              // }, 300);
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

   sendData(url,text,type,audio_size){
    // 类型 1文本 2图片 3语音
    let param = {}
    param.course_id = this.data.id,
    param.url = url,
    param.content = text,
    param.type = type,
    param.audio_size = audio_size
    if (this.data.is_tutor) {
      param.userid = this.data.userId
    }
                app.func.$http.get('edu/edu-task/add',param).then(res => {
                  wx.hideLoading()
                        if (res.code == '200'){
                          this.loadData()
                          this.closePopup()
                        }else{
                          app.func.$util.showError(res.msg) 
                        }
                      }).catch(err => {   
                        wx.hideLoading()
                        wx.showToast({
                          title: err.msg,
                          icon:'error'
                        })
                      })  
   },

  closePopup(e){
    this.setData({
      fold:true,
      showVoice:false,
      barHeight:180,
      footerHeight:100,
      popup:'',
      showDia:false,
      delete_item:{}
    })

    // this.setData({
    //   toView:'footer'
    // })
  },

  bindConfirm(e){
    if (this.data.value.length == 0) {
      wx.showToast({
        title: '请输入内容',
        icon:'none'
      })
      return
    }
    this.sendData('',this.data.value,'1','')
    this.setData({
      value:''
    })
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

  rerecord(e){
    this.setData({
      tempAudio:''
    })
  },

  record:function (e){
    let state = !this.data.isRecording
    // setTimeout(() => {
      if (state) {
        //
        const options = {
          duration: 300000,
          sampleRate: 48000,
          numberOfChannels: 1,
          encodeBitRate: 192000,
          format: 'mp3',
          frameSize: 50
        }
        this.data.recorder.start(options)
      }else{
        this.setData({
          isRecording:state
        })
        this.data.recorder.stop()
      }
    // }, 1000);
  },

  selectImage(){
    const that = this
    wx.chooseImage({
      count: 9,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success: (result)=>{
        wx.showLoading({
          title: '正在发送...'
        })
        // let url = result.tempFilePaths[0]
        result.tempFilePaths.forEach(url=>{
          wx.uploadFile({
            url: 'https://api.delsk.com/api/upload/images',  
            filePath:url, 
            name: 'file', 
            header: {
              'content-type': 'multipart/form-data'
            }, 
            formData: {method: 'POST'}, 
            success: function (res) {
              let data = JSON.parse(res.data)
              console.log(data)
              that.sendData(data.data.url.fileUrl,'','2','')
            },fail:function (err){
              wx.hideLoading()
              wx.showToast({
                title: err.msg,
                icon:'error'
              })
            }
          })
        })
      },
    });
  },

  showVoiceAction(e){
          let state = !this.data.showVoice
          this.setData({
                  showVoice:state
          })
          if (this.data.showVoice) {
            this.setData({
              barHeight:650,
              footerHeight:500
            })
          }else{
            this.setData({
              barHeight:180,
              footerHeight:100
            })
          }

            this.setData({
              toView:'footer'
            })
  },

  bindFocus(e){
    var inputHeight = 0
    if (e.detail.height) {
      inputHeight = e.detail.height
    }

    this.setData({
      inputHeight:inputHeight
      // barHeight:180 + e.detail.height
    })
  },

  bindBlur(e){
    // this.setData({
    //   barHeight:180
    // })
  },

  handleChange: function (e) {
    this.setData({
      value: e.detail.value
    })
  },

  changeFold(e){
    let state = !this.data.fold
    this.setData({
      fold:state
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id:options.id
    })
    if (options.userId) {
      this.setData({
        userId:options.userId
      })
    }
    let type = wx.getStorageSync('user.type')
    if (type == 2) {
      this.setData({
        is_tutor : true
      })
    }else{
      this.setData({
        is_tutor : false
      })
    }
    this.loadData()
    
    const innerAudioContext = wx.createInnerAudioContext({
      useWebAudioImplement: false,
      autoplay:false
    })
    innerAudioContext.useWebAudioImplement = false
    innerAudioContext.autoplay = false
    innerAudioContext.loop = false
    innerAudioContext.onCanplay(() => {
      // console.log('可以播放')
    })

    innerAudioContext.onTimeUpdate((e)=>{

    })
    innerAudioContext.onPlay(() => {
      // console.log('开始播放')

      // if (this.data.currentIndex > -1) {
      //   let info = this.data.info
      //   let item = info.audios[this.data.currentIndex]
      //   this.setData({
      //     playing_audio_state:item.name
      //   })
      // }
    })

    innerAudioContext.onPause(() => {
      // console.log('暂停播放')


      // this.setData({
      //   currentIndex : -1
      // })
      // clearInterval(this.data.timer)

      
    })

    innerAudioContext.onEnded(() => {
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
      // console.log('播放缓冲')

    })

    innerAudioContext.onError((res) => {
      wx.showToast({
        title: '音频文件加载失败',
        icon:'error'
      })
      // console.log(res)
      this.setData({
        playing_audio_state:'',
        currentIndex : -1
      })

      clearInterval(this.data.timer)
    })

    this.setData({
      audio:innerAudioContext
    })

    const recorderManager = wx.getRecorderManager()

    recorderManager.onStart(() => {
      console.log('recorder start')
      this.setData({
        isRecording:true
      })
    })

    recorderManager.onPause(() => {
      console.log('recorder pause')
    })

    recorderManager.onStop((res) => {
      console.log('recorder stop', res)
      this.setData({
        tempAudio:res
      })
      this.setData({
        isRecording:false
      })
    })

    recorderManager.onError((res) => {
      console.log('recorder error：', res.errMsg)
      // wx.showToast({
      //   title: '麦克风打开失败',
      //   icon:'error'
      // })
    })

    this.setData({
      recorder:recorderManager
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

  sendVoice(e){
    if (this.data.tempAudio.tempFilePath&&this.data.tempAudio.tempFilePath.length>0) {
      wx.showLoading({
        title: '正在发送...',
      })
      let that = this
      let url = this.data.tempAudio.tempFilePath
      wx.uploadFile({
        url: 'https://api.delsk.com/api/upload/images?type=file',  
        filePath:url, 
        name: 'file', 
        header: {
          'content-type': 'multipart/form-data'
        }, 
        formData: {method: 'POST'}, 
        success: function (res) {
          let data = JSON.parse(res.data)
          let length = parseInt(that.data.tempAudio.duration/1000).toString()
          that.sendData(data.data.url.fileUrl,'','3',length)
          that.setData({
            tempAudio:''
          })
        },fail:function (err){
          wx.hideLoading()
          wx.showToast({
            title: err.msg,
            icon:'error'
          })
        }
      })
    }else{
      wx.showToast({
        title: '请先录音',
        icon:'none'
      })
    }
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
        this.data.audio.stop()
        this.data.audio.destroy()

        this.data.recorder.stop()

        clearInterval(this.data.timer)
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