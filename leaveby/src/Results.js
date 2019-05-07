import React from 'react';
import { Link } from 'react-router-dom';

class Results extends React.Component {
    render() {
        return (
            <div>
                <h2>RESULTS</h2>
                <Link to="./dashboard">Done</Link>
            </div>
        )
    }
}
export default Results;