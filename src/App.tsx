import React from 'react';
import { useSelector } from 'react-redux';
import GithubCorner from 'react-github-corner';
import './App.scss';

import { animationDuration, gridGap } from './config';
import { StateType } from './reducers';
import Header from './components/Header';
import Board from './components/Board';
import SmallBoard from './components/SmallBoard';
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

        <div className="page">
          <div className="picker">
            <BoardSizePicker />
            <ModePicker />
            {/* <SmallBoard/> */}
          </div>
          <div>
            <Header />
            <Board />
          </div>
          <div className="pkinfo">
            <Timer />
            <Rank />
          </div>
        </div>
        <ReactLive2d
          width={250}
          height={300}
          bottom={'10px'}
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
