export class Base {

    _templetePath:string
    _picPath:string

    constructor(templetePath: string,picPath:string) {
    }


    get templetePath(): string {
        return this._templetePath;
    }

    get picPath(): string {
        return this._picPath;
    }
}
