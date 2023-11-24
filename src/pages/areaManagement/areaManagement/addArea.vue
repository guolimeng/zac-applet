<!--
 * @作者: 郭莉猛
 * @Date: 2023-11-06 17:30:04
 * @FilePath: /uni-preset-vue-vite-ts 2/src/pages/areaManagement/areaManagement/addArea.vue
 * @描述: 新增片区
 * 
-->
<template>
  <tabs 
    v-if="orgId"
    :tabsData="data.tabsData"
    :defaultActive="defaultActive"
    @changeTab="changeTab"
  />

  <!-- 基本信息 -->
  <areaInfo 
    v-if="defaultActive == '1'"
    :orgId="orgId"
  />

  <!-- 片区配置 -->
  <areaConfig
    v-if="defaultActive == '2'"
    :orgId="orgId"
  />

</template>

<script setup lang="ts">
import { onMounted } from "vue";

import { onLoad, onReady } from '@dcloudio/uni-app'

import tabs from "../components/tabs.vue";
import areaInfo from "./components/areaInfo.vue";
import areaConfig from "./components/areaConfig.vue";

const orgId = ref<string>('')

onLoad((option) => {	//这里可以接收到一个参数option
  orgId.value = option.orgId

  console.log('片区option', option);
})

const defaultActive = ref('1')
const data = reactive({
  tabsData: [
     {
      value: "1",
      name: "基本信息",
    },
    {
      value: "2",
      name: "片区配置",
    },
  ],
})

// tab切换
const changeTab = (item: any) => {
  defaultActive.value = item.value
  
}
</script>