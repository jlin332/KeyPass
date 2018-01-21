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
});

router.post('/train', function(req, res, next){
    console.log("sending");
    var pressdown = req.get("key_pressed");
    console.log(pressdown);
    var inbetween = req.get("in_between");
    console.log(inbetween);
    trainer.addData(pressdown, inbetween);
    console.log("data sent");
    res.status(200).send();
});

router.post('/login', function(req, res, next){
  console.log("login post recieved");
  console.log("req = ", req.get("key_pressed"));
  console.log("req = ", req.get("in_between"));
  var score = trainer.classify(req.get("key_pressed"), req.get("in_between"));
  console.log(score);
  res.status(200).send("score");
});

module.exports = router;
