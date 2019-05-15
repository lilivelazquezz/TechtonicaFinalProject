import React from 'react';


class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.handleDelete = this.handleDelete.bind(this);

    }
    handleDelete() {
        //console.log(this.props.data.id)
        this.props.deleteTask(this.props.data.id);
    }
    render() {


        return (
            <div>
                <button>Edit</button>
                <button onClick={this.handleDelete}> x </button>
                <button > Alarm </button>
                <li>{this.props.data.tasks} {this.props.data.time_set} {this.props.data.ranking}</li>
            </div>
        )
    }
}
export default Task;