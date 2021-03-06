"use strict";
exports.__esModule = true;
var dieRoller_js_1 = require("./dieRoller.js");
var _ = require("lodash");
function createDice(size, border, color) {
    var dice = [];
    _.forEach(_.range(0, 4), function () {
        var div = document.createElement('div');
        var die = new dieRoller_js_1["default"](div, size, size, border, color);
        die.append(diceTable);
        dice.push(die);
    });
    return dice;
}
var DieStyling;
(function (DieStyling) {
    DieStyling.size = 100;
    DieStyling.border = 5;
    DieStyling.color = 'orange';
})(DieStyling || (DieStyling = {}));
var diceTable = document.createElement('div');
diceTable.style.display = 'table';
diceTable.style.borderSpacing = '15px';
document.body.appendChild(diceTable);
var dice = createDice(DieStyling.size, DieStyling.border, DieStyling.color);
var buttonCell = document.createElement('div');
buttonCell.style.display = 'table-cell';
buttonCell.style.verticalAlign = 'middle';
diceTable.appendChild(buttonCell);
var rollButton = document.createElement('button');
rollButton.textContent = 'Roll the dice';
rollButton.onclick = function () {
    _.forEach(dice, function (die) {
        die.roll();
    });
};
rollButton.style.fontSize = '1.25em';
buttonCell.appendChild(rollButton);
