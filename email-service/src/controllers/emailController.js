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
    mailOptions.text += `\nYour order ${orderContent._id} amounting to ${orderContent.total} is confirmed and will be delivered shortly.`
    mailOptions.to = orderContent.email;
    sendEmail(mailOptions)
    .then((res) => {
        logger.info("Order confirmation sent to " + mailOptions.to)
        order.ack();
    })
    .catch((e) => {
        console.log(e)
    });
}

const sendNotificationViaEmail = (notification) => {
    notificationContent = JSON.parse(notification.getData().toString());
    mailOptions.text += `\nYour order ${notificationContent.order_id} status is ${notification.order_status}.`
    mailOptions.to = notificationContent.email;
    sendEmail(mailOptions)
    .then((res) => {
        logger.info("Order notification sent to " + mailOptions.to)
        notification.ack();
    })
    .catch((e) => {
        console.log(e)
    });
}

module.exports = {
    sendConfirmation: sendConfirmation,
    sendNotificationViaEmail: sendNotificationViaEmail
}