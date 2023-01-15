const hexToBinary = require('hex-to-binary');
const { GENESIS_DATA, MINING_RATE } = require('./config');
const cryptoHash = require('./crypto-hash');



class Block {
    constructor({ timestamp, previousHash, hash, data, nonce, difficulty }) {
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    static genesis() {
        return new Block(GENESIS_DATA);
    }

    static mineBlock({ previousBlock, data }) {
        let hash, timestamp;
        const previousHash = previousBlock.hash;
        let { difficulty } = previousBlock;

        let nonce = 0;
        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty({
                originalBlock: previousBlock,
                timestamp,
            })
            hash = cryptoHash(timestamp, previousHash, hash, data, nonce, difficulty);
        } while (hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty));

        return new Block({
            timestamp,
            previousHash,
            hash: cryptoHash(timestamp, previousHash, data, nonce, difficulty),
            data,
            nonce,
            difficulty,
        })
    }

    static adjustDifficulty({ originalBlock, timestamp }) {
        const { difficulty } = originalBlock;
        if (difficulty < 1) return 1;
        const difference = timestamp - originalBlock.timestamp;

        if (difference > MINING_RATE) return difficulty - 1;
        return difficulty + 1;
    }
}

// const block1 = new Block({
//     timestamp: "14/01/23", 
//     previousHash: "0xacb",
//     hash: "123", 
//     data: "hdbjfb",
//     nonce: 0,
//     difficulty:2,
// });

// const result = Block.mineBlock({
//     previousBlock:block1,
//     data:"hello",
// })

// console.log(result);

module.exports = Block;