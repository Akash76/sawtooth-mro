var sendRequest = require('./send')

payload = {
    action: 'enrollAsset',
    name:'b',
    cost: '1123'
}

sendRequest(payload)