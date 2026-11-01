<template>
    <div class="container" id="scrollContainer">
        <div v-for="(item, index) in state.banner" class="banner flex-center-col">
            <div class="banner flex-left-center"
                :style="'background-image: url(' + item.pic + ')'">
                <div :class="'mark banner-anim' + index" style="opacity: 0;">
                    <div :class="language==1?'title':'title_en'" >{{ item.title }}</div>
                    <div :class="language==1?'sub-title':'sub-title_en'" v-html="formartStr(item.content)"></div>
                </div>
            </div>
            <!-- <img v-if="index == 0" class="down-img" src="../assets/down.png" @click="toBottom" /> -->
        </div>
        <div v-if="state.banner.length > 0" class="footer">
            <mobileFooter></mobileFooter>
        </div>
    </div>
</template>

<script setup>
import { getAdList,addMessage } from '@/api/base.js';
import { formartStr } from '@/utils/util.js';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { nextTick, onMounted } from 'vue';
import mobileFooter from '../../components/mobileFooter.vue';
const language = ref("");
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({
    toggleActions: "play",
    scroller: ".container"
});

const state = reactive({
    banner: [],
});

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

const init = async () => {
    language.value = localStorage.getItem("language") || "1";
    let res = await getAdList('16')
    state.banner = res.data.list;

    nextTick(() => {
        for (let i = 0; i < state.banner.length; i++) {
            gsap.fromTo(`.banner-anim${i}`, {
                y: '100px',
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power1.inOut",
                scrollTrigger: {
                    trigger: `.banner-anim${i}`,
                    start: 'top bottom',
                },
            });
        }
    })
}

onMounted(() => {
    init();
});

onBeforeUnmount(() => {
    ScrollTrigger.killAll();
});
</script>

<style lang="less" scoped>
.container {
    height: var(--doc-height);
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
}

.banner {
    width: 100%;
    height: var(--doc-height);
    scroll-snap-align: start;
    background: url('') no-repeat center center;
    background-size: cover;
    position: relative;

    .title {
        font-family: PingFangSC, PingFang SC;
        font-weight: 600;
        font-size: 22px;
        color: #fff;
        margin-bottom: 26px;
        margin-left: 24px;
    }

    .title_en {
        font-family: PingFangSC, PingFang SC;
        font-weight: 600;
        font-size: 24px;
        color: #fff;
        margin-bottom: 26px;
        margin-left: 24px;
    }

    .sub-title {
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 16px;
        color: #fff;
        margin-left: 24px;
        max-width: 72%;
    }

    .sub-title_en {
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 16px;
        color: #fff;
        margin-left: 24px;
        max-width: 72%;
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

    .mark {
        width: 100%;
        background: rgba(255, 255, 255, 0.13);
        padding: 80px 0;
    }
}

.qr-bg {
    width: 78px;
    height: 78px;
    padding: 6px;
    border-radius: 4px;
    background: #fff;

    img {
        width: 78px;
        height: 78px;
        display: block;
    }
}

.footer {
    scroll-snap-align: end;
}
</style>