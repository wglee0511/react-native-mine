import { Alert } from "react-native";

import { isWeb } from "@/constants/env";

export const alertMessage = (text: string, title?: string) =>
  isWeb ? alert(text) : Alert.alert(title || "", text);
