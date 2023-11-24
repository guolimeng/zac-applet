<!--
 * @作者: 郭莉猛
 * @Date: 2023-11-08 17:29:32
 * @FilePath: /uni-preset-vue-vite-ts 2/src/pages/areaManagement/components/basicInformation.vue
 * @描述: 基本信息
 * 
-->
<template>
  <view class="warp-list">
    <view class="warp-list-item" >
      <!-- 标题部分 -->
      <view class="list-header">
        <view class="title">
          <view>{{ props.type ? props.orgDto.stationName : props.orgDto.name}}</view>
          <view class="type" v-if="props.type">
            {{ props.orgDto.facilityTypeDesc }}
          </view>
        </view>
        <view class="value" @click="settingClick">
          <view>
            <u-icon name="setting" size="20px"></u-icon>
          </view>
          设置
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
          <view class="label">离线 <up-text type="error" :text="props.orgDto.ndevices || 0"  size="12"  margin="0px 0px 0px 5px"></up-text></view>
        </view>

        <view class="device-item">
          <view class="label label-title ">
            端口
            <up-text  :text="props.orgDto.ports || 0"  size="12"  margin="0px 0px 0px 5px"></up-text>
            <text class="line"></text>
          </view>
          <view class="label">使用中 <up-text type="success" :text="props.orgDto.yports || 0" size="12"  margin="0px 0px 0px 5px"></up-text></view>
          <view class="label">空闲 <up-text type="primary" :text="(props.orgDto.ports || 0) - (props.orgDto.yports || 0) " size="12"  margin="0px 0px 0px 5px"></up-text></view>
        </view>

      </view>

      <!-- 近7日 -->
      <view class="recently">
        <view class="recently-item">
          <text>近7日使用率：</text>
          <text class="value">{{ props.orgDto.syl ? `${props.orgDto.syl}%` : '-' }}</text>
        </view>
        <view class="recently-item">
          <text>近7日客单价：</text>
          <text class="value">{{ props.orgDto.kdj ? `${props.orgDto.kdj}元/单` : '-' }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    default: "",
  },
  orgDto: {
    type: Object,
    default: {},
  }
})
const data = reactive({
})

let {  } = toRefs(data);

const emit = defineEmits(["settingClick"]);

const settingClick = () => {
  emit("settingClick");
}
</script>

<style style lang="scss" scoped>
.warp-list {
  .warp-list-item {
    margin: 0 15px;
    padding: 15px;
    border-radius: 5px;
    .list-header {
      display: flex;
      justify-content: space-between;
      .title {
        font-size: 18px;
        display: flex;
        .type {
          margin-left: 5px;
          height: 16px;
          font-size: 10px;
          font-weight: bold;
          color: #e6a23c;
          white-space: nowrap;
          line-height: 16px;
          background: rgb(252,244,234);
          border-radius: 2px;
          padding: 0 4px;
          margin-top: 7px;
        }
      }
      .value {
        font-size: 12px;
        line-height: 25px;
        padding-left: 30px;
        border-radius: 20px;
        .num {
          color: #006cff;
        }
      }
    }
    .device {
      padding-bottom: 5px;
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
</style>