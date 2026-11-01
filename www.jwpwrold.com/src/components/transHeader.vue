<template>
    <div class="transparent" :style="'background-color:' + (data.scrollY>80?'white;':'transparent;')">
        <div class="logo flex-center" @click="onActionClick(1)">
             <img v-if="data.scrollY<80" src="../assets/jwp_icon_logo_white.png"/>
             <img v-else src="../assets/jwp_icon_logo_blue.png"/>
        </div>
        <div style="margin-right: 100px;display: flex;align-items: center;justify-content: space-between;width: 100%;margin-left: 120px;max-width: 1200px;">
            <div class="action flex-center-col" @click="onActionClick(1)">
                <div class="active" :style="data.scrollY>80?'color:black;':'color:white;'">{{ fileStore.dict.menu_home }}</div>
            </div>
            <div>
                <el-dropdown>
                    <div class="action flex-center-col">
                        <div class="active" :style="data.scrollY>80?'color:black;':'color:white;'">{{ fileStore.dict.menu_global }}</div>
                    </div>
                    <template #dropdown>
                    <el-dropdown-menu style="box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.5);overflow: hidden;">
                        <el-dropdown-item v-for="item in data.countries" @click="toCountry(item.id,item.name,item.id)">
                            <div class="dropDownItem">{{ item.name }}</div>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
            
            <div class="action flex-center-col" @click="onActionClick(3)">
                <div class="active" :style="data.scrollY>80?'color:black;':'color:white;'">{{ fileStore.dict.menu_service }}</div>
                <!-- <div v-if="route.path == '/service' || route.path == '/service'" class="tab-line"></div>
                <div v-if="route.path != '/service' || route.path == '/service'" class="tab-hover-line"></div> -->
            </div>
            <!-- <div class="action flex-center-col" @click="onActionClick(4)">
                <div :class="route.path == '/news' ? 'active' : ''">资讯与分析报告</div>
                <div v-if="route.path == '/news'" class="tab-line"></div>
                <div v-if="route.path != '/news'" class="tab-hover-line"></div>
            </div> -->
            <div class="action flex-center-col" @click="onActionClick(5)">
                <div class="active" :style="data.scrollY>80?'color:black;':'color:white;'">{{ fileStore.dict.menu_about }}</div>
                <!-- <div v-if="route.path == '/about'" class="tab-line"></div>
                <div v-if="route.path != '/about'" class="tab-hover-line"></div> -->
            </div>
            <div>
                <el-dropdown>
                    <div class="action" style="display: flex;align-items: center;">
                        <img v-if="data.scrollY>80" src="../assets/jwp_icon_nav_earth.png" style="width:23px;height:23px;margin-right: 12px;"/>
                        <img v-else src="../assets/jwp_icon_nav_earth_white.png" style="width:23px;height:23px;margin-right: 12px;"/>
                        <div class="active" :style="data.scrollY>80?'color:black;':'color:white;'">{{data.language=='2'?fileStore.dict.menu_japan:data.language=='3'?fileStore.dict.menu_mongolia:fileStore.dict.menu_english}}</div>
                        <el-icon :style="(data.scrollY>80?'color: black;':'color: white;')+'margin-left: 10px;'"><ArrowDown /></el-icon>
                    </div>
                    <template #dropdown>
                    <el-dropdown-menu style="box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.5);overflow: hidden;">
                        <el-dropdown-item @click="toChange(1)">
                            <div style="display: flex;align-items: center;">
                                <div :class="data.language==1?'dropDownItemActive':'dropDownItem'">{{ fileStore.dict.menu_english }}</div>
                                <el-icon v-if="data.language==1" style="color: #002a61;"><Select /></el-icon>
                            </div>
                        </el-dropdown-item>
                        <el-dropdown-item @click="toChange(2)">
                            <div style="display: flex;align-items: center;">
                                <div :class="data.language==2?'dropDownItemActive':'dropDownItem'">{{ fileStore.dict.menu_japan }}</div>
                                <el-icon v-if="data.language==2" style="color: #002a61;"><Select /></el-icon>
                            </div>
                        </el-dropdown-item>
                        <el-dropdown-item @click="toChange(3)">
                            <div style="display: flex;align-items: center;">
                                <div :class="data.language==3?'dropDownItemActive':'dropDownItem'">{{ fileStore.dict.menu_mongolia }}</div>
                                <el-icon v-if="data.language==3" style="color: #002a61;"><Select /></el-icon>
                            </div>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router';
//import logowhite from '../assets/logo_white.png';
import { getDict, getCountry } from "@/api/base";
import { onMounted, reactive, ref } from "vue";
import { useFileStore } from "@/store/index.js";
const fileStore = useFileStore();
const route = useRoute();
const router = useRouter();
const isTop = ref(true);
const data = reactive({
    info:{},
    countries:[],
    scrollY:0,
    language:'1',
    lang:'English'
})

const toChange = (lang) => {
  data.language = lang;
  localStorage.setItem("language", lang);  
  window.location.reload();
};

const toCountry = (id,name,countryId) => {
    window.location = '/country?id='+id
    // router.push({ path: "/country", query: { id: id} })
};

const onActionClick = (index) => {
    switch (index) {
        case 1:
            router.push("/");
            break;
        case 2:
            router.push("/country")
            break;
        case 3:
            router.push("/service")
            break;
        case 4:
            router.push("/news")
            break;
        case 5:
            router.push("/about")
            break;
    }
};

onMounted(() => {
    let lang = localStorage.getItem("language"); 
    if (lang) {
        data.language = lang
        if (lang == '1') {
            data.lang = 'English'//fileStore.dict.menu_english
        }else if (lang == '2') {
            data.lang = '日本語'//fileStore.dict.menu_japan
        }else if (lang == '3') {
            data.lang = 'Монгол'//fileStore.dict.menu_mongolia
        }
    }
  getCountry().then(res=>{
    data.countries = res.data.list
  }).catch(e=>{
    console.log(e);
  })  

  window.addEventListener("scroll", ()=>{
    data.scrollY = window.scrollY
  });

//   getDict().then(res=>{
//     data.info = res.data
//   }).catch(e=>{
//     console.log(e);
//   })        
});
</script>
<style scoped lang="less">
.dropDownItem{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 18px;
    color: #666666;
    line-height: 25px;
    text-align: left;
    font-style: normal;
    width: 170px;
    padding: 10px;
}

.dropDownItemActive{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 18px;
    color: #002A61;
    line-height: 25px;
    text-align: left;
    font-style: normal;
    width: 170px;
    padding: 10px;
}

.transparent {
    transition:all 0.3s ease;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: transparent;
    z-index: 99;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    .action {
        // margin-left: 120px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 18px;
        color: #fff;
        cursor: pointer;
        transition: background 0.5s ease;
        justify-content: flex-start;
    }


    .tab-line {
        width: 24px;
        height: 2px;
        background-color: #FFF;
        margin-top: 9px;
    }

    .active {
        white-space: nowrap;
        flex-shrink: 0;
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 18px;
        color: #FFFFFF;
        line-height: 25px;
        text-align: left;
        font-style: normal;
    }

    .tab-hover-line {
        width: 0px;
        height: 2px;
        background-color: #FFF;
        margin-top: 9px;
    }

    .action:focus-visible {
            outline: unset;
    }

    .action2:focus-visible {
        outline: unset;
    }
}

.logo {
    margin-left: 82px;
    cursor: pointer;

    img {
        width: 150px;
        // height: 50px;
    }
}

@media (max-width: 1900px) {
    .logo {
        margin-left: 82px;
        cursor: pointer;

        img {
            width: 150px*0.7;
            // height: 50px*0.7;
        }
    }

    .dropDownItem{
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 16px;
            color: #666666;
            line-height: 25px*0.7;
            text-align: left;
            font-style: normal;
            width: 170px*0.7;
            padding: 10px*0.7;
        }

        .dropDownItemActive{
            font-family: PingFangSC, PingFang SC;
            font-weight: 500;
            font-size: 16px;
            color: #002A61;
            line-height: 25px*0.7;
            text-align: left;
            font-style: normal;
            width: 170px*0.7;
            padding: 10px*0.7;
        }

    .transparent {
        transition:all 0.3s ease;
        height: 80px*0.7;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: transparent;
        z-index: 99;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;

        .action {
            // margin-left: 120px;
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 16px;
            color: #fff;
            cursor: pointer;
            transition: background 0.5s ease;
            justify-content: flex-start;
        }

        .tab-line {
            width: 24px;
            height: 2px;
            background-color: #FFF;
            margin-top: 9px;
        }

        .active {
            white-space: nowrap;
            flex-shrink: 0;
            font-family: PingFangSC, PingFang SC;
            font-weight: 500;
            font-size: 16px;
            color: #FFFFFF;
            // line-height: 25px*0.7;
            text-align: left;
            font-style: normal;
        }

        .tab-hover-line {
            width: 0px;
            height: 2px;
            background-color: #FFF;
            margin-top: 9px;
        }

        .action:focus-visible {
            outline: unset;
        }

        .action2:focus-visible {
            outline: unset;
        }
    }

}
</style>