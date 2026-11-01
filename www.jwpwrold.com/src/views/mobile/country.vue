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
        <template v-for="(item, index) in datas">
            <div class="swiper-item">
                <div style="height: 80px;"></div>
                <div class="item-line anim-y"></div>
                <div class="title anim-y" v-html="formartStr(item.title)"></div>
                <div class="content anim-y" v-html="formartStr(item.sub_title)"></div>
                <div style="height: 40px;"></div>
                <div style="flex: 1;">
                    <img class="anim-y" :src="item.pic">
                </div>
            </div>
        </template>
    </div>
</template>
<script setup>
import { getAd, getAdList } from '@/api/base.js';
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

        let anims = gsap.utils.toArray('.anim-y');
        anims.forEach((element) => {
            gsap.fromTo(element, {
                y: '100px',
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power1.inOut",
                scrollTrigger: element,
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
    init();
});

onBeforeUnmount(() => {
    ScrollTrigger.killAll();
});

</script>
<style scoped lang="less">
.banner {
    width: 100%;
    height: var(--doc-height);
    background: url('') no-repeat top center;
    background-size: cover;
    scroll-snap-align: start;
    position: relative;


    .title {
        font-family: PingFangSC, PingFang SC;
        font-weight: 600;
        font-size: 26px;
        color: #FFFFFF;
    }

    .sub-title {
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 16px;
        color: #FFFFFF;
        text-align: center;
        margin-top: 20px;
    }

    .down-img {
        width: 15px;
        height: 30px;
        position: absolute;
        bottom: 85px;
        transform: translateX(-50%);
        animation: moveUpDown 1.2s infinite ease-in-out;
        cursor: pointer;
        z-index: 999;
    }
}

.container {
    height: var(--doc-height);
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
}

.swiper-item {
    height: var(--doc-height);
    scroll-snap-align: start;
    display: flex;
    flex-direction: column;

    .title {
        font-family: PingFangSC, PingFang SC;
        font-weight: 600;
        font-size: 22px;
        color: #000;
        margin: 20px 24px 0;
    }

    .content {
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 16px;
        color: #000;
        margin: 6px 24px 0;
    }

    .item-line {
        width: 34px;
        height: 3px;
        margin-left: 24px;
        background: linear-gradient(45deg, #47ABFF 0%, #7E9BFF 100%);
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

}
</style>