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
        console.log("results", results);

        // const user = this.props.user.id

        let loopTasks = tasks.map((task, key) =>
            <li key={task.id}><strong>{task.tasks}</strong> - {moment.duration(task.time_set).format("m:ss")}</li>
        );

        //     let loopResults = tasks.map((result, key) =>
        //     <li key={result.id}>{result.tasks_id}{result.total_time}</li>
        // );

        // console.log(this.props.user.id);

        return (
            <div>
                <Container className="top-space">
                    <Row className="justify-content-md-center">
                        <Col xs={12} md={6}>
                            <div style={{ position: "realtive", width: 600, height: 550 }} className="fluid">
                                <h1>Results</h1>
                                <ul><h4>Time set</h4>
                                    {loopTasks}
                                </ul>
                                <Line
                                    options={{
                                        responsive: true
                                    }}
                                    data={this.state.data} />
                                <h2><Badge variant="secondary" > <Link to="dashboard">Profile</Link></Badge>   
                                </h2>
                                <hr></hr>
                                <div className="top-space">
                                    <Button variant="secondary" size="lg" onClick={this.props.auth.logout}>Logout</Button>
                                </div>
                            </div>

                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default Report;