import React from 'react';
import { Link } from 'react-router-dom';
import Task from './Task';
import NewTaskForm from './NewTaskForm';

class TasksForm extends React.Component {

    render() {
        const tasks = this.props.tasks
        //console.log(this.props)
        return (
            <div>
                <h1>Tasks</h1>
                <NewTaskForm addTask={this.props.addTask} />
                {tasks.map(task => { return <Task data={task} key={task.id} /> })}
                <Link to="/dashboard">DONE</Link>
            </div>
        )
    }
}
export default TasksForm;