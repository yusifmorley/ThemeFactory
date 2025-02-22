function isAngleInRange(x, y, z) {
    let start = (x - y + 360) % 360;
    let end = (x + y) % 360;

    if (start < end) {
        return z >= start && z <= end;
    } else {
        return z >= start || z <= end;
    }
}

// 测试示例
console.log(isAngleInRange(357, 30, 21)); // true
console.log(isAngleInRange(90, 30, 50));  // false
console.log(isAngleInRange(350, 20, 10)); // true
