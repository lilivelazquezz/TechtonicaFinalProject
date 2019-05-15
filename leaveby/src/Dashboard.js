import React from 'react';
import { Link } from 'react-router-dom';
import FinalTasksData from './FinalTasksData';

class Dashboard extends React.Component {
    renderStartButton() {
        const tasks = this.props.tasks
        const firstTask = tasks.length > 0 ? tasks[0] : null;
        if (firstTask) {
            return (
                <Link to={`/taskscreen/${firstTask.id}`}>
                    {firstTask.tasks}
                </Link>
            );
        }
        return null;
    }
    render() {
        const tasks = this.props.tasks
        //console.log(this.props)
        return (
            <div>
                <h2>DASHBOARD</h2>
                <p> Hello {this.props.name}</p>
                {tasks.map(task => { return <FinalTasksData data={task} parse="hh:mm" format="mma" key={task.id} /> })}
                <Link to="/report">Reports</Link>
                <Link to="/tasksForm">Edit</Link>
                {this.renderStartButton()}
                <button onClick={this.props.auth.logout}>Logout</button>
            </div>
        )
    }
}
export default Dashboard;