<!--
 * @作者: 郭莉猛
 * @Date: 2023-08-25 19:45:55
 * @FilePath: /uni-preset-vue-vite-ts 2/src/pages/mine/index.vue
 * @描述: 我的
 * 
-->
<template>
  <view class="content">
    <view class="text-area">
      <image class="logo" src="/static/logo.png" />
      <view class="title">{{ userUserStore.usernName }}</view>
      <!-- <view class="sub-title">{{ title.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') }}</view> -->
    </view>
  
    <view class="wrap">
      <view class="detail-item" v-for="(item, index) in menuData" :key="index" @click="menuClick(item)">
        <view class="icon"> 
          <!-- {{ item.icon}} -->
          <image class="img" :src="item.icon" />
        </view>

        <view class="key">{{ item.title }}</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { userStore } from "@/store/modules/user";
const userUserStore = userStore();
const title = ref('17702185150')

const data = reactive({
  menuData: [
    { 
      title: '订单管理',
      icon: "/static/mine/order.png"
    },
    { 
      title: '计费模板',
      icon: "/static/mine/charging.png",
      path: "/pages/billingTemplate/index"
    },
    { 
      title: '分账管理',
      icon: "/static/mine/accounts.png",
      path: "/pages/ledgerManagement/index"
    },
    { 
      title: '卡片管理',
      icon: "/static/mine/card.png"
    },
    { 
      title: '退款管理',
      icon: "/static/mine/refund.png"
    },
    { 
      title: '电池管理',
      icon: "/static/mine/battery.png"
    },
    { 
      title: '充电站审核',
      icon: "/static/mine/examine.png"
    },
    { 
      title: '常见问题',
      icon: "/static/mine/issue.png"
    },
    { 
      title: '个人设置',
      icon: "/static/mine/setup.png"
    },
  ]
})


let { menuData } = toRefs(data);

const menuClick = (item: any) => {
  // console.log('item',item);
  if(item.path) {
    uni.navigateTo({
      url: item.path,
    });
  }
  
}
</script>

<style lang="scss" scoped>
.content {
  height: 100vh;
  background: rgb(241,244,247);
  .wrap {
    display: flex;
    flex-wrap: wrap;
    margin: 10px;
    .detail-item {
      width: 25%;
      background: #fff;
      margin: 5px;
      text-align: center;
      font-size: 14px;
      padding: 10px;
      border-radius: 6px;
      .icon {
        width: 50px;
        height: 50px;
        // background: pink;
        margin: 10px auto 10px;
        border-radius: 7px;
        .img {
          width: 100%;
          height: 100%;
        }
      }

    }
  }
}
.logo {
  height: 150rpx;
  width: 150rpx;
}

.text-area {
  text-align: center;
  padding: 40rpx;
  background: #fff;
}

.title {
  color: #000;
  font-weight: bold;
  font-size: 40rpx;
}
.sub-title {
  color: #8f8f94;
}
</style>
