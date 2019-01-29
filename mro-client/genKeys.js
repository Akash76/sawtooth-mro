/**
 * One can use below script to generate private and public keys for users.
 */

const {createContext, CryptoFactory} = require('sawtooth-sdk/signing');
const context = createContext('secp256k1');
const privateKey = context.newRandomPrivateKey();
const signer = new CryptoFactory(context).newSigner(privateKey);
console.log(signer)
console.log(signer.getPublicKey().asHex())