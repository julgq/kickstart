import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x2868C2C75fFcD3d7D030D10260e55D063D739c24'
);

export default instance;

