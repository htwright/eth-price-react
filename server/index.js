const path = require('path');
const express = require('express');
const Web3 = require('web3');
const app = express();

// API endpoints go here!
let web3;
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

app.get('/api/hello', (req, res) => {
  let test = web3.eth.getBalance('0xC257274276a4E539741Ca11b590B9447B26A8051')
  console.log(test.toString(10))
  res.status(200).json(web3.eth.getBalance('0x9aF830259c46900A84b9F7E99fB7DA4FCe034bA3'))
});

app.get('/api/balance/:wallet', (req, res) => {
// web3.eth.getBalance(req.params.wallet).then(data => res.status(200).json(data)).catch(err => console.error(err));
res.status(200).json(web3.eth.getBalance(req.params.wallet, (error, result) => {if(!error){console.log(result.toString(10), web3.eth.getBlock('latest'));}else{console.error(error);}}))
// .catch(err => console.error(err));
});

app.get('/api/transactions', (req, res) => {
  let currentBlock = web3.eth.getBlock('latest');
  console.log(currentBlock);
  res.json(web3.eth.getBlockTransactionCount(currentBlock.hash))
});

app.get('/api/syncing', (req, res) => {
  console.log(web3.eth.isSyncing((error, result) => {if(!error){console.log(result);}else{console.error(error);}}))
  
  
});

// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));



// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
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
