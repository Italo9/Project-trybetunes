import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import Album from './pages/Album';
import Carregando from './pages/Carregando';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <section>
        <p>TrybeTunes</p>
        {/* <nav>
          <Link to="/">Login</Link>
          <Link to="/search">Login</Link>
          <Link to="/album/:id">Login</Link>
          <Link to="/favorites">Login</Link>
          <Link to="/profile">Login</Link>
          <Link to="/profile/edit">Login</Link>
        </nav> */}
        <BrowserRouter>
          <main>
            <Switch>
              <Route exact path="/" component={ Login } />
              <Route exact path="/search" component={ Search } />
              <Route exact path="/album/:id" component={ Album } />
              <Route exact path="/favorites" component={ Favorites } />
              <Route exact path="/profile" component={ Profile } />
              <Route exact path="/profile/edit" component={ ProfileEdit } />
              <Route exact path="/loading" component={ Carregando } />
              <Route exact path="*" component={ NotFound } />

            </Switch>
          </main>
        </BrowserRouter>
      </section>
    );
  }
}

export default App;
