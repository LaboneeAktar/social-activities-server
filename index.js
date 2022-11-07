const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Social Activities API is Running...");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cybkh1s.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const servicesCollection = client
      .db("socialActivities")
      .collection("services");

    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = servicesCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });
  } catch (error) {
    console.log(error.name, error.message, error.stack);
  } finally {
  }
}
run();

app.listen(port, () => {
  console.log("Server is Running on Port:", port);
});
