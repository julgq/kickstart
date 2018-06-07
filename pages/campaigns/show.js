import React, { Component } from 'react';
import Layout from '../../components/layout';
import Campaign from '../../ethereum/campaign';

class CampaignShow extends Component {
    /* Obtenemos el address desde la url */
    static async getInitialProps(props) {
        console.log(props.query.address);
        const campaign = Campaign(props.query.address);

        const summary = await campaign.methods.getSummary().call();
        
        console.log(summary);
       
        return {};
    }

    render() {
        return (
            <Layout>
                <h3>Show Campaing</h3>
            </Layout>

        )
    }
}

export default CampaignShow;