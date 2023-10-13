const { MongoClient } = require('mongodb');

module.exports = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).send('ID is required');
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db('reviews_db');
  const reviewsCollection = db.collection('reviews');

  await reviewsCollection.updateOne({ _id: new MongoClient.ObjectID(id) }, { $set: { status: 'approved' } });

  res.status(200).send('Review approved successfully.');
};
