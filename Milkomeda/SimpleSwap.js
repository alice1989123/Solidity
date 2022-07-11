const { WADA, USDT, milkRouter } = require("./AddressesOfContracts");
const WADAInterface = require("../Interfaces/WETH");
const ethers = require("ethers");
const url = "http://localhost:8545";
const RouterBuild = require("@uniswap/v2-periphery/build/UniswapV2Router02.json");
const provider = new ethers.providers.JsonRpcProvider(url);
const signer0 = provider.getSigner(0, provider);
const ERC20Interface = require("@uniswap/v2-periphery/build/ERC20.json").abi;

const WADAContract = new ethers.Contract(WADA, WADAInterface, signer0);
const USDTContract = new ethers.Contract(USDT, ERC20Interface, signer0);

const main = async () => {
  const signerAddress = await signer0.getAddress();

  const USDTbalanceInitial = await USDTContract.balanceOf(signerAddress);
  console.log("USDT balance before Swap ", USDTbalanceInitial.toNumber());
  const blockNumber = await provider.getBlockNumber();
  const { timestamp } = await provider.getBlock(blockNumber);
  //console.log(timestamp);
  //console.log(signerAddress);

  const balance = await WADAContract.functions.balanceOf(signerAddress);
  console.log(ethers.utils.formatEther(balance[0]));
  const Router = new ethers.Contract(milkRouter, RouterBuild.abi, signer0);
  const simpleSwap = await Router.swapExactETHForTokens(
    1,
    [WADA, USDT],
    signerAddress,
    timestamp + 2000,
    { value: ethers.utils.parseEther("100.0") }
  );
  const USDTbalance = await USDTContract.balanceOf(signerAddress);
  console.log("USDT balanceafter Swap ", USDTbalance.toNumber());
};

main();
