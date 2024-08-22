import fs from "fs";


fs.readdir("public/tempelete/tohuemodle",{recursive:true},(e,files)=>{
    console.log(files)
});
