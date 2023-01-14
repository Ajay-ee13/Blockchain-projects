
const {GENESIS_DATA} = require('./config');
const cryptoHash = require('./crypto-hash')
class Block{
    constructor({timestamp, previousHash, hash, data}){
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.hash = hash;
        this.data = data;
    }

    static genesis(){
        return new this(GENESIS_DATA);
    }

    static mineBlock({previousBlock, data}){
        const timestamp = Date.now();
        const previousHash = previousBlock.hash;
        return new this({
            timestamp,
            previousHash,
            data,
            hash:cryptoHash(timestamp, previousHash, data),
        })
    }
}

const block1 = new Block({
    timestamp: "14/01/23", 
    previousHash: "0xacb",
    hash: "123", 
    data: "hdbjfb",
});

const result = Block.mineBlock({
    previousBlock:block1,
    data:"hello",
})

console.log(result);