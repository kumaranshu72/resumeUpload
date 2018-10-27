var express = require('express')
var port = process.env.PORT || 3000;
var app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

require('./routes/route')(app);

app.listen(port, function(){
            console.log('Server is running at port: ',port);
          });
