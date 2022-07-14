var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views','./views');

app.listen(3000);

var pg=require('pg');
const { Pool, Client } = require('pg')

var config = {
    user: 'postgres',
    database: 'students',    
    host: 'localhost', 123.25.17.313: 
    password: '1',    
    port: 5432,       
  };
 
//var pool =new pg.Pool(config);
const client = new Client(config);
client.connect();


app.get('/sinhvien/list', function(req, res){    
    client.query('SELECT * FROM SINHVIEN', (err,result)=>{
   
    if (err) {
        return console.error('query error', e.message, e.stack)
    }
    //console.log('hello from', res.rows[0].hoten)
    res.render('sinhvien_list.ejs',{danhsach: result});
    });
});    


app.get('/sinhvien/them', function(req, res) {
    res.render('sinhvien_insert.ejs')
})

app.post('/sinhvien/them', urlencodedParser, function(req, res){
    var hoten=req.body.txtHoTen;
    var email=req.body.txtemail;
    
    //var pool = new Pool()
    client.query("INSERT INTO sinhvien(hoten, email) VALUES ('" + hoten + "', '" + email + "')", function(err, result){
    if (err) {
        return console.error('query error', e.message, e.stack)
    }
        //console.log('hello from', res.rows[0].hoten)
    res.redirect('../sinhvien/list');
    });
});


app.get('/sinhvien/xoa/:id', function(req, res){       
        var id=req.params.id;  
        client.query("DELETE FROM sinhvien WHERE id = '" + id + "'", (err, result)=>{       
        if (err) {
            //res.end();
            return console.error('query error', err);
        }        
        res.redirect('../../sinhvien/list');
        });
});

app.get('/', function(req, res) {
    res.render('main');
})