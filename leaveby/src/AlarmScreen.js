import React from 'react';
import { Link } from 'react-router-dom';

class AlarmScreen extends React.Component {
    render() {
        return (
            <div>
                <h2>ALARM SCREEN</h2>
                <Link to="/dashboard">Cancel</Link>
                <Link to="/taskScreen">NEXT</Link>
            </div>
        )
    }
}
export default AlarmScreen;