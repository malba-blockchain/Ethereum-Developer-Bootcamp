class Transaction {
    constructor(inputUTXOs, outputUTXOs) {
        this.inputUTXOs = inputUTXOs;
        this.outputUTXOs = outputUTXOs;
        this.fee = 0;
    }

    execute() {

        //Check that any UTXOs not been spent
        for (let i = 0; i < this.inputUTXOs.length; i++)
        {
            if (this.inputUTXOs[i].spent==true)
                throw Error ("Already spent UTXO");
        }

        //Check sufficient input
        let valueInputUTXOs = 0;
        let valueOutputUTXOs = 0;

        for (let i = 0; i < this.inputUTXOs.length; i++)
        {
            valueInputUTXOs += this.inputUTXOs[i].amount;
        }

        for (let i = 0; i < this.outputUTXOs.length; i++)
        {
            valueOutputUTXOs += this.outputUTXOs[i].amount;
        }

        if (valueInputUTXOs<valueOutputUTXOs)
                throw Error ("Not sufficient input OTXOs");

        //Mark inputs as spent
        for (let i = 0; i < this.inputUTXOs.length; i++) {
            this.inputUTXOs[i].spent = true;
        }

        //Calculate the fee
        this.fee = valueInputUTXOs - valueOutputUTXOs;

    }
}

module.exports = Transaction;