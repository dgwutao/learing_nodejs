<template>
  <router-view></router-view>
</template>
<script setup>
import { onMounted } from 'vue'

const documentHeight = () => {
  const doc = document.documentElement
  doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
}
onMounted(() => {
  window.addEventListener('resize', documentHeight)
  documentHeight()
})

</script>
<style>
.flex {
  display: flex;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-left-center {
  display: flex;
  justify-content: left;
  align-items: center;
}

.flex-center-col {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.floor-content {
  /* min-width: 100vw; */
}

@media screen {
  
}

@keyframes moveUpDown {
  0% {
    transform: translate(-50%, 0);
  }

  50% {
    transform: translate(-50%, 30px);
  }

  100% {
    transform: translate(-50%, 0);
  }
}
</style>
