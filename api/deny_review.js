const { MongoClient } = require('mongodb');

module.exports = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).send('ID is required');
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db('reviews_db');
  const reviewsCollection = db.collection('reviews');

  await reviewsCollection.deleteOne({ _id: new MongoClient.ObjectID(id) });

  res.status(200).send('Review denied successfully.');
};
