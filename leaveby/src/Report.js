import React from 'react';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';

class Report extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            data: {
                labels: props.tasks.map((task) => {
                    return task.tasks;
                }),

                datasets: [
                    {
                        label: "Actual time",
                        backgroundColor: "rgba(255, 0, 255, 0.40)",
                        data: props.tasks.map((task) => {
                            return task.time_set;
                        }),
                    },
                    {

                        label: "Time set",
                        backgroundColor: "rgba(0, 255, 0, 0.40)",
                        data: [20, 4, 3, 5, 20, 4, 10]
                    }
                ]
            }
        }
    }
    render() {
        const tasks = this.props.tasks
        console.log(tasks);

        const results = this.props.results
        console.log(results);

        let loopTasks = tasks.map((task, key) =>
            <li key={task.id}>{task.tasks}{task.time_set}</li>
            
        );
        return (
            <div style={{ position: "realtive", width: 600, height: 550 }}>
                <h3>Results</h3>

                {loopTasks}

                <Line
                    options={{
                        responsive: true
                    }}
                    data={this.state.data} />
                <Link to="dashboard">Profile</Link>
            </div>
        )
    }
}
export default Report;