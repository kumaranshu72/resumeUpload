var mail = require('../models/send_email');

module.exports = (app) => {
    app.get('/', function (req, res) {
      res.render('index');
    });

    app.post('/send-email', function (req, res) {
        mail.sendMail(req,res)
      });
};;
