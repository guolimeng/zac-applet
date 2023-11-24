<!--
 * @作者: 郭莉猛
 * @Date: 2023-03-21 18:51:09
 * @FilePath: /uni-preset-vue-vite-ts 2/src/pages/areaManagement/areaManagement/components/tabs.vue
 * @描述: 
 * 
-->
<template>
  <view class="tab-title">
    <view 
      class="tab-pane"
      v-for="item in props.tabsData"
      :key="item.value"
      @click="changeTab(item)"
    >
      <text
        class="item"
        :class="{ active: currentActive === item.value }"
        
      >
        {{ item.name }}
      </text>
      <!-- <Transition> -->
        <view class="line" v-if="currentActive === item.value"></view>
      <!-- </Transition> -->
    </view>
  </view>
</template>

<script setup lang="ts">
const props = defineProps({
  tabsData: {
    type: Array as any,
    default: () => [],
    required: true,
  },
  defaultActive: {
    type: String,
    default: "1",
  },
});
const currentActive = ref("1");
onMounted(() => {
  console.log("tabs数据", props.tabsData);
});
// 监听
watch(
  () => props.defaultActive,
  (newValue) => {
    currentActive.value = newValue;
  },
  { deep: true, immediate: true }
);
const emit = defineEmits(["changeTab"]);
const changeTab = (item: any) => {
  currentActive.value = item.value;
  emit("changeTab", item, item.value);
};
</script>

<style lang="scss" scoped>
.tab-title {
  border-radius: 4px;
  // background: #e6e8eb;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 500;
  line-height: 40px;
  border-bottom: 1px solid #dce2e8;
  display: flex;
  justify-content: center;
  .tab-pane {
    width: 100%;
  }
  .item {
    padding: 0 15px;
    font-size: 16px;
    line-height: 32px;
    display: inline-block;
    color: #8e9aad;
    cursor: pointer;
  }
  .line {
    transform: translate3d(0px, 0px, 0px);
    border-top: 2px solid #006cff;
    transition: transform .3s cubic-bezier(.645,.045,.355,1),width .2s cubic-bezier(.645,.045,.355,1),left .3s cubic-bezier(.645,.045,.355,1);
  }
  .active {
    background: #fff;
    color: #3190ff;
    /*margin: 3px;*/
    line-height: 26px;
    border-radius: 2px;
  }
}
</style>
