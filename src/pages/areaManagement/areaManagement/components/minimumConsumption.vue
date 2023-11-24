<!--
 * @作者: 郭莉猛
 * @Date: 2023-11-08 16:02:49
 * @FilePath: /uni-preset-vue-vite-ts 2/src/pages/areaManagement/areaManagement/components/minimumConsumption.vue
 * @描述: 支付页面消息定制
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
      </q-form-data>
    </view>

    <view class="save-ledger" >
      <!-- 保存 -->
      <view class="btn" @click="confirm">保存</view>
    </view>
  </view>

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

const productTypeChange = (val: any, key: string) => {
  // if(val) {
  //   isHidden('templateName2', false)
  // }else {
  //   isHidden('templateName2', true)
  // }
  // 
  if(formData.value.data.templateName) {
    prepaidAmountModalShow.value = true
  }
}

// 预付金额
const prepaidAmountModalShow = ref(false)
const prepaidAmountModalContent = ref<string>('')


const data = reactive({
  formData: {
    sets: {
      showTags: false,
      list: [
        {
          title: '基本信息',
          object: {
            templateName: {
              type: "switch",
              name: '启用支付页消息定制',
              border: 'none',
              itemLabelWidth: '220',
              typeSet: {
                // eventChange: productTypeChange
              },
            },
            templateName2: {
              type: "select",
              name: '最低消费金额',
              border: 'none',
              typeSet: {
                cellValue: '关闭',
                isActionShee: false,
                customCellValueColor: '#006cff',
                eventChange: productTypeChange
              },
            },
          }
        },
        
      ]
    },
    data: {
      templateName: false,
      templateName2: '',
    },
  },
  rules: {
    'templateName': { type: 'string', required: true, message: '请填写模板名称', trigger: ['blur', 'change']},
  },
})


let { formData, rules } = toRefs(data);

// 预付金额
const prepaidAmountCancelClick = () => {
  prepaidAmountModalShow.value = false
}
const prepaidAmountConfirmClick = () => {
  prepaidAmountCancelClick()
}

const isHidden = (key: string, state: boolean) => {
  return formData.value.sets.list[0].object[key].hidden = state
}
</script>

<style lang="scss" scoped>
.wrap {
  height: 100vh;
  background: rgb(241,244,247);
  .main {
    padding: 30px 5px 0;
    background: #fff;
    height: calc(100% - 90px);
    overflow: auto;
    
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