"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const person = {
    name: 'Peter'
};
// この書き方も使える。
exports.default = person;
// この書き方は、node用にcommonjsで変換されると module.exports = person になる。
// export = person
