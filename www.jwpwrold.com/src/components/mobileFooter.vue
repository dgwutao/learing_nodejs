<template>
    <div class="bg">
        <div class="flex-between" style="padding: 24px;">
            <div class="margin-left16">
                <div class="footer-qustion-title anim">{{ language == '1' ? '在线沟通' : 'Chat Us' }}</div>
                <div class="content anim">
                    {{ language == '1' ? '工作时间: 周一周五,' : 'Online hours:Monday-Friday,' }}
                    <br> {{ language == '1' ? '上午9:00-下午6:00' : '9:00 AM to 6:00 PM CST' }}
                </div>
            </div>

            <div class="flex-center">
                <div class="qr-bg anim">
                    <img src="../assets/qr_code.png" />
                </div>

            </div>
        </div>
        <div style="padding:0 24px 24px;">
            <div class="footer-qustion-title anim">{{ language == '1' ? '联系我们' : 'Contact Us' }}</div>
            <div class="content anim">E-mail: info@ddsglobal.com</div>
            <div class="content margin-top6 anim">
                <div v-if="language == '1'">地址: 北京市朝阳区金和东路20号正大中心北塔43层</div>
                <div v-if="language == '2'">Add：43F, North Tower , CP Center, 20 JinheEastRoad, Chaoyang District,
                    Beijing, China</div>
            </div>
        </div>
        <div class="flex-center bottom">
            <div class="content-dds">Copyright © 2005 - 2025 DDS All Rights Reserved.</div>
        </div>
    </div>
</template>
<script setup>

const language = ref("");

onMounted(() => {
    language.value = localStorage.getItem("language") || "1";
});

</script>
<style scoped lang="less">
.logo {
    cursor: pointer;
    overflow: hidden;

    img {
        width: 120px;
        margin-left: 170px;
        margin-right: 100px;
    }
}

.bg {
    background: #F9FAFC;
}

.title {
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 18px;
    color: #333;
}

.content {
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #333;
    margin-top: 8px;
}

.bottom {
    background: linear-gradient(136deg, #3069B1 0%, #24ADCE 26%, #8AC13D 45%, #D2C328 60%, #F67259 100%);
    height: 22px;

    .content-dds {
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 14px;
        color: #FFFFFF;
        text-align: center;
        font-style: normal;
    }
}

.footer-qustion-title {
    font-size: 18px;
    color: #333;
    font-weight: 500;
}

.bottom-padding {
    padding: 16px 0;
    margin-right: 100px;
}

.margin-top6 {
    margin-top: 6px;
}

.qr-bg {
    padding: 4px;
    border-radius: 4px;
    background: #fff;

    img {
        width: 67px;
        height: 67px;
        display: block;
    }
}
</style>