var express = require('express');
var router = express.Router();
var http = require('http');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Please, select a Virtual World and enjoy!');
});

<<<<<<< HEAD
const API_URL = `http://localhost:3333`;

router.get('/:id', (req, res, next)=>{
  const API = `${API_URL}/virtualworld/${req.params.id}`;
=======
router.get('/:id', (req, res, next)=>{
  const API = `http://localhost:3030/virtualworlds/${req.params.id}`;
>>>>>>> 2d9ee3850e676fa65bef45b611cd2d3ed9237b44

  //Get VW data (tip from https://dev.to/isalevine/three-ways-to-retrieve-json-from-the-web-using-node-js-3c88)
  http.get(API, response =>{
    let vwdata = {};

    response.on('data', (vw)=>{
      vwdata = JSON.parse(vw);
    });

    response.on('end', ()=>{
<<<<<<< HEAD
      if(vwdata._id != undefined ){
        res.render('index', { title: 'MetaSEE', id: vwdata._id});
=======
      if(vwdata.id != undefined ){
        res.render('index', { title: 'MetaSEE', id: vwdata.id});
>>>>>>> 2d9ee3850e676fa65bef45b611cd2d3ed9237b44
      }else{
        res.redirect('/');
      }
    });

  }).on('error', error => {
    console.log(error.message);
    res.redirect('/');
  });
});

module.exports = router;