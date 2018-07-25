let SHA256 = require('crypto-js/sha256');
class Block {
    constructor(index, previousHash = '', data, timestamp) {
        this.index = index;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data));
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, '0', 'Genesis Block', Date.now());
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(block){
        block.previousHash = this.getLatestBlock().hash;
        block.hash = block.calculateHash();
        this.chain.push(block);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash != currentBlock.calculateHash()){
                return false
            }if(currentBlock.hash != previousBlock.hash){
                return false
            }
        }
        return true;
    }
}

let block = new Block(1, '', { 'randomData': '12345' });
let firstChain = new Blockchain();
//console.log(block.date);
firstChain.isChainValid();