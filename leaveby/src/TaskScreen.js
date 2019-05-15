import React from 'react';
import { Link } from 'react-router-dom';
import glass from './assets/HourGlass.gif';

class TaskScreen extends React.Component {

  constructor(props) {
    super(props);
    console.log(props.tasks)
    let task = props.tasks.find(function (task) {
      return task.id === parseInt(props.match.params.id);
    })
    let time = task.time_set.split(":");
    console.log(time[1]);
    this.state = {
      currentTask: task.id,
      count: parseInt(time[1]) * 60,
      message: ''
    }
  }

  componentDidMount() {
    this.inter = setInterval(() => {
      if (this.state.count <= 0) {
        //on button press store 
        // clearInterval(this.inter);
        //this.state.count when press button 
        //input type="hidden" value={this.state.count}/>
        //<Link>

      }
      this.setState((prevState) => ({ count: prevState.count - 1 }));

    }, 1000);

  }

  componentWillUnmount() {
    clearInterval(this.inter);
  }

  componentDidUpdate() {

    if (this.state.currentTask !== parseInt(this.props.match.params.id)) {

      let task = this.props.tasks.find((task) => {
        return task.id === parseInt(this.props.match.params.id);
      })

      let time = task.time_set.split(":");

      this.setState({
        count: parseInt(time[1]) * 60,
        currentTask: task.id
      })
    }

  }

  render() {
    const tasks = this.props.tasks;
    let taskId = parseInt(this.props.match.params.id);
    let taskTime = parseInt(this.props.match.params.time_set);
    var found = tasks.find(function (task) {
      return task.id == taskId;
    });

    const next = taskId + 1;
    var nextTask = tasks.find(function (task) {
      return task.id == next;
    });

    //let toSeconds = parseInt(this.props.tasks.time_set) * 60;

    console.log(this.props.tasks[0].time_set);
    // console.log(this.props.match.params.time_set);
    // console.log(taskTime);
    // console.log(this.props.time_set);

    let overTime = "";
    let realTime = "Your are over by:";
    if (this.state.count <= 0) {
      overTime = <h1>{new Date(-this.state.count * 1000).toISOString().substr(11, 8)}</h1>
    } else {
      realTime = new Date(this.state.count * 1000).toISOString().substr(11, 8)
    }

    return (
      <div>
        <h2>TASK SCREEN {taskId}</h2>
        <h1>
          {this.state.message ? this.state.message : realTime}
        </h1>
        {overTime}

        <img src={glass} alt="hour glass time animation" />

        <h3>{found && found.tasks}</h3>
        {nextTask ?
          <Link to={"/taskScreen/" + next}>NEXT</Link>
          : <Link to="/report" >Finish</Link>
        }

      </div>
    )
  }
}
export default TaskScreen;