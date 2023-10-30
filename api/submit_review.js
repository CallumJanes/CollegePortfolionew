const MongoClient = require('mongodb').MongoClient;
const nodemailer = require('nodemailer');

const uri = process.env.MONGO_URL;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    try {
        await client.connect();

        const { name, review, rating } = req.body;

        const reviewEntry = {
            name: name,
            review: review,
            rating: rating,
            approved: false,
        };

        const db = client.db("your_database_name");
        const result = await db.collection("reviews").insertOne(reviewEntry);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: 'reviews@callinbox.aleeas.com',
            subject: 'Review Approval Needed',
            text: `Name: ${name}\nReview: ${review}\nRating: ${rating}\n\nApprove: [Your_Link_for_Approval]\nDeny: [Your_Link_for_Denial]`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).send('Review submitted for approval.');

    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing your request.');
    }
};
