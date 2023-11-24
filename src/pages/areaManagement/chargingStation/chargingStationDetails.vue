<!--
 * @作者: 郭莉猛
 * @Date: 2023-11-08 19:13:48
 * @FilePath: /uni-preset-vue-vite-ts 2/src/pages/areaManagement/chargingStation/chargingStationDetails.vue
 * @描述: 充电站详情
 * 
-->
<template>
  <view class="wrap">
    <basicInformation
      :type="'1'"
      :orgDto="detailData"
      @settingClick="settingClick"
    />

    <!-- 营收 -->
    <statistics 
      :title="'充电站营收统计'"
    />

    <!-- 充电站列表 -->
    <deviceList
      :stationId="stationId"
      :orgId="orgId"
      :orgDto="detailData"
    />
  </view>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onLoad, onReady } from '@dcloudio/uni-app'
import basicInformation from "../components/basicInformation.vue";
import statistics from "../components/statistics.vue";
import deviceList from "../deviceMg/deviceList.vue";
import { stationDetail } from "@/api/areaManagement/areaManagement";
import { userStore } from "@/store/modules/user";
const userUserStore = userStore();

const props = defineProps({
  stationDto: {
    type: Object,
    default: {},
  }
})

const data = reactive({
  detailData: {},
 })

const { detailData } = toRefs(data);

const stationId = ref()
const orgId = ref<string>('')
onLoad((option) => {	//这里可以接收到一个参数option
  stationId.value = option.stationId
  orgId.value = option.orgId

  console.log('充电站option', option);
  if(option.stationId) {
    getStationIdDetailst(option)
  }
})

// 详情
const getStationIdDetailst =  (option:any) => {
  let param = {
    "stationId": option.stationId,
  }
  
  stationDetail(param).then((res) => {
    let { data } = res
    detailData.value = data
  });
}

const settingClick = () => {
  let id= '12345'
  uni.navigateTo({
    url: `/pages/areaManagement/chargingStation/editChargingStation?orgId=${orgId.value}&stationId=${stationId.value}`,
  });
}
</script>

<style style lang="scss" scoped>
.wrap {
  height: 100vh;
  background: rgb(241,244,247);
}
</style>