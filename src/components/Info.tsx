import React from 'react';
import { useSelector } from 'react-redux';
import { StateType } from '../reducers';

const Info: React.FC = () => {
  const pname = useSelector((state: StateType) => state.playername);
  const single = useSelector((state: StateType) => state.singleplayer);
  if (!single) return <div className="info">Hello,{pname}</div>;
  return null;
};

export default Info;
