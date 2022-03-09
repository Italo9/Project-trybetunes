import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const {
      albuns,
    } = this.props;
    return (
      <div>
        {albuns.map((album, i) => (
          <div key={ albuns.trackName }>
            {(i > 0) ? (
              <section>
                <div>
                  <p>{album.trackName}</p>
                  <audio data-testid="audio-component" src={ album.previewUrl } controls>
                    <track kind="captions" />
                    O seu navegador não suporta o elemento
                    <code>audio</code>
                    .
                  </audio>
                </div>
              </section>
            ) : ''}
          </div>
        ))}
      </div>
    );
  }
}
MusicCard.propTypes = {
  albuns: PropTypes.shape.isRequired,
};
export default MusicCard;
