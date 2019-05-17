import React from 'react';
import { Link } from 'react-router-dom';
import Task from './Task';
import NewTaskForm from './NewTaskForm';
import { Line } from 'react-chartjs-2';
import { Button, Container, Col, Row, Badge } from 'react-bootstrap';


class TasksForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editingTasksId: null,
        };
        this.editTask = this.editTask.bind(this);
    }
    editTask(id){
        this.setState({ "editingTasksId": id })
    }
    // Need updaate task, have it call updateTask from (TaskFrom) props
    render() {
        const tasks = this.props.tasks
        let activeEditingTask = tasks.find((task) => {
            return task.id === parseInt(this.state.editingTasksId);
          })
        //console.log(this.props)
        return (
            <div>
                <Container className="top-space">
                    <Row className="justify-content-md-center">
                        <Col xs={12} md={6}>
                            <div>
                                <h1>Tasks</h1>
                                <NewTaskForm
                                    addTask={this.props.addTask}
                                    editingTask={activeEditingTask}
                                />
                                <div className="top-space">
                                    {
                                        tasks.map(
                                            task => {
                                                return (
                                                    <Task
                                                        data={task}
                                                        key={task.id}
                                                        time={task.time_set}
                                                        deleteTask={this.props.deleteTask}
                                                        editTask={this.editTask}
                                                    />
                                                )
                                            }
                                        )
                                    }
                                    <Link to="/dashboard">DONE</Link>
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