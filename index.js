var express = require('express'),
    path = require('path'),
    nodeMailer = require('nodemailer'),
    formidable = require('formidable'),
    keys = require('./config/keys');
var port = 3000;
var app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get('/', function (req, res) {
  res.render('index');
});

app.post('/send-email', function (req, res) {
  var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
     let transporter = nodeMailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              user: keys.username,
              pass: keys.password
          }
      });
      let mailOptions = {
            from: fields.from + '<'+keys.username+'>', // sender address
            to: keys.to, // list of receivers
            subject: fields.subject, // Subject line
            html: fields.body, // html body
            attachments: [
              {   // utf-8 string as an attachment
                  filename: files.data.name,
                  path: files.data.path
              }
            ]
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.send("Something went wrong Try After Sometime")
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
                res.send("Your resume have been sent sucessfully")
            });
    });
  });
app.listen(port, function(){
            console.log('Server is running at port: ',port);
          });
