/**
 * Computer user xd
 * Created by 张洋 on 2017/12/25.
 */
var cheerio = require("cheerio");
var request = require("request");
var fs = require("fs");
var BaseUrl = 'http://data.gdeltproject.org/events/';

function getOneFile(file,callback) {
    request.get(BaseUrl+file).pipe(fs.createWriteStream('data/'+file)).on('error',callback);
}

function getOneFileFromBody(file) {
    request.get(BaseUrl+file,function (err, resp, body) {
        if(!err&&resp.status === "200"){
            fs.writeFile('data/'+file,body,function () {
                console.log(file+' done');
            })
        }
    })
}

function start() {
    console.log("started");
    var done = function () {
        console.log("done!")
    };
    for(var i=Date.parse('2015-01-01');i<=Date.parse('2015-01-31');i+=(3600000*24)){
        var temp = new Date(i);
        var date = temp.toLocaleDateString().replace(new RegExp(/(-)/g),"");
        var file = date+".export.CSV.zip";
        getOneFile(file,done);
        /*
        while (true){
            if(done){
                done = false;
                break;
            }
        }*/
        console.log(file)
    }
}

start()