import fs from "fs";
import makeThemeDesktop from "./wrapper/desktop/make-desktop-theme-util";
const x = async () => {
    let buffer = fs.readFileSync("pic/img.png");
    const base64Encoded = buffer.toString('base64');
    let color:[string, string]=["#050505","#122563"]

    await makeThemeDesktop(color,buffer).then(e=>{
        console.log(e)
    })
    console.log("ok")

}
x()
