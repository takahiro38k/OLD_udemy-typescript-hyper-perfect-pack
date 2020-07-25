// node内部で下記のようにobjectが作成されている。
// module.exports = {}

// exportsだけで参照できるよう、下記も内部で実行されている。
// exports = module.exports; // 💡jsのobjectは参照渡し。コピーではない点に注意。

// 上記をふまえ、下記はどちらも同じobjectに格納される。
module.exports.hello = 'hello'
exports.name = 'Peter';
