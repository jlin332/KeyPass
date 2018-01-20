var express = require('express');
var json = require('jsonify');
var trainer = require('../learning/train');
var router = express.Router();

// var train = new trainer.trainer();
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/john', function(req, res, next){
    res.render('LoginTemplate');
})

router.post('/train', function(req, res, next){
    var username = req.get("username");
    var password = req.get("password");

    res.status(200).send();
})

router.post('/login', function(req, res, next){
  train.classify(req.body.data, function(cheese){
    if(cheese){
      res.send(true);
    }
  })

})

module.exports = router;
