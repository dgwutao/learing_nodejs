// components/h-btn/h-btn.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text:{
      type:String,
      require:true
    },
    type:{
      type:String,
      value:'standard',// warning,success,info,danger
    },
    height:{
      type:[String,Number],
      value:''
    },
    fontSize:{
      type:[String,Number],
      value:''
    },
    size:{
      type:String,
      value:'standard' // standard,big,small,mini
    },
    unchoosed:{
      type:Boolean,
      value:false
    },
    bold:{
      type:Boolean,
      value:false
    },
    minWidth:{
      type:[Number,String],
      value:''
    },
    iconwidth:{
      type:[Number,String],
      value:24
    },
    iconsrc:{
      type:String
    },
    noshadow:{
      type:Boolean,
      value:false
    },
    borderRadius:{
      type:[Number,String]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onclick(){
      this.triggerEvent('click')
    }
  }
})
