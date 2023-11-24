<!--
 * @作者: 郭莉猛
 * @Date: 2023-11-02 15:20:00
 * @FilePath: /uni-preset-vue-vite-ts 2/src/pages/ledgerManagement/addTemplateList.vue
 * @描述: 新增分账模板
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
        <template #conditionSetting>
          <view class="subform">
            <u--form
              labelPosition="left"
              :model="formData.data"
              :rules="rules"
              ref="subform"
            >
              <view 
                v-for="(domain, index) in formData.data.clearingConfigDetails"
                  :key="domain.key"
                  class="setting-list"
              >
                <up-row gutter="10">
                  <up-col span="1" class="form-line-padd">
                      <u-button link  @click="delDomain(index)" :customStyle="{'border': '0px'}">
                        <u-icon name="minus-circle-fill" color="red" size="16"></u-icon>
                      </u-button>
                  </up-col>
                  <up-col span="5" class="form-line-padd">
                    <u-form-item
                      :prop="'clearingConfigDetails.' + index + '.bankUserName'"
                      @click="openPopup(index)"
                    >
                      <u--input
                        v-model="domain.bankUserName"
                        disabled
                        disabledColor="#ffffff"
                        placeholder="请选择账户"
                      >
                        <template #suffix>
                          <u-icon
                            slot="right"
                            name="arrow-right"
                            color="#c1c4cB"
                          ></u-icon>
                        </template>
                      </u--input>
                    </u-form-item>
                  </up-col>
                  <up-col span="5" class="form-line-padd">
                    <u-form-item :prop="'clearingConfigDetails.' + index + '.percent'" >
                      <up-input
                        placeholder="分账比例"
                        v-model="domain.percent"
                        type="number"
                        @change="percentChange"
                      >
                        <template #suffix>
                          <up-text
                            text="%"
                            margin="0 3px 0 0"
                            type="tips"
                          ></up-text>
                        </template>
                      </up-input>
                    </u-form-item>
                  </up-col>
                </up-row>
              </view>

              <u-form-item >
                <view class="add-btn" style="border-top: 1px solid rgb(238,240,243);">
                  <view>
                    <u-icon name="plus-circle-fill" color="rgb(20,111,249)" size="16" top="12"></u-icon>
                  </view>
                  <u-button link @click="addDomain" text="添加" class="custom-style" :customStyle="customStyle"> </u-button>
                </view>
              </u-form-item>
            </u--form>
          </view>
        </template>
      </q-form-data>

      <u-action-sheet
        :show="actionSheetShow"
        @close="close"
        closeOnClickOverlay
        :round="10"
      >
        <view style="height: 300px; overflow-y: auto;">
          <view class="search"> 
            <u-search
              v-model="searchKey"
              :show-action="true"
              actionText="搜索"
              :animation="false"
              :actionStyle="{
                'color': 'rgb(30,102,235)'
              }"
              placeholder="请输入分账账户名称"
              @change="getAccountListFun"
            />
          </view>

          <view
            class="action-sheet__item" 
            v-for="(item, index_) in typeOptions"
            :key="index_"
            @click="searchKeyData(item, index)"
          >
            {{ item.label }}
          </view>
        </view>
      </u-action-sheet>
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

import { clearingAccountChargeConfigSave, clearingAccountChargeConfigDetail, clearingAccountList } from "@/api/ledgerManagement/ledgerManagement";

const uForm = ref();
const subform = ref();

// 分账比例校验
const validatPercent = (rule: any, value: any, callback: any) => {
  let list =  formData.value.data.clearingConfigDetails
  let sum = null
  if(list.length> 1) {
    list.reduce((pre: any, curr :any) => {
      sum = Number(pre.percent) + Number(curr.percent);
      return sum;
    })
  }else {
    sum = value
  }

  if (!value) {
    callback(new Error("分账比例不可为空"));
  } else if(sum < 100 || sum > 100) {
    callback('分账比例总和要为100%');
  } else {
    callback();
  }
}

// 账户名称不校验
const validatClearingAccount = (rule: any, value: any, callback: any) => {
  let list =  formData.value.data.clearingConfigDetails
  if (!value) {
    callback(new Error("账户不可为空"));
  } else {
    callback();
  }
}

const clearingConfigIndex = ref('');
const searchKey = ref('')
const clearingId = ref('')

const customStyle = reactive({
  color: 'rgb(20,111,249)',
  border: '0px',
  justifyContent: 'flex-start'
});

const data = reactive({
  formData: {
    sets: {
      showTags: false,
      list: [
        {
          title: '基本信息',
          object: {
            clearingConfigName: {
              type: "input",
              name: '模板名称',
              placeholder: "请填写模板名称",
              clearable: false,
              border: 'none'
            },
            password: {
              name: "",
              typeSet: {
                slotName: "conditionSetting",
              },
            },
          }
        },
        
      ]
    },
    data: {
      clearingConfigId: '',
      clearingConfigName: "",
      serviceMode: '01',
      operateType: '01',
      clearingConfigDetails: [
        {
          percent: '',
          clearingAccountId: '',
          bankUserName: "",
        },
      ],
    },
  },
  rules: {},
  defaultRules: {
    'clearingConfigName': {
      type: 'string',
      required: true,
      message: '请填写模板名称',
      trigger: ['blur', 'change']
    },
    'clearingConfigDetails.0.bankUserName': {
      required: true,
      message: '账户不可为空',
      trigger: ['change','blur'],
    },
    'clearingConfigDetails.0.percent': {
      required: true,
      validator: validatPercent,
      trigger: ['change','blur'],
    },
  },
  actionSheetShow: false,
  typeOptions: []
})

let { formData, rules, defaultRules, actionSheetShow, typeOptions } = toRefs(data);

onMounted(()=> {
  rules.value = defaultRules.value
  
  getAccountListFun()
})
onLoad((option) => {	//这里可以接收到一个参数option
  clearingId.value = option.clearingId
  if(option.clearingId) {
    editDetailFun(option)
  }
})


const searchKeyChange = (val: any) => {
  getAccountListFun()
}

// 编辑回显
const editDetailFun = (option:any) => {
  clearingAccountChargeConfigDetail({ clearingConfigId: option.clearingId }).then((res) => {
    let { data } = res
    formData.value.data = data
    formData.value.data.operateType = '02'
    // serviceModeChange(data.serviceFeeAccountId)
    // serviceFeeAccountData()
  });
}

// 账户列表
const getAccountListFun = () => {
  let param = {
    "operatorId": "",
    "pageNo": 1,
    "pageSize": 99990,
    "bankUserName": searchKey.value
  }
  clearingAccountList( param ).then((res) => {
    let { data } = res
    typeOptions.value =  data.clearingAccountInfoDtoList.map((item: any) => {
      return {
        ...item,
        value: item.clearingAccountId,
        label: item.bankUserName
      }
    })
    
  });
}

// 删除某一项
const delDomain = (index: number) => {
  if(formData.value.data.clearingConfigDetails.length == 1) {
    uni.showToast({
      icon: "none",
      duration: 3000,
      title: '至少保留一个',
    });
  } else {
    formData.value.data.clearingConfigDetails.splice(index, 1);
    delRules(index, 'bankUserName')
    delRules(index, 'percent')
    
  }
}

// 添加
const addDomain = () => {
  formData.value.data.clearingConfigDetails.push({
    percent: '',
    clearingAccountId: '',
    bankUserName: ''
  })
  addRules()
}

// 选择后数据
const searchKeyData = (item: any, index: string) => {
  let list =  formData.value.data.clearingConfigDetails
  let isRepeat = list.some((val: any) => {
    return val.clearingAccountId == item.value
  });
  if(isRepeat) {
    uni.$u.toast('请不要选择重复账户')
  }else {
    formData.value.data.clearingConfigDetails[showTypeIndex.value].clearingAccountId = item.value
    formData.value.data.clearingConfigDetails[showTypeIndex.value].bankUserName = item.label
    close(index)
    subform.value.validateField(`clearingConfigDetails.${showTypeIndex.value}.bankUserName`)
  }
  
}

// 分账比例change事件
const percentChange = (v:any) => {
  subform.value.validateField()
}

// 提交
const confirm = () => {
  let formEl = uForm.value.$refs.formRef;
  let formEl1 = subform.value;
  let formDataList = formData.value.data;
  if (!formEl) return;

  let subformState = false
  formEl1.validate().then(res => {
    subformState = true
  }).catch(errors => {
    subformState = false
  })

  formEl.validate().then( (valid: any) => {
    if (valid && subformState) {
      clearingAccountChargeConfigSave(formDataList).then((res) => {
        let { data } = res
        uni.navigateTo({
          url: `/pages/ledgerManagement/index`,
        });
      });
      
    } else {
      return false;
    }
  });
}

const showTypeIndex = ref<string>('')
const openPopup = (index: string) => {
  // show.value = true
  actionSheetShow.value = true
  showTypeIndex.value = index
}

const close = (index: string) => {
  // show.value = false
  actionSheetShow.value = false
  searchKey.value = ''
}

const addRules = () => {
  const index = formData.value.data.clearingConfigDetails.length - 1
  const rule = {
    [`clearingConfigDetails.${index}.bankUserName`]: {
      required: true,
      message: '账户不可为空',
      trigger: ['change','blur'],
    },
    [`clearingConfigDetails.${index}.percent`]: {
      validator: validatPercent,
      required: true,
      trigger: ['change','blur'],
    },
  }
  rules.value = {...rules.value, ...rule}
  
}

const delRules = (index: string| number, key: string) => {
  let keys = `clearingConfigDetails.${index}.${key}`
  delete rules.value[keys];
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
        margin-right: 5px;
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

.search {
  padding: 10px;
  border-bottom: 1px solid rgb(235,235,235);
}
.action-sheet__item {
  line-height: 40px;
  font-size: 16px;
  border-bottom: 1px solid rgb(235,235,235);
}
.subform {
  :deep(.u-form-item__body__right__message){
    margin-left: 0 !important;
  }
}

.add-btn {
  display: flex;
  padding-left: 5px;
}
</style>