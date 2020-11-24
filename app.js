const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();

//Create Database Connection
const mysql = require('mysql');
 
const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'281196eemencret',
    database:'node_crud'
});

connection.connect(function(error){
    if(!!error) console.log(error);
    else console.log('Database Connected!');
});

//Define View engine with ejs / public path / View files path
//set views file
app.set('views',path.join(__dirname,'views'));
			
//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//set acces to folder
app.use(express.static(__dirname + '/assets'));

app.get('/',(req, res)=>{
  // res.send('CRUD Operation using Nodejs / Express / MySql');
  let sql = "SELECT * FROM users";
  let query = connection.query(sql, (err, rows) => {
    if(err) throw err;
    res.render('user_index', {
      title : 'CRUD Operation using NodeJS / ExpressJS / MySQL -- Ratama Adhi',
      users : rows
    });
  });
});

app.get('/add',(req, res)=>{
  res.render('add_users',{
    title : 'CRUD Operation using NodeJS / ExpressJS / MySQL -- Ratama Adhi', 
  });
});

app.post('/save', (req, res)=>{
  let data = {name: req.body.name, email: req.body.email, phone_no: req.body.phone};
  let sql = "INSERT INTO users set ?";
  let query = connection.query(sql, data,(err, results)=>{
    if(err) throw err;
    res.redirect('/');
  });
});

app.get('/edit/:userId',(req, res)=>{
  const userId = req.params.userId;
  let sql = `SELECT * from users where id = ${userId}`;
  let query = connection.query(sql,(err, results)=>{
    if(err) throw err;
    res.render('user_edit',{
      title : 'CRUD Operation using NodeJS / ExpressJS / MySQL -- Ratama Adhi',
      user : results[0]
    });
  });
});

app.post('/update', (req, res)=>{
  let sql = "UPDATE users set name = '"+ req.body.name +"', email = '"+ req.body.email +"',phone_no = '"+ req.body.phone +"' where id = "+ req.body.id;
  let query = connection.query(sql,(err, results)=>{
    if(err) throw err;
    res.redirect('/');
  });
});

app.get('/delete/:userId',(req, res)=>{
  const userId = req.params.userId;
  let sql = `Delete from users where id = ${userId}`;
  let query = connection.query(sql,(err, results)=>{
    if(err) throw err;
    res.redirect('/');
  });
});

// Server Listening
app.listen(3000, () => {
console.log('Server is running at port 3000');
});
