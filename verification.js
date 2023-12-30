// verification.js

// Importing required modules
const web3 = require('./blockchain');
const config = require('./config');
const CONTRACT_ABI = require('./contract_abi.json');

// Define the smart contract address
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

// Create a new contract instance
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

// Define the verification function
async function verifyPayment(transactionHash) {
  // Get the transaction receipt
  const receipt = await web3.eth.getTransactionReceipt(transactionHash);

  // Check if the transaction was successful
  if (receipt.status) {
    // Get the transaction
    const transaction = await web3.eth.getTransaction(transactionHash);

    // Check if the transaction was sent to the correct contract
    if (transaction.to.toLowerCase() === CONTRACT_ADDRESS.toLowerCase()) {
      // Decode the contract method
      const method = web3.eth.abi.decodeMethod({
        data: transaction.input
      });

      // Check if the correct method was called
      if (method.name === 'receivePayment') {
        // The payment is verified
        return true;
      }
    }
  }

  // The payment is not verified
  return false;
}

// Export the verification function
module.exports = verifyPayment;
