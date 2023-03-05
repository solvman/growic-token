const { run } = require("hardhat");

const verify = async function (sourceName, contractAddress, args) {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", { contract: sourceName, address: contractAddress, constructorArguments: args });
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!");
    } else {
      console.log(error);
    }
  }
};

module.exports = { verify };
