'use strict';

import * as _ from 'lodash';
import * as Chance from 'chance';

var chance = new Chance();

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

class Roller {
  roll (callback?: (value: number) => boolean): void | number {
  const rolled = this.getRandomValue();
    if (callback) {
      callback(rolled);
    } else {
      return rolled;
    }
  } 

  @anuApi()
  getRandomValue() {
    return chance.d6();
  }
}

function anuApi() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.value = async function () {
      return callAnuApiAsync();
    }
  };
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

  append = (target: Element): boolean => {
    (target as HTMLElement).appendChild(this.div);
    return true;
  };

  setValue = (value: number): boolean => {
    this.value = (value as DieValue);
    (this.div as HTMLElement).innerText = DieValue[value];
    return true;
  };
}

class DieRoller extends Die implements Roller {
  constructor(div: Element, length: number, width: number, border: number, color: string) {
    super(div, length, width, border, color);
  }
  roll: (callback?: (value: number) => boolean) => void | number;
  getRandomValue: () => number;
}

function applyMixins(derivedClass: any, baseClasses: any[]) {
  baseClasses.forEach((baseClass) => {
    Object.getOwnPropertyNames(baseClass.prototype).forEach((name) => {
      derivedClass.prototype[name] = baseClass.prototype[name];
    });
  });
}

async function callAnuApiAsync() {
  const apiReturn = await fetch('https://qrng.anu.edu.au/API/jsonI.php?length=1&type=uint8');
  const apiJson = await apiReturn.json();
  const result = apiJson.data[0] % 6 + 1;
  return result;
}

applyMixins(DieRoller, [Roller]);

export default DieRoller;
