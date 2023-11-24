<!--
 * @作者: 郭莉猛
 * @Date: 2023-08-25 19:45:55
 * @FilePath: /uni-preset-vue-vite-ts 2/src/pages/home/index.vue
 * @描述: 
 * 
-->
<template>
  <view class="content">
    <view class="asset-information">
      <view class="module-title">资产信息</view>
      <view>
        <view class="info-module" v-for="(item, index) in deviceTotalData" :key="index">
          <view class="header">
            <!-- <view>
              
            </view> -->
            <view class="header-title" @click="clickBox(item)">
              {{ item.title }}
              <text class="device-num">{{ item.deviceNum }}</text>
              <view v-if="item.question" >
                <u-icon name="question-circle" color="rgb(140,142,152)" size="14" top="5"></u-icon>
              </view>
            </view>
          </view>

          <!-- 状态 -->
          <view class="device-status">
            <view class="device-status-item" v-for="(val, v_index) in item.stateDataList" :key="v_index" @click="stateClick(val)">
              <view class="status-top">
                <text class="round" :style="{'background': roundBg[val.state]}"></text>
                <view class="text">
                  {{ val.stateName }}
                </view>
                <view class="arrow-btn" v-if="val.state == '3'">
                  <u-icon name="arrow-right" size="14px" top="8" color="rgb(140,142,152)"></u-icon>
                </view>
              </view>
              <view class="status-num">{{ val.stateNum }}</view>
            </view>
          </view>
        </view>
      </view>
      <view class="total-list">
        <view class="total-list-item" v-for="(t_val, t_index) in totalData" :key="t_index">
          <view class="total-title">
            {{ t_val.title }}
            <view>
              <u-icon name="arrow-right" color="rgb(140,142,152)" size="14" top="5"></u-icon>
            </view>
          </view>
          <view class="total-num">
            {{ t_val.num }}
          </view>
        </view>
      </view>
    </view>

    <view class="asset-information">
      <view class="module-title">运营效率</view>

      <view class="efficiency">
        <view class="efficiency-item" v-for="(e_val, e_index) in efficiencyData" :key="e_index">
          <view class="efficiency-title">{{ e_val.title }}</view>
          <view class="efficiency-num">
            <text class="value">{{ e_val.num }}</text>
            {{ e_val.unit }}
          </view>
        </view>
      </view>
    </view>

    <view class="asset-information">
      <view class="warp-btn">
        <view class="detail-item" v-for="(m_val, m_index) in menuData" :key="m_index" @click="menuClick(m_val)">
          <view class="icon"> 
            <image class="img" :src="m_val.icon" />
          </view>

          <view class="key">{{ m_val.title }}</view>
        </view>
      </view>
    </view>
  </view>

  <m-modal-data
    :modalShow="modalShow"
    :title="modalTitle"
    :content="modalContent"
    @handleClose="handleClose"
    @handleConfirm="handleConfirm"
  />
</template>

<script setup lang="ts">
import { onMounted, ref,reactive } from "vue";
import { onLoad, onShow, onReady, onPullDownRefresh } from '@dcloudio/uni-app'
import { statisticsQueryALl } from "@/api/home/home";
const data = reactive({
  deviceTotalData: [
    {
      title: '设备总量（台）',
      deviceNum: 0,
      question: false,
      stateDataList: [
        {
          state: '1',
          stateName: '在线',
          stateNum: 0
        },
        {
          state: '3',
          stateName: '离线',
          stateNum: 0
        },
      ]
    },
    {
      title: '端口总量（个）',
      deviceNum: 0,
      question: true,
      stateDataList: [
        {
          state: '2',
          stateName: '使用中',
          stateNum: 0
        },
        {
          state: '0',
          stateName: '空闲中',
          stateNum: 0
        },
      ]
    },
  ],
  totalData: [
    {
      title: '片区总量',
      num: '',
      key: 'orgs'
    },
    {
      title: '充电站总量',
      num: '',
      key: 'stations'
    },
    {
      title: '卡片总量',
      num: '0'
    },
  ],
  efficiencyData: [
    {
      title: '近7日使用率',
      num: '0',
      unit: '%'
    },
    {
      title: '近7日客单价',
      num: '0',
      unit: '元/单'
    },
  ],
  menuData: [
    { 
      title: '新建片区',
      icon: "/static/home/area.png",
      path: '/pages/areaManagement/areaManagement/addArea',
    },
    { 
      title: '新建充电站',
      icon: "/static/home/station.png",
      path: '/pages/areaManagement/chargingStation/components/addShortcutCreateSite',
    },
    { 
      title: '查看订单',
      icon: "/static/home/order.png"
    },
    { 
      title: '查看分账',
      icon: "/static/home/accounts.png"
    },
  ],
  roundBg: {
    '0': '#409eff',
    '1': '#67c23a',
    '2': '#e6a23c',
    '3': '#f56c6c'
  },
  modalTitle: '端口总量',
  modalContent: '端口数量即为所有插座插孔数量、充电桩电枪数量、充电柜仓口数量、换电柜仓口数量等的总和',
})

const modalShow = ref(false)

let { deviceTotalData, roundBg, totalData, efficiencyData, menuData, modalTitle, modalContent } = toRefs(data);

onMounted(() => {
  console.log('数据',deviceTotalData.value);
  
})
onLoad(() => {
  queryDataAll()
})

// 获取全部数据
const queryDataAll = () => {
  statisticsQueryALl({}).then((res) => {
    let { data } = res
    deviceTotalData.value[0].deviceNum = (Number(data.ydevices) || 0) + (Number(data.ndevices) || 0)
    deviceTotalData.value[0].stateDataList[0].stateNum = data.ydevices || 0
    deviceTotalData.value[0].stateDataList[1].stateNum = data.ndevices || 0

    deviceTotalData.value[1].deviceNum = (Number(data.nport) || 0) + (Number(data.yport) || 0)
    deviceTotalData.value[1].stateDataList[0].stateNum = data.nport || 0
    deviceTotalData.value[1].stateDataList[1].stateNum = data.yport || 0

    totalData.value[0].num = data.orgs || 0
    totalData.value[1].num = data.stations || 0
  });
}

const stateClick = (item: any) => {
  uni.navigateTo({
    url: `/pages/areaManagement/deviceMg/leaveDevice`,
  });
}

const menuClick = (item: any) => {
  console.log('item',item);
  if(item.path) {
    uni.navigateTo({
      url: item.path,
    });
  }
  
}

const clickBox = (item:any) => {
  if(item.question) {
    modalShow.value = true
  }
}

const handleClose = () => {
  modalShow.value = false
}

const handleConfirm = () => {
  modalShow.value = false
}
</script>

<style lang="scss" scoped>
.content {
  height: 99vh;
  padding-top: 1px;
  background: rgb(241,244,247);
  .asset-information {
    margin: 10px;
    padding: 10px;
    background: #fff;
    border-radius: 5px;
    .module-title {
      font-size: 20p;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .info-module {
      margin: 10px 0;
      padding: 15px 10px;
      background: rgb(241,247,255);
      .header {
        font-size: 14px;
        line-height: 24px;
        .header-title {
          display: flex;
          .device-num {
            font-size: 16px;
            font-weight: bold;
            padding-right: 5px;
          }
        }
        
      }
      .device-status {
        display: flex;
        padding-top: 5px;
        .device-status-item {
          width: 50%;
          .status-top {
            display: flex;
            font-size: 14px;
            line-height: 30px;
            .round {
              width: 5px;
              height: 5px;
              background: red;
              border-radius: 50%;
              margin: 12px 10px 12px 0;
            }
          }
          .status-num {
            font-size: 16px;
            font-weight: bold;
          }
        }
      }
      
    }

    .total-list {
      display: flex;
      .total-list-item {
        width: 33%;
        margin-right: 10px;
        background: rgb(241, 247, 255);
        padding: 15px 10px;
        border-radius: 5px;
        &:last-child{
          margin-right: 0;
        }
        .total-title {
          font-size: 14px;
          display: flex;
          line-height: 24px;
        }
        .total-num {
          font-size: 16px;
          font-weight: bold;
        }
        
      }
      
    }
    .efficiency {
      display: flex;
      .efficiency-item {
        width: 50%;
        padding: 20px 10px;
        font-size: 14px;
        .value {
          font-size: 20px;
          font-weight: bold;
        }
      }
    }
    .warp-btn {
      display: flex;
      // flex-wrap: wrap;
      // margin: 10px;
      .detail-item {
        width: 25%;
        background: #fff;
        margin: 5px;
        text-align: center;
        font-size: 12px;
        padding: 5px;
        border-radius: 6px;
        box-sizing: border-box;
        color: rgb(155,155,154);
        .icon {
          width: 35px;
          height: 35px;
          // background: pink;
          margin: 10px auto 10px;
          border-radius: 7px;
          .img {
            width: 100%;
            height: 100%;
          }
        }

      }
    }
  }
}
</style>
