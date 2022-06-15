const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  'bag tattoo enter exhibit cannon pact trend judge income auto permit pulse',
    'https://rinkeby.infura.io/v3/e0d2dec799f4459aa51900263ccad916'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] });
  
  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();
