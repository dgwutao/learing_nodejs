// pages/square/index.js
var app =  getApp();


Page({

  /**
   * Page initial data
   */
  data: {
          list:[],
          tab:0,
          place:{pic:'aa'}
  },

  goList(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/squareList/index?id=' + id,
    })

  },

  switchTab(e){
    let index = e.currentTarget.dataset.id



    
    this.setData({
      tab:index
    })
  },

  loadData(){
        app.func.$http.get('edu/edu-article/list',{
          page:'1',
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
        let id = e.currentTarget.dataset.item.id
        if (e.currentTarget.dataset.item.type=='3') {
          wx.navigateTo({
            url: '/pages/classroom/index?type=2&id='+id,
          })
        }else{
          wx.navigateTo({
            url: '/pages/squareDetail/index?id='+id,
          })
        }
        
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
        this.loadData()

        app.func.$http.get('site/site-recommend/one',{id:14}).then(res => {
          if (res.code == '200'){
            if (res.data) {
              this.setData({
                place:res.data.info
              })
            }else{
              this.setData({
                place:{}
              })
            }
            
          }else{
            app.func.$util.showError(res.msg) 
          }
        }).catch(err => {})  
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