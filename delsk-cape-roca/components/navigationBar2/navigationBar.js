

Component({
  options:{
    multipleSlots:true
  },
  properties:{
    title:{
      type:String,
      value:''
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
      value: 'rgba(0,0,0,0)'
    },
    goIndexReal:{
      type:Boolean,
      value:false
    },
    share:{
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
    opacityVal:{
      type:Number,
      value:1
    },
    colorVal:{
      type:String,
      value:'white'
    },
    backgroundVal:{
      type:String,
      value:'transparent'
    },
    iconBackType:{
      type:Number,
      value:1
    }

  },
  data:{
    opacity:0,
    backgroundChange:'transparent',
    titleColor:'white',
  },
  
  methods:{
    goRealIndex:function(){
      wx.switchTab({
        url: '/pages/realIndex/realIndex',
      })
    },

    goShare(e){
        this.triggerEvent('goShare')
    },

    goBack:function(){
      let curPages =  getCurrentPages();
      console.log(curPages)
      if(curPages.length>1){
        wx.navigateBack({
          delta:1,
          // fail(){
          //   wx.navigateTo({
          //     url:'/pages/realIndex/realIndex'
          //   })
          // }
        })
      }else{
        wx.navigateTo({
          url:'/pages/realIndex/realIndex'
        })
      }
      
    }
  }
})