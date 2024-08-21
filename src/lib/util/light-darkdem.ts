//判断是否是亮色
function is_light(rgb:string){
    const hexColor = rgb.replace('#', '');
    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);
    let yiq = (r * 299 + g * 587 + b * 114) / 1000
    return yiq >= 128
}

export default is_light
