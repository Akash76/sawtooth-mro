var sendRequest = require('./send')

payload = {
    action: 'getAsset',
    name:'a'
}

sendRequest(payload)