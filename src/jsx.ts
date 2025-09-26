import type { EventHandler, ToString } from "./types.ts";

interface JsxStandardProperties {
  id?: HTMLElement["id"];
  class?: HTMLElement["className"];
  style?: Partial<CSSStyleDeclaration>;
  onClick?: HTMLElement["onclick"];
  onMouseLeave?: HTMLElement["onmouseleave"];
  onMouseOver?: HTMLElement["onmouseover"];
}

declare global {
  namespace JSX {
    type Element = HTMLElement;

    type IntrinsicElements = {
      [K in keyof HTMLElementTagNameMap]: JsxStandardProperties;
    };
  }
}

const JsxEventNames: Readonly<Array<string>> = Object.keys(window).filter(
  (key) => key.startsWith("on")
);

const JsxElementSymbol = Symbol("JsxElementSymbol");

interface JsxElementBrand {
  [JsxElementSymbol]: true;
}

type JsxHTMLElement = HTMLElement & {
  [JsxElementSymbol]: JsxElement;
};

export class JsxElement {
  _element: HTMLElement | null = null;
  _parent: JsxElement | null = null;
  _children: JsxElement[] = [];

  get parent(): JsxElement | null {
    return this._parent;
  }

  get children(): JsxElement[] {
    return this._children;
  }

  constructor() {}

  createElement(): HTMLElement {
    jsxBeginElement(this);
    this._element = this.render();
    jsxEndElement(this);
    return this._element;
  }

  render(): HTMLElement {
    return document.createElement("div");
  }
}

(JsxElement as unknown as JsxElementBrand)[JsxElementSymbol] = true;

interface JsxElementConstructor {
  new (): JsxElement;
}

export function jsxInit(
  hostElement: HTMLElement,
  appElement: HTMLElement
): void {
  hostElement.appendChild(appElement);
}

function jsxCanWriteProperty(
  obj: object,
  key: string
): obj is { [key]: unknown } {
  if (Object.hasOwn(obj, key)) {
    return true;
  }

  // TODO: Go all the way up the prototype chain.
  const desc =
    Object.getOwnPropertyDescriptor(obj, key) ??
    Object.getOwnPropertyDescriptor(Object.getPrototypeOf(obj), key);

  if (desc?.writable || desc?.set) {
    return true;
  }

  return false;
}

const JsxElementStack: JsxElement[] = [];

function jsxBeginElement(jsxElement: JsxElement): void {
  JsxElementStack.push(jsxElement);
}

function jsxEndElement(jsxElement: JsxElement): void {
  const poppedElement = JsxElementStack.pop();

  if (poppedElement !== jsxElement) {
    throw new Error("jsxEndElement did not match jsxBeginElement.");
  }
}

type JsxFunction = (
  props: (JsxStandardProperties & Record<string, ToString>) | null,
  children: HTMLElement[]
) => HTMLElement;

export function jsx(
  tag: JsxFunction | string,
  props: (JsxStandardProperties & Record<string, ToString>) | null,
  ...children: HTMLElement[]
): HTMLElement {
  let element: HTMLElement = undefined!;

  if (typeof tag === "function") {
    if ((tag as unknown as JsxElementBrand)[JsxElementSymbol]) {
      const jsxElement =
        new (tag as unknown as JsxElementConstructor)() as JsxElement;

      if (props) {
        for (const [key, value] of Object.entries(props)) {
          if (jsxCanWriteProperty(jsxElement, key)) {
            jsxElement[key] = value;

            // If we write it to the JsxElement instance than do not
            // write it to the HTMLElement as well.
            delete props[key];
          }
        }
      }

      element = jsxElement.createElement();
      (element as unknown as JsxHTMLElement)[JsxElementSymbol] = jsxElement;

      if (props) {
        // If class was provided on the JsxElement and the root element of the
        // rendered class also has a class set then merge the two.
        if (props.class) {
          element.className = element.className
            ? element.className + " " + props.class
            : props.class;
          delete props.class;
        } else if (props.style) {
          for (const [styleKey, styleValue] of Object.entries(props.style)) {
            // @ts-ignore TODO Figure out this typing
            element.style[styleKey] = styleValue;
          }
          delete props.style;
        }
      }

      if (JsxElementStack.length) {
        const parentJsxElement = JsxElementStack[JsxElementStack.length - 1]!;
        jsxElement._parent = parentJsxElement;
        parentJsxElement._children.push(jsxElement);
      }
    } else {
      return tag(props, children);
    }
  } else {
    element = document.createElement(tag);
  }

  if (props) {
    for (const [key, value] of Object.entries(props)) {
      const keyLowerCase = key.toLowerCase();
      if (key.startsWith("on") && JsxEventNames.includes(keyLowerCase)) {
        element.addEventListener(
          keyLowerCase.substring(2) as keyof HTMLElementEventMap,
          value as EventHandler<keyof HTMLElementEventMap>
        );
      } else {
        element.setAttribute(key, value.toString());
      }
    }
  }

  for (const child of children) {
    jsxAppendChild(element, child);
  }

  return element;
}

function jsxAppendChild(
  element: HTMLElement,
  child: HTMLElement[] | HTMLElement
): void {
  if (Array.isArray(child)) {
    for (const _child of child) {
      jsxAppendChild(element, _child);
    }
  } else {
    element.appendChild(
      child.nodeType === undefined
        ? document.createTextNode(child.toString())
        : child
    );
  }
}
