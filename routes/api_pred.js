var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3')
var dbfileName = "./app1.sqlite"

//
var mdl_util = require('../include/mdl_util');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource-1234');
});
/******************************** 
* 
*********************************/
router.get('/index/:month', function(req, res) {
    var db = new sqlite3.Database( dbfileName )
    var items = []
    var sql = "SELECT id,hnum, pred ,date(mdate, '+9 hours') as mdate"
        sql +=" FROM pred order by mdate;"
console.log(sql);
    db.serialize(function() {
        db.all(sql , function(err, rows) {
            rows.forEach( function (item) {
                items.push(item  );
//                console.log(item );
            });
            var param = {"docs": items };
            res.json(param);
        });
    });
    db.close();
});
/******************************** 
* 
*********************************/
router.post('/new', (req, res) => {
    console.log(req.body )
    var db = req.db;
    var obj = req.body;
    obj.mdate = new Date();
    obj.up_date = new Date();
    var collection = db.get('mdats');
    collection.insert(obj , function(err, result ) {
        if (err) throw err;
        res.json(req.body);
        db.close();
    });        
}); 
/******************************** 
* 
*********************************/
router.get('/show/:id', function(req, res) {
    var db = req.db;
    console.log(req.params.id  );
    var collection = db.get('mdats');
    collection.find({"_id": new ObjectID(req.params.id)},{},function(e,docs){
        var param = {"docs": docs };
        res.json(param);
    });
});
/******************************** 
* 
*********************************/
router.post('/update', (req, res) => {
    var db = req.db;
    console.log(req.body )
    var obj = {
                "hnum": req.body.hnum ,
                "lnum": req.body.lnum,
                "up_date" : new Date()
            };
    var collection = db.get('mdats');
    collection.findOneAndUpdate(
    { _id: new ObjectID( req.body.id ) }, obj, {}, function(err, r){
        if (err) throw err;
        res.json(req.body);
        db.close();
    });        
});
/******************************** 
*  delete
*********************************/
router.get('/delete/:id', function(req, res) {
    var db = req.db;
    console.log(req.params.id  );
    var collection = db.get('mdats');
    collection.findOneAndDelete( { _id: new ObjectID( req.params.id ) }, {}, function(err, r){
        //console.log("#doc");
        res.json(r);
    });
});

module.exports = router;
