const crypto = require('crypto');

const HASH = (x, len = 64) =>
    crypto.createHash('sha512').update(x).digest('hex').slice(0, len);

const TP_FAMILY = 'MRO'
exports.HASH = HASH
exports.TP_FAMILY = TP_FAMILY
exports.TP_NAMESPACE = HASH(TP_FAMILY, 6)