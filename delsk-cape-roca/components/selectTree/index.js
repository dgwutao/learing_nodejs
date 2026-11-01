// components/selectTree/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    },
  },
  observers: {
    'list': function (list) {
      console.log('list')
      let list1 = []
      let list2 = []
      let list3 = []
      list.forEach(val => {
        if (list1.indexOf(val.city) == -1)
          list1.push(val.city)
      });  
      this.setData({
        list1: list1
      })
      if (list1.length>0)
      {
        let key=list1[0]
        let list2 = [];
        list.forEach(val => {
          if (val.city == key) {
            if (list2.indexOf(val.region_a) == -1)
              list2.push(val.region_a)
          }
        })
        this.setData({leve1:key,list2:list2})
      }

    },

  },

  /**
   * 组件的初始数据
   */
  data: {
    list1: [],
    list2: [],
    list3: [],
    leve1: "",
    leve2: "",
    leve3: "",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    selectLevel1(e) {
      let key = e.currentTarget.dataset.key
      this.setData({
        leve1: key
      })
      let list2 = [];
      this.data.list.forEach(val => {
        if (val.city == key) {
          if (list2.indexOf(val.region_a) == -1)
            list2.push(val.region_a)
        }
      })
      this.setData({list2:list2})
      this.triggerEvent('onClickEvent', {name:'city',value:key})
    },
    selectLevel2(e) {
      let key = e.currentTarget.dataset.key
      this.setData({
        leve2: key
      })
      let list3 = [];
      this.data.list.forEach(val => {
        if (val.region_a == key) {
          if (list3.indexOf(val.region_b) == -1)
            list3.push({c:val.region_b,n:val.region_c})
        }
      })
      this.setData({list3:list3,leve3:""})
      this.triggerEvent('onClickEvent',  {name:'region_a',value:key})
    },
    selectLevel3(e) {
      let key = e.currentTarget.dataset.key
      this.setData({
        leve3: key
      })
      this.triggerEvent('onClickEvent', {name:'region_c',value:key})
    },
  }
})