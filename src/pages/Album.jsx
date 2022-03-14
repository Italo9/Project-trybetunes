import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

const INITIAL_STATE = {
  carregando: false,
  info: [],
  favoritas: [],
};
class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.requisicaoMusica = this.requisicaoMusica.bind(this);
    this.recuperaMusica = this.recuperaMusica.bind(this);
  }

  componentDidMount() {
    this.requisicaoMusica();
    this.recuperaMusica();
  }

  // componentDidUpdate() {
  //   this.recuperaMusica();
  // }

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

  recuperaMusica() {
    getFavoriteSongs().then((musica) => {
      console.log(musica);
      this.setState(
        { favoritas: musica,
          carregando: false,
        },
      );
    });
  }

  // x() {
  //   console.log('entrou');
  //   const {
  //     favoritas,
  //     info,
  //   } = this.state;
  //   favoritas.forEach((itemMusica) => {
  //     console.log('entrou no primeiro');
  //     info.forEach((itemMusicaInfo) => {
  //       if (itemMusica.previewUrl === itemMusicaInfo.previewUrl) {
  //         itemMusicaInfo[isFavorite] = true;
  //         console.log('funcionou');
  //       } else {
  //         console.log('passou do if');
  //       }
  //     });
  //   });
  // }

  render() {
    const {
      info,
      carregando,
      favoritas,
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
                    key={ uuidv4() }
                    trackName={ album.trackName }
                    previewUrl={ album.previewUrl }
                    trackId={ album.trackId }
                    album={ album }
                    favoritas={ favoritas }
                  />)
              ))}
            </div>
            <section>
              {/* {favoritas.map((musica) => (
                <div key={ uuidv4() }>{musica}</div>
              ))} */}

            </section>
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
