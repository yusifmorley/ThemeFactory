import url from 'url';
import * as http from 'http';
import fs from 'fs';


import {basePicCreateColorPic} from "./wrapper/theme-colors-and-pic";
import {basePicCreateTheme} from './wrapper/theme-colors-and-pic';

import {createPreview} from './wrapper/theme-preview';
const port=3000;
const server = http.createServer(async (req, res) => {
    await createPreview(req,res);

    await basePicCreateTheme(req,res);
    await basePicCreateColorPic(req,res);

});

server.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}/`);
});
