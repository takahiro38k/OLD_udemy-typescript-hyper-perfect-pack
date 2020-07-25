// ❗️❗️node(express)はバックエンドなので、ブラウザの更新(ページの読み込みなど)によって、
// バックエンドで実行される。
// console.log()も、ブラウザでは表示されないので注意。

// 下記2つの型定義fileをinstall。
// @types/node
// @types/express

// const express = require('express');
// nodeでは、jsでは上記の書き方だが、tsではmoduleの取得にrequireではなくimportを使う。
// 💡tsconfig.jsonの"esModuleInterop"がtrueであることで、下記の書き方ができる。。
import express, {Request, Response, NextFunction} from 'express'

interface MsgRequest extends Request {
  body: {
    msg: string;
  }
}

// 下記の書き方だと、callableエラーで関数などが使えない。よって上記の記法を使うこと。
// import * as express from 'express'

// expressでは、型推論が行われるので、あまり型の定義を気にする必要はない。

const app = express();

// app.postでreq.bodyを使うために、tsでは下記の記載が必要。
app.use(express.json());

// use()
// ミドルウェアと呼ぶ。何個も書けて、上から順番に実行される。
// 1st para のあつかいが get() と異なり、'/'を含めばなんでもOK。
app.use('/', (req, res, next) => {
  console.log(1);
  next();
})
// 1st paraを省略すると、'/'と同じ。
app.use((req, res, next) => {
  console.log(2);
  next();
})
app.use((req, res, next) => {
  console.log(3);
  next();
})

// GETリクエスト
// '/'を取得したら'<h1>Hello!</h1>'を返す。
app.get('/', (req, res, next) => {
  res.send('<h1>Hello!</h1>');
})

// POSTリクエスト
app.post('/', (req: MsgRequest, res, next) => {
  console.log(req.body);
  res.send(`<h1>I got ${req.body}</h1>`);
})

// エラーハンドリングはparaを1つ追加する。
// 一番最後に書くこと。
// nodeの仕様で、1st paraに追加しなければならず、tsはそれを型推論できずにエラーとなる。
// よって型注釈が必要。
// 通常のuse()の型推論をhoverしたり、右clickでGo to Type Definition したり、
// GitHubでコード検索したりして調べる。
// importへの追記も忘れずに。
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  next();
})

// ポート3000でlisten
app.listen(3000);
