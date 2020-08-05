// いきなり document.getElementById ... と始める手続き型プログラミングではなく、
// オブジェクト指向プログラミング(Object Oriented Programming)で考えてコーディングする。
// 各部品をもの(object)として考えること。
// pathの拡張子は、webpackなどを使う場合は不要。ただし、使わない場合は必須。
// 拡張子ありの場合は、.tsではなく.jsであることに注意。あくまでコンパイル後にimportされる。
import { Foods } from './foods.js';
Foods.getInstance();
