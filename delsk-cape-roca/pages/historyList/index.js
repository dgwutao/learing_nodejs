// pages/historyList/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
          list:[],
          list2:[],
          list3:[]
  },

  goVideo(e){
        let item = e.currentTarget.dataset.item
      wx.navigateTo({
              url: '/pages/videoPlay/index?url=' + item.url + '&title=' + item.title + '&cover=' + item.cover + '&id=' + item.id + '&time=' + item.detail.currentTime,
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
          let list = []
          let list2 = []
          let list3 = []
          let today = new Date()
          let history = wx.getStorageSync('history')
          history.forEach(val=>{
                  if (val.year == today.getFullYear() &&
                      val.month == (today.getMonth()+1).toString().padStart(2,'0') &&
                      val.day == today.getDate().toString().padStart(2,'0')) {
                          list.push(val)
                  }else{
                          let date = new Date(val.year + '/' + val.month + '/' + val.day + ' 00:00:00')
                          var dateDiff = today.getTime() - date.getTime()
                          var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000))
                          
                          console.log(dayDiff)
                          if (dayDiff > 7) {
                                list3.push(val)
                          }else{
                                list2.push(val)
                          }       
                  }
          })
          this.setData({
                  list:list,
                  list2:list2,
                  list3:list3
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
  // onShareAppMessage() {

  // }
})