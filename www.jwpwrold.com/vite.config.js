import vue from "@vitejs/plugin-vue";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import {
  ElementPlusResolver,
  VantResolver,
} from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";

export default {
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "vue-router"],
      resolvers: [
        // ElementPlusResolver
        VantResolver(),
      ],
    }),
    Components({
      resolvers: [ElementPlusResolver(), VantResolver()],
    }),
  ],
  css: {
    postcss: {
      plugins: [
        // postcsspxtoviewport({
        //   unitToConvert: "px", // 要转化的单位
        //   viewportWidth: 1920, // UI设计稿的宽度
        //   unitPrecision: 6, // 转换后的精度，即小数点位数
        //   propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
        //   viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
        //   fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
        //   selectorBlackList: ["ignore-"], // 指定不转换为视窗单位的类名，
        //   minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
        //   mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
        //   replace: true, // 是否转换后直接更换属性值
        //   exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
        //   landscape: false, // 是否处理横屏情况
        // }),
      ],
    },
  },
  resolve: {
    // 配置路径别名
    alias: {
      "@": path.resolve(__dirname, "./src"),
      wplayer: path.resolve(__dirname, "./packages/wplayer"),
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
  optimizeDeps: {
    include: ["vod-js-sdk-v6"],
  },

  server: {
    port: 5001, //vite项目启动时自定义端口
    open: true,
    proxy: {
      "/api": {
        target: "http://api.ddsglobal.com", // process.env.VUE_APP_BASE_API, //代理接口
        changeOrigin: true,
        ws: true,
        secure: true,
      },
    },
  },
};
