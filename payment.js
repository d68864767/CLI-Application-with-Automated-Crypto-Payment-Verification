// payment.js

// Importing required modules
const web3 = require('./blockchain');
const config = require('./config');

// Define the smart contract address and ABI
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const CONTRACT_ABI = require('./contract_abi.json');

// Create a new contract instance
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

// Define the payment function
async function makePayment(fromAddress, amount) {
  // Convert the amount to Wei
  const amountInWei = web3.utils.toWei(amount.toString(), 'ether');

  // Create a transaction object
  const txObject = {
    from: fromAddress,
    to: CONTRACT_ADDRESS,
    value: amountInWei,
    gas: 21000,
    data: contract.methods.receivePayment().encodeABI()
  };

  // Sign the transaction
  const signedTx = await web3.eth.accounts.signTransaction(txObject, config.PRIVATE_KEY);

  // Send the transaction and get the transaction receipt
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  // Return the transaction receipt
  return receipt;
}

// Export the payment function
module.exports = makePayment;
