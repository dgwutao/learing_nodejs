// components/searchInput/searchInput.js
const util = require('../../utils/util')
const http = require('../../utils/http')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder:{
      type:String,
      value: '请输入房间信息进行搜索'
    },
    searchValue:{
      type:String,
      value: ''
    },
    showSearch:{
      type:Boolean,
      value:false
    }
  },
  observers: {
        'searchValue': function (newVal) {
            this.setData({
              value:newVal
            })             
        }
  },

  /**
   * 组件的初始数据
   */
  data: {
    value:'',
    canClear:false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeValue:util.debounce(function(e){
      const inputValue = e.detail.value
      this.setData({
        value:inputValue,
        canClear:inputValue?true:false
      })

      this.triggerEvent('startSearch',inputValue)
    },200),

    clearInput(){
      this.setData({
        value:'',
        canClear:false
      })
      this.triggerEvent('startSearch',this.data.value)
    },

    startSearch(){
      this.triggerEvent('startSearch',this.data.value)
    }
  }
})
