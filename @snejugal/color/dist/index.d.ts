export interface RgbColor {
    red: number;
    green: number;
    blue: number;
    alpha: number;
}
export interface PartialRgbColor {
    red: number;
    green: number;
    blue: number;
    alpha?: number;
}
export interface HslColor {
    hue: number;
    saturation: number;
    lightness: number;
    alpha: number;
}
export interface PartialHslColor {
    hue: number;
    saturation: number;
    lightness: number;
    alpha?: number;
}
export interface HsbColor {
    hue: number;
    saturation: number;
    brightness: number;
    alpha: number;
}
export interface PartialHsbColor {
    hue: number;
    saturation: number;
    brightness: number;
    alpha?: number;
}
export declare const createHex: ({ red, green, blue, alpha }: PartialRgbColor) => string;
export declare const createCssRgb: ({ red, green, blue, alpha, }: PartialRgbColor) => string;
export declare const brightness: ({ red, green, blue }: PartialRgbColor) => number;
export declare const overlay: (...colors: RgbColor[]) => RgbColor;
export declare const parseHex: (hex: string) => RgbColor | null;
export declare const rgbToHsl: {
    (color: RgbColor): HslColor;
    (color: PartialRgbColor): PartialHslColor;
};
export declare const hslToRgb: {
    (color: PartialHslColor): PartialRgbColor;
    (color: HslColor): RgbColor;
};
export declare const rgbToHsb: {
    (color: RgbColor): HsbColor;
    (color: PartialRgbColor): PartialHsbColor;
};
export declare const hsbToRgb: {
    (color: HsbColor): RgbColor;
    (color: PartialHsbColor): PartialRgbColor;
};
export declare const isLight: (color: PartialRgbColor) => boolean;
export declare const isDark: (color: PartialRgbColor) => boolean;
