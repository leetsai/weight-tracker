const {MongoClient} = require('mongodb');
const config = require('./config');

async function main() {
    const uri = `mongodb+srv://${config.db.username}:${config.db.password}@cluster0-dqtbm.mongodb.net/test?retryWrites=true&w=majority`
    
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        
        // Make DB calls
        await getAllResults(client, "baby_weight", "preston")
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function getAllResults(client, database, table) {
    const results = await client.db(database).collection(table).find().sort({date: 1}).toArray();

    console.log(results);
}