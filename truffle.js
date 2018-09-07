/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() {
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>')
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */
const HDWalletProvider = require('truffle-hdwallet-provider');

const mnemonic = 'gesture rather obey video awake genuine patient base soon parrot upset lounge';

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      provider: new HDWalletProvider(mnemonic, 'http://localhost:8545', 0, 10),
      host: '127.0.0.1',
      port: 8545,
      network_id: 5777,
      gas: 6721975,
      gasPrice: 20000000000,
      confirmations: 0,
      timeoutBlocks: 50,
      skipDryRun: true,
    },
    kovan: {
      host: 'https://kovan.infura.io',
      port: 8545,
      network_id: 42,
      confirmations: 0,
      timeoutBlocks: 500,
      skipDryRun: false,
    },
    rinkeby: {
      provider: new HDWalletProvider(mnemonic, 'http://localhost:8545', 0, 10),
      host: '127.0.0.1',
      port: 8545,
      network_id: 4,
      gas: 6900000,
      gasPrice: 25000000000,
      confirmations: 1,
      timeoutBlocks: 500,
      skipDryRun: true,
    },
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, 'https://ropsten.infura.io'),
      host: 'https://ropsten.infura.io',
      port: 80,
      network_id: 3,
      gas: 6900000,
      gasPrice: 20000000000,
      confirmations: 0,
      timeoutBlocks: 500,
      skipDryRun: false,
    },
    mainnet: {
      provider: () => new HDWalletProvider(mnemonic, 'https://mainnet.infura.io'),
      host: 'https://mainnet.infura.io',
      port: 8545,
      network_id: 1,
      gas: 6900000,
      gasPrice: 20000000000,
      confirmations: 0,
      timeoutBlocks: 500,
      skipDryRun: false,
    },
    compilers: {
      solc: {
        version: 'native',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
          evmVersion: 'byzantium',
        },
      },
    },
  },
};
