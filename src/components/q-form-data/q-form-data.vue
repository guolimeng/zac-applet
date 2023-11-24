<!--
 * @作者: 郭莉猛
 * @Date: 2023-10-13 13:41:21
 * @FilePath: /uni-preset-vue-vite-ts 2/src/components/q-form-data/q-form-data.vue
 * @描述: 
 * 
-->
<template>
  <!-- <view class="warp-form_"> -->
    <u--form
      ref="formRef"
      class="formRef"
      :model="formValue.data"
      :rules="props.rules"
      :labelWidth="props.labelWidth"
      :labelPosition="props.labelPosition"
      :labelStyle="props.labelStyle"
    >
    <template  v-for="(set, index) in formValue.sets.list" :key="index">
      <view class="main-form" v-if="!set?.hidden">
        <view class="header-title"  v-if="formValue.sets.showTags">
          <view class="title-colorful">{{ set.title }}</view>
          <view v-if="set?.slotHeaderRight">
            <!-- 插槽 -->
            <slot :name="set.slotHeaderRight"></slot>
          </view>
        </view>

        <view class="main_form">
          <template v-for="(obj, key, index) in set.object" :key="key">
            
            <template v-if="obj?.typeSet?.slotName ">
              <u-form-item
                :label="obj.name"
                :prop="key"
                :leftIconStyle="obj.leftIconStyle"
                v-if="!obj?.hidden"
              >
                <!-- 插槽 -->
                <slot :name="obj.typeSet.slotName"></slot>
              </u-form-item>
            </template>
            <template v-else>
              <u-form-item
                :label="obj.name"
                :prop="key"
                borderBottom
                :labelWidth="obj.itemLabelWidth"
                v-if="!obj?.hidden"
              >
                <template v-if="obj.type == 'input'">
                  <u--input
                    v-model="formValue.data[key]"
                    :placeholder="obj.placeholder"
                    :type="obj.inputType"
                    :border="obj.border"
                    :disabledColor="obj.disabledColor"
                    :clearable="obj.clearable"
                    :disabled="obj.disabled"
                    :prefixIcon="obj?.typeSet?.prefixIcon"
                    :prefixIconStyle="obj?.typeSet?.prefixIconStyle"
                    :suffixIcon="obj?.typeSet?.suffixIcon"
                    :suffixIconStyle="obj?.typeSet?.suffixIconStyle"
                  >
                    <template v-if="obj?.typeSet?.inputPrefix" #prefix>
                      <slot :name="obj.typeSet.inputPrefix"></slot>
                    </template>

                    <template v-if="obj?.typeSet?.inputSuffix" #suffix>
                      <slot :name="obj.typeSet.inputSuffix"></slot>
                    </template>

                  </u--input>
                </template>

                <template v-if="obj.type == 'select'">
                  
                  <u-cell-group :border="false">
                    <u-cell
                      :title="obj?.typeSet?.cellValue ? '' : formValue.data[key] ||  '请选择'"
                      
                      :border="false"
                      :isLink="true"
                      :titleStyle="{'color': formValue.data[key] ? '#000': '#c1c4cB'}"
                      @click="openPopup('eventChange', obj.typeSet, key, obj?.typeSet?.isActionShee)"
                    >
                      <template #value v-if="obj?.typeSet?.cellValue">
                        <view
                          :style="{ 'color': formValue.data[key] ? (obj?.typeSet?.customCellValueColor ? (obj?.typeSet?.customCellValueColor) : '#000') : '#c1c4cB' }"
                        >
                          {{ formValue.data[key] ? formValue.data[key] : obj?.typeSet?.cellValue }}
                        </view>
                      </template>
                    </u-cell>
                    
                    <u-action-sheet
                      :title="obj?.typeSet?.sheetTitle"
                      :show="actionSheetShow[key]"
                      @close="close(key)"
                      closeOnClickOverlay
                      :round="10"
                    >
                      <view style="height: 300px; overflow-y: auto;">
                        <view
                          class="action-sheet__item" 
                          v-for="(item, index_) in obj.typeSet.data"
                          :key="index_"
                          @click="eventChange('eventChange', obj.typeSet,key, item, obj.type)"
                        >
                          {{ item.label }}
                        </view>
                      </view>
                    </u-action-sheet>
                  </u-cell-group>
                </template>

                <template v-if="obj.type == 'customRadio'">
                  <view class="state"
                    @click="eventChange('eventChange', obj.typeSet, key, formValue.data[key])"
                  > 
                    <view class="round"
                      :style="{background: formValue.data[key] ? '#006cff': '#fff','border-color': formValue.data[key] ? 'rgb(200, 201, 204)': ''}"
                      
                    >
                      <u-icon name="checkbox-mark" color="#fff"></u-icon>
                    </view>
                  </view>
                </template>

                <template v-if="obj.type == 'switch'">
                  <view class="state"> 
                    <u-switch
                      v-model="formValue.data[key]"
                      @change="eventChange('eventChange', obj.typeSet, key, $event)"
                    ></u-switch>
                  </view>
                </template>

                <template v-if="obj.type == 'radio'">
                    <u-radio-group
                      v-model="formValue.data[key]"
                      :placement="obj?.typeSet?.placement"
                      @change="eventChange('eventChange', obj.typeSet, key, $event)"
                    >
                      <u-radio
                        :customStyle="obj?.typeSet?.customStyle ? obj?.typeSet?.customStyle : { marginRight: '8px' }"
                        v-for="(radioItem, radioIndex) in obj.typeSet.data"
                        :key="radioIndex"
                        :label="radioItem.label"
                        :name="radioItem.value"
                        :disabled="obj.disabled || radioItem.disabled"
                      >
                      </u-radio>
                    </u-radio-group>
                </template>

                <template v-if="obj.type == 'checkbox'">
                  <u-checkbox-group
                    v-model="formValue.data[key]"
                    :placement="obj?.typeSet?.placement"
                    :size="obj.size"
                    :activeColor="obj?.typeSet?.activeColor"
                    @change="eventChange('eventChange', obj.typeSet, key, $event)"
                  >
                    <u-checkbox
                      :customStyle="obj?.typeSet?.customStyle ? obj?.typeSet?.customStyle : { marginRight: '8px' }"
                      v-for="(radioItem, radioIndex) in obj.typeSet.data"
                      :key="radioIndex"
                      :label="radioItem.label"
                      :name="radioItem.value"
                      :disabled="obj.disabled || radioItem.disabled"
                    >
                    </u-checkbox>
                  </u-checkbox-group>
                </template>

                <template v-if="obj.type == 'textarea'">
                  <u--textarea
                    v-model="formValue.data[key]"
                    :placeholder="obj.placeholder"
                    :disabled="obj.disabled" 
                    :count="obj.count" 
                    :border="obj.border"
                    :autoHeight="obj?.typeSet?.autoHeight"
                    :formatter="obj?.typeSet?.formatter"
                    :maxlength="obj?.typeSet?.maxlength"
                  >
                  </u--textarea>
                </template>

                <template v-if="obj?.typeSet?.formItemRight" #right>
                  <slot :name="obj.typeSet.formItemRight"></slot>
                </template>
              </u-form-item>
            </template>
          </template>
        </view>
      </view>
    </template>
      <template>
        <slot name="footer"></slot>
      </template>
     
    </u--form>
  <!-- </view> -->
</template>

<script setup lang="ts">
import { userStore } from "@/store/modules/user";

const userUserStore = userStore();
import { onMounted, ref } from 'vue'
const formRef = ref();
const title = ref('表单')
const show = ref(false);
const props = defineProps({
  // 操作栏
  value: {
    type: Object,
    default: () => {},
  },
  rules: {
    type: Object,
    default: () => {},
  },
  labelWidth: {
    type: [String, Number],
    default: "",
  },
  labelPosition: {
    type: String,
    default: "top",
  },
  labelStyle: {
    type: Object,
    default: () => {},
  },
  inline: {
    type: Boolean,
    default: false,
  },
  // 是否展示重置
  showReset: {
    type: Boolean,
    default: false,
  },
  // 是否展示取消
  showCancel: {
    type: Boolean,
    default: false,
  },
  // 是否展示确认
  showSubmit: {
    type: Boolean,
    default: false,
  },
  scrollbarHeight: {
    type: [String, Number],
    default: "",
  },
  footerShow: {
    type: Boolean,
    default: false,
  },
  formBorder: {
    type: Boolean,
    default: false,
  },
});


const data = reactive({
  formValue: {
    sets: [],
    data: {},
  },
  dataRules: {},
  actionSheetShow: []
});
const { formValue, actionSheetShow } = toRefs(data);

// 监听
watch(
  () => [props.value, props.rules],
  (newVal) => {
    // console.log("监听", newVal[1]);
    let realValue = props.value;
    if (!realValue) return;
    formValue.value = realValue;

    if (newVal[1]) {
      // dataRules.value = newVal[1];
    }
  },
  { deep: true, immediate: true }
);

// mounted
onMounted(()=> {
  // addCustomRule()
  // console.log('props.rules',props.rules);
  if(props.rules) {
    formRef.value.setRules(props.rules)
  }
  
})

const radioChange = (n:any) => {
  console.log('radioChange', n);
};

// isActionShee 是否展示弹框
const openPopup = (eventName: string,typeSet: any,  key: string, isActionShee: string) => {
  // console.log('typeSet', key, typeSet);
  let event = typeSet && typeSet[eventName];
  // console.log('openPopup',key, isActionShee);
  
  if(isActionShee) {
    if (event) {
      event(key);
    }
  }else {
    actionSheetShow.value[key] = true
    // console.log('openPopup',actionSheetShow.value);
    
  }
  
}

const close = (key: string) => {
  actionSheetShow.value[key] = false
  actionSheetShow.value = []
}

// const select = (eventName: string, typeSet: any, val: any, key: string) => {
//   let event = typeSet && typeSet[eventName];
//   // console.log('typeSet',typeSet);
  
//   formValue.value.data[key] = val.label
//   actionSheetShow.value[key] = false
//   actionSheetShow.value = []
//   if (event) {
//     event(val);
//   }
// }

// 自定义change事件
const eventChange = (eventName: string, typeSet: any, key: string, e: any, type?: string) => {
  let event = typeSet && typeSet[eventName];
  // console.log("type", val, eventName, typeSet);
  // console.log('eventChange',type,key);
  if(type === "select") {
    formValue.value.data[key] = e.label
    actionSheetShow.value[key] = false
  }

  // if (event && (type === "select")) {
  //   formValue.value.data[key] = e.label
  //   actionSheetShow.value[key] = false
  //   event(e, key);
  // } else 
  if (event) {
    event(e, key);
  }
};

const change = (e:any) => {
  console.log('switchchange');
  
}
</script>

<style lang="scss" scoped>
.main-form {
  // display: flex;
  // color: red;
  margin-bottom: 10px;
  .header-title {
    display: flex;
    justify-content: space-between;
    .title-colorful {
      // width: 100%;
      font-size: 14px;
      font-weight: 500;
      color: #34383e;
      height: 32px;
      line-height: 32px;
      display: inline-block;
      &::before {
        content: "";
        display: inline-block;
        width: 4px;
        height: 14px;
        background-color: #3190ff;
        position: relative;
        left: 0;
        top: 2px;
        margin-right: 14px;
      }
    }
  }
  
  .main_form {
    width: 100%;
    .action-sheet__item {
      line-height: 40px;
      font-size: 16px;
      border-bottom: 1px solid rgb(235,235,235);
    }

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
  }
}
.action-sheet__item {
  line-height: 40px;
  font-size: 16px;
  border-bottom: 1px solid rgb(235,235,235);
}

</style>