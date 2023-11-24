/*
 * @作者: 郭莉猛
 * @Date: 2023-10-11 13:19:18
 * @FilePath: /uni-preset-vue-vite-ts 2/src/api/index.js
 * @描述:
 *
 */
// 拿到所有api
const modulesFiles = import.meta.globEager("./*/*.*");
const modules = {};
for (const key in modulesFiles) {
  const moduleName = key.replace(/(.*\/)*([^.]+).*/gi, "$2");
  const value = modulesFiles[key];
  if (value.default) {
    // 兼容js
    modules[moduleName] = value.default;
  } else {
    // 兼容ts
    modules[moduleName] = value;
  }
}
// console.log(666, modules);
export default modules;
