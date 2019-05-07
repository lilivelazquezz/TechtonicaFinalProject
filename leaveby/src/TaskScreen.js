import React from 'react';
import { Link } from 'react-router-dom';

class TaskScreen extends React.Component {
    render() {
        return (
            <div>
                <h2>TASK SCREEN</h2>
                <Link to="/taskScreen">NEXT</Link>
            </div>
        )
    }
}
export default TaskScreen;