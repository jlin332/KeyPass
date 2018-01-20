var express = require('express');
var json = require('jsonify');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/john', function(req, res, next){
  res.render('LoginTemplate');
})

router.post('/train', function(req, res, next){
  console.log(json.stringify(req.body()));
})

router.post('/login', function(req, res, next){

})

module.exports = router;
