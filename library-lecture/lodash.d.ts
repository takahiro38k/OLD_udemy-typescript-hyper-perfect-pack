// ❗️tsconfig.jsonの設定でコンパイル対象ファイルが限定されていたら、
// ❗️型定義fileを"files"などで有効にしないといけない。

// ************************************************************
// ########import時の手動型定義

/**
 * ⭐️declare
 * どこか別のfileでその変数が使われる、という宣言。
 * 下記のCDN項目(コメント部分)にもあるようなに、constなどにも使えるが、
 * 値を持っていない型で、別のfileで使われる、ということを意味する。
 * iiiii CHECK iiiii
 * declareの中身は、exportがあってもなくても同じ意味。どっちでもOK。
 */
// import名に合わせて宣言する。
declare module 'lodash' {
  // shuffle()の型を定義する。
  export function shuffle<T>(arr: T[]): T[];
}

// ************************************************************
// ########CDN利用時の型定義

// CDNでエラーを出さないための型定義

// ◆interfaceで書く場合
// interface Lodash {
//   shuffle<T>(arr: T[]): T[];
// }
// // _ はLodashのこと。
// declare const _: Lodash;

// ◆namespaceで書く場合
declare namespace _ {
  function shuffle<T>(arr: T[]): T[];
}
