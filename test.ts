import Attheme from "./lib/atthemejs";
import * as  fs from "node:fs";

let j=new Attheme(fs.readFileSync("AloneSnowflake.attheme").toString())
// @ts-ignore
fs.writeFileSync("AloneSnowflake.jpg", j.getWallpaper());
