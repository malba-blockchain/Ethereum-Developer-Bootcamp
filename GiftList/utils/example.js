const MerkleTree = require('./MerkleTree');
const niceList = require('./niceList');
const verifyProof = require('./verifyProof');

// create the merkle tree for the whole nice list
const merkleTree = new MerkleTree(niceList);

// get the root
const root = merkleTree.getRoot();
console.log("[LOG] Root of the merkle tree: "+ root);


// find the proof that norman block is in the list 
const name = 'Norman Block';
console.log("[LOG] Name to be verified: "+ name);
const index = niceList.findIndex(n => n === name);
console.log("[LOG] Index of that name: "+ index);
const proof = merkleTree.getProof(index);
console.log("[LOG] Proof of that index: "+ proof);

// verify proof against the Merkle Root
console.log("[LOG] Proof verification result: " + verifyProof(proof, name, root) ); // true, Norman Block is in the list!
