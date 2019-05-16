import React from 'react';
import { Link } from 'react-router-dom';
import FinalTasksData from './FinalTasksData';
import { Jumbotron, Button, Container, Col, Row, Badge } from 'react-bootstrap';


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
                    <Row>
                        <Col>
                            <h1>DASHBOARD</h1>
                            <p> Hello {this.props.name}</p>

                            {tasks.map(task => { return <FinalTasksData data={task} parse="hh:mm" format="mma" key={task.id} /> })}
                            <h2><Badge variant="secondary"><Link to="/report">Reports</Link></Badge> <Badge variant="secondary"><Link to="/tasksForm">Edit</Link></Badge></h2>
                            <h4>Start your first task:</h4>
                            {this.renderStartButton()}
                        </Col>
                    </Row>
                    <Col>
                        <Row>
                            <Button variant="dark" size="lg" onClick={this.props.auth.logout}>Logout</Button>
                        </Row>
                    </Col>
                </Container>
            </div>

        )
    }
}
export default Dashboard;