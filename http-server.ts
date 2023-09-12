import url from 'url';
import * as http from 'http';
import fs from 'fs';

/*
ctrl + z
bg
disown -a
 */

import {basePicCreateColorPic} from "./wrapper/theme-colors-and-pic";
import {basePicCreateTheme} from './wrapper/theme-colors-and-pic';

import {createPreview} from './wrapper/theme-preview';
const port=3000;
const server = http.createServer(async (req, res) => {
    try {
        await createPreview(req,res);
        await basePicCreateTheme(req,res);
        await basePicCreateColorPic(req,res);
    }catch (e){
        console.log(e)
    }


});

server.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}/`);
});
