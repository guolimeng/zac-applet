<!--
 * @作者: 郭莉猛
 * @Date: 2023-11-03 12:27:54
 * @FilePath: /uni-preset-vue-vite-ts 2/src/pages/billingTemplate/addTemplateList.vue
 * @描述: 添加计费模板
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
        :rules="rules"
        :labelStyle="{
          'color': 'rgb(144,146,155)',
          'padding-left': '10px'
        }"
      >
        <!-- 候选金额 -->
        <template #candidateMmount>
          <view class="mount-list">
            <view class="mount-item" v-for="(domain1, index) in formData.data.candidateAmount" :key="index">
              <u-form-item
                :prop="'candidateAmount.'+index"
                :rules="rules.candidateAmount"
              >
                <up-input
                  placeholder="金额"
                  type="number"
                  v-model="formData.data.candidateAmount[index]"
                >
                  <template #suffix>
                    <up-text
                      text="元"
                      margin="0 3px 0 0"
                      type="tips"
                    ></up-text>
                  </template>
                </up-input>
              </u-form-item>
            </view>
          </view>
        </template>

        <!-- 充电费用 -->
        <template #conditionSetting>
          <view>
            <view 
              v-for="(domain, index) in formData.data.chargingCostList"
              :key="domain.key"
              class="setting-list"
            >
              <up-row gutter="10" customStyle="align-items: baseline">
                <up-col span="1" class="form-line-padd">
                    <u-button link  @click="delDomain(index, 'chargingCostList')" :customStyle="{'border': '0px'}">
                      <u-icon name="minus-circle-fill" color="red" size="16"></u-icon>
                    </u-button>
                </up-col>
                <up-col span="11" class="form-line-padd">
                  <view class="conditionSetting-item">
                    <up-col span="5" v-if="isProof('billingMode', '03')">
                      <u-form-item
                        :prop="'chargingCostList.' + index + '.minPower'"
                        :rules="rules.chargingCostList.minPower"
                      >
                        <up-input
                          placeholder="0"
                          v-model="domain.minPower"
                          :suffixIcon="'W'"
                          suffixIconStyle="font-size: 12px;color: #909399"
                          :disabled="true"
                        >
                        </up-input>
                      </u-form-item>
                    </up-col>
                    <text  class="item-label" v-if="isProof('billingMode', '03')">~</text>
                    <up-col span="5" v-if="isProof('billingMode', '03')">
                      <u-form-item :prop="'chargingCostList.' + index + '.maxPower'" :rules="rules.chargingCostList.maxPower">
                        <up-input
                          placeholder="功率"
                          v-model="domain.maxPower"
                          type="number"
                          :suffixIcon="'W'"
                          suffixIconStyle="font-size: 12px;color: #909399"
                        >
                        </up-input>
                      </u-form-item>
                    </up-col>
                    <up-col span="5" >
                      <u-form-item
                        :prop="'chargingCostList.' + index + '.hour'"
                        :rules="rules.chargingCostList.hour"
                      >
                        <up-input
                          placeholder="时间"
                          v-model="domain.hour"
                          :suffixIcon="'小时'"
                          suffixIconStyle="font-size: 12px;color: #909399"
                        >
                        </up-input>
                      </u-form-item>
                    </up-col>
                    <text  class="item-label">/</text>
                    <up-col span="5" >
                      <u-form-item
                        :prop="'chargingCostList.' + index + '.amount'"
                        :rules="rules.chargingCostList.amount"
                      >
                        <up-input
                          placeholder="定价"
                          v-model="domain.amount"
                          type="number"
                          :suffixIcon="'元'"
                          suffixIconStyle="font-size: 12px;color: #909399"
                        >
                        </up-input>
                      </u-form-item>
                    </up-col>
                  </view>
                </up-col>
              </up-row>
            </view>

            <u-form-item >
              <view class="add-btn" style="border-top: 1px solid rgb(238,240,243);">
                <view>
                  <u-icon name="plus-circle-fill" color="rgb(20,111,249)" size="16" top="12"></u-icon>
                </view>
                <u-button link @click="addDomain" text="添加收费规则" class="custom-style" :customStyle="customStyle"> </u-button>
              </view>
            </u-form-item>
          </view>
        </template>

        <!-- 服务费模版-服务费模版 -->
        <template #serviceFeeTemplate>
          <view class="setting-list">
            <up-row>
              <up-col span="6">
                <up-text text="电费单价" ></up-text>
              </up-col>
              <up-col span="6">
                <u-form-item class="service-item"
                  prop="serviceTemplate.electricityPrice"
                  :rules="rules.serviceTemplate.servicePrice"
                >
                  <up-input
                    v-model="formData.data.serviceTemplate.electricityPrice"
                  >
                    <template #suffix>
                      <up-text text="元/度" color="rgb(138,140,150)"></up-text>
                    </template>
                  </up-input>
                </u-form-item>
              </up-col>
            </up-row>
            <up-row>
              <up-col span="6">
                <up-text text="服务费单价" ></up-text>
              </up-col>
              <up-col span="6">
                <u-form-item class="service-item"
                  prop="serviceTemplate.servicePrice"
                  :rules="rules.serviceTemplate.servicePrice"
                >
                  <up-input
                    v-model="formData.data.serviceTemplate.servicePrice"
                  >
                    <template #suffix>
                      <up-text text="元/小时" color="rgb(138,140,150)"></up-text>
                    </template>
                  </up-input>
                </u-form-item>
              </up-col>
            </up-row>
            <up-row>
              <up-col span="6">
                <up-text text="预支付总额" ></up-text>
              </up-col>
              <up-col span="6">
                <u-form-item class="service-item"
                  prop="serviceTemplate.advanceTotalAmount"
                  :rules="rules.serviceTemplate.advanceTotalAmount"
                >
                  <up-input
                    v-model="formData.data.serviceTemplate.advanceTotalAmount"
                  >
                    <template #suffix>
                      <up-text text="元" color="rgb(138,140,150)"></up-text>
                    </template>
                  </up-input>
                </u-form-item>
              </up-col>
            </up-row>
            <up-row>
              <up-col span="6">
                <up-text text="服务费预支付金额" ></up-text>
              </up-col>
              <up-col span="6">
                <u-form-item class="service-item"
                  prop="serviceTemplate.advanceServiceAmount"
                  :rules="rules.serviceTemplate.advanceServiceAmount"
                >
                  <up-input
                    v-model="formData.data.serviceTemplate.advanceServiceAmount"
                  >
                    <template #suffix>
                      <up-text text="元" color="rgb(138,140,150)"></up-text>
                    </template>
                  </up-input>
                </u-form-item>
              </up-col>
            </up-row>
            <up-row>
              <up-col span="6">
                <up-text text="服务费时间限制" ></up-text>
              </up-col>
              <up-col span="6">
                <u-form-item class="service-item"
                  prop="serviceTemplate.serviceTimeLimit"
                  :rules="rules.serviceTemplate.serviceTimeLimit"
                >
                  <up-input
                    v-model="formData.data.serviceTemplate.serviceTimeLimit"
                  >
                    <template #suffix>
                      <up-text text="分钟" color="rgb(138,140,150)"></up-text>
                    </template>
                  </up-input>
                </u-form-item>
              </up-col>
            </up-row>
          </view>
        </template>

        <!-- 时间段 -->
        <template #timeTemplate>
          <view>
            <view 
              v-for="(domain, index) in formData.data.timePeriods"
              :key="domain.key"
              class="setting-list"
            >
              <up-row gutter="10" customStyle="align-items: baseline">
                <up-col span="1" class="form-line-padd">
                    <u-button link  @click="delDomain(index, 'timePeriods')" :customStyle="{'border': '0px'}">
                      <u-icon name="minus-circle-fill" color="red" size="16"></u-icon>
                    </u-button>
                </up-col>
                <up-col span="11" class="form-line-padd">
                  <view class="conditionSetting-item">
                    <up-col span="5" >
                      <u-form-item
                        :prop="'timePeriods.' + index + '.startTime'"
                        :rules="rules.timePeriods.startTime"
                      >
                        <up-input
                          placeholder="开始时间"
                          v-model="domain.startTime"
                          :disabled="true"
                        >
                        </up-input>
                      </u-form-item>
                    </up-col>
                    <text  class="item-label" >~</text>
                    <up-col span="5" >
                      <!-- :rules="rules.timePeriods.endTime" -->
                      
                      <u-form-item :prop="'timePeriods.' + index + '.endTime'" :rules="rules.timePeriods.endTime">
                        <u-cell-group  :customStyle="{ border: '1px solid rgb(220,226,232)', borderRadius: '5px' }">
                          <u-cell
                            :title="domain.endTime"
                            :disabled="domain.disabled"
                            @click="openPopup(index)"
                          ></u-cell>
                          <u-datetime-picker
                            :show="pickerShow[index]"
                            v-model="domain.endTime"
                            mode="time"
                            closeOnClickOverlay
                            @confirm="(value) => datetimePickerConfirm(value, index)"
                            @cancel="datetimePickerClose(index)"
                            @close="datetimePickerClose(index)"
                          ></u-datetime-picker>
                        </u-cell-group>
                      </u-form-item>
                    </up-col>
                    <up-col span="5" >
                      <u-form-item
                        :prop="'timePeriods.' + index + '.electricityPrice'"
                        :rules="rules.timePeriods.electricityPrice"
                      >
                        <up-input
                          placeholder="电费"
                          v-model="domain.electricityPrice"
                        >
                          <template #suffix>
                            <up-text text="元/度" size="12" color="rgb(138,140,150)"></up-text>
                          </template>
                        </up-input>
                      </u-form-item>
                    </up-col>
                    <up-col span="5" >
                      <u-form-item
                        :prop="'timePeriods.' + index + '.servicePrice'"
                        :rules="rules.timePeriods.servicePrice"
                      >
                        <up-input
                          placeholder="服务费"
                          v-model="domain.servicePrice"
                          type="number"
                        >
                          <template #suffix>
                            <up-text text="元/度" size="12" color="rgb(138,140,150)"></up-text>
                          </template>
                        </up-input>
                      </u-form-item>
                    </up-col>
                  </view>
                </up-col>
                
                
              </up-row>
            </view>

            <u-form-item >
              <view class="add-btn" style="border-top: 1px solid rgb(238,240,243);">
                <view>
                  <u-icon name="plus-circle-fill" color="rgb(20,111,249)" size="16" top="12"></u-icon>
                </view>
                <u-button link @click="addTimeTemplate" text="添加收费规则" class="custom-style" :customStyle="customStyle"> </u-button>
              </view>
            </u-form-item>
          </view>
        </template>
      </q-form-data>
    </view>

    <view class="save-ledger" >
      <!-- 保存 -->
      <view class="btn" @click="confirm">保存</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onLoad, onReady } from '@dcloudio/uni-app'
import { chargeConfigSave, chargeConfigDetails } from "@/api/billingTemplate/billingTemplate";

const uForm = ref();
// const pickerShow = ref(false);

// 分账比例校验
const validatEmaxPower = (rule: any, value: any, callback: any) => {
  let index = rule.field?.replace(/[^0-9]/ig,"")
  let min =  formData.value.data.chargingCostList[index].minPower
  if (!value) {
    callback(new Error("功率不可为空"));
  } else if(value < 1) {
    callback('最大功率不得低于1W');
  } else if ( min > value ) {
    callback('不可小于最小功率');
  } else {
    callback();
  }
}

// 账户名称不校验
const validateEndTime = (rule: any, value: any, callback: any) => {
  let list =  formData.value.data.chargingCostList
  // let index = rule.field?.replace(/[^0-9]/ig,"")
  // let startTime =  formData.value.data.timePeriods[index].startTime
  // let m = dayjs(value).format("mm")

  // let newStartTime = `${dayjs(value).format("YYYY.MM.DD")} ${startTime}:${m}`
  
  // let start = dayjs( newStartTime).unix()
  // let end = dayjs(value).unix()

  // if (!value) {
  //   callback(new Error("结束时间不可为空"));
  // } else if ( start > end ) {
  //   callback('结束时间不能大于开始时间');
  // } else {
  //   callback();
  // }
}

const clearingConfigIndex = ref('');

// 计费id
const chargeConfigId = ref('')

const customStyle = reactive({
  color: 'rgb(20,111,249)',
  border: '0px',
  justifyContent: 'flex-start'
});

// 运营产品
const productTypeChange = (item: any) => {
  let val = item.value
  switch(val) {
    case '01':
      formData.value.sets.list[0].object.billingModeDesc.typeSet.data = billingModeOptionTwoWheels.value
      
      billingModeChange({ label: "按时计费", value: "01" })
      formData.value.data.candidateAmount = [1,2,3,4,5]
      break
    case '02':
      formData.value.sets.list[0].object.billingModeDesc.typeSet.data = billingModeOptionCar.value
      
      billingModeChange({ label: "汽车充服务费模板", value: "06" })
      formData.value.data.candidateAmount = [20, 50, 100, 200, 500]
      break
  }
  formData.value.data.productType = val
  formData.value.data.productTypeDesc = item.label
}

// 计费模式
const billingModeChange = (item: any) => {
  let val = item.value

  // if(val == '02') {
  //   isHidden('searchWords5', false)
  // }else {
  //   isHidden('searchWords5', true)
  // }

  if(val == '03' || val == '06') {
    isHidden('searchWords6', false)
    isHidden('minPaymentAmount', false)
    // isHidden('searchWords8', false)
  } else {
    isHidden('searchWords6', true)
    isHidden('minPaymentAmount', true)
    // isHidden('searchWords8', true)
  }

  if(val == '02' || val == '03') {
    isHidden('chargingInformation', false)
  } else {
    isHidden('chargingInformation', true)
  }

  if(val == '01' || val == '02' || val == '03') {
    isHidden('searchWords3', false)
  } else {
    isHidden('searchWords3', true)
  }

  if(val == '05') {
    isHidden('searchWords9', false)
  } else {
    isHidden('searchWords9', true)
  }

  if(val == '06') {
    isHidden('cardPrepaidAmount', false)
    isHidden('searchWords10', false)
  } else {
    isHidden('cardPrepaidAmount', true)
    isHidden('searchWords10', true)
  }

  emptyForm()

  formData.value.data.billingMode = val
  formData.value.data.billingModeDesc = item.label
}

const data = reactive({
  formData: {
    sets: {
      showTags: false,
      list: [
        {
          title: '基本信息',
          object: {
            templateName: {
              type: "input",
              name: '模板名称',
              placeholder: "请填写模板名称",
              clearable: false,
              border: 'none'
            },
            productTypeDesc: {
              type: "select",
              name: '运营产品',
              border: 'none',
              typeSet: {
                data: [
                  { label: "两轮充", value: "01" },
                  { label: "汽车充", value: "02" },
                  // { label: "充电柜", value: "03" },
                  // { label: "换电柜", value: "04" },
                  // { label: "道闸", value: "05" },
                ],
                sheetTitle: '产品类型',
                eventChange: productTypeChange
              },
            },
            billingModeDesc: {
              type: "select",
              name: '计费模式',
              border: 'none',
              typeSet: {
                data: [
                  { label: "按时计费", value: "01" },
                  // { label: "按量计费", value: "02" },
                  { label: "按功率计费", value: "03" },
                  { label: "两轮车免费模版", value: "04" },
                  { label: "两轮车服务费模板", value: "05" },
                  // { label: "汽车充服务费模板", value: "06" },
                  // { label: "汽车充免费模板", value: "07" },
                ],
                sheetTitle: '计费模式',
                eventChange: billingModeChange
              },
            },
            chargingInformation: {
              type: "radio",
              name: '计费信息',
              placeholder: "请填写模板名称",
              clearable: false,
              hidden: true,
              border: 'none',
              typeSet: {
                data: [
                  { label: "展示", value: "Y" },
                  { label: "不展示", value: "N" },
                ],
              },
            },
            searchWords6: {
              name: "候选金额",
              hidden: true,
              leftIconStyle: {
                paddingTop: '10px',
                alignItems: 'end'
              },
              typeSet: {
                slotName: "candidateMmount",
              },
            },
            minPaymentAmount: {
              type: "input",
              name: '最小支付金额',
              placeholder: "请输入最小支付金额",
              clearable: false,
              border: 'none',
              hidden: true,
              typeSet: {
                suffixIcon: "元",
              },
            },
            cardPrepaidAmount: {
              type: "input",
              name: '卡片预付金额',
              placeholder: "请输入卡片预付金额",
              clearable: false,
              border: 'none',
              hidden: true,
              inputType: 'number',
              typeSet: {
                suffixIcon: "元",
              },
            },
            searchWords3: {
              name: "",
              hidden: true,
              typeSet: {
                slotName: "conditionSetting",
              },
            },
            searchWords9: {
              name: "",
              hidden: true,
              typeSet: {
                slotName: "serviceFeeTemplate",
              },
            },
            searchWords10: {
              name: "",
              hidden: true,
              typeSet: {
                slotName: "timeTemplate",
              },
            },
          }
        },
        
      ]
    },
    data: {
      templateName: '',
      productType: '01',
      productTypeDesc: '两轮充',

      billingMode: "01",
      billingModeDesc: '按时计费',
      chargingInformation: 'Y',
      candidateAmount: [1,2,3,4,5],
      cardPrepaidAmount: '',
      minPaymentAmount: '0.01',
      chargingCostList: [
        {
          minPower: 0,
          maxPower: '',
          hour: '',
          amount: "",
        }
      ],
      serviceTemplate: {
        advanceServiceAmount: '',
        advanceTotalAmount: '',
        electricityPrice: '',
        servicePrice: '',
        serviceTimeLimit: '',
      },
      timePeriods: [
        {
          startTime: '00:00',
          endTime: '23:59',
          electricityPrice: '',
          servicePrice: '',
          disabled: true,
        }
      ]
    },
  },
  rules: {
    'templateName': { type: 'string', required: true, message: '请填写模板名称', trigger: ['blur', 'change']},
    candidateAmount: [
      { required: true, message: "金额不可为空", trigger: ["change"] }
    ],
    chargingCostList: {
      maxPower: {required: true, validator: validatEmaxPower, trigger: ['change']},
      hour: {required: true,message: '时间不能为空',trigger: ['change']},
      amount: {required: true,message: '定价不能为空',trigger: ['change']},
    },
    'serviceTemplate.electricityPrice': { required: true, message: '电费单价不可为空', trigger: ['blur', 'change'] },
    serviceTemplate: {
      // electricityPrice: { required: true, message: "电费单价不可为空", trigger: ["change"] },
      servicePrice: { required: true, message: "服务费单价不可为空", trigger: ["change"] },
      advanceTotalAmount: { required: true, message: "预支付总额不可为空", trigger: ["change"] },
      advanceServiceAmount: { required: true, message: "服务费预支付金额不可为空", trigger: ["change"] },
      serviceTimeLimit: { required: true, message: "服务费时间限制不可为空", trigger: ["change"] }
    },
    timePeriods: {
      startTime: {required: true,message: '开始时间不能为空',trigger: ["change"]},
      endTime: { required: true, validator: validateEndTime, trigger: ["change"] },
      // endTime: {required: true,message: '结束时间不能为空',trigger: ["change"]},
      electricityPrice: {required: true,message: '电费不能为空',trigger: ["change"]},
      servicePrice: {required: true,message: '服务费不能为空',trigger: ["change"]},
    },
  },
  selectOptions: [
    {label: '选项一', value: '1'},
    {label: '选项二', value: '2'},
    {label: '选项三', value: '3'}
  ],
  billingModeOptionTwoWheels: [
    { label: "按时计费", value: "01" },
    // { label: "按量计费", value: "02" },
    { label: "按功率计费", value: "03" },
    { label: "两轮车免费模版", value: "04" },
    { label: "两轮车服务费模板", value: "05" },
  ],
  billingModeOptionCar: [
    { label: "汽车充服务费模板", value: "06" },
    { label: "汽车充免费模板", value: "07" },
  ],

  productTypeOption: {
    '01': '两轮充',
    '02': '汽车充',
    '03': '充电柜',
    '04': '换电柜',
    '05': '道闸',
  },

  billingOption: {
    '01': '按时计费',
    '02': '按量计费',
    '03': '按功率计费',
    '04': '两轮车免费模版',
    '05': '两轮车服务费模板',
    '06': '汽车充服务费模板',
    '07': '汽车充免费模板',
  },
  pickerShow: []
})


let { formData, rules, selectOptions, billingModeOptionTwoWheels, billingModeOptionCar, pickerShow, billingOption, productTypeOption } = toRefs(data);

onMounted(()=> {
  // addCustomRule()
  uForm.value.$refs.formRef.setRules(rules.value)
  productTypeChange( { label: "两轮充", value: "01" }, ) 
  billingModeChange(  { label: "按时计费", value: "01" } ) 
})

onLoad((option) => {	//这里可以接收到一个参数option
  chargeConfigId.value = option.chargeConfigId

  if(option.chargeConfigId) {
    editDetailFun(option)
  }
})

const addCustomRule = () => {
    // 在此函数中，你可以动态添加自定义校验规则
    const customRule = {
        validator: (rule, value, callback) => {
            if (value == '') {
                callback(new Error('名字必须为John'));
            } else {
                callback();
            }
        },
        trigger: 'change'
    };
    if (rules.value.candidateAmount) {
        rules.value.candidateAmount.push(customRule);
    } else {
        rules.value.candidateAmount = [customRule];
    }
    console.log('rules.value',rules.value);
    
}


// 编辑回显
const editDetailFun = (option:any) => {
  chargeConfigDetails({ chargeConfigId: option.chargeConfigId }).then((res) => {
    let { data } = res
    productTypeChange( { value: data.productType, label: productTypeOption.value[data.productType] } ) 
    billingModeChange( { value: data.billingMode, label: billingOption.value[data.billingMode] } ) 

    if(data.billingMode == '06' && data.timePeriods.length > 0) {
      data.timePeriods.forEach((item: any) => {
        item.disabled = true
        item.electricityPrice = calculateAmount(item.electricityPrice)
        item.servicePrice = calculateAmount(item.servicePrice)
      })
    }

    data = formAllFun(data, calculateAmount)

    candidateAmountFun(data, calculateAmount)

    chargingCostFun(data, calculateAmount)
    
    formData.value.data = data
  });
}

// 删除某一项
const delDomain = (index: number, key: string) => {
  if(formData.value.data[key].length == 1) {
    uni.showToast({
      icon: "none",
      duration: 3000,
      title: '至少保留一个',
    });
  } else {
    formData.value.data[key].splice(index, 1);
    if(key == 'chargingCostList') {
      let previous = index !== 0 ? formData.value.data[key][index-1] : null
      formData.value.data[key][index].minPower = previous ? Number( previous.maxPower ) + 1 : 0

    }else {
      let previousItem = index !== 0 ? formData.value.data[key][index-1] : null
      if(formData.value.data[key].length == index) {
        formData.value.data[key][index-1].endTime = "23:59"
        formData.value.data[key][index-1].disabled = true
      }

      if(previousItem) {
        datetimePickerConfirm({value: previousItem.endTime}, index-1)
        
      }else {
        formData.value.data[key][index].startTime = '00:00'
      }
    }
  }
}

// 添加
const addDomain = () => {
  const length = formData.value.data.chargingCostList.length;
  const lastValue = formData.value.data.chargingCostList[length - 1];

  formData.value.data.chargingCostList.push({
    minPower: Number(lastValue.maxPower) + 1,
    maxPower: '',
    hour: '',
    amount: "",
  })
  console.log('rules.value',rules.value);
  
  // uForm.value.$refs.formRef.setRules(rules.value)
}

// 添加时间段
const addTimeTemplate = () => {
  let len = formData.value.data.timePeriods.length;
  let lastValue = formData.value.data.timePeriods[len - 1];
  formData.value.data.timePeriods.push({
    startTime: lastValue.startTime == '00:00' ? '' : '',
    endTime: "23:59",
    electricityPrice: '',
    servicePrice: '',
    disabled: true,
  })
  lastValue.endTime = '结束时间'
  lastValue.disabled = false
}

// 下拉框展示
const openSheet = (index: string) => {
  clearingConfigIndex.value = index
}

// 提交
const confirm = () => {
  let formEl = uForm.value.$refs.formRef;
  let formDataList = formData.value.data;
  formDataList.operateType = chargeConfigId.value ? '02' : '01'

  if(formDataList.billingMode == '06' && formDataList.timePeriods.length > 0) {
    formDataList.timePeriods.forEach(((item: any) => {
      item.electricityPrice = upCalculateAmount(item.electricityPrice)
      item.servicePrice = upCalculateAmount(item.servicePrice)
    }))
  }

  formDataList = formAllFun(formDataList, upCalculateAmount)

  candidateAmountFun(formDataList, upCalculateAmount)

  chargingCostFun(formDataList, upCalculateAmount)

  // console.log('formEl',formDataList);
  if (!formEl) return;
  formEl.validate().then( (valid: any) => {
    if (valid) {
      chargeConfigSave(formDataList).then((res) => {
        let { data } = res
        uni.navigateTo({
          url: `/pages/billingTemplate/index`,
        });
      });
      // console.log('成功');
      
    } else {
      return false;
    }
  });
}

const isProof = (key: string, val: number | string) => {
  return formData.value.data[key] == val
}

const isHidden = (key: string, state: boolean) => {
  return formData.value.sets.list[0].object[key].hidden = state
}

const emptyForm = () => {
  formData.value.data.chargingCostList = [
    {
      minPower: 0,
      maxPower: '',
      hour: '',
      amount: "",
    }
  ]

  formData.value.data.serviceTemplate = {
    advanceServiceAmount: '',
    advanceTotalAmount: '',
    electricityPrice: '',
    servicePrice: '',
    serviceTimeLimit: '',
  }
  formData.value.data.candidateAmount = [1,2,3,4,5]

  formData.value.data.timePeriods = [
    {
      startTime: '00:00',
      endTime: '23:59',
      electricityPrice: '',
      servicePrice: '',
      disabled: true,
    }
  ]
  
}

// 时间弹框
const openPopup = (index: number) => {
  pickerShow.value[index] = true
}

// 结束时间change
const datetimePickerConfirm = (item: any, index: number) => {
  var parts = item.value.split(":");
  let h = parts[0]
  let m = parts[1]
  let time1 = ''
  if(m == '59') {
    time1 = `${h == '23' ? '00' : Number(h) + 1}:00`
    
  }else {
    time1 = `${h}:${ m.charAt('0') == '0'? `0${ Number(m) + 1}` :  Number(m) + 1}`
  }
  if(formData.value.data.timePeriods.length !== index+ 1) {
    formData.value.data.timePeriods[index + 1].startTime = time1
  }
  formData.value.data.timePeriods[index].endTime = item.value
  
  datetimePickerClose(index)
}

// 关闭时间弹框
const datetimePickerClose = (index: number) => {
  pickerShow.value[index] = false
}

const formAllFun = (form: any, fun: any) => {
 return {
    ...form,
    minPaymentAmount: fun(form.minPaymentAmount),
    cardPrepaidAmount: fun(form.cardPrepaidAmount),
    serviceTemplate: {
      ...form.serviceTemplate,
      advanceServiceAmount: fun(form.serviceTemplate.advanceServiceAmount),
      advanceTotalAmount: fun(form.serviceTemplate.advanceTotalAmount),
      electricityPrice: fun(form.serviceTemplate.electricityPrice),
      servicePrice: fun(form.serviceTemplate.servicePrice),
    }
  }
  // return  form
}

// 候选金额
const candidateAmountFun = (form: any, fun: any) => {
  form.candidateAmount = form.candidateAmount.map(((item: any) => {
    return fun(item)
  }))
}

// 充电费用
const chargingCostFun = (form: any, fun: any) => {
  form.chargingCostList = form.chargingCostList.map(((val: any) => {
    return {
      ...val,
      amount: fun(val.amount)
    }
  }))
  
}

const calculateAmount = (num: any) => {
  return num ? parseFloat((num / 100).toPrecision(12)) : ''
}

const upCalculateAmount = (num: any) => {
  return num ? parseFloat((num *100).toPrecision(12)) : ''
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
</style>