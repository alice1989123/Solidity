// ganache command : ganache-cli --fork  $KEY --networkId 999

//put the following mpdule.exports in your hardhart.config
module.exports = {
  solidity: "0.8.4",

  networks: {
    ganache: {
      url: "http://127.0.0.1:8545",
      chainId: 1337,
      accounts: [],
    },
  },
};

const ethers = require("ethers");
const url = "http://localhost:8545";
const provider = new ethers.providers.JsonRpcProvider(url);
const signer0 = provider.getSigner(0, provider);
const receiver = "0x9282396A80076D8f5a2FC3744b510D99BB524b1b";

const testing_send_ether = async () => {
  const address = await signer0.getAddress();
  const params = [
    {
      from: address,
      to: receiver,
      value: ethers.utils.parseUnits("1", "ether").toHexString(),
    },
  ];

  const hash = await provider.send("eth_sendTransaction", params);
  console.log(hash);

  /* signer0
      .getBalance((blockTag = "latest"))
      .then((r) => console.log(ethers.utils.formatEther(r))); */
};

testing_send_ether();
