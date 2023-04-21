// Define a class named MerkleTree
class MerkleTree {
    // Constructor function, takes in two arguments: leaves and concat function
    constructor(leaves, concat) {
        // Store leaves and concat function as instance variables
        this.leaves = leaves;
        this.concat = concat;
    }
    // Method to get the Merkle tree root, takes in an optional leaves argument
    getRoot(leaves = this.leaves) {
        // If there is only one leaf, return that leaf as the root
        if (leaves.length === 1) {
            return leaves[0];
        }

        // Create an array to hold the current layer of the tree
        const layer = [];

        // Loop through the leaves two at a time, and concatenate them
        for (let i = 0; i < leaves.length; i += 2) {
            const left = leaves[i];
            const right = leaves[i + 1];
            if(right!=undefined){
                layer.push(this.concat(left, right));
            }
            else {
                layer.push(left);
            }
            
        }

        // Recursively call the getRoot method with the new layer as the leaves
        return this.getRoot(layer);
    }

    
    getProof(index, layer = this.leaves, proof = []) {

        if (layer.length === 1) return proof; //Return once it gets to one single hash

        let newLayer = []; //Create the array for the new layer of hashes

        // Loop through the leaves two at a time, and concatenate them
        for (let i = 0; i < layer.length; i += 2) {
            const left = layer[i];
            const right = layer[i + 1];

            //if the right one leaf doesnt exists only concatenate the left one
            if (right != undefined) {
                newLayer.push(this.concat(left, right));

                if (i === index || i === index - 1) {

                    let isLeft = false;

                    if (index % 2 == 0)
                        isLeft = true;
                    else
                        isLeft = false;


                    if(isLeft==true){
                        proof.push({data: right, left: !isLeft});
                    }
                    else{
                        proof.push({data: left, left: !isLeft});
                    }
                }

            }
            else {
                newLayer.push(left);
            }
        }

        //Go to the next layer

        return this.getProof(Math.floor(index / 2), newLayer, proof);
    }
}
module.exports = MerkleTree;