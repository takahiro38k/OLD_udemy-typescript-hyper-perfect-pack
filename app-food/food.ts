// ❗️webpackでbundleする場合、拡張子.tsを書くとvscode上でエラーが出るので、省略する。
// ❗️webpackのresolveで設定が必要。
import { Foodable } from './interfaces'
import { Score } from './score'

export class Food implements Foodable {
  constructor(public element: HTMLDivElement) {
    // 通常だと、clickEventHandler()内のthisは、イベント内のcallbackなので
    // 対象のイベント要素であるelementを指し示す。
    // しかしそれだとclickEventHandler()内の処理が
    // element.element.classList... となるためエラーとなる。
    // エラー回避のため、bind()を使ってthisをインスタンス自身に結びつける。
    element.addEventListener('click', this.clickEventHandler.bind(this));
  }
  clickEventHandler() {
    // elementのopacity(透明度)を操作。
    // this.elementにfood-activeクラスがあれば消す、なければ付ける。
    this.element.classList.toggle('food--active');
    const score = Score.getInstance();
    score.render();
  }
}
