import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';

const INITIAL_STATE = {
  carregando: false,
  isFavorite: false,
};

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const {
      album,
    } = this.props;
    this.setState({ carregando: true, isFavorite: true }, () => ((addSong(album))
      .then(() => {
      // console.log(album);
        this.setState(
          { carregando: false,
          },
        );
      })));
  }

  render() {
    const {
      trackName,
      previewUrl,
      trackId,
    } = this.props;
    console.log(trackName);
    const {
      carregando,
      isFavorite,
    } = this.state;
    return (
      <div>
        <section>
          <div>
            <p>{trackName}</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
            {(!carregando) ? (
              <label htmlFor="favorite">
                Favorita
                <input
                  data-testid={ `checkbox-music-${trackId}` }
                  type="checkbox"
                  id="favorite"
                  name="isFavorite"
                  checked={ isFavorite }
                  onClick={ this.handleClick }
                />
              </label>) : (<Carregando />)}
          </div>
        </section>

      </div>

    );
  }
}
MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  album: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,

};
export default MusicCard;
