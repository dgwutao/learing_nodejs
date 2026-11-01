<template>
    <div>
        <div style="width: 100%;height: 100vh;display: flex;align-items: center;color: white;justify-content: flex-start;position: relative;">
            <img v-if="data.banner.pic" :src="data.banner.pic" style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;object-fit: cover;display: block;"/>
            <div class="animated" style="margin-left: 100px;z-index: 9;">
                <div v-html="data.banner.title" class="bannerTitleClass"></div>
                <div v-html="data.banner.sub_title" class="bannerSubtitle"></div>  
            </div>
        </div>
        <div class="sectionBG" style="padding-top: 50px;background-color: white;">
            <div class="animated contentTitle" v-html="fileStore.dict.service_content_title"></div>
            <div class="animated contentSubtitle">{{ fileStore.dict.service_content_sub_title }}</div>
            <div>
                <div class="textContainer animated padding80" v-for="(item,index) in data.service.list" :style="(index!=data.service.list.length-1?'border-bottom: 1px #d5d5d5 solid;':'')+'display: flex;align-items: center;justify-content: space-between;'">
                    <div class="imgContainerClass">
                        <img :src="item.pic"/>
                    </div>
                    <div style="flex: 1;margin-left: 56px;height: fit-content;">
                        <div class="textClass" v-html="item.title"></div>
                        <div class="textClass2" v-text="item.sub_title"></div>
                    </div>
                </div>
            </div>
        </div>
        <div style="background-color: #0A1222;">
            <div class="height100" style="width: 100%;background-color: white;">
                        <div style="background-color: #f1f1f1;width: 100%;height: 100%;border-top-left-radius: 30px;border-top-right-radius: 30px;"></div>
            </div>
            <div class="padding0" style="background-color: #f1f1f1;border-bottom-left-radius: 30px;border-bottom-right-radius: 30px;">
            <div class="animated" style="display: flex;align-items: center;justify-content: space-between;">
                <div>
                    <div class="processTitle">{{ fileStore.dict.service_process_title }}</div>
                    <div class="processSubtitle">{{ fileStore.dict.service_process_sub_title }}</div>
                </div>
                <img src="../../assets/jwp_icon_service_bottom.png" class="serviceBottom"/>
            </div>

            
            <!-- <div class="animated" style="display: flex;align-items: flex-end;justify-content: space-between;margin-top: 100px;"> -->
                <div class="animated" style="display: grid;grid-template-columns: repeat(4,1fr);gap: 20px;margin-top: 100px;align-items: end;">
                <div class="progressContainer" v-for="(item,index) in data.progress.list">
                    <div v-if="index==1||index==3" style="display: flex;align-items: center;justify-content: space-between;">
                        <div class="indexClass"><div>{{index+1}}</div></div>
                        <div class="progressArrowClass">
                            <img src="../../assets/jwp_arrow_service_right.png" class="indexImg"/>
                        </div>
                    </div>
                    <div v-else>
                        <div class="indexClass"><div>{{index+1}}</div></div>
                        <div class="progressArrowClass">
                            <img src="../../assets/jwp_arrow_service_right.png" class="indexImg"/>
                        </div>
                    </div>
                    <div v-html="item.title" class="itemTitle"></div>
                    <div v-html="item.sub_title" class="itemSubtitle"></div>
                </div>
            </div>
        </div>
        </div>
        
        <div>
            <Footer></Footer>
        </div>
    </div>

</template>
<script setup>
import { getAdList,getAdOne } from "@/api/base";
import { formartStr } from "@/utils/util";
import { gsap } from "gsap";
import 'swiper/css';
import 'swiper/css/effect-fade';
import { EffectFade, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { nextTick, onMounted, ref } from 'vue';
import Footer from "@/components/footer.vue";
import { getDict } from "@/api/base";
import { useFileStore } from "@/store/index.js";
const fileStore = useFileStore();
const swiperControll = ref();
const curIndex = ref(0);
const modules = ref([EffectFade, Mousewheel]);
const datas = ref([]);
const data = reactive({
    info:{},
    banner:{},
    progress:{},
    service:{}
})

const onSwiper = (swiper) => {
    swiperControll.value = swiper;
};
const onSlideStart = (e) => {
    console.log('start');
    gsap.to('.anim-service', {
        opacity: 0,
        duration: 0.1,
    });
};

const handleSlideChange = (e) => {
    console.log('end');
    curIndex.value = e.realIndex;
    gsap.fromTo('.anim-service', {
        y: '100px',
        opacity: 0,
    }, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power1.inOut"
    });
};

const onItemClick = (index) => {
    curIndex.value = index;
    swiperControll.value.slideTo(index);
};

const init = () => {
    getAdList('12').then(res => {
        datas.value = res.data.list;
        nextTick(() => {
            gsap.fromTo('.anim-service', {
                y: '100px',
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power1.inOut"
            });
        })
    });
};

onMounted(() => {

    //托管服务-banner
    getAdOne(29).then(res=>{
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

    //托管服务-服务内容
    getAdList(31).then(res=>{
        data.service = res.data
    }).catch(e=>{
        console.log(e);
    })  

    //托管服务-服务流程
    getAdList(32).then(res=>{
        data.progress = res.data
    }).catch(e=>{
        console.log(e);
    })  
    
    // getDict().then(res=>{
    //     fileStore.dict = res.data
    // }).catch(e=>{
    //     console.log(e);
    // })  
});
</script>
<style scoped lang="less">



// .textClass:hover{
//     font-size: 34px;
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

.progressArrowClass{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: fit-content;
    margin-top: 10px;
    overflow: hidden;
    opacity: 0;
    transition: all 0.8s ease;
}

.progressContainer {
    background-color: white;
    border-radius: 20px;
    height: fit-content;
    // width: 20%;
    padding: 30px;
    transition: all 0.8s ease;
}

.progressContainer:hover {
    box-shadow: 0 15px 40px rgba(0,0,0,0.15);
    transform: translateY(-10px);

    .progressArrowClass {
        opacity: 1;
    }
}

.sectionBG{
    background-image: url(../../assets/jwp_bg_service_section.png);
    background-repeat: no-repeat;
    background-size: cover;
}

.anim-service {
    opacity: 0;
}

.left-view {
    flex: 1;
    height: calc(100vh - 78px);


    .mySwiper {
        width: 100%;
        height: calc(100vh - 78px);
    }

    .swiper-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: calc(100vh - 78px);
        background-repeat: no-repeat;
        background-size: cover;

        .title {
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 46px;
            color: #FFFFFF;
            margin-top: 44px;
        }

        .sub-title {
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 20px;
            color: #FFFFFF;
        }

        .content {
            font-family: PingFangSC, PingFang SC;
            font-weight: 300;
            font-size: 20px;
            color: #FFFFFF;
            margin-top: 36px;
            flex: 1;
            max-width: 900px;
        }

        .item-line {
            width: 60px;
            height: 6px;
            background: #fff;
        }


        .bet-line {
            height: 140px;
            width: 2px;
            background-color: rgba(217, 217, 217, 0.5);
            margin: 0 60px;
        }

        .point {
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background-color: #fff;
            margin-right: 10px;
            margin-top: 10px;
        }

    }
}

.right-view {
    width: 350px;
    height: calc(100vh - 78px);
    background-color: #fff;
    overflow-y: auto;

    .item-sel {
        // height: 100px;
        background: linear-gradient(45deg, #47ABFF 0%, #7E9BFF 100%);
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 20px;
        color: #FFFFFF;
        text-align: right;
        // padding-right: 60px;
        padding: 35px 60px 35px 0;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .item-nor {
        // height: 100px;
        
        background: transparent;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 20px;
        text-align: right;
        color: #666;
        // padding-right: 60px;
        padding: 35px 60px 35px 0;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .item-nor:hover {
        transition: all .5s;
        color: #333333;
    }
}

.bannerTitleClass{
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 60px;
    color: #FFFFFF;
    line-height: 70px;
    text-shadow: 0px 0px 11px #613B1C;
    margin-bottom: 20px;
}

.bannerSubtitle{
    font-family: PingFangSC, PingFang SC;
    font-weight: 300;
    font-size: 30px;
    color: #FFFFFF;
    line-height: 45px;
}

.contentTitle{
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 48px;
    color: #000000;
    line-height: 52px;
}

.contentSubtitle{
    width: 100%;
    text-align: center;
    margin-top: 33px;
    font-weight: 400;
    font-size: 18px;
    color: #000000;
    line-height: 24px;
    opacity: 30%;
}

.imgContainerClass{
    width: 204px;
    height: 204px;
    border-radius: 10px;
    flex-shrink: 0;
    overflow: hidden;
}

.textContainer {
    img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        transition: all 0.8s ease;
    }
}

.textContainer:hover{

    // .textClass2{
    //     font-size: 23px;
    // }

    // .textClass{
    //     font-size: 33px;
    // }

    img{
        transform: scale(1.05);
        transition: all 0.8s ease;
    }
}

.textClass2{
    margin-top: 5px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 22px;
    color: #000000;
    line-height: 35px;
    opacity: 0.6;
    transition: all 0.3s ease;
}

.textClass{
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 32px;
    color: #0E1A2F;
    line-height: 45px;
    transition: all 0.3s ease;
}

.processTitle{
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 48px;
    color: #000000;
    line-height: 52px;
}

.processSubtitle{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 18px;
    color: #000000;
    line-height: 24px;
    margin-top: 15px;
    opacity: 0.3;
}

.indexClass{
    background-color: #5a6581;
    text-align: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    color:white;
    font-size: 40px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.indexImg{
    width: 82px;
    height: 82px;
    transition: all 0.3s ease;
}

.itemTitle{
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 30px;
    color: #0E1A2F;
    line-height: 30px;
    margin-top: 46px;
}

.itemSubtitle{
    margin-top: 17px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: #000000;
    line-height: 22px;
    opacity: 0.6;
}

.serviceBottom{
    width: 760px;
    height: 92px;
}

.padding80{
    padding: 80px;
}

.height100{
    height: 100px;
}

.padding0{
    padding: 0 100px 100px 100px;
}

@media (max-width: 1900px) {

.height100{
    height: 100px*0.7;
}

.padding0{
    padding: 0 100px*0.7 100px*0.7 100px*0.7;
}

.padding80{
    padding: 80px*0.7;
}

.bannerTitleClass{
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 60px*0.7;
    color: #FFFFFF;
    line-height: 70px*0.7;
    // text-shadow: 0px 0px 11px #613B1C;
    margin-bottom: 20px*0.7;
}

.bannerSubtitle{
    font-family: PingFangSC, PingFang SC;
    font-weight: 300;
    font-size: 30px*0.7;
    color: #FFFFFF;
    line-height: 45px*0.7;
}

.contentTitle{
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 48px*0.7;
    color: #000000;
    line-height: 52px*0.7;
}

.contentSubtitle{
    width: 100%;
    text-align: center;
    margin-top: 33px*0.7;
    font-weight: 400;
    font-size: 16px;
    color: #000000;
    line-height: 24px*0.7;
    opacity: 30%;
}

.imgContainerClass{
    width: 204px*0.7;
    height: 204px*0.7;
    border-radius: 10px;
    flex-shrink: 0;
    overflow: hidden;
}

.textContainer {
    img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        transition: all 0.8s ease;
    }
}

.textContainer:hover{

    // .textClass2{
    //     font-size: 23px;
    // }

    // .textClass{
    //     font-size: 33px;
    // }

    img{
        transform: scale(1.05);
        transition: all 0.8s ease;
    }
}

.textClass2{
    margin-top: 5px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: #000000;
    line-height: 35px*0.7;
    opacity: 0.6;
    transition: all 0.3s ease;
}

.textClass{
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 32px*0.7;
    color: #0E1A2F;
    line-height: 45px*0.7;
    transition: all 0.3s ease;
}

.processTitle{
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 48px*0.7;
    color: #000000;
    line-height: 52px*0.7;
}

.processSubtitle{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: #000000;
    line-height: 24px*0.7;
    margin-top: 15px*0.7;
    opacity: 0.3;
}

.indexClass{
    background-color: #5a6581;
    text-align: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    color:white;
    font-size: 40px*0.7;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.indexImg{
    width: 82px*0.7;
    height: 82px*0.7;
    transition: all 0.3s ease;
}

.itemTitle{
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 30px*0.7;
    color: #0E1A2F;
    line-height: 30px*0.7;
    margin-top: 46px*0.7;
}

.itemSubtitle{
    margin-top: 17px*0.7;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: #000000;
    line-height: 22px;
    opacity: 0.6;
}

.serviceBottom{
    width: 760px*0.7;
    height: 92px*0.7;
}
}
</style>