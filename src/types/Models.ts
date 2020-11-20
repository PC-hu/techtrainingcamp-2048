import { BoardType } from '../functions/board';
import { ActionType } from './ActionType';
import { RankItem } from './RankItem';
export interface ActionModel {
  type: ActionType;
  value?: any;
}

export interface StorageModel {
  best?: number;
  score?: number;
  board?: BoardType;
  boardSize?: number;
  defeat?: boolean;
  victoryDismissed?: boolean;
  singleplayer?: boolean;
  endtime?: number;
  timeout?: boolean;
  playername?: string;
  rankdata?: RankItem[];
}

export interface Point {
  x: number;
  y: number;
}
