// pages/square/index.js
var app =  getApp();


Page({

  /**
   * Page initial data
   */
  data: {
          list:[],
          tab:0,
          id:''
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
        let id = ''
        if (this.data.id == '生活类') {
          id = '1'
        }
        if (this.data.id == '美食类') {
          id = '2'
        }
        if (this.data.id == '文化类') {
          id = '3'
        }
        if (this.data.id == '旅游类') {
          id = '4'
        }
        app.func.$http.get('edu/edu-article/list',{
          page:'1',
          pageSize:'9999',
          cat_id:id
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

  }
})