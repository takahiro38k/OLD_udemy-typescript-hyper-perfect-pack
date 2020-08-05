// ドキュメントの役割もかねて、わかりやすいようinterfaceを作成。

export interface Scoreable {
  // getterのみなのでreadonly
  readonly totalScore: number;
  render(): void;
}

export interface Foodable {
  element: HTMLDivElement;
  clickEventHandler(): void;
}

export interface Foodsable {
  elements: NodeListOf<HTMLDivElement>;
  readonly activeElements: HTMLDivElement[];
  readonly activeElementsScore: number[];
}
