//安卓主题色彩算法研究
//安卓提供 三种颜色搭配   //随机颜色按钮
//三种 颜色只是参考

//主颜色 次颜色 字体颜色
/*
具体步骤
1.对比度 计算(主颜色对 字体的对比度)

 */
let color1="#aaaaaa"
let color2="#cbbbbb"

const contrast = require('./contrast');

console.log(contrast.getContrastRatio(color1,color2))
