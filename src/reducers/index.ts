import { Store } from 'redux';

import { ActionType } from '../types/ActionType';
import { ActionModel } from '../types/Models';
import {
  initializeBoard,
  BoardType,
  updateBoard,
  movePossible,
} from '../functions/board';
import { Direction } from '../types/Direction';
import { getStoredData, setStoredData } from '../functions/localStorage';
import { Animation } from '../types/Animations';
import { defaultBoardSize, victoryTileValue } from '../config';
import { RankItem } from '../types/RankItem';

export interface StateType {
  /** Board size. Currently always 4. */
  boardSize: number;

  /** Current board. */
  board: BoardType;

  /** Previous board. */
  previousBoard?: BoardType;

  /** Was 2048 tile found? */
  victory: boolean;

  /** Is game over? */
  defeat: boolean;

  /** Should the victory screen be hidden? */
  victoryDismissed: boolean;

  /** single or multi player?*/
  singleplayer: boolean;

  /** Current score. */
  score: number;

  /** Score increase after last update. */
  scoreIncrease?: number;

  /** Best score. */
  best: number;

  /** data for rank */
  rankdata: RankItem[];

  /** run out of time? */
  timeout: boolean;

  /** when the game end */
  endtime: number;

  /** name of player */
  playername: string;

  /** Used for certain animations. Mainly as a value of the "key" property. */
  moveId?: string;

  /** Animations after last update. */
  animations?: Animation[];
}

const storedData = getStoredData();

function initializeState(): StateType {
  const update = initializeBoard(defaultBoardSize);

  return {
    boardSize: storedData.boardSize || defaultBoardSize,
    board: storedData.board || update.board,
    defeat: storedData.defeat || false,
    victory: false,
    victoryDismissed: storedData.victoryDismissed || false,
    singleplayer: true,
    score: storedData.score || 0,
    best: storedData.best || 0,
    moveId: new Date().getTime().toString(),
    rankdata: [],
    timeout: false,
    endtime: 1000,
    playername: '',
  };
}

let initialState: StateType = initializeState();

export type StoreType = Store<StateType, ActionModel>;

function applicationState(state = initialState, action: ActionModel) {
  const newState = { ...state };

  switch (action.type) {
    case ActionType.RESET:
      {
        const size = action.value || newState.boardSize;
        const update = initializeBoard(size);
        newState.boardSize = size;
        newState.board = update.board;
        newState.score = 0;
        newState.animations = update.animations;
        newState.previousBoard = undefined;
        newState.victory = false;
        newState.victoryDismissed = false;
        newState.timeout = false;
        newState.rankdata = [];
        newState.endtime = 10;
      }
      break;
    case ActionType.MOVE:
      {
        if (newState.defeat) {
          break;
        }

        const direction = action.value as Direction;
        const update = updateBoard(newState.board, direction);
        newState.previousBoard = [...newState.board];
        newState.board = update.board;
        newState.score += update.scoreIncrease;
        newState.animations = update.animations;
        newState.scoreIncrease = update.scoreIncrease;
        newState.moveId = new Date().getTime().toString();
      }
      break;
    case ActionType.UNDO:
      if (!newState.previousBoard) {
        break;
      }

      newState.board = newState.previousBoard;
      newState.previousBoard = undefined;

      if (newState.scoreIncrease) {
        newState.score -= newState.scoreIncrease;
      }
      break;
    case ActionType.DISMISS:
      newState.victoryDismissed = true;
      break;
    case ActionType.CHRMODE:
      newState.singleplayer = action.value;
      break;
    case ActionType.TIMEOUT:
      newState.timeout = true;
      newState.endtime = 0;
      break;
    case ActionType.SETNAME:
      newState.playername = action.value;
      break;
    case ActionType.SETRANK:
      // alert(action.value);
      let temp = JSON.parse(action.value);
      newState.rankdata = [];
      for (var i = 0; i < temp.length; i++) {
        newState.rankdata.push({
          pname: temp[i].name,
          score: temp[i].score,
          state: temp[i].status,
        });
      }
      break;
    case ActionType.SETENDTIME:
      newState.endtime = action.value;
      break;
    default:
      return state;
  }

  if (newState.score > newState.best) {
    newState.best = newState.score;
  }

  newState.defeat = !movePossible(newState.board);
  newState.victory = !!newState.board.find(value => value === victoryTileValue);
  if (!newState.singleplayer && newState.timeout) {
    newState.victory = false;
    newState.defeat = true;
  }
  setStoredData(newState);

  return newState;
}

export default applicationState;
