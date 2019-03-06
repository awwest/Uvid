import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.css';

import Feed from "./routes/Feed";
import Upload from "./routes/Upload";
import Users from "./routes/Users";
import Profile from "./routes/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Nav from "./components/Nav";
import ajax from "./utils/ajax";

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      userId: '',
      loginError: '',
      signupError: ''
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleSignup(username, password, passwordConfirmation){
    let user = { 
        name: username,
        password: password,
        password_confirmation: passwordConfirmation
    };
    ajax.post('/users', user).then((userId)=>{
        this.setState({
          isLoggedIn: true,
          userId: user.id
        });
    }).catch((error)=>{
        this.setState({signupError: "Hmm, that's not working. Try again?"});
    });
  }

  handleLogin(username, password){
    ajax.post('/login', {
        password: password,
        name: username,
    }).then((res) => {
      this.setState({
        isLoggedIn: true,
        userId: res.data.id
      })
    }).catch((error)=>{
        this.setState({loginError: 'Try Again'});
    });
  }

  logout(){
    ajax.delete('/logout').then(()=>{
      this.setState({
        isLoggedIn: false
      });
    });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Nav isLoggedIn={this.state.isLoggedIn}
                 userId={this.state.userId}
                 logout={this.logout}></Nav>
            <Switch>
                <Route exact path="/" render={()=>
                  (this.state.isLoggedIn ? 
                    <Feed></Feed> : 
                    <div className="container">
                      <div className="row">
                        <Login handleLogin={this.handleLogin} error={this.state.loginError}></Login>
                        <Signup handleSignup={this.handleSignup} error={this.state.signupError}></Signup>
                      </div>
                    </div>)}>
                </Route>
                <Route exact path="/upload" render={ () => (
                    this.state.isLoggedIn ? 
                    <Upload></Upload>
                    : 
                    <Redirect to="/"></Redirect>)}>
                </Route>
                <Route path="/profile/:id" component={Profile} render={() => (
                  <Profile id={this.state.userId}
                           isLoggedIn={this.state.isLoggedIn}>
                  </Profile>
                )}></Route>
                <Route exact path="/users" component={Users}></Route>
            </Switch>
            </div>
        </Router>
      </div>
    );
  }
}

export default App;
