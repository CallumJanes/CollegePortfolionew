const MongoClient = require('mongodb').MongoClient;

const client = new MongoClient(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = async (req, res) => {
    const db = client.db("reviews");
    const reviews = await db.collection("entries").find({ approved: true }).toArray();

    res.status(200).json(reviews);
};
