import React, { Component } from 'react';
export default class Secret extends Component {
    render() {
        return (
            <div>
                This is the secret area
                <button onClick={this.props.auth.logout}>Logout</button>
            </div>
        )

    }
}