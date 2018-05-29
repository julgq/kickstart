const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

/* Se requiere el archivo compilado del contrato CampaignFactory */
const compiledFactory = require('../ethereum/build/CampaignFactory.json');

/* Se requiere el archivo compilado del contrato Campaign */
const compiledCampaign = require('../ethereum/build/Campaign.json');

/* Cuentas de Wallet de las que se usaran para el test */
let accounts;

/* Se usara para el deploy del contrato CampaignFactory en compiledFactory */
let factory;

/* Se usara para guardar las direcciones de los contratos hechos deploy de Campaign() */
let campaignAddress;

/* Se guardara el ABI del contrato que se usara para la prueba */
let campaign;

beforeEach(async () => {
    /* Obtención de las cuentas de web3 */
    accounts = await web3.eth.getAccounts();

    /* Se hace el deploy del contrato compiledFactory, con un gas de 1000000, y usando la cuenta 0 de web3 */
    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '1000000' });

    /* Se ejecuta la funcion createCampaign que finalmente llama al segundo contrato Campaign(), y crea una campaña */
    await factory.methods.createCampaign('100').send({
        from: accounts[0],
        gas: '1000000'
    });

    /* Utilizar el corchete de esta forma, significa que el elemento 0 de  campaignAddress se remplaza por lo que se esta asignando */
    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

    /* Se localiza la direccion de la camapaña que se usara para el contrato */
    campaign = await new web3.eth.Contract(
        JSON.parse(compiledCampaign.interface),
        campaignAddress
    );
});

describe('Campaigns', () => {

    /* Se hace una prueba de que se genera correctamente un deploy de factory and campaign */
    it('deploys a factory and a campaign', () => {
        //console.log(factory.options.address);
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    /* Se hace la prueba que la direccion del manager de la campaña es la misma que la accounts[0] */
    it('marks caller as the campaign manager', async () => {
        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0], manager);
    });


    it('allows people to contribute money and marks them as approvers', async () => {

        /* El account[1] envia 200 eth y se registra su contribución */
        await campaign.methods.contribute().send({
            value: '200',
            from: accounts[1]
        });

        /* Se llama al mapping approvers, el return es un valor boolean, si es true pasa la prueba, por que esta dentro de los contribuidores */
        const isContributor = await campaign.methods.approvers(accounts[1]).call();
        assert(isContributor);

    });

    /* Validar la minima contribucion */
    it('requires a minimum contribution', async () => {
        try {
            await campaign.methods.contribute().send({
                value: '5',
                from: accounts[1]
            });
            assert(false);

        } catch (err) {

        }
    });

    it('allows a manager to make a payment request', async () => {

        await campaign.methods
        .createRequest('Buy batteriest', '100', accounts[0])
        .send({
            from: accounts[0],
            gas: '1000000'
        });

        const request = await campaign.methods.requests(0).call()

        assert.equal('Buy batteriest', request.description);


    });






});