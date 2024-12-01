import { MineCell } from "@/types/game";
import { LevelSize } from "@/types/size";

import { GAME_STATUS } from "@/constants/constants";

export interface SettingTypes {
  level: LevelSize;
  mineNumber: number;
  elapsedTime: number;
  board: MineCell;
  clickedCount: number;
  status: keyof typeof GAME_STATUS;
}
