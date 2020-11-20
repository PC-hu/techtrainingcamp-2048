import React from 'react';
import { useSelector } from 'react-redux';
import GithubCorner from 'react-github-corner';
import './App.scss';

import { animationDuration, gridGap } from './config';
import { StateType } from '../reducers';
import Header from './components/Header';
import Board from './components/Board';
import Info from './components/Info';
import BoardSizePicker from './components/BoardSizePicker';
import ModePicker from './components/ModePicker';
import Rank from './components/Rank';
import Timer from './components/timer';
import NameInput from './components/NameInput';
const App: React.FC = () => {
  const singleplayer = useSelector((state: StateType) => state.singleplayer);
  const playername = useSelector((state: StateType) => state.playername);
  if (singleplayer || playername !== '') {
    return (
      <div
        className="app"
        style={
          {
            '--animation-duration': animationDuration + 'ms',
            '--grid-gap': gridGap,
          } as any
        }
      >
        <GithubCorner href="https://github.com/mat-sz/2048" />
        <Rank />
        <Timer />
        <div className="page">
          <Header />
          <Board />
          <BoardSizePicker />
          <ModePicker />
          <Info />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <NameInput />
      </div>
    );
  }
};

export default App;
