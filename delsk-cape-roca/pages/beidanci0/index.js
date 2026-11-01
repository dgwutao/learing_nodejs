// pages/beidanci0/index.js
const app =  getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showDia:false,
    list:[],
    item:{},
    change:0
  },

  goOK(){
    if (this.data.item.have_jihua == 1) {
      app.func.$http.get('edu/edu-cishu/jihua-save',{
        is_index:'1',
        cishu_id:this.data.item.id,
      }).then(res => {
        if (res.code == '200'){
          wx.showToast({
            title: '更换成功',
            icon:'none'
          })
          setTimeout(() => {
            wx.navigateBack()
          }, 1000);
        }else{
          app.func.$util.showError(res.msg) 
        }
      }).catch(err => {   
        
      })
    }else{
      wx.navigateTo({
        url: '/pages/beidanci6/index?id='+this.data.item.id,
      })
    }
  },

  click(e){
    let item = e.currentTarget.dataset.item
    if (this.data.change == 1) {
      this.setData({
        showDia:true,
        item:item
      })
    }else{
      // if (item.have_jihua == 1) {
      //   wx.navigateTo({
      //     url: '/pages/beidanci1/index',
      //   })
      // }else{
        wx.navigateTo({
          url: '/pages/beidanci6/index?id='+item.id,
        })
      // }

      // app.func.$http.get('edu/edu-cishu/jihua-save',{
      //   is_index:'1',
      //   cs_id:item.id,
      // }).then(res => {
      //   if (res.code == '200'){
          // wx.navigateTo({
          //   url: '/pages/beidanci6/index?id='+item.id,
          // })
      //   }else{
      //     app.func.$util.showError(res.msg) 
      //   }
      // }).catch(err => {   
        
      // })
    }
  },

  loadData(){
    app.func.$http.get('edu/edu-cishu/cishu-list',{page:1,pageSize:9999}).then(res => {
      if (res.code == '200'){
        res.data.list.forEach(val=>{
          val.rate = val.wancheng_num/val.danci_num*100
        })
        this.setData({
             list:res.data.list
        })
      }else{
        app.func.$util.showError(res.msg) 
      }
    }).catch(err => {   
      
    })  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.change) {
      this.setData({
        change:options.change
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

    this.loadData()
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