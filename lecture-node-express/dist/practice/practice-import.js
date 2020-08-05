"use strict";
// 外部のパッケージをinstallする場合は、ts用のdefault exportが用意されていない可能性があるので、
// 下記のどちらかを選択する(どちらでも可)。
// import * as practice from './practice-export';
// import practice = require('./practice-export');
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// tsconfig.jsonの"esModuleInterop"がtrueであることで、
// 下記の書き方もできるようになる。
const practice_export_1 = __importDefault(require("./practice-export"));
console.log(practice_export_1.default);
