/**
 * Computer user xd
 * Created by 张洋 on 2017/3/31.
 */

var nodemailer = require("nodemailer");
var cheerio = require("cheerio");
var schedule = require("node-schedule");
var request = require("request");
var fs = require("fs");
var Entities = require('html-entities').XmlEntities;
var entities = new Entities();
var mailer = require('./mailer');

var rule = new schedule.RecurrenceRule();
rule.second = 0;

var reqHeader = {
    url:'https://campus.alibaba.com/myJobApply.htm?loginType=taobao',
    headers:{
        'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
        'Cookie':'t=fbab2d6a0e81b6acaa60f89cb62b3a7f; UM_distinctid=15b23580e9d4f7-08424b1cfdc4b2-65111375-1fa400-15b23580e9e739; l=Anh4kqqT8yimOKdns7utMwnpyCwKztxr; isg=AuLiWVhozy3X89NtTLqyHUdMM2i9peZN3w8LEyx7IdUA_4F5FMNNXZP9WYz4; v=0; cookie2=1cc9e36a5c9fe7b4804d6ecdaef5e11a; _tb_token_=383eee9e783ff; csg=0019248f; JSESSIONID=EF6YBZ7WO2-PH5KSK2XPWN4V0TMCMBY1-CSKMDH2J-1E52; cna=EYsPD5xxHyQCAXUWed+ZvJ12; tmp0=AK4iOhX6sITV1f5dT6pnn3riT6pVhyLCX52awXaUN8NJBDUQ3GQKWx4iTAoDeRt09oqHeZ%2FOQmV80u6Dp44H4U87bWsha%2BdUDYBZuvrvK6ZWbyXzA%2FocpaYlIPN%2FsVXk20v7gi5wo%2BfOJLyOCBV2hGHKzxKKCigE29YRgkMWSNd17W%2BMimXiXovyfrxZX4mPhaPJAjBebSUN6sz24H6SolQUpUSrASxZTkeo9cyjFnLD31VEiu6pWNG7hij8Yhp6; CNZZDATA1000004808=555014922-1490945128-null%7C1494322867',
    }
};
function check() {
    console.log("1 second do some thing");
}
var OldStatus = "面试中";
// request(reqHeader).pipe(fs.createWriteStream('ali.html'));
function task() {
    request(reqHeader,function (err, res, body) {
        var $ = cheerio.load(body);
        var status = $("#content").children("div").children("div")
            .children('table.table-new').last().children('thead').children('tbody')
            .children('tr')
            .children('td.state-name').children('span.strong-new').html();
        status = entities.decode(status);
        if(OldStatus != status){
            OldStatus = status;
            mailer.sendMail("当前状态:  "+status);
        }
        console.log(status);
    });
}

var rule = new schedule.RecurrenceRule();
rule.second = 1;
var job = schedule.scheduleJob(" 0 */1 * * *",task);
// var job = schedule.scheduleJob("* * * * * *",check);
