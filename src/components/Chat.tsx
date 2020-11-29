import React, { useEffect } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import useWebSocket from 'react-use-websocket';
import 'react-chat-widget/lib/styles.css';
import { serverurl } from '../config';
import logo from '../img/logo.svg';
import { isPropertyName } from 'typescript';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../reducers';
const Chat: React.FC = () => {
  const pname = useSelector((state: StateType) => state.playername);

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(serverurl, {
    share: true,
  });
  useEffect(() => {
    if (!lastJsonMessage) return;
    if (lastJsonMessage.type == 'letschat')
      addResponseMessage(lastJsonMessage.str, lastJsonMessage.name);
  }, [lastJsonMessage]);

  const handleNewUserMessage = (newMessage: string) => {
    console.log(`New message incoming! ${newMessage}`);
    sendJsonMessage({ type: 'letschat', name: pname, str: newMessage });
    // Now send the message throught the backend API
  };

  return (
    <div className="App">
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        profileAvatar={logo}
        title="对战聊天室"
        subtitle=""
      />
    </div>
  );
};

export default Chat;
