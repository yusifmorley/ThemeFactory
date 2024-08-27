
export namespace DesktopBlack{
    const prx:string="public/tempelete/tohuemodle/desktop/black"

    class Black0 {
        public static id:string="black1"
        public tP:string="yusif.tdesktop-theme"
        public pP:string="捕获.PNG"
        public mianColorSelect:string="dialogsTextFg"

    }
    class Black1 {
        public static id:string="black2"
        public tP:string="awesome.tdesktop-theme"
        public pP:string="捕获.PNG"
        public mianColorSelect:string="sideBarIconFg"

    }
    class Black3 {
        public static id:string="black3"
        public tP:string="awesome02.tdesktop-theme"
        public pP:string="捕获.PNG"
        public mianColorSelect:string="sideBarIconFg"
    }
    class Black4 {
        public static id:string="black4"
        public tP:string="awesome.tdesktop-theme"
        public pP:string="捕获.PNG"
        public mianColorSelect:string="sideBarIconFgActive"
    }
    export const desktopBalckMap=new Map<string,any>

    desktopBalckMap.set(Black0.id,new Black0())
    desktopBalckMap.set(Black1.id,new Black1())
    desktopBalckMap.set(Black3.id,new Black3())
    desktopBalckMap.set(Black4.id,new Black4())
}


