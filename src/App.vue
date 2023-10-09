<script setup lang="ts">
import { onMounted, ref } from 'vue'

const motionConfigByVisible = () => {
  return {
    before: {
      opacity: 0,
      transform: 'translateX(50px)',
    },
    after: {
      opacity: 1,
      transform: 'translateX(0)',
    },
    visible: {
      once: false,
    },
  }
}

const motionConfig = (delay: number) => {
  return {
    before: {
      opacity: 0,
      transform: 'translateX(50px)',
    },
    after: {
      opacity: 1,
      transform: 'translateX(0)',
    },
    delay,
  }
}

const count = ref(0)
onMounted(() => {
  count.value = 30
  setTimeout(() => {
    count.value += 20
  }, 3000)
})
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>

  <div class="flex gap-[100px] mt-[50px]">
    <div class="flex flex-col gap-[10px]">
      <div class="bg-dark-700 bg-opacity-50 w-[200px] py-[5px] rounded-md" v-motion="motionConfig(0)">
        <span>🌻</span>
        <span class="ml-[10px]">Item - 1</span>
      </div>
      <div class="bg-dark-700 bg-opacity-50 w-[200px] py-[5px] rounded-md" v-motion="motionConfig(100)">
        <span>🌻</span>
        <span class="ml-[10px]">Item - 2</span>
      </div>
      <div class="bg-dark-700 bg-opacity-50 w-[200px] py-[5px] rounded-md" v-motion="motionConfig(200)">
        <span>🌻</span>
        <span class="ml-[10px]">Item - 3</span>
      </div>
      <div class="bg-dark-700 bg-opacity-50 w-[200px] py-[5px] rounded-md" v-motion="motionConfig(300)">
        <span>🌻</span>
        <span class="ml-[10px]">Item - 4</span>
      </div>
      <div class="bg-dark-700 bg-opacity-50 w-[200px] py-[5px] rounded-md" v-motion="motionConfig(400)">
        <span>🌻</span>
        <span class="ml-[10px]">Item - 5</span>
      </div>
    </div>

    <div class="flex flex-col items-center gap-[5px]">
      <div class="bg-dark-700 bg-opacity-50 w-[200px] py-[5px] rounded-md" v-for="index of count" v-motion="motionConfigByVisible()">
        <span>🌴</span>
        <span class="ml-[10px]">{{ `Item - ${index}` }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
