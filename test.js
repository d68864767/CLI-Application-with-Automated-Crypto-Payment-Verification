// test.js

// Importing required modules
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const makePayment = require('./payment');
const verifyPayment = require('./verification');
const config = require('./config');

// Define the test accounts
let accounts;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
});

describe('Crypto Payment Verification', () => {
  it('makes a payment and verifies it', async () => {
    // Make a payment
    const receipt = await makePayment(accounts[0], 1);

    // Verify the payment
    const isVerified = await verifyPayment(receipt.transactionHash);

    // Check the verification result
    assert(isVerified);
  });

  it('fails to verify an invalid payment', async () => {
    // Try to verify an invalid payment
    const isVerified = await verifyPayment('0x123');

    // Check the verification result
    assert(!isVerified);
  });
});

describe('Error Handling', () => {
  it('throws an error when making a payment without sufficient funds', async () => {
    try {
      // Try to make a payment without sufficient funds
      await makePayment(accounts[0], 1000000);

      // Fail the test if no error was thrown
      assert(false);
    } catch (err) {
      // Check the error message
      assert(err.message.includes('insufficient funds'));
    }
  });

  it('throws an error when verifying a non-existent transaction', async () => {
    try {
      // Try to verify a non-existent transaction
      await verifyPayment('0x123');

      // Fail the test if no error was thrown
      assert(false);
    } catch (err) {
      // Check the error message
      assert(err.message.includes('not found'));
    }
  });
});
