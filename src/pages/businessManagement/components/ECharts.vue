<!--
 * @作者: 郭莉猛
 * @Date: 2023-11-17 16:11:36
 * @FilePath: /uni-preset-vue-vite-ts 2/src/pages/businessManagement/components/ECharts.vue
 * @描述: 
 * 
-->
<template>
  <view>
    <!-- <view class="title">我的主页</view> -->
    <view>
      <l-echart class="echart" ref="chart" :customStyle="props.customStyle"  @finished="init"></l-echart>
    </view>
  </view>
</template>
 
<script setup>
import LEchart from '@/components/l-echart/l-echart.vue'
// lime-echart是一个demo的组件，用于测试组件
// import LEchart from '@/components/lime-echart/lime-echart.vue'
import { onMounted, reactive, ref } from "vue"
// nvue 不需要引入
// #ifdef VUE3
// #ifdef MP
// 由于vue3 使用vite 不支持umd格式的包，小程序依然可以使用，但需要使用require
const echarts = require('../../../static/echarts.min');
// #endif
// #ifndef MP
// 由于 vue3 使用vite 不支持umd格式的包，故引入npm的包
import * as echarts from 'echarts';
// #endif
// #endif

const props = defineProps({
  customStyle: {
    type: String,
    default: "",
  },
  options: {
    type: Object,
    required: true,
  },
});
 
let chart = ref(); // 获取dom
const state = reactive({
  option: {},
})
state.option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [2, 5, 4, 7, 4, 5, 10],
      type: 'line'
    }
  ]
}
// state.option = {
//   legend: {
//     show: true,
//     data: []
//   },
//   tooltip: {
//     trigger: 'axis',
//     axisPointer: {
//       type: 'cross'
//     }
//   },
//   // grid: {
//   //   left: '3%',
//   //   right: '8%',
//   //   top: '15%',
//   //   bottom: '35%',
//   //   containLabel: true
//   // },
//   xAxis: {
//     type: 'category',
//     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//     axisLabel: {
//       // inside: true,
//       // color: '#fff'
//     },
//     axisTick: {
//       show: false
//     },
//     axisLine: {
//       show: true,
//       lineStyle: {
//         color: '#83bff6'
//       }
//     },
//     z: 10
//   },
//   yAxis: {
//     type: 'value',
//     axisLine: {
//       show: true,
//       lineStyle: {
//         color: '#83bff6'
//       }
//     },
//     axisTick: {
//       show: false
//     },
//     // axisLabel: {
//     //   color: '#999'
//     // },
//     splitLine: {
//       show: true,
//       lineStyle: {
//         type: 'dashed',
//         color: '#83bff6'
//       }
//     }
//   },
//   series: [
//     {
//       data: [150, 230, 224, 218, 135, 147, 260],
//       type: "line",
//       itemStyle: {
//         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//           { offset: 0, color: '#83bff6' },
//           { offset: 0.5, color: '#188df0' },
//           { offset: 1, color: '#188df0' }
//         ])
//       },
//       emphasis: {
//         itemStyle: {
//           color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//             { offset: 0, color: '#2378f7' },
//             { offset: 0.7, color: '#2378f7' },
//             { offset: 1, color: '#83bff6' }
//           ])
//         }
//       },
//       areaStyle: {
//         show: true,
//         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//           {
//             offset: 0,
//             color: '#188df0'
//           },
//           {
//             offset: 1,
//             color: '#fff'
//           }
//         ])
//       },
//     }
//   ],
//   color: ['#83bff6']
// }
// 组件能被调用必须是组件的节点已经被渲染到页面上
onMounted(() => {
  chart.value.init(echarts, chart => {
    chart.setOption(props.options);
  });
})
 
// 渲染完成
const init = () => {
  // console.log("渲染完成");
}
</script>
 
<style scopedlang='scss' scoped>
.echart {
  width: 100%;
  height: 100px;
}
 
.title {
  text-align: center;
}
</style>