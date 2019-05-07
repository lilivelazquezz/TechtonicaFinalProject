import React from 'react';
import { Link } from 'react-router-dom';

class Report extends React.Component {
    render() {
        return (
            <div>
                <h2>REPORT</h2>
                <Link to="./dashboard">Profile</Link>
            </div>
        )
    }
}
export default Report;