<!--
 * @作者: 郭莉猛
 * @Date: 2023-11-08 19:36:29
 * @FilePath: /uni-preset-vue-vite-ts 2/src/pages/areaManagement/deviceMg/deviceList.vue
 * @描述: 设备列表
 * 
-->
<template>
  <view class="charge-wrap">
    <!-- 头部 -->
    <view class="charge-header">
      <view class="title">充设备列表</view>
      <view class="btn">
        <view class="btn-item" v-if="!isBatches" @click="batchesClick">
          <up-button type="primary" :plain="true" size="small"  color="#006cff" colo text="批量模式" ></up-button>
        </view>
        <view class="btn-item" v-if="!isBatches" @click="addDeviceClick">
          <up-button type="primary" size="small" color="#006cff" text="新增设备" ></up-button>
        </view>
        <view class="btn-item" v-if="isBatches" @click="batchesClick">
          <up-button type="error" :plain="true" size="small"  text="退出批量模式" ></up-button>
        </view>
      </view>
    </view>

    <!-- 搜索 -->
    <view class="search-plate">
      <view class="tab-wrap">
        <view 
          v-for="(item, index) in data.tab" 
          :key="index"
          :class="{ active: currentActive === index }"
          @click="handTab(item, index)"
          class="tab-wrap-item"
        >
          <text>{{ item.name }} ({{ item.num }})</text>
        </view>
      </view>
      <view class="reload" @click="getDeviceList">
        <u-icon name="reload" color="#006cff" top="5px" size="20px"></u-icon>
      </view>
    </view>

    <!-- 列表 -->
    <view v-for="(item, index) in listData" :key="index">
      <templateList
        type="device"
        :selection="selection"
        :listItemData="item"
        @listItemClick="listItemClick"
        @delClick="delClick"
      />
    </view>

    <view class="save-ledger" v-if="isBatches">
      <view class="select-all">
        <u-checkbox
            v-model.value="selectAll"
            shape="circle"
            @change="checkboxChange"
            label="全选"
            :disabled="listData.length > 0 ? false : true"
          >
          </u-checkbox>
          <!-- :disabled="listData.length > 0 ? false : true" -->
        <!-- <u-checkbox-group v-model="selectAll" @change="checkboxChange">
          <u-checkbox label="全选"></u-checkbox>
        </u-checkbox-group> -->
      </view>
      <view class="overhaul">
        <view class="selected">已选{{ selectedNum }}台</view>
        <view>
          <up-button type="primary" :plain="true" size="small"  color="#006cff" colo text="检修" :disabled="selectedNum > 0 ? false : true"></up-button>
        </view>
      </view>
    </view>
  </view>

  <u-popup
    :safeAreaInsetBottom="true"
    :safeAreaInsetTop="true"
    :mode="'center'"
    :overlay="true"
    :closeOnClickOverlay="true"
    :round="10"
    :show="popupShow"
    @close="close('edl')"
    :customStyle="{width: '80%'}"
  >
      <view class="tip-box">
          <text>{{ popupTitle }}</text>
          <view class="tip-box-btn">
            <up-button type="info" :plain="true" text="取消" :customStyle="{width: '100px'}" @click="cancelClick('del')"></up-button>
            <up-button type="primary" text="确定" :customStyle="{width: '100px'}" @click="confirmClick"></up-button>
          </view>
      </view>
  </u-popup>

  <u-popup
    :safeAreaInsetBottom="true"
    :safeAreaInsetTop="true"
    :mode="'bottom'"
    :overlay="true"
    :closeOnClickOverlay="true"
    :round="10"
    :show="addDeviceNumPopupShow"
    @close="close('add')"
  >
      <view class="add-device-box">
        <view class="title">添加设备</view>
        <view class="device-num">
          <up-input
            placeholder="请输入设备号"
            border="bottom"
            inputAlign="center"
            v-model="value"
            @change="change"
          ></up-input>
        </view>
        <view class="tip-box-btn">
          <!-- <up-button type="info" :plain="true" text="取消" :customStyle="{width: '100px'}" @click="cancelClick('add')"></up-button> -->
          <up-button type="primary" text="扫码添加设备" :customStyle="{margin: '0px 20px'}" @click="addScanCode"></up-button>
        </view>
      </view>
  </u-popup>
</template>

<script setup lang="ts">
import { onMounted, ref,reactive } from "vue";
import { onLoad, onReady, onReachBottom } from '@dcloudio/uni-app'
import templateList from "../components/templateList.vue";
import { deviceList, deviceDelete, deviceSave } from "@/api/areaManagement/areaManagement";
import { userStore } from "@/store/modules/user";
const userUserStore = userStore();
const props = defineProps({
  orgId: {
    type: String,
    default: "",
  },
  stationId: {
    type: String,
    default: "",
  },
  orgDto: {
    type: Object,
    default: {},
  }
})

const keyword = ref<string>('')
const currentActive = ref(0);

const deviceStatus = ref('')
const data = reactive({
  tab: [
    {  
      num: 3,
      name: '全部',
      status: ''
    },
    {  
      num: 9,
      name: '在线',
      status: 'Y'
    },
    {  
      num: 0,
      name: '离线',
      status: 'N'
    },
  ],
  listData: [],
  total: 1,
  parameter: {
    pageNo:1,
    pageSize:20,
  },
  popupTitle: '',
})
const { listData, parameter, total, tab, popupTitle } = toRefs(data);

const popupShow = ref(false);

const customStyle = reactive({
  width: '80%'
});

onMounted(()=> {
  console.log('onMounted', props.orgDto.facilityType);
  getDeviceList()
})

onReachBottom(()=> {
  if (total.value <= listData.value.length) {
    uni.showToast({
      title: '已加载全部数据',
      icon: "none"
    });
  } else {
    parameter.value.pageNo ++
    getDeviceList()
  }
})

// 设备列表
const getDeviceList =  () => {
  let param = {
    "stationId": props.stationId,
    "operatorId": userUserStore.operatorId,
    "pageNo": parameter.value.pageNo,
    "pageSize": parameter.value.pageSize,
    "status": deviceStatus.value
  }
  
  deviceList(param).then((res) => {
    let { data } = res
    listData.value = data.deviceDtoList || []
    if(Array.isArray(data.deviceDtoList) && data.deviceDtoList.length > 0) {
      data.deviceDtoList.forEach((item:any) => {
        item.checked = []
      });
    }

    tab.value.forEach((val: any) => {
      switch(val.status) {
        case '':
          val.num = listData.value.length
          break
        case 'Y':
          val.num = listData.value.filter((item:any) => item.status === 'Y').length
          break
        case 'N':
          val.num = listData.value.filter((item:any) => item.status === 'N').length
          break
      }
    })
    
    total.value = data.total
  });
}

// 切换tab
const handTab = (item: any, index: number) => {
  currentActive.value = index;
  deviceStatus.value = item.status
  getDeviceList()
};

const listItemClick = () => {
  // uni.navigateTo({
  //   url: `/pages/areaManagement/areaManagement/chargingStationDetails`,
  // });
}

// 添加设备
const deviceNum = ref('')
const addDeviceNumPopupShow = ref(false);
const addDeviceClick = () => {
  addDeviceNumPopupShow.value = true
}

// 扫码添加设备
const addScanCode = () => {
  uni.scanCode({
    // onlyFromCamera: true,
    success: function (res) {
      getDeviceInformation(res.result)
    }
  });
}

const getDeviceInformation = (manufacturer: string) => {
  let parts = manufacturer.split("/");  // 使用斜杠分割字符串
  let lastPart = parts.pop();  // 获取最后一部分

  let param = {
    manufacturer: lastPart,
    stationId: props.stationId
  }
  deviceSave(param).then((res) => {
    let { data } = res
    let isRepeat = listData.value.length > 0 ? listData.value.some((item: any) => {
      return item.manufacturer == data.device.manufacturer
    }) : false;
console.log('isRepeat', isRepeat);

    if(isRepeat) {
      uni.showToast({
        icon: "none",
        duration: 3000,
        title: `设备ID${data.device.manufacturer}已经存在`,
      });
    }else {
      // deviceData(data.device)
      getDeviceList()
      cancelClick('add')
    }
  });
}

// 删除设备
const deviceId = ref('')
const delClick = (item: any) => {
  console.log('删除设备',item);
  deviceId.value = item.deviceId
  popupTitle.value = `确认删除「${item.name}」`
  uni.$u.sleep().then(() => {
    cancelClick('del')
  })
}

const close = (type: string) => {
  switch(type) {
    case 'del':
      popupShow.value = false
      break
    case 'add':
      addDeviceNumPopupShow.value = false
      break
  }
  
}

const cancelClick = (type: string) => {
  switch(type) {
    case 'del':
      popupShow.value = !popupShow.value
      break
    case 'add':
      addDeviceNumPopupShow.value = !addDeviceNumPopupShow.value
      break
  }
  // popupShow.value = !popupShow.value
}

const confirmClick = () => {
  deviceDelete({ deviceId: deviceId.value }).then(
    (result) => {
      cancelClick('del')
      getDeviceList()
    }
  );
}

const selection = ref(false)

// 批量模式
const isBatches = ref(false)
const isDisabled = ref(false)
const batchesClick = () => {
  isBatches.value = !isBatches.value
  selection.value = !selection.value
  // isDisabled.value = listData.value.length > 0 ? false : true
}

// 全选
const selectAll = ref(false)
const selectedNum = ref(0)

const checkboxChange = (val: any) => {
  // console.log('全选', val);
  listData.value.forEach((item: any) => {
    item.checked = val ? [item.deviceId] : []
  })
  selectedNum.value = val ? listData.value.length  : 0
}
</script>

<style style lang="scss" scoped>
.charge-wrap {
  margin: 15px;
  padding: 15px;
  border-radius: 5px;
  background: #fff;
  .charge-header {
    display: flex;
    justify-content: space-between;
    .title {
      font-size: 16px;
      font-weight: bold;
    }
    .btn {
      display: flex;
      .btn-item {
        margin-left: 10px;
      }
    }
  }
  .search-plate {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    .tab-wrap {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .tab-wrap-item {
        cursor: pointer;
        height: 30px;
        padding: 0 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #eaedf0;
        font-size: 12px;
        color: #000;
        border-radius: 15px;
        margin-right: 12px;
      }
      .reload {
        padding-left: 30px;
      }
      .active {
        background-color: #006cff;
        color: #fff;
      }
    }
  }
}

.save-ledger {
  position: fixed;
  left: 0;
  bottom: 0;
  background: #fff;
  height: 8%;
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  padding: 15px;
  width: calc(100% - 30px);
  .select-all {
    
  }
  .overhaul {
    display: flex;
    .selected {
      font-size: 16px;
      line-height: 30px;
      padding-right: 10px;
    }
  }
}

.tip-box {
  text-align: center;
}
.tip-box-btn {
  display: flex;
  padding: 20px 0;
}
.add-device-box {
  .title {
    margin-top: -30px;
    padding: 0px 0 20px 10px;
    border-bottom: 1px solid #000;
  }
  .device-num {
    padding: 20px 20px 10px 20px;
  }
}
</style>