import { BigNumber } from '@evestx/bignumber';
import { AssetPair } from './AssetPair';
export interface IOrderPriceJSON {
    amountAssetId: string;
    priceAssetId: string;
    priceTokens: string;
}
export declare class OrderPrice {
    readonly pair: AssetPair;
    private _matcherCoins;
    private _tokens;
    private static _MATCHER_SCALE;
    constructor(coins: BigNumber, pair: AssetPair);
    getMatcherCoins(): BigNumber;
    getTokens(): BigNumber;
    toMatcherCoins(): string;
    toTokens(): string;
    toFormat(): string;
    toJSON(): IOrderPriceJSON;
    toString(): string;
    static fromMatcherCoins(coins: string | number | BigNumber, pair: AssetPair): OrderPrice;
    static fromTokens(tokens: string | number | BigNumber, pair: AssetPair): OrderPrice;
    private static _getMatcherDivider;
    static isOrderPrice(object: object): object is OrderPrice;
    private static _checkAmount;
}
