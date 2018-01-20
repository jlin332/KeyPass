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

router.get('/test', function(req, res, next){
    res.status(200).send(json.stringify(req.body));
    console.log(json.stringify(req.body));
    console.log("anything");
})

router.post('/train', function(req, res, next){
    console.log(req.body);
    res.status(200).send();
})

router.post('/login', function(req, res, next){

})

module.exports = router;
