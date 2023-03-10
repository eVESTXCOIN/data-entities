"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bignumber_1 = require("@evestx/bignumber");
function toBigNumber(some) {
    return some instanceof bignumber_1.BigNumber ? some : new bignumber_1.BigNumber(some);
}
exports.toBigNumber = toBigNumber;
//# sourceMappingURL=utils.js.map