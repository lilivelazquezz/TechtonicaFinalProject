import React from 'react';
import { Link } from 'react-router-dom';

class LogIn extends React.Component {
    render() {
        return (
            <div>
                <h2>Log In</h2>
                <Link to="/dashboard">Profile</Link>
            </div>
        )
    }
}
export default LogIn;