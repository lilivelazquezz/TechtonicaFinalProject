import React from 'react';

class NewTaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: '',
            time_set: '',
            ranking: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.id) {
            this.props.updateTask(this.state); // check with thee other form  updateEvent
        } else {
            this.props.addTask(this.state); // AddItem
        }
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>New Task</label>
                <input
                    name="tasks"
                    type="text"
                    placeholder="New Task"
                    defaultValue={this.state.tasks}
                    onChange={this.handleInputChange}
                />
                <label>Set Minutes</label>
                <input
                    name="time_set"
                    type="number"
                    min="1" max="60"
                    defaultValue={this.state.time_set}
                    onChange={this.handleInputChange}
                />
                <label >Ranking</label>
                <input
                    name="ranking"
                    type="number"
                    min="1" max="15"
                    defaultValue={this.state.ranking}
                    onChange={this.handleInputChange}
                />
                <button class="addTask"> Add New Task</button>
            </form>
        )
    }
}
export default NewTaskForm;