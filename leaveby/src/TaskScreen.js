import React from 'react';
import { Link } from 'react-router-dom';

class TaskScreen extends React.Component {
    
    render() {
        const tasks = this.props.tasks;
        let taskId = this.props.match.params.id;
        var found = tasks.find(function(task) {
            return task.id === taskId;
          });
          

        return (
            <div>
                <h2>TASK SCREEN {taskId}</h2>
                <h3>{found && found.tasks}</h3>
                <Link to="/taskScreen">NEXT</Link>
            </div>
        )
    }
}
export default TaskScreen;