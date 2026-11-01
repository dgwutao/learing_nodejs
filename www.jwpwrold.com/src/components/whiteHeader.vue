<template>
  <div class="bg">
    <div class="logo flex-center" @click="onActionClick(1)">
      <img :src="language == '1' ? logo : logo_en" />

    </div>
    <div class="flex">
      <div class="action flex-center-col" @click="onActionClick(1)">
        <div :class="route.path == '/' ? 'active' : ''">{{ language == '1' ? '首页' : 'Home' }}</div>
        <div v-if="route.path == '/'" class="tab-line"></div>
        <div v-if="route.path != '/'" class="tab-hover-line"></div>
      </div>
      <div class="action flex-center-col" @click="onActionClick(2)">
        <div :class="route.path == '/service' ? 'active' : ''">{{ language == '1' ? '核心服务' : 'Services' }}</div>
        <div v-if="route.path == '/service'" class="tab-line"></div>
        <div v-if="route.path != '/service'" class="tab-hover-line"></div>
      </div>
      <div class="action flex-center-col" @click="onActionClick(3)">
        <div :class="route.path == '/project' ? 'active' : ''">{{ language == '1' ? '项目经验' : 'Key Projects' }}</div>
        <div v-if="route.path == '/project'" class="tab-line"></div>
        <div v-if="route.path != '/project'" class="tab-hover-line"></div>
      </div>
      <div class="action flex-center-col" @click="onActionClick(4)">
        <div :class="route.path == '/club' ? 'active' : ''">{{ language == '1' ? 'DDS使命' : 'Mission' }}</div>
        <div v-if="route.path == '/club'" class="tab-line"></div>
        <div v-if="route.path != '/club'" class="tab-hover-line"></div>
      </div>
      <div class="action flex-center-col" @click="onActionClick(5)">
        <div :class="route.path == '/news' ? 'active' : ''">{{ language == '1' ? '资讯与分析报告' : 'Reports' }}</div>
        <div v-if="route.path == '/news'" class="tab-line"></div>
        <div v-if="route.path != '/news'" class="tab-hover-line"></div>
      </div>
      <div class="action flex-center-col" @click="onActionClick(6)">
        <div :class="route.path == '/about' ? 'active' : ''">{{ language == '1' ? '关于我们' : 'About us' }}</div>
        <div v-if="route.path == '/about'" class="tab-line"></div>
        <div v-if="route.path != '/about'" class="tab-hover-line"></div>
      </div>
    </div>
    <div class="language">
      <el-dropdown v-if="true" trigger="click">
        <div class="flex-between languagetext ">
          <div>{{ language == '2' ? 'English(EN)' : '简体中文(CN)' }}</div>
          <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="toChange('2')">English(EN)</el-dropdown-item>
            <el-dropdown-item @click="toChange('1')">简体中文(CN)</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup>
import { useRoute, useRouter } from "vue-router";
import logo from "../assets/logo_text.png";
import logo_en from "../assets/logo_text_en.png";

const router = useRouter();
const route = useRoute();
const language = ref(""); // 语言 cn中文 en英文

const onActionClick = (index) => {
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
  window.location.reload();
};

onMounted(() => {
  language.value = localStorage.getItem("language") || "1";
});
</script>
<style scoped lang="less">
.bg {
  height: 77px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  z-index: 99;
  position: sticky;
  top: 0;
  transition: background 0.5s ease;
  border-bottom: #dfdfdf 1.2px solid;

  .action {
    margin-left: 100px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: #333333;
    cursor: pointer;
    transition: background 0.5s ease;
    white-space: nowrap;
    /* 可以添加溢出处理，如省略号 */
    overflow: hidden;
  }

  .languagetext {
    font-size: 16px;
    color: #333;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    line-height: 24px;
  }

  .flex {
    flex: 1;
  }

  .tab-line {
    width: 24px;
    height: 2px;
    background-color: #0b162b;
    margin-top: 2px;
  }

  .active {
    font-weight: 600;
    color: #0b162b;
  }

  .tab-hover-line {
    width: 0px;
    height: 2px;
    background-color: #0b162b;
    margin-top: 2px;
  }

  .action:hover {
    .tab-hover-line {
      width: 24px;
      transition: all 0.5s ease;
    }
  }

  .language {
    width: 125px;
    display: flex;
    padding-right: 80px;
    margin-top: -5px;
    cursor: pointer;
  }
}

.logo {
  margin-left: 82px;
  cursor: pointer;
  width: 78px;

  img {
    width: 78px;
  }
}
</style>