<!--
 * @作者: 郭莉猛
 * @Date: 2023-11-08 17:32:07
 * @FilePath: /uni-preset-vue-vite-ts 2/src/pages/areaManagement/components/templateList.vue
 * @描述: 列表
 * 
-->
<template>
  <view class="warp-list" @click="listItemClick">
    
      <view class="warp-list-item" >
        <view class="select" v-if="props.selection">
          <u-checkbox-group
            v-model="props.listItemData.checked"
            placement="column"
            @change="checkboxChange"
          >
            <u-checkbox
              shape="circle"
              :name="props.listItemData.deviceId"
            >
            </u-checkbox>
          </u-checkbox-group>
        </view>
        <view style="width: 100%;">
          <!-- 标题部分 -->
          <view class="list-header">
            <view class="list-header-title">
              <view class="title">
                <view>{{ props.type == 'device' ? props.listItemData.name : props.listItemData.stationName }}</view>
                <view class="type">
                  {{ props.listItemData.facilityTypeDesc}}
                </view>
              </view>
              <view class="value">
                <u-icon name="arrow-right" size="14px" top="6" color="rgb(140,142,152)"></u-icon>
              </view>
            </view>

            <view class="subtitle">
              网关：{{props.listItemData.ip}}
            </view>
          </view>
          <!-- 设备/端口 -->
          <view class="device">
            <view class="device-item" v-if="props.type != 'device'">
              <view class="label label-title ">
                设备
                <up-text  text="0"  size="12" margin="0px 0px 0px 5px"></up-text>
                <text class="line"></text>
              </view>
              <view class="label">在线 <up-text type="success" text="0"  size="12"  margin="0px 0px 0px 5px"></up-text></view>
              <view class="label">离线 <up-text type="error" text="0"  size="12"  margin="0px 0px 0px 5px"></up-text></view>
            </view>

            <view class="device-item">
              <view class="label label-title ">
                端口
                <up-text  :text="props.listItemData.ports || 0"  size="12"  margin="0px 0px 0px 5px"></up-text>
                <text class="line"></text>
              </view>
              <view class="label">使用中 <up-text type="success" text="0" size="12"  margin="0px 0px 0px 5px"></up-text></view>
              <view class="label">空闲 <up-text type="primary" text="0" size="12"  margin="0px 0px 0px 5px"></up-text></view>
            </view>

          </view>

          <!-- 近7日 -->
          <view class="recently">
            <view class="recently-l">
              <view class="recently-item">
                <text>近7日使用率：</text>
                <text class="value">{{ props.listItemData.syl ? `${props.listItemData.syl}%` : '-' }}</text>
              </view>
              <view class="recently-item">
                <text>近7日客单价：</text>
                <text class="value">{{ props.listItemData.kdj ? `${props.listItemData.kdj}元/单` : '-' }}</text>
              </view>
            </view>
            <view class="recently-r" v-if="props.type == 'device'" @click="delClick">
              <u-icon name="trash" size="24px" color="#f56c6c"></u-icon>
            </view>
          </view>
        </view>
      </view>
    
  </view>
</template>

<script setup lang="ts">
const props = defineProps({
  selection: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "",
  },
  listItemData: {
    type: Object,
    default: {},
  }
})

// const checked = ref(['1009022092000906'])
const checkboxChange = (v:any) => {
  console.log('checkboxChange',v);
  
}

const emit = defineEmits(["listItemClick", "delClick"]);
const listItemClick = () => {
  
  emit("listItemClick", props.listItemData);
}

const delClick = () => {
  emit("delClick", props.listItemData);
}
</script>

<style style lang="scss" scoped>
.warp-list {
  .warp-list-item {
    margin: 15px 0;
    padding: 15px;
    border-radius: 5px;
    background: #F1F6FE;
    display: flex;
    .select {
      height: 100%;
      margin: auto 0;
    }
    .list-header {
      .list-header-title {
        display: flex;
        justify-content: space-between;
        .title {
          font-size: 20px;
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
          padding-left: 30px;
        }
      }
      .subtitle {
        color: rgb(140, 142, 152);
        font-size: 12px;
        padding: 5px 0;
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
      justify-content: space-between;
      .recently-l {
        display: flex;
        .recently-item {
          padding-right: 20px;
          .value {
            color: #000;
          }
        }
      }
      .recently-r {
        padding-left: 30px;
      }
    }
  } 
}
</style>