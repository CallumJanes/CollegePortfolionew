const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const client = new MongoClient(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = async (req, res) => {
    const { id } = req.query;

    // Update the review in MongoDB
    const db = client.db("reviews");
    await db.collection("entries").updateOne({ _id: ObjectId(id) }, { $set: { approved: false } });

    res.status(200).send('Review denied.');
};
