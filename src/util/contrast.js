function getContrastRatio(color1, color2) {
    // 获取两种颜色的RGB值
    const getColorRGB = color => {
        const hexColor = color.replace('#', '');
        const r = parseInt(hexColor.substring(0, 2), 16);
        const g = parseInt(hexColor.substring(2, 4), 16);
        const b = parseInt(hexColor.substring(4, 6), 16);
        return [r / 255, g / 255, b / 255];
    }

    const rgb1 = getColorRGB(color1);
    const rgb2 = getColorRGB(color2);

    // 计算相对亮度
    const getRelativeLuminance = rgb => {
        const [r, g, b] = rgb.map(value => {
            if (value <= 0.03928) {
                return value / 12.92;
            } else {
                return Math.pow((value + 0.055) / 1.055, 2.4);
            }
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }

    const luminance1 = getRelativeLuminance(rgb1);

    const luminance2 = getRelativeLuminance(rgb2);

    // 计算对比度
    return luminance1 > luminance2 ? (luminance1 + 0.05) / (luminance2 + 0.05) : (luminance2 + 0.05) / (luminance1 + 0.05);

     // 返回对比度并保留两位小数
}

module.exports={ getContrastRatio }

// 示例使用：
// const color1 = "#000000"; // 红色
// const color2 = "#ffffff"; // 绿色
//
// const contrastRatio = getContrastRatio(color1, color2);
// console.log(`颜色1和颜色2的对比度为：${contrastRatio}`);
