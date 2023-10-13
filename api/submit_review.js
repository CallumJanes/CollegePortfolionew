const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    const { fname, w3review, fav_language } = req.body;

    if (!fname || !w3review || !fav_language) {
        res.status(400).send('All fields are required.');
        return;
    }

    // Setup nodemailer transporter using Gmail SMTP
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailContent = `
    New Review Submitted:

    Name: ${fname}
    Review: ${w3review}
    Rating: ${fav_language}
    `;

    let mailOptions = {
        from: process.env.EMAIL,
        to: 'all@callinbox.aleeas.com',
        subject: 'New Review Submission',
        text: mailContent
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email.');
        } else {
            res.status(200).send('Review submitted for approval.');
        }
    });
};
