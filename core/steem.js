//steem lib.
var steem = require("steem");

//Steem RPC Client.
var client;

//RAM cache of all the addresses and TXs.
var steemnames, txs;

//Creates a new steemname.
async function createAddress(steemname) {
    addresses.push(steemname);
    return steemname;
}

async function ownAddress(steemname) {
    return addresses.indexOf(steemname) !== -1;
}

//Gets an steemname's transactions.
async function getTransactions(steemname) {
    return txs[steemname];
}

//Sends amount to steemname.
async function send(steemname,memo, amount) {
    try {
        return await steem.broadcast.transfer('5KRQU5dnts1xpDy1fSpJWuBvSM7PWusEpQ8YZnbBXoU4uZRLP3N', 'anlptl', steemname, amount.toFixed(3)+' STEEM', memo);
    } catch(e) {
        return false;
    }
}

module.exports = async () => {
    //Create the client.
    steem.api.setOptions({ url: 'https://api.steemit.com' })

    //Init the addresses array.
    addresses = [];
    //Init the TXs RAM cache.
    txs = {};

    //Get all the TXs the client is hosting, and sort them by steemname.
    async function getTXs() {
        var txsTemp = await steem.api.getAccountHistory('anlptl', -1, 3, ()=>{}) ;;

        //Iterate through each TX.
        for (let txn in txsTemp) {
            //If the TX has a new steemname, init the new array.
            let op = txn[1].op
            if(op[0] === 'transfer'){
                console.log("incoming deposit");
                if (typeof(op[1].from) === "undefined") {
                    txs[txsTemp[i].steemname] = [];
                }
                //Push each TX to the proper steemname, if it isn't already there.
                if (
                    txs[txsTemp[i].from].map((tx) => {
                        return tx.txid;
                    }).indexOf(txsTemp[i].txid) === -1
                ) {
                    txs[txsTemp[i].from].push(txsTemp[i]);
                }
                }
                

                //Make sure the TX has 1 confirm.
                // if (txsTemp[i].confirmations < 1) {
                //     continue;
                // }

                
        }
    }
    //Do it every thirty seconds.
    setInterval(getTXs, 30 * 1000);
    //Run it now so everything is ready.
    await getTXs();

    //Get each steemname and add it to the steemname array.
    var temp = await steem.api.getAccountHistory('anlptl', -1, 1, ()=>{});
    for (var i in temp) {
        addresses.push(temp[i].from);
    }

    //Return the functions.
    return {
        createAddress: createAddress,
        ownAddress: ownAddress,
        getTransactions: getTransactions,
        send: send
    };
};
