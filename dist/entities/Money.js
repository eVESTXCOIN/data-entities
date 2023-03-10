"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bignumber_1 = require("@evestx/bignumber");
var utils_1 = require("../utils");
var Money = /** @class */ (function () {
    // @todo refactor to accept full 'tokens' instead of 'coins'
    // to hide precision arithmetic implementation
    function Money(coins, asset) {
        var divider = Money._getDivider(asset.precision);
        this.asset = asset;
        this._coins = utils_1.toBigNumber(coins).roundTo(0, 3 /* ROUND_FLOOR */);
        this._tokens = this._coins.div(divider);
    }
    Money.prototype.getCoins = function () {
        return this._coins.add(0);
    };
    Money.prototype.getTokens = function () {
        return this._tokens.add(0);
    };
    Money.prototype.toCoins = function () {
        return this._coins.toFixed(0);
    };
    Money.prototype.toTokens = function () {
        return this._tokens.toFixed(this.asset.precision);
    };
    Money.prototype.toFormat = function (precision) {
        return this._tokens.toFormat(precision);
    };
    Money.prototype.add = function (money) {
        this._matchAssets(money);
        var inputCoins = money.getCoins();
        var result = this._coins.add(inputCoins);
        return new Money(result, this.asset);
    };
    Money.prototype.plus = function (money) {
        return this.add(money);
    };
    Money.prototype.sub = function (money) {
        this._matchAssets(money);
        var inputCoins = money.getCoins();
        var result = this._coins.sub(inputCoins);
        return new Money(result, this.asset);
    };
    Money.prototype.minus = function (money) {
        return this.sub(money);
    };
    Money.prototype.times = function (money) {
        this._matchAssets(money);
        return new Money(this.getCoins().mul(money.getCoins()), this.asset);
    };
    Money.prototype.div = function (money) {
        this._matchAssets(money);
        return new Money(this.getCoins().div(money.getCoins()), this.asset);
    };
    Money.prototype.eq = function (money) {
        this._matchAssets(money);
        return this._coins.eq(money.getCoins());
    };
    Money.prototype.lt = function (money) {
        this._matchAssets(money);
        return this._coins.lt(money.getCoins());
    };
    Money.prototype.lte = function (money) {
        this._matchAssets(money);
        return this._coins.lte(money.getCoins());
    };
    Money.prototype.gt = function (money) {
        this._matchAssets(money);
        return this._coins.gt(money.getCoins());
    };
    Money.prototype.gte = function (money) {
        this._matchAssets(money);
        return this._coins.gte(money.getCoins());
    };
    Money.prototype.safeSub = function (money) {
        if (this.asset.id === money.asset.id) {
            return this.sub(money);
        }
        return this;
    };
    Money.prototype.toNonNegative = function () {
        if (this.getTokens().lt(0)) {
            return this.cloneWithTokens(0);
        }
        return this;
    };
    // @todo coins refactor
    Money.prototype.cloneWithCoins = function (coins) {
        return new Money(new bignumber_1.BigNumber(coins), this.asset);
    };
    Money.prototype.cloneWithTokens = function (tokens) {
        var coins = Money._tokensToCoins(tokens, this.asset.precision);
        return new Money(coins, this.asset);
    };
    Money.prototype.convertTo = function (asset, exchangeRate) {
        return Money.convert(this, asset, utils_1.toBigNumber(exchangeRate));
    };
    Money.prototype.toJSON = function () {
        return {
            assetId: this.asset.id,
            tokens: this.toTokens(),
        };
    };
    Money.prototype.toString = function () {
        return this.toTokens() + " " + this.asset.id;
    };
    Money.prototype._matchAssets = function (money) {
        if (this.asset.id !== money.asset.id) {
            throw new Error('You cannot apply arithmetic operations to Money created with different assets');
        }
    };
    Money.max = function () {
        var moneyList = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            moneyList[_i] = arguments[_i];
        }
        return moneyList.reduce(function (max, money) { return max.gte(money) ? max : money; });
    };
    Money.min = function () {
        var moneyList = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            moneyList[_i] = arguments[_i];
        }
        return moneyList.reduce(function (min, money) { return min.lte(money) ? min : money; });
    };
    Money.isMoney = function (object) {
        return object instanceof Money;
    };
    Money.convert = function (money, asset, exchangeRate) {
        if (money.asset === asset) {
            return money;
        }
        else {
            var difference = money.asset.precision - asset.precision;
            var divider = new bignumber_1.BigNumber(10).pow(difference);
            var coins = money.getCoins();
            var result = coins
                .mul(exchangeRate)
                .div(divider)
                .roundTo(0, 1 /* ROUND_DOWN */)
                .toFixed();
            return new Money(new bignumber_1.BigNumber(result), asset);
        }
    };
    Money.fromTokens = function (count, asset) {
        var tokens = utils_1.toBigNumber(count);
        return new Money(tokens.mul(new bignumber_1.BigNumber(10).pow(asset.precision)), asset);
    };
    Money.fromCoins = function (count, asset) {
        return new Money(count, asset);
    };
    Money._tokensToCoins = function (tokens, precision) {
        var divider = Money._getDivider(precision);
        tokens = new bignumber_1.BigNumber(tokens).toFixed(precision);
        return new bignumber_1.BigNumber(tokens).mul(divider);
    };
    Money._getDivider = function (precision) {
        return new bignumber_1.BigNumber(10).pow(precision);
    };
    return Money;
}());
exports.Money = Money;
//# sourceMappingURL=Money.js.map