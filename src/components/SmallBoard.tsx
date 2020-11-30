import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { StateType } from '../reducers';
import BoardTile from './BoardTile';
import { BoardType } from '../functions/board';
interface Para {
  board: BoardType;
}
const SmallBoard: React.FC<Para> = ({ board }) => {
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
      {renderedBoard.map((value: number, i: number) => (
        <BoardTile value={value} key={i} />
      ))}
    </div>
  );
};

export default SmallBoard;
