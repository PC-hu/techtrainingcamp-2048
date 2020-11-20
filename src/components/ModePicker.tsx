import React from 'react';
import { useDispatch } from 'react-redux';
import { modeAction } from '../actions';

const ModePicker: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Play Mode</h2>
      <div className="mode-picker">
        <button onClick={() => dispatch(modeAction(true))}>单人模式</button>
        <button onClick={() => dispatch(modeAction(false))}>多人模式</button>
      </div>
    </div>
  );
};

export default ModePicker;
