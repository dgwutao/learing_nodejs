import { createApp } from "vue";
import App from "./App.vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import router from "./router";
import { Popup, Swipe, SwipeItem,Sticky } from "vant";
import { createPinia } from "pinia";
const app = createApp(App);
app.use(router);
app.use(Popup);
app.use(Swipe);
app.use(SwipeItem);
app.use(Sticky);
app.use(ElementPlus, {
  locale: zhCn,
});
app.use(createPinia());
import "./style.css";

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount("#app");
