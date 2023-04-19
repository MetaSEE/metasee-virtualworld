var express = require('express');
var router = express.Router();
var http = require('http');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send('Please, select a Virtual World and enjoy!');
});

const API_URL = `http://localhost:3333`;
// const API_URL = `http://metasee-api.herokuapp.com`;
// const API_URL = `https://bcfh5v7dz4.execute-api.sa-east-1.amazonaws.com/master/`;

router.get('/:id', (req, res, next)=>{
  const API = `${API_URL}/virtualworld/${req.params.id}`;

  //Get VW data (tip from https://dev.to/isalevine/three-ways-to-retrieve-json-from-the-web-using-node-js-3c88)
  http.get(API, response =>{
    let vwdata = {};

    response.on('data', (vw)=>{
      vwdata = JSON.parse(vw);
    });

    response.on('end', ()=>{
      if(vwdata._id != undefined ){
        res.render('index', { title: 'MetaSEE', id: vwdata._id});
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

module.exports = router;