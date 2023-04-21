class TrieNode {
    constructor(key) {
        this.key = key; // letter stored as a string
        this.children = {}; // object, containing the children element
        this.isWord = false; // whether or not the node finishes a word
    }
}

module.exports = TrieNode;