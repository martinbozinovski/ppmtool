import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from './components/Dashboard';
import Header from './components/Layout/Header';
import AddProject from './components/Project/AddProject';
import UpdateProject from './components/Project/UpdateProject';
import ProjectBoard from './components/ProjectBoard/ProjectBoard';
import AddProjectTask from './components/ProjectBoard/ProjectTasks/AddProjectTask';
import UpdateProjectTask from './components/ProjectBoard/ProjectTasks/UpdateProjectTask';
import Landing from './components/Layout/Landing';
import Register from './components/UserManagement/Register';
import Login from './components/UserManagement/Login';
import SecuredRoute from './securityUtils/SecureRoute';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setJWToken from './securityUtils/setJWToken';
import { SET_CURRENT_USER } from './actions/types';
import { logout } from './actions/securityActions';

const jwtToken = localStorage.jwtToken;
if (jwtToken) {
  setJWToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  });
  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  };
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />

          <Switch>
            <SecuredRoute exact path="/dashboard" component={Dashboard} />
            <SecuredRoute exact path="/addProject" component={AddProject} />
            <SecuredRoute exact path="/updateProject/:id" component={UpdateProject} />
            <SecuredRoute exact path="/projectBoard/:id" component={ProjectBoard} />
            <SecuredRoute exact path="/addProjectTask/:id" component={AddProjectTask} />
            <SecuredRoute exact path="/updateProjectTask/:backlog_id/:pt_id" component={UpdateProjectTask} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
