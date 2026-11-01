Component({
  options:{
    multipleSlots:true
  },
  properties:{
    title:{
      type:String,
      value:'Delsk Partner'
    },
    titleColor:{
      type:String,
      value:'#262626'
    },
    navigationBarHeight:{
      type:Number,
      value:154
    },
    statusBarHeight:{ //状态栏占位的高度
      type:Number,
      value:0
    },
    background: {
      type:null,
      value: 'rgba(255,255,255,0)'
    },
    goIndexReal:{
      type:Boolean,
      value:false
    },

    goBack:{
      type:Boolean,
      value:true
    },
    haveShadow:{
      type:Boolean,
      value:true
    },
    ishiddenBar:{
      type:Boolean,
      value:false
    },

  },
  
  data:{

  },
  methods:{
    goRealIndex:function(){
      wx.switchTab({
        url: '/pages/index/index',
      })
    },
    goBack:function(){
      wx.navigateBack({
        delta:1
      })
    }
  }
})