import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from '../pages/Carregando';

const INITIAL_STATE = {
  carregando: false,
};

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.pessoLogada = this.pessoLogada.bind(this);
  }

  pessoLogada() {
    this.setState({ carregando: true }, () => ((getUser())
      .then(() => this.setState({ carregando: false }))));
  }

  render() {
    const {
      carregando,
    } = this.state;
    return (
      <header data-testid="header-component">

        {(!carregando)
          ? (
            <div data-testid="header-user-name">
              {this.pessoLogada}
            </div>)
          : (<Carregando />)}
        <nav>
          <Link data-testid="link-to-search" to="/search">Pesquisar</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favorito</Link>
          <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        </nav>

      </header>
    );
  }
}

export default Header;
