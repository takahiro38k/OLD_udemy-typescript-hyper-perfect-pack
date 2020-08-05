// いきなり document.getElementById ... と始める手続き型プログラミングではなく、
// オブジェクト指向プログラミング(Object Oriented Programming)で考えてコーディングする。
// 各部品をもの(object)として考えること。

// pathの拡張子は、webpackなどを使う場合は不要。ただし、使わない場合は必須。
// 拡張子ありの場合は、.tsではなく.jsであることに注意。あくまでコンパイル後にimportされる。
// import { Foods } from './foods.js'
// ❗️webpackでbundleする場合、拡張子.tsを書くとvscode上でエラーが出るので、省略する。
// ❗️webpackのresolveで設定が必要。
import { Foods } from './foods'
Foods.getInstance();
