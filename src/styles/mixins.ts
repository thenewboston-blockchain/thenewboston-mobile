import { Dimensions, PixelRatio } from 'react-native';
const WINDOW_WIDTH = Dimensions.get('window').width;
const guidelineBaseWidth = 375;

export const scaleSize = (size:any) => (WINDOW_WIDTH / guidelineBaseWidth) * size;

export const scaleFont = (size:any) => size * PixelRatio.getFontScale();

interface LooseObject {
    [key: string]: any
}

function dimensions(top:any, right = top, bottom = top, left = right, property:any) {
    let styles:LooseObject = {};

    styles[`${property}Top`] = top;
    styles[`${property}Right`] = right;
    styles[`${property}Bottom`] = bottom;
    styles[`${property}Left`] = left;

    return styles;
}

export function margin(top:any, right:any, bottom:any, left:any) {
    return dimensions(top, right, bottom, left, 'margin');
}

export function padding(top:any, right:any, bottom:any, left:any) {
    return dimensions(top, right, bottom, left, 'padding');
}

export function boxShadow(color:any, offset = { height: 2, width: 2 },
    radius = 8, opacity = 0.2) {
    return {
        shadowColor: color,
        shadowOffset: offset,
        shadowOpacity: opacity,
        shadowRadius: radius,
        elevation: radius,
    };
}