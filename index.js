const express = require('express');
const { swapTokens } = require('./swap');
const { connectWallet } = require('./wallet');
const { tradeTokens, stakeTokens } = require('./trading');
require('dotenv').config();

const app = express();
const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  console.log('GET / request received');
  res.status(200).send('Hello World\n');
});

app.post('/swap', async (req, res) => {
  console.log('POST /swap request received');
  const { fromToken, toToken, amount } = req.body;
  try {
    const result = await swapTokens(fromToken, toToken, amount);
    console.log('Swap successful:', result);
    res.status(200).send(result);
  } catch (error) {
    console.error('Swap failed:', error);
    res.status(500).send(error.message);
  }
});

app.post('/connect-wallet', async (req, res) => {
  console.log('POST /connect-wallet request received');
  const { walletType } = req.body;
  try {
    const result = await connectWallet(walletType);
    console.log('Wallet connected:', result);
    res.status(200).send(result);
  } catch (error) {
    console.error('Wallet connection failed:', error);
    res.status(500).send(error.message);
  }
});

app.post('/trade', async (req, res) => {
  console.log('POST /trade request received');
  const { token, amount } = req.body;
  try {
    const result = await tradeTokens(token, amount);
    console.log('Trade successful:', result);
    res.status(200).send(result);
  } catch (error) {
    console.error('Trade failed:', error);
    res.status(500).send(error.message);
  }
});

app.post('/stake', async (req, res) => {
  console.log('POST /stake request received');
  const { token, amount } = req.body;
  try {
    const result = await stakeTokens(token, amount);
    console.log('Staking successful:', result);
    res.status(200).send(result);
  } catch (error) {
    console.error('Staking failed:', error);
    res.status(500).send(error.message);
  }
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});