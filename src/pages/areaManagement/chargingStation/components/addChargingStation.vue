<!--
 * @作者: 郭莉猛
 * @Date: 2023-11-11 14:32:04
 * @FilePath: /uni-preset-vue-vite-ts 2/src/pages/areaManagement/chargingStation/components/addChargingStation.vue
 * @描述: 创建充电站
 * 
-->
<template>
  <view class="wrap">
    <view class="header">
      <view class="title">{{orgName}}</view>
      <view class="right-btn">
        <u-icon name="plus-circle-fill" color="#2979ff" size="18"></u-icon>
        <text class="add-btn" @click="addChargingStationClick">新增充电站</text>
      </view>
    </view>

    <view class="main">
      <view >
        <u--form
          labelPosition="left"
          :model="formModel"
          :rules="rules"
          :labelWidth="'110'"
          ref="uForm"
        >
        <view style="display: none;">
          <u-icon name="trash"  size="25" ></u-icon>
         </view>
          <view class="main-item" v-for="(d, k) of formModel.stationLists" :key="k">
              <u-form-item
                  label="充电站名称："
                  :prop="`stationLists.${k}.stationName`"
                  borderBottom
              >
                <u--input
                  v-model="d.stationName"
                  border="none"
                  placeholder="请输入充电站名称"
                >
                  <template #suffix>
                    <view style="padding-left: 15px;" @click="delStationClick(k)">
                      <!-- 删除 -->
                      <u-icon name="trash"  size="25"></u-icon>
                    </view>
                  </template>
                </u--input>
              </u-form-item>
              <u-form-item
                  label="充电站类型"
                  :prop="`stationLists.${k}.stationTypeName`"
                  borderBottom
                  @click="actionSheetClick('stationTypeName', k)"
              >
                <u--input
                  v-model="d.stationTypeName"
                  disabled
                  disabledColor="#ffffff"
                  placeholder="请选择充电站类型"
                  border="none"
                ></u--input>
                <template #right>
                  <u-icon
                    slot="right"
                    name="arrow-right"
                    color="#c1c4cB"
                  ></u-icon>
                </template>
                <!-- <u-cell
                  :title="d.stationTypeName || '请选择充电站类型'"
                  :isLink="true"
                  :border="false"
                  :titleStyle="{'color': d.stationTypeName ? '#000': '#c1c4cB'}"
                  @click="actionSheetClick('stationTypeName', k)"
                ></u-cell> -->
              </u-form-item>

              <u-form-item
                  label="设备类型"
                  :prop="`stationLists.${k}.facilityTypeName`"
                  v-if="d.stationTypeName == '两轮充' || d.stationTypeName == '汽车充'"
                  borderBottom
                  @click="actionSheetClick('facilityTypeName', k)"
              >
                <u--input
                  v-model="d.facilityTypeName"
                  disabled
                  disabledColor="#ffffff"
                  placeholder="请选择设备类型"
                  border="none"
                ></u--input>
                <template #right>
                  <u-icon
                    slot="right"
                    name="arrow-right"
                    color="#c1c4cB"
                  ></u-icon>
                </template>
                <!-- <u-cell
                  :title="d.facilityTypeName || '请选择设备类型'"
                  :isLink="true"
                  :border="false"
                  :titleStyle="{'color': d.facilityTypeName ? '#000': '#c1c4cB'}"
                  @click="actionSheetClick('facilityTypeName', k)"
                ></u-cell> -->
              </u-form-item>
              <u-form-item
                  label="网关ID"
                  :prop="`stationLists.${k}.ip`"
                  v-if="d.facilityTypeName == '组网版'"
                  borderBottom
              >
                <u--input
                    v-model="d.ip"
                    border="none"
                    placeholder="请输入网关ID"
                ></u--input>
              </u-form-item>
          </view>
      </u--form>
      </view>
    </view>

    <view class="save-ledger" >
      <!-- 保存 -->
      <view class="btn" @click="confirm">完成添加</view>
    </view>
  </view>
  <u-action-sheet
    :show="showType"
    :actions="actions"
    :title="actionSheetTitle"
    @close="actionSheetCloseClick"
    @select="sheetSelect"
  >
  </u-action-sheet>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onLoad, onReady } from '@dcloudio/uni-app'
import { stationSaveList } from "@/api/areaManagement/areaManagement";

const uForm = ref();

const validatorFun = (rule:any, value:any, callback:any) => {
  formModel.value.stationLists.forEach((item: any) => {
    if(rule.field == 'ip') {
      if(item.facilityTypeName == '组网版' && !value) {
        callback('请输入网关ID');
      }else {
        callback();
      }
    } else if(rule.field == 'facilityTypeName'){
      if((item.stationTypeName == '两轮充'|| item.stationTypeName == '汽车充') && !value) {
        callback('请选择设备类型');
      }else {
        callback();
      }
    }else {
      callback();
    }
    
  })
}

const data = reactive({
  formModel:{
    // name: '',
    stationLists: [
      {
        stationName: '',
        stationTypeName: '',
        stationType: '',
        facilityTypeName: '',
        facilityType: '',
        ip: '',
      }
    ],
  },
  rules: {},
  defaultRules: {
    'stationLists.0.stationName': {
      required: true,
      message: '请输入充电站名称',
      trigger: ['change','blur'],
    },
    'stationLists.0.stationTypeName': {
      required: true,
      message: '请选择充电站类型',
      trigger: ['change','blur'],
    },
    'stationLists.0.facilityTypeName': {
      required: true,
      validator: validatorFun,
      // message: '请选择设备类型',
      trigger: ['change','blur'],
    },
    'stationLists.0.ip': [{
      validator: validatorFun,
      required: true,
      // message: '请输入网关ID',
      trigger: ['change','blur'],
    }],
  },
  actions: [],
  chargingStationTypeactions: [
    { name: "两轮充", value: "01" },
    { name: "汽车充", value: "02" },
    { name: "充电柜", value: "03" },
    { name: "换电柜", value: "04" },
  ],
  facilityTypeActions: [
    { name: "组网版", value: "01" },
    { name: "独立版", value: "02" },
    { name: "AEP版", value: "03" },
    { name: "六路机", value: "04" },
    { name: "十二路机", value: "05" },
    { name: "十路机", value: "06" },
  ],
  carFacilityTypeActions: [
    { name: "汽车交流充", value: "07" },
    { name: "汽车直流充", value: "08" },
  ],
  model: {
    name: '',
    list: [
      {hour: '', price: ''}
    ]
  },
  rules1: {
    'list.0.hour': {
      required: true,
      message: '请输入时间',
      trigger: ['change','blur'],
    },
    'list.0.price': {
      required: true,
      message: '请输入价格',
      trigger: ['change','blur'],
    },
  }
})

let { formModel, rules, defaultRules, actions, chargingStationTypeactions, facilityTypeActions, carFacilityTypeActions, model,rules1 } = toRefs(data);

onMounted(() => {
  rules.value = defaultRules.value
  // console.log('rules.value',rules.value);
  
})

const orgId = ref<string>('')
const orgName = ref<string>('')
onLoad((option) => {	//这里可以接收到一个参数option
  orgId.value = option.orgId
  orgName.value = option.orgName

  console.log('片区option', orgId.value, option);
})

// 动态添加
const addChargingStationClick = () => {
  formModel.value.stationLists.push({
    stationName: '',
    stationTypeName: '',
    stationType: '',
    facilityTypeName: '',
    facilityType: '',
    ip: '',
  })
  // console.log('添加',formModel.value.stationLists);
  addRules()
}

// 
const showType = ref(false)
const showTypeKey = ref<string>('')
const showTypeIndex = ref<string>('')
const actionSheetTitle = ref<string>('充电站类型')

// 打开弹框
const actionSheetClick = (key: string, index: string) => {
  showTypeKey.value = key
  showTypeIndex.value = index
  switch(key) {
    case 'stationTypeName':
      actionSheetTitle.value = '充电站类型'
      actions.value = chargingStationTypeactions.value
      break
    case 'facilityTypeName':
      actionSheetTitle.value = '设备类型'

      switch(formModel.value.stationLists[showTypeIndex.value].stationType) {
        case '01':
          actions.value = facilityTypeActions.value
          break
        case '02':
          actions.value = carFacilityTypeActions.value
          break
      }
      
      break
  }
  showType.value = true
}

// 关闭弹框
const actionSheetCloseClick = () =>{
  showType.value = false
  showTypeKey.value = ''
  showTypeIndex.value = ''
}

// 弹框选中
const sheetSelect = (e: any) => {
  let keys = subKey(showTypeKey.value, 'N')
  
  formModel.value.stationLists[showTypeIndex.value][showTypeKey.value] = e.name
  formModel.value.stationLists[showTypeIndex.value][keys] = e.value

  switch(showTypeKey.value) {
    case 'stationTypeName':
      formModel.value.stationLists[showTypeIndex.value].facilityTypeName = ''
      formModel.value.stationLists[showTypeIndex.value].facilityType = ''
      break
  }

  uForm.value.validateField(`stationLists.${showTypeIndex.value}.${showTypeKey.value}`)
  actionSheetCloseClick()
}

// 删除
const delStationClick = (index: string) => {
  formModel.value.stationLists.splice(index, 1);
  delRules(index, 'stationName')
  delRules(index, 'stationTypeName')
  delRules(index, 'facilityTypeName')
  delRules(index, 'ip')
  
}

// 确认添加
const confirm = () => {
  let param = {
    ...formModel.value,
    orgId: orgId.value,
  }
  uForm.value.validate().then(res => {
    stationSaveList(param).then((res) => {
      uni.navigateTo({
        url: `/pages/areaManagement/areaManagement/areaDetails?orgId=${param.orgId}`,
      });
    });
  }).catch(errors => {
    uni.$u.toast('校验失败')
  })
}

const subKey = (key: string, str: string) => {
  let strIndex = key.indexOf(str)
  return key.substring(0,strIndex)
}

const addRules = () => {
  const index = formModel.value.stationLists.length - 1
  const rule = {
    [`stationLists.${index}.stationName`]: {
      required: true,
      message: '请输入充电站名称',
      trigger: ['change','blur'],
    },
    [`stationLists.${index}.stationTypeName`]: {
      required: true,
      message: '请选择充电站类型',
      trigger: ['change','blur'],
    },
    [`stationLists.${index}.facilityTypeName`]: {
      validator: validatorFun,
      required: true,
      // message: '请选择设备类型',
      trigger: ['change','blur'],
    },
    [`stationLists.${index}.ip`]: {
      validator: validatorFun,
      required: true,
      // message: '请输入网关ID',
      trigger: ['change','blur'],
    },
  }
  rules.value = {...rules.value, ...rule}
  
}

const delRules = (index: string, key: string) => {
  let keys = `stationLists.${index}.${key}`
  delete rules.value[keys];
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