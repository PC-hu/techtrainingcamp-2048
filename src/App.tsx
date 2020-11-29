import React from 'react';
import { useSelector } from 'react-redux';
import GithubCorner from 'react-github-corner';
import './App.scss';

import { animationDuration, gridGap } from './config';
import { StateType } from './reducers';
import Header from './components/Header';
import Board from './components/Board';
import BoardSizePicker from './components/BoardSizePicker';
import ModePicker from './components/ModePicker';
import Rank from './components/Rank';
import Timer from './components/timer';
import NameInput from './components/NameInput';
import { Widget } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';

import Chat from './components/Chat';
import ReactLive2d from 'react-live2d';
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
        <GithubCorner href="https://github.com/PC-hu/techtrainingcamp-2048" />
        <Rank />
        <Timer />
        <div className="page">
          <Header />
          <div>
            <Board />
          </div>
          <BoardSizePicker />
          <ModePicker />
        </div>
        <ReactLive2d
          width={300}
          height={500}
          TouchBody={['加油加油', '你好菜啊', '欸好厉害']}
        />
        <Chat />
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
