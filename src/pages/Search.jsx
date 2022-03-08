import React from 'react';
import Header from '../components/Header';

const INITIAL_STATE = {
  name: '',
  thiIsDesabled: true,
  carregando: false,
};
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler = (event) => {
    const dois = 2;
    const { name, value } = event.target;
    if (name === 'name' && value.length >= dois) {
      this.setState({ thiIsDesabled: false });
    }
  }

  render() {
    const {
      thiIsDesabled,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <fieldset>
            <legend>Seu nome</legend>
            <div>
              Nome da banda/artista:
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
              />

            </div>
          </fieldset>
        </form>
        )
      </div>
    );
  }
}

export default Search;
