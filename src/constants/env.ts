import { Dimensions, Platform } from "react-native";

export const isIOS = Platform.OS === "ios";
export const isAndroid = Platform.OS === "android";
export const isWeb = Platform.OS === "web";

const { width, height } = Dimensions.get("window");

export const WINDOW_HEIGHT = height;
export const WINDOW_WIDTH = width;
