import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StateType } from '../reducers';
import { Direction } from '../types/Direction';
import { Point } from '../types/Models';
import { BoardType } from '../functions/board';
import { Animation, AnimationType } from '../types/Animations';
import { animationDuration } from '../config';
import { moveAction } from '../actions';
import BoardTile from './BoardTile';
import Overlay from './Overlay';
const SmallBoard: React.FC = props => {
  const { board } = props;
  const boardSize = useSelector((state: StateType) => state.boardSize);
  const [renderedBoard, setRenderedBoard] = useState(board);

  useEffect(() => {
    setRenderedBoard([...board]);
  }, [board, setRenderedBoard]);
  return (
    <div
      className={`smallboard board-${boardSize}`}
      style={{ '--board-size': boardSize } as any}
    >
      {renderedBoard.map((value, i) => (
        <BoardTile value={value} key={i} />
      ))}
    </div>
  );
};

export default SmallBoard;
