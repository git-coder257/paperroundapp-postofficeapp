import React from 'react';
import { BrowserRouter, Route } from "react-router-dom"
import Home from "./components/home"
import Loginoptions from './components/loginoptions';
import Login from './components/login';
import Creataccount from './components/createaccount';
import Deliveraccount from './components/deliveraccounts';

function App() {
  return (<BrowserRouter>
    <Route exact path="/" component={Loginoptions}/>
    <Route path="/home" component={Home}/>
    <Route path="/login" component={Login}/>
    <Route path="/createaccount" component={Creataccount}/>
    <Route path="/selectdeliveraccount/:username/:papername" component={Deliveraccount}/>
  </BrowserRouter>);
}

export default App;
