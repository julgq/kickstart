import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/layout';


class CampaignIndex extends Component {
    /* getInitioalProps(), para renderizar desde el servidor Next.js */
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        console.log(campaigns);
        return { campaigns };
    }


    renderCampaigns() {

        /* Usando map https://reactjs.org/docs/lists-and-keys.html */
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: <a>View Campaign</a>,
                fluid: true
            }
        });

        return <Card.Group items={items} />
    }
    render() {
        return (
        <Layout> 
            <div>
                <h3>Open Campaigns</h3>
                <Button
                floated="right"
                content="Create Campaign"
                icon="add circle"
                primary
                />

                {this.renderCampaigns()}
            </div>
        </Layout>
        );
    }
}

export default CampaignIndex;

