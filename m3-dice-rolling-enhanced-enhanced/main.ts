import DieRoller from './dieRoller.js';
import * as _ from 'lodash';

function createDice(size: number, border: number, color: string, target: Element): Array<DieRoller> {
  let dice: Array<DieRoller> = [];
  _.forEach(_.range(0, 4), () => {
    let div: Element = document.createElement('div');
    let die: DieRoller = new DieRoller(div, size, size, border, color);
    die.append(target);
    dice.push(die);
  });
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

let dice: Array<DieRoller> = createDice(DieStyling.size, DieStyling.border, DieStyling.color, diceTable);

let buttonCell: Element = document.createElement('div');
(buttonCell as HTMLElement).style.display = 'table-cell';
(buttonCell as HTMLElement).style.verticalAlign = 'middle';
diceTable.appendChild(buttonCell);

let rollButton: Element = document.createElement('button');
rollButton.textContent = 'Roll the dice';
(rollButton as HTMLElement).onclick = () => {
  _.forEach(dice, (die) => {
    const rolled = die.roll();
    if (typeof rolled === 'number') {
      die.setValue(rolled);
    }
  });
};
(rollButton as HTMLElement).style.fontSize = '1.25em';
buttonCell.appendChild(rollButton);
