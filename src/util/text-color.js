let re_hs = require("./rgb-hsl.js");
const  li_da=require("./light-darkdem")
const {getContrastRatio} = require("./contrast");
const {hslToRgb} = require("./rgb-hsl");

//根据背景颜色获取
function getTextColor(color1) {
    let arr = []
    let assert = false
    let textColor = [0, 0, 0]
    let rgbToHsl = re_hs.rgbToHsl(color1);
    let fc=li_da.light_dark(rgbToHsl[2])
    if (fc) {
        let flag = rgbToHsl[1]
        let colo1 = hslToRgb(rgbToHsl[0], rgbToHsl[1], rgbToHsl[2])
        while (--flag >= 0) {
            while (textColor[2] <= 100) {
                let colo2 = hslToRgb(textColor[0], flag, textColor[2])
                let cons = getContrastRatio(colo1, colo2)
                arr.push({flg: flag, text2: textColor[2], con: cons})
                //console.log(`flag :${flag} ,textColor :${textColor[2]},con: ${cons}`)
                textColor[2] += 3
                if (cons >= 4 && cons <= 7) {
                    textColor[1] = flag
                    assert = true
                    break
                }
            }

            if (assert)
                break;

            textColor[2] = 0 // 置 0

        }
    } else {
        //如果是亮色
        let flag = rgbToHsl[1]
        textColor[2] = 1 //自定义默认值
        let colo1 = hslToRgb(rgbToHsl[0], rgbToHsl[1], rgbToHsl[2])
        while (++flag <= 100) {
            while (textColor[2] <= 100) {
                let colo2 = hslToRgb(textColor[0], flag, textColor[2])
                let cons = getContrastRatio(colo1, colo2)
                arr.push({flg: flag, text2: textColor[2], con: cons})
                // console.log(`flag :${flag} ,textColor :${textColor[2]},con: ${cons}`)
                textColor[2] += 3
                if (cons >= 4 && cons <= 7) {
                    textColor[1] = flag
                    assert = true
                    break
                }
            }

            if (assert)
                break;

            textColor[2] = 0 // 置 0

        }
    }
    let newarr = arr.filter((v, i, _) => {
        if (v.con >= 4 && v.con <= 7) return v
    })

    if (newarr.length===0){
        return null
    }


    let t = newarr.sort((a, b) => {
        return b.con - a.con
    })[0];
    return  hslToRgb(0,t.flg,t.text2);

}
module.exports={getTextColor}
// let color1="#aa2211"
// console.log(getMax(color1))
