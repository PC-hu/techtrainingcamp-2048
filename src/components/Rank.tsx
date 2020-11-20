import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../reducers';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { setrankAction } from '../actions/';
const Rank: React.FC = () => {
  const dispatch = useDispatch();
  const rankdata = useSelector((state: StateType) => state.rankdata);
  const single = useSelector((state: StateType) => state.singleplayer);
  const score = useSelector((state: StateType) => state.score);
  const [socketUrl, setSocketUrl] = useState('wss://echo.websocket.org');
  const messageHistory = useRef([]);
  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
  } = useWebSocket(socketUrl);
  useEffect(() => {
    sendJsonMessage(score);
  }, [score, sendJsonMessage]);
  useEffect(() => dispatch(setrankAction(lastJsonMessage)), [
    dispatch,
    lastJsonMessage,
  ]);
  if (!single) {
    return (
      <table className="ranktable">
        <caption className="rankhead">排行榜</caption>
        <th>排名</th>
        <th>昵称</th>
        <th>分数</th>
        <th>状态</th>
        <tbody>
          {rankdata.map((RankItem, index) => (
            <tr className="item" key={index}>
              <td>{index}</td>
              <td>{RankItem.pname}</td>
              <td>{RankItem.score}</td>
              <td>{RankItem.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  return null;
};

export default Rank;
