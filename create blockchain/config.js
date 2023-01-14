const INITIAL_DIFFICULTY = 2;

const GENESIS_DATA = {
    timestamp: 1,
    previousHash: "0x000",
    hash: "0x123",
    data: "Block-0",
    nonce: 0,
    difficulty: INITIAL_DIFFICULTY,
}

module.exports = { GENESIS_DATA };