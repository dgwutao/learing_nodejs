// pages/videoPlay/index.js
var app =  getApp();

Page({

  /**
   * Page initial data
   */
  data: {
        context:Object,
        url:'',
        title:'',
        cover:'',
        id:'',
        detail:{},
        initial_time:0
  },

  handleSeek(e){

        
  },

  handleProgress(e){

        
  },

  handleTimeUpdate(e){
        this.setData({
                detail:e.detail
        })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
        this.setData({
                id:options.id,
                url:options.url,
                title:options.title,
                cover:options.cover,
        })
        if (options.time) {
                this.setData({
                        initial_time:options.time
                })
        }
        wx.setNavigationBarTitle({
          title: this.data.title,
        })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {
        let context = wx.createVideoContext('video')
        if (this.data.initial_time > 0) {
                context.pause()
                context.seek(parseInt(this.data.initial_time))
        }
        context.play()
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
                        cover:this.data.cover,
                        url:this.data.url,
                        title:this.data.title,
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
                        current.cover = this.data.cover
                        current.url = this.data.url
                        current.title = this.data.title
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
                              cover:this.data.cover,
                              url:this.data.url,
                              title:this.data.title,
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

  }
})