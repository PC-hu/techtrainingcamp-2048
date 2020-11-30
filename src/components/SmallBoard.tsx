import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { StateType } from '../reducers';
import BoardTile from './BoardTile';
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
