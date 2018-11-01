var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

var questions=[
    {data:213,    num:444,    age:12},
    {data:456,    num:678,    age:13}]; //写个接口123

router.get('/',function(req,res){
    res.status(200);
    res.json(questions)
});

module.exports = router;
