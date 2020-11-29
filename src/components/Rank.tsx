import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../reducers';
import useWebSocket from 'react-use-websocket';
import { setrankAction, setendAction } from '../actions/';
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
  const {
    sendJsonMessage,
    lastJsonMessage,
    readyState,
  } = useWebSocket(serverurl, { share: true });
  const sendstatus = useCallback(() => {
    if (single) return;
    let stat: string = '游戏中';
    if (victory) stat = '胜利';
    if (defeat) stat = '失败';
    sendJsonMessage({ type: 'data', name: pname, score: score, status: stat });
  }, [score, victory, defeat]);
  const receive = useCallback(() => {
    let message = lastJsonMessage;
    if (message !== null) {
      if (message.type === 'rank') dispatch(setrankAction(lastJsonMessage));
      else if (message.type === 'time')
        dispatch(setendAction(message.duration));
    }
  }, [lastJsonMessage]);
  useEffect(() => {
    if (pname === '') return;
    sendJsonMessage({ type: 'login', name: pname });
  }, [pname]);
  useEffect(() => {
    sendstatus();
  }, [sendstatus]);
  useEffect(() => {
    receive();
  }, [receive]);
  if (!single) {
    return (
      <table className="ranktable">
        <caption className="rankhead">排行榜</caption>
        <tbody>
          <tr>
            <th>排名</th>
            <th>昵称</th>
            <th>分数</th>
            <th>状态</th>
          </tr>
          {rankdata.map((RankItem, index) => (
            <tr className="item" key={index}>
              <td>{index + 1}</td>
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
