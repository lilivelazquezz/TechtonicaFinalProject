import React, { Component } from 'react';

export default class Main extends Component {
    render() {
        return (
            <div>
                <p> Hello {this.props.name} </p>
                {!this.props.auth.isAuthenticated() &&
                    <div>
                        <h3>Please login</h3>
                        <button onClick={this.props.auth.login}> Login </button>
                    </div>
                }
            </div>
        )
    }
}