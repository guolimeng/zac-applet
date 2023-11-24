<!--
 * @作者: 郭莉猛
 * @Date: 2023-11-17 13:16:13
 * @FilePath: /uni-preset-vue-vite-ts 2/src/pages/businessManagement/components/collectionM.vue
 * @描述: 
 * 
-->
<template>
  <view class="main-wrap">
    <view class="header">
      <view class="header-icon">
        <u-icon name="red-packet" color="rgb(249,199,88)" size="24"></u-icon>
      </view>
      <text class="header-title">{{ props.dateTypeName }}收款</text>
    </view>

    <!-- 流水金额 -->
    <view class="stream-m" @click="clickBox('0')">
      <view class="stream-title" >
        <text class="stream-text">流水金额</text>
        <view>
          <!-- question-circle -->
          <u-icon name="question-circle" color="rgb(144, 147, 153)" top="7" size="16"></u-icon>
        </view>
      </view>

      <view class="stream-amount stream-active">
        <text>￥</text>
        <text class="num">{{ parseFloat(props.chongd / 100) + parseFloat(props.chongz / 100) }}</text>
      </view>
    </view>

    <view class="stream-list">
      <view class="stream-m stream-content" @click="clickBox('1')">
        <view class="stream-title">
          <text class="stream-text stream-h">扫码流水</text>
          <view>
            <u-icon name="question-circle" color="rgb(144, 147, 153)" top="7" size="16"></u-icon>
          </view>
        </view>

        <view class="stream-amount">
          <text>￥</text>
          <text class="text-num">{{ parseFloat(props.chongd / 100) }}</text>
        </view>
      </view>
      <view class="stream-m stream-content" @click="clickBox('2')">
        <view class="stream-title">
          <text class="stream-text stream-h">充值流水</text>
          <view>
            <u-icon name="question-circle" color="rgb(144, 147, 153)" top="7" size="16"></u-icon>
          </view>
        </view>

        <view class="stream-amount">
          <text>￥</text>
          <text class="text-num">{{ parseFloat(props.chongz / 100) }}</text>
        </view>
      </view>
    </view>

    <view class="trend-m">
      <view class="trend-header">
        <view class="trend-title">订单趋势</view>
        <view class="trend-unit">
          <text class="num">0</text>
          <text>笔</text>
        </view>
      </view>

      <ECharts
        ref="EChartsOrderRef"
        :id="'echartsID'"
        :options="options"
        :customStyle="'height: 200px'"
      />
    </view>

    <view class="trend-m">
      <view class="trend-header">
        <view class="trend-title">金额趋势</view>
      </view>
      <ECharts
        ref="EChartsMoneyRef"
        :id="'echartsID'"
        :options="options2"
        :customStyle="'height: 200px'"
      />
    </view>
  </view>

  <m-modal-data 
    :modalShow="modalShow"
    :title="modalTitle"
    :content="modalContent"
    @handleClose="handleClose"
    @handleConfirm="handleConfirm"
  />
</template>

<script setup lang="ts">
import { onMounted, watch, reactive, toRefs, ref, nextTick } from "vue";
import ECharts from "./ECharts.vue";

const props = defineProps({
  dateTypeName: {
    type: String,
    default: "日",
  },
  chongd: {
    type: Number,
    default: 0,
  },
  chongz: {
    type: Number,
    default: 0,
  },
  orderData: {
    type: Array,
    default: [],
  },
  moneyData: {
    type: Array,
    default: [],
  }
});

const EChartsOrderRef = ref()
const EChartsMoneyRef = ref()

const modalShow = ref(false)

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
    },
    xAxis: {
      type: 'category',
      data: ['0时', '2时', '4时', '6时', '8时', '10时', '12时', '14时', '16时', '18时', '20时', '22时', '24时']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: `{value} 笔`
      }
    },
    series: [
      {
        name: "订单数",
        data: [],
        type: 'line',
        // zlevel: 1,
        itemStyle: {
        // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //   { offset: 0, color: '#83bff6' },
        //   { offset: 0.5, color: '#188df0' },
        //   { offset: 1, color: '#188df0' }
        // ])
      },
      }
    ]
  },
  options2: {
    grid: {
      left: "15%"
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['0时', '2时', '4时', '6时', '8时', '10时', '12时', '14时', '16时', '18时', '20时', '22时', '24时']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: `{value} 元`
      }
    },
    series: [
      {
        name: "流水金额",
        data: [],
        // data: [0, 20, 50, 30, 70, 130, 180],
        type: 'line',
      }
    ]
  },
  modalTitle: '流水金额',
  modalContent: '包含微信、支付宝支付的扫码充电流水和储值卡、包月卡充值流水，即实际总收入，已扣除过手续费',

  xDataDay:  ['0时', '2时', '4时', '6时', '8时', '10时', '12时', '14时', '16时', '18时', '20时', '22时', '24时'],
  xDataWeek:  ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  xDataMonth:  ['01日', '03日', '05日', '07日', '09日', '11日', '13日', '15日', '17日', '19日', '21日', '23日', '25日', '27日', '29日'],
})

const { options,options2, modalTitle, modalContent, xDataDay, xDataWeek, xDataMonth } = toRefs(data);

const setData = () => {
  nextTick(() => {
    EChartsOrderRef.value.$refs.chart.setOption(options.value)
    EChartsMoneyRef.value.$refs.chart.setOption(options.value)
  });
}

// 监听
watch(
  () => [props.dateTypeName, props.orderData, props.moneyData],
  (newVal) => {

    switch(newVal[0]) {
      case '日':
        options.value.xAxis.data = xDataDay.value
        options2.value.xAxis.data = xDataDay.value
        break
      case '周':
        options.value.xAxis.data = xDataWeek.value
        options2.value.xAxis.data = xDataWeek.value
        break
      case '月':
        options.value.xAxis.data = xDataMonth.value
        options2.value.xAxis.data = xDataMonth.value
        break
    }

    options.value.series[0].data = newVal[1]

    options2.value.series[0].data = newVal[2]
    setData()
      // console.log('当天时间',options.value.series[0],  options2.value.series[0]);
   
  },
  { deep: true, immediate: true }
);

onMounted(()=> {
  setData()
})

const clickBox = (type: string) => {
  switch(type) {
    case '0': 
      modalTitle.value = '流水金额'
      modalContent.value = '包含微信、支付宝支付的扫码充电流水和储值卡、包月卡充值流水，即实际总收入，已扣除过手续费'
    break
    case '1': 
      modalTitle.value = '扫码流水'
      modalContent.value = '包含微信、支付宝支付的扫码充电流水，按当天订单结算时间为统计口径，已扣除过手续费'
    break
    case '2': 
      modalTitle.value = '充值流水'
      modalContent.value = '包含实体储值卡、实体包月卡、电子储值卡、电子包月卡的充值流水，按当天订单结算时间为统计口径，已扣除过手续费'
    break
  }
  modalShow.value = true
}

const handleClose = () => {
  modalShow.value = false
}

const handleConfirm = () => {
  modalShow.value = false
}
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