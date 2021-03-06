// This is the base controller. Used for base routes, such as the default index/root path, 404 error pages, and others.
require('dotenv').load();
var collections = ['users'];
var db = require("mongojs").connect(process.env.CHARIBOX_MONGODB_URL, collections);
var swig = require('swig');
var sendEmail = require('./sendEmail');



module.exports = {
  index: {
    handler: function (request, reply) {


      db.users.findAndModify({
        query: {
          userId: request.query.user
        },
        update: {
          $set: {
            confirm_email: 'yes'
          }
        },
        new: true
      }, function (err, doc, lastErrorObject) {
        swig.renderFile(__base + 'server/views/welcomeEmail.html', {
            token: request.query.user,
            name: request.query.name
          },
          function (err, content) {
            if (err) {
              throw err;
            }
            var subject = 'Welcome to imagify';
            sendEmail(request.query.email, subject, content);
            reply('<h1>Your account is now active, check your email for your token.</h1>');
          });
      });

    }
  }
};