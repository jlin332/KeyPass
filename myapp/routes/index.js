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
    var inbetween = req.get("in_between");
    console.log(pressdown);
    var pressDown_split = pressdown.split(",");
    console.log("split press");
    var in_between = inbetween.split(",");
    console.log("split between");
    for (let a = 0; a < pressDown_split.length; a++) {
        pressDown_split[a] = parseInt(pressDown_split[a]);
    }
    for (let b = 0; b < in_between.length; b++) {
        in_between[b] = parseInt(in_between[b]);
    }
    console.log(typeof(pressDown_split));
    console.log(typeof(in_between));
    trainer.addData(pressDown_split, in_between);
    console.log("data sent");
    res.status(200).send();
});

router.post('/login', function(req, res, next){
  console.log("login post recieved");
    var pressdown = req.get("key_pressed");
    var inbetween = req.get("in_between");
      var pressDown_split = pressdown.split(",");
      console.log("split press");
      var in_between = inbetween.split(",");
      console.log("split between");
      for (let a = 0; a < pressDown_split.length; a++) {
          pressDown_split[a] = parseInt(pressDown_split[a]);
      }
      for (let b = 0; b < in_between.length; b++) {
          in_between[b] = parseInt(in_between[b]);
      }
  console.log(trainer.classify(pressDown_split, in_between));
  res.status(200).send("score");
});

module.exports = router;
