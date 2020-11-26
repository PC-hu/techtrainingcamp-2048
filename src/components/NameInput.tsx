import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setnameAction } from '../actions';
import { StateType } from '../reducers';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { serverurl } from '../config';
const NameInput: React.FC = () => {
  const dispatch = useDispatch();
  const singleplayer = useSelector((state: StateType) => state.singleplayer);
  const playername = useSelector((state: StateType) => state.playername);
  const [pname, setName] = useState('');
  const writename = useCallback(() => {
    dispatch(setnameAction(pname));
    sendJsonMessage({ type: 'login', name: pname });
  }, [dispatch, pname]);
  const [socketUrl, setSocketUrl] = useState(serverurl);
  const { sendJsonMessage, readyState } = useWebSocket(socketUrl, {
    share: true,
  });
  if (!singleplayer && playername === '') {
    return (
      <div className="nameinput">
        <h1>请输入昵称</h1>
        <input
          type="text"
          value={pname}
          onChange={e => setName(e.target.value)}
          className="input"
        />
        <div className="inputbtn">
          <button onClick={writename}>进入房间</button>
        </div>
      </div>
    );
  }
  return null;
};
export default NameInput;
