// blockchain.js

// Importing required modules
const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const config = require('./config');

// Setup Ethereum network provider
let provider;
if (config.ETHEREUM_NETWORK === 'mainnet') {
  provider = new HDWalletProvider({
    privateKeys: [config.PRIVATE_KEY],
    providerOrUrl: `https://mainnet.infura.io/v3/${config.INFURA_PROJECT_ID}`
  });
} else {
  provider = new HDWalletProvider({
    privateKeys: [config.PRIVATE_KEY],
    providerOrUrl: `https://rinkeby.infura.io/v3/${config.INFURA_PROJECT_ID}`
  });
}

// Create a new instance of web3
const web3 = new Web3(provider);

// Export the web3 instance
module.exports = web3;
