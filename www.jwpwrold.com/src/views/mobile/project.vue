<template>
    <div class="container" id="scrollContainer">
        <div class="banner flex-center-col"
            :style="'background-image: url(' + state.banner.pic + ')'">
            <div class="banner-anim flex-center-col" style="opacity: 0;">
                <div class="title">{{ state.banner.title }}</div>
                <div class="sub-title" v-html="formartStr(state.banner.sub_title)"></div>
            </div>
            <img class="down-img" src="@/assets/down.png" @click="toBottom" />
            
        </div>
        <div v-for="(item, index) in datas" class="swiper-item" :class="index % 2 === 0 ? '' : 'bg1'">
            <div :class="'anim-club anim' + index" style="margin:0 24px;opacity: 0;">
                <div style="height: 26px;"></div>
                <div class="title" v-html="formartStr(item.title)"></div>
                <div class="sub-title" v-html="formartStr(item.sub_title)"></div>
                <div class="content" v-html="formartStr(item.content)"></div>
                <img :src="item.pic">
            </div>
        </div>
    </div>
</template>
<script setup>
import { getAd, getAdList,getProjectDetail } from '@/api/base.js';
import { formartStr } from '@/utils/util.js';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/all';
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({
    toggleActions: "restart pause resume pause",
    scroller: ".container"
});

const datas = ref([]);
const state = reactive({
    banner: {}
});

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
                y: '100px',
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                duration: 1.2,
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
    // init();
    getProjectDetail
});

onBeforeUnmount(() => {
    ScrollTrigger.killAll();
});

</script>
<style scoped lang="less">
.container {
    height: var(--doc-height);
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
}

.banner {
    width: 100%;
    height: var(--doc-height);
    background: url('') no-repeat top center;
    background-size: cover;
    scroll-snap-align: start;
    position: relative;


    .title {
        margin-top: -100px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 600;
        font-size: 26px;
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
        width: 15px;
        height: 30px;
        position: absolute;
        bottom: 85px;
        transform: translateX(-50%);
        animation: moveUpDown 1.2s infinite ease-in-out;
        cursor: pointer;
    }
}

.swiper-item {
    height: var(--doc-height);
    scroll-snap-align: start;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title {
        font-family: PingFangSC, PingFang SC;
        font-weight: 600;
        font-size: 22px;
        color: #333;
    }

    .sub-title {
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 18px;
        color: #333;
        margin-top: 10px;
    }

    .content {
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 16px;
        color: #333;
        margin-top: 8px;
    }


    .item-line {
        width: 60px;
        height: 6px;
        background: #fff;
    }

    img {
        width: 100%;
        object-fit: cover;
        margin-top: 20px;
    }
}

.bg1 {
    background: linear-gradient(90deg, rgba(48, 105, 177, 0.08) 0%, rgba(36, 173, 206, 0.08) 16%, rgba(138, 193, 61, 0.08) 41%, rgba(210, 195, 40, 0.08) 58%, rgba(246, 114, 89, 0.08) 100%);
}
</style>