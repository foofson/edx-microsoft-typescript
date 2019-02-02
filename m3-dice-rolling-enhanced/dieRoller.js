"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var _ = require("lodash");
var DieValue;
(function (DieValue) {
    DieValue[DieValue["None"] = 0] = "None";
    DieValue[DieValue["One"] = 1] = "One";
    DieValue[DieValue["Two"] = 2] = "Two";
    DieValue[DieValue["Three"] = 3] = "Three";
    DieValue[DieValue["Four"] = 4] = "Four";
    DieValue[DieValue["Five"] = 5] = "Five";
    DieValue[DieValue["Six"] = 6] = "Six";
})(DieValue || (DieValue = {}));
var Die = /** @class */ (function () {
    function Die(div, width, height, border, // implicitly solid black
    color, value) {
        if (value === void 0) { value = DieValue.None; }
        var _this = this;
        this.div = div;
        this.width = width;
        this.height = height;
        this.border = border;
        this.color = color;
        this.value = value;
        this.append = function (target) {
            target.appendChild(_this.div);
            return true;
        };
        this.setValue = function (value) {
            _this.value = value;
            _this.div.innerText = DieValue[value];
            return true;
        };
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
        this.div.style.border = this.border + "px solid black";
        this.div.style.backgroundColor = color;
        this.div.style.display = "table-cell";
        this.div.style.textAlign = "center";
        this.div.style.verticalAlign = "middle";
        this.div.style.fontSize = "1.5em";
        this.div.style.fontWeight = "bold";
    }
    Die.DieValue = DieValue;
    return Die;
}());
var DieRoller = /** @class */ (function (_super) {
    __extends(DieRoller, _super);
    function DieRoller(div, length, width, border, color) {
        var _this = _super.call(this, div, length, width, border, color) || this;
        _this.roll = function () {
            _this.setValue(getRandomIntInclusive(1, 6));
            return true;
        };
        return _this;
    }
    return DieRoller;
}(Die));
var getRandomIntInclusive = function (min, max) {
    min = _.ceil(min);
    max = _.floor(max);
    return _.random(min, max);
};
exports["default"] = DieRoller;
