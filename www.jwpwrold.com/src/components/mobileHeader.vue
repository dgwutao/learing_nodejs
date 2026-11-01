<template>
  <van-sticky>
    <div :class="showBarColor">
      <img
        class="logo-image"
        :src="showBarColor == 'white' ? blackLogo : whiteLogo" />
      <div @click="showMenu" style="margin-right: 24px; margin-top: 8px">
        <img
          style="width: 24px"
          :src="showBarColor == 'white' ? blackMenu : whiteMenu" />
      </div>
    </div>
  </van-sticky>

  <van-popup
    v-model:show="show"
    position="right"
    closeable
    :style="{ width: '60%', height: '100%' }">
    <div class="menu-pop">
      <div style="height: 100px"></div>
      <div class="action" @click="onActionClick(1)">
        <div :class="route.path == '/' ? 'active' : ''">
          {{ language == "1" ? "首页" : "Home" }}
        </div>
      </div>
      <div class="action" @click="onActionClick(2)">
        <div :class="route.path == '/service' ? 'active' : ''">
          {{ language == "1" ? "核心服务" : "Services" }}
        </div>
      </div>
      <div class="action" @click="onActionClick(3)">
        <div :class="route.path == '/project' ? 'active' : ''">
          {{ language == "1" ? "项目经验" : "Key Projects" }}
        </div>
      </div>
      <div class="action" @click="onActionClick(4)">
        <div :class="route.path == '/club' ? 'active' : ''">
          {{ language == "1" ? "DDS使命" : "Mission" }}
        </div>
      </div>
      <div class="action" @click="onActionClick(5)">
        <div :class="route.path == '/news' ? 'active' : ''">
          {{ language == "1" ? "资讯与分析报告" : "Reports" }}
        </div>
      </div>
      <div class="action" @click="onActionClick(6)">
        <div :class="route.path == '/about' ? 'active' : ''">
          {{ language == "1" ? "关于我们" : "About us" }}
        </div>
      </div>

      <div class="bottom-language">
        <div :class="language == '2' ? 'active' : ''" @click="toChange('2')">
          English
        </div>
        <div class="line"></div>
        <div :class="language == '1' ? 'active' : ''" @click="toChange('1')">
          简体中文
        </div>
      </div>
    </div>
  </van-popup>
</template>
<script setup>
import blackLogo from "@/assets/m_logo_black.png";
import whiteLogo from "@/assets/m_logo_white.png";
import blackMenu from "@/assets/menu_black.png";
import whiteMenu from "@/assets/menu_white.png";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const show = ref(false);
const language = ref(""); // 语言 cn中文 en英文

const props = defineProps({
  showBarColor: {
    type: String,
    default: "transparent",
  },
});

const showMenu = () => {
  show.value = true;
};

const onActionClick = (index) => {
  show.value = false;
  switch (index) {
    case 1:
      router.push("/");
      break;
    case 2:
      router.push("/service");
      break;
    case 3:
      router.push("/project");
      break;
    case 4:
      router.push("/club");
      break;
    case 5:
      router.push("/news");
      break;
    case 6:
      router.push("/about");
      break;
  }
};

const toChange = (lang) => {
  language.value = lang;
  localStorage.setItem("language", lang);
  if (route.path == "/detail") {
    router.push({
      path: "/news",
    });
  } else {
    window.location.reload();
  }
};

onMounted(() => {
  language.value = localStorage.getItem("language") || "1";
});
</script>
<style scoped lang="less">
.transparent {
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.1) 100%
  );
  position: absolute;
  z-index: 99;
  transition: background 0.3s ease;
}

.white {
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  position: absolute;
  z-index: 99;
  transition: background 0.3s ease;
}

.action {
  font-weight: 400;
  font-size: 16px;
  color: #333333;
  text-align: right;
  padding: 22px 48px 22px 0px;
}

.active {
  font-weight: 600;
}

.menu-pop {
  position: relative;
  height: var(--doc-height);

  .line {
    width: 1px;
    height: 14px;
    background: #333333;
    margin: 0 10px;
  }
}

.bottom-language {
  display: flex;
  justify-content: flex-end;
  position: absolute;
  bottom: 25px;
  left: 0;
  right: 0;
  font-weight: 400;
  font-size: 14px;
  color: #333333;
  line-height: 20px;
  text-align: left;
  font-style: normal;
  padding-right: 48px;
}

.logo-image {
  margin-left: 24px;
  width: 46px;
}
</style>
