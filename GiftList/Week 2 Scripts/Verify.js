function verifyProof(proof, node, root, concat) {
    
    let tempProof = node;

    for(let i =0; i<proof.length; i++)
    {
        if(proof[i].left == true)
            tempProof = concat(proof[i].data, tempProof);
        else
            tempProof = concat(tempProof, proof[i].data);
    }

    if(tempProof===root)
        return true;
    else
        return false;

}

module.exports = verifyProof;
