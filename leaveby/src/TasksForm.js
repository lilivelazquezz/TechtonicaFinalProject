import React from 'react';
import { Link } from 'react-router-dom';
import Task from './Task';
import NewTaskForm from './NewTaskForm';
import { Line } from 'react-chartjs-2';
import { Button, Container, Col, Row, Badge } from 'react-bootstrap';
import moment from 'moment';


class TasksForm extends React.Component {

    render() {
        const tasks = this.props.tasks
        //console.log(this.props)
        return (
            <div>
                <Container className="top-space">
                    <Row className="justify-content-md-center">
                        <Col xs={12} md={6}>
                            <div>
                                <h1>Tasks</h1>
                                <NewTaskForm addTask={this.props.addTask} />
                                    <div className="top-space">
                                    {tasks.map(task => { return <Task data={task} key={task.id} time={ moment.duration(task.time_set).format("m:ss") } deleteTask={this.props.deleteTask} /> })}
                                    <h2><Badge variant="secondary" > <Link to="dashboard">Profile</Link></Badge>   
                                    </h2>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default TasksForm;