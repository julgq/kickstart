import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';


class RequestRow extends Component {

    onApprove = async () => {
        /* Obtenemos la campaign desde web3 */
        const campaign = Campaign(this.props.address);

        const accounts = await web3.eth.getAccounts();

        /* Ejecutamos approveRequest funcion del contrato, pasando el id o index el arrary de los request */
        await campaign.methods.approveRequest(this.props.id).send({
            from: accounts[0]
        });
    };

    /* Para poder finalizar un Request es necesario tener mas del 50% de votos de los fondeadores */
    onFinalize = async () => {
        /* Obtenemos la campaign desde web3 */
        const campaign = Campaign(this.props.address);

        const accounts = await web3.eth.getAccounts();

        /* Ejecutamos approveRequest funcion del contrato, pasando el id o index el arrary de los request */
        await campaign.methods.finalizeRequest(this.props.id).send({
            from: accounts[0]
        });
    };

    render() {
        const { Row, Cell } = Table;
        /* Traemos id, request, y total de fondeadores desde el props */
        const { id, request, approversCount } = this.props;

        /* Si obtenemos true entonces el request esta listo para ser finalizado */
        const readyToFinalize = request.approvalCount > approversCount / 2;

        return (

            <Row 
            /* Desabilitamos el Row con color propiedad de semantic-ui y también positive en caso de que este listo para finalizar */
            disabled={request.complete} 
            positive={readyToFinalize && !request.complete}
            >
                <Cell>{id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
                <Cell>{request.recipient}</Cell>

                <Cell>
                    {request.approvalCount}/{approversCount}
                </Cell>
                <Cell>
                    {
                        /* Si el request esta completado o finalizado, NO mostrar el boton de Approve */
                        request.complete ? null : (
                            <Button color="green" basic onClick={this.onApprove}>Approve</Button>
                        )}
                </Cell>
                <Cell>
                    {(
                        /* Si el request es completado o finalizado, entonces ocultar el boton finalize */
                        request.complete ? null :
                            <Button color="teal" basic onClick={this.onFinalize}>Finalize</Button>
                    )}
                </Cell>
            </Row>
        );
    }
}

export default RequestRow;