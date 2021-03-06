// mdl_util

/**
 * constructor
 */
var mdl_util = function()
{
    this.time_zone = 9;
}
/******************************** 
*
*********************************/
mdl_util.prototype.convert_date2 = function(item)
{
    var ret = ""
    col = item.split(" ")
    var dt = col[0]
    row = dt.split("/")
    ret = row[0] +"-"+ row[1] +"-"+ row[2]
    return ret
}

/******************************** 
*
*********************************/
mdl_util.prototype.convert_str2datetime = function(item)
{
    var ret = ""
    col = item.split(" ")
    var dt = col[0]
    row = dt.split("-")
    var month = row[1]
    //time
    var time = col[1]
    rowTime = time.split(":")
    var hh = parseInt(rowTime[0]);
//    hh = hh + this.time_zone;
//console.log( dt );
// console.log( rowTime );
    ret =new Date(row[0], month -1 , row[2], hh ,rowTime[1] ,rowTime[2] )
    return ret
}

/******************************** 
*
*********************************/
mdl_util.prototype.convert_str2date = function(item)
{
    var ret = ""
    col = item.split(" ")
    var dt = col[0]
    row = dt.split("/")
    var month = row[1]
    ret =new Date(row[0], month -1 , row[2], 0 ,0 , 0)
    return ret
}
/******************************** 
*
*********************************/
mdl_util.prototype.convert_date2str = function(date){
    var ret = ""
    var yyyy = date.getFullYear()
    var mm = date.getMonth() + 1
    var dd  = date.getDate();
    var s = yyyy + "/" + mm + "/"+ dd
//console.log( s );
    return s
}
/******************************** 
* in: YYYY/MM/DD
* out: date
*********************************/
mdl_util.prototype.get_start_month = function(date){
    row = date.split("-")
    var year = row[0]
    var month = row[1]
    var ret =new Date(year, month -1 , 1, this.timezone_jp ,0 , 0)
//console.log( this.timezone_jp );
    return ret
}
/******************************** 
* in: YYYY/MM/DD
* out: date
*********************************/
mdl_util.prototype.get_end_month = function(date){
    row = date.split("-")
    var year = row[0]
    var month = row[1]
    if(month >=12){
        month = 1
        year = parseInt(year) + 1
    }else{
        month = parseInt(month) +1
    }
//console.log( month );
    var ret =new Date(year, month -1 , 1, this.timezone_jp ,0 , 0)
    return ret
}
/******************************** 
*
*********************************/
mdl_util.prototype.get_nowMonth = function( )
{
    var ret = ""
    var date = new Date()
    var yyyy = date.getFullYear()
    var mm = date.getMonth() + 1
    var dd  = date.getDate();
//    var ret = yyyy + "-" + mm + "-"+ dd 
    var ret = yyyy + "-" + mm
    return ret
}
/******************************** 
*
*********************************/
mdl_util.prototype.get_beforeMonth = function( month )
{
    var ret = ""
    row = month.split("-")
    var year = row[0]
    var month = row[1]
    month = parseInt(month) -1
    var date =new Date(year, month -1 , 1, this.timezone_jp ,0 , 0)
    var yyyy = date.getFullYear()
    var mm = date.getMonth() + 1
    var ret = yyyy + "-" + mm 
    return ret
}
/******************************** 
*
*********************************/
mdl_util.prototype.get_afterMonth = function( month )
{
    var ret = ""
    row = month.split("-")
    var year = row[0]
    var month = row[1]
    month = parseInt(month) +1
    var date =new Date(year, month -1 , 1, this.timezone_jp ,0 , 0)
    var yyyy = date.getFullYear()
    var mm = date.getMonth() + 1
    var ret = yyyy + "-" + mm 
    return ret
}
/******************************** 
* retutn :  datetime
*********************************/
mdl_util.prototype.convert_date2datetime = function(date){
    var ret = ""
    var yyyy = date.getFullYear()
    var mm = date.getMonth() + 1
        mm = ("0" +mm).slice(-2)
    var dd  = date.getDate();
        dd = ("0" +dd).slice(-2)
    //time
    var hh  = date.getHours();
        hh = ("0" +hh).slice(-2)
    var mi  = date.getMinutes();
        mi = ("0" +mi).slice(-2)
    var ss  = date.getSeconds();
        ss = ("0" +ss).slice(-2)

    var s = yyyy + "-" + mm + "-"+ dd+ " " + hh+ ":" + mi + ":"+ ss
//console.log( s );
    return s
}
/******************************** 
* retutn : YYYY-MM-DD
*********************************/
mdl_util.prototype.convert_date2yymmdd = function(date){
    var ret = ""
    var yyyy = date.getFullYear()
    var mm = date.getMonth() + 1
        mm = ("0" +mm).slice(-2)
    var dd  = date.getDate();
        dd = ("0" +dd).slice(-2)
    var s = yyyy + "-" + mm + "-"+ dd
//console.log( s );
    return s
}
/******************************** 
*
*********************************/
mdl_util.prototype.test = function(param)
{
    return "Test:" + param
}

module.exports = mdl_util
