/* global artifacts */
/* eslint-disable no-unused-vars, no-eval */
const fs = require('fs');

const Network = artifacts.require('./KyberNetwork.sol');
const LiquidityConversionRates = artifacts.require('./LiquidityConversionRates.sol');
const SanityRates = artifacts.require('./SanityRates.sol');
const AutomatedReserve = artifacts.require('./KyberAutomatedReserve.sol');

const MANA = artifacts.require('./mockTokens/Mana.sol');

function tx(result, call) {
  const logs = (result.logs.length > 0) ? result.logs[0] : { address: null, event: null };

  console.log();
  console.log(`   Calling ${call}`);
  console.log('   ------------------------');
  console.log(`   > transaction hash: ${result.tx}`);
  console.log(`   > contract address: ${logs.address}`);
  console.log(`   > gas used: ${result.receipt.gasUsed}`);
  console.log(`   > event: ${logs.event}`);
  console.log();
}

module.exports = async (deployer, network, accounts) => {
  const reserveWallet = accounts[5];

  // Set the instances
  const NetworkInstance = await Network.at(Network.address);
  const AutomatedReserveInstance = await AutomatedReserve.at(AutomatedReserve.address);

  // Set the reserve contract addresses
  tx(
    await AutomatedReserveInstance.setContracts(
      Network.address,
      LiquidityConversionRates.address,
      0,
    ),
    'setContracts()',
  );

  // Add reserve to network
  tx(await NetworkInstance.addReserve(AutomatedReserve.address, true), 'addReserve()');

  // Add the withdrawal address for each token
  tx(
    await AutomatedReserveInstance.approveWithdrawAddress(MANA.address, reserveWallet, true),
    'approveWithdrawAddress()',
  );

  // List token pairs for the reserve
  tx(
    await NetworkInstance.listPairForReserve(
      AutomatedReserveInstance.address,
      MANA.address,
      true,
      true,
      true,
    ),
    'listPairForReserve()',
  );
};
