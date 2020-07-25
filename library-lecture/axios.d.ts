// ❗️tsconfig.jsonの設定でコンパイル対象ファイルが限定されていたら、
// ❗️型定義fileを"files"などで有効にしないといけない。

// defaultの型定義に任意の型定義を追加して拡張するには、
// 下記のようにパッケージをimportする。
import axios from 'axios';
// declare moduleを使ってexportすると、名前付きexportとしてtsファイルで使えるようになる。
declare module 'axios' {
  // export function axiosNewFunc(): void;
  function axiosNewFunc(): void; // ↑exportはなくてOK。
}

// 💡補足
// default設定でdeclare moduleが宣言されていて、
// 値とnamespaceが存在する場合、上記の書き方だとエラーになる
// (値と、値を保持しているnamespaceは共存できないため。上記だとfunctionが値と見なされる)。
// 対処としてい、値でなく、interfaceなどを使って型を定義する。
