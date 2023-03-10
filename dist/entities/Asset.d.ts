import { BigNumber } from '@evestx/bignumber';
export interface IAssetInfo {
    readonly ticker?: string;
    readonly id: string;
    readonly name: string;
    readonly precision: number;
    readonly description: string;
    readonly image: string;
    readonly height: number;
    readonly timestamp: Date;
    readonly sender: string;
    readonly quantity: BigNumber | string | number;
    readonly reissuable: boolean;
    readonly hasScript?: boolean;
    readonly minSponsoredFee?: BigNumber | string | number;
}
export interface IAssetJSON extends IAssetInfo {
    readonly quantity: BigNumber;
    readonly minSponsoredFee?: BigNumber;
}
export declare class Asset {
    readonly ticker: string | null;
    readonly id: string;
    readonly name: string;
    readonly precision: number;
    readonly description: string;
    readonly image: string;
    readonly height: number;
    readonly timestamp: Date;
    readonly sender: string;
    readonly quantity: BigNumber;
    readonly reissuable: boolean;
    readonly hasScript: boolean;
    readonly minSponsoredFee: BigNumber | null;
    readonly displayName: string;
    constructor(assetObject: IAssetInfo);
    toJSON(): IAssetJSON;
    toString(): string;
    static isAsset(object: object): object is Asset;
}
