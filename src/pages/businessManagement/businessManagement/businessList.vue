<!--
 * @作者: 郭莉猛
 * @Date: 2023-08-25 19:45:55
 * @FilePath: /uni-preset-vue-vite-ts 2/src/pages/businessManagement/businessManagement/businessList.vue
 * @描述: 营收
 * 
-->
<template>
  <view class="content">
      <tabs 
        :tabsData="tabsData"
        :defaultActive="defaultActive"
        @changeTab="changeTab"
      />

      <view v-if="defaultActive === '0'">
        <totalRevenue
        />
      </view>
  </view>
</template>

<script setup lang="ts">
import totalRevenue from "./totalRevenue.vue";
import dayjs from "dayjs";
import tabs from "../components/tabs.vue";
import { reactive, ref, onMounted } from 'vue'

const defaultActive = ref('0')
const data = reactive({
  tabsData: [
    { name: '总营收', value: '0' },
    { name: '片区营收', value: '1' },
    { name: '充电站营收', value: '2' },
  ],
})

const { tabsData } = toRefs(data);

const changeTab = (item: any, val: string) => {
  defaultActive.value = val
}
</script>

<style lang="scss" scoped>
.content {
  height: 100vh;
  overflow: auto;
  background: rgb(241,244,247);
  .date-box {
    // margin: 10px;
  }
}
</style>
