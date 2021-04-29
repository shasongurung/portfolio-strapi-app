'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async msg(ctx) {
        let msgDestination='shasongurung@gmail.com';
        let {msgFrom, msgFromEmail, msg} = ctx.request.body;
        let msgDataReceived={
            from:msgFromEmail,
            replyTo:msgFromEmail,
            to:msgDestination,
        }
        try {
            await strapi.plugins['email-designer'].services.email.sendTemplatedEmail(
                msgDataReceived,
                {templateId:2},
                {
                  sender:msgFrom,
                  senderEmail:msgFromEmail,
                  message:msg 
                }
            );
        } catch (e) {
          if (e.statusCode === 400) {
            return ctx.badRequest(e.message);
          } else {
            throw new Error(`Couldn't send email: ${e.message}.`);
          }
        }

        let msgDataSent={
            from:msgDestination,
            replyTo:msgDestination,
            to:msgFromEmail,
        }

        try {
            await strapi.plugins['email-designer'].services.email.sendTemplatedEmail(
                msgDataSent,
                {templateId:1},
                {
                    sender:msgFrom
                }
            );
        } catch (e) {
            if (e.statusCode === 400) {
            return ctx.badRequest(e.message);
            } else {
            throw new Error(`Couldn't send email: ${e.message}.`);
            }
        }
    
        // Send 200 `ok`
        ctx.send({});
      },
};
