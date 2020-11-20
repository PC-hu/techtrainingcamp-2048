import { StorageModel } from '../types/Models';

const ITEM_NAME = '2048_data';

export function getStoredData(): StorageModel {
  if (!localStorage.getItem(ITEM_NAME)) {
    return {};
  }
  let model: StorageModel = {};
  try {
    const data = JSON.parse(localStorage.getItem(ITEM_NAME) as string);
    if (
      data.hasOwnProperty('board') &&
      data.hasOwnProperty('boardSize') &&
      data.hasOwnProperty('score') &&
      data.hasOwnProperty('defeat') &&
      data.hasOwnProperty('victoryDismissed') &&
      data.hasOwnProperty('singleplayer') &&
      data.hasOwnProperty('timeout') &&
      data.hasOwnProperty('endtime') &&
      data.hasOwnProperty('playername')
    ) {
      if (
        Array.isArray(data.board) &&
        typeof data.boardSize === 'number' &&
        data.board.length === data.boardSize ** 2 &&
        typeof data.score === 'number' &&
        typeof data.defeat === 'boolean' &&
        typeof data.victoryDismissed === 'boolean' &&
        typeof data.singleplayer === 'boolean' &&
        typeof data.endtime === 'number' &&
        typeof data.timeout === 'boolean' &&
        typeof data.playername === 'string'
      ) {
        for (let value of data.board) {
          if (typeof value !== 'number') {
            throw new Error('Invalid stored data.');
          }

          // Make sure the value is a power of 2.
          if (value !== 0 && Math.log2(value) % 1 !== 0) {
            throw new Error('Invalid stored data.');
          }
        }
        model.board = data.board;
        model.boardSize = data.boardSize;
        model.score = data.score;
        model.defeat = data.defeat;
        model.victoryDismissed = data.victoryDismissed;
        model.singleplayer = data.singleplayer;
        model.endtime = data.endtime;
        model.timeout = data.timeout;
        model.playername = data.playername;
        model.rankdata = data.rankdata;
      } else {
        throw new Error('Invalid stored data.');
      }
    }

    if (data.hasOwnProperty('best')) {
      if (typeof data.best === 'number') {
        model.best = data.best;
      } else {
        throw new Error('Invalid stored data.');
      }
    }
  } catch {
    localStorage.removeItem(ITEM_NAME);
  }

  return model;
}

export function setStoredData(model: StorageModel) {
  localStorage.setItem(
    ITEM_NAME,
    JSON.stringify({
      best: model.best,
      score: model.score,
      board: model.board,
      boardSize: model.boardSize,
      defeat: model.defeat,
      victoryDismissed: model.victoryDismissed,
      singleplayer: model.singleplayer,
      timeout: model.timeout,
      endtime: model.endtime,
      playername: model.playername,
      rankdata: model.rankdata,
    })
  );
}
