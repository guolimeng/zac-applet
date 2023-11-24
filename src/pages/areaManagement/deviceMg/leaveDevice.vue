<!--
 * @作者: 郭莉猛
 * @Date: 2023-11-15 15:24:10
 * @FilePath: /uni-preset-vue-vite-ts 2/src/pages/areaManagement/deviceMg/leaveDevice.vue
 * @描述: 
 * 
-->
<template>
  <view class="wrap">
    <view class="wrap-item" v-for="(item,index) in listData" :key="index">
      <!-- header -->
      <view class="header">
        <view class="header-title">UID: {{ item.deviceId }}</view>
        <view class="text">
          <text class="round" ></text>
          {{ item.statusDesc }}
        </view>
      </view>

      <!-- 主体 -->
      <view class="content">
        <view class="content-header">
          <view class="content-header-item content-w">
            <text class="lable">设备号： </text>
            <text class="value">{{ item.name }}</text>
          </view>
          <view class="content-header-item content-w">
            <text class="lable">端口号： </text>
            <text class="value">{{ Array.isArray(item.gunStatus) ? item.gunStatus.length : 0 }}个</text>
          </view>
        </view>

        <view class="content-header-item">
          <text class="lable">厂商UID： </text>
          <text class="value">{{ item.manufacturer }}</text>
        </view>
        <view class="content-header-item">
          <text class="lable">上次活跃时间： </text>
          <text class="value">{{ item.createdDate }}</text>
        </view>
        <view class="content-header-item">
          <text class="lable">所属片区： </text>
          <text class="value">{{ item.orgName }}</text>
        </view>
        <view class="content-header-item">
          <text class="lable">所属充电站： </text>
          <text class="value">{{ item.stationName }}</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { onMounted, ref,reactive } from "vue";

import { onLoad, onShow, onReady, onPullDownRefresh } from '@dcloudio/uni-app'
import { deviceList } from "@/api/areaManagement/areaManagement";
import { userStore } from "@/store/modules/user";
const userUserStore = userStore();

const data = reactive({
  listData: [],
  total: 1,
  parameter: {
    pageNo:1,
    pageSize:20,
  },
  winHeight: 0 // 页面高度
})
const { listData, parameter, total } = toRefs(data);


onMounted(()=> {
  getDeviceList()
})

// 设备列表
const getDeviceList =  () => {
  let param = {
    "stationId": '',
    "operatorId": userUserStore.operatorId,
    "pageNo": parameter.value.pageNo,
    "pageSize": parameter.value.pageSize,
    "status": "N"
  }
  
  deviceList(param).then((res) => {
    let { data } = res
    listData.value = data.deviceDtoList || []
    // console.log('listData.value', listData.value.length);
    
    total.value = data.total
  });
}
</script>

<style lang="scss" scoped>
.wrap {
  height: 99vh;
  padding-top: 1px;
  background: rgb(241,244,247);
  .wrap-item {
    margin: 15px;
    padding: 15px;
    background: #fff;
    border-radius: 5px;
    .header {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid rgb(238,240,243);
      font-size: 16px;
      line-height: 40px;
      .header-title {
        font-weight: bold;
      }
      .text {
        color: #f56c6c;
        .round {
          width: 5px;
          height: 5px;
          background: red;
          border-radius: 50%;
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
    .content {
      padding-top: 5px;
      .content-header {
        display: flex;
      }
      .content-w {
        width: 50%;
      }
      .content-header-item {
        line-height: 30px;
        font-size: 14px;
        color: rgb(138,140,150);
        .value {
          color: #000;
        }
      }
    }
  }
}
</style>