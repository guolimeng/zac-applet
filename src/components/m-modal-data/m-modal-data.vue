<!--
 * @作者: 郭莉猛
 * @Date: 2023-11-22 18:05:07
 * @FilePath: /uni-preset-vue-vite-ts 2/src/components/my-modal/my-modal.vue
 * @描述: 
 * 
-->
<template>
  <u-modal :show="isModalShow" :title="props.title" :content='content'>
    <template #confirmButton>
				<u-button
					text="确定"
					type="success"
          :customStyle="{width: '100px'}"
          @click="close"
				></u-button>
			</template>
  </u-modal>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";

const props = defineProps({
  modalShow: {
    type: Boolean,
    default: false,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  }
})

const isModalShow = ref(false);
const popupTitle = ref('')
// 监听
watch(
  () => props.modalShow,
  (newVal) => {
    console.log('newVal',newVal);
    
    isModalShow.value = newVal;
   
  },
  { deep: true, immediate: true }
);

const emit = defineEmits(["handleClose", "handleConfirm"]);
const close = () => {
  emit("handleClose");
}
const confirmClick = () => {
  emit("handleConfirm");
}
</script>