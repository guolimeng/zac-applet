<!--
 * @作者: 郭莉猛
 * @Date: 2023-11-17 11:12:42
 * @FilePath: /uni-preset-vue-vite-ts 2/src/pages/businessManagement/components/dateModule.vue
 * @描述: 日期选择
 * 
-->
<template>
  <view class="date-wrap">
    <!-- 左边 -->
    <view class="date-tab">
      <view
        class="text "
        v-for="item in tabsData"
        :key="item.value"
        :class="{ 'date-active': currentActive === item.value }"
        @click="changeTab(item)"
      >
      {{ item.name }}
    </view>
    </view>
    <!-- 右侧 -->
    <view class="date-right" @click="dateBoxClick">
      <view class="date-nyr">
        <view :style="{ 'line-height': currentActive == '1' ? '25px' : '40px' }">
          <text v-if="currentActive == '0'">{{ dateData.day }}</text>

          <text v-if="currentActive == '1'">{{ dateData.month }}月第{{ dateData.weekOfMonth }}周</text>

          <text v-if="currentActive == '2'">{{ dateData.week }}</text>
        </view>
        <view class="sub-date" v-if="currentActive == '1'">{{dateData.startOfWeek}} - {{ dateData.endOfWeek }}</view>
      </view>
      <view class="line"></view>
      <view class="date-icon">
        <u-icon name="calendar-fill" top="6" color="#fff" size="28"></u-icon>
      </view>
    </view>
  </view>

  <u-datetime-picker
    :show="datesShow"
    v-model="datevValue"
    closeOnClickOverlay
    @close="datetimePickerClose"
    @cancel="datetimePickerClose"
    @confirm="datetimePickerConfirm"
    mode="date"
  ></u-datetime-picker>

  
</template>

<script setup lang="ts">
import dayjs from "dayjs";


const props = defineProps({
  defaultDateActive: {
    type: String,
    default: "1",
  },
});
const currentActive = ref("0");



const data = reactive({
  tabsData: [
    { name: '日', value: '0' },
    { name: '周', value: '1' },
    { name: '月', value: '2' },
  ],

  dateData: {
    day: '',
    week: '',
    month: '',
    weekOfMonth: '',
    startOfWeek: '',
    endOfWeek: ''
  },
  startDate: '',
  endDate: '',
})

const { tabsData, dateData, startDate, endDate } = toRefs(data);



const datevValue = ref(Date.now())
// 展示时间选择框
const datesShow = ref(false)
const dateBoxClick = () => {
  datesShow.value = true
}

// 关闭弹框
const datetimePickerClose = () => {
  datesShow.value = false
}

const emit = defineEmits(["changeDateTab", 'confirmDate']);

const datetimePickerConfirm = (item: any) => {
  let date = dayjs(item.value).format('YYYY-MM-DD')
  switch(currentActive.value) {
    case '0':
      dateData.value.day = dayjs(item.value).format('MM月DD日')
      endDate.value = `${dayjs(item.value).format('YYYY-MM-DD')} 24:00:00`
      startDate.value = `${dayjs(item.value).format('YYYY-MM-DD')} 00:00:00`
      // console.log('日', startDate.value, endDate.value,  );
      break
    case '1':
      dateData.value.month = getWeekInfo(date).month
      dateData.value.weekOfMonth = getWeekInfo(date).weekOfMonth
      dateData.value.startOfWeek = getWeekInfo(date).startOfWeek
      dateData.value.endOfWeek = getWeekInfo(date).endOfWeek

      let year = dayjs(item.value).format('YYYY')

      endDate.value = `${dayjs(`${year}-${getWeekInfo(date).endOfWeek_}`).format('YYYY-MM-DD')} 24:00:00`
      startDate.value = `${dayjs(`${year}-${getWeekInfo(date).startOfWeek_}`).format('YYYY-MM-DD')} 00:00:00`

      // console.log('周2', startDate.value, endDate.value );
      break
    case '2':
      dateData.value.week = dayjs(item.value).format('YYYY年MM月')

      endDate.value = dayjs(item.value).endOf('month').format('YYYY-MM-DD HH:mm:ss');
      startDate.value = dayjs(item.value).startOf('month').format('YYYY-MM-DD HH:mm:ss');

      // console.log('月',startDate.value, endDate.value,  );
      break
  }
  datetimePickerClose()
  emit("confirmDate", startDate.value, endDate.value);
}

// 监听
watch(
  () => props.defaultDateActive,
  (newValue) => {
    currentActive.value = newValue;
    datetimePickerConfirm({value: Date.now()})
  },
  { deep: true, immediate: true }
);


const changeTab = (item: any) => {
  currentActive.value = item.value;
  datetimePickerConfirm({value: Date.now()})
  emit("changeDateTab", item, item.value, startDate.value, endDate.value);
};

const getWeekInfo = (dateStr: string) => {
  // 将输入字符串转为日期对象
    let date = new Date(dateStr);

    // 获取本月的第一天是星期几（0-6，0代表星期天）
    let firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    // 计算指定日期是本月的第几周。注意Math.ceil向上取整，因此1-7号是第一周，8-14号是第二周，以此类推
    let weekOfMonth = Math.ceil((date.getDate() + firstDayOfMonth) / 7);

    // 获取这周的开始日期，即星期一的日期
    let startOfWeek = dayjs(new Date(date.getTime() - (date.getDay() - 1) * 24 * 60 * 60 * 1000)).format('MM.DD');
    let startOfWeek_ = dayjs(new Date(date.getTime() - (date.getDay() - 1) * 24 * 60 * 60 * 1000)).format('MM-DD');

    // 获取这周的结束日期，即星期天的日期
    let endOfWeek = dayjs(new Date(date.getTime() + (7 - date.getDay()) * 24 * 60 * 60 * 1000)).format('MM.DD');
    let endOfWeek_ = dayjs(new Date(date.getTime() + (7 - date.getDay()) * 24 * 60 * 60 * 1000)).format('MM-DD');

    var month = dayjs(dateStr).month() + 1;

    // 返回结果，包括周次、周开始和结束日期
    return {
        month: month,
        weekOfMonth: weekOfMonth,
        startOfWeek: startOfWeek,
        startOfWeek_: startOfWeek_,
        endOfWeek: endOfWeek,
        endOfWeek_: endOfWeek_
    };
}
</script>

<style lang="scss" scoped>
.date-wrap {
  display: flex;
  justify-content: space-between;
  background: #006cff;
  padding: 20px;
  
  .date-tab {
    display: flex;
    .text {
      margin-right: 10px;
      background: rgb(55,131,250);
      /* opacity: 0.2; */
      font-size: 20px;
      line-height: 40px;
      color: #fff;
      padding: 0 10px;
      border-radius: 7px;
    }
    .date-active {
      background: #fff;
      // opacity: 1;
      color: #006cff;
    }
  }
  .date-right {
    line-height: 40px;
    height: 40px;
    background: rgb(55,131,250);
    color: #fff;
    border-radius: 7px;
    display: flex;
    .date-nyr {
      padding: 0 20px;
      text-align: center;
      .sub-date {
        font-size: 12px;
        line-height: 12px;
      }
    }
    .line {
      margin: 7px 0;
      opacity: 0.3;
      border-left: 1px solid #fff;
    }
    .date-icon {
      margin: 0 4px;
    }
  }
}
</style>