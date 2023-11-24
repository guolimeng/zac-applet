/*
 * @作者: 郭莉猛
 * @Date: 2023-09-07 16:14:48
 * @FilePath: /uni-preset-vue-vite-ts 2/src/utils/auth.ts
 * @描述:
 *
 */
const TokenKey = "userTokenHead";
// 存入token
export function setToken(token: string) {
  return uni.setStorageSync(TokenKey, token);
}
// 获取Token
export function getToken() {
  return uni.getStorageSync(TokenKey);
}
export function removeToken() {
  return uni.removeStorageSync(TokenKey);
}
