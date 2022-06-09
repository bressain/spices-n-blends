import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

// this will boostrap and run our backend.
import './backend';

// routes
import App from './frontend/home';
import SpiceDetail from './frontend/spice-detail';
import BlendDetail from './frontend/blend-detail';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <App />
          </Route>
          <Route path="/spices/:id">
            <SpiceDetail />
          </Route>
          <Route path="/blends/:id">
            <BlendDetail />
          </Route>
        </Switch>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
