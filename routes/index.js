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
  dbConnect.query(`INSERT INTO students (MSSV, Password, FirstName, LastName, Email) VALUES ('${req.body.mssv}','${req.body.password}','${req.body.name[0]}','${req.body.name[1]}','${req.body.email}')`,function(err){
      if(err) throw err;
      alert('Added Successfully!');
      res.redirect('/');
  });
});
//Delete
router.get('/delete/:STT',(req,res) =>{
  dbConnect.query(`DELETE from students WHERE STT=${req.params.STT}`, function(err){
    if(err) throw err;
    alert('Deleted Successfully!');
    res.redirect('/');
  });
});

//Edit
router.get('/edit/:STT', (req,res) =>{
  var data = dbConnect.query(`SELECT * from students WHERE STT=${req.params.STT}`,function(err,result){
    if(err) throw err;
    data = {
      STT:result[0].STT,
      MSSV:result[0].MSSV,
      Password:result[0].Password,
      FirstName:result[0].FirstName,
      LastName:result[0].LastName,
      Email:result[0].Email
    }
    res.render('edit',{data});
  });
});
//Update
router.post('/edit',(req,res)=>{
  dbConnect.query(`UPDATE students SET MSSV='${req.body.mssv}',Password='${req.body.password}',Firstname='${req.body.name[0]}',LastName='${req.body.name[1]}',Email='${req.body.email}' where STT=${req.body.STT}`,function(err,result){
    if(err) throw err;
    alert('Updated Successfully!');
    res.redirect('/');
  });
});
//Search
router.get('/search', (req,res)=>{
  // console.log("SEARCHING", req.query)
  dbConnect.query(`SELECT * from students WHERE MSSV = '${req.query.mssv}'`,function(err,data,fields){
    if(err) throw err;
    console.log({ data })
    res.status(200).render('index',{
      data
    });
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
