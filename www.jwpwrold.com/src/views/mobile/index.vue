<template>
  <mobileHeader :showBarColor="scroll > 100 ? 'white' : 'transparent'"></mobileHeader>
  <div class="container" id="scrollContainer" ref="scrollContainer">

    <div class="page floor-1 flex-center" :style="'background-image: url(' + info.pic + ')'">
      <div class="content">
        <div class="anim-main " :class="language==1?'title':'title_en'" v-html="info.title"></div>
        <div class="anim-main" :class="language == '1' ? 'sub-title' : 'sub-title_en'" v-html="info.sub_title">
        </div>
        <div class="anim-main intro" v-html="info.content"></div>
        <img class="down-img" src="@/assets/down.png" @click="toBottom" />
      </div>
    </div>

    <div class="page">
      <!-- <div style="height: 80px;"></div> -->
      <div class="floor-2">
        <div class="title anim-y" style="opacity: 0;">{{ floor2Info.info.intro }}</div>
        <div style="margin-right: 24px;">
          <img class="anim-y" style="opacity: 0;" :src="floor2Info.image" />
        </div>
      </div>

      <div class="floor-3">
        <div style="height: 50px;"></div>
        <div class="title anim-y">{{ serviceInfo.info.intro }}</div>
        <div class="grid-view">
          <template v-for="(item, index) in serviceInfo.list">
            <div class="service anim-y" :style="item.color == '1' ? 'background: linear-gradient( 45deg, #4B5EFF 0%, #4F8AFF 100%);' : 'background: linear-gradient( 45deg, #2136E0 0%, #226DFF 100%);'">
              <img :src="item.pic" />
              <div class="item-line"></div>
              <div class="name" v-html="item.title"></div>
            </div>
          </template>
        </div>
      </div>
      <div class="floor-4">
        <van-swipe ref="swipeRef">
          <van-swipe-item v-for="item in bgImgs">

            <div :class="language==1?'content-view':'content-view_en'" :style="'background-image: url(' + item.pic + ')'">
              <div class="mark"></div>
              <div style="height: 55px;"></div>
              <div class="text">
                <div class="title anim-y" v-html="formartStr(item.title)"></div>
                <div class="content anim-y" v-html="formartStr(item.content)"></div>
              </div>

            </div>
          </van-swipe-item>
          <template #indicator="{ active, total }">
            <div class="custom-indicator flex-between anim-y">
              <!-- <div class="flex-left-center">
                <img style="width: 38px;" src="@/assets/prev.png" @click="onPrev" />
                <div style="width: 36px;"></div>
                <img style="width: 38px;" src="@/assets/next.png" @click="onNext" />
              </div> -->
              <div class="flex-left-center">
                <div v-for="(item) in total">
                  <div :class="item == active + 1 ? 'sel' : 'nor'"></div>
                </div>
              </div>
            </div>
          </template>
        </van-swipe>
      </div>
      <div class="floor-6">
        <div style="height: 40px;"></div>
        <div class="flex-between anim-y" style="margin:0 24px;">
          <div class="title">
            {{ language == '1' ? '全球资讯' : 'Global Insights' }}
          </div>
          <div class="flex-center look-more" @click="onMoreClick">{{ language == 1 ? '查看详情' : "More"
                        }}<el-icon>
              <ArrowRight />
            </el-icon></div>
        </div>
        <div class="flex-left-center anim-y" style="margin-top: 15px;">
          <div class="flex-center-col" style="margin-left: 24px;">
            <div :class="curIndex == 1 ? 'tab sel' : 'tab nor'" @click="onNewTab(1)">
              {{ language == '1' ? '最新资讯' : 'News' }} </div>
            <div v-if="curIndex == 1" class="active-line"></div>
          </div>
          <div class="flex-center-col" style="margin-left: 25px;">
            <div :class="curIndex == 2 ? 'tab sel' : 'tab nor'" @click="onNewTab(2)">
              {{ language == '1' ? '分析报告' : 'Reports' }}</div>
            <div v-if="curIndex == 2" class="active-line"></div>
          </div>
        </div>
        <template v-for="item in news.slice(0, 4)">
          <div class="flex item-view anim-y" @click="onItemClick(item.id)">
            <img class="img-view" :src="item.pic"></img>
            <div style="margin-left: 10px; ">
              <div class="zx-title">{{ item.title }}</div>
              <div class="zx-time">{{ item.create_time }}</div>
            </div>
          </div>
        </template>
      </div>
      <div class="anim-y">
        <mobileFooter></mobileFooter>
      </div>
    </div>
  </div>
</template>
<script setup>
import { getAd, getAdList, getNewList } from "@/api/base";
import mobileFooter from "@/components/mobileFooter.vue";
import { formartStr } from "@/utils/util";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { nextTick, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";

// gsap.registerPlugin(ScrollTrigger);
// ScrollTrigger.defaults({
//   toggleActions: "play none none none", // 进入时播放，离开时不反向/暂停/重置
//   scroller: ".container",
// //   once: true, // 只触发一次
// });
const language = ref("");
const router = useRouter();
const info = ref({});
const bgImgs = ref([]);
const floor2Info = reactive({
  info: {},
  image: "",
});
const scrollContainer = ref(null);
const news = ref([]);
const isTop = ref(false);
const curIndex = ref(1);
const swipeRef = ref(null);
const serviceInfo = reactive({
  info: {},
  list: [],
});
const scroll = ref(0);

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

const onPrev = () => {
  swipeRef.value?.prev();
};
const onNext = () => {
  swipeRef.value?.next();
};

const init = async () => {
  language.value = localStorage.getItem("language") || "1";
  let res = await getAd("23");
  info.value = res.data;

  let res1 = await getAdList("18");
  bgImgs.value = res1.data.list;

  let res2 = await getAdList("24");
  floor2Info.info = res2.data.info;
  floor2Info.image = res2.data.list[0].pic;

  let res3 = await getAdList("20");
  serviceInfo.info = res3.data.info;
  let labelList = res3.data.list;
  labelList.forEach((element, index) => {
    if (index == 1 || index == 2 || index == 5 || index == 6) {
      element.color = "2";
    } else {
      element.color = "1";
    }
  });
  serviceInfo.list = labelList;
  const handleScroll = (e, f) => {
    // 处理滚动事件的逻辑
    scroll.value = scrollContainer.value.scrollTop;
  };
  nextTick(() => {
    if (scrollContainer.value) {
      scrollContainer.value.addEventListener("scroll", handleScroll);
    }
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.defaults({
      toggleActions: "play none none none", // 进入时播放，离开时不反向/暂停/重置
      scroller: ".container",
      once: true, // 只触发一次
    });
    startAnim();
  });
};

const getNewData = () => {
  getNewList({ category_id: "1" }).then((res) => {
    news.value = res.data.list;
  });
};

const startAnim = () => {
  gsap.utils.toArray(".anim-main").forEach((element, index) => {
    gsap.fromTo(
      element,
      {
        y: "100px",
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8 + index * 0.4,
        ease: "Power1.easeOut",
        scrollTrigger: {
          trigger: element,
          start: "top bottom", // 当元素顶部到达视口中心时触发
        },
      }
    );
  });
  gsap.utils.toArray(".anim-y").forEach((element) => {
    gsap.fromTo(
      element,
      {
        y: "50px",
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "Power1.easeOut",
        scrollTrigger: {
          trigger: element,
          start: "top bottom", // 当元素顶部到达视口中心时触发
        },
      }
    );
  });
};

const toBottom = () => {
  const scrollContainer = document.getElementById("scrollContainer");
  // const secondScreen = scrollContainer.children[1]; // 获取第二个屏幕元素
  // 获取第二个屏幕元素相对于滚动容器顶部的偏移量
  const offsetTop = window.innerHeight;
  //  secondScreen.offsetTop;
  // 滚动到第二屏幕的位置
  scrollContainer.scrollTo({
    top: offsetTop,
    behavior: "smooth",
  });
};
onMounted(() => {
  init();
  getNewData();
});

onBeforeUnmount(() => {
  ScrollTrigger.killAll();
});
</script>
<style lang="less" scoped>
.container {
  height: var(--doc-height);
  overflow-y: scroll;
  //   scroll-snap-type: y mandatory;

  .page {
    min-height: var(--doc-height);
    scroll-snap-align: start;
  }
}

.floor-6 {
  background: #edf1f4;
  padding-bottom: 40px;

  .title {
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 22px;
    color: #000000;
  }

  .tab {
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 0;
  }

  .nor {
    color: #666666;
  }

  .sel {
    color: #333333;
    font-weight: 600;
  }

  .active-line {
    width: 27px;
    height: 2px;
    background: linear-gradient(
      to right,
      rgba(71, 171, 255, 1),
      rgba(126, 155, 255, 1)
    );
  }

  .look-more {
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: #666666;
  }

  .item-view {
    margin-top: 20px;
    margin-left: 24px;
    margin-right: 24px;

    .img-view {
      width: 101px;
      height: 67px;
      object-fit: cover;
    }

    .zx-title {
      font-family: PingFangSC, PingFang SC;
      font-weight: 600;
      font-size: 16px;
      color: #2f3137;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .zx-time {
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 12px;
      margin-top: 5px;
      color: #999;
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
  background: url(https://dream-visas.oss-ap-southeast-1.aliyuncs.com/images/bg2.png)
    no-repeat center center;
  background-size: 100%;
  padding: 0 0;
  height: 640px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  .title {
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 26px;
    color: #333333;
    margin-left: 24px;
    margin-bottom: 70px;
  }

  img {
    width: 100%;
    margin-bottom: 10vw;
  }
}

.floor-1 {
  background-size: cover;
  background-position: 65%;

  .content {
    width: 100%;
    color: white;
    margin-left: 24px;

    .intro {
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 16px;
      color: #ffffff;
      max-width: 240px;
      opacity: 0;
    }

    .title {
      font-family: PingFang-SC, PingFang-SC;
      font-weight: 600;
      font-size: 26px;
      color: #ffffff;
      opacity: 0;
    }
    .title_en {
      font-family: PingFang-SC, PingFang-SC;
      font-weight: 600;
      font-size: 30px;
      color: #ffffff;
      opacity: 0;
    }
    .sub-title {
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 18px;
      color: #ffffff;
      line-height: 32px;
      letter-spacing: 3px;
      text-align: left;
      font-style: normal;
      margin: 28px 0;
      max-width: 260px;
      opacity: 0;
    }

    .sub-title_en {
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 18px;
      color: #ffffff;
      line-height: 32px;
      text-align: left;
      font-style: normal;
      max-width: 260px;
      margin: 28px 0;
      opacity: 0;
    }

    .down-img {
      margin-left: calc(50% - 22px);
      width: 15px;
      height: 30px;
      position: absolute;
      bottom: 85px;
      transform: translateX(-50%);
      animation: moveUpDown 1.2s infinite ease-in-out;
      cursor: pointer;
    }
  }
}

.floor-3 {
  background: url("@/assets/sticky_bg.png") no-repeat;
  background-position: center;
  background-size: 100% 100%;
  padding-bottom: 48px;

  .grid-view {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-top: 23px;
    margin-left: 24px;
    margin-right: 24px;
  }

  .title {
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 26px;
    color: #333333;
    margin-left: 24px;
  }

  .service {
    background: #27509e;
    padding: 23px 18px;
    opacity: 0;

    .item-line {
      width: 33px;
      height: 1.2px;
      background: #ffffff;
      margin: 8px 0 11px;
    }

    .name {
      font-family: PingFangSC, PingFang SC;
      font-weight: 600;
      font-size: 14px;
      color: #fff;
    }

    img {
      width: 28px;
      height: 28px;
    }
  }
}

.floor-4 {
  width: 100%;
  position: relative;

  .content-view {
    height: 105vw;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 0 10%;
  }

  .content-view_en {
    min-height: 125vw;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .mark {
    height: 145vw;
    width: 100%;
    position: absolute;
    // backdrop-filter: blur(6px);
    // -webkit-backdrop-filter: blur(6px) saturate(180%);
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
  .text {
    position: absolute;
    z-index: 2;
  }

  .title {
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 28px;
    color: #ffffff;
    margin: 0 24px;
    line-height: 30px;
  }

  .content {
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 18px;
    color: #ffffff;
    margin: 40px 24px 0;
    line-height: 30px;
    z-index: 2;
  }
}

.custom-indicator {
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 40px;

  .nor {
    width: 6px;
    height: 6px;
    background: #ffffff;
    margin-left: 10px;
  }

  .sel {
    width: 30px;
    height: 6px;
    background: #225ff7;
    margin-left: 10px;
  }
}
</style>