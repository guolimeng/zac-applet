/*
 * @作者: 郭莉猛
 * @Date: 2023-11-22 17:52:05
 * @FilePath: /uni-preset-vue-vite-ts 2/src/api/businessManagement/businessManagement.ts
 * @描述:
 *
 */
import request from "@/utils/request";

// 统计查询
export function statisticsQuery(data: object) {
  return request({
    url: `/v1/statistics/statistics-query`,
    method: "post",
    data,
  });
}
