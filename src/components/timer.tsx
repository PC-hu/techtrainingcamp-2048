import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { timeoutAction, setendAction } from '../actions';
import { StateType } from '../reducers';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { serverurl } from '../config';

const Timer: React.FC = () => {
  const dispatch = useDispatch();
  const endTime = useSelector((state: StateType) => state.endtime);
  const single = useSelector((state: StateType) => state.singleplayer);
  const pname = useSelector((state: StateType) => state.playername);

  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [socketUrl, setSocketUrl] = useState(serverurl);
  const { lastJsonMessage, readyState } = useWebSocket(socketUrl, {
    share: true,
  });
  useEffect(() => {
    if (lastJsonMessage === null) return;
    let message = JSON.parse(lastJsonMessage);
    if (message.type === 'time') dispatch(setendAction(message.duration));
  }, [dispatch, lastJsonMessage]);
  useEffect(() => {
    if (single || pname === '') return;
    //let sys_second = (endTime - new Date().getTime())/1000;
    let sys_second = endTime;
    const timerId = setInterval(() => {
      //防止倒计时出现负数
      if (sys_second > 0) {
        sys_second -= 1;
        let minute = Math.floor((sys_second / 60) % 60);
        let second = Math.floor(sys_second % 60);
        setMinute(minute);
        setSecond(second);
      } else {
        clearInterval(timerId);
        //倒计时结束时触发方法
        dispatch(timeoutAction());
      }
    }, 1000);
    return () => {
      //返回一个回调函数用来清除定时器
      clearInterval(timerId);
    };
  }, [dispatch, endTime, pname, single]);
  if (!single) {
    return (
      <div className="count-down">
        <div className="red">{minute}</div>
        <div className="time">&nbsp;分&nbsp;</div>
        <div className="red">{second}</div>
        <div className="time">&nbsp;秒</div>
      </div>
    );
  }
  return null;
};

export default Timer;
