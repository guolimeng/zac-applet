<!--
 * @作者: 郭莉猛
 * @Date: 2023-11-08 16:02:49
 * @FilePath: /uni-preset-vue-vite-ts 2/src/pages/areaManagement/areaManagement/components/paymentPageCustom.vue
 * @描述: 实体卡订单最低消费金额
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
</template>

<script setup lang="ts">

const productTypeChange = (val: any, key: string) => {
  if(val) {
    isHidden('templateName2', false)
  }else {
    isHidden('templateName2', true)
  }
  // 
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
              type: "switch",
              name: '启用支付页消息定制',
              border: 'none',
              itemLabelWidth: '220',
              typeSet: {
                eventChange: productTypeChange
              },
            },
            templateName2: {
              type: "textarea",
              name: '',
              placeholder: '请输入支付页定制消息内容',
              border: 'none',
              itemLabelWidth: '220',
              count: true,
              hidden: true,
              typeSet: {
                maxlength: '99'
                // eventChange: productTypeChange
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
</style>