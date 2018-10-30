var path = require('path'),
    nodeMailer = require('nodemailer'),
    formidable = require('formidable'),
    keys = require('../config/keys');

module.exports = {
  //send mail function
  sendMail : function(req,res) {
    //creating multiform data object
    var form = new formidable.IncomingForm();
      form.parse(req, function (err, fields, files) {
        //parsing form data
       if(!fields.contact_number || !fields.name || !fields.profile || !fields.experience || !fields.current_ctc || !fields.expected_ctc)
        {
          return res.send("Something is missing. Better luck next time!");
        }
        //checking if file is pdf or docx
        let file_extension = files.data.name.split('.').pop();
        if(!(file_extension == 'pdf' || file_extension == 'doc' || file_extension == 'docx')) {
          return res.send("Something is wrong with the resume.");
        }

        let name = fields.name;
        let contact_number = fields.contact_number;
        let profile = fields.profile;
        let experience = fields.experience;
        let current_ctc = fields.current_ctc;
        let expected_ctc = fields.expected_ctc;
        //configuring node mailer to send mails
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
              from: name + '<'+keys.username+'>', // sender address
              to: keys.to, // list of receivers
              subject: name + '_' + profile, // Subject line
              html: "Hi,</br> Following are the details: <ol><li> Name : "+name+"</li><li> Contact Number : "+contact_number+"</li><li> Profile : "+profile+"</li><li>Experience : "+experience+" Years</li><li>Current CTC : "+current_ctc+"</li><li>Expected CTC : "+expected_ctc+"</li></ol>", // html body
              attachments: [
                {   // utf-8 string as an attachment
                    filename: files.data.name,
                    path: files.data.path
                }
              ]
          };
          //sending mail using mailer
          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  return res.send("Something went wrong Try After Sometime")
              }
              console.log('Message %s sent: %s', info.messageId, info.response);
                  return res.send("Congrats! Your resume have been sent sucessfully. We will contact you soon.")
              });
      });
  }
};
