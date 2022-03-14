import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';

const INITIAL_STATE = {
  carregando: false,
  isFavorite: false,
  fazNada: '',
};

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.handleChange = this.handleChange.bind(this);
    this.favoritadaChecked = this.favoritadaChecked.bind(this);
  }

  componentDidMount() {
    this.favoritadaChecked();
  }

  handleChange() {
    const {
      album,
    } = this.props;
    const {
      isFavorite,
    } = this.state;
    if (!isFavorite) {
      this.setState({ carregando: true, isFavorite: true }, () => ((addSong(album))
        .then(() => {
          // console.log(album);
          this.setState(
            { carregando: false,
            },
          );
        })));
    } else {
      this.setState({ carregando: true, isFavorite: false }, () => ((removeSong(album))
        .then(() => {
          this.setState(
            {
              carregando: false,
              fazNada: '',
            },
          );
        })));
    }
  }

  favoritadaChecked() {
    // console.log('entrou');
    const {
      favoritas,
      album,
    } = this.props;
    favoritas.forEach((itemMusica) => {
      // console.log('entrou no primeiro');
      if (itemMusica.previewUrl === album.previewUrl) {
        this.setState({ isFavorite: true });
        // console.log('funcionou');
      } else {
        // console.log('passou do if');
      }
    });
  }

  render() {
    const {
      trackName,
      previewUrl,
      trackId,
      // album,
    } = this.props;
    // console.log(album);
    const {
      carregando,
      isFavorite,
      fazNada,
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
                  onChange={ this.handleChange }
                />
              </label>) : (<Carregando />)}
            {fazNada}
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
  favoritas: PropTypes.arrayOf(PropTypes.shape()).isRequired,

};
export default MusicCard;
