import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x930Ac4F5C1EbFA4C5dc97DAC3e05Ca2412D0C3a1'
);

export default instance;

