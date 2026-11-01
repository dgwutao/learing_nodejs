// components/share-btn/index.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    info: {
      type: Object,
      value: {},
    },
    picurl: {
      type: String,
      value: ''
    },
    label:{
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    loadding: false,
    imagePath: '',
    Height: '',
    currentHeight: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {

    createpic() {
      this.setData({
        loadding: true
      })

      let height = 2000
      const context = wx.createCanvasContext('canvasPoster', this)
      height = this.canvasTextHeight(this.properties.info.advantage_desc, context, 40, height, 50, 620,28)
      console.log(height)
      this.setData({
        Height: height
      })
      var that = this;
      

      wx.getImageInfo({
        src: this.properties.picurl, //服务器返回的图片地址
        success: function (res) {
          //res.path是网络图片的本地地址 
          let Path = res.path;
          console.log(res)
          context.setFillStyle("#ffffff")
          context.fillRect(0, 0, 750, height)
          context.drawImage('/image/shared_page_4.png', 0, 0, 750, 110);
          context.setFillStyle("#4A4A4A")
          context.fillRect(0, 110, 750, 750)
          let w = 0
          let h = 0
          let x = 0
          let y = 0
          if (res.width >= res.height) {
            w = 750
            h = 750 * res.height / res.width
            y = (750 - h) / 2
          } else {
            h = 750
            w = 750 * res.width / res.height
            x = (750 - w) / 2
          }
          y+=110
          context.drawImage(Path, x, y, w, h);
          if (that.properties.label=="户型图")
            context.drawImage('/image/shared_page_2.png', 40, 780, 128, 60);
          else
          context.drawImage('/image/shared_page_1.png', 40, 780, 100, 60);  
          that.setData({
            currentHeight: 860
          })
         
          that.outputText(context)
          //context.draw();   
        },
        fail: function (res) {
         
        }
      });
    },

    outputText(context) {
      //#353535  #9B9B9B #FF523D
      //标题

      let info = this.properties.info

      let height = this.data.currentHeight + 70
      context.setFillStyle("#2D99EB")
      context.setFontSize(28);
      context.drawImage('/image/shared_page_3.png', 40, height-50, 100, 60);
      // context.fillText("待售", 40, height);
      context.stroke();
      context.setFillStyle("#353535")      
      context.setFontSize(36);
      height = this.canvasTextAutoLine(info.project_number, context, 160, height, 50, 560,36)
      context.setFillStyle("#2D99EB")
      context.setFontSize(28);
      context.fillText(info.room_sell_cat ? info.room_sell_cat : "-", 650, height)
      height = height + 50

      context.setFillStyle("#9B9B9B")
      context.setFontSize(24);


      context.fillText("类型", 70, height);
      context.fillText("居室", 220, height);
      context.fillText("售价(" + info.currency_name + ")", 370, height);
      context.fillText("预期收益", 570, height);
      height += 50
      context.setFillStyle("#353535")
      context.setFontSize(30);
      this.writeBold(context, info.room_type == 1 ? '公寓' : info.room_type == 2 ? '别墅' : '-', 70, height);
      this.writeBold(context, info.jushi ? info.jushi : '-', 220, height);
      //#endregion 
      context.setFillStyle("#579C0A")
      this.writeBold(context, info.earnings ? info.earnings : "-", 570, height);
      context.setFillStyle("#FF523D")
      this.writeBold(context, info.price_int ? info.price_int : '-', 370, height);
      height += 40
      context.setFillStyle("#fafafa")
      context.fillRect(0, height, 750, 20)
      height += 70
      //输出房产信息
      context.drawImage('/image/map_piont.png', 40, height - 15, 35, 45)
      context.setFillStyle("#353535")
      context.setFontSize(28);
      let text = info.city + '-' + info.region_a + '-' + info.region_b + '-' + info.region_c
      height = this.canvasTextAutoLine(text, context, 100, height, 40, 620,28)
      height += 40
      context.setFillStyle("#9B9B9B")
      height = this.canvasTextAutoLine(info.address, context, 100, height, 30, 620,28)
      height += 30
      context.setFillStyle("#fafafa")
      context.fillRect(0, height, 750, 20)
      height += 70
      context.setFillStyle("#353535")
      context.setFontSize(36);
      this.writeBold(context, "房产信息", 40, height);

      height += 60
      context.setFontSize(28);
      context.setFillStyle("#9B9B9B")
      context.fillText("房号", 40, height);
      context.setFillStyle("#353535")
      context.fillText(info.room_number, 170, height);
      context.setFillStyle("#9B9B9B")
      context.fillText("停车位", 370, height);
      context.setFillStyle("#353535")
      context.fillText(info.parking_space, 500, height);
      height += 70
      context.setFillStyle("#9B9B9B")
      context.fillText("楼层", 40, height);
      context.setFillStyle("#353535")
      context.fillText(info.floor, 170, height);
      context.setFillStyle("#9B9B9B")
      context.fillText("储物室", 370, height);
      context.setFillStyle("#353535")
      context.fillText(info.storeroom, 500, height);
      height += 70
      context.setFillStyle("#9B9B9B")
      context.fillText("总面积", 40, height);
      context.setFillStyle("#353535")
      context.fillText(info.area_all + 'm²', 170, height);
      context.setFillStyle("#9B9B9B")
      context.fillText("电梯", 370, height);
      context.setFillStyle("#353535")
      context.fillText(info.lift == "1" ? "有" : "无", 500, height);
      height += 70
      context.setFillStyle("#9B9B9B")
      context.fillText("房产面积", 40, height);
      context.setFillStyle("#353535")
      context.fillText(info.area_real + 'm²', 170, height);
      context.setFillStyle("#9B9B9B")
      context.fillText("建成年代", 370, height);
      context.setFillStyle("#353535")
      context.fillText(info.build_time ? info.build_time : '-', 500, height);
      height += 70
      context.setFillStyle("#9B9B9B")
      context.fillText("阳台面积", 40, height);
      context.setFillStyle("#353535")
      context.fillText(info.area_balcony + 'm²', 170, height);
      context.setFillStyle("#9B9B9B")
      context.fillText("翻新方式", 370, height);
      context.setFillStyle("#353535")
      context.fillText(info.renovation_way, 500, height);
      height += 30
      if (info.price_arr[0].price) {
        height += 40
        context.setFillStyle("#9B9B9B")
        context.fillText("家具包", 40, height);
        context.setFillStyle("#353535")
        context.fillText(info.price_arr[0].price + info.price_arr[0].currency_name, 170, height);
        height += 30
      }
      context.setFillStyle("#fafafa")
      context.fillRect(0, height, 750, 20)
      height += 70
      context.setFillStyle("#353535")
      context.setFontSize(36);
      this.writeBold(context, "房产优势", 40, height);
      height += 60
      context.setFillStyle("#353535")
      context.setFontSize(28);
      height = this.canvasTextAutoLine(info.advantage_desc, context, 40, height, 50, 620,28)

      context.draw();

     
      var that = this;
      setTimeout(function () {
        wx.canvasToTempFilePath({
          canvasId: 'canvasPoster',
          success: function (res) {          
            var tempFilePath = res.tempFilePath;            
            that.setData({
              imagePath: tempFilePath,           
            });
            // that.triggerEvent('shared',tempFilePath)
            wx.previewImage({
              current: tempFilePath , // 当前显示图片的http链接
              urls: [tempFilePath ] // 需要预览的图片http链接列表
            })  
            that.setData({
              loadding: false
            })
          },
          fail: function (res) {
            console.log(res);
          }
        }, that);
      }, 1000);
    },

    baocun: function () {
      var that = this
      wx.saveImageToPhotosAlbum({
        filePath: that.data.imagePath,
        success(res) {
          wx.showModal({
            content: '海报已保存到相册',
            showCancel: false,
            confirmText: '确定',
            confirmColor: '#333',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定');
                /* 该隐藏的隐藏 */
                that.setData({
                  maskHidden: false
                })
              }
            },
            fail: function (res) {
              console.log(11111)
            }
          })
        }
      })
    },

    writeBold(context, text, x, y) {
      context.fillText(text, x, y - 0.9);
      context.fillText(text, x - 0.9, y);
    },

    canvasTextAutoLine(str, ctx, initX, initY, lineHeight, canvasWidth,fontSize) {
      str=str.replace(/[\r\n]/g, '')
      const arrText = str.split('') //字符串分割为数组
      let currentText = '' // 当前字符串及宽度
      let currentWidth
      for (let letter of arrText) {
        currentText += letter
        //currentWidth = ctx.measureText(currentText).width
        currentWidth=this.measureText(currentText,fontSize)
        if (currentWidth > canvasWidth) {
          ctx.fillText(currentText, initX, initY)
          currentText = ''
          initY += lineHeight
        }
      }
      if (currentText) {
        ctx.fillText(currentText, initX, initY)
      }
      return initY
    },
    canvasTextHeight(str, ctx, initX, initY, lineHeight, canvasWidth,fontSize) {
      const arrText = str.split('') //字符串分割为数组
      let currentText = '' // 当前字符串及宽度
      let currentWidth     
      for (let letter of arrText) {
        currentText += letter
        //currentWidth = ctx.measureText(currentText).width
        currentWidth=this.measureText(currentText,fontSize)
        if (currentWidth > canvasWidth) {      
          currentText = ''
          initY += lineHeight
        }
      }      
      return initY
    },
    measureText(text, fontSize = 10) {
      text = String(text);
      var text = text.split('');
      var width = 0;
      text.forEach(function (item) {
        if (/[a-zA-Z]/.test(item)) {
          width += 7;
        } else if (/[0-9]/.test(item)) {
          width += 5.5;
        } else if (/\./.test(item)) {
          width += 2.7;
        } else if (/-/.test(item)) {
          width += 3.25;
        } else if (/[\u4e00-\u9fa5]/.test(item)) { //中文匹配
          width += 10;
        } else if (/\(|\)/.test(item)) {
          width += 3.73;
        } else if (/\s/.test(item)) {
          width += 2.5;
        } else if (/%/.test(item)) {
          width += 8;
        } else {
          width += 10;
        }
      });
      return width * fontSize / 10;
    },

   


  },


})