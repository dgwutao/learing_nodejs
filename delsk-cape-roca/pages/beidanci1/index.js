// pages/beidanci1/index.js
const app =  getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showDia:false,
    cs_info:{},
    jh_info:{},
    jihua_arr:[],
    freeCourse:{},
    data:{},
    rate:0
  },

  closePop(e){

    this.setData({
      showDia:false
    })
  },

  loadData(){
    app.func.$http.get('edu/edu-cishu/cishu-index',{}).then(res => {
      if (res.code == '200'){
        this.setData({
          cs_info:res.data.cs_info,
          jh_info:res.data.jh_info,
          jihua_arr:res.data.jihua_arr,
          data:res.data,
          rate:res.data.cs_info.wancheng_num/res.data.cs_info.danci_num*100
        })
      }else{
        app.func.$util.showError(res.msg) 
      }
    }).catch(err => {   
      
    })  
  },

  goPlan(e){
    // +this.data.cs_info.id
    wx.navigateTo({
      url: '/pages/beidanci6/index?change=1&id='+this.data.cs_info.id,
    })
  },

  change(e){
    wx.navigateTo({
      url: '/pages/beidanci0/index?change=1',
    })
  },

  gogogo(e){
    if (this.data.data.xuexi_wancheng==1) {
      return
    }
    wx.navigateTo({
      url: '/pages/beidanci5/index?cishu_id='+this.data.cs_info.id,
    })
  },

  gogogo2(e){
    this.setData({
      showDia:true
    })
  },

  goOK(e){
    app.func.$http.get('edu/edu-cishu/laqu',{
      cishu_id:this.data.cs_info.id,
      is_jixu:'1'
    }).then(res => {
      if (res.code == '200'){
        this.loadData()
      }else{
        app.func.$util.showError(res.msg) 
      }
    }).catch(err => {   
      
    })
  },

  toCollection(e){
    wx.navigateTo({
      url: '/pages/beidanci2/index?id='+this.data.cs_info.id,
    })
  },

  toList(e){
    wx.navigateTo({
      url: '/pages/beidanci3/index?id='+this.data.cs_info.id,
    })
  },

  toLetter(e){
    wx.navigateTo({
      url: '/pages/letterList/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
    this.loadData()
    
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
  onShareAppMessage() {

  }
})