import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modeAction, setDiffcultyLv, moveAction, setAutoMovetime } from '../actions';
import { supportedDifficulty } from '../config';
import { StateType } from '../reducers';

const ModePicker: React.FC = () => {
  const dispatch = useDispatch();
  let auto_move_flag = false;
  let auto_move_time = useSelector((state: StateType) => state.automovetime);
  const auto_move = function(){
    if ( auto_move_flag === false )
      return;
    var direction = Math.floor( Math.random() * 4 );
    dispatch(moveAction(direction))
    setTimeout(()=>{
      auto_move()
    }, auto_move_time );
  };
  const start_auto_move = function(){
    auto_move_time = auto_move_time || 300
    auto_move_flag = true;
    auto_move();
  };
  const stop_auto_move = function(){
    auto_move_flag = false;
  };
  const handleChange = function(event){
    auto_move_time = event.target.value
  }
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

      <h2>Auto move!!</h2>
      <div className="mode-picker">
        <strong>Move randomly with </strong>
        <input type='number' className="auto-move-input" name="auto-move-time" value={auto_move_time} 
          onChange={(e)=> dispatch(setAutoMovetime(Number(e.target.value)))} id="auto-move-input-time" >
        </input>
        <strong> ms.</strong>
        <button onClick={() => {start_auto_move()} }>Run</button>
        <button onClick={() => {stop_auto_move()} }>Stop</button>
      </div>
    </div>
  );
};

export default ModePicker;
