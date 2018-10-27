var express = require('express')
var port = process.env.PORT || 3000;
var app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/css', function(req, res){
    res.sendFile(path.resolve(__dirname, './assets/css/style.css'));
})

require('./routes/route')(app);

app.listen(port, function(){
            console.log('Server is running at port: ',port);
          });
