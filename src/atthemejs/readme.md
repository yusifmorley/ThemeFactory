# `attheme-js`

A package for working with .attheme files in JavaScript. It fully supports the
.attheme format.

## Installing

```bash
npm i attheme-js
```

## Usage

```ts
import Attheme from "attheme-js";

const theme = new Attheme(`
divider=#000000
checkbox=-1

WPS
Pretend there is a cats wallpaper here
WPE
`);

console.log(theme.get(`divider`)); // { red: 0, green: 0, blue: 0, alpha: 255 }
theme.set(`checkbox`, {
  red: 255,
  green: 146,
  blue: 13,
  alpha: 7,
});
console.log(theme.get(`checkbox`)); // { red: 255, green: 146, blue: 13, alpha: 7 }

console.log(theme.getWallpaper()); // Pretend there is a cats wallpaper here

console.log(theme.toString(`hex`)); /*
divider=#ff000000
checkbox=#ffffffff

WPS
Pretend there is a cats wallpaper here
WPE

*/
```

For the API documentation and tools `attheme-js` provides out of the box, please see [the documentation section on our Wiki][documentation].

[documentation]: https://github.com/SnejUgal/attheme-js/wiki/Documentation
