const { TransactionHandler } = require('sawtooth-sdk/processor/handler');
const { InvalidTransaction } = require('sawtooth-sdk/processor/exceptions');
const cbor = require('cbor');
const MROStore = require('./state');
var { TP_FAMILY, TP_NAMESPACE } = require("./constants");

class MROHandler extends TransactionHandler {
    constructor() {
        super(TP_FAMILY, ['1.0'], [TP_NAMESPACE])
    }
    apply(transactionProcessorRequest, context) {
        let payload = cbor.decode(transactionProcessorRequest.payload);
        let header = transactionProcessorRequest.header;
        let signer = header.signerPublicKey
        let mroState = new MROStore(context)

        if(payload.action === 'enrollAsset') {
            return mroState.enrollAsset(payload.name, payload.cost, signer)
        } else if (payload.action === 'addCert') {
            return mroState.addCert(payload.name, payload.url)
        } else if (payload.action === 'getAsset') {
            return mroState.getAsset(payload.name)
        } else if (payload.action === 'buyAsset') {
            return mroState.buyAsset(payload.name, signer)
        } else {
            throw new InvalidTransaction(
                `${payload.action} not valid. Only enrollAsset, addCert, getAsset, buyAsset are allowed`
            )
        }
    }
}

module.exports = MROHandler;