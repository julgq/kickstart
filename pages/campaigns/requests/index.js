import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/layout';
import Campaign from '../../../ethereum/campaign';

class RequestIndex extends Component {
    static async getInitialProps(props){
        const { address } = props.query;
        const campaign = Campaign(address);
        const requestCount = await campaign.methods.getRequestCount().call();

        /* Creamos un array en base al numero de requestCount, en solidity no se puede iterar un array de Struct */
        const requests = await Promise.all(
            Array(parseInt(requestCount))
          .fill()
          .map((element, index) => {
              return campaign.methods.requests(index).call();
          })
        );
        console.log(requests);
        return { address, requests, requestCount };
    }

    render() {
        return (
            <Layout>
                <h3>Requests</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary> Add Request </Button>
                    </a>
                </Link>
            </Layout>
        );
    }
}

export default RequestIndex;