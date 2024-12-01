export const SIZE_LEVELS = ["BEGINNER", "INTERMEDIATE", "EXPERT"] as const;

export const BEGINNER_SIZE = [8, 8];
export const INTERMEDIATE_SIZE = [10, 14];
export const EXPERT_SIZE = [14, 32];

export const SIZE_TEXT = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  EXPERT: "Expert"
};

export const SIZE_VALUE = {
  BEGINNER: BEGINNER_SIZE,
  INTERMEDIATE: INTERMEDIATE_SIZE,
  EXPERT: EXPERT_SIZE
};

export const CELL_TYPE = {
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  MINE: -6,
  CLICKED_MINE: -7,
  OPENED: 0
};

export const GAME_STATUS = {
  READY: "READY",
  PLAYING: "PLAYING",
  WIN: "WIN",
  LOSE: "LOSE"
} as const;
