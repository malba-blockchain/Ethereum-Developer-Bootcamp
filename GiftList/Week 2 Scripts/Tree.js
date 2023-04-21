class Tree {
    constructor() {
        this.root = null;
    }

    addNode(node) {
        if(this.root == null) //If there is no root, make it become the root
            this.root = node;
        else 
            this.newFunction(this.root,node);
    }

    newFunction(parent,child) {
        if (parent.data > child.data) {
            if(parent.left!=null)
                this.newFunction(parent.left, child);
            if(parent.left==null)
                parent.left = child;
        }
        else if (parent.data < child.data) {
            if(parent.right!=null)
                this.newFunction(parent.right, child);
            if(parent.right==null)
                parent.right = child;
        }
    }

    hasNode(number) {
        let tempNode = this.root;
        
        console.log(tempNode);
        while(tempNode != null)
        {
            if(tempNode.data == number)
            {
                return true;
            }
            else {
                if(tempNode.left!=null)
                    if(tempNode.left.data==number)
                        return true;
                    
                if(tempNode.right!=null) 
                    if(tempNode.right.data==number)
                        return true;

                if(tempNode.left!=null)
                    if(tempNode.left.data<number ) {
                        tempNode = tempNode.left;
                        continue;
                    }

                if(tempNode.right!=null) 
                    if (tempNode.right.data > number) {
                        tempNode = tempNode.right;
                        continue;
                    }

                return false;
            }
        }

        return false;
    }
}

module.exports = Tree;