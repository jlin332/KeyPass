var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/john', function(req, res, next){
  res.render('LoginTemplate');
})

module.exports = router;
