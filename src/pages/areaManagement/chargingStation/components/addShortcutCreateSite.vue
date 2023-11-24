<!--
 * @作者: 郭莉猛
 * @Date: 2023-11-11 18:14:54
 * @FilePath: /uni-preset-vue-vite-ts 2/src/pages/areaManagement/chargingStation/components/addShortcutCreateSite.vue
 * @描述: 快捷键站
 * 
-->
<template>
  <view class="wrap">
    <view class="header">
      <view class="title">{{ queryData?.facilityType ? circuitStatus[queryData.facilityType] : '请扫码添加' }}</view>
      <view class="right-btn">
        <u-icon name="scan" color="#2979ff" size="18"></u-icon>
        <text class="add-btn" @click="rescanCodeClick">重新扫码</text>
      </view>
    </view>

    <view class="main" >
      <view class="main-item">
        <u-steps :current="currentSteps" dot>
          <u-steps-item title="扫码获取" ></u-steps-item>
          <u-steps-item title="添加充电站" ></u-steps-item>
          <u-steps-item title="添加设备" ></u-steps-item>
        </u-steps>
      </view>

      <u--form
        labelPosition="left"
        :model="formModel"
        :rules="rules"
        :labelWidth="'110'"
        ref="uForm"
      >

        <view class="btn-module">
          <view class="title">充电站信息</view>
        </view>

        <view class="main-item">
          <u-form-item
            label="充电站个性化"
            :prop="`personalization`"
            borderBottom
          >
            <u-switch v-model="formModel.personalization" ></u-switch>
          </u-form-item>

          <u-form-item
            label="片区名称"
            :prop="`orgName`"
            borderBottom
          >
            <u-cell
              :title="formModel.orgName || '请选择片区名称'"
              :isLink="true"
              :border="false"
              :titleStyle="{'color': formModel.orgName ? '#000': '#c1c4cB'}"
              @click="orgNameClick"
            ></u-cell>
          </u-form-item>

          <u-form-item
            label="充电站名称"
            :prop="`stationName`"
            borderBottom
          >
            <u--input
              v-model="formModel.stationName"
              border="none"
              placeholder="请输入充电站名称"
              @blur="stationNameBlur"
            >
            </u--input>
          </u-form-item>

          <u-form-item
            label="计费模板"
            :prop="`formModel.orgName`"
            borderBottom
            v-if="formModel.personalization"
          >
            <u-cell
              :title="formModel.orgName || '请选择分账模板'"
              :isLink="true"
              :border="false"
              :titleStyle="{'color': formModel.orgName ? '#000': '#c1c4cB'}"
              @click="orgNameClick"
            ></u-cell>
          </u-form-item>

          <u-form-item
            label="分账模板"
            :prop="`formModel.orgName`"
            borderBottom
            v-if="formModel.personalization"
          >
            <u-cell
              :title="formModel.orgName || '请选择分账模板'"
              :isLink="true"
              :border="false"
              :titleStyle="{'color': formModel.orgName ? '#000': '#c1c4cB'}"
              @click="orgNameClick"
            ></u-cell>
          </u-form-item>

        </view>

        <view class="btn-module" v-if="formModel.stationName && !formModel.personalization">
          <view class="title">设备信息</view>
          <view class="device-module" @click="addDeviceClick">
            <u-icon name="plus-circle-fill" color="#2979ff" size="16" ></u-icon>
            <text class="add-btn" >添加设备</text>
          </view>
        </view>
        
        <view 
          class="main-item" 
          v-if="formModel.stationName && !formModel.personalization"
          v-for="(d, k) of formModel.deviceInfoList" :key="k">
          <u-form-item
              label="设备号"
              :prop="`deviceInfoList.${k}.name`"
              borderBottom
          >
            <u--input
              v-model="d.name"
              border="none"
              placeholder="请输入设备号"
            >
            </u--input>
          </u-form-item>
          <u-form-item
              label="设备ID"
              :prop="`deviceInfoList.${k}.manufacturer`"
              borderBottom
          >
            <u--input
              v-model="d.manufacturer"
              border="none"
              placeholder="请输入设备ID"
            >
            </u--input>
          </u-form-item>

          <u-form-item
              label="设备标签"
              :prop="`deviceInfoList.${k}.facilityTypeName`"
              borderBottom
          >
            <u--input
              v-model="d.facilityTypeName"
              border="none"
              placeholder="请输入设备标签"
            >
            </u--input>
          </u-form-item>
        </view>
      </u--form>
    </view>

    <view class="save-ledger" >
      <!-- 保存 -->
      <view class="btn" @click="confirm">完成添加</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onLoad, onReady } from '@dcloudio/uni-app'
import { stationList, deviceVerify, deviceVerifyDevices, stationSave } from "@/api/areaManagement/areaManagement";
const uForm = ref();

const currentSteps = ref<number>(1)

const data = reactive({
  formModel:{
    personalization: false,
    orgName: '',
    orgId: '',
    stationName: '',
    deviceInfoList: [],
  },
  rules: {},
  defaultRules: {
    'stationName': [{
      required: true,
      message: '请输入充电站名称',
      trigger: ['change','blur'],
    }],
    'deviceInfoList.0.name': {
      required: true,
      message: '请输入名称',
      trigger: ['change','blur'],
    },
  },
  // 电路状态
  circuitStatus: {
    "01": '组网版',
    "02": '独立版',
    "03": 'AEP版',
    "04": '六路机',
    "05": '十二路机',
    "06": '十路机',
    "07": '汽车交流',
    "08": '汽车直流',
  },
  actions: [],
  queryData: {}
})

let { formModel, rules, defaultRules, actions, chargingStationTypeactions, deviceTypeActions, carDeviceTypeActions, queryData, circuitStatus } = toRefs(data);


onLoad((option) => {	//这里可以接收到一个参数option
console.log('option',option.query);

  if(option.query) {
    let item = JSON.parse(decodeURIComponent(option.query))
    detailDataFun(item)
  }else {
    currentSteps.value = 0
  }
  console.log('dddd',queryData.value);
  
  rules.value = defaultRules.value
})

onReady(()=> {
  uForm.value.setRules(rules.value)
})

const detailDataFun = (item: any) => {
  if(item.name) {
    formModel.value.orgName = item.name
    formModel.value.orgId = item.id
  } else {
    formModel.value.orgName = item.orgName
    formModel.value.orgId = item.orgId
  }
  queryData.value = item
  

  deviceData(item, item.device)
}

// 设备赋值
const deviceData = (item: any, device?: any) => {
  let obj = {
    name: Number(formModel.value.deviceInfoList.length) + 1,
    manufacturer: item.manufacturer,
    facilityTypeName: circuitStatus.value[queryData.value.facilityType],
    facilityType: queryData.value.facilityType,
    deviceId: device ? item.device.chargeId : item.chargeId
  }
  formModel.value.deviceInfoList.push(obj)
}

// 选择片区
const orgNameClick = () => {

  uni.navigateTo({
    url: `/pages/areaManagement/chargingStation/components/selectArea?query=${encodeURIComponent(JSON.stringify(queryData.value))}`,
  });
}

// 重新扫码
const rescanCodeClick = () => {
  uni.scanCode({
    // onlyFromCamera: true,
    success: function (res) {
      getDeviceData(res.result)
    }
  });
}

const getDeviceData = (manufacturer: string) => {
  let parts = manufacturer.split("/");  // 使用斜杠分割字符串
  let lastPart = parts.pop();  // 获取最后一部分

  let param = {
    manufacturer: lastPart,
    orgId: queryData.value.orgId
  }
  deviceVerify(param).then((res) => {
    let { data } = res
    // detailDataFun(data)
    queryData.value.device = data.device
    queryData.value.facilityTypeName = circuitStatus.value[data.facilityType]
    queryData.value.facilityType = data.facilityType
    queryData.value.stationType = data.stationType
    formModel.value.orgName = queryData.value.orgName
    formModel.value.orgId = queryData.value.orgId
    formModel.value.stationName = ''
    formModel.value.personalization = false
    currentSteps.value = 1
    
    formModel.value.deviceInfoList = []
    deviceData(queryData.value, queryData.value.device)
    resetRules()
  });
}

// 添加设备
const addDeviceClick = () => {
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
    facilityType: queryData.value.facilityType
  }
  deviceVerifyDevices(param).then((res) => {
    let { data } = res
    let isRepeat = formModel.value.deviceInfoList.some((item: any) => {
      return item.manufacturer == data.device.manufacturer
    });
    
    if(isRepeat) {
      uni.showToast({
        icon: "none",
        duration: 3000,
        title: `设备ID${data.device.manufacturer}已经存在`,
      });
    }else {
      deviceData(data.device)
      addRules()
    }
  });
}

// 充电站名称失去焦点
const stationNameBlur = (val:any) => {
  currentSteps.value = val ? 2 : 1
}

// 确认添加
const confirm = () => {
  let param = {
    ...formModel.value,
    stationType: queryData.value.stationType,
    facilityType: queryData.value.facilityType,
    detailedAddress: queryData.value.detailedAddress,
    orgId: queryData.value.orgId,
    operateType: '01'
  }
  uForm.value.validate().then((res: any) => {
      // uni.$u.toast('校验通过')
    stationSave(param).then((res) => {
      let { data } = res
      uni.navigateTo({
        url: `/pages/areaManagement/areaManagement/areaDetails?orgId=${param.orgId}`,
      });
    });
  }).catch(errors => {
    console.log('errors',errors);
    // uni.$u.toast('校验失败')
  })
}

const addRules = () => {
  const index = formModel.value.deviceInfoList.length - 1
  const rule = {
    [`deviceInfoList.${index}.name`]: {
      required: true,
      message: '请输入名称',
      trigger: ['change','blur'],
    },
  }
  rules.value = {...rules.value, ...rule}
  
}
const resetRules = () => {
  rules.value = defaultRules.value
}
</script>

<style lang="scss" scoped>
.wrap {
  height: 100vh;
  background: rgb(241,244,247);

  .header {
    position: fixed;
    left: 0;
    top: 0;
    background: #fff;
    width: calc(100% - 30px);
    height: 45px;
    line-height: 45px;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    .title {
      font-size: 18px;
      font-weight: bold;
    }
    .right-btn {
      display: flex;
      .add-btn {
        font-size: 16px;
        color: #2979ff;
        padding-left: 5px;
      }
    }
  }

  .main {
    margin-top: 45px;
    height: calc(100% - 130px);
    overflow: auto;
    .main-item {
      margin: 15px;
      padding: 15px;
      border-radius: 5px;
      background: #fff;
    }
    .btn-module {
      margin: 15px;
      // padding: 15px;
      .title {
        font-size: 18px;
        font-weight: bold;
      }
      .device-module {
        margin-top: 10px;
        display: flex;
        border: 1px solid #d6d7d9;
        font-size: 16px;
        line-height: 40px;
        background: #fff;
        color: #2979ff;
        justify-content: center;
        .add-btn {
          padding-left: 5px;
        }
      }
    }
    
  }

  .save-ledger {
    position: fixed;
    left: 0;
    bottom: 0;
    background: #fff;
    width: 100%;
    height: 12%;
    .btn {
      margin: 10px;
      font-size: 16px;
      line-height: 40px;
      text-align: center;
      color: #fff;
      width: calc(100% - 20px);
      background: rgb(30,102,235);
    }
  }
}
:deep(.u-cell__body) {
  padding-left: 0 !important;
}
</style>