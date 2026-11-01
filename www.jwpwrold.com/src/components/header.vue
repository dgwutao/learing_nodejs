<template>
    <div :class="isTop ? 'transparent' : 'bg'">
        <div class="logo flex-center" @click="onActionClick(1)">
            <img :src="isTop ? logowhite : logogray" />
        </div>
        <div class="flex" style="margin-right: 100px;">
            <div class="action flex-center-col" @click="onActionClick(1)">
                <div :class="route.path == '/' ? 'active' : ''">首页</div>
                <div v-if="route.path == '/'" class="tab-line"></div>
                <div v-if="route.path != '/'" class="tab-hover-line"></div>
            </div>
            <div class="action flex-center-col" @click="onActionClick(2)">
                <div :class="route.path == '/service' ? 'active' : ''">核心服务</div>
                <div v-if="route.path == '/service'" class="tab-line"></div>
                <div v-if="route.path != '/service'" class="tab-hover-line"></div>
            </div>
            <div class="action flex-center-col" @click="onActionClick(3)">
                <div :class="route.path == '/club' || route.path == '/clubs' ? 'active' : ''">DDS使命</div>
                <div v-if="route.path == '/club' || route.path == '/clubs'" class="tab-line"></div>
                <div v-if="route.path != '/club' || route.path == '/clubs'" class="tab-hover-line"></div>
            </div>
            <div class="action flex-center-col" @click="onActionClick(4)">
                <div :class="route.path == '/news' ? 'active' : ''">资讯与分析报告</div>
                <div v-if="route.path == '/news'" class="tab-line"></div>
                <div v-if="route.path != '/news'" class="tab-hover-line"></div>
            </div>
            <div class="action flex-center-col" @click="onActionClick(5)">
                <div :class="route.path == '/about' ? 'active' : ''">关于我们</div>
                <div v-if="route.path == '/about'" class="tab-line"></div>
                <div v-if="route.path != '/about'" class="tab-hover-line"></div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import logogray from '../assets/logo_gray.png';
import logowhite from '../assets/logo_white.png';

const router = useRouter();
const route = useRoute();
const isTop = ref(true);
const props = defineProps({
    isTop: {
        type: Boolean,
        default: true
    }
});

watch(() => props.isTop, (newVal) => {
    isTop.value = newVal;
});

const onActionClick = (index) => {
    switch (index) {
        case 1:
            router.push("/");
            break;
        case 2:
            router.push("/service")
            break;
        case 3:
            router.push("/club")
            break;
        case 4:
            router.push("/news")
            break;
        case 5:
            router.push("/about")
            break;
    }
}

const threshold = 100; // 滚动超过100px时改变颜色

// 处理滚动事件
const handleScroll = () => {
    const scrollTop = window.scrollY || window.pageYOffset;
    if (scrollTop > threshold) {
        isTop.value = false;
    } else {
        isTop.value = true;
    }
};
// 组件挂载时添加滚动事件监听器
onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

// 组件卸载时移除滚动事件监听器
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>
<style scoped lang="less">
.bg {
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    z-index: 99;
    transition: background 0.5s ease;
    border-bottom: #DFDFDF 1px solid;

    .action {
        margin-left: 120px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 18px;
        color: #333333;
        cursor: pointer;
        transition: background 0.5s ease;
        justify-content: flex-start;
    }

    .tab-line {
        width: 24px;
        height: 2px;
        background-color: #0B162B;
        margin-top: 9px;
    }

    .active {
        font-weight: 600;
        color: #0B162B;
    }

    .tab-hover-line {
        width: 0px;
        height: 2px;
        background-color: #0B162B;
        margin-top: 9px;
    }

    .action:hover {
        .tab-hover-line {
            width: 24px;
            transition: all 0.5s ease;
        }
    }
}

.transparent {
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.14);
    z-index: 99;
    transition: background 0.5s ease;

    .action {
        margin-left: 120px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 18px;
        color: #fff;
        cursor: pointer;
        transition: background 0.5s ease;
        justify-content: flex-start;
    }

    .active {
        font-weight: 600;
    }

    .tab-line {
        width: 24px;
        height: 2px;
        background-color: #FFFFFF;
        margin-top: 9px;
    }

    .tab-hover-line {
        width: 0px;
        height: 2px;
        background-color: #FFFFFF;
        margin-top: 9px;
    }

    .action:hover {
        .tab-hover-line {
            width: 24px;
            transition: all 0.5s ease;
        }
    }
}

.logo {
    margin-left: 82px;
    cursor: pointer;

    img {
        width: 90px;
    }
}
</style>