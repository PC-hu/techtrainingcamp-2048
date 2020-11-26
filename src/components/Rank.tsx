import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../reducers';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { setrankAction } from '../actions/';
import { serverurl } from '../config';
const Rank: React.FC = () => {
  const dispatch = useDispatch();
  const rankdata = useSelector((state: StateType) => state.rankdata);
  const single = useSelector((state: StateType) => state.singleplayer);
  const score = useSelector((state: StateType) => state.score);
  const defeat = useSelector((state: StateType) => state.defeat);
  const victory = useSelector(
    (state: StateType) => state.victory && !state.victoryDismissed
  );
  const pname = useSelector((state: StateType) => state.playername);
  const [socketUrl, setSocketUrl] = useState(serverurl);
  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
  } = useWebSocket(socketUrl, { share: true });
  useEffect(() => {
    //alert(readyState);
    let stat: string = '游戏中';
    if (victory) stat = '胜利';
    if (defeat) stat = '失败';
    alert(readyState);
    sendJsonMessage({ type: 'data', name: pname, score: score, status: stat });
  }, [readyState, score, victory, defeat, sendJsonMessage]);
  useEffect(() => {
    if (lastJsonMessage === null || single) return;
    let type = JSON.parse(lastJsonMessage);
    if (type === 'rank') dispatch(setrankAction(lastJsonMessage));
  }, [dispatch, lastJsonMessage]);
  if (!single) {
    return (
      <table className="ranktable">
        <caption className="rankhead">排行榜</caption>
        <tbody>
          <th>排名</th>
          <th>昵称</th>
          <th>分数</th>
          <th>状态</th>
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
