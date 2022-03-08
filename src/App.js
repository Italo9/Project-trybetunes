import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
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
