<!--
 * @作者: 郭莉猛
 * @Date: 2023-11-06 18:02:07
 * @FilePath: /uni-preset-vue-vite-ts 2/src/pages/areaManagement/chargingStation/components/stationConfig.vue
 * @描述: 充电站配置
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
        :labelWidth="'140'"
        :labelStyle="{
          'color': 'rgb(144,146,155)',
          'padding-left': '10px'
        }"
      >

        <!-- 充满自停 -->
        <template #paymentHeaderRight1>
          <u-switch v-model="paymentValue" ></u-switch>
        </template>
      </q-form-data>
    </view>
  </view>

  <!-- 操作弹框 -->
  <u-modal 
    :show="modalShow" 
    title="操作确认" 
  >
    <view class="modal-content">
      {{ `确认要${modalContent}吗？` }}
    </view>
    <template #confirmButton>
      <view class="confirmButton">
        <up-button type="success" :plain="true" text="取消" shape="circle" :customStyle="{'margin': '0 10px'}" @click="cancelClick"></up-button>
				<u-button
					text="确定"
					type="success"
					shape="circle"
          :customStyle="{'margin': '0 10px'}"
					@click="confirmClick"
				></u-button>
      </view>
		</template>
  </u-modal>

  <!-- 预付金额 -->
    <u-modal 
      :show="prepaidAmountModalShow" 
      title="预付金额" 
    >
    <view class="modal-content">
      <up-input
        placeholder="请输入预付金额"
        border="bottom"
        type="number"
        v-model="prepaidAmountModalContent"
        @change="change"
      >
        <template #prefix>
					<up-text
						text="￥"
						margin="0 3px 0 0"
            :bold="true"
					></up-text>
				</template>
      </up-input>
    </view>
    <template #confirmButton>
      <view class="confirmButton">
        <up-button type="primary" :plain="true" text="取消" shape="circle" :customStyle="{'margin': '0 10px'}" @click="prepaidAmountCancelClick"></up-button>
        <u-button
          text="确定"
          type="primary"
          shape="circle"
          :customStyle="{'margin': '0 10px'}"
          @click="prepaidAmountConfirmClick"
        ></u-button>
      </view>
		</template>
  </u-modal>

</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { rechargeConfigList, areaOrgDetail, areaOrgUpdateMode } from "@/api/areaManagement/areaManagement";


import { userStore } from "@/store/modules/user";
const userUserStore = userStore();

const props = defineProps({
  orgId: {
    type: String,
    default: "",
  },
})

onMounted(()=> {
  // console.log('props.orgId',props.orgId);
  
  if(props.orgId) {
    // getAreaDetailst()
  }
})

const formItemChange = (val: any, key: string) => {
  console.log('支付宝',val, key);
  modalContent.value = '关闭支付宝支付'
  
  modalShow.value = true
  
}

// 预付金额
const productTypeDesc1222 = () => {
  console.log('预付金额',);
  prepaidAmountModalShow.value = true
}

const switchType = (val: any, key: string) => {
  console.log('switch开关',val,key);
  
}

// 最低消费
const lowConsumptionChange = (val: any, key: string) => {
  console.log('最低消费', val, key);
  uni.navigateTo({
    url: `/pages/areaManagement/areaManagement/components/minimumConsumption`,
  });
}

const paymentValue = ref(true);

const modalShow = ref(false)
const modalContent = ref<string>('')

// 预付金额
const prepaidAmountModalShow = ref(false)
const prepaidAmountModalContent = ref<string>('')

const data = reactive({
  formData: {
    sets: {
      showTags: true,
      list: [
        {
          title: '支付方式',
          object: {
            alipay: {
              type: "customRadio",
              name: '支付宝',
              placeholder: "",
              clearable: false,
              border: 'none',
              typeSet: {
                eventChange: formItemChange
              }
            },
            weChat: {
              type: "customRadio",
              name: '微信',
              clearable: false,
              border: 'none',
              typeSet: {
              }
            },
          }
        },
        {
          title: '充满自停',
          slotHeaderRight: 'paymentHeaderRight1',
          object: {
            prepaidAmount: {
              type: "select",
              name: '预付金额',
              border: 'none',
              typeSet: {
                cellValue: '未设置',
                isActionShee: true,
                customCellValueColor: '#006cff',
                eventChange: productTypeDesc1222
              },
            },
            minimumConsumption: {
              type: "select",
              name: '最低消费',
              border: 'none',
              typeSet: {
                cellValue: '未设置',
                isActionShee: true,
                customCellValueColor: '#006cff',
                eventChange: lowConsumptionChange
              },
            },
          }
        },
        {
          title: '按照实际消费金额退款',
          object: {
            scanCodeOrder: {
              type: "switch",
              name: '扫码订单',
              border: 'none',
              typeSet: {
                eventChange: switchType
              },
            },
            virtualCardOrder: {
              type: "switch",
              name: '虚拟卡订单',
              border: 'none',
              typeSet: {
                // eventChange: productTypeChange
              },
            },
            physicalCardMinimumConsumption: {
              type: "select",
              name: '实体卡订单最低消费',
              border: 'none',
              typeSet: {
                cellValue: '未设置',
                isActionShee: true,
                eventChange: lowConsumptionChange
              },
            },
          }
        },
      ]
    },
    data: {
      // 扫码支付
      alipay: true,
      weChat: true,

      // 充满自停
      // 预付金额
      prepaidAmount: '',
      minimumConsumption: '',

      // 按照实际消费金额退款
      scanCodeOrder: true,
      virtualCardOrder: true,
      physicalCardMinimumConsumption: '',
    },
  },
})


let { formData, rules } = toRefs(data);

// 详情
const getAreaDetailst =  () => {
  let param = {
    "orgId": props.orgId,
  }
  
  areaOrgDetail(param).then((res) => {
    let { data } = res
    formData.value.data.clearingConfigName = data.clearingConfigDto.clearingConfigName
    formData.value.data.clearingConfigId = data.clearingConfigDto.clearingConfigId
  });
}

// 关闭弹框
const cancelClick = () => {
  modalShow.value = false
}

const confirmClick = () => {
  cancelClick()
}

// 预付金额
const prepaidAmountCancelClick = () => {
  prepaidAmountModalShow.value = false
}
const prepaidAmountConfirmClick = () => {
  prepaidAmountCancelClick()
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
    // height: calc(100% - 90px);
    overflow: auto;
    .state {
      display: flex;
      justify-content: flex-end;
      margin-right: 5px;
      .round {
        width: 18px;
        height: 18px;
        border: 1px solid rgb(200, 201, 204);
        border-radius: 50%;
      }
    }
    .pageCustom {
      display: flex;
      line-height: 32px;
      font-size: 14px;
      .title {
        padding:  0 10px;
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
.modal-content {
  min-height: 50px;
  width: 100%;
  text-align: center;
}
.confirmButton {
  display: flex;
}
</style>