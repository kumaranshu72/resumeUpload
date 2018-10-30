var mail = require('../models/send_email');

module.exports = (app) => {
    //GET for index page
    app.get('/', function (req, res) {
      res.render('index');
    });
    //POST for resume as email
    app.post('/send-email', function (req, res) {
        mail.sendMail(req,res)
      });

    app.get('*', function(req, res){
      res.send('what???');
    });
};;
