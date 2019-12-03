import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getVideoSource } from '../actions';

import PlayerUI from '../Layout/PlayerUI';

const Player = ({ history, match, playing, getVideoSource }) => {
  const { id } = match.params;
  const intId = parseInt(id, 0);

  useEffect(() => {
    getVideoSource(intId);
  }, []);

  const goBack = () => {
    // history.goBack();
    history.push('/');
  };

  if (playing === null) return <PlayerUI id={id} msg='Loading...' />;

  if (!Object.keys(playing).length) return <PlayerUI id={id} msg='Este video no fue encontrado 😥' />;

  return (
    <div className='Player'>
      <video controls autoPlay>
        <source src={playing.source} type='video/mp4' />
      </video>
      <div className='Player__back'>
        <button type='button' onClick={goBack}>Regresar</button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  playing: state.playing,
});

const mapDispatchToProps = {
  getVideoSource,
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
