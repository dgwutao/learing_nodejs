<template>
  <div id="root" style="color: white;background-color: #0E1A2F;">
    <div style="width: 100%;height: 100vh;background-color: #0b1122;display: flex;align-items: center;position: relative;overflow: hidden;">
      <img v-if="data.banner.pic" :src="data.banner.pic" class="bannerImg"/>
      <div class="homeTitle animated" v-html="data.banner.title"></div>
      <a href="#more" style="z-index: 9;">
        <div class="bounce-div" style="position: absolute;left:calc(50vw) ;bottom: 0;">
          <div style="display: flex;align-items: center;justify-content: center;flex-direction: column;">
            <img src="../../assets/jwp_icon_home_mouse.png" style="width: 30px;height: 43px;margin-bottom: 10px;"/>
            <el-icon style="color: white;"><ArrowDownBold /></el-icon>
          </div>
        </div>
      </a>
      <div style="height: 200px;background: linear-gradient( 180deg, rgba(21,63,109,0) 0%, rgba(14,26,47,0.77) 69%, #0E1A2F 100%);position: absolute;left: 0;bottom: 0;width: 100%;"></div>
    </div>
    <div id="more" class="sectionPadding" style="background-color: #0E1A2F;display: flex;align-items: center;justify-content: space-between;color: white;">
      <div class="animated" style="width: 50%;flex-shrink: 0;">
        <div class="advantage_title_class">{{ data.advantage.title }}</div>
        <div class="advantage_sub_title_class" v-html="data.advantage.sub_title"></div>
      </div>
      <div class="animated" style="display:flex;align-items: left;justify-content: space-between;flex-direction: column;">
          <div class="advantage_content_class" v-html="data.advantage.content"></div>
      </div>
    </div>
    <div class="sectionBG sectionPadding">
        <div style="display: flex;align-items: center;justify-content: space-between;flex-wrap: wrap;">
        <div class="animated blockRatio" style="display: flex;align-items: flex-start;justify-content: center;flex-direction: column;">
          <!-- <div class="advantage_title_class">{{ data.advantage.title }}</div> -->
          <div class="home_business_class">{{ fileStore.dict.home_business }}</div>
        </div>

        <div v-for="(item,index) in data.core.list" class="animated blockRatio" :style="((index==0||index==3)?'margin-left:10px;margin-right:10px':'')">
            <div class="imgContainer" style="position: relative;width: 100%;height: 100%;border-radius: 20px;">
              <img :src="item.pic" style="flex-shrink: 0;border-radius: 20px;object-fit: cover;position: absolute;top: 0;left: 0;width: 100%;height: 100%;"/>
              <div style="position: absolute;left: 0;bottom: 0;z-index: 9;background: #FFFFFF;padding: 18px 0;background-color: rgba(0, 0, 0, 0.69);width: 100%;display: flex;align-items: center;justify-content: center;">
                <div class="core_item_title_class">{{ item.title }}</div>
              </div>
            </div>
          </div>
      </div>
      <!-- <div class="animated" style="display: flex;align-items: center;justify-content: space-between;color: white;">
        <div style="font-family: PingFangSC, PingFang SC;font-weight: 600;font-size: 60px;color: #FFFFFF;line-height: 84px;">{{ fileStore.dict.home_business }}</div>
        <div style="display: flex;align-items: center;">
          <img @click="preBtn" class="preBtnClass" src="../../assets/jwp_icon_home_left.png"/>
          <img @click="nextBtn" class="nextBtnClass" src="../../assets/jwp_icon_home_right2.png"/>
        </div>
      </div>
      <div class="animated" style="margin-top: 70px;height: 630px;">
        <swiper
        @swiper="initSwiper2"
        @slideChange="onSlideChangeHandler2"
          :slidesPerView="2"
          :spaceBetween="30"
          :grabCursor="true"
          :loop="false"
          :pagination="{
            clickable: true,
          }"
          :modules="modules"
          class="mySwiper2"
        >
          <swiper-slide v-for="item in data.core.list" style="height: 570px;">
            <div style="position: relative;width: 100%;height: 100%;">
              <img :src="item.pic" style="flex-shrink: 0;border-radius: 10px;object-fit: cover;position: absolute;top: 0;left: 0;width: 100%;height: 100%;"/>
              <div style="height: 200px;background: linear-gradient( 180deg, rgba(0,0,0,0) 0%, #000000 100%);width: 100%;z-index: 8;"></div>
              <div style="position: absolute;left: 25px;bottom: 35px;z-index: 9;">
                <div style="font-family: PingFangSC, PingFang SC;font-weight: 400;font-size: 16px;color: #FFFFFF;line-height: 22px;">{{ item.sub_title }}</div>
                <div style="font-family: PingFangSC, PingFang SC;font-weight: 500;font-size: 30px;color: #FFFFFF;line-height: 42px;">{{ item.title }}</div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
        <div class="animated" style="display: flex;align-items: center;justify-content: space-between;margin-top: 40px;">
          <div :style="'transition: all 0.5s ease;width: 10px;height: 10px;border-radius: 10px;background-color:'+ (data.currentIndex==0?'white;':'#3B414E;')"></div>
          <div v-if="data.core.list.length > 1" v-for="(item,index) in data.core.list.length-2" style="display: flex;align-items: center;width: max-content;flex: 1;">
            <div style="height: 1px;background-color: #212938;flex: 1;width: 100%;"></div>
            <div :style="'transition: all 0.5s ease;width: 10px;height: 10px;border-radius: 10px;background-color:' + (data.currentIndex==index+1?'white;':'#3B414E;')"></div>
          </div>
        </div>
      </div> -->
    </div>
    <div class="sectionPadding" style="background-color:#0E1A2F">
      <div class="animated" style="display: flex;align-items: center;justify-content: space-between;color: white;">
        <div class="home_project_class">{{ fileStore.dict.home_project }}</div>
      </div>
      <div class="animated marginTop60">
        <swiper
        @swiper="initSwiper"
        @slideChange="onSlideChangeHandler"
          :slidesPerView="3"
          :slidesPerGroup="3"
          :spaceBetween="20"
          :loop="false"
          :pagination="{
            clickable: true,
          }"
          :modules="modules"
          class="mySwiper"
        >
          <swiper-slide v-for="(item,index) in data.projects.list">
            <div @click="goProjectDetail(item.id)" class="projectContainer" style="color: white;width: 100%;height: fit-content;cursor: pointer;">
              <div class="investmentProject">
                <img :src="item.pic" style="width: 100%;height: 100%;object-fit: cover;"/>
              </div>
                <div class="projects_item_area_class">{{ item.area }}</div>
                <div style="display: flex;align-items: flex-start;justify-content: space-between;margin-top: 10px;">
                  <div class="projects_item_title_class">{{ item.title }}</div>

                  <img class="projectArrowClass" src="../../assets/jwp_arrow_index_right.png"/>
                </div>
                
            </div>
          </swiper-slide>
        </swiper>
        <div v-if="false" style="display: flex;align-items: center;">
          <el-icon style="color: #999999;"><ArrowLeftBold /></el-icon>
          <div style="display: flex;align-items: center;justify-content: space-between;flex: 1;margin-left: 20px;margin-right: 20px;">
            <div @click="changeGroupIndex(index)" v-for="(item,index) in 3" :style="'cursor:pointer;transition: all 0.5s ease;height: 10px;width: 33%;background-color: '+(data.groupIndex==index?'#5A9BF0;':'#002A61')"></div>
          </div>
          <el-icon style="color: #999999;"><ArrowRightBold /></el-icon>
        </div>
      </div>
    </div>
    <div class="sectionPadding2" style="background-color: #0E1A2F;color: white;">
      <div class="animated home_country_class">{{ fileStore.dict.home_country }}</div>
       <div class="marginTop40">
        <div class="animated" style="width: 100%;overflow: hidden;position: relative;">
        <div class="slider">
                <div class="slide">
                  <div v-for="(item,index) in data.global1">
                    <div class="slide_block_class">
                      <div class="imgContainer" style="width: 100%;flex-shrink: 0;height: 100%;position: absolute;left: 0;top: 0;">
                        <img :src="item.pic" style="width: 100%;height: 100%;object-fit: cover;"/>
                      </div>
                      <div class="global1_item_title_class">{{ item.title }}</div>
                    </div>
                  </div>
                </div>    
        </div>
      </div>

      <!-- <div class="animated" style="width: 100%;overflow: hidden;position: relative;">
        <div class="slider slider_margin_class">
                <div class="slide2">
                  <div v-for="(item,index) in data.global2">
                    <div class="slide_block_class">
                      <div class="imgContainer" style="width: 100%;flex-shrink: 0;height: 100%;position: absolute;left: 0;top: 0;">
                        <img :src="item.pic" style="width: 100%;height: 100%;object-fit: cover;"/>
                      </div>
                      <div class="global1_item_title_class">{{ item.title }}</div>
                    </div>
                  </div>
                </div>    
        </div>
        </div> -->
        <!-- <swiper
          :slidesPerView="3"
          :slidesPerGroup="3"
          :spaceBetween="30"
          :loop="true"
          :modules="modules"
          class="mySwiper"
        >
          <swiper-slide v-for="(item,index) in data.global.list">
            <div style="color: white;width: 100%;height: fit-content;cursor: pointer;">
              <div class="imgContainer" style="width: 100%;flex-shrink: 0;aspect-ratio: 1.34;border-radius: 20px;">
                <img :src="item.pic" style="width: 100%;height: 100%;object-fit: cover;border-radius: 20px;"/>
              </div>
            </div>
          </swiper-slide>
        </swiper> -->
      </div>
    </div>
    <div class="footer">
      <Footer></Footer>
    </div>
  </div>
</template>
<script setup>
import icon_left from '../../assets/jwp_icon_home_left.png'
import icon_left2 from '../../assets/jwp_icon_home_left2.png'
import icon_right from '../../assets/jwp_icon_home_right.png'
import icon_right2 from '../../assets/jwp_icon_home_right2.png'
import 'swiper/css/bundle';
import { EffectFade, Mousewheel,Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { getAd, getAdList, getNewList, getAdOne,getProjectList } from "@/api/base";
import Footer from "@/components/footer.vue";
import { formartStr } from "@/utils/util";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { nextTick, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { getDict } from "@/api/base";
import { useFileStore } from "@/store/index.js";
const fileStore = useFileStore();
//gsap.registerPlugin(ScrollTrigger);
// ScrollTrigger.defaults({
//   toggleActions: "restart pause resume pause",
//   scroller: ".container",
// });
const goProjectDetail = (id) => {
  router.push({
    path: "/project",
    query: { id },
  });
};

const language = ref("");
const router = useRouter();
const info = ref({});
const bgImgs = ref([]);
const floor2Info = reactive({
  info: {},
  image: "",
});
const news = ref([]);
const isTop = ref(false);
const curIndex = ref(1);
const serviceInfo = reactive({
  info: {},
  list: [],
});
const data = reactive({
  currentIndex:0,
    groupIndex:0,
    info:{},
    advantage:{},
    core:{
      list:[]
    },
    global:{},
    global1:[],
    global2:[],
    banner:{
      pic:''
    },
    projects:{
      list:[
        {
          pic:'',
          title:'',
          area:''
        }
      ]
    }
})
var swiperInstance = null;
var swiperInstance2 = null;

const initSwiper2 = (swiper)=>{
    swiperInstance2 = swiper
}

const onSlideChangeHandler2 = ()=>{
    if (swiperInstance2) {
      let index = swiperInstance2.activeIndex
      if (data.currentIndex != index) {
        // calculateScrolY(index,index - data.currentIndex)
        data.currentIndex = index
      }
    }
}

const calculateScrolY = (index, factor) => {
  let fr = Math.floor(1000 / (data.core.list.length - 1))
  let distance = window.scrollY + fr * index * factor
  window.scrollTo({top: distance,behavior: 'auto'})
}

const preBtn = ()=>{
  var index = data.currentIndex - 1
  data.currentIndex = index
  if (index < 0) {
    data.currentIndex = 0
  }else{
    // calculateScrolY(data.currentIndex,-1)
  }
  swiperInstance2.slideTo(data.currentIndex)
}

const nextBtn = ()=>{
  var index = data.currentIndex + 1
  data.currentIndex = index
  if (index >= (data.core.list.length - 1)) {
    data.currentIndex = data.core.list.length - 1
  }else{
    // calculateScrolY(data.currentIndex,1)
  }
  swiperInstance2.slideTo(data.currentIndex)
}

const changeGroupIndex = (index) => {
  if (data.groupIndex != index) {
    data.groupIndex = index
    swiperInstance.slideTo(index*3)
  }
}

const initSwiper = (swiper)=>{
    swiperInstance = swiper
}

const onSlideChangeHandler = ()=>{
    if (swiperInstance) {
            data.groupIndex = swiperInstance.activeIndex/3
    }
}

const modules = [EffectFade, Mousewheel]
const onItemClick = (id) => {
  router.push({
    path: "/detail",
    query: { id },
  });
};

const onMoreClick = () => {
  //1 新闻，2报告
  router.push({ path: "/news", query: { type: curIndex.value } });
};

const onNewTab = (type) => {
  curIndex.value = type;
  getNewList({ category_id: type }).then((res) => {
    news.value = res.data.list;
  });
};

// const init = async () => {
//   language.value = localStorage.getItem("language") || "1";
//   let res = await getAd("23");
//   info.value = res.data;

//   let res1 = await getAdList("18");
//   bgImgs.value = res1.data.list;

//   let res2 = await getAdList("19");
//   floor2Info.info = res2.fileStore.dict;
//   floor2Info.image = res2.data.list[0].pic;

//   let res3 = await getAdList("20");
//   serviceInfo.info = res3.fileStore.dict;
//   serviceInfo.list = res3.data.list;

  // nextTick(() => {
  //   gsap.registerPlugin(ScrollTrigger);
  //   ScrollTrigger.defaults({
  //     toggleActions: "restart",
  //   });
  //   ScrollTrigger.create({
  //     trigger: ".container",
  //     start: "top center",
  //     end: "bottom center",
  //     onEnter: () => console.log("元素进入视口"),
  //     onLeave: () => console.log("元素离开视口"),
  //     onUpdate: (self) => {
  //       console.log("滚动进度:", self.progress);
  //       if (self.progress == 1) {
  //         isTop.value = false;
  //       } else {
  //         isTop.value = true;
  //       }
  //     },
  //     onToggle: (self) =>
  //       console.log("元素状态变化:", self.isActive ? "进入" : "离开"),
  //     onRefresh: () => console.log("ScrollTrigger 刷新"),
  //     onScrubComplete: () => console.log("滚动停止"),
  //   });
  // });
// };

const getNewData = () => {
  getNewList({ category_id: "1" }).then((res) => {
    news.value = res.data.list;
  });
};

const startAnim = () => {
  gsap.fromTo(
    ".anim1",
    {
      y: "100px", // 初始宽度
      opacity: 0, // 初始透明度
    },
    {
      y: 0, // 目标宽度（与容器宽度匹配）
      opacity: 1, // 目标透明度
      duration: 1, // 动画持续时间
      ease: "power1.inOut", // 缓动函数（可以与初始值不同，但这里为了简单
    }
  );
  gsap.fromTo(
    ".anim2",
    {
      y: "80px", // 初始宽度
      opacity: 0, // 初始透明度
    },
    {
      y: 0, // 目标宽度（与容器宽度匹配）
      opacity: 1, // 目标透明度
      duration: 1, // 动画持续时间
      delay: 0.5,
      ease: "power1.inOut", // 缓动函数（可以与初始值不同，但这里为了简单
    }
  );
};

const startFlow = () => {
  gsap.fromTo(
    ".flow-bg1",
    {
      width: 0, // 初始宽度
    },
    {
      width: "100%", // 目标宽度（与容器宽度匹配）
      duration: 2, // 动画持续时间
      ease: "power1.inOut", // 缓动函数（可以与初始值不同，但这里为了简单保持一致）
      scrollTrigger: {
        trigger: ".flow-bg",
        start: "top center",
      },
    }
  );
};

function handleScroll() {
  console.log("滚动事件触发");
  console.log("Window scroll position:", window.scrollY);
}

onMounted(() => {

  // const slide = document.querySelector('.slide');
  // const slide2 = document.querySelector('.slide2');
    
  //     slide.addEventListener("mouseover", function() {
  //       slide.style.animationPlayState = 'paused';
  //       slide2.style.animationPlayState = 'paused';
  //     });
      

  //     slide.addEventListener("mouseout", function() {
  //       slide.style.animationPlayState = 'running';
  //       slide2.style.animationPlayState = 'running';
  //     });

   
  //     slide2.addEventListener("mouseover", function() {
  //       slide.style.animationPlayState = 'paused';
  //       slide2.style.animationPlayState = 'paused';
  //     });
      
 
  //     slide2.addEventListener("mouseout", function() {
  //       slide.style.animationPlayState = 'running';
  //       slide2.style.animationPlayState = 'running';
  //     });
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {            
                  anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    window.scrollTo({
                      top: targetElement.offsetTop - 50,
                      behavior: 'smooth'        
                    });       
                  }); 
                });
  
    //首页-项目列表，参数is_homepage = 1
    getProjectList(1,1,99).then(res=>{
        data.projects = res.data
    }).catch(e=>{
        console.log(e);
    }) 

    //首页-公司优势介绍
    getAdOne(25).then(res=>{
        data.advantage = res.data
    }).catch(e=>{
        console.log(e);
    })  

    //首页-核心业务领域
    getAdList(26).then(res=>{
        data.core = res.data
    }).catch(e=>{
        console.log(e);
    })  

    //首页-全球分布国家
    getAdList(27).then(res=>{
        data.global = res.data
        var list = res.data.list
        var chunk = list.length / 2
        // var g1 = list.slice(0, chunk)
        var g1 = list.slice(0, list.length)
        var g2 = list.slice(chunk)

        g1 = g1.concat(g1.slice())
        g1 = g1.concat(g1.slice())
        g2 = g2.concat(g2.slice())
        data.global1 = g1
        data.global2 = g2
    }).catch(e=>{
        console.log(e);
    })  

    // getAdOne(35).then(res=>{
    //     data.global = res.data
    // }).catch(e=>{
    //     console.log(e);
    // })

    //首页-banner
    getAdOne(28).then(res=>{
        data.banner = res.data

        setTimeout(() => {
                const animatedItems = document.querySelectorAll('.animated');
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animate');
                        }
                    });
                }, {
                    threshold: 0.02
                });
                animatedItems.forEach(item => {
                    observer.observe(item);
                });
        }, 300);
    }).catch(e=>{
        console.log(e);
    })  

    // getDict().then(res=>{
    //     fileStore.dict = res.data
    // }).catch(e=>{
    //     console.log(e);
    // })  
  
        // 滚动动画
        // nextTick(() => {
        // setTimeout(() => {
          // gsap.registerPlugin(ScrollTrigger);
          //   gsap.to('.sectionBG',{
          //     scrollTrigger: {
          //       trigger: '.sectionBG',
          //       pin: true, 
          //       start: 'top top', 
          //       end: '+=1500', 
          //       scrub: 1, 
          //       onUpdate: (self) => {
          //         let chunk = 1 / (data.core.list.length - 1)
          //         let index = Math.floor(self.progress/chunk)
          //         if (index > data.core.list.length - 2) {
          //           index = data.core.list.length - 2
          //         }
          //         if (index < 0) {
          //           index = 0
          //         }
          //         if (data.currentIndex != index) {
          //           shinning(index - data.currentIndex)
          //           data.currentIndex = index
          //           swiperInstance2.slideTo(data.currentIndex)
          //         }
          //       }
          //     }
          //   })
          // });
        // }, 500);
});

const shinning = (factor)=>{
  var item = '.preBtnClass'
  var to = icon_left2
  var from = icon_left
  if (factor > 0) {
    var item = '.nextBtnClass'
    var to = icon_right
    var from = icon_right2
  }
  document.querySelectorAll(item).forEach(img => {
      img.src = to
      setTimeout(() => {
        img.src = from
      }, 300);
  });
}

</script>

<style lang="less" scoped>
        :root {
          background-color: #11264B;
        }

        /* 动画定义 */
        @keyframes slide {
            0% {
                transform: translateX(0);
            }
            100% {
                transform: translateX(-50%);
            }
        }

        .slider {
            // display: flex;
            // align-items: center;
            // width: max-content;
        }

        .slide {
            display: flex;
            animation: slide 30s linear infinite;
        }

        .slide2 {
            display: flex;
            animation: slide 30s linear infinite;
        }
        
        // .slide:hover {
        //     animation-play-state: paused;
        // }
        

.mySwiper2{
  // height: 1000px;
  // background-color: yellow;
}

.bannerImg{
  width: 100%;
  // height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  // object-fit: cover;
  display: block;
  // opacity: 0;
  // animation: fadeIn 1s forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.preBtnClass:hover{
  content: url(../../assets/jwp_icon_home_left2.png);
}

.nextBtnClass:hover{
  content: url(../../assets/jwp_icon_home_right.png);
}

.nextBtnClass{
  width: 53px;
  height: 53px;
  margin-right: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.preBtnClass{
  width: 53px;
  height: 53px;
  margin-right: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.homeTitle{
  font-family: PingFangSC, PingFang SC;
  font-weight: 600;
  font-size: 60px;
  color: #FFFFFF;
  line-height: 75px;
  text-shadow: 0px 0px 11px #613B1C;
  margin-left: 100px;
  z-index: 9;
}

        .animated {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
          }
        
        .animate {
            opacity: 1;
            transform: translateY(0);
        }

        .projectContainer{
          overflow: hidden;
        }

        .projectContainer img{
          transition: all 0.8s ease;
        }

        .projectContainer:hover {
          .projectArrowClass{
            opacity: 1;
          }
        }


        .projectContainer:hover img {
          transition: all 0.8s ease;          
          transform: scale(1.05);
        }
        
        .projectArrowClass{
          width: 28px;
          height: 28px;
          margin-left: 10px;
          opacity: 0;
          transition: all 0.8s ease;
        }

.imgContainer{
  overflow: hidden;
}

.imgContainer img{
   transition: all 0.8s ease;
}


.imgContainer:hover img {
  transition: all 0.8s ease;          
  transform: scale(1.05);
}

.sectionBG{
  background-image: url(../../assets/jwp_bg_home_section2.png);
  background-repeat: no-repeat;
  background-size: cover;
  padding: 80px 80px 50px 80px;
  background-color: #0b1122;
  height: fit-content;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  width: 60%;
}

.bounce-div {
  width: fit-content;
  height: fit-content;
  // background-color: skyblue;
  position: absolute; /* 使元素能够应用top属性 */
  animation: bounce 1.5s infinite; /* 应用动画 */
}
 
/* 定义动画 */
@keyframes bounce {
  0%, 100% {
    bottom: 0; /* 起始和结束时，元素位于初始位置 */
  }
  50% {
    bottom: 50px; /* 元素移动到距离原位置50px的位置 */
  }
}

.container {
  height: calc(100vh - 78px);
  overflow-y: scroll;
  scroll-snap-type: y mandatory;

  .page {
    min-height: calc(100vh - 78px);
    scroll-snap-align: start;
  }
}

.floor-6 {
  padding: 30px 82px 40px;
  background: #edf1f4;
  scroll-snap-align: end;

  .title {
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 38px;
    color: #000000;
  }

  .tab {
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 23px;
    cursor: pointer;
  }

  .nor {
    color: #666666;
  }

  .sel {
    color: #333333;
  }

  .active-line {
    width: 27px;
    height: 2px;
    background: linear-gradient(to right,
        rgba(71, 171, 255, 1),
        rgba(126, 155, 255, 1));
  }

  .look-more {
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 18px;
    color: #666666;
    cursor: pointer;
  }

  .item-view:hover {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    transform: scale(1.01);
    transition: all 0.3s;
  }

  .item-view {
    padding: 20px;
    background-color: #fff;
    margin-top: 17px;
    cursor: pointer;

    .img-view {
      width: 322px;
      height: 193px;
      object-fit: cover;
    }

    .zx-title {
      font-family: PingFangSC, PingFang SC;
      font-weight: 600;
      font-size: 18px;
      color: #2f3137;
    }

    .zx-time {
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 18px;
      color: #2f3137;
    }

    .zx-content {
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 14px;
      margin-right: 180px;
      color: #333333;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      line-clamp: 5;
      -webkit-box-orient: vertical;
    }

    .zx-detail {
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 14px;
      color: #666666;
      margin-top: 27px;

      img {
        width: 20px;
        margin-left: 10px;
      }
    }

    .zx-detail:hover {
      color: #27509e;
    }
  }
}

.floor-2 {
  background: url(@/assets/dds_bg.png) no-repeat center center;
  background-size: cover;

  .title {
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 48px;
    color: #333333;
    margin-bottom: 127px;
  }

  .flow-bg {
    position: relative;
    width: 100%;
    overflow: hidden;

    img {
      width: 100vw;
      min-width: 1400px;
      min-height: 150px;
    }

    .flow-bg1 {
      width: 0;
      overflow: hidden;
    }
  }
}

.floor-1 {
  background: #0b162b;

  .left-view {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translate(0%, -50%);
    color: white;

    .content {
      margin-left: 100px;
      max-width: 955px;

      .intro {
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 20px;
        color: #ffffff;
        line-height: 43px;
        max-width: 1100px;
      }
    }
  }

  .right-view {
    width: 100%;
    height: calc(100vh - 78px);
    position: relative;

    .video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .title {
    font-family: PingFang-SC, PingFang-SC;
    font-weight: 800;
    font-size: 58px;
    color: #ffffff;
    line-height: 89px;
    text-align: left;
    font-style: normal;
  }

  .sub-title {
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 30px;
    color: #ffffff;
    line-height: 32px;
    letter-spacing: 3px;
    text-align: left;
    font-style: normal;
    margin: 55px 0;
  }

  .sub-title_en {
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 30px;
    color: #ffffff;
    line-height: 32px;
    text-align: left;
    font-style: normal;
    margin: 55px 0;
  }
}

.floor-3 {
  background: url("@/assets/sticky_bg.png") no-repeat;
  background-position: center;
  background-size: 100% 100%;
  padding: 0 82px;

  .grid-view {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 50px 30px;
    margin: 70px 0;
  }

  .title {
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 48px;
    color: #333333;
    text-align: center;
    margin-top: 30px;
  }

  .service {
    background: #27509e;
    padding: 34px 32px 30px 43px;
    transition: transform 0.4s ease, box-shadow 0.4s ease;

    .item-line {
      width: 80px;
      height: 1.2px;
      background: #ffffff;
      margin: 32px 0 24px;
    }

    .name {
      font-family: PingFangSC, PingFang SC;
      font-weight: 600;
      font-size: 20px;
      color: #fff;
    }

    img {
      width: 45px;
      height: 45px;
    }
  }

  .service:hover {
    box-shadow: 0px 22px 40px 4px rgba(9, 45, 113, 0.6);
    transform: translateY(-35px);
    /* 上移 20px */
  }
}

.floor-4 {
  width: 100%;
  position: relative;

  .line {
    width: 22px;
    height: 4px;
    background: #ffffff;
    z-index: 20;
  }

  .title {
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 28px;
    color: #ffffff;
    text-align: center;
    margin-top: 43px;
    z-index: 20;
  }

  .content {
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 16px;
    color: #ffffff;
    line-height: 35px;
    letter-spacing: 1px;
    // text-align: center;
    margin: 60px 40px;
    display: none;
  }

  .mark {
    width: 20vw;
    min-width: calc(1400px / 5);
    height: calc(100vh - 78px);
    background: rgba(0, 0, 0, 0.32);
    position: absolute;
    transition: opacity 0.5s ease-in-out;
    opacity: 1;
    // display: none;
  }

  .lz {
    width: 20vw;
    min-width: calc(1400px / 5);
    height: calc(100vh - 78px);
    background-size: 100% 100%;
    overflow: hidden;
    position: relative;
  }

  .lzen {
    width: 20vw;
    min-width: calc(1400px / 5);
    height: calc(100vh - 78px);
    background-size: 100% 100%;
    overflow: hidden;
    position: relative;
  }

  .line1 {
    width: 163px;
    height: 1.2px;
    background: #ffffff;
    opacity: 0.52;
    margin-top: 43px;
  }

  .lzen:hover {
    .mark {
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(10px) saturate(180%);
      background: rgba(0, 0, 0, 0.2);
      // display: block;
    }

    .content {
      display: block;
      z-index: 10;
    }

    .line1 {
      margin-top: 18px;
      display: none;
    }

    .line {
      display: none;
    }

    .title {
      display: none;
    }
  }

  .lz:hover {
    .mark {
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(10px) saturate(180%);
      background: rgba(0, 0, 0, 0.2);
      // display: block;
    }

    .content {
      display: block;
      z-index: 10;
    }

    .line1 {
      margin-top: 18px;
    }
  }
}

.footer {
  scroll-snap-align: end;
}

.advantage_title_class {
  font-family: PingFangSC, PingFang SC;
  font-weight: 300;
  font-size: 26px;
  color: #FFFFFF;
  line-height: 37px;
  text-align: left;
  font-style: normal;
}

.advantage_sub_title_class {
  margin-top: 35px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 22px;
  color: #FFFFFF;
  line-height: 28px;
  text-align: left;
  font-style: normal;
  opacity: 0.4;
  margin-right: 165px;
}

.advantage_content_class {
  font-family: PingFangSC, PingFang SC;
  font-size: 35px;
  color: #FFFFFF;
  line-height: 55px;
  text-align: left;
  font-style: normal;
  margin-right: 50px;
  font-weight:lighter;
}

.home_business_class {
  font-family: PingFangSC, PingFang SC;
  font-weight: 600;
  font-size: 60px;
  color: #FFFFFF;
  line-height: 84px;
  text-align: left;
  font-style: normal;
  // margin-top: 40px;
}

.core_item_title_class{
  font-family: PingFangSC, PingFang SC;
  font-weight: 600;
  font-size: 30px;
  color: #FFFFFF;
  text-align: left;
  font-style: normal;
}

.home_project_class {
  font-family: PingFangSC, PingFang SC;
  font-weight: 600;
  font-size: 60px;
  color: #FFFFFF;
  line-height: 84px;
}

.projects_item_area_class{
  font-family: PingFangSC, PingFang SC;
  font-weight: 600;
  font-size: 18px;
  color: #FFFFFF;
  line-height: 25px;
  margin-top: 20px;
  margin-bottom: 10px;
  opacity: 0.5;
}

.projects_item_title_class {
  font-family: PingFangSC, PingFang SC;
  font-weight: 600;
  font-size: 26px;
  color: #FFFFFF;
  line-height: 37px;
}

.home_country_class {
  text-align: center;
  font-family: PingFangSC, PingFang SC;
  font-weight: 600;
  font-size: 60px;
  color: #FFFFFF;
  line-height: 84px;
  width: 100%;
  margin-bottom: 72px;
}

.global1_item_title_class {
  font-family: PingFangSC, PingFang SC;
  font-weight: 600;
  font-size: 28px;
  color: #FFFFFF;
  line-height: 37px;
  text-align: left;
  font-style: normal;
  z-index: 9;
}

.slide_block_class{
  color: white;
  width: 260px;
  aspect-ratio: 1.25;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 30px;
}

.slider_margin_class{
  margin-top: 30px;
  margin-left: -150px;
}

.sectionPadding{
  padding: 50px 100px;
}

.sectionPadding2{
  padding: 50px 0;
}

.marginTop60{
  margin-top: 60px;
}

.marginTop40{
  margin-top: 40px;
}

.blockRatio{
  aspect-ratio: 1.5;
  margin-bottom: 30px;
  width: 32%;
}

.investmentProject{
  width: 100%;
  flex-shrink: 0;
  aspect-ratio: 1.4;
  border-radius: 20px;
  overflow: hidden;
}

@media (max-width: 1900px) {

  .blockRatio{
    aspect-ratio: 1.6;
    margin-bottom: 30px;
    width: 32%;
  }

  .marginTop60{
    margin-top: 60px*0.7;
  }

  .marginTop40{
    margin-top: 40px*0.7;
  }
  .sectionPadding{
    padding: 50px*0.7 100px*0.7;
  }

  .sectionPadding2{
    padding: 50px*0.7 0;
  }

  .slider_margin_class{
      margin-top: 30px*0.7;
      margin-left: -100px;
    }

  .slide_block_class{
    color: white;
    width: 260px*0.7;
    aspect-ratio: 1.25;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 30px*0.7;
  }
            .homeTitle{
              // font-size: calc((60px*0.7));
              font-size: 60px*0.7;
              line-height: 75px*0.7;
            }

            .advantage_title_class{
              font-size: 22px;
              line-height: 37px*0.7;
            }

            .advantage_sub_title_class {
              margin-top: 25px;
              font-size: 20px;
              line-height: 28px;
            }

            .advantage_content_class {
              font-size: 24px;
              line-height: 55px*0.7;
            }

            .home_business_class {
              font-size: 60px*0.7;
              line-height: 84px*0.7;
            }

            .core_item_title_class{
              font-size: 30px*0.7;
            }

            .home_project_class {
              font-size: 40px;
              line-height: 84px*0.7;
            }

            .projects_item_area_class{
              font-size: 16px;
              line-height: 25px*0.7;
            }

            .projects_item_title_class {
              font-size: 18px;
              line-height: 37px*0.7;
            }

            .home_country_class {
              font-size: 40px;
              line-height: 84px*0.7;
            }

            .global1_item_title_class {
              font-family: PingFangSC, PingFang SC;
              font-weight: 600;
              font-size: 28px*0.7;
              color: #FFFFFF;
              line-height: 37px*0.7;
              text-align: left;
              font-style: normal;
              z-index: 9;
            }

        }
</style>