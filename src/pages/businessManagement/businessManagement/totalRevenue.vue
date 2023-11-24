<template>
  <dateModule
    class="date-box"
    :defaultDateActive="defaultDateActive"
    @changeDateTab="changeDateTab"
    @confirmDate="confirmDate"
  />
  <collectionM
    :dateTypeName="dateTypeName"
    :chongd="chongd"
    :chongz="chongz"
    :orderData="orderData"
    :moneyData="moneyData"
  />

  <electricityStatistics
    :dateTypeName="dateTypeName"
    :electrictysData="electrictysData"
  />

  <paymentStatistics
    :dateTypeName="dateTypeName"
    :paymentStatisticsData="paymentStatisticsData"
  />
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import dateModule from "../components/dateModule.vue";

import collectionM from "../components/collectionM.vue";
import electricityStatistics from "../components/electricityStatistics.vue";
import paymentStatistics from "../components/paymentStatistics.vue";

import { statisticsQuery } from "@/api/businessManagement/businessManagement";

import { userStore } from "@/store/modules/user";
const userUserStore = userStore();
import { reactive, ref, onMounted } from 'vue'

const defaultDateActive = ref('0')
const data = reactive({
  dateTypeName: '日',
  endDate: `${dayjs().format('YYYY-MM-DD')} 24:00:00`,
  startDate: `${dayjs().format('YYYY-MM-DD')} 00:00:00`,
  chongz: '',
  chongd: '',
  orderData: [],
  moneyData: [],
  electrictysData: [],
  paymentStatisticsData: []
})

const { tabsData, dateTypeName,endDate, startDate, chongz, chongd, orderData, moneyData, electrictysData, paymentStatisticsData } = toRefs(data);

onMounted(()=> {
  getStatisticsData()
})

const getStatisticsData = () => {
  let param = {
    "endDate": endDate.value,
    'startDate': startDate.value
  }

  // uni.$u.toast(`endDate${endDate.value}`)
  
  statisticsQuery(param).then((res) => {
    let { data } = res
    chongz.value = data.chongz
    chongd.value = data.chongd
    switch(dateTypeName.value) {
      case '日':
        setDayDataFun(data)
        break
      case '周':
        setWeekDataFun(data)
        break
      case '月':
        setMonthDataFun(data)
        break
    }
    paymentData(data.statisticsDtos)
    
  }).catch((err) => {
    orderData.value = []
    moneyData.value = []
    electrictysData.value = []
    paymentStatisticsData.value = []
  });
}

// 设置日数据
const setDayDataFun = (data: any) => {
  orderData.value = data.statisticsDtos[0].timeDates.map((item:any) => {
    return Number(item.orders)
  })
  moneyData.value = data.statisticsDtos[0].timeDates.map((item:any) => {
    return Number(item.amounts)
  })

  electrictysData.value = data.statisticsDtos[0].timeDates.map((item:any) => {
    return Number(item.electrictys)
  })

  data.statisticsDtos[0].timeDates.map((item:any) => {
    return 
  })
}

// 设置周数据
const setWeekDataFun = (data: any) => {
  let arr = data.statisticsDtos.map((item:any) => {
      return {
        ...item,
        timestamp: dayjs(item.createdAt).valueOf()
      }
    })
    arr.sort((a:any, b:any) => a.timestamp - b.timestamp);

    // 订单
    orderData.value = arr.map((item:any) => {
      return item.orders
    })
    weekData(orderData.value)

    // 金额
    moneyData.value = arr.map((item:any) => {
      return parseFloat(item.deviceCostAmount / 100)
    })
    weekData(moneyData.value)

    // 日消耗
    electrictysData.value = arr.map((item:any) => {
      return parseFloat(item.chargedElectricty / 100)
    })

    weekData(electrictysData.value)
}

// 设置月数据
const setMonthDataFun = (data: any) => {
  let date = dayjs(startDate.value); // 指定日期
  let daysInMonth = date.daysInMonth();

  let arrMonth = data.statisticsDtos.map((item:any) => {
    return {
      ...item,
      date: dayjs(item.createdAt).format('DD')
    }
  })

  let monthDays = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString().padStart(2, '0')); //一个月的天数，这里假设是31天
  let newArr = monthDays.map(day => {
    // 查找该天数是否在arr中
    let item = arrMonth.find((item:any) => item.date === day);
    // 如果在arr中，返回该对象，否则返回0
    return item ? item : { date: day, orders: 0, chargedElectricty: 0, deviceCostAmount: 0};
  });

  // 订单
  orderData.value = newArr.map((item:any) => {
    return item.orders
  })

  // 金额
  moneyData.value = newArr.map((item:any) => {
    return parseFloat(item.deviceCostAmount / 100)
  })
  
  // 日消耗
  electrictysData.value = newArr.map((item:any) => {
    return parseFloat(item.chargedElectricty / 100)
  })
}

// 支付方式求和
const paymentSumFun = (arr:any, key:string) => {
  return arr.reduce((total:any, currentItem:any) => total + Number(currentItem[key]), 0);
}

const paymentData = (arr: any) => {
  paymentStatisticsData.value = [
    { value: paymentSumFun(arr, 'elses'), name: `其他${paymentSumFun(arr, 'elses')}` },
    { value: paymentSumFun(arr, 'virtualRefillCard'), name: `虚拟充值卡${paymentSumFun(arr, 'virtualRefillCard')}` },
    { value: paymentSumFun(arr, 'virtualMonthlyCard'), name: `虚拟充值包月卡${paymentSumFun(arr, 'virtualMonthlyCard')}` },
    { value: paymentSumFun(arr, 'entityMonthlyCard'), name: `实体充值卡${paymentSumFun(arr, 'entityMonthlyCard')}` },
    { value: paymentSumFun(arr, 'entityRefillCard'), name: `实体充值包月卡${paymentSumFun(arr, 'entityRefillCard')}` },
    { value: paymentSumFun(arr, 'whiteList'), name: `白名单${paymentSumFun(arr, 'whiteList')}` },
    { value: paymentSumFun(arr, 'alipay'), name: `支付宝充值数${paymentSumFun(arr, 'alipay')}` },
    { value: paymentSumFun(arr, 'vx'), name: `微信充值数${paymentSumFun(arr, 'vx')}` },
  ]
}

// 周不满补0
const weekData = (arr: any) => {
  while(arr.length < 7) {
    arr.push(0); // 不满一周的天数用0填充
  }
}

// 日周年切换
const changeDateTab = (item: any, val: any, start: string, end:string) => {
  dateTypeName.value = item.name

  getDateFun(start, end)
}

// 选择日期后
const confirmDate = (start: string, end:string) => {
  getDateFun(start, end)
}

const getDateFun = (start: string, end:string) => {
  startDate.value = start
  endDate.value = end
  getStatisticsData()
}
</script>

<style lang="scss" scoped>
.content {
  height: 100vh;
  overflow: auto;
  background: rgb(241,244,247);
  .date-box {
    // margin: 10px;
  }
}
</style>