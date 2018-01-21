var express = require('express');
var json = require('jsonify');
const train = require('../learning/train');
var router = express.Router();

var trainer = new train();
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/john', function(req, res, next){
    res.render('index');
})

router.post('/train', function(req, res, next){
    var username = req.get("username");
    var password = req.get("password");
    var data = req.get("data");
    //console.log(data);
    //console.log(req.body["user"]);
    trainer.addData(data, req.body["user"]);
    res.status(200).send();
})

router.post('/login', function(req, res, next){
  //console.log("Verifying with...");
  //console.log(req.get("data"));
  trainer.trainer(function () {
    var score = trainer.classify(req.get("data"));
    //console.log(score + " " + req.body["user"]);
    res.status(200).send(score);
  })


})

module.exports = router;
