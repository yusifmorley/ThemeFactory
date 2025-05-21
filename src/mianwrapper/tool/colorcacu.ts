function isAngleInRange(x, y, z) {
    let start = (x - y + 360) % 360;
    let end = (x + y) % 360;

    if (start < end) {
        return z >= start && z <= end;
    } else {
        return z >= start || z <= end;
    }
}
function adjustHue(h, delta) {
    let result = (h + delta) % 360;
    if (result < 0) result += 360; // 确保是正值
    return result;
}

export {isAngleInRange,adjustHue};
