import { atom } from "recoil";

import { SettingTypes } from "./type";

import { generateBoard } from "@/libs/game";

export const initialSettingState: SettingTypes = {
  mineNumber: 10,
  level: "BEGINNER",
  elapsedTime: 0,
  board: generateBoard("BEGINNER"),
  clickedCount: 0,
  status: "READY"
};

export const settingState = atom<SettingTypes>({
  key: "setting",
  default: initialSettingState
});
