import React from 'react';
import { Link } from 'react-router-dom';
import FinalTasksData from './FinalTasksData';

class Dashboard extends React.Component {
    render() {
        const tasks = this.props.tasks
        //console.log(this.props)
        return (
            <div>
                <h2>DASHBOARD</h2>
                {tasks.map(task => { return <FinalTasksData data={task} key={task.id} /> })}
                <Link to="/report">Reports</Link>
                <Link to="/tasksForm">Edit</Link>
            </div>
        )
    }
}
export default Dashboard;