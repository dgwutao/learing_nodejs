// pages/center/index.js
var app =  getApp();

Page({

  /**
   * Page initial data
   */
  data: {
          list:[],
          isLogin:false,
          tab:0,
          homework:[],
          showReddot:false,
          is_student:false,
          show_no_data0:false,
          show_no_data1:false,
  },

  goHomework(e){
    let id = e.currentTarget.dataset.item.id
    wx.navigateTo({
      url: '/pages/homeworkDetail/index?id='+id,
    })

    // wx.navigateTo({
    //   url: '/pages/homework/index?id='+id,
    // })
  },

  changeTab(e){
    let tab = e.currentTarget.dataset.tab
    this.setData({
            tab:tab
    })
  },

  loadData(){
        app.func.$http.get('edu/edu-course-user/list',{}).then(res => {
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

  loadHome(){
    app.func.$http.get('edu/edu-task/list',{}).then(res => {
            if (res.code == '200'){
              var show = false
              res.data.list.forEach(item=>{
                if (item.is_post == 1 && item.is_read == 0) {
                  show = true
                }
              })
              this.setData({
                     homework:res.data.list,
                     showReddot:show
              })
              let list = res.data.list
                  let s0 = list.filter(item => item.is_post == '1')
                  if (s0&&s0.length>0) {
                    this.setData({
                      show_no_data0:false
                    })
                  }else{
                    this.setData({
                      show_no_data0:true
                    })
                  }
                  let s1 = list.filter(item => item.is_post == '0')
                  if (s1&&s1.length>0) {
                    this.setData({
                      show_no_data1:false
                    })
                  }else{
                    this.setData({
                      show_no_data1:true
                    })
                  }
            }else{
              app.func.$util.showError(res.msg) 
            }
          }).catch(err => {   
            
          })  
  },

  toDetail(e){
          let id = e.currentTarget.dataset.item.id
        wx.navigateTo({
          url: '/pages/centerDetail/index?id=' + id,
        })
  },

  login(){
        wx.navigateTo({
          url: '/pages/login/index',
        });
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
        this.setData({
                isLogin:!!wx.getStorageSync('token')
        })
        if (this.data.isLogin) {
          let type = wx.getStorageSync('user.type')

          if (type == 1) {
            this.setData({
              is_student:true
            })
          }else{
              this.setData({
                is_student:false
              })
          }
                this.loadData()
                this.loadHome()
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