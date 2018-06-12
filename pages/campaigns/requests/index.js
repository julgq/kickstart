import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/layout';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';


class RequestIndex extends Component {
    static async getInitialProps(props) {
        /* address de la campaign desde la url */
        const { address } = props.query;

        /* Obtenemos la campaign desde web3 */
        const campaign = Campaign(address);
        
        /* Cantidad total de requests que el administrador ha creado */
        const requestCount = await campaign.methods.getRequestCount().call();

        /* Cantidad total de fondeadores de esta campaign */
        const approversCount = await campaign.methods.approversCount().call();


        /* Creamos un array en base al numero de requestCount, en solidity no se puede iterar un array de Struct */
        const requests = await Promise.all(
            Array(parseInt(requestCount))
                .fill()
                .map((element, index) => {
                    return campaign.methods.requests(index).call();
                })
        );
        console.log(requests);

        return { address, requests, requestCount, approversCount };
    }

    renderRows() {
        /* Retornamos un RequestRow por cada request que existe de la campaign */
        return this.props.requests.map((request, index) => {
            return <RequestRow
                key={index}
                id={index}
                request={request}
                address={this.props.address}
                approversCount={this.props.approversCount}
            />;
        });
    }

    render() {
        const { Header, Row, HeaderCell, Body } = Table;

        return (
            <Layout>
                <h3>Requests</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary floated="right" style={{ marginBottom:10}}> Add Request </Button>
                    </a>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRows()}
                    </Body>
                </Table>
                <div>
                    Found {this.props.requestCount} requests.
                </div>
                
            </Layout>
        );
    }
}

export default RequestIndex;