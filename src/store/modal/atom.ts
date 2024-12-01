import { atom } from "recoil";

import { ModalType } from "./type";

export const initialModalState = { isOpenGameSettingBottomSheet: false };

export const modalState = atom<ModalType>({
  key: "modal",
  default: initialModalState
});
