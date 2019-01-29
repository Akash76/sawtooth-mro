/**
 * The certificate is a QR code that can be attested to asset. 
 * Those qr codes are stored in views folder.
 */

var sendRequest = require('./send')
var qr = require('qr-image');  
var fs = require('fs');

var name = "we";

var code = qr.image(`Asset with name ${name} is listed and is available to buy`, { type: 'png' });  
var output = fs.createWriteStream(`./views/${name}.png`)
code.pipe(output);

payload = {
    action: 'addCert',
    name: name,
    url: 'http://localhost:3000/' + name
}

sendRequest(payload)