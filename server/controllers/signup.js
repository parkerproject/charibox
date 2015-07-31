require('dotenv').load();
var collections = ['users'];
var db = require("mongojs").connect(process.env.CHARIBOX_MONGODB_URL,
  collections);
var randtoken = require('rand-token');
var user_id = randtoken.generate(7);



module.exports = {
  index: {
    handler: function (request, reply) {

      var data = {
        email: request.payload.user_email,
        name: request.payload.name,
        userId: user_id,
        confirm_email: 'no'
      };

      db.users.update({
        email: data.email
      }, data, {
        upsert: true
      }, function (err, doc) {

        if (err) {
          reply({
            status: 'failed'
          });
        } else {

          var message = (doc.updatedExisting) ?
            'You have already registered!' :
            'Thank you for signing up. Expect an email from us soon.';

          reply({
            status: message
          });

        }

      });

    }
  }
};