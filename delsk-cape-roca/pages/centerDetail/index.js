// pages/centerDetail/index.js
var app =  getApp();

Page({

  /**
   * Page initial data
   */
  data: {
          tab:0,
          info:{},
          id:'',
          list:[]
  },

  preview(e){
    let url = e.currentTarget.dataset.url
    wx.previewImage({
      current:url,
      urls: [url],
    })
  },

  join(){
          let token = wx.getStorageSync('token')
          if (token&&token.length>0) {
                //   wx.showLoading({
                //     title: '加入中...',
                //   })
                app.func.$http.get('edu/edu-course-user/add',{id:this.data.id}).then(res => {
                        wx.hideLoading()
                        if (res.code == '200'){
                                wx.showToast({
                                  title: '加入成功',
                                  icon:'none'
                                })
                                this.loadData()
                        }else{
                          app.func.$util.showError(res.msg) 
                        }
                      }).catch(err => {   
                        
                      })  
          }else{
                  wx.navigateTo({
                    url: '/pages/login/index?backType=1',
                  })
          }

  },

  loadData(){
        app.func.$http.get('edu/edu-course-group/info',{id:this.data.id}).then(res => {
                if (res.code == '200'){
                  this.setData({
                          info:res.data.info,
                          list:res.data.list
                  })
                  if (res.data.info.buy == 1) {
                    this.setData({
                      tab:1
                    })
                  }else{
                    this.setData({
                      tab:0
                    })
                  }
                }else{
                  app.func.$util.showError(res.msg) 
                }
              }).catch(err => {   
                
              })  
  },

  goDetail(e){
      let id = e.currentTarget.dataset.item.id
      //3精听
      if (e.currentTarget.dataset.item.type=='3') {
        wx.navigateTo({
          url: '/pages/classroom/index?id='+id,
        })
      }else{
        wx.navigateTo({
          url: '/pages/squareDetail/index?type=2&id='+id,
        })
      }
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
      path: `/pages/centerDetail/index?id=` + this.data.id,
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