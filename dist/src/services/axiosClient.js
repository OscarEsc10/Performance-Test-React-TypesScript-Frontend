"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var config_1 = require("../../config/config");
var res = await axios_1.default.get("".concat(config_1.api, "/products"));
console.log(res.data);
exports.default = config_1.api;
