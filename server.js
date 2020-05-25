const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

const { MongoClient } = require("mongodb");
const config = require("./config");

const CONNECTION_URL = `mongodb+srv://${config.db.username}:${config.db.password}@cluster0-dqtbm.mongodb.net/test?retryWrites=true&w=majority`;
const DATABASE_NAME = "baby_weight";
const COLLECTION_NAME = "preston";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let database, collection;

app.listen(port, () => {
  MongoClient.connect(
    CONNECTION_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error, client) => {
      if (error) {
        throw error;
      }
      database = client.db(DATABASE_NAME);
      collection = database.collection(COLLECTION_NAME);

      console.log(`Connected to ${DATABASE_NAME}!`);
    }
  );

  console.log(`Listening on port ${port}`);
});

app.get("/weight", (req, res) => {
  collection.find({}).toArray((error, result) => {
    if (error) {
      return Response.status(500).send(error);
    }

    res.send(result);
  });
});

app.post("/weight", (req, res) => {
  // TODO: Add req validation using validator or something like it
  collection.insert(req.body, (error, result) => {
    if (error) {
      return Response.status(500).send(error);
    }

    res.send(result.result);
  });
});
