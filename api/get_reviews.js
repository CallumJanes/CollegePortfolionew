const { MongoClient } = require('mongodb');

module.exports = async (req, res) => {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db('reviews_db');
  const reviewsCollection = db.collection('reviews');

  const reviews = await reviewsCollection.find({ status: 'approved' }).toArray();

  res.status(200).json(reviews);
};
