<!--
 * @作者: 郭莉猛
 * @Date: 2023-11-08 17:15:50
 * @FilePath: /uni-preset-vue-vite-ts 2/src/pages/areaManagement/areaManagement/areaDetails.vue
 * @描述: 片区详情
 * 
-->
<template>
  <view class="wrap">
    <basicInformation
      :orgDto="detailData.orgDto"
      @settingClick="settingClick"
    />

    <!-- 营收 -->
    <statistics
      :title="'片区营收统计'"
    />

    <!-- 充电站列表 -->
    <chargingStationList
      :orgId="orgId"
      :orgDto="detailData.orgDto"
    />
  </view>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";

import { onLoad, onReady } from '@dcloudio/uni-app'
import { areaOrgDetail } from "@/api/areaManagement/areaManagement";

import basicInformation from "../components/basicInformation.vue";
import statistics from "../components/statistics.vue";
import chargingStationList from "../chargingStation/chargingStationList.vue";

const orgId = ref<string>('')

const data = reactive({
  detailData: {},
 })

const { detailData } = toRefs(data);

onLoad((option) => {	//这里可以接收到一个参数option
  orgId.value = option.orgId

  // console.log('片区option', option);
  if(option.orgId) {
    getAreaDetailst(option)
  }
})

// 详情
const getAreaDetailst =  (option:any) => {
  let param = {
    "orgId": option.orgId,
  }
  
  areaOrgDetail(param).then((res) => {
    let { data } = res
    detailData.value = data
  });
}

const settingClick = () => {
  // let id= '12345'
  uni.navigateTo({
    url: `/pages/areaManagement/areaManagement/addArea?orgId=${orgId.value}`,
  });
}
</script>

<style style lang="scss" scoped>
.wrap {
  height: 100%;
  background: rgb(241,244,247);
}
</style>