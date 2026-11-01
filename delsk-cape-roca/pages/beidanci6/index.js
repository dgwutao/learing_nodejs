// pages/beidanci6/index.js
const app =  getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    change:0,
    cs_info:{},
    jh_info:{},
    jihua_arr:[],
    freeCourse:{},
    data:{},
    rate:0,

    id:'',
    showSlider:false,
    showSlider2:false,

    columns: [
      {
        values: [],
        className: 'column1',
      },
      {
        values: [],
        className: 'column2',
      },
    ],

    date:'',
    date1:'',
    column1:[],
    column2:[],

    index:0
  },

  knowit(e){
    this.sizerClose()
    this.loadData()

    if (this.data.change==1) {
      wx.navigateBack()
    }else{
      wx.navigateTo({
        url: '/pages/beidanci1/index',
      })
    }
  },

  loadData(){
    let that = this
    app.func.$http.get('edu/edu-cishu/cishu-index',{}).then(res => {
      if (res.code == '200'){
        let column1 = []
        let column2 = []
        var index = 0
        res.data.jihua_arr.forEach(val=>{
          column1.push(val.danci_num)
          column2.push(val.day + '天')
          if (that.data.change == 1) {
            if (parseInt(res.data.jh_info.danci_day) == val.day) {
              this.setData({
                date:val.wancheng_day_1,
                date1:val.wancheng_day,
                index:index
              })
              //使用defaultIndex不起作用
              setTimeout(() => {
                let picker = that.selectComponent('#picker')
                picker.setColumnIndex(0,that.data.index)
                picker.setColumnIndex(1,that.data.index)
              }, 200);
            }else{
              index++
            }
          }else{
            if (index == 0) {
              this.setData({
                date:val.wancheng_day_1,
                date1:val.wancheng_day,
                index:0
              })
            }
            index++
          }
        })
        let columns = [
          {
            values:column1,
            className: 'column1',
          },
          {
            values:column2,
            className: 'column2',
          },
        ]

        this.setData({
          column1:column1,
          column2:column2,
          cs_info:res.data.cs_info,
          jh_info:res.data.jh_info,
          jihua_arr:res.data.jihua_arr,
          data:res.data,
          rate:res.data.cs_info.wancheng_num/res.data.cs_info.danci_num*100,
          columns:columns
        })
      }else{
        app.func.$util.showError(res.msg) 
      }
    }).catch(err => {   
      
    })  
  },

  loadData2(){
    app.func.$http.get('edu/edu-cishu/cishu-info',{
      id:this.data.id
    }).then(res => {
      if (res.code == '200'){
        let column1 = []
        let column2 = []
        var index = 0
        res.data.jihua_arr.forEach(val=>{
          column1.push(val.danci_num)
          column2.push(val.day + '天')
          if (index == 0) {
            this.setData({
              date:val.wancheng_day_1,
              date1:val.wancheng_day,
              index:0
            })
          }
          index++
        })
        let columns = [
          {
            values: column1,
            className: 'column1',
          },
          {
            values: column2,
            className: 'column2',
          },
        ]

        this.setData({
          column1:column1,
          column2:column2,
          cs_info:res.data.cishu_info,
          jihua_arr:res.data.jihua_arr,
          rate:res.data.cishu_info.wancheng_num/res.data.cishu_info.danci_num*100,
          columns:columns
        })
      }else{
        app.func.$util.showError(res.msg) 
      }
    }).catch(err => {   
      
    })  
  },

  saveData(){
    app.func.$http.get('edu/edu-cishu/jihua-save',{
      is_index:'1',
      cishu_id:this.data.id,
      wancheng_riqi:this.data.date1,
      danci_day_num:this.data.jihua_arr[this.data.index].danci_num,
      danci_day:this.data.jihua_arr[this.data.index].day
    }).then(res => {
      if (res.code == '200'){
        this.setData({
          showSlider2:true
        })
      }else{
        app.func.$util.showError(res.msg) 
      }
    }).catch(err => {   
      
    })  
  },

  goon(e){
    app.func.$http.get('edu/edu-cishu/jindu-chongzhi',{
      cishu_id:this.data.id
    }).then(res => {
      if (res.code == '200'){
        this.setData({
          showSlider:false
        })

        wx.showToast({
          title: '重置成功',
          icon:'none'
        })
        this.loadData()
      }else{
        app.func.$util.showError(res.msg) 
      }
    }).catch(err => {   
      this.setData({
        showSlider:false
      })
    }) 
  },

  reset(e){
    this.setData({
      showSlider:true
    })
  },

  onChange(event) {
    const { picker, value, index } = event.detail;
    if (index==0) {
      let idx = this.data.column1.indexOf(value[0])
      picker.setColumnIndex(1,idx)
      let val = this.data.jihua_arr[idx]
      this.setData({
        date:val.wancheng_day_1,
        date1:val.wancheng_day,
        index:idx
      })
    }else{
      let idx = this.data.column2.indexOf(value[1])
      picker.setColumnIndex(0,idx)
      let val = this.data.jihua_arr[idx]
      this.setData({
        date:val.wancheng_day_1,
        date1:val.wancheng_day,
        index:idx
      })
    }
  },

  sizerClose() {
    this.setData({
      showSlider: false,
      showSlider2: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id:options.id
    })

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
    if (this.data.change==1) {
      this.loadData()
    }else{
      this.loadData2()
    }
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