import React from 'react';
import Moment from "react-moment";

import moment from 'moment';

class FinalTasksData extends React.Component {
    render() {
        return (
            <div>
                <li><strong>{this.props.data.tasks}  </strong> - {moment.duration(this.props.data.time_set).format("m:ss")} {/*this.props.data.ranking */}</li>
            </div>
        )
    }
}
export default FinalTasksData;