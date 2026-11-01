<template>
    <div>
        <div style="width: 100%;height: 100vh;display: flex;align-items: center;justify-content: flex-start;background-color: #0b1121;position: relative;">
            <img v-if="data.banner.pic" :src="data.banner.pic" style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;object-fit: cover;display: block;"/>
            <div class="animated bannerTitleClass" v-html="data.banner.title"></div>
            <div style="background: linear-gradient( 180deg, rgba(21,63,109,0) 0%, #11264B 69%, #11264B 100%);width: 100%;aspect-ratio: 7.3;position: absolute;left: 0;bottom: 0;"></div>
        </div>
        <div class="sectionBG padding0" style="background-color: #11264B;color: white;">
            <div class="animated" style="display: flex;align-items: center;justify-content: space-between;">
                <div class="companyTitleClass">{{ fileStore.dict.about_company_title }}</div>
                <div class="companyIntroClass" v-html="fileStore.dict.about_company_intro"></div>
            </div>
            <div class="marginTop350" style="display: flex;align-items: flex-start;justify-content: space-between;">
                <div style="flex-shrink: 0;width: 35%;margin-right: 100px;position: sticky;top: 100px;left: 0;">
                    <div class="animated officeTitleClass" v-html="fileStore.dict.about_office_title"></div>

                    <div class="animated officeSubtitleClass" v-html="fileStore.dict.about_office_sub_title"></div>

                    <div class="animated" style="display: flex;align-items: center;background-color: white;padding: 15px 30px;border-radius: 30px;width: fit-content;">
                        <div class="officeButtonClass">{{ fileStore.dict.about_office_button }}</div>
                        <img src="../../assets/jwp_arrow_about_right.png" class="arrowAboutClass"/>
                    </div>
                </div>
                <div style="display: flex;align-items: center;flex-wrap: wrap;justify-content: space-between;flex: 1;">
                    <div v-for="(item,index) in data.office.list" class="imgContainer">
                        <div class="animated">
                            <img :src="item.pic" style="width: 100%;height: 100%;object-fit: cover;display: block;border-radius: 20px;"/>
                            <div class="itemTitleClass">{{ item.title }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="paddingBottom100" style="background-color: #11264B;">
                <div class="padding100300" style="background-color: white;border-radius: 30px;display: flex;align-items: center;justify-content: center;flex-direction: column;">
                <div class="animated">
                    <div class="contactTitleClass">{{ fileStore.dict.about_contact_title }}</div>
                    <div class="contactSubtitleClass">{{ fileStore.dict.about_contact_sub_title }}</div>
                </div>
                <div class="animated" style="display: flex;align-items: center;justify-content: space-between;margin-top: 30px;width: 100%;">
                    <div style="width: 49%;">
                        <div class="contactNameClass">{{ fileStore.dict.about_contact_name }}</div>
                        <div class="form-control" style="background-color: #edeef1;padding: 12px 20px;border-radius: 23px;margin-top: 5px;">
                            <input required v-model="data.name" :placeholder="fileStore.dict.about_contact_input_name" class="inputNameClass"/>
                        </div>
                    </div>
                    <div style="width: 49%;">
                        <div class="contactNameClass">{{ fileStore.dict.about_contact_phone }}</div>
                        <div class="form-control" style="background-color: #edeef1;padding: 12px 20px;border-radius: 23px;margin-top: 5px;">
                            <input required v-model="data.phone" :placeholder="fileStore.dict.about_contact_input_phone	" class="inputNameClass"/>
                        </div>
                    </div>
                </div>
                <div class="animated" style="margin-top: 30px;width: 100%;">
                        <div class="contactNameClass">{{ fileStore.dict.about_contact_email }}</div>
                        <div class="form-control" style="background-color: #edeef1;padding: 12px 20px;border-radius: 23px;margin-top: 5px;">
                            <input required v-model="data.email" :placeholder="fileStore.dict.about_contact_input_email	" class="inputNameClass"/>
                        </div>
                </div>
                <div class="animated" style="margin-top: 30px;width: 100%;">
                        <div class="contactNameClass">{{ fileStore.dict.about_contact_message }}</div>
                        <div class="form-control" style="background-color: #edeef1;padding: 12px 20px;border-radius: 23px;margin-top: 5px;height: 100px;">
                            <textarea required v-model="data.message" :placeholder="fileStore.dict.about_contact_input_message" class="textareaClass"></textarea>
                        </div>
                </div>
                <div @click="sendMessage" class="sendBtn animated">{{ fileStore.dict.about_contact_submit }}</div>
        </div>
        </div>
        
        <div>
            <Footer></Footer>
        </div>
    </div>
</template>

<script setup>
import { getAd, getAdList, getAdOne, addMessage } from '@/api/base.js';
import Footer from '@/components/footer.vue';
import { formartStr } from '@/utils/util.js';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { nextTick, onMounted } from 'vue';
import { getDict } from "@/api/base";
import { ElMessage } from 'element-plus'
import { useFileStore } from "@/store/index.js";
const fileStore = useFileStore();

// gsap.registerPlugin(ScrollTrigger);
// ScrollTrigger.defaults({
//     toggleActions: "play",
//     scroller: ".container"
// });

const state = reactive({
    banner: [],
    map: {}
});
const data = reactive({
    info:{},
    banner:{},
    office:{},
    name:'',
    phone:'',
    email:'',
    message:''
})

const sendMessage = ()=>{
    if (data.phone.length == 0 && data.email.length == 0) {
        ElMessage.error(fileStore.dict.about_message_null)
        return
    }
       addMessage({
        name:data.name,
        phone:data.phone,
        email:data.email,
        message:data.message
       }).then(res=>{
            ElMessage({
                message: fileStore.dict.about_message_success,
                type: 'success',
            })
        }).catch(e=>{
            console.log(e);
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

const init = async () => {
    let res = await getAdList('16')
    state.banner = res.data.list;

    let res1 = await getAd('17')
    state.map = res1.data;

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

    //关于我们-banner
    getAdOne(30).then(res=>{
        data.banner = res.data
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

    //关于我们-办公室
    getAdList(33).then(res=>{
        data.office = res.data
    }).catch(e=>{
        console.log(e);
    })  
    
    // getDict().then(res=>{
    //     fileStore.dict = res.data
    // }).catch(e=>{
    //     console.log(e);
    // })  
});
</script>

<style lang="less" scoped>
.animated {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
          }
        
        .animate {
            opacity: 1;
            transform: translateY(0);
        }




.imgContainer{
    width: 48%;
    border-radius: 20px;
    aspect-ratio: 1.4;
    margin-bottom: 4%;
    overflow: hidden;
}

.imgContainer img{
   transition: all 0.8s ease;
}

.imgContainer:hover img {
  transition: all 0.8s ease;          
  transform: scale(1.05);
}

.form-control:focus {
            outline: none;
            border: 1px solid rgba(255, 126, 95, 0.5);
            box-shadow: 0 0 15px rgba(255, 126, 95, 0.2);
        }

.sectionBG{
    background-position: top;
    background-repeat:no-repeat;
    background-size:contain;
    background-image: url(../../assets/jwp_bg_about_section.png);
}

.container {
    height: calc(100vh - 78px);
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
}

.banner {
    width: 100%;
    height: calc(100vh - 78px);
    scroll-snap-align: start;
    background: url('') no-repeat center center;
    background-size: cover;
    position: relative;

    .title {
        font-family: PingFangSC, PingFang SC;
        font-weight: 600;
        font-size: 44px;
        color: #fff;
        margin-bottom: 26px;
        margin-left: 100px;
    }

    .sub-title {
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24px;
        color: #fff;
        line-height: 42px;
        margin-right: 100px;
        margin-left: 100px;
        max-width: 52%;
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

.bannerTitleClass{
    font-size: 80px;
    color:white;
    font-weight: bold;
    margin-left: 100px;
    z-index: 9;
}

.companyTitleClass {
    font-size: 48px;
    font-weight: bold;
    flex-shrink: 0;
    width: 35%;
    margin-right: 100px;
}

.companyIntroClass{
    font-weight: 400;
    font-size: 20px;
    color: #FFFFFF;
    line-height: 30px;
    text-align: right;
    font-style: normal;
    opacity: 60%;
}

.officeTitleClass {
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 48px;
    color: #FFFFFF;
    line-height: 52px;
    text-align: left;
    font-style: normal;
}

.officeSubtitleClass {
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 20px;
    color: #FFFFFF;
    line-height: 30px;
    text-align: left;
    font-style: normal;
    margin-top: 30px;
    margin-bottom: 50px;
    opacity: 60%;
}

.officeButtonClass{
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 22px;
    color: #11264B;
    line-height: 27px;
    text-align: left;
    font-style: normal;
}

.arrowAboutClass{
    width: 36px;
    height: 18px;
    margin-left: 70px;
}

.itemTitleClass{
    position: absolute;
    bottom: 36px;
    width: 100%;
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 30px;
    color: #FFFFFF;
    line-height: 27px;
    text-align: left;
    font-style: normal;
    text-align: center;
}

.contactTitleClass{
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 48px;
    color: #000000;
    line-height: 52px;
    font-style: normal;
    width: 100%;
    text-align: center;
}

.contactSubtitleClass{
    width: 100%;
    text-align: center;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 20px;
    color: #000000;
    line-height: 28px;
    font-style: normal;
    opacity: 0.6;
    margin-top: 12px;
}

.contactNameClass{
    font-size: 16px;
    color: black;
    opacity: 0.6;
}

.inputNameClass{
    border: 0;
    background-color: #edeef1;
    font-size: 18px;
    color: black;
}

.sendBtn {
    transition: all 0.8s ease;
    padding: 15px 70px;
    background-color: #0E1A2F;
    text-align: center;
    color: white;
    margin-top: 30px;
    border-radius: 33px;
    cursor: pointer;
    font-size: 22px;
    width: fit-content;
}

.sendBtn:hover {
    box-shadow: 0 15px 40px rgba(0,0,0,0.15);
    transform: scale(1.05);
}

.textareaClass{
    border: 0;
    background-color: #edeef1;
    width: 100%;
    height: 100%;
    resize: none;
    font-size: 18px;
    color: black;
}

.padding0{
    padding:0 100px 100px 100px;
}

.paddingBottom100{
    padding-bottom: 100px;
}

.padding100300{
    padding: 100px 300px;
}

.marginTop350{
    margin-top: 350px;
}

@media (max-width: 1900px) {

.paddingBottom100{
    padding-bottom: 100px*0.7;
}

.padding100300{
    padding: 100px*0.7 300px*0.7;
}

.padding0{
    padding:0 100px*0.7 100px*0.7 100px*0.7;
}

.bannerTitleClass{
    font-size: 80px*0.7;
    color:white;
    font-weight: bold;
    margin-left: 100px;
    z-index: 9;
}

.companyTitleClass {
    font-size: 48px*0.7;
    font-weight: bold;
    flex-shrink: 0;
    width: 35%;
    margin-right: 100px;
}

.companyIntroClass{
    font-weight: 400;
    font-size: 20px;
    color: #FFFFFF;
    line-height: 30px;
    text-align: right;
    font-style: normal;
    opacity: 60%;
}

.officeTitleClass {
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 48px*0.7;
    color: #FFFFFF;
    line-height: 52px*0.7;
    text-align: left;
    font-style: normal;
}

.officeSubtitleClass {
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 20px;
    color: #FFFFFF;
    line-height: 30px;
    text-align: left;
    font-style: normal;
    margin-top: 30px*0.7;
    margin-bottom: 50px*0.7;
    opacity: 60%;
}

.officeButtonClass{
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 16px;
    color: #11264B;
    line-height: 27px*0.7;
    text-align: left;
    font-style: normal;
}

.arrowAboutClass{
    width: 36px*0.7;
    height: 18px*0.7;
    margin-left: 70px*0.7;
}

.itemTitleClass{
    position: absolute;
    bottom: 36px*0.7;
    width: 100%;
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 30px*0.7;
    color: #FFFFFF;
    line-height: 27px*0.7;
    text-align: left;
    font-style: normal;
    text-align: center;
}

.contactTitleClass{
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 48px*0.7;
    color: #000000;
    line-height: 52px*0.7;
    font-style: normal;
    width: 100%;
    text-align: center;
}

.contactSubtitleClass{
    width: 100%;
    text-align: center;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: #000000;
    line-height: 28px*0.7;
    font-style: normal;
    opacity: 0.6;
    margin-top: 12px;
}

.contactNameClass{
    font-size: 16px;
    color: black;
    opacity: 0.6;
}

.inputNameClass{
    border: 0;
    background-color: #edeef1;
    font-size: 16px;
    color: black;
}

.sendBtn {
    transition: all 0.8s ease;
    padding: 15px*0.7 70px*0.7;
    background-color: #0E1A2F;
    text-align: center;
    color: white;
    margin-top: 30px*0.7;
    border-radius: 33px*0.7;
    cursor: pointer;
    font-size: 16px;
    width: fit-content;
}

.sendBtn:hover {
    box-shadow: 0 15px 40px rgba(0,0,0,0.15);
    transform: scale(1.05);
}

.textareaClass{
    border: 0;
    background-color: #edeef1;
    width: 100%;
    height: 100%;
    resize: none;
    font-size: 16px;
    color: black;
}
}
</style>