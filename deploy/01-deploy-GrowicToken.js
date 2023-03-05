const { network, ethers } = require("hardhat");
const { verify } = require("../utils/verify");

const TOKEN_NAME = "Growic Studyroom Token";
const TOKEN_SYMBOL = "GST";
const TOKEN_SUPPLY = ethers.utils.parseEther("1000000");

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const args = [TOKEN_NAME, TOKEN_SYMBOL, TOKEN_SUPPLY];

  const token = await deploy("GrowicToken", {
    from: deployer,
    args: args,
    log: true,
  });

  if (network.tags.staging && process.env.ETHERSCAN_API_KEY) {
    log("Verifying...");
    await verify(`contracts/GrowicToken.sol:GrowicToken`, token.address, args);
  }
};

module.exports.tags = ["GrowicToken", "all"];
