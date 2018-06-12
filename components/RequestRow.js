import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class RequestRow extends Component {
    render() {
        const { Row, Cell } = Table;
        const { id, request } = this.props;

        return (
            <Row>
                <Cell>{id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{request.value}</Cell>
            </Row>
        );
    }
}

export default RequestRow;