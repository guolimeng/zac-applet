<!--
 * @作者: 郭莉猛
 * @Date: 2023-11-06 18:02:07
 * @FilePath: /uni-preset-vue-vite-ts 2/src/pages/areaManagement/chargingStation/components/stationInfo.vue
 * @描述: 充电站基本信息
 * 
-->
<template>
  <view class="wrap">
    <view class="main">
      <q-form-data
        ref="uForm"
        class="uForm"
        :labelPosition="'left'"
        v-model:value="formData"
        :labelWidth="'110'"
        :rules="rules"
        :labelStyle="{
          'color': 'rgb(144,146,155)',
          'padding-left': '10px'
        }"
      >
        <template #stationIndividuation>
          <u-switch v-model="paymentValue" @change="switchChange"></u-switch>
        </template>
      </q-form-data>
      <view class="delete-area" v-if="stationId" @click="areaDeleteClick">
        <view class="delete-btn">删除充电站1</view>
      </view>
    </view>
    

    <view class="save-ledger" >
      <!-- 保存 -->
      <view class="btn" @click="confirm">保存</view>
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
    @close="close"
    :customStyle="customStyle"
  >
      <view class="tip-box">
          <text>{{ popupTitle }}</text>
          <view class="tip-box-btn">
            <up-button type="info" :plain="true" text="取消" :customStyle="{width: '100px'}" @click="cancelClick"></up-button>
            <up-button type="primary" text="确定" :customStyle="{width: '100px'}" @click="confirmClick"></up-button>
          </view>
      </view>
  </u-popup>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { onLoad, onReady } from '@dcloudio/uni-app'
import { stationDelete, stationSave, stationDetail, areaOrgList } from "@/api/areaManagement/areaManagement";

import { clearingAccountChargeConfigList } from "@/api/ledgerManagement/ledgerManagement";
import { chargeConfigList } from "@/api/billingTemplate/billingTemplate";

import { userStore } from "@/store/modules/user";
const userUserStore = userStore();

const props = defineProps({
  stationId: {
    type: String,
    default: "",
  },
})

const paymentValue = ref(false);

const popupShow = ref(false);

const customStyle = reactive({
  width: '80%'
});

const uForm = ref();

onMounted(()=> {
  getAreaList()
  getBilMethod()
  getAccountMethod()

  if(props.stationId) {
    // console.log('cddd',props.stationId);
    
    getAreaDetailst()
  }
})

const eventChangeKey = (val: any, key: string) => {
  let keys = ''
  keys = `${subKey(key, 'N')}Id`
  
  formData.value.data[keys] = val.value
  // console.log('keys',keys,formData.value.data);
  
}

// 
const subKey = (key: string, str: string) => {
  let strIndex = key.indexOf(str)
  return key.substring(0,strIndex)
}

const validatorFun = (rule:any, value:any, callback:any) => {
  // console.log('rule',value, rule, formData.value.data.type);
  
  if(formData.value.data.type.includes(ruleKey.value[rule.field]) && !value) {
    callback(ruleMessage.value[rule.field]);
  }else {
    callback();
  }
}

const data = reactive({
  formData: {
    sets: {
      showTags: true,
      list: [
        {
          title: '基本信息',
          object: {
            stationName: {
              type: "input",
              name: '充电站名称',
              placeholder: "请填写充电站名称",
              clearable: false,
              border: 'none'
            },
            orgName: {
              type: "select",
              name: '所属片区',
              border: 'none',
              typeSet: {
                data: [],
                sheetTitle: '所属片区',
                eventChange: eventChangeKey
              },
            },
            ip: {
              type: "input",
              name: '网关ID',
              placeholder: "请填写网关ID",
              border: 'none',
            },
          }
        },
        {
          title: '充电站个性化',
          slotHeaderRight: 'stationIndividuation',
          object: {
          }
        },
        {
          title: '计费方式',
          hidden: true,
          object: {
            twoBillingName: {
              type: "select",
              name: '计费模板',
              border: 'none',
              typeSet: {
                data: [],
                sheetTitle: '两轮充计费',
                eventChange: eventChangeKey
              },
            },
          }
        },
        {
          title: '分账方式',
          hidden: true,
          object: {
            clearingConfigName: {
              type: "select",
              name: '分账模板',
              border: 'none',
              typeSet: {
                data: [],
                sheetTitle: '分账模板',
                eventChange: eventChangeKey
              },
            },
          }
        },
      ]
    },
    data: {
      stationName: '',
      orgName: '',
      orgId: '',
      ip: '',

      // 两轮充计费
      twoBillingName: '',
      twoBillingId: '',
      // 分账方式
      clearingConfigName: '',
      clearingConfigId: '',
    },
  },
  rules: {
    'stationName': [{ type: 'string', required: true, message: '请填写充电站名称', trigger: ['blur', 'change']}],
    'orgName': { type: 'string', required: true, message: '请选择所属片区', trigger: ['blur', 'change']},
  },

  // 分账模板的下拉数据
  optionsNameType: [],

  ruleKey: {
    'twoBillingName': '01',
    'carBillingName': '02',
    'rechargeBillingName': '03',
    'tradeBillingName': '04',
  },
  ruleMessage: {
    'twoBillingName': '请选择两轮充计费',
    'carBillingName': '请选择汽车充计费',
    'rechargeBillingName': '请选择充电柜计费',
    'tradeBillingName': '请选择换电柜计费',
  },
  popupTitle: ''
})

let { formData, rules, optionsNameType, ruleKey, ruleMessage, popupTitle } = toRefs(data);

// 详情
const getAreaDetailst =  () => {
  let param = {
    "stationId": props.stationId,
  }
  
  stationDetail(param).then((res) => {
    let { data } = res
    formData.value.data = data
    // console.log('formData.value',formData.value.data);
  });
}

// 个性化按钮
const switchChange = (val: any) => {
  if(val) {
    formData.value.sets.list[2].hidden = false
    formData.value.sets.list[3].hidden = false
  }else {
    formData.value.sets.list[2].hidden = true
    formData.value.sets.list[3].hidden = true
  }
}

//片区
const getAreaList=()=>{
  let params={
    operatorId: userUserStore.operatorId,
    'pageNo': 1,
    'pageSize': 30
  }
  areaOrgList(params).then((res)=>{
    let {data}=res 
    data.orgDtos.forEach((item:any) => {
      item.label = item.name
      item.value = item.orgId
    })

    isSetData('orgName', data.orgDtos, 0)
  })
}

//计费方式
const getBilMethod=()=>{
  let params={
    operatorId: userUserStore.operatorId
  }
  chargeConfigList(params).then((res)=>{
    let {data}=res 
    data.chargeConfigInfoList.forEach((item:any) => {
      item.label = item.templateName
      item.value = item.chargeConfigId
    })

    isSetData('twoBillingName', data.chargeConfigInfoList, 2)
  })
}

//分账方式
const getAccountMethod =()=>{
  let param={
    operatorId: userUserStore.operatorId
  }
  clearingAccountChargeConfigList(param).then((res)=>{
    let {data}=res
    data.clearingConfigDtos.forEach((item:any) => {
      item.label = item.clearingConfigName
      item.value = item.clearingConfigId
    })

    isSetData('clearingConfigName', data.clearingConfigDtos, 3)
  })
}

// 保存
const confirm = () => {
  let formEl = uForm.value.$refs.formRef;
  let formDataList = formData.value.data;
  formDataList.operateType = props.stationId ? '02' : '01'
  // console.log('保存', formDataList);
  
  // return
  if (!formEl) return;
  formEl.validate().then( (valid: any) => {
    if (valid) {
      stationSave(formDataList).then((res) => {
        uni.navigateTo({
          url: `/pages/areaManagement/chargingStation/chargingStationDetails?stationId=${formDataList.stationId}&orgId=${formDataList.orgId}`,
        });
      });
      // console.log('成功');
      
    } else {
      return false;
    }
  });
}

// 删除充电站
const areaDeleteClick = () => {
  // console.log('formData.value.data',formData.value.data);
  
  popupTitle.value = `确认删除「${formData.value.data.stationName}」`
  uni.$u.sleep().then(() => {
    popupShow.value = !popupShow.value
  })
}

const jumpRoute = () => {
  uni.navigateTo({
    url: `/pages/areaManagement/areaManagement/areaDetails?orgId=${formData.value.data.orgId}`,
  });
  // uni.switchTab({
  //   url: `/pages/areaManagement/areaManagement/areaList`,
  //   success: (res) => {
  //     let page = getCurrentPages().pop();
  //     if (page == undefined || page == null) return;
  //     page.onLoad();
  //   }
  // });
}

const close = () => {
  popupShow.value = false
}

const cancelClick = () => {
  popupShow.value = !popupShow.value
}

const confirmClick = () => {
  stationDelete({ stationId: props.stationId }).then(
    (result) => {
      cancelClick()
      jumpRoute()
    }
  );
}

const isHidden = (key: string, state: boolean) => {
  return formData.value.sets.list[2].object[key].hidden = state
}

const isSetData = (key: string, data: any, index: number) => {
  return formData.value.sets.list[index].object[key].typeSet.data = data
}

</script>

<style lang="scss" scoped>
.wrap {
  height: 100vh;
  background: rgb(241,244,247);
  .main {
    padding: 0 5px;
    background: #fff;
    height: calc(100% - 90px);
    overflow: auto;
    .uForm {
      .form-line-padd {
        // margin-right: 5px;
      }
      .conditionSetting-item {
        display: flex;
        flex-wrap: wrap;
        .item-label {
          line-height: 58px;
        }
        :deep(.u-cell__body){
          padding: 7px 15px !important;
          height: 36px;
        }
      }
      .mount-list {
        display: flex;
        flex-wrap: wrap;
        // align-items: initial;
        .mount-item {
          width: 90px;
          padding-right: 10px;
        }
      }
      .add-btn {
        display: flex;
        padding-left: 5px;
      }
    }
    
  }
  .delete-area {
    margin: 15px 0;
    .delete-btn {
      line-height: 50px;
      background: #fff;
      text-align: center;
      color: red;
      border: 1px solid red;
      border-radius: 5px;
    }
    .tip {
      font-size: 12px;
      margin: 0 10px;
      color: #c1c4cB;
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
.tip-box {
  text-align: center;
}
.tip-box-btn {
  display: flex;
  padding: 20px 0;
}
</style>