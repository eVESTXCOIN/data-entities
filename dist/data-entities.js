(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.dataEntities = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var storage = {
    remapAsset: function (data) { return data; },
    remapCandle: function (data) { return data; }
};
var config;
(function (config) {
    function get(key) {
        return storage[key];
    }
    config.get = get;
    function set(key, value) {
        if (typeof key === 'string') {
            storage[key] = value;
        }
        else {
            Object.keys(key).forEach(function (configKey) { return set(configKey, key[configKey]); });
        }
    }
    config.set = set;
})(config = exports.config || (exports.config = {}));

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
var utils_1 = require("../utils");
var Asset = /** @class */ (function () {
    function Asset(assetObject) {
        assetObject = config_1.config.get('remapAsset')(assetObject);
        this.quantity = utils_1.toBigNumber(assetObject.quantity);
        this.minSponsoredFee = utils_1.toBigNumber(assetObject.minSponsoredFee);
        this.ticker = assetObject.ticker || null;
        this.id = assetObject.id;
        this.name = assetObject.name;
        this.precision = assetObject.precision;
        this.description = assetObject.description;
        this.image = assetObject.image;
        this.height = assetObject.height;
        this.timestamp = assetObject.timestamp;
        this.sender = assetObject.sender;
        this.reissuable = assetObject.reissuable;
        this.hasScript = assetObject.hasScript || false;
        this.displayName = assetObject.ticker || assetObject.name;
    }
    Asset.prototype.toJSON = function () {
        return {
            ticker: this.ticker,
            id: this.id,
            name: this.name,
            precision: this.precision,
            description: this.description,
            image: this.image,
            height: this.height,
            timestamp: this.timestamp,
            sender: this.sender,
            quantity: this.quantity,
            reissuable: this.reissuable,
            hasScript: this.hasScript,
            minSponsoredFee: this.minSponsoredFee
        };
    };
    Asset.prototype.toString = function () {
        return this.id;
    };
    Asset.isAsset = function (object) {
        return object instanceof Asset;
    };
    return Asset;
}());
exports.Asset = Asset;

},{"../config":1,"../utils":8}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AssetPair = /** @class */ (function () {
    function AssetPair(amountAsset, priceAsset) {
        this.amountAsset = amountAsset;
        this.priceAsset = priceAsset;
        this.precisionDifference =
            this.priceAsset.precision - this.amountAsset.precision;
    }
    AssetPair.prototype.toJSON = function () {
        return {
            amountAsset: this.amountAsset.id,
            priceAsset: this.priceAsset.id,
        };
    };
    AssetPair.prototype.toString = function () {
        return this.amountAsset + "/" + this.priceAsset;
    };
    AssetPair.isAssetPair = function (object) {
        return object instanceof AssetPair;
    };
    return AssetPair;
}());
exports.AssetPair = AssetPair;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
var utils_1 = require("../utils");
var Candle = /** @class */ (function () {
    function Candle(candleObject) {
        var _this = this;
        candleObject = config_1.config.get('remapCandle')(candleObject);
        var bigNumbers = [
            'open',
            'close',
            'high',
            'low',
            'volume',
            'quoteVolume',
            'weightedAveragePrice',
        ];
        bigNumbers.forEach(function (key) { return (_this[key] = utils_1.toBigNumber(candleObject[key])); });
        this.time = candleObject.time;
        this.maxHeight = candleObject.maxHeight;
        this.txsCount = candleObject.txsCount;
    }
    Candle.prototype.toJSON = function () {
        return {
            time: this.time,
            open: this.open,
            close: this.close,
            high: this.high,
            low: this.low,
            volume: this.volume,
            quoteVolume: this.quoteVolume,
            weightedAveragePrice: this.weightedAveragePrice,
            maxHeight: this.maxHeight,
            txsCount: this.txsCount,
        };
    };
    Candle.prototype.toString = function () {
        return '[object Candle]';
    };
    Candle.isCandle = function (object) {
        return object instanceof Candle;
    };
    return Candle;
}());
exports.Candle = Candle;

},{"../config":1,"../utils":8}],5:[function(require,module,exports){
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

},{"../utils":8,"@evestx/bignumber":undefined}],6:[function(require,module,exports){
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

},{"../utils":8,"@evestx/bignumber":undefined}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Asset_1 = require("./entities/Asset");
exports.Asset = Asset_1.Asset;
var Candle_1 = require("./entities/Candle");
exports.Candle = Candle_1.Candle;
var Money_1 = require("./entities/Money");
exports.Money = Money_1.Money;
var OrderPrice_1 = require("./entities/OrderPrice");
exports.OrderPrice = OrderPrice_1.OrderPrice;
var AssetPair_1 = require("./entities/AssetPair");
exports.AssetPair = AssetPair_1.AssetPair;
var config_1 = require("./config");
exports.config = config_1.config;

},{"./config":1,"./entities/Asset":2,"./entities/AssetPair":3,"./entities/Candle":4,"./entities/Money":5,"./entities/OrderPrice":6}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bignumber_1 = require("@evestx/bignumber");
function toBigNumber(some) {
    return some instanceof bignumber_1.BigNumber ? some : new bignumber_1.BigNumber(some);
}
exports.toBigNumber = toBigNumber;

},{"@evestx/bignumber":undefined}]},{},[7])(7)
});
