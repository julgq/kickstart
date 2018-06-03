import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import factory from '../ethereum/factory';


class CampaignIndex  extends Component {
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
        return <div>
           <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css" />
        {this.renderCampaigns()}
        </div>
    }
}

export default CampaignIndex;

