import React, { Component } from 'react';
import factory from '../ethereum/factory';


class CampaignIndex  extends Component {

    state = {
        campaigns: ''
    }

    async componentDidMount() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        console.log(campaigns);
        this.setState({ campaigns:campaigns});
    }

    render() {
        return <div>{this.state.campaigns}</div>
    }
}

export default CampaignIndex;