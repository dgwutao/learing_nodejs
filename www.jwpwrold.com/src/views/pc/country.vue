<template>
    <div>
        <div style="width: 100%;height: 100vh;background-color: #0b1121;display: flex;align-items:center;justify-content: flex-start;position: relative;">
            <img loading="eager" v-if="data.country.country.banner" :src="data.country.country.banner" style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;object-fit: cover;display: block;"/>
            <div style="background: linear-gradient( 90deg, #000000 0%, rgba(0,0,0,0) 100%);width: 70%;height: 100%;z-index: 8;position: absolute;left: 0;top: 0;opacity: 0.8;"></div>
            <div class="animated bannerTitle" v-html="data.country.country.banner_title"></div>
            <div style="background: linear-gradient( 180deg, rgba(21,63,109,0) 0%, #11264B 69%, #11264B 100%);position: absolute;left: 0;bottom: 0;width: 100%;z-index: 9;aspect-ratio: 7.3;"></div>
        </div>

        <div style="background-color:#11264B">
            <div>
            <div v-for="(item,index) in data.country.listdetail" :style="(index%2==0?'background-color:#11264B;':'background-color:#0C1B36;')+(index==0?'padding:0 0 50px 0;':'padding: 50px 0;')+'color: white;overflow:hidden;display:flex;align-items: center;justify-content: space-between;'">

            <div class="imgContainer animated imgSpecClass">
                <img @click="onItemClick(item.id,item.country_name)" :src="item.pic" style="width: 100%;height: 100%;object-fit: cover;display: block;cursor: pointer;"/>
            </div>

            <div class="imgRightClass">
                <div>
                    <!-- <div style="display: flex;align-items: center;width: 100%;">
                        <div class="listLineClass animated"></div>
                        <div class="listTypeClass animated">(0{{ index+1 }})</div>
                    </div> -->
                    <div class="listTitleClass animated" v-html="item.title"></div>
                    <div class="listCountryClass animated">{{ item.country_name }}</div>
                    <div class="listIntroClass animated"  v-html="item.intro"></div>
                </div>
                
                <div class="animated listLearnContainer" @click="onItemClick(item.id,item.country_name)">
                    <div style="display: flex;align-items: center;">
                        <div class="listLearnClass">{{ fileStore.dict.common_more }}</div>
                        <img src="../../assets/jwp_icon_country.png" class="iconCountry"/>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>

            <!-- <div v-for="(item,index) in data.country.listdetail" :style="(index%2==0?'background-color:#11264B;':'background-color:#0C1B36;')+(index==0?'padding:0 100px 50px 100px;':'padding: 50px 100px;')+'color: white;overflow:hidden;'"> -->

        <!-- <div style="background-color:#11264B">
            <div>

            <div v-for="(item,index) in data.country.listdetail" class="listContainer" :style="(index%2==0?'background-color:#11264B;':'background-color:#0C1B36;')">
            <div v-if="index%2==0" style="display: flex;align-items: center;justify-content: space-between;">
                <div>
                    <div class="animated countryName2">{{ item.country_name }}</div>
                    <div class="animated itemTitle2" v-html="item.title"></div>
                    <div class="animated itemIntro2" v-html="item.intro"></div>
                </div>
                <div class="animated" style="flex-shrink: 0;margin-left: 200px;cursor: pointer;" @click="onItemClick(item.id,item.country_name)">
                    <div style="display: flex;align-items: center;">
                        <div class="commonMore">{{ fileStore.dict.common_more }}</div>
                        <img src="../../assets/jwp_icon_country.png" class="iconCountry2"/>
                    </div>
                </div>
            </div>

            <div v-if="index%2!=0" style="display: flex;align-items: center;justify-content: space-between;">
                <div class="animated" style="flex-shrink: 0;margin-right: 200px;cursor: pointer;" @click="onItemClick(item.id,item.country_name)">
                    <div style="display: flex;align-items: center;">
                        <div class="commonMore">{{ fileStore.dict.common_more }}</div>
                        <img src="../../assets/jwp_icon_country.png" class="iconCountry2"/>
                    </div>
                </div>
                <div>
                    <div class="animated" style="font-family: PingFangSC, PingFang SC;font-weight: 600;font-size: 26px;color: #FFFFFF;line-height: 37px;text-align: right;">{{ item.country_name }}</div>
                    <div class="animated itemTitle2" style="text-align: right;" v-html="item.title"></div>
                    <div class="animated itemIntro2" style="text-align: right;" v-html="item.intro"></div>
                </div>
            </div>
            <div class="imgContainer animated itemPic2">
                <img @click="onItemClick(item.id,item.country_name)" :src="item.pic" style="width: 100%;height: 100%;object-fit: cover;border-radius: 20px;display: block;cursor: pointer;"/>
            </div>
        </div>
        </div>
        </div> -->
        
        
        <div v-if="data.country.listsimple.length>0" class="padding0" style="background-color: #11264B;color: white;height: fit-content;">
            <div class="animated moreTitle" style="">{{ fileStore.dict.contry_more_title }}</div>
            <div :style="'display: grid;margin-top: 30px;grid-template-rows:none;gap: 20px;'+(data.row4?'grid-template-columns: repeat(4,1fr);':'grid-template-columns: repeat(3,1fr);')">
                <div v-for="item in data.country.listsimple" :style="'width: 100%;position: relative;border-radius: 20px;'+(data.row4?'aspect-ratio: 0.8;':'aspect-ratio: 1.4;')" class="imgContainer animated">
                    <img :src="item.pic" style="width: 100%;height: 100%;object-fit: cover;position:absolute;top: 0;left: 0;display: block;"/>
                    <div style="position: absolute;bottom: 20px;left: 14px;">
                        <div class="countryName">{{ item.country_name }}</div>
                        <div class="itemTitle">{{ item.title }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <Footer :bg_pic="data.country.country.bottom_pic"></Footer>
        </div>
    </div>
</template>
<script setup>
import { getAd, getAdList,getCountryDetail } from '@/api/base.js';
import { formartStr } from '@/utils/util.js';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/all';
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import Footer from "@/components/footer.vue";
import { useRoute, useRouter } from 'vue-router';
import { getDict } from "@/api/base";
import { useFileStore } from "@/store/index.js";
const fileStore = useFileStore();
const route = useRoute();
const router = useRouter();
const data = reactive({
    row4:false,
    info:{},
    country:{
        listsimple:[],
        country:{}
    }
})

const onItemClick = (id,name) => {
  router.push({
    path: "/project",
    query: { id },
  });
};

// gsap.registerPlugin(ScrollTrigger);
// ScrollTrigger.defaults({
//     toggleActions: "restart pause resume pause",
//     scroller: ".container"
// });

const datas = ref([]);
const state = reactive({
    banner: {}
});

const init = async () => {
    let res = await getAd('13');
    state.banner = res.data;

    let resData = await getAdList('14');
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

watch(() =>route.query.id, (newVal) => {
    data.country.country.banner = ''
    let id = route.query.id
    getCountryDetail(id).then(res=>{
        window.scrollTo({top: 0,left: 0,behavior: 'auto'});
            data.country = res.data
            //greece japan
            if (id == 4 || id == 7) {
                data.row4 = true
            }else{
                data.row4 = false
            }
        setTimeout(() => {
            window.scrollTo({top: 0,left: 0,behavior: 'auto'});
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
        }, 200);
    }).catch(e=>{
        console.log(e);
    })  
});

onMounted(() => {
    let id = route.query.id
    getCountryDetail(id).then(res=>{
        window.scrollTo({top: 0,behavior: 'auto'});
        data.country = res.data
        //greece japan
        if (id == 4 || id == 7) {
            data.row4 = true
        } else{
            data.row4 = false
        }
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
});

onBeforeUnmount(() => {
    // ScrollTrigger.killAll();
});

</script>
<style scoped lang="less">
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
  transition: all 0.8s ease; 
}

.imgContainer img{
  transition: all 0.8s ease; 
}

.imgContainer:hover img {
  transition: all 0.8s ease;          
  transform: scale(1.05);
}

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

    .title {
        font-family: PingFangSC, PingFang SC;
        font-weight: 600;
        font-size: 40px;
        color: #333;
        margin-top: 40px;
        margin-left: 100px;
    }

    .content {
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 26px;
        color: #666;
        margin-top: 24px;
        margin-left: 100px;
    }

    .item-line {
        width: 100px;
        height: 10px;
        margin-left: 100px;
        background: linear-gradient(45deg, #47ABFF 0%, #7E9BFF 100%);
    }

}

.left-view {
    width: 40vw;
    min-width: calc(1400px * 0.4);
    height: calc(100vh - 78px);
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;

}

.right-view {
    width: 60vw;
    min-width: calc(1400px * 0.6);
    height: calc(100vh - 78px);

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.imgSpecClass{
    // border-top-right-radius: 20px;
    // border-bottom-right-radius: 20px;
    margin-left: 70px;
    border-radius: 20px;
    width: 58%;
    aspect-ratio: 1.68;
    margin-right: 50px;
    max-height: 500px;
}

.imgRightClass{
    flex: 1;
    padding-right: 70px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
}

.listTypeClass{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: #FFFFFF;
    line-height: 22px;
    text-align: left;
    font-style: normal;
}

.listTitleClass{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 50px;
    color: #FFFFFF;
    line-height: 57px;
    text-align: left;
    font-style: normal;
    // margin-top: 30px;
}

.listCountryClass{
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 26px;
    color: #FFFFFF;
    line-height: 37px;
    text-align: left;
    font-style: normal;
    margin-top: 30px;
}

.listIntroClass{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 18px;
    color: #FFFFFF;
    line-height: 25px;
    text-align: left;
    font-style: normal;
    margin-top: 20px;
    opacity: 0.6;
}

.listLineClass{
    width: 30%;
    height: 1px;
    background-color: #979797;
    margin-right: 13px;
    flex-shrink: 0;
}

.listLearnClass{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 22px;
    color: #FFFFFF;
    line-height: 30px;
    text-align: left;
    font-style: normal;
    border-radius: 36px;
    padding: 14px 42px;
    border: 1px solid #F5F5F5;
}

.listLearnContainer{
    cursor: pointer;
    margin-top: 40px;
}

.bannerTitle{
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 60px;
    color: #FFFFFF;
    line-height: 70px;
    margin-left: 100px;
    z-index: 9;
}

.moreTitle{
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 44px;
    color: #FFFFFF;
    line-height: 57px;
}

.countryName{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #FFFFFF;
    line-height: 20px;
}

.itemTitle{
    margin-top: 2px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 26px;
    color: #FFFFFF;
    line-height: 37px;
}

.padding0{
    padding:30px 100px 50px 100px;
}

.iconCountry{
    width: 60px;height: 60px;margin-left: -10px;
}

.countryName2{
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 26px;
    color: #FFFFFF;
    line-height: 37px;
}

.itemTitle2{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 50px;
    color: #FFFFFF;
    line-height: 57px;
    margin-top: 20px;
}

.itemIntro2{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 18px;
    color: #FFFFFF;
    line-height: 25px;
    opacity: 0.6;
    margin-top: 15px;
}

.commonMore{
    padding: 15px 42px;
    border: 2px white solid;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 22px;
    color: #FFFFFF;
    line-height: 30px;
    border-radius: 40px;
}

.iconCountry2{
    width: 60px;
    height: 60px;
    margin-left: -10px;
}

.itemPic2{
    margin-top: 40px;
    overflow: hidden;
    border-radius: 20px;
    width: 100%;
    aspect-ratio: 2.8;
}

.listContainer{
    color: white;
    overflow:hidden;
    padding: 50px 100px;
}

@media (max-width: 1900px) {

.listContainer{
    color: white;
    overflow:hidden;
    padding: 50px 70px;
}

.countryName2{
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 26px*0.7;
    color: #FFFFFF;
    line-height: 37px;
}

.itemTitle2{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 50px*0.7;
    color: #FFFFFF;
    line-height: 57px;
    margin-top: 20px*0.7;
}

.itemIntro2{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: #FFFFFF;
    line-height: 25px;
    opacity: 0.6;
    margin-top: 15px*0.7;
}

.commonMore{
    padding: 15px*0.7 42px*0.7;
    border: 2px white solid;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: #FFFFFF;
    line-height: 30px;
    border-radius: 40px;
}

.iconCountry2{
    width: 60px*0.7;
    height: 60px*0.7;
    margin-left: -10px;
}

.itemPic2{
    margin-top: 40px*0.7;
    overflow: hidden;
    border-radius: 20px;
    width: 100%;
    aspect-ratio: 3.0;
}

.iconCountry{
    width: 60px*0.7;
    height: 60px*0.7;
    margin-left: -10px;
}

.padding0{
    padding:30px*0.7 100px*0.7 50px*0.7 100px*0.7;
}

.imgSpecClass{
    // border-top-right-radius: 20px;
    // border-bottom-right-radius: 20px;
    border-radius: 20px;
    width: 58%;
    aspect-ratio: 1.8;
    margin-left: 70px;
    margin-right: 50px*0.7;
    max-height: 500px;
}

.imgRightClass{
    flex: 1;
    padding-right: 70px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
}

.listTypeClass{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: #FFFFFF;
    line-height: 22px*0.7;
    text-align: left;
    font-style: normal;
}

.listTitleClass{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 50px*0.7;
    color: #FFFFFF;
    line-height: 57px*0.7;
    text-align: left;
    font-style: normal;
    // margin-top: 30px*0.7;
}

.listCountryClass{
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 26px*0.7;
    color: #FFFFFF;
    line-height: 37px*0.7;
    text-align: left;
    font-style: normal;
    margin-top: 30px*0.7;
}

.listIntroClass{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: #FFFFFF;
    line-height: 22px;
    text-align: left;
    font-style: normal;
    margin-top: 20px*0.7;
    opacity: 0.6;
}

.listLineClass{
    width: 30%;
    height: 1px;
    background-color: #979797;
    margin-right: 13px*0.7;
    flex-shrink: 0;
}

.listLearnClass{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: #FFFFFF;
    line-height: 30px*0.7;
    text-align: left;
    font-style: normal;
    border-radius: 36px;
    padding: 14px*0.7 42px*0.7;
    border: 1px solid #F5F5F5;
}

.listLearnContainer{
    cursor: pointer;
    margin-top: 40px*0.7;
}

.bannerTitle{
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 60px*0.7;
    color: #FFFFFF;
    line-height: 70px*0.7;
    margin-left: 100px*0.7;
    z-index: 9;
}

.moreTitle{
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 44px*0.7;
    color: #FFFFFF;
    line-height: 57px*0.7;
}

.countryName{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: #FFFFFF;
    line-height: 20px*0.7;
}

.itemTitle{
    margin-top: 2px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 26px*0.7;
    color: #FFFFFF;
    line-height: 37px*0.7;
}

}
</style>