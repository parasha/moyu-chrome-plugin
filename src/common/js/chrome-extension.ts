import {isDev} from './constant';

export enum ExtensionType {
    Background = 'background',
    Popup = 'popup'
}

const extension = {
    [ExtensionType.Background]: {},
    [ExtensionType.Popup]: {}
}

const getBackgroundPage = () => {
    if (isDev) {
        return extension[ExtensionType.Background];
    } else {
        return chrome.extension.getBackgroundPage();
    }
}

const getPopup = () => {
    if (isDev) {
        return extension[ExtensionType.Popup];
    } else {
        const pops = chrome.extension.getViews({
            type: 'popup'
        }) || [];
        return pops[0];
    }
}

export const initExtension = (type: ExtensionType, obj: {[key: string]: any}) => {
    if (isDev) {
        extension[type] = {...obj};
    }

    return {
        getBackgroundPage,
        getPopup,
    }
}