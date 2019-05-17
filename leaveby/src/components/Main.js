import React, { Component } from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import logo from '.././assets/LeaveByLogo.svg';


export default class Main extends Component {
    render() {
        return (
            <div>
                <Container className="top-space">
                    <Row className="justify-content-md-center">
                        <Col xs={12} md={6}>
                        <img src={logo} alt="check mark" class="logo-front"/>
                            <h1> Hello {this.props.name} </h1>
                            {!this.props.auth.isAuthenticated() &&
                                <div>
                                    <h3>Please login</h3>
                                    <Button onClick={this.props.auth.login}> Login </Button>
                                </div>
                            }
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}