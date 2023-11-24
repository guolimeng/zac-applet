<!--
 * @作者: 郭莉猛
 * @Date: 2023-11-06 18:02:07
 * @FilePath: /uni-preset-vue-vite-ts 2/src/pages/areaManagement/areaManagement/components/areaInfo.vue
 * @描述: 片区基本信息
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
      ></q-form-data>
      <view class="delete-area" v-if="orgId" @click="areaDeleteClick">
        <view class="delete-btn">删除片区</view>
        <view class="tip">*当片区下无充电站时才能删除片区</view>
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
import { areaOrgDelete, areaOrgSave, rechargeConfigList, areaOrgDetail } from "@/api/areaManagement/areaManagement";

import { clearingAccountChargeConfigList } from "@/api/ledgerManagement/ledgerManagement";
import { chargeConfigList } from "@/api/billingTemplate/billingTemplate";

import { userStore } from "@/store/modules/user";
const userUserStore = userStore();

const props = defineProps({
  orgId: {
    type: String,
    default: "",
  },
})

const popupShow = ref(false);

const customStyle = reactive({
  width: '80%'
});

const uForm = ref();

onMounted(()=> {
  getBilMethod('twoBillingName', '01')
  getBilMethod('carBillingName', '02')
  getBilMethod('rechargeBillingName', '03')
  getBilMethod('tradeBillingName', '04')
  getAccountMethod()

  getRechargeConfigList('rechargeConfigBikeStoredValueName', '02')
  getRechargeConfigList('rechargeConfigCarStoredValueName', '03')

  if(props.orgId) {
    getAreaDetailst()
  }
})

// 产品类型
const checkboxChange = (val: any) => {
  if(val.includes('01')){
    isHidden('twoBillingName', false)
  }else {
    isHidden('twoBillingName', true)
  }

  if(val.includes('02')){
    isHidden('carBillingName', false)
  }else {
    isHidden('carBillingName', true)
  }

  if(val.includes('03')){
    isHidden('rechargeBillingName', false)
  }else {
    isHidden('rechargeBillingName', true)
  }

  if(val.includes('04')){
    isHidden('tradeBillingName', false)
  }else {
    isHidden('tradeBillingName', true)
  }
}

const eventChangeKey = (val: any, key: string) => {
  let keys = ''
  keys = `${subKey(key, 'N')}Id`
  
  formData.value.data[keys] = val.value
  // console.log('data',formData.value.data);
  
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
            name: {
              type: "input",
              name: '片区名称',
              placeholder: "请填写片区名称",
              clearable: false,
              border: 'none'
            },
            detailedAddress: {
              type: "input",
              name: '详细地址',
              border: 'none',
              placeholder: "请填写详细地址"
            },
            phone: {
              type: "input",
              name: '联系电话',
              placeholder: "请填写联系电话",
              border: 'none',
            },
          }
        },
        {
          title: '物业信息',
          object: {
            realEstate: {
              type: "input",
              name: '所属物业',
              placeholder: "请填写所属物业",
              clearable: false,
              border: 'none'
            },
            estateName: {
              type: "input",
              name: '物业联系人',
              placeholder: "请填写联系人姓名",
              clearable: false,
              border: 'none'
            },
            estatePhone: {
              type: "input",
              name: '物业联系电话',
              placeholder: "请填写联系人电话",
              clearable: false,
              border: 'none'
            },
          }
        },
        {
          title: '计费方式',
          object: {
            type: {
              type: "checkbox",
              name: '运营产品类型',
              placeholder: "请填写所属物业",
              clearable: false,
              border: 'none',
              typeSet: {
                data: [
                  { label: "两轮充", value: "01" },
                  { label: "汽车充", value: "02" },
                  { label: "充电柜", value: "03" },
                  { label: "换电柜", value: "04" },
                ],
                eventChange: checkboxChange
              },
            },
            twoBillingName: {
              type: "select",
              name: '两轮充计费',
              border: 'none',
              hidden: true,
              typeSet: {
                data: [],
                sheetTitle: '两轮充计费',
                eventChange: eventChangeKey
              },
            },
            carBillingName: {
              type: "select",
              name: '汽车充计费',
              border: 'none',
              hidden: true,
              typeSet: {
                data: [],
                sheetTitle: '汽车充计费',
                eventChange: eventChangeKey
              },
            },
            rechargeBillingName: {
              type: "select",
              name: '充电柜计费',
              border: 'none',
              hidden: true,
              typeSet: {
                data: [],
                sheetTitle: '充电柜计费',
                eventChange: eventChangeKey
              },
            },
            tradeBillingName: {
              type: "select",
              name: '换电柜计费',
              border: 'none',
              hidden: true, 
              typeSet: {
                data: [],
                sheetTitle: '换电柜计费',
                eventChange: eventChangeKey
              },
            },
          }
        },
        {
          title: '分账方式',
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
        {
          title: '卡片充值方式',
          object: {
            // twoRoundsCardName: {
            //   type: "select",
            //   name: '两轮充包月卡',
            //   border: 'none',
            //   typeSet: {
            //     data: [],
            //     sheetTitle: '两轮充包月卡',
            //   },
            // },
            rechargeConfigBikeStoredValueName: {
              type: "select",
              name: '两轮充储值卡',
              border: 'none',
              typeSet: {
                data: [],
                sheetTitle: '两轮充储值卡',
                eventChange: eventChangeKey
              },
            },
            rechargeConfigCarStoredValueName: {
              type: "select",
              name: '汽车充储值卡',
              border: 'none',
              typeSet: {
                data: [],
                sheetTitle: '汽车充储值卡',
                eventChange: eventChangeKey
              },
            },
          }
        },
      ]
    },
    data: {
      name: '',
      detailedAddress: '',
      phone: '',
      realEstate: '',
      estateName: '',
      estatePhone: '',

      type: [],
      // 两轮充计费
      twoBillingName: '',
      twoBillingId: '',
      // 汽车充计费
      carBillingName: "",
      carBillingId: '',
      // 充电柜计费
      rechargeBillingName: '',
      rechargeBillingId: '',
      // 换电柜计费
      tradeBillingName: '',
      tradeBillingId: '',
      // 分账方式
      clearingConfigName: '',
      clearingConfigId: '',

      // 两轮充包月卡
      // twoRoundsCardName: '',
      // twoRoundsCard: '',

      // 两轮充储值卡
      rechargeConfigBikeStoredValueName: '',
      rechargeConfigBikeStoredValueId: '',

      // 汽车充储值卡
      rechargeConfigCarStoredValueName: '',
      rechargeConfigCarStoredValueId: '',
    },
  },
  rules: {
    'name': [{ type: 'string', required: true, message: '请填写片区名称', trigger: ['blur', 'change']}],
    'detailedAddress': { type: 'string', required: true, message: '请填写详细地址', trigger: ['blur', 'change']},
    'phone':[
      { type: 'string', required: true, message: '请填写联系电话', trigger: ['blur', 'change']},
      {
			// 自定义验证函数，见上说明
			validator: (rule, value, callback) => {
				// 上面有说，返回true表示校验通过，返回false表示不通过
				// uni.$u.test.mobile()就是返回true或者false的
				return uni.$u.test.mobile(value);
			},
			message: '手机号码不正确',
			// 触发器可以同时用blur和change
			trigger: ['change','blur'],
		}
    ],
    'realEstate': { type: 'string', required: true, message: '请填写所属物业', trigger: ['blur', 'change']},
    'estateName': { type: 'string', required: true, message: '请填写联系人姓名', trigger: ['blur', 'change']},
    'estatePhone': { type: 'string', required: true, message: '请填写联系人电话', trigger: ['blur', 'change']},
    'type': { type: 'array',min: 0, required: true, message: '请选择运营产品类型', trigger: ['change']},
    'twoBillingName': { type: 'string', required: true, validator: validatorFun, trigger: ['change']},
    'carBillingName': [
      {
        validator: validatorFun,
        type: 'string',
        required: true,
        message: '请选择汽车充计费',
        trigger: ['change','blur'],
		  }
    ],
    'rechargeBillingName': { type: 'string', required: true, validator: validatorFun, trigger: ['change']},
    'tradeBillingName': { type: 'string', required: true, validator: validatorFun, trigger: ['change']},
    'clearingConfigName': { type: 'string', required: true, message: '请选择分账模板', trigger: ['change']},
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
    "orgId": props.orgId,
  }
  
  areaOrgDetail(param).then((res) => {
    let { data } = res
    formData.value.data = data.orgDto
    let arr = []
    if(data.orgDto.twoBillingId) {
      arr.push('01')
    }
    
    if(data.orgDto.carBillingId) {
      arr.push('02')
    }
    if(data.orgDto.rechargeBillingId) {
      arr.push('03')
    }
    if(data.orgDto.tradeBillingName) {
      arr.push('04')
    }
    formData.value.data.type = arr
    checkboxChange(arr)
    if(data.reChargeConfigOrgDtos.length > 0) {
      data.reChargeConfigOrgDtos.forEach((item:any) => {
        switch(item.reChargeConfigType) {
          case '02':
            formData.value.data.rechargeConfigBikeStoredValueName = item.reChargeConfigName
            formData.value.data.rechargeConfigBikeStoredValueId = item.reChargeConfigId
            break
          case '03':
            formData.value.data.rechargeConfigCarStoredValueName = item.reChargeConfigName
            formData.value.data.rechargeConfigCarStoredValueId = item.reChargeConfigId
            break
        }
      })
    } else {
      formData.value.data.rechargeConfigBikeStoredValueName = ''
      formData.value.data.rechargeConfigBikeStoredValueId = ''
      formData.value.data.rechargeConfigCarStoredValueName = ''
      formData.value.data.rechargeConfigCarStoredValueId = ''
    }
    
    
  });
}

//计费方式
const getBilMethod=(key: string, productType: string)=>{
  let params={
    operatorId: userUserStore.operatorId,
    productType: productType
  }
  chargeConfigList(params).then((res)=>{
    let {data}=res 
    data.chargeConfigInfoList.forEach((item:any) => {
      item.label = item.templateName
      item.value = item.chargeConfigId
    })

    isSetData(key, data.chargeConfigInfoList, 2)
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

// 充值方式
const getRechargeConfigList = (key: string, type: string) => {
  let params={
    operatorId: userUserStore.operatorId,
    reChargeConfigType: type
  }
  rechargeConfigList(params).then((res)=>{
    let {data}=res 
    data.reChargeConfigDtoList.forEach((item:any) => {
      item.label = item.reChargeConfigName
      item.value = item.reChargeConfigId
    })

    isSetData(key, data.reChargeConfigDtoList, 4)
  })
}

// 保存
const confirm = () => {
  let formEl = uForm.value.$refs.formRef;
  let formDataList = formData.value.data;
  formDataList.operateType = props.orgId ? '02' : '01'
  // console.log('保存', formDataList);
  // return
  if (!formEl) return;
  formEl.validate().then( (valid: any) => {
    if (valid) {
      areaOrgSave(formDataList).then((res) => {
        jumpRoute()
      });
      console.log('成功');
      
    } else {
      return false;
    }
  });
}

// 删除片区
const areaDeleteClick = () => {
  popupTitle.value = `确认删除「${formData.value.data.name}」`
  uni.$u.sleep().then(() => {
    popupShow.value = !popupShow.value
  })
}

const jumpRoute = () => {
  uni.switchTab({
    url: `/pages/areaManagement/areaManagement/areaList`,
    success: (res) => {
      let page = getCurrentPages().pop();
      if (page == undefined || page == null) return;
      page.onLoad();
    }
  });
}

const close = () => {
  popupShow.value = false
}

const cancelClick = () => {
  popupShow.value = !popupShow.value
}

const confirmClick = () => {
  areaOrgDelete({ orgId: props.orgId }).then(
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