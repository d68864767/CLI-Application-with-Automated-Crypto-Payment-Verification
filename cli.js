// cli.js

// Importing required modules
const yargs = require('yargs');
const makePayment = require('./payment');
const verifyPayment = require('./verification');

// Define the command for making a payment
yargs.command({
  command: 'pay',
  describe: 'Make a payment',
  builder: {
    from: {
      describe: 'Address to send from',
      demandOption: true,
      type: 'string'
    },
    amount: {
      describe: 'Amount to send',
      demandOption: true,
      type: 'number'
    }
  },
  handler: async function(argv) {
    try {
      // Make the payment
      const receipt = await makePayment(argv.from, argv.amount);

      // Log the transaction receipt
      console.log('Payment successful. Transaction receipt:', receipt);
    } catch (error) {
      // Log the error
      console.error('Error making payment:', error);
    }
  }
});

// Define the command for verifying a payment
yargs.command({
  command: 'verify',
  describe: 'Verify a payment',
  builder: {
    hash: {
      describe: 'Transaction hash',
      demandOption: true,
      type: 'string'
    }
  },
  handler: async function(argv) {
    try {
      // Verify the payment
      const isVerified = await verifyPayment(argv.hash);

      // Log the verification result
      if (isVerified) {
        console.log('Payment verified.');
      } else {
        console.log('Payment not verified.');
      }
    } catch (error) {
      // Log the error
      console.error('Error verifying payment:', error);
    }
  }
});

// Parse the command line arguments
yargs.parse();
