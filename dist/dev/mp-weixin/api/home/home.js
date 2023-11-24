"use strict";
const utils_request = require("../../utils/request.js");
function statisticsQueryALl(data) {
  return utils_request.request({
    url: `/v1/statistics/statistics-queryAll`,
    method: "post",
    data
  });
}
exports.statisticsQueryALl = statisticsQueryALl;
