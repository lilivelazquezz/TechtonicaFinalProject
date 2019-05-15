import React, { Component } from 'react';

import { Button, Container, Col, Row } from 'react-bootstrap';


export default class Main extends Component {
    render() {
        return (
            <div>
                <Container className="top-space">
                    <Row>
                        <Col>
                            <h2> Hello {this.props.name} </h2>
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