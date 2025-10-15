"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
exports.api = process.env.NEXT_PUBLIC_API_URL;
