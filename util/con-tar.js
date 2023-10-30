function findIntermediateColor(color1, color2, targetContrast) {
    const getRGBArray = color => {
        const hexColor = color.replace('#', '');
        const r = parseInt(hexColor.substring(0, 2), 16);
        const g = parseInt(hexColor.substring(2, 4), 16);
        const b = parseInt(hexColor.substring(4, 6), 16);
        return [r, g, b];
    }

    const rgb1 = getRGBArray(color1);
    const rgb2 = getRGBArray(color2);

    // 计算目标相对亮度
    const getTargetLuminance = (luminance1, luminance2, targetContrast) => {
        if (luminance1 > luminance2) {
            return ((luminance1 / targetContrast) + luminance2) / (1 + (1 / targetContrast));
        } else {
            return (luminance1 + (luminance2 * targetContrast)) / (1 + targetContrast);
        }
    }

    const luminance1 = 0.2126 * (rgb1[0] / 255) + 0.7152 * (rgb1[1] / 255) + 0.0722 * (rgb1[2] / 255);
    const luminance2 = 0.2126 * (rgb2[0] / 255) + 0.7152 * (rgb2[1] / 255) + 0.0722 * (rgb2[2] / 255);

    const targetLuminance = getTargetLuminance(luminance1, luminance2, targetContrast);

    // 根据目标相对亮度找到中间颜色
    const r = Math.round((targetLuminance / 0.2126) * 255);
    const g = Math.round((targetLuminance / 0.7152) * 255);
    const b = Math.round((targetLuminance / 0.0722) * 255);

    const intermediateColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    return intermediateColor;
}

// 示例使用：
const color1 = "#000000"; // 红色
const color2 = "#ffffff"; // 绿色
const targetContrast = 7;

const intermediateColor = findIntermediateColor(color1, color2, targetContrast);
console.log(`中间颜色：${intermediateColor}`);
