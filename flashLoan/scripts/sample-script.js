// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const ethers = require("ethers");
async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");

  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

/* const test = async () => {
  const UNISWAPV2_ROUTER02_ADDRESS =
    "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  const UNISWAPV2_ROUTER02_ABI = [
    {
      inputs: [
        { internalType: "uint256", name: "amountIn", type: "uint256" },
        { internalType: "address[]", name: "path", type: "address[]" },
      ],
      name: "getAmountsOut",
      outputs: [
        { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  const DAI_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f";
  const WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

  const uniswap = new ethers.Contract(
    UNISWAPV2_ROUTER02_ADDRESS,
    UNISWAPV2_ROUTER02_ABI,
    ethers.provider
  );

  let amountEthFromContract = await uniswap.getAmountsOut(
    1, // 1 ETH
    [WETH_ADDRESS, DAI_ADDRESS]
  );

  console.log(`1 Eth = ${amountEthFromContract[1].toString()} USD`);
};

test(); */
