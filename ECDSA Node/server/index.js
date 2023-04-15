const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "04365f5fd443d36fba1699ad86c890175534abdde0e20a9af81db2f24ed558238789ecce2cd6f68080fed2c282750b1ec764254324471bf6773ce9b4b424c58936": 100,
  "04fc1700d004f8bad0e32a685473297cbd0b5d902d99a18dfd715188f50aa4923dce4ba3956330ac4afb137da17189a2675fd64fad4f8d31a805a18a92cbd3c517": 50,
  "04b81b6146bb01db2582570cb8895b793105de3316391eae64765fdca0544609ca599b5809e4ead343b03012844bdc9dfcd8f5bb4a042d7814e1ace2ff5b4cb026": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {

  //TODO: Get a signature from the client side application
  
  //TODO: Recover the public address from the signature

  //The public address recovered is now the sender, it can not be setted by any user

  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);
  
  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
