import React from 'react';


class Task extends React.Component {
    render() {
        return (
            <div>
                <button>Edit</button>
                <button> x </button>
                <button> Alarm </button>
                <li>{this.props.data.tasks} {this.props.data.time_set} {this.props.data.ranking}</li>
            </div>
        )
    }
}
export default Task;