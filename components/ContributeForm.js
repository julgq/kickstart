import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
class ContributeForm extends Component {
    
    state = {
        value: ''
    };

    onSubmit = (event) => {
        /* Evitar que el formulario se envie solo */
        event.preventDefault();

        const campaign = Campaign(this.props.address);

        console.log(campaign);

    }

    render() {
       return ( <Form onSubmit={this.onSubmit}>
            <Form.Field>
                <label>Amount to Contribute</label>
                <Input
                    value={this.state.value}
                    onChange={event => this.setState({ value: event.target.value })}
                    label="ether"
                    labelPosition="right"
                />
            </Form.Field>
            <Button primary>
            Contribute!
                </Button>
        </Form>
       );

    }
}

export default ContributeForm;