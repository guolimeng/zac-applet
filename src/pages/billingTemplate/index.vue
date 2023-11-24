<!--
 * @作者: 郭莉猛
 * @Date: 2023-11-02 11:10:57
 * @FilePath: /uni-preset-vue-vite-ts 2/src/pages/billingTemplate/index.vue
 * @描述: 计费模板
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
      <view class="warp-list-item" v-for="(item1, index1) in listData111" :key="index1">
        <view class="list-title">
          <view class="title">
            <view class="title-icon">
              <u-icon name="rmb" color="#fff" :bold="true" top="2px"></u-icon>
            </view>
            {{ item1.templateName }}
          </view>
          <view class="type">
            <text class="value">{{ item1.billingModeDesc }}</text>
          </view>
        </view>
        <view class="ledger-list">
          <view class="ledger-list-item " >
            <view class="ledger-list-header"
              v-for="(item, index) in isTableHeade(item1.billingMode)" 
              :key="index"
              :style="{'flex': `1`}"
            >
              <text class="title" style="display: inline-block;">{{ item.label }}</text>
              <text class="line"></text>
            </view>
          </view>
          <template v-if="item1.billingMode == '04' || item1.billingMode == '07'">
            <view class="free-templates">
              <view>
                <u-icon name="account-fill" size="18" color="rgb(191,198,206)"></u-icon>
              </view>
              免费模板
            </view>
          </template>

          <view class="ledger-list-item ledger-list-items1" v-else v-for="(item, index) in isTableData(item1.billingMode, item1)" :key="index" >
            <text class="title" v-if="item1.billingMode == '01'" :style="{'flex': `1`}" >{{ `${item.hour}小时` }}</text>
            <text class="title" v-if="item1.billingMode == '03'" :style="{'flex': `1`}" >{{ `${item.minPower}W ~ ${item.maxPower}W` }}</text>

            <text class="title" v-if="item1.billingMode == '05'" :style="{'flex': `1`}" >{{ item.config }}</text>

            <text class="title" v-if="item1.billingMode == '06'" :style="{'flex': `1`}" >{{ `${item.startTime} ~ ${item.endTime}` }}</text>

            <text class="line"></text>
            <text class="title" v-if="item1.billingMode == '01'" :style="{'flex': `1`}">{{ `${ Number((item.amount / 100).toFixed(2)) }元` }}</text>
            <text class="title" v-if="item1.billingMode == '03'" :style="{'flex': `1`}" >{{ `${Number((item.amount / 100).toFixed(2))}元/${item.hour}小时` }}</text>

            <text class="title" v-if="item1.billingMode == '05'" :style="{'flex': `1`}" >{{ item.value }}</text>

            <text class="title" v-if="item1.billingMode == '06'" :style="{'flex': `1`}" >{{ `${ parseFloat((item.electricityPrice / 100).toPrecision(12)) }元/度` }}</text>

            <text class="line" v-if="isTableHeade(item1.billingMode).length > 2"></text>
            <text class="title" v-if="item1.billingMode == '06'" :style="{'flex': `1`}" >{{ `${ parseFloat((item.servicePrice / 100).toPrecision(12))  }元/度` }}</text>
          </view>
        </view>

        <view class="list-footer">
          <view class="del" @click="delClick(item1)">
            <u-icon name="trash" size="24" color="rgb(191,198,206)"></u-icon>
          </view>
          
          <text class="edit" @click="addClick(item1.chargeConfigId)">修改</text>
        </view>
      </view>
    </view>

    <view class="add-add-ledger" @click="addClick('')">
      新增计费模板
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
import { onMounted } from "vue";
import { chargeConfigList, chargeConfigDelete } from "@/api/billingTemplate/billingTemplate";
import { userStore } from "@/store/modules/user";
const userUserStore = userStore();

const popupShow = ref(false);

const customStyle = reactive({
  width: '80%'
});

const data = reactive({
   tableHeadeHour: [
    { label: "时长", prop: "hourData"},
    { label: "收费", prop: "amount"},
  ],
  tableDataHour: [],

  tableHeadePower: [
    { label: "功率", prop: "powerData"},
    { label: "收费", prop: "amount"},
  ],

  tableDataPower: [],

  tableHeadeService: [
    { label: "配置", prop: "config"},
    { label: "值", prop: "value"},
  ],

  tableDataService: [],

  // 按量
  tableHeadeMeasure: [
    { label: "电量", prop: "measure"},
    { label: "收费", prop: "amount"},
  ],

  tableDataMeasure: [],

  // 汽车服务费
  tableHeadeCarService: [
    { label: "时间段", prop: "timeInterval"},
    { label: "电费单价", prop: "electricityPrice"},
    { label: "服务费单价", prop: "servicePrice"},
  ],

  tableDataCarService: [],
  listDataHeader: [
    { label: "时间", prop: "hourData"},
    { label: "定价", prop: "amount"},
    { label: "定价1", prop: "amount1"},
  ],
  listData: [
    { 
      hourData: '牛超',
      amount: "100",
      amount1: "100",
    },
    { 
      hourData: '刘薇',
      amount: "10",
      amount1: "100",
    },
  ],
  listData111: [],
  popupTitle: '',
  chargeConfigId: '',
})


let { listData, listData111 ,listDataHeader, popupTitle, chargeConfigId, tableHeadeHour, tableHeadePower, tableHeadeService, tableHeadeMeasure, tableHeadeCarService  } = toRefs(data);

onMounted(()=> {
  getBillingList()
})

const getBillingList = () => {
  let param = {
    "operatorId": userUserStore.operatorId,
  }
  
  chargeConfigList(param).then((res) => {
    let { data } = res
    listData111.value = data.chargeConfigInfoList
  });
}

const methodWithArg = (header: any) => {
  let width = ''
  switch(header) {
    case 'listDataHeader': 
      width = '30'
    break
  }
  
  return width
};

// 删除
const delClick = (item: any) => {
  popupTitle.value = `确认删除「${item.templateName}」`
  uni.$u.sleep().then(() => {
    popupShow.value = !popupShow.value
    chargeConfigId.value = item.chargeConfigId
  })
}

// 新增分账模板
const addClick = (id:any) => {
  uni.navigateTo({
    url: `/pages/billingTemplate/addTemplateList?chargeConfigId=${id || ''}`,
  });
}

const close = () => {
  popupShow.value = false
}

const cancelClick = () => {
  popupShow.value = !popupShow.value
}

// 确认删除
const confirmClick = () => {
  chargeConfigDelete({ chargeConfigId: chargeConfigId.value }).then(
    (result) => {
      cancelClick()
      getBillingList();
    }
  );
}

const isTableHeade = (type: string) => {
  switch(type) {
    case '01':
      return tableHeadeHour.value
      break
    case '02':
      return tableHeadeMeasure.value
      break
    case '03':
      return tableHeadePower.value
      break
    case '05':
      return tableHeadeService.value
      break
    case '06':
      return tableHeadeCarService.value
      break
  }
}

const isTableData = (type: string, item: any) => {
  let serviceList = []
  switch(type) {
    case '01':
    case '02':
    case '03':
      return item.chargingCostList
      break
    case '05':
      serviceList = [
        { config: '服务费单价' , value: `${ parseFloat((item.serviceTemplate.servicePrice / 100).toPrecision(12)) }元/小时` },
        { config: '服务费时间限制' , value: `${ item.serviceTemplate.serviceTimeLimit }分钟` },
        { config: '电费单价' , value: `${ parseFloat((item.serviceTemplate.electricityPrice / 100).toPrecision(12)) }元/度` },
        { config: '预支付总额' , value: `${ parseFloat((item.serviceTemplate.advanceTotalAmount / 100).toPrecision(12)) }元` },
        { config: '预支付服务费金额' , value: `${ parseFloat((item.serviceTemplate.advanceServiceAmount / 100).toPrecision(12)) }元` },
      ]
      
      return serviceList
      break
    case '06':
      return item.timePeriods
      break
  }
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
    height: calc(100% - 120px);
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
        .title {
          display: flex;
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
        .type {
          margin-left: 5px;
          height: 21px;
          white-space: nowrap;
          line-height: 18px;
          background: #fafcfd;
          border-radius: 2px;
          border: 1px solid #eff0f3;
          padding: 0 4px;
          .value {
            color: #798292;
            font-size: 10px;
            font-weight: bold;
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
            width: calc(100% - 10px);
            padding-left: 10px;
          }
        }
        .ledger-list-items1 {
          .title {
            &:first-child{
              // padding-left: 0px;
            }
          }
        }
        .ledger-list-header {
          &:last-child {
            .line {
              display: none;
            }
            
          }
          &:first-child{
            .title {
              // padding-left: 0px;
              // width: 100%;
            }
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

  .free-templates {
    text-align: center;
    color: #798292;
    font-weight: bold;
    font-size: 14px;
    display: flex;
    justify-content: center;
    padding: 20px;
    border-bottom: 1px solid rgb(230, 231, 232);
  }
}
</style>