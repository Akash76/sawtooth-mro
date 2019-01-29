const { TransactionProcessor } = require('sawtooth-sdk/processor')
const MROHandler = require('./handle.js')

// Initialize Transaction Processor
const tp = new TransactionProcessor("tcp://localhost:4004")
tp.addHandler(new MROHandler())
tp.start()

console.log(`Starting bank transaction processor`)
console.log(`Connecting to Sawtooth validator at tcp://localhost:4004`)
