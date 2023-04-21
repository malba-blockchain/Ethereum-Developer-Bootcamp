const express = require('express');
const verifyProof = require('../utils/verifyProof');
const MerkleTree = require('../utils/MerkleTree');
const niceList = require('../utils/niceList');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
const merkleTree = new MerkleTree(niceList);
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = 'ddd59a2ffccddd60ff47993312821cd57cf30f7f14fb82937ebe2c4dc78375aa';

app.post('/gift', (req, res) => {
  // TODO: grab the name parameter from the front-end here
  
  console.log("[LOG] Root of the merkle tree: "+ MERKLE_ROOT);
  const name = req.body.data;
  console.log("[LOG] Name to be verified: "+ name);
  const index = niceList.findIndex(n => n === name);
  console.log("[LOG] Index of that name: "+ index);
  const proof = merkleTree.getProof(index);
  console.log("[LOG] Proof of that index: "+ proof);

  // TODO: prove that a name is in the list 
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);

  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
