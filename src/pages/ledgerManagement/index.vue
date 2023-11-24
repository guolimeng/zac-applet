import { onMounted } from "vue";

<!--
 * @作者: 郭莉猛
 * @Date: 2023-11-02 11:10:57
 * @FilePath: /uni-preset-vue-vite-ts 2/src/pages/ledgerManagement/index.vue
 * @描述: 分账管理
 * 
-->
<template>
  <view class="wrap">
    <!-- 搜索 -->
    <view class="search"> 
      <u-search
        :show-action="true"
        actionText="搜索"
        :animation="false"
        :actionStyle="{
          'color': 'rgb(30,102,235)'
        }"
        placeholder="请输入模板名称" />
    </view>

    <!-- 列表数据 -->
    <view class="warp-list">
      <view class="warp-list-item" v-for="(item1, index1) in listData" :key="index1">
        <view class="list-title">
          <view class="title-icon">
            <u-icon name="account-fill" color="#fff"></u-icon>
          </view>
          {{ item1.clearingConfigName }}
        </view>

        <view class="ledger-list">
          <view class="ledger-list-item" v-for="(item, index) in item1.clearingConfigDetails" :key="index">
            <text class="title">{{ item.bankUserName }}</text>
            <text class="line"></text>
            <text class="value">{{ `${item.percent }%` }}</text>
          </view>
        </view>

        <view class="list-footer">
          <view class="del" @click="delClick(item1)">
            <u-icon name="trash" size="24" color="rgb(191,198,206)"></u-icon>
          </view>
          
          <text class="edit" @click="addClick(item1.clearingConfigId)">修改</text>
        </view>
      </view>
    </view>

    <view class="add-add-ledger" @click="addClick('')">
      新增分账模板
    </view>

    <u-popup
      :safeAreaInsetBottom="true"
			:safeAreaInsetTop="true"
      :mode="'center'"
      :overlay="true"
      :closeOnClickOverlay="true"
      :round="10"
      :show="popupShow"
      @close="close"
      :customStyle="customStyle"
    >
        <view class="tip-box">
            <text>{{ popupTitle }}</text>
            <view class="tip-box-btn">
              <up-button type="info" :plain="true" text="取消" :customStyle="{width: '100px'}" @click="cancelClick"></up-button>
              <up-button type="primary" text="确定" :customStyle="{width: '100px'}" @click="confirmClick"></up-button>
            </view>
        </view>
		</u-popup>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, toRefs } from "vue";
import { clearingAccountChargeConfigList, clearingAccountChargeConfigDelete } from "@/api/ledgerManagement/ledgerManagement";
import { userStore } from "@/store/modules/user";
const userUserStore = userStore();
const popupShow = ref(false);

const customStyle = reactive({
  width: '80%'
});

const data = reactive({
  listData: [],
  clearingConfigId: '',
  popupTitle: ''
})

let { listData, clearingConfigId, popupTitle } = toRefs(data);

onMounted(()=> {
  getBillingList()
})

const getBillingList = () => {
  let param = {
    "operatorId": userUserStore.operatorId,
  }
  
  clearingAccountChargeConfigList(param).then((res) => {
    let { data } = res
    listData.value = data.clearingConfigDtos
  });
}

const close = () => {
  popupShow.value = false
}

// 删除
const delClick = (item: any) => {
  popupTitle.value = `确认删除「${item.clearingConfigName}」`
  // popupShow.value = tru
  uni.$u.sleep().then(() => {
    popupShow.value = !popupShow.value
    clearingConfigId.value = item.clearingConfigId
  })
}

const cancelClick = () => {
  popupShow.value = !popupShow.value
}

const confirmClick = () => {
  clearingAccountChargeConfigDelete({ clearingConfigId: clearingConfigId.value }).then(
    (result) => {
      cancelClick()
      getBillingList();
    }
  );
}

// 新增分账模板
const addClick = (clearingId?: string) => {
  uni.navigateTo({
    url: `/pages/ledgerManagement/addTemplateList?clearingId=${clearingId || ''}`,
  });
}
</script>

<style lang="scss" scoped>
.wrap {
  height: 100vh;
  background: rgb(241,244,247);
  .search {
    background: #fff;
    border-bottom: 1px solid rgb(231,235,240);
    padding: 10px;
  }
  .add-add-ledger {
    position: fixed;
    left: 0;
    bottom: 30px;
    background: rgb(30,102,235);
    color: #fff;
    width: calc(100% - 20px);
    font-size: 16px;
    line-height: 40px;
    text-align: center;
    margin: 0 10px;
  }

  .warp-list {
    height: calc(100% - 135px);
    overflow: auto;
    .warp-list-item {
      margin: 15px;
      border-radius: 5px;
      background: #fff;
      .list-title {
        display: flex;
        background: rgb(251,251,253);
        padding: 15px;
        font-size: 16px;
        .title-icon {
          width: 22px;
          margin-right: 5px;
          border-radius: 50%;
          background: rgb(93,199,92);
          :deep(.u-icon) {
            height: 20px;
            margin-left: 3px;
          }
        }
      }

      .ledger-list {
        padding: 0 15px;
        .ledger-list-item {
          font-size: 14px;
          line-height: 40px;
          display: flex;
          justify-content: space-around;
          border-bottom: 1px solid rgb(230,231,232);
          .line {
            margin: 8px 0;
            border-right: 1px solid rgb(230,231,232);
          }
          .title {
            width: 50%;
          }
          .value {
            width: 50%;
            padding-left: 10px;
          }
        }
      }

      .list-footer {
        display: flex;
        padding: 15px;
        font-size: 16px;
        background: #fff;
        justify-content: space-between;
        .del {
          width: 80px;
          height: 25px;
        }
        .edit {
          padding: 0 20px;
          color: rgb(17,106,249);
        }
      }
    }
  }
  .tip-box {
    text-align: center;
  }
  .tip-box-btn {
    display: flex;
    padding: 20px 0;
  }
}
</style>