import React from 'react';
import { Link } from 'react-router-dom';

class Results extends React.Component {
    render() {
        return (
            <div>
                <h2>RESULTS</h2>
                <h2><Badge variant="secondary" > <Link to="./dashboard">Done</Link> </Badge></h2>
            </div>
        )
    }
}
export default Results;