import React from 'react';

class NewTaskForm extends React.Component{
    constructor(props){
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
        //this.setState({value: event.target.value});
        this.setState({
            [event.target.name] : event.target.value
        });
      }

      handleSubmit(event) {
       // alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
        this.props.createTask(this.state);
        this.setState({ task:''});
      }

      render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="task">New Task</label>
                <input 
                name="tasks"
                type="text"
                placeholder = "New Task"
                defaultValue={this.state.tasks}
                onChange={this.handleInputChange}
                /> 
                <label >Set Time</label>
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
                <button> Add New Task</button>
            </form>
        )
    }
}
export default NewTaskForm;