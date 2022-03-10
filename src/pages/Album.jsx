import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Carregando from './Carregando';

const INITIAL_STATE = {
  carregando: false,
  info: [],
};
class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.requisicaoMusica = this.requisicaoMusica.bind(this);
  }

  componentDidMount() {
    this.requisicaoMusica();
  }

  requisicaoMusica() {
    const { match } = this.props;
    // console.log(match);
    const idAlbum = match.params.id;
    // console.log(idAlbum);
    this.setState({ carregando: true }, () => ((getMusics(idAlbum))
      .then((album) => {
        console.log(album);
        this.setState(
          { info: album,
            carregando: false,
          },
        );
      })
    ));
  }

  render() {
    const {
      info,
      carregando,
    } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {(!carregando) ? (
          <section>
            <p data-testid="album-name">{info[0]?.collectionName}</p>
            <p data-testid="artist-name">{info[0]?.artistName}</p>
            <div>
              {info.map((album, i) => (
                (i > 0) && (
                  <MusicCard
                    key={ album.trackId }
                    trackName={ album.trackName }
                    previewUrl={ album.previewUrl }
                    trackId={ album.trackId }
                    album={ album }
                  />)
              ))}
            </div>
          </section>) : (<Carregando />)}
      </div>

    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }) };
Album.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }) };

export default Album;
