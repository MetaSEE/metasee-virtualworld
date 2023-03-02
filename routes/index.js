var express = require('express');
var router = express.Router();
var http = require('http');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Please, select a Virtual World and enjoy!');
});

router.get('/:id', (req, res, next)=>{
  const API = `http://localhost:3030/virtualworlds/${req.params.id}`;

  //Get VW data (tip from https://dev.to/isalevine/three-ways-to-retrieve-json-from-the-web-using-node-js-3c88)
  http.get(API, response =>{
    let vwdata = {};

    response.on('data', (vw)=>{
      vwdata = JSON.parse(vw);
    });

    response.on('end', ()=>{
      if(vwdata.id != undefined ){
        res.render('index', { title: 'MetaSEE' });
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