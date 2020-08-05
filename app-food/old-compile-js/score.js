// UIとして1つしか存在しないobjectは、複数回インスタンスが生成されるとエラーの原因になったり、
// メモリの無駄な消費につながりやすい。
// 今回の場合は、Scoreと、全FoodをまとめるFoodsは、1つであるべき。
// 実現するため、該当クラスでシングルトンパターン(private constructor)を使用する。
import { Foods } from './foods.js';
export class Score {
    // クラス内でしかインスタンスを生成できないようにする。
    constructor() {
    }
    get totalScore() {
        // スコアの配列であるactiveElementsScore(ゲッター)を取得するため、
        // Foodsクラスのインスタンスを生成。
        const foods = Foods.getInstance();
        // Array.prototype.reduce()
        // 配列内の合計によく使う。
        // 1st para  callback: (蓄積値, 現在の値) => 戻り値: 次のループに渡る蓄積値
        // 2nd para  蓄積値の初期値
        // return    最終的な蓄積値
        return foods.activeElementsScore.reduce((total, score) => total + score, 0);
    }
    render() {
        document.querySelector('.score__number').textContent = String(this.totalScore);
    }
    // インスタンスがなければ生成し、ある場合は既存のインスタンスを返す(シングルトンパターン)。
    static getInstance() {
        if (!Score.instance) {
            Score.instance = new Score();
        }
        return Score.instance;
    }
}
