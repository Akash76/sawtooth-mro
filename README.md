# sawtooth-mro
sawtooth implementation of simple aircraft mro system

# Scenario
 A manufacturer makes the aircraft part and the details of the piece are updated to blockchain as soon as it is manufactured. It is made available to buyers. A CA authority checks the part by getting the details from the blockchain. When the piece is a valid one, the CA attests certificate to part and its status is made listed so that a buyer can buy. A buyer can buy by providing his/her public key so that ownership of asset can be updated.

# Instructions
Run the docker containers by simply executing `docker-compose.yaml` file.
```
$ docker-compose up -d
```
Please install node_modules before proceeding.
Run app.js file in mro-processor to install the transaction-processor on validator node.
```
$ node app.js
```
mro-client folder has scripts to submit transactions to the validator. enroll, get, addcert, buy are basic scripts. genKeys.js is used to generate keys of a user. Those keys can be used to sign the transactions. By default a signer is generated whenever transaction is submitted.
```
$ docker-compose down
```
This stops the containers and removes them.
