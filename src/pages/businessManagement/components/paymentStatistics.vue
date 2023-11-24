<!--
 * @作者: 郭莉猛
 * @Date: 2023-11-17 13:16:13
 * @FilePath: /uni-preset-vue-vite-ts 2/src/pages/businessManagement/components/paymentStatistics.vue
 * @描述: 
 * 
-->
<template>
  <view class="main-wrap">
    <view class="header">
      <view class="header-icon">
        <u-icon name="red-packet" color="rgb(249,199,88)" size="24"></u-icon>
      </view>
      <text class="header-title"> {{ props.dateTypeName }}支付方式统计</text>
    </view>

    <view class="trend-m" >
      <ECharts
        ref="EChartsRef"
        class="ECharts"
        :options="options"
        :customStyle="'height: 400px'"
        v-if="props.paymentStatisticsData.length > 0"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, toRefs, ref, nextTick, watch, onMounted } from "vue";

import ECharts from "./ECharts.vue";
const EChartsRef = ref()

const props = defineProps({
  dateTypeName: {
    type: String,
    default: "日",
  },
  paymentStatisticsData: {
    type: Array,
    default: [],
  }
});

const data = reactive({
  id: "ECharts1",
  width: "100%",
  height: "400px",
  options: {
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: [],
        label: {
          // alignTo: "edge",
          // edgeDistance: "18%",
          // bleedMargin: 16
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  },
})

const { options, id, width, height } = toRefs(data);
const setData = () => {
  nextTick(() => {
    EChartsRef.value.$refs.chart.setOption(options.value)
  });
}

// 监听
watch(
  () => [props.dateTypeName, props.paymentStatisticsData],
  (newVal) => {
    // console.log('支付方式',newVal[1]);
    

    options.value.series[0].data = newVal[1]
    setData()
  },
  { deep: true, immediate: true }
);



onMounted(()=> {
  setData()
})
</script>

<style lang="scss" scoped>
.main-wrap {
  margin: 20px;
  padding: 15px;
  background: #fff;
  border-radius: 7px;
  .header {
    display: flex;
    font-size: 18px;
    font-weight: bold;
    .header-title {
      padding: 0 5px;
    }
  }

  .stream-list {
    display: flex;
    border-bottom: 1px solid rgb(238,240,243);
  }
  .stream-content {
    width: 50%;
  }
  .stream-m {
    padding: 10px 0;
    .stream-title {
      display: flex;
      font-size: 14px;
      line-height: 30px;
      .stream-text {
        padding-right: 3px;
      }
      .stream-h {
        color: rgb(144, 147, 153);
      }
    }
    .stream-active {
      color: #006cff;
    }
    .stream-amount {
      font-size: 14px;
      font-weight: bold;
      .num {
        font-size: 28px;
      }
      .text-num {
        font-size: 20px;
      }
    }
  }
  
  .trend-m {
    margin: 20px 0 10px;
    min-height: 400px;
    display: inline-block;
    .trend-header {
      display: flex;
      font-size: 14px;
      line-height: 40px;
      color: rgb(144, 147, 153);
      .trend-unit {
        padding-left: 10px;
        color: #000;
        .num {
          font-size: 28px;
          color: #006cff;
        }
      }
    }
  }
}
</style>