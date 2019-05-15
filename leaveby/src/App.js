import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Main from './components/Main';
import Secret from './components/Secret';
// import NotFound from './components/NotFound';
import Callback from './components/Callback';
import AlarmScreen from './AlarmScreen';
import Dashboard from './Dashboard';
import Report from './Report';
import TaskScreen from './TaskScreen';
import TasksForm from './TasksForm';
import NewTaskForm from './NewTaskForm';
import Auth from './Auth.js';

const APIURL1 = '/users/';
const APIURL2 = '/tasks/';
const APIURL3 = '/results/';

class App extends React.Component {
  constructor(props) {
    const auth = new Auth();
    //    auth.login();
    super(props);
    this.state = {
      user: null,
      tasks: [],
      results: [],
      auth
    }
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  componentDidMount() {
    let userData = this.state.auth.getProfile();
    if (!userData.given_name) { return }
    let transferData = {
      name: userData.given_name,
      last_name: userData.family_name,
      email: userData.email,
      auth0_id: userData.sub,
    }
    fetch('/users', {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(transferData)
    })
      .then(res => res.json())
      .then(
        (result) => {
          // console.log(result)
          //  console.log('it worked')
          this.setState({
            isLoaded: true,
            user: result
          });
          fetch(`/results/${result.id}`)
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
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });

        }
      )
    // console.log(this.state.users)    
  }
  addTask(val) {
    console.log("ADDING TODO FROM TASK COMPONENT", val)
    //val.users_id = 1;
    val.auth0_id = this.props.user;
    fetch(APIURL2, {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(val)
    })
      .then(res => res.json())
      .then(newTask => {
        this.setState({ tasks: [...this.state.tasks, newTask] })
      })
  }

  deleteTask(id) {
    const deleteURL = APIURL2 + id;
    console.log(deleteURL)
    fetch(deleteURL, {
      method: 'delete'
    })
      .then(res => res.json())
      .then(() => {
        const tasks = this.state.tasks.filter(tasks => tasks.id !== id)
        this.setState({ tasks: tasks });
      });
  }

  // console.log(this.state.results)
  render() {
    return (
      <Router>
        <Switch>
          <Route exact
            path="/"
            render={props => (
              <Main
                {...this.props}
              />
            )}
          />
          <PrivateRoute
            path="/secret"
            component={Secret}
            auth={this.props.auth}
            {...this.props}
          />
          <Route
            path="/callback"
            component={Callback}
          />
          <PrivateRoute
            path="/dashboard"
            component={Dashboard}
            auth={this.props.auth}
            tasks={this.state.tasks}
            {...this.props}
          />
          <PrivateRoute
            path="/alarmscreen"
            component={AlarmScreen}
            auth={this.props.auth}
            tasks={this.state.tasks}
            {...this.props}
          />
          <PrivateRoute
            path="/taskscreen/:id"
            component={TaskScreen}
            auth={this.props.auth}
            tasks={this.state.tasks}
            {...this.props}
          />
          <PrivateRoute
            path="/tasksform"
            component={TasksForm}
            auth={this.props.auth}
            tasks={this.state.tasks}
            {...this.props}
            addTask={this.addTask}
            deleteTask={this.deleteTask}

          />
          <PrivateRoute
            path="/report"
            component={Report}
            auth={this.props.auth}
            tasks={this.state.tasks}
            results={this.state.results}
            {...this.props}
          />

          <PrivateRoute
            path="/newtaksform"
            component={NewTaskForm}
            auth={this.props.auth}
            tasks={this.state.tasks}
            {...this.props}
          />

          <PrivateRoute
            path="/task"
            component={Report}
            auth={this.props.auth}
            tasks={this.state.tasks}
            {...this.props}
            deleteTask={this.deleteTask}
          />
        </Switch>
      </Router>
    );
  }
}

class PrivateRoute extends React.Component {
  render() {
    const Component = this.props.component;
    return (
      <Route
        path={this.props.path}
        render={props =>
          this.props.auth.isAuthenticated() ? (
            <Component {...this.props} {...props} />
          ) : (
              <Redirect to={{ pathname: "/" }} />
            )
        }
      />
    )
  }
}

export default App;
