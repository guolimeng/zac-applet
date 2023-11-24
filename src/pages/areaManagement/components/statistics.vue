<!--
 * @作者: 郭莉猛
 * @Date: 2023-11-08 17:30:25
 * @FilePath: /uni-preset-vue-vite-ts 2/src/pages/areaManagement/components/statistics.vue
 * @描述: 营收统计
 * 
-->
<template>
  <view class="statistics-wrap">
    <!-- 标题部分 -->
    <view class="header-title">
      <view class="title">{{ props.title }}</view>
      <view class="value">
        <view>查看更多</view>
        <view>
          <u-icon name="arrow-right" size="14px" top="6" color="rgb(140,142,152)"></u-icon>
        </view>
      </view>
    </view>

    <!-- 统计数 -->
    <view class="statistics">
      <view class="statistics-item" v-for="(item, index) in statisticsData" :key="index">
        <view class="tilte" >{{ item.title }}</view>
        <view class="value" :style="{'color': item.color}">{{ item.num }}</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
})
const data = reactive({
  statisticsData: [
    {title: '今日营收(元）', num: '0', color: '#006cff'},
    {title: '今日订单(笔〕', num: '0'},
    {title: '今日充电人数', num: '0'},
  ]
})

let { statisticsData } = toRefs(data);

</script>

<style style lang="scss" scoped>
.statistics-wrap{
  margin: 0 15px;
  padding: 15px;
  border-radius: 5px;
  background: #fff;
  .header-title {
    display: flex;
    justify-content: space-between;
    .title {
      font-size: 16px;
    }
    .value {
      font-size: 12px;
      line-height: 25px;
      padding-left: 15px;
      border-radius: 20px;
      display: flex;
      color: rgb(140,142,152);
    }
  }
  .statistics {
    padding-top: 10px;
    display: flex;
    .statistics-item {
      font-size: 12px;
      width: 33%;
      .value {
        font-weight: bold;
        line-height: 30px;
      }
    }
  }
}
</style>