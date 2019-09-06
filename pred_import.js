//
//
// import csv, to mongo
//
var fs = require('fs');
var logger = require('morgan');
var mdl_util = require('./include/mdl_util');
var sqlite3 = require('sqlite3').verbose()
var dbfileName = "./app1.sqlite"

/******************************** 
*
*********************************/
function insert_db(db ,item ){
    var sql = "INSERT INTO pred (mdate, hnum, pred, up_date) VALUES "
    sql += " (datetime('"+ item.date +"'), ?, ?, CURRENT_TIMESTAMP)"
//console.log( sql );
    var stmt = db.prepare(sql )
    stmt.run(
        item.hnum,
        item.pred
    )
    stmt.finalize()
    db.close()
}
/******************************** 
*
*********************************/
function proc_arr_check(items){
    var utl = new mdl_util( )
    items.forEach(function (item) {
        var date = item[1]
//console.log( item );
//console.log( date.length );
        if(date.length > 0){
            date = utl.convert_str2datetime( date )
            date = utl.convert_date2datetime( date )
            var hnum = item[2]
            var pred = item[3]
            var arr ={
                "date" : date,
                "hnum" : hnum,
                "pred" : pred,
            }
//console.log( arr );
            var db = new sqlite3.Database( dbfileName )
            insert_db(db, arr)
        }
    });
}
/******************************** 
*
*********************************/
function read_csvFile(input_file ){
    var rs = fs.createReadStream( input_file );
    var readline = require('readline');   
    var rl = readline.createInterface(rs, {});
   
    var items = []
    var i = 0;
    rl.on('line', function(line) {
        if(i > 0){
            if(line.length > 0){
               col = line.split(",")
//console.log( col.length );
                if(col.length >= 3){
                    items.push( col )
                }
            }
        }
        i += 1;
    })    
    .on('close', function() {
//        console.log( items );
        proc_arr_check(items)
    });            
}
/******************************** 
* main
*********************************/
//var items = read_csvFile("dat/import.csv");
var items = read_csvFile("dat/out_pred.csv");
//console.log( "#end" )
return;
