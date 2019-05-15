import React from 'react';
import Moment from "react-moment";

class FinalTasksData extends React.Component {
    render() {
        return (
            <div>
            
                <li>{this.props.data.tasks} {this.props.data.time_set} {this.props.data.ranking}</li>
            </div>
        )
    }
}
export default FinalTasksData;