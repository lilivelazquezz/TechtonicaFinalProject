import React from 'react';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Button, Container, Col, Row, Badge } from 'react-bootstrap';
import moment from 'moment';

class Report extends React.Component {
    constructor(props) {
        super(props);
        console.log("Report.props is ", props)
        this.state = {

            data: {
                labels: props.tasks.map((task) => {
                    return task.tasks;
                }),

                datasets: [
                    {
                        label: "Actual time",
                        backgroundColor: "rgba(255, 0, 255, 0.40)",
                        data: props.results.map((result) => {
                            //  console.log("total_time ", result.total_time)
                            return moment.duration(result.total_time).asMinutes();

                        }),
                    },
                    {

                        label: "Time set",
                        backgroundColor: "rgba(0, 255, 0, 0.40)",
                        // data: [1, 2, 3, 4]
                        data: props.tasks.map((task) => {
                            return moment.duration(task.time_set).asMinutes();
                        }),
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

        // const user = this.props.user.id

        let loopTasks = tasks.map((task, key) =>
            <li key={task.id}>{task.tasks}{task.time_set}</li>
        );

        //     let loopResults = tasks.map((result, key) =>
        //     <li key={result.id}>{result.tasks_id}{result.total_time}</li>
        // );

        // console.log(this.props.user.id);

        return (
            <div>
                <Container>
                    <Row>
                        <Col>
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
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default Report;