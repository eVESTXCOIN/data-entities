"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bignumber_1 = require("@evestx/bignumber");
var utils_1 = require("../utils");
var OrderPrice = /** @class */ (function () {
    // @todo refactor to accept Money instead of BigNumber
    function OrderPrice(coins, pair) {
        var divider = OrderPrice._getMatcherDivider(pair.precisionDifference);
        this.pair = pair;
        this._matcherCoins = coins;
        this._tokens = this._matcherCoins.div(divider);
    }
    OrderPrice.prototype.getMatcherCoins = function () {
        return this._matcherCoins.clone();
    };
    OrderPrice.prototype.getTokens = function () {
        return this._tokens.clone();
    };
    OrderPrice.prototype.toMatcherCoins = function () {
        return this._matcherCoins.toFixed(0);
    };
    OrderPrice.prototype.toTokens = function () {
        return this._tokens.toFixed(this.pair.priceAsset.precision);
    };
    OrderPrice.prototype.toFormat = function () {
        return this._tokens.toFormat(this.pair.priceAsset.precision);
    };
    OrderPrice.prototype.toJSON = function () {
        return {
            amountAssetId: this.pair.amountAsset.id,
            priceAssetId: this.pair.priceAsset.id,
            priceTokens: this.toTokens(),
        };
    };
    OrderPrice.prototype.toString = function () {
        return this.toTokens() + " " + this.pair.amountAsset.id + "/" + this.pair.priceAsset.id;
    };
    OrderPrice.fromMatcherCoins = function (coins, pair) {
        OrderPrice._checkAmount(coins);
        return new OrderPrice(utils_1.toBigNumber(coins), pair);
    };
    OrderPrice.fromTokens = function (tokens, pair) {
        OrderPrice._checkAmount(tokens);
        tokens = utils_1.toBigNumber(tokens).toFixed(pair.priceAsset.precision);
        var divider = OrderPrice._getMatcherDivider(pair.precisionDifference);
        var coins = new bignumber_1.BigNumber(tokens).mul(divider);
        return new OrderPrice(coins, pair);
    };
    OrderPrice._getMatcherDivider = function (precision) {
        return new bignumber_1.BigNumber(10)
            .pow(precision)
            .mul(OrderPrice._MATCHER_SCALE);
    };
    OrderPrice.isOrderPrice = function (object) {
        return object instanceof OrderPrice;
    };
    OrderPrice._checkAmount = function (amount) {
        if (!(['string', 'number'].includes(typeof amount) || amount instanceof bignumber_1.BigNumber)) {
            throw new Error('Please use strings to create instances of OrderPrice');
        }
    };
    OrderPrice._MATCHER_SCALE = new bignumber_1.BigNumber(10).pow(8);
    return OrderPrice;
}());
exports.OrderPrice = OrderPrice;
//# sourceMappingURL=OrderPrice.js.map