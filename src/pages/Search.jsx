import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';
import Header from '../components/Header';

const INITIAL_STATE = {
  name: '',
  thiIsDesabled: true,
  carregando: false,
  info: '',
  albuns: [],
};
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.changeHandler = this.changeHandler.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // componentDidUpdate() {
  //   const {
  //     albuns,
  //   } = this.state;
  //   { <section>
  //     { albuns.forEach((album) => (<div key={ album.artistId }>{album}</div>)) }
  //     </section>; }
  // }

  handleClick() {
    console.log('cheguei aqui');
    const {
      name,
    } = this.state;
    this.setState({ carregando: true }, () => ((searchAlbumsAPI(name))
      .then((album) => {
        console.log(album);
        this.setState(
          { carregando: false,
            info: `Resultado de álbuns de: ${name}, ${album.artistName}. `,
            albuns: album },
        );
      })
    ));
  }

  changeHandler = (event) => {
    const dois = 2;
    const { name, value } = event.target;
    if (name === 'name' && value.length >= dois) {
      this.setState({ thiIsDesabled: false, name: value });
    }
  }

  render() {
    const {
      thiIsDesabled,
      carregando,
      info,
      albuns,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {(!carregando) ? (
          <form>
            <fieldset>
              <legend>Nome</legend>
              <div>
                Banda ou Artista:
                <input
                  data-testid="search-artist-input"
                  type="name"
                  name="name"
                  onChange={ this.changeHandler }
                />
                <input
                  data-testid="search-artist-button"
                  type="button"
                  value="Pesquisar"
                  disabled={ thiIsDesabled }
                  onClick={ this.handleClick }
                />

              </div>
            </fieldset>
          </form>
        ) : (<Carregando />)}
        <p>{ info }</p>
        <section>
          { (albuns.length > 0) ? (albuns.map((album) => (
            <div key={ album.collectionId }>
              <nav>
                <Link
                  data-testid={ `link-to-album-${album.collectionId}` }
                  to={ `/album/${album.collectionId}` }
                >
                  Album

                </Link>
              </nav>
              <p>{album.collectionName}</p>
            </div>
          ))) : <p>Nenhum álbum foi encontrado</p> }
        </section>

      </div>
    );
  }
}

export default Search;
