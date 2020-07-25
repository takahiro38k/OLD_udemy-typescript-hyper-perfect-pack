import { Score } from './score.js';
export class Food {
    constructor(element) {
        this.element = element;
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
