import React from 'react';

const InputOption = ({ Icon, title, color }) => {
  return (
    <div className="inputOption">
      {Icon && <Icon style={{ color }} />}
      <h4>{title}</h4>
    </div>
  );
};

export default InputOption;
