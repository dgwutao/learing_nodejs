// pages/home/index.js
var app =  getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    list0:[],
    list2:[],
        list:[],
        banner:{},
        freeCourse:{},
        freeCourse2:{},
        recommends:[],
        recommends2:[]
  },

  toCishu(e){
    let token = wx.getStorageSync('token')
          if (token&&token.length>0) {
            app.func.$http.get('edu/edu-cishu/cishu-index',{}).then(res => {
              if (res.code == '200'){
                if (res.data.cs_info.id && res.data.cs_info.id.length>0) {
                  wx.navigateTo({
                    url: '/pages/beidanci1/index',
                  })
                }else{
                  wx.navigateTo({
                    url: '/pages/beidanci0/index',
                  })
                }
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

  toLetter(e){
    wx.navigateTo({
      url: '/pages/letterList/index',
    })
  },

  loadRecommend2(){
    app.func.$http.get('site/site-recommend/list',{pid:16}).then(res => {
            if (res.code == '200'){
              this.setData({
                      recommends2:res.data.list
              })
            }else{
              app.func.$util.showError(res.msg) 
            }
          }).catch(err => {   
            
          })  
        },

  loadRecommend(){
        app.func.$http.get('site/site-recommend/list',{pid:11}).then(res => {
                if (res.code == '200'){
                  this.setData({
                          recommends:res.data.list
                  })
                }else{
                  app.func.$util.showError(res.msg) 
                }
              }).catch(err => {   
                
              })  
  },

  loadBanner(){
        app.func.$http.get('site/site-recommend/one',{id:10}).then(res => {
                if (res.code == '200'){
                  this.setData({
                        banner:res.data.info
                  })

                }else{
                  app.func.$util.showError(res.msg) 
                }
              }).catch(err => {   
                
              })  

              app.func.$http.get('site/site-recommend/one',{id:13}).then(res => {
                if (res.code == '200'){
                  this.setData({
                        freeCourse:res.data.info
                  })

                }else{
                  app.func.$util.showError(res.msg) 
                }
              }).catch(err => {   
                
              })  

              app.func.$http.get('site/site-recommend/one',{id:15}).then(res => {
                if (res.code == '200'){
                  this.setData({
                        freeCourse2:res.data.info
                  })
                }else{
                  app.func.$util.showError(res.msg) 
                }
              }).catch(err => {   
                
              })  
  },

  loadData(){
    //3 专栏
        app.func.$http.get('edu/edu-course-group/list',{
          heji_type:'3',
          pageSize:'9999'
        }).then(res => {
                if (res.code == '200'){
                  this.setData({
                          list0:res.data.list
                  })
                }else{
                  app.func.$util.showError(res.msg) 
                }
              }).catch(err => {   
                
              })  

              //2 课程
              app.func.$http.get('edu/edu-course-group/list',{
                heji_type:'2',
                pageSize:'9999'
              }).then(res => {
                      if (res.code == '200'){
                        this.setData({
                                list2:res.data.list
                        })
      
                      }else{
                        app.func.$util.showError(res.msg) 
                      }
                    }).catch(err => {   
                      
                    })

                    //1 直播课
                    app.func.$http.get('edu/edu-course-group/list',{
                      heji_type:'1',
                      pageSize:'9999'
                    }).then(res => {
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

  toDetail(e){
        let url = e.currentTarget.dataset.url
        if (url.length==0) {
                return
        }else if (url.startsWith('http')){
                wx.navigateTo({
                  url: '/pages/webview/index?url=' + url,
                })
        }else{
          wx.navigateTo({
            url: '/' + url,
          })
        }
  },

  toDetail2(e){
        let id = e.currentTarget.dataset.item.id
        wx.navigateTo({
          url: '/pages/centerDetail/index?id='+id,
        })

        // wx.navigateTo({
        //   url: '/pages/classroom/index',
        // })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {

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
          this.loadRecommend()
          this.loadRecommend2()
          this.loadBanner()
          this.loadData()
          app.func.$util.checkIfBanned()
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