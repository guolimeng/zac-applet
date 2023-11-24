"use strict";
const utils_request = require("../../utils/request.js");
function statisticsQuery(data) {
  return utils_request.request({
    url: `/v1/statistics/statistics-query`,
    method: "post",
    data
  });
}
exports.statisticsQuery = statisticsQuery;
