import React from 'react';
import { Link } from 'react-router-dom';
import FinalTasksData from './FinalTasksData';
import { Button, Container, Col, Row, Badge } from 'react-bootstrap';

class Dashboard extends React.Component {
    renderStartButton() {
        const tasks = this.props.tasks
        const firstTask = tasks.length > 0 ? tasks[0] : null;
        if (firstTask) {
            return (
                <Button>  <Link to={`/taskscreen/${firstTask.id}`} >
                    {firstTask.tasks}
                </Link>
                </Button>
            );
        }
        return null;
    }
    render() {
        const tasks = this.props.tasks
        //console.log(this.props)
        return (
            <div>
                <Container className="top-space">
                    <Row className="justify-content-md-center">
                        <Col xs={12} md={6}><div>
                            <h1>DASHBOARD</h1>
                            <h2> Hello {this.props.name}</h2>

                            <h4>Your tasks today:</h4>

                            {tasks.map(task => { return <FinalTasksData data={task} key={task.id} /> })}
                            <h2><Badge variant="secondary" ><Link to="/report">Reports</Link></Badge> <Badge variant="secondary"><Link to="/tasksForm">Edit</Link></Badge></h2>
                            <h4 className="top-space">Start your first task:</h4>
                            {this.renderStartButton()}
                        </div>

                            <hr></hr>
                            <div className="top-space">
                                <Button variant="secondary" size="lg" onClick={this.props.auth.logout}>Logout</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default Dashboard;