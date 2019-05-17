import React from 'react';
import { stat } from 'fs';
import { Button, Container, Col, Row, Badge } from 'react-bootstrap';

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
        if (this.props.editingTask !== undefined) {
            this.props.updateTask(this.state); // check with the other form updateEvent

        } else {
            this.props.addTask(this.state); // AddItem
            this.setState( { tasks: '', time_set: '', ranking: '' }); //added to set the input clear after adding the value
        }
    }
// get a new state from props. The props just changed.
    static getDerivedStateFromProps(props, state) {
        const editingTask = props.editingTask;
        console.log(editingTask);
        if (editingTask) {
            return {
                tasks: editingTask.tasks,
                time_set: editingTask.time_set.split(':').map(val => parseInt(val, 10))[1],
                ranking: editingTask.ranking
            };
        } else {
            //return state;

            return null;
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
                    value={this.state.tasks}
                />
                <label>Set Minutes</label>
                <input
                    name="time_set"
                    type="number"
                    min="1" max="60"
                    defaultValue={this.state.time_set}
                    onChange={this.handleInputChange}
                    value={this.state.time_set}
                />
                <label >Ranking</label>
                <input
                    name="ranking"
                    type="number"
                    min="1" max="15"
                    defaultValue={this.state.ranking}
                    onChange={this.handleInputChange}
                    value={this.state.ranking}
                />
                <button class="addTask"> submit </button>

            </form>
        )
    }
}
export default NewTaskForm;