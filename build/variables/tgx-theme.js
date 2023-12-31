"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
const tgxVariables = (name, colors, author) => {
    const { background, filling, themeIsLight, primary, secondaryText, text, textOnPrimary, backgroundText, bubbleOutColor, } = helpers_1.themeData(colors);
    const headerBackground = themeIsLight
        ? primary
        : helpers_1.adjustBrightness(filling, -2);
    const headerText = themeIsLight ? textOnPrimary : primary;
    const headerTabColor = themeIsLight ? textOnPrimary : primary;
    const buttonIconColor = themeIsLight ? secondaryText : textOnPrimary;
    return `
!
name: "${name}"
author: "${author}"
@
shadowDepth: ${themeIsLight ? 0.65 : 1}
wallpaperId: 0
lightStatusBar: ${helpers_1.isLight(headerBackground) ? 1 : 0}
dark: ${themeIsLight ? 0 : 1}
parentTheme: ${themeIsLight ? 11 : 10}
wallpaperUsageId: 2
#
background: ${background}
chatBackground: ${themeIsLight ? filling : background}
background_text, background_textLight, background_icon: ${backgroundText}
headerBackground: ${headerBackground}
headerLightBackground: ${themeIsLight ? filling : headerBackground}
headerText, headerIcon, chatListAction: ${headerText}
headerLightIcon, headerLightText: ${themeIsLight ? text : headerText}
headerTabActiveText, headerTabActive: ${headerTabColor}
headerButton: ${themeIsLight ? filling : primary}
headerButtonIcon, circleButtonRegularIcon, circleButtonThemeIcon: ${buttonIconColor}
iconActive, progress, controlActive, checkActive, sliderActive, togglerActive, inputActive, inlineIcon, inlineOutline, bubbleOut_inlineOutline, inlineText, bubbleOut_inlineText, bubbleOut_inlineIcon, ticks, ticksRead, bubbleOut_ticks, bubbleOut_ticksRead, bubbleOut_file, file, bubbleOut_waveformActive, waveformActive, bubbleIn_textLink, bubbleOut_textLink, textLink, chatSendButton, textSearchQueryHighlight, profileSectionActive, profileSectionActiveContent, badge, bubbleOut_chatVerticalLine, messageVerticalLine, bubbleOut_messageAuthor, messageAuthor, messageSwipeBackground, unreadText, bubble_unreadText, bubble_unreadText_noWallpaper, textNeutral, seekDone, promo, online, playerButtonActive, chatListVerify, fillingPositive, notification, notificationSecure, notificationPlayer, headerBarCallActive, fileAttach: ${primary}
messageSwipeContent, fillingPositiveContent: ${textOnPrimary}

passcode: ${headerBackground}
passcodeIcon, passcodeText: ${headerText}
circleButtonRegular, circleButtonTheme, circleButtonNewGroup, circleButtonNewSecret,  circleButtonNewChannel, circleButtonNewChat: ${primary}
circleButtonNewGroupIcon, circleButtonNewSecretIcon,  circleButtonNewChannelIcon, circleButtonNewChatIcon: ${textOnPrimary}
fileGreen: ${helpers_1.adjustBrightness(primary, 3)}
fileYellow: ${helpers_1.adjustBrightness(primary, 5.5)}
fileRed: ${helpers_1.adjustBrightness(primary, 6.3)}
circleButtonChat, circleButtonOverlay: ${filling}
circleButtonChatIcon, circleButtonOverlayIcon, bubbleIn_time, bubbleOut_time, bubbleOut_progress, textPlaceholder, controlInactive: ${secondaryText}
headerRemoveBackgroundHighlight, introSectionActive, playerButton, text: ${text}
attachContact, attachFile, attachPhoto, attachLocation, attachInlineBot: ${headerBackground}
attachText: ${headerText}
avatarCyan, nameCyan: ${helpers_1.adjustBrightness(primary, 8, themeIsLight)}
avatarBlue, nameBlue: ${helpers_1.adjustBrightness(primary, 15, themeIsLight)}
avatarGreen, nameGreen: ${helpers_1.adjustBrightness(primary, 4, themeIsLight)}
avatarViolet, nameViolet: ${helpers_1.adjustBrightness(primary, 5, themeIsLight)}
avatarRed, nameRed: ${helpers_1.adjustBrightness(primary, -2, themeIsLight)}
avatarPink, namePink: ${helpers_1.adjustBrightness(primary, -5, themeIsLight)}
avatarYellow, nameYellow: ${helpers_1.adjustBrightness(primary, -9, themeIsLight)}
avatarOrange, nameOrange: ${helpers_1.adjustBrightness(primary, -12, themeIsLight)}
avatarSavedMessages: ${primary}
bubbleIn_background, chatKeyboard, checkContent, controlContent, filling, inlineContentActive, overlayFilling, placeholder, promoContent: ${filling}
chatKeyboardButton, inputInactive, introSection, sliderInactive, textLight, chatListMute, icon, iconLight, playerCoverIcon: ${secondaryText}
bubbleIn_textLinkPressHighlight, textSelectionHighlight, bubbleOut_textLinkPressHighlight, textLinkPressHighlight: ${primary}31
bubbleOut_background: ${bubbleOutColor}
fillingPressed: ${secondaryText}31
messageSelection, bubble_messageSelectionNoWallpaper: ${primary}24
bubble_messageSelection: ${primary}48
headerRemoveBackground: ${text}96
bubble_messageCheckOutline, bubble_messageCheckOutlineNoWallpaper: ${text}42
bubbleOut_waveformInactive, waveformInactive: ${secondaryText}74
bubbleOut_text, bubbleIn_text: ${text}
seekEmpty, seekReady, playerCoverPlaceholder: ${text}19
headerTabInactiveText: ${headerText}97
togglerActiveBackground: ${primary}97
unread, bubble_unread, bubble_unread_noWallpaper: ${primary}18
previewBackground: ${filling}C0
togglerInactive: ${helpers_1.adjustBrightness(secondaryText, 10, themeIsLight)}
togglerInactiveBackground: ${helpers_1.adjustBrightness(secondaryText, 10, themeIsLight)}64
badgeText: ${textOnPrimary}
badgeMuted: ${text}65
badgeMutedText: ${filling}
separator: #00000023`;
};
exports.default = tgxVariables;
