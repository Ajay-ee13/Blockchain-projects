const Block = require('./block');
const cryptoHash = require('./crypto-hash');


class BlockChain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock({ data }) {
        const newBlock = Block.mineBlock({
            previousBlock: this.chain[this.chain.length - 1],
            data,
        });
        this.chain.push(newBlock);
    }

    static isValidChain(chain) {
        if (JSON.stringify(chain[0]) !== JASON.stringify(Block.genesis()))
            return false;

        for (let i = 1; i < chain.length; i++) {
            const { timestamp, previousHash, hash, data, nonce, difficulty } = chain[i];
            const lastDifficulty = chain[i - 1].difficulty;
            const realLastHash = chain[i - 1].hash;

            if (previousHash !== realLastHash)
                return false;

            const validatedHash = cryptoHash(
                timestamp,
                previousHash,
                data,
                nonce,
                difficulty
            );

            if (hash !== validatedHash)
                return false;
            
            if (Math.abs(lastDifficulty - difficulty) > 1) return false;
        }

        return true;
    }

    replaceChain(chain) {
        if (chain <= this.chain.length) {
            console.error("The incoming chain is not longer than current chain")
            return;
        }

        if (!BlockChain.isValidChain(chain)) {
            console.error("The incoming chain is not valid")
            return;
        }

        this.chain = chain;
    }



}


const newBlockChain = new BlockChain();
newBlockChain.addBlock({data:"hello World"});
console.log(newBlockChain);


module.exports = BlockChain;