import Attheme from "../atthemejs";
import { ThemeType } from './types';
import atthemeVariables from '../variables/attheme';
import tgiosVariables from '../variables/tgios-theme';
import tgxVariables from '../variables/tgx-theme';
import { getColorName } from './colors';
//此文件使用了attheme 3.0.0
export const getThemeName = (background: string, primary: string): string =>
    `${getColorName(primary)} on ${getColorName(background)}`;

export const createTheme = ({
    username,
    image,
    name,
    colors,
    type,
}: {
    username: string;
    image: Buffer;
    name: string;
    colors: string[];
    type: ThemeType;
}): string => {
    switch (type) {
        case 'attheme': {
            const variables = atthemeVariables(colors);

            const theme = new Attheme(variables);

            theme.setWallpaper(image.toString('binary'));

            return theme.toString('int');
        }
        case 'attheme-tran':{

            const variables = atthemeVariables(colors);

            let theme = new Attheme(variables);

            theme.setWallpaper(image.toString('binary'));


            theme= setvalue(theme,'chat_inBubble',98)
            theme= setvalue(theme,'chat_messagePanelBackground',98)

            return theme.toString('int');
        }

        case 'tgios-theme': {
            return tgiosVariables(name, colors);
        }

        case 'tgx-theme': {
            return tgxVariables(name, colors, username);
        }

        default:
            throw new TypeError(`Unknown theme type: ${type}`);
    }
};
function  setvalue(theme:Attheme,str:string,alpha:number){
       let key=  theme.get(str)
       if(key!==null){
           key.alpha=alpha;
           theme.set(str,key);
       }
       return theme
}
