// Importing required packages
const { keccak256 } = require('ethereum-cryptography/keccak');
const { bytesToHex } = require('ethereum-cryptography/utils');

// MerkleTree class definition
class MerkleTree {
  // Constructor function to initialize the class instance
  constructor(leaves) {
    // Convert each leaf node to a buffer and compute the keccak256 hash for each buffer
    this.leaves = leaves.map(Buffer.from).map(keccak256);
    // Define a concat function that will be used to compute the hash of the parent node
    this.concat = (left, right) => keccak256(Buffer.concat([left, right]));
  }

  // Public function to get the root of the Merkle tree
  getRoot() {
    // Return the root of the Merkle tree as a hex string
    return bytesToHex(this._getRoot(this.leaves));
  }

  // Public function to get a proof for a specific leaf node in the Merkle tree
  getProof(index, layer = this.leaves, proof = []) {
    // If the current layer contains only one node, return the proof
    if (layer.length === 1) {
      return proof;
    }

    // Initialize a new layer
    const newLayer = [];

    // Iterate over the current layer by pairs
    for (let i = 0; i < layer.length; i += 2) {
      const left = layer[i];
      const right = layer[i + 1];

      // If there is no right node, push the left node to the new layer
      if (!right) {
        newLayer.push(left);
      } else {
        // If there is a right node, compute the hash of the parent node and push it to the new layer
        newLayer.push(this.concat(left, right));

        // If the current pair contains the requested index, add the sibling node to the proof
        if (i === index || i === index - 1) {
          let isLeft = !(index % 2);
          proof.push({
            data: isLeft ? bytesToHex(right) : bytesToHex(left),
            left: !isLeft,
          });
        }
      }
    }

    // Recursively call the getProof function with the new layer and updated proof
    return this.getProof(Math.floor(index / 2), newLayer, proof);
  }

  // Private function to recursively compute the root of the Merkle tree
  _getRoot(leaves = this.leaves) {
    // If the current layer contains only one node, return the node as the root
    if (leaves.length === 1) {
      return leaves[0];
    }

    // Initialize a new layer
    const layer = [];

    // Iterate over the current layer by pairs
    for (let i = 0; i < leaves.length; i += 2) {
      const left = leaves[i];
      const right = leaves[i + 1];

      // If there is a right node, compute the hash of the parent node and push it to the new layer
      if (right) {
        layer.push(this.concat(left, right));
      } else {
        // If there is no right node, push the left node to the new layer
        layer.push(left);
      }
    }

    // Recursively call the _getRoot function with the new layer
    return this._getRoot(layer);
  }
}

// Export the MerkleTree class
module.exports = MerkleTree;
