<!--
 * @作者: 郭莉猛
 * @Date: 2023-08-25 19:45:55
 * @FilePath: /uni-preset-vue-vite-ts 2/src/pages/areaManagement/areaManagement/areaList.vue
 * @描述: 片区管理
 * 
-->
<template>
  <view class="wrap">
    <!-- 搜索 -->
    <view class="search"> 
      <u-search
        v-model="name"
        :show-action="false"
        :animation="false"
        :actionStyle="{
          'color': '#006cff'
        }"
        placeholder="请输入片区名称"
        @change="getAreaList"
      />
    </view>

    <!-- 列表数据 -->
    <view class="warp-list">
      <view class="warp-list-item" v-for="(item, index) in listData" :key="index" @click="detailsClick(item.orgId)">
        <!-- 标题部分 -->
        <view class="list-header">
          <view class="list-header-title">
            <view class="title">{{ item.name }}</view>
            <view class="value">
              充电站数
              <text class="num">0</text>
            </view>
          </view>

          <view class="subtitle">
            {{ item.detailedAddress }}
            <!-- 上海市青浦区华徐公路628号奇点科创园B座311室虹桥奇点科创园 -->
          </view>
        </view>

        <!-- 设备/端口 -->
        <view class="device">
          <view class="device-item">
            <view class="label label-title ">
              设备
              <up-text  text="0"  size="12" margin="0px 0px 0px 5px"></up-text>
              <text class="line"></text>
            </view>
            <view class="label">在线 <up-text type="success" text="0"  size="12"  margin="0px 0px 0px 5px"></up-text></view>
            <view class="label">离线 <up-text type="error" :text="item.ndevices"  size="12"  margin="0px 0px 0px 5px"></up-text></view>
          </view>

          <view class="device-item">
            <view class="label label-title ">
              端口
              <up-text  :text="item.ports"  size="12"  margin="0px 0px 0px 5px"></up-text>
              <text class="line"></text>
            </view>
            <view class="label">使用中 <up-text type="success" :text="item.yports" size="12"  margin="0px 0px 0px 5px"></up-text></view>
            <view class="label">空闲 <up-text type="primary" :text="item.ports- item.yports " size="12"  margin="0px 0px 0px 5px"></up-text></view>
          </view>

        </view>

        <!-- 近7日 -->
        <view class="recently">
          <view class="recently-item">
            <text>近7日使用率：</text>
            <text class="value">{{ item.syl ? `${item.syl}%` : '-' }}</text>
          </view>
          <view class="recently-item">
            <text>近7日客单价：</text>
            <text class="value">{{ item.kdj ? `${item.kdj}%` : '-' }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="add-add-ledger" @click="addClick">
      新增片区
    </view>
  </view>
  <view v-if="isLoadMore">  
    <uni-load-more :status="loadStatus" ></uni-load-more>
  </view>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onLoad, onShow, onReady, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'
import { areaOrgList } from "@/api/areaManagement/areaManagement";
import { userStore } from "@/store/modules/user";
const userUserStore = userStore();
import { ref } from 'vue'
const name = ref('')

 const data = reactive({
  listData: [],
  total: 1,
  parameter: {
    pageNo:1,
    pageSize:10,
  },
  loadStatus:'loading',
  isLoadMore:false,  //是否加载中
 })

const { listData, parameter, total, loadStatus, isLoadMore } = toRefs(data);

onLoad(() => {
  getAreaList()
  console.log('onLoad');
})

onMounted(()=> {
  console.log('onMounted');
  // getAreaList()
})

onReachBottom(()=> {
  if (total.value <= listData.value.length) {
    uni.showToast({
      title: '已加载全部数据',
      icon: "none"
    });
  } else {
    parameter.value.pageNo ++
    getAreaList()
  }
})

onPullDownRefresh(()=> {
  listData.value = [];//清空页面数据
  parameter.value.pageNo = 1
  getAreaList()
  setTimeout(function() {
    uni.stopPullDownRefresh();//停止页面加载动画
  }, 1000);
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
    // listData.value = data.orgDtos
    listData.value = [...listData.value, ...data.orgDtos]
    total.value = data.total
  });
}

// 详情
const detailsClick = (id: any) => {
  uni.navigateTo({
    url: `/pages/areaManagement/areaManagement/areaDetails?orgId=${id}`,
  });
}

const addClick = (id:any) => {
  uni.redirectTo({
    url: `/pages/areaManagement/areaManagement/addArea`,
  });
}
</script>

<style style lang="scss" scoped>
.wrap {
  height: calc(100% - 110px);
  // overflow: auto;
  background: rgb(241,244,247);
  .search {
    background: #fff;
    border-bottom: 1px solid rgb(231,235,240);
    padding: 10px;
  }

  .warp-list {
    // height: calc(100% - 110px);
    // overflow: auto;
    .warp-list-item {
      margin: 15px;
      padding: 15px;
      border-radius: 5px;
      background: #fff;
      &:last-child{
        margin-bottom: 110px !important;
      }
      .list-header {
        .list-header-title {
          display: flex;
          justify-content: space-between;
          .title {
            font-size: 18px;
          }
          .value {
            font-size: 12px;
            line-height: 25px;
            padding: 0 10px;
            background: rgb(237,244,255);
            border-radius: 20px;
            color: rgb(140,142,152);
            .num {
              color: #006cff;
            }
          }
        }
        .subtitle {
          color: rgb(140, 142, 152);
          font-size: 12px;
          padding: 5px 0;
        }
      }
      .device {
        padding: 10px 0;
        font-size: 12px;
        color: rgb(140, 142, 152);
        .device-item {
          display: flex;
          padding: 2px 0;
          .label {
            padding-right: 10px;
            display: flex;
            line-height: 20px;
            .line {
              margin: 4px 0;
              padding-left: 10px;
              border-right: 1px solid rgb(140, 142, 152);
            }
          }
          .label-title {
            color: #000;
          }
        }
      }
      .recently {
        display: flex;
        font-size: 12px;
        color: rgb(140, 142, 152);
        .recently-item {
          padding-right: 20px;
          .value {
            color: #000;
          }
        }
      }
    }
  }

  .add-add-ledger {
    position: fixed;
    left: 0;
    bottom: 10px;
    background: rgb(30,102,235);
    color: #fff;
    width: calc(100% - 20px);
    font-size: 16px;
    line-height: 40px;
    text-align: center;
    margin: 0 10px;
  }
}
</style>
