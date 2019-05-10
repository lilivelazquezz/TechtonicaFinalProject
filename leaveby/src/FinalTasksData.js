import React from 'react';

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