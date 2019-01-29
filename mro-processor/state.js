var { HASH, TP_NAMESPACE } = require('./constants')

class MROStore {
    constructor(context) {
        this.context = context;
        this.timeout = 500;
        this.stateEntries = {}
    }

    enrollAsset(name, cost, id){
        var address = makeAddress(name)
        return this.context.getState([address], this.timeout).then(function(data) {
            var stateEntries = {}
            Object.assign(stateEntries, data)
            if(stateEntries[address].toString()) {
                return console.log("Asset already exist")
            } else {
                var manufacturingDT = new Date();
                var date = manufacturingDT.getFullYear()+'-'+manufacturingDT.getMonth()+'-'+manufacturingDT.getDate();
                var time = manufacturingDT.getHours()+":"+manufacturingDT.getMinutes();
                var DT = date+" "+time;
                var asset = {
                    Name: name,
                    dateTime: DT,
                    cost: cost,
                    id: id,
                    status: "not listed",
                    url: ""
                }
                var newEntries = {};
                newEntries[address] = Buffer.from(JSON.stringify(asset));
                return this.context.setState(newEntries, this.timeout).then(function(result) {
                    console.log("successfully enrolled ", result);
                }).catch(function(error) {
                    console.log("Error: ", error)
                });
            }
        }.bind(this));
    }
    
    addCert(name, url){
        var address = makeAddress(name)
        var stateEntries = {}
        return this.context.getState([address], this.timeout).then(function(data) {
            Object.assign(stateEntries, data)
            if(stateEntries[address].toString()) {
                var entries = JSON.parse(stateEntries[address])
                entries["status"] = "listed"
                entries["url"] = url
                var newEntries = {}
                newEntries[address] = Buffer.from(JSON.stringify(entries))
                return this.context.setState(newEntries, this.timeout). then(function(result) {
                    console.log("successfully added certificate ", result);
                }).catch(function(error) {
                    console.log("Error: ",error)
                });
            } else {
                return console.log("Asset not present")
            }
        }.bind(this));
    }

    getAsset(name){
        var address = makeAddress(name)
        return this.context.getState([address], this.timeout).then(function(stateEntries) {
            Object.assign(this.stateEntries, stateEntries)
            if(this.stateEntries[address].toString()) {
                console.log(this.stateEntries[address].toString())
                return this.stateEntries;
            } else {
                return console.log("Asset not present")
            }
        }.bind(this));
    }

    buyAsset(name, id){
        var address = makeAddress(name)
        var stateEntries = {}
        return this.context.getState([address], this.timeout).then(function(data) {
            Object.assign(stateEntries, data)
            if(stateEntries[address].toString()) {
                var entries = JSON.parse(stateEntries[address])
                entries["id"] = id
                var newEntries = {}
                newEntries[address] = Buffer.from(JSON.stringify(entries))
                return this.context.setState(newEntries, this.timeout). then(function(result) {
                    console.log("successfully added certificate ", result);
                }).catch(function(error) {
                    console.log("Error: ",error)
                });
            } else {
                return console.log("Asset not present")
            }
        }.bind(this));
    }

}

const makeAddress = (x, label) => TP_NAMESPACE + HASH(x)

module.exports = MROStore;