<template>
    <mobile v-if="type == 1"></mobile>
    <pc v-if="type == 2"></pc>
</template>
<script setup>
import mobile from "./mobile/about";
import pc from "./pc/about";

onMounted(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    let mobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    // type.value = mobile ? 1 : 2;
    type.value = 2;

});

const type = ref(0);
</script>
<style scoped lang="less"></style>