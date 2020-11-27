import React from 'react';
import { useDispatch } from 'react-redux';
import { modeAction, setDiffcultyLv } from '../actions';
import { supportedDifficulty } from '../config';

const ModePicker: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Play Mode</h2>
      <div className="mode-picker">
        <button onClick={() => dispatch(modeAction(true))}>单人模式</button>
        <button onClick={() => dispatch(modeAction(false))}>多人模式</button>
      </div>
      <h2>Difficulty Level</h2>
      <div className="mode-picker">
        {supportedDifficulty.map(level => (
          <button key={level} onClick={() => dispatch(setDiffcultyLv(level))}>
            {level}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModePicker;
