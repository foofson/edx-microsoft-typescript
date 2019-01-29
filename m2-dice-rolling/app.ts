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
    (this.div as HTMLElement).style.textDecoration = "bold";
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

let diceTable: Element = document.createElement('div');
(diceTable as HTMLElement).style.display = "table";
(diceTable as HTMLElement).style.borderSpacing = "15px";
document.body.appendChild(diceTable);

function createDice(size: number, border: number, color: string): Array<DieRoller> {
  let dice: Array<DieRoller> = [];
  for (let i: number = 0; i < 4; i++) {
    let div: Element = document.createElement('div');
    let die: DieRoller = new DieRoller(div, size, size, border, color);
    die.append(diceTable);
    dice.push(die);
  }
  return dice;
}

let dieSize: number = 100;
let dieBorder: number = 5;
let dieColor: string = "orange";

let dice: Array<DieRoller> = createDice(dieSize, dieBorder, dieColor);

let buttonCell: Element = document.createElement('div');
(buttonCell as HTMLElement).style.display = "table-cell";
(buttonCell as HTMLElement).style.verticalAlign = "middle";
diceTable.appendChild(buttonCell);

let rollButton: Element = document.createElement('button');
rollButton.textContent = "Roll the dice";
(rollButton as HTMLElement).onclick = () => {
  dice.forEach((die) => {
    die.roll();
  });
};
(rollButton as HTMLElement).style.fontSize = "1.25em";
buttonCell.appendChild(rollButton);
