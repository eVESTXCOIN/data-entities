"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetPair = void 0;
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
        return "".concat(this.amountAsset, "/").concat(this.priceAsset);
    };
    AssetPair.isAssetPair = function (object) {
        return object instanceof AssetPair;
    };
    return AssetPair;
}());
exports.AssetPair = AssetPair;
//# sourceMappingURL=AssetPair.js.map