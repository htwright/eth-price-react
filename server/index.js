const path = require('path');
const express = require('express');
const Web3 = require('web3');
const app = express();

let web3 = undefined;
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

app.get('/api/hello', (req, res) => {
  let test = web3.eth.getBalance('0x72711c31A72E61D6cDf17A7E881cCc5561c228A7')
  console.log(test.toString(10))
  res.status(200).json(web3.eth.getBalance('0x72711c31A72E61D6cDf17A7E881cCc5561c228A7'))
});

app.get('/api/balance/:wallet', (req, res) => {
let balance = web3.eth.getBalance(req.params.wallet)
res.json(web3.fromWei(balance));
});

app.get('/api/transactions', (req, res) => {
  let currentBlock = web3.eth.getBlock('latest');
  console.log(currentBlock);
  res.json(web3.eth.getBlockTransactionCount(currentBlock.hash))
});

app.get('/api/syncing', (req, res) => {
  let obj = web3.eth.isSyncing((error, result) => {
    if(!error){
      return result;
    }else{
      console.error(error);
    }
  });
  if(obj){
    res.json(obj.lastSyncState);
  }
});

app.get('/api/network', (req, res) => {
  if(web3.version.network !== '1'){
    res.json('connected to testnet');
  } else {
    res.json('connected to main net');
  }
});

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get(/^(?!\/api(\/|$))/, (req, res) => {
    const index = path.resolve(__dirname, '../client/build', 'index.html');
    res.sendFile(index);
});

let server;
function runServer(port=3001) {
    return new Promise((resolve, reject) => {
        server = app.listen(port, () => {
            resolve();
        }).on('error', reject);
    });
}

function closeServer() {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

if (require.main === module) {
    runServer();
}

module.exports = {
    app, runServer, closeServer
};
