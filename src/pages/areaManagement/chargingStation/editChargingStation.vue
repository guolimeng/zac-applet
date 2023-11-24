<!--
 * @作者: 郭莉猛
 * @Date: 2023-11-11 11:17:02
 * @FilePath: /uni-preset-vue-vite-ts 2/src/pages/areaManagement/chargingStation/editChargingStation.vue
 * @描述: 充电站编辑 station
 * 
-->
<template>
  <!-- <tabs 
    v-if="orgId"
    :tabsData="data.tabsData"
    :defaultActive="defaultActive"
    @changeTab="changeTab"
  /> -->

  <!-- 基本信息 -->
  <stationInfo 
    v-if="defaultActive == '1'"
    :stationId="stationId"
  />

  <!-- 片区配置 -->
  <stationConfig
    v-if="defaultActive == '2'"
    :stationId="stationId"
    :orgId="orgId"
  />

</template>

<script setup lang="ts">
import { onMounted } from "vue";

import { onLoad, onReady } from '@dcloudio/uni-app'

import tabs from "../components/tabs.vue";
import stationInfo from "./components/stationInfo.vue";
import stationConfig from "./components/stationConfig.vue";

const orgId = ref<string>('')
const stationId = ref('')
onLoad((option) => {	//这里可以接收到一个参数option
  orgId.value = option.orgId
  stationId.value = option.stationId

  // console.log('充电站编辑', stationId.value);
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
      name: "充电站配置",
    },
  ],
})

// tab切换
const changeTab = (item: any) => {
  defaultActive.value = item.value
  
}
</script>