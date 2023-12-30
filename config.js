// config.js

// Importing required modules
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load .env file
dotenv.config();

// Define the path to the Ethereum wallet private key
const PRIVATE_KEY_PATH = path.join(__dirname, '.private_key');

// Check if the private key file exists
if (!fs.existsSync(PRIVATE_KEY_PATH)) {
  console.error('Private key file not found. Please create a .private_key file in the project root.');
  process.exit(1);
}

// Read the private key
const PRIVATE_KEY = fs.readFileSync(PRIVATE_KEY_PATH, 'utf-8').trim();

// Check if the OpenAI API key is set
if (!process.env.OPENAI_API_KEY) {
  console.error('OpenAI API key not found. Please set the OPENAI_API_KEY environment variable.');
  process.exit(1);
}

// Export the configuration
module.exports = {
  PRIVATE_KEY,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  ETHEREUM_NETWORK: process.env.ETHEREUM_NETWORK || 'mainnet',
  INFURA_PROJECT_ID: process.env.INFURA_PROJECT_ID,
};
