import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Register from './components/Register/Register';
import Login from './components/Register/Login';
import OperationPanel from './components/OperationPanel/OperationPanel';

function App() {
  return (
    <body>
      <h1 style={{textAlign:"center", margin:"15px 0 15px 0"}}>Personal Buged</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/operationPanel" exact component={OperationPanel} />
          <Route path="/" exact component={Register} />
        </Switch>
      </BrowserRouter>
    </body>
  );
}

export default App;
