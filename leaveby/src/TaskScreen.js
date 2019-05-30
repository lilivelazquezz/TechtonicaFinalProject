import React from 'react';
import { Link } from 'react-router-dom';
import glass from './assets/HourGlass.gif';
import { Button, Container, Col, Row, Badge } from 'react-bootstrap';
import moment from 'moment';

class TaskScreen extends React.Component {

  constructor(props) {
    super(props);
    console.log(props.tasks)
    // let task = props.tasks.find(function (task) {
    //   return task.id === parseInt(props.match.params.id);
    // })
    let task = props.tasks[0];
    let time = task.time_set.split(":");
    console.log(time[1]);
    this.state = {
      currentIndex: 0,
      currentTask: task.id,
      taskTime: parseInt(time[1]) * 60 + parseInt(time[2]),
      count: 0,
      message: ''
    }
    this.addResult = this.addResult.bind(this);
  }

  componentDidMount() {
    this.inter = setInterval(() => {

      this.setState((prevState) => ({ count: prevState.count + 1 }));

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
        taskTime: parseInt(time[1]) * 60 + parseInt(time[2]),
        count: 0,
        currentTask: task.id,
        currentIndex: this.props.tasks.indexOf(task)
      })
    }
  }
  addResult() {
    let time = moment().startOf("day").seconds(this.state.count).format("HH:mm:ss");

    //console.log("hello from button");
   // console.log("from button ", time);
    fetch('/results/', {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        total_time: time,
        tasks_id: this.state.currentTask
      })
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log("result", result)
          //  console.log('it worked')
        });
  }

  render() {
    const tasks = this.props.tasks;
    let taskId = parseInt(this.props.match.params.id);
    var found = tasks.find(function (task) {
      return task.id == taskId;
    });

    const next = this.state.currentIndex + 1;
    // var nextTask = tasks.find(function (task) {
    //   return task.id == next;
    // });
    var nextTask = this.props.tasks[next];

    let overTime = "";
    let realTime = "You When Over by: ";
    let time = Math.abs(this.state.taskTime - this.state.count);

    if (this.state.count >= this.state.taskTime) {
      overTime = <h2 className="digital2">{moment().startOf("day").seconds(time).format("m:ss")}</h2>

    } else {
      realTime = <h2 className="digital">{moment().startOf("day").seconds(time).format("m:ss")}</h2>;
    }

    return (
      <div>
        <Container className="top-space">
          <Row className="justify-content-md-center">
            <Col xs={12} md={6}>
              <h2 className="taskTitle">{found && found.tasks}</h2>
              <h2>
                {this.state.message ? this.state.message : realTime}
              </h2>

              {overTime}

              <img src={glass} alt="hour glass time animation" />
              <br></br>

              <Button className="nextTaskButton" onClick={this.addResult}>{nextTask ?
                <Link to={"/taskScreen/" + nextTask.id}>NEXT</Link>
                : <Link to="/report" >FINISH</Link>
              }  </Button>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
export default TaskScreen;