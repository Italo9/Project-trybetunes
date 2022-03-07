import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

const INITIAL_STATE = {
  name: '',
  thiIsDesabled: true,
  carregando: false,
};
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.changeHandler = this.changeHandler.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const {
      name,
    } = this.state;
    const {
      history,
    } = this.props;
    this.setState({ carregando: true }, () => ((createUser({ name })).then(
      () => history.push('/search'),
    )
    ));
  }

  changeHandler = (event) => {
    const tres = 3;
    const { name, value } = event.target;
    if (name === 'name' && value.length >= tres) {
      this.setState({ thiIsDesabled: false });
      this.setState({ name: value });
    }
  }

  render() {
    const {
      thiIsDesabled,
      carregando,
    } = this.state;
    return (
      (!carregando) ? (
        <div data-testid="page-login">
          <form>
            <fieldset>
              <legend>Seu nome</legend>
              <div>
                Nome:
                <input
                  data-testid="login-name-input"
                  type="name"
                  name="name"
                  onChange={ this.changeHandler }
                />
                <input
                  data-testid="login-submit-button"
                  type="button"
                  value="Entrar"
                  disabled={ thiIsDesabled }
                  onClick={ this.handleClick }
                />

              </div>
            </fieldset>
          </form>
        </div>)
        : (<Carregando />));
  }
}
Login.propTypes = {
  history: PropTypes.shape.isRequired,
};

export default Login;
