export type EventHandler<K extends keyof HTMLElementEventMap> = (
  this: HTMLElement,
  ev: HTMLElementEventMap[K]
) => unknown;

export interface ToString {
  toString(): string;
}
