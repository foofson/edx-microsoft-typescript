"use strict";

enum DieValue {
  None,
  One,
  Two,
  Three,
  Four,
  Five,
  Six
}

interface DieInterface {
  div: Element;
  width: number;
  height: number;
  border: number; // implicitly solid black
  color: string;
}

class Die implements DieInterface {
  static DieValue = DieValue;

  constructor(
    public div: Element,
    public width: number,
    public height: number,
    public border: number, // implicitly solid black
    public color: string,
    protected value: DieValue = DieValue.None
  ) {
    (this.div as HTMLElement).style.width = `${this.width}px`;
    (this.div as HTMLElement).style.height = `${this.height}px`;
    (this.div as HTMLElement).style.border = `${this.border}px solid black`;
    (this.div as HTMLElement).style.backgroundColor = color;
    (this.div as HTMLElement).style.display = "table-cell";
    (this.div as HTMLElement).style.textAlign = "center";
    (this.div as HTMLElement).style.verticalAlign = "middle";
    (this.div as HTMLElement).style.fontSize = "1.5em";
    (this.div as HTMLElement).style.fontWeight = "bold";
  }

  append: Function = (target: Element): boolean => {
    (target as HTMLElement).appendChild(this.div);
    return true;
  };

  setValue: Function = (value: number): boolean => {
    this.value = (value as DieValue);
    (this.div as HTMLElement).innerText = DieValue[value];
    return true;
  };
}

class DieRoller extends Die {
  constructor(div: Element, length: number, width: number, border: number, color: string) {
    super(div, length, width, border, color);
  }

  roll: Function = (): boolean => {
    this.setValue(getRandomIntInclusive(1, 6));
    return true;
  };
}

let getRandomIntInclusive: Function = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default DieRoller;
