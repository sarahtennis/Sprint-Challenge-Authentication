import React, { Component } from 'react';
import axios from 'axios';
import { Switch, Route, Link } from 'react-router-dom';
import './App.css';

import Register from './components/Register.js';

const url = 'http://localhost:3300';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      authenticated: false
    }
  }

  authenticate = () => {
    const token = localStorage.getItem('unimportant');
    const options = {
      headers: {
        authorization: token,
      },
    };

    if(token){
      axios.get(`${url}/api/authenticate`, options)
        .then(res => {
          if(res.status === 200) {
            this.setState({ authenticated: true})
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  componentDidMount() {
    this.authenticate();
  }

  render() {
    return (
      <div className="App">
        <header>
          <div>LOGO</div>
          <nav>
            {this.state.authenticated ? <div><div>DAD JOKES</div><div>LOGOUT</div></div> : <div><Link to='/register'>REGISTER</Link><div>LOGIN</div></div>}
          </nav>
        </header>
        <div>
          <Switch>
            <Route path='/register' component={Register}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
