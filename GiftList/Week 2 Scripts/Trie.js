// Importing the TrieNode class from the TrieNode.js file
const TrieNode = require('./TrieNode');

// Defining the Trie class
class Trie {

    // The constructor function is called when creating a new instance of the Trie class
    constructor() {

        // Setting the root node of the trie to a new instance of the TrieNode class with a null key
        this.root = new TrieNode(null);
    }

    // The insert function adds a new word to the trie
    insert(word) {

        // Setting the temporary node to the root of the trie
        let tempNode = this.root;

        // Looping through each letter in the word
        for (let i = 0; i < word.length; i++) {

            // Storing the current letter in a variable
            const currentLetter = word[i];

            //If and only if the children node doesnt exists
            if(!tempNode.children[currentLetter]){
                 // Creating a new TrieNode for the current letter and adding it as a child of the temporary node
                tempNode.children[currentLetter] = new TrieNode(currentLetter);
            }
            
            // Updating the temporary node to be the child node that was just created
            tempNode = tempNode.children[currentLetter];

            // If this is the last letter of the word, set the isWord property of the node to true
            if (i === word.length - 1) {
                tempNode.isWord = true;
            }
        }
    }

    contains(word) {

        let tempNode = this.root;
        // Looping through each letter in the word
        
        for (let i = 0; i < word.length; i++) {
            
            let currentLetter = word[i];

            //Check the logic for moving forward
            if(tempNode.children[currentLetter]) {

                tempNode = tempNode.children[currentLetter];
                
            }
            else {
                return false;
            }
        }
        return tempNode.isWord;
    }
} 

// Exporting the Trie class so it can be used in other files
module.exports = Trie;