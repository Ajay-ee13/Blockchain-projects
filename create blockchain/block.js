const { GENESIS_DATA } = require('./config');
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
            hash = cryptoHash(timestamp, previousHash, hash, data, nonce, difficulty);
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

        return new Block({
            timestamp,
            previousHash,
            hash: cryptoHash(timestamp, previousHash, data, nonce, difficulty),
            data,
            nonce,
            difficulty,
        })
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