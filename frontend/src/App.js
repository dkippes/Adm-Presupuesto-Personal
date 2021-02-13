import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Dashboard from './components/NavBar/NavBar';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import OperationPanel from './components/OperationPanel/OperationPanel';

function App() {
  return (
    <div className="container-sm">
      <header>
        <BrowserRouter>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/operationPanel" component={OperationPanel} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
