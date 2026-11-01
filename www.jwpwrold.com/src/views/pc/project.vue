<template>
    <div>
        <div style="width: 100%;height: 100vh;background-color: white;display: flex;align-items: center;position: relative;color: white;">
            <video v-if="data.project.info.video.length > 0" :poster="data.project.info.videoInfo.cover" :src="data.project.info.videoInfo.url" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;object-fit: cover;" autoplay loop muted></video>
            <img v-else :src="data.project.info.banner" style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;object-fit: cover;display: block;"/>
            <div style="margin-left: 100px;z-index: 9;">
                <div v-html="data.project.info.banner_title" class="bannerTitle animated"></div>
                <div v-html="data.project.info.banner_intro" class="bannerIntro animated"></div>
            </div>
            <div style="aspect-ratio: 7.3;background: linear-gradient( 180deg, rgba(255,255,255,0) 0%, #FFFFFF 100%);opacity: 0.39;position: absolute;left:0;bottom: 0;width: 100%;"></div>
            <div style="aspect-ratio: 7.3;background: linear-gradient( 180deg, rgba(255,255,255,0) 0%, #FFFFFF 100%);position: absolute;left:0;bottom: 0;width: 100%;"></div>
        </div>
        <div style="display: flex;align-items: flex-start;padding: 50px 0 0 0;color: black;background-color: white;justify-content: space-between;">
            <div class="leftBox">
                <div>
                    <div class="animated infoTitle" v-html="data.project.info.title"></div>
                    <div class="animated infoIntro" v-html="data.project.info.intro"></div>
                </div>

                <div class="imgContainer animated element-border" style="width: 100%;aspect-ratio: 1.32;">
                    <img :src="data.project.info.detail_pic1" style="width: 100%;height: 100%;object-fit: cover;display: block;"/>
                </div>
            </div>
            <div style="flex: 1;padding-right: 70px;">
                <div style="display: flex;align-items:stretch;width: 100%;">
                    <div class="imgContainer element-border animated" style="width: 56%;aspect-ratio: 1.3;margin-right: 20px;">
                            <img :src="data.project.info.detail_pic3" style="width: 100%;height: 100%;display: block;"/>
                    </div>

                    <div class="animated element-border" style="background-color: black;padding:28px 18px;color: white;flex: 1;display: flex;align-items: center;justify-content: center;flex-direction: column;">
                        <img src="../../assets/jwp_icon_project_anchor.png" class="anchorClass"/>
                        <div class="projectPlaceClass">{{ fileStore.dict.project_place }}</div>
                        <div style="padding: 12px 20px;background-color: white;display: flex;align-items: center;width: fit-content;border-radius: 30px;color: black;margin-top: 26px;">
                                <a href="#start" style="text-decoration: none;">
                                    <div class="projectGoClass">{{ fileStore.dict.project_go_view }}</div>
                                </a>
                                <el-icon style="color: black;"><Bottom /></el-icon>
                        </div>
                    </div>
                </div>


                
                <div class="imgContainer animated element-border marginTop35" style="width: 100%;aspect-ratio: 2;">
                    <img :src="data.project.info.detail_pic2" style="width: 100%;height: 100%;object-fit: cover;"/>
                </div>
                
                <div class="animated marginTop25" style="display: flex;align-items: flex-start;">    
                    <div class="element-border" style="padding:30px;background-color: #100700;flex: 1;color:white;display: flex;align-items: center;">
                        <img src="../../assets/jwp_icon_project_thumb.png" class="thumbClass"/>
                        <div class="advantagesClass" v-html="data.project.info.advantages"></div>
                    </div>
                </div>
            </div>
        </div>
        <div style="width: 100%;height: 50px;background-color: #0C1B36;">
            <div style="width: 100%;height: 100%;border-bottom-left-radius: 40px;border-bottom-right-radius: 40px;background-color: white;"></div>
        </div>
        <div v-if="data.project.info.facilities.list.length>0" style="padding: 100px;background-color: white;color: black;">
            <div style="font-family: PingFangSC, PingFang SC;font-weight: 600;font-size: 48px;color: #000000;line-height: 52px;width: 100%;text-align: center;">{{ data.project.info.facilities.title }}</div>

            <div style="width: 100%;display: flex;align-items: center;margin-top: 40px;justify-content: center;">
                <div @click="changeSwiperIndex(index)" v-for="(item,index) in data.project.info.facilities.list.length" :style="'transition: all 0.5s ease;padding: 20px 120px;border-radius: 20px;margin-right: 50px;cursor: pointer;border: 2px solid ' + (data.currentIndex == index?'#11264B;':'#DCDCDC')">
                    <div :style="'transition: all 0.5s ease;font-family: PingFangSC, PingFang SC;font-weight: 600;font-size: 32px;line-height: 45px;color: '+(data.currentIndex == index?'#0E1A2F;':'#666666;')">{{ data.project.info.facilities.list[index].title }}</div>
                </div>
            </div>
            <div style="border-radius: 20px;overflow: hidden;">
                <swiper
                @swiper="onSwiperHandler"
                @slideChange="onSlideChangeHandler"
                        :slidesPerView="1"
                        :spaceBetween="20"
                        :grabCursor="true"
                        :loop="false"
                        :modules="modules"
                        class="mySwiper">
                    <swiper-slide v-for="(item,index) in data.project.info.facilities.list">
                        <div style="display: flex;align-items: stretch;margin-top: 40px;">
                            <div style="width: 60%;min-height: 350px;position: relative;margin-right: 25px;">
                                <img :src="item.left_pic" style="width: 100%;min-height: 350px;height:100%;object-fit: cover;border-radius: 20px;flex-shrink: 0;display: block;position: absolute;left: 0;top: 0;"/>
                                <div style="position: absolute;bottom: 30px;left: 30px;z-index: 9;">
                                    <div style="font-family: PingFangSC, PingFang SC;font-weight: 500;font-size: 32px;color: #FFFFFF;line-height: 45px;" v-html="item.name"></div>
                                    <div style="font-family: PingFangSC, PingFang SC;font-weight: 400;font-size: 16px;color: #FFFFFF;line-height: 19px;margin-top: 10px;" v-html="item.intro"></div>
                                </div>
                            </div>
                            
                            <div v-html="item.advantages" :style="'border: 10px;color: white;border-radius: 20px;padding: 40px 25px;flex: 1;background-image: url('+item.right_pic+');background-repeat: no-repeat;background-size: cover;'"></div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <div v-if="data.project.info.room.list.length>0" style="background-color: #f1f1f1;padding: 100px;border-radius: 30px;color: black;">
                <div style="display: flex;align-items: center;">
                    <div style="font-family: PingFangSC, PingFang SC;font-weight: 600;font-size: 48px;color: #000000;line-height: 52px;">{{ data.project.info.room.title }}</div>
                </div>
                <div style="margin-top: 80px;">
                    <swiper
                    @swiper="iniGallery"
                        :slidesPerView="3"
                        :spaceBetween="20"
                        :grabCursor="true"
                        :loop="false"
                        :modules="modules"
                        class="mySwiper">
                    <swiper-slide v-for="(item,index) in data.project.info.room.list" :style="'transition: all 0.5s ease;width:'+ (data.galleryIndex==index?'46%;':'25%;')">
                        <div @click="changeGalleryIndex(index)" class="galleryCard">
                            <img :src="item.pic" style="width: 100%;height: 100%;object-fit: cover;position: absolute;top: 0;left: 0;display: block;border-radius: 20px;"/>
                            <div style="position: absolute;left: 30px;bottom: 30px;z-index: 9;">
                                <div style="font-family: PingFangSC, PingFang SC;font-weight: 400;font-size: 18px;color: #FFFFFF;line-height: 25px;">{{ item.intro }}</div>
                                <div style="padding: 12px 20px;border-radius: 27px;background-color: white;text-align: center;font-family: PingFangSC, PingFang SC;font-weight: 500;font-size: 16px;color: #000000;line-height: 22px;width: fit-content;margin-top: 20px;">{{ item.name }}</div>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>
                </div>
        </div>
        <div v-if="data.project.info.map.near.length>0 || data.project.info.map_pic.length>0" id="start" class="padding100" style="background-color: #0C1B36;">
                <div class="animated" style="display: flex;align-items: center;color: white;">
                    <div style="width: 50%;margin-right: 30px;flex-shrink: 0;">
                        <div v-html="data.project.info.map.title" class="mapTitle"></div>
                    </div>
                    
                    <div v-html="data.project.info.map.intro" class="mapIntro"></div>
                </div>
                <div class="animated" style="display: flex;align-items: center;flex-wrap: wrap;color: white;margin-top: 50px;">
                    <div v-for="(item,index) in data.project.info.map.near" class="itemName" :style="(index%2==0?'width: 50%;margin-right: 30px;':'flex:1;')">{{ index+1 }}. {{ item.name }}</div>
                </div>
                <img class="animated mapPic" :src="data.project.info.map_pic"/>
        </div>
        <div>
            <Footer :bg_pic="data.project.info.bottom_pic"></Footer>
        </div>
    </div>
</template>
<script setup>
import 'swiper/css/bundle';
import { EffectFade, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { getAd, getAdList,getProjectDetail } from '@/api/base.js';
import { formartStr } from '@/utils/util.js';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/all';
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import Footer from '@/components/footer.vue';
import { getDict } from "@/api/base";
import { useRoute, useRouter } from 'vue-router';
import { useFileStore } from "@/store/index.js";
const fileStore = useFileStore();
const route = useRoute();
var swiperInstance = null;
var gallery = null;

// gsap.registerPlugin(ScrollTrigger);
// ScrollTrigger.defaults({
//     toggleActions: "restart pause resume pause",
//     scroller: ".container"
// });

const changeGalleryIndex = (index) =>{
    // if (data.galleryIndex != index) {
        data.galleryIndex = index
    // }
    // else{
    //     data.galleryIndex = -1
    // }
}

const changeSwiperIndex = (index) =>{
    if (data.currentIndex != index) {
        data.currentIndex = index
        if (swiperInstance) {
            swiperInstance.slideTo(index)
        }
    }
}

const iniGallery = (swiper)=>{
    gallery = swiper
}

const onSwiperHandler = (swiper)=>{
    swiperInstance = swiper
}

const onSlideChangeHandler = ()=>{
    if (swiperInstance) {
            data.currentIndex = swiperInstance.activeIndex
    }
}

const modules = [EffectFade,Mousewheel]
const datas = ref([]);
const state = reactive({
    banner: {}
});
const data = reactive({
    galleryIndex:-1,
    currentIndex:0,
    info:{},
    project:{
        info:{
            banner:'',
            map_pic:'',
            video:'',
            facilities:{
                list:[
                    {
                        left_pic:'',
                        right_pic:'',
                        advantages:''
                    }
                ]
            },
            map:{
                near:[]
            },
            room:{
                list:[{
                    pic:'',
                    intro:'',
                    name:''
                }]
            }
        }
    }
})

const init = async () => {
    let res = await getAd('22');
    state.banner = res.data;

    let resData = await getAdList('21');
    datas.value = resData.data.list;

    nextTick(() => {
        gsap.fromTo('.banner-anim', {
            y: '100px',
            opacity: 0,
        }, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power1.inOut"
        });
        let anims = gsap.utils.toArray('.anim-club');
        anims.forEach((element, index) => {
            gsap.fromTo('.anim' + index, {
                x: '-100px',
                opacity: 0,
            }, {
                x: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power1.inOut",
                scrollTrigger: ".anim" + index,
            });
        });
    })
}
const toBottom = () => {
    const scrollContainer = document.getElementById('scrollContainer');
    const secondScreen = scrollContainer.children[1]; // 获取第二个屏幕元素
    // 获取第二个屏幕元素相对于滚动容器顶部的偏移量
    const offsetTop = secondScreen.offsetTop;
    // 滚动到第二屏幕的位置
    scrollContainer.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
};

onMounted(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {            
                  anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    window.scrollTo({
                      top: targetElement.offsetTop - 100,
                      behavior: 'smooth'        
                    });       
                  }); 
                });

    // init();
    let id = route.query.id
    getProjectDetail(id).then(res=>{
        if (res.data.info.video.length > 0) {
            res.data.info.videoInfo = JSON.parse(res.data.info.video)
        }
        data.project = res.data

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

    setTimeout(()=>{
        data.galleryIndex = 0
    },1000)
});

onBeforeUnmount(() => {
    ScrollTrigger.killAll();
});

</script>
<style scoped lang="less">
/* 默认样式 */
.element-border {
    border-radius: 30px;
    overflow: hidden;
}

/* 媒体查询，当屏幕宽度大于或等于600px时 */
// @media (min-width: 1200px) {
//     .element-border {
//         border-radius: 40px;
//         overflow: hidden;
//     }
// }
 

.animated {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
          }
        
        .animate {
            opacity: 1;
            transform: translateY(0);
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

// .galleryCard:hover{
//     width: 640px;
// }

.gallerySlideIndexed{
    width: 46%;
    transition: all 0.5s ease;
}

.gallerySlide{
    width: 25%;
    transition: all 0.5s ease;
}

.galleryCardIndexed{
    width: 100%;
    height: 500px;
    // aspect-ratio: ;
    position: relative;
    transition: all 0.5s ease;
}

.galleryCard{
    width: 100%;
    height: 500px;
    position: relative;
    transition: all 0.5s ease;
}

// .swiper {
//   width: 100%;
//   height: 100%;
//   border-radius: 20px;
// }

// .swiper-slide {
//   width: 60%;
// }

.banner {
    width: 100%;
    height: calc(100vh - 78px);
    background: url('') no-repeat top center;
    background-size: cover;
    scroll-snap-align: start;
    position: relative;


    .title {
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 44px;
        color: #FFFFFF;
    }

    .sub-title {
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 30px;
        color: #FFFFFF;
        text-align: center;
        margin-top: 24px;
    }

    .down-img {
        width: 28px;
        height: 59px;
        position: absolute;
        bottom: 85px;
        transform: translateX(-50%);
        animation: moveUpDown 1.2s infinite ease-in-out;
        cursor: pointer;
    }
}

.container {
    height: calc(100vh - 78px);
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
}

.swiper-item {
    scroll-snap-align: start;
    width: 100%;

    .title {
        font-family: PingFangSC, PingFang SC;
        font-weight: 600;
        font-size: 38px;
        color: #333;
        margin-top: 40px;
    }

    .sub-title {
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 24px;
        color: #333333;
        line-height: 68px;
        text-align: left;
        font-style: normal;
        margin-top: 50px;
    }

    .content {
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 18px;
        color: #333;
        margin-top: 19px;
    }


    .item-line {
        width: 60px;
        height: 6px;
        background: #fff;
    }

}

.left-view {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;

}

.right-view {
    width: 814px;
    padding: 90px 0 110px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.bg1 {
    background: linear-gradient(90deg, rgba(48, 105, 177, 0.08) 0%, rgba(36, 173, 206, 0.08) 16%, rgba(138, 193, 61, 0.08) 41%, rgba(210, 195, 40, 0.08) 58%, rgba(246, 114, 89, 0.08) 100%);
}

.thumbClass {
    width: 70px;
    height: 70px;
    object-fit: cover;
    border-radius: 50%;
    display: block;
    margin-right: 27px;
}

.advantagesClass{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 24px;
    color: #FFFFFF;
    line-height: 24px;
    text-align: left;
    font-style: normal;
}

.anchorClass{
    width: 70px;
    height: 70px;
    border-radius: 70px;
    display: block;
}

.projectPlaceClass{
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 24px;
    color: #FFFFFF;
    line-height: 24px;
    text-align: center;
    font-style: normal;
    margin-top: 20px;
}

.projectGoClass{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 16px;
    color: #000000;
    line-height: 22px;
    text-align: center;
    font-style: normal;
    margin-right: 10px;
}

.bannerTitle{
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 60px;
    color: #FFFFFF;
    line-height: 70px;
    text-shadow: 0px 0px 11px #613B1C;
}

.bannerIntro{
    font-family: PingFangSC, PingFang SC;
    font-weight: 300;
    font-size: 30px;
    color: #FFFFFF;
    line-height: 45px;
    margin-top: 13px;
}

.infoTitle{
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 48px;
    color: #000000;
    line-height: 52px;
}

.infoIntro{
    margin-bottom: 60px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: #666666;
    line-height: 30px;
    margin-top: 20px;
}

.mapTitle{
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 48px;
    color: #FFFFFF;
    line-height: 61px;
    width: 80%;
}

.mapIntro{
    flex: 1;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 18px;
    color: #FFFFFF;
    line-height: 25px;
    opacity: 0.6;
}

.itemName{
    padding: 30px 0;
    border-bottom: 1px #979797 solid;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 20px;
    color: #FFFFFF;
    line-height: 28px;
}

.mapPic{
    width: 100%;
    border-radius: 20px;
    margin-top: 40px;
    display: block;
}

.padding100{
    padding: 100px;
}

.leftBox{
    margin-right: 40px;
    width: 50%;
    padding-left: 70px;
}

.marginTop35{
    margin-top: 35px;
}

.marginTop25{
    margin-top: 25px;
}

@media (max-width: 1900px) {

.leftBox{
    margin-right: 40px*0.7;
    width: 50%;
    padding-left: 70px;
}

.marginTop35{
    margin-top: 35px*0.7;
}

.marginTop25{
    margin-top: 25px*0.7;
}

    .padding100{
        padding: 100px*0.7;
    }

.thumbClass {
    width: 70px*0.7;
    height: 70px*0.7;
    object-fit: cover;
    border-radius: 50%;
    display: block;
    margin-right: 27px*0.7;
}

.advantagesClass{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: #FFFFFF;
    line-height: 24px;
    text-align: left;
    font-style: normal;
}

.anchorClass{
    width: 70px*0.7;
    height: 70px*0.7;
    border-radius: 70px*0.7;
    display: block;
}

.projectPlaceClass{
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 16px;
    color: #FFFFFF;
    line-height: 24px;
    text-align: center;
    font-style: normal;
    margin-top: 20px*0.7;
}

.projectGoClass{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 16px;
    color: #000000;
    line-height: 22px*0.7;
    text-align: center;
    font-style: normal;
    margin-right: 10px*0.7;
}

.bannerTitle{
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 60px*0.7;
    color: #FFFFFF;
    line-height: 70px*0.7;
    text-shadow: 0px 0px 11px #613B1C;
}

.bannerIntro{
    font-family: PingFangSC, PingFang SC;
    font-weight: 300;
    font-size: 30px*0.7;
    color: #FFFFFF;
    line-height: 45px*0.7;
    margin-top: 13px*0.7;
}

.infoTitle{
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 48px*0.7;
    color: #000000;
    line-height: 52px*0.7;
}

.infoIntro{
    margin-bottom: 60px*0.7;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: #666666;
    line-height: 25px;
    margin-top: 20px*0.7;
}

.mapTitle{
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 48px*0.7;
    color: #FFFFFF;
    line-height: 61px*0.7;
    width: 80%;
}

.mapIntro{
    flex: 1;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: #FFFFFF;
    line-height: 25px;
    opacity: 0.6;
}

.itemName{
    padding: 30px*0.7 0;
    border-bottom: 1px #979797 solid;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: #FFFFFF;
    line-height: 28px*0.7;
}

.mapPic{
    width: 100%;
    border-radius: 20px;
    margin-top: 40px*0.7;
    display: block;
}

}
</style>