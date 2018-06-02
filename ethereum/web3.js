import Web3 from 'web3';

/* window.web3.currentProvider es el web3 usado por Metamask instalado en nuestro Navegador */
//const web3 = new Web3(window.web3.currentProvider);

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined'){
    // Estamos en el navegador y metamask esta corriendo.
    web3 = new Web3(window.web3.currentProvider);

} else {

    // Estamos en el servidor o el usuario no esta corriendo metamask
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/EerNsbQx47r5DNwbngk8'
    );

    web3 = new Web3(provider);

}


export default web3;