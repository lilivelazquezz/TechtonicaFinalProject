import React from 'react';
import { Container } from 'react-bootstrap';
import LogIn from './LogIn';
import Dashboard from './Dashboard';
import AlarmScreen from './AlarmScreen';
import Report from './Report';
import Results from './Results';
import TaskScreen from './TaskScreen';
import TasksForm from './TasksForm';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
const APIURL1 = '/users';
const APIURL2 = '/tasks/';
const APIURL3 = '/results/';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      tasks: [],
      results: []
    }
  }
  componentDidMount() {
    fetch(APIURL1)
      .then(res => res.json())
      .then(
        (result) => {
          //  console.log(result)
          //  console.log('it worked')
          this.setState({
            isLoaded: true,
            users: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    // console.log(this.state.users)

    fetch(APIURL3)
      .then(res => res.json())
      .then(
        (result) => {
          //   console.log(result)
          //   console.log('it worked')
          this.setState({
            isLoaded: true,
            results: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    // console.log(this.state.results)

    fetch(APIURL2)
      .then(res => res.json())
      .then(
        (result) => {
          // console.log(result)
          //  console.log('it worked')
          this.setState({
            isLoaded: true,
            tasks: result
          });
          //  console.log(this.state)
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    this.create = this.create.bind(this);
  }

  create(newTask) {
    this.setState({
      tasks: [...this.state.tasks, newTask]
    })
  }

  render() {
    return (
      <Router>
        <div>
          <Container>
            <Switch>
              <Route exact path="/" render={() => < LogIn />} />
              <Route exact path='/dashboard' render={() => < Dashboard tasks={this.state.tasks} />} />
              <Route exact path='/alarmScreen' render={() => < AlarmScreen />} />
              <Route exact path='/report' render={() => < Report />} />
              <Route exact path='/result' render={() => < Results />} />
              <Route exact path='/taskscreen' render={() => < TaskScreen />} />
              <Route exact path='/tasksform' render={() => < TasksForm tasks={this.state.tasks} />} />
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;
