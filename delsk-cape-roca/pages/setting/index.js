// pages/setting/index.js
var app =  getApp();

Page({

  /**
   * Page initial data
   */
  data: {
        showChangeName:false,
        value:'',
        showLogout:false,
        avatarUrl:'',
        user:{}
  },

  getUserInfo(){
        app.func.$http.get('edu/edu-user/info',{}).then(res=> {
          if(res.code == 200 ){
            this.setData({
                    user:res.data.info
            })
          }else{
            wx.showToast({
              title: res.msg,
              icon: 'none',
            });
          }
        })
      },

  setUserInfo(head,name){
          let param = {}
          if (head.length>0) {
                  param.head = head
          }
          if (name.length>0) {
                param.name = name
          }
        app.func.$http.get('edu/edu-user/edit',param).then(res=> {
          if(res.code == 200 ){
                  this.getUserInfo()
                wx.showToast({
                        title: '修改成功',
                        icon:'none'
                })
          }else{
            wx.showToast({
              title: res.msg,
              icon: 'none',
            });
          }
        })
  },

  onChooseAvatar(e) {
        const { avatarUrl } = e.detail 
        this.setData({
          avatarUrl,
        })
        let that = this
        wx.uploadFile({
                url: 'https://api.delsk.com/api/upload/images',
                filePath: avatarUrl, 
                name: 'file', 
                header: {
                  'content-type': 'multipart/form-data'
                }, 
                formData: {
                  method: 'POST'
                }, 
                success: function (res) {
                  let data = JSON.parse(res.data)
                  that.setUserInfo(data.data.url.fileUrl,'')
                },
                fail: function (res) {}
        })
  },

  handleChange: function (e) {
        this.setData({
          value: e.detail.value
        })
  },

  OK(e){
        this.setUserInfo('',this.data.value)
  },

      selectImage() {
        let sourceType = ['album', 'camera']
        let that = this
        wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: sourceType,
          success: function (e) {
            let element = e.tempFilePaths[0]
            wx.uploadFile({
                url: 'https://api.delsk.com/api/upload/images',
                filePath: element, 
                name: 'file', 
                header: {
                  'content-type': 'multipart/form-data'
                }, 
                formData: {
                  method: 'POST'
                }, 
                success: function (res) {
                        let data = JSON.parse(res.data)
                        that.setUserInfo(data.data.url.fileUrl,'')
                },
                fail: function (res) {}
        })
          }
        })
      },

  changeAvatar(e){
          this.selectImage()
  },

  changeName(e){
        this.setData({
                showChangeName:true
        })
  },

  logout(e){
          this.setData({
                showLogout:true
          })
  },

  goLogout(e){
        this.setData({
                showLogout:false
          })
        wx.removeStorage({
                key: 'token',
        })
        wx.removeStorage({
                key: 'history',
        })
        wx.removeStorage({
          key: 'user.type',
        })
        wx.removeStorage({
          key: 'user.id',
        })
        wx.navigateBack({
          delta: 0,
        })
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
          this.getUserInfo()
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