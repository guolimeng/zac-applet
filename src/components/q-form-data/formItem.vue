<!--
 * @作者: 郭莉猛
 * @Date: 2023-10-13 13:52:41
 * @FilePath: /uni-preset-vue-vite-ts 2/src/components/q-form-data/formItem.vue
 * @描述: 
 * 
-->
<template>
  <u-form-item
      :label="obj?.typeSet?.labelType ? '' : obj.name"
      :prop="objKey"
      borderBottom
      v-if="!obj?.hidden"
  >
    <template v-if="obj.type == 'input'">
      <u--input
        v-model="formValue.data[objKey]"
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
      </u--input>
    </template>
  </u-form-item>
</template>

<script setup lang="ts">
const props = defineProps({
  // 操作栏
  obj: {
    type: Object,
    default: () => {},
  },
  formValue: {
    type: Object,
    default: () => {}
  },
  objKey: {
    type: String,
    default: ''
  }
})


</script>