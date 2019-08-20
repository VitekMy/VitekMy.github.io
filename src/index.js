import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, ReactReduxContext } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './storeConfig/configureStore';

import Auth from './containers/auth';
import Home from './containers/home';
import DetailPhoto from './containers/detail-photo';

window.localStorage.setItem('start', 0);
window.localStorage.setItem('end', 10);

const store = configureStore();


ReactDOM.render(
  <Provider store={store} context={ReactReduxContext}>
    <ConnectedRouter history={history} context={ReactReduxContext}>
     <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/auth" component={Auth} />
        <Route path="/photo/:id" component={DetailPhoto} />
      </Switch>
     </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
