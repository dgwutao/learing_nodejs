<template>
    <div v-if="type == 1">
        <MobileHeader v-if="!route.path.includes('/news')&&!route.path==''" :showBarColor="showBarColor()"></MobileHeader>
        <router-view />
    </div>

    <div v-if="type == 2" class="floor-content">
        <transHeader></transHeader>
        <router-view />
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import MobileHeader from '../components/mobileHeader.vue';
import whiteHeader from '../components/whiteHeader.vue';
import transHeader from '../components/transHeader.vue';
import { getDict } from "@/api/base";
import { useFileStore } from "@/store/index.js";
const fileStore = useFileStore();
const route = useRoute();

const type = ref(0);

const showBarColor = () => {
    const path = route.path;
    if (path.includes('/detail')) {
        return 'white'
    } else {
        return 'transparent'
    }
}

onMounted(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    let mobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    // type.value = mobile ? 1 : 2;
    type.value = 2;
    getDict().then(res=>{
        fileStore.setDict(res.data);
    }).catch(e=>{
        console.log(e);
    }) 
});

</script>
<style scoped lang="less"></style>