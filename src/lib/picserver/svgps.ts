import fs from 'fs';
import jsdom from 'jsdom';
//封装 有色图片生成
const { JSDOM } = jsdom;
function parseHex(hex: string) {
    return parseInt(hex, 16);
}

function parseColor(color: string) {
    if (color.length !== 6) {
        return null;
    }

    const red = parseHex(color.slice(0, 2));
    const green = parseHex(color.slice(2, 4));
    const blue = parseHex(color.slice(4, 6));


    return [red, green, blue];
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function isLight([r, g, b]) {
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128;
}


export default function setColor(clolors: string[]):string |null {
    if (clolors===undefined){
        return null
    }
    if (clolors.length!==5) {
        return null;
    }
    const svgData = fs.readFileSync('public/assets/colors.svg', 'utf8');
    // Parse the SVG string
    const {document}= new JSDOM(svgData,{contentType: 'image/svg+xml'}).window;


    const colorElements = document.querySelectorAll('.bg');
    const texts = document.querySelectorAll('.text');

    //设置bg
    //设置text
    for (let i = 0; i < 5; i++) {
        colorElements.item(i).setAttribute('fill',clolors[i]);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        let colorcur=clolors[i].replace('#','');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const text_color = isLight(parseColor(colorcur)) ? '#000000' : '#FFFFFF';

        texts.item(i).setAttribute('fill',text_color);

    }
    //设置 aoto
    const gBgAutoElement = document.querySelector('.g-bg-auto');
    const pathElements = gBgAutoElement?.getElementsByTagName('path');

    pathElements?.item(0)?.setAttribute('fill',clolors[1]);
    pathElements?.item(1)?.setAttribute('fill',clolors[2]);
    pathElements?.item(2)?.setAttribute('fill',clolors[0]);

    //设置text


    return document.documentElement.outerHTML;
}



// const svgDoc = jsdom1.parseFromString(svgData, 'image/svg+xml');
// Access and manipulate elements
// const circle = document.querySelector('circle');

// console.log(circle);
//circle?.setAttribute('fill', 'green');
