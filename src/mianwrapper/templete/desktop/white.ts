export namespace DesktopWhite {
    const prx:string="public/tempelete/tohuemodle/desktop/white"

    class White0{
        public static id:string="white1"
        public tP:string="awesome.tdesktop-theme"
        public pP:string="捕获.PNG"
        public mianColorSelect:string="windowSubTextFg"
    }

    class White2{
        public static id:string="white2"
        public tP:string="awesome01.tdesktop-theme"
        public pP:string="捕获.PNG"
        public mianColorSelect:string="sideBarTextFgActive"
        public sT:number=80
    }
    class White3{
        public static id:string="white3"
        public tP:string="awesome.tdesktop-theme"
        public pP:string="捕获.PNG"
        public mianColorSelect:string="sideBarTextFgActive"
    }

    export const desktopWhiteMap=new Map<string,any>
    desktopWhiteMap.set(White0.id,new White0())
    desktopWhiteMap.set(White2.id,new White2())
    desktopWhiteMap.set(White3.id,new White3())
}
