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
//# sourceMappingURL=Asset.js.map