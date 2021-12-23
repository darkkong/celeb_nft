require("babel-register");
require("babel-polyfill");
require("dotenv").config();
const HDWalletProvider = require("truffle-hdwallet-provider-privkey");
const privateKeys = process.env.PRIVATE_KEYS || "";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
    },
    binanceTestnet: {
      provider: function () {
        return new HDWalletProvider(
          privateKeys.split(","), // Array of account private keys
          `https://data-seed-prebsc-1-s1.binance.org:8545/` // Url to an Ethereum Node
        );
      },
      network_id: 97,
    },
  },
  contracts_directory: "./src/contracts/",
  contracts_build_directory: "./src/abis/",
  compilers: {
    solc: {
      version: "0.5.0",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
