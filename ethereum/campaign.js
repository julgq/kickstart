import web3 from './web3';
import Campaign from './build/Campaign.json';

/* Creamos una funcion que retorna el contrato con la address insertada */
export default address => {
    return new web3.eth.Contract(JSON.parse(Campaign.interface),address);
};
