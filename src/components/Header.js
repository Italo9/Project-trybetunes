import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from '../pages/Carregando';

const INITIAL_STATE = {
  carregando: false,
  name: '',
};

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.pessoaLogada = this.pessoaLogada.bind(this);
  }

  componentDidMount() {
    this.pessoaLogada();
  }

  pessoaLogada() {
    // console.log('fui chamado');
    this.setState({ carregando: true }, () => ((getUser())
      .then((user) => {
        // console.log(nomePessoa);
        this.setState({ carregando: false, name: user.name });
      })));
  }

  render() {
    const {
      carregando,
      name,
    } = this.state;
    return (
      <header data-testid="header-component">

        {(!carregando)
          ? (
            <div data-testid="header-user-name">{ name }</div>)
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
