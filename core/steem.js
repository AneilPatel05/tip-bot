
//Steem lib
var dsteem = require('dsteem')

//Steem Client
var client ;

//RAM cache of all the addresses and TXs.
var addresses, txs;

//Creates a new address.
// async function createMemo() {
//     var address = "newmemo";
//     addresses.push(address);
//     return address;
// }

// async function ownAddress(address) {
//     return addresses.indexOf(address) !== -1;
// }

//Gets an address's transactions.
// async function getTransactions(address) {
//     return txs[address];
// }

//Sends amount to address.
// async function send(address, amount) {
//     try {
//         return await client.broadcast.transfer({
//             //TODO DSTEEM TRANSFER
//             // voter: 'username',
//             // author: 'almost-digital',
//             // permlink: 'dsteem-is-the-best',
//             // weight: 10000
//         }, key).then(function(result){
//            console.log('Included in block: ' + result.block_num)
//         }, function(error) {
//            console.error(error)
//         })
//     } catch(e) {
//         return false;
//     }
// }

module.exports = async () => {
    //Create the client.
    var client = new dsteem.Client('https://api.steemit.com')
    var key = dsteem.PrivateKey.fromLogin('username', 'password', 'posting')

    //Init the addresses array.
    addresses = [];
    //Init the TXs RAM cache.
    txs = {};

    //Get all the TXs the owner  is having and sort them by memo.
    async function getTXs() {
        //var txsTemp = await client.listTransactions();
        //var txsTemp = await client.database.call('get_account_history',{"account":"swapsteem", "start":-1, "limit":10000});
        //Iterate through each TX.
        // for (var i in txsTemp) {
        //     //If the TX has a new memo, init the new array.
        //     if (typeof(txs[txsTemp[i].address]) === "undefined") {
        //         txs[txsTemp[i].address] = [];
        //     }

        //     //Make sure the TX has 1 confirm.
        //     // if (txsTemp[i].confirmations < 1) {
        //     //     continue;
        //     // }

        //     //Push each TX to the proper address, if it isn't already there.
        //     if (
        //         txs[txsTemp[i].address].map((tx) => {
        //             return tx.txid;
        //         }).indexOf(txsTemp[i].txid) === -1
        //     ) {
        //         txs[txsTemp[i].address].push(txsTemp[i]);
        //     }
        // }
    }
    //Do it every thirty seconds.
    setInterval(getTXs, 30 * 1000);
    //Run it now so everything is ready.
    await getTXs();

    //Get each address and add it to the address array.
    //var temp = await client.database.call('get_account_history',{"account":"swapsteem", "start":-1, "limit":10000});
    // for (var i in temp) {
    //     addresses.push(temp[i].address);
    // }

    //Return the functions.
    return { };
};
