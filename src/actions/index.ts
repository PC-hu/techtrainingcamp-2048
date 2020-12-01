import { ActionModel } from '../types/Models';
import { ActionType } from '../types/ActionType';
import { Direction } from '../types/Direction';

export function resetAction(size = 4): ActionModel {
  return {
    type: ActionType.RESET,
    value: size,
  };
}

export function undoAction(): ActionModel {
  return {
    type: ActionType.UNDO,
  };
}

export function moveAction(direction: Direction): ActionModel {
  return {
    type: ActionType.MOVE,
    value: direction,
  };
}

export function dismissAction(): ActionModel {
  return {
    type: ActionType.DISMISS,
  };
}

export function modeAction(singleplayer = true): ActionModel {
  return {
    type: ActionType.CHRMODE,
    value: singleplayer,
  };
}

export function timeoutAction(): ActionModel {
  return {
    type: ActionType.TIMEOUT,
  };
}
export function setnameAction(pname: string): ActionModel {
  return {
    type: ActionType.SETNAME,
    value: pname,
  };
}
export function setrankAction(data: string): ActionModel {
  return {
    type: ActionType.SETRANK,
    value: data,
  };
}
export function setendAction(data: Number): ActionModel {
  return {
    type: ActionType.SETENDTIME,
    value: data,
  };
}

export function setDiffcultyLv(data: Number): ActionModel {
  return {
    type: ActionType.SETDIFFCULTYLV,
    value: data,
  };
}
export function setAutoMovetime(data: Number): ActionModel {
  return {
    type: ActionType.SETAUTOMOVETIME,
    value: data,
  };
}