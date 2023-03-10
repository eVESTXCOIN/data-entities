import { BigNumber } from '@evestx/bignumber';
export interface ICandleInfo {
    readonly time: Date;
    readonly open: BigNumber | string | number;
    readonly close: BigNumber | string | number;
    readonly high: BigNumber | string | number;
    readonly low: BigNumber | string | number;
    readonly volume: BigNumber | string | number;
    readonly quoteVolume: BigNumber | string | number;
    readonly weightedAveragePrice: BigNumber | string | number;
    readonly maxHeight: number;
    readonly txsCount: number;
}
export interface ICandleJSON extends ICandleInfo {
    readonly open: BigNumber;
    readonly close: BigNumber;
    readonly high: BigNumber;
    readonly low: BigNumber;
    readonly volume: BigNumber;
    readonly quoteVolume: BigNumber;
    readonly weightedAveragePrice: BigNumber;
}
export declare class Candle {
    readonly time: Date;
    readonly open: BigNumber;
    readonly close: BigNumber;
    readonly high: BigNumber;
    readonly low: BigNumber;
    readonly volume: BigNumber;
    readonly quoteVolume: BigNumber;
    readonly weightedAveragePrice: BigNumber;
    readonly maxHeight: number;
    readonly txsCount: number;
    constructor(candleObject: ICandleInfo);
    toJSON(): ICandleJSON;
    toString(): string;
    static isCandle(object: object): object is Candle;
}
