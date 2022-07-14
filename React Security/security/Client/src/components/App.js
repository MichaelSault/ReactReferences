import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from '../react-auth0-spa';
import history from '../history';
import Navigation from './Navigation';
import Jumbotron from './Jumbotron';
import Contact from './Contact';
import About from './About';
import Loading from './Loading';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      name: "MichaelSault",
      jumbotronTitle: "Auth0 Login-Logout Application"
    }
  }

  async componentDidMount() {
    const url = 'http://localhost:4000/courses';
    const response = await axios.get(url);
    return this.setState({feeds: response});
  }

  render() {
    const { loading } = useAuth0;

    if (loading) {
      return <loading />
    }

    return (
      <Router history={history}>
        <div className="container">
          <Navigation />
          <Jumbotron title={this.state.jumbotronTitle}/>
          <Switch>
            <Route path="/contact" component={Contact}/>
            <Route path="/about" component={About}/>
          </Switch>
          <div className="footer">
                <p>&copy; {this.state.name} Inc.</p>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
