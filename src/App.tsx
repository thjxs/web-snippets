import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import routes from './routes';

function App() {
  return (
    <Suspense fallback="">
      <BrowserRouter>
        <Switch>
          {routes.map((r) => (
            <Route
              key={r.path}
              path={r.path}
              component={lazy(() => import(`${r.component}`))}
            ></Route>
          ))}
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
