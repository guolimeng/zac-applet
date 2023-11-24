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
            <u--form
              labelPosition="left"
              :model="formData.data"
              :rules="rules"
              ref="candidateAmountForm"
            >
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
            </u--form>
          </view>
        </template>

        <!-- 充电费用 -->
        <template #conditionSetting>
          <view class="charging-fees-list">
            <u--form
              labelPosition="left"
              :model="formData.data"
              :rules="rules"
              ref="chargingFeesForm"
            >
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
                        <u-form-item :prop="'chargingCostList.' + index + '.maxPower'" >
                          <up-input
                            placeholder="功率"
                            v-model="domain.maxPower"
                            :suffixIcon="'W'"
                            suffixIconStyle="font-size: 12px;color: #909399"
                          >
                          </up-input>
                        </u-form-item>
                      </up-col>
                      <up-col span="5" >
                        <u-form-item
                          :prop="'chargingCostList.' + index + '.hour'"
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
                        >
                          <up-input
                            placeholder="定价"
                            v-model="domain.amount"
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
            </u--form>
          </view>
        </template>

        <!-- 服务费模版-服务费模版 -->
        <template #serviceFeeTemplate>
          <view class="setting-list">
            <u--form
              labelPosition="left"
              :model="formData.data"
              :rules="rules"
              ref="uForm"
            >
              <up-row>
                <up-col span="6">
                  <up-text text="电费单价" ></up-text>
                </up-col>
                <up-col span="6">
                  <u-form-item class="service-item"
                    prop="serviceTemplate.electricityPrice"
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
            </u--form>
          </view>
        </template>

        <!-- 时间段 -->
        <template #timeTemplate>
          <view class="time-paragraph-list">
            <u--form
              labelPosition="left"
              :model="formData.data"
              :rules="rules"
              ref="timeParagraphForm"
            >
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
                        <u-form-item
                          :prop="'timePeriods.' + index + '.endTime'"
                          @click="openPopup(index, domain.endTime)"
                        >
                          <u--input
                            v-model="domain.endTime"
                            :disabled="domain.disabled"
                            placeholder="请选择"
                          >
                            <template #suffix>
                              <u-icon
                                slot="right"
                                name="arrow-right"
                                color="#c1c4cB"
                              ></u-icon>
                            </template>
                          </u--input>
                          <!-- <u-cell-group  :customStyle="{ border: '1px solid rgb(220,226,232)', borderRadius: '5px' }">
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
                          </u-cell-group> -->
                        </u-form-item>
                      </up-col>
                      <up-col span="5" >
                        <u-form-item
                          :prop="'timePeriods.' + index + '.electricityPrice'"
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
                        >
                          <up-input
                            placeholder="服务费"
                            v-model="domain.servicePrice"
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
            </u--form>
          </view>
        </template>
      </q-form-data>
    </view>

    <view class="save-ledger" >
      <!-- 保存 -->
      <view class="btn" @click="confirm">保存</view>
    </view>
  </view>

  <u-datetime-picker
    :show="pickerShow"
    v-model="timePeriodsEndTime"
    mode="time"
    closeOnClickOverlay
    @confirm="(value) => datetimePickerConfirm(value)"
    @cancel="datetimePickerClose"
    @close="datetimePickerClose"
  ></u-datetime-picker>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import dayjs from "dayjs";
import { onLoad, onReady } from '@dcloudio/uni-app'
import { chargeConfigSave, chargeConfigDetails } from "@/api/billingTemplate/billingTemplate";

const uForm = ref();
const candidateAmountForm = ref();
const chargingFeesForm = ref()
const serviceFeeForm = ref()
const timeParagraphForm = ref()
// const pickerShow = ref(false);


// 功率校验
const validatEmaxPower = (rule: any, value: any, callback: any) => {
  // console.log('功率校验',rule);
  // let min =  formData.value.data.chargingCostList[index].minPower
  let min =  0
  if (!value && formData.value.data.billingMode == '03') {
    callback(new Error("功率不可为空"));
  } else if(value < 1) {
    callback('最大功率不得低于1W');
  } else 
  // if ( min > value ) {
  //   callback('不可小于最小功率');
  // } else
   {
    callback();
  }
}

// 结束时间不校验
const validateEndTime = (rule: any, value: any, callback: any) => {
  let list =  formData.value.data.chargingCostList
  // let index = rule.field?.replace(/[^0-9]/ig,"")
  // let startTime =  formData.value.data.timePeriods[timePeriodsIndex.value].startTime
  // let m = dayjs(value).format("mm")

  // let newStartTime = `${dayjs(value).format("YYYY.MM.DD")} ${startTime}:${m}`
  
  // let start = dayjs( newStartTime).unix()
  // let end = dayjs(value).unix()

  if (!value) {
    callback(new Error("结束时间不可为空"));
  } 
  // else if ( start > end ) {
  //   callback('结束时间不能大于开始时间');
  // } 
  else {
    callback();
  }
}

// 卡片金额
const validatCardPrepaidAmount = (rule: any, value: any, callback: any) => {
  if(!value && formData.value.data.productType == '02') {
    callback(new Error("卡片预付金额不可为空"));
  }else {
    callback();
  }
}

// 最小支付金额
const validatMinPaymentAmount = (rule: any, value: any, callback: any) => {
  if(!value && (formData.value.data.billingMode == '03' || formData.value.data.billingMode == '06')) {
    callback(new Error("最小支付金额不可为空"));
  }else {
    callback();
  }
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
  rules: {},
  defaultRules: {
    'templateName': { type: 'string', required: true, message: '请填写模板名称', trigger: ['blur', 'change']},
    'candidateAmount.0': {
       required: true, message: "金额不可为空", trigger: ["change"]
    },
    'candidateAmount.1': {
       required: true, message: "金额不可为空", trigger: ["change"]
    },
    'candidateAmount.2': {
       required: true, message: "金额不可为空", trigger: ["change"]
    },
    'candidateAmount.3': {
       required: true, message: "金额不可为空", trigger: ["change"]
    },
    'candidateAmount.4': {
       required: true, message: "金额不可为空", trigger: ["change"]
    },
    minPaymentAmount: [
      { required: true, validator: validatMinPaymentAmount, trigger: ['blur', "change"] }
    ],
    cardPrepaidAmount: [
      { required: true, validator: validatCardPrepaidAmount, trigger: ['blur', "change"] }
    ],
    chargingCostList: {
      maxPower: {required: true, validator: validatEmaxPower, trigger: ['change']},
      // hour: {required: true,message: '时间不能为空',trigger: ['change']},
      amount: {required: true,message: '定价不能为空',trigger: ['change']},
    },
    'chargingCostList.0.maxPower': {
      required: true,
      validator: validatEmaxPower,
      // message: '功率不可为空',
      trigger: ['change','blur'],
    },
    'chargingCostList.0.hour': {
      required: true,
      message: '时间不能为空',
      trigger: ['change','blur'],
    },
    'chargingCostList.0.amount': {
      required: true,
      message: '定价不能为空',
      trigger: ['change','blur'],
    },
    'serviceTemplate.electricityPrice': {required: true, message: "电费单价不可为空", trigger: ['blur', 'change']},
    'serviceTemplate.servicePrice': {required: true, message: "服务费单价不可为空", trigger: ['blur', 'change']},
    'serviceTemplate.advanceTotalAmount': {required: true, message: "预支付总额不可为空", trigger: ['blur', 'change']},
    'serviceTemplate.advanceServiceAmount': {required: true, message: "服务费预支付金额不可为空", trigger: ['blur', 'change']},
    'serviceTemplate.serviceTimeLimit': {required: true, message: "服务费时间限制不可为空", trigger: ['blur', 'change']},
    'timePeriods.0.startTime': { required: true, message: '开始时间不能为空', trigger: ['change','blur']},
    'timePeriods.0.endTime': { required: true, validator: validateEndTime, trigger: ['change','blur']},
    'timePeriods.0.electricityPrice': {required: true, message: '电费不能为空', trigger: ['change','blur'] },
    'timePeriods.0.servicePrice': { required: true, message: '服务费不能为空', trigger: ['change','blur']},
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
  pickerShow: false
})


let { formData, rules, defaultRules, selectOptions, billingModeOptionTwoWheels, billingModeOptionCar, pickerShow, billingOption, productTypeOption } = toRefs(data);

onMounted(()=> {
  rules.value = defaultRules.value
  productTypeChange( { label: "两轮充", value: "01" }, ) 
  billingModeChange(  { label: "按时计费", value: "01" } ) 
})

onLoad((option) => {	//这里可以接收到一个参数option
  chargeConfigId.value = option.chargeConfigId

  if(option.chargeConfigId) {
    editDetailFun(option)
  }
})

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
      if(formData.value.data.billingMode == '03') {
        formData.value.data[key][index].minPower = previous ? Number( previous.maxPower ) + 1 : 0
      }
      
      
      delRules('chargingCostList', index, 'maxPower')
      delRules('chargingCostList', index, 'hour')
      delRules('chargingCostList', index, 'amount')
      console.log('收费规则删除', rules.value);
      
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

      delRules('timePeriods', index, 'startTime')
      delRules('timePeriods', index, 'endTime')
      delRules('timePeriods', index, 'electricityPrice')
      delRules('timePeriods', index, 'servicePrice')
      console.log('收费规则删除', rules.value);
    }
  }
}

// 添加收费规则
const addDomain = () => {
  const length = formData.value.data.chargingCostList.length;
  const lastValue = formData.value.data.chargingCostList[length - 1];

  formData.value.data.chargingCostList.push({
    minPower: Number(lastValue.maxPower) + 1,
    maxPower: '',
    hour: '',
    amount: "",
  })

  addChargeRules()
  console.log('收费规则添加',rules.value);
  
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

  addTimePeriodsRules()
  console.log('时间段规则添加',rules.value);
}

// 下拉框展示
const openSheet = (index: string) => {
  clearingConfigIndex.value = index
}

// 提交
const confirm = () => {
  let formEl = uForm.value.$refs.formRef;
  let candidateAmountFormfFormEl = candidateAmountForm.value;
  let chargingFeesFormFormEl = chargingFeesForm.value;
  let serviceFeeFormFormEl = serviceFeeForm.value;
  let timeParagraphFormFormEl = timeParagraphForm.value;

  let formDataList = submitData()
  console.log('formEl',formDataList);
  // console.log('金额规则', amounValidate(candidateAmountForm.value, formDataList));
  // console.log('收费规则', overallValidate(chargingFeesForm.value, formDataList));
  // return
  if (!formEl) return;
  formEl.validate().then( (valid: any) => {
    if (valid) {
      chargeConfigSave(formDataList).then((res) => {
        let { data } = res
        uni.navigateTo({
          url: `/pages/billingTemplate/index`,
        });
      });
      console.log('成功');
      
    } else {
      return false;
    }
  });
}

// 提交时数据处理
const submitData = () => {
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
  return formDataList
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
// 结束时间
const timePeriodsEndTime = ref('')
const timePeriodsIndex = ref('')
const openPopup = (index: number, endTime: string) => {
  pickerShow.value = true
  timePeriodsEndTime.value = endTime
  timePeriodsIndex.value = index
}

// 结束时间change
const datetimePickerConfirm = (item: any) => {
  var parts = item.value.split(":");
  let h = parts[0]
  let m = parts[1]
  let time1 = ''
  if(m == '59') {
    time1 = `${h == '23' ? '00' : Number(h) + 1}:00`
    
  }else {
    if(m) {
      let mm = m.charAt('0') == '0'? `0${ Number(m) + 1}` :  Number(m) + 1
      time1 = `${h}:${ mm }`
    }
    
  }

  let date = new Date();
  let startTime = formData.value.data.timePeriods[timePeriodsIndex.value].startTime
  let newStartTime = `${dayjs().format("YYYY.MM.DD")} ${startTime}`
  let newEndTime = `${dayjs().format("YYYY.MM.DD")} ${item.value}`

   let start = dayjs( newStartTime).unix()
  let end = dayjs(newEndTime).unix()

  console.log('newStartTime',newStartTime, start, end);
  if(start > end ) {
    uni.$u.toast('结束时间不能大于开始时间')
    return
  }

  if(formData.value.data.timePeriods.length !== timePeriodsIndex.value + 1) {
    formData.value.data.timePeriods[timePeriodsIndex.value + 1].startTime = time1
  }
  formData.value.data.timePeriods[timePeriodsIndex.value].endTime = item.value
  console.log('ddddd',timePeriodsIndex.value,formData.value.data.timePeriods);
  
  datetimePickerClose()
}

// 关闭时间弹框
const datetimePickerClose = () => {
  pickerShow.value = false
  timePeriodsEndTime.value = ''
  timePeriodsIndex.value = ''
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

// 收费规则校验
const addChargeRules = () => {
  const index = formData.value.data.chargingCostList.length - 1
  const rule = {
    [`chargingCostList.${index}.maxPower`]: {
      required: true,
      validator: validatEmaxPower,
      trigger: ['change','blur'],
    },
    [`chargingCostList.${index}.hour`]: {
      message: '时间不能为空',
      required: true,
      trigger: ['change','blur'],
    },
    [`chargingCostList.${index}.amount`]: {
      message: '定价不能为空',
      required: true,
      trigger: ['change','blur'],
    },
  }
  rules.value = {...rules.value, ...rule}
  
}

// 收费规则校验
const addTimePeriodsRules = () => {
  const index = formData.value.data.timePeriods.length - 1
  const rule = {
    [`timePeriods.${index}.startTime`]: {
      required: true,
      message: '开始时间不能为空',
      trigger: ['change','blur'],
    },
    [`timePeriods.${index}.endTime`]: {
      validator: validateEndTime,
      required: true,
      trigger: ['change','blur'],
    },
    [`timePeriods.${index}.electricityPrice`]: {
      message: '电费不能为空',
      required: true,
      trigger: ['change','blur'],
    },
    [`timePeriods.${index}.servicePrice`]: {
      message: '服务费不能为空',
      required: true,
      trigger: ['change','blur'],
    },
  }
  rules.value = {...rules.value, ...rule}
  
}

const delRules = (listKey: string,index: string| number, key: string) => {
  let keys = `${listKey}.${index}.${key}`
  delete rules.value[keys];
}

// 提交时校验规则
const overallValidate = (form:any, formData: any) => {
  let state = false
  console.log('eeee',formData.billingMode, form);
  
  if(formData.billingMode == '01' || formData.billingMode == '03') {
    form.validate().then((res:any) => {
      state = true
    }).catch((errors:any) => {
      state = false
    })
  }
  return state
}

// 金额提交时校验规则
const amounValidate = (form:any, formData: any) => {
  let state = false
  console.log('eeee',formData.billingMode, form);
  
  if(formData.billingMode == '01' || formData.billingMode == '06') {
    form.validate().then((res:any) => {
      state = true
    }).catch((errors:any) => {
      state = false
    })
  }
  return state
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
        :deep(.u-form) {
          display: flex;
          flex-wrap: wrap;
        }
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
.charging-fees-list,
.time-paragraph-list,
.mount-list {
  :deep(.u-form-item__body__right__message){
    margin-left: 0 !important;
  }
}
</style>