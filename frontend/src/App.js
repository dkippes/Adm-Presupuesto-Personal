import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/NavBar/NavBar';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import OperationPanel from './components/OperationPanel/OperationPanel';

function App() {
  return (
    <body>
        <BrowserRouter>
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/" exact component={Register} />
          </Switch>
        </BrowserRouter>
    </body>
  );
}

export default App;
