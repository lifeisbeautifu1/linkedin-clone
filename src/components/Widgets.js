import React from 'react';
import { Info, FiberManualRecord } from '@material-ui/icons';

const Widgets = () => {
  const createArticle = (heading, subtitle) => (
    <div className="widgets__article">
      <div className="widgets__articleLeft">
        <FiberManualRecord />
      </div>
      <div className="widgets__articleRight">
        <h4>{heading}</h4>
        <p>{subtitle}</p>
      </div>
    </div>
  );
  return (
    <div className="widgets">
      <div className="widgets__header">
        <h2>LinkedIn news</h2>
        <Info />
      </div>
      {createArticle('Coronavirus: UK updates', 'Top news - 886 readers')}
      {createArticle('Tesla hits new hights', 'Car & Auto - 432 readers')}
      {createArticle('Bitcoin Breaks $22k', 'Crypto - 239 readers')}
      {createArticle('Is Redux too good?', 'Code - 42 readers')}
    </div>
  );
};

export default Widgets;
