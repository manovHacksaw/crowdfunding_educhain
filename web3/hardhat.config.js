require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();  

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {},
    opencampus: {
      url: `https://rpc.open-campus-codex.gelato.digital/`,
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  }
};
