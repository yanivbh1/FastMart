const { sendEmail } = require('../services/emailService');
const { logger } = require('../services/loggerService');
const { EMAIL_SUBJECT, EMAIL_TEXT_DEFAULT } = require('../resources/constants');

const EMAIL_ID = process.env.EMAIL_ID;

var mailOptions = {
    from: EMAIL_ID,
    to: '',
    subject: EMAIL_SUBJECT,
    text: EMAIL_TEXT_DEFAULT
  };
  
/**
 * Send an email confirmation.
 */
const sendConfirmation = (order) => {
    orderContent = JSON.parse(order.getData().toString());
    mailOptions.text += `Your order ${orderContent._id} amounting to ${orderContent.total} is confirmed and will be delivered shortly.`
    mailOptions.to = orderContent.email;
    mailOptions.from = "nscidonotreply@gmail.com";
    // sendEmail(mailOptions, function (err, info) {
    //     if (err) {
    //         logger.log('crit',`email - failed to send confirmation to ${orderContent.email} for order ${orderContent._id}.`)
    //         logger.info(err)
    //     } else {
    //         logger.info(`email - confirmation sent to ${orderContent.email} for order ${orderContent._id}.`);
    //         order.ack();
    //     }
    //   })
    sendEmail(mailOptions)
    .then((res) => {
        console.log(res);
        order.ack();
    })
    .catch((e) => {
        console.log(e)
    });

}

module.exports = {
    sendConfirmation: sendConfirmation
}