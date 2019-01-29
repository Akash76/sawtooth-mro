const cbor = require('cbor');
const {createContext, CryptoFactory} = require('sawtooth-sdk/signing');
const {createHash} = require('crypto');
const {protobuf} = require('sawtooth-sdk');
const request = require('request');
const crypto = require('crypto');

const context = createContext('secp256k1');
const privateKey = context.newRandomPrivateKey();
const signer = new CryptoFactory(context).newSigner(privateKey);
// The signer here can be replaced with the appropriate signer(key) of a user.
// This signer is just to test the application.

// generate the input output address
const FAMILY_NAMESPACE = crypto.createHash('sha512').update('MRO').digest('hex').toLowerCase().substr(0, 6);

function sendRequest(payload){
    const payloadBytes = cbor.encode(payload);

    const transactionHeaderBytes = protobuf.TransactionHeader.encode({
        familyName: 'MRO',
        familyVersion: '1.0',
        inputs: [FAMILY_NAMESPACE],
        outputs: [FAMILY_NAMESPACE],
        signerPublicKey: signer.getPublicKey().asHex(),
        batcherPublicKey: signer.getPublicKey().asHex(),
        dependencies: [],
        payloadSha512: createHash('sha512').update(payloadBytes).digest('hex')
    }).finish();

    const transactionHeaderSignature = signer.sign(transactionHeaderBytes);

    const transaction = protobuf.Transaction.create({
    header: transactionHeaderBytes,
    headerSignature: transactionHeaderSignature,
    payload: payloadBytes
    });

    const transactions = [transaction]

    const batchHeaderBytes = protobuf.BatchHeader.encode({
    signerPublicKey: signer.getPublicKey().asHex(),
    transactionIds: transactions.map((txn) => txn.headerSignature),
    }).finish();

    const batchHeaderSignature = signer.sign(batchHeaderBytes)

    const batch = protobuf.Batch.create({
    header: batchHeaderBytes,
    headerSignature: batchHeaderSignature,
    transactions: transactions
    })

    const batchListBytes = protobuf.BatchList.encode({
    batches: [batch]
    }).finish();

    request.post({
    url: 'http://localhost:8008/batches',
    body: batchListBytes,
    headers: {'Content-Type': 'application/octet-stream'}
    }, (err, response) => {
    if(err) {
        return console.log(err);
    }
    console.log(response.body);
    })

}

module.exports = sendRequest;