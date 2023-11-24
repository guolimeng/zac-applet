"use strict";
const utils_request = require("../../utils/request.js");
function operatorLogin(data) {
  return utils_request.request({
    url: `/v1/operator/login`,
    method: "post",
    data
  });
}
function getOperatorUser(data) {
  return utils_request.request({
    url: `/v1/operator/current-user-info`,
    method: "post",
    data
  });
}
exports.getOperatorUser = getOperatorUser;
exports.operatorLogin = operatorLogin;
