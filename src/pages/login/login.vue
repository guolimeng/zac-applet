<!--
 * @作者: 郭莉猛
 * @Date: 2023-08-25 19:45:55
 * @FilePath: /uni-preset-vue-vite-ts 2/src/pages/login/login.vue
 * @描述: 登录
 * 
-->
<template>
  <view class="content">
    <image class="logo" src="http://admin.niuhengzhineng.com/img/login-admin.99a6ad1c.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <view class="login-container">
      <q-form-data
        ref="uForm"
        v-model:value="data.formDataValidata"
        :rules="rules"
      >
        <template #inputPrefix1>
          <up-text
              text="http://"
              margin="0 3px 0 0"
              type="tips"
            ></up-text>
        </template>

        <template #footer>
          <view class="footer">
            <up-button type="primary" class="btn" style="margin-bottom: 10rpx;" text="登录" @click="submit"></up-button>
            <!-- <up-button type="primary" class="btn" :plain="true" text="注册"></up-button> -->
          </view>
        </template>
      </q-form-data>
    </view>
  </view>
</template>

<script setup lang="ts">
import md5 from 'js-md5';
import { operatorLogin, getOperatorUser } from "@/api/login/login";
import { userStore } from "@/store/modules/user";
const userUserStore = userStore();
import { ref } from 'vue'
const title = ref('运营商登录')
const uForm = ref();
const data = reactive({
  formDataValidata: {
    sets: {
      showTags: false,
      list: [
        {
          title: '基本信息',
          object: {
            username: {
              type: "input",
              placeholder: "请输入账号",
              clearable: false,
              typeSet: {
                // formItemRight: 'inputPrefix1'
              },
            },
            password: {
              type: "input",
              inputType: 'password',
              placeholder: "请输入密码",
              clearable: false,
              typeSet: {
                // prefixIcon: Lock,
              },
            },
          }
        }
      ],
      
    },
    data: {
      username: "",
      password: "",
    },
  },
  rules: {
    'username': { required: true, message: '请输入姓名',trigger: ['blur', 'change']},
    'password': { required: true, message: '请输入密码',trigger: ['blur', 'change']},
  }
})

const { formDataValidata, rules } = toRefs(data)

const submit = () => {
  let formEl = uForm.value.$refs.formRef;
  let formDataList = formDataValidata.value.data;

  let param = {
    username: formDataValidata.value.data.username,
    password: md5(formDataValidata.value.data.password)
  }
  if (!formEl) return;
  formEl.validate().then( (res: any) => {
    
    userUserStore.login(param, operatorLogin).then((res: any) => {

      userUserStore.getInfo(getOperatorUser)
      uni.switchTab({
        url: '/pages/home/index',
        success: (res) => {
          let page = getCurrentPages().pop();
          if (page == undefined || page == null) return;
          page.onLoad();
        }
      });
    })

  }).catch((errors: any) => {
    console.log('校验失败');
  })
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 140rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 46rpx;
  color: #000;
}

.login-container {
  width: 80%;
}

.btn {
  margin-bottom: 10rpx;
}
</style>
