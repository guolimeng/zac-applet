<!--
 * @作者: 郭莉猛
 * @Date: 2023-11-11 19:40:04
 * @FilePath: /uni-preset-vue-vite-ts 2/src/pages/areaManagement/chargingStation/components/selectArea.vue
 * @描述: 选择片区
 * 
-->
<template>
  <view class="wrap">
    <view class="header">
      <u-search 
        placeholder="请输入片区名称" 
        v-model="name" 
        :showAction="true"
        :actionStyle="{
          'color': 'rgb(30,102,235)'
        }"
      ></u-search>
    </view>

    <view class="main">
      <view class="device-module">
        <u-icon name="plus-circle-fill" color="#2979ff" size="16" ></u-icon>
        <text class="add-btn" >新增片区</text>
      </view>

      <view 
        class="main-item"
        v-for="(item, index) in listData" 
        :key="index"
        :class="{ active: currentActive === item.orgId }"
        @click="changeTab(item)"
      >
        <view class="title">{{ item.name }}</view>
        <!-- <view class="icon-active">
          <text class="answer"> ✔️ </text>
          <u-icon name="checkbox-mark" color="#2979ff" size="28"></u-icon>
        </view> -->
      </view>
    </view>

    <view class="save-ledger" >
      <!-- 保存 -->
      <view class="btn" @click="confirm">确认</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onLoad } from '@dcloudio/uni-app'
import { areaOrgList } from "@/api/areaManagement/areaManagement";
import { userStore } from "@/store/modules/user";
const userUserStore = userStore();

const name = ref('')

const data = reactive({
  listData:[],
  total: 1,
  parameter: {
    pageNo:1,
    pageSize:10,
  },
  queryData: {}
})

const { listData, parameter, total, queryData } = toRefs(data);

onLoad((option) => {	//这里可以接收到一个参数option
  // activeItem.value = option
  // let item = JSON.parse(decodeURIComponent(option.query))
  queryData.value = JSON.parse(decodeURIComponent(option.query))
  console.log('选择片区', queryData.value);
  
})

onMounted(()=> {
  console.log('onMounted');
  getAreaList()
})

const getAreaList =  () => {
  let param = {
    "name": name.value,
    "operatorId": userUserStore.operatorId,
    "pageNo": parameter.value.pageNo,
    "pageSize": parameter.value.pageSize,
  }
  
  areaOrgList(param).then((res) => {
    let { data } = res
    listData.value = data.orgDtos
    total.value = data.total
  });
}


const currentActive = ref();
const currentItem = ref()
const changeTab = (item: any) => {
  currentActive.value = item.orgId;
  currentItem.value = item
};

const confirm = () => {
  // console.log('confirm', currentItem.value);
  let queyr = {
    ...queryData.value,
    name: currentItem.value.name,
    id: currentItem.value.orgId,
    
  }
  console.log('queyr',queyr, queryData.value);
  
  uni.navigateTo({
    url: `/pages/areaManagement/chargingStation/components/addShortcutCreateSite?query=${encodeURIComponent(JSON.stringify(queyr))}`,
  });
  // uni.navigateTo({
  //   url: `/pages/areaManagement/chargingStation/components/addShortcutCreateSite?name=${currentItem.value.name}&id=${currentItem.value.orgId}`,
  // });
}
</script>

<style lang="scss" scoped>
.wrap {
  height: 100vh;
  background: rgb(241,244,247);

  .header {
    position: fixed;
    left: 0;
    top: 0;
    background: #fff;
    width: calc(100% - 30px);
    height: 45px;
    line-height: 45px;
    padding: 5px 15px;
    display: flex;
    justify-content: space-between;
    .title {
      font-size: 18px;
      font-weight: bold;
    }
    .right-btn {
      display: flex;
      .add-btn {
        font-size: 16px;
        color: #2979ff;
        padding-left: 5px;
      }
    }
  }

  .main {
    margin-top: 45px;
    height: calc(100% - 130px);
    overflow: auto;
    .main-item {
      margin: 15px;
      padding: 15px;
      border-radius: 5px;
      background: #fff;
      // text-align: center;
      position: relative;
      border: 1px solid #fff;
      .icon-active {
        position: absolute;
        right: 0;
        top: 0;
      }
    }
    .active {
      border: 1px solid #2979ff;
    }
    .device-module {
      margin: 20px 15px 10px 15px;
      // margin-top: 10px;
      display: flex;
      border: 1px solid #d6d7d9;
      font-size: 16px;
      line-height: 40px;
      background: #fff;
      color: #2979ff;
      justify-content: center;
      .add-btn {
        padding-left: 5px;
      }
    }
    
  }

  .save-ledger {
    position: fixed;
    left: 0;
    bottom: 0;
    background: #fff;
    width: 100%;
    height: 12%;
    .btn {
      margin: 10px;
      font-size: 16px;
      line-height: 40px;
      text-align: center;
      color: #fff;
      width: calc(100% - 20px);
      background: rgb(30,102,235);
    }
  }
}
:deep(.u-cell__body) {
  padding-left: 0 !important;
}
</style>