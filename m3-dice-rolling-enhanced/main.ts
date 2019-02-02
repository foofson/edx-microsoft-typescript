import DieRoller from './dieRoller.js'

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

namespace DieStyling {
  export let size: number = 100;
  export let border: number = 5;
  export let color: string = 'orange';
}

let diceTable: Element = document.createElement('div');
(diceTable as HTMLElement).style.display = 'table';
(diceTable as HTMLElement).style.borderSpacing = '15px';
document.body.appendChild(diceTable);

let dice: Array<DieRoller> = createDice(DieStyling.size, DieStyling.border, DieStyling.color);

let buttonCell: Element = document.createElement('div');
(buttonCell as HTMLElement).style.display = 'table-cell';
(buttonCell as HTMLElement).style.verticalAlign = 'middle';
diceTable.appendChild(buttonCell);

let rollButton: Element = document.createElement('button');
rollButton.textContent = 'Roll the dice';
(rollButton as HTMLElement).onclick = () => {
  dice.forEach((die) => {
    die.roll();
  });
};
(rollButton as HTMLElement).style.fontSize = '1.25em';
buttonCell.appendChild(rollButton);
