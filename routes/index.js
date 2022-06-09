var alert = require('alert'); 
var express = require('express');
var router = express.Router();
// var Json2csvParser = require('json2csv').Parser;
// const { parse } = require('json2csv');
var dbConnect = require('../database/connect');
/* GET home page. */
router.get('/', function(req, res, next) {
  dbConnect.query('SELECT * from students',(err,data)=>{
    if(err) throw err;
    res.render('index',{data:data});
  })
});
router.get('/add',(req,res) => {
  res.render('add');
})
//Add Student//
router.post('/add',(req,res) => {
  dbConnect.query(`INSERT INTO students (FirstName, LastName, Email) VALUES ('${req.body.name[0]}','${req.body.name[1]}','${req.body.email}')`,function(err){
      if(err) throw err;
      alert('Added Successfully!');
      res.redirect('/');
  });
});
//Delete
router.get('/delete/:id',(req,res) =>{
  dbConnect.query(`DELETE from students WHERE id=${req.params.id}`, function(err){
    if(err) throw err;
    alert('Deleted Successfully!');
    res.redirect('/');
  });
});

//Edit
router.get('/edit/:id', (req,res) =>{
  var data = dbConnect.query(`SELECT * from students WHERE id=${req.params.id}`,function(err,result){
    if(err) throw err;
    data = {
      id:result[0].id,
      FirstName:result[0].FirstName,
      LastName:result[0].LastName,
      Email:result[0].Email
    }
    res.render('edit',{data});
  });
});
//Update
router.post('/edit',(req,res)=>{
  dbConnect.query(`UPDATE students SET Firstname='${req.body.name[0]}',LastName='${req.body.name[1]}',Email='${req.body.email}' where id=${req.body.id}`,function(err,result){
    if(err) throw err;
    alert('Updated Successfully!');
    res.redirect('/');
  });
  
});
//Export file csv 
// router.get('/export-csv',(req,res) => {
//   dbConnect.query('SELECT * from students', function(err,students,fields){
//     if(err) throw err;
//     console.log("students:");
//     const jsonStudents = JSON.parse(JSON.stringify(students));
//     console.log(jsonStudents);
//     //Convert JSON to CSV data
//     const csvFields = ['id','Firstname','LastName','Email'];
//     const json2csvParser = new json2csvParser({ csvFields })
//     const csv = json2csvParser.parse(jsonCustomer);

//     console.log(csv);
//     res.setHeader("Content-Type","test/csv");
//     res.setHeader("Content-Disposition","attachment;filename=students.csv");
//     res.status(200).end(csv);
//   });
// });
module.exports = router;
