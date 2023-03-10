import { Asset } from './Asset';
import { BigNumber } from '@evestx/bignumber';
export interface IMoneyJSON {
    assetId: string;
    tokens: string;
}
export declare type TMoneyInput = string | number | BigNumber;
export declare class Money {
    readonly asset: Asset;
    private _coins;
    private _tokens;
    constructor(coins: TMoneyInput, asset: Asset);
    getCoins(): BigNumber;
    getTokens(): BigNumber;
    toCoins(): string;
    toTokens(): string;
    toFormat(precision?: number): string;
    add(money: Money): Money;
    plus(money: Money): Money;
    sub(money: Money): Money;
    minus(money: Money): Money;
    times(money: Money): Money;
    div(money: Money): Money;
    eq(money: Money): boolean;
    lt(money: Money): boolean;
    lte(money: Money): boolean;
    gt(money: Money): boolean;
    gte(money: Money): boolean;
    safeSub(money: Money): Money;
    toNonNegative(): Money;
    cloneWithCoins(coins: TMoneyInput): Money;
    cloneWithTokens(tokens: TMoneyInput): Money;
    convertTo(asset: Asset, exchangeRate: TMoneyInput): Money;
    toJSON(): IMoneyJSON;
    toString(): string;
    private _matchAssets;
    static max(...moneyList: Array<Money>): Money;
    static min(...moneyList: Array<Money>): Money;
    static isMoney(object: object): object is Money;
    static convert(money: Money, asset: Asset, exchangeRate: BigNumber | string): Money;
    static fromTokens(count: TMoneyInput, asset: Asset): Money;
    static fromCoins(count: TMoneyInput, asset: Asset): Money;
    private static _tokensToCoins;
    private static _getDivider;
}
