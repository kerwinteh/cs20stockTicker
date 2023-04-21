const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://kerwinteh:SYQ12nBg1QZKjs1F@cluster0.wfkcgkb.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function main() {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        await client.db("stockTicker");
        console.log("connected to server");
        await readStockData();

    } catch (e) {
        console.error(e);
    }
}


async function readStockData(){
    const fs = require("fs");
    fs.createReadStream("companies.csv", { encoding: "utf-8" })
        .on("data", async (chunk) => {
            var array = chunk.split("\n");
            for (let i = 1; i < array.length; i++) {
                var info = array[i].split(",");
                await insertData(info[0], info[1], info[2]);
            }
            await client.close();
        })
}

async function insertData(name, ticker, cost){
    var obj = {
        name: name,
        ticker: ticker,
        cost: cost
    };
    const database = client.db("stockTicker");
    const companies = database.collection("companies");
    const result = await companies.insertOne(obj);
    console.log('A document was inserted with the _id:' + result.insertedId);
}


main();
