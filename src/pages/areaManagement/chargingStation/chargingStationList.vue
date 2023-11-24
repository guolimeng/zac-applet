<!--
 * @作者: 郭莉猛
 * @Date: 2023-11-08 18:42:20
 * @FilePath: /uni-preset-vue-vite-ts 2/src/pages/areaManagement/chargingStation/chargingStationList.vue
 * @描述: 充电站列表
 * 
-->
<template>
  <view class="charge-wrap">
    <!-- 头部 -->
    <view class="charge-header">
      <view class="title">充电站列表</view>
      <view>
        <up-button type="primary" size="small" color="#006cff" text="新增充电站" @click="addStationClick"></up-button>
      </view>
    </view>

    <!-- 搜索 -->
    <view class="search-plate">
      <view class="charge-search">
        <u-search placeholder="搜索充电站" v-model="keyword" :showAction="false"></u-search>
      </view>
    </view>

    <!-- 列表 -->
    <view v-for="(item, index) in listData" :key="index">
      <templateList
        :listItemData="item"
        @listItemClick="listItemClick"
      />
    </view>
    
  </view>

  <u-action-sheet
    title="添加方式"
    :show="actionSheetShow"
    @close="close(key)"
    closeOnClickOverlay
    :actions="sheetList"
    :round="10"
    @select="selectClick"
  >
  </u-action-sheet>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onLoad, onReady, onReachBottom } from '@dcloudio/uni-app'
import templateList from "../components/templateList.vue";
import { stationList, deviceVerify } from "@/api/areaManagement/areaManagement";
import { userStore } from "@/store/modules/user";
const userUserStore = userStore();

const props = defineProps({
  orgId: {
    type: String,
    default: "",
  },
  orgDto: {
    type: Object,
    default: {},
  }
})

const keyword = ref<string>('')

const data = reactive({
  listData: [],
  total: 1,
  parameter: {
    pageNo:1,
    pageSize:10,
  },
  sheetList: [
    {
      name:'扫码添加',
      value: '00'
    },
    {
      name: '手动添加',
      value: '01'
    },
  ],
})
const { listData, parameter, total, sheetList } = toRefs(data);

onReachBottom(()=> {
  if (total.value <= listData.value.length) {
    uni.showToast({
      title: '已加载全部数据',
      icon: "none"
    });
  } else {
    parameter.value.pageNo ++
    getStationList()
  }
})

onMounted(()=> {
  console.log('onMounted', props.orgId);
  getStationList()
})

const getStationList =  () => {
  let param = {
    "orgId": props.orgId,
    "operatorId": userUserStore.operatorId,
    "pageNo": parameter.value.pageNo,
    "pageSize": parameter.value.pageSize,
  }
  
  stationList(param).then((res) => {
    let { data } = res
    listData.value = data.stationDtos
    total.value = data.total
  });
}

const listItemClick = (item: any) => {
  // console.log('详情', item, props.orgId);
  
  uni.navigateTo({
    url: `/pages/areaManagement/chargingStation/chargingStationDetails?stationId=${item.stationId}&orgId=${props.orgId}`,
  });
}

const actionSheetShow = ref(false)
const addStationClick = () => {
  actionSheetShow.value = true
}

// 
const getDeviceData = (manufacturer: string) => {
  // let url = "http://qqcharging.com/p/701083052200197";
  let parts = manufacturer.split("/");  // 使用斜杠分割字符串
  let lastPart = parts.pop();  // 获取最后一部分

  let param = {
    manufacturer: lastPart,
    orgId: props.orgDto.orgId
  }
  deviceVerify(param).then((res) => {
    let { data } = res
    let queyr = {
      orgName: props.orgDto.name,
      orgId: props.orgDto.orgId,
      detailedAddress: props.orgDto.detailedAddress,
      manufacturer: lastPart,
      ...data
    }
    uni.navigateTo({
      url: `/pages/areaManagement/chargingStation/components/addShortcutCreateSite?query=${encodeURIComponent(JSON.stringify(queyr))}`,
    });
  });
}

const selectClick = (val:any) => {
  // console.log('index',val);
  // console.log('props.orgDto',props.orgDto);
  
  // return
  switch(val.value) {
    case '00':
      uni.scanCode({
        success: function (res) {
          // console.log('条码类型：' + res.scanType);
          // console.log('条码内容：' + res.result);
          getDeviceData(res.result)
        }
      });
      break
    case '01':
      uni.navigateTo({
        url: `/pages/areaManagement/chargingStation/components/addChargingStation?orgId=${props.orgDto.orgId}&orgName=${props.orgDto.name}`,
      });
      break
  }
}

const close = () => {
  actionSheetShow.value = false
}
</script>

<style style lang="scss" scoped>
.charge-wrap {
  margin: 15px;
  padding: 15px;
  border-radius: 5px;
  background: #fff;
  .charge-header {
    display: flex;
    justify-content: space-between;
    .title {
      font-size: 16px;
      font-weight: bold;
    }
    
  }
  .search-plate {
    .charge-search {
      padding-top: 10px;
      width: 50%;
    }
  }
}
</style>