import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class ContributeForm extends Component {

    state = {
        value: '',
        errorMessage: '',
        loading: false
    };


    onSubmit = async event => {
        /* Evitar que el formulario se envie solo */
        event.preventDefault();

        /* obtenemos la camapaña que se esta fondeando */
        const campaign = Campaign(this.props.address);

        /* activar spinner loading: true */
        this.setState({ loading: true, errorMessage: '' });


        console.log(campaign);

        try {
            /* Obtenemos las cuentas de web3, MetaMask */
            const accounts = await web3.eth.getAccounts();
            console.log(accounts);

            /* Ejecutamosla funcion contribute() del contrato */
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            });

            /* Actualiza la pagina para volver hacer render una vez que se confirme la transaccion */
            Router.replaceRoute(`/campaigns/${this.props.address}`)

        } catch (err) {

            /* Obtenemos el error y lo mostramos */
            this.setState({ errorMessage: err.message });

        }

        /* Desactivar Spinner y quitar el valor del input */
        this.setState({ loading: false, value: '' })

    };

    render() {
        return (<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Field>
                <label>Amount to Contribute</label>
                <Input
                    value={this.state.value}
                    onChange={event => this.setState({ value: event.target.value })}
                    label="ether"
                    labelPosition="right"
                />
            </Form.Field>
            <Message error header="Oops!" content={this.state.errorMessage} />
            <Button primary loading={this.state.loading}>
                Contribute!
                </Button>
        </Form>
        );

    }
}

export default ContributeForm;