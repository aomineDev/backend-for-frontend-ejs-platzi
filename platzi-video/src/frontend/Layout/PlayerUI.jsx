import React from 'react';
import { Helmet } from 'react-helmet';

const PlayerUI = ({ id, msg }) => (
  <div className='Player__bg'>
    <Helmet bodyAttributes={{ style: 'background-image: linear-gradient(#21c08b, #ab88ff);' }}>
      <title>{`Platzi Video | Player ${id}`}</title>
    </Helmet>
    <p className='Player__pre'>{msg}</p>
  </div>
);

export default PlayerUI;
