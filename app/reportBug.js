process.env["NODE_CONFIG_DIR"] = __dirname + "/config/";
let config = require('config');

/**
 * Sends an e-mail to our support via AWS SES.
 *
 * @param req
 * @param res
 */
function reportBug(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const explanation = req.body.explanation;

    const ses = require('node-ses');
    const sesClient = ses.createClient({ key: config.get('aws_access_key_id'), secret: config.get('aws_secret_access_key') });

    sesClient.sendEmail({
        to: 'shanej@khaccounts.net',
        from: 'shanej@khaccounts.net',
        subject: 'New Bug Report | Site Feedback',
        message: `Bug has been reported or feedback has been given:
            
                <strong>Name:</strong> ${name}
                <strong>Email:</strong> ${email}
                <strong>Explanation:</strong> ${explanation}`,
        altText: `Bug has been reported or feedback has been given:
            
                Name: ${name}
                Email: ${email}
                Explanation: ${explanation}`
    }, (err, data, sesRes) => {
        if (err) {
            console.log(err);
            console.log(data);
            console.log(sesRes);
            return res.status(500).status({ status: 'error', message: err });
        }

        return res.status(200).send({ status: 'success', data: {} });
    });
}

module.exports = reportBug;