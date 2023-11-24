<!--
 * @作者: 郭莉猛
 * @Date: 2023-11-17 13:16:13
 * @FilePath: /uni-preset-vue-vite-ts 2/src/pages/businessManagement/components/electricityStatistics.vue
 * @描述: 
 * 
-->
<template>
  <view class="main-wrap">
    <view class="header">
      <view class="header-l">
        <view class="header-icon">
          <u-icon name="red-packet" color="rgb(249,199,88)" size="24"></u-icon>
        </view>
        <text class="header-title">{{props.dateTypeName}}耗电量统计</text>
      </view>
      <view class="trend-unit">
          <text class="num">0</text>
          <text class="unit">度</text>
      </view>
    </view>

    <view class="trend-m">
      <ECharts
        ref="EChartsRef"
        class="ECharts"
        :options="options"
        :customStyle="'height: 400px'"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, toRefs, watch, ref, onMounted, nextTick } from "vue";

import ECharts from "./ECharts.vue";
const EChartsRef = ref()
const props = defineProps({
  dateTypeName: {
    type: String,
    default: "日",
  },
  electrictysData: {
    type: Array,
    default: [],
  }
});

const data = reactive({
  id: "ECharts1",
  width: "100%",
  height: "400px",
  options: {
    grid: {
      left: "15%"
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (datas:any) {
        var res = datas[0].axisValueLabel + '<br/>'
        var marker = '<span style="display:inline-block; margin-right: 5px; border-radius: 25px; width:25px; height:25px; background-color:' + datas[0].color + ';"></span>'
        res += marker + '<span class="font-fzNumber" style="font-size:45px">' + datas[0].data + '</span>' + '<br/>';
        return res
      }
    },
    xAxis: {
      type: 'category',
      data: ['0时', '2时', '4时', '6时', '8时', '10时', '12时', '14时', '16时', '18时', '20时', '22时', '24时']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: `{value} kw*h`,
        width: 150
      }
    },
    series: [
      {
        name: "耗电量",
        data: [],
        type: 'line'
      }
    ]
  },
  xDataDay:  ['0时', '2时', '4时', '6时', '8时', '10时', '12时', '14时', '16时', '18时', '20时', '22时', '24时'],
  xDataWeek:  ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  xDataMonth:  ['01日', '03日', '05日', '07日', '09日', '11日', '13日', '15日', '17日', '19日', '21日', '23日', '25日', '27日', '29日'],
})

const { options, id, width, height, xDataDay , xDataWeek, xDataMonth} = toRefs(data);

const setData = () => {
  nextTick(() => {
    EChartsRef.value.$refs.chart.setOption(options.value)
  });
}

// 监听
watch(
  () => [props.dateTypeName, props.electrictysData],
  (newVal) => {
    // console.log('类型',newVal[0]);
    
    switch(newVal[0]) {
      case '日':
        options.value.xAxis.data = xDataDay.value
        break
      case '周':
        options.value.xAxis.data = xDataWeek.value
        break
      case '月':
        options.value.xAxis.data = xDataMonth.value
        // console.log('x轴',options.value.xAxis.data);
        
        break
    }

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
    justify-content: space-between;
    .header-l {
      display: flex;
    }
    .header-title {
      padding: 0 5px;
    }
    .trend-unit {
      // padding-left: 10px;
      // color: #000;
      .num {
        font-size: 28px;
        color: #006cff;
        vertical-align: bottom;
      }
      .unit {
        vertical-align: super;
      }
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
          vertical-align: bottom;
        }
        
      }
    }
  }
}
</style>