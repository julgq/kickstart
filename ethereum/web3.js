import Web3 from 'web3';

/* window.web3.currentProvider es el web3 usado por Metamask instalado en nuestro Navegador */
const web3 = new Web3(window.web3.currentProvider);

export default web3;