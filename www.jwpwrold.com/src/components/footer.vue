<template>
    <div :style="'background-image: url('+ data.bg_pic +');background-repeat: no-repeat;background-size: cover;background-color: #0E1A2F;height:auto;'">
        <div style="display: flex;align-items: center;justify-content:space-evenly;padding: 50px 0;">
            <div>
                <div style="">
                    <div class="logo animated">
                    <img src="../assets/jwp_icon_logo_white.png"/>
                    </div>
                    <!-- <div class="jwpGroup animated">JWP Group</div> -->
                    <div v-if="data.socialLinks.list.length>0" class="flex-center socialIconContainer animated">
                        <img @click="openSocialLink(item.link_url)" v-for="(item,index) in data.socialLinks.list" :src="item.pic" class="linkUrl"/>
                    </div>
                </div>
            </div>
            
            <!-- <div style="display: flex;align-items: flex-start;"> -->
                <div>
                    <div class="q-title animated" style="margin-top: -6px;">
                        {{ fileStore.dict.common_links }}
                    </div>
                    <div class="q-subtitle animated" @click="onActionClick(1)">
                        {{ fileStore.dict.menu_home }}
                    </div>
                    <!-- <div class="q-subtitle" @click="onActionClick(2)">
                        {{ fileStore.dict.menu_global }}
                    </div> -->
                    <div class="q-subtitle animated" @click="onActionClick(3)">
                        {{ fileStore.dict.menu_service }}
                    </div>
                    <div class="q-subtitle animated" @click="onActionClick(4)">
                        {{ fileStore.dict.menu_about }}
                    </div>
                    <!-- <div class="q-subtitle animated" @click="onActionClick(4)">
                        {{ fileStore.dict.menu_about }}
                    </div> -->
                </div>

                <div style="width: fit-content;">
                    <div class="q-title animated">
                        {{ fileStore.dict.common_projects }}
                    </div>
                    <div class="countryContainer">
                        <div v-for="item in data.countries.list" class="q-subtitle3 animated" @click="toCountry(item.id,item.name,item.id)">{{ item.name }}</div>
                    </div>
                </div>

                <!-- <div>
                    <div class="q-title animated">
                        {{ fileStore.dict.common_contact_us }}
                    </div>
                    <div class="q-subtitle2 flex-left-center animated">
                        <el-icon style="color: white;margin-right: 10px;"><LocationFilled /></el-icon>
                        <div>
                            {{ fileStore.dict.common_address }}
                        </div>
                    </div>
                    <div class="q-subtitle2 flex-left-center animated">
                        <el-icon style="color: white;margin-right: 10px;"><PhoneFilled /></el-icon>
                        <div>
                            {{ fileStore.dict.common_tel }}
                        </div>
                    </div>
                    <div class="q-subtitle2 flex-left-center animated">
                        <img src="../assets/jwp_icon_email.png" style="width:14px;height: 9px;margin-right: 10px;"/>
                        <div>
                            {{ fileStore.dict.common_email }}
                        </div>
                    </div>
                </div> -->
            <!-- </div> -->
        </div>
        <div class="flex-center bottom">
            <div class="content">{{ fileStore.dict.common_bottom_text }}</div>
        </div>
    </div>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router';
import logo from '../assets/logo_text.png';
import logo_en from "../assets/logo_text_en.png";
import { getDict, getCountry,getAdList } from "@/api/base";
import { onMounted, reactive, ref } from "vue";
import { useFileStore } from "@/store/index.js";
const fileStore = useFileStore();
const props = defineProps({
    bg_pic: {
        type: String,
        default: 'https://dream-visas.oss-ap-southeast-1.aliyuncs.com/images/jwp_bg_bottom.jpg'
    }
});

watch(() => props.bg_pic, (newVal) => {
    if (newVal&&newVal.length > 0) {
        data.bg_pic = newVal
    }else{
        data.bg_pic = 'https://dream-visas.oss-ap-southeast-1.aliyuncs.com/images/jwp_bg_bottom.jpg'
    }
});

const route = useRoute();
const router = useRouter();
const language = ref("");
const data = reactive({
    countries:{},
    socialLinks:{
        list:[]
    },
    bg_pic:'https://dream-visas.oss-ap-southeast-1.aliyuncs.com/images/jwp_bg_bottom.jpg'
})

const openSocialLink = (link)=>{
    window.open(link)
}

const toCountry = (id,name,countryId) => {
    router.push({ path: "/country", query: { id: id} })
};

const onActionClick = (index) => {
    switch (index) {
        case 1:
            router.push("/");
            break;
        case 2:
            router.push("/service")
            break;
        case 3:
            router.push("/service")
            break;
        case 4:
            router.push("/about")
            break;
        case 5:
            router.push("/news")
            break;
        case 6:
            router.push("/about")
            break;
    }
}

onMounted(() => {
    language.value = localStorage.getItem("language") || "1";
    getCountry().then(res=>{
        data.countries = res.data

        setTimeout(() => {
            const animatedItems = document.querySelectorAll('.animated');
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animate');
                        }
                    });
                }, {
                    threshold: 0.02
                });
                animatedItems.forEach(item => {
                    observer.observe(item);
                });
        }, 300);
    }).catch(e=>{
        console.log(e);
    })  

    getAdList(34).then(res=>{
        data.socialLinks = res.data
    }).catch(e=>{
        console.log(e);
    })  
});
</script>
<style scoped lang="less">


.infoContainer{
    // width: 33%;
}

.q-title{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 22px;
    color: #B9BDD0;
    line-height: 30px;
    text-align: left;
    font-style: normal;
    margin-bottom: 30px;
}

.q-subtitle{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 16px;
    color: #B9BDD0;
    line-height: 22px;
    text-align: left;
    font-style: normal;
    margin-bottom: 20px;
    word-wrap: break-word;
    cursor: pointer;
}

.q-subtitle2 {
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 16px;
    color: #B9BDD0;
    line-height: 22px;
    text-align: left;
    font-style: normal;
    margin-bottom: 20px;
    word-wrap: break-word;
}

.q-subtitle3{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 16px;
    color: #B9BDD0;
    line-height: 22px;
    text-align: left;
    font-style: normal;
    word-wrap: break-word;
    cursor: pointer;
}

.socialIconContainer{
    // margin-left: 170px;
    margin-top: 40px;
}

.socialIcon{
    display: block;
    width:30px;
    height: auto;
    min-height: 30px;
    object-fit: cover;
    background-color: red;
    margin-right: 10px;
}

.logo {
    cursor: pointer;
    overflow: hidden;

    img {
        width: 250px;
    }
}

.bg_thailand {
    // padding-top: 50px;
    background-image: url(../assets/jwp_bg_bottom_thailand.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #0E1A2F;
}

.bg {
    // padding-top: 50px;
    background-image: url(../assets/jwp_bg_bottom.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #0E1A2F;
}

.topbar {
    height: 60px;
    background-color: #fff;
    margin-right: 40px;
}

.line {
    height: 1.2px;
    background: #E2E2E2;
}

.tab-line {
    width: 20px;
    height: 1.2px;
    background: #333;
}

.title {
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 16px;
    color: #333;
}

.content {
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #333;
    margin-top: 5px;
}

.action span:hover {
    transform: scale(1.2);
    transition: all 0.5s ease;
}

.action {
    height: 60px;
    margin-right: 80px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 14px;
    color: #333;
    cursor: pointer;
    transition: background 0.5s ease;
    justify-content: center;
    align-items: center;
}

.bottom {
    background: #0E1A2F;
    // height: 42px;
    padding: 10px;

    .content {
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 14px;
        color: #B9BDD0;
        line-height: 20px;
        text-align: left;
        font-style: normal;
    }
}

.footer-qustion-title {
    font-size: 16px;
    color: #333;
    font-weight: 500;
}

.bottom-padding {
    padding: 16px 0;
    margin-right: 100px;
}

.margin-right16 {
    margin-right: 16px;
}

.margin-left16 {
    margin-left: 16px;
}

.margin-top6 {
    margin-top: 6px;
}

.qr-bg {
    padding: 4px;
    border-radius: 4px;
    background: #fff;

    img {
        width: 42px;
        height: 42px;
        display: block;
    }
}

.jwpGroup{
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 18px;
    color: #B9BDD0;
    line-height: 25px;
    text-align: left;
    font-style: normal;
    text-transform: uppercase;
    margin-top: 10px;
}

.linkUrl{
    width:30px;
    height: 30px;
    margin-right: 10px;
    cursor: pointer;
    object-fit: cover;
}

.countryContainer{
    display: grid;
    grid-template-columns: repeat(2,1fr); 
    row-gap: 20px;
    column-gap: 50px;
}

@media (max-width: 1900px) {
.countryContainer{
    display: grid;
    grid-template-columns: repeat(2,1fr); 
    row-gap: 20px*0.7;
    column-gap: 50px*0.7;
}
.jwpGroup{
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 16px;
    color: #B9BDD0;
    line-height: 25px*0.7;
    text-align: left;
    font-style: normal;
    text-transform: uppercase;
    margin-top: 10px*0.7;
}

.linkUrl{
    width:30px*0.7;
    height: 30px*0.7;
    margin-right: 10px*0.7;
    cursor: pointer;
    object-fit: cover;
}

.q-title{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 16px;
    color: #B9BDD0;
    line-height: 30px*0.7;
    text-align: left;
    font-style: normal;
    margin-bottom: 30px*0.7;
}

.q-subtitle{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 16px;
    color: #B9BDD0;
    line-height: 22px*0.7;
    text-align: left;
    font-style: normal;
    margin-bottom: 20px*0.7;
    word-wrap: break-word;
    cursor: pointer;
}

.q-subtitle2 {
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 16px;
    color: #B9BDD0;
    line-height: 22px*0.7;
    text-align: left;
    font-style: normal;
    margin-bottom: 20px*0.7;
    word-wrap: break-word;
}

.q-subtitle3{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 16px;
    color: #B9BDD0;
    line-height: 22px*0.7;
    text-align: left;
    font-style: normal;
    word-wrap: break-word;
    cursor: pointer;
}

.socialIconContainer{
    // margin-left: 170px;
    margin-top: 40px*0.7;
}

.socialIcon{
    display: block;
    width:30px*0.7;
    height: auto;
    min-height: 30px*0.7;
    object-fit: cover;
    background-color: red;
    margin-right: 10px*0.7;
}

.logo {
    cursor: pointer;
    overflow: hidden;

    img {
        width: 250px*0.7;
    }
}

.content {
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: #333;
    margin-top: 5px;
}

}

.animated {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
          }
        
        .animate {
            opacity: 1;
            transform: translateY(0);
        }
</style>