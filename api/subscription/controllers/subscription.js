'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async confirmation(ctx) {
        let msgDestination='shasongurung@gmail.com';
        let {subscriberEmail} = ctx.request.body;
        let msgDataSent={
            from:msgDestination,
            replyTo:msgDestination,
            to:subscriberEmail,
        }
        try {
            await strapi.plugins['email-designer'].services.email.sendTemplatedEmail(
                msgDataSent,
                {templateId:3},
                {}
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
