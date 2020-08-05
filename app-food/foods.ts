// UIとして1つしか存在しないobjectは、複数回インスタンスが生成されるとエラーの原因になったり、
// メモリの無駄な消費につながりやすい。
// 今回の場合は、Scoreと、全FoodをまとめるFoodsは、1つであるべき。
// 実現するため、該当クラスでシングルトンパターン(private constructor)を使用する。

// ❗️webpackでbundleする場合、拡張子.tsを書くとvscode上でエラーが出るので、省略する。
// ❗️webpackのresolveで設定が必要。
import { Foodsable} from './interfaces'
import { Food } from './food'

export class Foods implements Foodsable {
  // privateをつけることで、インスタンスが複数作られるのを防ぐ(シングルトンパターン)。
  private static instance: Foods;
  // querySelectorAllはdefaultで下記のようにジェネリック型を持っている。
  // querySelectorAll<Element>()
  // 今回は、取得する要素に合わせてHTMLDivElementを指定する。
  elements = document.querySelectorAll<HTMLDivElement>('.food');
  private _activeElements: HTMLDivElement[] = [];
  private _activeElementsScore: number[] = [];
  // clickした要素('food--active'クラスを保持している要素)を配列で取得する。
  get activeElements() {
    this._activeElements = [];
    this.elements.forEach(element => {
      // contains() paraに指定したclassを持っていればtrue。なければfalse。
      if (element.classList.contains('food--active')) {
        this._activeElements.push(element);
      }
    });
    return this._activeElements;
  }
  // clickした要素('food--active'クラスを保持している要素)のスコアを配列で取得する。
  get activeElementsScore() {
    this._activeElementsScore = [];
    this.activeElements.forEach(element => {
      const foodScore = element.querySelector('.food__score');
      if (foodScore) {
        // Number()はparaがnullの場合0を返す。
        // 要素の内容(タグに挟まれたテキスト部分)を取得するには、textContentを使う。
        this._activeElementsScore.push(Number(foodScore.textContent));
      }
    })
    return this._activeElementsScore;
  }

  // クラス内でしかインスタンスを生成できないようにする。
  private constructor() {
    this.elements.forEach(element => {
      new Food(element);
    });
  }
  // インスタンスがなければ生成し、ある場合は既存のインスタンスを返す(シングルトンパターン)。
  static getInstance() {
    if (!Foods.instance) {
      Foods.instance = new Foods();
    }
    return Foods.instance;
  }
}
