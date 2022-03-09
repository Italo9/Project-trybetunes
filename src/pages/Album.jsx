import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

const INITIAL_STATE = {
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
    this.setState(() => ((getMusics(idAlbum))
      .then((album) => {
        // console.log(album);
        this.setState(
          { info: album },
        );
      })
    ));
  }

  render() {
    const {
      info,
    } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <section>
          <div data-testid="album-name">
            {info.map((album) => (
              <div key={ album.trackId }>
                <p>{album.collectionName}</p>

              </div>

            ))}
          </div>
          <div data-testid="artist-name">
            {info.map((album) => (
              <div key={ album.trackId }>
                <p>{album.artistName}</p>
              </div>
            ))}
          </div>
          <MusicCard
            albuns={ info }
          />
        </section>
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
